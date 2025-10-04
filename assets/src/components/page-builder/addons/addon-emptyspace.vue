<script lang="ts" setup>
import { AddonProps, useAddonDefaults } from '~luna/composables/useAddonDefaults';
import { AddonOptions, RwdOptions } from '~luna/types';
import RwdGroup from '../../../components/page-builder/form/RwdGroup.vue';
import SliderInput from '../../../components/page-builder/form/SliderInput.vue';
import UnicornSwitcher from '../../form/UnicornSwitcher.vue';

export interface AddonEmptySpaceOptions {
  height: RwdOptions;
  link: string;
  link_target: string;
}

defineProps<AddonProps>();

const options = defineModel<AddonOptions & AddonEmptySpaceOptions>({ required: true });

useAddonDefaults(options, {
  height: {
    lg: '',
    md: '',
    xs: ''
  },
  link: '',
  link_target: ''
});
</script>
<template>
  <div>
    <!-- Border Radius -->
    <RwdGroup class-name="c-empty-height">
      <template #label>
        <label>
          Height
        </label>
      </template>
      <template v-for="size of ['lg', 'md', 'xs']" class="form-group mb-3"
        v-slot:[size]
        :class="'c-empty-height__' + size">
        <SliderInput
          v-model="options.height[size]"
          :max="1000"
        />
      </template>
    </RwdGroup>

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
  </div>
</template>

<style scoped>

</style>
