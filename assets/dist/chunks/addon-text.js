import { defineComponent, resolveDirective, createElementBlock, openBlock, createElementVNode, createBlock, createCommentVNode, createVNode, withDirectives, vModelText, createSlots, withCtx, renderList } from "vue";
import { u as useAddonModel } from "./useAddonModel.js";
import { R as RwdTitleOptions, S as SliderInput, a as RwdGroup, B as ButtonRadio, _ as _export_sfc } from "./page-builder.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "addon-text",
  props: {
    addonId: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const options = useAddonModel({
      title: {
        text: ""
      },
      align: "",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium, massa dictum hendrerit maximus, ex est semper est, quis sodales odio elit a urna. Pellentesque dapibus vel orci id lacinia. Curabitur dui purus, condimentum vitae dapibus ut, rhoncus vitae sem. Donec dignissim, dui ut sollicitudin consectetur, est lacus elementum mi, sit amet imperdiet nisl metus at nunc.",
      content_font_size: {
        lg: "",
        md: "",
        xs: ""
      },
      content_line_height: {
        lg: "",
        md: "",
        xs: ""
      }
    });
    const __returned__ = { options, ButtonRadio, RwdGroup, SliderInput, RwdTitleOptions };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "form-group mb-3" };
const _hoisted_2 = { class: "form-group mb-3" };
const _hoisted_3 = { class: "form-group mb-3" };
const _hoisted_4 = { class: "mt-2" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_tinymce = resolveDirective("tinymce");
  return openBlock(), createElementBlock("div", null, [
    createElementVNode("div", _hoisted_1, [
      _cache[4] || (_cache[4] = createElementVNode("label", { for: "input-addon-edit-title-text" }, "Title", -1)),
      withDirectives(createElementVNode("textarea", {
        id: "input-addon-edit-title-text",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.options.title.text = $event),
        class: "form-control"
      }, null, 512), [
        [vModelText, $setup.options.title.text]
      ]),
      _cache[5] || (_cache[5] = createElementVNode("small", { class: "form-text text-muted" }, "The main title of this section, keep empty to hide it.", -1))
    ]),
    $setup.options.title.text !== "" ? (openBlock(), createBlock($setup["RwdTitleOptions"], {
      key: 0,
      id: "input-addon-edit",
      modelValue: $setup.options.title,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.options.title = $event)
    }, null, 8, ["modelValue"])) : createCommentVNode("", true),
    _cache[10] || (_cache[10] = createElementVNode("hr", null, null, -1)),
    createElementVNode("div", _hoisted_2, [
      _cache[6] || (_cache[6] = createElementVNode("label", { for: "addon-edit-content" }, "Content", -1)),
      withDirectives(createElementVNode("textarea", {
        id: "addon-edit-content",
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.options.content = $event),
        class: "form-control"
      }, null, 512), [
        [vModelText, $setup.options.content],
        [_directive_tinymce]
      ])
    ]),
    createElementVNode("div", _hoisted_3, [
      _cache[7] || (_cache[7] = createElementVNode("label", { for: "input-addon-edit-title-align" }, "Content Alignment", -1)),
      createElementVNode("div", _hoisted_4, [
        createVNode($setup["ButtonRadio"], {
          color: "primary",
          variant: "outline",
          class: "w-100",
          modelValue: $setup.options.align,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.options.align = $event),
          options: [
            { text: "Default", value: "" },
            { text: "Left", value: "left" },
            { text: "Center", value: "center" },
            { text: "Right", value: "right" }
          ]
        }, null, 8, ["modelValue"])
      ])
    ]),
    createVNode($setup["RwdGroup"], { "class-name": "c-content-font-size" }, createSlots({
      label: withCtx(() => [
        _cache[8] || (_cache[8] = createElementVNode("label", null, " Content Font Size ", -1))
      ]),
      _: 2
    }, [
      renderList(["lg", "md", "xs"], (size) => {
        return {
          name: size,
          fn: withCtx(() => [
            createVNode($setup["SliderInput"], {
              modelValue: $setup.options.content_font_size[size],
              "onUpdate:modelValue": ($event) => $setup.options.content_font_size[size] = $event,
              max: 500
            }, null, 8, ["modelValue", "onUpdate:modelValue"])
          ])
        };
      })
    ]), 1024),
    createVNode($setup["RwdGroup"], { "class-name": "c-content-line-height" }, createSlots({
      label: withCtx(() => [
        _cache[9] || (_cache[9] = createElementVNode("label", null, " Content Line Height ", -1))
      ]),
      _: 2
    }, [
      renderList(["lg", "md", "xs"], (size) => {
        return {
          name: size,
          fn: withCtx(() => [
            createVNode($setup["SliderInput"], {
              modelValue: $setup.options.content_line_height[size],
              "onUpdate:modelValue": ($event) => $setup.options.content_line_height[size] = $event,
              max: 500
            }, null, 8, ["modelValue", "onUpdate:modelValue"])
          ])
        };
      })
    ]), 1024)
  ]);
}
const addonText = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "addon-text.vue"]]);
export {
  addonText as default
};
//# sourceMappingURL=addon-text.js.map
