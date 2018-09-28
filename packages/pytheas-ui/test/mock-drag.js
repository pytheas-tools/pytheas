window.startMockDrag = () => {
    var dragSource = document.createElement('div');
    dragMock
        .dragStart(dragSource, null, event => {
            if (event.dataTransfer) {
                event.dataTransfer.setData(
                    'application/javascript',
                    'game.js',
                    `import { Player } from './player';
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
`
                );
            }
        })
        .drop(document, dropEvent => {});
};
