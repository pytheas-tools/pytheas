import { Identifier, Node } from 'typescript';

export interface TypeReferenceObject {
    text: string;
    kindName: string;
    elementType: any;
    typeArguments: any;
}

export interface IdentifierObject {
    text: string;
    name: string;
}

export interface TokenObject {
    kind: number;
}

export declare type NodeObject = Node & {
    name: Identifier;
    type: TypeReferenceObject; // TypeReference for TypeScript
    modifiers: TokenObject[]; // TokenObject for TypeScript
    expression: any; // IdentifierObject for TypeScript
};

/**
 * Manage the AST for (Type|Java)Script
 */
class TsAstFinderSingleton {
    private static instance: TsAstFinderSingleton;
    private constructor() {}
    static getInstance() {
        if (!TsAstFinderSingleton.instance) {
            TsAstFinderSingleton.instance = new TsAstFinderSingleton();
        }
        return TsAstFinderSingleton.instance;
    }

    getName(node: NodeObject): string {
        return node.name.text;
    }

    getExpressionName(node: IdentifierObject): string {
        return node.text;
    }

    getType(node: TypeReferenceObject): string {
        if (node.elementType) {
            return node.elementType.text;
        } else if (node.typeArguments && node.typeArguments.length > 0) {
            return node.typeArguments[0].text;
        } else {
            return node.text;
        }
    }

    getTypeKind(node: TypeReferenceObject): string {
        return node.kindName;
    }
}

export const TsAstFinder = TsAstFinderSingleton.getInstance();
