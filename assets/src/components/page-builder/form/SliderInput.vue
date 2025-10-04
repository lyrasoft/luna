<script lang="ts" setup>
import { injectCssToDocument } from '@windwalker-io/unicorn-next';
import css from 'vue-slider-component/theme/default.css?inline';
import VueSlider from 'vue-slider-component';

injectCssToDocument(css);

const props = withDefaults(defineProps<{
  id?: string;
  data?: any[];
  min?: number;
  max?: number;
  interval?: number;
  inputWidth?: string;
}>(), {
  inputWidth: '5rem'
});

const value = defineModel<number | string>({
  required: true,
});
</script>

<template>
  <div class="d-flex align-items-center">
    <VueSlider v-model="value" class="flex-grow-1"
      :max="max"
      :min="min"
      :v-data="data"
      :interval="interval"
    ></VueSlider>
    <input type="number"
      :id="id"
      class="form-control ms-2"
      :style="{ width: inputWidth }"
      v-model="value"
      :step="interval"
    />
  </div>
</template>

<style scoped>

</style>
