import { makeAsyncLoop, wait } from 'ts-async-loop'
import { asyncFunc, onStart, onStop } from './lib'

const asyncLoop = makeAsyncLoop(
  asyncFunc, { onStart, onStop }
)

asyncLoop([1], [2], [3], [4], [5]).then(console.log)