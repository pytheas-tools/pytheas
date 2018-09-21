const electron = require('electron');
const { app } = electron;

const menu = require('./menu');
const window = require('./window');

const APP_NAME = 'Pytheas';
app.setName(APP_NAME);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    console.log('Create window');

    window.init();
    menu.init();
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
    app.quit();
});

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
