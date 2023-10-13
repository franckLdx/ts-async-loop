const { makeAsyncLoop, wait } = require('ts-async-loop')

const asyncFunc = (p1) => {
  return new Promise(async (resolve) => {
    await wait(Math.floor(Math.random() * 10000))
    resolve(`done ${p1}`)
  })
}

makeAsyncLoop(
  asyncFunc, { maxExecution: 2 }
)([1], [2], [3], [4], [5]).then(console.log)


