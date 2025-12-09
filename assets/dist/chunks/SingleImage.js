import { watch, getCurrentScope, onScopeDispose, customRef, computed, toValue, getCurrentInstance, onUpdated, onMounted, unref, defineComponent, mergeModels, useModel, ref, resolveDirective, createElementBlock, openBlock, createCommentVNode, createTextVNode, createElementVNode, withDirectives, vModelText, withModifiers } from "vue";
import { route, useSystemUri, useHttpClient, simpleAlert } from "@windwalker-io/unicorn-next";
import { _ as _export_sfc } from "./SliderInput.js";
function computedWithControl(source, fn, options = {}) {
  let v = void 0;
  let track;
  let trigger;
  let dirty = true;
  const update = () => {
    dirty = true;
    trigger();
  };
  watch(source, update, { flush: "sync", ...options });
  const get = typeof fn === "function" ? fn : fn.get;
  const set = typeof fn === "function" ? void 0 : fn.set;
  const result = customRef((_track, _trigger) => {
    track = _track;
    trigger = _trigger;
    return {
      get() {
        if (dirty) {
          v = get(v);
          dirty = false;
        }
        track();
        return v;
      },
      set(v2) {
        set == null ? void 0 : set(v2);
      }
    };
  });
  result.trigger = update;
  return result;
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
const isClient = typeof window !== "undefined" && typeof document !== "undefined";
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const toString = Object.prototype.toString;
const isObject = (val) => toString.call(val) === "[object Object]";
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function watchImmediate(source, cb, options) {
  return watch(
    source,
    cb,
    {
      ...options,
      immediate: true
    }
  );
}
const defaultWindow = isClient ? window : void 0;
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
function useEventListener(...args) {
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options) => {
    el.addEventListener(event, listener, options);
    return () => el.removeEventListener(event, listener, options);
  };
  const firstParamTargets = computed(() => {
    const test = toArray(toValue(args[0])).filter((e) => e != null);
    return test.every((e) => typeof e !== "string") ? test : void 0;
  });
  const stopWatch = watchImmediate(
    () => {
      var _a, _b;
      return [
        (_b = (_a = firstParamTargets.value) == null ? void 0 : _a.map((e) => unrefElement(e))) != null ? _b : [defaultWindow].filter((e) => e != null),
        toArray(toValue(firstParamTargets.value ? args[1] : args[0])),
        toArray(unref(firstParamTargets.value ? args[2] : args[1])),
        // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
        toValue(firstParamTargets.value ? args[3] : args[2])
      ];
    },
    ([raw_targets, raw_events, raw_listeners, raw_options]) => {
      cleanup();
      if (!(raw_targets == null ? void 0 : raw_targets.length) || !(raw_events == null ? void 0 : raw_events.length) || !(raw_listeners == null ? void 0 : raw_listeners.length))
        return;
      const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
      cleanups.push(
        ...raw_targets.flatMap(
          (el) => raw_events.flatMap(
            (event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone))
          )
        )
      );
    },
    { flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(cleanup);
  return stop;
}
function useCurrentElement(rootComponent) {
  const vm = getCurrentInstance();
  const currentElement = computedWithControl(
    () => null,
    () => vm.proxy.$el
  );
  onUpdated(currentElement.trigger);
  onMounted(currentElement.trigger);
  return currentElement;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SingleImage",
  props: /* @__PURE__ */ mergeModels({
    id: {},
    accepted: { default: () => [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg",
      "image/svg+xml",
      "image/avif"
    ] }
  }, {
    "modelValue": {
      required: false,
      default: ""
    },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const url = useModel(__props, "modelValue");
    const loadingImage = ref(route("loading_image"));
    const uploading = ref(false);
    const el = useCurrentElement();
    const accepted = computed(() => props.accepted);
    const uri = useSystemUri();
    onMounted(() => {
      if (!el.value) {
        return;
      }
      el.value.addEventListener("dragover", (event) => {
        event.stopPropagation();
        event.preventDefault();
        el.value.classList.add("c-single-image-uploader--hover");
      });
      el.value.addEventListener("dragleave", (event) => {
        event.stopPropagation();
        event.preventDefault();
        el.value.classList.remove("c-single-image-uploader--hover");
      });
      el.value.addEventListener("drop", (event) => {
        event.stopPropagation();
        event.preventDefault();
        el.value.classList.remove("c-single-image-uploader--hover");
        const files = event.target.files || event.dataTransfer.files;
        uploadFile(files[0]);
      });
    });
    function chooseFile() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = accepted.value.join(",");
      input.style.display = "none";
      input.addEventListener("change", (event) => {
        const files = input.files || event.dataTransfer.files;
        uploadFile(files[0]);
      });
      el.value?.appendChild(input);
      input.click();
      setTimeout(() => {
        input.parentNode?.removeChild(input);
      }, 1e3);
    }
    async function pasteFromButton() {
      try {
        let items = await navigator.clipboard.read();
        const type = items[0].types[1];
        let blob = await items[0].getType(type);
        await uploadFile(new File([blob], "image.png", { type: blob.type }));
      } catch (e) {
        console.warn("Unable to paste this data");
        console.warn(e);
      }
    }
    function pasteFile(event) {
      if (event.clipboardData?.items[0] && event.clipboardData.items[0].kind === "file") {
        event.preventDefault();
        event.stopPropagation();
        const item = event.clipboardData.items[0];
        if (!item) {
          console.error("No paste item");
          return;
        }
        uploadFile(item.getAsFile());
      }
    }
    async function uploadFile(file) {
      if (!checkFile(file)) {
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      uploading.value = true;
      const { post, isAxiosError } = await useHttpClient();
      try {
        let res = await post("@file_upload", formData);
        let fileUrl = res.data.data.url;
        if (fileUrl.includes(uri.root())) {
          fileUrl = fileUrl.substring(uri.root().length);
        }
        url.value = fileUrl;
      } catch (e) {
        if (isAxiosError(e)) {
          simpleAlert(e.message);
        }
        console.error(e);
      } finally {
        uploading.value = false;
      }
    }
    function checkFile(file) {
      if (accepted.value.indexOf(file.type) < 0) {
        alert("Invalid file format");
        return false;
      }
      return true;
    }
    function clearUrl() {
      url.value = "";
    }
    const previewUrl = computed(() => {
      let fileUrl = url.value;
      if (!fileUrl) {
        return fileUrl;
      }
      if (fileUrl.indexOf("http") !== 0 && fileUrl.indexOf("/") !== 0) {
        return uri.root(fileUrl);
      }
      return fileUrl;
    });
    const __returned__ = { props, url, loadingImage, uploading, el, accepted, uri, chooseFile, pasteFromButton, pasteFile, uploadFile, checkFile, clearUrl, previewUrl };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = {
  ref: "el",
  class: "c-single-image-uploader"
};
const _hoisted_2 = {
  key: 0,
  class: "form-group mb-3 c-single-image-preview text-center"
};
const _hoisted_3 = ["src"];
const _hoisted_4 = {
  key: 1,
  class: "c-single-image-placeholder text-center p-4 mb-3 border rounded"
};
const _hoisted_5 = {
  key: 2,
  class: "form-group mb-3 d-flex align-items-center justify-content-center",
  style: { "min-height": "450px" }
};
const _hoisted_6 = { class: "form-group mb-3" };
const _hoisted_7 = { class: "input-group" };
const _hoisted_8 = ["id", "disabled"];
const _hoisted_9 = ["disabled"];
const _hoisted_10 = ["disabled"];
const _hoisted_11 = ["disabled"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_tooltip = resolveDirective("tooltip");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    $setup.url !== "" && !$setup.uploading ? (openBlock(), createElementBlock("div", _hoisted_2, [
      createElementVNode("img", {
        src: $setup.previewUrl,
        alt: "Image",
        class: "img-fluid rounded",
        style: { "max-height": "450px" }
      }, null, 8, _hoisted_3)
    ])) : createCommentVNode("", true),
    _cache[12] || (_cache[12] = createTextVNode()),
    $setup.url === "" && !$setup.uploading ? (openBlock(), createElementBlock("div", _hoisted_4, [..._cache[2] || (_cache[2] = [
      createElementVNode("small", { class: "text-muted" }, "Drag Image Here", -1)
    ])])) : createCommentVNode("", true),
    _cache[13] || (_cache[13] = createTextVNode()),
    $setup.uploading ? (openBlock(), createElementBlock("div", _hoisted_5, [..._cache[3] || (_cache[3] = [
      createElementVNode("div", { class: "spinner-border" }, null, -1)
    ])])) : createCommentVNode("", true),
    _cache[14] || (_cache[14] = createTextVNode()),
    createElementVNode("div", _hoisted_6, [
      createElementVNode("div", _hoisted_7, [
        withDirectives(createElementVNode("input", {
          id: $props.id,
          type: "text",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.url = $event),
          class: "form-control",
          disabled: $setup.uploading,
          onPaste: $setup.pasteFile
        }, null, 40, _hoisted_8), [
          [vModelText, $setup.url]
        ]),
        _cache[7] || (_cache[7] = createTextVNode()),
        createElementVNode("button", {
          type: "button",
          class: "btn btn-primary",
          onClick: _cache[1] || (_cache[1] = ($event) => $setup.chooseFile()),
          disabled: $setup.uploading
        }, [..._cache[4] || (_cache[4] = [
          createElementVNode("i", { class: "fa fa-upload" }, null, -1),
          createTextVNode("\r\n          Upload\r\n        ", -1)
        ])], 8, _hoisted_9),
        _cache[8] || (_cache[8] = createTextVNode()),
        withDirectives((openBlock(), createElementBlock("button", {
          type: "button",
          class: "btn btn-primary",
          onClick: $setup.pasteFromButton,
          disabled: $setup.uploading,
          title: "Paste"
        }, [..._cache[5] || (_cache[5] = [
          createElementVNode("span", { class: "fa fa-paste" }, null, -1)
        ])], 8, _hoisted_10)), [
          [_directive_tooltip]
        ]),
        _cache[9] || (_cache[9] = createTextVNode()),
        $setup.url !== "" ? (openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: "btn btn-primary",
          onClick: withModifiers($setup.clearUrl, ["stop"]),
          disabled: $setup.uploading
        }, [..._cache[6] || (_cache[6] = [
          createElementVNode("span", { class: "fa fa-times" }, null, -1)
        ])], 8, _hoisted_11)) : createCommentVNode("", true)
      ]),
      _cache[10] || (_cache[10] = createTextVNode()),
      _cache[11] || (_cache[11] = createElementVNode("small", { class: "form-text text-muted" }, "\r\n        Paste image url/file or drag and upload image here.\r\n      ", -1))
    ])
  ], 512);
}
const SingleImage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "SingleImage.vue"]]);
export {
  SingleImage as S,
  useEventListener as u
};
//# sourceMappingURL=SingleImage.js.map
