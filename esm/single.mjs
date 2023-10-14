import { makeAsyncLoop } from 'ts-async-loop'
import { asyncFunc, onStart, onStop } from './lib.mjs'

const asyncLoop = makeAsyncLoop(
  asyncFunc, { onStart, onStop }
)

asyncLoop([1], [2], [3], [4], [5]).then(console.log)