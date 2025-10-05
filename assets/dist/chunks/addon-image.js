import { defineComponent, mergeModels, useModel, createElementBlock, openBlock, createElementVNode, createTextVNode, createBlock, createCommentVNode, withDirectives, vModelText, createVNode } from "vue";
import "@windwalker-io/unicorn-next";
import { u as useAddonDefaults } from "./useAddonDefaults.js";
import { e as SliderInput, _ as _export_sfc } from "./SliderInput.js";
import "bootstrap";
import { B as ButtonRadio } from "./ButtonRadio.js";
import { S as SingleImage } from "./SingleImage.js";
import { U as UnicornSwitcher } from "./UnicornSwitcher.js";
import { R as RwdTitleOptions } from "./RwdTitleOptions.js";
import "./RwdGroup.js";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkb24taW1hZ2UuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3BhZ2UtYnVpbGRlci9hZGRvbnMvYWRkb24taW1hZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCIgc2V0dXA+XG5pbXBvcnQgeyBBZGRvblByb3BzLCB1c2VBZGRvbkRlZmF1bHRzIH0gZnJvbSAnfmx1bmEvY29tcG9zYWJsZXMnO1xuaW1wb3J0IHsgQWRkb25PcHRpb25zIH0gZnJvbSAnfmx1bmEvdHlwZXMnO1xuaW1wb3J0IEJ1dHRvblJhZGlvIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvcGFnZS1idWlsZGVyL2Zvcm0vQnV0dG9uUmFkaW8udnVlJztcbmltcG9ydCBTaW5nbGVJbWFnZSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9wYWdlLWJ1aWxkZXIvZm9ybS9TaW5nbGVJbWFnZS52dWVcIjtcbmltcG9ydCBTbGlkZXJJbnB1dCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3BhZ2UtYnVpbGRlci9mb3JtL1NsaWRlcklucHV0LnZ1ZSc7XG5pbXBvcnQgVW5pY29yblN3aXRjaGVyIGZyb20gJy4uLy4uL2Zvcm0vVW5pY29yblN3aXRjaGVyLnZ1ZSc7XG5pbXBvcnQgUndkVGl0bGVPcHRpb25zIGZyb20gJy4uL2Zvcm0vUndkVGl0bGVPcHRpb25zLnZ1ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWRkb25JbWFnZU9wdGlvbnMge1xuICBpbWFnZTogc3RyaW5nO1xuICBib3JkZXJfcmFkaXVzOiBzdHJpbmc7XG4gIGFsdDogc3RyaW5nO1xuICBsaW5rOiBzdHJpbmc7XG4gIGxpbmtfdGFyZ2V0OiBzdHJpbmc7XG4gIGFsaWduOiAnJyB8ICdsZWZ0JyB8ICdjZW50ZXInIHwgJ3JpZ2h0Jztcbn1cblxuZGVmaW5lUHJvcHM8QWRkb25Qcm9wcz4oKTtcblxuY29uc3Qgb3B0aW9ucyA9IGRlZmluZU1vZGVsPEFkZG9uT3B0aW9ucyAmIEFkZG9uSW1hZ2VPcHRpb25zPih7IHJlcXVpcmVkOiB0cnVlIH0pO1xuXG51c2VBZGRvbkRlZmF1bHRzKG9wdGlvbnMsIHtcbiAgaW1hZ2U6ICcnLFxuICBib3JkZXJfcmFkaXVzOiAnJyxcbiAgYWx0OiAnJyxcbiAgbGluazogJycsXG4gIGxpbmtfdGFyZ2V0OiAnJyxcbiAgYWxpZ246ICcnLFxufSk7XG5cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPCEtLSBUaXRsZSAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCI+XG4gICAgICA8bGFiZWwgZm9yPVwiaW5wdXQtYWRkb24tZWRpdC10aXRsZS10ZXh0XCI+VGl0bGU8L2xhYmVsPlxuICAgICAgPHRleHRhcmVhIGlkPVwiaW5wdXQtYWRkb24tZWRpdC10aXRsZS10ZXh0XCJcbiAgICAgICAgdi1tb2RlbD1cIm9wdGlvbnMudGl0bGUudGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+PC90ZXh0YXJlYT5cbiAgICAgIDxzbWFsbCBjbGFzcz1cImZvcm0tdGV4dCB0ZXh0LW11dGVkXCI+VGhlIG1haW4gdGl0bGUgb2YgdGhpcyBzZWN0aW9uLCBrZWVwIGVtcHR5IHRvIGhpZGUgaXQuPC9zbWFsbD5cbiAgICA8L2Rpdj5cblxuICAgIDxSd2RUaXRsZU9wdGlvbnMgdi1pZj1cIm9wdGlvbnMudGl0bGUudGV4dCAhPT0gJydcIlxuICAgICAgaWQ9XCJpbnB1dC1hZGRvbi1lZGl0XCIgdi1tb2RlbD1cIm9wdGlvbnMudGl0bGVcIj48L1J3ZFRpdGxlT3B0aW9ucz5cblxuICAgIDxociAvPlxuXG4gICAgPCEtLSBJbWFnZSAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCI+XG4gICAgICA8bGFiZWwgZm9yPVwiaW5wdXQtYWRkb24tZWRpdC1pbWFnZVwiPkltYWdlPC9sYWJlbD5cbiAgICAgIDxTaW5nbGVJbWFnZSB2LW1vZGVsPVwib3B0aW9ucy5pbWFnZVwiXG4gICAgICAgIGlkPVwiaW5wdXQtYWRkb24tZWRpdC1pbWFnZVwiPjwvU2luZ2xlSW1hZ2U+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIExJTksgLS0+XG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgbWItM1wiPlxuICAgICAgPGxhYmVsIGZvcj1cImlucHV0LWFkZG9uLWVkaXQtbGlua1wiPkxpbms8L2xhYmVsPlxuICAgICAgPGlucHV0IGlkPVwiaW5wdXQtYWRkb24tZWRpdC1saW5rXCIgdHlwZT1cInVybFwiXG4gICAgICAgIHYtbW9kZWw9XCJvcHRpb25zLmxpbmtcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIC8+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIE5ldyBXaW5kb3cgLS0+XG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgbWItM1wiIHYtaWY9XCJvcHRpb25zLmxpbmsgIT09ICcnXCI+XG4gICAgICA8bGFiZWwgZm9yPVwiaW5wdXQtYWRkb24tZWRpdC1saW5rLXRhcmdldFwiPk9wZW4gaW4gTmV3IFdpbmRvdzwvbGFiZWw+XG4gICAgICA8ZGl2PlxuICAgICAgICA8VW5pY29yblN3aXRjaGVyIG5hbWU9XCJhZGRvbi1lZGl0LWxpbmstdGFyZ2V0XCJcbiAgICAgICAgICB2LW1vZGVsPVwib3B0aW9ucy5saW5rX3RhcmdldFwiXG4gICAgICAgICAgaWQ9XCJpbnB1dC1hZGRvbi1lZGl0LWxpbmstdGFyZ2V0XCJcbiAgICAgICAgICBzaGFwZT1cImNpcmNsZVwiXG4gICAgICAgICAgY29sb3I9XCJzdWNjZXNzXCJcbiAgICAgICAgICB0cnVlLXZhbHVlPVwiX2JsYW5rXCJcbiAgICAgICAgICBmYWxzZS12YWx1ZT1cIlwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gQWx0IC0tPlxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIG1iLTNcIj5cbiAgICAgIDxsYWJlbCBmb3I9XCJpbnB1dC1hZGRvbi1lZGl0LWFsdFwiPkFsdCBUZXh0PC9sYWJlbD5cbiAgICAgIDxpbnB1dCBpZD1cImlucHV0LWFkZG9uLWVkaXQtYWx0XCIgdHlwZT1cInRleHRcIlxuICAgICAgICB2LW1vZGVsPVwib3B0aW9ucy5hbHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIC8+XG4gICAgICA8c21hbGwgY2xhc3M9XCJmb3JtLXRleHQgdGV4dC1tdXRlZFwiPlxuICAgICAgICBUaGUgYWx0IHRleHQgaWYgaW1hZ2UgdW5hdmFpbGFibGUsIGFsc28gZ29vZCBmb3IgU0VPLlxuICAgICAgPC9zbWFsbD5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gUmFkaXVzIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIG1iLTNcIj5cbiAgICAgIDxsYWJlbD5cbiAgICAgICAgQm9yZGVyIFJhZGl1c1xuICAgICAgPC9sYWJlbD5cbiAgICAgIDxTbGlkZXJJbnB1dFxuICAgICAgICB2LW1vZGVsPVwib3B0aW9ucy5ib3JkZXJfcmFkaXVzXCJcbiAgICAgICAgOm1heD1cIjEyMDBcIlxuICAgICAgLz5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gQWxpZ24gLS0+XG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgbWItM1wiPlxuICAgICAgPGxhYmVsIGZvcj1cImlucHV0LWFkZG9uLWVkaXQtYWxpZ25cIj5JbWFnZSBBbGlnbm1lbnQ8L2xhYmVsPlxuICAgICAgPGRpdiBjbGFzcz1cIm10LTJcIj5cbiAgICAgICAgPEJ1dHRvblJhZGlvXG4gICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICB2YXJpYW50PVwib3V0bGluZVwiXG4gICAgICAgICAgY2xhc3M9XCJ3LTEwMFwiXG4gICAgICAgICAgdi1tb2RlbD1cIm9wdGlvbnMuYWxpZ25cIlxuICAgICAgICAgIDpvcHRpb25zPVwiW1xuICAgICAgICAgICAgeyB0ZXh0OiAnRGVmYXVsdCcsIHZhbHVlOiAnJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnTGVmdCcsIHZhbHVlOiAnbGVmdCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0NlbnRlcicsIHZhbHVlOiAnY2VudGVyJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnUmlnaHQnLCB2YWx1ZTogJ3JpZ2h0JyB9LFxuICAgICAgICAgIF1cIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfdXNlTW9kZWwiLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdk1vZGVsVGV4dCIsIl9vcGVuQmxvY2siLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlQ29tbWVudFZOb2RlIiwiX2NyZWF0ZVZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsVUFBTSxVQUFVQSxTQUE2QyxTQUFBLFlBQW1CO0FBRWhGLHFCQUFpQixTQUFTO0FBQUEsTUFDeEIsT0FBTztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsS0FBSztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsT0FBTztBQUFBLElBQUEsQ0FDUjs7Ozs7O0FBT1EsTUFBQSxhQUFBLEVBQUEsT0FBTSxrQkFBQTtBQWFOLE1BQUEsYUFBQSxFQUFBLE9BQU0sa0JBQUE7QUFPTixNQUFBLGFBQUEsRUFBQSxPQUFNLGtCQUFBOzs7RUFPTixPQUFNOztBQWVOLE1BQUEsYUFBQSxFQUFBLE9BQU0sa0JBQUE7QUFVTixNQUFBLGFBQUEsRUFBQSxPQUFNLGtCQUFBO0FBV04sTUFBQSxhQUFBLEVBQUEsT0FBTSxrQkFBQTtBQUVKLE1BQUEsYUFBQSxFQUFBLE9BQU0sT0FBQTs7c0JBbkVmQyxtQkFrRk0sT0FBQSxNQUFBO0FBQUEsSUFoRkpDLG1CQUtNLE9BTE4sWUFLTTtBQUFBLE1BQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBSkpBLG1CQUFzRCxTQUFBLEVB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
