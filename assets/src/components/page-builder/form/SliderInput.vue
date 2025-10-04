<script lang="ts" setup>
import { injectCssToDocument } from '@windwalker-io/unicorn-next';
import { defineAsyncComponent } from 'vue';
import css from '@vueform/slider/themes/default.css?inline';
import VueSlider from '@vueform/slider';

injectCssToDocument(css);

const props = withDefaults(defineProps<{
  id?: string;
  data?: any[];
  min?: number;
  max?: number;
  step?: number;
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
      :step="step"
      showTooltip="drag"
    ></VueSlider>
    <input type="number"
      :id="id"
      class="form-control ms-2"
      :style="{ width: inputWidth }"
      v-model="value"
      :step="step"
    />
  </div>
</template>

<style scoped>

</style>
