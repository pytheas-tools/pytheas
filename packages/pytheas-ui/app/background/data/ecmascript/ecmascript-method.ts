import { PyElement } from '../py-element';
import tsAstFinder, { NodeObject, TokenObject } from '../ts-ast-finder';

export class ECMAScriptMethod extends PyElement {
    modifiers: string[];
    constructor(methodNode: NodeObject) {
        super();
        this.name = tsAstFinder.getName(methodNode);
        if (methodNode.modifiers && methodNode.modifiers.length > 0) {
            this.modifiers = methodNode.modifiers.map((modifier: TokenObject) => {
                return modifier.text;
            });
        }
    }
}
