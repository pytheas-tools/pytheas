class Singleton {
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

    private static instance: Singleton;
    private constructor() {}
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
    init(element: HTMLElement) {
        this.$element = element;

        this.$element.setAttribute('code', this.code);

        console.log(this.$element);
    }
}

export default new Singleton();
