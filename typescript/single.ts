import { MakeAsyncLoopOptions, makeAsyncLoop } from 'ts-async-loop'
import { asyncFunc, onStart, onStop } from './lib'

const options: MakeAsyncLoopOptions<string> = { onStart, onStop }

const asyncLoop = makeAsyncLoop(
  asyncFunc,
  options
)

asyncLoop([1], [2], [3], [4], [5]).then(console.log)