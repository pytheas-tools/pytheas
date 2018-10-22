import { PyRelation, RelationTypes } from './py-relation';

const { uniqid } = <any>window;

export class PyElement {
    name: string;
    relations: any[] = [];
    id: string;

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

    addRelation(from: string, to: string, type: RelationTypes) {
        if (!this.hasRelation(from, to, type)) {
            this.relations.push(new PyRelation(from, to, type));
        }
    }
}
