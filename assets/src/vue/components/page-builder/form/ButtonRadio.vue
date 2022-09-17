<template>
  <div class="btn-group">
    <template v-for="option of options">
      <input type="radio" class="btn-check"
        :id="uid + '__' + option.value"
        :name="uid"
        :value="option.value"
        :checked="option.value === value"
        v-model="value"
        autocomplete="off">
      <label class="btn" :for="uid + '__' + option.value"
        @change="updateValue(option)"
        :class="[ buttonColor(option), `btn-${size}` ]">
        {{ option.text || option.value }}
      </label>
    </template>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'ButtonRadio',
  components: {
  },
  props: {
    modelValue: {
      default: ''
    },
    color: {
      type: String,
      default: 'secondary'
    },
    size: {
      type: String,
      default: ''
    },
    options: Array
  },
  setup(props, { emit }) {
    const uid = ref('br-' + u.uid());
    const value = ref(props.modelValue);

    function updateValue(option) {
      value.value = option.value;

      console.log(value);
    }

    watch(value, () => {
      console.log(value);
      emit('update:modelValue', value);
    });

    function buttonColor(option) {
      if (!option.color) {
        return 'btn-outline-' + props.color;
      }

      return 'btn-' + option.variant + '-' + option.color;
    }

    return {
      uid,
      value,
      updateValue,
      buttonColor
    };
  }
};
</script>

<style scoped>

</style>
