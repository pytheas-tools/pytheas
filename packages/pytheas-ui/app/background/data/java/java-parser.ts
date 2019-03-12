import { ReadedFile } from '../../files-reader';

let javaast: any;

class JavaParser {
    private static instance: JavaParser;
    parsedFiles: ReadedFile[] = [];

    private constructor() {}
    static getInstance() {
        if (!JavaParser.instance) {
            JavaParser.instance = new JavaParser();
        }
        return JavaParser.instance;
    }

    init() {
        javaast = (<any>window).javaast;
    }

    parseFile(sourcecode: string) {
        return javaast.parse(sourcecode);
    }

    getClassDeclarations(sourceast: any): any {
        const entries = [];
        const pendingNodes = [sourceast];
        while (pendingNodes.length) {
            const node = pendingNodes.shift();
            if (node && node.childCount) {
                if (node.payload.constructor.name === 'ClassDeclarationContext') {
                    entries.push(node.payload);
                }
                for (let i = 0; i < node.childCount; i++) {
                    pendingNodes.push(node.getChild(i));
                }
            }
        }
        return entries;
    }
}

export default JavaParser.getInstance();
