const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)); //index.html

//res.render(file_name, json_format);
app.get("", (req, res) => {
    res.render("index", {
        title: "homepage",
        name: "Yuti-Ma"
    }) ;
});

app.get("/weather", (req, res) => {
    res.render("weather", {
        title: "weather",
        name: "Yuti-Ma"
    });
});

app.get("/weathers", (req, res) => {

    if(!req.query.address){
        return res.send({
            error: "You must provide an address!"
        });
    }
        
    geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({error});
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
            
            res.send({
                location: data.location,
                summary: forecastData.summary,
                temperature: forecastData.temperature,
                precipIntensity: forecastData.precipIntensity,
                windSpeed: forecastData.windSpeed,
                address: req.query.address 
            });
        });
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Yuti-Ma"
    });
});

app.get("/about/education", (req, res) => {
    res.render("education", {
        title: "Education",
        name: "Yuti-Ma"
    });
});

app.get("/about/conference", (req, res) => {
    res.render("conference", {
        title: "Conference",
        name: "Yuti-Ma"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "help",
        name: "Yuti-Ma"
    });
});

app.get("/help/*", (req, res) => {
    res.render("error", {
        title: "404",
        name: "Yuti-Ma",
        errorMessage: "Help artical not found!"
    });
});

app.get("*", (req, res) => {
    res.render("error", {
        title: "404",
        name: "Yuti-Ma",
        errorMessage: "Oops, page not found!"
    });
});

/*
the argument in app.get, 
first_argument is ip-adderss where you wanna go, example: localhost:port/first_argument
second_argument is request & response

app.get("", (req, res) => { //here is the code you write down below app.listen, and it's port is the first_argument in app.listen
    res.send("<h1>this is localhost page!<h1>");
});

*/

//localhost port
app.listen(port, () => {
    console.log("Web start running up on port " + port);
});