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

    <!-- LINK -->
    <div class="form-group">
      <label for="input-addon-edit-link">連結</label>
      <input id="input-addon-edit-link" type="url"
        v-model="options.link" class="form-control" />
    </div>

    <!-- New Window -->
    <div class="form-group" v-if="options.link !== ''">
      <label for="input-addon-edit-link-target">新頁面開啟</label>
      <div>
        <phoenix-switch name="addon-edit-link-target"
          v-model="options.link_target"
          id="input-addon-edit-link-target"
          shape="circle"
          color="success"
          true-value="_blank"
          false-value=""></phoenix-switch>
      </div>
    </div>
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
        },
        link: '',
        link_target: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
