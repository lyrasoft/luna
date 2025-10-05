import { defineComponent, mergeModels, useModel, resolveDirective, createElementBlock, openBlock, createElementVNode, createTextVNode, createBlock, createCommentVNode, createVNode, withDirectives, vModelText, createSlots, withCtx, renderList } from "vue";
import "@windwalker-io/unicorn-next";
import { u as useAddonDefaults } from "./useAddonDefaults.js";
import { e as SliderInput, _ as _export_sfc } from "./SliderInput.js";
import "bootstrap";
import { B as ButtonRadio } from "./ButtonRadio.js";
import { R as RwdGroup } from "./RwdGroup.js";
import { R as RwdTitleOptions } from "./RwdTitleOptions.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "addon-text",
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
      _cache[5] || (_cache[5] = createTextVNode()),
      withDirectives(createElementVNode("textarea", {
        id: "input-addon-edit-title-text",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.options.title.text = $event),
        class: "form-control"
      }, null, 512), [
        [vModelText, $setup.options.title.text]
      ]),
      _cache[6] || (_cache[6] = createTextVNode()),
      _cache[7] || (_cache[7] = createElementVNode("small", { class: "form-text text-muted" }, "The main title of this section, keep empty to hide it.", -1))
    ]),
    _cache[16] || (_cache[16] = createTextVNode()),
    $setup.options.title.text !== "" ? (openBlock(), createBlock($setup["RwdTitleOptions"], {
      key: 0,
      id: "input-addon-edit",
      modelValue: $setup.options.title,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.options.title = $event)
    }, null, 8, ["modelValue"])) : createCommentVNode("", true),
    _cache[17] || (_cache[17] = createTextVNode()),
    _cache[18] || (_cache[18] = createElementVNode("hr", null, null, -1)),
    _cache[19] || (_cache[19] = createTextVNode()),
    createElementVNode("div", _hoisted_2, [
      _cache[8] || (_cache[8] = createElementVNode("label", { for: "addon-edit-content" }, "Content", -1)),
      _cache[9] || (_cache[9] = createTextVNode()),
      withDirectives(createElementVNode("textarea", {
        id: "addon-edit-content",
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.options.content = $event),
        class: "form-control"
      }, null, 512), [
        [vModelText, $setup.options.content],
        [_directive_tinymce]
      ])
    ]),
    _cache[20] || (_cache[20] = createTextVNode()),
    createElementVNode("div", _hoisted_3, [
      _cache[10] || (_cache[10] = createElementVNode("label", { for: "input-addon-edit-title-align" }, "Content Alignment", -1)),
      _cache[11] || (_cache[11] = createTextVNode()),
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
    _cache[21] || (_cache[21] = createTextVNode()),
    createVNode($setup["RwdGroup"], { "class-name": "c-content-font-size" }, createSlots({
      label: withCtx(() => [
        _cache[12] || (_cache[12] = createElementVNode("label", null, "\n          Content Font Size\n        ", -1))
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
    _cache[22] || (_cache[22] = createTextVNode()),
    createVNode($setup["RwdGroup"], { "class-name": "c-content-line-height" }, createSlots({
      label: withCtx(() => [
        _cache[14] || (_cache[14] = createElementVNode("label", null, "\n          Content Line Height\n        ", -1))
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkb24tdGV4dC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbXBvbmVudHMvcGFnZS1idWlsZGVyL2FkZG9ucy9hZGRvbi10ZXh0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiIHNldHVwPlxuaW1wb3J0IHsgdHlwZSBBZGRvblByb3BzLCB1c2VBZGRvbkRlZmF1bHRzIH0gZnJvbSAnfmx1bmEvY29tcG9zYWJsZXMnO1xuaW1wb3J0IHsgQWRkb25PcHRpb25zIH0gZnJvbSAnfmx1bmEvdHlwZXMnO1xuaW1wb3J0IEJ1dHRvblJhZGlvIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvcGFnZS1idWlsZGVyL2Zvcm0vQnV0dG9uUmFkaW8udnVlJztcbmltcG9ydCBSd2RHcm91cCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3BhZ2UtYnVpbGRlci9mb3JtL1J3ZEdyb3VwLnZ1ZSc7XG5pbXBvcnQgU2xpZGVySW5wdXQgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9wYWdlLWJ1aWxkZXIvZm9ybS9TbGlkZXJJbnB1dC52dWUnO1xuaW1wb3J0IFJ3ZFRpdGxlT3B0aW9ucyBmcm9tICcuLi9mb3JtL1J3ZFRpdGxlT3B0aW9ucy52dWUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFkZG9uVGV4dE9wdGlvbnMge1xuICBjb250ZW50OiBzdHJpbmc7XG4gIGNvbnRlbnRfZm9udF9zaXplOiB7XG4gICAgbGc6IHN0cmluZztcbiAgICBtZDogc3RyaW5nO1xuICAgIHhzOiBzdHJpbmc7XG4gIH07XG4gIGNvbnRlbnRfbGluZV9oZWlnaHQ6IHtcbiAgICBsZzogc3RyaW5nO1xuICAgIG1kOiBzdHJpbmc7XG4gICAgeHM6IHN0cmluZztcbiAgfTtcbn1cblxuZGVmaW5lUHJvcHM8QWRkb25Qcm9wcz4oKTtcblxuY29uc3Qgb3B0aW9ucyA9IGRlZmluZU1vZGVsPEFkZG9uT3B0aW9ucyAmIEFkZG9uVGV4dE9wdGlvbnM+KHsgcmVxdWlyZWQ6IHRydWUgfSk7XG5cbnVzZUFkZG9uRGVmYXVsdHMob3B0aW9ucywge1xuICBjb250ZW50OiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gRG9uZWMgcHJldGl1bSwgJyArXG4gICAgJ21hc3NhIGRpY3R1bSBoZW5kcmVyaXQgbWF4aW11cywgZXggZXN0IHNlbXBlciBlc3QsIHF1aXMgc29kYWxlcyBvZGlvIGVsaXQgYSB1cm5hLiAnICtcbiAgICAnUGVsbGVudGVzcXVlIGRhcGlidXMgdmVsIG9yY2kgaWQgbGFjaW5pYS4gQ3VyYWJpdHVyIGR1aSBwdXJ1cywgY29uZGltZW50dW0gJyArXG4gICAgJ3ZpdGFlIGRhcGlidXMgdXQsIHJob25jdXMgdml0YWUgc2VtLiBEb25lYyBkaWduaXNzaW0sIGR1aSB1dCBzb2xsaWNpdHVkaW4gJyArXG4gICAgJ2NvbnNlY3RldHVyLCBlc3QgbGFjdXMgZWxlbWVudHVtIG1pLCBzaXQgYW1ldCBpbXBlcmRpZXQgbmlzbCBtZXR1cyBhdCBudW5jLicsXG4gIGNvbnRlbnRfZm9udF9zaXplOiB7XG4gICAgbGc6ICcnLFxuICAgIG1kOiAnJyxcbiAgICB4czogJydcbiAgfSxcbiAgY29udGVudF9saW5lX2hlaWdodDoge1xuICAgIGxnOiAnJyxcbiAgICBtZDogJycsXG4gICAgeHM6ICcnXG4gIH1cbn0pO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8IS0tIFRpdGxlIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIG1iLTNcIj5cbiAgICAgIDxsYWJlbCBmb3I9XCJpbnB1dC1hZGRvbi1lZGl0LXRpdGxlLXRleHRcIj5UaXRsZTwvbGFiZWw+XG4gICAgICA8dGV4dGFyZWEgaWQ9XCJpbnB1dC1hZGRvbi1lZGl0LXRpdGxlLXRleHRcIlxuICAgICAgICB2LW1vZGVsPVwib3B0aW9ucy50aXRsZS50ZXh0XCJcbiAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj48L3RleHRhcmVhPlxuICAgICAgPHNtYWxsIGNsYXNzPVwiZm9ybS10ZXh0IHRleHQtbXV0ZWRcIj5UaGUgbWFpbiB0aXRsZSBvZiB0aGlzIHNlY3Rpb24sIGtlZXAgZW1wdHkgdG8gaGlkZSBpdC48L3NtYWxsPlxuICAgIDwvZGl2PlxuXG4gICAgPFJ3ZFRpdGxlT3B0aW9ucyB2LWlmPVwib3B0aW9ucy50aXRsZS50ZXh0ICE9PSAnJ1wiXG4gICAgICBpZD1cImlucHV0LWFkZG9uLWVkaXRcIiB2LW1vZGVsPVwib3B0aW9ucy50aXRsZVwiIC8+XG5cbiAgICA8aHIgLz5cblxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIG1iLTNcIj5cbiAgICAgIDxsYWJlbCBmb3I9XCJhZGRvbi1lZGl0LWNvbnRlbnRcIj5Db250ZW50PC9sYWJlbD5cbiAgICAgIDx0ZXh0YXJlYSBpZD1cImFkZG9uLWVkaXQtY29udGVudFwiIHYtbW9kZWw9XCJvcHRpb25zLmNvbnRlbnRcIiB2LXRpbnltY2UgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj48L3RleHRhcmVhPlxuICAgIDwvZGl2PlxuXG4gICAgPCEtLSBDb250ZW50IEFsaWduIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIG1iLTNcIj5cbiAgICAgIDxsYWJlbCBmb3I9XCJpbnB1dC1hZGRvbi1lZGl0LXRpdGxlLWFsaWduXCI+Q29udGVudCBBbGlnbm1lbnQ8L2xhYmVsPlxuICAgICAgPGRpdiBjbGFzcz1cIm10LTJcIj5cbiAgICAgICAgPEJ1dHRvblJhZGlvXG4gICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICB2YXJpYW50PVwib3V0bGluZVwiXG4gICAgICAgICAgY2xhc3M9XCJ3LTEwMFwiXG4gICAgICAgICAgdi1tb2RlbD1cIm9wdGlvbnMuYWxpZ25cIlxuICAgICAgICAgIDpvcHRpb25zPVwiW1xuICAgICAgICAgICAgeyB0ZXh0OiAnRGVmYXVsdCcsIHZhbHVlOiAnJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnTGVmdCcsIHZhbHVlOiAnbGVmdCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0NlbnRlcicsIHZhbHVlOiAnY2VudGVyJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnUmlnaHQnLCB2YWx1ZTogJ3JpZ2h0JyB9LFxuICAgICAgICAgIF1cIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIENvbnRlbnQgRm9udCBTaXplIC0tPlxuICAgIDxSd2RHcm91cCBjbGFzcy1uYW1lPVwiYy1jb250ZW50LWZvbnQtc2l6ZVwiPlxuICAgICAgPHRlbXBsYXRlICNsYWJlbD5cbiAgICAgICAgPGxhYmVsPlxuICAgICAgICAgIENvbnRlbnQgRm9udCBTaXplXG4gICAgICAgIDwvbGFiZWw+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtZm9yPVwic2l6ZSBvZiBbJ2xnJywgJ21kJywgJ3hzJ11cIiBjbGFzcz1cImZvcm0tZ3JvdXAgbWItM1wiXG4gICAgICAgIHYtc2xvdDpbc2l6ZV1cbiAgICAgICAgOmNsYXNzPVwiJ2MtY29udGVudC1mb250LXNpemUtaGVpZ2h0X18nICsgc2l6ZVwiPlxuICAgICAgICA8U2xpZGVySW5wdXRcbiAgICAgICAgICB2LW1vZGVsPVwib3B0aW9ucy5jb250ZW50X2ZvbnRfc2l6ZVtzaXplIGFzICdsZycgfCAnbWQnIHwgJ3hzJ11cIlxuICAgICAgICAgIDptYXg9XCI1MDBcIlxuICAgICAgICAvPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L1J3ZEdyb3VwPlxuXG4gICAgPCEtLSBDb250ZW50IExpbmUgSGVpZ2h0IC0tPlxuICAgIDxSd2RHcm91cCBjbGFzcy1uYW1lPVwiYy1jb250ZW50LWxpbmUtaGVpZ2h0XCI+XG4gICAgICA8dGVtcGxhdGUgI2xhYmVsPlxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgQ29udGVudCBMaW5lIEhlaWdodFxuICAgICAgICA8L2xhYmVsPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LWZvcj1cInNpemUgb2YgWydsZycsICdtZCcsICd4cyddXCIgY2xhc3M9XCJmb3JtLWdyb3VwIG1iLTNcIlxuICAgICAgICB2LXNsb3Q6W3NpemVdXG4gICAgICAgIDpjbGFzcz1cIidjLWNvbnRlbnQtbGluZS1oZWlnaHRfXycgKyBzaXplXCI+XG4gICAgICAgIDxTbGlkZXJJbnB1dFxuICAgICAgICAgIHYtbW9kZWw9XCJvcHRpb25zLmNvbnRlbnRfbGluZV9oZWlnaHRbc2l6ZSBhcyAnbGcnIHwgJ21kJyB8ICd4cyddXCJcbiAgICAgICAgICA6bWF4PVwiNTAwXCJcbiAgICAgICAgLz5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9Sd2RHcm91cD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl91c2VNb2RlbCIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl92TW9kZWxUZXh0IiwiX29wZW5CbG9jayIsIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVDb21tZW50Vk5vZGUiLCJfY3JlYXRlVk5vZGUiLCJfY3JlYXRlU2xvdHMiLCJfd2l0aEN0eCIsIl9yZW5kZXJMaXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLFVBQU0sVUFBVUEsU0FBNEMsU0FBQSxZQUFtQjtBQUUvRSxxQkFBaUIsU0FBUztBQUFBLE1BQ3hCLFNBQVM7QUFBQSxNQUtULG1CQUFtQjtBQUFBLFFBQ2pCLElBQUk7QUFBQSxRQUNKLElBQUk7QUFBQSxRQUNKLElBQUk7QUFBQSxNQUFBO0FBQUEsTUFFTixxQkFBcUI7QUFBQSxRQUNuQixJQUFJO0FBQUEsUUFDSixJQUFJO0FBQUEsUUFDSixJQUFJO0FBQUEsTUFBQTtBQUFBLElBQ04sQ0FDRDs7Ozs7O0FBTVEsTUFBQSxhQUFBLEVBQUEsT0FBTSxrQkFBQTtBQWFOLE1BQUEsYUFBQSxFQUFB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
