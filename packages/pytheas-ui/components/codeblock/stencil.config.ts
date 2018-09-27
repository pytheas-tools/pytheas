import { Config } from '@stencil/core';

import { sass } from '@stencil/sass';

export const config: Config = {
    namespace: 'pytheas',
    minifyJs: false,
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
    plugins: [sass()]
};
