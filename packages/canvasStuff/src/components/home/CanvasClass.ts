import type { Ref } from 'vue'
import type { CircleElement } from './CircleElement'
import { colors } from './contants'
import type { Position } from './types'

// eslint-disable-next-line symbol-description
export const CanvasContextSymbol = Symbol()
export interface CanvasContext {
  canvas: Ref<CanvasClass>
  options: CustomCanvasOptions
}

export interface CustomCanvasOptions {
  width: number
  height: number
  stop: boolean
  circles: CircleElement[]
}

export const defaultOptions: CustomCanvasOptions = {
  width: 1000,
  height: 1000,
  stop: false,
  circles: [],
}

export class CanvasClass {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  offCanvasElement: HTMLCanvasElement
  offCanvasContext: CanvasRenderingContext2D
  options: CustomCanvasOptions
  radian: number
  then: number
  circles: CircleElement[]
  traces: Position[]
  constructor(canvasElement: HTMLCanvasElement | undefined, offCanvasElement: HTMLCanvasElement | undefined, options: CustomCanvasOptions) {
    if (!canvasElement)
      throw new Error('canvasElement is undefined')

    this.canvas = canvasElement as HTMLCanvasElement
    this.offCanvasElement = offCanvasElement as HTMLCanvasElement
    this.offCanvasContext = this.offCanvasElement.getContext('2d') as CanvasRenderingContext2D
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D

    this.options = options ?? defaultOptions
    this.radian = 1
    this.then = Date.now()
    this.circles = options.circles
    this.traces = []
    // this.populateCircles()
    // this.draw()
    this.draw()
  }

  // populateCircles = () => {
  //   this.circles.push(initial, newCircle, seconNewCircle, thirdCircle, fourthCircle)
  // }

  drawBorders = () => {
    if (this.context) {
      this.context.strokeStyle = colors.black
      this.context.lineWidth = 2
      this.context.strokeRect(0, 0, this.options.width, this.options.height)
    }
  }

  drawBackground = () => {
    if (this.context) {
      this.context.fillStyle = colors.gray
      this.context.fillRect(0, 0, this.options.width, this.options.height)
    }
  }

  drawCircles = () => {
    for (let i = 0; i < this.circles.length; i++) {
      if (i)
        this.circles[i].update(this.circles[i - 1])

      else
        this.circles[i].update()

      this.circles[i].draw(this.context)
    }
  }

  drawFromLastPoint = () => {
    const lastCircle = this.circles[this.circles.length - 1]
    this.traces.push(lastCircle.endPosition)
    const i = this.traces.length - 1
    if (i) {
      this.offCanvasContext.beginPath()
      this.offCanvasContext.moveTo(this.traces[i - 1].x, this.traces[i - 1].y)
      this.offCanvasContext.lineTo(this.traces[i].x, this.traces[i].y)
      this.offCanvasContext.stroke()
    }
    this.context.drawImage(this.offCanvasElement, 0, 0)
  }

  draw = () => {
    window.requestAnimationFrame(this.draw)
    const now = Date.now()
    const elapsed = now - this.then
    if (this.options.stop)
      return

    // if enough time has elapsed, draw the next frame

    if (elapsed > 1000 / 24) {
      this.then = now - (elapsed % 1000 / 24)
      this.drawBackground()
      this.drawBorders()
      this.drawCircles()
      this.drawFromLastPoint()
    }
  }

  clear = async (all?: boolean) => {
    if (this.context)

      this.context.clearRect(0, 0, this.options.width, this.options.height)

    if (all)
      this.offCanvasContext.clearRect(0, 0, this.options.width, this.options.height)

    return true
  }

  updateOptions = async (options: CustomCanvasOptions) => {
    if (!options.stop)
      await this.clear()

    this.options = options
    this.draw()
  }
}
