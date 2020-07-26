const request=require('request')



const geocode=(address,callback)=>
{    
const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic29uYWxpMTJhZ3Jhd2FsIiwiYSI6ImNrY3JjamZpejBvcGsycW1nanVmempseWcifQ.Eaw7XIX36wNUVD1gipvSTQ&limit=1'
request({url,json:true},(error,{body})=>{
if(error){
    callback('unable to find',undefined)
}
else if(body.features.length===0){
    callback('unable to find place',undefined)
}
else{
    callback(undefined,{
         longtitude :body.features[0].center[1],
     latitude :body.features[0].center[0],
      place: body.features[0].place_name
    })
}

   

})



}

module.exports=geocode