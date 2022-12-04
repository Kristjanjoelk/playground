<script lang="ts" setup>
import { computed, inject, onMounted, reactive, ref, toRefs, watch } from 'vue'

import type { CanvasContext } from './CanvasClass'
import CanvasOptions from './CanvasOptions.vue'
import CanvasCircleOptions from './CanvasCircleOptions.vue'
import { CanvasClass, CanvasContextSymbol } from './CanvasClass'
import { colors } from './contants'

const size = reactive({
  width: 500,
  height: 500,
})

const homeCanvas = ref<HTMLCanvasElement>()
const offCanvas = ref<HTMLCanvasElement>()

const { canvas, options } = inject<CanvasContext>(CanvasContextSymbol) as CanvasContext

const { width, height } = toRefs(options)

watch(homeCanvas, (value: HTMLCanvasElement | undefined) => {
  if (value) {
    try {
      canvas.value = new CanvasClass(homeCanvas.value, offCanvas.value, options)
    }
    catch (e) {
      console.error('error', e)
    }
  }
})
</script>

<template>
  <CanvasCircleOptions />
  <canvas id="canvas" ref="homeCanvas" :width="width" :height="height" />
  <canvas id="off-canvas" ref="offCanvas" :width="width" :height="height" class="hidden" />
  <br>
  <CanvasOptions />
</template>

<style scoped>
.hidden {
  display: none;
}
</style>
