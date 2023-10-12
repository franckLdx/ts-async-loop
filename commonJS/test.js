const { makeAsyncLoop } = require('ts-async-loop')

const asyncFunc = (p1) => {
  console.log(`${p1} >>>>>`);
  return new Promise((resolve) => {
    console.log(`${p1} <<<<<`);
    resolve(`done ${p1}`)
  })
}

makeAsyncLoop(
  asyncFunc
)([]).then(console.log)

// makeAsyncLoop(
//   () => Promise.resolve('yes'), { maxExecution: 2 }
// )([], []).then(console.log)

// makeAsyncLoop(
//   () => Promise.resolve('yes'), { maxExecution: 2 }
// )([], [], []).then(console.log)