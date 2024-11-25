function getTheme() {
    return localStorage.getItem("theme") || "light";
}
function updateThemeIcon(isDark) {
    const themeIcon = document.querySelector(".theme-icon");
    themeIcon.innerHTML = isDark ? "☀️" : "🌜";
}
const setTheme = (theme) => {
    const body = document.querySelector("body");
    if (!body)
        return;
    body.classList.remove("dark", "light");
    body.classList.add(theme);
    updateThemeIcon(theme === "dark");
    localStorage.setItem("theme", theme);
};
const toggleTheme = () => {
    const currentTheme = getTheme();
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
};
const initializeDarkMode = () => {
    const themeSwitcher = document.querySelector("#theme-switcher");
    const body = document.querySelector("body");
    if (!body || !themeSwitcher)
        return;
    const theme = getTheme();
    setTheme(theme === "dark" ? theme : "light");
    themeSwitcher.addEventListener("click", toggleTheme);
};
export default initializeDarkMode;
