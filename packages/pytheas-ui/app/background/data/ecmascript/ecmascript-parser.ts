let tsquery: any;

class ECMAScriptParserSingleton {
    private static instance: ECMAScriptParserSingleton;

    initialized = false;

    ts: any;

    private constructor() {}
    static getInstance() {
        if (!ECMAScriptParserSingleton.instance) {
            ECMAScriptParserSingleton.instance = new ECMAScriptParserSingleton();
        }
        return ECMAScriptParserSingleton.instance;
    }

    init() {
        tsquery = (<any>window).tsquery;
        this.ts = tsquery.tsquery.ts;
        this.initialized = true;
    }

    parseFile(sourcecode: string) {
        return tsquery.tsquery.ast(sourcecode, '', 2); // ScriptKind.TSX
    }

    getImportsStatements(sourceast: any) {
        return tsquery.tsquery(sourceast, 'ImportDeclaration');
    }

    getClassDeclarations(sourceast: any) {
        return tsquery.tsquery(sourceast, 'ClassDeclaration');
    }

    getFunctionDeclarations(sourceast: any) {
        return tsquery.tsquery(sourceast, 'FunctionDeclaration');
    }

    getPropertyDeclaration(sourceast: any) {
        return tsquery.tsquery(sourceast, 'PropertyDeclaration');
    }

    getMethodDeclaration(sourceast: any) {
        return tsquery.tsquery(sourceast, 'MethodDeclaration');
    }

    getConstructor(sourceast: any) {
        return tsquery.tsquery(sourceast, 'Constructor');
    }

    getNewExpressions(sourceast: any) {
        return tsquery.tsquery(sourceast, 'NewExpression');
    }

    getSyntaxKindName(index: number): string {
        return tsquery.tsquery.syntaxKindName(index);
    }

    getCallExpressions(sourceast: any) {
        return tsquery.tsquery(sourceast, 'CallExpression');
    }

    getBinaryExpressions(sourceast: any) {
        return tsquery.tsquery(sourceast, 'BinaryExpression');
    }

    getPropertyAccessExpressions(sourceast: any) {
        return tsquery.tsquery(sourceast, 'PropertyAccessExpression');
    }
}

export const ECMAScriptParser = ECMAScriptParserSingleton.getInstance();
