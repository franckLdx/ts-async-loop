const { makeAsyncLoop } = require('ts-async-loop')
const { asyncFuncTwoParams, onStart, onStop } = require('./lib')


const asyncLoop = makeAsyncLoop(
  asyncFuncTwoParams,
  { maxExecution: 2, onStart, onStop }
)

asyncLoop([1, 2], [2, 'foo'], [3, 'bar'], [4, '4'], [5, 42]).then(console.log)