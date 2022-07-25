import type { TimerState, TimerActions } from './types'

export const UpdateTimer = (state: TimerState, action: TimerActions) => {
  switch (action.type) {
    case "updateMilliseconds":
      state.milliseconds = action.value
      break;
    case "updateSeconds":
      state.seconds = action.value
      break;
    case "updateCounter":
      state.counter = action.value
      break;
  }

  return {...state}
}