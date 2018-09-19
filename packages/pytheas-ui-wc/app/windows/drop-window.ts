import Parser from '../parser';

class DropWindow {
    $element: HTMLElement;

    private static instance: DropWindow;
    private constructor() {}
    static getInstance() {
        if (!DropWindow.instance) {
            DropWindow.instance = new DropWindow();
        }
        return DropWindow.instance;
    }

    init() {
        console.log('DropWindow init');
        document.addEventListener('drop', (ev: DragEvent) => {
            console.log('ondrop: ', ev);
            ev.preventDefault();
            console.log('ev.dataTransfer.items: ', ev.dataTransfer.items);

            let items: DataTransferItemList = ev.dataTransfer.items;

            if (items) {
                const readPromise = new Promise((readResolve, readReject) => {
                    const itemsLength = items.length;
                    let i = 0;
                    const loopItems = () => {
                        if (i < itemsLength) {
                            const item: DataTransferItem = items[i];
                            if (item.webkitGetAsEntry) {
                                const entry:
                                    | FileEntry
                                    | DirectoryEntry = item.webkitGetAsEntry();
                                console.log(entry);

                                const listFiles = files => {
                                    console.log('listFiles: ', files);
                                };

                                function toArray(list) {
                                    return Array.prototype.slice.call(
                                        list || [],
                                        0
                                    );
                                }

                                const isFolder = entry
                                    ? entry.isDirectory
                                    : false;
                                if (isFolder) {
                                    console.log('dir');
                                    const dirReader = entry.createReader();
                                    let entries = [];
                                    const readEntries = function() {
                                        dirReader.readEntries(function(
                                            readResults: FileEntry[]
                                        ) {
                                            console.log(
                                                'readResults: ',
                                                readResults
                                            );
                                            if (!readResults.length) {
                                                listFiles(readResults.sort());
                                            } else {
                                                entries = entries.concat(
                                                    toArray(readResults)
                                                );
                                                readEntries();
                                            }
                                        });
                                    };
                                    readEntries();
                                } else {
                                    var file = items[i].getAsFile();
                                    console.log(
                                        '... file[' +
                                            i +
                                            '].name = ' +
                                            file.name
                                    );
                                    Parser.addFile(file);
                                    i++;
                                    loopItems();
                                }
                            }
                        } else {
                            readResolve();
                        }
                    };
                    for (let i = 0; i < length; i++) {}
                    loopItems();
                });

                readPromise.then(() => {
                    Parser.parseFiles();
                });
            }
        });
        document.addEventListener('dragover', () => {
            // Prevent default behavior (Prevent file from being opened)
            event.preventDefault();
        });
    }
}

export default new DropWindow();
