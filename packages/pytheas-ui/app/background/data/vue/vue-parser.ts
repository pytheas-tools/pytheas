let vuetemplatecompiler: any;

class VueParserSingleton {
    private static instance: VueParserSingleton;
    private constructor() {}
    static getInstance() {
        if (!VueParserSingleton.instance) {
            VueParserSingleton.instance = new VueParserSingleton();
        }
        return VueParserSingleton.instance;
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

export const VueParser = VueParserSingleton.getInstance();
