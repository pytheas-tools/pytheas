import { EventEmitter } from '../../stencil.core';
declare global {
    interface Window {
        mxGraph: any;
        mxConstants: any;
        mxEdgeStyle: any;
        mxHierarchicalLayout: any;
        mxStackLayout: any;
        mxEvent: any;
        mxUtils: any;
        mxLoadResources: any;
        mxBasePath: any;
    }
}
export declare class Graph {
    data: any;
    mxclientPath: string;
    graphElement: HTMLElement;
    graphElementSelected: EventEmitter;
    graphSubElementSelected: EventEmitter;
    graph: any;
    styleWhiteColumnGroup: any;
    componentWillLoad(): void;
    componentDidLoad(): void;
    injectGraphDependency(): Promise<unknown>;
    bootstrapGraph(): Promise<void>;
    componentDidUnload(): void;
    render(): any;
    buildGraphBlocks(): void;
    buildMainGraphBlock(element: any, mainSelection?: any): any;
    layoutHierarchicalGraph: (objects: any) => void;
    layoutColumn: (object: any) => void;
    setupHoverCells(): void;
    setupGraphStyles(): void;
}
