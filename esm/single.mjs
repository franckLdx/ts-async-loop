import { makeAsyncLoop, wait } from 'ts-async-loop'
import { asyncFunc } from './lib.mjs'

makeAsyncLoop(
  asyncFunc
)([1], [2], [3], [4], [5]).then(console.log)