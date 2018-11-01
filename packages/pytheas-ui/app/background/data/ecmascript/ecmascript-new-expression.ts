import { PyElement } from '../py-element';
import tsAstFinder, { NodeObject, TokenObject } from './ts-ast-finder';

export class ECMAScriptNewExpression extends PyElement {
    type: string;
    typeKind: string;
    kind = 'newExpression';

    constructor(newExpressionNode: NodeObject) {
        super();
        this.name = tsAstFinder.getExpressionName(newExpressionNode.expression);
        this.type = this.name;
    }
}
