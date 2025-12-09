import { defineComponent, mergeModels, useModel, resolveDirective, createElementBlock, openBlock, createElementVNode, createTextVNode, createBlock, createCommentVNode, createVNode, withDirectives, vModelText, normalizeClass, createSlots, withCtx, renderList, createStaticVNode, vModelSelect } from "vue";
import "@windwalker-io/unicorn-next";
import { u as useAddonDefaults } from "./useAddonDefaults.js";
import "./usePageBuilderUtilities.js";
import "bootstrap";
import { B as BoxOffset } from "./BoxOffset.js";
import { B as ButtonRadio } from "./ButtonRadio.js";
import { R as RwdTitleOptions, C as ColorInput } from "./RwdTitleOptions.js";
import { R as RwdGroup } from "./RwdGroup.js";
import { S as SingleImage } from "./SingleImage.js";
import { S as SliderInput, _ as _export_sfc } from "./SliderInput.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "addon-feature",
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
      link: "",
      link_element: "title",
      layout_type: "icon",
      image: "",
      icon: {
        name: "fa fa-star",
        border: {
          width: { lg: 1, md: 1, xs: 1 },
          color: "",
          style: "",
          radius: { lg: 0, md: 0, xs: 0 }
        },
        font_size: { lg: "", md: "", xs: "" },
        color: "",
        bg_color: "",
        margin_top: { lg: "", md: "", xs: "" },
        margin_bottom: { lg: "", md: "", xs: "" },
        padding: { lg: "", md: "", xs: "" }
      },
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent malesuada est nec ligula aliquet bibendum. Ut lacinia risus quis feugiat ultrices. Morbi lacinia ut diam sed ultricies. Aliquam quis laoreet nisi, vel auctor risus. Nunc sed nisl lectus. Aliquam eget dignissim arcu, id volutpat ipsum. Donec ac arcu ac nibh sodales interdum. Nulla vulputate ",
      content_font_size: { lg: "", md: "", xs: "" },
      content_line_height: { lg: "", md: "", xs: "" }
    });
    const __returned__ = { options, BoxOffset, ButtonRadio, ColorInput, RwdGroup, SingleImage, SliderInput, RwdTitleOptions };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "form-group mb-3" };
