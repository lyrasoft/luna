<template>
  <div class="d-flex align-items-center">
    <vue-slider v-model="value" class="flex-grow-1"
      :max="max"
      :min="min"
      :v-data="data"
      :interval="interval"
    ></vue-slider>
    <input type="number"
      :id="id"
      class="form-control ms-2"
      :style="{ width: inputWidth }"
      v-model="value"
      :step="interval"
    />
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css'
import { ref, watch } from 'vue';

export default {
  name: 'SliderInput',
  components: {
    VueSlider
  },
  props: {
    id: String,
    modelValue: {
      default: ''
    },
    data: {
      type: Array,
    },
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
    interval: {
      type: Number,
    },
    inputWidth: {
      type: String,
      default: '5rem'
    }
  },
  setup(props, { emit }) {
    const value = ref(props.modelValue);

    watch(value, (v) => {
      emit('update:modalValue', v);
    });

    return {
      value
    };
  }
};
</script>

<style scoped>

</style>
