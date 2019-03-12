let vuetemplatecompiler: any;

class VueParser {
    private static instance: VueParser;
    private constructor() {}
    static getInstance() {
        if (!VueParser.instance) {
            VueParser.instance = new VueParser();
        }
        return VueParser.instance;
    }

    init() {
        vuetemplatecompiler = (<any>window).vuetemplatecompiler;
    }

    parseFile(sourcecode: string) {
        return vuetemplatecompiler.parseComponent(sourcecode);
    }

    getClassDeclarations(sourceast: any): any {
        return [];
    }
}

export default VueParser.getInstance();
