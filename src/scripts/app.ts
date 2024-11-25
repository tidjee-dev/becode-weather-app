import darkMode from "./components/darkMode.js";
import owmApi from "./components/owmApi.js";
import citySearchForm from "./components/citySearch.js";
// import weather from "./components/weather.js";
// import forecast from "./components/forecast.js";
import generateFooter from "./components/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  darkMode();
  owmApi();
  citySearchForm();
  // weather();
  // forecast();
  generateFooter();
});
