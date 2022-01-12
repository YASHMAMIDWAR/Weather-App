const request = require('request')

const forecast = (latitude, longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8cf11caa76186cc3bd65e379e366a820&query=' + latitude + ',' + longitude 

    request({url, json: true}, (error,response) => {
       if(error)
       {
            callback('Unable to connect to forecast services',undefined)
       }
       else if(response.body.error) {
           callback('Unable to find location', undefined)

       }
       else
       {
           const temp = response.body.current.temperature 
           const loc = response.body.location.name
           callback(undefined, 'The Temprature is '  + temp + ' Degree Celcius')
           
       }


    })
}

module.exports = forecast