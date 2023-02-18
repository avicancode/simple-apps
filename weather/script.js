const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "edd1249f50msh64a9c37700341ffp121482jsn18e5d61a2c7d",
        "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
};

const populateCards = (city, response) => {
    console.log(response);
    if (city === "") {
        cloud_pct.innerHTML = response.cloud_pct;
        temp.innerHTML = response.temp;
        feels_like.innerHTML = response.feels_like;
        humidity.innerHTML = response.humidity;
        min_temp.innerHTML = response.min_temp;
        max_temp.innerHTML = response.max_temp;
        wind_speed.innerHTML = response.wind_speed;
        wind_degrees.innerHTML = response.wind_degrees;
    } else {
        console.log("Populating Data For City: ", city);
        document.getElementById(`${city.toLowerCase()}_feels_like`).innerHTML =
            response.feels_like;
        document.getElementById(`${city.toLowerCase()}_humidity`).innerHTML =
            response.humidity;
        document.getElementById(`${city.toLowerCase()}_min_temp`).innerHTML =
            response.min_temp;
        document.getElementById(`${city.toLowerCase()}_max_temp`).innerHTML =
            response.max_temp;
        document.getElementById(`${city.toLowerCase()}_wind_speed`).innerHTML =
            response.wind_speed;
        document.getElementById(
            `${city.toLowerCase()}_wind_degrees`
        ).innerHTML = response.wind_degrees;
        document.getElementById(`${city.toLowerCase()}_cloud_pct`).innerHTML =
            response.cloud_pct;
    }
};

const getWeather = (city) => {
    cityname.innerHTML = city;
    fetch(
        `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`,
        options
    )
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            populateCards("", response);
        })
        .catch((err) => console.error(err));
};

submit.addEventListener("click", (e) => {
    e.preventDefault();
    getWeather(city.value);
});

getWeather("Delhi");
const getCitiesWeather = () => {
    ["Bangalore", "Pune", "Chennai", "Kolkata"].forEach((city) => {
        fetch(
            `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`,
            options
        )
            .then((response) => response.json())
            .then((response) => {
                populateCards(city, response);
            })
            .catch((err) => console.error(err));
    });
};

getCitiesWeather();
