<script lang="ts" setup>
import { type AddonProps, useAddonDefaults } from '~luna/composables/useAddonDefaults';
import { AddonOptions } from '~luna/types';
import ButtonRadio from '../../../components/page-builder/form/ButtonRadio.vue';
import RwdGroup from '../../../components/page-builder/form/RwdGroup.vue';
import SliderInput from '../../../components/page-builder/form/SliderInput.vue';
import RwdTitleOptions from '../form/RwdTitleOptions.vue';

export interface AddonTextOptions {
  content: string;
  content_font_size: {
    lg: string;
    md: string;
    xs: string;
  };
  content_line_height: {
    lg: string;
    md: string;
    xs: string;
  };
}

defineProps<AddonProps>();

const options = defineModel<AddonOptions & AddonTextOptions>({ required: true });

useAddonDefaults(options, {
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
});
</script>

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

    <RwdTitleOptions v-if="options.title.text !== ''"
      id="input-addon-edit" v-model="options.title" />

    <hr />

    <div class="form-group mb-3">
      <label for="addon-edit-content">Content</label>
      <textarea id="addon-edit-content" v-model="options.content" v-tinymce class="form-control"></textarea>
    </div>

    <!-- Content Align -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-title-align">Content Alignment</label>
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

    <!-- Content Font Size -->
    <RwdGroup class-name="c-content-font-size">
      <template #label>
        <label>
          Content Font Size
        </label>
      </template>
      <template v-for="size of ['lg', 'md', 'xs']" class="form-group mb-3"
        v-slot:[size]
        :class="'c-content-font-size-height__' + size">
        <SliderInput
          v-model="options.content_font_size[size as 'lg' | 'md' | 'xs']"
          :max="500"
        />
      </template>
    </RwdGroup>

    <!-- Content Line Height -->
    <RwdGroup class-name="c-content-line-height">
      <template #label>
        <label>
          Content Line Height
        </label>
      </template>
      <template v-for="size of ['lg', 'md', 'xs']" class="form-group mb-3"
        v-slot:[size]
        :class="'c-content-line-height__' + size">
        <SliderInput
          v-model="options.content_line_height[size as 'lg' | 'md' | 'xs']"
          :max="500"
        />
      </template>
    </RwdGroup>
  </div>
</template>

<style scoped>

</style>
