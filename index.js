'use strict';
const electron = require('electron');
const app = electron.app;
const ipc = electron.ipcMain;
const expApp = require('./server/app.js');
// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 1280,
		height: 720,
		darkTheme: true
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});

var fullscreen = false;

ipc.on('toggle-full-screen', function() {
  if(fullscreen == false) {
    fullscreen = true;
    mainWindow.setFullScreen(true);
  } else {
    fullscreen = false;
    mainWindow.setFullScreen(false);
    mainWindow.show();
  }
})
