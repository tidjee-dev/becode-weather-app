var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const citySearchForm = () => {
    const citySearchFormElement = document.querySelector("#city-search-form");
    const citySearchInput = document.querySelector("#city-search-input");
    citySearchFormElement.addEventListener("submit", (event) => {
        event.preventDefault();
        const city = citySearchInput.value.trim();
        if (city) {
            fetchWeatherData(city);
            fetchForecastData(city);
        }
        else {
            alert("Please enter a city name.");
        }
    });
    citySearchInput.addEventListener("input", handleCitySearchFormChange);
};
const fetchWeatherData = (city) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiKey = localStorage.getItem("owmApiKey");
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("City not found or invalid API key.");
        }
        const weatherData = yield response.json();
        const weatherContainer = document.getElementById("weather-container");
        weatherContainer.innerHTML = "";
        console.log(`weatherData (city = ${weatherData.name}):`, weatherData);
        return weatherData;
    }
    catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Could not fetch weather data. Please try again later.");
    }
});
const fetchForecastData = (city) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiKey = localStorage.getItem("owmApiKey");
        console.log(`city: ${encodeURIComponent(city)}`);
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("City not found or invalid API key.");
        }
        const forecastData = yield response.json();
        const forecastContainer = document.getElementById("forecast-container");
        forecastContainer.innerHTML = "";
        console.log(`forecastData (city = ${forecastData.city.name}):`, forecastData);
        return forecastData;
    }
    catch (error) {
        console.error("Error fetching forecast data:", error);
        alert("Could not fetch forecast data. Please try again later.");
    }
});
const generateDataList = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const cities = yield fetchCities(query);
    const cityList = document.getElementById("city-list");
    cityList.innerHTML = "";
    const uniqueCities = [...new Set(cities)];
    uniqueCities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        cityList.appendChild(option);
    });
});
const handleCitySearchFormChange = (event) => {
    const input = event.target.value;
    if (input.length >= 3) {
        generateDataList(input);
    }
};
const fetchCities = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const city = query;
        const url = `http://api.geonames.org/searchJSON?name_startsWith=${city}&featureClass=P&maxRows=10&username=tidjee`;
        const response = yield fetch(url, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res = yield response.json();
        if (res && Array.isArray(res.geonames)) {
            const cities = [];
            res.geonames.forEach((city) => {
                cities.push(`${city.name}, ${city.adminName1} (${city.countryCode})`);
            });
            const filteredCities = cities.filter((city) => city.toLowerCase().startsWith(query.toLowerCase()));
            return filteredCities.slice(0, 10);
        }
        else {
            console.error("Unexpected data structure from API:", res);
            return [];
        }
    }
    catch (error) {
        console.error("Error fetching cities:", error);
        return [];
    }
});
const main = () => {
    citySearchForm();
};
export default main;
