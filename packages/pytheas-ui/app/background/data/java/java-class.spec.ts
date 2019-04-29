import { JavaClass } from './java-class';

import { JavaParser } from './java-parser';

import { simpleClass } from './java-class.fixture';

const { javaast } = <any>window;

describe.skip('should create an instance of JavaClass', () => {
    const simpleClassAST = javaast.parse(simpleClass);
    const simpleClassASTClassNode = JavaParser.getClassDeclarations(simpleClassAST)[0];

    test('JavaClass created', () => {
        const simpleClassJavaClass = new JavaClass(simpleClassASTClassNode, null);
        expect(simpleClassJavaClass.name).toBe('Rule');
    });
});
