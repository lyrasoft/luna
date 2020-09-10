<template>
  <div>
    <!-- Border Radius -->
    <rwd-group class-name="c-empty-height">
      <label slot="label">
        高度
      </label>
      <div v-for="size of ['lg', 'md', 'xs']" class="form-group" :slot="size"
        :class="'c-empty-height__' + size">
        <div class="d-flex">
          <vue-slide-bar v-model="options.height[size]" class="flex-grow-1" :max="1000"></vue-slide-bar>
          <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
            v-model="options.height[size]" />
        </div>
      </div>
    </rwd-group>
  </div>
</template>

<script>
import TitleOptions from "../form/title-options";
import RwdGroup from "../form/rwd-group";

export default {
  name: "addon-empty",
  components: { TitleOptions, RwdGroup },
  mixins: [LunaAddonMixin],
  data() {
    return {
      options: {
        height: {
          lg: '',
          md: '',
          xs: ''
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
