import { colors } from './contants'
import type { Position } from './types'

export class LineElement {
  pos: Position
  toPos: Position
  constructor(pos: Position, toPos: Position) {
    this.pos = pos
    this.toPos = toPos
  }

  draw = (context: CanvasRenderingContext2D) => {
    context.beginPath()
    context.moveTo(this.pos.x, this.pos.y)
    context.lineTo(this.toPos.x, this.toPos.y)
    context.lineWidth = 2
    context.strokeStyle = colors.orange
    context.stroke()
  }

  set position(val: Position) {
    this.pos = val
  }

  get position() {
    return this.pos
  }

  set endPosition(val: Position) {
    this.toPos = val
  }

  get endPosition() {
    return this.toPos
  }
}
