import { PyRelation, RelationTypes } from './py-relation';

const { uniqid } = <any>window;

enum BasicTypes {
    number,
    boolean,
    string,
    object,
    date,
    function
}

export class PyElement {
    name: string;
    relations: any[] = [];
    id: string;
    file: any;

    constructor() {
        this.id = uniqid();
    }

    hasRelation(from: string, to: string, type: string) {
        let test = false;
        this.relations.forEach(relation => {
            if (relation.from === from && relation.to === to && relation.type === type) {
                test = true;
            }
        });
        return test;
    }

    addRelation(from: any, to: any, toType: string, type: RelationTypes) {
        if (!this.hasRelation(from, to, type) && !(to in BasicTypes)) {
            this.relations.push(new PyRelation(from, to, toType, type));
        }
    }
}
