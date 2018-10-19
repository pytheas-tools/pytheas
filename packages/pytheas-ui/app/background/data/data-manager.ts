import { ECMAScriptClass } from './ecmascript-class';

/**
 * Manage the data layer
 */
class DataManager {
    private static instance: DataManager;
    private constructor() {}
    static getInstance() {
        if (!DataManager.instance) {
            DataManager.instance = new DataManager();
        }
        return DataManager.instance;
    }

    database = new Set();

    elements = [];

    classes = [];

    functions = [];

    init(parsedFiles) {
        this.elements = parsedFiles;
        this.processElements();
    }

    processElements() {
        const { tsquery } = <any>window;

        this.elements.forEach(element => {
            let classesNodesForFile = tsquery.tsquery(element.ast, 'ClassDeclaration');
            classesNodesForFile = classesNodesForFile.map((classeNode) => {
                switch (element.extension) {
                    case 'ts':
                    case 'js':
                        return new ECMAScriptClass(classeNode);
                }
            });
            if (classesNodesForFile.length > 0) {
                this.classes = [...this.classes, ...classesNodesForFile];
            }
            const functionsForFile = tsquery.tsquery(element.ast, 'FunctionDeclaration');
            if (functionsForFile.length > 0) {
                this.functions = [...this.functions, ...functionsForFile];
            }
        });
    }

    getFiles() {
        return this.elements;
    }

    getClasses() {
        return this.classes;
    }

    getFunctions() {
        return this.functions;
    }
}

export default DataManager.getInstance();
