const { makeAsyncLoop, wait } = require('ts-async-loop')

const asyncFunc = async (p1) => {
  await wait(Math.floor(Math.random() * 10000) + 10000)
  return `done ${p1}`
}

makeAsyncLoop(
  asyncFunc
)([1], [2], [3], [4], [5]).then(console.log)
