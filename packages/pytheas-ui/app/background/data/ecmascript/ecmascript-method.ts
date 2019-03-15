import { PyElement } from '../py-element';
import tsAstFinder, { NodeObject, TokenObject } from './ts-ast-finder';

import ECMAScriptParser from './ecmascript-parser';

export class ECMAScriptMethod extends PyElement {
    kind = 'method';
    constructor(methodNode: NodeObject) {
        super();
        this.name = tsAstFinder.getName(methodNode);
        if (methodNode.modifiers && methodNode.modifiers.length > 0) {
            this.modifiers = methodNode.modifiers.map((modifier: TokenObject) => {
                return ECMAScriptParser.getSyntaxKindName(modifier.kind);
            });
        }
    }
}
