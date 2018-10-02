import {
    Player
} from './player/player';

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