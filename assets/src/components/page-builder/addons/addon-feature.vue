<script lang="ts" setup>
import { AddonProps, useAddonDefaults } from '~luna/composables/useAddonDefaults';
import { AddonOptions, RwdOptions, RwdSteps } from '~luna/types';
import BoxOffset from '../../../components/page-builder/form/BoxOffset.vue';
import ButtonRadio from '../../../components/page-builder/form/ButtonRadio.vue';
import ColorInput from '../../../components/page-builder/form/ColorInput.vue';
import RwdGroup from '../../../components/page-builder/form/RwdGroup.vue';
import SingleImage from '../../../components/page-builder/form/SingleImage.vue';
import SliderInput from '../../../components/page-builder/form/SliderInput.vue';
import RwdTitleOptions from '../form/RwdTitleOptions.vue';

export interface AddonFeatureOptions {
  link: string;
  link_element: 'title' | 'icon' | 'both';
  layout_type: 'icon' | 'image';
  image: string;
  icon: {
    name: string;
    border: {
      width: RwdOptions<number>;
      color: string;
      style: string;
      radius: RwdOptions<number>;
    };
    font_size: RwdOptions<string>;
    color: string;
    bg_color: string;
    margin_top: RwdOptions<string>;
    margin_bottom: RwdOptions<string>;
    padding: RwdOptions<string>;
  };
  content: string;
  content_font_size: RwdOptions<string>;
  content_line_height: RwdOptions<string>;
}

defineProps<AddonProps>();

const options = defineModel<AddonOptions & AddonFeatureOptions>({ required: true });

