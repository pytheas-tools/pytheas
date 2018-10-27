import rollupTypescript from 'rollup-plugin-typescript';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [{
    input: './app/app.ts',
    output: {
        file: './.tmp/scripts/app.js',
        format: 'cjs',
        name: 'App',
        sourcemap: false
    },
    context: 'window',
    plugins: [
        rollupTypescript(),
        nodeResolve({
            jsnext: true,
            main: true
        }),
        commonjs()
        /*,
                   babel({
                       exclude: 'node_modules/**',
                       presets: 'es2015-rollup'
                   })*/
    ]
}];