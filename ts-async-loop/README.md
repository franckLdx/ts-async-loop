# ts-async-loop

A mean to execute for/map loop asynchronously

One can execute async actions one by one, or two by, ar three by three, etc...

Let's say you want to execute a function named **asyncFunc** that takes a string and a number as parameters and return a string.

To call **asyncFunc** once at a time:

```javascript
    const loop = makeAsyncLoop(asyncFunc)
    
    const results = await loop(
      ['A', 1],
      ['B', 2],
      ['C', 3],
    )
```

or, if your parameters are already in an array:

```javascript
    const loop = makeAsyncLoop(asyncFunc)
    
    const results = await loop(...parametersArray)
```

First asyncFunc is called given 'A' and 1 as parameters. After the first execution, it is called using 'b' and 2 parameters, and so on.
results ends up to be an array: first item is the result of the first asyncFunc execution, second items it the result of the second call, and so on.

To call **asyncFunc** two at a time:

 ```javascript
    const loop = makeAsyncLoop(asyncFunc, {maxExecution: 2 })
    
    const results = await loop(
      ['A', 1],
      ['B', 2],
      ['C', 3]
    )
```

asyncFunc('A', 1) and asyncFunc('B', 2) are executed first. One one of them is terminated, asyncFunc('C', 3) is called.

Whatever end of executin is, first item od resutls array is always the result of the first asyncFunc execution, second items is always it the result of the second call, and so on.

You can set any number you want to maxExecution but don't forget that this lib runs in the vent-loop: the higer maxExecution the more event-loop has work to do.

By default ts-async-lopp checks every 100ms if it can trigger a new execution. To reduce the gap between execution yo can set your own value using waitingDuration:

```javascript
    const loop = makeAsyncLoop(
      asyncFunc, 
      { waitingDuration: 10 } // checks every 10ms
    ) 
    
    const loop = makeAsyncLoop(
      asyncFunc, 
      {
        maxExecution: 2, 
        waitingDuration: 200 // checks every 2000ms
      }
    ) 
    
```

## Follow progression

Two callbacks are avaialable: onStart and onStop.
When provided, onStart is called each time an execution is launched.

Parameters:

```javascript
  index: execution parameters index
  params: parameters of the execution
  currentExecutionCount: execution curently running (including the one for which onStart is calling)
```

When provided, onStop is called each time an execution is terminated.

Parameters:

```javascript
  index: execution parameters index
  params: parameters of the execution
  currentExecutionCount: execution curently running (the one that just stop in not included)
  totalExecutionCount: total numbers of execution
```

They are parts of the makeAsyncLoop's options:

```javascript
const onStart = ({ index, params, currentExecutionCount }) => console.log(`Start execution ${index}, with params ${params} (current number of tasks: ${currentExecutionCount}).`)

const onStop = ({ index,
 currentExecutionCount }) => console.log(`Execution ${index} is done(current number of tasks: ${currentExecutionCount}).`)

const asyncLoop = makeAsyncLoop(
  asyncFunc,
  {
    maxExecution: 2,
    onStart,
    onStop
  }
)

```

## Error

If any execution failed, an error is thrown and not other execution is performed.

MakeAsyncLopp throw a specific error: isAsynLoopError, which have the following properties:

```javascript
  error the error thrown by an execution
  index index of the erroneous execution
  params parameters of the erroneous execution
  currentExecutionCount number of exectuion when the error has been thrown
  totalExecutionCount: total number of executions
```

For typescript user, a **isAsynLoopError** function allow to cast an error to an isAsynLoopError:

```javascript
} catch (error) {
  if (isAsynLoopError(error)) {
    console.error(`Error from Async loop: \n\tmessage:${error.error} \n\tname:${error.name} \n\tcurrentExecutionCount${error.currentExecutionCount} \n\tindex${error.index} \n\tparams${error.params}`)
    console.error(error.error.stack)
  } else {
    throw error
  }
}
```

---
This package include esm, commonjs & umd distribution, along with a d.td declarations file

---
Options:

```javascript
interface MakeAsyncLoopOptions {
  maxExecution?: number; Maximum number of simultanous executions
  waitingDuration?: number; Check every <waitingDuration> ms is a new exectuoin can be launched
  onStart?: a callback triggrered when an execution starts, 
  onStop?: a callback triggrered when an execution stops, 
}
```

### Known issues

- Parameters are not typed
