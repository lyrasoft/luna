<template>
  <div class="cation-selector">
    <div class="form-group">
      <label :for="id + '-name'">動畫名稱</label>
      <select :id="id + '-name'" class="form-control" v-model="animation.name">
        <option value="">無</option>
        <option v-for="anim of getAnimations()" :value="anim">
          {{ anim }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label :for="id + '-duration'">動畫持續時間</label>
      <input type="number" :id="id + '-duration'" class="form-control" v-model="animation.duration" min="0" />
      <small class="form-text text-muted">
        動畫的速度，單位: 微秒 (1/1000 秒)
      </small>
    </div>

    <div class="form-group">
      <label :for="id + '-delay'">等待時間</label>
      <input type="number" :id="id + '-delay'" class="form-control" v-model="animation.delay" min="0" />
      <small class="form-text text-muted">
        等待一定時間後才發生動畫，單位: 微秒 (1/1000 秒)
      </small>
    </div>
  </div>
</template>

<script>
export default {
  name: "animations",
  data() {
    return {
      animation: {}
    };
  },
  props: {
    value: Object,
    id: String
  },
  mounted() {
    this.animation = this.value;
  },
  methods: {
    getAnimations() {
      return [
        'fadeIn',
        'fadeInDown',
        'fadeInDownBig',
        'fadeInLeft',
        'fadeInLeftBig',
        'fadeInRight',
        'fadeInRightBig',
        'fadeInUp',
        'fadeInUpBig',

        'flip',
        'flipInX',
        'flipInY',

        'rotateIn',
        'rotateInDownLeft',
        'rotateInDownRight',
        'rotateInUpLeft',
        'rotateInUpRight',

        'zoomIn',
        'zoomInDown',
        'zoomInLeft',
        'zoomInRight',
        'zoomInUp',

        'bounceIn',
        'bounceInDown',
        'bounceInLeft',
        'bounceInRight',
        'bounceInUp'
      ];
    }
  },
  watch: {
    animation: {
      handler(anim) {
        this.$emit('change', anim);
        this.$emit('input', anim);
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
