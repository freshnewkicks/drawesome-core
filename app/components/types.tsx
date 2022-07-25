export type CanvasState = {
  pencil: boolean,
  firstDraw: boolean,
  size: number,
  color: string,
  offset: number
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
