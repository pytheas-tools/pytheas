import { Node, Identifier, TypeReference, Token } from 'typescript';

export interface TypeReferenceObject {
    text: string;
}

export interface TokenObject {
    text: string;
}

export declare type NodeObject = Node & {
    name: Identifier;
    type: TypeReferenceObject; // TypeReference for TypeScript
    modifiers: TokenObject[]; // TokenObject for TypeScript
};

/**
 * Manage the AST for (Type|Java)Script
 */
class TsAstFinder {
    private static instance: TsAstFinder;
    private constructor() {}
    static getInstance() {
        if (!TsAstFinder.instance) {
            TsAstFinder.instance = new TsAstFinder();
        }
        return TsAstFinder.instance;
    }

    getName(node: NodeObject): string {
        return node.name.text;
    }

    getType(node: TypeReferenceObject): string {
        return node.text;
    }
}

export default TsAstFinder.getInstance();
