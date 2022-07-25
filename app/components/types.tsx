export type CanvasState = {
  pencil: boolean,
  firstDraw: boolean,
  size: number,
  color: string,
  offset: number
}

export type TimerState = {
  seconds: number,
  milliseconds: number,
  counter: number
}

export type CanvasActions = |{
  type: "updatePencil",
  value: boolean
}
|{
  type: "updateFirstDraw",
  value: boolean
}
|{
  type: "updateSize",
  value: number
}
|{
  type: "updateColor",
  value: string
}
|{
  type: "updateOffset",
  value: number
}

export type TimerActions = |{
  type: 'updateSeconds',
  value: number
}
|{
  type: 'updateMilliseconds',
  value: number
}
|{
  type: 'updateCounter',
  value: number
}