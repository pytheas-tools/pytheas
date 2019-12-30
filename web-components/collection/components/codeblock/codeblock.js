import { h } from "@stencil/core";
export class CodeBlock {
    constructor() {
        this.code = '';
        this.maximized = false;
    }
    componentWillLoad() {
        // console.log('CodeBlock is about to be rendered..: ', this.codemirrorPath);
    }
    componentDidLoad() {
        // console.log('CodeBlock is rendered..');
        if (window['CodeMirror']) {
            this.bootstrapEditor();
        }
        else {
            this.injectEditorDependency().then(() => {
                this.bootstrapEditor();
            });
        }
        this.topBar = this.el.querySelector('.py-codeblock__top-bar');
        this.codeView = this.el.querySelector('.py-codeblock__code-view');
        this.reduceButton = this.el.querySelector('.button.reduce');
        this.openButton = this.el.querySelector('.button.open');
        this.openButton.classList.add('disabled');
        this.fullsizeButton = this.el.querySelector('.button.maximize');
    }
    async updateTheme(theme) {
        const localTheme = theme === 'theme-dark' ? 'monokai' : 'default';
        this.codeMirrorEditor.setOption('theme', localTheme);
    }
    async highlight(range) {
        this._highlight(range);
    }
    async highlights(ranges) {
        ranges.forEach(range => {
            this._highlight(range);
        });
    }
    async unHighlight() {
        // this.codeMirrorEditor.setValue(this.code);
        console.log(this.codeMirrorEditor.getAllMarks());
        this.codeMirrorEditor.getAllMarks().forEach(mark => {
            mark.clear();
        });
        console.log(this.codeMirrorEditor.getAllMarks());
    }
    _highlight(range) {
        const positionFromIndex = (doc, index) => {
            return doc.posFromIndex(index);
        };
        const [start, end] = range.map(index => positionFromIndex(this.codeMirrorEditor.doc, index));
        this.codeMirrorEditor.markText(start, end, {
            className: 'marked'
        });
    }
    injectEditorDependency() {
        return new Promise((resolveInjection, rejectInjection) => {
            const script = document.createElement('script');
            script.setAttribute('src', this.codemirrorPath);
            script.setAttribute('type', 'text/javascript');
            script.onload = () => {
                resolveInjection();
            };
            script.onerror = () => {
                rejectInjection();
            };
            document.body.appendChild(script);
        });
    }
    async bootstrapEditor() {
        const cm = window['CodeMirror'];
        this.codeMirrorEditor = cm(this.el.querySelector('.py-codeblock__code-view'), {
            value: this.code,
            mode: this.language ? 'text/' + this.language : 'javascript',
            lineNumbers: true,
            viewportMargin: Infinity,
            lineWrapping: true,
            foldGutter: true,
            readOnly: true,
            theme: this.theme && this.theme === 'theme-dark'
                ? 'monokai'
                : 'default',
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
        });
        cm.on(this.codeMirrorEditor.getWrapperElement(), 'mouseover', event => {
            const node = event.target || event.srcElement;
            if (node) {
                /*const pos = this.codeMirrorEditor.coordsChar({
                        left: event.clientX,
                        top: event.clientY
                    });
                    const token = this.codeMirrorEditor.getTokenAt(pos);
                    console.log(token);*/
                this.tokenHovered.emit({
                    filename: this.filename,
                    text: node.innerText
                });
            }
        });
    }
    reduce() {
        this.codeView.classList.add('reduced');
        this.topBar.classList.add('reduced');
        this.reduceButton.classList.add('disabled');
        this.openButton.classList.remove('disabled');
    }
    open() {
        if (this.maximized) {
            this.el.classList.remove('maximize');
            this.openButton.classList.add('disabled');
            this.reduceButton.style.display = 'inline-block';
            this.fullsizeButton.style.display = 'inline-block';
            this.maximized = false;
            this.codeblockUnmaximized.emit();
        }
        else {
            this.codeView.classList.remove('reduced');
            this.topBar.classList.remove('reduced');
            this.reduceButton.classList.remove('disabled');
            this.openButton.classList.add('disabled');
        }
    }
    maximize() {
        this.el.classList.add('maximize');
        this.reduceButton.style.display = 'none';
        this.fullsizeButton.style.display = 'none';
        this.reduceButton.classList.remove('disabled');
        this.openButton.classList.remove('disabled');
        this.topBar.classList.remove('reduced');
        this.codeView.classList.remove('reduced');
        this.maximized = true;
        this.codeblockMaximized.emit();
    }
    render() {
        // console.log('CodeBlock rendering..');
        return (h("div", null,
            h("div", { class: "py-codeblock__top-bar" },
                h("div", { class: "py-codeblock__top-bar__filename" },
                    h("ion-icon", { name: "list" }),
                    h("span", null, this.filename)),
                h("div", { class: "py-codeblock__top-bar__buttons" },
                    h("button", { class: "button reduce", title: "Reduce", type: "button", onClick: this.reduce.bind(this) }, "-"),
                    h("button", { class: "button open", title: "Open", type: "button", onClick: this.open.bind(this) }, "="),
                    h("button", { class: "button maximize", title: "Maximize", type: "button", onClick: this.maximize.bind(this) }, "\u25A1"))),
            h("div", { class: "py-codeblock__code-view" })));
    }
    static get is() { return "py-codeblock"; }
    static get originalStyleUrls() { return {
        "$": ["codeblock.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["codeblock.css"]
    }; }
    static get properties() { return {
        "code": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "code",
            "reflect": false,
            "defaultValue": "''"
        },
        "filename": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "filename",
            "reflect": false
        },
        "theme": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "theme",
            "reflect": false
        },
        "language": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "language",
            "reflect": false
        },
        "codemirrorPath": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "codemirror-path",
            "reflect": false
        },
        "codeMirrorEditor": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "code-mirror-editor",
            "reflect": false
        }
    }; }
    static get events() { return [{
            "method": "codeblockMaximized",
            "name": "codeblockMaximized",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "codeblockUnmaximized",
            "name": "codeblockUnmaximized",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "tokenHovered",
            "name": "tokenHovered",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "updateTheme": {
            "complexType": {
                "signature": "(theme: string) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "highlight": {
            "complexType": {
                "signature": "(range: any) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "highlights": {
            "complexType": {
                "signature": "(ranges: any) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "unHighlight": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
}
