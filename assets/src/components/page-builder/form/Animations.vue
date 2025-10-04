<script lang="ts" setup>
import { AnimationOptions } from '~luna/types';

const props = defineProps<{
  id: string
}>();
const animation = defineModel<AnimationOptions>({
  required: true,
});

function getAnimations() {
  return [
    'fadeIn',
    'fadeInDown',
    'fadeInDownBig',
    'fadeInLeft',
    'fadeInLeftBig',
    'fadeInRight',
    'fadeInRightBig',
    'fadeInUp',
    'fadeInUpBig',

    'flip',
    'flipInX',
    'flipInY',

    'rotateIn',
    'rotateInDownLeft',
    'rotateInDownRight',
    'rotateInUpLeft',
    'rotateInUpRight',

    'zoomIn',
    'zoomInDown',
    'zoomInLeft',
    'zoomInRight',
    'zoomInUp',

    'bounceIn',
    'bounceInDown',
    'bounceInLeft',
    'bounceInRight',
    'bounceInUp'
  ];
}
</script>

<template>
  <div class="cation-selector">
    <div class="form-group mb-3">
      <label :for="props.id + '-name'">Animation Name</label>
      <select :id="props.id + '-name'" class="form-select custom-select" v-model="animation.name">
        <option value="">None</option>
        <option v-for="anim of getAnimations()" :value="anim">
          {{ anim }}
        </option>
      </select>
    </div>

    <div class="form-group mb-3">
      <label :for="props.id + '-duration'">Animation Duration</label>
      <input type="number" :id="props.id + '-duration'" class="form-control" v-model="animation.duration" min="0" />
      <small class="form-text text-muted">
        The duration of this animation. The unit is "ms" (1/1000 seconds)
      </small>
    </div>

    <div class="form-group mb-3">
      <label :for="props.id + '-delay'">Delay Time</label>
      <input type="number" :id="props.id + '-delay'" class="form-control" v-model="animation.delay" min="0" />
      <small class="form-text text-muted">
        Delay a while to start animation. The unit is "ms" (1/1000 seconds)
      </small>
    </div>
  </div>
</template>

<style scoped>

</style>
