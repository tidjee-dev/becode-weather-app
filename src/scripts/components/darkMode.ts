function getTheme(): string {
  return localStorage.getItem("theme") || "light";
}

function updateThemeIcon(isDark: boolean): void {
  const themeIcon = document.querySelector(".theme-icon") as HTMLSpanElement;
  themeIcon.innerHTML = isDark ? "☀️" : "🌜";
}

const setTheme = (theme: "dark" | "light"): void => {
  const body = document.querySelector("body");
  if (!body) return;

  body.classList.remove("dark", "light");
  body.classList.add(theme);

  updateThemeIcon(theme === "dark");
  localStorage.setItem("theme", theme);
};

const toggleTheme = (): void => {
  const currentTheme = getTheme();
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
};

const initializeDarkMode = (): void => {
  const themeSwitcher = document.querySelector("#theme-switcher");
  const body = document.querySelector("body");

  if (!body || !themeSwitcher) return;

  const theme = getTheme();
  setTheme(theme === "dark" ? theme : "light");
  themeSwitcher.addEventListener("click", toggleTheme);
};

export default initializeDarkMode;
