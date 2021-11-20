<template>
  <div class="form-group mb-3" :class="getClassName()">
    <div class="d-flex" :class="getClassName('__title')">
      <div class="">
        <slot name="label"></slot>
      </div>
      <div class="ml-auto ms-auto" :class="getClassName('__rwd-control')">
        <!--<a href="javascript://" :class="[currentSize === 'xl' ? 'active' : 'text-dark']" @click="currentSize = 'xl'">-->
        <!--  <span class="fa fa-fw fa-panorama"></span>-->
        <!--</a>-->
        <a href="javascript://" :class="[currentSize === 'lg' ? 'active' : 'text-dark']" @click="currentSize = 'lg'">
          <span class="fa fa-fw fa-desktop"></span>
        </a>
        <a href="javascript://" :class="[currentSize === 'md' ? 'active' : 'text-dark']" @click="currentSize = 'md'">
          <span class="fa fa-fw fa-tablet-screen-button"></span>
        </a>
        <a href="javascript://" :class="[currentSize === 'xs' ? 'active' : 'text-dark']" @click="currentSize = 'xs'">
          <span class="fa fa-fw fa-mobile-screen-button"></span>
        </a>
      </div>
    </div>

    <div :class="getClassName('__inputs')">
      <!--<slot name="xl" v-if="currentSize === 'xl'"></slot>-->
      <slot name="lg" v-if="currentSize === 'lg'"></slot>
      <slot name="md" v-if="currentSize === 'md'"></slot>
      <slot name="xs" v-if="currentSize === 'xs'"></slot>
    </div>

    <slot name="description"></slot>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  name: "RwdGroup",
  props: {
    name: String,
    className: {
      default: 'c-rwd-group',
      type: String
    }
  },
  setup(props) {
    const currentSize = ref('');

    onMounted(() => {
      // Fix DOM loading issues
      setTimeout(() => {
        currentSize.value = 'lg';
      }, 150);
    });

    function getClassName(suffix = '') {
      return props.className + suffix;
    }

    return {
      currentSize,

      getClassName
    };
  },
}
</script>

<style scoped>

</style>
