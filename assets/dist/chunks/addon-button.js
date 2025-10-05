import { defineComponent, mergeModels, useModel, ref, createElementBlock, openBlock, createElementVNode, createTextVNode, createCommentVNode, withDirectives, vModelText, createVNode, createStaticVNode, vModelSelect, normalizeClass } from "vue";
import { uid } from "@windwalker-io/unicorn-next";
import { u as useAddonDefaults } from "./useAddonDefaults.js";
import { e as SliderInput, _ as _export_sfc } from "./SliderInput.js";
import "bootstrap";
import { B as ButtonRadio } from "./ButtonRadio.js";
import { U as UnicornSwitcher } from "./UnicornSwitcher.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "addon-button",
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
      _cache[11] || (_cache[11] = createTextVNode()),
      withDirectives(createElementVNode("input", {
        id: "input-addon-edit-text",
        type: "text",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.options.text = $event),
        class: "form-control"
      }, null, 512), [
        [vModelText, $setup.options.text]
      ])
    ]),
    _cache[40] || (_cache[40] = createTextVNode()),
    createElementVNode("div", _hoisted_2, [
      _cache[12] || (_cache[12] = createElementVNode("label", { for: "input-addon-edit-align" }, "Align", -1)),
      _cache[13] || (_cache[13] = createTextVNode()),
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
    _cache[41] || (_cache[41] = createTextVNode()),
    createElementVNode("div", _hoisted_3, [
      _cache[14] || (_cache[14] = createElementVNode("label", { for: "input-addon-edit-link" }, "Link", -1)),
      _cache[15] || (_cache[15] = createTextVNode()),
      withDirectives(createElementVNode("input", {
        id: "input-addon-edit-link",
        type: "url",
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.options.link = $event),
        class: "form-control"
      }, null, 512), [
        [vModelText, $setup.options.link]
      ])
    ]),
    _cache[42] || (_cache[42] = createTextVNode()),
    $setup.options.link !== "" ? (openBlock(), createElementBlock("div", _hoisted_4, [
      _cache[16] || (_cache[16] = createElementVNode("label", { for: "input-addon-edit-link-target" }, "Open in New Window", -1)),
      _cache[17] || (_cache[17] = createTextVNode()),
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
    _cache[43] || (_cache[43] = createTextVNode()),
    createElementVNode("div", _hoisted_5, [
      _cache[19] || (_cache[19] = createElementVNode("label", { for: "input-addon-edit-style" }, "Style", -1)),
      _cache[20] || (_cache[20] = createTextVNode()),
      withDirectives(createElementVNode("input", {
        type: "search",
        id: "input-addon-edit-style",
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.options.style = $event),
        class: "form-control",
        list: `input-edit-style__list-${$setup.uid}`
      }, null, 8, _hoisted_6), [
        [vModelText, $setup.options.style]
      ]),
      _cache[21] || (_cache[21] = createTextVNode()),
      createElementVNode("datalist", {
        id: `input-edit-style__list-${$setup.uid}`
      }, [..._cache[18] || (_cache[18] = [
        createStaticVNode('<option value="btn-primary">btn-primary</option> <option value="btn-outline-primary">btn-outline-primary</option> <option value="btn-secondary">btn-secondary</option> <option value="btn-outline-secondary">btn-outline-secondary</option> <option value="btn-success">btn-success</option> <option value="btn-outline-success">btn-outline-success</option> <option value="btn-info">btn-info</option> <option value="btn-outline-info">btn-outline-info</option> <option value="btn-warning">btn-warning</option> <option value="btn-outline-warning">btn-outline-warning</option> <option value="btn-danger">btn-danger</option> <option value="btn-outline-danger">btn-outline-danger</option> <option value="btn-dark">btn-dark</option> <option value="btn-outline-dark">btn-outline-dark</option> <option value="btn-light">btn-light</option> <option value="btn-outline-light">btn-outline-light</option> <option value="btn-link">btn-link</option>', 33)
      ])], 8, _hoisted_7),
      _cache[22] || (_cache[22] = createTextVNode()),
      _cache[23] || (_cache[23] = createElementVNode("small", { class: "form-text text-muted" }, [
        createTextVNode("\n        Use "),
        createElementVNode("a", {
          href: "https://getbootstrap.com/docs/5.1/components/buttons/",
          target: "_blank"
        }, "Bootstrap button style"),
        createTextVNode("\n        , if you need a custom style, just enter your button class names.\n      ")
      ], -1))
    ]),
    _cache[44] || (_cache[44] = createTextVNode()),
    createElementVNode("div", _hoisted_8, [
      _cache[25] || (_cache[25] = createElementVNode("label", { for: "input-addon-edit-size" }, "Size", -1)),
      _cache[26] || (_cache[26] = createTextVNode()),
      withDirectives(createElementVNode("select", {
        id: "input-addon-edit-size",
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.options.size = $event),
        class: "form-select custom-select"
      }, [..._cache[24] || (_cache[24] = [
        createElementVNode("option", { value: "" }, "Default", -1),
        createTextVNode(),
        createElementVNode("option", { value: "btn-sm" }, "btn-sm (Small)", -1),
        createTextVNode(),
        createElementVNode("option", { value: "btn-lg" }, "btn-lg (Large)", -1)
      ])], 512), [
        [vModelSelect, $setup.options.size]
      ]),
      _cache[27] || (_cache[27] = createTextVNode()),
      _cache[28] || (_cache[28] = createElementVNode("small", { class: "form-text text-muted" }, [
        createTextVNode("\n        Use "),
        createElementVNode("a", {
          href: "https://getbootstrap.com/docs/4.5/components/buttons/",
          target: "_blank"
        }, "Bootstrap button style"),
        createTextVNode("\n        , if you need a custom style, just enter your button class names.\n      ")
      ], -1))
    ]),
    _cache[45] || (_cache[45] = createTextVNode()),
    createElementVNode("div", _hoisted_9, [
      _cache[29] || (_cache[29] = createElementVNode("label", null, "\n        Border Radius\n      ", -1)),
      _cache[30] || (_cache[30] = createTextVNode()),
      createVNode($setup["SliderInput"], {
        modelValue: $setup.options.border_radius,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.options.border_radius = $event),
        max: 1200
      }, null, 8, ["modelValue"])
    ]),
    _cache[46] || (_cache[46] = createTextVNode()),
    createElementVNode("div", _hoisted_10, [
      _cache[31] || (_cache[31] = createElementVNode("label", { for: "input-addon-edit-block" }, "Full-Width", -1)),
      _cache[32] || (_cache[32] = createTextVNode()),
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
    _cache[47] || (_cache[47] = createTextVNode()),
    createElementVNode("div", _hoisted_11, [
      _cache[34] || (_cache[34] = createElementVNode("label", { for: "input-addon-edit-icon" }, "Icon Class Name", -1)),
      _cache[35] || (_cache[35] = createTextVNode()),
      createElementVNode("div", _hoisted_12, [
        createElementVNode("div", _hoisted_13, [
          createElementVNode("span", {
            class: normalizeClass($setup.options.icon)
          }, null, 2)
        ]),
        _cache[33] || (_cache[33] = createTextVNode()),
        withDirectives(createElementVNode("input", {
          id: "input-addon-edit-icon",
          type: "text",
          "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.options.icon = $event),
          class: "form-control"
        }, null, 512), [
          [vModelText, $setup.options.icon]
        ])
      ]),
      _cache[36] || (_cache[36] = createTextVNode()),
      _cache[37] || (_cache[37] = createElementVNode("small", { class: "form-text text-muted" }, [
        createTextVNode("\n        Enter icon class, example: "),
        createElementVNode("code", null, "fa fa-star"),
        createTextVNode(".\n        You can find icons from: "),
        createElementVNode("a", {
          target: "_blank",
          href: "https://fontawesome.com/v6.0/icons"
        }, "FontAwsome")
      ], -1))
    ]),
    _cache[48] || (_cache[48] = createTextVNode()),
    createElementVNode("div", _hoisted_14, [
      _cache[38] || (_cache[38] = createElementVNode("label", { for: "input-addon-edit-icon_position" }, "Icon Position", -1)),
      _cache[39] || (_cache[39] = createTextVNode()),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkb24tYnV0dG9uLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tcG9uZW50cy9wYWdlLWJ1aWxkZXIvYWRkb25zL2FkZG9uLWJ1dHRvbi52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIiBzZXR1cD5cbmltcG9ydCB7IHVpZCBhcyBnZXRVaWQgfSBmcm9tICdAd2luZHdhbGtlci1pby91bmljb3JuLW5leHQnO1xuaW1wb3J0IHsgcmVmIH0gZnJvbSAndnVlJztcbmltcG9ydCB7IEFkZG9uUHJvcHMsIHVzZUFkZG9uRGVmYXVsdHMgfSBmcm9tICd+bHVuYS9jb21wb3NhYmxlcyc7XG5pbXBvcnQgeyBBZGRvbk9wdGlvbnMgfSBmcm9tICd+bHVuYS90eXBlcyc7XG5pbXBvcnQgQnV0dG9uUmFkaW8gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9wYWdlLWJ1aWxkZXIvZm9ybS9CdXR0b25SYWRpby52dWUnO1xuaW1wb3J0IFNsaWRlcklucHV0IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvcGFnZS1idWlsZGVyL2Zvcm0vU2xpZGVySW5wdXQudnVlJztcbmltcG9ydCBVbmljb3JuU3dpdGNoZXIgZnJvbSAnLi4vLi4vZm9ybS9Vbmljb3JuU3dpdGNoZXIudnVlJztcblxuZXhwb3J0IGludGVyZmFjZSBBZGRvbkJ1dHRvbk9wdGlvbnMge1xuICB0ZXh0OiBzdHJpbmc7XG4gIGxpbms6IHN0cmluZztcbiAgbGlua190YXJnZXQ6IHN0cmluZztcbiAgc3R5bGU6IHN0cmluZztcbiAgYm9yZGVyX3JhZGl1czogc3RyaW5nO1xuICBzaXplOiBzdHJpbmc7XG4gIGJsb2NrOiBib29sZWFuO1xuICBpY29uOiBzdHJpbmc7XG4gIGljb25fcG9zaXRpb246ICdsZWZ0JyB8ICdyaWdodCc7XG59XG5cbmRlZmluZVByb3BzPEFkZG9uUHJvcHM+KCk7XG5cbmNvbnN0IG9wdGlvbnMgPSBkZWZpbmVNb2RlbDxBZGRvbk9wdGlvbnMgJiBBZGRvbkJ1dHRvbk9wdGlvbnM+KHsgcmVxdWlyZWQ6IHRydWUgfSk7XG5cbnVzZUFkZG9uRGVmYXVsdHMob3B0aW9ucywge1xuICB0ZXh0OiAnJyxcbiAgbGluazogJycsXG4gIGxpbmtfdGFyZ2V0OiAnJyxcbiAgc3R5bGU6ICdidG4tcHJpbWFyeScsXG4gIGJvcmRlcl9yYWRpdXM6ICcnLFxuICBzaXplOiAnJyxcbiAgYmxvY2s6IGZhbHNlLFxuICBpY29uOiAnJyxcbiAgaWNvbl9wb3NpdGlvbjogJ2xlZnQnLFxufSk7XG5cbmNvbnN0IHVpZCA9IHJlZihnZXRVaWQoKSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDwhLS0gVGV4dCAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCI+XG4gICAgICA8bGFiZWwgZm9yPVwiaW5wdXQtYWRkb24tZWRpdC10ZXh0XCI+QnV0dG9uIFRleHQ8L2xhYmVsPlxuICAgICAgPGlucHV0IGlkPVwiaW5wdXQtYWRkb24tZWRpdC10ZXh0XCIgdHlwZT1cInRleHRcIlxuICAgICAgICB2LW1vZGVsPVwib3B0aW9ucy50ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiAvPlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBBbGlnbiAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCI+XG4gICAgICA8bGFiZWwgZm9yPVwiaW5wdXQtYWRkb24tZWRpdC1hbGlnblwiPkFsaWduPC9sYWJlbD5cbiAgICAgIDxCdXR0b25SYWRpb1xuICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICB2YXJpYW50PVwib3V0bGluZVwiXG4gICAgICAgIGNsYXNzPVwidy0xMDBcIlxuICAgICAgICB2LW1vZGVsPVwib3B0aW9ucy5hbGlnblwiXG4gICAgICAgIDpvcHRpb25zPVwiW1xuICAgICAgICAgICAgeyB0ZXh0OiAnRGVmYXVsdCcsIHZhbHVlOiAnJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnTGVmdCcsIHZhbHVlOiAnbGVmdCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0NlbnRlcicsIHZhbHVlOiAnY2VudGVyJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnUmlnaHQnLCB2YWx1ZTogJ3JpZ2h0JyB9LFxuICAgICAgICAgIF1cIlxuICAgICAgLz5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gTElOSyAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCI+XG4gICAgICA8bGFiZWwgZm9yPVwiaW5wdXQtYWRkb24tZWRpdC1saW5rXCI+TGluazwvbGFiZWw+XG4gICAgICA8aW5wdXQgaWQ9XCJpbnB1dC1hZGRvbi1lZGl0LWxpbmtcIiB0eXBlPVwidXJsXCJcbiAgICAgICAgdi1tb2RlbD1cIm9wdGlvbnMubGlua1wiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgLz5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gTmV3IFdpbmRvdyAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCIgdi1pZj1cIm9wdGlvbnMubGluayAhPT0gJydcIj5cbiAgICAgIDxsYWJlbCBmb3I9XCJpbnB1dC1hZGRvbi1lZGl0LWxpbmstdGFyZ2V0XCI+T3BlbiBpbiBOZXcgV2luZG93PC9sYWJlbD5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxVbmljb3JuU3dpdGNoZXIgbmFtZT1cImFkZG9uLWVkaXQtbGluay10YXJnZXRcIlxuICAgICAgICAgIHYtbW9kZWw9XCJvcHRpb25zLmxpbmtfdGFyZ2V0XCJcbiAgICAgICAgICBpZD1cImlucHV0LWFkZG9uLWVkaXQtbGluay10YXJnZXRcIlxuICAgICAgICAgIHNoYXBlPVwiY2lyY2xlXCJcbiAgICAgICAgICBjb2xvcj1cInN1Y2Nlc3NcIlxuICAgICAgICAgIHRydWUtdmFsdWU9XCJfYmxhbmtcIlxuICAgICAgICAgIGZhbHNlLXZhbHVlPVwiXCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBTdHlsZSAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCI+XG4gICAgICA8bGFiZWwgZm9yPVwiaW5wdXQtYWRkb24tZWRpdC1zdHlsZVwiPlN0eWxlPC9sYWJlbD5cbiAgICAgIDxpbnB1dCB0eXBlPVwic2VhcmNoXCIgaWQ9XCJpbnB1dC1hZGRvbi1lZGl0LXN0eWxlXCJcbiAgICAgICAgdi1tb2RlbD1cIm9wdGlvbnMuc3R5bGVcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgIDpsaXN0PVwiYGlucHV0LWVkaXQtc3R5bGVfX2xpc3QtJHt1aWR9YFwiXG4gICAgICAvPlxuICAgICAgPGRhdGFsaXN0IDppZD1cImBpbnB1dC1lZGl0LXN0eWxlX19saXN0LSR7dWlkfWBcIj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJ0bi1wcmltYXJ5XCI+YnRuLXByaW1hcnk8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJ0bi1vdXRsaW5lLXByaW1hcnlcIj5idG4tb3V0bGluZS1wcmltYXJ5PC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJidG4tc2Vjb25kYXJ5XCI+YnRuLXNlY29uZGFyeTwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYnRuLW91dGxpbmUtc2Vjb25kYXJ5XCI+YnRuLW91dGxpbmUtc2Vjb25kYXJ5PC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJidG4tc3VjY2Vzc1wiPmJ0bi1zdWNjZXNzPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJidG4tb3V0bGluZS1zdWNjZXNzXCI+YnRuLW91dGxpbmUtc3VjY2Vzczwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYnRuLWluZm9cIj5idG4taW5mbzwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYnRuLW91dGxpbmUtaW5mb1wiPmJ0bi1vdXRsaW5lLWluZm88L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJ0bi13YXJuaW5nXCI+YnRuLXdhcm5pbmc8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJ0bi1vdXRsaW5lLXdhcm5pbmdcIj5idG4tb3V0bGluZS13YXJuaW5nPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJidG4tZGFuZ2VyXCI+YnRuLWRhbmdlcjwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYnRuLW91dGxpbmUtZGFuZ2VyXCI+YnRuLW91dGxpbmUtZGFuZ2VyPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJidG4tZGFya1wiPmJ0bi1kYXJrPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJidG4tb3V0bGluZS1kYXJrXCI+YnRuLW91dGxpbmUtZGFyazwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYnRuLWxpZ2h0XCI+YnRuLWxpZ2h0PC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJidG4tb3V0bGluZS1saWdodFwiPmJ0bi1vdXRsaW5lLWxpZ2h0PC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJidG4tbGlua1wiPmJ0bi1saW5rPC9vcHRpb24+XG4gICAgICA8L2RhdGFsaXN0PlxuICAgICAgPHNtYWxsIGNsYXNzPVwiZm9ybS10ZXh0IHRleHQtbXV0ZWRcIj5cbiAgICAgICAgVXNlIDxhIGhyZWY9XCJodHRwczovL2dldGJvb3RzdHJhcC5jb20vZG9jcy81LjEvY29tcG9uZW50cy9idXR0b25zL1wiIHRhcmdldD1cIl9ibGFua1wiPkJvb3RzdHJhcCBidXR0b24gc3R5bGU8L2E+XG4gICAgICAgICwgaWYgeW91IG5lZWQgYSBjdXN0b20gc3R5bGUsIGp1c3QgZW50ZXIgeW91ciBidXR0b24gY2xhc3MgbmFtZXMuXG4gICAgICA8L3NtYWxsPlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBTaXplIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIG1iLTNcIj5cbiAgICAgIDxsYWJlbCBmb3I9XCJpbnB1dC1hZGRvbi1lZGl0LXNpemVcIj5TaXplPC9sYWJlbD5cbiAgICAgIDxzZWxlY3QgaWQ9XCJpbnB1dC1hZGRvbi1lZGl0LXNpemVcIlxuICAgICAgICB2LW1vZGVsPVwib3B0aW9ucy5zaXplXCIgY2xhc3M9XCJmb3JtLXNlbGVjdCBjdXN0b20tc2VsZWN0XCJcbiAgICAgID5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPkRlZmF1bHQ8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJ0bi1zbVwiPmJ0bi1zbSAoU21hbGwpPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJidG4tbGdcIj5idG4tbGcgKExhcmdlKTwvb3B0aW9uPlxuICAgICAgPC9zZWxlY3Q+XG4gICAgICA8c21hbGwgY2xhc3M9XCJmb3JtLXRleHQgdGV4dC1tdXRlZFwiPlxuICAgICAgICBVc2UgPGEgaHJlZj1cImh0dHBzOi8vZ2V0Ym9vdHN0cmFwLmNvbS9kb2NzLzQuNS9jb21wb25lbnRzL2J1dHRvbnMvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Qm9vdHN0cmFwIGJ1dHRvbiBzdHlsZTwvYT5cbiAgICAgICAgLCBpZiB5b3UgbmVlZCBhIGN1c3RvbSBzdHlsZSwganVzdCBlbnRlciB5b3VyIGJ1dHRvbiBjbGFzcyBuYW1lcy5cbiAgICAgIDwvc21hbGw+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIFJhZGl1cyAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCI+XG4gICAgICA8bGFiZWw+XG4gICAgICAgIEJvcmRlciBSYWRpdXNcbiAgICAgIDwvbGFiZWw+XG4gICAgICA8U2xpZGVySW5wdXRcbiAgICAgICAgdi1tb2RlbD1cIm9wdGlvbnMuYm9yZGVyX3JhZGl1c1wiXG4gICAgICAgIDptYXg9XCIxMjAwXCJcbiAgICAgIC8+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIEJsb2NrZWQgLS0+XG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgbWItM1wiPlxuICAgICAgPGxhYmVsIGZvcj1cImlucHV0LWFkZG9uLWVkaXQtYmxvY2tcIj5GdWxsLVdpZHRoPC9sYWJlbD5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxVbmljb3JuU3dpdGNoZXIgbmFtZT1cImFkZG9uLWVkaXQtYmxvY2tcIlxuICAgICAgICAgIHYtbW9kZWw9XCJvcHRpb25zLmJsb2NrXCJcbiAgICAgICAgICBpZD1cImlucHV0LWFkZG9uLWVkaXQtYmxvY2tcIlxuICAgICAgICAgIHNoYXBlPVwiY2lyY2xlXCJcbiAgICAgICAgICBjb2xvcj1cInN1Y2Nlc3NcIlxuICAgICAgICAgIDp0cnVlLXZhbHVlPVwidHJ1ZVwiXG4gICAgICAgICAgOmZhbHNlLXZhbHVlPVwiZmFsc2VcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIEljb24gLS0+XG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgbWItM1wiPlxuICAgICAgPGxhYmVsIGZvcj1cImlucHV0LWFkZG9uLWVkaXQtaWNvblwiPkljb24gQ2xhc3MgTmFtZTwvbGFiZWw+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgbWItM1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiPlxuICAgICAgICAgIDxzcGFuIDpjbGFzcz1cIm9wdGlvbnMuaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxpbnB1dCBpZD1cImlucHV0LWFkZG9uLWVkaXQtaWNvblwiIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICB2LW1vZGVsPVwib3B0aW9ucy5pY29uXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8c21hbGwgY2xhc3M9XCJmb3JtLXRleHQgdGV4dC1tdXRlZFwiPlxuICAgICAgICBFbnRlciBpY29uIGNsYXNzLCBleGFtcGxlOiA8Y29kZT5mYSBmYS1zdGFyPC9jb2RlPi5cbiAgICAgICAgWW91IGNhbiBmaW5kIGljb25zIGZyb206IDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL2ZvbnRhd2Vzb21lLmNvbS92Ni4wL2ljb25zXCI+Rm9udEF3c29tZTwvYT5cbiAgICAgIDwvc21hbGw+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIEljb24gUG9zaXRpb24gLS0+XG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgbWItM1wiPlxuICAgICAgPGxhYmVsIGZvcj1cImlucHV0LWFkZG9uLWVkaXQtaWNvbl9wb3NpdGlvblwiPkljb24gUG9zaXRpb248L2xhYmVsPlxuICAgICAgPEJ1dHRvblJhZGlvXG4gICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lXCJcbiAgICAgICAgY2xhc3M9XCJ3LTEwMFwiXG4gICAgICAgIHYtbW9kZWw9XCJvcHRpb25zLmljb25fcG9zaXRpb25cIlxuICAgICAgICA6b3B0aW9ucz1cIltcbiAgICAgICAgICB7IHRleHQ6ICdMZWZ0JywgdmFsdWU6ICdsZWZ0JyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1JpZ2h0JywgdmFsdWU6ICdyaWdodCcgfSxcbiAgICAgICAgXVwiXG4gICAgICAvPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX3VzZU1vZGVsIiwidWlkIiwiZ2V0VWlkIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3ZNb2RlbFRleHQiLCJfY3JlYXRlVk5vZGUiLCJfb3BlbkJsb2NrIiwiX3ZNb2RlbFNlbGVjdCIsIl9ub3JtYWxpemVDbGFzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLFVBQU0sVUFBVUEsU0FBOEMsU0FBQSxZQUFtQjtBQUVqRixxQkFBaUIsU0FBUztBQUFBLE1BQ3hCLE1B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
