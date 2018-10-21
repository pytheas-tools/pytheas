const { javaast } = <any>window;

class JavaParser {
    parsedFiles: ReadedFile[] = [];

    private static instance: JavaParser;
    private constructor() {}
    static getInstance() {
        if (!JavaParser.instance) {
            JavaParser.instance = new JavaParser();
        }
        return JavaParser.instance;
    }

    parseFile(sourcecode: string) {
        return javaast.parse(sourcecode);
    }
}

export default JavaParser.getInstance();
