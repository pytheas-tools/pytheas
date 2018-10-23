export enum RelationTypes {
    In = 'in',
    Out = 'out'
}

export class PyRelation {
    type: RelationTypes;
    from: string;
    to: string;
    toType: string;

    constructor(from: string, to: string, toType: string, type: RelationTypes) {
        this.type = type;
        this.from = from;
        this.to = to;
        this.toType = toType;
    }
}
