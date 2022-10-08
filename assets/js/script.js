function startSearch() {
    const searchCityEl = document.getElementById("search-city");
    const searchBtnEl = document.getElementById("search-button");
    const clearHistoryEl = document.getElementById("clear-history");
    const citySelectedEl = document.getElementById("city-selected");
    const currentDayEl = document.getElementById("currentDay");
    const currentIconEl = document.getElementById("weather-icon");
    const weatherDescription = document.getElementById("weatherDescription");
    const currentTempEl = document.getElementById("current-temp");
    const currentHumidityEl = document.getElementById("current-humidity");
    const currentWindEl = document.getElementById("current-wind");
    const currentIndexEl = document.getElementById("current-uvIndex");
    const searchHistoryEl = document.getElementById("search-history");
    var fiveDayForecastEl = document.getElementById("fiveDayForecast");
    var currentWeatherEl = document.getElementById("current-weather");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

    const currentDay = moment();

    currentDayEl.innerHTML = currentDay.format("MMMM Do, YYYY");

    // Assigning a unique API to a variable
    const APIKey = "0327e827733813560b272ec06c5f8ba8";

    function getWeather(cityName) {
        // Execute a current weather get request from open weather api
        let weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        axios.get(weatherURL)
            .then(function (response) {

                currentWeatherEl.classList.remove("d-none");

                // Parse response to display current weather
                citySelectedEl.innerHTML = response.data.name;
                let weatherPic = response.data.weather[0].icon;
                currentIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
                currentIconEl.setAttribute("alt", response.data.weather[0].description);
                currentTempEl.innerHTML = k2f(response.data.main.temp) + "&#176";
                weatherDescription.innerHTML = response.data.weather[0].description;
                currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
                currentWindEl.innerHTML = "Wind: " + response.data.wind.speed + " mph";
                
                // Get UV Index
                let lat = response.data.coord.lat;
                let lon = response.data.coord.lon;
                let uvURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
                axios.get(uvURL)
                    .then(function (response) {
                        let uvIndex = document.createElement("span");
                        
                        // When UV Index is good, shows green, when ok shows yellow, when bad shows red
                        if (response.data[0].value < 4 ) {
                            uvIndex.setAttribute("class", "badge badgeGood");
                        }
                        else if (response.data[0].value < 8) {
                            uvIndex.setAttribute("class", "badge badgeModerate");
                        }
                        else {
                            uvIndex.setAttribute("class", "badge badgeDanger");
                        }
                        console.log(response.data[0].value)
                        uvIndex.innerHTML = response.data[0].value;
                        currentIndexEl.innerHTML = "UV Index: ";
                        currentIndexEl.append(uvIndex);
                    });
                
                // Get 5 day forecast for this city
                let cityID = response.data.id;
                let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
                axios.get(forecastURL)
                    .then(function (response) {
                        fiveDayForecastEl.classList.remove("d-none");
                        
                        //  Parse response to display forecast for next 5 days
                        const forecastEls = document.querySelectorAll(".forecast");
                        for (i = 0; i < forecastEls.length; i++) {
                            forecastEls[i].innerHTML = "";
                            const forecastIndex = i * 8 + 4;
                            const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                            const forecastDay = forecastDate.getDate();
                            const forecastMonth = forecastDate.getMonth() + 1;
                            const forecastYear = forecastDate.getFullYear();
                            const forecastDateEl = document.createElement("p");
                            forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                            forecastDateEl.innerHTML = forecastMonth + "." + forecastDay + "." + forecastYear;
                            forecastEls[i].append(forecastDateEl);

                            // Icon for current weather
                            const forecastWeatherEl = document.createElement("img");
                            forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                            forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                            forecastEls[i].append(forecastWeatherEl);
                            const forecastTempEl = document.createElement("p");
                            forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                            forecastEls[i].append(forecastTempEl);
                            const forecastHumidityEl = document.createElement("p");
                            forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                            forecastEls[i].append(forecastHumidityEl);
                        }
                    })
            });
    }

    // Get history from local storage if any
    searchBtnEl.addEventListener("click", function () {
        const searchTerm = searchCityEl.value;
        getWeather(searchTerm);
        searchHistory.push(searchTerm);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        renderSearchHistory();
    })

    // Clear History button
    clearHistoryEl.addEventListener("click", function () {
        localStorage.clear();
        searchHistory = [];
        renderSearchHistory();
    })

    function k2f(K) {
        return Math.floor((K - 273.15) * 1.8 + 32);
    }

    function renderSearchHistory() {
        searchHistoryEl.innerHTML = "";
        for (let i = 0; i < searchHistory.length; i++) {
            const historyItem = document.createElement("input");
            historyItem.setAttribute("type", "text");
            historyItem.setAttribute("readonly", true);
            historyItem.setAttribute("class", "form-control d-block bg-white");
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click", function () {
                getWeather(historyItem.value);
            })
            searchHistoryEl.append(historyItem);
        }
    }

    renderSearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }
    
}

startSearch();


