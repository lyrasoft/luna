<template>
  <div class="c-box-offset">
    <div class="c-gradient-preview mb-3" style="height: 100px; border: 1px solid rgba(0, 0, 0, .2);"
      :style="{'background-image': backgroundImage}">
    </div>

    <div class="form-row">
      <div class="col-6">
        <div class="form-group mb-3">
          <label :for="id + '-color1'">Color 1</label>
          <input type="text" :id="id + '-color1'" v-model.lazy="gradient.start_color" v-color class="form-control" />
        </div>
        <div class="form-group mb-3">
          <label :for="id + '-color1-pos'">Color 1 Position</label>
          <vue-slide-bar v-model="gradient.start_pos"></vue-slide-bar>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group mb-3">
          <label :for="id + '-color2'">Color 2</label>
          <input type="text" :id="id + '-color2'" v-model.lazy="gradient.end_color" v-color class="form-control" />
        </div>
        <div class="form-group mb-3">
          <label :for="id + '-color2-pos'">Color 2 Position</label>
          <vue-slide-bar v-model="gradient.end_pos"></vue-slide-bar>
        </div>
      </div>
    </div>

    <div class="form-group mb-3">
      <label :for="id + '-type'">Gradient Type</label>
      <select :id="id + '-type'" v-model.lazy="gradient.type" class="form-control">
        <option value="linear">Linear</option>
        <option value="radial">Radial</option>
      </select>
    </div>

    <div class="form-group mb-3">
      <label :for="id + '-angle'">Angle</label>
      <div class="d-flex">
        <vue-slide-bar :id="id + '-angle'" class="flex-grow-1" v-model="gradient.angle" :max="360">
        </vue-slide-bar>
        <input type="text" class="form-control ml-2 ms-2 mt-2" style="width: 3.5rem;"
          v-model="gradient.angle" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, toRefs, watch } from 'vue';

export default {
  name: "gradient",
  props: {
    id: String,
    value: Object
  },
  setup(props, { emit }) {
    const state = reactive({
      gradient: {
        type: 'linear',
        angle: '0',
        start_color: '',
        start_pos: '0',
        end_color: '',
        end_pos: '100'
      }
    });

    onMounted(() => {
      state.gradient = props.value;
    });

    function updated() {
      emit('update.value', state.gradient);
    }

    watch(() => state.gradient, () => {
      updated();
    }, { deep: true });

    const backgroundImage = computed(() => {
      const gradient = state.gradient;

      if (gradient.type === 'linear') {
        return `${gradient.type}-gradient(${gradient.angle}deg, ${gradient.start_color} ${gradient.start_pos}%, ` +
          `${gradient.end_color} ${gradient.end_pos}%)`;
      }

      return `${gradient.type}-gradient(${gradient.start_color} ${gradient.start_pos}%, ` +
        `${gradient.end_color} ${gradient.end_pos}%)`;
    });

    return {
      ...toRefs(state),
      backgroundImage,

      updated
    };
  },
}
</script>

<style scoped>

</style>
