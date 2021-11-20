<template>
  <div>
    <!-- Title -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-title-text">Title</label>
      <textarea id="input-addon-edit-title-text"
        v-model="options.title.text"
        class="form-control"></textarea>
      <small class="form-text text-muted">The main title of this section, keep empty to hide it.</small>
    </div>

    <title-options v-if="options.title.text !== ''"
      id="input-addon-edit" v-model="options" />

    <hr />

    <div class="form-group mb-3">
      <label for="addon-edit-content">Content</label>
      <textarea id="addon-edit-content" v-model="options.content" v-tinymce class="form-control"></textarea>
    </div>

    <!-- Content Align -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-title-align">Content Alignment</label>
      <div class="mt-2">
        <b-form-radio-group v-model="options.align" class="btn-block" buttons button-variant="outline-primary">
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

    <!-- Content Font Size -->
    <rwd-group class-name="c-title-font-size">
      <label slot="label">
        Content Font Size
      </label>
      <div v-for="size of ['lg', 'md', 'xs']" class="form-group mb-3" :slot="size"
        :class="'c-content-font-size-height__' + size">
        <div class="d-flex">
          <vue-slide-bar v-model="options.content_font_size[size]" class="flex-grow-1" :max="500"></vue-slide-bar>
          <input type="text" class="form-control ml-2 ms-2 mt-2" style="width: 3.5rem;"
            v-model="options.content_font_size[size]" />
        </div>
      </div>
    </rwd-group>

    <!-- Content Line Height -->
    <rwd-group class-name="c-title-line-height">
      <label slot="label">
        Content Line Height
      </label>
      <div v-for="size of ['lg', 'md', 'xs']" class="form-group mb-3" :slot="size"
        :class="'c-content-line-height__' + size">
        <div class="d-flex">
          <vue-slide-bar v-model="options.content_line_height[size]" class="flex-grow-1" :max="500"></vue-slide-bar>
          <input type="text" class="form-control ml-2 ms-2 mt-2" style="width: 3.5rem;"
            v-model="options.content_line_height[size]" />
        </div>
      </div>
    </rwd-group>
  </div>

</template>

<script>
import { initLangKey, langs } from '@/services/page-builder/store.js';
import { BFormRadio, BFormRadioGroup } from 'bootstrap-vue';
import TitleOptions from "../form/title-options";
import RwdGroup from "../form/rwd-group";
export default {
  name: "addon-text",
  components: {
    TitleOptions,
    RwdGroup,
    BFormRadioGroup,
    BFormRadio
  },
  mixins: [LunaAddonMixin],
  data() {
    return {
      options: {
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium, ' +
          'massa dictum hendrerit maximus, ex est semper est, quis sodales odio elit a urna. ' +
          'Pellentesque dapibus vel orci id lacinia. Curabitur dui purus, condimentum ' +
          'vitae dapibus ut, rhoncus vitae sem. Donec dignissim, dui ut sollicitudin ' +
          'consectetur, est lacus elementum mi, sit amet imperdiet nisl metus at nunc.',
        content_font_size: {
          lg: '',
          md: '',
          xs: ''
        },
        content_line_height: {
          lg: '',
          md: '',
          xs: ''
        }
      },
      langs
    }
  },
  // mounted() {
  //   initLangKey(this.addonId, 'content', this.options.content);
  //
  //   this.options.content = langs[`${this.addonId}__title`] || this.options.content;
  // }
}
</script>

<style scoped>

</style>
