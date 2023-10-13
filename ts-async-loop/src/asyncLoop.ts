import { AsyncLoopProgressionCallback, MakeAsyncLoopOptions } from "./declarations";

type InternalOptions = MakeAsyncLoopOptions & Required<Pick<MakeAsyncLoopOptions, "maxExecution" | "waitingDuration">>

export const defaultOptions: InternalOptions = {
  waitingDuration: 100,
  maxExecution: 1,
} as const

export const wait = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));

export const makeAsyncLoop = <RETURN_TYPE>(
  callback: (...parameters: any[]) => Promise<RETURN_TYPE>,
  options?: MakeAsyncLoopOptions): (...parameters: any[]) => Promise<RETURN_TYPE[]> => {
  const actualOptions: InternalOptions = {
    ...defaultOptions,
    ...options
  }

  let currentExecutionCount = 0

  const onProgress = (index: number, params: any, callback?: AsyncLoopProgressionCallback) => {
    if (!callback) {
      return
    }
    callback({
      currentExecutionCount,
      index,
      params
    })
  }

  const execute = async (currentParameters: any, index: number): Promise<RETURN_TYPE> => {
    while (currentExecutionCount === actualOptions.maxExecution) {
      await wait(actualOptions.waitingDuration)
    }
    currentExecutionCount++

    onProgress(index, currentParameters, actualOptions.onStart)

    const multiple = Array.isArray(currentParameters)
    const result = multiple ? await callback(...currentParameters) : await callback(currentParameters)

    currentExecutionCount--

    onProgress(index, currentParameters, actualOptions.onStop)

    return result
  }

  return async (...parameters: any[]) => await Promise.all(parameters.map(execute))
}