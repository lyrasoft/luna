'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

$(function () {
  Vue.component('animation-selector', {
    template: '\n<div class="cation-selector">\n    <div class="form-group">\n        <label :for="id + \'-name\'">\u52D5\u756B\u540D\u7A31</label>\n        <select :id="id + \'-name\'" class="form-control" v-model="animation.name">\n            <option value="">\u7121</option>\n            <option v-for="anim of getAnimations()" :value="anim">\n                {{ anim }}\n            </option>\n        </select>\n    </div>\n    \n    <div class="form-group">\n        <label :for="id + \'-duration\'">\u52D5\u756B\u6301\u7E8C\u6642\u9593</label>\n        <input type="number" :id="id + \'-duration\'" class="form-control" v-model="animation.duration" min="0" />\n        <small class="form-text text-muted">\n            \u52D5\u756B\u7684\u901F\u5EA6\uFF0C\u55AE\u4F4D: \u5FAE\u79D2 (1/1000 \u79D2)\n        </small>\n    </div>\n    \n    <div class="form-group">\n        <label :for="id + \'-delay\'">\u7B49\u5F85\u6642\u9593</label>\n        <input type="number" :id="id + \'-delay\'" class="form-control" v-model="animation.duration" min="0" />\n        <small class="form-text text-muted">\n            \u7B49\u5F85\u4E00\u5B9A\u6642\u9593\u5F8C\u624D\u767C\u751F\u52D5\u756B\uFF0C\u55AE\u4F4D: \u5FAE\u79D2 (1/1000 \u79D2)\n        </small>\n    </div>\n</div>\n',
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
    template: '\n<div class="c-box-offset">\n    <div class="c-gradient-preview mb-3" style="height: 100px; border: 1px solid rgba(0, 0, 0, .2);" \n        :style="{\'background-image\': backgroundImage}">\n    </div>\n\n    <div class="form-row">\n        <div class="col-6">\n            <div class="form-group">\n                <label :for="id + \'-color1\'">\u984F\u8272 1</label>\n                <input type="text" :id="id + \'-color1\'" v-model.lazy="gradient.start_color" v-color class="form-control" />\n            </div>\n            <div class="form-group">\n                <label :for="id + \'-color1-pos\'">\u984F\u8272 1 \u4F4D\u7F6E</label>\n                <vue-slide-bar v-model="gradient.start_pos"></vue-slide-bar>\n            </div>\n        </div>\n        <div class="col-6">\n            <div class="form-group">\n                <label :for="id + \'-color2\'">\u984F\u8272 2</label>\n                <input type="text" :id="id + \'-color2\'" v-model.lazy="gradient.end_color" v-color class="form-control" />\n            </div>\n            <div class="form-group">\n                <label :for="id + \'-color2-pos\'">\u984F\u8272 2 \u4F4D\u7F6E</label>\n                <vue-slide-bar v-model="gradient.end_pos"></vue-slide-bar>\n            </div>\n        </div>\n    </div>\n\n    <div class="form-group">\n        <label :for="id + \'-type\'">\u6F38\u5C64\u6A21\u5F0F</label>\n        <select :id="id + \'-type\'" v-model.lazy="gradient.type" class="form-control">\n            <option value="linear">\u7DDA\u6027 Linear</option>\n            <option value="radial">\u653E\u5C04 Radial</option>\n        </select>\n    </div>\n\n    <div class="form-group">\n        <label :for="id + \'-angle\'">\u89D2\u5EA6</label>\n        <vue-slide-bar :id="id + \'-angle\'" v-model="gradient.angle" :max="360">\n        </vue-slide-bar>\n    </div>\n</div>\n    ',
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
      // this.gradient = this.value;
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
          return gradient.type + '-gradient(' + gradient.angle + 'deg, ' + gradient.start_color + ' ' + gradient.start_pos + '%, ' + (gradient.end_color + ' ' + gradient.end_pos + '%)');
        }

        return gradient.type + '-gradient(' + gradient.start_color + ' ' + gradient.start_pos + '%, ' + (gradient.end_color + ' ' + gradient.end_pos + '%)');
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
    template: '\n<div class="form-group" :class="getClassName()">\n    <div class="d-flex" :class="getClassName(\'__title\')">\n        <div class="">\n                <slot name="label"></slot>\n        </div>\n        <div class="ml-auto" :class="getClassName(\'__rwd-control\')">\n            <a href="javascript://" :class="[currentSize === \'lg\' ? \'active\' : \'text-dark\']" @click="currentSize = \'lg\'">\n                <span class="fa fa-fw fa-desktop"></span>\n            </a>\n            <a href="javascript://" :class="[currentSize === \'md\' ? \'active\' : \'text-dark\']" @click="currentSize = \'md\'">\n                <span class="fas fa-fw fa-tablet"></span>\n            </a>\n            <a href="javascript://" :class="[currentSize === \'xs\' ? \'active\' : \'text-dark\']" @click="currentSize = \'xs\'">\n                <span class="fas fa-fw fa-mobile"></span>\n            </a>\n        </div>\n    </div>\n\n    <div :class="getClassName(\'__inputs\')">\n        <slot name="lg" v-if="currentSize === \'lg\'"></slot>\n        <slot name="md" v-if="currentSize === \'md\'"></slot>\n        <slot name="xs" v-if="currentSize === \'xs\'"></slot>\n    </div>\n\n    <slot name="description"></slot>\n</div>\n    ',
    data: function data() {
      return {
        currentSize: ''
      };
    },

    props: {
      name: String,
      className: {
        default: 'c-rwd-group',
        type: String
      }
    },
    mounted: function mounted() {
      var _this = this;

      // Fix DOM loading issues
      setTimeout(function () {
        _this.currentSize = 'lg';
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
    template: '\n<rwd-group class-name="c-box-offset">\n    <div slot="label" class="mb-3">\n        <slot name="label"></slot>\n        <a href="javascript://" @click="lock = !lock">\n            <span class="fa" :class="[lock ? \'fa-lock\' : \'fa-lock-open\']"></span>\n        </a>\n    </div>\n    <div v-for="size of [\'lg\', \'md\', \'xs\']" class="form-group" :slot="size" :class="\'c-box-offset__\' + size">\n        <div class="form-row">\n            <div class="col-3">\n                <input type="text" class="form-control" placeholder="Top" v-model="offsets[size].top" />\n            </div>\n            <div class="col-3">\n                <input type="text" class="form-control" placeholder="Right" v-model="offsets[size].right" />\n            </div>\n            <div class="col-3">\n                <input type="text" class="form-control" placeholder="Bottom" v-model="offsets[size].bottom" />\n            </div>\n            <div class="col-3">\n                <input type="text" class="form-control" placeholder="Left" v-model="offsets[size].left" />\n            </div>\n        </div>\n    </div>\n</rwd-group>\n\n    ',
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
      var _this2 = this;

      underscore.each(this.offsets, function (offset, size) {
        underscore.each(offset, function (value, pos) {
          _this2.$watch('offsets.' + size + '.' + pos, function (v) {
            if (_this2.lock) {
              offset.top = v;
              offset.right = v;
              offset.bottom = v;
              offset.left = v;
            }

            var allValue = _this2.getAllValues();

            _this2.$emit('change', allValue);
            _this2.$emit('input', allValue);
          });
        });
      });
    },

    methods: {
      getAllValues: function getAllValues() {
        var values = {};

        underscore.each(this.offsets, function (offset, size) {
          values[size] = offset.top + ' ' + offset.right + ' ' + offset.bottom + ' ' + offset.left;
        });

        return values;
      }
    },
    watch: {
      value: function value(_value) {
        var _this3 = this;

        console.log(_value);
        underscore.each(_value, function (offset, size) {
          console.log(size);

          var _offset$split = offset.split(' '),
              _offset$split2 = _slicedToArray(_offset$split, 4),
              top = _offset$split2[0],
              right = _offset$split2[1],
              bottom = _offset$split2[2],
              left = _offset$split2[3];

          _this3.offsets[size].top = top;
          _this3.offsets[size].right = right;
          _this3.offsets[size].bottom = bottom;
          _this3.offsets[size].left = left;
        });
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
    template: '\n<button type="button" class="btn flex-fill" :data-value="value"\n    @click="select()"\n    :class="[active ? activeClass : \'btn-outline-secondary\']">\n    <slot></slot>\n</button>',
    data: function data() {
      return {
        active: false
      };
    },

    props: {
      value: String,
      activeClass: {
        default: 'btn-success'
      }
    },
    mounted: function mounted() {
      var _this4 = this;

      this.active = this.$parent.value === this.value;

      this.$parent.$on('button-selected', function (value) {
        _this4.active = value === _this4.value;
      });
    },

    methods: {
      select: function select() {
        this.$parent.$emit('button-selected', this.value);
      }
    }
  });

  Vue.component('radio-buttons', {
    template: '\n<div class="btn-group">\n  <slot></slot>\n</div>\n    ',
    data: function data() {
      return {};
    },

    props: {
      value: String
    },
    mounted: function mounted() {
      var _this5 = this;

      this.$on('button-selected', function (value) {
        _this5.$emit('change', value);
        _this5.$emit('input', value);
      });

      // this.$nextTick(() => {
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
  Vue.directive('color', {
    inserted: function inserted(el) {
      $(el).minicolors({
        control: 'hue',
        position: 'left',
        opacity: true,
        format: 'rgb',
        theme: 'bootstrap',
        change: function change(value) {
          var event = new Event('change', { bubbles: true });
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
  Phoenix.data('component:column-edit', {
    name: 'column-edit',

    data: function data() {
      return {
        values: {}
      };
    },


    props: {},

    created: function created() {},


    methods: {
      edit: function edit(data) {
        this.values = JSON.parse(JSON.stringify(data));

        $(this.$refs.generalTab).click();
        $(this.$refs.modal).modal('show');
      },
      save: function save() {
        Phoenix.trigger('column:save', JSON.parse(JSON.stringify(this.values)));

        this.values = {};

        $(this.$refs.modal).modal('hide');
      },
      close: function close() {
        this.values = {};

        $(this.$refs.modal).modal('hide');
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

    data: function data() {
      return {
        addons: [],
        options: {}
      };
    },


    props: {
      content: Object,
      index: Number
    },

    created: function created() {
      this.addons = this.content.addons;
      this.options = this.content.options;
    },


    methods: {
      edit: function edit() {
        Phoenix.trigger('column:edit', this.content);
      },
      disable: function disable() {},
      remove: function remove() {
        this.$emit('delete');
      }
    },

    watch: {},

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
  Phoenix.data('component:row', {
    name: 'row',
    template: '#row-component-tmpl',
    components: {
      column: Phoenix.data('component:column')
    },

    data: function data() {
      return {
        columns: [],
        options: {},
        drag: false
      };
    },


    props: {
      content: Object
    },

    created: function created() {
      this.columns = this.content.columns;
      this.options = this.content.options;
    },


    methods: {
      addNewColumn: function addNewColumn() {
        this.columns.push(this.getEmptyColumn());
      },
      getEmptyColumn: function getEmptyColumn() {
        return {
          id: 'col-' + Phoenix.uniqid(),
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
              lg: 'col-lg-3'
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
              video: ''
            },
            animation: {
              name: '',
              duration: 300,
              delay: 0
            }
          }
        };
      },
      getColumnWidth: function getColumnWidth(columnOptions) {
        return underscore.values(columnOptions.width).join(' ');
      },
      deleteColumn: function deleteColumn(i) {
        this.columns.splice(i, 1);
      }
    },

    watch: {
      // content() {
      //   this.options = this.content.options;
      //   this.columns = this.content.columns;
      // },
      columns: {
        handler: function handler() {
          this.$emit('columns-change', { columns: this.columns });
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
  var PageBuilder = new Vue({
    el: '#page-builder',
    data: {
      content: Phoenix.data('builder-content') || [],
      drag: false,
      editing: {
        column: {}
      }
    },
    components: {
      'row': Phoenix.data('component:row'),
      'column': Phoenix.data('component:column'),
      'column-edit': Phoenix.data('component:column-edit')
    },
    mounted: function mounted() {
      var _this6 = this;

      Phoenix.on('column:edit', function (content) {
        _this6.editing.column = content;
        _this6.$refs.columnEdit.edit(content);
      });

      Phoenix.on('column:save', function (content) {
        underscore.each(content, function (v, k) {
          _this6.editing.column[k] = v;
          // this.editing.column = {};
        });
      });
    },

    methods: {
      addNewRow: function addNewRow() {
        this.content.push(this.getEmptyRow());
      },
      columnsChange: function columnsChange(row, $event) {
        row.columns = $event.columns;
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
              margin: ''
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
            align: 'center',
            valign: 'top',
            fluid_row: false,
            no_gutter: false,
            padding: '100px 0 100px 0',
            margin: '0',
            text_color: '',
            background: {
              color: '',
              image: '',
              gradient: '',
              video: ''
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
