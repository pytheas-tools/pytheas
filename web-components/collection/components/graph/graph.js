import { h } from "@stencil/core";
const MARGIN_CELL = 20;
export class Graph {
    constructor() {
        this.layoutHierarchicalGraph = objects => {
            const layout = new window.mxHierarchicalLayout(this.graph, window.mxConstants.DIRECTION_WEST);
            this.graph.getModel().beginUpdate();
            try {
                layout.execute(objects);
            }
            finally {
                this.graph.getModel().endUpdate();
            }
        };
        this.layoutColumn = object => {
            const layout = new window.mxStackLayout(this.graph, false, 10);
            layout.resizeParent = true;
            layout.marginTop = 10;
            layout.marginRight = 10;
            layout.marginBottom = 10;
            layout.marginLeft = 10;
            this.graph.getModel().beginUpdate();
            try {
                layout.execute(object);
            }
            finally {
                this.graph.getModel().endUpdate();
            }
        };
    }
    componentWillLoad() {
        console.log('Graph is about to be rendered..: ', this.data, this.mxclientPath);
    }
    componentDidLoad() {
        console.log('Graph is rendered : ', this);
        if (window['mxGraph']) {
            this.bootstrapGraph();
        }
        else {
            this.injectGraphDependency().then(() => {
                this.bootstrapGraph();
            });
        }
    }
    injectGraphDependency() {
        return new Promise((resolveInjection, rejectInjection) => {
            const script = document.createElement('script');
            script.setAttribute('src', this.mxclientPath + '/mxClient.min.js');
            script.setAttribute('type', 'text/javascript');
            script.onload = () => {
                resolveInjection();
            };
            script.onerror = () => {
                rejectInjection();
            };
            // Configure mxClient loading
            window['mxLoadResources'] = false;
            window['mxBasePath'] = this.mxclientPath;
            document.body.appendChild(script);
        });
    }
    async bootstrapGraph() {
        this.graph = new window.mxGraph(this.graphElement.querySelector('#graphContainer'));
        console.log(this.graph);
        this.setupGraphStyles();
        this.setupHoverCells();
        this.graph.addListener(window.mxEvent.CLICK, (_sender, evt) => {
            const cell = evt.getProperty('cell');
            console.log('click: ', cell);
            if (cell && cell.style === 'column') {
                console.log('click main : ', cell);
                this.graphElementSelected.emit(cell.pytheasElement);
            }
            if (cell &&
                (cell.style === 'property' || cell.style === 'method')) {
                console.log('click submain : ', cell);
                this.graphSubElementSelected.emit({
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
    }
    componentDidUnload() { }
    render() {
        return h("div", { id: "graphContainer" });
    }
    buildGraphBlocks() {
        console.log('buildGraphBlocks: ', this.data);
        this.buildMainGraphBlock(this.data, true);
        this.data.relations.forEach(relation => {
            if (relation.type === 'in') {
                const element = this.buildMainGraphBlock(relation.from);
                relation.from.mxElement = element;
                this.graph.insertEdge(this.graph.getDefaultParent(), null, '', element, this.data.mxElement);
            }
            if (relation.type === 'out') {
                const element = this.buildMainGraphBlock(relation.to);
                relation.to.mxElement = element;
                this.graph.insertEdge(this.graph.getDefaultParent(), null, '', this.data.mxElement, element);
            }
        });
        this.layoutHierarchicalGraph(this.graph.getDefaultParent());
        this.layoutColumn(this.data.mxPublicElement);
        this.layoutColumn(this.data.mxPrivateElement);
        this.layoutColumn(this.data.mxElement);
        this.data.relations.forEach(relation => {
            let elementForWork;
            if (relation.type === 'in') {
                elementForWork = relation.from;
            }
            if (relation.type === 'out') {
                elementForWork = relation.to;
            }
            if (elementForWork.publicElements.length > 0) {
                this.layoutColumn(elementForWork.mxPublicElement);
            }
            if (elementForWork.privateElements.length > 0) {
                this.layoutColumn(elementForWork.mxPrivateElement);
            }
            this.layoutColumn(elementForWork.mxElement);
        });
        // Render twice for proper scaling between mxHierarchicalLayout and mxStackLayout
        this.layoutHierarchicalGraph(this.graph.getDefaultParent());
        this.layoutColumn(this.data.mxPublicElement);
        this.layoutColumn(this.data.mxPrivateElement);
        this.layoutColumn(this.data.mxElement);
        this.data.relations.forEach(relation => {
            let elementForWork;
            if (relation.type === 'in') {
                elementForWork = relation.from;
            }
            if (relation.type === 'out') {
                elementForWork = relation.to;
            }
            if (elementForWork.publicElements.length > 0) {
                this.layoutColumn(elementForWork.mxPublicElement);
            }
            if (elementForWork.privateElements.length > 0) {
                this.layoutColumn(elementForWork.mxPrivateElement);
            }
            this.layoutColumn(elementForWork.mxElement);
        });
    }
    buildMainGraphBlock(element, mainSelection) {
        const mxGraphVertexElementStyle = mainSelection
            ? 'columnSelection'
            : 'column';
        const mxGraphVertexElement = this.graph.insertVertex(this.graph.getDefaultParent(), null, element.name, 0, 0, 200, 200, mxGraphVertexElementStyle);
        element.mxElement = mxGraphVertexElement;
        mxGraphVertexElement.pytheasElement = element;
        const mxGraphVertexElementGeometry = mxGraphVertexElement.getGeometry();
        if (element.publicElements.length > 0) {
            const mxGraphVertexElementPublic = this.graph.insertVertex(mxGraphVertexElement, null, 'Public', 0, 0, 80, 30, 'whiteColumn');
            element.mxPublicElement = mxGraphVertexElementPublic;
            const mxGraphVertexElementPublicGeometry = mxGraphVertexElementPublic.getGeometry();
            let maxWidthForElements = 0;
            element.publicElements.forEach(publicElement => {
                const mxGraphVertexElementPublicChild = this.graph.insertVertex(mxGraphVertexElementPublic, null, publicElement.name, 0, 0, 60, 30, publicElement.kind);
                mxGraphVertexElementPublicChild.pytheasElement = element;
                // Resize it
                const mxGraphVertexElementPublicChildGeometry = mxGraphVertexElementPublicChild.getGeometry();
                const mxGraphVertexElementPublicChildPreferredGeometry = this.graph.getPreferredSizeForCell(mxGraphVertexElementPublicChild);
                if (mxGraphVertexElementPublicChildPreferredGeometry.width >
                    maxWidthForElements) {
                    maxWidthForElements =
                        mxGraphVertexElementPublicChildPreferredGeometry.width;
                }
                mxGraphVertexElementPublicChildGeometry.width =
                    mxGraphVertexElementPublicChildPreferredGeometry.width +
                        MARGIN_CELL;
            });
            // Resize public column
            mxGraphVertexElementPublicGeometry.width =
                maxWidthForElements + MARGIN_CELL * 2;
            mxGraphVertexElementGeometry.width =
                mxGraphVertexElementPublicGeometry.width + MARGIN_CELL;
        }
        if (element.privateElements.length > 0) {
            const mxGraphVertexElementPrivate = this.graph.insertVertex(mxGraphVertexElement, null, 'Private', 0, 0, 80, 30, 'whiteColumn');
            element.mxPrivateElement = mxGraphVertexElementPrivate;
            const mxGraphVertexElementPrivateGeometry = mxGraphVertexElementPrivate.getGeometry();
            let maxWidthForElements = 0;
            element.privateElements.forEach(privateElement => {
                const mxGraphVertexElementPrivateChild = this.graph.insertVertex(mxGraphVertexElementPrivate, null, privateElement.name, 0, 0, 60, 30, privateElement.kind);
                mxGraphVertexElementPrivateChild.pytheasElement = element;
                // Resize it
                const mxGraphVertexElementPrivateChildGeometry = mxGraphVertexElementPrivateChild.getGeometry();
                const mxGraphVertexElementPrivateChildPreferredGeometry = this.graph.getPreferredSizeForCell(mxGraphVertexElementPrivateChild);
                if (mxGraphVertexElementPrivateChildPreferredGeometry.width >
                    maxWidthForElements) {
                    maxWidthForElements =
                        mxGraphVertexElementPrivateChildPreferredGeometry.width;
                }
                mxGraphVertexElementPrivateChildGeometry.width =
                    mxGraphVertexElementPrivateChildPreferredGeometry.width +
                        MARGIN_CELL;
            });
            // Resize private column
            mxGraphVertexElementPrivateGeometry.width =
                maxWidthForElements + MARGIN_CELL * 2;
            if (mxGraphVertexElementPrivateGeometry.width >
                mxGraphVertexElementGeometry.width) {
                mxGraphVertexElementGeometry.width =
                    mxGraphVertexElementPrivateGeometry.width + MARGIN_CELL;
            }
        }
        return mxGraphVertexElement;
    }
    setupHoverCells() {
        const mainGraph = this.graph;
        const styleWhiteColumnGroup = this.styleWhiteColumnGroup;
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
            mouseDown(sender, me) {
                if (this.currentState != null) {
                    this.dragLeave(me.getEvent(), this.currentState);
                    this.currentState = null;
                }
            },
            mouseMove(sender, me) {
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
            dragEnter(evt, state) {
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
            dragLeave(evt, state) {
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
    }
    setupGraphStyles() {
        // Disables global features
        this.graph.collapseToPreferredSize = false;
        this.graph.constrainChildren = false;
        this.graph.cellsSelectable = false;
        this.graph.extendParentsOnAdd = false;
        this.graph.extendParents = true;
        this.graph.border = 10;
        const styleEdge = this.graph.getStylesheet().getDefaultEdgeStyle();
        styleEdge[window.mxConstants.STYLE_EDGE] =
            window.mxEdgeStyle.EntityRelation;
        styleEdge[window.mxConstants.STYLE_STROKECOLOR] = '#c8c7c7';
        styleEdge[window.mxConstants.STYLE_STROKEWIDTH] = '2';
        styleEdge[window.mxConstants.STYLE_ROUNDED] = true;
        const styleCommonCell = this.graph
            .getStylesheet()
            .getDefaultVertexStyle();
        styleCommonCell[window.mxConstants.STYLE_FONTSIZE] = '16';
        const styleColumn = [];
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
        const styleColumnSelection = Object.assign({}, styleColumn);
        styleColumnSelection[window.mxConstants.STYLE_STROKECOLOR] = '#454545';
        this.graph
            .getStylesheet()
            .putCellStyle('columnSelection', styleColumnSelection);
        const styleWhiteColumnGroup = [];
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
        const styleVariable = [];
        styleVariable[window.mxConstants.STYLE_SHAPE] =
            window.mxConstants.SHAPE_RECTANGLE;
        styleVariable[window.mxConstants.STYLE_ROUNDED] = true;
        styleVariable[window.mxConstants.STYLE_FILLCOLOR] = '#6fb4d3';
        styleVariable[window.mxConstants.STYLE_FONTCOLOR] = '#232323';
        styleVariable[window.mxConstants.STYLE_STROKECOLOR] = '#6fb4d3';
        this.graph.getStylesheet().putCellStyle('property', styleVariable);
        const styleMethod = [];
        styleMethod[window.mxConstants.STYLE_SHAPE] =
            window.mxConstants.SHAPE_RECTANGLE;
        styleMethod[window.mxConstants.STYLE_ROUNDED] = true;
        styleMethod[window.mxConstants.STYLE_FILLCOLOR] = '#f9bb43';
        styleMethod[window.mxConstants.STYLE_FONTCOLOR] = '#232323';
        styleMethod[window.mxConstants.STYLE_STROKECOLOR] = '#f9bb43';
        this.graph.getStylesheet().putCellStyle('method', styleMethod);
    }
    static get is() { return "py-graph"; }
    static get originalStyleUrls() { return {
        "$": ["graph.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["graph.css"]
    }; }
    static get properties() { return {
        "data": {
            "type": "any",
            "mutable": false,
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
            "attribute": "data",
            "reflect": false
        },
        "mxclientPath": {
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
            "attribute": "mxclient-path",
            "reflect": false
        }
    }; }
    static get events() { return [{
            "method": "graphElementSelected",
            "name": "graphElementSelected",
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
            "method": "graphSubElementSelected",
            "name": "graphSubElementSelected",
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
    static get elementRef() { return "graphElement"; }
}
