<template>
  <rwd-group class-name="c-box-offset">
    <div slot="label" class="mb-3">
      <slot name="label"></slot>
      <a href="javascript://" @click="lock = !lock">
        <span class="fa" :class="[lock ? 'fa-lock' : 'fa-lock-open']"></span>
      </a>
    </div>
    <div v-for="size of ['lg', 'md', 'xs']" class="form-group" :slot="size" :class="'c-box-offset__' + size">
      <div class="form-row">
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
    </div>
  </rwd-group>
</template>

<script>
import RwdGroup from "./rwd-group";
import { each } from 'lodash';

export default {
  name: "box-offset",
  components: { RwdGroup },
  data() {
    return {
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
    }
  },
  props: {
    value: Object
  },
  mounted() {
    this.extractValue(this.value);

    each(this.offsets, (offset, size) => {
      each(offset, (value, pos) => {
        this.$watch(`offsets.${size}.${pos}`, (v) => {
          if (this.lock) {
            offset.top = v;
            offset.right = v;
            offset.bottom = v;
            offset.left = v;
          }

          const allValue = this.getAllValues();

          this.$emit('change', allValue);
          this.$emit('input', allValue);
        });
      })
    });
  },
  methods: {
    getAllValues() {
      const values = {};

      each(this.offsets, (offset, size) => {
        values[size] = `${offset.top},${offset.right},${offset.bottom},${offset.left}`;
      });

      return values;
    },

    extractValue(value) {
      each(value, (offset, size) => {
        const [top, right, bottom, left] = offset.split(',');

        this.offsets[size] = this.offsets[size] || {};

        this.offsets[size].top = top || '';
        this.offsets[size].right = right || '';
        this.offsets[size].bottom = bottom || '';
        this.offsets[size].left = left || '';
      });
    }
  },
  watch: {
    value(value) {
      this.extractValue(value);
    }
  }
}
</script>

<style scoped>

</style>
