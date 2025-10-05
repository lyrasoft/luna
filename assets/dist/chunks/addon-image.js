import { defineComponent, mergeModels, useModel, createElementBlock, openBlock, createElementVNode, createTextVNode, createBlock, createCommentVNode, withDirectives, vModelText, createVNode } from "vue";
import "@windwalker-io/unicorn-next";
import { u as useAddonDefaults } from "./useAddonDefaults.js";
import "./usePageBuilderUtilities.js";
import "bootstrap";
import { B as ButtonRadio } from "./ButtonRadio.js";
import { S as SingleImage } from "./SingleImage.js";
import { S as SliderInput, _ as _export_sfc } from "./SliderInput.js";
import { U as UnicornSwitcher } from "./UnicornSwitcher.js";
import { R as RwdTitleOptions } from "./RwdTitleOptions.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "addon-image",
  props: /* @__PURE__ */ mergeModels({
    addonId: {}
  }, {
    "modelValue": { required: true },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    __expose();
    const options = useModel(__props, "modelValue");
    useAddonDefaults(options, {
      image: "",
      border_radius: "",
      alt: "",
      link: "",
      link_target: "",
      align: ""
    });
    const __returned__ = { options, ButtonRadio, SingleImage, SliderInput, UnicornSwitcher, RwdTitleOptions };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "form-group mb-3" };
const _hoisted_2 = { class: "form-group mb-3" };
const _hoisted_3 = { class: "form-group mb-3" };
const _hoisted_4 = {
  key: 1,
  class: "form-group mb-3"
};
const _hoisted_5 = { class: "form-group mb-3" };
const _hoisted_6 = { class: "form-group mb-3" };
const _hoisted_7 = { class: "form-group mb-3" };
const _hoisted_8 = { class: "mt-2" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createElementVNode("div", _hoisted_1, [
      _cache[8] || (_cache[8] = createElementVNode("label", { for: "input-addon-edit-title-text" }, "Title", -1)),
      _cache[9] || (_cache[9] = createTextVNode()),
      withDirectives(createElementVNode("textarea", {
        id: "input-addon-edit-title-text",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.options.title.text = $event),
        class: "form-control"
      }, null, 512), [
        [vModelText, $setup.options.title.text]
      ]),
      _cache[10] || (_cache[10] = createTextVNode()),
      _cache[11] || (_cache[11] = createElementVNode("small", { class: "form-text text-muted" }, "The main title of this section, keep empty to hide it.", -1))
    ]),
    _cache[26] || (_cache[26] = createTextVNode()),
    $setup.options.title.text !== "" ? (openBlock(), createBlock($setup["RwdTitleOptions"], {
      key: 0,
      id: "input-addon-edit",
      modelValue: $setup.options.title,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.options.title = $event)
    }, null, 8, ["modelValue"])) : createCommentVNode("", true),
    _cache[27] || (_cache[27] = createTextVNode()),
    _cache[28] || (_cache[28] = createElementVNode("hr", null, null, -1)),
    _cache[29] || (_cache[29] = createTextVNode()),
    createElementVNode("div", _hoisted_2, [
      _cache[12] || (_cache[12] = createElementVNode("label", { for: "input-addon-edit-image" }, "Image", -1)),
      _cache[13] || (_cache[13] = createTextVNode()),
      createVNode($setup["SingleImage"], {
        modelValue: $setup.options.image,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.options.image = $event),
        id: "input-addon-edit-image"
      }, null, 8, ["modelValue"])
    ]),
    _cache[30] || (_cache[30] = createTextVNode()),
    createElementVNode("div", _hoisted_3, [
      _cache[14] || (_cache[14] = createElementVNode("label", { for: "input-addon-edit-link" }, "Link", -1)),
      _cache[15] || (_cache[15] = createTextVNode()),
      withDirectives(createElementVNode("input", {
        id: "input-addon-edit-link",
        type: "url",
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.options.link = $event),
        class: "form-control"
      }, null, 512), [
        [vModelText, $setup.options.link]
      ])
    ]),
    _cache[31] || (_cache[31] = createTextVNode()),
    $setup.options.link !== "" ? (openBlock(), createElementBlock("div", _hoisted_4, [
      _cache[16] || (_cache[16] = createElementVNode("label", { for: "input-addon-edit-link-target" }, "Open in New Window", -1)),
      _cache[17] || (_cache[17] = createTextVNode()),
      createElementVNode("div", null, [
        createVNode($setup["UnicornSwitcher"], {
          name: "addon-edit-link-target",
          modelValue: $setup.options.link_target,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.options.link_target = $event),
          id: "input-addon-edit-link-target",
          shape: "circle",
          color: "success",
          "true-value": "_blank",
          "false-value": ""
        }, null, 8, ["modelValue"])
      ])
    ])) : createCommentVNode("", true),
    _cache[32] || (_cache[32] = createTextVNode()),
    createElementVNode("div", _hoisted_5, [
      _cache[18] || (_cache[18] = createElementVNode("label", { for: "input-addon-edit-alt" }, "Alt Text", -1)),
      _cache[19] || (_cache[19] = createTextVNode()),
      withDirectives(createElementVNode("input", {
        id: "input-addon-edit-alt",
        type: "text",
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.options.alt = $event),
        class: "form-control"
      }, null, 512), [
        [vModelText, $setup.options.alt]
      ]),
      _cache[20] || (_cache[20] = createTextVNode()),
      _cache[21] || (_cache[21] = createElementVNode("small", { class: "form-text text-muted" }, "\n        The alt text if image unavailable, also good for SEO.\n      ", -1))
    ]),
    _cache[33] || (_cache[33] = createTextVNode()),
    createElementVNode("div", _hoisted_6, [
      _cache[22] || (_cache[22] = createElementVNode("label", null, "\n        Border Radius\n      ", -1)),
      _cache[23] || (_cache[23] = createTextVNode()),
      createVNode($setup["SliderInput"], {
        modelValue: $setup.options.border_radius,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.options.border_radius = $event),
        max: 1200
      }, null, 8, ["modelValue"])
    ]),
    _cache[34] || (_cache[34] = createTextVNode()),
    createElementVNode("div", _hoisted_7, [
      _cache[24] || (_cache[24] = createElementVNode("label", { for: "input-addon-edit-align" }, "Image Alignment", -1)),
      _cache[25] || (_cache[25] = createTextVNode()),
      createElementVNode("div", _hoisted_8, [
        createVNode($setup["ButtonRadio"], {
          color: "primary",
          variant: "outline",
          class: "w-100",
          modelValue: $setup.options.align,
          "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.options.align = $event),
          options: [
            { text: "Default", value: "" },
            { text: "Left", value: "left" },
            { text: "Center", value: "center" },
            { text: "Right", value: "right" }
          ]
        }, null, 8, ["modelValue"])
      ])
    ])
  ]);
}
const addonImage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "addon-image.vue"]]);
export {
  addonImage as default
};
//# sourceMappingURL=addon-image.js.map
