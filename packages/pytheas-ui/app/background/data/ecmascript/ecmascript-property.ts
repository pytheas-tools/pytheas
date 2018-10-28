import { PyElement } from '../py-element';
import tsAstFinder, { NodeObject, TokenObject } from './ts-ast-finder';

export class ECMAScriptProperty extends PyElement {
    type: string;
    typeKind: string;
    kind = 'property';

    constructor(propertyNode: NodeObject) {
        super();
        this.name = tsAstFinder.getName(propertyNode);
        if (propertyNode.type) {
            this.type = tsAstFinder.getType(propertyNode.type);
            this.typeKind = tsAstFinder.getTypeKind(propertyNode.type);
        }
        if (propertyNode.modifiers && propertyNode.modifiers.length > 0) {
            this.modifiers = propertyNode.modifiers.map((modifier: TokenObject) => {
                return modifier.text;
            });
        }
    }
}
