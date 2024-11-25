const generateApiKeyForm = () => {
    return `
  <div class="api-key-form-container" id="api-key-form-container">
    <p class="api-key-form-title">Enter your OpenWeatherMap API key:</p>
    <form id="api-key-form">
      <input type="text" id="api-key-input" placeholder="Enter API key" required>
      <button type="submit">Submit</button>
    </form>
    <p class="api-key-form-footer">If you don't have an API key, you can get one
      <a class="api-key-form-footer-link" href="https://home.openweathermap.org/api_keys" target="_blank">
        here
      </a>
    </p>
  </div>
  `;
};
const renderApiKeyForm = () => {
    const apiKeyForm = generateApiKeyForm();
    const apiKeyContainerDiv = document.createElement("div");
    apiKeyContainerDiv.id = "api-key-container";
    apiKeyContainerDiv.innerHTML = apiKeyForm;
    const mainDiv = document.getElementById("main");
    mainDiv.prepend(apiKeyContainerDiv);
    const apiKeyFormElement = document.getElementById("api-key-form");
    apiKeyFormElement.addEventListener("submit", handleApiKeyFormSubmit);
};
const getApiKey = () => {
    return localStorage.getItem("owmApiKey");
};
const setApiKey = (apiKey) => {
    localStorage.setItem("owmApiKey", apiKey);
};
const handleApiKeyFormSubmit = (event) => {
    var _a;
    event.preventDefault();
    const apiKeyInput = event.target.querySelector("#api-key-input");
    const apiKeyValue = apiKeyInput.value.trim();
    if (apiKeyValue) {
        setApiKey(apiKeyValue);
        apiKeyInput.value = "";
        (_a = document.getElementById("api-key-container")) === null || _a === void 0 ? void 0 : _a.remove();
        alert("API key saved successfully.");
    }
    else {
        alert("Please enter a valid API key.");
    }
};
const ensureApiKey = () => {
    const apiKey = getApiKey();
    if (!apiKey) {
        renderApiKeyForm();
    }
};
const main = () => {
    ensureApiKey();
};
export default main;
