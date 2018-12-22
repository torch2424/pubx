import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import bundleSize from 'rollup-plugin-bundle-size';
import pkg from './package.json';

const babelPluginConfig = {
  // so Rollup can convert unsupported es6 code to es5
  exclude: ['node_modules/**'],
  plugins: [
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-proposal-object-rest-spread'],
  ]
};

let plugins = [
  resolve(), // so Rollup can find node modules
  commonjs(),
  json(),
];

export default [
  {
		input: 'src/index.js',
		output: {
			name: 'Pubx',
			file: pkg.browser,
			format: 'umd'
		},
    plugins: [
      ...plugins,
      bundleSize()
    ]
  },
  {
    input: 'src/index.js',
    output: {
      name: 'Pubx',
      file: pkg.module,
      format: 'es'
    },
    plugins: [
      ...plugins,
      bundleSize()
    ]
  },
  {
    input: 'src/index.js',
    output: {
      name: 'Pubx',
      file: pkg.main,
      format: 'cjs'
    },
    plugins: [
      ...plugins,
      bundleSize()
    ]
  },
  {
    input: 'src/index.js',
    output: {
      name: 'Pubx',
      file: 'dist/pubx.iife.min.js',
      format: 'iife'
    },
    plugins: [
      ...plugins,
      babel(babelPluginConfig),
      compiler(),
      bundleSize()
    ]
  }
];
