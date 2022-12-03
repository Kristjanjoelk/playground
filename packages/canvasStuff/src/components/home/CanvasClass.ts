import type { Ref } from 'vue'
import { colors } from './contants'

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
  width: 500,
  height: 500,
}

export class CanvasClass {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  options: CustomCanvasOptions

  constructor(canvasElement: HTMLCanvasElement | undefined, options: CustomCanvasOptions) {
    if (!canvasElement)
      throw new Error('canvasElement is undefined')

    this.canvas = canvasElement as HTMLCanvasElement
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D

    this.options = options ?? defaultOptions

    this.draw()
  }

  drawBorders = () => {
    if (this.context) {
      this.context.strokeStyle = colors.black
      this.context.lineWidth = 2
      this.context.strokeRect(0, 0, this.options.width, this.options.height)
    }
  }

  drawBackground = () => {
    // eslint-disable-next-line no-console
    console.log('drawing background', this.options, this.context, this.options.width)
    if (this.context) {
      this.context.fillStyle = colors.gray
      this.context.fillRect(0, 0, this.options.width, this.options.height)
    }
  }

  draw = () => {
    this.drawBackground()
    this.drawBorders()
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
