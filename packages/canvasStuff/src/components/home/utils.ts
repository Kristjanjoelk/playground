import type { Position } from './types'

export const calculateEndPosition = (size: number, angle: number, pos: Position) => {
  return {
    x: size * Math.cos(angle * Math.PI) + pos.x,
    y: size * Math.sin(angle * Math.PI) + pos.y,
  }
}
