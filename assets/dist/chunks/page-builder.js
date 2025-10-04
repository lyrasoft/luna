import { uid, injectCssToDocument, route, useSystemUri, useHttpClient, simpleAlert as simpleAlert$1, useUnicorn, deleteConfirm, data, selectAll, useCssImport, isDebug, useImport, domready } from "@windwalker-io/unicorn-next";
import require$$0, { defineComponent, useSlots, ref, watch, onMounted, createBlock, openBlock, Teleport, createElementVNode, mergeProps, normalizeClass, createElementBlock, createCommentVNode, Fragment, renderSlot, toDisplayString, mergeModels, useModel, withDirectives, renderList, vModelSelect, vModelText, reactive, createSlots, withCtx, vModelRadio, onBeforeUnmount, createVNode, normalizeStyle, computed, resolveComponent, resolveDirective, customRef, getCurrentInstance, onUpdated, createTextVNode, withModifiers, nextTick, resolveDynamicComponent, Transition, useTemplateRef, TransitionGroup, inject, createApp, defineAsyncComponent } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import { Modal } from "bootstrap";
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var vueSlideBar_min$1 = { exports: {} };
/*!
 * vue-slide-bar v1.2.0
 * (c) 2018-present biig_pongsatorn <biig_pongsatorn@hotmail.com>
 * Released under the MIT License.
 */
var vueSlideBar_min = vueSlideBar_min$1.exports;
var hasRequiredVueSlideBar_min;
function requireVueSlideBar_min() {
  if (hasRequiredVueSlideBar_min) return vueSlideBar_min$1.exports;
  hasRequiredVueSlideBar_min = 1;
  (function(module2, exports2) {
    !(function(t, e) {
      module2.exports = e();
    })(vueSlideBar_min, function() {
      function t(t2, e2, i2) {
        return e2 in t2 ? Object.defineProperty(t2, e2, { value: i2, enumerable: true, configurable: true, writable: true }) : t2[e2] = i2, t2;
      }
      function e(e2) {
        for (var i2 = 1; i2 < arguments.length; i2++) {
          var n2 = null != arguments[i2] ? arguments[i2] : {}, s2 = Object.keys(n2);
          "function" == typeof Object.getOwnPropertySymbols && (s2 = s2.concat(Object.getOwnPropertySymbols(n2).filter(function(t2) {
            return Object.getOwnPropertyDescriptor(n2, t2).enumerable;
          }))), s2.forEach(function(i3) {
            t(e2, i3, n2[i3]);
          });
        }
        return e2;
      }
      var i = { name: "vue-slide-bar", data: function() {
        return { flag: false, size: 0, currentValue: 0, currentSlider: 0, isComponentExists: true, interval: 1, lazy: false, realTime: false, dataLabelStyles: e({ color: "#4a4a4a", "font-family": "Arial, sans-serif", "font-size": "12px" }, this.$props.labelStyles) };
      }, props: { data: { type: Array, default: null }, id: { type: String, default: "wrap" }, range: { type: Array, default: null }, speed: { type: Number, default: 0.5 }, lineHeight: { type: Number, default: 5 }, iconWidth: { type: Number, default: 20 }, value: { type: [String, Number], default: 0 }, min: { type: Number, default: 0 }, max: { type: Number, default: 100 }, showTooltip: { type: Boolean, default: true }, isDisabled: { type: Boolean, default: false }, draggable: { type: Boolean, default: true }, paddingless: { type: Boolean, default: false }, tooltipStyles: Object, labelStyles: Object, processStyle: Object }, computed: { slider: function() {
        return this.$refs.tooltip;
      }, val: { get: function() {
        return this.data ? this.data[this.currentValue] : this.currentValue;
      }, set: function(t2) {
        if (this.data) {
          var e2 = this.data.indexOf(t2);
          e2 > -1 && (this.currentValue = e2);
        } else this.currentValue = t2;
      } }, currentIndex: function() {
        return (this.currentValue - this.minimum) / this.spacing;
      }, indexRange: function() {
        return [0, this.currentIndex];
      }, minimum: function() {
        return this.data ? 0 : this.min;
      }, maximum: function() {
        return this.data ? this.data.length - 1 : this.max;
      }, multiple: function() {
        var t2 = "".concat(this.interval).split(".")[1];
        return t2 ? Math.pow(10, t2.length) : 1;
      }, spacing: function() {
        return this.data ? 1 : this.interval;
      }, total: function() {
        return this.data ? this.data.length - 1 : (Math.floor((this.maximum - this.minimum) * this.multiple) % (this.interval * this.multiple) != 0 && this.printError("[VueSlideBar error]: Prop[interval] is illegal, Please make sure that the interval can be divisible"), (this.maximum - this.minimum) / this.interval);
      }, gap: function() {
        return this.size / this.total;
      }, position: function() {
        return (this.currentValue - this.minimum) / this.spacing * this.gap;
      }, limit: function() {
        return [0, this.size];
      }, valueLimit: function() {
        return [this.minimum, this.maximum];
      }, calculateHeight: function() {
        return this.paddingless ? {} : { "padding-top": "40px", "min-height": this.range ? "100px" : null };
      } }, watch: { value: function(t2) {
        this.flag ? this.setValue(t2) : this.setValue(t2, this.speed);
      }, max: function(t2) {
        if (t2 < this.min) return this.printError("[VueSlideBar error]: The maximum value can not be less than the minimum value.");
        var e2 = this.limitValue(this.val);
        this.setValue(e2), this.refresh();
      }, min: function(t2) {
        if (t2 > this.max) return this.printError("[VueSlideBar error]: The minimum value can not be greater than the maximum value.");
        var e2 = this.limitValue(this.val);
        this.setValue(e2), this.refresh();
      } }, methods: { bindEvents: function() {
        document.addEventListener("touchmove", this.moving, { passive: false }), document.addEventListener("touchend", this.moveEnd, { passive: false }), document.addEventListener("mousemove", this.moving), document.addEventListener("mouseup", this.moveEnd), document.addEventListener("mouseleave", this.moveEnd), window.addEventListener("resize", this.refresh);
      }, unbindEvents: function() {
        window.removeEventListener("resize", this.refresh), document.removeEventListener("touchmove", this.moving), document.removeEventListener("touchend", this.moveEnd), document.removeEventListener("mousemove", this.moving), document.removeEventListener("mouseup", this.moveEnd), document.removeEventListener("mouseleave", this.moveEnd);
      }, getPos: function(t2) {
        return this.realTime && this.getStaticData(), t2.clientX - this.offset;
      }, wrapClick: function(t2) {
        if (this.isDisabled || !this.draggable && t2.target.id === this.id) return false;
        var e2 = this.getPos(t2);
        this.setValueOnPos(e2);
      }, moveStart: function(t2, e2) {
        if (!this.draggable) return false;
        this.flag = true, this.$emit("dragStart", this);
      }, moving: function(t2) {
        if (!this.flag || !this.draggable) return false;
        t2.preventDefault(), t2.targetTouches && t2.targetTouches[0] && (t2 = t2.targetTouches[0]), this.setValueOnPos(this.getPos(t2), true);
      }, moveEnd: function(t2) {
        if (!this.flag || !this.draggable) return false;
        this.$emit("dragEnd", this), this.lazy && this.isDiff(this.val, this.value) && this.syncValue(), this.flag = false, this.setPosition();
      }, setValueOnPos: function(t2, e2) {
        var i2 = this.limit, n2 = this.valueLimit;
        if (t2 >= i2[0] && t2 <= i2[1]) {
          this.setTransform(t2);
          var s2 = (Math.round(t2 / this.gap) * (this.spacing * this.multiple) + this.minimum * this.multiple) / this.multiple;
          this.setCurrentValue(s2, e2);
        } else t2 < i2[0] ? (this.setTransform(i2[0]), this.setCurrentValue(n2[0]), 1 === this.currentSlider && (this.currentSlider = 0)) : (this.setTransform(i2[1]), this.setCurrentValue(n2[1]), 0 === this.currentSlider && (this.currentSlider = 1));
      }, isDiff: function(t2, e2) {
        return Object.prototype.toString.call(t2) !== Object.prototype.toString.call(e2) || (Array.isArray(t2) && t2.length === e2.length ? t2.some(function(t3, i2) {
          return t3 !== e2[i2];
        }) : t2 !== e2);
      }, setCurrentValue: function(t2, e2) {
        if (t2 < this.minimum || t2 > this.maximum) return false;
        this.isDiff(this.currentValue, t2) && (this.currentValue = t2, this.lazy && this.flag || this.syncValue()), e2 || this.setPosition();
      }, setIndex: function(t2) {
        t2 = this.spacing * t2 + this.minimum, this.setCurrentValue(t2);
      }, setValue: function(t2, e2) {
        var i2 = this;
        if (this.isDiff(this.val, t2)) {
          var n2 = this.limitValue(t2);
          this.val = n2, this.syncValue();
        }
        this.$nextTick(function() {
          return i2.setPosition(e2);
        });
      }, setPosition: function(t2) {
        this.flag ? this.setTransitionTime(0) : this.setTransitionTime(void 0 === t2 ? this.speed : t2), this.setTransform(this.position);
      }, setTransform: function(t2) {
        var e2 = t2 - (this.$refs.tooltip.scrollWidth - 2) / 2, i2 = "translateX(".concat(e2, "px)");
        this.slider.style.transform = i2, this.slider.style.WebkitTransform = i2, this.slider.style.msTransform = i2, this.$refs.process.style.width = "".concat(t2, "px"), this.$refs.process.style.left = 0;
      }, setTransitionTime: function(t2) {
        this.slider.style.transitionDuration = "".concat(t2, "s"), this.slider.style.WebkitTransitionDuration = "".concat(t2, "s"), this.$refs.process.style.transitionDuration = "".concat(t2, "s"), this.$refs.process.style.WebkitTransitionDuration = "".concat(t2, "s");
      }, limitValue: function(t2) {
        var e2 = this;
        if (this.data) return t2;
        var i2;
        return (i2 = t2) < e2.min ? (e2.printError("[VueSlideBar warn]: The value of the slider is ".concat(t2, ", the minimum value is ").concat(e2.min, ", the value of this slider can not be less than the minimum value")), e2.min) : i2 > e2.max ? (e2.printError("[VueSlideBar warn]: The value of the slider is ".concat(t2, ", the maximum value is ").concat(e2.max, ", the value of this slider can not be greater than the maximum value")), e2.max) : i2;
      }, syncValue: function() {
        var t2 = this.val;
        this.range && this.$emit("callbackRange", this.range[this.currentIndex]), this.$emit("input", t2);
      }, getValue: function() {
        return this.val;
      }, getIndex: function() {
        return this.currentIndex;
      }, getStaticData: function() {
        this.$refs.elem && (this.size = this.$refs.elem.offsetWidth, this.offset = this.$refs.elem.getBoundingClientRect().left);
      }, refresh: function() {
        this.$refs.elem && (this.getStaticData(), this.setPosition());
      }, printError: function(t2) {
        console.error(t2);
      } }, mounted: function() {
        var t2 = this;
        if (this.isComponentExists = true, "undefined" == typeof window || "undefined" == typeof document) return this.printError("[VueSlideBar error]: window or document is undefined, can not be initialization.");
        this.$nextTick(function() {
          t2.isComponentExists && (t2.getStaticData(), t2.setValue(t2.limitValue(t2.value), 0), t2.bindEvents());
        });
      }, beforeDestroy: function() {
        this.isComponentExists = false, this.unbindEvents();
      } };
      const n = "undefined" != typeof navigator && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
      const s = document.head || document.getElementsByTagName("head")[0], r = {};
      const a = i;
      i.__file = "index.vue";
      return (function(t2, e2, i2, n2, s2, r2, a2, o, l, u2) {
        "function" == typeof a2 && (o = a2, a2 = false);
        const d = "function" == typeof i2 ? i2.options : i2;
        let h;
        if (t2 && t2.render && (d.render = t2.render, d.staticRenderFns = t2.staticRenderFns, d._compiled = true, s2), d._scopeId = n2, e2 && (h = a2 ? function() {
          e2.call(this, u2(this.$root.$options.shadowRoot));
        } : function(t3) {
          e2.call(this, o(t3));
        }), h) if (d.functional) {
          const t3 = d.render;
          d.render = function(e3, i3) {
            return h.call(i3), t3(e3, i3);
          };
        } else {
          const t3 = d.beforeCreate;
          d.beforeCreate = t3 ? [].concat(t3, h) : [h];
        }
        return i2;
      })({ render: function() {
        var t2 = this, e2 = t2.$createElement, i2 = t2._self._c || e2;
        return i2("div", { ref: "wrap", staticClass: "vue-slide-bar-component vue-slide-bar-horizontal", style: t2.calculateHeight, attrs: { id: t2.id }, on: { click: t2.wrapClick } }, [i2("div", { ref: "elem", staticClass: "vue-slide-bar", style: { height: t2.lineHeight + "px" } }, [[i2("div", { ref: "tooltip", staticClass: "vue-slide-bar-always vue-slide-bar-tooltip-container", style: { width: t2.iconWidth + "px" }, on: { mousedown: t2.moveStart, touchstart: t2.moveStart } }, [t2.showTooltip ? i2("span", { staticClass: "vue-slide-bar-tooltip-top vue-slide-bar-tooltip-wrap" }, [t2._t("tooltip", [i2("span", { staticClass: "vue-slide-bar-tooltip", style: t2.tooltipStyles }, [t2._v("\n              " + t2._s(t2.val) + "\n            ")])])], 2) : t2._e()])], t2._v(" "), i2("div", { ref: "process", staticClass: "vue-slide-bar-process", style: t2.processStyle })], 2), t2._v(" "), t2.range ? i2("div", { staticClass: "vue-slide-bar-range" }, t2._l(t2.range, function(e3, n2) {
          return i2("div", { key: n2, staticClass: "vue-slide-bar-separate", style: t2.dataLabelStyles }, [e3.isHide ? t2._e() : i2("span", { staticClass: "vue-slide-bar-separate-text" }, [t2._v("\n        " + t2._s(e3.label) + "\n      ")])]);
        }), 0) : t2._e()]);
      }, staticRenderFns: [] }, function(t2) {
        t2 && t2("data-v-d3e7b39a_0", { source: ".vue-slide-bar-component[data-v-d3e7b39a]{position:relative;box-sizing:border-box;user-select:none}.vue-slide-bar[data-v-d3e7b39a]{position:relative;display:block;border-radius:15px;background-color:#d8d8d8;cursor:pointer}.vue-slide-bar[data-v-d3e7b39a]::after{content:'';position:absolute;left:0;top:0;width:100%;height:100%;z-index:2}.vue-slide-bar-process[data-v-d3e7b39a]{position:absolute;border-radius:15px;background-color:#1066fd;transition:all 0s;z-index:1;width:0;height:100%;top:0;left:0;will-change:width}.vue-slide-bar-tooltip-container[data-v-d3e7b39a]{position:absolute;transition:all 0s;will-change:transform;cursor:pointer;z-index:3;left:0;top:-16px}.vue-slide-bar-tooltip-wrap[data-v-d3e7b39a]{position:absolute;z-index:9;width:100%;height:100%;display:block!important}.vue-slide-bar-tooltip-top[data-v-d3e7b39a]{top:-12px;left:40%;transform:translate(-50%,-100%)}.vue-slide-bar-tooltip[data-v-d3e7b39a]{position:relative;font-size:14px;white-space:nowrap;padding:2px 5px;min-width:20px;text-align:center;color:#fff;border-radius:5px;border:1px solid #1066fd;background-color:#1066fd}.vue-slide-bar-tooltip[data-v-d3e7b39a]::before{content:'';position:absolute;bottom:-10px;left:50%;width:0;height:0;border:5px solid transparent;border-top-color:inherit;transform:translate(-50%,0)}.vue-slide-bar-range[data-v-d3e7b39a]{display:flex;padding:5px 0;justify-content:space-between}.vue-slide-bar-separate[data-v-d3e7b39a]{position:relative;width:2px;background-color:#9e9e9e;height:5px;cursor:pointer}.vue-slide-bar-separate-text[data-v-d3e7b39a]{text-align:center;position:absolute;white-space:nowrap;transform:translate(-50%,0);top:6px}", map: void 0, media: void 0 });
      }, a, "data-v-d3e7b39a", false, void 0, function(t2) {
        return (t3, e2) => (function(t4, e3) {
          const i2 = n ? e3.media || "default" : t4, a2 = r[i2] || (r[i2] = { ids: /* @__PURE__ */ new Set(), styles: [] });
          if (!a2.ids.has(t4)) {
            a2.ids.add(t4);
            let i3 = e3.source;
            if (e3.map && (i3 += "\n/*# sourceURL=" + e3.map.sources[0] + " */", i3 += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(e3.map)))) + " */"), a2.element || (a2.element = document.createElement("style"), a2.element.type = "text/css", e3.media && a2.element.setAttribute("media", e3.media), s.appendChild(a2.element)), "styleSheet" in a2.element) a2.styles.push(i3), a2.element.styleSheet.cssText = a2.styles.filter(Boolean).join("\n");
            else {
              const t5 = a2.ids.size - 1, e4 = document.createTextNode(i3), n2 = a2.element.childNodes;
              n2[t5] && a2.element.removeChild(n2[t5]), n2.length ? a2.element.insertBefore(e4, n2[t5]) : a2.element.appendChild(e4);
            }
          }
        })(t3, e2);
      }, void 0);
    });
  })(vueSlideBar_min$1);
  return vueSlideBar_min$1.exports;
}
var vueSlideBar_minExports = requireVueSlideBar_min();
const VueSlideBar = /* @__PURE__ */ getDefaultExportFromCjs(vueSlideBar_minExports);
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
var Symbol$1 = root.Symbol;
var objectProto$b = Object.prototype;
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
var nativeObjectToString$1 = objectProto$b.toString;
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$9.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$a = Object.prototype;
var nativeObjectToString = objectProto$a.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var symbolTag = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
}
function arrayMap(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var isArray = Array.isArray;
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray(value)) {
    return arrayMap(value, baseToString) + "";
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -Infinity ? "-0" : result;
}
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var INFINITY = 1 / 0, MAX_INTEGER = 17976931348623157e292;
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}
function toInteger(value) {
  var result = toFinite(value), remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}
function identity(value) {
  return value;
}
var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root["__core-js_shared__"];
var maskSrcKey = (function() {
  var uid2 = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid2 ? "Symbol(src)_1." + uid2 : "";
})();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$2 = Function.prototype;
var funcToString$2 = funcProto$2.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto$1 = Function.prototype, objectProto$9 = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$8 = objectProto$9.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString$1.call(hasOwnProperty$8).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var objectCreate = Object.create;
var baseCreate = /* @__PURE__ */ (function() {
  function object() {
  }
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
})();
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
function constant(value) {
  return function() {
    return value;
  };
}
var defineProperty = (function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
})();
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
var setToString = shortOut(baseSetToString);
function arrayEach(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty) {
    defineProperty(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var objectProto$8 = Object.prototype;
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$7.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}
var nativeMax$1 = Math.max;
function overRest(func, start, transform) {
  start = nativeMax$1(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax$1(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + "");
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
    return eq(object[index], value);
  }
  return false;
}
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
var objectProto$7 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$7;
  return value === proto;
}
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var argsTag$1 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$1;
}
var objectProto$6 = Object.prototype;
var hasOwnProperty$6 = objectProto$6.hasOwnProperty;
var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;
var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
  return arguments;
})()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$6.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
function stubFalse() {
  return false;
}
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
var Buffer$1 = moduleExports$2 ? root.Buffer : void 0;
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag$1 = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var freeProcess = moduleExports$1 && freeGlobal.process;
var nodeUtil = (function() {
  try {
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
})();
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
var objectProto$5 = Object.prototype;
var hasOwnProperty$5 = objectProto$5.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys = overArg(Object.keys, Object);
var objectProto$4 = Object.prototype;
var hasOwnProperty$4 = objectProto$4.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$4.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var objectProto$3 = Object.prototype;
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$3.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var nativeCreate = getNative(Object, "create");
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$2 = Object.prototype;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
function hashGet(key) {
  var data2 = this.__data__;
  if (nativeCreate) {
    var result = data2[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$2.call(data2, key) ? data2[key] : void 0;
}
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function hashHas(key) {
  var data2 = this.__data__;
  return nativeCreate ? data2[key] !== void 0 : hasOwnProperty$1.call(data2, key);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data2 = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data2[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data2 = this.__data__, index = assocIndexOf(data2, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data2.length - 1;
  if (index == lastIndex) {
    data2.pop();
  } else {
    splice.call(data2, index, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data2 = this.__data__, index = assocIndexOf(data2, key);
  return index < 0 ? void 0 : data2[index][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data2 = this.__data__, index = assocIndexOf(data2, key);
  if (index < 0) {
    ++this.size;
    data2.push([key, value]);
  } else {
    data2[index][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map = getNative(root, "Map");
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map, key) {
  var data2 = map.__data__;
  return isKeyable(key) ? data2[typeof key == "string" ? "string" : "hash"] : data2.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data2 = getMapData(this, key), size = data2.size;
  data2.set(key, value);
  this.size += data2.size == size ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
function toString(value) {
  return value == null ? "" : baseToString(value);
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
var objectTag = "[object Object]";
var funcProto = Function.prototype, objectProto = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty = objectProto.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
function baseClamp(number, lower, upper) {
  if (number === number) {
    if (upper !== void 0) {
      number = number <= upper ? number : upper;
    }
    {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data2 = this.__data__, result = data2["delete"](key);
  this.size = data2.size;
  return result;
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data2 = this.__data__;
  if (data2 instanceof ListCache) {
    var pairs = data2.__data__;
    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data2.size;
      return this;
    }
    data2 = this.__data__ = new MapCache(pairs);
  }
  data2.set(key, value);
  this.size = data2.size;
  return this;
}
function Stack(entries) {
  var data2 = this.__data__ = new ListCache(entries);
  this.size = data2.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? root.Buffer : void 0;
Buffer ? Buffer.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  {
    return buffer.slice();
  }
}
var Uint8Array = root.Uint8Array;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}
function cloneTypedArray(typedArray, isDeep) {
  var buffer = cloneArrayBuffer(typedArray.buffer);
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var baseFor = createBaseFor();
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
function assignMergeValue(object, key, value) {
  if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}
function safeGet(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  assignMergeValue(object, key, newValue);
}
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack());
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}
function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
  if (isObject(objValue) && isObject(srcValue)) {
    stack.set(srcValue, objValue);
    baseMerge(objValue, srcValue, void 0, customDefaultsMerge, stack);
    stack["delete"](srcValue);
  }
  return objValue;
}
var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
  baseMerge(object, source, srcIndex, customizer);
});
var defaultsDeep = baseRest(function(args) {
  args.push(void 0, customDefaultsMerge);
  return apply(mergeWith, void 0, args);
});
function castFunction(value) {
  return typeof value == "function" ? value : identity;
}
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, castFunction(iteratee));
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
function startsWith(string, target, position) {
  string = toString(string);
  position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
  target = baseToString(target);
  return string.slice(position, position + target.length) == target;
}
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "BsModal",
  props: {
    id: {},
    open: { type: Boolean, default: false },
    size: {},
    title: {},
    backdrop: { type: [String, Boolean], default: true }
  },
  emits: ["show", "shown", "hide", "hidden"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const modal = ref();
    const idName = ref(props.id || "modal-" + uid());
    const visible = ref(props.open);
    watch(visible, (v, oldValue) => {
      if (!oldValue && v) {
        getModalInstance().show();
      }
      if (oldValue && !v) {
        getModalInstance().hide();
      }
    });
    watch(() => props.open, (v) => {
      visible.value = v;
    });
    watch(() => props.id, (val) => {
      idName.value = val || "modal-" + uid();
    });
    onMounted(() => {
      if (!modal.value) {
        return;
      }
      modal.value.addEventListener("show.bs.modal", (e) => {
        emits("show", e);
      });
      modal.value.addEventListener("shown.bs.modal", (e) => {
        emits("shown", e);
      });
      modal.value.addEventListener("hide.bs.modal", (e) => {
        emits("hide", e);
      });
      modal.value.addEventListener("hidden.bs.modal", (e) => {
        emits("hidden", e);
      });
    });
    function getModalInstance() {
      return Modal.getOrCreateInstance(modal.value);
    }
    function hasSlots(name) {
      return !!slots[name];
    }
    const __returned__ = { props, emits, slots, modal, idName, visible, getModalInstance, hasSlots };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1$h = ["id", "aria-labelledby", "aria-hidden", "data-bs-backdrop"];
const _hoisted_2$f = { class: "modal-content" };
const _hoisted_3$d = {
  key: 1,
  class: "modal-header"
};
const _hoisted_4$b = ["id"];
const _hoisted_5$b = {
  key: 1,
  class: "modal-body"
};
const _hoisted_6$b = {
  key: 2,
  class: "modal-footer"
};
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Teleport, { to: "body" }, [
    createElementVNode("div", mergeProps({
      ref: "modal",
      class: "modal fade",
      id: $setup.idName
    }, _ctx.$attrs, {
      tabindex: "-1",
      role: "dialog",
      "aria-labelledby": $setup.idName + "-label",
      "aria-hidden": $setup.visible ? "true" : "false",
      "data-bs-backdrop": $props.backdrop
    }), [
      createElementVNode("div", {
        class: normalizeClass(["modal-dialog", $props.size ? "modal-" + $props.size : null]),
        role: "document"
      }, [
        createElementVNode("div", _hoisted_2$f, [
          $setup.visible ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            $setup.hasSlots("header-element") ? renderSlot(_ctx.$slots, "header-element", { key: 0 }) : (openBlock(), createElementBlock("div", _hoisted_3$d, [
              renderSlot(_ctx.$slots, "header", {}, () => [
                createElementVNode("div", {
                  class: "modal-title",
                  id: $setup.idName + "-label"
                }, [
                  createElementVNode("h4", null, toDisplayString($props.title), 1)
                ], 8, _hoisted_4$b)
              ]),
              _cache[0] || (_cache[0] = createElementVNode("button", {
                type: "button",
                class: "close btn-close",
                "data-bs-dismiss": "modal",
                "data-dismiss": "modal",
                "aria-label": "Close"
              }, [
                createElementVNode("span", {
                  "aria-hidden": "true",
                  class: "visually-hidden"
                }, "×")
              ], -1))
            ]))
          ], 64)) : createCommentVNode("", true),
          $setup.visible ? (openBlock(), createElementBlock("div", _hoisted_5$b, [
            renderSlot(_ctx.$slots, "default")
          ])) : createCommentVNode("", true),
          $setup.visible && $setup.hasSlots("footer") ? (openBlock(), createElementBlock("div", _hoisted_6$b, [
            renderSlot(_ctx.$slots, "footer")
          ])) : createCommentVNode("", true)
        ])
      ], 2)
    ], 16, _hoisted_1$h)
  ]);
}
const BsModal = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h], ["__file", "BsModal.vue"]]);
var codemirror$1 = { exports: {} };
var codemirror = codemirror$1.exports;
var hasRequiredCodemirror;
function requireCodemirror() {
  if (hasRequiredCodemirror) return codemirror$1.exports;
  hasRequiredCodemirror = 1;
  (function(module2, exports2) {
    (function(global2, factory) {
      module2.exports = factory();
    })(codemirror, (function() {
      var userAgent = navigator.userAgent;
      var platform = navigator.platform;
      var gecko = /gecko\/\d/i.test(userAgent);
      var ie_upto10 = /MSIE \d/.test(userAgent);
      var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(userAgent);
      var edge = /Edge\/(\d+)/.exec(userAgent);
      var ie = ie_upto10 || ie_11up || edge;
      var ie_version = ie && (ie_upto10 ? document.documentMode || 6 : +(edge || ie_11up)[1]);
      var webkit = !edge && /WebKit\//.test(userAgent);
      var qtwebkit = webkit && /Qt\/\d+\.\d+/.test(userAgent);
      var chrome = !edge && /Chrome\/(\d+)/.exec(userAgent);
      var chrome_version = chrome && +chrome[1];
      var presto = /Opera\//.test(userAgent);
      var safari = /Apple Computer/.test(navigator.vendor);
      var mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(userAgent);
      var phantom = /PhantomJS/.test(userAgent);
      var ios = safari && (/Mobile\/\w+/.test(userAgent) || navigator.maxTouchPoints > 2);
      var android = /Android/.test(userAgent);
      var mobile = ios || android || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(userAgent);
      var mac = ios || /Mac/.test(platform);
      var chromeOS = /\bCrOS\b/.test(userAgent);
      var windows = /win/i.test(platform);
      var presto_version = presto && userAgent.match(/Version\/(\d*\.\d*)/);
      if (presto_version) {
        presto_version = Number(presto_version[1]);
      }
      if (presto_version && presto_version >= 15) {
        presto = false;
        webkit = true;
      }
      var flipCtrlCmd = mac && (qtwebkit || presto && (presto_version == null || presto_version < 12.11));
      var captureRightClick = gecko || ie && ie_version >= 9;
      function classTest(cls) {
        return new RegExp("(^|\\s)" + cls + "(?:$|\\s)\\s*");
      }
      var rmClass = function(node, cls) {
        var current = node.className;
        var match = classTest(cls).exec(current);
        if (match) {
          var after = current.slice(match.index + match[0].length);
          node.className = current.slice(0, match.index) + (after ? match[1] + after : "");
        }
      };
      function removeChildren(e) {
        for (var count = e.childNodes.length; count > 0; --count) {
          e.removeChild(e.firstChild);
        }
        return e;
      }
      function removeChildrenAndAdd(parent, e) {
        return removeChildren(parent).appendChild(e);
      }
      function elt(tag, content, className, style) {
        var e = document.createElement(tag);
        if (className) {
          e.className = className;
        }
        if (style) {
          e.style.cssText = style;
        }
        if (typeof content == "string") {
          e.appendChild(document.createTextNode(content));
        } else if (content) {
          for (var i2 = 0; i2 < content.length; ++i2) {
            e.appendChild(content[i2]);
          }
        }
        return e;
      }
      function eltP(tag, content, className, style) {
        var e = elt(tag, content, className, style);
        e.setAttribute("role", "presentation");
        return e;
      }
      var range2;
      if (document.createRange) {
        range2 = function(node, start, end, endNode) {
          var r = document.createRange();
          r.setEnd(endNode || node, end);
          r.setStart(node, start);
          return r;
        };
      } else {
        range2 = function(node, start, end) {
          var r = document.body.createTextRange();
          try {
            r.moveToElementText(node.parentNode);
          } catch (e) {
            return r;
          }
          r.collapse(true);
          r.moveEnd("character", end);
          r.moveStart("character", start);
          return r;
        };
      }
      function contains(parent, child) {
        if (child.nodeType == 3) {
          child = child.parentNode;
        }
        if (parent.contains) {
          return parent.contains(child);
        }
        do {
          if (child.nodeType == 11) {
            child = child.host;
          }
          if (child == parent) {
            return true;
          }
        } while (child = child.parentNode);
      }
      function activeElt(rootNode2) {
        var doc2 = rootNode2.ownerDocument || rootNode2;
        var activeElement;
        try {
          activeElement = rootNode2.activeElement;
        } catch (e) {
          activeElement = doc2.body || null;
        }
        while (activeElement && activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
          activeElement = activeElement.shadowRoot.activeElement;
        }
        return activeElement;
      }
      function addClass2(node, cls) {
        var current = node.className;
        if (!classTest(cls).test(current)) {
          node.className += (current ? " " : "") + cls;
        }
      }
      function joinClasses(a, b) {
        var as = a.split(" ");
        for (var i2 = 0; i2 < as.length; i2++) {
          if (as[i2] && !classTest(as[i2]).test(b)) {
            b += " " + as[i2];
          }
        }
        return b;
      }
      var selectInput = function(node) {
        node.select();
      };
      if (ios) {
        selectInput = function(node) {
          node.selectionStart = 0;
          node.selectionEnd = node.value.length;
        };
      } else if (ie) {
        selectInput = function(node) {
          try {
            node.select();
          } catch (_e) {
          }
        };
      }
      function doc(cm) {
        return cm.display.wrapper.ownerDocument;
      }
      function root2(cm) {
        return rootNode(cm.display.wrapper);
      }
      function rootNode(element) {
        return element.getRootNode ? element.getRootNode() : element.ownerDocument;
      }
      function win(cm) {
        return doc(cm).defaultView;
      }
      function bind2(f) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function() {
          return f.apply(null, args);
        };
      }
      function copyObj(obj, target, overwrite) {
        if (!target) {
          target = {};
        }
        for (var prop2 in obj) {
          if (obj.hasOwnProperty(prop2) && (overwrite !== false || !target.hasOwnProperty(prop2))) {
            target[prop2] = obj[prop2];
          }
        }
        return target;
      }
      function countColumn(string, end, tabSize, startIndex, startValue) {
        if (end == null) {
          end = string.search(/[^\s\u00a0]/);
          if (end == -1) {
            end = string.length;
          }
        }
        for (var i2 = startIndex || 0, n = startValue || 0; ; ) {
          var nextTab = string.indexOf("	", i2);
          if (nextTab < 0 || nextTab >= end) {
            return n + (end - i2);
          }
          n += nextTab - i2;
          n += tabSize - n % tabSize;
          i2 = nextTab + 1;
        }
      }
      var Delayed = function() {
        this.id = null;
        this.f = null;
        this.time = 0;
        this.handler = bind2(this.onTimeout, this);
      };
      Delayed.prototype.onTimeout = function(self2) {
        self2.id = 0;
        if (self2.time <= +/* @__PURE__ */ new Date()) {
          self2.f();
        } else {
          setTimeout(self2.handler, self2.time - +/* @__PURE__ */ new Date());
        }
      };
      Delayed.prototype.set = function(ms, f) {
        this.f = f;
        var time = +/* @__PURE__ */ new Date() + ms;
        if (!this.id || time < this.time) {
          clearTimeout(this.id);
          this.id = setTimeout(this.handler, ms);
          this.time = time;
        }
      };
      function indexOf(array, elt2) {
        for (var i2 = 0; i2 < array.length; ++i2) {
          if (array[i2] == elt2) {
            return i2;
          }
        }
        return -1;
      }
      var scrollerGap = 50;
      var Pass = { toString: function() {
        return "CodeMirror.Pass";
      } };
      var sel_dontScroll = { scroll: false }, sel_mouse = { origin: "*mouse" }, sel_move = { origin: "+move" };
      function findColumn(string, goal, tabSize) {
        for (var pos = 0, col = 0; ; ) {
          var nextTab = string.indexOf("	", pos);
          if (nextTab == -1) {
            nextTab = string.length;
          }
          var skipped = nextTab - pos;
          if (nextTab == string.length || col + skipped >= goal) {
            return pos + Math.min(skipped, goal - col);
          }
          col += nextTab - pos;
          col += tabSize - col % tabSize;
          pos = nextTab + 1;
          if (col >= goal) {
            return pos;
          }
        }
      }
      var spaceStrs = [""];
      function spaceStr(n) {
        while (spaceStrs.length <= n) {
          spaceStrs.push(lst(spaceStrs) + " ");
        }
        return spaceStrs[n];
      }
      function lst(arr) {
        return arr[arr.length - 1];
      }
      function map(array, f) {
        var out = [];
        for (var i2 = 0; i2 < array.length; i2++) {
          out[i2] = f(array[i2], i2);
        }
        return out;
      }
      function insertSorted(array, value, score) {
        var pos = 0, priority = score(value);
        while (pos < array.length && score(array[pos]) <= priority) {
          pos++;
        }
        array.splice(pos, 0, value);
      }
      function nothing() {
      }
      function createObj(base, props) {
        var inst;
        if (Object.create) {
          inst = Object.create(base);
        } else {
          nothing.prototype = base;
          inst = new nothing();
        }
        if (props) {
          copyObj(props, inst);
        }
        return inst;
      }
      var nonASCIISingleCaseWordChar = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
      function isWordCharBasic(ch) {
        return /\w/.test(ch) || ch > "" && (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch));
      }
      function isWordChar(ch, helper) {
        if (!helper) {
          return isWordCharBasic(ch);
        }
        if (helper.source.indexOf("\\w") > -1 && isWordCharBasic(ch)) {
          return true;
        }
        return helper.test(ch);
      }
      function isEmpty(obj) {
        for (var n in obj) {
          if (obj.hasOwnProperty(n) && obj[n]) {
            return false;
          }
        }
        return true;
      }
      var extendingChars = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
      function isExtendingChar(ch) {
        return ch.charCodeAt(0) >= 768 && extendingChars.test(ch);
      }
      function skipExtendingChars(str, pos, dir) {
        while ((dir < 0 ? pos > 0 : pos < str.length) && isExtendingChar(str.charAt(pos))) {
          pos += dir;
        }
        return pos;
      }
      function findFirst(pred, from, to) {
        var dir = from > to ? -1 : 1;
        for (; ; ) {
          if (from == to) {
            return from;
          }
          var midF = (from + to) / 2, mid = dir < 0 ? Math.ceil(midF) : Math.floor(midF);
          if (mid == from) {
            return pred(mid) ? from : to;
          }
          if (pred(mid)) {
            to = mid;
          } else {
            from = mid + dir;
          }
        }
      }
      function iterateBidiSections(order, from, to, f) {
        if (!order) {
          return f(from, to, "ltr", 0);
        }
        var found = false;
        for (var i2 = 0; i2 < order.length; ++i2) {
          var part = order[i2];
          if (part.from < to && part.to > from || from == to && part.to == from) {
            f(Math.max(part.from, from), Math.min(part.to, to), part.level == 1 ? "rtl" : "ltr", i2);
            found = true;
          }
        }
        if (!found) {
          f(from, to, "ltr");
        }
      }
      var bidiOther = null;
      function getBidiPartAt(order, ch, sticky) {
        var found;
        bidiOther = null;
        for (var i2 = 0; i2 < order.length; ++i2) {
          var cur = order[i2];
          if (cur.from < ch && cur.to > ch) {
            return i2;
          }
          if (cur.to == ch) {
            if (cur.from != cur.to && sticky == "before") {
              found = i2;
            } else {
              bidiOther = i2;
            }
          }
          if (cur.from == ch) {
            if (cur.from != cur.to && sticky != "before") {
              found = i2;
            } else {
              bidiOther = i2;
            }
          }
        }
        return found != null ? found : bidiOther;
      }
      var bidiOrdering = /* @__PURE__ */ (function() {
        var lowTypes = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN";
        var arabicTypes = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
        function charType(code) {
          if (code <= 247) {
            return lowTypes.charAt(code);
          } else if (1424 <= code && code <= 1524) {
            return "R";
          } else if (1536 <= code && code <= 1785) {
            return arabicTypes.charAt(code - 1536);
          } else if (1774 <= code && code <= 2220) {
            return "r";
          } else if (8192 <= code && code <= 8203) {
            return "w";
          } else if (code == 8204) {
            return "b";
          } else {
            return "L";
          }
        }
        var bidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
        var isNeutral = /[stwN]/, isStrong = /[LRr]/, countsAsLeft = /[Lb1n]/, countsAsNum = /[1n]/;
        function BidiSpan(level, from, to) {
          this.level = level;
          this.from = from;
          this.to = to;
        }
        return function(str, direction) {
          var outerType = direction == "ltr" ? "L" : "R";
          if (str.length == 0 || direction == "ltr" && !bidiRE.test(str)) {
            return false;
          }
          var len = str.length, types = [];
          for (var i2 = 0; i2 < len; ++i2) {
            types.push(charType(str.charCodeAt(i2)));
          }
          for (var i$12 = 0, prev = outerType; i$12 < len; ++i$12) {
            var type = types[i$12];
            if (type == "m") {
              types[i$12] = prev;
            } else {
              prev = type;
            }
          }
          for (var i$22 = 0, cur = outerType; i$22 < len; ++i$22) {
            var type$1 = types[i$22];
            if (type$1 == "1" && cur == "r") {
              types[i$22] = "n";
            } else if (isStrong.test(type$1)) {
              cur = type$1;
              if (type$1 == "r") {
                types[i$22] = "R";
              }
            }
          }
          for (var i$3 = 1, prev$1 = types[0]; i$3 < len - 1; ++i$3) {
            var type$2 = types[i$3];
            if (type$2 == "+" && prev$1 == "1" && types[i$3 + 1] == "1") {
              types[i$3] = "1";
            } else if (type$2 == "," && prev$1 == types[i$3 + 1] && (prev$1 == "1" || prev$1 == "n")) {
              types[i$3] = prev$1;
            }
            prev$1 = type$2;
          }
          for (var i$4 = 0; i$4 < len; ++i$4) {
            var type$3 = types[i$4];
            if (type$3 == ",") {
              types[i$4] = "N";
            } else if (type$3 == "%") {
              var end = void 0;
              for (end = i$4 + 1; end < len && types[end] == "%"; ++end) {
              }
              var replace = i$4 && types[i$4 - 1] == "!" || end < len && types[end] == "1" ? "1" : "N";
              for (var j = i$4; j < end; ++j) {
                types[j] = replace;
              }
              i$4 = end - 1;
            }
          }
          for (var i$5 = 0, cur$1 = outerType; i$5 < len; ++i$5) {
            var type$4 = types[i$5];
            if (cur$1 == "L" && type$4 == "1") {
              types[i$5] = "L";
            } else if (isStrong.test(type$4)) {
              cur$1 = type$4;
            }
          }
          for (var i$6 = 0; i$6 < len; ++i$6) {
            if (isNeutral.test(types[i$6])) {
              var end$1 = void 0;
              for (end$1 = i$6 + 1; end$1 < len && isNeutral.test(types[end$1]); ++end$1) {
              }
              var before = (i$6 ? types[i$6 - 1] : outerType) == "L";
              var after = (end$1 < len ? types[end$1] : outerType) == "L";
              var replace$1 = before == after ? before ? "L" : "R" : outerType;
              for (var j$1 = i$6; j$1 < end$1; ++j$1) {
                types[j$1] = replace$1;
              }
              i$6 = end$1 - 1;
            }
          }
          var order = [], m;
          for (var i$7 = 0; i$7 < len; ) {
            if (countsAsLeft.test(types[i$7])) {
              var start = i$7;
              for (++i$7; i$7 < len && countsAsLeft.test(types[i$7]); ++i$7) {
              }
              order.push(new BidiSpan(0, start, i$7));
            } else {
              var pos = i$7, at = order.length, isRTL = direction == "rtl" ? 1 : 0;
              for (++i$7; i$7 < len && types[i$7] != "L"; ++i$7) {
              }
              for (var j$2 = pos; j$2 < i$7; ) {
                if (countsAsNum.test(types[j$2])) {
                  if (pos < j$2) {
                    order.splice(at, 0, new BidiSpan(1, pos, j$2));
                    at += isRTL;
                  }
                  var nstart = j$2;
                  for (++j$2; j$2 < i$7 && countsAsNum.test(types[j$2]); ++j$2) {
                  }
                  order.splice(at, 0, new BidiSpan(2, nstart, j$2));
                  at += isRTL;
                  pos = j$2;
                } else {
                  ++j$2;
                }
              }
              if (pos < i$7) {
                order.splice(at, 0, new BidiSpan(1, pos, i$7));
              }
            }
          }
          if (direction == "ltr") {
            if (order[0].level == 1 && (m = str.match(/^\s+/))) {
              order[0].from = m[0].length;
              order.unshift(new BidiSpan(0, 0, m[0].length));
            }
            if (lst(order).level == 1 && (m = str.match(/\s+$/))) {
              lst(order).to -= m[0].length;
              order.push(new BidiSpan(0, len - m[0].length, len));
            }
          }
          return direction == "rtl" ? order.reverse() : order;
        };
      })();
      function getOrder(line, direction) {
        var order = line.order;
        if (order == null) {
          order = line.order = bidiOrdering(line.text, direction);
        }
        return order;
      }
      var noHandlers = [];
      var on = function(emitter, type, f) {
        if (emitter.addEventListener) {
          emitter.addEventListener(type, f, false);
        } else if (emitter.attachEvent) {
          emitter.attachEvent("on" + type, f);
        } else {
          var map2 = emitter._handlers || (emitter._handlers = {});
          map2[type] = (map2[type] || noHandlers).concat(f);
        }
      };
      function getHandlers(emitter, type) {
        return emitter._handlers && emitter._handlers[type] || noHandlers;
      }
      function off(emitter, type, f) {
        if (emitter.removeEventListener) {
          emitter.removeEventListener(type, f, false);
        } else if (emitter.detachEvent) {
          emitter.detachEvent("on" + type, f);
        } else {
          var map2 = emitter._handlers, arr = map2 && map2[type];
          if (arr) {
            var index = indexOf(arr, f);
            if (index > -1) {
              map2[type] = arr.slice(0, index).concat(arr.slice(index + 1));
            }
          }
        }
      }
      function signal(emitter, type) {
        var handlers = getHandlers(emitter, type);
        if (!handlers.length) {
          return;
        }
        var args = Array.prototype.slice.call(arguments, 2);
        for (var i2 = 0; i2 < handlers.length; ++i2) {
          handlers[i2].apply(null, args);
        }
      }
      function signalDOMEvent(cm, e, override) {
        if (typeof e == "string") {
          e = { type: e, preventDefault: function() {
            this.defaultPrevented = true;
          } };
        }
        signal(cm, override || e.type, cm, e);
        return e_defaultPrevented(e) || e.codemirrorIgnore;
      }
      function signalCursorActivity(cm) {
        var arr = cm._handlers && cm._handlers.cursorActivity;
        if (!arr) {
          return;
        }
        var set = cm.curOp.cursorActivityHandlers || (cm.curOp.cursorActivityHandlers = []);
        for (var i2 = 0; i2 < arr.length; ++i2) {
          if (indexOf(set, arr[i2]) == -1) {
            set.push(arr[i2]);
          }
        }
      }
      function hasHandler(emitter, type) {
        return getHandlers(emitter, type).length > 0;
      }
      function eventMixin(ctor) {
        ctor.prototype.on = function(type, f) {
          on(this, type, f);
        };
        ctor.prototype.off = function(type, f) {
          off(this, type, f);
        };
      }
      function e_preventDefault(e) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
      }
      function e_stopPropagation(e) {
        if (e.stopPropagation) {
          e.stopPropagation();
        } else {
          e.cancelBubble = true;
        }
      }
      function e_defaultPrevented(e) {
        return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == false;
      }
      function e_stop(e) {
        e_preventDefault(e);
        e_stopPropagation(e);
      }
      function e_target(e) {
        return e.target || e.srcElement;
      }
      function e_button(e) {
        var b = e.which;
        if (b == null) {
          if (e.button & 1) {
            b = 1;
          } else if (e.button & 2) {
            b = 3;
          } else if (e.button & 4) {
            b = 2;
          }
        }
        if (mac && e.ctrlKey && b == 1) {
          b = 3;
        }
        return b;
      }
      var dragAndDrop = (function() {
        if (ie && ie_version < 9) {
          return false;
        }
        var div = elt("div");
        return "draggable" in div || "dragDrop" in div;
      })();
      var zwspSupported;
      function zeroWidthElement(measure) {
        if (zwspSupported == null) {
          var test = elt("span", "​");
          removeChildrenAndAdd(measure, elt("span", [test, document.createTextNode("x")]));
          if (measure.firstChild.offsetHeight != 0) {
            zwspSupported = test.offsetWidth <= 1 && test.offsetHeight > 2 && !(ie && ie_version < 8);
          }
        }
        var node = zwspSupported ? elt("span", "​") : elt("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
        node.setAttribute("cm-text", "");
        return node;
      }
      var badBidiRects;
      function hasBadBidiRects(measure) {
        if (badBidiRects != null) {
          return badBidiRects;
        }
        var txt = removeChildrenAndAdd(measure, document.createTextNode("AخA"));
        var r0 = range2(txt, 0, 1).getBoundingClientRect();
        var r1 = range2(txt, 1, 2).getBoundingClientRect();
        removeChildren(measure);
        if (!r0 || r0.left == r0.right) {
          return false;
        }
        return badBidiRects = r1.right - r0.right < 3;
      }
      var splitLinesAuto = "\n\nb".split(/\n/).length != 3 ? function(string) {
        var pos = 0, result = [], l = string.length;
        while (pos <= l) {
          var nl = string.indexOf("\n", pos);
          if (nl == -1) {
            nl = string.length;
          }
          var line = string.slice(pos, string.charAt(nl - 1) == "\r" ? nl - 1 : nl);
          var rt = line.indexOf("\r");
          if (rt != -1) {
            result.push(line.slice(0, rt));
            pos += rt + 1;
          } else {
            result.push(line);
            pos = nl + 1;
          }
        }
        return result;
      } : function(string) {
        return string.split(/\r\n?|\n/);
      };
      var hasSelection = window.getSelection ? function(te) {
        try {
          return te.selectionStart != te.selectionEnd;
        } catch (e) {
          return false;
        }
      } : function(te) {
        var range3;
        try {
          range3 = te.ownerDocument.selection.createRange();
        } catch (e) {
        }
        if (!range3 || range3.parentElement() != te) {
          return false;
        }
        return range3.compareEndPoints("StartToEnd", range3) != 0;
      };
      var hasCopyEvent = (function() {
        var e = elt("div");
        if ("oncopy" in e) {
          return true;
        }
        e.setAttribute("oncopy", "return;");
        return typeof e.oncopy == "function";
      })();
      var badZoomedRects = null;
      function hasBadZoomedRects(measure) {
        if (badZoomedRects != null) {
          return badZoomedRects;
        }
        var node = removeChildrenAndAdd(measure, elt("span", "x"));
        var normal = node.getBoundingClientRect();
        var fromRange = range2(node, 0, 1).getBoundingClientRect();
        return badZoomedRects = Math.abs(normal.left - fromRange.left) > 1;
      }
      var modes = {}, mimeModes = {};
      function defineMode(name, mode) {
        if (arguments.length > 2) {
          mode.dependencies = Array.prototype.slice.call(arguments, 2);
        }
        modes[name] = mode;
      }
      function defineMIME(mime, spec) {
        mimeModes[mime] = spec;
      }
      function resolveMode(spec) {
        if (typeof spec == "string" && mimeModes.hasOwnProperty(spec)) {
          spec = mimeModes[spec];
        } else if (spec && typeof spec.name == "string" && mimeModes.hasOwnProperty(spec.name)) {
          var found = mimeModes[spec.name];
          if (typeof found == "string") {
            found = { name: found };
          }
          spec = createObj(found, spec);
          spec.name = found.name;
        } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) {
          return resolveMode("application/xml");
        } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(spec)) {
          return resolveMode("application/json");
        }
        if (typeof spec == "string") {
          return { name: spec };
        } else {
          return spec || { name: "null" };
        }
      }
      function getMode(options, spec) {
        spec = resolveMode(spec);
        var mfactory = modes[spec.name];
        if (!mfactory) {
          return getMode(options, "text/plain");
        }
        var modeObj = mfactory(options, spec);
        if (modeExtensions.hasOwnProperty(spec.name)) {
          var exts = modeExtensions[spec.name];
          for (var prop2 in exts) {
            if (!exts.hasOwnProperty(prop2)) {
              continue;
            }
            if (modeObj.hasOwnProperty(prop2)) {
              modeObj["_" + prop2] = modeObj[prop2];
            }
            modeObj[prop2] = exts[prop2];
          }
        }
        modeObj.name = spec.name;
        if (spec.helperType) {
          modeObj.helperType = spec.helperType;
        }
        if (spec.modeProps) {
          for (var prop$1 in spec.modeProps) {
            modeObj[prop$1] = spec.modeProps[prop$1];
          }
        }
        return modeObj;
      }
      var modeExtensions = {};
      function extendMode(mode, properties) {
        var exts = modeExtensions.hasOwnProperty(mode) ? modeExtensions[mode] : modeExtensions[mode] = {};
        copyObj(properties, exts);
      }
      function copyState(mode, state) {
        if (state === true) {
          return state;
        }
        if (mode.copyState) {
          return mode.copyState(state);
        }
        var nstate = {};
        for (var n in state) {
          var val = state[n];
          if (val instanceof Array) {
            val = val.concat([]);
          }
          nstate[n] = val;
        }
        return nstate;
      }
      function innerMode(mode, state) {
        var info;
        while (mode.innerMode) {
          info = mode.innerMode(state);
          if (!info || info.mode == mode) {
            break;
          }
          state = info.state;
          mode = info.mode;
        }
        return info || { mode, state };
      }
      function startState(mode, a1, a2) {
        return mode.startState ? mode.startState(a1, a2) : true;
      }
      var StringStream = function(string, tabSize, lineOracle) {
        this.pos = this.start = 0;
        this.string = string;
        this.tabSize = tabSize || 8;
        this.lastColumnPos = this.lastColumnValue = 0;
        this.lineStart = 0;
        this.lineOracle = lineOracle;
      };
      StringStream.prototype.eol = function() {
        return this.pos >= this.string.length;
      };
      StringStream.prototype.sol = function() {
        return this.pos == this.lineStart;
      };
      StringStream.prototype.peek = function() {
        return this.string.charAt(this.pos) || void 0;
      };
      StringStream.prototype.next = function() {
        if (this.pos < this.string.length) {
          return this.string.charAt(this.pos++);
        }
      };
      StringStream.prototype.eat = function(match) {
        var ch = this.string.charAt(this.pos);
        var ok;
        if (typeof match == "string") {
          ok = ch == match;
        } else {
          ok = ch && (match.test ? match.test(ch) : match(ch));
        }
        if (ok) {
          ++this.pos;
          return ch;
        }
      };
      StringStream.prototype.eatWhile = function(match) {
        var start = this.pos;
        while (this.eat(match)) {
        }
        return this.pos > start;
      };
      StringStream.prototype.eatSpace = function() {
        var start = this.pos;
        while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) {
          ++this.pos;
        }
        return this.pos > start;
      };
      StringStream.prototype.skipToEnd = function() {
        this.pos = this.string.length;
      };
      StringStream.prototype.skipTo = function(ch) {
        var found = this.string.indexOf(ch, this.pos);
        if (found > -1) {
          this.pos = found;
          return true;
        }
      };
      StringStream.prototype.backUp = function(n) {
        this.pos -= n;
      };
      StringStream.prototype.column = function() {
        if (this.lastColumnPos < this.start) {
          this.lastColumnValue = countColumn(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
          this.lastColumnPos = this.start;
        }
        return this.lastColumnValue - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
      };
      StringStream.prototype.indentation = function() {
        return countColumn(this.string, null, this.tabSize) - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
      };
      StringStream.prototype.match = function(pattern, consume, caseInsensitive) {
        if (typeof pattern == "string") {
          var cased = function(str) {
            return caseInsensitive ? str.toLowerCase() : str;
          };
          var substr = this.string.substr(this.pos, pattern.length);
          if (cased(substr) == cased(pattern)) {
            if (consume !== false) {
              this.pos += pattern.length;
            }
            return true;
          }
        } else {
          var match = this.string.slice(this.pos).match(pattern);
          if (match && match.index > 0) {
            return null;
          }
          if (match && consume !== false) {
            this.pos += match[0].length;
          }
          return match;
        }
      };
      StringStream.prototype.current = function() {
        return this.string.slice(this.start, this.pos);
      };
      StringStream.prototype.hideFirstChars = function(n, inner) {
        this.lineStart += n;
        try {
          return inner();
        } finally {
          this.lineStart -= n;
        }
      };
      StringStream.prototype.lookAhead = function(n) {
        var oracle = this.lineOracle;
        return oracle && oracle.lookAhead(n);
      };
      StringStream.prototype.baseToken = function() {
        var oracle = this.lineOracle;
        return oracle && oracle.baseToken(this.pos);
      };
      function getLine(doc2, n) {
        n -= doc2.first;
        if (n < 0 || n >= doc2.size) {
          throw new Error("There is no line " + (n + doc2.first) + " in the document.");
        }
        var chunk = doc2;
        while (!chunk.lines) {
          for (var i2 = 0; ; ++i2) {
            var child = chunk.children[i2], sz = child.chunkSize();
            if (n < sz) {
              chunk = child;
              break;
            }
            n -= sz;
          }
        }
        return chunk.lines[n];
      }
      function getBetween(doc2, start, end) {
        var out = [], n = start.line;
        doc2.iter(start.line, end.line + 1, function(line) {
          var text = line.text;
          if (n == end.line) {
            text = text.slice(0, end.ch);
          }
          if (n == start.line) {
            text = text.slice(start.ch);
          }
          out.push(text);
          ++n;
        });
        return out;
      }
      function getLines(doc2, from, to) {
        var out = [];
        doc2.iter(from, to, function(line) {
          out.push(line.text);
        });
        return out;
      }
      function updateLineHeight(line, height) {
        var diff = height - line.height;
        if (diff) {
          for (var n = line; n; n = n.parent) {
            n.height += diff;
          }
        }
      }
      function lineNo(line) {
        if (line.parent == null) {
          return null;
        }
        var cur = line.parent, no = indexOf(cur.lines, line);
        for (var chunk = cur.parent; chunk; cur = chunk, chunk = chunk.parent) {
          for (var i2 = 0; ; ++i2) {
            if (chunk.children[i2] == cur) {
              break;
            }
            no += chunk.children[i2].chunkSize();
          }
        }
        return no + cur.first;
      }
      function lineAtHeight(chunk, h) {
        var n = chunk.first;
        outer: do {
          for (var i$12 = 0; i$12 < chunk.children.length; ++i$12) {
            var child = chunk.children[i$12], ch = child.height;
            if (h < ch) {
              chunk = child;
              continue outer;
            }
            h -= ch;
            n += child.chunkSize();
          }
          return n;
        } while (!chunk.lines);
        var i2 = 0;
        for (; i2 < chunk.lines.length; ++i2) {
          var line = chunk.lines[i2], lh = line.height;
          if (h < lh) {
            break;
          }
          h -= lh;
        }
        return n + i2;
      }
      function isLine(doc2, l) {
        return l >= doc2.first && l < doc2.first + doc2.size;
      }
      function lineNumberFor(options, i2) {
        return String(options.lineNumberFormatter(i2 + options.firstLineNumber));
      }
      function Pos(line, ch, sticky) {
        if (sticky === void 0) sticky = null;
        if (!(this instanceof Pos)) {
          return new Pos(line, ch, sticky);
        }
        this.line = line;
        this.ch = ch;
        this.sticky = sticky;
      }
      function cmp(a, b) {
        return a.line - b.line || a.ch - b.ch;
      }
      function equalCursorPos(a, b) {
        return a.sticky == b.sticky && cmp(a, b) == 0;
      }
      function copyPos(x) {
        return Pos(x.line, x.ch);
      }
      function maxPos(a, b) {
        return cmp(a, b) < 0 ? b : a;
      }
      function minPos(a, b) {
        return cmp(a, b) < 0 ? a : b;
      }
      function clipLine(doc2, n) {
        return Math.max(doc2.first, Math.min(n, doc2.first + doc2.size - 1));
      }
      function clipPos(doc2, pos) {
        if (pos.line < doc2.first) {
          return Pos(doc2.first, 0);
        }
        var last = doc2.first + doc2.size - 1;
        if (pos.line > last) {
          return Pos(last, getLine(doc2, last).text.length);
        }
        return clipToLen(pos, getLine(doc2, pos.line).text.length);
      }
      function clipToLen(pos, linelen) {
        var ch = pos.ch;
        if (ch == null || ch > linelen) {
          return Pos(pos.line, linelen);
        } else if (ch < 0) {
          return Pos(pos.line, 0);
        } else {
          return pos;
        }
      }
      function clipPosArray(doc2, array) {
        var out = [];
        for (var i2 = 0; i2 < array.length; i2++) {
          out[i2] = clipPos(doc2, array[i2]);
        }
        return out;
      }
      var SavedContext = function(state, lookAhead) {
        this.state = state;
        this.lookAhead = lookAhead;
      };
      var Context = function(doc2, state, line, lookAhead) {
        this.state = state;
        this.doc = doc2;
        this.line = line;
        this.maxLookAhead = lookAhead || 0;
        this.baseTokens = null;
        this.baseTokenPos = 1;
      };
      Context.prototype.lookAhead = function(n) {
        var line = this.doc.getLine(this.line + n);
        if (line != null && n > this.maxLookAhead) {
          this.maxLookAhead = n;
        }
        return line;
      };
      Context.prototype.baseToken = function(n) {
        if (!this.baseTokens) {
          return null;
        }
        while (this.baseTokens[this.baseTokenPos] <= n) {
          this.baseTokenPos += 2;
        }
        var type = this.baseTokens[this.baseTokenPos + 1];
        return {
          type: type && type.replace(/( |^)overlay .*/, ""),
          size: this.baseTokens[this.baseTokenPos] - n
        };
      };
      Context.prototype.nextLine = function() {
        this.line++;
        if (this.maxLookAhead > 0) {
          this.maxLookAhead--;
        }
      };
      Context.fromSaved = function(doc2, saved, line) {
        if (saved instanceof SavedContext) {
          return new Context(doc2, copyState(doc2.mode, saved.state), line, saved.lookAhead);
        } else {
          return new Context(doc2, copyState(doc2.mode, saved), line);
        }
      };
      Context.prototype.save = function(copy) {
        var state = copy !== false ? copyState(this.doc.mode, this.state) : this.state;
        return this.maxLookAhead > 0 ? new SavedContext(state, this.maxLookAhead) : state;
      };
      function highlightLine(cm, line, context, forceToEnd) {
        var st = [cm.state.modeGen], lineClasses = {};
        runMode(
          cm,
          line.text,
          cm.doc.mode,
          context,
          function(end, style) {
            return st.push(end, style);
          },
          lineClasses,
          forceToEnd
        );
        var state = context.state;
        var loop = function(o2) {
          context.baseTokens = st;
          var overlay = cm.state.overlays[o2], i2 = 1, at = 0;
          context.state = true;
          runMode(cm, line.text, overlay.mode, context, function(end, style) {
            var start = i2;
            while (at < end) {
              var i_end = st[i2];
              if (i_end > end) {
                st.splice(i2, 1, end, st[i2 + 1], i_end);
              }
              i2 += 2;
              at = Math.min(end, i_end);
            }
            if (!style) {
              return;
            }
            if (overlay.opaque) {
              st.splice(start, i2 - start, end, "overlay " + style);
              i2 = start + 2;
            } else {
              for (; start < i2; start += 2) {
                var cur = st[start + 1];
                st[start + 1] = (cur ? cur + " " : "") + "overlay " + style;
              }
            }
          }, lineClasses);
          context.state = state;
          context.baseTokens = null;
          context.baseTokenPos = 1;
        };
        for (var o = 0; o < cm.state.overlays.length; ++o) loop(o);
        return { styles: st, classes: lineClasses.bgClass || lineClasses.textClass ? lineClasses : null };
      }
      function getLineStyles(cm, line, updateFrontier) {
        if (!line.styles || line.styles[0] != cm.state.modeGen) {
          var context = getContextBefore(cm, lineNo(line));
          var resetState = line.text.length > cm.options.maxHighlightLength && copyState(cm.doc.mode, context.state);
          var result = highlightLine(cm, line, context);
          if (resetState) {
            context.state = resetState;
          }
          line.stateAfter = context.save(!resetState);
          line.styles = result.styles;
          if (result.classes) {
            line.styleClasses = result.classes;
          } else if (line.styleClasses) {
            line.styleClasses = null;
          }
          if (updateFrontier === cm.doc.highlightFrontier) {
            cm.doc.modeFrontier = Math.max(cm.doc.modeFrontier, ++cm.doc.highlightFrontier);
          }
        }
        return line.styles;
      }
      function getContextBefore(cm, n, precise) {
        var doc2 = cm.doc, display = cm.display;
        if (!doc2.mode.startState) {
          return new Context(doc2, true, n);
        }
        var start = findStartLine(cm, n, precise);
        var saved = start > doc2.first && getLine(doc2, start - 1).stateAfter;
        var context = saved ? Context.fromSaved(doc2, saved, start) : new Context(doc2, startState(doc2.mode), start);
        doc2.iter(start, n, function(line) {
          processLine(cm, line.text, context);
          var pos = context.line;
          line.stateAfter = pos == n - 1 || pos % 5 == 0 || pos >= display.viewFrom && pos < display.viewTo ? context.save() : null;
          context.nextLine();
        });
        if (precise) {
          doc2.modeFrontier = context.line;
        }
        return context;
      }
      function processLine(cm, text, context, startAt) {
        var mode = cm.doc.mode;
        var stream = new StringStream(text, cm.options.tabSize, context);
        stream.start = stream.pos = startAt || 0;
        if (text == "") {
          callBlankLine(mode, context.state);
        }
        while (!stream.eol()) {
          readToken(mode, stream, context.state);
          stream.start = stream.pos;
        }
      }
      function callBlankLine(mode, state) {
        if (mode.blankLine) {
          return mode.blankLine(state);
        }
        if (!mode.innerMode) {
          return;
        }
        var inner = innerMode(mode, state);
        if (inner.mode.blankLine) {
          return inner.mode.blankLine(inner.state);
        }
      }
      function readToken(mode, stream, state, inner) {
        for (var i2 = 0; i2 < 10; i2++) {
          if (inner) {
            inner[0] = innerMode(mode, state).mode;
          }
          var style = mode.token(stream, state);
          if (stream.pos > stream.start) {
            return style;
          }
        }
        throw new Error("Mode " + mode.name + " failed to advance stream.");
      }
      var Token = function(stream, type, state) {
        this.start = stream.start;
        this.end = stream.pos;
        this.string = stream.current();
        this.type = type || null;
        this.state = state;
      };
      function takeToken(cm, pos, precise, asArray) {
        var doc2 = cm.doc, mode = doc2.mode, style;
        pos = clipPos(doc2, pos);
        var line = getLine(doc2, pos.line), context = getContextBefore(cm, pos.line, precise);
        var stream = new StringStream(line.text, cm.options.tabSize, context), tokens;
        if (asArray) {
          tokens = [];
        }
        while ((asArray || stream.pos < pos.ch) && !stream.eol()) {
          stream.start = stream.pos;
          style = readToken(mode, stream, context.state);
          if (asArray) {
            tokens.push(new Token(stream, style, copyState(doc2.mode, context.state)));
          }
        }
        return asArray ? tokens : new Token(stream, style, context.state);
      }
      function extractLineClasses(type, output) {
        if (type) {
          for (; ; ) {
            var lineClass = type.match(/(?:^|\s+)line-(background-)?(\S+)/);
            if (!lineClass) {
              break;
            }
            type = type.slice(0, lineClass.index) + type.slice(lineClass.index + lineClass[0].length);
            var prop2 = lineClass[1] ? "bgClass" : "textClass";
            if (output[prop2] == null) {
              output[prop2] = lineClass[2];
            } else if (!new RegExp("(?:^|\\s)" + lineClass[2] + "(?:$|\\s)").test(output[prop2])) {
              output[prop2] += " " + lineClass[2];
            }
          }
        }
        return type;
      }
      function runMode(cm, text, mode, context, f, lineClasses, forceToEnd) {
        var flattenSpans = mode.flattenSpans;
        if (flattenSpans == null) {
          flattenSpans = cm.options.flattenSpans;
        }
        var curStart = 0, curStyle = null;
        var stream = new StringStream(text, cm.options.tabSize, context), style;
        var inner = cm.options.addModeClass && [null];
        if (text == "") {
          extractLineClasses(callBlankLine(mode, context.state), lineClasses);
        }
        while (!stream.eol()) {
          if (stream.pos > cm.options.maxHighlightLength) {
            flattenSpans = false;
            if (forceToEnd) {
              processLine(cm, text, context, stream.pos);
            }
            stream.pos = text.length;
            style = null;
          } else {
            style = extractLineClasses(readToken(mode, stream, context.state, inner), lineClasses);
          }
          if (inner) {
            var mName = inner[0].name;
            if (mName) {
              style = "m-" + (style ? mName + " " + style : mName);
            }
          }
          if (!flattenSpans || curStyle != style) {
            while (curStart < stream.start) {
              curStart = Math.min(stream.start, curStart + 5e3);
              f(curStart, curStyle);
            }
            curStyle = style;
          }
          stream.start = stream.pos;
        }
        while (curStart < stream.pos) {
          var pos = Math.min(stream.pos, curStart + 5e3);
          f(pos, curStyle);
          curStart = pos;
        }
      }
      function findStartLine(cm, n, precise) {
        var minindent, minline, doc2 = cm.doc;
        var lim = precise ? -1 : n - (cm.doc.mode.innerMode ? 1e3 : 100);
        for (var search = n; search > lim; --search) {
          if (search <= doc2.first) {
            return doc2.first;
          }
          var line = getLine(doc2, search - 1), after = line.stateAfter;
          if (after && (!precise || search + (after instanceof SavedContext ? after.lookAhead : 0) <= doc2.modeFrontier)) {
            return search;
          }
          var indented = countColumn(line.text, null, cm.options.tabSize);
          if (minline == null || minindent > indented) {
            minline = search - 1;
            minindent = indented;
          }
        }
        return minline;
      }
      function retreatFrontier(doc2, n) {
        doc2.modeFrontier = Math.min(doc2.modeFrontier, n);
        if (doc2.highlightFrontier < n - 10) {
          return;
        }
        var start = doc2.first;
        for (var line = n - 1; line > start; line--) {
          var saved = getLine(doc2, line).stateAfter;
          if (saved && (!(saved instanceof SavedContext) || line + saved.lookAhead < n)) {
            start = line + 1;
            break;
          }
        }
        doc2.highlightFrontier = Math.min(doc2.highlightFrontier, start);
      }
      var sawReadOnlySpans = false, sawCollapsedSpans = false;
      function seeReadOnlySpans() {
        sawReadOnlySpans = true;
      }
      function seeCollapsedSpans() {
        sawCollapsedSpans = true;
      }
      function MarkedSpan(marker, from, to) {
        this.marker = marker;
        this.from = from;
        this.to = to;
      }
      function getMarkedSpanFor(spans, marker) {
        if (spans) {
          for (var i2 = 0; i2 < spans.length; ++i2) {
            var span = spans[i2];
            if (span.marker == marker) {
              return span;
            }
          }
        }
      }
      function removeMarkedSpan(spans, span) {
        var r;
        for (var i2 = 0; i2 < spans.length; ++i2) {
          if (spans[i2] != span) {
            (r || (r = [])).push(spans[i2]);
          }
        }
        return r;
      }
      function addMarkedSpan(line, span, op) {
        var inThisOp = op && window.WeakSet && (op.markedSpans || (op.markedSpans = /* @__PURE__ */ new WeakSet()));
        if (inThisOp && line.markedSpans && inThisOp.has(line.markedSpans)) {
          line.markedSpans.push(span);
        } else {
          line.markedSpans = line.markedSpans ? line.markedSpans.concat([span]) : [span];
          if (inThisOp) {
            inThisOp.add(line.markedSpans);
          }
        }
        span.marker.attachLine(line);
      }
      function markedSpansBefore(old, startCh, isInsert) {
        var nw;
        if (old) {
          for (var i2 = 0; i2 < old.length; ++i2) {
            var span = old[i2], marker = span.marker;
            var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= startCh : span.from < startCh);
            if (startsBefore || span.from == startCh && marker.type == "bookmark" && (!isInsert || !span.marker.insertLeft)) {
              var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= startCh : span.to > startCh);
              (nw || (nw = [])).push(new MarkedSpan(marker, span.from, endsAfter ? null : span.to));
            }
          }
        }
        return nw;
      }
      function markedSpansAfter(old, endCh, isInsert) {
        var nw;
        if (old) {
          for (var i2 = 0; i2 < old.length; ++i2) {
            var span = old[i2], marker = span.marker;
            var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= endCh : span.to > endCh);
            if (endsAfter || span.from == endCh && marker.type == "bookmark" && (!isInsert || span.marker.insertLeft)) {
              var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= endCh : span.from < endCh);
              (nw || (nw = [])).push(new MarkedSpan(
                marker,
                startsBefore ? null : span.from - endCh,
                span.to == null ? null : span.to - endCh
              ));
            }
          }
        }
        return nw;
      }
      function stretchSpansOverChange(doc2, change) {
        if (change.full) {
          return null;
        }
        var oldFirst = isLine(doc2, change.from.line) && getLine(doc2, change.from.line).markedSpans;
        var oldLast = isLine(doc2, change.to.line) && getLine(doc2, change.to.line).markedSpans;
        if (!oldFirst && !oldLast) {
          return null;
        }
        var startCh = change.from.ch, endCh = change.to.ch, isInsert = cmp(change.from, change.to) == 0;
        var first = markedSpansBefore(oldFirst, startCh, isInsert);
        var last = markedSpansAfter(oldLast, endCh, isInsert);
        var sameLine = change.text.length == 1, offset = lst(change.text).length + (sameLine ? startCh : 0);
        if (first) {
          for (var i2 = 0; i2 < first.length; ++i2) {
            var span = first[i2];
            if (span.to == null) {
              var found = getMarkedSpanFor(last, span.marker);
              if (!found) {
                span.to = startCh;
              } else if (sameLine) {
                span.to = found.to == null ? null : found.to + offset;
              }
            }
          }
        }
        if (last) {
          for (var i$12 = 0; i$12 < last.length; ++i$12) {
            var span$1 = last[i$12];
            if (span$1.to != null) {
              span$1.to += offset;
            }
            if (span$1.from == null) {
              var found$1 = getMarkedSpanFor(first, span$1.marker);
              if (!found$1) {
                span$1.from = offset;
                if (sameLine) {
                  (first || (first = [])).push(span$1);
                }
              }
            } else {
              span$1.from += offset;
              if (sameLine) {
                (first || (first = [])).push(span$1);
              }
            }
          }
        }
        if (first) {
          first = clearEmptySpans(first);
        }
        if (last && last != first) {
          last = clearEmptySpans(last);
        }
        var newMarkers = [first];
        if (!sameLine) {
          var gap = change.text.length - 2, gapMarkers;
          if (gap > 0 && first) {
            for (var i$22 = 0; i$22 < first.length; ++i$22) {
              if (first[i$22].to == null) {
                (gapMarkers || (gapMarkers = [])).push(new MarkedSpan(first[i$22].marker, null, null));
              }
            }
          }
          for (var i$3 = 0; i$3 < gap; ++i$3) {
            newMarkers.push(gapMarkers);
          }
          newMarkers.push(last);
        }
        return newMarkers;
      }
      function clearEmptySpans(spans) {
        for (var i2 = 0; i2 < spans.length; ++i2) {
          var span = spans[i2];
          if (span.from != null && span.from == span.to && span.marker.clearWhenEmpty !== false) {
            spans.splice(i2--, 1);
          }
        }
        if (!spans.length) {
          return null;
        }
        return spans;
      }
      function removeReadOnlyRanges(doc2, from, to) {
        var markers = null;
        doc2.iter(from.line, to.line + 1, function(line) {
          if (line.markedSpans) {
            for (var i3 = 0; i3 < line.markedSpans.length; ++i3) {
              var mark = line.markedSpans[i3].marker;
              if (mark.readOnly && (!markers || indexOf(markers, mark) == -1)) {
                (markers || (markers = [])).push(mark);
              }
            }
          }
        });
        if (!markers) {
          return null;
        }
        var parts = [{ from, to }];
        for (var i2 = 0; i2 < markers.length; ++i2) {
          var mk = markers[i2], m = mk.find(0);
          for (var j = 0; j < parts.length; ++j) {
            var p = parts[j];
            if (cmp(p.to, m.from) < 0 || cmp(p.from, m.to) > 0) {
              continue;
            }
            var newParts = [j, 1], dfrom = cmp(p.from, m.from), dto = cmp(p.to, m.to);
            if (dfrom < 0 || !mk.inclusiveLeft && !dfrom) {
              newParts.push({ from: p.from, to: m.from });
            }
            if (dto > 0 || !mk.inclusiveRight && !dto) {
              newParts.push({ from: m.to, to: p.to });
            }
            parts.splice.apply(parts, newParts);
            j += newParts.length - 3;
          }
        }
        return parts;
      }
      function detachMarkedSpans(line) {
        var spans = line.markedSpans;
        if (!spans) {
          return;
        }
        for (var i2 = 0; i2 < spans.length; ++i2) {
          spans[i2].marker.detachLine(line);
        }
        line.markedSpans = null;
      }
      function attachMarkedSpans(line, spans) {
        if (!spans) {
          return;
        }
        for (var i2 = 0; i2 < spans.length; ++i2) {
          spans[i2].marker.attachLine(line);
        }
        line.markedSpans = spans;
      }
      function extraLeft(marker) {
        return marker.inclusiveLeft ? -1 : 0;
      }
      function extraRight(marker) {
        return marker.inclusiveRight ? 1 : 0;
      }
      function compareCollapsedMarkers(a, b) {
        var lenDiff = a.lines.length - b.lines.length;
        if (lenDiff != 0) {
          return lenDiff;
        }
        var aPos = a.find(), bPos = b.find();
        var fromCmp = cmp(aPos.from, bPos.from) || extraLeft(a) - extraLeft(b);
        if (fromCmp) {
          return -fromCmp;
        }
        var toCmp = cmp(aPos.to, bPos.to) || extraRight(a) - extraRight(b);
        if (toCmp) {
          return toCmp;
        }
        return b.id - a.id;
      }
      function collapsedSpanAtSide(line, start) {
        var sps = sawCollapsedSpans && line.markedSpans, found;
        if (sps) {
          for (var sp = void 0, i2 = 0; i2 < sps.length; ++i2) {
            sp = sps[i2];
            if (sp.marker.collapsed && (start ? sp.from : sp.to) == null && (!found || compareCollapsedMarkers(found, sp.marker) < 0)) {
              found = sp.marker;
            }
          }
        }
        return found;
      }
      function collapsedSpanAtStart(line) {
        return collapsedSpanAtSide(line, true);
      }
      function collapsedSpanAtEnd(line) {
        return collapsedSpanAtSide(line, false);
      }
      function collapsedSpanAround(line, ch) {
        var sps = sawCollapsedSpans && line.markedSpans, found;
        if (sps) {
          for (var i2 = 0; i2 < sps.length; ++i2) {
            var sp = sps[i2];
            if (sp.marker.collapsed && (sp.from == null || sp.from < ch) && (sp.to == null || sp.to > ch) && (!found || compareCollapsedMarkers(found, sp.marker) < 0)) {
              found = sp.marker;
            }
          }
        }
        return found;
      }
      function conflictingCollapsedRange(doc2, lineNo2, from, to, marker) {
        var line = getLine(doc2, lineNo2);
        var sps = sawCollapsedSpans && line.markedSpans;
        if (sps) {
          for (var i2 = 0; i2 < sps.length; ++i2) {
            var sp = sps[i2];
            if (!sp.marker.collapsed) {
              continue;
            }
            var found = sp.marker.find(0);
            var fromCmp = cmp(found.from, from) || extraLeft(sp.marker) - extraLeft(marker);
            var toCmp = cmp(found.to, to) || extraRight(sp.marker) - extraRight(marker);
            if (fromCmp >= 0 && toCmp <= 0 || fromCmp <= 0 && toCmp >= 0) {
              continue;
            }
            if (fromCmp <= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.to, from) >= 0 : cmp(found.to, from) > 0) || fromCmp >= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.from, to) <= 0 : cmp(found.from, to) < 0)) {
              return true;
            }
          }
        }
      }
      function visualLine(line) {
        var merged;
        while (merged = collapsedSpanAtStart(line)) {
          line = merged.find(-1, true).line;
        }
        return line;
      }
      function visualLineEnd(line) {
        var merged;
        while (merged = collapsedSpanAtEnd(line)) {
          line = merged.find(1, true).line;
        }
        return line;
      }
      function visualLineContinued(line) {
        var merged, lines;
        while (merged = collapsedSpanAtEnd(line)) {
          line = merged.find(1, true).line;
          (lines || (lines = [])).push(line);
        }
        return lines;
      }
      function visualLineNo(doc2, lineN) {
        var line = getLine(doc2, lineN), vis = visualLine(line);
        if (line == vis) {
          return lineN;
        }
        return lineNo(vis);
      }
      function visualLineEndNo(doc2, lineN) {
        if (lineN > doc2.lastLine()) {
          return lineN;
        }
        var line = getLine(doc2, lineN), merged;
        if (!lineIsHidden(doc2, line)) {
          return lineN;
        }
        while (merged = collapsedSpanAtEnd(line)) {
          line = merged.find(1, true).line;
        }
        return lineNo(line) + 1;
      }
      function lineIsHidden(doc2, line) {
        var sps = sawCollapsedSpans && line.markedSpans;
        if (sps) {
          for (var sp = void 0, i2 = 0; i2 < sps.length; ++i2) {
            sp = sps[i2];
            if (!sp.marker.collapsed) {
              continue;
            }
            if (sp.from == null) {
              return true;
            }
            if (sp.marker.widgetNode) {
              continue;
            }
            if (sp.from == 0 && sp.marker.inclusiveLeft && lineIsHiddenInner(doc2, line, sp)) {
              return true;
            }
          }
        }
      }
      function lineIsHiddenInner(doc2, line, span) {
        if (span.to == null) {
          var end = span.marker.find(1, true);
          return lineIsHiddenInner(doc2, end.line, getMarkedSpanFor(end.line.markedSpans, span.marker));
        }
        if (span.marker.inclusiveRight && span.to == line.text.length) {
          return true;
        }
        for (var sp = void 0, i2 = 0; i2 < line.markedSpans.length; ++i2) {
          sp = line.markedSpans[i2];
          if (sp.marker.collapsed && !sp.marker.widgetNode && sp.from == span.to && (sp.to == null || sp.to != span.from) && (sp.marker.inclusiveLeft || span.marker.inclusiveRight) && lineIsHiddenInner(doc2, line, sp)) {
            return true;
          }
        }
      }
      function heightAtLine(lineObj) {
        lineObj = visualLine(lineObj);
        var h = 0, chunk = lineObj.parent;
        for (var i2 = 0; i2 < chunk.lines.length; ++i2) {
          var line = chunk.lines[i2];
          if (line == lineObj) {
            break;
          } else {
            h += line.height;
          }
        }
        for (var p = chunk.parent; p; chunk = p, p = chunk.parent) {
          for (var i$12 = 0; i$12 < p.children.length; ++i$12) {
            var cur = p.children[i$12];
            if (cur == chunk) {
              break;
            } else {
              h += cur.height;
            }
          }
        }
        return h;
      }
      function lineLength(line) {
        if (line.height == 0) {
          return 0;
        }
        var len = line.text.length, merged, cur = line;
        while (merged = collapsedSpanAtStart(cur)) {
          var found = merged.find(0, true);
          cur = found.from.line;
          len += found.from.ch - found.to.ch;
        }
        cur = line;
        while (merged = collapsedSpanAtEnd(cur)) {
          var found$1 = merged.find(0, true);
          len -= cur.text.length - found$1.from.ch;
          cur = found$1.to.line;
          len += cur.text.length - found$1.to.ch;
        }
        return len;
      }
      function findMaxLine(cm) {
        var d = cm.display, doc2 = cm.doc;
        d.maxLine = getLine(doc2, doc2.first);
        d.maxLineLength = lineLength(d.maxLine);
        d.maxLineChanged = true;
        doc2.iter(function(line) {
          var len = lineLength(line);
          if (len > d.maxLineLength) {
            d.maxLineLength = len;
            d.maxLine = line;
          }
        });
      }
      var Line = function(text, markedSpans, estimateHeight2) {
        this.text = text;
        attachMarkedSpans(this, markedSpans);
        this.height = estimateHeight2 ? estimateHeight2(this) : 1;
      };
      Line.prototype.lineNo = function() {
        return lineNo(this);
      };
      eventMixin(Line);
      function updateLine(line, text, markedSpans, estimateHeight2) {
        line.text = text;
        if (line.stateAfter) {
          line.stateAfter = null;
        }
        if (line.styles) {
          line.styles = null;
        }
        if (line.order != null) {
          line.order = null;
        }
        detachMarkedSpans(line);
        attachMarkedSpans(line, markedSpans);
        var estHeight = estimateHeight2 ? estimateHeight2(line) : 1;
        if (estHeight != line.height) {
          updateLineHeight(line, estHeight);
        }
      }
      function cleanUpLine(line) {
        line.parent = null;
        detachMarkedSpans(line);
      }
      var styleToClassCache = {}, styleToClassCacheWithMode = {};
      function interpretTokenStyle(style, options) {
        if (!style || /^\s*$/.test(style)) {
          return null;
        }
        var cache = options.addModeClass ? styleToClassCacheWithMode : styleToClassCache;
        return cache[style] || (cache[style] = style.replace(/\S+/g, "cm-$&"));
      }
      function buildLineContent(cm, lineView) {
        var content = eltP("span", null, null, webkit ? "padding-right: .1px" : null);
        var builder = {
          pre: eltP("pre", [content], "CodeMirror-line"),
          content,
          col: 0,
          pos: 0,
          cm,
          trailingSpace: false,
          splitSpaces: cm.getOption("lineWrapping")
        };
        lineView.measure = {};
        for (var i2 = 0; i2 <= (lineView.rest ? lineView.rest.length : 0); i2++) {
          var line = i2 ? lineView.rest[i2 - 1] : lineView.line, order = void 0;
          builder.pos = 0;
          builder.addToken = buildToken;
          if (hasBadBidiRects(cm.display.measure) && (order = getOrder(line, cm.doc.direction))) {
            builder.addToken = buildTokenBadBidi(builder.addToken, order);
          }
          builder.map = [];
          var allowFrontierUpdate = lineView != cm.display.externalMeasured && lineNo(line);
          insertLineContent(line, builder, getLineStyles(cm, line, allowFrontierUpdate));
          if (line.styleClasses) {
            if (line.styleClasses.bgClass) {
              builder.bgClass = joinClasses(line.styleClasses.bgClass, builder.bgClass || "");
            }
            if (line.styleClasses.textClass) {
              builder.textClass = joinClasses(line.styleClasses.textClass, builder.textClass || "");
            }
          }
          if (builder.map.length == 0) {
            builder.map.push(0, 0, builder.content.appendChild(zeroWidthElement(cm.display.measure)));
          }
          if (i2 == 0) {
            lineView.measure.map = builder.map;
            lineView.measure.cache = {};
          } else {
            (lineView.measure.maps || (lineView.measure.maps = [])).push(builder.map);
            (lineView.measure.caches || (lineView.measure.caches = [])).push({});
          }
        }
        if (webkit) {
          var last = builder.content.lastChild;
          if (/\bcm-tab\b/.test(last.className) || last.querySelector && last.querySelector(".cm-tab")) {
            builder.content.className = "cm-tab-wrap-hack";
          }
        }
        signal(cm, "renderLine", cm, lineView.line, builder.pre);
        if (builder.pre.className) {
          builder.textClass = joinClasses(builder.pre.className, builder.textClass || "");
        }
        return builder;
      }
      function defaultSpecialCharPlaceholder(ch) {
        var token = elt("span", "•", "cm-invalidchar");
        token.title = "\\u" + ch.charCodeAt(0).toString(16);
        token.setAttribute("aria-label", token.title);
        return token;
      }
      function buildToken(builder, text, style, startStyle, endStyle, css2, attributes) {
        if (!text) {
          return;
        }
        var displayText = builder.splitSpaces ? splitSpaces(text, builder.trailingSpace) : text;
        var special = builder.cm.state.specialChars, mustWrap = false;
        var content;
        if (!special.test(text)) {
          builder.col += text.length;
          content = document.createTextNode(displayText);
          builder.map.push(builder.pos, builder.pos + text.length, content);
          if (ie && ie_version < 9) {
            mustWrap = true;
          }
          builder.pos += text.length;
        } else {
          content = document.createDocumentFragment();
          var pos = 0;
          while (true) {
            special.lastIndex = pos;
            var m = special.exec(text);
            var skipped = m ? m.index - pos : text.length - pos;
            if (skipped) {
              var txt = document.createTextNode(displayText.slice(pos, pos + skipped));
              if (ie && ie_version < 9) {
                content.appendChild(elt("span", [txt]));
              } else {
                content.appendChild(txt);
              }
              builder.map.push(builder.pos, builder.pos + skipped, txt);
              builder.col += skipped;
              builder.pos += skipped;
            }
            if (!m) {
              break;
            }
            pos += skipped + 1;
            var txt$1 = void 0;
            if (m[0] == "	") {
              var tabSize = builder.cm.options.tabSize, tabWidth = tabSize - builder.col % tabSize;
              txt$1 = content.appendChild(elt("span", spaceStr(tabWidth), "cm-tab"));
              txt$1.setAttribute("role", "presentation");
              txt$1.setAttribute("cm-text", "	");
              builder.col += tabWidth;
            } else if (m[0] == "\r" || m[0] == "\n") {
              txt$1 = content.appendChild(elt("span", m[0] == "\r" ? "␍" : "␤", "cm-invalidchar"));
              txt$1.setAttribute("cm-text", m[0]);
              builder.col += 1;
            } else {
              txt$1 = builder.cm.options.specialCharPlaceholder(m[0]);
              txt$1.setAttribute("cm-text", m[0]);
              if (ie && ie_version < 9) {
                content.appendChild(elt("span", [txt$1]));
              } else {
                content.appendChild(txt$1);
              }
              builder.col += 1;
            }
            builder.map.push(builder.pos, builder.pos + 1, txt$1);
            builder.pos++;
          }
        }
        builder.trailingSpace = displayText.charCodeAt(text.length - 1) == 32;
        if (style || startStyle || endStyle || mustWrap || css2 || attributes) {
          var fullStyle = style || "";
          if (startStyle) {
            fullStyle += startStyle;
          }
          if (endStyle) {
            fullStyle += endStyle;
          }
          var token = elt("span", [content], fullStyle, css2);
          if (attributes) {
            for (var attr in attributes) {
              if (attributes.hasOwnProperty(attr) && attr != "style" && attr != "class") {
                token.setAttribute(attr, attributes[attr]);
              }
            }
          }
          return builder.content.appendChild(token);
        }
        builder.content.appendChild(content);
      }
      function splitSpaces(text, trailingBefore) {
        if (text.length > 1 && !/  /.test(text)) {
          return text;
        }
        var spaceBefore = trailingBefore, result = "";
        for (var i2 = 0; i2 < text.length; i2++) {
          var ch = text.charAt(i2);
          if (ch == " " && spaceBefore && (i2 == text.length - 1 || text.charCodeAt(i2 + 1) == 32)) {
            ch = " ";
          }
          result += ch;
          spaceBefore = ch == " ";
        }
        return result;
      }
      function buildTokenBadBidi(inner, order) {
        return function(builder, text, style, startStyle, endStyle, css2, attributes) {
          style = style ? style + " cm-force-border" : "cm-force-border";
          var start = builder.pos, end = start + text.length;
          for (; ; ) {
            var part = void 0;
            for (var i2 = 0; i2 < order.length; i2++) {
              part = order[i2];
              if (part.to > start && part.from <= start) {
                break;
              }
            }
            if (part.to >= end) {
              return inner(builder, text, style, startStyle, endStyle, css2, attributes);
            }
            inner(builder, text.slice(0, part.to - start), style, startStyle, null, css2, attributes);
            startStyle = null;
            text = text.slice(part.to - start);
            start = part.to;
          }
        };
      }
      function buildCollapsedSpan(builder, size, marker, ignoreWidget) {
        var widget = !ignoreWidget && marker.widgetNode;
        if (widget) {
          builder.map.push(builder.pos, builder.pos + size, widget);
        }
        if (!ignoreWidget && builder.cm.display.input.needsContentAttribute) {
          if (!widget) {
            widget = builder.content.appendChild(document.createElement("span"));
          }
          widget.setAttribute("cm-marker", marker.id);
        }
        if (widget) {
          builder.cm.display.input.setUneditable(widget);
          builder.content.appendChild(widget);
        }
        builder.pos += size;
        builder.trailingSpace = false;
      }
      function insertLineContent(line, builder, styles) {
        var spans = line.markedSpans, allText = line.text, at = 0;
        if (!spans) {
          for (var i$12 = 1; i$12 < styles.length; i$12 += 2) {
            builder.addToken(builder, allText.slice(at, at = styles[i$12]), interpretTokenStyle(styles[i$12 + 1], builder.cm.options));
          }
          return;
        }
        var len = allText.length, pos = 0, i2 = 1, text = "", style, css2;
        var nextChange = 0, spanStyle, spanEndStyle, spanStartStyle, collapsed, attributes;
        for (; ; ) {
          if (nextChange == pos) {
            spanStyle = spanEndStyle = spanStartStyle = css2 = "";
            attributes = null;
            collapsed = null;
            nextChange = Infinity;
            var foundBookmarks = [], endStyles = void 0;
            for (var j = 0; j < spans.length; ++j) {
              var sp = spans[j], m = sp.marker;
              if (m.type == "bookmark" && sp.from == pos && m.widgetNode) {
                foundBookmarks.push(m);
              } else if (sp.from <= pos && (sp.to == null || sp.to > pos || m.collapsed && sp.to == pos && sp.from == pos)) {
                if (sp.to != null && sp.to != pos && nextChange > sp.to) {
                  nextChange = sp.to;
                  spanEndStyle = "";
                }
                if (m.className) {
                  spanStyle += " " + m.className;
                }
                if (m.css) {
                  css2 = (css2 ? css2 + ";" : "") + m.css;
                }
                if (m.startStyle && sp.from == pos) {
                  spanStartStyle += " " + m.startStyle;
                }
                if (m.endStyle && sp.to == nextChange) {
                  (endStyles || (endStyles = [])).push(m.endStyle, sp.to);
                }
                if (m.title) {
                  (attributes || (attributes = {})).title = m.title;
                }
                if (m.attributes) {
                  for (var attr in m.attributes) {
                    (attributes || (attributes = {}))[attr] = m.attributes[attr];
                  }
                }
                if (m.collapsed && (!collapsed || compareCollapsedMarkers(collapsed.marker, m) < 0)) {
                  collapsed = sp;
                }
              } else if (sp.from > pos && nextChange > sp.from) {
                nextChange = sp.from;
              }
            }
            if (endStyles) {
              for (var j$1 = 0; j$1 < endStyles.length; j$1 += 2) {
                if (endStyles[j$1 + 1] == nextChange) {
                  spanEndStyle += " " + endStyles[j$1];
                }
              }
            }
            if (!collapsed || collapsed.from == pos) {
              for (var j$2 = 0; j$2 < foundBookmarks.length; ++j$2) {
                buildCollapsedSpan(builder, 0, foundBookmarks[j$2]);
              }
            }
            if (collapsed && (collapsed.from || 0) == pos) {
              buildCollapsedSpan(
                builder,
                (collapsed.to == null ? len + 1 : collapsed.to) - pos,
                collapsed.marker,
                collapsed.from == null
              );
              if (collapsed.to == null) {
                return;
              }
              if (collapsed.to == pos) {
                collapsed = false;
              }
            }
          }
          if (pos >= len) {
            break;
          }
          var upto = Math.min(len, nextChange);
          while (true) {
            if (text) {
              var end = pos + text.length;
              if (!collapsed) {
                var tokenText = end > upto ? text.slice(0, upto - pos) : text;
                builder.addToken(
                  builder,
                  tokenText,
                  style ? style + spanStyle : spanStyle,
                  spanStartStyle,
                  pos + tokenText.length == nextChange ? spanEndStyle : "",
                  css2,
                  attributes
                );
              }
              if (end >= upto) {
                text = text.slice(upto - pos);
                pos = upto;
                break;
              }
              pos = end;
              spanStartStyle = "";
            }
            text = allText.slice(at, at = styles[i2++]);
            style = interpretTokenStyle(styles[i2++], builder.cm.options);
          }
        }
      }
      function LineView(doc2, line, lineN) {
        this.line = line;
        this.rest = visualLineContinued(line);
        this.size = this.rest ? lineNo(lst(this.rest)) - lineN + 1 : 1;
        this.node = this.text = null;
        this.hidden = lineIsHidden(doc2, line);
      }
      function buildViewArray(cm, from, to) {
        var array = [], nextPos;
        for (var pos = from; pos < to; pos = nextPos) {
          var view = new LineView(cm.doc, getLine(cm.doc, pos), pos);
          nextPos = pos + view.size;
          array.push(view);
        }
        return array;
      }
      var operationGroup = null;
      function pushOperation(op) {
        if (operationGroup) {
          operationGroup.ops.push(op);
        } else {
          op.ownsGroup = operationGroup = {
            ops: [op],
            delayedCallbacks: []
          };
        }
      }
      function fireCallbacksForOps(group) {
        var callbacks = group.delayedCallbacks, i2 = 0;
        do {
          for (; i2 < callbacks.length; i2++) {
            callbacks[i2].call(null);
          }
          for (var j = 0; j < group.ops.length; j++) {
            var op = group.ops[j];
            if (op.cursorActivityHandlers) {
              while (op.cursorActivityCalled < op.cursorActivityHandlers.length) {
                op.cursorActivityHandlers[op.cursorActivityCalled++].call(null, op.cm);
              }
            }
          }
        } while (i2 < callbacks.length);
      }
      function finishOperation(op, endCb) {
        var group = op.ownsGroup;
        if (!group) {
          return;
        }
        try {
          fireCallbacksForOps(group);
        } finally {
          operationGroup = null;
          endCb(group);
        }
      }
      var orphanDelayedCallbacks = null;
      function signalLater(emitter, type) {
        var arr = getHandlers(emitter, type);
        if (!arr.length) {
          return;
        }
        var args = Array.prototype.slice.call(arguments, 2), list;
        if (operationGroup) {
          list = operationGroup.delayedCallbacks;
        } else if (orphanDelayedCallbacks) {
          list = orphanDelayedCallbacks;
        } else {
          list = orphanDelayedCallbacks = [];
          setTimeout(fireOrphanDelayed, 0);
        }
        var loop = function(i3) {
          list.push(function() {
            return arr[i3].apply(null, args);
          });
        };
        for (var i2 = 0; i2 < arr.length; ++i2)
          loop(i2);
      }
      function fireOrphanDelayed() {
        var delayed = orphanDelayedCallbacks;
        orphanDelayedCallbacks = null;
        for (var i2 = 0; i2 < delayed.length; ++i2) {
          delayed[i2]();
        }
      }
      function updateLineForChanges(cm, lineView, lineN, dims) {
        for (var j = 0; j < lineView.changes.length; j++) {
          var type = lineView.changes[j];
          if (type == "text") {
            updateLineText(cm, lineView);
          } else if (type == "gutter") {
            updateLineGutter(cm, lineView, lineN, dims);
          } else if (type == "class") {
            updateLineClasses(cm, lineView);
          } else if (type == "widget") {
            updateLineWidgets(cm, lineView, dims);
          }
        }
        lineView.changes = null;
      }
      function ensureLineWrapped(lineView) {
        if (lineView.node == lineView.text) {
          lineView.node = elt("div", null, null, "position: relative");
          if (lineView.text.parentNode) {
            lineView.text.parentNode.replaceChild(lineView.node, lineView.text);
          }
          lineView.node.appendChild(lineView.text);
          if (ie && ie_version < 8) {
            lineView.node.style.zIndex = 2;
          }
        }
        return lineView.node;
      }
      function updateLineBackground(cm, lineView) {
        var cls = lineView.bgClass ? lineView.bgClass + " " + (lineView.line.bgClass || "") : lineView.line.bgClass;
        if (cls) {
          cls += " CodeMirror-linebackground";
        }
        if (lineView.background) {
          if (cls) {
            lineView.background.className = cls;
          } else {
            lineView.background.parentNode.removeChild(lineView.background);
            lineView.background = null;
          }
        } else if (cls) {
          var wrap2 = ensureLineWrapped(lineView);
          lineView.background = wrap2.insertBefore(elt("div", null, cls), wrap2.firstChild);
          cm.display.input.setUneditable(lineView.background);
        }
      }
      function getLineContent(cm, lineView) {
        var ext = cm.display.externalMeasured;
        if (ext && ext.line == lineView.line) {
          cm.display.externalMeasured = null;
          lineView.measure = ext.measure;
          return ext.built;
        }
        return buildLineContent(cm, lineView);
      }
      function updateLineText(cm, lineView) {
        var cls = lineView.text.className;
        var built = getLineContent(cm, lineView);
        if (lineView.text == lineView.node) {
          lineView.node = built.pre;
        }
        lineView.text.parentNode.replaceChild(built.pre, lineView.text);
        lineView.text = built.pre;
        if (built.bgClass != lineView.bgClass || built.textClass != lineView.textClass) {
          lineView.bgClass = built.bgClass;
          lineView.textClass = built.textClass;
          updateLineClasses(cm, lineView);
        } else if (cls) {
          lineView.text.className = cls;
        }
      }
      function updateLineClasses(cm, lineView) {
        updateLineBackground(cm, lineView);
        if (lineView.line.wrapClass) {
          ensureLineWrapped(lineView).className = lineView.line.wrapClass;
        } else if (lineView.node != lineView.text) {
          lineView.node.className = "";
        }
        var textClass = lineView.textClass ? lineView.textClass + " " + (lineView.line.textClass || "") : lineView.line.textClass;
        lineView.text.className = textClass || "";
      }
      function updateLineGutter(cm, lineView, lineN, dims) {
        if (lineView.gutter) {
          lineView.node.removeChild(lineView.gutter);
          lineView.gutter = null;
        }
        if (lineView.gutterBackground) {
          lineView.node.removeChild(lineView.gutterBackground);
          lineView.gutterBackground = null;
        }
        if (lineView.line.gutterClass) {
          var wrap2 = ensureLineWrapped(lineView);
          lineView.gutterBackground = elt(
            "div",
            null,
            "CodeMirror-gutter-background " + lineView.line.gutterClass,
            "left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px; width: " + dims.gutterTotalWidth + "px"
          );
          cm.display.input.setUneditable(lineView.gutterBackground);
          wrap2.insertBefore(lineView.gutterBackground, lineView.text);
        }
        var markers = lineView.line.gutterMarkers;
        if (cm.options.lineNumbers || markers) {
          var wrap$1 = ensureLineWrapped(lineView);
          var gutterWrap = lineView.gutter = elt("div", null, "CodeMirror-gutter-wrapper", "left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px");
          gutterWrap.setAttribute("aria-hidden", "true");
          cm.display.input.setUneditable(gutterWrap);
          wrap$1.insertBefore(gutterWrap, lineView.text);
          if (lineView.line.gutterClass) {
            gutterWrap.className += " " + lineView.line.gutterClass;
          }
          if (cm.options.lineNumbers && (!markers || !markers["CodeMirror-linenumbers"])) {
            lineView.lineNumber = gutterWrap.appendChild(
              elt(
                "div",
                lineNumberFor(cm.options, lineN),
                "CodeMirror-linenumber CodeMirror-gutter-elt",
                "left: " + dims.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + cm.display.lineNumInnerWidth + "px"
              )
            );
          }
          if (markers) {
            for (var k = 0; k < cm.display.gutterSpecs.length; ++k) {
              var id = cm.display.gutterSpecs[k].className, found = markers.hasOwnProperty(id) && markers[id];
              if (found) {
                gutterWrap.appendChild(elt(
                  "div",
                  [found],
                  "CodeMirror-gutter-elt",
                  "left: " + dims.gutterLeft[id] + "px; width: " + dims.gutterWidth[id] + "px"
                ));
              }
            }
          }
        }
      }
      function updateLineWidgets(cm, lineView, dims) {
        if (lineView.alignable) {
          lineView.alignable = null;
        }
        var isWidget = classTest("CodeMirror-linewidget");
        for (var node = lineView.node.firstChild, next = void 0; node; node = next) {
          next = node.nextSibling;
          if (isWidget.test(node.className)) {
            lineView.node.removeChild(node);
          }
        }
        insertLineWidgets(cm, lineView, dims);
      }
      function buildLineElement(cm, lineView, lineN, dims) {
        var built = getLineContent(cm, lineView);
        lineView.text = lineView.node = built.pre;
        if (built.bgClass) {
          lineView.bgClass = built.bgClass;
        }
        if (built.textClass) {
          lineView.textClass = built.textClass;
        }
        updateLineClasses(cm, lineView);
        updateLineGutter(cm, lineView, lineN, dims);
        insertLineWidgets(cm, lineView, dims);
        return lineView.node;
      }
      function insertLineWidgets(cm, lineView, dims) {
        insertLineWidgetsFor(cm, lineView.line, lineView, dims, true);
        if (lineView.rest) {
          for (var i2 = 0; i2 < lineView.rest.length; i2++) {
            insertLineWidgetsFor(cm, lineView.rest[i2], lineView, dims, false);
          }
        }
      }
      function insertLineWidgetsFor(cm, line, lineView, dims, allowAbove) {
        if (!line.widgets) {
          return;
        }
        var wrap2 = ensureLineWrapped(lineView);
        for (var i2 = 0, ws = line.widgets; i2 < ws.length; ++i2) {
          var widget = ws[i2], node = elt("div", [widget.node], "CodeMirror-linewidget" + (widget.className ? " " + widget.className : ""));
          if (!widget.handleMouseEvents) {
            node.setAttribute("cm-ignore-events", "true");
          }
          positionLineWidget(widget, node, lineView, dims);
          cm.display.input.setUneditable(node);
          if (allowAbove && widget.above) {
            wrap2.insertBefore(node, lineView.gutter || lineView.text);
          } else {
            wrap2.appendChild(node);
          }
          signalLater(widget, "redraw");
        }
      }
      function positionLineWidget(widget, node, lineView, dims) {
        if (widget.noHScroll) {
          (lineView.alignable || (lineView.alignable = [])).push(node);
          var width = dims.wrapperWidth;
          node.style.left = dims.fixedPos + "px";
          if (!widget.coverGutter) {
            width -= dims.gutterTotalWidth;
            node.style.paddingLeft = dims.gutterTotalWidth + "px";
          }
          node.style.width = width + "px";
        }
        if (widget.coverGutter) {
          node.style.zIndex = 5;
          node.style.position = "relative";
          if (!widget.noHScroll) {
            node.style.marginLeft = -dims.gutterTotalWidth + "px";
          }
        }
      }
      function widgetHeight(widget) {
        if (widget.height != null) {
          return widget.height;
        }
        var cm = widget.doc.cm;
        if (!cm) {
          return 0;
        }
        if (!contains(document.body, widget.node)) {
          var parentStyle = "position: relative;";
          if (widget.coverGutter) {
            parentStyle += "margin-left: -" + cm.display.gutters.offsetWidth + "px;";
          }
          if (widget.noHScroll) {
            parentStyle += "width: " + cm.display.wrapper.clientWidth + "px;";
          }
          removeChildrenAndAdd(cm.display.measure, elt("div", [widget.node], null, parentStyle));
        }
        return widget.height = widget.node.parentNode.offsetHeight;
      }
      function eventInWidget(display, e) {
        for (var n = e_target(e); n != display.wrapper; n = n.parentNode) {
          if (!n || n.nodeType == 1 && n.getAttribute("cm-ignore-events") == "true" || n.parentNode == display.sizer && n != display.mover) {
            return true;
          }
        }
      }
      function paddingTop(display) {
        return display.lineSpace.offsetTop;
      }
      function paddingVert(display) {
        return display.mover.offsetHeight - display.lineSpace.offsetHeight;
      }
      function paddingH(display) {
        if (display.cachedPaddingH) {
          return display.cachedPaddingH;
        }
        var e = removeChildrenAndAdd(display.measure, elt("pre", "x", "CodeMirror-line-like"));
        var style = window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle;
        var data2 = { left: parseInt(style.paddingLeft), right: parseInt(style.paddingRight) };
        if (!isNaN(data2.left) && !isNaN(data2.right)) {
          display.cachedPaddingH = data2;
        }
        return data2;
      }
      function scrollGap(cm) {
        return scrollerGap - cm.display.nativeBarWidth;
      }
      function displayWidth(cm) {
        return cm.display.scroller.clientWidth - scrollGap(cm) - cm.display.barWidth;
      }
      function displayHeight(cm) {
        return cm.display.scroller.clientHeight - scrollGap(cm) - cm.display.barHeight;
      }
      function ensureLineHeights(cm, lineView, rect) {
        var wrapping = cm.options.lineWrapping;
        var curWidth = wrapping && displayWidth(cm);
        if (!lineView.measure.heights || wrapping && lineView.measure.width != curWidth) {
          var heights = lineView.measure.heights = [];
          if (wrapping) {
            lineView.measure.width = curWidth;
            var rects = lineView.text.firstChild.getClientRects();
            for (var i2 = 0; i2 < rects.length - 1; i2++) {
              var cur = rects[i2], next = rects[i2 + 1];
              if (Math.abs(cur.bottom - next.bottom) > 2) {
                heights.push((cur.bottom + next.top) / 2 - rect.top);
              }
            }
          }
          heights.push(rect.bottom - rect.top);
        }
      }
      function mapFromLineView(lineView, line, lineN) {
        if (lineView.line == line) {
          return { map: lineView.measure.map, cache: lineView.measure.cache };
        }
        if (lineView.rest) {
          for (var i2 = 0; i2 < lineView.rest.length; i2++) {
            if (lineView.rest[i2] == line) {
              return { map: lineView.measure.maps[i2], cache: lineView.measure.caches[i2] };
            }
          }
          for (var i$12 = 0; i$12 < lineView.rest.length; i$12++) {
            if (lineNo(lineView.rest[i$12]) > lineN) {
              return { map: lineView.measure.maps[i$12], cache: lineView.measure.caches[i$12], before: true };
            }
          }
        }
      }
      function updateExternalMeasurement(cm, line) {
        line = visualLine(line);
        var lineN = lineNo(line);
        var view = cm.display.externalMeasured = new LineView(cm.doc, line, lineN);
        view.lineN = lineN;
        var built = view.built = buildLineContent(cm, view);
        view.text = built.pre;
        removeChildrenAndAdd(cm.display.lineMeasure, built.pre);
        return view;
      }
      function measureChar(cm, line, ch, bias) {
        return measureCharPrepared(cm, prepareMeasureForLine(cm, line), ch, bias);
      }
      function findViewForLine(cm, lineN) {
        if (lineN >= cm.display.viewFrom && lineN < cm.display.viewTo) {
          return cm.display.view[findViewIndex(cm, lineN)];
        }
        var ext = cm.display.externalMeasured;
        if (ext && lineN >= ext.lineN && lineN < ext.lineN + ext.size) {
          return ext;
        }
      }
      function prepareMeasureForLine(cm, line) {
        var lineN = lineNo(line);
        var view = findViewForLine(cm, lineN);
        if (view && !view.text) {
          view = null;
        } else if (view && view.changes) {
          updateLineForChanges(cm, view, lineN, getDimensions(cm));
          cm.curOp.forceUpdate = true;
        }
        if (!view) {
          view = updateExternalMeasurement(cm, line);
        }
        var info = mapFromLineView(view, line, lineN);
        return {
          line,
          view,
          rect: null,
          map: info.map,
          cache: info.cache,
          before: info.before,
          hasHeights: false
        };
      }
      function measureCharPrepared(cm, prepared, ch, bias, varHeight) {
        if (prepared.before) {
          ch = -1;
        }
        var key = ch + (bias || ""), found;
        if (prepared.cache.hasOwnProperty(key)) {
          found = prepared.cache[key];
        } else {
          if (!prepared.rect) {
            prepared.rect = prepared.view.text.getBoundingClientRect();
          }
          if (!prepared.hasHeights) {
            ensureLineHeights(cm, prepared.view, prepared.rect);
            prepared.hasHeights = true;
          }
          found = measureCharInner(cm, prepared, ch, bias);
          if (!found.bogus) {
            prepared.cache[key] = found;
          }
        }
        return {
          left: found.left,
          right: found.right,
          top: varHeight ? found.rtop : found.top,
          bottom: varHeight ? found.rbottom : found.bottom
        };
      }
      var nullRect = { left: 0, right: 0, top: 0, bottom: 0 };
      function nodeAndOffsetInLineMap(map2, ch, bias) {
        var node, start, end, collapse, mStart, mEnd;
        for (var i2 = 0; i2 < map2.length; i2 += 3) {
          mStart = map2[i2];
          mEnd = map2[i2 + 1];
          if (ch < mStart) {
            start = 0;
            end = 1;
            collapse = "left";
          } else if (ch < mEnd) {
            start = ch - mStart;
            end = start + 1;
          } else if (i2 == map2.length - 3 || ch == mEnd && map2[i2 + 3] > ch) {
            end = mEnd - mStart;
            start = end - 1;
            if (ch >= mEnd) {
              collapse = "right";
            }
          }
          if (start != null) {
            node = map2[i2 + 2];
            if (mStart == mEnd && bias == (node.insertLeft ? "left" : "right")) {
              collapse = bias;
            }
            if (bias == "left" && start == 0) {
              while (i2 && map2[i2 - 2] == map2[i2 - 3] && map2[i2 - 1].insertLeft) {
                node = map2[(i2 -= 3) + 2];
                collapse = "left";
              }
            }
            if (bias == "right" && start == mEnd - mStart) {
              while (i2 < map2.length - 3 && map2[i2 + 3] == map2[i2 + 4] && !map2[i2 + 5].insertLeft) {
                node = map2[(i2 += 3) + 2];
                collapse = "right";
              }
            }
            break;
          }
        }
        return { node, start, end, collapse, coverStart: mStart, coverEnd: mEnd };
      }
      function getUsefulRect(rects, bias) {
        var rect = nullRect;
        if (bias == "left") {
          for (var i2 = 0; i2 < rects.length; i2++) {
            if ((rect = rects[i2]).left != rect.right) {
              break;
            }
          }
        } else {
          for (var i$12 = rects.length - 1; i$12 >= 0; i$12--) {
            if ((rect = rects[i$12]).left != rect.right) {
              break;
            }
          }
        }
        return rect;
      }
      function measureCharInner(cm, prepared, ch, bias) {
        var place = nodeAndOffsetInLineMap(prepared.map, ch, bias);
        var node = place.node, start = place.start, end = place.end, collapse = place.collapse;
        var rect;
        if (node.nodeType == 3) {
          for (var i$12 = 0; i$12 < 4; i$12++) {
            while (start && isExtendingChar(prepared.line.text.charAt(place.coverStart + start))) {
              --start;
            }
            while (place.coverStart + end < place.coverEnd && isExtendingChar(prepared.line.text.charAt(place.coverStart + end))) {
              ++end;
            }
            if (ie && ie_version < 9 && start == 0 && end == place.coverEnd - place.coverStart) {
              rect = node.parentNode.getBoundingClientRect();
            } else {
              rect = getUsefulRect(range2(node, start, end).getClientRects(), bias);
            }
            if (rect.left || rect.right || start == 0) {
              break;
            }
            end = start;
            start = start - 1;
            collapse = "right";
          }
          if (ie && ie_version < 11) {
            rect = maybeUpdateRectForZooming(cm.display.measure, rect);
          }
        } else {
          if (start > 0) {
            collapse = bias = "right";
          }
          var rects;
          if (cm.options.lineWrapping && (rects = node.getClientRects()).length > 1) {
            rect = rects[bias == "right" ? rects.length - 1 : 0];
          } else {
            rect = node.getBoundingClientRect();
          }
        }
        if (ie && ie_version < 9 && !start && (!rect || !rect.left && !rect.right)) {
          var rSpan = node.parentNode.getClientRects()[0];
          if (rSpan) {
            rect = { left: rSpan.left, right: rSpan.left + charWidth(cm.display), top: rSpan.top, bottom: rSpan.bottom };
          } else {
            rect = nullRect;
          }
        }
        var rtop = rect.top - prepared.rect.top, rbot = rect.bottom - prepared.rect.top;
        var mid = (rtop + rbot) / 2;
        var heights = prepared.view.measure.heights;
        var i2 = 0;
        for (; i2 < heights.length - 1; i2++) {
          if (mid < heights[i2]) {
            break;
          }
        }
        var top = i2 ? heights[i2 - 1] : 0, bot = heights[i2];
        var result = {
          left: (collapse == "right" ? rect.right : rect.left) - prepared.rect.left,
          right: (collapse == "left" ? rect.left : rect.right) - prepared.rect.left,
          top,
          bottom: bot
        };
        if (!rect.left && !rect.right) {
          result.bogus = true;
        }
        if (!cm.options.singleCursorHeightPerLine) {
          result.rtop = rtop;
          result.rbottom = rbot;
        }
        return result;
      }
      function maybeUpdateRectForZooming(measure, rect) {
        if (!window.screen || screen.logicalXDPI == null || screen.logicalXDPI == screen.deviceXDPI || !hasBadZoomedRects(measure)) {
          return rect;
        }
        var scaleX = screen.logicalXDPI / screen.deviceXDPI;
        var scaleY = screen.logicalYDPI / screen.deviceYDPI;
        return {
          left: rect.left * scaleX,
          right: rect.right * scaleX,
          top: rect.top * scaleY,
          bottom: rect.bottom * scaleY
        };
      }
      function clearLineMeasurementCacheFor(lineView) {
        if (lineView.measure) {
          lineView.measure.cache = {};
          lineView.measure.heights = null;
          if (lineView.rest) {
            for (var i2 = 0; i2 < lineView.rest.length; i2++) {
              lineView.measure.caches[i2] = {};
            }
          }
        }
      }
      function clearLineMeasurementCache(cm) {
        cm.display.externalMeasure = null;
        removeChildren(cm.display.lineMeasure);
        for (var i2 = 0; i2 < cm.display.view.length; i2++) {
          clearLineMeasurementCacheFor(cm.display.view[i2]);
        }
      }
      function clearCaches(cm) {
        clearLineMeasurementCache(cm);
        cm.display.cachedCharWidth = cm.display.cachedTextHeight = cm.display.cachedPaddingH = null;
        if (!cm.options.lineWrapping) {
          cm.display.maxLineChanged = true;
        }
        cm.display.lineNumChars = null;
      }
      function pageScrollX(doc2) {
        if (chrome && android) {
          return -(doc2.body.getBoundingClientRect().left - parseInt(getComputedStyle(doc2.body).marginLeft));
        }
        return doc2.defaultView.pageXOffset || (doc2.documentElement || doc2.body).scrollLeft;
      }
      function pageScrollY(doc2) {
        if (chrome && android) {
          return -(doc2.body.getBoundingClientRect().top - parseInt(getComputedStyle(doc2.body).marginTop));
        }
        return doc2.defaultView.pageYOffset || (doc2.documentElement || doc2.body).scrollTop;
      }
      function widgetTopHeight(lineObj) {
        var ref2 = visualLine(lineObj);
        var widgets = ref2.widgets;
        var height = 0;
        if (widgets) {
          for (var i2 = 0; i2 < widgets.length; ++i2) {
            if (widgets[i2].above) {
              height += widgetHeight(widgets[i2]);
            }
          }
        }
        return height;
      }
      function intoCoordSystem(cm, lineObj, rect, context, includeWidgets) {
        if (!includeWidgets) {
          var height = widgetTopHeight(lineObj);
          rect.top += height;
          rect.bottom += height;
        }
        if (context == "line") {
          return rect;
        }
        if (!context) {
          context = "local";
        }
        var yOff = heightAtLine(lineObj);
        if (context == "local") {
          yOff += paddingTop(cm.display);
        } else {
          yOff -= cm.display.viewOffset;
        }
        if (context == "page" || context == "window") {
          var lOff = cm.display.lineSpace.getBoundingClientRect();
          yOff += lOff.top + (context == "window" ? 0 : pageScrollY(doc(cm)));
          var xOff = lOff.left + (context == "window" ? 0 : pageScrollX(doc(cm)));
          rect.left += xOff;
          rect.right += xOff;
        }
        rect.top += yOff;
        rect.bottom += yOff;
        return rect;
      }
      function fromCoordSystem(cm, coords, context) {
        if (context == "div") {
          return coords;
        }
        var left = coords.left, top = coords.top;
        if (context == "page") {
          left -= pageScrollX(doc(cm));
          top -= pageScrollY(doc(cm));
        } else if (context == "local" || !context) {
          var localBox = cm.display.sizer.getBoundingClientRect();
          left += localBox.left;
          top += localBox.top;
        }
        var lineSpaceBox = cm.display.lineSpace.getBoundingClientRect();
        return { left: left - lineSpaceBox.left, top: top - lineSpaceBox.top };
      }
      function charCoords(cm, pos, context, lineObj, bias) {
        if (!lineObj) {
          lineObj = getLine(cm.doc, pos.line);
        }
        return intoCoordSystem(cm, lineObj, measureChar(cm, lineObj, pos.ch, bias), context);
      }
      function cursorCoords(cm, pos, context, lineObj, preparedMeasure, varHeight) {
        lineObj = lineObj || getLine(cm.doc, pos.line);
        if (!preparedMeasure) {
          preparedMeasure = prepareMeasureForLine(cm, lineObj);
        }
        function get(ch2, right) {
          var m = measureCharPrepared(cm, preparedMeasure, ch2, right ? "right" : "left", varHeight);
          if (right) {
            m.left = m.right;
          } else {
            m.right = m.left;
          }
          return intoCoordSystem(cm, lineObj, m, context);
        }
        var order = getOrder(lineObj, cm.doc.direction), ch = pos.ch, sticky = pos.sticky;
        if (ch >= lineObj.text.length) {
          ch = lineObj.text.length;
          sticky = "before";
        } else if (ch <= 0) {
          ch = 0;
          sticky = "after";
        }
        if (!order) {
          return get(sticky == "before" ? ch - 1 : ch, sticky == "before");
        }
        function getBidi(ch2, partPos2, invert) {
          var part = order[partPos2], right = part.level == 1;
          return get(invert ? ch2 - 1 : ch2, right != invert);
        }
        var partPos = getBidiPartAt(order, ch, sticky);
        var other = bidiOther;
        var val = getBidi(ch, partPos, sticky == "before");
        if (other != null) {
          val.other = getBidi(ch, other, sticky != "before");
        }
        return val;
      }
      function estimateCoords(cm, pos) {
        var left = 0;
        pos = clipPos(cm.doc, pos);
        if (!cm.options.lineWrapping) {
          left = charWidth(cm.display) * pos.ch;
        }
        var lineObj = getLine(cm.doc, pos.line);
        var top = heightAtLine(lineObj) + paddingTop(cm.display);
        return { left, right: left, top, bottom: top + lineObj.height };
      }
      function PosWithInfo(line, ch, sticky, outside, xRel) {
        var pos = Pos(line, ch, sticky);
        pos.xRel = xRel;
        if (outside) {
          pos.outside = outside;
        }
        return pos;
      }
      function coordsChar(cm, x, y) {
        var doc2 = cm.doc;
        y += cm.display.viewOffset;
        if (y < 0) {
          return PosWithInfo(doc2.first, 0, null, -1, -1);
        }
        var lineN = lineAtHeight(doc2, y), last = doc2.first + doc2.size - 1;
        if (lineN > last) {
          return PosWithInfo(doc2.first + doc2.size - 1, getLine(doc2, last).text.length, null, 1, 1);
        }
        if (x < 0) {
          x = 0;
        }
        var lineObj = getLine(doc2, lineN);
        for (; ; ) {
          var found = coordsCharInner(cm, lineObj, lineN, x, y);
          var collapsed = collapsedSpanAround(lineObj, found.ch + (found.xRel > 0 || found.outside > 0 ? 1 : 0));
          if (!collapsed) {
            return found;
          }
          var rangeEnd = collapsed.find(1);
          if (rangeEnd.line == lineN) {
            return rangeEnd;
          }
          lineObj = getLine(doc2, lineN = rangeEnd.line);
        }
      }
      function wrappedLineExtent(cm, lineObj, preparedMeasure, y) {
        y -= widgetTopHeight(lineObj);
        var end = lineObj.text.length;
        var begin = findFirst(function(ch) {
          return measureCharPrepared(cm, preparedMeasure, ch - 1).bottom <= y;
        }, end, 0);
        end = findFirst(function(ch) {
          return measureCharPrepared(cm, preparedMeasure, ch).top > y;
        }, begin, end);
        return { begin, end };
      }
      function wrappedLineExtentChar(cm, lineObj, preparedMeasure, target) {
        if (!preparedMeasure) {
          preparedMeasure = prepareMeasureForLine(cm, lineObj);
        }
        var targetTop = intoCoordSystem(cm, lineObj, measureCharPrepared(cm, preparedMeasure, target), "line").top;
        return wrappedLineExtent(cm, lineObj, preparedMeasure, targetTop);
      }
      function boxIsAfter(box, x, y, left) {
        return box.bottom <= y ? false : box.top > y ? true : (left ? box.left : box.right) > x;
      }
      function coordsCharInner(cm, lineObj, lineNo2, x, y) {
        y -= heightAtLine(lineObj);
        var preparedMeasure = prepareMeasureForLine(cm, lineObj);
        var widgetHeight2 = widgetTopHeight(lineObj);
        var begin = 0, end = lineObj.text.length, ltr = true;
        var order = getOrder(lineObj, cm.doc.direction);
        if (order) {
          var part = (cm.options.lineWrapping ? coordsBidiPartWrapped : coordsBidiPart)(cm, lineObj, lineNo2, preparedMeasure, order, x, y);
          ltr = part.level != 1;
          begin = ltr ? part.from : part.to - 1;
          end = ltr ? part.to : part.from - 1;
        }
        var chAround = null, boxAround = null;
        var ch = findFirst(function(ch2) {
          var box = measureCharPrepared(cm, preparedMeasure, ch2);
          box.top += widgetHeight2;
          box.bottom += widgetHeight2;
          if (!boxIsAfter(box, x, y, false)) {
            return false;
          }
          if (box.top <= y && box.left <= x) {
            chAround = ch2;
            boxAround = box;
          }
          return true;
        }, begin, end);
        var baseX, sticky, outside = false;
        if (boxAround) {
          var atLeft = x - boxAround.left < boxAround.right - x, atStart = atLeft == ltr;
          ch = chAround + (atStart ? 0 : 1);
          sticky = atStart ? "after" : "before";
          baseX = atLeft ? boxAround.left : boxAround.right;
        } else {
          if (!ltr && (ch == end || ch == begin)) {
            ch++;
          }
          sticky = ch == 0 ? "after" : ch == lineObj.text.length ? "before" : measureCharPrepared(cm, preparedMeasure, ch - (ltr ? 1 : 0)).bottom + widgetHeight2 <= y == ltr ? "after" : "before";
          var coords = cursorCoords(cm, Pos(lineNo2, ch, sticky), "line", lineObj, preparedMeasure);
          baseX = coords.left;
          outside = y < coords.top ? -1 : y >= coords.bottom ? 1 : 0;
        }
        ch = skipExtendingChars(lineObj.text, ch, 1);
        return PosWithInfo(lineNo2, ch, sticky, outside, x - baseX);
      }
      function coordsBidiPart(cm, lineObj, lineNo2, preparedMeasure, order, x, y) {
        var index = findFirst(function(i2) {
          var part2 = order[i2], ltr2 = part2.level != 1;
          return boxIsAfter(cursorCoords(
            cm,
            Pos(lineNo2, ltr2 ? part2.to : part2.from, ltr2 ? "before" : "after"),
            "line",
            lineObj,
            preparedMeasure
          ), x, y, true);
        }, 0, order.length - 1);
        var part = order[index];
        if (index > 0) {
          var ltr = part.level != 1;
          var start = cursorCoords(
            cm,
            Pos(lineNo2, ltr ? part.from : part.to, ltr ? "after" : "before"),
            "line",
            lineObj,
            preparedMeasure
          );
          if (boxIsAfter(start, x, y, true) && start.top > y) {
            part = order[index - 1];
          }
        }
        return part;
      }
      function coordsBidiPartWrapped(cm, lineObj, _lineNo, preparedMeasure, order, x, y) {
        var ref2 = wrappedLineExtent(cm, lineObj, preparedMeasure, y);
        var begin = ref2.begin;
        var end = ref2.end;
        if (/\s/.test(lineObj.text.charAt(end - 1))) {
          end--;
        }
        var part = null, closestDist = null;
        for (var i2 = 0; i2 < order.length; i2++) {
          var p = order[i2];
          if (p.from >= end || p.to <= begin) {
            continue;
          }
          var ltr = p.level != 1;
          var endX = measureCharPrepared(cm, preparedMeasure, ltr ? Math.min(end, p.to) - 1 : Math.max(begin, p.from)).right;
          var dist = endX < x ? x - endX + 1e9 : endX - x;
          if (!part || closestDist > dist) {
            part = p;
            closestDist = dist;
          }
        }
        if (!part) {
          part = order[order.length - 1];
        }
        if (part.from < begin) {
          part = { from: begin, to: part.to, level: part.level };
        }
        if (part.to > end) {
          part = { from: part.from, to: end, level: part.level };
        }
        return part;
      }
      var measureText;
      function textHeight(display) {
        if (display.cachedTextHeight != null) {
          return display.cachedTextHeight;
        }
        if (measureText == null) {
          measureText = elt("pre", null, "CodeMirror-line-like");
          for (var i2 = 0; i2 < 49; ++i2) {
            measureText.appendChild(document.createTextNode("x"));
            measureText.appendChild(elt("br"));
          }
          measureText.appendChild(document.createTextNode("x"));
        }
        removeChildrenAndAdd(display.measure, measureText);
        var height = measureText.offsetHeight / 50;
        if (height > 3) {
          display.cachedTextHeight = height;
        }
        removeChildren(display.measure);
        return height || 1;
      }
      function charWidth(display) {
        if (display.cachedCharWidth != null) {
          return display.cachedCharWidth;
        }
        var anchor = elt("span", "xxxxxxxxxx");
        var pre = elt("pre", [anchor], "CodeMirror-line-like");
        removeChildrenAndAdd(display.measure, pre);
        var rect = anchor.getBoundingClientRect(), width = (rect.right - rect.left) / 10;
        if (width > 2) {
          display.cachedCharWidth = width;
        }
        return width || 10;
      }
      function getDimensions(cm) {
        var d = cm.display, left = {}, width = {};
        var gutterLeft = d.gutters.clientLeft;
        for (var n = d.gutters.firstChild, i2 = 0; n; n = n.nextSibling, ++i2) {
          var id = cm.display.gutterSpecs[i2].className;
          left[id] = n.offsetLeft + n.clientLeft + gutterLeft;
          width[id] = n.clientWidth;
        }
        return {
          fixedPos: compensateForHScroll(d),
          gutterTotalWidth: d.gutters.offsetWidth,
          gutterLeft: left,
          gutterWidth: width,
          wrapperWidth: d.wrapper.clientWidth
        };
      }
      function compensateForHScroll(display) {
        return display.scroller.getBoundingClientRect().left - display.sizer.getBoundingClientRect().left;
      }
      function estimateHeight(cm) {
        var th = textHeight(cm.display), wrapping = cm.options.lineWrapping;
        var perLine = wrapping && Math.max(5, cm.display.scroller.clientWidth / charWidth(cm.display) - 3);
        return function(line) {
          if (lineIsHidden(cm.doc, line)) {
            return 0;
          }
          var widgetsHeight = 0;
          if (line.widgets) {
            for (var i2 = 0; i2 < line.widgets.length; i2++) {
              if (line.widgets[i2].height) {
                widgetsHeight += line.widgets[i2].height;
              }
            }
          }
          if (wrapping) {
            return widgetsHeight + (Math.ceil(line.text.length / perLine) || 1) * th;
          } else {
            return widgetsHeight + th;
          }
        };
      }
      function estimateLineHeights(cm) {
        var doc2 = cm.doc, est = estimateHeight(cm);
        doc2.iter(function(line) {
          var estHeight = est(line);
          if (estHeight != line.height) {
            updateLineHeight(line, estHeight);
          }
        });
      }
      function posFromMouse(cm, e, liberal, forRect) {
        var display = cm.display;
        if (!liberal && e_target(e).getAttribute("cm-not-content") == "true") {
          return null;
        }
        var x, y, space = display.lineSpace.getBoundingClientRect();
        try {
          x = e.clientX - space.left;
          y = e.clientY - space.top;
        } catch (e$1) {
          return null;
        }
        var coords = coordsChar(cm, x, y), line;
        if (forRect && coords.xRel > 0 && (line = getLine(cm.doc, coords.line).text).length == coords.ch) {
          var colDiff = countColumn(line, line.length, cm.options.tabSize) - line.length;
          coords = Pos(coords.line, Math.max(0, Math.round((x - paddingH(cm.display).left) / charWidth(cm.display)) - colDiff));
        }
        return coords;
      }
      function findViewIndex(cm, n) {
        if (n >= cm.display.viewTo) {
          return null;
        }
        n -= cm.display.viewFrom;
        if (n < 0) {
          return null;
        }
        var view = cm.display.view;
        for (var i2 = 0; i2 < view.length; i2++) {
          n -= view[i2].size;
          if (n < 0) {
            return i2;
          }
        }
      }
      function regChange(cm, from, to, lendiff) {
        if (from == null) {
          from = cm.doc.first;
        }
        if (to == null) {
          to = cm.doc.first + cm.doc.size;
        }
        if (!lendiff) {
          lendiff = 0;
        }
        var display = cm.display;
        if (lendiff && to < display.viewTo && (display.updateLineNumbers == null || display.updateLineNumbers > from)) {
          display.updateLineNumbers = from;
        }
        cm.curOp.viewChanged = true;
        if (from >= display.viewTo) {
          if (sawCollapsedSpans && visualLineNo(cm.doc, from) < display.viewTo) {
            resetView(cm);
          }
        } else if (to <= display.viewFrom) {
          if (sawCollapsedSpans && visualLineEndNo(cm.doc, to + lendiff) > display.viewFrom) {
            resetView(cm);
          } else {
            display.viewFrom += lendiff;
            display.viewTo += lendiff;
          }
        } else if (from <= display.viewFrom && to >= display.viewTo) {
          resetView(cm);
        } else if (from <= display.viewFrom) {
          var cut = viewCuttingPoint(cm, to, to + lendiff, 1);
          if (cut) {
            display.view = display.view.slice(cut.index);
            display.viewFrom = cut.lineN;
            display.viewTo += lendiff;
          } else {
            resetView(cm);
          }
        } else if (to >= display.viewTo) {
          var cut$1 = viewCuttingPoint(cm, from, from, -1);
          if (cut$1) {
            display.view = display.view.slice(0, cut$1.index);
            display.viewTo = cut$1.lineN;
          } else {
            resetView(cm);
          }
        } else {
          var cutTop = viewCuttingPoint(cm, from, from, -1);
          var cutBot = viewCuttingPoint(cm, to, to + lendiff, 1);
          if (cutTop && cutBot) {
            display.view = display.view.slice(0, cutTop.index).concat(buildViewArray(cm, cutTop.lineN, cutBot.lineN)).concat(display.view.slice(cutBot.index));
            display.viewTo += lendiff;
          } else {
            resetView(cm);
          }
        }
        var ext = display.externalMeasured;
        if (ext) {
          if (to < ext.lineN) {
            ext.lineN += lendiff;
          } else if (from < ext.lineN + ext.size) {
            display.externalMeasured = null;
          }
        }
      }
      function regLineChange(cm, line, type) {
        cm.curOp.viewChanged = true;
        var display = cm.display, ext = cm.display.externalMeasured;
        if (ext && line >= ext.lineN && line < ext.lineN + ext.size) {
          display.externalMeasured = null;
        }
        if (line < display.viewFrom || line >= display.viewTo) {
          return;
        }
        var lineView = display.view[findViewIndex(cm, line)];
        if (lineView.node == null) {
          return;
        }
        var arr = lineView.changes || (lineView.changes = []);
        if (indexOf(arr, type) == -1) {
          arr.push(type);
        }
      }
      function resetView(cm) {
        cm.display.viewFrom = cm.display.viewTo = cm.doc.first;
        cm.display.view = [];
        cm.display.viewOffset = 0;
      }
      function viewCuttingPoint(cm, oldN, newN, dir) {
        var index = findViewIndex(cm, oldN), diff, view = cm.display.view;
        if (!sawCollapsedSpans || newN == cm.doc.first + cm.doc.size) {
          return { index, lineN: newN };
        }
        var n = cm.display.viewFrom;
        for (var i2 = 0; i2 < index; i2++) {
          n += view[i2].size;
        }
        if (n != oldN) {
          if (dir > 0) {
            if (index == view.length - 1) {
              return null;
            }
            diff = n + view[index].size - oldN;
            index++;
          } else {
            diff = n - oldN;
          }
          oldN += diff;
          newN += diff;
        }
        while (visualLineNo(cm.doc, newN) != newN) {
          if (index == (dir < 0 ? 0 : view.length - 1)) {
            return null;
          }
          newN += dir * view[index - (dir < 0 ? 1 : 0)].size;
          index += dir;
        }
        return { index, lineN: newN };
      }
      function adjustView(cm, from, to) {
        var display = cm.display, view = display.view;
        if (view.length == 0 || from >= display.viewTo || to <= display.viewFrom) {
          display.view = buildViewArray(cm, from, to);
          display.viewFrom = from;
        } else {
          if (display.viewFrom > from) {
            display.view = buildViewArray(cm, from, display.viewFrom).concat(display.view);
          } else if (display.viewFrom < from) {
            display.view = display.view.slice(findViewIndex(cm, from));
          }
          display.viewFrom = from;
          if (display.viewTo < to) {
            display.view = display.view.concat(buildViewArray(cm, display.viewTo, to));
          } else if (display.viewTo > to) {
            display.view = display.view.slice(0, findViewIndex(cm, to));
          }
        }
        display.viewTo = to;
      }
      function countDirtyView(cm) {
        var view = cm.display.view, dirty = 0;
        for (var i2 = 0; i2 < view.length; i2++) {
          var lineView = view[i2];
          if (!lineView.hidden && (!lineView.node || lineView.changes)) {
            ++dirty;
          }
        }
        return dirty;
      }
      function updateSelection(cm) {
        cm.display.input.showSelection(cm.display.input.prepareSelection());
      }
      function prepareSelection(cm, primary) {
        if (primary === void 0) primary = true;
        var doc2 = cm.doc, result = {};
        var curFragment = result.cursors = document.createDocumentFragment();
        var selFragment = result.selection = document.createDocumentFragment();
        var customCursor = cm.options.$customCursor;
        if (customCursor) {
          primary = true;
        }
        for (var i2 = 0; i2 < doc2.sel.ranges.length; i2++) {
          if (!primary && i2 == doc2.sel.primIndex) {
            continue;
          }
          var range3 = doc2.sel.ranges[i2];
          if (range3.from().line >= cm.display.viewTo || range3.to().line < cm.display.viewFrom) {
            continue;
          }
          var collapsed = range3.empty();
          if (customCursor) {
            var head = customCursor(cm, range3);
            if (head) {
              drawSelectionCursor(cm, head, curFragment);
            }
          } else if (collapsed || cm.options.showCursorWhenSelecting) {
            drawSelectionCursor(cm, range3.head, curFragment);
          }
          if (!collapsed) {
            drawSelectionRange(cm, range3, selFragment);
          }
        }
        return result;
      }
      function drawSelectionCursor(cm, head, output) {
        var pos = cursorCoords(cm, head, "div", null, null, !cm.options.singleCursorHeightPerLine);
        var cursor = output.appendChild(elt("div", " ", "CodeMirror-cursor"));
        cursor.style.left = pos.left + "px";
        cursor.style.top = pos.top + "px";
        cursor.style.height = Math.max(0, pos.bottom - pos.top) * cm.options.cursorHeight + "px";
        if (/\bcm-fat-cursor\b/.test(cm.getWrapperElement().className)) {
          var charPos = charCoords(cm, head, "div", null, null);
          var width = charPos.right - charPos.left;
          cursor.style.width = (width > 0 ? width : cm.defaultCharWidth()) + "px";
        }
        if (pos.other) {
          var otherCursor = output.appendChild(elt("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
          otherCursor.style.display = "";
          otherCursor.style.left = pos.other.left + "px";
          otherCursor.style.top = pos.other.top + "px";
          otherCursor.style.height = (pos.other.bottom - pos.other.top) * 0.85 + "px";
        }
      }
      function cmpCoords(a, b) {
        return a.top - b.top || a.left - b.left;
      }
      function drawSelectionRange(cm, range3, output) {
        var display = cm.display, doc2 = cm.doc;
        var fragment = document.createDocumentFragment();
        var padding = paddingH(cm.display), leftSide = padding.left;
        var rightSide = Math.max(display.sizerWidth, displayWidth(cm) - display.sizer.offsetLeft) - padding.right;
        var docLTR = doc2.direction == "ltr";
        function add(left, top, width, bottom) {
          if (top < 0) {
            top = 0;
          }
          top = Math.round(top);
          bottom = Math.round(bottom);
          fragment.appendChild(elt("div", null, "CodeMirror-selected", "position: absolute; left: " + left + "px;\n                             top: " + top + "px; width: " + (width == null ? rightSide - left : width) + "px;\n                             height: " + (bottom - top) + "px"));
        }
        function drawForLine(line, fromArg, toArg) {
          var lineObj = getLine(doc2, line);
          var lineLen = lineObj.text.length;
          var start, end;
          function coords(ch, bias) {
            return charCoords(cm, Pos(line, ch), "div", lineObj, bias);
          }
          function wrapX(pos, dir, side) {
            var extent = wrappedLineExtentChar(cm, lineObj, null, pos);
            var prop2 = dir == "ltr" == (side == "after") ? "left" : "right";
            var ch = side == "after" ? extent.begin : extent.end - (/\s/.test(lineObj.text.charAt(extent.end - 1)) ? 2 : 1);
            return coords(ch, prop2)[prop2];
          }
          var order = getOrder(lineObj, doc2.direction);
          iterateBidiSections(order, fromArg || 0, toArg == null ? lineLen : toArg, function(from, to, dir, i2) {
            var ltr = dir == "ltr";
            var fromPos = coords(from, ltr ? "left" : "right");
            var toPos = coords(to - 1, ltr ? "right" : "left");
            var openStart = fromArg == null && from == 0, openEnd = toArg == null && to == lineLen;
            var first = i2 == 0, last = !order || i2 == order.length - 1;
            if (toPos.top - fromPos.top <= 3) {
              var openLeft = (docLTR ? openStart : openEnd) && first;
              var openRight = (docLTR ? openEnd : openStart) && last;
              var left = openLeft ? leftSide : (ltr ? fromPos : toPos).left;
              var right = openRight ? rightSide : (ltr ? toPos : fromPos).right;
              add(left, fromPos.top, right - left, fromPos.bottom);
            } else {
              var topLeft, topRight, botLeft, botRight;
              if (ltr) {
                topLeft = docLTR && openStart && first ? leftSide : fromPos.left;
                topRight = docLTR ? rightSide : wrapX(from, dir, "before");
                botLeft = docLTR ? leftSide : wrapX(to, dir, "after");
                botRight = docLTR && openEnd && last ? rightSide : toPos.right;
              } else {
                topLeft = !docLTR ? leftSide : wrapX(from, dir, "before");
                topRight = !docLTR && openStart && first ? rightSide : fromPos.right;
                botLeft = !docLTR && openEnd && last ? leftSide : toPos.left;
                botRight = !docLTR ? rightSide : wrapX(to, dir, "after");
              }
              add(topLeft, fromPos.top, topRight - topLeft, fromPos.bottom);
              if (fromPos.bottom < toPos.top) {
                add(leftSide, fromPos.bottom, null, toPos.top);
              }
              add(botLeft, toPos.top, botRight - botLeft, toPos.bottom);
            }
            if (!start || cmpCoords(fromPos, start) < 0) {
              start = fromPos;
            }
            if (cmpCoords(toPos, start) < 0) {
              start = toPos;
            }
            if (!end || cmpCoords(fromPos, end) < 0) {
              end = fromPos;
            }
            if (cmpCoords(toPos, end) < 0) {
              end = toPos;
            }
          });
          return { start, end };
        }
        var sFrom = range3.from(), sTo = range3.to();
        if (sFrom.line == sTo.line) {
          drawForLine(sFrom.line, sFrom.ch, sTo.ch);
        } else {
          var fromLine = getLine(doc2, sFrom.line), toLine = getLine(doc2, sTo.line);
          var singleVLine = visualLine(fromLine) == visualLine(toLine);
          var leftEnd = drawForLine(sFrom.line, sFrom.ch, singleVLine ? fromLine.text.length + 1 : null).end;
          var rightStart = drawForLine(sTo.line, singleVLine ? 0 : null, sTo.ch).start;
          if (singleVLine) {
            if (leftEnd.top < rightStart.top - 2) {
              add(leftEnd.right, leftEnd.top, null, leftEnd.bottom);
              add(leftSide, rightStart.top, rightStart.left, rightStart.bottom);
            } else {
              add(leftEnd.right, leftEnd.top, rightStart.left - leftEnd.right, leftEnd.bottom);
            }
          }
          if (leftEnd.bottom < rightStart.top) {
            add(leftSide, leftEnd.bottom, null, rightStart.top);
          }
        }
        output.appendChild(fragment);
      }
      function restartBlink(cm) {
        if (!cm.state.focused) {
          return;
        }
        var display = cm.display;
        clearInterval(display.blinker);
        var on2 = true;
        display.cursorDiv.style.visibility = "";
        if (cm.options.cursorBlinkRate > 0) {
          display.blinker = setInterval(function() {
            if (!cm.hasFocus()) {
              onBlur(cm);
            }
            display.cursorDiv.style.visibility = (on2 = !on2) ? "" : "hidden";
          }, cm.options.cursorBlinkRate);
        } else if (cm.options.cursorBlinkRate < 0) {
          display.cursorDiv.style.visibility = "hidden";
        }
      }
      function ensureFocus(cm) {
        if (!cm.hasFocus()) {
          cm.display.input.focus();
          if (!cm.state.focused) {
            onFocus(cm);
          }
        }
      }
      function delayBlurEvent(cm) {
        cm.state.delayingBlurEvent = true;
        setTimeout(function() {
          if (cm.state.delayingBlurEvent) {
            cm.state.delayingBlurEvent = false;
            if (cm.state.focused) {
              onBlur(cm);
            }
          }
        }, 100);
      }
      function onFocus(cm, e) {
        if (cm.state.delayingBlurEvent && !cm.state.draggingText) {
          cm.state.delayingBlurEvent = false;
        }
        if (cm.options.readOnly == "nocursor") {
          return;
        }
        if (!cm.state.focused) {
          signal(cm, "focus", cm, e);
          cm.state.focused = true;
          addClass2(cm.display.wrapper, "CodeMirror-focused");
          if (!cm.curOp && cm.display.selForContextMenu != cm.doc.sel) {
            cm.display.input.reset();
            if (webkit) {
              setTimeout(function() {
                return cm.display.input.reset(true);
              }, 20);
            }
          }
          cm.display.input.receivedFocus();
        }
        restartBlink(cm);
      }
      function onBlur(cm, e) {
        if (cm.state.delayingBlurEvent) {
          return;
        }
        if (cm.state.focused) {
          signal(cm, "blur", cm, e);
          cm.state.focused = false;
          rmClass(cm.display.wrapper, "CodeMirror-focused");
        }
        clearInterval(cm.display.blinker);
        setTimeout(function() {
          if (!cm.state.focused) {
            cm.display.shift = false;
          }
        }, 150);
      }
      function updateHeightsInViewport(cm) {
        var display = cm.display;
        var prevBottom = display.lineDiv.offsetTop;
        var viewTop = Math.max(0, display.scroller.getBoundingClientRect().top);
        var oldHeight = display.lineDiv.getBoundingClientRect().top;
        var mustScroll = 0;
        for (var i2 = 0; i2 < display.view.length; i2++) {
          var cur = display.view[i2], wrapping = cm.options.lineWrapping;
          var height = void 0, width = 0;
          if (cur.hidden) {
            continue;
          }
          oldHeight += cur.line.height;
          if (ie && ie_version < 8) {
            var bot = cur.node.offsetTop + cur.node.offsetHeight;
            height = bot - prevBottom;
            prevBottom = bot;
          } else {
            var box = cur.node.getBoundingClientRect();
            height = box.bottom - box.top;
            if (!wrapping && cur.text.firstChild) {
              width = cur.text.firstChild.getBoundingClientRect().right - box.left - 1;
            }
          }
          var diff = cur.line.height - height;
          if (diff > 5e-3 || diff < -5e-3) {
            if (oldHeight < viewTop) {
              mustScroll -= diff;
            }
            updateLineHeight(cur.line, height);
            updateWidgetHeight(cur.line);
            if (cur.rest) {
              for (var j = 0; j < cur.rest.length; j++) {
                updateWidgetHeight(cur.rest[j]);
              }
            }
          }
          if (width > cm.display.sizerWidth) {
            var chWidth = Math.ceil(width / charWidth(cm.display));
            if (chWidth > cm.display.maxLineLength) {
              cm.display.maxLineLength = chWidth;
              cm.display.maxLine = cur.line;
              cm.display.maxLineChanged = true;
            }
          }
        }
        if (Math.abs(mustScroll) > 2) {
          display.scroller.scrollTop += mustScroll;
        }
      }
      function updateWidgetHeight(line) {
        if (line.widgets) {
          for (var i2 = 0; i2 < line.widgets.length; ++i2) {
            var w = line.widgets[i2], parent = w.node.parentNode;
            if (parent) {
              w.height = parent.offsetHeight;
            }
          }
        }
      }
      function visibleLines(display, doc2, viewport) {
        var top = viewport && viewport.top != null ? Math.max(0, viewport.top) : display.scroller.scrollTop;
        top = Math.floor(top - paddingTop(display));
        var bottom = viewport && viewport.bottom != null ? viewport.bottom : top + display.wrapper.clientHeight;
        var from = lineAtHeight(doc2, top), to = lineAtHeight(doc2, bottom);
        if (viewport && viewport.ensure) {
          var ensureFrom = viewport.ensure.from.line, ensureTo = viewport.ensure.to.line;
          if (ensureFrom < from) {
            from = ensureFrom;
            to = lineAtHeight(doc2, heightAtLine(getLine(doc2, ensureFrom)) + display.wrapper.clientHeight);
          } else if (Math.min(ensureTo, doc2.lastLine()) >= to) {
            from = lineAtHeight(doc2, heightAtLine(getLine(doc2, ensureTo)) - display.wrapper.clientHeight);
            to = ensureTo;
          }
        }
        return { from, to: Math.max(to, from + 1) };
      }
      function maybeScrollWindow(cm, rect) {
        if (signalDOMEvent(cm, "scrollCursorIntoView")) {
          return;
        }
        var display = cm.display, box = display.sizer.getBoundingClientRect(), doScroll = null;
        var doc2 = display.wrapper.ownerDocument;
        if (rect.top + box.top < 0) {
          doScroll = true;
        } else if (rect.bottom + box.top > (doc2.defaultView.innerHeight || doc2.documentElement.clientHeight)) {
          doScroll = false;
        }
        if (doScroll != null && !phantom) {
          var scrollNode = elt("div", "​", null, "position: absolute;\n                         top: " + (rect.top - display.viewOffset - paddingTop(cm.display)) + "px;\n                         height: " + (rect.bottom - rect.top + scrollGap(cm) + display.barHeight) + "px;\n                         left: " + rect.left + "px; width: " + Math.max(2, rect.right - rect.left) + "px;");
          cm.display.lineSpace.appendChild(scrollNode);
          scrollNode.scrollIntoView(doScroll);
          cm.display.lineSpace.removeChild(scrollNode);
        }
      }
      function scrollPosIntoView(cm, pos, end, margin) {
        if (margin == null) {
          margin = 0;
        }
        var rect;
        if (!cm.options.lineWrapping && pos == end) {
          end = pos.sticky == "before" ? Pos(pos.line, pos.ch + 1, "before") : pos;
          pos = pos.ch ? Pos(pos.line, pos.sticky == "before" ? pos.ch - 1 : pos.ch, "after") : pos;
        }
        for (var limit = 0; limit < 5; limit++) {
          var changed = false;
          var coords = cursorCoords(cm, pos);
          var endCoords = !end || end == pos ? coords : cursorCoords(cm, end);
          rect = {
            left: Math.min(coords.left, endCoords.left),
            top: Math.min(coords.top, endCoords.top) - margin,
            right: Math.max(coords.left, endCoords.left),
            bottom: Math.max(coords.bottom, endCoords.bottom) + margin
          };
          var scrollPos = calculateScrollPos(cm, rect);
          var startTop = cm.doc.scrollTop, startLeft = cm.doc.scrollLeft;
          if (scrollPos.scrollTop != null) {
            updateScrollTop(cm, scrollPos.scrollTop);
            if (Math.abs(cm.doc.scrollTop - startTop) > 1) {
              changed = true;
            }
          }
          if (scrollPos.scrollLeft != null) {
            setScrollLeft(cm, scrollPos.scrollLeft);
            if (Math.abs(cm.doc.scrollLeft - startLeft) > 1) {
              changed = true;
            }
          }
          if (!changed) {
            break;
          }
        }
        return rect;
      }
      function scrollIntoView(cm, rect) {
        var scrollPos = calculateScrollPos(cm, rect);
        if (scrollPos.scrollTop != null) {
          updateScrollTop(cm, scrollPos.scrollTop);
        }
        if (scrollPos.scrollLeft != null) {
          setScrollLeft(cm, scrollPos.scrollLeft);
        }
      }
      function calculateScrollPos(cm, rect) {
        var display = cm.display, snapMargin = textHeight(cm.display);
        if (rect.top < 0) {
          rect.top = 0;
        }
        var screentop = cm.curOp && cm.curOp.scrollTop != null ? cm.curOp.scrollTop : display.scroller.scrollTop;
        var screen2 = displayHeight(cm), result = {};
        if (rect.bottom - rect.top > screen2) {
          rect.bottom = rect.top + screen2;
        }
        var docBottom = cm.doc.height + paddingVert(display);
        var atTop = rect.top < snapMargin, atBottom = rect.bottom > docBottom - snapMargin;
        if (rect.top < screentop) {
          result.scrollTop = atTop ? 0 : rect.top;
        } else if (rect.bottom > screentop + screen2) {
          var newTop = Math.min(rect.top, (atBottom ? docBottom : rect.bottom) - screen2);
          if (newTop != screentop) {
            result.scrollTop = newTop;
          }
        }
        var gutterSpace = cm.options.fixedGutter ? 0 : display.gutters.offsetWidth;
        var screenleft = cm.curOp && cm.curOp.scrollLeft != null ? cm.curOp.scrollLeft : display.scroller.scrollLeft - gutterSpace;
        var screenw = displayWidth(cm) - display.gutters.offsetWidth;
        var tooWide = rect.right - rect.left > screenw;
        if (tooWide) {
          rect.right = rect.left + screenw;
        }
        if (rect.left < 10) {
          result.scrollLeft = 0;
        } else if (rect.left < screenleft) {
          result.scrollLeft = Math.max(0, rect.left + gutterSpace - (tooWide ? 0 : 10));
        } else if (rect.right > screenw + screenleft - 3) {
          result.scrollLeft = rect.right + (tooWide ? 0 : 10) - screenw;
        }
        return result;
      }
      function addToScrollTop(cm, top) {
        if (top == null) {
          return;
        }
        resolveScrollToPos(cm);
        cm.curOp.scrollTop = (cm.curOp.scrollTop == null ? cm.doc.scrollTop : cm.curOp.scrollTop) + top;
      }
      function ensureCursorVisible(cm) {
        resolveScrollToPos(cm);
        var cur = cm.getCursor();
        cm.curOp.scrollToPos = { from: cur, to: cur, margin: cm.options.cursorScrollMargin };
      }
      function scrollToCoords(cm, x, y) {
        if (x != null || y != null) {
          resolveScrollToPos(cm);
        }
        if (x != null) {
          cm.curOp.scrollLeft = x;
        }
        if (y != null) {
          cm.curOp.scrollTop = y;
        }
      }
      function scrollToRange(cm, range3) {
        resolveScrollToPos(cm);
        cm.curOp.scrollToPos = range3;
      }
      function resolveScrollToPos(cm) {
        var range3 = cm.curOp.scrollToPos;
        if (range3) {
          cm.curOp.scrollToPos = null;
          var from = estimateCoords(cm, range3.from), to = estimateCoords(cm, range3.to);
          scrollToCoordsRange(cm, from, to, range3.margin);
        }
      }
      function scrollToCoordsRange(cm, from, to, margin) {
        var sPos = calculateScrollPos(cm, {
          left: Math.min(from.left, to.left),
          top: Math.min(from.top, to.top) - margin,
          right: Math.max(from.right, to.right),
          bottom: Math.max(from.bottom, to.bottom) + margin
        });
        scrollToCoords(cm, sPos.scrollLeft, sPos.scrollTop);
      }
      function updateScrollTop(cm, val) {
        if (Math.abs(cm.doc.scrollTop - val) < 2) {
          return;
        }
        if (!gecko) {
          updateDisplaySimple(cm, { top: val });
        }
        setScrollTop(cm, val, true);
        if (gecko) {
          updateDisplaySimple(cm);
        }
        startWorker(cm, 100);
      }
      function setScrollTop(cm, val, forceScroll) {
        val = Math.max(0, Math.min(cm.display.scroller.scrollHeight - cm.display.scroller.clientHeight, val));
        if (cm.display.scroller.scrollTop == val && !forceScroll) {
          return;
        }
        cm.doc.scrollTop = val;
        cm.display.scrollbars.setScrollTop(val);
        if (cm.display.scroller.scrollTop != val) {
          cm.display.scroller.scrollTop = val;
        }
      }
      function setScrollLeft(cm, val, isScroller, forceScroll) {
        val = Math.max(0, Math.min(val, cm.display.scroller.scrollWidth - cm.display.scroller.clientWidth));
        if ((isScroller ? val == cm.doc.scrollLeft : Math.abs(cm.doc.scrollLeft - val) < 2) && !forceScroll) {
          return;
        }
        cm.doc.scrollLeft = val;
        alignHorizontally(cm);
        if (cm.display.scroller.scrollLeft != val) {
          cm.display.scroller.scrollLeft = val;
        }
        cm.display.scrollbars.setScrollLeft(val);
      }
      function measureForScrollbars(cm) {
        var d = cm.display, gutterW = d.gutters.offsetWidth;
        var docH = Math.round(cm.doc.height + paddingVert(cm.display));
        return {
          clientHeight: d.scroller.clientHeight,
          viewHeight: d.wrapper.clientHeight,
          scrollWidth: d.scroller.scrollWidth,
          clientWidth: d.scroller.clientWidth,
          viewWidth: d.wrapper.clientWidth,
          barLeft: cm.options.fixedGutter ? gutterW : 0,
          docHeight: docH,
          scrollHeight: docH + scrollGap(cm) + d.barHeight,
          nativeBarWidth: d.nativeBarWidth,
          gutterWidth: gutterW
        };
      }
      var NativeScrollbars = function(place, scroll, cm) {
        this.cm = cm;
        var vert = this.vert = elt("div", [elt("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar");
        var horiz = this.horiz = elt("div", [elt("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
        vert.tabIndex = horiz.tabIndex = -1;
        place(vert);
        place(horiz);
        on(vert, "scroll", function() {
          if (vert.clientHeight) {
            scroll(vert.scrollTop, "vertical");
          }
        });
        on(horiz, "scroll", function() {
          if (horiz.clientWidth) {
            scroll(horiz.scrollLeft, "horizontal");
          }
        });
        this.checkedZeroWidth = false;
        if (ie && ie_version < 8) {
          this.horiz.style.minHeight = this.vert.style.minWidth = "18px";
        }
      };
      NativeScrollbars.prototype.update = function(measure) {
        var needsH = measure.scrollWidth > measure.clientWidth + 1;
        var needsV = measure.scrollHeight > measure.clientHeight + 1;
        var sWidth = measure.nativeBarWidth;
        if (needsV) {
          this.vert.style.display = "block";
          this.vert.style.bottom = needsH ? sWidth + "px" : "0";
          var totalHeight = measure.viewHeight - (needsH ? sWidth : 0);
          this.vert.firstChild.style.height = Math.max(0, measure.scrollHeight - measure.clientHeight + totalHeight) + "px";
        } else {
          this.vert.scrollTop = 0;
          this.vert.style.display = "";
          this.vert.firstChild.style.height = "0";
        }
        if (needsH) {
          this.horiz.style.display = "block";
          this.horiz.style.right = needsV ? sWidth + "px" : "0";
          this.horiz.style.left = measure.barLeft + "px";
          var totalWidth = measure.viewWidth - measure.barLeft - (needsV ? sWidth : 0);
          this.horiz.firstChild.style.width = Math.max(0, measure.scrollWidth - measure.clientWidth + totalWidth) + "px";
        } else {
          this.horiz.style.display = "";
          this.horiz.firstChild.style.width = "0";
        }
        if (!this.checkedZeroWidth && measure.clientHeight > 0) {
          if (sWidth == 0) {
            this.zeroWidthHack();
          }
          this.checkedZeroWidth = true;
        }
        return { right: needsV ? sWidth : 0, bottom: needsH ? sWidth : 0 };
      };
      NativeScrollbars.prototype.setScrollLeft = function(pos) {
        if (this.horiz.scrollLeft != pos) {
          this.horiz.scrollLeft = pos;
        }
        if (this.disableHoriz) {
          this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
        }
      };
      NativeScrollbars.prototype.setScrollTop = function(pos) {
        if (this.vert.scrollTop != pos) {
          this.vert.scrollTop = pos;
        }
        if (this.disableVert) {
          this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
        }
      };
      NativeScrollbars.prototype.zeroWidthHack = function() {
        var w = mac && !mac_geMountainLion ? "12px" : "18px";
        this.horiz.style.height = this.vert.style.width = w;
        this.horiz.style.visibility = this.vert.style.visibility = "hidden";
        this.disableHoriz = new Delayed();
        this.disableVert = new Delayed();
      };
      NativeScrollbars.prototype.enableZeroWidthBar = function(bar, delay, type) {
        bar.style.visibility = "";
        function maybeDisable() {
          var box = bar.getBoundingClientRect();
          var elt2 = type == "vert" ? document.elementFromPoint(box.right - 1, (box.top + box.bottom) / 2) : document.elementFromPoint((box.right + box.left) / 2, box.bottom - 1);
          if (elt2 != bar) {
            bar.style.visibility = "hidden";
          } else {
            delay.set(1e3, maybeDisable);
          }
        }
        delay.set(1e3, maybeDisable);
      };
      NativeScrollbars.prototype.clear = function() {
        var parent = this.horiz.parentNode;
        parent.removeChild(this.horiz);
        parent.removeChild(this.vert);
      };
      var NullScrollbars = function() {
      };
      NullScrollbars.prototype.update = function() {
        return { bottom: 0, right: 0 };
      };
      NullScrollbars.prototype.setScrollLeft = function() {
      };
      NullScrollbars.prototype.setScrollTop = function() {
      };
      NullScrollbars.prototype.clear = function() {
      };
      function updateScrollbars(cm, measure) {
        if (!measure) {
          measure = measureForScrollbars(cm);
        }
        var startWidth = cm.display.barWidth, startHeight = cm.display.barHeight;
        updateScrollbarsInner(cm, measure);
        for (var i2 = 0; i2 < 4 && startWidth != cm.display.barWidth || startHeight != cm.display.barHeight; i2++) {
          if (startWidth != cm.display.barWidth && cm.options.lineWrapping) {
            updateHeightsInViewport(cm);
          }
          updateScrollbarsInner(cm, measureForScrollbars(cm));
          startWidth = cm.display.barWidth;
          startHeight = cm.display.barHeight;
        }
      }
      function updateScrollbarsInner(cm, measure) {
        var d = cm.display;
        var sizes = d.scrollbars.update(measure);
        d.sizer.style.paddingRight = (d.barWidth = sizes.right) + "px";
        d.sizer.style.paddingBottom = (d.barHeight = sizes.bottom) + "px";
        d.heightForcer.style.borderBottom = sizes.bottom + "px solid transparent";
        if (sizes.right && sizes.bottom) {
          d.scrollbarFiller.style.display = "block";
          d.scrollbarFiller.style.height = sizes.bottom + "px";
          d.scrollbarFiller.style.width = sizes.right + "px";
        } else {
          d.scrollbarFiller.style.display = "";
        }
        if (sizes.bottom && cm.options.coverGutterNextToScrollbar && cm.options.fixedGutter) {
          d.gutterFiller.style.display = "block";
          d.gutterFiller.style.height = sizes.bottom + "px";
          d.gutterFiller.style.width = measure.gutterWidth + "px";
        } else {
          d.gutterFiller.style.display = "";
        }
      }
      var scrollbarModel = { "native": NativeScrollbars, "null": NullScrollbars };
      function initScrollbars(cm) {
        if (cm.display.scrollbars) {
          cm.display.scrollbars.clear();
          if (cm.display.scrollbars.addClass) {
            rmClass(cm.display.wrapper, cm.display.scrollbars.addClass);
          }
        }
        cm.display.scrollbars = new scrollbarModel[cm.options.scrollbarStyle](function(node) {
          cm.display.wrapper.insertBefore(node, cm.display.scrollbarFiller);
          on(node, "mousedown", function() {
            if (cm.state.focused) {
              setTimeout(function() {
                return cm.display.input.focus();
              }, 0);
            }
          });
          node.setAttribute("cm-not-content", "true");
        }, function(pos, axis) {
          if (axis == "horizontal") {
            setScrollLeft(cm, pos);
          } else {
            updateScrollTop(cm, pos);
          }
        }, cm);
        if (cm.display.scrollbars.addClass) {
          addClass2(cm.display.wrapper, cm.display.scrollbars.addClass);
        }
      }
      var nextOpId = 0;
      function startOperation(cm) {
        cm.curOp = {
          cm,
          viewChanged: false,
          // Flag that indicates that lines might need to be redrawn
          startHeight: cm.doc.height,
          // Used to detect need to update scrollbar
          forceUpdate: false,
          // Used to force a redraw
          updateInput: 0,
          // Whether to reset the input textarea
          typing: false,
          // Whether this reset should be careful to leave existing text (for compositing)
          changeObjs: null,
          // Accumulated changes, for firing change events
          cursorActivityHandlers: null,
          // Set of handlers to fire cursorActivity on
          cursorActivityCalled: 0,
          // Tracks which cursorActivity handlers have been called already
          selectionChanged: false,
          // Whether the selection needs to be redrawn
          updateMaxLine: false,
          // Set when the widest line needs to be determined anew
          scrollLeft: null,
          scrollTop: null,
          // Intermediate scroll position, not pushed to DOM yet
          scrollToPos: null,
          // Used to scroll to a specific position
          focus: false,
          id: ++nextOpId,
          // Unique ID
          markArrays: null
          // Used by addMarkedSpan
        };
        pushOperation(cm.curOp);
      }
      function endOperation(cm) {
        var op = cm.curOp;
        if (op) {
          finishOperation(op, function(group) {
            for (var i2 = 0; i2 < group.ops.length; i2++) {
              group.ops[i2].cm.curOp = null;
            }
            endOperations(group);
          });
        }
      }
      function endOperations(group) {
        var ops = group.ops;
        for (var i2 = 0; i2 < ops.length; i2++) {
          endOperation_R1(ops[i2]);
        }
        for (var i$12 = 0; i$12 < ops.length; i$12++) {
          endOperation_W1(ops[i$12]);
        }
        for (var i$22 = 0; i$22 < ops.length; i$22++) {
          endOperation_R2(ops[i$22]);
        }
        for (var i$3 = 0; i$3 < ops.length; i$3++) {
          endOperation_W2(ops[i$3]);
        }
        for (var i$4 = 0; i$4 < ops.length; i$4++) {
          endOperation_finish(ops[i$4]);
        }
      }
      function endOperation_R1(op) {
        var cm = op.cm, display = cm.display;
        maybeClipScrollbars(cm);
        if (op.updateMaxLine) {
          findMaxLine(cm);
        }
        op.mustUpdate = op.viewChanged || op.forceUpdate || op.scrollTop != null || op.scrollToPos && (op.scrollToPos.from.line < display.viewFrom || op.scrollToPos.to.line >= display.viewTo) || display.maxLineChanged && cm.options.lineWrapping;
        op.update = op.mustUpdate && new DisplayUpdate(cm, op.mustUpdate && { top: op.scrollTop, ensure: op.scrollToPos }, op.forceUpdate);
      }
      function endOperation_W1(op) {
        op.updatedDisplay = op.mustUpdate && updateDisplayIfNeeded(op.cm, op.update);
      }
      function endOperation_R2(op) {
        var cm = op.cm, display = cm.display;
        if (op.updatedDisplay) {
          updateHeightsInViewport(cm);
        }
        op.barMeasure = measureForScrollbars(cm);
        if (display.maxLineChanged && !cm.options.lineWrapping) {
          op.adjustWidthTo = measureChar(cm, display.maxLine, display.maxLine.text.length).left + 3;
          cm.display.sizerWidth = op.adjustWidthTo;
          op.barMeasure.scrollWidth = Math.max(display.scroller.clientWidth, display.sizer.offsetLeft + op.adjustWidthTo + scrollGap(cm) + cm.display.barWidth);
          op.maxScrollLeft = Math.max(0, display.sizer.offsetLeft + op.adjustWidthTo - displayWidth(cm));
        }
        if (op.updatedDisplay || op.selectionChanged) {
          op.preparedSelection = display.input.prepareSelection();
        }
      }
      function endOperation_W2(op) {
        var cm = op.cm;
        if (op.adjustWidthTo != null) {
          cm.display.sizer.style.minWidth = op.adjustWidthTo + "px";
          if (op.maxScrollLeft < cm.doc.scrollLeft) {
            setScrollLeft(cm, Math.min(cm.display.scroller.scrollLeft, op.maxScrollLeft), true);
          }
          cm.display.maxLineChanged = false;
        }
        var takeFocus = op.focus && op.focus == activeElt(root2(cm));
        if (op.preparedSelection) {
          cm.display.input.showSelection(op.preparedSelection, takeFocus);
        }
        if (op.updatedDisplay || op.startHeight != cm.doc.height) {
          updateScrollbars(cm, op.barMeasure);
        }
        if (op.updatedDisplay) {
          setDocumentHeight(cm, op.barMeasure);
        }
        if (op.selectionChanged) {
          restartBlink(cm);
        }
        if (cm.state.focused && op.updateInput) {
          cm.display.input.reset(op.typing);
        }
        if (takeFocus) {
          ensureFocus(op.cm);
        }
      }
      function endOperation_finish(op) {
        var cm = op.cm, display = cm.display, doc2 = cm.doc;
        if (op.updatedDisplay) {
          postUpdateDisplay(cm, op.update);
        }
        if (display.wheelStartX != null && (op.scrollTop != null || op.scrollLeft != null || op.scrollToPos)) {
          display.wheelStartX = display.wheelStartY = null;
        }
        if (op.scrollTop != null) {
          setScrollTop(cm, op.scrollTop, op.forceScroll);
        }
        if (op.scrollLeft != null) {
          setScrollLeft(cm, op.scrollLeft, true, true);
        }
        if (op.scrollToPos) {
          var rect = scrollPosIntoView(
            cm,
            clipPos(doc2, op.scrollToPos.from),
            clipPos(doc2, op.scrollToPos.to),
            op.scrollToPos.margin
          );
          maybeScrollWindow(cm, rect);
        }
        var hidden = op.maybeHiddenMarkers, unhidden = op.maybeUnhiddenMarkers;
        if (hidden) {
          for (var i2 = 0; i2 < hidden.length; ++i2) {
            if (!hidden[i2].lines.length) {
              signal(hidden[i2], "hide");
            }
          }
        }
        if (unhidden) {
          for (var i$12 = 0; i$12 < unhidden.length; ++i$12) {
            if (unhidden[i$12].lines.length) {
              signal(unhidden[i$12], "unhide");
            }
          }
        }
        if (display.wrapper.offsetHeight) {
          doc2.scrollTop = cm.display.scroller.scrollTop;
        }
        if (op.changeObjs) {
          signal(cm, "changes", cm, op.changeObjs);
        }
        if (op.update) {
          op.update.finish();
        }
      }
      function runInOp(cm, f) {
        if (cm.curOp) {
          return f();
        }
        startOperation(cm);
        try {
          return f();
        } finally {
          endOperation(cm);
        }
      }
      function operation(cm, f) {
        return function() {
          if (cm.curOp) {
            return f.apply(cm, arguments);
          }
          startOperation(cm);
          try {
            return f.apply(cm, arguments);
          } finally {
            endOperation(cm);
          }
        };
      }
      function methodOp(f) {
        return function() {
          if (this.curOp) {
            return f.apply(this, arguments);
          }
          startOperation(this);
          try {
            return f.apply(this, arguments);
          } finally {
            endOperation(this);
          }
        };
      }
      function docMethodOp(f) {
        return function() {
          var cm = this.cm;
          if (!cm || cm.curOp) {
            return f.apply(this, arguments);
          }
          startOperation(cm);
          try {
            return f.apply(this, arguments);
          } finally {
            endOperation(cm);
          }
        };
      }
      function startWorker(cm, time) {
        if (cm.doc.highlightFrontier < cm.display.viewTo) {
          cm.state.highlight.set(time, bind2(highlightWorker, cm));
        }
      }
      function highlightWorker(cm) {
        var doc2 = cm.doc;
        if (doc2.highlightFrontier >= cm.display.viewTo) {
          return;
        }
        var end = +/* @__PURE__ */ new Date() + cm.options.workTime;
        var context = getContextBefore(cm, doc2.highlightFrontier);
        var changedLines = [];
        doc2.iter(context.line, Math.min(doc2.first + doc2.size, cm.display.viewTo + 500), function(line) {
          if (context.line >= cm.display.viewFrom) {
            var oldStyles = line.styles;
            var resetState = line.text.length > cm.options.maxHighlightLength ? copyState(doc2.mode, context.state) : null;
            var highlighted = highlightLine(cm, line, context, true);
            if (resetState) {
              context.state = resetState;
            }
            line.styles = highlighted.styles;
            var oldCls = line.styleClasses, newCls = highlighted.classes;
            if (newCls) {
              line.styleClasses = newCls;
            } else if (oldCls) {
              line.styleClasses = null;
            }
            var ischange = !oldStyles || oldStyles.length != line.styles.length || oldCls != newCls && (!oldCls || !newCls || oldCls.bgClass != newCls.bgClass || oldCls.textClass != newCls.textClass);
            for (var i2 = 0; !ischange && i2 < oldStyles.length; ++i2) {
              ischange = oldStyles[i2] != line.styles[i2];
            }
            if (ischange) {
              changedLines.push(context.line);
            }
            line.stateAfter = context.save();
            context.nextLine();
          } else {
            if (line.text.length <= cm.options.maxHighlightLength) {
              processLine(cm, line.text, context);
            }
            line.stateAfter = context.line % 5 == 0 ? context.save() : null;
            context.nextLine();
          }
          if (+/* @__PURE__ */ new Date() > end) {
            startWorker(cm, cm.options.workDelay);
            return true;
          }
        });
        doc2.highlightFrontier = context.line;
        doc2.modeFrontier = Math.max(doc2.modeFrontier, context.line);
        if (changedLines.length) {
          runInOp(cm, function() {
            for (var i2 = 0; i2 < changedLines.length; i2++) {
              regLineChange(cm, changedLines[i2], "text");
            }
          });
        }
      }
      var DisplayUpdate = function(cm, viewport, force) {
        var display = cm.display;
        this.viewport = viewport;
        this.visible = visibleLines(display, cm.doc, viewport);
        this.editorIsHidden = !display.wrapper.offsetWidth;
        this.wrapperHeight = display.wrapper.clientHeight;
        this.wrapperWidth = display.wrapper.clientWidth;
        this.oldDisplayWidth = displayWidth(cm);
        this.force = force;
        this.dims = getDimensions(cm);
        this.events = [];
      };
      DisplayUpdate.prototype.signal = function(emitter, type) {
        if (hasHandler(emitter, type)) {
          this.events.push(arguments);
        }
      };
      DisplayUpdate.prototype.finish = function() {
        for (var i2 = 0; i2 < this.events.length; i2++) {
          signal.apply(null, this.events[i2]);
        }
      };
      function maybeClipScrollbars(cm) {
        var display = cm.display;
        if (!display.scrollbarsClipped && display.scroller.offsetWidth) {
          display.nativeBarWidth = display.scroller.offsetWidth - display.scroller.clientWidth;
          display.heightForcer.style.height = scrollGap(cm) + "px";
          display.sizer.style.marginBottom = -display.nativeBarWidth + "px";
          display.sizer.style.borderRightWidth = scrollGap(cm) + "px";
          display.scrollbarsClipped = true;
        }
      }
      function selectionSnapshot(cm) {
        if (cm.hasFocus()) {
          return null;
        }
        var active = activeElt(root2(cm));
        if (!active || !contains(cm.display.lineDiv, active)) {
          return null;
        }
        var result = { activeElt: active };
        if (window.getSelection) {
          var sel = win(cm).getSelection();
          if (sel.anchorNode && sel.extend && contains(cm.display.lineDiv, sel.anchorNode)) {
            result.anchorNode = sel.anchorNode;
            result.anchorOffset = sel.anchorOffset;
            result.focusNode = sel.focusNode;
            result.focusOffset = sel.focusOffset;
          }
        }
        return result;
      }
      function restoreSelection(snapshot) {
        if (!snapshot || !snapshot.activeElt || snapshot.activeElt == activeElt(rootNode(snapshot.activeElt))) {
          return;
        }
        snapshot.activeElt.focus();
        if (!/^(INPUT|TEXTAREA)$/.test(snapshot.activeElt.nodeName) && snapshot.anchorNode && contains(document.body, snapshot.anchorNode) && contains(document.body, snapshot.focusNode)) {
          var doc2 = snapshot.activeElt.ownerDocument;
          var sel = doc2.defaultView.getSelection(), range3 = doc2.createRange();
          range3.setEnd(snapshot.anchorNode, snapshot.anchorOffset);
          range3.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range3);
          sel.extend(snapshot.focusNode, snapshot.focusOffset);
        }
      }
      function updateDisplayIfNeeded(cm, update) {
        var display = cm.display, doc2 = cm.doc;
        if (update.editorIsHidden) {
          resetView(cm);
          return false;
        }
        if (!update.force && update.visible.from >= display.viewFrom && update.visible.to <= display.viewTo && (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo) && display.renderedView == display.view && countDirtyView(cm) == 0) {
          return false;
        }
        if (maybeUpdateLineNumberWidth(cm)) {
          resetView(cm);
          update.dims = getDimensions(cm);
        }
        var end = doc2.first + doc2.size;
        var from = Math.max(update.visible.from - cm.options.viewportMargin, doc2.first);
        var to = Math.min(end, update.visible.to + cm.options.viewportMargin);
        if (display.viewFrom < from && from - display.viewFrom < 20) {
          from = Math.max(doc2.first, display.viewFrom);
        }
        if (display.viewTo > to && display.viewTo - to < 20) {
          to = Math.min(end, display.viewTo);
        }
        if (sawCollapsedSpans) {
          from = visualLineNo(cm.doc, from);
          to = visualLineEndNo(cm.doc, to);
        }
        var different = from != display.viewFrom || to != display.viewTo || display.lastWrapHeight != update.wrapperHeight || display.lastWrapWidth != update.wrapperWidth;
        adjustView(cm, from, to);
        display.viewOffset = heightAtLine(getLine(cm.doc, display.viewFrom));
        cm.display.mover.style.top = display.viewOffset + "px";
        var toUpdate = countDirtyView(cm);
        if (!different && toUpdate == 0 && !update.force && display.renderedView == display.view && (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo)) {
          return false;
        }
        var selSnapshot = selectionSnapshot(cm);
        if (toUpdate > 4) {
          display.lineDiv.style.display = "none";
        }
        patchDisplay(cm, display.updateLineNumbers, update.dims);
        if (toUpdate > 4) {
          display.lineDiv.style.display = "";
        }
        display.renderedView = display.view;
        restoreSelection(selSnapshot);
        removeChildren(display.cursorDiv);
        removeChildren(display.selectionDiv);
        display.gutters.style.height = display.sizer.style.minHeight = 0;
        if (different) {
          display.lastWrapHeight = update.wrapperHeight;
          display.lastWrapWidth = update.wrapperWidth;
          startWorker(cm, 400);
        }
        display.updateLineNumbers = null;
        return true;
      }
      function postUpdateDisplay(cm, update) {
        var viewport = update.viewport;
        for (var first = true; ; first = false) {
          if (!first || !cm.options.lineWrapping || update.oldDisplayWidth == displayWidth(cm)) {
            if (viewport && viewport.top != null) {
              viewport = { top: Math.min(cm.doc.height + paddingVert(cm.display) - displayHeight(cm), viewport.top) };
            }
            update.visible = visibleLines(cm.display, cm.doc, viewport);
            if (update.visible.from >= cm.display.viewFrom && update.visible.to <= cm.display.viewTo) {
              break;
            }
          } else if (first) {
            update.visible = visibleLines(cm.display, cm.doc, viewport);
          }
          if (!updateDisplayIfNeeded(cm, update)) {
            break;
          }
          updateHeightsInViewport(cm);
          var barMeasure = measureForScrollbars(cm);
          updateSelection(cm);
          updateScrollbars(cm, barMeasure);
          setDocumentHeight(cm, barMeasure);
          update.force = false;
        }
        update.signal(cm, "update", cm);
        if (cm.display.viewFrom != cm.display.reportedViewFrom || cm.display.viewTo != cm.display.reportedViewTo) {
          update.signal(cm, "viewportChange", cm, cm.display.viewFrom, cm.display.viewTo);
          cm.display.reportedViewFrom = cm.display.viewFrom;
          cm.display.reportedViewTo = cm.display.viewTo;
        }
      }
      function updateDisplaySimple(cm, viewport) {
        var update = new DisplayUpdate(cm, viewport);
        if (updateDisplayIfNeeded(cm, update)) {
          updateHeightsInViewport(cm);
          postUpdateDisplay(cm, update);
          var barMeasure = measureForScrollbars(cm);
          updateSelection(cm);
          updateScrollbars(cm, barMeasure);
          setDocumentHeight(cm, barMeasure);
          update.finish();
        }
      }
      function patchDisplay(cm, updateNumbersFrom, dims) {
        var display = cm.display, lineNumbers = cm.options.lineNumbers;
        var container = display.lineDiv, cur = container.firstChild;
        function rm(node2) {
          var next = node2.nextSibling;
          if (webkit && mac && cm.display.currentWheelTarget == node2) {
            node2.style.display = "none";
          } else {
            node2.parentNode.removeChild(node2);
          }
          return next;
        }
        var view = display.view, lineN = display.viewFrom;
        for (var i2 = 0; i2 < view.length; i2++) {
          var lineView = view[i2];
          if (lineView.hidden) ;
          else if (!lineView.node || lineView.node.parentNode != container) {
            var node = buildLineElement(cm, lineView, lineN, dims);
            container.insertBefore(node, cur);
          } else {
            while (cur != lineView.node) {
              cur = rm(cur);
            }
            var updateNumber = lineNumbers && updateNumbersFrom != null && updateNumbersFrom <= lineN && lineView.lineNumber;
            if (lineView.changes) {
              if (indexOf(lineView.changes, "gutter") > -1) {
                updateNumber = false;
              }
              updateLineForChanges(cm, lineView, lineN, dims);
            }
            if (updateNumber) {
              removeChildren(lineView.lineNumber);
              lineView.lineNumber.appendChild(document.createTextNode(lineNumberFor(cm.options, lineN)));
            }
            cur = lineView.node.nextSibling;
          }
          lineN += lineView.size;
        }
        while (cur) {
          cur = rm(cur);
        }
      }
      function updateGutterSpace(display) {
        var width = display.gutters.offsetWidth;
        display.sizer.style.marginLeft = width + "px";
        signalLater(display, "gutterChanged", display);
      }
      function setDocumentHeight(cm, measure) {
        cm.display.sizer.style.minHeight = measure.docHeight + "px";
        cm.display.heightForcer.style.top = measure.docHeight + "px";
        cm.display.gutters.style.height = measure.docHeight + cm.display.barHeight + scrollGap(cm) + "px";
      }
      function alignHorizontally(cm) {
        var display = cm.display, view = display.view;
        if (!display.alignWidgets && (!display.gutters.firstChild || !cm.options.fixedGutter)) {
          return;
        }
        var comp = compensateForHScroll(display) - display.scroller.scrollLeft + cm.doc.scrollLeft;
        var gutterW = display.gutters.offsetWidth, left = comp + "px";
        for (var i2 = 0; i2 < view.length; i2++) {
          if (!view[i2].hidden) {
            if (cm.options.fixedGutter) {
              if (view[i2].gutter) {
                view[i2].gutter.style.left = left;
              }
              if (view[i2].gutterBackground) {
                view[i2].gutterBackground.style.left = left;
              }
            }
            var align = view[i2].alignable;
            if (align) {
              for (var j = 0; j < align.length; j++) {
                align[j].style.left = left;
              }
            }
          }
        }
        if (cm.options.fixedGutter) {
          display.gutters.style.left = comp + gutterW + "px";
        }
      }
      function maybeUpdateLineNumberWidth(cm) {
        if (!cm.options.lineNumbers) {
          return false;
        }
        var doc2 = cm.doc, last = lineNumberFor(cm.options, doc2.first + doc2.size - 1), display = cm.display;
        if (last.length != display.lineNumChars) {
          var test = display.measure.appendChild(elt(
            "div",
            [elt("div", last)],
            "CodeMirror-linenumber CodeMirror-gutter-elt"
          ));
          var innerW = test.firstChild.offsetWidth, padding = test.offsetWidth - innerW;
          display.lineGutter.style.width = "";
          display.lineNumInnerWidth = Math.max(innerW, display.lineGutter.offsetWidth - padding) + 1;
          display.lineNumWidth = display.lineNumInnerWidth + padding;
          display.lineNumChars = display.lineNumInnerWidth ? last.length : -1;
          display.lineGutter.style.width = display.lineNumWidth + "px";
          updateGutterSpace(cm.display);
          return true;
        }
        return false;
      }
      function getGutters(gutters, lineNumbers) {
        var result = [], sawLineNumbers = false;
        for (var i2 = 0; i2 < gutters.length; i2++) {
          var name = gutters[i2], style = null;
          if (typeof name != "string") {
            style = name.style;
            name = name.className;
          }
          if (name == "CodeMirror-linenumbers") {
            if (!lineNumbers) {
              continue;
            } else {
              sawLineNumbers = true;
            }
          }
          result.push({ className: name, style });
        }
        if (lineNumbers && !sawLineNumbers) {
          result.push({ className: "CodeMirror-linenumbers", style: null });
        }
        return result;
      }
      function renderGutters(display) {
        var gutters = display.gutters, specs = display.gutterSpecs;
        removeChildren(gutters);
        display.lineGutter = null;
        for (var i2 = 0; i2 < specs.length; ++i2) {
          var ref2 = specs[i2];
          var className = ref2.className;
          var style = ref2.style;
          var gElt = gutters.appendChild(elt("div", null, "CodeMirror-gutter " + className));
          if (style) {
            gElt.style.cssText = style;
          }
          if (className == "CodeMirror-linenumbers") {
            display.lineGutter = gElt;
            gElt.style.width = (display.lineNumWidth || 1) + "px";
          }
        }
        gutters.style.display = specs.length ? "" : "none";
        updateGutterSpace(display);
      }
      function updateGutters(cm) {
        renderGutters(cm.display);
        regChange(cm);
        alignHorizontally(cm);
      }
      function Display(place, doc2, input, options) {
        var d = this;
        this.input = input;
        d.scrollbarFiller = elt("div", null, "CodeMirror-scrollbar-filler");
        d.scrollbarFiller.setAttribute("cm-not-content", "true");
        d.gutterFiller = elt("div", null, "CodeMirror-gutter-filler");
        d.gutterFiller.setAttribute("cm-not-content", "true");
        d.lineDiv = eltP("div", null, "CodeMirror-code");
        d.selectionDiv = elt("div", null, null, "position: relative; z-index: 1");
        d.cursorDiv = elt("div", null, "CodeMirror-cursors");
        d.measure = elt("div", null, "CodeMirror-measure");
        d.lineMeasure = elt("div", null, "CodeMirror-measure");
        d.lineSpace = eltP(
          "div",
          [d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv],
          null,
          "position: relative; outline: none"
        );
        var lines = eltP("div", [d.lineSpace], "CodeMirror-lines");
        d.mover = elt("div", [lines], null, "position: relative");
        d.sizer = elt("div", [d.mover], "CodeMirror-sizer");
        d.sizerWidth = null;
        d.heightForcer = elt("div", null, null, "position: absolute; height: " + scrollerGap + "px; width: 1px;");
        d.gutters = elt("div", null, "CodeMirror-gutters");
        d.lineGutter = null;
        d.scroller = elt("div", [d.sizer, d.heightForcer, d.gutters], "CodeMirror-scroll");
        d.scroller.setAttribute("tabIndex", "-1");
        d.wrapper = elt("div", [d.scrollbarFiller, d.gutterFiller, d.scroller], "CodeMirror");
        if (chrome && chrome_version === 105) {
          d.wrapper.style.clipPath = "inset(0px)";
        }
        d.wrapper.setAttribute("translate", "no");
        if (ie && ie_version < 8) {
          d.gutters.style.zIndex = -1;
          d.scroller.style.paddingRight = 0;
        }
        if (!webkit && !(gecko && mobile)) {
          d.scroller.draggable = true;
        }
        if (place) {
          if (place.appendChild) {
            place.appendChild(d.wrapper);
          } else {
            place(d.wrapper);
          }
        }
        d.viewFrom = d.viewTo = doc2.first;
        d.reportedViewFrom = d.reportedViewTo = doc2.first;
        d.view = [];
        d.renderedView = null;
        d.externalMeasured = null;
        d.viewOffset = 0;
        d.lastWrapHeight = d.lastWrapWidth = 0;
        d.updateLineNumbers = null;
        d.nativeBarWidth = d.barHeight = d.barWidth = 0;
        d.scrollbarsClipped = false;
        d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null;
        d.alignWidgets = false;
        d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
        d.maxLine = null;
        d.maxLineLength = 0;
        d.maxLineChanged = false;
        d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null;
        d.shift = false;
        d.selForContextMenu = null;
        d.activeTouch = null;
        d.gutterSpecs = getGutters(options.gutters, options.lineNumbers);
        renderGutters(d);
        input.init(d);
      }
      var wheelSamples = 0, wheelPixelsPerUnit = null;
      if (ie) {
        wheelPixelsPerUnit = -0.53;
      } else if (gecko) {
        wheelPixelsPerUnit = 15;
      } else if (chrome) {
        wheelPixelsPerUnit = -0.7;
      } else if (safari) {
        wheelPixelsPerUnit = -1 / 3;
      }
      function wheelEventDelta(e) {
        var dx = e.wheelDeltaX, dy = e.wheelDeltaY;
        if (dx == null && e.detail && e.axis == e.HORIZONTAL_AXIS) {
          dx = e.detail;
        }
        if (dy == null && e.detail && e.axis == e.VERTICAL_AXIS) {
          dy = e.detail;
        } else if (dy == null) {
          dy = e.wheelDelta;
        }
        return { x: dx, y: dy };
      }
      function wheelEventPixels(e) {
        var delta = wheelEventDelta(e);
        delta.x *= wheelPixelsPerUnit;
        delta.y *= wheelPixelsPerUnit;
        return delta;
      }
      function onScrollWheel(cm, e) {
        if (chrome && chrome_version == 102) {
          if (cm.display.chromeScrollHack == null) {
            cm.display.sizer.style.pointerEvents = "none";
          } else {
            clearTimeout(cm.display.chromeScrollHack);
          }
          cm.display.chromeScrollHack = setTimeout(function() {
            cm.display.chromeScrollHack = null;
            cm.display.sizer.style.pointerEvents = "";
          }, 100);
        }
        var delta = wheelEventDelta(e), dx = delta.x, dy = delta.y;
        var pixelsPerUnit = wheelPixelsPerUnit;
        if (e.deltaMode === 0) {
          dx = e.deltaX;
          dy = e.deltaY;
          pixelsPerUnit = 1;
        }
        var display = cm.display, scroll = display.scroller;
        var canScrollX = scroll.scrollWidth > scroll.clientWidth;
        var canScrollY = scroll.scrollHeight > scroll.clientHeight;
        if (!(dx && canScrollX || dy && canScrollY)) {
          return;
        }
        if (dy && mac && webkit) {
          outer: for (var cur = e.target, view = display.view; cur != scroll; cur = cur.parentNode) {
            for (var i2 = 0; i2 < view.length; i2++) {
              if (view[i2].node == cur) {
                cm.display.currentWheelTarget = cur;
                break outer;
              }
            }
          }
        }
        if (dx && !gecko && !presto && pixelsPerUnit != null) {
          if (dy && canScrollY) {
            updateScrollTop(cm, Math.max(0, scroll.scrollTop + dy * pixelsPerUnit));
          }
          setScrollLeft(cm, Math.max(0, scroll.scrollLeft + dx * pixelsPerUnit));
          if (!dy || dy && canScrollY) {
            e_preventDefault(e);
          }
          display.wheelStartX = null;
          return;
        }
        if (dy && pixelsPerUnit != null) {
          var pixels = dy * pixelsPerUnit;
          var top = cm.doc.scrollTop, bot = top + display.wrapper.clientHeight;
          if (pixels < 0) {
            top = Math.max(0, top + pixels - 50);
          } else {
            bot = Math.min(cm.doc.height, bot + pixels + 50);
          }
          updateDisplaySimple(cm, { top, bottom: bot });
        }
        if (wheelSamples < 20 && e.deltaMode !== 0) {
          if (display.wheelStartX == null) {
            display.wheelStartX = scroll.scrollLeft;
            display.wheelStartY = scroll.scrollTop;
            display.wheelDX = dx;
            display.wheelDY = dy;
            setTimeout(function() {
              if (display.wheelStartX == null) {
                return;
              }
              var movedX = scroll.scrollLeft - display.wheelStartX;
              var movedY = scroll.scrollTop - display.wheelStartY;
              var sample = movedY && display.wheelDY && movedY / display.wheelDY || movedX && display.wheelDX && movedX / display.wheelDX;
              display.wheelStartX = display.wheelStartY = null;
              if (!sample) {
                return;
              }
              wheelPixelsPerUnit = (wheelPixelsPerUnit * wheelSamples + sample) / (wheelSamples + 1);
              ++wheelSamples;
            }, 200);
          } else {
            display.wheelDX += dx;
            display.wheelDY += dy;
          }
        }
      }
      var Selection = function(ranges, primIndex) {
        this.ranges = ranges;
        this.primIndex = primIndex;
      };
      Selection.prototype.primary = function() {
        return this.ranges[this.primIndex];
      };
      Selection.prototype.equals = function(other) {
        if (other == this) {
          return true;
        }
        if (other.primIndex != this.primIndex || other.ranges.length != this.ranges.length) {
          return false;
        }
        for (var i2 = 0; i2 < this.ranges.length; i2++) {
          var here = this.ranges[i2], there = other.ranges[i2];
          if (!equalCursorPos(here.anchor, there.anchor) || !equalCursorPos(here.head, there.head)) {
            return false;
          }
        }
        return true;
      };
      Selection.prototype.deepCopy = function() {
        var out = [];
        for (var i2 = 0; i2 < this.ranges.length; i2++) {
          out[i2] = new Range(copyPos(this.ranges[i2].anchor), copyPos(this.ranges[i2].head));
        }
        return new Selection(out, this.primIndex);
      };
      Selection.prototype.somethingSelected = function() {
        for (var i2 = 0; i2 < this.ranges.length; i2++) {
          if (!this.ranges[i2].empty()) {
            return true;
          }
        }
        return false;
      };
      Selection.prototype.contains = function(pos, end) {
        if (!end) {
          end = pos;
        }
        for (var i2 = 0; i2 < this.ranges.length; i2++) {
          var range3 = this.ranges[i2];
          if (cmp(end, range3.from()) >= 0 && cmp(pos, range3.to()) <= 0) {
            return i2;
          }
        }
        return -1;
      };
      var Range = function(anchor, head) {
        this.anchor = anchor;
        this.head = head;
      };
      Range.prototype.from = function() {
        return minPos(this.anchor, this.head);
      };
      Range.prototype.to = function() {
        return maxPos(this.anchor, this.head);
      };
      Range.prototype.empty = function() {
        return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
      };
      function normalizeSelection(cm, ranges, primIndex) {
        var mayTouch = cm && cm.options.selectionsMayTouch;
        var prim = ranges[primIndex];
        ranges.sort(function(a, b) {
          return cmp(a.from(), b.from());
        });
        primIndex = indexOf(ranges, prim);
        for (var i2 = 1; i2 < ranges.length; i2++) {
          var cur = ranges[i2], prev = ranges[i2 - 1];
          var diff = cmp(prev.to(), cur.from());
          if (mayTouch && !cur.empty() ? diff > 0 : diff >= 0) {
            var from = minPos(prev.from(), cur.from()), to = maxPos(prev.to(), cur.to());
            var inv = prev.empty() ? cur.from() == cur.head : prev.from() == prev.head;
            if (i2 <= primIndex) {
              --primIndex;
            }
            ranges.splice(--i2, 2, new Range(inv ? to : from, inv ? from : to));
          }
        }
        return new Selection(ranges, primIndex);
      }
      function simpleSelection(anchor, head) {
        return new Selection([new Range(anchor, head || anchor)], 0);
      }
      function changeEnd(change) {
        if (!change.text) {
          return change.to;
        }
        return Pos(
          change.from.line + change.text.length - 1,
          lst(change.text).length + (change.text.length == 1 ? change.from.ch : 0)
        );
      }
      function adjustForChange(pos, change) {
        if (cmp(pos, change.from) < 0) {
          return pos;
        }
        if (cmp(pos, change.to) <= 0) {
          return changeEnd(change);
        }
        var line = pos.line + change.text.length - (change.to.line - change.from.line) - 1, ch = pos.ch;
        if (pos.line == change.to.line) {
          ch += changeEnd(change).ch - change.to.ch;
        }
        return Pos(line, ch);
      }
      function computeSelAfterChange(doc2, change) {
        var out = [];
        for (var i2 = 0; i2 < doc2.sel.ranges.length; i2++) {
          var range3 = doc2.sel.ranges[i2];
          out.push(new Range(
            adjustForChange(range3.anchor, change),
            adjustForChange(range3.head, change)
          ));
        }
        return normalizeSelection(doc2.cm, out, doc2.sel.primIndex);
      }
      function offsetPos(pos, old, nw) {
        if (pos.line == old.line) {
          return Pos(nw.line, pos.ch - old.ch + nw.ch);
        } else {
          return Pos(nw.line + (pos.line - old.line), pos.ch);
        }
      }
      function computeReplacedSel(doc2, changes, hint) {
        var out = [];
        var oldPrev = Pos(doc2.first, 0), newPrev = oldPrev;
        for (var i2 = 0; i2 < changes.length; i2++) {
          var change = changes[i2];
          var from = offsetPos(change.from, oldPrev, newPrev);
          var to = offsetPos(changeEnd(change), oldPrev, newPrev);
          oldPrev = change.to;
          newPrev = to;
          if (hint == "around") {
            var range3 = doc2.sel.ranges[i2], inv = cmp(range3.head, range3.anchor) < 0;
            out[i2] = new Range(inv ? to : from, inv ? from : to);
          } else {
            out[i2] = new Range(from, from);
          }
        }
        return new Selection(out, doc2.sel.primIndex);
      }
      function loadMode(cm) {
        cm.doc.mode = getMode(cm.options, cm.doc.modeOption);
        resetModeState(cm);
      }
      function resetModeState(cm) {
        cm.doc.iter(function(line) {
          if (line.stateAfter) {
            line.stateAfter = null;
          }
          if (line.styles) {
            line.styles = null;
          }
        });
        cm.doc.modeFrontier = cm.doc.highlightFrontier = cm.doc.first;
        startWorker(cm, 100);
        cm.state.modeGen++;
        if (cm.curOp) {
          regChange(cm);
        }
      }
      function isWholeLineUpdate(doc2, change) {
        return change.from.ch == 0 && change.to.ch == 0 && lst(change.text) == "" && (!doc2.cm || doc2.cm.options.wholeLineUpdateBefore);
      }
      function updateDoc(doc2, change, markedSpans, estimateHeight2) {
        function spansFor(n) {
          return markedSpans ? markedSpans[n] : null;
        }
        function update(line, text2, spans) {
          updateLine(line, text2, spans, estimateHeight2);
          signalLater(line, "change", line, change);
        }
        function linesFor(start, end) {
          var result = [];
          for (var i2 = start; i2 < end; ++i2) {
            result.push(new Line(text[i2], spansFor(i2), estimateHeight2));
          }
          return result;
        }
        var from = change.from, to = change.to, text = change.text;
        var firstLine = getLine(doc2, from.line), lastLine = getLine(doc2, to.line);
        var lastText = lst(text), lastSpans = spansFor(text.length - 1), nlines = to.line - from.line;
        if (change.full) {
          doc2.insert(0, linesFor(0, text.length));
          doc2.remove(text.length, doc2.size - text.length);
        } else if (isWholeLineUpdate(doc2, change)) {
          var added = linesFor(0, text.length - 1);
          update(lastLine, lastLine.text, lastSpans);
          if (nlines) {
            doc2.remove(from.line, nlines);
          }
          if (added.length) {
            doc2.insert(from.line, added);
          }
        } else if (firstLine == lastLine) {
          if (text.length == 1) {
            update(firstLine, firstLine.text.slice(0, from.ch) + lastText + firstLine.text.slice(to.ch), lastSpans);
          } else {
            var added$1 = linesFor(1, text.length - 1);
            added$1.push(new Line(lastText + firstLine.text.slice(to.ch), lastSpans, estimateHeight2));
            update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
            doc2.insert(from.line + 1, added$1);
          }
        } else if (text.length == 1) {
          update(firstLine, firstLine.text.slice(0, from.ch) + text[0] + lastLine.text.slice(to.ch), spansFor(0));
          doc2.remove(from.line + 1, nlines);
        } else {
          update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
          update(lastLine, lastText + lastLine.text.slice(to.ch), lastSpans);
          var added$2 = linesFor(1, text.length - 1);
          if (nlines > 1) {
            doc2.remove(from.line + 1, nlines - 1);
          }
          doc2.insert(from.line + 1, added$2);
        }
        signalLater(doc2, "change", doc2, change);
      }
      function linkedDocs(doc2, f, sharedHistOnly) {
        function propagate(doc3, skip, sharedHist) {
          if (doc3.linked) {
            for (var i2 = 0; i2 < doc3.linked.length; ++i2) {
              var rel = doc3.linked[i2];
              if (rel.doc == skip) {
                continue;
              }
              var shared = sharedHist && rel.sharedHist;
              if (sharedHistOnly && !shared) {
                continue;
              }
              f(rel.doc, shared);
              propagate(rel.doc, doc3, shared);
            }
          }
        }
        propagate(doc2, null, true);
      }
      function attachDoc(cm, doc2) {
        if (doc2.cm) {
          throw new Error("This document is already in use.");
        }
        cm.doc = doc2;
        doc2.cm = cm;
        estimateLineHeights(cm);
        loadMode(cm);
        setDirectionClass(cm);
        cm.options.direction = doc2.direction;
        if (!cm.options.lineWrapping) {
          findMaxLine(cm);
        }
        cm.options.mode = doc2.modeOption;
        regChange(cm);
      }
      function setDirectionClass(cm) {
        (cm.doc.direction == "rtl" ? addClass2 : rmClass)(cm.display.lineDiv, "CodeMirror-rtl");
      }
      function directionChanged(cm) {
        runInOp(cm, function() {
          setDirectionClass(cm);
          regChange(cm);
        });
      }
      function History(prev) {
        this.done = [];
        this.undone = [];
        this.undoDepth = prev ? prev.undoDepth : Infinity;
        this.lastModTime = this.lastSelTime = 0;
        this.lastOp = this.lastSelOp = null;
        this.lastOrigin = this.lastSelOrigin = null;
        this.generation = this.maxGeneration = prev ? prev.maxGeneration : 1;
      }
      function historyChangeFromChange(doc2, change) {
        var histChange = { from: copyPos(change.from), to: changeEnd(change), text: getBetween(doc2, change.from, change.to) };
        attachLocalSpans(doc2, histChange, change.from.line, change.to.line + 1);
        linkedDocs(doc2, function(doc3) {
          return attachLocalSpans(doc3, histChange, change.from.line, change.to.line + 1);
        }, true);
        return histChange;
      }
      function clearSelectionEvents(array) {
        while (array.length) {
          var last = lst(array);
          if (last.ranges) {
            array.pop();
          } else {
            break;
          }
        }
      }
      function lastChangeEvent(hist, force) {
        if (force) {
          clearSelectionEvents(hist.done);
          return lst(hist.done);
        } else if (hist.done.length && !lst(hist.done).ranges) {
          return lst(hist.done);
        } else if (hist.done.length > 1 && !hist.done[hist.done.length - 2].ranges) {
          hist.done.pop();
          return lst(hist.done);
        }
      }
      function addChangeToHistory(doc2, change, selAfter, opId) {
        var hist = doc2.history;
        hist.undone.length = 0;
        var time = +/* @__PURE__ */ new Date(), cur;
        var last;
        if ((hist.lastOp == opId || hist.lastOrigin == change.origin && change.origin && (change.origin.charAt(0) == "+" && hist.lastModTime > time - (doc2.cm ? doc2.cm.options.historyEventDelay : 500) || change.origin.charAt(0) == "*")) && (cur = lastChangeEvent(hist, hist.lastOp == opId))) {
          last = lst(cur.changes);
          if (cmp(change.from, change.to) == 0 && cmp(change.from, last.to) == 0) {
            last.to = changeEnd(change);
          } else {
            cur.changes.push(historyChangeFromChange(doc2, change));
          }
        } else {
          var before = lst(hist.done);
          if (!before || !before.ranges) {
            pushSelectionToHistory(doc2.sel, hist.done);
          }
          cur = {
            changes: [historyChangeFromChange(doc2, change)],
            generation: hist.generation
          };
          hist.done.push(cur);
          while (hist.done.length > hist.undoDepth) {
            hist.done.shift();
            if (!hist.done[0].ranges) {
              hist.done.shift();
            }
          }
        }
        hist.done.push(selAfter);
        hist.generation = ++hist.maxGeneration;
        hist.lastModTime = hist.lastSelTime = time;
        hist.lastOp = hist.lastSelOp = opId;
        hist.lastOrigin = hist.lastSelOrigin = change.origin;
        if (!last) {
          signal(doc2, "historyAdded");
        }
      }
      function selectionEventCanBeMerged(doc2, origin, prev, sel) {
        var ch = origin.charAt(0);
        return ch == "*" || ch == "+" && prev.ranges.length == sel.ranges.length && prev.somethingSelected() == sel.somethingSelected() && /* @__PURE__ */ new Date() - doc2.history.lastSelTime <= (doc2.cm ? doc2.cm.options.historyEventDelay : 500);
      }
      function addSelectionToHistory(doc2, sel, opId, options) {
        var hist = doc2.history, origin = options && options.origin;
        if (opId == hist.lastSelOp || origin && hist.lastSelOrigin == origin && (hist.lastModTime == hist.lastSelTime && hist.lastOrigin == origin || selectionEventCanBeMerged(doc2, origin, lst(hist.done), sel))) {
          hist.done[hist.done.length - 1] = sel;
        } else {
          pushSelectionToHistory(sel, hist.done);
        }
        hist.lastSelTime = +/* @__PURE__ */ new Date();
        hist.lastSelOrigin = origin;
        hist.lastSelOp = opId;
        if (options && options.clearRedo !== false) {
          clearSelectionEvents(hist.undone);
        }
      }
      function pushSelectionToHistory(sel, dest) {
        var top = lst(dest);
        if (!(top && top.ranges && top.equals(sel))) {
          dest.push(sel);
        }
      }
      function attachLocalSpans(doc2, change, from, to) {
        var existing = change["spans_" + doc2.id], n = 0;
        doc2.iter(Math.max(doc2.first, from), Math.min(doc2.first + doc2.size, to), function(line) {
          if (line.markedSpans) {
            (existing || (existing = change["spans_" + doc2.id] = {}))[n] = line.markedSpans;
          }
          ++n;
        });
      }
      function removeClearedSpans(spans) {
        if (!spans) {
          return null;
        }
        var out;
        for (var i2 = 0; i2 < spans.length; ++i2) {
          if (spans[i2].marker.explicitlyCleared) {
            if (!out) {
              out = spans.slice(0, i2);
            }
          } else if (out) {
            out.push(spans[i2]);
          }
        }
        return !out ? spans : out.length ? out : null;
      }
      function getOldSpans(doc2, change) {
        var found = change["spans_" + doc2.id];
        if (!found) {
          return null;
        }
        var nw = [];
        for (var i2 = 0; i2 < change.text.length; ++i2) {
          nw.push(removeClearedSpans(found[i2]));
        }
        return nw;
      }
      function mergeOldSpans(doc2, change) {
        var old = getOldSpans(doc2, change);
        var stretched = stretchSpansOverChange(doc2, change);
        if (!old) {
          return stretched;
        }
        if (!stretched) {
          return old;
        }
        for (var i2 = 0; i2 < old.length; ++i2) {
          var oldCur = old[i2], stretchCur = stretched[i2];
          if (oldCur && stretchCur) {
            spans: for (var j = 0; j < stretchCur.length; ++j) {
              var span = stretchCur[j];
              for (var k = 0; k < oldCur.length; ++k) {
                if (oldCur[k].marker == span.marker) {
                  continue spans;
                }
              }
              oldCur.push(span);
            }
          } else if (stretchCur) {
            old[i2] = stretchCur;
          }
        }
        return old;
      }
      function copyHistoryArray(events, newGroup, instantiateSel) {
        var copy = [];
        for (var i2 = 0; i2 < events.length; ++i2) {
          var event = events[i2];
          if (event.ranges) {
            copy.push(instantiateSel ? Selection.prototype.deepCopy.call(event) : event);
            continue;
          }
          var changes = event.changes, newChanges = [];
          copy.push({ changes: newChanges });
          for (var j = 0; j < changes.length; ++j) {
            var change = changes[j], m = void 0;
            newChanges.push({ from: change.from, to: change.to, text: change.text });
            if (newGroup) {
              for (var prop2 in change) {
                if (m = prop2.match(/^spans_(\d+)$/)) {
                  if (indexOf(newGroup, Number(m[1])) > -1) {
                    lst(newChanges)[prop2] = change[prop2];
                    delete change[prop2];
                  }
                }
              }
            }
          }
        }
        return copy;
      }
      function extendRange(range3, head, other, extend) {
        if (extend) {
          var anchor = range3.anchor;
          if (other) {
            var posBefore = cmp(head, anchor) < 0;
            if (posBefore != cmp(other, anchor) < 0) {
              anchor = head;
              head = other;
            } else if (posBefore != cmp(head, other) < 0) {
              head = other;
            }
          }
          return new Range(anchor, head);
        } else {
          return new Range(other || head, head);
        }
      }
      function extendSelection(doc2, head, other, options, extend) {
        if (extend == null) {
          extend = doc2.cm && (doc2.cm.display.shift || doc2.extend);
        }
        setSelection(doc2, new Selection([extendRange(doc2.sel.primary(), head, other, extend)], 0), options);
      }
      function extendSelections(doc2, heads, options) {
        var out = [];
        var extend = doc2.cm && (doc2.cm.display.shift || doc2.extend);
        for (var i2 = 0; i2 < doc2.sel.ranges.length; i2++) {
          out[i2] = extendRange(doc2.sel.ranges[i2], heads[i2], null, extend);
        }
        var newSel = normalizeSelection(doc2.cm, out, doc2.sel.primIndex);
        setSelection(doc2, newSel, options);
      }
      function replaceOneSelection(doc2, i2, range3, options) {
        var ranges = doc2.sel.ranges.slice(0);
        ranges[i2] = range3;
        setSelection(doc2, normalizeSelection(doc2.cm, ranges, doc2.sel.primIndex), options);
      }
      function setSimpleSelection(doc2, anchor, head, options) {
        setSelection(doc2, simpleSelection(anchor, head), options);
      }
      function filterSelectionChange(doc2, sel, options) {
        var obj = {
          ranges: sel.ranges,
          update: function(ranges) {
            this.ranges = [];
            for (var i2 = 0; i2 < ranges.length; i2++) {
              this.ranges[i2] = new Range(
                clipPos(doc2, ranges[i2].anchor),
                clipPos(doc2, ranges[i2].head)
              );
            }
          },
          origin: options && options.origin
        };
        signal(doc2, "beforeSelectionChange", doc2, obj);
        if (doc2.cm) {
          signal(doc2.cm, "beforeSelectionChange", doc2.cm, obj);
        }
        if (obj.ranges != sel.ranges) {
          return normalizeSelection(doc2.cm, obj.ranges, obj.ranges.length - 1);
        } else {
          return sel;
        }
      }
      function setSelectionReplaceHistory(doc2, sel, options) {
        var done = doc2.history.done, last = lst(done);
        if (last && last.ranges) {
          done[done.length - 1] = sel;
          setSelectionNoUndo(doc2, sel, options);
        } else {
          setSelection(doc2, sel, options);
        }
      }
      function setSelection(doc2, sel, options) {
        setSelectionNoUndo(doc2, sel, options);
        addSelectionToHistory(doc2, doc2.sel, doc2.cm ? doc2.cm.curOp.id : NaN, options);
      }
      function setSelectionNoUndo(doc2, sel, options) {
        if (hasHandler(doc2, "beforeSelectionChange") || doc2.cm && hasHandler(doc2.cm, "beforeSelectionChange")) {
          sel = filterSelectionChange(doc2, sel, options);
        }
        var bias = options && options.bias || (cmp(sel.primary().head, doc2.sel.primary().head) < 0 ? -1 : 1);
        setSelectionInner(doc2, skipAtomicInSelection(doc2, sel, bias, true));
        if (!(options && options.scroll === false) && doc2.cm && doc2.cm.getOption("readOnly") != "nocursor") {
          ensureCursorVisible(doc2.cm);
        }
      }
      function setSelectionInner(doc2, sel) {
        if (sel.equals(doc2.sel)) {
          return;
        }
        doc2.sel = sel;
        if (doc2.cm) {
          doc2.cm.curOp.updateInput = 1;
          doc2.cm.curOp.selectionChanged = true;
          signalCursorActivity(doc2.cm);
        }
        signalLater(doc2, "cursorActivity", doc2);
      }
      function reCheckSelection(doc2) {
        setSelectionInner(doc2, skipAtomicInSelection(doc2, doc2.sel, null, false));
      }
      function skipAtomicInSelection(doc2, sel, bias, mayClear) {
        var out;
        for (var i2 = 0; i2 < sel.ranges.length; i2++) {
          var range3 = sel.ranges[i2];
          var old = sel.ranges.length == doc2.sel.ranges.length && doc2.sel.ranges[i2];
          var newAnchor = skipAtomic(doc2, range3.anchor, old && old.anchor, bias, mayClear);
          var newHead = range3.head == range3.anchor ? newAnchor : skipAtomic(doc2, range3.head, old && old.head, bias, mayClear);
          if (out || newAnchor != range3.anchor || newHead != range3.head) {
            if (!out) {
              out = sel.ranges.slice(0, i2);
            }
            out[i2] = new Range(newAnchor, newHead);
          }
        }
        return out ? normalizeSelection(doc2.cm, out, sel.primIndex) : sel;
      }
      function skipAtomicInner(doc2, pos, oldPos, dir, mayClear) {
        var line = getLine(doc2, pos.line);
        if (line.markedSpans) {
          for (var i2 = 0; i2 < line.markedSpans.length; ++i2) {
            var sp = line.markedSpans[i2], m = sp.marker;
            var preventCursorLeft = "selectLeft" in m ? !m.selectLeft : m.inclusiveLeft;
            var preventCursorRight = "selectRight" in m ? !m.selectRight : m.inclusiveRight;
            if ((sp.from == null || (preventCursorLeft ? sp.from <= pos.ch : sp.from < pos.ch)) && (sp.to == null || (preventCursorRight ? sp.to >= pos.ch : sp.to > pos.ch))) {
              if (mayClear) {
                signal(m, "beforeCursorEnter");
                if (m.explicitlyCleared) {
                  if (!line.markedSpans) {
                    break;
                  } else {
                    --i2;
                    continue;
                  }
                }
              }
              if (!m.atomic) {
                continue;
              }
              if (oldPos) {
                var near = m.find(dir < 0 ? 1 : -1), diff = void 0;
                if (dir < 0 ? preventCursorRight : preventCursorLeft) {
                  near = movePos(doc2, near, -dir, near && near.line == pos.line ? line : null);
                }
                if (near && near.line == pos.line && (diff = cmp(near, oldPos)) && (dir < 0 ? diff < 0 : diff > 0)) {
                  return skipAtomicInner(doc2, near, pos, dir, mayClear);
                }
              }
              var far = m.find(dir < 0 ? -1 : 1);
              if (dir < 0 ? preventCursorLeft : preventCursorRight) {
                far = movePos(doc2, far, dir, far.line == pos.line ? line : null);
              }
              return far ? skipAtomicInner(doc2, far, pos, dir, mayClear) : null;
            }
          }
        }
        return pos;
      }
      function skipAtomic(doc2, pos, oldPos, bias, mayClear) {
        var dir = bias || 1;
        var found = skipAtomicInner(doc2, pos, oldPos, dir, mayClear) || !mayClear && skipAtomicInner(doc2, pos, oldPos, dir, true) || skipAtomicInner(doc2, pos, oldPos, -dir, mayClear) || !mayClear && skipAtomicInner(doc2, pos, oldPos, -dir, true);
        if (!found) {
          doc2.cantEdit = true;
          return Pos(doc2.first, 0);
        }
        return found;
      }
      function movePos(doc2, pos, dir, line) {
        if (dir < 0 && pos.ch == 0) {
          if (pos.line > doc2.first) {
            return clipPos(doc2, Pos(pos.line - 1));
          } else {
            return null;
          }
        } else if (dir > 0 && pos.ch == (line || getLine(doc2, pos.line)).text.length) {
          if (pos.line < doc2.first + doc2.size - 1) {
            return Pos(pos.line + 1, 0);
          } else {
            return null;
          }
        } else {
          return new Pos(pos.line, pos.ch + dir);
        }
      }
      function selectAll2(cm) {
        cm.setSelection(Pos(cm.firstLine(), 0), Pos(cm.lastLine()), sel_dontScroll);
      }
      function filterChange(doc2, change, update) {
        var obj = {
          canceled: false,
          from: change.from,
          to: change.to,
          text: change.text,
          origin: change.origin,
          cancel: function() {
            return obj.canceled = true;
          }
        };
        if (update) {
          obj.update = function(from, to, text, origin) {
            if (from) {
              obj.from = clipPos(doc2, from);
            }
            if (to) {
              obj.to = clipPos(doc2, to);
            }
            if (text) {
              obj.text = text;
            }
            if (origin !== void 0) {
              obj.origin = origin;
            }
          };
        }
        signal(doc2, "beforeChange", doc2, obj);
        if (doc2.cm) {
          signal(doc2.cm, "beforeChange", doc2.cm, obj);
        }
        if (obj.canceled) {
          if (doc2.cm) {
            doc2.cm.curOp.updateInput = 2;
          }
          return null;
        }
        return { from: obj.from, to: obj.to, text: obj.text, origin: obj.origin };
      }
      function makeChange(doc2, change, ignoreReadOnly) {
        if (doc2.cm) {
          if (!doc2.cm.curOp) {
            return operation(doc2.cm, makeChange)(doc2, change, ignoreReadOnly);
          }
          if (doc2.cm.state.suppressEdits) {
            return;
          }
        }
        if (hasHandler(doc2, "beforeChange") || doc2.cm && hasHandler(doc2.cm, "beforeChange")) {
          change = filterChange(doc2, change, true);
          if (!change) {
            return;
          }
        }
        var split = sawReadOnlySpans && !ignoreReadOnly && removeReadOnlyRanges(doc2, change.from, change.to);
        if (split) {
          for (var i2 = split.length - 1; i2 >= 0; --i2) {
            makeChangeInner(doc2, { from: split[i2].from, to: split[i2].to, text: i2 ? [""] : change.text, origin: change.origin });
          }
        } else {
          makeChangeInner(doc2, change);
        }
      }
      function makeChangeInner(doc2, change) {
        if (change.text.length == 1 && change.text[0] == "" && cmp(change.from, change.to) == 0) {
          return;
        }
        var selAfter = computeSelAfterChange(doc2, change);
        addChangeToHistory(doc2, change, selAfter, doc2.cm ? doc2.cm.curOp.id : NaN);
        makeChangeSingleDoc(doc2, change, selAfter, stretchSpansOverChange(doc2, change));
        var rebased = [];
        linkedDocs(doc2, function(doc3, sharedHist) {
          if (!sharedHist && indexOf(rebased, doc3.history) == -1) {
            rebaseHist(doc3.history, change);
            rebased.push(doc3.history);
          }
          makeChangeSingleDoc(doc3, change, null, stretchSpansOverChange(doc3, change));
        });
      }
      function makeChangeFromHistory(doc2, type, allowSelectionOnly) {
        var suppress = doc2.cm && doc2.cm.state.suppressEdits;
        if (suppress && !allowSelectionOnly) {
          return;
        }
        var hist = doc2.history, event, selAfter = doc2.sel;
        var source = type == "undo" ? hist.done : hist.undone, dest = type == "undo" ? hist.undone : hist.done;
        var i2 = 0;
        for (; i2 < source.length; i2++) {
          event = source[i2];
          if (allowSelectionOnly ? event.ranges && !event.equals(doc2.sel) : !event.ranges) {
            break;
          }
        }
        if (i2 == source.length) {
          return;
        }
        hist.lastOrigin = hist.lastSelOrigin = null;
        for (; ; ) {
          event = source.pop();
          if (event.ranges) {
            pushSelectionToHistory(event, dest);
            if (allowSelectionOnly && !event.equals(doc2.sel)) {
              setSelection(doc2, event, { clearRedo: false });
              return;
            }
            selAfter = event;
          } else if (suppress) {
            source.push(event);
            return;
          } else {
            break;
          }
        }
        var antiChanges = [];
        pushSelectionToHistory(selAfter, dest);
        dest.push({ changes: antiChanges, generation: hist.generation });
        hist.generation = event.generation || ++hist.maxGeneration;
        var filter = hasHandler(doc2, "beforeChange") || doc2.cm && hasHandler(doc2.cm, "beforeChange");
        var loop = function(i3) {
          var change = event.changes[i3];
          change.origin = type;
          if (filter && !filterChange(doc2, change, false)) {
            source.length = 0;
            return {};
          }
          antiChanges.push(historyChangeFromChange(doc2, change));
          var after = i3 ? computeSelAfterChange(doc2, change) : lst(source);
          makeChangeSingleDoc(doc2, change, after, mergeOldSpans(doc2, change));
          if (!i3 && doc2.cm) {
            doc2.cm.scrollIntoView({ from: change.from, to: changeEnd(change) });
          }
          var rebased = [];
          linkedDocs(doc2, function(doc3, sharedHist) {
            if (!sharedHist && indexOf(rebased, doc3.history) == -1) {
              rebaseHist(doc3.history, change);
              rebased.push(doc3.history);
            }
            makeChangeSingleDoc(doc3, change, null, mergeOldSpans(doc3, change));
          });
        };
        for (var i$12 = event.changes.length - 1; i$12 >= 0; --i$12) {
          var returned = loop(i$12);
          if (returned) return returned.v;
        }
      }
      function shiftDoc(doc2, distance) {
        if (distance == 0) {
          return;
        }
        doc2.first += distance;
        doc2.sel = new Selection(map(doc2.sel.ranges, function(range3) {
          return new Range(
            Pos(range3.anchor.line + distance, range3.anchor.ch),
            Pos(range3.head.line + distance, range3.head.ch)
          );
        }), doc2.sel.primIndex);
        if (doc2.cm) {
          regChange(doc2.cm, doc2.first, doc2.first - distance, distance);
          for (var d = doc2.cm.display, l = d.viewFrom; l < d.viewTo; l++) {
            regLineChange(doc2.cm, l, "gutter");
          }
        }
      }
      function makeChangeSingleDoc(doc2, change, selAfter, spans) {
        if (doc2.cm && !doc2.cm.curOp) {
          return operation(doc2.cm, makeChangeSingleDoc)(doc2, change, selAfter, spans);
        }
        if (change.to.line < doc2.first) {
          shiftDoc(doc2, change.text.length - 1 - (change.to.line - change.from.line));
          return;
        }
        if (change.from.line > doc2.lastLine()) {
          return;
        }
        if (change.from.line < doc2.first) {
          var shift = change.text.length - 1 - (doc2.first - change.from.line);
          shiftDoc(doc2, shift);
          change = {
            from: Pos(doc2.first, 0),
            to: Pos(change.to.line + shift, change.to.ch),
            text: [lst(change.text)],
            origin: change.origin
          };
        }
        var last = doc2.lastLine();
        if (change.to.line > last) {
          change = {
            from: change.from,
            to: Pos(last, getLine(doc2, last).text.length),
            text: [change.text[0]],
            origin: change.origin
          };
        }
        change.removed = getBetween(doc2, change.from, change.to);
        if (!selAfter) {
          selAfter = computeSelAfterChange(doc2, change);
        }
        if (doc2.cm) {
          makeChangeSingleDocInEditor(doc2.cm, change, spans);
        } else {
          updateDoc(doc2, change, spans);
        }
        setSelectionNoUndo(doc2, selAfter, sel_dontScroll);
        if (doc2.cantEdit && skipAtomic(doc2, Pos(doc2.firstLine(), 0))) {
          doc2.cantEdit = false;
        }
      }
      function makeChangeSingleDocInEditor(cm, change, spans) {
        var doc2 = cm.doc, display = cm.display, from = change.from, to = change.to;
        var recomputeMaxLength = false, checkWidthStart = from.line;
        if (!cm.options.lineWrapping) {
          checkWidthStart = lineNo(visualLine(getLine(doc2, from.line)));
          doc2.iter(checkWidthStart, to.line + 1, function(line) {
            if (line == display.maxLine) {
              recomputeMaxLength = true;
              return true;
            }
          });
        }
        if (doc2.sel.contains(change.from, change.to) > -1) {
          signalCursorActivity(cm);
        }
        updateDoc(doc2, change, spans, estimateHeight(cm));
        if (!cm.options.lineWrapping) {
          doc2.iter(checkWidthStart, from.line + change.text.length, function(line) {
            var len = lineLength(line);
            if (len > display.maxLineLength) {
              display.maxLine = line;
              display.maxLineLength = len;
              display.maxLineChanged = true;
              recomputeMaxLength = false;
            }
          });
          if (recomputeMaxLength) {
            cm.curOp.updateMaxLine = true;
          }
        }
        retreatFrontier(doc2, from.line);
        startWorker(cm, 400);
        var lendiff = change.text.length - (to.line - from.line) - 1;
        if (change.full) {
          regChange(cm);
        } else if (from.line == to.line && change.text.length == 1 && !isWholeLineUpdate(cm.doc, change)) {
          regLineChange(cm, from.line, "text");
        } else {
          regChange(cm, from.line, to.line + 1, lendiff);
        }
        var changesHandler = hasHandler(cm, "changes"), changeHandler = hasHandler(cm, "change");
        if (changeHandler || changesHandler) {
          var obj = {
            from,
            to,
            text: change.text,
            removed: change.removed,
            origin: change.origin
          };
          if (changeHandler) {
            signalLater(cm, "change", cm, obj);
          }
          if (changesHandler) {
            (cm.curOp.changeObjs || (cm.curOp.changeObjs = [])).push(obj);
          }
        }
        cm.display.selForContextMenu = null;
      }
      function replaceRange(doc2, code, from, to, origin) {
        var assign;
        if (!to) {
          to = from;
        }
        if (cmp(to, from) < 0) {
          assign = [to, from], from = assign[0], to = assign[1];
        }
        if (typeof code == "string") {
          code = doc2.splitLines(code);
        }
        makeChange(doc2, { from, to, text: code, origin });
      }
      function rebaseHistSelSingle(pos, from, to, diff) {
        if (to < pos.line) {
          pos.line += diff;
        } else if (from < pos.line) {
          pos.line = from;
          pos.ch = 0;
        }
      }
      function rebaseHistArray(array, from, to, diff) {
        for (var i2 = 0; i2 < array.length; ++i2) {
          var sub = array[i2], ok = true;
          if (sub.ranges) {
            if (!sub.copied) {
              sub = array[i2] = sub.deepCopy();
              sub.copied = true;
            }
            for (var j = 0; j < sub.ranges.length; j++) {
              rebaseHistSelSingle(sub.ranges[j].anchor, from, to, diff);
              rebaseHistSelSingle(sub.ranges[j].head, from, to, diff);
            }
            continue;
          }
          for (var j$1 = 0; j$1 < sub.changes.length; ++j$1) {
            var cur = sub.changes[j$1];
            if (to < cur.from.line) {
              cur.from = Pos(cur.from.line + diff, cur.from.ch);
              cur.to = Pos(cur.to.line + diff, cur.to.ch);
            } else if (from <= cur.to.line) {
              ok = false;
              break;
            }
          }
          if (!ok) {
            array.splice(0, i2 + 1);
            i2 = 0;
          }
        }
      }
      function rebaseHist(hist, change) {
        var from = change.from.line, to = change.to.line, diff = change.text.length - (to - from) - 1;
        rebaseHistArray(hist.done, from, to, diff);
        rebaseHistArray(hist.undone, from, to, diff);
      }
      function changeLine(doc2, handle, changeType, op) {
        var no = handle, line = handle;
        if (typeof handle == "number") {
          line = getLine(doc2, clipLine(doc2, handle));
        } else {
          no = lineNo(handle);
        }
        if (no == null) {
          return null;
        }
        if (op(line, no) && doc2.cm) {
          regLineChange(doc2.cm, no, changeType);
        }
        return line;
      }
      function LeafChunk(lines) {
        this.lines = lines;
        this.parent = null;
        var height = 0;
        for (var i2 = 0; i2 < lines.length; ++i2) {
          lines[i2].parent = this;
          height += lines[i2].height;
        }
        this.height = height;
      }
      LeafChunk.prototype = {
        chunkSize: function() {
          return this.lines.length;
        },
        // Remove the n lines at offset 'at'.
        removeInner: function(at, n) {
          for (var i2 = at, e = at + n; i2 < e; ++i2) {
            var line = this.lines[i2];
            this.height -= line.height;
            cleanUpLine(line);
            signalLater(line, "delete");
          }
          this.lines.splice(at, n);
        },
        // Helper used to collapse a small branch into a single leaf.
        collapse: function(lines) {
          lines.push.apply(lines, this.lines);
        },
        // Insert the given array of lines at offset 'at', count them as
        // having the given height.
        insertInner: function(at, lines, height) {
          this.height += height;
          this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
          for (var i2 = 0; i2 < lines.length; ++i2) {
            lines[i2].parent = this;
          }
        },
        // Used to iterate over a part of the tree.
        iterN: function(at, n, op) {
          for (var e = at + n; at < e; ++at) {
            if (op(this.lines[at])) {
              return true;
            }
          }
        }
      };
      function BranchChunk(children) {
        this.children = children;
        var size = 0, height = 0;
        for (var i2 = 0; i2 < children.length; ++i2) {
          var ch = children[i2];
          size += ch.chunkSize();
          height += ch.height;
          ch.parent = this;
        }
        this.size = size;
        this.height = height;
        this.parent = null;
      }
      BranchChunk.prototype = {
        chunkSize: function() {
          return this.size;
        },
        removeInner: function(at, n) {
          this.size -= n;
          for (var i2 = 0; i2 < this.children.length; ++i2) {
            var child = this.children[i2], sz = child.chunkSize();
            if (at < sz) {
              var rm = Math.min(n, sz - at), oldHeight = child.height;
              child.removeInner(at, rm);
              this.height -= oldHeight - child.height;
              if (sz == rm) {
                this.children.splice(i2--, 1);
                child.parent = null;
              }
              if ((n -= rm) == 0) {
                break;
              }
              at = 0;
            } else {
              at -= sz;
            }
          }
          if (this.size - n < 25 && (this.children.length > 1 || !(this.children[0] instanceof LeafChunk))) {
            var lines = [];
            this.collapse(lines);
            this.children = [new LeafChunk(lines)];
            this.children[0].parent = this;
          }
        },
        collapse: function(lines) {
          for (var i2 = 0; i2 < this.children.length; ++i2) {
            this.children[i2].collapse(lines);
          }
        },
        insertInner: function(at, lines, height) {
          this.size += lines.length;
          this.height += height;
          for (var i2 = 0; i2 < this.children.length; ++i2) {
            var child = this.children[i2], sz = child.chunkSize();
            if (at <= sz) {
              child.insertInner(at, lines, height);
              if (child.lines && child.lines.length > 50) {
                var remaining = child.lines.length % 25 + 25;
                for (var pos = remaining; pos < child.lines.length; ) {
                  var leaf = new LeafChunk(child.lines.slice(pos, pos += 25));
                  child.height -= leaf.height;
                  this.children.splice(++i2, 0, leaf);
                  leaf.parent = this;
                }
                child.lines = child.lines.slice(0, remaining);
                this.maybeSpill();
              }
              break;
            }
            at -= sz;
          }
        },
        // When a node has grown, check whether it should be split.
        maybeSpill: function() {
          if (this.children.length <= 10) {
            return;
          }
          var me = this;
          do {
            var spilled = me.children.splice(me.children.length - 5, 5);
            var sibling = new BranchChunk(spilled);
            if (!me.parent) {
              var copy = new BranchChunk(me.children);
              copy.parent = me;
              me.children = [copy, sibling];
              me = copy;
            } else {
              me.size -= sibling.size;
              me.height -= sibling.height;
              var myIndex = indexOf(me.parent.children, me);
              me.parent.children.splice(myIndex + 1, 0, sibling);
            }
            sibling.parent = me.parent;
          } while (me.children.length > 10);
          me.parent.maybeSpill();
        },
        iterN: function(at, n, op) {
          for (var i2 = 0; i2 < this.children.length; ++i2) {
            var child = this.children[i2], sz = child.chunkSize();
            if (at < sz) {
              var used = Math.min(n, sz - at);
              if (child.iterN(at, used, op)) {
                return true;
              }
              if ((n -= used) == 0) {
                break;
              }
              at = 0;
            } else {
              at -= sz;
            }
          }
        }
      };
      var LineWidget = function(doc2, node, options) {
        if (options) {
          for (var opt in options) {
            if (options.hasOwnProperty(opt)) {
              this[opt] = options[opt];
            }
          }
        }
        this.doc = doc2;
        this.node = node;
      };
      LineWidget.prototype.clear = function() {
        var cm = this.doc.cm, ws = this.line.widgets, line = this.line, no = lineNo(line);
        if (no == null || !ws) {
          return;
        }
        for (var i2 = 0; i2 < ws.length; ++i2) {
          if (ws[i2] == this) {
            ws.splice(i2--, 1);
          }
        }
        if (!ws.length) {
          line.widgets = null;
        }
        var height = widgetHeight(this);
        updateLineHeight(line, Math.max(0, line.height - height));
        if (cm) {
          runInOp(cm, function() {
            adjustScrollWhenAboveVisible(cm, line, -height);
            regLineChange(cm, no, "widget");
          });
          signalLater(cm, "lineWidgetCleared", cm, this, no);
        }
      };
      LineWidget.prototype.changed = function() {
        var this$1$1 = this;
        var oldH = this.height, cm = this.doc.cm, line = this.line;
        this.height = null;
        var diff = widgetHeight(this) - oldH;
        if (!diff) {
          return;
        }
        if (!lineIsHidden(this.doc, line)) {
          updateLineHeight(line, line.height + diff);
        }
        if (cm) {
          runInOp(cm, function() {
            cm.curOp.forceUpdate = true;
            adjustScrollWhenAboveVisible(cm, line, diff);
            signalLater(cm, "lineWidgetChanged", cm, this$1$1, lineNo(line));
          });
        }
      };
      eventMixin(LineWidget);
      function adjustScrollWhenAboveVisible(cm, line, diff) {
        if (heightAtLine(line) < (cm.curOp && cm.curOp.scrollTop || cm.doc.scrollTop)) {
          addToScrollTop(cm, diff);
        }
      }
      function addLineWidget(doc2, handle, node, options) {
        var widget = new LineWidget(doc2, node, options);
        var cm = doc2.cm;
        if (cm && widget.noHScroll) {
          cm.display.alignWidgets = true;
        }
        changeLine(doc2, handle, "widget", function(line) {
          var widgets = line.widgets || (line.widgets = []);
          if (widget.insertAt == null) {
            widgets.push(widget);
          } else {
            widgets.splice(Math.min(widgets.length, Math.max(0, widget.insertAt)), 0, widget);
          }
          widget.line = line;
          if (cm && !lineIsHidden(doc2, line)) {
            var aboveVisible = heightAtLine(line) < doc2.scrollTop;
            updateLineHeight(line, line.height + widgetHeight(widget));
            if (aboveVisible) {
              addToScrollTop(cm, widget.height);
            }
            cm.curOp.forceUpdate = true;
          }
          return true;
        });
        if (cm) {
          signalLater(cm, "lineWidgetAdded", cm, widget, typeof handle == "number" ? handle : lineNo(handle));
        }
        return widget;
      }
      var nextMarkerId = 0;
      var TextMarker = function(doc2, type) {
        this.lines = [];
        this.type = type;
        this.doc = doc2;
        this.id = ++nextMarkerId;
      };
      TextMarker.prototype.clear = function() {
        if (this.explicitlyCleared) {
          return;
        }
        var cm = this.doc.cm, withOp = cm && !cm.curOp;
        if (withOp) {
          startOperation(cm);
        }
        if (hasHandler(this, "clear")) {
          var found = this.find();
          if (found) {
            signalLater(this, "clear", found.from, found.to);
          }
        }
        var min = null, max = null;
        for (var i2 = 0; i2 < this.lines.length; ++i2) {
          var line = this.lines[i2];
          var span = getMarkedSpanFor(line.markedSpans, this);
          if (cm && !this.collapsed) {
            regLineChange(cm, lineNo(line), "text");
          } else if (cm) {
            if (span.to != null) {
              max = lineNo(line);
            }
            if (span.from != null) {
              min = lineNo(line);
            }
          }
          line.markedSpans = removeMarkedSpan(line.markedSpans, span);
          if (span.from == null && this.collapsed && !lineIsHidden(this.doc, line) && cm) {
            updateLineHeight(line, textHeight(cm.display));
          }
        }
        if (cm && this.collapsed && !cm.options.lineWrapping) {
          for (var i$12 = 0; i$12 < this.lines.length; ++i$12) {
            var visual = visualLine(this.lines[i$12]), len = lineLength(visual);
            if (len > cm.display.maxLineLength) {
              cm.display.maxLine = visual;
              cm.display.maxLineLength = len;
              cm.display.maxLineChanged = true;
            }
          }
        }
        if (min != null && cm && this.collapsed) {
          regChange(cm, min, max + 1);
        }
        this.lines.length = 0;
        this.explicitlyCleared = true;
        if (this.atomic && this.doc.cantEdit) {
          this.doc.cantEdit = false;
          if (cm) {
            reCheckSelection(cm.doc);
          }
        }
        if (cm) {
          signalLater(cm, "markerCleared", cm, this, min, max);
        }
        if (withOp) {
          endOperation(cm);
        }
        if (this.parent) {
          this.parent.clear();
        }
      };
      TextMarker.prototype.find = function(side, lineObj) {
        if (side == null && this.type == "bookmark") {
          side = 1;
        }
        var from, to;
        for (var i2 = 0; i2 < this.lines.length; ++i2) {
          var line = this.lines[i2];
          var span = getMarkedSpanFor(line.markedSpans, this);
          if (span.from != null) {
            from = Pos(lineObj ? line : lineNo(line), span.from);
            if (side == -1) {
              return from;
            }
          }
          if (span.to != null) {
            to = Pos(lineObj ? line : lineNo(line), span.to);
            if (side == 1) {
              return to;
            }
          }
        }
        return from && { from, to };
      };
      TextMarker.prototype.changed = function() {
        var this$1$1 = this;
        var pos = this.find(-1, true), widget = this, cm = this.doc.cm;
        if (!pos || !cm) {
          return;
        }
        runInOp(cm, function() {
          var line = pos.line, lineN = lineNo(pos.line);
          var view = findViewForLine(cm, lineN);
          if (view) {
            clearLineMeasurementCacheFor(view);
            cm.curOp.selectionChanged = cm.curOp.forceUpdate = true;
          }
          cm.curOp.updateMaxLine = true;
          if (!lineIsHidden(widget.doc, line) && widget.height != null) {
            var oldHeight = widget.height;
            widget.height = null;
            var dHeight = widgetHeight(widget) - oldHeight;
            if (dHeight) {
              updateLineHeight(line, line.height + dHeight);
            }
          }
          signalLater(cm, "markerChanged", cm, this$1$1);
        });
      };
      TextMarker.prototype.attachLine = function(line) {
        if (!this.lines.length && this.doc.cm) {
          var op = this.doc.cm.curOp;
          if (!op.maybeHiddenMarkers || indexOf(op.maybeHiddenMarkers, this) == -1) {
            (op.maybeUnhiddenMarkers || (op.maybeUnhiddenMarkers = [])).push(this);
          }
        }
        this.lines.push(line);
      };
      TextMarker.prototype.detachLine = function(line) {
        this.lines.splice(indexOf(this.lines, line), 1);
        if (!this.lines.length && this.doc.cm) {
          var op = this.doc.cm.curOp;
          (op.maybeHiddenMarkers || (op.maybeHiddenMarkers = [])).push(this);
        }
      };
      eventMixin(TextMarker);
      function markText(doc2, from, to, options, type) {
        if (options && options.shared) {
          return markTextShared(doc2, from, to, options, type);
        }
        if (doc2.cm && !doc2.cm.curOp) {
          return operation(doc2.cm, markText)(doc2, from, to, options, type);
        }
        var marker = new TextMarker(doc2, type), diff = cmp(from, to);
        if (options) {
          copyObj(options, marker, false);
        }
        if (diff > 0 || diff == 0 && marker.clearWhenEmpty !== false) {
          return marker;
        }
        if (marker.replacedWith) {
          marker.collapsed = true;
          marker.widgetNode = eltP("span", [marker.replacedWith], "CodeMirror-widget");
          if (!options.handleMouseEvents) {
            marker.widgetNode.setAttribute("cm-ignore-events", "true");
          }
          if (options.insertLeft) {
            marker.widgetNode.insertLeft = true;
          }
        }
        if (marker.collapsed) {
          if (conflictingCollapsedRange(doc2, from.line, from, to, marker) || from.line != to.line && conflictingCollapsedRange(doc2, to.line, from, to, marker)) {
            throw new Error("Inserting collapsed marker partially overlapping an existing one");
          }
          seeCollapsedSpans();
        }
        if (marker.addToHistory) {
          addChangeToHistory(doc2, { from, to, origin: "markText" }, doc2.sel, NaN);
        }
        var curLine = from.line, cm = doc2.cm, updateMaxLine;
        doc2.iter(curLine, to.line + 1, function(line) {
          if (cm && marker.collapsed && !cm.options.lineWrapping && visualLine(line) == cm.display.maxLine) {
            updateMaxLine = true;
          }
          if (marker.collapsed && curLine != from.line) {
            updateLineHeight(line, 0);
          }
          addMarkedSpan(line, new MarkedSpan(
            marker,
            curLine == from.line ? from.ch : null,
            curLine == to.line ? to.ch : null
          ), doc2.cm && doc2.cm.curOp);
          ++curLine;
        });
        if (marker.collapsed) {
          doc2.iter(from.line, to.line + 1, function(line) {
            if (lineIsHidden(doc2, line)) {
              updateLineHeight(line, 0);
            }
          });
        }
        if (marker.clearOnEnter) {
          on(marker, "beforeCursorEnter", function() {
            return marker.clear();
          });
        }
        if (marker.readOnly) {
          seeReadOnlySpans();
          if (doc2.history.done.length || doc2.history.undone.length) {
            doc2.clearHistory();
          }
        }
        if (marker.collapsed) {
          marker.id = ++nextMarkerId;
          marker.atomic = true;
        }
        if (cm) {
          if (updateMaxLine) {
            cm.curOp.updateMaxLine = true;
          }
          if (marker.collapsed) {
            regChange(cm, from.line, to.line + 1);
          } else if (marker.className || marker.startStyle || marker.endStyle || marker.css || marker.attributes || marker.title) {
            for (var i2 = from.line; i2 <= to.line; i2++) {
              regLineChange(cm, i2, "text");
            }
          }
          if (marker.atomic) {
            reCheckSelection(cm.doc);
          }
          signalLater(cm, "markerAdded", cm, marker);
        }
        return marker;
      }
      var SharedTextMarker = function(markers, primary) {
        this.markers = markers;
        this.primary = primary;
        for (var i2 = 0; i2 < markers.length; ++i2) {
          markers[i2].parent = this;
        }
      };
      SharedTextMarker.prototype.clear = function() {
        if (this.explicitlyCleared) {
          return;
        }
        this.explicitlyCleared = true;
        for (var i2 = 0; i2 < this.markers.length; ++i2) {
          this.markers[i2].clear();
        }
        signalLater(this, "clear");
      };
      SharedTextMarker.prototype.find = function(side, lineObj) {
        return this.primary.find(side, lineObj);
      };
      eventMixin(SharedTextMarker);
      function markTextShared(doc2, from, to, options, type) {
        options = copyObj(options);
        options.shared = false;
        var markers = [markText(doc2, from, to, options, type)], primary = markers[0];
        var widget = options.widgetNode;
        linkedDocs(doc2, function(doc3) {
          if (widget) {
            options.widgetNode = widget.cloneNode(true);
          }
          markers.push(markText(doc3, clipPos(doc3, from), clipPos(doc3, to), options, type));
          for (var i2 = 0; i2 < doc3.linked.length; ++i2) {
            if (doc3.linked[i2].isParent) {
              return;
            }
          }
          primary = lst(markers);
        });
        return new SharedTextMarker(markers, primary);
      }
      function findSharedMarkers(doc2) {
        return doc2.findMarks(Pos(doc2.first, 0), doc2.clipPos(Pos(doc2.lastLine())), function(m) {
          return m.parent;
        });
      }
      function copySharedMarkers(doc2, markers) {
        for (var i2 = 0; i2 < markers.length; i2++) {
          var marker = markers[i2], pos = marker.find();
          var mFrom = doc2.clipPos(pos.from), mTo = doc2.clipPos(pos.to);
          if (cmp(mFrom, mTo)) {
            var subMark = markText(doc2, mFrom, mTo, marker.primary, marker.primary.type);
            marker.markers.push(subMark);
            subMark.parent = marker;
          }
        }
      }
      function detachSharedMarkers(markers) {
        var loop = function(i3) {
          var marker = markers[i3], linked = [marker.primary.doc];
          linkedDocs(marker.primary.doc, function(d) {
            return linked.push(d);
          });
          for (var j = 0; j < marker.markers.length; j++) {
            var subMarker = marker.markers[j];
            if (indexOf(linked, subMarker.doc) == -1) {
              subMarker.parent = null;
              marker.markers.splice(j--, 1);
            }
          }
        };
        for (var i2 = 0; i2 < markers.length; i2++) loop(i2);
      }
      var nextDocId = 0;
      var Doc = function(text, mode, firstLine, lineSep, direction) {
        if (!(this instanceof Doc)) {
          return new Doc(text, mode, firstLine, lineSep, direction);
        }
        if (firstLine == null) {
          firstLine = 0;
        }
        BranchChunk.call(this, [new LeafChunk([new Line("", null)])]);
        this.first = firstLine;
        this.scrollTop = this.scrollLeft = 0;
        this.cantEdit = false;
        this.cleanGeneration = 1;
        this.modeFrontier = this.highlightFrontier = firstLine;
        var start = Pos(firstLine, 0);
        this.sel = simpleSelection(start);
        this.history = new History(null);
        this.id = ++nextDocId;
        this.modeOption = mode;
        this.lineSep = lineSep;
        this.direction = direction == "rtl" ? "rtl" : "ltr";
        this.extend = false;
        if (typeof text == "string") {
          text = this.splitLines(text);
        }
        updateDoc(this, { from: start, to: start, text });
        setSelection(this, simpleSelection(start), sel_dontScroll);
      };
      Doc.prototype = createObj(BranchChunk.prototype, {
        constructor: Doc,
        // Iterate over the document. Supports two forms -- with only one
        // argument, it calls that for each line in the document. With
        // three, it iterates over the range given by the first two (with
        // the second being non-inclusive).
        iter: function(from, to, op) {
          if (op) {
            this.iterN(from - this.first, to - from, op);
          } else {
            this.iterN(this.first, this.first + this.size, from);
          }
        },
        // Non-public interface for adding and removing lines.
        insert: function(at, lines) {
          var height = 0;
          for (var i2 = 0; i2 < lines.length; ++i2) {
            height += lines[i2].height;
          }
          this.insertInner(at - this.first, lines, height);
        },
        remove: function(at, n) {
          this.removeInner(at - this.first, n);
        },
        // From here, the methods are part of the public interface. Most
        // are also available from CodeMirror (editor) instances.
        getValue: function(lineSep) {
          var lines = getLines(this, this.first, this.first + this.size);
          if (lineSep === false) {
            return lines;
          }
          return lines.join(lineSep || this.lineSeparator());
        },
        setValue: docMethodOp(function(code) {
          var top = Pos(this.first, 0), last = this.first + this.size - 1;
          makeChange(this, {
            from: top,
            to: Pos(last, getLine(this, last).text.length),
            text: this.splitLines(code),
            origin: "setValue",
            full: true
          }, true);
          if (this.cm) {
            scrollToCoords(this.cm, 0, 0);
          }
          setSelection(this, simpleSelection(top), sel_dontScroll);
        }),
        replaceRange: function(code, from, to, origin) {
          from = clipPos(this, from);
          to = to ? clipPos(this, to) : from;
          replaceRange(this, code, from, to, origin);
        },
        getRange: function(from, to, lineSep) {
          var lines = getBetween(this, clipPos(this, from), clipPos(this, to));
          if (lineSep === false) {
            return lines;
          }
          if (lineSep === "") {
            return lines.join("");
          }
          return lines.join(lineSep || this.lineSeparator());
        },
        getLine: function(line) {
          var l = this.getLineHandle(line);
          return l && l.text;
        },
        getLineHandle: function(line) {
          if (isLine(this, line)) {
            return getLine(this, line);
          }
        },
        getLineNumber: function(line) {
          return lineNo(line);
        },
        getLineHandleVisualStart: function(line) {
          if (typeof line == "number") {
            line = getLine(this, line);
          }
          return visualLine(line);
        },
        lineCount: function() {
          return this.size;
        },
        firstLine: function() {
          return this.first;
        },
        lastLine: function() {
          return this.first + this.size - 1;
        },
        clipPos: function(pos) {
          return clipPos(this, pos);
        },
        getCursor: function(start) {
          var range3 = this.sel.primary(), pos;
          if (start == null || start == "head") {
            pos = range3.head;
          } else if (start == "anchor") {
            pos = range3.anchor;
          } else if (start == "end" || start == "to" || start === false) {
            pos = range3.to();
          } else {
            pos = range3.from();
          }
          return pos;
        },
        listSelections: function() {
          return this.sel.ranges;
        },
        somethingSelected: function() {
          return this.sel.somethingSelected();
        },
        setCursor: docMethodOp(function(line, ch, options) {
          setSimpleSelection(this, clipPos(this, typeof line == "number" ? Pos(line, ch || 0) : line), null, options);
        }),
        setSelection: docMethodOp(function(anchor, head, options) {
          setSimpleSelection(this, clipPos(this, anchor), clipPos(this, head || anchor), options);
        }),
        extendSelection: docMethodOp(function(head, other, options) {
          extendSelection(this, clipPos(this, head), other && clipPos(this, other), options);
        }),
        extendSelections: docMethodOp(function(heads, options) {
          extendSelections(this, clipPosArray(this, heads), options);
        }),
        extendSelectionsBy: docMethodOp(function(f, options) {
          var heads = map(this.sel.ranges, f);
          extendSelections(this, clipPosArray(this, heads), options);
        }),
        setSelections: docMethodOp(function(ranges, primary, options) {
          if (!ranges.length) {
            return;
          }
          var out = [];
          for (var i2 = 0; i2 < ranges.length; i2++) {
            out[i2] = new Range(
              clipPos(this, ranges[i2].anchor),
              clipPos(this, ranges[i2].head || ranges[i2].anchor)
            );
          }
          if (primary == null) {
            primary = Math.min(ranges.length - 1, this.sel.primIndex);
          }
          setSelection(this, normalizeSelection(this.cm, out, primary), options);
        }),
        addSelection: docMethodOp(function(anchor, head, options) {
          var ranges = this.sel.ranges.slice(0);
          ranges.push(new Range(clipPos(this, anchor), clipPos(this, head || anchor)));
          setSelection(this, normalizeSelection(this.cm, ranges, ranges.length - 1), options);
        }),
        getSelection: function(lineSep) {
          var ranges = this.sel.ranges, lines;
          for (var i2 = 0; i2 < ranges.length; i2++) {
            var sel = getBetween(this, ranges[i2].from(), ranges[i2].to());
            lines = lines ? lines.concat(sel) : sel;
          }
          if (lineSep === false) {
            return lines;
          } else {
            return lines.join(lineSep || this.lineSeparator());
          }
        },
        getSelections: function(lineSep) {
          var parts = [], ranges = this.sel.ranges;
          for (var i2 = 0; i2 < ranges.length; i2++) {
            var sel = getBetween(this, ranges[i2].from(), ranges[i2].to());
            if (lineSep !== false) {
              sel = sel.join(lineSep || this.lineSeparator());
            }
            parts[i2] = sel;
          }
          return parts;
        },
        replaceSelection: function(code, collapse, origin) {
          var dup = [];
          for (var i2 = 0; i2 < this.sel.ranges.length; i2++) {
            dup[i2] = code;
          }
          this.replaceSelections(dup, collapse, origin || "+input");
        },
        replaceSelections: docMethodOp(function(code, collapse, origin) {
          var changes = [], sel = this.sel;
          for (var i2 = 0; i2 < sel.ranges.length; i2++) {
            var range3 = sel.ranges[i2];
            changes[i2] = { from: range3.from(), to: range3.to(), text: this.splitLines(code[i2]), origin };
          }
          var newSel = collapse && collapse != "end" && computeReplacedSel(this, changes, collapse);
          for (var i$12 = changes.length - 1; i$12 >= 0; i$12--) {
            makeChange(this, changes[i$12]);
          }
          if (newSel) {
            setSelectionReplaceHistory(this, newSel);
          } else if (this.cm) {
            ensureCursorVisible(this.cm);
          }
        }),
        undo: docMethodOp(function() {
          makeChangeFromHistory(this, "undo");
        }),
        redo: docMethodOp(function() {
          makeChangeFromHistory(this, "redo");
        }),
        undoSelection: docMethodOp(function() {
          makeChangeFromHistory(this, "undo", true);
        }),
        redoSelection: docMethodOp(function() {
          makeChangeFromHistory(this, "redo", true);
        }),
        setExtending: function(val) {
          this.extend = val;
        },
        getExtending: function() {
          return this.extend;
        },
        historySize: function() {
          var hist = this.history, done = 0, undone = 0;
          for (var i2 = 0; i2 < hist.done.length; i2++) {
            if (!hist.done[i2].ranges) {
              ++done;
            }
          }
          for (var i$12 = 0; i$12 < hist.undone.length; i$12++) {
            if (!hist.undone[i$12].ranges) {
              ++undone;
            }
          }
          return { undo: done, redo: undone };
        },
        clearHistory: function() {
          var this$1$1 = this;
          this.history = new History(this.history);
          linkedDocs(this, function(doc2) {
            return doc2.history = this$1$1.history;
          }, true);
        },
        markClean: function() {
          this.cleanGeneration = this.changeGeneration(true);
        },
        changeGeneration: function(forceSplit) {
          if (forceSplit) {
            this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null;
          }
          return this.history.generation;
        },
        isClean: function(gen) {
          return this.history.generation == (gen || this.cleanGeneration);
        },
        getHistory: function() {
          return {
            done: copyHistoryArray(this.history.done),
            undone: copyHistoryArray(this.history.undone)
          };
        },
        setHistory: function(histData) {
          var hist = this.history = new History(this.history);
          hist.done = copyHistoryArray(histData.done.slice(0), null, true);
          hist.undone = copyHistoryArray(histData.undone.slice(0), null, true);
        },
        setGutterMarker: docMethodOp(function(line, gutterID, value) {
          return changeLine(this, line, "gutter", function(line2) {
            var markers = line2.gutterMarkers || (line2.gutterMarkers = {});
            markers[gutterID] = value;
            if (!value && isEmpty(markers)) {
              line2.gutterMarkers = null;
            }
            return true;
          });
        }),
        clearGutter: docMethodOp(function(gutterID) {
          var this$1$1 = this;
          this.iter(function(line) {
            if (line.gutterMarkers && line.gutterMarkers[gutterID]) {
              changeLine(this$1$1, line, "gutter", function() {
                line.gutterMarkers[gutterID] = null;
                if (isEmpty(line.gutterMarkers)) {
                  line.gutterMarkers = null;
                }
                return true;
              });
            }
          });
        }),
        lineInfo: function(line) {
          var n;
          if (typeof line == "number") {
            if (!isLine(this, line)) {
              return null;
            }
            n = line;
            line = getLine(this, line);
            if (!line) {
              return null;
            }
          } else {
            n = lineNo(line);
            if (n == null) {
              return null;
            }
          }
          return {
            line: n,
            handle: line,
            text: line.text,
            gutterMarkers: line.gutterMarkers,
            textClass: line.textClass,
            bgClass: line.bgClass,
            wrapClass: line.wrapClass,
            widgets: line.widgets
          };
        },
        addLineClass: docMethodOp(function(handle, where, cls) {
          return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function(line) {
            var prop2 = where == "text" ? "textClass" : where == "background" ? "bgClass" : where == "gutter" ? "gutterClass" : "wrapClass";
            if (!line[prop2]) {
              line[prop2] = cls;
            } else if (classTest(cls).test(line[prop2])) {
              return false;
            } else {
              line[prop2] += " " + cls;
            }
            return true;
          });
        }),
        removeLineClass: docMethodOp(function(handle, where, cls) {
          return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function(line) {
            var prop2 = where == "text" ? "textClass" : where == "background" ? "bgClass" : where == "gutter" ? "gutterClass" : "wrapClass";
            var cur = line[prop2];
            if (!cur) {
              return false;
            } else if (cls == null) {
              line[prop2] = null;
            } else {
              var found = cur.match(classTest(cls));
              if (!found) {
                return false;
              }
              var end = found.index + found[0].length;
              line[prop2] = cur.slice(0, found.index) + (!found.index || end == cur.length ? "" : " ") + cur.slice(end) || null;
            }
            return true;
          });
        }),
        addLineWidget: docMethodOp(function(handle, node, options) {
          return addLineWidget(this, handle, node, options);
        }),
        removeLineWidget: function(widget) {
          widget.clear();
        },
        markText: function(from, to, options) {
          return markText(this, clipPos(this, from), clipPos(this, to), options, options && options.type || "range");
        },
        setBookmark: function(pos, options) {
          var realOpts = {
            replacedWith: options && (options.nodeType == null ? options.widget : options),
            insertLeft: options && options.insertLeft,
            clearWhenEmpty: false,
            shared: options && options.shared,
            handleMouseEvents: options && options.handleMouseEvents
          };
          pos = clipPos(this, pos);
          return markText(this, pos, pos, realOpts, "bookmark");
        },
        findMarksAt: function(pos) {
          pos = clipPos(this, pos);
          var markers = [], spans = getLine(this, pos.line).markedSpans;
          if (spans) {
            for (var i2 = 0; i2 < spans.length; ++i2) {
              var span = spans[i2];
              if ((span.from == null || span.from <= pos.ch) && (span.to == null || span.to >= pos.ch)) {
                markers.push(span.marker.parent || span.marker);
              }
            }
          }
          return markers;
        },
        findMarks: function(from, to, filter) {
          from = clipPos(this, from);
          to = clipPos(this, to);
          var found = [], lineNo2 = from.line;
          this.iter(from.line, to.line + 1, function(line) {
            var spans = line.markedSpans;
            if (spans) {
              for (var i2 = 0; i2 < spans.length; i2++) {
                var span = spans[i2];
                if (!(span.to != null && lineNo2 == from.line && from.ch >= span.to || span.from == null && lineNo2 != from.line || span.from != null && lineNo2 == to.line && span.from >= to.ch) && (!filter || filter(span.marker))) {
                  found.push(span.marker.parent || span.marker);
                }
              }
            }
            ++lineNo2;
          });
          return found;
        },
        getAllMarks: function() {
          var markers = [];
          this.iter(function(line) {
            var sps = line.markedSpans;
            if (sps) {
              for (var i2 = 0; i2 < sps.length; ++i2) {
                if (sps[i2].from != null) {
                  markers.push(sps[i2].marker);
                }
              }
            }
          });
          return markers;
        },
        posFromIndex: function(off2) {
          var ch, lineNo2 = this.first, sepSize = this.lineSeparator().length;
          this.iter(function(line) {
            var sz = line.text.length + sepSize;
            if (sz > off2) {
              ch = off2;
              return true;
            }
            off2 -= sz;
            ++lineNo2;
          });
          return clipPos(this, Pos(lineNo2, ch));
        },
        indexFromPos: function(coords) {
          coords = clipPos(this, coords);
          var index = coords.ch;
          if (coords.line < this.first || coords.ch < 0) {
            return 0;
          }
          var sepSize = this.lineSeparator().length;
          this.iter(this.first, coords.line, function(line) {
            index += line.text.length + sepSize;
          });
          return index;
        },
        copy: function(copyHistory) {
          var doc2 = new Doc(
            getLines(this, this.first, this.first + this.size),
            this.modeOption,
            this.first,
            this.lineSep,
            this.direction
          );
          doc2.scrollTop = this.scrollTop;
          doc2.scrollLeft = this.scrollLeft;
          doc2.sel = this.sel;
          doc2.extend = false;
          if (copyHistory) {
            doc2.history.undoDepth = this.history.undoDepth;
            doc2.setHistory(this.getHistory());
          }
          return doc2;
        },
        linkedDoc: function(options) {
          if (!options) {
            options = {};
          }
          var from = this.first, to = this.first + this.size;
          if (options.from != null && options.from > from) {
            from = options.from;
          }
          if (options.to != null && options.to < to) {
            to = options.to;
          }
          var copy = new Doc(getLines(this, from, to), options.mode || this.modeOption, from, this.lineSep, this.direction);
          if (options.sharedHist) {
            copy.history = this.history;
          }
          (this.linked || (this.linked = [])).push({ doc: copy, sharedHist: options.sharedHist });
          copy.linked = [{ doc: this, isParent: true, sharedHist: options.sharedHist }];
          copySharedMarkers(copy, findSharedMarkers(this));
          return copy;
        },
        unlinkDoc: function(other) {
          if (other instanceof CodeMirror2) {
            other = other.doc;
          }
          if (this.linked) {
            for (var i2 = 0; i2 < this.linked.length; ++i2) {
              var link = this.linked[i2];
              if (link.doc != other) {
                continue;
              }
              this.linked.splice(i2, 1);
              other.unlinkDoc(this);
              detachSharedMarkers(findSharedMarkers(this));
              break;
            }
          }
          if (other.history == this.history) {
            var splitIds = [other.id];
            linkedDocs(other, function(doc2) {
              return splitIds.push(doc2.id);
            }, true);
            other.history = new History(null);
            other.history.done = copyHistoryArray(this.history.done, splitIds);
            other.history.undone = copyHistoryArray(this.history.undone, splitIds);
          }
        },
        iterLinkedDocs: function(f) {
          linkedDocs(this, f);
        },
        getMode: function() {
          return this.mode;
        },
        getEditor: function() {
          return this.cm;
        },
        splitLines: function(str) {
          if (this.lineSep) {
            return str.split(this.lineSep);
          }
          return splitLinesAuto(str);
        },
        lineSeparator: function() {
          return this.lineSep || "\n";
        },
        setDirection: docMethodOp(function(dir) {
          if (dir != "rtl") {
            dir = "ltr";
          }
          if (dir == this.direction) {
            return;
          }
          this.direction = dir;
          this.iter(function(line) {
            return line.order = null;
          });
          if (this.cm) {
            directionChanged(this.cm);
          }
        })
      });
      Doc.prototype.eachLine = Doc.prototype.iter;
      var lastDrop = 0;
      function onDrop(e) {
        var cm = this;
        clearDragCursor(cm);
        if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e)) {
          return;
        }
        e_preventDefault(e);
        if (ie) {
          lastDrop = +/* @__PURE__ */ new Date();
        }
        var pos = posFromMouse(cm, e, true), files = e.dataTransfer.files;
        if (!pos || cm.isReadOnly()) {
          return;
        }
        if (files && files.length && window.FileReader && window.File) {
          var n = files.length, text = Array(n), read = 0;
          var markAsReadAndPasteIfAllFilesAreRead = function() {
            if (++read == n) {
              operation(cm, function() {
                pos = clipPos(cm.doc, pos);
                var change = {
                  from: pos,
                  to: pos,
                  text: cm.doc.splitLines(
                    text.filter(function(t) {
                      return t != null;
                    }).join(cm.doc.lineSeparator())
                  ),
                  origin: "paste"
                };
                makeChange(cm.doc, change);
                setSelectionReplaceHistory(cm.doc, simpleSelection(clipPos(cm.doc, pos), clipPos(cm.doc, changeEnd(change))));
              })();
            }
          };
          var readTextFromFile = function(file, i3) {
            if (cm.options.allowDropFileTypes && indexOf(cm.options.allowDropFileTypes, file.type) == -1) {
              markAsReadAndPasteIfAllFilesAreRead();
              return;
            }
            var reader = new FileReader();
            reader.onerror = function() {
              return markAsReadAndPasteIfAllFilesAreRead();
            };
            reader.onload = function() {
              var content = reader.result;
              if (/[\x00-\x08\x0e-\x1f]{2}/.test(content)) {
                markAsReadAndPasteIfAllFilesAreRead();
                return;
              }
              text[i3] = content;
              markAsReadAndPasteIfAllFilesAreRead();
            };
            reader.readAsText(file);
          };
          for (var i2 = 0; i2 < files.length; i2++) {
            readTextFromFile(files[i2], i2);
          }
        } else {
          if (cm.state.draggingText && cm.doc.sel.contains(pos) > -1) {
            cm.state.draggingText(e);
            setTimeout(function() {
              return cm.display.input.focus();
            }, 20);
            return;
          }
          try {
            var text$1 = e.dataTransfer.getData("Text");
            if (text$1) {
              var selected;
              if (cm.state.draggingText && !cm.state.draggingText.copy) {
                selected = cm.listSelections();
              }
              setSelectionNoUndo(cm.doc, simpleSelection(pos, pos));
              if (selected) {
                for (var i$12 = 0; i$12 < selected.length; ++i$12) {
                  replaceRange(cm.doc, "", selected[i$12].anchor, selected[i$12].head, "drag");
                }
              }
              cm.replaceSelection(text$1, "around", "paste");
              cm.display.input.focus();
            }
          } catch (e$1) {
          }
        }
      }
      function onDragStart(cm, e) {
        if (ie && (!cm.state.draggingText || +/* @__PURE__ */ new Date() - lastDrop < 100)) {
          e_stop(e);
          return;
        }
        if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e)) {
          return;
        }
        e.dataTransfer.setData("Text", cm.getSelection());
        e.dataTransfer.effectAllowed = "copyMove";
        if (e.dataTransfer.setDragImage && !safari) {
          var img = elt("img", null, null, "position: fixed; left: 0; top: 0;");
          img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
          if (presto) {
            img.width = img.height = 1;
            cm.display.wrapper.appendChild(img);
            img._top = img.offsetTop;
          }
          e.dataTransfer.setDragImage(img, 0, 0);
          if (presto) {
            img.parentNode.removeChild(img);
          }
        }
      }
      function onDragOver(cm, e) {
        var pos = posFromMouse(cm, e);
        if (!pos) {
          return;
        }
        var frag = document.createDocumentFragment();
        drawSelectionCursor(cm, pos, frag);
        if (!cm.display.dragCursor) {
          cm.display.dragCursor = elt("div", null, "CodeMirror-cursors CodeMirror-dragcursors");
          cm.display.lineSpace.insertBefore(cm.display.dragCursor, cm.display.cursorDiv);
        }
        removeChildrenAndAdd(cm.display.dragCursor, frag);
      }
      function clearDragCursor(cm) {
        if (cm.display.dragCursor) {
          cm.display.lineSpace.removeChild(cm.display.dragCursor);
          cm.display.dragCursor = null;
        }
      }
      function forEachCodeMirror(f) {
        if (!document.getElementsByClassName) {
          return;
        }
        var byClass = document.getElementsByClassName("CodeMirror"), editors = [];
        for (var i2 = 0; i2 < byClass.length; i2++) {
          var cm = byClass[i2].CodeMirror;
          if (cm) {
            editors.push(cm);
          }
        }
        if (editors.length) {
          editors[0].operation(function() {
            for (var i3 = 0; i3 < editors.length; i3++) {
              f(editors[i3]);
            }
          });
        }
      }
      var globalsRegistered = false;
      function ensureGlobalHandlers() {
        if (globalsRegistered) {
          return;
        }
        registerGlobalHandlers();
        globalsRegistered = true;
      }
      function registerGlobalHandlers() {
        var resizeTimer;
        on(window, "resize", function() {
          if (resizeTimer == null) {
            resizeTimer = setTimeout(function() {
              resizeTimer = null;
              forEachCodeMirror(onResize);
            }, 100);
          }
        });
        on(window, "blur", function() {
          return forEachCodeMirror(onBlur);
        });
      }
      function onResize(cm) {
        var d = cm.display;
        d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
        d.scrollbarsClipped = false;
        cm.setSize();
      }
      var keyNames = {
        3: "Pause",
        8: "Backspace",
        9: "Tab",
        13: "Enter",
        16: "Shift",
        17: "Ctrl",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Esc",
        32: "Space",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down",
        44: "PrintScrn",
        45: "Insert",
        46: "Delete",
        59: ";",
        61: "=",
        91: "Mod",
        92: "Mod",
        93: "Mod",
        106: "*",
        107: "=",
        109: "-",
        110: ".",
        111: "/",
        145: "ScrollLock",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'",
        224: "Mod",
        63232: "Up",
        63233: "Down",
        63234: "Left",
        63235: "Right",
        63272: "Delete",
        63273: "Home",
        63275: "End",
        63276: "PageUp",
        63277: "PageDown",
        63302: "Insert"
      };
      for (var i = 0; i < 10; i++) {
        keyNames[i + 48] = keyNames[i + 96] = String(i);
      }
      for (var i$1 = 65; i$1 <= 90; i$1++) {
        keyNames[i$1] = String.fromCharCode(i$1);
      }
      for (var i$2 = 1; i$2 <= 12; i$2++) {
        keyNames[i$2 + 111] = keyNames[i$2 + 63235] = "F" + i$2;
      }
      var keyMap = {};
      keyMap.basic = {
        "Left": "goCharLeft",
        "Right": "goCharRight",
        "Up": "goLineUp",
        "Down": "goLineDown",
        "End": "goLineEnd",
        "Home": "goLineStartSmart",
        "PageUp": "goPageUp",
        "PageDown": "goPageDown",
        "Delete": "delCharAfter",
        "Backspace": "delCharBefore",
        "Shift-Backspace": "delCharBefore",
        "Tab": "defaultTab",
        "Shift-Tab": "indentAuto",
        "Enter": "newlineAndIndent",
        "Insert": "toggleOverwrite",
        "Esc": "singleSelection"
      };
      keyMap.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Up": "goLineUp",
        "Ctrl-Down": "goLineDown",
        "Ctrl-Left": "goGroupLeft",
        "Ctrl-Right": "goGroupRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delGroupBefore",
        "Ctrl-Delete": "delGroupAfter",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        "Ctrl-U": "undoSelection",
        "Shift-Ctrl-U": "redoSelection",
        "Alt-U": "redoSelection",
        "fallthrough": "basic"
      };
      keyMap.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars",
        "Ctrl-O": "openLine"
      };
      keyMap.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Home": "goDocStart",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
        "Cmd-Left": "goLineLeft",
        "Cmd-Right": "goLineRight",
        "Alt-Backspace": "delGroupBefore",
        "Ctrl-Alt-Backspace": "delGroupAfter",
        "Alt-Delete": "delGroupAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        "Cmd-Backspace": "delWrappedLineLeft",
        "Cmd-Delete": "delWrappedLineRight",
        "Cmd-U": "undoSelection",
        "Shift-Cmd-U": "redoSelection",
        "Ctrl-Up": "goDocStart",
        "Ctrl-Down": "goDocEnd",
        "fallthrough": ["basic", "emacsy"]
      };
      keyMap["default"] = mac ? keyMap.macDefault : keyMap.pcDefault;
      function normalizeKeyName(name) {
        var parts = name.split(/-(?!$)/);
        name = parts[parts.length - 1];
        var alt, ctrl, shift, cmd;
        for (var i2 = 0; i2 < parts.length - 1; i2++) {
          var mod = parts[i2];
          if (/^(cmd|meta|m)$/i.test(mod)) {
            cmd = true;
          } else if (/^a(lt)?$/i.test(mod)) {
            alt = true;
          } else if (/^(c|ctrl|control)$/i.test(mod)) {
            ctrl = true;
          } else if (/^s(hift)?$/i.test(mod)) {
            shift = true;
          } else {
            throw new Error("Unrecognized modifier name: " + mod);
          }
        }
        if (alt) {
          name = "Alt-" + name;
        }
        if (ctrl) {
          name = "Ctrl-" + name;
        }
        if (cmd) {
          name = "Cmd-" + name;
        }
        if (shift) {
          name = "Shift-" + name;
        }
        return name;
      }
      function normalizeKeyMap(keymap) {
        var copy = {};
        for (var keyname in keymap) {
          if (keymap.hasOwnProperty(keyname)) {
            var value = keymap[keyname];
            if (/^(name|fallthrough|(de|at)tach)$/.test(keyname)) {
              continue;
            }
            if (value == "...") {
              delete keymap[keyname];
              continue;
            }
            var keys2 = map(keyname.split(" "), normalizeKeyName);
            for (var i2 = 0; i2 < keys2.length; i2++) {
              var val = void 0, name = void 0;
              if (i2 == keys2.length - 1) {
                name = keys2.join(" ");
                val = value;
              } else {
                name = keys2.slice(0, i2 + 1).join(" ");
                val = "...";
              }
              var prev = copy[name];
              if (!prev) {
                copy[name] = val;
              } else if (prev != val) {
                throw new Error("Inconsistent bindings for " + name);
              }
            }
            delete keymap[keyname];
          }
        }
        for (var prop2 in copy) {
          keymap[prop2] = copy[prop2];
        }
        return keymap;
      }
      function lookupKey(key, map2, handle, context) {
        map2 = getKeyMap(map2);
        var found = map2.call ? map2.call(key, context) : map2[key];
        if (found === false) {
          return "nothing";
        }
        if (found === "...") {
          return "multi";
        }
        if (found != null && handle(found)) {
          return "handled";
        }
        if (map2.fallthrough) {
          if (Object.prototype.toString.call(map2.fallthrough) != "[object Array]") {
            return lookupKey(key, map2.fallthrough, handle, context);
          }
          for (var i2 = 0; i2 < map2.fallthrough.length; i2++) {
            var result = lookupKey(key, map2.fallthrough[i2], handle, context);
            if (result) {
              return result;
            }
          }
        }
      }
      function isModifierKey(value) {
        var name = typeof value == "string" ? value : keyNames[value.keyCode];
        return name == "Ctrl" || name == "Alt" || name == "Shift" || name == "Mod";
      }
      function addModifierNames(name, event, noShift) {
        var base = name;
        if (event.altKey && base != "Alt") {
          name = "Alt-" + name;
        }
        if ((flipCtrlCmd ? event.metaKey : event.ctrlKey) && base != "Ctrl") {
          name = "Ctrl-" + name;
        }
        if ((flipCtrlCmd ? event.ctrlKey : event.metaKey) && base != "Mod") {
          name = "Cmd-" + name;
        }
        if (!noShift && event.shiftKey && base != "Shift") {
          name = "Shift-" + name;
        }
        return name;
      }
      function keyName(event, noShift) {
        if (presto && event.keyCode == 34 && event["char"]) {
          return false;
        }
        var name = keyNames[event.keyCode];
        if (name == null || event.altGraphKey) {
          return false;
        }
        if (event.keyCode == 3 && event.code) {
          name = event.code;
        }
        return addModifierNames(name, event, noShift);
      }
      function getKeyMap(val) {
        return typeof val == "string" ? keyMap[val] : val;
      }
      function deleteNearSelection(cm, compute) {
        var ranges = cm.doc.sel.ranges, kill = [];
        for (var i2 = 0; i2 < ranges.length; i2++) {
          var toKill = compute(ranges[i2]);
          while (kill.length && cmp(toKill.from, lst(kill).to) <= 0) {
            var replaced = kill.pop();
            if (cmp(replaced.from, toKill.from) < 0) {
              toKill.from = replaced.from;
              break;
            }
          }
          kill.push(toKill);
        }
        runInOp(cm, function() {
          for (var i3 = kill.length - 1; i3 >= 0; i3--) {
            replaceRange(cm.doc, "", kill[i3].from, kill[i3].to, "+delete");
          }
          ensureCursorVisible(cm);
        });
      }
      function moveCharLogically(line, ch, dir) {
        var target = skipExtendingChars(line.text, ch + dir, dir);
        return target < 0 || target > line.text.length ? null : target;
      }
      function moveLogically(line, start, dir) {
        var ch = moveCharLogically(line, start.ch, dir);
        return ch == null ? null : new Pos(start.line, ch, dir < 0 ? "after" : "before");
      }
      function endOfLine(visually, cm, lineObj, lineNo2, dir) {
        if (visually) {
          if (cm.doc.direction == "rtl") {
            dir = -dir;
          }
          var order = getOrder(lineObj, cm.doc.direction);
          if (order) {
            var part = dir < 0 ? lst(order) : order[0];
            var moveInStorageOrder = dir < 0 == (part.level == 1);
            var sticky = moveInStorageOrder ? "after" : "before";
            var ch;
            if (part.level > 0 || cm.doc.direction == "rtl") {
              var prep = prepareMeasureForLine(cm, lineObj);
              ch = dir < 0 ? lineObj.text.length - 1 : 0;
              var targetTop = measureCharPrepared(cm, prep, ch).top;
              ch = findFirst(function(ch2) {
                return measureCharPrepared(cm, prep, ch2).top == targetTop;
              }, dir < 0 == (part.level == 1) ? part.from : part.to - 1, ch);
              if (sticky == "before") {
                ch = moveCharLogically(lineObj, ch, 1);
              }
            } else {
              ch = dir < 0 ? part.to : part.from;
            }
            return new Pos(lineNo2, ch, sticky);
          }
        }
        return new Pos(lineNo2, dir < 0 ? lineObj.text.length : 0, dir < 0 ? "before" : "after");
      }
      function moveVisually(cm, line, start, dir) {
        var bidi = getOrder(line, cm.doc.direction);
        if (!bidi) {
          return moveLogically(line, start, dir);
        }
        if (start.ch >= line.text.length) {
          start.ch = line.text.length;
          start.sticky = "before";
        } else if (start.ch <= 0) {
          start.ch = 0;
          start.sticky = "after";
        }
        var partPos = getBidiPartAt(bidi, start.ch, start.sticky), part = bidi[partPos];
        if (cm.doc.direction == "ltr" && part.level % 2 == 0 && (dir > 0 ? part.to > start.ch : part.from < start.ch)) {
          return moveLogically(line, start, dir);
        }
        var mv = function(pos, dir2) {
          return moveCharLogically(line, pos instanceof Pos ? pos.ch : pos, dir2);
        };
        var prep;
        var getWrappedLineExtent = function(ch2) {
          if (!cm.options.lineWrapping) {
            return { begin: 0, end: line.text.length };
          }
          prep = prep || prepareMeasureForLine(cm, line);
          return wrappedLineExtentChar(cm, line, prep, ch2);
        };
        var wrappedLineExtent2 = getWrappedLineExtent(start.sticky == "before" ? mv(start, -1) : start.ch);
        if (cm.doc.direction == "rtl" || part.level == 1) {
          var moveInStorageOrder = part.level == 1 == dir < 0;
          var ch = mv(start, moveInStorageOrder ? 1 : -1);
          if (ch != null && (!moveInStorageOrder ? ch >= part.from && ch >= wrappedLineExtent2.begin : ch <= part.to && ch <= wrappedLineExtent2.end)) {
            var sticky = moveInStorageOrder ? "before" : "after";
            return new Pos(start.line, ch, sticky);
          }
        }
        var searchInVisualLine = function(partPos2, dir2, wrappedLineExtent3) {
          var getRes = function(ch3, moveInStorageOrder3) {
            return moveInStorageOrder3 ? new Pos(start.line, mv(ch3, 1), "before") : new Pos(start.line, ch3, "after");
          };
          for (; partPos2 >= 0 && partPos2 < bidi.length; partPos2 += dir2) {
            var part2 = bidi[partPos2];
            var moveInStorageOrder2 = dir2 > 0 == (part2.level != 1);
            var ch2 = moveInStorageOrder2 ? wrappedLineExtent3.begin : mv(wrappedLineExtent3.end, -1);
            if (part2.from <= ch2 && ch2 < part2.to) {
              return getRes(ch2, moveInStorageOrder2);
            }
            ch2 = moveInStorageOrder2 ? part2.from : mv(part2.to, -1);
            if (wrappedLineExtent3.begin <= ch2 && ch2 < wrappedLineExtent3.end) {
              return getRes(ch2, moveInStorageOrder2);
            }
          }
        };
        var res = searchInVisualLine(partPos + dir, dir, wrappedLineExtent2);
        if (res) {
          return res;
        }
        var nextCh = dir > 0 ? wrappedLineExtent2.end : mv(wrappedLineExtent2.begin, -1);
        if (nextCh != null && !(dir > 0 && nextCh == line.text.length)) {
          res = searchInVisualLine(dir > 0 ? 0 : bidi.length - 1, dir, getWrappedLineExtent(nextCh));
          if (res) {
            return res;
          }
        }
        return null;
      }
      var commands = {
        selectAll: selectAll2,
        singleSelection: function(cm) {
          return cm.setSelection(cm.getCursor("anchor"), cm.getCursor("head"), sel_dontScroll);
        },
        killLine: function(cm) {
          return deleteNearSelection(cm, function(range3) {
            if (range3.empty()) {
              var len = getLine(cm.doc, range3.head.line).text.length;
              if (range3.head.ch == len && range3.head.line < cm.lastLine()) {
                return { from: range3.head, to: Pos(range3.head.line + 1, 0) };
              } else {
                return { from: range3.head, to: Pos(range3.head.line, len) };
              }
            } else {
              return { from: range3.from(), to: range3.to() };
            }
          });
        },
        deleteLine: function(cm) {
          return deleteNearSelection(cm, function(range3) {
            return {
              from: Pos(range3.from().line, 0),
              to: clipPos(cm.doc, Pos(range3.to().line + 1, 0))
            };
          });
        },
        delLineLeft: function(cm) {
          return deleteNearSelection(cm, function(range3) {
            return {
              from: Pos(range3.from().line, 0),
              to: range3.from()
            };
          });
        },
        delWrappedLineLeft: function(cm) {
          return deleteNearSelection(cm, function(range3) {
            var top = cm.charCoords(range3.head, "div").top + 5;
            var leftPos = cm.coordsChar({ left: 0, top }, "div");
            return { from: leftPos, to: range3.from() };
          });
        },
        delWrappedLineRight: function(cm) {
          return deleteNearSelection(cm, function(range3) {
            var top = cm.charCoords(range3.head, "div").top + 5;
            var rightPos = cm.coordsChar({ left: cm.display.lineDiv.offsetWidth + 100, top }, "div");
            return { from: range3.from(), to: rightPos };
          });
        },
        undo: function(cm) {
          return cm.undo();
        },
        redo: function(cm) {
          return cm.redo();
        },
        undoSelection: function(cm) {
          return cm.undoSelection();
        },
        redoSelection: function(cm) {
          return cm.redoSelection();
        },
        goDocStart: function(cm) {
          return cm.extendSelection(Pos(cm.firstLine(), 0));
        },
        goDocEnd: function(cm) {
          return cm.extendSelection(Pos(cm.lastLine()));
        },
        goLineStart: function(cm) {
          return cm.extendSelectionsBy(
            function(range3) {
              return lineStart(cm, range3.head.line);
            },
            { origin: "+move", bias: 1 }
          );
        },
        goLineStartSmart: function(cm) {
          return cm.extendSelectionsBy(
            function(range3) {
              return lineStartSmart(cm, range3.head);
            },
            { origin: "+move", bias: 1 }
          );
        },
        goLineEnd: function(cm) {
          return cm.extendSelectionsBy(
            function(range3) {
              return lineEnd(cm, range3.head.line);
            },
            { origin: "+move", bias: -1 }
          );
        },
        goLineRight: function(cm) {
          return cm.extendSelectionsBy(function(range3) {
            var top = cm.cursorCoords(range3.head, "div").top + 5;
            return cm.coordsChar({ left: cm.display.lineDiv.offsetWidth + 100, top }, "div");
          }, sel_move);
        },
        goLineLeft: function(cm) {
          return cm.extendSelectionsBy(function(range3) {
            var top = cm.cursorCoords(range3.head, "div").top + 5;
            return cm.coordsChar({ left: 0, top }, "div");
          }, sel_move);
        },
        goLineLeftSmart: function(cm) {
          return cm.extendSelectionsBy(function(range3) {
            var top = cm.cursorCoords(range3.head, "div").top + 5;
            var pos = cm.coordsChar({ left: 0, top }, "div");
            if (pos.ch < cm.getLine(pos.line).search(/\S/)) {
              return lineStartSmart(cm, range3.head);
            }
            return pos;
          }, sel_move);
        },
        goLineUp: function(cm) {
          return cm.moveV(-1, "line");
        },
        goLineDown: function(cm) {
          return cm.moveV(1, "line");
        },
        goPageUp: function(cm) {
          return cm.moveV(-1, "page");
        },
        goPageDown: function(cm) {
          return cm.moveV(1, "page");
        },
        goCharLeft: function(cm) {
          return cm.moveH(-1, "char");
        },
        goCharRight: function(cm) {
          return cm.moveH(1, "char");
        },
        goColumnLeft: function(cm) {
          return cm.moveH(-1, "column");
        },
        goColumnRight: function(cm) {
          return cm.moveH(1, "column");
        },
        goWordLeft: function(cm) {
          return cm.moveH(-1, "word");
        },
        goGroupRight: function(cm) {
          return cm.moveH(1, "group");
        },
        goGroupLeft: function(cm) {
          return cm.moveH(-1, "group");
        },
        goWordRight: function(cm) {
          return cm.moveH(1, "word");
        },
        delCharBefore: function(cm) {
          return cm.deleteH(-1, "codepoint");
        },
        delCharAfter: function(cm) {
          return cm.deleteH(1, "char");
        },
        delWordBefore: function(cm) {
          return cm.deleteH(-1, "word");
        },
        delWordAfter: function(cm) {
          return cm.deleteH(1, "word");
        },
        delGroupBefore: function(cm) {
          return cm.deleteH(-1, "group");
        },
        delGroupAfter: function(cm) {
          return cm.deleteH(1, "group");
        },
        indentAuto: function(cm) {
          return cm.indentSelection("smart");
        },
        indentMore: function(cm) {
          return cm.indentSelection("add");
        },
        indentLess: function(cm) {
          return cm.indentSelection("subtract");
        },
        insertTab: function(cm) {
          return cm.replaceSelection("	");
        },
        insertSoftTab: function(cm) {
          var spaces = [], ranges = cm.listSelections(), tabSize = cm.options.tabSize;
          for (var i2 = 0; i2 < ranges.length; i2++) {
            var pos = ranges[i2].from();
            var col = countColumn(cm.getLine(pos.line), pos.ch, tabSize);
            spaces.push(spaceStr(tabSize - col % tabSize));
          }
          cm.replaceSelections(spaces);
        },
        defaultTab: function(cm) {
          if (cm.somethingSelected()) {
            cm.indentSelection("add");
          } else {
            cm.execCommand("insertTab");
          }
        },
        // Swap the two chars left and right of each selection's head.
        // Move cursor behind the two swapped characters afterwards.
        //
        // Doesn't consider line feeds a character.
        // Doesn't scan more than one line above to find a character.
        // Doesn't do anything on an empty line.
        // Doesn't do anything with non-empty selections.
        transposeChars: function(cm) {
          return runInOp(cm, function() {
            var ranges = cm.listSelections(), newSel = [];
            for (var i2 = 0; i2 < ranges.length; i2++) {
              if (!ranges[i2].empty()) {
                continue;
              }
              var cur = ranges[i2].head, line = getLine(cm.doc, cur.line).text;
              if (line) {
                if (cur.ch == line.length) {
                  cur = new Pos(cur.line, cur.ch - 1);
                }
                if (cur.ch > 0) {
                  cur = new Pos(cur.line, cur.ch + 1);
                  cm.replaceRange(
                    line.charAt(cur.ch - 1) + line.charAt(cur.ch - 2),
                    Pos(cur.line, cur.ch - 2),
                    cur,
                    "+transpose"
                  );
                } else if (cur.line > cm.doc.first) {
                  var prev = getLine(cm.doc, cur.line - 1).text;
                  if (prev) {
                    cur = new Pos(cur.line, 1);
                    cm.replaceRange(
                      line.charAt(0) + cm.doc.lineSeparator() + prev.charAt(prev.length - 1),
                      Pos(cur.line - 1, prev.length - 1),
                      cur,
                      "+transpose"
                    );
                  }
                }
              }
              newSel.push(new Range(cur, cur));
            }
            cm.setSelections(newSel);
          });
        },
        newlineAndIndent: function(cm) {
          return runInOp(cm, function() {
            var sels = cm.listSelections();
            for (var i2 = sels.length - 1; i2 >= 0; i2--) {
              cm.replaceRange(cm.doc.lineSeparator(), sels[i2].anchor, sels[i2].head, "+input");
            }
            sels = cm.listSelections();
            for (var i$12 = 0; i$12 < sels.length; i$12++) {
              cm.indentLine(sels[i$12].from().line, null, true);
            }
            ensureCursorVisible(cm);
          });
        },
        openLine: function(cm) {
          return cm.replaceSelection("\n", "start");
        },
        toggleOverwrite: function(cm) {
          return cm.toggleOverwrite();
        }
      };
      function lineStart(cm, lineN) {
        var line = getLine(cm.doc, lineN);
        var visual = visualLine(line);
        if (visual != line) {
          lineN = lineNo(visual);
        }
        return endOfLine(true, cm, visual, lineN, 1);
      }
      function lineEnd(cm, lineN) {
        var line = getLine(cm.doc, lineN);
        var visual = visualLineEnd(line);
        if (visual != line) {
          lineN = lineNo(visual);
        }
        return endOfLine(true, cm, line, lineN, -1);
      }
      function lineStartSmart(cm, pos) {
        var start = lineStart(cm, pos.line);
        var line = getLine(cm.doc, start.line);
        var order = getOrder(line, cm.doc.direction);
        if (!order || order[0].level == 0) {
          var firstNonWS = Math.max(start.ch, line.text.search(/\S/));
          var inWS = pos.line == start.line && pos.ch <= firstNonWS && pos.ch;
          return Pos(start.line, inWS ? 0 : firstNonWS, start.sticky);
        }
        return start;
      }
      function doHandleBinding(cm, bound, dropShift) {
        if (typeof bound == "string") {
          bound = commands[bound];
          if (!bound) {
            return false;
          }
        }
        cm.display.input.ensurePolled();
        var prevShift = cm.display.shift, done = false;
        try {
          if (cm.isReadOnly()) {
            cm.state.suppressEdits = true;
          }
          if (dropShift) {
            cm.display.shift = false;
          }
          done = bound(cm) != Pass;
        } finally {
          cm.display.shift = prevShift;
          cm.state.suppressEdits = false;
        }
        return done;
      }
      function lookupKeyForEditor(cm, name, handle) {
        for (var i2 = 0; i2 < cm.state.keyMaps.length; i2++) {
          var result = lookupKey(name, cm.state.keyMaps[i2], handle, cm);
          if (result) {
            return result;
          }
        }
        return cm.options.extraKeys && lookupKey(name, cm.options.extraKeys, handle, cm) || lookupKey(name, cm.options.keyMap, handle, cm);
      }
      var stopSeq = new Delayed();
      function dispatchKey(cm, name, e, handle) {
        var seq = cm.state.keySeq;
        if (seq) {
          if (isModifierKey(name)) {
            return "handled";
          }
          if (/\'$/.test(name)) {
            cm.state.keySeq = null;
          } else {
            stopSeq.set(50, function() {
              if (cm.state.keySeq == seq) {
                cm.state.keySeq = null;
                cm.display.input.reset();
              }
            });
          }
          if (dispatchKeyInner(cm, seq + " " + name, e, handle)) {
            return true;
          }
        }
        return dispatchKeyInner(cm, name, e, handle);
      }
      function dispatchKeyInner(cm, name, e, handle) {
        var result = lookupKeyForEditor(cm, name, handle);
        if (result == "multi") {
          cm.state.keySeq = name;
        }
        if (result == "handled") {
          signalLater(cm, "keyHandled", cm, name, e);
        }
        if (result == "handled" || result == "multi") {
          e_preventDefault(e);
          restartBlink(cm);
        }
        return !!result;
      }
      function handleKeyBinding(cm, e) {
        var name = keyName(e, true);
        if (!name) {
          return false;
        }
        if (e.shiftKey && !cm.state.keySeq) {
          return dispatchKey(cm, "Shift-" + name, e, function(b) {
            return doHandleBinding(cm, b, true);
          }) || dispatchKey(cm, name, e, function(b) {
            if (typeof b == "string" ? /^go[A-Z]/.test(b) : b.motion) {
              return doHandleBinding(cm, b);
            }
          });
        } else {
          return dispatchKey(cm, name, e, function(b) {
            return doHandleBinding(cm, b);
          });
        }
      }
      function handleCharBinding(cm, e, ch) {
        return dispatchKey(cm, "'" + ch + "'", e, function(b) {
          return doHandleBinding(cm, b, true);
        });
      }
      var lastStoppedKey = null;
      function onKeyDown(e) {
        var cm = this;
        if (e.target && e.target != cm.display.input.getField()) {
          return;
        }
        cm.curOp.focus = activeElt(root2(cm));
        if (signalDOMEvent(cm, e)) {
          return;
        }
        if (ie && ie_version < 11 && e.keyCode == 27) {
          e.returnValue = false;
        }
        var code = e.keyCode;
        cm.display.shift = code == 16 || e.shiftKey;
        var handled = handleKeyBinding(cm, e);
        if (presto) {
          lastStoppedKey = handled ? code : null;
          if (!handled && code == 88 && !hasCopyEvent && (mac ? e.metaKey : e.ctrlKey)) {
            cm.replaceSelection("", null, "cut");
          }
        }
        if (gecko && !mac && !handled && code == 46 && e.shiftKey && !e.ctrlKey && document.execCommand) {
          document.execCommand("cut");
        }
        if (code == 18 && !/\bCodeMirror-crosshair\b/.test(cm.display.lineDiv.className)) {
          showCrossHair(cm);
        }
      }
      function showCrossHair(cm) {
        var lineDiv = cm.display.lineDiv;
        addClass2(lineDiv, "CodeMirror-crosshair");
        function up(e) {
          if (e.keyCode == 18 || !e.altKey) {
            rmClass(lineDiv, "CodeMirror-crosshair");
            off(document, "keyup", up);
            off(document, "mouseover", up);
          }
        }
        on(document, "keyup", up);
        on(document, "mouseover", up);
      }
      function onKeyUp(e) {
        if (e.keyCode == 16) {
          this.doc.sel.shift = false;
        }
        signalDOMEvent(this, e);
      }
      function onKeyPress(e) {
        var cm = this;
        if (e.target && e.target != cm.display.input.getField()) {
          return;
        }
        if (eventInWidget(cm.display, e) || signalDOMEvent(cm, e) || e.ctrlKey && !e.altKey || mac && e.metaKey) {
          return;
        }
        var keyCode = e.keyCode, charCode = e.charCode;
        if (presto && keyCode == lastStoppedKey) {
          lastStoppedKey = null;
          e_preventDefault(e);
          return;
        }
        if (presto && (!e.which || e.which < 10) && handleKeyBinding(cm, e)) {
          return;
        }
        var ch = String.fromCharCode(charCode == null ? keyCode : charCode);
        if (ch == "\b") {
          return;
        }
        if (handleCharBinding(cm, e, ch)) {
          return;
        }
        cm.display.input.onKeyPress(e);
      }
      var DOUBLECLICK_DELAY = 400;
      var PastClick = function(time, pos, button) {
        this.time = time;
        this.pos = pos;
        this.button = button;
      };
      PastClick.prototype.compare = function(time, pos, button) {
        return this.time + DOUBLECLICK_DELAY > time && cmp(pos, this.pos) == 0 && button == this.button;
      };
      var lastClick, lastDoubleClick;
      function clickRepeat(pos, button) {
        var now = +/* @__PURE__ */ new Date();
        if (lastDoubleClick && lastDoubleClick.compare(now, pos, button)) {
          lastClick = lastDoubleClick = null;
          return "triple";
        } else if (lastClick && lastClick.compare(now, pos, button)) {
          lastDoubleClick = new PastClick(now, pos, button);
          lastClick = null;
          return "double";
        } else {
          lastClick = new PastClick(now, pos, button);
          lastDoubleClick = null;
          return "single";
        }
      }
      function onMouseDown(e) {
        var cm = this, display = cm.display;
        if (signalDOMEvent(cm, e) || display.activeTouch && display.input.supportsTouch()) {
          return;
        }
        display.input.ensurePolled();
        display.shift = e.shiftKey;
        if (eventInWidget(display, e)) {
          if (!webkit) {
            display.scroller.draggable = false;
            setTimeout(function() {
              return display.scroller.draggable = true;
            }, 100);
          }
          return;
        }
        if (clickInGutter(cm, e)) {
          return;
        }
        var pos = posFromMouse(cm, e), button = e_button(e), repeat = pos ? clickRepeat(pos, button) : "single";
        win(cm).focus();
        if (button == 1 && cm.state.selectingText) {
          cm.state.selectingText(e);
        }
        if (pos && handleMappedButton(cm, button, pos, repeat, e)) {
          return;
        }
        if (button == 1) {
          if (pos) {
            leftButtonDown(cm, pos, repeat, e);
          } else if (e_target(e) == display.scroller) {
            e_preventDefault(e);
          }
        } else if (button == 2) {
          if (pos) {
            extendSelection(cm.doc, pos);
          }
          setTimeout(function() {
            return display.input.focus();
          }, 20);
        } else if (button == 3) {
          if (captureRightClick) {
            cm.display.input.onContextMenu(e);
          } else {
            delayBlurEvent(cm);
          }
        }
      }
      function handleMappedButton(cm, button, pos, repeat, event) {
        var name = "Click";
        if (repeat == "double") {
          name = "Double" + name;
        } else if (repeat == "triple") {
          name = "Triple" + name;
        }
        name = (button == 1 ? "Left" : button == 2 ? "Middle" : "Right") + name;
        return dispatchKey(cm, addModifierNames(name, event), event, function(bound) {
          if (typeof bound == "string") {
            bound = commands[bound];
          }
          if (!bound) {
            return false;
          }
          var done = false;
          try {
            if (cm.isReadOnly()) {
              cm.state.suppressEdits = true;
            }
            done = bound(cm, pos) != Pass;
          } finally {
            cm.state.suppressEdits = false;
          }
          return done;
        });
      }
      function configureMouse(cm, repeat, event) {
        var option = cm.getOption("configureMouse");
        var value = option ? option(cm, repeat, event) : {};
        if (value.unit == null) {
          var rect = chromeOS ? event.shiftKey && event.metaKey : event.altKey;
          value.unit = rect ? "rectangle" : repeat == "single" ? "char" : repeat == "double" ? "word" : "line";
        }
        if (value.extend == null || cm.doc.extend) {
          value.extend = cm.doc.extend || event.shiftKey;
        }
        if (value.addNew == null) {
          value.addNew = mac ? event.metaKey : event.ctrlKey;
        }
        if (value.moveOnDrag == null) {
          value.moveOnDrag = !(mac ? event.altKey : event.ctrlKey);
        }
        return value;
      }
      function leftButtonDown(cm, pos, repeat, event) {
        if (ie) {
          setTimeout(bind2(ensureFocus, cm), 0);
        } else {
          cm.curOp.focus = activeElt(root2(cm));
        }
        var behavior = configureMouse(cm, repeat, event);
        var sel = cm.doc.sel, contained;
        if (cm.options.dragDrop && dragAndDrop && !cm.isReadOnly() && repeat == "single" && (contained = sel.contains(pos)) > -1 && (cmp((contained = sel.ranges[contained]).from(), pos) < 0 || pos.xRel > 0) && (cmp(contained.to(), pos) > 0 || pos.xRel < 0)) {
          leftButtonStartDrag(cm, event, pos, behavior);
        } else {
          leftButtonSelect(cm, event, pos, behavior);
        }
      }
      function leftButtonStartDrag(cm, event, pos, behavior) {
        var display = cm.display, moved = false;
        var dragEnd = operation(cm, function(e) {
          if (webkit) {
            display.scroller.draggable = false;
          }
          cm.state.draggingText = false;
          if (cm.state.delayingBlurEvent) {
            if (cm.hasFocus()) {
              cm.state.delayingBlurEvent = false;
            } else {
              delayBlurEvent(cm);
            }
          }
          off(display.wrapper.ownerDocument, "mouseup", dragEnd);
          off(display.wrapper.ownerDocument, "mousemove", mouseMove);
          off(display.scroller, "dragstart", dragStart);
          off(display.scroller, "drop", dragEnd);
          if (!moved) {
            e_preventDefault(e);
            if (!behavior.addNew) {
              extendSelection(cm.doc, pos, null, null, behavior.extend);
            }
            if (webkit && !safari || ie && ie_version == 9) {
              setTimeout(function() {
                display.wrapper.ownerDocument.body.focus({ preventScroll: true });
                display.input.focus();
              }, 20);
            } else {
              display.input.focus();
            }
          }
        });
        var mouseMove = function(e2) {
          moved = moved || Math.abs(event.clientX - e2.clientX) + Math.abs(event.clientY - e2.clientY) >= 10;
        };
        var dragStart = function() {
          return moved = true;
        };
        if (webkit) {
          display.scroller.draggable = true;
        }
        cm.state.draggingText = dragEnd;
        dragEnd.copy = !behavior.moveOnDrag;
        on(display.wrapper.ownerDocument, "mouseup", dragEnd);
        on(display.wrapper.ownerDocument, "mousemove", mouseMove);
        on(display.scroller, "dragstart", dragStart);
        on(display.scroller, "drop", dragEnd);
        cm.state.delayingBlurEvent = true;
        setTimeout(function() {
          return display.input.focus();
        }, 20);
        if (display.scroller.dragDrop) {
          display.scroller.dragDrop();
        }
      }
      function rangeForUnit(cm, pos, unit) {
        if (unit == "char") {
          return new Range(pos, pos);
        }
        if (unit == "word") {
          return cm.findWordAt(pos);
        }
        if (unit == "line") {
          return new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0)));
        }
        var result = unit(cm, pos);
        return new Range(result.from, result.to);
      }
      function leftButtonSelect(cm, event, start, behavior) {
        if (ie) {
          delayBlurEvent(cm);
        }
        var display = cm.display, doc2 = cm.doc;
        e_preventDefault(event);
        var ourRange, ourIndex, startSel = doc2.sel, ranges = startSel.ranges;
        if (behavior.addNew && !behavior.extend) {
          ourIndex = doc2.sel.contains(start);
          if (ourIndex > -1) {
            ourRange = ranges[ourIndex];
          } else {
            ourRange = new Range(start, start);
          }
        } else {
          ourRange = doc2.sel.primary();
          ourIndex = doc2.sel.primIndex;
        }
        if (behavior.unit == "rectangle") {
          if (!behavior.addNew) {
            ourRange = new Range(start, start);
          }
          start = posFromMouse(cm, event, true, true);
          ourIndex = -1;
        } else {
          var range3 = rangeForUnit(cm, start, behavior.unit);
          if (behavior.extend) {
            ourRange = extendRange(ourRange, range3.anchor, range3.head, behavior.extend);
          } else {
            ourRange = range3;
          }
        }
        if (!behavior.addNew) {
          ourIndex = 0;
          setSelection(doc2, new Selection([ourRange], 0), sel_mouse);
          startSel = doc2.sel;
        } else if (ourIndex == -1) {
          ourIndex = ranges.length;
          setSelection(
            doc2,
            normalizeSelection(cm, ranges.concat([ourRange]), ourIndex),
            { scroll: false, origin: "*mouse" }
          );
        } else if (ranges.length > 1 && ranges[ourIndex].empty() && behavior.unit == "char" && !behavior.extend) {
          setSelection(
            doc2,
            normalizeSelection(cm, ranges.slice(0, ourIndex).concat(ranges.slice(ourIndex + 1)), 0),
            { scroll: false, origin: "*mouse" }
          );
          startSel = doc2.sel;
        } else {
          replaceOneSelection(doc2, ourIndex, ourRange, sel_mouse);
        }
        var lastPos = start;
        function extendTo(pos) {
          if (cmp(lastPos, pos) == 0) {
            return;
          }
          lastPos = pos;
          if (behavior.unit == "rectangle") {
            var ranges2 = [], tabSize = cm.options.tabSize;
            var startCol = countColumn(getLine(doc2, start.line).text, start.ch, tabSize);
            var posCol = countColumn(getLine(doc2, pos.line).text, pos.ch, tabSize);
            var left = Math.min(startCol, posCol), right = Math.max(startCol, posCol);
            for (var line = Math.min(start.line, pos.line), end = Math.min(cm.lastLine(), Math.max(start.line, pos.line)); line <= end; line++) {
              var text = getLine(doc2, line).text, leftPos = findColumn(text, left, tabSize);
              if (left == right) {
                ranges2.push(new Range(Pos(line, leftPos), Pos(line, leftPos)));
              } else if (text.length > leftPos) {
                ranges2.push(new Range(Pos(line, leftPos), Pos(line, findColumn(text, right, tabSize))));
              }
            }
            if (!ranges2.length) {
              ranges2.push(new Range(start, start));
            }
            setSelection(
              doc2,
              normalizeSelection(cm, startSel.ranges.slice(0, ourIndex).concat(ranges2), ourIndex),
              { origin: "*mouse", scroll: false }
            );
            cm.scrollIntoView(pos);
          } else {
            var oldRange = ourRange;
            var range4 = rangeForUnit(cm, pos, behavior.unit);
            var anchor = oldRange.anchor, head;
            if (cmp(range4.anchor, anchor) > 0) {
              head = range4.head;
              anchor = minPos(oldRange.from(), range4.anchor);
            } else {
              head = range4.anchor;
              anchor = maxPos(oldRange.to(), range4.head);
            }
            var ranges$1 = startSel.ranges.slice(0);
            ranges$1[ourIndex] = bidiSimplify(cm, new Range(clipPos(doc2, anchor), head));
            setSelection(doc2, normalizeSelection(cm, ranges$1, ourIndex), sel_mouse);
          }
        }
        var editorSize = display.wrapper.getBoundingClientRect();
        var counter = 0;
        function extend(e) {
          var curCount = ++counter;
          var cur = posFromMouse(cm, e, true, behavior.unit == "rectangle");
          if (!cur) {
            return;
          }
          if (cmp(cur, lastPos) != 0) {
            cm.curOp.focus = activeElt(root2(cm));
            extendTo(cur);
            var visible = visibleLines(display, doc2);
            if (cur.line >= visible.to || cur.line < visible.from) {
              setTimeout(operation(cm, function() {
                if (counter == curCount) {
                  extend(e);
                }
              }), 150);
            }
          } else {
            var outside = e.clientY < editorSize.top ? -20 : e.clientY > editorSize.bottom ? 20 : 0;
            if (outside) {
              setTimeout(operation(cm, function() {
                if (counter != curCount) {
                  return;
                }
                display.scroller.scrollTop += outside;
                extend(e);
              }), 50);
            }
          }
        }
        function done(e) {
          cm.state.selectingText = false;
          counter = Infinity;
          if (e) {
            e_preventDefault(e);
            display.input.focus();
          }
          off(display.wrapper.ownerDocument, "mousemove", move);
          off(display.wrapper.ownerDocument, "mouseup", up);
          doc2.history.lastSelOrigin = null;
        }
        var move = operation(cm, function(e) {
          if (e.buttons === 0 || !e_button(e)) {
            done(e);
          } else {
            extend(e);
          }
        });
        var up = operation(cm, done);
        cm.state.selectingText = up;
        on(display.wrapper.ownerDocument, "mousemove", move);
        on(display.wrapper.ownerDocument, "mouseup", up);
      }
      function bidiSimplify(cm, range3) {
        var anchor = range3.anchor;
        var head = range3.head;
        var anchorLine = getLine(cm.doc, anchor.line);
        if (cmp(anchor, head) == 0 && anchor.sticky == head.sticky) {
          return range3;
        }
        var order = getOrder(anchorLine);
        if (!order) {
          return range3;
        }
        var index = getBidiPartAt(order, anchor.ch, anchor.sticky), part = order[index];
        if (part.from != anchor.ch && part.to != anchor.ch) {
          return range3;
        }
        var boundary = index + (part.from == anchor.ch == (part.level != 1) ? 0 : 1);
        if (boundary == 0 || boundary == order.length) {
          return range3;
        }
        var leftSide;
        if (head.line != anchor.line) {
          leftSide = (head.line - anchor.line) * (cm.doc.direction == "ltr" ? 1 : -1) > 0;
        } else {
          var headIndex = getBidiPartAt(order, head.ch, head.sticky);
          var dir = headIndex - index || (head.ch - anchor.ch) * (part.level == 1 ? -1 : 1);
          if (headIndex == boundary - 1 || headIndex == boundary) {
            leftSide = dir < 0;
          } else {
            leftSide = dir > 0;
          }
        }
        var usePart = order[boundary + (leftSide ? -1 : 0)];
        var from = leftSide == (usePart.level == 1);
        var ch = from ? usePart.from : usePart.to, sticky = from ? "after" : "before";
        return anchor.ch == ch && anchor.sticky == sticky ? range3 : new Range(new Pos(anchor.line, ch, sticky), head);
      }
      function gutterEvent(cm, e, type, prevent) {
        var mX, mY;
        if (e.touches) {
          mX = e.touches[0].clientX;
          mY = e.touches[0].clientY;
        } else {
          try {
            mX = e.clientX;
            mY = e.clientY;
          } catch (e$1) {
            return false;
          }
        }
        if (mX >= Math.floor(cm.display.gutters.getBoundingClientRect().right)) {
          return false;
        }
        if (prevent) {
          e_preventDefault(e);
        }
        var display = cm.display;
        var lineBox = display.lineDiv.getBoundingClientRect();
        if (mY > lineBox.bottom || !hasHandler(cm, type)) {
          return e_defaultPrevented(e);
        }
        mY -= lineBox.top - display.viewOffset;
        for (var i2 = 0; i2 < cm.display.gutterSpecs.length; ++i2) {
          var g = display.gutters.childNodes[i2];
          if (g && g.getBoundingClientRect().right >= mX) {
            var line = lineAtHeight(cm.doc, mY);
            var gutter = cm.display.gutterSpecs[i2];
            signal(cm, type, cm, line, gutter.className, e);
            return e_defaultPrevented(e);
          }
        }
      }
      function clickInGutter(cm, e) {
        return gutterEvent(cm, e, "gutterClick", true);
      }
      function onContextMenu(cm, e) {
        if (eventInWidget(cm.display, e) || contextMenuInGutter(cm, e)) {
          return;
        }
        if (signalDOMEvent(cm, e, "contextmenu")) {
          return;
        }
        if (!captureRightClick) {
          cm.display.input.onContextMenu(e);
        }
      }
      function contextMenuInGutter(cm, e) {
        if (!hasHandler(cm, "gutterContextMenu")) {
          return false;
        }
        return gutterEvent(cm, e, "gutterContextMenu", false);
      }
      function themeChanged(cm) {
        cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + cm.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
        clearCaches(cm);
      }
      var Init = { toString: function() {
        return "CodeMirror.Init";
      } };
      var defaults = {};
      var optionHandlers = {};
      function defineOptions(CodeMirror3) {
        var optionHandlers2 = CodeMirror3.optionHandlers;
        function option(name, deflt, handle, notOnInit) {
          CodeMirror3.defaults[name] = deflt;
          if (handle) {
            optionHandlers2[name] = notOnInit ? function(cm, val, old) {
              if (old != Init) {
                handle(cm, val, old);
              }
            } : handle;
          }
        }
        CodeMirror3.defineOption = option;
        CodeMirror3.Init = Init;
        option("value", "", function(cm, val) {
          return cm.setValue(val);
        }, true);
        option("mode", null, function(cm, val) {
          cm.doc.modeOption = val;
          loadMode(cm);
        }, true);
        option("indentUnit", 2, loadMode, true);
        option("indentWithTabs", false);
        option("smartIndent", true);
        option("tabSize", 4, function(cm) {
          resetModeState(cm);
          clearCaches(cm);
          regChange(cm);
        }, true);
        option("lineSeparator", null, function(cm, val) {
          cm.doc.lineSep = val;
          if (!val) {
            return;
          }
          var newBreaks = [], lineNo2 = cm.doc.first;
          cm.doc.iter(function(line) {
            for (var pos = 0; ; ) {
              var found = line.text.indexOf(val, pos);
              if (found == -1) {
                break;
              }
              pos = found + val.length;
              newBreaks.push(Pos(lineNo2, found));
            }
            lineNo2++;
          });
          for (var i2 = newBreaks.length - 1; i2 >= 0; i2--) {
            replaceRange(cm.doc, val, newBreaks[i2], Pos(newBreaks[i2].line, newBreaks[i2].ch + val.length));
          }
        });
        option("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\u202d\u202e\u2066\u2067\u2069\ufeff\ufff9-\ufffc]/g, function(cm, val, old) {
          cm.state.specialChars = new RegExp(val.source + (val.test("	") ? "" : "|	"), "g");
          if (old != Init) {
            cm.refresh();
          }
        });
        option("specialCharPlaceholder", defaultSpecialCharPlaceholder, function(cm) {
          return cm.refresh();
        }, true);
        option("electricChars", true);
        option("inputStyle", mobile ? "contenteditable" : "textarea", function() {
          throw new Error("inputStyle can not (yet) be changed in a running editor");
        }, true);
        option("spellcheck", false, function(cm, val) {
          return cm.getInputField().spellcheck = val;
        }, true);
        option("autocorrect", false, function(cm, val) {
          return cm.getInputField().autocorrect = val;
        }, true);
        option("autocapitalize", false, function(cm, val) {
          return cm.getInputField().autocapitalize = val;
        }, true);
        option("rtlMoveVisually", !windows);
        option("wholeLineUpdateBefore", true);
        option("theme", "default", function(cm) {
          themeChanged(cm);
          updateGutters(cm);
        }, true);
        option("keyMap", "default", function(cm, val, old) {
          var next = getKeyMap(val);
          var prev = old != Init && getKeyMap(old);
          if (prev && prev.detach) {
            prev.detach(cm, next);
          }
          if (next.attach) {
            next.attach(cm, prev || null);
          }
        });
        option("extraKeys", null);
        option("configureMouse", null);
        option("lineWrapping", false, wrappingChanged, true);
        option("gutters", [], function(cm, val) {
          cm.display.gutterSpecs = getGutters(val, cm.options.lineNumbers);
          updateGutters(cm);
        }, true);
        option("fixedGutter", true, function(cm, val) {
          cm.display.gutters.style.left = val ? compensateForHScroll(cm.display) + "px" : "0";
          cm.refresh();
        }, true);
        option("coverGutterNextToScrollbar", false, function(cm) {
          return updateScrollbars(cm);
        }, true);
        option("scrollbarStyle", "native", function(cm) {
          initScrollbars(cm);
          updateScrollbars(cm);
          cm.display.scrollbars.setScrollTop(cm.doc.scrollTop);
          cm.display.scrollbars.setScrollLeft(cm.doc.scrollLeft);
        }, true);
        option("lineNumbers", false, function(cm, val) {
          cm.display.gutterSpecs = getGutters(cm.options.gutters, val);
          updateGutters(cm);
        }, true);
        option("firstLineNumber", 1, updateGutters, true);
        option("lineNumberFormatter", function(integer) {
          return integer;
        }, updateGutters, true);
        option("showCursorWhenSelecting", false, updateSelection, true);
        option("resetSelectionOnContextMenu", true);
        option("lineWiseCopyCut", true);
        option("pasteLinesPerSelection", true);
        option("selectionsMayTouch", false);
        option("readOnly", false, function(cm, val) {
          if (val == "nocursor") {
            onBlur(cm);
            cm.display.input.blur();
          }
          cm.display.input.readOnlyChanged(val);
        });
        option("screenReaderLabel", null, function(cm, val) {
          val = val === "" ? null : val;
          cm.display.input.screenReaderLabelChanged(val);
        });
        option("disableInput", false, function(cm, val) {
          if (!val) {
            cm.display.input.reset();
          }
        }, true);
        option("dragDrop", true, dragDropChanged);
        option("allowDropFileTypes", null);
        option("cursorBlinkRate", 530);
        option("cursorScrollMargin", 0);
        option("cursorHeight", 1, updateSelection, true);
        option("singleCursorHeightPerLine", true, updateSelection, true);
        option("workTime", 100);
        option("workDelay", 100);
        option("flattenSpans", true, resetModeState, true);
        option("addModeClass", false, resetModeState, true);
        option("pollInterval", 100);
        option("undoDepth", 200, function(cm, val) {
          return cm.doc.history.undoDepth = val;
        });
        option("historyEventDelay", 1250);
        option("viewportMargin", 10, function(cm) {
          return cm.refresh();
        }, true);
        option("maxHighlightLength", 1e4, resetModeState, true);
        option("moveInputWithCursor", true, function(cm, val) {
          if (!val) {
            cm.display.input.resetPosition();
          }
        });
        option("tabindex", null, function(cm, val) {
          return cm.display.input.getField().tabIndex = val || "";
        });
        option("autofocus", null);
        option("direction", "ltr", function(cm, val) {
          return cm.doc.setDirection(val);
        }, true);
        option("phrases", null);
      }
      function dragDropChanged(cm, value, old) {
        var wasOn = old && old != Init;
        if (!value != !wasOn) {
          var funcs = cm.display.dragFunctions;
          var toggle = value ? on : off;
          toggle(cm.display.scroller, "dragstart", funcs.start);
          toggle(cm.display.scroller, "dragenter", funcs.enter);
          toggle(cm.display.scroller, "dragover", funcs.over);
          toggle(cm.display.scroller, "dragleave", funcs.leave);
          toggle(cm.display.scroller, "drop", funcs.drop);
        }
      }
      function wrappingChanged(cm) {
        if (cm.options.lineWrapping) {
          addClass2(cm.display.wrapper, "CodeMirror-wrap");
          cm.display.sizer.style.minWidth = "";
          cm.display.sizerWidth = null;
        } else {
          rmClass(cm.display.wrapper, "CodeMirror-wrap");
          findMaxLine(cm);
        }
        estimateLineHeights(cm);
        regChange(cm);
        clearCaches(cm);
        setTimeout(function() {
          return updateScrollbars(cm);
        }, 100);
      }
      function CodeMirror2(place, options) {
        var this$1$1 = this;
        if (!(this instanceof CodeMirror2)) {
          return new CodeMirror2(place, options);
        }
        this.options = options = options ? copyObj(options) : {};
        copyObj(defaults, options, false);
        var doc2 = options.value;
        if (typeof doc2 == "string") {
          doc2 = new Doc(doc2, options.mode, null, options.lineSeparator, options.direction);
        } else if (options.mode) {
          doc2.modeOption = options.mode;
        }
        this.doc = doc2;
        var input = new CodeMirror2.inputStyles[options.inputStyle](this);
        var display = this.display = new Display(place, doc2, input, options);
        display.wrapper.CodeMirror = this;
        themeChanged(this);
        if (options.lineWrapping) {
          this.display.wrapper.className += " CodeMirror-wrap";
        }
        initScrollbars(this);
        this.state = {
          keyMaps: [],
          // stores maps added by addKeyMap
          overlays: [],
          // highlighting overlays, as added by addOverlay
          modeGen: 0,
          // bumped when mode/overlay changes, used to invalidate highlighting info
          overwrite: false,
          delayingBlurEvent: false,
          focused: false,
          suppressEdits: false,
          // used to disable editing during key handlers when in readOnly mode
          pasteIncoming: -1,
          cutIncoming: -1,
          // help recognize paste/cut edits in input.poll
          selectingText: false,
          draggingText: false,
          highlight: new Delayed(),
          // stores highlight worker timeout
          keySeq: null,
          // Unfinished key sequence
          specialChars: null
        };
        if (options.autofocus && !mobile) {
          display.input.focus();
        }
        if (ie && ie_version < 11) {
          setTimeout(function() {
            return this$1$1.display.input.reset(true);
          }, 20);
        }
        registerEventHandlers(this);
        ensureGlobalHandlers();
        startOperation(this);
        this.curOp.forceUpdate = true;
        attachDoc(this, doc2);
        if (options.autofocus && !mobile || this.hasFocus()) {
          setTimeout(function() {
            if (this$1$1.hasFocus() && !this$1$1.state.focused) {
              onFocus(this$1$1);
            }
          }, 20);
        } else {
          onBlur(this);
        }
        for (var opt in optionHandlers) {
          if (optionHandlers.hasOwnProperty(opt)) {
            optionHandlers[opt](this, options[opt], Init);
          }
        }
        maybeUpdateLineNumberWidth(this);
        if (options.finishInit) {
          options.finishInit(this);
        }
        for (var i2 = 0; i2 < initHooks.length; ++i2) {
          initHooks[i2](this);
        }
        endOperation(this);
        if (webkit && options.lineWrapping && getComputedStyle(display.lineDiv).textRendering == "optimizelegibility") {
          display.lineDiv.style.textRendering = "auto";
        }
      }
      CodeMirror2.defaults = defaults;
      CodeMirror2.optionHandlers = optionHandlers;
      function registerEventHandlers(cm) {
        var d = cm.display;
        on(d.scroller, "mousedown", operation(cm, onMouseDown));
        if (ie && ie_version < 11) {
          on(d.scroller, "dblclick", operation(cm, function(e) {
            if (signalDOMEvent(cm, e)) {
              return;
            }
            var pos = posFromMouse(cm, e);
            if (!pos || clickInGutter(cm, e) || eventInWidget(cm.display, e)) {
              return;
            }
            e_preventDefault(e);
            var word = cm.findWordAt(pos);
            extendSelection(cm.doc, word.anchor, word.head);
          }));
        } else {
          on(d.scroller, "dblclick", function(e) {
            return signalDOMEvent(cm, e) || e_preventDefault(e);
          });
        }
        on(d.scroller, "contextmenu", function(e) {
          return onContextMenu(cm, e);
        });
        on(d.input.getField(), "contextmenu", function(e) {
          if (!d.scroller.contains(e.target)) {
            onContextMenu(cm, e);
          }
        });
        var touchFinished, prevTouch = { end: 0 };
        function finishTouch() {
          if (d.activeTouch) {
            touchFinished = setTimeout(function() {
              return d.activeTouch = null;
            }, 1e3);
            prevTouch = d.activeTouch;
            prevTouch.end = +/* @__PURE__ */ new Date();
          }
        }
        function isMouseLikeTouchEvent(e) {
          if (e.touches.length != 1) {
            return false;
          }
          var touch = e.touches[0];
          return touch.radiusX <= 1 && touch.radiusY <= 1;
        }
        function farAway(touch, other) {
          if (other.left == null) {
            return true;
          }
          var dx = other.left - touch.left, dy = other.top - touch.top;
          return dx * dx + dy * dy > 20 * 20;
        }
        on(d.scroller, "touchstart", function(e) {
          if (!signalDOMEvent(cm, e) && !isMouseLikeTouchEvent(e) && !clickInGutter(cm, e)) {
            d.input.ensurePolled();
            clearTimeout(touchFinished);
            var now = +/* @__PURE__ */ new Date();
            d.activeTouch = {
              start: now,
              moved: false,
              prev: now - prevTouch.end <= 300 ? prevTouch : null
            };
            if (e.touches.length == 1) {
              d.activeTouch.left = e.touches[0].pageX;
              d.activeTouch.top = e.touches[0].pageY;
            }
          }
        });
        on(d.scroller, "touchmove", function() {
          if (d.activeTouch) {
            d.activeTouch.moved = true;
          }
        });
        on(d.scroller, "touchend", function(e) {
          var touch = d.activeTouch;
          if (touch && !eventInWidget(d, e) && touch.left != null && !touch.moved && /* @__PURE__ */ new Date() - touch.start < 300) {
            var pos = cm.coordsChar(d.activeTouch, "page"), range3;
            if (!touch.prev || farAway(touch, touch.prev)) {
              range3 = new Range(pos, pos);
            } else if (!touch.prev.prev || farAway(touch, touch.prev.prev)) {
              range3 = cm.findWordAt(pos);
            } else {
              range3 = new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0)));
            }
            cm.setSelection(range3.anchor, range3.head);
            cm.focus();
            e_preventDefault(e);
          }
          finishTouch();
        });
        on(d.scroller, "touchcancel", finishTouch);
        on(d.scroller, "scroll", function() {
          if (d.scroller.clientHeight) {
            updateScrollTop(cm, d.scroller.scrollTop);
            setScrollLeft(cm, d.scroller.scrollLeft, true);
            signal(cm, "scroll", cm);
          }
        });
        on(d.scroller, "mousewheel", function(e) {
          return onScrollWheel(cm, e);
        });
        on(d.scroller, "DOMMouseScroll", function(e) {
          return onScrollWheel(cm, e);
        });
        on(d.wrapper, "scroll", function() {
          return d.wrapper.scrollTop = d.wrapper.scrollLeft = 0;
        });
        d.dragFunctions = {
          enter: function(e) {
            if (!signalDOMEvent(cm, e)) {
              e_stop(e);
            }
          },
          over: function(e) {
            if (!signalDOMEvent(cm, e)) {
              onDragOver(cm, e);
              e_stop(e);
            }
          },
          start: function(e) {
            return onDragStart(cm, e);
          },
          drop: operation(cm, onDrop),
          leave: function(e) {
            if (!signalDOMEvent(cm, e)) {
              clearDragCursor(cm);
            }
          }
        };
        var inp = d.input.getField();
        on(inp, "keyup", function(e) {
          return onKeyUp.call(cm, e);
        });
        on(inp, "keydown", operation(cm, onKeyDown));
        on(inp, "keypress", operation(cm, onKeyPress));
        on(inp, "focus", function(e) {
          return onFocus(cm, e);
        });
        on(inp, "blur", function(e) {
          return onBlur(cm, e);
        });
      }
      var initHooks = [];
      CodeMirror2.defineInitHook = function(f) {
        return initHooks.push(f);
      };
      function indentLine(cm, n, how, aggressive) {
        var doc2 = cm.doc, state;
        if (how == null) {
          how = "add";
        }
        if (how == "smart") {
          if (!doc2.mode.indent) {
            how = "prev";
          } else {
            state = getContextBefore(cm, n).state;
          }
        }
        var tabSize = cm.options.tabSize;
        var line = getLine(doc2, n), curSpace = countColumn(line.text, null, tabSize);
        if (line.stateAfter) {
          line.stateAfter = null;
        }
        var curSpaceString = line.text.match(/^\s*/)[0], indentation;
        if (!aggressive && !/\S/.test(line.text)) {
          indentation = 0;
          how = "not";
        } else if (how == "smart") {
          indentation = doc2.mode.indent(state, line.text.slice(curSpaceString.length), line.text);
          if (indentation == Pass || indentation > 150) {
            if (!aggressive) {
              return;
            }
            how = "prev";
          }
        }
        if (how == "prev") {
          if (n > doc2.first) {
            indentation = countColumn(getLine(doc2, n - 1).text, null, tabSize);
          } else {
            indentation = 0;
          }
        } else if (how == "add") {
          indentation = curSpace + cm.options.indentUnit;
        } else if (how == "subtract") {
          indentation = curSpace - cm.options.indentUnit;
        } else if (typeof how == "number") {
          indentation = curSpace + how;
        }
        indentation = Math.max(0, indentation);
        var indentString = "", pos = 0;
        if (cm.options.indentWithTabs) {
          for (var i2 = Math.floor(indentation / tabSize); i2; --i2) {
            pos += tabSize;
            indentString += "	";
          }
        }
        if (pos < indentation) {
          indentString += spaceStr(indentation - pos);
        }
        if (indentString != curSpaceString) {
          replaceRange(doc2, indentString, Pos(n, 0), Pos(n, curSpaceString.length), "+input");
          line.stateAfter = null;
          return true;
        } else {
          for (var i$12 = 0; i$12 < doc2.sel.ranges.length; i$12++) {
            var range3 = doc2.sel.ranges[i$12];
            if (range3.head.line == n && range3.head.ch < curSpaceString.length) {
              var pos$1 = Pos(n, curSpaceString.length);
              replaceOneSelection(doc2, i$12, new Range(pos$1, pos$1));
              break;
            }
          }
        }
      }
      var lastCopied = null;
      function setLastCopied(newLastCopied) {
        lastCopied = newLastCopied;
      }
      function applyTextInput(cm, inserted, deleted, sel, origin) {
        var doc2 = cm.doc;
        cm.display.shift = false;
        if (!sel) {
          sel = doc2.sel;
        }
        var recent = +/* @__PURE__ */ new Date() - 200;
        var paste = origin == "paste" || cm.state.pasteIncoming > recent;
        var textLines = splitLinesAuto(inserted), multiPaste = null;
        if (paste && sel.ranges.length > 1) {
          if (lastCopied && lastCopied.text.join("\n") == inserted) {
            if (sel.ranges.length % lastCopied.text.length == 0) {
              multiPaste = [];
              for (var i2 = 0; i2 < lastCopied.text.length; i2++) {
                multiPaste.push(doc2.splitLines(lastCopied.text[i2]));
              }
            }
          } else if (textLines.length == sel.ranges.length && cm.options.pasteLinesPerSelection) {
            multiPaste = map(textLines, function(l) {
              return [l];
            });
          }
        }
        var updateInput = cm.curOp.updateInput;
        for (var i$12 = sel.ranges.length - 1; i$12 >= 0; i$12--) {
          var range3 = sel.ranges[i$12];
          var from = range3.from(), to = range3.to();
          if (range3.empty()) {
            if (deleted && deleted > 0) {
              from = Pos(from.line, from.ch - deleted);
            } else if (cm.state.overwrite && !paste) {
              to = Pos(to.line, Math.min(getLine(doc2, to.line).text.length, to.ch + lst(textLines).length));
            } else if (paste && lastCopied && lastCopied.lineWise && lastCopied.text.join("\n") == textLines.join("\n")) {
              from = to = Pos(from.line, 0);
            }
          }
          var changeEvent = {
            from,
            to,
            text: multiPaste ? multiPaste[i$12 % multiPaste.length] : textLines,
            origin: origin || (paste ? "paste" : cm.state.cutIncoming > recent ? "cut" : "+input")
          };
          makeChange(cm.doc, changeEvent);
          signalLater(cm, "inputRead", cm, changeEvent);
        }
        if (inserted && !paste) {
          triggerElectric(cm, inserted);
        }
        ensureCursorVisible(cm);
        if (cm.curOp.updateInput < 2) {
          cm.curOp.updateInput = updateInput;
        }
        cm.curOp.typing = true;
        cm.state.pasteIncoming = cm.state.cutIncoming = -1;
      }
      function handlePaste(e, cm) {
        var pasted = e.clipboardData && e.clipboardData.getData("Text");
        if (pasted) {
          e.preventDefault();
          if (!cm.isReadOnly() && !cm.options.disableInput && cm.hasFocus()) {
            runInOp(cm, function() {
              return applyTextInput(cm, pasted, 0, null, "paste");
            });
          }
          return true;
        }
      }
      function triggerElectric(cm, inserted) {
        if (!cm.options.electricChars || !cm.options.smartIndent) {
          return;
        }
        var sel = cm.doc.sel;
        for (var i2 = sel.ranges.length - 1; i2 >= 0; i2--) {
          var range3 = sel.ranges[i2];
          if (range3.head.ch > 100 || i2 && sel.ranges[i2 - 1].head.line == range3.head.line) {
            continue;
          }
          var mode = cm.getModeAt(range3.head);
          var indented = false;
          if (mode.electricChars) {
            for (var j = 0; j < mode.electricChars.length; j++) {
              if (inserted.indexOf(mode.electricChars.charAt(j)) > -1) {
                indented = indentLine(cm, range3.head.line, "smart");
                break;
              }
            }
          } else if (mode.electricInput) {
            if (mode.electricInput.test(getLine(cm.doc, range3.head.line).text.slice(0, range3.head.ch))) {
              indented = indentLine(cm, range3.head.line, "smart");
            }
          }
          if (indented) {
            signalLater(cm, "electricInput", cm, range3.head.line);
          }
        }
      }
      function copyableRanges(cm) {
        var text = [], ranges = [];
        for (var i2 = 0; i2 < cm.doc.sel.ranges.length; i2++) {
          var line = cm.doc.sel.ranges[i2].head.line;
          var lineRange = { anchor: Pos(line, 0), head: Pos(line + 1, 0) };
          ranges.push(lineRange);
          text.push(cm.getRange(lineRange.anchor, lineRange.head));
        }
        return { text, ranges };
      }
      function disableBrowserMagic(field, spellcheck, autocorrect, autocapitalize) {
        field.setAttribute("autocorrect", autocorrect ? "on" : "off");
        field.setAttribute("autocapitalize", autocapitalize ? "on" : "off");
        field.setAttribute("spellcheck", !!spellcheck);
      }
      function hiddenTextarea() {
        var te = elt("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none");
        var div = elt("div", [te], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        if (webkit) {
          te.style.width = "1000px";
        } else {
          te.setAttribute("wrap", "off");
        }
        if (ios) {
          te.style.border = "1px solid black";
        }
        return div;
      }
      function addEditorMethods(CodeMirror3) {
        var optionHandlers2 = CodeMirror3.optionHandlers;
        var helpers = CodeMirror3.helpers = {};
        CodeMirror3.prototype = {
          constructor: CodeMirror3,
          focus: function() {
            win(this).focus();
            this.display.input.focus();
          },
          setOption: function(option, value) {
            var options = this.options, old = options[option];
            if (options[option] == value && option != "mode") {
              return;
            }
            options[option] = value;
            if (optionHandlers2.hasOwnProperty(option)) {
              operation(this, optionHandlers2[option])(this, value, old);
            }
            signal(this, "optionChange", this, option);
          },
          getOption: function(option) {
            return this.options[option];
          },
          getDoc: function() {
            return this.doc;
          },
          addKeyMap: function(map2, bottom) {
            this.state.keyMaps[bottom ? "push" : "unshift"](getKeyMap(map2));
          },
          removeKeyMap: function(map2) {
            var maps = this.state.keyMaps;
            for (var i2 = 0; i2 < maps.length; ++i2) {
              if (maps[i2] == map2 || maps[i2].name == map2) {
                maps.splice(i2, 1);
                return true;
              }
            }
          },
          addOverlay: methodOp(function(spec, options) {
            var mode = spec.token ? spec : CodeMirror3.getMode(this.options, spec);
            if (mode.startState) {
              throw new Error("Overlays may not be stateful.");
            }
            insertSorted(
              this.state.overlays,
              {
                mode,
                modeSpec: spec,
                opaque: options && options.opaque,
                priority: options && options.priority || 0
              },
              function(overlay) {
                return overlay.priority;
              }
            );
            this.state.modeGen++;
            regChange(this);
          }),
          removeOverlay: methodOp(function(spec) {
            var overlays = this.state.overlays;
            for (var i2 = 0; i2 < overlays.length; ++i2) {
              var cur = overlays[i2].modeSpec;
              if (cur == spec || typeof spec == "string" && cur.name == spec) {
                overlays.splice(i2, 1);
                this.state.modeGen++;
                regChange(this);
                return;
              }
            }
          }),
          indentLine: methodOp(function(n, dir, aggressive) {
            if (typeof dir != "string" && typeof dir != "number") {
              if (dir == null) {
                dir = this.options.smartIndent ? "smart" : "prev";
              } else {
                dir = dir ? "add" : "subtract";
              }
            }
            if (isLine(this.doc, n)) {
              indentLine(this, n, dir, aggressive);
            }
          }),
          indentSelection: methodOp(function(how) {
            var ranges = this.doc.sel.ranges, end = -1;
            for (var i2 = 0; i2 < ranges.length; i2++) {
              var range3 = ranges[i2];
              if (!range3.empty()) {
                var from = range3.from(), to = range3.to();
                var start = Math.max(end, from.line);
                end = Math.min(this.lastLine(), to.line - (to.ch ? 0 : 1)) + 1;
                for (var j = start; j < end; ++j) {
                  indentLine(this, j, how);
                }
                var newRanges = this.doc.sel.ranges;
                if (from.ch == 0 && ranges.length == newRanges.length && newRanges[i2].from().ch > 0) {
                  replaceOneSelection(this.doc, i2, new Range(from, newRanges[i2].to()), sel_dontScroll);
                }
              } else if (range3.head.line > end) {
                indentLine(this, range3.head.line, how, true);
                end = range3.head.line;
                if (i2 == this.doc.sel.primIndex) {
                  ensureCursorVisible(this);
                }
              }
            }
          }),
          // Fetch the parser token for a given character. Useful for hacks
          // that want to inspect the mode state (say, for completion).
          getTokenAt: function(pos, precise) {
            return takeToken(this, pos, precise);
          },
          getLineTokens: function(line, precise) {
            return takeToken(this, Pos(line), precise, true);
          },
          getTokenTypeAt: function(pos) {
            pos = clipPos(this.doc, pos);
            var styles = getLineStyles(this, getLine(this.doc, pos.line));
            var before = 0, after = (styles.length - 1) / 2, ch = pos.ch;
            var type;
            if (ch == 0) {
              type = styles[2];
            } else {
              for (; ; ) {
                var mid = before + after >> 1;
                if ((mid ? styles[mid * 2 - 1] : 0) >= ch) {
                  after = mid;
                } else if (styles[mid * 2 + 1] < ch) {
                  before = mid + 1;
                } else {
                  type = styles[mid * 2 + 2];
                  break;
                }
              }
            }
            var cut = type ? type.indexOf("overlay ") : -1;
            return cut < 0 ? type : cut == 0 ? null : type.slice(0, cut - 1);
          },
          getModeAt: function(pos) {
            var mode = this.doc.mode;
            if (!mode.innerMode) {
              return mode;
            }
            return CodeMirror3.innerMode(mode, this.getTokenAt(pos).state).mode;
          },
          getHelper: function(pos, type) {
            return this.getHelpers(pos, type)[0];
          },
          getHelpers: function(pos, type) {
            var found = [];
            if (!helpers.hasOwnProperty(type)) {
              return found;
            }
            var help = helpers[type], mode = this.getModeAt(pos);
            if (typeof mode[type] == "string") {
              if (help[mode[type]]) {
                found.push(help[mode[type]]);
              }
            } else if (mode[type]) {
              for (var i2 = 0; i2 < mode[type].length; i2++) {
                var val = help[mode[type][i2]];
                if (val) {
                  found.push(val);
                }
              }
            } else if (mode.helperType && help[mode.helperType]) {
              found.push(help[mode.helperType]);
            } else if (help[mode.name]) {
              found.push(help[mode.name]);
            }
            for (var i$12 = 0; i$12 < help._global.length; i$12++) {
              var cur = help._global[i$12];
              if (cur.pred(mode, this) && indexOf(found, cur.val) == -1) {
                found.push(cur.val);
              }
            }
            return found;
          },
          getStateAfter: function(line, precise) {
            var doc2 = this.doc;
            line = clipLine(doc2, line == null ? doc2.first + doc2.size - 1 : line);
            return getContextBefore(this, line + 1, precise).state;
          },
          cursorCoords: function(start, mode) {
            var pos, range3 = this.doc.sel.primary();
            if (start == null) {
              pos = range3.head;
            } else if (typeof start == "object") {
              pos = clipPos(this.doc, start);
            } else {
              pos = start ? range3.from() : range3.to();
            }
            return cursorCoords(this, pos, mode || "page");
          },
          charCoords: function(pos, mode) {
            return charCoords(this, clipPos(this.doc, pos), mode || "page");
          },
          coordsChar: function(coords, mode) {
            coords = fromCoordSystem(this, coords, mode || "page");
            return coordsChar(this, coords.left, coords.top);
          },
          lineAtHeight: function(height, mode) {
            height = fromCoordSystem(this, { top: height, left: 0 }, mode || "page").top;
            return lineAtHeight(this.doc, height + this.display.viewOffset);
          },
          heightAtLine: function(line, mode, includeWidgets) {
            var end = false, lineObj;
            if (typeof line == "number") {
              var last = this.doc.first + this.doc.size - 1;
              if (line < this.doc.first) {
                line = this.doc.first;
              } else if (line > last) {
                line = last;
                end = true;
              }
              lineObj = getLine(this.doc, line);
            } else {
              lineObj = line;
            }
            return intoCoordSystem(this, lineObj, { top: 0, left: 0 }, mode || "page", includeWidgets || end).top + (end ? this.doc.height - heightAtLine(lineObj) : 0);
          },
          defaultTextHeight: function() {
            return textHeight(this.display);
          },
          defaultCharWidth: function() {
            return charWidth(this.display);
          },
          getViewport: function() {
            return { from: this.display.viewFrom, to: this.display.viewTo };
          },
          addWidget: function(pos, node, scroll, vert, horiz) {
            var display = this.display;
            pos = cursorCoords(this, clipPos(this.doc, pos));
            var top = pos.bottom, left = pos.left;
            node.style.position = "absolute";
            node.setAttribute("cm-ignore-events", "true");
            this.display.input.setUneditable(node);
            display.sizer.appendChild(node);
            if (vert == "over") {
              top = pos.top;
            } else if (vert == "above" || vert == "near") {
              var vspace = Math.max(display.wrapper.clientHeight, this.doc.height), hspace = Math.max(display.sizer.clientWidth, display.lineSpace.clientWidth);
              if ((vert == "above" || pos.bottom + node.offsetHeight > vspace) && pos.top > node.offsetHeight) {
                top = pos.top - node.offsetHeight;
              } else if (pos.bottom + node.offsetHeight <= vspace) {
                top = pos.bottom;
              }
              if (left + node.offsetWidth > hspace) {
                left = hspace - node.offsetWidth;
              }
            }
            node.style.top = top + "px";
            node.style.left = node.style.right = "";
            if (horiz == "right") {
              left = display.sizer.clientWidth - node.offsetWidth;
              node.style.right = "0px";
            } else {
              if (horiz == "left") {
                left = 0;
              } else if (horiz == "middle") {
                left = (display.sizer.clientWidth - node.offsetWidth) / 2;
              }
              node.style.left = left + "px";
            }
            if (scroll) {
              scrollIntoView(this, { left, top, right: left + node.offsetWidth, bottom: top + node.offsetHeight });
            }
          },
          triggerOnKeyDown: methodOp(onKeyDown),
          triggerOnKeyPress: methodOp(onKeyPress),
          triggerOnKeyUp: onKeyUp,
          triggerOnMouseDown: methodOp(onMouseDown),
          execCommand: function(cmd) {
            if (commands.hasOwnProperty(cmd)) {
              return commands[cmd].call(null, this);
            }
          },
          triggerElectric: methodOp(function(text) {
            triggerElectric(this, text);
          }),
          findPosH: function(from, amount, unit, visually) {
            var dir = 1;
            if (amount < 0) {
              dir = -1;
              amount = -amount;
            }
            var cur = clipPos(this.doc, from);
            for (var i2 = 0; i2 < amount; ++i2) {
              cur = findPosH(this.doc, cur, dir, unit, visually);
              if (cur.hitSide) {
                break;
              }
            }
            return cur;
          },
          moveH: methodOp(function(dir, unit) {
            var this$1$1 = this;
            this.extendSelectionsBy(function(range3) {
              if (this$1$1.display.shift || this$1$1.doc.extend || range3.empty()) {
                return findPosH(this$1$1.doc, range3.head, dir, unit, this$1$1.options.rtlMoveVisually);
              } else {
                return dir < 0 ? range3.from() : range3.to();
              }
            }, sel_move);
          }),
          deleteH: methodOp(function(dir, unit) {
            var sel = this.doc.sel, doc2 = this.doc;
            if (sel.somethingSelected()) {
              doc2.replaceSelection("", null, "+delete");
            } else {
              deleteNearSelection(this, function(range3) {
                var other = findPosH(doc2, range3.head, dir, unit, false);
                return dir < 0 ? { from: other, to: range3.head } : { from: range3.head, to: other };
              });
            }
          }),
          findPosV: function(from, amount, unit, goalColumn) {
            var dir = 1, x = goalColumn;
            if (amount < 0) {
              dir = -1;
              amount = -amount;
            }
            var cur = clipPos(this.doc, from);
            for (var i2 = 0; i2 < amount; ++i2) {
              var coords = cursorCoords(this, cur, "div");
              if (x == null) {
                x = coords.left;
              } else {
                coords.left = x;
              }
              cur = findPosV(this, coords, dir, unit);
              if (cur.hitSide) {
                break;
              }
            }
            return cur;
          },
          moveV: methodOp(function(dir, unit) {
            var this$1$1 = this;
            var doc2 = this.doc, goals = [];
            var collapse = !this.display.shift && !doc2.extend && doc2.sel.somethingSelected();
            doc2.extendSelectionsBy(function(range3) {
              if (collapse) {
                return dir < 0 ? range3.from() : range3.to();
              }
              var headPos = cursorCoords(this$1$1, range3.head, "div");
              if (range3.goalColumn != null) {
                headPos.left = range3.goalColumn;
              }
              goals.push(headPos.left);
              var pos = findPosV(this$1$1, headPos, dir, unit);
              if (unit == "page" && range3 == doc2.sel.primary()) {
                addToScrollTop(this$1$1, charCoords(this$1$1, pos, "div").top - headPos.top);
              }
              return pos;
            }, sel_move);
            if (goals.length) {
              for (var i2 = 0; i2 < doc2.sel.ranges.length; i2++) {
                doc2.sel.ranges[i2].goalColumn = goals[i2];
              }
            }
          }),
          // Find the word at the given position (as returned by coordsChar).
          findWordAt: function(pos) {
            var doc2 = this.doc, line = getLine(doc2, pos.line).text;
            var start = pos.ch, end = pos.ch;
            if (line) {
              var helper = this.getHelper(pos, "wordChars");
              if ((pos.sticky == "before" || end == line.length) && start) {
                --start;
              } else {
                ++end;
              }
              var startChar = line.charAt(start);
              var check = isWordChar(startChar, helper) ? function(ch) {
                return isWordChar(ch, helper);
              } : /\s/.test(startChar) ? function(ch) {
                return /\s/.test(ch);
              } : function(ch) {
                return !/\s/.test(ch) && !isWordChar(ch);
              };
              while (start > 0 && check(line.charAt(start - 1))) {
                --start;
              }
              while (end < line.length && check(line.charAt(end))) {
                ++end;
              }
            }
            return new Range(Pos(pos.line, start), Pos(pos.line, end));
          },
          toggleOverwrite: function(value) {
            if (value != null && value == this.state.overwrite) {
              return;
            }
            if (this.state.overwrite = !this.state.overwrite) {
              addClass2(this.display.cursorDiv, "CodeMirror-overwrite");
            } else {
              rmClass(this.display.cursorDiv, "CodeMirror-overwrite");
            }
            signal(this, "overwriteToggle", this, this.state.overwrite);
          },
          hasFocus: function() {
            return this.display.input.getField() == activeElt(root2(this));
          },
          isReadOnly: function() {
            return !!(this.options.readOnly || this.doc.cantEdit);
          },
          scrollTo: methodOp(function(x, y) {
            scrollToCoords(this, x, y);
          }),
          getScrollInfo: function() {
            var scroller = this.display.scroller;
            return {
              left: scroller.scrollLeft,
              top: scroller.scrollTop,
              height: scroller.scrollHeight - scrollGap(this) - this.display.barHeight,
              width: scroller.scrollWidth - scrollGap(this) - this.display.barWidth,
              clientHeight: displayHeight(this),
              clientWidth: displayWidth(this)
            };
          },
          scrollIntoView: methodOp(function(range3, margin) {
            if (range3 == null) {
              range3 = { from: this.doc.sel.primary().head, to: null };
              if (margin == null) {
                margin = this.options.cursorScrollMargin;
              }
            } else if (typeof range3 == "number") {
              range3 = { from: Pos(range3, 0), to: null };
            } else if (range3.from == null) {
              range3 = { from: range3, to: null };
            }
            if (!range3.to) {
              range3.to = range3.from;
            }
            range3.margin = margin || 0;
            if (range3.from.line != null) {
              scrollToRange(this, range3);
            } else {
              scrollToCoordsRange(this, range3.from, range3.to, range3.margin);
            }
          }),
          setSize: methodOp(function(width, height) {
            var this$1$1 = this;
            var interpret = function(val) {
              return typeof val == "number" || /^\d+$/.test(String(val)) ? val + "px" : val;
            };
            if (width != null) {
              this.display.wrapper.style.width = interpret(width);
            }
            if (height != null) {
              this.display.wrapper.style.height = interpret(height);
            }
            if (this.options.lineWrapping) {
              clearLineMeasurementCache(this);
            }
            var lineNo2 = this.display.viewFrom;
            this.doc.iter(lineNo2, this.display.viewTo, function(line) {
              if (line.widgets) {
                for (var i2 = 0; i2 < line.widgets.length; i2++) {
                  if (line.widgets[i2].noHScroll) {
                    regLineChange(this$1$1, lineNo2, "widget");
                    break;
                  }
                }
              }
              ++lineNo2;
            });
            this.curOp.forceUpdate = true;
            signal(this, "refresh", this);
          }),
          operation: function(f) {
            return runInOp(this, f);
          },
          startOperation: function() {
            return startOperation(this);
          },
          endOperation: function() {
            return endOperation(this);
          },
          refresh: methodOp(function() {
            var oldHeight = this.display.cachedTextHeight;
            regChange(this);
            this.curOp.forceUpdate = true;
            clearCaches(this);
            scrollToCoords(this, this.doc.scrollLeft, this.doc.scrollTop);
            updateGutterSpace(this.display);
            if (oldHeight == null || Math.abs(oldHeight - textHeight(this.display)) > 0.5 || this.options.lineWrapping) {
              estimateLineHeights(this);
            }
            signal(this, "refresh", this);
          }),
          swapDoc: methodOp(function(doc2) {
            var old = this.doc;
            old.cm = null;
            if (this.state.selectingText) {
              this.state.selectingText();
            }
            attachDoc(this, doc2);
            clearCaches(this);
            this.display.input.reset();
            scrollToCoords(this, doc2.scrollLeft, doc2.scrollTop);
            this.curOp.forceScroll = true;
            signalLater(this, "swapDoc", this, old);
            return old;
          }),
          phrase: function(phraseText) {
            var phrases = this.options.phrases;
            return phrases && Object.prototype.hasOwnProperty.call(phrases, phraseText) ? phrases[phraseText] : phraseText;
          },
          getInputField: function() {
            return this.display.input.getField();
          },
          getWrapperElement: function() {
            return this.display.wrapper;
          },
          getScrollerElement: function() {
            return this.display.scroller;
          },
          getGutterElement: function() {
            return this.display.gutters;
          }
        };
        eventMixin(CodeMirror3);
        CodeMirror3.registerHelper = function(type, name, value) {
          if (!helpers.hasOwnProperty(type)) {
            helpers[type] = CodeMirror3[type] = { _global: [] };
          }
          helpers[type][name] = value;
        };
        CodeMirror3.registerGlobalHelper = function(type, name, predicate, value) {
          CodeMirror3.registerHelper(type, name, value);
          helpers[type]._global.push({ pred: predicate, val: value });
        };
      }
      function findPosH(doc2, pos, dir, unit, visually) {
        var oldPos = pos;
        var origDir = dir;
        var lineObj = getLine(doc2, pos.line);
        var lineDir = visually && doc2.direction == "rtl" ? -dir : dir;
        function findNextLine() {
          var l = pos.line + lineDir;
          if (l < doc2.first || l >= doc2.first + doc2.size) {
            return false;
          }
          pos = new Pos(l, pos.ch, pos.sticky);
          return lineObj = getLine(doc2, l);
        }
        function moveOnce(boundToLine) {
          var next;
          if (unit == "codepoint") {
            var ch = lineObj.text.charCodeAt(pos.ch + (dir > 0 ? 0 : -1));
            if (isNaN(ch)) {
              next = null;
            } else {
              var astral = dir > 0 ? ch >= 55296 && ch < 56320 : ch >= 56320 && ch < 57343;
              next = new Pos(pos.line, Math.max(0, Math.min(lineObj.text.length, pos.ch + dir * (astral ? 2 : 1))), -dir);
            }
          } else if (visually) {
            next = moveVisually(doc2.cm, lineObj, pos, dir);
          } else {
            next = moveLogically(lineObj, pos, dir);
          }
          if (next == null) {
            if (!boundToLine && findNextLine()) {
              pos = endOfLine(visually, doc2.cm, lineObj, pos.line, lineDir);
            } else {
              return false;
            }
          } else {
            pos = next;
          }
          return true;
        }
        if (unit == "char" || unit == "codepoint") {
          moveOnce();
        } else if (unit == "column") {
          moveOnce(true);
        } else if (unit == "word" || unit == "group") {
          var sawType = null, group = unit == "group";
          var helper = doc2.cm && doc2.cm.getHelper(pos, "wordChars");
          for (var first = true; ; first = false) {
            if (dir < 0 && !moveOnce(!first)) {
              break;
            }
            var cur = lineObj.text.charAt(pos.ch) || "\n";
            var type = isWordChar(cur, helper) ? "w" : group && cur == "\n" ? "n" : !group || /\s/.test(cur) ? null : "p";
            if (group && !first && !type) {
              type = "s";
            }
            if (sawType && sawType != type) {
              if (dir < 0) {
                dir = 1;
                moveOnce();
                pos.sticky = "after";
              }
              break;
            }
            if (type) {
              sawType = type;
            }
            if (dir > 0 && !moveOnce(!first)) {
              break;
            }
          }
        }
        var result = skipAtomic(doc2, pos, oldPos, origDir, true);
        if (equalCursorPos(oldPos, result)) {
          result.hitSide = true;
        }
        return result;
      }
      function findPosV(cm, pos, dir, unit) {
        var doc2 = cm.doc, x = pos.left, y;
        if (unit == "page") {
          var pageSize = Math.min(cm.display.wrapper.clientHeight, win(cm).innerHeight || doc2(cm).documentElement.clientHeight);
          var moveAmount = Math.max(pageSize - 0.5 * textHeight(cm.display), 3);
          y = (dir > 0 ? pos.bottom : pos.top) + dir * moveAmount;
        } else if (unit == "line") {
          y = dir > 0 ? pos.bottom + 3 : pos.top - 3;
        }
        var target;
        for (; ; ) {
          target = coordsChar(cm, x, y);
          if (!target.outside) {
            break;
          }
          if (dir < 0 ? y <= 0 : y >= doc2.height) {
            target.hitSide = true;
            break;
          }
          y += dir * 5;
        }
        return target;
      }
      var ContentEditableInput = function(cm) {
        this.cm = cm;
        this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null;
        this.polling = new Delayed();
        this.composing = null;
        this.gracePeriod = false;
        this.readDOMTimeout = null;
      };
      ContentEditableInput.prototype.init = function(display) {
        var this$1$1 = this;
        var input = this, cm = input.cm;
        var div = input.div = display.lineDiv;
        div.contentEditable = true;
        disableBrowserMagic(div, cm.options.spellcheck, cm.options.autocorrect, cm.options.autocapitalize);
        function belongsToInput(e) {
          for (var t = e.target; t; t = t.parentNode) {
            if (t == div) {
              return true;
            }
            if (/\bCodeMirror-(?:line)?widget\b/.test(t.className)) {
              break;
            }
          }
          return false;
        }
        on(div, "paste", function(e) {
          if (!belongsToInput(e) || signalDOMEvent(cm, e) || handlePaste(e, cm)) {
            return;
          }
          if (ie_version <= 11) {
            setTimeout(operation(cm, function() {
              return this$1$1.updateFromDOM();
            }), 20);
          }
        });
        on(div, "compositionstart", function(e) {
          this$1$1.composing = { data: e.data, done: false };
        });
        on(div, "compositionupdate", function(e) {
          if (!this$1$1.composing) {
            this$1$1.composing = { data: e.data, done: false };
          }
        });
        on(div, "compositionend", function(e) {
          if (this$1$1.composing) {
            if (e.data != this$1$1.composing.data) {
              this$1$1.readFromDOMSoon();
            }
            this$1$1.composing.done = true;
          }
        });
        on(div, "touchstart", function() {
          return input.forceCompositionEnd();
        });
        on(div, "input", function() {
          if (!this$1$1.composing) {
            this$1$1.readFromDOMSoon();
          }
        });
        function onCopyCut(e) {
          if (!belongsToInput(e) || signalDOMEvent(cm, e)) {
            return;
          }
          if (cm.somethingSelected()) {
            setLastCopied({ lineWise: false, text: cm.getSelections() });
            if (e.type == "cut") {
              cm.replaceSelection("", null, "cut");
            }
          } else if (!cm.options.lineWiseCopyCut) {
            return;
          } else {
            var ranges = copyableRanges(cm);
            setLastCopied({ lineWise: true, text: ranges.text });
            if (e.type == "cut") {
              cm.operation(function() {
                cm.setSelections(ranges.ranges, 0, sel_dontScroll);
                cm.replaceSelection("", null, "cut");
              });
            }
          }
          if (e.clipboardData) {
            e.clipboardData.clearData();
            var content = lastCopied.text.join("\n");
            e.clipboardData.setData("Text", content);
            if (e.clipboardData.getData("Text") == content) {
              e.preventDefault();
              return;
            }
          }
          var kludge = hiddenTextarea(), te = kludge.firstChild;
          disableBrowserMagic(te);
          cm.display.lineSpace.insertBefore(kludge, cm.display.lineSpace.firstChild);
          te.value = lastCopied.text.join("\n");
          var hadFocus = activeElt(rootNode(div));
          selectInput(te);
          setTimeout(function() {
            cm.display.lineSpace.removeChild(kludge);
            hadFocus.focus();
            if (hadFocus == div) {
              input.showPrimarySelection();
            }
          }, 50);
        }
        on(div, "copy", onCopyCut);
        on(div, "cut", onCopyCut);
      };
      ContentEditableInput.prototype.screenReaderLabelChanged = function(label) {
        if (label) {
          this.div.setAttribute("aria-label", label);
        } else {
          this.div.removeAttribute("aria-label");
        }
      };
      ContentEditableInput.prototype.prepareSelection = function() {
        var result = prepareSelection(this.cm, false);
        result.focus = activeElt(rootNode(this.div)) == this.div;
        return result;
      };
      ContentEditableInput.prototype.showSelection = function(info, takeFocus) {
        if (!info || !this.cm.display.view.length) {
          return;
        }
        if (info.focus || takeFocus) {
          this.showPrimarySelection();
        }
        this.showMultipleSelections(info);
      };
      ContentEditableInput.prototype.getSelection = function() {
        return this.cm.display.wrapper.ownerDocument.getSelection();
      };
      ContentEditableInput.prototype.showPrimarySelection = function() {
        var sel = this.getSelection(), cm = this.cm, prim = cm.doc.sel.primary();
        var from = prim.from(), to = prim.to();
        if (cm.display.viewTo == cm.display.viewFrom || from.line >= cm.display.viewTo || to.line < cm.display.viewFrom) {
          sel.removeAllRanges();
          return;
        }
        var curAnchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
        var curFocus = domToPos(cm, sel.focusNode, sel.focusOffset);
        if (curAnchor && !curAnchor.bad && curFocus && !curFocus.bad && cmp(minPos(curAnchor, curFocus), from) == 0 && cmp(maxPos(curAnchor, curFocus), to) == 0) {
          return;
        }
        var view = cm.display.view;
        var start = from.line >= cm.display.viewFrom && posToDOM(cm, from) || { node: view[0].measure.map[2], offset: 0 };
        var end = to.line < cm.display.viewTo && posToDOM(cm, to);
        if (!end) {
          var measure = view[view.length - 1].measure;
          var map2 = measure.maps ? measure.maps[measure.maps.length - 1] : measure.map;
          end = { node: map2[map2.length - 1], offset: map2[map2.length - 2] - map2[map2.length - 3] };
        }
        if (!start || !end) {
          sel.removeAllRanges();
          return;
        }
        var old = sel.rangeCount && sel.getRangeAt(0), rng;
        try {
          rng = range2(start.node, start.offset, end.offset, end.node);
        } catch (e) {
        }
        if (rng) {
          if (!gecko && cm.state.focused) {
            sel.collapse(start.node, start.offset);
            if (!rng.collapsed) {
              sel.removeAllRanges();
              sel.addRange(rng);
            }
          } else {
            sel.removeAllRanges();
            sel.addRange(rng);
          }
          if (old && sel.anchorNode == null) {
            sel.addRange(old);
          } else if (gecko) {
            this.startGracePeriod();
          }
        }
        this.rememberSelection();
      };
      ContentEditableInput.prototype.startGracePeriod = function() {
        var this$1$1 = this;
        clearTimeout(this.gracePeriod);
        this.gracePeriod = setTimeout(function() {
          this$1$1.gracePeriod = false;
          if (this$1$1.selectionChanged()) {
            this$1$1.cm.operation(function() {
              return this$1$1.cm.curOp.selectionChanged = true;
            });
          }
        }, 20);
      };
      ContentEditableInput.prototype.showMultipleSelections = function(info) {
        removeChildrenAndAdd(this.cm.display.cursorDiv, info.cursors);
        removeChildrenAndAdd(this.cm.display.selectionDiv, info.selection);
      };
      ContentEditableInput.prototype.rememberSelection = function() {
        var sel = this.getSelection();
        this.lastAnchorNode = sel.anchorNode;
        this.lastAnchorOffset = sel.anchorOffset;
        this.lastFocusNode = sel.focusNode;
        this.lastFocusOffset = sel.focusOffset;
      };
      ContentEditableInput.prototype.selectionInEditor = function() {
        var sel = this.getSelection();
        if (!sel.rangeCount) {
          return false;
        }
        var node = sel.getRangeAt(0).commonAncestorContainer;
        return contains(this.div, node);
      };
      ContentEditableInput.prototype.focus = function() {
        if (this.cm.options.readOnly != "nocursor") {
          if (!this.selectionInEditor() || activeElt(rootNode(this.div)) != this.div) {
            this.showSelection(this.prepareSelection(), true);
          }
          this.div.focus();
        }
      };
      ContentEditableInput.prototype.blur = function() {
        this.div.blur();
      };
      ContentEditableInput.prototype.getField = function() {
        return this.div;
      };
      ContentEditableInput.prototype.supportsTouch = function() {
        return true;
      };
      ContentEditableInput.prototype.receivedFocus = function() {
        var this$1$1 = this;
        var input = this;
        if (this.selectionInEditor()) {
          setTimeout(function() {
            return this$1$1.pollSelection();
          }, 20);
        } else {
          runInOp(this.cm, function() {
            return input.cm.curOp.selectionChanged = true;
          });
        }
        function poll() {
          if (input.cm.state.focused) {
            input.pollSelection();
            input.polling.set(input.cm.options.pollInterval, poll);
          }
        }
        this.polling.set(this.cm.options.pollInterval, poll);
      };
      ContentEditableInput.prototype.selectionChanged = function() {
        var sel = this.getSelection();
        return sel.anchorNode != this.lastAnchorNode || sel.anchorOffset != this.lastAnchorOffset || sel.focusNode != this.lastFocusNode || sel.focusOffset != this.lastFocusOffset;
      };
      ContentEditableInput.prototype.pollSelection = function() {
        if (this.readDOMTimeout != null || this.gracePeriod || !this.selectionChanged()) {
          return;
        }
        var sel = this.getSelection(), cm = this.cm;
        if (android && chrome && this.cm.display.gutterSpecs.length && isInGutter(sel.anchorNode)) {
          this.cm.triggerOnKeyDown({ type: "keydown", keyCode: 8, preventDefault: Math.abs });
          this.blur();
          this.focus();
          return;
        }
        if (this.composing) {
          return;
        }
        this.rememberSelection();
        var anchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
        var head = domToPos(cm, sel.focusNode, sel.focusOffset);
        if (anchor && head) {
          runInOp(cm, function() {
            setSelection(cm.doc, simpleSelection(anchor, head), sel_dontScroll);
            if (anchor.bad || head.bad) {
              cm.curOp.selectionChanged = true;
            }
          });
        }
      };
      ContentEditableInput.prototype.pollContent = function() {
        if (this.readDOMTimeout != null) {
          clearTimeout(this.readDOMTimeout);
          this.readDOMTimeout = null;
        }
        var cm = this.cm, display = cm.display, sel = cm.doc.sel.primary();
        var from = sel.from(), to = sel.to();
        if (from.ch == 0 && from.line > cm.firstLine()) {
          from = Pos(from.line - 1, getLine(cm.doc, from.line - 1).length);
        }
        if (to.ch == getLine(cm.doc, to.line).text.length && to.line < cm.lastLine()) {
          to = Pos(to.line + 1, 0);
        }
        if (from.line < display.viewFrom || to.line > display.viewTo - 1) {
          return false;
        }
        var fromIndex, fromLine, fromNode;
        if (from.line == display.viewFrom || (fromIndex = findViewIndex(cm, from.line)) == 0) {
          fromLine = lineNo(display.view[0].line);
          fromNode = display.view[0].node;
        } else {
          fromLine = lineNo(display.view[fromIndex].line);
          fromNode = display.view[fromIndex - 1].node.nextSibling;
        }
        var toIndex = findViewIndex(cm, to.line);
        var toLine, toNode;
        if (toIndex == display.view.length - 1) {
          toLine = display.viewTo - 1;
          toNode = display.lineDiv.lastChild;
        } else {
          toLine = lineNo(display.view[toIndex + 1].line) - 1;
          toNode = display.view[toIndex + 1].node.previousSibling;
        }
        if (!fromNode) {
          return false;
        }
        var newText = cm.doc.splitLines(domTextBetween(cm, fromNode, toNode, fromLine, toLine));
        var oldText = getBetween(cm.doc, Pos(fromLine, 0), Pos(toLine, getLine(cm.doc, toLine).text.length));
        while (newText.length > 1 && oldText.length > 1) {
          if (lst(newText) == lst(oldText)) {
            newText.pop();
            oldText.pop();
            toLine--;
          } else if (newText[0] == oldText[0]) {
            newText.shift();
            oldText.shift();
            fromLine++;
          } else {
            break;
          }
        }
        var cutFront = 0, cutEnd = 0;
        var newTop = newText[0], oldTop = oldText[0], maxCutFront = Math.min(newTop.length, oldTop.length);
        while (cutFront < maxCutFront && newTop.charCodeAt(cutFront) == oldTop.charCodeAt(cutFront)) {
          ++cutFront;
        }
        var newBot = lst(newText), oldBot = lst(oldText);
        var maxCutEnd = Math.min(
          newBot.length - (newText.length == 1 ? cutFront : 0),
          oldBot.length - (oldText.length == 1 ? cutFront : 0)
        );
        while (cutEnd < maxCutEnd && newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1)) {
          ++cutEnd;
        }
        if (newText.length == 1 && oldText.length == 1 && fromLine == from.line) {
          while (cutFront && cutFront > from.ch && newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1)) {
            cutFront--;
            cutEnd++;
          }
        }
        newText[newText.length - 1] = newBot.slice(0, newBot.length - cutEnd).replace(/^\u200b+/, "");
        newText[0] = newText[0].slice(cutFront).replace(/\u200b+$/, "");
        var chFrom = Pos(fromLine, cutFront);
        var chTo = Pos(toLine, oldText.length ? lst(oldText).length - cutEnd : 0);
        if (newText.length > 1 || newText[0] || cmp(chFrom, chTo)) {
          replaceRange(cm.doc, newText, chFrom, chTo, "+input");
          return true;
        }
      };
      ContentEditableInput.prototype.ensurePolled = function() {
        this.forceCompositionEnd();
      };
      ContentEditableInput.prototype.reset = function() {
        this.forceCompositionEnd();
      };
      ContentEditableInput.prototype.forceCompositionEnd = function() {
        if (!this.composing) {
          return;
        }
        clearTimeout(this.readDOMTimeout);
        this.composing = null;
        this.updateFromDOM();
        this.div.blur();
        this.div.focus();
      };
      ContentEditableInput.prototype.readFromDOMSoon = function() {
        var this$1$1 = this;
        if (this.readDOMTimeout != null) {
          return;
        }
        this.readDOMTimeout = setTimeout(function() {
          this$1$1.readDOMTimeout = null;
          if (this$1$1.composing) {
            if (this$1$1.composing.done) {
              this$1$1.composing = null;
            } else {
              return;
            }
          }
          this$1$1.updateFromDOM();
        }, 80);
      };
      ContentEditableInput.prototype.updateFromDOM = function() {
        var this$1$1 = this;
        if (this.cm.isReadOnly() || !this.pollContent()) {
          runInOp(this.cm, function() {
            return regChange(this$1$1.cm);
          });
        }
      };
      ContentEditableInput.prototype.setUneditable = function(node) {
        node.contentEditable = "false";
      };
      ContentEditableInput.prototype.onKeyPress = function(e) {
        if (e.charCode == 0 || this.composing) {
          return;
        }
        e.preventDefault();
        if (!this.cm.isReadOnly()) {
          operation(this.cm, applyTextInput)(this.cm, String.fromCharCode(e.charCode == null ? e.keyCode : e.charCode), 0);
        }
      };
      ContentEditableInput.prototype.readOnlyChanged = function(val) {
        this.div.contentEditable = String(val != "nocursor");
      };
      ContentEditableInput.prototype.onContextMenu = function() {
      };
      ContentEditableInput.prototype.resetPosition = function() {
      };
      ContentEditableInput.prototype.needsContentAttribute = true;
      function posToDOM(cm, pos) {
        var view = findViewForLine(cm, pos.line);
        if (!view || view.hidden) {
          return null;
        }
        var line = getLine(cm.doc, pos.line);
        var info = mapFromLineView(view, line, pos.line);
        var order = getOrder(line, cm.doc.direction), side = "left";
        if (order) {
          var partPos = getBidiPartAt(order, pos.ch);
          side = partPos % 2 ? "right" : "left";
        }
        var result = nodeAndOffsetInLineMap(info.map, pos.ch, side);
        result.offset = result.collapse == "right" ? result.end : result.start;
        return result;
      }
      function isInGutter(node) {
        for (var scan = node; scan; scan = scan.parentNode) {
          if (/CodeMirror-gutter-wrapper/.test(scan.className)) {
            return true;
          }
        }
        return false;
      }
      function badPos(pos, bad) {
        if (bad) {
          pos.bad = true;
        }
        return pos;
      }
      function domTextBetween(cm, from, to, fromLine, toLine) {
        var text = "", closing = false, lineSep = cm.doc.lineSeparator(), extraLinebreak = false;
        function recognizeMarker(id) {
          return function(marker) {
            return marker.id == id;
          };
        }
        function close() {
          if (closing) {
            text += lineSep;
            if (extraLinebreak) {
              text += lineSep;
            }
            closing = extraLinebreak = false;
          }
        }
        function addText(str) {
          if (str) {
            close();
            text += str;
          }
        }
        function walk(node) {
          if (node.nodeType == 1) {
            var cmText = node.getAttribute("cm-text");
            if (cmText) {
              addText(cmText);
              return;
            }
            var markerID = node.getAttribute("cm-marker"), range3;
            if (markerID) {
              var found = cm.findMarks(Pos(fromLine, 0), Pos(toLine + 1, 0), recognizeMarker(+markerID));
              if (found.length && (range3 = found[0].find(0))) {
                addText(getBetween(cm.doc, range3.from, range3.to).join(lineSep));
              }
              return;
            }
            if (node.getAttribute("contenteditable") == "false") {
              return;
            }
            var isBlock = /^(pre|div|p|li|table|br)$/i.test(node.nodeName);
            if (!/^br$/i.test(node.nodeName) && node.textContent.length == 0) {
              return;
            }
            if (isBlock) {
              close();
            }
            for (var i2 = 0; i2 < node.childNodes.length; i2++) {
              walk(node.childNodes[i2]);
            }
            if (/^(pre|p)$/i.test(node.nodeName)) {
              extraLinebreak = true;
            }
            if (isBlock) {
              closing = true;
            }
          } else if (node.nodeType == 3) {
            addText(node.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
          }
        }
        for (; ; ) {
          walk(from);
          if (from == to) {
            break;
          }
          from = from.nextSibling;
          extraLinebreak = false;
        }
        return text;
      }
      function domToPos(cm, node, offset) {
        var lineNode;
        if (node == cm.display.lineDiv) {
          lineNode = cm.display.lineDiv.childNodes[offset];
          if (!lineNode) {
            return badPos(cm.clipPos(Pos(cm.display.viewTo - 1)), true);
          }
          node = null;
          offset = 0;
        } else {
          for (lineNode = node; ; lineNode = lineNode.parentNode) {
            if (!lineNode || lineNode == cm.display.lineDiv) {
              return null;
            }
            if (lineNode.parentNode && lineNode.parentNode == cm.display.lineDiv) {
              break;
            }
          }
        }
        for (var i2 = 0; i2 < cm.display.view.length; i2++) {
          var lineView = cm.display.view[i2];
          if (lineView.node == lineNode) {
            return locateNodeInLineView(lineView, node, offset);
          }
        }
      }
      function locateNodeInLineView(lineView, node, offset) {
        var wrapper = lineView.text.firstChild, bad = false;
        if (!node || !contains(wrapper, node)) {
          return badPos(Pos(lineNo(lineView.line), 0), true);
        }
        if (node == wrapper) {
          bad = true;
          node = wrapper.childNodes[offset];
          offset = 0;
          if (!node) {
            var line = lineView.rest ? lst(lineView.rest) : lineView.line;
            return badPos(Pos(lineNo(line), line.text.length), bad);
          }
        }
        var textNode = node.nodeType == 3 ? node : null, topNode = node;
        if (!textNode && node.childNodes.length == 1 && node.firstChild.nodeType == 3) {
          textNode = node.firstChild;
          if (offset) {
            offset = textNode.nodeValue.length;
          }
        }
        while (topNode.parentNode != wrapper) {
          topNode = topNode.parentNode;
        }
        var measure = lineView.measure, maps = measure.maps;
        function find(textNode2, topNode2, offset2) {
          for (var i2 = -1; i2 < (maps ? maps.length : 0); i2++) {
            var map2 = i2 < 0 ? measure.map : maps[i2];
            for (var j = 0; j < map2.length; j += 3) {
              var curNode = map2[j + 2];
              if (curNode == textNode2 || curNode == topNode2) {
                var line2 = lineNo(i2 < 0 ? lineView.line : lineView.rest[i2]);
                var ch = map2[j] + offset2;
                if (offset2 < 0 || curNode != textNode2) {
                  ch = map2[j + (offset2 ? 1 : 0)];
                }
                return Pos(line2, ch);
              }
            }
          }
        }
        var found = find(textNode, topNode, offset);
        if (found) {
          return badPos(found, bad);
        }
        for (var after = topNode.nextSibling, dist = textNode ? textNode.nodeValue.length - offset : 0; after; after = after.nextSibling) {
          found = find(after, after.firstChild, 0);
          if (found) {
            return badPos(Pos(found.line, found.ch - dist), bad);
          } else {
            dist += after.textContent.length;
          }
        }
        for (var before = topNode.previousSibling, dist$1 = offset; before; before = before.previousSibling) {
          found = find(before, before.firstChild, -1);
          if (found) {
            return badPos(Pos(found.line, found.ch + dist$1), bad);
          } else {
            dist$1 += before.textContent.length;
          }
        }
      }
      var TextareaInput = function(cm) {
        this.cm = cm;
        this.prevInput = "";
        this.pollingFast = false;
        this.polling = new Delayed();
        this.hasSelection = false;
        this.composing = null;
        this.resetting = false;
      };
      TextareaInput.prototype.init = function(display) {
        var this$1$1 = this;
        var input = this, cm = this.cm;
        this.createField(display);
        var te = this.textarea;
        display.wrapper.insertBefore(this.wrapper, display.wrapper.firstChild);
        if (ios) {
          te.style.width = "0px";
        }
        on(te, "input", function() {
          if (ie && ie_version >= 9 && this$1$1.hasSelection) {
            this$1$1.hasSelection = null;
          }
          input.poll();
        });
        on(te, "paste", function(e) {
          if (signalDOMEvent(cm, e) || handlePaste(e, cm)) {
            return;
          }
          cm.state.pasteIncoming = +/* @__PURE__ */ new Date();
          input.fastPoll();
        });
        function prepareCopyCut(e) {
          if (signalDOMEvent(cm, e)) {
            return;
          }
          if (cm.somethingSelected()) {
            setLastCopied({ lineWise: false, text: cm.getSelections() });
          } else if (!cm.options.lineWiseCopyCut) {
            return;
          } else {
            var ranges = copyableRanges(cm);
            setLastCopied({ lineWise: true, text: ranges.text });
            if (e.type == "cut") {
              cm.setSelections(ranges.ranges, null, sel_dontScroll);
            } else {
              input.prevInput = "";
              te.value = ranges.text.join("\n");
              selectInput(te);
            }
          }
          if (e.type == "cut") {
            cm.state.cutIncoming = +/* @__PURE__ */ new Date();
          }
        }
        on(te, "cut", prepareCopyCut);
        on(te, "copy", prepareCopyCut);
        on(display.scroller, "paste", function(e) {
          if (eventInWidget(display, e) || signalDOMEvent(cm, e)) {
            return;
          }
          if (!te.dispatchEvent) {
            cm.state.pasteIncoming = +/* @__PURE__ */ new Date();
            input.focus();
            return;
          }
          var event = new Event("paste");
          event.clipboardData = e.clipboardData;
          te.dispatchEvent(event);
        });
        on(display.lineSpace, "selectstart", function(e) {
          if (!eventInWidget(display, e)) {
            e_preventDefault(e);
          }
        });
        on(te, "compositionstart", function() {
          var start = cm.getCursor("from");
          if (input.composing) {
            input.composing.range.clear();
          }
          input.composing = {
            start,
            range: cm.markText(start, cm.getCursor("to"), { className: "CodeMirror-composing" })
          };
        });
        on(te, "compositionend", function() {
          if (input.composing) {
            input.poll();
            input.composing.range.clear();
            input.composing = null;
          }
        });
      };
      TextareaInput.prototype.createField = function(_display) {
        this.wrapper = hiddenTextarea();
        this.textarea = this.wrapper.firstChild;
        var opts = this.cm.options;
        disableBrowserMagic(this.textarea, opts.spellcheck, opts.autocorrect, opts.autocapitalize);
      };
      TextareaInput.prototype.screenReaderLabelChanged = function(label) {
        if (label) {
          this.textarea.setAttribute("aria-label", label);
        } else {
          this.textarea.removeAttribute("aria-label");
        }
      };
      TextareaInput.prototype.prepareSelection = function() {
        var cm = this.cm, display = cm.display, doc2 = cm.doc;
        var result = prepareSelection(cm);
        if (cm.options.moveInputWithCursor) {
          var headPos = cursorCoords(cm, doc2.sel.primary().head, "div");
          var wrapOff = display.wrapper.getBoundingClientRect(), lineOff = display.lineDiv.getBoundingClientRect();
          result.teTop = Math.max(0, Math.min(
            display.wrapper.clientHeight - 10,
            headPos.top + lineOff.top - wrapOff.top
          ));
          result.teLeft = Math.max(0, Math.min(
            display.wrapper.clientWidth - 10,
            headPos.left + lineOff.left - wrapOff.left
          ));
        }
        return result;
      };
      TextareaInput.prototype.showSelection = function(drawn) {
        var cm = this.cm, display = cm.display;
        removeChildrenAndAdd(display.cursorDiv, drawn.cursors);
        removeChildrenAndAdd(display.selectionDiv, drawn.selection);
        if (drawn.teTop != null) {
          this.wrapper.style.top = drawn.teTop + "px";
          this.wrapper.style.left = drawn.teLeft + "px";
        }
      };
      TextareaInput.prototype.reset = function(typing) {
        if (this.contextMenuPending || this.composing && typing) {
          return;
        }
        var cm = this.cm;
        this.resetting = true;
        if (cm.somethingSelected()) {
          this.prevInput = "";
          var content = cm.getSelection();
          this.textarea.value = content;
          if (cm.state.focused) {
            selectInput(this.textarea);
          }
          if (ie && ie_version >= 9) {
            this.hasSelection = content;
          }
        } else if (!typing) {
          this.prevInput = this.textarea.value = "";
          if (ie && ie_version >= 9) {
            this.hasSelection = null;
          }
        }
        this.resetting = false;
      };
      TextareaInput.prototype.getField = function() {
        return this.textarea;
      };
      TextareaInput.prototype.supportsTouch = function() {
        return false;
      };
      TextareaInput.prototype.focus = function() {
        if (this.cm.options.readOnly != "nocursor" && (!mobile || activeElt(rootNode(this.textarea)) != this.textarea)) {
          try {
            this.textarea.focus();
          } catch (e) {
          }
        }
      };
      TextareaInput.prototype.blur = function() {
        this.textarea.blur();
      };
      TextareaInput.prototype.resetPosition = function() {
        this.wrapper.style.top = this.wrapper.style.left = 0;
      };
      TextareaInput.prototype.receivedFocus = function() {
        this.slowPoll();
      };
      TextareaInput.prototype.slowPoll = function() {
        var this$1$1 = this;
        if (this.pollingFast) {
          return;
        }
        this.polling.set(this.cm.options.pollInterval, function() {
          this$1$1.poll();
          if (this$1$1.cm.state.focused) {
            this$1$1.slowPoll();
          }
        });
      };
      TextareaInput.prototype.fastPoll = function() {
        var missed = false, input = this;
        input.pollingFast = true;
        function p() {
          var changed = input.poll();
          if (!changed && !missed) {
            missed = true;
            input.polling.set(60, p);
          } else {
            input.pollingFast = false;
            input.slowPoll();
          }
        }
        input.polling.set(20, p);
      };
      TextareaInput.prototype.poll = function() {
        var this$1$1 = this;
        var cm = this.cm, input = this.textarea, prevInput = this.prevInput;
        if (this.contextMenuPending || this.resetting || !cm.state.focused || hasSelection(input) && !prevInput && !this.composing || cm.isReadOnly() || cm.options.disableInput || cm.state.keySeq) {
          return false;
        }
        var text = input.value;
        if (text == prevInput && !cm.somethingSelected()) {
          return false;
        }
        if (ie && ie_version >= 9 && this.hasSelection === text || mac && /[\uf700-\uf7ff]/.test(text)) {
          cm.display.input.reset();
          return false;
        }
        if (cm.doc.sel == cm.display.selForContextMenu) {
          var first = text.charCodeAt(0);
          if (first == 8203 && !prevInput) {
            prevInput = "​";
          }
          if (first == 8666) {
            this.reset();
            return this.cm.execCommand("undo");
          }
        }
        var same = 0, l = Math.min(prevInput.length, text.length);
        while (same < l && prevInput.charCodeAt(same) == text.charCodeAt(same)) {
          ++same;
        }
        runInOp(cm, function() {
          applyTextInput(
            cm,
            text.slice(same),
            prevInput.length - same,
            null,
            this$1$1.composing ? "*compose" : null
          );
          if (text.length > 1e3 || text.indexOf("\n") > -1) {
            input.value = this$1$1.prevInput = "";
          } else {
            this$1$1.prevInput = text;
          }
          if (this$1$1.composing) {
            this$1$1.composing.range.clear();
            this$1$1.composing.range = cm.markText(
              this$1$1.composing.start,
              cm.getCursor("to"),
              { className: "CodeMirror-composing" }
            );
          }
        });
        return true;
      };
      TextareaInput.prototype.ensurePolled = function() {
        if (this.pollingFast && this.poll()) {
          this.pollingFast = false;
        }
      };
      TextareaInput.prototype.onKeyPress = function() {
        if (ie && ie_version >= 9) {
          this.hasSelection = null;
        }
        this.fastPoll();
      };
      TextareaInput.prototype.onContextMenu = function(e) {
        var input = this, cm = input.cm, display = cm.display, te = input.textarea;
        if (input.contextMenuPending) {
          input.contextMenuPending();
        }
        var pos = posFromMouse(cm, e), scrollPos = display.scroller.scrollTop;
        if (!pos || presto) {
          return;
        }
        var reset = cm.options.resetSelectionOnContextMenu;
        if (reset && cm.doc.sel.contains(pos) == -1) {
          operation(cm, setSelection)(cm.doc, simpleSelection(pos), sel_dontScroll);
        }
        var oldCSS = te.style.cssText, oldWrapperCSS = input.wrapper.style.cssText;
        var wrapperBox = input.wrapper.offsetParent.getBoundingClientRect();
        input.wrapper.style.cssText = "position: static";
        te.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - wrapperBox.top - 5) + "px; left: " + (e.clientX - wrapperBox.left - 5) + "px;\n      z-index: 1000; background: " + (ie ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
        var oldScrollY;
        if (webkit) {
          oldScrollY = te.ownerDocument.defaultView.scrollY;
        }
        display.input.focus();
        if (webkit) {
          te.ownerDocument.defaultView.scrollTo(null, oldScrollY);
        }
        display.input.reset();
        if (!cm.somethingSelected()) {
          te.value = input.prevInput = " ";
        }
        input.contextMenuPending = rehide;
        display.selForContextMenu = cm.doc.sel;
        clearTimeout(display.detectingSelectAll);
        function prepareSelectAllHack() {
          if (te.selectionStart != null) {
            var selected = cm.somethingSelected();
            var extval = "​" + (selected ? te.value : "");
            te.value = "⇚";
            te.value = extval;
            input.prevInput = selected ? "" : "​";
            te.selectionStart = 1;
            te.selectionEnd = extval.length;
            display.selForContextMenu = cm.doc.sel;
          }
        }
        function rehide() {
          if (input.contextMenuPending != rehide) {
            return;
          }
          input.contextMenuPending = false;
          input.wrapper.style.cssText = oldWrapperCSS;
          te.style.cssText = oldCSS;
          if (ie && ie_version < 9) {
            display.scrollbars.setScrollTop(display.scroller.scrollTop = scrollPos);
          }
          if (te.selectionStart != null) {
            if (!ie || ie && ie_version < 9) {
              prepareSelectAllHack();
            }
            var i2 = 0, poll = function() {
              if (display.selForContextMenu == cm.doc.sel && te.selectionStart == 0 && te.selectionEnd > 0 && input.prevInput == "​") {
                operation(cm, selectAll2)(cm);
              } else if (i2++ < 10) {
                display.detectingSelectAll = setTimeout(poll, 500);
              } else {
                display.selForContextMenu = null;
                display.input.reset();
              }
            };
            display.detectingSelectAll = setTimeout(poll, 200);
          }
        }
        if (ie && ie_version >= 9) {
          prepareSelectAllHack();
        }
        if (captureRightClick) {
          e_stop(e);
          var mouseup = function() {
            off(window, "mouseup", mouseup);
            setTimeout(rehide, 20);
          };
          on(window, "mouseup", mouseup);
        } else {
          setTimeout(rehide, 50);
        }
      };
      TextareaInput.prototype.readOnlyChanged = function(val) {
        if (!val) {
          this.reset();
        }
        this.textarea.disabled = val == "nocursor";
        this.textarea.readOnly = !!val;
      };
      TextareaInput.prototype.setUneditable = function() {
      };
      TextareaInput.prototype.needsContentAttribute = false;
      function fromTextArea(textarea, options) {
        options = options ? copyObj(options) : {};
        options.value = textarea.value;
        if (!options.tabindex && textarea.tabIndex) {
          options.tabindex = textarea.tabIndex;
        }
        if (!options.placeholder && textarea.placeholder) {
          options.placeholder = textarea.placeholder;
        }
        if (options.autofocus == null) {
          var hasFocus = activeElt(rootNode(textarea));
          options.autofocus = hasFocus == textarea || textarea.getAttribute("autofocus") != null && hasFocus == document.body;
        }
        function save() {
          textarea.value = cm.getValue();
        }
        var realSubmit;
        if (textarea.form) {
          on(textarea.form, "submit", save);
          if (!options.leaveSubmitMethodAlone) {
            var form = textarea.form;
            realSubmit = form.submit;
            try {
              var wrappedSubmit = form.submit = function() {
                save();
                form.submit = realSubmit;
                form.submit();
                form.submit = wrappedSubmit;
              };
            } catch (e) {
            }
          }
        }
        options.finishInit = function(cm2) {
          cm2.save = save;
          cm2.getTextArea = function() {
            return textarea;
          };
          cm2.toTextArea = function() {
            cm2.toTextArea = isNaN;
            save();
            textarea.parentNode.removeChild(cm2.getWrapperElement());
            textarea.style.display = "";
            if (textarea.form) {
              off(textarea.form, "submit", save);
              if (!options.leaveSubmitMethodAlone && typeof textarea.form.submit == "function") {
                textarea.form.submit = realSubmit;
              }
            }
          };
        };
        textarea.style.display = "none";
        var cm = CodeMirror2(
          function(node) {
            return textarea.parentNode.insertBefore(node, textarea.nextSibling);
          },
          options
        );
        return cm;
      }
      function addLegacyProps(CodeMirror3) {
        CodeMirror3.off = off;
        CodeMirror3.on = on;
        CodeMirror3.wheelEventPixels = wheelEventPixels;
        CodeMirror3.Doc = Doc;
        CodeMirror3.splitLines = splitLinesAuto;
        CodeMirror3.countColumn = countColumn;
        CodeMirror3.findColumn = findColumn;
        CodeMirror3.isWordChar = isWordCharBasic;
        CodeMirror3.Pass = Pass;
        CodeMirror3.signal = signal;
        CodeMirror3.Line = Line;
        CodeMirror3.changeEnd = changeEnd;
        CodeMirror3.scrollbarModel = scrollbarModel;
        CodeMirror3.Pos = Pos;
        CodeMirror3.cmpPos = cmp;
        CodeMirror3.modes = modes;
        CodeMirror3.mimeModes = mimeModes;
        CodeMirror3.resolveMode = resolveMode;
        CodeMirror3.getMode = getMode;
        CodeMirror3.modeExtensions = modeExtensions;
        CodeMirror3.extendMode = extendMode;
        CodeMirror3.copyState = copyState;
        CodeMirror3.startState = startState;
        CodeMirror3.innerMode = innerMode;
        CodeMirror3.commands = commands;
        CodeMirror3.keyMap = keyMap;
        CodeMirror3.keyName = keyName;
        CodeMirror3.isModifierKey = isModifierKey;
        CodeMirror3.lookupKey = lookupKey;
        CodeMirror3.normalizeKeyMap = normalizeKeyMap;
        CodeMirror3.StringStream = StringStream;
        CodeMirror3.SharedTextMarker = SharedTextMarker;
        CodeMirror3.TextMarker = TextMarker;
        CodeMirror3.LineWidget = LineWidget;
        CodeMirror3.e_preventDefault = e_preventDefault;
        CodeMirror3.e_stopPropagation = e_stopPropagation;
        CodeMirror3.e_stop = e_stop;
        CodeMirror3.addClass = addClass2;
        CodeMirror3.contains = contains;
        CodeMirror3.rmClass = rmClass;
        CodeMirror3.keyNames = keyNames;
      }
      defineOptions(CodeMirror2);
      addEditorMethods(CodeMirror2);
      var dontDelegate = "iter insert remove copy getEditor constructor".split(" ");
      for (var prop in Doc.prototype) {
        if (Doc.prototype.hasOwnProperty(prop) && indexOf(dontDelegate, prop) < 0) {
          CodeMirror2.prototype[prop] = /* @__PURE__ */ (function(method) {
            return function() {
              return method.apply(this.doc, arguments);
            };
          })(Doc.prototype[prop]);
        }
      }
      eventMixin(Doc);
      CodeMirror2.inputStyles = { "textarea": TextareaInput, "contenteditable": ContentEditableInput };
      CodeMirror2.defineMode = function(name) {
        if (!CodeMirror2.defaults.mode && name != "null") {
          CodeMirror2.defaults.mode = name;
        }
        defineMode.apply(this, arguments);
      };
      CodeMirror2.defineMIME = defineMIME;
      CodeMirror2.defineMode("null", function() {
        return { token: function(stream) {
          return stream.skipToEnd();
        } };
      });
      CodeMirror2.defineMIME("text/plain", "null");
      CodeMirror2.defineExtension = function(name, func) {
        CodeMirror2.prototype[name] = func;
      };
      CodeMirror2.defineDocExtension = function(name, func) {
        Doc.prototype[name] = func;
      };
      CodeMirror2.fromTextArea = fromTextArea;
      addLegacyProps(CodeMirror2);
      CodeMirror2.version = "5.65.20";
      return CodeMirror2;
    }));
  })(codemirror$1);
  return codemirror$1.exports;
}
var codemirrorExports = requireCodemirror();
const CodeMirror = /* @__PURE__ */ getDefaultExportFromCjs(codemirrorExports);
var css$2 = { exports: {} };
var hasRequiredCss;
function requireCss() {
  if (hasRequiredCss) return css$2.exports;
  hasRequiredCss = 1;
  (function(module2, exports2) {
    (function(mod) {
      mod(requireCodemirror());
    })(function(CodeMirror2) {
      CodeMirror2.defineMode("css", function(config, parserConfig) {
        var inline = parserConfig.inline;
        if (!parserConfig.propertyKeywords) parserConfig = CodeMirror2.resolveMode("text/css");
        var indentUnit = config.indentUnit, tokenHooks = parserConfig.tokenHooks, documentTypes2 = parserConfig.documentTypes || {}, mediaTypes2 = parserConfig.mediaTypes || {}, mediaFeatures2 = parserConfig.mediaFeatures || {}, mediaValueKeywords2 = parserConfig.mediaValueKeywords || {}, propertyKeywords2 = parserConfig.propertyKeywords || {}, nonStandardPropertyKeywords2 = parserConfig.nonStandardPropertyKeywords || {}, fontProperties2 = parserConfig.fontProperties || {}, counterDescriptors2 = parserConfig.counterDescriptors || {}, colorKeywords2 = parserConfig.colorKeywords || {}, valueKeywords2 = parserConfig.valueKeywords || {}, allowNested = parserConfig.allowNested, lineComment = parserConfig.lineComment, supportsAtComponent = parserConfig.supportsAtComponent === true, highlightNonStandardPropertyKeywords = config.highlightNonStandardPropertyKeywords !== false;
        var type, override;
        function ret(style, tp) {
          type = tp;
          return style;
        }
        function tokenBase(stream, state) {
          var ch = stream.next();
          if (tokenHooks[ch]) {
            var result = tokenHooks[ch](stream, state);
            if (result !== false) return result;
          }
          if (ch == "@") {
            stream.eatWhile(/[\w\\\-]/);
            return ret("def", stream.current());
          } else if (ch == "=" || (ch == "~" || ch == "|") && stream.eat("=")) {
            return ret(null, "compare");
          } else if (ch == '"' || ch == "'") {
            state.tokenize = tokenString(ch);
            return state.tokenize(stream, state);
          } else if (ch == "#") {
            stream.eatWhile(/[\w\\\-]/);
            return ret("atom", "hash");
          } else if (ch == "!") {
            stream.match(/^\s*\w*/);
            return ret("keyword", "important");
          } else if (/\d/.test(ch) || ch == "." && stream.eat(/\d/)) {
            stream.eatWhile(/[\w.%]/);
            return ret("number", "unit");
          } else if (ch === "-") {
            if (/[\d.]/.test(stream.peek())) {
              stream.eatWhile(/[\w.%]/);
              return ret("number", "unit");
            } else if (stream.match(/^-[\w\\\-]*/)) {
              stream.eatWhile(/[\w\\\-]/);
              if (stream.match(/^\s*:/, false))
                return ret("variable-2", "variable-definition");
              return ret("variable-2", "variable");
            } else if (stream.match(/^\w+-/)) {
              return ret("meta", "meta");
            }
          } else if (/[,+>*\/]/.test(ch)) {
            return ret(null, "select-op");
          } else if (ch == "." && stream.match(/^-?[_a-z][_a-z0-9-]*/i)) {
            return ret("qualifier", "qualifier");
          } else if (/[:;{}\[\]\(\)]/.test(ch)) {
            return ret(null, ch);
          } else if (stream.match(/^[\w-.]+(?=\()/)) {
            if (/^(url(-prefix)?|domain|regexp)$/i.test(stream.current())) {
              state.tokenize = tokenParenthesized;
            }
            return ret("variable callee", "variable");
          } else if (/[\w\\\-]/.test(ch)) {
            stream.eatWhile(/[\w\\\-]/);
            return ret("property", "word");
          } else {
            return ret(null, null);
          }
        }
        function tokenString(quote) {
          return function(stream, state) {
            var escaped = false, ch;
            while ((ch = stream.next()) != null) {
              if (ch == quote && !escaped) {
                if (quote == ")") stream.backUp(1);
                break;
              }
              escaped = !escaped && ch == "\\";
            }
            if (ch == quote || !escaped && quote != ")") state.tokenize = null;
            return ret("string", "string");
          };
        }
        function tokenParenthesized(stream, state) {
          stream.next();
          if (!stream.match(/^\s*[\"\')]/, false))
            state.tokenize = tokenString(")");
          else
            state.tokenize = null;
          return ret(null, "(");
        }
        function Context(type2, indent, prev) {
          this.type = type2;
          this.indent = indent;
          this.prev = prev;
        }
        function pushContext(state, stream, type2, indent) {
          state.context = new Context(type2, stream.indentation() + (indent === false ? 0 : indentUnit), state.context);
          return type2;
        }
        function popContext(state) {
          if (state.context.prev)
            state.context = state.context.prev;
          return state.context.type;
        }
        function pass(type2, stream, state) {
          return states[state.context.type](type2, stream, state);
        }
        function popAndPass(type2, stream, state, n) {
          for (var i = n || 1; i > 0; i--)
            state.context = state.context.prev;
          return pass(type2, stream, state);
        }
        function wordAsValue(stream) {
          var word = stream.current().toLowerCase();
          if (valueKeywords2.hasOwnProperty(word))
            override = "atom";
          else if (colorKeywords2.hasOwnProperty(word))
            override = "keyword";
          else
            override = "variable";
        }
        var states = {};
        states.top = function(type2, stream, state) {
          if (type2 == "{") {
            return pushContext(state, stream, "block");
          } else if (type2 == "}" && state.context.prev) {
            return popContext(state);
          } else if (supportsAtComponent && /@component/i.test(type2)) {
            return pushContext(state, stream, "atComponentBlock");
          } else if (/^@(-moz-)?document$/i.test(type2)) {
            return pushContext(state, stream, "documentTypes");
          } else if (/^@(media|supports|(-moz-)?document|import)$/i.test(type2)) {
            return pushContext(state, stream, "atBlock");
          } else if (/^@(font-face|counter-style)/i.test(type2)) {
            state.stateArg = type2;
            return "restricted_atBlock_before";
          } else if (/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(type2)) {
            return "keyframes";
          } else if (type2 && type2.charAt(0) == "@") {
            return pushContext(state, stream, "at");
          } else if (type2 == "hash") {
            override = "builtin";
          } else if (type2 == "word") {
            override = "tag";
          } else if (type2 == "variable-definition") {
            return "maybeprop";
          } else if (type2 == "interpolation") {
            return pushContext(state, stream, "interpolation");
          } else if (type2 == ":") {
            return "pseudo";
          } else if (allowNested && type2 == "(") {
            return pushContext(state, stream, "parens");
          }
          return state.context.type;
        };
        states.block = function(type2, stream, state) {
          if (type2 == "word") {
            var word = stream.current().toLowerCase();
            if (propertyKeywords2.hasOwnProperty(word)) {
              override = "property";
              return "maybeprop";
            } else if (nonStandardPropertyKeywords2.hasOwnProperty(word)) {
              override = highlightNonStandardPropertyKeywords ? "string-2" : "property";
              return "maybeprop";
            } else if (allowNested) {
              override = stream.match(/^\s*:(?:\s|$)/, false) ? "property" : "tag";
              return "block";
            } else {
              override += " error";
              return "maybeprop";
            }
          } else if (type2 == "meta") {
            return "block";
          } else if (!allowNested && (type2 == "hash" || type2 == "qualifier")) {
            override = "error";
            return "block";
          } else {
            return states.top(type2, stream, state);
          }
        };
        states.maybeprop = function(type2, stream, state) {
          if (type2 == ":") return pushContext(state, stream, "prop");
          return pass(type2, stream, state);
        };
        states.prop = function(type2, stream, state) {
          if (type2 == ";") return popContext(state);
          if (type2 == "{" && allowNested) return pushContext(state, stream, "propBlock");
          if (type2 == "}" || type2 == "{") return popAndPass(type2, stream, state);
          if (type2 == "(") return pushContext(state, stream, "parens");
          if (type2 == "hash" && !/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(stream.current())) {
            override += " error";
          } else if (type2 == "word") {
            wordAsValue(stream);
          } else if (type2 == "interpolation") {
            return pushContext(state, stream, "interpolation");
          }
          return "prop";
        };
        states.propBlock = function(type2, _stream, state) {
          if (type2 == "}") return popContext(state);
          if (type2 == "word") {
            override = "property";
            return "maybeprop";
          }
          return state.context.type;
        };
        states.parens = function(type2, stream, state) {
          if (type2 == "{" || type2 == "}") return popAndPass(type2, stream, state);
          if (type2 == ")") return popContext(state);
          if (type2 == "(") return pushContext(state, stream, "parens");
          if (type2 == "interpolation") return pushContext(state, stream, "interpolation");
          if (type2 == "word") wordAsValue(stream);
          return "parens";
        };
        states.pseudo = function(type2, stream, state) {
          if (type2 == "meta") return "pseudo";
          if (type2 == "word") {
            override = "variable-3";
            return state.context.type;
          }
          return pass(type2, stream, state);
        };
        states.documentTypes = function(type2, stream, state) {
          if (type2 == "word" && documentTypes2.hasOwnProperty(stream.current())) {
            override = "tag";
            return state.context.type;
          } else {
            return states.atBlock(type2, stream, state);
          }
        };
        states.atBlock = function(type2, stream, state) {
          if (type2 == "(") return pushContext(state, stream, "atBlock_parens");
          if (type2 == "}" || type2 == ";") return popAndPass(type2, stream, state);
          if (type2 == "{") return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top");
          if (type2 == "interpolation") return pushContext(state, stream, "interpolation");
          if (type2 == "word") {
            var word = stream.current().toLowerCase();
            if (word == "only" || word == "not" || word == "and" || word == "or")
              override = "keyword";
            else if (mediaTypes2.hasOwnProperty(word))
              override = "attribute";
            else if (mediaFeatures2.hasOwnProperty(word))
              override = "property";
            else if (mediaValueKeywords2.hasOwnProperty(word))
              override = "keyword";
            else if (propertyKeywords2.hasOwnProperty(word))
              override = "property";
            else if (nonStandardPropertyKeywords2.hasOwnProperty(word))
              override = highlightNonStandardPropertyKeywords ? "string-2" : "property";
            else if (valueKeywords2.hasOwnProperty(word))
              override = "atom";
            else if (colorKeywords2.hasOwnProperty(word))
              override = "keyword";
            else
              override = "error";
          }
          return state.context.type;
        };
        states.atComponentBlock = function(type2, stream, state) {
          if (type2 == "}")
            return popAndPass(type2, stream, state);
          if (type2 == "{")
            return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top", false);
          if (type2 == "word")
            override = "error";
          return state.context.type;
        };
        states.atBlock_parens = function(type2, stream, state) {
          if (type2 == ")") return popContext(state);
          if (type2 == "{" || type2 == "}") return popAndPass(type2, stream, state, 2);
          return states.atBlock(type2, stream, state);
        };
        states.restricted_atBlock_before = function(type2, stream, state) {
          if (type2 == "{")
            return pushContext(state, stream, "restricted_atBlock");
          if (type2 == "word" && state.stateArg == "@counter-style") {
            override = "variable";
            return "restricted_atBlock_before";
          }
          return pass(type2, stream, state);
        };
        states.restricted_atBlock = function(type2, stream, state) {
          if (type2 == "}") {
            state.stateArg = null;
            return popContext(state);
          }
          if (type2 == "word") {
            if (state.stateArg == "@font-face" && !fontProperties2.hasOwnProperty(stream.current().toLowerCase()) || state.stateArg == "@counter-style" && !counterDescriptors2.hasOwnProperty(stream.current().toLowerCase()))
              override = "error";
            else
              override = "property";
            return "maybeprop";
          }
          return "restricted_atBlock";
        };
        states.keyframes = function(type2, stream, state) {
          if (type2 == "word") {
            override = "variable";
            return "keyframes";
          }
          if (type2 == "{") return pushContext(state, stream, "top");
          return pass(type2, stream, state);
        };
        states.at = function(type2, stream, state) {
          if (type2 == ";") return popContext(state);
          if (type2 == "{" || type2 == "}") return popAndPass(type2, stream, state);
          if (type2 == "word") override = "tag";
          else if (type2 == "hash") override = "builtin";
          return "at";
        };
        states.interpolation = function(type2, stream, state) {
          if (type2 == "}") return popContext(state);
          if (type2 == "{" || type2 == ";") return popAndPass(type2, stream, state);
          if (type2 == "word") override = "variable";
          else if (type2 != "variable" && type2 != "(" && type2 != ")") override = "error";
          return "interpolation";
        };
        return {
          startState: function(base) {
            return {
              tokenize: null,
              state: inline ? "block" : "top",
              stateArg: null,
              context: new Context(inline ? "block" : "top", base || 0, null)
            };
          },
          token: function(stream, state) {
            if (!state.tokenize && stream.eatSpace()) return null;
            var style = (state.tokenize || tokenBase)(stream, state);
            if (style && typeof style == "object") {
              type = style[1];
              style = style[0];
            }
            override = style;
            if (type != "comment")
              state.state = states[state.state](type, stream, state);
            return override;
          },
          indent: function(state, textAfter) {
            var cx = state.context, ch = textAfter && textAfter.charAt(0);
            var indent = cx.indent;
            if (cx.type == "prop" && (ch == "}" || ch == ")")) cx = cx.prev;
            if (cx.prev) {
              if (ch == "}" && (cx.type == "block" || cx.type == "top" || cx.type == "interpolation" || cx.type == "restricted_atBlock")) {
                cx = cx.prev;
                indent = cx.indent;
              } else if (ch == ")" && (cx.type == "parens" || cx.type == "atBlock_parens") || ch == "{" && (cx.type == "at" || cx.type == "atBlock")) {
                indent = Math.max(0, cx.indent - indentUnit);
              }
            }
            return indent;
          },
          electricChars: "}",
          blockCommentStart: "/*",
          blockCommentEnd: "*/",
          blockCommentContinue: " * ",
          lineComment,
          fold: "brace"
        };
      });
      function keySet(array) {
        var keys2 = {};
        for (var i = 0; i < array.length; ++i) {
          keys2[array[i].toLowerCase()] = true;
        }
        return keys2;
      }
      var documentTypes_ = [
        "domain",
        "regexp",
        "url",
        "url-prefix"
      ], documentTypes = keySet(documentTypes_);
      var mediaTypes_ = [
        "all",
        "aural",
        "braille",
        "handheld",
        "print",
        "projection",
        "screen",
        "tty",
        "tv",
        "embossed"
      ], mediaTypes = keySet(mediaTypes_);
      var mediaFeatures_ = [
        "width",
        "min-width",
        "max-width",
        "height",
        "min-height",
        "max-height",
        "device-width",
        "min-device-width",
        "max-device-width",
        "device-height",
        "min-device-height",
        "max-device-height",
        "aspect-ratio",
        "min-aspect-ratio",
        "max-aspect-ratio",
        "device-aspect-ratio",
        "min-device-aspect-ratio",
        "max-device-aspect-ratio",
        "color",
        "min-color",
        "max-color",
        "color-index",
        "min-color-index",
        "max-color-index",
        "monochrome",
        "min-monochrome",
        "max-monochrome",
        "resolution",
        "min-resolution",
        "max-resolution",
        "scan",
        "grid",
        "orientation",
        "device-pixel-ratio",
        "min-device-pixel-ratio",
        "max-device-pixel-ratio",
        "pointer",
        "any-pointer",
        "hover",
        "any-hover",
        "prefers-color-scheme",
        "dynamic-range",
        "video-dynamic-range"
      ], mediaFeatures = keySet(mediaFeatures_);
      var mediaValueKeywords_ = [
        "landscape",
        "portrait",
        "none",
        "coarse",
        "fine",
        "on-demand",
        "hover",
        "interlace",
        "progressive",
        "dark",
        "light",
        "standard",
        "high"
      ], mediaValueKeywords = keySet(mediaValueKeywords_);
      var propertyKeywords_ = [
        "align-content",
        "align-items",
        "align-self",
        "alignment-adjust",
        "alignment-baseline",
        "all",
        "anchor-point",
        "animation",
        "animation-delay",
        "animation-direction",
        "animation-duration",
        "animation-fill-mode",
        "animation-iteration-count",
        "animation-name",
        "animation-play-state",
        "animation-timing-function",
        "appearance",
        "azimuth",
        "backdrop-filter",
        "backface-visibility",
        "background",
        "background-attachment",
        "background-blend-mode",
        "background-clip",
        "background-color",
        "background-image",
        "background-origin",
        "background-position",
        "background-position-x",
        "background-position-y",
        "background-repeat",
        "background-size",
        "baseline-shift",
        "binding",
        "bleed",
        "block-size",
        "bookmark-label",
        "bookmark-level",
        "bookmark-state",
        "bookmark-target",
        "border",
        "border-bottom",
        "border-bottom-color",
        "border-bottom-left-radius",
        "border-bottom-right-radius",
        "border-bottom-style",
        "border-bottom-width",
        "border-collapse",
        "border-color",
        "border-image",
        "border-image-outset",
        "border-image-repeat",
        "border-image-slice",
        "border-image-source",
        "border-image-width",
        "border-left",
        "border-left-color",
        "border-left-style",
        "border-left-width",
        "border-radius",
        "border-right",
        "border-right-color",
        "border-right-style",
        "border-right-width",
        "border-spacing",
        "border-style",
        "border-top",
        "border-top-color",
        "border-top-left-radius",
        "border-top-right-radius",
        "border-top-style",
        "border-top-width",
        "border-width",
        "bottom",
        "box-decoration-break",
        "box-shadow",
        "box-sizing",
        "break-after",
        "break-before",
        "break-inside",
        "caption-side",
        "caret-color",
        "clear",
        "clip",
        "color",
        "color-profile",
        "column-count",
        "column-fill",
        "column-gap",
        "column-rule",
        "column-rule-color",
        "column-rule-style",
        "column-rule-width",
        "column-span",
        "column-width",
        "columns",
        "contain",
        "content",
        "counter-increment",
        "counter-reset",
        "crop",
        "cue",
        "cue-after",
        "cue-before",
        "cursor",
        "direction",
        "display",
        "dominant-baseline",
        "drop-initial-after-adjust",
        "drop-initial-after-align",
        "drop-initial-before-adjust",
        "drop-initial-before-align",
        "drop-initial-size",
        "drop-initial-value",
        "elevation",
        "empty-cells",
        "fit",
        "fit-content",
        "fit-position",
        "flex",
        "flex-basis",
        "flex-direction",
        "flex-flow",
        "flex-grow",
        "flex-shrink",
        "flex-wrap",
        "float",
        "float-offset",
        "flow-from",
        "flow-into",
        "font",
        "font-family",
        "font-feature-settings",
        "font-kerning",
        "font-language-override",
        "font-optical-sizing",
        "font-size",
        "font-size-adjust",
        "font-stretch",
        "font-style",
        "font-synthesis",
        "font-variant",
        "font-variant-alternates",
        "font-variant-caps",
        "font-variant-east-asian",
        "font-variant-ligatures",
        "font-variant-numeric",
        "font-variant-position",
        "font-variation-settings",
        "font-weight",
        "gap",
        "grid",
        "grid-area",
        "grid-auto-columns",
        "grid-auto-flow",
        "grid-auto-rows",
        "grid-column",
        "grid-column-end",
        "grid-column-gap",
        "grid-column-start",
        "grid-gap",
        "grid-row",
        "grid-row-end",
        "grid-row-gap",
        "grid-row-start",
        "grid-template",
        "grid-template-areas",
        "grid-template-columns",
        "grid-template-rows",
        "hanging-punctuation",
        "height",
        "hyphens",
        "icon",
        "image-orientation",
        "image-rendering",
        "image-resolution",
        "inline-box-align",
        "inset",
        "inset-block",
        "inset-block-end",
        "inset-block-start",
        "inset-inline",
        "inset-inline-end",
        "inset-inline-start",
        "isolation",
        "justify-content",
        "justify-items",
        "justify-self",
        "left",
        "letter-spacing",
        "line-break",
        "line-height",
        "line-height-step",
        "line-stacking",
        "line-stacking-ruby",
        "line-stacking-shift",
        "line-stacking-strategy",
        "list-style",
        "list-style-image",
        "list-style-position",
        "list-style-type",
        "margin",
        "margin-bottom",
        "margin-left",
        "margin-right",
        "margin-top",
        "marks",
        "marquee-direction",
        "marquee-loop",
        "marquee-play-count",
        "marquee-speed",
        "marquee-style",
        "mask-clip",
        "mask-composite",
        "mask-image",
        "mask-mode",
        "mask-origin",
        "mask-position",
        "mask-repeat",
        "mask-size",
        "mask-type",
        "max-block-size",
        "max-height",
        "max-inline-size",
        "max-width",
        "min-block-size",
        "min-height",
        "min-inline-size",
        "min-width",
        "mix-blend-mode",
        "move-to",
        "nav-down",
        "nav-index",
        "nav-left",
        "nav-right",
        "nav-up",
        "object-fit",
        "object-position",
        "offset",
        "offset-anchor",
        "offset-distance",
        "offset-path",
        "offset-position",
        "offset-rotate",
        "opacity",
        "order",
        "orphans",
        "outline",
        "outline-color",
        "outline-offset",
        "outline-style",
        "outline-width",
        "overflow",
        "overflow-style",
        "overflow-wrap",
        "overflow-x",
        "overflow-y",
        "padding",
        "padding-bottom",
        "padding-left",
        "padding-right",
        "padding-top",
        "page",
        "page-break-after",
        "page-break-before",
        "page-break-inside",
        "page-policy",
        "pause",
        "pause-after",
        "pause-before",
        "perspective",
        "perspective-origin",
        "pitch",
        "pitch-range",
        "place-content",
        "place-items",
        "place-self",
        "play-during",
        "position",
        "presentation-level",
        "punctuation-trim",
        "quotes",
        "region-break-after",
        "region-break-before",
        "region-break-inside",
        "region-fragment",
        "rendering-intent",
        "resize",
        "rest",
        "rest-after",
        "rest-before",
        "richness",
        "right",
        "rotate",
        "rotation",
        "rotation-point",
        "row-gap",
        "ruby-align",
        "ruby-overhang",
        "ruby-position",
        "ruby-span",
        "scale",
        "scroll-behavior",
        "scroll-margin",
        "scroll-margin-block",
        "scroll-margin-block-end",
        "scroll-margin-block-start",
        "scroll-margin-bottom",
        "scroll-margin-inline",
        "scroll-margin-inline-end",
        "scroll-margin-inline-start",
        "scroll-margin-left",
        "scroll-margin-right",
        "scroll-margin-top",
        "scroll-padding",
        "scroll-padding-block",
        "scroll-padding-block-end",
        "scroll-padding-block-start",
        "scroll-padding-bottom",
        "scroll-padding-inline",
        "scroll-padding-inline-end",
        "scroll-padding-inline-start",
        "scroll-padding-left",
        "scroll-padding-right",
        "scroll-padding-top",
        "scroll-snap-align",
        "scroll-snap-type",
        "shape-image-threshold",
        "shape-inside",
        "shape-margin",
        "shape-outside",
        "size",
        "speak",
        "speak-as",
        "speak-header",
        "speak-numeral",
        "speak-punctuation",
        "speech-rate",
        "stress",
        "string-set",
        "tab-size",
        "table-layout",
        "target",
        "target-name",
        "target-new",
        "target-position",
        "text-align",
        "text-align-last",
        "text-combine-upright",
        "text-decoration",
        "text-decoration-color",
        "text-decoration-line",
        "text-decoration-skip",
        "text-decoration-skip-ink",
        "text-decoration-style",
        "text-emphasis",
        "text-emphasis-color",
        "text-emphasis-position",
        "text-emphasis-style",
        "text-height",
        "text-indent",
        "text-justify",
        "text-orientation",
        "text-outline",
        "text-overflow",
        "text-rendering",
        "text-shadow",
        "text-size-adjust",
        "text-space-collapse",
        "text-transform",
        "text-underline-position",
        "text-wrap",
        "top",
        "touch-action",
        "transform",
        "transform-origin",
        "transform-style",
        "transition",
        "transition-delay",
        "transition-duration",
        "transition-property",
        "transition-timing-function",
        "translate",
        "unicode-bidi",
        "user-select",
        "vertical-align",
        "visibility",
        "voice-balance",
        "voice-duration",
        "voice-family",
        "voice-pitch",
        "voice-range",
        "voice-rate",
        "voice-stress",
        "voice-volume",
        "volume",
        "white-space",
        "widows",
        "width",
        "will-change",
        "word-break",
        "word-spacing",
        "word-wrap",
        "writing-mode",
        "z-index",
        // SVG-specific
        "clip-path",
        "clip-rule",
        "mask",
        "enable-background",
        "filter",
        "flood-color",
        "flood-opacity",
        "lighting-color",
        "stop-color",
        "stop-opacity",
        "pointer-events",
        "color-interpolation",
        "color-interpolation-filters",
        "color-rendering",
        "fill",
        "fill-opacity",
        "fill-rule",
        "image-rendering",
        "marker",
        "marker-end",
        "marker-mid",
        "marker-start",
        "paint-order",
        "shape-rendering",
        "stroke",
        "stroke-dasharray",
        "stroke-dashoffset",
        "stroke-linecap",
        "stroke-linejoin",
        "stroke-miterlimit",
        "stroke-opacity",
        "stroke-width",
        "text-rendering",
        "baseline-shift",
        "dominant-baseline",
        "glyph-orientation-horizontal",
        "glyph-orientation-vertical",
        "text-anchor",
        "writing-mode"
      ], propertyKeywords = keySet(propertyKeywords_);
      var nonStandardPropertyKeywords_ = [
        "accent-color",
        "aspect-ratio",
        "border-block",
        "border-block-color",
        "border-block-end",
        "border-block-end-color",
        "border-block-end-style",
        "border-block-end-width",
        "border-block-start",
        "border-block-start-color",
        "border-block-start-style",
        "border-block-start-width",
        "border-block-style",
        "border-block-width",
        "border-inline",
        "border-inline-color",
        "border-inline-end",
        "border-inline-end-color",
        "border-inline-end-style",
        "border-inline-end-width",
        "border-inline-start",
        "border-inline-start-color",
        "border-inline-start-style",
        "border-inline-start-width",
        "border-inline-style",
        "border-inline-width",
        "content-visibility",
        "margin-block",
        "margin-block-end",
        "margin-block-start",
        "margin-inline",
        "margin-inline-end",
        "margin-inline-start",
        "overflow-anchor",
        "overscroll-behavior",
        "padding-block",
        "padding-block-end",
        "padding-block-start",
        "padding-inline",
        "padding-inline-end",
        "padding-inline-start",
        "scroll-snap-stop",
        "scrollbar-3d-light-color",
        "scrollbar-arrow-color",
        "scrollbar-base-color",
        "scrollbar-dark-shadow-color",
        "scrollbar-face-color",
        "scrollbar-highlight-color",
        "scrollbar-shadow-color",
        "scrollbar-track-color",
        "searchfield-cancel-button",
        "searchfield-decoration",
        "searchfield-results-button",
        "searchfield-results-decoration",
        "shape-inside",
        "zoom"
      ], nonStandardPropertyKeywords = keySet(nonStandardPropertyKeywords_);
      var fontProperties_ = [
        "font-display",
        "font-family",
        "src",
        "unicode-range",
        "font-variant",
        "font-feature-settings",
        "font-stretch",
        "font-weight",
        "font-style"
      ], fontProperties = keySet(fontProperties_);
      var counterDescriptors_ = [
        "additive-symbols",
        "fallback",
        "negative",
        "pad",
        "prefix",
        "range",
        "speak-as",
        "suffix",
        "symbols",
        "system"
      ], counterDescriptors = keySet(counterDescriptors_);
      var colorKeywords_ = [
        "aliceblue",
        "antiquewhite",
        "aqua",
        "aquamarine",
        "azure",
        "beige",
        "bisque",
        "black",
        "blanchedalmond",
        "blue",
        "blueviolet",
        "brown",
        "burlywood",
        "cadetblue",
        "chartreuse",
        "chocolate",
        "coral",
        "cornflowerblue",
        "cornsilk",
        "crimson",
        "cyan",
        "darkblue",
        "darkcyan",
        "darkgoldenrod",
        "darkgray",
        "darkgreen",
        "darkgrey",
        "darkkhaki",
        "darkmagenta",
        "darkolivegreen",
        "darkorange",
        "darkorchid",
        "darkred",
        "darksalmon",
        "darkseagreen",
        "darkslateblue",
        "darkslategray",
        "darkslategrey",
        "darkturquoise",
        "darkviolet",
        "deeppink",
        "deepskyblue",
        "dimgray",
        "dimgrey",
        "dodgerblue",
        "firebrick",
        "floralwhite",
        "forestgreen",
        "fuchsia",
        "gainsboro",
        "ghostwhite",
        "gold",
        "goldenrod",
        "gray",
        "grey",
        "green",
        "greenyellow",
        "honeydew",
        "hotpink",
        "indianred",
        "indigo",
        "ivory",
        "khaki",
        "lavender",
        "lavenderblush",
        "lawngreen",
        "lemonchiffon",
        "lightblue",
        "lightcoral",
        "lightcyan",
        "lightgoldenrodyellow",
        "lightgray",
        "lightgreen",
        "lightgrey",
        "lightpink",
        "lightsalmon",
        "lightseagreen",
        "lightskyblue",
        "lightslategray",
        "lightslategrey",
        "lightsteelblue",
        "lightyellow",
        "lime",
        "limegreen",
        "linen",
        "magenta",
        "maroon",
        "mediumaquamarine",
        "mediumblue",
        "mediumorchid",
        "mediumpurple",
        "mediumseagreen",
        "mediumslateblue",
        "mediumspringgreen",
        "mediumturquoise",
        "mediumvioletred",
        "midnightblue",
        "mintcream",
        "mistyrose",
        "moccasin",
        "navajowhite",
        "navy",
        "oldlace",
        "olive",
        "olivedrab",
        "orange",
        "orangered",
        "orchid",
        "palegoldenrod",
        "palegreen",
        "paleturquoise",
        "palevioletred",
        "papayawhip",
        "peachpuff",
        "peru",
        "pink",
        "plum",
        "powderblue",
        "purple",
        "rebeccapurple",
        "red",
        "rosybrown",
        "royalblue",
        "saddlebrown",
        "salmon",
        "sandybrown",
        "seagreen",
        "seashell",
        "sienna",
        "silver",
        "skyblue",
        "slateblue",
        "slategray",
        "slategrey",
        "snow",
        "springgreen",
        "steelblue",
        "tan",
        "teal",
        "thistle",
        "tomato",
        "turquoise",
        "violet",
        "wheat",
        "white",
        "whitesmoke",
        "yellow",
        "yellowgreen"
      ], colorKeywords = keySet(colorKeywords_);
      var valueKeywords_ = [
        "above",
        "absolute",
        "activeborder",
        "additive",
        "activecaption",
        "afar",
        "after-white-space",
        "ahead",
        "alias",
        "all",
        "all-scroll",
        "alphabetic",
        "alternate",
        "always",
        "amharic",
        "amharic-abegede",
        "antialiased",
        "appworkspace",
        "arabic-indic",
        "armenian",
        "asterisks",
        "attr",
        "auto",
        "auto-flow",
        "avoid",
        "avoid-column",
        "avoid-page",
        "avoid-region",
        "axis-pan",
        "background",
        "backwards",
        "baseline",
        "below",
        "bidi-override",
        "binary",
        "bengali",
        "blink",
        "block",
        "block-axis",
        "blur",
        "bold",
        "bolder",
        "border",
        "border-box",
        "both",
        "bottom",
        "break",
        "break-all",
        "break-word",
        "brightness",
        "bullets",
        "button",
        "buttonface",
        "buttonhighlight",
        "buttonshadow",
        "buttontext",
        "calc",
        "cambodian",
        "capitalize",
        "caps-lock-indicator",
        "caption",
        "captiontext",
        "caret",
        "cell",
        "center",
        "checkbox",
        "circle",
        "cjk-decimal",
        "cjk-earthly-branch",
        "cjk-heavenly-stem",
        "cjk-ideographic",
        "clear",
        "clip",
        "close-quote",
        "col-resize",
        "collapse",
        "color",
        "color-burn",
        "color-dodge",
        "column",
        "column-reverse",
        "compact",
        "condensed",
        "conic-gradient",
        "contain",
        "content",
        "contents",
        "content-box",
        "context-menu",
        "continuous",
        "contrast",
        "copy",
        "counter",
        "counters",
        "cover",
        "crop",
        "cross",
        "crosshair",
        "cubic-bezier",
        "currentcolor",
        "cursive",
        "cyclic",
        "darken",
        "dashed",
        "decimal",
        "decimal-leading-zero",
        "default",
        "default-button",
        "dense",
        "destination-atop",
        "destination-in",
        "destination-out",
        "destination-over",
        "devanagari",
        "difference",
        "disc",
        "discard",
        "disclosure-closed",
        "disclosure-open",
        "document",
        "dot-dash",
        "dot-dot-dash",
        "dotted",
        "double",
        "down",
        "drop-shadow",
        "e-resize",
        "ease",
        "ease-in",
        "ease-in-out",
        "ease-out",
        "element",
        "ellipse",
        "ellipsis",
        "embed",
        "end",
        "ethiopic",
        "ethiopic-abegede",
        "ethiopic-abegede-am-et",
        "ethiopic-abegede-gez",
        "ethiopic-abegede-ti-er",
        "ethiopic-abegede-ti-et",
        "ethiopic-halehame-aa-er",
        "ethiopic-halehame-aa-et",
        "ethiopic-halehame-am-et",
        "ethiopic-halehame-gez",
        "ethiopic-halehame-om-et",
        "ethiopic-halehame-sid-et",
        "ethiopic-halehame-so-et",
        "ethiopic-halehame-ti-er",
        "ethiopic-halehame-ti-et",
        "ethiopic-halehame-tig",
        "ethiopic-numeric",
        "ew-resize",
        "exclusion",
        "expanded",
        "extends",
        "extra-condensed",
        "extra-expanded",
        "fantasy",
        "fast",
        "fill",
        "fill-box",
        "fixed",
        "flat",
        "flex",
        "flex-end",
        "flex-start",
        "footnotes",
        "forwards",
        "from",
        "geometricPrecision",
        "georgian",
        "grayscale",
        "graytext",
        "grid",
        "groove",
        "gujarati",
        "gurmukhi",
        "hand",
        "hangul",
        "hangul-consonant",
        "hard-light",
        "hebrew",
        "help",
        "hidden",
        "hide",
        "higher",
        "highlight",
        "highlighttext",
        "hiragana",
        "hiragana-iroha",
        "horizontal",
        "hsl",
        "hsla",
        "hue",
        "hue-rotate",
        "icon",
        "ignore",
        "inactiveborder",
        "inactivecaption",
        "inactivecaptiontext",
        "infinite",
        "infobackground",
        "infotext",
        "inherit",
        "initial",
        "inline",
        "inline-axis",
        "inline-block",
        "inline-flex",
        "inline-grid",
        "inline-table",
        "inset",
        "inside",
        "intrinsic",
        "invert",
        "italic",
        "japanese-formal",
        "japanese-informal",
        "justify",
        "kannada",
        "katakana",
        "katakana-iroha",
        "keep-all",
        "khmer",
        "korean-hangul-formal",
        "korean-hanja-formal",
        "korean-hanja-informal",
        "landscape",
        "lao",
        "large",
        "larger",
        "left",
        "level",
        "lighter",
        "lighten",
        "line-through",
        "linear",
        "linear-gradient",
        "lines",
        "list-item",
        "listbox",
        "listitem",
        "local",
        "logical",
        "loud",
        "lower",
        "lower-alpha",
        "lower-armenian",
        "lower-greek",
        "lower-hexadecimal",
        "lower-latin",
        "lower-norwegian",
        "lower-roman",
        "lowercase",
        "ltr",
        "luminosity",
        "malayalam",
        "manipulation",
        "match",
        "matrix",
        "matrix3d",
        "media-play-button",
        "media-slider",
        "media-sliderthumb",
        "media-volume-slider",
        "media-volume-sliderthumb",
        "medium",
        "menu",
        "menulist",
        "menulist-button",
        "menutext",
        "message-box",
        "middle",
        "min-intrinsic",
        "mix",
        "mongolian",
        "monospace",
        "move",
        "multiple",
        "multiple_mask_images",
        "multiply",
        "myanmar",
        "n-resize",
        "narrower",
        "ne-resize",
        "nesw-resize",
        "no-close-quote",
        "no-drop",
        "no-open-quote",
        "no-repeat",
        "none",
        "normal",
        "not-allowed",
        "nowrap",
        "ns-resize",
        "numbers",
        "numeric",
        "nw-resize",
        "nwse-resize",
        "oblique",
        "octal",
        "opacity",
        "open-quote",
        "optimizeLegibility",
        "optimizeSpeed",
        "oriya",
        "oromo",
        "outset",
        "outside",
        "outside-shape",
        "overlay",
        "overline",
        "padding",
        "padding-box",
        "painted",
        "page",
        "paused",
        "persian",
        "perspective",
        "pinch-zoom",
        "plus-darker",
        "plus-lighter",
        "pointer",
        "polygon",
        "portrait",
        "pre",
        "pre-line",
        "pre-wrap",
        "preserve-3d",
        "progress",
        "push-button",
        "radial-gradient",
        "radio",
        "read-only",
        "read-write",
        "read-write-plaintext-only",
        "rectangle",
        "region",
        "relative",
        "repeat",
        "repeating-linear-gradient",
        "repeating-radial-gradient",
        "repeating-conic-gradient",
        "repeat-x",
        "repeat-y",
        "reset",
        "reverse",
        "rgb",
        "rgba",
        "ridge",
        "right",
        "rotate",
        "rotate3d",
        "rotateX",
        "rotateY",
        "rotateZ",
        "round",
        "row",
        "row-resize",
        "row-reverse",
        "rtl",
        "run-in",
        "running",
        "s-resize",
        "sans-serif",
        "saturate",
        "saturation",
        "scale",
        "scale3d",
        "scaleX",
        "scaleY",
        "scaleZ",
        "screen",
        "scroll",
        "scrollbar",
        "scroll-position",
        "se-resize",
        "searchfield",
        "searchfield-cancel-button",
        "searchfield-decoration",
        "searchfield-results-button",
        "searchfield-results-decoration",
        "self-start",
        "self-end",
        "semi-condensed",
        "semi-expanded",
        "separate",
        "sepia",
        "serif",
        "show",
        "sidama",
        "simp-chinese-formal",
        "simp-chinese-informal",
        "single",
        "skew",
        "skewX",
        "skewY",
        "skip-white-space",
        "slide",
        "slider-horizontal",
        "slider-vertical",
        "sliderthumb-horizontal",
        "sliderthumb-vertical",
        "slow",
        "small",
        "small-caps",
        "small-caption",
        "smaller",
        "soft-light",
        "solid",
        "somali",
        "source-atop",
        "source-in",
        "source-out",
        "source-over",
        "space",
        "space-around",
        "space-between",
        "space-evenly",
        "spell-out",
        "square",
        "square-button",
        "start",
        "static",
        "status-bar",
        "stretch",
        "stroke",
        "stroke-box",
        "sub",
        "subpixel-antialiased",
        "svg_masks",
        "super",
        "sw-resize",
        "symbolic",
        "symbols",
        "system-ui",
        "table",
        "table-caption",
        "table-cell",
        "table-column",
        "table-column-group",
        "table-footer-group",
        "table-header-group",
        "table-row",
        "table-row-group",
        "tamil",
        "telugu",
        "text",
        "text-bottom",
        "text-top",
        "textarea",
        "textfield",
        "thai",
        "thick",
        "thin",
        "threeddarkshadow",
        "threedface",
        "threedhighlight",
        "threedlightshadow",
        "threedshadow",
        "tibetan",
        "tigre",
        "tigrinya-er",
        "tigrinya-er-abegede",
        "tigrinya-et",
        "tigrinya-et-abegede",
        "to",
        "top",
        "trad-chinese-formal",
        "trad-chinese-informal",
        "transform",
        "translate",
        "translate3d",
        "translateX",
        "translateY",
        "translateZ",
        "transparent",
        "ultra-condensed",
        "ultra-expanded",
        "underline",
        "unidirectional-pan",
        "unset",
        "up",
        "upper-alpha",
        "upper-armenian",
        "upper-greek",
        "upper-hexadecimal",
        "upper-latin",
        "upper-norwegian",
        "upper-roman",
        "uppercase",
        "urdu",
        "url",
        "var",
        "vertical",
        "vertical-text",
        "view-box",
        "visible",
        "visibleFill",
        "visiblePainted",
        "visibleStroke",
        "visual",
        "w-resize",
        "wait",
        "wave",
        "wider",
        "window",
        "windowframe",
        "windowtext",
        "words",
        "wrap",
        "wrap-reverse",
        "x-large",
        "x-small",
        "xor",
        "xx-large",
        "xx-small"
      ], valueKeywords = keySet(valueKeywords_);
      var allWords = documentTypes_.concat(mediaTypes_).concat(mediaFeatures_).concat(mediaValueKeywords_).concat(propertyKeywords_).concat(nonStandardPropertyKeywords_).concat(colorKeywords_).concat(valueKeywords_);
      CodeMirror2.registerHelper("hintWords", "css", allWords);
      function tokenCComment(stream, state) {
        var maybeEnd = false, ch;
        while ((ch = stream.next()) != null) {
          if (maybeEnd && ch == "/") {
            state.tokenize = null;
            break;
          }
          maybeEnd = ch == "*";
        }
        return ["comment", "comment"];
      }
      CodeMirror2.defineMIME("text/css", {
        documentTypes,
        mediaTypes,
        mediaFeatures,
        mediaValueKeywords,
        propertyKeywords,
        nonStandardPropertyKeywords,
        fontProperties,
        counterDescriptors,
        colorKeywords,
        valueKeywords,
        tokenHooks: {
          "/": function(stream, state) {
            if (!stream.eat("*")) return false;
            state.tokenize = tokenCComment;
            return tokenCComment(stream, state);
          }
        },
        name: "css"
      });
      CodeMirror2.defineMIME("text/x-scss", {
        mediaTypes,
        mediaFeatures,
        mediaValueKeywords,
        propertyKeywords,
        nonStandardPropertyKeywords,
        colorKeywords,
        valueKeywords,
        fontProperties,
        allowNested: true,
        lineComment: "//",
        tokenHooks: {
          "/": function(stream, state) {
            if (stream.eat("/")) {
              stream.skipToEnd();
              return ["comment", "comment"];
            } else if (stream.eat("*")) {
              state.tokenize = tokenCComment;
              return tokenCComment(stream, state);
            } else {
              return ["operator", "operator"];
            }
          },
          ":": function(stream) {
            if (stream.match(/^\s*\{/, false))
              return [null, null];
            return false;
          },
          "$": function(stream) {
            stream.match(/^[\w-]+/);
            if (stream.match(/^\s*:/, false))
              return ["variable-2", "variable-definition"];
            return ["variable-2", "variable"];
          },
          "#": function(stream) {
            if (!stream.eat("{")) return false;
            return [null, "interpolation"];
          }
        },
        name: "css",
        helperType: "scss"
      });
      CodeMirror2.defineMIME("text/x-less", {
        mediaTypes,
        mediaFeatures,
        mediaValueKeywords,
        propertyKeywords,
        nonStandardPropertyKeywords,
        colorKeywords,
        valueKeywords,
        fontProperties,
        allowNested: true,
        lineComment: "//",
        tokenHooks: {
          "/": function(stream, state) {
            if (stream.eat("/")) {
              stream.skipToEnd();
              return ["comment", "comment"];
            } else if (stream.eat("*")) {
              state.tokenize = tokenCComment;
              return tokenCComment(stream, state);
            } else {
              return ["operator", "operator"];
            }
          },
          "@": function(stream) {
            if (stream.eat("{")) return [null, "interpolation"];
            if (stream.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i, false)) return false;
            stream.eatWhile(/[\w\\\-]/);
            if (stream.match(/^\s*:/, false))
              return ["variable-2", "variable-definition"];
            return ["variable-2", "variable"];
          },
          "&": function() {
            return ["atom", "atom"];
          }
        },
        name: "css",
        helperType: "less"
      });
      CodeMirror2.defineMIME("text/x-gss", {
        documentTypes,
        mediaTypes,
        mediaFeatures,
        propertyKeywords,
        nonStandardPropertyKeywords,
        fontProperties,
        counterDescriptors,
        colorKeywords,
        valueKeywords,
        supportsAtComponent: true,
        tokenHooks: {
          "/": function(stream, state) {
            if (!stream.eat("*")) return false;
            state.tokenize = tokenCComment;
            return tokenCComment(stream, state);
          }
        },
        name: "css",
        helperType: "gss"
      });
    });
  })();
  return css$2.exports;
}
requireCss();
var closebrackets = { exports: {} };
var hasRequiredClosebrackets;
function requireClosebrackets() {
  if (hasRequiredClosebrackets) return closebrackets.exports;
  hasRequiredClosebrackets = 1;
  (function(module2, exports2) {
    (function(mod) {
      mod(requireCodemirror());
    })(function(CodeMirror2) {
      var defaults = {
        pairs: `()[]{}''""`,
        closeBefore: `)]}'":;>`,
        triples: "",
        explode: "[]{}"
      };
      var Pos = CodeMirror2.Pos;
      CodeMirror2.defineOption("autoCloseBrackets", false, function(cm, val, old) {
        if (old && old != CodeMirror2.Init) {
          cm.removeKeyMap(keyMap);
          cm.state.closeBrackets = null;
        }
        if (val) {
          ensureBound(getOption(val, "pairs"));
          cm.state.closeBrackets = val;
          cm.addKeyMap(keyMap);
        }
      });
      function getOption(conf, name) {
        if (name == "pairs" && typeof conf == "string") return conf;
        if (typeof conf == "object" && conf[name] != null) return conf[name];
        return defaults[name];
      }
      var keyMap = { Backspace: handleBackspace, Enter: handleEnter };
      function ensureBound(chars) {
        for (var i = 0; i < chars.length; i++) {
          var ch = chars.charAt(i), key = "'" + ch + "'";
          if (!keyMap[key]) keyMap[key] = handler(ch);
        }
      }
      ensureBound(defaults.pairs + "`");
      function handler(ch) {
        return function(cm) {
          return handleChar(cm, ch);
        };
      }
      function getConfig(cm) {
        var deflt = cm.state.closeBrackets;
        if (!deflt || deflt.override) return deflt;
        var mode = cm.getModeAt(cm.getCursor());
        return mode.closeBrackets || deflt;
      }
      function handleBackspace(cm) {
        var conf = getConfig(cm);
        if (!conf || cm.getOption("disableInput")) return CodeMirror2.Pass;
        var pairs = getOption(conf, "pairs");
        var ranges = cm.listSelections();
        for (var i = 0; i < ranges.length; i++) {
          if (!ranges[i].empty()) return CodeMirror2.Pass;
          var around = charsAround(cm, ranges[i].head);
          if (!around || pairs.indexOf(around) % 2 != 0) return CodeMirror2.Pass;
        }
        for (var i = ranges.length - 1; i >= 0; i--) {
          var cur = ranges[i].head;
          cm.replaceRange("", Pos(cur.line, cur.ch - 1), Pos(cur.line, cur.ch + 1), "+delete");
        }
      }
      function handleEnter(cm) {
        var conf = getConfig(cm);
        var explode = conf && getOption(conf, "explode");
        if (!explode || cm.getOption("disableInput")) return CodeMirror2.Pass;
        var ranges = cm.listSelections();
        for (var i = 0; i < ranges.length; i++) {
          if (!ranges[i].empty()) return CodeMirror2.Pass;
          var around = charsAround(cm, ranges[i].head);
          if (!around || explode.indexOf(around) % 2 != 0) return CodeMirror2.Pass;
        }
        cm.operation(function() {
          var linesep = cm.lineSeparator() || "\n";
          cm.replaceSelection(linesep + linesep, null);
          moveSel(cm, -1);
          ranges = cm.listSelections();
          for (var i2 = 0; i2 < ranges.length; i2++) {
            var line = ranges[i2].head.line;
            cm.indentLine(line, null, true);
            cm.indentLine(line + 1, null, true);
          }
        });
      }
      function moveSel(cm, dir) {
        var newRanges = [], ranges = cm.listSelections(), primary = 0;
        for (var i = 0; i < ranges.length; i++) {
          var range2 = ranges[i];
          if (range2.head == cm.getCursor()) primary = i;
          var pos = range2.head.ch || dir > 0 ? { line: range2.head.line, ch: range2.head.ch + dir } : { line: range2.head.line - 1 };
          newRanges.push({ anchor: pos, head: pos });
        }
        cm.setSelections(newRanges, primary);
      }
      function contractSelection(sel) {
        var inverted = CodeMirror2.cmpPos(sel.anchor, sel.head) > 0;
        return {
          anchor: new Pos(sel.anchor.line, sel.anchor.ch + (inverted ? -1 : 1)),
          head: new Pos(sel.head.line, sel.head.ch + (inverted ? 1 : -1))
        };
      }
      function handleChar(cm, ch) {
        var conf = getConfig(cm);
        if (!conf || cm.getOption("disableInput")) return CodeMirror2.Pass;
        var pairs = getOption(conf, "pairs");
        var pos = pairs.indexOf(ch);
        if (pos == -1) return CodeMirror2.Pass;
        var closeBefore = getOption(conf, "closeBefore");
        var triples = getOption(conf, "triples");
        var identical = pairs.charAt(pos + 1) == ch;
        var ranges = cm.listSelections();
        var opening = pos % 2 == 0;
        var type;
        for (var i = 0; i < ranges.length; i++) {
          var range2 = ranges[i], cur = range2.head, curType;
          var next = cm.getRange(cur, Pos(cur.line, cur.ch + 1));
          if (opening && !range2.empty()) {
            curType = "surround";
          } else if ((identical || !opening) && next == ch) {
            if (identical && stringStartsAfter(cm, cur))
              curType = "both";
            else if (triples.indexOf(ch) >= 0 && cm.getRange(cur, Pos(cur.line, cur.ch + 3)) == ch + ch + ch)
              curType = "skipThree";
            else
              curType = "skip";
          } else if (identical && cur.ch > 1 && triples.indexOf(ch) >= 0 && cm.getRange(Pos(cur.line, cur.ch - 2), cur) == ch + ch) {
            if (cur.ch > 2 && /\bstring/.test(cm.getTokenTypeAt(Pos(cur.line, cur.ch - 2)))) return CodeMirror2.Pass;
            curType = "addFour";
          } else if (identical) {
            var prev = cur.ch == 0 ? " " : cm.getRange(Pos(cur.line, cur.ch - 1), cur);
            if (!CodeMirror2.isWordChar(next) && prev != ch && !CodeMirror2.isWordChar(prev)) curType = "both";
            else return CodeMirror2.Pass;
          } else if (opening && (next.length === 0 || /\s/.test(next) || closeBefore.indexOf(next) > -1)) {
            curType = "both";
          } else {
            return CodeMirror2.Pass;
          }
          if (!type) type = curType;
          else if (type != curType) return CodeMirror2.Pass;
        }
        var left = pos % 2 ? pairs.charAt(pos - 1) : ch;
        var right = pos % 2 ? ch : pairs.charAt(pos + 1);
        cm.operation(function() {
          if (type == "skip") {
            moveSel(cm, 1);
          } else if (type == "skipThree") {
            moveSel(cm, 3);
          } else if (type == "surround") {
            var sels = cm.getSelections();
            for (var i2 = 0; i2 < sels.length; i2++)
              sels[i2] = left + sels[i2] + right;
            cm.replaceSelections(sels, "around");
            sels = cm.listSelections().slice();
            for (var i2 = 0; i2 < sels.length; i2++)
              sels[i2] = contractSelection(sels[i2]);
            cm.setSelections(sels);
          } else if (type == "both") {
            cm.replaceSelection(left + right, null);
            cm.triggerElectric(left + right);
            moveSel(cm, -1);
          } else if (type == "addFour") {
            cm.replaceSelection(left + left + left + left, "before");
            moveSel(cm, 1);
          }
        });
      }
      function charsAround(cm, pos) {
        var str = cm.getRange(
          Pos(pos.line, pos.ch - 1),
          Pos(pos.line, pos.ch + 1)
        );
        return str.length == 2 ? str : null;
      }
      function stringStartsAfter(cm, pos) {
        var token = cm.getTokenAt(Pos(pos.line, pos.ch + 1));
        return /\bstring/.test(token.type) && token.start == pos.ch && (pos.ch == 0 || !/\bstring/.test(cm.getTokenTypeAt(pos)));
      }
    });
  })();
  return closebrackets.exports;
}
requireClosebrackets();
const css$1 = "/* BASICS */\n\n.CodeMirror {\n  /* Set height, width, borders, and global font properties here */\n  font-family: monospace;\n  height: 300px;\n  color: black;\n  direction: ltr;\n}\n\n/* PADDING */\n\n.CodeMirror-lines {\n  padding: 4px 0; /* Vertical padding around content */\n}\n.CodeMirror pre.CodeMirror-line,\n.CodeMirror pre.CodeMirror-line-like {\n  padding: 0 4px; /* Horizontal padding of content */\n}\n\n.CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {\n  background-color: white; /* The little square between H and V scrollbars */\n}\n\n/* GUTTER */\n\n.CodeMirror-gutters {\n  border-right: 1px solid #ddd;\n  background-color: #f7f7f7;\n  white-space: nowrap;\n}\n.CodeMirror-linenumbers {}\n.CodeMirror-linenumber {\n  padding: 0 3px 0 5px;\n  min-width: 20px;\n  text-align: right;\n  color: #999;\n  white-space: nowrap;\n}\n\n.CodeMirror-guttermarker { color: black; }\n.CodeMirror-guttermarker-subtle { color: #999; }\n\n/* CURSOR */\n\n.CodeMirror-cursor {\n  border-left: 1px solid black;\n  border-right: none;\n  width: 0;\n}\n/* Shown when moving in bi-directional text */\n.CodeMirror div.CodeMirror-secondarycursor {\n  border-left: 1px solid silver;\n}\n.cm-fat-cursor .CodeMirror-cursor {\n  width: auto;\n  border: 0 !important;\n  background: #7e7;\n}\n.cm-fat-cursor div.CodeMirror-cursors {\n  z-index: 1;\n}\n.cm-fat-cursor .CodeMirror-line::selection,\n.cm-fat-cursor .CodeMirror-line > span::selection, \n.cm-fat-cursor .CodeMirror-line > span > span::selection { background: transparent; }\n.cm-fat-cursor .CodeMirror-line::-moz-selection,\n.cm-fat-cursor .CodeMirror-line > span::-moz-selection,\n.cm-fat-cursor .CodeMirror-line > span > span::-moz-selection { background: transparent; }\n.cm-fat-cursor { caret-color: transparent; }\n@-moz-keyframes blink {\n  0% {}\n  50% { background-color: transparent; }\n  100% {}\n}\n@-webkit-keyframes blink {\n  0% {}\n  50% { background-color: transparent; }\n  100% {}\n}\n@keyframes blink {\n  0% {}\n  50% { background-color: transparent; }\n  100% {}\n}\n\n/* Can style cursor different in overwrite (non-insert) mode */\n.CodeMirror-overwrite .CodeMirror-cursor {}\n\n.cm-tab { display: inline-block; text-decoration: inherit; }\n\n.CodeMirror-rulers {\n  position: absolute;\n  left: 0; right: 0; top: -50px; bottom: 0;\n  overflow: hidden;\n}\n.CodeMirror-ruler {\n  border-left: 1px solid #ccc;\n  top: 0; bottom: 0;\n  position: absolute;\n}\n\n/* DEFAULT THEME */\n\n.cm-s-default .cm-header {color: blue;}\n.cm-s-default .cm-quote {color: #090;}\n.cm-negative {color: #d44;}\n.cm-positive {color: #292;}\n.cm-header, .cm-strong {font-weight: bold;}\n.cm-em {font-style: italic;}\n.cm-link {text-decoration: underline;}\n.cm-strikethrough {text-decoration: line-through;}\n\n.cm-s-default .cm-keyword {color: #708;}\n.cm-s-default .cm-atom {color: #219;}\n.cm-s-default .cm-number {color: #164;}\n.cm-s-default .cm-def {color: #00f;}\n.cm-s-default .cm-variable,\n.cm-s-default .cm-punctuation,\n.cm-s-default .cm-property,\n.cm-s-default .cm-operator {}\n.cm-s-default .cm-variable-2 {color: #05a;}\n.cm-s-default .cm-variable-3, .cm-s-default .cm-type {color: #085;}\n.cm-s-default .cm-comment {color: #a50;}\n.cm-s-default .cm-string {color: #a11;}\n.cm-s-default .cm-string-2 {color: #f50;}\n.cm-s-default .cm-meta {color: #555;}\n.cm-s-default .cm-qualifier {color: #555;}\n.cm-s-default .cm-builtin {color: #30a;}\n.cm-s-default .cm-bracket {color: #997;}\n.cm-s-default .cm-tag {color: #170;}\n.cm-s-default .cm-attribute {color: #00c;}\n.cm-s-default .cm-hr {color: #999;}\n.cm-s-default .cm-link {color: #00c;}\n\n.cm-s-default .cm-error {color: #f00;}\n.cm-invalidchar {color: #f00;}\n\n.CodeMirror-composing { border-bottom: 2px solid; }\n\n/* Default styles for common addons */\n\ndiv.CodeMirror span.CodeMirror-matchingbracket {color: #0b0;}\ndiv.CodeMirror span.CodeMirror-nonmatchingbracket {color: #a22;}\n.CodeMirror-matchingtag { background: rgba(255, 150, 0, .3); }\n.CodeMirror-activeline-background {background: #e8f2ff;}\n\n/* STOP */\n\n/* The rest of this file contains styles related to the mechanics of\n   the editor. You probably shouldn't touch them. */\n\n.CodeMirror {\n  position: relative;\n  overflow: hidden;\n  background: white;\n}\n\n.CodeMirror-scroll {\n  overflow: scroll !important; /* Things will break if this is overridden */\n  /* 50px is the magic margin used to hide the element's real scrollbars */\n  /* See overflow: hidden in .CodeMirror */\n  margin-bottom: -50px; margin-right: -50px;\n  padding-bottom: 50px;\n  height: 100%;\n  outline: none; /* Prevent dragging from highlighting the element */\n  position: relative;\n  z-index: 0;\n}\n.CodeMirror-sizer {\n  position: relative;\n  border-right: 50px solid transparent;\n}\n\n/* The fake, visible scrollbars. Used to force redraw during scrolling\n   before actual scrolling happens, thus preventing shaking and\n   flickering artifacts. */\n.CodeMirror-vscrollbar, .CodeMirror-hscrollbar, .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {\n  position: absolute;\n  z-index: 6;\n  display: none;\n  outline: none;\n}\n.CodeMirror-vscrollbar {\n  right: 0; top: 0;\n  overflow-x: hidden;\n  overflow-y: scroll;\n}\n.CodeMirror-hscrollbar {\n  bottom: 0; left: 0;\n  overflow-y: hidden;\n  overflow-x: scroll;\n}\n.CodeMirror-scrollbar-filler {\n  right: 0; bottom: 0;\n}\n.CodeMirror-gutter-filler {\n  left: 0; bottom: 0;\n}\n\n.CodeMirror-gutters {\n  position: absolute; left: 0; top: 0;\n  min-height: 100%;\n  z-index: 3;\n}\n.CodeMirror-gutter {\n  white-space: normal;\n  height: 100%;\n  display: inline-block;\n  vertical-align: top;\n  margin-bottom: -50px;\n}\n.CodeMirror-gutter-wrapper {\n  position: absolute;\n  z-index: 4;\n  background: none !important;\n  border: none !important;\n}\n.CodeMirror-gutter-background {\n  position: absolute;\n  top: 0; bottom: 0;\n  z-index: 4;\n}\n.CodeMirror-gutter-elt {\n  position: absolute;\n  cursor: default;\n  z-index: 4;\n}\n.CodeMirror-gutter-wrapper ::selection { background-color: transparent }\n.CodeMirror-gutter-wrapper ::-moz-selection { background-color: transparent }\n\n.CodeMirror-lines {\n  cursor: text;\n  min-height: 1px; /* prevents collapsing before first draw */\n}\n.CodeMirror pre.CodeMirror-line,\n.CodeMirror pre.CodeMirror-line-like {\n  /* Reset some styles that the rest of the page might have set */\n  -moz-border-radius: 0; -webkit-border-radius: 0; border-radius: 0;\n  border-width: 0;\n  background: transparent;\n  font-family: inherit;\n  font-size: inherit;\n  margin: 0;\n  white-space: pre;\n  word-wrap: normal;\n  line-height: inherit;\n  color: inherit;\n  z-index: 2;\n  position: relative;\n  overflow: visible;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-font-variant-ligatures: contextual;\n  font-variant-ligatures: contextual;\n}\n.CodeMirror-wrap pre.CodeMirror-line,\n.CodeMirror-wrap pre.CodeMirror-line-like {\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  word-break: normal;\n}\n\n.CodeMirror-linebackground {\n  position: absolute;\n  left: 0; right: 0; top: 0; bottom: 0;\n  z-index: 0;\n}\n\n.CodeMirror-linewidget {\n  position: relative;\n  z-index: 2;\n  padding: 0.1px; /* Force widget margins to stay inside of the container */\n}\n\n.CodeMirror-widget {}\n\n.CodeMirror-rtl pre { direction: rtl; }\n\n.CodeMirror-code {\n  outline: none;\n}\n\n/* Force content-box sizing for the elements where we expect it */\n.CodeMirror-scroll,\n.CodeMirror-sizer,\n.CodeMirror-gutter,\n.CodeMirror-gutters,\n.CodeMirror-linenumber {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n}\n\n.CodeMirror-measure {\n  position: absolute;\n  width: 100%;\n  height: 0;\n  overflow: hidden;\n  visibility: hidden;\n}\n\n.CodeMirror-cursor {\n  position: absolute;\n  pointer-events: none;\n}\n.CodeMirror-measure pre { position: static; }\n\ndiv.CodeMirror-cursors {\n  visibility: hidden;\n  position: relative;\n  z-index: 3;\n}\ndiv.CodeMirror-dragcursors {\n  visibility: visible;\n}\n\n.CodeMirror-focused div.CodeMirror-cursors {\n  visibility: visible;\n}\n\n.CodeMirror-selected { background: #d9d9d9; }\n.CodeMirror-focused .CodeMirror-selected { background: #d7d4f0; }\n.CodeMirror-crosshair { cursor: crosshair; }\n.CodeMirror-line::selection, .CodeMirror-line > span::selection, .CodeMirror-line > span > span::selection { background: #d7d4f0; }\n.CodeMirror-line::-moz-selection, .CodeMirror-line > span::-moz-selection, .CodeMirror-line > span > span::-moz-selection { background: #d7d4f0; }\n\n.cm-searching {\n  background-color: #ffa;\n  background-color: rgba(255, 255, 0, .4);\n}\n\n/* Used to force a border model for a node */\n.cm-force-border { padding-right: .1px; }\n\n@media print {\n  /* Hide the cursor when printing */\n  .CodeMirror div.CodeMirror-cursors {\n    visibility: hidden;\n  }\n}\n\n/* See issue #2901 */\n.cm-tab-wrap-hack:after { content: ''; }\n\n/* Help users use markselection to safely style text background */\nspan.CodeMirror-selectedtext { background: none; }\n";
const materialCss = "/*\n  Name:       material\n  Author:     Mattia Astorino (http://github.com/equinusocio)\n  Website:    https://material-theme.site/\n*/\n\n.cm-s-material.CodeMirror {\n  background-color: #263238;\n  color: #EEFFFF;\n}\n\n.cm-s-material .CodeMirror-gutters {\n  background: #263238;\n  color: #546E7A;\n  border: none;\n}\n\n.cm-s-material .CodeMirror-guttermarker,\n.cm-s-material .CodeMirror-guttermarker-subtle,\n.cm-s-material .CodeMirror-linenumber {\n  color: #546E7A;\n}\n\n.cm-s-material .CodeMirror-cursor {\n  border-left: 1px solid #FFCC00;\n}\n.cm-s-material.cm-fat-cursor .CodeMirror-cursor {\n  background-color: #5d6d5c80 !important;\n}\n.cm-s-material .cm-animate-fat-cursor {\n  background-color: #5d6d5c80 !important;\n}\n\n.cm-s-material div.CodeMirror-selected {\n  background: rgba(128, 203, 196, 0.2);\n}\n\n.cm-s-material.CodeMirror-focused div.CodeMirror-selected {\n  background: rgba(128, 203, 196, 0.2);\n}\n\n.cm-s-material .CodeMirror-line::selection,\n.cm-s-material .CodeMirror-line>span::selection,\n.cm-s-material .CodeMirror-line>span>span::selection {\n  background: rgba(128, 203, 196, 0.2);\n}\n\n.cm-s-material .CodeMirror-line::-moz-selection,\n.cm-s-material .CodeMirror-line>span::-moz-selection,\n.cm-s-material .CodeMirror-line>span>span::-moz-selection {\n  background: rgba(128, 203, 196, 0.2);\n}\n\n.cm-s-material .CodeMirror-activeline-background {\n  background: rgba(0, 0, 0, 0.5);\n}\n\n.cm-s-material .cm-keyword {\n  color: #C792EA;\n}\n\n.cm-s-material .cm-operator {\n  color: #89DDFF;\n}\n\n.cm-s-material .cm-variable-2 {\n  color: #EEFFFF;\n}\n\n.cm-s-material .cm-variable-3,\n.cm-s-material .cm-type {\n  color: #f07178;\n}\n\n.cm-s-material .cm-builtin {\n  color: #FFCB6B;\n}\n\n.cm-s-material .cm-atom {\n  color: #F78C6C;\n}\n\n.cm-s-material .cm-number {\n  color: #FF5370;\n}\n\n.cm-s-material .cm-def {\n  color: #82AAFF;\n}\n\n.cm-s-material .cm-string {\n  color: #C3E88D;\n}\n\n.cm-s-material .cm-string-2 {\n  color: #f07178;\n}\n\n.cm-s-material .cm-comment {\n  color: #546E7A;\n}\n\n.cm-s-material .cm-variable {\n  color: #f07178;\n}\n\n.cm-s-material .cm-tag {\n  color: #FF5370;\n}\n\n.cm-s-material .cm-meta {\n  color: #FFCB6B;\n}\n\n.cm-s-material .cm-attribute {\n  color: #C792EA;\n}\n\n.cm-s-material .cm-property {\n  color: #C792EA;\n}\n\n.cm-s-material .cm-qualifier {\n  color: #DECB6B;\n}\n\n.cm-s-material .cm-variable-3,\n.cm-s-material .cm-type {\n  color: #DECB6B;\n}\n\n\n.cm-s-material .cm-error {\n  color: rgba(255, 255, 255, 1.0);\n  background-color: #FF5370;\n}\n\n.cm-s-material .CodeMirror-matchingbracket {\n  text-decoration: underline;\n  color: white !important;\n}\n";
/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2020 .
 * @license    __LICENSE__
 */
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
injectCssToDocument(css$1, materialCss);
const _sfc_main$g = /* @__PURE__ */ defineComponent({
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
      options.value = CodeMirrorOptions;
      setTimeout(() => {
        cm = CodeMirror(editor.value, options.value);
        cm.setValue(css2.value);
        cm.on("change", (cm2, co) => {
          css2.value = cm2.getValue();
        });
        if (props.autoFocus) {
          setTimeout(() => cm.focus(), 500);
        }
      }, 300);
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
const _hoisted_1$g = { ref: "wrapper" };
const _hoisted_2$e = { ref: "editor" };
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$g, [
    createElementVNode("div", _hoisted_2$e, null, 512)
  ], 512);
}
const CssEditor = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g], ["__file", "CssEditor.vue"]]);
const _sfc_main$f = /* @__PURE__ */ defineComponent({
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
const _hoisted_1$f = { class: "cation-selector" };
const _hoisted_2$d = { class: "form-group mb-3" };
const _hoisted_3$c = ["for"];
const _hoisted_4$a = ["id"];
const _hoisted_5$a = ["value"];
const _hoisted_6$a = { class: "form-group mb-3" };
const _hoisted_7$a = ["for"];
const _hoisted_8$a = ["id"];
const _hoisted_9$a = { class: "form-group mb-3" };
const _hoisted_10$a = ["for"];
const _hoisted_11$9 = ["id"];
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$f, [
    createElementVNode("div", _hoisted_2$d, [
      createElementVNode("label", {
        for: $setup.props.id + "-name"
      }, "Animation Name", 8, _hoisted_3$c),
      withDirectives(createElementVNode("select", {
        id: $setup.props.id + "-name",
        class: "form-select custom-select",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.animation.name = $event)
      }, [
        _cache[3] || (_cache[3] = createElementVNode("option", { value: "" }, "None", -1)),
        (openBlock(true), createElementBlock(Fragment, null, renderList($setup.getAnimations(), (anim) => {
          return openBlock(), createElementBlock("option", { value: anim }, toDisplayString(anim), 9, _hoisted_5$a);
        }), 256))
      ], 8, _hoisted_4$a), [
        [vModelSelect, $setup.animation.name]
      ])
    ]),
    createElementVNode("div", _hoisted_6$a, [
      createElementVNode("label", {
        for: $setup.props.id + "-duration"
      }, "Animation Duration", 8, _hoisted_7$a),
      withDirectives(createElementVNode("input", {
        type: "number",
        id: $setup.props.id + "-duration",
        class: "form-control",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.animation.duration = $event),
        min: "0"
      }, null, 8, _hoisted_8$a), [
        [vModelText, $setup.animation.duration]
      ]),
      _cache[4] || (_cache[4] = createElementVNode("small", { class: "form-text text-muted" }, ' The duration of this animation. The unit is "ms" (1/1000 seconds) ', -1))
    ]),
    createElementVNode("div", _hoisted_9$a, [
      createElementVNode("label", {
        for: $setup.props.id + "-delay"
      }, "Delay Time", 8, _hoisted_10$a),
      withDirectives(createElementVNode("input", {
        type: "number",
        id: $setup.props.id + "-delay",
        class: "form-control",
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.animation.delay = $event),
        min: "0"
      }, null, 8, _hoisted_11$9), [
        [vModelText, $setup.animation.delay]
      ]),
      _cache[5] || (_cache[5] = createElementVNode("small", { class: "form-text text-muted" }, ' Delay a while to start animation. The unit is "ms" (1/1000 seconds) ', -1))
    ])
  ]);
}
const Animations = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__file", "Animations.vue"]]);
const _sfc_main$e = /* @__PURE__ */ defineComponent({
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
const _hoisted_1$e = { class: "" };
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["form-group mb-3", $setup.getClassName()])
  }, [
    createElementVNode("div", {
      class: normalizeClass(["d-flex", $setup.getClassName("__title")])
    }, [
      createElementVNode("div", _hoisted_1$e, [
        renderSlot(_ctx.$slots, "label")
      ]),
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
        createElementVNode("a", {
          href: "javascript://",
          class: normalizeClass([$setup.currentSize === "md" ? "active" : "text-dark"]),
          onClick: _cache[1] || (_cache[1] = ($event) => $setup.currentSize = "md")
        }, [..._cache[4] || (_cache[4] = [
          createElementVNode("span", { class: "fa fa-fw fa-tablet-screen-button" }, null, -1)
        ])], 2),
        createElementVNode("a", {
          href: "javascript://",
          class: normalizeClass([$setup.currentSize === "xs" ? "active" : "text-dark"]),
          onClick: _cache[2] || (_cache[2] = ($event) => $setup.currentSize = "xs")
        }, [..._cache[5] || (_cache[5] = [
          createElementVNode("span", { class: "fa fa-fw fa-mobile-screen-button" }, null, -1)
        ])], 2)
      ], 2)
    ], 2),
    createElementVNode("div", {
      class: normalizeClass($setup.getClassName("__inputs"))
    }, [
      $setup.currentSize === "lg" ? renderSlot(_ctx.$slots, "lg", { key: 0 }) : createCommentVNode("", true),
      $setup.currentSize === "md" ? renderSlot(_ctx.$slots, "md", { key: 1 }) : createCommentVNode("", true),
      $setup.currentSize === "xs" ? renderSlot(_ctx.$slots, "xs", { key: 2 }) : createCommentVNode("", true)
    ], 2),
    renderSlot(_ctx.$slots, "description")
  ], 2);
}
const RwdGroup = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__file", "RwdGroup.vue"]]);
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "BoxOffset",
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit2 = __emit;
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
            emit2("update:modelValue", allValue);
          });
        });
      });
    });
    watch(() => props.modelValue, (value) => {
      extractValue(value);
    });
    const __returned__ = { props, emit: emit2, offsets, lock, currentSize, getAllValues, extractValue, RwdGroup };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$d = { class: "mb-2" };
const _hoisted_2$c = { class: "form-row row" };
const _hoisted_3$b = { class: "col-3" };
const _hoisted_4$9 = ["onUpdate:modelValue"];
const _hoisted_5$9 = { class: "col-3" };
const _hoisted_6$9 = ["onUpdate:modelValue"];
const _hoisted_7$9 = { class: "col-3" };
const _hoisted_8$9 = ["onUpdate:modelValue"];
const _hoisted_9$9 = { class: "col-3" };
const _hoisted_10$9 = ["onUpdate:modelValue"];
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock($setup["RwdGroup"], { "class-name": "c-box-offset" }, createSlots({
    label: withCtx(() => [
      createElementVNode("div", _hoisted_1$d, [
        renderSlot(_ctx.$slots, "label"),
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
          createElementVNode("div", _hoisted_2$c, [
            createElementVNode("div", _hoisted_3$b, [
              withDirectives(createElementVNode("input", {
                type: "text",
                class: "form-control",
                placeholder: "Top",
                "onUpdate:modelValue": ($event) => $setup.offsets[size].top = $event
              }, null, 8, _hoisted_4$9), [
                [vModelText, $setup.offsets[size].top]
              ])
            ]),
            createElementVNode("div", _hoisted_5$9, [
              withDirectives(createElementVNode("input", {
                type: "text",
                class: "form-control",
                placeholder: "Right",
                "onUpdate:modelValue": ($event) => $setup.offsets[size].right = $event
              }, null, 8, _hoisted_6$9), [
                [vModelText, $setup.offsets[size].right]
              ])
            ]),
            createElementVNode("div", _hoisted_7$9, [
              withDirectives(createElementVNode("input", {
                type: "text",
                class: "form-control",
                placeholder: "Bottom",
                "onUpdate:modelValue": ($event) => $setup.offsets[size].bottom = $event
              }, null, 8, _hoisted_8$9), [
                [vModelText, $setup.offsets[size].bottom]
              ])
            ]),
            createElementVNode("div", _hoisted_9$9, [
              withDirectives(createElementVNode("input", {
                type: "text",
                class: "form-control",
                placeholder: "Left",
                "onUpdate:modelValue": ($event) => $setup.offsets[size].left = $event
              }, null, 8, _hoisted_10$9), [
                [vModelText, $setup.offsets[size].left]
              ])
            ])
          ])
        ])
      };
    })
  ]), 1024);
}
const BoxOffset = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__file", "BoxOffset.vue"]]);
const _sfc_main$c = /* @__PURE__ */ defineComponent({
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
    const emit2 = __emit;
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
    const __returned__ = { props, emit: emit2, id, value, updateValue, buttonColor };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$c = { class: "btn-group" };
const _hoisted_2$b = ["id", "name", "value", "checked"];
const _hoisted_3$a = ["for", "onChange"];
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$c, [
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
        }, null, 8, _hoisted_2$b), [
          [vModelRadio, $setup.value]
        ]),
        createElementVNode("label", {
          class: normalizeClass(["btn", [$setup.buttonColor(option), `btn-${$setup.props.size}`]]),
          for: $setup.id + "__" + option.value,
          onChange: ($event) => $setup.updateValue(option)
        }, toDisplayString(option.text || option.value), 43, _hoisted_3$a)
      ], 64);
    }), 128))
  ]);
}
const ButtonRadio = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__file", "ButtonRadio.vue"]]);
const trimLeft = /^\s+/;
const trimRight = /\s+$/;
function tinycolor(color, opts) {
  color = color ? color : "";
  opts = opts || {};
  if (color instanceof tinycolor) {
    return color;
  }
  if (!(this instanceof tinycolor)) {
    return new tinycolor(color, opts);
  }
  var rgb = inputToRGB(color);
  this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = Math.round(100 * this._a) / 100, this._format = opts.format || rgb.format;
  this._gradientType = opts.gradientType;
  if (this._r < 1) this._r = Math.round(this._r);
  if (this._g < 1) this._g = Math.round(this._g);
  if (this._b < 1) this._b = Math.round(this._b);
  this._ok = rgb.ok;
}
tinycolor.prototype = {
  isDark: function() {
    return this.getBrightness() < 128;
  },
  isLight: function() {
    return !this.isDark();
  },
  isValid: function() {
    return this._ok;
  },
  getOriginalInput: function() {
    return this._originalInput;
  },
  getFormat: function() {
    return this._format;
  },
  getAlpha: function() {
    return this._a;
  },
  getBrightness: function() {
    var rgb = this.toRgb();
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
  },
  getLuminance: function() {
    var rgb = this.toRgb();
    var RsRGB, GsRGB, BsRGB, R, G, B;
    RsRGB = rgb.r / 255;
    GsRGB = rgb.g / 255;
    BsRGB = rgb.b / 255;
    if (RsRGB <= 0.03928) R = RsRGB / 12.92;
    else R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    if (GsRGB <= 0.03928) G = GsRGB / 12.92;
    else G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    if (BsRGB <= 0.03928) B = BsRGB / 12.92;
    else B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  },
  setAlpha: function(value) {
    this._a = boundAlpha(value);
    this._roundA = Math.round(100 * this._a) / 100;
    return this;
  },
  toHsv: function() {
    var hsv = rgbToHsv(this._r, this._g, this._b);
    return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
  },
  toHsvString: function() {
    var hsv = rgbToHsv(this._r, this._g, this._b);
    var h = Math.round(hsv.h * 360), s = Math.round(hsv.s * 100), v = Math.round(hsv.v * 100);
    return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
  },
  toHsl: function() {
    var hsl = rgbToHsl(this._r, this._g, this._b);
    return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
  },
  toHslString: function() {
    var hsl = rgbToHsl(this._r, this._g, this._b);
    var h = Math.round(hsl.h * 360), s = Math.round(hsl.s * 100), l = Math.round(hsl.l * 100);
    return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
  },
  toHex: function(allow3Char) {
    return rgbToHex(this._r, this._g, this._b, allow3Char);
  },
  toHexString: function(allow3Char) {
    return "#" + this.toHex(allow3Char);
  },
  toHex8: function(allow4Char) {
    return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
  },
  toHex8String: function(allow4Char) {
    return "#" + this.toHex8(allow4Char);
  },
  toRgb: function() {
    return {
      r: Math.round(this._r),
      g: Math.round(this._g),
      b: Math.round(this._b),
      a: this._a
    };
  },
  toRgbString: function() {
    return this._a == 1 ? "rgb(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ")" : "rgba(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ", " + this._roundA + ")";
  },
  toPercentageRgb: function() {
    return {
      r: Math.round(bound01(this._r, 255) * 100) + "%",
      g: Math.round(bound01(this._g, 255) * 100) + "%",
      b: Math.round(bound01(this._b, 255) * 100) + "%",
      a: this._a
    };
  },
  toPercentageRgbString: function() {
    return this._a == 1 ? "rgb(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%)" : "rgba(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
  },
  toName: function() {
    if (this._a === 0) {
      return "transparent";
    }
    if (this._a < 1) {
      return false;
    }
    return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
  },
  toFilter: function(secondColor) {
    var hex8String = "#" + rgbaToArgbHex(this._r, this._g, this._b, this._a);
    var secondHex8String = hex8String;
    var gradientType = this._gradientType ? "GradientType = 1, " : "";
    if (secondColor) {
      var s = tinycolor(secondColor);
      secondHex8String = "#" + rgbaToArgbHex(s._r, s._g, s._b, s._a);
    }
    return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
  },
  toString: function(format) {
    var formatSet = !!format;
    format = format || this._format;
    var formattedString = false;
    var hasAlpha = this._a < 1 && this._a >= 0;
    var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");
    if (needsAlphaFormat) {
      if (format === "name" && this._a === 0) {
        return this.toName();
      }
      return this.toRgbString();
    }
    if (format === "rgb") {
      formattedString = this.toRgbString();
    }
    if (format === "prgb") {
      formattedString = this.toPercentageRgbString();
    }
    if (format === "hex" || format === "hex6") {
      formattedString = this.toHexString();
    }
    if (format === "hex3") {
      formattedString = this.toHexString(true);
    }
    if (format === "hex4") {
      formattedString = this.toHex8String(true);
    }
    if (format === "hex8") {
      formattedString = this.toHex8String();
    }
    if (format === "name") {
      formattedString = this.toName();
    }
    if (format === "hsl") {
      formattedString = this.toHslString();
    }
    if (format === "hsv") {
      formattedString = this.toHsvString();
    }
    return formattedString || this.toHexString();
  },
  clone: function() {
    return tinycolor(this.toString());
  },
  _applyModification: function(fn, args) {
    var color = fn.apply(null, [this].concat([].slice.call(args)));
    this._r = color._r;
    this._g = color._g;
    this._b = color._b;
    this.setAlpha(color._a);
    return this;
  },
  lighten: function() {
    return this._applyModification(lighten, arguments);
  },
  brighten: function() {
    return this._applyModification(brighten, arguments);
  },
  darken: function() {
    return this._applyModification(darken, arguments);
  },
  desaturate: function() {
    return this._applyModification(desaturate, arguments);
  },
  saturate: function() {
    return this._applyModification(saturate, arguments);
  },
  greyscale: function() {
    return this._applyModification(greyscale, arguments);
  },
  spin: function() {
    return this._applyModification(spin, arguments);
  },
  _applyCombination: function(fn, args) {
    return fn.apply(null, [this].concat([].slice.call(args)));
  },
  analogous: function() {
    return this._applyCombination(analogous, arguments);
  },
  complement: function() {
    return this._applyCombination(complement, arguments);
  },
  monochromatic: function() {
    return this._applyCombination(monochromatic, arguments);
  },
  splitcomplement: function() {
    return this._applyCombination(splitcomplement, arguments);
  },
  // Disabled until https://github.com/bgrins/TinyColor/issues/254
  // polyad: function (number) {
  //   return this._applyCombination(polyad, [number]);
  // },
  triad: function() {
    return this._applyCombination(polyad, [3]);
  },
  tetrad: function() {
    return this._applyCombination(polyad, [4]);
  }
};
tinycolor.fromRatio = function(color, opts) {
  if (typeof color == "object") {
    var newColor = {};
    for (var i in color) {
      if (color.hasOwnProperty(i)) {
        if (i === "a") {
          newColor[i] = color[i];
        } else {
          newColor[i] = convertToPercentage(color[i]);
        }
      }
    }
    color = newColor;
  }
  return tinycolor(color, opts);
};
function inputToRGB(color) {
  var rgb = { r: 0, g: 0, b: 0 };
  var a = 1;
  var s = null;
  var v = null;
  var l = null;
  var ok = false;
  var format = false;
  if (typeof color == "string") {
    color = stringInputToObject(color);
  }
  if (typeof color == "object") {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s);
      v = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s, v);
      ok = true;
      format = "hsv";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s = convertToPercentage(color.s);
      l = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, s, l);
      ok = true;
      format = "hsl";
    }
    if (color.hasOwnProperty("a")) {
      a = color.a;
    }
  }
  a = boundAlpha(a);
  return {
    ok,
    format: color.format || format,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a
  };
}
function rgbToRgb(r, g, b) {
  return {
    r: bound01(r, 255) * 255,
    g: bound01(g, 255) * 255,
    b: bound01(b, 255) * 255
  };
}
function rgbToHsl(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;
  if (max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h, s, l };
}
function hslToRgb(h, s, l) {
  var r, g, b;
  h = bound01(h, 360);
  s = bound01(s, 100);
  l = bound01(l, 100);
  function hue2rgb(p2, q2, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p2 + (q2 - p2) * 6 * t;
    if (t < 1 / 2) return q2;
    if (t < 2 / 3) return p2 + (q2 - p2) * (2 / 3 - t) * 6;
    return p2;
  }
  if (s === 0) {
    r = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
}
function rgbToHsv(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, v = max;
  var d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max == min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h, s, v };
}
function hsvToRgb(h, s, v) {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);
  var i = Math.floor(h), f = h - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s), mod = i % 6, r = [v, q, p, p, t, v][mod], g = [t, v, v, q, p, p][mod], b = [p, p, t, v, v, q][mod];
  return { r: r * 255, g: g * 255, b: b * 255 };
}
function rgbToHex(r, g, b, allow3Char) {
  var hex = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16))
  ];
  if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join("");
}
function rgbaToHex(r, g, b, a, allow4Char) {
  var hex = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16)),
    pad2(convertDecimalToHex(a))
  ];
  if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
  }
  return hex.join("");
}
function rgbaToArgbHex(r, g, b, a) {
  var hex = [
    pad2(convertDecimalToHex(a)),
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16))
  ];
  return hex.join("");
}
tinycolor.equals = function(color1, color2) {
  if (!color1 || !color2) return false;
  return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};
tinycolor.random = function() {
  return tinycolor.fromRatio({
    r: Math.random(),
    g: Math.random(),
    b: Math.random()
  });
};
function desaturate(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.s -= amount / 100;
  hsl.s = clamp01(hsl.s);
  return tinycolor(hsl);
}
function saturate(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.s += amount / 100;
  hsl.s = clamp01(hsl.s);
  return tinycolor(hsl);
}
function greyscale(color) {
  return tinycolor(color).desaturate(100);
}
function lighten(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.l += amount / 100;
  hsl.l = clamp01(hsl.l);
  return tinycolor(hsl);
}
function brighten(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var rgb = tinycolor(color).toRgb();
  rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
  rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
  rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
  return tinycolor(rgb);
}
function darken(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.l -= amount / 100;
  hsl.l = clamp01(hsl.l);
  return tinycolor(hsl);
}
function spin(color, amount) {
  var hsl = tinycolor(color).toHsl();
  var hue = (hsl.h + amount) % 360;
  hsl.h = hue < 0 ? 360 + hue : hue;
  return tinycolor(hsl);
}
function complement(color) {
  var hsl = tinycolor(color).toHsl();
  hsl.h = (hsl.h + 180) % 360;
  return tinycolor(hsl);
}
function polyad(color, number) {
  if (isNaN(number) || number <= 0) {
    throw new Error("Argument to polyad must be a positive number");
  }
  var hsl = tinycolor(color).toHsl();
  var result = [tinycolor(color)];
  var step = 360 / number;
  for (var i = 1; i < number; i++) {
    result.push(tinycolor({ h: (hsl.h + i * step) % 360, s: hsl.s, l: hsl.l }));
  }
  return result;
}
function splitcomplement(color) {
  var hsl = tinycolor(color).toHsl();
  var h = hsl.h;
  return [
    tinycolor(color),
    tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
    tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })
  ];
}
function analogous(color, results, slices) {
  results = results || 6;
  slices = slices || 30;
  var hsl = tinycolor(color).toHsl();
  var part = 360 / slices;
  var ret = [tinycolor(color)];
  for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
    hsl.h = (hsl.h + part) % 360;
    ret.push(tinycolor(hsl));
  }
  return ret;
}
function monochromatic(color, results) {
  results = results || 6;
  var hsv = tinycolor(color).toHsv();
  var h = hsv.h, s = hsv.s, v = hsv.v;
  var ret = [];
  var modification = 1 / results;
  while (results--) {
    ret.push(tinycolor({ h, s, v }));
    v = (v + modification) % 1;
  }
  return ret;
}
tinycolor.mix = function(color1, color2, amount) {
  amount = amount === 0 ? 0 : amount || 50;
  var rgb1 = tinycolor(color1).toRgb();
  var rgb2 = tinycolor(color2).toRgb();
  var p = amount / 100;
  var rgba = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b,
    a: (rgb2.a - rgb1.a) * p + rgb1.a
  };
  return tinycolor(rgba);
};
tinycolor.readability = function(color1, color2) {
  var c1 = tinycolor(color1);
  var c2 = tinycolor(color2);
  return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
};
tinycolor.isReadable = function(color1, color2, wcag2) {
  var readability = tinycolor.readability(color1, color2);
  var wcag2Parms, out;
  out = false;
  wcag2Parms = validateWCAG2Parms(wcag2);
  switch (wcag2Parms.level + wcag2Parms.size) {
    case "AAsmall":
    case "AAAlarge":
      out = readability >= 4.5;
      break;
    case "AAlarge":
      out = readability >= 3;
      break;
    case "AAAsmall":
      out = readability >= 7;
      break;
  }
  return out;
};
tinycolor.mostReadable = function(baseColor, colorList, args) {
  var bestColor = null;
  var bestScore = 0;
  var readability;
  var includeFallbackColors, level, size;
  args = args || {};
  includeFallbackColors = args.includeFallbackColors;
  level = args.level;
  size = args.size;
  for (var i = 0; i < colorList.length; i++) {
    readability = tinycolor.readability(baseColor, colorList[i]);
    if (readability > bestScore) {
      bestScore = readability;
      bestColor = tinycolor(colorList[i]);
    }
  }
  if (tinycolor.isReadable(baseColor, bestColor, {
    level,
    size
  }) || !includeFallbackColors) {
    return bestColor;
  } else {
    args.includeFallbackColors = false;
    return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
  }
};
var names = tinycolor.names = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "0ff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "00f",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  burntsienna: "ea7e5d",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "0ff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "f0f",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "663399",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};
var hexNames = tinycolor.hexNames = flip(names);
function flip(o) {
  var flipped = {};
  for (var i in o) {
    if (o.hasOwnProperty(i)) {
      flipped[o[i]] = i;
    }
  }
  return flipped;
}
function boundAlpha(a) {
  a = parseFloat(a);
  if (isNaN(a) || a < 0 || a > 1) {
    a = 1;
  }
  return a;
}
function bound01(n, max) {
  if (isOnePointZero(n)) n = "100%";
  var processPercent = isPercentage(n);
  n = Math.min(max, Math.max(0, parseFloat(n)));
  if (processPercent) {
    n = parseInt(n * max, 10) / 100;
  }
  if (Math.abs(n - max) < 1e-6) {
    return 1;
  }
  return n % max / parseFloat(max);
}
function clamp01(val) {
  return Math.min(1, Math.max(0, val));
}
function parseIntFromHex(val) {
  return parseInt(val, 16);
}
function isOnePointZero(n) {
  return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1;
}
function isPercentage(n) {
  return typeof n === "string" && n.indexOf("%") != -1;
}
function pad2(c) {
  return c.length == 1 ? "0" + c : "" + c;
}
function convertToPercentage(n) {
  if (n <= 1) {
    n = n * 100 + "%";
  }
  return n;
}
function convertDecimalToHex(d) {
  return Math.round(parseFloat(d) * 255).toString(16);
}
function convertHexToDecimal(h) {
  return parseIntFromHex(h) / 255;
}
var matchers = (function() {
  var CSS_INTEGER = "[-\\+]?\\d+%?";
  var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
  var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
  var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  return {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
    rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
    hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
    hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
    hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
    hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
})();
function isValidCSSUnit(color) {
  return !!matchers.CSS_UNIT.exec(color);
}
function stringInputToObject(color) {
  color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
  var named = false;
  if (names[color]) {
    color = names[color];
    named = true;
  } else if (color == "transparent") {
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  }
  var match;
  if (match = matchers.rgb.exec(color)) {
    return { r: match[1], g: match[2], b: match[3] };
  }
  if (match = matchers.rgba.exec(color)) {
    return { r: match[1], g: match[2], b: match[3], a: match[4] };
  }
  if (match = matchers.hsl.exec(color)) {
    return { h: match[1], s: match[2], l: match[3] };
  }
  if (match = matchers.hsla.exec(color)) {
    return { h: match[1], s: match[2], l: match[3], a: match[4] };
  }
  if (match = matchers.hsv.exec(color)) {
    return { h: match[1], s: match[2], v: match[3] };
  }
  if (match = matchers.hsva.exec(color)) {
    return { h: match[1], s: match[2], v: match[3], a: match[4] };
  }
  if (match = matchers.hex8.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: named ? "name" : "hex8"
    };
  }
  if (match = matchers.hex6.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: named ? "name" : "hex"
    };
  }
  if (match = matchers.hex4.exec(color)) {
    return {
      r: parseIntFromHex(match[1] + "" + match[1]),
      g: parseIntFromHex(match[2] + "" + match[2]),
      b: parseIntFromHex(match[3] + "" + match[3]),
      a: convertHexToDecimal(match[4] + "" + match[4]),
      format: named ? "name" : "hex8"
    };
  }
  if (match = matchers.hex3.exec(color)) {
    return {
      r: parseIntFromHex(match[1] + "" + match[1]),
      g: parseIntFromHex(match[2] + "" + match[2]),
      b: parseIntFromHex(match[3] + "" + match[3]),
      format: named ? "name" : "hex"
    };
  }
  return false;
}
function validateWCAG2Parms(parms) {
  var level, size;
  parms = parms || { level: "AA", size: "small" };
  level = (parms.level || "AA").toUpperCase();
  size = (parms.size || "small").toLowerCase();
  if (level !== "AA" && level !== "AAA") {
    level = "AA";
  }
  if (size !== "small" && size !== "large") {
    size = "small";
  }
  return { level, size };
}
function insertAfter(existingNode, newNode) {
  var _a;
  (_a = existingNode.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(newNode, existingNode.nextSibling);
  return existingNode;
}
function wrap(ele, wrapper) {
  ele.replaceWith(wrapper);
  wrapper.appendChild(ele);
  return ele;
}
function outerWidthWithMargin(ele) {
  const style = window.getComputedStyle(ele);
  return ele.getBoundingClientRect().width + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
}
function html(html2, doc = document) {
  const div = doc.createElement("div");
  div.innerHTML = html2;
  return div.children[0];
}
function throttle(func, wait, debounce = void 0) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const throttler = function() {
      timeout = null;
      func.apply(context, args);
    };
    if (debounce)
      clearTimeout(timeout);
    if (debounce || !timeout) {
      timeout = setTimeout(throttler, wait);
    }
  };
}
function addClass(ele, className) {
  const classes = className.split(" ").filter((c) => c !== "");
  if (className !== "" && classes.length) {
    ele.classList.add(...classes);
  }
  return ele;
}
function removeClass(ele, className) {
  const classes = className.split(" ").filter((c) => c !== "");
  if (className !== "" && classes.length) {
    ele.classList.remove(...classes);
  }
  return ele;
}
function toggleClass(ele, className, state = void 0) {
  if (state != void 0) {
    ele.classList.toggle(className, state);
  } else if (state === true) {
    addClass(ele, className);
  } else {
    removeClass(ele, className);
  }
  return ele;
}
function emit(ele, eventName, detail = {}) {
  const event = new CustomEvent(eventName, {
    cancelable: true,
    bubbles: true,
    detail
  });
  ele.dispatchEvent(event);
  return event;
}
function eventDelegate(ele, eventName, selector, listener, payload = {}) {
  ele.addEventListener(eventName, (e) => {
    if (e.target.closest(selector)) {
      e.data = Object.assign({}, e.data || {}, payload);
      listener(e);
    }
  }, payload);
}
function setElementOffset(elem, options) {
  let curPosition;
  let curTop;
  let curLeft;
  let calculatePosition;
  let position = elem.style.position;
  let curElem = elem;
  let props = {};
  if (position === "static") {
    elem.style.position = "relative";
  }
  let curOffset = getElementOffset(curElem);
  let curCSSTop = elem.style.top;
  let curCSSLeft = elem.style.left;
  calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
  if (calculatePosition) {
    curPosition = getElementPosition(curElem);
    curTop = curPosition.top;
    curLeft = curPosition.left;
  } else {
    curTop = parseFloat(curCSSTop) || 0;
    curLeft = parseFloat(curCSSLeft) || 0;
  }
  if (options.top != null) {
    props.top = options.top - curOffset.top + curTop;
  }
  if (options.left != null) {
    props.left = options.left - curOffset.left + curLeft;
  }
  if ("using" in options) {
    options.using.call(elem, props);
  } else {
    for (const k in props) {
      curElem.style.setProperty(k, props[k] + "px");
    }
  }
}
function getElementOffset(el) {
  const box = el.getBoundingClientRect();
  const docElem = document.documentElement;
  return {
    top: box.top + window.pageYOffset - docElem.clientTop,
    left: box.left + window.pageXOffset - docElem.clientLeft
  };
}
function getElementPosition(el) {
  const { top, left } = el.getBoundingClientRect();
  const { marginTop, marginLeft } = getComputedStyle(el);
  return {
    top: top - parseInt(marginTop, 10),
    left: left - parseInt(marginLeft, 10)
  };
}
/**
 * spectrum-vanilla.js
 *
 * @copyright  Copyright (C) 2023.
 * @license    MIT
 */
const defaultOpts = {
  // Callbacks
  beforeShow: noop,
  move: noop,
  change: noop,
  show: noop,
  hide: noop,
  // Options
  color: "",
  type: "component",
  showInput: false,
  allowEmpty: true,
  showButtons: true,
  clickoutFiresChange: true,
  showInitial: false,
  showPalette: true,
  showPaletteOnly: false,
  hideAfterPaletteSelect: false,
  togglePaletteOnly: false,
  showSelectionPalette: true,
  localStorageKey: "",
  appendTo: "body",
  maxSelectionSize: 8,
  locale: "en",
  cancelText: "cancel",
  chooseText: "choose",
  togglePaletteMoreText: "more",
  togglePaletteLessText: "less",
  clearText: "Clear Color Selection",
  noColorSelectedText: "No Color Selected",
  preferredFormat: "name",
  containerClassName: "",
  replacerClassName: "",
  showAlpha: true,
  theme: "sp-light",
  palette: [
    ["#000000", "#444444", "#5b5b5b", "#999999", "#bcbcbc", "#eeeeee", "#f3f6f4", "#ffffff"],
    ["#f44336", "#744700", "#ce7e00", "#8fce00", "#2986cc", "#16537e", "#6a329f", "#c90076"],
    ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
    ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
    ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
    ["#cc0000", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
    ["#990000", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
    ["#660000", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
  ],
  selectionPalette: [],
  disabled: false,
  offset: null
}, spectrums = [], replaceInput = html([
  "<div class='sp-replacer'>",
  "<div class='sp-preview'><div class='sp-preview-inner'></div></div>",
  "<div class='sp-dd'>&#9660;</div>",
  "</div>"
].join("")), markup = (function() {
  return [
    "<div class='sp-container sp-hidden'>",
    "<div class='sp-palette-container'>",
    "<div class='sp-palette sp-thumb sp-cf'></div>",
    "<div class='sp-palette-button-container sp-cf'>",
    "<button type='button' class='sp-palette-toggle'></button>",
    "</div>",
    "</div>",
    "<div class='sp-picker-container'>",
    "<div class='sp-top sp-cf'>",
    "<div class='sp-fill'></div>",
    "<div class='sp-top-inner'>",
    "<div class='sp-color'>",
    "<div class='sp-sat'>",
    "<div class='sp-val'>",
    "<div class='sp-dragger'></div>",
    "</div>",
    "</div>",
    "</div>",
    "<div class='sp-clear sp-clear-display'>",
    "</div>",
    "<div class='sp-hue'>",
    "<div class='sp-slider'></div>",
    "</div>",
    "</div>",
    "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>",
    "</div>",
    "<div class='sp-input-container sp-cf'>",
    "<input class='sp-input' type='text' spellcheck='false'  />",
    "</div>",
    "<div class='sp-initial sp-thumb sp-cf'></div>",
    "<div class='sp-button-container sp-cf'>",
    "<button class='sp-cancel' href='#'></button>",
    "<button type='button' class='sp-choose'></button>",
    "</div>",
    "</div>",
    "</div>"
  ].join("");
})();
function paletteTemplate(p, color, className, opts) {
  const html2 = [];
  for (let i = 0; i < p.length; i++) {
    const current = p[i];
    if (current) {
      const tiny = tinycolor(current);
      let c = tiny.toHsl().l < 0.5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
      c += tinycolor.equals(color, current) ? " sp-thumb-active" : "";
      const formattedString = tiny.toString(opts.preferredFormat || "rgb");
      const swatchStyle = "background-color:" + tiny.toRgbString();
      html2.push('<span title="' + formattedString + '" data-color="' + tiny.toRgbString() + '" class="' + c + '"><span class="sp-thumb-inner" style="' + swatchStyle + ';"></span></span>');
    } else {
      html2.push('<span class="sp-thumb-el sp-clear-display" ><span class="sp-clear-palette-only" style="background-color: transparent;"></span></span>');
    }
  }
  return "<div class='sp-cf " + className + "'>" + html2.join("") + "</div>";
}
function hideAll() {
  for (let i = 0; i < spectrums.length; i++) {
    if (spectrums[i]) {
      spectrums[i].hide();
    }
  }
}
function instanceOptions(options, element) {
  options = Object.assign({}, options);
  options.locale = options.locale || window.navigator.language;
  if (typeof options.locale === "string") {
    if (options.locale) {
      let parts = options.locale.split("-").map((p) => p.toLowerCase());
      if (parts[0] === parts[1]) {
        parts = [parts[0]];
      }
      options.locale = parts.join("-");
    }
    if (options.locale !== "en" && Spectrum.localization[options.locale]) {
      options = Object.assign({}, options, Spectrum.localization[options.locale]);
    }
  } else {
    options = Object.assign({}, options, options.locale);
  }
  const opts = Object.assign({}, defaultOpts, element.dataset, options);
  opts.callbacks = {
    "move": bind(opts.move, element),
    "change": bind(opts.change, element),
    "show": bind(opts.show, element),
    "hide": bind(opts.hide, element),
    "beforeShow": bind(opts.beforeShow, element)
  };
  return opts;
}
function spectrum(element, options) {
  let opts = instanceOptions(options, element), type = opts.type, flat = type === "flat", showSelectionPalette = opts.showSelectionPalette, localStorageKey = opts.localStorageKey, theme = opts.theme, callbacks = opts.callbacks, resize = throttle(reflow, 10), visible = false, isDragging = false, dragWidth = 0, dragHeight = 0, dragHelperHeight = 0, slideHeight = 0, alphaWidth = 0, alphaSlideHelperWidth = 0, slideHelperHeight = 0, currentHue = 0, currentSaturation = 0, currentValue = 0, currentAlpha = 1, palette = [], paletteArray = [], paletteLookup = {}, selectionPalette = opts.selectionPalette.slice(0), maxSelectionSize = opts.maxSelectionSize, draggingClass = "sp-dragging", abortNextInputChange = false, shiftMovementDirection = null;
  const doc = element.ownerDocument;
  const container = html(markup, doc);
  container.classList.add(theme);
  doc.body.appendChild(container);
  doc.body;
  let boundElement = element, disabled = false, pickerContainer = container.querySelector(".sp-picker-container"), dragger = container.querySelector(".sp-color"), dragHelper = container.querySelector(".sp-dragger"), slider = container.querySelector(".sp-hue"), slideHelper = container.querySelector(".sp-slider"), alphaSliderInner = container.querySelector(".sp-alpha-inner"), alphaSlider = container.querySelector(".sp-alpha"), alphaSlideHelper = container.querySelector(".sp-alpha-handle"), textInput = container.querySelector(".sp-input"), paletteContainer = container.querySelector(".sp-palette"), initialColorContainer = container.querySelector(".sp-initial"), cancelButton = container.querySelector(".sp-cancel"), clearButton = container.querySelector(".sp-clear"), chooseButton = container.querySelector(".sp-choose"), toggleButton = container.querySelector(".sp-palette-toggle"), isInput = boundElement.nodeName === "INPUT", isInputTypeColor = isInput && boundElement.getAttribute("type") === "color", shouldReplace = isInput && (type === "color" || isInputTypeColor), replacer = shouldReplace ? (() => {
    const el = replaceInput.cloneNode(true);
    addClass(el, theme);
    addClass(el, opts.replacerClassName);
    return el;
  })() : null, offsetElement = shouldReplace ? replacer : boundElement, previewElement = replacer === null || replacer === void 0 ? void 0 : replacer.querySelector(".sp-preview-inner"), initialColor = opts.color || isInput && boundElement.value, colorOnShow = "", currentPreferredFormat = opts.preferredFormat, clickoutFiresChange = !opts.showButtons || opts.clickoutFiresChange, isEmpty = !initialColor, allowEmpty = opts.allowEmpty;
  let originalInputContainer;
  let colorizeElement;
  let colorizeElementInitialColor;
  let colorizeElementInitialBackground;
  const thisId = boundElement.getAttribute("id") || "";
  if (thisId !== void 0 && thisId.length > 0) {
    const labels = document.querySelectorAll(`label[for="${thisId}"]`);
    labels.forEach((label) => {
      label.addEventListener("click", function(e) {
        e.preventDefault();
        show();
        return false;
      });
    });
  }
  function applyOptions() {
    if (opts.showPaletteOnly) {
      opts.showPalette = true;
    }
    if (toggleButton) {
      toggleButton.textContent = opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText;
    }
    if (opts.palette) {
      palette = opts.palette.slice(0);
      paletteArray = Array.isArray(palette[0]) ? palette : [palette];
      paletteLookup = {};
      for (let i = 0; i < paletteArray.length; i++) {
        for (let j = 0; j < paletteArray[i].length; j++) {
          const rgb = tinycolor(paletteArray[i][j]).toRgbString();
          paletteLookup[rgb] = true;
        }
      }
      if (opts.showPaletteOnly && !initialColor) {
        initialColor = palette[0][0] === "" ? palette[0][0] : Object.keys(paletteLookup)[0];
      }
    }
    toggleClass(container, "sp-flat", flat);
    toggleClass(container, "sp-input-disabled", !opts.showInput);
    toggleClass(container, "sp-alpha-enabled", opts.showAlpha);
    toggleClass(container, "sp-clear-enabled", allowEmpty);
    toggleClass(container, "sp-buttons-disabled", !opts.showButtons);
    toggleClass(container, "sp-palette-buttons-disabled", !opts.togglePaletteOnly);
    toggleClass(container, "sp-palette-disabled", !opts.showPalette);
    toggleClass(container, "sp-palette-only", opts.showPaletteOnly);
    toggleClass(container, "sp-initial-disabled", !opts.showInitial);
    addClass(container, opts.containerClassName);
    reflow();
  }
  function offsetElementStart(e) {
    if (!disabled) {
      show();
    }
    e.stopPropagation();
    const target = e.target;
    if (!target.matches("input")) {
      e.preventDefault();
    }
  }
  function initialize() {
    var _a;
    applyOptions();
    const inputStyle = window.getComputedStyle(boundElement);
    originalInputContainer = html('<span class="sp-original-input-container"></span>');
    ["margin"].forEach((cssProp) => {
      originalInputContainer.style;
      originalInputContainer.style.setProperty(cssProp, inputStyle.getPropertyValue(cssProp));
    });
    if (inputStyle.display === "block") {
      originalInputContainer.style.display = "flex";
    }
    boundElement.style.display = "";
    if (shouldReplace) {
      insertAfter(boundElement, replacer);
      boundElement.style.display = "none";
    } else if (type === "text") {
      addClass(originalInputContainer, "sp-colorize-container");
      addClass(boundElement, "spectrum sp-colorize");
      wrap(boundElement, originalInputContainer);
    } else if (type === "component") {
      addClass(boundElement, "spectrum");
      wrap(boundElement, originalInputContainer);
      const addOn = html([
        "<div class='sp-colorize-container sp-add-on'>",
        "<div class='sp-colorize'></div> ",
        "</div>"
      ].join(""));
      addOn.style.width = boundElement.offsetHeight + "px";
      addOn.style.borderRadius = inputStyle.borderRadius;
      addOn.style.border = inputStyle.border;
      boundElement.classList.add("with-add-on");
      boundElement.before(addOn);
    }
    colorizeElement = (_a = boundElement.parentNode) === null || _a === void 0 ? void 0 : _a.querySelector(".sp-colorize");
    colorizeElementInitialColor = (colorizeElement === null || colorizeElement === void 0 ? void 0 : colorizeElement.style.color) || "";
    colorizeElementInitialBackground = (colorizeElement === null || colorizeElement === void 0 ? void 0 : colorizeElement.style.backgroundColor) || "";
    if (!allowEmpty) {
      clearButton.style.display = "none";
    }
    if (flat) {
      boundElement.after(container);
      boundElement.style.display = "none";
    } else {
      let appendTo = opts.appendTo === "parent" ? boundElement.parentElement : opts.appendTo;
      if (!appendTo) {
        appendTo = document.body;
      }
      if (typeof appendTo !== "string") {
        appendTo.append(container);
      }
    }
    updateSelectionPaletteFromStorage();
    offsetElement === null || offsetElement === void 0 ? void 0 : offsetElement.addEventListener("click", offsetElementStart);
    offsetElement === null || offsetElement === void 0 ? void 0 : offsetElement.addEventListener("touchstart", offsetElementStart);
    if (boundElement.matches(":disabled") || opts.disabled) {
      disable();
    }
    container.addEventListener("click", (e) => e.stopPropagation());
    [textInput, boundElement].forEach(function(input) {
      if (!("value" in input)) {
        return;
      }
      input.addEventListener("change", () => {
        setFromTextInput(input.value);
      });
      input.addEventListener("paste", () => {
        setTimeout(() => {
          setFromTextInput(input.value);
        }, 1);
      });
      input.addEventListener("keydown", (e) => {
        if (e.keyCode === 13) {
          setFromTextInput(input.value);
          if (input === boundElement) {
            hide();
          }
        }
      });
    });
    cancelButton.textContent = opts.cancelText;
    cancelButton.addEventListener("click", function(e) {
      e.stopPropagation();
      e.preventDefault();
      revert();
      hide();
    });
    clearButton.setAttribute("title", opts.clearText);
    clearButton.addEventListener("click", function(e) {
      e.stopPropagation();
      e.preventDefault();
      isEmpty = true;
      move();
      if (flat) {
        updateOriginalInput(true);
      }
    });
    chooseButton.textContent = opts.chooseText;
    chooseButton.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (isValid()) {
        updateOriginalInput(true);
        hide();
      }
    });
    toggleButton.textContent = opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText;
    toggleButton.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      opts.showPaletteOnly = !opts.showPaletteOnly;
      if (!opts.showPaletteOnly && !flat) {
        container.style.left = "-=" + (outerWidthWithMargin(pickerContainer) + 5);
      }
      applyOptions();
    });
    draggable(alphaSlider, function(dragX, dragY, e) {
      currentAlpha = dragX / alphaWidth;
      isEmpty = false;
      if (e.shiftKey) {
        currentAlpha = Math.round(currentAlpha * 10) / 10;
      }
      move();
    }, dragStart, dragStop);
    draggable(slider, function(dragX, dragY) {
      currentHue = dragY / slideHeight;
      isEmpty = false;
      if (!opts.showAlpha) {
        currentAlpha = 1;
      }
      move();
    }, dragStart, dragStop);
    draggable(dragger, function(dragX, dragY, e) {
      if (!e.shiftKey) {
        shiftMovementDirection = null;
      } else if (!shiftMovementDirection) {
        const oldDragX = currentSaturation * dragWidth;
        const oldDragY = dragHeight - currentValue * dragHeight;
        const furtherFromX = Math.abs(dragX - oldDragX) > Math.abs(dragY - oldDragY);
        shiftMovementDirection = furtherFromX ? "x" : "y";
      }
      const setSaturation = !shiftMovementDirection || shiftMovementDirection === "x";
      const setValue = !shiftMovementDirection || shiftMovementDirection === "y";
      if (setSaturation) {
        currentSaturation = dragX / dragWidth;
      }
      if (setValue) {
        currentValue = (dragHeight - dragY) / dragHeight;
      }
      isEmpty = false;
      if (!opts.showAlpha) {
        currentAlpha = 1;
      }
      move();
    }, dragStart, dragStop);
    if (!!initialColor) {
      set(initialColor);
      updateUI();
      currentPreferredFormat = tinycolor(initialColor).getFormat() || opts.preferredFormat;
      addColorToSelectionPalette(initialColor);
    } else if (initialColor === "") {
      set(initialColor);
      updateUI();
    } else {
      updateUI();
    }
    if (flat) {
      show();
    }
    function paletteElementClick(e) {
      var _a2, _b;
      if (e.data && e.data.ignore) {
        const el = e.target.closest(".sp-thumb-el");
        set(((_a2 = el === null || el === void 0 ? void 0 : el.dataset) === null || _a2 === void 0 ? void 0 : _a2.color) || "");
        move();
      } else {
        const el = e.target.closest(".sp-thumb-el");
        set(((_b = el === null || el === void 0 ? void 0 : el.dataset) === null || _b === void 0 ? void 0 : _b.color) || "");
        move();
        if (opts.hideAfterPaletteSelect) {
          updateOriginalInput(true);
          hide();
        } else {
          updateOriginalInput();
        }
      }
      return false;
    }
    const paletteEvents = ["click", "touchstart"];
    for (const paletteEvent of paletteEvents) {
      eventDelegate(paletteContainer, paletteEvent, ".sp-thumb-el", paletteElementClick);
      eventDelegate(initialColorContainer, paletteEvent, ".sp-thumb-el:nth-child(1)", paletteElementClick, { ignore: true });
    }
  }
  function updateSelectionPaletteFromStorage() {
    if (localStorageKey) {
      try {
        const localStorage = window.localStorage;
        const oldPalette = localStorage[localStorageKey].split(",#");
        if (oldPalette.length > 1) {
          delete localStorage[localStorageKey];
          for (const c of oldPalette) {
            addColorToSelectionPalette(c);
          }
        }
      } catch (e) {
      }
      try {
        selectionPalette = window.localStorage[localStorageKey].split(";");
      } catch (e) {
      }
    }
  }
  function addColorToSelectionPalette(color) {
    if (showSelectionPalette) {
      const rgb = tinycolor(color).toRgbString();
      if (!paletteLookup[rgb] && !selectionPalette.includes(rgb)) {
        selectionPalette.push(rgb);
        while (selectionPalette.length > maxSelectionSize) {
          selectionPalette.shift();
        }
      }
      if (localStorageKey) {
        try {
          window.localStorage[localStorageKey] = selectionPalette.join(";");
        } catch (e) {
        }
      }
    }
  }
  function getUniqueSelectionPalette() {
    var unique = [];
    if (opts.showPalette) {
      for (var i = 0; i < selectionPalette.length; i++) {
        var rgb = tinycolor(selectionPalette[i]).toRgbString();
        if (!paletteLookup[rgb]) {
          unique.push(selectionPalette[i]);
        }
      }
    }
    return unique.reverse().slice(0, opts.maxSelectionSize);
  }
  function drawPalette() {
    const currentColor = get();
    const html2 = paletteArray.map((palette2, i) => {
      return paletteTemplate(palette2, currentColor, "sp-palette-row sp-palette-row-" + i, opts);
    });
    updateSelectionPaletteFromStorage();
    if (selectionPalette) {
      html2.push(paletteTemplate(getUniqueSelectionPalette(), currentColor, "sp-palette-row sp-palette-row-selection", opts));
    }
    paletteContainer.innerHTML = html2.join("");
  }
  function drawInitial() {
    if (opts.showInitial) {
      const initial = colorOnShow;
      const current = get();
      initialColorContainer.innerHTML = paletteTemplate([initial, current], current, "sp-palette-row-initial", opts);
    }
  }
  function dragStart() {
    if (dragHeight <= 0 || dragWidth <= 0 || slideHeight <= 0) {
      reflow();
    }
    isDragging = true;
    addClass(container, draggingClass);
    shiftMovementDirection = null;
    emit(boundElement, "dragstart", { color: get() });
  }
  function dragStop() {
    isDragging = false;
    removeClass(container, draggingClass);
    emit(boundElement, "dragstop", { color: get() });
  }
  function setFromTextInput(value) {
    if (abortNextInputChange) {
      abortNextInputChange = false;
      return;
    }
    if ((value === null || value === "") && allowEmpty) {
      set("");
      move();
      updateOriginalInput();
    } else {
      const tiny = tinycolor(value);
      if (tiny.isValid()) {
        set(tiny);
        move();
        updateOriginalInput();
      } else {
        textInput.classList.add("sp-validation-error");
      }
    }
  }
  function toggle() {
    if (visible) {
      hide();
    } else {
      show();
    }
  }
  function show() {
    if (visible) {
      reflow();
      return;
    }
    const event = emit(boundElement, "beforeShow", { color: get() });
    if (callbacks.beforeShow(event) === false || event.defaultPrevented) {
      return;
    }
    hideAll();
    visible = true;
    doc.addEventListener("keydown", onkeydown);
    doc.addEventListener("click", clickout);
    window.addEventListener("resize", resize);
    replacer === null || replacer === void 0 ? void 0 : replacer.classList.add("sp-active");
    container.classList.remove("sp-hidden");
    reflow();
    updateUI();
    colorOnShow = get();
    drawInitial();
    const e = emit(boundElement, "show", { color: colorOnShow });
    callbacks.show(e);
  }
  function onkeydown(e) {
    if (e.keyCode === 27) {
      hide();
    }
  }
  function clickout(e) {
    if (e.button == 2) {
      return;
    }
    if (isDragging) {
      return;
    }
    if (clickoutFiresChange) {
      updateOriginalInput(true);
    } else {
      revert();
    }
    hide();
  }
  function hide() {
    if (!visible || flat) {
      return;
    }
    visible = false;
    doc.removeEventListener("keydown", onkeydown);
    doc.removeEventListener("click", clickout);
    window.removeEventListener("resize", resize);
    replacer === null || replacer === void 0 ? void 0 : replacer.classList.remove("sp-active");
    container.classList.add("sp-hidden");
    const event = emit(boundElement, "hide", { color: get() });
    callbacks.hide(event);
  }
  function revert() {
    set(colorOnShow, true);
    updateOriginalInput(true);
  }
  function set(color, ignoreFormatChange = false) {
    if (tinycolor.equals(color, get())) {
      updateUI();
      return;
    }
    var newColor, newHsv;
    if ((!color || color === void 0) && allowEmpty) {
      isEmpty = true;
    } else {
      isEmpty = false;
      newColor = tinycolor(color);
      newHsv = newColor.toHsv();
      currentHue = newHsv.h % 360 / 360;
      currentSaturation = newHsv.s;
      currentValue = newHsv.v;
      currentAlpha = newHsv.a;
    }
    updateUI();
    if (newColor && newColor.isValid() && !ignoreFormatChange) {
      currentPreferredFormat = opts.preferredFormat || newColor.getFormat();
    }
  }
  function get(opts2 = {}) {
    if (allowEmpty && isEmpty) {
      return "";
    }
    return tinycolor.fromRatio({
      h: currentHue,
      s: currentSaturation,
      v: currentValue,
      a: Math.round(currentAlpha * 1e3) / 1e3
      // @ts-ignore
    }, { format: opts2.format || currentPreferredFormat });
  }
  function isValid() {
    return !textInput.classList.contains("sp-validation-error");
  }
  function move() {
    updateUI();
    const event = emit(boundElement, "move", { color: get() });
    callbacks.move(event);
  }
  function updateUI() {
    textInput.classList.remove("sp-validation-error");
    updateHelperLocations();
    const flatColor = tinycolor.fromRatio({ h: currentHue, s: 1, v: 1 });
    dragger.style.backgroundColor = flatColor.toHexString();
    let format = currentPreferredFormat;
    if (currentAlpha < 1 && !(currentAlpha === 0 && format === "name")) {
      if (format === "hex" || format === "hex3" || format === "hex6" || format === "name") {
        format = "rgb";
      }
    }
    let realColor = get({ format }), displayColor = "";
    if (previewElement) {
      previewElement.classList.remove("sp-clear-display");
      previewElement.style.backgroundColor = "transparent";
    }
    if (realColor === "") {
      previewElement === null || previewElement === void 0 ? void 0 : previewElement.classList.add("sp-clear-display");
    } else {
      const realHex = realColor.toHexString();
      const realRgb = realColor.toRgbString();
      if (previewElement) {
        if (realColor.getAlpha() === 1) {
          previewElement.style.backgroundColor = realRgb;
        } else {
          previewElement.style.backgroundColor = "transparent";
          previewElement.style.filter = realColor.toFilter();
        }
      }
      if (opts.showAlpha) {
        const rgb = realColor.toRgb();
        rgb.a = 0;
        const realAlpha = tinycolor(rgb).toRgbString();
        alphaSliderInner.style.background = `linear-gradient(to right, ${realAlpha}, ${realHex})`;
      }
      displayColor = realColor.toString(format);
    }
    if (opts.showInput) {
      textInput.value = displayColor;
    }
    boundElement.value = displayColor;
    if (opts.type == "text" || opts.type == "component") {
      const color = realColor;
      if (color && colorizeElement) {
        const textColor = color.isLight() || color.getAlpha() < 0.4 ? "black" : "white";
        colorizeElement.style.backgroundColor = color.toRgbString();
        colorizeElement.style.color = textColor;
      } else if (colorizeElement) {
        colorizeElement.style.backgroundColor = colorizeElementInitialBackground;
        colorizeElement.style.color = colorizeElementInitialColor;
      }
    }
    if (opts.showPalette) {
      drawPalette();
    }
    drawInitial();
  }
  function updateHelperLocations() {
    if (allowEmpty && isEmpty) {
      alphaSlideHelper.style.display = "none";
      slideHelper.style.display = "none";
      dragHelper.style.display = "none";
    } else {
      alphaSlideHelper.style.display = "block";
      slideHelper.style.display = "block";
      dragHelper.style.display = "block";
      let dragX = currentSaturation * dragWidth;
      let dragY = dragHeight - currentValue * dragHeight;
      dragX = Math.max(-dragHelperHeight, Math.min(dragWidth - dragHelperHeight, dragX - dragHelperHeight));
      dragY = Math.max(-dragHelperHeight, Math.min(dragHeight - dragHelperHeight, dragY - dragHelperHeight));
      dragHelper.style.top = dragY + "px";
      dragHelper.style.left = dragX + "px";
      const alphaX = currentAlpha * alphaWidth;
      alphaSlideHelper.style.left = alphaX - alphaSlideHelperWidth / 2 + "px";
      const slideY = currentHue * slideHeight;
      slideHelper.style.top = slideY - slideHelperHeight + "px";
    }
  }
  function updateOriginalInput(fireCallback = false) {
    let color = get(), hasChanged = !tinycolor.equals(color, colorOnShow);
    if (color) {
      color.toString(currentPreferredFormat);
      addColorToSelectionPalette(color);
    }
    if (fireCallback && hasChanged) {
      abortNextInputChange = true;
      const event = emit(boundElement, "change", { color });
      callbacks.change(event);
    }
  }
  function reflow() {
    if (!visible) {
      return;
    }
    dragWidth = dragger.getBoundingClientRect().width;
    dragHeight = dragger.getBoundingClientRect().height;
    dragHelperHeight = dragHelper.getBoundingClientRect().height;
    slider.getBoundingClientRect().width;
    slideHeight = slider.getBoundingClientRect().height;
    slideHelperHeight = slideHelper.getBoundingClientRect().height;
    alphaWidth = alphaSlider.getBoundingClientRect().width;
    alphaSlideHelperWidth = alphaSlideHelper.getBoundingClientRect().width;
    if (!flat) {
      container.style.position = "absolute";
      if (opts.offset) {
        setElementOffset(container, opts.offset);
      } else {
        setElementOffset(container, getOffset(container, offsetElement));
      }
    }
    updateHelperLocations();
    if (opts.showPalette) {
      drawPalette();
    }
    emit(boundElement, "reflow");
  }
  function destroy() {
    boundElement.style.display = "";
    boundElement.classList.remove("spectrum", "with-add-on", "sp-colorize");
    offsetElement.removeEventListener("click", offsetElementStart);
    offsetElement.removeEventListener("touchstart", offsetElementStart);
    container.remove();
    replacer === null || replacer === void 0 ? void 0 : replacer.remove();
    if (colorizeElement) {
      colorizeElement.style.backgroundColor = colorizeElementInitialBackground;
      colorizeElement.style.color = colorizeElementInitialColor;
    }
    const originalInputContainer2 = boundElement.closest(".sp-original-input-container");
    if (originalInputContainer2) {
      originalInputContainer2.after(boundElement);
      originalInputContainer2.remove();
    }
    spectrums[spect.id] = null;
  }
  function option(optionName = void 0, optionValue = void 0) {
    if (optionName === void 0) {
      return Object.assign({}, opts);
    }
    if (optionValue === void 0) {
      return opts[optionName];
    }
    opts[optionName] = optionValue;
    if (optionName === "preferredFormat") {
      currentPreferredFormat = opts.preferredFormat;
    }
    applyOptions();
  }
  function enable() {
    disabled = false;
    boundElement.disabled = false;
    offsetElement.classList.remove("sp-disabled");
  }
  function disable() {
    hide();
    disabled = true;
    boundElement.disabled = true;
    offsetElement.classList.add("sp-disabled");
  }
  function setOffset(coord) {
    opts.offset = coord;
    reflow();
  }
  initialize();
  let spect = {
    id: 0,
    show,
    hide,
    toggle,
    reflow,
    option,
    enable,
    disable,
    offset: setOffset,
    set: function(c) {
      set(c);
      updateOriginalInput();
    },
    get,
    destroy,
    container
  };
  spect.id = spectrums.push(spect) - 1;
  return spect;
}
function getOffset(picker, input) {
  const extraY = 0;
  const dpWidth = picker.offsetWidth;
  const dpHeight = picker.offsetHeight;
  const inputHeight = input.offsetHeight;
  const doc = picker.ownerDocument;
  const docElem = doc.documentElement;
  const viewWidth = docElem.clientWidth + window.pageXOffset;
  const viewHeight = docElem.clientHeight + window.pageYOffset;
  const offset = getElementOffset(input);
  let offsetLeft = offset.left;
  let offsetTop = offset.top;
  offsetTop += inputHeight;
  offsetLeft -= Math.min(offsetLeft, offsetLeft + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offsetLeft + dpWidth - viewWidth) : 0);
  offsetTop -= Math.min(offsetTop, offsetTop + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight - extraY) : extraY);
  return {
    top: offsetTop,
    // bottom: offset.bottom,
    left: offsetLeft
    // right: offset.right,
    // width: offset.width,
    // height: offset.height
  };
}
function noop() {
}
function bind(func, obj) {
  const slice = Array.prototype.slice;
  const args = slice.call(arguments, 2);
  return function() {
    return func.apply(obj, args.concat(slice.call(arguments)));
  };
}
function draggable(element, onmove, onstart, onstop) {
  onmove = onmove || noop;
  onstart = onstart || noop;
  onstop = onstop || noop;
  const doc = document;
  let dragging = false;
  let offset = {};
  let maxHeight = 0;
  let maxWidth = 0;
  const hasTouch = "ontouchstart" in window;
  const duringDragEvents = {};
  duringDragEvents["selectstart"] = prevent;
  duringDragEvents["dragstart"] = prevent;
  duringDragEvents["touchmove"] = move;
  duringDragEvents["mousemove"] = move;
  duringDragEvents["touchend"] = stop;
  duringDragEvents["mouseup"] = stop;
  function prevent(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;
  }
  function move(e) {
    if (dragging) {
      const t0 = "touches" in e && e.touches[0];
      const pageX = t0 && t0.pageX || e.pageX;
      const pageY = t0 && t0.pageY || e.pageY;
      const dragX = Math.max(0, Math.min(pageX - offset.left, maxWidth));
      const dragY = Math.max(0, Math.min(pageY - offset.top, maxHeight));
      if (hasTouch) {
        prevent(e);
      }
      onmove.apply(element, [dragX, dragY, e]);
    }
  }
  function start(e) {
    const rightclick = e.which ? e.which == 3 : e.button === 2;
    if (!rightclick && !dragging) {
      if (onstart.apply(element, arguments) !== false) {
        dragging = true;
        maxHeight = element.getBoundingClientRect().height;
        maxWidth = element.getBoundingClientRect().width;
        offset = getElementOffset(element);
        for (const eventName in duringDragEvents) {
          doc.addEventListener(eventName, duringDragEvents[eventName]);
        }
        doc.body.classList.add("sp-dragging");
        move(e);
        prevent(e);
      }
    }
  }
  function stop() {
    if (dragging) {
      for (const eventName in duringDragEvents) {
        doc.removeEventListener(eventName, duringDragEvents[eventName]);
      }
      doc.body.classList.remove("sp-dragging");
      setTimeout(function() {
        onstop.apply(element, arguments);
      }, 0);
    }
    dragging = false;
  }
  element.addEventListener("touchstart", start);
  element.addEventListener("mousedown", start);
}
class Spectrum {
  static create(selector, options = {}) {
    const ele = this.wrap(selector);
    if (!ele) {
      let msg = "Unable to find element";
      if (typeof selector === "string") {
        msg += " - Selector: " + selector;
      }
      throw Error(msg);
    }
    return new this(ele, options);
  }
  static createIfExists(selector, options = {}) {
    const ele = this.wrap(selector);
    if (!ele) {
      return null;
    }
    return new this(ele, options);
  }
  static getInstance(selector, options = {}) {
    const ele = this.wrap(selector);
    return ele.__spectrum = ele.__spectrum || this.createIfExists(ele, options);
  }
  static hasInstance(selector) {
    const ele = this.wrap(selector);
    return ele.__spectrum !== void 0;
  }
  static createMultiple(selector, options = {}) {
    const instances = [];
    this.wrapList(selector).forEach((ele) => {
      instances.push(this.create(ele, options));
    });
    return instances;
  }
  static getInstanceMultiple(selector, options = {}) {
    const instances = [];
    this.wrapList(selector).forEach((ele) => {
      instances.push(this.getInstance(ele, options));
    });
    return instances;
  }
  static wrap(selector) {
    if (typeof selector === "string") {
      return document.querySelector(selector);
    } else if (selector.jquery) {
      return selector[0];
    } else {
      return selector;
    }
  }
  static wrapList(selector) {
    if (typeof selector === "string") {
      return Array.from(document.querySelectorAll(selector));
    } else if (selector.jquery) {
      return selector.toArray();
    } else {
      return Array.from(selector);
    }
  }
  static locale(locale, localization) {
    this.localization[locale] = localization;
    return this;
  }
  static registerJQuery($) {
    registerJQueryPlugin($);
  }
  constructor(ele, options = {}) {
    this.eventListeners = {};
    this.spectrum = spectrum(ele, options);
    this.ele = ele;
    this.options = options;
  }
  get id() {
    return this.spectrum.id;
  }
  get container() {
    if (!this.ele.__spectrum) {
      return this.ele;
    }
    return this.spectrum.container;
  }
  show() {
    this.spectrum.show();
    return this;
  }
  hide() {
    this.spectrum.hide();
    return this;
  }
  toggle() {
    this.spectrum.toggle();
    return this;
  }
  reflow() {
    this.spectrum.reflow();
    return this;
  }
  option(optionName, optionValue) {
    return this.spectrum.option(optionName, optionValue);
  }
  enable() {
    this.spectrum.enable();
    return this;
  }
  disable() {
    this.spectrum.disable();
    return this;
  }
  offset(coord) {
    this.spectrum.offset(coord);
    return this;
  }
  set(color, ignoreFormatChange = false) {
    this.spectrum.set(color, ignoreFormatChange);
    return this;
  }
  get() {
    return this.spectrum.get();
  }
  destroy() {
    this.destroyInnerObject();
    delete this.ele.__spectrum;
    return this;
  }
  rebuild(options) {
    this.destroyInnerObject();
    if (options) {
      this.options = Object.assign({}, this.options, options);
    }
    this.spectrum = spectrum(this.ele, this.options);
    return this;
  }
  destroyInnerObject() {
    this.spectrum.destroy();
    this.off();
  }
  listeners(eventName) {
    return this.eventListeners[eventName] || [];
  }
  on(eventName, listener, options = void 0) {
    this.ele.addEventListener(eventName, listener, options);
    this.eventListeners[eventName] = this.eventListeners[eventName] || [];
    this.eventListeners[eventName].push(listener);
    return () => {
      this.off(eventName, listener);
    };
  }
  once(eventName, listener, options = void 0) {
    const cancel = this.on(eventName, (e) => {
      listener(e);
      cancel();
    }, options);
    return cancel;
  }
  off(eventName = void 0, listener = void 0) {
    if (eventName && !this.eventListeners[eventName]) {
      return;
    }
    if (!eventName) {
      this.eventListeners = {};
      return;
    }
    if (listener) {
      this.eventListeners[eventName] = this.eventListeners[eventName].filter((l) => l === listener);
      this.ele.removeEventListener(eventName, listener);
    } else {
      for (const listener2 of this.eventListeners[eventName]) {
        this.ele.removeEventListener(eventName, listener2);
      }
      this.eventListeners[eventName] = [];
    }
  }
}
Spectrum.defaultOptions = defaultOpts;
Spectrum.draggable = draggable;
Spectrum.localization = {};
Spectrum.palette = [];
const jQuery = window.jQuery;
if (jQuery) {
  registerJQueryPlugin(jQuery);
}
function registerJQueryPlugin($) {
  $.fn.spectrum = function(action = void 0, ...args) {
    if (typeof action === "string") {
      let returnValue = this;
      this.each(function() {
        const spect = this.__spectrum;
        if (spect) {
          const method = spect[action];
          if (!method) {
            throw new Error("Spectrum: no such method: '" + action + "'");
          }
          if (action === "get") {
            returnValue = spect.get();
          } else if (action === "container") {
            returnValue = $(spect.container);
          } else if (action === "option") {
            returnValue = spect.option.apply(spect, args);
          } else if (action === "destroy") {
            spect.destroy();
          } else {
            spect[action](...args);
          }
        }
      });
      return returnValue;
    }
    return this.each(function() {
      const options = $.extend({}, $(this).data(), action);
      if (!$(this).is("input")) {
        options.type = "color";
      } else if (options.type == "flat") {
        options.type = "flat";
      } else if ($(this).attr("type") == "color") {
        options.type = "color";
      } else {
        options.type = options.type || "component";
      }
      if (Spectrum.hasInstance(this)) {
        const sp = Spectrum.getInstance(this);
        sp.options = options;
        sp.rebuild();
      } else {
        Spectrum.getInstance(this, options);
      }
    });
  };
  $.fn.spectrum.load = true;
  $.fn.spectrum.loadOpts = {};
  $.fn.spectrum.draggable = draggable;
  $.fn.spectrum.defaults = defaultOpts;
  $.fn.spectrum.localization = Spectrum.localization;
  $.fn.spectrum.palette = [];
  $.fn.spectrum.processNativeColorInputs = function() {
    const colorInputs = $("input[type=color]");
    if (colorInputs.length) {
      colorInputs.spectrum({
        preferredFormat: "hex6"
      });
    }
  };
}
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "ColorInput",
  props: /* @__PURE__ */ mergeModels({
    id: {},
    inputClass: {},
    options: {}
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const value = useModel(__props, "modelValue");
    const input = ref();
    let sp;
    onMounted(() => {
      sp = Spectrum.getInstance(input.value, props.options || {});
    });
    onBeforeUnmount(() => {
      sp?.destroy();
    });
    const __returned__ = { props, value, input, get sp() {
      return sp;
    }, set sp(v) {
      sp = v;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$b = ["id"];
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("input", {
    ref: "input",
    type: "text",
    id: $props.id,
    class: normalizeClass(["form-control flex-grow-1", $props.inputClass]),
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.value = $event)
  }, null, 10, _hoisted_1$b)), [
    [
      vModelText,
      $setup.value,
      void 0,
      { lazy: true }
    ]
  ]);
}
const ColorInput = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__file", "ColorInput.vue"]]);
const css = '/* component style */\n.vue-slider-disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n/* rail style */\n.vue-slider-rail {\n  background-color: #ccc;\n  border-radius: 15px;\n}\n\n/* process style */\n.vue-slider-process {\n  background-color: #3498db;\n  border-radius: 15px;\n}\n\n/* mark style */\n.vue-slider-mark {\n  z-index: 4;\n}\n.vue-slider-mark:first-child .vue-slider-mark-step, .vue-slider-mark:last-child .vue-slider-mark-step {\n  display: none;\n}\n.vue-slider-mark-step {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  background-color: rgba(0, 0, 0, 0.16);\n}\n.vue-slider-mark-label {\n  font-size: 14px;\n  white-space: nowrap;\n}\n/* dot style */\n.vue-slider-dot-handle {\n  cursor: pointer;\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  background-color: #fff;\n  box-sizing: border-box;\n  box-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);\n}\n.vue-slider-dot-handle-focus {\n  box-shadow: 0px 0px 1px 2px rgba(52, 152, 219, 0.36);\n}\n\n.vue-slider-dot-handle-disabled {\n  cursor: not-allowed;\n  background-color: #ccc;\n}\n\n.vue-slider-dot-tooltip-inner {\n  font-size: 14px;\n  white-space: nowrap;\n  padding: 2px 5px;\n  min-width: 20px;\n  text-align: center;\n  color: #fff;\n  border-radius: 5px;\n  border-color: #3498db;\n  background-color: #3498db;\n  box-sizing: content-box;\n}\n.vue-slider-dot-tooltip-inner::after {\n  content: "";\n  position: absolute;\n}\n.vue-slider-dot-tooltip-inner-top::after {\n  top: 100%;\n  left: 50%;\n  transform: translate(-50%, 0);\n  height: 0;\n  width: 0;\n  border-color: transparent;\n  border-style: solid;\n  border-width: 5px;\n  border-top-color: inherit;\n}\n.vue-slider-dot-tooltip-inner-bottom::after {\n  bottom: 100%;\n  left: 50%;\n  transform: translate(-50%, 0);\n  height: 0;\n  width: 0;\n  border-color: transparent;\n  border-style: solid;\n  border-width: 5px;\n  border-bottom-color: inherit;\n}\n.vue-slider-dot-tooltip-inner-left::after {\n  left: 100%;\n  top: 50%;\n  transform: translate(0, -50%);\n  height: 0;\n  width: 0;\n  border-color: transparent;\n  border-style: solid;\n  border-width: 5px;\n  border-left-color: inherit;\n}\n.vue-slider-dot-tooltip-inner-right::after {\n  right: 100%;\n  top: 50%;\n  transform: translate(0, -50%);\n  height: 0;\n  width: 0;\n  border-color: transparent;\n  border-style: solid;\n  border-width: 5px;\n  border-right-color: inherit;\n}\n\n.vue-slider-dot-tooltip-wrapper {\n  opacity: 0;\n  transition: all 0.3s;\n}\n.vue-slider-dot-tooltip-wrapper-show {\n  opacity: 1;\n}\n\n/*# sourceMappingURL=default.css.map */\n';
var vueSliderComponent_umd_min$1 = { exports: {} };
var vueSliderComponent_umd_min = vueSliderComponent_umd_min$1.exports;
var hasRequiredVueSliderComponent_umd_min;
function requireVueSliderComponent_umd_min() {
  if (hasRequiredVueSliderComponent_umd_min) return vueSliderComponent_umd_min$1.exports;
  hasRequiredVueSliderComponent_umd_min = 1;
  (function(module2, exports2) {
    (function(t, e) {
      module2.exports = e(require$$0);
    })("undefined" !== typeof self ? self : vueSliderComponent_umd_min, (function(t) {
      return (function(t2) {
        var e = {};
        function r(n) {
          if (e[n]) return e[n].exports;
          var o = e[n] = { i: n, l: false, exports: {} };
          return t2[n].call(o.exports, o, o.exports, r), o.l = true, o.exports;
        }
        return r.m = t2, r.c = e, r.d = function(t3, e2, n) {
          r.o(t3, e2) || Object.defineProperty(t3, e2, { enumerable: true, get: n });
        }, r.r = function(t3) {
          "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t3, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t3, "__esModule", { value: true });
        }, r.t = function(t3, e2) {
          if (1 & e2 && (t3 = r(t3)), 8 & e2) return t3;
          if (4 & e2 && "object" === typeof t3 && t3 && t3.__esModule) return t3;
          var n = /* @__PURE__ */ Object.create(null);
          if (r.r(n), Object.defineProperty(n, "default", { enumerable: true, value: t3 }), 2 & e2 && "string" != typeof t3) for (var o in t3) r.d(n, o, (function(e3) {
            return t3[e3];
          }).bind(null, o));
          return n;
        }, r.n = function(t3) {
          var e2 = t3 && t3.__esModule ? function() {
            return t3["default"];
          } : function() {
            return t3;
          };
          return r.d(e2, "a", e2), e2;
        }, r.o = function(t3, e2) {
          return Object.prototype.hasOwnProperty.call(t3, e2);
        }, r.p = "", r(r.s = "fb15");
      })({ "091b": function(t2, e, r) {
        var n = r("24fb");
        e = n(false), e.push([t2.i, ".vue-slider-dot{position:absolute;-webkit-transition:all 0s;transition:all 0s;z-index:5}.vue-slider-dot:focus{outline:none}.vue-slider-dot-tooltip{position:absolute;visibility:hidden}.vue-slider-dot-hover:hover .vue-slider-dot-tooltip,.vue-slider-dot-tooltip-show{visibility:visible}.vue-slider-dot-tooltip-top{top:-10px;left:50%;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.vue-slider-dot-tooltip-bottom{bottom:-10px;left:50%;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.vue-slider-dot-tooltip-left{left:-10px;top:50%;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.vue-slider-dot-tooltip-right{right:-10px;top:50%;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}", ""]), t2.exports = e;
      }, "24fb": function(t2, e, r) {
        function n(t3, e2) {
          var r2 = t3[1] || "", n2 = t3[3];
          if (!n2) return r2;
          if (e2 && "function" === typeof btoa) {
            var i = o(n2), a = n2.sources.map((function(t4) {
              return "/*# sourceURL=".concat(n2.sourceRoot || "").concat(t4, " */");
            }));
            return [r2].concat(a).concat([i]).join("\n");
          }
          return [r2].join("\n");
        }
        function o(t3) {
          var e2 = btoa(unescape(encodeURIComponent(JSON.stringify(t3)))), r2 = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(e2);
          return "/*# ".concat(r2, " */");
        }
        t2.exports = function(t3) {
          var e2 = [];
          return e2.toString = function() {
            return this.map((function(e3) {
              var r2 = n(e3, t3);
              return e3[2] ? "@media ".concat(e3[2], " {").concat(r2, "}") : r2;
            })).join("");
          }, e2.i = function(t4, r2, n2) {
            "string" === typeof t4 && (t4 = [[null, t4, ""]]);
            var o2 = {};
            if (n2) for (var i = 0; i < this.length; i++) {
              var a = this[i][0];
              null != a && (o2[a] = true);
            }
            for (var s = 0; s < t4.length; s++) {
              var u2 = [].concat(t4[s]);
              n2 && o2[u2[0]] || (r2 && (u2[2] ? u2[2] = "".concat(r2, " and ").concat(u2[2]) : u2[2] = r2), e2.push(u2));
            }
          }, e2;
        };
      }, 2638: function(t2, e, r) {
        function n() {
          return n = Object.assign || function(t3) {
            for (var e2, r2 = 1; r2 < arguments.length; r2++) for (var n2 in e2 = arguments[r2], e2) Object.prototype.hasOwnProperty.call(e2, n2) && (t3[n2] = e2[n2]);
            return t3;
          }, n.apply(this, arguments);
        }
        var o = ["attrs", "props", "domProps"], i = ["class", "style", "directives"], a = ["on", "nativeOn"], s = function(t3) {
          return t3.reduce((function(t4, e2) {
            for (var r2 in e2) if (t4[r2]) if (-1 !== o.indexOf(r2)) t4[r2] = n({}, t4[r2], e2[r2]);
            else if (-1 !== i.indexOf(r2)) {
              var s2 = t4[r2] instanceof Array ? t4[r2] : [t4[r2]], l = e2[r2] instanceof Array ? e2[r2] : [e2[r2]];
              t4[r2] = s2.concat(l);
            } else if (-1 !== a.indexOf(r2)) for (var c in e2[r2]) if (t4[r2][c]) {
              var d = t4[r2][c] instanceof Array ? t4[r2][c] : [t4[r2][c]], f = e2[r2][c] instanceof Array ? e2[r2][c] : [e2[r2][c]];
              t4[r2][c] = d.concat(f);
            } else t4[r2][c] = e2[r2][c];
            else if ("hook" == r2) for (var h in e2[r2]) t4[r2][h] = t4[r2][h] ? u2(t4[r2][h], e2[r2][h]) : e2[r2][h];
            else t4[r2] = e2[r2];
            else t4[r2] = e2[r2];
            return t4;
          }), {});
        }, u2 = function(t3, e2) {
          return function() {
            t3 && t3.apply(this, arguments), e2 && e2.apply(this, arguments);
          };
        };
        t2.exports = s;
      }, "499e": function(t2, e, r) {
        function n(t3, e2) {
          for (var r2 = [], n2 = {}, o2 = 0; o2 < e2.length; o2++) {
            var i2 = e2[o2], a2 = i2[0], s2 = i2[1], u3 = i2[2], l2 = i2[3], c2 = { id: t3 + ":" + o2, css: s2, media: u3, sourceMap: l2 };
            n2[a2] ? n2[a2].parts.push(c2) : r2.push(n2[a2] = { id: a2, parts: [c2] });
          }
          return r2;
        }
        r.r(e), r.d(e, "default", (function() {
          return p;
        }));
        var o = "undefined" !== typeof document;
        if ("undefined" !== typeof DEBUG && DEBUG && !o) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        var i = {}, a = o && (document.head || document.getElementsByTagName("head")[0]), s = null, u2 = 0, l = false, c = function() {
        }, d = null, f = "data-vue-ssr-id", h = "undefined" !== typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
        function p(t3, e2, r2, o2) {
          l = r2, d = o2 || {};
          var a2 = n(t3, e2);
          return y(a2), function(e3) {
            for (var r3 = [], o3 = 0; o3 < a2.length; o3++) {
              var s2 = a2[o3], u3 = i[s2.id];
              u3.refs--, r3.push(u3);
            }
            e3 ? (a2 = n(t3, e3), y(a2)) : a2 = [];
            for (o3 = 0; o3 < r3.length; o3++) {
              u3 = r3[o3];
              if (0 === u3.refs) {
                for (var l2 = 0; l2 < u3.parts.length; l2++) u3.parts[l2]();
                delete i[u3.id];
              }
            }
          };
        }
        function y(t3) {
          for (var e2 = 0; e2 < t3.length; e2++) {
            var r2 = t3[e2], n2 = i[r2.id];
            if (n2) {
              n2.refs++;
              for (var o2 = 0; o2 < n2.parts.length; o2++) n2.parts[o2](r2.parts[o2]);
              for (; o2 < r2.parts.length; o2++) n2.parts.push(m(r2.parts[o2]));
              n2.parts.length > r2.parts.length && (n2.parts.length = r2.parts.length);
            } else {
              var a2 = [];
              for (o2 = 0; o2 < r2.parts.length; o2++) a2.push(m(r2.parts[o2]));
              i[r2.id] = { id: r2.id, refs: 1, parts: a2 };
            }
          }
        }
        function v() {
          var t3 = document.createElement("style");
          return t3.type = "text/css", a.appendChild(t3), t3;
        }
        function m(t3) {
          var e2, r2, n2 = document.querySelector("style[" + f + '~="' + t3.id + '"]');
          if (n2) {
            if (l) return c;
            n2.parentNode.removeChild(n2);
          }
          if (h) {
            var o2 = u2++;
            n2 = s || (s = v()), e2 = g.bind(null, n2, o2, false), r2 = g.bind(null, n2, o2, true);
          } else n2 = v(), e2 = k.bind(null, n2), r2 = function() {
            n2.parentNode.removeChild(n2);
          };
          return e2(t3), function(n3) {
            if (n3) {
              if (n3.css === t3.css && n3.media === t3.media && n3.sourceMap === t3.sourceMap) return;
              e2(t3 = n3);
            } else r2();
          };
        }
        var b = /* @__PURE__ */ (function() {
          var t3 = [];
          return function(e2, r2) {
            return t3[e2] = r2, t3.filter(Boolean).join("\n");
          };
        })();
        function g(t3, e2, r2, n2) {
          var o2 = r2 ? "" : n2.css;
          if (t3.styleSheet) t3.styleSheet.cssText = b(e2, o2);
          else {
            var i2 = document.createTextNode(o2), a2 = t3.childNodes;
            a2[e2] && t3.removeChild(a2[e2]), a2.length ? t3.insertBefore(i2, a2[e2]) : t3.appendChild(i2);
          }
        }
        function k(t3, e2) {
          var r2 = e2.css, n2 = e2.media, o2 = e2.sourceMap;
          if (n2 && t3.setAttribute("media", n2), d.ssrId && t3.setAttribute(f, e2.id), o2 && (r2 += "\n/*# sourceURL=" + o2.sources[0] + " */", r2 += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o2)))) + " */"), t3.styleSheet) t3.styleSheet.cssText = r2;
          else {
            while (t3.firstChild) t3.removeChild(t3.firstChild);
            t3.appendChild(document.createTextNode(r2));
          }
        }
      }, "4abb": function(t2, e, r) {
        var n = r("7a57");
        "string" === typeof n && (n = [[t2.i, n, ""]]), n.locals && (t2.exports = n.locals);
        var o = r("499e").default;
        o("b2af7572", n, true, { sourceMap: false, shadowMode: false });
      }, "4ed8": function(t2, e, r) {
        var n = r("091b");
        "string" === typeof n && (n = [[t2.i, n, ""]]), n.locals && (t2.exports = n.locals);
        var o = r("499e").default;
        o("2f6bee1a", n, true, { sourceMap: false, shadowMode: false });
      }, "556c": function(t2, e, r) {
        var n = r("eef2");
        "string" === typeof n && (n = [[t2.i, n, ""]]), n.locals && (t2.exports = n.locals);
        var o = r("499e").default;
        o("1209fd47", n, true, { sourceMap: false, shadowMode: false });
      }, "65d9": function(t2, e, r) {
        /**
        * vue-class-component v7.0.1
        * (c) 2015-present Evan You
        * @license MIT
        */
        function n(t3) {
          return t3 && "object" === typeof t3 && "default" in t3 ? t3["default"] : t3;
        }
        Object.defineProperty(e, "__esModule", { value: true });
        var o = n(r("8bbf")), i = "undefined" !== typeof Reflect && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
        function a(t3, e2) {
          s(t3, e2), Object.getOwnPropertyNames(e2.prototype).forEach((function(r2) {
            s(t3.prototype, e2.prototype, r2);
          })), Object.getOwnPropertyNames(e2).forEach((function(r2) {
            s(t3, e2, r2);
          }));
        }
        function s(t3, e2, r2) {
          var n2 = r2 ? Reflect.getOwnMetadataKeys(e2, r2) : Reflect.getOwnMetadataKeys(e2);
          n2.forEach((function(n3) {
            var o2 = r2 ? Reflect.getOwnMetadata(n3, e2, r2) : Reflect.getOwnMetadata(n3, e2);
            r2 ? Reflect.defineMetadata(n3, o2, t3, r2) : Reflect.defineMetadata(n3, o2, t3);
          }));
        }
        var u2 = { __proto__: [] }, l = u2 instanceof Array;
        function c(t3) {
          return function(e2, r2, n2) {
            var o2 = "function" === typeof e2 ? e2 : e2.constructor;
            o2.__decorators__ || (o2.__decorators__ = []), "number" !== typeof n2 && (n2 = void 0), o2.__decorators__.push((function(e3) {
              return t3(e3, r2, n2);
            }));
          };
        }
        function d() {
          for (var t3 = [], e2 = 0; e2 < arguments.length; e2++) t3[e2] = arguments[e2];
          return o.extend({ mixins: t3 });
        }
        function f(t3) {
          var e2 = typeof t3;
          return null == t3 || "object" !== e2 && "function" !== e2;
        }
        function h(t3, e2) {
          var r2 = e2.prototype._init;
          e2.prototype._init = function() {
            var e3 = this, r3 = Object.getOwnPropertyNames(t3);
            if (t3.$options.props) for (var n3 in t3.$options.props) t3.hasOwnProperty(n3) || r3.push(n3);
            r3.forEach((function(r4) {
              "_" !== r4.charAt(0) && Object.defineProperty(e3, r4, { get: function() {
                return t3[r4];
              }, set: function(e4) {
                t3[r4] = e4;
              }, configurable: true });
            }));
          };
          var n2 = new e2();
          e2.prototype._init = r2;
          var o2 = {};
          return Object.keys(n2).forEach((function(t4) {
            void 0 !== n2[t4] && (o2[t4] = n2[t4]);
          })), o2;
        }
        var p = ["data", "beforeCreate", "created", "beforeMount", "mounted", "beforeDestroy", "destroyed", "beforeUpdate", "updated", "activated", "deactivated", "render", "errorCaptured", "serverPrefetch"];
        function y(t3, e2) {
          void 0 === e2 && (e2 = {}), e2.name = e2.name || t3._componentTag || t3.name;
          var r2 = t3.prototype;
          Object.getOwnPropertyNames(r2).forEach((function(t4) {
            if ("constructor" !== t4) if (p.indexOf(t4) > -1) e2[t4] = r2[t4];
            else {
              var n3 = Object.getOwnPropertyDescriptor(r2, t4);
              void 0 !== n3.value ? "function" === typeof n3.value ? (e2.methods || (e2.methods = {}))[t4] = n3.value : (e2.mixins || (e2.mixins = [])).push({ data: function() {
                var e3;
                return e3 = {}, e3[t4] = n3.value, e3;
              } }) : (n3.get || n3.set) && ((e2.computed || (e2.computed = {}))[t4] = { get: n3.get, set: n3.set });
            }
          })), (e2.mixins || (e2.mixins = [])).push({ data: function() {
            return h(this, t3);
          } });
          var n2 = t3.__decorators__;
          n2 && (n2.forEach((function(t4) {
            return t4(e2);
          })), delete t3.__decorators__);
          var s2 = Object.getPrototypeOf(t3.prototype), u3 = s2 instanceof o ? s2.constructor : o, l2 = u3.extend(e2);
          return v(l2, t3, u3), i && a(l2, t3), l2;
        }
        function v(t3, e2, r2) {
          Object.getOwnPropertyNames(e2).forEach((function(n2) {
            if ("prototype" !== n2) {
              var o2 = Object.getOwnPropertyDescriptor(t3, n2);
              if (!o2 || o2.configurable) {
                var i2 = Object.getOwnPropertyDescriptor(e2, n2);
                if (!l) {
                  if ("cid" === n2) return;
                  var a2 = Object.getOwnPropertyDescriptor(r2, n2);
                  if (!f(i2.value) && a2 && a2.value === i2.value) return;
                }
                Object.defineProperty(t3, n2, i2);
              }
            }
          }));
        }
        function m(t3) {
          return "function" === typeof t3 ? y(t3) : function(e2) {
            return y(e2, t3);
          };
        }
        m.registerHooks = function(t3) {
          p.push.apply(p, t3);
        }, e.default = m, e.createDecorator = c, e.mixins = d;
      }, "7a57": function(t2, e, r) {
        var n = r("24fb");
        e = n(false), e.push([t2.i, ".vue-slider{position:relative;-webkit-box-sizing:content-box;box-sizing:content-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:block;-webkit-tap-highlight-color:rgba(0,0,0,0)}.vue-slider-rail{position:relative;width:100%;height:100%;-webkit-transition-property:width,height,left,right,top,bottom;transition-property:width,height,left,right,top,bottom}.vue-slider-process{position:absolute;z-index:1}", ""]), t2.exports = e;
      }, 8875: function(t2, e, r) {
        var n, o, i;
        (function(r2, a) {
          o = [], n = a, i = "function" === typeof n ? n.apply(e, o) : n, void 0 === i || (t2.exports = i);
        })("undefined" !== typeof self && self, (function() {
          function t3() {
            var e2 = Object.getOwnPropertyDescriptor(document, "currentScript");
            if (!e2 && "currentScript" in document && document.currentScript) return document.currentScript;
            if (e2 && e2.get !== t3 && document.currentScript) return document.currentScript;
            try {
              throw new Error();
            } catch (h) {
              var r2, n2, o2, i2 = /.*at [^(]*\((.*):(.+):(.+)\)$/gi, a = /@([^@]*):(\d+):(\d+)\s*$/gi, s = i2.exec(h.stack) || a.exec(h.stack), u2 = s && s[1] || false, l = s && s[2] || false, c = document.location.href.replace(document.location.hash, ""), d = document.getElementsByTagName("script");
              u2 === c && (r2 = document.documentElement.outerHTML, n2 = new RegExp("(?:[^\\n]+?\\n){0," + (l - 2) + "}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*", "i"), o2 = r2.replace(n2, "$1").trim());
              for (var f = 0; f < d.length; f++) {
                if ("interactive" === d[f].readyState) return d[f];
                if (d[f].src === u2) return d[f];
                if (u2 === c && d[f].innerHTML && d[f].innerHTML.trim() === o2) return d[f];
              }
              return null;
            }
          }
          return t3;
        }));
      }, "8bbf": function(e, r) {
        e.exports = t;
      }, eef2: function(t2, e, r) {
        var n = r("24fb");
        e = n(false), e.push([t2.i, ".vue-slider-marks{position:relative;width:100%;height:100%}.vue-slider-mark{position:absolute;z-index:1}.vue-slider-ltr .vue-slider-mark,.vue-slider-rtl .vue-slider-mark{width:0;height:100%;top:50%}.vue-slider-ltr .vue-slider-mark-step,.vue-slider-rtl .vue-slider-mark-step{top:0}.vue-slider-ltr .vue-slider-mark-label,.vue-slider-rtl .vue-slider-mark-label{top:100%;margin-top:10px}.vue-slider-ltr .vue-slider-mark{-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.vue-slider-ltr .vue-slider-mark-step{left:0}.vue-slider-ltr .vue-slider-mark-label{left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.vue-slider-rtl .vue-slider-mark{-webkit-transform:translate(50%,-50%);transform:translate(50%,-50%)}.vue-slider-rtl .vue-slider-mark-step{right:0}.vue-slider-rtl .vue-slider-mark-label{right:50%;-webkit-transform:translateX(50%);transform:translateX(50%)}.vue-slider-btt .vue-slider-mark,.vue-slider-ttb .vue-slider-mark{width:100%;height:0;left:50%}.vue-slider-btt .vue-slider-mark-step,.vue-slider-ttb .vue-slider-mark-step{left:0}.vue-slider-btt .vue-slider-mark-label,.vue-slider-ttb .vue-slider-mark-label{left:100%;margin-left:10px}.vue-slider-btt .vue-slider-mark{-webkit-transform:translate(-50%,50%);transform:translate(-50%,50%)}.vue-slider-btt .vue-slider-mark-step{top:0}.vue-slider-btt .vue-slider-mark-label{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.vue-slider-ttb .vue-slider-mark{-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.vue-slider-ttb .vue-slider-mark-step{bottom:0}.vue-slider-ttb .vue-slider-mark-label{bottom:50%;-webkit-transform:translateY(50%);transform:translateY(50%)}.vue-slider-mark-label,.vue-slider-mark-step{position:absolute}", ""]), t2.exports = e;
      }, fb15: function(t2, e, r) {
        if (r.r(e), r.d(e, "ERROR_TYPE", (function() {
          return J;
        })), r.d(e, "VueSliderMark", (function() {
          return U;
        })), r.d(e, "VueSliderDot", (function() {
          return j;
        })), "undefined" !== typeof window) {
          var n = window.document.currentScript, o = r("8875");
          n = o(), "currentScript" in document || Object.defineProperty(document, "currentScript", { get: o });
          var i = n && n.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
          i && (r.p = i[1]);
        }
        var a = r("2638"), s = r.n(a);
        function u2(t3, e2, r2, n2) {
          var o2, i2 = arguments.length, a2 = i2 < 3 ? e2 : null === n2 ? n2 = Object.getOwnPropertyDescriptor(e2, r2) : n2;
          if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) a2 = Reflect.decorate(t3, e2, r2, n2);
          else for (var s2 = t3.length - 1; s2 >= 0; s2--) (o2 = t3[s2]) && (a2 = (i2 < 3 ? o2(a2) : i2 > 3 ? o2(e2, r2, a2) : o2(e2, r2)) || a2);
          return i2 > 3 && a2 && Object.defineProperty(e2, r2, a2), a2;
        }
        var l = r("8bbf"), c = r.n(l), d = r("65d9"), f = r.n(d);
        function h(t3, e2) {
          return void 0 === e2 && (e2 = {}), Object(d["createDecorator"])((function(r2, n2) {
            (r2.props || (r2.props = {}))[n2] = e2, r2.model = { prop: n2, event: t3 };
          }));
        }
        function p(t3) {
          return void 0 === t3 && (t3 = {}), Object(d["createDecorator"])((function(e2, r2) {
            (e2.props || (e2.props = {}))[r2] = t3;
          }));
        }
        function y(t3, e2) {
          void 0 === e2 && (e2 = {});
          var r2 = e2.deep, n2 = void 0 !== r2 && r2, o2 = e2.immediate, i2 = void 0 !== o2 && o2;
          return Object(d["createDecorator"])((function(e3, r3) {
            "object" !== typeof e3.watch && (e3.watch = /* @__PURE__ */ Object.create(null));
            var o3 = e3.watch;
            "object" !== typeof o3[t3] || Array.isArray(o3[t3]) ? "undefined" === typeof o3[t3] && (o3[t3] = []) : o3[t3] = [o3[t3]], o3[t3].push({ handler: r3, deep: n2, immediate: i2 });
          }));
        }
        r("4ed8");
        function v(t3) {
          return v = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(t4) {
            return typeof t4;
          } : function(t4) {
            return t4 && "function" === typeof Symbol && t4.constructor === Symbol && t4 !== Symbol.prototype ? "symbol" : typeof t4;
          }, v(t3);
        }
        function m(t3, e2) {
          if (!(t3 instanceof e2)) throw new TypeError("Cannot call a class as a function");
        }
        function b(t3, e2) {
          for (var r2 = 0; r2 < e2.length; r2++) {
            var n2 = e2[r2];
            n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(t3, n2.key, n2);
          }
        }
        function g(t3, e2, r2) {
          return e2 && b(t3.prototype, e2), t3;
        }
        function k(t3, e2) {
          if ("function" !== typeof e2 && null !== e2) throw new TypeError("Super expression must either be null or a function");
          t3.prototype = Object.create(e2 && e2.prototype, { constructor: { value: t3, writable: true, configurable: true } }), e2 && O(t3, e2);
        }
        function O(t3, e2) {
          return O = Object.setPrototypeOf || function(t4, e3) {
            return t4.__proto__ = e3, t4;
          }, O(t3, e2);
        }
        function x(t3) {
          var e2 = P();
          return function() {
            var r2, n2 = D(t3);
            if (e2) {
              var o2 = D(this).constructor;
              r2 = Reflect.construct(n2, arguments, o2);
            } else r2 = n2.apply(this, arguments);
            return w(this, r2);
          };
        }
        function w(t3, e2) {
          return !e2 || "object" !== v(e2) && "function" !== typeof e2 ? S(t3) : e2;
        }
        function S(t3) {
          if (void 0 === t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t3;
        }
        function P() {
          if ("undefined" === typeof Reflect || !Reflect.construct) return false;
          if (Reflect.construct.sham) return false;
          if ("function" === typeof Proxy) return true;
          try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {
            }))), true;
          } catch (t3) {
            return false;
          }
        }
        function D(t3) {
          return D = Object.setPrototypeOf ? Object.getPrototypeOf : function(t4) {
            return t4.__proto__ || Object.getPrototypeOf(t4);
          }, D(t3);
        }
        var R = (function() {
          var t3 = (function(t4) {
            k(r2, t4);
            var e2 = x(r2);
            function r2() {
              return m(this, r2), e2.apply(this, arguments);
            }
            return g(r2, [{ key: "dragStart", value: function(t5) {
              if (this.disabled) return false;
              this.$emit("drag-start");
            } }, { key: "render", value: function() {
              var t5 = arguments[0];
              return t5("div", { ref: "dot", class: this.dotClasses, attrs: { "aria-valuetext": "number" === typeof this.tooltipValue ? this.tooltipValue.toString() : this.tooltipValue }, on: { mousedown: this.dragStart, touchstart: this.dragStart } }, [this.$slots.dot || t5("div", { class: this.handleClasses, style: this.dotStyle }), "none" !== this.tooltip ? t5("div", { class: this.tooltipClasses }, [this.$slots.tooltip || t5("div", { class: this.tooltipInnerClasses, style: this.tooltipStyle }, [t5("span", { class: "vue-slider-dot-tooltip-text" }, [this.tooltipValue])])]) : null]);
            } }, { key: "dotClasses", get: function() {
              return ["vue-slider-dot", { "vue-slider-dot-hover": "hover" === this.tooltip || "active" === this.tooltip, "vue-slider-dot-disabled": this.disabled, "vue-slider-dot-focus": this.focus }];
            } }, { key: "handleClasses", get: function() {
              return ["vue-slider-dot-handle", { "vue-slider-dot-handle-disabled": this.disabled, "vue-slider-dot-handle-focus": this.focus }];
            } }, { key: "tooltipClasses", get: function() {
              return ["vue-slider-dot-tooltip", ["vue-slider-dot-tooltip-".concat(this.tooltipPlacement)], { "vue-slider-dot-tooltip-show": this.showTooltip }];
            } }, { key: "tooltipInnerClasses", get: function() {
              return ["vue-slider-dot-tooltip-inner", ["vue-slider-dot-tooltip-inner-".concat(this.tooltipPlacement)], { "vue-slider-dot-tooltip-inner-disabled": this.disabled, "vue-slider-dot-tooltip-inner-focus": this.focus }];
            } }, { key: "showTooltip", get: function() {
              switch (this.tooltip) {
                case "always":
                  return true;
                case "none":
                  return false;
                case "focus":
                case "active":
                  return !!this.focus;
                default:
                  return false;
              }
            } }, { key: "tooltipValue", get: function() {
              return this.tooltipFormatter ? "string" === typeof this.tooltipFormatter ? this.tooltipFormatter.replace(/\{value\}/, String(this.value)) : this.tooltipFormatter(this.value) : this.value;
            } }]), r2;
          })(c.a);
          return u2([p({ default: 0 })], t3.prototype, "value", void 0), u2([p()], t3.prototype, "tooltip", void 0), u2([p()], t3.prototype, "dotStyle", void 0), u2([p()], t3.prototype, "tooltipStyle", void 0), u2([p({ type: String, validator: function(t4) {
            return ["top", "right", "bottom", "left"].indexOf(t4) > -1;
          }, required: true })], t3.prototype, "tooltipPlacement", void 0), u2([p({ type: [String, Function] })], t3.prototype, "tooltipFormatter", void 0), u2([p({ type: Boolean, default: false })], t3.prototype, "focus", void 0), u2([p({ default: false })], t3.prototype, "disabled", void 0), t3 = u2([f()({ name: "VueSliderDot" })], t3), t3;
        })(), j = R;
        r("556c");
        function E(t3) {
          return E = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(t4) {
            return typeof t4;
          } : function(t4) {
            return t4 && "function" === typeof Symbol && t4.constructor === Symbol && t4 !== Symbol.prototype ? "symbol" : typeof t4;
          }, E(t3);
        }
        function A(t3, e2) {
          if (!(t3 instanceof e2)) throw new TypeError("Cannot call a class as a function");
        }
        function V(t3, e2) {
          for (var r2 = 0; r2 < e2.length; r2++) {
            var n2 = e2[r2];
            n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(t3, n2.key, n2);
          }
        }
        function M(t3, e2, r2) {
          return e2 && V(t3.prototype, e2), t3;
        }
        function _(t3, e2) {
          if ("function" !== typeof e2 && null !== e2) throw new TypeError("Super expression must either be null or a function");
          t3.prototype = Object.create(e2 && e2.prototype, { constructor: { value: t3, writable: true, configurable: true } }), e2 && C(t3, e2);
        }
        function C(t3, e2) {
          return C = Object.setPrototypeOf || function(t4, e3) {
            return t4.__proto__ = e3, t4;
          }, C(t3, e2);
        }
        function I(t3) {
          var e2 = B();
          return function() {
            var r2, n2 = N(t3);
            if (e2) {
              var o2 = N(this).constructor;
              r2 = Reflect.construct(n2, arguments, o2);
            } else r2 = n2.apply(this, arguments);
            return L(this, r2);
          };
        }
        function L(t3, e2) {
          return !e2 || "object" !== E(e2) && "function" !== typeof e2 ? T(t3) : e2;
        }
        function T(t3) {
          if (void 0 === t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t3;
        }
        function B() {
          if ("undefined" === typeof Reflect || !Reflect.construct) return false;
          if (Reflect.construct.sham) return false;
          if ("function" === typeof Proxy) return true;
          try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {
            }))), true;
          } catch (t3) {
            return false;
          }
        }
        function N(t3) {
          return N = Object.setPrototypeOf ? Object.getPrototypeOf : function(t4) {
            return t4.__proto__ || Object.getPrototypeOf(t4);
          }, N(t3);
        }
        var z, H = (function() {
          var t3 = (function(t4) {
            _(r2, t4);
            var e2 = I(r2);
            function r2() {
              return A(this, r2), e2.apply(this, arguments);
            }
            return M(r2, [{ key: "labelClickHandle", value: function(t5) {
              t5.stopPropagation(), this.$emit("pressLabel", this.mark.pos);
            } }, { key: "render", value: function() {
              var t5 = arguments[0], e3 = this.mark;
              return t5("div", { class: this.marksClasses }, [this.$slots.step || t5("div", { class: this.stepClasses, style: [this.stepStyle || {}, e3.style || {}, e3.active && this.stepActiveStyle || {}, e3.active && e3.activeStyle || {}] }), this.hideLabel ? null : this.$slots.label || t5("div", { class: this.labelClasses, style: [this.labelStyle || {}, e3.labelStyle || {}, e3.active && this.labelActiveStyle || {}, e3.active && e3.labelActiveStyle || {}], on: { click: this.labelClickHandle } }, [e3.label])]);
            } }, { key: "marksClasses", get: function() {
              return ["vue-slider-mark", { "vue-slider-mark-active": this.mark.active }];
            } }, { key: "stepClasses", get: function() {
              return ["vue-slider-mark-step", { "vue-slider-mark-step-active": this.mark.active }];
            } }, { key: "labelClasses", get: function() {
              return ["vue-slider-mark-label", { "vue-slider-mark-label-active": this.mark.active }];
            } }]), r2;
          })(c.a);
          return u2([p({ required: true })], t3.prototype, "mark", void 0), u2([p(Boolean)], t3.prototype, "hideLabel", void 0), u2([p()], t3.prototype, "stepStyle", void 0), u2([p()], t3.prototype, "stepActiveStyle", void 0), u2([p()], t3.prototype, "labelStyle", void 0), u2([p()], t3.prototype, "labelActiveStyle", void 0), t3 = u2([f()({ name: "VueSlideMark" })], t3), t3;
        })(), U = H, F = function(t3) {
          return "number" === typeof t3 ? "".concat(t3, "px") : t3;
        }, $ = function(t3) {
          var e2 = document.documentElement, r2 = document.body, n2 = t3.getBoundingClientRect(), o2 = { y: n2.top + (window.pageYOffset || e2.scrollTop) - (e2.clientTop || r2.clientTop || 0), x: n2.left + (window.pageXOffset || e2.scrollLeft) - (e2.clientLeft || r2.clientLeft || 0) };
          return o2;
        }, W = function(t3, e2, r2) {
          var n2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1, o2 = "targetTouches" in t3 ? t3.targetTouches[0] : t3, i2 = $(e2), a2 = { x: o2.pageX - i2.x, y: o2.pageY - i2.y };
          return { x: r2 ? e2.offsetWidth * n2 - a2.x : a2.x, y: r2 ? e2.offsetHeight * n2 - a2.y : a2.y };
        };
        (function(t3) {
          t3[t3["PAGE_UP"] = 33] = "PAGE_UP", t3[t3["PAGE_DOWN"] = 34] = "PAGE_DOWN", t3[t3["END"] = 35] = "END", t3[t3["HOME"] = 36] = "HOME", t3[t3["LEFT"] = 37] = "LEFT", t3[t3["UP"] = 38] = "UP", t3[t3["RIGHT"] = 39] = "RIGHT", t3[t3["DOWN"] = 40] = "DOWN";
        })(z || (z = {}));
        var G = function(t3, e2) {
          if (e2.hook) {
            var r2 = e2.hook(t3);
            if ("function" === typeof r2) return r2;
            if (!r2) return null;
          }
          switch (t3.keyCode) {
            case z.UP:
              return function(t4) {
                return "ttb" === e2.direction ? t4 - 1 : t4 + 1;
              };
            case z.RIGHT:
              return function(t4) {
                return "rtl" === e2.direction ? t4 - 1 : t4 + 1;
              };
            case z.DOWN:
              return function(t4) {
                return "ttb" === e2.direction ? t4 + 1 : t4 - 1;
              };
            case z.LEFT:
              return function(t4) {
                return "rtl" === e2.direction ? t4 + 1 : t4 - 1;
              };
            case z.END:
              return function() {
                return e2.max;
              };
            case z.HOME:
              return function() {
                return e2.min;
              };
            case z.PAGE_UP:
              return function(t4) {
                return t4 + 10;
              };
            case z.PAGE_DOWN:
              return function(t4) {
                return t4 - 10;
              };
            default:
              return null;
          }
        };
        function X(t3, e2) {
          if (!(t3 instanceof e2)) throw new TypeError("Cannot call a class as a function");
        }
        function q(t3, e2) {
          for (var r2 = 0; r2 < e2.length; r2++) {
            var n2 = e2[r2];
            n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(t3, n2.key, n2);
          }
        }
        function K(t3, e2, r2) {
          return e2 && q(t3.prototype, e2), t3;
        }
        var Y, J, Q = (function() {
          function t3(e2) {
            X(this, t3), this.num = e2;
          }
          return K(t3, [{ key: "decimal", value: function(t4, e2) {
            var r2 = this.num, n2 = this.getDecimalLen(r2), o2 = this.getDecimalLen(t4), i2 = 0;
            switch (e2) {
              case "+":
                i2 = this.getExponent(n2, o2), this.num = (this.safeRoundUp(r2, i2) + this.safeRoundUp(t4, i2)) / i2;
                break;
              case "-":
                i2 = this.getExponent(n2, o2), this.num = (this.safeRoundUp(r2, i2) - this.safeRoundUp(t4, i2)) / i2;
                break;
              case "*":
                this.num = this.safeRoundUp(this.safeRoundUp(r2, this.getExponent(n2)), this.safeRoundUp(t4, this.getExponent(o2))) / this.getExponent(n2 + o2);
                break;
              case "/":
                i2 = this.getExponent(n2, o2), this.num = this.safeRoundUp(r2, i2) / this.safeRoundUp(t4, i2);
                break;
              case "%":
                i2 = this.getExponent(n2, o2), this.num = this.safeRoundUp(r2, i2) % this.safeRoundUp(t4, i2) / i2;
                break;
            }
            return this;
          } }, { key: "plus", value: function(t4) {
            return this.decimal(t4, "+");
          } }, { key: "minus", value: function(t4) {
            return this.decimal(t4, "-");
          } }, { key: "multiply", value: function(t4) {
            return this.decimal(t4, "*");
          } }, { key: "divide", value: function(t4) {
            return this.decimal(t4, "/");
          } }, { key: "remainder", value: function(t4) {
            return this.decimal(t4, "%");
          } }, { key: "toNumber", value: function() {
            return this.num;
          } }, { key: "getDecimalLen", value: function(t4) {
            var e2 = "".concat(t4).split("e");
            return ("".concat(e2[0]).split(".")[1] || "").length - (e2[1] ? +e2[1] : 0);
          } }, { key: "getExponent", value: function(t4, e2) {
            return Math.pow(10, void 0 !== e2 ? Math.max(t4, e2) : t4);
          } }, { key: "safeRoundUp", value: function(t4, e2) {
            return Math.round(t4 * e2);
          } }]), t3;
        })();
        function Z(t3, e2) {
          var r2 = Object.keys(t3);
          if (Object.getOwnPropertySymbols) {
            var n2 = Object.getOwnPropertySymbols(t3);
            e2 && (n2 = n2.filter((function(e3) {
              return Object.getOwnPropertyDescriptor(t3, e3).enumerable;
            }))), r2.push.apply(r2, n2);
          }
          return r2;
        }
        function tt(t3) {
          for (var e2 = 1; e2 < arguments.length; e2++) {
            var r2 = null != arguments[e2] ? arguments[e2] : {};
            e2 % 2 ? Z(Object(r2), true).forEach((function(e3) {
              pt(t3, e3, r2[e3]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(r2)) : Z(Object(r2)).forEach((function(e3) {
              Object.defineProperty(t3, e3, Object.getOwnPropertyDescriptor(r2, e3));
            }));
          }
          return t3;
        }
        function et(t3, e2) {
          return ot(t3) || nt(t3, e2) || st(t3, e2) || rt();
        }
        function rt() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function nt(t3, e2) {
          if ("undefined" !== typeof Symbol && Symbol.iterator in Object(t3)) {
            var r2 = [], n2 = true, o2 = false, i2 = void 0;
            try {
              for (var a2, s2 = t3[Symbol.iterator](); !(n2 = (a2 = s2.next()).done); n2 = true) if (r2.push(a2.value), e2 && r2.length === e2) break;
            } catch (u3) {
              o2 = true, i2 = u3;
            } finally {
              try {
                n2 || null == s2["return"] || s2["return"]();
              } finally {
                if (o2) throw i2;
              }
            }
            return r2;
          }
        }
        function ot(t3) {
          if (Array.isArray(t3)) return t3;
        }
        function it(t3) {
          return lt(t3) || ut(t3) || st(t3) || at();
        }
        function at() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function st(t3, e2) {
          if (t3) {
            if ("string" === typeof t3) return ct(t3, e2);
            var r2 = Object.prototype.toString.call(t3).slice(8, -1);
            return "Object" === r2 && t3.constructor && (r2 = t3.constructor.name), "Map" === r2 || "Set" === r2 ? Array.from(t3) : "Arguments" === r2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r2) ? ct(t3, e2) : void 0;
          }
        }
        function ut(t3) {
          if ("undefined" !== typeof Symbol && Symbol.iterator in Object(t3)) return Array.from(t3);
        }
        function lt(t3) {
          if (Array.isArray(t3)) return ct(t3);
        }
        function ct(t3, e2) {
          (null == e2 || e2 > t3.length) && (e2 = t3.length);
          for (var r2 = 0, n2 = new Array(e2); r2 < e2; r2++) n2[r2] = t3[r2];
          return n2;
        }
        function dt(t3, e2) {
          if (!(t3 instanceof e2)) throw new TypeError("Cannot call a class as a function");
        }
        function ft(t3, e2) {
          for (var r2 = 0; r2 < e2.length; r2++) {
            var n2 = e2[r2];
            n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(t3, n2.key, n2);
          }
        }
        function ht(t3, e2, r2) {
          return e2 && ft(t3.prototype, e2), t3;
        }
        function pt(t3, e2, r2) {
          return e2 in t3 ? Object.defineProperty(t3, e2, { value: r2, enumerable: true, configurable: true, writable: true }) : t3[e2] = r2, t3;
        }
        (function(t3) {
          t3[t3["VALUE"] = 1] = "VALUE", t3[t3["INTERVAL"] = 2] = "INTERVAL", t3[t3["MIN"] = 3] = "MIN", t3[t3["MAX"] = 4] = "MAX", t3[t3["ORDER"] = 5] = "ORDER";
        })(J || (J = {}));
        var yt = (Y = {}, pt(Y, J.VALUE, 'The type of the "value" is illegal'), pt(Y, J.INTERVAL, 'The prop "interval" is invalid, "(max - min)" must be divisible by "interval"'), pt(Y, J.MIN, 'The "value" must be greater than or equal to the "min".'), pt(Y, J.MAX, 'The "value" must be less than or equal to the "max".'), pt(Y, J.ORDER, 'When "order" is false, the parameters "minRange", "maxRange", "fixed", "enabled" are invalid.'), Y), vt = (function() {
          function t3(e2) {
            dt(this, t3), this.dotsPos = [], this.dotsValue = [], this.cacheRangeDir = {}, this.data = e2.data, this.max = e2.max, this.min = e2.min, this.interval = e2.interval, this.order = e2.order, this.marks = e2.marks, this.included = e2.included, this.process = e2.process, this.adsorb = e2.adsorb, this.dotOptions = e2.dotOptions, this.onError = e2.onError, this.order ? (this.minRange = e2.minRange || 0, this.maxRange = e2.maxRange || 0, this.enableCross = e2.enableCross, this.fixed = e2.fixed) : ((e2.minRange || e2.maxRange || !e2.enableCross || e2.fixed) && this.emitError(J.ORDER), this.minRange = 0, this.maxRange = 0, this.enableCross = true, this.fixed = false), this.setValue(e2.value);
          }
          return ht(t3, [{ key: "setValue", value: function(t4) {
            var e2 = this;
            this.setDotsValue(Array.isArray(t4) ? this.order ? it(t4).sort((function(t5, r2) {
              return e2.getIndexByValue(t5) - e2.getIndexByValue(r2);
            })) : it(t4) : [t4], true);
          } }, { key: "setDotsValue", value: function(t4, e2) {
            this.dotsValue = t4, e2 && this.syncDotsPos();
          } }, { key: "setDotsPos", value: function(t4) {
            var e2 = this, r2 = this.order ? it(t4).sort((function(t5, e3) {
              return t5 - e3;
            })) : t4;
            this.dotsPos = r2, this.setDotsValue(r2.map((function(t5) {
              return e2.getValueByPos(t5);
            })), this.adsorb);
          } }, { key: "getValueByPos", value: function(t4) {
            var e2 = this.parsePos(t4);
            if (this.included) {
              var r2 = 100;
              this.markList.forEach((function(n2) {
                var o2 = Math.abs(n2.pos - t4);
                o2 < r2 && (r2 = o2, e2 = n2.value);
              }));
            }
            return e2;
          } }, { key: "syncDotsPos", value: function() {
            var t4 = this;
            this.dotsPos = this.dotsValue.map((function(e2) {
              return t4.parseValue(e2);
            }));
          } }, { key: "getRecentDot", value: function(t4) {
            var e2 = this, r2 = this.dotsPos.filter((function(t5, r3) {
              return !(e2.getDotOption(r3) && e2.getDotOption(r3).disabled);
            })).map((function(e3) {
              return Math.abs(e3 - t4);
            }));
            return r2.indexOf(Math.min.apply(Math, it(r2)));
          } }, { key: "getIndexByValue", value: function(t4) {
            return this.data ? this.data.indexOf(t4) : new Q(+t4).minus(this.min).divide(this.interval).toNumber();
          } }, { key: "getValueByIndex", value: function(t4) {
            return t4 < 0 ? t4 = 0 : t4 > this.total && (t4 = this.total), this.data ? this.data[t4] : new Q(t4).multiply(this.interval).plus(this.min).toNumber();
          } }, { key: "setDotPos", value: function(t4, e2) {
            t4 = this.getValidPos(t4, e2).pos;
            var r2 = t4 - this.dotsPos[e2];
            if (r2) {
              var n2 = new Array(this.dotsPos.length);
              this.fixed ? n2 = this.getFixedChangePosArr(r2, e2) : this.minRange || this.maxRange ? n2 = this.getLimitRangeChangePosArr(t4, r2, e2) : n2[e2] = r2, this.setDotsPos(this.dotsPos.map((function(t5, e3) {
                return t5 + (n2[e3] || 0);
              })));
            }
          } }, { key: "getFixedChangePosArr", value: function(t4, e2) {
            var r2 = this;
            return this.dotsPos.forEach((function(n2, o2) {
              if (o2 !== e2) {
                var i2 = r2.getValidPos(n2 + t4, o2), a2 = i2.pos, s2 = i2.inRange;
                s2 || (t4 = Math.min(Math.abs(a2 - n2), Math.abs(t4)) * (t4 < 0 ? -1 : 1));
              }
            })), this.dotsPos.map((function(e3) {
              return t4;
            }));
          } }, { key: "getLimitRangeChangePosArr", value: function(t4, e2, r2) {
            var n2 = this, o2 = [{ index: r2, changePos: e2 }], i2 = e2;
            return [this.minRange, this.maxRange].forEach((function(a2, s2) {
              if (!a2) return false;
              var u3 = 0 === s2, l2 = e2 > 0, c2 = 0;
              c2 = u3 ? l2 ? 1 : -1 : l2 ? -1 : 1;
              var d2 = function(t5, e3) {
                var r3 = Math.abs(t5 - e3);
                return u3 ? r3 < n2.minRangeDir : r3 > n2.maxRangeDir;
              }, f2 = r2 + c2, h2 = n2.dotsPos[f2], p2 = t4;
              while (n2.isPos(h2) && d2(h2, p2)) {
                var y2 = n2.getValidPos(h2 + i2, f2), v2 = y2.pos;
                o2.push({ index: f2, changePos: v2 - h2 }), f2 += c2, p2 = v2, h2 = n2.dotsPos[f2];
              }
            })), this.dotsPos.map((function(t5, e3) {
              var r3 = o2.filter((function(t6) {
                return t6.index === e3;
              }));
              return r3.length ? r3[0].changePos : 0;
            }));
          } }, { key: "isPos", value: function(t4) {
            return "number" === typeof t4;
          } }, { key: "getValidPos", value: function(t4, e2) {
            var r2 = this.valuePosRange[e2], n2 = true;
            return t4 < r2[0] ? (t4 = r2[0], n2 = false) : t4 > r2[1] && (t4 = r2[1], n2 = false), { pos: t4, inRange: n2 };
          } }, { key: "parseValue", value: function(t4) {
            if (this.data) t4 = this.data.indexOf(t4);
            else if ("number" === typeof t4 || "string" === typeof t4) {
              if (t4 = +t4, t4 < this.min) return this.emitError(J.MIN), 0;
              if (t4 > this.max) return this.emitError(J.MAX), 0;
              if ("number" !== typeof t4 || t4 !== t4) return this.emitError(J.VALUE), 0;
              t4 = new Q(t4).minus(this.min).divide(this.interval).toNumber();
            }
            var e2 = new Q(t4).multiply(this.gap).toNumber();
            return e2 < 0 ? 0 : e2 > 100 ? 100 : e2;
          } }, { key: "parsePos", value: function(t4) {
            var e2 = Math.round(t4 / this.gap);
            return this.getValueByIndex(e2);
          } }, { key: "isActiveByPos", value: function(t4) {
            return this.processArray.some((function(e2) {
              var r2 = et(e2, 2), n2 = r2[0], o2 = r2[1];
              return t4 >= n2 && t4 <= o2;
            }));
          } }, { key: "getValues", value: function() {
            if (this.data) return this.data;
            for (var t4 = [], e2 = 0; e2 <= this.total; e2++) t4.push(new Q(e2).multiply(this.interval).plus(this.min).toNumber());
            return t4;
          } }, { key: "getRangeDir", value: function(t4) {
            return t4 ? new Q(t4).divide(new Q(this.data ? this.data.length - 1 : this.max).minus(this.data ? 0 : this.min).toNumber()).multiply(100).toNumber() : 100;
          } }, { key: "emitError", value: function(t4) {
            this.onError && this.onError(t4, yt[t4]);
          } }, { key: "getDotOption", value: function(t4) {
            return Array.isArray(this.dotOptions) ? this.dotOptions[t4] : this.dotOptions;
          } }, { key: "getDotRange", value: function(t4, e2, r2) {
            if (!this.dotOptions) return r2;
            var n2 = this.getDotOption(t4);
            return n2 && void 0 !== n2[e2] ? this.parseValue(n2[e2]) : r2;
          } }, { key: "markList", get: function() {
            var t4 = this;
            if (!this.marks) return [];
            var e2 = function(e3, r2) {
              var n2 = t4.parseValue(e3);
              return tt({ pos: n2, value: e3, label: e3, active: t4.isActiveByPos(n2) }, r2);
            };
            return true === this.marks ? this.getValues().map((function(t5) {
              return e2(t5);
            })) : "[object Object]" === Object.prototype.toString.call(this.marks) ? Object.keys(this.marks).sort((function(t5, e3) {
              return +t5 - +e3;
            })).map((function(r2) {
              var n2 = t4.marks[r2];
              return e2(r2, "string" !== typeof n2 ? n2 : { label: n2 });
            })) : Array.isArray(this.marks) ? this.marks.map((function(t5) {
              return e2(t5);
            })) : "function" === typeof this.marks ? this.getValues().map((function(e3) {
              return { value: e3, result: t4.marks(e3) };
            })).filter((function(t5) {
              var e3 = t5.result;
              return !!e3;
            })).map((function(t5) {
              var r2 = t5.value, n2 = t5.result;
              return e2(r2, n2);
            })) : [];
          } }, { key: "processArray", get: function() {
            if (this.process) {
              if ("function" === typeof this.process) return this.process(this.dotsPos);
              if (1 === this.dotsPos.length) return [[0, this.dotsPos[0]]];
              if (this.dotsPos.length > 1) return [[Math.min.apply(Math, it(this.dotsPos)), Math.max.apply(Math, it(this.dotsPos))]];
            }
            return [];
          } }, { key: "total", get: function() {
            var t4 = 0;
            return t4 = this.data ? this.data.length - 1 : new Q(this.max).minus(this.min).divide(this.interval).toNumber(), t4 - Math.floor(t4) !== 0 ? (this.emitError(J.INTERVAL), 0) : t4;
          } }, { key: "gap", get: function() {
            return 100 / this.total;
          } }, { key: "minRangeDir", get: function() {
            return this.cacheRangeDir[this.minRange] ? this.cacheRangeDir[this.minRange] : this.cacheRangeDir[this.minRange] = this.getRangeDir(this.minRange);
          } }, { key: "maxRangeDir", get: function() {
            return this.cacheRangeDir[this.maxRange] ? this.cacheRangeDir[this.maxRange] : this.cacheRangeDir[this.maxRange] = this.getRangeDir(this.maxRange);
          } }, { key: "valuePosRange", get: function() {
            var t4 = this, e2 = this.dotsPos, r2 = [];
            return e2.forEach((function(n2, o2) {
              r2.push([Math.max(t4.minRange ? t4.minRangeDir * o2 : 0, t4.enableCross ? 0 : e2[o2 - 1] || 0, t4.getDotRange(o2, "min", 0)), Math.min(t4.minRange ? 100 - t4.minRangeDir * (e2.length - 1 - o2) : 100, t4.enableCross ? 100 : e2[o2 + 1] || 100, t4.getDotRange(o2, "max", 100))]);
            })), r2;
          } }, { key: "dotsIndex", get: function() {
            var t4 = this;
            return this.dotsValue.map((function(e2) {
              return t4.getIndexByValue(e2);
            }));
          } }]), t3;
        })();
        function mt(t3, e2) {
          if (!(t3 instanceof e2)) throw new TypeError("Cannot call a class as a function");
        }
        function bt(t3, e2) {
          for (var r2 = 0; r2 < e2.length; r2++) {
            var n2 = e2[r2];
            n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(t3, n2.key, n2);
          }
        }
        function gt(t3, e2, r2) {
          return e2 && bt(t3.prototype, e2), t3;
        }
        var kt = (function() {
          function t3(e2) {
            mt(this, t3), this.states = 0, this.map = e2;
          }
          return gt(t3, [{ key: "add", value: function(t4) {
            this.states |= t4;
          } }, { key: "delete", value: function(t4) {
            this.states &= ~t4;
          } }, { key: "toggle", value: function(t4) {
            this.has(t4) ? this.delete(t4) : this.add(t4);
          } }, { key: "has", value: function(t4) {
            return !!(this.states & t4);
          } }]), t3;
        })();
        r("4abb");
        function Ot(t3, e2) {
          return St(t3) || wt(t3, e2) || At(t3, e2) || xt();
        }
        function xt() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function wt(t3, e2) {
          if ("undefined" !== typeof Symbol && Symbol.iterator in Object(t3)) {
            var r2 = [], n2 = true, o2 = false, i2 = void 0;
            try {
              for (var a2, s2 = t3[Symbol.iterator](); !(n2 = (a2 = s2.next()).done); n2 = true) if (r2.push(a2.value), e2 && r2.length === e2) break;
            } catch (u3) {
              o2 = true, i2 = u3;
            } finally {
              try {
                n2 || null == s2["return"] || s2["return"]();
              } finally {
                if (o2) throw i2;
              }
            }
            return r2;
          }
        }
        function St(t3) {
          if (Array.isArray(t3)) return t3;
        }
        function Pt(t3, e2) {
          var r2 = Object.keys(t3);
          if (Object.getOwnPropertySymbols) {
            var n2 = Object.getOwnPropertySymbols(t3);
            e2 && (n2 = n2.filter((function(e3) {
              return Object.getOwnPropertyDescriptor(t3, e3).enumerable;
            }))), r2.push.apply(r2, n2);
          }
          return r2;
        }
        function Dt(t3) {
          for (var e2 = 1; e2 < arguments.length; e2++) {
            var r2 = null != arguments[e2] ? arguments[e2] : {};
            e2 % 2 ? Pt(Object(r2), true).forEach((function(e3) {
              Rt(t3, e3, r2[e3]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(r2)) : Pt(Object(r2)).forEach((function(e3) {
              Object.defineProperty(t3, e3, Object.getOwnPropertyDescriptor(r2, e3));
            }));
          }
          return t3;
        }
        function Rt(t3, e2, r2) {
          return e2 in t3 ? Object.defineProperty(t3, e2, { value: r2, enumerable: true, configurable: true, writable: true }) : t3[e2] = r2, t3;
        }
        function jt(t3) {
          return Mt(t3) || Vt(t3) || At(t3) || Et();
        }
        function Et() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function At(t3, e2) {
          if (t3) {
            if ("string" === typeof t3) return _t(t3, e2);
            var r2 = Object.prototype.toString.call(t3).slice(8, -1);
            return "Object" === r2 && t3.constructor && (r2 = t3.constructor.name), "Map" === r2 || "Set" === r2 ? Array.from(t3) : "Arguments" === r2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r2) ? _t(t3, e2) : void 0;
          }
        }
        function Vt(t3) {
          if ("undefined" !== typeof Symbol && Symbol.iterator in Object(t3)) return Array.from(t3);
        }
        function Mt(t3) {
          if (Array.isArray(t3)) return _t(t3);
        }
        function _t(t3, e2) {
          (null == e2 || e2 > t3.length) && (e2 = t3.length);
          for (var r2 = 0, n2 = new Array(e2); r2 < e2; r2++) n2[r2] = t3[r2];
          return n2;
        }
        function Ct(t3) {
          return Ct = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(t4) {
            return typeof t4;
          } : function(t4) {
            return t4 && "function" === typeof Symbol && t4.constructor === Symbol && t4 !== Symbol.prototype ? "symbol" : typeof t4;
          }, Ct(t3);
        }
        function It(t3, e2) {
          if (!(t3 instanceof e2)) throw new TypeError("Cannot call a class as a function");
        }
        function Lt(t3, e2) {
          for (var r2 = 0; r2 < e2.length; r2++) {
            var n2 = e2[r2];
            n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(t3, n2.key, n2);
          }
        }
        function Tt(t3, e2, r2) {
          return e2 && Lt(t3.prototype, e2), t3;
        }
        function Bt(t3, e2) {
          if ("function" !== typeof e2 && null !== e2) throw new TypeError("Super expression must either be null or a function");
          t3.prototype = Object.create(e2 && e2.prototype, { constructor: { value: t3, writable: true, configurable: true } }), e2 && Nt(t3, e2);
        }
        function Nt(t3, e2) {
          return Nt = Object.setPrototypeOf || function(t4, e3) {
            return t4.__proto__ = e3, t4;
          }, Nt(t3, e2);
        }
        function zt(t3) {
          var e2 = Ft();
          return function() {
            var r2, n2 = $t(t3);
            if (e2) {
              var o2 = $t(this).constructor;
              r2 = Reflect.construct(n2, arguments, o2);
            } else r2 = n2.apply(this, arguments);
            return Ht(this, r2);
          };
        }
        function Ht(t3, e2) {
          return !e2 || "object" !== Ct(e2) && "function" !== typeof e2 ? Ut(t3) : e2;
        }
        function Ut(t3) {
          if (void 0 === t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t3;
        }
        function Ft() {
          if ("undefined" === typeof Reflect || !Reflect.construct) return false;
          if (Reflect.construct.sham) return false;
          if ("function" === typeof Proxy) return true;
          try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {
            }))), true;
          } catch (t3) {
            return false;
          }
        }
        function $t(t3) {
          return $t = Object.setPrototypeOf ? Object.getPrototypeOf : function(t4) {
            return t4.__proto__ || Object.getPrototypeOf(t4);
          }, $t(t3);
        }
        var Wt = { None: 0, Drag: 2, Focus: 4 }, Gt = 4, Xt = (function() {
          var t3 = (function(t4) {
            Bt(r2, t4);
            var e2 = zt(r2);
            function r2() {
              var t5;
              return It(this, r2), t5 = e2.apply(this, arguments), t5.states = new kt(Wt), t5.scale = 1, t5.focusDotIndex = 0, t5;
            }
            return Tt(r2, [{ key: "isObjectData", value: function(t5) {
              return !!t5 && "[object Object]" === Object.prototype.toString.call(t5);
            } }, { key: "isObjectArrayData", value: function(t5) {
              return !!t5 && Array.isArray(t5) && t5.length > 0 && "object" === Ct(t5[0]);
            } }, { key: "onValueChanged", value: function() {
              this.control && !this.states.has(Wt.Drag) && this.isNotSync && (this.control.setValue(this.value), this.syncValueByPos());
            } }, { key: "created", value: function() {
              this.initControl();
            } }, { key: "mounted", value: function() {
              this.bindEvent();
            } }, { key: "beforeDestroy", value: function() {
              this.unbindEvent();
            } }, { key: "bindEvent", value: function() {
              document.addEventListener("touchmove", this.dragMove, { passive: false }), document.addEventListener("touchend", this.dragEnd, { passive: false }), document.addEventListener("mousedown", this.blurHandle), document.addEventListener("mousemove", this.dragMove, { passive: false }), document.addEventListener("mouseup", this.dragEnd), document.addEventListener("mouseleave", this.dragEnd), document.addEventListener("keydown", this.keydownHandle);
            } }, { key: "unbindEvent", value: function() {
              document.removeEventListener("touchmove", this.dragMove), document.removeEventListener("touchend", this.dragEnd), document.removeEventListener("mousedown", this.blurHandle), document.removeEventListener("mousemove", this.dragMove), document.removeEventListener("mouseup", this.dragEnd), document.removeEventListener("mouseleave", this.dragEnd), document.removeEventListener("keydown", this.keydownHandle);
            } }, { key: "setScale", value: function() {
              var t5 = new Q(Math.floor(this.isHorizontal ? this.$refs.rail.offsetWidth : this.$refs.rail.offsetHeight));
              void 0 !== this.zoom && t5.multiply(this.zoom), t5.divide(100), this.scale = t5.toNumber();
            } }, { key: "initControl", value: function() {
              var t5 = this;
              this.control = new vt({ value: this.value, data: this.sliderData, enableCross: this.enableCross, fixed: this.fixed, max: this.max, min: this.min, interval: this.interval, minRange: this.minRange, maxRange: this.maxRange, order: this.order, marks: this.sliderMarks, included: this.included, process: this.process, adsorb: this.adsorb, dotOptions: this.dotOptions, onError: this.emitError }), this.syncValueByPos(), ["data", "enableCross", "fixed", "max", "min", "interval", "minRange", "maxRange", "order", "marks", "process", "adsorb", "included", "dotOptions"].forEach((function(e3) {
                t5.$watch(e3, (function(r3) {
                  if ("data" === e3 && Array.isArray(t5.control.data) && Array.isArray(r3) && t5.control.data.length === r3.length && r3.every((function(e4, r4) {
                    return e4 === t5.control.data[r4];
                  }))) return false;
                  switch (e3) {
                    case "data":
                    case "dataLabel":
                    case "dataValue":
                      t5.control.data = t5.sliderData;
                      break;
                    case "mark":
                      t5.control.marks = t5.sliderMarks;
                      break;
                    default:
                      t5.control[e3] = r3;
                  }
                  ["data", "max", "min", "interval"].indexOf(e3) > -1 && t5.control.syncDotsPos();
                }));
              }));
            } }, { key: "syncValueByPos", value: function() {
              var t5 = this.control.dotsValue;
              this.isDiff(t5, Array.isArray(this.value) ? this.value : [this.value]) && this.$emit("change", 1 === t5.length ? t5[0] : jt(t5), this.focusDotIndex);
            } }, { key: "isDiff", value: function(t5, e3) {
              return t5.length !== e3.length || t5.some((function(t6, r3) {
                return t6 !== e3[r3];
              }));
            } }, { key: "emitError", value: function(t5, e3) {
              this.silent || console.error("[VueSlider error]: ".concat(e3)), this.$emit("error", t5, e3);
            } }, { key: "dragStartOnProcess", value: function(t5) {
              if (this.dragOnClick) {
                this.setScale();
                var e3 = this.getPosByEvent(t5), r3 = this.control.getRecentDot(e3);
                if (this.dots[r3].disabled) return;
                this.dragStart(r3), this.control.setDotPos(e3, this.focusDotIndex), this.lazy || this.syncValueByPos();
              }
            } }, { key: "dragStart", value: function(t5) {
              this.focusDotIndex = t5, this.setScale(), this.states.add(Wt.Drag), this.states.add(Wt.Focus), this.$emit("drag-start", this.focusDotIndex);
            } }, { key: "dragMove", value: function(t5) {
              if (!this.states.has(Wt.Drag)) return false;
              t5.preventDefault();
              var e3 = this.getPosByEvent(t5);
              this.isCrossDot(e3), this.control.setDotPos(e3, this.focusDotIndex), this.lazy || this.syncValueByPos();
              var r3 = this.control.dotsValue;
              this.$emit("dragging", 1 === r3.length ? r3[0] : jt(r3), this.focusDotIndex);
            } }, { key: "isCrossDot", value: function(t5) {
              if (this.canSort) {
                var e3 = this.focusDotIndex, r3 = t5;
                if (r3 > this.dragRange[1] ? (r3 = this.dragRange[1], this.focusDotIndex++) : r3 < this.dragRange[0] && (r3 = this.dragRange[0], this.focusDotIndex--), e3 !== this.focusDotIndex) {
                  var n2 = this.$refs["dot-".concat(this.focusDotIndex)];
                  n2 && n2.$el && n2.$el.focus(), this.control.setDotPos(r3, e3);
                }
              }
            } }, { key: "dragEnd", value: function(t5) {
              var e3 = this;
              if (!this.states.has(Wt.Drag)) return false;
              setTimeout((function() {
                e3.lazy && e3.syncValueByPos(), e3.included && e3.isNotSync ? e3.control.setValue(e3.value) : e3.control.syncDotsPos(), e3.states.delete(Wt.Drag), e3.useKeyboard && !("targetTouches" in t5) || e3.states.delete(Wt.Focus), e3.$emit("drag-end", e3.focusDotIndex);
              }));
            } }, { key: "blurHandle", value: function(t5) {
              if (!this.states.has(Wt.Focus) || !this.$refs.container || this.$refs.container.contains(t5.target)) return false;
              this.states.delete(Wt.Focus);
            } }, { key: "clickHandle", value: function(t5) {
              if (!this.clickable || this.disabled) return false;
              if (!this.states.has(Wt.Drag)) {
                this.setScale();
                var e3 = this.getPosByEvent(t5);
                this.setValueByPos(e3);
              }
            } }, { key: "focus", value: function() {
              var t5 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
              this.states.add(Wt.Focus), this.focusDotIndex = t5;
            } }, { key: "blur", value: function() {
              this.states.delete(Wt.Focus);
            } }, { key: "getValue", value: function() {
              var t5 = this.control.dotsValue;
              return 1 === t5.length ? t5[0] : t5;
            } }, { key: "getIndex", value: function() {
              var t5 = this.control.dotsIndex;
              return 1 === t5.length ? t5[0] : t5;
            } }, { key: "setValue", value: function(t5) {
              this.control.setValue(Array.isArray(t5) ? jt(t5) : [t5]), this.syncValueByPos();
            } }, { key: "setIndex", value: function(t5) {
              var e3 = this, r3 = Array.isArray(t5) ? t5.map((function(t6) {
                return e3.control.getValueByIndex(t6);
              })) : this.control.getValueByIndex(t5);
              this.setValue(r3);
            } }, { key: "setValueByPos", value: function(t5) {
              var e3 = this, r3 = this.control.getRecentDot(t5);
              if (this.disabled || this.dots[r3].disabled) return false;
              this.focusDotIndex = r3, this.control.setDotPos(t5, r3), this.syncValueByPos(), this.useKeyboard && this.states.add(Wt.Focus), setTimeout((function() {
                e3.included && e3.isNotSync ? e3.control.setValue(e3.value) : e3.control.syncDotsPos();
              }));
            } }, { key: "keydownHandle", value: function(t5) {
              var e3 = this;
              if (!this.useKeyboard || !this.states.has(Wt.Focus)) return false;
              var r3 = this.included && this.marks, n2 = G(t5, { direction: this.direction, max: r3 ? this.control.markList.length - 1 : this.control.total, min: 0, hook: this.keydownHook });
              if (n2) {
                t5.preventDefault();
                var o2 = -1, i2 = 0;
                r3 ? (this.control.markList.some((function(t6, r4) {
                  return t6.value === e3.control.dotsValue[e3.focusDotIndex] && (o2 = n2(r4), true);
                })), o2 < 0 ? o2 = 0 : o2 > this.control.markList.length - 1 && (o2 = this.control.markList.length - 1), i2 = this.control.markList[o2].pos) : (o2 = n2(this.control.getIndexByValue(this.control.dotsValue[this.focusDotIndex])), i2 = this.control.parseValue(this.control.getValueByIndex(o2))), this.isCrossDot(i2), this.control.setDotPos(i2, this.focusDotIndex), this.syncValueByPos();
              }
            } }, { key: "getPosByEvent", value: function(t5) {
              return W(t5, this.$refs.rail, this.isReverse, this.zoom)[this.isHorizontal ? "x" : "y"] / this.scale;
            } }, { key: "renderSlot", value: function(t5, e3, r3, n2) {
              var o2 = this.$createElement, i2 = this.$scopedSlots[t5];
              return i2 ? n2 ? i2(e3) : o2("template", { slot: t5 }, [i2(e3)]) : r3;
            } }, { key: "render", value: function() {
              var t5 = this, e3 = arguments[0];
              return e3("div", s()([{ ref: "container", class: this.containerClasses, style: this.containerStyles, on: { click: this.clickHandle, touchstart: this.dragStartOnProcess, mousedown: this.dragStartOnProcess } }, this.$attrs]), [e3("div", { ref: "rail", class: "vue-slider-rail", style: this.railStyle }, [this.processArray.map((function(r3, n2) {
                return t5.renderSlot("process", r3, e3("div", { class: "vue-slider-process", key: "process-".concat(n2), style: r3.style }), true);
              })), this.sliderMarks ? e3("div", { class: "vue-slider-marks" }, [this.control.markList.map((function(r3, n2) {
                var o2;
                return t5.renderSlot("mark", r3, e3("vue-slider-mark", { key: "mark-".concat(n2), attrs: { mark: r3, hideLabel: t5.hideLabel, stepStyle: t5.stepStyle, stepActiveStyle: t5.stepActiveStyle, labelStyle: t5.labelStyle, labelActiveStyle: t5.labelActiveStyle }, style: (o2 = {}, Rt(o2, t5.isHorizontal ? "height" : "width", "100%"), Rt(o2, t5.isHorizontal ? "width" : "height", t5.tailSize), Rt(o2, t5.mainDirection, "".concat(r3.pos, "%")), o2), on: { pressLabel: function(e4) {
                  return t5.clickable && t5.setValueByPos(e4);
                } } }, [t5.renderSlot("step", r3, null), t5.renderSlot("label", r3, null)]), true);
              }))]) : null, this.dots.map((function(r3, n2) {
                var o2;
                return e3("vue-slider-dot", { ref: "dot-".concat(n2), key: "dot-".concat(n2), attrs: Dt({ value: r3.value, disabled: r3.disabled, focus: r3.focus, "dot-style": [r3.style, r3.disabled ? r3.disabledStyle : null, r3.focus ? r3.focusStyle : null], tooltip: r3.tooltip || t5.tooltip, "tooltip-style": [t5.tooltipStyle, r3.tooltipStyle, r3.disabled ? r3.tooltipDisabledStyle : null, r3.focus ? r3.tooltipFocusStyle : null], "tooltip-formatter": Array.isArray(t5.sliderTooltipFormatter) ? t5.sliderTooltipFormatter[n2] : t5.sliderTooltipFormatter, "tooltip-placement": t5.tooltipDirections[n2], role: "slider", "aria-valuenow": r3.value, "aria-valuemin": t5.min, "aria-valuemax": t5.max, "aria-orientation": t5.isHorizontal ? "horizontal" : "vertical", tabindex: "0" }, t5.dotAttrs), style: [t5.dotBaseStyle, (o2 = {}, Rt(o2, t5.mainDirection, "".concat(r3.pos, "%")), Rt(o2, "transition", "".concat(t5.mainDirection, " ").concat(t5.animateTime, "s")), o2)], on: { "drag-start": function() {
                  return t5.dragStart(n2);
                } }, nativeOn: { focus: function() {
                  return !r3.disabled && t5.focus(n2);
                }, blur: function() {
                  return t5.blur();
                } } }, [t5.renderSlot("dot", r3, null), t5.renderSlot("tooltip", r3, null)]);
              })), this.renderSlot("default", { value: this.getValue() }, null, true)])]);
            } }, { key: "tailSize", get: function() {
              return F((this.isHorizontal ? this.height : this.width) || Gt);
            } }, { key: "containerClasses", get: function() {
              return ["vue-slider", ["vue-slider-".concat(this.direction)], { "vue-slider-disabled": this.disabled }];
            } }, { key: "containerStyles", get: function() {
              var t5 = Array.isArray(this.dotSize) ? this.dotSize : [this.dotSize, this.dotSize], e3 = Ot(t5, 2), r3 = e3[0], n2 = e3[1], o2 = this.width ? F(this.width) : this.isHorizontal ? "auto" : F(Gt), i2 = this.height ? F(this.height) : this.isHorizontal ? F(Gt) : "auto";
              return { padding: this.contained ? "".concat(n2 / 2, "px ").concat(r3 / 2, "px") : this.isHorizontal ? "".concat(n2 / 2, "px 0") : "0 ".concat(r3 / 2, "px"), width: o2, height: i2 };
            } }, { key: "processArray", get: function() {
              var t5 = this;
              return this.control.processArray.map((function(e3, r3) {
                var n2, o2 = Ot(e3, 3), i2 = o2[0], a2 = o2[1], s2 = o2[2];
                if (i2 > a2) {
                  var u3 = [a2, i2];
                  i2 = u3[0], a2 = u3[1];
                }
                var l2 = t5.isHorizontal ? "width" : "height";
                return { start: i2, end: a2, index: r3, style: Dt(Dt((n2 = {}, Rt(n2, t5.isHorizontal ? "height" : "width", "100%"), Rt(n2, t5.isHorizontal ? "top" : "left", 0), Rt(n2, t5.mainDirection, "".concat(i2, "%")), Rt(n2, l2, "".concat(a2 - i2, "%")), Rt(n2, "transitionProperty", "".concat(l2, ",").concat(t5.mainDirection)), Rt(n2, "transitionDuration", "".concat(t5.animateTime, "s")), n2), t5.processStyle), s2) };
              }));
            } }, { key: "dotBaseStyle", get: function() {
              var t5, e3 = Array.isArray(this.dotSize) ? this.dotSize : [this.dotSize, this.dotSize], r3 = Ot(e3, 2), n2 = r3[0], o2 = r3[1];
              return t5 = this.isHorizontal ? Rt({ transform: "translate(".concat(this.isReverse ? "50%" : "-50%", ", -50%)"), "-WebkitTransform": "translate(".concat(this.isReverse ? "50%" : "-50%", ", -50%)"), top: "50%" }, "ltr" === this.direction ? "left" : "right", "0") : Rt({ transform: "translate(-50%, ".concat(this.isReverse ? "50%" : "-50%", ")"), "-WebkitTransform": "translate(-50%, ".concat(this.isReverse ? "50%" : "-50%", ")"), left: "50%" }, "btt" === this.direction ? "bottom" : "top", "0"), Dt({ width: "".concat(n2, "px"), height: "".concat(o2, "px") }, t5);
            } }, { key: "mainDirection", get: function() {
              switch (this.direction) {
                case "ltr":
                  return "left";
                case "rtl":
                  return "right";
                case "btt":
                  return "bottom";
                case "ttb":
                  return "top";
              }
            } }, { key: "isHorizontal", get: function() {
              return "ltr" === this.direction || "rtl" === this.direction;
            } }, { key: "isReverse", get: function() {
              return "rtl" === this.direction || "btt" === this.direction;
            } }, { key: "tooltipDirections", get: function() {
              var t5 = this.tooltipPlacement || (this.isHorizontal ? "top" : "left");
              return Array.isArray(t5) ? t5 : this.dots.map((function() {
                return t5;
              }));
            } }, { key: "dots", get: function() {
              var t5 = this;
              return this.control.dotsPos.map((function(e3, r3) {
                return Dt({ pos: e3, index: r3, value: t5.control.dotsValue[r3], focus: t5.states.has(Wt.Focus) && t5.focusDotIndex === r3, disabled: t5.disabled, style: t5.dotStyle }, (Array.isArray(t5.dotOptions) ? t5.dotOptions[r3] : t5.dotOptions) || {});
              }));
            } }, { key: "animateTime", get: function() {
              return this.states.has(Wt.Drag) ? 0 : this.duration;
            } }, { key: "canSort", get: function() {
              return this.order && !this.minRange && !this.maxRange && !this.fixed && this.enableCross;
            } }, { key: "sliderData", get: function() {
              var t5 = this;
              return this.isObjectArrayData(this.data) ? this.data.map((function(e3) {
                return e3[t5.dataValue];
              })) : this.isObjectData(this.data) ? Object.keys(this.data) : this.data;
            } }, { key: "sliderMarks", get: function() {
              var t5 = this;
              return this.marks ? this.marks : this.isObjectArrayData(this.data) ? function(e3) {
                var r3 = { label: e3 };
                return t5.data.some((function(n2) {
                  return n2[t5.dataValue] === e3 && (r3.label = n2[t5.dataLabel], true);
                })), r3;
              } : this.isObjectData(this.data) ? this.data : void 0;
            } }, { key: "sliderTooltipFormatter", get: function() {
              var t5 = this;
              if (this.tooltipFormatter) return this.tooltipFormatter;
              if (this.isObjectArrayData(this.data)) return function(e4) {
                var r3 = "" + e4;
                return t5.data.some((function(n2) {
                  return n2[t5.dataValue] === e4 && (r3 = n2[t5.dataLabel], true);
                })), r3;
              };
              if (this.isObjectData(this.data)) {
                var e3 = this.data;
                return function(t6) {
                  return e3[t6];
                };
              }
            } }, { key: "isNotSync", get: function() {
              var t5 = this.control.dotsValue;
              return Array.isArray(this.value) ? this.value.length !== t5.length || this.value.some((function(e3, r3) {
                return e3 !== t5[r3];
              })) : this.value !== t5[0];
            } }, { key: "dragRange", get: function() {
              var t5 = this.dots[this.focusDotIndex - 1], e3 = this.dots[this.focusDotIndex + 1];
              return [t5 ? t5.pos : -1 / 0, e3 ? e3.pos : 1 / 0];
            } }]), r2;
          })(c.a);
          return u2([h("change", { default: 0 })], t3.prototype, "value", void 0), u2([p({ type: Boolean, default: false })], t3.prototype, "silent", void 0), u2([p({ default: "ltr", validator: function(t4) {
            return ["ltr", "rtl", "ttb", "btt"].indexOf(t4) > -1;
          } })], t3.prototype, "direction", void 0), u2([p({ type: [Number, String] })], t3.prototype, "width", void 0), u2([p({ type: [Number, String] })], t3.prototype, "height", void 0), u2([p({ default: 14 })], t3.prototype, "dotSize", void 0), u2([p({ default: false })], t3.prototype, "contained", void 0), u2([p({ type: Number, default: 0 })], t3.prototype, "min", void 0), u2([p({ type: Number, default: 100 })], t3.prototype, "max", void 0), u2([p({ type: Number, default: 1 })], t3.prototype, "interval", void 0), u2([p({ type: Boolean, default: false })], t3.prototype, "disabled", void 0), u2([p({ type: Boolean, default: true })], t3.prototype, "clickable", void 0), u2([p({ type: Boolean, default: false })], t3.prototype, "dragOnClick", void 0), u2([p({ type: Number, default: 0.5 })], t3.prototype, "duration", void 0), u2([p({ type: [Object, Array] })], t3.prototype, "data", void 0), u2([p({ type: String, default: "value" })], t3.prototype, "dataValue", void 0), u2([p({ type: String, default: "label" })], t3.prototype, "dataLabel", void 0), u2([p({ type: Boolean, default: false })], t3.prototype, "lazy", void 0), u2([p({ type: String, validator: function(t4) {
            return ["none", "always", "focus", "hover", "active"].indexOf(t4) > -1;
          }, default: "active" })], t3.prototype, "tooltip", void 0), u2([p({ type: [String, Array], validator: function(t4) {
            return (Array.isArray(t4) ? t4 : [t4]).every((function(t5) {
              return ["top", "right", "bottom", "left"].indexOf(t5) > -1;
            }));
          } })], t3.prototype, "tooltipPlacement", void 0), u2([p({ type: [String, Array, Function] })], t3.prototype, "tooltipFormatter", void 0), u2([p({ type: Boolean, default: true })], t3.prototype, "useKeyboard", void 0), u2([p(Function)], t3.prototype, "keydownHook", void 0), u2([p({ type: Boolean, default: true })], t3.prototype, "enableCross", void 0), u2([p({ type: Boolean, default: false })], t3.prototype, "fixed", void 0), u2([p({ type: Boolean, default: true })], t3.prototype, "order", void 0), u2([p(Number)], t3.prototype, "minRange", void 0), u2([p(Number)], t3.prototype, "maxRange", void 0), u2([p({ type: [Boolean, Object, Array, Function], default: false })], t3.prototype, "marks", void 0), u2([p({ type: [Boolean, Function], default: true })], t3.prototype, "process", void 0), u2([p({ type: [Number] })], t3.prototype, "zoom", void 0), u2([p(Boolean)], t3.prototype, "included", void 0), u2([p(Boolean)], t3.prototype, "adsorb", void 0), u2([p(Boolean)], t3.prototype, "hideLabel", void 0), u2([p()], t3.prototype, "dotOptions", void 0), u2([p()], t3.prototype, "dotAttrs", void 0), u2([p()], t3.prototype, "railStyle", void 0), u2([p()], t3.prototype, "processStyle", void 0), u2([p()], t3.prototype, "dotStyle", void 0), u2([p()], t3.prototype, "tooltipStyle", void 0), u2([p()], t3.prototype, "stepStyle", void 0), u2([p()], t3.prototype, "stepActiveStyle", void 0), u2([p()], t3.prototype, "labelStyle", void 0), u2([p()], t3.prototype, "labelActiveStyle", void 0), u2([y("value")], t3.prototype, "onValueChanged", null), t3 = u2([f()({ name: "VueSlider", data: function() {
            return { control: null };
          }, components: { VueSliderDot: j, VueSliderMark: U } })], t3), t3;
        })(), qt = Xt;
        qt.VueSliderMark = U, qt.VueSliderDot = j;
        var Kt = qt;
        e["default"] = Kt;
      } })["default"];
    }));
  })(vueSliderComponent_umd_min$1);
  return vueSliderComponent_umd_min$1.exports;
}
var vueSliderComponent_umd_minExports = requireVueSliderComponent_umd_min();
const VueSlider = /* @__PURE__ */ getDefaultExportFromCjs(vueSliderComponent_umd_minExports);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "SliderInput",
  props: /* @__PURE__ */ mergeModels({
    id: {},
    data: {},
    min: {},
    max: {},
    interval: {},
    inputWidth: { default: "5rem" }
  }, {
    "modelValue": {
      required: true
    },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    __expose();
    injectCssToDocument(css);
    const props = __props;
    const value = useModel(__props, "modelValue");
    const __returned__ = { props, value, get VueSlider() {
      return VueSlider;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$a = { class: "d-flex align-items-center" };
const _hoisted_2$a = ["id", "step"];
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$a, [
    createVNode($setup["VueSlider"], {
      modelValue: $setup.value,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.value = $event),
      class: "flex-grow-1",
      max: $props.max,
      min: $props.min,
      "v-data": $props.data,
      interval: $props.interval
    }, null, 8, ["modelValue", "max", "min", "v-data", "interval"]),
    withDirectives(createElementVNode("input", {
      type: "number",
      id: $props.id,
      class: "form-control ms-2",
      style: normalizeStyle({ width: $props.inputWidth }),
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.value = $event),
      step: $props.interval
    }, null, 12, _hoisted_2$a), [
      [vModelText, $setup.value]
    ])
  ]);
}
const SliderInput = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__file", "SliderInput.vue"]]);
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
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
    const emit2 = __emit;
    const gradient = useModel(__props, "modelValue");
    const backgroundImage = computed(() => {
      const { type, angle, start_color, start_pos, end_color, end_pos } = gradient.value;
      if (type === "linear") {
        return `${type}-gradient(${angle}deg, ${start_color} ${start_pos}%, ${end_color} ${end_pos}%)`;
      }
      return `${type}-gradient(${start_color} ${start_pos}%, ${end_color} ${end_pos}%)`;
    });
    const __returned__ = { props, emit: emit2, gradient, backgroundImage, SliderInput };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$9 = { class: "c-box-offset" };
const _hoisted_2$9 = { class: "form-row row" };
const _hoisted_3$9 = { class: "col-6" };
const _hoisted_4$8 = { class: "form-group mb-3" };
const _hoisted_5$8 = ["for"];
const _hoisted_6$8 = ["id"];
const _hoisted_7$8 = { class: "form-group mb-3" };
const _hoisted_8$8 = ["for"];
const _hoisted_9$8 = { class: "col-6" };
const _hoisted_10$8 = { class: "form-group mb-3" };
const _hoisted_11$8 = ["for"];
const _hoisted_12$7 = ["id"];
const _hoisted_13$7 = { class: "form-group mb-3" };
const _hoisted_14$7 = ["for"];
const _hoisted_15$7 = { class: "form-group mb-3" };
const _hoisted_16$7 = ["for"];
const _hoisted_17$6 = ["id"];
const _hoisted_18$4 = { class: "form-group mb-3" };
const _hoisted_19$4 = ["for"];
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_vue_slide_bar = resolveComponent("vue-slide-bar");
  const _directive_color = resolveDirective("color");
  return openBlock(), createElementBlock("div", _hoisted_1$9, [
    createElementVNode("div", {
      class: "c-gradient-preview mb-3",
      style: normalizeStyle([{ "height": "100px", "border": "1px solid rgba(0, 0, 0, .2)" }, { "background-image": $setup.backgroundImage }])
    }, null, 4),
    createElementVNode("div", _hoisted_2$9, [
      createElementVNode("div", _hoisted_3$9, [
        createElementVNode("div", _hoisted_4$8, [
          createElementVNode("label", {
            for: $props.id + "-color1"
          }, "Color 1", 8, _hoisted_5$8),
          withDirectives(createElementVNode("input", {
            type: "text",
            id: $props.id + "-color1",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.gradient.start_color = $event),
            class: "form-control"
          }, null, 8, _hoisted_6$8), [
            [
              vModelText,
              $setup.gradient.start_color,
              void 0,
              { lazy: true }
            ],
            [_directive_color]
          ])
        ]),
        createElementVNode("div", _hoisted_7$8, [
          createElementVNode("label", {
            for: $props.id + "-color1-pos"
          }, "Color 1 Position", 8, _hoisted_8$8),
          createVNode(_component_vue_slide_bar, {
            modelValue: $setup.gradient.start_pos,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.gradient.start_pos = $event)
          }, null, 8, ["modelValue"])
        ])
      ]),
      createElementVNode("div", _hoisted_9$8, [
        createElementVNode("div", _hoisted_10$8, [
          createElementVNode("label", {
            for: $props.id + "-color2"
          }, "Color 2", 8, _hoisted_11$8),
          withDirectives(createElementVNode("input", {
            type: "text",
            id: $props.id + "-color2",
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.gradient.end_color = $event),
            class: "form-control"
          }, null, 8, _hoisted_12$7), [
            [
              vModelText,
              $setup.gradient.end_color,
              void 0,
              { lazy: true }
            ],
            [_directive_color]
          ])
        ]),
        createElementVNode("div", _hoisted_13$7, [
          createElementVNode("label", {
            for: $props.id + "-color2-pos"
          }, "Color 2 Position", 8, _hoisted_14$7),
          createVNode(_component_vue_slide_bar, {
            modelValue: $setup.gradient.end_pos,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.gradient.end_pos = $event)
          }, null, 8, ["modelValue"])
        ])
      ])
    ]),
    createElementVNode("div", _hoisted_15$7, [
      createElementVNode("label", {
        for: $props.id + "-type"
      }, "Gradient Type", 8, _hoisted_16$7),
      withDirectives(createElementVNode("select", {
        id: $props.id + "-type",
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.gradient.type = $event),
        class: "form-select custom-select"
      }, [..._cache[6] || (_cache[6] = [
        createElementVNode("option", { value: "linear" }, "Linear", -1),
        createElementVNode("option", { value: "radial" }, "Radial", -1)
      ])], 8, _hoisted_17$6), [
        [
          vModelSelect,
          $setup.gradient.type,
          void 0,
          { lazy: true }
        ]
      ])
    ]),
    createElementVNode("div", _hoisted_18$4, [
      createElementVNode("label", {
        for: $props.id + "-angle"
      }, "Angle", 8, _hoisted_19$4),
      createVNode($setup["SliderInput"], {
        id: $props.id + "-angle",
        modelValue: $setup.gradient.angle,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.gradient.angle = $event),
        max: 360
      }, null, 8, ["id", "modelValue"])
    ])
  ]);
}
const Gradient = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__file", "Gradient.vue"]]);
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
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
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
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
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
          simpleAlert$1(e.message);
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
const _hoisted_1$8 = {
  ref: "el",
  class: "c-single-image-uploader"
};
const _hoisted_2$8 = {
  key: 0,
  class: "form-group mb-3 c-single-image-preview text-center"
};
const _hoisted_3$8 = ["src"];
const _hoisted_4$7 = {
  key: 1,
  class: "c-single-image-placeholder text-center p-4 mb-3 border rounded"
};
const _hoisted_5$7 = {
  key: 2,
  class: "form-group mb-3 d-flex align-items-center justify-content-center",
  style: { "min-height": "450px" }
};
const _hoisted_6$7 = { class: "form-group mb-3" };
const _hoisted_7$7 = { class: "input-group" };
const _hoisted_8$7 = ["id", "disabled"];
const _hoisted_9$7 = ["disabled"];
const _hoisted_10$7 = ["disabled"];
const _hoisted_11$7 = ["disabled"];
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_tooltip = resolveDirective("tooltip");
  return openBlock(), createElementBlock("div", _hoisted_1$8, [
    $setup.url !== "" && !$setup.uploading ? (openBlock(), createElementBlock("div", _hoisted_2$8, [
      createElementVNode("img", {
        src: $setup.previewUrl,
        alt: "Image",
        class: "img-fluid rounded",
        style: { "max-height": "450px" }
      }, null, 8, _hoisted_3$8)
    ])) : createCommentVNode("", true),
    $setup.url === "" && !$setup.uploading ? (openBlock(), createElementBlock("div", _hoisted_4$7, [..._cache[2] || (_cache[2] = [
      createElementVNode("small", { class: "text-muted" }, "Drag Image Here", -1)
    ])])) : createCommentVNode("", true),
    $setup.uploading ? (openBlock(), createElementBlock("div", _hoisted_5$7, [..._cache[3] || (_cache[3] = [
      createElementVNode("div", { class: "spinner-border" }, null, -1)
    ])])) : createCommentVNode("", true),
    createElementVNode("div", _hoisted_6$7, [
      createElementVNode("div", _hoisted_7$7, [
        withDirectives(createElementVNode("input", {
          id: $props.id,
          type: "text",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.url = $event),
          class: "form-control",
          disabled: $setup.uploading,
          onPaste: $setup.pasteFile
        }, null, 40, _hoisted_8$7), [
          [vModelText, $setup.url]
        ]),
        createElementVNode("button", {
          type: "button",
          class: "btn btn-primary",
          onClick: _cache[1] || (_cache[1] = ($event) => $setup.chooseFile()),
          disabled: $setup.uploading
        }, [..._cache[4] || (_cache[4] = [
          createElementVNode("i", { class: "fa fa-upload" }, null, -1),
          createTextVNode(" Upload ", -1)
        ])], 8, _hoisted_9$7),
        withDirectives((openBlock(), createElementBlock("button", {
          type: "button",
          class: "btn btn-primary",
          onClick: $setup.pasteFromButton,
          disabled: $setup.uploading,
          title: "Paste"
        }, [..._cache[5] || (_cache[5] = [
          createElementVNode("span", { class: "fa fa-paste" }, null, -1)
        ])], 8, _hoisted_10$7)), [
          [_directive_tooltip]
        ]),
        $setup.url !== "" ? (openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: "btn btn-primary",
          onClick: withModifiers($setup.clearUrl, ["stop"]),
          disabled: $setup.uploading
        }, [..._cache[6] || (_cache[6] = [
          createElementVNode("span", { class: "fa fa-times" }, null, -1)
        ])], 8, _hoisted_11$7)) : createCommentVNode("", true)
      ]),
      _cache[7] || (_cache[7] = createElementVNode("small", { class: "form-text text-muted" }, " Paste image url/file or drag and upload image here. ", -1))
    ])
  ], 512);
}
const SingleImage = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__file", "SingleImage.vue"]]);
function usePageBuilderUtilities() {
  return {
    bindSaveButton,
    savePage,
    addTextToClipboard,
    readClipboard,
    duplicateAny,
    duplicateRow,
    duplicateColumn,
    duplicateAddon,
    toFormData,
    isRow,
    isColumn,
    isAddon,
    emptyRow,
    emptyColumn,
    addonBasicOptions
  };
}
function bindSaveButton() {
  const $btn = document.querySelector("[data-task=save]");
  if (!$btn) {
    return;
  }
  let className = "";
  $btn.addEventListener("click", async () => {
    const $icon = $btn.querySelector("[data-spinner]");
    $btn.disabled = true;
    if ($icon) {
      className = $icon.getAttribute("class");
      $icon.setAttribute("class", "spinner-border spinner-border-sm");
    }
    try {
      const res = await savePage();
      console.log("Save Success!");
      return res;
    } finally {
      $btn.disabled = false;
      if ($icon) {
        $icon.setAttribute("class", className);
      }
    }
  });
}
let previousContent = "";
async function savePage() {
  const contentInput = document.querySelector("#input-item-content");
  if (previousContent !== "" && previousContent === contentInput.value) {
    console.warn("[Page] Content not change, there was an error or you didn't edit anything.");
  }
  const { post, isAxiosError } = await useHttpClient();
  try {
    const res = await post(
      "@page_ajax/savePage",
      new FormData(document.querySelector("#admin-form"))
    );
    console.log("儲存完成");
    if (res.data.data.redirect) {
      location.href = res.data.data.redirect;
    }
    return res;
  } catch (e) {
    previousContent = contentInput.value;
    console.error(e);
    if (isAxiosError(e)) {
      simpleAlert$1(e.message, "", "warning");
    }
  }
}
function addTextToClipboard(text) {
  if (typeof text !== "string") {
    text = JSON.stringify(text, null, 4);
  }
  return navigator.clipboard.writeText(text);
}
function readClipboard() {
  return navigator.clipboard.readText();
}
function duplicateAny(data2, child = false) {
  data2 = JSON.parse(JSON.stringify(data2));
  if (Array.isArray(data2)) {
    return data2.map((datum) => duplicateAny(datum));
  }
  if (isRow(data2)) {
    return duplicateRow(data2);
  }
  if (isColumn(data2)) {
    return duplicateColumn(data2);
  }
  if (isAddon(data2)) {
    return duplicateAddon(data2, child);
  }
  throw new Error("Unable to duplicate this type.");
}
function duplicateRow(row) {
  row = JSON.parse(JSON.stringify(row));
  row.id = "row-" + uid();
  row.columns = row.columns.map((column) => duplicateColumn(column));
  return row;
}
function duplicateColumn(column) {
  column = JSON.parse(JSON.stringify(column));
  column.id = "col-" + uid();
  column.addons = column.addons.map((addon) => duplicateAddon(addon)).filter((addon) => addon != null);
  return column;
}
function duplicateAddon(item, child = false) {
  let newItem = JSON.parse(JSON.stringify(item));
  if (item.type === "row" || startsWith(item.id, "row-")) {
    if (child) {
      console.log("Cannot add row to child column.");
      return null;
    }
    newItem.type = "row";
    newItem = duplicateRow(newItem);
  } else {
    newItem.id = "addon-" + uid();
  }
  return newItem;
}
function toFormData(data2) {
  const form = new FormData();
  for (const k in data2) {
    form.append(k, data2[k]);
  }
  return form;
}
function isRow(data2) {
  return startsWith(data2.id, "row-");
}
function isColumn(data2) {
  return startsWith(data2.id, "col-");
}
function isAddon(data2) {
  return startsWith(data2.id, "addon-");
}
function emptyRow() {
  return {
    id: "row-" + uid(),
    disabled: false,
    options: {
      label: "",
      title: {
        text: "",
        element: "h3",
        font_size: {
          lg: "",
          md: "",
          xs: ""
        },
        font_weight: "",
        color: "",
        margin_top: {
          lg: "",
          md: "",
          xs: ""
        },
        margin_bottom: {
          lg: "",
          md: "",
          xs: ""
        }
      },
      subtitle: {
        text: "",
        font_size: {
          lg: "",
          md: "",
          xs: ""
        }
      },
      html_id: "",
      html_class: "",
      html_css: "",
      title_align: "center",
      valign: "top",
      justify_content: "start",
      fluid_row: false,
      no_gutter: false,
      padding: {
        lg: "",
        md: "",
        xs: ""
      },
      margin: {
        lg: "",
        md: "",
        xs: ""
      },
      display: {
        xs: "d-block",
        md: "d-md-block",
        lg: "d-lg-block"
      },
      text_color: "",
      background: {
        type: "none",
        color: "",
        image: {
          url: "",
          overlay: "",
          repeat: "",
          position: "center center",
          attachment: "inherit",
          size: "cover"
        },
        gradient: {
          type: "liner",
          angle: "",
          start_color: "",
          start_pos: "",
          end_color: "",
          end_pos: ""
        },
        video: {
          url: "",
          overlay: ""
        },
        overlay: "",
        parallax: false
      },
      animation: {
        name: "",
        duration: 300,
        delay: 0
      }
    },
    columns: []
  };
}
function emptyColumn(child = false) {
  return {
    id: "col-" + uid(),
    disabled: false,
    addons: [],
    options: {
      html_class: "",
      html_css: "",
      align: "",
      valign: "top",
      padding: {
        xs: "",
        md: "",
        lg: ""
      },
      margin: {
        xs: "",
        md: "",
        lg: ""
      },
      text_color: "",
      width: {
        xs: "",
        md: "",
        lg: child ? "col-lg-6" : "col-lg-3"
      },
      display: {
        xs: "d-block",
        md: "d-md-block",
        lg: "d-lg-block"
      },
      box_shadow: {
        enabled: 0,
        color: "rgba(0, 0, 0, 1)",
        hoffset: 0,
        voffset: 0,
        blur: 0,
        spread: 0
      },
      border: {
        enabled: 0,
        width: {
          lg: 1,
          md: 1,
          xs: 1
        },
        color: "",
        style: "",
        radius: {
          lg: 0,
          md: 0,
          xs: 0
        }
      },
      background: {
        type: "none",
        color: "",
        overlay: "",
        image: {
          url: "",
          repeat: "",
          position: "center center",
          attachment: "inherit",
          size: "cover",
          overlay: ""
        },
        gradient: {
          type: "liner",
          angle: "",
          start_color: "",
          start_pos: "",
          end_color: "",
          end_pos: ""
        },
        video: {
          url: "",
          overlay: ""
        },
        parallax: false
      },
      animation: {
        name: "",
        duration: 300,
        delay: 0
      }
    }
  };
}
function addonBasicOptions() {
  return {
    html_class: "",
    html_css: "",
    label: "",
    title: {
      text: "",
      element: "h3",
      font_size: {
        lg: "",
        md: "",
        xs: ""
      },
      font_weight: "",
      color: "",
      margin_top: {
        lg: "",
        md: "",
        xs: ""
      },
      margin_bottom: {
        lg: "",
        md: "",
        xs: ""
      }
    },
    align: "",
    // valign: 'top',
    padding: {
      xs: "",
      md: "",
      lg: ""
    },
    margin: {
      xs: "",
      md: "",
      lg: ""
    },
    text_color: "",
    display: {
      xs: "d-block",
      md: "d-md-block",
      lg: "d-lg-block"
    },
    box_shadow: {
      enabled: 0,
      color: "rgba(0, 0, 0, 1)",
      hoffset: 0,
      voffset: 0,
      blur: 0,
      spread: 0
    },
    border: {
      enabled: 0,
      width: {
        lg: 1,
        md: 1,
        xs: 1
      },
      color: "",
      style: "",
      radius: {
        lg: 0,
        md: 0,
        xs: 0
      }
    },
    background: {
      type: "none",
      color: "",
      overlay: "",
      image: {
        url: "",
        repeat: "",
        position: "center center",
        attachment: "inherit",
        size: "cover",
        overlay: ""
      },
      gradient: {
        type: "liner",
        angle: "",
        start_color: "",
        start_pos: "",
        end_color: "",
        end_pos: ""
      },
      video: {
        url: "",
        overlay: ""
      },
      parallax: false
    },
    animation: {
      name: "",
      duration: 300,
      delay: 0
    }
  };
}
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
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
    const emit2 = __emit;
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
      emit2("click", $event);
    }
    const __returned__ = { props, getDashedName, emit: emit2, idName, currentValue, changed, click };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$7 = ["for"];
const _hoisted_2$7 = ["id", "name", "value", "disabled"];
const _hoisted_3$7 = ["name", "id", "true-value", "false-value", "disabled", "value", "checked"];
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
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
    }, null, 8, _hoisted_2$7),
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
    }, null, 42, _hoisted_3$7),
    createElementVNode("span", {
      class: normalizeClass(["switch-slider", ["slider-" + $props.shape, $props.color ? "btn-" + $props.color : "btn-default"]])
    }, null, 2)
  ], 10, _hoisted_1$7);
}
const UnicornSwitcher = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__file", "UnicornSwitcher.vue"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "AddonEdit",
  setup(__props, { expose: __expose }) {
    const { addonBasicOptions: addonBasicOptions2, savePage: doSavePage } = usePageBuilderUtilities();
    const u2 = useUnicorn();
    const content = ref();
    const saving = ref(false);
    const modalShow = ref(false);
    const tab = ref();
    const currentTab = ref("general");
    onMounted(() => {
    });
    function edit(data2) {
      const editData = JSON.parse(JSON.stringify(data2));
      editData.options = defaultsDeep(editData.options, addonBasicOptions2());
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
    function saveClose() {
      u2.trigger("addon:save", JSON.parse(JSON.stringify(content.value)));
      close();
    }
    async function savePage2() {
      u2.trigger("addon:save", JSON.parse(JSON.stringify(content.value)));
      saving.value = true;
      await nextTick();
      try {
        return await doSavePage();
      } finally {
        saving.value = false;
      }
    }
    function close() {
      modalShow.value = false;
      nextTick(() => {
        content.value = void 0;
      });
    }
    function dataMigration(data2) {
      const video = data2.options.background.video;
      if (typeof video === "string") {
        data2.options.background.video = { url: video, overlay: "" };
      }
    }
    const options = computed(() => content.value?.options);
    const __returned__ = { addonBasicOptions: addonBasicOptions2, doSavePage, u: u2, content, saving, modalShow, tab, currentTab, edit, updateCurrentTab, saveClose, savePage: savePage2, close, dataMigration, options, BsModal, CssEditor, Animations, BoxOffset, ButtonRadio, ColorInput, Gradient, SingleImage, UnicornSwitcher };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$6 = { class: "modal-header bg-white sticky-top" };
const _hoisted_2$6 = {
  ref: "tab",
  class: "nav nav-pills border-0"
};
const _hoisted_3$6 = { class: "nav-item" };
const _hoisted_4$6 = {
  ref: "generalTab",
  class: "nav-link active",
  "data-toggle": "tab",
  "data-bs-toggle": "tab",
  href: "#addon-edit-general"
};
const _hoisted_5$6 = { class: "ml-auto ms-auto" };
const _hoisted_6$6 = ["disabled"];
const _hoisted_7$6 = {
  key: 0,
  class: "tab-content",
  id: "addon-edit-tab-content"
};
const _hoisted_8$6 = {
  class: "tab-pane fade show active",
  id: "addon-edit-general",
  role: "tabpanel",
  "aria-labelledby": "addon-edit-general-tab"
};
const _hoisted_9$6 = { class: "form-group mb-3" };
const _hoisted_10$6 = { class: "form-group mb-3" };
const _hoisted_11$6 = {
  class: "tab-pane fade",
  id: "addon-edit-layout",
  role: "tabpanel",
  "aria-labelledby": "addon-edit-layout-tab"
};
const _hoisted_12$6 = { class: "form-group mb-3" };
const _hoisted_13$6 = { class: "form-group mb-3" };
const _hoisted_14$6 = { class: "mt-2" };
const _hoisted_15$6 = {
  key: 0,
  class: "form-group mb-3"
};
const _hoisted_16$6 = {
  key: 0,
  style: { "animation-duration": ".3s" }
};
const _hoisted_17$5 = { class: "form-group mb-3" };
const _hoisted_18$3 = { class: "form-row row" };
const _hoisted_19$3 = { class: "form-group mb-3 col-md-6" };
const _hoisted_20$3 = { class: "form-group mb-3 col-md-6" };
const _hoisted_21$2 = { class: "form-row row" };
const _hoisted_22$2 = { class: "form-group mb-3 col-md-6" };
const _hoisted_23$2 = { class: "form-group mb-3 col-md-6" };
const _hoisted_24$2 = {
  key: 0,
  style: { "animation-duration": ".3s" }
};
const _hoisted_25$2 = { class: "form-group mb-3" };
const _hoisted_26$2 = {
  key: 0,
  style: { "animation-duration": ".3s" }
};
const _hoisted_27$2 = { class: "form-group mb-3" };
const _hoisted_28$2 = { class: "form-group mb-3" };
const _hoisted_29$2 = { class: "form-group mb-3" };
const _hoisted_30$2 = { class: "form-group mb-3" };
const _hoisted_31$2 = { class: "form-group mb-3" };
const _hoisted_32$2 = { class: "form-group mb-3" };
const _hoisted_33$2 = { class: "text-muted small mb-3" };
const _hoisted_34$2 = { key: 0 };
const _hoisted_35$2 = {
  class: "tab-pane fade",
  id: "addon-edit-animation",
  role: "tabpanel",
  "aria-labelledby": "addon-edit-animation-tab"
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createVNode($setup["BsModal"], {
      open: $setup.modalShow,
      size: "lg",
      onHidden: _cache[26] || (_cache[26] = ($event) => $setup.modalShow = false),
      backdrop: "static",
      class: "c-modal-addon-edit"
    }, {
      "header-element": withCtx(() => [
        createElementVNode("div", _hoisted_1$6, [
          createElementVNode("ul", _hoisted_2$6, [
            createElementVNode("li", _hoisted_3$6, [
              createElementVNode("a", _hoisted_4$6, " General ", 512)
            ]),
            _cache[27] || (_cache[27] = createElementVNode("li", { class: "nav-item" }, [
              createElementVNode("a", {
                class: "nav-link",
                "data-toggle": "tab",
                "data-bs-toggle": "tab",
                href: "#addon-edit-layout"
              }, " Layout ")
            ], -1)),
            _cache[28] || (_cache[28] = createElementVNode("li", { class: "nav-item" }, [
              createElementVNode("a", {
                class: "nav-link",
                "data-toggle": "tab",
                "data-bs-toggle": "tab",
                href: "#addon-edit-animation"
              }, " Animation ")
            ], -1))
          ], 512),
          createElementVNode("div", _hoisted_5$6, [
            createElementVNode("button", {
              type: "button",
              class: "btn btn-primary",
              onClick: _cache[0] || (_cache[0] = ($event) => $setup.saveClose())
            }, [..._cache[29] || (_cache[29] = [
              createElementVNode("span", { class: "fa fa-check" }, null, -1),
              createTextVNode(" Done ", -1)
            ])]),
            createElementVNode("button", {
              type: "button",
              class: "btn btn-success",
              onClick: _cache[1] || (_cache[1] = ($event) => $setup.savePage()),
              disabled: $setup.saving
            }, [
              createElementVNode("span", {
                class: normalizeClass($setup.saving ? "spinner-border spinner-border-sm" : "fa fa-save")
              }, null, 2),
              _cache[30] || (_cache[30] = createTextVNode(" Save Page ", -1))
            ], 8, _hoisted_6$6),
            createElementVNode("button", {
              type: "button",
              class: "btn btn-secondary",
              onClick: _cache[2] || (_cache[2] = ($event) => $setup.close())
            }, [..._cache[31] || (_cache[31] = [
              createElementVNode("span", { class: "fa fa-times" }, null, -1)
            ])])
          ])
        ])
      ]),
      footer: withCtx(() => [
        createElementVNode("button", {
          type: "button",
          class: "btn btn-success",
          onClick: _cache[24] || (_cache[24] = ($event) => $setup.saveClose())
        }, [..._cache[60] || (_cache[60] = [
          createElementVNode("span", { class: "fa fa-save" }, null, -1),
          createTextVNode(" Save ", -1)
        ])]),
        createElementVNode("button", {
          type: "button",
          class: "btn btn-secondary",
          onClick: _cache[25] || (_cache[25] = ($event) => $setup.close())
        }, [..._cache[61] || (_cache[61] = [
          createElementVNode("span", { class: "fa fa-times" }, null, -1),
          createTextVNode(" Cancel ", -1)
        ])])
      ]),
      default: withCtx(() => [
        $setup.content && $setup.options ? (openBlock(), createElementBlock("div", _hoisted_7$6, [
          createElementVNode("div", _hoisted_8$6, [
            createElementVNode("div", _hoisted_9$6, [
              _cache[32] || (_cache[32] = createElementVNode("label", { for: "input-addon-edit-label" }, "Label", -1)),
              withDirectives(createElementVNode("input", {
                id: "input-addon-edit-label",
                type: "text",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.options.label = $event),
                class: "form-control"
              }, null, 512), [
                [vModelText, $setup.options.label]
              ]),
              _cache[33] || (_cache[33] = createElementVNode("small", { class: "form-text text-muted" }, "Only show when editing page.", -1))
            ]),
            $setup.content.componentName ? (openBlock(), createBlock(resolveDynamicComponent($setup.content.componentName), {
              key: 0,
              modelValue: $setup.content.options,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.content.options = $event),
              "addon-id": $setup.content.id
            }, null, 8, ["modelValue", "addon-id"])) : createCommentVNode("", true),
            createElementVNode("div", _hoisted_10$6, [
              _cache[34] || (_cache[34] = createElementVNode("label", { for: "input-addon-edit-html-class" }, "CSS Class", -1)),
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
          createElementVNode("div", _hoisted_11$6, [
            createVNode($setup["BoxOffset"], {
              modelValue: $setup.options.padding,
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.options.padding = $event)
            }, {
              label: withCtx(() => [..._cache[35] || (_cache[35] = [
                createElementVNode("label", null, "Padding", -1)
              ])]),
              _: 1
            }, 8, ["modelValue"]),
            createVNode($setup["BoxOffset"], {
              modelValue: $setup.options.margin,
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.options.margin = $event)
            }, {
              label: withCtx(() => [..._cache[36] || (_cache[36] = [
                createElementVNode("label", null, "Margin", -1)
              ])]),
              _: 1
            }, 8, ["modelValue"]),
            createElementVNode("div", _hoisted_12$6, [
              _cache[37] || (_cache[37] = createElementVNode("label", { for: "input-addon-edit-text-color" }, "Text Color", -1)),
              createVNode($setup["ColorInput"], {
                id: "input-addon-edit-text-color",
                modelValue: $setup.options.text_color,
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.options.text_color = $event),
                modelModifiers: { lazy: true }
              }, null, 8, ["modelValue"])
            ]),
            createElementVNode("div", _hoisted_13$6, [
              _cache[38] || (_cache[38] = createElementVNode("label", { for: "input-addon-edit-background" }, "Background Type", -1)),
              createElementVNode("div", _hoisted_14$6, [
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
            createVNode(Transition, { name: "fade" }, {
              default: withCtx(() => [
                ["color", "image"].indexOf($setup.options.background.type) !== -1 ? (openBlock(), createElementBlock("div", _hoisted_15$6, [
                  _cache[39] || (_cache[39] = createElementVNode("label", { for: "input-addon-edit-bg-color" }, "Background Color", -1)),
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
            createVNode(Transition, {
              name: "fade",
              mode: "out-in"
            }, {
              default: withCtx(() => [
                ["image"].indexOf($setup.options.background.type) !== -1 ? (openBlock(), createElementBlock("div", _hoisted_16$6, [
                  createElementVNode("div", _hoisted_17$5, [
                    _cache[40] || (_cache[40] = createElementVNode("label", { for: "input-addon-edit-bg-image" }, "Background Image", -1)),
                    createVNode($setup["SingleImage"], {
                      modelValue: $setup.options.background.image.url,
                      "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.options.background.image.url = $event),
                      id: "input-addon-edit-bg-image"
                    }, null, 8, ["modelValue"])
                  ]),
                  createElementVNode("div", _hoisted_18$3, [
                    createElementVNode("div", _hoisted_19$3, [
                      _cache[41] || (_cache[41] = createElementVNode("label", { for: "input-addon-edit-bg-overlay" }, "Background Overlay", -1)),
                      createVNode($setup["ColorInput"], {
                        id: "input-addon-edit-bg-overlay",
                        modelValue: $setup.options.background.overlay,
                        "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $setup.options.background.overlay = $event),
                        modelModifiers: { lazy: true }
                      }, null, 8, ["modelValue"])
                    ]),
                    createElementVNode("div", _hoisted_20$3, [
                      _cache[43] || (_cache[43] = createElementVNode("label", { for: "input-addon-edit-bg-repeat" }, "Background Repeat", -1)),
                      withDirectives(createElementVNode("select", {
                        id: "input-addon-edit-bg-repeat",
                        "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $setup.options.background.image.repeat = $event),
                        class: "form-select custom-select"
                      }, [..._cache[42] || (_cache[42] = [
                        createElementVNode("option", { value: "no-repeat" }, "No Repeat", -1),
                        createElementVNode("option", { value: "" }, "Repeat All", -1),
                        createElementVNode("option", { value: "repeat-x" }, "Repeat X", -1),
                        createElementVNode("option", { value: "repeat-y" }, "Repeat Y", -1),
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
                  createElementVNode("div", _hoisted_21$2, [
                    createElementVNode("div", _hoisted_22$2, [
                      _cache[45] || (_cache[45] = createElementVNode("label", { for: "input-addon-edit-bg-attachment" }, "Background Attachment", -1)),
                      withDirectives(createElementVNode("select", {
                        id: "input-addon-edit-bg-attachment",
                        "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $setup.options.background.image.attachment = $event),
                        class: "form-select custom-select"
                      }, [..._cache[44] || (_cache[44] = [
                        createElementVNode("option", { value: "fixed" }, "Fixed", -1),
                        createElementVNode("option", { value: "scroll" }, "Scroll", -1),
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
                    createElementVNode("div", _hoisted_23$2, [
                      _cache[47] || (_cache[47] = createElementVNode("label", { for: "input-addon-edit-bg-position" }, "Background Position", -1)),
                      withDirectives(createElementVNode("select", {
                        id: "input-addon-edit-bg-position",
                        "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => $setup.options.background.image.position = $event),
                        class: "form-select custom-select"
                      }, [..._cache[46] || (_cache[46] = [
                        createElementVNode("option", { value: "left top" }, "Left Top", -1),
                        createElementVNode("option", { value: "left center" }, "Left Center", -1),
                        createElementVNode("option", { value: "left bottom" }, "Left Bottom", -1),
                        createElementVNode("option", { value: "center top" }, "Center Top", -1),
                        createElementVNode("option", { value: "center center" }, "Center Center", -1),
                        createElementVNode("option", { value: "center bottom" }, "Center Bottom", -1),
                        createElementVNode("option", { value: "right top" }, "Right Top", -1),
                        createElementVNode("option", { value: "right center" }, "Right Center", -1),
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
            createVNode(Transition, {
              name: "fade",
              mode: "out-in"
            }, {
              default: withCtx(() => [
                ["video"].indexOf($setup.options.background.type) !== -1 ? (openBlock(), createElementBlock("div", _hoisted_24$2, [
                  createElementVNode("div", _hoisted_25$2, [
                    _cache[48] || (_cache[48] = createElementVNode("label", { for: "input-addon-edit-bg-video-url" }, "Video URL", -1)),
                    withDirectives(createElementVNode("input", {
                      id: "input-addon-edit-bg-video-url",
                      type: "text",
                      "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => $setup.options.background.video.url = $event),
                      class: "form-control"
                    }, null, 512), [
                      [vModelText, $setup.options.background.video.url]
                    ]),
                    _cache[49] || (_cache[49] = createElementVNode("small", { class: "form-text text-muted" }, " Paste mp4 video URL or Youtube / Vimeo link. ", -1))
                  ])
                ])) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            createVNode(Transition, {
              name: "fade",
              mode: "out-in"
            }, {
              default: withCtx(() => [
                ["video", "image"].indexOf($setup.options.background.type) !== -1 ? (openBlock(), createElementBlock("div", _hoisted_26$2, [
                  createElementVNode("div", _hoisted_27$2, [
                    _cache[50] || (_cache[50] = createElementVNode("label", { for: "input-addon-edit-bg-overlay" }, "Background Overlay", -1)),
                    createVNode($setup["ColorInput"], {
                      id: "input-addon-edit-bg-overlay",
                      modelValue: $setup.options.background.overlay,
                      "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => $setup.options.background.overlay = $event),
                      modelModifiers: { lazy: true }
                    }, null, 8, ["modelValue"])
                  ]),
                  createElementVNode("div", _hoisted_28$2, [
                    _cache[51] || (_cache[51] = createElementVNode("label", { for: "input-addon-edit-hidden-mobile" }, "Parallel Scroll", -1)),
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
            _cache[58] || (_cache[58] = createElementVNode("hr", null, null, -1)),
            createElementVNode("div", _hoisted_29$2, [
              _cache[52] || (_cache[52] = createElementVNode("label", { for: "input-addon-edit-hidden-mobile" }, "Hide in Mobile", -1)),
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
            createElementVNode("div", _hoisted_30$2, [
              _cache[53] || (_cache[53] = createElementVNode("label", { for: "input-addon-edit-hidden-tablet" }, "Hide in Tablet", -1)),
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
            createElementVNode("div", _hoisted_31$2, [
              _cache[54] || (_cache[54] = createElementVNode("label", { for: "input-addon-edit-hidden-desktop" }, "Hide in Desktop", -1)),
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
            _cache[59] || (_cache[59] = createElementVNode("hr", null, null, -1)),
            createElementVNode("div", _hoisted_32$2, [
              _cache[57] || (_cache[57] = createElementVNode("label", { for: "input-addon-edit-css" }, "Custom CSS (SCSS)", -1)),
              createElementVNode("div", _hoisted_33$2, [
                _cache[55] || (_cache[55] = createTextVNode(" Will auto prefix with: ", -1)),
                createElementVNode("code", null, toDisplayString(`#luna-${$setup.content.id}`), 1),
                _cache[56] || (_cache[56] = createTextVNode(", and only affected in this scope. ", -1))
              ]),
              $setup.currentTab === "layout" ? (openBlock(), createElementBlock("div", _hoisted_34$2, [
                createVNode($setup["CssEditor"], {
                  ref: "css-editor",
                  modelValue: $setup.options.html_css,
                  "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => $setup.options.html_css = $event),
                  height: 350
                }, null, 8, ["modelValue"])
              ])) : createCommentVNode("", true)
            ])
          ]),
          createElementVNode("div", _hoisted_35$2, [
            createVNode($setup["Animations"], {
              id: "addon-edit-anim",
              value: $setup.options.animation
            }, null, 8, ["value"])
          ])
        ])) : createCommentVNode("", true)
      ]),
      _: 1
    }, 8, ["open"])
  ]);
}
const AddonEdit = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__file", "AddonEdit.vue"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ColumnEdit",
  setup(__props, { expose: __expose }) {
    const u2 = useUnicorn();
    const content = ref();
    const saving = ref(false);
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
    function saveClose() {
      u2.trigger("column:save", JSON.parse(JSON.stringify(content.value)));
      close();
    }
    async function savePage$1() {
      u2.trigger("column:save", JSON.parse(JSON.stringify(content.value)));
      await nextTick();
      saving.value = true;
      try {
        return await savePage();
      } finally {
        saving.value = false;
      }
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
    const __returned__ = { u: u2, content, saving, modalShow, cssEditor, tab, currentTab, edit, updateCurrentTab, saveClose, savePage: savePage$1, close, widthRange, options, BsModal, CssEditor, UnicornSwitcher, Animations, BoxOffset, ButtonRadio, ColorInput, SingleImage, Gradient, RwdGroup, SliderInput };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$5 = { class: "modal-header bg-white sticky-top" };
const _hoisted_2$5 = {
  ref: "tab",
  class: "nav nav-pills border-0"
};
const _hoisted_3$5 = { class: "nav-item" };
const _hoisted_4$5 = {
  ref: "generalTab",
  class: "nav-link active",
  "data-toggle": "tab",
  "data-bs-toggle": "tab",
  href: "#column-edit-general"
};
const _hoisted_5$5 = { class: "ml-auto ms-auto" };
const _hoisted_6$5 = ["disabled"];
const _hoisted_7$5 = {
  key: 0,
  class: "tab-content",
  id: "column-edit-tab-content"
};
const _hoisted_8$5 = {
  class: "tab-pane fade show active",
  id: "column-edit-general",
  role: "tabpanel",
  "aria-labelledby": "column-edit-general-tab"
};
const _hoisted_9$5 = { class: "form-group mb-3" };
const _hoisted_10$5 = { class: "form-group mb-3" };
const _hoisted_11$5 = { class: "" };
const _hoisted_12$5 = {
  key: 0,
  class: "form-group mb-3",
  style: { "animation-duration": ".3s" }
};
const _hoisted_13$5 = {
  key: 0,
  style: { "animation-duration": ".3s" }
};
const _hoisted_14$5 = { class: "form-group mb-3" };
const _hoisted_15$5 = { class: "form-row row" };
const _hoisted_16$5 = { class: "form-group mb-3 col-md-6" };
const _hoisted_17$4 = { class: "form-group mb-3 col-md-6" };
const _hoisted_18$2 = { class: "form-row row" };
const _hoisted_19$2 = { class: "form-group mb-3 col-md-6" };
const _hoisted_20$2 = { class: "form-group mb-3 col-md-6" };
const _hoisted_21$1 = { class: "form-group mb-3" };
const _hoisted_22$1 = { class: "" };
const _hoisted_23$1 = { class: "form-group mb-3" };
const _hoisted_24$1 = { class: "form-group mb-3" };
const _hoisted_25$1 = { key: 0 };
const _hoisted_26$1 = { class: "form-group mb-3" };
const _hoisted_27$1 = { class: "form-group mb-3" };
const _hoisted_28$1 = { class: "form-group mb-3" };
const _hoisted_29$1 = { key: 1 };
const _hoisted_30$1 = { class: "form-group mb-3" };
const _hoisted_31$1 = { class: "form-row row" };
const _hoisted_32$1 = { class: "col-6" };
const _hoisted_33$1 = { class: "form-group mb-3" };
const _hoisted_34$1 = { class: "col-6" };
const _hoisted_35$1 = { class: "form-group mb-3" };
const _hoisted_36$1 = { class: "form-row row" };
const _hoisted_37$1 = { class: "col-6" };
const _hoisted_38$1 = { class: "form-group mb-3" };
const _hoisted_39$1 = { class: "col-6" };
const _hoisted_40$1 = { class: "form-group mb-3" };
const _hoisted_41 = { class: "form-group mb-3" };
const _hoisted_42 = {
  class: "tab-pane fade",
  id: "column-edit-layout",
  role: "tabpanel",
  "aria-labelledby": "column-edit-layout-tab"
};
const _hoisted_43 = { class: "form-group mb-3" };
const _hoisted_44 = ["value"];
const _hoisted_45 = { class: "form-group mb-3" };
const _hoisted_46 = ["value"];
const _hoisted_47 = { class: "form-group mb-3" };
const _hoisted_48 = ["value"];
const _hoisted_49 = { class: "form-group mb-3" };
const _hoisted_50 = { class: "form-group mb-3" };
const _hoisted_51 = { class: "form-group mb-3" };
const _hoisted_52 = { class: "form-group mb-3" };
const _hoisted_53 = { class: "text-muted small mb-3" };
const _hoisted_54 = { key: 0 };
const _hoisted_55 = {
  class: "tab-pane fade",
  id: "column-edit-animation",
  role: "tabpanel",
  "aria-labelledby": "column-edit-animation-tab"
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createVNode($setup["BsModal"], {
      open: $setup.modalShow,
      size: "lg",
      onHidden: _cache[35] || (_cache[35] = ($event) => $setup.modalShow = false),
      backdrop: "static",
      class: "c-modal-column-edit"
    }, {
      "header-element": withCtx(() => [
        createElementVNode("div", _hoisted_1$5, [
          createElementVNode("ul", _hoisted_2$5, [
            createElementVNode("li", _hoisted_3$5, [
              createElementVNode("a", _hoisted_4$5, " General ", 512)
            ]),
            _cache[36] || (_cache[36] = createElementVNode("li", { class: "nav-item" }, [
              createElementVNode("a", {
                class: "nav-link",
                "data-toggle": "tab",
                "data-bs-toggle": "tab",
                href: "#column-edit-layout"
              }, " Layout ")
            ], -1)),
            _cache[37] || (_cache[37] = createElementVNode("li", { class: "nav-item" }, [
              createElementVNode("a", {
                class: "nav-link",
                "data-toggle": "tab",
                "data-bs-toggle": "tab",
                href: "#column-edit-animation"
              }, " Animation ")
            ], -1))
          ], 512),
          createElementVNode("div", _hoisted_5$5, [
            createElementVNode("button", {
              type: "button",
              class: "btn btn-primary",
              onClick: _cache[0] || (_cache[0] = ($event) => $setup.saveClose())
            }, [..._cache[38] || (_cache[38] = [
              createElementVNode("span", { class: "fa fa-check" }, null, -1),
              createTextVNode(" Done ", -1)
            ])]),
            createElementVNode("button", {
              type: "button",
              class: "btn btn-success",
              onClick: _cache[1] || (_cache[1] = ($event) => $setup.savePage()),
              disabled: $setup.saving
            }, [
              createElementVNode("span", {
                class: normalizeClass($setup.saving ? "spinner-border spinner-border-sm" : "fa fa-save")
              }, null, 2),
              _cache[39] || (_cache[39] = createTextVNode(" Save Page ", -1))
            ], 8, _hoisted_6$5),
            createElementVNode("button", {
              type: "button",
              class: "btn btn-secondary",
              onClick: _cache[2] || (_cache[2] = ($event) => $setup.close())
            }, [..._cache[40] || (_cache[40] = [
              createElementVNode("span", { class: "fa fa-times" }, null, -1)
            ])])
          ])
        ])
      ]),
      footer: withCtx(() => [
        createElementVNode("button", {
          type: "button",
          class: "btn btn-success",
          onClick: _cache[33] || (_cache[33] = ($event) => $setup.saveClose())
        }, [..._cache[86] || (_cache[86] = [
          createElementVNode("span", { class: "fa fa-save" }, null, -1),
          createTextVNode(" Save ", -1)
        ])]),
        createElementVNode("button", {
          type: "button",
          class: "btn btn-secondary",
          onClick: _cache[34] || (_cache[34] = ($event) => $setup.close())
        }, [..._cache[87] || (_cache[87] = [
          createElementVNode("span", { class: "fa fa-times" }, null, -1)
        ])])
      ]),
      default: withCtx(() => [
        $setup.content && $setup.options ? (openBlock(), createElementBlock("div", _hoisted_7$5, [
          createElementVNode("div", _hoisted_8$5, [
            createElementVNode("div", _hoisted_9$5, [
              _cache[41] || (_cache[41] = createElementVNode("label", { for: "input-column-edit-text-color" }, "Text Color", -1)),
              createVNode($setup["ColorInput"], {
                id: "input-column-edit-text-color",
                modelValue: $setup.options.text_color,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.options.text_color = $event),
                modelModifiers: { lazy: true }
              }, null, 8, ["modelValue"])
            ]),
            createElementVNode("div", _hoisted_10$5, [
              _cache[42] || (_cache[42] = createElementVNode("label", { for: "input-column-edit-background" }, "Background Style", -1)),
              createElementVNode("div", _hoisted_11$5, [
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
            createVNode(Transition, {
              name: "fade",
              mode: "out-in"
            }, {
              default: withCtx(() => [
                ["color", "image"].indexOf($setup.options.background.type) !== -1 ? (openBlock(), createElementBlock("div", _hoisted_12$5, [
                  _cache[43] || (_cache[43] = createElementVNode("label", { for: "input-column-edit-bg-color" }, "Background Color", -1)),
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
            createVNode(Transition, {
              name: "fade",
              mode: "out-in"
            }, {
              default: withCtx(() => [
                ["image"].indexOf($setup.options.background.type) !== -1 ? (openBlock(), createElementBlock("div", _hoisted_13$5, [
                  createElementVNode("div", _hoisted_14$5, [
                    _cache[44] || (_cache[44] = createElementVNode("label", { for: "input-column-edit-bg-image" }, "Background Image", -1)),
                    createVNode($setup["SingleImage"], {
                      modelValue: $setup.options.background.image.url,
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.options.background.image.url = $event),
                      id: "input-column-edit-bg-image"
                    }, null, 8, ["modelValue"])
                  ]),
                  createElementVNode("div", _hoisted_15$5, [
                    createElementVNode("div", _hoisted_16$5, [
                      _cache[45] || (_cache[45] = createElementVNode("label", { for: "input-column-edit-bg-overlay" }, "Background Overlay", -1)),
                      createVNode($setup["ColorInput"], {
                        id: "input-column-edit-bg-overlay",
                        modelValue: $setup.options.background.overlay,
                        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.options.background.overlay = $event),
                        modelModifiers: { lazy: true }
                      }, null, 8, ["modelValue"])
                    ]),
                    createElementVNode("div", _hoisted_17$4, [
                      _cache[47] || (_cache[47] = createElementVNode("label", { for: "input-column-edit-bg-repeat" }, "Background Repeat", -1)),
                      withDirectives(createElementVNode("select", {
                        id: "input-column-edit-bg-repeat",
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.options.background.image.repeat = $event),
                        class: "form-select custom-select"
                      }, [..._cache[46] || (_cache[46] = [
                        createElementVNode("option", { value: "no-repeat" }, "No Repeat", -1),
                        createElementVNode("option", { value: "" }, "Repeat All", -1),
                        createElementVNode("option", { value: "repeat-x" }, "Repeat X", -1),
                        createElementVNode("option", { value: "repeat-y" }, "Repeat Y", -1),
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
                  createElementVNode("div", _hoisted_18$2, [
                    createElementVNode("div", _hoisted_19$2, [
                      _cache[49] || (_cache[49] = createElementVNode("label", { for: "input-column-edit-bg-attachment" }, "Background Attachment", -1)),
                      withDirectives(createElementVNode("select", {
                        id: "input-column-edit-bg-attachment",
                        "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.options.background.image.attachment = $event),
                        class: "form-select custom-select"
                      }, [..._cache[48] || (_cache[48] = [
                        createElementVNode("option", { value: "fixed" }, "Fixed", -1),
                        createElementVNode("option", { value: "scroll" }, "Scroll", -1),
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
                    createElementVNode("div", _hoisted_20$2, [
                      _cache[51] || (_cache[51] = createElementVNode("label", { for: "input-column-edit-bg-position" }, "Background Position", -1)),
                      withDirectives(createElementVNode("select", {
                        id: "input-column-edit-bg-position",
                        "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.options.background.image.position = $event),
                        class: "form-select custom-select"
                      }, [..._cache[50] || (_cache[50] = [
                        createElementVNode("option", { value: "left top" }, "Left Top", -1),
                        createElementVNode("option", { value: "left center" }, "Left Center", -1),
                        createElementVNode("option", { value: "left bottom" }, "Left Bottom", -1),
                        createElementVNode("option", { value: "center top" }, "Center Top", -1),
                        createElementVNode("option", { value: "center center" }, "Center Center", -1),
                        createElementVNode("option", { value: "center bottom" }, "Center Bottom", -1),
                        createElementVNode("option", { value: "right top" }, "Right Top", -1),
                        createElementVNode("option", { value: "right center" }, "Right Center", -1),
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
            createElementVNode("div", _hoisted_21$1, [
              _cache[52] || (_cache[52] = createElementVNode("label", { for: "input-addon-edit-text-align" }, "Text Alignment", -1)),
              createElementVNode("div", _hoisted_22$1, [
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
            createElementVNode("div", _hoisted_23$1, [
              _cache[53] || (_cache[53] = createElementVNode("label", { for: "input-column-edit-valign" }, "Vertical Align Middle", -1)),
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
            _cache[69] || (_cache[69] = createElementVNode("hr", null, null, -1)),
            createVNode($setup["BoxOffset"], {
              modelValue: $setup.options.padding,
              "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $setup.options.padding = $event)
            }, {
              label: withCtx(() => [..._cache[54] || (_cache[54] = [
                createElementVNode("label", null, "Padding", -1)
              ])]),
              _: 1
            }, 8, ["modelValue"]),
            createVNode($setup["BoxOffset"], {
              modelValue: $setup.options.margin,
              "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => $setup.options.margin = $event)
            }, {
              label: withCtx(() => [..._cache[55] || (_cache[55] = [
                createElementVNode("label", null, "Margin", -1)
              ])]),
              _: 1
            }, 8, ["modelValue"]),
            _cache[70] || (_cache[70] = createElementVNode("hr", null, null, -1)),
            createElementVNode("div", _hoisted_24$1, [
              _cache[56] || (_cache[56] = createElementVNode("label", { for: "input-column-edit-border-enabled" }, "Border", -1)),
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
            $setup.options.border.enabled == 1 ? (openBlock(), createElementBlock("div", _hoisted_25$1, [
              createVNode($setup["RwdGroup"], { "class-name": "c-border-width" }, createSlots({
                label: withCtx(() => [
                  _cache[57] || (_cache[57] = createElementVNode("label", null, " Border Width ", -1))
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
              createElementVNode("div", _hoisted_26$1, [
                _cache[58] || (_cache[58] = createElementVNode("label", { for: "input-column-edit-border-color" }, "Border Color", -1)),
                createVNode($setup["ColorInput"], {
                  id: "input-column-edit-border-color",
                  modelValue: $setup.options.border.color,
                  "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => $setup.options.border.color = $event),
                  modelModifiers: { lazy: true }
                }, null, 8, ["modelValue"])
              ]),
              createElementVNode("div", _hoisted_27$1, [
                _cache[60] || (_cache[60] = createElementVNode("label", { for: "input-column-edit-border-style" }, "Border Style", -1)),
                withDirectives(createElementVNode("select", {
                  id: "input-column-edit-border-style",
                  "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => $setup.options.border.style = $event),
                  class: "form-select custom-select"
                }, [..._cache[59] || (_cache[59] = [
                  createElementVNode("option", { value: "" }, "None", -1),
                  createElementVNode("option", { value: "solid" }, "Solid", -1),
                  createElementVNode("option", { value: "dotted" }, "Dotted", -1),
                  createElementVNode("option", { value: "dashed" }, "Dashed", -1),
                  createElementVNode("option", { value: "double" }, "Double", -1),
                  createElementVNode("option", { value: "groove" }, "Groove", -1),
                  createElementVNode("option", { value: "ridge" }, "Ridge", -1)
                ])], 512), [
                  [vModelSelect, $setup.options.border.style]
                ])
              ])
            ])) : createCommentVNode("", true),
            createVNode($setup["RwdGroup"], { "class-name": "c-border-radius" }, createSlots({
              label: withCtx(() => [
                _cache[61] || (_cache[61] = createElementVNode("label", null, " Border Radius ", -1))
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
            _cache[71] || (_cache[71] = createElementVNode("hr", null, null, -1)),
            createElementVNode("div", _hoisted_28$1, [
              _cache[62] || (_cache[62] = createElementVNode("label", { for: "input-column-edit-box_shadow-enabled" }, "Box Shadow", -1)),
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
            $setup.options.box_shadow.enabled == 1 ? (openBlock(), createElementBlock("div", _hoisted_29$1, [
              createElementVNode("div", _hoisted_30$1, [
                _cache[63] || (_cache[63] = createElementVNode("label", { for: "input-column-edit-box-shadow-color" }, "Shadow Color", -1)),
                createVNode($setup["ColorInput"], {
                  id: "input-column-edit-box-shadow-color",
                  modelValue: $setup.options.box_shadow.color,
                  "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => $setup.options.box_shadow.color = $event),
                  modelModifiers: { lazy: true }
                }, null, 8, ["modelValue"])
              ]),
              createElementVNode("div", _hoisted_31$1, [
                createElementVNode("div", _hoisted_32$1, [
                  createElementVNode("div", _hoisted_33$1, [
                    _cache[64] || (_cache[64] = createElementVNode("label", null, " Shadow X Offset ", -1)),
                    createVNode($setup["SliderInput"], {
                      modelValue: $setup.options.box_shadow.hoffset,
                      "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => $setup.options.box_shadow.hoffset = $event)
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                createElementVNode("div", _hoisted_34$1, [
                  createElementVNode("div", _hoisted_35$1, [
                    _cache[65] || (_cache[65] = createElementVNode("label", null, " Shadow Y Offset ", -1)),
                    createVNode($setup["SliderInput"], {
                      modelValue: $setup.options.box_shadow.voffset,
                      "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => $setup.options.box_shadow.voffset = $event)
                    }, null, 8, ["modelValue"])
                  ])
                ])
              ]),
              createElementVNode("div", _hoisted_36$1, [
                createElementVNode("div", _hoisted_37$1, [
                  createElementVNode("div", _hoisted_38$1, [
                    _cache[66] || (_cache[66] = createElementVNode("label", null, " Shadow Blur ", -1)),
                    createVNode($setup["SliderInput"], {
                      modelValue: $setup.options.box_shadow.blur,
                      "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => $setup.options.box_shadow.blur = $event)
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                createElementVNode("div", _hoisted_39$1, [
                  createElementVNode("div", _hoisted_40$1, [
                    _cache[67] || (_cache[67] = createElementVNode("label", null, " Shadow Spread ", -1)),
                    createVNode($setup["SliderInput"], {
                      modelValue: $setup.options.box_shadow.spread,
                      "onUpdate:modelValue": _cache[24] || (_cache[24] = ($event) => $setup.options.box_shadow.spread = $event)
                    }, null, 8, ["modelValue"])
                  ])
                ])
              ])
            ])) : createCommentVNode("", true),
            _cache[72] || (_cache[72] = createElementVNode("hr", null, null, -1)),
            createElementVNode("div", _hoisted_41, [
              _cache[68] || (_cache[68] = createElementVNode("label", { for: "input-column-edit-html-class" }, "CSS Class", -1)),
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
          createElementVNode("div", _hoisted_42, [
            createElementVNode("div", _hoisted_43, [
              _cache[73] || (_cache[73] = createElementVNode("label", { for: "input-column-edit-width-desktop" }, "Desktop Width", -1)),
              withDirectives(createElementVNode("select", {
                id: "input-column-edit-width-desktop",
                "onUpdate:modelValue": _cache[26] || (_cache[26] = ($event) => $setup.options.width.lg = $event),
                class: "form-select custom-select"
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList($setup.widthRange(), (w) => {
                  return openBlock(), createElementBlock("option", {
                    value: "col-lg-" + w
                  }, " col-lg-" + toDisplayString(w), 9, _hoisted_44);
                }), 256))
              ], 512), [
                [vModelSelect, $setup.options.width.lg]
              ])
            ]),
            createElementVNode("div", _hoisted_45, [
              _cache[75] || (_cache[75] = createElementVNode("label", { for: "input-column-edit-width-tablet" }, "Tablet Width", -1)),
              withDirectives(createElementVNode("select", {
                id: "input-column-edit-width-tablet",
                "onUpdate:modelValue": _cache[27] || (_cache[27] = ($event) => $setup.options.width.md = $event),
                class: "form-select custom-select"
              }, [
                _cache[74] || (_cache[74] = createElementVNode("option", { value: "" }, "- None -", -1)),
                (openBlock(true), createElementBlock(Fragment, null, renderList($setup.widthRange(), (w) => {
                  return openBlock(), createElementBlock("option", {
                    value: "col-md-" + w
                  }, " col-md-" + toDisplayString(w), 9, _hoisted_46);
                }), 256))
              ], 512), [
                [vModelSelect, $setup.options.width.md]
              ])
            ]),
            createElementVNode("div", _hoisted_47, [
              _cache[77] || (_cache[77] = createElementVNode("label", { for: "input-column-edit-width-mobile" }, "Mobile Width", -1)),
              withDirectives(createElementVNode("select", {
                id: "input-column-edit-width-mobile",
                "onUpdate:modelValue": _cache[28] || (_cache[28] = ($event) => $setup.options.width.xs = $event),
                class: "form-select custom-select"
              }, [
                _cache[76] || (_cache[76] = createElementVNode("option", { value: "" }, "- None -", -1)),
                (openBlock(true), createElementBlock(Fragment, null, renderList($setup.widthRange(), (w) => {
                  return openBlock(), createElementBlock("option", {
                    value: "col-" + w
                  }, " col-" + toDisplayString(w), 9, _hoisted_48);
                }), 256))
              ], 512), [
                [vModelSelect, $setup.options.width.xs]
              ])
            ]),
            _cache[84] || (_cache[84] = createElementVNode("hr", null, null, -1)),
            createElementVNode("div", _hoisted_49, [
              _cache[78] || (_cache[78] = createElementVNode("label", { for: "input-column-edit-hidden-mobile" }, "Hide in Mobile", -1)),
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
            createElementVNode("div", _hoisted_50, [
              _cache[79] || (_cache[79] = createElementVNode("label", { for: "input-column-edit-hidden-tablet" }, "Hide in Tablet", -1)),
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
            createElementVNode("div", _hoisted_51, [
              _cache[80] || (_cache[80] = createElementVNode("label", { for: "input-column-edit-hidden-desktop" }, "Hide in Desktop", -1)),
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
            _cache[85] || (_cache[85] = createElementVNode("hr", null, null, -1)),
            createElementVNode("div", _hoisted_52, [
              _cache[83] || (_cache[83] = createElementVNode("label", { for: "input-column-edit-css" }, "Custom CSS (SCSS)", -1)),
              createElementVNode("div", _hoisted_53, [
                _cache[81] || (_cache[81] = createTextVNode(" Will auto prefix with: ", -1)),
                createElementVNode("code", null, toDisplayString(`#luna-${$setup.content.id}`), 1),
                _cache[82] || (_cache[82] = createTextVNode(", and only affected in this scope. ", -1))
              ]),
              $setup.currentTab === "layout" ? (openBlock(), createElementBlock("div", _hoisted_54, [
                createVNode($setup["CssEditor"], {
                  ref: "cssEditor",
                  modelValue: $setup.options.html_css,
                  "onUpdate:modelValue": _cache[32] || (_cache[32] = ($event) => $setup.options.html_css = $event),
                  height: 350
                }, null, 8, ["modelValue"])
              ])) : createCommentVNode("", true)
            ])
          ]),
          createElementVNode("div", _hoisted_55, [
            createVNode($setup["Animations"], {
              id: "column-edit-anim",
              value: $setup.options.animation
            }, null, 8, ["value"])
          ])
        ])) : createCommentVNode("", true)
      ]),
      _: 1
    }, 8, ["open"])
  ]);
}
const ColumnEdit = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__file", "ColumnEdit.vue"]]);
var sweetalert_min$2 = { exports: {} };
var sweetalert_min$1 = sweetalert_min$2.exports;
var hasRequiredSweetalert_min;
function requireSweetalert_min() {
  if (hasRequiredSweetalert_min) return sweetalert_min$2.exports;
  hasRequiredSweetalert_min = 1;
  (function(module2, exports2) {
    !(function(t, e) {
      module2.exports = e();
    })(sweetalert_min$1, function() {
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
            var l2 = h++;
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
        }), g = null, h = 0, w = [], y = n(15);
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
        }, h = function(t2) {
          t2[t2.length - 1].addEventListener("keydown", m);
        }, w = function(t2) {
          t2[0].addEventListener("keydown", b);
        }, y = function() {
          var t2 = i.getNode(c), e2 = t2.querySelectorAll("." + l);
          e2.length && (h(e2), w(e2));
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
  })(sweetalert_min$2);
  return sweetalert_min$2.exports;
}
var sweetalert_minExports = requireSweetalert_min();
const swal = /* @__PURE__ */ getDefaultExportFromCjs(sweetalert_minExports);
const sweetalert_min = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: swal
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
      addTextToClipboard: addTextToClipboard2,
      duplicateAddon: duplicateAddon2,
      duplicateAny: duplicateAny2,
      emptyColumn: emptyColumn2,
      emptyRow: emptyRow2,
      readClipboard: readClipboard2,
      isRow: isRow2,
      isColumn: isColumn2,
      isAddon: isAddon2
    } = usePageBuilderUtilities();
    const props = __props;
    const emits = __emit;
    const u2 = useUnicorn();
    const content = ref(props.value);
    const drag = ref(false);
    content.value = defaultsDeep(content.value, emptyRow2());
    function addNewColumn() {
      content.value.columns.push(emptyColumn2(props.child));
    }
    function copy() {
      addTextToClipboard2(content.value);
    }
    async function paste(append = false) {
      const text = await readClipboard2();
      pasteData(text, append);
    }
    async function pasteData(text, append = false) {
      try {
        const data2 = JSON.parse(text);
        if (Array.isArray(data2)) {
          emits("paste-page", data2);
          return;
        }
        if (isAddon2(data2)) {
          simpleAlert$1("Unable to paste addon here.");
          return;
        }
        if (isColumn2(data2)) {
          duplicateColumn2(data2, content.value.columns.length - 1);
          return;
        }
        if (isRow2(data2)) {
          if (append) {
            duplicate(data2);
            return;
          }
          const v = await swal({
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
                duplicateColumn2(column, data2.columns.length - 1);
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
    function duplicateColumn2(column, i) {
      column = duplicateAny2(column);
      content.value.columns.splice(i + 1, 0, column);
    }
    function handleDuplicateAddons(addons2) {
      return addons2.map((addon) => {
        const dup = duplicateAddon2(addon, props.child);
        if (dup === null) {
          return null;
        }
        if (isAddon2(dup)) {
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
      return emptyRow2();
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
    const __returned__ = { addTextToClipboard: addTextToClipboard2, duplicateAddon: duplicateAddon2, duplicateAny: duplicateAny2, emptyColumn: emptyColumn2, emptyRow: emptyRow2, readClipboard: readClipboard2, isRow: isRow2, isColumn: isColumn2, isAddon: isAddon2, props, emits, u: u2, content, drag, addNewColumn, copy, paste, pasteData, duplicate, duplicateColumn: duplicateColumn2, handleDuplicateAddons, edit, toggleDisabled, remove, getEmptyRow, deleteColumn, openTemplates, columns, options, get VueDraggable() {
      return VueDraggable;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$4 = ["disabled"];
const _hoisted_2$4 = { class: "page-row__title-bar d-flex mb-2" };
const _hoisted_3$4 = { class: "page-row__title d-flex" };
const _hoisted_4$4 = { class: "page-row__move-cursor" };
const _hoisted_5$4 = {
  class: "badge bg-secondary me-2",
  style: { "cursor": "move" }
};
const _hoisted_6$4 = ["is"];
const _hoisted_7$4 = {
  key: 0,
  class: "ms-3"
};
const _hoisted_8$4 = { class: "page-row__actions ml-auto ms-auto text-nowrap" };
const _hoisted_9$4 = { key: 0 };
const _hoisted_10$4 = { key: 0 };
const _hoisted_11$4 = { class: "dropdown d-inline-block" };
const _hoisted_12$4 = { class: "dropdown-menu dropdown-menu-right dropdown-menu-end" };
const _hoisted_13$4 = { class: "card" };
const _hoisted_14$4 = { class: "page-row__bottom-toolbar mt-3 text-center" };
const _hoisted_15$4 = { class: "page-builder__bottom-toolbar text-center" };
const _hoisted_16$4 = { class: "btn-group" };
const _hoisted_17$3 = { class: "dropdown-menu dropdown-menu-end dropdown-menu-right" };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Column = resolveComponent("Column");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["bg-light", { "p-2": $props.child, "rounded": $props.child }]),
    disabled: $setup.content.disabled ? true : null
  }, [
    createElementVNode("div", _hoisted_2$4, [
      createElementVNode("div", _hoisted_3$4, [
        createElementVNode("div", _hoisted_4$4, [
          createElementVNode("span", _hoisted_5$4, [
            createElementVNode("span", {
              class: normalizeClass(["fa fa-fw fa-arrows-alt-v", [$props.moveHandle]])
            }, null, 2)
          ])
        ]),
        createElementVNode("div", {
          is: $props.child ? "strong" : "h5"
        }, toDisplayString($setup.options.label === "" ? "ROW" : $setup.options.label), 9, _hoisted_6$4),
        _ctx.$debug ? (openBlock(), createElementBlock("small", _hoisted_7$4, toDisplayString($setup.content.id), 1)) : createCommentVNode("", true)
      ]),
      createElementVNode("div", _hoisted_8$4, [
        !$setup.content.disabled ? (openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: "btn btn-sm btn-primary",
          onClick: _cache[0] || (_cache[0] = ($event) => $setup.addNewColumn())
        }, [
          _cache[13] || (_cache[13] = createElementVNode("span", { class: "fa fa-plus" }, null, -1)),
          !$props.child ? (openBlock(), createElementBlock("span", _hoisted_9$4, " New Column ")) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        !$setup.content.disabled ? (openBlock(), createElementBlock("button", {
          key: 1,
          type: "button",
          class: "btn btn-sm btn-outline-primary",
          onClick: $setup.edit
        }, [
          _cache[14] || (_cache[14] = createElementVNode("span", { class: "fa fa-edit" }, null, -1)),
          !$props.child ? (openBlock(), createElementBlock("span", _hoisted_10$4, " Edit ")) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        createElementVNode("div", _hoisted_11$4, [
          _cache[21] || (_cache[21] = createElementVNode("button", {
            href: "#",
            class: "btn btn-sm btn-outline-primary",
            "data-toggle": "dropdown",
            "data-bs-toggle": "dropdown"
          }, [
            createElementVNode("span", { class: "fa fa-cog" })
          ], -1)),
          createElementVNode("div", _hoisted_12$4, [
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
            !$setup.content.disabled ? (openBlock(), createElementBlock("a", {
              key: 0,
              class: "dropdown-item",
              href: "#",
              onClick: _cache[2] || (_cache[2] = withModifiers(($event) => $setup.duplicate(), ["prevent"]))
            }, [..._cache[15] || (_cache[15] = [
              createElementVNode("span", { class: "fa fa-fw fa-clone" }, null, -1),
              createTextVNode(" Duplicate ", -1)
            ])])) : createCommentVNode("", true),
            !$setup.content.disabled ? (openBlock(), createElementBlock("a", {
              key: 1,
              class: "dropdown-item",
              href: "#",
              onClick: withModifiers($setup.copy, ["prevent"])
            }, [..._cache[16] || (_cache[16] = [
              createElementVNode("span", { class: "fa fa-fw fa-copy" }, null, -1),
              createTextVNode(" Copy ", -1)
            ])])) : createCommentVNode("", true),
            !$setup.content.disabled ? (openBlock(), createElementBlock("a", {
              key: 2,
              class: "dropdown-item",
              href: "#",
              onClick: withModifiers($setup.paste, ["prevent"])
            }, [..._cache[17] || (_cache[17] = [
              createElementVNode("span", { class: "fa fa-fw fa-paste" }, null, -1),
              createTextVNode(" Paste ", -1)
            ])])) : createCommentVNode("", true),
            !$setup.content.disabled ? (openBlock(), createElementBlock("a", {
              key: 3,
              class: "dropdown-item",
              href: "#",
              onClick: withModifiers($setup.openTemplates, ["prevent"])
            }, [..._cache[18] || (_cache[18] = [
              createElementVNode("span", { class: "fa fa-fw fa-file-code" }, null, -1),
              createTextVNode(" Insert Template ", -1)
            ])])) : createCommentVNode("", true),
            createElementVNode("a", {
              class: "dropdown-item",
              href: "#",
              onClick: _cache[3] || (_cache[3] = withModifiers(($event) => _ctx.$trigger("tmpl.save", $setup.content, "row"), ["prevent"]))
            }, [..._cache[19] || (_cache[19] = [
              createElementVNode("span", { class: "fa fa-fw fa-save" }, null, -1),
              createTextVNode(" Save as Template ", -1)
            ])]),
            createElementVNode("a", {
              class: "dropdown-item",
              href: "#",
              onClick: _cache[4] || (_cache[4] = withModifiers(($event) => $setup.remove(), ["prevent"]))
            }, [..._cache[20] || (_cache[20] = [
              createElementVNode("span", { class: "fa fa-fw fa-trash" }, null, -1),
              createTextVNode(" Delete ", -1)
            ])])
          ])
        ])
      ])
    ]),
    createElementVNode("div", _hoisted_13$4, [
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
            return openBlock(), createBlock(_component_Column, {
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
          createElementVNode("a", {
            class: "page-row__body-placeholder text-center p-4 border text-secondary col-12",
            "commented-v-if": "addons.length === 0 && !drag",
            href: "#",
            onClick: _cache[5] || (_cache[5] = withModifiers(($event) => $setup.addNewColumn(), ["prevent"]))
          }, [..._cache[22] || (_cache[22] = [
            createElementVNode("span", { class: "fa fa-plus-square fa-3x" }, null, -1)
          ])])
        ]),
        _: 1
      }, 16, ["class", "modelValue"])
    ]),
    createElementVNode("div", _hoisted_14$4, [
      createElementVNode("div", _hoisted_15$4, [
        createElementVNode("div", _hoisted_16$4, [
          createElementVNode("button", {
            type: "button",
            onClick: _cache[10] || (_cache[10] = ($event) => _ctx.$emit("add-new")),
            class: "btn btn-sm btn-outline-secondary"
          }, " Add New Row "),
          _cache[25] || (_cache[25] = createElementVNode("button", {
            type: "button",
            class: "btn btn-outline-secondary btn-sm dropdown-toggle dropdown-toggle-split",
            "data-toggle": "dropdown",
            "data-bs-toggle": "dropdown"
          }, [
            createElementVNode("span", { class: "visually-hidden sr-only" }, "Toggle Dropdown")
          ], -1)),
          createElementVNode("div", _hoisted_17$3, [
            createElementVNode("button", {
              type: "button",
              class: "dropdown-item",
              onClick: _cache[11] || (_cache[11] = ($event) => $setup.paste(true))
            }, [..._cache[23] || (_cache[23] = [
              createElementVNode("span", { class: "fa fa-fw fa-paste" }, null, -1),
              createTextVNode(" Paste ", -1)
            ])]),
            !$props.child ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              class: "dropdown-item",
              onClick: _cache[12] || (_cache[12] = ($event) => _ctx.$emit("open-templates"))
            }, [..._cache[24] || (_cache[24] = [
              createElementVNode("span", { class: "fa fa-fw fa-file-code" }, null, -1),
              createTextVNode(" Insert Template ", -1)
            ])])) : createCommentVNode("", true)
          ])
        ])
      ])
    ])
  ], 10, _hoisted_1$4);
}
const RowBox = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__file", "RowBox.vue"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "RwdTitleOptions",
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
    const options = useModel(__props, "modelValue");
    const prepared = ref(false);
    onMounted(() => {
      setTimeout(() => {
        prepared.value = true;
      }, 150);
    });
    const __returned__ = { props, options, prepared, RwdGroup, ColorInput, SliderInput };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$3 = { class: "c-title-options" };
const _hoisted_2$3 = { class: "form-row row" };
const _hoisted_3$3 = { class: "col-6" };
const _hoisted_4$3 = { class: "form-group mb-3" };
const _hoisted_5$3 = ["for"];
const _hoisted_6$3 = ["id"];
const _hoisted_7$3 = ["value"];
const _hoisted_8$3 = { class: "col" };
const _hoisted_9$3 = { class: "form-group mb-3" };
const _hoisted_10$3 = ["for"];
const _hoisted_11$3 = { class: "form-row row" };
const _hoisted_12$3 = { class: "col-6" };
const _hoisted_13$3 = { class: "col-6" };
const _hoisted_14$3 = { class: "form-group mb-3" };
const _hoisted_15$3 = {
  key: 0,
  class: ""
};
const _hoisted_16$3 = { class: "form-row row" };
const _hoisted_17$2 = { class: "col-6" };
const _hoisted_18$1 = ["onUpdate:modelValue"];
const _hoisted_19$1 = { class: "col-6" };
const _hoisted_20$1 = ["onUpdate:modelValue"];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    createElementVNode("div", _hoisted_2$3, [
      createElementVNode("div", _hoisted_3$3, [
        createElementVNode("div", _hoisted_4$3, [
          createElementVNode("label", {
            for: $props.id + "title-element"
          }, " Title Element ", 8, _hoisted_5$3),
          withDirectives(createElementVNode("select", {
            id: $props.id + "title-element",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.options.element = $event),
            class: "form-select custom-select"
          }, [
            (openBlock(), createElementBlock(Fragment, null, renderList([1, 2, 3, 4, 5, 6], (i) => {
              return createElementVNode("option", {
                value: "h" + i
              }, " h" + toDisplayString(i), 9, _hoisted_7$3);
            }), 64))
          ], 8, _hoisted_6$3), [
            [vModelSelect, $setup.options.element]
          ])
        ])
      ]),
      createElementVNode("div", _hoisted_8$3, [
        createElementVNode("div", _hoisted_9$3, [
          createElementVNode("label", {
            for: $props.id + "title-color"
          }, "Title Color", 8, _hoisted_10$3),
          createVNode($setup["ColorInput"], {
            id: $props.id + "title-color",
            modelValue: $setup.options.color,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.options.color = $event),
            modelModifiers: { lazy: true }
          }, null, 8, ["id", "modelValue"])
        ])
      ])
    ]),
    createElementVNode("div", _hoisted_11$3, [
      createElementVNode("div", _hoisted_12$3, [
        createVNode($setup["RwdGroup"], { "class-name": "c-title-font-size" }, createSlots({
          label: withCtx(() => [
            _cache[3] || (_cache[3] = createElementVNode("label", null, " Title Font Size ", -1))
          ]),
          _: 2
        }, [
          renderList(["lg", "md", "xs"], (size) => {
            return {
              name: size,
              fn: withCtx(() => [
                createVNode($setup["SliderInput"], {
                  modelValue: $setup.options.font_size[size],
                  "onUpdate:modelValue": ($event) => $setup.options.font_size[size] = $event,
                  max: 500
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ])
            };
          })
        ]), 1024)
      ]),
      createElementVNode("div", _hoisted_13$3, [
        createElementVNode("div", _hoisted_14$3, [
          _cache[4] || (_cache[4] = createElementVNode("label", null, " Title Font Weight ", -1)),
          $setup.prepared ? (openBlock(), createElementBlock("div", _hoisted_15$3, [
            createVNode($setup["SliderInput"], {
              modelValue: $setup.options.font_weight,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.options.font_weight = $event),
              data: ["", 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1e3],
              max: 1e3
            }, null, 8, ["modelValue"])
          ])) : createCommentVNode("", true)
        ])
      ])
    ]),
    createElementVNode("div", _hoisted_16$3, [
      createElementVNode("div", _hoisted_17$2, [
        createVNode($setup["RwdGroup"], { "class-name": "c-title-margin_top" }, createSlots({
          label: withCtx(() => [
            _cache[5] || (_cache[5] = createElementVNode("label", null, " Title Margin Top ", -1))
          ]),
          _: 2
        }, [
          renderList(["lg", "md", "xs"], (size) => {
            return {
              name: size,
              fn: withCtx(() => [
                withDirectives(createElementVNode("input", {
                  type: "number",
                  "onUpdate:modelValue": ($event) => $setup.options.margin_top[size] = $event,
                  class: "form-control"
                }, null, 8, _hoisted_18$1), [
                  [vModelText, $setup.options.margin_top[size]]
                ])
              ])
            };
          })
        ]), 1024)
      ]),
      createElementVNode("div", _hoisted_19$1, [
        createVNode($setup["RwdGroup"], { "class-name": "c-title-margin_bottom" }, createSlots({
          label: withCtx(() => [
            _cache[6] || (_cache[6] = createElementVNode("label", null, " Title Margin Bottom ", -1))
          ]),
          _: 2
        }, [
          renderList(["lg", "md", "xs"], (size) => {
            return {
              name: size,
              fn: withCtx(() => [
                withDirectives(createElementVNode("input", {
                  type: "number",
                  "onUpdate:modelValue": ($event) => $setup.options.margin_bottom[size] = $event,
                  class: "form-control"
                }, null, 8, _hoisted_20$1), [
                  [vModelText, $setup.options.margin_bottom[size]]
                ])
              ])
            };
          })
        ]), 1024)
      ])
    ])
  ]);
}
const RwdTitleOptions = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "RwdTitleOptions.vue"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "RowEdit",
  setup(__props, { expose: __expose }) {
    const { savePage: doSavePage } = usePageBuilderUtilities();
    const u2 = useUnicorn();
    const content = ref();
    const sticky = ref(false);
    const saving = ref(false);
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
    function saveClose() {
      u2.trigger("row:save", JSON.parse(JSON.stringify(content.value)));
      close();
    }
    async function savePage2() {
      u2.trigger("row:save", JSON.parse(JSON.stringify(content.value)));
      await nextTick();
      saving.value = true;
      try {
        return await doSavePage();
      } finally {
        saving.value = false;
      }
    }
    function close() {
      modalShow.value = false;
      sticky.value = false;
      nextTick(() => {
        content.value = void 0;
      });
    }
    const options = computed(() => content.value?.options);
    const __returned__ = { doSavePage, u: u2, content, sticky, saving, modalShow, tab, currentTab, cssEditor, edit, updateCurrentTab, saveClose, savePage: savePage2, close, options, BsModal, CssEditor, UnicornSwitcher, ColorInput, RwdGroup, Animations, BoxOffset, ButtonRadio, SingleImage, Gradient, SliderInput, RwdTitleOptions };
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
    createVNode($setup["BsModal"], {
      open: $setup.modalShow,
      size: "lg",
      onHidden: _cache[33] || (_cache[33] = ($event) => $setup.modalShow = false),
      backdrop: "static",
      class: "c-modal-row-edit"
    }, {
      "header-element": withCtx(() => [
        createElementVNode("div", {
          class: normalizeClass(["modal-header bg-white", { "sticky-top": $setup.sticky }])
        }, [
          createElementVNode("ul", _hoisted_1$2, [..._cache[34] || (_cache[34] = [
            createElementVNode("li", { class: "nav-item" }, [
              createElementVNode("a", {
                class: "nav-link active",
                "data-toggle": "tab",
                "data-bs-toggle": "tab",
                href: "#row-edit-general"
              }, " General ")
            ], -1),
            createElementVNode("li", { class: "nav-item" }, [
              createElementVNode("a", {
                class: "nav-link",
                "data-toggle": "tab",
                "data-bs-toggle": "tab",
                href: "#row-edit-layout"
              }, " Layout ")
            ], -1),
            createElementVNode("li", { class: "nav-item" }, [
              createElementVNode("a", {
                class: "nav-link",
                "data-toggle": "tab",
                "data-bs-toggle": "tab",
                href: "#row-edit-animation"
              }, " Animation ")
            ], -1)
          ])], 512),
          createElementVNode("div", _hoisted_2$2, [
            createElementVNode("button", {
              type: "button",
              class: "btn btn-primary btn--save",
              onClick: _cache[0] || (_cache[0] = ($event) => $setup.saveClose())
            }, [..._cache[35] || (_cache[35] = [
              createElementVNode("span", { class: "fa fa-check" }, null, -1),
              createTextVNode(" Done ", -1)
            ])]),
            createElementVNode("button", {
              type: "button",
              class: "btn btn-success btn--save-page",
              onClick: _cache[1] || (_cache[1] = ($event) => $setup.savePage()),
              disabled: $setup.saving
            }, [
              createElementVNode("span", {
                class: normalizeClass($setup.saving ? "spinner-border spinner-border-sm" : "fa fa-save")
              }, null, 2),
              _cache[36] || (_cache[36] = createTextVNode(" Save Page ", -1))
            ], 8, _hoisted_3$2),
            createElementVNode("button", {
              type: "button",
              class: "btn btn-secondary btn--close",
              onClick: $setup.close
            }, [..._cache[37] || (_cache[37] = [
              createElementVNode("span", { class: "fa fa-times" }, null, -1)
            ])])
          ])
        ], 2)
      ]),
      footer: withCtx(() => [
        createElementVNode("button", {
          type: "button",
          class: "btn btn-success",
          onClick: _cache[31] || (_cache[31] = ($event) => $setup.saveClose())
        }, [..._cache[81] || (_cache[81] = [
          createElementVNode("span", { class: "fa fa-save" }, null, -1),
          createTextVNode(" Save ", -1)
        ])]),
        createElementVNode("button", {
          type: "button",
          class: "btn btn-secondary",
          onClick: _cache[32] || (_cache[32] = ($event) => $setup.close())
        }, [..._cache[82] || (_cache[82] = [
          createElementVNode("span", { class: "fa fa-times" }, null, -1),
          createTextVNode(" Cancel ", -1)
        ])])
      ]),
      default: withCtx(() => [
        $setup.content && $setup.options ? (openBlock(), createElementBlock("div", _hoisted_4$2, [
          createElementVNode("div", _hoisted_5$2, [
            createElementVNode("div", _hoisted_6$2, [
              _cache[38] || (_cache[38] = createElementVNode("label", { for: "input-row-edit-label" }, "Label", -1)),
              withDirectives(createElementVNode("input", {
                id: "input-row-edit-label",
                type: "text",
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.options.label = $event),
                class: "form-control"
              }, null, 512), [
                [vModelText, $setup.options.label]
              ]),
              _cache[39] || (_cache[39] = createElementVNode("small", { class: "form-text text-muted" }, "This label only show in edit page.", -1))
            ]),
            _cache[49] || (_cache[49] = createElementVNode("hr", null, null, -1)),
            createElementVNode("div", _hoisted_7$2, [
              _cache[40] || (_cache[40] = createElementVNode("label", { for: "input-row-edit-title-text" }, "Main Title", -1)),
              withDirectives(createElementVNode("textarea", {
                id: "input-row-edit-title-text",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.options.title.text = $event),
                class: "form-control"
              }, null, 512), [
                [vModelText, $setup.options.title.text]
              ]),
              _cache[41] || (_cache[41] = createElementVNode("small", { class: "form-text text-muted" }, "Title of this section, keep empty to hide it.", -1))
            ]),
            $setup.options.title.text !== "" ? (openBlock(), createBlock($setup["RwdTitleOptions"], {
              key: 0,
              id: "input-row-edit",
              modelValue: $setup.content.options.title,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.content.options.title = $event)
            }, null, 8, ["modelValue"])) : createCommentVNode("", true),
            _cache[50] || (_cache[50] = createElementVNode("hr", null, null, -1)),
            createElementVNode("div", _hoisted_8$2, [
              _cache[42] || (_cache[42] = createElementVNode("label", { for: "input-row-edit-subtitle-text" }, "Subtitle", -1)),
              withDirectives(createElementVNode("textarea", {
                id: "input-row-edit-subtitle-text",
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.options.subtitle.text = $event),
                class: "form-control"
              }, null, 512), [
                [vModelText, $setup.options.subtitle.text]
              ]),
              _cache[43] || (_cache[43] = createElementVNode("small", { class: "form-text text-muted" }, "Subtitle of this section, keep empty to hide it.", -1))
            ]),
            $setup.options.subtitle.text !== "" ? (openBlock(), createElementBlock("div", _hoisted_9$2, [
              createVNode($setup["RwdGroup"], { "class-name": "c-title-font-size" }, createSlots({
                label: withCtx(() => [
                  _cache[44] || (_cache[44] = createElementVNode("label", null, " Subtitle Font Size ", -1))
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
            createElementVNode("div", _hoisted_10$2, [
              _cache[45] || (_cache[45] = createElementVNode("label", { for: "input-row-edit-title-align" }, "Title/Subtitle Text Alignment", -1)),
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
            createElementVNode("div", _hoisted_11$2, [
              _cache[46] || (_cache[46] = createElementVNode("label", { for: "input-row-edit-text-color" }, "Text Color", -1)),
              createVNode($setup["ColorInput"], {
                id: "input-row-edit-text-color",
                modelValue: $setup.options.text_color,
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.options.text_color = $event),
                modelModifiers: { lazy: true }
              }, null, 8, ["modelValue"])
            ]),
            createElementVNode("div", _hoisted_12$2, [
              _cache[47] || (_cache[47] = createElementVNode("label", { for: "input-row-edit-html-id" }, "CSS ID", -1)),
              withDirectives(createElementVNode("input", {
                id: "input-row-edit-html-id",
                type: "text",
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.options.html_id = $event),
                class: "form-control"
              }, null, 512), [
                [vModelText, $setup.options.html_id]
              ])
            ]),
            createElementVNode("div", _hoisted_13$2, [
              _cache[48] || (_cache[48] = createElementVNode("label", { for: "input-row-edit-html-class" }, "CSS Class", -1)),
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
          createElementVNode("div", _hoisted_14$2, [
            createVNode($setup["BoxOffset"], {
              modelValue: $setup.options.padding,
              "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.options.padding = $event)
            }, {
              label: withCtx(() => [..._cache[51] || (_cache[51] = [
                createTextVNode("Padding", -1)
              ])]),
              _: 1
            }, 8, ["modelValue"]),
            createVNode($setup["BoxOffset"], {
              modelValue: $setup.options.margin,
              "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.options.margin = $event)
            }, {
              label: withCtx(() => [..._cache[52] || (_cache[52] = [
                createTextVNode("Margin", -1)
              ])]),
              _: 1
            }, 8, ["modelValue"]),
            createElementVNode("div", _hoisted_15$2, [
              _cache[53] || (_cache[53] = createElementVNode("label", { for: "input-row-edit-background" }, "Background Type", -1)),
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
            createVNode(Transition, { name: "fade" }, {
              default: withCtx(() => [
                ["color", "image"].indexOf($setup.options.background.type) !== -1 ? (openBlock(), createElementBlock("div", _hoisted_16$2, [
                  _cache[54] || (_cache[54] = createElementVNode("label", { for: "input-row-edit-bg-color" }, "Background Color", -1)),
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
            createVNode(Transition, { name: "fade" }, {
              default: withCtx(() => [
                ["image"].indexOf($setup.options.background.type) !== -1 ? (openBlock(), createElementBlock("div", _hoisted_17$1, [
                  createElementVNode("div", _hoisted_18, [
                    _cache[55] || (_cache[55] = createElementVNode("label", { for: "input-row-edit-bg-image" }, "Background Image", -1)),
                    createVNode($setup["SingleImage"], {
                      modelValue: $setup.options.background.image.url,
                      "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $setup.options.background.image.url = $event),
                      id: "input-row-edit-bg-image"
                    }, null, 8, ["modelValue"])
                  ]),
                  createElementVNode("div", _hoisted_19, [
                    createElementVNode("div", _hoisted_20, [
                      _cache[57] || (_cache[57] = createElementVNode("label", { for: "input-row-edit-bg-size" }, "Background Size", -1)),
                      withDirectives(createElementVNode("select", {
                        id: "input-row-edit-bg-size",
                        "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => $setup.options.background.image.size = $event),
                        class: "form-select custom-select"
                      }, [..._cache[56] || (_cache[56] = [
                        createElementVNode("option", { value: "" }, "Default", -1),
                        createElementVNode("option", { value: "cover" }, "Cover", -1),
                        createElementVNode("option", { value: "contain" }, "Contain", -1),
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
                    createElementVNode("div", _hoisted_21, [
                      _cache[59] || (_cache[59] = createElementVNode("label", { for: "input-row-edit-bg-repeat" }, "Background Repeat", -1)),
                      withDirectives(createElementVNode("select", {
                        id: "input-row-edit-bg-repeat",
                        "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => $setup.options.background.image.repeat = $event),
                        class: "form-select custom-select"
                      }, [..._cache[58] || (_cache[58] = [
                        createElementVNode("option", { value: "no-repeat" }, "No Repeat", -1),
                        createElementVNode("option", { value: "" }, "Repeat All", -1),
                        createElementVNode("option", { value: "repeat-x" }, "Repeat X", -1),
                        createElementVNode("option", { value: "repeat-y" }, "Repeat Y", -1),
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
                  createElementVNode("div", _hoisted_22, [
                    createElementVNode("div", _hoisted_23, [
                      _cache[61] || (_cache[61] = createElementVNode("label", { for: "input-row-edit-bg-attachment" }, "Background Attachment", -1)),
                      withDirectives(createElementVNode("select", {
                        id: "input-row-edit-bg-attachment",
                        "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => $setup.options.background.image.attachment = $event),
                        class: "form-select custom-select"
                      }, [..._cache[60] || (_cache[60] = [
                        createElementVNode("option", { value: "fixed" }, "Fixed", -1),
                        createElementVNode("option", { value: "scroll" }, "Scroll", -1),
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
                    createElementVNode("div", _hoisted_24, [
                      _cache[63] || (_cache[63] = createElementVNode("label", { for: "input-row-edit-bg-position" }, "Background Position", -1)),
                      withDirectives(createElementVNode("select", {
                        id: "input-row-edit-bg-position",
                        "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => $setup.options.background.image.position = $event),
                        class: "form-select custom-select"
                      }, [..._cache[62] || (_cache[62] = [
                        createElementVNode("option", { value: "left top" }, "Left Top", -1),
                        createElementVNode("option", { value: "left center" }, "Left Center", -1),
                        createElementVNode("option", { value: "left bottom" }, "Left Bottom", -1),
                        createElementVNode("option", { value: "center top" }, "Center Top", -1),
                        createElementVNode("option", { value: "center center" }, "Center Center", -1),
                        createElementVNode("option", { value: "center bottom" }, "Center Bottom", -1),
                        createElementVNode("option", { value: "right top" }, "Right Top", -1),
                        createElementVNode("option", { value: "right center" }, "Right Center", -1),
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
            createVNode(Transition, { name: "fade" }, {
              default: withCtx(() => [
                ["video"].indexOf($setup.options.background.type) !== -1 ? (openBlock(), createElementBlock("div", _hoisted_25, [
                  createElementVNode("div", _hoisted_26, [
                    _cache[64] || (_cache[64] = createElementVNode("label", { for: "input-row-edit-bg-video-url" }, "Video URL", -1)),
                    withDirectives(createElementVNode("input", {
                      id: "input-row-edit-bg-video-url",
                      type: "text",
                      "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => $setup.options.background.video.url = $event),
                      class: "form-control"
                    }, null, 512), [
                      [vModelText, $setup.options.background.video.url]
                    ]),
                    _cache[65] || (_cache[65] = createElementVNode("small", { class: "form-text text-muted" }, " Paste mp4 video URL, or Youtube / Vimeo URL. ", -1))
                  ])
                ])) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            createVNode(Transition, { name: "fade" }, {
              default: withCtx(() => [
                ["video", "image"].indexOf($setup.options.background.type) !== -1 ? (openBlock(), createElementBlock("div", _hoisted_27, [
                  createElementVNode("div", _hoisted_28, [
                    _cache[66] || (_cache[66] = createElementVNode("label", { for: "input-row-edit-bg-overlay" }, "Color Overlay", -1)),
                    createVNode($setup["ColorInput"], {
                      id: "input-row-edit-bg-overlay",
                      modelValue: $setup.options.background.overlay,
                      "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => $setup.options.background.overlay = $event),
                      modelModifiers: { lazy: true }
                    }, null, 8, ["modelValue"])
                  ]),
                  createElementVNode("div", _hoisted_29, [
                    _cache[67] || (_cache[67] = createElementVNode("label", { for: "input-row-edit-hidden-mobile" }, "Parallax Background", -1)),
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
            _cache[78] || (_cache[78] = createElementVNode("hr", null, null, -1)),
            createElementVNode("div", _hoisted_30, [
              _cache[68] || (_cache[68] = createElementVNode("label", { for: "input-row-edit-justify-content" }, "Content Justify", -1)),
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
            createElementVNode("div", _hoisted_31, [
              _cache[69] || (_cache[69] = createElementVNode("label", { for: "input-row-edit-valign" }, "Vertical Align Middle", -1)),
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
            createElementVNode("div", _hoisted_32, [
              _cache[70] || (_cache[70] = createElementVNode("label", { for: "input-row-edit-fluid_row" }, "Fluid Row", -1)),
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
            createElementVNode("div", _hoisted_33, [
              _cache[71] || (_cache[71] = createElementVNode("label", { for: "input-row-edit-no_gutter" }, "No Gutters", -1)),
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
            _cache[79] || (_cache[79] = createElementVNode("hr", null, null, -1)),
            createElementVNode("div", _hoisted_34, [
              _cache[72] || (_cache[72] = createElementVNode("label", { for: "input-row-edit-hidden-mobile" }, "Hide in Mobile", -1)),
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
            createElementVNode("div", _hoisted_35, [
              _cache[73] || (_cache[73] = createElementVNode("label", { for: "input-row-edit-hidden-tablet" }, "Hide in Tablet", -1)),
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
            createElementVNode("div", _hoisted_36, [
              _cache[74] || (_cache[74] = createElementVNode("label", { for: "input-row-edit-hidden-desktop" }, "Hide in Desktop", -1)),
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
            _cache[80] || (_cache[80] = createElementVNode("hr", null, null, -1)),
            createElementVNode("div", _hoisted_37, [
              _cache[77] || (_cache[77] = createElementVNode("label", { for: "input-row-edit-css" }, "Custom CSS (SCSS)", -1)),
              createElementVNode("div", _hoisted_38, [
                _cache[75] || (_cache[75] = createTextVNode(" Will auto prefix by ", -1)),
                createElementVNode("code", null, toDisplayString(`#luna-${$setup.content.id}`), 1),
                _cache[76] || (_cache[76] = createTextVNode(", only works for this scope. ", -1))
              ]),
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
          createElementVNode("div", _hoisted_40, [
            createVNode($setup["Animations"], {
              id: "row-edit-anim",
              value: $setup.options.animation
            }, null, 8, ["value"])
          ])
        ])) : createCommentVNode("", true)
      ]),
      _: 1
    }, 8, ["open"])
  ]);
}
const RowEdit = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "RowEdit.vue"]]);
const _AlertAdapter = class _AlertAdapter {
};
_AlertAdapter.alert = async (title) => window.alert(title);
_AlertAdapter.confirm = async (title) => {
  return new Promise((resolve) => {
    const v = confirm(title);
    resolve(v);
  });
};
_AlertAdapter.deleteConfirm = async (title) => _AlertAdapter.confirm(title);
_AlertAdapter.confirmText = () => "確認";
_AlertAdapter.cancelText = () => "取消";
_AlertAdapter.deleteText = () => "刪除";
let AlertAdapter = _AlertAdapter;
async function simpleAlert(title, text = "", icon = "info", extra) {
  return AlertAdapter.alert(title, text, icon, extra);
}
function useLoading(loading) {
  loading = loading || ref(false);
  const run = async function(callback, errorAlert = true) {
    loading.value = true;
    try {
      return await callback();
    } catch (e) {
      console.error(e);
      if (errorAlert) {
        simpleAlert(e?.message || "Unknown Error", "");
      }
      throw e;
    } finally {
      loading.value = false;
    }
  };
  const wrap2 = function(callback, errorAlert = true) {
    return (...args) => {
      return run(async () => callback(...args), errorAlert);
    };
  };
  return { loading, run, wrap: wrap2 };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TemplateManager",
  emits: ["selected"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const { toFormData: toFormData2 } = usePageBuilderUtilities();
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
    const { loading, wrap: wrap2 } = useLoading();
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
    const loadItems = wrap2(async () => {
      items.value = [];
      const { get } = await useHttpClient();
      try {
        let res = await get(`@page_ajax/getTemplate?type=${type.value}`);
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
      const { post, isAxiosError } = await useHttpClient();
      try {
        await post(
          "@page_ajax/removeTemplate",
          { id: item.id }
        );
        items.value.splice(idx, 1);
      } catch (e) {
        if (isAxiosError(e)) {
          simpleAlert$1(e.message, "", "warning");
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
          toFormData2({
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
          simpleAlert$1(e.response?.statusText || e.message, "", "warning");
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
        if (filterType.value && item.type !== filterType.value) return false;
        if (q.value !== "") {
          if (item.title?.toUpperCase().indexOf(q.value.toUpperCase()) !== -1) return true;
          if (item.description && item.description.toUpperCase().indexOf(q.value.toUpperCase()) !== -1) return true;
          return false;
        }
        return true;
      });
    });
    const __returned__ = { toFormData: toFormData2, emits, q, filterType, items, callback, type, i, saveData, loading, wrap: wrap2, saving, wrapSave, tmplModalShow, saveModalShow, open, loadItems, selected, remove, badgeColor, saveContent, openSave, resetSaveData, filterButtons, filteredItems, BsModal, SingleImage, ButtonRadio };
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
const _hoisted_12$1 = { class: "form-group mb-3" };
const _hoisted_13$1 = { class: "form-group mb-3" };
const _hoisted_14$1 = { class: "form-group mb-3" };
const _hoisted_15$1 = { class: "form-group mb-3" };
const _hoisted_16$1 = ["disabled"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createVNode($setup["BsModal"], {
      open: $setup.tmplModalShow,
      title: "Template",
      size: "xl",
      onHidden: _cache[2] || (_cache[2] = ($event) => $setup.tmplModalShow = false),
      "class-name": "c-template-manager"
    }, {
      default: withCtx(() => [
        createElementVNode("div", _hoisted_1$1, [
          _cache[8] || (_cache[8] = createElementVNode("span", { class: "me-2" }, " Filter: ", -1)),
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
                    createElementVNode("div", _hoisted_5$1, [
                      createElementVNode("div", _hoisted_6$1, [
                        createElementVNode("h5", _hoisted_7$1, toDisplayString(item.title || "No title"), 1),
                        createElementVNode("div", null, [
                          createElementVNode("div", {
                            class: normalizeClass(["badge", `bg-${$setup.badgeColor(item.type)}`])
                          }, toDisplayString(item.type), 3)
                        ]),
                        createElementVNode("div", _hoisted_8$1, [
                          item.can_delete === true ? (openBlock(), createElementBlock("a", {
                            key: 0,
                            href: "#",
                            class: "text-dark",
                            onClick: withModifiers(($event) => $setup.remove(item, idx), ["prevent", "stop"])
                          }, [..._cache[9] || (_cache[9] = [
                            createElementVNode("span", { class: "fa fa-trash" }, null, -1),
                            createTextVNode(" Delete ", -1)
                          ])], 8, _hoisted_9$1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createElementVNode("div", _hoisted_10$1, toDisplayString(item.description || "No description"), 1)
                    ])
                  ], 8, _hoisted_4$1)
                ], 8, _hoisted_3$1);
              }), 128))
            ]),
            _: 1
          })
        ]),
        $setup.items.length === 0 && $setup.loading ? (openBlock(), createElementBlock("div", _hoisted_11$1, [..._cache[10] || (_cache[10] = [
          createElementVNode("span", { class: "spinner spinner-border" }, null, -1)
        ])])) : createCommentVNode("", true)
      ]),
      _: 1
    }, 8, ["open"]),
    createVNode($setup["BsModal"], {
      open: $setup.saveModalShow,
      onHidden: _cache[7] || (_cache[7] = ($event) => $setup.saveModalShow = false),
      title: "Save as Template"
    }, {
      default: withCtx(() => [
        createElementVNode("div", null, [
          _cache[11] || (_cache[11] = createTextVNode(" Save as: ", -1)),
          createElementVNode("div", {
            class: normalizeClass(["badge", `bg-${$setup.badgeColor($setup.saveData.type)}`])
          }, toDisplayString($setup.saveData.type), 3)
        ]),
        createElementVNode("div", _hoisted_12$1, [
          _cache[12] || (_cache[12] = createElementVNode("label", { for: "input-tmpl-title" }, "Title", -1)),
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
        createElementVNode("div", _hoisted_13$1, [
          _cache[13] || (_cache[13] = createElementVNode("label", { for: "input-tmpl-description" }, "Description", -1)),
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
        createElementVNode("div", _hoisted_14$1, [
          _cache[15] || (_cache[15] = createElementVNode("label", { for: "input-tmpl-image" }, "Cover", -1)),
          createElementVNode("div", null, [
            createVNode($setup["SingleImage"], {
              modelValue: $setup.saveData.image,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.saveData.image = $event),
              id: "input-tmpl-image"
            }, null, 8, ["modelValue"])
          ]),
          createElementVNode("div", _hoisted_15$1, [
            createElementVNode("button", {
              type: "button",
              class: "btn btn-primary btn-block",
              disabled: $setup.saving,
              onClick: _cache[6] || (_cache[6] = (...args) => $setup.saveContent && $setup.saveContent(...args))
            }, [
              createElementVNode("span", {
                class: normalizeClass($setup.saving ? "spinner-border spinner-border-sm" : "fa fa-save")
              }, null, 2),
              _cache[14] || (_cache[14] = createTextVNode(" Save ", -1))
            ], 8, _hoisted_16$1)
          ])
        ])
      ]),
      _: 1
    }, 8, ["open"])
  ]);
}
const TemplateManager = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-01a0500f"], ["__file", "TemplateManager.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageBuilderApp",
  setup(__props, { expose: __expose }) {
    __expose();
    const {
      addTextToClipboard: addTextToClipboard2,
      emptyRow: emptyRow2,
      readClipboard: readClipboard2,
      savePage: doSavePage,
      bindSaveButton: bindSaveButton2,
      duplicateAny: duplicateAny2
    } = usePageBuilderUtilities();
    const u2 = useUnicorn();
    const addonDefines = inject("addons");
    const app2 = getCurrentInstance();
    const content = ref(data("builder-content") || []);
    const drag = ref(false);
    const editingRow = ref();
    const editingColumn = ref();
    const editingAddon = ref();
    const css2 = ref(data("css") || "");
    const saving = ref(false);
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
      bindSaveButton2();
      registerUnicornEvents();
    });
    function cssEdit() {
      cssModalShow.value = true;
    }
    function addNewRow(i) {
      if (i != null) {
        content.value.splice(i + 1, 0, emptyRow2());
      } else {
        content.value.push(emptyRow2());
      }
    }
    function deleteRow(i) {
      content.value.splice(i, 1);
    }
    function copy() {
      addTextToClipboard2(content.value);
    }
    async function paste() {
      const text = await readClipboard2();
      try {
        let data2 = JSON.parse(text);
        for (const item of data2) {
          duplicateRow2(item, content.value.length);
        }
      } catch (e) {
        console.error(e);
        alert("Invalid format.");
      }
    }
    async function pastePage(text, i) {
      const t = await readClipboard2();
      return pasteTo(t, i);
    }
    function pasteTo(text, i) {
      try {
        const data2 = JSON.parse(text);
        if (!Array.isArray(data2)) {
          duplicateRow2(data2, i);
          return;
        }
        data2.forEach((item) => {
          duplicateRow2(item, i++);
        });
      } catch (e) {
        console.error(e);
        alert("Invalid format.");
      }
    }
    function duplicateRow2(row, i) {
      row = duplicateAny2(row);
      content.value.splice(i + 1, 0, row);
    }
    function columnsChange(row, $event) {
      row.columns = $event.columns;
    }
    function selectAddon(type) {
      addonListShow.value = false;
      const addonDefine = addonDefines[type];
      u2.trigger("addon:edit", { ...addonDefine, id: "addon-" + uid(), is: "addon" }, editingColumn.value);
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
    async function savePage2() {
      saving.value = true;
      await nextTick();
      try {
        return await doSavePage();
      } finally {
        saving.value = false;
      }
    }
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
        editingRow.value = { ...editingRow.value, ...content2 };
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
        editingColumn.value = { ...editingColumn.value, ...content2 };
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
        editingAddon.value = { ...editingAddon.value, ...addon };
      });
      u2.on("tmpl.open", (callback, type, i) => {
        tmplManager.value?.open(callback, type, i);
      });
      u2.on("tmpl.save", (content2, type) => {
        tmplManager.value?.openSave(content2, type);
      });
      u2.trigger("page-builder.mounted", app2);
    }
    const __returned__ = { addTextToClipboard: addTextToClipboard2, emptyRow: emptyRow2, readClipboard: readClipboard2, doSavePage, bindSaveButton: bindSaveButton2, duplicateAny: duplicateAny2, u: u2, addonDefines, app: app2, content, drag, editingRow, editingColumn, editingAddon, css: css2, saving, cssModalShow, rowEditor, columnEditor, addonEditor, addonListShow, tmplManager, cssEdit, addNewRow, deleteRow, copy, paste, pastePage, pasteTo, duplicateRow: duplicateRow2, columnsChange, selectAddon, contentInput, cssInput, openTemplates, savePage: savePage2, registerUnicornEvents, get VueDraggable() {
      return VueDraggable;
    }, AddonEdit, BsModal, ColumnEdit, CssEditor, RowBox, RowEdit, TemplateManager };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = {
  id: "page-builder",
  class: "page-builder card bg-light border-0"
};
const _hoisted_2 = { class: "card-header page-builder__topbar d-flex" };
const _hoisted_3 = { class: "ms-auto" };
const _hoisted_4 = { class: "d-inline-block" };
const _hoisted_5 = { class: "text-nowrap btn-group dropdown" };
const _hoisted_6 = { class: "dropdown-menu dropdown-menu-end dropdown-menu-right" };
const _hoisted_7 = { class: "card-body" };
const _hoisted_8 = { class: "page-builder__body body" };
const _hoisted_9 = {
  key: 0,
  class: "page-builder__bottom-toolbar text-center"
};
const _hoisted_10 = { class: "dropdown btn-group text-nowrap" };
const _hoisted_11 = { class: "row c-addon-list" };
const _hoisted_12 = { class: "col-6 col-md-4 mb-2 c-addon-list__item c-addon" };
const _hoisted_13 = ["title", "onClick"];
const _hoisted_14 = { class: "c-addon__icon" };
const _hoisted_15 = { class: "m-0" };
const _hoisted_16 = { class: "ml-auto ms-auto" };
const _hoisted_17 = ["disabled"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_tooltip = resolveDirective("tooltip");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", _hoisted_2, [
      createElementVNode("div", _hoisted_3, [
        createElementVNode("button", {
          type: "button",
          class: "btn btn-outline-secondary btn-sm",
          onClick: $setup.cssEdit,
          style: { "min-width": "150px" }
        }, [..._cache[11] || (_cache[11] = [
          createElementVNode("span", { class: "fab fa-css3" }, null, -1),
          createTextVNode(" Edit CSS ", -1)
        ])]),
        createElementVNode("div", _hoisted_4, [
          createElementVNode("div", _hoisted_5, [
            createElementVNode("button", {
              type: "button",
              class: "btn btn-outline-secondary btn-sm",
              onClick: _cache[0] || (_cache[0] = ($event) => $setup.openTemplates($setup.content.length))
            }, [..._cache[12] || (_cache[12] = [
              createElementVNode("div", { style: { "display": "inline-block", "min-width": "120px" } }, [
                createElementVNode("span", { class: "fa fa-file-code" }),
                createTextVNode(" Insert Template ")
              ], -1)
            ])]),
            _cache[14] || (_cache[14] = createElementVNode("button", {
              class: "btn btn-outline-secondary btn-sm dropdown-toggle dropdown-toggle-split",
              "data-toggle": "dropdown",
              "data-bs-toggle": "dropdown"
            }, [
              createElementVNode("span", { class: "visually-hidden sr-only" }, "Toggle Dropdown")
            ], -1)),
            createElementVNode("div", _hoisted_6, [
              createElementVNode("button", {
                class: "dropdown-item",
                onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$trigger("tmpl.save", $setup.content, "page"))
              }, [..._cache[13] || (_cache[13] = [
                createElementVNode("span", { class: "fa fa-fw fa-save" }, null, -1),
                createTextVNode(" Save as Template ", -1)
              ])])
            ])
          ])
        ]),
        createElementVNode("button", {
          type: "button",
          class: "btn btn-outline-secondary btn-sm",
          onClick: $setup.copy,
          style: { "min-width": "150px" }
        }, [..._cache[15] || (_cache[15] = [
          createElementVNode("span", { class: "fa fa-clone" }, null, -1),
          createTextVNode(" Copy page content ", -1)
        ])])
      ])
    ]),
    createElementVNode("div", _hoisted_7, [
      createElementVNode("div", _hoisted_8, [
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
      $setup.content.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_9, [
        createElementVNode("div", _hoisted_10, [
          createElementVNode("button", {
            type: "button",
            class: "btn btn-outline-secondary btn-sm",
            onClick: _cache[6] || (_cache[6] = ($event) => $setup.addNewRow())
          }, " Add New Row "),
          _cache[18] || (_cache[18] = createElementVNode("button", { class: "btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split" }, [
            createElementVNode("span", { class: "visually-hidden sr-only" }, "Toggle Dropdown")
          ], -1)),
          createElementVNode("div", { class: "dropdown-menu dropdown-menu dropdown-menu-right" }, [
            createElementVNode("div", {
              class: "dropdown-item",
              onClick: $setup.paste
            }, [..._cache[16] || (_cache[16] = [
              createElementVNode("span", { class: "fa fa-fw fa-paste" }, null, -1),
              createTextVNode(" Paste ", -1)
            ])]),
            createElementVNode("div", {
              class: "dropdown-item",
              onClick: $setup.paste
            }, [..._cache[17] || (_cache[17] = [
              createElementVNode("span", { class: "fa fa-fw fa-file-code" }, null, -1),
              createTextVNode(" Insert Template ", -1)
            ])])
          ])
        ])
      ])) : createCommentVNode("", true),
      createVNode($setup["RowEdit"], { ref: "rowEditor" }, null, 512),
      createVNode($setup["ColumnEdit"], { ref: "columnEditor" }, null, 512),
      createVNode($setup["AddonEdit"], { ref: "addonEditor" }, null, 512),
      createVNode($setup["BsModal"], {
        open: $setup.addonListShow,
        onHidden: _cache[7] || (_cache[7] = ($event) => $setup.addonListShow = false),
        size: "lg",
        class: "c-modal-addon-select",
        title: "New Addon"
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_11, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.addonDefines, (addon) => {
              return openBlock(), createElementBlock("div", _hoisted_12, [
                withDirectives((openBlock(), createElementBlock("a", {
                  class: "d-inline-block p-4 c-addon__link btn btn-outline-dark w-100 text-center",
                  href: "javascript://",
                  title: addon.description,
                  onClick: withModifiers(($event) => $setup.selectAddon(addon.type), ["prevent"])
                }, [
                  createElementVNode("div", _hoisted_14, [
                    createElementVNode("span", {
                      class: normalizeClass(["fa-3x", addon.icon])
                    }, null, 2)
                  ]),
                  createElementVNode("h5", _hoisted_15, toDisplayString(addon.name), 1)
                ], 8, _hoisted_13)), [
                  [_directive_tooltip]
                ])
              ]);
            }), 256))
          ])
        ]),
        _: 1
      }, 8, ["open"]),
      createVNode($setup["TemplateManager"], { ref: "tmplManager" }, null, 512),
      createVNode($setup["BsModal"], {
        title: "CSS Edit (Support SCSS)",
        size: "xl",
        class: "c-modal-css-edit",
        open: $setup.cssModalShow,
        onHidden: _cache[10] || (_cache[10] = ($event) => $setup.cssModalShow = false),
        backdrop: "static"
      }, {
        footer: withCtx(() => [
          createElementVNode("div", _hoisted_16, [
            createElementVNode("button", {
              type: "button",
              class: "btn btn-outline-dark",
              style: { "min-width": "150px" },
              onClick: _cache[9] || (_cache[9] = ($event) => $setup.cssModalShow = false)
            }, [..._cache[19] || (_cache[19] = [
              createElementVNode("i", { class: "fa fa-times" }, null, -1),
              createTextVNode(" Close ", -1)
            ])]),
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
              _cache[20] || (_cache[20] = createTextVNode(" Save ", -1))
            ], 8, _hoisted_17)
          ])
        ]),
        default: withCtx(() => [
          createVNode($setup["CssEditor"], {
            modelValue: $setup.css,
            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.css = $event),
            "auto-focus": true
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      }, 8, ["open"])
    ])
  ]);
}
const PageBuilderApp = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "PageBuilderApp.vue"]]);
useCssImport("@vue-animate");
const u$1 = useUnicorn();
Promise.resolve().then(() => sweetalert_min);
const app = createApp(PageBuilderApp, {
  name: "PageBuilder"
});
app.config.globalProperties.$debug = isDebug();
app.config.globalProperties.$trigger = useUnicorn().trigger;
app.config.globalProperties.addonProp = (prop, type) => {
  return data("addons")[type][prop];
};
app.component("VueSlideBar", VueSlideBar);
app.component("addon-text", defineAsyncComponent(() => import("./addon-text.js")));
app.component("addon-image", defineAsyncComponent(() => import("./addon-image.js")));
app.component("addon-feature", defineAsyncComponent(() => import("./addon-feature.js")));
app.component("addon-emptyspace", defineAsyncComponent(() => import("./addon-emptyspace.js")));
app.component("addon-button", defineAsyncComponent(() => import("./addon-button.js")));
const addons = data("addons") || [];
for (const k in addons.value) {
  const addon = addons.value[k];
  if (addon.componentModuleUrl) {
    useImport(addon.componentModuleUrl).then((module2) => {
      app.component(addon.componentName, module2.default(app));
    });
  }
}
app.provide("addons", addons);
u$1.trigger("page-builder.app.prepared", app);
app.provide("app", app);
domready(() => {
  app.mount("page-builder-app");
});
export {
  ButtonRadio as B,
  ColorInput as C,
  RwdTitleOptions as R,
  SliderInput as S,
  UnicornSwitcher as U,
  _export_sfc as _,
  RwdGroup as a,
  SingleImage as b,
  BoxOffset as c,
  defaultsDeep as d
};
//# sourceMappingURL=page-builder.js.map
