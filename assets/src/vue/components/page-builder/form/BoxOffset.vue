<template>
  <rwd-group class-name="c-box-offset">
    <template #label class="mb-3">
      <div>
        <slot name="label"></slot>
        <a href="javascript://" @click="lock = !lock">
          <span class="fa" :class="[lock ? 'fa-lock' : 'fa-lock-open']"></span>
        </a>
      </div>
    </template>
    <template v-for="size of ['lg', 'md', 'xs']"
      v-slot:[size]
      class="form-group mb-3"
      :class="'c-box-offset__' + size"
    >
      <div class="form-row row">
        <div class="col-3">
          <input type="text" class="form-control" placeholder="Top" v-model="offsets[size].top" />
        </div>
        <div class="col-3">
          <input type="text" class="form-control" placeholder="Right" v-model="offsets[size].right" />
        </div>
        <div class="col-3">
          <input type="text" class="form-control" placeholder="Bottom" v-model="offsets[size].bottom" />
        </div>
        <div class="col-3">
          <input type="text" class="form-control" placeholder="Left" v-model="offsets[size].left" />
        </div>
      </div>
    </template>
  </rwd-group>
</template>

<script>
import { onMounted, reactive, toRefs, watch } from 'vue';
import RwdGroup from "./RwdGroup";
import { each } from 'lodash-es';

export default {
  name: "box-offset",
  components: { RwdGroup },
  props: {
    value: Object
  },
  setup(props, { emit }) {
    const state = reactive({
      offsets: {
        xs: {
          top: '',
          right: '',
          bottom: '',
          left: ''
        },
        md: {
          top: '',
          right: '',
          bottom: '',
          left: ''
        },
        lg: {
          top: '',
          right: '',
          bottom: '',
          left: ''
        }
      },
      currentSize: 'desktop',
      lock: false
    });
    
    onMounted(() => {
      extractValue(props.value);

      each(state.offsets, (offset, size) => {
        each(offset, (value, pos) => {
          watch(() => state.offsets[size][pos], (v) => {
            if (state.lock) {
              offset.top = v;
              offset.right = v;
              offset.bottom = v;
              offset.left = v;
            }

            const allValue = getAllValues();

            emit('update:value', allValue);
          });
        })
      });
    });

    function getAllValues() {
      const values = {};

      each(state.offsets, (offset, size) => {
        values[size] = `${offset.top},${offset.right},${offset.bottom},${offset.left}`;
      });

      return values;
    }

    function extractValue(value) {
      each(value, (offset, size) => {
        const [top, right, bottom, left] = offset.split(',');

        state.offsets[size] = state.offsets[size] || {};

        state.offsets[size].top = top || '';
        state.offsets[size].right = right || '';
        state.offsets[size].bottom = bottom || '';
        state.offsets[size].left = left || '';
      });
    }
    
    watch(() => props.value, () => {
      extractValue(value);
    });
    
    return {
      ...toRefs(state)
    };
  },
}
</script>

<style scoped>

</style>
