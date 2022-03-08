<template>
  <label class="unicorn-switch" :for="idName" :class="[size ? 'switch-' + size : '']">
    <input :id="idName + '-unchecked'" :name="name" type="hidden"
      :value="falseValue"
      :disabled="disabled"
    />
    <input type="checkbox" :name="name" :id="idName" class="" :class="classes"
      :true-value="trueValue" :false-value="falseValue" :disabled="disabled"
      :value="trueValue"
      :checked="currentValue == trueValue"
      @change="changed"
      @click="click">
    <span
      class="switch-slider"
      :class="['slider-' + shape, color ? 'btn-' + color : 'btn-default']"
    ></span>
  </label>
</template>

<script>
export default {
  name: 'UnicornSwitcher',
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },
  data() {
    return {
      idName: '',
      currentValue: null
    }
  },
  props: {
    id: String,
    classes: String,
    modelValue: null,
    name: String,
    disabled: Boolean,
    trueValue: {
      default: '1'
    },
    falseValue: {
      default: '0'
    },
    size: {
      type: String,
      default: 'default'
    },
    color: {
      type: String,
      default: 'primary'
    },
    shape: {
      type: String,
      default: 'square'
    }
  },
  created() {
    this.idName = this.id;

    if (!this.idName) {
      if (this.name) {
        this.idName = 'input-' + this.getDashedName();
      } else {
        this.idName = 'input-switch-' + u.uid();
      }
    }

    this.currentValue = this.modelValue;
  },
  methods: {
    getDashedName() {
      return this.name.replace(/\[/g, '-').replace(/]/, '');
    },
    changed($event) {
      this.currentValue = $event.srcElement.checked ? this.trueValue : this.falseValue;
    },
    click($event) {
      this.$emit('click', $event);
    }
  },
  watch: {
    currentValue() {
      this.$emit('update:modelValue', this.currentValue);
    },

    modelValue() {
      this.currentValue = this.modelValue;
    }
  }
};
</script>

<style scoped>

</style>
