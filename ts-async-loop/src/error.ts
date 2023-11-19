export class AsynLoopError extends Error {
  public constructor(public error: any, public index: number, public params: any, public currentExecutionCount: number, public totalExecutionCount: number) {
    super(error)
  }
}

export const isAsynLoopError = (error: any): error is AsynLoopError =>
  'error' in error &&
  'index' in error &&
  'params' in error &&
  'currentExecutionCount' in error &&
  'totalExecutionCount' in error