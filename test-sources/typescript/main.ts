import { Game } from './game';

class Main {
    game: Game;

    constructor() {}

    public start() {
        this.game = new Game();
        this.game.start();
    }
}

new Main().start();
