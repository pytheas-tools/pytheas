import { EventEmitter } from '../../stencil.core';
export declare class NavigationBar {
    current: string;
    nextDisabled: boolean;
    backDisabled: boolean;
    navigationBarBackEvent: EventEmitter;
    navigationBarHomeEvent: EventEmitter;
    navigationBarNextEvent: EventEmitter;
    back(): void;
    home(): void;
    next(): void;
    render(): any;
}
