const { wait } = require('ts-retry')

exports.asyncFunc = async (p1) => {
  await wait(Math.floor(Math.random() * 10000) + 1000)
  return `done ${p1}`
}

exports.onStart = ({ index, params, currentExecutionCount }) => console.log(`Start execution ${index}, with params ${params} (current number of tasks: ${currentExecutionCount}).`)

exports.onStop = ({ index, currentExecutionCount }) => console.log(`Execution ${index} is done(current number of tasks: ${currentExecutionCount}).`)
