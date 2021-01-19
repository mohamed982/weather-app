
const fs=require('fs');
const path=require('path');
const express=require('express');
const hbs=require('hbs');
// const yargs=require('yargs');
// const chalk =require('chalk');
const geocode=require('./utils');
const { registerPartials } = require('hbs');
const { EEXIST } = require('constants');

// const callback =async(error,response)=>{
//     //
//    if(error){
//        console.log(error);
//    }else{
//     let url=`${weatherStackURL}?access_key=${weatherStakAPI}&query=${response.latitude},${response.longitude}`;
//     try{
//       let res=await fetch(url);
//       let json=await res.json();
//       if(json.error){
//           console.log({error:json.error});
//       }else{
//        let msg= `It's now in ${response.location} , ${json.current.temperature}C , it feels like ${json.current.feelslike}`;
//        console.log({info:msg});
//       }
//     }catch(error){
//      console.log({error:error});
//     }
//    }
// }

// let myCallBack= async (err,res)=>{
//   if(err){
//       console.log(chalk.red.inverse("Error :"+err)) ;
//   }
//  else{
//      let msg=`It's now in ${res.location} ${res.current.temperature} Feels like ${res.current.feelslike}. There is a ${res.current.precip}% chance for rains`;
//      console.log(chalk.green.inverse(msg));
//  }
// }

// geocode.Geocode('Riyadh',(err,res)=>{
//     if(err){
//         console.log(err) ;
//     }
//    else{
//        console.log(res);
//    }
// });

// yargs.command({
//     command : 'getWeather' ,
//     describe :'Get weather',
//     builder:{
//         location:{
//             describe:'City name',
//             demandOption:true ,
//             type:'string'
//         }
//     },
//     handler:async (argv)=>{
//           geocode.Forcast(argv.location,(e,r)=>{
//              if(e)
//               console.error(e);
//             else 
//               console.log(r);
//           });
          
//     }
// });
// yargs.parse();


// Express 
const app=express();

 const port=process.env.PORT || 3000 ;
 
const publicPath=path.join(__dirname,'../public');
const views=path.join(__dirname,'../partials/views')
const partialPath=path.join(__dirname,'../partials/templates');


app.set('view engine','hbs');
app.set('views',views);
hbs.registerPartials(partialPath);


app.use(express.static(publicPath));


app.get('/',(req,res)=>{
    res.render('index',{
        title:'Home Page'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me'
    });
})

app.get('/weather',(req,res)=>{
    res.render('weather',{
        title:'Get Current weather'
    });
});

app.get('/Profile',(req,res)=>{
     res.render('myProfile',{
         title:'My Profile'
     });
});

app.get('/forecast',(req,res)=>{
   let location=req.query.location ; 
   if(!location)
    {
         res.send({
            error : 'Location is not specified'
        });
    } else{  
        geocode.Forcast(location,(err,{temperature,feelslike,precip,wind_speed,wind_degree,humidity}={})=>{
            if(!err)
            {
                res.send({
                    location,
                    temperature ,
                    feelslike ,
                    precip ,
                    wind_speed,
                    wind_degree,
                    humidity
                });
            } else
            {
                res.send({
                    error:err.error,
                });
            }
        });
    }
});

app.listen(port,(e,s)=>{
        console.log('Server is now running');
});