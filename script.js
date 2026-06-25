const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const dateTime = document.getElementById("dateTime");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const weatherIcon = document.getElementById("weatherIcon");
const errorMessage = document.getElementById("errorMessage");


const apiKey = "5b2b06a80536b213ae14f6b22c3d7369";

function getWeather() {

    const city = cityInput.value;

    errorMessage.innerText = "";

   
    searchBtn.disabled = true;
searchBtn.innerText = "Loading...";

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        searchBtn.disabled = false;
searchBtn.innerText = "Search";

        if (data.cod != 200) {
            errorMessage.innerText = "City not found.";
            return;
        }

        cityName.innerText =
        data.name + ", " + data.sys.country;
        const timezone = data.timezone;

        const localTime = new Date(
        Date.now() + timezone * 1000 - 19800 * 1000
        );

        dateTime.innerText =
        localTime.toLocaleDateString() +
         " • " +
        localTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
        const weatherMain = data.weather[0].main;

if (weatherMain === "Clear") {
    document.body.style.background =
        "linear-gradient(135deg, #f59e0b, #f97316)";
}

else if (weatherMain === "Clouds") {
    document.body.style.background =
        "linear-gradient(135deg, #4b5563, #1f2937)";
}

else if (weatherMain === "Rain") {
    document.body.style.background =
        "linear-gradient(135deg, #0f766e, #164e63)";
}

else {
    document.body.style.background =
        "linear-gradient(135deg, #0f172a, #1e293b)";
}

        temperature.innerText =
            Math.round(data.main.temp) + "°C";

        condition.innerText =
            data.weather[0].main;

        humidity.innerText =
            "Humidity: " + data.main.humidity + "%";

        wind.innerText =
            "Wind: " + data.wind.speed + " km/h";

        const iconCode = data.weather[0].icon;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        weatherIcon.style.display = "block";
    });
}

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
locationBtn.addEventListener("click", function () {

    navigator.geolocation.getCurrentPosition(function (position) {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const timezone = data.timezone;

            const localTime = new Date(
            Date.now() + timezone * 1000 - 19800 * 1000
            );

            dateTime.innerText =
            localTime.toLocaleDateString() +
            " • " +
            localTime.toLocaleTimeString([], {
             hour: "2-digit",
            minute: "2-digit"
            });

            cityName.innerText = data.name;

            temperature.innerText =
                Math.round(data.main.temp) + "°C";

            condition.innerText =
                data.weather[0].main;

            humidity.innerText =
                "Humidity: " + data.main.humidity + "%";

            wind.innerText =
                "Wind: " + data.wind.speed + " km/h";

            const iconCode = data.weather[0].icon;

            weatherIcon.src =
                `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

            weatherIcon.style.display = "block";
        });

    });

});