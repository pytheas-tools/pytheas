export enum RelationTypes {
    In = 'in',
    Out = 'out'
}

export class PyRelation {
    type: RelationTypes;
    from: any;
    to: any;
    toType: string;

    constructor(from: any, to: any, toType: string, type: RelationTypes) {
        this.type = type;
        this.from = from;
        this.to = to;
        this.toType = toType;
    }
}
