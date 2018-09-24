module.exports = {
    init
};

const { Menu, dialog } = require('electron');

const window = require('./window');

let menu = null;

function init() {
    menu = Menu.buildFromTemplate(getMenuTemplate());
    Menu.setApplicationMenu(menu);
}

function getMenuTemplate() {
    const template = [
        {
            label: 'Project',
            submenu: [
                {
                    label: 'Load folder',
                    click: () => {
                        dialog.showOpenDialog(
                            window.win,
                            {
                                properties: ['openDirectory']
                            },
                            selectedPaths => {
                                if (!Array.isArray(selectedPaths)) return;
                                window.dispatch(
                                    'folder-selected',
                                    selectedPaths
                                );
                            }
                        );
                    }
                }
            ]
        }
    ];

    if (process.platform === 'darwin') {
        template.unshift({
            label: 'Pytheas',
            submenu: [
                {
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'hide'
                },
                {
                    role: 'hideothers'
                },
                {
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'quit'
                }
            ]
        });
    }

    return template;
}
