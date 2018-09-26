import { Config } from '@stencil/core';

import { sass } from '@stencil/sass';

export const config: Config = {
    namespace: 'pytheas',
    minifyJs: false,
    outputTargets: [
        {
            type: 'dist'
        }
    ],
    enableCache: false,
    plugins: [sass()]
};
