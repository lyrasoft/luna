<template>
  <div>
    <div class="modal fade" id="addon-edit-modal" role="dialog" aria-labelledby="addon-edit-modal-label"
      data-backdrop="static"
      aria-hidden="true" ref="modal">
      <div class="modal-dialog modal-lg" role="document">
        <h5 id="addon-edit-modal-label" class="modal-title text-light mb-3">
          Addon 編輯
        </h5>

        <div class="modal-content">
          <div class="modal-header bg-white" :class="{'sticky-top': sticky}">
            <!-- Tabs -->
            <ul class="nav nav-pills border-0">
              <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#addon-edit-general" ref="generalTab">
                  基本選項
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#addon-edit-layout">
                  版面
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#addon-edit-animation">
                  動畫
                </a>
              </li>
            </ul>
            <div class="ml-auto">
              <button type="button" class="btn btn-success" @click="save()">
                <span class="fa fa-save"></span>
                儲存
              </button>
              <button type="button" class="btn btn-secondary" @click="close()">
                <span class="fa fa-times"></span>
              </button>
            </div>
          </div>
          <div class="modal-body" v-if="values.id">
            <div class="tab-content" id="addon-edit-tab-content">
              <!-- Tab General -->
              <div class="tab-pane fade show active" id="addon-edit-general" role="tabpanel" aria-labelledby="addon-edit-general-tab">
                <!-- Admin Label -->
                <div class="form-group">
                  <label for="input-addon-edit-label">管理用標題</label>
                  <input id="input-addon-edit-label" type="text"
                    v-model="options.label" class="form-control" />
                  <small class="form-text text-muted">用來在編輯頁面辨識的標題</small>
                </div>

                <!-- Addon Edit Form -->
                <div :is="values.componentName" v-model="values.options"></div>

                <!-- Class -->
                <div class="form-group">
                  <label for="input-addon-edit-html-class">CSS Class</label>
                  <input id="input-addon-edit-html-class" type="text"
                    v-model="options.html_class" class="form-control" />
                </div>
              </div>

              <!-- Tab RWD -->
              <div class="tab-pane fade" id="addon-edit-layout" role="tabpanel" aria-labelledby="addon-edit-layout-tab">

                <!-- Padding -->
                <box-offset v-model="options.padding">
                  <span slot="label">Padding</span>
                </box-offset>

                <!-- Margin -->
                <box-offset v-model="options.margin">
                  <span slot="label">Margin</span>
                </box-offset>

                <!-- Text Color -->
                <div class="form-group">
                  <label for="input-addon-edit-text-color">文字顏色</label>
                  <input id="input-addon-edit-text-color" type="text"
                    v-model.lazy="options.text_color" v-color class="form-control" />
                </div>

                <!-- Background Toggler -->
                <div class="form-group">
                  <label for="input-addon-edit-background">背景樣式</label>
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
                      <b-form-radio value="video">
                        影片
                      </b-form-radio>
                    </b-form-radio-group>
                  </div>
                </div>

                <!-- BG Color -->
                <transition name="fade">
                  <div class="form-group" v-if="['color', 'image'].indexOf(options.background.type) !== -1">
                    <label for="input-addon-edit-bg-color">背景顏色</label>
                    <input id="input-addon-edit-bg-color" type="text"
                      v-model.lazy="options.background.color" v-color class="form-control" />
                  </div>
                </transition>

                <transition name="fade">
                  <div v-if="['image'].indexOf(options.background.type) !== -1">
                    <!-- BG Image -->
                    <div class="form-group">
                      <label for="input-addon-edit-bg-image">背景圖片</label>
                      <single-image v-model="options.background.image.url"
                        id="input-addon-edit-bg-image"></single-image>
                    </div>

                    <div class="form-row">
                      <!-- BG Repeat -->
                      <div class="form-group col-md-6">
                        <label for="input-addon-edit-bg-repeat">Background Repeat</label>
                        <select id="input-addon-edit-bg-repeat"
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
                        <label for="input-addon-edit-bg-attachment">Background Attachment</label>
                        <select id="input-addon-edit-bg-attachment"
                          v-model.lazy="options.background.image.attachment" class="form-control">
                          <option value="fixed">Fixed</option>
                          <option value="scroll">Scroll</option>
                          <option value="inherit">Inherit</option>
                        </select>
                      </div>

                      <!-- BG Position -->
                      <div class="form-group col-md-6">
                        <label for="input-addon-edit-bg-position">Background Position</label>
                        <select id="input-addon-edit-bg-position"
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
                  <gradient v-if="options.background.type === 'gradient'" v-model="options.background.gradient">
                  </gradient>
                </transition>

                <transition name="fade">
                  <div v-if="['video'].indexOf(options.background.type) !== -1">
                    <!-- video -->
                    <div class="form-group">
                      <label for="input-addon-edit-bg-video-url">影片網址</label>
                      <input id="input-addon-edit-bg-video-url" type="text"
                        v-model="options.background.video.url" class="form-control" />
                      <small class="form-text text-muted">
                        可直接貼上 mp4 影片網址，或 Youtube / Vimeo 連結
                      </small>
                    </div>
                  </div>
                </transition>

                <transition name="fade">
                  <div v-if="['video', 'image'].indexOf(options.background.type) !== -1">
                    <!-- BG Overlay -->
                    <div class="form-group">
                      <label for="input-addon-edit-bg-overlay">背景顏色覆蓋</label>
                      <input id="input-addon-edit-bg-overlay" type="text"
                        v-model.lazy="options.background.overlay" v-color class="form-control" />
                    </div>

                    <!-- Parallax Background -->
                    <div class="form-group">
                      <label for="input-addon-edit-hidden-mobile">視差特效</label>
                      <div>
                        <phoenix-switch name="addon-edit-bg-parallax"
                          v-model="options.background.parallax"
                          id="input-addon-edit-bg-parallax"
                          shape="circle"
                          color="success"
                          :true-value="true"
                          :false-value="false"></phoenix-switch>
                      </div>
                    </div>
                  </div>
                </transition>

                <hr />

                <!-- Hidden Mobile -->
                <div class="form-group">
                  <label for="input-addon-edit-hidden-mobile">手機板隱藏</label>
                  <div>
                    <phoenix-switch name="addon-edit-hidden-mobile" v-model="options.display.xs"
                      id="input-addon-edit-hidden-mobile"
                      shape="circle"
                      color="success"
                      true-value="d-none"
                      false-value="d-block"></phoenix-switch>
                  </div>
                </div>

                <!-- Hidden Tablet -->
                <div class="form-group">
                  <label for="input-addon-edit-hidden-tablet">平板隱藏</label>
                  <div>
                    <phoenix-switch name="addon-edit-hidden-tablet" v-model="options.display.md"
                      id="input-addon-edit-hidden-tablet"
                      shape="circle"
                      color="success"
                      true-value="d-md-none"
                      false-value="d-md-block"></phoenix-switch>
                  </div>
                </div>

                <!-- Hidden Tablet -->
                <div class="form-group">
                  <label for="input-addon-edit-hidden-desktop">桌面版隱藏</label>
                  <div>
                    <phoenix-switch name="addon-edit-hidden-desktop" v-model="options.display.lg"
                      id="input-addon-edit-hidden-desktop"
                      shape="circle"
                      color="success"
                      true-value="d-lg-none"
                      false-value="d-lg-block"></phoenix-switch>
                  </div>
                </div>
              </div>

              <!-- Tab Animation -->
              <div class="tab-pane fade" id="addon-edit-animation" role="tabpanel" aria-labelledby="addon-edit-animation-tab">
                <animations id="addon-edit-anim" :value="options.animation"></animations>
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
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BoxOffset from "./form/box-offset";
import Animations from "./form/animations";
import SingleImage from "./form/single-image";
import Gradient from "./form/gradient";

