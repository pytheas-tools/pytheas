import { PyElement } from '../py-element';

import JavaAstFinder from './java-ast-finder';

export class JavaClass extends PyElement {
    ast: NodeObject;

    constructor(classeNode: NodeObject, file: any) {
        super();
        this.ast = classeNode;
        this.file = file;
        this.name = classeNode.IDENTIFIER().text;
    }
}
