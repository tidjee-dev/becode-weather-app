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
            // fetchForecastData(city);
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
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("City not found or invalid API key.");
        }
        const data = yield response.json();
        const weatherContainer = document.getElementById("weather-container");
        weatherContainer.innerHTML = "";
        weather(data);
    }
    catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Could not fetch weather data. Please try again later.");
    }
});
const fetchForecastData = (city) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiKey = localStorage.getItem("owmApiKey");
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("City not found or invalid API key.");
        }
        const data = yield response.json();
        const forecastContainer = document.getElementById("forecast-container");
        forecastContainer.innerHTML = "";
        forecast(data);
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
    // try {
    //   const apiKey = localStorage.getItem("owmApiKey");
    //   const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${apiKey}`;
    //   const response = await fetch(url);
    //   if (!response.ok) {
    //     throw new Error("Error fetching city suggestions.");
    //   }
    //   const data = await response.json();
    //   return data.map((location: any) => location.name);
    // } catch (error) {
    //   console.error("Error fetching cities:", error);
    //   return [];
    // }
    try {
        const url = "https://countriesnow.space/api/v0.1/countries/";
        const response = yield fetch(url, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res = yield response.json();
        if (res && Array.isArray(res.data)) {
            const cities = [];
            res.data.forEach((country) => {
                country.cities.forEach((city) => {
                    cities.push(`${city}, ${country.country}`);
                });
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
const weather = (data) => {
    const weatherContainer = document.getElementById("weather-container");
    weatherContainer.innerHTML = `
    <h2>Weather in ${data.name}</h2>
    <p>${data.weather[0].description}</p>
    <p>Temperature: ${data.main.temp}°C</p>
  `;
};
const forecast = (data) => {
    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = `
    <h2>5-Day Forecast</h2>
    <ul>
      ${data.list
        .map((forecast) => `
            <li>
              <p>${forecast.dt_txt}</p>
              <p>${forecast.weather[0].description}</p>
              <p>Temperature: ${forecast.main.temp}°C</p>
            </li>
          `)
        .join("")}
    </ul>
  `;
};
const main = () => {
    citySearchForm();
};
export default main;
