import { AsyncLoopProgressionOnStart, AsyncLoopProgressionOnStop } from 'ts-async-loop'
import { wait } from 'ts-retry'

export const asyncFunc = async (p1: number) => {
  await wait(Math.floor(Math.random() * 10000) + 500)
  return `done ${p1}`
}

export const onStart: AsyncLoopProgressionOnStart = ({ index, params, currentExecutionCount }) =>
  console.log(`Start execution ${index}, with params ${params} (current number of tasks: ${currentExecutionCount}).`)

export const onStop: AsyncLoopProgressionOnStop<string> = ({ index, currentExecutionCount, result }) =>
  console.log(`Execution ${index} is done with the result: ${result} (current number of tasks: ${currentExecutionCount}).`)

