/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */


$(() => {
  Vue.component('radio-button', {
    template: `
<button type="button" class="btn flex-fill" :data-value="value"
    @click="select()"
    :class="[active ? activeClass : 'btn-outline-secondary']">
    <slot></slot>
</button>`,
    data() {
      return {
        active: false
      }
    },
    props: {
      value: String,
      activeClass: {
        default: 'btn-success'
      }
    },
    mounted() {
      this.active = this.$parent.value === this.value;

      this.$parent.$on('button-selected', (value) => {
        this.active = value === this.value;
      });
    },
    methods: {
      select() {
        this.$parent.$emit('button-selected', this.value);
      }
    }
  });

  Vue.component('radio-buttons', {
    template: `
<div class="btn-group">
  <slot></slot>
</div>
    `,
    data() {
      return {
      }
    },
    props: {
      value: String,
    },
    mounted() {
      this.$on('button-selected', (value) => {
        this.$emit('change', value);
        this.$emit('input', value);
      });

      // this.$nextTick(() => {
      //   this.$parent.$emit('button-selected', this.value);
      // });
    },
    methods: {

    },
    watch: {
      value(value) {
        this.$parent.$emit('button-selected', value);
      }
    }
  });
});
