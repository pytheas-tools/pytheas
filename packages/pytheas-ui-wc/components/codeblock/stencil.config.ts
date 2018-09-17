import { Config } from '@stencil/core';

export const config: Config = {
    namespace: 'pytheas',
    srcDir: './components/src',
    outputTargets: [
        {
            type: 'dist',
            dir: 'compo1'
        }
    ]
};
