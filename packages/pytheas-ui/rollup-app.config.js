import rollupTypescript from 'rollup-plugin-typescript';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default [{
    input: './app/app.ts',
    output: {
        file: (process.env.NODE_ENV && process.env.NODE_ENV === 'development') ? 'output/scripts/app.js' : 'output/scripts/app_0.js',
        format: 'cjs',
        name: 'App',
        sourcemap: (process.env.NODE_ENV && process.env.NODE_ENV === 'development') ? true : false
    },
    context: 'window',
    plugins: [
        rollupTypescript(),
        globals(),
        builtins(),
        nodeResolve({
            jsnext: true,
            main: true
        }),
        commonjs({
            include: 'node_modules/**'
        })
        /*,
        babel({
            exclude: 'node_modules/**',
            presets: 'es2015-rollup'
        })*/
    ]
}];