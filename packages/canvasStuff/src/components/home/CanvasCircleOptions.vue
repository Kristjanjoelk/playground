<script lang="ts" setup>
import { inject, ref, toRefs } from 'vue'
import type { CanvasContext } from './CanvasClass'
import { CanvasContextSymbol } from './CanvasClass'
import { CircleElement } from './CircleElement'
const { options } = inject<CanvasContext>(CanvasContextSymbol) as CanvasContext

const { circles } = toRefs(options)

const expandedOptions = ref<number[]>([])
const toggleExpanded = (index: number) => {
  const idx = expandedOptions.value.indexOf(index)
  if (idx > -1)
    expandedOptions.value = expandedOptions.value.slice(0, idx)

  else
    expandedOptions.value.push(index)
}
const addCircle = () => {
  const newCircle = new CircleElement({
    pos: { x: 0, y: 0 },
    startAngle: 2 * Math.PI,
    endAngle: 0,
    size: 100,
    lineAngle: 2 * Math.PI,
    rotationSpeed: 0.003,
    clockWise: true,
  })
  circles.value.push(newCircle)
}

const removeCircle = (index: number) => {
  circles.value = circles.value.slice(0, index)
}
</script>

<template>
  <div class="CanvasCircleAdder">
    <div v-for="(circle, index) in circles" :key="index">
      <template v-if="expandedOptions.includes(index)">
        <div>
          <button @click="toggleExpanded(index)">
            hide
          </button>
          <button @click="removeCircle(index)">
            remove Circle
          </button>
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
      <template v-else>
        <button @click="toggleExpanded(index)">
          show circle {{ index }}
        </button>
      </template>
    </div>
    <button @click="addCircle()">
      add circle
    </button>
  </div>
</template>

<style>
.CanvasCircleAdder {
    position: absolute;
    left: 0;
}
</style>
