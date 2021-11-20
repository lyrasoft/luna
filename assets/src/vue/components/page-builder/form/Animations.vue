<template>
  <div class="cation-selector">
    <div class="form-group mb-3">
      <label :for="id + '-name'">Animation Name</label>
      <select :id="id + '-name'" class="form-select custom-select" v-model="animation.name">
        <option value="">None</option>
        <option v-for="anim of getAnimations()" :value="anim">
          {{ anim }}
        </option>
      </select>
    </div>

    <div class="form-group mb-3">
      <label :for="id + '-duration'">Animation Duration</label>
      <input type="number" :id="id + '-duration'" class="form-control" v-model="animation.duration" min="0" />
      <small class="form-text text-muted">
        The duration of this animation. The unit is "ms" (1/1000 seconds)
      </small>
    </div>

    <div class="form-group mb-3">
      <label :for="id + '-delay'">Delay Time</label>
      <input type="number" :id="id + '-delay'" class="form-control" v-model="animation.delay" min="0" />
      <small class="form-text text-muted">
        Delay a while to start animation. The unit is "ms" (1/1000 seconds)
      </small>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, watch } from 'vue';

export default {
  name: "animations",
  props: {
    value: Object,
    id: String
  },
  setup(props, { emit }) {
    const state = reactive({
      animation: {}
    });

    onMounted(() => {
      state.animation = props.value;
    });

    watch(() => state.animation, (anim) => {
      emit('update:value', anim);
    });

    return {
      ...toRefs(state),

      getAnimations
    }
  }
}

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

<style scoped>

</style>
