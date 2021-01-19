const fetch=require('node-fetch');
const mapboxAPI="pk.eyJ1IjoibW9oZG5hYmlsOTgyIiwiYSI6ImNramRkdW8xMzN1cTYyemxnMzZqM2RheWMifQ.SrLEdC0njlhSWmxIBpcqjw";
const mapboxURL="https://api.mapbox.com/geocoding/v5/mapbox.places/";
const weatherStakAPI="c6b888d9c7ad114c0d49fd081ab40884";
const weatherStackURL="http://api.weatherstack.com/current";

const Geocode =async (location,callback)=>{
    let url=`${mapboxURL}${encodeURIComponent(location)}.json?access_token=${mapboxAPI}&limit=1`;
     try{
        let response=await fetch(url);
        let json=await response.json();
        if(json.features.length<1 || !json.features){
          callback({reason:"Can't find the location , try another search"},undefined);
        }else{
          callback(undefined,{
                latitude:json.features[0].center[1],
                longitude:json.features[0].center[0],
                location:json.features[0].place_name
                });
        }
     }catch(error){
       callback({reason:'Unable to connect GeoCode to service now'},undefined);
     }
};

const getWeatherForcast = async (location,callback)=>{
  Geocode(location,async (err,res)=>{
     if(err){
         callback({error:err.reason},undefined) ;
     }else{
        try{
            let url=`${weatherStackURL}?access_key=${weatherStakAPI}&query=${res.latitude},${res.longitude}` ;
            let response=await fetch(url);
            let json=await response.json();
            if(json.error){
                callback({error:json.error.type},undefined);
            }else{
                callback(undefined,json.current);  
            }
        }catch(error){
            callback({error:error},undefined);
        }
     }
  });
};


module.exports={
    Geocode,
    Forcast:getWeatherForcast
};