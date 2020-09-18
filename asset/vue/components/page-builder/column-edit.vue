<template>
  <div>
    <div class="modal fade" id="column-edit-modal" tabindex="-1" role="dialog"
      aria-labelledby="column-edit-modal-label"
      data-backdrop="static"
      aria-hidden="true" ref="modal">
      <div class="modal-dialog modal-lg" role="document">
        <h5 id="column-edit-modal-label" class="modal-title text-light mb-3">
          欄選項
        </h5>

        <div class="modal-content">
          <div class="modal-header bg-white" :class="{'sticky-top': sticky}">
            <!-- Tabs -->
            <ul class="nav nav-pills border-0">
              <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#column-edit-general" ref="generalTab">
                  基本選項
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#column-edit-layout">
                  版面
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#column-edit-animation">
                  動畫
                </a>
              </li>
            </ul>
            <div class="ml-auto">
              <button type="button" class="btn btn-primary" @click="save()">
                <span class="fa fa-check"></span>
                完成
              </button>
              <button type="button" class="btn btn-success" @click="savePage()"
                :disabled="saving">
                <span :class="this.saving ? 'spinner-border spinner-border-sm' : 'fa fa-save'"></span>
                儲存頁面
              </button>
              <button type="button" class="btn btn-secondary" @click="close()">
                <span class="fa fa-times"></span>
              </button>
            </div>
          </div>
          <div class="modal-body" v-if="values.id">
            <div class="tab-content" id="column-edit-tab-content">
              <!-- Tab General -->
              <div class="tab-pane fade show active" id="column-edit-general" role="tabpanel" aria-labelledby="column-edit-general-tab">

                <!-- Text Color -->
                <div class="form-group">
                  <label for="input-column-edit-text-color">文字顏色</label>
                  <input id="input-column-edit-text-color" type="text"
                    v-model.lazy="options.text_color" v-color class="form-control" />
                </div>

                <!-- Background Toggler -->
                <div class="form-group">
                  <label for="input-column-edit-background">背景樣式</label>
                  <div class="mt-2">
                    <b-form-radio-group v-model="options.background.type" class="btn-block"
                      buttons button-variant="outline-primary">
                      <b-form-radio value="none">
                        無
                      </b-form-radio>
                      <b-form-radio value="color">
                        顏色
                      </b-form-radio>
                      <b-form-radio value="image">
                        圖片
                      </b-form-radio>
                      <b-form-radio value="gradient">
                        漸層
                      </b-form-radio>
                    </b-form-radio-group>
                  </div>
                </div>

                <!-- BG Color -->
                <transition name="fade">
                  <div class="form-group" v-if="['color', 'image'].indexOf(options.background.type) !== -1">
                    <label for="input-column-edit-bg-color">背景顏色</label>
                    <input id="input-column-edit-bg-color" type="text"
                      v-model.lazy="options.background.color" v-color class="form-control" />
                  </div>
                </transition>

                <transition name="fade">
                  <div v-if="['image'].indexOf(options.background.type) !== -1">
                    <!-- BG Image -->
                    <div class="form-group">
                      <label for="input-column-edit-bg-image">背景圖片</label>
                      <single-image v-model="options.background.image.url"
                        id="input-column-edit-bg-image"></single-image>
                    </div>

                    <div class="form-row">
                      <!-- BG Overlay -->
                      <div class="form-group col-md-6">
                        <label for="input-column-edit-bg-overlay">背景顏色覆蓋</label>
                        <input id="input-column-edit-bg-overlay" type="text"
                          v-model.lazy="options.background.overlay" v-color class="form-control" />
                      </div>

                      <!-- BG Repeat -->
                      <div class="form-group col-md-6">
                        <label for="input-column-edit-bg-repeat">Background Repeat</label>
                        <select id="input-column-edit-bg-repeat"
                          v-model.lazy="options.background.image.repeat" class="form-control">
                          <option value="no-repeat">No Repeat</option>
                          <option value="">Repeat All</option>
                          <option value="repeat-x">Repeat X</option>
                          <option value="repeat-y">Repeat Y</option>
                          <option value="inherit">Inherit</option>
                        </select>
                      </div>
                    </div>

                    <div class="form-row">
                      <!-- BG Attachment -->
                      <div class="form-group col-md-6">
                        <label for="input-column-edit-bg-attachment">Background Attachment</label>
                        <select id="input-column-edit-bg-attachment"
                          v-model.lazy="options.background.image.attachment" class="form-control">
                          <option value="fixed">Fixed</option>
                          <option value="scroll">Scroll</option>
                          <option value="inherit">Inherit</option>
                        </select>
                      </div>

                      <!-- BG Position -->
                      <div class="form-group col-md-6">
                        <label for="input-column-edit-bg-position">Background Position</label>
                        <select id="input-column-edit-bg-position"
                          v-model.lazy="options.background.image.position" class="form-control">
                          <option value="left top">Left Top</option>
                          <option value="left center">Left Center</option>
                          <option value="left bottom">Left Bottom</option>
                          <option value="center top">Center Top</option>
                          <option value="center center">Center Center</option>
                          <option value="center bottom">Center Bottom</option>
                          <option value="right top">Right Top</option>
                          <option value="right center">Right Center</option>
                          <option value="right bottom">Right Bottom</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </transition>

                <transition name="fade">
                  <!-- Gradient -->
                  <gradient v-if="options.background.type === 'gradient'" v-model="options.background.gradient"
                    id="column-edit-gradient">
                  </gradient>
                </transition>

                <!-- Middle Align -->
                <div class="form-group">
                  <label for="input-column-edit-valign">垂直置中</label>
                  <div>
                    <phoenix-switch name="column-edit-align-middle" v-model="options.valign"
                      id="input-column-edit-valign"
                      shape="circle"
                      color="success"
                      true-value="middle" false-value="top"></phoenix-switch>
                  </div>
                </div>

                <hr />

                <!-- Padding -->
                <box-offset v-model="options.padding">
                  <span slot="label">Padding</span>
                </box-offset>

                <!-- Margin -->
                <box-offset v-model="options.margin">
                  <span slot="label">Margin</span>
                </box-offset>

                <hr />

                <!-- Border -->
                <div class="form-group">
                  <label for="input-column-edit-border-enabled">使用框線 Border</label>
                  <div>
                    <phoenix-switch name="column-edit-border-enabled" v-model="options.border.enabled"
                      id="input-column-edit-border-enabled"
                      shape="circle"
                      color="success"></phoenix-switch>
                  </div>
                </div>

                <div v-if="options.border.enabled == 1">
                  <!-- Border Width -->
                  <rwd-group class-name="c-border-width">
                    <label slot="label">
                      Border Width
                    </label>
                    <div v-for="size of ['lg', 'md', 'xs']" class="form-group" :slot="size"
                      :class="'c-border-width__' + size">
                      <div class="d-flex">
                        <vue-slide-bar v-model="options.border.width[size]" class="flex-grow-1"></vue-slide-bar>
                        <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                          v-model="options.border.width[size]" />
                      </div>
                    </div>
                  </rwd-group>

                  <!-- Border Color -->
                  <div class="form-group">
                    <label for="input-column-edit-border-color">Border Color</label>
                    <input id="input-column-edit-border-color" type="text"
                      v-model.lazy="options.border.color" v-color class="form-control" />
                  </div>

                  <!-- Border Style -->
                  <div class="form-group">
                    <label for="input-column-edit-border-style">Border Style</label>
                    <select id="input-column-edit-border-style"
                      v-model="options.border.style" class="form-control">
                      <option value="">None</option>
                      <option value="solid">Solid</option>
                      <option value="dotted">Dotted</option>
                      <option value="dashed">Dashed</option>
                      <option value="double">Double</option>
                      <option value="groove">Groove</option>
                      <option value="ridge">Ridge</option>
                    </select>
                  </div>
                </div>

                <!-- Border Radius -->
                <rwd-group class-name="c-border-radius">
                  <label slot="label">
                    圓角 Border Radius
                  </label>
                  <div v-for="size of ['lg', 'md', 'xs']" class="form-group" :slot="size"
                    :class="'c-border-radius__' + size">
                    <div class="d-flex">
                      <vue-slide-bar v-model="options.border.radius[size]" class="flex-grow-1" :max="500"></vue-slide-bar>
                      <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                        v-model="options.border.radius[size]" />
                    </div>
                  </div>
                </rwd-group>

                <hr />

                <!-- Box Shadow -->
                <div class="form-group">
                  <label for="input-column-edit-box_shadow-enabled">陰影 Box Shadow</label>
                  <div>
                    <phoenix-switch name="column-edit-box_shadow-enabled" v-model="options.box_shadow.enabled"
                      id="input-column-edit-box_shadow-enabled"
                      shape="circle"
                      color="success"></phoenix-switch>
                  </div>
                </div>

                <div v-if="options.box_shadow.enabled == 1">
                  <!-- Shadow Color -->
                  <div class="form-group">
                    <label for="input-column-edit-box-shadow-color">陰影顏色</label>
                    <input id="input-column-edit-box-shadow-color" type="text"
                      v-model.lazy="options.box_shadow.color" v-color class="form-control" />
                  </div>

                  <div class="form-row">
                    <div class="col-6">
                      <!-- Shadow Offset X -->
                      <div class="form-group">
                        <label>
                          水平位移 (X Offset)
                        </label>
                        <div class="d-flex">
                          <vue-slide-bar v-model="options.box_shadow.hoffset" class="flex-grow-1"></vue-slide-bar>
                          <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                            v-model="options.box_shadow.hoffset" />
                        </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <!-- Shadow Offset Y -->
                      <div class="form-group">
                        <label>
                          垂直位移 (Y Offset)
                        </label>
                        <div class="d-flex">
                          <vue-slide-bar v-model="options.box_shadow.voffset" class="flex-grow-1"></vue-slide-bar>
                          <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                            v-model="options.box_shadow.voffset" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="col-6">
                      <!-- Shadow Blur -->
                      <div class="form-group">
                        <label>
                          模糊度 Blur
                        </label>
                        <div class="d-flex">
                          <vue-slide-bar v-model="options.box_shadow.blur" class="flex-grow-1"></vue-slide-bar>
                          <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                            v-model="options.box_shadow.blur" />
                        </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <!-- Shadow Spread -->
                      <div class="form-group">
                        <label>
                          擴散 Spread
                        </label>
                        <div class="d-flex">
                          <vue-slide-bar v-model="options.box_shadow.spread" class="flex-grow-1"></vue-slide-bar>
                          <input type="text" class="form-control ml-2 mt-2" style="width: 3.5rem;"
                            v-model="options.box_shadow.spread" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                <!-- Class -->
                <div class="form-group">
                  <label for="input-column-edit-html-class">CSS Class</label>
                  <input id="input-column-edit-html-class" type="text"
                    v-model="options.html_class" class="form-control" />
                </div>

              </div>

              <!-- Tab RWD -->
              <div class="tab-pane fade" id="column-edit-layout" role="tabpanel" aria-labelledby="column-edit-layout-tab">
                <!-- Desktop Layout -->
                <div class="form-group">
                  <label for="input-column-edit-width-desktop">桌面版寬度 Desktop</label>
                  <select id="input-column-edit-width-desktop"
                    v-model="options.width.lg" class="form-control">
                    <option v-for="w of widthRange()" :value="'col-lg-' + w">
                      col-lg-{{ w }}
                    </option>
                  </select>
                </div>

                <!-- Tablet Layout -->
                <div class="form-group">
                  <label for="input-column-edit-width-tablet">平板寬度 Tablet</label>
                  <select id="input-column-edit-width-tablet"
                    v-model="options.width.md" class="form-control">
                    <option value="">- 不設定 -</option>
                    <option v-for="w of widthRange()" :value="'col-md-' + w">
                      col-md-{{ w }}
                    </option>
                  </select>
                </div>

                <!-- Mobile Layout -->
                <div class="form-group">
                  <label for="input-column-edit-width-mobile">手機寬度 Mobile</label>
                  <select id="input-column-edit-width-mobile"
                    v-model="options.width.xs" class="form-control">
                    <option value="">- 不設定 -</option>
                    <option v-for="w of widthRange()" :value="'col-' + w">
                      col-{{ w }}
                    </option>
                  </select>
                </div>

                <hr />

                <!-- Hidden Mobile -->
                <div class="form-group">
                  <label for="input-column-edit-hidden-mobile">手機板隱藏</label>
                  <div>
                    <phoenix-switch name="column-edit-hidden-mobile" v-model="options.display.xs"
                      id="input-column-edit-hidden-mobile"
                      shape="circle"
                      color="success"
                      true-value="d-none"
                      false-value="d-block"></phoenix-switch>
                  </div>
                </div>

                <!-- Hidden Tablet -->
                <div class="form-group">
                  <label for="input-column-edit-hidden-tablet">平板隱藏</label>
                  <div>
                    <phoenix-switch name="column-edit-hidden-tablet" v-model="options.display.md"
                      id="input-column-edit-hidden-tablet"
                      shape="circle"
                      color="success"
                      true-value="d-md-none"
                      false-value="d-md-block"></phoenix-switch>
                  </div>
                </div>

                <!-- Hidden Tablet -->
                <div class="form-group">
                  <label for="input-column-edit-hidden-desktop">桌面版隱藏</label>
                  <div>
                    <phoenix-switch name="column-edit-hidden-desktop" v-model="options.display.lg"
                      id="input-column-edit-hidden-desktop"
                      shape="circle"
                      color="success"
                      true-value="d-lg-none"
                      false-value="d-lg-block"></phoenix-switch>
                  </div>
                </div>

                <hr />

                <!-- CSS -->
                <div class="form-group">
                  <label for="input-column-edit-css">自訂 CSS</label>
                  <div class="text-muted small mb-3">
                    會自動前綴 <code>{{ `#luna-${values.id}` }}</code>，只會作用在這個區塊內
                  </div>
                  <div>
                    <codemirror ref="css-editor" v-model="options.html_css" :options="cmOptions"></codemirror>
                  </div>
                </div>
              </div>

              <!-- Tab Animation -->
              <div class="tab-pane fade" id="column-edit-animation" role="tabpanel" aria-labelledby="column-edit-animation-tab">
                <animations id="column-edit-anim" :value="options.animation"></animations>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" @click="save()">
              <span class="fa fa-save"></span>
              儲存
            </button>
            <button type="button" class="btn btn-secondary" @click="close()">
              <span class="fa fa-times"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { range } from 'lodash';
