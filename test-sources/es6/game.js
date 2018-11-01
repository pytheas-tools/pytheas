import { Player } from './player/player';

import { Rule } from './rule/rule';

export class Game {
    player1;
    player2;

    rule;

    constructor() {}

    start() {
        this.player1 = new Player('Eric');
        this.player2 = new Player('Henry');
        this.rule = new Rule('An important rule');
        this.clearUI();
    }

    clearUI() {}
}