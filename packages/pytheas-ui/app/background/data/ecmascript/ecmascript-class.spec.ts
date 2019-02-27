import { ECMAScriptClass } from './ecmascript-class';

import { simpleClass } from './ecmascript-class.fixture';

const { tsquery } = <any>window;

describe('should create an instance of ECMAScriptClass', () => {
    const simpleClassAST = tsquery.tsquery.ast(simpleClass);
    const simpleClassASTClassNode = tsquery.tsquery(simpleClassAST, 'ClassDeclaration')[0];

    test('ECMAScriptClass created', () => {
        const simpleClassECMAScriptClass = new ECMAScriptClass(simpleClassASTClassNode, null);
        expect(simpleClassECMAScriptClass.name).toBe('Rule');
        expect(simpleClassECMAScriptClass.methodDeclarations.length).toBe(2);
        expect(simpleClassECMAScriptClass.methodDeclarations[0].name).toBe('init');
        // expect(simpleClassECMAScriptClass.methodDeclarations[1].modifiers[0]).toBe('private');
    });
});
