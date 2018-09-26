import DropWindowManager from './drop-window';

import FilesParser from '../files-parser';

import dragMock from '../../test/vendors/drag-mock/src';

beforeAll(() => {
    DropWindowManager.init();
});

describe('should drop files', () => {
    beforeEach(() => {
        var dragSource = document.createElement('div');
        dragMock
            .dragStart(dragSource, null, (event: any, eventName: any) => {
                if (event.dataTransfer) {
                    event.dataTransfer.setData('application/javascript', `import { Player } from './player';
class Game {
    player1;
    player2;
    constructor() {}
    start() {
        this.player1 = new Player('Eric');
        this.player2 = new Player('Henry');
        this.clearUI();
    }
    clearUI() {}
}
new Game();
`);
                }
            })
            .drop(document, (dropEvent: any) => {});
    });

    test('drop', () => {
        /*let files = FilesParser.getParsedFiles();
        console.log(files);
        setTimeout(() => {
            expect(files.length).toBe(1);
            done();
        }, 1000);*/
        const variable = DropWindowManager.test();
        expect(variable).toBeTruthy();
    });
});