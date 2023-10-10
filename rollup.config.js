import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json' assert { type: "json" };;

const input = 'src/asyncLoop.ts'

export default [
  {
    input,
    output: {
      name: 'howLongUntilLunch',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript()]
  },
  {
    input,
    external: [],
    plugins: [
      typescript()
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }
];