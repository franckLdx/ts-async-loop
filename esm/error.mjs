import { makeAsyncLoop, isAsynLoopError } from "ts-async-loop"

const asyncFunc = async (p1, p2) => {
  const result = p1 / p2
  if (result === Infinity) {
    throw new Error('Div by zero !')
  }
  return `= ${result}`
}

const div = async () => {
  const asyncLoop = makeAsyncLoop(asyncFunc, { maxExecution: 2 })
  try {
    await asyncLoop([2, 4], [6, 3], [10, 0])
  } catch (error) {
    if (isAsynLoopError(error)) {
      console.error(`Error from Async loop: \n\tmessage:${error.error} \n\tname:${error.name} \n\tcurrentExecutionCount${error.currentExecutionCount} \n\tindex${error.index} \n\tparams${error.params}`)
      console.error(error.error.stack)
    } else {
      throw error
    }
  }

}

div()