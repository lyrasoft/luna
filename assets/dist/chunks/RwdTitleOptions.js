import { defineComponent, useModel, ref, onMounted, onBeforeUnmount, mergeModels, withDirectives, openBlock, createElementBlock, normalizeClass, vModelText, createElementVNode, createTextVNode, Fragment, renderList, toDisplayString, vModelSelect, createVNode, createSlots, withCtx, createCommentVNode } from "vue";
import { R as RwdGroup } from "./RwdGroup.js";
import Spectrum from "spectrum-vanilla";
import { _ as _export_sfc, S as SliderInput } from "./SliderInput.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ColorInput",
  props: /* @__PURE__ */ mergeModels({
    id: {},
    inputClass: {},
    options: {}
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const value = useModel(__props, "modelValue");
    const input = ref();
    let sp;
    onMounted(() => {
      sp = Spectrum.getInstance(input.value, props.options || {});
    });
    onBeforeUnmount(() => {
      sp?.destroy();
    });
    const __returned__ = { props, value, input, get sp() {
      return sp;
    }, set sp(v) {
      sp = v;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$1 = ["id"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("input", {
    ref: "input",
    type: "text",
    id: $props.id,
    class: normalizeClass(["form-control flex-grow-1", $props.inputClass]),
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.value = $event)
  }, null, 10, _hoisted_1$1)), [
    [
      vModelText,
      $setup.value,
      void 0,
      { lazy: true }
    ]
  ]);
}
const ColorInput = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "ColorInput.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RwdTitleOptions",
  props: /* @__PURE__ */ mergeModels({
    id: {}
  }, {
    "modelValue": {
      required: true
    },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const options = useModel(__props, "modelValue");
    const prepared = ref(false);
    onMounted(() => {
      setTimeout(() => {
        prepared.value = true;
      }, 150);
    });
    const __returned__ = { props, options, prepared, RwdGroup, ColorInput, SliderInput };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "c-title-options" };
const _hoisted_2 = { class: "form-row row" };
const _hoisted_3 = { class: "col-6" };
const _hoisted_4 = { class: "form-group mb-3" };
const _hoisted_5 = ["for"];
const _hoisted_6 = ["id"];
const _hoisted_7 = ["value"];
const _hoisted_8 = { class: "col" };
const _hoisted_9 = { class: "form-group mb-3" };
const _hoisted_10 = ["for"];
const _hoisted_11 = { class: "form-row row" };
const _hoisted_12 = { class: "col-6" };
const _hoisted_13 = { class: "col-6" };
const _hoisted_14 = { class: "form-group mb-3" };
const _hoisted_15 = {
  key: 0,
  class: ""
};
const _hoisted_16 = { class: "form-row row" };
const _hoisted_17 = { class: "col-6" };
const _hoisted_18 = ["onUpdate:modelValue"];
const _hoisted_19 = { class: "col-6" };
const _hoisted_20 = ["onUpdate:modelValue"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", _hoisted_2, [
      createElementVNode("div", _hoisted_3, [
        createElementVNode("div", _hoisted_4, [
          createElementVNode("label", {
            for: $props.id + "title-element"
          }, "\n            Title Element\n          ", 8, _hoisted_5),
          _cache[3] || (_cache[3] = createTextVNode()),
          withDirectives(createElementVNode("select", {
            id: $props.id + "title-element",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.options.element = $event),
            class: "form-select custom-select"
          }, [
            (openBlock(), createElementBlock(Fragment, null, renderList([1, 2, 3, 4, 5, 6], (i) => {
              return createElementVNode("option", {
                value: "h" + i
              }, "\n              h" + toDisplayString(i), 9, _hoisted_7);
            }), 64))
          ], 8, _hoisted_6), [
            [vModelSelect, $setup.options.element]
          ])
        ])
      ]),
      _cache[5] || (_cache[5] = createTextVNode()),
      createElementVNode("div", _hoisted_8, [
        createElementVNode("div", _hoisted_9, [
          createElementVNode("label", {
            for: $props.id + "title-color"
          }, "Title Color", 8, _hoisted_10),
          _cache[4] || (_cache[4] = createTextVNode()),
          createVNode($setup["ColorInput"], {
            id: $props.id + "title-color",
            modelValue: $setup.options.color,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.options.color = $event),
            modelModifiers: { lazy: true }
          }, null, 8, ["id", "modelValue"])
        ])
      ])
    ]),
    _cache[16] || (_cache[16] = createTextVNode()),
    createElementVNode("div", _hoisted_11, [
      createElementVNode("div", _hoisted_12, [
        createVNode($setup["RwdGroup"], { "class-name": "c-title-font-size" }, createSlots({
          label: withCtx(() => [
            _cache[6] || (_cache[6] = createElementVNode("label", null, "\n              Title Font Size\n            ", -1))
          ]),
          _: 2
        }, [
          renderList(["lg", "md", "xs"], (size) => {
            return {
              name: size,
              fn: withCtx(() => [
                createVNode($setup["SliderInput"], {
                  modelValue: $setup.options.font_size[size],
                  "onUpdate:modelValue": ($event) => $setup.options.font_size[size] = $event,
                  max: 500
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ])
            };
          })
        ]), 1024)
      ]),
      _cache[10] || (_cache[10] = createTextVNode()),
      createElementVNode("div", _hoisted_13, [
        createElementVNode("div", _hoisted_14, [
          _cache[8] || (_cache[8] = createElementVNode("label", null, "\n            Title Font Weight\n          ", -1)),
          _cache[9] || (_cache[9] = createTextVNode()),
          $setup.prepared ? (openBlock(), createElementBlock("div", _hoisted_15, [
            createVNode($setup["SliderInput"], {
              modelValue: $setup.options.font_weight,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.options.font_weight = $event),
              data: ["", 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1e3],
              max: 1e3
            }, null, 8, ["modelValue"])
          ])) : createCommentVNode("", true)
        ])
      ])
    ]),
    _cache[17] || (_cache[17] = createTextVNode()),
    createElementVNode("div", _hoisted_16, [
      createElementVNode("div", _hoisted_17, [
        createVNode($setup["RwdGroup"], { "class-name": "c-title-margin_top" }, createSlots({
          label: withCtx(() => [
            _cache[11] || (_cache[11] = createElementVNode("label", null, "\n              Title Margin Top\n            ", -1))
          ]),
          _: 2
        }, [
          renderList(["lg", "md", "xs"], (size) => {
            return {
              name: size,
              fn: withCtx(() => [
                withDirectives(createElementVNode("input", {
                  type: "number",
                  "onUpdate:modelValue": ($event) => $setup.options.margin_top[size] = $event,
                  class: "form-control"
                }, null, 8, _hoisted_18), [
                  [vModelText, $setup.options.margin_top[size]]
                ])
              ])
            };
          })
        ]), 1024)
      ]),
      _cache[15] || (_cache[15] = createTextVNode()),
      createElementVNode("div", _hoisted_19, [
        createVNode($setup["RwdGroup"], { "class-name": "c-title-margin_bottom" }, createSlots({
          label: withCtx(() => [
            _cache[13] || (_cache[13] = createElementVNode("label", null, "\n              Title Margin Bottom\n            ", -1))
          ]),
          _: 2
        }, [
          renderList(["lg", "md", "xs"], (size) => {
            return {
              name: size,
              fn: withCtx(() => [
                withDirectives(createElementVNode("input", {
                  type: "number",
                  "onUpdate:modelValue": ($event) => $setup.options.margin_bottom[size] = $event,
                  class: "form-control"
                }, null, 8, _hoisted_20), [
                  [vModelText, $setup.options.margin_bottom[size]]
                ])
              ])
            };
          })
        ]), 1024)
      ])
    ])
  ]);
}
const RwdTitleOptions = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "RwdTitleOptions.vue"]]);
export {
  ColorInput as C,
  RwdTitleOptions as R
};
//# sourceMappingURL=RwdTitleOptions.js.map
