<script lang="ts" setup>
import { inject, toRefs } from 'vue'
import type { CanvasContext } from './CanvasClass'
import { CanvasContextSymbol } from './CanvasClass'
const { options } = inject<CanvasContext>(CanvasContextSymbol) as CanvasContext

const { circles } = toRefs(options)
</script>

<template>
  <div v-for="(circle, index) in circles" :key="index">
    <div>
      <label for="size">
        size(px):
        <input id="size" v-model="circle.size" type="number">
      </label>
    </div>
    <div>
      <label for="lineAngle">
        angle(°):
        <input id="lineAngle" v-model="circle.lineAngle" type="number">
      </label>
    </div>
    <div>
      <label for="rotationSpeed">
        rotationSpeed(0.00000 - 2.0000):
        <input id="rotationSpeed" v-model="circle.rotationSpeed" type="number">
      </label>
    </div>
    <div>
      <label for="clockWise"> clockWise ?</label>
      <input id="clockWise" v-model="circle.clockWise" type="checkbox" name="clockWise" :value="circle.clockWise">
    </div>
  </div>
</template>
