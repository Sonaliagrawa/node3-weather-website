
const request =require('request')


const forecast=(longitude,latitude,callback)=>
{
    url='http://api.weatherstack.com/current?access_key=9288dfac2d4049d040f2790aa9e58dfa&query=india&unit=m&location>'+longitude+'&location>'+latitude
    request({url,json:true},(error,{body})=>
    {if(error){
        callback('unable to connect internet',undefined)
    }
    else if(body.error){
        callback('location is not defined',undefined)
    }
    else{
        callback(undefined,{
            preciption: body.current.precip,
            temperature : body.current.temperature
        })
    }

    })
}
module.exports=forecast