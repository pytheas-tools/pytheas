import{r as t,c as i,h as s,g as n}from"./p-fcd3ede5.js";const e=class{constructor(s){t(this,s),this.code="",this.maximized=!1,this.codeblockMaximized=i(this,"codeblockMaximized",7),this.codeblockUnmaximized=i(this,"codeblockUnmaximized",7),this.tokenHovered=i(this,"tokenHovered",7)}componentWillLoad(){}componentDidLoad(){window.CodeMirror?this.bootstrapEditor():this.injectEditorDependency().then(()=>{this.bootstrapEditor()}),this.topBar=this.el.querySelector(".py-codeblock__top-bar"),this.codeView=this.el.querySelector(".py-codeblock__code-view"),this.reduceButton=this.el.querySelector(".button.reduce"),this.openButton=this.el.querySelector(".button.open"),this.openButton.classList.add("disabled"),this.fullsizeButton=this.el.querySelector(".button.maximize")}async updateTheme(t){this.codeMirrorEditor.setOption("theme","theme-dark"===t?"monokai":"default")}async highlight(t){this._highlight(t)}async highlights(t){t.forEach(t=>{this._highlight(t)})}async unHighlight(){this.codeMirrorEditor.getAllMarks().forEach(t=>{t.clear()})}_highlight(t){const[i,s]=t.map(t=>((t,i)=>t.posFromIndex(i))(this.codeMirrorEditor.doc,t));this.codeMirrorEditor.markText(i,s,{className:"marked"})}injectEditorDependency(){return new Promise((t,i)=>{const s=document.createElement("script");s.setAttribute("src",this.codemirrorPath),s.setAttribute("type","text/javascript"),s.onload=()=>{t()},s.onerror=()=>{i()},document.body.appendChild(s)})}async bootstrapEditor(){const t=window.CodeMirror;this.codeMirrorEditor=t(this.el.querySelector(".py-codeblock__code-view"),{value:this.code,mode:this.language?"text/"+this.language:"javascript",lineNumbers:!0,viewportMargin:1/0,lineWrapping:!0,foldGutter:!0,readOnly:!0,theme:this.theme&&"theme-dark"===this.theme?"monokai":"default",gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"]}),t.on(this.codeMirrorEditor.getWrapperElement(),"mouseover",t=>{const i=t.target||t.srcElement;i&&this.tokenHovered.emit({filename:this.filename,text:i.innerText})})}reduce(){this.codeView.classList.add("reduced"),this.topBar.classList.add("reduced"),this.reduceButton.classList.add("disabled"),this.openButton.classList.remove("disabled")}open(){this.maximized?(this.el.classList.remove("maximize"),this.openButton.classList.add("disabled"),this.reduceButton.style.display="inline-block",this.fullsizeButton.style.display="inline-block",this.maximized=!1,this.codeblockUnmaximized.emit()):(this.codeView.classList.remove("reduced"),this.topBar.classList.remove("reduced"),this.reduceButton.classList.remove("disabled"),this.openButton.classList.add("disabled"))}maximize(){this.el.classList.add("maximize"),this.reduceButton.style.display="none",this.fullsizeButton.style.display="none",this.reduceButton.classList.remove("disabled"),this.openButton.classList.remove("disabled"),this.topBar.classList.remove("reduced"),this.codeView.classList.remove("reduced"),this.maximized=!0,this.codeblockMaximized.emit()}render(){return s("div",null,s("div",{class:"py-codeblock__top-bar"},s("div",{class:"py-codeblock__top-bar__filename"},s("ion-icon",{name:"list"}),s("span",null,this.filename)),s("div",{class:"py-codeblock__top-bar__buttons"},s("button",{class:"button reduce",title:"Reduce",type:"button",onClick:this.reduce.bind(this)},"-"),s("button",{class:"button open",title:"Open",type:"button",onClick:this.open.bind(this)},"="),s("button",{class:"button maximize",title:"Maximize",type:"button",onClick:this.maximize.bind(this)},"□"))),s("div",{class:"py-codeblock__code-view"}))}get el(){return n(this)}static get style(){return"\@charset \"UTF-8\";.CodeMirror{font-family:monospace;height:300px;color:#000;direction:ltr}.CodeMirror-lines{padding:4px 0}.CodeMirror pre.CodeMirror-line,.CodeMirror pre.CodeMirror-line-like{padding:0 4px}.CodeMirror-gutter-filler,.CodeMirror-scrollbar-filler{background-color:#fff}.CodeMirror-gutters{border-right:1px solid #ddd;background-color:#f7f7f7;white-space:nowrap}.CodeMirror-linenumber{padding:0 3px 0 5px;min-width:20px;text-align:right;color:#999;white-space:nowrap}.CodeMirror-guttermarker{color:#000}.CodeMirror-guttermarker-subtle{color:#999}.CodeMirror-cursor{border-left:1px solid #000;border-right:none;width:0}.CodeMirror div.CodeMirror-secondarycursor{border-left:1px solid silver}.cm-fat-cursor .CodeMirror-cursor{width:auto;border:0!important;background:#7e7}.cm-fat-cursor div.CodeMirror-cursors{z-index:1}.cm-fat-cursor-mark{background-color:rgba(20,255,20,.5)}.cm-animate-fat-cursor,.cm-fat-cursor-mark{-webkit-animation:blink 1.06s steps(1) infinite;-moz-animation:blink 1.06s steps(1) infinite;animation:blink 1.06s steps(1) infinite}.cm-animate-fat-cursor{width:auto;border:0;background-color:#7e7}\@-moz-keyframes blink{50%{background-color:transparent}}\@-webkit-keyframes blink{50%{background-color:transparent}}\@keyframes blink{50%{background-color:transparent}}.cm-tab{display:inline-block;text-decoration:inherit}.CodeMirror-rulers{position:absolute;left:0;right:0;top:-50px;bottom:0;overflow:hidden}.CodeMirror-ruler{border-left:1px solid #ccc;top:0;bottom:0;position:absolute}.cm-s-default .cm-header{color:#00f}.cm-s-default .cm-quote{color:#090}.cm-negative{color:#d44}.cm-positive{color:#292}.cm-header,.cm-strong{font-weight:700}.cm-em{font-style:italic}.cm-link{text-decoration:underline}.cm-strikethrough{text-decoration:line-through}.cm-s-default .cm-keyword{color:#708}.cm-s-default .cm-atom{color:#219}.cm-s-default .cm-number{color:#164}.cm-s-default .cm-def{color:#00f}.cm-s-default .cm-variable-2{color:#05a}.cm-s-default .cm-type,.cm-s-default .cm-variable-3{color:#085}.cm-s-default .cm-comment{color:#a50}.cm-s-default .cm-string{color:#a11}.cm-s-default .cm-string-2{color:#f50}.cm-s-default .cm-meta,.cm-s-default .cm-qualifier{color:#555}.cm-s-default .cm-builtin{color:#30a}.cm-s-default .cm-bracket{color:#997}.cm-s-default .cm-tag{color:#170}.cm-s-default .cm-attribute{color:#00c}.cm-s-default .cm-hr{color:#999}.cm-s-default .cm-link{color:#00c}.cm-invalidchar,.cm-s-default .cm-error{color:red}.CodeMirror-composing{border-bottom:2px solid}div.CodeMirror span.CodeMirror-matchingbracket{color:#0b0}div.CodeMirror span.CodeMirror-nonmatchingbracket{color:#a22}.CodeMirror-matchingtag{background:rgba(255,150,0,.3)}.CodeMirror-activeline-background{background:#e8f2ff}.CodeMirror{position:relative;overflow:hidden;background:#fff}.CodeMirror-scroll{overflow:scroll!important;margin-bottom:-30px;margin-right:-30px;padding-bottom:30px;height:100%;outline:none;position:relative}.CodeMirror-sizer{position:relative;border-right:30px solid transparent}.CodeMirror-gutter-filler,.CodeMirror-hscrollbar,.CodeMirror-scrollbar-filler,.CodeMirror-vscrollbar{position:absolute;z-index:6;display:none}.CodeMirror-vscrollbar{right:0;top:0;overflow-x:hidden;overflow-y:scroll}.CodeMirror-hscrollbar{bottom:0;left:0;overflow-y:hidden;overflow-x:scroll}.CodeMirror-scrollbar-filler{right:0;bottom:0}.CodeMirror-gutter-filler{left:0;bottom:0}.CodeMirror-gutters{position:absolute;left:0;top:0;min-height:100%;z-index:3}.CodeMirror-gutter{white-space:normal;height:100%;display:inline-block;vertical-align:top;margin-bottom:-30px}.CodeMirror-gutter-wrapper{position:absolute;z-index:4;background:none!important;border:none!important}.CodeMirror-gutter-background{position:absolute;top:0;bottom:0;z-index:4}.CodeMirror-gutter-elt{position:absolute;cursor:default;z-index:4}.CodeMirror-gutter-wrapper ::selection{background-color:transparent}.CodeMirror-gutter-wrapper ::-moz-selection{background-color:transparent}.CodeMirror-lines{cursor:text;min-height:1px}.CodeMirror pre.CodeMirror-line,.CodeMirror pre.CodeMirror-line-like{-moz-border-radius:0;-webkit-border-radius:0;border-radius:0;border-width:0;background:transparent;font-family:inherit;font-size:inherit;margin:0;white-space:pre;word-wrap:normal;line-height:inherit;color:inherit;z-index:2;position:relative;overflow:visible;-webkit-tap-highlight-color:transparent;-webkit-font-variant-ligatures:contextual;font-variant-ligatures:contextual}.CodeMirror-wrap pre.CodeMirror-line,.CodeMirror-wrap pre.CodeMirror-line-like{word-wrap:break-word;white-space:pre-wrap;word-break:normal}.CodeMirror-linebackground{position:absolute;left:0;right:0;top:0;bottom:0;z-index:0}.CodeMirror-linewidget{position:relative;z-index:2;padding:.1px}.CodeMirror-rtl pre{direction:rtl}.CodeMirror-code{outline:none}.CodeMirror-gutter,.CodeMirror-gutters,.CodeMirror-linenumber,.CodeMirror-scroll,.CodeMirror-sizer{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}.CodeMirror-measure{position:absolute;width:100%;height:0;overflow:hidden;visibility:hidden}.CodeMirror-cursor{position:absolute;pointer-events:none}.CodeMirror-measure pre{position:static}div.CodeMirror-cursors{visibility:hidden;position:relative;z-index:3}.CodeMirror-focused div.CodeMirror-cursors,div.CodeMirror-dragcursors{visibility:visible}.CodeMirror-selected{background:#d9d9d9}.CodeMirror-focused .CodeMirror-selected{background:#d7d4f0}.CodeMirror-crosshair{cursor:crosshair}.CodeMirror-line::selection,.CodeMirror-line>span::selection,.CodeMirror-line>span>span::selection{background:#d7d4f0}.CodeMirror-line::-moz-selection,.CodeMirror-line>span::-moz-selection,.CodeMirror-line>span>span::-moz-selection{background:#d7d4f0}.cm-searching{background-color:#ffa;background-color:rgba(255,255,0,.4)}.cm-force-border{padding-right:.1px}\@media print{.CodeMirror div.CodeMirror-cursors{visibility:hidden}}.cm-tab-wrap-hack:after{content:\"\"}span.CodeMirror-selectedtext{background:none}.CodeMirror-foldmarker{color:#00f;text-shadow:#b9f 1px 1px 2px,#b9f -1px -1px 2px,#b9f 1px -1px 2px,#b9f -1px 1px 2px;font-family:arial;line-height:.3;cursor:pointer}.CodeMirror-foldgutter{width:.7em}.CodeMirror-foldgutter-folded,.CodeMirror-foldgutter-open{cursor:pointer}.CodeMirror-foldgutter-open:after{content:\"▾\"}.CodeMirror-foldgutter-folded:after{content:\"▸\"}.cm-s-monokai.CodeMirror{background:#272822;color:#f8f8f2}.cm-s-monokai div.CodeMirror-selected{background:#49483e}.cm-s-monokai .CodeMirror-line::selection,.cm-s-monokai .CodeMirror-line>span::selection,.cm-s-monokai .CodeMirror-line>span>span::selection{background:rgba(73,72,62,.99)}.cm-s-monokai .CodeMirror-line::-moz-selection,.cm-s-monokai .CodeMirror-line>span::-moz-selection,.cm-s-monokai .CodeMirror-line>span>span::-moz-selection{background:rgba(73,72,62,.99)}.cm-s-monokai .CodeMirror-gutters{background:#272822;border-right:0}.cm-s-monokai .CodeMirror-guttermarker{color:#fff}.cm-s-monokai .CodeMirror-guttermarker-subtle,.cm-s-monokai .CodeMirror-linenumber{color:#d0d0d0}.cm-s-monokai .CodeMirror-cursor{border-left:1px solid #f8f8f0}.cm-s-monokai span.cm-comment{color:#75715e}.cm-s-monokai span.cm-atom,.cm-s-monokai span.cm-number{color:#ae81ff}.cm-s-monokai span.cm-comment.cm-attribute{color:#97b757}.cm-s-monokai span.cm-comment.cm-def{color:#bc9262}.cm-s-monokai span.cm-comment.cm-tag{color:#bc6283}.cm-s-monokai span.cm-comment.cm-type{color:#5998a6}.cm-s-monokai span.cm-attribute,.cm-s-monokai span.cm-property{color:#a6e22e}.cm-s-monokai span.cm-keyword{color:#f92672}.cm-s-monokai span.cm-builtin{color:#66d9ef}.cm-s-monokai span.cm-string{color:#e6db74}.cm-s-monokai span.cm-variable{color:#f8f8f2}.cm-s-monokai span.cm-variable-2{color:#9effff}.cm-s-monokai span.cm-type,.cm-s-monokai span.cm-variable-3{color:#66d9ef}.cm-s-monokai span.cm-def{color:#fd971f}.cm-s-monokai span.cm-bracket{color:#f8f8f2}.cm-s-monokai span.cm-tag{color:#f92672}.cm-s-monokai span.cm-header,.cm-s-monokai span.cm-link{color:#ae81ff}.cm-s-monokai span.cm-error{background:#f92672;color:#f8f8f0}.cm-s-monokai .CodeMirror-activeline-background{background:#373831}.cm-s-monokai .CodeMirror-matchingbracket{text-decoration:underline;color:#fff!important}py-codeblock.maximize{width:100%;height:100%;display:block;position:absolute;top:0;z-index:5}py-codeblock.maximize>div{height:100%;border:none}py-codeblock.maximize .py-codeblock__top-bar{border-top-left-radius:0;border-top-right-radius:0}py-codeblock.maximize .CodeMirror{border-bottom-left-radius:0;border-bottom-right-radius:0;height:auto}py-codeblock.maximize .py-codeblock__code-view{height:100%;background:#fff}py-codeblock>div{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;border:1px solid #d0d0d0;border-radius:10px;margin-bottom:10px}py-codeblock .CodeMirror{height:auto;border-bottom-left-radius:10px;border-bottom-right-radius:10px}py-codeblock .CodeMirror .marked{border-radius:2px;background-color:rgba(255,240,6,.4);border:1px solid #d0c303}py-codeblock .CodeMirror .cm-def,py-codeblock .CodeMirror .cm-property,py-codeblock .CodeMirror .cm-variable{border:1px solid #fff;border-radius:2px}py-codeblock .CodeMirror .cm-def:hover,py-codeblock .CodeMirror .cm-property:hover,py-codeblock .CodeMirror .cm-variable:hover{border:1px solid #686868;cursor:pointer}py-codeblock .icon-file{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iICAgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiAgICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIgICAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIiAgICAgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDgwIDEwMCI+ICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMCwtOTUyLjM2MjE4KSI+PHBhdGggZD0ibSAxNyw5NjAuMzYyMTUgMCwzIDAsNzguMDAwMDUgMCwzIDMsMCA2MCwwIDMsMCAwLC0zIGMgMCwtMjEuMDgzNCAwLC0zOC4xNjY3IDAsLTU5LjI1MDA4IC03LjcwMzEsLTcuNzAzMDQgLTE1LjAzMTEsLTE1LjAzMTA4IC0yMS43NSwtMjEuNzQ5OTcgLTEzLjc1LDAgLTI3LjUsMCAtNDEuMjUsMCB6IG0gNiw2IDM0LDAgMCwxNi45OTk5NyAwLDMgMywwIDE3LDAgMCw1Mi4wMDAwOCAtNTQsMCB6IG0gNDAsNC4yMTg3NSA5Ljc4MTIsOS43ODEyNSAtOS43ODEyLDAgeiIgc3R5bGU9InRleHQtaW5kZW50OjA7dGV4dC10cmFuc2Zvcm06bm9uZTtkaXJlY3Rpb246bHRyO2Jsb2NrLXByb2dyZXNzaW9uOnRiO2Jhc2VsaW5lLXNoaWZ0OmJhc2VsaW5lO2NvbG9yOiMwMDAwMDA7ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZTsiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIG1hcmtlcj0ibm9uZSIgdmlzaWJpbGl0eT0idmlzaWJsZSIgZGlzcGxheT0iaW5saW5lIiBvdmVyZmxvdz0idmlzaWJsZSIvPjwvZz48L3N2Zz4=);width:13px;height:15px;display:inline-block;margin:0 4px 0 0}py-codeblock .py-codeblock__top-bar{display:-ms-flexbox;display:flex;background:#d0d0d0;border-top-left-radius:8px;border-top-right-radius:8px;padding:5px 10px}py-codeblock .py-codeblock__top-bar .py-codeblock__top-bar__filename{-ms-flex-positive:1;flex-grow:1;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}py-codeblock .py-codeblock__top-bar .py-codeblock__top-bar__filename ion-icon{margin-right:5px}py-codeblock .py-codeblock__top-bar.reduced{border-bottom-left-radius:8px;border-bottom-right-radius:8px}py-codeblock .button{width:20px;height:20px;border-radius:10px;padding:0;font-weight:700;font-size:12px;cursor:pointer;border:1px solid #afaeae;margin-left:2px}py-codeblock .button:focus{outline:none}py-codeblock .button:hover{border-color:#8b8a8a}py-codeblock .button.disabled{opacity:.5;pointer-events:none}py-codeblock .py-codeblock__code-view.reduced{display:none}"}},o=class{constructor(s){t(this,s),this.layoutHierarchicalGraph=t=>{const i=new window.mxHierarchicalLayout(this.graph,window.mxConstants.DIRECTION_WEST);this.graph.getModel().beginUpdate();try{i.execute(t)}finally{this.graph.getModel().endUpdate()}},this.layoutColumn=t=>{const i=new window.mxStackLayout(this.graph,!1,10);i.resizeParent=!0,i.marginTop=10,i.marginRight=10,i.marginBottom=10,i.marginLeft=10,this.graph.getModel().beginUpdate();try{i.execute(t)}finally{this.graph.getModel().endUpdate()}},this.graphElementSelected=i(this,"graphElementSelected",7),this.graphSubElementSelected=i(this,"graphSubElementSelected",7)}componentWillLoad(){}componentDidLoad(){window.mxGraph?this.bootstrapGraph():this.injectGraphDependency().then(()=>{this.bootstrapGraph()})}injectGraphDependency(){return new Promise((t,i)=>{const s=document.createElement("script");s.setAttribute("src",this.mxclientPath+"/mxClient.min.js"),s.setAttribute("type","text/javascript"),s.onload=()=>{t()},s.onerror=()=>{i()},window.mxLoadResources=!1,window.mxBasePath=this.mxclientPath,document.body.appendChild(s)})}async bootstrapGraph(){this.graph=new window.mxGraph(this.graphElement.querySelector("#graphContainer")),this.setupGraphStyles(),this.setupHoverCells(),this.graph.addListener(window.mxEvent.CLICK,(t,i)=>{const s=i.getProperty("cell");s&&"column"===s.style&&this.graphElementSelected.emit(s.pytheasElement),!s||"property"!==s.style&&"method"!==s.style||this.graphSubElementSelected.emit({value:s.value,type:s.style,element:s.pytheasElement})}),this.graph.getModel().beginUpdate();try{this.buildGraphBlocks()}finally{this.graph.getModel().endUpdate(),this.graph.setCellsMovable(!1)}}componentDidUnload(){}render(){return s("div",{id:"graphContainer"})}buildGraphBlocks(){this.buildMainGraphBlock(this.data,!0),this.data.relations.forEach(t=>{if("in"===t.type){const i=this.buildMainGraphBlock(t.from);t.from.mxElement=i,this.graph.insertEdge(this.graph.getDefaultParent(),null,"",i,this.data.mxElement)}if("out"===t.type){const i=this.buildMainGraphBlock(t.to);t.to.mxElement=i,this.graph.insertEdge(this.graph.getDefaultParent(),null,"",this.data.mxElement,i)}}),this.layoutHierarchicalGraph(this.graph.getDefaultParent()),this.layoutColumn(this.data.mxPublicElement),this.layoutColumn(this.data.mxPrivateElement),this.layoutColumn(this.data.mxElement),this.data.relations.forEach(t=>{let i;"in"===t.type&&(i=t.from),"out"===t.type&&(i=t.to),i.publicElements.length>0&&this.layoutColumn(i.mxPublicElement),i.privateElements.length>0&&this.layoutColumn(i.mxPrivateElement),this.layoutColumn(i.mxElement)}),this.layoutHierarchicalGraph(this.graph.getDefaultParent()),this.layoutColumn(this.data.mxPublicElement),this.layoutColumn(this.data.mxPrivateElement),this.layoutColumn(this.data.mxElement),this.data.relations.forEach(t=>{let i;"in"===t.type&&(i=t.from),"out"===t.type&&(i=t.to),i.publicElements.length>0&&this.layoutColumn(i.mxPublicElement),i.privateElements.length>0&&this.layoutColumn(i.mxPrivateElement),this.layoutColumn(i.mxElement)})}buildMainGraphBlock(t,i){const s=i?"columnSelection":"column",n=this.graph.insertVertex(this.graph.getDefaultParent(),null,t.name,0,0,200,200,s);t.mxElement=n,n.pytheasElement=t;const e=n.getGeometry();if(t.publicElements.length>0){const i=this.graph.insertVertex(n,null,"Public",0,0,80,30,"whiteColumn");t.mxPublicElement=i;const s=i.getGeometry();let o=0;t.publicElements.forEach(s=>{const n=this.graph.insertVertex(i,null,s.name,0,0,60,30,s.kind);n.pytheasElement=t;const e=n.getGeometry(),h=this.graph.getPreferredSizeForCell(n);h.width>o&&(o=h.width),e.width=h.width+20}),s.width=o+40,e.width=s.width+20}if(t.privateElements.length>0){const i=this.graph.insertVertex(n,null,"Private",0,0,80,30,"whiteColumn");t.mxPrivateElement=i;const s=i.getGeometry();let o=0;t.privateElements.forEach(s=>{const n=this.graph.insertVertex(i,null,s.name,0,0,60,30,s.kind);n.pytheasElement=t;const e=n.getGeometry(),h=this.graph.getPreferredSizeForCell(n);h.width>o&&(o=h.width),e.width=h.width+20}),s.width=o+40,s.width>e.width&&(e.width=s.width+20)}return n}setupHoverCells(){const t=this.graph,i=this.styleWhiteColumnGroup;function s(t,s){s&&("whiteColumn"===t.cell.style?(i[window.mxConstants.STYLE_SWIMLANE_FILLCOLOR]="#fff",t.style[window.mxConstants.STYLE_STROKECOLOR]="#fff"):t.style[window.mxConstants.STYLE_STROKECOLOR]="#707070")}this.graph.addMouseListener({currentState:null,previousStyle:null,mouseDown(t,i){null!=this.currentState&&(this.dragLeave(i.getEvent(),this.currentState),this.currentState=null)},mouseMove(i,s){if(null==this.currentState||s.getState()!==this.currentState){var n=t.view.getState(s.getCell());(t.isMouseDown||null!=n&&!t.getModel().isVertex(n.cell))&&(n=null),n!==this.currentState&&(null!=this.currentState&&this.dragLeave(s.getEvent(),this.currentState),this.currentState=n,null!=this.currentState&&this.dragEnter(s.getEvent(),this.currentState))}},mouseUp:function(){},dragEnter(t,i){null!=i&&(this.previousStyle=i.style,i.style=window.mxUtils.clone(i.style),s(i,!0),i.shape.apply(i),i.shape.redraw(),null!=i.text&&(i.text.apply(i),i.text.redraw()))},dragLeave(t,i){null!=i&&(i.style=this.previousStyle,s(i,!1),i.shape.apply(i),i.shape.redraw(),null!=i.text&&(i.text.apply(i),i.text.redraw()))}})}setupGraphStyles(){this.graph.collapseToPreferredSize=!1,this.graph.constrainChildren=!1,this.graph.cellsSelectable=!1,this.graph.extendParentsOnAdd=!1,this.graph.extendParents=!0,this.graph.border=10;const t=this.graph.getStylesheet().getDefaultEdgeStyle();t[window.mxConstants.STYLE_EDGE]=window.mxEdgeStyle.EntityRelation,t[window.mxConstants.STYLE_STROKECOLOR]="#c8c7c7",t[window.mxConstants.STYLE_STROKEWIDTH]="2",t[window.mxConstants.STYLE_ROUNDED]=!0,this.graph.getStylesheet().getDefaultVertexStyle()[window.mxConstants.STYLE_FONTSIZE]="16";const i=[];i[window.mxConstants.STYLE_FILLCOLOR]="#e5e5e5",i[window.mxConstants.STYLE_SWIMLANE_FILLCOLOR]="#e5e5e5",i[window.mxConstants.STYLE_SWIMLANE_LINE]="0",i[window.mxConstants.STYLE_FONTCOLOR]="#000000",i[window.mxConstants.STYLE_STROKECOLOR]="#c8c7c7",i[window.mxConstants.STYLE_FONTSIZE]="16",i[window.mxConstants.STYLE_SHAPE]="swimlane",i[window.mxConstants.STYLE_STARTSIZE]=30,i[window.mxConstants.STYLE_ROUNDED]=!0,i[window.mxConstants.STYLE_FOLDABLE]=!1,i[window.mxConstants.STYLE_FONTSTYLE]=window.mxConstants.FONT_BOLD,this.graph.getStylesheet().putCellStyle("column",i);const s=Object.assign({},i);s[window.mxConstants.STYLE_STROKECOLOR]="#454545",this.graph.getStylesheet().putCellStyle("columnSelection",s);const n=[];n[window.mxConstants.STYLE_FOLDABLE]=!1,n[window.mxConstants.STYLE_FONTCOLOR]="#000000",n[window.mxConstants.STYLE_FILLCOLOR]="#ffffff",n[window.mxConstants.STYLE_SWIMLANE_FILLCOLOR]="#fff",n[window.mxConstants.STYLE_FONTSTYLE]=window.mxConstants.FONT_BOLD,n[window.mxConstants.STYLE_STROKECOLOR]="#fff",n[window.mxConstants.STYLE_SHAPE]="swimlane",n[window.mxConstants.STYLE_ROUNDED]=!0,this.styleWhiteColumnGroup=n,this.graph.getStylesheet().putCellStyle("whiteColumn",n);const e=[];e[window.mxConstants.STYLE_SHAPE]=window.mxConstants.SHAPE_RECTANGLE,e[window.mxConstants.STYLE_ROUNDED]=!0,e[window.mxConstants.STYLE_FILLCOLOR]="#6fb4d3",e[window.mxConstants.STYLE_FONTCOLOR]="#232323",e[window.mxConstants.STYLE_STROKECOLOR]="#6fb4d3",this.graph.getStylesheet().putCellStyle("property",e);const o=[];o[window.mxConstants.STYLE_SHAPE]=window.mxConstants.SHAPE_RECTANGLE,o[window.mxConstants.STYLE_ROUNDED]=!0,o[window.mxConstants.STYLE_FILLCOLOR]="#f9bb43",o[window.mxConstants.STYLE_FONTCOLOR]="#232323",o[window.mxConstants.STYLE_STROKECOLOR]="#f9bb43",this.graph.getStylesheet().putCellStyle("method",o)}get graphElement(){return n(this)}static get style(){return"py-graph{width:100%;height:100%;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}py-graph svg text:hover{cursor:default}.container{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;height:100%}.block-class{background:#e5e5e5;border:1px solid #c8c7c7;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;padding:12px 15px;border-radius:10px;margin:30px}.block-class.central{border-color:#707070;border-width:2px}.block-class:hover{border-color:#707070}.block-class_group{background:#fff;border-radius:6px;margin-bottom:10px;width:100%}.block-class_group .container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;padding:10px}.block-class_group .title{font-weight:700;margin-bottom:10px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.block-class_group .title ion-icon{margin-right:5px;font-size:20px}.block-class_title{font-weight:700;font-size:18px;width:100%;text-align:center}.block-class_title.has-child{margin-bottom:10px}.method{background:#f9bb43;border:1px solid #f9bb43}.method:hover{border-color:#a77e2e}.property{background:#6fb4d3;border:1px solid #6fb4d3}.property:hover{border-color:#4e7f96}.method,.property{padding:4px 8px;border-radius:6px;margin:3px 0;color:#232323;cursor:default}.inner-relations,.outer-relations{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}"}};export{e as py_codeblock,o as py_graph};