import { LineAndCharacter, SourceFile } from 'typescript';

import { PyElement } from '../py-element';
import { NodeObject, TokenObject, TsAstFinder } from './ts-ast-finder';

import { ECMAScriptParser } from './ecmascript-parser';

const nodeToRange = (node: any): [number, number] => {
    if (typeof node.getStart === 'function' && typeof node.getEnd === 'function') {
        return [node.getStart(), node.getEnd()];
    } else if (typeof node.pos !== 'undefined' && typeof node.end !== 'undefined') {
        return [node.pos, node.end];
    }
};

export class ECMAScriptProperty extends PyElement {
    type: string;
    typeKind: string;
    kind = 'property';
    positionRange: [number, number];

    constructor(propertyNode: NodeObject, file: SourceFile) {
        super();
        this.name = TsAstFinder.getName(propertyNode);

        this.positionRange = nodeToRange(propertyNode.name);

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
