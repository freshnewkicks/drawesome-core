// import { Link } from "@remix-run/react";
// import { useOptionalUser } from "~/utils";
import { UpdateCanvas } from "@comp/UpdateCanvas"
import { useReducer, useRef } from "react";

export default function Index() {

  // const user = useOptionalUser();

  const [{
    pencil,
    firstDraw,
    size,
    color,
    offset
  }, dispatch] = useReducer(UpdateCanvas, {
    pencil: false,
    firstDraw: false,
    size: 0,
    color: '#fff',
    offset: 0.1
  })

  const ART = useRef<HTMLCanvasElement | null>(null)
  let prevMouse = useRef({ x: 0, y:0 })

  const draw = (e: any, type: 'Mouse' | 'Touch') => {
    let ctx
    let canvas

    if (ART.current) {
      ctx = ART.current.getContext('2d')
      canvas = ART.current.getBoundingClientRect()
    } else {
      throw new Error('ART.current null or undefined')
    }

    if (!pencil) {
      return
    }

    if (ctx) {
      ctx.beginPath()
      ctx.lineWidth = size
      ctx.lineCap = 'round'
    } else {
      throw new Error('ctx undefined')
    }

    let x
    let y

    if ( type === 'Touch' && ART.current ) {
      x = e.touch.touches[0].clientX - canvas.left
      y = e.touch.touches[0].clientY - canvas.top
    } else {
      x = e.mouse.clientX - canvas.left
      y = e.mouse.clientY - canvas.top
    }

    x = x * ART.current.width / ART.current.clientWidth
    y = y * ART.current.height / ART.current.clientHeight

    if (firstDraw) {
      prevMouse.current = { x: x, y: y }
      dispatch({
        type: 'updateFirstDraw',
        value: false
      })
    }

    const LOWER_X = prevMouse.current.x - offset
    const UPPER_X = prevMouse.current.x + offset
    const LOWER_Y = prevMouse.current.y - offset
    const UPPER_Y = prevMouse.current.y + offset

    if (x > UPPER_X || x < LOWER_X || y > UPPER_Y || y < LOWER_Y) {
      ctx.moveTo(prevMouse.current.x, prevMouse.current.y)
      ctx.lineTo(x, y)
      ctx.strokeStyle = color
      ctx.stroke()
    } else {
      ctx.arc(x, y, 1, 0, 2 * Math.PI, false)
      ctx.fillStyle = color
      ctx.fill()

    }
    prevMouse.current = { x: x, y: y }
  }

  const handleClearCanvas = () => {
    let ctx = ART.current?.getContext('2d')
    ctx?.clearRect(0, 0, 640, 480)
  }

  const handleMouseDown = () => {
    dispatch({
      type: 'updatePencil',
      value: true
    })

    dispatch({
      type: 'updateFirstDraw',
      value: true
    })
  }

  const handleMouseUp = () => {
    dispatch({
      type: 'updatePencil',
      value: false
    })
  }

  const handleMouseLeave = () => {
    dispatch({
      type: 'updatePencil',
      value: false
    })
  }

  return (
    <main>
      <div
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
        className="w-full bg-transparent flex flex-col items-center justify-center overscroll-contain overflow-y-hidden"
      >
        <button
          onClick={handleClearCanvas}
          className="w-[9%] absolute right-0 -top-0.5 text-white bg-none flex justify-center items-start"
        >
          Clear
        </button>
        <canvas
          ref={ ART }
          width="640px"
          height="480px"
          className="md:w-[640px] md:h-[550px] w-[400px] h-[390px] bg-white rounded-lg p-0 m-0 border border-8 border-red-800"
          onMouseDown={ handleMouseDown }
          onMouseUp={ handleMouseUp }
          onMouseLeave={ handleMouseUp }
          onMouseMove={e => draw(e, 'Mouse')}
          onTouchStart={ handleMouseDown }
          onTouchMove={e => draw(e, 'Touch')}
        />
      </div>
    </main>
  );
}
