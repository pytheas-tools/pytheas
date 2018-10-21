import { ECMAScriptClass } from './ecmascript/ecmascript-class';
import ECMAScriptParser from './ecmascript/ecmascript-parser';

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
        this.reset();
        this.elements = parsedFiles;
        this.processElements();
    }

    reset() {
        this.elements = [];
        this.classes = [];
        this.functions = [];
    }

    processElements() {
        this.elements.forEach(element => {
            let classesNodesForFile = [];
            let functionsForFile = [];

            switch (element.extension) {
                case 'js':
                case 'ts':
                    classesNodesForFile = ECMAScriptParser.getClassDeclarations(element.ast);
                    classesNodesForFile = classesNodesForFile.map(classeNode => {
                        return new ECMAScriptClass(classeNode);
                    });
                    functionsForFile = ECMAScriptParser.getFunctionDeclarations(element.ast);
                    break;
                default:
                    break;
            }

            if (classesNodesForFile.length > 0) {
                this.classes = [...this.classes, ...classesNodesForFile];
            }
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
