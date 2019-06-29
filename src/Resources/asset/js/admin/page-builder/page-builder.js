"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */
var LunaAddonMixin = {
  data: function data() {
    return {
      options: {},
      prepared: false
    };
  },
  props: {
    value: Object
  },
  created: function created() {
    var options = this.options;
    underscore.each(this.value, function (v, k) {
      Vue.set(options, k, v);
    });
    this.options = options;
  },
  mounted: function mounted() {
    var _this = this;

    // Fix slider bug
    setTimeout(function () {
      _this.prepared = true;
    }, 150);
  },
  methods: {},
  watch: {
    options: {
      handler: function handler() {
        this.$emit('change', this.options);
        this.$emit('input', this.options);
      },
      deep: true
    }
  }
};
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Vue.component('addon-text', {
    template: '#addon-tmpl-text',
    mixins: [LunaAddonMixin],
    data: function data() {
      return {
        options: {
          content: '大哉乾元，萬物資始，山風蠱，山火賁，先天而天弗違，風澤中孚，水地比利見大人，雷天大壯，堅冰至，' + '風澤中孚，利永貞，元亨利貞，山天大畜天雷無妄，地澤臨，地山謙，履霜，水火既濟，水火既濟，利永貞聖人作，' + '積善之家，六二之動，風地觀，山澤損，賢人在下，火山旅必有餘慶，山水蒙，同氣相求，厚德載物，天風姤，風天小畜，' + '無咎無譽龍戰於野，雷水解，風從虎，天地否，地天泰，元亨利貞',
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
        }
      };
    }
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Vue.component('addon-feature', {
    template: '#addon-tmpl-feature',
    mixins: [LunaAddonMixin],
    data: function data() {
      return {
        options: {
          link: '',
          link_element: 'title',
          layout_type: 'icon',
          image: '',
          icon: {
            name: 'fa fa-star',
            border: {
              width: {
                lg: 1,
                md: 1,
                xs: 1
              },
              color: '',
              style: '',
              radius: {
                lg: 0,
                md: 0,
                xs: 0
              }
            },
            font_size: {
              lg: '',
              md: '',
              xs: ''
            },
            color: '',
            bg_color: '',
            margin_top: {
              lg: '',
              md: '',
              xs: ''
            },
            margin_bottom: {
              lg: '',
              md: '',
              xs: ''
            },
            padding: {
              lg: '',
              md: '',
              xs: ''
            }
          },
          content: '大哉乾元，萬物資始，山風蠱，山火賁，先天而天弗違，風澤中孚，水地比利見大人，雷天大壯，堅冰至，' + '風澤中孚，利永貞，元亨利貞，山天大畜天雷無妄，地澤臨，地山謙，履霜，水火既濟，水火既濟，利永貞聖人作，' + '積善之家，六二之動，風地觀，山澤損，賢人在下，火山旅必有餘慶，山水蒙，同氣相求，厚德載物，天風姤，風天小畜，' + '無咎無譽龍戰於野，雷水解，風從虎，天地否，地天泰，元亨利貞',
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
        }
      };
    }
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Vue.component('addon-image', {
    template: '#addon-tmpl-image',
    mixins: [LunaAddonMixin],
    data: function data() {
      return {
        options: {
          image: '',
          border_radius: '',
          alt: '',
          link: '',
          link_target: ''
        }
      };
    }
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Vue.component('addon-button', {
    template: '#addon-tmpl-button',
    mixins: [LunaAddonMixin],
    data: function data() {
      return {
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
      };
    }
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Vue.component('addon-emptyspace', {
    template: '#addon-tmpl-emptyspace',
    mixins: [LunaAddonMixin],
    data: function data() {
      return {
        options: {
          height: {
            lg: '',
            md: '',
            xs: ''
          }
        }
      };
    }
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Vue.component('single-image', {
    template: "\n<div class=\"c-single-image-uploader\">\n    <div class=\"form-group c-single-image-preview text-center\" v-if=\"url !== '' && !uploading\">\n        <img :src=\"url\" alt=\"Image\" class=\"img-fluid rounded\" style=\"max-height: 450px;\">\n    </div>\n    \n    <div class=\"c-single-image-placeholder text-center p-4 mb-3 border rounded\" v-if=\"url === '' && !uploading\">\n        <small class=\"text-muted\">\u62D6\u62C9\u5716\u7247</small>\n    </div>\n    \n    <div class=\"form-group d-flex align-items-center\" v-if=\"uploading\" style=\"min-height: 450px;\">\n        <img :src=\"loadingImage\" class=\"mx-auto\" alt=\"Loading\">\n    </div>\n\n    <div class=\"form-group\">\n        <div class=\"input-group\">\n            <input :id=\"id\" type=\"text\"\n                v-model=\"url\" class=\"form-control\" :disabled=\"uploading\" />\n            <div class=\"input-group-append\">\n                <button type=\"button\" class=\"btn btn-primary\" @click=\"chooseFile()\"\n                    :disabled=\"uploading\">\n                    \u4E0A\u50B3\u5716\u7247\n                </button>\n                <button v-if=\"url !== ''\" type=\"button\" class=\"btn btn-primary\" @click=\"url = ''\"\n                    :disabled=\"uploading\">\n                    <span class=\"fa fa-times\"></span>\n                </button>\n            </div>\n        </div>\n        <small class=\"form-text text-muted\">\n            \u8CBC\u4E0A\u5716\u7247\u7DB2\u5740\uFF0C\u6216\u8005\u4E0A\u50B3\u5716\u7247\uFF0C\u4E5F\u53EF\u4EE5\u5C07\u672C\u5730\u7AEF\u5716\u7247\u62D6\u62C9\u81F3\u6B64\u3002\n        </small>\n    </div>\n</div>\n    ",
    data: function data() {
      return {
        url: '',
        loadingImage: Phoenix.route('loading_image'),
        uploading: false
      };
    },
    props: {
      value: String,
      id: String,
      accepted: {
        type: Array,
        "default": function _default() {
          return ['image/jpeg', 'image/png', 'image/gif'];
        }
      }
    },
    created: function created() {
      this.url = this.value;
    },
    mounted: function mounted() {
      var _this2 = this;

      var $el = $(this.$el);
      $el.on('dragover', function (event) {
        event.stopPropagation();
        event.preventDefault();
        $el.addClass('c-single-image-uploader--hover');
      });
      $el.on('dragleave', function (event) {
        event.stopPropagation();
        event.preventDefault();
        $el.removeClass('c-single-image-uploader--hover');
      }); // File drop

      $el.on("drop", function (event) {
        event.stopPropagation();
        event.preventDefault();
        $el.removeClass('c-single-image-uploader--hover');
        var files = event.originalEvent.target.files || event.originalEvent.dataTransfer.files;

        _this2.uploadFile(files[0]);
      });
    },
    methods: {
      chooseFile: function chooseFile() {
        var _this3 = this;

        var input = $('<input type="file">');
        input.on('change', function (event) {
          var files = event.originalEvent.target.files || event.originalEvent.dataTransfer.files;

          _this3.uploadFile(files[0]);
        });
        input.click();
      },
      uploadFile: function uploadFile(file) {
        var _this4 = this;

        if (!this.checkFile(file)) {
          return;
        }

        var formData = new FormData();
        formData.append('file', file);
        this.uploading = true;
        $.post({
          url: Phoenix.route('single_image_upload'),
          data: formData,
          processData: false,
          contentType: false
        }).done(function (res) {
          _this4.url = res.data.url;
        }).fail(function (xhr) {
          console.error(xhr.responseJSON.message);
          alert(xhr.responseJSON.message);
        }).always(function () {
          _this4.uploading = false;
        });
      },
      checkFile: function checkFile(file) {
        if (this.accepted.indexOf(file.type) < 0) {
          alert('不允許的格式');
          return false;
        }

        return true;
      }
    },
    watch: {
      value: function value() {
        this.url = this.value;
      },
      url: function url() {
        this.$emit('change', this.url);
        this.$emit('input', this.url);
      }
    }
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Vue.component('title-options', {
    template: "\n<div class=\"c-title-options\">\n    <div class=\"form-row\">\n        <div class=\"col-6\">\n            <!-- Title Element -->\n            <div class=\"form-group\">\n                <label :for=\"id + 'title-element'\">\n                    \u6A19\u984C\u5143\u7D20\n                </label>\n                <select :id=\"id + 'title-element'\"\n                    v-model=\"options.title.element\" class=\"form-control\">\n                    <option v-for=\"i of [1, 2, 3, 4, 5, 6]\" :value=\"'h' + i\">\n                        h{{ i }}\n                    </option>\n                </select>\n            </div>\n        </div>\n        <div class=\"col-6\">\n            <!-- Title Color -->\n            <div class=\"form-group\">\n                <label :for=\"id + 'title-color'\">\u6A19\u984C\u984F\u8272</label>\n                <input :id=\"id + 'title-color'\" type=\"text\"\n                    v-model.lazy=\"options.title.color\" v-color class=\"form-control\" />\n            </div>\n        </div>\n    </div>\n\n    <div class=\"form-row\">\n        <div class=\"col-6\">\n            <!-- Title Font Size -->\n            <rwd-group class-name=\"c-title-font-size\">\n                <label slot=\"label\">\n                    \u6A19\u984C\u5B57\u9AD4\u5927\u5C0F\n                </label>\n                <div v-for=\"size of ['lg', 'md', 'xs']\" class=\"form-group\" :slot=\"size\"\n                    :class=\"'c-title-font-size__' + size\">\n                    <div class=\"d-flex\">\n                        <vue-slide-bar v-model=\"options.title.font_size[size]\" class=\"flex-grow-1\" :max=\"500\"></vue-slide-bar>\n                        <input type=\"text\" class=\"form-control ml-2 mt-2\" style=\"width: 3.5rem;\"\n                            v-model=\"options.title.font_size[size]\" />\n                    </div>\n                </div>\n            </rwd-group>\n        </div>\n        <div class=\"col-6\">\n            <!-- Title Font Weight -->\n            <div class=\"form-group\">\n                <label>\n                    \u6A19\u984C\u5B57\u9AD4\u7C97\u7D30\n                </label>\n                <div class=\"d-flex\" v-if=\"prepared\">\n                    <vue-slide-bar v-model=\"options.title.font_weight\" class=\"flex-grow-1\"\n                        :data=\"['', 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000]\"\n                        :max=\"1000\" :min=\"100\"></vue-slide-bar>\n                    <input type=\"text\" class=\"form-control ml-2 mt-2\" style=\"width: 3.5rem;\"\n                        v-model=\"options.title.font_weight\" />\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"form-row\">\n        <div class=\"col-6\">\n            <!-- Title Margin Top -->\n            <rwd-group class-name=\"c-title-margin_top\">\n                <label slot=\"label\">\n                    \u6A19\u984C\u4E0A\u65B9\u9593\u8DDD Margin Top\n                </label>\n                <div v-for=\"size of ['lg', 'md', 'xs']\" class=\"form-group\" :slot=\"size\"\n                    :class=\"'c-title-margin_top__' + size\">\n                    <input type=\"number\" v-model=\"options.title.margin_top[size]\" class=\"form-control\" />\n                </div>\n            </rwd-group>\n        </div>\n        <div class=\"col-6\">\n            <!-- Title Margin Bottom -->\n            <rwd-group class-name=\"c-title-margin_bottom\">\n                <label slot=\"label\">\n                    \u6A19\u984C\u4E0B\u65B9\u9593\u8DDD Margin Bottom\n                </label>\n                <div v-for=\"size of ['lg', 'md', 'xs']\" class=\"form-group\" :slot=\"size\"\n                    :class=\"'c-title-margin_bottom__' + size\">\n                    <input type=\"number\" v-model=\"options.title.margin_bottom[size]\" class=\"form-control\" />\n                </div>\n            </rwd-group>\n        </div>\n    </div>\n</div>\n    ",
    data: function data() {
      return {
        options: {},
        prepared: false
      };
    },
    props: {
      id: String,
      value: Object
    },
    created: function created() {
      this.options = this.value;
    },
    mounted: function mounted() {
      var _this5 = this;

      // Set a delay time then show slider to fix bug
      setTimeout(function () {
        _this5.prepared = true;
      }, 150);
    },
    methods: {},
    watch: {
      options: {
        handler: function handler() {
          this.$emit('change', this.options);
          this.$emit('input', this.options);
        },
        deep: true
      }
    }
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Vue.component('animation-selector', {
    template: "\n<div class=\"cation-selector\">\n    <div class=\"form-group\">\n        <label :for=\"id + '-name'\">\u52D5\u756B\u540D\u7A31</label>\n        <select :id=\"id + '-name'\" class=\"form-control\" v-model=\"animation.name\">\n            <option value=\"\">\u7121</option>\n            <option v-for=\"anim of getAnimations()\" :value=\"anim\">\n                {{ anim }}\n            </option>\n        </select>\n    </div>\n    \n    <div class=\"form-group\">\n        <label :for=\"id + '-duration'\">\u52D5\u756B\u6301\u7E8C\u6642\u9593</label>\n        <input type=\"number\" :id=\"id + '-duration'\" class=\"form-control\" v-model=\"animation.duration\" min=\"0\" />\n        <small class=\"form-text text-muted\">\n            \u52D5\u756B\u7684\u901F\u5EA6\uFF0C\u55AE\u4F4D: \u5FAE\u79D2 (1/1000 \u79D2)\n        </small>\n    </div>\n    \n    <div class=\"form-group\">\n        <label :for=\"id + '-delay'\">\u7B49\u5F85\u6642\u9593</label>\n        <input type=\"number\" :id=\"id + '-delay'\" class=\"form-control\" v-model=\"animation.delay\" min=\"0\" />\n        <small class=\"form-text text-muted\">\n            \u7B49\u5F85\u4E00\u5B9A\u6642\u9593\u5F8C\u624D\u767C\u751F\u52D5\u756B\uFF0C\u55AE\u4F4D: \u5FAE\u79D2 (1/1000 \u79D2)\n        </small>\n    </div>\n</div>\n",
    data: function data() {
      return {
        animation: {}
      };
    },
    props: {
      value: Object,
      id: String
    },
    mounted: function mounted() {
      this.animation = this.value;
    },
    methods: {
      getAnimations: function getAnimations() {
        return ['fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'flip', 'flipInX', 'flipInY', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight', 'zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp', 'bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp'];
      }
    },
    watch: {
      animation: {
        handler: function handler(anim) {
          this.$emit('change', anim);
          this.$emit('input', anim);
        },
        deep: true
      }
    }
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Vue.component('gradient', {
    template: "\n<div class=\"c-box-offset\">\n    <div class=\"c-gradient-preview mb-3\" style=\"height: 100px; border: 1px solid rgba(0, 0, 0, .2);\" \n        :style=\"{'background-image': backgroundImage}\">\n    </div>\n\n    <div class=\"form-row\">\n        <div class=\"col-6\">\n            <div class=\"form-group\">\n                <label :for=\"id + '-color1'\">\u984F\u8272 1</label>\n                <input type=\"text\" :id=\"id + '-color1'\" v-model.lazy=\"gradient.start_color\" v-color class=\"form-control\" />\n            </div>\n            <div class=\"form-group\">\n                <label :for=\"id + '-color1-pos'\">\u984F\u8272 1 \u4F4D\u7F6E</label>\n                <vue-slide-bar v-model=\"gradient.start_pos\"></vue-slide-bar>\n            </div>\n        </div>\n        <div class=\"col-6\">\n            <div class=\"form-group\">\n                <label :for=\"id + '-color2'\">\u984F\u8272 2</label>\n                <input type=\"text\" :id=\"id + '-color2'\" v-model.lazy=\"gradient.end_color\" v-color class=\"form-control\" />\n            </div>\n            <div class=\"form-group\">\n                <label :for=\"id + '-color2-pos'\">\u984F\u8272 2 \u4F4D\u7F6E</label>\n                <vue-slide-bar v-model=\"gradient.end_pos\"></vue-slide-bar>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"form-group\">\n        <label :for=\"id + '-type'\">\u6F38\u5C64\u6A21\u5F0F</label>\n        <select :id=\"id + '-type'\" v-model.lazy=\"gradient.type\" class=\"form-control\">\n            <option value=\"linear\">\u7DDA\u6027 Linear</option>\n            <option value=\"radial\">\u653E\u5C04 Radial</option>\n        </select>\n    </div>\n\n    <div class=\"form-group\">\n        <label :for=\"id + '-angle'\">\u89D2\u5EA6</label>\n        <div class=\"d-flex\">\n            <vue-slide-bar :id=\"id + '-angle'\" class=\"flex-grow-1\" v-model=\"gradient.angle\" :max=\"360\">\n            </vue-slide-bar>\n            <input type=\"text\" class=\"form-control ml-2 mt-2\" style=\"width: 3.5rem;\"\n                v-model=\"gradient.angle\" />\n        </div>\n    </div>\n</div>\n    ",
    data: function data() {
      return {
        gradient: {
          type: 'linear',
          angle: '0',
          start_color: '',
          start_pos: '0',
          end_color: '',
          end_pos: '100'
        }
      };
    },
    props: {
      id: String,
      value: Object
    },
    mounted: function mounted() {
      this.gradient = this.value;
    },
    methods: {
      updated: function updated() {
        this.$emit('change', this.gradient);
        this.$emit('input', this.gradient);
      }
    },
    watch: {
      gradient: {
        handler: function handler(gradient) {
          this.$emit('change', this.gradient);
          this.$emit('input', this.gradient);
        },
        deep: true
      }
    },
    computed: {
      backgroundImage: function backgroundImage() {
        var gradient = this.gradient;

        if (gradient.type === 'linear') {
          return "".concat(gradient.type, "-gradient(").concat(gradient.angle, "deg, ").concat(gradient.start_color, " ").concat(gradient.start_pos, "%, ") + "".concat(gradient.end_color, " ").concat(gradient.end_pos, "%)");
        }

        return "".concat(gradient.type, "-gradient(").concat(gradient.start_color, " ").concat(gradient.start_pos, "%, ") + "".concat(gradient.end_color, " ").concat(gradient.end_pos, "%)");
      }
    }
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Vue.component('rwd-group', {
    template: "\n<div class=\"form-group\" :class=\"getClassName()\">\n    <div class=\"d-flex\" :class=\"getClassName('__title')\">\n        <div class=\"\">\n                <slot name=\"label\"></slot>\n        </div>\n        <div class=\"ml-auto\" :class=\"getClassName('__rwd-control')\">\n            <a href=\"javascript://\" :class=\"[currentSize === 'lg' ? 'active' : 'text-dark']\" @click=\"currentSize = 'lg'\">\n                <span class=\"fa fa-fw fa-desktop\"></span>\n            </a>\n            <a href=\"javascript://\" :class=\"[currentSize === 'md' ? 'active' : 'text-dark']\" @click=\"currentSize = 'md'\">\n                <span class=\"fas fa-fw fa-tablet\"></span>\n            </a>\n            <a href=\"javascript://\" :class=\"[currentSize === 'xs' ? 'active' : 'text-dark']\" @click=\"currentSize = 'xs'\">\n                <span class=\"fas fa-fw fa-mobile\"></span>\n            </a>\n        </div>\n    </div>\n\n    <div :class=\"getClassName('__inputs')\">\n        <slot name=\"lg\" v-if=\"currentSize === 'lg'\"></slot>\n        <slot name=\"md\" v-if=\"currentSize === 'md'\"></slot>\n        <slot name=\"xs\" v-if=\"currentSize === 'xs'\"></slot>\n    </div>\n\n    <slot name=\"description\"></slot>\n</div>\n    ",
    data: function data() {
      return {
        currentSize: ''
      };
    },
    props: {
      name: String,
      className: {
        "default": 'c-rwd-group',
        type: String
      }
    },
    mounted: function mounted() {
      var _this6 = this;

      // Fix DOM loading issues
      setTimeout(function () {
        _this6.currentSize = 'lg';
      }, 150);
    },
    methods: {
      getClassName: function getClassName() {
        var suffix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        return this.className + suffix;
      }
    },
    watch: {}
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Vue.component('box-offset', {
    template: "\n<rwd-group class-name=\"c-box-offset\">\n    <div slot=\"label\" class=\"mb-3\">\n        <slot name=\"label\"></slot>\n        <a href=\"javascript://\" @click=\"lock = !lock\">\n            <span class=\"fa\" :class=\"[lock ? 'fa-lock' : 'fa-lock-open']\"></span>\n        </a>\n    </div>\n    <div v-for=\"size of ['lg', 'md', 'xs']\" class=\"form-group\" :slot=\"size\" :class=\"'c-box-offset__' + size\">\n        <div class=\"form-row\">\n            <div class=\"col-3\">\n                <input type=\"text\" class=\"form-control\" placeholder=\"Top\" v-model=\"offsets[size].top\" />\n            </div>\n            <div class=\"col-3\">\n                <input type=\"text\" class=\"form-control\" placeholder=\"Right\" v-model=\"offsets[size].right\" />\n            </div>\n            <div class=\"col-3\">\n                <input type=\"text\" class=\"form-control\" placeholder=\"Bottom\" v-model=\"offsets[size].bottom\" />\n            </div>\n            <div class=\"col-3\">\n                <input type=\"text\" class=\"form-control\" placeholder=\"Left\" v-model=\"offsets[size].left\" />\n            </div>\n        </div>\n    </div>\n</rwd-group>\n\n    ",
    data: function data() {
      return {
        offsets: {
          xs: {
            top: '',
            right: '',
            bottom: '',
            left: ''
          },
          md: {
            top: '',
            right: '',
            bottom: '',
            left: ''
          },
          lg: {
            top: '',
            right: '',
            bottom: '',
            left: ''
          }
        },
        currentSize: 'desktop',
        lock: false
      };
    },
    props: {
      value: Object
    },
    mounted: function mounted() {
      var _this7 = this;

      this.extractValue(this.value);
      underscore.each(this.offsets, function (offset, size) {
        underscore.each(offset, function (value, pos) {
          _this7.$watch("offsets.".concat(size, ".").concat(pos), function (v) {
            if (_this7.lock) {
              offset.top = v;
              offset.right = v;
              offset.bottom = v;
              offset.left = v;
            }

            var allValue = _this7.getAllValues();

            _this7.$emit('change', allValue);

            _this7.$emit('input', allValue);
          });
        });
      });
    },
    methods: {
      getAllValues: function getAllValues() {
        var values = {};
        underscore.each(this.offsets, function (offset, size) {
          values[size] = "".concat(offset.top, ",").concat(offset.right, ",").concat(offset.bottom, ",").concat(offset.left);
        });
        return values;
      },
      extractValue: function extractValue(value) {
        var _this8 = this;

        underscore.each(value, function (offset, size) {
          var _offset$split = offset.split(','),
              _offset$split2 = _slicedToArray(_offset$split, 4),
              top = _offset$split2[0],
              right = _offset$split2[1],
              bottom = _offset$split2[2],
              left = _offset$split2[3];

          _this8.offsets[size].top = top || '';
          _this8.offsets[size].right = right || '';
          _this8.offsets[size].bottom = bottom || '';
          _this8.offsets[size].left = left || '';
        });
      }
    },
    watch: {
      value: function value(_value) {
        this.extractValue(_value);
      }
    }
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Vue.component('radio-button', {
    template: "\n<button type=\"button\" class=\"btn flex-fill\" :data-value=\"value\"\n    @click=\"select()\"\n    :class=\"[active ? activeClass : 'btn-outline-secondary']\">\n    <slot></slot>\n</button>",
    data: function data() {
      return {
        active: false
      };
    },
    props: {
      value: String,
      activeClass: {
        "default": 'btn-success'
      }
    },
    mounted: function mounted() {
      var _this9 = this;

      this.active = this.$parent.value === this.value;
      this.$parent.$on('button-selected', function (value) {
        _this9.active = value === _this9.value;
      });
    },
    methods: {
      select: function select() {
        this.$parent.$emit('button-selected', this.value);
      }
    }
  });
  Vue.component('radio-buttons', {
    template: "\n<div class=\"btn-group\">\n  <slot></slot>\n</div>\n    ",
    data: function data() {
      return {};
    },
    props: {
      value: String
    },
    mounted: function mounted() {
      var _this10 = this;

      this.$on('button-selected', function (value) {
        _this10.$emit('change', value);

        _this10.$emit('input', value);
      }); // this.$nextTick(() => {
      //   this.$parent.$emit('button-selected', this.value);
      // });
    },
    methods: {},
    watch: {
      value: function value(_value2) {
        this.$parent.$emit('button-selected', _value2);
      }
    }
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Vue.directive('tinymce', {
    inserted: function inserted(el) {
      tinymce.remove();
      tinymce.init({
        target: el,
        height: 350,
        plugins: ['advlist autolink lists link image charmap print preview hr anchor pagebreak', 'searchreplace wordcount visualblocks visualchars code fullscreen', 'insertdatetime media nonbreaking save table contextmenu directionality', 'emoticons template paste textcolor colorpicker textpattern imagetools'],
        images_upload_url: Phoenix.route('addon-text:image-upload-url'),
        images_upload_handler: function images_upload_handler(blobInfo, success, failure) {
          var editorElement = jQuery(el);
          editorElement.trigger('image-upload-start');
          var xhr, formData;
          xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.open('POST', Phoenix.route('addon-text:image-upload-url'));

          xhr.onload = function () {
            var json;
            editorElement.trigger('image-upload-complete');

            if (xhr.status !== 200) {
              failure('HTTP Error: ' + decodeURIComponent(xhr.statusText));
              editorElement.trigger('image-upload-error');
              return;
            }

            json = JSON.parse(xhr.responseText);

            if (!json || typeof json.data.url !== 'string') {
              failure('Invalid JSON: ' + xhr.responseText);
              console.error('Invalid JSON: ' + xhr.responseText);
              editorElement.trigger('image-upload-error');
              return;
            }

            success(json.data.url);
            editorElement.trigger('image-upload-success');
          };

          formData = new FormData();
          formData.append('file', blobInfo.blob(), blobInfo.filename());
          xhr.send(formData);
        },
        setup: function setup(editor) {
          editor.on('change', function () {
            el.value = editor.getContent();
            el.dispatchEvent(new Event('change', {
              bubbles: true
            }));
            el.dispatchEvent(new Event('input', {
              bubbles: true
            }));
          });
        }
      });
    }
  });
});
$(document).on('focusin', function (e) {
  if ($(e.target).closest(".mce-window").length) {
    e.stopImmediatePropagation();
  }
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Vue.directive('color', {
    inserted: function inserted(el) {
      $(el).minicolors({
        control: 'hue',
        position: 'left',
        opacity: true,
        format: 'rgb',
        theme: 'bootstrap',
        change: function change(value) {
          var event = new Event('change', {
            bubbles: true
          });
          el.dispatchEvent(event);
        }
      });
    },
    update: function update(el) {
      $(el).trigger('keyup');
    }
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  function updateFunction(el, binding) {
    // get options from binding value.
    // v-select="THIS-IS-THE-BINDING-VALUE"
    var options = binding.value || {}; // set up select2

    $(el).select2(options).on("select2:select", function (e) {
      // v-model looks for
      //  - an event named "change"
      //  - a value with property path "$event.target.value"
      el.dispatchEvent(new Event('change', {
        target: e.target
      }));
    });
  }

  Vue.directive('select2', {
    inserted: updateFunction,
    componentUpdated: updateFunction
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Vue.filter('lang', function (value) {
    var _Phoenix;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (_Phoenix = Phoenix).__.apply(_Phoenix, [value].concat(args));
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Vue.filter('addonProp', function (prop, type) {
    return Phoenix.data('addons')[type][prop];
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Phoenix.data('component:addon-edit', {
    name: 'addon-edit',
    data: function data() {
      return {
        values: {},
        sticky: false
      };
    },
    props: {},
    created: function created() {},
    methods: {
      edit: function edit(data) {
        var editData = JSON.parse(JSON.stringify(data));

        if (typeof editData.options === 'undefined') {
          Vue.set(editData, 'options', this.getAddonBasicOptions());
        }

        if (typeof editData.disabled === 'undefined') {
          Vue.set(editData, 'disabled', false);
        }

        this.values = editData;
        $(this.$refs.generalTab).click();
        $(this.$refs.modal).modal('show');
        this.sticky = true;
      },
      save: function save() {
        Phoenix.trigger('addon:save', JSON.parse(JSON.stringify(this.values)));
        this.values = {};
        this.sticky = false;
        $(this.$refs.modal).modal('hide');
      },
      close: function close() {
        var _this11 = this;

        $(this.$refs.modal).modal('hide');
        setTimeout(function () {
          _this11.values = {};
        }, 300);
        this.sticky = false;
      },
      getAddonBasicOptions: function getAddonBasicOptions() {
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
            lg: ''
          },
          margin: {
            xs: '',
            md: '',
            lg: ''
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
              xs: 1
            },
            color: '',
            style: '',
            radius: {
              lg: 0,
              md: 0,
              xs: 0
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
            video: ''
          },
          animation: {
            name: '',
            duration: 300,
            delay: 0
          }
        };
      }
    },
    watch: {},
    computed: {
      options: function options() {
        return this.values.options;
      }
    }
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Phoenix.data('component:addon', {
    name: 'addon',
    template: '#addon-component-tmpl',
    data: function data() {
      return {
        options: {}
      };
    },
    props: {
      content: Object,
      column: Object,
      index: Number
    },
    created: function created() {
      this.options = this.content.options;
    },
    methods: {
      edit: function edit() {
        Phoenix.trigger('addon:edit', this.content, this.column);
      },
      toggleDisabled: function toggleDisabled() {
        this.content.disabled = !this.content.disabled;
      },
      copy: function copy() {
        this.$emit('copy');
      },
      remove: function remove() {
        var _this12 = this;

        Phoenix.confirm('確定要刪除嗎?').then(function () {
          return _this12.$emit('delete');
        });
      },
      addAddon: function addAddon() {
        Phoenix.trigger('addon:add', this.content);
      },
      deleteAddon: function deleteAddon(i) {
        this.addons.splice(i, 1);
      }
    },
    watch: {
      content: {
        handler: function handler() {
          this.options = this.content.options;
        },
        deep: true
      }
    },
    computed: {}
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Phoenix.data('component:column-edit', {
    name: 'column-edit',
    data: function data() {
      return {
        values: {},
        sticky: false
      };
    },
    props: {},
    created: function created() {},
    methods: {
      edit: function edit(data) {
        this.values = JSON.parse(JSON.stringify(data));
        $(this.$refs.generalTab).click();
        $(this.$refs.modal).modal('show');
        this.sticky = true;
      },
      save: function save() {
        Phoenix.trigger('column:save', JSON.parse(JSON.stringify(this.values)));
        this.values = {};
        this.sticky = false;
        $(this.$refs.modal).modal('hide');
      },
      close: function close() {
        var _this13 = this;

        $(this.$refs.modal).modal('hide');
        setTimeout(function () {
          _this13.values = {};
        }, 300);
        this.sticky = false;
      },
      widthRange: function widthRange() {
        return underscore.range(1, 13); // 1 to 12 in array
      }
    },
    watch: {},
    computed: {
      options: function options() {
        return this.values.options;
      }
    }
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Phoenix.data('component:column', {
    name: 'column',
    template: '#column-component-tmpl',
    components: {
      addon: Phoenix.data('component:addon')
    },
    data: function data() {
      return {
        content: {},
        drag: false,
        widthMenuOpen: ''
      };
    },
    props: {
      value: Object,
      index: Number,
      child: {
        type: Boolean,
        "default": false
      }
    },
    created: function created() {
      var _this14 = this;

      this.content = this.value;

      if (typeof this.content.id === 'undefined') {
        underscore.each(this.getEmptyColumn(), function (v, k) {
          Vue.set(_this14.content, k, v);
        });
      }
    },
    methods: {
      edit: function edit() {
        Phoenix.trigger('column:edit', this.content);
      },
      copy: function copy() {
        this.$emit('copy');
      },
      toggleDisabled: function toggleDisabled() {
        this.content.disabled = !this.content.disabled;
      },
      remove: function remove() {
        var _this15 = this;

        Phoenix.confirm('確定要刪除嗎?').then(function () {
          return _this15.$emit('delete');
        });
      },
      copyAddon: function copyAddon(item, i) {
        var newItem = JSON.parse(JSON.stringify(item));
        newItem.id = 'addon-' + Phoenix.uniqid();
        this.addons.splice(i + 1, 0, newItem);
      },
      addAddon: function addAddon() {
        Phoenix.trigger('addon:add', this.content);
      },
      addNewRow: function addNewRow() {
        this.content.addons.push({
          type: 'row'
        });
      },
      deleteAddon: function deleteAddon(i) {
        this.addons.splice(i, 1);
      },
      widthRange: function widthRange() {
        return underscore.range(1, 13); // 1 to 12 in array
      },
      getEmptyColumn: function getEmptyColumn() {
        return {
          id: 'col-' + Phoenix.uniqid(),
          disabled: false,
          addons: [],
          options: {
            html_class: '',
            align: 'center',
            valign: 'top',
            padding: {
              xs: '',
              md: '',
              lg: ''
            },
            margin: {
              xs: '',
              md: '',
              lg: ''
            },
            text_color: '',
            width: {
              xs: '',
              md: '',
              lg: this.child ? 'col-lg-6' : 'col-lg-3'
            },
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
                xs: 1
              },
              color: '',
              style: '',
              radius: {
                lg: 0,
                md: 0,
                xs: 0
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
              video: ''
            },
            animation: {
              name: '',
              duration: 300,
              delay: 0
            }
          }
        };
      }
    },
    watch: {},
    computed: {
      addons: function addons() {
        return this.content.addons;
      },
      options: function options() {
        return this.content.options;
      },
      width: function width() {
        return underscore.values(this.options.width).join(' ');
      }
    }
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Phoenix.data('component:row-edit', {
    name: 'row-edit',
    data: function data() {
      return {
        values: {},
        sticky: false
      };
    },
    props: {},
    created: function created() {},
    methods: {
      edit: function edit(data) {
        this.values = JSON.parse(JSON.stringify(data));
        $(this.$refs.generalTab).click();
        $(this.$refs.modal).modal('show');
        this.sticky = true;
      },
      save: function save() {
        Phoenix.trigger('row:save', JSON.parse(JSON.stringify(this.values)));
        $(this.$refs.modal).modal('hide');
        this.sticky = false;
      },
      close: function close() {
        var _this16 = this;

        $(this.$refs.modal).modal('hide');
        this.sticky = false;
        setTimeout(function () {
          _this16.values = {};
        }, 300);
      }
    },
    watch: {},
    computed: {
      options: function options() {
        return this.values.options;
      }
    }
  });
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Phoenix.data('component:row', {
    name: 'row',
    template: '#row-component-tmpl',
    components: {
      column: Phoenix.data('component:column')
    },
    data: function data() {
      return {
        content: {},
        drag: false
      };
    },
    props: {
      value: Object,
      child: {
        type: Boolean,
        "default": false
      },
      moveHandle: {
        type: String,
        "default": 'move-handle'
      }
    },
    created: function created() {
      var _this17 = this;

      this.content = this.value;

      if (typeof this.content.id === 'undefined') {
        underscore.each(this.getEmptyRow(), function (v, k) {
          Vue.set(_this17.content, k, v);
        });
      }
    },
    methods: {
      addNewColumn: function addNewColumn() {
        this.content.columns.push({
          foo: Phoenix.uniqid()
        });
      },
      copy: function copy() {
        this.$emit('copy');
      },
      copyColumn: function copyColumn(column, i) {
        column = JSON.parse(JSON.stringify(column));
        column.id = 'col-' + Phoenix.uniqid();
        column.addons = this.handleCopyAddons(column.addons);
        this.columns.splice(i + 1, 0, column);
      },
      handleCopyAddons: function handleCopyAddons(addons) {
        var _this18 = this;

        return addons.map(function (addon) {
          if (addon.type !== 'row') {
            addon.id = 'addon-' + Phoenix.uniqid();
            return addon;
          } // Is row


          addon.id = 'row-' + Phoenix.uniqid();
          addon.columns = addon.columns.map(function (column) {
            column.id = 'col-' + Phoenix.uniqid();
            column.addons = _this18.handleCopyAddons(column.addons);
            return column;
          });
          return addon;
        });
      },
      edit: function edit() {
        Phoenix.trigger('row:edit', this.content);
      },
      toggleDisabled: function toggleDisabled() {
        this.content.disabled = !this.content.disabled;
      },
      remove: function remove() {
        var _this19 = this;

        Phoenix.confirm('確定要刪除嗎?').then(function () {
          return _this19.$emit('delete');
        });
      },
      getEmptyRow: function getEmptyRow() {
        return {
          id: 'row-' + Phoenix.uniqid(),
          disabled: false,
          options: {
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
            subtitle: {
              text: '',
              font_size: {
                lg: '',
                md: '',
                xs: ''
              }
            },
            html_id: '',
            html_class: '',
            title_align: 'center',
            valign: 'top',
            fluid_row: false,
            no_gutter: false,
            padding: {
              lg: '',
              md: '',
              xs: ''
            },
            margin: {
              lg: '',
              md: '',
              xs: ''
            },
            display: {
              lg: 'd-lg-block',
              md: 'd-md-block',
              xs: 'd-block'
            },
            text_color: '',
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
              },
              parallax: false
            },
            animation: {
              name: '',
              duration: 300,
              delay: 0
            }
          },
          columns: []
        };
      },
      deleteColumn: function deleteColumn(i) {
        this.columns.splice(i, 1);
      }
    },
    watch: {
      columns: {
        handler: function handler() {
          this.$emit('columns-change', {
            columns: this.columns
          });
        },
        deep: true
      }
    },
    computed: {
      columns: function columns() {
        return this.content.columns;
      },
      options: function options() {
        return this.content.options;
      }
    }
  });
  Vue.component('row', Phoenix.data('component:row'));
});
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  var PageBuilder = new Vue({
    el: '#page-builder',
    data: {
      content: Phoenix.data('builder-content') || [],
      drag: false,
      editing: {
        column: {},
        row: {},
        addon: {}
      }
    },
    components: {
      'row': Phoenix.data('component:row'),
      'row-edit': Phoenix.data('component:row-edit'),
      'column': Phoenix.data('component:column'),
      'column-edit': Phoenix.data('component:column-edit'),
      'addon': Phoenix.data('component:addon'),
      'addon-edit': Phoenix.data('component:addon-edit')
    },
    mounted: function mounted() {
      var _this20 = this;

      Phoenix.on('row:edit', function (content, column) {
        _this20.editing.row = content;
        _this20.editing.column = content;

        _this20.$refs.rowEdit.edit(content);
      });
      Phoenix.on('row:save', function (content) {
        underscore.each(content, function (v, k) {
          _this20.editing.row[k] = v;
        });
        _this20.editing.column = {};
        _this20.editing.row = {};
      });
      Phoenix.on('column:edit', function (content) {
        _this20.editing.column = content;

        _this20.$refs.columnEdit.edit(content);
      });
      Phoenix.on('column:save', function (content) {
        underscore.each(content, function (v, k) {
          _this20.editing.column[k] = v;
        });
        _this20.editing.column = {};
      });
      Phoenix.on('addon:add', function (column) {
        _this20.editing.column = column;
        $(_this20.$refs.addonList).modal('show');
      });
      Phoenix.on('addon:edit', function (addon, column) {
        _this20.editing.addon = addon;
        _this20.editing.column = column;

        _this20.$refs.addonEdit.edit(addon);
      });
      Phoenix.on('addon:save', function (addon) {
        if (_this20.editing.column.addons.filter(function (item) {
          return item.id === addon.id;
        }).length === 0) {
          _this20.editing.column.addons.push(addon);
        }

        underscore.each(addon, function (v, k) {
          _this20.editing.addon[k] = v;
        });
        _this20.editing.column = {};
        _this20.editing.addon = {};
      });
    },
    methods: {
      addNewRow: function addNewRow() {
        var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (i != null) {
          this.content.splice(i + 1, 0, {});
        } else {
          this.content.push({});
        }
      },
      deleteRow: function deleteRow(i) {
        this.content.splice(i, 1);
      },
      copyRow: function copyRow(row, i) {
        row = JSON.parse(JSON.stringify(row));
        row.id = 'row-' + Phoenix.uniqid();
        row.columns = this.handleCopyColumns(row.columns);
        this.content.splice(i + 1, 0, row);
      },
      handleCopyColumns: function handleCopyColumns(columns) {
        var _this21 = this;

        return columns.map(function (column) {
          column.id = 'col-' + Phoenix.uniqid();
          column.addons = _this21.handleCopyAddons(column.addons);
          return column;
        });
      },
      handleCopyAddons: function handleCopyAddons(addons) {
        var _this22 = this;

        return addons.map(function (addon) {
          if (addon.type !== 'row') {
            addon.id = 'addon-' + Phoenix.uniqid();
            return addon;
          } // Is row


          addon.id = 'row-' + Phoenix.uniqid();
          addon.columns = addon.columns.map(function (column) {
            column.id = 'col-' + Phoenix.uniqid();
            column.addons = _this22.handleCopyAddons(column.addons);
            return column;
          });
          return addon;
        });
      },
      columnsChange: function columnsChange(row, $event) {
        row.columns = $event.columns;
      },
      selectAddon: function selectAddon(type) {
        var _this23 = this;

        $(this.$refs.addonList).modal('hide');
        var addonData = Phoenix.data('addons')[type];
        setTimeout(function () {
          Phoenix.trigger('addon:edit', _objectSpread({}, addonData, {
            id: 'addon-' + Phoenix.uniqid(),
            is: 'addon'
          }), _this23.editing.column);
          $('body').addClass('modal-open');
        }, 365);
      },
      getEmptyRow: function getEmptyRow() {
        return {
          id: 'row-' + Phoenix.uniqid(),
          options: {
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
            subtitle: {
              text: '',
              font_size: {
                lg: '',
                md: '',
                xs: ''
              }
            },
            html_id: '',
            html_class: '',
            title_align: 'center',
            valign: 'top',
            fluid_row: false,
            no_gutter: false,
            padding: {
              xl: '',
              md: '',
              xs: ''
            },
            margin: {
              xl: '',
              md: '',
              xs: ''
            },
            display: {
              xs: 'd-block',
              md: 'd-md-block',
              lg: 'd-lg-block'
            },
            text_color: '',
            background: {
              type: 'none',
              color: '',
              image: {
                url: '',
                overlay: '',
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
                url: '',
                overlay: ''
              },
              parallax: false
            },
            animation: {
              name: '',
              duration: 300,
              delay: 0
            }
          },
          columns: []
        };
      },
      getSaveValue: function getSaveValue() {
        return JSON.stringify(this.content);
      }
    },
    watch: {},
    computed: {}
  });
});
//# sourceMappingURL=page-builder.js.map
