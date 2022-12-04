import { LineElement } from './LineElement'
import type { Position } from './types'
import { calculateEndPosition } from './utils'

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

  constructor(pos: Position, size: number, startAngle: number, endAngle: number, lineAngle: number, rotationSpeed: number | null
    , clockWise?: boolean) {
    this.pos = pos
    this.startAngle = startAngle
    this.endAngle = endAngle
    this.size = size
    this.lineAngle = lineAngle
    this.clockWise = clockWise
    this.rotationSpeed = rotationSpeed !== null ? rotationSpeed : 0
    this.endPosition = calculateEndPosition(this.size, this.lineAngle, this.pos)
    this.lineElement = new LineElement(this.pos, this.endPosition)
  }

  draw = (context: CanvasRenderingContext2D) => {
    context.beginPath()
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
