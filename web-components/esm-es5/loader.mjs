import { a as patchEsm, b as bootstrapLazy } from './core-e9f2a14b.js';
var defineCustomElements = function (win, options) {
    return patchEsm().then(function () {
        bootstrapLazy([["py-codeblock_2", [[0, "py-codeblock", { "code": [1], "filename": [1], "theme": [1], "language": [1], "codemirrorPath": [1, "codemirror-path"], "codeMirrorEditor": [1032, "code-mirror-editor"], "updateTheme": [64], "highlight": [64], "highlights": [64], "unHighlight": [64] }], [0, "py-graph", { "data": [8], "mxclientPath": [1, "mxclient-path"] }]]], ["py-graph-overview", [[0, "py-graph-overview", { "data": [16], "inDetailList": [32], "selectType": [64] }]]], ["py-navigation-bar", [[0, "py-navigation-bar", { "current": [1], "nextDisabled": [4, "next-disabled"], "backDisabled": [4, "back-disabled"] }]]]], options);
    });
};
export { defineCustomElements };
