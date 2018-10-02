import { PLAYER_TYPES } from './player-types';

export class Player {
    name: string;
    power: number;

    type = PLAYER_TYPES.SOLDIER;

    constructor(name: string) {
        this.name = name;
    }

    init(power: number) {
        this.power = power;
    }
}
