import { wait } from 'ts-async-loop'

export const asyncFunc = async (p1) => {
  console.log(`Start ${p1}`)
  await wait(Math.floor(Math.random() * 10000) + 1000)
  return `done ${p1}`
}

export const onStart = (...param) => console.log(`Start: ${JSON.stringify(param)}`)

export const onStop = (...param) => console.log(`Stop: ${JSON.stringify(param)}`)
