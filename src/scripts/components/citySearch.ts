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
      fetchForecastData(city);
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
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found or invalid API key.");
    }

    const weatherData = await response.json();

    const weatherContainer = document.getElementById(
      "weather-container"
    ) as HTMLDivElement;

    weatherContainer.innerHTML = "";

    console.log(`weatherData (city = ${weatherData.name}):`, weatherData);
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Could not fetch weather data. Please try again later.");
  }
};

const fetchForecastData = async (city: string) => {
  try {
    const apiKey = localStorage.getItem("owmApiKey");

    console.log(`city: ${encodeURIComponent(city)}`);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found or invalid API key.");
    }

    const forecastData = await response.json();

    const forecastContainer = document.getElementById(
      "forecast-container"
    ) as HTMLDivElement;

    forecastContainer.innerHTML = "";

    console.log(
      `forecastData (city = ${forecastData.city.name}):`,
      forecastData
    );
    return forecastData;
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
  try {
    const city = query;
    const url = `http://api.geonames.org/searchJSON?name_startsWith=${city}&featureClass=P&maxRows=10&username=tidjee`;

    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const res = await response.json();

    if (res && Array.isArray(res.geonames)) {
      const cities: string[] = [];

      res.geonames.forEach(
        (city: { name: string; adminName1: string; countryCode: string }) => {
          cities.push(`${city.name}, ${city.adminName1} (${city.countryCode})`);
        }
      );

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

const main = (): void => {
  citySearchForm();
};

export default main;
