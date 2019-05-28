import { PyElement } from '../py-element';

export class JavaClass extends PyElement {
    ast: any; // NodeObject

    constructor(classeNode: any, file: any) {
        // classeNode: NodeObject
        super();
        this.ast = classeNode;
        this.file = file;
        this.name = classeNode.IDENTIFIER().text;
    }
}
