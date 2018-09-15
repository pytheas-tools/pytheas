export class Player {
    name: string;
    power: number;

    constructor(name: string) {
        this.name = name;
    }

    init(power: number) {
        this.power = power;
    }
}
