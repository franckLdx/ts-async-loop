import { wait } from 'ts-retry'

export const asyncFunc = async (p1: number): Promise<string> => {
  console.log(`Start ${p1}`)
  await wait(Math.floor(Math.random() * 10000) + 500)
  console.log(`Stop ${p1}`)
  return `done ${p1}`
}
