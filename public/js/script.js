const forecast=async (location)=>{
  let response=await fetch(`/forecast?location=${location}`);
  let data=await response.json();
  const results=document.querySelector('.searchResult');
  results.innerHTML="";
  if(!data.error)
   {
     const markup=`
                    <h3>Location : <span>${data.location}</span></h3>
                    <h3>Current Temperature : <span>${data.temperature}</span> C</h3>
                    <h3>Feels Like : <span>${data.feelslike}</span> C</h3>
                    <h3>Precip : <span>${data.precip}</span>%</h3>
                  `;
    results.insertAdjacentHTML('beforeend',markup);
   }else{
     const markup=`
                    <h3>Precip : <span>${data.error}</span></h3>
                  `;
     results.insertAdjacentHTML('beforeend',markup);
   }
  
};


document.querySelector('#weatherForm').addEventListener('submit',e=>{
  e.preventDefault();
  let location=document.querySelector('#location').value ;
  if(location && location!="")
   {
     forecast(location);
   }
}) ;