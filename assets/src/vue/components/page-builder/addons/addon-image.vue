<template>
  <div>
    <!-- Title -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-title-text">Title</label>
      <textarea id="input-addon-edit-title-text"
        v-model="options.title.text" class="form-control"></textarea>
      <small class="form-text text-muted">The main title of this section, keep empty to hide it.</small>
    </div>

    <title-options v-if="options.title.text !== ''"
      id="input-addon-edit" v-model="options"></title-options>

    <hr />

    <!-- Image -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-image">Image</label>
      <single-image v-model="options.image"
        id="input-addon-edit-image"></single-image>
    </div>

    <!-- LINK -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-link">Link</label>
      <input id="input-addon-edit-link" type="url"
        v-model="options.link" class="form-control" />
    </div>

    <!-- New Window -->
    <div class="form-group mb-3" v-if="options.link !== '' && $sa">
      <label for="input-addon-edit-link-target">Open in New Window</label>
      <div>
        <unicorn-switcher name="addon-edit-link-target"
          v-model="options.link_target"
          id="input-addon-edit-link-target"
          shape="circle"
          color="success"
          true-value="_blank"
          false-value=""></unicorn-switcher>
      </div>
    </div>

    <!-- Alt -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-alt">Alt Text</label>
      <input id="input-addon-edit-alt" type="text"
        v-model="options.alt" class="form-control" />
      <small class="form-text text-muted">
        The alt text if image unavailable, also good for SEO.
      </small>
    </div>

    <!-- Radius -->
    <div class="form-group mb-3" v-if="prepared && $sa">
      <label>
        Border Radius
      </label>
      <div class="d-flex">
        <vue-slide-bar v-model="options.border_radius" class="flex-grow-1" :max="1200"></vue-slide-bar>
        <input type="text" class="form-control ml-2 ms-2 mt-2" style="width: 3.5rem;"
          v-model="options.border_radius" />
      </div>
    </div>

    <!-- Align -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-align">Image Alignment</label>
      <div class="mt-2">
        <b-form-radio-group v-model="options.align" class="btn-block"  buttons button-variant="outline-primary">
          <b-form-radio value="">
            Default
          </b-form-radio>
          <b-form-radio value="left">
            Left
          </b-form-radio>
          <b-form-radio value="center">
            Center
          </b-form-radio>
          <b-form-radio value="right">
            Right
          </b-form-radio>
        </b-form-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
import { BFormRadio, BFormRadioGroup } from 'bootstrap-vue';
import TitleOptions from "../form/title-options";
import RwdGroup from "../form/rwd-group";
import SingleImage from "../form/single-image";
import BoxOffset from "../form/box-offset";

export default {
  name: "addon-image",
  components: {
    TitleOptions,
    RwdGroup,
    SingleImage,
    BoxOffset,
    BFormRadioGroup,
    BFormRadio
  },
  mixins: [LunaAddonMixin],
  data() {
    return {
      options: {
        image: '',
        border_radius: '',
        alt: '',
        link: '',
        link_target: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
