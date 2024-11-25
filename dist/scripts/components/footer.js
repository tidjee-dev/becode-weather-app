const generateFooter = () => {
    const footer = document.getElementById("footer");
    footer.innerHTML = `
    <p>&copy; ${new Date().getFullYear()} - The Weather App by <a class="footer-link" href="https://github.com/tidjee-dev" target="_blank">Tidjee</a></p>
  `;
};
export default generateFooter;