const _hoisted_2 = { class: "form-group mb-3" };
const _hoisted_3 = {
  key: 1,
  class: "form-group mb-3"
};
const _hoisted_4 = { class: "form-group mb-3" };
const _hoisted_5 = { key: 2 };
const _hoisted_6 = { class: "form-group mb-3" };
const _hoisted_7 = { key: 3 };
const _hoisted_8 = { class: "form-group mb-3" };
const _hoisted_9 = { class: "input-group mb-3" };
const _hoisted_10 = { class: "input-group-text" };
const _hoisted_11 = { class: "form-row row" };
const _hoisted_12 = { class: "col-6" };
const _hoisted_13 = { class: "form-group mb-3" };
const _hoisted_14 = { class: "col-6" };
const _hoisted_15 = { class: "form-group mb-3" };
const _hoisted_16 = { class: "form-row row" };
const _hoisted_17 = { class: "col-6" };
const _hoisted_18 = ["onUpdate:modelValue"];
const _hoisted_19 = { class: "col-6" };
const _hoisted_20 = ["onUpdate:modelValue"];
const _hoisted_21 = { class: "form-group mb-3" };
const _hoisted_22 = { class: "form-group mb-3" };
const _hoisted_23 = { class: "form-group mb-3" };
const _hoisted_24 = { class: "form-group mb-3" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_tinymce = resolveDirective("tinymce");
  return openBlock(), createElementBlock("div", null, [
    createElementVNode("div", _hoisted_1, [
      _cache[14] || (_cache[14] = createElementVNode("label", { for: "input-addon-edit-title-text" }, "Title", -1)),
      _cache[15] || (_cache[15] = createTextVNode()),
      withDirectives(createElementVNode("textarea", {
        id: "input-addon-edit-title-text",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.options.title.text = $event),
        class: "form-control"
      }, null, 512), [
        [vModelText, $setup.options.title.text]
      ]),
      _cache[16] || (_cache[16] = createTextVNode()),
      _cache[17] || (_cache[17] = createElementVNode("small", { class: "form-text text-muted" }, "The main title of this section, keep empty to hide it.", -1))
    ]),
    _cache[69] || (_cache[69] = createTextVNode()),
    $setup.options.title.text !== "" ? (openBlock(), createBlock($setup["RwdTitleOptions"], {
      key: 0,
      id: "input-addon-edit",
      modelValue: $setup.options.title,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.options.title = $event)
    }, null, 8, ["modelValue"])) : createCommentVNode("", true),
    _cache[70] || (_cache[70] = createTextVNode()),
    _cache[71] || (_cache[71] = createElementVNode("hr", null, null, -1)),
    _cache[72] || (_cache[72] = createTextVNode()),
    createElementVNode("div", _hoisted_2, [
      _cache[18] || (_cache[18] = createElementVNode("label", { for: "input-addon-edit-link" }, "Link", -1)),
      _cache[19] || (_cache[19] = createTextVNode()),
      withDirectives(createElementVNode("input", {
        id: "input-addon-edit-link",
        type: "url",
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.options.link = $event),
        class: "form-control"
      }, null, 512), [
        [vModelText, $setup.options.link]
      ])
    ]),
    _cache[73] || (_cache[73] = createTextVNode()),
    $setup.options.link !== "" ? (openBlock(), createElementBlock("div", _hoisted_3, [
      _cache[20] || (_cache[20] = createElementVNode("label", { for: "input-addon-edit-link-element" }, "Link Element", -1)),
      _cache[21] || (_cache[21] = createTextVNode()),
      createElementVNode("div", null, [
        createVNode($setup["ButtonRadio"], {
          color: "primary",
          variant: "outline",
          class: "w-100",
          modelValue: $setup.options.link_element,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.options.link_element = $event),
          options: [
            { text: "Title", value: "title" },
            { text: "Icon/Image", value: "icon" },
            { text: "Both", value: "both" }
          ]
        }, null, 8, ["modelValue"])
      ])
    ])) : createCommentVNode("", true),
    _cache[74] || (_cache[74] = createTextVNode()),
    _cache[75] || (_cache[75] = createElementVNode("hr", null, null, -1)),
    _cache[76] || (_cache[76] = createTextVNode()),
    createElementVNode("div", _hoisted_4, [
      _cache[22] || (_cache[22] = createElementVNode("label", { for: "input-addon-edit-layout-type" }, "Layout Type", -1)),
      _cache[23] || (_cache[23] = createTextVNode()),
      createElementVNode("div", null, [
        createVNode($setup["ButtonRadio"], {
          color: "primary",
          variant: "outline",
          class: "w-100",
          modelValue: $setup.options.layout_type,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.options.layout_type = $event),
          options: [
            { text: "Icon", value: "icon" },
            { text: "Image", value: "image" }
          ]
        }, null, 8, ["modelValue"])
      ])
    ]),
    _cache[77] || (_cache[77] = createTextVNode()),
    $setup.options.layout_type === "image" ? (openBlock(), createElementBlock("div", _hoisted_5, [
      createElementVNode("div", _hoisted_6, [
        _cache[24] || (_cache[24] = createElementVNode("label", { for: "input-addon-edit-image" }, "Image", -1)),
        _cache[25] || (_cache[25] = createTextVNode()),
        createVNode($setup["SingleImage"], {
          modelValue: $setup.options.image,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.options.image = $event),
          id: "input-addon-edit-image"
        }, null, 8, ["modelValue"])
      ])
    ])) : createCommentVNode("", true),
    _cache[78] || (_cache[78] = createTextVNode()),
    $setup.options.layout_type === "icon" ? (openBlock(), createElementBlock("div", _hoisted_7, [
      createElementVNode("div", _hoisted_8, [
        _cache[27] || (_cache[27] = createElementVNode("label", { for: "input-addon-edit-icon-name" }, "Icon Class", -1)),
        _cache[28] || (_cache[28] = createTextVNode()),
        createElementVNode("div", _hoisted_9, [
          createElementVNode("span", _hoisted_10, [
            createElementVNode("span", {
              class: normalizeClass($setup.options.icon.name)
            }, null, 2)
          ]),
          _cache[26] || (_cache[26] = createTextVNode()),
          withDirectives(createElementVNode("input", {
            id: "input-addon-edit-icon-name",
            type: "text",
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.options.icon.name = $event),
            class: "form-control"
          }, null, 512), [
            [vModelText, $setup.options.icon.name]
          ])
        ]),
        _cache[29] || (_cache[29] = createTextVNode()),
        _cache[30] || (_cache[30] = createElementVNode("small", { class: "form-text text-muted" }, [
          createTextVNode("\r\n          The icon class, for example: "),
          createElementVNode("code", null, "fa fa-star"),
          createTextVNode("\r\n          Find available icons on: "),
          createElementVNode("a", {
            target: "_blank",
            href: "https://fontawesome.com/icons"
          }, "FontAwesome"),
          createTextVNode(".\r\n        ")
        ], -1))
      ]),
      _cache[54] || (_cache[54] = createTextVNode()),
      createVNode($setup["RwdGroup"], { "class-name": "c-title-font-size" }, createSlots({
        label: withCtx(() => [
          _cache[31] || (_cache[31] = createElementVNode("label", null, "\r\n            Title Font Size\r\n          ", -1))
        ]),
        _: 2
      }, [
        renderList(["lg", "md", "xs"], (size) => {
          return {
            name: size,
            fn: withCtx(() => [
              createVNode($setup["SliderInput"], {
                modelValue: $setup.options.icon.font_size[size],
                "onUpdate:modelValue": ($event) => $setup.options.icon.font_size[size] = $event,
                max: 500
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ])
          };
        })
      ]), 1024),
      _cache[55] || (_cache[55] = createTextVNode()),
      createElementVNode("div", _hoisted_11, [
        createElementVNode("div", _hoisted_12, [
          createElementVNode("div", _hoisted_13, [
            _cache[33] || (_cache[33] = createElementVNode("label", { for: "input-addon-edit-icon-color" }, "Color", -1)),
            _cache[34] || (_cache[34] = createTextVNode()),
            createVNode($setup["ColorInput"], {
              id: "input-addon-edit-icon-color",
              modelValue: $setup.options.icon.color,
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.options.icon.color = $event),
              modelModifiers: { lazy: true }
            }, null, 8, ["modelValue"])
          ])
        ]),
        _cache[37] || (_cache[37] = createTextVNode()),
        createElementVNode("div", _hoisted_14, [
          createElementVNode("div", _hoisted_15, [
            _cache[35] || (_cache[35] = createElementVNode("label", { for: "input-addon-edit-icon-bg_color" }, "Background Color", -1)),
            _cache[36] || (_cache[36] = createTextVNode()),
            createVNode($setup["ColorInput"], {
              id: "input-addon-edit-icon-bg_color",
              modelValue: $setup.options.icon.bg_color,
              "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.options.icon.bg_color = $event),
              modelModifiers: { lazy: true }
            }, null, 8, ["modelValue"])
          ])
        ])
      ]),
      _cache[56] || (_cache[56] = createTextVNode()),
      createElementVNode("div", _hoisted_16, [
        createElementVNode("div", _hoisted_17, [
          createVNode($setup["RwdGroup"], { "class-name": "c-title-margin_top" }, createSlots({
            label: withCtx(() => [
              _cache[38] || (_cache[38] = createElementVNode("label", null, "\r\n                Margin Top\r\n              ", -1))
            ]),
            _: 2
          }, [
            renderList(["lg", "md", "xs"], (size) => {
              return {
                name: size,
                fn: withCtx(() => [
                  withDirectives(createElementVNode("input", {
                    type: "number",
                    "onUpdate:modelValue": ($event) => $setup.options.icon.margin_top[size] = $event,
                    class: "form-control"
                  }, null, 8, _hoisted_18), [
                    [vModelText, $setup.options.icon.margin_top[size]]
                  ])
                ])
              };
            })
          ]), 1024)
        ]),
        _cache[43] || (_cache[43] = createTextVNode()),
        createElementVNode("div", _hoisted_19, [
          createVNode($setup["RwdGroup"], { "class-name": "c-title-margin_bottom" }, createSlots({
            label: withCtx(() => [
              _cache[40] || (_cache[40] = createElementVNode("label", null, "\r\n                Margin Bottom\r\n              ", -1))
            ]),
            _: 2
          }, [
            renderList(["lg", "md", "xs"], (size) => {
              return {
                name: size,
                fn: withCtx(() => [
                  withDirectives(createElementVNode("input", {
                    type: "number",
                    "onUpdate:modelValue": ($event) => $setup.options.icon.margin_bottom[size] = $event,
                    class: "form-control"
                  }, null, 8, _hoisted_20), [
                    [vModelText, $setup.options.icon.margin_bottom[size]]
                  ])
                ])
              };
            })
          ]), 1024)
        ]),
        _cache[44] || (_cache[44] = createTextVNode()),
        createVNode($setup["BoxOffset"], {
          modelValue: $setup.options.icon.padding,
          "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.options.icon.padding = $event)
        }, {
          label: withCtx(() => [..._cache[42] || (_cache[42] = [
            createElementVNode("label", null, "Icon Padding", -1)
          ])]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      _cache[57] || (_cache[57] = createTextVNode()),
      createElementVNode("div", _hoisted_21, [
        _cache[45] || (_cache[45] = createElementVNode("label", { for: "input-addon-edit-border-color" }, "Border Color", -1)),
        _cache[46] || (_cache[46] = createTextVNode()),
        createVNode($setup["ColorInput"], {
          id: "input-addon-edit-border-color",
          modelValue: $setup.options.icon.border.color,
          "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.options.icon.border.color = $event),
          modelModifiers: { lazy: true }
        }, null, 8, ["modelValue"])
      ]),
      _cache[58] || (_cache[58] = createTextVNode()),
      createVNode($setup["RwdGroup"], { "class-name": "c-border-width" }, createSlots({
        label: withCtx(() => [
          _cache[47] || (_cache[47] = createElementVNode("label", null, "\r\n            Border Width\r\n          ", -1))
        ]),
        _: 2
      }, [
        renderList(["lg", "md", "xs"], (size) => {
          return {
            name: size,
            fn: withCtx(() => [
              createVNode($setup["SliderInput"], {
                modelValue: $setup.options.icon.border.width[size],
                "onUpdate:modelValue": ($event) => $setup.options.icon.border.width[size] = $event
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ])
          };
        })
      ]), 1024),
      _cache[59] || (_cache[59] = createTextVNode()),
      createElementVNode("div", _hoisted_22, [
        _cache[50] || (_cache[50] = createElementVNode("label", { for: "input-addon-edit-border-style" }, "Border Style", -1)),
        _cache[51] || (_cache[51] = createTextVNode()),
        withDirectives(createElementVNode("select", {
          id: "input-addon-edit-border-style",
          "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.options.icon.border.style = $event),
          class: "form-select custom-select"
        }, [..._cache[49] || (_cache[49] = [
          createStaticVNode('<option value="">None</option> <option value="solid">Solid</option> <option value="dotted">Dotted</option> <option value="dashed">Dashed</option> <option value="double">Double</option> <option value="groove">Groove</option> <option value="ridge">Ridge</option>', 13)
        ])], 512), [
          [vModelSelect, $setup.options.icon.border.style]
        ])
      ]),
      _cache[60] || (_cache[60] = createTextVNode()),
      createVNode($setup["RwdGroup"], { "class-name": "c-border-radius" }, createSlots({
        label: withCtx(() => [
          _cache[52] || (_cache[52] = createElementVNode("label", null, "\r\n            Border Radius\r\n          ", -1))
        ]),
        _: 2
      }, [
        renderList(["lg", "md", "xs"], (size) => {
          return {
            name: size,
            fn: withCtx(() => [
              createVNode($setup["SliderInput"], {
                modelValue: $setup.options.icon.border.radius[size],
                "onUpdate:modelValue": ($event) => $setup.options.icon.border.radius[size] = $event
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ])
          };
        })
      ]), 1024)
    ])) : createCommentVNode("", true),
    _cache[79] || (_cache[79] = createTextVNode()),
    _cache[80] || (_cache[80] = createElementVNode("hr", null, null, -1)),
    _cache[81] || (_cache[81] = createTextVNode()),
    createElementVNode("div", _hoisted_23, [
      _cache[61] || (_cache[61] = createElementVNode("label", { for: "addon-edit-content" }, "Content", -1)),
      _cache[62] || (_cache[62] = createTextVNode()),
      withDirectives(createElementVNode("textarea", {
        id: "addon-edit-content",
        "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $setup.options.content = $event),
        class: "form-control"
      }, null, 512), [
        [vModelText, $setup.options.content],
        [_directive_tinymce]
      ])
    ]),
    _cache[82] || (_cache[82] = createTextVNode()),
    createElementVNode("div", _hoisted_24, [
      _cache[63] || (_cache[63] = createElementVNode("label", { for: "input-addon-edit-content-align" }, "Content Alignment", -1)),
      _cache[64] || (_cache[64] = createTextVNode()),
      createVNode($setup["ButtonRadio"], {
        color: "primary",
        variant: "outline",
        class: "w-100",
        modelValue: $setup.options.align,
        "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $setup.options.align = $event),
        options: [
          { text: "Default", value: "" },
          { text: "Left", value: "left" },
          { text: "Center", value: "center" },
          { text: "Right", value: "right" }
        ]
      }, null, 8, ["modelValue"])
    ]),
    _cache[83] || (_cache[83] = createTextVNode()),
    createVNode($setup["RwdGroup"], { "class-name": "c-content-font-size" }, createSlots({
      label: withCtx(() => [
        _cache[65] || (_cache[65] = createElementVNode("label", null, "\r\n          Content Font Size\r\n        ", -1))
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
    _cache[84] || (_cache[84] = createTextVNode()),
    createVNode($setup["RwdGroup"], { "class-name": "c-content-line-height" }, createSlots({
      label: withCtx(() => [
        _cache[67] || (_cache[67] = createElementVNode("label", null, "\r\n          Content Line Height\r\n        ", -1))
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
const addonFeature = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "addon-feature.vue"]]);
export {
  addonFeature as default
};
//# sourceMappingURL=addon-feature.js.map
