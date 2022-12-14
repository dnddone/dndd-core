const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const analyzer = require('rollup-plugin-analyzer');
const sourcemaps = require('rollup-plugin-sourcemaps');
const alias = require('@rollup/plugin-alias');
const remove = require('rollup-plugin-delete');
const { terser } = require('rollup-plugin-terser');
const { visualizer } = require('rollup-plugin-visualizer');

module.exports = {
  input: ['src/index.js'],
  output: {
    exports: 'auto',
    preserveModules: true,
    preserveModulesRoot: 'src',
    dir: 'dist',
    format: 'esm',
  },
  external: [/@babel\/runtime/],
  plugins: [
    remove({ targets: 'dist/*' }),
    alias({
      entries: [
        { find: '@constants', replacement: '../src/constants' },
        { find: '@utils', replacement: '../src/utils' },
      ],
    }),
    nodeResolve({
      moduleDirectories: ['node_modules'],
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
    }),
    analyzer({
      summaryOnly: true,
      limit: 20,
    }),
    visualizer({
      filename: './stats.html',
    }),
    process.env.NODE_ENV === 'development' ? sourcemaps() : terser(),
  ],
};
