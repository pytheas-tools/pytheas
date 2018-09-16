import rollupTypescript from 'rollup-plugin-typescript';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    entry: './app/app.ts',
    dest: './.tmp/scripts/app.js',
    format: 'cjs',
    plugins: [
        rollupTypescript({
            typescript: require('typescript')
        }),
        nodeResolve({
            jsnext: true,
            main: true
        }),
        babel({
            exclude: 'node_modules/**',
            presets: 'es2015-rollup'
        })
    ]
};
