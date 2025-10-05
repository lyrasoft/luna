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
//# sourceMappingURL=ButtonRadio.js.map
