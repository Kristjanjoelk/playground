import { colors } from './contants'
import { LineElement } from './LineElement'
import type { Position } from './types'
import { calculateEndPosition } from './utils'

export interface CircleElementOptions {
  pos: Position
  startAngle: number
  endAngle: number
  size: number
  lineAngle: number
  rotationSpeed: number
  clockWise: boolean | undefined
}

export class CircleElement {
  pos: Position
  startAngle: number
  endAngle: number
  size: number
  lineAngle: number
  rotationSpeed: number
  clockWise: boolean | undefined
  endPosition: Position
  lineElement: LineElement

  constructor(options: CircleElementOptions) {
    this.pos = options.pos
    this.startAngle = options.startAngle
    this.endAngle = options.endAngle
    this.size = options.size
    this.lineAngle = options.lineAngle
    this.clockWise = options.clockWise
    this.rotationSpeed = options.rotationSpeed !== null ? options.rotationSpeed : 0
    this.endPosition = calculateEndPosition(this.size, this.lineAngle, this.pos)
    this.lineElement = new LineElement(this.pos, this.endPosition)
  }

  draw = (context: CanvasRenderingContext2D) => {
    context.beginPath()
    context.strokeStyle = colors.rgba(0.1).orange
    context.lineWidth = 2
    context.arc(this.pos.x, this.pos.y, this.size, this.startAngle, this.endAngle)
    context.stroke()
    this.lineElement.draw(context)
  }

  update = (previousCircle?: CircleElement) => {
    if (previousCircle) {
      const position = {
        x: previousCircle.size * Math.cos(previousCircle.lineAngle * Math.PI) + previousCircle.pos.x,
        y: previousCircle.size * Math.sin(previousCircle.lineAngle * Math.PI) + previousCircle.pos.y,
      }
      this.pos = position
    }
    if (!this.rotationSpeed) {
      this.endPosition = calculateEndPosition(this.size, this.lineAngle, this.pos)
      this.lineElement.position = this.pos
      this.lineElement.endPosition = this.endPosition
      return
    }

    if (this.clockWise)
      this.lineAngle = this.lineAngle + this.rotationSpeed

    else
      this.lineAngle = this.lineAngle - this.rotationSpeed

    if (this.lineAngle > 2)
      this.lineAngle = 0

    if (this.lineAngle < 0)
      this.lineAngle = 2

    this.endPosition = calculateEndPosition(this.size, this.lineAngle, this.pos)
    this.lineElement.position = this.pos
    this.lineElement.endPosition = this.endPosition
  }
}
