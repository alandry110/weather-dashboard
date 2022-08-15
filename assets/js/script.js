var searchInput = document.querySelector('#search-city')
var searchBtn = document.querySelector('#search-button');
var citiesEl = document.querySelector('.list-group');
var citySelected = document.querySelector('#city-selected');
var currentTemp = document.querySelector('#current-temp');
var currentWind = document.querySelector('#current-wind');
var currentHumidity = document.querySelector('#current-humidity');
var currentUVIndex = document.querySelector('#current-uvIndex');
var weeklyForecast = document.querySelector('#fiveDayForecast');

var apiKey = '&appid=64711a3a34371e60842ce5f4745dc7bf';
var URLWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + '&units=imperial' + apiKey;
var URLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + '&units=imperial' + apiKey;
var cityName = localStorage.getItem('saveCityName');


function saveCityData() {
    localStorage.setItem('saveCityName', searchInput.value);
};

searchBtn.addEventListener('click', saveCityData);
console.log('click');
