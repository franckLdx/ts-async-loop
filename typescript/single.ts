import { makeAsyncLoop } from 'ts-async-loop'
import { asyncFunc } from './lib'

const asyncLoop = makeAsyncLoop(
  asyncFunc
)

asyncLoop([1], [2], [3], [4], [5]).then(console.log)