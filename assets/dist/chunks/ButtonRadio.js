import { defineComponent, mergeModels, ref, useModel, createElementBlock, openBlock, Fragment, renderList, withDirectives, createTextVNode, createElementVNode, vModelRadio, normalizeClass, toDisplayString } from "vue";
import { uid } from "@windwalker-io/unicorn-next";
import { _ as _export_sfc } from "./SliderInput.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ButtonRadio",
  props: /* @__PURE__ */ mergeModels({
    color: { default: "secondary" },
    size: { default: "lg" },
    options: { default: () => [] }
  }, {
    "modelValue": {
      required: true
    },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const id = ref(uid());
    const value = useModel(__props, "modelValue");
    function updateValue(option) {
      value.value = option.value;
    }
    function buttonColor(option) {
      if (!option.color) {
        return "btn-outline-" + props.color;
      }
      return "btn-" + (option.variant || "outline") + "-" + option.color;
    }
    const __returned__ = { props, emit, id, value, updateValue, buttonColor };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "btn-group" };
const _hoisted_2 = ["id", "name", "value", "checked"];
const _hoisted_3 = ["for", "onChange"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($setup.props.options, (option) => {
      return openBlock(), createElementBlock(Fragment, {
        key: option.value
      }, [
        withDirectives(createElementVNode("input", {
          type: "radio",
          class: "btn-check",
          id: $setup.id + "__" + option.value,
          name: $setup.id,
          value: option.value,
          checked: option.value === $setup.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.value = $event),
          autocomplete: "off"
        }, null, 8, _hoisted_2), [
          [vModelRadio, $setup.value]
        ]),
        _cache[1] || (_cache[1] = createTextVNode()),
        createElementVNode("label", {
          class: normalizeClass(["btn", [$setup.buttonColor(option), `btn-${$setup.props.size}`]]),
          for: $setup.id + "__" + option.value,
          onChange: ($event) => $setup.updateValue(option)
        }, toDisplayString(option.text || option.value), 43, _hoisted_3)
      ], 64);
    }), 128))
  ]);
}
const ButtonRadio = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "ButtonRadio.vue"]]);
export {
  ButtonRadio as B
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uUmFkaW8uanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3BhZ2UtYnVpbGRlci9mb3JtL0J1dHRvblJhZGlvLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IGxhbmc9XCJ0c1wiIHNldHVwPlxuaW1wb3J0IHsgdWlkIH0gZnJvbSAnQHdpbmR3YWxrZXItaW8vdW5pY29ybi1uZXh0JztcbmltcG9ydCB7IHJlZiwgd2F0Y2ggfSBmcm9tICd2dWUnO1xuXG5pbnRlcmZhY2UgT3B0aW9uIHtcbiAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcbiAgdGV4dD86IHN0cmluZztcbiAgY29sb3I/OiBzdHJpbmc7XG4gIHZhcmlhbnQ/OiBzdHJpbmc7XG59XG5cbmNvbnN0IHByb3BzID0gd2l0aERlZmF1bHRzKFxuICBkZWZpbmVQcm9wczx7XG4gICAgY29sb3I/OiBzdHJpbmc7XG4gICAgc2l6ZT86IHN0cmluZztcbiAgICBvcHRpb25zPzogT3B0aW9uW107XG4gIH0+KCksXG4gIHtcbiAgICBjb2xvcjogJ3NlY29uZGFyeScsXG4gICAgc2l6ZTogJ2xnJyxcbiAgICBvcHRpb25zOiAoKSA9PiBbXVxuICB9XG4pO1xuY29uc3QgZW1pdCA9IGRlZmluZUVtaXRzKCk7XG5cbmNvbnN0IGlkID0gcmVmKHVpZCgpKTtcbmNvbnN0IHZhbHVlID0gZGVmaW5lTW9kZWw8c3RyaW5nIHwgbnVtYmVyPih7XG4gIHJlcXVpcmVkOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gdXBkYXRlVmFsdWUob3B0aW9uOiBPcHRpb24pIHtcbiAgdmFsdWUudmFsdWUgPSBvcHRpb24udmFsdWU7XG59XG5cbmZ1bmN0aW9uIGJ1dHRvbkNvbG9yKG9wdGlvbjogT3B0aW9uKSB7XG4gIGlmICghb3B0aW9uLmNvbG9yKSB7XG4gICAgcmV0dXJuICdidG4tb3V0bGluZS0nICsgcHJvcHMuY29sb3I7XG4gIH1cbiAgcmV0dXJuICdidG4tJyArIChvcHRpb24udmFyaWFudCB8fCAnb3V0bGluZScpICsgJy0nICsgb3B0aW9uLmNvbG9yO1xufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxuICAgIDx0ZW1wbGF0ZSB2LWZvcj1cIm9wdGlvbiBvZiBwcm9wcy5vcHRpb25zXCIgOmtleT1cIm9wdGlvbi52YWx1ZVwiPlxuICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGNsYXNzPVwiYnRuLWNoZWNrXCJcbiAgICAgICAgOmlkPVwiaWQgKyAnX18nICsgb3B0aW9uLnZhbHVlXCJcbiAgICAgICAgOm5hbWU9XCJpZFwiXG4gICAgICAgIDp2YWx1ZT1cIm9wdGlvbi52YWx1ZVwiXG4gICAgICAgIDpjaGVja2VkPVwib3B0aW9uLnZhbHVlID09PSB2YWx1ZVwiXG4gICAgICAgIHYtbW9kZWw9XCJ2YWx1ZVwiXG4gICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiPlxuICAgICAgPGxhYmVsIGNsYXNzPVwiYnRuXCIgOmZvcj1cImlkICsgJ19fJyArIG9wdGlvbi52YWx1ZVwiXG4gICAgICAgIEBjaGFuZ2U9XCJ1cGRhdGVWYWx1ZShvcHRpb24pXCJcbiAgICAgICAgOmNsYXNzPVwiWyBidXR0b25Db2xvcihvcHRpb24pLCBgYnRuLSR7cHJvcHMuc2l6ZX1gIF1cIj5cbiAgICAgICAge3sgb3B0aW9uLnRleHQgfHwgb3B0aW9uLnZhbHVlIH19XG4gICAgICA8L2xhYmVsPlxuICAgIDwvdGVtcGxhdGU+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfdXNlTW9kZWwiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9ub3JtYWxpemVDbGFzcyIsIl90b0Rpc3BsYXlTdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVdBLFVBQU0sUUFBUTtBQVlkLFVBQU0sT0FBTztBQUViLFVBQU0sS0FBSyxJQUFJLEtBQUs7QUFDcEIsVUFBTSxRQUFRQSw4QkFFYjtBQUVELGFBQVMsWUFBWSxRQUFnQjtBQUNuQyxZQUFNLFFBQVEsT0FBTztBQUFBLElBQ3ZCO0FBRUEsYUFBUyxZQUFZLFFBQWdCO0FBQ25DLFVBQUksQ0FBQyxPQUFPLE9BQU87QUFDakIsZUFBTyxpQkFBaUIsTUFBTTtBQUFBLE1BQ2hDO0FBQ0EsYUFBTyxVQUFVLE9BQU8sV0FBVyxhQUFhLE1BQU0sT0FBTztBQUFBLElBQy9EOzs7Ozs7QUFJTyxNQUFBLGFBQUEsRUFBQSxPQUFNLFlBQUE7Ozs7QUFBWCxTQUFBQyxVQUFBLEdBQUFDLG1CQWVNLE9BZk4sWUFlTTtBQUFBLEtBQUFELFVBQUEsSUFBQSxHQWRKQyxtQkFhV0MsVUFBQSxNQUFBQyxXQWJnQixPQUFBLE1BQU0sU0FBTyxDQUF2QixXQUFNOzthQUF5QixPQUFPO0FBQUEsTUFBQSxHQUFBO0FBQUEsdUJBQ3JEQyxtQkFNcUIsU0FBQTtBQUFBLFVBTmQsTUFBSztBQUFBLFVBQVEsT0FBTTtBQUFBLFVBQ3ZCLElBQUksT0FBQSxLQUFFLE9BQVUsT0FBTztBQUFBLFVBQ3ZCLE1BQU0sT0FBQTtBQUFBLFVBQ04sT0FBTyxPQUFPO0FBQUEsVUFDZCxTQUFTLE9BQU8sVUFBVSxPQUFBO0FBQUEsVUFBQSx1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQ2xCLE9BQUEsUUFBSztBQUFBLFVBQ2QsY0FBYTtBQUFBLFFBQUEsR0FBQSxNQUFBLEdBQUEsVUFBQSxHQUFBO0FBQUEsd0JBREosT0FBQSxLQUFLO0FBQUEsUUFBQSxDQUFBO0FBQUE7UUFFaEJBLG1CQUlRLFNBQUE7QUFBQSxVQUpELE9BQUtDLGdCQUFDLE9BQUssQ0FFTixtQkFBWSxNQUFNLEdBQUEsT0FBVSxhQUFNLElBQUksRUFBQSxDQUFBLENBQUE7QUFBQSxVQUY5QixLQUFLLE9BQUEsS0FBRSxPQUFVLE9BQU87QUFBQSxVQUN6QyxVQUFNLENBQUEsV0FBRSxPQUFBLFlBQVksTUFBTTtBQUFBLFFBQUEsR0FBQUMsZ0JBRXhCLE9BQU8sUUFBUSxPQUFPLEtBQUssR0FBQSxJQUFBLFVBQUE7QUFBQSxNQUFBLEdBQUEsRUFBQTtBQUFBOzs7OyJ9
