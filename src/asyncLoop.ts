import { MakeAsyncLoopOptions } from "./declarations";

type InternalOptions = Required<MakeAsyncLoopOptions>

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

  let activeCount = 0

  const execute = async (currentParameters: any): Promise<RETURN_TYPE> => {
    while (activeCount === actualOptions.maxExecution) {
      await wait(actualOptions.waitingDuration)
    }
    activeCount++

    const multiple = Array.isArray(currentParameters)
    const result = await multiple ? callback(...currentParameters) : callback(currentParameters)

    activeCount--
    return result
  }

  return async (...parameters: any[]) => await Promise.all(parameters.map(execute))
}