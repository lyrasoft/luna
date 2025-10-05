import { defineComponent, mergeModels, ref, useModel, createElementBlock, openBlock, normalizeClass, createElementVNode, createTextVNode } from "vue";
import { _ as _export_sfc } from "./SliderInput.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UnicornSwitcher",
  props: /* @__PURE__ */ mergeModels({
    id: {},
    classes: {},
    name: {},
    disabled: { type: Boolean },
    trueValue: { type: [Boolean, String, Number], default: "1" },
    falseValue: { type: [Boolean, String, Number], default: "0" },
    size: { default: "default" },
    color: { default: "primary" },
    shape: { default: "square" }
  }, {
    "modelValue": {
      required: true
    },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["click"], ["update:modelValue"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    function getDashedName(name) {
      return name.replace(/\[/g, "-").replace(/]/g, "");
    }
    const emit = __emit;
    const idName = ref(props.id || "");
    const currentValue = useModel(__props, "modelValue");
    if (!idName.value) {
      if (props.name) {
        idName.value = "input-" + getDashedName(props.name);
      } else {
        idName.value = "input-switch-" + u.uid();
      }
    }
    function changed($event) {
      const target = $event.target;
      currentValue.value = target.checked ? props.trueValue : props.falseValue;
    }
    function click($event) {
      emit("click", $event);
    }
    const __returned__ = { props, getDashedName, emit, idName, currentValue, changed, click };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = ["for"];
const _hoisted_2 = ["id", "name", "value", "disabled"];
const _hoisted_3 = ["name", "id", "true-value", "false-value", "disabled", "value", "checked"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("label", {
    class: normalizeClass(["unicorn-switch", [$props.size ? "switch-" + $props.size : ""]]),
    for: $setup.idName
  }, [
    createElementVNode("input", {
      id: $setup.idName + "-unchecked",
      name: $props.name,
      type: "hidden",
      value: $props.falseValue,
      disabled: $props.disabled
    }, null, 8, _hoisted_2),
    _cache[0] || (_cache[0] = createTextVNode()),
    createElementVNode("input", {
      type: "checkbox",
      name: $props.name,
      id: $setup.idName,
      class: normalizeClass(["", $props.classes]),
      "true-value": $props.trueValue,
      "false-value": $props.falseValue,
      disabled: $props.disabled,
      value: $props.trueValue,
      checked: $setup.currentValue == $props.trueValue,
      onChange: $setup.changed,
      onClick: $setup.click
    }, null, 42, _hoisted_3),
    _cache[1] || (_cache[1] = createTextVNode()),
    createElementVNode("span", {
      class: normalizeClass(["switch-slider", ["slider-" + $props.shape, $props.color ? "btn-" + $props.color : "btn-default"]])
    }, null, 2)
  ], 10, _hoisted_1);
}
const UnicornSwitcher = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "UnicornSwitcher.vue"]]);
export {
  UnicornSwitcher as U
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5pY29yblN3aXRjaGVyLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tcG9uZW50cy9mb3JtL1VuaWNvcm5Td2l0Y2hlci52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIiBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSc7XG5cbmNvbnN0IHByb3BzID0gd2l0aERlZmF1bHRzKFxuICBkZWZpbmVQcm9wczx7XG4gICAgaWQ/OiBzdHJpbmc7XG4gICAgY2xhc3Nlcz86IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgICB0cnVlVmFsdWU/OiBib29sZWFuIHwgc3RyaW5nIHwgbnVtYmVyO1xuICAgIGZhbHNlVmFsdWU/OiBib29sZWFuIHwgc3RyaW5nIHwgbnVtYmVyO1xuICAgIHNpemU/OiBzdHJpbmc7XG4gICAgY29sb3I/OiBzdHJpbmc7XG4gICAgc2hhcGU/OiBzdHJpbmc7XG4gIH0+KCksIHtcbiAgICB0cnVlVmFsdWU6ICcxJyxcbiAgICBmYWxzZVZhbHVlOiAnMCcsXG4gICAgc2l6ZTogJ2RlZmF1bHQnLFxuICAgIGNvbG9yOiAncHJpbWFyeScsXG4gICAgc2hhcGU6ICdzcXVhcmUnXG4gIH1cbik7XG5cbmZ1bmN0aW9uIGdldERhc2hlZE5hbWUobmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiBuYW1lLnJlcGxhY2UoL1xcWy9nLCAnLScpLnJlcGxhY2UoL10vZywgJycpO1xufVxuXG5jb25zdCBlbWl0ID0gZGVmaW5lRW1pdHM8e1xuICBjbGljazogKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB2b2lkO1xufT4oKTtcblxuY29uc3QgaWROYW1lID0gcmVmKHByb3BzLmlkIHx8ICcnKTtcbmNvbnN0IGN1cnJlbnRWYWx1ZSA9IGRlZmluZU1vZGVsPGFueT4oe1xuICByZXF1aXJlZDogdHJ1ZSxcbn0pO1xuXG5pZiAoIWlkTmFtZS52YWx1ZSkge1xuICBpZiAocHJvcHMubmFtZSkge1xuICAgIGlkTmFtZS52YWx1ZSA9ICdpbnB1dC0nICsgZ2V0RGFzaGVkTmFtZShwcm9wcy5uYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBpZE5hbWUudmFsdWUgPSAnaW5wdXQtc3dpdGNoLScgKyB1LnVpZCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNoYW5nZWQoJGV2ZW50OiBFdmVudCkge1xuICBjb25zdCB0YXJnZXQgPSAkZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgY3VycmVudFZhbHVlLnZhbHVlID0gdGFyZ2V0LmNoZWNrZWQgPyBwcm9wcy50cnVlVmFsdWUgOiBwcm9wcy5mYWxzZVZhbHVlO1xufVxuXG5mdW5jdGlvbiBjbGljaygkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgZW1pdCgnY2xpY2snLCAkZXZlbnQpO1xufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGxhYmVsIGNsYXNzPVwidW5pY29ybi1zd2l0Y2hcIiA6Zm9yPVwiaWROYW1lXCIgOmNsYXNzPVwiW3NpemUgPyAnc3dpdGNoLScgKyBzaXplIDogJyddXCI+XG4gICAgPGlucHV0IDppZD1cImlkTmFtZSArICctdW5jaGVja2VkJ1wiIDpuYW1lPVwibmFtZVwiIHR5cGU9XCJoaWRkZW5cIlxuICAgICAgOnZhbHVlPVwiZmFsc2VWYWx1ZVwiXG4gICAgICA6ZGlzYWJsZWQ9XCJkaXNhYmxlZFwiXG4gICAgLz5cbiAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgOm5hbWU9XCJuYW1lXCIgOmlkPVwiaWROYW1lXCIgY2xhc3M9XCJcIiA6Y2xhc3M9XCJjbGFzc2VzXCJcbiAgICAgIDp0cnVlLXZhbHVlPVwidHJ1ZVZhbHVlXCJcbiAgICAgIDpmYWxzZS12YWx1ZT1cImZhbHNlVmFsdWVcIlxuICAgICAgOmRpc2FibGVkPVwiZGlzYWJsZWRcIlxuICAgICAgOnZhbHVlPVwidHJ1ZVZhbHVlXCJcbiAgICAgIDpjaGVja2VkPVwiY3VycmVudFZhbHVlID09IHRydWVWYWx1ZVwiXG4gICAgICBAY2hhbmdlPVwiY2hhbmdlZFwiXG4gICAgICBAY2xpY2s9XCJjbGlja1wiXG4gICAgPlxuICAgIDxzcGFuXG4gICAgICBjbGFzcz1cInN3aXRjaC1zbGlkZXJcIlxuICAgICAgOmNsYXNzPVwiWydzbGlkZXItJyArIHNoYXBlLCBjb2xvciA/ICdidG4tJyArIGNvbG9yIDogJ2J0bi1kZWZhdWx0J11cIlxuICAgID48L3NwYW4+XG4gIDwvbGFiZWw+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl91c2VNb2RlbCIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfbm9ybWFsaXplQ2xhc3MiLCJfY3JlYXRlRWxlbWVudFZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLFVBQU0sUUFBUTtBQW9CZCxhQUFTLGNBQWMsTUFBYztBQUNuQyxhQUFPLEtBQUssUUFBUSxPQUFPLEdBQUcsRUFBRSxRQUFRLE1BQU0sRUFBRTtBQUFBLElBQ2xEO0FBRUEsVUFBTSxPQUFPO0FBSWIsVUFBTSxTQUFTLElBQUksTUFBTSxNQUFNLEVBQUU7QUFDakMsVUFBTSxlQUFlQSxTQUFnQixTQUFBLFlBRXBDO0FBRUQsUUFBSSxDQUFDLE9BQU8sT0FBTztBQUNqQixVQUFJLE1BQU0sTUFBTTtBQUNkLGVBQU8sUUFBUSxXQUFXLGNBQWMsTUFBTSxJQUFJO0FBQUEsTUFDcEQsT0FBTztBQUNMLGVBQU8sUUFBUSxrQkFBa0IsRUFBRSxJQUFBO0FBQUEsTUFDckM7QUFBQSxJQUNGO0FBRUEsYUFBUyxRQUFRLFFBQWU7QUFDOUIsWUFBTSxTQUFTLE9BQU87QUFFdEIsbUJBQWEsUUFBUSxPQUFPLFVBQVUsTUFBTSxZQUFZLE1BQU07QUFBQSxJQUNoRTtBQUVBLGFBQVMsTUFBTSxRQUFvQjtBQUNqQyxXQUFLLFNBQVMsTUFBTTtBQUFBLElBQ3RCOzs7Ozs7Ozs7O3NCQUlFQyxtQkFrQlEsU0FBQTtBQUFBLElBbEJELE9BQUtDLGVBQUEsQ0FBQyxrQkFBZ0IsQ0FBd0IsT0FBQSxPQUFJLFlBQWUsT0FBQSxPQUFJLEVBQUEsQ0FBQSxDQUFBO0FBQUEsSUFBN0MsS0FBSyxPQUFBO0FBQUEsRUFBQSxHQUFBO0FBQUEsSUFDbENDLG1CQUdFLFNBQUE7QUFBQSxNQUhNLElBQUksT0FBQSxTQUFNO0FBQUEsTUFBa0IsTUFBTSxPQUFBO0FBQUEsTUFBTSxNQUFLO0FBQUEsTUFDbEQsT0FBTyxPQUFBO0FBQUEsTUFDUCxVQUFVLE9BQUE7QUFBQSxJQUFBLEdBQUEsTUFBQSxHQUFBLFVBQUE7QUFBQTtJQUViQSxtQkFRQyxTQUFBO0FBQUEsTUFSTSxNQUFLO0FBQUEsTUFBWSxNQUFNLE9BQUE7QUFBQSxNQUFPLElBQUksT0FBQTtBQUFBLE1BQVEsT0FBS0QsZUFBQSxDQUFDLElBQVcsT0FBQSxPQUFPLENBQUE7QUFBQSxNQUN0RSxjQUFZLE9BQUE7QUFBQSxNQUNaLGVBQWEsT0FBQTtBQUFBLE1BQ2IsVUFBVSxPQUFBO0FBQUEsTUFDVixPQUFPLE9BQUE7QUFBQSxNQUNQLFNBQVMsT0FBQSxnQkFBZ0IsT0FBQTtBQUFBLE1BQ3pCLFVBQVEsT0FBQTtBQUFBLE1BQ1IsU0FBTyxPQUFBO0FBQUEsSUFBQSxHQUFBLE1BQUEsSUFBQSxVQUFBO0FBQUE7SUFFVkMsbUJBR1EsUUFBQTtBQUFBLE1BRk4sT0FBS0QsZUFBQSxDQUFDLGlCQUFlLGFBQ0EsT0FBQSxPQUFPLE9BQUEsUUFBSyxTQUFZLE9BQUEsUUFBSyxhQUFBLENBQUEsQ0FBQTtBQUFBLElBQUEsR0FBQSxNQUFBLENBQUE7QUFBQTs7OyJ9
