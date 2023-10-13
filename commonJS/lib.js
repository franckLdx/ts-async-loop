const { wait } = require('ts-async-loop')

exports.asyncFunc = async (p1) => {
  console.log(`Start ${p1}`)
  await wait(Math.floor(Math.random() * 10000) + 1000)
  return `done ${p1}`
}

exports.onStart = (...param) => console.log(`Start: ${JSON.stringify(param)}`)

exports.onStop = (...param) => console.log(`Stop: ${JSON.stringify(param)}`)
