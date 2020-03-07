const request = require("request");

const geocode = (address, callback) => {
    //encodeURIComponent(), will transform the code into UTF-8
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoieXV0aW1hIiwiYSI6ImNrNzc4Mnc1dzA1MjkzZG9nanFsZ2Rrcm4ifQ.h7_UX61rPNIJGiJZJnYwtQ";
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback("Unable to connect to location service!", undefined);
        }else if(response.body.features.length === 0){
            callback("Unable to find location. Try another search.", undefined);
        }else{
            callback(undefined, {
                location: response.body.features[0].place_name,
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
        });
        }
    });
};

module.exports = geocode;
