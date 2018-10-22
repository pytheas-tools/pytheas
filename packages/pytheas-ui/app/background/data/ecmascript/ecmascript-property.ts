import { PyElement } from '../py-element';
import tsAstFinder, { NodeObject } from './ts-ast-finder';

export class ECMAScriptProperty extends PyElement {
    type: string;

    constructor(propertyNode: NodeObject) {
        super();
        this.name = tsAstFinder.getName(propertyNode);
        if (propertyNode.type) {
            this.type = tsAstFinder.getType(propertyNode.type);
        }
    }
}
