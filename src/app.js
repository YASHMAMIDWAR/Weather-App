const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { request } = require('http')

const app = express()
const port = process.env.PORT || 3000

//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=> {
    res.render('index',{
        title: 'Weather APP',
        name: 'Yash Mamidwar'
    })
})

app.get('/about',(req,res)=> {
    res.render('about',{
        title: 'About',
        name: 'Yash Mamidwar'
    })
})

app.get('/help',(req,res)=> {
    res.render('help',{
        title: 'Help',
        name: 'Yash Mamidwar'
        
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address)
    {
       return res.send({
            error: 'You Must provide a address term'
        })
    }
       

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if(error)
        {
           return  res.send({
               error
           })
        }
       
        forecast(latitude,longitude, (error, data) => {
            if(error)
            {
                return  res.send({
                    error
                })
            } 
            const {temp} = data
            return  res.send({
                forecast: data,location,
                Address: req.query.address
            })
        })
     })
})

app.get('/help/*', (req,res)=> {
    res.render('errr',{
        title: 'Help Article Not Found',
        name: 'Yash Mamidwar'
        
    })
})



app.get('*', (req,res)=> {
    res.render('errr',{
        title: '404 Page Not Found',
        name: 'Yash Mamidwar'
        
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})