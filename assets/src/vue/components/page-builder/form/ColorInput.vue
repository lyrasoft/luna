<template>
<div class="d-flex">
  <input type="color"
    v-model="value" class="form-control form-control-color mr-2 me-2" />
  <input type="text"
    :id="id"
    class="form-control flex-grow-1"
    v-model.lazy="value"
  />
</div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'ColorInput',
  props: {
    modelValue: {
      default: ''
    },
    id: String,
    inputClass: String
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
