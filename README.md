# ts-async-loop

A mean to execute for/map loop asynchronously

One can execute async actions one by one, or two by, ar three by three, etc...

Let's say you want to execute a function named **asyncFunc** that takes a string and a number as parameters and return a string.

To call **asyncFunc** once at a tile:

```javascript
    const loop = makeAsyncLoop(asyncFunc)
    
    const results = await loop(
      ['a', 1],
      ['B', 2],
      ['C', 3],
    )
```
First asyncFunc is called given 'a' and 1 as parameters. After the first execution, it is called using 'b' and 2 parameters, and so on.
results ends up to be an array: first item is the result of the first asyncFunc execution, second items it the result of the second call, and so on.

If any execution failed, an error is thrown and not other execution is performed.


## Known issues

- Parameters are not typed

- No means to control progression

- In case of error no means to know which execution failed

The two last issues will be addressed soon.