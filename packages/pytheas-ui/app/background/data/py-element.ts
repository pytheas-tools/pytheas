const { uniqid } = <any>window;

export class PyElement {
    name: string;
    relations: any[];
    id: string;

    constructor() {
        this.id = uniqid();
    }
}
