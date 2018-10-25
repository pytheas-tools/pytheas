import { PyElement } from '../py-element';
import tsAstFinder, { NodeObject } from './ts-ast-finder';
import { ECMAScriptProperty } from './ecmascript-property';
import { ECMAScriptMethod } from './ecmascript-method';
import { ECMAScriptConstructor } from './ecmascript-constructor';

import ECMAScriptParser from './ecmascript-parser';
import { RelationTypes } from '../py-relation';

export class ECMAScriptClass extends PyElement {
    ast: NodeObject;
    propertyDeclarations: ECMAScriptProperty[];
    methodDeclarations: ECMAScriptMethod[];
    constructorDeclaration: ECMAScriptConstructor;

    constructor(classeNode: NodeObject, file: any) {
        super();
        this.ast = classeNode;
        this.file = file;
        this.name = tsAstFinder.getName(classeNode);

        const propertyDeclarationsNodesForFile = ECMAScriptParser.getPropertyDeclaration(this.ast);
        this.propertyDeclarations = propertyDeclarationsNodesForFile.map((propertyDeclaration: NodeObject) => {
            return new ECMAScriptProperty(propertyDeclaration);
        });

        const methodDeclarationsNodesForFile = ECMAScriptParser.getMethodDeclaration(this.ast);
        this.methodDeclarations = methodDeclarationsNodesForFile.map((methodDeclaration: NodeObject) => {
            return new ECMAScriptMethod(methodDeclaration);
        });

        const constructorNodeForFile = ECMAScriptParser.getConstructor(this.ast);
        if (constructorNodeForFile.length > 0) {
            this.constructorDeclaration = new ECMAScriptConstructor(constructorNodeForFile[0]);
        }

        this.propertyDeclarations.forEach(propertyDeclaration => {
            this.addRelation(this, propertyDeclaration.type, propertyDeclaration.typeKind, RelationTypes.Out);
        });
    }
}
