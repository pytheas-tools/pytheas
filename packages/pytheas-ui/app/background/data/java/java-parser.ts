import { ReadedFile } from '../../files/files-reader';

let javaast: any;

class JavaParserSingleton {
    private static instance: JavaParserSingleton;
    parsedFiles: ReadedFile[] = [];

    private constructor() {}
    static getInstance() {
        if (!JavaParserSingleton.instance) {
            JavaParserSingleton.instance = new JavaParserSingleton();
        }
        return JavaParserSingleton.instance;
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

export const JavaParser = JavaParserSingleton.getInstance();
