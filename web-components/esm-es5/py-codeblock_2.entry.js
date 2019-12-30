var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, c as createEvent, h, g as getElement } from './core-e9f2a14b.js';
var CodeBlock = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.code = '';
        this.maximized = false;
        this.codeblockMaximized = createEvent(this, "codeblockMaximized", 7);
        this.codeblockUnmaximized = createEvent(this, "codeblockUnmaximized", 7);
        this.tokenHovered = createEvent(this, "tokenHovered", 7);
    }
    class_1.prototype.componentWillLoad = function () {
        // console.log('CodeBlock is about to be rendered..: ', this.codemirrorPath);
    };
    class_1.prototype.componentDidLoad = function () {
        var _this = this;
        // console.log('CodeBlock is rendered..');
        if (window['CodeMirror']) {
            this.bootstrapEditor();
        }
        else {
            this.injectEditorDependency().then(function () {
                _this.bootstrapEditor();
            });
        }
        this.topBar = this.el.querySelector('.py-codeblock__top-bar');
        this.codeView = this.el.querySelector('.py-codeblock__code-view');
        this.reduceButton = this.el.querySelector('.button.reduce');
        this.openButton = this.el.querySelector('.button.open');
        this.openButton.classList.add('disabled');
        this.fullsizeButton = this.el.querySelector('.button.maximize');
    };
    class_1.prototype.updateTheme = function (theme) {
        return __awaiter(this, void 0, void 0, function () {
            var localTheme;
            return __generator(this, function (_a) {
                localTheme = theme === 'theme-dark' ? 'monokai' : 'default';
                this.codeMirrorEditor.setOption('theme', localTheme);
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.highlight = function (range) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._highlight(range);
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.highlights = function (ranges) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                ranges.forEach(function (range) {
                    _this._highlight(range);
                });
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.unHighlight = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.codeMirrorEditor.getAllMarks().forEach(function (mark) {
                    mark.clear();
                });
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype._highlight = function (range) {
        var _this = this;
        var positionFromIndex = function (doc, index) {
            return doc.posFromIndex(index);
        };
        var _a = range.map(function (index) { return positionFromIndex(_this.codeMirrorEditor.doc, index); }), start = _a[0], end = _a[1];
        this.codeMirrorEditor.markText(start, end, {
            className: 'marked'
        });
    };
    class_1.prototype.injectEditorDependency = function () {
        var _this = this;
        return new Promise(function (resolveInjection, rejectInjection) {
            var script = document.createElement('script');
            script.setAttribute('src', _this.codemirrorPath);
            script.setAttribute('type', 'text/javascript');
            script.onload = function () {
                resolveInjection();
            };
            script.onerror = function () {
                rejectInjection();
            };
            document.body.appendChild(script);
        });
    };
    class_1.prototype.bootstrapEditor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cm;
            var _this = this;
            return __generator(this, function (_a) {
                cm = window['CodeMirror'];
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
                cm.on(this.codeMirrorEditor.getWrapperElement(), 'mouseover', function (event) {
                    var node = event.target || event.srcElement;
                    if (node) {
                        /*const pos = this.codeMirrorEditor.coordsChar({
                                left: event.clientX,
                                top: event.clientY
                            });
                            const token = this.codeMirrorEditor.getTokenAt(pos);
                            console.log(token);*/
                        _this.tokenHovered.emit({
                            filename: _this.filename,
                            text: node.innerText
                        });
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.reduce = function () {
        this.codeView.classList.add('reduced');
        this.topBar.classList.add('reduced');
        this.reduceButton.classList.add('disabled');
        this.openButton.classList.remove('disabled');
    };
    class_1.prototype.open = function () {
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
    };
    class_1.prototype.maximize = function () {
        this.el.classList.add('maximize');
        this.reduceButton.style.display = 'none';
        this.fullsizeButton.style.display = 'none';
        this.reduceButton.classList.remove('disabled');
        this.openButton.classList.remove('disabled');
        this.topBar.classList.remove('reduced');
        this.codeView.classList.remove('reduced');
        this.maximized = true;
        this.codeblockMaximized.emit();
    };
    class_1.prototype.render = function () {
        // console.log('CodeBlock rendering..');
        return (h("div", null, h("div", { class: "py-codeblock__top-bar" }, h("div", { class: "py-codeblock__top-bar__filename" }, h("ion-icon", { name: "list" }), h("span", null, this.filename)), h("div", { class: "py-codeblock__top-bar__buttons" }, h("button", { class: "button reduce", title: "Reduce", type: "button", onClick: this.reduce.bind(this) }, "-"), h("button", { class: "button open", title: "Open", type: "button", onClick: this.open.bind(this) }, "="), h("button", { class: "button maximize", title: "Maximize", type: "button", onClick: this.maximize.bind(this) }, "\u25A1"))), h("div", { class: "py-codeblock__code-view" })));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "\@charset \"UTF-8\";.CodeMirror{font-family:monospace;height:300px;color:#000;direction:ltr}.CodeMirror-lines{padding:4px 0}.CodeMirror pre.CodeMirror-line,.CodeMirror pre.CodeMirror-line-like{padding:0 4px}.CodeMirror-gutter-filler,.CodeMirror-scrollbar-filler{background-color:#fff}.CodeMirror-gutters{border-right:1px solid #ddd;background-color:#f7f7f7;white-space:nowrap}.CodeMirror-linenumber{padding:0 3px 0 5px;min-width:20px;text-align:right;color:#999;white-space:nowrap}.CodeMirror-guttermarker{color:#000}.CodeMirror-guttermarker-subtle{color:#999}.CodeMirror-cursor{border-left:1px solid #000;border-right:none;width:0}.CodeMirror div.CodeMirror-secondarycursor{border-left:1px solid silver}.cm-fat-cursor .CodeMirror-cursor{width:auto;border:0!important;background:#7e7}.cm-fat-cursor div.CodeMirror-cursors{z-index:1}.cm-fat-cursor-mark{background-color:rgba(20,255,20,.5)}.cm-animate-fat-cursor,.cm-fat-cursor-mark{-webkit-animation:blink 1.06s steps(1) infinite;-moz-animation:blink 1.06s steps(1) infinite;animation:blink 1.06s steps(1) infinite}.cm-animate-fat-cursor{width:auto;border:0;background-color:#7e7}\@-moz-keyframes blink{50%{background-color:transparent}}\@-webkit-keyframes blink{50%{background-color:transparent}}\@keyframes blink{50%{background-color:transparent}}.cm-tab{display:inline-block;text-decoration:inherit}.CodeMirror-rulers{position:absolute;left:0;right:0;top:-50px;bottom:0;overflow:hidden}.CodeMirror-ruler{border-left:1px solid #ccc;top:0;bottom:0;position:absolute}.cm-s-default .cm-header{color:#00f}.cm-s-default .cm-quote{color:#090}.cm-negative{color:#d44}.cm-positive{color:#292}.cm-header,.cm-strong{font-weight:700}.cm-em{font-style:italic}.cm-link{text-decoration:underline}.cm-strikethrough{text-decoration:line-through}.cm-s-default .cm-keyword{color:#708}.cm-s-default .cm-atom{color:#219}.cm-s-default .cm-number{color:#164}.cm-s-default .cm-def{color:#00f}.cm-s-default .cm-variable-2{color:#05a}.cm-s-default .cm-type,.cm-s-default .cm-variable-3{color:#085}.cm-s-default .cm-comment{color:#a50}.cm-s-default .cm-string{color:#a11}.cm-s-default .cm-string-2{color:#f50}.cm-s-default .cm-meta,.cm-s-default .cm-qualifier{color:#555}.cm-s-default .cm-builtin{color:#30a}.cm-s-default .cm-bracket{color:#997}.cm-s-default .cm-tag{color:#170}.cm-s-default .cm-attribute{color:#00c}.cm-s-default .cm-hr{color:#999}.cm-s-default .cm-link{color:#00c}.cm-invalidchar,.cm-s-default .cm-error{color:red}.CodeMirror-composing{border-bottom:2px solid}div.CodeMirror span.CodeMirror-matchingbracket{color:#0b0}div.CodeMirror span.CodeMirror-nonmatchingbracket{color:#a22}.CodeMirror-matchingtag{background:rgba(255,150,0,.3)}.CodeMirror-activeline-background{background:#e8f2ff}.CodeMirror{position:relative;overflow:hidden;background:#fff}.CodeMirror-scroll{overflow:scroll!important;margin-bottom:-30px;margin-right:-30px;padding-bottom:30px;height:100%;outline:none;position:relative}.CodeMirror-sizer{position:relative;border-right:30px solid transparent}.CodeMirror-gutter-filler,.CodeMirror-hscrollbar,.CodeMirror-scrollbar-filler,.CodeMirror-vscrollbar{position:absolute;z-index:6;display:none}.CodeMirror-vscrollbar{right:0;top:0;overflow-x:hidden;overflow-y:scroll}.CodeMirror-hscrollbar{bottom:0;left:0;overflow-y:hidden;overflow-x:scroll}.CodeMirror-scrollbar-filler{right:0;bottom:0}.CodeMirror-gutter-filler{left:0;bottom:0}.CodeMirror-gutters{position:absolute;left:0;top:0;min-height:100%;z-index:3}.CodeMirror-gutter{white-space:normal;height:100%;display:inline-block;vertical-align:top;margin-bottom:-30px}.CodeMirror-gutter-wrapper{position:absolute;z-index:4;background:none!important;border:none!important}.CodeMirror-gutter-background{position:absolute;top:0;bottom:0;z-index:4}.CodeMirror-gutter-elt{position:absolute;cursor:default;z-index:4}.CodeMirror-gutter-wrapper ::selection{background-color:transparent}.CodeMirror-gutter-wrapper ::-moz-selection{background-color:transparent}.CodeMirror-lines{cursor:text;min-height:1px}.CodeMirror pre.CodeMirror-line,.CodeMirror pre.CodeMirror-line-like{-moz-border-radius:0;-webkit-border-radius:0;border-radius:0;border-width:0;background:transparent;font-family:inherit;font-size:inherit;margin:0;white-space:pre;word-wrap:normal;line-height:inherit;color:inherit;z-index:2;position:relative;overflow:visible;-webkit-tap-highlight-color:transparent;-webkit-font-variant-ligatures:contextual;font-variant-ligatures:contextual}.CodeMirror-wrap pre.CodeMirror-line,.CodeMirror-wrap pre.CodeMirror-line-like{word-wrap:break-word;white-space:pre-wrap;word-break:normal}.CodeMirror-linebackground{position:absolute;left:0;right:0;top:0;bottom:0;z-index:0}.CodeMirror-linewidget{position:relative;z-index:2;padding:.1px}.CodeMirror-rtl pre{direction:rtl}.CodeMirror-code{outline:none}.CodeMirror-gutter,.CodeMirror-gutters,.CodeMirror-linenumber,.CodeMirror-scroll,.CodeMirror-sizer{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}.CodeMirror-measure{position:absolute;width:100%;height:0;overflow:hidden;visibility:hidden}.CodeMirror-cursor{position:absolute;pointer-events:none}.CodeMirror-measure pre{position:static}div.CodeMirror-cursors{visibility:hidden;position:relative;z-index:3}.CodeMirror-focused div.CodeMirror-cursors,div.CodeMirror-dragcursors{visibility:visible}.CodeMirror-selected{background:#d9d9d9}.CodeMirror-focused .CodeMirror-selected{background:#d7d4f0}.CodeMirror-crosshair{cursor:crosshair}.CodeMirror-line::selection,.CodeMirror-line>span::selection,.CodeMirror-line>span>span::selection{background:#d7d4f0}.CodeMirror-line::-moz-selection,.CodeMirror-line>span::-moz-selection,.CodeMirror-line>span>span::-moz-selection{background:#d7d4f0}.cm-searching{background-color:#ffa;background-color:rgba(255,255,0,.4)}.cm-force-border{padding-right:.1px}\@media print{.CodeMirror div.CodeMirror-cursors{visibility:hidden}}.cm-tab-wrap-hack:after{content:\"\"}span.CodeMirror-selectedtext{background:none}.CodeMirror-foldmarker{color:#00f;text-shadow:#b9f 1px 1px 2px,#b9f -1px -1px 2px,#b9f 1px -1px 2px,#b9f -1px 1px 2px;font-family:arial;line-height:.3;cursor:pointer}.CodeMirror-foldgutter{width:.7em}.CodeMirror-foldgutter-folded,.CodeMirror-foldgutter-open{cursor:pointer}.CodeMirror-foldgutter-open:after{content:\"▾\"}.CodeMirror-foldgutter-folded:after{content:\"▸\"}.cm-s-monokai.CodeMirror{background:#272822;color:#f8f8f2}.cm-s-monokai div.CodeMirror-selected{background:#49483e}.cm-s-monokai .CodeMirror-line::selection,.cm-s-monokai .CodeMirror-line>span::selection,.cm-s-monokai .CodeMirror-line>span>span::selection{background:rgba(73,72,62,.99)}.cm-s-monokai .CodeMirror-line::-moz-selection,.cm-s-monokai .CodeMirror-line>span::-moz-selection,.cm-s-monokai .CodeMirror-line>span>span::-moz-selection{background:rgba(73,72,62,.99)}.cm-s-monokai .CodeMirror-gutters{background:#272822;border-right:0}.cm-s-monokai .CodeMirror-guttermarker{color:#fff}.cm-s-monokai .CodeMirror-guttermarker-subtle,.cm-s-monokai .CodeMirror-linenumber{color:#d0d0d0}.cm-s-monokai .CodeMirror-cursor{border-left:1px solid #f8f8f0}.cm-s-monokai span.cm-comment{color:#75715e}.cm-s-monokai span.cm-atom,.cm-s-monokai span.cm-number{color:#ae81ff}.cm-s-monokai span.cm-comment.cm-attribute{color:#97b757}.cm-s-monokai span.cm-comment.cm-def{color:#bc9262}.cm-s-monokai span.cm-comment.cm-tag{color:#bc6283}.cm-s-monokai span.cm-comment.cm-type{color:#5998a6}.cm-s-monokai span.cm-attribute,.cm-s-monokai span.cm-property{color:#a6e22e}.cm-s-monokai span.cm-keyword{color:#f92672}.cm-s-monokai span.cm-builtin{color:#66d9ef}.cm-s-monokai span.cm-string{color:#e6db74}.cm-s-monokai span.cm-variable{color:#f8f8f2}.cm-s-monokai span.cm-variable-2{color:#9effff}.cm-s-monokai span.cm-type,.cm-s-monokai span.cm-variable-3{color:#66d9ef}.cm-s-monokai span.cm-def{color:#fd971f}.cm-s-monokai span.cm-bracket{color:#f8f8f2}.cm-s-monokai span.cm-tag{color:#f92672}.cm-s-monokai span.cm-header,.cm-s-monokai span.cm-link{color:#ae81ff}.cm-s-monokai span.cm-error{background:#f92672;color:#f8f8f0}.cm-s-monokai .CodeMirror-activeline-background{background:#373831}.cm-s-monokai .CodeMirror-matchingbracket{text-decoration:underline;color:#fff!important}py-codeblock.maximize{width:100%;height:100%;display:block;position:absolute;top:0;z-index:5}py-codeblock.maximize>div{height:100%;border:none}py-codeblock.maximize .py-codeblock__top-bar{border-top-left-radius:0;border-top-right-radius:0}py-codeblock.maximize .CodeMirror{border-bottom-left-radius:0;border-bottom-right-radius:0;height:auto}py-codeblock.maximize .py-codeblock__code-view{height:100%;background:#fff}py-codeblock>div{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;border:1px solid #d0d0d0;border-radius:10px;margin-bottom:10px}py-codeblock .CodeMirror{height:auto;border-bottom-left-radius:10px;border-bottom-right-radius:10px}py-codeblock .CodeMirror .marked{border-radius:2px;background-color:rgba(255,240,6,.4);border:1px solid #d0c303}py-codeblock .CodeMirror .cm-def,py-codeblock .CodeMirror .cm-property,py-codeblock .CodeMirror .cm-variable{border:1px solid #fff;border-radius:2px}py-codeblock .CodeMirror .cm-def:hover,py-codeblock .CodeMirror .cm-property:hover,py-codeblock .CodeMirror .cm-variable:hover{border:1px solid #686868;cursor:pointer}py-codeblock .icon-file{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iICAgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiAgICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIgICAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIiAgICAgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDgwIDEwMCI+ICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMCwtOTUyLjM2MjE4KSI+PHBhdGggZD0ibSAxNyw5NjAuMzYyMTUgMCwzIDAsNzguMDAwMDUgMCwzIDMsMCA2MCwwIDMsMCAwLC0zIGMgMCwtMjEuMDgzNCAwLC0zOC4xNjY3IDAsLTU5LjI1MDA4IC03LjcwMzEsLTcuNzAzMDQgLTE1LjAzMTEsLTE1LjAzMTA4IC0yMS43NSwtMjEuNzQ5OTcgLTEzLjc1LDAgLTI3LjUsMCAtNDEuMjUsMCB6IG0gNiw2IDM0LDAgMCwxNi45OTk5NyAwLDMgMywwIDE3LDAgMCw1Mi4wMDAwOCAtNTQsMCB6IG0gNDAsNC4yMTg3NSA5Ljc4MTIsOS43ODEyNSAtOS43ODEyLDAgeiIgc3R5bGU9InRleHQtaW5kZW50OjA7dGV4dC10cmFuc2Zvcm06bm9uZTtkaXJlY3Rpb246bHRyO2Jsb2NrLXByb2dyZXNzaW9uOnRiO2Jhc2VsaW5lLXNoaWZ0OmJhc2VsaW5lO2NvbG9yOiMwMDAwMDA7ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZTsiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIG1hcmtlcj0ibm9uZSIgdmlzaWJpbGl0eT0idmlzaWJsZSIgZGlzcGxheT0iaW5saW5lIiBvdmVyZmxvdz0idmlzaWJsZSIvPjwvZz48L3N2Zz4=);width:13px;height:15px;display:inline-block;margin:0 4px 0 0}py-codeblock .py-codeblock__top-bar{display:-ms-flexbox;display:flex;background:#d0d0d0;border-top-left-radius:8px;border-top-right-radius:8px;padding:5px 10px}py-codeblock .py-codeblock__top-bar .py-codeblock__top-bar__filename{-ms-flex-positive:1;flex-grow:1;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}py-codeblock .py-codeblock__top-bar .py-codeblock__top-bar__filename ion-icon{margin-right:5px}py-codeblock .py-codeblock__top-bar.reduced{border-bottom-left-radius:8px;border-bottom-right-radius:8px}py-codeblock .button{width:20px;height:20px;border-radius:10px;padding:0;font-weight:700;font-size:12px;cursor:pointer;border:1px solid #afaeae;margin-left:2px}py-codeblock .button:focus{outline:none}py-codeblock .button:hover{border-color:#8b8a8a}py-codeblock .button.disabled{opacity:.5;pointer-events:none}py-codeblock .py-codeblock__code-view.reduced{display:none}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
var MARGIN_CELL = 20;
var Graph = /** @class */ (function () {
    function class_2(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.layoutHierarchicalGraph = function (objects) {
            var layout = new window.mxHierarchicalLayout(_this.graph, window.mxConstants.DIRECTION_WEST);
            _this.graph.getModel().beginUpdate();
            try {
                layout.execute(objects);
            }
            finally {
                _this.graph.getModel().endUpdate();
            }
        };
        this.layoutColumn = function (object) {
            var layout = new window.mxStackLayout(_this.graph, false, 10);
            layout.resizeParent = true;
            layout.marginTop = 10;
            layout.marginRight = 10;
            layout.marginBottom = 10;
            layout.marginLeft = 10;
            _this.graph.getModel().beginUpdate();
            try {
                layout.execute(object);
            }
            finally {
                _this.graph.getModel().endUpdate();
            }
        };
        this.graphElementSelected = createEvent(this, "graphElementSelected", 7);
        this.graphSubElementSelected = createEvent(this, "graphSubElementSelected", 7);
    }
    class_2.prototype.componentWillLoad = function () {
    };
    class_2.prototype.componentDidLoad = function () {
        var _this = this;
        if (window['mxGraph']) {
            this.bootstrapGraph();
        }
        else {
            this.injectGraphDependency().then(function () {
                _this.bootstrapGraph();
            });
        }
    };
    class_2.prototype.injectGraphDependency = function () {
        var _this = this;
        return new Promise(function (resolveInjection, rejectInjection) {
            var script = document.createElement('script');
            script.setAttribute('src', _this.mxclientPath + '/mxClient.min.js');
            script.setAttribute('type', 'text/javascript');
            script.onload = function () {
                resolveInjection();
            };
            script.onerror = function () {
                rejectInjection();
            };
            // Configure mxClient loading
            window['mxLoadResources'] = false;
            window['mxBasePath'] = _this.mxclientPath;
            document.body.appendChild(script);
        });
    };
    class_2.prototype.bootstrapGraph = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.graph = new window.mxGraph(this.graphElement.querySelector('#graphContainer'));
                this.setupGraphStyles();
                this.setupHoverCells();
                this.graph.addListener(window.mxEvent.CLICK, function (_sender, evt) {
                    var cell = evt.getProperty('cell');
                    if (cell && cell.style === 'column') {
                        _this.graphElementSelected.emit(cell.pytheasElement);
                    }
                    if (cell &&
                        (cell.style === 'property' || cell.style === 'method')) {
                        _this.graphSubElementSelected.emit({
                            value: cell.value,
                            type: cell.style,
                            element: cell.pytheasElement
                        });
                    }
                });
                this.graph.getModel().beginUpdate();
                try {
                    this.buildGraphBlocks();
                }
                finally {
                    this.graph.getModel().endUpdate();
                    this.graph.setCellsMovable(false);
                }
                return [2 /*return*/];
            });
        });
    };
    class_2.prototype.componentDidUnload = function () { };
    class_2.prototype.render = function () {
        return h("div", { id: "graphContainer" });
    };
    class_2.prototype.buildGraphBlocks = function () {
        var _this = this;
        this.buildMainGraphBlock(this.data, true);
        this.data.relations.forEach(function (relation) {
            if (relation.type === 'in') {
                var element = _this.buildMainGraphBlock(relation.from);
                relation.from.mxElement = element;
                _this.graph.insertEdge(_this.graph.getDefaultParent(), null, '', element, _this.data.mxElement);
            }
            if (relation.type === 'out') {
                var element = _this.buildMainGraphBlock(relation.to);
                relation.to.mxElement = element;
                _this.graph.insertEdge(_this.graph.getDefaultParent(), null, '', _this.data.mxElement, element);
            }
        });
        this.layoutHierarchicalGraph(this.graph.getDefaultParent());
        this.layoutColumn(this.data.mxPublicElement);
        this.layoutColumn(this.data.mxPrivateElement);
        this.layoutColumn(this.data.mxElement);
        this.data.relations.forEach(function (relation) {
            var elementForWork;
            if (relation.type === 'in') {
                elementForWork = relation.from;
            }
            if (relation.type === 'out') {
                elementForWork = relation.to;
            }
            if (elementForWork.publicElements.length > 0) {
                _this.layoutColumn(elementForWork.mxPublicElement);
            }
            if (elementForWork.privateElements.length > 0) {
                _this.layoutColumn(elementForWork.mxPrivateElement);
            }
            _this.layoutColumn(elementForWork.mxElement);
        });
        // Render twice for proper scaling between mxHierarchicalLayout and mxStackLayout
        this.layoutHierarchicalGraph(this.graph.getDefaultParent());
        this.layoutColumn(this.data.mxPublicElement);
        this.layoutColumn(this.data.mxPrivateElement);
        this.layoutColumn(this.data.mxElement);
        this.data.relations.forEach(function (relation) {
            var elementForWork;
            if (relation.type === 'in') {
                elementForWork = relation.from;
            }
            if (relation.type === 'out') {
                elementForWork = relation.to;
            }
            if (elementForWork.publicElements.length > 0) {
                _this.layoutColumn(elementForWork.mxPublicElement);
            }
            if (elementForWork.privateElements.length > 0) {
                _this.layoutColumn(elementForWork.mxPrivateElement);
            }
            _this.layoutColumn(elementForWork.mxElement);
        });
    };
    class_2.prototype.buildMainGraphBlock = function (element, mainSelection) {
        var _this = this;
        var mxGraphVertexElementStyle = mainSelection
            ? 'columnSelection'
            : 'column';
        var mxGraphVertexElement = this.graph.insertVertex(this.graph.getDefaultParent(), null, element.name, 0, 0, 200, 200, mxGraphVertexElementStyle);
        element.mxElement = mxGraphVertexElement;
        mxGraphVertexElement.pytheasElement = element;
        var mxGraphVertexElementGeometry = mxGraphVertexElement.getGeometry();
        if (element.publicElements.length > 0) {
            var mxGraphVertexElementPublic_1 = this.graph.insertVertex(mxGraphVertexElement, null, 'Public', 0, 0, 80, 30, 'whiteColumn');
            element.mxPublicElement = mxGraphVertexElementPublic_1;
            var mxGraphVertexElementPublicGeometry = mxGraphVertexElementPublic_1.getGeometry();
            var maxWidthForElements_1 = 0;
            element.publicElements.forEach(function (publicElement) {
                var mxGraphVertexElementPublicChild = _this.graph.insertVertex(mxGraphVertexElementPublic_1, null, publicElement.name, 0, 0, 60, 30, publicElement.kind);
                mxGraphVertexElementPublicChild.pytheasElement = element;
                // Resize it
                var mxGraphVertexElementPublicChildGeometry = mxGraphVertexElementPublicChild.getGeometry();
                var mxGraphVertexElementPublicChildPreferredGeometry = _this.graph.getPreferredSizeForCell(mxGraphVertexElementPublicChild);
                if (mxGraphVertexElementPublicChildPreferredGeometry.width >
                    maxWidthForElements_1) {
                    maxWidthForElements_1 =
                        mxGraphVertexElementPublicChildPreferredGeometry.width;
                }
                mxGraphVertexElementPublicChildGeometry.width =
                    mxGraphVertexElementPublicChildPreferredGeometry.width +
                        MARGIN_CELL;
            });
            // Resize public column
            mxGraphVertexElementPublicGeometry.width =
                maxWidthForElements_1 + MARGIN_CELL * 2;
            mxGraphVertexElementGeometry.width =
                mxGraphVertexElementPublicGeometry.width + MARGIN_CELL;
        }
        if (element.privateElements.length > 0) {
            var mxGraphVertexElementPrivate_1 = this.graph.insertVertex(mxGraphVertexElement, null, 'Private', 0, 0, 80, 30, 'whiteColumn');
            element.mxPrivateElement = mxGraphVertexElementPrivate_1;
            var mxGraphVertexElementPrivateGeometry = mxGraphVertexElementPrivate_1.getGeometry();
            var maxWidthForElements_2 = 0;
            element.privateElements.forEach(function (privateElement) {
                var mxGraphVertexElementPrivateChild = _this.graph.insertVertex(mxGraphVertexElementPrivate_1, null, privateElement.name, 0, 0, 60, 30, privateElement.kind);
                mxGraphVertexElementPrivateChild.pytheasElement = element;
                // Resize it
                var mxGraphVertexElementPrivateChildGeometry = mxGraphVertexElementPrivateChild.getGeometry();
                var mxGraphVertexElementPrivateChildPreferredGeometry = _this.graph.getPreferredSizeForCell(mxGraphVertexElementPrivateChild);
                if (mxGraphVertexElementPrivateChildPreferredGeometry.width >
                    maxWidthForElements_2) {
                    maxWidthForElements_2 =
                        mxGraphVertexElementPrivateChildPreferredGeometry.width;
                }
                mxGraphVertexElementPrivateChildGeometry.width =
                    mxGraphVertexElementPrivateChildPreferredGeometry.width +
                        MARGIN_CELL;
            });
            // Resize private column
            mxGraphVertexElementPrivateGeometry.width =
                maxWidthForElements_2 + MARGIN_CELL * 2;
            if (mxGraphVertexElementPrivateGeometry.width >
                mxGraphVertexElementGeometry.width) {
                mxGraphVertexElementGeometry.width =
                    mxGraphVertexElementPrivateGeometry.width + MARGIN_CELL;
            }
        }
        return mxGraphVertexElement;
    };
    class_2.prototype.setupHoverCells = function () {
        var mainGraph = this.graph;
        var styleWhiteColumnGroup = this.styleWhiteColumnGroup;
        function updateStyle(state, hover) {
            if (hover) {
                if (state.cell.style === 'whiteColumn') {
                    styleWhiteColumnGroup[window.mxConstants.STYLE_SWIMLANE_FILLCOLOR] = '#fff';
                    state.style[window.mxConstants.STYLE_STROKECOLOR] = '#fff';
                }
                else {
                    state.style[window.mxConstants.STYLE_STROKECOLOR] =
                        '#707070';
                }
            }
        }
        // Changes fill color to red on mouseover
        this.graph.addMouseListener({
            currentState: null,
            previousStyle: null,
            mouseDown: function (sender, me) {
                if (this.currentState != null) {
                    this.dragLeave(me.getEvent(), this.currentState);
                    this.currentState = null;
                }
            },
            mouseMove: function (sender, me) {
                if (this.currentState != null &&
                    me.getState() === this.currentState) {
                    return;
                }
                var tmp = mainGraph.view.getState(me.getCell());
                // Ignores everything but vertices
                if (mainGraph.isMouseDown ||
                    (tmp != null && !mainGraph.getModel().isVertex(tmp.cell))) {
                    tmp = null;
                }
                if (tmp !== this.currentState) {
                    if (this.currentState != null) {
                        this.dragLeave(me.getEvent(), this.currentState);
                    }
                    this.currentState = tmp;
                    if (this.currentState != null) {
                        this.dragEnter(me.getEvent(), this.currentState);
                    }
                }
            },
            mouseUp: function (sender, me) { },
            dragEnter: function (evt, state) {
                if (state != null) {
                    this.previousStyle = state.style;
                    state.style = window.mxUtils.clone(state.style);
                    updateStyle(state, true);
                    state.shape.apply(state);
                    state.shape.redraw();
                    if (state.text != null) {
                        state.text.apply(state);
                        state.text.redraw();
                    }
                }
            },
            dragLeave: function (evt, state) {
                if (state != null) {
                    state.style = this.previousStyle;
                    updateStyle(state, false);
                    state.shape.apply(state);
                    state.shape.redraw();
                    if (state.text != null) {
                        state.text.apply(state);
                        state.text.redraw();
                    }
                }
            }
        });
    };
    class_2.prototype.setupGraphStyles = function () {
        // Disables global features
        this.graph.collapseToPreferredSize = false;
        this.graph.constrainChildren = false;
        this.graph.cellsSelectable = false;
        this.graph.extendParentsOnAdd = false;
        this.graph.extendParents = true;
        this.graph.border = 10;
        var styleEdge = this.graph.getStylesheet().getDefaultEdgeStyle();
        styleEdge[window.mxConstants.STYLE_EDGE] =
            window.mxEdgeStyle.EntityRelation;
        styleEdge[window.mxConstants.STYLE_STROKECOLOR] = '#c8c7c7';
        styleEdge[window.mxConstants.STYLE_STROKEWIDTH] = '2';
        styleEdge[window.mxConstants.STYLE_ROUNDED] = true;
        var styleCommonCell = this.graph
            .getStylesheet()
            .getDefaultVertexStyle();
        styleCommonCell[window.mxConstants.STYLE_FONTSIZE] = '16';
        var styleColumn = [];
        styleColumn[window.mxConstants.STYLE_FILLCOLOR] = '#e5e5e5';
        styleColumn[window.mxConstants.STYLE_SWIMLANE_FILLCOLOR] = '#e5e5e5';
        styleColumn[window.mxConstants.STYLE_SWIMLANE_LINE] = '0';
        styleColumn[window.mxConstants.STYLE_FONTCOLOR] = '#000000';
        styleColumn[window.mxConstants.STYLE_STROKECOLOR] = '#c8c7c7';
        styleColumn[window.mxConstants.STYLE_FONTSIZE] = '16';
        styleColumn[window.mxConstants.STYLE_SHAPE] = 'swimlane';
        styleColumn[window.mxConstants.STYLE_STARTSIZE] = 30;
        styleColumn[window.mxConstants.STYLE_ROUNDED] = true;
        styleColumn[window.mxConstants.STYLE_FOLDABLE] = false;
        styleColumn[window.mxConstants.STYLE_FONTSTYLE] =
            window.mxConstants.FONT_BOLD;
        this.graph.getStylesheet().putCellStyle('column', styleColumn);
        var styleColumnSelection = Object.assign({}, styleColumn);
        styleColumnSelection[window.mxConstants.STYLE_STROKECOLOR] = '#454545';
        this.graph
            .getStylesheet()
            .putCellStyle('columnSelection', styleColumnSelection);
        var styleWhiteColumnGroup = [];
        styleWhiteColumnGroup[window.mxConstants.STYLE_FOLDABLE] = false;
        styleWhiteColumnGroup[window.mxConstants.STYLE_FONTCOLOR] = '#000000';
        styleWhiteColumnGroup[window.mxConstants.STYLE_FILLCOLOR] = '#ffffff';
        styleWhiteColumnGroup[window.mxConstants.STYLE_SWIMLANE_FILLCOLOR] =
            '#fff';
        styleWhiteColumnGroup[window.mxConstants.STYLE_FONTSTYLE] =
            window.mxConstants.FONT_BOLD;
        styleWhiteColumnGroup[window.mxConstants.STYLE_STROKECOLOR] = '#fff';
        styleWhiteColumnGroup[window.mxConstants.STYLE_SHAPE] = 'swimlane';
        styleWhiteColumnGroup[window.mxConstants.STYLE_ROUNDED] = true;
        this.styleWhiteColumnGroup = styleWhiteColumnGroup;
        this.graph
            .getStylesheet()
            .putCellStyle('whiteColumn', styleWhiteColumnGroup);
        var styleVariable = [];
        styleVariable[window.mxConstants.STYLE_SHAPE] =
            window.mxConstants.SHAPE_RECTANGLE;
        styleVariable[window.mxConstants.STYLE_ROUNDED] = true;
        styleVariable[window.mxConstants.STYLE_FILLCOLOR] = '#6fb4d3';
        styleVariable[window.mxConstants.STYLE_FONTCOLOR] = '#232323';
        styleVariable[window.mxConstants.STYLE_STROKECOLOR] = '#6fb4d3';
        this.graph.getStylesheet().putCellStyle('property', styleVariable);
        var styleMethod = [];
        styleMethod[window.mxConstants.STYLE_SHAPE] =
            window.mxConstants.SHAPE_RECTANGLE;
        styleMethod[window.mxConstants.STYLE_ROUNDED] = true;
        styleMethod[window.mxConstants.STYLE_FILLCOLOR] = '#f9bb43';
        styleMethod[window.mxConstants.STYLE_FONTCOLOR] = '#232323';
        styleMethod[window.mxConstants.STYLE_STROKECOLOR] = '#f9bb43';
        this.graph.getStylesheet().putCellStyle('method', styleMethod);
    };
    Object.defineProperty(class_2.prototype, "graphElement", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_2, "style", {
        get: function () { return "py-graph{width:100%;height:100%;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}py-graph svg text:hover{cursor:default}.container{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;height:100%}.block-class{background:#e5e5e5;border:1px solid #c8c7c7;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;padding:12px 15px;border-radius:10px;margin:30px}.block-class.central{border-color:#707070;border-width:2px}.block-class:hover{border-color:#707070}.block-class_group{background:#fff;border-radius:6px;margin-bottom:10px;width:100%}.block-class_group .container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;padding:10px}.block-class_group .title{font-weight:700;margin-bottom:10px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.block-class_group .title ion-icon{margin-right:5px;font-size:20px}.block-class_title{font-weight:700;font-size:18px;width:100%;text-align:center}.block-class_title.has-child{margin-bottom:10px}.method{background:#f9bb43;border:1px solid #f9bb43}.method:hover{border-color:#a77e2e}.property{background:#6fb4d3;border:1px solid #6fb4d3}.property:hover{border-color:#4e7f96}.method,.property{padding:4px 8px;border-radius:6px;margin:3px 0;color:#232323;cursor:default}.inner-relations,.outer-relations{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}"; },
        enumerable: true,
        configurable: true
    });
    return class_2;
}());
export { CodeBlock as py_codeblock, Graph as py_graph };
