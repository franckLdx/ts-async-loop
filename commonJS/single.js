const { makeAsyncLoop } = require('ts-async-loop')
const { asyncFunc, onStart, onStop } = require('./lib')

const asyncLoop = makeAsyncLoop(
  asyncFunc,
  { onStart, onStop }
)

asyncLoop([1], [2], [3], [4], [5]).then(console.log)
