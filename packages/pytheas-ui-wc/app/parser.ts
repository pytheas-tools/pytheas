class Parser {
    files: FileEntry[] = [];

    private static instance: Parser;
    private constructor() {}
    static getInstance() {
        if (!Parser.instance) {
            Parser.instance = new Parser();
        }
        return Parser.instance;
    }
    init() {}
    addFile(file: FileEntry) {
        this.files.push(file);
    }
    parseFiles() {
        console.log('parse files for their AST: ', this.files);
    }
}

export default new Parser();
