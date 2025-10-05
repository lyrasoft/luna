import { defineComponent, mergeModels, useModel, createElementBlock, openBlock, createVNode, createTextVNode, createElementVNode, createCommentVNode, createSlots, withCtx, renderList, withDirectives, vModelText } from "vue";
import "@windwalker-io/unicorn-next";
import { u as useAddonDefaults } from "./useAddonDefaults.js";
import { e as SliderInput, _ as _export_sfc } from "./SliderInput.js";
import "bootstrap";
import { R as RwdGroup } from "./RwdGroup.js";
import { U as UnicornSwitcher } from "./UnicornSwitcher.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "addon-emptyspace",
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
        _cache[2] || (_cache[2] = createElementVNode("label", null, "\n          Height\n        ", -1))
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
    _cache[8] || (_cache[8] = createTextVNode()),
    createElementVNode("div", _hoisted_1, [
      _cache[4] || (_cache[4] = createElementVNode("label", { for: "input-addon-edit-link" }, "Link", -1)),
      _cache[5] || (_cache[5] = createTextVNode()),
      withDirectives(createElementVNode("input", {
        id: "input-addon-edit-link",
        type: "url",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.options.link = $event),
        class: "form-control"
      }, null, 512), [
        [vModelText, $setup.options.link]
      ])
    ]),
    _cache[9] || (_cache[9] = createTextVNode()),
    $setup.options.link !== "" ? (openBlock(), createElementBlock("div", _hoisted_2, [
      _cache[6] || (_cache[6] = createElementVNode("label", { for: "input-addon-edit-link-target" }, "Open in New Window", -1)),
      _cache[7] || (_cache[7] = createTextVNode()),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkb24tZW1wdHlzcGFjZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbXBvbmVudHMvcGFnZS1idWlsZGVyL2FkZG9ucy9hZGRvbi1lbXB0eXNwYWNlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiIHNldHVwPlxuaW1wb3J0IHsgQWRkb25Qcm9wcywgdXNlQWRkb25EZWZhdWx0cyB9IGZyb20gJ35sdW5hL2NvbXBvc2FibGVzJztcbmltcG9ydCB7IEFkZG9uT3B0aW9ucywgUndkT3B0aW9ucyB9IGZyb20gJ35sdW5hL3R5cGVzJztcbmltcG9ydCBSd2RHcm91cCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3BhZ2UtYnVpbGRlci9mb3JtL1J3ZEdyb3VwLnZ1ZSc7XG5pbXBvcnQgU2xpZGVySW5wdXQgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9wYWdlLWJ1aWxkZXIvZm9ybS9TbGlkZXJJbnB1dC52dWUnO1xuaW1wb3J0IFVuaWNvcm5Td2l0Y2hlciBmcm9tICcuLi8uLi9mb3JtL1VuaWNvcm5Td2l0Y2hlci52dWUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFkZG9uRW1wdHlTcGFjZU9wdGlvbnMge1xuICBoZWlnaHQ6IFJ3ZE9wdGlvbnM7XG4gIGxpbms6IHN0cmluZztcbiAgbGlua190YXJnZXQ6IHN0cmluZztcbn1cblxuZGVmaW5lUHJvcHM8QWRkb25Qcm9wcz4oKTtcblxuY29uc3Qgb3B0aW9ucyA9IGRlZmluZU1vZGVsPEFkZG9uT3B0aW9ucyAmIEFkZG9uRW1wdHlTcGFjZU9wdGlvbnM+KHsgcmVxdWlyZWQ6IHRydWUgfSk7XG5cbnVzZUFkZG9uRGVmYXVsdHMob3B0aW9ucywge1xuICBoZWlnaHQ6IHtcbiAgICBsZzogJycsXG4gICAgbWQ6ICcnLFxuICAgIHhzOiAnJ1xuICB9LFxuICBsaW5rOiAnJyxcbiAgbGlua190YXJnZXQ6ICcnXG59KTtcbjwvc2NyaXB0PlxuPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDwhLS0gQm9yZGVyIFJhZGl1cyAtLT5cbiAgICA8UndkR3JvdXAgY2xhc3MtbmFtZT1cImMtZW1wdHktaGVpZ2h0XCI+XG4gICAgICA8dGVtcGxhdGUgI2xhYmVsPlxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgSGVpZ2h0XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtZm9yPVwic2l6ZSBvZiBbJ2xnJywgJ21kJywgJ3hzJ11cIiBjbGFzcz1cImZvcm0tZ3JvdXAgbWItM1wiXG4gICAgICAgIHYtc2xvdDpbc2l6ZV1cbiAgICAgICAgOmNsYXNzPVwiJ2MtZW1wdHktaGVpZ2h0X18nICsgc2l6ZVwiPlxuICAgICAgICA8U2xpZGVySW5wdXRcbiAgICAgICAgICB2LW1vZGVsPVwib3B0aW9ucy5oZWlnaHRbc2l6ZV1cIlxuICAgICAgICAgIDptYXg9XCIxMDAwXCJcbiAgICAgICAgLz5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9Sd2RHcm91cD5cblxuICAgIDwhLS0gTElOSyAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCI+XG4gICAgICA8bGFiZWwgZm9yPVwiaW5wdXQtYWRkb24tZWRpdC1saW5rXCI+TGluazwvbGFiZWw+XG4gICAgICA8aW5wdXQgaWQ9XCJpbnB1dC1hZGRvbi1lZGl0LWxpbmtcIiB0eXBlPVwidXJsXCJcbiAgICAgICAgdi1tb2RlbD1cIm9wdGlvbnMubGlua1wiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgLz5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gTmV3IFdpbmRvdyAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCIgdi1pZj1cIm9wdGlvbnMubGluayAhPT0gJydcIj5cbiAgICAgIDxsYWJlbCBmb3I9XCJpbnB1dC1hZGRvbi1lZGl0LWxpbmstdGFyZ2V0XCI+T3BlbiBpbiBOZXcgV2luZG93PC9sYWJlbD5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxVbmljb3JuU3dpdGNoZXIgbmFtZT1cImFkZG9uLWVkaXQtbGluay10YXJnZXRcIlxuICAgICAgICAgIHYtbW9kZWw9XCJvcHRpb25zLmxpbmtfdGFyZ2V0XCJcbiAgICAgICAgICBpZD1cImlucHV0LWFkZG9uLWVkaXQtbGluay10YXJnZXRcIlxuICAgICAgICAgIHNoYXBlPVwiY2lyY2xlXCJcbiAgICAgICAgICBjb2xvcj1cInN1Y2Nlc3NcIlxuICAgICAgICAgIHRydWUtdmFsdWU9XCJfYmxhbmtcIlxuICAgICAgICAgIGZhbHNlLXZhbHVlPVwiXCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX3VzZU1vZGVsIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVWTm9kZSIsIl9jcmVhdGVTbG90cyIsIl93aXRoQ3R4IiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9yZW5kZXJMaXN0IiwiX2NyZWF0ZVRleHRWTm9kZSIsIl92TW9kZWxUZXh0IiwiX29wZW5CbG9jayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsVUFBTSxVQUFVQSxTQUFrRCxTQUFBLFlBQW1CO0FBRXJGLHFCQUFpQixTQUFTO0FBQUEsTUFDeEIsUUFBUTtBQUFBLFFBQ04sSUFBSTtBQUFBLFFBQ0osSUFBSTtBQUFBLFFBQ0osSUFBSTtBQUFBLE1BQUE7QUFBQSxNQUVOLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxJQUFBLENBQ2Q7Ozs7OztBQXNCUSxNQUFBLGFBQUEsRUFBQSxPQUFNLGtCQUFBOzs7RUFPTixPQUFNOzs7c0JBMUJiQyxtQkF1Q00sT0FBQSxNQUFBO0FBQUEsSUFyQ0pDLFlBY1csT0FBQSxVQUFBLEdBQUEsRUFkRCxjQUFXLGlCQUFBLEdBQWdCQyxZQUFBO0FBQUEsTUFDeEIsT0FBS0MsUUFDZCxNQUVRO0FBQUEsUUFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFGUkMsbUJBRVEsZUFGRCxnQ0FFUCxFQUFBO0FBQUEsTUFBQSxDQUFBO0FBQUE7O01BRXVCQyxXQUFBLENBQUEsTUFBQSxNQUFBLElBQUEsR0FBa0IsQ0FBMUIsU0FBSTs7VUFDWixNQUFBO0FBQUEsVUFBQSxJQUFBRixRQUVQLE1BR0U7QUFBQSxZQUhGRixZQUdFLE9BQUEsYUFBQSxHQUFBO0FBQUEsY0FBQSxZQUZTLE9BQUEsUUFBUSxPQUFPLElBQUk7QUFBQSxjQUFBLHVCQUFBLENBQUEsV0FBbkIsT0FBQSxRQUFRLE9BQU8sSUFBSSxJQUFBO0FBQUEsY0FDM0IsS0FBSztBQUFBLFlBQUEsR0FBQSxNQUFBLEdBQUEsQ0FBQSxjQUFBLHFCQUFBLENBQUE7QUFBQTs7Ozs7SUFNWkcsbUJBSU0sT0FKTixZQUlNO0FBQUEsTUFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFISkEsbUJBQStDLFNBQUEsRUFBeEMsS0FBSSx3QkFBQSxHQUF3QixRQUFJLEVBQUE7QUFBQSxNQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBRSxnQkFBQTtBQUFBLHFCQUN2Q0YsbUJBQ2dELFNBQUE7QUFBQSxRQUR6QyxJQUFHO0FBQUEsUUFBd0IsTUFBSztBQUFBLFFBQUEsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxXQUM1QixlQUFRLE9BQUk7QUFBQSxRQUFFLE9BQU07QUFBQSxNQUFBLEdBQUEsTUFBQSxHQUFBLEdBQUE7QUFBQSxRQUFwQixDQUFBRyxZQUFBLE9BQUEsUUFBUSxJQUFJO0FBQUEsTUFBQSxDQUFBO0FBQUE7O0lBSVUsT0FBQSxRQUFRLFNBQUksTUFBQUMsVUFBQSxHQUEvQ1IsbUJBWU0sT0FaTixZQVlNO0FBQUEsTUFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFYSkksbUJBQW9FLFNBQUEsRUFBN0QsS0FBSSwrQkFBQSxHQUErQixzQkFBa0IsRUFBQTtBQUFBLE1BQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUFFLGdCQUFBO0FBQUEsTUFDNURGLG1CQVNNLE9BQUEsTUFBQTtBQUFBLFFBUkpILFlBT0UsT0FBQSxpQkFBQSxHQUFBO0FBQUEsVUFQZSxNQUFLO0FBQUEsVUFBQSxZQUNYLE9BQUEsUUFBUTtBQUFBLFVBQUEsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFSLGVBQVEsY0FBVztBQUFBLFVBQzVCLElBQUc7QUFBQSxVQUNILE9BQU07QUFBQSxVQUNOLE9BQU07QUFBQSxVQUNOLGNBQVc7QUFBQSxVQUNYLGVBQVk7QUFBQSxRQUFBLEdBQUEsTUFBQSxHQUFBLENBQUEsWUFBQSxDQUFBO0FBQUE7Ozs7OyJ9
