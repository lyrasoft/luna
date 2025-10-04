import { defineComponent, ref, createElementBlock, openBlock, createElementVNode, createCommentVNode, withDirectives, vModelText, createVNode, createStaticVNode, createTextVNode, vModelSelect, normalizeClass } from "vue";
import { uid } from "@windwalker-io/unicorn-next";
import { u as useAddonModel } from "./useAddonModel.js";
import { U as UnicornSwitcher, S as SliderInput, B as ButtonRadio, _ as _export_sfc } from "./page-builder.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "addon-button",
  props: {
    addonId: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const options = useAddonModel({
      text: "",
      link: "",
      link_target: "",
      style: "btn-primary",
      border_radius: "",
      size: "",
      block: false,
      icon: "",
      icon_position: "left"
    });
    const uid$1 = ref(uid());
    const __returned__ = { options, uid: uid$1, ButtonRadio, SliderInput, UnicornSwitcher };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "form-group mb-3" };
const _hoisted_2 = { class: "form-group mb-3" };
const _hoisted_3 = { class: "form-group mb-3" };
const _hoisted_4 = {
  key: 0,
  class: "form-group mb-3"
};
const _hoisted_5 = { class: "form-group mb-3" };
const _hoisted_6 = ["list"];
const _hoisted_7 = ["id"];
const _hoisted_8 = { class: "form-group mb-3" };
const _hoisted_9 = { class: "form-group mb-3" };
const _hoisted_10 = { class: "form-group mb-3" };
const _hoisted_11 = { class: "form-group mb-3" };
const _hoisted_12 = { class: "input-group mb-3" };
const _hoisted_13 = { class: "input-group-text" };
const _hoisted_14 = { class: "form-group mb-3" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createElementVNode("div", _hoisted_1, [
      _cache[10] || (_cache[10] = createElementVNode("label", { for: "input-addon-edit-text" }, "Button Text", -1)),
      withDirectives(createElementVNode("input", {
        id: "input-addon-edit-text",
        type: "text",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.options.text = $event),
        class: "form-control"
      }, null, 512), [
        [vModelText, $setup.options.text]
      ])
    ]),
    createElementVNode("div", _hoisted_2, [
      _cache[11] || (_cache[11] = createElementVNode("label", { for: "input-addon-edit-align" }, "Align", -1)),
      createVNode($setup["ButtonRadio"], {
        color: "primary",
        variant: "outline",
        class: "w-100",
        modelValue: $setup.options.align,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.options.align = $event),
        options: [
          { text: "Default", value: "" },
          { text: "Left", value: "left" },
          { text: "Center", value: "center" },
          { text: "Right", value: "right" }
        ]
      }, null, 8, ["modelValue"])
    ]),
    createElementVNode("div", _hoisted_3, [
      _cache[12] || (_cache[12] = createElementVNode("label", { for: "input-addon-edit-link" }, "Link", -1)),
      withDirectives(createElementVNode("input", {
        id: "input-addon-edit-link",
        type: "url",
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.options.link = $event),
        class: "form-control"
      }, null, 512), [
        [vModelText, $setup.options.link]
      ])
    ]),
    $setup.options.link !== "" ? (openBlock(), createElementBlock("div", _hoisted_4, [
      _cache[13] || (_cache[13] = createElementVNode("label", { for: "input-addon-edit-link-target" }, "Open in New Window", -1)),
      createElementVNode("div", null, [
        createVNode($setup["UnicornSwitcher"], {
          name: "addon-edit-link-target",
          modelValue: $setup.options.link_target,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.options.link_target = $event),
          id: "input-addon-edit-link-target",
          shape: "circle",
          color: "success",
          "true-value": "_blank",
          "false-value": ""
        }, null, 8, ["modelValue"])
      ])
    ])) : createCommentVNode("", true),
    createElementVNode("div", _hoisted_5, [
      _cache[15] || (_cache[15] = createElementVNode("label", { for: "input-addon-edit-style" }, "Style", -1)),
      withDirectives(createElementVNode("input", {
        type: "search",
        id: "input-addon-edit-style",
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.options.style = $event),
        class: "form-control",
        list: `input-edit-style__list-${$setup.uid}`
      }, null, 8, _hoisted_6), [
        [vModelText, $setup.options.style]
      ]),
      createElementVNode("datalist", {
        id: `input-edit-style__list-${$setup.uid}`
      }, [..._cache[14] || (_cache[14] = [
        createStaticVNode('<option value="btn-primary">btn-primary</option><option value="btn-outline-primary">btn-outline-primary</option><option value="btn-secondary">btn-secondary</option><option value="btn-outline-secondary">btn-outline-secondary</option><option value="btn-success">btn-success</option><option value="btn-outline-success">btn-outline-success</option><option value="btn-info">btn-info</option><option value="btn-outline-info">btn-outline-info</option><option value="btn-warning">btn-warning</option><option value="btn-outline-warning">btn-outline-warning</option><option value="btn-danger">btn-danger</option><option value="btn-outline-danger">btn-outline-danger</option><option value="btn-dark">btn-dark</option><option value="btn-outline-dark">btn-outline-dark</option><option value="btn-light">btn-light</option><option value="btn-outline-light">btn-outline-light</option><option value="btn-link">btn-link</option>', 17)
      ])], 8, _hoisted_7),
      _cache[16] || (_cache[16] = createElementVNode("small", { class: "form-text text-muted" }, [
        createTextVNode(" Use "),
        createElementVNode("a", {
          href: "https://getbootstrap.com/docs/5.1/components/buttons/",
          target: "_blank"
        }, "Bootstrap button style"),
        createTextVNode(" , if you need a custom style, just enter your button class names. ")
      ], -1))
    ]),
    createElementVNode("div", _hoisted_8, [
      _cache[18] || (_cache[18] = createElementVNode("label", { for: "input-addon-edit-size" }, "Size", -1)),
      withDirectives(createElementVNode("select", {
        id: "input-addon-edit-size",
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.options.size = $event),
        class: "form-select custom-select"
      }, [..._cache[17] || (_cache[17] = [
        createElementVNode("option", { value: "" }, "Default", -1),
        createElementVNode("option", { value: "btn-sm" }, "btn-sm (Small)", -1),
        createElementVNode("option", { value: "btn-lg" }, "btn-lg (Large)", -1)
      ])], 512), [
        [vModelSelect, $setup.options.size]
      ]),
      _cache[19] || (_cache[19] = createElementVNode("small", { class: "form-text text-muted" }, [
        createTextVNode(" Use "),
        createElementVNode("a", {
          href: "https://getbootstrap.com/docs/4.5/components/buttons/",
          target: "_blank"
        }, "Bootstrap button style"),
        createTextVNode(" , if you need a custom style, just enter your button class names. ")
      ], -1))
    ]),
    createElementVNode("div", _hoisted_9, [
      _cache[20] || (_cache[20] = createElementVNode("label", null, " Border Radius ", -1)),
      createVNode($setup["SliderInput"], {
        modelValue: $setup.options.border_radius,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.options.border_radius = $event),
        max: 1200
      }, null, 8, ["modelValue"])
    ]),
    createElementVNode("div", _hoisted_10, [
      _cache[21] || (_cache[21] = createElementVNode("label", { for: "input-addon-edit-block" }, "Full-Width", -1)),
      createElementVNode("div", null, [
        createVNode($setup["UnicornSwitcher"], {
          name: "addon-edit-block",
          modelValue: $setup.options.block,
          "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.options.block = $event),
          id: "input-addon-edit-block",
          shape: "circle",
          color: "success",
          "true-value": true,
          "false-value": false
        }, null, 8, ["modelValue"])
      ])
    ]),
    createElementVNode("div", _hoisted_11, [
      _cache[22] || (_cache[22] = createElementVNode("label", { for: "input-addon-edit-icon" }, "Icon Class Name", -1)),
      createElementVNode("div", _hoisted_12, [
        createElementVNode("div", _hoisted_13, [
          createElementVNode("span", {
            class: normalizeClass($setup.options.icon)
          }, null, 2)
        ]),
        withDirectives(createElementVNode("input", {
          id: "input-addon-edit-icon",
          type: "text",
          "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.options.icon = $event),
          class: "form-control"
        }, null, 512), [
          [vModelText, $setup.options.icon]
        ])
      ]),
      _cache[23] || (_cache[23] = createElementVNode("small", { class: "form-text text-muted" }, [
        createTextVNode(" Enter icon class, example: "),
        createElementVNode("code", null, "fa fa-star"),
        createTextVNode(". You can find icons from: "),
        createElementVNode("a", {
          target: "_blank",
          href: "https://fontawesome.com/v6.0/icons"
        }, "FontAwsome")
      ], -1))
    ]),
    createElementVNode("div", _hoisted_14, [
      _cache[24] || (_cache[24] = createElementVNode("label", { for: "input-addon-edit-icon_position" }, "Icon Position", -1)),
      createVNode($setup["ButtonRadio"], {
        color: "primary",
        variant: "outline",
        class: "w-100",
        modelValue: $setup.options.icon_position,
        "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.options.icon_position = $event),
        options: [
          { text: "Left", value: "left" },
          { text: "Right", value: "right" }
        ]
      }, null, 8, ["modelValue"])
    ])
  ]);
}
const addonButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "addon-button.vue"]]);
export {
  addonButton as default
};
//# sourceMappingURL=addon-button.js.map
