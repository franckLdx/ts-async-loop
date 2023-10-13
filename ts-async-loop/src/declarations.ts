export interface AsyncLoopProgression {
  index: number
  params: any
  currentExecutionCount: number
}

type AsyncLoopProgressionCallback = (data: AsyncLoopProgression) => void

export interface MakeAsyncLoopOptions {
  waitingDuration?: number
  maxExecution?: number
  onStart?: AsyncLoopProgressionCallback
  onStop?: AsyncLoopProgressionCallback
}
