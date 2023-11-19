import type { MakeAsyncLoopOptions } from "./declarations";
import { AsynLoopError } from "./error";

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

  const executeWhenverPossible = async (currentParameters: any, index: number): Promise<RETURN_TYPE> => {
    while (currentExecutionCount === internalOptions.maxExecution) {
      await wait(internalOptions.waitingDuration)
    }
    currentExecutionCount++

    internalOptions.onStart?.({
      index,
      params: currentParameters,
      currentExecutionCount,
      totalExecutionCount: currentParameters.length
    })

    const multiple = Array.isArray(currentParameters)
    let result;
    try {
      result = multiple ? await callback(...currentParameters) : await callback(currentParameters)
    } catch (error) {
      throw new AsynLoopError(error, index, currentParameters, currentExecutionCount, currentParameters.length)
    }

    currentExecutionCount--

    internalOptions.onStop?.({
      index,
      params: currentParameters,
      currentExecutionCount,
      totalExecutionCount: currentParameters.length,
      result
    })

    return result
  }

  return async (...parameters: any[]) => await Promise.all(parameters.map(executeWhenverPossible))
}