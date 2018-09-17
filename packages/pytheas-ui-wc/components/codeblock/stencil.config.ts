import { Config } from '@stencil/core';

export const config: Config = {
    namespace: 'pytheas',
    outputTargets: [
        {
            type: 'dist',
            dir: 'codeblock'
        }
    ]
};
