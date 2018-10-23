import {
    Game
} from './game';

class Main {
    game;

    constructor() {}

    start() {
        this.game = new Game();
        this.game.start();
    }
}

new Main().start();