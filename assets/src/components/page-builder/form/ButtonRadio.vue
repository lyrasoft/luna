<script lang="ts" setup>
import { uid } from '@windwalker-io/unicorn-next';
import { ref, watch } from 'vue';

interface Option {
  value: string | number;
  text?: string;
  color?: string;
  variant?: string;
}

const props = withDefaults(
  defineProps<{
    color?: string;
    size?: string;
    options?: Option[];
  }>(),
  {
    color: 'secondary',
    size: 'lg',
    options: () => []
  }
);
const emit = defineEmits();

const id = ref(uid());
const value = defineModel<string | number>({
  required: true
});

function updateValue(option: Option) {
  value.value = option.value;
}

function buttonColor(option: Option) {
  if (!option.color) {
    return 'btn-outline-' + props.color;
  }
  return 'btn-' + (option.variant || 'outline') + '-' + option.color;
}
</script>

<template>
  <div class="btn-group">
    <template v-for="option of props.options" :key="option.value">
      <input type="radio" class="btn-check"
        :id="id + '__' + option.value"
        :name="id"
        :value="option.value"
        :checked="option.value === value"
        v-model="value"
        autocomplete="off">
      <label class="btn" :for="id + '__' + option.value"
        @change="updateValue(option)"
        :class="[ buttonColor(option), `btn-${props.size}` ]">
        {{ option.text || option.value }}
      </label>
    </template>
  </div>
</template>

<style scoped>

</style>
