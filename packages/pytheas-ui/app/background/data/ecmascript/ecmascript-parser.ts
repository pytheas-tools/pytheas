let tsquery: any;

class ECMAScriptParser {
    private static instance: ECMAScriptParser;
    private constructor() {}
    static getInstance() {
        if (!ECMAScriptParser.instance) {
            ECMAScriptParser.instance = new ECMAScriptParser();
        }
        return ECMAScriptParser.instance;
    }

    init() {
        tsquery = (<any>window).tsquery;
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
}

export default ECMAScriptParser.getInstance();
