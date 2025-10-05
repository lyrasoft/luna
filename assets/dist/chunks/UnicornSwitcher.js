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
//# sourceMappingURL=UnicornSwitcher.js.map
