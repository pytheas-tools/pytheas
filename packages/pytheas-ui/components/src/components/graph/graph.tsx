import { Component, Element, Event, EventEmitter, Prop } from '@stencil/core';

declare global {
    interface Window {
        mxGraph: any;
        mxConstants: any;
        mxEdgeStyle: any;
        mxHierarchicalLayout: any;
        mxStackLayout: any;
        mxEvent: any;
    }
}

const MARGIN_CELL = 20;

@Component({
    tag: 'py-graph',
    styleUrl: 'graph.scss'
})
export class Graph {
    @Prop()
    data: any;

    @Element()
    graphElement: HTMLElement;

    @Event()
    graphElementSelected: EventEmitter;

    graph;

    componentWillLoad() {
        console.log('Graph is about to be rendered..: ', this.data);
    }

    componentDidLoad() {
        console.log('Graph is rendered : ', this);
        this.graph = new window.mxGraph(this.graphElement.querySelector('#graphContainer'));
        console.log(this.graph);
        this.setupGraphStyles();

        this.graph.addListener(window.mxEvent.CLICK, (_sender, evt) => {
            const cell = evt.getProperty('cell');

            if (cell != null && cell.pytheasElement) {
                console.log('click: ', cell);
                this.graphElementSelected.emit(cell.pytheasElement);
            }
        });

        this.graph.getModel().beginUpdate();
        try {
            this.buildGraphBlocks();
        } finally {
            this.graph.getModel().endUpdate();
            this.graph.setCellsMovable(false);
        }
    }

    componentDidUnload() {}

    render() {
        return <div id="graphContainer" />;
    }

