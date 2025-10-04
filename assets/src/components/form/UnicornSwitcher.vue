<script lang="ts" setup>
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    id?: string;
    classes?: string;
    name?: string;
    disabled?: boolean;
    trueValue?: boolean | string | number;
    falseValue?: boolean | string | number;
    size?: string;
    color?: string;
    shape?: string;
  }>(), {
    trueValue: '1',
    falseValue: '0',
    size: 'default',
    color: 'primary',
    shape: 'square'
  }
);

function getDashedName(name: string) {
  return name.replace(/\[/g, '-').replace(/]/g, '');
}

const emit = defineEmits<{
  click: (event: MouseEvent) => void;
}>();

const idName = ref(props.id || '');
const currentValue = defineModel<any>({
  required: true,
});

if (!idName.value) {
  if (props.name) {
    idName.value = 'input-' + getDashedName(props.name);
  } else {
    idName.value = 'input-switch-' + u.uid();
  }
}

function changed($event: Event) {
  const target = $event.target as HTMLInputElement;

  currentValue.value = target.checked ? props.trueValue : props.falseValue;
}

function click($event: MouseEvent) {
  emit('click', $event);
}
</script>

<template>
  <label class="unicorn-switch" :for="idName" :class="[size ? 'switch-' + size : '']">
    <input :id="idName + '-unchecked'" :name="name" type="hidden"
      :value="falseValue"
      :disabled="disabled"
    />
    <input type="checkbox" :name="name" :id="idName" class="" :class="classes"
      :true-value="trueValue"
      :false-value="falseValue"
      :disabled="disabled"
      :value="trueValue"
      :checked="currentValue == trueValue"
      @change="changed"
      @click="click"
    >
    <span
      class="switch-slider"
      :class="['slider-' + shape, color ? 'btn-' + color : 'btn-default']"
    ></span>
  </label>
</template>

<style scoped>

</style>
