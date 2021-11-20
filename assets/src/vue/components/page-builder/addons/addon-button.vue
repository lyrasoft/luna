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
      <div>
        <b-form-radio-group v-model="options.align" class="btn-block"
          buttons button-variant="outline-primary">
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
        <unicorn-switcher name="addon-edit-link-target"
          v-model="options.link_target"
          id="input-addon-edit-link-target"
          shape="circle"
          color="success"
          true-value="_blank"
          false-value=""></unicorn-switcher>
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
        Use <a href="https://getbootstrap.com/docs/4.5/components/buttons/" target="_blank">Bootstrap button style</a>
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
    <div v-if="$sa && prepared" class="form-group mb-3">
      <label>
        Border Radius
      </label>
      <div class="d-flex">
        <vue-slide-bar v-model="options.border_radius" class="flex-grow-1" :max="300"></vue-slide-bar>
        <input type="text" class="form-control ml-2 ms-2 mt-2" style="width: 3.5rem;"
          v-model="options.border_radius" />
      </div>
    </div>

    <!-- Blocked -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-block">Full-Width</label>
      <div>
        <unicorn-switcher name="addon-edit-block"
          v-model="options.block"
          id="input-addon-edit-block"
          shape="circle"
          color="success"
          :true-value="true"
          :false-value="false"></unicorn-switcher>
      </div>
    </div>

    <!-- Icon -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-icon">Icon Class Name</label>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
                    <span class="input-group-text">
                        <span :class="options.icon"></span>
                    </span>
        </div>
        <input id="input-addon-edit-icon" type="text"
          v-model="options.icon" class="form-control" />
      </div>
      <small class="form-text text-muted">
        Enter icon class, example: <code>fa fa-star</code>.
        You can find icons from: <a target="_blank" href="https://fontawesome.com/v6.0/icons">FontAwsome</a>
      </small>
    </div>

    <!-- Content Align -->
    <div class="form-group mb-3">
      <label for="input-addon-edit-icon_position">Icon Position</label>
      <div>
        <b-form-radio-group v-model="options.icon_position" class="btn-block"
          buttons button-variant="outline-primary">
          <b-form-radio value="left">
            Left
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

export default {
  name: "addon-button",
  components: {
    TitleOptions,
    RwdGroup,
    BFormRadioGroup,
    BFormRadio
  },
  mixins: [LunaAddonMixin],
  data() {
    return {
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
    }
  }
}
</script>

<style scoped>

</style>
