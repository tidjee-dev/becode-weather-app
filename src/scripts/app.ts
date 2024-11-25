import darkMode from "./components/_darkMode.js";
import owmApi from "./components/_owmApi.js";
import citySearchForm from "./components/_citySearch.js";
// import weather from "./components/weather.js";
// import forecast from "./components/forecast.js";
import generateFooter from "./components/_footer.js";

document.addEventListener("DOMContentLoaded", () => {
  darkMode();
  owmApi();
  citySearchForm();
  // weather();
  // forecast();
  generateFooter();
});
