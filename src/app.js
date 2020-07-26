const path = require('path')
const express= require('express')
const hbs = require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')



//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname,'../public'))
const app=express()

//define path for express config

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')
//setup hnadler engine

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directry
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name :'sonali agrawal'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name:'sonali agrawal'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        message:'how we help you',
        name:'sonali agrawal'
    })
})




app.get('/weather',(req,res)=>{
   
    if(!req.query.address){
     return  res.send({error:'add search term too'})
    }
    

geocode(req.query.address,(error,{longitude,latitude,place}={})=>{
    if (error){
        return  res.send({error})
    }
    forecast(longitude,latitude,(error,foreCastData)=>{
        if(error){
            return res.send ({error})
        }


        res.send({
            forecast:foreCastData,
            place,
            address:req.query.address

        })
    })
})
/* res.send({
         forecast:'its raining'
     ,location:'gwalior',
     address: req.query.address
     })*/

 })

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'page is not found'
        ,name:'sonali agrawal',
        errorMessage:'help article not found'
    })

})

app.get('*',(req,res)=>{
    res.render('404',{
        title: 'page is not found'
        ,name:'sonali  agrawal',
        errorMessage:'page not get'
    })
})


/*app.get('',(req,res)=>
{
    res.send('hello express')
})


app.get('/help',(req,res)=>
{
    res.send('hello express help')
})


app.get('/about',(req,res)=>{
    res.send('title page')
})*/





//app.com
//app.com/about
//app.com/help
app.listen(3000,()=>{
    console.log('server starting')
})