    buildGraphBlocks() {
        console.log('buildGraphBlocks: ', this.data);
        this.buildMainGraphBlock(this.data);

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

    buildMainGraphBlock(element) {
        const mxGraphVertexElement = this.graph.insertVertex(this.graph.getDefaultParent(), null, element.name, 0, 0, 200, 200, 'column');
        element.mxElement = mxGraphVertexElement;
        mxGraphVertexElement.pytheasElement = element;

        const mxGraphVertexElementGeometry = mxGraphVertexElement.getGeometry();

        if (element.publicElements.length > 0) {
            const mxGraphVertexElementPublic = this.graph.insertVertex(mxGraphVertexElement, null, 'Public', 0, 0, 80, 30, 'public');
            element.mxPublicElement = mxGraphVertexElementPublic;

            const mxGraphVertexElementPublicGeometry = mxGraphVertexElementPublic.getGeometry();

            let maxWidthForElements = 0;
            element.publicElements.forEach(publicElement => {
                const mxGraphVertexElementPublicChild = this.graph.insertVertex(
                    mxGraphVertexElementPublic,
                    null,
                    publicElement.name,
                    0,
                    0,
                    60,
                    30,
                    publicElement.kind
                );
                // Resize it
                const mxGraphVertexElementPublicChildGeometry = mxGraphVertexElementPublicChild.getGeometry();
                const mxGraphVertexElementPublicChildPreferredGeometry = this.graph.getPreferredSizeForCell(mxGraphVertexElementPublicChild);

                if (mxGraphVertexElementPublicChildPreferredGeometry.width > maxWidthForElements) {
                    maxWidthForElements = mxGraphVertexElementPublicChildPreferredGeometry.width;
                }
                mxGraphVertexElementPublicChildGeometry.width = mxGraphVertexElementPublicChildPreferredGeometry.width + MARGIN_CELL;
            });

            // Resize public column
            mxGraphVertexElementPublicGeometry.width = maxWidthForElements + MARGIN_CELL * 2;
            mxGraphVertexElementGeometry.width = mxGraphVertexElementPublicGeometry.width + MARGIN_CELL;
        }

        if (element.privateElements.length > 0) {
            const mxGraphVertexElementPrivate = this.graph.insertVertex(mxGraphVertexElement, null, 'Private', 0, 0, 80, 30, 'public');
            element.mxPrivateElement = mxGraphVertexElementPrivate;

            const mxGraphVertexElementPublicGeometry = mxGraphVertexElementPrivate.getGeometry();

            let maxWidthForElements = 0;
            element.privateElements.forEach(privateElement => {
                const mxGraphVertexElementPublicChild = this.graph.insertVertex(
                    mxGraphVertexElementPrivate,
                    null,
                    privateElement.name,
                    0,
                    0,
                    60,
                    30,
                    privateElement.kind
                );
                // Resize it
                const mxGraphVertexElementPublicChildGeometry = mxGraphVertexElementPublicChild.getGeometry();
                const mxGraphVertexElementPublicChildPreferredGeometry = this.graph.getPreferredSizeForCell(mxGraphVertexElementPublicChild);

                if (mxGraphVertexElementPublicChildPreferredGeometry.width > maxWidthForElements) {
                    maxWidthForElements = mxGraphVertexElementPublicChildPreferredGeometry.width;
                }
                mxGraphVertexElementPublicChildGeometry.width = mxGraphVertexElementPublicChildPreferredGeometry.width + MARGIN_CELL;
            });

            // Resize private column
            mxGraphVertexElementPublicGeometry.width = maxWidthForElements + MARGIN_CELL * 2;
            if (mxGraphVertexElementPublicGeometry.width > mxGraphVertexElementGeometry.width) {
                mxGraphVertexElementGeometry.width = mxGraphVertexElementPublicGeometry.width + MARGIN_CELL;
            }
        }

        return mxGraphVertexElement;
    }

    layoutHierarchicalGraph = objects => {
        const layout = new window.mxHierarchicalLayout(this.graph, window.mxConstants.DIRECTION_WEST);

        this.graph.getModel().beginUpdate();
        try {
            layout.execute(objects);
        } finally {
            this.graph.getModel().endUpdate();
        }
    };

    layoutColumn = object => {
        const layout = new window.mxStackLayout(this.graph, false, 10);
        layout.resizeParent = true;

        layout.marginTop = 10;
        layout.marginRight = 10;
        layout.marginBottom = 10;
        layout.marginLeft = 10;

        this.graph.getModel().beginUpdate();
        try {
            layout.execute(object);
        } finally {
            this.graph.getModel().endUpdate();
        }
    };

    setupGraphStyles() {
        // Disables global features
        this.graph.collapseToPreferredSize = false;
        this.graph.constrainChildren = false;
        this.graph.cellsSelectable = false;
        this.graph.extendParentsOnAdd = false;
        this.graph.extendParents = true;
        this.graph.border = 10;

        const styleEdge = this.graph.getStylesheet().getDefaultEdgeStyle();
        styleEdge[window.mxConstants.STYLE_EDGE] = window.mxEdgeStyle.EntityRelation;
        styleEdge[window.mxConstants.STYLE_STROKECOLOR] = '#c8c7c7';
        styleEdge[window.mxConstants.STYLE_STROKEWIDTH] = '2';
        styleEdge[window.mxConstants.STYLE_ROUNDED] = true;

        const styleCommonCell = this.graph.getStylesheet().getDefaultVertexStyle();
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
        styleColumn[window.mxConstants.STYLE_FONTSTYLE] = window.mxConstants.FONT_BOLD;
        this.graph.getStylesheet().putCellStyle('column', styleColumn);

        const stylePublicGroup = [];
        stylePublicGroup[window.mxConstants.STYLE_FOLDABLE] = false;
        stylePublicGroup[window.mxConstants.STYLE_FONTCOLOR] = '#000000';
        stylePublicGroup[window.mxConstants.STYLE_FILLCOLOR] = '#ffffff';
        stylePublicGroup[window.mxConstants.STYLE_SWIMLANE_FILLCOLOR] = '#fff';
        stylePublicGroup[window.mxConstants.STYLE_FONTSTYLE] = window.mxConstants.FONT_BOLD;
        stylePublicGroup[window.mxConstants.STYLE_STROKECOLOR] = '#fff';
        stylePublicGroup[window.mxConstants.STYLE_SHAPE] = 'swimlane';
        stylePublicGroup[window.mxConstants.STYLE_ROUNDED] = true;
        this.graph.getStylesheet().putCellStyle('public', stylePublicGroup);

        const styleVariable = [];
        styleVariable[window.mxConstants.STYLE_SHAPE] = window.mxConstants.SHAPE_RECTANGLE;
        styleVariable[window.mxConstants.STYLE_ROUNDED] = true;
        styleVariable[window.mxConstants.STYLE_FILLCOLOR] = '#6fb4d3';
        styleVariable[window.mxConstants.STYLE_FONTCOLOR] = '#232323';
        styleVariable[window.mxConstants.STYLE_STROKECOLOR] = '#6fb4d3';
        this.graph.getStylesheet().putCellStyle('property', styleVariable);

        const styleMethod = [];
        styleMethod[window.mxConstants.STYLE_SHAPE] = window.mxConstants.SHAPE_RECTANGLE;
        styleMethod[window.mxConstants.STYLE_ROUNDED] = true;
        styleMethod[window.mxConstants.STYLE_FILLCOLOR] = '#f9bb43';
        styleMethod[window.mxConstants.STYLE_FONTCOLOR] = '#232323';
        styleMethod[window.mxConstants.STYLE_STROKECOLOR] = '#f9bb43';
        this.graph.getStylesheet().putCellStyle('method', styleMethod);
    }
}