export default {
  name: 'addon-edit',
  components: { Animations, BoxOffset, SingleImage, Gradient },
  data() {
    return {
      values: {},
      sticky: false
    }
  },

  props: {
  },

  created() {
  },

  methods: {
    edit(data) {
      const editData = JSON.parse(JSON.stringify(data));

      if (typeof editData.options === 'undefined') {
        Vue.set(editData, 'options', this.getAddonBasicOptions());
      }

      if (typeof editData.disabled === 'undefined') {
        Vue.set(editData, 'disabled', false);
      }

      this.dataMigration(editData);

      this.values = editData;

      $(this.$refs.generalTab).click();
      $(this.$refs.modal).modal('show');

      this.sticky = true;
    },

    save() {
      Phoenix.trigger('addon:save', JSON.parse(JSON.stringify(this.values)));

      this.values = {};

      this.sticky = false;

      $(this.$refs.modal).modal('hide');
    },

    close() {
      $(this.$refs.modal).modal('hide');

      setTimeout(() => {
        this.values = {};
      }, 300);

      this.sticky = false;
    },

    getAddonBasicOptions() {
      return {
        html_class: '',
        label: '',
        title: {
          text: '',
          element: 'h3',
          font_size: {
            lg: '',
            md: '',
            xs: ''
          },
          font_weight: '',
          color: '',
          margin_top: {
            lg: '',
            md: '',
            xs: ''
          },
          margin_bottom: {
            lg: '',
            md: '',
            xs: ''
          }
        },
        align: '',
        // valign: 'top',
        padding: {
          xs: '',
          md: '',
          lg: '',
        },
        margin: {
          xs: '',
          md: '',
          lg: '',
        },
        custom_css: '',
        text_color: '',
        display: {
          xs: 'd-block',
          md: 'd-md-block',
          lg: 'd-lg-block'
        },
        box_shadow: {
          enabled: 0,
          color: 'rgba(0, 0, 0, 1)',
          hoffset: 0,
          voffset: 0,
          blur: 0,
          spread: 0
        },
        border: {
          enabled: 0,
          width: {
            lg: 1,
            md: 1,
            xs: 1,
          },
          color: '',
          style: '',
          radius: {
            lg: 0,
            md: 0,
            xs: 0,
          }
        },
        background: {
          type: 'none',
          color: '',
          overlay: '',
          image: {
            url: '',
            repeat: '',
            position: 'center center',
            attachment: 'inherit',
            size: 'cover'
          },
          gradient: {
            type: 'liner',
            angle: '',
            start_color: '',
            start_pos: '',
            end_color: '',
            end_pos: ''
          },
          video: {
            url: ''
          }
        },
        animation: {
          name: '',
          duration: 300,
          delay: 0
        }
      };
    },

    dataMigration(data) {
      if (typeof data.options.background.video === 'string') {
        data.options.background.video = { url: data.options.background.video };
      }
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
