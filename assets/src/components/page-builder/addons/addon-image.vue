<script lang="ts" setup>
import { AddonProps, useAddonDefaults } from '~luna/composables/useAddonDefaults';
import { AddonOptions } from '~luna/types';
import ButtonRadio from '../../../components/page-builder/form/ButtonRadio.vue';
import SingleImage from "../../../components/page-builder/form/SingleImage.vue";
import SliderInput from '../../../components/page-builder/form/SliderInput.vue';
import UnicornSwitcher from '../../form/UnicornSwitcher.vue';
import RwdTitleOptions from '../form/RwdTitleOptions.vue';

export interface AddonImageOptions {
  image: string;
  border_radius: string;
  alt: string;
  link: string;
  link_target: string;
  align: '' | 'left' | 'center' | 'right';
}

defineProps<AddonProps>();

const options = defineModel<AddonOptions & AddonImageOptions>({ required: true });

useAddonDefaults(options, {
  image: '',
  border_radius: '',
  alt: '',
  link: '',
  link_target: '',
  align: '',
});

</script>

<template>
  <div>
    <!-- Title -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-title-text">Title</label>
      <textarea id="input-addon-edit-title-text"
        v-model="options.title.text" class="form-control"></textarea>
      <small class="form-text text-muted">The main title of this section, keep empty to hide it.</small>
    </div>

    <RwdTitleOptions v-if="options.title.text !== ''"
      id="input-addon-edit" v-model="options.title"></RwdTitleOptions>

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

<style scoped>

</style>
