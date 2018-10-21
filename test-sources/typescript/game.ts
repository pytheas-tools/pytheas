import { Player } from './player/player';
import { Rule } from './rule/rule';

class Game {
    player1: Player;
    player2: Player;

    rule: Rule;

    constructor() {}

    public start() {
        this.player1 = new Player('Eric');
        this.player2 = new Player('Henry');
        this.rule = new Rule('An important rule');
        this.clearUI();
    }

    private clearUI() {}
}

new Game();
