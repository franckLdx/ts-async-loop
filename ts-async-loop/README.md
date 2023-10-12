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
First asyncFunc is called given 'A' and 1 as parameters. After the first execution, it is called using 'b' and 2 parameters, and so on.
results ends up to be an array: first item is the result of the first asyncFunc execution, second items it the result of the second call, and so on.

If any execution failed, an error is thrown and not other execution is performed.

To call **asyncFunc** two at a time:

 ```javascript
    const loop = makeAsyncLoop(asyncFunc, {maxExecution: 2 })
    
    const results = await loop(
      ['A', 1],
      ['B', 2],
      ['C', 3]
    )
```
asyncFunc('A', 1) and asyncFunc('B', 2) are executed first. One one of them is terminated, asyncFunc('C', 3) is called

Whatever end of executin is, first item od resutls array is always the result of the first asyncFunc execution, second items is always it the result of the second call, and so on.

You can set any number you want to maxExecution but don't forget that this lib runs in the vent-loop: the higer maxExecution the more event-loOp has work to do.

By default ts-async-lopp checks every 100ms if it can trigger a new execution. To reduce the gap between execution yo can set your own value using waitingDuration:

```javascript
    const loop = makeAsyncLoop(asyncFunc, { waitingDuration:10 }) // checks every 10ms
    
    const loop = makeAsyncLoop(asyncFunc, {maxExecution: 2, waitingDuration: 200 }) // checks every 2000ms
    
```


---
###### Known issues

- Parameters are not typed

- No means to control progression

- In case of error no means to know which execution failed

The two last issues will be addressed soon.