useAddonDefaults(options, {
  link: '',
  link_element: 'title',
  layout_type: 'icon',
  image: '',
  icon: {
    name: 'fa fa-star',
    border: {
      width: { lg: 1, md: 1, xs: 1 },
      color: '',
      style: '',
      radius: { lg: 0, md: 0, xs: 0 }
    },
    font_size: { lg: '', md: '', xs: '' },
    color: '',
    bg_color: '',
    margin_top: { lg: '', md: '', xs: '' },
    margin_bottom: { lg: '', md: '', xs: '' },
    padding: { lg: '', md: '', xs: '' }
  },
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent malesuada est nec ' +
    'ligula aliquet bibendum. Ut lacinia risus quis feugiat ultrices. Morbi lacinia ut diam sed ' +
    'ultricies. Aliquam quis laoreet nisi, vel auctor risus. Nunc sed nisl lectus. Aliquam eget ' +
    'dignissim arcu, id volutpat ipsum. Donec ac arcu ac nibh sodales interdum. Nulla vulputate ',
  content_font_size: { lg: '', md: '', xs: '' },
  content_line_height: { lg: '', md: '', xs: '' },
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

    <!-- LINK -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-link">Link</label>
      <input id="input-addon-edit-link" type="url"
        v-model="options.link" class="form-control" />
    </div>

    <!-- LINK ELEMENT -->
    <div class="form-group mb-3" v-if="options.link !== ''">
      <label for="input-addon-edit-link-element">Link Element</label>
      <div>
        <ButtonRadio
          color="primary"
          variant="outline"
          class="w-100"
          v-model="options.link_element"
          :options="[
            { text: 'Title', value: 'title' },
            { text: 'Icon/Image', value: 'icon' },
            { text: 'Both', value: 'both' },
          ]"
        />
      </div>
    </div>

    <hr />

    <!-- Layout Type -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-layout-type">Layout Type</label>
      <div>
        <ButtonRadio
          color="primary"
          variant="outline"
          class="w-100"
          v-model="options.layout_type"
          :options="[
            { text: 'Icon', value: 'icon' },
            { text: 'Image', value: 'image' },
          ]"
        />
      </div>
    </div>

    <div v-if="options.layout_type === 'image'">
      <!-- Image -->
      <div class="form-group mb-3">
        <label for="input-addon-edit-image">Image</label>
        <SingleImage v-model="options.image"
          id="input-addon-edit-image"></SingleImage>
      </div>
    </div>

    <div v-if="options.layout_type === 'icon'">

      <!-- Icon -->
      <div class="form-group mb-3">
        <label for="input-addon-edit-icon-name">Icon Class</label>
        <div class="input-group mb-3">
          <span class="input-group-text">
              <span :class="options.icon.name"></span>
          </span>
          <input id="input-addon-edit-icon-name" type="text"
            v-model="options.icon.name" class="form-control" />
        </div>
        <small class="form-text text-muted">
          The icon class, for example: <code>fa fa-star</code>
          Find available icons on: <a target="_blank" href="https://fontawesome.com/icons">FontAwesome</a>.
        </small>
      </div>

      <!-- Title Font Size -->
      <RwdGroup class-name="c-title-font-size">
        <template #label>
          <label>
            Title Font Size
          </label>
        </template>
        <template v-for="size of ['lg', 'md', 'xs']" class="form-group mb-3"
          v-slot:[size]
          :class="'c-title-font-size__' + size">
          <SliderInput
            v-model="options.icon.font_size[size as RwdSteps]"
            :max="500"
          />
        </template>
      </RwdGroup>

      <div class="form-row row">
        <div class="col-6">
          <!-- Title Color -->
          <div class="form-group mb-3">
            <label for="input-addon-edit-icon-color">Color</label>
            <ColorInput id="input-addon-edit-icon-color"
              v-model.lazy="options.icon.color"
            />
          </div>
        </div>
        <div class="col-6">
          <!-- BG Color -->
          <div class="form-group mb-3">
            <label for="input-addon-edit-icon-bg_color">Background Color</label>
            <ColorInput id="input-addon-edit-icon-bg_color"
              v-model.lazy="options.icon.bg_color"
            />
          </div>
        </div>
      </div>

      <div class="form-row row">
        <div class="col-6">
          <!-- Title Margin Top -->
          <RwdGroup class-name="c-title-margin_top">
            <template #label>
              <label>
                Margin Top
              </label>
            </template>
            <template v-for="size of ['lg', 'md', 'xs']" class="form-group mb-3"
              v-slot:[size]
              :class="'c-title-margin_top__' + size">
              <input type="number" v-model="options.icon.margin_top[size as RwdSteps]" class="form-control" />
            </template>
          </RwdGroup>
        </div>
        <div class="col-6">
          <!-- Title Margin Bottom -->
          <RwdGroup class-name="c-title-margin_bottom">
            <template #label>
              <label>
                Margin Bottom
              </label>
            </template>
            <template v-for="size of ['lg', 'md', 'xs']" class="form-group mb-3"
              v-slot:[size]
              :class="'c-title-margin_bottom__' + size">
              <input type="number" v-model="options.icon.margin_bottom[size as RwdSteps]" class="form-control" />
            </template>
          </RwdGroup>
        </div>

        <!-- Padding -->
        <BoxOffset v-model="options.icon.padding">
          <template #label>
            <label>Icon Padding</label>
          </template>
        </BoxOffset>
      </div>

      <!-- Border Color -->
      <div class="form-group mb-3">
        <label for="input-addon-edit-border-color">Border Color</label>
        <ColorInput id="input-addon-edit-border-color"
          v-model.lazy="options.icon.border.color"
        />
      </div>

      <!-- Border Width -->
      <RwdGroup class-name="c-border-width">
        <template #label>
          <label>
            Border Width
          </label>
        </template>
        <template v-for="size of ['lg', 'md', 'xs']" class="form-group mb-3"
          v-slot:[size]
          :class="'c-border-width__' + size">
          <SliderInput
            v-model="options.icon.border.width[size as RwdSteps]"
          />
        </template>
      </RwdGroup>

      <!-- Border Style -->
      <div class="form-group mb-3">
        <label for="input-addon-edit-border-style">Border Style</label>
        <select id="input-addon-edit-border-style"
          v-model="options.icon.border.style" class="form-select custom-select">
          <option value="">None</option>
          <option value="solid">Solid</option>
          <option value="dotted">Dotted</option>
          <option value="dashed">Dashed</option>
          <option value="double">Double</option>
          <option value="groove">Groove</option>
          <option value="ridge">Ridge</option>
        </select>
      </div>

      <!-- Border Radius -->
      <RwdGroup class-name="c-border-radius">
        <template #label>
          <label>
            Border Radius
          </label>
        </template>
        <template v-for="size of ['lg', 'md', 'xs']" class="form-group mb-3"
          v-slot:[size]
          :class="'c-border-radius__' + size">
          <SliderInput
            v-model="options.icon.border.radius[size as RwdSteps]"
          />
        </template>
      </RwdGroup>

    </div>

    <hr />

    <div class="form-group mb-3">
      <label for="addon-edit-content">Content</label>
      <textarea id="addon-edit-content" v-model="options.content" v-tinymce class="form-control"></textarea>
    </div>

    <!-- Content Align -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-content-align">Content Alignment</label>
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
          v-model="options.content_font_size[size as RwdSteps]"
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
          v-model="options.content_line_height[size as RwdSteps]"
          :max="500"
        />
      </template>
    </RwdGroup>
  </div>
</template>

<style scoped>

</style>
