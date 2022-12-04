import type { Ref } from 'vue'
import { CircleElement } from './CircleElement'
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
}

export const defaultOptions: CustomCanvasOptions = {
  width: 1000,
  height: 1000,
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
    this.circles = []
    this.traces = []
    this.populateCircles()
    // this.draw()
    this.draw()
  }

  populateCircles = () => {
    const initial = new CircleElement({ x: this.options.width / 2, y: this.options.height / 2 }, 150, 0, 2 * Math.PI, 2 * Math.PI, 0.003, true)
    const newCircle = new CircleElement({ x: 50, y: 100 }, 50, 0, 2 * Math.PI, 1, 0.05, false)

    const seconNewCircle = new CircleElement({ x: 50, y: 100 }, 20, 0, 2 * Math.PI, 1, null)
    this.circles.push(initial, newCircle, seconNewCircle)
  }

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
    this.traces.push(lastCircle.pos)
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

    // if enough time has elapsed, draw the next frame

    if (elapsed > 1000 / 24) {
      this.then = now - (elapsed % 1000 / 24)
      this.drawBackground()
      this.drawBorders()
      this.drawCircles()
      this.drawFromLastPoint()
    }
  }

  clear = async () => {
    if (this.context)
      this.context.clearRect(0, 0, this.options.width, this.options.height)

    return true
  }

  updateOptions = async (options: CustomCanvasOptions) => {
    await this.clear()
    this.options = options
    this.draw()
  }
}
