console.log("client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");
const messageFour = document.querySelector("#message-4");
const messageFive = document.querySelector("#message-5");

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const location = search.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    messageThree.textContent = "";
    messageFour.textContent = "";
    messageFive.textContent = "";

   
    fetch("/weathers?address=" + location).then((response) => {
        response.json().then((data) => {
    
            if(data.error){
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = "Location: " + data.location;
                messageTwo.textContent = "Summary: " + data.summary;
                messageThree.textContent = "Temperature: " + data.temperature + " ℃";
                messageFour.textContent = "PrecipIntensity: " + data.precipIntensity*100 + "% chance of rain.";
                messageFive.textContent = "WindSpeed: " + data.windSpeed + " meters per second.";
            }
        });
    });
});