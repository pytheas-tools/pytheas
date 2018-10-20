import { Node, Identifier } from 'typescript';

export declare type NodeObject = Node & {
    name: Identifier;
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
}

export default TsAstFinder.getInstance();
