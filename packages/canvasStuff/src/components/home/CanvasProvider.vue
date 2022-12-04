<script lang="ts" setup>
import { provide, reactive, ref, toRefs, watch } from 'vue'
import type { CanvasClass } from './CanvasClass'
import { CanvasContextSymbol, defaultOptions } from './CanvasClass'
import { CircleElement } from './CircleElement'

const options = reactive(defaultOptions)

const canvas = ref<CanvasClass | null>(null)

const { width, height, stop, circles } = toRefs(options)
const initial = new CircleElement({
  pos: { x: width.value / 2, y: height.value / 2 },
  startAngle: 2 * Math.PI,
  endAngle: 0,
  size: 150,
  lineAngle: 2 * Math.PI,
  rotationSpeed: 0.003,
  clockWise: true,
})
const newCircle = new CircleElement({
  pos: { x: 0, y: 0 },
  startAngle: 2 * Math.PI,
  endAngle: 0,
  size: 100,
  lineAngle: 2 * Math.PI,
  rotationSpeed: 0.003,
  clockWise: true,
})

const seconNewCircle = new CircleElement({
  pos: { x: 0, y: 0 },
  startAngle: 2 * Math.PI,
  endAngle: 0,
  size: 80,
  lineAngle: 2 * Math.PI,
  rotationSpeed: 0.003,
  clockWise: false,
})
const thirdCircle = new CircleElement({
  pos: { x: 0, y: 0 },
  startAngle: 2 * Math.PI,
  endAngle: 0,
  size: 60,
  lineAngle: 2 * Math.PI,
  rotationSpeed: 0.003,
  clockWise: true,
})
const fourthCircle = new CircleElement({
  pos: { x: 0, y: 0 },
  startAngle: 2 * Math.PI,
  endAngle: 0,
  size: 50,
  lineAngle: 2 * Math.PI,
  rotationSpeed: 0.003,
  clockWise: false,
})
circles.value.push(initial, newCircle, seconNewCircle, thirdCircle, fourthCircle)

provide(CanvasContextSymbol, {
  canvas,
  options,
})

watch(width, () => {
  if (canvas.value)
    canvas.value.updateOptions({ ...options, width: width.value })
})
watch(height, () => {
  if (canvas.value)
    canvas.value.updateOptions({ ...options, height: height.value })
})
watch(stop, () => {
  if (canvas.value)
    canvas.value.updateOptions({ ...options, stop: stop.value })
})
</script>

<template>
  <slot />
</template>
