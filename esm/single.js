import { makeAsyncLoop, wait } from 'ts-async-loop'

const asyncFunc = async (p1) => {
  console.log(`*** ${p1}`);
  await wait(1000 * 60)
  console.log(`*** ${p1}`);
  return `done ${p1}`
}

makeAsyncLoop(
  asyncFunc
)([1], [2], [3], [4], [5]).then(console.log)