<script lang="ts" setup>
import { inject, toRefs } from 'vue'
import type { CanvasContext } from './CanvasClass'
import { CanvasContextSymbol } from './CanvasClass'
const { options } = inject<CanvasContext>(CanvasContextSymbol) as CanvasContext

const { width, height, stop } = toRefs(options)
</script>

<template>
  <label for="stop">
    stop
    <button id="stop" @click="(stop = !stop)" />
  </label>
  <label for="width">
    width: {{ width }} s
    <input id="width" v-model="width" type="number">
  </label>
  <label for="height">
    height:
    <input id="height" v-model="height" type="number">
  </label>
</template>
