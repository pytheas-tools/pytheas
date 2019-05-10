import rollupTypescript from 'rollup-plugin-typescript';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'test/vendors/drag-mock/src/index.ts',
    output: {
        file: 'output/scripts/dragmock.js',
        format: 'umd',
        name: 'dragMock',
        sourcemap: false
    },
    context: 'window',
    plugins: [
        rollupTypescript(),
        nodeResolve({
            mainFields: ['module', 'main']
        }),
        commonjs()
        /*,
                   babel({
                       exclude: 'node_modules/**',
                       presets: 'es2015-rollup'
                   })*/
    ]
};