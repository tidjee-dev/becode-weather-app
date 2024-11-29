const notifContainer = document.getElementById("notifs-container");
const generateNotification = (message, type) => {
    return `
  <div class="notif ${type}">
    <p class="notif-message">${message}</p>
  </div>
  `;
};
const renderNotification = (message, type) => {
    const notification = generateNotification(message, type);
    notifContainer.innerHTML = notification;
};
const timeoutNotifications = (time) => {
    setTimeout(() => {
        notifContainer.innerHTML = "";
    }, time);
};
const main = (message, type, time = 5000) => {
    renderNotification(message, type);
    timeoutNotifications(time);
};
export default main;
