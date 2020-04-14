const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/eab4058c15eca0046bd813c3e7bdedba/"+ encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "?units=si";
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback("Unable to connect to weather service!", undefined);
        }else if(response.body.error){
            callback(("Unable to find location! " + latitude + ", " + longitude), undefined);
        }else{
            callback(undefined, {
                summary: response.body.daily.data[0].summary,
                temperature: response.body.currently.temperature,
                precipIntensity: response.body.currently.precipIntensity,
                windSpeed: response.body.currently.windSpeed
            });
        }
    });
}

module.exports = forecast;