<script lang="ts" setup>
import { computed } from 'vue';
import ColorInput from '~luna/components/page-builder/form/ColorInput.vue';
import { BackgroundGradientOptions } from '~luna/types';
import SliderInput from './SliderInput.vue';

const props = defineProps<{
  id?: string;
}>();
const emit = defineEmits(['update.value']);
const gradient = defineModel<BackgroundGradientOptions>({
  required: true
});

const backgroundImage = computed(() => {
  const { type, angle, start_color, start_pos, end_color, end_pos } = gradient.value;

  if (type === 'linear') {
    return `${type}-gradient(${angle || 0}deg, ${start_color} ${start_pos}%, ${end_color} ${end_pos}%)`;
  }

  return `${type}-gradient(${start_color} ${start_pos}%, ${end_color} ${end_pos}%)`;
});
</script>

<template>
  <div class="c-box-offset">
    <div class="c-gradient-preview mb-3" style="height: 100px; border: 1px solid rgba(0, 0, 0, .2);"
      :style="{'background-image': backgroundImage}">
    </div>

    <div class="form-row row">
      <div class="col-6">
        <div class="form-group mb-3">
          <label :for="id + '-color1'">Color 1</label>
          <ColorInput :id="id + '-color1'" v-model.lazy="gradient.start_color" class="form-control" />
        </div>
        <div class="form-group mb-3">
          <label :for="id + '-color1-pos'">Color 1 Position</label>
          <SliderInput v-model="gradient.start_pos" />
        </div>
      </div>
      <div class="col-6">
        <div class="form-group mb-3">
          <label :for="id + '-color2'">Color 2</label>
          <ColorInput :id="id + '-color2'" v-model.lazy="gradient.end_color" class="form-control" />
        </div>
        <div class="form-group mb-3">
          <label :for="id + '-color2-pos'">Color 2 Position</label>
          <SliderInput v-model="gradient.end_pos" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="form-group mb-3">
          <label :for="id + '-type'">Gradient Type</label>
          <select :id="id + '-type'" v-model.lazy="gradient.type" class="form-select custom-select">
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group mb-3">
          <label :for="id + '-angle'">Angle</label>
          <SliderInput
            :id="id + '-angle'"
            v-model="gradient.angle"
            :max="360"
            :disabled="gradient.type !== 'linear'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
