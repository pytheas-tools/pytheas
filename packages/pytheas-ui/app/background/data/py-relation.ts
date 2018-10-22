const { uniqid } = <any>window;

export enum RelationTypes {
    In = 'in',
    Out = 'out'
}

export class PyRelation {
    type: RelationTypes;
    from: string;
    to: string;

    constructor(from: string, to: string, type: RelationTypes) {
        this.type = type;
        this.from = from;
        this.to = to;
    }
}
