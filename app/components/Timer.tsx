import type { FunctionComponent} from "react";
import type { TimerState } from '@comp/types'
import { useEffect, useReducer } from "react";
import { UpdateTimer } from '@comp/UpdateTimer'

export const Timer: FunctionComponent = () => {
  const [{
    seconds,
    milliseconds,
    counter
  }, dispatch] = useReducer(UpdateTimer, {
    seconds: 10,
    milliseconds: 0,
    counter: 0
  })

  useEffect( () => {
    if (seconds > 0) {
      if (milliseconds > 0) {
        setTimeout(() => {
          dispatch({
            type: 'updateMilliseconds',
            value: milliseconds - 1
          })
        }, 10)
      } else if (milliseconds === 0 && seconds > 0) {
        dispatch({
          type: 'updateMilliseconds',
          value: milliseconds
        })
        dispatch({
          type: 'updateCounter',
          value: seconds - 1
        })
      }
    }
  }, [seconds, milliseconds])

  return (
    <div>
      {
        counter > 0 ?
          <div className="text-white">Countdown: { seconds + '.' + milliseconds }</div>
          :
          <div className="text-white">Expired</div>

      }
    </div>
  )
}