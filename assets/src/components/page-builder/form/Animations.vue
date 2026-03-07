<script lang="ts" setup>
import { data } from '@windwalker-io/unicorn-next';
import { AnimationOptions } from '~luna/types';

const props = defineProps<{
  id: string
}>();
const animation = defineModel<AnimationOptions>({
  required: true,
});

const driver = data('animation.driver');
const isAOS = driver === 'aos';

// Migration
const animations = getAnimations();

if (!animations.includes(animation.value.name)) {
  animation.value.name = animations[0];
}

function getAnimations() {
  if (isAOS) {
    return [
      'fade',
      'fade-up',
      'fade-down',
      'fade-left',
      'fade-right',
      'fade-up-right',
      'fade-up-left',
      'fade-down-right',
      'fade-down-left',

      'flip-up',
      'flip-down',
      'flip-left',
      'flip-right',

      'slide-up',
      'slide-down',
      'slide-left',
      'slide-right',

      'zoom-in',
      'zoom-in-up',
      'zoom-in-down',
      'zoom-in-left',
      'zoom-in-right',

      'zoom-out',
      'zoom-out-up',
      'zoom-out-down',
      'zoom-out-left',
      'zoom-out-right',
    ];
  }

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

      <div class="mt-2 text-muted small" v-if="isAOS">
        Please refer to
        <a href="https://michalsnik.github.io/aos/" target="_blank">AOS animations</a>.
      </div>
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
