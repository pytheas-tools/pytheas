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
            const classesForFile = tsquery.tsquery(element.ast, 'ClassDeclaration');
            if (classesForFile.length > 0) {
                this.classes = [...this.classes, ...classesForFile];
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
