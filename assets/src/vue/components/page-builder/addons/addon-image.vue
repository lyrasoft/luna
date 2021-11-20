<template>
  <div>
    <!-- Title -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-title-text">Title</label>
      <textarea id="input-addon-edit-title-text"
        v-model="options.title.text" class="form-control"></textarea>
      <small class="form-text text-muted">The main title of this section, keep empty to hide it.</small>
    </div>

    <TitleOptions v-if="options.title.text !== ''"
      id="input-addon-edit" v-model="options"></TitleOptions>

    <hr />

    <!-- Image -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-image">Image</label>
      <SingleImage v-model="options.image"
        id="input-addon-edit-image"></SingleImage>
    </div>

    <!-- LINK -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-link">Link</label>
      <input id="input-addon-edit-link" type="url"
        v-model="options.link" class="form-control" />
    </div>

    <!-- New Window -->
    <div class="form-group mb-3" v-if="options.link !== ''">
      <label for="input-addon-edit-link-target">Open in New Window</label>
      <div>
        <UnicornSwitcher name="addon-edit-link-target"
          v-model="options.link_target"
          id="input-addon-edit-link-target"
          shape="circle"
          color="success"
          true-value="_blank"
          false-value=""
        />
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
    <div class="form-group mb-3">
      <label>
        Border Radius
      </label>
      <SliderInput
        v-model="options.border_radius"
        :max="1200"
      />
    </div>

    <!-- Align -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-align">Image Alignment</label>
      <div class="mt-2">
        <ButtonRadio
          color="primary"
          variant="outline"
          class="w-100"
          v-model="options.align"
          :options="[
            { text: 'Default', value: '' },
            { text: 'Left', value: 'left' },
            { text: 'Center', value: 'center' },
            { text: 'Right', value: 'right' },
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonRadio from '@/components/page-builder/form/ButtonRadio';
import lunaAddonMixin from '@/services/page-builder/addon-mixin';
import UnicornSwitcher from '@/components/form/UnicornSwitcher';
import SingleImage from '@/components/page-builder/form/SingleImage';
import SliderInput from '@/components/page-builder/form/SliderInput';
import TitleOptions from '@/components/page-builder/form/TitleOptions';
import { toRefs } from 'vue';
export default {
  name: "addon-image",
  components: {
    ButtonRadio,
    SliderInput,
    UnicornSwitcher,
    SingleImage,
    TitleOptions
  },
  props: {
    ...lunaAddonMixin.props
  },
  setup(props, ctx) {
    const state = lunaAddonMixin(props, ctx, {
      options: {
        image: '',
        border_radius: '',
        alt: '',
        link: '',
        link_target: ''
      }
    });

    return {
      ...toRefs(state)
    };
  }
}
</script>

<style scoped>

</style>
