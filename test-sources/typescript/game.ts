import { Player } from './player/player';
import { Rule } from './rule/rule';

export class Game {
    player1: Player;
    public player2: Player;

    private rule: Rule;

    constructor() {}

    public start() {
        this.player1 = new Player('Eric');
        this.player2 = new Player('Henry');
        this.rule = new Rule('An important rule');
        this.clearUI();
    }

    private clearUI() {}

    simpleMethod() {}
}
