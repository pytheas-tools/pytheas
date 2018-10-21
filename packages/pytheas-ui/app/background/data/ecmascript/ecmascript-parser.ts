const { tsquery } = <any>window;

class ECMAScriptParser {
    private static instance: ECMAScriptParser;
    private constructor() {}
    static getInstance() {
        if (!ECMAScriptParser.instance) {
            ECMAScriptParser.instance = new ECMAScriptParser();
        }
        return ECMAScriptParser.instance;
    }

    parseFile(sourcecode: string) {
        return tsquery.tsquery.ast(sourcecode);
    }

    getImportsStatements(sourcecode: string) {
        return tsquery.tsquery(sourcecode, 'ImportDeclaration');
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
}

export default ECMAScriptParser.getInstance();
