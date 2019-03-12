import { ECMAScriptClass } from './ecmascript/ecmascript-class';
import ECMAScriptParser from './ecmascript/ecmascript-parser';
import { JavaClass } from './java/java-class';
import JavaParser from './java/java-parser';
import RelationManager from './relation-manager';
import VueParser from './vue/vue-parser';

/**
 * Manage the data layer
 */
class DataManager {
    private static instance: DataManager;

    database = new Set();

    filesToProcess = <any>[];

    classes = <any>[];

    functions = <any>[];

    private constructor() {}
    static getInstance() {
        if (!DataManager.instance) {
            DataManager.instance = new DataManager();
        }
        return DataManager.instance;
    }

    init(parsedFiles: any) {
        this.reset();
        this.filesToProcess = parsedFiles;
        this.processElements();
    }

    reset() {
        this.filesToProcess = [];
        this.classes = [];
        this.functions = [];
    }

    processElements() {
        this.filesToProcess.forEach((element: any) => {
            let classesNodesForFile = [];
            let functionsForFile = [];

            switch (element.extension) {
                case 'js':
                case 'ts':
                    classesNodesForFile = ECMAScriptParser.getClassDeclarations(element.ast);
                    classesNodesForFile = classesNodesForFile.map((classeNode: any) => {
                        return new ECMAScriptClass(classeNode, element);
                    });
                    functionsForFile = ECMAScriptParser.getFunctionDeclarations(element.ast);
                    break;
                case 'java':
                    classesNodesForFile = JavaParser.getClassDeclarations(element.ast);
                    classesNodesForFile = classesNodesForFile.map((classeNode: any) => {
                        return new JavaClass(classeNode, element);
                    });
                    break;
                case 'vue':
                    classesNodesForFile = VueParser.getClassDeclarations(element.ast);
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
        console.log(this.classes);
        RelationManager.mergeInRelations(this.classes);
        console.log(this.classes);
    }

    getFiles() {
        return this.filesToProcess;
    }

    getClasses() {
        return this.classes;
    }

    getFunctions() {
        return this.functions;
    }
}

export default DataManager.getInstance();
