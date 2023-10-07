import { makeAsyncLoop, wait } from "./asyncLoop";

describe('Asynchronous loop', () => {
  it('lopp with a single parameter', async () => {
    const double = async (parameter: number): Promise<number> => {
      console.log("Start ", parameter);
      await wait(5000)
      console.log("Done ", parameter);
      return parameter * 2
    }

    const loop = makeAsyncLoop(
      double,
      {
        maxExecution: 1,
        waitingDuration: 100
      }
    )

    await loop([1], [2], [3])
  })

  it('lopp with a single parameter', async () => {
    const double = async (p1: string, p2: number): Promise<string> => {
      console.log("Start ", p1);
      await wait(5000)
      console.log("Done ", p1);
      return `${p1}${p2}`
    }

    const loop = makeAsyncLoop(
      double,
      {
        maxExecution: 1,
        waitingDuration: 100
      }
    )

    await loop([1], [2], [3])
  })
})

