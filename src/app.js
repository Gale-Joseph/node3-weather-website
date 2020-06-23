//core node modules
const path = require('path')

//custom modules
const forecast = require('./utils/forecast')
const geocode  = require ('./utils/geocode')

//non-core modules
const express = require('express')
const app = express()
const port = process.env.PORT||3000
const hbs = require('hbs')

//use path.join for routing to index.html later on in app.use
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set hanlebars as templeting engine, set views location, set partials location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to use
app.use(express.static(publicDirectory))

//route handlers
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App', 
        name:'Joseph Gale'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Joseph Gale',
        message: "This is a help message"
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About',
        name: "Joseph Gale"
    })
})
app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    //see notes in geocode/forecast for details about these functions
    //rather than controlling for bad input within code, we are setting default location to nothing if bad address typed in because geocode returns features[] if bad location
    //if location is set to {}, then first error code runs as if nothing were entered in
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{//={} controls for ! in address so it doesn't crash server, default value
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address

            })            
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    })  

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Uh oh, something went wrong',
        message: 'Help Article Not Found',
        name: "Joseph Gale"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: 'Uh oh, something went wrong',
        message: 'Page not found',
        name: "Joseph Gale"
    })
})


app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})