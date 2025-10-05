import { defineComponent, reactive, ref, onMounted, watch, createBlock, openBlock, createSlots, withCtx, createElementVNode, renderSlot, createTextVNode, normalizeClass, renderList, withDirectives, vModelText } from "vue";
import { R as RwdGroup } from "./RwdGroup.js";
import { o as overArg, a as isPrototype, b as arrayLikeKeys, c as isArrayLike, e as baseFor, f as identity, _ as _export_sfc } from "./SliderInput.js";
import { i as isArray } from "./usePageBuilderUtilities.js";
function arrayEach(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var nativeKeys = overArg(Object.keys, Object);
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length, index = -1, iterable = Object(collection);
    while (++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}
var baseEach = createBaseEach(baseForOwn);
function castFunction(value) {
  return typeof value == "function" ? value : identity;
}
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, castFunction(iteratee));
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BoxOffset",
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const offsets = reactive({
      xs: { top: "", right: "", bottom: "", left: "" },
      md: { top: "", right: "", bottom: "", left: "" },
      lg: { top: "", right: "", bottom: "", left: "" }
    });
    const lock = ref(false);
    const currentSize = ref("desktop");
    function getAllValues() {
      const values = {};
      forEach(offsets, (offset, size) => {
        values[size] = `${offset.top},${offset.right},${offset.bottom},${offset.left}`;
      });
      return values;
    }
    function extractValue(value) {
      forEach(value, (offset, size) => {
        const [top, right, bottom, left] = (offset || "").split(",");
        offsets[size] = offsets[size] || { top: "", right: "", bottom: "", left: "" };
        offsets[size].top = top || "";
        offsets[size].right = right || "";
        offsets[size].bottom = bottom || "";
        offsets[size].left = left || "";
      });
    }
    onMounted(() => {
      extractValue(props.modelValue);
      forEach(offsets, (offset, size) => {
        forEach(offset, (value, pos) => {
          watch(() => offsets[size][pos], (v) => {
            if (lock.value) {
              offset.top = v;
              offset.right = v;
              offset.bottom = v;
              offset.left = v;
            }
            const allValue = getAllValues();
            emit("update:modelValue", allValue);
          });
        });
      });
    });
    watch(() => props.modelValue, (value) => {
      extractValue(value);
    });
    const __returned__ = { props, emit, offsets, lock, currentSize, getAllValues, extractValue, RwdGroup };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "mb-2" };
const _hoisted_2 = { class: "form-row row" };
const _hoisted_3 = { class: "col-3" };
const _hoisted_4 = ["onUpdate:modelValue"];
const _hoisted_5 = { class: "col-3" };
const _hoisted_6 = ["onUpdate:modelValue"];
const _hoisted_7 = { class: "col-3" };
const _hoisted_8 = ["onUpdate:modelValue"];
const _hoisted_9 = { class: "col-3" };
const _hoisted_10 = ["onUpdate:modelValue"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock($setup["RwdGroup"], { "class-name": "c-box-offset" }, createSlots({
    label: withCtx(() => [
      createElementVNode("div", _hoisted_1, [
        renderSlot(_ctx.$slots, "label"),
        _cache[1] || (_cache[1] = createTextVNode()),
        createElementVNode("a", {
          href: "javascript://",
          onClick: _cache[0] || (_cache[0] = ($event) => $setup.lock = !$setup.lock)
        }, [
          createElementVNode("span", {
            class: normalizeClass(["fa", [$setup.lock ? "fa-lock" : "fa-lock-open"]])
          }, null, 2)
        ])
      ])
    ]),
    _: 2
  }, [
    renderList(["lg", "md", "xs"], (size) => {
      return {
        name: size,
        fn: withCtx(() => [
          createElementVNode("div", _hoisted_2, [
            createElementVNode("div", _hoisted_3, [
              withDirectives(createElementVNode("input", {
                type: "text",
                class: "form-control",
                placeholder: "Top",
                "onUpdate:modelValue": ($event) => $setup.offsets[size].top = $event
              }, null, 8, _hoisted_4), [
                [vModelText, $setup.offsets[size].top]
              ])
            ]),
            _cache[2] || (_cache[2] = createTextVNode()),
            createElementVNode("div", _hoisted_5, [
              withDirectives(createElementVNode("input", {
                type: "text",
                class: "form-control",
                placeholder: "Right",
                "onUpdate:modelValue": ($event) => $setup.offsets[size].right = $event
              }, null, 8, _hoisted_6), [
                [vModelText, $setup.offsets[size].right]
              ])
            ]),
            _cache[3] || (_cache[3] = createTextVNode()),
            createElementVNode("div", _hoisted_7, [
              withDirectives(createElementVNode("input", {
                type: "text",
                class: "form-control",
                placeholder: "Bottom",
                "onUpdate:modelValue": ($event) => $setup.offsets[size].bottom = $event
              }, null, 8, _hoisted_8), [
                [vModelText, $setup.offsets[size].bottom]
              ])
            ]),
            _cache[4] || (_cache[4] = createTextVNode()),
            createElementVNode("div", _hoisted_9, [
              withDirectives(createElementVNode("input", {
                type: "text",
                class: "form-control",
                placeholder: "Left",
                "onUpdate:modelValue": ($event) => $setup.offsets[size].left = $event
              }, null, 8, _hoisted_10), [
                [vModelText, $setup.offsets[size].left]
              ])
            ])
          ])
        ])
      };
    })
  ]), 1024);
}
const BoxOffset = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "BoxOffset.vue"]]);
export {
  BoxOffset as B,
  keys as k
};
//# sourceMappingURL=BoxOffset.js.map
