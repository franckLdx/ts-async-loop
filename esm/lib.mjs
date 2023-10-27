import { wait } from 'ts-retry'

export const asyncFunc = async (p1) => {
  console.log(`Start ${p1}`)
  await wait(Math.floor(Math.random() * 10000) + 1000)
  return `done ${p1}`
}

export const onStart = ({ index, params, currentExecutionCount }) =>
  console.log(`Start execution ${index}, with params ${params} (current number of tasks: ${currentExecutionCount}).`)

export const onStop = ({ index, currentExecutionCount, result }) =>
  console.log(`Execution ${index} is done with the result: ${result} (current number of tasks: ${currentExecutionCount}).`)
