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

    elements;

    init(parsedFiles) {
        this.elements = parsedFiles;
    }

    getFiles() {
        return this.elements;
    }

    getClasses() {
        return [];
    }

    getFunctions() {
        return [];
    }
}

export default DataManager.getInstance();
