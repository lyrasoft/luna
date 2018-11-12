/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(() => {
  Vue.component('rwd-group', {
    template: `
<div class="form-group" :class="getClassName()">
    <div class="d-flex" :class="getClassName('__title')">
        <div class="">
                <slot name="label"></slot>
        </div>
        <div class="ml-auto" :class="getClassName('__rwd-control')">
            <a href="javascript://" :class="[currentSize === 'lg' ? 'active' : 'text-dark']" @click="currentSize = 'lg'">
                <span class="fa fa-fw fa-desktop"></span>
            </a>
            <a href="javascript://" :class="[currentSize === 'md' ? 'active' : 'text-dark']" @click="currentSize = 'md'">
                <span class="fas fa-fw fa-tablet"></span>
            </a>
            <a href="javascript://" :class="[currentSize === 'xs' ? 'active' : 'text-dark']" @click="currentSize = 'xs'">
                <span class="fas fa-fw fa-mobile"></span>
            </a>
        </div>
    </div>

    <div :class="getClassName('__inputs')">
        <slot name="lg" v-if="currentSize === 'lg'"></slot>
        <slot name="md" v-if="currentSize === 'md'"></slot>
        <slot name="xs" v-if="currentSize === 'xs'"></slot>
    </div>

    <slot name="description"></slot>
</div>
    `,
    data() {
      return {
        currentSize: ''
      }
    },
    props: {
      name: String,
      className: {
        default: 'c-rwd-group',
        type: String
      }
    },
    mounted() {
      // Fix DOM loading issues
      setTimeout(() => {
        this.currentSize = 'lg';
      }, 150);
    },
    methods: {
      getClassName(suffix = '') {
        return this.className + suffix;
      }
    },
    watch: {

    }
  });
});
