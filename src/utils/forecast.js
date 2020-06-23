const request = require("request")
const forecast = (latitude,longitude,callback)=>{
    url = 'http://api.weatherstack.com/current?access_key=941facd45b55f0b06714931bd8aa77d9&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json:true},(err, {body})=>{//url:url replaced with url, because in object and using previously made url variable; body replaces res
        if(err){
            callback('Unable to connect to weather service',undefined)
        } else if(body.error) {//res removed because destructured in response
            callback('Unable to find location',undefined)
        }else{
            console.log(url)
            callback(undefined,
                'The weather is ' + body.current.weather_descriptions + '. ' + 
                'The temperature is ' + body.current.temperature + ' degrees. ' + 
                'It feels like ' + body.current.feelslike + ' degrees. ' + 
                'The precipitation is ' + body.current.precip)
        }
    })

}
module.exports = forecast

/*******************************************************
What's going on here? 
1.  This function will ultimately be wrapped within geocode function and returns one sentence via callback() about the weather forecast using body info from API call.
1a. Even though this is wrapped inside geocode function, the entire geocode function runs first before dealing with this function
1b. The geocode results will either be an error(which prevents forecast from running) or it will have coordinates in callback available for forecast arguments

2. Once forecast() is started, a url will be created based on lat and long arguments which will have been provided from geocode callback()

3.  The request() has 2 parameters, an object for url and callback(): ({url},(err,res))
3a. All response objects in JS have a res.body component among others. Since we just want the body, we will deconstruct with {body}
3b. This is the same with geocode()

4.  If the request object comes back with an error, the callback function error is set and the response object is set to undefined within geocode callback()
4a. If the request object comes back with error as undefined, then the body items listed become the arguments for the callback function
********************************************************/