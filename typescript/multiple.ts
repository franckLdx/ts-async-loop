import { makeAsyncLoop } from 'ts-async-loop'
import { asyncFunc } from './lib.js'

const asyncLoop = makeAsyncLoop(
  asyncFunc,
  { maxExecution: 2 }
)

asyncLoop([1], [2], [3], [4], [5]).then(console.log)
