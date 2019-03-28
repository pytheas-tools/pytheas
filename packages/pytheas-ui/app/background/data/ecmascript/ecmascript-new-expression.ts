import { PyElement } from '../py-element';
import { NodeObject, TsAstFinder } from './ts-ast-finder';

export class ECMAScriptNewExpression extends PyElement {
    type: string;
    typeKind: string;
    kind = 'newExpression';

    constructor(newExpressionNode: NodeObject) {
        super();
        this.name = TsAstFinder.getExpressionName(newExpressionNode.expression);
        this.type = this.name;
    }
}
