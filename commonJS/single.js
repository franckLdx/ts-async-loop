const { makeAsyncLoop, wait } = require('ts-async-loop')

const asyncFunc = async (p1) => {
  console.log(`Start ${p1}`)
  await wait(Math.floor(Math.random() * 10000) + 1000)
  return `done ${p1}`
}

makeAsyncLoop(
  asyncFunc,
  {
    onStart: (...param) => console.log(`Start: ${JSON.stringify(param)}`),
    onStop: (...param) => console.log(`Stop: ${JSON.stringify(param)}`)
  }
)([1], [2], [3], [4], [5]).then(console.log)
