const notifContainer = document.getElementById(
  "notifs-container"
) as HTMLDivElement;

const generateNotification = (message: string, type: string): string => {
  return `
  <div class="notif ${type}">
    <p class="notif-message">${message}</p>
  </div>
  `;
};

const renderNotification = (message: string, type: string): void => {
  const notification = generateNotification(message, type);
  notifContainer.innerHTML = notification;
};

const timeoutNotifications = (time: number): void => {
  setTimeout((): void => {
    notifContainer.innerHTML = "";
  }, time);
};

const main = (message: string, type: string, time: number = 5000): void => {
  renderNotification(message, type);
  timeoutNotifications(time);
};

export default main;
