/**
 * Manage the AST for Java files
 */
class JavaAstFinderSingleton {
    private static instance: JavaAstFinderSingleton;
    private constructor() {}
    static getInstance() {
        if (!JavaAstFinderSingleton.instance) {
            JavaAstFinderSingleton.instance = new JavaAstFinderSingleton();
        }
        return JavaAstFinderSingleton.instance;
    }
}

export const JavaAstFinder = JavaAstFinderSingleton.getInstance();
