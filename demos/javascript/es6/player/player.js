import { PLAYER_TYPES } from './player-types';

export class Player {
    name;
    power;

    type = PLAYER_TYPES.SOLDIER;

    constructor(name) {
        this.name = name;
    }

    init(power) {
        this.power = power;
    }
}