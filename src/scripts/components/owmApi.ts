const generateApiKeyForm = (): string => {
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

const renderApiKeyForm = (): void => {
  const apiKeyForm = generateApiKeyForm();
  const apiKeyContainerDiv = document.createElement("div");
  apiKeyContainerDiv.id = "api-key-container";
  apiKeyContainerDiv.innerHTML = apiKeyForm;

  const mainDiv = document.getElementById("main") as HTMLDivElement;

  mainDiv.prepend(apiKeyContainerDiv);

  const apiKeyFormElement = document.getElementById(
    "api-key-form"
  ) as HTMLFormElement;
  apiKeyFormElement.addEventListener("submit", handleApiKeyFormSubmit);
};

const getApiKey = (): string | null => {
  return localStorage.getItem("owmApiKey");
};

const setApiKey = (apiKey: string): void => {
  localStorage.setItem("owmApiKey", apiKey);
};

const handleApiKeyFormSubmit = (event: Event): void => {
  event.preventDefault();
  const apiKeyInput = (event.target as HTMLFormElement).querySelector(
    "#api-key-input"
  ) as HTMLInputElement;
  const apiKeyValue = apiKeyInput.value.trim();

  if (apiKeyValue) {
    setApiKey(apiKeyValue);
    apiKeyInput.value = "";
    document.getElementById("api-key-container")?.remove();
    alert("API key saved successfully.");
  } else {
    alert("Please enter a valid API key.");
  }
};

const ensureApiKey = () => {
  const apiKey = getApiKey();
  if (!apiKey) {
    renderApiKeyForm();
  }
};

const main = (): void => {
  ensureApiKey();
};

export default main;
