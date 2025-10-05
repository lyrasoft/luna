import { defineComponent, ref, onMounted, createElementBlock, openBlock, normalizeClass, createElementVNode, createTextVNode, renderSlot, createCommentVNode } from "vue";
import { _ as _export_sfc } from "./SliderInput.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RwdGroup",
  props: {
    name: {},
    className: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const currentSize = ref("");
    onMounted(() => {
      setTimeout(() => {
        currentSize.value = "lg";
      }, 150);
    });
    function getClassName(suffix = "") {
      return (props.className ?? "c-rwd-group") + suffix;
    }
    const __returned__ = { props, currentSize, getClassName };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["form-group mb-3", $setup.getClassName()])
  }, [
    createElementVNode("div", {
      class: normalizeClass(["d-flex", $setup.getClassName("__title")])
    }, [
      createElementVNode("div", _hoisted_1, [
        renderSlot(_ctx.$slots, "label")
      ]),
      _cache[8] || (_cache[8] = createTextVNode()),
      createElementVNode("div", {
        class: normalizeClass(["ml-auto ms-auto", $setup.getClassName("__rwd-control")])
      }, [
        createElementVNode("a", {
          href: "javascript://",
          class: normalizeClass([$setup.currentSize === "lg" ? "active" : "text-dark"]),
          onClick: _cache[0] || (_cache[0] = ($event) => $setup.currentSize = "lg")
        }, [..._cache[3] || (_cache[3] = [
          createElementVNode("span", { class: "fa fa-fw fa-desktop" }, null, -1)
        ])], 2),
        _cache[6] || (_cache[6] = createTextVNode()),
        createElementVNode("a", {
          href: "javascript://",
          class: normalizeClass([$setup.currentSize === "md" ? "active" : "text-dark"]),
          onClick: _cache[1] || (_cache[1] = ($event) => $setup.currentSize = "md")
        }, [..._cache[4] || (_cache[4] = [
          createElementVNode("span", { class: "fa fa-fw fa-tablet-screen-button" }, null, -1)
        ])], 2),
        _cache[7] || (_cache[7] = createTextVNode()),
        createElementVNode("a", {
          href: "javascript://",
          class: normalizeClass([$setup.currentSize === "xs" ? "active" : "text-dark"]),
          onClick: _cache[2] || (_cache[2] = ($event) => $setup.currentSize = "xs")
        }, [..._cache[5] || (_cache[5] = [
          createElementVNode("span", { class: "fa fa-fw fa-mobile-screen-button" }, null, -1)
        ])], 2)
      ], 2)
    ], 2),
    _cache[11] || (_cache[11] = createTextVNode()),
    createElementVNode("div", {
      class: normalizeClass($setup.getClassName("__inputs"))
    }, [
      $setup.currentSize === "lg" ? renderSlot(_ctx.$slots, "lg", { key: 0 }) : createCommentVNode("", true),
      _cache[9] || (_cache[9] = createTextVNode()),
      $setup.currentSize === "md" ? renderSlot(_ctx.$slots, "md", { key: 1 }) : createCommentVNode("", true),
      _cache[10] || (_cache[10] = createTextVNode()),
      $setup.currentSize === "xs" ? renderSlot(_ctx.$slots, "xs", { key: 2 }) : createCommentVNode("", true)
    ], 2),
    _cache[12] || (_cache[12] = createTextVNode()),
    renderSlot(_ctx.$slots, "description")
  ], 2);
}
const RwdGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "RwdGroup.vue"]]);
export {
  RwdGroup as R
};
//# sourceMappingURL=RwdGroup.js.map
