import { PyElement } from '../py-element';
import { NodeObject, TokenObject, TsAstFinder } from './ts-ast-finder';

import { ECMAScriptParser } from './ecmascript-parser';

export class ECMAScriptMethod extends PyElement {
    kind = 'method';
    constructor(methodNode: NodeObject) {
        super();
        this.name = TsAstFinder.getName(methodNode);
        if (methodNode.modifiers && methodNode.modifiers.length > 0) {
            this.modifiers = methodNode.modifiers.map((modifier: TokenObject) => {
                return ECMAScriptParser.getSyntaxKindName(modifier.kind);
            });
        }
    }
}
