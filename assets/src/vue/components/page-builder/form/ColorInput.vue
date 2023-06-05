<template>
    <input ref="input" type="text"
        :id="id"
        class="form-control flex-grow-1"
        :class="inputClass"
        v-model.lazy="value"
    />
</template>

<script>
import Spectrum from 'spectrum-vanilla';
import { onBeforeUnmount, onMounted, onUnmounted, ref, watch } from 'vue';

export default {
  name: 'ColorInput',
  props: {
    modelValue: {
      default: ''
    },
    id: String,
    inputClass: String,
    options: Object
  },
  setup(props, { emit }) {
    const value = ref(props.modelValue);
    const input = ref(null);

    onMounted(() => {
      Spectrum.getInstance(input.value, props.options || {});
    });

    onBeforeUnmount(() => {
      const sp = Spectrum.getInstance(input.value);
      sp.destroy();
    });

    watch(value, (v) => {
      emit('update:modelValue', v);
    });

    return {
      value,
      input
    };
  }
};
</script>

<style>
  @import "spectrum-vanilla/dist/spectrum.min.css";

  .sp-add-on {
    width: 40px !important;
  }
</style>
