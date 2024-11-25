const citySearchForm = (): void => {
  const citySearchFormElement = document.querySelector(
    "#city-search-form"
  ) as HTMLFormElement;
  const citySearchInput = document.querySelector(
    "#city-search-input"
  ) as HTMLInputElement;

  citySearchFormElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = citySearchInput.value.trim();

    if (city) {
      fetchWeatherData(city);
      // fetchForecastData(city);
    } else {
      alert("Please enter a city name.");
    }
  });

  citySearchInput.addEventListener("input", handleCitySearchFormChange);
};

const fetchWeatherData = async (city: string) => {
  try {
    const apiKey = localStorage.getItem("owmApiKey");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found or invalid API key.");
    }

    const data = await response.json();

    const weatherContainer = document.getElementById(
      "weather-container"
    ) as HTMLDivElement;

    weatherContainer.innerHTML = "";

    weather(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Could not fetch weather data. Please try again later.");
  }
};

const fetchForecastData = async (city: string) => {
  try {
    const apiKey = localStorage.getItem("owmApiKey");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found or invalid API key.");
    }

    const data = await response.json();

    const forecastContainer = document.getElementById(
      "forecast-container"
    ) as HTMLDivElement;

    forecastContainer.innerHTML = "";

    forecast(data);
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    alert("Could not fetch forecast data. Please try again later.");
  }
};

const generateDataList = async (query: string) => {
  const cities = await fetchCities(query);

  const cityList = document.getElementById("city-list") as HTMLDataListElement;
  cityList.innerHTML = "";

  const uniqueCities = [...new Set(cities)];

  uniqueCities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    cityList.appendChild(option);
  });
};

const handleCitySearchFormChange = (event: Event): void => {
  const input = (event.target as HTMLInputElement).value;
  if (input.length >= 3) {
    generateDataList(input);
  }
};

const fetchCities = async (query: string): Promise<string[]> => {
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

    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const res = await response.json();

    if (res && Array.isArray(res.data)) {
      const cities: string[] = [];

      res.data.forEach((country: { country: string; cities: string[] }) => {
        country.cities.forEach((city) => {
          cities.push(`${city}, ${country.country}`);
        });
      });

      const filteredCities = cities.filter((city) =>
        city.toLowerCase().startsWith(query.toLowerCase())
      );

      return filteredCities.slice(0, 10);
    } else {
      console.error("Unexpected data structure from API:", res);
      return [];
    }
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};

const weather = (data: any) => {
  const weatherContainer = document.getElementById(
    "weather-container"
  ) as HTMLDivElement;
  weatherContainer.innerHTML = `
    <h2>Weather in ${data.name}</h2>
    <p>${data.weather[0].description}</p>
    <p>Temperature: ${data.main.temp}°C</p>
  `;
};

const forecast = (data: any) => {
  const forecastContainer = document.getElementById(
    "forecast-container"
  ) as HTMLDivElement;

  forecastContainer.innerHTML = `
    <h2>5-Day Forecast</h2>
    <ul>
      ${data.list
        .map(
          (forecast: any) => `
            <li>
              <p>${forecast.dt_txt}</p>
              <p>${forecast.weather[0].description}</p>
              <p>Temperature: ${forecast.main.temp}°C</p>
            </li>
          `
        )
        .join("")}
    </ul>
  `;
};

const main = (): void => {
  citySearchForm();
};

export default main;
