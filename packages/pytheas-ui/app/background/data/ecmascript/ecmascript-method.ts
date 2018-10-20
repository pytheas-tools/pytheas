import { PyElement } from '../py-element';
import tsAstFinder, { NodeObject } from '../ts-ast-finder';

export class ECMAScriptMethod extends PyElement {
    constructor(propertyNode: NodeObject) {
        super();
        this.name = tsAstFinder.getName(propertyNode);
    }
}
