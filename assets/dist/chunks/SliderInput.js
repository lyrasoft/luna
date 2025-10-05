import { b as isObject, c as baseGetTag, r as root, d as isObjectLike, f as freeGlobal, i as isArray } from "./usePageBuilderUtilities.js";
import { toRefs, ref, computed, onMounted, onUnmounted, watch, createElementBlock, openBlock, mergeProps, defineComponent, mergeModels, useModel, createVNode, createTextVNode, withDirectives, createElementVNode, normalizeStyle, vModelText } from "vue";
import { injectCssToDocument } from "@windwalker-io/unicorn-next";
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
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
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
var funcProto$1 = Function.prototype, objectProto$8 = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString$1.call(hasOwnProperty$7).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
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
var objectProto$7 = Object.prototype;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$6.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
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
var nativeMax = Math.max;
function overRest(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
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
var objectProto$6 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$6;
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
var objectProto$5 = Object.prototype;
var hasOwnProperty$5 = objectProto$5.hasOwnProperty;
var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;
var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
  return arguments;
})()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$5.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
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
var objectProto$4 = Object.prototype;
var hasOwnProperty$4 = objectProto$4.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$4.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
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
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : void 0;
}
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== void 0 : hasOwnProperty$1.call(data, key);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
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
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
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
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
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
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
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
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
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
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
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
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const css = '.slider-target,.slider-target *{-webkit-touch-callout:none;-webkit-tap-highlight-color:rgba(0,0,0,0);box-sizing:border-box;touch-action:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}.slider-target{position:relative}.slider-base,.slider-connects{height:100%;position:relative;width:100%;z-index:1}.slider-connects{overflow:hidden;z-index:0}.slider-connect,.slider-origin{height:100%;position:absolute;right:0;top:0;-ms-transform-origin:0 0;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform-style:preserve-3d;transform-style:flat;width:100%;will-change:transform;z-index:1}.slider-txt-dir-rtl.slider-horizontal .slider-origin{left:0;right:auto}.slider-vertical .slider-origin{top:-100%;width:0}.slider-horizontal .slider-origin{height:0}.slider-handle{-webkit-backface-visibility:hidden;backface-visibility:hidden;position:absolute}.slider-touch-area{height:100%;width:100%}.slider-state-tap .slider-connect,.slider-state-tap .slider-origin{transition:transform .3s}.slider-state-drag *{cursor:inherit!important}.slider-tooltip-drag .slider-tooltip,.slider-tooltip-focus .slider-tooltip{display:none!important}.slider-tooltip-drag .slider-active .slider-tooltip,.slider-tooltip-drag.slider-state-drag .slider-tooltip:not(.slider-tooltip-hidden),.slider-tooltip-focus.slider-focused .slider-tooltip:not(.slider-tooltip-hidden){display:block!important}.slider-horizontal{height:var(--slider-height,6px)}.slider-horizontal .slider-handle{height:var(--slider-handle-height,16px);right:calc(var(--slider-handle-width, 16px)/2*-1);top:calc((var(--slider-handle-height, 16px) - var(--slider-height, 6px))/2*-1 + -1px);width:var(--slider-handle-width,16px)}.slider-vertical{height:var(--slider-vertical-height,300px);width:var(--slider-height,6px)}.slider-vertical .slider-handle{bottom:calc(var(--slider-handle-width, 16px)/2*-1);height:var(--slider-handle-width,16px);right:calc((var(--slider-handle-height, 16px) - var(--slider-height, 6px))/2*-1 + -1px);width:var(--slider-handle-height,16px)}.slider-txt-dir-rtl.slider-horizontal .slider-handle{left:calc(var(--slider-handle-width, 16px)/2*-1);right:auto}.slider-base{background-color:var(--slider-bg,#d1d5db)}.slider-base,.slider-connects{border-radius:var(--slider-radius,9999px)}.slider-connect{background:var(--slider-connect-bg,#10b981);cursor:pointer}.slider-draggable{cursor:ew-resize}.slider-vertical .slider-draggable{cursor:ns-resize}.slider-handle{background:var(--slider-handle-bg,#fff);border:var(--slider-handle-border,0);border-radius:var(--slider-handle-radius,9999px);box-shadow:var(--slider-handle-shadow,.5px .5px 2px 1px rgba(0,0,0,.32));cursor:-webkit-grab;cursor:grab;height:var(--slider-handle-height,16px);width:var(--slider-handle-width,16px)}.slider-handle:focus{box-shadow:0 0 0 var(--slider-handle-ring-width,3px) var(--slider-handle-ring-color,rgba(16,185,129,.188)),var(--slider-handle-shadow,.5px .5px 2px 1px rgba(0,0,0,.32));outline:none}.slider-active{box-shadow:var(--slider-handle-shadow-active,.5px .5px 2px 1px rgba(0,0,0,.42));cursor:-webkit-grabbing;cursor:grabbing}[disabled] .slider-connect{background:var(--slider-connect-bg-disabled,#9ca3af)}[disabled] .slider-handle,[disabled].slider-handle,[disabled].slider-target{cursor:not-allowed}[disabled] .slider-tooltip{background:var(--slider-tooltip-bg-disabled,#9ca3af);border-color:var(--slider-tooltip-bg-disabled,#9ca3af)}.slider-tooltip{background:var(--slider-tooltip-bg,#10b981);border:1px solid var(--slider-tooltip-bg,#10b981);border-radius:var(--slider-tooltip-radius,5px);color:var(--slider-tooltip-color,#fff);display:block;font-size:var(--slider-tooltip-font-size,.875rem);font-weight:var(--slider-tooltip-font-weight,600);line-height:var(--slider-tooltip-line-height,1.25rem);min-width:var(--slider-tooltip-min-width,20px);padding:var(--slider-tooltip-py,2px) var(--slider-tooltip-px,6px);position:absolute;text-align:center;white-space:nowrap}.slider-horizontal .slider-tooltip-top{bottom:calc(var(--slider-handle-height, 16px) + var(--slider-tooltip-arrow-size, 5px) + var(--slider-tooltip-distance, 3px));left:50%;transform:translate(-50%)}.slider-horizontal .slider-tooltip-top:before{border:var(--slider-tooltip-arrow-size,5px) solid transparent;border-top-color:inherit;bottom:calc(var(--slider-tooltip-arrow-size, 5px)*-2);content:"";height:0;left:50%;position:absolute;transform:translate(-50%);width:0}.slider-horizontal .slider-tooltip-bottom{left:50%;top:calc(var(--slider-handle-height, 16px) + var(--slider-tooltip-arrow-size, 5px) + var(--slider-tooltip-distance, 3px));transform:translate(-50%)}.slider-horizontal .slider-tooltip-bottom:before{border:var(--slider-tooltip-arrow-size,5px) solid transparent;border-bottom-color:inherit;content:"";height:0;left:50%;position:absolute;top:calc(var(--slider-tooltip-arrow-size, 5px)*-2);transform:translate(-50%);width:0}.slider-vertical .slider-tooltip-left{right:calc(var(--slider-handle-height, 16px) + var(--slider-tooltip-arrow-size, 5px) + var(--slider-tooltip-distance, 3px));top:50%;transform:translateY(-50%)}.slider-vertical .slider-tooltip-left:before{border:var(--slider-tooltip-arrow-size,5px) solid transparent;border-left-color:inherit;content:"";height:0;position:absolute;right:calc(var(--slider-tooltip-arrow-size, 5px)*-2);top:50%;transform:translateY(-50%);width:0}.slider-vertical .slider-tooltip-right{left:calc(var(--slider-handle-height, 16px) + var(--slider-tooltip-arrow-size, 5px) + var(--slider-tooltip-distance, 3px));top:50%;transform:translateY(-50%)}.slider-vertical .slider-tooltip-right:before{border:var(--slider-tooltip-arrow-size,5px) solid transparent;border-right-color:inherit;content:"";height:0;left:calc(var(--slider-tooltip-arrow-size, 5px)*-2);position:absolute;top:50%;transform:translateY(-50%);width:0}.slider-horizontal .slider-origin>.slider-tooltip{left:auto;transform:translate(50%)}.slider-horizontal .slider-origin>.slider-tooltip-top{bottom:calc(var(--slider-tooltip-arrow-size, 5px) + (var(--slider-handle-height, 16px) - var(--slider-height, 6px))/2 + var(--slider-tooltip-distance, 3px) + 1px)}.slider-horizontal .slider-origin>.slider-tooltip-bottom{top:calc(var(--slider-tooltip-arrow-size, 5px) + (var(--slider-handle-height, 16px) - var(--slider-height, 6px))/2 + var(--slider-tooltip-distance, 3px) + var(--slider-height, 6px) - 1px)}.slider-vertical .slider-origin>.slider-tooltip{top:auto;transform:translateY(calc((var(--slider-tooltip-line-height, 1.25rem) - var(--slider-tooltip-py, 2px))*-1 + 1px))}.slider-vertical .slider-origin>.slider-tooltip-left{right:calc(var(--slider-tooltip-arrow-size, 5px) + var(--slider-height, 6px) + (var(--slider-handle-height, 16px) - var(--slider-height, 6px))/2 + var(--slider-tooltip-distance, 3px) - 1px)}.slider-vertical .slider-origin>.slider-tooltip-right{left:calc(var(--slider-tooltip-arrow-size, 5px) + var(--slider-height, 6px) + (var(--slider-handle-height, 16px) - var(--slider-height, 6px))/2 + var(--slider-tooltip-distance, 3px) - var(--slider-height, 6px) + 1px)}';
function u(e) {
  return -1 !== [null, void 0, false].indexOf(e);
}
function c(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function p(e) {
  var t = { exports: {} };
  return e(t, t.exports), t.exports;
}
var d = p((function(e, t) {
  e.exports = /* @__PURE__ */ (function() {
    var e2 = ["decimals", "thousand", "mark", "prefix", "suffix", "encoder", "decoder", "negativeBefore", "negative", "edit", "undo"];
    function t2(e3) {
      return e3.split("").reverse().join("");
    }
    function r(e3, t3) {
      return e3.substring(0, t3.length) === t3;
    }
    function i(e3, t3) {
      return e3.slice(-1 * t3.length) === t3;
    }
    function n(e3, t3, r2) {
      if ((e3[t3] || e3[r2]) && e3[t3] === e3[r2]) throw new Error(t3);
    }
    function o(e3) {
      return "number" == typeof e3 && isFinite(e3);
    }
    function a(e3, t3) {
      return e3 = e3.toString().split("e"), (+((e3 = (e3 = Math.round(+(e3[0] + "e" + (e3[1] ? +e3[1] + t3 : t3)))).toString().split("e"))[0] + "e" + (e3[1] ? +e3[1] - t3 : -t3))).toFixed(t3);
    }
    function s(e3, r2, i2, n2, s2, l2, u3, c3, p3, d2, f2, h2) {
      var m2, v, g, b = h2, y = "", S = "";
      return l2 && (h2 = l2(h2)), !!o(h2) && (false !== e3 && 0 === parseFloat(h2.toFixed(e3)) && (h2 = 0), h2 < 0 && (m2 = true, h2 = Math.abs(h2)), false !== e3 && (h2 = a(h2, e3)), -1 !== (h2 = h2.toString()).indexOf(".") ? (g = (v = h2.split("."))[0], i2 && (y = i2 + v[1])) : g = h2, r2 && (g = t2(g).match(/.{1,3}/g), g = t2(g.join(t2(r2)))), m2 && c3 && (S += c3), n2 && (S += n2), m2 && p3 && (S += p3), S += g, S += y, s2 && (S += s2), d2 && (S = d2(S, b)), S);
    }
    function l(e3, t3, n2, a2, s2, l2, u3, c3, p3, d2, f2, h2) {
      var m2, v = "";
      return f2 && (h2 = f2(h2)), !(!h2 || "string" != typeof h2) && (c3 && r(h2, c3) && (h2 = h2.replace(c3, ""), m2 = true), a2 && r(h2, a2) && (h2 = h2.replace(a2, "")), p3 && r(h2, p3) && (h2 = h2.replace(p3, ""), m2 = true), s2 && i(h2, s2) && (h2 = h2.slice(0, -1 * s2.length)), t3 && (h2 = h2.split(t3).join("")), n2 && (h2 = h2.replace(n2, ".")), m2 && (v += "-"), "" !== (v = (v += h2).replace(/[^0-9\.\-.]/g, "")) && (v = Number(v), u3 && (v = u3(v)), !!o(v) && v));
    }
    function u2(t3) {
      var r2, i2, o2, a2 = {};
      for (void 0 === t3.suffix && (t3.suffix = t3.postfix), r2 = 0; r2 < e2.length; r2 += 1) if (void 0 === (o2 = t3[i2 = e2[r2]])) "negative" !== i2 || a2.negativeBefore ? "mark" === i2 && "." !== a2.thousand ? a2[i2] = "." : a2[i2] = false : a2[i2] = "-";
      else if ("decimals" === i2) {
        if (!(o2 >= 0 && o2 < 8)) throw new Error(i2);
        a2[i2] = o2;
      } else if ("encoder" === i2 || "decoder" === i2 || "edit" === i2 || "undo" === i2) {
        if ("function" != typeof o2) throw new Error(i2);
        a2[i2] = o2;
      } else {
        if ("string" != typeof o2) throw new Error(i2);
        a2[i2] = o2;
      }
      return n(a2, "mark", "thousand"), n(a2, "prefix", "negative"), n(a2, "prefix", "negativeBefore"), a2;
    }
    function c2(t3, r2, i2) {
      var n2, o2 = [];
      for (n2 = 0; n2 < e2.length; n2 += 1) o2.push(t3[e2[n2]]);
      return o2.push(i2), r2.apply("", o2);
    }
    function p2(e3) {
      if (!(this instanceof p2)) return new p2(e3);
      "object" == typeof e3 && (e3 = u2(e3), this.to = function(t3) {
        return c2(e3, s, t3);
      }, this.from = function(t3) {
        return c2(e3, l, t3);
      });
    }
    return p2;
  })();
}));
var f = c(p((function(e, t) {
  !(function(e2) {
    function t2(e3) {
      return r(e3) && "function" == typeof e3.from;
    }
    function r(e3) {
      return "object" == typeof e3 && "function" == typeof e3.to;
    }
    function i(e3) {
      e3.parentElement.removeChild(e3);
    }
    function n(e3) {
      return null != e3;
    }
    function o(e3) {
      e3.preventDefault();
    }
    function a(e3) {
      return e3.filter((function(e4) {
        return !this[e4] && (this[e4] = true);
      }), {});
    }
    function s(e3, t3) {
      return Math.round(e3 / t3) * t3;
    }
    function l(e3, t3) {
      var r2 = e3.getBoundingClientRect(), i2 = e3.ownerDocument, n2 = i2.documentElement, o2 = g(i2);
      return /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (o2.x = 0), t3 ? r2.top + o2.y - n2.clientTop : r2.left + o2.x - n2.clientLeft;
    }
    function u2(e3) {
      return "number" == typeof e3 && !isNaN(e3) && isFinite(e3);
    }
    function c2(e3, t3, r2) {
      r2 > 0 && (h2(e3, t3), setTimeout((function() {
        m2(e3, t3);
      }), r2));
    }
    function p2(e3) {
      return Math.max(Math.min(e3, 100), 0);
    }
    function d2(e3) {
      return Array.isArray(e3) ? e3 : [e3];
    }
    function f2(e3) {
      var t3 = (e3 = String(e3)).split(".");
      return t3.length > 1 ? t3[1].length : 0;
    }
    function h2(e3, t3) {
      e3.classList && !/\s/.test(t3) ? e3.classList.add(t3) : e3.className += " " + t3;
    }
    function m2(e3, t3) {
      e3.classList && !/\s/.test(t3) ? e3.classList.remove(t3) : e3.className = e3.className.replace(new RegExp("(^|\\b)" + t3.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
    function v(e3, t3) {
      return e3.classList ? e3.classList.contains(t3) : new RegExp("\\b" + t3 + "\\b").test(e3.className);
    }
    function g(e3) {
      var t3 = void 0 !== window.pageXOffset, r2 = "CSS1Compat" === (e3.compatMode || "");
      return { x: t3 ? window.pageXOffset : r2 ? e3.documentElement.scrollLeft : e3.body.scrollLeft, y: t3 ? window.pageYOffset : r2 ? e3.documentElement.scrollTop : e3.body.scrollTop };
    }
    function b() {
      return window.navigator.pointerEnabled ? { start: "pointerdown", move: "pointermove", end: "pointerup" } : window.navigator.msPointerEnabled ? { start: "MSPointerDown", move: "MSPointerMove", end: "MSPointerUp" } : { start: "mousedown touchstart", move: "mousemove touchmove", end: "mouseup touchend" };
    }
    function y() {
      var e3 = false;
      try {
        var t3 = Object.defineProperty({}, "passive", { get: function() {
          e3 = true;
        } });
        window.addEventListener("test", null, t3);
      } catch (e4) {
      }
      return e3;
    }
    function S() {
      return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
    }
    function x(e3, t3) {
      return 100 / (t3 - e3);
    }
    function w(e3, t3, r2) {
      return 100 * t3 / (e3[r2 + 1] - e3[r2]);
    }
    function E(e3, t3) {
      return w(e3, e3[0] < 0 ? t3 + Math.abs(e3[0]) : t3 - e3[0], 0);
    }
    function P(e3, t3) {
      return t3 * (e3[1] - e3[0]) / 100 + e3[0];
    }
    function N(e3, t3) {
      for (var r2 = 1; e3 >= t3[r2]; ) r2 += 1;
      return r2;
    }
    function C(e3, t3, r2) {
      if (r2 >= e3.slice(-1)[0]) return 100;
      var i2 = N(r2, e3), n2 = e3[i2 - 1], o2 = e3[i2], a2 = t3[i2 - 1], s2 = t3[i2];
      return a2 + E([n2, o2], r2) / x(a2, s2);
    }
    function k(e3, t3, r2) {
      if (r2 >= 100) return e3.slice(-1)[0];
      var i2 = N(r2, t3), n2 = e3[i2 - 1], o2 = e3[i2], a2 = t3[i2 - 1];
      return P([n2, o2], (r2 - a2) * x(a2, t3[i2]));
    }
    function V(e3, t3, r2, i2) {
      if (100 === i2) return i2;
      var n2 = N(i2, e3), o2 = e3[n2 - 1], a2 = e3[n2];
      return r2 ? i2 - o2 > (a2 - o2) / 2 ? a2 : o2 : t3[n2 - 1] ? e3[n2 - 1] + s(i2 - e3[n2 - 1], t3[n2 - 1]) : i2;
    }
    var A, M;
    e2.PipsMode = void 0, (M = e2.PipsMode || (e2.PipsMode = {})).Range = "range", M.Steps = "steps", M.Positions = "positions", M.Count = "count", M.Values = "values", e2.PipsType = void 0, (A = e2.PipsType || (e2.PipsType = {}))[A.None = -1] = "None", A[A.NoValue = 0] = "NoValue", A[A.LargeValue = 1] = "LargeValue", A[A.SmallValue = 2] = "SmallValue";
    var L = (function() {
      function e3(e4, t3, r2) {
        var i2;
        this.xPct = [], this.xVal = [], this.xSteps = [], this.xNumSteps = [], this.xHighestCompleteStep = [], this.xSteps = [r2 || false], this.xNumSteps = [false], this.snap = t3;
        var n2 = [];
        for (Object.keys(e4).forEach((function(t4) {
          n2.push([d2(e4[t4]), t4]);
        })), n2.sort((function(e5, t4) {
          return e5[0][0] - t4[0][0];
        })), i2 = 0; i2 < n2.length; i2++) this.handleEntryPoint(n2[i2][1], n2[i2][0]);
        for (this.xNumSteps = this.xSteps.slice(0), i2 = 0; i2 < this.xNumSteps.length; i2++) this.handleStepPoint(i2, this.xNumSteps[i2]);
      }
      return e3.prototype.getDistance = function(e4) {
        for (var t3 = [], r2 = 0; r2 < this.xNumSteps.length - 1; r2++) t3[r2] = w(this.xVal, e4, r2);
        return t3;
      }, e3.prototype.getAbsoluteDistance = function(e4, t3, r2) {
        var i2, n2 = 0;
        if (e4 < this.xPct[this.xPct.length - 1]) for (; e4 > this.xPct[n2 + 1]; ) n2++;
        else e4 === this.xPct[this.xPct.length - 1] && (n2 = this.xPct.length - 2);
        r2 || e4 !== this.xPct[n2 + 1] || n2++, null === t3 && (t3 = []);
        var o2 = 1, a2 = t3[n2], s2 = 0, l2 = 0, u3 = 0, c3 = 0;
        for (i2 = r2 ? (e4 - this.xPct[n2]) / (this.xPct[n2 + 1] - this.xPct[n2]) : (this.xPct[n2 + 1] - e4) / (this.xPct[n2 + 1] - this.xPct[n2]); a2 > 0; ) s2 = this.xPct[n2 + 1 + c3] - this.xPct[n2 + c3], t3[n2 + c3] * o2 + 100 - 100 * i2 > 100 ? (l2 = s2 * i2, o2 = (a2 - 100 * i2) / t3[n2 + c3], i2 = 1) : (l2 = t3[n2 + c3] * s2 / 100 * o2, o2 = 0), r2 ? (u3 -= l2, this.xPct.length + c3 >= 1 && c3--) : (u3 += l2, this.xPct.length - c3 >= 1 && c3++), a2 = t3[n2 + c3] * o2;
        return e4 + u3;
      }, e3.prototype.toStepping = function(e4) {
        return e4 = C(this.xVal, this.xPct, e4);
      }, e3.prototype.fromStepping = function(e4) {
        return k(this.xVal, this.xPct, e4);
      }, e3.prototype.getStep = function(e4) {
        return e4 = V(this.xPct, this.xSteps, this.snap, e4);
      }, e3.prototype.getDefaultStep = function(e4, t3, r2) {
        var i2 = N(e4, this.xPct);
        return (100 === e4 || t3 && e4 === this.xPct[i2 - 1]) && (i2 = Math.max(i2 - 1, 1)), (this.xVal[i2] - this.xVal[i2 - 1]) / r2;
      }, e3.prototype.getNearbySteps = function(e4) {
        var t3 = N(e4, this.xPct);
        return { stepBefore: { startValue: this.xVal[t3 - 2], step: this.xNumSteps[t3 - 2], highestStep: this.xHighestCompleteStep[t3 - 2] }, thisStep: { startValue: this.xVal[t3 - 1], step: this.xNumSteps[t3 - 1], highestStep: this.xHighestCompleteStep[t3 - 1] }, stepAfter: { startValue: this.xVal[t3], step: this.xNumSteps[t3], highestStep: this.xHighestCompleteStep[t3] } };
      }, e3.prototype.countStepDecimals = function() {
        var e4 = this.xNumSteps.map(f2);
        return Math.max.apply(null, e4);
      }, e3.prototype.hasNoSize = function() {
        return this.xVal[0] === this.xVal[this.xVal.length - 1];
      }, e3.prototype.convert = function(e4) {
        return this.getStep(this.toStepping(e4));
      }, e3.prototype.handleEntryPoint = function(e4, t3) {
        var r2;
        if (!u2(r2 = "min" === e4 ? 0 : "max" === e4 ? 100 : parseFloat(e4)) || !u2(t3[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
        this.xPct.push(r2), this.xVal.push(t3[0]);
        var i2 = Number(t3[1]);
        r2 ? this.xSteps.push(!isNaN(i2) && i2) : isNaN(i2) || (this.xSteps[0] = i2), this.xHighestCompleteStep.push(0);
      }, e3.prototype.handleStepPoint = function(e4, t3) {
        if (t3) if (this.xVal[e4] !== this.xVal[e4 + 1]) {
          this.xSteps[e4] = w([this.xVal[e4], this.xVal[e4 + 1]], t3, 0) / x(this.xPct[e4], this.xPct[e4 + 1]);
          var r2 = (this.xVal[e4 + 1] - this.xVal[e4]) / this.xNumSteps[e4], i2 = Math.ceil(Number(r2.toFixed(3)) - 1), n2 = this.xVal[e4] + this.xNumSteps[e4] * i2;
          this.xHighestCompleteStep[e4] = n2;
        } else this.xSteps[e4] = this.xHighestCompleteStep[e4] = this.xVal[e4];
      }, e3;
    })(), U = { to: function(e3) {
      return void 0 === e3 ? "" : e3.toFixed(2);
    }, from: Number }, O = { target: "target", base: "base", origin: "origin", handle: "handle", handleLower: "handle-lower", handleUpper: "handle-upper", touchArea: "touch-area", horizontal: "horizontal", vertical: "vertical", background: "background", connect: "connect", connects: "connects", ltr: "ltr", rtl: "rtl", textDirectionLtr: "txt-dir-ltr", textDirectionRtl: "txt-dir-rtl", draggable: "draggable", drag: "state-drag", tap: "state-tap", active: "active", tooltip: "tooltip", pips: "pips", pipsHorizontal: "pips-horizontal", pipsVertical: "pips-vertical", marker: "marker", markerHorizontal: "marker-horizontal", markerVertical: "marker-vertical", markerNormal: "marker-normal", markerLarge: "marker-large", markerSub: "marker-sub", value: "value", valueHorizontal: "value-horizontal", valueVertical: "value-vertical", valueNormal: "value-normal", valueLarge: "value-large", valueSub: "value-sub" }, D = { tooltips: ".__tooltips", aria: ".__aria" };
    function j(e3, t3) {
      if (!u2(t3)) throw new Error("noUiSlider: 'step' is not numeric.");
      e3.singleStep = t3;
    }
    function F(e3, t3) {
      if (!u2(t3)) throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
      e3.keyboardPageMultiplier = t3;
    }
    function T(e3, t3) {
      if (!u2(t3)) throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
      e3.keyboardMultiplier = t3;
    }
    function z(e3, t3) {
      if (!u2(t3)) throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
      e3.keyboardDefaultStep = t3;
    }
    function H(e3, t3) {
      if ("object" != typeof t3 || Array.isArray(t3)) throw new Error("noUiSlider: 'range' is not an object.");
      if (void 0 === t3.min || void 0 === t3.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
      e3.spectrum = new L(t3, e3.snap || false, e3.singleStep);
    }
    function q(e3, t3) {
      if (t3 = d2(t3), !Array.isArray(t3) || !t3.length) throw new Error("noUiSlider: 'start' option is incorrect.");
      e3.handles = t3.length, e3.start = t3;
    }
    function R(e3, t3) {
      if ("boolean" != typeof t3) throw new Error("noUiSlider: 'snap' option must be a boolean.");
      e3.snap = t3;
    }
    function B(e3, t3) {
      if ("boolean" != typeof t3) throw new Error("noUiSlider: 'animate' option must be a boolean.");
      e3.animate = t3;
    }
    function _(e3, t3) {
      if ("number" != typeof t3) throw new Error("noUiSlider: 'animationDuration' option must be a number.");
      e3.animationDuration = t3;
    }
    function $(e3, t3) {
      var r2, i2 = [false];
      if ("lower" === t3 ? t3 = [true, false] : "upper" === t3 && (t3 = [false, true]), true === t3 || false === t3) {
        for (r2 = 1; r2 < e3.handles; r2++) i2.push(t3);
        i2.push(false);
      } else {
        if (!Array.isArray(t3) || !t3.length || t3.length !== e3.handles + 1) throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
        i2 = t3;
      }
      e3.connect = i2;
    }
    function X(e3, t3) {
      switch (t3) {
        case "horizontal":
          e3.ort = 0;
          break;
        case "vertical":
          e3.ort = 1;
          break;
        default:
          throw new Error("noUiSlider: 'orientation' option is invalid.");
      }
    }
    function Y(e3, t3) {
      if (!u2(t3)) throw new Error("noUiSlider: 'margin' option must be numeric.");
      0 !== t3 && (e3.margin = e3.spectrum.getDistance(t3));
    }
    function I(e3, t3) {
      if (!u2(t3)) throw new Error("noUiSlider: 'limit' option must be numeric.");
      if (e3.limit = e3.spectrum.getDistance(t3), !e3.limit || e3.handles < 2) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
    }
    function W(e3, t3) {
      var r2;
      if (!u2(t3) && !Array.isArray(t3)) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
      if (Array.isArray(t3) && 2 !== t3.length && !u2(t3[0]) && !u2(t3[1])) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
      if (0 !== t3) {
        for (Array.isArray(t3) || (t3 = [t3, t3]), e3.padding = [e3.spectrum.getDistance(t3[0]), e3.spectrum.getDistance(t3[1])], r2 = 0; r2 < e3.spectrum.xNumSteps.length - 1; r2++) if (e3.padding[0][r2] < 0 || e3.padding[1][r2] < 0) throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
        var i2 = t3[0] + t3[1], n2 = e3.spectrum.xVal[0];
        if (i2 / (e3.spectrum.xVal[e3.spectrum.xVal.length - 1] - n2) > 1) throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.");
      }
    }
    function G(e3, t3) {
      switch (t3) {
        case "ltr":
          e3.dir = 0;
          break;
        case "rtl":
          e3.dir = 1;
          break;
        default:
          throw new Error("noUiSlider: 'direction' option was not recognized.");
      }
    }
    function J(e3, t3) {
      if ("string" != typeof t3) throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
      var r2 = t3.indexOf("tap") >= 0, i2 = t3.indexOf("drag") >= 0, n2 = t3.indexOf("fixed") >= 0, o2 = t3.indexOf("snap") >= 0, a2 = t3.indexOf("hover") >= 0, s2 = t3.indexOf("unconstrained") >= 0, l2 = t3.indexOf("drag-all") >= 0, u3 = t3.indexOf("smooth-steps") >= 0;
      if (n2) {
        if (2 !== e3.handles) throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
        Y(e3, e3.start[1] - e3.start[0]);
      }
      if (s2 && (e3.margin || e3.limit)) throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
      e3.events = { tap: r2 || o2, drag: i2, dragAll: l2, smoothSteps: u3, fixed: n2, snap: o2, hover: a2, unconstrained: s2 };
    }
    function K(e3, t3) {
      if (false !== t3) if (true === t3 || r(t3)) {
        e3.tooltips = [];
        for (var i2 = 0; i2 < e3.handles; i2++) e3.tooltips.push(t3);
      } else {
        if ((t3 = d2(t3)).length !== e3.handles) throw new Error("noUiSlider: must pass a formatter for all handles.");
        t3.forEach((function(e4) {
          if ("boolean" != typeof e4 && !r(e4)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
        })), e3.tooltips = t3;
      }
    }
    function Q(e3, t3) {
      if (t3.length !== e3.handles) throw new Error("noUiSlider: must pass a attributes for all handles.");
      e3.handleAttributes = t3;
    }
    function Z(e3, t3) {
      if (!r(t3)) throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
      e3.ariaFormat = t3;
    }
    function ee(e3, r2) {
      if (!t2(r2)) throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
      e3.format = r2;
    }
    function te(e3, t3) {
      if ("boolean" != typeof t3) throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");
      e3.keyboardSupport = t3;
    }
    function re(e3, t3) {
      e3.documentElement = t3;
    }
    function ie(e3, t3) {
      if ("string" != typeof t3 && false !== t3) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
      e3.cssPrefix = t3;
    }
    function ne(e3, t3) {
      if ("object" != typeof t3) throw new Error("noUiSlider: 'cssClasses' must be an object.");
      "string" == typeof e3.cssPrefix ? (e3.cssClasses = {}, Object.keys(t3).forEach((function(r2) {
        e3.cssClasses[r2] = e3.cssPrefix + t3[r2];
      }))) : e3.cssClasses = t3;
    }
    function oe(e3) {
      var t3 = { margin: null, limit: null, padding: null, animate: true, animationDuration: 300, ariaFormat: U, format: U }, r2 = { step: { r: false, t: j }, keyboardPageMultiplier: { r: false, t: F }, keyboardMultiplier: { r: false, t: T }, keyboardDefaultStep: { r: false, t: z }, start: { r: true, t: q }, connect: { r: true, t: $ }, direction: { r: true, t: G }, snap: { r: false, t: R }, animate: { r: false, t: B }, animationDuration: { r: false, t: _ }, range: { r: true, t: H }, orientation: { r: false, t: X }, margin: { r: false, t: Y }, limit: { r: false, t: I }, padding: { r: false, t: W }, behaviour: { r: true, t: J }, ariaFormat: { r: false, t: Z }, format: { r: false, t: ee }, tooltips: { r: false, t: K }, keyboardSupport: { r: true, t: te }, documentElement: { r: false, t: re }, cssPrefix: { r: true, t: ie }, cssClasses: { r: true, t: ne }, handleAttributes: { r: false, t: Q } }, i2 = { connect: false, direction: "ltr", behaviour: "tap", orientation: "horizontal", keyboardSupport: true, cssPrefix: "noUi-", cssClasses: O, keyboardPageMultiplier: 5, keyboardMultiplier: 1, keyboardDefaultStep: 10 };
      e3.format && !e3.ariaFormat && (e3.ariaFormat = e3.format), Object.keys(r2).forEach((function(o3) {
        if (n(e3[o3]) || void 0 !== i2[o3]) r2[o3].t(t3, n(e3[o3]) ? e3[o3] : i2[o3]);
        else if (r2[o3].r) throw new Error("noUiSlider: '" + o3 + "' is required.");
      })), t3.pips = e3.pips;
      var o2 = document.createElement("div"), a2 = void 0 !== o2.style.msTransform, s2 = void 0 !== o2.style.transform;
      t3.transformRule = s2 ? "transform" : a2 ? "msTransform" : "webkitTransform";
      var l2 = [["left", "top"], ["right", "bottom"]];
      return t3.style = l2[t3.dir][t3.ort], t3;
    }
    function ae(t3, r2, s2) {
      var u3, f3, x2, w2, E2, P2 = b(), N2 = S() && y(), C2 = t3, k2 = r2.spectrum, V2 = [], A2 = [], M2 = [], L2 = 0, U2 = {}, O2 = t3.ownerDocument, j2 = r2.documentElement || O2.documentElement, F2 = O2.body, T2 = "rtl" === O2.dir || 1 === r2.ort ? 0 : 100;
      function z2(e3, t4) {
        var r3 = O2.createElement("div");
        return t4 && h2(r3, t4), e3.appendChild(r3), r3;
      }
      function H2(e3, t4) {
        var i2 = z2(e3, r2.cssClasses.origin), n2 = z2(i2, r2.cssClasses.handle);
        if (z2(n2, r2.cssClasses.touchArea), n2.setAttribute("data-handle", String(t4)), r2.keyboardSupport && (n2.setAttribute("tabindex", "0"), n2.addEventListener("keydown", (function(e4) {
          return fe(e4, t4);
        }))), void 0 !== r2.handleAttributes) {
          var o2 = r2.handleAttributes[t4];
          Object.keys(o2).forEach((function(e4) {
            n2.setAttribute(e4, o2[e4]);
          }));
        }
        return n2.setAttribute("role", "slider"), n2.setAttribute("aria-orientation", r2.ort ? "vertical" : "horizontal"), 0 === t4 ? h2(n2, r2.cssClasses.handleLower) : t4 === r2.handles - 1 && h2(n2, r2.cssClasses.handleUpper), i2;
      }
      function q2(e3, t4) {
        return !!t4 && z2(e3, r2.cssClasses.connect);
      }
      function R2(e3, t4) {
        var i2 = z2(t4, r2.cssClasses.connects);
        f3 = [], (x2 = []).push(q2(i2, e3[0]));
        for (var n2 = 0; n2 < r2.handles; n2++) f3.push(H2(t4, n2)), M2[n2] = n2, x2.push(q2(i2, e3[n2 + 1]));
      }
      function B2(e3) {
        return h2(e3, r2.cssClasses.target), 0 === r2.dir ? h2(e3, r2.cssClasses.ltr) : h2(e3, r2.cssClasses.rtl), 0 === r2.ort ? h2(e3, r2.cssClasses.horizontal) : h2(e3, r2.cssClasses.vertical), h2(e3, "rtl" === getComputedStyle(e3).direction ? r2.cssClasses.textDirectionRtl : r2.cssClasses.textDirectionLtr), z2(e3, r2.cssClasses.base);
      }
      function _2(e3, t4) {
        return !(!r2.tooltips || !r2.tooltips[t4]) && z2(e3.firstChild, r2.cssClasses.tooltip);
      }
      function $2() {
        return C2.hasAttribute("disabled");
      }
      function X2(e3) {
        return f3[e3].hasAttribute("disabled");
      }
      function Y2() {
        E2 && (ge("update" + D.tooltips), E2.forEach((function(e3) {
          e3 && i(e3);
        })), E2 = null);
      }
      function I2() {
        Y2(), E2 = f3.map(_2), me("update" + D.tooltips, (function(e3, t4, i2) {
          if (E2 && r2.tooltips && false !== E2[t4]) {
            var n2 = e3[t4];
            true !== r2.tooltips[t4] && (n2 = r2.tooltips[t4].to(i2[t4])), E2[t4].innerHTML = n2;
          }
        }));
      }
      function W2() {
        ge("update" + D.aria), me("update" + D.aria, (function(e3, t4, i2, n2, o2) {
          M2.forEach((function(e4) {
            var t5 = f3[e4], n3 = ye(A2, e4, 0, true, true, true), a2 = ye(A2, e4, 100, true, true, true), s3 = o2[e4], l2 = String(r2.ariaFormat.to(i2[e4]));
            n3 = k2.fromStepping(n3).toFixed(1), a2 = k2.fromStepping(a2).toFixed(1), s3 = k2.fromStepping(s3).toFixed(1), t5.children[0].setAttribute("aria-valuemin", n3), t5.children[0].setAttribute("aria-valuemax", a2), t5.children[0].setAttribute("aria-valuenow", s3), t5.children[0].setAttribute("aria-valuetext", l2);
          }));
        }));
      }
      function G2(t4) {
        if (t4.mode === e2.PipsMode.Range || t4.mode === e2.PipsMode.Steps) return k2.xVal;
        if (t4.mode === e2.PipsMode.Count) {
          if (t4.values < 2) throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
          for (var r3 = t4.values - 1, i2 = 100 / r3, n2 = []; r3--; ) n2[r3] = r3 * i2;
          return n2.push(100), J2(n2, t4.stepped);
        }
        return t4.mode === e2.PipsMode.Positions ? J2(t4.values, t4.stepped) : t4.mode === e2.PipsMode.Values ? t4.stepped ? t4.values.map((function(e3) {
          return k2.fromStepping(k2.getStep(k2.toStepping(e3)));
        })) : t4.values : [];
      }
      function J2(e3, t4) {
        return e3.map((function(e4) {
          return k2.fromStepping(t4 ? k2.getStep(e4) : e4);
        }));
      }
      function K2(t4) {
        function r3(e3, t5) {
          return Number((e3 + t5).toFixed(7));
        }
        var i2 = G2(t4), n2 = {}, o2 = k2.xVal[0], s3 = k2.xVal[k2.xVal.length - 1], l2 = false, u4 = false, c3 = 0;
        return (i2 = a(i2.slice().sort((function(e3, t5) {
          return e3 - t5;
        }))))[0] !== o2 && (i2.unshift(o2), l2 = true), i2[i2.length - 1] !== s3 && (i2.push(s3), u4 = true), i2.forEach((function(o3, a2) {
          var s4, p3, d3, f4, h3, m3, v2, g2, b2, y2, S2 = o3, x3 = i2[a2 + 1], w3 = t4.mode === e2.PipsMode.Steps;
          for (w3 && (s4 = k2.xNumSteps[a2]), s4 || (s4 = x3 - S2), void 0 === x3 && (x3 = S2), s4 = Math.max(s4, 1e-7), p3 = S2; p3 <= x3; p3 = r3(p3, s4)) {
            for (g2 = (h3 = (f4 = k2.toStepping(p3)) - c3) / (t4.density || 1), y2 = h3 / (b2 = Math.round(g2)), d3 = 1; d3 <= b2; d3 += 1) n2[(m3 = c3 + d3 * y2).toFixed(5)] = [k2.fromStepping(m3), 0];
            v2 = i2.indexOf(p3) > -1 ? e2.PipsType.LargeValue : w3 ? e2.PipsType.SmallValue : e2.PipsType.NoValue, !a2 && l2 && p3 !== x3 && (v2 = 0), p3 === x3 && u4 || (n2[f4.toFixed(5)] = [p3, v2]), c3 = f4;
          }
        })), n2;
      }
      function Q2(t4, i2, n2) {
        var o2, a2, s3 = O2.createElement("div"), l2 = ((o2 = {})[e2.PipsType.None] = "", o2[e2.PipsType.NoValue] = r2.cssClasses.valueNormal, o2[e2.PipsType.LargeValue] = r2.cssClasses.valueLarge, o2[e2.PipsType.SmallValue] = r2.cssClasses.valueSub, o2), u4 = ((a2 = {})[e2.PipsType.None] = "", a2[e2.PipsType.NoValue] = r2.cssClasses.markerNormal, a2[e2.PipsType.LargeValue] = r2.cssClasses.markerLarge, a2[e2.PipsType.SmallValue] = r2.cssClasses.markerSub, a2), c3 = [r2.cssClasses.valueHorizontal, r2.cssClasses.valueVertical], p3 = [r2.cssClasses.markerHorizontal, r2.cssClasses.markerVertical];
        function d3(e3, t5) {
          var i3 = t5 === r2.cssClasses.value, n3 = i3 ? l2 : u4;
          return t5 + " " + (i3 ? c3 : p3)[r2.ort] + " " + n3[e3];
        }
        function f4(t5, o3, a3) {
          if ((a3 = i2 ? i2(o3, a3) : a3) !== e2.PipsType.None) {
            var l3 = z2(s3, false);
            l3.className = d3(a3, r2.cssClasses.marker), l3.style[r2.style] = t5 + "%", a3 > e2.PipsType.NoValue && ((l3 = z2(s3, false)).className = d3(a3, r2.cssClasses.value), l3.setAttribute("data-value", String(o3)), l3.style[r2.style] = t5 + "%", l3.innerHTML = String(n2.to(o3)));
          }
        }
        return h2(s3, r2.cssClasses.pips), h2(s3, 0 === r2.ort ? r2.cssClasses.pipsHorizontal : r2.cssClasses.pipsVertical), Object.keys(t4).forEach((function(e3) {
          f4(e3, t4[e3][0], t4[e3][1]);
        })), s3;
      }
      function Z2() {
        w2 && (i(w2), w2 = null);
      }
      function ee2(e3) {
        Z2();
        var t4 = K2(e3), r3 = e3.filter, i2 = e3.format || { to: function(e4) {
          return String(Math.round(e4));
        } };
        return w2 = C2.appendChild(Q2(t4, r3, i2));
      }
      function te2() {
        var e3 = u3.getBoundingClientRect(), t4 = "offset" + ["Width", "Height"][r2.ort];
        return 0 === r2.ort ? e3.width || u3[t4] : e3.height || u3[t4];
      }
      function re2(e3, t4, i2, n2) {
        var o2 = function(o3) {
          var a3 = ie2(o3, n2.pageOffset, n2.target || t4);
          return !!a3 && !($2() && !n2.doNotReject) && !(v(C2, r2.cssClasses.tap) && !n2.doNotReject) && !(e3 === P2.start && void 0 !== a3.buttons && a3.buttons > 1) && (!n2.hover || !a3.buttons) && (N2 || a3.preventDefault(), a3.calcPoint = a3.points[r2.ort], void i2(a3, n2));
        }, a2 = [];
        return e3.split(" ").forEach((function(e4) {
          t4.addEventListener(e4, o2, !!N2 && { passive: true }), a2.push([e4, o2]);
        })), a2;
      }
      function ie2(e3, t4, r3) {
        var i2 = 0 === e3.type.indexOf("touch"), n2 = 0 === e3.type.indexOf("mouse"), o2 = 0 === e3.type.indexOf("pointer"), a2 = 0, s3 = 0;
        if (0 === e3.type.indexOf("MSPointer") && (o2 = true), "mousedown" === e3.type && !e3.buttons && !e3.touches) return false;
        if (i2) {
          var l2 = function(t5) {
            var i3 = t5.target;
            return i3 === r3 || r3.contains(i3) || e3.composed && e3.composedPath().shift() === r3;
          };
          if ("touchstart" === e3.type) {
            var u4 = Array.prototype.filter.call(e3.touches, l2);
            if (u4.length > 1) return false;
            a2 = u4[0].pageX, s3 = u4[0].pageY;
          } else {
            var c3 = Array.prototype.find.call(e3.changedTouches, l2);
            if (!c3) return false;
            a2 = c3.pageX, s3 = c3.pageY;
          }
        }
        return t4 = t4 || g(O2), (n2 || o2) && (a2 = e3.clientX + t4.x, s3 = e3.clientY + t4.y), e3.pageOffset = t4, e3.points = [a2, s3], e3.cursor = n2 || o2, e3;
      }
      function ne2(e3) {
        var t4 = 100 * (e3 - l(u3, r2.ort)) / te2();
        return t4 = p2(t4), r2.dir ? 100 - t4 : t4;
      }
      function ae2(e3) {
        var t4 = 100, r3 = false;
        return f3.forEach((function(i2, n2) {
          if (!X2(n2)) {
            var o2 = A2[n2], a2 = Math.abs(o2 - e3);
            (a2 < t4 || a2 <= t4 && e3 > o2 || 100 === a2 && 100 === t4) && (r3 = n2, t4 = a2);
          }
        })), r3;
      }
      function se2(e3, t4) {
        "mouseout" === e3.type && "HTML" === e3.target.nodeName && null === e3.relatedTarget && ue(e3, t4);
      }
      function le2(e3, t4) {
        if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === e3.buttons && 0 !== t4.buttonsProperty) return ue(e3, t4);
        var i2 = (r2.dir ? -1 : 1) * (e3.calcPoint - t4.startCalcPoint);
        xe(i2 > 0, 100 * i2 / t4.baseSize, t4.locations, t4.handleNumbers, t4.connect);
      }
      function ue(e3, t4) {
        t4.handle && (m2(t4.handle, r2.cssClasses.active), L2 -= 1), t4.listeners.forEach((function(e4) {
          j2.removeEventListener(e4[0], e4[1]);
        })), 0 === L2 && (m2(C2, r2.cssClasses.drag), Pe(), e3.cursor && (F2.style.cursor = "", F2.removeEventListener("selectstart", o))), r2.events.smoothSteps && (t4.handleNumbers.forEach((function(e4) {
          Ne(e4, A2[e4], true, true, false, false);
        })), t4.handleNumbers.forEach((function(e4) {
          be("update", e4);
        }))), t4.handleNumbers.forEach((function(e4) {
          be("change", e4), be("set", e4), be("end", e4);
        }));
      }
      function ce(e3, t4) {
        if (!t4.handleNumbers.some(X2)) {
          var i2;
          1 === t4.handleNumbers.length && (i2 = f3[t4.handleNumbers[0]].children[0], L2 += 1, h2(i2, r2.cssClasses.active)), e3.stopPropagation();
          var n2 = [], a2 = re2(P2.move, j2, le2, { target: e3.target, handle: i2, connect: t4.connect, listeners: n2, startCalcPoint: e3.calcPoint, baseSize: te2(), pageOffset: e3.pageOffset, handleNumbers: t4.handleNumbers, buttonsProperty: e3.buttons, locations: A2.slice() }), s3 = re2(P2.end, j2, ue, { target: e3.target, handle: i2, listeners: n2, doNotReject: true, handleNumbers: t4.handleNumbers }), l2 = re2("mouseout", j2, se2, { target: e3.target, handle: i2, listeners: n2, doNotReject: true, handleNumbers: t4.handleNumbers });
          n2.push.apply(n2, a2.concat(s3, l2)), e3.cursor && (F2.style.cursor = getComputedStyle(e3.target).cursor, f3.length > 1 && h2(C2, r2.cssClasses.drag), F2.addEventListener("selectstart", o, false)), t4.handleNumbers.forEach((function(e4) {
            be("start", e4);
          }));
        }
      }
      function pe(e3) {
        e3.stopPropagation();
        var t4 = ne2(e3.calcPoint), i2 = ae2(t4);
        false !== i2 && (r2.events.snap || c2(C2, r2.cssClasses.tap, r2.animationDuration), Ne(i2, t4, true, true), Pe(), be("slide", i2, true), be("update", i2, true), r2.events.snap ? ce(e3, { handleNumbers: [i2] }) : (be("change", i2, true), be("set", i2, true)));
      }
      function de(e3) {
        var t4 = ne2(e3.calcPoint), r3 = k2.getStep(t4), i2 = k2.fromStepping(r3);
        Object.keys(U2).forEach((function(e4) {
          "hover" === e4.split(".")[0] && U2[e4].forEach((function(e5) {
            e5.call(Te, i2);
          }));
        }));
      }
      function fe(e3, t4) {
        if ($2() || X2(t4)) return false;
        var i2 = ["Left", "Right"], n2 = ["Down", "Up"], o2 = ["PageDown", "PageUp"], a2 = ["Home", "End"];
        r2.dir && !r2.ort ? i2.reverse() : r2.ort && !r2.dir && (n2.reverse(), o2.reverse());
        var s3, l2 = e3.key.replace("Arrow", ""), u4 = l2 === o2[0], c3 = l2 === o2[1], p3 = l2 === n2[0] || l2 === i2[0] || u4, d3 = l2 === n2[1] || l2 === i2[1] || c3, f4 = l2 === a2[0], h3 = l2 === a2[1];
        if (!(p3 || d3 || f4 || h3)) return true;
        if (e3.preventDefault(), d3 || p3) {
          var m3 = p3 ? 0 : 1, v2 = Oe(t4)[m3];
          if (null === v2) return false;
          false === v2 && (v2 = k2.getDefaultStep(A2[t4], p3, r2.keyboardDefaultStep)), v2 *= c3 || u4 ? r2.keyboardPageMultiplier : r2.keyboardMultiplier, v2 = Math.max(v2, 1e-7), v2 *= p3 ? -1 : 1, s3 = V2[t4] + v2;
        } else s3 = h3 ? r2.spectrum.xVal[r2.spectrum.xVal.length - 1] : r2.spectrum.xVal[0];
        return Ne(t4, k2.toStepping(s3), true, true), be("slide", t4), be("update", t4), be("change", t4), be("set", t4), false;
      }
      function he(e3) {
        e3.fixed || f3.forEach((function(e4, t4) {
          re2(P2.start, e4.children[0], ce, { handleNumbers: [t4] });
        })), e3.tap && re2(P2.start, u3, pe, {}), e3.hover && re2(P2.move, u3, de, { hover: true }), e3.drag && x2.forEach((function(t4, i2) {
          if (false !== t4 && 0 !== i2 && i2 !== x2.length - 1) {
            var n2 = f3[i2 - 1], o2 = f3[i2], a2 = [t4], s3 = [n2, o2], l2 = [i2 - 1, i2];
            h2(t4, r2.cssClasses.draggable), e3.fixed && (a2.push(n2.children[0]), a2.push(o2.children[0])), e3.dragAll && (s3 = f3, l2 = M2), a2.forEach((function(e4) {
              re2(P2.start, e4, ce, { handles: s3, handleNumbers: l2, connect: t4 });
            }));
          }
        }));
      }
      function me(e3, t4) {
        U2[e3] = U2[e3] || [], U2[e3].push(t4), "update" === e3.split(".")[0] && f3.forEach((function(e4, t5) {
          be("update", t5);
        }));
      }
      function ve(e3) {
        return e3 === D.aria || e3 === D.tooltips;
      }
      function ge(e3) {
        var t4 = e3 && e3.split(".")[0], r3 = t4 ? e3.substring(t4.length) : e3;
        Object.keys(U2).forEach((function(e4) {
          var i2 = e4.split(".")[0], n2 = e4.substring(i2.length);
          t4 && t4 !== i2 || r3 && r3 !== n2 || ve(n2) && r3 !== n2 || delete U2[e4];
        }));
      }
      function be(e3, t4, i2) {
        Object.keys(U2).forEach((function(n2) {
          var o2 = n2.split(".")[0];
          e3 === o2 && U2[n2].forEach((function(e4) {
            e4.call(Te, V2.map(r2.format.to), t4, V2.slice(), i2 || false, A2.slice(), Te);
          }));
        }));
      }
      function ye(e3, t4, i2, n2, o2, a2, s3) {
        var l2;
        return f3.length > 1 && !r2.events.unconstrained && (n2 && t4 > 0 && (l2 = k2.getAbsoluteDistance(e3[t4 - 1], r2.margin, false), i2 = Math.max(i2, l2)), o2 && t4 < f3.length - 1 && (l2 = k2.getAbsoluteDistance(e3[t4 + 1], r2.margin, true), i2 = Math.min(i2, l2))), f3.length > 1 && r2.limit && (n2 && t4 > 0 && (l2 = k2.getAbsoluteDistance(e3[t4 - 1], r2.limit, false), i2 = Math.min(i2, l2)), o2 && t4 < f3.length - 1 && (l2 = k2.getAbsoluteDistance(e3[t4 + 1], r2.limit, true), i2 = Math.max(i2, l2))), r2.padding && (0 === t4 && (l2 = k2.getAbsoluteDistance(0, r2.padding[0], false), i2 = Math.max(i2, l2)), t4 === f3.length - 1 && (l2 = k2.getAbsoluteDistance(100, r2.padding[1], true), i2 = Math.min(i2, l2))), s3 || (i2 = k2.getStep(i2)), !((i2 = p2(i2)) === e3[t4] && !a2) && i2;
      }
      function Se(e3, t4) {
        var i2 = r2.ort;
        return (i2 ? t4 : e3) + ", " + (i2 ? e3 : t4);
      }
      function xe(e3, t4, i2, n2, o2) {
        var a2 = i2.slice(), s3 = n2[0], l2 = r2.events.smoothSteps, u4 = [!e3, e3], c3 = [e3, !e3];
        n2 = n2.slice(), e3 && n2.reverse(), n2.length > 1 ? n2.forEach((function(e4, r3) {
          var i3 = ye(a2, e4, a2[e4] + t4, u4[r3], c3[r3], false, l2);
          false === i3 ? t4 = 0 : (t4 = i3 - a2[e4], a2[e4] = i3);
        })) : u4 = c3 = [true];
        var p3 = false;
        n2.forEach((function(e4, r3) {
          p3 = Ne(e4, i2[e4] + t4, u4[r3], c3[r3], false, l2) || p3;
        })), p3 && (n2.forEach((function(e4) {
          be("update", e4), be("slide", e4);
        })), null != o2 && be("drag", s3));
      }
      function we(e3, t4) {
        return r2.dir ? 100 - e3 - t4 : e3;
      }
      function Ee(e3, t4) {
        A2[e3] = t4, V2[e3] = k2.fromStepping(t4);
        var i2 = "translate(" + Se(we(t4, 0) - T2 + "%", "0") + ")";
        f3[e3].style[r2.transformRule] = i2, Ce(e3), Ce(e3 + 1);
      }
      function Pe() {
        M2.forEach((function(e3) {
          var t4 = A2[e3] > 50 ? -1 : 1, r3 = 3 + (f3.length + t4 * e3);
          f3[e3].style.zIndex = String(r3);
        }));
      }
      function Ne(e3, t4, r3, i2, n2, o2) {
        return n2 || (t4 = ye(A2, e3, t4, r3, i2, false, o2)), false !== t4 && (Ee(e3, t4), true);
      }
      function Ce(e3) {
        if (x2[e3]) {
          var t4 = 0, i2 = 100;
          0 !== e3 && (t4 = A2[e3 - 1]), e3 !== x2.length - 1 && (i2 = A2[e3]);
          var n2 = i2 - t4, o2 = "translate(" + Se(we(t4, n2) + "%", "0") + ")", a2 = "scale(" + Se(n2 / 100, "1") + ")";
          x2[e3].style[r2.transformRule] = o2 + " " + a2;
        }
      }
      function ke(e3, t4) {
        return null === e3 || false === e3 || void 0 === e3 ? A2[t4] : ("number" == typeof e3 && (e3 = String(e3)), false !== (e3 = r2.format.from(e3)) && (e3 = k2.toStepping(e3)), false === e3 || isNaN(e3) ? A2[t4] : e3);
      }
      function Ve(e3, t4, i2) {
        var n2 = d2(e3), o2 = void 0 === A2[0];
        t4 = void 0 === t4 || t4, r2.animate && !o2 && c2(C2, r2.cssClasses.tap, r2.animationDuration), M2.forEach((function(e4) {
          Ne(e4, ke(n2[e4], e4), true, false, i2);
        }));
        var a2 = 1 === M2.length ? 0 : 1;
        if (o2 && k2.hasNoSize() && (i2 = true, A2[0] = 0, M2.length > 1)) {
          var s3 = 100 / (M2.length - 1);
          M2.forEach((function(e4) {
            A2[e4] = e4 * s3;
          }));
        }
        for (; a2 < M2.length; ++a2) M2.forEach((function(e4) {
          Ne(e4, A2[e4], true, true, i2);
        }));
        Pe(), M2.forEach((function(e4) {
          be("update", e4), null !== n2[e4] && t4 && be("set", e4);
        }));
      }
      function Ae(e3) {
        Ve(r2.start, e3);
      }
      function Me(e3, t4, r3, i2) {
        if (!((e3 = Number(e3)) >= 0 && e3 < M2.length)) throw new Error("noUiSlider: invalid handle number, got: " + e3);
        Ne(e3, ke(t4, e3), true, true, i2), be("update", e3), r3 && be("set", e3);
      }
      function Le(e3) {
        if (void 0 === e3 && (e3 = false), e3) return 1 === V2.length ? V2[0] : V2.slice(0);
        var t4 = V2.map(r2.format.to);
        return 1 === t4.length ? t4[0] : t4;
      }
      function Ue() {
        for (ge(D.aria), ge(D.tooltips), Object.keys(r2.cssClasses).forEach((function(e3) {
          m2(C2, r2.cssClasses[e3]);
        })); C2.firstChild; ) C2.removeChild(C2.firstChild);
        delete C2.noUiSlider;
      }
      function Oe(e3) {
        var t4 = A2[e3], i2 = k2.getNearbySteps(t4), n2 = V2[e3], o2 = i2.thisStep.step, a2 = null;
        if (r2.snap) return [n2 - i2.stepBefore.startValue || null, i2.stepAfter.startValue - n2 || null];
        false !== o2 && n2 + o2 > i2.stepAfter.startValue && (o2 = i2.stepAfter.startValue - n2), a2 = n2 > i2.thisStep.startValue ? i2.thisStep.step : false !== i2.stepBefore.step && n2 - i2.stepBefore.highestStep, 100 === t4 ? o2 = null : 0 === t4 && (a2 = null);
        var s3 = k2.countStepDecimals();
        return null !== o2 && false !== o2 && (o2 = Number(o2.toFixed(s3))), null !== a2 && false !== a2 && (a2 = Number(a2.toFixed(s3))), [a2, o2];
      }
      function De() {
        return M2.map(Oe);
      }
      function je(e3, t4) {
        var i2 = Le(), o2 = ["margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips"];
        o2.forEach((function(t5) {
          void 0 !== e3[t5] && (s2[t5] = e3[t5]);
        }));
        var a2 = oe(s2);
        o2.forEach((function(t5) {
          void 0 !== e3[t5] && (r2[t5] = a2[t5]);
        })), k2 = a2.spectrum, r2.margin = a2.margin, r2.limit = a2.limit, r2.padding = a2.padding, r2.pips ? ee2(r2.pips) : Z2(), r2.tooltips ? I2() : Y2(), A2 = [], Ve(n(e3.start) ? e3.start : i2, t4);
      }
      function Fe() {
        u3 = B2(C2), R2(r2.connect, u3), he(r2.events), Ve(r2.start), r2.pips && ee2(r2.pips), r2.tooltips && I2(), W2();
      }
      Fe();
      var Te = { destroy: Ue, steps: De, on: me, off: ge, get: Le, set: Ve, setHandle: Me, reset: Ae, __moveHandles: function(e3, t4, r3) {
        xe(e3, t4, A2, r3);
      }, options: s2, updateOptions: je, target: C2, removePips: Z2, removeTooltips: Y2, getPositions: function() {
        return A2.slice();
      }, getTooltips: function() {
        return E2;
      }, getOrigins: function() {
        return f3;
      }, pips: ee2 };
      return Te;
    }
    function se(e3, t3) {
      if (!e3 || !e3.nodeName) throw new Error("noUiSlider: create requires a single element, got: " + e3);
      if (e3.noUiSlider) throw new Error("noUiSlider: Slider was already initialized.");
      var r2 = ae(e3, oe(t3), t3);
      return e3.noUiSlider = r2, r2;
    }
    var le = { __spectrum: L, cssClasses: O, create: se };
    e2.create = se, e2.cssClasses = O, e2.default = le, Object.defineProperty(e2, "__esModule", { value: true });
  })(t);
})));
function h(e, t) {
  if (!Array.isArray(e) || !Array.isArray(t)) return false;
  const r = t.slice().sort();
  return e.length === t.length && e.slice().sort().every((function(e2, t2) {
    return e2 === r[t2];
  }));
}
var m = { name: "Slider", emits: ["input", "update:modelValue", "start", "slide", "drag", "update", "change", "set", "end"], props: { ...{ value: { validator: function(e) {
  return (e2) => "number" == typeof e2 || e2 instanceof Array || null == e2 || false === e2;
}, required: false }, modelValue: { validator: function(e) {
  return (e2) => "number" == typeof e2 || e2 instanceof Array || null == e2 || false === e2;
}, required: false } }, id: { type: [String, Number], required: false }, disabled: { type: Boolean, required: false, default: false }, min: { type: Number, required: false, default: 0 }, max: { type: Number, required: false, default: 100 }, step: { type: Number, required: false, default: 1 }, orientation: { type: String, required: false, default: "horizontal" }, direction: { type: String, required: false, default: "ltr" }, tooltips: { type: Boolean, required: false, default: true }, options: { type: Object, required: false, default: () => ({}) }, merge: { type: Number, required: false, default: -1 }, format: { type: [Object, Function, Boolean], required: false, default: null }, classes: { type: Object, required: false, default: () => ({}) }, showTooltip: { type: String, required: false, default: "always" }, tooltipPosition: { type: String, required: false, default: null }, lazy: { type: Boolean, required: false, default: true }, ariaLabelledby: { type: String, required: false, default: void 0 }, aria: { required: false, type: Object, default: () => ({}) } }, setup(a, s) {
  const l = (function(r, i, n) {
    const { value: o, modelValue: a2, min: s2 } = toRefs(r);
    let l2 = a2 && void 0 !== a2.value ? a2 : o;
    const c3 = ref(l2.value);
    if (u(l2.value) && (l2 = ref(s2.value)), Array.isArray(l2.value) && 0 == l2.value.length) throw new Error("Slider v-model must not be an empty array");
    return { value: l2, initialValue: c3 };
  })(a), c2 = (function(t, i, n) {
    const { classes: o, showTooltip: a2, tooltipPosition: s2, orientation: l2 } = toRefs(t), u2 = computed((() => ({ target: "slider-target", focused: "slider-focused", tooltipFocus: "slider-tooltip-focus", tooltipDrag: "slider-tooltip-drag", ltr: "slider-ltr", rtl: "slider-rtl", horizontal: "slider-horizontal", vertical: "slider-vertical", textDirectionRtl: "slider-txt-dir-rtl", textDirectionLtr: "slider-txt-dir-ltr", base: "slider-base", connects: "slider-connects", connect: "slider-connect", origin: "slider-origin", handle: "slider-handle", handleLower: "slider-handle-lower", handleUpper: "slider-handle-upper", touchArea: "slider-touch-area", tooltip: "slider-tooltip", tooltipTop: "slider-tooltip-top", tooltipBottom: "slider-tooltip-bottom", tooltipLeft: "slider-tooltip-left", tooltipRight: "slider-tooltip-right", tooltipHidden: "slider-tooltip-hidden", active: "slider-active", draggable: "slider-draggable", tap: "slider-state-tap", drag: "slider-state-drag", pips: "slider-pips", pipsHorizontal: "slider-pips-horizontal", pipsVertical: "slider-pips-vertical", marker: "slider-marker", markerHorizontal: "slider-marker-horizontal", markerVertical: "slider-marker-vertical", markerNormal: "slider-marker-normal", markerLarge: "slider-marker-large", markerSub: "slider-marker-sub", value: "slider-value", valueHorizontal: "slider-value-horizontal", valueVertical: "slider-value-vertical", valueNormal: "slider-value-normal", valueLarge: "slider-value-large", valueSub: "slider-value-sub", ...o.value })));
    return { classList: computed((() => {
      const e = { ...u2.value };
      return Object.keys(e).forEach(((t2) => {
        e[t2] = Array.isArray(e[t2]) ? e[t2].filter(((e2) => null !== e2)).join(" ") : e[t2];
      })), "always" !== a2.value && (e.target += ` ${"drag" === a2.value ? e.tooltipDrag : e.tooltipFocus}`), "horizontal" === l2.value && (e.tooltip += "bottom" === s2.value ? ` ${e.tooltipBottom}` : ` ${e.tooltipTop}`), "vertical" === l2.value && (e.tooltip += "right" === s2.value ? ` ${e.tooltipRight}` : ` ${e.tooltipLeft}`), e;
    })) };
  })(a), p2 = (function(t, i, n) {
    const { format: o, step: a2 } = toRefs(t), s2 = n.value, l2 = n.classList, u2 = computed((() => o && o.value ? "function" == typeof o.value ? { to: o.value } : d({ ...o.value }) : d({ decimals: a2.value >= 0 ? 0 : 2 }))), c3 = computed((() => Array.isArray(s2.value) ? s2.value.map(((e) => u2.value)) : u2.value));
    return { tooltipFormat: u2, tooltipsFormat: c3, tooltipsMerge: (e, t2, r) => {
      var i2 = "rtl" === getComputedStyle(e).direction, n2 = "rtl" === e.noUiSlider.options.direction, o2 = "vertical" === e.noUiSlider.options.orientation, a3 = e.noUiSlider.getTooltips(), s3 = e.noUiSlider.getOrigins();
      a3.forEach((function(e2, t3) {
        e2 && s3[t3].appendChild(e2);
      })), e.noUiSlider.on("update", (function(e2, s4, c4, p3, d2) {
        var f2 = [[]], h2 = [[]], m3 = [[]], v = 0;
        a3[0] && (f2[0][0] = 0, h2[0][0] = d2[0], m3[0][0] = u2.value.to(parseFloat(e2[0])));
        for (var g = 1; g < e2.length; g++) (!a3[g] || e2[g] - e2[g - 1] > t2) && (f2[++v] = [], m3[v] = [], h2[v] = []), a3[g] && (f2[v].push(g), m3[v].push(u2.value.to(parseFloat(e2[g]))), h2[v].push(d2[g]));
        f2.forEach((function(e3, t3) {
          for (var s5 = e3.length, u3 = 0; u3 < s5; u3++) {
            var c5 = e3[u3];
            if (u3 === s5 - 1) {
              var p4 = 0;
              h2[t3].forEach((function(e4) {
                p4 += 1e3 - e4;
              }));
              var d3 = o2 ? "bottom" : "right", f3 = n2 ? 0 : s5 - 1, v2 = 1e3 - h2[t3][f3];
              p4 = (i2 && !o2 ? 100 : 0) + p4 / s5 - v2, a3[c5].innerHTML = m3[t3].join(r), a3[c5].style.display = "block", a3[c5].style[d3] = p4 + "%", l2.value.tooltipHidden.split(" ").forEach(((e4) => {
                a3[c5].classList.contains(e4) && a3[c5].classList.remove(e4);
              }));
            } else a3[c5].style.display = "none", l2.value.tooltipHidden.split(" ").forEach(((e4) => {
              a3[c5].classList.add(e4);
            }));
          }
        }));
      }));
    } };
  })(a, 0, { value: l.value, classList: c2.classList }), m2 = (function(a2, s2, l2) {
    const { orientation: c3, direction: p3, tooltips: d2, step: m3, min: v, max: g, merge: b, id: y, disabled: S, options: x, classes: w, format: E, lazy: P, ariaLabelledby: N, aria: C } = toRefs(a2), k = l2.value, V = l2.initialValue, A = l2.tooltipsFormat, M = l2.tooltipsMerge, L = l2.tooltipFormat, U = l2.classList, O = ref(null), D = ref(null), j = ref(false), F = computed((() => {
      let e = { cssPrefix: "", cssClasses: U.value, orientation: c3.value, direction: p3.value, tooltips: !!d2.value && A.value, connect: "lower", start: u(k.value) ? v.value : k.value, range: { min: v.value, max: g.value } };
      if (m3.value > 0 && (e.step = m3.value), Array.isArray(k.value) && (e.connect = true), N && N.value || C && Object.keys(C.value).length) {
        let t = Array.isArray(k.value) ? k.value : [k.value];
        e.handleAttributes = t.map(((e2) => Object.assign({}, C.value, N && N.value ? { "aria-labelledby": N.value } : {})));
      }
      return E.value && (e.ariaFormat = L.value), e;
    })), T = computed((() => {
      let e = { id: y && y.value ? y.value : void 0 };
      return S.value && (e.disabled = true), e;
    })), z = computed((() => Array.isArray(k.value))), H = () => {
      let e = D.value.get();
      return Array.isArray(e) ? e.map(((e2) => parseFloat(e2))) : parseFloat(e);
    }, q = function(e) {
      let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
      D.value.set(e, t);
    }, R = (e) => {
      s2.emit("input", e), s2.emit("update:modelValue", e), s2.emit("update", e);
    }, B = () => {
      D.value = f.create(O.value, Object.assign({}, F.value, x.value)), d2.value && z.value && b.value >= 0 && M(O.value, b.value, " - "), D.value.on("set", (() => {
        const e = H();
        s2.emit("change", e), s2.emit("set", e), P.value && R(e);
      })), D.value.on("update", (() => {
        if (!j.value) return;
        const e = H();
        z.value && h(k.value, e) || !z.value && k.value == e ? s2.emit("update", e) : P.value || R(e);
      })), D.value.on("start", (() => {
        s2.emit("start", H());
      })), D.value.on("end", (() => {
        s2.emit("end", H());
      })), D.value.on("slide", (() => {
        s2.emit("slide", H());
      })), D.value.on("drag", (() => {
        s2.emit("drag", H());
      })), O.value.querySelectorAll("[data-handle]").forEach(((e) => {
        e.onblur = () => {
          O.value && U.value.focused.split(" ").forEach(((e2) => {
            O.value.classList.remove(e2);
          }));
        }, e.onfocus = () => {
          U.value.focused.split(" ").forEach(((e2) => {
            O.value.classList.add(e2);
          }));
        };
      })), j.value = true;
    }, _ = () => {
      D.value.off(), D.value.destroy(), D.value = null;
    }, $ = (e, t) => {
      j.value = false, _(), B();
    };
    return onMounted(B), onUnmounted(_), watch(z, $, { immediate: false }), watch(v, $, { immediate: false }), watch(g, $, { immediate: false }), watch(m3, $, { immediate: false }), watch(c3, $, { immediate: false }), watch(p3, $, { immediate: false }), watch(d2, $, { immediate: false }), watch(b, $, { immediate: false }), watch(E, $, { immediate: false, deep: true }), watch(x, $, { immediate: false, deep: true }), watch(w, $, { immediate: false, deep: true }), watch(k, ((e, t) => {
      t && ("object" == typeof t && "object" == typeof e && e && Object.keys(t) > Object.keys(e) || "object" == typeof t && "object" != typeof e || u(e)) && $();
    }), { immediate: false }), watch(k, ((e) => {
      if (u(e)) return void q(v.value, false);
      let t = H();
      z.value && !Array.isArray(t) && (t = [t]), (z.value && !h(e, t) || !z.value && e != t) && q(e, false);
    }), { deep: true }), { slider: O, slider$: D, isRange: z, sliderProps: T, init: B, destroy: _, refresh: $, update: q, reset: () => {
      R(V.value);
    } };
  })(a, s, { value: l.value, initialValue: l.initialValue, tooltipFormat: p2.tooltipFormat, tooltipsFormat: p2.tooltipsFormat, tooltipsMerge: p2.tooltipsMerge, classList: c2.classList });
  return { ...c2, ...p2, ...m2 };
} };
m.render = function(e, t, r, i, n, o) {
  return openBlock(), createElementBlock("div", mergeProps(e.sliderProps, { ref: "slider" }), null, 16);
}, m.__file = "src/Slider.vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SliderInput",
  props: /* @__PURE__ */ mergeModels({
    id: {},
    data: {},
    min: {},
    max: {},
    step: {},
    inputWidth: { default: "5rem" },
    lazy: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
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
      return m;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "d-flex align-items-center" };
const _hoisted_2 = ["id", "step", "disabled"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode($setup["VueSlider"], {
      modelValue: $setup.value,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.value = $event),
      class: "flex-grow-1",
      max: $props.max,
      min: $props.min,
      "v-data": $props.data,
      step: $props.step,
      showTooltip: "drag",
      lazy: $props.lazy,
      disabled: $props.disabled
    }, null, 8, ["modelValue", "max", "min", "v-data", "step", "lazy", "disabled"]),
    _cache[2] || (_cache[2] = createTextVNode()),
    withDirectives(createElementVNode("input", {
      type: "number",
      id: $props.id,
      class: "form-control ms-2",
      style: normalizeStyle({ width: $props.inputWidth }),
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.value = $event),
      step: $props.step,
      disabled: $props.disabled
    }, null, 12, _hoisted_2), [
      [vModelText, $setup.value]
    ])
  ]);
}
const SliderInput = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "SliderInput.vue"]]);
export {
  SliderInput as S,
  _export_sfc as _,
  isPrototype as a,
  arrayLikeKeys as b,
  isArrayLike as c,
  defaultsDeep as d,
  baseFor as e,
  identity as f,
  isIterateeCall as i,
  overArg as o
};
//# sourceMappingURL=SliderInput.js.map
