const { app, BrowserWindow, ipcMain, Tray, nativeImage } = require('electron');
const path = require('path');
const base64Icon = require('./base64Icon');
const { showWindow, toggleWindow } = require('./mainWindow');

const assetsDir = path.join(__dirname, 'assets');

let tray = null;
let window = null;

// This method is called once Electron is ready to run our code
// It is effectively the main method of our Electron app
app.on('ready', () => {
  // Setup the menubar with an icon
  const icon = nativeImage.createFromDataURL(base64Icon);
  tray = new Tray(icon);

  // Add a click handler so that when the user clicks on the menubar icon, it shows
  // our popup window
  tray.on('click', (event) => {
    toggleWindow(window, tray);

    // Show devtools when command clicked
    if (window.isVisible() && process.defaultApp && event.metaKey) {
      window.openDevTools({ mode: 'detach' });
    }
  });

  // Make the popup window for the menubar
  window = new BrowserWindow({
    width: 600,
    height: 650,
    show: false,
    frame: false,
    resizable: false,
    // this fixed all the errors slack authorize was giving. get rid of ipc.
    // this a quick work around but need to figure out issue with out this statement
    webPreferences: { nodeIntegration: false }
  });

  // Tell the popup window to load our index.html file
  // window.loadURL(`file://${path.join(__dirname, 'index.html')}`);
  window.loadURL('http://localhost:2020');
  window.webContents.openDevTools();

  // Only close the window on blur if dev tools isn't opened
  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide();
    }
  });

  // clean up, so the javascript garbage collector will not have to
  window.on('close', () => {
    window = null;
  });
});

ipcMain.on('show-window', () => {
  showWindow(window, tray);
});

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
