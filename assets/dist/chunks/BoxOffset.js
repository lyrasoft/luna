import { defineComponent, reactive, ref, onMounted, watch, createBlock, openBlock, createSlots, withCtx, createElementVNode, renderSlot, createTextVNode, normalizeClass, renderList, withDirectives, vModelText } from "vue";
import { R as RwdGroup } from "./RwdGroup.js";
import { o as overArg, g as isPrototype, h as arrayLikeKeys, j as isArrayLike, k as baseFor, l as identity, a as isArray, _ as _export_sfc } from "./SliderInput.js";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm94T2Zmc2V0LmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcnJheUVhY2guanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19uYXRpdmVLZXlzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUtleXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2tleXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlRm9yT3duLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY3JlYXRlQmFzZUVhY2guanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlRWFjaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Nhc3RGdW5jdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvZm9yRWFjaC5qcyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL3BhZ2UtYnVpbGRlci9mb3JtL0JveE9mZnNldC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcnJheUVhY2g7XG4iLCJpbXBvcnQgb3ZlckFyZyBmcm9tICcuL19vdmVyQXJnLmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBvdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBuYXRpdmVLZXlzO1xuIiwiaW1wb3J0IGlzUHJvdG90eXBlIGZyb20gJy4vX2lzUHJvdG90eXBlLmpzJztcbmltcG9ydCBuYXRpdmVLZXlzIGZyb20gJy4vX25hdGl2ZUtleXMuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghaXNQcm90b3R5cGUob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYga2V5ICE9ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VLZXlzO1xuIiwiaW1wb3J0IGFycmF5TGlrZUtleXMgZnJvbSAnLi9fYXJyYXlMaWtlS2V5cy5qcyc7XG5pbXBvcnQgYmFzZUtleXMgZnJvbSAnLi9fYmFzZUtleXMuanMnO1xuaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQga2V5cztcbiIsImltcG9ydCBiYXNlRm9yIGZyb20gJy4vX2Jhc2VGb3IuanMnO1xuaW1wb3J0IGtleXMgZnJvbSAnLi9rZXlzLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JPd25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9yT3duKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIG9iamVjdCAmJiBiYXNlRm9yKG9iamVjdCwgaXRlcmF0ZWUsIGtleXMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlRm9yT3duO1xuIiwiaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBgYmFzZUVhY2hgIG9yIGBiYXNlRWFjaFJpZ2h0YCBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZWFjaEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciBhIGNvbGxlY3Rpb24uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VFYWNoKGVhY2hGdW5jLCBmcm9tUmlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gICAgaWYgKGNvbGxlY3Rpb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgfVxuICAgIGlmICghaXNBcnJheUxpa2UoY29sbGVjdGlvbikpIHtcbiAgICAgIHJldHVybiBlYWNoRnVuYyhjb2xsZWN0aW9uLCBpdGVyYXRlZSk7XG4gICAgfVxuICAgIHZhciBsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aCxcbiAgICAgICAgaW5kZXggPSBmcm9tUmlnaHQgPyBsZW5ndGggOiAtMSxcbiAgICAgICAgaXRlcmFibGUgPSBPYmplY3QoY29sbGVjdGlvbik7XG5cbiAgICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2luZGV4XSwgaW5kZXgsIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVCYXNlRWFjaDtcbiIsImltcG9ydCBiYXNlRm9yT3duIGZyb20gJy4vX2Jhc2VGb3JPd24uanMnO1xuaW1wb3J0IGNyZWF0ZUJhc2VFYWNoIGZyb20gJy4vX2NyZWF0ZUJhc2VFYWNoLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JFYWNoYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAqL1xudmFyIGJhc2VFYWNoID0gY3JlYXRlQmFzZUVhY2goYmFzZUZvck93bik7XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VFYWNoO1xuIiwiaW1wb3J0IGlkZW50aXR5IGZyb20gJy4vaWRlbnRpdHkuanMnO1xuXG4vKipcbiAqIENhc3RzIGB2YWx1ZWAgdG8gYGlkZW50aXR5YCBpZiBpdCdzIG5vdCBhIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGNhc3QgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNhc3RGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicgPyB2YWx1ZSA6IGlkZW50aXR5O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjYXN0RnVuY3Rpb247XG4iLCJpbXBvcnQgYXJyYXlFYWNoIGZyb20gJy4vX2FycmF5RWFjaC5qcyc7XG5pbXBvcnQgYmFzZUVhY2ggZnJvbSAnLi9fYmFzZUVhY2guanMnO1xuaW1wb3J0IGNhc3RGdW5jdGlvbiBmcm9tICcuL19jYXN0RnVuY3Rpb24uanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIGVsZW1lbnRzIG9mIGBjb2xsZWN0aW9uYCBhbmQgaW52b2tlcyBgaXRlcmF0ZWVgIGZvciBlYWNoIGVsZW1lbnQuXG4gKiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czogKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICogSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqICoqTm90ZToqKiBBcyB3aXRoIG90aGVyIFwiQ29sbGVjdGlvbnNcIiBtZXRob2RzLCBvYmplY3RzIHdpdGggYSBcImxlbmd0aFwiXG4gKiBwcm9wZXJ0eSBhcmUgaXRlcmF0ZWQgbGlrZSBhcnJheXMuIFRvIGF2b2lkIHRoaXMgYmVoYXZpb3IgdXNlIGBfLmZvckluYFxuICogb3IgYF8uZm9yT3duYCBmb3Igb2JqZWN0IGl0ZXJhdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAYWxpYXMgZWFjaFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fE9iamVjdH0gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKiBAc2VlIF8uZm9yRWFjaFJpZ2h0XG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZm9yRWFjaChbMSwgMl0sIGZ1bmN0aW9uKHZhbHVlKSB7XG4gKiAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAqIH0pO1xuICogLy8gPT4gTG9ncyBgMWAgdGhlbiBgMmAuXG4gKlxuICogXy5mb3JFYWNoKHsgJ2EnOiAxLCAnYic6IDIgfSwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICogICBjb25zb2xlLmxvZyhrZXkpO1xuICogfSk7XG4gKiAvLyA9PiBMb2dzICdhJyB0aGVuICdiJyAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKS5cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICB2YXIgZnVuYyA9IGlzQXJyYXkoY29sbGVjdGlvbikgPyBhcnJheUVhY2ggOiBiYXNlRWFjaDtcbiAgcmV0dXJuIGZ1bmMoY29sbGVjdGlvbiwgY2FzdEZ1bmN0aW9uKGl0ZXJhdGVlKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvckVhY2g7XG4iLCI8c2NyaXB0IGxhbmc9XCJ0c1wiIHNldHVwPlxuaW1wb3J0IHsgcmVmLCByZWFjdGl2ZSwgd2F0Y2gsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgUndkR3JvdXAgZnJvbSBcIi4vUndkR3JvdXAudnVlXCI7XG5pbXBvcnQgeyBlYWNoIH0gZnJvbSAnbG9kYXNoLWVzJztcblxuLy8gVG9kbzogTXVzdCByZXdyaXRlIHRoaXNcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wczx7IG1vZGVsVmFsdWU6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gfT4oKTtcbmNvbnN0IGVtaXQgPSBkZWZpbmVFbWl0cyhbJ3VwZGF0ZTptb2RlbFZhbHVlJ10pO1xuXG5jb25zdCBvZmZzZXRzID0gcmVhY3RpdmUoe1xuICB4czogeyB0b3A6ICcnLCByaWdodDogJycsIGJvdHRvbTogJycsIGxlZnQ6ICcnIH0sXG4gIG1kOiB7IHRvcDogJycsIHJpZ2h0OiAnJywgYm90dG9tOiAnJywgbGVmdDogJycgfSxcbiAgbGc6IHsgdG9wOiAnJywgcmlnaHQ6ICcnLCBib3R0b206ICcnLCBsZWZ0OiAnJyB9XG59KTtcbmNvbnN0IGxvY2sgPSByZWYoZmFsc2UpO1xuY29uc3QgY3VycmVudFNpemUgPSByZWYoJ2Rlc2t0b3AnKTtcblxuZnVuY3Rpb24gZ2V0QWxsVmFsdWVzKCkge1xuICBjb25zdCB2YWx1ZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgZWFjaChvZmZzZXRzLCAob2Zmc2V0LCBzaXplKSA9PiB7XG4gICAgdmFsdWVzW3NpemVdID0gYCR7b2Zmc2V0LnRvcH0sJHtvZmZzZXQucmlnaHR9LCR7b2Zmc2V0LmJvdHRvbX0sJHtvZmZzZXQubGVmdH1gO1xuICB9KTtcbiAgcmV0dXJuIHZhbHVlcztcbn1cblxuZnVuY3Rpb24gZXh0cmFjdFZhbHVlKHZhbHVlOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KSB7XG4gIGVhY2godmFsdWUsIChvZmZzZXQsIHNpemUpID0+IHtcbiAgICBjb25zdCBbdG9wLCByaWdodCwgYm90dG9tLCBsZWZ0XSA9IChvZmZzZXQgfHwgJycpLnNwbGl0KCcsJyk7XG4gICAgb2Zmc2V0c1tzaXplXSA9IG9mZnNldHNbc2l6ZV0gfHwgeyB0b3A6ICcnLCByaWdodDogJycsIGJvdHRvbTogJycsIGxlZnQ6ICcnIH07XG4gICAgb2Zmc2V0c1tzaXplXS50b3AgPSB0b3AgfHwgJyc7XG4gICAgb2Zmc2V0c1tzaXplXS5yaWdodCA9IHJpZ2h0IHx8ICcnO1xuICAgIG9mZnNldHNbc2l6ZV0uYm90dG9tID0gYm90dG9tIHx8ICcnO1xuICAgIG9mZnNldHNbc2l6ZV0ubGVmdCA9IGxlZnQgfHwgJyc7XG4gIH0pO1xufVxuXG5vbk1vdW50ZWQoKCkgPT4ge1xuICBleHRyYWN0VmFsdWUocHJvcHMubW9kZWxWYWx1ZSk7XG5cbiAgZWFjaChvZmZzZXRzLCAob2Zmc2V0LCBzaXplKSA9PiB7XG4gICAgZWFjaChvZmZzZXQsICh2YWx1ZSwgcG9zKSA9PiB7XG4gICAgICB3YXRjaCgoKSA9PiBvZmZzZXRzW3NpemVdW3Bvc10sICh2KSA9PiB7XG4gICAgICAgIGlmIChsb2NrLnZhbHVlKSB7XG4gICAgICAgICAgb2Zmc2V0LnRvcCA9IHY7XG4gICAgICAgICAgb2Zmc2V0LnJpZ2h0ID0gdjtcbiAgICAgICAgICBvZmZzZXQuYm90dG9tID0gdjtcbiAgICAgICAgICBvZmZzZXQubGVmdCA9IHY7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWxsVmFsdWUgPSBnZXRBbGxWYWx1ZXMoKTtcbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBhbGxWYWx1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59KTtcblxud2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgKHZhbHVlKSA9PiB7XG4gIGV4dHJhY3RWYWx1ZSh2YWx1ZSk7XG59KTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxSd2RHcm91cCBjbGFzcy1uYW1lPVwiYy1ib3gtb2Zmc2V0XCI+XG4gICAgPHRlbXBsYXRlICNsYWJlbD5cbiAgICAgIDxkaXYgY2xhc3M9XCJtYi0yXCI+XG4gICAgICAgIDxzbG90IG5hbWU9XCJsYWJlbFwiPjwvc2xvdD5cbiAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6Ly9cIiBAY2xpY2s9XCJsb2NrID0gIWxvY2tcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhXCIgOmNsYXNzPVwiW2xvY2sgPyAnZmEtbG9jaycgOiAnZmEtbG9jay1vcGVuJ11cIj48L3NwYW4+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvZGl2PlxuICAgIDwvdGVtcGxhdGU+XG4gICAgPHRlbXBsYXRlIHYtZm9yPVwic2l6ZSBvZiBbJ2xnJywgJ21kJywgJ3hzJ11cIlxuICAgICAgdi1zbG90OltzaXplXVxuICAgICAgY2xhc3M9XCJmb3JtLWdyb3VwIG1iLTNcIlxuICAgICAgOmNsYXNzPVwiJ2MtYm94LW9mZnNldF9fJyArIHNpemVcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvdyByb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIlRvcFwiIHYtbW9kZWw9XCJvZmZzZXRzW3NpemVdLnRvcFwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiUmlnaHRcIiB2LW1vZGVsPVwib2Zmc2V0c1tzaXplXS5yaWdodFwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTNcIj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiQm90dG9tXCIgdi1tb2RlbD1cIm9mZnNldHNbc2l6ZV0uYm90dG9tXCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtM1wiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJMZWZ0XCIgdi1tb2RlbD1cIm9mZnNldHNbc2l6ZV0ubGVmdFwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC90ZW1wbGF0ZT5cbiAgPC9Sd2RHcm91cD5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiZWFjaCIsIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVTbG90cyIsIl93aXRoQ3R4IiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9yZW5kZXJTbG90IiwiX2NyZWF0ZVRleHRWTm9kZSIsIl9ub3JtYWxpemVDbGFzcyIsIl9yZW5kZXJMaXN0IiwiX3dpdGhEaXJlY3RpdmVzIl0sIm1hcHBpbmdzIjoiOzs7QUFTQSxTQUFTLFVBQVUsT0FBTyxVQUFVO0FBQ2xDLE1BQUksUUFBUSxJQUNSLFNBQVMsU0FBUyxPQUFPLElBQUksTUFBTTtBQUV2QyxTQUFPLEVBQUUsUUFBUSxRQUFRO0FBQ3ZC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
