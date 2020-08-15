const express = require("express");
const https = require("https");
const parser = require("body-parser");

var app = express();
app.use(parser.urlencoded({extended: true}));



app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.post("/", function (request, response) {
        var cityName = request.body.cityName;
        var apiKey = "c11664cb381eb3c84351083ba6de841f";
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=" + apiKey + "&units=metric";

        https.get(url, function (res) {
            console.log(res.statusCode);
            
            res.on("data", function (data) {
                const weatherData = JSON.parse(data);
                const obj = JSON.stringify(weatherData);

                const temp = weatherData.main.temp;
                const desc = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                const speed = weatherData.wind.speed;
                response.write("<p>The weather is currently " + desc + "</p>");
                response.write("<h1>The temperature in " + cityName + " is " + temp + " degree celcius.</h1>");
                response.write("<img src = "+ imgURL +">");
                response.send();
            });
        });
});







app.listen(3000, function (request, response) {
   console.log("Server runing on port 3000");
});
