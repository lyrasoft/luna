import { defineComponent, resolveDirective, createElementBlock, openBlock, createElementVNode, createBlock, createCommentVNode, createVNode, withDirectives, vModelText, normalizeClass, createTextVNode, createSlots, withCtx, renderList, createStaticVNode, vModelSelect } from "vue";
import { u as useAddonModel } from "./useAddonModel.js";
import { R as RwdTitleOptions, S as SliderInput, b as SingleImage, a as RwdGroup, C as ColorInput, B as ButtonRadio, c as BoxOffset, _ as _export_sfc } from "./page-builder.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "addon-feature",
  props: {
    addonId: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const options = useAddonModel({
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
      withDirectives(createElementVNode("textarea", {
        id: "input-addon-edit-title-text",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.options.title.text = $event),
        class: "form-control"
      }, null, 512), [
        [vModelText, $setup.options.title.text]
      ]),
      _cache[15] || (_cache[15] = createElementVNode("small", { class: "form-text text-muted" }, "The main title of this section, keep empty to hide it.", -1))
    ]),
    $setup.options.title.text !== "" ? (openBlock(), createBlock($setup["RwdTitleOptions"], {
      key: 0,
      id: "input-addon-edit",
      modelValue: $setup.options.title,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.options.title = $event)
    }, null, 8, ["modelValue"])) : createCommentVNode("", true),
    _cache[37] || (_cache[37] = createElementVNode("hr", null, null, -1)),
    createElementVNode("div", _hoisted_2, [
      _cache[16] || (_cache[16] = createElementVNode("label", { for: "input-addon-edit-link" }, "Link", -1)),
      withDirectives(createElementVNode("input", {
        id: "input-addon-edit-link",
        type: "url",
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.options.link = $event),
        class: "form-control"
      }, null, 512), [
        [vModelText, $setup.options.link]
      ])
    ]),
    $setup.options.link !== "" ? (openBlock(), createElementBlock("div", _hoisted_3, [
      _cache[17] || (_cache[17] = createElementVNode("label", { for: "input-addon-edit-link-element" }, "Link Element", -1)),
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
    _cache[38] || (_cache[38] = createElementVNode("hr", null, null, -1)),
    createElementVNode("div", _hoisted_4, [
      _cache[18] || (_cache[18] = createElementVNode("label", { for: "input-addon-edit-layout-type" }, "Layout Type", -1)),
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
    $setup.options.layout_type === "image" ? (openBlock(), createElementBlock("div", _hoisted_5, [
      createElementVNode("div", _hoisted_6, [
        _cache[19] || (_cache[19] = createElementVNode("label", { for: "input-addon-edit-image" }, "Image", -1)),
        createVNode($setup["SingleImage"], {
          modelValue: $setup.options.image,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.options.image = $event),
          id: "input-addon-edit-image"
        }, null, 8, ["modelValue"])
      ])
    ])) : createCommentVNode("", true),
    $setup.options.layout_type === "icon" ? (openBlock(), createElementBlock("div", _hoisted_7, [
      createElementVNode("div", _hoisted_8, [
        _cache[20] || (_cache[20] = createElementVNode("label", { for: "input-addon-edit-icon-name" }, "Icon Class", -1)),
        createElementVNode("div", _hoisted_9, [
          createElementVNode("span", _hoisted_10, [
            createElementVNode("span", {
              class: normalizeClass($setup.options.icon.name)
            }, null, 2)
          ]),
          withDirectives(createElementVNode("input", {
            id: "input-addon-edit-icon-name",
            type: "text",
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.options.icon.name = $event),
            class: "form-control"
          }, null, 512), [
            [vModelText, $setup.options.icon.name]
          ])
        ]),
        _cache[21] || (_cache[21] = createElementVNode("small", { class: "form-text text-muted" }, [
          createTextVNode(" The icon class, for example: "),
          createElementVNode("code", null, "fa fa-star"),
          createTextVNode(" Find available icons on: "),
          createElementVNode("a", {
            target: "_blank",
            href: "https://fontawesome.com/icons"
          }, "FontAwesome"),
          createTextVNode(". ")
        ], -1))
      ]),
      createVNode($setup["RwdGroup"], { "class-name": "c-title-font-size" }, createSlots({
        label: withCtx(() => [
          _cache[22] || (_cache[22] = createElementVNode("label", null, " Title Font Size ", -1))
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
      createElementVNode("div", _hoisted_11, [
        createElementVNode("div", _hoisted_12, [
          createElementVNode("div", _hoisted_13, [
            _cache[23] || (_cache[23] = createElementVNode("label", { for: "input-addon-edit-icon-color" }, "Color", -1)),
            createVNode($setup["ColorInput"], {
              id: "input-addon-edit-icon-color",
              modelValue: $setup.options.icon.color,
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.options.icon.color = $event),
              modelModifiers: { lazy: true }
            }, null, 8, ["modelValue"])
          ])
        ]),
        createElementVNode("div", _hoisted_14, [
          createElementVNode("div", _hoisted_15, [
            _cache[24] || (_cache[24] = createElementVNode("label", { for: "input-addon-edit-icon-bg_color" }, "Background Color", -1)),
            createVNode($setup["ColorInput"], {
              id: "input-addon-edit-icon-bg_color",
              modelValue: $setup.options.icon.bg_color,
              "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.options.icon.bg_color = $event),
              modelModifiers: { lazy: true }
            }, null, 8, ["modelValue"])
          ])
        ])
      ]),
      createElementVNode("div", _hoisted_16, [
        createElementVNode("div", _hoisted_17, [
          createVNode($setup["RwdGroup"], { "class-name": "c-title-margin_top" }, createSlots({
            label: withCtx(() => [
              _cache[25] || (_cache[25] = createElementVNode("label", null, " Margin Top ", -1))
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
        createElementVNode("div", _hoisted_19, [
          createVNode($setup["RwdGroup"], { "class-name": "c-title-margin_bottom" }, createSlots({
            label: withCtx(() => [
              _cache[26] || (_cache[26] = createElementVNode("label", null, " Margin Bottom ", -1))
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
        createVNode($setup["BoxOffset"], {
          modelValue: $setup.options.icon.padding,
          "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.options.icon.padding = $event)
        }, {
          label: withCtx(() => [..._cache[27] || (_cache[27] = [
            createElementVNode("label", null, "Icon Padding", -1)
          ])]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      createElementVNode("div", _hoisted_21, [
        _cache[28] || (_cache[28] = createElementVNode("label", { for: "input-addon-edit-border-color" }, "Border Color", -1)),
        createVNode($setup["ColorInput"], {
          id: "input-addon-edit-border-color",
          modelValue: $setup.options.icon.border.color,
          "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.options.icon.border.color = $event),
          modelModifiers: { lazy: true }
        }, null, 8, ["modelValue"])
      ]),
      createVNode($setup["RwdGroup"], { "class-name": "c-border-width" }, createSlots({
        label: withCtx(() => [
          _cache[29] || (_cache[29] = createElementVNode("label", null, " Border Width ", -1))
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
      createElementVNode("div", _hoisted_22, [
        _cache[31] || (_cache[31] = createElementVNode("label", { for: "input-addon-edit-border-style" }, "Border Style", -1)),
        withDirectives(createElementVNode("select", {
          id: "input-addon-edit-border-style",
          "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.options.icon.border.style = $event),
          class: "form-select custom-select"
        }, [..._cache[30] || (_cache[30] = [
          createStaticVNode('<option value="">None</option><option value="solid">Solid</option><option value="dotted">Dotted</option><option value="dashed">Dashed</option><option value="double">Double</option><option value="groove">Groove</option><option value="ridge">Ridge</option>', 7)
        ])], 512), [
          [vModelSelect, $setup.options.icon.border.style]
        ])
      ]),
      createVNode($setup["RwdGroup"], { "class-name": "c-border-radius" }, createSlots({
        label: withCtx(() => [
          _cache[32] || (_cache[32] = createElementVNode("label", null, " Border Radius ", -1))
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
    _cache[39] || (_cache[39] = createElementVNode("hr", null, null, -1)),
    createElementVNode("div", _hoisted_23, [
      _cache[33] || (_cache[33] = createElementVNode("label", { for: "addon-edit-content" }, "Content", -1)),
      withDirectives(createElementVNode("textarea", {
        id: "addon-edit-content",
        "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $setup.options.content = $event),
        class: "form-control"
      }, null, 512), [
        [vModelText, $setup.options.content],
        [_directive_tinymce]
      ])
    ]),
    createElementVNode("div", _hoisted_24, [
      _cache[34] || (_cache[34] = createElementVNode("label", { for: "input-addon-edit-content-align" }, "Content Alignment", -1)),
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
    createVNode($setup["RwdGroup"], { "class-name": "c-content-font-size" }, createSlots({
      label: withCtx(() => [
        _cache[35] || (_cache[35] = createElementVNode("label", null, " Content Font Size ", -1))
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
        _cache[36] || (_cache[36] = createElementVNode("label", null, " Content Line Height ", -1))
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
