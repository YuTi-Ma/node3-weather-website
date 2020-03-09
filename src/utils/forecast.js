const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/eab4058c15eca0046bd813c3e7bdedba/"+ encodeURIComponent(latitude) + "," + encodeURIComponent(longitude);
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback("Unable to connect to weather service!", undefined);
        }else if(response.body.error){
            callback(("Unable to find location! " + latitude + ", " + longitude), undefined);
        }else{
            callback(undefined, (response.body.daily.data[0].summary + " It is currently temperature: "+response.body.currently.temperature+" degrees out. " + "There is a " + response.body.currently.precipIntensity + "% chance of rain. " + "The windSpeed is: " + response.body.currently.windSpeed))
        }
    });
}

module.exports = forecast;