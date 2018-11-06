const { vuetemplatecompiler } = <any>window;

class VueParser {
    private static instance: VueParser;
    private constructor() {}
    static getInstance() {
        if (!VueParser.instance) {
            VueParser.instance = new VueParser();
        }
        return VueParser.instance;
    }

    parseFile(sourcecode: string) {
        return vuetemplatecompiler.parseComponent(sourcecode);
    }

    getClassDeclarations(sourceast: any): any {
        return [];
    }
}

export default VueParser.getInstance();
