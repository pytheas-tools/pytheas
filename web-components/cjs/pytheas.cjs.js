'use strict';

const core = require('./core-8348f6a8.js');

core.patchBrowser().then(options => {
  return core.bootstrapLazy([["py-codeblock_2.cjs",[[0,"py-codeblock",{"code":[1],"filename":[1],"theme":[1],"language":[1],"codemirrorPath":[1,"codemirror-path"],"codeMirrorEditor":[1032,"code-mirror-editor"],"updateTheme":[64],"highlight":[64],"highlights":[64],"unHighlight":[64]}],[0,"py-graph",{"data":[8],"mxclientPath":[1,"mxclient-path"]}]]],["py-graph-overview.cjs",[[0,"py-graph-overview",{"data":[16],"inDetailList":[32],"selectType":[64]}]]],["py-navigation-bar.cjs",[[0,"py-navigation-bar",{"current":[1],"nextDisabled":[4,"next-disabled"],"backDisabled":[4,"back-disabled"]}]]]], options);
});
