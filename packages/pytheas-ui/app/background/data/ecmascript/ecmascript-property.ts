import { PyElement } from '../py-element';
import tsAstFinder, { NodeObject } from '../ts-ast-finder';

export class ECMAScriptProperty extends PyElement {
    constructor(propertyNode: NodeObject) {
        super();
        this.name = tsAstFinder.getName(propertyNode);
    }
}
