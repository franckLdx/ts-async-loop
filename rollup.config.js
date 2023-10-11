import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json' assert { type: "json" };
import { dts } from "rollup-plugin-dts";

const input = 'src/asyncLoop.ts'

export default [
  {
    input,
    output: {
      name: pkg.name,
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
      { file: pkg.main, format: 'es' }
    ]
  },
  {
    input: "./src/asyncLoop.ts",
    output: [{ file: pkg.types, format: "es" }],
    plugins: [dts()],
  },
];