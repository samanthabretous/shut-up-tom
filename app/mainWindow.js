const showWindow = (mainWindow, tray) => {
  const trayPos = tray.getBounds();
  const windowPos = mainWindow.getBounds();
  let x = 0;
  let y = 0;
  if (process.platform == 'darwin') {
    x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2));
    y = Math.round(trayPos.y + trayPos.height)
  } else {
    x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2));
    y = Math.round(trayPos.y + trayPos.height * 10)
  }

  mainWindow.setPosition(x, y, false);
  mainWindow.show();
  mainWindow.focus();
};

const toggleWindow = (mainWindow, tray) => {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    showWindow(mainWindow, tray);
  }
};

module.exports = {
  showWindow,
  toggleWindow,
};
