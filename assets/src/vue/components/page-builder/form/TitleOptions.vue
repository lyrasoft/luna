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
            v-model="options.title.element" class="form-select custom-select">
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
          <ColorInput :id="id + 'title-color'" v-model.lazy="options.title.color" />
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
              v-model="options.title.font_size[size]"
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
              v-model="options.title.font_weight"
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
            <input type="number" v-model="options.title.margin_top[size]" class="form-control" />
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
            <input type="number" v-model="options.title.margin_bottom[size]" class="form-control" />
          </template>
        </RwdGroup>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, watch } from 'vue';
import RwdGroup from "../form/RwdGroup";
import ColorInput from './ColorInput';
import SliderInput from './SliderInput';
export default {
  name: "TitleOptions",
  components: { ColorInput, SliderInput, RwdGroup },
  props: {
    id: String,
    modelValue: Object
  },
  setup(props, { emit }) {
    const state = reactive({
      options: {},
      prepared: false
    });

    state.options = props.modelValue;

    onMounted(() => {
      // Set a delay time then show slider to fix bug
      setTimeout(() => {
        state.prepared = true;
      }, 150);
    });

    watch(() => state.options, () => {
      emit('update:modelValue', state.options);
    }, { deep: true });

    return {
      ...toRefs(state)
    }
  },
}
</script>

<style scoped>

</style>
