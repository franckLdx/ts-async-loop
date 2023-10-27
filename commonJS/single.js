const { makeAsyncLoop } = require('ts-async-loop')
const { asyncFuncOneParam, onStart, onStop } = require('./lib')

const asyncLoop = makeAsyncLoop(
  asyncFuncOneParam,
  { onStart, onStop }
)

asyncLoop([1], [2], [3], [4], [5]).then(console.log)
