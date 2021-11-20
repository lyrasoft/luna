<template>
  <div>
    <!-- Text -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-text">Button Text</label>
      <input id="input-addon-edit-text" type="text"
        v-model="options.text" class="form-control" />
    </div>

    <!-- Align -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-align">Align</label>
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

    <!-- Style -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-style">Style</label>
      <input type="search" id="input-addon-edit-style"
        v-model="options.style" class="form-control"
        :list="`input-edit-style__list-${uid}`"
      />
      <datalist :id="`input-edit-style__list-${uid}`">
        <option value="btn-primary">btn-primary</option>
        <option value="btn-outline-primary">btn-outline-primary</option>
        <option value="btn-secondary">btn-secondary</option>
        <option value="btn-outline-secondary">btn-outline-secondary</option>
        <option value="btn-success">btn-success</option>
        <option value="btn-outline-success">btn-outline-success</option>
        <option value="btn-info">btn-info</option>
        <option value="btn-outline-info">btn-outline-info</option>
        <option value="btn-warning">btn-warning</option>
        <option value="btn-outline-warning">btn-outline-warning</option>
        <option value="btn-danger">btn-danger</option>
        <option value="btn-outline-danger">btn-outline-danger</option>
        <option value="btn-dark">btn-dark</option>
        <option value="btn-outline-dark">btn-outline-dark</option>
        <option value="btn-light">btn-light</option>
        <option value="btn-outline-light">btn-outline-light</option>
        <option value="btn-link">btn-link</option>
      </datalist>
      <small class="form-text text-muted">
        Use <a href="https://getbootstrap.com/docs/5.1/components/buttons/" target="_blank">Bootstrap button style</a>
        , if you need a custom style, just enter your button class names.
      </small>
    </div>

    <!-- Size -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-size">Size</label>
      <select id="input-addon-edit-size"
        v-model="options.size" class="form-select custom-select"
        >
        <option value="">Default</option>
        <option value="btn-sm">btn-sm (Small)</option>
        <option value="btn-lg">btn-lg (Large)</option>
      </select>
      <small class="form-text text-muted">
        Use <a href="https://getbootstrap.com/docs/4.5/components/buttons/" target="_blank">Bootstrap button style</a>
        , if you need a custom style, just enter your button class names.
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

    <!-- Blocked -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-block">Full-Width</label>
      <div>
        <UnicornSwitcher name="addon-edit-block"
          v-model="options.block"
          id="input-addon-edit-block"
          shape="circle"
          color="success"
          :true-value="true"
          :false-value="false"
        />
      </div>
    </div>

    <!-- Icon -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-icon">Icon Class Name</label>
      <div class="input-group mb-3">
        <div class="input-group-text">
            <span :class="options.icon"></span>
        </div>
        <input id="input-addon-edit-icon" type="text"
          v-model="options.icon" class="form-control" />
      </div>
      <small class="form-text text-muted">
        Enter icon class, example: <code>fa fa-star</code>.
        You can find icons from: <a target="_blank" href="https://fontawesome.com/v6.0/icons">FontAwsome</a>
      </small>
    </div>

    <!-- Icon Position -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-icon_position">Icon Position</label>
      <ButtonRadio
        color="primary"
        variant="outline"
        class="w-100"
        v-model="options.icon_position"
        :options="[
          { text: 'Left', value: 'left' },
          { text: 'Right', value: 'right' },
        ]"
      />
    </div>
  </div>
</template>

<script>
import ButtonRadio from '@/components/page-builder/form/ButtonRadio';
import SliderInput from '@/components/page-builder/form/SliderInput';
import lunaAddonMixin from '@/services/page-builder/addon-mixin';
import UnicornSwitcher from '@/components/form/UnicornSwitcher';
import { toRefs } from 'vue';
export default {
  name: "addon-button",
  components: {
    SliderInput,
    ButtonRadio,
    UnicornSwitcher
  },
  props: {
    ...lunaAddonMixin.props
  },
  setup(props, ctx) {
    const state = lunaAddonMixin(props, ctx, {
      uid: u.uid(),
      options: {
        text: '',
        link: '',
        link_target: '',
        style: 'btn-primary',
        border_radius: '',
        size: '',
        block: false,
        icon: '',
        icon_position: 'left'
      }
    });

    return {
      ...toRefs(state)
    };
  },
}
</script>

<style scoped>

</style>
