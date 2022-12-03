<script lang="ts" setup>
import { provide, reactive, ref, toRefs, watch } from 'vue'
import type { CanvasClass } from './CanvasClass'
import { CanvasContextSymbol, defaultOptions } from './CanvasClass'

const options = reactive(defaultOptions)

const canvas = ref<CanvasClass | null>(null)

const { width, height } = toRefs(options)

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
</script>

<template>
  <slot />
</template>
