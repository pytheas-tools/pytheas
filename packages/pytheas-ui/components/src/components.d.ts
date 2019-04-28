/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';


import {
  OverviewData,
} from './components/graph-overview/overview-data';


export namespace Components {

  interface PyCodeblock {
    'code': string;
    'codeMirrorEditor': any;
    'codemirrorPath': string;
    'filename': string;
    'highlight': (range: any) => void;
    'language': string;
    'theme': string;
    'updateTheme': (theme: string) => void;
  }
  interface PyCodeblockAttributes extends StencilHTMLAttributes {
    'code'?: string;
    'codeMirrorEditor'?: any;
    'codemirrorPath'?: string;
    'filename'?: string;
    'language'?: string;
    'onCodeblockMaximized'?: (event: CustomEvent) => void;
    'onCodeblockUnmaximized'?: (event: CustomEvent) => void;
    'onTokenHovered'?: (event: CustomEvent) => void;
    'theme'?: string;
  }

  interface PyGraphOverview {
    'data': OverviewData;
    'selectType': (ev: any, notify: any) => void;
  }
  interface PyGraphOverviewAttributes extends StencilHTMLAttributes {
    'data'?: OverviewData;
    'onGraphElementSelected'?: (event: CustomEvent) => void;
    'onGraphOverviewDetailSelected'?: (event: CustomEvent) => void;
  }

  interface PyGraph {
    'data': any;
  }
  interface PyGraphAttributes extends StencilHTMLAttributes {
    'data'?: any;
    'onGraphElementSelected'?: (event: CustomEvent) => void;
  }

  interface PyNavigationBar {
    'backDisabled': boolean;
    'current': string;
    'nextDisabled': boolean;
  }
  interface PyNavigationBarAttributes extends StencilHTMLAttributes {
    'backDisabled'?: boolean;
    'current'?: string;
    'nextDisabled'?: boolean;
    'onNavigationBarBackEvent'?: (event: CustomEvent) => void;
    'onNavigationBarHomeEvent'?: (event: CustomEvent) => void;
    'onNavigationBarNextEvent'?: (event: CustomEvent) => void;
  }
}

declare global {
  interface StencilElementInterfaces {
    'PyCodeblock': Components.PyCodeblock;
    'PyGraphOverview': Components.PyGraphOverview;
    'PyGraph': Components.PyGraph;
    'PyNavigationBar': Components.PyNavigationBar;
  }

  interface StencilIntrinsicElements {
    'py-codeblock': Components.PyCodeblockAttributes;
    'py-graph-overview': Components.PyGraphOverviewAttributes;
    'py-graph': Components.PyGraphAttributes;
    'py-navigation-bar': Components.PyNavigationBarAttributes;
  }


  interface HTMLPyCodeblockElement extends Components.PyCodeblock, HTMLStencilElement {}
  var HTMLPyCodeblockElement: {
    prototype: HTMLPyCodeblockElement;
    new (): HTMLPyCodeblockElement;
  };

  interface HTMLPyGraphOverviewElement extends Components.PyGraphOverview, HTMLStencilElement {}
  var HTMLPyGraphOverviewElement: {
    prototype: HTMLPyGraphOverviewElement;
    new (): HTMLPyGraphOverviewElement;
  };

  interface HTMLPyGraphElement extends Components.PyGraph, HTMLStencilElement {}
  var HTMLPyGraphElement: {
    prototype: HTMLPyGraphElement;
    new (): HTMLPyGraphElement;
  };

  interface HTMLPyNavigationBarElement extends Components.PyNavigationBar, HTMLStencilElement {}
  var HTMLPyNavigationBarElement: {
    prototype: HTMLPyNavigationBarElement;
    new (): HTMLPyNavigationBarElement;
  };

  interface HTMLElementTagNameMap {
    'py-codeblock': HTMLPyCodeblockElement
    'py-graph-overview': HTMLPyGraphOverviewElement
    'py-graph': HTMLPyGraphElement
    'py-navigation-bar': HTMLPyNavigationBarElement
  }

  interface ElementTagNameMap {
    'py-codeblock': HTMLPyCodeblockElement;
    'py-graph-overview': HTMLPyGraphOverviewElement;
    'py-graph': HTMLPyGraphElement;
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
