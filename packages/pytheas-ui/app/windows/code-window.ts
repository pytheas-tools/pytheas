class CodeWindow {
    $element: HTMLElement;

    code = `function myScript(): string {
    return 100;
}
function myScript2(): string {
    return 500;
}`;

    codeMirrorOptions = {
        lineNumbers: true,
        theme: 'mdn-like',
        mode: 'javascript',
        readOnly: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
    };

    private static instance: CodeWindow;
    private constructor() {}
    static getInstance() {
        if (!CodeWindow.instance) {
            CodeWindow.instance = new CodeWindow();
        }
        return CodeWindow.instance;
    }
    init(element: HTMLElement) {
        this.$element = element;
        this.$element.setAttribute('code', this.code);
    }
}

export default CodeWindow.getInstance();
