import { Node, Identifier, TypeReference } from 'typescript';

export interface TypeReferenceObject {
    text: string; // TypeReference
}

export declare type NodeObject = Node & {
    name: Identifier;
    type: TypeReferenceObject; // TypeReference for TypeScript
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
