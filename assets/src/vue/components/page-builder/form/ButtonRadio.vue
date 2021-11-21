<template>
  <div class="btn-group" :class="[`btn-${size}`]">
    <CFormCheck v-for="option of options"
      type="radio"
      :name="uid"
      :id="uid + '__' + option.value"
      :label="option.text || option.value"
      :value="option.value"
      :button="{ color: option.color || color, variant: option.variant || variant }"
      @change="value = option.value"
      :checked="option.value === value"
      :class="[`btn-${size}`]"
    >
    </CFormCheck>
  </div>
</template>

<script>
import { CFormCheck } from '@coreui/vue';
import { ref, watch } from 'vue';

export default {
  name: 'ButtonRadio',
  components: {
    CFormCheck,
  },
  props: {
    modelValue: {
      defualt: ''
    },
    color: {
      type: String,
      defualt: 'secondary'
    },
    variant: {
      type: String,
    },
    size: {
      type: String,
      defualt: ''
    },
    options: Array
  },
  setup(props, { emit }) {
    const uid = ref('br-' + u.uid());
    const value = ref(props.modelValue);

    function updateValue(vaule) {
      console.log(value);
    }

    watch(value, () => {
      emit('update:modelValue', value);
    });

    return {
      uid,
      value,
      updateValue
    };
  }
};
</script>

<style scoped>

</style>
