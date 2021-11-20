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

    <TitleOptions v-if="options.title.text !== ''"
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
          v-model="options.content_font_size[size]"
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
          v-model="options.content_line_height[size]"
          :max="500"
        />
      </template>
    </RwdGroup>
  </div>

</template>

<script>
import ButtonRadio from '@/components/page-builder/form/ButtonRadio';
import RwdGroup from '@/components/page-builder/form/RwdGroup';
import SliderInput from '@/components/page-builder/form/SliderInput';
import TitleOptions from '@/components/page-builder/form/TitleOptions';
import { toRefs } from 'vue';
export default {
  name: "addon-text",
  components: {
    TitleOptions,
    ButtonRadio,
    SliderInput,
    RwdGroup
  },
  props: {
    ...lunaAddonMixin.props
  },
  setup(props, ctx) {
    const state = lunaAddonMixin(props, ctx, {
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
    });

    return {
      ...toRefs(state),
    }
  },
}
</script>

<style scoped>

</style>
