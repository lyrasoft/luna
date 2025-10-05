import { toRefs, ref, computed, onMounted, onUnmounted, watch, createElementBlock, openBlock, mergeProps, defineComponent, mergeModels, useModel, createVNode, createTextVNode, withDirectives, createElementVNode, normalizeStyle, vModelText } from "vue";
import { injectCssToDocument } from "@windwalker-io/unicorn-next";
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
var Symbol$1 = root.Symbol;
var objectProto$a = Object.prototype;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
var nativeObjectToString$1 = objectProto$a.toString;
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$8.call(value, symToStringTag$1), tag = value[symToStringTag$1];
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
var objectProto$9 = Object.prototype;
var nativeObjectToString = objectProto$9.toString;
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
var isArray = Array.isArray;
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
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
  AlertAdapter as A,
  Symbol$1 as S,
  _export_sfc as _,
  isArray as a,
  baseGetTag as b,
  isObject as c,
  isIterateeCall as d,
  SliderInput as e,
  defaultsDeep as f,
  isPrototype as g,
  arrayLikeKeys as h,
  isObjectLike as i,
  isArrayLike as j,
  baseFor as k,
  identity as l,
  overArg as o
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xpZGVySW5wdXQuanMiLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2ZyZWVHbG9iYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yb290LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU3ltYm9sLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UmF3VGFnLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlR2V0VGFnLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc09iamVjdExpa2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzT2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pZGVudGl0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNGdW5jdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NvcmVKc0RhdGEuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc01hc2tlZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3RvU291cmNlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzTmF0aXZlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0VmFsdWUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXROYXRpdmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlQ3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXBwbHkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jb3B5QXJyYXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zaG9ydE91dC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvY29uc3RhbnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19kZWZpbmVQcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VTZXRUb1N0cmluZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3NldFRvU3RyaW5nLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNJbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VBc3NpZ25WYWx1ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvZXEuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hc3NpZ25WYWx1ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NvcHlPYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vdmVyUmVzdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VSZXN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc0xlbmd0aC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNBcnJheUxpa2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc0l0ZXJhdGVlQ2FsbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NyZWF0ZUFzc2lnbmVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNQcm90b3R5cGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlVGltZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNBcmd1bWVudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJndW1lbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9zdHViRmFsc2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQnVmZmVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzVHlwZWRBcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VVbmFyeS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX25vZGVVdGlsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc1R5cGVkQXJyYXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcnJheUxpa2VLZXlzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlckFyZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX25hdGl2ZUtleXNJbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VLZXlzSW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2tleXNJbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX25hdGl2ZUNyZWF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2hhc2hDbGVhci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2hhc2hEZWxldGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19oYXNoR2V0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzaEhhcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2hhc2hTZXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19IYXNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbGlzdENhY2hlQ2xlYXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hc3NvY0luZGV4T2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVEZWxldGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVHZXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVIYXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVTZXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19MaXN0Q2FjaGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19NYXAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19tYXBDYWNoZUNsZWFyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNLZXlhYmxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0TWFwRGF0YS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hcENhY2hlRGVsZXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbWFwQ2FjaGVHZXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19tYXBDYWNoZUhhcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hcENhY2hlU2V0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fTWFwQ2FjaGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRQcm90b3R5cGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdGFja0NsZWFyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc3RhY2tEZWxldGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdGFja0dldC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3N0YWNrSGFzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc3RhY2tTZXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TdGFjay5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Nsb25lQnVmZmVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fVWludDhBcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Nsb25lQXJyYXlCdWZmZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jbG9uZVR5cGVkQXJyYXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pbml0Q2xvbmVPYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jcmVhdGVCYXNlRm9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUZvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Fzc2lnbk1lcmdlVmFsdWUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXlMaWtlT2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc2FmZUdldC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvdG9QbGFpbk9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VNZXJnZURlZXAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlTWVyZ2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jdXN0b21EZWZhdWx0c01lcmdlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9tZXJnZVdpdGguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2RlZmF1bHRzRGVlcC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AbHlyYXNvZnQvdHMtdG9vbGtpdC9zcmMvZ2VuZXJpYy9hbGVydC1hZGFwdGVyLnRzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0B2dWVmb3JtL3NsaWRlci9kaXN0L3NsaWRlci5qcyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL3BhZ2UtYnVpbGRlci9mb3JtL1NsaWRlcklucHV0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5leHBvcnQgZGVmYXVsdCBmcmVlR2xvYmFsO1xuIiwiaW1wb3J0IGZyZWVHbG9iYWwgZnJvbSAnLi9fZnJlZUdsb2JhbC5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuZXhwb3J0IGRlZmF1bHQgcm9vdDtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuZXhwb3J0IGRlZmF1bHQgU3ltYm9sO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJhd1RhZztcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvYmplY3RUb1N0cmluZztcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBnZXRSYXdUYWcgZnJvbSAnLi9fZ2V0UmF3VGFnLmpzJztcbmltcG9ydCBvYmplY3RUb1N0cmluZyBmcm9tICcuL19vYmplY3RUb1N0cmluZy5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlR2V0VGFnO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzT2JqZWN0TGlrZTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5leHBvcnQgZGVmYXVsdCBpc0FycmF5O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzT2JqZWN0O1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBpdCByZWNlaXZlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqXG4gKiBjb25zb2xlLmxvZyhfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaWRlbnRpdHk7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFzeW5jVGFnID0gJ1tvYmplY3QgQXN5bmNGdW5jdGlvbl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgcHJveHlUYWcgPSAnW29iamVjdCBQcm94eV0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXlzIGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBiYXNlR2V0VGFnKHZhbHVlKTtcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWcgfHwgdGFnID09IGFzeW5jVGFnIHx8IHRhZyA9PSBwcm94eVRhZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNGdW5jdGlvbjtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG5leHBvcnQgZGVmYXVsdCBjb3JlSnNEYXRhO1xuIiwiaW1wb3J0IGNvcmVKc0RhdGEgZnJvbSAnLi9fY29yZUpzRGF0YS5qcyc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzTWFza2VkO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0b1NvdXJjZTtcbiIsImltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4vaXNGdW5jdGlvbi5qcyc7XG5pbXBvcnQgaXNNYXNrZWQgZnJvbSAnLi9faXNNYXNrZWQuanMnO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuaW1wb3J0IHRvU291cmNlIGZyb20gJy4vX3RvU291cmNlLmpzJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSBpc0Z1bmN0aW9uKHZhbHVlKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUlzTmF0aXZlO1xuIiwiLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFZhbHVlO1xuIiwiaW1wb3J0IGJhc2VJc05hdGl2ZSBmcm9tICcuL19iYXNlSXNOYXRpdmUuanMnO1xuaW1wb3J0IGdldFZhbHVlIGZyb20gJy4vX2dldFZhbHVlLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0TmF0aXZlO1xuIiwiaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RDcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNyZWF0ZWAgd2l0aG91dCBzdXBwb3J0IGZvciBhc3NpZ25pbmdcbiAqIHByb3BlcnRpZXMgdG8gdGhlIGNyZWF0ZWQgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG8gVGhlIG9iamVjdCB0byBpbmhlcml0IGZyb20uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICovXG52YXIgYmFzZUNyZWF0ZSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gb2JqZWN0KCkge31cbiAgcmV0dXJuIGZ1bmN0aW9uKHByb3RvKSB7XG4gICAgaWYgKCFpc09iamVjdChwcm90bykpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgaWYgKG9iamVjdENyZWF0ZSkge1xuICAgICAgcmV0dXJuIG9iamVjdENyZWF0ZShwcm90byk7XG4gICAgfVxuICAgIG9iamVjdC5wcm90b3R5cGUgPSBwcm90bztcbiAgICB2YXIgcmVzdWx0ID0gbmV3IG9iamVjdDtcbiAgICBvYmplY3QucHJvdG90eXBlID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59KCkpO1xuXG5leHBvcnQgZGVmYXVsdCBiYXNlQ3JlYXRlO1xuIiwiLyoqXG4gKiBBIGZhc3RlciBhbHRlcm5hdGl2ZSB0byBgRnVuY3Rpb24jYXBwbHlgLCB0aGlzIGZ1bmN0aW9uIGludm9rZXMgYGZ1bmNgXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHRoZSBhcmd1bWVudHMgb2YgYGFyZ3NgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBmdW5jYC5cbiAqL1xuZnVuY3Rpb24gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncykge1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcpO1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICB9XG4gIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcHBseTtcbiIsIi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gY29weUFycmF5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb3B5QXJyYXk7XG4iLCIvKiogVXNlZCB0byBkZXRlY3QgaG90IGZ1bmN0aW9ucyBieSBudW1iZXIgb2YgY2FsbHMgd2l0aGluIGEgc3BhbiBvZiBtaWxsaXNlY29uZHMuICovXG52YXIgSE9UX0NPVU5UID0gODAwLFxuICAgIEhPVF9TUEFOID0gMTY7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVOb3cgPSBEYXRlLm5vdztcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCdsbCBzaG9ydCBvdXQgYW5kIGludm9rZSBgaWRlbnRpdHlgIGluc3RlYWRcbiAqIG9mIGBmdW5jYCB3aGVuIGl0J3MgY2FsbGVkIGBIT1RfQ09VTlRgIG9yIG1vcmUgdGltZXMgaW4gYEhPVF9TUEFOYFxuICogbWlsbGlzZWNvbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byByZXN0cmljdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHNob3J0YWJsZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gc2hvcnRPdXQoZnVuYykge1xuICB2YXIgY291bnQgPSAwLFxuICAgICAgbGFzdENhbGxlZCA9IDA7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdGFtcCA9IG5hdGl2ZU5vdygpLFxuICAgICAgICByZW1haW5pbmcgPSBIT1RfU1BBTiAtIChzdGFtcCAtIGxhc3RDYWxsZWQpO1xuXG4gICAgbGFzdENhbGxlZCA9IHN0YW1wO1xuICAgIGlmIChyZW1haW5pbmcgPiAwKSB7XG4gICAgICBpZiAoKytjb3VudCA+PSBIT1RfQ09VTlQpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3VtZW50c1swXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY291bnQgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gZnVuYy5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNob3J0T3V0O1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGB2YWx1ZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHJldHVybiBmcm9tIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjb25zdGFudCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdHMgPSBfLnRpbWVzKDIsIF8uY29uc3RhbnQoeyAnYSc6IDEgfSkpO1xuICpcbiAqIGNvbnNvbGUubG9nKG9iamVjdHMpO1xuICogLy8gPT4gW3sgJ2EnOiAxIH0sIHsgJ2EnOiAxIH1dXG4gKlxuICogY29uc29sZS5sb2cob2JqZWN0c1swXSA9PT0gb2JqZWN0c1sxXSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGNvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnN0YW50O1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgdmFyIGZ1bmMgPSBnZXROYXRpdmUoT2JqZWN0LCAnZGVmaW5lUHJvcGVydHknKTtcbiAgICBmdW5jKHt9LCAnJywge30pO1xuICAgIHJldHVybiBmdW5jO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lUHJvcGVydHk7XG4iLCJpbXBvcnQgY29uc3RhbnQgZnJvbSAnLi9jb25zdGFudC5qcyc7XG5pbXBvcnQgZGVmaW5lUHJvcGVydHkgZnJvbSAnLi9fZGVmaW5lUHJvcGVydHkuanMnO1xuaW1wb3J0IGlkZW50aXR5IGZyb20gJy4vaWRlbnRpdHkuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBzZXRUb1N0cmluZ2Agd2l0aG91dCBzdXBwb3J0IGZvciBob3QgbG9vcCBzaG9ydGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RyaW5nIFRoZSBgdG9TdHJpbmdgIHJlc3VsdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBgZnVuY2AuXG4gKi9cbnZhciBiYXNlU2V0VG9TdHJpbmcgPSAhZGVmaW5lUHJvcGVydHkgPyBpZGVudGl0eSA6IGZ1bmN0aW9uKGZ1bmMsIHN0cmluZykge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHkoZnVuYywgJ3RvU3RyaW5nJywge1xuICAgICdjb25maWd1cmFibGUnOiB0cnVlLFxuICAgICdlbnVtZXJhYmxlJzogZmFsc2UsXG4gICAgJ3ZhbHVlJzogY29uc3RhbnQoc3RyaW5nKSxcbiAgICAnd3JpdGFibGUnOiB0cnVlXG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYmFzZVNldFRvU3RyaW5nO1xuIiwiaW1wb3J0IGJhc2VTZXRUb1N0cmluZyBmcm9tICcuL19iYXNlU2V0VG9TdHJpbmcuanMnO1xuaW1wb3J0IHNob3J0T3V0IGZyb20gJy4vX3Nob3J0T3V0LmpzJztcblxuLyoqXG4gKiBTZXRzIHRoZSBgdG9TdHJpbmdgIG1ldGhvZCBvZiBgZnVuY2AgdG8gcmV0dXJuIGBzdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdHJpbmcgVGhlIGB0b1N0cmluZ2AgcmVzdWx0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGBmdW5jYC5cbiAqL1xudmFyIHNldFRvU3RyaW5nID0gc2hvcnRPdXQoYmFzZVNldFRvU3RyaW5nKTtcblxuZXhwb3J0IGRlZmF1bHQgc2V0VG9TdHJpbmc7XG4iLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcblxuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZSA9PSAnbnVtYmVyJyB8fFxuICAgICAgKHR5cGUgIT0gJ3N5bWJvbCcgJiYgcmVJc1VpbnQudGVzdCh2YWx1ZSkpKSAmJlxuICAgICAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzSW5kZXg7XG4iLCJpbXBvcnQgZGVmaW5lUHJvcGVydHkgZnJvbSAnLi9fZGVmaW5lUHJvcGVydHkuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBhc3NpZ25WYWx1ZWAgYW5kIGBhc3NpZ25NZXJnZVZhbHVlYCB3aXRob3V0XG4gKiB2YWx1ZSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5ID09ICdfX3Byb3RvX18nICYmIGRlZmluZVByb3BlcnR5KSB7XG4gICAgZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcbiAgICAgICdjb25maWd1cmFibGUnOiB0cnVlLFxuICAgICAgJ2VudW1lcmFibGUnOiB0cnVlLFxuICAgICAgJ3ZhbHVlJzogdmFsdWUsXG4gICAgICAnd3JpdGFibGUnOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlQXNzaWduVmFsdWU7XG4iLCIvKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXE7XG4iLCJpbXBvcnQgYmFzZUFzc2lnblZhbHVlIGZyb20gJy4vX2Jhc2VBc3NpZ25WYWx1ZS5qcyc7XG5pbXBvcnQgZXEgZnJvbSAnLi9lcS5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQXNzaWducyBgdmFsdWVgIHRvIGBrZXlgIG9mIGBvYmplY3RgIGlmIHRoZSBleGlzdGluZyB2YWx1ZSBpcyBub3QgZXF1aXZhbGVudFxuICogdXNpbmcgW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV07XG4gIGlmICghKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGVxKG9ialZhbHVlLCB2YWx1ZSkpIHx8XG4gICAgICAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzc2lnblZhbHVlO1xuIiwiaW1wb3J0IGFzc2lnblZhbHVlIGZyb20gJy4vX2Fzc2lnblZhbHVlLmpzJztcbmltcG9ydCBiYXNlQXNzaWduVmFsdWUgZnJvbSAnLi9fYmFzZUFzc2lnblZhbHVlLmpzJztcblxuLyoqXG4gKiBDb3BpZXMgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IGlkZW50aWZpZXJzIHRvIGNvcHkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb3BpZWQgdmFsdWVzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gY29weU9iamVjdChzb3VyY2UsIHByb3BzLCBvYmplY3QsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIGlzTmV3ID0gIW9iamVjdDtcbiAgb2JqZWN0IHx8IChvYmplY3QgPSB7fSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuXG4gICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgPyBjdXN0b21pemVyKG9iamVjdFtrZXldLCBzb3VyY2Vba2V5XSwga2V5LCBvYmplY3QsIHNvdXJjZSlcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5ld1ZhbHVlID0gc291cmNlW2tleV07XG4gICAgfVxuICAgIGlmIChpc05ldykge1xuICAgICAgYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvcHlPYmplY3Q7XG4iLCJpbXBvcnQgYXBwbHkgZnJvbSAnLi9fYXBwbHkuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlUmVzdGAgd2hpY2ggdHJhbnNmb3JtcyB0aGUgcmVzdCBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgYSByZXN0IHBhcmFtZXRlciB0by5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9ZnVuYy5sZW5ndGgtMV0gVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSByZXN0IHBhcmFtZXRlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgcmVzdCBhcnJheSB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlclJlc3QoZnVuYywgc3RhcnQsIHRyYW5zZm9ybSkge1xuICBzdGFydCA9IG5hdGl2ZU1heChzdGFydCA9PT0gdW5kZWZpbmVkID8gKGZ1bmMubGVuZ3RoIC0gMSkgOiBzdGFydCwgMCk7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4KGFyZ3MubGVuZ3RoIC0gc3RhcnQsIDApLFxuICAgICAgICBhcnJheSA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgYXJyYXlbaW5kZXhdID0gYXJnc1tzdGFydCArIGluZGV4XTtcbiAgICB9XG4gICAgaW5kZXggPSAtMTtcbiAgICB2YXIgb3RoZXJBcmdzID0gQXJyYXkoc3RhcnQgKyAxKTtcbiAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICBvdGhlckFyZ3NbaW5kZXhdID0gYXJnc1tpbmRleF07XG4gICAgfVxuICAgIG90aGVyQXJnc1tzdGFydF0gPSB0cmFuc2Zvcm0oYXJyYXkpO1xuICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzLCBvdGhlckFyZ3MpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBvdmVyUmVzdDtcbiIsImltcG9ydCBpZGVudGl0eSBmcm9tICcuL2lkZW50aXR5LmpzJztcbmltcG9ydCBvdmVyUmVzdCBmcm9tICcuL19vdmVyUmVzdC5qcyc7XG5pbXBvcnQgc2V0VG9TdHJpbmcgZnJvbSAnLi9fc2V0VG9TdHJpbmcuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnJlc3RgIHdoaWNoIGRvZXNuJ3QgdmFsaWRhdGUgb3IgY29lcmNlIGFyZ3VtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgYSByZXN0IHBhcmFtZXRlciB0by5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9ZnVuYy5sZW5ndGgtMV0gVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSByZXN0IHBhcmFtZXRlci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUmVzdChmdW5jLCBzdGFydCkge1xuICByZXR1cm4gc2V0VG9TdHJpbmcob3ZlclJlc3QoZnVuYywgc3RhcnQsIGlkZW50aXR5KSwgZnVuYyArICcnKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVJlc3Q7XG4iLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzTGVuZ3RoO1xuIiwiaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi9pc0Z1bmN0aW9uLmpzJztcbmltcG9ydCBpc0xlbmd0aCBmcm9tICcuL2lzTGVuZ3RoLmpzJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzQXJyYXlMaWtlO1xuIiwiaW1wb3J0IGVxIGZyb20gJy4vZXEuanMnO1xuaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuaW1wb3J0IGlzSW5kZXggZnJvbSAnLi9faXNJbmRleC5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSXRlcmF0ZWVDYWxsKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiBpbmRleDtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcidcbiAgICAgICAgPyAoaXNBcnJheUxpa2Uob2JqZWN0KSAmJiBpc0luZGV4KGluZGV4LCBvYmplY3QubGVuZ3RoKSlcbiAgICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpXG4gICAgICApIHtcbiAgICByZXR1cm4gZXEob2JqZWN0W2luZGV4XSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNJdGVyYXRlZUNhbGw7XG4iLCJpbXBvcnQgYmFzZVJlc3QgZnJvbSAnLi9fYmFzZVJlc3QuanMnO1xuaW1wb3J0IGlzSXRlcmF0ZWVDYWxsIGZyb20gJy4vX2lzSXRlcmF0ZWVDYWxsLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gbGlrZSBgXy5hc3NpZ25gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhc3NpZ25lciBUaGUgZnVuY3Rpb24gdG8gYXNzaWduIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFzc2lnbmVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVBc3NpZ25lcihhc3NpZ25lcikge1xuICByZXR1cm4gYmFzZVJlc3QoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2VzKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IHNvdXJjZXMubGVuZ3RoLFxuICAgICAgICBjdXN0b21pemVyID0gbGVuZ3RoID4gMSA/IHNvdXJjZXNbbGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQsXG4gICAgICAgIGd1YXJkID0gbGVuZ3RoID4gMiA/IHNvdXJjZXNbMl0gOiB1bmRlZmluZWQ7XG5cbiAgICBjdXN0b21pemVyID0gKGFzc2lnbmVyLmxlbmd0aCA+IDMgJiYgdHlwZW9mIGN1c3RvbWl6ZXIgPT0gJ2Z1bmN0aW9uJylcbiAgICAgID8gKGxlbmd0aC0tLCBjdXN0b21pemVyKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoc291cmNlc1swXSwgc291cmNlc1sxXSwgZ3VhcmQpKSB7XG4gICAgICBjdXN0b21pemVyID0gbGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IGN1c3RvbWl6ZXI7XG4gICAgICBsZW5ndGggPSAxO1xuICAgIH1cbiAgICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBhc3NpZ25lcihvYmplY3QsIHNvdXJjZSwgaW5kZXgsIGN1c3RvbWl6ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQXNzaWduZXI7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzUHJvdG90eXBlO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUaW1lcyhuLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVRpbWVzO1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0FyZ3VtZW50c2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICovXG5mdW5jdGlvbiBiYXNlSXNBcmd1bWVudHModmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gYXJnc1RhZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUlzQXJndW1lbnRzO1xuIiwiaW1wb3J0IGJhc2VJc0FyZ3VtZW50cyBmcm9tICcuL19iYXNlSXNBcmd1bWVudHMuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FyZ3VtZW50cyA9IGJhc2VJc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA/IGJhc2VJc0FyZ3VtZW50cyA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBpc0FyZ3VtZW50cztcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50aW1lcygyLCBfLnN0dWJGYWxzZSk7XG4gKiAvLyA9PiBbZmFsc2UsIGZhbHNlXVxuICovXG5mdW5jdGlvbiBzdHViRmFsc2UoKSB7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3R1YkZhbHNlO1xuIiwiaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5pbXBvcnQgc3R1YkZhbHNlIGZyb20gJy4vc3R1YkZhbHNlLmpzJztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQ7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVJc0J1ZmZlciA9IEJ1ZmZlciA/IEJ1ZmZlci5pc0J1ZmZlciA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBCdWZmZXIoMikpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IFVpbnQ4QXJyYXkoMikpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQnVmZmVyID0gbmF0aXZlSXNCdWZmZXIgfHwgc3R1YkZhbHNlO1xuXG5leHBvcnQgZGVmYXVsdCBpc0J1ZmZlcjtcbiIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGlzTGVuZ3RoIGZyb20gJy4vaXNMZW5ndGguanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRhVmlld1RhZ10gPSB0eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9XG50eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPSB0eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9XG50eXBlZEFycmF5VGFnc1ttYXBUYWddID0gdHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9XG50eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID0gdHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tzZXRUYWddID0gdHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9XG50eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzVHlwZWRBcnJheWAgd2l0aG91dCBOb2RlLmpzIG9wdGltaXphdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmXG4gICAgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW2Jhc2VHZXRUYWcodmFsdWUpXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUlzVHlwZWRBcnJheTtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5hcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3Igc3RvcmluZyBtZXRhZGF0YS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2FwIGFyZ3VtZW50cyBmb3IuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmFyeShmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jKHZhbHVlKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVVuYXJ5O1xuIiwiaW1wb3J0IGZyZWVHbG9iYWwgZnJvbSAnLi9fZnJlZUdsb2JhbC5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBwcm9jZXNzYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZVByb2Nlc3MgPSBtb2R1bGVFeHBvcnRzICYmIGZyZWVHbG9iYWwucHJvY2VzcztcblxuLyoqIFVzZWQgdG8gYWNjZXNzIGZhc3RlciBOb2RlLmpzIGhlbHBlcnMuICovXG52YXIgbm9kZVV0aWwgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgLy8gVXNlIGB1dGlsLnR5cGVzYCBmb3IgTm9kZS5qcyAxMCsuXG4gICAgdmFyIHR5cGVzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLnJlcXVpcmUgJiYgZnJlZU1vZHVsZS5yZXF1aXJlKCd1dGlsJykudHlwZXM7XG5cbiAgICBpZiAodHlwZXMpIHtcbiAgICAgIHJldHVybiB0eXBlcztcbiAgICB9XG5cbiAgICAvLyBMZWdhY3kgYHByb2Nlc3MuYmluZGluZygndXRpbCcpYCBmb3IgTm9kZS5qcyA8IDEwLlxuICAgIHJldHVybiBmcmVlUHJvY2VzcyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcoJ3V0aWwnKTtcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IG5vZGVVdGlsO1xuIiwiaW1wb3J0IGJhc2VJc1R5cGVkQXJyYXkgZnJvbSAnLi9fYmFzZUlzVHlwZWRBcnJheS5qcyc7XG5pbXBvcnQgYmFzZVVuYXJ5IGZyb20gJy4vX2Jhc2VVbmFyeS5qcyc7XG5pbXBvcnQgbm9kZVV0aWwgZnJvbSAnLi9fbm9kZVV0aWwuanMnO1xuXG4vKiBOb2RlLmpzIGhlbHBlciByZWZlcmVuY2VzLiAqL1xudmFyIG5vZGVJc1R5cGVkQXJyYXkgPSBub2RlVXRpbCAmJiBub2RlVXRpbC5pc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc1R5cGVkQXJyYXkgPSBub2RlSXNUeXBlZEFycmF5ID8gYmFzZVVuYXJ5KG5vZGVJc1R5cGVkQXJyYXkpIDogYmFzZUlzVHlwZWRBcnJheTtcblxuZXhwb3J0IGRlZmF1bHQgaXNUeXBlZEFycmF5O1xuIiwiaW1wb3J0IGJhc2VUaW1lcyBmcm9tICcuL19iYXNlVGltZXMuanMnO1xuaW1wb3J0IGlzQXJndW1lbnRzIGZyb20gJy4vaXNBcmd1bWVudHMuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc0J1ZmZlciBmcm9tICcuL2lzQnVmZmVyLmpzJztcbmltcG9ydCBpc0luZGV4IGZyb20gJy4vX2lzSW5kZXguanMnO1xuaW1wb3J0IGlzVHlwZWRBcnJheSBmcm9tICcuL2lzVHlwZWRBcnJheS5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiB0aGUgYXJyYXktbGlrZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdGVkIFNwZWNpZnkgcmV0dXJuaW5nIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZUtleXModmFsdWUsIGluaGVyaXRlZCkge1xuICB2YXIgaXNBcnIgPSBpc0FycmF5KHZhbHVlKSxcbiAgICAgIGlzQXJnID0gIWlzQXJyICYmIGlzQXJndW1lbnRzKHZhbHVlKSxcbiAgICAgIGlzQnVmZiA9ICFpc0FyciAmJiAhaXNBcmcgJiYgaXNCdWZmZXIodmFsdWUpLFxuICAgICAgaXNUeXBlID0gIWlzQXJyICYmICFpc0FyZyAmJiAhaXNCdWZmICYmIGlzVHlwZWRBcnJheSh2YWx1ZSksXG4gICAgICBza2lwSW5kZXhlcyA9IGlzQXJyIHx8IGlzQXJnIHx8IGlzQnVmZiB8fCBpc1R5cGUsXG4gICAgICByZXN1bHQgPSBza2lwSW5kZXhlcyA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZykgOiBbXSxcbiAgICAgIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoXG4gICAgICAgICAgIC8vIFNhZmFyaSA5IGhhcyBlbnVtZXJhYmxlIGBhcmd1bWVudHMubGVuZ3RoYCBpbiBzdHJpY3QgbW9kZS5cbiAgICAgICAgICAga2V5ID09ICdsZW5ndGgnIHx8XG4gICAgICAgICAgIC8vIE5vZGUuanMgMC4xMCBoYXMgZW51bWVyYWJsZSBub24taW5kZXggcHJvcGVydGllcyBvbiBidWZmZXJzLlxuICAgICAgICAgICAoaXNCdWZmICYmIChrZXkgPT0gJ29mZnNldCcgfHwga2V5ID09ICdwYXJlbnQnKSkgfHxcbiAgICAgICAgICAgLy8gUGhhbnRvbUpTIDIgaGFzIGVudW1lcmFibGUgbm9uLWluZGV4IHByb3BlcnRpZXMgb24gdHlwZWQgYXJyYXlzLlxuICAgICAgICAgICAoaXNUeXBlICYmIChrZXkgPT0gJ2J1ZmZlcicgfHwga2V5ID09ICdieXRlTGVuZ3RoJyB8fCBrZXkgPT0gJ2J5dGVPZmZzZXQnKSkgfHxcbiAgICAgICAgICAgLy8gU2tpcCBpbmRleCBwcm9wZXJ0aWVzLlxuICAgICAgICAgICBpc0luZGV4KGtleSwgbGVuZ3RoKVxuICAgICAgICApKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlMaWtlS2V5cztcbiIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBvdmVyQXJnO1xuIiwiLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2VcbiAqIFtgT2JqZWN0LmtleXNgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGV4Y2VwdCB0aGF0IGl0IGluY2x1ZGVzIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIG5hdGl2ZUtleXNJbihvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAob2JqZWN0ICE9IG51bGwpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5hdGl2ZUtleXNJbjtcbiIsImltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcbmltcG9ydCBpc1Byb3RvdHlwZSBmcm9tICcuL19pc1Byb3RvdHlwZS5qcyc7XG5pbXBvcnQgbmF0aXZlS2V5c0luIGZyb20gJy4vX25hdGl2ZUtleXNJbi5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c0luYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzSW4ob2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzSW4ob2JqZWN0KTtcbiAgfVxuICB2YXIgaXNQcm90byA9IGlzUHJvdG90eXBlKG9iamVjdCksXG4gICAgICByZXN1bHQgPSBbXTtcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKCEoa2V5ID09ICdjb25zdHJ1Y3RvcicgJiYgKGlzUHJvdG8gfHwgIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VLZXlzSW47XG4iLCJpbXBvcnQgYXJyYXlMaWtlS2V5cyBmcm9tICcuL19hcnJheUxpa2VLZXlzLmpzJztcbmltcG9ydCBiYXNlS2V5c0luIGZyb20gJy4vX2Jhc2VLZXlzSW4uanMnO1xuaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0LCB0cnVlKSA6IGJhc2VLZXlzSW4ob2JqZWN0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQga2V5c0luO1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG5leHBvcnQgZGVmYXVsdCBuYXRpdmVDcmVhdGU7XG4iLCJpbXBvcnQgbmF0aXZlQ3JlYXRlIGZyb20gJy4vX25hdGl2ZUNyZWF0ZS5qcyc7XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNoQ2xlYXI7XG4iLCIvKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgdmFyIHJlc3VsdCA9IHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbiAgdGhpcy5zaXplIC09IHJlc3VsdCA/IDEgOiAwO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNoRGVsZXRlO1xuIiwiaW1wb3J0IG5hdGl2ZUNyZWF0ZSBmcm9tICcuL19uYXRpdmVDcmVhdGUuanMnO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhc2hHZXQ7XG4iLCJpbXBvcnQgbmF0aXZlQ3JlYXRlIGZyb20gJy4vX25hdGl2ZUNyZWF0ZS5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gKGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFzaEhhcztcbiIsImltcG9ydCBuYXRpdmVDcmVhdGUgZnJvbSAnLi9fbmF0aXZlQ3JlYXRlLmpzJztcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICB0aGlzLnNpemUgKz0gdGhpcy5oYXMoa2V5KSA/IDAgOiAxO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhc2hTZXQ7XG4iLCJpbXBvcnQgaGFzaENsZWFyIGZyb20gJy4vX2hhc2hDbGVhci5qcyc7XG5pbXBvcnQgaGFzaERlbGV0ZSBmcm9tICcuL19oYXNoRGVsZXRlLmpzJztcbmltcG9ydCBoYXNoR2V0IGZyb20gJy4vX2hhc2hHZXQuanMnO1xuaW1wb3J0IGhhc2hIYXMgZnJvbSAnLi9faGFzaEhhcy5qcyc7XG5pbXBvcnQgaGFzaFNldCBmcm9tICcuL19oYXNoU2V0LmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbmV4cG9ydCBkZWZhdWx0IEhhc2g7XG4iLCIvKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RDYWNoZUNsZWFyO1xuIiwiaW1wb3J0IGVxIGZyb20gJy4vZXEuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc3NvY0luZGV4T2Y7XG4iLCJpbXBvcnQgYXNzb2NJbmRleE9mIGZyb20gJy4vX2Fzc29jSW5kZXhPZi5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIC0tdGhpcy5zaXplO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGlzdENhY2hlRGVsZXRlO1xuIiwiaW1wb3J0IGFzc29jSW5kZXhPZiBmcm9tICcuL19hc3NvY0luZGV4T2YuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGRhdGFbaW5kZXhdWzFdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsaXN0Q2FjaGVHZXQ7XG4iLCJpbXBvcnQgYXNzb2NJbmRleE9mIGZyb20gJy4vX2Fzc29jSW5kZXhPZi5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsaXN0Q2FjaGVIYXM7XG4iLCJpbXBvcnQgYXNzb2NJbmRleE9mIGZyb20gJy4vX2Fzc29jSW5kZXhPZi5qcyc7XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgKyt0aGlzLnNpemU7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGlzdENhY2hlU2V0O1xuIiwiaW1wb3J0IGxpc3RDYWNoZUNsZWFyIGZyb20gJy4vX2xpc3RDYWNoZUNsZWFyLmpzJztcbmltcG9ydCBsaXN0Q2FjaGVEZWxldGUgZnJvbSAnLi9fbGlzdENhY2hlRGVsZXRlLmpzJztcbmltcG9ydCBsaXN0Q2FjaGVHZXQgZnJvbSAnLi9fbGlzdENhY2hlR2V0LmpzJztcbmltcG9ydCBsaXN0Q2FjaGVIYXMgZnJvbSAnLi9fbGlzdENhY2hlSGFzLmpzJztcbmltcG9ydCBsaXN0Q2FjaGVTZXQgZnJvbSAnLi9fbGlzdENhY2hlU2V0LmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG5leHBvcnQgZGVmYXVsdCBMaXN0Q2FjaGU7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5pbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyk7XG5cbmV4cG9ydCBkZWZhdWx0IE1hcDtcbiIsImltcG9ydCBIYXNoIGZyb20gJy4vX0hhc2guanMnO1xuaW1wb3J0IExpc3RDYWNoZSBmcm9tICcuL19MaXN0Q2FjaGUuanMnO1xuaW1wb3J0IE1hcCBmcm9tICcuL19NYXAuanMnO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLnNpemUgPSAwO1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcENhY2hlQ2xlYXI7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzS2V5YWJsZTtcbiIsImltcG9ydCBpc0tleWFibGUgZnJvbSAnLi9faXNLZXlhYmxlLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRNYXBEYXRhO1xuIiwiaW1wb3J0IGdldE1hcERhdGEgZnJvbSAnLi9fZ2V0TWFwRGF0YS5qcyc7XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIHJlc3VsdCA9IGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbiAgdGhpcy5zaXplIC09IHJlc3VsdCA/IDEgOiAwO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBDYWNoZURlbGV0ZTtcbiIsImltcG9ydCBnZXRNYXBEYXRhIGZyb20gJy4vX2dldE1hcERhdGEuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcENhY2hlR2V0O1xuIiwiaW1wb3J0IGdldE1hcERhdGEgZnJvbSAnLi9fZ2V0TWFwRGF0YS5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcENhY2hlSGFzO1xuIiwiaW1wb3J0IGdldE1hcERhdGEgZnJvbSAnLi9fZ2V0TWFwRGF0YS5qcyc7XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IGdldE1hcERhdGEodGhpcywga2V5KSxcbiAgICAgIHNpemUgPSBkYXRhLnNpemU7XG5cbiAgZGF0YS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHRoaXMuc2l6ZSArPSBkYXRhLnNpemUgPT0gc2l6ZSA/IDAgOiAxO1xuICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFwQ2FjaGVTZXQ7XG4iLCJpbXBvcnQgbWFwQ2FjaGVDbGVhciBmcm9tICcuL19tYXBDYWNoZUNsZWFyLmpzJztcbmltcG9ydCBtYXBDYWNoZURlbGV0ZSBmcm9tICcuL19tYXBDYWNoZURlbGV0ZS5qcyc7XG5pbXBvcnQgbWFwQ2FjaGVHZXQgZnJvbSAnLi9fbWFwQ2FjaGVHZXQuanMnO1xuaW1wb3J0IG1hcENhY2hlSGFzIGZyb20gJy4vX21hcENhY2hlSGFzLmpzJztcbmltcG9ydCBtYXBDYWNoZVNldCBmcm9tICcuL19tYXBDYWNoZVNldC5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA9PSBudWxsID8gMCA6IGVudHJpZXMubGVuZ3RoO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG5leHBvcnQgZGVmYXVsdCBNYXBDYWNoZTtcbiIsImltcG9ydCBvdmVyQXJnIGZyb20gJy4vX292ZXJBcmcuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBnZXRQcm90b3R5cGUgPSBvdmVyQXJnKE9iamVjdC5nZXRQcm90b3R5cGVPZiwgT2JqZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0UHJvdG90eXBlO1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlIGZyb20gJy4vX2dldFByb3RvdHlwZS5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fCBiYXNlR2V0VGFnKHZhbHVlKSAhPSBvYmplY3RUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiZcbiAgICBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1BsYWluT2JqZWN0O1xuIiwiaW1wb3J0IExpc3RDYWNoZSBmcm9tICcuL19MaXN0Q2FjaGUuanMnO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIFN0YWNrXG4gKi9cbmZ1bmN0aW9uIHN0YWNrQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlO1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFja0NsZWFyO1xuIiwiLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIHJlc3VsdCA9IGRhdGFbJ2RlbGV0ZSddKGtleSk7XG5cbiAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFja0RlbGV0ZTtcbiIsIi8qKlxuICogR2V0cyB0aGUgc3RhY2sgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrR2V0KGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5nZXQoa2V5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RhY2tHZXQ7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBhIHN0YWNrIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tIYXMoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyhrZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFja0hhcztcbiIsImltcG9ydCBMaXN0Q2FjaGUgZnJvbSAnLi9fTGlzdENhY2hlLmpzJztcbmltcG9ydCBNYXAgZnJvbSAnLi9fTWFwLmpzJztcbmltcG9ydCBNYXBDYWNoZSBmcm9tICcuL19NYXBDYWNoZS5qcyc7XG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKlxuICogU2V0cyB0aGUgc3RhY2sgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgc3RhY2sgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAoZGF0YSBpbnN0YW5jZW9mIExpc3RDYWNoZSkge1xuICAgIHZhciBwYWlycyA9IGRhdGEuX19kYXRhX187XG4gICAgaWYgKCFNYXAgfHwgKHBhaXJzLmxlbmd0aCA8IExBUkdFX0FSUkFZX1NJWkUgLSAxKSkge1xuICAgICAgcGFpcnMucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgdGhpcy5zaXplID0gKytkYXRhLnNpemU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZGF0YSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGUocGFpcnMpO1xuICB9XG4gIGRhdGEuc2V0KGtleSwgdmFsdWUpO1xuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG4gIHJldHVybiB0aGlzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFja1NldDtcbiIsImltcG9ydCBMaXN0Q2FjaGUgZnJvbSAnLi9fTGlzdENhY2hlLmpzJztcbmltcG9ydCBzdGFja0NsZWFyIGZyb20gJy4vX3N0YWNrQ2xlYXIuanMnO1xuaW1wb3J0IHN0YWNrRGVsZXRlIGZyb20gJy4vX3N0YWNrRGVsZXRlLmpzJztcbmltcG9ydCBzdGFja0dldCBmcm9tICcuL19zdGFja0dldC5qcyc7XG5pbXBvcnQgc3RhY2tIYXMgZnJvbSAnLi9fc3RhY2tIYXMuanMnO1xuaW1wb3J0IHN0YWNrU2V0IGZyb20gJy4vX3N0YWNrU2V0LmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RhY2sgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU3RhY2soZW50cmllcykge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlKGVudHJpZXMpO1xuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTdGFja2AuXG5TdGFjay5wcm90b3R5cGUuY2xlYXIgPSBzdGFja0NsZWFyO1xuU3RhY2sucHJvdG90eXBlWydkZWxldGUnXSA9IHN0YWNrRGVsZXRlO1xuU3RhY2sucHJvdG90eXBlLmdldCA9IHN0YWNrR2V0O1xuU3RhY2sucHJvdG90eXBlLmhhcyA9IHN0YWNrSGFzO1xuU3RhY2sucHJvdG90eXBlLnNldCA9IHN0YWNrU2V0O1xuXG5leHBvcnQgZGVmYXVsdCBTdGFjaztcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIEJ1ZmZlciA9IG1vZHVsZUV4cG9ydHMgPyByb290LkJ1ZmZlciA6IHVuZGVmaW5lZCxcbiAgICBhbGxvY1Vuc2FmZSA9IEJ1ZmZlciA/IEJ1ZmZlci5hbGxvY1Vuc2FmZSA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgIGBidWZmZXJgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyIFRoZSBidWZmZXIgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge0J1ZmZlcn0gUmV0dXJucyB0aGUgY2xvbmVkIGJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gY2xvbmVCdWZmZXIoYnVmZmVyLCBpc0RlZXApIHtcbiAgaWYgKGlzRGVlcCkge1xuICAgIHJldHVybiBidWZmZXIuc2xpY2UoKTtcbiAgfVxuICB2YXIgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IGFsbG9jVW5zYWZlID8gYWxsb2NVbnNhZmUobGVuZ3RoKSA6IG5ldyBidWZmZXIuY29uc3RydWN0b3IobGVuZ3RoKTtcblxuICBidWZmZXIuY29weShyZXN1bHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbG9uZUJ1ZmZlcjtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBVaW50OEFycmF5ID0gcm9vdC5VaW50OEFycmF5O1xuXG5leHBvcnQgZGVmYXVsdCBVaW50OEFycmF5O1xuIiwiaW1wb3J0IFVpbnQ4QXJyYXkgZnJvbSAnLi9fVWludDhBcnJheS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBhcnJheUJ1ZmZlcmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGFycmF5QnVmZmVyIFRoZSBhcnJheSBidWZmZXIgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7QXJyYXlCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBhcnJheSBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQXJyYXlCdWZmZXIoYXJyYXlCdWZmZXIpIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyBhcnJheUJ1ZmZlci5jb25zdHJ1Y3RvcihhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgbmV3IFVpbnQ4QXJyYXkocmVzdWx0KS5zZXQobmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xvbmVBcnJheUJ1ZmZlcjtcbiIsImltcG9ydCBjbG9uZUFycmF5QnVmZmVyIGZyb20gJy4vX2Nsb25lQXJyYXlCdWZmZXIuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgdHlwZWRBcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB0eXBlZEFycmF5IFRoZSB0eXBlZCBhcnJheSB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgdHlwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGNsb25lVHlwZWRBcnJheSh0eXBlZEFycmF5LCBpc0RlZXApIHtcbiAgdmFyIGJ1ZmZlciA9IGlzRGVlcCA/IGNsb25lQXJyYXlCdWZmZXIodHlwZWRBcnJheS5idWZmZXIpIDogdHlwZWRBcnJheS5idWZmZXI7XG4gIHJldHVybiBuZXcgdHlwZWRBcnJheS5jb25zdHJ1Y3RvcihidWZmZXIsIHR5cGVkQXJyYXkuYnl0ZU9mZnNldCwgdHlwZWRBcnJheS5sZW5ndGgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbG9uZVR5cGVkQXJyYXk7XG4iLCJpbXBvcnQgYmFzZUNyZWF0ZSBmcm9tICcuL19iYXNlQ3JlYXRlLmpzJztcbmltcG9ydCBnZXRQcm90b3R5cGUgZnJvbSAnLi9fZ2V0UHJvdG90eXBlLmpzJztcbmltcG9ydCBpc1Byb3RvdHlwZSBmcm9tICcuL19pc1Byb3RvdHlwZS5qcyc7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gb2JqZWN0IGNsb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBpbml0aWFsaXplZCBjbG9uZS5cbiAqL1xuZnVuY3Rpb24gaW5pdENsb25lT2JqZWN0KG9iamVjdCkge1xuICByZXR1cm4gKHR5cGVvZiBvYmplY3QuY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNQcm90b3R5cGUob2JqZWN0KSlcbiAgICA/IGJhc2VDcmVhdGUoZ2V0UHJvdG90eXBlKG9iamVjdCkpXG4gICAgOiB7fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdENsb25lT2JqZWN0O1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgYmFzZSBmdW5jdGlvbiBmb3IgbWV0aG9kcyBsaWtlIGBfLmZvckluYCBhbmQgYF8uZm9yT3duYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNlRm9yKGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0LCBpdGVyYXRlZSwga2V5c0Z1bmMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgaXRlcmFibGUgPSBPYmplY3Qob2JqZWN0KSxcbiAgICAgICAgcHJvcHMgPSBrZXlzRnVuYyhvYmplY3QpLFxuICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1tmcm9tUmlnaHQgPyBsZW5ndGggOiArK2luZGV4XTtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtrZXldLCBrZXksIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUJhc2VGb3I7XG4iLCJpbXBvcnQgY3JlYXRlQmFzZUZvciBmcm9tICcuL19jcmVhdGVCYXNlRm9yLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvck93bmAgd2hpY2ggaXRlcmF0ZXMgb3ZlciBgb2JqZWN0YFxuICogcHJvcGVydGllcyByZXR1cm5lZCBieSBga2V5c0Z1bmNgIGFuZCBpbnZva2VzIGBpdGVyYXRlZWAgZm9yIGVhY2ggcHJvcGVydHkuXG4gKiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbnZhciBiYXNlRm9yID0gY3JlYXRlQmFzZUZvcigpO1xuXG5leHBvcnQgZGVmYXVsdCBiYXNlRm9yO1xuIiwiaW1wb3J0IGJhc2VBc3NpZ25WYWx1ZSBmcm9tICcuL19iYXNlQXNzaWduVmFsdWUuanMnO1xuaW1wb3J0IGVxIGZyb20gJy4vZXEuanMnO1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZSBgYXNzaWduVmFsdWVgIGV4Y2VwdCB0aGF0IGl0IGRvZXNuJ3QgYXNzaWduXG4gKiBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgaWYgKCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICFlcShvYmplY3Rba2V5XSwgdmFsdWUpKSB8fFxuICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhc3NpZ25NZXJnZVZhbHVlO1xuIiwiaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNBcnJheUxpa2VPYmplY3Q7XG4iLCIvKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgLCB1bmxlc3MgYGtleWAgaXMgXCJfX3Byb3RvX19cIiBvciBcImNvbnN0cnVjdG9yXCIuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBzYWZlR2V0KG9iamVjdCwga2V5KSB7XG4gIGlmIChrZXkgPT09ICdjb25zdHJ1Y3RvcicgJiYgdHlwZW9mIG9iamVjdFtrZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGtleSA9PSAnX19wcm90b19fJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHJldHVybiBvYmplY3Rba2V5XTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2FmZUdldDtcbiIsImltcG9ydCBjb3B5T2JqZWN0IGZyb20gJy4vX2NvcHlPYmplY3QuanMnO1xuaW1wb3J0IGtleXNJbiBmcm9tICcuL2tleXNJbi5qcyc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHBsYWluIG9iamVjdCBmbGF0dGVuaW5nIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZ1xuICoga2V5ZWQgcHJvcGVydGllcyBvZiBgdmFsdWVgIHRvIG93biBwcm9wZXJ0aWVzIG9mIHRoZSBwbGFpbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgcGxhaW4gb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBuZXcgRm9vKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIF8udG9QbGFpbk9iamVjdChuZXcgRm9vKSk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyLCAnYyc6IDMgfVxuICovXG5mdW5jdGlvbiB0b1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBjb3B5T2JqZWN0KHZhbHVlLCBrZXlzSW4odmFsdWUpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdG9QbGFpbk9iamVjdDtcbiIsImltcG9ydCBhc3NpZ25NZXJnZVZhbHVlIGZyb20gJy4vX2Fzc2lnbk1lcmdlVmFsdWUuanMnO1xuaW1wb3J0IGNsb25lQnVmZmVyIGZyb20gJy4vX2Nsb25lQnVmZmVyLmpzJztcbmltcG9ydCBjbG9uZVR5cGVkQXJyYXkgZnJvbSAnLi9fY2xvbmVUeXBlZEFycmF5LmpzJztcbmltcG9ydCBjb3B5QXJyYXkgZnJvbSAnLi9fY29weUFycmF5LmpzJztcbmltcG9ydCBpbml0Q2xvbmVPYmplY3QgZnJvbSAnLi9faW5pdENsb25lT2JqZWN0LmpzJztcbmltcG9ydCBpc0FyZ3VtZW50cyBmcm9tICcuL2lzQXJndW1lbnRzLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5pbXBvcnQgaXNBcnJheUxpa2VPYmplY3QgZnJvbSAnLi9pc0FycmF5TGlrZU9iamVjdC5qcyc7XG5pbXBvcnQgaXNCdWZmZXIgZnJvbSAnLi9pc0J1ZmZlci5qcyc7XG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuL2lzRnVuY3Rpb24uanMnO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSAnLi9pc1BsYWluT2JqZWN0LmpzJztcbmltcG9ydCBpc1R5cGVkQXJyYXkgZnJvbSAnLi9pc1R5cGVkQXJyYXkuanMnO1xuaW1wb3J0IHNhZmVHZXQgZnJvbSAnLi9fc2FmZUdldC5qcyc7XG5pbXBvcnQgdG9QbGFpbk9iamVjdCBmcm9tICcuL3RvUGxhaW5PYmplY3QuanMnO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZU1lcmdlYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIG1lcmdlcyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBtZXJnZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIG1lcmdlLlxuICogQHBhcmFtIHtudW1iZXJ9IHNyY0luZGV4IFRoZSBpbmRleCBvZiBgc291cmNlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1lcmdlRnVuYyBUaGUgZnVuY3Rpb24gdG8gbWVyZ2UgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduZWQgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2UgdmFsdWVzIGFuZCB0aGVpciBtZXJnZWRcbiAqICBjb3VudGVycGFydHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgc3JjSW5kZXgsIG1lcmdlRnVuYywgY3VzdG9taXplciwgc3RhY2spIHtcbiAgdmFyIG9ialZhbHVlID0gc2FmZUdldChvYmplY3QsIGtleSksXG4gICAgICBzcmNWYWx1ZSA9IHNhZmVHZXQoc291cmNlLCBrZXkpLFxuICAgICAgc3RhY2tlZCA9IHN0YWNrLmdldChzcmNWYWx1ZSk7XG5cbiAgaWYgKHN0YWNrZWQpIHtcbiAgICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBzdGFja2VkKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgID8gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUsIChrZXkgKyAnJyksIG9iamVjdCwgc291cmNlLCBzdGFjaylcbiAgICA6IHVuZGVmaW5lZDtcblxuICB2YXIgaXNDb21tb24gPSBuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkO1xuXG4gIGlmIChpc0NvbW1vbikge1xuICAgIHZhciBpc0FyciA9IGlzQXJyYXkoc3JjVmFsdWUpLFxuICAgICAgICBpc0J1ZmYgPSAhaXNBcnIgJiYgaXNCdWZmZXIoc3JjVmFsdWUpLFxuICAgICAgICBpc1R5cGVkID0gIWlzQXJyICYmICFpc0J1ZmYgJiYgaXNUeXBlZEFycmF5KHNyY1ZhbHVlKTtcblxuICAgIG5ld1ZhbHVlID0gc3JjVmFsdWU7XG4gICAgaWYgKGlzQXJyIHx8IGlzQnVmZiB8fCBpc1R5cGVkKSB7XG4gICAgICBpZiAoaXNBcnJheShvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBvYmpWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzQXJyYXlMaWtlT2JqZWN0KG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IGNvcHlBcnJheShvYmpWYWx1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0J1ZmYpIHtcbiAgICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICAgICAgbmV3VmFsdWUgPSBjbG9uZUJ1ZmZlcihzcmNWYWx1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc1R5cGVkKSB7XG4gICAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgICAgIG5ld1ZhbHVlID0gY2xvbmVUeXBlZEFycmF5KHNyY1ZhbHVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBuZXdWYWx1ZSA9IFtdO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHNyY1ZhbHVlKSB8fCBpc0FyZ3VtZW50cyhzcmNWYWx1ZSkpIHtcbiAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICBpZiAoaXNBcmd1bWVudHMob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gdG9QbGFpbk9iamVjdChvYmpWYWx1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghaXNPYmplY3Qob2JqVmFsdWUpIHx8IGlzRnVuY3Rpb24ob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gaW5pdENsb25lT2JqZWN0KHNyY1ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBpZiAoaXNDb21tb24pIHtcbiAgICAvLyBSZWN1cnNpdmVseSBtZXJnZSBvYmplY3RzIGFuZCBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBzdGFjay5zZXQoc3JjVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICBtZXJnZUZ1bmMobmV3VmFsdWUsIHNyY1ZhbHVlLCBzcmNJbmRleCwgY3VzdG9taXplciwgc3RhY2spO1xuICAgIHN0YWNrWydkZWxldGUnXShzcmNWYWx1ZSk7XG4gIH1cbiAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlTWVyZ2VEZWVwO1xuIiwiaW1wb3J0IFN0YWNrIGZyb20gJy4vX1N0YWNrLmpzJztcbmltcG9ydCBhc3NpZ25NZXJnZVZhbHVlIGZyb20gJy4vX2Fzc2lnbk1lcmdlVmFsdWUuanMnO1xuaW1wb3J0IGJhc2VGb3IgZnJvbSAnLi9fYmFzZUZvci5qcyc7XG5pbXBvcnQgYmFzZU1lcmdlRGVlcCBmcm9tICcuL19iYXNlTWVyZ2VEZWVwLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcbmltcG9ydCBrZXlzSW4gZnJvbSAnLi9rZXlzSW4uanMnO1xuaW1wb3J0IHNhZmVHZXQgZnJvbSAnLi9fc2FmZUdldC5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWVyZ2VgIHdpdGhvdXQgc3VwcG9ydCBmb3IgbXVsdGlwbGUgc291cmNlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzcmNJbmRleCBUaGUgaW5kZXggb2YgYHNvdXJjZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBtZXJnZWQgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2UgdmFsdWVzIGFuZCB0aGVpciBtZXJnZWRcbiAqICBjb3VudGVycGFydHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIsIHN0YWNrKSB7XG4gIGlmIChvYmplY3QgPT09IHNvdXJjZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBiYXNlRm9yKHNvdXJjZSwgZnVuY3Rpb24oc3JjVmFsdWUsIGtleSkge1xuICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgaWYgKGlzT2JqZWN0KHNyY1ZhbHVlKSkge1xuICAgICAgYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgYmFzZU1lcmdlLCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgICA/IGN1c3RvbWl6ZXIoc2FmZUdldChvYmplY3QsIGtleSksIHNyY1ZhbHVlLCAoa2V5ICsgJycpLCBvYmplY3QsIHNvdXJjZSwgc3RhY2spXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBuZXdWYWx1ZSA9IHNyY1ZhbHVlO1xuICAgICAgfVxuICAgICAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH1cbiAgfSwga2V5c0luKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZU1lcmdlO1xuIiwiaW1wb3J0IGJhc2VNZXJnZSBmcm9tICcuL19iYXNlTWVyZ2UuanMnO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuXG4vKipcbiAqIFVzZWQgYnkgYF8uZGVmYXVsdHNEZWVwYCB0byBjdXN0b21pemUgaXRzIGBfLm1lcmdlYCB1c2UgdG8gbWVyZ2Ugc291cmNlXG4gKiBvYmplY3RzIGludG8gZGVzdGluYXRpb24gb2JqZWN0cyB0aGF0IGFyZSBwYXNzZWQgdGhydS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSBvYmpWYWx1ZSBUaGUgZGVzdGluYXRpb24gdmFsdWUuXG4gKiBAcGFyYW0geyp9IHNyY1ZhbHVlIFRoZSBzb3VyY2UgdmFsdWUuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIG1lcmdlLlxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgcGFyZW50IG9iamVjdCBvZiBgb2JqVmFsdWVgLlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgcGFyZW50IG9iamVjdCBvZiBgc3JjVmFsdWVgLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2UgdmFsdWVzIGFuZCB0aGVpciBtZXJnZWRcbiAqICBjb3VudGVycGFydHMuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBjdXN0b21EZWZhdWx0c01lcmdlKG9ialZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSwgc3RhY2spIHtcbiAgaWYgKGlzT2JqZWN0KG9ialZhbHVlKSAmJiBpc09iamVjdChzcmNWYWx1ZSkpIHtcbiAgICAvLyBSZWN1cnNpdmVseSBtZXJnZSBvYmplY3RzIGFuZCBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBzdGFjay5zZXQoc3JjVmFsdWUsIG9ialZhbHVlKTtcbiAgICBiYXNlTWVyZ2Uob2JqVmFsdWUsIHNyY1ZhbHVlLCB1bmRlZmluZWQsIGN1c3RvbURlZmF1bHRzTWVyZ2UsIHN0YWNrKTtcbiAgICBzdGFja1snZGVsZXRlJ10oc3JjVmFsdWUpO1xuICB9XG4gIHJldHVybiBvYmpWYWx1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3VzdG9tRGVmYXVsdHNNZXJnZTtcbiIsImltcG9ydCBiYXNlTWVyZ2UgZnJvbSAnLi9fYmFzZU1lcmdlLmpzJztcbmltcG9ydCBjcmVhdGVBc3NpZ25lciBmcm9tICcuL19jcmVhdGVBc3NpZ25lci5qcyc7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5tZXJnZWAgZXhjZXB0IHRoYXQgaXQgYWNjZXB0cyBgY3VzdG9taXplcmAgd2hpY2hcbiAqIGlzIGludm9rZWQgdG8gcHJvZHVjZSB0aGUgbWVyZ2VkIHZhbHVlcyBvZiB0aGUgZGVzdGluYXRpb24gYW5kIHNvdXJjZVxuICogcHJvcGVydGllcy4gSWYgYGN1c3RvbWl6ZXJgIHJldHVybnMgYHVuZGVmaW5lZGAsIG1lcmdpbmcgaXMgaGFuZGxlZCBieSB0aGVcbiAqIG1ldGhvZCBpbnN0ZWFkLiBUaGUgYGN1c3RvbWl6ZXJgIGlzIGludm9rZWQgd2l0aCBzaXggYXJndW1lbnRzOlxuICogKG9ialZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSwgc3RhY2spLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBtdXRhdGVzIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBzb3VyY2VzIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSkge1xuICogICBpZiAoXy5pc0FycmF5KG9ialZhbHVlKSkge1xuICogICAgIHJldHVybiBvYmpWYWx1ZS5jb25jYXQoc3JjVmFsdWUpO1xuICogICB9XG4gKiB9XG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiBbMV0sICdiJzogWzJdIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogWzNdLCAnYic6IFs0XSB9O1xuICpcbiAqIF8ubWVyZ2VXaXRoKG9iamVjdCwgb3RoZXIsIGN1c3RvbWl6ZXIpO1xuICogLy8gPT4geyAnYSc6IFsxLCAzXSwgJ2InOiBbMiwgNF0gfVxuICovXG52YXIgbWVyZ2VXaXRoID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4LCBjdXN0b21pemVyKSB7XG4gIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IG1lcmdlV2l0aDtcbiIsImltcG9ydCBhcHBseSBmcm9tICcuL19hcHBseS5qcyc7XG5pbXBvcnQgYmFzZVJlc3QgZnJvbSAnLi9fYmFzZVJlc3QuanMnO1xuaW1wb3J0IGN1c3RvbURlZmF1bHRzTWVyZ2UgZnJvbSAnLi9fY3VzdG9tRGVmYXVsdHNNZXJnZS5qcyc7XG5pbXBvcnQgbWVyZ2VXaXRoIGZyb20gJy4vbWVyZ2VXaXRoLmpzJztcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmRlZmF1bHRzYCBleGNlcHQgdGhhdCBpdCByZWN1cnNpdmVseSBhc3NpZ25zXG4gKiBkZWZhdWx0IHByb3BlcnRpZXMuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjEwLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBzZWUgXy5kZWZhdWx0c1xuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlZmF1bHRzRGVlcCh7ICdhJzogeyAnYic6IDIgfSB9LCB7ICdhJzogeyAnYic6IDEsICdjJzogMyB9IH0pO1xuICogLy8gPT4geyAnYSc6IHsgJ2InOiAyLCAnYyc6IDMgfSB9XG4gKi9cbnZhciBkZWZhdWx0c0RlZXAgPSBiYXNlUmVzdChmdW5jdGlvbihhcmdzKSB7XG4gIGFyZ3MucHVzaCh1bmRlZmluZWQsIGN1c3RvbURlZmF1bHRzTWVyZ2UpO1xuICByZXR1cm4gYXBwbHkobWVyZ2VXaXRoLCB1bmRlZmluZWQsIGFyZ3MpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRzRGVlcDtcbiIsImV4cG9ydCB0eXBlIEFsZXJ0SGFuZGxlciA9ICh0aXRsZTogc3RyaW5nLCB0ZXh0Pzogc3RyaW5nLCBpY29uPzogc3RyaW5nLCBleHRyYT86IGFueSkgPT4gUHJvbWlzZTx2b2lkPjtcclxuZXhwb3J0IHR5cGUgQ29uZmlybUhhbmRsZXIgPSAodGl0bGU6IHN0cmluZywgdGV4dD86IHN0cmluZywgaWNvbj86IHN0cmluZywgZXh0cmE/OiBhbnkpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcblxyXG5leHBvcnQgY2xhc3MgQWxlcnRBZGFwdGVyIHtcclxuICBzdGF0aWMgYWxlcnQ6IEFsZXJ0SGFuZGxlciA9IGFzeW5jICh0aXRsZTogc3RyaW5nKSA9PiB3aW5kb3cuYWxlcnQodGl0bGUpO1xyXG4gIHN0YXRpYyBjb25maXJtOiBDb25maXJtSGFuZGxlciA9IGFzeW5jICh0aXRsZTogc3RyaW5nKSA9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUpID0+IHtcclxuICAgICAgY29uc3QgdiA9IGNvbmZpcm0odGl0bGUpO1xyXG5cclxuICAgICAgcmVzb2x2ZSh2KTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc3RhdGljIGRlbGV0ZUNvbmZpcm06IENvbmZpcm1IYW5kbGVyID0gYXN5bmMgKHRpdGxlOiBzdHJpbmcpID0+IHRoaXMuY29uZmlybSh0aXRsZSk7XHJcblxyXG4gIHN0YXRpYyBjb25maXJtVGV4dDogKCkgPT4gc3RyaW5nID0gKCkgPT4gJ+eiuuiqjSc7XHJcbiAgc3RhdGljIGNhbmNlbFRleHQ6ICgpID0+IHN0cmluZyA9ICgpID0+ICflj5bmtognO1xyXG4gIHN0YXRpYyBkZWxldGVUZXh0OiAoKSA9PiBzdHJpbmcgPSAoKSA9PiAn5Yiq6ZmkJztcclxufVxyXG5cclxuIiwiaW1wb3J0e3RvUmVmcyBhcyBlLHJlZiBhcyB0LGNvbXB1dGVkIGFzIHIsb25Nb3VudGVkIGFzIGksb25Vbm1vdW50ZWQgYXMgbix3YXRjaCBhcyBvLG9wZW5CbG9jayBhcyBhLGNyZWF0ZUVsZW1lbnRCbG9jayBhcyBzLG1lcmdlUHJvcHMgYXMgbH1mcm9tXCJ2dWVcIjtmdW5jdGlvbiB1KGUpe3JldHVybi0xIT09W251bGwsdm9pZCAwLCExXS5pbmRleE9mKGUpfVwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGYmJnNlbGY7ZnVuY3Rpb24gYyhlKXtyZXR1cm4gZSYmZS5fX2VzTW9kdWxlJiZPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxcImRlZmF1bHRcIik/ZS5kZWZhdWx0OmV9ZnVuY3Rpb24gcChlKXt2YXIgdD17ZXhwb3J0czp7fX07cmV0dXJuIGUodCx0LmV4cG9ydHMpLHQuZXhwb3J0c312YXIgZD1wKChmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz1mdW5jdGlvbigpe3ZhciBlPVtcImRlY2ltYWxzXCIsXCJ0aG91c2FuZFwiLFwibWFya1wiLFwicHJlZml4XCIsXCJzdWZmaXhcIixcImVuY29kZXJcIixcImRlY29kZXJcIixcIm5lZ2F0aXZlQmVmb3JlXCIsXCJuZWdhdGl2ZVwiLFwiZWRpdFwiLFwidW5kb1wiXTtmdW5jdGlvbiB0KGUpe3JldHVybiBlLnNwbGl0KFwiXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpfWZ1bmN0aW9uIHIoZSx0KXtyZXR1cm4gZS5zdWJzdHJpbmcoMCx0Lmxlbmd0aCk9PT10fWZ1bmN0aW9uIGkoZSx0KXtyZXR1cm4gZS5zbGljZSgtMSp0Lmxlbmd0aCk9PT10fWZ1bmN0aW9uIG4oZSx0LHIpe2lmKChlW3RdfHxlW3JdKSYmZVt0XT09PWVbcl0pdGhyb3cgbmV3IEVycm9yKHQpfWZ1bmN0aW9uIG8oZSl7cmV0dXJuXCJudW1iZXJcIj09dHlwZW9mIGUmJmlzRmluaXRlKGUpfWZ1bmN0aW9uIGEoZSx0KXtyZXR1cm4gZT1lLnRvU3RyaW5nKCkuc3BsaXQoXCJlXCIpLCgrKChlPShlPU1hdGgucm91bmQoKyhlWzBdK1wiZVwiKyhlWzFdPytlWzFdK3Q6dCkpKSkudG9TdHJpbmcoKS5zcGxpdChcImVcIikpWzBdK1wiZVwiKyhlWzFdPytlWzFdLXQ6LXQpKSkudG9GaXhlZCh0KX1mdW5jdGlvbiBzKGUscixpLG4scyxsLHUsYyxwLGQsZixoKXt2YXIgbSx2LGcsYj1oLHk9XCJcIixTPVwiXCI7cmV0dXJuIGwmJihoPWwoaCkpLCEhbyhoKSYmKCExIT09ZSYmMD09PXBhcnNlRmxvYXQoaC50b0ZpeGVkKGUpKSYmKGg9MCksaDwwJiYobT0hMCxoPU1hdGguYWJzKGgpKSwhMSE9PWUmJihoPWEoaCxlKSksLTEhPT0oaD1oLnRvU3RyaW5nKCkpLmluZGV4T2YoXCIuXCIpPyhnPSh2PWguc3BsaXQoXCIuXCIpKVswXSxpJiYoeT1pK3ZbMV0pKTpnPWgsciYmKGc9dChnKS5tYXRjaCgvLnsxLDN9L2cpLGc9dChnLmpvaW4odChyKSkpKSxtJiZjJiYoUys9YyksbiYmKFMrPW4pLG0mJnAmJihTKz1wKSxTKz1nLFMrPXkscyYmKFMrPXMpLGQmJihTPWQoUyxiKSksUyl9ZnVuY3Rpb24gbChlLHQsbixhLHMsbCx1LGMscCxkLGYsaCl7dmFyIG0sdj1cIlwiO3JldHVybiBmJiYoaD1mKGgpKSwhKCFofHxcInN0cmluZ1wiIT10eXBlb2YgaCkmJihjJiZyKGgsYykmJihoPWgucmVwbGFjZShjLFwiXCIpLG09ITApLGEmJnIoaCxhKSYmKGg9aC5yZXBsYWNlKGEsXCJcIikpLHAmJnIoaCxwKSYmKGg9aC5yZXBsYWNlKHAsXCJcIiksbT0hMCkscyYmaShoLHMpJiYoaD1oLnNsaWNlKDAsLTEqcy5sZW5ndGgpKSx0JiYoaD1oLnNwbGl0KHQpLmpvaW4oXCJcIikpLG4mJihoPWgucmVwbGFjZShuLFwiLlwiKSksbSYmKHYrPVwiLVwiKSxcIlwiIT09KHY9KHYrPWgpLnJlcGxhY2UoL1teMC05XFwuXFwtLl0vZyxcIlwiKSkmJih2PU51bWJlcih2KSx1JiYodj11KHYpKSwhIW8odikmJnYpKX1mdW5jdGlvbiB1KHQpe3ZhciByLGksbyxhPXt9O2Zvcih2b2lkIDA9PT10LnN1ZmZpeCYmKHQuc3VmZml4PXQucG9zdGZpeCkscj0wO3I8ZS5sZW5ndGg7cis9MSlpZih2b2lkIDA9PT0obz10W2k9ZVtyXV0pKVwibmVnYXRpdmVcIiE9PWl8fGEubmVnYXRpdmVCZWZvcmU/XCJtYXJrXCI9PT1pJiZcIi5cIiE9PWEudGhvdXNhbmQ/YVtpXT1cIi5cIjphW2ldPSExOmFbaV09XCItXCI7ZWxzZSBpZihcImRlY2ltYWxzXCI9PT1pKXtpZighKG8+PTAmJm88OCkpdGhyb3cgbmV3IEVycm9yKGkpO2FbaV09b31lbHNlIGlmKFwiZW5jb2RlclwiPT09aXx8XCJkZWNvZGVyXCI9PT1pfHxcImVkaXRcIj09PWl8fFwidW5kb1wiPT09aSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2Ygbyl0aHJvdyBuZXcgRXJyb3IoaSk7YVtpXT1vfWVsc2V7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIG8pdGhyb3cgbmV3IEVycm9yKGkpO2FbaV09b31yZXR1cm4gbihhLFwibWFya1wiLFwidGhvdXNhbmRcIiksbihhLFwicHJlZml4XCIsXCJuZWdhdGl2ZVwiKSxuKGEsXCJwcmVmaXhcIixcIm5lZ2F0aXZlQmVmb3JlXCIpLGF9ZnVuY3Rpb24gYyh0LHIsaSl7dmFyIG4sbz1bXTtmb3Iobj0wO248ZS5sZW5ndGg7bis9MSlvLnB1c2godFtlW25dXSk7cmV0dXJuIG8ucHVzaChpKSxyLmFwcGx5KFwiXCIsbyl9ZnVuY3Rpb24gcChlKXtpZighKHRoaXMgaW5zdGFuY2VvZiBwKSlyZXR1cm4gbmV3IHAoZSk7XCJvYmplY3RcIj09dHlwZW9mIGUmJihlPXUoZSksdGhpcy50bz1mdW5jdGlvbih0KXtyZXR1cm4gYyhlLHMsdCl9LHRoaXMuZnJvbT1mdW5jdGlvbih0KXtyZXR1cm4gYyhlLGwsdCl9KX1yZXR1cm4gcH0oKX0pKTt2YXIgZj1jKHAoKGZ1bmN0aW9uKGUsdCl7IWZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQoZSl7cmV0dXJuIHIoZSkmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGUuZnJvbX1mdW5jdGlvbiByKGUpe3JldHVyblwib2JqZWN0XCI9PXR5cGVvZiBlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnRvfWZ1bmN0aW9uIGkoZSl7ZS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGUpfWZ1bmN0aW9uIG4oZSl7cmV0dXJuIG51bGwhPWV9ZnVuY3Rpb24gbyhlKXtlLnByZXZlbnREZWZhdWx0KCl9ZnVuY3Rpb24gYShlKXtyZXR1cm4gZS5maWx0ZXIoKGZ1bmN0aW9uKGUpe3JldHVybiF0aGlzW2VdJiYodGhpc1tlXT0hMCl9KSx7fSl9ZnVuY3Rpb24gcyhlLHQpe3JldHVybiBNYXRoLnJvdW5kKGUvdCkqdH1mdW5jdGlvbiBsKGUsdCl7dmFyIHI9ZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxpPWUub3duZXJEb2N1bWVudCxuPWkuZG9jdW1lbnRFbGVtZW50LG89ZyhpKTtyZXR1cm4vd2Via2l0LipDaHJvbWUuKk1vYmlsZS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkmJihvLng9MCksdD9yLnRvcCtvLnktbi5jbGllbnRUb3A6ci5sZWZ0K28ueC1uLmNsaWVudExlZnR9ZnVuY3Rpb24gdShlKXtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgZSYmIWlzTmFOKGUpJiZpc0Zpbml0ZShlKX1mdW5jdGlvbiBjKGUsdCxyKXtyPjAmJihoKGUsdCksc2V0VGltZW91dCgoZnVuY3Rpb24oKXttKGUsdCl9KSxyKSl9ZnVuY3Rpb24gcChlKXtyZXR1cm4gTWF0aC5tYXgoTWF0aC5taW4oZSwxMDApLDApfWZ1bmN0aW9uIGQoZSl7cmV0dXJuIEFycmF5LmlzQXJyYXkoZSk/ZTpbZV19ZnVuY3Rpb24gZihlKXt2YXIgdD0oZT1TdHJpbmcoZSkpLnNwbGl0KFwiLlwiKTtyZXR1cm4gdC5sZW5ndGg+MT90WzFdLmxlbmd0aDowfWZ1bmN0aW9uIGgoZSx0KXtlLmNsYXNzTGlzdCYmIS9cXHMvLnRlc3QodCk/ZS5jbGFzc0xpc3QuYWRkKHQpOmUuY2xhc3NOYW1lKz1cIiBcIit0fWZ1bmN0aW9uIG0oZSx0KXtlLmNsYXNzTGlzdCYmIS9cXHMvLnRlc3QodCk/ZS5jbGFzc0xpc3QucmVtb3ZlKHQpOmUuY2xhc3NOYW1lPWUuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cChcIihefFxcXFxiKVwiK3Quc3BsaXQoXCIgXCIpLmpvaW4oXCJ8XCIpK1wiKFxcXFxifCQpXCIsXCJnaVwiKSxcIiBcIil9ZnVuY3Rpb24gdihlLHQpe3JldHVybiBlLmNsYXNzTGlzdD9lLmNsYXNzTGlzdC5jb250YWlucyh0KTpuZXcgUmVnRXhwKFwiXFxcXGJcIit0K1wiXFxcXGJcIikudGVzdChlLmNsYXNzTmFtZSl9ZnVuY3Rpb24gZyhlKXt2YXIgdD12b2lkIDAhPT13aW5kb3cucGFnZVhPZmZzZXQscj1cIkNTUzFDb21wYXRcIj09PShlLmNvbXBhdE1vZGV8fFwiXCIpO3JldHVybnt4OnQ/d2luZG93LnBhZ2VYT2Zmc2V0OnI/ZS5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdDplLmJvZHkuc2Nyb2xsTGVmdCx5OnQ/d2luZG93LnBhZ2VZT2Zmc2V0OnI/ZS5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wOmUuYm9keS5zY3JvbGxUb3B9fWZ1bmN0aW9uIGIoKXtyZXR1cm4gd2luZG93Lm5hdmlnYXRvci5wb2ludGVyRW5hYmxlZD97c3RhcnQ6XCJwb2ludGVyZG93blwiLG1vdmU6XCJwb2ludGVybW92ZVwiLGVuZDpcInBvaW50ZXJ1cFwifTp3aW5kb3cubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQ/e3N0YXJ0OlwiTVNQb2ludGVyRG93blwiLG1vdmU6XCJNU1BvaW50ZXJNb3ZlXCIsZW5kOlwiTVNQb2ludGVyVXBcIn06e3N0YXJ0OlwibW91c2Vkb3duIHRvdWNoc3RhcnRcIixtb3ZlOlwibW91c2Vtb3ZlIHRvdWNobW92ZVwiLGVuZDpcIm1vdXNldXAgdG91Y2hlbmRcIn19ZnVuY3Rpb24geSgpe3ZhciBlPSExO3RyeXt2YXIgdD1PYmplY3QuZGVmaW5lUHJvcGVydHkoe30sXCJwYXNzaXZlXCIse2dldDpmdW5jdGlvbigpe2U9ITB9fSk7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0XCIsbnVsbCx0KX1jYXRjaChlKXt9cmV0dXJuIGV9ZnVuY3Rpb24gUygpe3JldHVybiB3aW5kb3cuQ1NTJiZDU1Muc3VwcG9ydHMmJkNTUy5zdXBwb3J0cyhcInRvdWNoLWFjdGlvblwiLFwibm9uZVwiKX1mdW5jdGlvbiB4KGUsdCl7cmV0dXJuIDEwMC8odC1lKX1mdW5jdGlvbiB3KGUsdCxyKXtyZXR1cm4gMTAwKnQvKGVbcisxXS1lW3JdKX1mdW5jdGlvbiBFKGUsdCl7cmV0dXJuIHcoZSxlWzBdPDA/dCtNYXRoLmFicyhlWzBdKTp0LWVbMF0sMCl9ZnVuY3Rpb24gUChlLHQpe3JldHVybiB0KihlWzFdLWVbMF0pLzEwMCtlWzBdfWZ1bmN0aW9uIE4oZSx0KXtmb3IodmFyIHI9MTtlPj10W3JdOylyKz0xO3JldHVybiByfWZ1bmN0aW9uIEMoZSx0LHIpe2lmKHI+PWUuc2xpY2UoLTEpWzBdKXJldHVybiAxMDA7dmFyIGk9TihyLGUpLG49ZVtpLTFdLG89ZVtpXSxhPXRbaS0xXSxzPXRbaV07cmV0dXJuIGErRShbbixvXSxyKS94KGEscyl9ZnVuY3Rpb24gayhlLHQscil7aWYocj49MTAwKXJldHVybiBlLnNsaWNlKC0xKVswXTt2YXIgaT1OKHIsdCksbj1lW2ktMV0sbz1lW2ldLGE9dFtpLTFdO3JldHVybiBQKFtuLG9dLChyLWEpKngoYSx0W2ldKSl9ZnVuY3Rpb24gVihlLHQscixpKXtpZigxMDA9PT1pKXJldHVybiBpO3ZhciBuPU4oaSxlKSxvPWVbbi0xXSxhPWVbbl07cmV0dXJuIHI/aS1vPihhLW8pLzI/YTpvOnRbbi0xXT9lW24tMV0rcyhpLWVbbi0xXSx0W24tMV0pOml9dmFyIEEsTTtlLlBpcHNNb2RlPXZvaWQgMCwoTT1lLlBpcHNNb2RlfHwoZS5QaXBzTW9kZT17fSkpLlJhbmdlPVwicmFuZ2VcIixNLlN0ZXBzPVwic3RlcHNcIixNLlBvc2l0aW9ucz1cInBvc2l0aW9uc1wiLE0uQ291bnQ9XCJjb3VudFwiLE0uVmFsdWVzPVwidmFsdWVzXCIsZS5QaXBzVHlwZT12b2lkIDAsKEE9ZS5QaXBzVHlwZXx8KGUuUGlwc1R5cGU9e30pKVtBLk5vbmU9LTFdPVwiTm9uZVwiLEFbQS5Ob1ZhbHVlPTBdPVwiTm9WYWx1ZVwiLEFbQS5MYXJnZVZhbHVlPTFdPVwiTGFyZ2VWYWx1ZVwiLEFbQS5TbWFsbFZhbHVlPTJdPVwiU21hbGxWYWx1ZVwiO3ZhciBMPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlLHQscil7dmFyIGk7dGhpcy54UGN0PVtdLHRoaXMueFZhbD1bXSx0aGlzLnhTdGVwcz1bXSx0aGlzLnhOdW1TdGVwcz1bXSx0aGlzLnhIaWdoZXN0Q29tcGxldGVTdGVwPVtdLHRoaXMueFN0ZXBzPVtyfHwhMV0sdGhpcy54TnVtU3RlcHM9WyExXSx0aGlzLnNuYXA9dDt2YXIgbj1bXTtmb3IoT2JqZWN0LmtleXMoZSkuZm9yRWFjaCgoZnVuY3Rpb24odCl7bi5wdXNoKFtkKGVbdF0pLHRdKX0pKSxuLnNvcnQoKGZ1bmN0aW9uKGUsdCl7cmV0dXJuIGVbMF1bMF0tdFswXVswXX0pKSxpPTA7aTxuLmxlbmd0aDtpKyspdGhpcy5oYW5kbGVFbnRyeVBvaW50KG5baV1bMV0sbltpXVswXSk7Zm9yKHRoaXMueE51bVN0ZXBzPXRoaXMueFN0ZXBzLnNsaWNlKDApLGk9MDtpPHRoaXMueE51bVN0ZXBzLmxlbmd0aDtpKyspdGhpcy5oYW5kbGVTdGVwUG9pbnQoaSx0aGlzLnhOdW1TdGVwc1tpXSl9cmV0dXJuIGUucHJvdG90eXBlLmdldERpc3RhbmNlPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1bXSxyPTA7cjx0aGlzLnhOdW1TdGVwcy5sZW5ndGgtMTtyKyspdFtyXT13KHRoaXMueFZhbCxlLHIpO3JldHVybiB0fSxlLnByb3RvdHlwZS5nZXRBYnNvbHV0ZURpc3RhbmNlPWZ1bmN0aW9uKGUsdCxyKXt2YXIgaSxuPTA7aWYoZTx0aGlzLnhQY3RbdGhpcy54UGN0Lmxlbmd0aC0xXSlmb3IoO2U+dGhpcy54UGN0W24rMV07KW4rKztlbHNlIGU9PT10aGlzLnhQY3RbdGhpcy54UGN0Lmxlbmd0aC0xXSYmKG49dGhpcy54UGN0Lmxlbmd0aC0yKTtyfHxlIT09dGhpcy54UGN0W24rMV18fG4rKyxudWxsPT09dCYmKHQ9W10pO3ZhciBvPTEsYT10W25dLHM9MCxsPTAsdT0wLGM9MDtmb3IoaT1yPyhlLXRoaXMueFBjdFtuXSkvKHRoaXMueFBjdFtuKzFdLXRoaXMueFBjdFtuXSk6KHRoaXMueFBjdFtuKzFdLWUpLyh0aGlzLnhQY3RbbisxXS10aGlzLnhQY3Rbbl0pO2E+MDspcz10aGlzLnhQY3RbbisxK2NdLXRoaXMueFBjdFtuK2NdLHRbbitjXSpvKzEwMC0xMDAqaT4xMDA/KGw9cyppLG89KGEtMTAwKmkpL3RbbitjXSxpPTEpOihsPXRbbitjXSpzLzEwMCpvLG89MCkscj8odS09bCx0aGlzLnhQY3QubGVuZ3RoK2M+PTEmJmMtLSk6KHUrPWwsdGhpcy54UGN0Lmxlbmd0aC1jPj0xJiZjKyspLGE9dFtuK2NdKm87cmV0dXJuIGUrdX0sZS5wcm90b3R5cGUudG9TdGVwcGluZz1mdW5jdGlvbihlKXtyZXR1cm4gZT1DKHRoaXMueFZhbCx0aGlzLnhQY3QsZSl9LGUucHJvdG90eXBlLmZyb21TdGVwcGluZz1mdW5jdGlvbihlKXtyZXR1cm4gayh0aGlzLnhWYWwsdGhpcy54UGN0LGUpfSxlLnByb3RvdHlwZS5nZXRTdGVwPWZ1bmN0aW9uKGUpe3JldHVybiBlPVYodGhpcy54UGN0LHRoaXMueFN0ZXBzLHRoaXMuc25hcCxlKX0sZS5wcm90b3R5cGUuZ2V0RGVmYXVsdFN0ZXA9ZnVuY3Rpb24oZSx0LHIpe3ZhciBpPU4oZSx0aGlzLnhQY3QpO3JldHVybigxMDA9PT1lfHx0JiZlPT09dGhpcy54UGN0W2ktMV0pJiYoaT1NYXRoLm1heChpLTEsMSkpLCh0aGlzLnhWYWxbaV0tdGhpcy54VmFsW2ktMV0pL3J9LGUucHJvdG90eXBlLmdldE5lYXJieVN0ZXBzPWZ1bmN0aW9uKGUpe3ZhciB0PU4oZSx0aGlzLnhQY3QpO3JldHVybntzdGVwQmVmb3JlOntzdGFydFZhbHVlOnRoaXMueFZhbFt0LTJdLHN0ZXA6dGhpcy54TnVtU3RlcHNbdC0yXSxoaWdoZXN0U3RlcDp0aGlzLnhIaWdoZXN0Q29tcGxldGVTdGVwW3QtMl19LHRoaXNTdGVwOntzdGFydFZhbHVlOnRoaXMueFZhbFt0LTFdLHN0ZXA6dGhpcy54TnVtU3RlcHNbdC0xXSxoaWdoZXN0U3RlcDp0aGlzLnhIaWdoZXN0Q29tcGxldGVTdGVwW3QtMV19LHN0ZXBBZnRlcjp7c3RhcnRWYWx1ZTp0aGlzLnhWYWxbdF0sc3RlcDp0aGlzLnhOdW1TdGVwc1t0XSxoaWdoZXN0U3RlcDp0aGlzLnhIaWdoZXN0Q29tcGxldGVTdGVwW3RdfX19LGUucHJvdG90eXBlLmNvdW50U3RlcERlY2ltYWxzPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcy54TnVtU3RlcHMubWFwKGYpO3JldHVybiBNYXRoLm1heC5hcHBseShudWxsLGUpfSxlLnByb3RvdHlwZS5oYXNOb1NpemU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy54VmFsWzBdPT09dGhpcy54VmFsW3RoaXMueFZhbC5sZW5ndGgtMV19LGUucHJvdG90eXBlLmNvbnZlcnQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZ2V0U3RlcCh0aGlzLnRvU3RlcHBpbmcoZSkpfSxlLnByb3RvdHlwZS5oYW5kbGVFbnRyeVBvaW50PWZ1bmN0aW9uKGUsdCl7dmFyIHI7aWYoIXUocj1cIm1pblwiPT09ZT8wOlwibWF4XCI9PT1lPzEwMDpwYXJzZUZsb2F0KGUpKXx8IXUodFswXSkpdGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlcjogJ3JhbmdlJyB2YWx1ZSBpc24ndCBudW1lcmljLlwiKTt0aGlzLnhQY3QucHVzaChyKSx0aGlzLnhWYWwucHVzaCh0WzBdKTt2YXIgaT1OdW1iZXIodFsxXSk7cj90aGlzLnhTdGVwcy5wdXNoKCFpc05hTihpKSYmaSk6aXNOYU4oaSl8fCh0aGlzLnhTdGVwc1swXT1pKSx0aGlzLnhIaWdoZXN0Q29tcGxldGVTdGVwLnB1c2goMCl9LGUucHJvdG90eXBlLmhhbmRsZVN0ZXBQb2ludD1mdW5jdGlvbihlLHQpe2lmKHQpaWYodGhpcy54VmFsW2VdIT09dGhpcy54VmFsW2UrMV0pe3RoaXMueFN0ZXBzW2VdPXcoW3RoaXMueFZhbFtlXSx0aGlzLnhWYWxbZSsxXV0sdCwwKS94KHRoaXMueFBjdFtlXSx0aGlzLnhQY3RbZSsxXSk7dmFyIHI9KHRoaXMueFZhbFtlKzFdLXRoaXMueFZhbFtlXSkvdGhpcy54TnVtU3RlcHNbZV0saT1NYXRoLmNlaWwoTnVtYmVyKHIudG9GaXhlZCgzKSktMSksbj10aGlzLnhWYWxbZV0rdGhpcy54TnVtU3RlcHNbZV0qaTt0aGlzLnhIaWdoZXN0Q29tcGxldGVTdGVwW2VdPW59ZWxzZSB0aGlzLnhTdGVwc1tlXT10aGlzLnhIaWdoZXN0Q29tcGxldGVTdGVwW2VdPXRoaXMueFZhbFtlXX0sZX0oKSxVPXt0bzpmdW5jdGlvbihlKXtyZXR1cm4gdm9pZCAwPT09ZT9cIlwiOmUudG9GaXhlZCgyKX0sZnJvbTpOdW1iZXJ9LE89e3RhcmdldDpcInRhcmdldFwiLGJhc2U6XCJiYXNlXCIsb3JpZ2luOlwib3JpZ2luXCIsaGFuZGxlOlwiaGFuZGxlXCIsaGFuZGxlTG93ZXI6XCJoYW5kbGUtbG93ZXJcIixoYW5kbGVVcHBlcjpcImhhbmRsZS11cHBlclwiLHRvdWNoQXJlYTpcInRvdWNoLWFyZWFcIixob3Jpem9udGFsOlwiaG9yaXpvbnRhbFwiLHZlcnRpY2FsOlwidmVydGljYWxcIixiYWNrZ3JvdW5kOlwiYmFja2dyb3VuZFwiLGNvbm5lY3Q6XCJjb25uZWN0XCIsY29ubmVjdHM6XCJjb25uZWN0c1wiLGx0cjpcImx0clwiLHJ0bDpcInJ0bFwiLHRleHREaXJlY3Rpb25MdHI6XCJ0eHQtZGlyLWx0clwiLHRleHREaXJlY3Rpb25SdGw6XCJ0eHQtZGlyLXJ0bFwiLGRyYWdnYWJsZTpcImRyYWdnYWJsZVwiLGRyYWc6XCJzdGF0ZS1kcmFnXCIsdGFwOlwic3RhdGUtdGFwXCIsYWN0aXZlOlwiYWN0aXZlXCIsdG9vbHRpcDpcInRvb2x0aXBcIixwaXBzOlwicGlwc1wiLHBpcHNIb3Jpem9udGFsOlwicGlwcy1ob3Jpem9udGFsXCIscGlwc1ZlcnRpY2FsOlwicGlwcy12ZXJ0aWNhbFwiLG1hcmtlcjpcIm1hcmtlclwiLG1hcmtlckhvcml6b250YWw6XCJtYXJrZXItaG9yaXpvbnRhbFwiLG1hcmtlclZlcnRpY2FsOlwibWFya2VyLXZlcnRpY2FsXCIsbWFya2VyTm9ybWFsOlwibWFya2VyLW5vcm1hbFwiLG1hcmtlckxhcmdlOlwibWFya2VyLWxhcmdlXCIsbWFya2VyU3ViOlwibWFya2VyLXN1YlwiLHZhbHVlOlwidmFsdWVcIix2YWx1ZUhvcml6b250YWw6XCJ2YWx1ZS1ob3Jpem9udGFsXCIsdmFsdWVWZXJ0aWNhbDpcInZhbHVlLXZlcnRpY2FsXCIsdmFsdWVOb3JtYWw6XCJ2YWx1ZS1ub3JtYWxcIix2YWx1ZUxhcmdlOlwidmFsdWUtbGFyZ2VcIix2YWx1ZVN1YjpcInZhbHVlLXN1YlwifSxEPXt0b29sdGlwczpcIi5fX3Rvb2x0aXBzXCIsYXJpYTpcIi5fX2FyaWFcIn07ZnVuY3Rpb24gaihlLHQpe2lmKCF1KHQpKXRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXI6ICdzdGVwJyBpcyBub3QgbnVtZXJpYy5cIik7ZS5zaW5nbGVTdGVwPXR9ZnVuY3Rpb24gRihlLHQpe2lmKCF1KHQpKXRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXI6ICdrZXlib2FyZFBhZ2VNdWx0aXBsaWVyJyBpcyBub3QgbnVtZXJpYy5cIik7ZS5rZXlib2FyZFBhZ2VNdWx0aXBsaWVyPXR9ZnVuY3Rpb24gVChlLHQpe2lmKCF1KHQpKXRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXI6ICdrZXlib2FyZE11bHRpcGxpZXInIGlzIG5vdCBudW1lcmljLlwiKTtlLmtleWJvYXJkTXVsdGlwbGllcj10fWZ1bmN0aW9uIHooZSx0KXtpZighdSh0KSl0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyOiAna2V5Ym9hcmREZWZhdWx0U3RlcCcgaXMgbm90IG51bWVyaWMuXCIpO2Uua2V5Ym9hcmREZWZhdWx0U3RlcD10fWZ1bmN0aW9uIEgoZSx0KXtpZihcIm9iamVjdFwiIT10eXBlb2YgdHx8QXJyYXkuaXNBcnJheSh0KSl0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyOiAncmFuZ2UnIGlzIG5vdCBhbiBvYmplY3QuXCIpO2lmKHZvaWQgMD09PXQubWlufHx2b2lkIDA9PT10Lm1heCl0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyOiBNaXNzaW5nICdtaW4nIG9yICdtYXgnIGluICdyYW5nZScuXCIpO2Uuc3BlY3RydW09bmV3IEwodCxlLnNuYXB8fCExLGUuc2luZ2xlU3RlcCl9ZnVuY3Rpb24gcShlLHQpe2lmKHQ9ZCh0KSwhQXJyYXkuaXNBcnJheSh0KXx8IXQubGVuZ3RoKXRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXI6ICdzdGFydCcgb3B0aW9uIGlzIGluY29ycmVjdC5cIik7ZS5oYW5kbGVzPXQubGVuZ3RoLGUuc3RhcnQ9dH1mdW5jdGlvbiBSKGUsdCl7aWYoXCJib29sZWFuXCIhPXR5cGVvZiB0KXRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXI6ICdzbmFwJyBvcHRpb24gbXVzdCBiZSBhIGJvb2xlYW4uXCIpO2Uuc25hcD10fWZ1bmN0aW9uIEIoZSx0KXtpZihcImJvb2xlYW5cIiE9dHlwZW9mIHQpdGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlcjogJ2FuaW1hdGUnIG9wdGlvbiBtdXN0IGJlIGEgYm9vbGVhbi5cIik7ZS5hbmltYXRlPXR9ZnVuY3Rpb24gXyhlLHQpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiB0KXRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXI6ICdhbmltYXRpb25EdXJhdGlvbicgb3B0aW9uIG11c3QgYmUgYSBudW1iZXIuXCIpO2UuYW5pbWF0aW9uRHVyYXRpb249dH1mdW5jdGlvbiAkKGUsdCl7dmFyIHIsaT1bITFdO2lmKFwibG93ZXJcIj09PXQ/dD1bITAsITFdOlwidXBwZXJcIj09PXQmJih0PVshMSwhMF0pLCEwPT09dHx8ITE9PT10KXtmb3Iocj0xO3I8ZS5oYW5kbGVzO3IrKylpLnB1c2godCk7aS5wdXNoKCExKX1lbHNle2lmKCFBcnJheS5pc0FycmF5KHQpfHwhdC5sZW5ndGh8fHQubGVuZ3RoIT09ZS5oYW5kbGVzKzEpdGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlcjogJ2Nvbm5lY3QnIG9wdGlvbiBkb2Vzbid0IG1hdGNoIGhhbmRsZSBjb3VudC5cIik7aT10fWUuY29ubmVjdD1pfWZ1bmN0aW9uIFgoZSx0KXtzd2l0Y2godCl7Y2FzZVwiaG9yaXpvbnRhbFwiOmUub3J0PTA7YnJlYWs7Y2FzZVwidmVydGljYWxcIjplLm9ydD0xO2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlcjogJ29yaWVudGF0aW9uJyBvcHRpb24gaXMgaW52YWxpZC5cIil9fWZ1bmN0aW9uIFkoZSx0KXtpZighdSh0KSl0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyOiAnbWFyZ2luJyBvcHRpb24gbXVzdCBiZSBudW1lcmljLlwiKTswIT09dCYmKGUubWFyZ2luPWUuc3BlY3RydW0uZ2V0RGlzdGFuY2UodCkpfWZ1bmN0aW9uIEkoZSx0KXtpZighdSh0KSl0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyOiAnbGltaXQnIG9wdGlvbiBtdXN0IGJlIG51bWVyaWMuXCIpO2lmKGUubGltaXQ9ZS5zcGVjdHJ1bS5nZXREaXN0YW5jZSh0KSwhZS5saW1pdHx8ZS5oYW5kbGVzPDIpdGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlcjogJ2xpbWl0JyBvcHRpb24gaXMgb25seSBzdXBwb3J0ZWQgb24gbGluZWFyIHNsaWRlcnMgd2l0aCAyIG9yIG1vcmUgaGFuZGxlcy5cIil9ZnVuY3Rpb24gVyhlLHQpe3ZhciByO2lmKCF1KHQpJiYhQXJyYXkuaXNBcnJheSh0KSl0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyOiAncGFkZGluZycgb3B0aW9uIG11c3QgYmUgbnVtZXJpYyBvciBhcnJheSBvZiBleGFjdGx5IDIgbnVtYmVycy5cIik7aWYoQXJyYXkuaXNBcnJheSh0KSYmMiE9PXQubGVuZ3RoJiYhdSh0WzBdKSYmIXUodFsxXSkpdGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlcjogJ3BhZGRpbmcnIG9wdGlvbiBtdXN0IGJlIG51bWVyaWMgb3IgYXJyYXkgb2YgZXhhY3RseSAyIG51bWJlcnMuXCIpO2lmKDAhPT10KXtmb3IoQXJyYXkuaXNBcnJheSh0KXx8KHQ9W3QsdF0pLGUucGFkZGluZz1bZS5zcGVjdHJ1bS5nZXREaXN0YW5jZSh0WzBdKSxlLnNwZWN0cnVtLmdldERpc3RhbmNlKHRbMV0pXSxyPTA7cjxlLnNwZWN0cnVtLnhOdW1TdGVwcy5sZW5ndGgtMTtyKyspaWYoZS5wYWRkaW5nWzBdW3JdPDB8fGUucGFkZGluZ1sxXVtyXTwwKXRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXI6ICdwYWRkaW5nJyBvcHRpb24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcihzKS5cIik7dmFyIGk9dFswXSt0WzFdLG49ZS5zcGVjdHJ1bS54VmFsWzBdO2lmKGkvKGUuc3BlY3RydW0ueFZhbFtlLnNwZWN0cnVtLnhWYWwubGVuZ3RoLTFdLW4pPjEpdGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlcjogJ3BhZGRpbmcnIG9wdGlvbiBtdXN0IG5vdCBleGNlZWQgMTAwJSBvZiB0aGUgcmFuZ2UuXCIpfX1mdW5jdGlvbiBHKGUsdCl7c3dpdGNoKHQpe2Nhc2VcImx0clwiOmUuZGlyPTA7YnJlYWs7Y2FzZVwicnRsXCI6ZS5kaXI9MTticmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXI6ICdkaXJlY3Rpb24nIG9wdGlvbiB3YXMgbm90IHJlY29nbml6ZWQuXCIpfX1mdW5jdGlvbiBKKGUsdCl7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIHQpdGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlcjogJ2JlaGF2aW91cicgbXVzdCBiZSBhIHN0cmluZyBjb250YWluaW5nIG9wdGlvbnMuXCIpO3ZhciByPXQuaW5kZXhPZihcInRhcFwiKT49MCxpPXQuaW5kZXhPZihcImRyYWdcIik+PTAsbj10LmluZGV4T2YoXCJmaXhlZFwiKT49MCxvPXQuaW5kZXhPZihcInNuYXBcIik+PTAsYT10LmluZGV4T2YoXCJob3ZlclwiKT49MCxzPXQuaW5kZXhPZihcInVuY29uc3RyYWluZWRcIik+PTAsbD10LmluZGV4T2YoXCJkcmFnLWFsbFwiKT49MCx1PXQuaW5kZXhPZihcInNtb290aC1zdGVwc1wiKT49MDtpZihuKXtpZigyIT09ZS5oYW5kbGVzKXRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXI6ICdmaXhlZCcgYmVoYXZpb3VyIG11c3QgYmUgdXNlZCB3aXRoIDIgaGFuZGxlc1wiKTtZKGUsZS5zdGFydFsxXS1lLnN0YXJ0WzBdKX1pZihzJiYoZS5tYXJnaW58fGUubGltaXQpKXRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXI6ICd1bmNvbnN0cmFpbmVkJyBiZWhhdmlvdXIgY2Fubm90IGJlIHVzZWQgd2l0aCBtYXJnaW4gb3IgbGltaXRcIik7ZS5ldmVudHM9e3RhcDpyfHxvLGRyYWc6aSxkcmFnQWxsOmwsc21vb3RoU3RlcHM6dSxmaXhlZDpuLHNuYXA6byxob3ZlcjphLHVuY29uc3RyYWluZWQ6c319ZnVuY3Rpb24gSyhlLHQpe2lmKCExIT09dClpZighMD09PXR8fHIodCkpe2UudG9vbHRpcHM9W107Zm9yKHZhciBpPTA7aTxlLmhhbmRsZXM7aSsrKWUudG9vbHRpcHMucHVzaCh0KX1lbHNle2lmKCh0PWQodCkpLmxlbmd0aCE9PWUuaGFuZGxlcyl0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyOiBtdXN0IHBhc3MgYSBmb3JtYXR0ZXIgZm9yIGFsbCBoYW5kbGVzLlwiKTt0LmZvckVhY2goKGZ1bmN0aW9uKGUpe2lmKFwiYm9vbGVhblwiIT10eXBlb2YgZSYmIXIoZSkpdGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlcjogJ3Rvb2x0aXBzJyBtdXN0IGJlIHBhc3NlZCBhIGZvcm1hdHRlciBvciAnZmFsc2UnLlwiKX0pKSxlLnRvb2x0aXBzPXR9fWZ1bmN0aW9uIFEoZSx0KXtpZih0Lmxlbmd0aCE9PWUuaGFuZGxlcyl0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyOiBtdXN0IHBhc3MgYSBhdHRyaWJ1dGVzIGZvciBhbGwgaGFuZGxlcy5cIik7ZS5oYW5kbGVBdHRyaWJ1dGVzPXR9ZnVuY3Rpb24gWihlLHQpe2lmKCFyKHQpKXRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXI6ICdhcmlhRm9ybWF0JyByZXF1aXJlcyAndG8nIG1ldGhvZC5cIik7ZS5hcmlhRm9ybWF0PXR9ZnVuY3Rpb24gZWUoZSxyKXtpZighdChyKSl0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyOiAnZm9ybWF0JyByZXF1aXJlcyAndG8nIGFuZCAnZnJvbScgbWV0aG9kcy5cIik7ZS5mb3JtYXQ9cn1mdW5jdGlvbiB0ZShlLHQpe2lmKFwiYm9vbGVhblwiIT10eXBlb2YgdCl0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyOiAna2V5Ym9hcmRTdXBwb3J0JyBvcHRpb24gbXVzdCBiZSBhIGJvb2xlYW4uXCIpO2Uua2V5Ym9hcmRTdXBwb3J0PXR9ZnVuY3Rpb24gcmUoZSx0KXtlLmRvY3VtZW50RWxlbWVudD10fWZ1bmN0aW9uIGllKGUsdCl7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIHQmJiExIT09dCl0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyOiAnY3NzUHJlZml4JyBtdXN0IGJlIGEgc3RyaW5nIG9yIGBmYWxzZWAuXCIpO2UuY3NzUHJlZml4PXR9ZnVuY3Rpb24gbmUoZSx0KXtpZihcIm9iamVjdFwiIT10eXBlb2YgdCl0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyOiAnY3NzQ2xhc3NlcycgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1wic3RyaW5nXCI9PXR5cGVvZiBlLmNzc1ByZWZpeD8oZS5jc3NDbGFzc2VzPXt9LE9iamVjdC5rZXlzKHQpLmZvckVhY2goKGZ1bmN0aW9uKHIpe2UuY3NzQ2xhc3Nlc1tyXT1lLmNzc1ByZWZpeCt0W3JdfSkpKTplLmNzc0NsYXNzZXM9dH1mdW5jdGlvbiBvZShlKXt2YXIgdD17bWFyZ2luOm51bGwsbGltaXQ6bnVsbCxwYWRkaW5nOm51bGwsYW5pbWF0ZTohMCxhbmltYXRpb25EdXJhdGlvbjozMDAsYXJpYUZvcm1hdDpVLGZvcm1hdDpVfSxyPXtzdGVwOntyOiExLHQ6an0sa2V5Ym9hcmRQYWdlTXVsdGlwbGllcjp7cjohMSx0OkZ9LGtleWJvYXJkTXVsdGlwbGllcjp7cjohMSx0OlR9LGtleWJvYXJkRGVmYXVsdFN0ZXA6e3I6ITEsdDp6fSxzdGFydDp7cjohMCx0OnF9LGNvbm5lY3Q6e3I6ITAsdDokfSxkaXJlY3Rpb246e3I6ITAsdDpHfSxzbmFwOntyOiExLHQ6Un0sYW5pbWF0ZTp7cjohMSx0OkJ9LGFuaW1hdGlvbkR1cmF0aW9uOntyOiExLHQ6X30scmFuZ2U6e3I6ITAsdDpIfSxvcmllbnRhdGlvbjp7cjohMSx0Olh9LG1hcmdpbjp7cjohMSx0Oll9LGxpbWl0OntyOiExLHQ6SX0scGFkZGluZzp7cjohMSx0Old9LGJlaGF2aW91cjp7cjohMCx0Okp9LGFyaWFGb3JtYXQ6e3I6ITEsdDpafSxmb3JtYXQ6e3I6ITEsdDplZX0sdG9vbHRpcHM6e3I6ITEsdDpLfSxrZXlib2FyZFN1cHBvcnQ6e3I6ITAsdDp0ZX0sZG9jdW1lbnRFbGVtZW50OntyOiExLHQ6cmV9LGNzc1ByZWZpeDp7cjohMCx0OmllfSxjc3NDbGFzc2VzOntyOiEwLHQ6bmV9LGhhbmRsZUF0dHJpYnV0ZXM6e3I6ITEsdDpRfX0saT17Y29ubmVjdDohMSxkaXJlY3Rpb246XCJsdHJcIixiZWhhdmlvdXI6XCJ0YXBcIixvcmllbnRhdGlvbjpcImhvcml6b250YWxcIixrZXlib2FyZFN1cHBvcnQ6ITAsY3NzUHJlZml4Olwibm9VaS1cIixjc3NDbGFzc2VzOk8sa2V5Ym9hcmRQYWdlTXVsdGlwbGllcjo1LGtleWJvYXJkTXVsdGlwbGllcjoxLGtleWJvYXJkRGVmYXVsdFN0ZXA6MTB9O2UuZm9ybWF0JiYhZS5hcmlhRm9ybWF0JiYoZS5hcmlhRm9ybWF0PWUuZm9ybWF0KSxPYmplY3Qua2V5cyhyKS5mb3JFYWNoKChmdW5jdGlvbihvKXtpZihuKGVbb10pfHx2b2lkIDAhPT1pW29dKXJbb10udCh0LG4oZVtvXSk/ZVtvXTppW29dKTtlbHNlIGlmKHJbb10ucil0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyOiAnXCIrbytcIicgaXMgcmVxdWlyZWQuXCIpfSkpLHQucGlwcz1lLnBpcHM7dmFyIG89ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxhPXZvaWQgMCE9PW8uc3R5bGUubXNUcmFuc2Zvcm0scz12b2lkIDAhPT1vLnN0eWxlLnRyYW5zZm9ybTt0LnRyYW5zZm9ybVJ1bGU9cz9cInRyYW5zZm9ybVwiOmE/XCJtc1RyYW5zZm9ybVwiOlwid2Via2l0VHJhbnNmb3JtXCI7dmFyIGw9W1tcImxlZnRcIixcInRvcFwiXSxbXCJyaWdodFwiLFwiYm90dG9tXCJdXTtyZXR1cm4gdC5zdHlsZT1sW3QuZGlyXVt0Lm9ydF0sdH1mdW5jdGlvbiBhZSh0LHIscyl7dmFyIHUsZix4LHcsRSxQPWIoKSxOPVMoKSYmeSgpLEM9dCxrPXIuc3BlY3RydW0sVj1bXSxBPVtdLE09W10sTD0wLFU9e30sTz10Lm93bmVyRG9jdW1lbnQsaj1yLmRvY3VtZW50RWxlbWVudHx8Ty5kb2N1bWVudEVsZW1lbnQsRj1PLmJvZHksVD1cInJ0bFwiPT09Ty5kaXJ8fDE9PT1yLm9ydD8wOjEwMDtmdW5jdGlvbiB6KGUsdCl7dmFyIHI9Ty5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVybiB0JiZoKHIsdCksZS5hcHBlbmRDaGlsZChyKSxyfWZ1bmN0aW9uIEgoZSx0KXt2YXIgaT16KGUsci5jc3NDbGFzc2VzLm9yaWdpbiksbj16KGksci5jc3NDbGFzc2VzLmhhbmRsZSk7aWYoeihuLHIuY3NzQ2xhc3Nlcy50b3VjaEFyZWEpLG4uc2V0QXR0cmlidXRlKFwiZGF0YS1oYW5kbGVcIixTdHJpbmcodCkpLHIua2V5Ym9hcmRTdXBwb3J0JiYobi5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLFwiMFwiKSxuLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsKGZ1bmN0aW9uKGUpe3JldHVybiBmZShlLHQpfSkpKSx2b2lkIDAhPT1yLmhhbmRsZUF0dHJpYnV0ZXMpe3ZhciBvPXIuaGFuZGxlQXR0cmlidXRlc1t0XTtPYmplY3Qua2V5cyhvKS5mb3JFYWNoKChmdW5jdGlvbihlKXtuLnNldEF0dHJpYnV0ZShlLG9bZV0pfSkpfXJldHVybiBuLnNldEF0dHJpYnV0ZShcInJvbGVcIixcInNsaWRlclwiKSxuLnNldEF0dHJpYnV0ZShcImFyaWEtb3JpZW50YXRpb25cIixyLm9ydD9cInZlcnRpY2FsXCI6XCJob3Jpem9udGFsXCIpLDA9PT10P2gobixyLmNzc0NsYXNzZXMuaGFuZGxlTG93ZXIpOnQ9PT1yLmhhbmRsZXMtMSYmaChuLHIuY3NzQ2xhc3Nlcy5oYW5kbGVVcHBlciksaX1mdW5jdGlvbiBxKGUsdCl7cmV0dXJuISF0JiZ6KGUsci5jc3NDbGFzc2VzLmNvbm5lY3QpfWZ1bmN0aW9uIFIoZSx0KXt2YXIgaT16KHQsci5jc3NDbGFzc2VzLmNvbm5lY3RzKTtmPVtdLCh4PVtdKS5wdXNoKHEoaSxlWzBdKSk7Zm9yKHZhciBuPTA7bjxyLmhhbmRsZXM7bisrKWYucHVzaChIKHQsbikpLE1bbl09bix4LnB1c2gocShpLGVbbisxXSkpfWZ1bmN0aW9uIEIoZSl7cmV0dXJuIGgoZSxyLmNzc0NsYXNzZXMudGFyZ2V0KSwwPT09ci5kaXI/aChlLHIuY3NzQ2xhc3Nlcy5sdHIpOmgoZSxyLmNzc0NsYXNzZXMucnRsKSwwPT09ci5vcnQ/aChlLHIuY3NzQ2xhc3Nlcy5ob3Jpem9udGFsKTpoKGUsci5jc3NDbGFzc2VzLnZlcnRpY2FsKSxoKGUsXCJydGxcIj09PWdldENvbXB1dGVkU3R5bGUoZSkuZGlyZWN0aW9uP3IuY3NzQ2xhc3Nlcy50ZXh0RGlyZWN0aW9uUnRsOnIuY3NzQ2xhc3Nlcy50ZXh0RGlyZWN0aW9uTHRyKSx6KGUsci5jc3NDbGFzc2VzLmJhc2UpfWZ1bmN0aW9uIF8oZSx0KXtyZXR1cm4hKCFyLnRvb2x0aXBzfHwhci50b29sdGlwc1t0XSkmJnooZS5maXJzdENoaWxkLHIuY3NzQ2xhc3Nlcy50b29sdGlwKX1mdW5jdGlvbiAkKCl7cmV0dXJuIEMuaGFzQXR0cmlidXRlKFwiZGlzYWJsZWRcIil9ZnVuY3Rpb24gWChlKXtyZXR1cm4gZltlXS5oYXNBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKX1mdW5jdGlvbiBZKCl7RSYmKGdlKFwidXBkYXRlXCIrRC50b29sdGlwcyksRS5mb3JFYWNoKChmdW5jdGlvbihlKXtlJiZpKGUpfSkpLEU9bnVsbCl9ZnVuY3Rpb24gSSgpe1koKSxFPWYubWFwKF8pLG1lKFwidXBkYXRlXCIrRC50b29sdGlwcywoZnVuY3Rpb24oZSx0LGkpe2lmKEUmJnIudG9vbHRpcHMmJiExIT09RVt0XSl7dmFyIG49ZVt0XTshMCE9PXIudG9vbHRpcHNbdF0mJihuPXIudG9vbHRpcHNbdF0udG8oaVt0XSkpLEVbdF0uaW5uZXJIVE1MPW59fSkpfWZ1bmN0aW9uIFcoKXtnZShcInVwZGF0ZVwiK0QuYXJpYSksbWUoXCJ1cGRhdGVcIitELmFyaWEsKGZ1bmN0aW9uKGUsdCxpLG4sbyl7TS5mb3JFYWNoKChmdW5jdGlvbihlKXt2YXIgdD1mW2VdLG49eWUoQSxlLDAsITAsITAsITApLGE9eWUoQSxlLDEwMCwhMCwhMCwhMCkscz1vW2VdLGw9U3RyaW5nKHIuYXJpYUZvcm1hdC50byhpW2VdKSk7bj1rLmZyb21TdGVwcGluZyhuKS50b0ZpeGVkKDEpLGE9ay5mcm9tU3RlcHBpbmcoYSkudG9GaXhlZCgxKSxzPWsuZnJvbVN0ZXBwaW5nKHMpLnRvRml4ZWQoMSksdC5jaGlsZHJlblswXS5zZXRBdHRyaWJ1dGUoXCJhcmlhLXZhbHVlbWluXCIsbiksdC5jaGlsZHJlblswXS5zZXRBdHRyaWJ1dGUoXCJhcmlhLXZhbHVlbWF4XCIsYSksdC5jaGlsZHJlblswXS5zZXRBdHRyaWJ1dGUoXCJhcmlhLXZhbHVlbm93XCIscyksdC5jaGlsZHJlblswXS5zZXRBdHRyaWJ1dGUoXCJhcmlhLXZhbHVldGV4dFwiLGwpfSkpfSkpfWZ1bmN0aW9uIEcodCl7aWYodC5tb2RlPT09ZS5QaXBzTW9kZS5SYW5nZXx8dC5tb2RlPT09ZS5QaXBzTW9kZS5TdGVwcylyZXR1cm4gay54VmFsO2lmKHQubW9kZT09PWUuUGlwc01vZGUuQ291bnQpe2lmKHQudmFsdWVzPDIpdGhyb3cgbmV3IEVycm9yKFwibm9VaVNsaWRlcjogJ3ZhbHVlcycgKD49IDIpIHJlcXVpcmVkIGZvciBtb2RlICdjb3VudCcuXCIpO2Zvcih2YXIgcj10LnZhbHVlcy0xLGk9MTAwL3Isbj1bXTtyLS07KW5bcl09cippO3JldHVybiBuLnB1c2goMTAwKSxKKG4sdC5zdGVwcGVkKX1yZXR1cm4gdC5tb2RlPT09ZS5QaXBzTW9kZS5Qb3NpdGlvbnM/Sih0LnZhbHVlcyx0LnN0ZXBwZWQpOnQubW9kZT09PWUuUGlwc01vZGUuVmFsdWVzP3Quc3RlcHBlZD90LnZhbHVlcy5tYXAoKGZ1bmN0aW9uKGUpe3JldHVybiBrLmZyb21TdGVwcGluZyhrLmdldFN0ZXAoay50b1N0ZXBwaW5nKGUpKSl9KSk6dC52YWx1ZXM6W119ZnVuY3Rpb24gSihlLHQpe3JldHVybiBlLm1hcCgoZnVuY3Rpb24oZSl7cmV0dXJuIGsuZnJvbVN0ZXBwaW5nKHQ/ay5nZXRTdGVwKGUpOmUpfSkpfWZ1bmN0aW9uIEsodCl7ZnVuY3Rpb24gcihlLHQpe3JldHVybiBOdW1iZXIoKGUrdCkudG9GaXhlZCg3KSl9dmFyIGk9Ryh0KSxuPXt9LG89ay54VmFsWzBdLHM9ay54VmFsW2sueFZhbC5sZW5ndGgtMV0sbD0hMSx1PSExLGM9MDtyZXR1cm4oaT1hKGkuc2xpY2UoKS5zb3J0KChmdW5jdGlvbihlLHQpe3JldHVybiBlLXR9KSkpKVswXSE9PW8mJihpLnVuc2hpZnQobyksbD0hMCksaVtpLmxlbmd0aC0xXSE9PXMmJihpLnB1c2gocyksdT0hMCksaS5mb3JFYWNoKChmdW5jdGlvbihvLGEpe3ZhciBzLHAsZCxmLGgsbSx2LGcsYix5LFM9byx4PWlbYSsxXSx3PXQubW9kZT09PWUuUGlwc01vZGUuU3RlcHM7Zm9yKHcmJihzPWsueE51bVN0ZXBzW2FdKSxzfHwocz14LVMpLHZvaWQgMD09PXgmJih4PVMpLHM9TWF0aC5tYXgocywxZS03KSxwPVM7cDw9eDtwPXIocCxzKSl7Zm9yKGc9KGg9KGY9ay50b1N0ZXBwaW5nKHApKS1jKS8odC5kZW5zaXR5fHwxKSx5PWgvKGI9TWF0aC5yb3VuZChnKSksZD0xO2Q8PWI7ZCs9MSluWyhtPWMrZCp5KS50b0ZpeGVkKDUpXT1bay5mcm9tU3RlcHBpbmcobSksMF07dj1pLmluZGV4T2YocCk+LTE/ZS5QaXBzVHlwZS5MYXJnZVZhbHVlOnc/ZS5QaXBzVHlwZS5TbWFsbFZhbHVlOmUuUGlwc1R5cGUuTm9WYWx1ZSwhYSYmbCYmcCE9PXgmJih2PTApLHA9PT14JiZ1fHwobltmLnRvRml4ZWQoNSldPVtwLHZdKSxjPWZ9fSkpLG59ZnVuY3Rpb24gUSh0LGksbil7dmFyIG8sYSxzPU8uY3JlYXRlRWxlbWVudChcImRpdlwiKSxsPSgobz17fSlbZS5QaXBzVHlwZS5Ob25lXT1cIlwiLG9bZS5QaXBzVHlwZS5Ob1ZhbHVlXT1yLmNzc0NsYXNzZXMudmFsdWVOb3JtYWwsb1tlLlBpcHNUeXBlLkxhcmdlVmFsdWVdPXIuY3NzQ2xhc3Nlcy52YWx1ZUxhcmdlLG9bZS5QaXBzVHlwZS5TbWFsbFZhbHVlXT1yLmNzc0NsYXNzZXMudmFsdWVTdWIsbyksdT0oKGE9e30pW2UuUGlwc1R5cGUuTm9uZV09XCJcIixhW2UuUGlwc1R5cGUuTm9WYWx1ZV09ci5jc3NDbGFzc2VzLm1hcmtlck5vcm1hbCxhW2UuUGlwc1R5cGUuTGFyZ2VWYWx1ZV09ci5jc3NDbGFzc2VzLm1hcmtlckxhcmdlLGFbZS5QaXBzVHlwZS5TbWFsbFZhbHVlXT1yLmNzc0NsYXNzZXMubWFya2VyU3ViLGEpLGM9W3IuY3NzQ2xhc3Nlcy52YWx1ZUhvcml6b250YWwsci5jc3NDbGFzc2VzLnZhbHVlVmVydGljYWxdLHA9W3IuY3NzQ2xhc3Nlcy5tYXJrZXJIb3Jpem9udGFsLHIuY3NzQ2xhc3Nlcy5tYXJrZXJWZXJ0aWNhbF07ZnVuY3Rpb24gZChlLHQpe3ZhciBpPXQ9PT1yLmNzc0NsYXNzZXMudmFsdWUsbj1pP2w6dTtyZXR1cm4gdCtcIiBcIisoaT9jOnApW3Iub3J0XStcIiBcIituW2VdfWZ1bmN0aW9uIGYodCxvLGEpe2lmKChhPWk/aShvLGEpOmEpIT09ZS5QaXBzVHlwZS5Ob25lKXt2YXIgbD16KHMsITEpO2wuY2xhc3NOYW1lPWQoYSxyLmNzc0NsYXNzZXMubWFya2VyKSxsLnN0eWxlW3Iuc3R5bGVdPXQrXCIlXCIsYT5lLlBpcHNUeXBlLk5vVmFsdWUmJigobD16KHMsITEpKS5jbGFzc05hbWU9ZChhLHIuY3NzQ2xhc3Nlcy52YWx1ZSksbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIsU3RyaW5nKG8pKSxsLnN0eWxlW3Iuc3R5bGVdPXQrXCIlXCIsbC5pbm5lckhUTUw9U3RyaW5nKG4udG8obykpKX19cmV0dXJuIGgocyxyLmNzc0NsYXNzZXMucGlwcyksaChzLDA9PT1yLm9ydD9yLmNzc0NsYXNzZXMucGlwc0hvcml6b250YWw6ci5jc3NDbGFzc2VzLnBpcHNWZXJ0aWNhbCksT2JqZWN0LmtleXModCkuZm9yRWFjaCgoZnVuY3Rpb24oZSl7ZihlLHRbZV1bMF0sdFtlXVsxXSl9KSksc31mdW5jdGlvbiBaKCl7dyYmKGkodyksdz1udWxsKX1mdW5jdGlvbiBlZShlKXtaKCk7dmFyIHQ9SyhlKSxyPWUuZmlsdGVyLGk9ZS5mb3JtYXR8fHt0bzpmdW5jdGlvbihlKXtyZXR1cm4gU3RyaW5nKE1hdGgucm91bmQoZSkpfX07cmV0dXJuIHc9Qy5hcHBlbmRDaGlsZChRKHQscixpKSl9ZnVuY3Rpb24gdGUoKXt2YXIgZT11LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLHQ9XCJvZmZzZXRcIitbXCJXaWR0aFwiLFwiSGVpZ2h0XCJdW3Iub3J0XTtyZXR1cm4gMD09PXIub3J0P2Uud2lkdGh8fHVbdF06ZS5oZWlnaHR8fHVbdF19ZnVuY3Rpb24gcmUoZSx0LGksbil7dmFyIG89ZnVuY3Rpb24obyl7dmFyIGE9aWUobyxuLnBhZ2VPZmZzZXQsbi50YXJnZXR8fHQpO3JldHVybiEhYSYmISgkKCkmJiFuLmRvTm90UmVqZWN0KSYmISh2KEMsci5jc3NDbGFzc2VzLnRhcCkmJiFuLmRvTm90UmVqZWN0KSYmIShlPT09UC5zdGFydCYmdm9pZCAwIT09YS5idXR0b25zJiZhLmJ1dHRvbnM+MSkmJighbi5ob3Zlcnx8IWEuYnV0dG9ucykmJihOfHxhLnByZXZlbnREZWZhdWx0KCksYS5jYWxjUG9pbnQ9YS5wb2ludHNbci5vcnRdLHZvaWQgaShhLG4pKX0sYT1bXTtyZXR1cm4gZS5zcGxpdChcIiBcIikuZm9yRWFjaCgoZnVuY3Rpb24oZSl7dC5hZGRFdmVudExpc3RlbmVyKGUsbywhIU4mJntwYXNzaXZlOiEwfSksYS5wdXNoKFtlLG9dKX0pKSxhfWZ1bmN0aW9uIGllKGUsdCxyKXt2YXIgaT0wPT09ZS50eXBlLmluZGV4T2YoXCJ0b3VjaFwiKSxuPTA9PT1lLnR5cGUuaW5kZXhPZihcIm1vdXNlXCIpLG89MD09PWUudHlwZS5pbmRleE9mKFwicG9pbnRlclwiKSxhPTAscz0wO2lmKDA9PT1lLnR5cGUuaW5kZXhPZihcIk1TUG9pbnRlclwiKSYmKG89ITApLFwibW91c2Vkb3duXCI9PT1lLnR5cGUmJiFlLmJ1dHRvbnMmJiFlLnRvdWNoZXMpcmV0dXJuITE7aWYoaSl7dmFyIGw9ZnVuY3Rpb24odCl7dmFyIGk9dC50YXJnZXQ7cmV0dXJuIGk9PT1yfHxyLmNvbnRhaW5zKGkpfHxlLmNvbXBvc2VkJiZlLmNvbXBvc2VkUGF0aCgpLnNoaWZ0KCk9PT1yfTtpZihcInRvdWNoc3RhcnRcIj09PWUudHlwZSl7dmFyIHU9QXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKGUudG91Y2hlcyxsKTtpZih1Lmxlbmd0aD4xKXJldHVybiExO2E9dVswXS5wYWdlWCxzPXVbMF0ucGFnZVl9ZWxzZXt2YXIgYz1BcnJheS5wcm90b3R5cGUuZmluZC5jYWxsKGUuY2hhbmdlZFRvdWNoZXMsbCk7aWYoIWMpcmV0dXJuITE7YT1jLnBhZ2VYLHM9Yy5wYWdlWX19cmV0dXJuIHQ9dHx8ZyhPKSwobnx8bykmJihhPWUuY2xpZW50WCt0Lngscz1lLmNsaWVudFkrdC55KSxlLnBhZ2VPZmZzZXQ9dCxlLnBvaW50cz1bYSxzXSxlLmN1cnNvcj1ufHxvLGV9ZnVuY3Rpb24gbmUoZSl7dmFyIHQ9MTAwKihlLWwodSxyLm9ydCkpL3RlKCk7cmV0dXJuIHQ9cCh0KSxyLmRpcj8xMDAtdDp0fWZ1bmN0aW9uIGFlKGUpe3ZhciB0PTEwMCxyPSExO3JldHVybiBmLmZvckVhY2goKGZ1bmN0aW9uKGksbil7aWYoIVgobikpe3ZhciBvPUFbbl0sYT1NYXRoLmFicyhvLWUpOyhhPHR8fGE8PXQmJmU+b3x8MTAwPT09YSYmMTAwPT09dCkmJihyPW4sdD1hKX19KSkscn1mdW5jdGlvbiBzZShlLHQpe1wibW91c2VvdXRcIj09PWUudHlwZSYmXCJIVE1MXCI9PT1lLnRhcmdldC5ub2RlTmFtZSYmbnVsbD09PWUucmVsYXRlZFRhcmdldCYmdWUoZSx0KX1mdW5jdGlvbiBsZShlLHQpe2lmKC0xPT09bmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZihcIk1TSUUgOVwiKSYmMD09PWUuYnV0dG9ucyYmMCE9PXQuYnV0dG9uc1Byb3BlcnR5KXJldHVybiB1ZShlLHQpO3ZhciBpPShyLmRpcj8tMToxKSooZS5jYWxjUG9pbnQtdC5zdGFydENhbGNQb2ludCk7eGUoaT4wLDEwMCppL3QuYmFzZVNpemUsdC5sb2NhdGlvbnMsdC5oYW5kbGVOdW1iZXJzLHQuY29ubmVjdCl9ZnVuY3Rpb24gdWUoZSx0KXt0LmhhbmRsZSYmKG0odC5oYW5kbGUsci5jc3NDbGFzc2VzLmFjdGl2ZSksTC09MSksdC5saXN0ZW5lcnMuZm9yRWFjaCgoZnVuY3Rpb24oZSl7ai5yZW1vdmVFdmVudExpc3RlbmVyKGVbMF0sZVsxXSl9KSksMD09PUwmJihtKEMsci5jc3NDbGFzc2VzLmRyYWcpLFBlKCksZS5jdXJzb3ImJihGLnN0eWxlLmN1cnNvcj1cIlwiLEYucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNlbGVjdHN0YXJ0XCIsbykpKSxyLmV2ZW50cy5zbW9vdGhTdGVwcyYmKHQuaGFuZGxlTnVtYmVycy5mb3JFYWNoKChmdW5jdGlvbihlKXtOZShlLEFbZV0sITAsITAsITEsITEpfSkpLHQuaGFuZGxlTnVtYmVycy5mb3JFYWNoKChmdW5jdGlvbihlKXtiZShcInVwZGF0ZVwiLGUpfSkpKSx0LmhhbmRsZU51bWJlcnMuZm9yRWFjaCgoZnVuY3Rpb24oZSl7YmUoXCJjaGFuZ2VcIixlKSxiZShcInNldFwiLGUpLGJlKFwiZW5kXCIsZSl9KSl9ZnVuY3Rpb24gY2UoZSx0KXtpZighdC5oYW5kbGVOdW1iZXJzLnNvbWUoWCkpe3ZhciBpOzE9PT10LmhhbmRsZU51bWJlcnMubGVuZ3RoJiYoaT1mW3QuaGFuZGxlTnVtYmVyc1swXV0uY2hpbGRyZW5bMF0sTCs9MSxoKGksci5jc3NDbGFzc2VzLmFjdGl2ZSkpLGUuc3RvcFByb3BhZ2F0aW9uKCk7dmFyIG49W10sYT1yZShQLm1vdmUsaixsZSx7dGFyZ2V0OmUudGFyZ2V0LGhhbmRsZTppLGNvbm5lY3Q6dC5jb25uZWN0LGxpc3RlbmVyczpuLHN0YXJ0Q2FsY1BvaW50OmUuY2FsY1BvaW50LGJhc2VTaXplOnRlKCkscGFnZU9mZnNldDplLnBhZ2VPZmZzZXQsaGFuZGxlTnVtYmVyczp0LmhhbmRsZU51bWJlcnMsYnV0dG9uc1Byb3BlcnR5OmUuYnV0dG9ucyxsb2NhdGlvbnM6QS5zbGljZSgpfSkscz1yZShQLmVuZCxqLHVlLHt0YXJnZXQ6ZS50YXJnZXQsaGFuZGxlOmksbGlzdGVuZXJzOm4sZG9Ob3RSZWplY3Q6ITAsaGFuZGxlTnVtYmVyczp0LmhhbmRsZU51bWJlcnN9KSxsPXJlKFwibW91c2VvdXRcIixqLHNlLHt0YXJnZXQ6ZS50YXJnZXQsaGFuZGxlOmksbGlzdGVuZXJzOm4sZG9Ob3RSZWplY3Q6ITAsaGFuZGxlTnVtYmVyczp0LmhhbmRsZU51bWJlcnN9KTtuLnB1c2guYXBwbHkobixhLmNvbmNhdChzLGwpKSxlLmN1cnNvciYmKEYuc3R5bGUuY3Vyc29yPWdldENvbXB1dGVkU3R5bGUoZS50YXJnZXQpLmN1cnNvcixmLmxlbmd0aD4xJiZoKEMsci5jc3NDbGFzc2VzLmRyYWcpLEYuYWRkRXZlbnRMaXN0ZW5lcihcInNlbGVjdHN0YXJ0XCIsbywhMSkpLHQuaGFuZGxlTnVtYmVycy5mb3JFYWNoKChmdW5jdGlvbihlKXtiZShcInN0YXJ0XCIsZSl9KSl9fWZ1bmN0aW9uIHBlKGUpe2Uuc3RvcFByb3BhZ2F0aW9uKCk7dmFyIHQ9bmUoZS5jYWxjUG9pbnQpLGk9YWUodCk7ITEhPT1pJiYoci5ldmVudHMuc25hcHx8YyhDLHIuY3NzQ2xhc3Nlcy50YXAsci5hbmltYXRpb25EdXJhdGlvbiksTmUoaSx0LCEwLCEwKSxQZSgpLGJlKFwic2xpZGVcIixpLCEwKSxiZShcInVwZGF0ZVwiLGksITApLHIuZXZlbnRzLnNuYXA/Y2UoZSx7aGFuZGxlTnVtYmVyczpbaV19KTooYmUoXCJjaGFuZ2VcIixpLCEwKSxiZShcInNldFwiLGksITApKSl9ZnVuY3Rpb24gZGUoZSl7dmFyIHQ9bmUoZS5jYWxjUG9pbnQpLHI9ay5nZXRTdGVwKHQpLGk9ay5mcm9tU3RlcHBpbmcocik7T2JqZWN0LmtleXMoVSkuZm9yRWFjaCgoZnVuY3Rpb24oZSl7XCJob3ZlclwiPT09ZS5zcGxpdChcIi5cIilbMF0mJlVbZV0uZm9yRWFjaCgoZnVuY3Rpb24oZSl7ZS5jYWxsKFRlLGkpfSkpfSkpfWZ1bmN0aW9uIGZlKGUsdCl7aWYoJCgpfHxYKHQpKXJldHVybiExO3ZhciBpPVtcIkxlZnRcIixcIlJpZ2h0XCJdLG49W1wiRG93blwiLFwiVXBcIl0sbz1bXCJQYWdlRG93blwiLFwiUGFnZVVwXCJdLGE9W1wiSG9tZVwiLFwiRW5kXCJdO3IuZGlyJiYhci5vcnQ/aS5yZXZlcnNlKCk6ci5vcnQmJiFyLmRpciYmKG4ucmV2ZXJzZSgpLG8ucmV2ZXJzZSgpKTt2YXIgcyxsPWUua2V5LnJlcGxhY2UoXCJBcnJvd1wiLFwiXCIpLHU9bD09PW9bMF0sYz1sPT09b1sxXSxwPWw9PT1uWzBdfHxsPT09aVswXXx8dSxkPWw9PT1uWzFdfHxsPT09aVsxXXx8YyxmPWw9PT1hWzBdLGg9bD09PWFbMV07aWYoIShwfHxkfHxmfHxoKSlyZXR1cm4hMDtpZihlLnByZXZlbnREZWZhdWx0KCksZHx8cCl7dmFyIG09cD8wOjEsdj1PZSh0KVttXTtpZihudWxsPT09dilyZXR1cm4hMTshMT09PXYmJih2PWsuZ2V0RGVmYXVsdFN0ZXAoQVt0XSxwLHIua2V5Ym9hcmREZWZhdWx0U3RlcCkpLHYqPWN8fHU/ci5rZXlib2FyZFBhZ2VNdWx0aXBsaWVyOnIua2V5Ym9hcmRNdWx0aXBsaWVyLHY9TWF0aC5tYXgodiwxZS03KSx2Kj1wPy0xOjEscz1WW3RdK3Z9ZWxzZSBzPWg/ci5zcGVjdHJ1bS54VmFsW3Iuc3BlY3RydW0ueFZhbC5sZW5ndGgtMV06ci5zcGVjdHJ1bS54VmFsWzBdO3JldHVybiBOZSh0LGsudG9TdGVwcGluZyhzKSwhMCwhMCksYmUoXCJzbGlkZVwiLHQpLGJlKFwidXBkYXRlXCIsdCksYmUoXCJjaGFuZ2VcIix0KSxiZShcInNldFwiLHQpLCExfWZ1bmN0aW9uIGhlKGUpe2UuZml4ZWR8fGYuZm9yRWFjaCgoZnVuY3Rpb24oZSx0KXtyZShQLnN0YXJ0LGUuY2hpbGRyZW5bMF0sY2Use2hhbmRsZU51bWJlcnM6W3RdfSl9KSksZS50YXAmJnJlKFAuc3RhcnQsdSxwZSx7fSksZS5ob3ZlciYmcmUoUC5tb3ZlLHUsZGUse2hvdmVyOiEwfSksZS5kcmFnJiZ4LmZvckVhY2goKGZ1bmN0aW9uKHQsaSl7aWYoITEhPT10JiYwIT09aSYmaSE9PXgubGVuZ3RoLTEpe3ZhciBuPWZbaS0xXSxvPWZbaV0sYT1bdF0scz1bbixvXSxsPVtpLTEsaV07aCh0LHIuY3NzQ2xhc3Nlcy5kcmFnZ2FibGUpLGUuZml4ZWQmJihhLnB1c2gobi5jaGlsZHJlblswXSksYS5wdXNoKG8uY2hpbGRyZW5bMF0pKSxlLmRyYWdBbGwmJihzPWYsbD1NKSxhLmZvckVhY2goKGZ1bmN0aW9uKGUpe3JlKFAuc3RhcnQsZSxjZSx7aGFuZGxlczpzLGhhbmRsZU51bWJlcnM6bCxjb25uZWN0OnR9KX0pKX19KSl9ZnVuY3Rpb24gbWUoZSx0KXtVW2VdPVVbZV18fFtdLFVbZV0ucHVzaCh0KSxcInVwZGF0ZVwiPT09ZS5zcGxpdChcIi5cIilbMF0mJmYuZm9yRWFjaCgoZnVuY3Rpb24oZSx0KXtiZShcInVwZGF0ZVwiLHQpfSkpfWZ1bmN0aW9uIHZlKGUpe3JldHVybiBlPT09RC5hcmlhfHxlPT09RC50b29sdGlwc31mdW5jdGlvbiBnZShlKXt2YXIgdD1lJiZlLnNwbGl0KFwiLlwiKVswXSxyPXQ/ZS5zdWJzdHJpbmcodC5sZW5ndGgpOmU7T2JqZWN0LmtleXMoVSkuZm9yRWFjaCgoZnVuY3Rpb24oZSl7dmFyIGk9ZS5zcGxpdChcIi5cIilbMF0sbj1lLnN1YnN0cmluZyhpLmxlbmd0aCk7dCYmdCE9PWl8fHImJnIhPT1ufHx2ZShuKSYmciE9PW58fGRlbGV0ZSBVW2VdfSkpfWZ1bmN0aW9uIGJlKGUsdCxpKXtPYmplY3Qua2V5cyhVKS5mb3JFYWNoKChmdW5jdGlvbihuKXt2YXIgbz1uLnNwbGl0KFwiLlwiKVswXTtlPT09byYmVVtuXS5mb3JFYWNoKChmdW5jdGlvbihlKXtlLmNhbGwoVGUsVi5tYXAoci5mb3JtYXQudG8pLHQsVi5zbGljZSgpLGl8fCExLEEuc2xpY2UoKSxUZSl9KSl9KSl9ZnVuY3Rpb24geWUoZSx0LGksbixvLGEscyl7dmFyIGw7cmV0dXJuIGYubGVuZ3RoPjEmJiFyLmV2ZW50cy51bmNvbnN0cmFpbmVkJiYobiYmdD4wJiYobD1rLmdldEFic29sdXRlRGlzdGFuY2UoZVt0LTFdLHIubWFyZ2luLCExKSxpPU1hdGgubWF4KGksbCkpLG8mJnQ8Zi5sZW5ndGgtMSYmKGw9ay5nZXRBYnNvbHV0ZURpc3RhbmNlKGVbdCsxXSxyLm1hcmdpbiwhMCksaT1NYXRoLm1pbihpLGwpKSksZi5sZW5ndGg+MSYmci5saW1pdCYmKG4mJnQ+MCYmKGw9ay5nZXRBYnNvbHV0ZURpc3RhbmNlKGVbdC0xXSxyLmxpbWl0LCExKSxpPU1hdGgubWluKGksbCkpLG8mJnQ8Zi5sZW5ndGgtMSYmKGw9ay5nZXRBYnNvbHV0ZURpc3RhbmNlKGVbdCsxXSxyLmxpbWl0LCEwKSxpPU1hdGgubWF4KGksbCkpKSxyLnBhZGRpbmcmJigwPT09dCYmKGw9ay5nZXRBYnNvbHV0ZURpc3RhbmNlKDAsci5wYWRkaW5nWzBdLCExKSxpPU1hdGgubWF4KGksbCkpLHQ9PT1mLmxlbmd0aC0xJiYobD1rLmdldEFic29sdXRlRGlzdGFuY2UoMTAwLHIucGFkZGluZ1sxXSwhMCksaT1NYXRoLm1pbihpLGwpKSksc3x8KGk9ay5nZXRTdGVwKGkpKSwhKChpPXAoaSkpPT09ZVt0XSYmIWEpJiZpfWZ1bmN0aW9uIFNlKGUsdCl7dmFyIGk9ci5vcnQ7cmV0dXJuKGk/dDplKStcIiwgXCIrKGk/ZTp0KX1mdW5jdGlvbiB4ZShlLHQsaSxuLG8pe3ZhciBhPWkuc2xpY2UoKSxzPW5bMF0sbD1yLmV2ZW50cy5zbW9vdGhTdGVwcyx1PVshZSxlXSxjPVtlLCFlXTtuPW4uc2xpY2UoKSxlJiZuLnJldmVyc2UoKSxuLmxlbmd0aD4xP24uZm9yRWFjaCgoZnVuY3Rpb24oZSxyKXt2YXIgaT15ZShhLGUsYVtlXSt0LHVbcl0sY1tyXSwhMSxsKTshMT09PWk/dD0wOih0PWktYVtlXSxhW2VdPWkpfSkpOnU9Yz1bITBdO3ZhciBwPSExO24uZm9yRWFjaCgoZnVuY3Rpb24oZSxyKXtwPU5lKGUsaVtlXSt0LHVbcl0sY1tyXSwhMSxsKXx8cH0pKSxwJiYobi5mb3JFYWNoKChmdW5jdGlvbihlKXtiZShcInVwZGF0ZVwiLGUpLGJlKFwic2xpZGVcIixlKX0pKSxudWxsIT1vJiZiZShcImRyYWdcIixzKSl9ZnVuY3Rpb24gd2UoZSx0KXtyZXR1cm4gci5kaXI/MTAwLWUtdDplfWZ1bmN0aW9uIEVlKGUsdCl7QVtlXT10LFZbZV09ay5mcm9tU3RlcHBpbmcodCk7dmFyIGk9XCJ0cmFuc2xhdGUoXCIrU2Uod2UodCwwKS1UK1wiJVwiLFwiMFwiKStcIilcIjtmW2VdLnN0eWxlW3IudHJhbnNmb3JtUnVsZV09aSxDZShlKSxDZShlKzEpfWZ1bmN0aW9uIFBlKCl7TS5mb3JFYWNoKChmdW5jdGlvbihlKXt2YXIgdD1BW2VdPjUwPy0xOjEscj0zKyhmLmxlbmd0aCt0KmUpO2ZbZV0uc3R5bGUuekluZGV4PVN0cmluZyhyKX0pKX1mdW5jdGlvbiBOZShlLHQscixpLG4sbyl7cmV0dXJuIG58fCh0PXllKEEsZSx0LHIsaSwhMSxvKSksITEhPT10JiYoRWUoZSx0KSwhMCl9ZnVuY3Rpb24gQ2UoZSl7aWYoeFtlXSl7dmFyIHQ9MCxpPTEwMDswIT09ZSYmKHQ9QVtlLTFdKSxlIT09eC5sZW5ndGgtMSYmKGk9QVtlXSk7dmFyIG49aS10LG89XCJ0cmFuc2xhdGUoXCIrU2Uod2UodCxuKStcIiVcIixcIjBcIikrXCIpXCIsYT1cInNjYWxlKFwiK1NlKG4vMTAwLFwiMVwiKStcIilcIjt4W2VdLnN0eWxlW3IudHJhbnNmb3JtUnVsZV09bytcIiBcIithfX1mdW5jdGlvbiBrZShlLHQpe3JldHVybiBudWxsPT09ZXx8ITE9PT1lfHx2b2lkIDA9PT1lP0FbdF06KFwibnVtYmVyXCI9PXR5cGVvZiBlJiYoZT1TdHJpbmcoZSkpLCExIT09KGU9ci5mb3JtYXQuZnJvbShlKSkmJihlPWsudG9TdGVwcGluZyhlKSksITE9PT1lfHxpc05hTihlKT9BW3RdOmUpfWZ1bmN0aW9uIFZlKGUsdCxpKXt2YXIgbj1kKGUpLG89dm9pZCAwPT09QVswXTt0PXZvaWQgMD09PXR8fHQsci5hbmltYXRlJiYhbyYmYyhDLHIuY3NzQ2xhc3Nlcy50YXAsci5hbmltYXRpb25EdXJhdGlvbiksTS5mb3JFYWNoKChmdW5jdGlvbihlKXtOZShlLGtlKG5bZV0sZSksITAsITEsaSl9KSk7dmFyIGE9MT09PU0ubGVuZ3RoPzA6MTtpZihvJiZrLmhhc05vU2l6ZSgpJiYoaT0hMCxBWzBdPTAsTS5sZW5ndGg+MSkpe3ZhciBzPTEwMC8oTS5sZW5ndGgtMSk7TS5mb3JFYWNoKChmdW5jdGlvbihlKXtBW2VdPWUqc30pKX1mb3IoO2E8TS5sZW5ndGg7KythKU0uZm9yRWFjaCgoZnVuY3Rpb24oZSl7TmUoZSxBW2VdLCEwLCEwLGkpfSkpO1BlKCksTS5mb3JFYWNoKChmdW5jdGlvbihlKXtiZShcInVwZGF0ZVwiLGUpLG51bGwhPT1uW2VdJiZ0JiZiZShcInNldFwiLGUpfSkpfWZ1bmN0aW9uIEFlKGUpe1ZlKHIuc3RhcnQsZSl9ZnVuY3Rpb24gTWUoZSx0LHIsaSl7aWYoISgoZT1OdW1iZXIoZSkpPj0wJiZlPE0ubGVuZ3RoKSl0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyOiBpbnZhbGlkIGhhbmRsZSBudW1iZXIsIGdvdDogXCIrZSk7TmUoZSxrZSh0LGUpLCEwLCEwLGkpLGJlKFwidXBkYXRlXCIsZSksciYmYmUoXCJzZXRcIixlKX1mdW5jdGlvbiBMZShlKXtpZih2b2lkIDA9PT1lJiYoZT0hMSksZSlyZXR1cm4gMT09PVYubGVuZ3RoP1ZbMF06Vi5zbGljZSgwKTt2YXIgdD1WLm1hcChyLmZvcm1hdC50byk7cmV0dXJuIDE9PT10Lmxlbmd0aD90WzBdOnR9ZnVuY3Rpb24gVWUoKXtmb3IoZ2UoRC5hcmlhKSxnZShELnRvb2x0aXBzKSxPYmplY3Qua2V5cyhyLmNzc0NsYXNzZXMpLmZvckVhY2goKGZ1bmN0aW9uKGUpe20oQyxyLmNzc0NsYXNzZXNbZV0pfSkpO0MuZmlyc3RDaGlsZDspQy5yZW1vdmVDaGlsZChDLmZpcnN0Q2hpbGQpO2RlbGV0ZSBDLm5vVWlTbGlkZXJ9ZnVuY3Rpb24gT2UoZSl7dmFyIHQ9QVtlXSxpPWsuZ2V0TmVhcmJ5U3RlcHModCksbj1WW2VdLG89aS50aGlzU3RlcC5zdGVwLGE9bnVsbDtpZihyLnNuYXApcmV0dXJuW24taS5zdGVwQmVmb3JlLnN0YXJ0VmFsdWV8fG51bGwsaS5zdGVwQWZ0ZXIuc3RhcnRWYWx1ZS1ufHxudWxsXTshMSE9PW8mJm4rbz5pLnN0ZXBBZnRlci5zdGFydFZhbHVlJiYobz1pLnN0ZXBBZnRlci5zdGFydFZhbHVlLW4pLGE9bj5pLnRoaXNTdGVwLnN0YXJ0VmFsdWU/aS50aGlzU3RlcC5zdGVwOiExIT09aS5zdGVwQmVmb3JlLnN0ZXAmJm4taS5zdGVwQmVmb3JlLmhpZ2hlc3RTdGVwLDEwMD09PXQ/bz1udWxsOjA9PT10JiYoYT1udWxsKTt2YXIgcz1rLmNvdW50U3RlcERlY2ltYWxzKCk7cmV0dXJuIG51bGwhPT1vJiYhMSE9PW8mJihvPU51bWJlcihvLnRvRml4ZWQocykpKSxudWxsIT09YSYmITEhPT1hJiYoYT1OdW1iZXIoYS50b0ZpeGVkKHMpKSksW2Esb119ZnVuY3Rpb24gRGUoKXtyZXR1cm4gTS5tYXAoT2UpfWZ1bmN0aW9uIGplKGUsdCl7dmFyIGk9TGUoKSxvPVtcIm1hcmdpblwiLFwibGltaXRcIixcInBhZGRpbmdcIixcInJhbmdlXCIsXCJhbmltYXRlXCIsXCJzbmFwXCIsXCJzdGVwXCIsXCJmb3JtYXRcIixcInBpcHNcIixcInRvb2x0aXBzXCJdO28uZm9yRWFjaCgoZnVuY3Rpb24odCl7dm9pZCAwIT09ZVt0XSYmKHNbdF09ZVt0XSl9KSk7dmFyIGE9b2Uocyk7by5mb3JFYWNoKChmdW5jdGlvbih0KXt2b2lkIDAhPT1lW3RdJiYoclt0XT1hW3RdKX0pKSxrPWEuc3BlY3RydW0sci5tYXJnaW49YS5tYXJnaW4sci5saW1pdD1hLmxpbWl0LHIucGFkZGluZz1hLnBhZGRpbmcsci5waXBzP2VlKHIucGlwcyk6WigpLHIudG9vbHRpcHM/SSgpOlkoKSxBPVtdLFZlKG4oZS5zdGFydCk/ZS5zdGFydDppLHQpfWZ1bmN0aW9uIEZlKCl7dT1CKEMpLFIoci5jb25uZWN0LHUpLGhlKHIuZXZlbnRzKSxWZShyLnN0YXJ0KSxyLnBpcHMmJmVlKHIucGlwcyksci50b29sdGlwcyYmSSgpLFcoKX1GZSgpO3ZhciBUZT17ZGVzdHJveTpVZSxzdGVwczpEZSxvbjptZSxvZmY6Z2UsZ2V0OkxlLHNldDpWZSxzZXRIYW5kbGU6TWUscmVzZXQ6QWUsX19tb3ZlSGFuZGxlczpmdW5jdGlvbihlLHQscil7eGUoZSx0LEEscil9LG9wdGlvbnM6cyx1cGRhdGVPcHRpb25zOmplLHRhcmdldDpDLHJlbW92ZVBpcHM6WixyZW1vdmVUb29sdGlwczpZLGdldFBvc2l0aW9uczpmdW5jdGlvbigpe3JldHVybiBBLnNsaWNlKCl9LGdldFRvb2x0aXBzOmZ1bmN0aW9uKCl7cmV0dXJuIEV9LGdldE9yaWdpbnM6ZnVuY3Rpb24oKXtyZXR1cm4gZn0scGlwczplZX07cmV0dXJuIFRlfWZ1bmN0aW9uIHNlKGUsdCl7aWYoIWV8fCFlLm5vZGVOYW1lKXRocm93IG5ldyBFcnJvcihcIm5vVWlTbGlkZXI6IGNyZWF0ZSByZXF1aXJlcyBhIHNpbmdsZSBlbGVtZW50LCBnb3Q6IFwiK2UpO2lmKGUubm9VaVNsaWRlcil0aHJvdyBuZXcgRXJyb3IoXCJub1VpU2xpZGVyOiBTbGlkZXIgd2FzIGFscmVhZHkgaW5pdGlhbGl6ZWQuXCIpO3ZhciByPWFlKGUsb2UodCksdCk7cmV0dXJuIGUubm9VaVNsaWRlcj1yLHJ9dmFyIGxlPXtfX3NwZWN0cnVtOkwsY3NzQ2xhc3NlczpPLGNyZWF0ZTpzZX07ZS5jcmVhdGU9c2UsZS5jc3NDbGFzc2VzPU8sZS5kZWZhdWx0PWxlLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pfSh0KX0pKSk7ZnVuY3Rpb24gaChlLHQpe2lmKCFBcnJheS5pc0FycmF5KGUpfHwhQXJyYXkuaXNBcnJheSh0KSlyZXR1cm4hMTtjb25zdCByPXQuc2xpY2UoKS5zb3J0KCk7cmV0dXJuIGUubGVuZ3RoPT09dC5sZW5ndGgmJmUuc2xpY2UoKS5zb3J0KCkuZXZlcnkoKGZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU9PT1yW3RdfSkpfXZhciBtPXtuYW1lOlwiU2xpZGVyXCIsZW1pdHM6W1wiaW5wdXRcIixcInVwZGF0ZTptb2RlbFZhbHVlXCIsXCJzdGFydFwiLFwic2xpZGVcIixcImRyYWdcIixcInVwZGF0ZVwiLFwiY2hhbmdlXCIsXCJzZXRcIixcImVuZFwiXSxwcm9wczp7Li4ue3ZhbHVlOnt2YWxpZGF0b3I6ZnVuY3Rpb24oZSl7cmV0dXJuIGU9PlwibnVtYmVyXCI9PXR5cGVvZiBlfHxlIGluc3RhbmNlb2YgQXJyYXl8fG51bGw9PWV8fCExPT09ZX0scmVxdWlyZWQ6ITF9LG1vZGVsVmFsdWU6e3ZhbGlkYXRvcjpmdW5jdGlvbihlKXtyZXR1cm4gZT0+XCJudW1iZXJcIj09dHlwZW9mIGV8fGUgaW5zdGFuY2VvZiBBcnJheXx8bnVsbD09ZXx8ITE9PT1lfSxyZXF1aXJlZDohMX19LGlkOnt0eXBlOltTdHJpbmcsTnVtYmVyXSxyZXF1aXJlZDohMX0sZGlzYWJsZWQ6e3R5cGU6Qm9vbGVhbixyZXF1aXJlZDohMSxkZWZhdWx0OiExfSxtaW46e3R5cGU6TnVtYmVyLHJlcXVpcmVkOiExLGRlZmF1bHQ6MH0sbWF4Ont0eXBlOk51bWJlcixyZXF1aXJlZDohMSxkZWZhdWx0OjEwMH0sc3RlcDp7dHlwZTpOdW1iZXIscmVxdWlyZWQ6ITEsZGVmYXVsdDoxfSxvcmllbnRhdGlvbjp7dHlwZTpTdHJpbmcscmVxdWlyZWQ6ITEsZGVmYXVsdDpcImhvcml6b250YWxcIn0sZGlyZWN0aW9uOnt0eXBlOlN0cmluZyxyZXF1aXJlZDohMSxkZWZhdWx0OlwibHRyXCJ9LHRvb2x0aXBzOnt0eXBlOkJvb2xlYW4scmVxdWlyZWQ6ITEsZGVmYXVsdDohMH0sb3B0aW9uczp7dHlwZTpPYmplY3QscmVxdWlyZWQ6ITEsZGVmYXVsdDooKT0+KHt9KX0sbWVyZ2U6e3R5cGU6TnVtYmVyLHJlcXVpcmVkOiExLGRlZmF1bHQ6LTF9LGZvcm1hdDp7dHlwZTpbT2JqZWN0LEZ1bmN0aW9uLEJvb2xlYW5dLHJlcXVpcmVkOiExLGRlZmF1bHQ6bnVsbH0sY2xhc3Nlczp7dHlwZTpPYmplY3QscmVxdWlyZWQ6ITEsZGVmYXVsdDooKT0+KHt9KX0sc2hvd1Rvb2x0aXA6e3R5cGU6U3RyaW5nLHJlcXVpcmVkOiExLGRlZmF1bHQ6XCJhbHdheXNcIn0sdG9vbHRpcFBvc2l0aW9uOnt0eXBlOlN0cmluZyxyZXF1aXJlZDohMSxkZWZhdWx0Om51bGx9LGxhenk6e3R5cGU6Qm9vbGVhbixyZXF1aXJlZDohMSxkZWZhdWx0OiEwfSxhcmlhTGFiZWxsZWRieTp7dHlwZTpTdHJpbmcscmVxdWlyZWQ6ITEsZGVmYXVsdDp2b2lkIDB9LGFyaWE6e3JlcXVpcmVkOiExLHR5cGU6T2JqZWN0LGRlZmF1bHQ6KCk9Pih7fSl9fSxzZXR1cChhLHMpe2NvbnN0IGw9ZnVuY3Rpb24ocixpLG4pe2NvbnN0e3ZhbHVlOm8sbW9kZWxWYWx1ZTphLG1pbjpzfT1lKHIpO2xldCBsPWEmJnZvaWQgMCE9PWEudmFsdWU/YTpvO2NvbnN0IGM9dChsLnZhbHVlKTtpZih1KGwudmFsdWUpJiYobD10KHMudmFsdWUpKSxBcnJheS5pc0FycmF5KGwudmFsdWUpJiYwPT1sLnZhbHVlLmxlbmd0aCl0aHJvdyBuZXcgRXJyb3IoXCJTbGlkZXIgdi1tb2RlbCBtdXN0IG5vdCBiZSBhbiBlbXB0eSBhcnJheVwiKTtyZXR1cm57dmFsdWU6bCxpbml0aWFsVmFsdWU6Y319KGEpLGM9ZnVuY3Rpb24odCxpLG4pe2NvbnN0e2NsYXNzZXM6byxzaG93VG9vbHRpcDphLHRvb2x0aXBQb3NpdGlvbjpzLG9yaWVudGF0aW9uOmx9PWUodCksdT1yKCgoKT0+KHt0YXJnZXQ6XCJzbGlkZXItdGFyZ2V0XCIsZm9jdXNlZDpcInNsaWRlci1mb2N1c2VkXCIsdG9vbHRpcEZvY3VzOlwic2xpZGVyLXRvb2x0aXAtZm9jdXNcIix0b29sdGlwRHJhZzpcInNsaWRlci10b29sdGlwLWRyYWdcIixsdHI6XCJzbGlkZXItbHRyXCIscnRsOlwic2xpZGVyLXJ0bFwiLGhvcml6b250YWw6XCJzbGlkZXItaG9yaXpvbnRhbFwiLHZlcnRpY2FsOlwic2xpZGVyLXZlcnRpY2FsXCIsdGV4dERpcmVjdGlvblJ0bDpcInNsaWRlci10eHQtZGlyLXJ0bFwiLHRleHREaXJlY3Rpb25MdHI6XCJzbGlkZXItdHh0LWRpci1sdHJcIixiYXNlOlwic2xpZGVyLWJhc2VcIixjb25uZWN0czpcInNsaWRlci1jb25uZWN0c1wiLGNvbm5lY3Q6XCJzbGlkZXItY29ubmVjdFwiLG9yaWdpbjpcInNsaWRlci1vcmlnaW5cIixoYW5kbGU6XCJzbGlkZXItaGFuZGxlXCIsaGFuZGxlTG93ZXI6XCJzbGlkZXItaGFuZGxlLWxvd2VyXCIsaGFuZGxlVXBwZXI6XCJzbGlkZXItaGFuZGxlLXVwcGVyXCIsdG91Y2hBcmVhOlwic2xpZGVyLXRvdWNoLWFyZWFcIix0b29sdGlwOlwic2xpZGVyLXRvb2x0aXBcIix0b29sdGlwVG9wOlwic2xpZGVyLXRvb2x0aXAtdG9wXCIsdG9vbHRpcEJvdHRvbTpcInNsaWRlci10b29sdGlwLWJvdHRvbVwiLHRvb2x0aXBMZWZ0Olwic2xpZGVyLXRvb2x0aXAtbGVmdFwiLHRvb2x0aXBSaWdodDpcInNsaWRlci10b29sdGlwLXJpZ2h0XCIsdG9vbHRpcEhpZGRlbjpcInNsaWRlci10b29sdGlwLWhpZGRlblwiLGFjdGl2ZTpcInNsaWRlci1hY3RpdmVcIixkcmFnZ2FibGU6XCJzbGlkZXItZHJhZ2dhYmxlXCIsdGFwOlwic2xpZGVyLXN0YXRlLXRhcFwiLGRyYWc6XCJzbGlkZXItc3RhdGUtZHJhZ1wiLHBpcHM6XCJzbGlkZXItcGlwc1wiLHBpcHNIb3Jpem9udGFsOlwic2xpZGVyLXBpcHMtaG9yaXpvbnRhbFwiLHBpcHNWZXJ0aWNhbDpcInNsaWRlci1waXBzLXZlcnRpY2FsXCIsbWFya2VyOlwic2xpZGVyLW1hcmtlclwiLG1hcmtlckhvcml6b250YWw6XCJzbGlkZXItbWFya2VyLWhvcml6b250YWxcIixtYXJrZXJWZXJ0aWNhbDpcInNsaWRlci1tYXJrZXItdmVydGljYWxcIixtYXJrZXJOb3JtYWw6XCJzbGlkZXItbWFya2VyLW5vcm1hbFwiLG1hcmtlckxhcmdlOlwic2xpZGVyLW1hcmtlci1sYXJnZVwiLG1hcmtlclN1YjpcInNsaWRlci1tYXJrZXItc3ViXCIsdmFsdWU6XCJzbGlkZXItdmFsdWVcIix2YWx1ZUhvcml6b250YWw6XCJzbGlkZXItdmFsdWUtaG9yaXpvbnRhbFwiLHZhbHVlVmVydGljYWw6XCJzbGlkZXItdmFsdWUtdmVydGljYWxcIix2YWx1ZU5vcm1hbDpcInNsaWRlci12YWx1ZS1ub3JtYWxcIix2YWx1ZUxhcmdlOlwic2xpZGVyLXZhbHVlLWxhcmdlXCIsdmFsdWVTdWI6XCJzbGlkZXItdmFsdWUtc3ViXCIsLi4uby52YWx1ZX0pKSk7cmV0dXJue2NsYXNzTGlzdDpyKCgoKT0+e2NvbnN0IGU9ey4uLnUudmFsdWV9O3JldHVybiBPYmplY3Qua2V5cyhlKS5mb3JFYWNoKCh0PT57ZVt0XT1BcnJheS5pc0FycmF5KGVbdF0pP2VbdF0uZmlsdGVyKChlPT5udWxsIT09ZSkpLmpvaW4oXCIgXCIpOmVbdF19KSksXCJhbHdheXNcIiE9PWEudmFsdWUmJihlLnRhcmdldCs9YCAke1wiZHJhZ1wiPT09YS52YWx1ZT9lLnRvb2x0aXBEcmFnOmUudG9vbHRpcEZvY3VzfWApLFwiaG9yaXpvbnRhbFwiPT09bC52YWx1ZSYmKGUudG9vbHRpcCs9XCJib3R0b21cIj09PXMudmFsdWU/YCAke2UudG9vbHRpcEJvdHRvbX1gOmAgJHtlLnRvb2x0aXBUb3B9YCksXCJ2ZXJ0aWNhbFwiPT09bC52YWx1ZSYmKGUudG9vbHRpcCs9XCJyaWdodFwiPT09cy52YWx1ZT9gICR7ZS50b29sdGlwUmlnaHR9YDpgICR7ZS50b29sdGlwTGVmdH1gKSxlfSkpfX0oYSkscD1mdW5jdGlvbih0LGksbil7Y29uc3R7Zm9ybWF0Om8sc3RlcDphfT1lKHQpLHM9bi52YWx1ZSxsPW4uY2xhc3NMaXN0LHU9cigoKCk9Pm8mJm8udmFsdWU/XCJmdW5jdGlvblwiPT10eXBlb2Ygby52YWx1ZT97dG86by52YWx1ZX06ZCh7Li4uby52YWx1ZX0pOmQoe2RlY2ltYWxzOmEudmFsdWU+PTA/MDoyfSkpKSxjPXIoKCgpPT5BcnJheS5pc0FycmF5KHMudmFsdWUpP3MudmFsdWUubWFwKChlPT51LnZhbHVlKSk6dS52YWx1ZSkpO3JldHVybnt0b29sdGlwRm9ybWF0OnUsdG9vbHRpcHNGb3JtYXQ6Yyx0b29sdGlwc01lcmdlOihlLHQscik9Pnt2YXIgaT1cInJ0bFwiPT09Z2V0Q29tcHV0ZWRTdHlsZShlKS5kaXJlY3Rpb24sbj1cInJ0bFwiPT09ZS5ub1VpU2xpZGVyLm9wdGlvbnMuZGlyZWN0aW9uLG89XCJ2ZXJ0aWNhbFwiPT09ZS5ub1VpU2xpZGVyLm9wdGlvbnMub3JpZW50YXRpb24sYT1lLm5vVWlTbGlkZXIuZ2V0VG9vbHRpcHMoKSxzPWUubm9VaVNsaWRlci5nZXRPcmlnaW5zKCk7YS5mb3JFYWNoKChmdW5jdGlvbihlLHQpe2UmJnNbdF0uYXBwZW5kQ2hpbGQoZSl9KSksZS5ub1VpU2xpZGVyLm9uKFwidXBkYXRlXCIsKGZ1bmN0aW9uKGUscyxjLHAsZCl7dmFyIGY9W1tdXSxoPVtbXV0sbT1bW11dLHY9MDthWzBdJiYoZlswXVswXT0wLGhbMF1bMF09ZFswXSxtWzBdWzBdPXUudmFsdWUudG8ocGFyc2VGbG9hdChlWzBdKSkpO2Zvcih2YXIgZz0xO2c8ZS5sZW5ndGg7ZysrKSghYVtnXXx8ZVtnXS1lW2ctMV0+dCkmJihmWysrdl09W10sbVt2XT1bXSxoW3ZdPVtdKSxhW2ddJiYoZlt2XS5wdXNoKGcpLG1bdl0ucHVzaCh1LnZhbHVlLnRvKHBhcnNlRmxvYXQoZVtnXSkpKSxoW3ZdLnB1c2goZFtnXSkpO2YuZm9yRWFjaCgoZnVuY3Rpb24oZSx0KXtmb3IodmFyIHM9ZS5sZW5ndGgsdT0wO3U8czt1Kyspe3ZhciBjPWVbdV07aWYodT09PXMtMSl7dmFyIHA9MDtoW3RdLmZvckVhY2goKGZ1bmN0aW9uKGUpe3ArPTFlMy1lfSkpO3ZhciBkPW8/XCJib3R0b21cIjpcInJpZ2h0XCIsZj1uPzA6cy0xLHY9MWUzLWhbdF1bZl07cD0oaSYmIW8/MTAwOjApK3Avcy12LGFbY10uaW5uZXJIVE1MPW1bdF0uam9pbihyKSxhW2NdLnN0eWxlLmRpc3BsYXk9XCJibG9ja1wiLGFbY10uc3R5bGVbZF09cCtcIiVcIixsLnZhbHVlLnRvb2x0aXBIaWRkZW4uc3BsaXQoXCIgXCIpLmZvckVhY2goKGU9PnthW2NdLmNsYXNzTGlzdC5jb250YWlucyhlKSYmYVtjXS5jbGFzc0xpc3QucmVtb3ZlKGUpfSkpfWVsc2UgYVtjXS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLGwudmFsdWUudG9vbHRpcEhpZGRlbi5zcGxpdChcIiBcIikuZm9yRWFjaCgoZT0+e2FbY10uY2xhc3NMaXN0LmFkZChlKX0pKX19KSl9KSl9fX0oYSwwLHt2YWx1ZTpsLnZhbHVlLGNsYXNzTGlzdDpjLmNsYXNzTGlzdH0pLG09ZnVuY3Rpb24oYSxzLGwpe2NvbnN0e29yaWVudGF0aW9uOmMsZGlyZWN0aW9uOnAsdG9vbHRpcHM6ZCxzdGVwOm0sbWluOnYsbWF4OmcsbWVyZ2U6YixpZDp5LGRpc2FibGVkOlMsb3B0aW9uczp4LGNsYXNzZXM6dyxmb3JtYXQ6RSxsYXp5OlAsYXJpYUxhYmVsbGVkYnk6TixhcmlhOkN9PWUoYSksaz1sLnZhbHVlLFY9bC5pbml0aWFsVmFsdWUsQT1sLnRvb2x0aXBzRm9ybWF0LE09bC50b29sdGlwc01lcmdlLEw9bC50b29sdGlwRm9ybWF0LFU9bC5jbGFzc0xpc3QsTz10KG51bGwpLEQ9dChudWxsKSxqPXQoITEpLEY9cigoKCk9PntsZXQgZT17Y3NzUHJlZml4OlwiXCIsY3NzQ2xhc3NlczpVLnZhbHVlLG9yaWVudGF0aW9uOmMudmFsdWUsZGlyZWN0aW9uOnAudmFsdWUsdG9vbHRpcHM6ISFkLnZhbHVlJiZBLnZhbHVlLGNvbm5lY3Q6XCJsb3dlclwiLHN0YXJ0OnUoay52YWx1ZSk/di52YWx1ZTprLnZhbHVlLHJhbmdlOnttaW46di52YWx1ZSxtYXg6Zy52YWx1ZX19O2lmKG0udmFsdWU+MCYmKGUuc3RlcD1tLnZhbHVlKSxBcnJheS5pc0FycmF5KGsudmFsdWUpJiYoZS5jb25uZWN0PSEwKSxOJiZOLnZhbHVlfHxDJiZPYmplY3Qua2V5cyhDLnZhbHVlKS5sZW5ndGgpe2xldCB0PUFycmF5LmlzQXJyYXkoay52YWx1ZSk/ay52YWx1ZTpbay52YWx1ZV07ZS5oYW5kbGVBdHRyaWJ1dGVzPXQubWFwKChlPT5PYmplY3QuYXNzaWduKHt9LEMudmFsdWUsTiYmTi52YWx1ZT97XCJhcmlhLWxhYmVsbGVkYnlcIjpOLnZhbHVlfTp7fSkpKX1yZXR1cm4gRS52YWx1ZSYmKGUuYXJpYUZvcm1hdD1MLnZhbHVlKSxlfSkpLFQ9cigoKCk9PntsZXQgZT17aWQ6eSYmeS52YWx1ZT95LnZhbHVlOnZvaWQgMH07cmV0dXJuIFMudmFsdWUmJihlLmRpc2FibGVkPSEwKSxlfSkpLHo9cigoKCk9PkFycmF5LmlzQXJyYXkoay52YWx1ZSkpKSxIPSgpPT57bGV0IGU9RC52YWx1ZS5nZXQoKTtyZXR1cm4gQXJyYXkuaXNBcnJheShlKT9lLm1hcCgoZT0+cGFyc2VGbG9hdChlKSkpOnBhcnNlRmxvYXQoZSl9LHE9ZnVuY3Rpb24oZSl7bGV0IHQ9IShhcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSl8fGFyZ3VtZW50c1sxXTtELnZhbHVlLnNldChlLHQpfSxSPWU9PntzLmVtaXQoXCJpbnB1dFwiLGUpLHMuZW1pdChcInVwZGF0ZTptb2RlbFZhbHVlXCIsZSkscy5lbWl0KFwidXBkYXRlXCIsZSl9LEI9KCk9PntELnZhbHVlPWYuY3JlYXRlKE8udmFsdWUsT2JqZWN0LmFzc2lnbih7fSxGLnZhbHVlLHgudmFsdWUpKSxkLnZhbHVlJiZ6LnZhbHVlJiZiLnZhbHVlPj0wJiZNKE8udmFsdWUsYi52YWx1ZSxcIiAtIFwiKSxELnZhbHVlLm9uKFwic2V0XCIsKCgpPT57Y29uc3QgZT1IKCk7cy5lbWl0KFwiY2hhbmdlXCIsZSkscy5lbWl0KFwic2V0XCIsZSksUC52YWx1ZSYmUihlKX0pKSxELnZhbHVlLm9uKFwidXBkYXRlXCIsKCgpPT57aWYoIWoudmFsdWUpcmV0dXJuO2NvbnN0IGU9SCgpO3oudmFsdWUmJmgoay52YWx1ZSxlKXx8IXoudmFsdWUmJmsudmFsdWU9PWU/cy5lbWl0KFwidXBkYXRlXCIsZSk6UC52YWx1ZXx8UihlKX0pKSxELnZhbHVlLm9uKFwic3RhcnRcIiwoKCk9PntzLmVtaXQoXCJzdGFydFwiLEgoKSl9KSksRC52YWx1ZS5vbihcImVuZFwiLCgoKT0+e3MuZW1pdChcImVuZFwiLEgoKSl9KSksRC52YWx1ZS5vbihcInNsaWRlXCIsKCgpPT57cy5lbWl0KFwic2xpZGVcIixIKCkpfSkpLEQudmFsdWUub24oXCJkcmFnXCIsKCgpPT57cy5lbWl0KFwiZHJhZ1wiLEgoKSl9KSksTy52YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtaGFuZGxlXVwiKS5mb3JFYWNoKChlPT57ZS5vbmJsdXI9KCk9PntPLnZhbHVlJiZVLnZhbHVlLmZvY3VzZWQuc3BsaXQoXCIgXCIpLmZvckVhY2goKGU9PntPLnZhbHVlLmNsYXNzTGlzdC5yZW1vdmUoZSl9KSl9LGUub25mb2N1cz0oKT0+e1UudmFsdWUuZm9jdXNlZC5zcGxpdChcIiBcIikuZm9yRWFjaCgoZT0+e08udmFsdWUuY2xhc3NMaXN0LmFkZChlKX0pKX19KSksai52YWx1ZT0hMH0sXz0oKT0+e0QudmFsdWUub2ZmKCksRC52YWx1ZS5kZXN0cm95KCksRC52YWx1ZT1udWxsfSwkPShlLHQpPT57ai52YWx1ZT0hMSxfKCksQigpfTtyZXR1cm4gaShCKSxuKF8pLG8oeiwkLHtpbW1lZGlhdGU6ITF9KSxvKHYsJCx7aW1tZWRpYXRlOiExfSksbyhnLCQse2ltbWVkaWF0ZTohMX0pLG8obSwkLHtpbW1lZGlhdGU6ITF9KSxvKGMsJCx7aW1tZWRpYXRlOiExfSksbyhwLCQse2ltbWVkaWF0ZTohMX0pLG8oZCwkLHtpbW1lZGlhdGU6ITF9KSxvKGIsJCx7aW1tZWRpYXRlOiExfSksbyhFLCQse2ltbWVkaWF0ZTohMSxkZWVwOiEwfSksbyh4LCQse2ltbWVkaWF0ZTohMSxkZWVwOiEwfSksbyh3LCQse2ltbWVkaWF0ZTohMSxkZWVwOiEwfSksbyhrLCgoZSx0KT0+e3QmJihcIm9iamVjdFwiPT10eXBlb2YgdCYmXCJvYmplY3RcIj09dHlwZW9mIGUmJmUmJk9iamVjdC5rZXlzKHQpPk9iamVjdC5rZXlzKGUpfHxcIm9iamVjdFwiPT10eXBlb2YgdCYmXCJvYmplY3RcIiE9dHlwZW9mIGV8fHUoZSkpJiYkKCl9KSx7aW1tZWRpYXRlOiExfSksbyhrLChlPT57aWYodShlKSlyZXR1cm4gdm9pZCBxKHYudmFsdWUsITEpO2xldCB0PUgoKTt6LnZhbHVlJiYhQXJyYXkuaXNBcnJheSh0KSYmKHQ9W3RdKSwoei52YWx1ZSYmIWgoZSx0KXx8IXoudmFsdWUmJmUhPXQpJiZxKGUsITEpfSkse2RlZXA6ITB9KSx7c2xpZGVyOk8sc2xpZGVyJDpELGlzUmFuZ2U6eixzbGlkZXJQcm9wczpULGluaXQ6QixkZXN0cm95Ol8scmVmcmVzaDokLHVwZGF0ZTpxLHJlc2V0OigpPT57UihWLnZhbHVlKX19fShhLHMse3ZhbHVlOmwudmFsdWUsaW5pdGlhbFZhbHVlOmwuaW5pdGlhbFZhbHVlLHRvb2x0aXBGb3JtYXQ6cC50b29sdGlwRm9ybWF0LHRvb2x0aXBzRm9ybWF0OnAudG9vbHRpcHNGb3JtYXQsdG9vbHRpcHNNZXJnZTpwLnRvb2x0aXBzTWVyZ2UsY2xhc3NMaXN0OmMuY2xhc3NMaXN0fSk7cmV0dXJuey4uLmMsLi4ucCwuLi5tfX19O20ucmVuZGVyPWZ1bmN0aW9uKGUsdCxyLGksbixvKXtyZXR1cm4gYSgpLHMoXCJkaXZcIixsKGUuc2xpZGVyUHJvcHMse3JlZjpcInNsaWRlclwifSksbnVsbCwxNil9LG0uX19maWxlPVwic3JjL1NsaWRlci52dWVcIjtleHBvcnR7bSBhcyBkZWZhdWx0fTtcbiIsIjxzY3JpcHQgbGFuZz1cInRzXCIgc2V0dXA+XG5pbXBvcnQgeyBpbmplY3RDc3NUb0RvY3VtZW50IH0gZnJvbSAnQHdpbmR3YWxrZXItaW8vdW5pY29ybi1uZXh0JztcbmltcG9ydCB7IGRlZmluZUFzeW5jQ29tcG9uZW50IH0gZnJvbSAndnVlJztcbmltcG9ydCBjc3MgZnJvbSAnQHZ1ZWZvcm0vc2xpZGVyL3RoZW1lcy9kZWZhdWx0LmNzcz9pbmxpbmUnO1xuaW1wb3J0IFZ1ZVNsaWRlciBmcm9tICdAdnVlZm9ybS9zbGlkZXInO1xuXG5pbmplY3RDc3NUb0RvY3VtZW50KGNzcyk7XG5cbmNvbnN0IHByb3BzID0gd2l0aERlZmF1bHRzKGRlZmluZVByb3BzPHtcbiAgaWQ/OiBzdHJpbmc7XG4gIGRhdGE/OiBhbnlbXTtcbiAgbWluPzogbnVtYmVyO1xuICBtYXg/OiBudW1iZXI7XG4gIHN0ZXA/OiBudW1iZXI7XG4gIGlucHV0V2lkdGg/OiBzdHJpbmc7XG4gIGxhenk/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG59PigpLCB7XG4gIGlucHV0V2lkdGg6ICc1cmVtJyxcbiAgbGF6eTogZmFsc2UsXG4gIGRpc2FibGVkOiBmYWxzZSxcbn0pO1xuXG5jb25zdCB2YWx1ZSA9IGRlZmluZU1vZGVsPG51bWJlciB8IHN0cmluZz4oe1xuICByZXF1aXJlZDogdHJ1ZSxcbn0pO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXJcIj5cbiAgICA8VnVlU2xpZGVyIHYtbW9kZWw9XCJ2YWx1ZVwiIGNsYXNzPVwiZmxleC1ncm93LTFcIlxuICAgICAgOm1heD1cIm1heFwiXG4gICAgICA6bWluPVwibWluXCJcbiAgICAgIDp2LWRhdGE9XCJkYXRhXCJcbiAgICAgIDpzdGVwPVwic3RlcFwiXG4gICAgICBzaG93VG9vbHRpcD1cImRyYWdcIlxuICAgICAgOmxhenlcbiAgICAgIDpkaXNhYmxlZFxuICAgID48L1Z1ZVNsaWRlcj5cbiAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiXG4gICAgICA6aWQ9XCJpZFwiXG4gICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBtcy0yXCJcbiAgICAgIDpzdHlsZT1cInsgd2lkdGg6IGlucHV0V2lkdGggfVwiXG4gICAgICB2LW1vZGVsPVwidmFsdWVcIlxuICAgICAgOnN0ZXA9XCJzdGVwXCJcbiAgICAgIDpkaXNhYmxlZFxuICAgIC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJTeW1ib2wiLCJvYmplY3RQcm90byIsImhhc093blByb3BlcnR5IiwibmF0aXZlT2JqZWN0VG9TdHJpbmciLCJzeW1Ub1N0cmluZ1RhZyIsImZ1bmNUYWciLCJmdW5jUHJvdG8iLCJmdW5jVG9TdHJpbmciLCJNQVhfU0FGRV9JTlRFR0VSIiwiYXJnc1RhZyIsImZyZWVFeHBvcnRzIiwiZnJlZU1vZHVsZSIsIm1vZHVsZUV4cG9ydHMiLCJCdWZmZXIiLCJvYmplY3RUYWciLCJIQVNIX1VOREVGSU5FRCIsImUiLCJ0IiwiciIsImkiLCJuIiwicyIsImwiLCJ1IiwiYyIsInAiLCJkIiwiZiIsImgiLCJtIiwiYSIsIm8iLCJ4IiwidyIsIkUiLCJQIiwiTiIsIkMiLCJrIiwiViIsIkEiLCJNIiwiTCIsIlUiLCJPIiwiaiIsIkYiLCJUIiwieiIsIkgiLCJxIiwiUiIsIkIiLCJfIiwiJCIsIlgiLCJZIiwiSSIsIlciLCJHIiwiSiIsIksiLCJ2IiwiZyIsImIiLCJ5IiwiUyIsIlEiLCJaIiwiZWUiLCJ0ZSIsInJlIiwiaWUiLCJuZSIsImFlIiwic2UiLCJsZSIsIl91c2VNb2RlbCIsIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX2NyZWF0ZVZOb2RlIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9ub3JtYWxpemVTdHlsZSJdLCJtYXBwaW5ncyI6Ijs7QUFDQSxJQUFJLGFBQWEsT0FBTyxVQUFVLFlBQVksVUFBVSxPQUFPLFdBQVcsVUFBVTtBQ0VwRixJQUFJLFdBQVcsT0FBTyxRQUFRLFlBQVksUUFBUSxLQUFLLFdBQVcsVUFBVTtBQUc1RSxJQUFJLE9BQU8sY0FBYyxZQUFZLFNBQVMsYUFBYSxFQUFDO0FDSHpELElBQUNBLFdBQVMsS0FBSztBQ0FsQixJQUFJQyxnQkFBYyxPQUFPO0FBR3pCLElBQUlDLG1CQUFpQkQsY0FBWTtBQU9qQyxJQUFJRSx5QkFBdUJGLGNBQVk7QUFHdkMsSUFBSUcsbUJBQWlCSixXQUFTQSxTQUFPLGNBQWM7QUFTbkQsU0FBUyxVQUFVLE9BQU87QUFDeEIsTUFBSSxRQUFRRSxpQkFBZSxLQUFLLE9BQU9FLGdCQUFjLEdBQ2pELE1BQU0sTUFBTUEsZ0JBQWM7QUFFOUIsTUFBSTtBQUNGLFVBQU1BLGdCQUFjLElBQUk7QUFDeEIsUUFBSSxXQUFXO0FBQUEsRUFDakIsU0FBUyxHQUFHO0FBQUEsRUFBQztBQUViLE1BQUksU0FBU0QsdUJBQXFCLEtBQUssS0FBSztBQUM1QyxNQUFJLFVBQVU7QUFDWixRQUFJLE9BQU87QUFDVCxZQUFNQyxnQkFBYyxJQUFJO0FBQUEsSUFDMUIsT0FBTztBQUNMLGFBQU8sTUFBTUEsZ0JBQWM7QUFBQSxJQUM3QjtBQUFBLEVBQ0Y7QUFDQSxTQUFP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LElBQUM7QUFBQyxhQUFTLEVBQUVELElBQUVDLElBQUVDLElBQUU7QUFBQyxXQUFJRixHQUFFQyxFQUFDLEtBQUdELEdBQUVFLEVBQUMsTUFBSUYsR0FBRUMsRUFBQyxNQUFJRCxHQUFFRSxFQUFDLEVBQUUsT0FBTSxJQUFJLE1BQU1ELEVBQUM7QUFBQSxJQUFDO0FBQUMsYUFBUyxFQUFFRCxJQUFFO0FBQUMsYUFBTSxZQUFVLE9BQU9BLE1BQUcsU0FBU0EsRUFBQztBQUFBLElBQUM7QUFBQyxhQUFTLEVBQUVBLElBQUVDLElBQUU7QUFBQyxhQUFPRCxLQUFFQSxHQUFFLFNBQVEsRUFBRyxNQUFNLEdBQUcsSUFBRyxHQUFHQSxNQUFHQSxLQUFFLEtBQUssTUFBTSxFQUFFQSxHQUFFLENBQUMsSUFBRSxPQUFLQSxHQUFFLENBQUMsSUFBRSxDQUFDQSxHQUFFLENBQUMsSUFBRUMsS0FBRUEsSUFBRyxHQUFHLFNBQVEsRUFBRyxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUUsT0FBS0QsR0FBRSxDQUFDLElBQUUsQ0FBQ0EsR0FBRSxDQUFDLElBQUVDLEtBQUUsQ0FBQ0EsTUFBSyxRQUFRQSxFQUFDO0FBQUEsSUFBQztBQUFDLGFBQVMsRUFBRUQsSUFBRUUsSUFBRUMsSUFBRUMsSUFBRUMsSUFBRUMsSUFBRUMsSUFBRUMsSUFBRUMsSUFBRUMsSUFBRUMsSUFBRUMsSUFBRTtBQUFDLFVBQUlDLElBQUUsR0FBRSxHQUFFLElBQUVELElBQUUsSUFBRSxJQUFHLElBQUU7QUFBRyxhQUFPTixPQUFJTSxLQUFFTixHQUFFTSxFQUFDLElBQUcsQ0FBQyxDQUFDLEVBQUVBLEVBQUMsTUFBSSxVQUFLWixNQUFHLE1BQUksV0FBV1ksR0FBRSxRQUFRWixFQUFDLENBQUMsTUFBSVksS0FBRSxJQUFHQSxLQUFFLE1BQUlDLEtBQUUsTUFBR0QsS0FBRSxLQUFLLElBQUlBLEVBQUMsSUFBRyxVQUFLWixPQUFJWSxLQUFFLEVBQUVBLElBQUVaLEVBQUMsSUFBRyxRQUFNWSxLQUFFQSxHQUFFLFNBQVEsR0FBSSxRQUFRLEdBQUcs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QUFFLEVBQUUsS0FBSyxJQUFFLEVBQUUsUUFBTSxFQUFFLE9BQU0sT0FBTSxFQUFDLEtBQUksRUFBRSxPQUFNLEtBQUksRUFBRSxNQUFLLEVBQUM7QUFBRSxVQUFHRyxHQUFFLFFBQU0sTUFBSSxFQUFFLE9BQUtBLEdBQUUsUUFBTyxNQUFNLFFBQVEsRUFBRSxLQUFLLE1BQUksRUFBRSxVQUFRLE9BQUksS0FBRyxFQUFFLFNBQU8sS0FBRyxPQUFPLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBTztBQUFDLFlBQUksSUFBRSxNQUFNLFFBQVEsRUFBRSxLQUFLLElBQUUsRUFBRSxRQUFNLENBQUMsRUFBRSxLQUFLO0FBQUUsVUFBRSxtQkFBaUIsRUFBRSxLQUFLLENBQUFiLE9BQUcsT0FBTyxPQUFPLENBQUEsR0FBRyxFQUFFLE9BQU0sS0FBRyxFQUFFLFFBQU0sRUFBQyxtQkFBa0IsRUFBRSxNQUFLLElBQUUsQ0FBQSxDQUFFLEVBQUM7QUFBQSxNQUFFO0FBQUMsYUFBTyxFQUFFLFVBQVEsRUFBRSxhQUFXLEVBQUUsUUFBTztBQUFBLElBQUMsRUFBQyxHQUFHLElBQUVFLFVBQUcsTUFBSTtBQUFDLFVBQUksSUFBRSxFQUFDLElBQUcsS0FBRyxFQUFFLFFBQU0sRUFBRSxRQUFNLE9BQU07QUFBRSxhQUFPLEVBQUUsVUFBUSxFQUFFLFdBQVMsT0FBSTtBQUFBLElBQUMsRUFBQyxHQUFHLElBQUVBLFVBQUcsTUFBSSxNQUFNLFFBQVEsRUFBRSxLQUFLLEVBQUMsR0FBRyxJQUFFLE1BQUk7QUFBQyxVQUFJLElBQUUsRUFBRSxNQUFNLElBQUc7QUFBRyxhQUFPLE1BQU0sUUFBUSxDQUFDLElBQUUsRUFBRSxLQUFLLENBQUFGLE9BQUcsV0FBV0EsRUFBQyxFQUFDLElBQUcsV0FBVyxDQUFDO0FBQUEsSUFBQyxHQUFFLElBQUUsU0FBUyxHQUFFO0FBQUMsVUFBSSxJQUFFLEVBQUUsVUFBVSxTQUFPLEtBQUcsV0FBUyxVQUFVLENBQUMsTUFBSSxVQUFVLENBQUM7QUFBRSxRQUFFLE1BQU0sSUFBSSxHQUFFLENBQUM7QUFBQSxJQUFDLEdBQUUsSUFBRSxPQUFHO0FBQUMsTUFBQUssR0FBRSxLQUFLLFNBQVEsQ0FBQyxHQUFFQSxHQUFFLEtBQUsscUJBQW9CLENBQUMsR0FBRUEsR0FBRSxLQUFLLFVBQVMsQ0FBQztBQUFBLElBQUMsR0FBRSxJQUFFLE1BQUk7QUFBQyxRQUFFLFFBQU0sRUFBRSxPQUFPLEVBQUUsT0FBTSxPQUFPLE9BQU8sQ0FBQSxHQUFHLEVBQUUsT0FBTSxFQUFFLEtBQUssQ0FBQyxHQUFFSyxHQUFFLFNBQU8sRUFBRSxTQUFPLEVBQUUsU0FBTyxLQUFHLEVBQUUsRUFBRSxPQUFNLEVBQUUsT0FBTSxLQUFLLEdBQUUsRUFBRSxNQUFNLEdBQUcsUUFBTyxNQUFJO0FBQUMsY0FBTSxJQUFFLEVBQUM7QUFBRyxRQUFBTCxHQUFFLEtBQUssVUFBUyxDQUFDLEdBQUVBLEdBQUUsS0FBSyxPQUFNLENBQUMsR0FBRSxFQUFFLFNBQU8sRUFBRSxDQUFDO0FBQUEsTUFBQyxFQUFDLEdBQUcsRUFBRSxNQUFNLEdBQUcsV0FBVSxNQUFJO0FBQUMsWUFBRyxDQUFDLEVBQUUsTUFBTTtBQUFPLGNBQU0sSUFBRSxFQUFDO0FBQUcsVUFBRSxTQUFPLEVBQUUsRUFBRSxPQUFNLENBQUMsS0FBRyxDQUFDLEVBQUUsU0FBTyxFQUFFLFNBQU8sSUFBRUEsR0FBRSxLQUFLLFVBQVMsQ0FBQyxJQUFFLEVBQUUsU0FBTyxFQUFFLENBQUM7QUFBQSxNQUFDLEVBQUMsR0FBRyxFQUFFLE1BQU0sR0FBRyxVQUFTLE1BQUk7QUFBQyxRQUFBQSxHQUFFLEtBQUssU0FBUSxFQUFDLENBQUU7QUFBQSxNQUFDLEVBQUMsR0FBRyxFQUFFLE1BQU0sR0FBRyxRQUFPLE1BQUk7QUFBQyxRQUFBQSxHQUFFLEtBQUssT0FBTSxFQUFDLENBQUU7QUFBQSxNQUFDLEVBQUMsR0FBRyxFQUFFLE1BQU0sR0FBRyxVQUFTLE1BQUk7QUFBQyxRQUFBQSxHQUFFLEtBQUssU0FBUSxFQUFDLENBQUU7QUFBQSxNQUFDLEtBQUksRUFBRSxNQUFNLEdBQUcsU0FBUSxNQUFJO0FBQUMsUUFBQUEsR0FBRSxLQUFLLFFBQU8sRUFBQyxDQUFFO0FBQUEsTUFBQyxFQUFDLEdBQUcsRUFBRSxNQUFNLGlCQUFpQixlQUFlLEVBQUUsU0FBUyxPQUFHO0FBQUMsVUFBRSxTQUFPLE1BQUk7QUFBQyxZQUFFLFNBQU8sRUFBRSxNQUFNLFFBQVEsTUFBTSxHQUFHLEVBQUUsU0FBUyxDQUFBTCxPQUFHO0FBQUMsY0FBRSxNQUFNLFVBQVUsT0FBT0EsRUFBQztBQUFBLFVBQUMsRUFBQztBQUFBLFFBQUUsR0FBRSxFQUFFLFVBQVEsTUFBSTtBQUFDLFlBQUUsTUFBTSxRQUFRLE1BQU0sR0FBRyxFQUFFLFNBQVMsQ0FBQUEsT0FBRztBQUFDLGNBQUUsTUFBTSxVQUFVLElBQUlBLEVBQUM7QUFBQSxVQUFDLEVBQUM7QUFBQSxRQUFFO0FBQUEsTUFBQyxFQUFDLEdBQUcsRUFBRSxRQUFNO0FBQUEsSUFBRSxHQUFFLElBQUUsTUFBSTtBQUFDLFFBQUUsTUFBTSxJQUFHLEdBQUcsRUFBRSxNQUFNLFFBQU8sR0FBRyxFQUFFLFFBQU07QUFBQSxJQUFJLEdBQUUsSUFBRSxDQUFDLEdBQUUsTUFBSTtBQUFDLFFBQUUsUUFBTSxPQUFHLEVBQUMsR0FBRyxFQUFDO0FBQUEsSUFBRTtBQUFFLFdBQU9HLFVBQUUsQ0FBQyxHQUFFQyxZQUFFLENBQUMsR0FBRVcsTUFBRSxHQUFFLEdBQUUsRUFBQyxXQUFVLE1BQUUsQ0FBQyxHQUFFQSxNQUFFLEdBQUUsR0FBRSxFQUFDLFdBQVUsTUFBRSxDQUFDLEdBQUVBLE1BQUUsR0FBRSxHQUFFLEVBQUMsV0FBVSxNQUFFLENBQUMsR0FBRUEsTUFBRUYsSUFBRSxHQUFFLEVBQUMsV0FBVSxNQUFFLENBQUMsR0FBRUUsTUFBRVAsSUFBRSxHQUFFLEVBQUMsV0FBVSxNQUFFLENBQUMsR0FBRU8sTUFBRU4sSUFBRSxHQUFFLEVBQUMsV0FBVSxNQUFFLENBQUMsR0FBRU0sTUFBRUwsSUFBRSxHQUFFLEVBQUMsV0FBVSxNQUFFLENBQUMsR0FBRUssTUFBRSxHQUFFLEdBQUUsRUFBQyxXQUFVLE1BQUUsQ0FBQyxHQUFFQSxNQUFFLEdBQUUsR0FBRSxFQUFDLFdBQVUsT0FBRyxNQUFLLEtBQUUsQ0FBQyxHQUFFQSxNQUFFLEdBQUUsR0FBRSxFQUFDLFdBQVUsT0FBRyxNQUFLLEtBQUUsQ0FBQyxHQUFFQSxNQUFFLEdBQUUsR0FBRSxFQUFDLFdBQVUsT0FBRyxNQUFLLEtBQUUsQ0FBQyxHQUFFQSxNQUFFLElBQUcsQ0FBQyxHQUFFLE1BQUk7QUFBQyxZQUFJLFlBQVUsT0FBTyxLQUFHLFlBQVUsT0FBTyxLQUFHLEtBQUcsT0FBTyxLQUFLLENBQUMsSUFBRSxPQUFPLEtBQUssQ0FBQyxLQUFHLFlBQVUsT0FBTyxLQUFHLFlBQVUsT0FBTyxLQUFHLEVBQUUsQ0FBQyxNQUFJLEVBQUM7QUFBQSxJQUFFLElBQUcsRUFBQyxXQUFVLE1BQUUsQ0FBQyxHQUFFQSxNQUFFLElBQUcsT0FBRztBQUFDLFVBQUcsRUFBRSxDQUFDLEVBQUUsUUFBTyxLQUFLLEVBQUUsRUFBRSxPQUFNLEtBQUU7QUFBRSxVQUFJLElBQUUsRUFBQztBQUFHLFFBQUUsU0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDLE1BQUksSUFBRSxDQUFDLENBQUMsS0FBSSxFQUFFLFNBQU8sQ0FBQyxFQUFFLEdBQUUsQ0FBQyxLQUFHLENBQUMsRUFBRSxTQUFPLEtBQUcsTUFBSSxFQUFFLEdBQUUsS0FBRTtBQUFBLElBQUMsSUFBRyxFQUFDLE1BQUssS0FBRSxDQUFDLEdBQUUsRUFBQyxRQUFPLEdBQUUsU0FBUSxHQUFFLFNBQVEsR0FBRSxhQUFZLEdBQUUsTUFBSyxHQUFFLFNBQVEsR0FBRSxTQUFRLEdBQUUsUUFBTyxHQUFFLE9BQU0sTUFBSTtBQUFDLFFBQUUsRUFBRSxLQUFLO0FBQUEsSUFBQyxFQUFDO0FBQUEsRUFBQyxHQUFFLEdBQUUsR0FBRSxFQUFDLE9BQU0sRUFBRSxPQUFNLGNBQWEsRUFBRSxjQUFhLGVBQWNOLEdBQUUsZUFBYyxnQkFBZUEsR0FBRSxnQkFBZSxlQUFjQSxHQUFFLGVBQWMsV0FBVUQsR0FBRSxVQUFTLENBQUM7QUFBRSxTQUFNLEVBQUMsR0FBR0EsSUFBRSxHQUFHQyxJQUFFLEdBQUdJLEdBQUM7QUFBQyxFQUFDO0FBQUUsRUFBRSxTQUFPLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxTQUFPQyxhQUFJVCxtQkFBRSxPQUFNQyxXQUFFLEVBQUUsYUFBWSxFQUFDLEtBQUksU0FBUSxDQUFDLEdBQUUsTUFBSyxFQUFFO0FBQUMsR0FBRSxFQUFFLFNBQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ003MXBDLHdCQUFvQixHQUFHO0FBRXZCLFVBQU0sUUFBUTtBQWVkLFVBQU0sUUFBUXVELDhCQUViOzs7Ozs7OztBQUlNLE1BQUEsYUFBQSxFQUFBLE9BQU0sNEJBQUE7OztBQUFYLFNBQUFDLFVBQUEsR0FBQUMsbUJBa0JNLE9BbEJOLFlBa0JNO0FBQUEsSUFqQkpDLFlBUWEsT0FBQSxXQUFBLEdBQUE7QUFBQSxNQUFBLFlBUk8sT0FBQTtBQUFBLE1BQUEsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBLE9BQUEsUUFBSztBQUFBLE1BQUUsT0FBTTtBQUFBLE1BQzlCLEtBQUssT0FBQTtBQUFBLE1BQ0wsS0FBSyxPQUFBO0FBQUEsTUFDTCxVQUFRLE9BQUE7QUFBQSxNQUNSLE1BQU0sT0FBQTtBQUFBLE1BQ1AsYUFBWTtBQUFBLE1BQ1gsTUFBQSxPQUFBO0FBQUEsTUFDQSxVQUFBLE9BQUE7QUFBQSxJQUFBLEdBQUEsTUFBQSxHQUFBLENBQUEsY0FBQSxPQUFBLE9BQUEsVUFBQSxRQUFBLFFBQUEsVUFBQSxDQUFBO0FBQUE7bUJBRUhDLG1CQU9FLFNBQUE7QUFBQSxNQVBLLE1BQUs7QUFBQSxNQUNULElBQUksT0FBQTtBQUFBLE1BQ0wsT0FBTTtBQUFBLE1BQ0wsT0FBS0Msd0JBQVcsT0FBQSxXQUFBLENBQVU7QUFBQSxNQUFBLHVCQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsV0FDbEIsT0FBQSxRQUFLO0FBQUEsTUFDYixNQUFNLE9BQUE7QUFBQSxNQUNOLFVBQUEsT0FBQTtBQUFBLElBQUEsR0FBQSxNQUFBLElBQUEsVUFBQSxHQUFBO0FBQUEsbUJBRlEsT0FBQSxLQUFLO0FBQUEsSUFBQSxDQUFBO0FBQUE7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNCwxNSwxNiwxNywxOCwxOSwyMCwyMSwyMiwyMywyNCwyNSwyNiwyNywyOCwyOSwzMCwzMSwzMiwzMywzNCwzNSwzNiwzNywzOCwzOSw0MCw0MSw0Miw0Myw0NCw0NSw0Niw0Nyw0OCw0OSw1MCw1MSw1Miw1Myw1NCw1NSw1Niw1Nyw1OCw1OSw2MCw2MSw2Miw2Myw2NCw2NSw2Niw2Nyw2OCw2OSw3MCw3MSw3Miw3Myw3NCw3NSw3Niw3Nyw3OCw3OSw4MCw4MSw4Miw4Myw4NCw4NSw4Niw4Nyw4OCw4OSw5MCw5MSw5Miw5Myw5NCw5NSw5Niw5Nyw5OCw5OV19
