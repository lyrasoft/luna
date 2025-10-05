import { defineComponent, mergeModels, useModel, resolveDirective, createElementBlock, openBlock, createElementVNode, createTextVNode, createBlock, createCommentVNode, createVNode, withDirectives, vModelText, normalizeClass, createSlots, withCtx, renderList, createStaticVNode, vModelSelect } from "vue";
import "@windwalker-io/unicorn-next";
import { u as useAddonDefaults } from "./useAddonDefaults.js";
import { e as SliderInput, _ as _export_sfc } from "./SliderInput.js";
import "bootstrap";
import { B as BoxOffset } from "./BoxOffset.js";
import { B as ButtonRadio } from "./ButtonRadio.js";
import { R as RwdTitleOptions, C as ColorInput } from "./RwdTitleOptions.js";
import { R as RwdGroup } from "./RwdGroup.js";
import { S as SingleImage } from "./SingleImage.js";
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
          createTextVNode("\n          The icon class, for example: "),
          createElementVNode("code", null, "fa fa-star"),
          createTextVNode("\n          Find available icons on: "),
          createElementVNode("a", {
            target: "_blank",
            href: "https://fontawesome.com/icons"
          }, "FontAwesome"),
          createTextVNode(".\n        ")
        ], -1))
      ]),
      _cache[54] || (_cache[54] = createTextVNode()),
      createVNode($setup["RwdGroup"], { "class-name": "c-title-font-size" }, createSlots({
        label: withCtx(() => [
          _cache[31] || (_cache[31] = createElementVNode("label", null, "\n            Title Font Size\n          ", -1))
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
              _cache[38] || (_cache[38] = createElementVNode("label", null, "\n                Margin Top\n              ", -1))
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
              _cache[40] || (_cache[40] = createElementVNode("label", null, "\n                Margin Bottom\n              ", -1))
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
          _cache[47] || (_cache[47] = createElementVNode("label", null, "\n            Border Width\n          ", -1))
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
          _cache[52] || (_cache[52] = createElementVNode("label", null, "\n            Border Radius\n          ", -1))
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
        _cache[65] || (_cache[65] = createElementVNode("label", null, "\n          Content Font Size\n        ", -1))
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
        _cache[67] || (_cache[67] = createElementVNode("label", null, "\n          Content Line Height\n        ", -1))
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkb24tZmVhdHVyZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbXBvbmVudHMvcGFnZS1idWlsZGVyL2FkZG9ucy9hZGRvbi1mZWF0dXJlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiIHNldHVwPlxuaW1wb3J0IHsgQWRkb25Qcm9wcywgdXNlQWRkb25EZWZhdWx0cyB9IGZyb20gJ35sdW5hL2NvbXBvc2FibGVzJztcbmltcG9ydCB7IEFkZG9uT3B0aW9ucywgUndkT3B0aW9ucywgUndkU3RlcHMgfSBmcm9tICd+bHVuYS90eXBlcyc7XG5pbXBvcnQgQm94T2Zmc2V0IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvcGFnZS1idWlsZGVyL2Zvcm0vQm94T2Zmc2V0LnZ1ZSc7XG5pbXBvcnQgQnV0dG9uUmFkaW8gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9wYWdlLWJ1aWxkZXIvZm9ybS9CdXR0b25SYWRpby52dWUnO1xuaW1wb3J0IENvbG9ySW5wdXQgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9wYWdlLWJ1aWxkZXIvZm9ybS9Db2xvcklucHV0LnZ1ZSc7XG5pbXBvcnQgUndkR3JvdXAgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9wYWdlLWJ1aWxkZXIvZm9ybS9Sd2RHcm91cC52dWUnO1xuaW1wb3J0IFNpbmdsZUltYWdlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvcGFnZS1idWlsZGVyL2Zvcm0vU2luZ2xlSW1hZ2UudnVlJztcbmltcG9ydCBTbGlkZXJJbnB1dCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3BhZ2UtYnVpbGRlci9mb3JtL1NsaWRlcklucHV0LnZ1ZSc7XG5pbXBvcnQgUndkVGl0bGVPcHRpb25zIGZyb20gJy4uL2Zvcm0vUndkVGl0bGVPcHRpb25zLnZ1ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWRkb25GZWF0dXJlT3B0aW9ucyB7XG4gIGxpbms6IHN0cmluZztcbiAgbGlua19lbGVtZW50OiAndGl0bGUnIHwgJ2ljb24nIHwgJ2JvdGgnO1xuICBsYXlvdXRfdHlwZTogJ2ljb24nIHwgJ2ltYWdlJztcbiAgaW1hZ2U6IHN0cmluZztcbiAgaWNvbjoge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBib3JkZXI6IHtcbiAgICAgIHdpZHRoOiBSd2RPcHRpb25zPG51bWJlcj47XG4gICAgICBjb2xvcjogc3RyaW5nO1xuICAgICAgc3R5bGU6IHN0cmluZztcbiAgICAgIHJhZGl1czogUndkT3B0aW9uczxudW1iZXI+O1xuICAgIH07XG4gICAgZm9udF9zaXplOiBSd2RPcHRpb25zPHN0cmluZz47XG4gICAgY29sb3I6IHN0cmluZztcbiAgICBiZ19jb2xvcjogc3RyaW5nO1xuICAgIG1hcmdpbl90b3A6IFJ3ZE9wdGlvbnM8c3RyaW5nPjtcbiAgICBtYXJnaW5fYm90dG9tOiBSd2RPcHRpb25zPHN0cmluZz47XG4gICAgcGFkZGluZzogUndkT3B0aW9uczxzdHJpbmc+O1xuICB9O1xuICBjb250ZW50OiBzdHJpbmc7XG4gIGNvbnRlbnRfZm9udF9zaXplOiBSd2RPcHRpb25zPHN0cmluZz47XG4gIGNvbnRlbnRfbGluZV9oZWlnaHQ6IFJ3ZE9wdGlvbnM8c3RyaW5nPjtcbn1cblxuZGVmaW5lUHJvcHM8QWRkb25Qcm9wcz4oKTtcblxuY29uc3Qgb3B0aW9ucyA9IGRlZmluZU1vZGVsPEFkZG9uT3B0aW9ucyAmIEFkZG9uRmVhdHVyZU9wdGlvbnM+KHsgcmVxdWlyZWQ6IHRydWUgfSk7XG5cbnVzZUFkZG9uRGVmYXVsdHMob3B0aW9ucywge1xuICBsaW5rOiAnJyxcbiAgbGlua19lbGVtZW50OiAndGl0bGUnLFxuICBsYXlvdXRfdHlwZTogJ2ljb24nLFxuICBpbWFnZTogJycsXG4gIGljb246IHtcbiAgICBuYW1lOiAnZmEgZmEtc3RhcicsXG4gICAgYm9yZGVyOiB7XG4gICAgICB3aWR0aDogeyBsZzogMSwgbWQ6IDEsIHhzOiAxIH0sXG4gICAgICBjb2xvcjogJycsXG4gICAgICBzdHlsZTogJycsXG4gICAgICByYWRpdXM6IHsgbGc6IDAsIG1kOiAwLCB4czogMCB9XG4gICAgfSxcbiAgICBmb250X3NpemU6IHsgbGc6ICcnLCBtZDogJycsIHhzOiAnJyB9LFxuICAgIGNvbG9yOiAnJyxcbiAgICBiZ19jb2xvcjogJycsXG4gICAgbWFyZ2luX3RvcDogeyBsZzogJycsIG1kOiAnJywgeHM6ICcnIH0sXG4gICAgbWFyZ2luX2JvdHRvbTogeyBsZzogJycsIG1kOiAnJywgeHM6ICcnIH0sXG4gICAgcGFkZGluZzogeyBsZzogJycsIG1kOiAnJywgeHM6ICcnIH1cbiAgfSxcbiAgY29udGVudDogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQuIFByYWVzZW50IG1hbGVzdWFkYSBlc3QgbmVjICcgK1xuICAgICdsaWd1bGEgYWxpcXVldCBiaWJlbmR1bS4gVXQgbGFjaW5pYSByaXN1cyBxdWlzIGZldWdpYXQgdWx0cmljZXMuIE1vcmJpIGxhY2luaWEgdXQgZGlhbSBzZWQgJyArXG4gICAgJ3VsdHJpY2llcy4gQWxpcXVhbSBxdWlzIGxhb3JlZXQgbmlzaSwgdmVsIGF1Y3RvciByaXN1cy4gTnVuYyBzZWQgbmlzbCBsZWN0dXMuIEFsaXF1YW0gZWdldCAnICtcbiAgICAnZGlnbmlzc2ltIGFyY3UsIGlkIHZvbHV0cGF0IGlwc3VtLiBEb25lYyBhYyBhcmN1IGFjIG5pYmggc29kYWxlcyBpbnRlcmR1bS4gTnVsbGEgdnVscHV0YXRlICcsXG4gIGNvbnRlbnRfZm9udF9zaXplOiB7IGxnOiAnJywgbWQ6ICcnLCB4czogJycgfSxcbiAgY29udGVudF9saW5lX2hlaWdodDogeyBsZzogJycsIG1kOiAnJywgeHM6ICcnIH0sXG59KTtcblxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8IS0tIFRpdGxlIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIG1iLTNcIj5cbiAgICAgIDxsYWJlbCBmb3I9XCJpbnB1dC1hZGRvbi1lZGl0LXRpdGxlLXRleHRcIj5UaXRsZTwvbGFiZWw+XG4gICAgICA8dGV4dGFyZWEgaWQ9XCJpbnB1dC1hZGRvbi1lZGl0LXRpdGxlLXRleHRcIlxuICAgICAgICB2LW1vZGVsPVwib3B0aW9ucy50aXRsZS50ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj48L3RleHRhcmVhPlxuICAgICAgPHNtYWxsIGNsYXNzPVwiZm9ybS10ZXh0IHRleHQtbXV0ZWRcIj5UaGUgbWFpbiB0aXRsZSBvZiB0aGlzIHNlY3Rpb24sIGtlZXAgZW1wdHkgdG8gaGlkZSBpdC48L3NtYWxsPlxuICAgIDwvZGl2PlxuXG4gICAgPFJ3ZFRpdGxlT3B0aW9ucyB2LWlmPVwib3B0aW9ucy50aXRsZS50ZXh0ICE9PSAnJ1wiXG4gICAgICBpZD1cImlucHV0LWFkZG9uLWVkaXRcIiB2LW1vZGVsPVwib3B0aW9ucy50aXRsZVwiPjwvUndkVGl0bGVPcHRpb25zPlxuXG4gICAgPGhyIC8+XG5cbiAgICA8IS0tIExJTksgLS0+XG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgbWItM1wiPlxuICAgICAgPGxhYmVsIGZvcj1cImlucHV0LWFkZG9uLWVkaXQtbGlua1wiPkxpbms8L2xhYmVsPlxuICAgICAgPGlucHV0IGlkPVwiaW5wdXQtYWRkb24tZWRpdC1saW5rXCIgdHlwZT1cInVybFwiXG4gICAgICAgIHYtbW9kZWw9XCJvcHRpb25zLmxpbmtcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIC8+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIExJTksgRUxFTUVOVCAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCIgdi1pZj1cIm9wdGlvbnMubGluayAhPT0gJydcIj5cbiAgICAgIDxsYWJlbCBmb3I9XCJpbnB1dC1hZGRvbi1lZGl0LWxpbmstZWxlbWVudFwiPkxpbmsgRWxlbWVudDwvbGFiZWw+XG4gICAgICA8ZGl2PlxuICAgICAgICA8QnV0dG9uUmFkaW9cbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lXCJcbiAgICAgICAgICBjbGFzcz1cInctMTAwXCJcbiAgICAgICAgICB2LW1vZGVsPVwib3B0aW9ucy5saW5rX2VsZW1lbnRcIlxuICAgICAgICAgIDpvcHRpb25zPVwiW1xuICAgICAgICAgICAgeyB0ZXh0OiAnVGl0bGUnLCB2YWx1ZTogJ3RpdGxlJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnSWNvbi9JbWFnZScsIHZhbHVlOiAnaWNvbicgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0JvdGgnLCB2YWx1ZTogJ2JvdGgnIH0sXG4gICAgICAgICAgXVwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxociAvPlxuXG4gICAgPCEtLSBMYXlvdXQgVHlwZSAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCI+XG4gICAgICA8bGFiZWwgZm9yPVwiaW5wdXQtYWRkb24tZWRpdC1sYXlvdXQtdHlwZVwiPkxheW91dCBUeXBlPC9sYWJlbD5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxCdXR0b25SYWRpb1xuICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgdmFyaWFudD1cIm91dGxpbmVcIlxuICAgICAgICAgIGNsYXNzPVwidy0xMDBcIlxuICAgICAgICAgIHYtbW9kZWw9XCJvcHRpb25zLmxheW91dF90eXBlXCJcbiAgICAgICAgICA6b3B0aW9ucz1cIltcbiAgICAgICAgICAgIHsgdGV4dDogJ0ljb24nLCB2YWx1ZTogJ2ljb24nIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdJbWFnZScsIHZhbHVlOiAnaW1hZ2UnIH0sXG4gICAgICAgICAgXVwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgdi1pZj1cIm9wdGlvbnMubGF5b3V0X3R5cGUgPT09ICdpbWFnZSdcIj5cbiAgICAgIDwhLS0gSW1hZ2UgLS0+XG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJpbnB1dC1hZGRvbi1lZGl0LWltYWdlXCI+SW1hZ2U8L2xhYmVsPlxuICAgICAgICA8U2luZ2xlSW1hZ2Ugdi1tb2RlbD1cIm9wdGlvbnMuaW1hZ2VcIlxuICAgICAgICAgIGlkPVwiaW5wdXQtYWRkb24tZWRpdC1pbWFnZVwiPjwvU2luZ2xlSW1hZ2U+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgdi1pZj1cIm9wdGlvbnMubGF5b3V0X3R5cGUgPT09ICdpY29uJ1wiPlxuXG4gICAgICA8IS0tIEljb24gLS0+XG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJpbnB1dC1hZGRvbi1lZGl0LWljb24tbmFtZVwiPkljb24gQ2xhc3M8L2xhYmVsPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgbWItM1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiPlxuICAgICAgICAgICAgICA8c3BhbiA6Y2xhc3M9XCJvcHRpb25zLmljb24ubmFtZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPGlucHV0IGlkPVwiaW5wdXQtYWRkb24tZWRpdC1pY29uLW5hbWVcIiB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICB2LW1vZGVsPVwib3B0aW9ucy5pY29uLm5hbWVcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8c21hbGwgY2xhc3M9XCJmb3JtLXRleHQgdGV4dC1tdXRlZFwiPlxuICAgICAgICAgIFRoZSBpY29uIGNsYXNzLCBmb3IgZXhhbXBsZTogPGNvZGU+ZmEgZmEtc3RhcjwvY29kZT5cbiAgICAgICAgICBGaW5kIGF2YWlsYWJsZSBpY29ucyBvbjogPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2ljb25zXCI+Rm9udEF3ZXNvbWU8L2E+LlxuICAgICAgICA8L3NtYWxsPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDwhLS0gVGl0bGUgRm9udCBTaXplIC0tPlxuICAgICAgPFJ3ZEdyb3VwIGNsYXNzLW5hbWU9XCJjLXRpdGxlLWZvbnQtc2l6ZVwiPlxuICAgICAgICA8dGVtcGxhdGUgI2xhYmVsPlxuICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIFRpdGxlIEZvbnQgU2l6ZVxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LWZvcj1cInNpemUgb2YgWydsZycsICdtZCcsICd4cyddXCIgY2xhc3M9XCJmb3JtLWdyb3VwIG1iLTNcIlxuICAgICAgICAgIHYtc2xvdDpbc2l6ZV1cbiAgICAgICAgICA6Y2xhc3M9XCInYy10aXRsZS1mb250LXNpemVfXycgKyBzaXplXCI+XG4gICAgICAgICAgPFNsaWRlcklucHV0XG4gICAgICAgICAgICB2LW1vZGVsPVwib3B0aW9ucy5pY29uLmZvbnRfc2l6ZVtzaXplIGFzIFJ3ZFN0ZXBzXVwiXG4gICAgICAgICAgICA6bWF4PVwiNTAwXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgPC9Sd2RHcm91cD5cblxuICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93IHJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTZcIj5cbiAgICAgICAgICA8IS0tIFRpdGxlIENvbG9yIC0tPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIG1iLTNcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJpbnB1dC1hZGRvbi1lZGl0LWljb24tY29sb3JcIj5Db2xvcjwvbGFiZWw+XG4gICAgICAgICAgICA8Q29sb3JJbnB1dCBpZD1cImlucHV0LWFkZG9uLWVkaXQtaWNvbi1jb2xvclwiXG4gICAgICAgICAgICAgIHYtbW9kZWwubGF6eT1cIm9wdGlvbnMuaWNvbi5jb2xvclwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC02XCI+XG4gICAgICAgICAgPCEtLSBCRyBDb2xvciAtLT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiaW5wdXQtYWRkb24tZWRpdC1pY29uLWJnX2NvbG9yXCI+QmFja2dyb3VuZCBDb2xvcjwvbGFiZWw+XG4gICAgICAgICAgICA8Q29sb3JJbnB1dCBpZD1cImlucHV0LWFkZG9uLWVkaXQtaWNvbi1iZ19jb2xvclwiXG4gICAgICAgICAgICAgIHYtbW9kZWwubGF6eT1cIm9wdGlvbnMuaWNvbi5iZ19jb2xvclwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1yb3cgcm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNlwiPlxuICAgICAgICAgIDwhLS0gVGl0bGUgTWFyZ2luIFRvcCAtLT5cbiAgICAgICAgICA8UndkR3JvdXAgY2xhc3MtbmFtZT1cImMtdGl0bGUtbWFyZ2luX3RvcFwiPlxuICAgICAgICAgICAgPHRlbXBsYXRlICNsYWJlbD5cbiAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgIE1hcmdpbiBUb3BcbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1mb3I9XCJzaXplIG9mIFsnbGcnLCAnbWQnLCAneHMnXVwiIGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCJcbiAgICAgICAgICAgICAgdi1zbG90OltzaXplXVxuICAgICAgICAgICAgICA6Y2xhc3M9XCInYy10aXRsZS1tYXJnaW5fdG9wX18nICsgc2l6ZVwiPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIHYtbW9kZWw9XCJvcHRpb25zLmljb24ubWFyZ2luX3RvcFtzaXplIGFzIFJ3ZFN0ZXBzXVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgLz5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgPC9Sd2RHcm91cD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNlwiPlxuICAgICAgICAgIDwhLS0gVGl0bGUgTWFyZ2luIEJvdHRvbSAtLT5cbiAgICAgICAgICA8UndkR3JvdXAgY2xhc3MtbmFtZT1cImMtdGl0bGUtbWFyZ2luX2JvdHRvbVwiPlxuICAgICAgICAgICAgPHRlbXBsYXRlICNsYWJlbD5cbiAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgIE1hcmdpbiBCb3R0b21cbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1mb3I9XCJzaXplIG9mIFsnbGcnLCAnbWQnLCAneHMnXVwiIGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCJcbiAgICAgICAgICAgICAgdi1zbG90OltzaXplXVxuICAgICAgICAgICAgICA6Y2xhc3M9XCInYy10aXRsZS1tYXJnaW5fYm90dG9tX18nICsgc2l6ZVwiPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIHYtbW9kZWw9XCJvcHRpb25zLmljb24ubWFyZ2luX2JvdHRvbVtzaXplIGFzIFJ3ZFN0ZXBzXVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgLz5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgPC9Sd2RHcm91cD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPCEtLSBQYWRkaW5nIC0tPlxuICAgICAgICA8Qm94T2Zmc2V0IHYtbW9kZWw9XCJvcHRpb25zLmljb24ucGFkZGluZ1wiPlxuICAgICAgICAgIDx0ZW1wbGF0ZSAjbGFiZWw+XG4gICAgICAgICAgICA8bGFiZWw+SWNvbiBQYWRkaW5nPC9sYWJlbD5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L0JveE9mZnNldD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8IS0tIEJvcmRlciBDb2xvciAtLT5cbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIG1iLTNcIj5cbiAgICAgICAgPGxhYmVsIGZvcj1cImlucHV0LWFkZG9uLWVkaXQtYm9yZGVyLWNvbG9yXCI+Qm9yZGVyIENvbG9yPC9sYWJlbD5cbiAgICAgICAgPENvbG9ySW5wdXQgaWQ9XCJpbnB1dC1hZGRvbi1lZGl0LWJvcmRlci1jb2xvclwiXG4gICAgICAgICAgdi1tb2RlbC5sYXp5PVwib3B0aW9ucy5pY29uLmJvcmRlci5jb2xvclwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPCEtLSBCb3JkZXIgV2lkdGggLS0+XG4gICAgICA8UndkR3JvdXAgY2xhc3MtbmFtZT1cImMtYm9yZGVyLXdpZHRoXCI+XG4gICAgICAgIDx0ZW1wbGF0ZSAjbGFiZWw+XG4gICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgQm9yZGVyIFdpZHRoXG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPHRlbXBsYXRlIHYtZm9yPVwic2l6ZSBvZiBbJ2xnJywgJ21kJywgJ3hzJ11cIiBjbGFzcz1cImZvcm0tZ3JvdXAgbWItM1wiXG4gICAgICAgICAgdi1zbG90OltzaXplXVxuICAgICAgICAgIDpjbGFzcz1cIidjLWJvcmRlci13aWR0aF9fJyArIHNpemVcIj5cbiAgICAgICAgICA8U2xpZGVySW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJvcHRpb25zLmljb24uYm9yZGVyLndpZHRoW3NpemUgYXMgUndkU3RlcHNdXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgPC9Sd2RHcm91cD5cblxuICAgICAgPCEtLSBCb3JkZXIgU3R5bGUgLS0+XG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJpbnB1dC1hZGRvbi1lZGl0LWJvcmRlci1zdHlsZVwiPkJvcmRlciBTdHlsZTwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3QgaWQ9XCJpbnB1dC1hZGRvbi1lZGl0LWJvcmRlci1zdHlsZVwiXG4gICAgICAgICAgdi1tb2RlbD1cIm9wdGlvbnMuaWNvbi5ib3JkZXIuc3R5bGVcIiBjbGFzcz1cImZvcm0tc2VsZWN0IGN1c3RvbS1zZWxlY3RcIj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+Tm9uZTwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzb2xpZFwiPlNvbGlkPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImRvdHRlZFwiPkRvdHRlZDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJkYXNoZWRcIj5EYXNoZWQ8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZG91YmxlXCI+RG91YmxlPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImdyb292ZVwiPkdyb292ZTwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyaWRnZVwiPlJpZGdlPC9vcHRpb24+XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDwhLS0gQm9yZGVyIFJhZGl1cyAtLT5cbiAgICAgIDxSd2RHcm91cCBjbGFzcy1uYW1lPVwiYy1ib3JkZXItcmFkaXVzXCI+XG4gICAgICAgIDx0ZW1wbGF0ZSAjbGFiZWw+XG4gICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgQm9yZGVyIFJhZGl1c1xuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LWZvcj1cInNpemUgb2YgWydsZycsICdtZCcsICd4cyddXCIgY2xhc3M9XCJmb3JtLWdyb3VwIG1iLTNcIlxuICAgICAgICAgIHYtc2xvdDpbc2l6ZV1cbiAgICAgICAgICA6Y2xhc3M9XCInYy1ib3JkZXItcmFkaXVzX18nICsgc2l6ZVwiPlxuICAgICAgICAgIDxTbGlkZXJJbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD1cIm9wdGlvbnMuaWNvbi5ib3JkZXIucmFkaXVzW3NpemUgYXMgUndkU3RlcHNdXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgPC9Sd2RHcm91cD5cblxuICAgIDwvZGl2PlxuXG4gICAgPGhyIC8+XG5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCI+XG4gICAgICA8bGFiZWwgZm9yPVwiYWRkb24tZWRpdC1jb250ZW50XCI+Q29udGVudDwvbGFiZWw+XG4gICAgICA8dGV4dGFyZWEgaWQ9XCJhZGRvbi1lZGl0LWNvbnRlbnRcIiB2LW1vZGVsPVwib3B0aW9ucy5jb250ZW50XCIgdi10aW55bWNlIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+PC90ZXh0YXJlYT5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gQ29udGVudCBBbGlnbiAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCI+XG4gICAgICA8bGFiZWwgZm9yPVwiaW5wdXQtYWRkb24tZWRpdC1jb250ZW50LWFsaWduXCI+Q29udGVudCBBbGlnbm1lbnQ8L2xhYmVsPlxuICAgICAgPEJ1dHRvblJhZGlvXG4gICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lXCJcbiAgICAgICAgY2xhc3M9XCJ3LTEwMFwiXG4gICAgICAgIHYtbW9kZWw9XCJvcHRpb25zLmFsaWduXCJcbiAgICAgICAgOm9wdGlvbnM9XCJbXG4gICAgICAgICAgICB7IHRleHQ6ICdEZWZhdWx0JywgdmFsdWU6ICcnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdMZWZ0JywgdmFsdWU6ICdsZWZ0JyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnQ2VudGVyJywgdmFsdWU6ICdjZW50ZXInIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdSaWdodCcsIHZhbHVlOiAncmlnaHQnIH0sXG4gICAgICAgICAgXVwiXG4gICAgICAvPlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBDb250ZW50IEZvbnQgU2l6ZSAtLT5cbiAgICA8UndkR3JvdXAgY2xhc3MtbmFtZT1cImMtY29udGVudC1mb250LXNpemVcIj5cbiAgICAgIDx0ZW1wbGF0ZSAjbGFiZWw+XG4gICAgICAgIDxsYWJlbD5cbiAgICAgICAgICBDb250ZW50IEZvbnQgU2l6ZVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LWZvcj1cInNpemUgb2YgWydsZycsICdtZCcsICd4cyddXCIgY2xhc3M9XCJmb3JtLWdyb3VwIG1iLTNcIlxuICAgICAgICB2LXNsb3Q6W3NpemVdXG4gICAgICAgIDpjbGFzcz1cIidjLWNvbnRlbnQtZm9udC1zaXplLWhlaWdodF9fJyArIHNpemVcIj5cbiAgICAgICAgPFNsaWRlcklucHV0XG4gICAgICAgICAgdi1tb2RlbD1cIm9wdGlvbnMuY29udGVudF9mb250X3NpemVbc2l6ZSBhcyBSd2RTdGVwc11cIlxuICAgICAgICAgIDptYXg9XCI1MDBcIlxuICAgICAgICAvPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L1J3ZEdyb3VwPlxuXG4gICAgPCEtLSBDb250ZW50IExpbmUgSGVpZ2h0IC0tPlxuICAgIDxSd2RHcm91cCBjbGFzcy1uYW1lPVwiYy1jb250ZW50LWxpbmUtaGVpZ2h0XCI+XG4gICAgICA8dGVtcGxhdGUgI2xhYmVsPlxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgQ29udGVudCBMaW5lIEhlaWdodFxuICAgICAgICA8L2xhYmVsPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LWZvcj1cInNpemUgb2YgWydsZycsICdtZCcsICd4cyddXCIgY2xhc3M9XCJmb3JtLWdyb3VwIG1iLTNcIlxuICAgICAgICB2LXNsb3Q6W3NpemVdXG4gICAgICAgIDpjbGFzcz1cIidjLWNvbnRlbnQtbGluZS1oZWlnaHRfXycgKyBzaXplXCI+XG4gICAgICAgIDxTbGlkZXJJbnB1dFxuICAgICAgICAgIHYtbW9kZWw9XCJvcHRpb25zLmNvbnRlbnRfbGluZV9oZWlnaHRbc2l6ZSBhcyBSd2RTdGVwc11cIlxuICAgICAgICAgIDptYXg9XCI1MDBcIlxuICAgICAgICAvPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L1J3ZEdyb3VwPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX3VzZU1vZGVsIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3ZNb2RlbFRleHQiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZUNvbW1lbnRWTm9kZSIsIl9jcmVhdGVWTm9kZSIsIl9ub3JtYWxpemVDbGFzcyIsIl9jcmVhdGVTbG90cyIsIl93aXRoQ3R4IiwiX3JlbmRlckxpc3QiLCJfd2l0aERpcmVjdGl2ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNDQSxVQUFNLFVBQVVBLFNBQStDLFNBQUEsWUFBbUI7QUFFbEYscUJBQWlCLFNBQVM7QUFBQSxNQUN4QixNQUFNO0FBQUEsTUFDTixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsUUFDSixNQUFNO0FBQUEsUUFDTixRQUFRO0FBQUEsVUFDTixPQUFPLEVBQUUsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEVBQUE7QUFBQSxVQUMzQixPQUFPO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxRQUFRLEVBQUUsSUFB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
