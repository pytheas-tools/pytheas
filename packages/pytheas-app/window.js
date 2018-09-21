const main = (module.exports = {
    dispatch,
    init,
    send,
    win: null
});

const electron = require('electron');

const isDev = process.env.PYTHEAS_ENV === 'DEV';

function init() {
    const win = (main.win = new electron.BrowserWindow({
        width: 1024,
        height: 768
    }));

    let url = isDev
        ? 'http://localhost/Projets/open-source/pytheas/pytheas/packages/pytheas-ui-wc/.tmp/'
        : `file://${__dirname}/dist-ui/index.html`;

    win.loadURL(url);

    if (isDev) {
        win.webContents.openDevTools();
    }

    win.on('closed', function() {
        mainWindow = null;
    });

    win.maximize();
}

function dispatch(...args) {
    send('dispatch', ...args);
}

function send(...args) {
    if (!main.win) return;
    main.win.webContents.send(...args);
}
