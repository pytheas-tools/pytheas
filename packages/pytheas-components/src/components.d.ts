/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  OverviewData,
} from './components/graph-overview/overview-data';

export namespace Components {
  interface PyCodeblock {
    'code': string;
    'codeMirrorEditor': any;
    'codemirrorPath': string;
    'filename': string;
    'highlight': (range: any) => Promise<void>;
    'highlights': (ranges: any) => Promise<void>;
    'language': string;
    'theme': string;
    'unHighlight': () => Promise<void>;
    'updateTheme': (theme: string) => Promise<void>;
  }
  interface PyGraph {
    'data': any;
    'mxclientPath': string;
  }
  interface PyGraphOverview {
    'data': OverviewData;
    'selectType': (ev: any, notify: any) => Promise<void>;
  }
  interface PyNavigationBar {
    'backDisabled': boolean;
    'current': string;
    'nextDisabled': boolean;
  }
}

declare global {


  interface HTMLPyCodeblockElement extends Components.PyCodeblock, HTMLStencilElement {}
  var HTMLPyCodeblockElement: {
    prototype: HTMLPyCodeblockElement;
    new (): HTMLPyCodeblockElement;
  };

  interface HTMLPyGraphElement extends Components.PyGraph, HTMLStencilElement {}
  var HTMLPyGraphElement: {
    prototype: HTMLPyGraphElement;
    new (): HTMLPyGraphElement;
  };

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
    'py-codeblock': HTMLPyCodeblockElement;
    'py-graph': HTMLPyGraphElement;
    'py-graph-overview': HTMLPyGraphOverviewElement;
    'py-navigation-bar': HTMLPyNavigationBarElement;
  }
}

declare namespace LocalJSX {
  interface PyCodeblock {
    'code'?: string;
    'codeMirrorEditor'?: any;
    'codemirrorPath'?: string;
    'filename'?: string;
    'language'?: string;
    'onCodeblockMaximized'?: (event: CustomEvent<any>) => void;
    'onCodeblockUnmaximized'?: (event: CustomEvent<any>) => void;
    'onTokenHovered'?: (event: CustomEvent<any>) => void;
    'theme'?: string;
  }
  interface PyGraph {
    'data'?: any;
    'mxclientPath'?: string;
    'onGraphElementSelected'?: (event: CustomEvent<any>) => void;
    'onGraphSubElementSelected'?: (event: CustomEvent<any>) => void;
  }
  interface PyGraphOverview {
    'data'?: OverviewData;
    'onGraphElementSelected'?: (event: CustomEvent<any>) => void;
    'onGraphOverviewDetailSelected'?: (event: CustomEvent<any>) => void;
  }
  interface PyNavigationBar {
    'backDisabled'?: boolean;
    'current'?: string;
    'nextDisabled'?: boolean;
    'onNavigationBarBackEvent'?: (event: CustomEvent<any>) => void;
    'onNavigationBarHomeEvent'?: (event: CustomEvent<any>) => void;
    'onNavigationBarNextEvent'?: (event: CustomEvent<any>) => void;
  }

  interface IntrinsicElements {
    'py-codeblock': PyCodeblock;
    'py-graph': PyGraph;
    'py-graph-overview': PyGraphOverview;
    'py-navigation-bar': PyNavigationBar;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'py-codeblock': LocalJSX.PyCodeblock & JSXBase.HTMLAttributes<HTMLPyCodeblockElement>;
      'py-graph': LocalJSX.PyGraph & JSXBase.HTMLAttributes<HTMLPyGraphElement>;
      'py-graph-overview': LocalJSX.PyGraphOverview & JSXBase.HTMLAttributes<HTMLPyGraphOverviewElement>;
      'py-navigation-bar': LocalJSX.PyNavigationBar & JSXBase.HTMLAttributes<HTMLPyNavigationBarElement>;
    }
  }
}


