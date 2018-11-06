/**
 * Manage the AST for Java files
 */
class JavaAstFinder {
    private static instance: JavaAstFinder;
    private constructor() {}
    static getInstance() {
        if (!JavaAstFinder.instance) {
            JavaAstFinder.instance = new JavaAstFinder();
        }
        return JavaAstFinder.instance;
    }
}

export default JavaAstFinder.getInstance();
