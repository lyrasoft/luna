import { injectCssToDocument, useUnicorn, deleteConfirm, simpleAlert, simpleConfirm, uid, sleep, useHttpClient, data, selectAll, useSystemUri, route, useTinymce, useCssImport, isDebug, useImport, domready } from "@windwalker-io/unicorn-next";
import { effectScope, getCurrentScope, onScopeDispose, watch, isRef, toValue, toRef as toRef$1, readonly, ref, customRef, computed, unref, shallowRef, getCurrentInstance as getCurrentInstance$1, onMounted, inject, provide, defineComponent, h, Teleport, useId as useId$1, onUnmounted, watchEffect, useSlots, createBlock, openBlock, resolveDynamicComponent, normalizeClass, withCtx, createElementBlock, createCommentVNode, renderSlot, createTextVNode, toDisplayString, useAttrs, mergeProps, mergeModels, useTemplateRef, useModel, Fragment, createVNode, nextTick, onBeforeUnmount, Transition, withDirectives, createElementVNode, withModifiers, normalizeProps, guardReactiveProps, vShow, normalizeStyle, renderList, TransitionGroup, createSlots, vModelSelect, vModelText, resolveDirective, reactive, createApp, defineAsyncComponent } from "vue";
import { u as useEventListener$1, S as SingleImage } from "./SingleImage.js";
import { VueDraggable } from "vue-draggable-plus";
import { a as arrayMap, t as toFinite, u as usePageBuilderUtilities } from "./usePageBuilderUtilities.js";
import { Tooltip } from "bootstrap";
import { i as isIterateeCall, _ as _export_sfc, S as SliderInput, d as defaultsDeep } from "./SliderInput.js";
import { k as keys, B as BoxOffset } from "./BoxOffset.js";
import { B as ButtonRadio } from "./ButtonRadio.js";
import { C as ColorInput, R as RwdTitleOptions } from "./RwdTitleOptions.js";
import { U as UnicornSwitcher } from "./UnicornSwitcher.js";
import { R as RwdGroup } from "./RwdGroup.js";
import { useLoading } from "@lyrasoft/ts-toolkit/vue";
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}
function values(object) {
  return object == null ? [] : baseValues(object, keys(object));
}
var nativeCeil = Math.ceil, nativeMax = Math.max;
function baseRange(start, end, step, fromRight) {
  var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length);
  while (length--) {
    result[++index] = start;
    start += step;
  }
  return result;
}
function createRange(fromRight) {
  return function(start, end, step) {
    if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
      end = step = void 0;
    }
    start = toFinite(start);
    if (end === void 0) {
      end = start;
      start = 0;
    } else {
      end = toFinite(end);
    }
    step = step === void 0 ? start < end ? 1 : -1 : toFinite(step);
    return baseRange(start, end, step);
  };
}
var range = createRange();
const CodeMirrorOptions = {
  tabSize: 2,
  mode: "text/x-scss",
  styleActiveLine: true,
  theme: "material",
  lineNumbers: true,
  line: true,
  height: "450px",
  autoCloseBrackets: true
};
async function useCodeMirror() {
  const { default: CodeMirror } = await import("./codemirror.js").then((n) => n.c);
  await Promise.all([
    import("./css.js").then((n) => n.c),
    import("./closebrackets.js").then((n) => n.c),
    import("./codemirror2.js").then((m) => injectCssToDocument(m.default)),
    import("./material.js").then((m) => injectCssToDocument(m.default))
  ]);
  return { CodeMirror, CodeMirrorOptions };
}
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
const genericBvnPrefix = "BootstrapVueNext__";
const withBvnPrefix = (value, suffix = "") => {
  const suffixWithTrail = `${suffix}___`;
  return `${genericBvnPrefix}ID__${value}__${suffix ? suffixWithTrail : ""}`;
};
const createBvnInjectionKey = (name) => withBvnPrefix(name);
const createBvnRegistryInjectionKey = (name) => withBvnPrefix(`${name}__registry`);
const collapseInjectionKey = createBvnInjectionKey("collapse");
const showHideRegistryKey = createBvnRegistryInjectionKey("showHide");
const navbarInjectionKey = createBvnInjectionKey("navbar");
const rtlRegistryKey = createBvnRegistryInjectionKey("rtl");
const breadcrumbGlobalIndexKey = `${genericBvnPrefix}global_breadcrumb`;
const breadcrumbRegistryKey = createBvnRegistryInjectionKey("breadcrumb");
const modalManagerKey = createBvnRegistryInjectionKey("modalManager");
const defaultsKey = createBvnRegistryInjectionKey("defaults");
const orchestratorRegistryKey = createBvnRegistryInjectionKey("orchestrator");
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
// @__NO_SIDE_EFFECTS__
function createSharedComposable(composable) {
  let subscribers = 0;
  let state;
  let scope;
  const dispose = () => {
    subscribers -= 1;
    if (scope && subscribers <= 0) {
      scope.stop();
      state = void 0;
      scope = void 0;
    }
  };
  return (...args) => {
    subscribers += 1;
    if (!scope) {
      scope = effectScope(true);
      state = scope.run(() => composable(...args));
    }
    tryOnScopeDispose(dispose);
    return state;
  };
}
const isClient = typeof window !== "undefined" && typeof document !== "undefined";
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const notNullish = (val) => val != null;
const toString = Object.prototype.toString;
const isObject$1 = (val) => toString.call(val) === "[object Object]";
const noop = () => {
};
const isIOS = /* @__PURE__ */ getIsIOS();
function getIsIOS() {
  var _a, _b;
  return isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function toRef(...args) {
  if (args.length !== 1)
    return toRef$1(...args);
  const r = args[0];
  return typeof r === "function" ? readonly(customRef(() => ({ get: r, set: noop }))) : ref(r);
}
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
function throttleFilter(...args) {
  let lastExec = 0;
  let timer;
  let isLeading = true;
  let lastRejector = noop;
  let lastValue;
  let ms;
  let trailing;
  let leading;
  let rejectOnCancel;
  if (!isRef(args[0]) && typeof args[0] === "object")
    ({ delay: ms, trailing = true, leading = true, rejectOnCancel = false } = args[0]);
  else
    [ms, trailing = true, leading = true, rejectOnCancel = false] = args;
  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
      lastRejector();
      lastRejector = noop;
    }
  };
  const filter = (_invoke) => {
    const duration = toValue(ms);
    const elapsed = Date.now() - lastExec;
    const invoke = () => {
      return lastValue = _invoke();
    };
    clear();
    if (duration <= 0) {
      lastExec = Date.now();
      return invoke();
    }
    if (elapsed > duration && (leading || !isLeading)) {
      lastExec = Date.now();
      invoke();
    } else if (trailing) {
      lastValue = new Promise((resolve, reject) => {
        lastRejector = rejectOnCancel ? reject : resolve;
        timer = setTimeout(() => {
          lastExec = Date.now();
          isLeading = true;
          resolve(invoke());
          clear();
        }, Math.max(0, duration - elapsed));
      });
    }
    if (!leading && !timer)
      timer = setTimeout(() => isLeading = true, duration);
    isLeading = false;
    return lastValue;
  };
  return filter;
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
// @__NO_SIDE_EFFECTS__
function useThrottleFn(fn, ms = 200, trailing = false, leading = true, rejectOnCancel = false) {
  return createFilterWrapper(
    throttleFilter(ms, trailing, leading, rejectOnCancel),
    fn
  );
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
      const optionsClone = isObject$1(raw_options) ? { ...raw_options } : raw_options;
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
// @__NO_SIDE_EFFECTS__
function useMounted() {
  const isMounted = shallowRef(false);
  const instance = getCurrentInstance$1();
  if (instance) {
    onMounted(() => {
      isMounted.value = true;
    }, instance);
  }
  return isMounted;
}
// @__NO_SIDE_EFFECTS__
function useSupported(callback) {
  const isMounted = /* @__PURE__ */ useMounted();
  return computed(() => {
    isMounted.value;
    return Boolean(callback());
  });
}
function useMutationObserver(target, callback, options = {}) {
  const { window: window2 = defaultWindow, ...mutationOptions } = options;
  let observer;
  const isSupported = /* @__PURE__ */ useSupported(() => window2 && "MutationObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const targets = computed(() => {
    const value = toValue(target);
    const items = toArray(value).map(unrefElement).filter(notNullish);
    return new Set(items);
  });
  const stopWatch = watch(
    () => targets.value,
    (targets2) => {
      cleanup();
      if (isSupported.value && targets2.size) {
        observer = new MutationObserver(callback);
        targets2.forEach((el) => observer.observe(el, mutationOptions));
      }
    },
    { immediate: true, flush: "post" }
  );
  const takeRecords = () => {
    return observer == null ? void 0 : observer.takeRecords();
  };
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop,
    takeRecords
  };
}
function createKeyPredicate(keyFilter) {
  if (typeof keyFilter === "function")
    return keyFilter;
  else if (typeof keyFilter === "string")
    return (event) => event.key === keyFilter;
  else if (Array.isArray(keyFilter))
    return (event) => keyFilter.includes(event.key);
  return () => true;
}
function onKeyStroke(...args) {
  let key;
  let handler;
  let options = {};
  if (args.length === 3) {
    key = args[0];
    handler = args[1];
    options = args[2];
  } else if (args.length === 2) {
    if (typeof args[1] === "object") {
      key = true;
      handler = args[0];
      options = args[1];
    } else {
      key = args[0];
      handler = args[1];
    }
  } else {
    key = true;
    handler = args[0];
  }
  const {
    target = defaultWindow,
    eventName = "keydown",
    passive = false,
    dedupe = false
  } = options;
  const predicate = createKeyPredicate(key);
  const listener = (e) => {
    if (e.repeat && toValue(dedupe))
      return;
    if (predicate(e))
      handler(e);
  };
  return useEventListener(target, eventName, listener, passive);
}
const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
const handlers = /* @__PURE__ */ getHandlers();
function getHandlers() {
  if (!(globalKey in _global))
    _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
function getSSRHandler(key, fallback) {
  return handlers[key] || fallback;
}
function resolveElement(el) {
  if (typeof Window !== "undefined" && el instanceof Window)
    return el.document.documentElement;
  if (typeof Document !== "undefined" && el instanceof Document)
    return el.documentElement;
  return el;
}
function checkOverflowScroll(ele) {
  const style = window.getComputedStyle(ele);
  if (style.overflowX === "scroll" || style.overflowY === "scroll" || style.overflowX === "auto" && ele.clientWidth < ele.scrollWidth || style.overflowY === "auto" && ele.clientHeight < ele.scrollHeight) {
    return true;
  } else {
    const parent = ele.parentNode;
    if (!parent || parent.tagName === "BODY")
      return false;
    return checkOverflowScroll(parent);
  }
}
function preventDefault(rawEvent) {
  const e = rawEvent || window.event;
  const _target = e.target;
  if (checkOverflowScroll(_target))
    return false;
  if (e.touches.length > 1)
    return true;
  if (e.preventDefault)
    e.preventDefault();
  return false;
}
const elInitialOverflow = /* @__PURE__ */ new WeakMap();
function useScrollLock$1(element, initialState = false) {
  const isLocked = shallowRef(initialState);
  let stopTouchMoveListener = null;
  let initialOverflow = "";
  watch(toRef(element), (el) => {
    const target = resolveElement(toValue(el));
    if (target) {
      const ele = target;
      if (!elInitialOverflow.get(ele))
        elInitialOverflow.set(ele, ele.style.overflow);
      if (ele.style.overflow !== "hidden")
        initialOverflow = ele.style.overflow;
      if (ele.style.overflow === "hidden")
        return isLocked.value = true;
      if (isLocked.value)
        return ele.style.overflow = "hidden";
    }
  }, {
    immediate: true
  });
  const lock = () => {
    const el = resolveElement(toValue(element));
    if (!el || isLocked.value)
      return;
    if (isIOS) {
      stopTouchMoveListener = useEventListener(
        el,
        "touchmove",
        (e) => {
          preventDefault(e);
        },
        { passive: false }
      );
    }
    el.style.overflow = "hidden";
    isLocked.value = true;
  };
  const unlock = () => {
    const el = resolveElement(toValue(element));
    if (!el || !isLocked.value)
      return;
    if (isIOS)
      stopTouchMoveListener == null ? void 0 : stopTouchMoveListener();
    el.style.overflow = initialOverflow;
    elInitialOverflow.delete(el);
    isLocked.value = false;
  };
  tryOnScopeDispose(unlock);
  return computed({
    get() {
      return isLocked.value;
    },
    set(v) {
      if (v)
        lock();
      else unlock();
    }
  });
}
const _newOrchestratorRegistry = () => ({
  store: ref([]),
  _isOrchestratorInstalled: ref(false),
  _isToastAppend: ref(false)
});
const useOrchestratorRegistry = () => {
  const orchestratorRegistry = inject(orchestratorRegistryKey, void 0);
  if (orchestratorRegistry) {
    return orchestratorRegistry;
  }
  const newOrchestratorRegistry = _newOrchestratorRegistry();
  provide(orchestratorRegistryKey, newOrchestratorRegistry);
  return newOrchestratorRegistry;
};
const componentsWithExternalPath = {
  BAccordion: "/components/BAccordion",
  BAccordionItem: "/components/BAccordion",
  BAlert: "/components/BAlert",
  BApp: "/components/BApp",
  BAvatar: "/components/BAvatar",
  BAvatarGroup: "/components/BAvatar",
  BBadge: "/components/BBadge",
  BBreadcrumb: "/components/BBreadcrumb",
  BBreadcrumbItem: "/components/BBreadcrumb",
  BButton: "/components/BButton",
  BButtonGroup: "/components/BButton",
  BButtonToolbar: "/components/BButton",
  BCloseButton: "/components/BButton",
  BCard: "/components/BCard",
  BCardBody: "/components/BCard",
  BCardFooter: "/components/BCard",
  BCardGroup: "/components/BCard",
  BCardHeader: "/components/BCard",
  BCardImg: "/components/BCard",
  BCardSubtitle: "/components/BCard",
  BCardText: "/components/BCard",
  BCardTitle: "/components/BCard",
  BCarousel: "/components/BCarousel",
  BCarouselSlide: "/components/BCarousel",
  BCol: "/components/BContainer",
  BCollapse: "/components/BCollapse",
  BContainer: "/components/BContainer",
  BDropdown: "/components/BDropdown",
  BDropdownDivider: "/components/BDropdown",
  BDropdownForm: "/components/BDropdown",
  BDropdownGroup: "/components/BDropdown",
  BDropdownHeader: "/components/BDropdown",
  BDropdownItem: "/components/BDropdown",
  BDropdownItemButton: "/components/BDropdown",
  BDropdownText: "/components/BDropdown",
  BForm: "/components/BForm",
  BFormCheckbox: "/components/BFormCheckbox",
  BFormCheckboxGroup: "/components/BFormCheckbox",
  BFormDatalist: "/components/BForm",
  BFormFile: "/components/BFormFile",
  BFormFloatingLabel: "/components/BForm",
  BFormGroup: "/components/BFormGroup",
  BFormInput: "/components/BFormInput",
  BFormInvalidFeedback: "/components/BForm",
  BFormRadio: "/components/BFormRadio",
  BFormRadioGroup: "/components/BFormRadio",
  BFormRating: "/components/BFormRating",
  BFormRow: "/components/BForm",
  BFormSelect: "/components/BFormSelect",
  BFormSelectOption: "/components/BFormSelect",
  BFormSelectOptionGroup: "/components/BFormSelect",
  BFormSpinbutton: "/components/BFormSpinbutton",
  BFormTag: "/components/BFormTags",
  BFormTags: "/components/BFormTags",
  BFormText: "/components/BForm",
  BFormTextarea: "/components/BFormTextarea",
  BFormValidFeedback: "/components/BForm",
  BImg: "/components/BImg",
  BInput: "/components/BFormInput",
  BInputGroup: "/components/BInputGroup",
  BInputGroupText: "/components/BInputGroup",
  BListGroup: "/components/BListGroup",
  BListGroupItem: "/components/BListGroup",
  BModal: "/components/BModal",
  BModalOrchestrator: "/components/BModal",
  BNav: "/components/BNav",
  BNavForm: "/components/BNav",
  BNavItem: "/components/BNav",
  BNavItemDropdown: "/components/BNav",
  BNavText: "/components/BNav",
  BNavbar: "/components/BNavbar",
  BNavbarBrand: "/components/BNavbar",
  BNavbarNav: "/components/BNavbar",
  BNavbarToggle: "/components/BNavbar",
  BOffcanvas: "/components/BOffcanvas",
  BOverlay: "/components/BOverlay",
  BOrchestrator: "/components/BApp",
  BPagination: "/components/BPagination",
  BPlaceholder: "/components/BPlaceholder",
  BPlaceholderButton: "/components/BPlaceholder",
  BPlaceholderCard: "/components/BPlaceholder",
  BPlaceholderTable: "/components/BPlaceholder",
  BPlaceholderWrapper: "/components/BPlaceholder",
  BPopover: "/components/BPopover",
  BProgress: "/components/BProgress",
  BRow: "/components/BContainer",
  BSpinner: "/components/BSpinner",
  BTab: "/components/BTabs",
  BTabs: "/components/BTabs",
  BToast: "/components/BToast",
  BToastOrchestrator: "/components/BToast",
  BTooltip: "/components/BTooltip",
  BLink: "/components/BLink",
  BProgressBar: "/components/BProgress",
  BTableSimple: "/components/BTable",
  BTableLite: "/components/BTable",
  BTable: "/components/BTable",
  BTbody: "/components/BTable",
  BTd: "/components/BTable",
  BTh: "/components/BTable",
  BThead: "/components/BTable",
  BTfoot: "/components/BTable",
  BTr: "/components/BTable",
  BPopoverOrchestrator: "/components/BPopover"
};
const componentNames = Object.freeze(
  Object.keys(componentsWithExternalPath)
);
const directivesWithExternalPath = {
  vBColorMode: "/directives/BColorMode",
  vBModal: "/directives/BModal",
  vBPopover: "/directives/BPopover",
  vBScrollspy: "/directives/BScrollspy",
  vBToggle: "/directives/BToggle",
  vBTooltip: "/directives/BTooltip"
};
const directiveNames = Object.freeze(
  Object.keys(directivesWithExternalPath)
);
const composablesWithExternalPath = {
  useBreadcrumb: "/composables/useBreadcrumb",
  useColorMode: "/composables/useColorMode",
  useModal: "/composables/useModal",
  useModalController: "/composables/useModal",
  useScrollLock: "/composables/useScrollLock",
  useScrollspy: "/composables/useScrollspy",
  useToast: "/composables/useToast",
  useToastController: "/composables/useToast",
  useToggle: "/composables/useToggle",
  usePopover: "/composables/usePopover",
  usePopoverController: "/composables/usePopover",
  useRegistry: "/composables/useRegistry",
  useProvideDefaults: "/composables/useProvideDefaults",
  useOrchestratorRegistry: "/composables/orchestratorShared"
};
Object.freeze(
  Object.keys(composablesWithExternalPath)
);
const _sfc_main$i = defineComponent({
  name: "ConditionalTeleport",
  inheritAttrs: false,
  props: {
    to: {
      type: [String, Object],
      default: null
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },
  slots: Object,
  setup(props, { slots }) {
    return () => !props.to ? slots.default?.({}) : h(Teleport, { to: props.to, disabled: props.disabled || !props.to }, [slots.default?.({})]);
  }
});
defineComponent({
  name: "ConditionalWrapper",
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: "div"
    },
    skip: {
      type: Boolean,
      required: true
    }
  },
  slots: Object,
  setup(props, { slots, attrs }) {
    return () => props.skip ? slots.default?.({}) : h(props.tag, { ...attrs }, [slots.default?.({})]);
  }
});
var candidateSelectors = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"];
var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
  var _element$getRootNode;
  return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
  return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
var isInert = function isInert2(node, lookUp) {
  var _node$getAttribute;
  if (lookUp === void 0) {
    lookUp = true;
  }
  var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
  var inert = inertAtt === "" || inertAtt === "true";
  var result = inert || lookUp && node && isInert2(node.parentNode);
  return result;
};
var isContentEditable = function isContentEditable2(node) {
  var _node$getAttribute2;
  var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
  return attValue === "" || attValue === "true";
};
var getCandidates = function getCandidates2(el, includeContainer, filter) {
  if (isInert(el)) {
    return [];
  }
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};
var getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (isInert(element, false)) {
      continue;
    }
    if (element.tagName === "SLOT") {
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively2(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scopeParent: element,
          candidates: nestedCandidates
        });
      }
    } else {
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }
      var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
      typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
      var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
      if (shadowRoot && validShadowRoot) {
        var _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};
var hasTabIndex = function hasTabIndex2(node) {
  return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
};
var getTabIndex = function getTabIndex2(node) {
  if (!node) {
    throw new Error("No node provided");
  }
  if (node.tabIndex < 0) {
    if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
      return 0;
    }
  }
  return node.tabIndex;
};
var getSortOrderTabIndex = function getSortOrderTabIndex2(node, isScope) {
  var tabIndex = getTabIndex(node);
  if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
    return 0;
  }
  return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput2(node) {
  return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary2(node) {
  var r = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
    return child.tagName === "SUMMARY";
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios2(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio2(node) {
  return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isNodeAttached = function isNodeAttached2(node) {
  var _nodeRoot;
  var nodeRoot = node && getRootNode(node);
  var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
  var attached = false;
  if (nodeRoot && nodeRoot !== node) {
    var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
    attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
    while (!attached && nodeRootHost) {
      var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
      nodeRoot = getRootNode(nodeRootHost);
      nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
      attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
    }
  }
  return attached;
};
var isZeroArea = function isZeroArea2(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden2(node, _ref) {
  var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
  if (getComputedStyle(node).visibility === "hidden") {
    return true;
  }
  var isDirectSummary = matches.call(node, "details>summary:first-of-type");
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
    return true;
  }
  if (!displayCheck || displayCheck === "full" || displayCheck === "legacy-full") {
    if (typeof getShadowRoot === "function") {
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          node = rootNode.host;
        } else {
          node = parentElement;
        }
      }
      node = originalNode;
    }
    if (isNodeAttached(node)) {
      return !node.getClientRects().length;
    }
    if (displayCheck !== "legacy-full") {
      return true;
    }
  } else if (displayCheck === "non-zero-area") {
    return isZeroArea(node);
  }
  return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          if (child.tagName === "LEGEND") {
            return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
          }
        }
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (node.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  isInert(node) || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  return false;
};
var sortByOrder = function sortByOrder2(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function(item, i) {
    var isScope = !!item.scopeParent;
    var element = isScope ? item.scopeParent : item;
    var candidateTabindex = getSortOrderTabIndex(element, isScope);
    var elements = isScope ? sortByOrder2(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item,
        isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
var focusable = function focusable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }
  return candidates;
};
var isTabbable = function isTabbable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = /* @__PURE__ */ candidateSelectors.concat("iframe").join(",");
var isFocusable = function isFocusable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorFocusable(options, node);
};
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
var activeFocusTraps = {
  activateTrap: function activateTrap(trapStack, trap) {
    if (trapStack.length > 0) {
      var activeTrap = trapStack[trapStack.length - 1];
      if (activeTrap !== trap) {
        activeTrap._setPausedState(true);
      }
    }
    var trapIndex = trapStack.indexOf(trap);
    if (trapIndex === -1) {
      trapStack.push(trap);
    } else {
      trapStack.splice(trapIndex, 1);
      trapStack.push(trap);
    }
  },
  deactivateTrap: function deactivateTrap(trapStack, trap) {
    var trapIndex = trapStack.indexOf(trap);
    if (trapIndex !== -1) {
      trapStack.splice(trapIndex, 1);
    }
    if (trapStack.length > 0 && !trapStack[trapStack.length - 1]._isManuallyPaused()) {
      trapStack[trapStack.length - 1]._setPausedState(false);
    }
  }
};
var isSelectableInput = function isSelectableInput2(node) {
  return node.tagName && node.tagName.toLowerCase() === "input" && typeof node.select === "function";
};
var isEscapeEvent = function isEscapeEvent2(e) {
  return (e === null || e === void 0 ? void 0 : e.key) === "Escape" || (e === null || e === void 0 ? void 0 : e.key) === "Esc" || (e === null || e === void 0 ? void 0 : e.keyCode) === 27;
};
var isTabEvent = function isTabEvent2(e) {
  return (e === null || e === void 0 ? void 0 : e.key) === "Tab" || (e === null || e === void 0 ? void 0 : e.keyCode) === 9;
};
var isKeyForward = function isKeyForward2(e) {
  return isTabEvent(e) && !e.shiftKey;
};
var isKeyBackward = function isKeyBackward2(e) {
  return isTabEvent(e) && e.shiftKey;
};
var delay = function delay2(fn) {
  return setTimeout(fn, 0);
};
var valueOrHandler = function valueOrHandler2(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }
  return typeof value === "function" ? value.apply(void 0, params) : value;
};
var getActualTarget = function getActualTarget2(event) {
  return event.target.shadowRoot && typeof event.composedPath === "function" ? event.composedPath()[0] : event.target;
};
var internalTrapStack = [];
var createFocusTrap = function createFocusTrap2(elements, userOptions) {
  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;
  var trapStack = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.trapStack) || internalTrapStack;
  var config = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true,
    isKeyForward,
    isKeyBackward
  }, userOptions);
  var state = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   posTabIndexesFound: boolean,
    //   firstTabbableNode: HTMLElement|undefined,
    //   lastTabbableNode: HTMLElement|undefined,
    //   firstDomTabbableNode: HTMLElement|undefined,
    //   lastDomTabbableNode: HTMLElement|undefined,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    manuallyPaused: false,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: void 0
  };
  var trap;
  var getOption = function getOption2(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== void 0 ? configOverrideOptions[optionName] : config[configOptionName || optionName];
  };
  var findContainerIndex = function findContainerIndex2(element, event) {
    var composedPath = typeof (event === null || event === void 0 ? void 0 : event.composedPath) === "function" ? event.composedPath() : void 0;
    return state.containerGroups.findIndex(function(_ref) {
      var container = _ref.container, tabbableNodes = _ref.tabbableNodes;
      return container.contains(element) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (composedPath === null || composedPath === void 0 ? void 0 : composedPath.includes(container)) || tabbableNodes.find(function(node) {
        return node === element;
      });
    });
  };
  var getNodeForOption = function getNodeForOption2(optionName) {
    var _ref2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref2$hasFallback = _ref2.hasFallback, hasFallback = _ref2$hasFallback === void 0 ? false : _ref2$hasFallback, _ref2$params = _ref2.params, params = _ref2$params === void 0 ? [] : _ref2$params;
    var optionValue = config[optionName];
    if (typeof optionValue === "function") {
      optionValue = optionValue.apply(void 0, _toConsumableArray(params));
    }
    if (optionValue === true) {
      optionValue = void 0;
    }
    if (!optionValue) {
      if (optionValue === void 0 || optionValue === false) {
        return optionValue;
      }
      throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
    }
    var node = optionValue;
    if (typeof optionValue === "string") {
      try {
        node = doc.querySelector(optionValue);
      } catch (err) {
        throw new Error("`".concat(optionName, '` appears to be an invalid selector; error="').concat(err.message, '"'));
      }
      if (!node) {
        if (!hasFallback) {
          throw new Error("`".concat(optionName, "` as selector refers to no known node"));
        }
      }
    }
    return node;
  };
  var getInitialFocusNode = function getInitialFocusNode2() {
    var node = getNodeForOption("initialFocus", {
      hasFallback: true
    });
    if (node === false) {
      return false;
    }
    if (node === void 0 || node && !isFocusable(node, config.tabbableOptions)) {
      if (findContainerIndex(doc.activeElement) >= 0) {
        node = doc.activeElement;
      } else {
        var firstTabbableGroup = state.tabbableGroups[0];
        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;
        node = firstTabbableNode || getNodeForOption("fallbackFocus");
      }
    } else if (node === null) {
      node = getNodeForOption("fallbackFocus");
    }
    if (!node) {
      throw new Error("Your focus-trap needs to have at least one focusable element");
    }
    return node;
  };
  var updateTabbableNodes = function updateTabbableNodes2() {
    state.containerGroups = state.containers.map(function(container) {
      var tabbableNodes = tabbable(container, config.tabbableOptions);
      var focusableNodes = focusable(container, config.tabbableOptions);
      var firstTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[0] : void 0;
      var lastTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : void 0;
      var firstDomTabbableNode = focusableNodes.find(function(node) {
        return isTabbable(node);
      });
      var lastDomTabbableNode = focusableNodes.slice().reverse().find(function(node) {
        return isTabbable(node);
      });
      var posTabIndexesFound = !!tabbableNodes.find(function(node) {
        return getTabIndex(node) > 0;
      });
      return {
        container,
        tabbableNodes,
        focusableNodes,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function nextTabbableNode(node) {
          var forward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          var nodeIdx = tabbableNodes.indexOf(node);
          if (nodeIdx < 0) {
            if (forward) {
              return focusableNodes.slice(focusableNodes.indexOf(node) + 1).find(function(el) {
                return isTabbable(el);
              });
            }
            return focusableNodes.slice(0, focusableNodes.indexOf(node)).reverse().find(function(el) {
              return isTabbable(el);
            });
          }
          return tabbableNodes[nodeIdx + (forward ? 1 : -1)];
        }
      };
    });
    state.tabbableGroups = state.containerGroups.filter(function(group) {
      return group.tabbableNodes.length > 0;
    });
    if (state.tabbableGroups.length <= 0 && !getNodeForOption("fallbackFocus")) {
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    }
    if (state.containerGroups.find(function(g) {
      return g.posTabIndexesFound;
    }) && state.containerGroups.length > 1) {
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
    }
  };
  var _getActiveElement = function getActiveElement(el) {
    var activeElement = el.activeElement;
    if (!activeElement) {
      return;
    }
    if (activeElement.shadowRoot && activeElement.shadowRoot.activeElement !== null) {
      return _getActiveElement(activeElement.shadowRoot);
    }
    return activeElement;
  };
  var _tryFocus = function tryFocus(node) {
    if (node === false) {
      return;
    }
    if (node === _getActiveElement(document)) {
      return;
    }
    if (!node || !node.focus) {
      _tryFocus(getInitialFocusNode());
      return;
    }
    node.focus({
      preventScroll: !!config.preventScroll
    });
    state.mostRecentlyFocusedNode = node;
    if (isSelectableInput(node)) {
      node.select();
    }
  };
  var getReturnFocusNode = function getReturnFocusNode2(previousActiveElement) {
    var node = getNodeForOption("setReturnFocus", {
      params: [previousActiveElement]
    });
    return node ? node : node === false ? false : previousActiveElement;
  };
  var findNextNavNode = function findNextNavNode2(_ref3) {
    var target = _ref3.target, event = _ref3.event, _ref3$isBackward = _ref3.isBackward, isBackward = _ref3$isBackward === void 0 ? false : _ref3$isBackward;
    target = target || getActualTarget(event);
    updateTabbableNodes();
    var destinationNode = null;
    if (state.tabbableGroups.length > 0) {
      var containerIndex = findContainerIndex(target, event);
      var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : void 0;
      if (containerIndex < 0) {
        if (isBackward) {
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (isBackward) {
        var startOfGroupIndex = state.tabbableGroups.findIndex(function(_ref4) {
          var firstTabbableNode = _ref4.firstTabbableNode;
          return target === firstTabbableNode;
        });
        if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
          startOfGroupIndex = containerIndex;
        }
        if (startOfGroupIndex >= 0) {
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = getTabIndex(target) >= 0 ? destinationGroup.lastTabbableNode : destinationGroup.lastDomTabbableNode;
        } else if (!isTabEvent(event)) {
          destinationNode = containerGroup.nextTabbableNode(target, false);
        }
      } else {
        var lastOfGroupIndex = state.tabbableGroups.findIndex(function(_ref5) {
          var lastTabbableNode = _ref5.lastTabbableNode;
          return target === lastTabbableNode;
        });
        if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
          lastOfGroupIndex = containerIndex;
        }
        if (lastOfGroupIndex >= 0) {
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = getTabIndex(target) >= 0 ? _destinationGroup.firstTabbableNode : _destinationGroup.firstDomTabbableNode;
        } else if (!isTabEvent(event)) {
          destinationNode = containerGroup.nextTabbableNode(target);
        }
      }
    } else {
      destinationNode = getNodeForOption("fallbackFocus");
    }
    return destinationNode;
  };
  var checkPointerDown = function checkPointerDown2(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target, e) >= 0) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      trap.deactivate({
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked (and if not focusable, to "nothing"); by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node), whether the
        //  outside click was on a focusable node or not
        returnFocus: config.returnFocusOnDeactivate
      });
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
  };
  var checkFocusIn = function checkFocusIn2(event) {
    var target = getActualTarget(event);
    var targetContained = findContainerIndex(target, event) >= 0;
    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target;
      }
    } else {
      event.stopImmediatePropagation();
      var nextNode;
      var navAcrossContainers = true;
      if (state.mostRecentlyFocusedNode) {
        if (getTabIndex(state.mostRecentlyFocusedNode) > 0) {
          var mruContainerIdx = findContainerIndex(state.mostRecentlyFocusedNode);
          var tabbableNodes = state.containerGroups[mruContainerIdx].tabbableNodes;
          if (tabbableNodes.length > 0) {
            var mruTabIdx = tabbableNodes.findIndex(function(node) {
              return node === state.mostRecentlyFocusedNode;
            });
            if (mruTabIdx >= 0) {
              if (config.isKeyForward(state.recentNavEvent)) {
                if (mruTabIdx + 1 < tabbableNodes.length) {
                  nextNode = tabbableNodes[mruTabIdx + 1];
                  navAcrossContainers = false;
                }
              } else {
                if (mruTabIdx - 1 >= 0) {
                  nextNode = tabbableNodes[mruTabIdx - 1];
                  navAcrossContainers = false;
                }
              }
            }
          }
        } else {
          if (!state.containerGroups.some(function(g) {
            return g.tabbableNodes.some(function(n) {
              return getTabIndex(n) > 0;
            });
          })) {
            navAcrossContainers = false;
          }
        }
      } else {
        navAcrossContainers = false;
      }
      if (navAcrossContainers) {
        nextNode = findNextNavNode({
          // move FROM the MRU node, not event-related node (which will be the node that is
          //  outside the trap causing the focus escape we're trying to fix)
          target: state.mostRecentlyFocusedNode,
          isBackward: config.isKeyBackward(state.recentNavEvent)
        });
      }
      if (nextNode) {
        _tryFocus(nextNode);
      } else {
        _tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
      }
    }
    state.recentNavEvent = void 0;
  };
  var checkKeyNav = function checkKeyNav2(event) {
    var isBackward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    state.recentNavEvent = event;
    var destinationNode = findNextNavNode({
      event,
      isBackward
    });
    if (destinationNode) {
      if (isTabEvent(event)) {
        event.preventDefault();
      }
      _tryFocus(destinationNode);
    }
  };
  var checkTabKey = function checkTabKey2(event) {
    if (config.isKeyForward(event) || config.isKeyBackward(event)) {
      checkKeyNav(event, config.isKeyBackward(event));
    }
  };
  var checkEscapeKey = function checkEscapeKey2(event) {
    if (isEscapeEvent(event) && valueOrHandler(config.escapeDeactivates, event) !== false) {
      event.preventDefault();
      trap.deactivate();
    }
  };
  var checkClick = function checkClick2(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target, e) >= 0) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
  };
  var addListeners = function addListeners2() {
    if (!state.active) {
      return;
    }
    activeFocusTraps.activateTrap(trapStack, trap);
    state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function() {
      _tryFocus(getInitialFocusNode());
    }) : _tryFocus(getInitialFocusNode());
    doc.addEventListener("focusin", checkFocusIn, true);
    doc.addEventListener("mousedown", checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener("touchstart", checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener("click", checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener("keydown", checkTabKey, {
      capture: true,
      passive: false
    });
    doc.addEventListener("keydown", checkEscapeKey);
    return trap;
  };
  var removeListeners = function removeListeners2() {
    if (!state.active) {
      return;
    }
    doc.removeEventListener("focusin", checkFocusIn, true);
    doc.removeEventListener("mousedown", checkPointerDown, true);
    doc.removeEventListener("touchstart", checkPointerDown, true);
    doc.removeEventListener("click", checkClick, true);
    doc.removeEventListener("keydown", checkTabKey, true);
    doc.removeEventListener("keydown", checkEscapeKey);
    return trap;
  };
  var checkDomRemoval = function checkDomRemoval2(mutations) {
    var isFocusedNodeRemoved = mutations.some(function(mutation) {
      var removedNodes = Array.from(mutation.removedNodes);
      return removedNodes.some(function(node) {
        return node === state.mostRecentlyFocusedNode;
      });
    });
    if (isFocusedNodeRemoved) {
      _tryFocus(getInitialFocusNode());
    }
  };
  var mutationObserver = typeof window !== "undefined" && "MutationObserver" in window ? new MutationObserver(checkDomRemoval) : void 0;
  var updateObservedNodes = function updateObservedNodes2() {
    if (!mutationObserver) {
      return;
    }
    mutationObserver.disconnect();
    if (state.active && !state.paused) {
      state.containers.map(function(container) {
        mutationObserver.observe(container, {
          subtree: true,
          childList: true
        });
      });
    }
  };
  trap = {
    get active() {
      return state.active;
    },
    get paused() {
      return state.paused;
    },
    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }
      var onActivate = getOption(activateOptions, "onActivate");
      var onPostActivate = getOption(activateOptions, "onPostActivate");
      var checkCanFocusTrap = getOption(activateOptions, "checkCanFocusTrap");
      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }
      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = _getActiveElement(doc);
      onActivate === null || onActivate === void 0 || onActivate();
      var finishActivation = function finishActivation2() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }
        addListeners();
        updateObservedNodes();
        onPostActivate === null || onPostActivate === void 0 || onPostActivate();
      };
      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }
      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }
      var options = _objectSpread2({
        onDeactivate: config.onDeactivate,
        onPostDeactivate: config.onPostDeactivate,
        checkCanReturnFocus: config.checkCanReturnFocus
      }, deactivateOptions);
      clearTimeout(state.delayInitialFocusTimer);
      state.delayInitialFocusTimer = void 0;
      removeListeners();
      state.active = false;
      state.paused = false;
      updateObservedNodes();
      activeFocusTraps.deactivateTrap(trapStack, trap);
      var onDeactivate = getOption(options, "onDeactivate");
      var onPostDeactivate = getOption(options, "onPostDeactivate");
      var checkCanReturnFocus = getOption(options, "checkCanReturnFocus");
      var returnFocus = getOption(options, "returnFocus", "returnFocusOnDeactivate");
      onDeactivate === null || onDeactivate === void 0 || onDeactivate();
      var finishDeactivation = function finishDeactivation2() {
        delay(function() {
          if (returnFocus) {
            _tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }
          onPostDeactivate === null || onPostDeactivate === void 0 || onPostDeactivate();
        });
      };
      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }
      finishDeactivation();
      return this;
    },
    pause: function pause(pauseOptions) {
      if (!state.active) {
        return this;
      }
      state.manuallyPaused = true;
      return this._setPausedState(true, pauseOptions);
    },
    unpause: function unpause(unpauseOptions) {
      if (!state.active) {
        return this;
      }
      state.manuallyPaused = false;
      if (trapStack[trapStack.length - 1] !== this) {
        return this;
      }
      return this._setPausedState(false, unpauseOptions);
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function(element) {
        return typeof element === "string" ? doc.querySelector(element) : element;
      });
      if (state.active) {
        updateTabbableNodes();
      }
      updateObservedNodes();
      return this;
    }
  };
  Object.defineProperties(trap, {
    _isManuallyPaused: {
      value: function value() {
        return state.manuallyPaused;
      }
    },
    _setPausedState: {
      value: function value(paused, options) {
        if (state.paused === paused) {
          return this;
        }
        state.paused = paused;
        if (paused) {
          var onPause = getOption(options, "onPause");
          var onPostPause = getOption(options, "onPostPause");
          onPause === null || onPause === void 0 || onPause();
          removeListeners();
          updateObservedNodes();
          onPostPause === null || onPostPause === void 0 || onPostPause();
        } else {
          var onUnpause = getOption(options, "onUnpause");
          var onPostUnpause = getOption(options, "onPostUnpause");
          onUnpause === null || onUnpause === void 0 || onUnpause();
          updateTabbableNodes();
          addListeners();
          updateObservedNodes();
          onPostUnpause === null || onPostUnpause === void 0 || onPostUnpause();
        }
        return this;
      }
    }
  });
  trap.updateContainerElements(elements);
  return trap;
};
function useFocusTrap(target, options = {}) {
  let trap;
  const { immediate, ...focusTrapOptions } = options;
  const hasFocus = shallowRef(false);
  const isPaused = shallowRef(false);
  const activate = (opts) => trap && trap.activate(opts);
  const deactivate = (opts) => trap && trap.deactivate(opts);
  const pause = () => {
    if (trap) {
      trap.pause();
      isPaused.value = true;
    }
  };
  const unpause = () => {
    if (trap) {
      trap.unpause();
      isPaused.value = false;
    }
  };
  const targets = computed(() => {
    const _targets = toValue(target);
    return toArray(_targets).map((el) => {
      const _el = toValue(el);
      return typeof _el === "string" ? _el : unrefElement(_el);
    }).filter(notNullish);
  });
  watch(
    targets,
    (els) => {
      if (!els.length)
        return;
      if (!trap) {
        trap = createFocusTrap(els, {
          ...focusTrapOptions,
          onActivate() {
            hasFocus.value = true;
            if (options.onActivate)
              options.onActivate();
          },
          onDeactivate() {
            hasFocus.value = false;
            if (options.onDeactivate)
              options.onDeactivate();
          }
        });
        if (immediate)
          activate();
      } else {
        const isActive = trap == null ? void 0 : trap.active;
        trap == null ? void 0 : trap.updateContainerElements(els);
        if (!isActive && immediate) {
          activate();
        }
      }
    },
    { flush: "post" }
  );
  tryOnScopeDispose(() => deactivate());
  return {
    hasFocus,
    isPaused,
    activate,
    deactivate,
    pause,
    unpause
  };
}
const useActivatedFocusTrap = ({
  element,
  isActive,
  noTrap,
  fallbackFocus,
  focus
}, focusTrapOpts = {
  allowOutsideClick: true,
  fallbackFocus: () => fallbackFocus.ref.value || (typeof document !== "undefined" ? document.body : "body"),
  escapeDeactivates: false,
  clickOutsideDeactivates: false,
  initialFocus: focus
}) => {
  const resolvedIsActive = readonly(toRef$1(isActive));
  const resolvedNoTrap = readonly(toRef$1(noTrap));
  const checkNeedsFallback = () => {
    const tabbableElements = element.value?.querySelectorAll(
      `a, button, input, select, textarea, [tabindex]:not([tabindex="-1"]):not(.${fallbackFocus.classSelector})`
    );
    return !tabbableElements?.length;
  };
  const needsFallback = ref(false);
  onMounted(() => {
    needsFallback.value = checkNeedsFallback();
    useMutationObserver(
      element,
      () => {
        needsFallback.value = checkNeedsFallback();
      },
      { childList: true, subtree: true }
    );
  });
  const trap = useFocusTrap(element, focusTrapOpts);
  watch(resolvedIsActive, async (newValue) => {
    if (newValue && resolvedNoTrap.value === false) {
      trap.activate();
    } else {
      trap.deactivate();
    }
  });
  watch(resolvedNoTrap, (newValue) => {
    if (newValue === true) {
      trap.deactivate();
    }
  });
  return {
    needsFallback: readonly(needsFallback)
  };
};
const useScrollLock = /* @__PURE__ */ createSharedComposable(useScrollLock$1);
let prevousRightPadding = "";
const lockRegistry = /* @__PURE__ */ new Map();
const useSafeScrollLock = (isOpen, bodyScroll) => {
  const resolvedIsOpen = readonly(toRef$1(isOpen));
  const id = useId$1();
  const inverseBodyScrollingValue = computed(() => !toValue(bodyScroll));
  const isLocked = useScrollLock(
    typeof document !== "undefined" ? document.body : null,
    resolvedIsOpen.value && inverseBodyScrollingValue.value
  );
  onMounted(() => {
    if (typeof document === "undefined") return;
    lockRegistry.set(id, false);
    watch(
      [resolvedIsOpen, inverseBodyScrollingValue],
      ([modelVal, bodyVal]) => {
        const scrollBarGap = window.innerWidth - document.documentElement.clientWidth;
        const hasLocked = Array.from(lockRegistry.values()).some((val) => val === true);
        const myLocked = modelVal && bodyVal;
        lockRegistry.set(id, myLocked);
        if (myLocked && !hasLocked && !isLocked.value) {
          isLocked.value = true;
          if (scrollBarGap > 0) {
            prevousRightPadding = document.body.style.paddingRight;
            document.body.style.paddingRight = `${scrollBarGap + prevousRightPadding}px`;
          }
        }
        const hasLockedAfter = Array.from(lockRegistry.values()).some((val) => val === true);
        if (hasLocked && !hasLockedAfter) {
          lockRegistry.set(id, false);
          isLocked.value = false;
          document.body.style.paddingRight = prevousRightPadding;
        }
      },
      { immediate: true }
    );
  });
  onUnmounted(() => {
    lockRegistry.delete(id);
    const hasLockedAfter = Array.from(lockRegistry.values()).some((val) => val === true);
    if (!hasLockedAfter) {
      document.body.style.paddingRight = prevousRightPadding;
      isLocked.value = false;
    }
  });
};
const isEmptySlot = (el) => (el?.() ?? []).length === 0;
const getModalZIndex = (element) => {
  if (typeof window === "undefined") return 1055;
  const target = element ?? document.body;
  const raw = window.getComputedStyle(target).getPropertyValue("--bs-modal-zindex").trim();
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : 1055;
};
function injectSelf(key, vm = getCurrentInstance("injectSelf")) {
  const { provides } = vm;
  if (provides && key in provides) {
    return provides[key];
  }
  return void 0;
}
function getCurrentInstance(name, message) {
  const vm = getCurrentInstance$1();
  if (!vm) {
    throw new Error(`[Bvn] ${name} ${"must be called from inside a setup function"}`);
  }
  return vm;
}
const toKebabCase = (str = "") => str.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
const isObject = (obj) => obj !== null && typeof obj === "object" && !Array.isArray(obj);
function mergeDeep(source = {}, target = {}, arrayFn) {
  const out = {};
  for (const key in source) {
    out[key] = source[key];
  }
  for (const key in target) {
    const sourceProperty = source[key];
    const targetProperty = target[key];
    if (isObject(sourceProperty) && isObject(targetProperty)) {
      out[key] = mergeDeep(sourceProperty, targetProperty);
      continue;
    }
    out[key] = targetProperty;
  }
  return out;
}
const propIsDefined = (vnode, prop) => typeof vnode.props?.[prop] !== "undefined" || typeof vnode.props?.[toKebabCase(prop)] !== "undefined";
function internalUseDefaults(props = {}, name) {
  const defaults = inject(defaultsKey, ref({}));
  const vm = getCurrentInstance("useDefaults");
  name = name ?? vm.type.name ?? vm.type.__name;
  if (!name) {
    throw new Error("[Bvn] Could not determine component name");
  }
  const componentDefaults = computed(() => defaults.value?.[props._as ?? name]);
  const _props = new Proxy(props, {
    get(target, prop) {
      const propValue = Reflect.get(target, prop);
      if (prop === "class" || prop === "style") {
        return [componentDefaults.value?.[prop], propValue].filter((v) => v != null);
      } else if (typeof prop === "string" && !propIsDefined(vm.vnode, prop)) {
        return componentDefaults.value?.[prop] ?? defaults.value?.global?.[prop] ?? propValue;
      }
      return propValue;
    }
  });
  const _subcomponentDefaults = shallowRef();
  watchEffect(() => {
    if (componentDefaults.value) {
      const subComponents = Object.entries(componentDefaults.value).filter(
        ([key]) => key.startsWith(key[0].toUpperCase())
      );
      _subcomponentDefaults.value = subComponents.length ? Object.fromEntries(subComponents) : void 0;
    } else {
      _subcomponentDefaults.value = void 0;
    }
  });
  function provideSubDefaults() {
    const injected = injectSelf(defaultsKey, vm);
    provide(
      defaultsKey,
      computed(
        () => _subcomponentDefaults.value ? mergeDeep(injected?.value ?? {}, _subcomponentDefaults.value) : injected?.value
      )
    );
  }
  return { props: _props, provideSubDefaults };
}
function useDefaults(props, name) {
  const { props: _props, provideSubDefaults } = internalUseDefaults(props, name);
  provideSubDefaults();
  return _props;
}
const useColorVariantClasses = (obj) => computed(() => {
  let props = toValue(obj);
  props = {
    variant: props.variant ?? null,
    bgVariant: props.bgVariant ?? null,
    textVariant: props.textVariant ?? null,
    borderVariant: props.borderVariant ?? null
  };
  return {
    [`text-bg-${props.variant}`]: props.variant !== null,
    [`text-${props.textVariant}`]: props.textVariant !== null,
    [`bg-${props.bgVariant}`]: props.bgVariant !== null,
    [`border-${props.borderVariant}`]: props.borderVariant !== null
  };
});
const _hoisted_1$d = {
  key: 0,
  class: "visually-hidden"
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "BSpinner",
  props: {
    label: { default: void 0 },
    role: { default: "status" },
    small: { type: Boolean, default: false },
    tag: { default: "span" },
    type: { default: "border" },
    variant: { default: null }
  },
  setup(__props) {
    const _props = __props;
    const props = useDefaults(_props, "BSpinner");
    const slots = useSlots();
    const colorClasses = useColorVariantClasses(
      computed(() => ({
        textVariant: props.variant
      }))
    );
    const computedClasses = computed(() => [
      `spinner-${props.type}`,
      colorClasses.value,
      {
        [`spinner-${props.type}-sm`]: props.small
      }
    ]);
    const hasLabelSlot = computed(() => !isEmptySlot(slots.label));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(unref(props).tag), {
        class: normalizeClass(computedClasses.value),
        role: unref(props).label || hasLabelSlot.value ? unref(props).role : null,
        "aria-hidden": unref(props).label || hasLabelSlot.value ? null : true
      }, {
        default: withCtx(() => [
          unref(props).label || hasLabelSlot.value ? (openBlock(), createElementBlock("span", _hoisted_1$d, [
            renderSlot(_ctx.$slots, "label", {}, () => [
              createTextVNode(toDisplayString(unref(props).label), 1)
            ])
          ])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["class", "role", "aria-hidden"]);
    };
  }
});
const pick = (objToPluck, keysToPluck) => [...keysToPluck].reduce(
  (memo, prop) => {
    memo[prop] = objToPluck[prop];
    return memo;
  },
  {}
);
const toPascalCase = (str) => str.replace(/-./g, (match) => match.charAt(1).toUpperCase()).replace(/\b\w/g, (match) => match.toUpperCase()).replace(/\s+/g, "");
const isLink = (props) => !!(props.href || props.to);
const useBLinkHelper = (props, pickProps) => {
  const pickPropsResolved = readonly(toRef$1(pickProps));
  const resolvedProps = readonly(toRef$1(props));
  const computedLink = computed(() => isLink(resolvedProps.value));
  const computedLinkProps = computed(
    () => computedLink.value ? pick(
      resolvedProps.value,
      pickPropsResolved.value ?? [
        "active",
        "activeClass",
        "append",
        "exactActiveClass",
        "href",
        "rel",
        "replace",
        "routerComponentName",
        "target",
        "to",
        "variant",
        "opacity",
        "opacityHover",
        "underlineVariant",
        "underlineOffset",
        "underlineOffsetHover",
        "underlineOpacity",
        "underlineOpacityHover"
      ]
    ) : {}
  );
  return { computedLink, computedLinkProps };
};
const useBLinkTagResolver = ({
  to,
  disabled,
  href,
  replace,
  routerComponentName
}) => {
  const instance = getCurrentInstance$1();
  const router = instance?.appContext?.app?.config?.globalProperties?.$router;
  const route2 = instance?.appContext?.app?.config?.globalProperties?.$route;
  const RouterLinkComponent = resolveDynamicComponent("RouterLink");
  const useLink = !!RouterLinkComponent && typeof RouterLinkComponent !== "string" && "useLink" in RouterLinkComponent ? RouterLinkComponent.useLink : null;
  const resolvedTo = computed(() => toValue(to) || "");
  const resolvedReplace = readonly(toRef$1(replace));
  const routerName = computed(() => toPascalCase(toValue(routerComponentName)));
  const tag = computed(() => {
    const hasRouter = instance?.appContext?.app?.component(routerName.value) !== void 0;
    if (!hasRouter || toValue(disabled) || !resolvedTo.value) {
      return "a";
    }
    return routerName.value;
  });
  const isRouterLink = computed(() => tag.value === "RouterLink");
  const isNuxtLink = computed(
    // @ts-expect-error we're doing an explicit check for Nuxt, so we can safely ignore this
    () => isRouterLink.value && typeof instance?.appContext?.app?.$nuxt !== "undefined"
  );
  const isNonStandardTag = computed(
    () => tag.value !== "a" && !isRouterLink.value && !isNuxtLink.value
  );
  const isOfRouterType = computed(() => isRouterLink.value || isNuxtLink.value);
  const linkProps = computed(() => ({
    to: resolvedTo.value,
    replace: resolvedReplace.value
  }));
  const _link = useLink?.({
    to: resolvedTo,
    replace: resolvedReplace
  });
  const link = computed(() => isOfRouterType.value ? _link : null);
  const computedHref = computed(() => {
    if (link.value?.href.value) return link.value.href.value;
    const toFallback = "#";
    const resolvedHref = toValue(href);
    if (resolvedHref) return resolvedHref;
    if (typeof resolvedTo.value === "string") return resolvedTo.value || toFallback;
    const stableTo = resolvedTo.value;
    if (stableTo !== void 0 && "path" in stableTo) {
      const path = stableTo.path || "";
      const query = stableTo.query ? `?${Object.keys(stableTo.query).map((e) => `${e}=${stableTo.query?.[e]}`).join("=")}` : "";
      const hash = !stableTo.hash || stableTo.hash.charAt(0) === "#" ? stableTo.hash || "" : `#${stableTo.hash}`;
      return `${path}${query}${hash}` || toFallback;
    }
    return toFallback;
  });
  return {
    isNonStandardTag,
    tag,
    isRouterLink,
    isNuxtLink,
    computedHref,
    routerName,
    router,
    route: route2,
    link,
    linkProps
  };
};
const useLinkClasses = (linkProps) => computed(() => {
  const props = toValue(linkProps);
  return {
    [`link-${props.variant}`]: props.variant !== null,
    [`link-opacity-${props.opacity}`]: props.opacity !== void 0,
    [`link-opacity-${props.opacityHover}-hover`]: props.opacityHover !== void 0,
    [`link-underline-${props.underlineVariant}`]: props.underlineVariant !== null,
    [`link-offset-${props.underlineOffset}`]: props.underlineOffset !== void 0,
    [`link-offset-${props.underlineOffsetHover}-hover`]: props.underlineOffsetHover !== void 0,
    ["link-underline"]: props.underlineVariant === null && (props.underlineOpacity !== void 0 || props.underlineOpacityHover !== void 0),
    [`link-underline-opacity-${props.underlineOpacity}`]: props.underlineOpacity !== void 0,
    [`link-underline-opacity-${props.underlineOpacityHover}-hover`]: props.underlineOpacityHover !== void 0,
    "icon-link": props.icon === true
  };
});
const defaultActiveClass = "active";
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "BLink",
  props: {
    active: { type: Boolean, default: void 0 },
    activeClass: { default: "router-link-active" },
    disabled: { type: Boolean, default: false },
    exactActiveClass: { default: "router-link-exact-active" },
    href: { default: void 0 },
    icon: { type: Boolean, default: false },
    noRel: { type: Boolean, default: false },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    prefetch: { type: Boolean, default: void 0 },
    prefetchOn: { default: void 0 },
    noPrefetch: { type: Boolean, default: void 0 },
    prefetchedClass: { default: void 0 },
    rel: { default: void 0 },
    replace: { type: Boolean, default: false },
    routerComponentName: { default: "router-link" },
    routerTag: { default: "a" },
    stretched: { type: Boolean, default: false },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: null },
    variant: { default: null }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BLink");
    const emit = __emit;
    const attrs = useAttrs();
    const { computedHref, tag, link, isNuxtLink, isRouterLink, linkProps, isNonStandardTag } = useBLinkTagResolver({
      routerComponentName: () => props.routerComponentName,
      disabled: () => props.disabled,
      to: () => props.to,
      replace: () => props.replace,
      href: () => props.href
    });
    const collapseData = inject(collapseInjectionKey, null);
    const navbarData = inject(navbarInjectionKey, null);
    const linkValueClasses = useLinkClasses(props);
    const computedClasses = computed(() => [
      linkValueClasses.value,
      attrs.class,
      computedLinkClasses.value,
      {
        [defaultActiveClass]: props.active,
        [props.activeClass]: link.value?.isActive.value || false,
        [props.exactActiveClass]: link.value?.isExactActive.value || false,
        "stretched-link": props.stretched === true
      }
    ]);
    const computedLinkClasses = computed(() => ({
      [defaultActiveClass]: props.active,
      disabled: props.disabled
    }));
    const clicked = (e) => {
      if (props.disabled) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      if (collapseData?.isNav?.value === true && navbarData === null || navbarData !== null && navbarData.noAutoClose?.value !== true) {
        collapseData?.hide?.();
      }
      emit("click", e);
    };
    const computedRel = computed(
      () => props.target === "_blank" ? !props.rel && props.noRel ? "noopener" : props.rel : void 0
    );
    const computedTabIndex = computed(
      () => props.disabled ? "-1" : typeof attrs.tabindex === "undefined" ? null : attrs.tabindex
    );
    const nuxtSpecificProps = computed(() => ({
      prefetch: props.prefetch,
      noPrefetch: props.noPrefetch,
      prefetchOn: props.prefetchOn,
      prefetchedClass: props.prefetchedClass,
      ...linkProps.value
    }));
    const computedSpecificProps = computed(() => ({
      ...isRouterLink.value ? linkProps.value : void 0,
      // In addition to being Nuxt specific, we add these values if it's some non-standard tag. We don't know what it is,
      // So we just add it anyways. It will be made as an attr if it's unused so it's fine
      ...isNuxtLink.value || isNonStandardTag.value ? nuxtSpecificProps.value : void 0
    }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(unref(tag)), mergeProps({
        class: computedClasses.value,
        target: unref(props).target,
        href: unref(computedHref),
        rel: computedRel.value,
        tabindex: computedTabIndex.value,
        "aria-disabled": unref(props).disabled ? true : null
      }, computedSpecificProps.value, {
        onClick: _cache[0] || (_cache[0] = (e) => {
          clicked(e);
          unref(link)?.navigate(e);
        })
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["class", "target", "href", "rel", "tabindex", "aria-disabled"]);
    };
  }
});
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "BButton",
  props: /* @__PURE__ */ mergeModels({
    loading: { type: Boolean, default: false },
    loadingFill: { type: Boolean, default: false },
    loadingText: { default: "Loading..." },
    pill: { type: Boolean, default: false },
    size: { default: "md" },
    squared: { type: Boolean, default: false },
    tag: { default: "button" },
    type: { default: "button" },
    variant: { default: "secondary" },
    active: { type: Boolean, default: false },
    activeClass: { default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    exactActiveClass: { default: void 0 },
    href: { default: void 0 },
    icon: { type: Boolean, default: false },
    noRel: { type: Boolean },
    opacity: { default: void 0 },
    opacityHover: { default: void 0 },
    prefetch: { type: Boolean },
    prefetchOn: {},
    noPrefetch: { type: Boolean },
    prefetchedClass: {},
    rel: { default: void 0 },
    replace: { type: Boolean, default: void 0 },
    routerComponentName: { default: void 0 },
    routerTag: { default: void 0 },
    stretched: { type: Boolean, default: false },
    target: { default: void 0 },
    to: { default: void 0 },
    underlineOffset: { default: void 0 },
    underlineOffsetHover: { default: void 0 },
    underlineOpacity: { default: void 0 },
    underlineOpacityHover: { default: void 0 },
    underlineVariant: { default: null }
  }, {
    "pressed": { type: Boolean, ...{ default: void 0 } },
    "pressedModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["click"], ["update:pressed"]),
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BButton");
    const emit = __emit;
    const element = useTemplateRef("_element");
    const pressedValue = useModel(__props, "pressed");
    const { computedLink, computedLinkProps } = useBLinkHelper(props, [
      "active-class",
      "exact-active-class",
      "replace",
      "routerComponentName",
      "routerTag"
    ]);
    const isToggle = computed(() => typeof pressedValue.value === "boolean");
    const isButton = computed(
      () => props.tag === "button" && props.href === void 0 && props.to === void 0
    );
    const isBLink = computed(() => props.to !== void 0);
    const nonStandardTag = computed(() => props.href !== void 0 ? false : !isButton.value);
    const linkProps = computed(() => isBLink.value ? computedLinkProps.value : []);
    const computedAriaDisabled = computed(() => {
      if (props.href === "#" && props.disabled) return true;
      return nonStandardTag.value ? props.disabled : null;
    });
    const variantIsLinkType = computed(() => props.variant?.startsWith("link") || false);
    const variantIsLinkTypeSubset = computed(() => props.variant?.startsWith("link-") || false);
    const linkValueClasses = useLinkClasses(
      computed(() => ({
        ...variantIsLinkType.value ? {
          icon: props.icon,
          opacity: props.opacity,
          opacityHover: props.opacityHover,
          underlineOffset: props.underlineOffset,
          underlineOffsetHover: props.underlineOffsetHover,
          underlineOpacity: props.underlineOpacity,
          underlineOpacityHover: props.underlineOpacityHover,
          underlineVariant: props.underlineVariant,
          variant: variantIsLinkTypeSubset.value === true ? props.variant?.slice(5) : null
        } : void 0
      }))
    );
    const computedClasses = computed(() => [
      variantIsLinkType.value === true && computedLink.value === false ? linkValueClasses.value : void 0,
      [`btn-${props.size}`],
      {
        [`btn-${props.variant}`]: props.variant !== null && variantIsLinkTypeSubset.value === false,
        "active": props.active || pressedValue.value,
        "rounded-pill": props.pill,
        "rounded-0": props.squared,
        "disabled": props.disabled
      }
    ]);
    const computedTag = computed(() => isBLink.value ? _sfc_main$g : props.href ? "a" : props.tag);
    const clicked = (e) => {
      if (props.disabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      emit("click", e);
      if (isToggle.value) pressedValue.value = !pressedValue.value;
    };
    onKeyStroke(
      [" ", "enter"],
      (e) => {
        if (props.href === "#") {
          e.preventDefault();
          element.value?.click();
        }
      },
      { target: element }
    );
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(computedTag.value), mergeProps({
        ref: "_element",
        class: "btn"
      }, linkProps.value, {
        class: computedClasses.value,
        "aria-disabled": computedAriaDisabled.value,
        "aria-pressed": isToggle.value ? pressedValue.value : null,
        autocomplete: isToggle.value ? "off" : null,
        disabled: isButton.value ? unref(props).disabled : null,
        href: unref(props).href,
        rel: unref(computedLink) ? unref(props).rel : null,
        role: nonStandardTag.value || unref(computedLink) ? "button" : null,
        target: unref(computedLink) ? unref(props).target : null,
        type: isButton.value ? unref(props).type : null,
        to: !isButton.value ? unref(props).to : null,
        onClick: clicked
      }), {
        default: withCtx(() => [
          unref(props).loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }, () => [
            !unref(props).loadingFill ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(toDisplayString(unref(props).loadingText), 1)
            ], 64)) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "loading-spinner", {}, () => [
              createVNode(_sfc_main$h, {
                small: unref(props).size !== "lg",
                label: unref(props).loadingFill ? unref(props).loadingText : void 0
              }, null, 8, ["small", "label"])
            ])
          ]) : renderSlot(_ctx.$slots, "default", { key: 1 })
        ]),
        _: 3
      }, 16, ["class", "aria-disabled", "aria-pressed", "autocomplete", "disabled", "href", "rel", "role", "target", "type", "to"]);
    };
  }
});
const _hoisted_1$c = ["type", "disabled", "aria-label"];
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "BCloseButton",
  props: {
    ariaLabel: { default: "Close" },
    disabled: { type: Boolean, default: false },
    type: { default: "button" }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BCloseButton");
    const emit = __emit;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        type: unref(props).type,
        class: "btn-close",
        disabled: unref(props).disabled,
        "aria-label": unref(props).ariaLabel,
        onClick: _cache[0] || (_cache[0] = ($event) => emit("click", $event))
      }, null, 8, _hoisted_1$c);
    };
  }
});
const useId = (id, suffix) => {
  const genId = useId$1();
  return computed(() => toValue(id) || withBvnPrefix(genId || "", suffix));
};
class BvEvent {
  cancelable = true;
  componentId = null;
  _defaultPrevented = false;
  eventType = "";
  nativeEvent = null;
  _preventDefault;
  relatedTarget = null;
  target = null;
  // Readable by everyone,
  // But only overwritten by inherrited constructors
  get defaultPrevented() {
    return this._defaultPrevented;
  }
  set defaultPrevented(prop) {
    this._defaultPrevented = prop;
  }
  // I think this is right
  // We want to be able to have it callable to everyone,
  // But only overwritten by inherrited constructors
  get preventDefault() {
    return this._preventDefault;
  }
  // This may not be correct, because it doesn't get correct type inferences in children
  // Ex overwrite this.preventDefault = () => true is valid. Could be a TS issue
  set preventDefault(setter) {
    this._preventDefault = setter;
  }
  constructor(eventType, eventInit = {}) {
    if (!eventType) {
      throw new TypeError(
        `Failed to construct '${this.constructor.name}'. 1 argument required, ${arguments.length} given.`
      );
    }
    Object.assign(this, BvEvent.Defaults, eventInit, { eventType });
    this._preventDefault = function _preventDefault() {
      if (this.cancelable) {
        this.defaultPrevented = true;
      }
    };
  }
  static get Defaults() {
    return {
      cancelable: true,
      componentId: null,
      eventType: "",
      nativeEvent: null,
      relatedTarget: null,
      target: null
    };
  }
}
class BvTriggerableEvent extends BvEvent {
  trigger = null;
  ok = void 0;
  constructor(eventType, eventInit = {}) {
    super(eventType, eventInit);
    Object.assign(this, BvEvent.Defaults, eventInit, { eventType });
  }
  static get Defaults() {
    return {
      ...super.Defaults,
      trigger: null,
      ok: void 0
    };
  }
}
const fadeBaseTransitionProps = {
  name: "fade",
  enterActiveClass: "",
  enterFromClass: "showing",
  enterToClass: "",
  leaveActiveClass: "",
  leaveFromClass: "",
  leaveToClass: "showing",
  css: true
};
const useShowHide = (modelValue, props, emit, element, computedId, options = {
  transitionProps: {},
  showFn: () => {
  },
  hideFn: () => {
  }
}) => {
  let noAction = false;
  const initialShow = !!modelValue.value && !props.initialAnimation || props.visible || false;
  const showRef = ref(initialShow);
  const renderRef = ref(initialShow);
  const renderBackdropRef = ref(initialShow);
  let isCountdown = typeof modelValue.value !== "boolean";
  watch(modelValue, () => {
    isCountdown = typeof modelValue.value !== "boolean";
    if (noAction) {
      noAction = false;
      return;
    }
    if (modelValue.value) {
      show();
    } else {
      hide("modelValue", true);
    }
  });
  const localNoAnimation = ref(initialShow);
  const localTemporaryHide = ref(false);
  const computedNoAnimation = computed(
    () => props.noAnimation || props.noFade || localNoAnimation.value || false
  );
  let isMounted = false;
  onMounted(() => {
    isMounted = true;
    if (!props.show && initialShow) {
      const event = buildTriggerableEvent("show", { cancelable: true });
      emit("show", event);
      if (event.defaultPrevented) {
        emit("show-prevented", buildTriggerableEvent("show-prevented"));
        return;
      }
      localNoAnimation.value = true;
      if (!modelValue.value) {
        noAction = true;
        modelValue.value = true;
      }
      renderRef.value = true;
      renderBackdropRef.value = true;
      isVisible.value = true;
      backdropVisible.value = true;
      backdropReady.value = true;
      showRef.value = true;
      options.showFn?.();
    } else if (props.show || !!modelValue.value && props.initialAnimation) {
      show();
    }
  });
  watch(
    () => props.visible,
    (newval) => {
      localNoAnimation.value = true;
      nextTick(() => {
        if (newval) isVisible.value = true;
        if (newval) {
          show();
        } else {
          hide("visible-prop", true);
        }
      });
    }
  );
  watch(
    () => props.show,
    (newval) => {
      if (newval) {
        show();
      } else {
        hide("show-prop", true);
      }
    }
  );
  useEventListener(element, "bv-toggle", () => {
    modelValue.value = !modelValue.value;
  });
  const buildTriggerableEvent = (type, opts = {}) => new BvTriggerableEvent(type, {
    cancelable: false,
    target: element?.value || null,
    relatedTarget: null,
    trigger: null,
    ...opts,
    componentId: computedId?.value
  });
  let showTimeout;
  let hideTimeout;
  let _Resolve;
  let _Promise;
  let _resolveOnHide;
  const show = (resolveOnHide = false) => {
    if (showRef.value && !hideTimeout && !_Promise) return Promise.resolve(true);
    _resolveOnHide = resolveOnHide;
    if (showRef.value && !hideTimeout && _Promise) return _Promise;
    _Promise = new Promise((resolve) => {
      _Resolve = resolve;
    });
    const event = buildTriggerableEvent("show", { cancelable: true });
    emit("show", event);
    if (event.defaultPrevented) {
      emit("show-prevented", buildTriggerableEvent("show-prevented"));
      if (isVisible.value) {
        isVisible.value = false;
      }
      if (modelValue.value && !isCountdown) {
        noAction = true;
        nextTick(() => {
          modelValue.value = false;
        });
      }
      _Resolve?.("show-prevented");
      return _Promise;
    }
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = void 0;
    }
    renderRef.value = true;
    renderBackdropRef.value = true;
    requestAnimationFrame(() => {
      if (localNoAnimation.value || props.delay === void 0) {
        if (!isMounted) return;
        showTimeout = void 0;
        showRef.value = true;
        options.showFn?.();
        if (!modelValue.value) {
          noAction = true;
          nextTick(() => {
            modelValue.value = true;
          });
        }
        return;
      }
      showTimeout = setTimeout(
        () => {
          if (!isMounted) return;
          showTimeout = void 0;
          showRef.value = true;
          options.showFn?.();
          if (!modelValue.value) {
            noAction = true;
            nextTick(() => {
              modelValue.value = true;
            });
          }
        },
        typeof props.delay === "number" ? props.delay : props.delay?.show || 0
      );
    });
    return _Promise;
  };
  let leaveTrigger;
  const hide = (trigger, noTriggerEmit) => {
    if (!showRef.value && !showTimeout) return Promise.resolve("");
    if (!_Promise)
      _Promise = new Promise((resolve) => {
        _Resolve = resolve;
      });
    if (typeof trigger !== "string") trigger = void 0;
    leaveTrigger = trigger;
    const event = buildTriggerableEvent("hide", { cancelable: true, trigger });
    const event2 = buildTriggerableEvent(trigger || "ignore", { cancelable: true, trigger });
    if (trigger === "backdrop" && props.noCloseOnBackdrop || trigger === "esc" && props.noCloseOnEsc) {
      emit("hide-prevented", buildTriggerableEvent("hide-prevented", { trigger }));
      _Resolve?.("hide-prevented");
      return _Promise;
    }
    if (showTimeout) {
      clearTimeout(showTimeout);
      showTimeout = void 0;
    }
    if (trigger && !noTriggerEmit) {
      emit(trigger, event2);
    }
    emit("hide", event);
    if (event.defaultPrevented || event2.defaultPrevented) {
      emit("hide-prevented", buildTriggerableEvent("hide-prevented", { trigger }));
      if (!modelValue.value) {
        nextTick(() => {
          noAction = true;
          modelValue.value = true;
        });
      }
      _Resolve?.("hide-prevented");
      return _Promise;
    }
    trapActive.value = false;
    if (showTimeout) {
      clearTimeout(showTimeout);
      showTimeout = void 0;
      if (!localTemporaryHide.value) renderRef.value = false;
      renderBackdropRef.value = false;
    }
    hideTimeout = setTimeout(
      () => {
        if (!isMounted) return;
        hideTimeout = void 0;
        isLeaving.value = true;
        showRef.value = false;
        options.hideFn?.();
        if (modelValue.value) {
          noAction = true;
          modelValue.value = isCountdown ? 0 : false;
        }
      },
      localNoAnimation.value ? 0 : typeof props.delay === "number" ? props.delay : props.delay?.hide || 0
    );
    return _Promise;
  };
  const throttleHide = /* @__PURE__ */ useThrottleFn((a) => hide(a), 500);
  const throttleShow = /* @__PURE__ */ useThrottleFn(() => show(), 500);
  const toggle = (resolveOnHide = false) => {
    const e = buildTriggerableEvent("toggle", { cancelable: true });
    emit("toggle", e);
    if (e.defaultPrevented) {
      emit("toggle-prevented", buildTriggerableEvent("toggle-prevented"));
      return Promise.resolve("toggle-prevented");
    }
    if (showRef.value) {
      return hide("toggle-function", true);
    }
    return show(resolveOnHide);
  };
  const triggerToggle = () => {
    const e = buildTriggerableEvent("toggle", { cancelable: true });
    emit("toggle", e);
    if (e.defaultPrevented) {
      emit("toggle-prevented", buildTriggerableEvent("toggle-prevented"));
      return;
    }
    if (showRef.value) {
      hide("toggle-trigger", true);
    } else {
      show();
    }
  };
  const triggerRegistry = [];
  const registerTrigger = (trigger, el) => {
    triggerRegistry.push({ trigger, el });
    el.addEventListener(trigger, triggerToggle);
    checkVisibility(el);
  };
  const unregisterTrigger = (trigger, el, clean = true) => {
    const idx = triggerRegistry.findIndex((t) => t?.trigger === trigger && t.el === el);
    if (idx > -1) {
      triggerRegistry.splice(idx, 1);
      el.removeEventListener(trigger, triggerToggle);
      if (clean) {
        el.removeAttribute("aria-expanded");
        el.classList.remove("collapsed");
        el.classList.remove("not-collapsed");
      }
    }
  };
  const appRegistry = inject(showHideRegistryKey, void 0)?.register({
    id: computedId.value,
    toggle,
    show,
    hide,
    value: readonly(showRef),
    registerTrigger,
    unregisterTrigger,
    component: getCurrentInstance$1()
  });
  const checkVisibility = (el) => {
    el.setAttribute("aria-expanded", modelValue.value ? "true" : "false");
    el.classList.toggle("collapsed", !modelValue.value);
    el.classList.toggle("not-collapsed", !!modelValue.value);
  };
  watch(modelValue, () => {
    triggerRegistry.forEach((t) => {
      checkVisibility(t.el);
    });
  });
  watch(computedId, (newId, oldId) => {
    appRegistry?.updateId(newId, oldId);
  });
  onBeforeUnmount(() => {
    appRegistry?.unregister();
    triggerRegistry.forEach((t) => {
      t.el.removeEventListener(t.trigger, triggerToggle);
    });
  });
  onUnmounted(() => {
    isMounted = false;
    clearTimeout(showTimeout);
    clearTimeout(hideTimeout);
    showTimeout = void 0;
    hideTimeout = void 0;
  });
  const lazyLoadCompleted = ref(false);
  const markLazyLoadCompleted = () => {
    if (props.lazy === true) lazyLoadCompleted.value = true;
  };
  const isLeaving = ref(false);
  const isActive = ref(initialShow);
  const isVisible = ref(initialShow);
  const onBeforeEnter = (el) => {
    options.transitionProps?.onBeforeEnter?.(el);
    props.transitionProps?.onBeforeEnter?.(el);
    isActive.value = true;
  };
  const onEnter = (el) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isVisible.value = true;
      });
    });
    options.transitionProps?.onEnter?.(el);
    props.transitionProps?.onEnter?.(el);
  };
  const onAfterEnter = (el) => {
    markLazyLoadCompleted();
    options.transitionProps?.onAfterEnter?.(el);
    props.transitionProps?.onAfterEnter?.(el);
    if (localNoAnimation.value) {
      requestAnimationFrame(() => {
        localNoAnimation.value = false;
      });
    }
    if (localTemporaryHide.value) {
      localTemporaryHide.value = false;
    }
    requestAnimationFrame(() => {
      trapActive.value = true;
      nextTick(() => {
        emit("shown", buildTriggerableEvent("shown", { cancelable: false }));
      });
    });
    if (!_resolveOnHide) {
      _Resolve?.(true);
      _Promise = void 0;
      _Resolve = void 0;
    }
  };
  const onBeforeLeave = (el) => {
    if (!isLeaving.value) isLeaving.value = true;
    options.transitionProps?.onBeforeLeave?.(el);
    props.transitionProps?.onBeforeLeave?.(el);
    trapActive.value = false;
  };
  const onLeave = (el) => {
    isVisible.value = false;
    options.transitionProps?.onLeave?.(el);
    props.transitionProps?.onLeave?.(el);
  };
  const onAfterLeave = (el) => {
    emit("hidden", buildTriggerableEvent("hidden", { trigger: leaveTrigger, cancelable: false }));
    options.transitionProps?.onAfterLeave?.(el);
    props.transitionProps?.onAfterLeave?.(el);
    isLeaving.value = false;
    isActive.value = false;
    if (localNoAnimation.value) {
      requestAnimationFrame(() => {
        localNoAnimation.value = false;
      });
    }
    requestAnimationFrame(() => {
      if (!localTemporaryHide.value) renderRef.value = false;
    });
    _Resolve?.(leaveTrigger || "");
    _Promise = void 0;
    _Resolve = void 0;
    leaveTrigger = void 0;
  };
  const contentShowing = computed(
    () => localTemporaryHide.value === true || isActive.value === true || props.lazy === false || props.lazy === true && lazyLoadCompleted.value === true && props.unmountLazy === false
  );
  const trapActive = ref(false);
  const backdropVisible = ref(false);
  const backdropReady = ref(false);
  const transitionFunctions = {
    ...options.transitionProps,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onBeforeLeave,
    onLeave,
    onAfterLeave
  };
  return {
    showRef,
    renderRef,
    renderBackdropRef,
    isVisible,
    isActive,
    trapActive,
    show,
    hide,
    toggle,
    throttleHide,
    throttleShow,
    buildTriggerableEvent,
    computedNoAnimation,
    localNoAnimation,
    localTemporaryHide,
    isLeaving,
    transitionProps: {
      ...fadeBaseTransitionProps,
      ...props.transitionProps,
      ...transitionFunctions
    },
    lazyLoadCompleted,
    markLazyLoadCompleted,
    contentShowing,
    backdropReady,
    backdropVisible,
    backdropTransitionProps: {
      ...fadeBaseTransitionProps,
      onBeforeEnter: () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            backdropVisible.value = true;
          });
        });
        backdropReady.value = false;
      },
      onAfterEnter: () => {
        backdropReady.value = true;
      },
      onBeforeLeave: () => {
        backdropVisible.value = false;
      },
      onAfterLeave: () => {
        backdropReady.value = false;
        requestAnimationFrame(() => {
          renderBackdropRef.value = false;
        });
      }
    }
  };
};
const getElement = (element, root = typeof document !== "undefined" ? document : void 0) => {
  if (!element) return void 0;
  if (typeof element === "string") {
    if (typeof root === "undefined" || typeof document === "undefined") return void 0;
    const idElement = document.getElementById(element);
    return idElement ?? root.querySelector(element) ?? void 0;
  }
  return element.$el ?? element;
};
Object.freeze(
  Object.keys({
    bordered: 0,
    borderless: 0,
    borderVariant: 0,
    captionTop: 0,
    dark: 0,
    fixed: 0,
    hover: 0,
    id: 0,
    noBorderCollapse: 0,
    outlined: 0,
    responsive: 0,
    small: 0,
    stacked: 0,
    stickyHeader: 0,
    striped: 0,
    stripedColumns: 0,
    variant: 0,
    tableAttrs: 0,
    tableClass: 0
  })
);
Object.freeze(
  Object.keys({
    align: 0,
    caption: 0,
    detailsTdClass: 0,
    fieldColumnClass: 0,
    fields: 0,
    footClone: 0,
    footRowVariant: 0,
    footVariant: 0,
    headRowVariant: 0,
    headVariant: 0,
    items: 0,
    labelStacked: 0,
    modelValue: 0,
    primaryKey: 0,
    tbodyClass: 0,
    tbodyTrAttrs: 0,
    tbodyTrClass: 0,
    tfootClass: 0,
    tfootTrClass: 0,
    theadClass: 0,
    theadTrClass: 0
  })
);
const modalOpenClassName = "modal-open";
const useSharedModalStack = () => {
  const modalManagerPlugin = inject(modalManagerKey);
  const dispose = (modal) => {
    modalManagerPlugin?.removeStack(modal);
    modalManagerPlugin?.removeRegistry(modal);
  };
  const updateHTMLAttrs = getSSRHandler("updateHTMLAttrs", (selector, attribute, value) => {
    const el = typeof selector === "string" ? window?.document.querySelector(selector) : unrefElement(selector);
    if (!el) return;
    if (attribute === "class") {
      el.classList.toggle(modalOpenClassName, value === modalOpenClassName);
    } else {
      el.setAttribute(attribute, value);
    }
  });
  tryOnScopeDispose(() => {
    if (modalManagerPlugin?.countStack.value === 0) {
      updateHTMLAttrs("body", "class", "");
    }
  });
  watch(
    () => modalManagerPlugin?.countStack.value,
    (newValue) => {
      if (newValue === void 0) return;
      updateHTMLAttrs("body", "class", newValue > 0 ? modalOpenClassName : "");
    }
  );
  return {
    ...modalManagerPlugin,
    dispose
  };
};
const useModalManager = (modalOpen, initialValue) => {
  const { pushRegistry, pushStack, removeStack, stack, dispose, countStack } = useSharedModalStack();
  const currentModal = getCurrentInstance$1();
  if (!currentModal || currentModal.type.__name !== "BModal") {
    throw new Error("useModalManager must only use in BModal component");
  }
  pushRegistry?.(currentModal);
  tryOnScopeDispose(() => {
    dispose(currentModal);
  });
  const setInStack = (newValue, oldValue) => {
    if (newValue) {
      pushStack?.(currentModal);
    } else if (oldValue && !newValue) {
      removeStack?.(currentModal);
    }
  };
  setInStack(initialValue, initialValue);
  watch(modalOpen, setInStack);
  return {
    activePosition: computed(
      () => stack?.value.findIndex((el) => toValue(el.exposed?.id) === toValue(currentModal.exposed?.id))
    ),
    activeModalCount: countStack,
    stackWithoutSelf: computed(
      () => stack?.value.filter(
        (el) => toValue(el.exposed?.id) !== toValue(currentModal.exposed?.id)
      ) ?? []
    )
  };
};
const _hoisted_1$b = ["id", "aria-labelledby", "aria-describedby"];
const _hoisted_2$b = ["id"];
const fallbackClassSelector = "modal-fallback-focus";
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "BModal",
  props: /* @__PURE__ */ mergeModels({
    focus: { type: [String, Boolean, Object, null], default: void 0 },
    backdropFirst: { type: Boolean, default: false },
    body: { default: void 0 },
    bodyAttrs: { default: void 0 },
    bodyBgVariant: { default: null },
    bodyClass: { default: null },
    bodyScrolling: { type: Boolean, default: false },
    bodyTextVariant: { default: null },
    bodyVariant: { default: null },
    busy: { type: Boolean, default: false },
    buttonSize: { default: "md" },
    cancelClass: { default: void 0 },
    cancelDisabled: { type: Boolean, default: false },
    cancelTitle: { default: "Cancel" },
    cancelVariant: { default: "secondary" },
    centered: { type: Boolean, default: false },
    contentClass: { default: void 0 },
    dialogClass: { default: void 0 },
    footerBgVariant: { default: null },
    footerBorderVariant: { default: null },
    footerClass: { default: void 0 },
    footerTextVariant: { default: null },
    footerVariant: { default: null },
    fullscreen: { type: [Boolean, String], default: false },
    headerAttrs: { default: void 0 },
    headerBgVariant: { default: null },
    headerBorderVariant: { default: null },
    headerClass: { default: void 0 },
    headerCloseClass: { default: void 0 },
    headerCloseLabel: { default: "Close" },
    headerCloseVariant: { default: "secondary" },
    headerTextVariant: { default: null },
    headerVariant: { default: null },
    noBackdrop: { type: Boolean, default: false },
    noFooter: { type: Boolean, default: false },
    noHeader: { type: Boolean, default: false },
    noHeaderClose: { type: Boolean, default: false },
    id: { default: void 0 },
    modalClass: { default: void 0 },
    noCloseOnBackdrop: { type: Boolean, default: false },
    noCloseOnEsc: { type: Boolean, default: false },
    noTrap: { type: Boolean, default: false },
    noStacking: { type: Boolean },
    okClass: { default: void 0 },
    okDisabled: { type: Boolean, default: false },
    okOnly: { type: Boolean, default: false },
    okTitle: { default: "OK" },
    okVariant: { default: "primary" },
    scrollable: { type: Boolean, default: false },
    size: { default: "md" },
    title: { default: void 0 },
    titleClass: { default: void 0 },
    titleVisuallyHidden: { type: Boolean, default: false },
    titleTag: { default: "h5" },
    teleportDisabled: { type: Boolean, default: false },
    teleportTo: { default: "body" },
    initialAnimation: { type: Boolean, default: false },
    noAnimation: { type: Boolean },
    noFade: { type: Boolean, default: false },
    lazy: { type: Boolean, default: false },
    unmountLazy: { type: Boolean, default: false },
    show: { type: Boolean, default: false },
    transProps: { default: void 0 },
    visible: { type: Boolean, default: false }
  }, {
    "modelValue": { type: Boolean, ...{ default: false } },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["backdrop", "close", "esc", "hide", "hide-prevented", "hidden", "show", "show-prevented", "shown", "toggle", "toggle-prevented", "cancel", "ok"], ["update:modelValue"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const props = useDefaults(_props, "BModal");
    const emit = __emit;
    const slots = useSlots();
    const computedId = useId(() => props.id, "modal");
    const modelValue = useModel(__props, "modelValue");
    const element = useTemplateRef("_element");
    const fallbackFocusElement = useTemplateRef("_fallbackFocusElement");
    const okButton = useTemplateRef("_okButton");
    const cancelButton = useTemplateRef("_cancelButton");
    const closeButton = useTemplateRef("_closeButton");
    const pickFocusItem = () => {
      if (props.focus && typeof props.focus !== "boolean") {
        if (props.focus === "ok") {
          return okButton;
        } else if (props.focus === "close") {
          return closeButton;
        } else if (props.focus === "cancel") {
          return cancelButton;
        }
        return getElement(props.focus, element.value ?? void 0) ?? element.value;
      }
      return element;
    };
    let activeElement = null;
    const onAfterEnter = () => {
      if (props.noTrap && props.focus !== false) {
        activeElement = document.activeElement;
        if (activeElement === element.value) {
          activeElement = null;
        }
        const el = unrefElement(pickFocusItem());
        if (!el) return;
        el?.focus();
        if (el.tagName && el.tagName.toLowerCase() === "input" && typeof el.select === "function") {
          el.select();
        }
      }
    };
    const onAfterLeave = () => {
      if (props.noTrap && props.focus !== false && activeElement) {
        activeElement?.focus();
        activeElement = null;
      }
    };
    const {
      showRef,
      renderRef,
      renderBackdropRef,
      hide,
      show,
      toggle,
      computedNoAnimation,
      transitionProps,
      backdropTransitionProps,
      isLeaving,
      isVisible,
      trapActive,
      contentShowing,
      backdropReady,
      backdropVisible
    } = useShowHide(modelValue, props, emit, element, computedId, {
      // addShowClass: false,
      transitionProps: {
        onAfterEnter,
        onAfterLeave
      }
    });
    const { needsFallback } = useActivatedFocusTrap({
      element,
      isActive: trapActive,
      noTrap: () => props.noTrap,
      fallbackFocus: {
        ref: fallbackFocusElement,
        classSelector: fallbackClassSelector
      },
      focus: () => props.focus === false ? false : unrefElement(pickFocusItem()) ?? void 0
      // () => (typeof focus === 'boolean' ? focus : (unrefElement(focus) ?? undefined)),
    });
    onKeyStroke(
      "Escape",
      () => {
        hide("esc");
      },
      { target: element }
    );
    useSafeScrollLock(showRef, () => props.bodyScrolling);
    const hasHeaderCloseSlot = computed(() => !isEmptySlot(slots["header-close"]));
    const modalDialogClasses = computed(() => [
      props.dialogClass,
      {
        "modal-fullscreen": props.fullscreen === true,
        [`modal-fullscreen-${props.fullscreen}-down`]: typeof props.fullscreen === "string",
        [`modal-${props.size}`]: props.size !== "md",
        "modal-dialog-centered": props.centered,
        "modal-dialog-scrollable": props.scrollable
      }
    ]);
    const bodyColorClasses = useColorVariantClasses(() => ({
      bgVariant: props.bodyBgVariant,
      textVariant: props.bodyTextVariant,
      variant: props.bodyVariant
    }));
    const bodyClasses = computed(() => [props.bodyClass, bodyColorClasses.value]);
    const headerColorClasses = useColorVariantClasses(() => ({
      bgVariant: props.headerBgVariant,
      textVariant: props.headerTextVariant,
      variant: props.headerVariant,
      borderVariant: props.headerBorderVariant
    }));
    const headerClasses = computed(() => [props.headerClass, headerColorClasses.value]);
    const headerCloseAttrs = computed(() => ({
      variant: hasHeaderCloseSlot.value ? props.headerCloseVariant : void 0,
      class: props.headerCloseClass
    }));
    const footerColorClasses = useColorVariantClasses(() => ({
      bgVariant: props.footerBgVariant,
      textVariant: props.footerTextVariant,
      variant: props.footerVariant,
      borderVariant: props.footerBorderVariant
    }));
    const footerClasses = computed(() => [props.footerClass, footerColorClasses.value]);
    const titleClasses = computed(() => [
      props.titleClass,
      {
        ["visually-hidden"]: props.titleVisuallyHidden
      }
    ]);
    const disableCancel = computed(() => props.cancelDisabled || props.busy);
    const disableOk = computed(() => props.okDisabled || props.busy);
    const { activePosition, activeModalCount, stackWithoutSelf } = useModalManager(
      showRef,
      modelValue.value
    );
    const sharedClasses = computed(() => ({
      [`stack-position-${activePosition?.value ?? 0}`]: true,
      [`stack-inverse-position-${(activeModalCount?.value ?? 1) - 1 - (activePosition?.value ?? 0)}`]: true
    }));
    watch(stackWithoutSelf, (newValue, oldValue) => {
      if (newValue.length > oldValue.length && showRef.value === true && props.noStacking === true)
        hide();
    });
    const defaultModalDialogZIndex = ref(
      getModalZIndex(element.value ?? (typeof document !== "undefined" ? document.body : void 0))
    );
    onMounted(() => {
      watch(
        renderRef,
        (v) => {
          if (!v) return;
          nextTick(() => {
            if (!element.value) return;
            defaultModalDialogZIndex.value = getModalZIndex(element.value);
          });
        },
        { immediate: true }
      );
    });
    const computedZIndexNumber = computed(
      () => (
        // Make sure that newly opened modals have a higher z-index than currently active ones.
        // All active modals have a z-index of ('defaultZIndex' - 'stackSize' - 'positionInStack').
        //
        // This means inactive modals will already be higher than active ones when opened.
        showRef.value || isLeaving.value ? (
          // Just for reference there is a single frame in which the modal is not active but still has a higher z-index than the active ones due to _when_ it calculates its position. It's a small visual effect
          defaultModalDialogZIndex.value - ((activeModalCount?.value ?? 0) * 2 - (activePosition?.value ?? 0) * 2)
        ) : defaultModalDialogZIndex.value
      )
    );
    const computedZIndex = computed(() => ({
      "z-index": computedZIndexNumber.value,
      "--b-position": activePosition?.value ?? 0,
      "--b-inverse-position": (activeModalCount?.value ?? 1) - 1 - (activePosition?.value ?? 0),
      "--b-count": activeModalCount?.value ?? 0
    }));
    const computedZIndexBackdrop = computed(() => ({
      "z-index": computedZIndexNumber.value - 1,
      "--b-position": activePosition?.value ?? 0,
      "--b-inverse-position": (activeModalCount?.value ?? 1) - 1 - (activePosition?.value ?? 0),
      "--b-count": activeModalCount?.value ?? 0
    }));
    const sharedSlots = computed(() => ({
      id: computedId.value,
      cancel: () => {
        hide("cancel");
      },
      close: () => {
        hide("close");
      },
      hide,
      show,
      toggle,
      ok: () => {
        hide("ok");
      },
      active: showRef.value,
      visible: showRef.value
    }));
    __expose({
      hide,
      id: computedId,
      show,
      toggle,
      visible: showRef
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$i, {
        to: unref(props).teleportTo,
        disabled: unref(props).teleportDisabled
      }, {
        default: withCtx(() => [
          unref(renderRef) || unref(contentShowing) ? (openBlock(), createBlock(Transition, mergeProps({ key: 0 }, unref(transitionProps), {
            appear: modelValue.value || unref(props).visible
          }), {
            default: withCtx(() => [
              withDirectives(createElementVNode("div", mergeProps({
                id: unref(computedId),
                ref: "_element",
                class: ["modal", [
                  unref(props).modalClass,
                  {
                    fade: !unref(computedNoAnimation),
                    show: unref(isVisible),
                    ...sharedClasses.value
                  }
                ]],
                role: "dialog",
                "aria-labelledby": !unref(props).noHeader ? `${unref(computedId)}-label` : void 0,
                "aria-describedby": `${unref(computedId)}-body`,
                tabindex: "-1"
              }, _ctx.$attrs, {
                style: [computedZIndex.value, { "display": "block" }],
                onMousedown: _cache[4] || (_cache[4] = withModifiers(($event) => unref(hide)("backdrop"), ["left", "self"]))
              }), [
                createElementVNode("div", {
                  class: normalizeClass(["modal-dialog", modalDialogClasses.value])
                }, [
                  unref(contentShowing) ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: normalizeClass(["modal-content", unref(props).contentClass])
                  }, [
                    !unref(props).noHeader ? (openBlock(), createElementBlock("div", mergeProps({
                      key: 0,
                      class: ["modal-header", headerClasses.value]
                    }, unref(props).headerAttrs), [
                      renderSlot(_ctx.$slots, "header", normalizeProps(guardReactiveProps(sharedSlots.value)), () => [
                        (openBlock(), createBlock(resolveDynamicComponent(unref(props).titleTag), {
                          id: `${unref(computedId)}-label`,
                          class: normalizeClass(["modal-title", titleClasses.value])
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "title", normalizeProps(guardReactiveProps(sharedSlots.value)), () => [
                              createTextVNode(toDisplayString(unref(props).title), 1)
                            ])
                          ]),
                          _: 3
                        }, 8, ["id", "class"])),
                        !unref(props).noHeaderClose ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                          hasHeaderCloseSlot.value ? (openBlock(), createBlock(_sfc_main$f, mergeProps({
                            key: 0,
                            ref: "_closeButton"
                          }, headerCloseAttrs.value, {
                            onClick: _cache[0] || (_cache[0] = ($event) => unref(hide)("close"))
                          }), {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "header-close", normalizeProps(guardReactiveProps(sharedSlots.value)))
                            ]),
                            _: 3
                          }, 16)) : (openBlock(), createBlock(_sfc_main$e, mergeProps({
                            key: 1,
                            ref: "_closeButton",
                            "aria-label": unref(props).headerCloseLabel
                          }, headerCloseAttrs.value, {
                            onClick: _cache[1] || (_cache[1] = ($event) => unref(hide)("close"))
                          }), null, 16, ["aria-label"]))
                        ], 64)) : createCommentVNode("", true)
                      ])
                    ], 16)) : createCommentVNode("", true),
                    createElementVNode("div", mergeProps({
                      id: `${unref(computedId)}-body`,
                      class: ["modal-body", bodyClasses.value]
                    }, unref(props).bodyAttrs), [
                      renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(sharedSlots.value)), () => [
                        createTextVNode(toDisplayString(unref(props).body), 1)
                      ])
                    ], 16, _hoisted_2$b),
                    !unref(props).noFooter ? (openBlock(), createElementBlock("div", {
                      key: 1,
                      class: normalizeClass(["modal-footer", footerClasses.value])
                    }, [
                      renderSlot(_ctx.$slots, "footer", normalizeProps(guardReactiveProps(sharedSlots.value)), () => [
                        renderSlot(_ctx.$slots, "cancel", normalizeProps(guardReactiveProps(sharedSlots.value)), () => [
                          !unref(props).okOnly ? (openBlock(), createBlock(_sfc_main$f, {
                            key: 0,
                            ref: "_cancelButton",
                            disabled: disableCancel.value,
                            size: unref(props).buttonSize,
                            variant: unref(props).cancelVariant,
                            class: normalizeClass(unref(props).cancelClass),
                            onClick: _cache[2] || (_cache[2] = ($event) => unref(hide)("cancel"))
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(props).cancelTitle), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled", "size", "variant", "class"])) : createCommentVNode("", true)
                        ]),
                        renderSlot(_ctx.$slots, "ok", normalizeProps(guardReactiveProps(sharedSlots.value)), () => [
                          createVNode(_sfc_main$f, {
                            ref: "_okButton",
                            disabled: disableOk.value,
                            size: unref(props).buttonSize,
                            variant: unref(props).okVariant,
                            class: normalizeClass(unref(props).okClass),
                            onClick: _cache[3] || (_cache[3] = ($event) => unref(hide)("ok"))
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(props).okTitle), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled", "size", "variant", "class"])
                        ])
                      ])
                    ], 2)) : createCommentVNode("", true)
                  ], 2)) : createCommentVNode("", true)
                ], 2),
                unref(needsFallback) ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  ref: "_fallbackFocusElement",
                  class: normalizeClass(fallbackClassSelector),
                  tabindex: "0",
                  style: { "width": "0", "height": "0", "overflow": "hidden" }
                }, null, 512)) : createCommentVNode("", true)
              ], 16, _hoisted_1$b), [
                [vShow, unref(showRef) && (unref(backdropReady) && unref(props).backdropFirst || !unref(props).backdropFirst)]
              ])
            ]),
            _: 3
          }, 16, ["appear"])) : createCommentVNode("", true),
          !unref(props).noBackdrop ? renderSlot(_ctx.$slots, "backdrop", normalizeProps(mergeProps({ key: 1 }, sharedSlots.value)), () => [
            unref(renderBackdropRef) ? (openBlock(), createBlock(Transition, normalizeProps(mergeProps({ key: 0 }, unref(backdropTransitionProps))), {
              default: withCtx(() => [
                withDirectives(createElementVNode("div", {
                  class: normalizeClass(["modal-backdrop", {
                    fade: !unref(computedNoAnimation),
                    show: unref(backdropVisible) || unref(computedNoAnimation),
                    ...sharedClasses.value
                  }]),
                  style: normalizeStyle(computedZIndexBackdrop.value),
                  onClick: _cache[5] || (_cache[5] = ($event) => unref(hide)("backdrop"))
                }, null, 6), [
                  [vShow, unref(showRef) || unref(isLeaving) && unref(props).backdropFirst && !unref(computedNoAnimation)]
                ])
              ]),
              _: 1
            }, 16)) : createCommentVNode("", true)
          ]) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["to", "disabled"]);
    };
  }
});
const useRegistry = (rtl = false) => {
  const showHideStorage = inject(showHideRegistryKey, void 0);
  if (!showHideStorage) {
    const { register, values: values2 } = _newShowHideRegistry();
    provide(showHideRegistryKey, { register, values: values2 });
  }
  const modalManager = inject(modalManagerKey, void 0);
  if (!modalManager) {
    const stack = ref(/* @__PURE__ */ new Map());
    const countStack = computed(() => stack.value.size);
    const valuesStack = computed(() => [...stack.value.values()]);
    const lastStack = computed(() => valuesStack.value[valuesStack.value.length - 1]);
    const pushStack = (modal) => {
      stack.value.set(modal.uid, modal);
    };
    const removeStack = (modal) => {
      stack.value.delete(modal.uid);
    };
    const registry = ref(/* @__PURE__ */ new Map());
    const pushRegistry = (modal) => {
      registry.value.set(modal.uid, modal);
    };
    const removeRegistry = (modal) => {
      registry.value.delete(modal.uid);
    };
    provide(modalManagerKey, {
      countStack,
      lastStack,
      registry: computed(() => registry.value),
      stack: valuesStack,
      pushStack,
      removeStack,
      pushRegistry,
      removeRegistry
    });
  }
  const breadcrumb = inject(breadcrumbRegistryKey, void 0);
  if (!breadcrumb) {
    const items = ref({
      [breadcrumbGlobalIndexKey]: []
    });
    const reset = (key = breadcrumbGlobalIndexKey) => {
      items.value[key] = [];
    };
    provide(breadcrumbRegistryKey, { items, reset });
  }
  const rtlRegistry = inject(rtlRegistryKey, void 0);
  if (!rtlRegistry) {
    const rtlDefault = false;
    const localeDefault = void 0;
    const rtlInitial = typeof rtl === "boolean" ? rtlDefault : rtl?.rtlInitial ?? rtlDefault;
    const localeInitial = typeof rtl === "boolean" ? localeDefault : rtl?.localeInitial ?? localeDefault;
    const isRtl = ref(rtlInitial);
    const locale = ref(localeInitial);
    provide(rtlRegistryKey, { isRtl, locale });
  }
};
const _newShowHideRegistry = () => {
  const values2 = ref(/* @__PURE__ */ new Map());
  const register = ({
    id,
    component,
    value,
    toggle,
    show,
    hide,
    registerTrigger,
    unregisterTrigger
  }) => {
    values2.value.set(id, {
      id,
      component,
      value: readonly(value),
      toggle,
      show,
      hide,
      registerTrigger,
      unregisterTrigger
    });
    return {
      unregister() {
        values2.value.delete(id);
      },
      updateId(newId, oldId) {
        const existingValue = values2.value.get(oldId);
        if (existingValue) {
          values2.value.set(newId, { ...existingValue, id: newId });
          values2.value.delete(oldId);
        }
      }
    };
  };
  return {
    register,
    values: values2
  };
};
const useProvideDefaults = (defaults, mergeDefaults) => {
  const injectedDefaults = inject(defaultsKey, void 0);
  const mergedDefaults = computed(() => {
    const _defaults = unref(defaults);
    if (!injectedDefaults) {
      return _defaults ?? {};
    }
    const merged = { ...injectedDefaults.value };
    if (_defaults) {
      if (mergeDefaults) {
        if (typeof mergeDefaults === "function") {
          return mergeDefaults(merged, _defaults);
        } else if (mergeDefaults === true) {
          return deepMerge(merged, _defaults);
        }
        return Object.assign(merged, _defaults);
      }
      return _defaults;
    }
    return merged;
  });
  provide(defaultsKey, mergedDefaults);
};
function isPlainObject(value) {
  return value !== null && typeof value === "object" && value.constructor === Object && Object.prototype.toString.call(value) === "[object Object]";
}
function deepMerge(target, source, visited = /* @__PURE__ */ new WeakSet()) {
  if (visited.has(source)) {
    return target;
  }
  visited.add(source);
  const result = { ...target };
  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = target[key];
    if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
      result[key] = deepMerge(
        targetValue,
        sourceValue,
        visited
      );
    } else if (Array.isArray(sourceValue)) {
      result[key] = [...sourceValue];
    } else {
      result[key] = sourceValue;
    }
  }
  return result;
}
const positionClasses = {
  "top-start": "top-0 start-0",
  "top-center": "top-0 start-50 translate-middle-x",
  "top-end": "top-0 end-0",
  "middle-start": "top-50 start-0 translate-middle-y",
  "middle-center": "top-50 start-50 translate-middle",
  "middle-end": "top-50 end-0 translate-middle-y",
  "bottom-start": "bottom-0 start-0",
  "bottom-center": "bottom-0 start-50 translate-middle-x",
  "bottom-end": "bottom-0 end-0"
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "BOrchestrator",
  props: {
    noPopovers: { type: Boolean, default: false },
    noToasts: { type: Boolean, default: false },
    noModals: { type: Boolean, default: false },
    appendToast: { type: Boolean, default: false },
    teleportTo: {},
    filter: { type: Function, default: () => true }
  },
  setup(__props) {
    function setEventOk(event) {
      event.ok = event.trigger === "ok" ? true : event.trigger === "cancel" ? false : null;
    }
    const props = __props;
    const orchestratorRegistry = inject(orchestratorRegistryKey);
    if (orchestratorRegistry) {
      if (!orchestratorRegistry._isOrchestratorInstalled.value) {
        orchestratorRegistry._isOrchestratorInstalled.value = true;
      }
    } else {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[BOrchestrator] The orchestrator registry not found. Please use BApp, useRegistry or provide the plugin."
        );
      }
    }
    watch(
      () => props.appendToast,
      (value) => {
        if (orchestratorRegistry && value !== void 0) {
          orchestratorRegistry._isToastAppend.value = value;
        }
      },
      { immediate: true }
    );
    const ComputedPositionClasses = computed(() => {
      const positionsActive = items.value?.reduce(
        (acc, item) => {
          if (item.position) {
            acc[item.position] = true;
          }
          return acc;
        },
        {}
      );
      const classes = {};
      for (const position in positionClasses) {
        if (positionsActive?.[position]) {
          classes[position] = {
            class: `${positionClasses[position]} toast-container position-fixed p-3`,
            style: "width: calc(var(--bs-toast-max-width, 350px) + var(--bs-toast-padding-x, 1rem) * 2)"
          };
        }
      }
      if (positionsActive?.["modal"]) {
        classes["modal"] = {
          class: "",
          style: ""
        };
      }
      if (positionsActive?.["popover"]) {
        classes["popover"] = {
          class: "",
          style: ""
        };
      }
      return classes;
    });
    const items = computed(() => {
      const store = orchestratorRegistry?.store.value ?? [];
      return store.filter((el) => !props.noPopovers || el.type !== "popover").filter((el) => !props.noToasts || el.type !== "toast").filter((el) => !props.noModals || el.type !== "modal").filter(props.filter);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$i, {
        to: _ctx.teleportTo,
        disabled: !_ctx.teleportTo
      }, {
        default: withCtx(() => [
          createElementVNode("div", mergeProps({ class: "orchestrator-container" }, _ctx.$attrs), [
            (openBlock(true), createElementBlock(Fragment, null, renderList(ComputedPositionClasses.value, (value, key) => {
              return openBlock(), createElementBlock("div", {
                key,
                class: normalizeClass(value.class),
                style: normalizeStyle(value.style)
              }, [
                createVNode(TransitionGroup, {
                  name: items.value?.filter((el) => el.position === key)?.some((el) => el.type === "toast") ? "b-list" : void 0
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(items.value?.filter((el) => el.position === key) || [], ({
                      _self,
                      type,
                      position,
                      slots,
                      promise,
                      options,
                      _component,
                      ...val
                    }) => {
                      return openBlock(), createElementBlock("span", { key: _self }, [
                        (openBlock(), createBlock(resolveDynamicComponent(_component), mergeProps({ ref_for: true }, val, {
                          ref_for: true,
                          ref: (ref2) => promise.value.ref = ref2,
                          "initial-animation": "",
                          "teleport-disabled": true,
                          onHide: (e) => {
                            setEventOk(e);
                            val.onHide?.(e);
                            if (e.defaultPrevented) {
                              return;
                            }
                            promise.stop?.();
                            if (options?.resolveOnHide) {
                              promise.resolve(e);
                            }
                          },
                          onHidden: (e) => {
                            setEventOk(e);
                            val.onHidden?.(e);
                            if (e.defaultPrevented) {
                              return;
                            }
                            if (!options?.resolveOnHide) {
                              promise.resolve(e);
                            }
                            if (!options?.keep) {
                              promise.value.destroy?.();
                            }
                          }
                        }), createSlots({ _: 2 }, [
                          renderList(slots, (comp, slot) => {
                            return {
                              name: slot,
                              fn: withCtx((scope) => [
                                (openBlock(), createBlock(resolveDynamicComponent(comp), mergeProps({ ref_for: true }, scope), null, 16))
                              ])
                            };
                          })
                        ]), 1040, ["onHide", "onHidden"]))
                      ]);
                    }), 128))
                  ]),
                  _: 2
                }, 1032, ["name"])
              ], 6);
            }), 128))
          ], 16)
        ]),
        _: 1
      }, 8, ["to", "disabled"]);
    };
  }
});
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "BApp",
  props: {
    defaults: { default: void 0 },
    mergeDefaults: { type: [Boolean, Function], default: false },
    teleportTo: { default: void 0 },
    noOrchestrator: { type: Boolean, default: false },
    appendToast: { type: Boolean, default: false },
    rtl: { type: [Boolean, Object], default: false }
  },
  setup(__props) {
    const props = __props;
    useProvideDefaults(
      toRef$1(() => props.defaults),
      props.mergeDefaults
    );
    useRegistry(props.rtl);
    if (!props.noOrchestrator) {
      useOrchestratorRegistry();
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        !_ctx.noOrchestrator ? (openBlock(), createBlock(_sfc_main$c, {
          key: 0,
          "append-toast": _ctx.appendToast,
          "teleport-to": _ctx.teleportTo
        }, null, 8, ["append-toast", "teleport-to"])) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(_ctx.$attrs)))
      ], 64);
    };
  }
});
const bvKey = "bootstrap-vue-next";
const parseActiveImports = (options, values2) => {
  const { all, ...others } = options;
  const valuesCopy = {};
  if (all) {
    values2.forEach((el) => {
      valuesCopy[el] = all;
    });
  }
  const merge = { ...valuesCopy, ...others };
  return Object.entries(merge).filter(([name, value]) => !!value && values2.includes(name)).map(([name]) => name);
};
const usedComponents = /* @__PURE__ */ new Set();
const usedDirectives = /* @__PURE__ */ new Set();
Object.assign(
  ({
    aliases = {},
    directives = true,
    components = true
  } = {}) => {
    const selectedComponents = typeof components === "boolean" ? { all: components } : components;
    const compImports = parseActiveImports(selectedComponents, componentNames).reduce(
      (map, name) => {
        map.set(name, `${bvKey}${componentsWithExternalPath[name]}`);
        return map;
      },
      /* @__PURE__ */ new Map()
    );
    const selectedDirectives = typeof directives === "boolean" ? { all: directives } : directives;
    const dirImports = parseActiveImports(selectedDirectives, directiveNames).reduce(
      (map, directive) => {
        const key = directive.toLowerCase().startsWith("v") ? directive : `v${directive}`;
        map.set(key, `${bvKey}${directivesWithExternalPath[key]}`);
        return map;
      },
      /* @__PURE__ */ new Map()
    );
    const resolvers = [
      {
        type: "component",
        resolve(name) {
          const destination = compImports.get(name);
          const aliasDestination = compImports.get(aliases[name]);
          if (aliasDestination) {
            const val = aliases[name];
            usedComponents.add(val);
            return {
              name: val,
              from: aliasDestination
            };
          }
          if (destination) {
            usedComponents.add(name);
            return {
              name,
              from: destination
            };
          }
        }
      },
      {
        type: "directive",
        resolve(name) {
          const prefixedName = `v${name}`;
          const destination = dirImports.get(prefixedName);
          if (destination) {
            usedDirectives.add(prefixedName);
            return {
              name: prefixedName,
              from: destination
            };
          }
        }
      }
    ];
    return resolvers;
  },
  {
    __usedComponents: usedComponents,
    __usedDirectives: usedDirectives
  }
);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "CssEditor",
  props: /* @__PURE__ */ mergeModels({
    modelValue: {},
    autoFocus: { type: Boolean, default: false }
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emits = __emit;
    const value = useModel(__props, "modelValue");
    const wrapper = ref(null);
    const editor = ref(null);
    let cm;
    const css2 = ref("");
    const show = ref(false);
    const options = ref({});
    let firstLoad = false;
    onMounted(async () => {
      const { CodeMirror, CodeMirrorOptions: CodeMirrorOptions2 } = await useCodeMirror();
      options.value = CodeMirrorOptions2;
      setTimeout(() => {
        cm = CodeMirror(editor.value, options.value);
        cm.setValue(css2.value);
        cm.on("change", (cm2, co) => {
          css2.value = cm2.getValue();
        });
        if (props.autoFocus) {
          setTimeout(() => cm.focus(), 500);
        }
      }, 100);
    });
    watch(value, (v) => {
      css2.value = v || "";
      if (cm && cm.getValue() !== v) {
        cm.setValue(v || "");
      }
    }, { immediate: true });
    watch(css2, (v) => {
      emits("update:modelValue", v);
    });
    const __returned__ = { props, emits, value, wrapper, editor, get cm() {
      return cm;
    }, set cm(v) {
      cm = v;
    }, css: css2, show, options, get firstLoad() {
      return firstLoad;
    }, set firstLoad(v) {
      firstLoad = v;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$a = { ref: "wrapper" };
const _hoisted_2$a = { ref: "editor" };
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$a, [
    createElementVNode("div", _hoisted_2$a, null, 512)
  ], 512);
}
const CssEditor = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__file", "CssEditor.vue"]]);
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "Animations",
  props: /* @__PURE__ */ mergeModels({
    id: {}
  }, {
    "modelValue": {
      required: true
    },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const animation = useModel(__props, "modelValue");
    function getAnimations() {
      return [
        "fadeIn",
        "fadeInDown",
        "fadeInDownBig",
        "fadeInLeft",
        "fadeInLeftBig",
        "fadeInRight",
        "fadeInRightBig",
        "fadeInUp",
        "fadeInUpBig",
        "flip",
        "flipInX",
        "flipInY",
        "rotateIn",
        "rotateInDownLeft",
        "rotateInDownRight",
        "rotateInUpLeft",
        "rotateInUpRight",
        "zoomIn",
        "zoomInDown",
        "zoomInLeft",
        "zoomInRight",
        "zoomInUp",
        "bounceIn",
        "bounceInDown",
        "bounceInLeft",
        "bounceInRight",
        "bounceInUp"
      ];
    }
    const __returned__ = { props, animation, getAnimations };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$9 = { class: "cation-selector" };
const _hoisted_2$9 = { class: "form-group mb-3" };
const _hoisted_3$9 = ["for"];
const _hoisted_4$9 = ["id"];
const _hoisted_5$9 = ["value"];
const _hoisted_6$9 = { class: "form-group mb-3" };
const _hoisted_7$9 = ["for"];
const _hoisted_8$9 = ["id"];
const _hoisted_9$9 = { class: "form-group mb-3" };
const _hoisted_10$9 = ["for"];
const _hoisted_11$8 = ["id"];
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$9, [
    createElementVNode("div", _hoisted_2$9, [
      createElementVNode("label", {
        for: $setup.props.id + "-name"
      }, "Animation Name", 8, _hoisted_3$9),
      _cache[5] || (_cache[5] = createTextVNode()),
      withDirectives(createElementVNode("select", {
        id: $setup.props.id + "-name",
        class: "form-select custom-select",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.animation.name = $event)
      }, [
        _cache[3] || (_cache[3] = createElementVNode("option", { value: "" }, "None", -1)),
        _cache[4] || (_cache[4] = createTextVNode()),
        (openBlock(true), createElementBlock(Fragment, null, renderList($setup.getAnimations(), (anim) => {
          return openBlock(), createElementBlock("option", { value: anim }, toDisplayString(anim), 9, _hoisted_5$9);
        }), 256))
      ], 8, _hoisted_4$9), [
        [vModelSelect, $setup.animation.name]
      ])
    ]),
    _cache[12] || (_cache[12] = createTextVNode()),
    createElementVNode("div", _hoisted_6$9, [
      createElementVNode("label", {
        for: $setup.props.id + "-duration"
      }, "Animation Duration", 8, _hoisted_7$9),
      _cache[6] || (_cache[6] = createTextVNode()),
      withDirectives(createElementVNode("input", {
        type: "number",
        id: $setup.props.id + "-duration",
        class: "form-control",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.animation.duration = $event),
        min: "0"
      }, null, 8, _hoisted_8$9), [
        [vModelText, $setup.animation.duration]
      ]),
      _cache[7] || (_cache[7] = createTextVNode()),
      _cache[8] || (_cache[8] = createElementVNode("small", { class: "form-text text-muted" }, '\r\n        The duration of this animation. The unit is "ms" (1/1000 seconds)\r\n      ', -1))
    ]),
    _cache[13] || (_cache[13] = createTextVNode()),
    createElementVNode("div", _hoisted_9$9, [
      createElementVNode("label", {
        for: $setup.props.id + "-delay"
      }, "Delay Time", 8, _hoisted_10$9),
      _cache[9] || (_cache[9] = createTextVNode()),
      withDirectives(createElementVNode("input", {
        type: "number",
        id: $setup.props.id + "-delay",
        class: "form-control",
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.animation.delay = $event),
        min: "0"
      }, null, 8, _hoisted_11$8), [
        [vModelText, $setup.animation.delay]
      ]),
      _cache[10] || (_cache[10] = createTextVNode()),
      _cache[11] || (_cache[11] = createElementVNode("small", { class: "form-text text-muted" }, '\r\n        Delay a while to start animation. The unit is "ms" (1/1000 seconds)\r\n      ', -1))
    ])
  ]);
}
const Animations = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__file", "Animations.vue"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Gradient",
  props: /* @__PURE__ */ mergeModels({
    id: {}
  }, {
    "modelValue": {
      required: true
    },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["update.value"], ["update:modelValue"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const gradient = useModel(__props, "modelValue");
    const backgroundImage = computed(() => {
      const { type, angle, start_color, start_pos, end_color, end_pos } = gradient.value;
      if (type === "linear") {
        return `${type}-gradient(${angle || 0}deg, ${start_color} ${start_pos}%, ${end_color} ${end_pos}%)`;
      }
      return `${type}-gradient(${start_color} ${start_pos}%, ${end_color} ${end_pos}%)`;
    });
    const __returned__ = { props, emit, gradient, backgroundImage, ColorInput, SliderInput };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$8 = { class: "c-box-offset" };
const _hoisted_2$8 = { class: "form-row row" };
const _hoisted_3$8 = { class: "col-6" };
const _hoisted_4$8 = { class: "form-group mb-3" };
const _hoisted_5$8 = ["for"];
const _hoisted_6$8 = { class: "form-group mb-3" };
const _hoisted_7$8 = ["for"];
const _hoisted_8$8 = { class: "col-6" };
const _hoisted_9$8 = { class: "form-group mb-3" };
const _hoisted_10$8 = ["for"];
const _hoisted_11$7 = { class: "form-group mb-3" };
const _hoisted_12$7 = ["for"];
const _hoisted_13$7 = { class: "row" };
const _hoisted_14$7 = { class: "col-6" };
const _hoisted_15$7 = { class: "form-group mb-3" };
const _hoisted_16$7 = ["for"];
const _hoisted_17$6 = ["id"];
const _hoisted_18$4 = { class: "col-6" };
const _hoisted_19$4 = { class: "form-group mb-3" };
const _hoisted_20$4 = ["for"];
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$8, [
    createElementVNode("div", {
      class: "c-gradient-preview mb-3",
      style: normalizeStyle([{ "height": "100px", "border": "1px solid rgba(0, 0, 0, .2)" }, { "background-image": $setup.backgroundImage }])
    }, null, 4),
    _cache[17] || (_cache[17] = createTextVNode()),
    createElementVNode("div", _hoisted_2$8, [
      createElementVNode("div", _hoisted_3$8, [
        createElementVNode("div", _hoisted_4$8, [
          createElementVNode("label", {
            for: $props.id + "-color1"
          }, "Color 1", 8, _hoisted_5$8),
          _cache[6] || (_cache[6] = createTextVNode()),
          createVNode($setup["ColorInput"], {
            id: $props.id + "-color1",
            modelValue: $setup.gradient.start_color,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.gradient.start_color = $event),
            modelModifiers: { lazy: true },
            class: "form-control"
          }, null, 8, ["id", "modelValue"])
        ]),
        _cache[8] || (_cache[8] = createTextVNode()),
        createElementVNode("div", _hoisted_6$8, [
          createElementVNode("label", {
            for: $props.id + "-color1-pos"
          }, "Color 1 Position", 8, _hoisted_7$8),
          _cache[7] || (_cache[7] = createTextVNode()),
          createVNode($setup["SliderInput"], {
            modelValue: $setup.gradient.start_pos,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.gradient.start_pos = $event)
          }, null, 8, ["modelValue"])
        ])
      ]),
      _cache[12] || (_cache[12] = createTextVNode()),
      createElementVNode("div", _hoisted_8$8, [
        createElementVNode("div", _hoisted_9$8, [
          createElementVNode("label", {
            for: $props.id + "-color2"
          }, "Color 2", 8, _hoisted_10$8),
          _cache[9] || (_cache[9] = createTextVNode()),
          createVNode($setup["ColorInput"], {
            id: $props.id + "-color2",
            modelValue: $setup.gradient.end_color,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.gradient.end_color = $event),
            modelModifiers: { lazy: true },
            class: "form-control"
          }, null, 8, ["id", "modelValue"])
        ]),
        _cache[11] || (_cache[11] = createTextVNode()),
        createElementVNode("div", _hoisted_11$7, [
          createElementVNode("label", {
            for: $props.id + "-color2-pos"
          }, "Color 2 Position", 8, _hoisted_12$7),
          _cache[10] || (_cache[10] = createTextVNode()),
          createVNode($setup["SliderInput"], {
            modelValue: $setup.gradient.end_pos,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.gradient.end_pos = $event)
          }, null, 8, ["modelValue"])
        ])
      ])
    ]),
    _cache[18] || (_cache[18] = createTextVNode()),
    createElementVNode("div", _hoisted_13$7, [
      createElementVNode("div", _hoisted_14$7, [
        createElementVNode("div", _hoisted_15$7, [
          createElementVNode("label", {
            for: $props.id + "-type"
          }, "Gradient Type", 8, _hoisted_16$7),
          _cache[14] || (_cache[14] = createTextVNode()),
          withDirectives(createElementVNode("select", {
            id: $props.id + "-type",
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.gradient.type = $event),
            class: "form-select custom-select"
          }, [..._cache[13] || (_cache[13] = [
            createElementVNode("option", { value: "linear" }, "Linear", -1),
            createTextVNode(),
            createElementVNode("option", { value: "radial" }, "Radial", -1)
          ])], 8, _hoisted_17$6), [
            [
              vModelSelect,
              $setup.gradient.type,
              void 0,
              { lazy: true }
            ]
          ])
        ])
      ]),
      _cache[16] || (_cache[16] = createTextVNode()),
      createElementVNode("div", _hoisted_18$4, [
        createElementVNode("div", _hoisted_19$4, [
          createElementVNode("label", {
            for: $props.id + "-angle"
          }, "Angle", 8, _hoisted_20$4),
          _cache[15] || (_cache[15] = createTextVNode()),
          createVNode($setup["SliderInput"], {
            id: $props.id + "-angle",
            modelValue: $setup.gradient.angle,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.gradient.angle = $event),
            max: 360,
            disabled: $setup.gradient.type !== "linear"
          }, null, 8, ["id", "modelValue", "disabled"])
        ])
      ])
    ])
  ]);
}
const Gradient = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__file", "Gradient.vue"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "AddonEdit",
  setup(__props, { expose: __expose }) {
    const { saving, addonBasicOptions, savePage: doSavePage } = usePageBuilderUtilities();
    const u2 = useUnicorn();
    const content = ref();
    const modalShow = ref(false);
    const tab = ref();
    const currentTab = ref("general");
    onMounted(() => {
    });
    function edit(data2) {
      const editData = JSON.parse(JSON.stringify(data2));
      editData.options = defaultsDeep(editData.options, addonBasicOptions());
      editData.disabled = false;
      dataMigration(editData);
      modalShow.value = true;
      nextTick(() => {
        content.value = editData;
        tab.value?.addEventListener("shown.bs.tab", () => {
          updateCurrentTab();
        });
        updateCurrentTab();
      });
    }
    __expose({
      edit
    });
    function updateCurrentTab() {
      if (!tab.value) {
        return;
      }
      const active = tab.value.querySelector("a.nav-link.active");
      if (active) {
        currentTab.value = active.getAttribute("href")?.replace("#addon-edit-", "") || "general";
      }
    }
    useEventListener$1("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s" && modalShow.value) {
        event.preventDefault();
        savePage();
      }
    });
    function saveClose() {
      u2.trigger("addon:save", JSON.parse(JSON.stringify(content.value)));
      close();
    }
    async function savePage() {
      u2.trigger("addon:save", JSON.parse(JSON.stringify(content.value)));
      await nextTick();
      return await doSavePage();
    }
    function close() {
      modalShow.value = false;
      setTimeout(() => {
        content.value = void 0;
      }, 400);
    }
    function dataMigration(data2) {
      const video = data2.options.background.video;
      if (typeof video === "string") {
        data2.options.background.video = { url: video, overlay: "" };
      }
    }
    const options = computed(() => content.value?.options);
    const __returned__ = { saving, addonBasicOptions, doSavePage, u: u2, content, modalShow, tab, currentTab, edit, updateCurrentTab, saveClose, savePage, close, dataMigration, options, get BModal() {
      return _sfc_main$d;
    }, CssEditor, Animations, BoxOffset, ButtonRadio, ColorInput, Gradient, SingleImage, UnicornSwitcher };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$7 = {
  ref: "tab",
  class: "nav nav-pills border-0"
};
const _hoisted_2$7 = { class: "nav-item" };
const _hoisted_3$7 = {
  ref: "generalTab",
  class: "nav-link active",
  "data-toggle": "tab",
  "data-bs-toggle": "tab",
  href: "#addon-edit-general"
};
const _hoisted_4$7 = { class: "ml-auto ms-auto" };
const _hoisted_5$7 = ["disabled"];
const _hoisted_6$7 = {
  key: 0,
  class: "tab-content",
  id: "addon-edit-tab-content"
};
const _hoisted_7$7 = {
  class: "tab-pane fade show active",
  id: "addon-edit-general",
  role: "tabpanel",
  "aria-labelledby": "addon-edit-general-tab"
};
const _hoisted_8$7 = { class: "form-group mb-3" };
const _hoisted_9$7 = { class: "form-group mb-3" };
const _hoisted_10$7 = {
  class: "tab-pane fade",
  id: "addon-edit-layout",
  role: "tabpanel",
  "aria-labelledby": "addon-edit-layout-tab"
};
const _hoisted_11$6 = { class: "form-group mb-3" };
const _hoisted_12$6 = { class: "form-group mb-3" };
const _hoisted_13$6 = { class: "mt-2" };
const _hoisted_14$6 = {
  key: 0,
  class: "form-group mb-3"
};
const _hoisted_15$6 = {
  key: 0,
  style: { "animation-duration": ".3s" }
};
const _hoisted_16$6 = { class: "form-group mb-3" };
const _hoisted_17$5 = { class: "form-row row" };
const _hoisted_18$3 = { class: "form-group mb-3 col-md-6" };
const _hoisted_19$3 = { class: "form-group mb-3 col-md-6" };
const _hoisted_20$3 = { class: "form-row row" };
const _hoisted_21$3 = { class: "form-group mb-3 col-md-6" };
const _hoisted_22$2 = { class: "form-group mb-3 col-md-6" };
const _hoisted_23$2 = {
  key: 0,
  style: { "animation-duration": ".3s" }
};
const _hoisted_24$2 = { class: "form-group mb-3" };
const _hoisted_25$2 = {
  key: 0,
  style: { "animation-duration": ".3s" }
};
const _hoisted_26$2 = { class: "form-group mb-3" };
const _hoisted_27$2 = { class: "form-group mb-3" };
const _hoisted_28$2 = { class: "form-group mb-3" };
const _hoisted_29$2 = { class: "form-group mb-3" };
const _hoisted_30$2 = { class: "form-group mb-3" };
const _hoisted_31$2 = { class: "form-group mb-3" };
const _hoisted_32$2 = { class: "text-muted small mb-3" };
const _hoisted_33$2 = { key: 0 };
const _hoisted_34$2 = {
  class: "tab-pane fade",
  id: "addon-edit-animation",
  role: "tabpanel",
  "aria-labelledby": "addon-edit-animation-tab"
};
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createVNode($setup["BModal"], {
      "model-value": $setup.modalShow,
      size: "lg",
      onHidden: _cache[27] || (_cache[27] = ($event) => $setup.modalShow = false),
      backdrop: "static",
      class: "c-modal-addon-edit",
      lazy: "",
      "unmount-lazy": "",
      "no-trap": "",
      "header-class": "bg-white sticky-top"
    }, {
      header: withCtx(() => [
        createElementVNode("ul", _hoisted_1$7, [
          createElementVNode("li", _hoisted_2$7, [
            createElementVNode("a", _hoisted_3$7, "\r\n              General\r\n            ", 512)
          ]),
          _cache[28] || (_cache[28] = createTextVNode()),
          _cache[29] || (_cache[29] = createElementVNode("li", { class: "nav-item" }, [
            createElementVNode("a", {
              class: "nav-link",
              "data-toggle": "tab",
              "data-bs-toggle": "tab",
              href: "#addon-edit-layout"
            }, "\r\n              Layout\r\n            ")
          ], -1)),
          _cache[30] || (_cache[30] = createTextVNode()),
          _cache[31] || (_cache[31] = createElementVNode("li", { class: "nav-item" }, [
            createElementVNode("a", {
              class: "nav-link",
              "data-toggle": "tab",
              "data-bs-toggle": "tab",
              href: "#addon-edit-animation"
            }, "\r\n              Animation\r\n            ")
          ], -1))
        ], 512),
        _cache[37] || (_cache[37] = createTextVNode()),
        createElementVNode("div", _hoisted_4$7, [
          createElementVNode("button", {
            type: "button",
            class: "btn btn-primary",
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.saveClose())
          }, [..._cache[32] || (_cache[32] = [
            createElementVNode("span", { class: "fa fa-check" }, null, -1),
            createTextVNode("\r\n            Done\r\n          ", -1)
          ])]),
          _cache[35] || (_cache[35] = createTextVNode()),
          createElementVNode("button", {
            type: "button",
            class: "btn btn-success",
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.savePage()),
            disabled: $setup.saving
          }, [
            createElementVNode("span", {
              class: normalizeClass($setup.saving ? "spinner-border spinner-border-sm" : "fa fa-save")
            }, null, 2),
            _cache[33] || (_cache[33] = createTextVNode("\r\n            Save Page\r\n          ", -1))
          ], 8, _hoisted_5$7),
          _cache[36] || (_cache[36] = createTextVNode()),
          createElementVNode("button", {
            type: "button",
            class: "btn btn-secondary",
            onClick: _cache[2] || (_cache[2] = ($event) => $setup.close())
          }, [..._cache[34] || (_cache[34] = [
            createElementVNode("span", { class: "fa fa-times" }, null, -1)
          ])])
        ])
      ]),
      footer: withCtx(() => [
        createElementVNode("button", {
          type: "button",
          class: "btn btn-success",
          onClick: _cache[25] || (_cache[25] = ($event) => $setup.saveClose())
        }, [..._cache[109] || (_cache[109] = [
          createElementVNode("span", { class: "fa fa-save" }, null, -1),
          createTextVNode("\r\n          Save\r\n        ", -1)
        ])]),
        _cache[111] || (_cache[111] = createTextVNode()),
        createElementVNode("button", {
          type: "button",
          class: "btn btn-secondary",
          onClick: _cache[26] || (_cache[26] = ($event) => $setup.close())
        }, [..._cache[110] || (_cache[110] = [
          createElementVNode("span", { class: "fa fa-times" }, null, -1),
          createTextVNode("\r\n          Cancel\r\n        ", -1)
        ])])
      ]),
      default: withCtx(() => [
        _cache[112] || (_cache[112] = createTextVNode()),
        $setup.content && $setup.options ? (openBlock(), createElementBlock("div", _hoisted_6$7, [
          createElementVNode("div", _hoisted_7$7, [
            createElementVNode("div", _hoisted_8$7, [
              _cache[38] || (_cache[38] = createElementVNode("label", { for: "input-addon-edit-label" }, "Label", -1)),
              _cache[39] || (_cache[39] = createTextVNode()),
              withDirectives(createElementVNode("input", {
                id: "input-addon-edit-label",
                type: "text",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.options.label = $event),
                class: "form-control"
              }, null, 512), [
                [vModelText, $setup.options.label]
              ]),
              _cache[40] || (_cache[40] = createTextVNode()),
              _cache[41] || (_cache[41] = createElementVNode("small", { class: "form-text text-muted" }, "Only show when editing page.", -1))
            ]),
            _cache[44] || (_cache[44] = createTextVNode()),
            $setup.content.componentName ? (openBlock(), createBlock(resolveDynamicComponent($setup.content.componentName), {
              key: 0,
              modelValue: $setup.content.options,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.content.options = $event),
              "addon-id": $setup.content.id
            }, null, 8, ["modelValue", "addon-id"])) : createCommentVNode("", true),
            _cache[45] || (_cache[45] = createTextVNode()),
            createElementVNode("div", _hoisted_9$7, [
              _cache[42] || (_cache[42] = createElementVNode("label", { for: "input-addon-edit-html-class" }, "CSS Class", -1)),
              _cache[43] || (_cache[43] = createTextVNode()),
              withDirectives(createElementVNode("input", {
                id: "input-addon-edit-html-class",
                type: "text",
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.options.html_class = $event),
                class: "form-control"
              }, null, 512), [
                [vModelText, $setup.options.html_class]
              ])
            ])
          ]),
          _cache[107] || (_cache[107] = createTextVNode()),
          createElementVNode("div", _hoisted_10$7, [
            createVNode($setup["BoxOffset"], {
              modelValue: $setup.options.padding,
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.options.padding = $event)
            }, {
              label: withCtx(() => [..._cache[46] || (_cache[46] = [
                createElementVNode("label", null, "Padding", -1)
              ])]),
              _: 1
            }, 8, ["modelValue"]),
            _cache[91] || (_cache[91] = createTextVNode()),
            createVNode($setup["BoxOffset"], {
              modelValue: $setup.options.margin,
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.options.margin = $event)
            }, {
              label: withCtx(() => [..._cache[47] || (_cache[47] = [
                createElementVNode("label", null, "Margin", -1)
              ])]),
              _: 1
            }, 8, ["modelValue"]),
            _cache[92] || (_cache[92] = createTextVNode()),
            createElementVNode("div", _hoisted_11$6, [
              _cache[48] || (_cache[48] = createElementVNode("label", { for: "input-addon-edit-text-color" }, "Text Color", -1)),
              _cache[49] || (_cache[49] = createTextVNode()),
              createVNode($setup["ColorInput"], {
                id: "input-addon-edit-text-color",
                modelValue: $setup.options.text_color,
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.options.text_color = $event),
                modelModifiers: { lazy: true }
              }, null, 8, ["modelValue"])
            ]),
            _cache[93] || (_cache[93] = createTextVNode()),
            createElementVNode("div", _hoisted_12$6, [
              _cache[50] || (_cache[50] = createElementVNode("label", { for: "input-addon-edit-background" }, "Background Type", -1)),
              _cache[51] || (_cache[51] = createTextVNode()),
              createElementVNode("div", _hoisted_13$6, [
                createVNode($setup["ButtonRadio"], {
                  color: "primary",
                  variant: "outline",
                  class: "w-100",
                  modelValue: $setup.options.background.type,
                  "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.options.background.type = $event),
                  options: [
                    { text: "None", value: "none" },
                    { text: "Color", value: "color" },
                    { text: "Image", value: "image" },
                    { text: "Gradient", value: "gradient" },
                    { text: "video", value: "video" }
                  ]
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[94] || (_cache[94] = createTextVNode()),
            createVNode(Transition, { name: "fade" }, {
              default: withCtx(() => [
                ["color", "image"].indexOf($setup.options.background.type) !== -1 ? (openBlock(), createElementBlock("div", _hoisted_14$6, [
                  _cache[52] || (_cache[52] = createElementVNode("label", { for: "input-addon-edit-bg-color" }, "Background Color", -1)),
                  _cache[53] || (_cache[53] = createTextVNode()),
                  createVNode($setup["ColorInput"], {
                    id: "input-addon-edit-bg-color",
                    modelValue: $setup.options.background.color,
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.options.background.color = $event),
                    modelModifiers: { lazy: true }
                  }, null, 8, ["modelValue"])
                ])) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            _cache[95] || (_cache[95] = createTextVNode()),
            createVNode(Transition, {
              name: "fade",
              mode: "out-in"
            }, {
              default: withCtx(() => [
                ["image"].indexOf($setup.options.background.type) !== -1 ? (openBlock(), createElementBlock("div", _hoisted_15$6, [
                  createElementVNode("div", _hoisted_16$6, [
                    _cache[54] || (_cache[54] = createElementVNode("label", { for: "input-addon-edit-bg-image" }, "Background Image", -1)),
                    _cache[55] || (_cache[55] = createTextVNode()),
                    createVNode($setup["SingleImage"], {
                      modelValue: $setup.options.background.image.url,
                      "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.options.background.image.url = $event),
                      id: "input-addon-edit-bg-image"
                    }, null, 8, ["modelValue"])
                  ]),
                  _cache[69] || (_cache[69] = createTextVNode()),
                  createElementVNode("div", _hoisted_17$5, [
                    createElementVNode("div", _hoisted_18$3, [
                      _cache[56] || (_cache[56] = createElementVNode("label", { for: "input-addon-edit-bg-overlay" }, "Background Overlay", -1)),
                      _cache[57] || (_cache[57] = createTextVNode()),
                      createVNode($setup["ColorInput"], {
                        id: "input-addon-edit-bg-overlay",
                        modelValue: $setup.options.background.overlay,
                        "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $setup.options.background.overlay = $event),
                        modelModifiers: { lazy: true }
                      }, null, 8, ["modelValue"])
                    ]),
                    _cache[61] || (_cache[61] = createTextVNode()),
                    createElementVNode("div", _hoisted_19$3, [
                      _cache[59] || (_cache[59] = createElementVNode("label", { for: "input-addon-edit-bg-repeat" }, "Background Repeat", -1)),
                      _cache[60] || (_cache[60] = createTextVNode()),
                      withDirectives(createElementVNode("select", {
                        id: "input-addon-edit-bg-repeat",
                        "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $setup.options.background.image.repeat = $event),
                        class: "form-select custom-select"
                      }, [..._cache[58] || (_cache[58] = [
                        createElementVNode("option", { value: "no-repeat" }, "No Repeat", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "" }, "Repeat All", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "repeat-x" }, "Repeat X", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "repeat-y" }, "Repeat Y", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "inherit" }, "Inherit", -1)
                      ])], 512), [
                        [
                          vModelSelect,
                          $setup.options.background.image.repeat,
                          void 0,
                          { lazy: true }
                        ]
                      ])
                    ])
                  ]),
                  _cache[70] || (_cache[70] = createTextVNode()),
                  createElementVNode("div", _hoisted_20$3, [
                    createElementVNode("div", _hoisted_21$3, [
                      _cache[63] || (_cache[63] = createElementVNode("label", { for: "input-addon-edit-bg-attachment" }, "Background Attachment", -1)),
                      _cache[64] || (_cache[64] = createTextVNode()),
                      withDirectives(createElementVNode("select", {
                        id: "input-addon-edit-bg-attachment",
                        "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $setup.options.background.image.attachment = $event),
                        class: "form-select custom-select"
                      }, [..._cache[62] || (_cache[62] = [
                        createElementVNode("option", { value: "fixed" }, "Fixed", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "scroll" }, "Scroll", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "inherit" }, "Inherit", -1)
                      ])], 512), [
                        [
                          vModelSelect,
                          $setup.options.background.image.attachment,
                          void 0,
                          { lazy: true }
                        ]
                      ])
                    ]),
                    _cache[68] || (_cache[68] = createTextVNode()),
                    createElementVNode("div", _hoisted_22$2, [
                      _cache[66] || (_cache[66] = createElementVNode("label", { for: "input-addon-edit-bg-position" }, "Background Position", -1)),
                      _cache[67] || (_cache[67] = createTextVNode()),
                      withDirectives(createElementVNode("select", {
                        id: "input-addon-edit-bg-position",
                        "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => $setup.options.background.image.position = $event),
                        class: "form-select custom-select"
                      }, [..._cache[65] || (_cache[65] = [
                        createElementVNode("option", { value: "left top" }, "Left Top", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "left center" }, "Left Center", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "left bottom" }, "Left Bottom", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "center top" }, "Center Top", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "center center" }, "Center Center", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "center bottom" }, "Center Bottom", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "right top" }, "Right Top", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "right center" }, "Right Center", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "right bottom" }, "Right Bottom", -1)
                      ])], 512), [
                        [
                          vModelSelect,
                          $setup.options.background.image.position,
                          void 0,
                          { lazy: true }
                        ]
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            _cache[96] || (_cache[96] = createTextVNode()),
            createVNode(Transition, {
              name: "fade",
              mode: "out-in"
            }, {
              default: withCtx(() => [
                $setup.options.background.type === "gradient" ? (openBlock(), createBlock($setup["Gradient"], {
                  key: 0,
                  modelValue: $setup.options.background.gradient,
                  "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => $setup.options.background.gradient = $event),
                  id: "addon-edit-gradient",
                  style: { "animation-duration": ".3s" }
                }, null, 8, ["modelValue"])) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            _cache[97] || (_cache[97] = createTextVNode()),
            createVNode(Transition, {
              name: "fade",
              mode: "out-in"
            }, {
              default: withCtx(() => [
                ["video"].indexOf($setup.options.background.type) !== -1 ? (openBlock(), createElementBlock("div", _hoisted_23$2, [
                  createElementVNode("div", _hoisted_24$2, [
                    _cache[71] || (_cache[71] = createElementVNode("label", { for: "input-addon-edit-bg-video-url" }, "Video URL", -1)),
                    _cache[72] || (_cache[72] = createTextVNode()),
                    withDirectives(createElementVNode("input", {
                      id: "input-addon-edit-bg-video-url",
                      type: "text",
                      "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => $setup.options.background.video.url = $event),
                      class: "form-control"
                    }, null, 512), [
                      [vModelText, $setup.options.background.video.url]
                    ]),
                    _cache[73] || (_cache[73] = createTextVNode()),
                    _cache[74] || (_cache[74] = createElementVNode("small", { class: "form-text text-muted" }, "\r\n                  Paste mp4 video URL or Youtube / Vimeo link.\r\n                ", -1))
                  ])
                ])) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            _cache[98] || (_cache[98] = createTextVNode()),
            createVNode(Transition, {
              name: "fade",
              mode: "out-in"
            }, {
              default: withCtx(() => [
                ["video", "image"].indexOf($setup.options.background.type) !== -1 ? (openBlock(), createElementBlock("div", _hoisted_25$2, [
                  createElementVNode("div", _hoisted_26$2, [
                    _cache[75] || (_cache[75] = createElementVNode("label", { for: "input-addon-edit-bg-overlay" }, "Background Overlay", -1)),
                    _cache[76] || (_cache[76] = createTextVNode()),
                    createVNode($setup["ColorInput"], {
                      id: "input-addon-edit-bg-overlay",
                      modelValue: $setup.options.background.overlay,
                      "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => $setup.options.background.overlay = $event),
                      modelModifiers: { lazy: true }
                    }, null, 8, ["modelValue"])
                  ]),
                  _cache[79] || (_cache[79] = createTextVNode()),
                  createElementVNode("div", _hoisted_27$2, [
                    _cache[77] || (_cache[77] = createElementVNode("label", { for: "input-addon-edit-hidden-mobile" }, "Parallel Scroll", -1)),
                    _cache[78] || (_cache[78] = createTextVNode()),
                    createElementVNode("div", null, [
                      createVNode($setup["UnicornSwitcher"], {
                        name: "addon-edit-bg-parallax",
                        modelValue: $setup.options.background.parallax,
                        "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => $setup.options.background.parallax = $event),
                        id: "input-addon-edit-bg-parallax",
                        shape: "circle",
                        color: "success",
                        "true-value": true,
                        "false-value": false
                      }, null, 8, ["modelValue"])
                    ])
                  ])
                ])) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            _cache[99] || (_cache[99] = createTextVNode()),
            _cache[100] || (_cache[100] = createElementVNode("hr", null, null, -1)),
            _cache[101] || (_cache[101] = createTextVNode()),
            createElementVNode("div", _hoisted_28$2, [
              _cache[80] || (_cache[80] = createElementVNode("label", { for: "input-addon-edit-hidden-mobile" }, "Hide in Mobile", -1)),
              _cache[81] || (_cache[81] = createTextVNode()),
              createElementVNode("div", null, [
                createVNode($setup["UnicornSwitcher"], {
                  name: "addon-edit-hidden-mobile",
                  modelValue: $setup.options.display.xs,
                  "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => $setup.options.display.xs = $event),
                  id: "input-addon-edit-hidden-mobile",
                  shape: "circle",
                  color: "success",
                  "true-value": "d-none",
                  "false-value": "d-block"
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[102] || (_cache[102] = createTextVNode()),
            createElementVNode("div", _hoisted_29$2, [
              _cache[82] || (_cache[82] = createElementVNode("label", { for: "input-addon-edit-hidden-tablet" }, "Hide in Tablet", -1)),
              _cache[83] || (_cache[83] = createTextVNode()),
              createElementVNode("div", null, [
                createVNode($setup["UnicornSwitcher"], {
                  name: "addon-edit-hidden-tablet",
                  modelValue: $setup.options.display.md,
                  "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => $setup.options.display.md = $event),
                  id: "input-addon-edit-hidden-tablet",
                  shape: "circle",
                  color: "success",
                  "true-value": "d-md-none",
                  "false-value": "d-md-block"
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[103] || (_cache[103] = createTextVNode()),
            createElementVNode("div", _hoisted_30$2, [
              _cache[84] || (_cache[84] = createElementVNode("label", { for: "input-addon-edit-hidden-desktop" }, "Hide in Desktop", -1)),
              _cache[85] || (_cache[85] = createTextVNode()),
              createElementVNode("div", null, [
                createVNode($setup["UnicornSwitcher"], {
                  name: "addon-edit-hidden-desktop",
                  modelValue: $setup.options.display.lg,
                  "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => $setup.options.display.lg = $event),
                  id: "input-addon-edit-hidden-desktop",
                  shape: "circle",
                  color: "success",
                  "true-value": "d-lg-none",
                  "false-value": "d-lg-block"
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[104] || (_cache[104] = createTextVNode()),
            _cache[105] || (_cache[105] = createElementVNode("hr", null, null, -1)),
            _cache[106] || (_cache[106] = createTextVNode()),
            createElementVNode("div", _hoisted_31$2, [
              _cache[88] || (_cache[88] = createElementVNode("label", { for: "input-addon-edit-css" }, "Custom CSS (SCSS)", -1)),
              _cache[89] || (_cache[89] = createTextVNode()),
              createElementVNode("div", _hoisted_32$2, [
                _cache[86] || (_cache[86] = createTextVNode("\r\n              Will auto prefix with: ", -1)),
                createElementVNode("code", null, toDisplayString(`#luna-${$setup.content.id}`), 1),
                _cache[87] || (_cache[87] = createTextVNode(", and only affected in this scope.\r\n            ", -1))
              ]),
              _cache[90] || (_cache[90] = createTextVNode()),
              $setup.currentTab === "layout" ? (openBlock(), createElementBlock("div", _hoisted_33$2, [
                createVNode($setup["CssEditor"], {
                  ref: "css-editor",
                  modelValue: $setup.options.html_css,
                  "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => $setup.options.html_css = $event),
                  height: 350
                }, null, 8, ["modelValue"])
              ])) : createCommentVNode("", true)
            ])
          ]),
          _cache[108] || (_cache[108] = createTextVNode()),
          createElementVNode("div", _hoisted_34$2, [
            createVNode($setup["Animations"], {
              id: "addon-edit-anim",
              modelValue: $setup.options.animation,
              "onUpdate:modelValue": _cache[24] || (_cache[24] = ($event) => $setup.options.animation = $event)
            }, null, 8, ["modelValue"])
          ])
        ])) : createCommentVNode("", true),
        _cache[113] || (_cache[113] = createTextVNode())
      ]),
      _: 1
    }, 8, ["model-value"])
  ]);
}
const AddonEdit = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__file", "AddonEdit.vue"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ColumnEdit",
  setup(__props, { expose: __expose }) {
    const { saving, savePage: doSavePage } = usePageBuilderUtilities();
    const u2 = useUnicorn();
    const content = ref();
    const modalShow = ref(false);
    const cssEditor = useTemplateRef("cssEditor");
    const tab = ref();
    const currentTab = ref("general");
    onMounted(() => {
    });
    function edit(data2) {
      content.value = JSON.parse(JSON.stringify(data2));
      modalShow.value = true;
      nextTick(() => {
        tab.value?.addEventListener("shown.bs.tab", () => {
          updateCurrentTab();
        });
        updateCurrentTab();
      });
    }
    __expose({
      edit
    });
    function updateCurrentTab() {
      if (!tab.value) {
        return;
      }
      const active = tab.value.querySelector("a.nav-link.active");
      if (active) {
        currentTab.value = active.getAttribute("href")?.replace("#column-edit-", "") || "general";
      }
    }
    useEventListener$1("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s" && modalShow.value) {
        e.preventDefault();
        savePage();
      }
    });
    function saveClose() {
      u2.trigger("column:save", JSON.parse(JSON.stringify(content.value)));
      close();
    }
    async function savePage() {
      u2.trigger("column:save", JSON.parse(JSON.stringify(content.value)));
      await nextTick();
      return await doSavePage();
    }
    function close() {
      modalShow.value = false;
      setTimeout(() => {
        content.value = void 0;
      }, 300);
    }
    function widthRange() {
      return range(1, 13);
    }
    const options = computed(() => content.value?.options);
    const __returned__ = { saving, doSavePage, u: u2, content, modalShow, cssEditor, tab, currentTab, edit, updateCurrentTab, saveClose, savePage, close, widthRange, options, get BModal() {
      return _sfc_main$d;
    }, CssEditor, UnicornSwitcher, Animations, BoxOffset, ButtonRadio, ColorInput, SingleImage, Gradient, RwdGroup, SliderInput };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$6 = {
  ref: "tab",
  class: "nav nav-pills border-0"
};
const _hoisted_2$6 = { class: "nav-item" };
const _hoisted_3$6 = {
  ref: "generalTab",
  class: "nav-link active",
  "data-toggle": "tab",
  "data-bs-toggle": "tab",
  href: "#column-edit-general"
};
const _hoisted_4$6 = { class: "ml-auto ms-auto" };
const _hoisted_5$6 = ["disabled"];
const _hoisted_6$6 = {
  key: 0,
  class: "tab-content",
  id: "column-edit-tab-content"
};
const _hoisted_7$6 = {
  class: "tab-pane fade show active",
  id: "column-edit-general",
  role: "tabpanel",
  "aria-labelledby": "column-edit-general-tab"
};
const _hoisted_8$6 = { class: "form-group mb-3" };
const _hoisted_9$6 = { class: "form-group mb-3" };
const _hoisted_10$6 = { class: "" };
const _hoisted_11$5 = {
  key: 0,
  class: "form-group mb-3",
  style: { "animation-duration": ".3s" }
};
const _hoisted_12$5 = {
  key: 0,
  style: { "animation-duration": ".3s" }
};
const _hoisted_13$5 = { class: "form-group mb-3" };
const _hoisted_14$5 = { class: "form-row row" };
const _hoisted_15$5 = { class: "form-group mb-3 col-md-6" };
const _hoisted_16$5 = { class: "form-group mb-3 col-md-6" };
const _hoisted_17$4 = { class: "form-row row" };
const _hoisted_18$2 = { class: "form-group mb-3 col-md-6" };
const _hoisted_19$2 = { class: "form-group mb-3 col-md-6" };
const _hoisted_20$2 = { class: "form-group mb-3" };
const _hoisted_21$2 = { class: "" };
const _hoisted_22$1 = { class: "form-group mb-3" };
const _hoisted_23$1 = { class: "form-group mb-3" };
const _hoisted_24$1 = { key: 0 };
const _hoisted_25$1 = { class: "form-group mb-3" };
const _hoisted_26$1 = { class: "form-group mb-3" };
const _hoisted_27$1 = { class: "form-group mb-3" };
const _hoisted_28$1 = { key: 1 };
const _hoisted_29$1 = { class: "form-group mb-3" };
const _hoisted_30$1 = { class: "form-row row" };
const _hoisted_31$1 = { class: "col-6" };
const _hoisted_32$1 = { class: "form-group mb-3" };
const _hoisted_33$1 = { class: "col-6" };
const _hoisted_34$1 = { class: "form-group mb-3" };
const _hoisted_35$1 = { class: "form-row row" };
const _hoisted_36$1 = { class: "col-6" };
const _hoisted_37$1 = { class: "form-group mb-3" };
const _hoisted_38$1 = { class: "col-6" };
const _hoisted_39$1 = { class: "form-group mb-3" };
const _hoisted_40$1 = { class: "form-group mb-3" };
const _hoisted_41 = {
  class: "tab-pane fade",
  id: "column-edit-layout",
  role: "tabpanel",
  "aria-labelledby": "column-edit-layout-tab"
};
const _hoisted_42 = { class: "form-group mb-3" };
const _hoisted_43 = ["value"];
const _hoisted_44 = { class: "form-group mb-3" };
const _hoisted_45 = ["value"];
const _hoisted_46 = { class: "form-group mb-3" };
const _hoisted_47 = ["value"];
const _hoisted_48 = { class: "form-group mb-3" };
const _hoisted_49 = { class: "form-group mb-3" };
const _hoisted_50 = { class: "form-group mb-3" };
const _hoisted_51 = { class: "form-group mb-3" };
const _hoisted_52 = { class: "text-muted small mb-3" };
const _hoisted_53 = { key: 0 };
const _hoisted_54 = {
  class: "tab-pane fade",
  id: "column-edit-animation",
  role: "tabpanel",
  "aria-labelledby": "column-edit-animation-tab"
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createVNode($setup["BModal"], {
      "model-value": $setup.modalShow,
      size: "lg",
      onHidden: _cache[36] || (_cache[36] = ($event) => $setup.modalShow = false),
      backdrop: "static",
      class: "c-modal-column-edit",
      lazy: "",
      "unmount-lazy": "",
      "no-trap": "",
      "header-class": "bg-white sticky-top"
    }, {
      header: withCtx(() => [
        createElementVNode("ul", _hoisted_1$6, [
          createElementVNode("li", _hoisted_2$6, [
            createElementVNode("a", _hoisted_3$6, "\r\n              General\r\n            ", 512)
          ]),
          _cache[37] || (_cache[37] = createTextVNode()),
          _cache[38] || (_cache[38] = createElementVNode("li", { class: "nav-item" }, [
            createElementVNode("a", {
              class: "nav-link",
              "data-toggle": "tab",
              "data-bs-toggle": "tab",
              href: "#column-edit-layout"
            }, "\r\n              Layout\r\n            ")
          ], -1)),
          _cache[39] || (_cache[39] = createTextVNode()),
          _cache[40] || (_cache[40] = createElementVNode("li", { class: "nav-item" }, [
            createElementVNode("a", {
              class: "nav-link",
              "data-toggle": "tab",
              "data-bs-toggle": "tab",
              href: "#column-edit-animation"
            }, "\r\n              Animation\r\n            ")
          ], -1))
        ], 512),
        _cache[46] || (_cache[46] = createTextVNode()),
        createElementVNode("div", _hoisted_4$6, [
          createElementVNode("button", {
            type: "button",
            class: "btn btn-primary",
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.saveClose())
          }, [..._cache[41] || (_cache[41] = [
            createElementVNode("span", { class: "fa fa-check" }, null, -1),
            createTextVNode("\r\n            Done\r\n          ", -1)
          ])]),
          _cache[44] || (_cache[44] = createTextVNode()),
          createElementVNode("button", {
            type: "button",
            class: "btn btn-success",
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.savePage()),
            disabled: $setup.saving
          }, [
            createElementVNode("span", {
              class: normalizeClass($setup.saving ? "spinner-border spinner-border-sm" : "fa fa-save")
            }, null, 2),
            _cache[42] || (_cache[42] = createTextVNode("\r\n            Save Page\r\n          ", -1))
          ], 8, _hoisted_5$6),
          _cache[45] || (_cache[45] = createTextVNode()),
          createElementVNode("button", {
            type: "button",
            class: "btn btn-secondary",
            onClick: _cache[2] || (_cache[2] = ($event) => $setup.close())
          }, [..._cache[43] || (_cache[43] = [
            createElementVNode("span", { class: "fa fa-times" }, null, -1)
          ])])
        ])
      ]),
      footer: withCtx(() => [
        createElementVNode("button", {
          type: "button",
          class: "btn btn-success",
          onClick: _cache[34] || (_cache[34] = ($event) => $setup.saveClose())
        }, [..._cache[162] || (_cache[162] = [
          createElementVNode("span", { class: "fa fa-save" }, null, -1),
          createTextVNode("\r\n          Save\r\n        ", -1)
        ])]),
        _cache[164] || (_cache[164] = createTextVNode()),
        createElementVNode("button", {
          type: "button",
          class: "btn btn-secondary",
          onClick: _cache[35] || (_cache[35] = ($event) => $setup.close())
        }, [..._cache[163] || (_cache[163] = [
          createElementVNode("span", { class: "fa fa-times" }, null, -1)
        ])])
      ]),
      default: withCtx(() => [
        _cache[165] || (_cache[165] = createTextVNode()),
        $setup.content && $setup.options ? (openBlock(), createElementBlock("div", _hoisted_6$6, [
          createElementVNode("div", _hoisted_7$6, [
            createElementVNode("div", _hoisted_8$6, [
              _cache[47] || (_cache[47] = createElementVNode("label", { for: "input-column-edit-text-color" }, "Text Color", -1)),
              _cache[48] || (_cache[48] = createTextVNode()),
              createVNode($setup["ColorInput"], {
                id: "input-column-edit-text-color",
                modelValue: $setup.options.text_color,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.options.text_color = $event),
                modelModifiers: { lazy: true }
              }, null, 8, ["modelValue"])
            ]),
            _cache[107] || (_cache[107] = createTextVNode()),
            createElementVNode("div", _hoisted_9$6, [
              _cache[49] || (_cache[49] = createElementVNode("label", { for: "input-column-edit-background" }, "Background Style", -1)),
              _cache[50] || (_cache[50] = createTextVNode()),
              createElementVNode("div", _hoisted_10$6, [
                createVNode($setup["ButtonRadio"], {
                  color: "primary",
                  variant: "outline",
                  class: "w-100",
                  modelValue: $setup.options.background.type,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.options.background.type = $event),
                  options: [
                    { text: "None", value: "none" },
                    { text: "Color", value: "color" },
                    { text: "Image", value: "image" },
                    { text: "Gradient", value: "gradient" }
                  ]
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[108] || (_cache[108] = createTextVNode()),
            createVNode(Transition, {
              name: "fade",
              mode: "out-in"
            }, {
              default: withCtx(() => [
                ["color", "image"].indexOf($setup.options.background.type) !== -1 ? (openBlock(), createElementBlock("div", _hoisted_11$5, [
                  _cache[51] || (_cache[51] = createElementVNode("label", { for: "input-column-edit-bg-color" }, "Background Color", -1)),
                  _cache[52] || (_cache[52] = createTextVNode()),
                  createVNode($setup["ColorInput"], {
                    id: "input-column-edit-bg-color",
                    modelValue: $setup.options.background.color,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.options.background.color = $event),
                    modelModifiers: { lazy: true }
                  }, null, 8, ["modelValue"])
                ])) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            _cache[109] || (_cache[109] = createTextVNode()),
            createVNode(Transition, {
              name: "fade",
              mode: "out-in"
            }, {
              default: withCtx(() => [
                ["image"].indexOf($setup.options.background.type) !== -1 ? (openBlock(), createElementBlock("div", _hoisted_12$5, [
                  createElementVNode("div", _hoisted_13$5, [
                    _cache[53] || (_cache[53] = createElementVNode("label", { for: "input-column-edit-bg-image" }, "Background Image", -1)),
                    _cache[54] || (_cache[54] = createTextVNode()),
                    createVNode($setup["SingleImage"], {
                      modelValue: $setup.options.background.image.url,
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.options.background.image.url = $event),
                      id: "input-column-edit-bg-image"
                    }, null, 8, ["modelValue"])
                  ]),
                  _cache[68] || (_cache[68] = createTextVNode()),
                  createElementVNode("div", _hoisted_14$5, [
                    createElementVNode("div", _hoisted_15$5, [
                      _cache[55] || (_cache[55] = createElementVNode("label", { for: "input-column-edit-bg-overlay" }, "Background Overlay", -1)),
                      _cache[56] || (_cache[56] = createTextVNode()),
                      createVNode($setup["ColorInput"], {
                        id: "input-column-edit-bg-overlay",
                        modelValue: $setup.options.background.overlay,
                        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.options.background.overlay = $event),
                        modelModifiers: { lazy: true }
                      }, null, 8, ["modelValue"])
                    ]),
                    _cache[60] || (_cache[60] = createTextVNode()),
                    createElementVNode("div", _hoisted_16$5, [
                      _cache[58] || (_cache[58] = createElementVNode("label", { for: "input-column-edit-bg-repeat" }, "Background Repeat", -1)),
                      _cache[59] || (_cache[59] = createTextVNode()),
                      withDirectives(createElementVNode("select", {
                        id: "input-column-edit-bg-repeat",
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.options.background.image.repeat = $event),
                        class: "form-select custom-select"
                      }, [..._cache[57] || (_cache[57] = [
                        createElementVNode("option", { value: "no-repeat" }, "No Repeat", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "" }, "Repeat All", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "repeat-x" }, "Repeat X", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "repeat-y" }, "Repeat Y", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "inherit" }, "Inherit", -1)
                      ])], 512), [
                        [
                          vModelSelect,
                          $setup.options.background.image.repeat,
                          void 0,
                          { lazy: true }
                        ]
                      ])
                    ])
                  ]),
                  _cache[69] || (_cache[69] = createTextVNode()),
                  createElementVNode("div", _hoisted_17$4, [
                    createElementVNode("div", _hoisted_18$2, [
                      _cache[62] || (_cache[62] = createElementVNode("label", { for: "input-column-edit-bg-attachment" }, "Background Attachment", -1)),
                      _cache[63] || (_cache[63] = createTextVNode()),
                      withDirectives(createElementVNode("select", {
                        id: "input-column-edit-bg-attachment",
                        "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.options.background.image.attachment = $event),
                        class: "form-select custom-select"
                      }, [..._cache[61] || (_cache[61] = [
                        createElementVNode("option", { value: "fixed" }, "Fixed", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "scroll" }, "Scroll", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "inherit" }, "Inherit", -1)
                      ])], 512), [
                        [
                          vModelSelect,
                          $setup.options.background.image.attachment,
                          void 0,
                          { lazy: true }
                        ]
                      ])
                    ]),
                    _cache[67] || (_cache[67] = createTextVNode()),
                    createElementVNode("div", _hoisted_19$2, [
                      _cache[65] || (_cache[65] = createElementVNode("label", { for: "input-column-edit-bg-position" }, "Background Position", -1)),
                      _cache[66] || (_cache[66] = createTextVNode()),
                      withDirectives(createElementVNode("select", {
                        id: "input-column-edit-bg-position",
                        "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.options.background.image.position = $event),
                        class: "form-select custom-select"
                      }, [..._cache[64] || (_cache[64] = [
                        createElementVNode("option", { value: "left top" }, "Left Top", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "left center" }, "Left Center", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "left bottom" }, "Left Bottom", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "center top" }, "Center Top", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "center center" }, "Center Center", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "center bottom" }, "Center Bottom", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "right top" }, "Right Top", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "right center" }, "Right Center", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "right bottom" }, "Right Bottom", -1)
                      ])], 512), [
                        [
                          vModelSelect,
                          $setup.options.background.image.position,
                          void 0,
                          { lazy: true }
                        ]
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            _cache[110] || (_cache[110] = createTextVNode()),
            createVNode(Transition, {
              name: "fade",
              mode: "out-in"
            }, {
              default: withCtx(() => [
                $setup.options.background.type === "gradient" ? (openBlock(), createBlock($setup["Gradient"], {
                  key: 0,
                  modelValue: $setup.options.background.gradient,
                  "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.options.background.gradient = $event),
                  id: "column-edit-gradient",
                  style: { "animation-duration": ".3s" }
                }, null, 8, ["modelValue"])) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            _cache[111] || (_cache[111] = createTextVNode()),
            createElementVNode("div", _hoisted_20$2, [
              _cache[70] || (_cache[70] = createElementVNode("label", { for: "input-addon-edit-text-align" }, "Text Alignment", -1)),
              _cache[71] || (_cache[71] = createTextVNode()),
              createElementVNode("div", _hoisted_21$2, [
                createVNode($setup["ButtonRadio"], {
                  color: "primary",
                  variant: "outline",
                  class: "w-100",
                  modelValue: $setup.options.align,
                  "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $setup.options.align = $event),
                  options: [
                    { text: "Default", value: "" },
                    { text: "Left", value: "left" },
                    { text: "Center", value: "center" },
                    { text: "Right", value: "right" }
                  ]
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[112] || (_cache[112] = createTextVNode()),
            createElementVNode("div", _hoisted_22$1, [
              _cache[72] || (_cache[72] = createElementVNode("label", { for: "input-column-edit-valign" }, "Vertical Align Middle", -1)),
              _cache[73] || (_cache[73] = createTextVNode()),
              createElementVNode("div", null, [
                createVNode($setup["UnicornSwitcher"], {
                  name: "column-edit-align-middle",
                  modelValue: $setup.options.valign,
                  "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $setup.options.valign = $event),
                  id: "input-column-edit-valign",
                  shape: "circle",
                  color: "success",
                  "true-value": "middle",
                  "false-value": "top"
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[113] || (_cache[113] = createTextVNode()),
            _cache[114] || (_cache[114] = createElementVNode("hr", null, null, -1)),
            _cache[115] || (_cache[115] = createTextVNode()),
            createVNode($setup["BoxOffset"], {
              modelValue: $setup.options.padding,
              "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $setup.options.padding = $event)
            }, {
              label: withCtx(() => [..._cache[74] || (_cache[74] = [
                createElementVNode("label", null, "Padding", -1)
              ])]),
              _: 1
            }, 8, ["modelValue"]),
            _cache[116] || (_cache[116] = createTextVNode()),
            createVNode($setup["BoxOffset"], {
              modelValue: $setup.options.margin,
              "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => $setup.options.margin = $event)
            }, {
              label: withCtx(() => [..._cache[75] || (_cache[75] = [
                createElementVNode("label", null, "Margin", -1)
              ])]),
              _: 1
            }, 8, ["modelValue"]),
            _cache[117] || (_cache[117] = createTextVNode()),
            _cache[118] || (_cache[118] = createElementVNode("hr", null, null, -1)),
            _cache[119] || (_cache[119] = createTextVNode()),
            createElementVNode("div", _hoisted_23$1, [
              _cache[76] || (_cache[76] = createElementVNode("label", { for: "input-column-edit-border-enabled" }, "Border", -1)),
              _cache[77] || (_cache[77] = createTextVNode()),
              createElementVNode("div", null, [
                createVNode($setup["UnicornSwitcher"], {
                  name: "column-edit-border-enabled",
                  modelValue: $setup.options.border.enabled,
                  "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => $setup.options.border.enabled = $event),
                  id: "input-column-edit-border-enabled",
                  shape: "circle",
                  color: "success"
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[120] || (_cache[120] = createTextVNode()),
            $setup.options.border.enabled == 1 ? (openBlock(), createElementBlock("div", _hoisted_24$1, [
              createVNode($setup["RwdGroup"], { "class-name": "c-border-width" }, createSlots({
                label: withCtx(() => [
                  _cache[78] || (_cache[78] = createElementVNode("label", null, "\r\n                  Border Width\r\n                ", -1))
                ]),
                _: 2
              }, [
                renderList(["lg", "md", "xs"], (size) => {
                  return {
                    name: size,
                    fn: withCtx(() => [
                      createVNode($setup["SliderInput"], {
                        modelValue: $setup.options.border.width[size],
                        "onUpdate:modelValue": ($event) => $setup.options.border.width[size] = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  };
                })
              ]), 1024),
              _cache[85] || (_cache[85] = createTextVNode()),
              createElementVNode("div", _hoisted_25$1, [
                _cache[80] || (_cache[80] = createElementVNode("label", { for: "input-column-edit-border-color" }, "Border Color", -1)),
                _cache[81] || (_cache[81] = createTextVNode()),
                createVNode($setup["ColorInput"], {
                  id: "input-column-edit-border-color",
                  modelValue: $setup.options.border.color,
                  "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => $setup.options.border.color = $event),
                  modelModifiers: { lazy: true }
                }, null, 8, ["modelValue"])
              ]),
              _cache[86] || (_cache[86] = createTextVNode()),
              createElementVNode("div", _hoisted_26$1, [
                _cache[83] || (_cache[83] = createElementVNode("label", { for: "input-column-edit-border-style" }, "Border Style", -1)),
                _cache[84] || (_cache[84] = createTextVNode()),
                withDirectives(createElementVNode("select", {
                  id: "input-column-edit-border-style",
                  "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => $setup.options.border.style = $event),
                  class: "form-select custom-select"
                }, [..._cache[82] || (_cache[82] = [
                  createElementVNode("option", { value: "" }, "None", -1),
                  createTextVNode(),
                  createElementVNode("option", { value: "solid" }, "Solid", -1),
                  createTextVNode(),
                  createElementVNode("option", { value: "dotted" }, "Dotted", -1),
                  createTextVNode(),
                  createElementVNode("option", { value: "dashed" }, "Dashed", -1),
                  createTextVNode(),
                  createElementVNode("option", { value: "double" }, "Double", -1),
                  createTextVNode(),
                  createElementVNode("option", { value: "groove" }, "Groove", -1),
                  createTextVNode(),
                  createElementVNode("option", { value: "ridge" }, "Ridge", -1)
                ])], 512), [
                  [vModelSelect, $setup.options.border.style]
                ])
              ])
            ])) : createCommentVNode("", true),
            _cache[121] || (_cache[121] = createTextVNode()),
            createVNode($setup["RwdGroup"], { "class-name": "c-border-radius" }, createSlots({
              label: withCtx(() => [
                _cache[87] || (_cache[87] = createElementVNode("label", null, "\r\n                Border Radius\r\n              ", -1))
              ]),
              _: 2
            }, [
              renderList(["lg", "md", "xs"], (size) => {
                return {
                  name: size,
                  fn: withCtx(() => [
                    createVNode($setup["SliderInput"], {
                      modelValue: $setup.options.border.radius[size],
                      "onUpdate:modelValue": ($event) => $setup.options.border.radius[size] = $event,
                      max: 500
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                };
              })
            ]), 1024),
            _cache[122] || (_cache[122] = createTextVNode()),
            _cache[123] || (_cache[123] = createElementVNode("hr", null, null, -1)),
            _cache[124] || (_cache[124] = createTextVNode()),
            createElementVNode("div", _hoisted_27$1, [
              _cache[89] || (_cache[89] = createElementVNode("label", { for: "input-column-edit-box_shadow-enabled" }, "Box Shadow", -1)),
              _cache[90] || (_cache[90] = createTextVNode()),
              createElementVNode("div", null, [
                createVNode($setup["UnicornSwitcher"], {
                  name: "column-edit-box_shadow-enabled",
                  modelValue: $setup.options.box_shadow.enabled,
                  "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => $setup.options.box_shadow.enabled = $event),
                  id: "input-column-edit-box_shadow-enabled",
                  shape: "circle",
                  color: "success"
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[125] || (_cache[125] = createTextVNode()),
            $setup.options.box_shadow.enabled == 1 ? (openBlock(), createElementBlock("div", _hoisted_28$1, [
              createElementVNode("div", _hoisted_29$1, [
                _cache[91] || (_cache[91] = createElementVNode("label", { for: "input-column-edit-box-shadow-color" }, "Shadow Color", -1)),
                _cache[92] || (_cache[92] = createTextVNode()),
                createVNode($setup["ColorInput"], {
                  id: "input-column-edit-box-shadow-color",
                  modelValue: $setup.options.box_shadow.color,
                  "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => $setup.options.box_shadow.color = $event),
                  modelModifiers: { lazy: true }
                }, null, 8, ["modelValue"])
              ]),
              _cache[103] || (_cache[103] = createTextVNode()),
              createElementVNode("div", _hoisted_30$1, [
                createElementVNode("div", _hoisted_31$1, [
                  createElementVNode("div", _hoisted_32$1, [
                    _cache[93] || (_cache[93] = createElementVNode("label", null, "\r\n                    Shadow X Offset\r\n                  ", -1)),
                    _cache[94] || (_cache[94] = createTextVNode()),
                    createVNode($setup["SliderInput"], {
                      modelValue: $setup.options.box_shadow.hoffset,
                      "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => $setup.options.box_shadow.hoffset = $event)
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                _cache[97] || (_cache[97] = createTextVNode()),
                createElementVNode("div", _hoisted_33$1, [
                  createElementVNode("div", _hoisted_34$1, [
                    _cache[95] || (_cache[95] = createElementVNode("label", null, "\r\n                    Shadow Y Offset\r\n                  ", -1)),
                    _cache[96] || (_cache[96] = createTextVNode()),
                    createVNode($setup["SliderInput"], {
                      modelValue: $setup.options.box_shadow.voffset,
                      "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => $setup.options.box_shadow.voffset = $event)
                    }, null, 8, ["modelValue"])
                  ])
                ])
              ]),
              _cache[104] || (_cache[104] = createTextVNode()),
              createElementVNode("div", _hoisted_35$1, [
                createElementVNode("div", _hoisted_36$1, [
                  createElementVNode("div", _hoisted_37$1, [
                    _cache[98] || (_cache[98] = createElementVNode("label", null, "\r\n                    Shadow Blur\r\n                  ", -1)),
                    _cache[99] || (_cache[99] = createTextVNode()),
                    createVNode($setup["SliderInput"], {
                      modelValue: $setup.options.box_shadow.blur,
                      "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => $setup.options.box_shadow.blur = $event)
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                _cache[102] || (_cache[102] = createTextVNode()),
                createElementVNode("div", _hoisted_38$1, [
                  createElementVNode("div", _hoisted_39$1, [
                    _cache[100] || (_cache[100] = createElementVNode("label", null, "\r\n                    Shadow Spread\r\n                  ", -1)),
                    _cache[101] || (_cache[101] = createTextVNode()),
                    createVNode($setup["SliderInput"], {
                      modelValue: $setup.options.box_shadow.spread,
                      "onUpdate:modelValue": _cache[24] || (_cache[24] = ($event) => $setup.options.box_shadow.spread = $event)
                    }, null, 8, ["modelValue"])
                  ])
                ])
              ])
            ])) : createCommentVNode("", true),
            _cache[126] || (_cache[126] = createTextVNode()),
            _cache[127] || (_cache[127] = createElementVNode("hr", null, null, -1)),
            _cache[128] || (_cache[128] = createTextVNode()),
            createElementVNode("div", _hoisted_40$1, [
              _cache[105] || (_cache[105] = createElementVNode("label", { for: "input-column-edit-html-class" }, "CSS Class", -1)),
              _cache[106] || (_cache[106] = createTextVNode()),
              withDirectives(createElementVNode("input", {
                id: "input-column-edit-html-class",
                type: "text",
                "onUpdate:modelValue": _cache[25] || (_cache[25] = ($event) => $setup.options.html_class = $event),
                class: "form-control"
              }, null, 512), [
                [vModelText, $setup.options.html_class]
              ])
            ])
          ]),
          _cache[160] || (_cache[160] = createTextVNode()),
          createElementVNode("div", _hoisted_41, [
            createElementVNode("div", _hoisted_42, [
              _cache[129] || (_cache[129] = createElementVNode("label", { for: "input-column-edit-width-desktop" }, "Desktop Width", -1)),
              _cache[130] || (_cache[130] = createTextVNode()),
              withDirectives(createElementVNode("select", {
                id: "input-column-edit-width-desktop",
                "onUpdate:modelValue": _cache[26] || (_cache[26] = ($event) => $setup.options.width.lg = $event),
                class: "form-select custom-select"
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList($setup.widthRange(), (w) => {
                  return openBlock(), createElementBlock("option", {
                    value: "col-lg-" + w
                  }, "\r\n                col-lg-" + toDisplayString(w), 9, _hoisted_43);
                }), 256))
              ], 512), [
                [vModelSelect, $setup.options.width.lg]
              ])
            ]),
            _cache[150] || (_cache[150] = createTextVNode()),
            createElementVNode("div", _hoisted_44, [
              _cache[133] || (_cache[133] = createElementVNode("label", { for: "input-column-edit-width-tablet" }, "Tablet Width", -1)),
              _cache[134] || (_cache[134] = createTextVNode()),
              withDirectives(createElementVNode("select", {
                id: "input-column-edit-width-tablet",
                "onUpdate:modelValue": _cache[27] || (_cache[27] = ($event) => $setup.options.width.md = $event),
                class: "form-select custom-select"
              }, [
                _cache[131] || (_cache[131] = createElementVNode("option", { value: "" }, "- None -", -1)),
                _cache[132] || (_cache[132] = createTextVNode()),
                (openBlock(true), createElementBlock(Fragment, null, renderList($setup.widthRange(), (w) => {
                  return openBlock(), createElementBlock("option", {
                    value: "col-md-" + w
                  }, "\r\n                col-md-" + toDisplayString(w), 9, _hoisted_45);
                }), 256))
              ], 512), [
                [vModelSelect, $setup.options.width.md]
              ])
            ]),
            _cache[151] || (_cache[151] = createTextVNode()),
            createElementVNode("div", _hoisted_46, [
              _cache[137] || (_cache[137] = createElementVNode("label", { for: "input-column-edit-width-mobile" }, "Mobile Width", -1)),
              _cache[138] || (_cache[138] = createTextVNode()),
              withDirectives(createElementVNode("select", {
                id: "input-column-edit-width-mobile",
                "onUpdate:modelValue": _cache[28] || (_cache[28] = ($event) => $setup.options.width.xs = $event),
                class: "form-select custom-select"
              }, [
                _cache[135] || (_cache[135] = createElementVNode("option", { value: "" }, "- None -", -1)),
                _cache[136] || (_cache[136] = createTextVNode()),
                (openBlock(true), createElementBlock(Fragment, null, renderList($setup.widthRange(), (w) => {
                  return openBlock(), createElementBlock("option", {
                    value: "col-" + w
                  }, "\r\n                col-" + toDisplayString(w), 9, _hoisted_47);
                }), 256))
              ], 512), [
                [vModelSelect, $setup.options.width.xs]
              ])
            ]),
            _cache[152] || (_cache[152] = createTextVNode()),
            _cache[153] || (_cache[153] = createElementVNode("hr", null, null, -1)),
            _cache[154] || (_cache[154] = createTextVNode()),
            createElementVNode("div", _hoisted_48, [
              _cache[139] || (_cache[139] = createElementVNode("label", { for: "input-column-edit-hidden-mobile" }, "Hide in Mobile", -1)),
              _cache[140] || (_cache[140] = createTextVNode()),
              createElementVNode("div", null, [
                createVNode($setup["UnicornSwitcher"], {
                  name: "column-edit-hidden-mobile",
                  modelValue: $setup.options.display.xs,
                  "onUpdate:modelValue": _cache[29] || (_cache[29] = ($event) => $setup.options.display.xs = $event),
                  id: "input-column-edit-hidden-mobile",
                  shape: "circle",
                  color: "success",
                  "true-value": "d-none",
                  "false-value": "d-block"
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[155] || (_cache[155] = createTextVNode()),
            createElementVNode("div", _hoisted_49, [
              _cache[141] || (_cache[141] = createElementVNode("label", { for: "input-column-edit-hidden-tablet" }, "Hide in Tablet", -1)),
              _cache[142] || (_cache[142] = createTextVNode()),
              createElementVNode("div", null, [
                createVNode($setup["UnicornSwitcher"], {
                  name: "column-edit-hidden-tablet",
                  modelValue: $setup.options.display.md,
                  "onUpdate:modelValue": _cache[30] || (_cache[30] = ($event) => $setup.options.display.md = $event),
                  id: "input-column-edit-hidden-tablet",
                  shape: "circle",
                  color: "success",
                  "true-value": "d-md-none",
                  "false-value": "d-md-block"
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[156] || (_cache[156] = createTextVNode()),
            createElementVNode("div", _hoisted_50, [
              _cache[143] || (_cache[143] = createElementVNode("label", { for: "input-column-edit-hidden-desktop" }, "Hide in Desktop", -1)),
              _cache[144] || (_cache[144] = createTextVNode()),
              createElementVNode("div", null, [
                createVNode($setup["UnicornSwitcher"], {
                  name: "column-edit-hidden-desktop",
                  modelValue: $setup.options.display.lg,
                  "onUpdate:modelValue": _cache[31] || (_cache[31] = ($event) => $setup.options.display.lg = $event),
                  id: "input-column-edit-hidden-desktop",
                  shape: "circle",
                  color: "success",
                  "true-value": "d-lg-none",
                  "false-value": "d-lg-block"
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[157] || (_cache[157] = createTextVNode()),
            _cache[158] || (_cache[158] = createElementVNode("hr", null, null, -1)),
            _cache[159] || (_cache[159] = createTextVNode()),
            createElementVNode("div", _hoisted_51, [
              _cache[147] || (_cache[147] = createElementVNode("label", { for: "input-column-edit-css" }, "Custom CSS (SCSS)", -1)),
              _cache[148] || (_cache[148] = createTextVNode()),
              createElementVNode("div", _hoisted_52, [
                _cache[145] || (_cache[145] = createTextVNode("\r\n              Will auto prefix with: ", -1)),
                createElementVNode("code", null, toDisplayString(`#luna-${$setup.content.id}`), 1),
                _cache[146] || (_cache[146] = createTextVNode(", and only affected in this scope.\r\n            ", -1))
              ]),
              _cache[149] || (_cache[149] = createTextVNode()),
              $setup.currentTab === "layout" ? (openBlock(), createElementBlock("div", _hoisted_53, [
                createVNode($setup["CssEditor"], {
                  ref: "cssEditor",
                  modelValue: $setup.options.html_css,
                  "onUpdate:modelValue": _cache[32] || (_cache[32] = ($event) => $setup.options.html_css = $event),
                  height: 350
                }, null, 8, ["modelValue"])
              ])) : createCommentVNode("", true)
            ])
          ]),
          _cache[161] || (_cache[161] = createTextVNode()),
          createElementVNode("div", _hoisted_54, [
            createVNode($setup["Animations"], {
              id: "column-edit-anim",
              modelValue: $setup.options.animation,
              "onUpdate:modelValue": _cache[33] || (_cache[33] = ($event) => $setup.options.animation = $event)
            }, null, 8, ["modelValue"])
          ])
        ])) : createCommentVNode("", true),
        _cache[166] || (_cache[166] = createTextVNode())
      ]),
      _: 1
    }, 8, ["model-value"])
  ]);
}
const ColumnEdit = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__file", "ColumnEdit.vue"]]);
var sweetalert_min$1 = { exports: {} };
var sweetalert_min = sweetalert_min$1.exports;
var hasRequiredSweetalert_min;
function requireSweetalert_min() {
  if (hasRequiredSweetalert_min) return sweetalert_min$1.exports;
  hasRequiredSweetalert_min = 1;
  (function(module, exports$1) {
    !(function(t, e) {
      module.exports = e();
    })(sweetalert_min, function() {
      return (function(t) {
        function e(o) {
          if (n[o]) return n[o].exports;
          var r = n[o] = { i: o, l: false, exports: {} };
          return t[o].call(r.exports, r, r.exports, e), r.l = true, r.exports;
        }
        var n = {};
        return e.m = t, e.c = n, e.d = function(t2, n2, o) {
          e.o(t2, n2) || Object.defineProperty(t2, n2, { configurable: false, enumerable: true, get: o });
        }, e.n = function(t2) {
          var n2 = t2 && t2.__esModule ? function() {
            return t2.default;
          } : function() {
            return t2;
          };
          return e.d(n2, "a", n2), n2;
        }, e.o = function(t2, e2) {
          return Object.prototype.hasOwnProperty.call(t2, e2);
        }, e.p = "", e(e.s = 8);
      })([function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true });
        var o = "swal-button";
        e.CLASS_NAMES = { MODAL: "swal-modal", OVERLAY: "swal-overlay", SHOW_MODAL: "swal-overlay--show-modal", MODAL_TITLE: "swal-title", MODAL_TEXT: "swal-text", ICON: "swal-icon", ICON_CUSTOM: "swal-icon--custom", CONTENT: "swal-content", FOOTER: "swal-footer", BUTTON_CONTAINER: "swal-button-container", BUTTON: o, CONFIRM_BUTTON: o + "--confirm", CANCEL_BUTTON: o + "--cancel", DANGER_BUTTON: o + "--danger", BUTTON_LOADING: o + "--loading", BUTTON_LOADER: o + "__loader" }, e.default = e.CLASS_NAMES;
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true }), e.getNode = function(t2) {
          var e2 = "." + t2;
          return document.querySelector(e2);
        }, e.stringToNode = function(t2) {
          var e2 = document.createElement("div");
          return e2.innerHTML = t2.trim(), e2.firstChild;
        }, e.insertAfter = function(t2, e2) {
          var n2 = e2.nextSibling;
          e2.parentNode.insertBefore(t2, n2);
        }, e.removeNode = function(t2) {
          t2.parentElement.removeChild(t2);
        }, e.throwErr = function(t2) {
          throw t2 = t2.replace(/ +(?= )/g, ""), "SweetAlert: " + (t2 = t2.trim());
        }, e.isPlainObject = function(t2) {
          if ("[object Object]" !== Object.prototype.toString.call(t2)) return false;
          var e2 = Object.getPrototypeOf(t2);
          return null === e2 || e2 === Object.prototype;
        }, e.ordinalSuffixOf = function(t2) {
          var e2 = t2 % 10, n2 = t2 % 100;
          return 1 === e2 && 11 !== n2 ? t2 + "st" : 2 === e2 && 12 !== n2 ? t2 + "nd" : 3 === e2 && 13 !== n2 ? t2 + "rd" : t2 + "th";
        };
      }, function(t, e, n) {
        function o(t2) {
          for (var n2 in t2) e.hasOwnProperty(n2) || (e[n2] = t2[n2]);
        }
        Object.defineProperty(e, "__esModule", { value: true }), o(n(25));
        var r = n(26);
        e.overlayMarkup = r.default, o(n(27)), o(n(28)), o(n(29));
        var i = n(0), a = i.default.MODAL_TITLE, s = i.default.MODAL_TEXT, c = i.default.ICON, l = i.default.FOOTER;
        e.iconMarkup = '\n  <div class="' + c + '"></div>', e.titleMarkup = '\n  <div class="' + a + '"></div>\n', e.textMarkup = '\n  <div class="' + s + '"></div>', e.footerMarkup = '\n  <div class="' + l + '"></div>\n';
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(1);
        e.CONFIRM_KEY = "confirm", e.CANCEL_KEY = "cancel";
        var r = { visible: true, text: null, value: null, className: "", closeModal: true }, i = Object.assign({}, r, { visible: false, text: "Cancel", value: null }), a = Object.assign({}, r, { text: "OK", value: true });
        e.defaultButtonList = { cancel: i, confirm: a };
        var s = function(t2) {
          switch (t2) {
            case e.CONFIRM_KEY:
              return a;
            case e.CANCEL_KEY:
              return i;
            default:
              var n2 = t2.charAt(0).toUpperCase() + t2.slice(1);
              return Object.assign({}, r, { text: n2, value: t2 });
          }
        }, c = function(t2, e2) {
          var n2 = s(t2);
          return true === e2 ? Object.assign({}, n2, { visible: true }) : "string" == typeof e2 ? Object.assign({}, n2, { visible: true, text: e2 }) : o.isPlainObject(e2) ? Object.assign({ visible: true }, n2, e2) : Object.assign({}, n2, { visible: false });
        }, l = function(t2) {
          for (var e2 = {}, n2 = 0, o2 = Object.keys(t2); n2 < o2.length; n2++) {
            var r2 = o2[n2], a2 = t2[r2], s2 = c(r2, a2);
            e2[r2] = s2;
          }
          return e2.cancel || (e2.cancel = i), e2;
        }, u2 = function(t2) {
          var n2 = {};
          switch (t2.length) {
            case 1:
              n2[e.CANCEL_KEY] = Object.assign({}, i, { visible: false });
              break;
            case 2:
              n2[e.CANCEL_KEY] = c(e.CANCEL_KEY, t2[0]), n2[e.CONFIRM_KEY] = c(e.CONFIRM_KEY, t2[1]);
              break;
            default:
              o.throwErr("Invalid number of 'buttons' in array (" + t2.length + ").\n      If you want more than 2 buttons, you need to use an object!");
          }
          return n2;
        };
        e.getButtonListOpts = function(t2) {
          var n2 = e.defaultButtonList;
          return "string" == typeof t2 ? n2[e.CONFIRM_KEY] = c(e.CONFIRM_KEY, t2) : Array.isArray(t2) ? n2 = u2(t2) : o.isPlainObject(t2) ? n2 = l(t2) : true === t2 ? n2 = u2([true, true]) : false === t2 ? n2 = u2([false, false]) : void 0 === t2 && (n2 = e.defaultButtonList), n2;
        };
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(1), r = n(2), i = n(0), a = i.default.MODAL, s = i.default.OVERLAY, c = n(30), l = n(31), u2 = n(32), f = n(33);
        e.injectElIntoModal = function(t2) {
          var e2 = o.getNode(a), n2 = o.stringToNode(t2);
          return e2.appendChild(n2), n2;
        };
        var d = function(t2) {
          t2.className = a, t2.textContent = "";
        }, p = function(t2, e2) {
          d(t2);
          var n2 = e2.className;
          n2 && t2.classList.add(n2);
        };
        e.initModalContent = function(t2) {
          var e2 = o.getNode(a);
          p(e2, t2), c.default(t2.icon), l.initTitle(t2.title), l.initText(t2.text), f.default(t2.content), u2.default(t2.buttons, t2.dangerMode);
        };
        var m = function() {
          var t2 = o.getNode(s), e2 = o.stringToNode(r.modalMarkup);
          t2.appendChild(e2);
        };
        e.default = m;
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(3), r = { isOpen: false, promise: null, actions: {}, timer: null }, i = Object.assign({}, r);
        e.resetState = function() {
          i = Object.assign({}, r);
        }, e.setActionValue = function(t2) {
          if ("string" == typeof t2) return a(o.CONFIRM_KEY, t2);
          for (var e2 in t2) a(e2, t2[e2]);
        };
        var a = function(t2, e2) {
          i.actions[t2] || (i.actions[t2] = {}), Object.assign(i.actions[t2], { value: e2 });
        };
        e.setActionOptionsFor = function(t2, e2) {
          var n2 = (void 0 === e2 ? {} : e2).closeModal, o2 = void 0 === n2 || n2;
          Object.assign(i.actions[t2], { closeModal: o2 });
        }, e.default = i;
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(1), r = n(3), i = n(0), a = i.default.OVERLAY, s = i.default.SHOW_MODAL, c = i.default.BUTTON, l = i.default.BUTTON_LOADING, u2 = n(5);
        e.openModal = function() {
          o.getNode(a).classList.add(s), u2.default.isOpen = true;
        };
        var f = function() {
          o.getNode(a).classList.remove(s), u2.default.isOpen = false;
        };
        e.onAction = function(t2) {
          void 0 === t2 && (t2 = r.CANCEL_KEY);
          var e2 = u2.default.actions[t2], n2 = e2.value;
          if (false === e2.closeModal) {
            var i2 = c + "--" + t2;
            o.getNode(i2).classList.add(l);
          } else f();
          u2.default.promise.resolve(n2);
        }, e.getState = function() {
          var t2 = Object.assign({}, u2.default);
          return delete t2.promise, delete t2.timer, t2;
        }, e.stopLoading = function() {
          for (var t2 = document.querySelectorAll("." + c), e2 = 0; e2 < t2.length; e2++) {
            t2[e2].classList.remove(l);
          }
        };
      }, function(t, e) {
        var n;
        n = /* @__PURE__ */ (function() {
          return this;
        })();
        try {
          n = n || Function("return this")() || (0, eval)("this");
        } catch (t2) {
          "object" == typeof window && (n = window);
        }
        t.exports = n;
      }, function(t, e, n) {
        (function(e2) {
          t.exports = e2.sweetAlert = n(9);
        }).call(e, n(7));
      }, function(t, e, n) {
        (function(e2) {
          t.exports = e2.swal = n(10);
        }).call(e, n(7));
      }, function(t, e, n) {
        "undefined" != typeof window && n(11), n(16);
        var o = n(23).default;
        t.exports = o;
      }, function(t, e, n) {
        var o = n(12);
        "string" == typeof o && (o = [[t.i, o, ""]]);
        var r = { insertAt: "top" };
        r.transform = void 0;
        n(14)(o, r);
        o.locals && (t.exports = o.locals);
      }, function(t, e, n) {
        e = t.exports = n(13)(void 0), e.push([t.i, '.swal-icon--error{border-color:#f27474;-webkit-animation:animateErrorIcon .5s;animation:animateErrorIcon .5s}.swal-icon--error__x-mark{position:relative;display:block;-webkit-animation:animateXMark .5s;animation:animateXMark .5s}.swal-icon--error__line{position:absolute;height:5px;width:47px;background-color:#f27474;display:block;top:37px;border-radius:2px}.swal-icon--error__line--left{-webkit-transform:rotate(45deg);transform:rotate(45deg);left:17px}.swal-icon--error__line--right{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:16px}@-webkit-keyframes animateErrorIcon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@keyframes animateErrorIcon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@-webkit-keyframes animateXMark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}@keyframes animateXMark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}.swal-icon--warning{border-color:#f8bb86;-webkit-animation:pulseWarning .75s infinite alternate;animation:pulseWarning .75s infinite alternate}.swal-icon--warning__body{width:5px;height:47px;top:10px;border-radius:2px;margin-left:-2px}.swal-icon--warning__body,.swal-icon--warning__dot{position:absolute;left:50%;background-color:#f8bb86}.swal-icon--warning__dot{width:7px;height:7px;border-radius:50%;margin-left:-4px;bottom:-11px}@-webkit-keyframes pulseWarning{0%{border-color:#f8d486}to{border-color:#f8bb86}}@keyframes pulseWarning{0%{border-color:#f8d486}to{border-color:#f8bb86}}.swal-icon--success{border-color:#a5dc86}.swal-icon--success:after,.swal-icon--success:before{content:"";border-radius:50%;position:absolute;width:60px;height:120px;background:#fff;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal-icon--success:before{border-radius:120px 0 0 120px;top:-7px;left:-33px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:60px 60px;transform-origin:60px 60px}.swal-icon--success:after{border-radius:0 120px 120px 0;top:-11px;left:30px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 60px;transform-origin:0 60px;-webkit-animation:rotatePlaceholder 4.25s ease-in;animation:rotatePlaceholder 4.25s ease-in}.swal-icon--success__ring{width:80px;height:80px;border:4px solid hsla(98,55%,69%,.2);border-radius:50%;box-sizing:content-box;position:absolute;left:-4px;top:-4px;z-index:2}.swal-icon--success__hide-corners{width:5px;height:90px;background-color:#fff;padding:1px;position:absolute;left:28px;top:8px;z-index:1;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal-icon--success__line{height:5px;background-color:#a5dc86;display:block;border-radius:2px;position:absolute;z-index:2}.swal-icon--success__line--tip{width:25px;left:14px;top:46px;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-animation:animateSuccessTip .75s;animation:animateSuccessTip .75s}.swal-icon--success__line--long{width:47px;right:8px;top:38px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-animation:animateSuccessLong .75s;animation:animateSuccessLong .75s}@-webkit-keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@-webkit-keyframes animateSuccessTip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@keyframes animateSuccessTip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@-webkit-keyframes animateSuccessLong{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}@keyframes animateSuccessLong{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}.swal-icon--info{border-color:#c9dae1}.swal-icon--info:before{width:5px;height:29px;bottom:17px;border-radius:2px;margin-left:-2px}.swal-icon--info:after,.swal-icon--info:before{content:"";position:absolute;left:50%;background-color:#c9dae1}.swal-icon--info:after{width:7px;height:7px;border-radius:50%;margin-left:-3px;top:19px}.swal-icon{width:80px;height:80px;border-width:4px;border-style:solid;border-radius:50%;padding:0;position:relative;box-sizing:content-box;margin:20px auto}.swal-icon:first-child{margin-top:32px}.swal-icon--custom{width:auto;height:auto;max-width:100%;border:none;border-radius:0}.swal-icon img{max-width:100%;max-height:100%}.swal-title{color:rgba(0,0,0,.65);font-weight:600;text-transform:none;position:relative;display:block;padding:13px 16px;font-size:27px;line-height:normal;text-align:center;margin-bottom:0}.swal-title:first-child{margin-top:26px}.swal-title:not(:first-child){padding-bottom:0}.swal-title:not(:last-child){margin-bottom:13px}.swal-text{font-size:16px;position:relative;float:none;line-height:normal;vertical-align:top;text-align:left;display:inline-block;margin:0;padding:0 10px;font-weight:400;color:rgba(0,0,0,.64);max-width:calc(100% - 20px);overflow-wrap:break-word;box-sizing:border-box}.swal-text:first-child{margin-top:45px}.swal-text:last-child{margin-bottom:45px}.swal-footer{text-align:right;padding-top:13px;margin-top:13px;padding:13px 16px;border-radius:inherit;border-top-left-radius:0;border-top-right-radius:0}.swal-button-container{margin:5px;display:inline-block;position:relative}.swal-button{background-color:#7cd1f9;color:#fff;border:none;box-shadow:none;border-radius:5px;font-weight:600;font-size:14px;padding:10px 24px;margin:0;cursor:pointer}.swal-button:not([disabled]):hover{background-color:#78cbf2}.swal-button:active{background-color:#70bce0}.swal-button:focus{outline:none;box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(43,114,165,.29)}.swal-button[disabled]{opacity:.5;cursor:default}.swal-button::-moz-focus-inner{border:0}.swal-button--cancel{color:#555;background-color:#efefef}.swal-button--cancel:not([disabled]):hover{background-color:#e8e8e8}.swal-button--cancel:active{background-color:#d7d7d7}.swal-button--cancel:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(116,136,150,.29)}.swal-button--danger{background-color:#e64942}.swal-button--danger:not([disabled]):hover{background-color:#df4740}.swal-button--danger:active{background-color:#cf423b}.swal-button--danger:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(165,43,43,.29)}.swal-content{padding:0 20px;margin-top:20px;font-size:medium}.swal-content:last-child{margin-bottom:20px}.swal-content__input,.swal-content__textarea{-webkit-appearance:none;background-color:#fff;border:none;font-size:14px;display:block;box-sizing:border-box;width:100%;border:1px solid rgba(0,0,0,.14);padding:10px 13px;border-radius:2px;transition:border-color .2s}.swal-content__input:focus,.swal-content__textarea:focus{outline:none;border-color:#6db8ff}.swal-content__textarea{resize:vertical}.swal-button--loading{color:transparent}.swal-button--loading~.swal-button__loader{opacity:1}.swal-button__loader{position:absolute;height:auto;width:43px;z-index:2;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);text-align:center;pointer-events:none;opacity:0}.swal-button__loader div{display:inline-block;float:none;vertical-align:baseline;width:9px;height:9px;padding:0;border:none;margin:2px;opacity:.4;border-radius:7px;background-color:hsla(0,0%,100%,.9);transition:background .2s;-webkit-animation:swal-loading-anim 1s infinite;animation:swal-loading-anim 1s infinite}.swal-button__loader div:nth-child(3n+2){-webkit-animation-delay:.15s;animation-delay:.15s}.swal-button__loader div:nth-child(3n+3){-webkit-animation-delay:.3s;animation-delay:.3s}@-webkit-keyframes swal-loading-anim{0%{opacity:.4}20%{opacity:.4}50%{opacity:1}to{opacity:.4}}@keyframes swal-loading-anim{0%{opacity:.4}20%{opacity:.4}50%{opacity:1}to{opacity:.4}}.swal-overlay{position:fixed;top:0;bottom:0;left:0;right:0;text-align:center;font-size:0;overflow-y:auto;background-color:rgba(0,0,0,.4);z-index:10000;pointer-events:none;opacity:0;transition:opacity .3s}.swal-overlay:before{content:" ";display:inline-block;vertical-align:middle;height:100%}.swal-overlay--show-modal{opacity:1;pointer-events:auto}.swal-overlay--show-modal .swal-modal{opacity:1;pointer-events:auto;box-sizing:border-box;-webkit-animation:showSweetAlert .3s;animation:showSweetAlert .3s;will-change:transform}.swal-modal{width:478px;opacity:0;pointer-events:none;background-color:#fff;text-align:center;border-radius:5px;position:static;margin:20px auto;display:inline-block;vertical-align:middle;-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:50% 50%;transform-origin:50% 50%;z-index:10001;transition:opacity .2s,-webkit-transform .3s;transition:transform .3s,opacity .2s;transition:transform .3s,opacity .2s,-webkit-transform .3s}@media (max-width:500px){.swal-modal{width:calc(100% - 20px)}}@-webkit-keyframes showSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1)}1%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes showSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1)}1%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}', ""]);
      }, function(t, e) {
        function n(t2, e2) {
          var n2 = t2[1] || "", r = t2[3];
          if (!r) return n2;
          if (e2 && "function" == typeof btoa) {
            var i = o(r);
            return [n2].concat(r.sources.map(function(t3) {
              return "/*# sourceURL=" + r.sourceRoot + t3 + " */";
            })).concat([i]).join("\n");
          }
          return [n2].join("\n");
        }
        function o(t2) {
          return "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(t2)))) + " */";
        }
        t.exports = function(t2) {
          var e2 = [];
          return e2.toString = function() {
            return this.map(function(e3) {
              var o2 = n(e3, t2);
              return e3[2] ? "@media " + e3[2] + "{" + o2 + "}" : o2;
            }).join("");
          }, e2.i = function(t3, n2) {
            "string" == typeof t3 && (t3 = [[null, t3, ""]]);
            for (var o2 = {}, r = 0; r < this.length; r++) {
              var i = this[r][0];
              "number" == typeof i && (o2[i] = true);
            }
            for (r = 0; r < t3.length; r++) {
              var a = t3[r];
              "number" == typeof a[0] && o2[a[0]] || (n2 && !a[2] ? a[2] = n2 : n2 && (a[2] = "(" + a[2] + ") and (" + n2 + ")"), e2.push(a));
            }
          }, e2;
        };
      }, function(t, e, n) {
        function o(t2, e2) {
          for (var n2 = 0; n2 < t2.length; n2++) {
            var o2 = t2[n2], r2 = m[o2.id];
            if (r2) {
              r2.refs++;
              for (var i2 = 0; i2 < r2.parts.length; i2++) r2.parts[i2](o2.parts[i2]);
              for (; i2 < o2.parts.length; i2++) r2.parts.push(u2(o2.parts[i2], e2));
            } else {
              for (var a2 = [], i2 = 0; i2 < o2.parts.length; i2++) a2.push(u2(o2.parts[i2], e2));
              m[o2.id] = { id: o2.id, refs: 1, parts: a2 };
            }
          }
        }
        function r(t2, e2) {
          for (var n2 = [], o2 = {}, r2 = 0; r2 < t2.length; r2++) {
            var i2 = t2[r2], a2 = e2.base ? i2[0] + e2.base : i2[0], s2 = i2[1], c2 = i2[2], l2 = i2[3], u3 = { css: s2, media: c2, sourceMap: l2 };
            o2[a2] ? o2[a2].parts.push(u3) : n2.push(o2[a2] = { id: a2, parts: [u3] });
          }
          return n2;
        }
        function i(t2, e2) {
          var n2 = v(t2.insertInto);
          if (!n2) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
          var o2 = w[w.length - 1];
          if ("top" === t2.insertAt) o2 ? o2.nextSibling ? n2.insertBefore(e2, o2.nextSibling) : n2.appendChild(e2) : n2.insertBefore(e2, n2.firstChild), w.push(e2);
          else {
            if ("bottom" !== t2.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
            n2.appendChild(e2);
          }
        }
        function a(t2) {
          if (null === t2.parentNode) return false;
          t2.parentNode.removeChild(t2);
          var e2 = w.indexOf(t2);
          e2 >= 0 && w.splice(e2, 1);
        }
        function s(t2) {
          var e2 = document.createElement("style");
          return t2.attrs.type = "text/css", l(e2, t2.attrs), i(t2, e2), e2;
        }
        function c(t2) {
          var e2 = document.createElement("link");
          return t2.attrs.type = "text/css", t2.attrs.rel = "stylesheet", l(e2, t2.attrs), i(t2, e2), e2;
        }
        function l(t2, e2) {
          Object.keys(e2).forEach(function(n2) {
            t2.setAttribute(n2, e2[n2]);
          });
        }
        function u2(t2, e2) {
          var n2, o2, r2, i2;
          if (e2.transform && t2.css) {
            if (!(i2 = e2.transform(t2.css))) return function() {
            };
            t2.css = i2;
          }
          if (e2.singleton) {
            var l2 = h2++;
            n2 = g || (g = s(e2)), o2 = f.bind(null, n2, l2, false), r2 = f.bind(null, n2, l2, true);
          } else t2.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n2 = c(e2), o2 = p.bind(null, n2, e2), r2 = function() {
            a(n2), n2.href && URL.revokeObjectURL(n2.href);
          }) : (n2 = s(e2), o2 = d.bind(null, n2), r2 = function() {
            a(n2);
          });
          return o2(t2), function(e3) {
            if (e3) {
              if (e3.css === t2.css && e3.media === t2.media && e3.sourceMap === t2.sourceMap) return;
              o2(t2 = e3);
            } else r2();
          };
        }
        function f(t2, e2, n2, o2) {
          var r2 = n2 ? "" : o2.css;
          if (t2.styleSheet) t2.styleSheet.cssText = x(e2, r2);
          else {
            var i2 = document.createTextNode(r2), a2 = t2.childNodes;
            a2[e2] && t2.removeChild(a2[e2]), a2.length ? t2.insertBefore(i2, a2[e2]) : t2.appendChild(i2);
          }
        }
        function d(t2, e2) {
          var n2 = e2.css, o2 = e2.media;
          if (o2 && t2.setAttribute("media", o2), t2.styleSheet) t2.styleSheet.cssText = n2;
          else {
            for (; t2.firstChild; ) t2.removeChild(t2.firstChild);
            t2.appendChild(document.createTextNode(n2));
          }
        }
        function p(t2, e2, n2) {
          var o2 = n2.css, r2 = n2.sourceMap, i2 = void 0 === e2.convertToAbsoluteUrls && r2;
          (e2.convertToAbsoluteUrls || i2) && (o2 = y(o2)), r2 && (o2 += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r2)))) + " */");
          var a2 = new Blob([o2], { type: "text/css" }), s2 = t2.href;
          t2.href = URL.createObjectURL(a2), s2 && URL.revokeObjectURL(s2);
        }
        var m = {}, b = /* @__PURE__ */ (function(t2) {
          var e2;
          return function() {
            return void 0 === e2 && (e2 = t2.apply(this, arguments)), e2;
          };
        })(function() {
          return window && document && document.all && !window.atob;
        }), v = /* @__PURE__ */ (function(t2) {
          var e2 = {};
          return function(n2) {
            return void 0 === e2[n2] && (e2[n2] = t2.call(this, n2)), e2[n2];
          };
        })(function(t2) {
          return document.querySelector(t2);
        }), g = null, h2 = 0, w = [], y = n(15);
        t.exports = function(t2, e2) {
          if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
          e2 = e2 || {}, e2.attrs = "object" == typeof e2.attrs ? e2.attrs : {}, e2.singleton || (e2.singleton = b()), e2.insertInto || (e2.insertInto = "head"), e2.insertAt || (e2.insertAt = "bottom");
          var n2 = r(t2, e2);
          return o(n2, e2), function(t3) {
            for (var i2 = [], a2 = 0; a2 < n2.length; a2++) {
              var s2 = n2[a2], c2 = m[s2.id];
              c2.refs--, i2.push(c2);
            }
            if (t3) {
              o(r(t3, e2), e2);
            }
            for (var a2 = 0; a2 < i2.length; a2++) {
              var c2 = i2[a2];
              if (0 === c2.refs) {
                for (var l2 = 0; l2 < c2.parts.length; l2++) c2.parts[l2]();
                delete m[c2.id];
              }
            }
          };
        };
        var x = /* @__PURE__ */ (function() {
          var t2 = [];
          return function(e2, n2) {
            return t2[e2] = n2, t2.filter(Boolean).join("\n");
          };
        })();
      }, function(t, e) {
        t.exports = function(t2) {
          var e2 = "undefined" != typeof window && window.location;
          if (!e2) throw new Error("fixUrls requires window.location");
          if (!t2 || "string" != typeof t2) return t2;
          var n = e2.protocol + "//" + e2.host, o = n + e2.pathname.replace(/\/[^\/]*$/, "/");
          return t2.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(t3, e3) {
            var r = e3.trim().replace(/^"(.*)"$/, function(t4, e4) {
              return e4;
            }).replace(/^'(.*)'$/, function(t4, e4) {
              return e4;
            });
            if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(r)) return t3;
            var i;
            return i = 0 === r.indexOf("//") ? r : 0 === r.indexOf("/") ? n + r : o + r.replace(/^\.\//, ""), "url(" + JSON.stringify(i) + ")";
          });
        };
      }, function(t, e, n) {
        var o = n(17);
        "undefined" == typeof window || window.Promise || (window.Promise = o), n(21), String.prototype.includes || (String.prototype.includes = function(t2, e2) {
          return "number" != typeof e2 && (e2 = 0), !(e2 + t2.length > this.length) && -1 !== this.indexOf(t2, e2);
        }), Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", { value: function(t2, e2) {
          if (null == this) throw new TypeError('"this" is null or not defined');
          var n2 = Object(this), o2 = n2.length >>> 0;
          if (0 === o2) return false;
          for (var r = 0 | e2, i = Math.max(r >= 0 ? r : o2 - Math.abs(r), 0); i < o2; ) {
            if ((function(t3, e3) {
              return t3 === e3 || "number" == typeof t3 && "number" == typeof e3 && isNaN(t3) && isNaN(e3);
            })(n2[i], t2)) return true;
            i++;
          }
          return false;
        } }), "undefined" != typeof window && (function(t2) {
          t2.forEach(function(t3) {
            t3.hasOwnProperty("remove") || Object.defineProperty(t3, "remove", { configurable: true, enumerable: true, writable: true, value: function() {
              this.parentNode.removeChild(this);
            } });
          });
        })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
      }, function(t, e, n) {
        (function(e2) {
          !(function(n2) {
            function o() {
            }
            function r(t2, e3) {
              return function() {
                t2.apply(e3, arguments);
              };
            }
            function i(t2) {
              if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
              if ("function" != typeof t2) throw new TypeError("not a function");
              this._state = 0, this._handled = false, this._value = void 0, this._deferreds = [], f(t2, this);
            }
            function a(t2, e3) {
              for (; 3 === t2._state; ) t2 = t2._value;
              if (0 === t2._state) return void t2._deferreds.push(e3);
              t2._handled = true, i._immediateFn(function() {
                var n3 = 1 === t2._state ? e3.onFulfilled : e3.onRejected;
                if (null === n3) return void (1 === t2._state ? s : c)(e3.promise, t2._value);
                var o2;
                try {
                  o2 = n3(t2._value);
                } catch (t3) {
                  return void c(e3.promise, t3);
                }
                s(e3.promise, o2);
              });
            }
            function s(t2, e3) {
              try {
                if (e3 === t2) throw new TypeError("A promise cannot be resolved with itself.");
                if (e3 && ("object" == typeof e3 || "function" == typeof e3)) {
                  var n3 = e3.then;
                  if (e3 instanceof i) return t2._state = 3, t2._value = e3, void l(t2);
                  if ("function" == typeof n3) return void f(r(n3, e3), t2);
                }
                t2._state = 1, t2._value = e3, l(t2);
              } catch (e4) {
                c(t2, e4);
              }
            }
            function c(t2, e3) {
              t2._state = 2, t2._value = e3, l(t2);
            }
            function l(t2) {
              2 === t2._state && 0 === t2._deferreds.length && i._immediateFn(function() {
                t2._handled || i._unhandledRejectionFn(t2._value);
              });
              for (var e3 = 0, n3 = t2._deferreds.length; e3 < n3; e3++) a(t2, t2._deferreds[e3]);
              t2._deferreds = null;
            }
            function u2(t2, e3, n3) {
              this.onFulfilled = "function" == typeof t2 ? t2 : null, this.onRejected = "function" == typeof e3 ? e3 : null, this.promise = n3;
            }
            function f(t2, e3) {
              var n3 = false;
              try {
                t2(function(t3) {
                  n3 || (n3 = true, s(e3, t3));
                }, function(t3) {
                  n3 || (n3 = true, c(e3, t3));
                });
              } catch (t3) {
                if (n3) return;
                n3 = true, c(e3, t3);
              }
            }
            var d = setTimeout;
            i.prototype.catch = function(t2) {
              return this.then(null, t2);
            }, i.prototype.then = function(t2, e3) {
              var n3 = new this.constructor(o);
              return a(this, new u2(t2, e3, n3)), n3;
            }, i.all = function(t2) {
              var e3 = Array.prototype.slice.call(t2);
              return new i(function(t3, n3) {
                function o2(i3, a2) {
                  try {
                    if (a2 && ("object" == typeof a2 || "function" == typeof a2)) {
                      var s2 = a2.then;
                      if ("function" == typeof s2) return void s2.call(a2, function(t4) {
                        o2(i3, t4);
                      }, n3);
                    }
                    e3[i3] = a2, 0 == --r2 && t3(e3);
                  } catch (t4) {
                    n3(t4);
                  }
                }
                if (0 === e3.length) return t3([]);
                for (var r2 = e3.length, i2 = 0; i2 < e3.length; i2++) o2(i2, e3[i2]);
              });
            }, i.resolve = function(t2) {
              return t2 && "object" == typeof t2 && t2.constructor === i ? t2 : new i(function(e3) {
                e3(t2);
              });
            }, i.reject = function(t2) {
              return new i(function(e3, n3) {
                n3(t2);
              });
            }, i.race = function(t2) {
              return new i(function(e3, n3) {
                for (var o2 = 0, r2 = t2.length; o2 < r2; o2++) t2[o2].then(e3, n3);
              });
            }, i._immediateFn = "function" == typeof e2 && function(t2) {
              e2(t2);
            } || function(t2) {
              d(t2, 0);
            }, i._unhandledRejectionFn = function(t2) {
              "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t2);
            }, i._setImmediateFn = function(t2) {
              i._immediateFn = t2;
            }, i._setUnhandledRejectionFn = function(t2) {
              i._unhandledRejectionFn = t2;
            }, void 0 !== t && t.exports ? t.exports = i : n2.Promise || (n2.Promise = i);
          })(this);
        }).call(e, n(18).setImmediate);
      }, function(t, e, n) {
        function o(t2, e2) {
          this._id = t2, this._clearFn = e2;
        }
        var r = Function.prototype.apply;
        e.setTimeout = function() {
          return new o(r.call(setTimeout, window, arguments), clearTimeout);
        }, e.setInterval = function() {
          return new o(r.call(setInterval, window, arguments), clearInterval);
        }, e.clearTimeout = e.clearInterval = function(t2) {
          t2 && t2.close();
        }, o.prototype.unref = o.prototype.ref = function() {
        }, o.prototype.close = function() {
          this._clearFn.call(window, this._id);
        }, e.enroll = function(t2, e2) {
          clearTimeout(t2._idleTimeoutId), t2._idleTimeout = e2;
        }, e.unenroll = function(t2) {
          clearTimeout(t2._idleTimeoutId), t2._idleTimeout = -1;
        }, e._unrefActive = e.active = function(t2) {
          clearTimeout(t2._idleTimeoutId);
          var e2 = t2._idleTimeout;
          e2 >= 0 && (t2._idleTimeoutId = setTimeout(function() {
            t2._onTimeout && t2._onTimeout();
          }, e2));
        }, n(19), e.setImmediate = setImmediate, e.clearImmediate = clearImmediate;
      }, function(t, e, n) {
        (function(t2, e2) {
          !(function(t3, n2) {
            function o(t4) {
              "function" != typeof t4 && (t4 = new Function("" + t4));
              for (var e3 = new Array(arguments.length - 1), n3 = 0; n3 < e3.length; n3++) e3[n3] = arguments[n3 + 1];
              var o2 = { callback: t4, args: e3 };
              return l[c] = o2, s(c), c++;
            }
            function r(t4) {
              delete l[t4];
            }
            function i(t4) {
              var e3 = t4.callback, o2 = t4.args;
              switch (o2.length) {
                case 0:
                  e3();
                  break;
                case 1:
                  e3(o2[0]);
                  break;
                case 2:
                  e3(o2[0], o2[1]);
                  break;
                case 3:
                  e3(o2[0], o2[1], o2[2]);
                  break;
                default:
                  e3.apply(n2, o2);
              }
            }
            function a(t4) {
              if (u2) setTimeout(a, 0, t4);
              else {
                var e3 = l[t4];
                if (e3) {
                  u2 = true;
                  try {
                    i(e3);
                  } finally {
                    r(t4), u2 = false;
                  }
                }
              }
            }
            if (!t3.setImmediate) {
              var s, c = 1, l = {}, u2 = false, f = t3.document, d = Object.getPrototypeOf && Object.getPrototypeOf(t3);
              d = d && d.setTimeout ? d : t3, "[object process]" === {}.toString.call(t3.process) ? (function() {
                s = function(t4) {
                  e2.nextTick(function() {
                    a(t4);
                  });
                };
              })() : (function() {
                if (t3.postMessage && !t3.importScripts) {
                  var e3 = true, n3 = t3.onmessage;
                  return t3.onmessage = function() {
                    e3 = false;
                  }, t3.postMessage("", "*"), t3.onmessage = n3, e3;
                }
              })() ? (function() {
                var e3 = "setImmediate$" + Math.random() + "$", n3 = function(n4) {
                  n4.source === t3 && "string" == typeof n4.data && 0 === n4.data.indexOf(e3) && a(+n4.data.slice(e3.length));
                };
                t3.addEventListener ? t3.addEventListener("message", n3, false) : t3.attachEvent("onmessage", n3), s = function(n4) {
                  t3.postMessage(e3 + n4, "*");
                };
              })() : t3.MessageChannel ? (function() {
                var t4 = new MessageChannel();
                t4.port1.onmessage = function(t5) {
                  a(t5.data);
                }, s = function(e3) {
                  t4.port2.postMessage(e3);
                };
              })() : f && "onreadystatechange" in f.createElement("script") ? (function() {
                var t4 = f.documentElement;
                s = function(e3) {
                  var n3 = f.createElement("script");
                  n3.onreadystatechange = function() {
                    a(e3), n3.onreadystatechange = null, t4.removeChild(n3), n3 = null;
                  }, t4.appendChild(n3);
                };
              })() : (function() {
                s = function(t4) {
                  setTimeout(a, 0, t4);
                };
              })(), d.setImmediate = o, d.clearImmediate = r;
            }
          })("undefined" == typeof self ? void 0 === t2 ? this : t2 : self);
        }).call(e, n(7), n(20));
      }, function(t, e) {
        function n() {
          throw new Error("setTimeout has not been defined");
        }
        function o() {
          throw new Error("clearTimeout has not been defined");
        }
        function r(t2) {
          if (u2 === setTimeout) return setTimeout(t2, 0);
          if ((u2 === n || !u2) && setTimeout) return u2 = setTimeout, setTimeout(t2, 0);
          try {
            return u2(t2, 0);
          } catch (e2) {
            try {
              return u2.call(null, t2, 0);
            } catch (e3) {
              return u2.call(this, t2, 0);
            }
          }
        }
        function i(t2) {
          if (f === clearTimeout) return clearTimeout(t2);
          if ((f === o || !f) && clearTimeout) return f = clearTimeout, clearTimeout(t2);
          try {
            return f(t2);
          } catch (e2) {
            try {
              return f.call(null, t2);
            } catch (e3) {
              return f.call(this, t2);
            }
          }
        }
        function a() {
          b && p && (b = false, p.length ? m = p.concat(m) : v = -1, m.length && s());
        }
        function s() {
          if (!b) {
            var t2 = r(a);
            b = true;
            for (var e2 = m.length; e2; ) {
              for (p = m, m = []; ++v < e2; ) p && p[v].run();
              v = -1, e2 = m.length;
            }
            p = null, b = false, i(t2);
          }
        }
        function c(t2, e2) {
          this.fun = t2, this.array = e2;
        }
        function l() {
        }
        var u2, f, d = t.exports = {};
        !(function() {
          try {
            u2 = "function" == typeof setTimeout ? setTimeout : n;
          } catch (t2) {
            u2 = n;
          }
          try {
            f = "function" == typeof clearTimeout ? clearTimeout : o;
          } catch (t2) {
            f = o;
          }
        })();
        var p, m = [], b = false, v = -1;
        d.nextTick = function(t2) {
          var e2 = new Array(arguments.length - 1);
          if (arguments.length > 1) for (var n2 = 1; n2 < arguments.length; n2++) e2[n2 - 1] = arguments[n2];
          m.push(new c(t2, e2)), 1 !== m.length || b || r(s);
        }, c.prototype.run = function() {
          this.fun.apply(null, this.array);
        }, d.title = "browser", d.browser = true, d.env = {}, d.argv = [], d.version = "", d.versions = {}, d.on = l, d.addListener = l, d.once = l, d.off = l, d.removeListener = l, d.removeAllListeners = l, d.emit = l, d.prependListener = l, d.prependOnceListener = l, d.listeners = function(t2) {
          return [];
        }, d.binding = function(t2) {
          throw new Error("process.binding is not supported");
        }, d.cwd = function() {
          return "/";
        }, d.chdir = function(t2) {
          throw new Error("process.chdir is not supported");
        }, d.umask = function() {
          return 0;
        };
      }, function(t, e, n) {
        n(22).polyfill();
      }, function(t, e, n) {
        function o(t2, e2) {
          if (void 0 === t2 || null === t2) throw new TypeError("Cannot convert first argument to object");
          for (var n2 = Object(t2), o2 = 1; o2 < arguments.length; o2++) {
            var r2 = arguments[o2];
            if (void 0 !== r2 && null !== r2) for (var i = Object.keys(Object(r2)), a = 0, s = i.length; a < s; a++) {
              var c = i[a], l = Object.getOwnPropertyDescriptor(r2, c);
              void 0 !== l && l.enumerable && (n2[c] = r2[c]);
            }
          }
          return n2;
        }
        function r() {
          Object.assign || Object.defineProperty(Object, "assign", { enumerable: false, configurable: true, writable: true, value: o });
        }
        t.exports = { assign: o, polyfill: r };
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(24), r = n(6), i = n(5), a = n(36), s = function() {
          for (var t2 = [], e2 = 0; e2 < arguments.length; e2++) t2[e2] = arguments[e2];
          if ("undefined" != typeof window) {
            var n2 = a.getOpts.apply(void 0, t2);
            return new Promise(function(t3, e3) {
              i.default.promise = { resolve: t3, reject: e3 }, o.default(n2), setTimeout(function() {
                r.openModal();
              });
            });
          }
        };
        s.close = r.onAction, s.getState = r.getState, s.setActionValue = i.setActionValue, s.stopLoading = r.stopLoading, s.setDefaults = a.setDefaults, e.default = s;
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(1), r = n(0), i = r.default.MODAL, a = n(4), s = n(34), c = n(35), l = n(1);
        e.init = function(t2) {
          o.getNode(i) || (document.body || l.throwErr("You can only use SweetAlert AFTER the DOM has loaded!"), s.default(), a.default()), a.initModalContent(t2), c.default(t2);
        }, e.default = e.init;
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(0), r = o.default.MODAL;
        e.modalMarkup = '\n  <div class="' + r + '" role="dialog" aria-modal="true"></div>', e.default = e.modalMarkup;
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(0), r = o.default.OVERLAY, i = '<div \n    class="' + r + '"\n    tabIndex="-1">\n  </div>';
        e.default = i;
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(0), r = o.default.ICON;
        e.errorIconMarkup = function() {
          var t2 = r + "--error", e2 = t2 + "__line";
          return '\n    <div class="' + t2 + '__x-mark">\n      <span class="' + e2 + " " + e2 + '--left"></span>\n      <span class="' + e2 + " " + e2 + '--right"></span>\n    </div>\n  ';
        }, e.warningIconMarkup = function() {
          var t2 = r + "--warning";
          return '\n    <span class="' + t2 + '__body">\n      <span class="' + t2 + '__dot"></span>\n    </span>\n  ';
        }, e.successIconMarkup = function() {
          var t2 = r + "--success";
          return '\n    <span class="' + t2 + "__line " + t2 + '__line--long"></span>\n    <span class="' + t2 + "__line " + t2 + '__line--tip"></span>\n\n    <div class="' + t2 + '__ring"></div>\n    <div class="' + t2 + '__hide-corners"></div>\n  ';
        };
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(0), r = o.default.CONTENT;
        e.contentMarkup = '\n  <div class="' + r + '">\n\n  </div>\n';
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(0), r = o.default.BUTTON_CONTAINER, i = o.default.BUTTON, a = o.default.BUTTON_LOADER;
        e.buttonMarkup = '\n  <div class="' + r + '">\n\n    <button\n      class="' + i + '"\n    ></button>\n\n    <div class="' + a + '">\n      <div></div>\n      <div></div>\n      <div></div>\n    </div>\n\n  </div>\n';
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(4), r = n(2), i = n(0), a = i.default.ICON, s = i.default.ICON_CUSTOM, c = ["error", "warning", "success", "info"], l = { error: r.errorIconMarkup(), warning: r.warningIconMarkup(), success: r.successIconMarkup() }, u2 = function(t2, e2) {
          var n2 = a + "--" + t2;
          e2.classList.add(n2);
          var o2 = l[t2];
          o2 && (e2.innerHTML = o2);
        }, f = function(t2, e2) {
          e2.classList.add(s);
          var n2 = document.createElement("img");
          n2.src = t2, e2.appendChild(n2);
        }, d = function(t2) {
          if (t2) {
            var e2 = o.injectElIntoModal(r.iconMarkup);
            c.includes(t2) ? u2(t2, e2) : f(t2, e2);
          }
        };
        e.default = d;
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(2), r = n(4), i = function(t2) {
          navigator.userAgent.includes("AppleWebKit") && (t2.style.display = "none", t2.offsetHeight, t2.style.display = "");
        };
        e.initTitle = function(t2) {
          if (t2) {
            var e2 = r.injectElIntoModal(o.titleMarkup);
            e2.textContent = t2, i(e2);
          }
        }, e.initText = function(t2) {
          if (t2) {
            var e2 = document.createDocumentFragment();
            t2.split("\n").forEach(function(t3, n3, o2) {
              e2.appendChild(document.createTextNode(t3)), n3 < o2.length - 1 && e2.appendChild(document.createElement("br"));
            });
            var n2 = r.injectElIntoModal(o.textMarkup);
            n2.appendChild(e2), i(n2);
          }
        };
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(1), r = n(4), i = n(0), a = i.default.BUTTON, s = i.default.DANGER_BUTTON, c = n(3), l = n(2), u2 = n(6), f = n(5), d = function(t2, e2, n2) {
          var r2 = e2.text, i2 = e2.value, d2 = e2.className, p2 = e2.closeModal, m = o.stringToNode(l.buttonMarkup), b = m.querySelector("." + a), v = a + "--" + t2;
          if (b.classList.add(v), d2) {
            (Array.isArray(d2) ? d2 : d2.split(" ")).filter(function(t3) {
              return t3.length > 0;
            }).forEach(function(t3) {
              b.classList.add(t3);
            });
          }
          n2 && t2 === c.CONFIRM_KEY && b.classList.add(s), b.textContent = r2;
          var g = {};
          return g[t2] = i2, f.setActionValue(g), f.setActionOptionsFor(t2, { closeModal: p2 }), b.addEventListener("click", function() {
            return u2.onAction(t2);
          }), m;
        }, p = function(t2, e2) {
          var n2 = r.injectElIntoModal(l.footerMarkup);
          for (var o2 in t2) {
            var i2 = t2[o2], a2 = d(o2, i2, e2);
            i2.visible && n2.appendChild(a2);
          }
          0 === n2.children.length && n2.remove();
        };
        e.default = p;
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(3), r = n(4), i = n(2), a = n(5), s = n(6), c = n(0), l = c.default.CONTENT, u2 = function(t2) {
          t2.addEventListener("input", function(t3) {
            var e2 = t3.target, n2 = e2.value;
            a.setActionValue(n2);
          }), t2.addEventListener("keyup", function(t3) {
            if ("Enter" === t3.key) return s.onAction(o.CONFIRM_KEY);
          }), setTimeout(function() {
            t2.focus(), a.setActionValue("");
          }, 0);
        }, f = function(t2, e2, n2) {
          var o2 = document.createElement(e2), r2 = l + "__" + e2;
          o2.classList.add(r2);
          for (var i2 in n2) {
            var a2 = n2[i2];
            o2[i2] = a2;
          }
          "input" === e2 && u2(o2), t2.appendChild(o2);
        }, d = function(t2) {
          if (t2) {
            var e2 = r.injectElIntoModal(i.contentMarkup), n2 = t2.element, o2 = t2.attributes;
            "string" == typeof n2 ? f(e2, n2, o2) : e2.appendChild(n2);
          }
        };
        e.default = d;
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(1), r = n(2), i = function() {
          var t2 = o.stringToNode(r.overlayMarkup);
          document.body.appendChild(t2);
        };
        e.default = i;
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(5), r = n(6), i = n(1), a = n(3), s = n(0), c = s.default.MODAL, l = s.default.BUTTON, u2 = s.default.OVERLAY, f = function(t2) {
          t2.preventDefault(), v();
        }, d = function(t2) {
          t2.preventDefault(), g();
        }, p = function(t2) {
          if (o.default.isOpen) switch (t2.key) {
            case "Escape":
              return r.onAction(a.CANCEL_KEY);
          }
        }, m = function(t2) {
          if (o.default.isOpen) switch (t2.key) {
            case "Tab":
              return f(t2);
          }
        }, b = function(t2) {
          if (o.default.isOpen) return "Tab" === t2.key && t2.shiftKey ? d(t2) : void 0;
        }, v = function() {
          var t2 = i.getNode(l);
          t2 && (t2.tabIndex = 0, t2.focus());
        }, g = function() {
          var t2 = i.getNode(c), e2 = t2.querySelectorAll("." + l), n2 = e2.length - 1, o2 = e2[n2];
          o2 && o2.focus();
        }, h2 = function(t2) {
          t2[t2.length - 1].addEventListener("keydown", m);
        }, w = function(t2) {
          t2[0].addEventListener("keydown", b);
        }, y = function() {
          var t2 = i.getNode(c), e2 = t2.querySelectorAll("." + l);
          e2.length && (h2(e2), w(e2));
        }, x = function(t2) {
          if (i.getNode(u2) === t2.target) return r.onAction(a.CANCEL_KEY);
        }, _ = function(t2) {
          var e2 = i.getNode(u2);
          e2.removeEventListener("click", x), t2 && e2.addEventListener("click", x);
        }, k = function(t2) {
          o.default.timer && clearTimeout(o.default.timer), t2 && (o.default.timer = window.setTimeout(function() {
            return r.onAction(a.CANCEL_KEY);
          }, t2));
        }, O = function(t2) {
          t2.closeOnEsc ? document.addEventListener("keyup", p) : document.removeEventListener("keyup", p), t2.dangerMode ? v() : g(), y(), _(t2.closeOnClickOutside), k(t2.timer);
        };
        e.default = O;
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(1), r = n(3), i = n(37), a = n(38), s = { title: null, text: null, icon: null, buttons: r.defaultButtonList, content: null, className: null, closeOnClickOutside: true, closeOnEsc: true, dangerMode: false, timer: null }, c = Object.assign({}, s);
        e.setDefaults = function(t2) {
          c = Object.assign({}, s, t2);
        };
        var l = function(t2) {
          var e2 = t2 && t2.button, n2 = t2 && t2.buttons;
          return void 0 !== e2 && void 0 !== n2 && o.throwErr("Cannot set both 'button' and 'buttons' options!"), void 0 !== e2 ? { confirm: e2 } : n2;
        }, u2 = function(t2) {
          return o.ordinalSuffixOf(t2 + 1);
        }, f = function(t2, e2) {
          o.throwErr(u2(e2) + " argument ('" + t2 + "') is invalid");
        }, d = function(t2, e2) {
          var n2 = t2 + 1, r2 = e2[n2];
          o.isPlainObject(r2) || void 0 === r2 || o.throwErr("Expected " + u2(n2) + " argument ('" + r2 + "') to be a plain object");
        }, p = function(t2, e2) {
          var n2 = t2 + 1, r2 = e2[n2];
          void 0 !== r2 && o.throwErr("Unexpected " + u2(n2) + " argument (" + r2 + ")");
        }, m = function(t2, e2, n2, r2) {
          var i2 = typeof e2, a2 = "string" === i2, s2 = e2 instanceof Element;
          if (a2) {
            if (0 === n2) return { text: e2 };
            if (1 === n2) return { text: e2, title: r2[0] };
            if (2 === n2) return d(n2, r2), { icon: e2 };
            f(e2, n2);
          } else {
            if (s2 && 0 === n2) return d(n2, r2), { content: e2 };
            if (o.isPlainObject(e2)) return p(n2, r2), e2;
            f(e2, n2);
          }
        };
        e.getOpts = function() {
          for (var t2 = [], e2 = 0; e2 < arguments.length; e2++) t2[e2] = arguments[e2];
          var n2 = {};
          t2.forEach(function(e3, o3) {
            var r2 = m(0, e3, o3, t2);
            Object.assign(n2, r2);
          });
          var o2 = l(n2);
          n2.buttons = r.getButtonListOpts(o2), delete n2.button, n2.content = i.getContentOpts(n2.content);
          var u3 = Object.assign({}, s, c, n2);
          return Object.keys(u3).forEach(function(t3) {
            a.DEPRECATED_OPTS[t3] && a.logDeprecation(t3);
          }), u3;
        };
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(1), r = { element: "input", attributes: { placeholder: "" } };
        e.getContentOpts = function(t2) {
          var e2 = {};
          return o.isPlainObject(t2) ? Object.assign(e2, t2) : t2 instanceof Element ? { element: t2 } : "input" === t2 ? r : null;
        };
      }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", { value: true }), e.logDeprecation = function(t2) {
          var n2 = e.DEPRECATED_OPTS[t2], o = n2.onlyRename, r = n2.replacement, i = n2.subOption, a = n2.link, s = o ? "renamed" : "deprecated", c = 'SweetAlert warning: "' + t2 + '" option has been ' + s + ".";
          if (r) {
            c += " Please use" + (i ? ' "' + i + '" in ' : " ") + '"' + r + '" instead.';
          }
          var l = "https://sweetalert.js.org";
          c += a ? " More details: " + l + a : " More details: " + l + "/guides/#upgrading-from-1x", console.warn(c);
        }, e.DEPRECATED_OPTS = { type: { replacement: "icon", link: "/docs/#icon" }, imageUrl: { replacement: "icon", link: "/docs/#icon" }, customClass: { replacement: "className", onlyRename: true, link: "/docs/#classname" }, imageSize: {}, showCancelButton: { replacement: "buttons", link: "/docs/#buttons" }, showConfirmButton: { replacement: "button", link: "/docs/#button" }, confirmButtonText: { replacement: "button", link: "/docs/#button" }, confirmButtonColor: {}, cancelButtonText: { replacement: "buttons", link: "/docs/#buttons" }, closeOnConfirm: { replacement: "button", subOption: "closeModal", link: "/docs/#button" }, closeOnCancel: { replacement: "buttons", subOption: "closeModal", link: "/docs/#buttons" }, showLoaderOnConfirm: { replacement: "buttons" }, animation: {}, inputType: { replacement: "content", link: "/docs/#content" }, inputValue: { replacement: "content", link: "/docs/#content" }, inputPlaceholder: { replacement: "content", link: "/docs/#content" }, html: { replacement: "content", link: "/docs/#content" }, allowEscapeKey: { replacement: "closeOnEsc", onlyRename: true, link: "/docs/#closeonesc" }, allowClickOutside: { replacement: "closeOnClickOutside", onlyRename: true, link: "/docs/#closeonclickoutside" } };
      }]);
    });
  })(sweetalert_min$1);
  return sweetalert_min$1.exports;
}
var sweetalert_minExports = requireSweetalert_min();
const swal$1 = /* @__PURE__ */ getDefaultExportFromCjs(sweetalert_minExports);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "AddonBox",
  props: {
    content: {},
    column: {},
    index: {}
  },
  emits: ["duplicate", "delete"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const { addTextToClipboard } = usePageBuilderUtilities();
    const props = __props;
    const emits = __emit;
    const u2 = useUnicorn();
    const options = ref(props.content.options);
    function edit() {
      u2.trigger("addon:edit", props.content, props.column);
    }
    function toggleDisabled(e) {
      const button = e.currentTarget;
      const tt = Tooltip.getOrCreateInstance(button);
      tt.hide();
      button.blur();
      props.content.disabled = !props.content.disabled;
    }
    function copy() {
      addTextToClipboard(props.content);
    }
    function duplicate() {
      emits("duplicate");
    }
    async function remove() {
      const v = await deleteConfirm("Are you sure you want to delete??");
      if (v) {
        emits("delete");
      }
      return v;
    }
    watch(() => props.content, () => {
      options.value = props.content.options;
    }, { deep: true });
    const __returned__ = { addTextToClipboard, props, emits, u: u2, options, edit, toggleDisabled, copy, duplicate, remove };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$5 = ["disabled"];
const _hoisted_2$5 = { class: "card-body d-flex" };
const _hoisted_3$5 = { class: "c-addon-instance__icon" };
const _hoisted_4$5 = { class: "c-addon-instance__title ms-2" };
const _hoisted_5$5 = { class: "m-0" };
const _hoisted_6$5 = { class: "text-muted" };
const _hoisted_7$5 = {
  key: 0,
  class: "small"
};
const _hoisted_8$5 = { class: "c-addon-instance__toolbar" };
const _hoisted_9$5 = { class: "dropdown d-inline-block" };
const _hoisted_10$5 = { class: "dropdown-menu dropdown-menu-end dropdown-menu-right" };
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_tooltip = resolveDirective("tooltip");
  return openBlock(), createElementBlock("div", {
    class: "card c-addon-instance border-2 move-handle",
    style: { "cursor": "move" },
    disabled: $props.content.disabled ? true : null
  }, [
    createElementVNode("div", _hoisted_2$5, [
      createElementVNode("div", _hoisted_3$5, [
        createElementVNode("span", {
          class: normalizeClass($props.content.icon)
        }, null, 2)
      ]),
      _cache[17] || (_cache[17] = createTextVNode()),
      createElementVNode("div", _hoisted_4$5, [
        createElementVNode("h6", _hoisted_5$5, toDisplayString(_ctx.addonProp("name", $props.content.type)), 1),
        _cache[1] || (_cache[1] = createTextVNode()),
        createElementVNode("small", _hoisted_6$5, toDisplayString($setup.options.label || $setup.options.title?.text), 1),
        _cache[2] || (_cache[2] = createTextVNode()),
        _ctx.$debug ? (openBlock(), createElementBlock("code", _hoisted_7$5, toDisplayString($props.content.id), 1)) : createCommentVNode("", true)
      ]),
      _cache[18] || (_cache[18] = createTextVNode()),
      createElementVNode("div", _hoisted_8$5, [
        !$props.content.disabled ? withDirectives((openBlock(), createElementBlock("a", {
          key: 0,
          href: "#",
          class: "text-dark",
          title: "Edit",
          onClick: withModifiers($setup.edit, ["prevent"])
        }, [..._cache[3] || (_cache[3] = [
          createElementVNode("span", { class: "fa fa-fw fa-edit" }, null, -1)
        ])])), [
          [_directive_tooltip]
        ]) : createCommentVNode("", true),
        _cache[13] || (_cache[13] = createTextVNode()),
        !$props.content.disabled ? withDirectives((openBlock(), createElementBlock("a", {
          key: 1,
          href: "#",
          class: "text-dark",
          title: "Duplicate",
          onClick: withModifiers($setup.duplicate, ["prevent"])
        }, [..._cache[4] || (_cache[4] = [
          createElementVNode("span", { class: "fa fa-fw fa-clone" }, null, -1)
        ])])), [
          [_directive_tooltip]
        ]) : createCommentVNode("", true),
        _cache[14] || (_cache[14] = createTextVNode()),
        !$props.content.disabled ? withDirectives((openBlock(), createElementBlock("a", {
          key: 2,
          href: "#",
          class: "text-dark",
          title: "Copy",
          onClick: withModifiers($setup.copy, ["prevent"])
        }, [..._cache[5] || (_cache[5] = [
          createElementVNode("span", { class: "fa fa-fw fa-copy" }, null, -1)
        ])])), [
          [_directive_tooltip]
        ]) : createCommentVNode("", true),
        _cache[15] || (_cache[15] = createTextVNode()),
        $props.content.disabled ? withDirectives((openBlock(), createElementBlock("a", {
          key: 3,
          href: "#",
          class: "text-dark",
          title: "Enable",
          onClick: withModifiers($setup.toggleDisabled, ["prevent"])
        }, [..._cache[6] || (_cache[6] = [
          createElementVNode("span", { class: "fa fa-fw fa-eye-slash" }, null, -1)
        ])])), [
          [_directive_tooltip]
        ]) : withDirectives((openBlock(), createElementBlock("a", {
          key: 4,
          href: "#",
          class: "text-dark",
          title: "Disable",
          onClick: withModifiers($setup.toggleDisabled, ["prevent"])
        }, [..._cache[7] || (_cache[7] = [
          createElementVNode("span", { class: "fa fa-fw fa-eye" }, null, -1)
        ])])), [
          [_directive_tooltip]
        ]),
        _cache[16] || (_cache[16] = createTextVNode()),
        createElementVNode("div", _hoisted_9$5, [
          _cache[11] || (_cache[11] = createElementVNode("button", {
            type: "button",
            class: "btn btn-link btn-mini p-0 d-inline-block",
            "data-toggle": "dropdown",
            "data-bs-toggle": "dropdown"
          }, [
            createElementVNode("span", { class: "fa fa-fw fa-gear text-dark" })
          ], -1)),
          _cache[12] || (_cache[12] = createTextVNode()),
          createElementVNode("div", _hoisted_10$5, [
            createElementVNode("button", {
              type: "button",
              class: "dropdown-item",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$trigger("tmpl.save", $props.content, "addon"))
            }, [..._cache[8] || (_cache[8] = [
              createElementVNode("span", { class: "fa fa-fw fa-save" }, null, -1),
              createTextVNode("\r\n              Save as Template\r\n            ", -1)
            ])]),
            _cache[10] || (_cache[10] = createTextVNode()),
            createElementVNode("button", {
              type: "button",
              class: "dropdown-item",
              onClick: $setup.remove
            }, [..._cache[9] || (_cache[9] = [
              createElementVNode("span", { class: "fa fa-fw fa-trash" }, null, -1),
              createTextVNode("\r\n              Delete\r\n            ", -1)
            ])])
          ])
        ])
      ])
    ])
  ], 8, _hoisted_1$5);
}
const AddonBox = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-23f8e976"], ["__file", "AddonBox.vue"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ColumnBox",
  props: {
    value: {},
    index: {},
    child: { type: Boolean, default: false }
  },
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const {
      addTextToClipboard,
      duplicateAddon,
      duplicateAny,
      emptyColumn,
      emptyRow,
      readClipboard,
      isAddon,
      isRow,
      isColumn
    } = usePageBuilderUtilities();
    const emit = __emit;
    const u2 = useUnicorn();
    const content = ref(props.value);
    const drag = ref(false);
    const widthMenuOpen = ref(false);
    content.value = defaultsDeep(content.value, emptyColumn());
    function edit() {
      u2.trigger("column:edit", content.value);
    }
    async function paste() {
      const text = await readClipboard();
      pasteData(text);
    }
    function closeWidthMenu() {
      widthMenuOpen.value = false;
    }
    async function pasteData(text) {
      try {
        const data2 = JSON.parse(text);
        if (!data2.id) {
          throw new Error("Invalid format");
        }
        if (isAddon(data2) || isRow(data2)) {
          duplicateThisAddon(data2, content.value.addons.length - 1);
          return;
        }
        if (isColumn(data2)) {
          let v = await swal({
            title: "You are pasting a column to another column...",
            text: "Please choose an action.",
            buttons: {
              add: {
                text: "Merge",
                value: "add",
                className: "btn-info"
              },
              replace: {
                text: "Replace",
                value: "replace",
                className: "btn-warning"
              },
              append: {
                text: "After",
                value: "append",
                className: "btn-dark"
              }
            }
          });
          switch (v) {
            case "replace":
              content.value.addons = [];
            case "add":
              data2.addons.forEach((addon) => {
                duplicateThisAddon(addon, addons2.value.length - 1);
              });
              break;
            case "append":
              duplicate(content.value);
          }
          return;
        }
      } catch (e) {
        console.error(e);
        simpleAlert("Invalid format.");
      }
    }
    function duplicate(data2) {
      emit("duplicate", data2);
    }
    function copy() {
      addTextToClipboard(content.value);
    }
    function toggleDisabled() {
      content.value.disabled = !content.value.disabled;
    }
    async function remove() {
      const v = await simpleConfirm("Are you sure you want to delete??");
      if (v) {
        emit("delete");
      }
      return v;
    }
    function duplicateThisAddon(item, i) {
      const newItem = duplicateAny(item, props.child);
      if (newItem) {
        addons2.value.splice(i + 1, 0, newItem);
      }
    }
    function addAddon() {
      u2.trigger("addon:add", content.value);
    }
    function addNewRow() {
      const row = emptyRow();
      row.type = "row";
      content.value.addons.push(row);
    }
    function deleteAddon(i) {
      addons2.value.splice(i, 1);
    }
    function widthRange() {
      return range(1, 13);
    }
    function getEmptyColumn() {
      return emptyColumn(props.child);
    }
    function openTemplates() {
      u2.trigger("tmpl.open", (item, type, i) => {
        pasteData(item.content);
      }, "column,addon", addons2.value.length);
    }
    const addons2 = computed(() => {
      return content.value.addons;
    });
    const options = computed(() => {
      return content.value.options;
    });
    const width = computed(() => {
      return values(options.value.width).join(" ");
    });
    watch(() => props.value, () => {
      content.value = props.value;
    }, { deep: true });
    const __returned__ = { props, addTextToClipboard, duplicateAddon, duplicateAny, emptyColumn, emptyRow, readClipboard, isAddon, isRow, isColumn, emit, u: u2, content, drag, widthMenuOpen, edit, paste, closeWidthMenu, pasteData, duplicate, copy, toggleDisabled, remove, duplicateThisAddon, addAddon, addNewRow, deleteAddon, widthRange, getEmptyColumn, openTemplates, addons: addons2, options, width, get VueDraggable() {
      return VueDraggable;
    }, AddonBox, RowBox };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$4 = ["disabled"];
const _hoisted_2$4 = { class: "card bg-light column__body" };
const _hoisted_3$4 = { class: "card-body p-2" };
const _hoisted_4$4 = { class: "column__title mb-2 d-flex align-items-center" };
const _hoisted_5$4 = { key: 0 };
const _hoisted_6$4 = { class: "column__actions ml-auto ms-auto text-nowrap" };
const _hoisted_7$4 = { class: "dropdown d-inline-block" };
const _hoisted_8$4 = { class: "form-group mb-3" };
const _hoisted_9$4 = ["for"];
const _hoisted_10$4 = ["id"];
const _hoisted_11$4 = ["value"];
const _hoisted_12$4 = { class: "form-group mb-3" };
const _hoisted_13$4 = ["for"];
const _hoisted_14$4 = ["id"];
const _hoisted_15$4 = ["value"];
const _hoisted_16$4 = { class: "form-group mb-3" };
const _hoisted_17$3 = ["for"];
const _hoisted_18$1 = ["id"];
const _hoisted_19$1 = ["value"];
const _hoisted_20$1 = { class: "d-inline-block dropdown" };
const _hoisted_21$1 = { class: "dropdown-menu dropdown-menu-end dropdown-menu-right" };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_tooltip = resolveDirective("tooltip");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["", $setup.width]),
    disabled: $setup.content.disabled ? true : null
  }, [
    createElementVNode("div", _hoisted_2$4, [
      createElementVNode("div", _hoisted_3$4, [
        createElementVNode("div", {
          class: normalizeClass(["column__top-bar d-flex mb-2", { "p-2": $props.child }])
        }, [
          createElementVNode("div", _hoisted_4$4, [
            _cache[20] || (_cache[20] = createElementVNode("div", { class: "column__move" }, [
              createElementVNode("div", {
                class: "badge bg-secondary column-move-handle me-2",
                style: { "cursor": "move" }
              }, [
                createElementVNode("span", { class: "fa fa-fw fa-arrows-alt" })
              ])
            ], -1)),
            _cache[21] || (_cache[21] = createTextVNode()),
            _cache[22] || (_cache[22] = createElementVNode("h6", { class: "m-0" }, "COL", -1)),
            _cache[23] || (_cache[23] = createTextVNode()),
            _ctx.$debug ? (openBlock(), createElementBlock("code", _hoisted_5$4, toDisplayString($setup.content.id), 1)) : createCommentVNode("", true)
          ]),
          _cache[56] || (_cache[56] = createTextVNode()),
          createElementVNode("div", _hoisted_6$4, [
            !$setup.content.disabled ? withDirectives((openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              class: "btn btn-sm px-2 py-0 btn-primary",
              title: "New Addon",
              onClick: _cache[0] || (_cache[0] = ($event) => $setup.addAddon())
            }, [..._cache[24] || (_cache[24] = [
              createElementVNode("span", { class: "fa fa-plus" }, null, -1)
            ])])), [
              [_directive_tooltip]
            ]) : createCommentVNode("", true),
            _cache[53] || (_cache[53] = createTextVNode()),
            !$setup.content.disabled ? withDirectives((openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: "btn btn-sm px-2 py-0 btn-outline-secondary",
              onClick: _cache[1] || (_cache[1] = ($event) => $setup.edit()),
              title: "Edit Column"
            }, [..._cache[25] || (_cache[25] = [
              createElementVNode("span", { class: "fa fa-edit" }, null, -1)
            ])])), [
              [_directive_tooltip]
            ]) : createCommentVNode("", true),
            _cache[54] || (_cache[54] = createTextVNode()),
            createElementVNode("div", _hoisted_7$4, [
              _cache[35] || (_cache[35] = createElementVNode("button", {
                type: "button",
                href: "#",
                class: "btn btn-sm px-2 py-0 btn-outline-secondary",
                "data-toggle": "dropdown",
                "data-bs-toggle": "dropdown"
              }, [
                createElementVNode("span", { class: "fa fa-arrows-alt-h" })
              ], -1)),
              _cache[36] || (_cache[36] = createTextVNode()),
              createElementVNode("div", {
                class: normalizeClass(["dropdown-menu dropdown-menu-right dropdown-menu-end px-3", $setup.widthMenuOpen])
              }, [
                createElementVNode("div", _hoisted_8$4, [
                  createElementVNode("label", {
                    for: `input-column-edit-width-desktop--${$setup.content.id}`,
                    class: "d-block"
                  }, "\r\n                    Desktop Width\r\n                  ", 8, _hoisted_9$4),
                  _cache[26] || (_cache[26] = createTextVNode()),
                  withDirectives(createElementVNode("select", {
                    id: `input-column-edit-width-desktop--${$setup.content.id}`,
                    onClick: _cache[2] || (_cache[2] = withModifiers(() => {
                    }, ["stop"])),
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.content.options.width.lg = $event),
                    class: "form-select custom-select"
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList($setup.widthRange(), (w) => {
                      return openBlock(), createElementBlock("option", {
                        value: "col-lg-" + w
                      }, "\r\n                      col-lg-" + toDisplayString(w), 9, _hoisted_11$4);
                    }), 256))
                  ], 8, _hoisted_10$4), [
                    [vModelSelect, $setup.content.options.width.lg]
                  ])
                ]),
                _cache[33] || (_cache[33] = createTextVNode()),
                createElementVNode("div", _hoisted_12$4, [
                  createElementVNode("label", {
                    for: `input-column-edit-width-tablet--${$setup.content.id}`,
                    class: "d-block"
                  }, "\r\n                    Tablet Width\r\n                  ", 8, _hoisted_13$4),
                  _cache[29] || (_cache[29] = createTextVNode()),
                  withDirectives(createElementVNode("select", {
                    id: `input-column-edit-width-tablet--${$setup.content.id}`,
                    onClick: _cache[4] || (_cache[4] = withModifiers(() => {
                    }, ["stop"])),
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.content.options.width.md = $event),
                    class: "form-select custom-select"
                  }, [
                    _cache[27] || (_cache[27] = createElementVNode("option", { value: "" }, "- None -", -1)),
                    _cache[28] || (_cache[28] = createTextVNode()),
                    (openBlock(true), createElementBlock(Fragment, null, renderList($setup.widthRange(), (w) => {
                      return openBlock(), createElementBlock("option", {
                        value: "col-md-" + w
                      }, "\r\n                      col-md-" + toDisplayString(w), 9, _hoisted_15$4);
                    }), 256))
                  ], 8, _hoisted_14$4), [
                    [vModelSelect, $setup.content.options.width.md]
                  ])
                ]),
                _cache[34] || (_cache[34] = createTextVNode()),
                createElementVNode("div", _hoisted_16$4, [
                  createElementVNode("label", {
                    for: `input-column-edit-width-mobile--${$setup.content.id}`,
                    class: "d-block"
                  }, "\r\n                    Mobile Width\r\n                  ", 8, _hoisted_17$3),
                  _cache[32] || (_cache[32] = createTextVNode()),
                  withDirectives(createElementVNode("select", {
                    id: `input-column-edit-width-mobile--${$setup.content.id}`,
                    onClick: _cache[6] || (_cache[6] = withModifiers(() => {
                    }, ["stop"])),
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.content.options.width.xs = $event),
                    class: "form-select custom-select"
                  }, [
                    _cache[30] || (_cache[30] = createElementVNode("option", { value: "" }, "- None -", -1)),
                    _cache[31] || (_cache[31] = createTextVNode()),
                    (openBlock(true), createElementBlock(Fragment, null, renderList($setup.widthRange(), (w) => {
                      return openBlock(), createElementBlock("option", {
                        value: "col-" + w
                      }, "\r\n                      col-" + toDisplayString(w), 9, _hoisted_19$1);
                    }), 256))
                  ], 8, _hoisted_18$1), [
                    [vModelSelect, $setup.content.options.width.xs]
                  ])
                ])
              ], 2)
            ]),
            _cache[55] || (_cache[55] = createTextVNode()),
            createElementVNode("div", _hoisted_20$1, [
              _cache[51] || (_cache[51] = createElementVNode("button", {
                type: "button",
                class: "btn btn-outline-secondary btn-sm px-2 py-0",
                "data-toggle": "dropdown",
                "data-bs-toggle": "dropdown"
              }, [
                createElementVNode("span", { class: "fa fa-cog" })
              ], -1)),
              _cache[52] || (_cache[52] = createTextVNode()),
              createElementVNode("div", _hoisted_21$1, [
                !$setup.content.disabled ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  type: "button",
                  class: "dropdown-item",
                  onClick: _cache[8] || (_cache[8] = ($event) => $setup.duplicate())
                }, [..._cache[37] || (_cache[37] = [
                  createElementVNode("span", { class: "fa fa-fw fa-clone" }, null, -1),
                  createTextVNode("\r\n                  Duplicate\r\n                ", -1)
                ])])) : createCommentVNode("", true),
                _cache[44] || (_cache[44] = createTextVNode()),
                !$setup.content.disabled ? (openBlock(), createElementBlock("button", {
                  key: 1,
                  type: "button",
                  class: "dropdown-item",
                  onClick: _cache[9] || (_cache[9] = ($event) => $setup.copy())
                }, [..._cache[38] || (_cache[38] = [
                  createElementVNode("span", { class: "fa fa-fw fa-copy" }, null, -1),
                  createTextVNode("\r\n                  Copy\r\n                ", -1)
                ])])) : createCommentVNode("", true),
                _cache[45] || (_cache[45] = createTextVNode()),
                !$setup.content.disabled ? (openBlock(), createElementBlock("button", {
                  key: 2,
                  type: "button",
                  class: "dropdown-item",
                  onClick: _cache[10] || (_cache[10] = ($event) => $setup.paste())
                }, [..._cache[39] || (_cache[39] = [
                  createElementVNode("span", { class: "fa fa-fw fa-paste" }, null, -1),
                  createTextVNode("\r\n                  Paste\r\n                ", -1)
                ])])) : createCommentVNode("", true),
                _cache[46] || (_cache[46] = createTextVNode()),
                createElementVNode("button", {
                  type: "button",
                  class: "dropdown-item",
                  onClick: _cache[11] || (_cache[11] = ($event) => $setup.toggleDisabled())
                }, [
                  createElementVNode("span", {
                    class: normalizeClass(["fa fa-fw", [$setup.content.disabled ? "fa-eye" : "fa-eye-slash"]])
                  }, null, 2),
                  createTextVNode(" " + toDisplayString($setup.content.disabled ? "Enabled" : "Disabled"), 1)
                ]),
                _cache[47] || (_cache[47] = createTextVNode()),
                !$setup.content.disabled && !$props.child ? (openBlock(), createElementBlock("button", {
                  key: 3,
                  type: "button",
                  class: "dropdown-item",
                  onClick: _cache[12] || (_cache[12] = ($event) => $setup.addNewRow())
                }, [..._cache[40] || (_cache[40] = [
                  createElementVNode("span", { class: "fa fa-fw fa-plus" }, null, -1),
                  createTextVNode("\r\n                  New Row\r\n                ", -1)
                ])])) : createCommentVNode("", true),
                _cache[48] || (_cache[48] = createTextVNode()),
                !$setup.content.disabled ? (openBlock(), createElementBlock("button", {
                  key: 4,
                  type: "button",
                  class: "dropdown-item",
                  onClick: $setup.openTemplates
                }, [..._cache[41] || (_cache[41] = [
                  createElementVNode("span", { class: "fa fa-fw fa-file-code" }, null, -1),
                  createTextVNode("\r\n                  Insert Template\r\n                ", -1)
                ])])) : createCommentVNode("", true),
                _cache[49] || (_cache[49] = createTextVNode()),
                createElementVNode("button", {
                  type: "button",
                  class: "dropdown-item",
                  onClick: _cache[13] || (_cache[13] = ($event) => _ctx.$trigger("tmpl.save", $setup.content, "column"))
                }, [..._cache[42] || (_cache[42] = [
                  createElementVNode("span", { class: "fa fa-fw fa-save" }, null, -1),
                  createTextVNode("\r\n                  Save as Template\r\n                ", -1)
                ])]),
                _cache[50] || (_cache[50] = createTextVNode()),
                createElementVNode("button", {
                  type: "button",
                  class: "dropdown-item",
                  onClick: _cache[14] || (_cache[14] = ($event) => $setup.remove())
                }, [..._cache[43] || (_cache[43] = [
                  createElementVNode("span", { class: "fa fa-fw fa-trash" }, null, -1),
                  createTextVNode("\r\n                  Delete\r\n                ", -1)
                ])])
              ])
            ])
          ])
        ], 2),
        _cache[59] || (_cache[59] = createTextVNode()),
        createVNode($setup["VueDraggable"], mergeProps({
          modelValue: $setup.content.addons,
          "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => $setup.content.addons = $event),
          onStart: _cache[17] || (_cache[17] = ($event) => $setup.drag = true),
          onEnd: _cache[18] || (_cache[18] = ($event) => $setup.drag = false),
          onAdd: _cache[19] || (_cache[19] = withModifiers(() => {
          }, ["stop"]))
        }, { handle: ".move-handle", group: "addon", animation: 300 }, {
          style: { "min-height": "50px" },
          class: "column__draggable",
          "item-key": "id"
        }), {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.content.addons, (addon, i) => {
              return openBlock(), createElementBlock("div", {
                key: addon.id,
                class: "column__addon mb-2",
                style: { "animation-duration": ".3s" }
              }, [
                addon.type !== "row" ? (openBlock(), createBlock($setup["AddonBox"], {
                  key: 0,
                  onDelete: ($event) => $setup.deleteAddon(i),
                  onDuplicate: ($event) => $setup.duplicateThisAddon(addon, i),
                  index: i,
                  content: addon,
                  column: $setup.content
                }, null, 8, ["onDelete", "onDuplicate", "index", "content", "column"])) : (openBlock(), createBlock($setup["RowBox"], {
                  key: 1,
                  index: i,
                  value: addon,
                  child: true,
                  onDuplicate: ($event) => $setup.duplicateThisAddon(addon, i),
                  "move-handle": "move-handle",
                  "comment-columns-change": "columnsChange(addon, $event)",
                  onDelete: ($event) => $setup.deleteAddon(i),
                  onAddNew: $setup.addNewRow
                }, null, 8, ["index", "value", "onDuplicate", "onDelete"]))
              ]);
            }), 128)),
            _cache[58] || (_cache[58] = createTextVNode()),
            $setup.addons.length === 0 ? (openBlock(), createElementBlock("a", {
              key: 0,
              class: "column__addon-placeholder text-center p-3 border text-secondary bg-white d-block",
              style: { "text-decoration": "none" },
              href: "#",
              onClick: _cache[15] || (_cache[15] = withModifiers(($event) => $setup.addAddon(), ["prevent"]))
            }, [..._cache[57] || (_cache[57] = [
              createElementVNode("span", { class: "fa fa-plus-circle fa-3x d-inline-block" }, null, -1)
            ])])) : createCommentVNode("", true)
          ]),
          _: 1
        }, 16, ["modelValue"])
      ])
    ])
  ], 10, _hoisted_1$4);
}
const ColumnBox = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__file", "ColumnBox.vue"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "RowBox",
  props: {
    value: {},
    child: { type: Boolean, default: false },
    moveHandle: { default: "move-handle" }
  },
  emits: ["delete", "duplicate", "columns-change", "add-new", "open-templates", "paste-page"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const {
      addTextToClipboard,
      duplicateAddon,
      duplicateAny,
      emptyColumn,
      emptyRow,
      readClipboard,
      isRow,
      isColumn,
      isAddon
    } = usePageBuilderUtilities();
    const props = __props;
    const emits = __emit;
    const u2 = useUnicorn();
    const content = ref(props.value);
    const drag = ref(false);
    content.value = defaultsDeep(content.value, emptyRow());
    function addNewColumn() {
      content.value.columns.push(emptyColumn(props.child));
    }
    function copy() {
      addTextToClipboard(content.value);
    }
    async function paste(append = false) {
      const text = await readClipboard();
      pasteData(text, append);
    }
    async function pasteData(text, append = false) {
      try {
        const data2 = JSON.parse(text);
        if (Array.isArray(data2)) {
          emits("paste-page", data2);
          return;
        }
        if (isAddon(data2)) {
          simpleAlert("Unable to paste addon here.");
          return;
        }
        if (isColumn(data2)) {
          duplicateColumn(data2, content.value.columns.length - 1);
          return;
        }
        if (isRow(data2)) {
          if (append) {
            duplicate(data2);
            return;
          }
          const v = await swal$1({
            title: "You are pasting a row to a another row.",
            text: "Please choose an action.",
            buttons: {
              add: {
                text: "Merge",
                value: "add",
                className: "btn-info"
              },
              replace: {
                text: "Replace",
                value: "replace",
                className: "btn-warning"
              },
              append: {
                text: "After",
                value: "append",
                className: "btn-dark"
              }
            }
          });
          switch (v) {
            case "replace":
              content.value.columns = [];
            case "add":
              data2.columns.forEach((column) => {
                duplicateColumn(column, data2.columns.length - 1);
              });
              break;
            case "append":
              duplicate(data2);
          }
          return;
        }
      } catch (e) {
        console.error(e);
        alert("Invalid format.");
      }
    }
    function duplicate(data2) {
      emits("duplicate", data2);
    }
    function duplicateColumn(column, i) {
      column = duplicateAny(column);
      content.value.columns.splice(i + 1, 0, column);
    }
    function handleDuplicateAddons(addons2) {
      return addons2.map((addon) => {
        const dup = duplicateAddon(addon, props.child);
        if (dup === null) {
          return null;
        }
        if (isAddon(dup)) {
          return dup;
        }
        dup.columns = dup.columns.map((column) => {
          column.id = "col-" + uid();
          column.addons = handleDuplicateAddons(column.addons);
          return column;
        });
        return addon;
      }).filter((addon) => addon !== null);
    }
    function edit() {
      u2.trigger("row:edit", content.value);
    }
    function toggleDisabled() {
      content.value.disabled = !content.value.disabled;
    }
    async function remove() {
      const v = await deleteConfirm("Are you sure you want to delete??");
      if (v) {
        emits("delete");
      }
      return v;
    }
    function getEmptyRow() {
      return emptyRow();
    }
    function deleteColumn(i) {
      columns.value.splice(i, 1);
    }
    function openTemplates() {
      u2.trigger("tmpl.open", (item, type, i) => {
        pasteData(item.content);
      }, "column,row", columns.value.length);
    }
    const columns = computed(() => {
      return content.value.columns;
    });
    const options = computed(() => {
      return content.value.options;
    });
    watch(() => columns, () => {
      emits("columns-change", { columns: columns.value });
    }, { deep: true });
    const __returned__ = { addTextToClipboard, duplicateAddon, duplicateAny, emptyColumn, emptyRow, readClipboard, isRow, isColumn, isAddon, props, emits, u: u2, content, drag, addNewColumn, copy, paste, pasteData, duplicate, duplicateColumn, handleDuplicateAddons, edit, toggleDisabled, remove, getEmptyRow, deleteColumn, openTemplates, columns, options, get VueDraggable() {
      return VueDraggable;
    }, ColumnBox };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$3 = ["disabled"];
const _hoisted_2$3 = { class: "page-row__title-bar d-flex mb-2" };
const _hoisted_3$3 = { class: "page-row__title d-flex" };
const _hoisted_4$3 = { class: "page-row__move-cursor" };
const _hoisted_5$3 = {
  class: "badge bg-secondary me-2",
  style: { "cursor": "move" }
};
const _hoisted_6$3 = ["is"];
const _hoisted_7$3 = {
  key: 0,
  class: "ms-3"
};
const _hoisted_8$3 = { class: "page-row__actions ml-auto ms-auto text-nowrap" };
const _hoisted_9$3 = { key: 0 };
const _hoisted_10$3 = { key: 0 };
const _hoisted_11$3 = { class: "dropdown d-inline-block" };
const _hoisted_12$3 = { class: "dropdown-menu dropdown-menu-right dropdown-menu-end" };
const _hoisted_13$3 = { class: "card" };
const _hoisted_14$3 = { class: "page-row__bottom-toolbar mt-3 text-center" };
const _hoisted_15$3 = { class: "page-builder__bottom-toolbar text-center" };
const _hoisted_16$3 = { class: "btn-group" };
const _hoisted_17$2 = { class: "dropdown-menu dropdown-menu-end dropdown-menu-right" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["bg-light p-2", { "rounded": $props.child }]),
    disabled: $setup.content.disabled ? true : null
  }, [
    createElementVNode("div", _hoisted_2$3, [
      createElementVNode("div", _hoisted_3$3, [
        createElementVNode("div", _hoisted_4$3, [
          createElementVNode("span", _hoisted_5$3, [
            createElementVNode("span", {
              class: normalizeClass(["fa fa-fw fa-arrows-alt-v", [$props.moveHandle]])
            }, null, 2)
          ])
        ]),
        _cache[13] || (_cache[13] = createTextVNode()),
        createElementVNode("div", {
          is: $props.child ? "strong" : "h5"
        }, toDisplayString($setup.options.label === "" ? "ROW" : $setup.options.label), 9, _hoisted_6$3),
        _cache[14] || (_cache[14] = createTextVNode()),
        _ctx.$debug ? (openBlock(), createElementBlock("small", _hoisted_7$3, toDisplayString($setup.content.id), 1)) : createCommentVNode("", true)
      ]),
      _cache[35] || (_cache[35] = createTextVNode()),
      createElementVNode("div", _hoisted_8$3, [
        !$setup.content.disabled ? (openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: "btn btn-sm btn-primary",
          onClick: _cache[0] || (_cache[0] = ($event) => $setup.addNewColumn())
        }, [
          _cache[15] || (_cache[15] = createElementVNode("span", { class: "fa fa-plus" }, null, -1)),
          _cache[16] || (_cache[16] = createTextVNode()),
          !$props.child ? (openBlock(), createElementBlock("span", _hoisted_9$3, "\r\n            New Column\r\n          ")) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        _cache[33] || (_cache[33] = createTextVNode()),
        !$setup.content.disabled ? (openBlock(), createElementBlock("button", {
          key: 1,
          type: "button",
          class: "btn btn-sm btn-outline-primary",
          onClick: $setup.edit
        }, [
          _cache[17] || (_cache[17] = createElementVNode("span", { class: "fa fa-edit" }, null, -1)),
          _cache[18] || (_cache[18] = createTextVNode()),
          !$props.child ? (openBlock(), createElementBlock("span", _hoisted_10$3, "\r\n            Edit\r\n          ")) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        _cache[34] || (_cache[34] = createTextVNode()),
        createElementVNode("div", _hoisted_11$3, [
          _cache[31] || (_cache[31] = createElementVNode("button", {
            href: "#",
            class: "btn btn-sm btn-outline-primary",
            "data-toggle": "dropdown",
            "data-bs-toggle": "dropdown"
          }, [
            createElementVNode("span", { class: "fa fa-cog" })
          ], -1)),
          _cache[32] || (_cache[32] = createTextVNode()),
          createElementVNode("div", _hoisted_12$3, [
            createElementVNode("a", {
              class: "dropdown-item",
              href: "#",
              onClick: _cache[1] || (_cache[1] = withModifiers(($event) => $setup.toggleDisabled(), ["prevent"]))
            }, [
              createElementVNode("span", {
                class: normalizeClass(["fa fa-fw", [$setup.content.disabled ? "fa-eye" : "fa-eye-slash"]])
              }, null, 2),
              createTextVNode(" " + toDisplayString($setup.content.disabled ? "Enabled" : "Disabled"), 1)
            ]),
            _cache[25] || (_cache[25] = createTextVNode()),
            !$setup.content.disabled ? (openBlock(), createElementBlock("a", {
              key: 0,
              class: "dropdown-item",
              href: "#",
              onClick: _cache[2] || (_cache[2] = withModifiers(($event) => $setup.duplicate(), ["prevent"]))
            }, [..._cache[19] || (_cache[19] = [
              createElementVNode("span", { class: "fa fa-fw fa-clone" }, null, -1),
              createTextVNode("\r\n                    Duplicate\r\n                ", -1)
            ])])) : createCommentVNode("", true),
            _cache[26] || (_cache[26] = createTextVNode()),
            !$setup.content.disabled ? (openBlock(), createElementBlock("a", {
              key: 1,
              class: "dropdown-item",
              href: "#",
              onClick: withModifiers($setup.copy, ["prevent"])
            }, [..._cache[20] || (_cache[20] = [
              createElementVNode("span", { class: "fa fa-fw fa-copy" }, null, -1),
              createTextVNode("\r\n                    Copy\r\n                ", -1)
            ])])) : createCommentVNode("", true),
            _cache[27] || (_cache[27] = createTextVNode()),
            !$setup.content.disabled ? (openBlock(), createElementBlock("a", {
              key: 2,
              class: "dropdown-item",
              href: "#",
              onClick: withModifiers($setup.paste, ["prevent"])
            }, [..._cache[21] || (_cache[21] = [
              createElementVNode("span", { class: "fa fa-fw fa-paste" }, null, -1),
              createTextVNode("\r\n                    Paste\r\n                ", -1)
            ])])) : createCommentVNode("", true),
            _cache[28] || (_cache[28] = createTextVNode()),
            !$setup.content.disabled ? (openBlock(), createElementBlock("a", {
              key: 3,
              class: "dropdown-item",
              href: "#",
              onClick: withModifiers($setup.openTemplates, ["prevent"])
            }, [..._cache[22] || (_cache[22] = [
              createElementVNode("span", { class: "fa fa-fw fa-file-code" }, null, -1),
              createTextVNode("\r\n                    Insert Template\r\n                ", -1)
            ])])) : createCommentVNode("", true),
            _cache[29] || (_cache[29] = createTextVNode()),
            createElementVNode("a", {
              class: "dropdown-item",
              href: "#",
              onClick: _cache[3] || (_cache[3] = withModifiers(($event) => _ctx.$trigger("tmpl.save", $setup.content, "row"), ["prevent"]))
            }, [..._cache[23] || (_cache[23] = [
              createElementVNode("span", { class: "fa fa-fw fa-save" }, null, -1),
              createTextVNode("\r\n                  Save as Template\r\n                ", -1)
            ])]),
            _cache[30] || (_cache[30] = createTextVNode()),
            createElementVNode("a", {
              class: "dropdown-item",
              href: "#",
              onClick: _cache[4] || (_cache[4] = withModifiers(($event) => $setup.remove(), ["prevent"]))
            }, [..._cache[24] || (_cache[24] = [
              createElementVNode("span", { class: "fa fa-fw fa-trash" }, null, -1),
              createTextVNode("\r\n                    Delete\r\n                ", -1)
            ])])
          ])
        ])
      ])
    ]),
    _cache[44] || (_cache[44] = createTextVNode()),
    createElementVNode("div", _hoisted_13$3, [
      createVNode($setup["VueDraggable"], mergeProps({
        class: ["card-body page-row__body row", [{ "p-2": $props.child }, `justify-content-${$setup.options.justify_content}`]],
        modelValue: $setup.content.columns,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.content.columns = $event),
        onStart: _cache[7] || (_cache[7] = ($event) => $setup.drag = true),
        onEnd: _cache[8] || (_cache[8] = ($event) => $setup.drag = false),
        onAdd: _cache[9] || (_cache[9] = withModifiers(() => {
        }, ["stop"]))
      }, { handle: ".column-move-handle", group: "column", animation: 300 }, {
        style: { "min-height": "50px" },
        "item-key": "id"
      }), {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList($setup.columns, (column, i) => {
            return openBlock(), createBlock($setup["ColumnBox"], {
              key: column.id,
              class: "page-row__column column mb-2",
              style: { "animation-duration": ".3s" },
              onDelete: ($event) => $setup.deleteColumn(i),
              onDuplicate: ($event) => $setup.duplicateColumn($event || column, i),
              index: i,
              value: column,
              child: $props.child
            }, null, 8, ["onDelete", "onDuplicate", "index", "value", "child"]);
          }), 128)),
          _cache[37] || (_cache[37] = createTextVNode()),
          $setup.columns.length === 0 ? (openBlock(), createElementBlock("a", {
            key: 0,
            class: "page-row__body-placeholder text-center p-4 border text-secondary col-12",
            "commented-v-if": "addons.length === 0 && !drag",
            href: "#",
            onClick: _cache[5] || (_cache[5] = withModifiers(($event) => $setup.addNewColumn(), ["prevent"]))
          }, [..._cache[36] || (_cache[36] = [
            createElementVNode("span", { class: "fa fa-plus-square fa-3x" }, null, -1)
          ])])) : createCommentVNode("", true)
        ]),
        _: 1
      }, 16, ["class", "modelValue"])
    ]),
    _cache[45] || (_cache[45] = createTextVNode()),
    createElementVNode("div", _hoisted_14$3, [
      createElementVNode("div", _hoisted_15$3, [
        createElementVNode("div", _hoisted_16$3, [
          createElementVNode("button", {
            type: "button",
            onClick: _cache[10] || (_cache[10] = ($event) => _ctx.$emit("add-new")),
            class: "btn btn-sm btn-outline-secondary"
          }, "\r\n            Add New Row\r\n          "),
          _cache[41] || (_cache[41] = createTextVNode()),
          _cache[42] || (_cache[42] = createElementVNode("button", {
            type: "button",
            class: "btn btn-outline-secondary btn-sm dropdown-toggle dropdown-toggle-split",
            "data-toggle": "dropdown",
            "data-bs-toggle": "dropdown"
          }, [
            createElementVNode("span", { class: "visually-hidden sr-only" }, "Toggle Dropdown")
          ], -1)),
          _cache[43] || (_cache[43] = createTextVNode()),
          createElementVNode("div", _hoisted_17$2, [
            createElementVNode("button", {
              type: "button",
              class: "dropdown-item",
              onClick: _cache[11] || (_cache[11] = ($event) => $setup.paste(true))
            }, [..._cache[38] || (_cache[38] = [
              createElementVNode("span", { class: "fa fa-fw fa-paste" }, null, -1),
              createTextVNode("\r\n              Paste\r\n            ", -1)
            ])]),
            _cache[40] || (_cache[40] = createTextVNode()),
            !$props.child ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              class: "dropdown-item",
              onClick: _cache[12] || (_cache[12] = ($event) => _ctx.$emit("open-templates"))
            }, [..._cache[39] || (_cache[39] = [
              createElementVNode("span", { class: "fa fa-fw fa-file-code" }, null, -1),
              createTextVNode("\r\n              Insert Template\r\n            ", -1)
            ])])) : createCommentVNode("", true)
          ])
        ])
      ])
    ])
  ], 10, _hoisted_1$3);
}
const RowBox = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "RowBox.vue"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "RowEdit",
  setup(__props, { expose: __expose }) {
    const { saving, savePage: doSavePage } = usePageBuilderUtilities();
    const u2 = useUnicorn();
    const content = ref();
    const sticky = ref(false);
    const modalShow = ref(false);
    const tab = ref();
    const currentTab = ref("general");
    const cssEditor = useTemplateRef("cssEditor");
    onMounted(() => {
    });
    function edit(data2) {
      content.value = JSON.parse(JSON.stringify(data2));
      modalShow.value = true;
      nextTick(() => {
        tab.value?.addEventListener("shown.bs.tab", () => {
          updateCurrentTab();
        });
        updateCurrentTab();
      });
    }
    __expose({
      edit
    });
    function updateCurrentTab() {
      if (!tab.value) {
        return;
      }
      const active = tab.value.querySelector("a.nav-link.active");
      if (active) {
        currentTab.value = active.getAttribute("href")?.replace("#row-edit-", "") || "general";
      }
    }
    useEventListener$1("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s" && modalShow.value) {
        e.preventDefault();
        savePage();
      }
    });
    function saveClose() {
      u2.trigger("row:save", JSON.parse(JSON.stringify(content.value)));
      close();
    }
    async function savePage() {
      u2.trigger("row:save", JSON.parse(JSON.stringify(content.value)));
      await nextTick();
      return await doSavePage();
    }
    async function close() {
      modalShow.value = false;
      sticky.value = false;
      await sleep(400);
      content.value = void 0;
    }
    const options = computed(() => content.value?.options);
    const __returned__ = { saving, doSavePage, u: u2, content, sticky, modalShow, tab, currentTab, cssEditor, edit, updateCurrentTab, saveClose, savePage, close, options, get BModal() {
      return _sfc_main$d;
    }, CssEditor, UnicornSwitcher, ColorInput, RwdGroup, Animations, BoxOffset, ButtonRadio, SingleImage, Gradient, SliderInput, RwdTitleOptions };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$2 = {
  ref: "tab",
  class: "nav nav-pills border-0"
};
const _hoisted_2$2 = { class: "ml-auto ms-auto" };
const _hoisted_3$2 = ["disabled"];
const _hoisted_4$2 = {
  key: 0,
  class: "tab-content",
  id: "row-edit-tab-content"
};
const _hoisted_5$2 = {
  class: "tab-pane fade show active",
  id: "row-edit-general",
  role: "tabpanel",
  "aria-labelledby": "row-edit-general-tab"
};
const _hoisted_6$2 = { class: "form-group mb-3" };
const _hoisted_7$2 = { class: "form-group mb-3" };
const _hoisted_8$2 = { class: "form-group mb-3" };
const _hoisted_9$2 = { key: 1 };
const _hoisted_10$2 = { class: "form-group mb-3" };
const _hoisted_11$2 = { class: "form-group mb-3" };
const _hoisted_12$2 = { class: "form-group mb-3" };
const _hoisted_13$2 = { class: "form-group mb-3" };
const _hoisted_14$2 = {
  class: "tab-pane fade",
  id: "row-edit-layout",
  role: "tabpanel",
  "aria-labelledby": "row-edit-layout-tab"
};
const _hoisted_15$2 = { class: "form-group mb-3" };
const _hoisted_16$2 = {
  key: 0,
  class: "form-group mb-3"
};
const _hoisted_17$1 = { key: 0 };
const _hoisted_18 = { class: "form-group mb-3" };
const _hoisted_19 = { class: "form-row row" };
const _hoisted_20 = { class: "form-group mb-3 col-md-6" };
const _hoisted_21 = { class: "form-group mb-3 col-md-6" };
const _hoisted_22 = { class: "form-row row" };
const _hoisted_23 = { class: "form-group mb-3 col-md-6" };
const _hoisted_24 = { class: "form-group mb-3 col-md-6" };
const _hoisted_25 = { key: 0 };
const _hoisted_26 = { class: "form-group mb-3" };
const _hoisted_27 = { key: 0 };
const _hoisted_28 = { class: "form-group mb-3" };
const _hoisted_29 = { class: "form-group mb-3" };
const _hoisted_30 = { class: "form-group mb-3" };
const _hoisted_31 = { class: "form-group mb-3" };
const _hoisted_32 = { class: "form-group mb-3" };
const _hoisted_33 = { class: "form-group mb-3" };
const _hoisted_34 = { class: "form-group mb-3" };
const _hoisted_35 = { class: "form-group mb-3" };
const _hoisted_36 = { class: "form-group mb-3" };
const _hoisted_37 = { class: "form-group mb-3" };
const _hoisted_38 = { class: "text-muted small mb-3" };
const _hoisted_39 = { key: 0 };
const _hoisted_40 = {
  class: "tab-pane fade",
  id: "row-edit-animation",
  role: "tabpanel",
  "aria-labelledby": "row-edit-animation-tab"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createVNode($setup["BModal"], {
      "model-value": $setup.modalShow,
      size: "lg",
      onHidden: _cache[34] || (_cache[34] = ($event) => $setup.modalShow = false),
      backdrop: "static",
      class: "c-modal-row-edit",
      lazy: "",
      "unmount-lazy": "",
      "no-trap": "",
      "header-class": "bg-white sticky-top"
    }, {
      header: withCtx(() => [
        createElementVNode("ul", _hoisted_1$2, [..._cache[35] || (_cache[35] = [
          createElementVNode("li", { class: "nav-item" }, [
            createElementVNode("a", {
              class: "nav-link active",
              "data-toggle": "tab",
              "data-bs-toggle": "tab",
              href: "#row-edit-general"
            }, "\r\n              General\r\n            ")
          ], -1),
          createTextVNode(),
          createElementVNode("li", { class: "nav-item" }, [
            createElementVNode("a", {
              class: "nav-link",
              "data-toggle": "tab",
              "data-bs-toggle": "tab",
              href: "#row-edit-layout"
            }, "\r\n              Layout\r\n            ")
          ], -1),
          createTextVNode(),
          createElementVNode("li", { class: "nav-item" }, [
            createElementVNode("a", {
              class: "nav-link",
              "data-toggle": "tab",
              "data-bs-toggle": "tab",
              href: "#row-edit-animation"
            }, "\r\n              Animation\r\n            ")
          ], -1)
        ])], 512),
        _cache[41] || (_cache[41] = createTextVNode()),
        createElementVNode("div", _hoisted_2$2, [
          createElementVNode("button", {
            type: "button",
            class: "btn btn-primary btn--save",
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.saveClose())
          }, [..._cache[36] || (_cache[36] = [
            createElementVNode("span", { class: "fa fa-check" }, null, -1),
            createTextVNode("\r\n            Done\r\n          ", -1)
          ])]),
          _cache[39] || (_cache[39] = createTextVNode()),
          createElementVNode("button", {
            type: "button",
            class: "btn btn-success btn--save-page",
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.savePage()),
            disabled: $setup.saving
          }, [
            createElementVNode("span", {
              class: normalizeClass($setup.saving ? "spinner-border spinner-border-sm" : "fa fa-save")
            }, null, 2),
            _cache[37] || (_cache[37] = createTextVNode("\r\n            Save Page\r\n          ", -1))
          ], 8, _hoisted_3$2),
          _cache[40] || (_cache[40] = createTextVNode()),
          createElementVNode("button", {
            type: "button",
            class: "btn btn-secondary btn--close",
            onClick: $setup.close
          }, [..._cache[38] || (_cache[38] = [
            createElementVNode("span", { class: "fa fa-times" }, null, -1)
          ])])
        ])
      ]),
      footer: withCtx(() => [
        createElementVNode("button", {
          type: "button",
          class: "btn btn-success",
          onClick: _cache[32] || (_cache[32] = ($event) => $setup.saveClose())
        }, [..._cache[151] || (_cache[151] = [
          createElementVNode("span", { class: "fa fa-save" }, null, -1),
          createTextVNode("\r\n          Save\r\n        ", -1)
        ])]),
        _cache[153] || (_cache[153] = createTextVNode()),
        createElementVNode("button", {
          type: "button",
          class: "btn btn-secondary",
          onClick: _cache[33] || (_cache[33] = ($event) => $setup.close())
        }, [..._cache[152] || (_cache[152] = [
          createElementVNode("span", { class: "fa fa-times" }, null, -1),
          createTextVNode("\r\n          Cancel\r\n        ", -1)
        ])])
      ]),
      default: withCtx(() => [
        _cache[154] || (_cache[154] = createTextVNode()),
        $setup.content && $setup.options ? (openBlock(), createElementBlock("div", _hoisted_4$2, [
          createElementVNode("div", _hoisted_5$2, [
            createElementVNode("div", _hoisted_6$2, [
              _cache[42] || (_cache[42] = createElementVNode("label", { for: "input-row-edit-label" }, "Label", -1)),
              _cache[43] || (_cache[43] = createTextVNode()),
              withDirectives(createElementVNode("input", {
                id: "input-row-edit-label",
                type: "text",
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.options.label = $event),
                class: "form-control"
              }, null, 512), [
                [vModelText, $setup.options.label]
              ]),
              _cache[44] || (_cache[44] = createTextVNode()),
              _cache[45] || (_cache[45] = createElementVNode("small", { class: "form-text text-muted" }, "This label only show in edit page.", -1))
            ]),
            _cache[64] || (_cache[64] = createTextVNode()),
            _cache[65] || (_cache[65] = createElementVNode("hr", null, null, -1)),
            _cache[66] || (_cache[66] = createTextVNode()),
            createElementVNode("div", _hoisted_7$2, [
              _cache[46] || (_cache[46] = createElementVNode("label", { for: "input-row-edit-title-text" }, "Main Title", -1)),
              _cache[47] || (_cache[47] = createTextVNode()),
              withDirectives(createElementVNode("textarea", {
                id: "input-row-edit-title-text",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.options.title.text = $event),
                class: "form-control"
              }, null, 512), [
                [vModelText, $setup.options.title.text]
              ]),
              _cache[48] || (_cache[48] = createTextVNode()),
              _cache[49] || (_cache[49] = createElementVNode("small", { class: "form-text text-muted" }, "Title of this section, keep empty to hide it.", -1))
            ]),
            _cache[67] || (_cache[67] = createTextVNode()),
            $setup.options.title.text !== "" ? (openBlock(), createBlock($setup["RwdTitleOptions"], {
              key: 0,
              id: "input-row-edit",
              modelValue: $setup.content.options.title,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.content.options.title = $event)
            }, null, 8, ["modelValue"])) : createCommentVNode("", true),
            _cache[68] || (_cache[68] = createTextVNode()),
            _cache[69] || (_cache[69] = createElementVNode("hr", null, null, -1)),
            _cache[70] || (_cache[70] = createTextVNode()),
            createElementVNode("div", _hoisted_8$2, [
              _cache[50] || (_cache[50] = createElementVNode("label", { for: "input-row-edit-subtitle-text" }, "Subtitle", -1)),
              _cache[51] || (_cache[51] = createTextVNode()),
              withDirectives(createElementVNode("textarea", {
                id: "input-row-edit-subtitle-text",
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.options.subtitle.text = $event),
                class: "form-control"
              }, null, 512), [
                [vModelText, $setup.options.subtitle.text]
              ]),
              _cache[52] || (_cache[52] = createTextVNode()),
              _cache[53] || (_cache[53] = createElementVNode("small", { class: "form-text text-muted" }, "Subtitle of this section, keep empty to hide it.", -1))
            ]),
            _cache[71] || (_cache[71] = createTextVNode()),
            $setup.options.subtitle.text !== "" ? (openBlock(), createElementBlock("div", _hoisted_9$2, [
              createVNode($setup["RwdGroup"], { "class-name": "c-title-font-size" }, createSlots({
                label: withCtx(() => [
                  _cache[54] || (_cache[54] = createElementVNode("label", null, "\r\n                  Subtitle Font Size\r\n                ", -1))
                ]),
                _: 2
              }, [
                renderList(["lg", "md", "xs"], (size) => {
                  return {
                    name: size,
                    fn: withCtx(() => [
                      createVNode($setup["SliderInput"], {
                        modelValue: $setup.options.subtitle.font_size[size],
                        "onUpdate:modelValue": ($event) => $setup.options.subtitle.font_size[size] = $event,
                        max: 500
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  };
                })
              ]), 1024)
            ])) : createCommentVNode("", true),
            _cache[72] || (_cache[72] = createTextVNode()),
            createElementVNode("div", _hoisted_10$2, [
              _cache[56] || (_cache[56] = createElementVNode("label", { for: "input-row-edit-title-align" }, "Title/Subtitle Text Alignment", -1)),
              _cache[57] || (_cache[57] = createTextVNode()),
              createElementVNode("div", null, [
                createVNode($setup["ButtonRadio"], {
                  color: "primary",
                  variant: "outline",
                  class: "w-100",
                  modelValue: $setup.options.title_align,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.options.title_align = $event),
                  options: [
                    { text: "Left", value: "left" },
                    { text: "Center", value: "center" },
                    { text: "Right", value: "right" }
                  ]
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[73] || (_cache[73] = createTextVNode()),
            createElementVNode("div", _hoisted_11$2, [
              _cache[58] || (_cache[58] = createElementVNode("label", { for: "input-row-edit-text-color" }, "Text Color", -1)),
              _cache[59] || (_cache[59] = createTextVNode()),
              createVNode($setup["ColorInput"], {
                id: "input-row-edit-text-color",
                modelValue: $setup.options.text_color,
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.options.text_color = $event),
                modelModifiers: { lazy: true }
              }, null, 8, ["modelValue"])
            ]),
            _cache[74] || (_cache[74] = createTextVNode()),
            createElementVNode("div", _hoisted_12$2, [
              _cache[60] || (_cache[60] = createElementVNode("label", { for: "input-row-edit-html-id" }, "CSS ID", -1)),
              _cache[61] || (_cache[61] = createTextVNode()),
              withDirectives(createElementVNode("input", {
                id: "input-row-edit-html-id",
                type: "text",
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.options.html_id = $event),
                class: "form-control"
              }, null, 512), [
                [vModelText, $setup.options.html_id]
              ])
            ]),
            _cache[75] || (_cache[75] = createTextVNode()),
            createElementVNode("div", _hoisted_13$2, [
              _cache[62] || (_cache[62] = createElementVNode("label", { for: "input-row-edit-html-class" }, "CSS Class", -1)),
              _cache[63] || (_cache[63] = createTextVNode()),
              withDirectives(createElementVNode("input", {
                id: "input-row-edit-html-class",
                type: "text",
                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.options.html_class = $event),
                class: "form-control"
              }, null, 512), [
                [vModelText, $setup.options.html_class]
              ])
            ])
          ]),
          _cache[149] || (_cache[149] = createTextVNode()),
          createElementVNode("div", _hoisted_14$2, [
            createVNode($setup["BoxOffset"], {
              modelValue: $setup.options.padding,
              "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.options.padding = $event)
            }, {
              label: withCtx(() => [..._cache[76] || (_cache[76] = [
                createTextVNode("Padding", -1)
              ])]),
              _: 1
            }, 8, ["modelValue"]),
            _cache[128] || (_cache[128] = createTextVNode()),
            createVNode($setup["BoxOffset"], {
              modelValue: $setup.options.margin,
              "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.options.margin = $event)
            }, {
              label: withCtx(() => [..._cache[77] || (_cache[77] = [
                createTextVNode("Margin", -1)
              ])]),
              _: 1
            }, 8, ["modelValue"]),
            _cache[129] || (_cache[129] = createTextVNode()),
            createElementVNode("div", _hoisted_15$2, [
              _cache[78] || (_cache[78] = createElementVNode("label", { for: "input-row-edit-background" }, "Background Type", -1)),
              _cache[79] || (_cache[79] = createTextVNode()),
              createElementVNode("div", null, [
                createVNode($setup["ButtonRadio"], {
                  color: "primary",
                  variant: "outline",
                  class: "w-100",
                  modelValue: $setup.options.background.type,
                  "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $setup.options.background.type = $event),
                  options: [
                    { value: "none", text: "None" },
                    { value: "color", text: "Color" },
                    { value: "image", text: "Image" },
                    { value: "gradient", text: "Gradient" },
                    { value: "video", text: "Video" }
                  ]
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[130] || (_cache[130] = createTextVNode()),
            createVNode(Transition, { name: "fade" }, {
              default: withCtx(() => [
                ["color", "image"].indexOf($setup.options.background.type) !== -1 ? (openBlock(), createElementBlock("div", _hoisted_16$2, [
                  _cache[80] || (_cache[80] = createElementVNode("label", { for: "input-row-edit-bg-color" }, "Background Color", -1)),
                  _cache[81] || (_cache[81] = createTextVNode()),
                  createVNode($setup["ColorInput"], {
                    id: "input-row-edit-bg-color",
                    modelValue: $setup.options.background.color,
                    "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $setup.options.background.color = $event),
                    modelModifiers: { lazy: true }
                  }, null, 8, ["modelValue"])
                ])) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            _cache[131] || (_cache[131] = createTextVNode()),
            createVNode(Transition, { name: "fade" }, {
              default: withCtx(() => [
                ["image"].indexOf($setup.options.background.type) !== -1 ? (openBlock(), createElementBlock("div", _hoisted_17$1, [
                  createElementVNode("div", _hoisted_18, [
                    _cache[82] || (_cache[82] = createElementVNode("label", { for: "input-row-edit-bg-image" }, "Background Image", -1)),
                    _cache[83] || (_cache[83] = createTextVNode()),
                    createVNode($setup["SingleImage"], {
                      modelValue: $setup.options.background.image.url,
                      "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $setup.options.background.image.url = $event),
                      id: "input-row-edit-bg-image"
                    }, null, 8, ["modelValue"])
                  ]),
                  _cache[98] || (_cache[98] = createTextVNode()),
                  createElementVNode("div", _hoisted_19, [
                    createElementVNode("div", _hoisted_20, [
                      _cache[85] || (_cache[85] = createElementVNode("label", { for: "input-row-edit-bg-size" }, "Background Size", -1)),
                      _cache[86] || (_cache[86] = createTextVNode()),
                      withDirectives(createElementVNode("select", {
                        id: "input-row-edit-bg-size",
                        "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => $setup.options.background.image.size = $event),
                        class: "form-select custom-select"
                      }, [..._cache[84] || (_cache[84] = [
                        createElementVNode("option", { value: "" }, "Default", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "cover" }, "Cover", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "contain" }, "Contain", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "auto" }, "Auto", -1)
                      ])], 512), [
                        [
                          vModelSelect,
                          $setup.options.background.image.size,
                          void 0,
                          { lazy: true }
                        ]
                      ])
                    ]),
                    _cache[90] || (_cache[90] = createTextVNode()),
                    createElementVNode("div", _hoisted_21, [
                      _cache[88] || (_cache[88] = createElementVNode("label", { for: "input-row-edit-bg-repeat" }, "Background Repeat", -1)),
                      _cache[89] || (_cache[89] = createTextVNode()),
                      withDirectives(createElementVNode("select", {
                        id: "input-row-edit-bg-repeat",
                        "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => $setup.options.background.image.repeat = $event),
                        class: "form-select custom-select"
                      }, [..._cache[87] || (_cache[87] = [
                        createElementVNode("option", { value: "no-repeat" }, "No Repeat", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "" }, "Repeat All", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "repeat-x" }, "Repeat X", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "repeat-y" }, "Repeat Y", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "inherit" }, "Inherit", -1)
                      ])], 512), [
                        [
                          vModelSelect,
                          $setup.options.background.image.repeat,
                          void 0,
                          { lazy: true }
                        ]
                      ])
                    ])
                  ]),
                  _cache[99] || (_cache[99] = createTextVNode()),
                  createElementVNode("div", _hoisted_22, [
                    createElementVNode("div", _hoisted_23, [
                      _cache[92] || (_cache[92] = createElementVNode("label", { for: "input-row-edit-bg-attachment" }, "Background Attachment", -1)),
                      _cache[93] || (_cache[93] = createTextVNode()),
                      withDirectives(createElementVNode("select", {
                        id: "input-row-edit-bg-attachment",
                        "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => $setup.options.background.image.attachment = $event),
                        class: "form-select custom-select"
                      }, [..._cache[91] || (_cache[91] = [
                        createElementVNode("option", { value: "fixed" }, "Fixed", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "scroll" }, "Scroll", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "inherit" }, "Inherit", -1)
                      ])], 512), [
                        [
                          vModelSelect,
                          $setup.options.background.image.attachment,
                          void 0,
                          { lazy: true }
                        ]
                      ])
                    ]),
                    _cache[97] || (_cache[97] = createTextVNode()),
                    createElementVNode("div", _hoisted_24, [
                      _cache[95] || (_cache[95] = createElementVNode("label", { for: "input-row-edit-bg-position" }, "Background Position", -1)),
                      _cache[96] || (_cache[96] = createTextVNode()),
                      withDirectives(createElementVNode("select", {
                        id: "input-row-edit-bg-position",
                        "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => $setup.options.background.image.position = $event),
                        class: "form-select custom-select"
                      }, [..._cache[94] || (_cache[94] = [
                        createElementVNode("option", { value: "left top" }, "Left Top", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "left center" }, "Left Center", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "left bottom" }, "Left Bottom", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "center top" }, "Center Top", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "center center" }, "Center Center", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "center bottom" }, "Center Bottom", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "right top" }, "Right Top", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "right center" }, "Right Center", -1),
                        createTextVNode(),
                        createElementVNode("option", { value: "right bottom" }, "Right Bottom", -1)
                      ])], 512), [
                        [
                          vModelSelect,
                          $setup.options.background.image.position,
                          void 0,
                          { lazy: true }
                        ]
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            _cache[132] || (_cache[132] = createTextVNode()),
            createVNode(Transition, { name: "fade" }, {
              default: withCtx(() => [
                $setup.options.background.type === "gradient" ? (openBlock(), createBlock($setup["Gradient"], {
                  key: 0,
                  modelValue: $setup.options.background.gradient,
                  "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => $setup.options.background.gradient = $event)
                }, null, 8, ["modelValue"])) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            _cache[133] || (_cache[133] = createTextVNode()),
            createVNode(Transition, { name: "fade" }, {
              default: withCtx(() => [
                ["video"].indexOf($setup.options.background.type) !== -1 ? (openBlock(), createElementBlock("div", _hoisted_25, [
                  createElementVNode("div", _hoisted_26, [
                    _cache[100] || (_cache[100] = createElementVNode("label", { for: "input-row-edit-bg-video-url" }, "Video URL", -1)),
                    _cache[101] || (_cache[101] = createTextVNode()),
                    withDirectives(createElementVNode("input", {
                      id: "input-row-edit-bg-video-url",
                      type: "text",
                      "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => $setup.options.background.video.url = $event),
                      class: "form-control"
                    }, null, 512), [
                      [vModelText, $setup.options.background.video.url]
                    ]),
                    _cache[102] || (_cache[102] = createTextVNode()),
                    _cache[103] || (_cache[103] = createElementVNode("small", { class: "form-text text-muted" }, "\r\n                  Paste mp4 video URL, or Youtube / Vimeo URL.\r\n                ", -1))
                  ])
                ])) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            _cache[134] || (_cache[134] = createTextVNode()),
            createVNode(Transition, { name: "fade" }, {
              default: withCtx(() => [
                ["video", "image"].indexOf($setup.options.background.type) !== -1 ? (openBlock(), createElementBlock("div", _hoisted_27, [
                  createElementVNode("div", _hoisted_28, [
                    _cache[104] || (_cache[104] = createElementVNode("label", { for: "input-row-edit-bg-overlay" }, "Color Overlay", -1)),
                    _cache[105] || (_cache[105] = createTextVNode()),
                    createVNode($setup["ColorInput"], {
                      id: "input-row-edit-bg-overlay",
                      modelValue: $setup.options.background.overlay,
                      "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => $setup.options.background.overlay = $event),
                      modelModifiers: { lazy: true }
                    }, null, 8, ["modelValue"])
                  ]),
                  _cache[108] || (_cache[108] = createTextVNode()),
                  createElementVNode("div", _hoisted_29, [
                    _cache[106] || (_cache[106] = createElementVNode("label", { for: "input-row-edit-hidden-mobile" }, "Parallax Background", -1)),
                    _cache[107] || (_cache[107] = createTextVNode()),
                    createElementVNode("div", null, [
                      createVNode($setup["UnicornSwitcher"], {
                        name: "row-edit-bg-parallax",
                        modelValue: $setup.options.background.parallax,
                        "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => $setup.options.background.parallax = $event),
                        id: "input-row-edit-bg-parallax",
                        shape: "circle",
                        color: "success",
                        "true-value": true,
                        "false-value": false
                      }, null, 8, ["modelValue"])
                    ])
                  ])
                ])) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            _cache[135] || (_cache[135] = createTextVNode()),
            _cache[136] || (_cache[136] = createElementVNode("hr", null, null, -1)),
            _cache[137] || (_cache[137] = createTextVNode()),
            createElementVNode("div", _hoisted_30, [
              _cache[109] || (_cache[109] = createElementVNode("label", { for: "input-row-edit-justify-content" }, "Content Justify", -1)),
              _cache[110] || (_cache[110] = createTextVNode()),
              createElementVNode("div", null, [
                createVNode($setup["ButtonRadio"], {
                  color: "primary",
                  variant: "outline",
                  class: "w-100",
                  modelValue: $setup.options.justify_content,
                  "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => $setup.options.justify_content = $event),
                  options: [
                    { value: "start", text: "Start" },
                    { value: "center", text: "Center" },
                    { value: "end", text: "End" },
                    { value: "around", text: "Space Around" },
                    { value: "between", text: "Space Between" }
                  ]
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[138] || (_cache[138] = createTextVNode()),
            createElementVNode("div", _hoisted_31, [
              _cache[111] || (_cache[111] = createElementVNode("label", { for: "input-row-edit-valign" }, "Vertical Align Middle", -1)),
              _cache[112] || (_cache[112] = createTextVNode()),
              createElementVNode("div", null, [
                createVNode($setup["UnicornSwitcher"], {
                  name: "row-edit-valign",
                  modelValue: $setup.options.valign,
                  "onUpdate:modelValue": _cache[24] || (_cache[24] = ($event) => $setup.options.valign = $event),
                  id: "input-row-edit-valign",
                  shape: "circle",
                  color: "success",
                  "true-value": "middle",
                  "false-value": "top"
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[139] || (_cache[139] = createTextVNode()),
            createElementVNode("div", _hoisted_32, [
              _cache[113] || (_cache[113] = createElementVNode("label", { for: "input-row-edit-fluid_row" }, "Fluid Row", -1)),
              _cache[114] || (_cache[114] = createTextVNode()),
              createElementVNode("div", null, [
                createVNode($setup["UnicornSwitcher"], {
                  name: "row-edit-fluid_row",
                  modelValue: $setup.options.fluid_row,
                  "onUpdate:modelValue": _cache[25] || (_cache[25] = ($event) => $setup.options.fluid_row = $event),
                  id: "input-row-edit-fluid_row",
                  shape: "circle",
                  color: "success",
                  "true-value": true,
                  "false-value": false
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[140] || (_cache[140] = createTextVNode()),
            createElementVNode("div", _hoisted_33, [
              _cache[115] || (_cache[115] = createElementVNode("label", { for: "input-row-edit-no_gutter" }, "No Gutters", -1)),
              _cache[116] || (_cache[116] = createTextVNode()),
              createElementVNode("div", null, [
                createVNode($setup["UnicornSwitcher"], {
                  name: "row-edit-no_gutter",
                  modelValue: $setup.options.no_gutter,
                  "onUpdate:modelValue": _cache[26] || (_cache[26] = ($event) => $setup.options.no_gutter = $event),
                  id: "input-row-edit-no_gutter",
                  shape: "circle",
                  color: "success",
                  "true-value": true,
                  "false-value": false
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[141] || (_cache[141] = createTextVNode()),
            _cache[142] || (_cache[142] = createElementVNode("hr", null, null, -1)),
            _cache[143] || (_cache[143] = createTextVNode()),
            createElementVNode("div", _hoisted_34, [
              _cache[117] || (_cache[117] = createElementVNode("label", { for: "input-row-edit-hidden-mobile" }, "Hide in Mobile", -1)),
              _cache[118] || (_cache[118] = createTextVNode()),
              createElementVNode("div", null, [
                createVNode($setup["UnicornSwitcher"], {
                  name: "row-edit-hidden-mobile",
                  modelValue: $setup.options.display.xs,
                  "onUpdate:modelValue": _cache[27] || (_cache[27] = ($event) => $setup.options.display.xs = $event),
                  id: "input-row-edit-hidden-mobile",
                  shape: "circle",
                  color: "success",
                  "true-value": "d-none",
                  "false-value": "d-block"
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[144] || (_cache[144] = createTextVNode()),
            createElementVNode("div", _hoisted_35, [
              _cache[119] || (_cache[119] = createElementVNode("label", { for: "input-row-edit-hidden-tablet" }, "Hide in Tablet", -1)),
              _cache[120] || (_cache[120] = createTextVNode()),
              createElementVNode("div", null, [
                createVNode($setup["UnicornSwitcher"], {
                  name: "row-edit-hidden-tablet",
                  modelValue: $setup.options.display.md,
                  "onUpdate:modelValue": _cache[28] || (_cache[28] = ($event) => $setup.options.display.md = $event),
                  id: "input-row-edit-hidden-tablet",
                  shape: "circle",
                  color: "success",
                  "true-value": "d-md-none",
                  "false-value": "d-md-block"
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[145] || (_cache[145] = createTextVNode()),
            createElementVNode("div", _hoisted_36, [
              _cache[121] || (_cache[121] = createElementVNode("label", { for: "input-row-edit-hidden-desktop" }, "Hide in Desktop", -1)),
              _cache[122] || (_cache[122] = createTextVNode()),
              createElementVNode("div", null, [
                createVNode($setup["UnicornSwitcher"], {
                  name: "row-edit-hidden-desktop",
                  modelValue: $setup.options.display.lg,
                  "onUpdate:modelValue": _cache[29] || (_cache[29] = ($event) => $setup.options.display.lg = $event),
                  id: "input-row-edit-hidden-desktop",
                  shape: "circle",
                  color: "success",
                  "true-value": "d-lg-none",
                  "false-value": "d-lg-block"
                }, null, 8, ["modelValue"])
              ])
            ]),
            _cache[146] || (_cache[146] = createTextVNode()),
            _cache[147] || (_cache[147] = createElementVNode("hr", null, null, -1)),
            _cache[148] || (_cache[148] = createTextVNode()),
            createElementVNode("div", _hoisted_37, [
              _cache[125] || (_cache[125] = createElementVNode("label", { for: "input-row-edit-css" }, "Custom CSS (SCSS)", -1)),
              _cache[126] || (_cache[126] = createTextVNode()),
              createElementVNode("div", _hoisted_38, [
                _cache[123] || (_cache[123] = createTextVNode("\r\n              Will auto prefix by ", -1)),
                createElementVNode("code", null, toDisplayString(`#luna-${$setup.content.id}`), 1),
                _cache[124] || (_cache[124] = createTextVNode(", only works for this scope.\r\n            ", -1))
              ]),
              _cache[127] || (_cache[127] = createTextVNode()),
              $setup.currentTab === "layout" ? (openBlock(), createElementBlock("div", _hoisted_39, [
                createVNode($setup["CssEditor"], {
                  ref: "cssEditor",
                  modelValue: $setup.options.html_css,
                  "onUpdate:modelValue": _cache[30] || (_cache[30] = ($event) => $setup.options.html_css = $event),
                  height: 350
                }, null, 8, ["modelValue"])
              ])) : createCommentVNode("", true)
            ])
          ]),
          _cache[150] || (_cache[150] = createTextVNode()),
          createElementVNode("div", _hoisted_40, [
            createVNode($setup["Animations"], {
              id: "row-edit-anim",
              modelValue: $setup.options.animation,
              "onUpdate:modelValue": _cache[31] || (_cache[31] = ($event) => $setup.options.animation = $event)
            }, null, 8, ["modelValue"])
          ])
        ])) : createCommentVNode("", true),
        _cache[155] || (_cache[155] = createTextVNode())
      ]),
      _: 1
    }, 8, ["model-value"])
  ]);
}
const RowEdit = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "RowEdit.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TemplateManager",
  emits: ["selected"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const { toFormData } = usePageBuilderUtilities();
    const emits = __emit;
    const q = ref("");
    const filterType = ref("");
    const items = ref([]);
    const callback = ref();
    const type = ref("");
    const i = ref(0);
    const saveData = ref({
      id: null,
      type: null,
      title: "",
      description: "",
      image: "",
      content: null
    });
    const { loading, wrap } = useLoading();
    const { loading: saving, wrap: wrapSave } = useLoading();
    const tmplModalShow = ref(false);
    const saveModalShow = ref(false);
    function open(cb, t, idx) {
      callback.value = cb;
      type.value = t;
      i.value = idx;
      filterType.value = "";
      loadItems();
      tmplModalShow.value = true;
    }
    const loadItems = wrap(async () => {
      items.value = [];
      const { get } = await useHttpClient();
      try {
        let res = await get(`@page_ajax/getTemplates?type=${type.value}`);
        items.value = res.data.data.map((item) => {
          item.key = uid();
          return item;
        });
      } catch (e) {
        console.error(e);
      }
    });
    function selected(item) {
      tmplModalShow.value = false;
      if (callback.value) {
        callback.value(item, type.value, i.value);
      }
      emits("selected", item, type.value, i.value);
      callback.value = void 0;
      type.value = "";
      i.value = 0;
    }
    async function remove(item, idx) {
      const v = await deleteConfirm("Are you sure you want to delete?", "This action cannot be undone.");
      if (!v) {
        return;
      }
      const { post, isAxiosError } = await useHttpClient();
      try {
        await post(
          "@page_ajax/removeTemplate",
          { id: item.id }
        );
        items.value.splice(idx, 1);
      } catch (e) {
        if (isAxiosError(e)) {
          simpleAlert(e.message, "", "warning");
        }
      }
    }
    function badgeColor(t) {
      switch (t) {
        case "page":
          return "dark";
        case "row":
          return "primary";
        case "column":
          return "warning";
        case "addon":
          return "danger";
      }
    }
    const saveContent = wrapSave(async () => {
      const { post, isAxiosError } = await useHttpClient();
      try {
        await post(
          "@page_ajax/saveTemplate",
          toFormData({
            id: saveData.value.id,
            type: saveData.value.type,
            image: saveData.value.image,
            title: saveData.value.title,
            description: saveData.value.description,
            content: JSON.stringify(saveData.value.content)
          })
        );
        saveModalShow.value = false;
        resetSaveData();
      } catch (e) {
        if (isAxiosError(e)) {
          simpleAlert(e.response?.statusText || e.message, "", "warning");
        }
        console.error(e);
      }
    });
    function openSave(content, t) {
      resetSaveData();
      saveData.value.type = t;
      saveData.value.content = content;
      saveModalShow.value = true;
    }
    function resetSaveData() {
      saveData.value.type = null;
      saveData.value.content = null;
      saveData.value.image = "";
      saveData.value.title = "";
    }
    const filterButtons = computed(() => {
      let types = type.value ? type.value.split(",").map((t) => t.trim()) : [];
      const options = [{ text: "All", value: "" }];
      types.forEach((t) => {
        options.push({ text: t, value: t });
      });
      return options;
    });
    const filteredItems = computed(() => {
      return items.value.filter((item) => {
        if (filterType.value && item.type !== filterType.value) {
          return false;
        }
        if (q.value !== "") {
          if (item.title?.toUpperCase().indexOf(q.value.toUpperCase()) !== -1) {
            return true;
          }
          if (item.description && item.description.toUpperCase().indexOf(q.value.toUpperCase()) !== -1) {
            return true;
          }
          return false;
        }
        return true;
      });
    });
    __expose({
      open,
      openSave
    });
    const __returned__ = { toFormData, emits, q, filterType, items, callback, type, i, saveData, loading, wrap, saving, wrapSave, tmplModalShow, saveModalShow, open, loadItems, selected, remove, badgeColor, saveContent, openSave, resetSaveData, filterButtons, filteredItems, get BModal() {
      return _sfc_main$d;
    }, SingleImage, ButtonRadio };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$1 = { class: "form-group mb-3 d-flex align-items-center" };
const _hoisted_2$1 = { class: "c-template-manager__items row" };
const _hoisted_3$1 = ["data-id"];
const _hoisted_4$1 = ["onClick"];
const _hoisted_5$1 = { class: "card-footer" };
const _hoisted_6$1 = { class: "d-flex" };
const _hoisted_7$1 = { class: "mb-0 me-2" };
const _hoisted_8$1 = { class: "ml-auto ms-auto" };
const _hoisted_9$1 = ["onClick"];
const _hoisted_10$1 = { class: "small mt-2" };
const _hoisted_11$1 = {
  key: 0,
  class: "d-flex justify-content-center py-5 my-5"
};
const _hoisted_12$1 = { class: "d-flex flex-column gap-4" };
const _hoisted_13$1 = { class: "form-group" };
const _hoisted_14$1 = { class: "form-group" };
const _hoisted_15$1 = { class: "form-group" };
const _hoisted_16$1 = { class: "form-group text-center" };
const _hoisted_17 = ["disabled"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createVNode($setup["BModal"], {
      "model-value": $setup.tmplModalShow,
      title: "Template",
      size: "xl",
      lazy: "",
      "unmount-lazy": "",
      onHidden: _cache[2] || (_cache[2] = ($event) => $setup.tmplModalShow = false),
      "class-name": "c-template-manager",
      "no-footer": ""
    }, {
      default: withCtx(() => [
        createElementVNode("div", _hoisted_1$1, [
          _cache[8] || (_cache[8] = createElementVNode("span", { class: "me-2" }, "\r\n            Filter:\r\n          ", -1)),
          _cache[9] || (_cache[9] = createTextVNode()),
          createVNode($setup["ButtonRadio"], {
            id: "input-filter",
            color: "primary",
            variant: "outline",
            size: "sm",
            class: "me-2",
            modelValue: $setup.filterType,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.filterType = $event),
            options: $setup.filterButtons
          }, null, 8, ["modelValue", "options"]),
          _cache[10] || (_cache[10] = createTextVNode()),
          createElementVNode("div", null, [
            withDirectives(createElementVNode("input", {
              type: "search",
              placeholder: "Search",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.q = $event),
              class: "form-control form-control-sm"
            }, null, 512), [
              [vModelText, $setup.q]
            ])
          ])
        ]),
        _cache[17] || (_cache[17] = createTextVNode()),
        createElementVNode("div", _hoisted_2$1, [
          createVNode(TransitionGroup, { name: "fade" }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList($setup.filteredItems, (item, idx) => {
                return openBlock(), createElementBlock("div", {
                  class: "col-md-6",
                  key: item.id || item.key,
                  "data-id": item.id,
                  style: { "animation-duration": ".3s" }
                }, [
                  createElementVNode("div", {
                    class: "c-template-item card my-3",
                    onClick: withModifiers(($event) => $setup.selected(item), ["prevent"]),
                    style: { "cursor": "pointer" }
                  }, [
                    createElementVNode("div", {
                      class: "c-template-item__preview card-img-top",
                      style: normalizeStyle({ "background-image": `url(${item.image})` })
                    }, null, 4),
                    _cache[15] || (_cache[15] = createTextVNode()),
                    createElementVNode("div", _hoisted_5$1, [
                      createElementVNode("div", _hoisted_6$1, [
                        createElementVNode("h5", _hoisted_7$1, toDisplayString(item.title || "No title"), 1),
                        _cache[12] || (_cache[12] = createTextVNode()),
                        createElementVNode("div", null, [
                          createElementVNode("div", {
                            class: normalizeClass(["badge", `bg-${$setup.badgeColor(item.type)}`])
                          }, toDisplayString(item.type), 3)
                        ]),
                        _cache[13] || (_cache[13] = createTextVNode()),
                        createElementVNode("div", _hoisted_8$1, [
                          item.can_delete === true ? (openBlock(), createElementBlock("a", {
                            key: 0,
                            href: "#",
                            class: "text-dark",
                            onClick: withModifiers(($event) => $setup.remove(item, idx), ["prevent", "stop"])
                          }, [..._cache[11] || (_cache[11] = [
                            createElementVNode("span", { class: "fa fa-trash" }, null, -1),
                            createTextVNode("\r\n                      Delete\r\n                    ", -1)
                          ])], 8, _hoisted_9$1)) : createCommentVNode("", true)
                        ])
                      ]),
                      _cache[14] || (_cache[14] = createTextVNode()),
                      createElementVNode("div", _hoisted_10$1, toDisplayString(item.description || "No description"), 1)
                    ])
                  ], 8, _hoisted_4$1)
                ], 8, _hoisted_3$1);
              }), 128))
            ]),
            _: 1
          })
        ]),
        _cache[18] || (_cache[18] = createTextVNode()),
        $setup.items.length === 0 && $setup.loading ? (openBlock(), createElementBlock("div", _hoisted_11$1, [..._cache[16] || (_cache[16] = [
          createElementVNode("span", { class: "spinner spinner-border" }, null, -1)
        ])])) : createCommentVNode("", true)
      ]),
      _: 1
    }, 8, ["model-value"]),
    _cache[31] || (_cache[31] = createTextVNode()),
    createVNode($setup["BModal"], {
      "model-value": $setup.saveModalShow,
      onHidden: _cache[7] || (_cache[7] = ($event) => $setup.saveModalShow = false),
      title: "Save as Template",
      lazy: "",
      "unmount-lazy": "",
      "no-footer": ""
    }, {
      default: withCtx(() => [
        createElementVNode("div", _hoisted_12$1, [
          createElementVNode("div", null, [
            _cache[19] || (_cache[19] = createTextVNode("\r\n          Save as: ", -1)),
            createElementVNode("div", {
              class: normalizeClass(["badge", `bg-${$setup.badgeColor($setup.saveData.type)}`])
            }, toDisplayString($setup.saveData.type), 3)
          ]),
          _cache[27] || (_cache[27] = createTextVNode()),
          createElementVNode("div", _hoisted_13$1, [
            _cache[20] || (_cache[20] = createElementVNode("label", { for: "input-tmpl-title" }, "Title", -1)),
            _cache[21] || (_cache[21] = createTextVNode()),
            createElementVNode("div", null, [
              withDirectives(createElementVNode("input", {
                id: "input-tmpl-title",
                type: "text",
                class: "form-control",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.saveData.title = $event)
              }, null, 512), [
                [vModelText, $setup.saveData.title]
              ])
            ])
          ]),
          _cache[28] || (_cache[28] = createTextVNode()),
          createElementVNode("div", _hoisted_14$1, [
            _cache[22] || (_cache[22] = createElementVNode("label", { for: "input-tmpl-description" }, "Description", -1)),
            _cache[23] || (_cache[23] = createTextVNode()),
            createElementVNode("div", null, [
              withDirectives(createElementVNode("textarea", {
                id: "input-tmpl-description",
                type: "text",
                class: "form-control",
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.saveData.description = $event),
                rows: "3"
              }, null, 512), [
                [vModelText, $setup.saveData.description]
              ])
            ])
          ]),
          _cache[29] || (_cache[29] = createTextVNode()),
          createElementVNode("div", _hoisted_15$1, [
            _cache[24] || (_cache[24] = createElementVNode("label", { for: "input-tmpl-image" }, "Cover", -1)),
            _cache[25] || (_cache[25] = createTextVNode()),
            createElementVNode("div", null, [
              createVNode($setup["SingleImage"], {
                modelValue: $setup.saveData.image,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.saveData.image = $event),
                id: "input-tmpl-image"
              }, null, 8, ["modelValue"])
            ])
          ]),
          _cache[30] || (_cache[30] = createTextVNode()),
          createElementVNode("div", _hoisted_16$1, [
            createElementVNode("button", {
              type: "button",
              class: "btn btn-primary btn-block",
              style: { "width": "150px" },
              disabled: $setup.saving,
              onClick: _cache[6] || (_cache[6] = (...args) => $setup.saveContent && $setup.saveContent(...args))
            }, [
              createElementVNode("span", {
                class: normalizeClass($setup.saving ? "spinner-border spinner-border-sm" : "fa fa-save")
              }, null, 2),
              _cache[26] || (_cache[26] = createTextVNode("\r\n            Save\r\n          ", -1))
            ], 8, _hoisted_17)
          ])
        ])
      ]),
      _: 1
    }, 8, ["model-value"])
  ]);
}
const TemplateManager = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-e6c3510b"], ["__file", "TemplateManager.vue"]]);
const bvCss = '.b-avatar{display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;flex-shrink:0;width:2.5rem;height:2.5rem;font-size:inherit;font-weight:400;line-height:1;max-width:100%;max-height:auto;text-align:center;overflow:visible;position:relative;transition:color .15s ease-in-out,background-color .15s ease-in-out,box-shadow .15s ease-in-out}.b-avatar:focus{outline:0}.b-avatar.btn,.b-avatar[href]{padding:0;border:0}.b-avatar.btn .b-avatar-img img,.b-avatar[href] .b-avatar-img img{transition:transform .15s ease-in-out}.b-avatar.btn:not(:disabled):not(.disabled),.b-avatar[href]:not(:disabled):not(.disabled){cursor:pointer}.b-avatar.btn:not(:disabled):not(.disabled):hover .b-avatar-img img,.b-avatar[href]:not(:disabled):not(.disabled):hover .b-avatar-img img{transform:scale(1.15)}.b-avatar.disabled,.b-avatar:disabled,.b-avatar[disabled]{opacity:.65;pointer-events:none}.b-avatar .b-avatar-custom,.b-avatar .b-avatar-text,.b-avatar .b-avatar-img{border-radius:inherit;width:100%;height:100%;overflow:hidden;display:flex;justify-content:center;align-items:center;-webkit-mask-image:radial-gradient(#fff,#000);mask-image:radial-gradient(#fff,#000)}.b-avatar .b-avatar-text{text-transform:uppercase;white-space:nowrap}.b-avatar[href]{text-decoration:none}.b-avatar>.bootstrap-icon{width:60%;height:auto;max-width:100%}.b-avatar .b-avatar-img img{width:100%;height:100%;max-height:auto;border-radius:inherit;object-fit:cover}.b-avatar .b-avatar-badge{position:absolute;min-height:1.5em;min-width:1.5em;padding:.25em;line-height:1;border-radius:10em;font-size:70%;font-weight:700;z-index:1}.b-avatar-sm{width:1.5rem;height:1.5rem}.b-avatar-sm .b-avatar-text{font-size:.6rem}.b-avatar-sm .b-avatar-badge{font-size:.42rem}.b-avatar-lg{width:3.5rem;height:3.5rem}.b-avatar-lg .b-avatar-text{font-size:1.4rem}.b-avatar-lg .b-avatar-badge{font-size:.98rem}.b-avatar-group .b-avatar-group-inner{display:flex;flex-wrap:wrap}.b-avatar-group .b-avatar{border:1px solid #dee2e6}.b-avatar-group a.b-avatar:hover:not(.disabled):not(disabled),.b-avatar-group .btn.b-avatar:hover:not(.disabled):not(disabled){z-index:1}.card-deck{gap:1.5rem}@media (min-width: 576px){.card-deck{display:flex;flex-flow:row wrap}}.card-deck>.card{flex:1 0 0%;margin-bottom:0}.card-columns .card{margin-bottom:.75rem}@media (min-width: 576px){.card-columns{column-count:3;column-gap:1.25rem;orphans:1;widows:1}.card-columns .card{display:inline-block;width:100%}}.b-form-rating{display:flex;justify-content:space-between;padding:.375rem .75rem;margin:.5rem;border-radius:.375rem;border:1px solid var(--bs-secondary-border-subtle, #dee2e6);background-color:var(--bs-body-bg);gap:.25rem}.b-form-rating.no-border{border:none}.b-form-rating.is-disabled{color:var(--bs-secondary);background-color:var(--bs-secondary-bg)}.b-form-rating .clear-icon{width:1em;height:1em;transition:transform var(--bs-transition-duration) ease;color:var(--bs-body-color);fill:currentColor}.b-form-rating:not(.is-readonly):not(.is-disabled) .clear-icon:hover{transform:scale(1.5)}.star{cursor:pointer;-webkit-user-select:none;user-select:none;padding:0 .25em}.is-readonly .star,.is-disabled .star{cursor:default}.clear-button-spacing{cursor:pointer;margin-left:.5rem}.star-spacing{margin:0 .5rem}.rating-value-text{color:var(--bs-body-color);margin:0 .6}.b-form-rating-star svg{transition:transform .2s ease}.b-form-rating:not(.is-readonly):not(.is-disabled) .star:hover .b-form-rating-star svg{transform:scale(1.5)}.b-form-tags.focus{background-color:var(--bs-body-bg);border-color:#86b7fe;outline:0;box-shadow:0 0 0 .25rem #0d6efd40}.b-form-tags.disabled{background-color:var(--bs-secondary-bg)}.b-form-tag.disabled{opacity:.75}.b-form-tags.focus.is-valid{border-color:#198754;box-shadow:0 0 0 .25rem #19875440}.b-form-tags.focus.is-invalid{border-color:#dc3545;box-shadow:0 0 0 .25rem #dc354540}.b-form-tags .b-form-tags-list{margin-top:-.25rem}.b-form-tags .b-form-tags-list .b-form-tag,.b-form-tags .b-form-tags-list .b-from-tags-field{margin-top:.25rem}.b-form-tags .b-form-tags-list .b-form-tag{padding:.25em .65em}.b-form-tag{font-size:75%!important;font-weight:400!important;line-height:1.5!important;margin-right:.25rem}.b-form-tags .b-form-tag+.b-form-tag{margin-left:0}.b-form-tag>button.b-form-tag-remove{color:inherit;font-size:75%;line-height:1;float:none;margin-left:.25rem}.input-group .btn-group:not(:last-child)>:not(:first-child){border-start-end-radius:0px;border-end-end-radius:0px}.input-group .btn-group:not(:last-child)>:not(:last-child){border-start-start-radius:0px;border-end-start-radius:0px}.input-group .btn-group:not(:first-child)>:not(:last-child){border-end-start-radius:0px;border-start-start-radius:0px}.b-pagination-pills .page-item .page-link{border-radius:50rem!important;margin-left:.25rem!important;line-height:1}.b-pagination-pills .page-item:first-child .page-link{margin-left:0!important}.b-table-stacked-label{display:none;font-weight:700}.table.b-table.b-table-stacked{display:block;width:100%}.table.b-table.b-table-stacked>tfoot,.table.b-table.b-table-stacked>tfoot>tr.b-table-bottom-row,.table.b-table.b-table-stacked>tfoot>tr.b-table-top-row,.table.b-table.b-table-stacked>thead,.table.b-table.b-table-stacked>thead>tr.b-table-bottom-row,.table.b-table.b-table-stacked>thead>tr.b-table-top-row{display:none}.table.b-table.b-table-stacked>caption,.table.b-table.b-table-stacked>tbody,.table.b-table.b-table-stacked>tbody>tr,.table.b-table.b-table-stacked>tbody>tr>td,.table.b-table.b-table-stacked>tbody>tr>td>.b-table-stacked-label,.table.b-table.b-table-stacked>tbody>tr>th{display:block}.table.b-table.b-table-stacked>tbody>tr>:first-child,.table.b-table.b-table-stacked>tbody>tr>[rowspan]+td,.table.b-table.b-table-stacked>tbody>tr>[rowspan]+th{border-top-width:3px}.table.b-table.b-table-stacked>tbody>tr>[data-label]:before{content:attr(data-label);width:40%;float:left;text-align:right;word-wrap:break-word;font-weight:700;font-style:normal;padding:0 .5rem 0 0;margin:0}.table.b-table.b-table-stacked>tbody>tr>[data-label]:after{display:block;clear:both;content:""}.table.b-table.b-table-stacked>tbody>tr>[data-label]>div{display:inline-block;width:60%;padding:0 0 0 .5rem;margin:0}@media (max-width: 575.98px){.table.b-table.b-table-stacked-sm{display:block;width:100%}.table.b-table.b-table-stacked-sm>tfoot,.table.b-table.b-table-stacked-sm>tfoot>tr.b-table-bottom-row,.table.b-table.b-table-stacked-sm>tfoot>tr.b-table-top-row,.table.b-table.b-table-stacked-sm>thead,.table.b-table.b-table-stacked-sm>thead>tr.b-table-bottom-row,.table.b-table.b-table-stacked-sm>thead>tr.b-table-top-row{display:none}.table.b-table.b-table-stacked-sm>caption,.table.b-table.b-table-stacked-sm>tbody,.table.b-table.b-table-stacked-sm>tbody>tr,.table.b-table.b-table-stacked-sm>tbody>tr>td,.table.b-table.b-table-stacked-sm>tbody>tr>td>.b-table-stacked-label,.table.b-table.b-table-stacked-sm>tbody>tr>th{display:block}.table.b-table.b-table-stacked-sm>tbody>tr>:first-child,.table.b-table.b-table-stacked-sm>tbody>tr>[rowspan]+td,.table.b-table.b-table-stacked-sm>tbody>tr>[rowspan]+th{border-top-width:3px}.table.b-table.b-table-stacked-sm>tbody>tr>[data-label]:before{content:attr(data-label);width:40%;float:left;text-align:right;word-wrap:break-word;font-weight:700;font-style:normal;padding:0 .5rem 0 0;margin:0}.table.b-table.b-table-stacked-sm>tbody>tr>[data-label]:after{display:block;clear:both;content:""}.table.b-table.b-table-stacked-sm>tbody>tr>[data-label]>div{display:inline-block;width:60%;padding:0 0 0 .5rem;margin:0}}@media (max-width: 767.98px){.table.b-table.b-table-stacked-md{display:block;width:100%}.table.b-table.b-table-stacked-md>tfoot,.table.b-table.b-table-stacked-md>tfoot>tr.b-table-bottom-row,.table.b-table.b-table-stacked-md>tfoot>tr.b-table-top-row,.table.b-table.b-table-stacked-md>thead,.table.b-table.b-table-stacked-md>thead>tr.b-table-bottom-row,.table.b-table.b-table-stacked-md>thead>tr.b-table-top-row{display:none}.table.b-table.b-table-stacked-md>caption,.table.b-table.b-table-stacked-md>tbody,.table.b-table.b-table-stacked-md>tbody>tr,.table.b-table.b-table-stacked-md>tbody>tr>td,.table.b-table.b-table-stacked-md>tbody>tr>td>.b-table-stacked-label,.table.b-table.b-table-stacked-md>tbody>tr>th{display:block}.table.b-table.b-table-stacked-md>tbody>tr>:first-child,.table.b-table.b-table-stacked-md>tbody>tr>[rowspan]+td,.table.b-table.b-table-stacked-md>tbody>tr>[rowspan]+th{border-top-width:3px}.table.b-table.b-table-stacked-md>tbody>tr>[data-label]:before{content:attr(data-label);width:40%;float:left;text-align:right;word-wrap:break-word;font-weight:700;font-style:normal;padding:0 .5rem 0 0;margin:0}.table.b-table.b-table-stacked-md>tbody>tr>[data-label]:after{display:block;clear:both;content:""}.table.b-table.b-table-stacked-md>tbody>tr>[data-label]>div{display:inline-block;width:60%;padding:0 0 0 .5rem;margin:0}}@media (max-width: 991.98px){.table.b-table.b-table-stacked-lg{display:block;width:100%}.table.b-table.b-table-stacked-lg>tfoot,.table.b-table.b-table-stacked-lg>tfoot>tr.b-table-bottom-row,.table.b-table.b-table-stacked-lg>tfoot>tr.b-table-top-row,.table.b-table.b-table-stacked-lg>thead,.table.b-table.b-table-stacked-lg>thead>tr.b-table-bottom-row,.table.b-table.b-table-stacked-lg>thead>tr.b-table-top-row{display:none}.table.b-table.b-table-stacked-lg>caption,.table.b-table.b-table-stacked-lg>tbody,.table.b-table.b-table-stacked-lg>tbody>tr,.table.b-table.b-table-stacked-lg>tbody>tr>td,.table.b-table.b-table-stacked-lg>tbody>tr>td>.b-table-stacked-label,.table.b-table.b-table-stacked-lg>tbody>tr>th{display:block}.table.b-table.b-table-stacked-lg>tbody>tr>:first-child,.table.b-table.b-table-stacked-lg>tbody>tr>[rowspan]+td,.table.b-table.b-table-stacked-lg>tbody>tr>[rowspan]+th{border-top-width:3px}.table.b-table.b-table-stacked-lg>tbody>tr>[data-label]:before{content:attr(data-label);width:40%;float:left;text-align:right;word-wrap:break-word;font-weight:700;font-style:normal;padding:0 .5rem 0 0;margin:0}.table.b-table.b-table-stacked-lg>tbody>tr>[data-label]:after{display:block;clear:both;content:""}.table.b-table.b-table-stacked-lg>tbody>tr>[data-label]>div{display:inline-block;width:60%;padding:0 0 0 .5rem;margin:0}}@media (max-width: 1199.98px){.table.b-table.b-table-stacked-xl{display:block;width:100%}.table.b-table.b-table-stacked-xl>tfoot,.table.b-table.b-table-stacked-xl>tfoot>tr.b-table-bottom-row,.table.b-table.b-table-stacked-xl>tfoot>tr.b-table-top-row,.table.b-table.b-table-stacked-xl>thead,.table.b-table.b-table-stacked-xl>thead>tr.b-table-bottom-row,.table.b-table.b-table-stacked-xl>thead>tr.b-table-top-row{display:none}.table.b-table.b-table-stacked-xl>caption,.table.b-table.b-table-stacked-xl>tbody,.table.b-table.b-table-stacked-xl>tbody>tr,.table.b-table.b-table-stacked-xl>tbody>tr>td,.table.b-table.b-table-stacked-xl>tbody>tr>td>.b-table-stacked-label,.table.b-table.b-table-stacked-xl>tbody>tr>th{display:block}.table.b-table.b-table-stacked-xl>tbody>tr>:first-child,.table.b-table.b-table-stacked-xl>tbody>tr>[rowspan]+td,.table.b-table.b-table-stacked-xl>tbody>tr>[rowspan]+th{border-top-width:3px}.table.b-table.b-table-stacked-xl>tbody>tr>[data-label]:before{content:attr(data-label);width:40%;float:left;text-align:right;word-wrap:break-word;font-weight:700;font-style:normal;padding:0 .5rem 0 0;margin:0}.table.b-table.b-table-stacked-xl>tbody>tr>[data-label]:after{display:block;clear:both;content:""}.table.b-table.b-table-stacked-xl>tbody>tr>[data-label]>div{display:inline-block;width:60%;padding:0 0 0 .5rem;margin:0}}@media (max-width: 1399.98px){.table.b-table.b-table-stacked-xxl{display:block;width:100%}.table.b-table.b-table-stacked-xxl>tfoot,.table.b-table.b-table-stacked-xxl>tfoot>tr.b-table-bottom-row,.table.b-table.b-table-stacked-xxl>tfoot>tr.b-table-top-row,.table.b-table.b-table-stacked-xxl>thead,.table.b-table.b-table-stacked-xxl>thead>tr.b-table-bottom-row,.table.b-table.b-table-stacked-xxl>thead>tr.b-table-top-row{display:none}.table.b-table.b-table-stacked-xxl>caption,.table.b-table.b-table-stacked-xxl>tbody,.table.b-table.b-table-stacked-xxl>tbody>tr,.table.b-table.b-table-stacked-xxl>tbody>tr>td,.table.b-table.b-table-stacked-xxl>tbody>tr>td>.b-table-stacked-label,.table.b-table.b-table-stacked-xxl>tbody>tr>th{display:block}.table.b-table.b-table-stacked-xxl>tbody>tr>:first-child,.table.b-table.b-table-stacked-xxl>tbody>tr>[rowspan]+td,.table.b-table.b-table-stacked-xxl>tbody>tr>[rowspan]+th{border-top-width:3px}.table.b-table.b-table-stacked-xxl>tbody>tr>[data-label]:before{content:attr(data-label);width:40%;float:left;text-align:right;word-wrap:break-word;font-weight:700;font-style:normal;padding:0 .5rem 0 0;margin:0}.table.b-table.b-table-stacked-xxl>tbody>tr>[data-label]:after{display:block;clear:both;content:""}.table.b-table.b-table-stacked-xxl>tbody>tr>[data-label]>div{display:inline-block;width:60%;padding:0 0 0 .5rem;margin:0}}.b-table-sticky-header,.table-responsive,[class*=table-responsive-]{margin-bottom:1rem}.b-table-sticky-header>.table,.table-responsive>.table,[class*=table-responsive-]>.table{margin-bottom:0}.b-table-sticky-header{overflow-y:auto}@media print{.b-table-sticky-header{overflow-y:visible!important;max-height:none!important}}.table.b-table[aria-busy=true]{opacity:.55}@supports (position: sticky){.b-table-sticky-header>.table.b-table>thead>tr>th{position:sticky;top:0;z-index:2}.b-table-sticky-header>.table.b-table>thead>tr>.b-table-sticky-column,.b-table-sticky-header>.table.b-table>tbody>tr>.b-table-sticky-column,.b-table-sticky-header>.table.b-table>tfoot>tr>.b-table-sticky-column,.table-responsive>.table.b-table>thead>tr>.b-table-sticky-column,.table-responsive>.table.b-table>tbody>tr>.b-table-sticky-column,.table-responsive>.table.b-table>tfoot>tr>.b-table-sticky-column,[class*=table-responsive-]>.table.b-table>thead>tr>.b-table-sticky-column,[class*=table-responsive-]>.table.b-table>tbody>tr>.b-table-sticky-column,[class*=table-responsive-]>.table.b-table>tfoot>tr>.b-table-sticky-column{position:sticky;left:0}.b-table-sticky-header>.table.b-table>thead>tr>.b-table-sticky-column,.table-responsive>.table.b-table>thead>tr>.b-table-sticky-column,[class*=table-responsive-]>.table.b-table>thead>tr>.b-table-sticky-column{z-index:5}.b-table-sticky-header>.table.b-table>tbody>tr>.b-table-sticky-column,.b-table-sticky-header>.table.b-table>tfoot>tr>.b-table-sticky-column,.table-responsive>.table.b-table>tbody>tr>.b-table-sticky-column,.table-responsive>.table.b-table>tfoot>tr>.b-table-sticky-column,[class*=table-responsive-]>.table.b-table>tbody>tr>.b-table-sticky-column,[class*=table-responsive-]>.table.b-table>tfoot>tr>.b-table-sticky-column{z-index:2}}.table.b-table>tbody>tr>.table-b-table-default,.table.b-table>tfoot>tr>.table-b-table-default,.table.b-table>thead>tr>.table-b-table-default{color:#212529;background-color:#fff}.table th.b-table-sortable-column,.b-table.b-table-selectable td{cursor:pointer}.b-table.b-table-busy .b-table-busy-slot>td{border:none;padding:0}.b-table.b-table-fixed{table-layout:fixed}.b-table.b-table-no-border-collapse{border-collapse:separate;border-spacing:0}input[type=range].is-valid::-webkit-slider-thumb{background-color:#198754}input[type=range].is-valid::-moz-range-thumb{background-color:#198754}input[type=range].is-valid::-ms-thumb{background-color:#198754}input[type=range].is-invalid::-webkit-slider-thumb{background-color:#dc3545}input[type=range].is-invalid::-moz-range-thumb{background-color:#dc3545}input[type=range].is-invalid::-ms-thumb{background-color:#dc3545}input[type=range].is-valid::-webkit-slider-runnable-track{background-color:#84e8ba}input[type=range].is-valid::-moz-range-track{background-color:#84e8ba}input[type=range].is-valid::-ms-track{background-color:#84e8ba}input[type=range].is-invalid::-webkit-slider-runnable-track{background-color:#fae3e5}input[type=range].is-invalid::-moz-range-track{background-color:#fae3e5}input[type=range].is-invalid::-ms-track{background-color:#fae3e5}input[type=file].form-control-input-file-hide-button::-webkit-file-upload-button{display:none}input[type=file].form-control-input-file-hide-button::file-selector-button{display:none}.b-form-spinbutton{text-align:center;overflow:hidden;background-image:none;padding:0}[dir=rtl] .b-form-spinbutton:not(.flex-column),.b-form-spinbutton[dir=rtl]:not(.flex-column){flex-direction:row-reverse}.b-form-spinbutton output{font-size:inherit;outline:0;border:0;background-color:transparent;width:auto;margin:0;padding:0 .25rem}.b-form-spinbutton output>div,.b-form-spinbutton output>bdi{display:block;min-width:2.25em;height:1.5em}.b-form-spinbutton.flex-column{height:auto;width:auto}.b-form-spinbutton.flex-column output{margin:0 .25rem;padding:.25rem 0}.b-form-spinbutton:not(.d-inline-flex):not(.flex-column){output-width:100%}.b-form-spinbutton.d-inline-flex:not(.flex-column){width:auto}.b-form-spinbutton .btn{line-height:1;box-shadow:none!important}.b-form-spinbutton .btn:disabled{pointer-events:none}.b-form-spinbutton .btn:hover:not(:disabled)>div>.b-icon{transform:scale(1.25)}.b-form-spinbutton.disabled,.b-form-spinbutton.readonly{background-color:var(--bs-secondary-bg)}.b-form-spinbutton.disabled{pointer-events:none}.b-form-spinbutton:not(.form-control-sm):not(.form-control-lg):not(.flex-column){height:calc(1.5em + .5rem + var(--bs-border-width) * 2)}.alert .progress .progress-bar{--bs-progress-bar-transition: none}.alert .btn-close-custom{margin-bottom:auto;position:relative}.bs-popover-auto[data-popper-placement^=bottom] .popover-arrow:has(+div>.popover-header):after,.bs-popover-bottom .popover-arrow:has(+div>.popover-header):after{--bs-popover-bg: var(--bs-popover-header-bg)}.toast .progress .progress-bar{--bs-progress-bar-transition: none}.toast:not(.show){opacity:unset}.toast.fade:not(.show){opacity:0}.toast .btn-close-custom{margin:var(--bs-toast-padding-x) var(--bs-toast-padding-x) auto}.b-list-move,.b-list-enter-active,.b-list-leave-active{transition:all .5s cubic-bezier(.55,0,.1,1)}.b-list-enter-from,.b-list-leave-to{opacity:0}.b-list-leave-active{position:fixed}.container,.container-fluid{display:block}.input-group>.form-floating:not(:first-child)>:not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback){margin-left:0;border-top-left-radius:0;border-bottom-left-radius:0}.input-group:not(.has-validation)>.form-floating:not(:last-child)>:not(.dropdown-toggle):not(.dropdown-menu){border-top-right-radius:0;border-bottom-right-radius:0}.dropdown-toggle.dropdown-toggle-no-caret:before,.dropdown-toggle.dropdown-toggle-no-caret:after{display:none!important}.dropdown-menu.fade.showing{display:block!important}.bv-no-focus-ring:focus{outline:none}@media (max-width: 575.98px){.bv-d-sm-down-none{display:none!important}}@media (max-width: 767.98px){.bv-d-md-down-none{display:none!important}}@media (max-width: 991.98px){.bv-d-lg-down-none{display:none!important}}@media (max-width: 1199.98px){.bv-d-xl-down-none{display:none!important}}@media (max-width: 1399.98px){.bv-d-xxl-down-none{display:none!important}}.fade-enter-active,.fade-leave-active{transition:opacity .25s linear}.fade-enter-from,.fade-leave-to{opacity:0}.no-transition{transition:none!important}:root{--bs-modal-zindex: 1055;--bs-toast-max-width: 350px}\n';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageBuilderApp",
  setup(__props, { expose: __expose }) {
    __expose();
    injectCssToDocument(bvCss);
    const {
      addTextToClipboard,
      emptyRow,
      readClipboard,
      saving,
      savePage: doSavePage,
      bindSaveButton,
      duplicateAny,
      addonBasicOptions
    } = usePageBuilderUtilities();
    const u2 = useUnicorn();
    const addonDefines = inject("addons");
    const app2 = getCurrentInstance$1();
    const content = ref(data("builder-content") || []);
    const drag = ref(false);
    const editingRow = ref();
    const editingColumn = ref();
    const editingAddon = ref();
    const css2 = ref(data("css") || "");
    const cssModalShow = ref(false);
    u2.trigger("page-builder.created", app2);
    const rowEditor = useTemplateRef("rowEditor");
    const columnEditor = useTemplateRef("columnEditor");
    const addonEditor = useTemplateRef("addonEditor");
    const addonListShow = ref(false);
    const tmplManager = useTemplateRef("tmplManager");
    onMounted(() => {
      if (location.hash === "#css") {
        cssEdit();
      }
      bindSaveButton();
      registerUnicornEvents();
    });
    function cssEdit() {
      cssModalShow.value = true;
    }
    function addNewRow(i) {
      if (i != null) {
        content.value.splice(i + 1, 0, emptyRow());
      } else {
        content.value.push(emptyRow());
      }
    }
    function deleteRow(i) {
      content.value.splice(i, 1);
    }
    function copy() {
      addTextToClipboard(content.value);
    }
    async function paste() {
      const text = await readClipboard();
      try {
        let data2 = JSON.parse(text);
        for (const item of data2) {
          duplicateRow(item, content.value.length);
        }
      } catch (e) {
        console.error(e);
        alert("Invalid format.");
      }
    }
    async function pastePage(text, i) {
      const t = await readClipboard();
      return pasteTo(t, i);
    }
    function pasteTo(text, i) {
      try {
        const data2 = JSON.parse(text);
        if (!Array.isArray(data2)) {
          duplicateRow(data2, i);
          return;
        }
        data2.forEach((item) => {
          duplicateRow(item, i++);
        });
      } catch (e) {
        console.error(e);
        alert("Invalid format.");
      }
    }
    function duplicateRow(row, i) {
      row = duplicateAny(row);
      content.value.splice(i + 1, 0, row);
    }
    function columnsChange(row, $event) {
      row.columns = $event.columns;
    }
    function selectAddon(type) {
      addonListShow.value = false;
      const addonDefine = addonDefines[type];
      const basicOptions = addonBasicOptions();
      const addon = defaultsDeep({}, { ...addonDefine, id: "addon-" + uid(), is: "addon" }, basicOptions);
      u2.trigger("addon:edit", addon, editingColumn.value);
      nextTick(() => {
        selectAll(".bs-tooltip-auto", (ele) => {
          ele.parentElement?.removeChild(ele);
        });
      });
    }
    const contentInput = document.querySelector("#input-item-content");
    watch(() => content.value, () => {
      contentInput.value = JSON.stringify(content.value);
    }, { immediate: true, deep: true });
    const cssInput = document.querySelector("#input-item-css");
    watch(() => css2.value, () => {
      cssInput.value = css2.value;
    }, { immediate: true, deep: true });
    function openTemplates(i = 0) {
      u2.trigger("tmpl.open", (item, type, i2) => {
        pasteTo(item.content, i2);
      }, "page,row", i);
    }
    async function savePage() {
      await nextTick();
      return await doSavePage();
    }
    useEventListener$1("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        savePage();
      }
    });
    function registerUnicornEvents() {
      u2.on("row:edit", (content2) => {
        editingColumn.value = void 0;
        editingAddon.value = void 0;
        editingRow.value = content2;
        rowEditor.value?.edit(content2);
      });
      u2.on("row:save", (content2) => {
        if (!editingRow.value) {
          return;
        }
        editingRow.value = Object.assign(editingRow.value, content2);
      });
      u2.on("column:edit", (content2) => {
        editingRow.value = void 0;
        editingAddon.value = void 0;
        editingColumn.value = content2;
        columnEditor.value?.edit(content2);
      });
      u2.on("column:save", (content2) => {
        if (!editingColumn.value) {
          return;
        }
        editingColumn.value = Object.assign(editingColumn.value, content2);
      });
      u2.on("addon:add", (column) => {
        editingColumn.value = void 0;
        editingColumn.value = column;
        addonListShow.value = true;
      });
      u2.on("addon:edit", (addon, column) => {
        editingRow.value = void 0;
        editingColumn.value = void 0;
        editingAddon.value = addon;
        editingColumn.value = column;
        addonEditor.value?.edit(addon);
      });
      u2.on("addon:save", (addon) => {
        if (!editingColumn.value) {
          return;
        }
        if (editingColumn.value.addons.filter((item) => item.id === addon.id).length === 0) {
          editingColumn.value.addons.push(addon);
        }
        editingAddon.value = Object.assign(editingAddon.value, addon);
      });
      u2.on("tmpl.open", (callback, type, i) => {
        tmplManager.value?.open(callback, type, i);
      });
      u2.on("tmpl.save", (content2, type) => {
        tmplManager.value?.openSave(content2, type);
      });
      u2.trigger("page-builder.mounted", app2);
    }
    const __returned__ = { addTextToClipboard, emptyRow, readClipboard, saving, doSavePage, bindSaveButton, duplicateAny, addonBasicOptions, u: u2, addonDefines, app: app2, content, drag, editingRow, editingColumn, editingAddon, css: css2, cssModalShow, rowEditor, columnEditor, addonEditor, addonListShow, tmplManager, cssEdit, addNewRow, deleteRow, copy, paste, pastePage, pasteTo, duplicateRow, columnsChange, selectAddon, contentInput, cssInput, openTemplates, savePage, registerUnicornEvents, get BApp() {
      return _sfc_main$b;
    }, get BModal() {
      return _sfc_main$d;
    }, get VueDraggable() {
      return VueDraggable;
    }, AddonEdit, ColumnEdit, CssEditor, RowBox, RowEdit, TemplateManager };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "card-header page-builder__topbar d-flex" };
const _hoisted_2 = { class: "ms-auto" };
const _hoisted_3 = { class: "d-inline-block" };
const _hoisted_4 = { class: "text-nowrap btn-group dropdown" };
const _hoisted_5 = { class: "dropdown-menu dropdown-menu-end dropdown-menu-right" };
const _hoisted_6 = { class: "card-body" };
const _hoisted_7 = { class: "page-builder__body body" };
const _hoisted_8 = {
  key: 0,
  class: "page-builder__bottom-toolbar text-center"
};
const _hoisted_9 = { class: "dropdown btn-group text-nowrap" };
const _hoisted_10 = { class: "row c-addon-list" };
const _hoisted_11 = { class: "col-6 col-md-4 mb-2 c-addon-list__item c-addon" };
const _hoisted_12 = ["title", "onClick"];
const _hoisted_13 = { class: "c-addon__icon" };
const _hoisted_14 = { class: "m-0" };
const _hoisted_15 = { class: "ml-auto ms-auto" };
const _hoisted_16 = ["disabled"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_tooltip = resolveDirective("tooltip");
  return openBlock(), createBlock($setup["BApp"], {
    id: "page-builder",
    class: "page-builder card bg-light border-0"
  }, {
    default: withCtx(() => [
      createElementVNode("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
          createElementVNode("button", {
            type: "button",
            class: "btn btn-outline-secondary btn-sm",
            onClick: $setup.cssEdit,
            style: { "min-width": "150px" }
          }, [..._cache[11] || (_cache[11] = [
            createElementVNode("span", { class: "fab fa-css3" }, null, -1),
            createTextVNode("\r\n          Edit CSS\r\n        ", -1)
          ])]),
          _cache[18] || (_cache[18] = createTextVNode()),
          createElementVNode("div", _hoisted_3, [
            createElementVNode("div", _hoisted_4, [
              createElementVNode("button", {
                type: "button",
                class: "btn btn-outline-secondary btn-sm",
                onClick: _cache[0] || (_cache[0] = ($event) => $setup.openTemplates($setup.content.length))
              }, [..._cache[12] || (_cache[12] = [
                createElementVNode("div", { style: { "display": "inline-block", "min-width": "120px" } }, [
                  createElementVNode("span", { class: "fa fa-file-code" }),
                  createTextVNode("\r\n                Insert Template\r\n              ")
                ], -1)
              ])]),
              _cache[14] || (_cache[14] = createTextVNode()),
              _cache[15] || (_cache[15] = createElementVNode("button", {
                class: "btn btn-outline-secondary btn-sm dropdown-toggle dropdown-toggle-split",
                "data-toggle": "dropdown",
                "data-bs-toggle": "dropdown"
              }, [
                createElementVNode("span", { class: "visually-hidden sr-only" }, "Toggle Dropdown")
              ], -1)),
              _cache[16] || (_cache[16] = createTextVNode()),
              createElementVNode("div", _hoisted_5, [
                createElementVNode("button", {
                  class: "dropdown-item",
                  onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$trigger("tmpl.save", $setup.content, "page"))
                }, [..._cache[13] || (_cache[13] = [
                  createElementVNode("span", { class: "fa fa-fw fa-save" }, null, -1),
                  createTextVNode("\r\n                Save as Template\r\n              ", -1)
                ])])
              ])
            ])
          ]),
          _cache[19] || (_cache[19] = createTextVNode()),
          createElementVNode("button", {
            type: "button",
            class: "btn btn-outline-secondary btn-sm",
            onClick: $setup.copy,
            style: { "min-width": "150px" }
          }, [..._cache[17] || (_cache[17] = [
            createElementVNode("span", { class: "fa fa-clone" }, null, -1),
            createTextVNode("\r\n          Copy page content\r\n        ", -1)
          ])])
        ])
      ]),
      _cache[38] || (_cache[38] = createTextVNode()),
      createElementVNode("div", _hoisted_6, [
        createElementVNode("div", _hoisted_7, [
          createVNode($setup["VueDraggable"], mergeProps({
            modelValue: $setup.content,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.content = $event),
            onStart: _cache[3] || (_cache[3] = ($event) => $setup.drag = true),
            onEnd: _cache[4] || (_cache[4] = ($event) => $setup.drag = false)
          }, { handle: ".row-move-handle", animation: 300 }, {
            "item-key": "id",
            onAdd: _cache[5] || (_cache[5] = withModifiers(() => {
            }, ["stop"]))
          }), {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList($setup.content, (row, i) => {
                return openBlock(), createBlock($setup["RowBox"], {
                  key: row.id,
                  class: "body__row page-row mb-4",
                  value: row,
                  "move-handle": "row-move-handle",
                  onColumnsChange: ($event) => $setup.columnsChange(row, $event),
                  onAddNew: ($event) => $setup.addNewRow(i),
                  onDuplicate: ($event) => $setup.duplicateRow($event || row, i),
                  onPastePage: ($event) => $setup.pastePage($event, i),
                  onOpenTemplates: ($event) => $setup.openTemplates(i),
                  onDelete: ($event) => $setup.deleteRow(i)
                }, null, 8, ["value", "onColumnsChange", "onAddNew", "onDuplicate", "onPastePage", "onOpenTemplates", "onDelete"]);
              }), 128))
            ]),
            _: 1
          }, 16, ["modelValue"])
        ]),
        _cache[31] || (_cache[31] = createTextVNode()),
        $setup.content.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_8, [
          createElementVNode("div", _hoisted_9, [
            createElementVNode("button", {
              type: "button",
              class: "btn btn-outline-secondary btn-sm",
              onClick: _cache[6] || (_cache[6] = ($event) => $setup.addNewRow())
            }, "\r\n            Add New Row\r\n          "),
            _cache[23] || (_cache[23] = createTextVNode()),
            _cache[24] || (_cache[24] = createElementVNode("button", { class: "btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split" }, [
              createElementVNode("span", { class: "visually-hidden sr-only" }, "Toggle Dropdown")
            ], -1)),
            _cache[25] || (_cache[25] = createTextVNode()),
            createElementVNode("div", { class: "dropdown-menu dropdown-menu dropdown-menu-right" }, [
              createElementVNode("div", {
                class: "dropdown-item",
                onClick: $setup.paste
              }, [..._cache[20] || (_cache[20] = [
                createElementVNode("span", { class: "fa fa-fw fa-paste" }, null, -1),
                createTextVNode("\r\n              Paste\r\n            ", -1)
              ])]),
              _cache[22] || (_cache[22] = createTextVNode()),
              createElementVNode("div", {
                class: "dropdown-item",
                onClick: $setup.paste
              }, [..._cache[21] || (_cache[21] = [
                createElementVNode("span", { class: "fa fa-fw fa-file-code" }, null, -1),
                createTextVNode("\r\n              Insert Template\r\n            ", -1)
              ])])
            ])
          ])
        ])) : createCommentVNode("", true),
        _cache[32] || (_cache[32] = createTextVNode()),
        createVNode($setup["RowEdit"], { ref: "rowEditor" }, null, 512),
        _cache[33] || (_cache[33] = createTextVNode()),
        createVNode($setup["ColumnEdit"], { ref: "columnEditor" }, null, 512),
        _cache[34] || (_cache[34] = createTextVNode()),
        createVNode($setup["AddonEdit"], { ref: "addonEditor" }, null, 512),
        _cache[35] || (_cache[35] = createTextVNode()),
        createVNode($setup["BModal"], {
          "model-value": $setup.addonListShow,
          onHidden: _cache[7] || (_cache[7] = ($event) => $setup.addonListShow = false),
          size: "lg",
          class: "c-modal-addon-select",
          title: "New Addon",
          lazy: "",
          "unmount-lazy": "",
          "no-trap": "",
          "no-footer": ""
        }, {
          default: withCtx(() => [
            createElementVNode("div", _hoisted_10, [
              (openBlock(true), createElementBlock(Fragment, null, renderList($setup.addonDefines, (addon) => {
                return openBlock(), createElementBlock("div", _hoisted_11, [
                  withDirectives((openBlock(), createElementBlock("a", {
                    class: "d-inline-block p-4 c-addon__link btn btn-outline-dark w-100 text-center",
                    href: "javascript://",
                    title: addon.description,
                    onClick: withModifiers(($event) => $setup.selectAddon(addon.type), ["prevent"])
                  }, [
                    createElementVNode("div", _hoisted_13, [
                      createElementVNode("span", {
                        class: normalizeClass(["fa-3x", addon.icon])
                      }, null, 2)
                    ]),
                    _cache[26] || (_cache[26] = createTextVNode()),
                    createElementVNode("h5", _hoisted_14, toDisplayString(addon.name), 1)
                  ], 8, _hoisted_12)), [
                    [_directive_tooltip]
                  ])
                ]);
              }), 256))
            ])
          ]),
          _: 1
        }, 8, ["model-value"]),
        _cache[36] || (_cache[36] = createTextVNode()),
        createVNode($setup["TemplateManager"], { ref: "tmplManager" }, null, 512),
        _cache[37] || (_cache[37] = createTextVNode()),
        createVNode($setup["BModal"], {
          title: "CSS Edit (Support SCSS)",
          size: "xl",
          lazy: "",
          "unmount-lazy": "",
          "no-trap": "",
          class: "c-modal-css-edit",
          "model-value": $setup.cssModalShow,
          onHidden: _cache[10] || (_cache[10] = ($event) => $setup.cssModalShow = false),
          backdrop: "static"
        }, {
          footer: withCtx(() => [
            createElementVNode("div", _hoisted_15, [
              createElementVNode("button", {
                type: "button",
                class: "btn btn-outline-dark",
                style: { "min-width": "150px" },
                onClick: _cache[9] || (_cache[9] = ($event) => $setup.cssModalShow = false)
              }, [..._cache[27] || (_cache[27] = [
                createElementVNode("i", { class: "fa fa-times" }, null, -1),
                createTextVNode("\r\n              Close\r\n            ", -1)
              ])]),
              _cache[29] || (_cache[29] = createTextVNode()),
              createElementVNode("button", {
                type: "button",
                class: "btn btn-primary",
                style: { "min-width": "200px" },
                onClick: $setup.savePage,
                disabled: $setup.saving
              }, [
                createElementVNode("span", {
                  class: normalizeClass($setup.saving ? "spinner-border spinner-border-sm" : "fa fa-save")
                }, null, 2),
                _cache[28] || (_cache[28] = createTextVNode("\r\n              Save\r\n            ", -1))
              ], 8, _hoisted_16)
            ])
          ]),
          default: withCtx(() => [
            $setup.cssModalShow ? (openBlock(), createBlock($setup["CssEditor"], {
              key: 0,
              modelValue: $setup.css,
              "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.css = $event),
              "auto-focus": true
            }, null, 8, ["modelValue"])) : createCommentVNode("", true),
            _cache[30] || (_cache[30] = createTextVNode())
          ]),
          _: 1
        }, 8, ["model-value"])
      ])
    ]),
    _: 1
  });
}
const PageBuilderApp = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "PageBuilderApp.vue"]]);
function lunaAddonMixin(props, { emit }, state) {
  state.options = state.options || {};
  state.options = defaultsDeep(props.modelValue || {}, state.options);
  state = reactive(state);
  onMounted(() => {
  });
  watch(() => state.options, (v) => {
    emit("update:modelValue", v);
  }, { deep: true });
  return state;
}
lunaAddonMixin.props = {
  modelValue: Object,
  addonId: String
};
window.lunaAddonMixin = lunaAddonMixin;
const css = '.cursor-pointer {\n  cursor: pointer;\n}\n\n#page-builder .row {\n  margin-left: -7px;\n  margin-right: -7px;\n}\n#page-builder .row > [class*=col] {\n  padding-left: 7px;\n  padding-right: 7px;\n}\n#page-builder .page-row[disabled] {\n  overflow: hidden;\n}\n#page-builder .page-row[disabled] .page-row__body::after {\n  position: absolute;\n  top: 0;\n  left: 0;\n  content: "";\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.05) url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUU2RDMyMDk2REVCMTFFNjhDNjU5REU5QzRFMDdBQzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUU2RDMyMEE2REVCMTFFNjhDNjU5REU5QzRFMDdBQzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNTMyMzI3ODZEQ0YxMUU2OEM2NTlERTlDNEUwN0FDMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5RTZEMzIwODZERUIxMUU2OEM2NTlERTlDNEUwN0FDMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmlZh/wAAAMJSURBVHja7NnNiYUwGIbR1PFVIoooYv9rFf8txAsDMzBcrSBn4eqQZcC8T5rnOe77/vq2bYuiKILznD29YVmWMQxDcJ6zf12Qfd+jqqoYx/HxMOc5+b8LchxH1HUd0zQ9HuY8N/+7IOd5RtM0r/9knOfo6Rfbto1lWV4Pc56jp+u6ouu6WNf18TDnOXvq+/7n1f72YOE8Z092cM51EM51EM51EM51EM51EM51EM51EM51EM51EDs45zoI5zoI5zoI5zoI5zoI5zoI5zoI5zoI5zqIHZzrIHZwznUQznUQznUQznUQznUQznUQznUQznUQznUQOzjnOgjnOgjnOgjnOgjnOgjnOgjnOgjnOgjnOgjnOogdnHMdhHMdhHMdhHMdhHMdhHMdhHMdhHMdhHMdxA7OuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ5iB+dcB+FcB+FcB+FcB+FcB+FcB+FcB+FcB+FcB7GDc66DcK6DcK6DcK6DcK6DcK6DcK6DcK6DcK6DcK6D2ME510E410E410E410E410E410E410E410E410Hs4FwHsYNzroNwroNwroNwroNwroNwroNwroNwroNwroPYwTnXQTjXQTjXQTjXQTjXQTjXQTjXQTjXQTjXQezgXAexg3Oug3Cug3Cug3Cug3Cug3Cug3Cug3Cug3Cug9jBOddBONdBONdBONdBONdBONdBONdBONdBONdBONdB7OCc6yCc6yCc6yCc6yCc6yCc6yCc6yCc6yCc6yB2cM51EM51EM51EM51EM51EM51EM51EM51EM51EM51EDs45zoI5zoI5zoI5zoI5zoI5zoI5zoI5zoI5zqIHZxzHYRzHYRzHYRzHYRzHYRzHYRzHYRzHYRzHYRzHcQOzrkOwrkOwrkOwrkOwrkOwrkOwrkOwrkOwrkOYgfnOogdnHMdhHMdhHMdhHMdhHMdhHMdhHMdhHMdhHMdxA7OuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ5iB+c6iB2c8xf/CDAAMQipaEYspCcAAAAASUVORK5CYII=);\n}\n#page-builder .page-row__body {\n  position: relative;\n}\n#page-builder .page-row__body-placeholder {\n  display: none;\n}\n#page-builder .page-row__body-placeholder:only-child {\n  display: block;\n}\n#page-builder .column[disabled] .column__body .card-body {\n  overflow: hidden;\n}\n#page-builder .column[disabled] .column__body .card-body::after {\n  position: absolute;\n  top: 0;\n  left: 0;\n  content: "";\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.05) url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUU2RDMyMDk2REVCMTFFNjhDNjU5REU5QzRFMDdBQzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUU2RDMyMEE2REVCMTFFNjhDNjU5REU5QzRFMDdBQzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNTMyMzI3ODZEQ0YxMUU2OEM2NTlERTlDNEUwN0FDMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5RTZEMzIwODZERUIxMUU2OEM2NTlERTlDNEUwN0FDMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmlZh/wAAAMJSURBVHja7NnNiYUwGIbR1PFVIoooYv9rFf8txAsDMzBcrSBn4eqQZcC8T5rnOe77/vq2bYuiKILznD29YVmWMQxDcJ6zf12Qfd+jqqoYx/HxMOc5+b8LchxH1HUd0zQ9HuY8N/+7IOd5RtM0r/9knOfo6Rfbto1lWV4Pc56jp+u6ouu6WNf18TDnOXvq+/7n1f72YOE8Z092cM51EM51EM51EM51EM51EM51EM51EM51EM51EDs45zoI5zoI5zoI5zoI5zoI5zoI5zoI5zoI5zqIHZzrIHZwznUQznUQznUQznUQznUQznUQznUQznUQznUQOzjnOgjnOgjnOgjnOgjnOgjnOgjnOgjnOgjnOgjnOogdnHMdhHMdhHMdhHMdhHMdhHMdhHMdhHMdhHMdxA7OuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ5iB+dcB+FcB+FcB+FcB+FcB+FcB+FcB+FcB+FcB7GDc66DcK6DcK6DcK6DcK6DcK6DcK6DcK6DcK6DcK6D2ME510E410E410E410E410E410E410E410E410Hs4FwHsYNzroNwroNwroNwroNwroNwroNwroNwroNwroPYwTnXQTjXQTjXQTjXQTjXQTjXQTjXQTjXQTjXQezgXAexg3Oug3Cug3Cug3Cug3Cug3Cug3Cug3Cug3Cug9jBOddBONdBONdBONdBONdBONdBONdBONdBONdBONdB7OCc6yCc6yCc6yCc6yCc6yCc6yCc6yCc6yCc6yB2cM51EM51EM51EM51EM51EM51EM51EM51EM51EM51EDs45zoI5zoI5zoI5zoI5zoI5zoI5zoI5zoI5zqIHZxzHYRzHYRzHYRzHYRzHYRzHYRzHYRzHYRzHYRzHcQOzrkOwrkOwrkOwrkOwrkOwrkOwrkOwrkOwrkOYgfnOogdnHMdhHMdhHMdhHMdhHMdhHMdhHMdhHMdhHMdxA7OuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ5iB+c6iB2c8xf/CDAAMQipaEYspCcAAAAASUVORK5CYII=);\n}\n#page-builder .column__actions {\n  z-index: 3;\n}\n#page-builder .column__body .card-body {\n  position: relative;\n}\n#page-builder .column__addon {\n  margin-bottom: 0.5rem;\n}\n#page-builder .column__addon:last-of-type {\n  margin-bottom: 0;\n}\n#page-builder .column__addon-placeholder {\n  display: none;\n}\n#page-builder .column__addon-placeholder:only-child {\n  display: block;\n}\n#page-builder .c-addon-instance[disabled] {\n  position: relative;\n}\n#page-builder .c-addon-instance[disabled] .card-body {\n  overflow: hidden;\n}\n#page-builder .c-addon-instance[disabled] .card-body::after {\n  position: absolute;\n  top: 0;\n  left: 0;\n  content: "";\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.05) url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUU2RDMyMDk2REVCMTFFNjhDNjU5REU5QzRFMDdBQzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUU2RDMyMEE2REVCMTFFNjhDNjU5REU5QzRFMDdBQzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNTMyMzI3ODZEQ0YxMUU2OEM2NTlERTlDNEUwN0FDMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5RTZEMzIwODZERUIxMUU2OEM2NTlERTlDNEUwN0FDMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmlZh/wAAAMJSURBVHja7NnNiYUwGIbR1PFVIoooYv9rFf8txAsDMzBcrSBn4eqQZcC8T5rnOe77/vq2bYuiKILznD29YVmWMQxDcJ6zf12Qfd+jqqoYx/HxMOc5+b8LchxH1HUd0zQ9HuY8N/+7IOd5RtM0r/9knOfo6Rfbto1lWV4Pc56jp+u6ouu6WNf18TDnOXvq+/7n1f72YOE8Z092cM51EM51EM51EM51EM51EM51EM51EM51EM51EDs45zoI5zoI5zoI5zoI5zoI5zoI5zoI5zoI5zqIHZzrIHZwznUQznUQznUQznUQznUQznUQznUQznUQznUQOzjnOgjnOgjnOgjnOgjnOgjnOgjnOgjnOgjnOgjnOogdnHMdhHMdhHMdhHMdhHMdhHMdhHMdhHMdhHMdxA7OuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ5iB+dcB+FcB+FcB+FcB+FcB+FcB+FcB+FcB+FcB7GDc66DcK6DcK6DcK6DcK6DcK6DcK6DcK6DcK6DcK6D2ME510E410E410E410E410E410E410E410E410Hs4FwHsYNzroNwroNwroNwroNwroNwroNwroNwroNwroPYwTnXQTjXQTjXQTjXQTjXQTjXQTjXQTjXQTjXQezgXAexg3Oug3Cug3Cug3Cug3Cug3Cug3Cug3Cug3Cug9jBOddBONdBONdBONdBONdBONdBONdBONdBONdBONdB7OCc6yCc6yCc6yCc6yCc6yCc6yCc6yCc6yCc6yB2cM51EM51EM51EM51EM51EM51EM51EM51EM51EM51EDs45zoI5zoI5zoI5zoI5zoI5zoI5zoI5zoI5zqIHZxzHYRzHYRzHYRzHYRzHYRzHYRzHYRzHYRzHYRzHcQOzrkOwrkOwrkOwrkOwrkOwrkOwrkOwrkOwrkOYgfnOogdnHMdhHMdhHMdhHMdhHMdhHMdhHMdhHMdhHMdxA7OuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ7CuQ5iB+c6iB2c8xf/CDAAMQipaEYspCcAAAAASUVORK5CYII=);\n}\n#page-builder .c-addon-instance .card-body {\n  position: relative;\n}\n#page-builder .c-addon-instance__toolbar {\n  position: absolute;\n  top: 0.25rem;\n  right: 0.75rem;\n  z-index: 2;\n}\n#page-builder .c-addon-instance__toolbar .dropdown-menu {\n  z-index: 3;\n}\n\n.c-addon-list .c-addon__link {\n  border: 1px solid #ccc;\n}\n.c-addon-list .c-addon__link:hover {\n  text-decoration: none;\n  background-color: #eee;\n}\n\n.c-single-image-uploader {\n  border-radius: 3px;\n}\n.c-single-image-uploader--hover {\n  background-color: #f8f8f8;\n}\n\n.CodeMirror {\n  height: 450px !important;\n  font-size: 15px;\n}\n\n.form-group label:not(.btn) {\n  margin-bottom: 0.5rem;\n}';
const uri = useSystemUri();
const Tinymce = {
  async mounted(el) {
    const options = defaultsDeep(
      {},
      data("tinymce_options") || {},
      {
        license_key: "gpl",
        target: el,
        height: 500,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "pagebreak",
          "searchreplace",
          "wordcount",
          "visualblocks",
          "visualchars",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "nonbreaking",
          "save",
          "table",
          "directionality",
          "emoticons"
        ],
        toolbar: "bold italic strikethrough forecolor backcolor blockquote removeformat | styles fontsize | alignleft aligncenter alignright alignjustify bullist numlist outdent indent | link image media table code | fullscreen",
        toolbar_mode: "sliding",
        font_size_formats: "13px 14px 15px 16px 18px 20px 22px 28px 36px 48px",
        menubar: false,
        content_css: data("tinymce_content_css"),
        document_base_url: uri.root(),
        paste_data_images: true,
        remove_script_host: true,
        relative_urls: true,
        convert_urls: true,
        entity_encoding: "raw",
        table_header_type: "sectionCells",
        table_class_list: [
          { title: "BS Simple", value: "table" },
          { title: "BS Striped", value: "table table-striped" },
          { title: "BS Bordered", value: "table table-bordered" },
          { title: "BS Striped Bordered", value: "table table-striped table-bordered" },
          { title: "None", value: "" }
        ],
        images_upload_url: route("@file_upload"),
        setup: function(editor) {
          editor.on("change undo redo", (e) => {
            el.value = editor.getContent();
            el.dispatchEvent(new Event("change", { bubbles: true }));
            el.dispatchEvent(new Event("input", { bubbles: true }));
          });
          editor.on("input", (e) => {
            el.value = editor.getContent();
            el.dispatchEvent(new Event("input", { bubbles: true }));
          });
          editor.on("keydown", (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "s") {
              event.preventDefault();
              event.stopImmediatePropagation();
              el.dispatchEvent(
                new KeyboardEvent("keydown", {
                  bubbles: true,
                  metaKey: event.metaKey,
                  ctrlKey: event.ctrlKey,
                  key: "s",
                  code: "KeyS"
                })
              );
            }
          });
        }
      }
    );
    const { create } = await useTinymce();
    if (window.tinymce) {
      tinymce.get(el.id)?.remove();
    }
    await create(el, options);
  },
  async unmounted(el) {
  }
};
document.addEventListener("focusin", (e) => {
  if (e.target.closest(".mce-window, .tox-tinymce, .tox-tinymce-aux, .moxman-window, .tam-assetmanager-root") !== null) {
    e.stopImmediatePropagation();
  }
});
class BsTooltip {
  static install(app2) {
    app2.directive("tooltip", {
      mounted(el, { value }) {
        Tooltip.getOrCreateInstance(el, value || {});
      },
      updated(el, { value }) {
        const inc = Tooltip.getOrCreateInstance(el, value || {});
        inc.update();
      },
      beforeUnmount(el) {
        const inc = Tooltip.getOrCreateInstance(el);
        inc.dispose();
      }
    });
  }
}
injectCssToDocument(css);
useCssImport("@vue-animate");
const u = useUnicorn();
const addons = data("addons") || [];
const app = createApp(PageBuilderApp, {
  name: "PageBuilder"
});
app.config.globalProperties.$debug = isDebug();
app.config.globalProperties.$trigger = u.trigger.bind(u);
app.config.globalProperties.addonProp = (prop, type) => {
  return addons[type][prop];
};
app.directive("tinymce", Tinymce);
app.use(BsTooltip);
app.component("addon-text", defineAsyncComponent(() => import("./addon-text.js")));
app.component("addon-image", defineAsyncComponent(() => import("./addon-image.js")));
app.component("addon-feature", defineAsyncComponent(() => import("./addon-feature.js")));
app.component("addon-emptyspace", defineAsyncComponent(() => import("./addon-emptyspace.js")));
app.component("addon-button", defineAsyncComponent(() => import("./addon-button.js")));
for (const k in addons) {
  const addon = addons[k];
  if (addon.componentModuleUrl) {
    useImport(addon.componentModuleUrl).then((module) => {
      app.component(addon.componentName, module.default(app));
    });
  }
}
app.provide("addons", addons);
u.trigger("page-builder.app.prepared", app);
app.provide("app", app);
await domready();
app.mount("page-builder-app");
const pageBuilder = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
export {
  getDefaultExportFromCjs as g,
  pageBuilder as p
};
//# sourceMappingURL=page-builder.js.map
