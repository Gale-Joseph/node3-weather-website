const request = require('request')
const geocode = (location,callback)=>{//callback function will have 2 parameters
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(location)+'.json?access_token=pk.eyJ1Ijoiam9zZXBoZ2FsZSIsImEiOiJjazh6Mmd0cXMxY2UxM21zZmtxbnY3ZzNxIn0.hbDii5hO1P2qR2oYoZDfMQ'
    request({url, json:true}, (error, {body})=>{//response taken out and destructed with just body, was previously res
        if(error){
           callback('Unable to connect to location services', undefined)
        }else if(body.features.length===0){
            callback('Unable to find location. Try another search.', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
        })
    }
    })
}


//use this for single function
module.exports = geocode

/*******************************************************
What's going on here? 
1.  The geocode() will require a location and a callback function as arguments; it will return latitude, longitude, and a city but no weather.
1a. The callback function will require an error argument and a response argument (err, res)
2b. The res argument can be broken apart with {lat, long, location} since res.lat, res.long, and res.loc will ultimately be returned

2. Once geocode is started, a url will be created based on location argument from geocdode

3.  The request() has 2 parameters, an object for url and callback(): ({url},(err,res))
3a. All response objects in JS have a res.body component among others. Since we just want the body, we will deconstruct with {body}

4.  If the request object comes back with an error, the callback function error is set and the response object is set to undefined within geocode callback()
4a. If the request object comes back with error as undefined, then the body items listed become the arguments for the callback function
********************************************************/