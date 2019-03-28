import { uniqId } from '../../utils';
import { PyRelation, RelationTypes } from './py-relation';

enum BasicTypes {
    number,
    boolean,
    string,
    object,
    date,
    function,
    Promise
}

export class PyElement {
    name: string;
    relations: any[] = [];
    id: string;
    file: any;
    modifiers: string[];

    constructor() {
        this.id = uniqId();
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

    getInRelations() {
        return this.relations.filter(relation => relation.type === RelationTypes.In);
    }

    getOutRelations() {
        return this.relations.filter(relation => relation.type === RelationTypes.Out);
    }
}
