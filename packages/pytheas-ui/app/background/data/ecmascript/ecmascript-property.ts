import { PyElement } from '../py-element';
import { NodeObject, TokenObject, TsAstFinder } from './ts-ast-finder';

import { ECMAScriptParser } from './ecmascript-parser';

export class ECMAScriptProperty extends PyElement {
    type: string;
    typeKind: string;
    kind = 'property';

    constructor(propertyNode: NodeObject) {
        super();
        this.name = TsAstFinder.getName(propertyNode);
        if (propertyNode.type) {
            this.type = TsAstFinder.getType(propertyNode.type);
            this.typeKind = TsAstFinder.getTypeKind(propertyNode.type);
        }
        if (propertyNode.modifiers && propertyNode.modifiers.length > 0) {
            this.modifiers = propertyNode.modifiers.map((modifier: TokenObject) => {
                return ECMAScriptParser.getSyntaxKindName(modifier.kind);
            });
        }
    }
}
