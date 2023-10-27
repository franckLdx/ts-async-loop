const { wait } = require('ts-retry')

exports.asyncFuncOneParam = async (p1) => {
  await wait(Math.floor(Math.random() * 10000) + 1000)
  return `done ${p1}`
}

exports.asyncFuncTwoParams = async (p1, p2) => {
  await wait(Math.floor(Math.random() * 10000) + 1000)
  return `done ${p1} whith ${p2}`
}


exports.onStart = ({ index, params, currentExecutionCount }) =>
  console.log(`Start execution ${index}, with params ${params} (current number of tasks: ${currentExecutionCount}).`)

exports.onStop = ({ index, currentExecutionCount, result }) =>
  console.log(`Execution ${index} is done with the result: ${result} (current number of tasks: ${currentExecutionCount}).`)