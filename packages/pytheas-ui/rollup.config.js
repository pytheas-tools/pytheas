import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

const createConfig = (type) => {
    let MAIN_CONFIG = {
        input: './es/app.js',
        output: {
            file: (process.env.NODE_ENV && process.env.NODE_ENV === 'development') ? 'output/scripts/app.js' : 'output/scripts/app_0.js',
            format: 'cjs',
            name: 'App',
            sourcemap: (process.env.NODE_ENV && process.env.NODE_ENV === 'development') ? true : false
        },
        context: 'window',
        plugins: [
            globals(),
            builtins(),
            nodeResolve({
                mainFields: ['module', 'main']
            }),
            commonjs({
                include: 'node_modules/**'
            })
        ]
    };
    if (type === 'es6') {
        MAIN_CONFIG.output.file = (process.env.NODE_ENV && process.env.NODE_ENV === 'development') ? 'output/scripts/app_es6.js' : 'output/scripts/app_es6_0.js';
    }
    return MAIN_CONFIG;
}

const CONFIG = [createConfig('es5'), createConfig('es6')];

export default CONFIG;