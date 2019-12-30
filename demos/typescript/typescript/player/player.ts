import { PLAYER_TYPES } from './player-types';
import { Weapon } from '../weapon/weapon';

export class Player {
    name: string;
    power: number;

    weapon: Weapon;

    type = PLAYER_TYPES.SOLDIER;

    constructor(name: string) {
        this.name = name;
        this.weapon = new Weapon(`weapon-${name}`);
    }

    init(power: number) {
        this.power = power;
    }
}