import PageBuilderService from '../../services/page-builder-services';
import { CodeMirrorOptions, refreshCodeMirror } from '../../services/page-builder/codemirror';
import Animations from "./form/animations";
import BoxOffset from "./form/box-offset";
import SingleImage from "./form/single-image";
import Gradient from "./form/gradient";
import RwdGroup from "./form/rwd-group";

export default {
  name: 'column-edit',
  components: { Animations, BoxOffset, SingleImage, Gradient, RwdGroup },
  data() {
    return {
      values: {},
      sticky: false,
      cmOptions: CodeMirrorOptions,
      saving: false
    }
  },

  props: {
  },

  created() {
  },

  mounted() {
    $('[href="#column-edit-layout"]').on('shown.bs.tab', () => {
      refreshCodeMirror(this.$refs['css-editor']);
    });
  },

  methods: {
    edit(data) {
      this.values = JSON.parse(JSON.stringify(data));

      $(this.$refs.generalTab).click();
      $(this.$refs.modal).modal('show');

      this.sticky = true;
    },

    save() {
      Phoenix.trigger('column:save', JSON.parse(JSON.stringify(this.values)));

      this.values = {};

      this.sticky = false;

      $(this.$refs.modal).modal('hide');
    },

    savePage() {
      Phoenix.trigger('column:save', JSON.parse(JSON.stringify(this.values)));

      this.saving = true;
      this.$nextTick(() => {
        PageBuilderService.save(this.saving)
          .always(() => {
            this.saving = false;
          });
      });
    },

    close() {
      $(this.$refs.modal).modal('hide');

      setTimeout(() => {
        this.values = {};
      }, 300);

      this.sticky = false;
    },

    widthRange() {
      return range(1, 13); // 1 to 12 in array
    }
  },

  watch: {

  },

  computed: {
    options() {
      return this.values.options;
    }
  }
};
</script>

<style scoped>

</style>
