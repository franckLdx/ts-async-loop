import type { MakeAsyncLoopOptions } from "./declarations";
export type { MakeAsyncLoopOptions } from "./declarations";

type InternalOptions = MakeAsyncLoopOptions & Required<Pick<MakeAsyncLoopOptions, "maxExecution" | "waitingDuration">>

const defaultOptions: InternalOptions = {
  waitingDuration: 100,
  maxExecution: 1,
} as const

const wait = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));

export const makeAsyncLoop = <RETURN_TYPE>(
  callback: (...parameters: any[]) => Promise<RETURN_TYPE>,
  options?: MakeAsyncLoopOptions): (...parameters: any[]) => Promise<RETURN_TYPE[]> => {
  const actualOptions: InternalOptions = {
    ...defaultOptions,
    ...options
  }

  let currentExecutionCount = 0

  const execute = async (currentParameters: any): Promise<RETURN_TYPE> => {
    while (currentExecutionCount === actualOptions.maxExecution) {
      await wait(actualOptions.waitingDuration)
    }
    currentExecutionCount++

    const multiple = Array.isArray(currentParameters)
    const result = multiple ? await callback(...currentParameters) : await callback(currentParameters)

    currentExecutionCount--

    return result
  }

  return async (...parameters: any[]) => await Promise.all(parameters.map(execute))
}