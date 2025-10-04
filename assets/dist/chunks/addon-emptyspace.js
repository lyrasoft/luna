import { defineComponent, createElementBlock, openBlock, createVNode, createElementVNode, createCommentVNode, createSlots, withCtx, renderList, withDirectives, vModelText } from "vue";
import { u as useAddonModel } from "./useAddonModel.js";
import { U as UnicornSwitcher, S as SliderInput, a as RwdGroup, _ as _export_sfc } from "./page-builder.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "addon-emptyspace",
  props: {
    addonId: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const options = useAddonModel({
      height: {
        lg: "",
        md: "",
        xs: ""
      },
      link: "",
      link_target: ""
    });
    const __returned__ = { options, RwdGroup, SliderInput, UnicornSwitcher };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "form-group mb-3" };
const _hoisted_2 = {
  key: 0,
  class: "form-group mb-3"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createVNode($setup["RwdGroup"], { "class-name": "c-empty-height" }, createSlots({
      label: withCtx(() => [
        _cache[2] || (_cache[2] = createElementVNode("label", null, " Height ", -1))
      ]),
      _: 2
    }, [
      renderList(["lg", "md", "xs"], (size) => {
        return {
          name: size,
          fn: withCtx(() => [
            createVNode($setup["SliderInput"], {
              modelValue: $setup.options.height[size],
              "onUpdate:modelValue": ($event) => $setup.options.height[size] = $event,
              max: 1e3
            }, null, 8, ["modelValue", "onUpdate:modelValue"])
          ])
        };
      })
    ]), 1024),
    createElementVNode("div", _hoisted_1, [
      _cache[3] || (_cache[3] = createElementVNode("label", { for: "input-addon-edit-link" }, "Link", -1)),
      withDirectives(createElementVNode("input", {
        id: "input-addon-edit-link",
        type: "url",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.options.link = $event),
        class: "form-control"
      }, null, 512), [
        [vModelText, $setup.options.link]
      ])
    ]),
    $setup.options.link !== "" ? (openBlock(), createElementBlock("div", _hoisted_2, [
      _cache[4] || (_cache[4] = createElementVNode("label", { for: "input-addon-edit-link-target" }, "Open in New Window", -1)),
      createElementVNode("div", null, [
        createVNode($setup["UnicornSwitcher"], {
          name: "addon-edit-link-target",
          modelValue: $setup.options.link_target,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.options.link_target = $event),
          id: "input-addon-edit-link-target",
          shape: "circle",
          color: "success",
          "true-value": "_blank",
          "false-value": ""
        }, null, 8, ["modelValue"])
      ])
    ])) : createCommentVNode("", true)
  ]);
}
const addonEmptyspace = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "addon-emptyspace.vue"]]);
export {
  addonEmptyspace as default
};
//# sourceMappingURL=addon-emptyspace.js.map
