const { wait } = require('ts-retry')

exports.asyncFunc = async (p1) => {
  await wait(Math.floor(Math.random() * 10000) + 1000)
  return `done ${p1}`
}

exports.onStart = ({ index, params, currentExecutionCount }) =>
  console.log(`Start execution ${index}, with params ${params} (current number of tasks: ${currentExecutionCount}).`)

exports.onStop = ({ index, currentExecutionCount, result }) =>
  console.log(`Execution ${index} is done with the result: ${result} (current number of tasks: ${currentExecutionCount}).`)
