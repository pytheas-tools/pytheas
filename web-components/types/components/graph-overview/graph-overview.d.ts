import { EventEmitter } from '../../stencil.core';
import { OverviewData } from './overview-data';
export declare class GraphOverview {
    data: OverviewData;
    dataOrderedByFirstLetter: any;
    inDetailList: boolean;
    selectedType: any;
    selectedElements: any;
    graphOverviewDetailSelected: EventEmitter;
    graphElementSelected: EventEmitter;
    componentWillLoad(): void;
    orderByLetter(els: any): {
        file: {};
        class: {};
    };
    componentDidLoad(): void;
    selectType(ev: any, notify: any): Promise<void>;
    openElement(element: any): void;
    getPluralForType(type: string): string;
    renderListOfElements(elements: any): any[];
    renderInternal(): any;
    render(): any;
}
