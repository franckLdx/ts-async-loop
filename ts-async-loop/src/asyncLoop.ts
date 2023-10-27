import type { MakeAsyncLoopOptions } from "./declarations";

type InternalOptions<RETURN_TYPE> =
  MakeAsyncLoopOptions<RETURN_TYPE> &
  Required<Pick<MakeAsyncLoopOptions<RETURN_TYPE>, "maxExecution" | "waitingDuration">>

const getInternalOptions = <RETURN_TYPE>(options?: MakeAsyncLoopOptions<RETURN_TYPE>): InternalOptions<RETURN_TYPE> => ({
  waitingDuration: 100,
  maxExecution: 1,
  ...options
})

const wait = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));

export const makeAsyncLoop = <RETURN_TYPE>(
  callback: (...parameters: any[]) => Promise<RETURN_TYPE>,
  options?: MakeAsyncLoopOptions<RETURN_TYPE>
): (...parameters: any[]) => Promise<RETURN_TYPE[]> => {

  const internalOptions = getInternalOptions(options)

  let currentExecutionCount = 0

  const execute = async (currentParameters: any, index: number): Promise<RETURN_TYPE> => {
    while (currentExecutionCount === internalOptions.maxExecution) {
      await wait(internalOptions.waitingDuration)
    }
    currentExecutionCount++

    internalOptions.onStart?.({
      currentExecutionCount,
      index,
      params: currentParameters
    })

    const multiple = Array.isArray(currentParameters)
    const result = multiple ? await callback(...currentParameters) : await callback(currentParameters)

    currentExecutionCount--

    internalOptions.onStop?.({
      currentExecutionCount,
      index,
      params: currentParameters,
      result
    })

    return result
  }

  return async (...parameters: any[]) => await Promise.all(parameters.map(execute))
}