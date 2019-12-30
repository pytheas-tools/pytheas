import { Game } from './game';

class MainBackup {
    game: Game;

    constructor() {}

    public start() {
        this.game = new Game();
        this.game.start();
    }
}

new MainBackup().start();
