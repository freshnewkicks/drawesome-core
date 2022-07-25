import type { CanvasActions, CanvasState } from './types'

export const UpdateCanvas = (state: CanvasState, action: CanvasActions) => {
  switch (action.type) {
    case "updatePencil":
      state.pencil = action.value
      break;
    case "updateFirstDraw":
      state.firstDraw = action.value
      break;
    case "updateSize":
      state.size = action.value
      break;
    case "updateColor":
      state.color = action.value
      break;
    case "updateOffset":
      state.offset = action.value
      break;
  }
  return {...state}
}