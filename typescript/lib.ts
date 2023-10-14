import { wait } from 'ts-retry'
import type { AsyncLoopProgressionCallback } from 'ts-async-loop'

export const asyncFunc = async (p1: number) => {
  await wait(Math.floor(Math.random() * 10000) + 500)
  return `done ${p1}`
}

export const onStart: AsyncLoopProgressionCallback = params => console.log(`Start: ${JSON.stringify(params)}`)

export const onStop: AsyncLoopProgressionCallback = params => console.log(`Stop: ${JSON.stringify(params)}`)
