/**
* This is an autogenerated file created by the Stencil compiler.
* It contains typing information for all components that exist in this project.
*/
/* tslint:disable */

import '@stencil/core';


import {
  OverviewData,
} from './components/graph-overview/overview-data';


export namespace Components {

  interface PyGraphOverview {
    'data': OverviewData;
  }
  interface PyGraphOverviewAttributes extends StencilHTMLAttributes {
    'data'?: OverviewData;
  }

  interface PyNavigationBar {
    'current': string;
  }
  interface PyNavigationBarAttributes extends StencilHTMLAttributes {
    'current'?: string;
    'onBackEvent'?: (event: CustomEvent) => void;
    'onHomeEvent'?: (event: CustomEvent) => void;
    'onNextEvent'?: (event: CustomEvent) => void;
  }
}

declare global {
  interface StencilElementInterfaces {
    'PyGraphOverview': Components.PyGraphOverview;
    'PyNavigationBar': Components.PyNavigationBar;
  }

  interface StencilIntrinsicElements {
    'py-graph-overview': Components.PyGraphOverviewAttributes;
    'py-navigation-bar': Components.PyNavigationBarAttributes;
  }


  interface HTMLPyGraphOverviewElement extends Components.PyGraphOverview, HTMLStencilElement {}
  var HTMLPyGraphOverviewElement: {
    prototype: HTMLPyGraphOverviewElement;
    new (): HTMLPyGraphOverviewElement;
  };

  interface HTMLPyNavigationBarElement extends Components.PyNavigationBar, HTMLStencilElement {}
  var HTMLPyNavigationBarElement: {
    prototype: HTMLPyNavigationBarElement;
    new (): HTMLPyNavigationBarElement;
  };

  interface HTMLElementTagNameMap {
    'py-graph-overview': HTMLPyGraphOverviewElement
    'py-navigation-bar': HTMLPyNavigationBarElement
  }

  interface ElementTagNameMap {
    'py-graph-overview': HTMLPyGraphOverviewElement;
    'py-navigation-bar': HTMLPyNavigationBarElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
