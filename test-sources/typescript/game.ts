import { Player } from './player';

class Game {
    player1: Player;
    player2: Player;

    constructor() {}

    public start() {
        this.player1 = new Player('Eric');
        this.player2 = new Player('Henry');
        this.clearUI();
    }

    private clearUI() {}
}

new Game();
