import { PyElement } from '../py-element';
import tsAstFinder, { NodeObject } from '../ts-ast-finder';
import { ECMAScriptProperty } from './ecmascript-property';
import { ECMAScriptMethod } from './ecmascript-method';
import { ECMAScriptConstructor } from './ecmascript-constructor';

const { tsquery } = <any>window;

export class ECMAScriptClass extends PyElement {
    ast: NodeObject;
    propertyDeclarations: ECMAScriptProperty[];
    methodDeclarations: ECMAScriptMethod[];
    constructorDeclaration: ECMAScriptConstructor;

    constructor(classeNode: NodeObject) {
        super();
        this.ast = classeNode;
        this.name = tsAstFinder.getName(classeNode);

        const propertyDeclarationsNodesForFile = tsquery.tsquery(this.ast, 'PropertyDeclaration');
        this.propertyDeclarations = propertyDeclarationsNodesForFile.map((propertyDeclaration: NodeObject) => {
            return new ECMAScriptProperty(propertyDeclaration);
        });

        const methodDeclarationsNodesForFile = tsquery.tsquery(this.ast, 'MethodDeclaration');
        this.methodDeclarations = methodDeclarationsNodesForFile.map((methodDeclaration: NodeObject) => {
            return new ECMAScriptMethod(methodDeclaration);
        });

        const constructorNodeForFile = tsquery.tsquery(this.ast, 'Constructor');
        if (constructorNodeForFile.length > 0) {
            this.constructorDeclaration = new ECMAScriptConstructor(constructorNodeForFile[0]);
        }
    }
}
