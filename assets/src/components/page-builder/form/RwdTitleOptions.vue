<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { TitleOptions } from '~luna/types';
import RwdGroup from "../form/RwdGroup.vue";
import ColorInput from './ColorInput.vue';
import SliderInput from './SliderInput.vue';

const props = defineProps<{ 
  id?: string;
}>();

const options = defineModel<TitleOptions>({
  required: true
});
const prepared = ref(false);

onMounted(() => {
  setTimeout(() => {
    prepared.value = true;
  }, 150);
});

// watch(options, (val) => {
//   emit('update:modelValue', val);
// }, { deep: true });
//
// watch(() => props.modelValue, (val) => {
//   if (!val) return;
//   options.value = JSON.parse(JSON.stringify(val));
// }, { deep: true });
</script>

<template>
  <div class="c-title-options">
    <div class="form-row row">
      <div class="col-6">
        <!-- Title Element -->
        <div class="form-group mb-3">
          <label :for="id + 'title-element'">
            Title Element
          </label>
          <select :id="id + 'title-element'"
            v-model="options.element" class="form-select custom-select">
            <option v-for="i of [1, 2, 3, 4, 5, 6]" :value="'h' + i">
              h{{ i }}
            </option>
          </select>
        </div>
      </div>
      <div class="col">
        <!-- Title Color -->
        <div class="form-group mb-3">
          <label :for="id + 'title-color'">Title Color</label>
          <ColorInput :id="id + 'title-color'" v-model.lazy="options.color" />
        </div>
      </div>
    </div>

    <div class="form-row row">
      <div class="col-6">
        <!-- Title Font Size -->
        <RwdGroup class-name="c-title-font-size">
          <template #label>
            <label>
              Title Font Size
            </label>
          </template>
          <template v-for="size of ['lg', 'md', 'xs']" class="form-group mb-3"
            v-slot:[size]
            :class="'c-title-font-size__' + size">
            <SliderInput
              v-model="options.font_size[size as 'lg' | 'md' | 'xs']"
              :max="500"
            />
          </template>
        </RwdGroup>
      </div>
      <div class="col-6">
        <!-- Title Font Weight -->
        <div class="form-group mb-3">
          <label>
            Title Font Weight
          </label>
          <div class="" v-if="prepared">
            <SliderInput
              v-model="options.font_weight"
              :data="['', 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000]"
              :max="1000"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="form-row row">
      <div class="col-6">
        <!-- Title Margin Top -->
        <RwdGroup class-name="c-title-margin_top">
          <template #label>
            <label>
              Title Margin Top
            </label>
          </template>
          <template v-for="size of ['lg', 'md', 'xs']" class="form-group mb-3" v-slot:[size]
            :class="'c-title-margin_top__' + size">
            <input type="number" v-model="options.margin_top[size as 'lg' | 'md' | 'xs']" class="form-control" />
          </template>
        </RwdGroup>
      </div>
      <div class="col-6">
        <!-- Title Margin Bottom -->
        <RwdGroup class-name="c-title-margin_bottom">
          <template #label>
            <label>
              Title Margin Bottom
            </label>
          </template>
          <template v-for="size of ['lg', 'md', 'xs']" class="form-group mb-3" v-slot:[size]
            :class="'c-title-margin_bottom__' + size">
            <input type="number" v-model="options.margin_bottom[size as 'lg' | 'md' | 'xs']" class="form-control" />
          </template>
        </RwdGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
