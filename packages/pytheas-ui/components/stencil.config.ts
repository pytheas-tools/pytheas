import { Config } from '@stencil/core';

import { sass } from '@stencil/sass';

import { stripDebug } from 'stencil-strip-debug';

const PLUGINS = [sass()];

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    PLUGINS.push(stripDebug());
}

export const config: Config = {
    namespace: 'pytheas',
    minifyJs: true,
    minifyCss: true,
    outputTargets: [
        {
            type: 'dist'
        },
        {
            type: 'www',
            serviceWorker: null
        }
    ],
    enableCache: false,
    plugins: PLUGINS,
    copy: [
        {
            src: 'libs'
        }
    ]
};
