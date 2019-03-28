import { Player } from './player/player';
import { Rule } from './rule/rule';
import { Settings } from './settings';

export class Game {
    player1: Player;
    public player2: Player;

    players: Player[];
    morePlayers: Array<Player>;

    private rule: Rule;

    private settings: Settings = new Settings();

    constructor() {
        this.start();
    }

    public start() {
        this.player1 = new Player('Eric');
        this.player2 = new Player('Henry');
        this.rule = new Rule('An important rule');
        this.clearUI();
    }

    private clearUI() {}

    simpleMethod() {
        this.clearUI();
    }
}
