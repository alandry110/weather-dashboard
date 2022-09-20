var searchInput = document.querySelector('#search-city')
var searchBtn = document.querySelector('#search-button');
var citiesEl = document.querySelector('.list-group');
var citySelected = document.querySelector('#city-selected');
var currentTemp = document.querySelector('#current-temp');
var currentWind = document.querySelector('#current-wind');
var currentHumidity = document.querySelector('#current-humidity');
var currentUVIndex = document.querySelector('#current-uvIndex');
var weeklyForecast = document.querySelector('#fiveDayForecast');

var apiKey = '0327e827733813560b272ec06c5f8ba8';

searchBtn.addEventListener('click', function() {
    var searchCity = searchInput.value 

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=1&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        }) .then(function (data) {
            var latKey = data[0].lat;
            var lonKey = data[0].lon;
            
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latKey}&lon=${lonKey}&appid=${apiKey}`)
                .then(function (response) {
                    return response.json();
                }) .then(function (weather) {
                    weather[].
                })
        })
})



