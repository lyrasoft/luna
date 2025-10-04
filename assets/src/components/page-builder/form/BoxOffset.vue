<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from 'vue';
import RwdGroup from "./RwdGroup.vue";
import { each } from 'lodash-es';

// Todo: Must rewrite this

const props = defineProps<{ modelValue: Record<string, string> }>();
const emit = defineEmits(['update:modelValue']);

const offsets = reactive({
  xs: { top: '', right: '', bottom: '', left: '' },
  md: { top: '', right: '', bottom: '', left: '' },
  lg: { top: '', right: '', bottom: '', left: '' }
});
const lock = ref(false);
const currentSize = ref('desktop');

function getAllValues() {
  const values: Record<string, string> = {};
  each(offsets, (offset, size) => {
    values[size] = `${offset.top},${offset.right},${offset.bottom},${offset.left}`;
  });
  return values;
}

function extractValue(value: Record<string, string>) {
  each(value, (offset, size) => {
    const [top, right, bottom, left] = (offset || '').split(',');
    offsets[size] = offsets[size] || { top: '', right: '', bottom: '', left: '' };
    offsets[size].top = top || '';
    offsets[size].right = right || '';
    offsets[size].bottom = bottom || '';
    offsets[size].left = left || '';
  });
}

onMounted(() => {
  extractValue(props.modelValue);

  each(offsets, (offset, size) => {
    each(offset, (value, pos) => {
      watch(() => offsets[size][pos], (v) => {
        if (lock.value) {
          offset.top = v;
          offset.right = v;
          offset.bottom = v;
          offset.left = v;
        }
        const allValue = getAllValues();
        emit('update:modelValue', allValue);
      });
    });
  });
});

watch(() => props.modelValue, (value) => {
  extractValue(value);
});
</script>

<template>
  <RwdGroup class-name="c-box-offset">
    <template #label>
      <div class="mb-2">
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
  </RwdGroup>
</template>

<style scoped>

</style>
