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
    console.log("active count: ", activeCount);

    const multiple = Array.isArray(currentParameters)
    const result = await multiple ? callback(...currentParameters) : callback(currentParameters)

    activeCount--
    return result
  }

  return async (...parameters: any[]) => await Promise.all(parameters.map(execute))
}

// const foo1 = async (p1: number): Promise<number> => {
//   console.log("Start ", p1);
//   await wait(5000)
//   console.log("Done ", p1);
//   return p1 * 2
// }

const foo2 = async (p1: number, p2: number): Promise<number> => {
  console.log("Start ", p1);
  await wait(5000)
  console.log("Done ", p1);
  return p1 + p2
}

// const loop1 = makeAsyncForLoop({
//   callback: foo1,
//   maxExecution: 2,
//   waitingDuration: 100
// })

const loop2 = makeAsyncLoop(
  foo2,
  // {
  //   maxExecution: 2,
  //   waitingDuration: 100
  // }
)


// Promise.all(loop1(2, 3, 6, 1)).then(console.log)
loop2([2, 1], [3, 4], [6, 1]).then(console.log)