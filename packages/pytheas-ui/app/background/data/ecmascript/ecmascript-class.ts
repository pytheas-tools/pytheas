import { PyElement } from '../py-element';
import { RelationTypes } from '../py-relation';
import { ECMAScriptConstructor } from './ecmascript-constructor';
import { ECMAScriptMethod } from './ecmascript-method';
import { ECMAScriptNewExpression } from './ecmascript-new-expression';
import { ECMAScriptProperty } from './ecmascript-property';
import tsAstFinder, { NodeObject } from './ts-ast-finder';

import ECMAScriptParser from './ecmascript-parser';

export class ECMAScriptClass extends PyElement {
    ast: NodeObject;
    propertyDeclarations: ECMAScriptProperty[];
    methodDeclarations: ECMAScriptMethod[];
    constructorDeclaration: ECMAScriptConstructor;

    publicElements: any = [];
    privateElements: any = [];

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

        const newExpressionNodesForFile = ECMAScriptParser.getNewExpressions(this.ast);
        if (newExpressionNodesForFile.length > 0) {
            newExpressionNodesForFile.forEach((newExpressionNode: any) => {
                const nexExpression = new ECMAScriptNewExpression(newExpressionNode);
                this.addRelation(this, nexExpression.type, nexExpression.typeKind, RelationTypes.Out);
            });
        }

        this.propertyDeclarations.forEach(propertyDeclaration => {
            this.addRelation(this, propertyDeclaration.type, propertyDeclaration.typeKind, RelationTypes.Out);
            if (propertyDeclaration.modifiers && propertyDeclaration.modifiers.length > 0) {
                propertyDeclaration.modifiers.forEach(modifier => {
                    if (modifier === 'public') {
                        this.publicElements.push(propertyDeclaration);
                    } else if (modifier === 'private') {
                        this.privateElements.push(propertyDeclaration);
                    }
                });
            } else {
                this.publicElements.push(propertyDeclaration);
            }
        });

        this.methodDeclarations.forEach(methodDeclaration => {
            if (methodDeclaration.modifiers && methodDeclaration.modifiers.length > 0) {
                methodDeclaration.modifiers.forEach(modifier => {
                    if (modifier === 'public') {
                        this.publicElements.push(methodDeclaration);
                    } else if (modifier === 'private') {
                        this.privateElements.push(methodDeclaration);
                    }
                });
            } else {
                this.publicElements.push(methodDeclaration);
            }
        });
    }
}
