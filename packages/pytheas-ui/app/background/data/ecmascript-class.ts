import { Node } from 'typescript';
import { PyElement } from './py-element';
import tsAstFinder, { NodeObject } from './ts-ast-finder';

export class ECMAScriptClass extends PyElement{
    ast: Node

    constructor(classeNode: NodeObject) {
        super();
        this.ast = classeNode;
        this.name = tsAstFinder.getName(classeNode);
    }
}