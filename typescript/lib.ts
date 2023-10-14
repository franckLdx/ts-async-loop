import { wait } from 'ts-retry'

export const asyncFunc = async (p1: number) => {
  console.log(`Start ${p1}`)
  await wait(Math.floor(Math.random() * 10000) + 500)
  return `done ${p1}`
}

export const onStart = (...param: any[]) => console.log(`Start: ${JSON.stringify(param)}`)

export const onStop = (...param: any[]) => console.log(`Stop: ${JSON.stringify(param)}`)
