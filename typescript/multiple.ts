import { MakeAsyncLoopOptions, makeAsyncLoop } from 'ts-async-loop'
import { asyncFunc } from './lib'

const options: MakeAsyncLoopOptions = { maxExecution: 2 }

const asyncLoop = makeAsyncLoop(
  asyncFunc, options
)

asyncLoop([1], [2], [3], [4], [5]).then(console.log)
