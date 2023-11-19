export interface AsyncLoopProgression {
  index: number
  totalExecutionCount: number
  params: any
  currentExecutionCount: number
}

export interface AsyncLoopProgressionStop<RETURN_TYPE> extends AsyncLoopProgression {
  result: RETURN_TYPE
}

export type AsyncLoopProgressionOnStart = (data: AsyncLoopProgression) => void

export type AsyncLoopProgressionOnStop<RETURN_TYPE> = (data: AsyncLoopProgressionStop<RETURN_TYPE>) => void

export interface MakeAsyncLoopOptions<RETURN_TYPE> {
  waitingDuration?: number
  maxExecution?: number
  onStart?: AsyncLoopProgressionOnStart
  onStop?: AsyncLoopProgressionOnStop<RETURN_TYPE>
}
