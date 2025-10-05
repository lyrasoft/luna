function getData(element, name) {
  prepareData(element);
  if (name === void 0) {
    return element.__unicorn;
  }
  return element.__unicorn[name];
}
function setData(element, name, value) {
  prepareData(element);
  element.__unicorn[name] = value;
}
function prepareData(element) {
  if (!element) {
    return element;
  }
  element.__unicorn = element.__unicorn || {};
  return element;
}
function data(ele, name, value) {
  if (!(ele instanceof HTMLElement)) {
    value = name;
    name = ele;
    ele = document;
  }
  if (name === void 0) {
    return getData(ele);
  }
  if (value === void 0) {
    return getData(ele, name);
  }
  setData(ele, name, value);
}
function route(route2, query) {
  const source = route2;
  const extract = extractRoute(source);
  route2 = extract.route;
  let path = extract.path;
  const routes = data("unicorn.routes") || {};
  let url = routes[route2];
  if (url == null) {
    if (!route2.startsWith("@")) {
      route2 = "@" + route2;
    } else {
      route2 = route2.substring(1);
    }
  }
  url = routes[route2];
  if (url == null) {
    throw new Error(`Route: "${source}" not found`);
  }
  if (path) {
    const { route: u1, path: u1q } = extractRoute(url, "?");
    const { route: u2, path: u2q } = extractRoute(path, "?");
    url = u1 + "/" + u2;
    if (u1q || u2q) {
      const q = [u1q, u2q].filter((u) => u).join("&");
      url += "?" + q;
    }
  }
  return addQuery(url);
}
function extractRoute(route2, sep = "/") {
  if (route2.indexOf(sep) === -1) {
    return { route: route2, path: "" };
  }
  const segments = route2.split(sep);
  route2 = segments.shift() || "";
  const path = segments.join(sep);
  return { route: route2, path };
}
function addQuery(url, query) {
  {
    return url;
  }
}
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const { iterator, toStringTag } = Symbol;
const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction$1 = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(toStringTag in val) && !(iterator in val);
};
const isEmptyObject = (val) => {
  if (!isObject(val) || isBuffer(val)) {
    return false;
  }
  try {
    return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
  } catch (e) {
    return false;
  }
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject(val) && isFunction$1(val.pipe);
const isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction$1(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    if (isBuffer(obj)) {
      return;
    }
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  if (isBuffer(obj)) {
    return null;
  }
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless, skipUndefined } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else if (!skipUndefined || !isUndefined(val)) {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}
const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction$1(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];
  const _iterator = generator.call(obj);
  let result;
  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction$1(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction$1(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction$1(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
const toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (isBuffer(source)) {
        return source;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({ source, data: data2 }) => {
      if (source === _global && data2 === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === "function",
  isFunction$1(_global.postMessage)
);
const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
const isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);
const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isEmptyObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction: isFunction$1,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable
};
function AxiosError$1(message, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}
utils$1.inherits(AxiosError$1, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const prototype$1 = AxiosError$1.prototype;
const descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError$1, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError$1.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils$1.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  const msg = error && error.message ? error.message : "Error";
  const errCode = code == null && error ? error.code : code;
  AxiosError$1.call(axiosError, msg, errCode, config, request, response);
  if (error && axiosError.cause == null) {
    Object.defineProperty(axiosError, "cause", { value: error, configurable: true });
  }
  axiosError.name = error && error.name || "Error";
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
const httpAdapter = null;
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData$1(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils$1.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils$1.isDate(value)) {
      return value.toISOString();
    }
    if (utils$1.isBoolean(value)) {
      return value.toString();
    }
    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils$1.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData,
        el,
        utils$1.isString(key) ? key.trim() : key,
        path,
        exposedHelpers
      );
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData$1(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode;
  if (utils$1.isFunction(options)) {
    options = {
      serialize: options
    };
  }
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
const _navigator = typeof navigator === "object" && navigator || void 0;
const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const origin = hasBrowserEnv && window.location.href || "http://localhost";
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data2, options) {
  return toFormData$1(data2, new platform.classes.URLSearchParams(), {
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    },
    ...options
  });
}
function parsePropPath(name) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest(data2, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils$1.isObject(data2);
    if (isObjectPayload && utils$1.isHTMLForm(data2)) {
      data2 = new FormData(data2);
    }
    const isFormData2 = utils$1.isFormData(data2);
    if (isFormData2) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data2)) : data2;
    }
    if (utils$1.isArrayBuffer(data2) || utils$1.isBuffer(data2) || utils$1.isStream(data2) || utils$1.isFile(data2) || utils$1.isBlob(data2) || utils$1.isReadableStream(data2)) {
      return data2;
    }
    if (utils$1.isArrayBufferView(data2)) {
      return data2.buffer;
    }
    if (utils$1.isURLSearchParams(data2)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data2.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data2, this.formSerializer).toString();
      }
      if ((isFileList2 = utils$1.isFileList(data2)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData$1(
          isFileList2 ? { "files[]": data2 } : data2,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data2);
    }
    return data2;
  }],
  transformResponse: [function transformResponse(data2) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils$1.isResponse(data2) || utils$1.isReadableStream(data2)) {
      return data2;
    }
    if (data2 && utils$1.isString(data2) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data2, this.parseReviver);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data2;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
const ignoreDuplicateOf = utils$1.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$1.isString(value)) return;
  if (utils$1.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
let AxiosHeaders$1 = class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
      let obj = {}, dest, key;
      for (const entry of header) {
        if (!utils$1.isArray(entry)) {
          throw TypeError("Object iterator must return a key-value pair");
        }
        obj[key = entry[0]] = (dest = obj[key]) ? utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
      }
      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders$1.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders$1);
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data2 = context.data;
  utils$1.forEach(fns, function transform(fn) {
    data2 = fn.call(config, data2, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data2;
}
function isCancel$1(value) {
  return !!(value && value.__CANCEL__);
}
function CanceledError$1(message, config, request) {
  AxiosError$1.call(this, message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config, request);
  this.name = "CanceledError";
}
utils$1.inherits(CanceledError$1, AxiosError$1, {
  __CANCEL__: true
});
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$1(
      "Request failed with status code " + response.status,
      [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
}
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn(...args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data2 = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data2);
  }, freq);
};
const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};
const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
  url = new URL(url, platform.origin);
  return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + "=" + encodeURIComponent(value)];
      utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
      utils$1.isString(path) && cookie.push("path=" + path);
      utils$1.isString(domain) && cookie.push("domain=" + domain);
      secure === true && cookie.push("secure");
      document.cookie = cookie.join("; ");
    },
    read(name) {
      const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
function mergeConfig$1(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, prop, caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a, prop, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
  };
  utils$1.forEach(Object.keys({ ...config1, ...config2 }), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
const resolveConfig = (config) => {
  const newConfig = mergeConfig$1({}, config);
  let { data: data2, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders$1.from(headers);
  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);
  if (auth) {
    headers.set(
      "Authorization",
      "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
    );
  }
  if (utils$1.isFormData(data2)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if (utils$1.isFunction(data2.getHeaders)) {
      const formHeaders = data2.getHeaders();
      const allowedHeaders = ["content-type", "content-length"];
      Object.entries(formHeaders).forEach(([key, val]) => {
        if (allowedHeaders.includes(key.toLowerCase())) {
          headers.set(key, val);
        }
      });
    }
  }
  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders$1.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError(event) {
      const msg = event && event.message ? event.message : "Network Error";
      const err = new AxiosError$1(msg, AxiosError$1.ERR_NETWORK, config, request);
      err.event = event || null;
      reject(err);
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError$1(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
        config,
        request
      ));
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError$1("Unsupported protocol " + protocol + ":", AxiosError$1.ERR_BAD_REQUEST, config));
      return;
    }
    request.send(requestData || null);
  });
};
const composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils$1.asap(unsubscribe);
    return signal;
  }
};
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes(stream, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done: done2, value } = await iterator2.next();
        if (done2) {
          _onFinish();
          controller.close();
          return;
        }
        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator2.return();
    }
  }, {
    highWaterMark: 2
  });
};
const DEFAULT_CHUNK_SIZE = 64 * 1024;
const { isFunction } = utils$1;
const globalFetchAPI = (({ Request, Response }) => ({
  Request,
  Response
}))(utils$1.global);
const {
  ReadableStream: ReadableStream$1,
  TextEncoder
} = utils$1.global;
const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
const factory = (env) => {
  env = utils$1.merge.call({
    skipUndefined: true
  }, globalFetchAPI, env);
  const { fetch: envFetch, Request, Response } = env;
  const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === "function";
  const isRequestSupported = isFunction(Request);
  const isResponseSupported = isFunction(Response);
  if (!isFetchSupported) {
    return false;
  }
  const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream$1);
  const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
  const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
    let duplexAccessed = false;
    const hasContentType = new Request(platform.origin, {
      body: new ReadableStream$1(),
      method: "POST",
      get duplex() {
        duplexAccessed = true;
        return "half";
      }
    }).headers.has("Content-Type");
    return duplexAccessed && !hasContentType;
  });
  const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };
  isFetchSupported && (() => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
      !resolvers[type] && (resolvers[type] = (res, config) => {
        let method = res && res[type];
        if (method) {
          return method.call(res);
        }
        throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
      });
    });
  })();
  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }
    if (utils$1.isBlob(body)) {
      return body.size;
    }
    if (utils$1.isSpecCompliantForm(body)) {
      const _request = new Request(platform.origin, {
        method: "POST",
        body
      });
      return (await _request.arrayBuffer()).byteLength;
    }
    if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
      return body.byteLength;
    }
    if (utils$1.isURLSearchParams(body)) {
      body = body + "";
    }
    if (utils$1.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };
  const resolveBodyLength = async (headers, body) => {
    const length = utils$1.toFiniteNumber(headers.getContentLength());
    return length == null ? getBodyLength(body) : length;
  };
  return async (config) => {
    let {
      url,
      method,
      data: data2,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = "same-origin",
      fetchOptions
    } = resolveConfig(config);
    let _fetch = envFetch || fetch;
    responseType = responseType ? (responseType + "").toLowerCase() : "text";
    let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
    let request = null;
    const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
      composedSignal.unsubscribe();
    });
    let requestContentLength;
    try {
      if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data2)) !== 0) {
        let _request = new Request(url, {
          method: "POST",
          body: data2,
          duplex: "half"
        });
        let contentTypeHeader;
        if (utils$1.isFormData(data2) && (contentTypeHeader = _request.headers.get("content-type"))) {
          headers.setContentType(contentTypeHeader);
        }
        if (_request.body) {
          const [onProgress, flush] = progressEventDecorator(
            requestContentLength,
            progressEventReducer(asyncDecorator(onUploadProgress))
          );
          data2 = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
        }
      }
      if (!utils$1.isString(withCredentials)) {
        withCredentials = withCredentials ? "include" : "omit";
      }
      const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
      const resolvedOptions = {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data2,
        duplex: "half",
        credentials: isCredentialsSupported ? withCredentials : void 0
      };
      request = isRequestSupported && new Request(url, resolvedOptions);
      let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url, resolvedOptions));
      const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
      if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
        const options = {};
        ["status", "statusText", "headers"].forEach((prop) => {
          options[prop] = response[prop];
        });
        const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
        const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
          responseContentLength,
          progressEventReducer(asyncDecorator(onDownloadProgress), true)
        ) || [];
        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
            flush && flush();
            unsubscribe && unsubscribe();
          }),
          options
        );
      }
      responseType = responseType || "text";
      let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config);
      !isStreamResponse && unsubscribe && unsubscribe();
      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders$1.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      });
    } catch (err) {
      unsubscribe && unsubscribe();
      if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request),
          {
            cause: err.cause || err
          }
        );
      }
      throw AxiosError$1.from(err, err && err.code, config, request);
    }
  };
};
const seedCache = /* @__PURE__ */ new Map();
const getFetch = (config) => {
  let env = config ? config.env : {};
  const { fetch: fetch2, Request, Response } = env;
  const seeds = [
    Request,
    Response,
    fetch2
  ];
  let len = seeds.length, i = len, seed, target, map = seedCache;
  while (i--) {
    seed = seeds[i];
    target = map.get(seed);
    target === void 0 && map.set(seed, target = i ? /* @__PURE__ */ new Map() : factory(env));
    map = target;
  }
  return target;
};
getFetch();
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: {
    get: getFetch
  }
};
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
const adapters = {
  getAdapter: (adapters2, config) => {
    adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
    const { length } = adapters2;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters2[i];
      let id;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
        if (adapter === void 0) {
          throw new AxiosError$1(`Unknown adapter '${id}'`);
        }
      }
      if (adapter && (utils$1.isFunction(adapter) || (adapter = adapter.get(config)))) {
        break;
      }
      rejectedReasons[id || "#" + i] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
      );
      let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError$1(
        `There is no suitable adapter to dispatch the request ` + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return adapter;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders$1.from(config.headers);
  config.data = transformData.call(
    config,
    config.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults.adapter, config);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders$1.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel$1(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
const VERSION$1 = "1.12.2";
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError$1(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError$1.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError$1("option " + opt + " must be " + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
let Axios$1 = class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig$1(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    if (config.allowAbsoluteUrls !== void 0) ;
    else if (this.defaults.allowAbsoluteUrls !== void 0) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }
    validator.assertOptions(config, {
      baseUrl: validators.spelling("baseURL"),
      withXsrfToken: validators.spelling("withXSRFToken")
    }, true);
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config.method]
    );
    headers && utils$1.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers[method];
      }
    );
    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift(...requestInterceptorChain);
      chain.push(...responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig$1(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios$1.prototype[method] = function(url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data2, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data: data2
      }));
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
let CancelToken$1 = class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError$1(message, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
};
function spread$1(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError$1(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode$1 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
  HttpStatusCode$1[value] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);
  utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios = createInstance(defaults);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError$1;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData$1;
axios.AxiosError = AxiosError$1;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread$1;
axios.isAxiosError = isAxiosError$1;
axios.mergeConfig = mergeConfig$1;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const {
  Axios: Axios2,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken: CancelToken2,
  VERSION,
  all: all2,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders: AxiosHeaders2,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig
} = axios;
function encodeReserved(str) {
  return str.split(/(%[0-9A-Fa-f]{2})/g).map(function(part) {
    if (!/%[0-9A-Fa-f]/.test(part)) {
      part = encodeURI(part).replace(/%5B/g, "[").replace(/%5D/g, "]");
    }
    return part;
  }).join("");
}
function encodeUnreserved(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
function encodeValue(operator, value, key) {
  value = operator === "+" || operator === "#" ? encodeReserved(value) : encodeUnreserved(value);
  if (key) {
    return encodeUnreserved(key) + "=" + value;
  } else {
    return value;
  }
}
function isDefined(value) {
  return value !== void 0 && value !== null;
}
function isKeyOperator(operator) {
  return operator === ";" || operator === "&" || operator === "?";
}
function getValues(context, operator, key, modifier) {
  var value = context[key], result = [];
  if (isDefined(value) && value !== "") {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      value = value.toString();
      if (modifier && modifier !== "*") {
        value = value.substring(0, parseInt(modifier, 10));
      }
      result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
    } else {
      if (modifier === "*") {
        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function(value2) {
            result.push(encodeValue(operator, value2, isKeyOperator(operator) ? key : null));
          });
        } else {
          Object.keys(value).forEach(function(k) {
            if (isDefined(value[k])) {
              result.push(encodeValue(operator, value[k], k));
            }
          });
        }
      } else {
        var tmp = [];
        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function(value2) {
            tmp.push(encodeValue(operator, value2));
          });
        } else {
          Object.keys(value).forEach(function(k) {
            if (isDefined(value[k])) {
              tmp.push(encodeUnreserved(k));
              tmp.push(encodeValue(operator, value[k].toString()));
            }
          });
        }
        if (isKeyOperator(operator)) {
          result.push(encodeUnreserved(key) + "=" + tmp.join(","));
        } else if (tmp.length !== 0) {
          result.push(tmp.join(","));
        }
      }
    }
  } else {
    if (operator === ";") {
      if (isDefined(value)) {
        result.push(encodeUnreserved(key));
      }
    } else if (value === "" && (operator === "&" || operator === "?")) {
      result.push(encodeUnreserved(key) + "=");
    } else if (value === "") {
      result.push("");
    }
  }
  return result;
}
function parseTemplate(template) {
  var operators = ["+", "#", ".", "/", ";", "?", "&"];
  return {
    expand: function(context) {
      return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function(_, expression, literal) {
        if (expression) {
          var operator = null, values = [];
          if (operators.indexOf(expression.charAt(0)) !== -1) {
            operator = expression.charAt(0);
            expression = expression.substr(1);
          }
          expression.split(/,/g).forEach(function(variable) {
            var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
            values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
          });
          if (operator && operator !== "+") {
            var separator = ",";
            if (operator === "?") {
              separator = "&";
            } else if (operator !== "#") {
              separator = operator;
            }
            return (values.length !== 0 ? operator : "") + values.join(separator);
          } else {
            return values.join(",");
          }
        } else {
          return encodeReserved(literal);
        }
      });
    }
  };
}
function prepareAxios(axios2) {
  axios2.interceptors.request.use((config) => {
    config.headers["X-CSRF-Token"] = data("csrf-token");
    if (config.url && config.url.startsWith("@")) {
      config.url = route(config.url);
    }
    if (config?.vars && config.url) {
      const tmpl = parseTemplate(config.url);
      config.url = tmpl.expand(config.vars || {});
    }
    if (config.methodSimulate) {
      if (config.methodSimulateByHeader) {
        config.headers["X-HTTP-Method-Override"] = config;
      } else if (typeof config.data === "object") {
        config.data["_method"] = config.method;
      } else if (typeof config.data === "string") {
        if (config.data.includes("?")) {
          config.data += "&_method=" + config.method;
        } else {
          config.data += "?_method=" + config.method;
        }
      }
      if (config.method?.toLowerCase() !== "get") {
        config.method = "POST";
      }
    }
    return config;
  });
  return axios2;
}
function createHttpClient(config) {
  const axios$1 = config && "interceptors" in config ? config : axios.create(config ?? {});
  prepareAxios(axios$1);
  function requestMiddleware(callback) {
    return axios$1.interceptors.request.use(callback);
  }
  function responseMiddleware(callback) {
    return axios$1.interceptors.response.use(callback);
  }
  async function get(url, options2 = {}) {
    options2.url = url;
    options2.method = "GET";
    return request(options2);
  }
  async function post(url, data2, options2 = {}) {
    options2.url = url;
    options2.method = "POST";
    options2.data = data2;
    return request(options2);
  }
  async function put(url, data2, options2 = {}) {
    options2.url = url;
    options2.method = "PUT";
    options2.data = data2;
    return request(options2);
  }
  async function patch(url, data2, options2 = {}) {
    options2.url = url;
    options2.method = "PATCH";
    options2.data = data2;
    return request(options2);
  }
  async function deletes(url, data2, options2 = {}) {
    options2.url = url;
    options2.method = "DELETE";
    options2.data = data2;
    return request(options2);
  }
  async function head(url, options2 = {}) {
    options2.url = url;
    options2.method = "HEAD";
    return request(options2);
  }
  async function options(url, options2 = {}) {
    options2.url = url;
    options2.method = "OPTIONS";
    return request(options2);
  }
  async function request(options2) {
    try {
      return await axios$1(options2);
    } catch (e) {
      e.originMessage = e.message;
      const err = e;
      if (err.response?.data?.message) {
        err.message = err.response.data.message;
      }
      throw err;
    }
  }
  return {
    axios: axios$1,
    request,
    get,
    post,
    put,
    patch,
    delete: deletes,
    head,
    options,
    requestMiddleware,
    responseMiddleware,
    isCancel,
    AxiosError,
    isAxiosError
  };
}
export {
  createHttpClient
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jbGllbnQuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3dpbmR3YWxrZXIvdW5pY29ybi9hc3NldHMvc3JjL3V0aWxpdGllcy9kYXRhLnRzIiwiLi4vLi4vLi4vLi4vLi4vd2luZHdhbGtlci91bmljb3JuL2Fzc2V0cy9zcmMvZGF0YS50cyIsIi4uLy4uLy4uLy4uLy4uL3dpbmR3YWxrZXIvdW5pY29ybi9hc3NldHMvc3JjL3NlcnZpY2Uvcm91dGVyLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zRXJyb3IuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbnVsbC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90b0Zvcm1EYXRhLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2NsYXNzZXMvVVJMU2VhcmNoUGFyYW1zLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2NsYXNzZXMvRm9ybURhdGEuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9CbG9iLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9jb21tb24vdXRpbHMuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvVVJMRW5jb2RlZEZvcm0uanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvZm9ybURhdGFUb0pTT04uanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvc0hlYWRlcnMuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VQcm90b2NvbC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcGVlZG9tZXRlci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90aHJvdHRsZS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2J1aWxkRnVsbFBhdGguanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbXBvc2VTaWduYWxzLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RyYWNrU3RyZWFtLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy9mZXRjaC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMvYWRhcHRlcnMuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9lbnYvZGF0YS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy92YWxpZGF0b3IuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBeGlvc0Vycm9yLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL0h0dHBTdGF0dXNDb2RlLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy91cmwtdGVtcGxhdGUvbGliL3VybC10ZW1wbGF0ZS5qcyIsIi4uLy4uLy4uLy4uLy4uL3dpbmR3YWxrZXIvdW5pY29ybi9hc3NldHMvc3JjL21vZHVsZS9odHRwLWNsaWVudC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRhKGVsZW1lbnQ6IEVsZW1lbnQsIG5hbWU/OiBzdHJpbmcpIHtcbiAgcHJlcGFyZURhdGEoZWxlbWVudCk7XG5cbiAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBlbGVtZW50Ll9fdW5pY29ybjtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50Ll9fdW5pY29ybltuYW1lXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldERhdGEoZWxlbWVudDogRWxlbWVudCwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gIHByZXBhcmVEYXRhKGVsZW1lbnQpO1xuICBlbGVtZW50Ll9fdW5pY29ybltuYW1lXSA9IHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmRGF0YShlbGVtZW50OiBFbGVtZW50LCBuYW1lOiBzdHJpbmcsIGRlZkNhbGxiYWNrOiBGdW5jdGlvbikge1xuICBwcmVwYXJlRGF0YShlbGVtZW50KTtcbiAgZWxlbWVudC5fX3VuaWNvcm5bbmFtZV0gPSBlbGVtZW50Ll9fdW5pY29ybltuYW1lXSB8fCBkZWZDYWxsYmFjayhlbGVtZW50KTtcblxuICByZXR1cm4gZWxlbWVudC5fX3VuaWNvcm5bbmFtZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVEYXRhKGVsZW1lbnQ6IEVsZW1lbnQsIG5hbWU6IHN0cmluZykge1xuICBwcmVwYXJlRGF0YShlbGVtZW50KTtcblxuICBjb25zdCB2ID0gZWxlbWVudC5fX3VuaWNvcm5bbmFtZV07XG4gIGRlbGV0ZSBlbGVtZW50Ll9fdW5pY29ybltuYW1lXTtcblxuICByZXR1cm4gdjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZXBhcmVEYXRhPFQgZXh0ZW5kcyBOb2RlPihlbGVtZW50OiBUKTogVCB7XG4gIGlmICghZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgZWxlbWVudC5fX3VuaWNvcm4gPSBlbGVtZW50Ll9fdW5pY29ybiB8fCB7fTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIE5vZGUge1xuICAgIF9fdW5pY29ybj86IGFueTtcbiAgfVxufVxuXG5cbiIsImltcG9ydCB7IGdldERhdGEsIHJlbW92ZURhdGEgYXMgcm1kYXRhLCBzZXREYXRhIH0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGF0YShuYW1lOiBzdHJpbmcsIGRhdGE/OiBhbnkpOiBhbnk7XG5leHBvcnQgZnVuY3Rpb24gZGF0YTxUID0gdm9pZCwgUiA9IFtUXSBleHRlbmRzIFt2b2lkXSA/IGFueSA6IFQgfCB1bmRlZmluZWQ+KG5hbWU6IHN0cmluZyk6IFI7XG5leHBvcnQgZnVuY3Rpb24gZGF0YTxUID0gdm9pZCwgUiA9IFtUXSBleHRlbmRzIFt2b2lkXSA/IGFueSA6IFQgfCB1bmRlZmluZWQ+KGVsZTogRWxlbWVudCwgbmFtZTogc3RyaW5nKTogUjtcbmV4cG9ydCBmdW5jdGlvbiBkYXRhKGVsZTogRWxlbWVudCwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogYW55O1xuZXhwb3J0IGZ1bmN0aW9uIGRhdGEoZWxlOiBFbGVtZW50IHwgc3RyaW5nLCBuYW1lPzogYW55LCB2YWx1ZT86IGFueSkge1xuICBpZiAoIShlbGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICB2YWx1ZSA9IG5hbWU7XG4gICAgbmFtZSA9IGVsZTtcbiAgICBlbGUgPSBkb2N1bWVudCBhcyBhbnkgYXMgRWxlbWVudDtcbiAgfVxuXG4gIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZ2V0RGF0YShlbGUpO1xuICB9XG5cbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZ2V0RGF0YShlbGUsIG5hbWUpO1xuICB9XG5cbiAgc2V0RGF0YShlbGUsIG5hbWUsIHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZURhdGEobmFtZTogc3RyaW5nKTogYW55O1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZURhdGEoZWxlOiBFbGVtZW50LCBuYW1lOiBzdHJpbmcpOiBhbnk7XG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRGF0YShlbGU6IEVsZW1lbnR8c3RyaW5nLCBuYW1lOiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgaWYgKCEoZWxlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgbmFtZSA9IGVsZTtcbiAgICBlbGUgPSBkb2N1bWVudCBhcyBhbnkgYXMgRWxlbWVudDtcbiAgfVxuXG4gIHJtZGF0YShlbGUsIG5hbWUpO1xufVxuIiwiXG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnLi4vZGF0YSc7XG5pbXBvcnQgeyBkZWNvZGUsIGVuY29kZSB9IGZyb20gJ3Fzcyc7XG5cbi8qKlxuICogQWRkIGEgcm91dGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRSb3V0ZShyb3V0ZTogc3RyaW5nLCB1cmw6IHN0cmluZykge1xuICBjb25zdCByb3V0ZXMgPSBkYXRhKCd1bmljb3JuLnJvdXRlcycpIHx8IHt9O1xuICByb3V0ZXNbcm91dGVdID0gdXJsO1xuXG4gIGRhdGEoJ3VuaWNvcm4ucm91dGVzJywgcm91dGVzKTtcbn1cblxuLyoqXG4gKiBHZXQgcm91dGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3V0ZShyb3V0ZTogc3RyaW5nLCBxdWVyeT86IFJlY29yZDxzdHJpbmcsIGFueT4pOiBzdHJpbmcge1xuICBjb25zdCBzb3VyY2UgPSByb3V0ZTtcbiAgY29uc3QgZXh0cmFjdCA9IGV4dHJhY3RSb3V0ZShzb3VyY2UpO1xuICByb3V0ZSA9IGV4dHJhY3Qucm91dGU7XG4gIGxldCBwYXRoID0gZXh0cmFjdC5wYXRoO1xuICBjb25zdCByb3V0ZXMgPSBkYXRhKCd1bmljb3JuLnJvdXRlcycpIHx8IHt9O1xuXG4gIGxldCB1cmwgPSByb3V0ZXNbcm91dGVdO1xuXG4gIGlmICh1cmwgPT0gbnVsbCkge1xuICAgIGlmICghcm91dGUuc3RhcnRzV2l0aCgnQCcpKSB7XG4gICAgICByb3V0ZSA9ICdAJyArIHJvdXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICByb3V0ZSA9IHJvdXRlLnN1YnN0cmluZygxKTtcbiAgICB9XG4gIH1cblxuICB1cmwgPSByb3V0ZXNbcm91dGVdO1xuXG4gIGlmICh1cmwgPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgUm91dGU6IFwiJHtzb3VyY2V9XCIgbm90IGZvdW5kYCk7XG4gIH1cblxuICAvLyBNZXJnZSBxdWVyeVxuICBpZiAocGF0aCkge1xuICAgIGNvbnN0IHsgcm91dGU6IHUxLCBwYXRoOiB1MXEgfSA9IGV4dHJhY3RSb3V0ZSh1cmwsICc/Jyk7XG4gICAgY29uc3QgeyByb3V0ZTogdTIsIHBhdGg6IHUycSB9ID0gZXh0cmFjdFJvdXRlKHBhdGgsICc/Jyk7XG5cbiAgICB1cmwgPSB1MSArICcvJyArIHUyO1xuXG4gICAgaWYgKHUxcSB8fCB1MnEpIHtcbiAgICAgIGNvbnN0IHEgPSBbIHUxcSwgdTJxIF0uZmlsdGVyKHUgPT4gdSkuam9pbignJicpO1xuICAgICAgdXJsICs9ICc/JyArIHE7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFkZFF1ZXJ5KHVybCwgcXVlcnkpO1xufVxuXG5mdW5jdGlvbiBleHRyYWN0Um91dGUocm91dGU6IHN0cmluZywgc2VwOiBzdHJpbmcgPSAnLycpOiB7IHBhdGg6IHN0cmluZzsgcm91dGU6IHN0cmluZyB9IHtcbiAgaWYgKHJvdXRlLmluZGV4T2Yoc2VwKSA9PT0gLTEpIHtcbiAgICByZXR1cm4geyByb3V0ZSwgcGF0aDogJycgfVxuICB9XG5cbiAgY29uc3Qgc2VnbWVudHMgPSByb3V0ZS5zcGxpdChzZXApO1xuXG4gIHJvdXRlID0gc2VnbWVudHMuc2hpZnQoKSB8fCAnJztcbiAgY29uc3QgcGF0aCA9IHNlZ21lbnRzLmpvaW4oc2VwKTtcblxuICByZXR1cm4geyByb3V0ZSwgcGF0aCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzUm91dGUocm91dGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gdW5kZWZpbmVkICE9PSBkYXRhKCd1bmljb3JuLnJvdXRlcycpW3JvdXRlXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFF1ZXJ5KHVybDogc3RyaW5nLCBxdWVyeT86IFJlY29yZDxzdHJpbmcsIGFueT4pOiBzdHJpbmcge1xuICBpZiAocXVlcnkgPT0gbnVsbCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICBmb3IgKGxldCBrIGluIHF1ZXJ5KSB7XG4gICAgY29uc3QgdiA9IHF1ZXJ5W2tdO1xuXG4gICAgY29uc3QgcGxhY2Vob2xkZXIgPSBgeyR7a319YDtcblxuICAgIGlmICh1cmwuaW5kZXhPZihwbGFjZWhvbGRlcikgIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwucmVwbGFjZShcbiAgICAgICAgbmV3IFJlZ0V4cChgJHtwbGFjZWhvbGRlcn1gLCAnZycpLFxuICAgICAgICB2XG4gICAgICApO1xuICAgICAgZGVsZXRlIHF1ZXJ5W2tdO1xuICAgIH1cblxuICAgIGNvbnN0IGVuY29kZWRQbGFjZWhvbGRlciA9IGVuY29kZVVSSUNvbXBvbmVudChgeyR7a319YCk7XG5cbiAgICBpZiAodXJsLmluZGV4T2YoZW5jb2RlZFBsYWNlaG9sZGVyKSAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5yZXBsYWNlKFxuICAgICAgICBuZXcgUmVnRXhwKGAke2VuY29kZWRQbGFjZWhvbGRlcn1gLCAnZycpLFxuICAgICAgICB2XG4gICAgICApO1xuICAgICAgZGVsZXRlIHF1ZXJ5W2tdO1xuICAgIH1cbiAgfVxuXG4gIGlmIChPYmplY3Qua2V5cyhxdWVyeSkubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIGNvbnN0IHF1ZXJ5U3RyaW5nID0gZW5jb2RlKHF1ZXJ5KTtcblxuICByZXR1cm4gdXJsICsgKC9cXD8vLnRlc3QodXJsKSA/IGAmJHtxdWVyeVN0cmluZ31gIDogYD8ke3F1ZXJ5U3RyaW5nfWApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VRdWVyeTxUID0gUmVjb3JkPHN0cmluZywgYW55Pj4ocXVlcnlTdHJpbmc6IHN0cmluZyk6IFQge1xuICByZXR1cm4gZGVjb2RlKHF1ZXJ5U3RyaW5nKSBhcyBUO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRRdWVyeShxdWVyeTogUmVjb3JkPHN0cmluZywgYW55Pik6IHN0cmluZyB7XG4gIHJldHVybiBlbmNvZGUocXVlcnkpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbmNvbnN0IHt0b1N0cmluZ30gPSBPYmplY3QucHJvdG90eXBlO1xuY29uc3Qge2dldFByb3RvdHlwZU9mfSA9IE9iamVjdDtcbmNvbnN0IHtpdGVyYXRvciwgdG9TdHJpbmdUYWd9ID0gU3ltYm9sO1xuXG5jb25zdCBraW5kT2YgPSAoY2FjaGUgPT4gdGhpbmcgPT4ge1xuICAgIGNvbnN0IHN0ciA9IHRvU3RyaW5nLmNhbGwodGhpbmcpO1xuICAgIHJldHVybiBjYWNoZVtzdHJdIHx8IChjYWNoZVtzdHJdID0gc3RyLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpKTtcbn0pKE9iamVjdC5jcmVhdGUobnVsbCkpO1xuXG5jb25zdCBraW5kT2ZUZXN0ID0gKHR5cGUpID0+IHtcbiAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuICh0aGluZykgPT4ga2luZE9mKHRoaW5nKSA9PT0gdHlwZVxufVxuXG5jb25zdCB0eXBlT2ZUZXN0ID0gdHlwZSA9PiB0aGluZyA9PiB0eXBlb2YgdGhpbmcgPT09IHR5cGU7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCB7aXNBcnJheX0gPSBBcnJheTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1VuZGVmaW5lZCA9IHR5cGVPZlRlc3QoJ3VuZGVmaW5lZCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKVxuICAgICYmIGlzRnVuY3Rpb24odmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKSAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0FycmF5QnVmZmVyID0ga2luZE9mVGVzdCgnQXJyYXlCdWZmZXInKTtcblxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIGxldCByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKGlzQXJyYXlCdWZmZXIodmFsLmJ1ZmZlcikpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJpbmcgPSB0eXBlT2ZUZXN0KCdzdHJpbmcnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Z1bmN0aW9uID0gdHlwZU9mVGVzdCgnZnVuY3Rpb24nKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc051bWJlciA9IHR5cGVPZlRlc3QoJ251bWJlcicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc09iamVjdCA9ICh0aGluZykgPT4gdGhpbmcgIT09IG51bGwgJiYgdHlwZW9mIHRoaW5nID09PSAnb2JqZWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJvb2xlYW5cbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJvb2xlYW4sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jvb2xlYW4gPSB0aGluZyA9PiB0aGluZyA9PT0gdHJ1ZSB8fCB0aGluZyA9PT0gZmFsc2U7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNQbGFpbk9iamVjdCA9ICh2YWwpID0+IHtcbiAgaWYgKGtpbmRPZih2YWwpICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKHZhbCk7XG4gIHJldHVybiAocHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZSB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG90eXBlKSA9PT0gbnVsbCkgJiYgISh0b1N0cmluZ1RhZyBpbiB2YWwpICYmICEoaXRlcmF0b3IgaW4gdmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBlbXB0eSBvYmplY3QgKHNhZmVseSBoYW5kbGVzIEJ1ZmZlcnMpXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBlbXB0eSBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0VtcHR5T2JqZWN0ID0gKHZhbCkgPT4ge1xuICAvLyBFYXJseSByZXR1cm4gZm9yIG5vbi1vYmplY3RzIG9yIEJ1ZmZlcnMgdG8gcHJldmVudCBSYW5nZUVycm9yXG4gIGlmICghaXNPYmplY3QodmFsKSB8fCBpc0J1ZmZlcih2YWwpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsKS5sZW5ndGggPT09IDAgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbCkgPT09IE9iamVjdC5wcm90b3R5cGU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBGYWxsYmFjayBmb3IgYW55IG90aGVyIG9iamVjdHMgdGhhdCBtaWdodCBjYXVzZSBSYW5nZUVycm9yIHdpdGggT2JqZWN0LmtleXMoKVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNEYXRlID0ga2luZE9mVGVzdCgnRGF0ZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlID0ga2luZE9mVGVzdCgnRmlsZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNCbG9iID0ga2luZE9mVGVzdCgnQmxvYicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZUxpc3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRmlsZUxpc3QgPSBraW5kT2ZUZXN0KCdGaWxlTGlzdCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyZWFtID0gKHZhbCkgPT4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGb3JtRGF0YSA9ICh0aGluZykgPT4ge1xuICBsZXQga2luZDtcbiAgcmV0dXJuIHRoaW5nICYmIChcbiAgICAodHlwZW9mIEZvcm1EYXRhID09PSAnZnVuY3Rpb24nICYmIHRoaW5nIGluc3RhbmNlb2YgRm9ybURhdGEpIHx8IChcbiAgICAgIGlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSAmJiAoXG4gICAgICAgIChraW5kID0ga2luZE9mKHRoaW5nKSkgPT09ICdmb3JtZGF0YScgfHxcbiAgICAgICAgLy8gZGV0ZWN0IGZvcm0tZGF0YSBpbnN0YW5jZVxuICAgICAgICAoa2luZCA9PT0gJ29iamVjdCcgJiYgaXNGdW5jdGlvbih0aGluZy50b1N0cmluZykgJiYgdGhpbmcudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgRm9ybURhdGFdJylcbiAgICAgIClcbiAgICApXG4gIClcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVVJMU2VhcmNoUGFyYW1zID0ga2luZE9mVGVzdCgnVVJMU2VhcmNoUGFyYW1zJyk7XG5cbmNvbnN0IFtpc1JlYWRhYmxlU3RyZWFtLCBpc1JlcXVlc3QsIGlzUmVzcG9uc2UsIGlzSGVhZGVyc10gPSBbJ1JlYWRhYmxlU3RyZWFtJywgJ1JlcXVlc3QnLCAnUmVzcG9uc2UnLCAnSGVhZGVycyddLm1hcChraW5kT2ZUZXN0KTtcblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICpcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuY29uc3QgdHJpbSA9IChzdHIpID0+IHN0ci50cmltID9cbiAgc3RyLnRyaW0oKSA6IHN0ci5yZXBsYWNlKC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZywgJycpO1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbYWxsT3duS2V5cyA9IGZhbHNlXVxuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuLCB7YWxsT3duS2V5cyA9IGZhbHNlfSA9IHt9KSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGk7XG4gIGxldCBsO1xuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yIChpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBCdWZmZXIgY2hlY2tcbiAgICBpZiAoaXNCdWZmZXIob2JqKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGNvbnN0IGtleXMgPSBhbGxPd25LZXlzID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKSA6IE9iamVjdC5rZXlzKG9iaik7XG4gICAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGtleTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZEtleShvYmosIGtleSkge1xuICBpZiAoaXNCdWZmZXIob2JqKSl7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBrZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIGxldCBfa2V5O1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIF9rZXkgPSBrZXlzW2ldO1xuICAgIGlmIChrZXkgPT09IF9rZXkudG9Mb3dlckNhc2UoKSkge1xuICAgICAgcmV0dXJuIF9rZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5jb25zdCBfZ2xvYmFsID0gKCgpID0+IHtcbiAgLyplc2xpbnQgbm8tdW5kZWY6MCovXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbFRoaXM7XG4gIHJldHVybiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpXG59KSgpO1xuXG5jb25zdCBpc0NvbnRleHREZWZpbmVkID0gKGNvbnRleHQpID0+ICFpc1VuZGVmaW5lZChjb250ZXh0KSAmJiBjb250ZXh0ICE9PSBfZ2xvYmFsO1xuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIGNvbnN0IHtjYXNlbGVzcywgc2tpcFVuZGVmaW5lZH0gPSBpc0NvbnRleHREZWZpbmVkKHRoaXMpICYmIHRoaXMgfHwge307XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBjb25zdCBhc3NpZ25WYWx1ZSA9ICh2YWwsIGtleSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldEtleSA9IGNhc2VsZXNzICYmIGZpbmRLZXkocmVzdWx0LCBrZXkpIHx8IGtleTtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRbdGFyZ2V0S2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHJlc3VsdFt0YXJnZXRLZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSBpZiAoIXNraXBVbmRlZmluZWQgfHwgIWlzVW5kZWZpbmVkKHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGFyZ3VtZW50c1tpXSAmJiBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxPd25LZXlzXVxuICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5jb25zdCBleHRlbmQgPSAoYSwgYiwgdGhpc0FyZywge2FsbE93bktleXN9PSB7fSkgPT4ge1xuICBmb3JFYWNoKGIsICh2YWwsIGtleSkgPT4ge1xuICAgIGlmICh0aGlzQXJnICYmIGlzRnVuY3Rpb24odmFsKSkge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9LCB7YWxsT3duS2V5c30pO1xuICByZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNvbnRlbnQgdmFsdWUgd2l0aG91dCBCT01cbiAqL1xuY29uc3Qgc3RyaXBCT00gPSAoY29udGVudCkgPT4ge1xuICBpZiAoY29udGVudC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICBjb250ZW50ID0gY29udGVudC5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gY29udGVudDtcbn1cblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge29iamVjdH0gW3Byb3BzXVxuICogQHBhcmFtIHtvYmplY3R9IFtkZXNjcmlwdG9yc11cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgaW5oZXJpdHMgPSAoY29uc3RydWN0b3IsIHN1cGVyQ29uc3RydWN0b3IsIHByb3BzLCBkZXNjcmlwdG9ycykgPT4ge1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlLCBkZXNjcmlwdG9ycyk7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29uc3RydWN0b3IsICdzdXBlcicsIHtcbiAgICB2YWx1ZTogc3VwZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGVcbiAgfSk7XG4gIHByb3BzICYmIE9iamVjdC5hc3NpZ24oY29uc3RydWN0b3IucHJvdG90eXBlLCBwcm9wcyk7XG59XG5cbi8qKlxuICogUmVzb2x2ZSBvYmplY3Qgd2l0aCBkZWVwIHByb3RvdHlwZSBjaGFpbiB0byBhIGZsYXQgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlT2JqIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGVzdE9ial1cbiAqIEBwYXJhbSB7RnVuY3Rpb258Qm9vbGVhbn0gW2ZpbHRlcl1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9wRmlsdGVyXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmNvbnN0IHRvRmxhdE9iamVjdCA9IChzb3VyY2VPYmosIGRlc3RPYmosIGZpbHRlciwgcHJvcEZpbHRlcikgPT4ge1xuICBsZXQgcHJvcHM7XG4gIGxldCBpO1xuICBsZXQgcHJvcDtcbiAgY29uc3QgbWVyZ2VkID0ge307XG5cbiAgZGVzdE9iaiA9IGRlc3RPYmogfHwge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBpZiAoc291cmNlT2JqID09IG51bGwpIHJldHVybiBkZXN0T2JqO1xuXG4gIGRvIHtcbiAgICBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZU9iaik7XG4gICAgaSA9IHByb3BzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgaWYgKCghcHJvcEZpbHRlciB8fCBwcm9wRmlsdGVyKHByb3AsIHNvdXJjZU9iaiwgZGVzdE9iaikpICYmICFtZXJnZWRbcHJvcF0pIHtcbiAgICAgICAgZGVzdE9ialtwcm9wXSA9IHNvdXJjZU9ialtwcm9wXTtcbiAgICAgICAgbWVyZ2VkW3Byb3BdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc291cmNlT2JqID0gZmlsdGVyICE9PSBmYWxzZSAmJiBnZXRQcm90b3R5cGVPZihzb3VyY2VPYmopO1xuICB9IHdoaWxlIChzb3VyY2VPYmogJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHNvdXJjZU9iaiwgZGVzdE9iaikpICYmIHNvdXJjZU9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSk7XG5cbiAgcmV0dXJuIGRlc3RPYmo7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgc3RyaW5nIGVuZHMgd2l0aCB0aGUgY2hhcmFjdGVycyBvZiBhIHNwZWNpZmllZCBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gW3Bvc2l0aW9uPSAwXVxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBlbmRzV2l0aCA9IChzdHIsIHNlYXJjaFN0cmluZywgcG9zaXRpb24pID0+IHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHBvc2l0aW9uID4gc3RyLmxlbmd0aCkge1xuICAgIHBvc2l0aW9uID0gc3RyLmxlbmd0aDtcbiAgfVxuICBwb3NpdGlvbiAtPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICBjb25zdCBsYXN0SW5kZXggPSBzdHIuaW5kZXhPZihzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKTtcbiAgcmV0dXJuIGxhc3RJbmRleCAhPT0gLTEgJiYgbGFzdEluZGV4ID09PSBwb3NpdGlvbjtcbn1cblxuXG4vKipcbiAqIFJldHVybnMgbmV3IGFycmF5IGZyb20gYXJyYXkgbGlrZSBvYmplY3Qgb3IgbnVsbCBpZiBmYWlsZWRcbiAqXG4gKiBAcGFyYW0geyp9IFt0aGluZ11cbiAqXG4gKiBAcmV0dXJucyB7P0FycmF5fVxuICovXG5jb25zdCB0b0FycmF5ID0gKHRoaW5nKSA9PiB7XG4gIGlmICghdGhpbmcpIHJldHVybiBudWxsO1xuICBpZiAoaXNBcnJheSh0aGluZykpIHJldHVybiB0aGluZztcbiAgbGV0IGkgPSB0aGluZy5sZW5ndGg7XG4gIGlmICghaXNOdW1iZXIoaSkpIHJldHVybiBudWxsO1xuICBjb25zdCBhcnIgPSBuZXcgQXJyYXkoaSk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgYXJyW2ldID0gdGhpbmdbaV07XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cblxuLyoqXG4gKiBDaGVja2luZyBpZiB0aGUgVWludDhBcnJheSBleGlzdHMgYW5kIGlmIGl0IGRvZXMsIGl0IHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNoZWNrcyBpZiB0aGVcbiAqIHRoaW5nIHBhc3NlZCBpbiBpcyBhbiBpbnN0YW5jZSBvZiBVaW50OEFycmF5XG4gKlxuICogQHBhcmFtIHtUeXBlZEFycmF5fVxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbmNvbnN0IGlzVHlwZWRBcnJheSA9IChUeXBlZEFycmF5ID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuIHRoaW5nID0+IHtcbiAgICByZXR1cm4gVHlwZWRBcnJheSAmJiB0aGluZyBpbnN0YW5jZW9mIFR5cGVkQXJyYXk7XG4gIH07XG59KSh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2V0UHJvdG90eXBlT2YoVWludDhBcnJheSkpO1xuXG4vKipcbiAqIEZvciBlYWNoIGVudHJ5IGluIHRoZSBvYmplY3QsIGNhbGwgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGtleSBhbmQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3Q8YW55LCBhbnk+fSBvYmogLSBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggZW50cnkuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGZvckVhY2hFbnRyeSA9IChvYmosIGZuKSA9PiB7XG4gIGNvbnN0IGdlbmVyYXRvciA9IG9iaiAmJiBvYmpbaXRlcmF0b3JdO1xuXG4gIGNvbnN0IF9pdGVyYXRvciA9IGdlbmVyYXRvci5jYWxsKG9iaik7XG5cbiAgbGV0IHJlc3VsdDtcblxuICB3aGlsZSAoKHJlc3VsdCA9IF9pdGVyYXRvci5uZXh0KCkpICYmICFyZXN1bHQuZG9uZSkge1xuICAgIGNvbnN0IHBhaXIgPSByZXN1bHQudmFsdWU7XG4gICAgZm4uY2FsbChvYmosIHBhaXJbMF0sIHBhaXJbMV0pO1xuICB9XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gYW5kIGEgc3RyaW5nLCBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIG1hdGNoZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVnRXhwIC0gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBhZ2FpbnN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gc2VhcmNoLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheTxib29sZWFuPn1cbiAqL1xuY29uc3QgbWF0Y2hBbGwgPSAocmVnRXhwLCBzdHIpID0+IHtcbiAgbGV0IG1hdGNoZXM7XG4gIGNvbnN0IGFyciA9IFtdO1xuXG4gIHdoaWxlICgobWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHN0cikpICE9PSBudWxsKSB7XG4gICAgYXJyLnB1c2gobWF0Y2hlcyk7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufVxuXG4vKiBDaGVja2luZyBpZiB0aGUga2luZE9mVGVzdCBmdW5jdGlvbiByZXR1cm5zIHRydWUgd2hlbiBwYXNzZWQgYW4gSFRNTEZvcm1FbGVtZW50LiAqL1xuY29uc3QgaXNIVE1MRm9ybSA9IGtpbmRPZlRlc3QoJ0hUTUxGb3JtRWxlbWVudCcpO1xuXG5jb25zdCB0b0NhbWVsQ2FzZSA9IHN0ciA9PiB7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLV9cXHNdKFthLXpcXGRdKShcXHcqKS9nLFxuICAgIGZ1bmN0aW9uIHJlcGxhY2VyKG0sIHAxLCBwMikge1xuICAgICAgcmV0dXJuIHAxLnRvVXBwZXJDYXNlKCkgKyBwMjtcbiAgICB9XG4gICk7XG59O1xuXG4vKiBDcmVhdGluZyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBjaGVjayBpZiBhbiBvYmplY3QgaGFzIGEgcHJvcGVydHkuICovXG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9ICgoe2hhc093blByb3BlcnR5fSkgPT4gKG9iaiwgcHJvcCkgPT4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKShPYmplY3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVnRXhwID0ga2luZE9mVGVzdCgnUmVnRXhwJyk7XG5cbmNvbnN0IHJlZHVjZURlc2NyaXB0b3JzID0gKG9iaiwgcmVkdWNlcikgPT4ge1xuICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaik7XG4gIGNvbnN0IHJlZHVjZWREZXNjcmlwdG9ycyA9IHt9O1xuXG4gIGZvckVhY2goZGVzY3JpcHRvcnMsIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgbGV0IHJldDtcbiAgICBpZiAoKHJldCA9IHJlZHVjZXIoZGVzY3JpcHRvciwgbmFtZSwgb2JqKSkgIT09IGZhbHNlKSB7XG4gICAgICByZWR1Y2VkRGVzY3JpcHRvcnNbbmFtZV0gPSByZXQgfHwgZGVzY3JpcHRvcjtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iaiwgcmVkdWNlZERlc2NyaXB0b3JzKTtcbn1cblxuLyoqXG4gKiBNYWtlcyBhbGwgbWV0aG9kcyByZWFkLW9ubHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqL1xuXG5jb25zdCBmcmVlemVNZXRob2RzID0gKG9iaikgPT4ge1xuICByZWR1Y2VEZXNjcmlwdG9ycyhvYmosIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgLy8gc2tpcCByZXN0cmljdGVkIHByb3BzIGluIHN0cmljdCBtb2RlXG4gICAgaWYgKGlzRnVuY3Rpb24ob2JqKSAmJiBbJ2FyZ3VtZW50cycsICdjYWxsZXInLCAnY2FsbGVlJ10uaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IG9ialtuYW1lXTtcblxuICAgIGlmICghaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybjtcblxuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGZhbHNlO1xuXG4gICAgaWYgKCd3cml0YWJsZScgaW4gZGVzY3JpcHRvcikge1xuICAgICAgZGVzY3JpcHRvci53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZGVzY3JpcHRvci5zZXQpIHtcbiAgICAgIGRlc2NyaXB0b3Iuc2V0ID0gKCkgPT4ge1xuICAgICAgICB0aHJvdyBFcnJvcignQ2FuIG5vdCByZXdyaXRlIHJlYWQtb25seSBtZXRob2QgXFwnJyArIG5hbWUgKyAnXFwnJyk7XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59XG5cbmNvbnN0IHRvT2JqZWN0U2V0ID0gKGFycmF5T3JTdHJpbmcsIGRlbGltaXRlcikgPT4ge1xuICBjb25zdCBvYmogPSB7fTtcblxuICBjb25zdCBkZWZpbmUgPSAoYXJyKSA9PiB7XG4gICAgYXJyLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgb2JqW3ZhbHVlXSA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBpc0FycmF5KGFycmF5T3JTdHJpbmcpID8gZGVmaW5lKGFycmF5T3JTdHJpbmcpIDogZGVmaW5lKFN0cmluZyhhcnJheU9yU3RyaW5nKS5zcGxpdChkZWxpbWl0ZXIpKTtcblxuICByZXR1cm4gb2JqO1xufVxuXG5jb25zdCBub29wID0gKCkgPT4ge31cblxuY29uc3QgdG9GaW5pdGVOdW1iZXIgPSAodmFsdWUsIGRlZmF1bHRWYWx1ZSkgPT4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUgPSArdmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG59XG5cblxuXG4vKipcbiAqIElmIHRoZSB0aGluZyBpcyBhIEZvcm1EYXRhIG9iamVjdCwgcmV0dXJuIHRydWUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSB0aGluZyAtIFRoZSB0aGluZyB0byBjaGVjay5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNTcGVjQ29tcGxpYW50Rm9ybSh0aGluZykge1xuICByZXR1cm4gISEodGhpbmcgJiYgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIHRoaW5nW3RvU3RyaW5nVGFnXSA9PT0gJ0Zvcm1EYXRhJyAmJiB0aGluZ1tpdGVyYXRvcl0pO1xufVxuXG5jb25zdCB0b0pTT05PYmplY3QgPSAob2JqKSA9PiB7XG4gIGNvbnN0IHN0YWNrID0gbmV3IEFycmF5KDEwKTtcblxuICBjb25zdCB2aXNpdCA9IChzb3VyY2UsIGkpID0+IHtcblxuICAgIGlmIChpc09iamVjdChzb3VyY2UpKSB7XG4gICAgICBpZiAoc3RhY2suaW5kZXhPZihzb3VyY2UpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvL0J1ZmZlciBjaGVja1xuICAgICAgaWYgKGlzQnVmZmVyKHNvdXJjZSkpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgIH1cblxuICAgICAgaWYoISgndG9KU09OJyBpbiBzb3VyY2UpKSB7XG4gICAgICAgIHN0YWNrW2ldID0gc291cmNlO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBpc0FycmF5KHNvdXJjZSkgPyBbXSA6IHt9O1xuXG4gICAgICAgIGZvckVhY2goc291cmNlLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlZHVjZWRWYWx1ZSA9IHZpc2l0KHZhbHVlLCBpICsgMSk7XG4gICAgICAgICAgIWlzVW5kZWZpbmVkKHJlZHVjZWRWYWx1ZSkgJiYgKHRhcmdldFtrZXldID0gcmVkdWNlZFZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3RhY2tbaV0gPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgcmV0dXJuIHZpc2l0KG9iaiwgMCk7XG59XG5cbmNvbnN0IGlzQXN5bmNGbiA9IGtpbmRPZlRlc3QoJ0FzeW5jRnVuY3Rpb24nKTtcblxuY29uc3QgaXNUaGVuYWJsZSA9ICh0aGluZykgPT5cbiAgdGhpbmcgJiYgKGlzT2JqZWN0KHRoaW5nKSB8fCBpc0Z1bmN0aW9uKHRoaW5nKSkgJiYgaXNGdW5jdGlvbih0aGluZy50aGVuKSAmJiBpc0Z1bmN0aW9uKHRoaW5nLmNhdGNoKTtcblxuLy8gb3JpZ2luYWwgY29kZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL0RpZ2l0YWxCcmFpbkpTL0F4aW9zUHJvbWlzZS9ibG9iLzE2ZGVhYjEzNzEwZWMwOTc3OTkyMjEzMWYzZmE1OTU0MzIwZjgzYWIvbGliL3V0aWxzLmpzI0wxMS1MMzRcblxuY29uc3QgX3NldEltbWVkaWF0ZSA9ICgoc2V0SW1tZWRpYXRlU3VwcG9ydGVkLCBwb3N0TWVzc2FnZVN1cHBvcnRlZCkgPT4ge1xuICBpZiAoc2V0SW1tZWRpYXRlU3VwcG9ydGVkKSB7XG4gICAgcmV0dXJuIHNldEltbWVkaWF0ZTtcbiAgfVxuXG4gIHJldHVybiBwb3N0TWVzc2FnZVN1cHBvcnRlZCA/ICgodG9rZW4sIGNhbGxiYWNrcykgPT4ge1xuICAgIF9nbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgKHtzb3VyY2UsIGRhdGF9KSA9PiB7XG4gICAgICBpZiAoc291cmNlID09PSBfZ2xvYmFsICYmIGRhdGEgPT09IHRva2VuKSB7XG4gICAgICAgIGNhbGxiYWNrcy5sZW5ndGggJiYgY2FsbGJhY2tzLnNoaWZ0KCkoKTtcbiAgICAgIH1cbiAgICB9LCBmYWxzZSk7XG5cbiAgICByZXR1cm4gKGNiKSA9PiB7XG4gICAgICBjYWxsYmFja3MucHVzaChjYik7XG4gICAgICBfZ2xvYmFsLnBvc3RNZXNzYWdlKHRva2VuLCBcIipcIik7XG4gICAgfVxuICB9KShgYXhpb3NAJHtNYXRoLnJhbmRvbSgpfWAsIFtdKSA6IChjYikgPT4gc2V0VGltZW91dChjYik7XG59KShcbiAgdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJyxcbiAgaXNGdW5jdGlvbihfZ2xvYmFsLnBvc3RNZXNzYWdlKVxuKTtcblxuY29uc3QgYXNhcCA9IHR5cGVvZiBxdWV1ZU1pY3JvdGFzayAhPT0gJ3VuZGVmaW5lZCcgP1xuICBxdWV1ZU1pY3JvdGFzay5iaW5kKF9nbG9iYWwpIDogKCB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5uZXh0VGljayB8fCBfc2V0SW1tZWRpYXRlKTtcblxuLy8gKioqKioqKioqKioqKioqKioqKioqXG5cblxuY29uc3QgaXNJdGVyYWJsZSA9ICh0aGluZykgPT4gdGhpbmcgIT0gbnVsbCAmJiBpc0Z1bmN0aW9uKHRoaW5nW2l0ZXJhdG9yXSk7XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nLFxuICBpc051bWJlcixcbiAgaXNCb29sZWFuLFxuICBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdCxcbiAgaXNFbXB0eU9iamVjdCxcbiAgaXNSZWFkYWJsZVN0cmVhbSxcbiAgaXNSZXF1ZXN0LFxuICBpc1Jlc3BvbnNlLFxuICBpc0hlYWRlcnMsXG4gIGlzVW5kZWZpbmVkLFxuICBpc0RhdGUsXG4gIGlzRmlsZSxcbiAgaXNCbG9iLFxuICBpc1JlZ0V4cCxcbiAgaXNGdW5jdGlvbixcbiAgaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1R5cGVkQXJyYXksXG4gIGlzRmlsZUxpc3QsXG4gIGZvckVhY2gsXG4gIG1lcmdlLFxuICBleHRlbmQsXG4gIHRyaW0sXG4gIHN0cmlwQk9NLFxuICBpbmhlcml0cyxcbiAgdG9GbGF0T2JqZWN0LFxuICBraW5kT2YsXG4gIGtpbmRPZlRlc3QsXG4gIGVuZHNXaXRoLFxuICB0b0FycmF5LFxuICBmb3JFYWNoRW50cnksXG4gIG1hdGNoQWxsLFxuICBpc0hUTUxGb3JtLFxuICBoYXNPd25Qcm9wZXJ0eSxcbiAgaGFzT3duUHJvcDogaGFzT3duUHJvcGVydHksIC8vIGFuIGFsaWFzIHRvIGF2b2lkIEVTTGludCBuby1wcm90b3R5cGUtYnVpbHRpbnMgZGV0ZWN0aW9uXG4gIHJlZHVjZURlc2NyaXB0b3JzLFxuICBmcmVlemVNZXRob2RzLFxuICB0b09iamVjdFNldCxcbiAgdG9DYW1lbENhc2UsXG4gIG5vb3AsXG4gIHRvRmluaXRlTnVtYmVyLFxuICBmaW5kS2V5LFxuICBnbG9iYWw6IF9nbG9iYWwsXG4gIGlzQ29udGV4dERlZmluZWQsXG4gIGlzU3BlY0NvbXBsaWFudEZvcm0sXG4gIHRvSlNPTk9iamVjdCxcbiAgaXNBc3luY0ZuLFxuICBpc1RoZW5hYmxlLFxuICBzZXRJbW1lZGlhdGU6IF9zZXRJbW1lZGlhdGUsXG4gIGFzYXAsXG4gIGlzSXRlcmFibGVcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnXSBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBBeGlvc0Vycm9yKG1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgRXJyb3IuY2FsbCh0aGlzKTtcblxuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnN0YWNrID0gKG5ldyBFcnJvcigpKS5zdGFjaztcbiAgfVxuXG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIHRoaXMubmFtZSA9ICdBeGlvc0Vycm9yJztcbiAgY29kZSAmJiAodGhpcy5jb2RlID0gY29kZSk7XG4gIGNvbmZpZyAmJiAodGhpcy5jb25maWcgPSBjb25maWcpO1xuICByZXF1ZXN0ICYmICh0aGlzLnJlcXVlc3QgPSByZXF1ZXN0KTtcbiAgaWYgKHJlc3BvbnNlKSB7XG4gICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgIHRoaXMuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzID8gcmVzcG9uc2Uuc3RhdHVzIDogbnVsbDtcbiAgfVxufVxuXG51dGlscy5pbmhlcml0cyhBeGlvc0Vycm9yLCBFcnJvciwge1xuICB0b0pTT046IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB1dGlscy50b0pTT05PYmplY3QodGhpcy5jb25maWcpLFxuICAgICAgY29kZTogdGhpcy5jb2RlLFxuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1c1xuICAgIH07XG4gIH1cbn0pO1xuXG5jb25zdCBwcm90b3R5cGUgPSBBeGlvc0Vycm9yLnByb3RvdHlwZTtcbmNvbnN0IGRlc2NyaXB0b3JzID0ge307XG5cbltcbiAgJ0VSUl9CQURfT1BUSU9OX1ZBTFVFJyxcbiAgJ0VSUl9CQURfT1BUSU9OJyxcbiAgJ0VDT05OQUJPUlRFRCcsXG4gICdFVElNRURPVVQnLFxuICAnRVJSX05FVFdPUksnLFxuICAnRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUycsXG4gICdFUlJfREVQUkVDQVRFRCcsXG4gICdFUlJfQkFEX1JFU1BPTlNFJyxcbiAgJ0VSUl9CQURfUkVRVUVTVCcsXG4gICdFUlJfQ0FOQ0VMRUQnLFxuICAnRVJSX05PVF9TVVBQT1JUJyxcbiAgJ0VSUl9JTlZBTElEX1VSTCdcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5dLmZvckVhY2goY29kZSA9PiB7XG4gIGRlc2NyaXB0b3JzW2NvZGVdID0ge3ZhbHVlOiBjb2RlfTtcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBeGlvc0Vycm9yLCBkZXNjcmlwdG9ycyk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG90eXBlLCAnaXNBeGlvc0Vycm9yJywge3ZhbHVlOiB0cnVlfSk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5BeGlvc0Vycm9yLmZyb20gPSAoZXJyb3IsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UsIGN1c3RvbVByb3BzKSA9PiB7XG4gIGNvbnN0IGF4aW9zRXJyb3IgPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XG5cbiAgdXRpbHMudG9GbGF0T2JqZWN0KGVycm9yLCBheGlvc0Vycm9yLCBmdW5jdGlvbiBmaWx0ZXIob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAhPT0gRXJyb3IucHJvdG90eXBlO1xuICB9LCBwcm9wID0+IHtcbiAgICByZXR1cm4gcHJvcCAhPT0gJ2lzQXhpb3NFcnJvcic7XG4gIH0pO1xuXG4gIGNvbnN0IG1zZyA9IGVycm9yICYmIGVycm9yLm1lc3NhZ2UgPyBlcnJvci5tZXNzYWdlIDogJ0Vycm9yJztcblxuICAvLyBQcmVmZXIgZXhwbGljaXQgY29kZTsgb3RoZXJ3aXNlIGNvcHkgdGhlIGxvdy1sZXZlbCBlcnJvcidzIGNvZGUgKGUuZy4gRUNPTk5SRUZVU0VEKVxuICBjb25zdCBlcnJDb2RlID0gY29kZSA9PSBudWxsICYmIGVycm9yID8gZXJyb3IuY29kZSA6IGNvZGU7XG4gIEF4aW9zRXJyb3IuY2FsbChheGlvc0Vycm9yLCBtc2csIGVyckNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpO1xuXG4gIC8vIENoYWluIHRoZSBvcmlnaW5hbCBlcnJvciBvbiB0aGUgc3RhbmRhcmQgZmllbGQ7IG5vbi1lbnVtZXJhYmxlIHRvIGF2b2lkIEpTT04gbm9pc2VcbiAgaWYgKGVycm9yICYmIGF4aW9zRXJyb3IuY2F1c2UgPT0gbnVsbCkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShheGlvc0Vycm9yLCAnY2F1c2UnLCB7IHZhbHVlOiBlcnJvciwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xuICB9XG5cbiAgYXhpb3NFcnJvci5uYW1lID0gKGVycm9yICYmIGVycm9yLm5hbWUpIHx8ICdFcnJvcic7XG5cbiAgY3VzdG9tUHJvcHMgJiYgT2JqZWN0LmFzc2lnbihheGlvc0Vycm9yLCBjdXN0b21Qcm9wcyk7XG5cbiAgcmV0dXJuIGF4aW9zRXJyb3I7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc0Vycm9yO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHN0cmljdFxuZXhwb3J0IGRlZmF1bHQgbnVsbDtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG4vLyB0ZW1wb3JhcnkgaG90Zml4IHRvIGF2b2lkIGNpcmN1bGFyIHJlZmVyZW5jZXMgdW50aWwgQXhpb3NVUkxTZWFyY2hQYXJhbXMgaXMgcmVmYWN0b3JlZFxuaW1wb3J0IFBsYXRmb3JtRm9ybURhdGEgZnJvbSAnLi4vcGxhdGZvcm0vbm9kZS9jbGFzc2VzL0Zvcm1EYXRhLmpzJztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBnaXZlbiB0aGluZyBpcyBhIGFycmF5IG9yIGpzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGhpbmcgLSBUaGUgb2JqZWN0IG9yIGFycmF5IHRvIGJlIHZpc2l0ZWQuXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzVmlzaXRhYmxlKHRoaW5nKSB7XG4gIHJldHVybiB1dGlscy5pc1BsYWluT2JqZWN0KHRoaW5nKSB8fCB1dGlscy5pc0FycmF5KHRoaW5nKTtcbn1cblxuLyoqXG4gKiBJdCByZW1vdmVzIHRoZSBicmFja2V0cyBmcm9tIHRoZSBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBvZiB0aGUgcGFyYW1ldGVyLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBrZXkgd2l0aG91dCB0aGUgYnJhY2tldHMuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUJyYWNrZXRzKGtleSkge1xuICByZXR1cm4gdXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSA/IGtleS5zbGljZSgwLCAtMikgOiBrZXk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBwYXRoLCBhIGtleSwgYW5kIGEgYm9vbGVhbiwgYW5kIHJldHVybnMgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIFRoZSBwYXRoIHRvIHRoZSBjdXJyZW50IGtleS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBjdXJyZW50IG9iamVjdCBiZWluZyBpdGVyYXRlZCBvdmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGRvdHMgLSBJZiB0cnVlLCB0aGUga2V5IHdpbGwgYmUgcmVuZGVyZWQgd2l0aCBkb3RzIGluc3RlYWQgb2YgYnJhY2tldHMuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICovXG5mdW5jdGlvbiByZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSB7XG4gIGlmICghcGF0aCkgcmV0dXJuIGtleTtcbiAgcmV0dXJuIHBhdGguY29uY2F0KGtleSkubWFwKGZ1bmN0aW9uIGVhY2godG9rZW4sIGkpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB0b2tlbiA9IHJlbW92ZUJyYWNrZXRzKHRva2VuKTtcbiAgICByZXR1cm4gIWRvdHMgJiYgaSA/ICdbJyArIHRva2VuICsgJ10nIDogdG9rZW47XG4gIH0pLmpvaW4oZG90cyA/ICcuJyA6ICcnKTtcbn1cblxuLyoqXG4gKiBJZiB0aGUgYXJyYXkgaXMgYW4gYXJyYXkgYW5kIG5vbmUgb2YgaXRzIGVsZW1lbnRzIGFyZSB2aXNpdGFibGUsIHRoZW4gaXQncyBhIGZsYXQgYXJyYXkuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY2hlY2tcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNGbGF0QXJyYXkoYXJyKSB7XG4gIHJldHVybiB1dGlscy5pc0FycmF5KGFycikgJiYgIWFyci5zb21lKGlzVmlzaXRhYmxlKTtcbn1cblxuY29uc3QgcHJlZGljYXRlcyA9IHV0aWxzLnRvRmxhdE9iamVjdCh1dGlscywge30sIG51bGwsIGZ1bmN0aW9uIGZpbHRlcihwcm9wKSB7XG4gIHJldHVybiAvXmlzW0EtWl0vLnRlc3QocHJvcCk7XG59KTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgZGF0YSBvYmplY3QgdG8gRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gez9PYmplY3R9IFtmb3JtRGF0YV1cbiAqIEBwYXJhbSB7P09iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy52aXNpdG9yXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tZXRhVG9rZW5zID0gdHJ1ZV1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZG90cyA9IGZhbHNlXVxuICogQHBhcmFtIHs/Qm9vbGVhbn0gW29wdGlvbnMuaW5kZXhlcyA9IGZhbHNlXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiovXG5cbi8qKlxuICogSXQgY29udmVydHMgYW4gb2JqZWN0IGludG8gYSBGb3JtRGF0YSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdDxhbnksIGFueT59IG9iaiAtIFRoZSBvYmplY3QgdG8gY29udmVydCB0byBmb3JtIGRhdGEuXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgLSBUaGUgRm9ybURhdGEgb2JqZWN0IHRvIGFwcGVuZCB0by5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zXG4gKi9cbmZ1bmN0aW9uIHRvRm9ybURhdGEob2JqLCBmb3JtRGF0YSwgb3B0aW9ucykge1xuICBpZiAoIXV0aWxzLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0YXJnZXQgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBmb3JtRGF0YSA9IGZvcm1EYXRhIHx8IG5ldyAoUGxhdGZvcm1Gb3JtRGF0YSB8fCBGb3JtRGF0YSkoKTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgb3B0aW9ucyA9IHV0aWxzLnRvRmxhdE9iamVjdChvcHRpb25zLCB7XG4gICAgbWV0YVRva2VuczogdHJ1ZSxcbiAgICBkb3RzOiBmYWxzZSxcbiAgICBpbmRleGVzOiBmYWxzZVxuICB9LCBmYWxzZSwgZnVuY3Rpb24gZGVmaW5lZChvcHRpb24sIHNvdXJjZSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICAgIHJldHVybiAhdXRpbHMuaXNVbmRlZmluZWQoc291cmNlW29wdGlvbl0pO1xuICB9KTtcblxuICBjb25zdCBtZXRhVG9rZW5zID0gb3B0aW9ucy5tZXRhVG9rZW5zO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgY29uc3QgdmlzaXRvciA9IG9wdGlvbnMudmlzaXRvciB8fCBkZWZhdWx0VmlzaXRvcjtcbiAgY29uc3QgZG90cyA9IG9wdGlvbnMuZG90cztcbiAgY29uc3QgaW5kZXhlcyA9IG9wdGlvbnMuaW5kZXhlcztcbiAgY29uc3QgX0Jsb2IgPSBvcHRpb25zLkJsb2IgfHwgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIEJsb2I7XG4gIGNvbnN0IHVzZUJsb2IgPSBfQmxvYiAmJiB1dGlscy5pc1NwZWNDb21wbGlhbnRGb3JtKGZvcm1EYXRhKTtcblxuICBpZiAoIXV0aWxzLmlzRnVuY3Rpb24odmlzaXRvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2aXNpdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29udmVydFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSByZXR1cm4gJyc7XG5cbiAgICBpZiAodXRpbHMuaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQm9vbGVhbih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmICghdXNlQmxvYiAmJiB1dGlscy5pc0Jsb2IodmFsdWUpKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignQmxvYiBpcyBub3Qgc3VwcG9ydGVkLiBVc2UgYSBCdWZmZXIgaW5zdGVhZC4nKTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlcih2YWx1ZSkgfHwgdXRpbHMuaXNUeXBlZEFycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHVzZUJsb2IgJiYgdHlwZW9mIEJsb2IgPT09ICdmdW5jdGlvbicgPyBuZXcgQmxvYihbdmFsdWVdKSA6IEJ1ZmZlci5mcm9tKHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogRGVmYXVsdCB2aXNpdG9yLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0ga2V5XG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nfE51bWJlcj59IHBhdGhcbiAgICogQHRoaXMge0Zvcm1EYXRhfVxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gcmV0dXJuIHRydWUgdG8gdmlzaXQgdGhlIGVhY2ggcHJvcCBvZiB0aGUgdmFsdWUgcmVjdXJzaXZlbHlcbiAgICovXG4gIGZ1bmN0aW9uIGRlZmF1bHRWaXNpdG9yKHZhbHVlLCBrZXksIHBhdGgpIHtcbiAgICBsZXQgYXJyID0gdmFsdWU7XG5cbiAgICBpZiAodmFsdWUgJiYgIXBhdGggJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHV0aWxzLmVuZHNXaXRoKGtleSwgJ3t9JykpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IG1ldGFUb2tlbnMgPyBrZXkgOiBrZXkuc2xpY2UoMCwgLTIpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAodXRpbHMuaXNBcnJheSh2YWx1ZSkgJiYgaXNGbGF0QXJyYXkodmFsdWUpKSB8fFxuICAgICAgICAoKHV0aWxzLmlzRmlsZUxpc3QodmFsdWUpIHx8IHV0aWxzLmVuZHNXaXRoKGtleSwgJ1tdJykpICYmIChhcnIgPSB1dGlscy50b0FycmF5KHZhbHVlKSlcbiAgICAgICAgKSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAga2V5ID0gcmVtb3ZlQnJhY2tldHMoa2V5KTtcblxuICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbiBlYWNoKGVsLCBpbmRleCkge1xuICAgICAgICAgICEodXRpbHMuaXNVbmRlZmluZWQoZWwpIHx8IGVsID09PSBudWxsKSAmJiBmb3JtRGF0YS5hcHBlbmQoXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbiAgICAgICAgICAgIGluZGV4ZXMgPT09IHRydWUgPyByZW5kZXJLZXkoW2tleV0sIGluZGV4LCBkb3RzKSA6IChpbmRleGVzID09PSBudWxsID8ga2V5IDoga2V5ICsgJ1tdJyksXG4gICAgICAgICAgICBjb252ZXJ0VmFsdWUoZWwpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNWaXNpdGFibGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3JtRGF0YS5hcHBlbmQocmVuZGVyS2V5KHBhdGgsIGtleSwgZG90cyksIGNvbnZlcnRWYWx1ZSh2YWx1ZSkpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3Qgc3RhY2sgPSBbXTtcblxuICBjb25zdCBleHBvc2VkSGVscGVycyA9IE9iamVjdC5hc3NpZ24ocHJlZGljYXRlcywge1xuICAgIGRlZmF1bHRWaXNpdG9yLFxuICAgIGNvbnZlcnRWYWx1ZSxcbiAgICBpc1Zpc2l0YWJsZVxuICB9KTtcblxuICBmdW5jdGlvbiBidWlsZCh2YWx1ZSwgcGF0aCkge1xuICAgIGlmICh1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybjtcblxuICAgIGlmIChzdGFjay5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcbiAgICAgIHRocm93IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2UgZGV0ZWN0ZWQgaW4gJyArIHBhdGguam9pbignLicpKTtcbiAgICB9XG5cbiAgICBzdGFjay5wdXNoKHZhbHVlKTtcblxuICAgIHV0aWxzLmZvckVhY2godmFsdWUsIGZ1bmN0aW9uIGVhY2goZWwsIGtleSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gISh1dGlscy5pc1VuZGVmaW5lZChlbCkgfHwgZWwgPT09IG51bGwpICYmIHZpc2l0b3IuY2FsbChcbiAgICAgICAgZm9ybURhdGEsIGVsLCB1dGlscy5pc1N0cmluZyhrZXkpID8ga2V5LnRyaW0oKSA6IGtleSwgcGF0aCwgZXhwb3NlZEhlbHBlcnNcbiAgICAgICk7XG5cbiAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgYnVpbGQoZWwsIHBhdGggPyBwYXRoLmNvbmNhdChrZXkpIDogW2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3RhY2sucG9wKCk7XG4gIH1cblxuICBpZiAoIXV0aWxzLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdkYXRhIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICBidWlsZChvYmopO1xuXG4gIHJldHVybiBmb3JtRGF0YTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdG9Gb3JtRGF0YTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi90b0Zvcm1EYXRhLmpzJztcblxuLyoqXG4gKiBJdCBlbmNvZGVzIGEgc3RyaW5nIGJ5IHJlcGxhY2luZyBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgaW4gdGhlIHVucmVzZXJ2ZWQgc2V0IHdpdGhcbiAqIHRoZWlyIHBlcmNlbnQtZW5jb2RlZCBlcXVpdmFsZW50c1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIGVuY29kZS5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZW5jb2RlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZShzdHIpIHtcbiAgY29uc3QgY2hhck1hcCA9IHtcbiAgICAnISc6ICclMjEnLFxuICAgIFwiJ1wiOiAnJTI3JyxcbiAgICAnKCc6ICclMjgnLFxuICAgICcpJzogJyUyOScsXG4gICAgJ34nOiAnJTdFJyxcbiAgICAnJTIwJzogJysnLFxuICAgICclMDAnOiAnXFx4MDAnXG4gIH07XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC9bIScoKX5dfCUyMHwlMDAvZywgZnVuY3Rpb24gcmVwbGFjZXIobWF0Y2gpIHtcbiAgICByZXR1cm4gY2hhck1hcFttYXRjaF07XG4gIH0pO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgcGFyYW1zIG9iamVjdCBhbmQgY29udmVydHMgaXQgdG8gYSBGb3JtRGF0YSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IHBhcmFtcyAtIFRoZSBwYXJhbWV0ZXJzIHRvIGJlIGNvbnZlcnRlZCB0byBhIEZvcm1EYXRhIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdCBwYXNzZWQgdG8gdGhlIEF4aW9zIGNvbnN0cnVjdG9yLlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBBeGlvc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMsIG9wdGlvbnMpIHtcbiAgdGhpcy5fcGFpcnMgPSBbXTtcblxuICBwYXJhbXMgJiYgdG9Gb3JtRGF0YShwYXJhbXMsIHRoaXMsIG9wdGlvbnMpO1xufVxuXG5jb25zdCBwcm90b3R5cGUgPSBBeGlvc1VSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGU7XG5cbnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiBhcHBlbmQobmFtZSwgdmFsdWUpIHtcbiAgdGhpcy5fcGFpcnMucHVzaChbbmFtZSwgdmFsdWVdKTtcbn07XG5cbnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKGVuY29kZXIpIHtcbiAgY29uc3QgX2VuY29kZSA9IGVuY29kZXIgPyBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBlbmNvZGVyLmNhbGwodGhpcywgdmFsdWUsIGVuY29kZSk7XG4gIH0gOiBlbmNvZGU7XG5cbiAgcmV0dXJuIHRoaXMuX3BhaXJzLm1hcChmdW5jdGlvbiBlYWNoKHBhaXIpIHtcbiAgICByZXR1cm4gX2VuY29kZShwYWlyWzBdKSArICc9JyArIF9lbmNvZGUocGFpclsxXSk7XG4gIH0sICcnKS5qb2luKCcmJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc1VSTFNlYXJjaFBhcmFtcztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBmcm9tICcuLi9oZWxwZXJzL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzJztcblxuLyoqXG4gKiBJdCByZXBsYWNlcyBhbGwgaW5zdGFuY2VzIG9mIHRoZSBjaGFyYWN0ZXJzIGA6YCwgYCRgLCBgLGAsIGArYCwgYFtgLCBhbmQgYF1gIHdpdGggdGhlaXJcbiAqIFVSSSBlbmNvZGVkIGNvdW50ZXJwYXJ0c1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWwgVGhlIHZhbHVlIHRvIGJlIGVuY29kZWQuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGVuY29kZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHBhcmFtIHs/KG9iamVjdHxGdW5jdGlvbil9IG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgb3B0aW9ucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIFxuICBjb25zdCBfZW5jb2RlID0gb3B0aW9ucyAmJiBvcHRpb25zLmVuY29kZSB8fCBlbmNvZGU7XG5cbiAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgc2VyaWFsaXplOiBvcHRpb25zXG4gICAgfTtcbiAgfSBcblxuICBjb25zdCBzZXJpYWxpemVGbiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zZXJpYWxpemU7XG5cbiAgbGV0IHNlcmlhbGl6ZWRQYXJhbXM7XG5cbiAgaWYgKHNlcmlhbGl6ZUZuKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHNlcmlhbGl6ZUZuKHBhcmFtcywgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykgP1xuICAgICAgcGFyYW1zLnRvU3RyaW5nKCkgOlxuICAgICAgbmV3IEF4aW9zVVJMU2VhcmNoUGFyYW1zKHBhcmFtcywgb3B0aW9ucykudG9TdHJpbmcoX2VuY29kZSk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIGNvbnN0IGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZihcIiNcIik7XG5cbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcbiAgICB9XG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuXG5jbGFzcyBJbnRlcmNlcHRvck1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAgICovXG4gIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkLCBvcHRpb25zKSB7XG4gICAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICAgIGZ1bGZpbGxlZCxcbiAgICAgIHJlamVjdGVkLFxuICAgICAgc3luY2hyb25vdXM6IG9wdGlvbnMgPyBvcHRpb25zLnN5bmNocm9ub3VzIDogZmFsc2UsXG4gICAgICBydW5XaGVuOiBvcHRpb25zID8gb3B0aW9ucy5ydW5XaGVuIDogbnVsbFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgaW50ZXJjZXB0b3Igd2FzIHJlbW92ZWQsIGBmYWxzZWAgb3RoZXJ3aXNlXG4gICAqL1xuICBlamVjdChpZCkge1xuICAgIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbGwgaW50ZXJjZXB0b3JzIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnMpIHtcbiAgICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAgICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZm9yRWFjaChmbikge1xuICAgIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgICAgZm4oaCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHNpbGVudEpTT05QYXJzaW5nOiB0cnVlLFxuICBmb3JjZWRKU09OUGFyc2luZzogdHJ1ZSxcbiAgY2xhcmlmeVRpbWVvdXRFcnJvcjogZmFsc2Vcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBmcm9tICcuLi8uLi8uLi9oZWxwZXJzL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzJztcbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnID8gVVJMU2VhcmNoUGFyYW1zIDogQXhpb3NVUkxTZWFyY2hQYXJhbXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgPyBGb3JtRGF0YSA6IG51bGw7XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnID8gQmxvYiA6IG51bGxcbiIsImltcG9ydCBVUkxTZWFyY2hQYXJhbXMgZnJvbSAnLi9jbGFzc2VzL1VSTFNlYXJjaFBhcmFtcy5qcydcbmltcG9ydCBGb3JtRGF0YSBmcm9tICcuL2NsYXNzZXMvRm9ybURhdGEuanMnXG5pbXBvcnQgQmxvYiBmcm9tICcuL2NsYXNzZXMvQmxvYi5qcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0Jyb3dzZXI6IHRydWUsXG4gIGNsYXNzZXM6IHtcbiAgICBVUkxTZWFyY2hQYXJhbXMsXG4gICAgRm9ybURhdGEsXG4gICAgQmxvYlxuICB9LFxuICBwcm90b2NvbHM6IFsnaHR0cCcsICdodHRwcycsICdmaWxlJywgJ2Jsb2InLCAndXJsJywgJ2RhdGEnXVxufTtcbiIsImNvbnN0IGhhc0Jyb3dzZXJFbnYgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xuXG5jb25zdCBfbmF2aWdhdG9yID0gdHlwZW9mIG5hdmlnYXRvciA9PT0gJ29iamVjdCcgJiYgbmF2aWdhdG9yIHx8IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGhhc1N0YW5kYXJkQnJvd3NlckVudiA9IGhhc0Jyb3dzZXJFbnYgJiZcbiAgKCFfbmF2aWdhdG9yIHx8IFsnUmVhY3ROYXRpdmUnLCAnTmF0aXZlU2NyaXB0JywgJ05TJ10uaW5kZXhPZihfbmF2aWdhdG9yLnByb2R1Y3QpIDwgMCk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIHdlYldvcmtlciBlbnZpcm9ubWVudFxuICpcbiAqIEFsdGhvdWdoIHRoZSBgaXNTdGFuZGFyZEJyb3dzZXJFbnZgIG1ldGhvZCBpbmRpY2F0ZXMgdGhhdFxuICogYGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyYCwgdGhlIFdlYldvcmtlciB3aWxsIHN0aWxsIGJlXG4gKiBmaWx0ZXJlZCBvdXQgZHVlIHRvIGl0cyBqdWRnbWVudCBzdGFuZGFyZFxuICogYHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdgLlxuICogVGhpcyBsZWFkcyB0byBhIHByb2JsZW0gd2hlbiBheGlvcyBwb3N0IGBGb3JtRGF0YWAgaW4gd2ViV29ya2VyXG4gKi9cbmNvbnN0IGhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudiA9ICgoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSAmJlxuICAgIHR5cGVvZiBzZWxmLmltcG9ydFNjcmlwdHMgPT09ICdmdW5jdGlvbidcbiAgKTtcbn0pKCk7XG5cbmNvbnN0IG9yaWdpbiA9IGhhc0Jyb3dzZXJFbnYgJiYgd2luZG93LmxvY2F0aW9uLmhyZWYgfHwgJ2h0dHA6Ly9sb2NhbGhvc3QnO1xuXG5leHBvcnQge1xuICBoYXNCcm93c2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYsXG4gIGhhc1N0YW5kYXJkQnJvd3NlckVudixcbiAgX25hdmlnYXRvciBhcyBuYXZpZ2F0b3IsXG4gIG9yaWdpblxufVxuIiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4vbm9kZS9pbmRleC5qcyc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL2NvbW1vbi91dGlscy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLi4udXRpbHMsXG4gIC4uLnBsYXRmb3JtXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCBvcHRpb25zKSB7XG4gIHJldHVybiB0b0Zvcm1EYXRhKGRhdGEsIG5ldyBwbGF0Zm9ybS5jbGFzc2VzLlVSTFNlYXJjaFBhcmFtcygpLCB7XG4gICAgdmlzaXRvcjogZnVuY3Rpb24odmFsdWUsIGtleSwgcGF0aCwgaGVscGVycykge1xuICAgICAgaWYgKHBsYXRmb3JtLmlzTm9kZSAmJiB1dGlscy5pc0J1ZmZlcih2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoa2V5LCB2YWx1ZS50b1N0cmluZygnYmFzZTY0JykpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoZWxwZXJzLmRlZmF1bHRWaXNpdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICAuLi5vcHRpb25zXG4gIH0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIEl0IHRha2VzIGEgc3RyaW5nIGxpa2UgYGZvb1t4XVt5XVt6XWAgYW5kIHJldHVybnMgYW4gYXJyYXkgbGlrZSBgWydmb28nLCAneCcsICd5JywgJ3onXVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqXG4gKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzdHJpbmdzLlxuICovXG5mdW5jdGlvbiBwYXJzZVByb3BQYXRoKG5hbWUpIHtcbiAgLy8gZm9vW3hdW3ldW3pdXG4gIC8vIGZvby54LnkuelxuICAvLyBmb28teC15LXpcbiAgLy8gZm9vIHggeSB6XG4gIHJldHVybiB1dGlscy5tYXRjaEFsbCgvXFx3K3xcXFsoXFx3KildL2csIG5hbWUpLm1hcChtYXRjaCA9PiB7XG4gICAgcmV0dXJuIG1hdGNoWzBdID09PSAnW10nID8gJycgOiBtYXRjaFsxXSB8fCBtYXRjaFswXTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBhcnJheSB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY29udmVydCB0byBhbiBvYmplY3QuXG4gKlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cyBhbmQgdmFsdWVzIGFzIHRoZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb09iamVjdChhcnIpIHtcbiAgY29uc3Qgb2JqID0ge307XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuICBsZXQgaTtcbiAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gIGxldCBrZXk7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtleSA9IGtleXNbaV07XG4gICAgb2JqW2tleV0gPSBhcnJba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgRm9ybURhdGEgb2JqZWN0IGFuZCByZXR1cm5zIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgVGhlIEZvcm1EYXRhIG9iamVjdCB0byBjb252ZXJ0IHRvIEpTT04uXG4gKlxuICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIGFueT4gfCBudWxsfSBUaGUgY29udmVydGVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZm9ybURhdGFUb0pTT04oZm9ybURhdGEpIHtcbiAgZnVuY3Rpb24gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXQsIGluZGV4KSB7XG4gICAgbGV0IG5hbWUgPSBwYXRoW2luZGV4KytdO1xuXG4gICAgaWYgKG5hbWUgPT09ICdfX3Byb3RvX18nKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IGlzTnVtZXJpY0tleSA9IE51bWJlci5pc0Zpbml0ZSgrbmFtZSk7XG4gICAgY29uc3QgaXNMYXN0ID0gaW5kZXggPj0gcGF0aC5sZW5ndGg7XG4gICAgbmFtZSA9ICFuYW1lICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0KSA/IHRhcmdldC5sZW5ndGggOiBuYW1lO1xuXG4gICAgaWYgKGlzTGFzdCkge1xuICAgICAgaWYgKHV0aWxzLmhhc093blByb3AodGFyZ2V0LCBuYW1lKSkge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSBbdGFyZ2V0W25hbWVdLCB2YWx1ZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXRbbmFtZV0gfHwgIXV0aWxzLmlzT2JqZWN0KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0W25hbWVdLCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0ICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gYXJyYXlUb09iamVjdCh0YXJnZXRbbmFtZV0pO1xuICAgIH1cblxuICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZm9ybURhdGEpICYmIHV0aWxzLmlzRnVuY3Rpb24oZm9ybURhdGEuZW50cmllcykpIHtcbiAgICBjb25zdCBvYmogPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2hFbnRyeShmb3JtRGF0YSwgKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBidWlsZFBhdGgocGFyc2VQcm9wUGF0aChuYW1lKSwgdmFsdWUsIG9iaiwgMCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1EYXRhVG9KU09OO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCB0cmFuc2l0aW9uYWxEZWZhdWx0cyBmcm9tICcuL3RyYW5zaXRpb25hbC5qcyc7XG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuLi9oZWxwZXJzL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IHRvVVJMRW5jb2RlZEZvcm0gZnJvbSAnLi4vaGVscGVycy90b1VSTEVuY29kZWRGb3JtLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5pbXBvcnQgZm9ybURhdGFUb0pTT04gZnJvbSAnLi4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcsIHRyaWVzIHRvIHBhcnNlIGl0LCBhbmQgaWYgaXQgZmFpbHMsIGl0IHJldHVybnMgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb25cbiAqIG9mIHRoZSBpbnB1dFxuICpcbiAqIEBwYXJhbSB7YW55fSByYXdWYWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzdHJpbmdpZmllZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcnNlciAtIEEgZnVuY3Rpb24gdGhhdCBwYXJzZXMgYSBzdHJpbmcgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZW5jb2RlciAtIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHZhbHVlIGFuZCByZXR1cm5zIGEgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiB0aGUgcmF3VmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ2lmeVNhZmVseShyYXdWYWx1ZSwgcGFyc2VyLCBlbmNvZGVyKSB7XG4gIGlmICh1dGlscy5pc1N0cmluZyhyYXdWYWx1ZSkpIHtcbiAgICB0cnkge1xuICAgICAgKHBhcnNlciB8fCBKU09OLnBhcnNlKShyYXdWYWx1ZSk7XG4gICAgICByZXR1cm4gdXRpbHMudHJpbShyYXdWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZW5jb2RlciB8fCBKU09OLnN0cmluZ2lmeSkocmF3VmFsdWUpO1xufVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcblxuICB0cmFuc2l0aW9uYWw6IHRyYW5zaXRpb25hbERlZmF1bHRzLFxuXG4gIGFkYXB0ZXI6IFsneGhyJywgJ2h0dHAnLCAnZmV0Y2gnXSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkgfHwgJyc7XG4gICAgY29uc3QgaGFzSlNPTkNvbnRlbnRUeXBlID0gY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpID4gLTE7XG4gICAgY29uc3QgaXNPYmplY3RQYXlsb2FkID0gdXRpbHMuaXNPYmplY3QoZGF0YSk7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkICYmIHV0aWxzLmlzSFRNTEZvcm0oZGF0YSkpIHtcbiAgICAgIGRhdGEgPSBuZXcgRm9ybURhdGEoZGF0YSk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNGb3JtRGF0YSA9IHV0aWxzLmlzRm9ybURhdGEoZGF0YSk7XG5cbiAgICBpZiAoaXNGb3JtRGF0YSkge1xuICAgICAgcmV0dXJuIGhhc0pTT05Db250ZW50VHlwZSA/IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhVG9KU09OKGRhdGEpKSA6IGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzUmVhZGFibGVTdHJlYW0oZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsIGZhbHNlKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgbGV0IGlzRmlsZUxpc3Q7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkKSB7XG4gICAgICBpZiAoY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCB0aGlzLmZvcm1TZXJpYWxpemVyKS50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoKGlzRmlsZUxpc3QgPSB1dGlscy5pc0ZpbGVMaXN0KGRhdGEpKSB8fCBjb250ZW50VHlwZS5pbmRleE9mKCdtdWx0aXBhcnQvZm9ybS1kYXRhJykgPiAtMSkge1xuICAgICAgICBjb25zdCBfRm9ybURhdGEgPSB0aGlzLmVudiAmJiB0aGlzLmVudi5Gb3JtRGF0YTtcblxuICAgICAgICByZXR1cm4gdG9Gb3JtRGF0YShcbiAgICAgICAgICBpc0ZpbGVMaXN0ID8geydmaWxlc1tdJzogZGF0YX0gOiBkYXRhLFxuICAgICAgICAgIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCksXG4gICAgICAgICAgdGhpcy5mb3JtU2VyaWFsaXplclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgfHwgaGFzSlNPTkNvbnRlbnRUeXBlICkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicsIGZhbHNlKTtcbiAgICAgIHJldHVybiBzdHJpbmdpZnlTYWZlbHkoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICBjb25zdCBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgY29uc3QgSlNPTlJlcXVlc3RlZCA9IHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICBpZiAodXRpbHMuaXNSZXNwb25zZShkYXRhKSB8fCB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSAmJiB1dGlscy5pc1N0cmluZyhkYXRhKSAmJiAoKGZvcmNlZEpTT05QYXJzaW5nICYmICF0aGlzLnJlc3BvbnNlVHlwZSkgfHwgSlNPTlJlcXVlc3RlZCkpIHtcbiAgICAgIGNvbnN0IHNpbGVudEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5zaWxlbnRKU09OUGFyc2luZztcbiAgICAgIGNvbnN0IHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIEpTT05SZXF1ZXN0ZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEsIHRoaXMucGFyc2VSZXZpdmVyKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKHN0cmljdEpTT05QYXJzaW5nKSB7XG4gICAgICAgICAgaWYgKGUubmFtZSA9PT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICAgICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGUsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSwgdGhpcywgbnVsbCwgdGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG4gIG1heEJvZHlMZW5ndGg6IC0xLFxuXG4gIGVudjoge1xuICAgIEZvcm1EYXRhOiBwbGF0Zm9ybS5jbGFzc2VzLkZvcm1EYXRhLFxuICAgIEJsb2I6IHBsYXRmb3JtLmNsYXNzZXMuQmxvYlxuICB9LFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH0sXG5cbiAgaGVhZGVyczoge1xuICAgIGNvbW1vbjoge1xuICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCddLCAobWV0aG9kKSA9PiB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5cbi8vIFJhd0F4aW9zSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbmNvbnN0IGlnbm9yZUR1cGxpY2F0ZU9mID0gdXRpbHMudG9PYmplY3RTZXQoW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl0pO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmF3SGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKlxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgcmF3SGVhZGVycyA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHt9O1xuICBsZXQga2V5O1xuICBsZXQgdmFsO1xuICBsZXQgaTtcblxuICByYXdIZWFkZXJzICYmIHJhd0hlYWRlcnMuc3BsaXQoJ1xcbicpLmZvckVhY2goZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gbGluZS5zdWJzdHJpbmcoMCwgaSkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gbGluZS5zdWJzdHJpbmcoaSArIDEpLnRyaW0oKTtcblxuICAgIGlmICgha2V5IHx8IChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZltrZXldKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgaWYgKHBhcnNlZFtrZXldKSB7XG4gICAgICAgIHBhcnNlZFtrZXldLnB1c2godmFsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gW3ZhbF07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBwYXJzZUhlYWRlcnMgZnJvbSAnLi4vaGVscGVycy9wYXJzZUhlYWRlcnMuanMnO1xuXG5jb25zdCAkaW50ZXJuYWxzID0gU3ltYm9sKCdpbnRlcm5hbHMnKTtcblxuZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyICYmIFN0cmluZyhoZWFkZXIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09IGZhbHNlIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gdXRpbHMuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5tYXAobm9ybWFsaXplVmFsdWUpIDogU3RyaW5nKHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VUb2tlbnMoc3RyKSB7XG4gIGNvbnN0IHRva2VucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGNvbnN0IHRva2Vuc1JFID0gLyhbXlxccyw7PV0rKVxccyooPzo9XFxzKihbXiw7XSspKT8vZztcbiAgbGV0IG1hdGNoO1xuXG4gIHdoaWxlICgobWF0Y2ggPSB0b2tlbnNSRS5leGVjKHN0cikpKSB7XG4gICAgdG9rZW5zW21hdGNoWzFdXSA9IG1hdGNoWzJdO1xuICB9XG5cbiAgcmV0dXJuIHRva2Vucztcbn1cblxuY29uc3QgaXNWYWxpZEhlYWRlck5hbWUgPSAoc3RyKSA9PiAvXlstX2EtekEtWjAtOV5gfH4sISMkJSYnKisuXSskLy50ZXN0KHN0ci50cmltKCkpO1xuXG5mdW5jdGlvbiBtYXRjaEhlYWRlclZhbHVlKGNvbnRleHQsIHZhbHVlLCBoZWFkZXIsIGZpbHRlciwgaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gIGlmICh1dGlscy5pc0Z1bmN0aW9uKGZpbHRlcikpIHtcbiAgICByZXR1cm4gZmlsdGVyLmNhbGwodGhpcywgdmFsdWUsIGhlYWRlcik7XG4gIH1cblxuICBpZiAoaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gICAgdmFsdWUgPSBoZWFkZXI7XG4gIH1cblxuICBpZiAoIXV0aWxzLmlzU3RyaW5nKHZhbHVlKSkgcmV0dXJuO1xuXG4gIGlmICh1dGlscy5pc1N0cmluZyhmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIHZhbHVlLmluZGV4T2YoZmlsdGVyKSAhPT0gLTE7XG4gIH1cblxuICBpZiAodXRpbHMuaXNSZWdFeHAoZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIudGVzdCh2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9ybWF0SGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyLnRyaW0oKVxuICAgIC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyhbYS16XFxkXSkoXFx3KikvZywgKHcsIGNoYXIsIHN0cikgPT4ge1xuICAgICAgcmV0dXJuIGNoYXIudG9VcHBlckNhc2UoKSArIHN0cjtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYnVpbGRBY2Nlc3NvcnMob2JqLCBoZWFkZXIpIHtcbiAgY29uc3QgYWNjZXNzb3JOYW1lID0gdXRpbHMudG9DYW1lbENhc2UoJyAnICsgaGVhZGVyKTtcblxuICBbJ2dldCcsICdzZXQnLCAnaGFzJ10uZm9yRWFjaChtZXRob2ROYW1lID0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBtZXRob2ROYW1lICsgYWNjZXNzb3JOYW1lLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oYXJnMSwgYXJnMiwgYXJnMykge1xuICAgICAgICByZXR1cm4gdGhpc1ttZXRob2ROYW1lXS5jYWxsKHRoaXMsIGhlYWRlciwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0pO1xufVxuXG5jbGFzcyBBeGlvc0hlYWRlcnMge1xuICBjb25zdHJ1Y3RvcihoZWFkZXJzKSB7XG4gICAgaGVhZGVycyAmJiB0aGlzLnNldChoZWFkZXJzKTtcbiAgfVxuXG4gIHNldChoZWFkZXIsIHZhbHVlT3JSZXdyaXRlLCByZXdyaXRlKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkge1xuICAgICAgY29uc3QgbEhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKCFsSGVhZGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaGVhZGVyIG5hbWUgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShzZWxmLCBsSGVhZGVyKTtcblxuICAgICAgaWYoIWtleSB8fCBzZWxmW2tleV0gPT09IHVuZGVmaW5lZCB8fCBfcmV3cml0ZSA9PT0gdHJ1ZSB8fCAoX3Jld3JpdGUgPT09IHVuZGVmaW5lZCAmJiBzZWxmW2tleV0gIT09IGZhbHNlKSkge1xuICAgICAgICBzZWxmW2tleSB8fCBfaGVhZGVyXSA9IG5vcm1hbGl6ZVZhbHVlKF92YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc2V0SGVhZGVycyA9IChoZWFkZXJzLCBfcmV3cml0ZSkgPT5cbiAgICAgIHV0aWxzLmZvckVhY2goaGVhZGVycywgKF92YWx1ZSwgX2hlYWRlcikgPT4gc2V0SGVhZGVyKF92YWx1ZSwgX2hlYWRlciwgX3Jld3JpdGUpKTtcblxuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KGhlYWRlcikgfHwgaGVhZGVyIGluc3RhbmNlb2YgdGhpcy5jb25zdHJ1Y3Rvcikge1xuICAgICAgc2V0SGVhZGVycyhoZWFkZXIsIHZhbHVlT3JSZXdyaXRlKVxuICAgIH0gZWxzZSBpZih1dGlscy5pc1N0cmluZyhoZWFkZXIpICYmIChoZWFkZXIgPSBoZWFkZXIudHJpbSgpKSAmJiAhaXNWYWxpZEhlYWRlck5hbWUoaGVhZGVyKSkge1xuICAgICAgc2V0SGVhZGVycyhwYXJzZUhlYWRlcnMoaGVhZGVyKSwgdmFsdWVPclJld3JpdGUpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QoaGVhZGVyKSAmJiB1dGlscy5pc0l0ZXJhYmxlKGhlYWRlcikpIHtcbiAgICAgIGxldCBvYmogPSB7fSwgZGVzdCwga2V5O1xuICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBoZWFkZXIpIHtcbiAgICAgICAgaWYgKCF1dGlscy5pc0FycmF5KGVudHJ5KSkge1xuICAgICAgICAgIHRocm93IFR5cGVFcnJvcignT2JqZWN0IGl0ZXJhdG9yIG11c3QgcmV0dXJuIGEga2V5LXZhbHVlIHBhaXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9ialtrZXkgPSBlbnRyeVswXV0gPSAoZGVzdCA9IG9ialtrZXldKSA/XG4gICAgICAgICAgKHV0aWxzLmlzQXJyYXkoZGVzdCkgPyBbLi4uZGVzdCwgZW50cnlbMV1dIDogW2Rlc3QsIGVudHJ5WzFdXSkgOiBlbnRyeVsxXTtcbiAgICAgIH1cblxuICAgICAgc2V0SGVhZGVycyhvYmosIHZhbHVlT3JSZXdyaXRlKVxuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkZXIgIT0gbnVsbCAmJiBzZXRIZWFkZXIodmFsdWVPclJld3JpdGUsIGhlYWRlciwgcmV3cml0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQoaGVhZGVyLCBwYXJzZXIpIHtcbiAgICBoZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoaGVhZGVyKTtcblxuICAgIGlmIChoZWFkZXIpIHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkodGhpcywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXNba2V5XTtcblxuICAgICAgICBpZiAoIXBhcnNlcikge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJzZXIgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VUb2tlbnModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ocGFyc2VyKSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZXIuY2FsbCh0aGlzLCB2YWx1ZSwga2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1JlZ0V4cChwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5leGVjKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhcnNlciBtdXN0IGJlIGJvb2xlYW58cmVnZXhwfGZ1bmN0aW9uJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFzKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICByZXR1cm4gISEoa2V5ICYmIHRoaXNba2V5XSAhPT0gdW5kZWZpbmVkICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHRoaXMsIHRoaXNba2V5XSwga2V5LCBtYXRjaGVyKSkpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGRlbGV0ZShoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gZGVsZXRlSGVhZGVyKF9oZWFkZXIpIHtcbiAgICAgIF9oZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmIChfaGVhZGVyKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoc2VsZiwgX2hlYWRlcik7XG5cbiAgICAgICAgaWYgKGtleSAmJiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZShzZWxmLCBzZWxmW2tleV0sIGtleSwgbWF0Y2hlcikpKSB7XG4gICAgICAgICAgZGVsZXRlIHNlbGZba2V5XTtcblxuICAgICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXkoaGVhZGVyKSkge1xuICAgICAgaGVhZGVyLmZvckVhY2goZGVsZXRlSGVhZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlSGVhZGVyKGhlYWRlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBjbGVhcihtYXRjaGVyKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xuICAgIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGRlbGV0ZWQgPSBmYWxzZTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgICBpZighbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHRoaXMsIHRoaXNba2V5XSwga2V5LCBtYXRjaGVyLCB0cnVlKSkge1xuICAgICAgICBkZWxldGUgdGhpc1trZXldO1xuICAgICAgICBkZWxldGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVsZXRlZDtcbiAgfVxuXG4gIG5vcm1hbGl6ZShmb3JtYXQpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBjb25zdCBoZWFkZXJzID0ge307XG5cbiAgICB1dGlscy5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KGhlYWRlcnMsIGhlYWRlcik7XG5cbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgc2VsZltrZXldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuICAgICAgICBkZWxldGUgc2VsZltoZWFkZXJdO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBmb3JtYXQgPyBmb3JtYXRIZWFkZXIoaGVhZGVyKSA6IFN0cmluZyhoZWFkZXIpLnRyaW0oKTtcblxuICAgICAgaWYgKG5vcm1hbGl6ZWQgIT09IGhlYWRlcikge1xuICAgICAgICBkZWxldGUgc2VsZltoZWFkZXJdO1xuICAgICAgfVxuXG4gICAgICBzZWxmW25vcm1hbGl6ZWRdID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuXG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWRdID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY29uY2F0KC4uLnRhcmdldHMpIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5jb25jYXQodGhpcywgLi4udGFyZ2V0cyk7XG4gIH1cblxuICB0b0pTT04oYXNTdHJpbmdzKSB7XG4gICAgY29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIHV0aWxzLmZvckVhY2godGhpcywgKHZhbHVlLCBoZWFkZXIpID0+IHtcbiAgICAgIHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT09IGZhbHNlICYmIChvYmpbaGVhZGVyXSA9IGFzU3RyaW5ncyAmJiB1dGlscy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmpvaW4oJywgJykgOiB2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLnRvSlNPTigpKS5tYXAoKFtoZWFkZXIsIHZhbHVlXSkgPT4gaGVhZGVyICsgJzogJyArIHZhbHVlKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIGdldFNldENvb2tpZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoXCJzZXQtY29va2llXCIpIHx8IFtdO1xuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiAnQXhpb3NIZWFkZXJzJztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tKHRoaW5nKSB7XG4gICAgcmV0dXJuIHRoaW5nIGluc3RhbmNlb2YgdGhpcyA/IHRoaW5nIDogbmV3IHRoaXModGhpbmcpO1xuICB9XG5cbiAgc3RhdGljIGNvbmNhdChmaXJzdCwgLi4udGFyZ2V0cykge1xuICAgIGNvbnN0IGNvbXB1dGVkID0gbmV3IHRoaXMoZmlyc3QpO1xuXG4gICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IGNvbXB1dGVkLnNldCh0YXJnZXQpKTtcblxuICAgIHJldHVybiBjb21wdXRlZDtcbiAgfVxuXG4gIHN0YXRpYyBhY2Nlc3NvcihoZWFkZXIpIHtcbiAgICBjb25zdCBpbnRlcm5hbHMgPSB0aGlzWyRpbnRlcm5hbHNdID0gKHRoaXNbJGludGVybmFsc10gPSB7XG4gICAgICBhY2Nlc3NvcnM6IHt9XG4gICAgfSk7XG5cbiAgICBjb25zdCBhY2Nlc3NvcnMgPSBpbnRlcm5hbHMuYWNjZXNzb3JzO1xuICAgIGNvbnN0IHByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuXG4gICAgZnVuY3Rpb24gZGVmaW5lQWNjZXNzb3IoX2hlYWRlcikge1xuICAgICAgY29uc3QgbEhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKCFhY2Nlc3NvcnNbbEhlYWRlcl0pIHtcbiAgICAgICAgYnVpbGRBY2Nlc3NvcnMocHJvdG90eXBlLCBfaGVhZGVyKTtcbiAgICAgICAgYWNjZXNzb3JzW2xIZWFkZXJdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1dGlscy5pc0FycmF5KGhlYWRlcikgPyBoZWFkZXIuZm9yRWFjaChkZWZpbmVBY2Nlc3NvcikgOiBkZWZpbmVBY2Nlc3NvcihoZWFkZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQXhpb3NIZWFkZXJzLmFjY2Vzc29yKFsnQ29udGVudC1UeXBlJywgJ0NvbnRlbnQtTGVuZ3RoJywgJ0FjY2VwdCcsICdBY2NlcHQtRW5jb2RpbmcnLCAnVXNlci1BZ2VudCcsICdBdXRob3JpemF0aW9uJ10pO1xuXG4vLyByZXNlcnZlZCBuYW1lcyBob3RmaXhcbnV0aWxzLnJlZHVjZURlc2NyaXB0b3JzKEF4aW9zSGVhZGVycy5wcm90b3R5cGUsICh7dmFsdWV9LCBrZXkpID0+IHtcbiAgbGV0IG1hcHBlZCA9IGtleVswXS50b1VwcGVyQ2FzZSgpICsga2V5LnNsaWNlKDEpOyAvLyBtYXAgYHNldGAgPT4gYFNldGBcbiAgcmV0dXJuIHtcbiAgICBnZXQ6ICgpID0+IHZhbHVlLFxuICAgIHNldChoZWFkZXJWYWx1ZSkge1xuICAgICAgdGhpc1ttYXBwZWRdID0gaGVhZGVyVmFsdWU7XG4gICAgfVxuICB9XG59KTtcblxudXRpbHMuZnJlZXplTWV0aG9kcyhBeGlvc0hlYWRlcnMpO1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc0hlYWRlcnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy9pbmRleC5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHBhcmFtIHs/T2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2Ugb2JqZWN0XG4gKlxuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGZucywgcmVzcG9uc2UpIHtcbiAgY29uc3QgY29uZmlnID0gdGhpcyB8fCBkZWZhdWx0cztcbiAgY29uc3QgY29udGV4dCA9IHJlc3BvbnNlIHx8IGNvbmZpZztcbiAgY29uc3QgaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKGNvbnRleHQuaGVhZGVycyk7XG4gIGxldCBkYXRhID0gY29udGV4dC5kYXRhO1xuXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4uY2FsbChjb25maWcsIGRhdGEsIGhlYWRlcnMubm9ybWFsaXplKCksIHJlc3BvbnNlID8gcmVzcG9uc2Uuc3RhdHVzIDogdW5kZWZpbmVkKTtcbiAgfSk7XG5cbiAgaGVhZGVycy5ub3JtYWxpemUoKTtcblxuICByZXR1cm4gZGF0YTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBBIGBDYW5jZWxlZEVycm9yYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3Q9fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gcmVxdWVzdCBUaGUgcmVxdWVzdC5cbiAqXG4gKiBAcmV0dXJucyB7Q2FuY2VsZWRFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbGVkRXJyb3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBBeGlvc0Vycm9yLmNhbGwodGhpcywgbWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVELCBjb25maWcsIHJlcXVlc3QpO1xuICB0aGlzLm5hbWUgPSAnQ2FuY2VsZWRFcnJvcic7XG59XG5cbnV0aWxzLmluaGVyaXRzKENhbmNlbGVkRXJyb3IsIEF4aW9zRXJyb3IsIHtcbiAgX19DQU5DRUxfXzogdHJ1ZVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENhbmNlbGVkRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vQXhpb3NFcnJvci5qcyc7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge29iamVjdH0gVGhlIHJlc3BvbnNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICBjb25zdCB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgW0F4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0VdW01hdGguZmxvb3IocmVzcG9uc2Uuc3RhdHVzIC8gMTAwKSAtIDRdLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VQcm90b2NvbCh1cmwpIHtcbiAgY29uc3QgbWF0Y2ggPSAvXihbLStcXHddezEsMjV9KSg6P1xcL1xcL3w6KS8uZXhlYyh1cmwpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV0gfHwgJyc7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2FsY3VsYXRlIGRhdGEgbWF4UmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtzYW1wbGVzQ291bnQ9IDEwXVxuICogQHBhcmFtIHtOdW1iZXJ9IFttaW49IDEwMDBdXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHNwZWVkb21ldGVyKHNhbXBsZXNDb3VudCwgbWluKSB7XG4gIHNhbXBsZXNDb3VudCA9IHNhbXBsZXNDb3VudCB8fCAxMDtcbiAgY29uc3QgYnl0ZXMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgY29uc3QgdGltZXN0YW1wcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBsZXQgaGVhZCA9IDA7XG4gIGxldCB0YWlsID0gMDtcbiAgbGV0IGZpcnN0U2FtcGxlVFM7XG5cbiAgbWluID0gbWluICE9PSB1bmRlZmluZWQgPyBtaW4gOiAxMDAwO1xuXG4gIHJldHVybiBmdW5jdGlvbiBwdXNoKGNodW5rTGVuZ3RoKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHRpbWVzdGFtcHNbdGFpbF07XG5cbiAgICBpZiAoIWZpcnN0U2FtcGxlVFMpIHtcbiAgICAgIGZpcnN0U2FtcGxlVFMgPSBub3c7XG4gICAgfVxuXG4gICAgYnl0ZXNbaGVhZF0gPSBjaHVua0xlbmd0aDtcbiAgICB0aW1lc3RhbXBzW2hlYWRdID0gbm93O1xuXG4gICAgbGV0IGkgPSB0YWlsO1xuICAgIGxldCBieXRlc0NvdW50ID0gMDtcblxuICAgIHdoaWxlIChpICE9PSBoZWFkKSB7XG4gICAgICBieXRlc0NvdW50ICs9IGJ5dGVzW2krK107XG4gICAgICBpID0gaSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBoZWFkID0gKGhlYWQgKyAxKSAlIHNhbXBsZXNDb3VudDtcblxuICAgIGlmIChoZWFkID09PSB0YWlsKSB7XG4gICAgICB0YWlsID0gKHRhaWwgKyAxKSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBpZiAobm93IC0gZmlyc3RTYW1wbGVUUyA8IG1pbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhc3NlZCA9IHN0YXJ0ZWRBdCAmJiBub3cgLSBzdGFydGVkQXQ7XG5cbiAgICByZXR1cm4gcGFzc2VkID8gTWF0aC5yb3VuZChieXRlc0NvdW50ICogMTAwMCAvIHBhc3NlZCkgOiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNwZWVkb21ldGVyO1xuIiwiLyoqXG4gKiBUaHJvdHRsZSBkZWNvcmF0b3JcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge051bWJlcn0gZnJlcVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZuLCBmcmVxKSB7XG4gIGxldCB0aW1lc3RhbXAgPSAwO1xuICBsZXQgdGhyZXNob2xkID0gMTAwMCAvIGZyZXE7XG4gIGxldCBsYXN0QXJncztcbiAgbGV0IHRpbWVyO1xuXG4gIGNvbnN0IGludm9rZSA9IChhcmdzLCBub3cgPSBEYXRlLm5vdygpKSA9PiB7XG4gICAgdGltZXN0YW1wID0gbm93O1xuICAgIGxhc3RBcmdzID0gbnVsbDtcbiAgICBpZiAodGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgfVxuICAgIGZuKC4uLmFyZ3MpO1xuICB9XG5cbiAgY29uc3QgdGhyb3R0bGVkID0gKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHBhc3NlZCA9IG5vdyAtIHRpbWVzdGFtcDtcbiAgICBpZiAoIHBhc3NlZCA+PSB0aHJlc2hvbGQpIHtcbiAgICAgIGludm9rZShhcmdzLCBub3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0QXJncyA9IGFyZ3M7XG4gICAgICBpZiAoIXRpbWVyKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICAgIGludm9rZShsYXN0QXJncylcbiAgICAgICAgfSwgdGhyZXNob2xkIC0gcGFzc2VkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBmbHVzaCA9ICgpID0+IGxhc3RBcmdzICYmIGludm9rZShsYXN0QXJncyk7XG5cbiAgcmV0dXJuIFt0aHJvdHRsZWQsIGZsdXNoXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGhyb3R0bGU7XG4iLCJpbXBvcnQgc3BlZWRvbWV0ZXIgZnJvbSBcIi4vc3BlZWRvbWV0ZXIuanNcIjtcbmltcG9ydCB0aHJvdHRsZSBmcm9tIFwiLi90aHJvdHRsZS5qc1wiO1xuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy5qc1wiO1xuXG5leHBvcnQgY29uc3QgcHJvZ3Jlc3NFdmVudFJlZHVjZXIgPSAobGlzdGVuZXIsIGlzRG93bmxvYWRTdHJlYW0sIGZyZXEgPSAzKSA9PiB7XG4gIGxldCBieXRlc05vdGlmaWVkID0gMDtcbiAgY29uc3QgX3NwZWVkb21ldGVyID0gc3BlZWRvbWV0ZXIoNTAsIDI1MCk7XG5cbiAgcmV0dXJuIHRocm90dGxlKGUgPT4ge1xuICAgIGNvbnN0IGxvYWRlZCA9IGUubG9hZGVkO1xuICAgIGNvbnN0IHRvdGFsID0gZS5sZW5ndGhDb21wdXRhYmxlID8gZS50b3RhbCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwcm9ncmVzc0J5dGVzID0gbG9hZGVkIC0gYnl0ZXNOb3RpZmllZDtcbiAgICBjb25zdCByYXRlID0gX3NwZWVkb21ldGVyKHByb2dyZXNzQnl0ZXMpO1xuICAgIGNvbnN0IGluUmFuZ2UgPSBsb2FkZWQgPD0gdG90YWw7XG5cbiAgICBieXRlc05vdGlmaWVkID0gbG9hZGVkO1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGxvYWRlZCxcbiAgICAgIHRvdGFsLFxuICAgICAgcHJvZ3Jlc3M6IHRvdGFsID8gKGxvYWRlZCAvIHRvdGFsKSA6IHVuZGVmaW5lZCxcbiAgICAgIGJ5dGVzOiBwcm9ncmVzc0J5dGVzLFxuICAgICAgcmF0ZTogcmF0ZSA/IHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBlc3RpbWF0ZWQ6IHJhdGUgJiYgdG90YWwgJiYgaW5SYW5nZSA/ICh0b3RhbCAtIGxvYWRlZCkgLyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXZlbnQ6IGUsXG4gICAgICBsZW5ndGhDb21wdXRhYmxlOiB0b3RhbCAhPSBudWxsLFxuICAgICAgW2lzRG93bmxvYWRTdHJlYW0gPyAnZG93bmxvYWQnIDogJ3VwbG9hZCddOiB0cnVlXG4gICAgfTtcblxuICAgIGxpc3RlbmVyKGRhdGEpO1xuICB9LCBmcmVxKTtcbn1cblxuZXhwb3J0IGNvbnN0IHByb2dyZXNzRXZlbnREZWNvcmF0b3IgPSAodG90YWwsIHRocm90dGxlZCkgPT4ge1xuICBjb25zdCBsZW5ndGhDb21wdXRhYmxlID0gdG90YWwgIT0gbnVsbDtcblxuICByZXR1cm4gWyhsb2FkZWQpID0+IHRocm90dGxlZFswXSh7XG4gICAgbGVuZ3RoQ29tcHV0YWJsZSxcbiAgICB0b3RhbCxcbiAgICBsb2FkZWRcbiAgfSksIHRocm90dGxlZFsxXV07XG59XG5cbmV4cG9ydCBjb25zdCBhc3luY0RlY29yYXRvciA9IChmbikgPT4gKC4uLmFyZ3MpID0+IHV0aWxzLmFzYXAoKCkgPT4gZm4oLi4uYXJncykpO1xuIiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52ID8gKChvcmlnaW4sIGlzTVNJRSkgPT4gKHVybCkgPT4ge1xuICB1cmwgPSBuZXcgVVJMKHVybCwgcGxhdGZvcm0ub3JpZ2luKTtcblxuICByZXR1cm4gKFxuICAgIG9yaWdpbi5wcm90b2NvbCA9PT0gdXJsLnByb3RvY29sICYmXG4gICAgb3JpZ2luLmhvc3QgPT09IHVybC5ob3N0ICYmXG4gICAgKGlzTVNJRSB8fCBvcmlnaW4ucG9ydCA9PT0gdXJsLnBvcnQpXG4gICk7XG59KShcbiAgbmV3IFVSTChwbGF0Zm9ybS5vcmlnaW4pLFxuICBwbGF0Zm9ybS5uYXZpZ2F0b3IgJiYgLyhtc2llfHRyaWRlbnQpL2kudGVzdChwbGF0Zm9ybS5uYXZpZ2F0b3IudXNlckFnZW50KVxuKSA6ICgpID0+IHRydWU7XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICB7XG4gICAgd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICBjb25zdCBjb29raWUgPSBbbmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSldO1xuXG4gICAgICB1dGlscy5pc051bWJlcihleHBpcmVzKSAmJiBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG5cbiAgICAgIHV0aWxzLmlzU3RyaW5nKHBhdGgpICYmIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcblxuICAgICAgdXRpbHMuaXNTdHJpbmcoZG9tYWluKSAmJiBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuXG4gICAgICBzZWN1cmUgPT09IHRydWUgJiYgY29va2llLnB1c2goJ3NlY3VyZScpO1xuXG4gICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICB9LFxuXG4gICAgcmVhZChuYW1lKSB7XG4gICAgICBjb25zdCBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgIH0sXG5cbiAgICByZW1vdmUobmFtZSkge1xuICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICB9XG4gIH1cblxuICA6XG5cbiAgLy8gTm9uLXN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICB7XG4gICAgd3JpdGUoKSB7fSxcbiAgICByZWFkKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICByZW1vdmUoKSB7fVxuICB9O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkK1xcLS5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLz9cXC8kLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpc0Fic29sdXRlVVJMIGZyb20gJy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyc7XG5pbXBvcnQgY29tYmluZVVSTHMgZnJvbSAnLi4vaGVscGVycy9jb21iaW5lVVJMcy5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCwgYWxsb3dBYnNvbHV0ZVVybHMpIHtcbiAgbGV0IGlzUmVsYXRpdmVVcmwgPSAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpO1xuICBpZiAoYmFzZVVSTCAmJiAoaXNSZWxhdGl2ZVVybCB8fCBhbGxvd0Fic29sdXRlVXJscyA9PSBmYWxzZSkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi9BeGlvc0hlYWRlcnMuanNcIjtcblxuY29uc3QgaGVhZGVyc1RvT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyBpbnN0YW5jZW9mIEF4aW9zSGVhZGVycyA/IHsgLi4udGhpbmcgfSA6IHRoaW5nO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICBjb25zdCBjb25maWcgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSwgcHJvcCwgY2FzZWxlc3MpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlLmNhbGwoe2Nhc2VsZXNzfSwgdGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKGEsIGIsIHByb3AgLCBjYXNlbGVzcykge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYikpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiLCBwcm9wICwgY2FzZWxlc3MpO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGEpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhLCBwcm9wICwgY2FzZWxlc3MpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURpcmVjdEtleXMoYSwgYiwgcHJvcCkge1xuICAgIGlmIChwcm9wIGluIGNvbmZpZzIpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWVyZ2VNYXAgPSB7XG4gICAgdXJsOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIG1ldGhvZDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBkYXRhOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGJhc2VVUkw6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVxdWVzdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXNwb25zZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBwYXJhbXNTZXJpYWxpemVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dE1lc3NhZ2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aENyZWRlbnRpYWxzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhYU1JGVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYWRhcHRlcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICByZXNwb25zZVR5cGU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkNvb2tpZU5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkhlYWRlck5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25VcGxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgZGVjb21wcmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhDb250ZW50TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heEJvZHlMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYmVmb3JlUmVkaXJlY3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNwb3J0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwc0FnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGNhbmNlbFRva2VuOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHNvY2tldFBhdGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VFbmNvZGluZzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB2YWxpZGF0ZVN0YXR1czogbWVyZ2VEaXJlY3RLZXlzLFxuICAgIGhlYWRlcnM6IChhLCBiICwgcHJvcCkgPT4gbWVyZ2VEZWVwUHJvcGVydGllcyhoZWFkZXJzVG9PYmplY3QoYSksIGhlYWRlcnNUb09iamVjdChiKSxwcm9wLCB0cnVlKVxuICB9O1xuXG4gIHV0aWxzLmZvckVhY2goT2JqZWN0LmtleXMoey4uLmNvbmZpZzEsIC4uLmNvbmZpZzJ9KSwgZnVuY3Rpb24gY29tcHV0ZUNvbmZpZ1ZhbHVlKHByb3ApIHtcbiAgICBjb25zdCBtZXJnZSA9IG1lcmdlTWFwW3Byb3BdIHx8IG1lcmdlRGVlcFByb3BlcnRpZXM7XG4gICAgY29uc3QgY29uZmlnVmFsdWUgPSBtZXJnZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdLCBwcm9wKTtcbiAgICAodXRpbHMuaXNVbmRlZmluZWQoY29uZmlnVmFsdWUpICYmIG1lcmdlICE9PSBtZXJnZURpcmVjdEtleXMpIHx8IChjb25maWdbcHJvcF0gPSBjb25maWdWYWx1ZSk7XG4gIH0pO1xuXG4gIHJldHVybiBjb25maWc7XG59XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSBcIi4uL3BsYXRmb3JtL2luZGV4LmpzXCI7XG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzLmpzXCI7XG5pbXBvcnQgaXNVUkxTYW1lT3JpZ2luIGZyb20gXCIuL2lzVVJMU2FtZU9yaWdpbi5qc1wiO1xuaW1wb3J0IGNvb2tpZXMgZnJvbSBcIi4vY29va2llcy5qc1wiO1xuaW1wb3J0IGJ1aWxkRnVsbFBhdGggZnJvbSBcIi4uL2NvcmUvYnVpbGRGdWxsUGF0aC5qc1wiO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gXCIuLi9jb3JlL21lcmdlQ29uZmlnLmpzXCI7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gXCIuLi9jb3JlL0F4aW9zSGVhZGVycy5qc1wiO1xuaW1wb3J0IGJ1aWxkVVJMIGZyb20gXCIuL2J1aWxkVVJMLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChjb25maWcpID0+IHtcbiAgY29uc3QgbmV3Q29uZmlnID0gbWVyZ2VDb25maWcoe30sIGNvbmZpZyk7XG5cbiAgbGV0IHsgZGF0YSwgd2l0aFhTUkZUb2tlbiwgeHNyZkhlYWRlck5hbWUsIHhzcmZDb29raWVOYW1lLCBoZWFkZXJzLCBhdXRoIH0gPSBuZXdDb25maWc7XG5cbiAgbmV3Q29uZmlnLmhlYWRlcnMgPSBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oaGVhZGVycyk7XG5cbiAgbmV3Q29uZmlnLnVybCA9IGJ1aWxkVVJMKGJ1aWxkRnVsbFBhdGgobmV3Q29uZmlnLmJhc2VVUkwsIG5ld0NvbmZpZy51cmwsIG5ld0NvbmZpZy5hbGxvd0Fic29sdXRlVXJscyksIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKTtcblxuICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gIGlmIChhdXRoKSB7XG4gICAgaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArXG4gICAgICBidG9hKChhdXRoLnVzZXJuYW1lIHx8ICcnKSArICc6JyArIChhdXRoLnBhc3N3b3JkID8gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGF1dGgucGFzc3dvcmQpKSA6ICcnKSlcbiAgICApO1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkpIHtcbiAgICBpZiAocGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52IHx8IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudikge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSh1bmRlZmluZWQpOyAvLyBicm93c2VyIGhhbmRsZXMgaXRcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzRnVuY3Rpb24oZGF0YS5nZXRIZWFkZXJzKSkge1xuICAgICAgLy8gTm9kZS5qcyBGb3JtRGF0YSAobGlrZSBmb3JtLWRhdGEgcGFja2FnZSlcbiAgICAgIGNvbnN0IGZvcm1IZWFkZXJzID0gZGF0YS5nZXRIZWFkZXJzKCk7XG4gICAgICAvLyBPbmx5IHNldCBzYWZlIGhlYWRlcnMgdG8gYXZvaWQgb3ZlcndyaXRpbmcgc2VjdXJpdHkgaGVhZGVyc1xuICAgICAgY29uc3QgYWxsb3dlZEhlYWRlcnMgPSBbJ2NvbnRlbnQtdHlwZScsICdjb250ZW50LWxlbmd0aCddO1xuICAgICAgT2JqZWN0LmVudHJpZXMoZm9ybUhlYWRlcnMpLmZvckVhY2goKFtrZXksIHZhbF0pID0+IHtcbiAgICAgICAgaWYgKGFsbG93ZWRIZWFkZXJzLmluY2x1ZGVzKGtleS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgIGhlYWRlcnMuc2V0KGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9ICBcblxuICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG5cbiAgaWYgKHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudikge1xuICAgIHdpdGhYU1JGVG9rZW4gJiYgdXRpbHMuaXNGdW5jdGlvbih3aXRoWFNSRlRva2VuKSAmJiAod2l0aFhTUkZUb2tlbiA9IHdpdGhYU1JGVG9rZW4obmV3Q29uZmlnKSk7XG5cbiAgICBpZiAod2l0aFhTUkZUb2tlbiB8fCAod2l0aFhTUkZUb2tlbiAhPT0gZmFsc2UgJiYgaXNVUkxTYW1lT3JpZ2luKG5ld0NvbmZpZy51cmwpKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICBjb25zdCB4c3JmVmFsdWUgPSB4c3JmSGVhZGVyTmFtZSAmJiB4c3JmQ29va2llTmFtZSAmJiBjb29raWVzLnJlYWQoeHNyZkNvb2tpZU5hbWUpO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0KHhzcmZIZWFkZXJOYW1lLCB4c3JmVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdDb25maWc7XG59XG5cbiIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBzZXR0bGUgZnJvbSAnLi8uLi9jb3JlL3NldHRsZS5qcyc7XG5pbXBvcnQgdHJhbnNpdGlvbmFsRGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XG5pbXBvcnQgcGFyc2VQcm90b2NvbCBmcm9tICcuLi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wuanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IHtwcm9ncmVzc0V2ZW50UmVkdWNlcn0gZnJvbSAnLi4vaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyc7XG5pbXBvcnQgcmVzb2x2ZUNvbmZpZyBmcm9tIFwiLi4vaGVscGVycy9yZXNvbHZlQ29uZmlnLmpzXCI7XG5cbmNvbnN0IGlzWEhSQWRhcHRlclN1cHBvcnRlZCA9IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGlzWEhSQWRhcHRlclN1cHBvcnRlZCAmJiBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgY29uc3QgX2NvbmZpZyA9IHJlc29sdmVDb25maWcoY29uZmlnKTtcbiAgICBsZXQgcmVxdWVzdERhdGEgPSBfY29uZmlnLmRhdGE7XG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShfY29uZmlnLmhlYWRlcnMpLm5vcm1hbGl6ZSgpO1xuICAgIGxldCB7cmVzcG9uc2VUeXBlLCBvblVwbG9hZFByb2dyZXNzLCBvbkRvd25sb2FkUHJvZ3Jlc3N9ID0gX2NvbmZpZztcbiAgICBsZXQgb25DYW5jZWxlZDtcbiAgICBsZXQgdXBsb2FkVGhyb3R0bGVkLCBkb3dubG9hZFRocm90dGxlZDtcbiAgICBsZXQgZmx1c2hVcGxvYWQsIGZsdXNoRG93bmxvYWQ7XG5cbiAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgZmx1c2hVcGxvYWQgJiYgZmx1c2hVcGxvYWQoKTsgLy8gZmx1c2ggZXZlbnRzXG4gICAgICBmbHVzaERvd25sb2FkICYmIGZsdXNoRG93bmxvYWQoKTsgLy8gZmx1c2ggZXZlbnRzXG5cbiAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4gJiYgX2NvbmZpZy5jYW5jZWxUb2tlbi51bnN1YnNjcmliZShvbkNhbmNlbGVkKTtcblxuICAgICAgX2NvbmZpZy5zaWduYWwgJiYgX2NvbmZpZy5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICB9XG5cbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgcmVxdWVzdC5vcGVuKF9jb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIF9jb25maWcudXJsLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gX2NvbmZpZy50aW1lb3V0O1xuXG4gICAgZnVuY3Rpb24gb25sb2FkZW5kKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICBjb25zdCByZXNwb25zZUhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShcbiAgICAgICAgJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCAmJiByZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG4gICAgICApO1xuICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09ICd0ZXh0JyB8fCByZXNwb25zZVR5cGUgPT09ICdqc29uJyA/XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShmdW5jdGlvbiBfcmVzb2x2ZSh2YWx1ZSkge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSwgZnVuY3Rpb24gX3JlamVjdChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCdvbmxvYWRlbmQnIGluIHJlcXVlc3QpIHtcbiAgICAgIC8vIFVzZSBvbmxvYWRlbmQgaWYgYXZhaWxhYmxlXG4gICAgICByZXF1ZXN0Lm9ubG9hZGVuZCA9IG9ubG9hZGVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZSB0byBlbXVsYXRlIG9ubG9hZGVuZFxuICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlYWR5c3RhdGUgaGFuZGxlciBpcyBjYWxsaW5nIGJlZm9yZSBvbmVycm9yIG9yIG9udGltZW91dCBoYW5kbGVycyxcbiAgICAgICAgLy8gc28gd2Ugc2hvdWxkIGNhbGwgb25sb2FkZW5kIG9uIHRoZSBuZXh0ICd0aWNrJ1xuICAgICAgICBzZXRUaW1lb3V0KG9ubG9hZGVuZCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsIGNvbmZpZywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcihldmVudCkge1xuICAgICAgIC8vIEJyb3dzZXJzIGRlbGl2ZXIgYSBQcm9ncmVzc0V2ZW50IGluIFhIUiBvbmVycm9yXG4gICAgICAgLy8gKG1lc3NhZ2UgbWF5IGJlIGVtcHR5OyB3aGVuIHByZXNlbnQsIHN1cmZhY2UgaXQpXG4gICAgICAgLy8gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvV2ViL0FQSS9YTUxIdHRwUmVxdWVzdC9lcnJvcl9ldmVudFxuICAgICAgIGNvbnN0IG1zZyA9IGV2ZW50ICYmIGV2ZW50Lm1lc3NhZ2UgPyBldmVudC5tZXNzYWdlIDogJ05ldHdvcmsgRXJyb3InO1xuICAgICAgIGNvbnN0IGVyciA9IG5ldyBBeGlvc0Vycm9yKG1zZywgQXhpb3NFcnJvci5FUlJfTkVUV09SSywgY29uZmlnLCByZXF1ZXN0KTtcbiAgICAgICAvLyBhdHRhY2ggdGhlIHVuZGVybHlpbmcgZXZlbnQgZm9yIGNvbnN1bWVycyB3aG8gd2FudCBkZXRhaWxzXG4gICAgICAgZXJyLmV2ZW50ID0gZXZlbnQgfHwgbnVsbDtcbiAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuICAgIFxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgbGV0IHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBfY29uZmlnLnRpbWVvdXQgPyAndGltZW91dCBvZiAnICsgX2NvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyA6ICd0aW1lb3V0IGV4Y2VlZGVkJztcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IF9jb25maWcudHJhbnNpdGlvbmFsIHx8IHRyYW5zaXRpb25hbERlZmF1bHRzO1xuICAgICAgaWYgKF9jb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gX2NvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgfVxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlLFxuICAgICAgICB0cmFuc2l0aW9uYWwuY2xhcmlmeVRpbWVvdXRFcnJvciA/IEF4aW9zRXJyb3IuRVRJTUVET1VUIDogQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgIHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQgJiYgcmVxdWVzdEhlYWRlcnMuc2V0Q29udGVudFR5cGUobnVsbCk7XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycy50b0pTT04oKSwgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoX2NvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhX2NvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChyZXNwb25zZVR5cGUgJiYgcmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gX2NvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmIChvbkRvd25sb2FkUHJvZ3Jlc3MpIHtcbiAgICAgIChbZG93bmxvYWRUaHJvdHRsZWQsIGZsdXNoRG93bmxvYWRdID0gcHJvZ3Jlc3NFdmVudFJlZHVjZXIob25Eb3dubG9hZFByb2dyZXNzLCB0cnVlKSk7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZG93bmxvYWRUaHJvdHRsZWQpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKG9uVXBsb2FkUHJvZ3Jlc3MgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIChbdXBsb2FkVGhyb3R0bGVkLCBmbHVzaFVwbG9hZF0gPSBwcm9ncmVzc0V2ZW50UmVkdWNlcihvblVwbG9hZFByb2dyZXNzKSk7XG5cbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgdXBsb2FkVGhyb3R0bGVkKTtcblxuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsIGZsdXNoVXBsb2FkKTtcbiAgICB9XG5cbiAgICBpZiAoX2NvbmZpZy5jYW5jZWxUb2tlbiB8fCBfY29uZmlnLnNpZ25hbCkge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIG9uQ2FuY2VsZWQgPSBjYW5jZWwgPT4ge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVqZWN0KCFjYW5jZWwgfHwgY2FuY2VsLnR5cGUgPyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcsIHJlcXVlc3QpIDogY2FuY2VsKTtcbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH07XG5cbiAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4gJiYgX2NvbmZpZy5jYW5jZWxUb2tlbi5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG4gICAgICBpZiAoX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgX2NvbmZpZy5zaWduYWwuYWJvcnRlZCA/IG9uQ2FuY2VsZWQoKSA6IF9jb25maWcuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcHJvdG9jb2wgPSBwYXJzZVByb3RvY29sKF9jb25maWcudXJsKTtcblxuICAgIGlmIChwcm90b2NvbCAmJiBwbGF0Zm9ybS5wcm90b2NvbHMuaW5kZXhPZihwcm90b2NvbCkgPT09IC0xKSB7XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1Vuc3VwcG9ydGVkIHByb3RvY29sICcgKyBwcm90b2NvbCArICc6JywgQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIGNvbmZpZykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSB8fCBudWxsKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tIFwiLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanNcIjtcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gXCIuLi9jb3JlL0F4aW9zRXJyb3IuanNcIjtcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5cbmNvbnN0IGNvbXBvc2VTaWduYWxzID0gKHNpZ25hbHMsIHRpbWVvdXQpID0+IHtcbiAgY29uc3Qge2xlbmd0aH0gPSAoc2lnbmFscyA9IHNpZ25hbHMgPyBzaWduYWxzLmZpbHRlcihCb29sZWFuKSA6IFtdKTtcblxuICBpZiAodGltZW91dCB8fCBsZW5ndGgpIHtcbiAgICBsZXQgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICAgIGxldCBhYm9ydGVkO1xuXG4gICAgY29uc3Qgb25hYm9ydCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIGlmICghYWJvcnRlZCkge1xuICAgICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgY29uc3QgZXJyID0gcmVhc29uIGluc3RhbmNlb2YgRXJyb3IgPyByZWFzb24gOiB0aGlzLnJlYXNvbjtcbiAgICAgICAgY29udHJvbGxlci5hYm9ydChlcnIgaW5zdGFuY2VvZiBBeGlvc0Vycm9yID8gZXJyIDogbmV3IENhbmNlbGVkRXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6IGVycikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCB0aW1lciA9IHRpbWVvdXQgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgICBvbmFib3J0KG5ldyBBeGlvc0Vycm9yKGB0aW1lb3V0ICR7dGltZW91dH0gb2YgbXMgZXhjZWVkZWRgLCBBeGlvc0Vycm9yLkVUSU1FRE9VVCkpXG4gICAgfSwgdGltZW91dClcblxuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gKCkgPT4ge1xuICAgICAgaWYgKHNpZ25hbHMpIHtcbiAgICAgICAgdGltZXIgJiYgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICBzaWduYWxzLmZvckVhY2goc2lnbmFsID0+IHtcbiAgICAgICAgICBzaWduYWwudW5zdWJzY3JpYmUgPyBzaWduYWwudW5zdWJzY3JpYmUob25hYm9ydCkgOiBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbmFib3J0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNpZ25hbHMgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbmFib3J0KSk7XG5cbiAgICBjb25zdCB7c2lnbmFsfSA9IGNvbnRyb2xsZXI7XG5cbiAgICBzaWduYWwudW5zdWJzY3JpYmUgPSAoKSA9PiB1dGlscy5hc2FwKHVuc3Vic2NyaWJlKTtcblxuICAgIHJldHVybiBzaWduYWw7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tcG9zZVNpZ25hbHM7XG4iLCJcbmV4cG9ydCBjb25zdCBzdHJlYW1DaHVuayA9IGZ1bmN0aW9uKiAoY2h1bmssIGNodW5rU2l6ZSkge1xuICBsZXQgbGVuID0gY2h1bmsuYnl0ZUxlbmd0aDtcblxuICBpZiAoIWNodW5rU2l6ZSB8fCBsZW4gPCBjaHVua1NpemUpIHtcbiAgICB5aWVsZCBjaHVuaztcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgcG9zID0gMDtcbiAgbGV0IGVuZDtcblxuICB3aGlsZSAocG9zIDwgbGVuKSB7XG4gICAgZW5kID0gcG9zICsgY2h1bmtTaXplO1xuICAgIHlpZWxkIGNodW5rLnNsaWNlKHBvcywgZW5kKTtcbiAgICBwb3MgPSBlbmQ7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlYWRCeXRlcyA9IGFzeW5jIGZ1bmN0aW9uKiAoaXRlcmFibGUsIGNodW5rU2l6ZSkge1xuICBmb3IgYXdhaXQgKGNvbnN0IGNodW5rIG9mIHJlYWRTdHJlYW0oaXRlcmFibGUpKSB7XG4gICAgeWllbGQqIHN0cmVhbUNodW5rKGNodW5rLCBjaHVua1NpemUpO1xuICB9XG59XG5cbmNvbnN0IHJlYWRTdHJlYW0gPSBhc3luYyBmdW5jdGlvbiogKHN0cmVhbSkge1xuICBpZiAoc3RyZWFtW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSkge1xuICAgIHlpZWxkKiBzdHJlYW07XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcmVhZGVyID0gc3RyZWFtLmdldFJlYWRlcigpO1xuICB0cnkge1xuICAgIGZvciAoOzspIHtcbiAgICAgIGNvbnN0IHtkb25lLCB2YWx1ZX0gPSBhd2FpdCByZWFkZXIucmVhZCgpO1xuICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB5aWVsZCB2YWx1ZTtcbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgYXdhaXQgcmVhZGVyLmNhbmNlbCgpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCB0cmFja1N0cmVhbSA9IChzdHJlYW0sIGNodW5rU2l6ZSwgb25Qcm9ncmVzcywgb25GaW5pc2gpID0+IHtcbiAgY29uc3QgaXRlcmF0b3IgPSByZWFkQnl0ZXMoc3RyZWFtLCBjaHVua1NpemUpO1xuXG4gIGxldCBieXRlcyA9IDA7XG4gIGxldCBkb25lO1xuICBsZXQgX29uRmluaXNoID0gKGUpID0+IHtcbiAgICBpZiAoIWRvbmUpIHtcbiAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgb25GaW5pc2ggJiYgb25GaW5pc2goZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBSZWFkYWJsZVN0cmVhbSh7XG4gICAgYXN5bmMgcHVsbChjb250cm9sbGVyKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7ZG9uZSwgdmFsdWV9ID0gYXdhaXQgaXRlcmF0b3IubmV4dCgpO1xuXG4gICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICBfb25GaW5pc2goKTtcbiAgICAgICAgICBjb250cm9sbGVyLmNsb3NlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxlbiA9IHZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgICAgIGlmIChvblByb2dyZXNzKSB7XG4gICAgICAgICAgbGV0IGxvYWRlZEJ5dGVzID0gYnl0ZXMgKz0gbGVuO1xuICAgICAgICAgIG9uUHJvZ3Jlc3MobG9hZGVkQnl0ZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShuZXcgVWludDhBcnJheSh2YWx1ZSkpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9vbkZpbmlzaChlcnIpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfSxcbiAgICBjYW5jZWwocmVhc29uKSB7XG4gICAgICBfb25GaW5pc2gocmVhc29uKTtcbiAgICAgIHJldHVybiBpdGVyYXRvci5yZXR1cm4oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBoaWdoV2F0ZXJNYXJrOiAyXG4gIH0pXG59XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSBcIi4uL3BsYXRmb3JtL2luZGV4LmpzXCI7XG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzLmpzXCI7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tIFwiLi4vY29yZS9BeGlvc0Vycm9yLmpzXCI7XG5pbXBvcnQgY29tcG9zZVNpZ25hbHMgZnJvbSBcIi4uL2hlbHBlcnMvY29tcG9zZVNpZ25hbHMuanNcIjtcbmltcG9ydCB7dHJhY2tTdHJlYW19IGZyb20gXCIuLi9oZWxwZXJzL3RyYWNrU3RyZWFtLmpzXCI7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gXCIuLi9jb3JlL0F4aW9zSGVhZGVycy5qc1wiO1xuaW1wb3J0IHtwcm9ncmVzc0V2ZW50UmVkdWNlciwgcHJvZ3Jlc3NFdmVudERlY29yYXRvciwgYXN5bmNEZWNvcmF0b3J9IGZyb20gXCIuLi9oZWxwZXJzL3Byb2dyZXNzRXZlbnRSZWR1Y2VyLmpzXCI7XG5pbXBvcnQgcmVzb2x2ZUNvbmZpZyBmcm9tIFwiLi4vaGVscGVycy9yZXNvbHZlQ29uZmlnLmpzXCI7XG5pbXBvcnQgc2V0dGxlIGZyb20gXCIuLi9jb3JlL3NldHRsZS5qc1wiO1xuXG5jb25zdCBERUZBVUxUX0NIVU5LX1NJWkUgPSA2NCAqIDEwMjQ7XG5cbmNvbnN0IHtpc0Z1bmN0aW9ufSA9IHV0aWxzO1xuXG5jb25zdCBnbG9iYWxGZXRjaEFQSSA9ICgoe1JlcXVlc3QsIFJlc3BvbnNlfSkgPT4gKHtcbiAgUmVxdWVzdCwgUmVzcG9uc2Vcbn0pKSh1dGlscy5nbG9iYWwpO1xuXG5jb25zdCB7XG4gIFJlYWRhYmxlU3RyZWFtLCBUZXh0RW5jb2RlclxufSA9IHV0aWxzLmdsb2JhbDtcblxuXG5jb25zdCB0ZXN0ID0gKGZuLCAuLi5hcmdzKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZm4oLi4uYXJncyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5jb25zdCBmYWN0b3J5ID0gKGVudikgPT4ge1xuICBlbnYgPSB1dGlscy5tZXJnZS5jYWxsKHtcbiAgICBza2lwVW5kZWZpbmVkOiB0cnVlXG4gIH0sIGdsb2JhbEZldGNoQVBJLCBlbnYpO1xuXG4gIGNvbnN0IHtmZXRjaDogZW52RmV0Y2gsIFJlcXVlc3QsIFJlc3BvbnNlfSA9IGVudjtcbiAgY29uc3QgaXNGZXRjaFN1cHBvcnRlZCA9IGVudkZldGNoID8gaXNGdW5jdGlvbihlbnZGZXRjaCkgOiB0eXBlb2YgZmV0Y2ggPT09ICdmdW5jdGlvbic7XG4gIGNvbnN0IGlzUmVxdWVzdFN1cHBvcnRlZCA9IGlzRnVuY3Rpb24oUmVxdWVzdCk7XG4gIGNvbnN0IGlzUmVzcG9uc2VTdXBwb3J0ZWQgPSBpc0Z1bmN0aW9uKFJlc3BvbnNlKTtcblxuICBpZiAoIWlzRmV0Y2hTdXBwb3J0ZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkID0gaXNGZXRjaFN1cHBvcnRlZCAmJiBpc0Z1bmN0aW9uKFJlYWRhYmxlU3RyZWFtKTtcblxuICBjb25zdCBlbmNvZGVUZXh0ID0gaXNGZXRjaFN1cHBvcnRlZCAmJiAodHlwZW9mIFRleHRFbmNvZGVyID09PSAnZnVuY3Rpb24nID9cbiAgICAgICgoZW5jb2RlcikgPT4gKHN0cikgPT4gZW5jb2Rlci5lbmNvZGUoc3RyKSkobmV3IFRleHRFbmNvZGVyKCkpIDpcbiAgICAgIGFzeW5jIChzdHIpID0+IG5ldyBVaW50OEFycmF5KGF3YWl0IG5ldyBSZXF1ZXN0KHN0cikuYXJyYXlCdWZmZXIoKSlcbiAgKTtcblxuICBjb25zdCBzdXBwb3J0c1JlcXVlc3RTdHJlYW0gPSBpc1JlcXVlc3RTdXBwb3J0ZWQgJiYgaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCAmJiB0ZXN0KCgpID0+IHtcbiAgICBsZXQgZHVwbGV4QWNjZXNzZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IGhhc0NvbnRlbnRUeXBlID0gbmV3IFJlcXVlc3QocGxhdGZvcm0ub3JpZ2luLCB7XG4gICAgICBib2R5OiBuZXcgUmVhZGFibGVTdHJlYW0oKSxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgZ2V0IGR1cGxleCgpIHtcbiAgICAgICAgZHVwbGV4QWNjZXNzZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gJ2hhbGYnO1xuICAgICAgfSxcbiAgICB9KS5oZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJyk7XG5cbiAgICByZXR1cm4gZHVwbGV4QWNjZXNzZWQgJiYgIWhhc0NvbnRlbnRUeXBlO1xuICB9KTtcblxuICBjb25zdCBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtID0gaXNSZXNwb25zZVN1cHBvcnRlZCAmJiBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkICYmXG4gICAgdGVzdCgoKSA9PiB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKG5ldyBSZXNwb25zZSgnJykuYm9keSkpO1xuXG4gIGNvbnN0IHJlc29sdmVycyA9IHtcbiAgICBzdHJlYW06IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKChyZXMpID0+IHJlcy5ib2R5KVxuICB9O1xuXG4gIGlzRmV0Y2hTdXBwb3J0ZWQgJiYgKCgoKSA9PiB7XG4gICAgWyd0ZXh0JywgJ2FycmF5QnVmZmVyJywgJ2Jsb2InLCAnZm9ybURhdGEnLCAnc3RyZWFtJ10uZm9yRWFjaCh0eXBlID0+IHtcbiAgICAgICFyZXNvbHZlcnNbdHlwZV0gJiYgKHJlc29sdmVyc1t0eXBlXSA9IChyZXMsIGNvbmZpZykgPT4ge1xuICAgICAgICBsZXQgbWV0aG9kID0gcmVzICYmIHJlc1t0eXBlXTtcblxuICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgcmV0dXJuIG1ldGhvZC5jYWxsKHJlcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihgUmVzcG9uc2UgdHlwZSAnJHt0eXBlfScgaXMgbm90IHN1cHBvcnRlZGAsIEF4aW9zRXJyb3IuRVJSX05PVF9TVVBQT1JULCBjb25maWcpO1xuICAgICAgfSlcbiAgICB9KTtcbiAgfSkoKSk7XG5cbiAgY29uc3QgZ2V0Qm9keUxlbmd0aCA9IGFzeW5jIChib2R5KSA9PiB7XG4gICAgaWYgKGJvZHkgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQmxvYihib2R5KSkge1xuICAgICAgcmV0dXJuIGJvZHkuc2l6ZTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNTcGVjQ29tcGxpYW50Rm9ybShib2R5KSkge1xuICAgICAgY29uc3QgX3JlcXVlc3QgPSBuZXcgUmVxdWVzdChwbGF0Zm9ybS5vcmlnaW4sIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHksXG4gICAgICB9KTtcbiAgICAgIHJldHVybiAoYXdhaXQgX3JlcXVlc3QuYXJyYXlCdWZmZXIoKSkuYnl0ZUxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkgfHwgdXRpbHMuaXNBcnJheUJ1ZmZlcihib2R5KSkge1xuICAgICAgcmV0dXJuIGJvZHkuYnl0ZUxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoYm9keSkpIHtcbiAgICAgIGJvZHkgPSBib2R5ICsgJyc7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzU3RyaW5nKGJvZHkpKSB7XG4gICAgICByZXR1cm4gKGF3YWl0IGVuY29kZVRleHQoYm9keSkpLmJ5dGVMZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmVzb2x2ZUJvZHlMZW5ndGggPSBhc3luYyAoaGVhZGVycywgYm9keSkgPT4ge1xuICAgIGNvbnN0IGxlbmd0aCA9IHV0aWxzLnRvRmluaXRlTnVtYmVyKGhlYWRlcnMuZ2V0Q29udGVudExlbmd0aCgpKTtcblxuICAgIHJldHVybiBsZW5ndGggPT0gbnVsbCA/IGdldEJvZHlMZW5ndGgoYm9keSkgOiBsZW5ndGg7XG4gIH1cblxuICByZXR1cm4gYXN5bmMgKGNvbmZpZykgPT4ge1xuICAgIGxldCB7XG4gICAgICB1cmwsXG4gICAgICBtZXRob2QsXG4gICAgICBkYXRhLFxuICAgICAgc2lnbmFsLFxuICAgICAgY2FuY2VsVG9rZW4sXG4gICAgICB0aW1lb3V0LFxuICAgICAgb25Eb3dubG9hZFByb2dyZXNzLFxuICAgICAgb25VcGxvYWRQcm9ncmVzcyxcbiAgICAgIHJlc3BvbnNlVHlwZSxcbiAgICAgIGhlYWRlcnMsXG4gICAgICB3aXRoQ3JlZGVudGlhbHMgPSAnc2FtZS1vcmlnaW4nLFxuICAgICAgZmV0Y2hPcHRpb25zXG4gICAgfSA9IHJlc29sdmVDb25maWcoY29uZmlnKTtcblxuICAgIGxldCBfZmV0Y2ggPSBlbnZGZXRjaCB8fCBmZXRjaDtcblxuICAgIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSA/IChyZXNwb25zZVR5cGUgKyAnJykudG9Mb3dlckNhc2UoKSA6ICd0ZXh0JztcblxuICAgIGxldCBjb21wb3NlZFNpZ25hbCA9IGNvbXBvc2VTaWduYWxzKFtzaWduYWwsIGNhbmNlbFRva2VuICYmIGNhbmNlbFRva2VuLnRvQWJvcnRTaWduYWwoKV0sIHRpbWVvdXQpO1xuXG4gICAgbGV0IHJlcXVlc3QgPSBudWxsO1xuXG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSBjb21wb3NlZFNpZ25hbCAmJiBjb21wb3NlZFNpZ25hbC51bnN1YnNjcmliZSAmJiAoKCkgPT4ge1xuICAgICAgY29tcG9zZWRTaWduYWwudW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcblxuICAgIGxldCByZXF1ZXN0Q29udGVudExlbmd0aDtcblxuICAgIHRyeSB7XG4gICAgICBpZiAoXG4gICAgICAgIG9uVXBsb2FkUHJvZ3Jlc3MgJiYgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtICYmIG1ldGhvZCAhPT0gJ2dldCcgJiYgbWV0aG9kICE9PSAnaGVhZCcgJiZcbiAgICAgICAgKHJlcXVlc3RDb250ZW50TGVuZ3RoID0gYXdhaXQgcmVzb2x2ZUJvZHlMZW5ndGgoaGVhZGVycywgZGF0YSkpICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgbGV0IF9yZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCB7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgYm9keTogZGF0YSxcbiAgICAgICAgICBkdXBsZXg6IFwiaGFsZlwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBjb250ZW50VHlwZUhlYWRlcjtcblxuICAgICAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSAmJiAoY29udGVudFR5cGVIZWFkZXIgPSBfcmVxdWVzdC5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpKSB7XG4gICAgICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZShjb250ZW50VHlwZUhlYWRlcilcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfcmVxdWVzdC5ib2R5KSB7XG4gICAgICAgICAgY29uc3QgW29uUHJvZ3Jlc3MsIGZsdXNoXSA9IHByb2dyZXNzRXZlbnREZWNvcmF0b3IoXG4gICAgICAgICAgICByZXF1ZXN0Q29udGVudExlbmd0aCxcbiAgICAgICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGFzeW5jRGVjb3JhdG9yKG9uVXBsb2FkUHJvZ3Jlc3MpKVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBkYXRhID0gdHJhY2tTdHJlYW0oX3JlcXVlc3QuYm9keSwgREVGQVVMVF9DSFVOS19TSVpFLCBvblByb2dyZXNzLCBmbHVzaCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCF1dGlscy5pc1N0cmluZyh3aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICAgIHdpdGhDcmVkZW50aWFscyA9IHdpdGhDcmVkZW50aWFscyA/ICdpbmNsdWRlJyA6ICdvbWl0JztcbiAgICAgIH1cblxuICAgICAgLy8gQ2xvdWRmbGFyZSBXb3JrZXJzIHRocm93cyB3aGVuIGNyZWRlbnRpYWxzIGFyZSBkZWZpbmVkXG4gICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2Nsb3VkZmxhcmUvd29ya2VyZC9pc3N1ZXMvOTAyXG4gICAgICBjb25zdCBpc0NyZWRlbnRpYWxzU3VwcG9ydGVkID0gaXNSZXF1ZXN0U3VwcG9ydGVkICYmIFwiY3JlZGVudGlhbHNcIiBpbiBSZXF1ZXN0LnByb3RvdHlwZTtcblxuICAgICAgY29uc3QgcmVzb2x2ZWRPcHRpb25zID0ge1xuICAgICAgICAuLi5mZXRjaE9wdGlvbnMsXG4gICAgICAgIHNpZ25hbDogY29tcG9zZWRTaWduYWwsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLnRvVXBwZXJDYXNlKCksXG4gICAgICAgIGhlYWRlcnM6IGhlYWRlcnMubm9ybWFsaXplKCkudG9KU09OKCksXG4gICAgICAgIGJvZHk6IGRhdGEsXG4gICAgICAgIGR1cGxleDogXCJoYWxmXCIsXG4gICAgICAgIGNyZWRlbnRpYWxzOiBpc0NyZWRlbnRpYWxzU3VwcG9ydGVkID8gd2l0aENyZWRlbnRpYWxzIDogdW5kZWZpbmVkXG4gICAgICB9O1xuXG4gICAgICByZXF1ZXN0ID0gaXNSZXF1ZXN0U3VwcG9ydGVkICYmIG5ldyBSZXF1ZXN0KHVybCwgcmVzb2x2ZWRPcHRpb25zKTtcblxuICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgKGlzUmVxdWVzdFN1cHBvcnRlZCA/IF9mZXRjaChyZXF1ZXN0LCBmZXRjaE9wdGlvbnMpIDogX2ZldGNoKHVybCwgcmVzb2x2ZWRPcHRpb25zKSk7XG5cbiAgICAgIGNvbnN0IGlzU3RyZWFtUmVzcG9uc2UgPSBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmIChyZXNwb25zZVR5cGUgPT09ICdzdHJlYW0nIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ3Jlc3BvbnNlJyk7XG5cbiAgICAgIGlmIChzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmIChvbkRvd25sb2FkUHJvZ3Jlc3MgfHwgKGlzU3RyZWFtUmVzcG9uc2UgJiYgdW5zdWJzY3JpYmUpKSkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge307XG5cbiAgICAgICAgWydzdGF0dXMnLCAnc3RhdHVzVGV4dCcsICdoZWFkZXJzJ10uZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgICBvcHRpb25zW3Byb3BdID0gcmVzcG9uc2VbcHJvcF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlQ29udGVudExlbmd0aCA9IHV0aWxzLnRvRmluaXRlTnVtYmVyKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LWxlbmd0aCcpKTtcblxuICAgICAgICBjb25zdCBbb25Qcm9ncmVzcywgZmx1c2hdID0gb25Eb3dubG9hZFByb2dyZXNzICYmIHByb2dyZXNzRXZlbnREZWNvcmF0b3IoXG4gICAgICAgICAgcmVzcG9uc2VDb250ZW50TGVuZ3RoLFxuICAgICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGFzeW5jRGVjb3JhdG9yKG9uRG93bmxvYWRQcm9ncmVzcyksIHRydWUpXG4gICAgICAgICkgfHwgW107XG5cbiAgICAgICAgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoXG4gICAgICAgICAgdHJhY2tTdHJlYW0ocmVzcG9uc2UuYm9keSwgREVGQVVMVF9DSFVOS19TSVpFLCBvblByb2dyZXNzLCAoKSA9PiB7XG4gICAgICAgICAgICBmbHVzaCAmJiBmbHVzaCgpO1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBvcHRpb25zXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSB8fCAndGV4dCc7XG5cbiAgICAgIGxldCByZXNwb25zZURhdGEgPSBhd2FpdCByZXNvbHZlcnNbdXRpbHMuZmluZEtleShyZXNvbHZlcnMsIHJlc3BvbnNlVHlwZSkgfHwgJ3RleHQnXShyZXNwb25zZSwgY29uZmlnKTtcblxuICAgICAgIWlzU3RyZWFtUmVzcG9uc2UgJiYgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcblxuICAgICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwge1xuICAgICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgICBoZWFkZXJzOiBBeGlvc0hlYWRlcnMuZnJvbShyZXNwb25zZS5oZWFkZXJzKSxcbiAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICByZXF1ZXN0XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcblxuICAgICAgaWYgKGVyciAmJiBlcnIubmFtZSA9PT0gJ1R5cGVFcnJvcicgJiYgL0xvYWQgZmFpbGVkfGZldGNoL2kudGVzdChlcnIubWVzc2FnZSkpIHtcbiAgICAgICAgdGhyb3cgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICBuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIGNvbmZpZywgcmVxdWVzdCksXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2F1c2U6IGVyci5jYXVzZSB8fCBlcnJcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGVyciwgZXJyICYmIGVyci5jb2RlLCBjb25maWcsIHJlcXVlc3QpO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBzZWVkQ2FjaGUgPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBjb25zdCBnZXRGZXRjaCA9IChjb25maWcpID0+IHtcbiAgbGV0IGVudiA9IGNvbmZpZyA/IGNvbmZpZy5lbnYgOiB7fTtcbiAgY29uc3Qge2ZldGNoLCBSZXF1ZXN0LCBSZXNwb25zZX0gPSBlbnY7XG4gIGNvbnN0IHNlZWRzID0gW1xuICAgIFJlcXVlc3QsIFJlc3BvbnNlLCBmZXRjaFxuICBdO1xuXG4gIGxldCBsZW4gPSBzZWVkcy5sZW5ndGgsIGkgPSBsZW4sXG4gICAgc2VlZCwgdGFyZ2V0LCBtYXAgPSBzZWVkQ2FjaGU7XG5cbiAgd2hpbGUgKGktLSkge1xuICAgIHNlZWQgPSBzZWVkc1tpXTtcbiAgICB0YXJnZXQgPSBtYXAuZ2V0KHNlZWQpO1xuXG4gICAgdGFyZ2V0ID09PSB1bmRlZmluZWQgJiYgbWFwLnNldChzZWVkLCB0YXJnZXQgPSAoaSA/IG5ldyBNYXAoKSA6IGZhY3RvcnkoZW52KSkpXG5cbiAgICBtYXAgPSB0YXJnZXQ7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuY29uc3QgYWRhcHRlciA9IGdldEZldGNoKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFkYXB0ZXI7XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IGh0dHBBZGFwdGVyIGZyb20gJy4vaHR0cC5qcyc7XG5pbXBvcnQgeGhyQWRhcHRlciBmcm9tICcuL3hoci5qcyc7XG5pbXBvcnQgKiBhcyBmZXRjaEFkYXB0ZXIgZnJvbSAnLi9mZXRjaC5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tIFwiLi4vY29yZS9BeGlvc0Vycm9yLmpzXCI7XG5cbmNvbnN0IGtub3duQWRhcHRlcnMgPSB7XG4gIGh0dHA6IGh0dHBBZGFwdGVyLFxuICB4aHI6IHhockFkYXB0ZXIsXG4gIGZldGNoOiB7XG4gICAgZ2V0OiBmZXRjaEFkYXB0ZXIuZ2V0RmV0Y2gsXG4gIH1cbn1cblxudXRpbHMuZm9yRWFjaChrbm93bkFkYXB0ZXJzLCAoZm4sIHZhbHVlKSA9PiB7XG4gIGlmIChmbikge1xuICAgIHRyeSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sICduYW1lJywge3ZhbHVlfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgJ2FkYXB0ZXJOYW1lJywge3ZhbHVlfSk7XG4gIH1cbn0pO1xuXG5jb25zdCByZW5kZXJSZWFzb24gPSAocmVhc29uKSA9PiBgLSAke3JlYXNvbn1gO1xuXG5jb25zdCBpc1Jlc29sdmVkSGFuZGxlID0gKGFkYXB0ZXIpID0+IHV0aWxzLmlzRnVuY3Rpb24oYWRhcHRlcikgfHwgYWRhcHRlciA9PT0gbnVsbCB8fCBhZGFwdGVyID09PSBmYWxzZTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRBZGFwdGVyOiAoYWRhcHRlcnMsIGNvbmZpZykgPT4ge1xuICAgIGFkYXB0ZXJzID0gdXRpbHMuaXNBcnJheShhZGFwdGVycykgPyBhZGFwdGVycyA6IFthZGFwdGVyc107XG5cbiAgICBjb25zdCB7bGVuZ3RofSA9IGFkYXB0ZXJzO1xuICAgIGxldCBuYW1lT3JBZGFwdGVyO1xuICAgIGxldCBhZGFwdGVyO1xuXG4gICAgY29uc3QgcmVqZWN0ZWRSZWFzb25zID0ge307XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBuYW1lT3JBZGFwdGVyID0gYWRhcHRlcnNbaV07XG4gICAgICBsZXQgaWQ7XG5cbiAgICAgIGFkYXB0ZXIgPSBuYW1lT3JBZGFwdGVyO1xuXG4gICAgICBpZiAoIWlzUmVzb2x2ZWRIYW5kbGUobmFtZU9yQWRhcHRlcikpIHtcbiAgICAgICAgYWRhcHRlciA9IGtub3duQWRhcHRlcnNbKGlkID0gU3RyaW5nKG5hbWVPckFkYXB0ZXIpKS50b0xvd2VyQ2FzZSgpXTtcblxuICAgICAgICBpZiAoYWRhcHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoYFVua25vd24gYWRhcHRlciAnJHtpZH0nYCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGFkYXB0ZXIgJiYgKHV0aWxzLmlzRnVuY3Rpb24oYWRhcHRlcikgfHwgKGFkYXB0ZXIgPSBhZGFwdGVyLmdldChjb25maWcpKSkpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHJlamVjdGVkUmVhc29uc1tpZCB8fCAnIycgKyBpXSA9IGFkYXB0ZXI7XG4gICAgfVxuXG4gICAgaWYgKCFhZGFwdGVyKSB7XG5cbiAgICAgIGNvbnN0IHJlYXNvbnMgPSBPYmplY3QuZW50cmllcyhyZWplY3RlZFJlYXNvbnMpXG4gICAgICAgIC5tYXAoKFtpZCwgc3RhdGVdKSA9PiBgYWRhcHRlciAke2lkfSBgICtcbiAgICAgICAgICAoc3RhdGUgPT09IGZhbHNlID8gJ2lzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGVudmlyb25tZW50JyA6ICdpcyBub3QgYXZhaWxhYmxlIGluIHRoZSBidWlsZCcpXG4gICAgICAgICk7XG5cbiAgICAgIGxldCBzID0gbGVuZ3RoID9cbiAgICAgICAgKHJlYXNvbnMubGVuZ3RoID4gMSA/ICdzaW5jZSA6XFxuJyArIHJlYXNvbnMubWFwKHJlbmRlclJlYXNvbikuam9pbignXFxuJykgOiAnICcgKyByZW5kZXJSZWFzb24ocmVhc29uc1swXSkpIDpcbiAgICAgICAgJ2FzIG5vIGFkYXB0ZXIgc3BlY2lmaWVkJztcblxuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIGBUaGVyZSBpcyBubyBzdWl0YWJsZSBhZGFwdGVyIHRvIGRpc3BhdGNoIHRoZSByZXF1ZXN0IGAgKyBzLFxuICAgICAgICAnRVJSX05PVF9TVVBQT1JUJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRhcHRlcjtcbiAgfSxcbiAgYWRhcHRlcnM6IGtub3duQWRhcHRlcnNcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHRyYW5zZm9ybURhdGEgZnJvbSAnLi90cmFuc2Zvcm1EYXRhLmpzJztcbmltcG9ydCBpc0NhbmNlbCBmcm9tICcuLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL2luZGV4LmpzJztcbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IGFkYXB0ZXJzIGZyb20gXCIuLi9hZGFwdGVycy9hZGFwdGVycy5qc1wiO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5zaWduYWwgJiYgY29uZmlnLnNpZ25hbC5hYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IENhbmNlbGVkRXJyb3IobnVsbCwgY29uZmlnKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oY29uZmlnLmhlYWRlcnMpO1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgY29uZmlnLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgaWYgKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXS5pbmRleE9mKGNvbmZpZy5tZXRob2QpICE9PSAtMSkge1xuICAgIGNvbmZpZy5oZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLCBmYWxzZSk7XG4gIH1cblxuICBjb25zdCBhZGFwdGVyID0gYWRhcHRlcnMuZ2V0QWRhcHRlcihjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyLCBjb25maWcpO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgICAgY29uZmlnLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgcmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZVxuICAgICAgICApO1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59XG4iLCJleHBvcnQgY29uc3QgVkVSU0lPTiA9IFwiMS4xMi4yXCI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge1ZFUlNJT059IGZyb20gJy4uL2Vudi9kYXRhLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5cbmNvbnN0IHZhbGlkYXRvcnMgPSB7fTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblsnb2JqZWN0JywgJ2Jvb2xlYW4nLCAnbnVtYmVyJywgJ2Z1bmN0aW9uJywgJ3N0cmluZycsICdzeW1ib2wnXS5mb3JFYWNoKCh0eXBlLCBpKSA9PiB7XG4gIHZhbGlkYXRvcnNbdHlwZV0gPSBmdW5jdGlvbiB2YWxpZGF0b3IodGhpbmcpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSB0eXBlIHx8ICdhJyArIChpIDwgMSA/ICduICcgOiAnICcpICsgdHlwZTtcbiAgfTtcbn0pO1xuXG5jb25zdCBkZXByZWNhdGVkV2FybmluZ3MgPSB7fTtcblxuLyoqXG4gKiBUcmFuc2l0aW9uYWwgb3B0aW9uIHZhbGlkYXRvclxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb258Ym9vbGVhbj99IHZhbGlkYXRvciAtIHNldCB0byBmYWxzZSBpZiB0aGUgdHJhbnNpdGlvbmFsIG9wdGlvbiBoYXMgYmVlbiByZW1vdmVkXG4gKiBAcGFyYW0ge3N0cmluZz99IHZlcnNpb24gLSBkZXByZWNhdGVkIHZlcnNpb24gLyByZW1vdmVkIHNpbmNlIHZlcnNpb25cbiAqIEBwYXJhbSB7c3RyaW5nP30gbWVzc2FnZSAtIHNvbWUgbWVzc2FnZSB3aXRoIGFkZGl0aW9uYWwgaW5mb1xuICpcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAqL1xudmFsaWRhdG9ycy50cmFuc2l0aW9uYWwgPSBmdW5jdGlvbiB0cmFuc2l0aW9uYWwodmFsaWRhdG9yLCB2ZXJzaW9uLCBtZXNzYWdlKSB7XG4gIGZ1bmN0aW9uIGZvcm1hdE1lc3NhZ2Uob3B0LCBkZXNjKSB7XG4gICAgcmV0dXJuICdbQXhpb3MgdicgKyBWRVJTSU9OICsgJ10gVHJhbnNpdGlvbmFsIG9wdGlvbiBcXCcnICsgb3B0ICsgJ1xcJycgKyBkZXNjICsgKG1lc3NhZ2UgPyAnLiAnICsgbWVzc2FnZSA6ICcnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiAodmFsdWUsIG9wdCwgb3B0cykgPT4ge1xuICAgIGlmICh2YWxpZGF0b3IgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShvcHQsICcgaGFzIGJlZW4gcmVtb3ZlZCcgKyAodmVyc2lvbiA/ICcgaW4gJyArIHZlcnNpb24gOiAnJykpLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh2ZXJzaW9uICYmICFkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSkge1xuICAgICAgZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0gPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgJyBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHYnICsgdmVyc2lvbiArICcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmVhciBmdXR1cmUnXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvciA/IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRzKSA6IHRydWU7XG4gIH07XG59O1xuXG52YWxpZGF0b3JzLnNwZWxsaW5nID0gZnVuY3Rpb24gc3BlbGxpbmcoY29ycmVjdFNwZWxsaW5nKSB7XG4gIHJldHVybiAodmFsdWUsIG9wdCkgPT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS53YXJuKGAke29wdH0gaXMgbGlrZWx5IGEgbWlzc3BlbGxpbmcgb2YgJHtjb3JyZWN0U3BlbGxpbmd9YCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCdzIHByb3BlcnRpZXMgdHlwZVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge29iamVjdH0gc2NoZW1hXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBhbGxvd1Vua25vd25cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICovXG5cbmZ1bmN0aW9uIGFzc2VydE9wdGlvbnMob3B0aW9ucywgc2NoZW1hLCBhbGxvd1Vua25vd24pIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0JywgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gIH1cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGNvbnN0IG9wdCA9IGtleXNbaV07XG4gICAgY29uc3QgdmFsaWRhdG9yID0gc2NoZW1hW29wdF07XG4gICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgY29uc3QgdmFsdWUgPSBvcHRpb25zW29wdF07XG4gICAgICBjb25zdCByZXN1bHQgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRpb25zKTtcbiAgICAgIGlmIChyZXN1bHQgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbiAnICsgb3B0ICsgJyBtdXN0IGJlICcgKyByZXN1bHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChhbGxvd1Vua25vd24gIT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdVbmtub3duIG9wdGlvbiAnICsgb3B0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhc3NlcnRPcHRpb25zLFxuICB2YWxpZGF0b3JzXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSAnLi4vaGVscGVycy9idWlsZFVSTC5qcyc7XG5pbXBvcnQgSW50ZXJjZXB0b3JNYW5hZ2VyIGZyb20gJy4vSW50ZXJjZXB0b3JNYW5hZ2VyLmpzJztcbmltcG9ydCBkaXNwYXRjaFJlcXVlc3QgZnJvbSAnLi9kaXNwYXRjaFJlcXVlc3QuanMnO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4vbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGJ1aWxkRnVsbFBhdGggZnJvbSAnLi9idWlsZEZ1bGxQYXRoLmpzJztcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnLi4vaGVscGVycy92YWxpZGF0b3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuL0F4aW9zSGVhZGVycy5qcyc7XG5cbmNvbnN0IHZhbGlkYXRvcnMgPSB2YWxpZGF0b3IudmFsaWRhdG9ycztcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuY2xhc3MgQXhpb3Mge1xuICBjb25zdHJ1Y3RvcihpbnN0YW5jZUNvbmZpZykge1xuICAgIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZyB8fCB7fTtcbiAgICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGNvbmZpZ09yVXJsIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAgICogQHBhcmFtIHs/T2JqZWN0fSBjb25maWdcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICAgKi9cbiAgYXN5bmMgcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGxldCBkdW1teSA9IHt9O1xuXG4gICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlID8gRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoZHVtbXkpIDogKGR1bW15ID0gbmV3IEVycm9yKCkpO1xuXG4gICAgICAgIC8vIHNsaWNlIG9mZiB0aGUgRXJyb3I6IC4uLiBsaW5lXG4gICAgICAgIGNvbnN0IHN0YWNrID0gZHVtbXkuc3RhY2sgPyBkdW1teS5zdGFjay5yZXBsYWNlKC9eLitcXG4vLCAnJykgOiAnJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIWVyci5zdGFjaykge1xuICAgICAgICAgICAgZXJyLnN0YWNrID0gc3RhY2s7XG4gICAgICAgICAgICAvLyBtYXRjaCB3aXRob3V0IHRoZSAyIHRvcCBzdGFjayBsaW5lc1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhY2sgJiYgIVN0cmluZyhlcnIuc3RhY2spLmVuZHNXaXRoKHN0YWNrLnJlcGxhY2UoL14uK1xcbi4rXFxuLywgJycpKSkge1xuICAgICAgICAgICAgZXJyLnN0YWNrICs9ICdcXG4nICsgc3RhY2tcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpZ25vcmUgdGhlIGNhc2Ugd2hlcmUgXCJzdGFja1wiIGlzIGFuIHVuLXdyaXRhYmxlIHByb3BlcnR5XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxuXG4gIF9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gICAgaWYgKHR5cGVvZiBjb25maWdPclVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgIGNvbmZpZy51cmwgPSBjb25maWdPclVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnID0gY29uZmlnT3JVcmwgfHwge307XG4gICAgfVxuXG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAgIGNvbnN0IHt0cmFuc2l0aW9uYWwsIHBhcmFtc1NlcmlhbGl6ZXIsIGhlYWRlcnN9ID0gY29uZmlnO1xuXG4gICAgaWYgKHRyYW5zaXRpb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyh0cmFuc2l0aW9uYWwsIHtcbiAgICAgICAgc2lsZW50SlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgIGZvcmNlZEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICBjbGFyaWZ5VGltZW91dEVycm9yOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pXG4gICAgICB9LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIgIT0gbnVsbCkge1xuICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ocGFyYW1zU2VyaWFsaXplcikpIHtcbiAgICAgICAgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIgPSB7XG4gICAgICAgICAgc2VyaWFsaXplOiBwYXJhbXNTZXJpYWxpemVyXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHBhcmFtc1NlcmlhbGl6ZXIsIHtcbiAgICAgICAgICBlbmNvZGU6IHZhbGlkYXRvcnMuZnVuY3Rpb24sXG4gICAgICAgICAgc2VyaWFsaXplOiB2YWxpZGF0b3JzLmZ1bmN0aW9uXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNldCBjb25maWcuYWxsb3dBYnNvbHV0ZVVybHNcbiAgICBpZiAoY29uZmlnLmFsbG93QWJzb2x1dGVVcmxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGVmYXVsdHMuYWxsb3dBYnNvbHV0ZVVybHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uZmlnLmFsbG93QWJzb2x1dGVVcmxzID0gdGhpcy5kZWZhdWx0cy5hbGxvd0Fic29sdXRlVXJscztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnLmFsbG93QWJzb2x1dGVVcmxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyhjb25maWcsIHtcbiAgICAgIGJhc2VVcmw6IHZhbGlkYXRvcnMuc3BlbGxpbmcoJ2Jhc2VVUkwnKSxcbiAgICAgIHdpdGhYc3JmVG9rZW46IHZhbGlkYXRvcnMuc3BlbGxpbmcoJ3dpdGhYU1JGVG9rZW4nKVxuICAgIH0sIHRydWUpO1xuXG4gICAgLy8gU2V0IGNvbmZpZy5tZXRob2RcbiAgICBjb25maWcubWV0aG9kID0gKGNvbmZpZy5tZXRob2QgfHwgdGhpcy5kZWZhdWx0cy5tZXRob2QgfHwgJ2dldCcpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgICBsZXQgY29udGV4dEhlYWRlcnMgPSBoZWFkZXJzICYmIHV0aWxzLm1lcmdlKFxuICAgICAgaGVhZGVycy5jb21tb24sXG4gICAgICBoZWFkZXJzW2NvbmZpZy5tZXRob2RdXG4gICAgKTtcblxuICAgIGhlYWRlcnMgJiYgdXRpbHMuZm9yRWFjaChcbiAgICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgICAgKG1ldGhvZCkgPT4ge1xuICAgICAgICBkZWxldGUgaGVhZGVyc1ttZXRob2RdO1xuICAgICAgfVxuICAgICk7XG5cbiAgICBjb25maWcuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5jb25jYXQoY29udGV4dEhlYWRlcnMsIGhlYWRlcnMpO1xuXG4gICAgLy8gZmlsdGVyIG91dCBza2lwcGVkIGludGVyY2VwdG9yc1xuICAgIGNvbnN0IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluID0gW107XG4gICAgbGV0IHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyA9IHRydWU7XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgICBpZiAodHlwZW9mIGludGVyY2VwdG9yLnJ1bldoZW4gPT09ICdmdW5jdGlvbicgJiYgaW50ZXJjZXB0b3IucnVuV2hlbihjb25maWcpID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyA9IHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyAmJiBpbnRlcmNlcHRvci5zeW5jaHJvbm91cztcblxuICAgICAgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgICByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgICB9KTtcblxuICAgIGxldCBwcm9taXNlO1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgbGVuO1xuXG4gICAgaWYgKCFzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMpIHtcbiAgICAgIGNvbnN0IGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdC5iaW5kKHRoaXMpLCB1bmRlZmluZWRdO1xuICAgICAgY2hhaW4udW5zaGlmdCguLi5yZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBjaGFpbi5wdXNoKC4uLnJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBsZW4gPSBjaGFpbi5sZW5ndGg7XG5cbiAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICAgICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbltpKytdLCBjaGFpbltpKytdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgbGVuID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgbGV0IG5ld0NvbmZpZyA9IGNvbmZpZztcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBjb25zdCBvbkZ1bGZpbGxlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluW2krK107XG4gICAgICBjb25zdCBvblJlamVjdGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ld0NvbmZpZyA9IG9uRnVsZmlsbGVkKG5ld0NvbmZpZyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBvblJlamVjdGVkLmNhbGwodGhpcywgZXJyb3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcHJvbWlzZSA9IGRpc3BhdGNoUmVxdWVzdC5jYWxsKHRoaXMsIG5ld0NvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuXG4gICAgaSA9IDA7XG4gICAgbGVuID0gcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW5baSsrXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBnZXRVcmkoY29uZmlnKSB7XG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgICBjb25zdCBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwsIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyk7XG4gICAgcmV0dXJuIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG4gIH1cbn1cblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2QsXG4gICAgICB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVIVFRQTWV0aG9kKGlzRm9ybSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBodHRwTWV0aG9kKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgICBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IGlzRm9ybSA/IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgIH0gOiB7fSxcbiAgICAgICAgdXJsLFxuICAgICAgICBkYXRhXG4gICAgICB9KSk7XG4gICAgfTtcbiAgfVxuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZ2VuZXJhdGVIVFRQTWV0aG9kKCk7XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZCArICdGb3JtJ10gPSBnZW5lcmF0ZUhUVFBNZXRob2QodHJ1ZSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4vQ2FuY2VsZWRFcnJvci5qcyc7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKlxuICogQHJldHVybnMge0NhbmNlbFRva2VufVxuICovXG5jbGFzcyBDYW5jZWxUb2tlbiB7XG4gIGNvbnN0cnVjdG9yKGV4ZWN1dG9yKSB7XG4gICAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGxldCByZXNvbHZlUHJvbWlzZTtcblxuICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2tlbiA9IHRoaXM7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuKGNhbmNlbCA9PiB7XG4gICAgICBpZiAoIXRva2VuLl9saXN0ZW5lcnMpIHJldHVybjtcblxuICAgICAgbGV0IGkgPSB0b2tlbi5fbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgICAgdG9rZW4uX2xpc3RlbmVyc1tpXShjYW5jZWwpO1xuICAgICAgfVxuICAgICAgdG9rZW4uX2xpc3RlbmVycyA9IG51bGw7XG4gICAgfSk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuID0gb25mdWxmaWxsZWQgPT4ge1xuICAgICAgbGV0IF9yZXNvbHZlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgdG9rZW4uc3Vic2NyaWJlKHJlc29sdmUpO1xuICAgICAgICBfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICB9KS50aGVuKG9uZnVsZmlsbGVkKTtcblxuICAgICAgcHJvbWlzZS5jYW5jZWwgPSBmdW5jdGlvbiByZWplY3QoKSB7XG4gICAgICAgIHRva2VuLnVuc3Vic2NyaWJlKF9yZXNvbHZlKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH07XG5cbiAgICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gICAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWxlZEVycm9yKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCk7XG4gICAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICAgKi9cbiAgdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICAgIHRocm93IHRoaXMucmVhc29uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIGNhbmNlbCBzaWduYWxcbiAgICovXG5cbiAgc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICBsaXN0ZW5lcih0aGlzLnJlYXNvbik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSBbbGlzdGVuZXJdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHVuc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgdG9BYm9ydFNpZ25hbCgpIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gICAgY29uc3QgYWJvcnQgPSAoZXJyKSA9PiB7XG4gICAgICBjb250cm9sbGVyLmFib3J0KGVycik7XG4gICAgfTtcblxuICAgIHRoaXMuc3Vic2NyaWJlKGFib3J0KTtcblxuICAgIGNvbnRyb2xsZXIuc2lnbmFsLnVuc3Vic2NyaWJlID0gKCkgPT4gdGhpcy51bnN1YnNjcmliZShhYm9ydCk7XG5cbiAgICByZXR1cm4gY29udHJvbGxlci5zaWduYWw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICAgKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICAgKi9cbiAgc3RhdGljIHNvdXJjZSgpIHtcbiAgICBsZXQgY2FuY2VsO1xuICAgIGNvbnN0IHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICAgIGNhbmNlbCA9IGM7XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRva2VuLFxuICAgICAgY2FuY2VsXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zXG4gKlxuICogQHBhcmFtIHsqfSBwYXlsb2FkIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNBeGlvc0Vycm9yKHBheWxvYWQpIHtcbiAgcmV0dXJuIHV0aWxzLmlzT2JqZWN0KHBheWxvYWQpICYmIChwYXlsb2FkLmlzQXhpb3NFcnJvciA9PT0gdHJ1ZSk7XG59XG4iLCJjb25zdCBIdHRwU3RhdHVzQ29kZSA9IHtcbiAgQ29udGludWU6IDEwMCxcbiAgU3dpdGNoaW5nUHJvdG9jb2xzOiAxMDEsXG4gIFByb2Nlc3Npbmc6IDEwMixcbiAgRWFybHlIaW50czogMTAzLFxuICBPazogMjAwLFxuICBDcmVhdGVkOiAyMDEsXG4gIEFjY2VwdGVkOiAyMDIsXG4gIE5vbkF1dGhvcml0YXRpdmVJbmZvcm1hdGlvbjogMjAzLFxuICBOb0NvbnRlbnQ6IDIwNCxcbiAgUmVzZXRDb250ZW50OiAyMDUsXG4gIFBhcnRpYWxDb250ZW50OiAyMDYsXG4gIE11bHRpU3RhdHVzOiAyMDcsXG4gIEFscmVhZHlSZXBvcnRlZDogMjA4LFxuICBJbVVzZWQ6IDIyNixcbiAgTXVsdGlwbGVDaG9pY2VzOiAzMDAsXG4gIE1vdmVkUGVybWFuZW50bHk6IDMwMSxcbiAgRm91bmQ6IDMwMixcbiAgU2VlT3RoZXI6IDMwMyxcbiAgTm90TW9kaWZpZWQ6IDMwNCxcbiAgVXNlUHJveHk6IDMwNSxcbiAgVW51c2VkOiAzMDYsXG4gIFRlbXBvcmFyeVJlZGlyZWN0OiAzMDcsXG4gIFBlcm1hbmVudFJlZGlyZWN0OiAzMDgsXG4gIEJhZFJlcXVlc3Q6IDQwMCxcbiAgVW5hdXRob3JpemVkOiA0MDEsXG4gIFBheW1lbnRSZXF1aXJlZDogNDAyLFxuICBGb3JiaWRkZW46IDQwMyxcbiAgTm90Rm91bmQ6IDQwNCxcbiAgTWV0aG9kTm90QWxsb3dlZDogNDA1LFxuICBOb3RBY2NlcHRhYmxlOiA0MDYsXG4gIFByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZDogNDA3LFxuICBSZXF1ZXN0VGltZW91dDogNDA4LFxuICBDb25mbGljdDogNDA5LFxuICBHb25lOiA0MTAsXG4gIExlbmd0aFJlcXVpcmVkOiA0MTEsXG4gIFByZWNvbmRpdGlvbkZhaWxlZDogNDEyLFxuICBQYXlsb2FkVG9vTGFyZ2U6IDQxMyxcbiAgVXJpVG9vTG9uZzogNDE0LFxuICBVbnN1cHBvcnRlZE1lZGlhVHlwZTogNDE1LFxuICBSYW5nZU5vdFNhdGlzZmlhYmxlOiA0MTYsXG4gIEV4cGVjdGF0aW9uRmFpbGVkOiA0MTcsXG4gIEltQVRlYXBvdDogNDE4LFxuICBNaXNkaXJlY3RlZFJlcXVlc3Q6IDQyMSxcbiAgVW5wcm9jZXNzYWJsZUVudGl0eTogNDIyLFxuICBMb2NrZWQ6IDQyMyxcbiAgRmFpbGVkRGVwZW5kZW5jeTogNDI0LFxuICBUb29FYXJseTogNDI1LFxuICBVcGdyYWRlUmVxdWlyZWQ6IDQyNixcbiAgUHJlY29uZGl0aW9uUmVxdWlyZWQ6IDQyOCxcbiAgVG9vTWFueVJlcXVlc3RzOiA0MjksXG4gIFJlcXVlc3RIZWFkZXJGaWVsZHNUb29MYXJnZTogNDMxLFxuICBVbmF2YWlsYWJsZUZvckxlZ2FsUmVhc29uczogNDUxLFxuICBJbnRlcm5hbFNlcnZlckVycm9yOiA1MDAsXG4gIE5vdEltcGxlbWVudGVkOiA1MDEsXG4gIEJhZEdhdGV3YXk6IDUwMixcbiAgU2VydmljZVVuYXZhaWxhYmxlOiA1MDMsXG4gIEdhdGV3YXlUaW1lb3V0OiA1MDQsXG4gIEh0dHBWZXJzaW9uTm90U3VwcG9ydGVkOiA1MDUsXG4gIFZhcmlhbnRBbHNvTmVnb3RpYXRlczogNTA2LFxuICBJbnN1ZmZpY2llbnRTdG9yYWdlOiA1MDcsXG4gIExvb3BEZXRlY3RlZDogNTA4LFxuICBOb3RFeHRlbmRlZDogNTEwLFxuICBOZXR3b3JrQXV0aGVudGljYXRpb25SZXF1aXJlZDogNTExLFxufTtcblxuT2JqZWN0LmVudHJpZXMoSHR0cFN0YXR1c0NvZGUpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICBIdHRwU3RhdHVzQ29kZVt2YWx1ZV0gPSBrZXk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgSHR0cFN0YXR1c0NvZGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCBiaW5kIGZyb20gJy4vaGVscGVycy9iaW5kLmpzJztcbmltcG9ydCBBeGlvcyBmcm9tICcuL2NvcmUvQXhpb3MuanMnO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4vY29yZS9tZXJnZUNvbmZpZy5qcyc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9kZWZhdWx0cy9pbmRleC5qcyc7XG5pbXBvcnQgZm9ybURhdGFUb0pTT04gZnJvbSAnLi9oZWxwZXJzL2Zvcm1EYXRhVG9KU09OLmpzJztcbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IENhbmNlbFRva2VuIGZyb20gJy4vY2FuY2VsL0NhbmNlbFRva2VuLmpzJztcbmltcG9ydCBpc0NhbmNlbCBmcm9tICcuL2NhbmNlbC9pc0NhbmNlbC5qcyc7XG5pbXBvcnQge1ZFUlNJT059IGZyb20gJy4vZW52L2RhdGEuanMnO1xuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi9oZWxwZXJzL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHNwcmVhZCBmcm9tICcuL2hlbHBlcnMvc3ByZWFkLmpzJztcbmltcG9ydCBpc0F4aW9zRXJyb3IgZnJvbSAnLi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gXCIuL2NvcmUvQXhpb3NIZWFkZXJzLmpzXCI7XG5pbXBvcnQgYWRhcHRlcnMgZnJvbSAnLi9hZGFwdGVycy9hZGFwdGVycy5qcyc7XG5pbXBvcnQgSHR0cFN0YXR1c0NvZGUgZnJvbSAnLi9oZWxwZXJzL0h0dHBTdGF0dXNDb2RlLmpzJztcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm5zIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICBjb25zdCBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICBjb25zdCBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0LCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQsIG51bGwsIHthbGxPd25LZXlzOiB0cnVlfSk7XG5cbiAgLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuICBpbnN0YW5jZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoZGVmYXVsdENvbmZpZywgaW5zdGFuY2VDb25maWcpKTtcbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxuY29uc3QgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWxlZEVycm9yID0gQ2FuY2VsZWRFcnJvcjtcbmF4aW9zLkNhbmNlbFRva2VuID0gQ2FuY2VsVG9rZW47XG5heGlvcy5pc0NhbmNlbCA9IGlzQ2FuY2VsO1xuYXhpb3MuVkVSU0lPTiA9IFZFUlNJT047XG5heGlvcy50b0Zvcm1EYXRhID0gdG9Gb3JtRGF0YTtcblxuLy8gRXhwb3NlIEF4aW9zRXJyb3IgY2xhc3NcbmF4aW9zLkF4aW9zRXJyb3IgPSBBeGlvc0Vycm9yO1xuXG4vLyBhbGlhcyBmb3IgQ2FuY2VsZWRFcnJvciBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuYXhpb3MuQ2FuY2VsID0gYXhpb3MuQ2FuY2VsZWRFcnJvcjtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuYXhpb3Muc3ByZWFkID0gc3ByZWFkO1xuXG4vLyBFeHBvc2UgaXNBeGlvc0Vycm9yXG5heGlvcy5pc0F4aW9zRXJyb3IgPSBpc0F4aW9zRXJyb3I7XG5cbi8vIEV4cG9zZSBtZXJnZUNvbmZpZ1xuYXhpb3MubWVyZ2VDb25maWcgPSBtZXJnZUNvbmZpZztcblxuYXhpb3MuQXhpb3NIZWFkZXJzID0gQXhpb3NIZWFkZXJzO1xuXG5heGlvcy5mb3JtVG9KU09OID0gdGhpbmcgPT4gZm9ybURhdGFUb0pTT04odXRpbHMuaXNIVE1MRm9ybSh0aGluZykgPyBuZXcgRm9ybURhdGEodGhpbmcpIDogdGhpbmcpO1xuXG5heGlvcy5nZXRBZGFwdGVyID0gYWRhcHRlcnMuZ2V0QWRhcHRlcjtcblxuYXhpb3MuSHR0cFN0YXR1c0NvZGUgPSBIdHRwU3RhdHVzQ29kZTtcblxuYXhpb3MuZGVmYXVsdCA9IGF4aW9zO1xuXG4vLyB0aGlzIG1vZHVsZSBzaG91bGQgb25seSBoYXZlIGEgZGVmYXVsdCBleHBvcnRcbmV4cG9ydCBkZWZhdWx0IGF4aW9zXG4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnLi9saWIvYXhpb3MuanMnO1xuXG4vLyBUaGlzIG1vZHVsZSBpcyBpbnRlbmRlZCB0byB1bndyYXAgQXhpb3MgZGVmYXVsdCBleHBvcnQgYXMgbmFtZWQuXG4vLyBLZWVwIHRvcC1sZXZlbCBleHBvcnQgc2FtZSB3aXRoIHN0YXRpYyBwcm9wZXJ0aWVzXG4vLyBzbyB0aGF0IGl0IGNhbiBrZWVwIHNhbWUgd2l0aCBlcyBtb2R1bGUgb3IgY2pzXG5jb25zdCB7XG4gIEF4aW9zLFxuICBBeGlvc0Vycm9yLFxuICBDYW5jZWxlZEVycm9yLFxuICBpc0NhbmNlbCxcbiAgQ2FuY2VsVG9rZW4sXG4gIFZFUlNJT04sXG4gIGFsbCxcbiAgQ2FuY2VsLFxuICBpc0F4aW9zRXJyb3IsXG4gIHNwcmVhZCxcbiAgdG9Gb3JtRGF0YSxcbiAgQXhpb3NIZWFkZXJzLFxuICBIdHRwU3RhdHVzQ29kZSxcbiAgZm9ybVRvSlNPTixcbiAgZ2V0QWRhcHRlcixcbiAgbWVyZ2VDb25maWdcbn0gPSBheGlvcztcblxuZXhwb3J0IHtcbiAgYXhpb3MgYXMgZGVmYXVsdCxcbiAgQXhpb3MsXG4gIEF4aW9zRXJyb3IsXG4gIENhbmNlbGVkRXJyb3IsXG4gIGlzQ2FuY2VsLFxuICBDYW5jZWxUb2tlbixcbiAgVkVSU0lPTixcbiAgYWxsLFxuICBDYW5jZWwsXG4gIGlzQXhpb3NFcnJvcixcbiAgc3ByZWFkLFxuICB0b0Zvcm1EYXRhLFxuICBBeGlvc0hlYWRlcnMsXG4gIEh0dHBTdGF0dXNDb2RlLFxuICBmb3JtVG9KU09OLFxuICBnZXRBZGFwdGVyLFxuICBtZXJnZUNvbmZpZ1xufVxuIiwiZnVuY3Rpb24gZW5jb2RlUmVzZXJ2ZWQoc3RyKSB7XG4gIHJldHVybiBzdHIuc3BsaXQoLyglWzAtOUEtRmEtZl17Mn0pL2cpLm1hcChmdW5jdGlvbiAocGFydCkge1xuICAgIGlmICghLyVbMC05QS1GYS1mXS8udGVzdChwYXJ0KSkge1xuICAgICAgcGFydCA9IGVuY29kZVVSSShwYXJ0KS5yZXBsYWNlKC8lNUIvZywgJ1snKS5yZXBsYWNlKC8lNUQvZywgJ10nKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnQ7XG4gIH0pLmpvaW4oJycpO1xufVxuXG5mdW5jdGlvbiBlbmNvZGVVbnJlc2VydmVkKHN0cikge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCkqXS9nLCBmdW5jdGlvbiAoYykge1xuICAgIHJldHVybiAnJScgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBlbmNvZGVWYWx1ZShvcGVyYXRvciwgdmFsdWUsIGtleSkge1xuICB2YWx1ZSA9IChvcGVyYXRvciA9PT0gJysnIHx8IG9wZXJhdG9yID09PSAnIycpID8gZW5jb2RlUmVzZXJ2ZWQodmFsdWUpIDogZW5jb2RlVW5yZXNlcnZlZCh2YWx1ZSk7XG5cbiAgaWYgKGtleSkge1xuICAgIHJldHVybiBlbmNvZGVVbnJlc2VydmVkKGtleSkgKyAnPScgKyB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNEZWZpbmVkKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc0tleU9wZXJhdG9yKG9wZXJhdG9yKSB7XG4gIHJldHVybiBvcGVyYXRvciA9PT0gJzsnIHx8IG9wZXJhdG9yID09PSAnJicgfHwgb3BlcmF0b3IgPT09ICc/Jztcbn1cblxuZnVuY3Rpb24gZ2V0VmFsdWVzKGNvbnRleHQsIG9wZXJhdG9yLCBrZXksIG1vZGlmaWVyKSB7XG4gIHZhciB2YWx1ZSA9IGNvbnRleHRba2V5XSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIGlmIChpc0RlZmluZWQodmFsdWUpICYmIHZhbHVlICE9PSAnJykge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcblxuICAgICAgaWYgKG1vZGlmaWVyICYmIG1vZGlmaWVyICE9PSAnKicpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHJpbmcoMCwgcGFyc2VJbnQobW9kaWZpZXIsIDEwKSk7XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdC5wdXNoKGVuY29kZVZhbHVlKG9wZXJhdG9yLCB2YWx1ZSwgaXNLZXlPcGVyYXRvcihvcGVyYXRvcikgPyBrZXkgOiBudWxsKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChtb2RpZmllciA9PT0gJyonKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgIHZhbHVlLmZpbHRlcihpc0RlZmluZWQpLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChlbmNvZGVWYWx1ZShvcGVyYXRvciwgdmFsdWUsIGlzS2V5T3BlcmF0b3Iob3BlcmF0b3IpID8ga2V5IDogbnVsbCkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgICBpZiAoaXNEZWZpbmVkKHZhbHVlW2tdKSkge1xuICAgICAgICAgICAgICByZXN1bHQucHVzaChlbmNvZGVWYWx1ZShvcGVyYXRvciwgdmFsdWVba10sIGspKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHRtcCA9IFtdO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgIHZhbHVlLmZpbHRlcihpc0RlZmluZWQpLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0bXAucHVzaChlbmNvZGVWYWx1ZShvcGVyYXRvciwgdmFsdWUpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgaWYgKGlzRGVmaW5lZCh2YWx1ZVtrXSkpIHtcbiAgICAgICAgICAgICAgdG1wLnB1c2goZW5jb2RlVW5yZXNlcnZlZChrKSk7XG4gICAgICAgICAgICAgIHRtcC5wdXNoKGVuY29kZVZhbHVlKG9wZXJhdG9yLCB2YWx1ZVtrXS50b1N0cmluZygpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNLZXlPcGVyYXRvcihvcGVyYXRvcikpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChlbmNvZGVVbnJlc2VydmVkKGtleSkgKyAnPScgKyB0bXAuam9pbignLCcpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0bXAubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2godG1wLmpvaW4oJywnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKG9wZXJhdG9yID09PSAnOycpIHtcbiAgICAgIGlmIChpc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGVuY29kZVVucmVzZXJ2ZWQoa2V5KSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJycgJiYgKG9wZXJhdG9yID09PSAnJicgfHwgb3BlcmF0b3IgPT09ICc/JykpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGVuY29kZVVucmVzZXJ2ZWQoa2V5KSArICc9Jyk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJycpIHtcbiAgICAgIHJlc3VsdC5wdXNoKCcnKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVGVtcGxhdGUodGVtcGxhdGUpIHtcbiAgdmFyIG9wZXJhdG9ycyA9IFsnKycsICcjJywgJy4nLCAnLycsICc7JywgJz8nLCAnJiddO1xuXG4gIHJldHVybiB7XG4gICAgZXhwYW5kOiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlLnJlcGxhY2UoL1xceyhbXlxce1xcfV0rKVxcfXwoW15cXHtcXH1dKykvZywgZnVuY3Rpb24gKF8sIGV4cHJlc3Npb24sIGxpdGVyYWwpIHtcbiAgICAgICAgaWYgKGV4cHJlc3Npb24pIHtcbiAgICAgICAgICB2YXIgb3BlcmF0b3IgPSBudWxsLFxuICAgICAgICAgICAgICB2YWx1ZXMgPSBbXTtcblxuICAgICAgICAgIGlmIChvcGVyYXRvcnMuaW5kZXhPZihleHByZXNzaW9uLmNoYXJBdCgwKSkgIT09IC0xKSB7XG4gICAgICAgICAgICBvcGVyYXRvciA9IGV4cHJlc3Npb24uY2hhckF0KDApO1xuICAgICAgICAgICAgZXhwcmVzc2lvbiA9IGV4cHJlc3Npb24uc3Vic3RyKDEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGV4cHJlc3Npb24uc3BsaXQoLywvZykuZm9yRWFjaChmdW5jdGlvbiAodmFyaWFibGUpIHtcbiAgICAgICAgICAgIHZhciB0bXAgPSAvKFteOlxcKl0qKSg/OjooXFxkKyl8KFxcKikpPy8uZXhlYyh2YXJpYWJsZSk7XG4gICAgICAgICAgICB2YWx1ZXMucHVzaC5hcHBseSh2YWx1ZXMsIGdldFZhbHVlcyhjb250ZXh0LCBvcGVyYXRvciwgdG1wWzFdLCB0bXBbMl0gfHwgdG1wWzNdKSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAob3BlcmF0b3IgJiYgb3BlcmF0b3IgIT09ICcrJykge1xuICAgICAgICAgICAgdmFyIHNlcGFyYXRvciA9ICcsJztcblxuICAgICAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnPycpIHtcbiAgICAgICAgICAgICAgc2VwYXJhdG9yID0gJyYnO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcGVyYXRvciAhPT0gJyMnKSB7XG4gICAgICAgICAgICAgIHNlcGFyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICh2YWx1ZXMubGVuZ3RoICE9PSAwID8gb3BlcmF0b3IgOiAnJykgKyB2YWx1ZXMuam9pbihzZXBhcmF0b3IpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzLmpvaW4oJywnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGVuY29kZVJlc2VydmVkKGxpdGVyYWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG4iLCJpbXBvcnQgdHlwZSB7IEF4aW9zSW5zdGFuY2UsIEF4aW9zUmVxdWVzdENvbmZpZywgQXhpb3NSZXNwb25zZSwgQ3JlYXRlQXhpb3NEZWZhdWx0cyB9IGZyb20gJ2F4aW9zJztcbmltcG9ydCBBeGlvc1N0YXRpYywgeyBBeGlvc0Vycm9yLCBpc0F4aW9zRXJyb3IsIGlzQ2FuY2VsIH0gZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgcGFyc2VUZW1wbGF0ZSB9IGZyb20gJ3VybC10ZW1wbGF0ZSc7XG5pbXBvcnQgeyBkYXRhIH0gZnJvbSAnLi4vZGF0YSc7XG5pbXBvcnQgeyByb3V0ZSB9IGZyb20gJy4uL3NlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFwaVJldHVybjxUID0gYW55PiB7XG4gIHN1Y2Nlc3M6IGJvb2xlYW47XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG4gIGNvZGU6IG51bWJlcjtcbiAgc3RhdHVzOiBudW1iZXI7XG4gIGRhdGE6IFQ7XG59XG5cbmRlY2xhcmUgbW9kdWxlICdheGlvcycge1xuICBleHBvcnQgaW50ZXJmYWNlIEF4aW9zUmVxdWVzdENvbmZpZyB7XG4gICAgdmFycz86IFJlY29yZDxzdHJpbmcsIGFueT47XG4gICAgbWV0aG9kU2ltdWxhdGU/OiBzdHJpbmc7XG4gICAgbWV0aG9kU2ltdWxhdGVCeUhlYWRlcj86IGJvb2xlYW47XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIENyZWF0ZUF4aW9zRGVmYXVsdHMge1xuICB9XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVBeGlvcyhheGlvczogQXhpb3NJbnN0YW5jZSk6IEF4aW9zSW5zdGFuY2Uge1xuICBheGlvcy5pbnRlcmNlcHRvcnMucmVxdWVzdC51c2UoKGNvbmZpZykgPT4ge1xuICAgIGNvbmZpZy5oZWFkZXJzWydYLUNTUkYtVG9rZW4nXSA9IGRhdGEoJ2NzcmYtdG9rZW4nKTtcblxuICAgIGlmIChjb25maWcudXJsICYmIGNvbmZpZy51cmwuc3RhcnRzV2l0aCgnQCcpKSB7XG4gICAgICBjb25maWcudXJsID0gcm91dGUoY29uZmlnLnVybCk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZz8udmFycyAmJiBjb25maWcudXJsKSB7XG4gICAgICBjb25zdCB0bXBsID0gcGFyc2VUZW1wbGF0ZShjb25maWcudXJsKTtcbiAgICAgIGNvbmZpZy51cmwgPSB0bXBsLmV4cGFuZChjb25maWcudmFycyB8fCB7fSk7XG4gICAgfVxuXG4gICAgLy8gU2ltdWxhdGUgbWV0aG9kc1xuICAgIGlmIChjb25maWcubWV0aG9kU2ltdWxhdGUpIHtcbiAgICAgIGlmIChjb25maWcubWV0aG9kU2ltdWxhdGVCeUhlYWRlcikge1xuICAgICAgICBjb25maWcuaGVhZGVyc1snWC1IVFRQLU1ldGhvZC1PdmVycmlkZSddID0gY29uZmlnO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnLmRhdGEgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbmZpZy5kYXRhWydfbWV0aG9kJ10gPSBjb25maWcubWV0aG9kO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnLmRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmIChjb25maWcuZGF0YS5pbmNsdWRlcygnPycpKSB7XG4gICAgICAgICAgY29uZmlnLmRhdGEgKz0gJyZfbWV0aG9kPScgKyBjb25maWcubWV0aG9kO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbmZpZy5kYXRhICs9ICc/X21ldGhvZD0nICsgY29uZmlnLm1ldGhvZDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY29uZmlnLm1ldGhvZD8udG9Mb3dlckNhc2UoKSAhPT0gJ2dldCcpIHtcbiAgICAgICAgY29uZmlnLm1ldGhvZCA9ICdQT1NUJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29uZmlnO1xuICB9KTtcblxuICByZXR1cm4gYXhpb3M7XG59XG5cbmV4cG9ydCB0eXBlIFVuaWNvcm5IdHRwQ2xpZW50ID0gUmV0dXJuVHlwZTx0eXBlb2YgY3JlYXRlSHR0cENsaWVudD47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIdHRwQ2xpZW50KGNvbmZpZz86IENyZWF0ZUF4aW9zRGVmYXVsdHMgfCBBeGlvc0luc3RhbmNlKSB7XG4gIGNvbnN0IGF4aW9zID0gY29uZmlnICYmICdpbnRlcmNlcHRvcnMnIGluIGNvbmZpZ1xuICAgID8gY29uZmlnXG4gICAgOiBBeGlvc1N0YXRpYy5jcmVhdGUoY29uZmlnID8/IHt9KTtcblxuICBwcmVwYXJlQXhpb3MoYXhpb3MpO1xuXG4gIGZ1bmN0aW9uIHJlcXVlc3RNaWRkbGV3YXJlKGNhbGxiYWNrOiBQYXJhbWV0ZXJzPEF4aW9zSW5zdGFuY2VbJ2ludGVyY2VwdG9ycyddWydyZXF1ZXN0J11bJ3VzZSddPlswXSkge1xuICAgIHJldHVybiBheGlvcy5pbnRlcmNlcHRvcnMucmVxdWVzdC51c2UoY2FsbGJhY2spO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzcG9uc2VNaWRkbGV3YXJlKGNhbGxiYWNrOiBQYXJhbWV0ZXJzPEF4aW9zSW5zdGFuY2VbJ2ludGVyY2VwdG9ycyddWydyZXNwb25zZSddWyd1c2UnXT5bMF0pIHtcbiAgICByZXR1cm4gYXhpb3MuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLnVzZShjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogU2VuZCBhIEdFVCByZXF1ZXN0LlxuICAgKi9cbiAgYXN5bmMgZnVuY3Rpb24gZ2V0PFQgPSBhbnksIEQgPSBhbnk+KFxuICAgIHVybDogc3RyaW5nLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8QXhpb3NSZXF1ZXN0Q29uZmlnPiA9IHt9XG4gICk6IFByb21pc2U8QXhpb3NSZXNwb25zZTxULCBEPj4ge1xuICAgIG9wdGlvbnMudXJsID0gdXJsO1xuICAgIG9wdGlvbnMubWV0aG9kID0gJ0dFVCc7XG5cbiAgICByZXR1cm4gcmVxdWVzdChvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgUE9TVCByZXF1ZXN0LlxuICAgKi9cbiAgYXN5bmMgZnVuY3Rpb24gcG9zdDxUID0gYW55LCBEID0gYW55PihcbiAgICB1cmw6IHN0cmluZyxcbiAgICBkYXRhPzogYW55LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8QXhpb3NSZXF1ZXN0Q29uZmlnPiA9IHt9XG4gICk6IFByb21pc2U8QXhpb3NSZXNwb25zZTxULCBEPj4ge1xuICAgIG9wdGlvbnMudXJsID0gdXJsO1xuICAgIG9wdGlvbnMubWV0aG9kID0gJ1BPU1QnO1xuICAgIG9wdGlvbnMuZGF0YSA9IGRhdGE7XG5cbiAgICByZXR1cm4gcmVxdWVzdChvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgUFVUIHJlcXVlc3QuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICogQHBhcmFtIHthbnl9IGRhdGFcbiAgICogQHBhcmFtIHtBeGlvc1JlcXVlc3RDb25maWd9IG9wdGlvbnNcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8QXhpb3NSZXNwb25zZT59XG4gICAqL1xuICBhc3luYyBmdW5jdGlvbiBwdXQ8VCA9IGFueSwgRCA9IGFueT4oXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgZGF0YT86IGFueSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEF4aW9zUmVxdWVzdENvbmZpZz4gPSB7fVxuICApOiBQcm9taXNlPEF4aW9zUmVzcG9uc2U8VCwgRD4+IHtcbiAgICBvcHRpb25zLnVybCA9IHVybDtcbiAgICBvcHRpb25zLm1ldGhvZCA9ICdQVVQnO1xuICAgIG9wdGlvbnMuZGF0YSA9IGRhdGE7XG5cbiAgICByZXR1cm4gcmVxdWVzdChvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgUEFUQ0ggcmVxdWVzdC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKiBAcGFyYW0ge2FueX0gZGF0YVxuICAgKiBAcGFyYW0ge0F4aW9zUmVxdWVzdENvbmZpZ30gb3B0aW9uc1xuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBeGlvc1Jlc3BvbnNlPn1cbiAgICovXG4gIGFzeW5jIGZ1bmN0aW9uIHBhdGNoPFQgPSBhbnksIEQgPSBhbnk+KFxuICAgIHVybDogc3RyaW5nLFxuICAgIGRhdGE/OiBhbnksXG4gICAgb3B0aW9uczogUGFydGlhbDxBeGlvc1JlcXVlc3RDb25maWc+ID0ge31cbiAgKTogUHJvbWlzZTxBeGlvc1Jlc3BvbnNlPFQsIEQ+PiB7XG4gICAgb3B0aW9ucy51cmwgPSB1cmw7XG4gICAgb3B0aW9ucy5tZXRob2QgPSAnUEFUQ0gnO1xuICAgIG9wdGlvbnMuZGF0YSA9IGRhdGE7XG5cbiAgICByZXR1cm4gcmVxdWVzdChvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgREVMRVRFIHJlcXVlc3QuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICogQHBhcmFtIHthbnl9IGRhdGFcbiAgICogQHBhcmFtIHtBeGlvc1JlcXVlc3RDb25maWd9IG9wdGlvbnNcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8QXhpb3NSZXNwb25zZT59XG4gICAqL1xuICBhc3luYyBmdW5jdGlvbiBkZWxldGVzPFQgPSBhbnksIEQgPSBhbnk+KFxuICAgIHVybDogc3RyaW5nLFxuICAgIGRhdGE/OiBhbnksXG4gICAgb3B0aW9uczogUGFydGlhbDxBeGlvc1JlcXVlc3RDb25maWc+ID0ge31cbiAgKTogUHJvbWlzZTxBeGlvc1Jlc3BvbnNlPFQsIEQ+PiB7XG4gICAgb3B0aW9ucy51cmwgPSB1cmw7XG4gICAgb3B0aW9ucy5tZXRob2QgPSAnREVMRVRFJztcbiAgICBvcHRpb25zLmRhdGEgPSBkYXRhO1xuXG4gICAgcmV0dXJuIHJlcXVlc3Qob3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogU2VuZCBhIEhFQUQgcmVxdWVzdC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKiBAcGFyYW0ge0F4aW9zUmVxdWVzdENvbmZpZ30gb3B0aW9uc1xuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBeGlvc1Jlc3BvbnNlPn1cbiAgICovXG4gIGFzeW5jIGZ1bmN0aW9uIGhlYWQ8VCA9IGFueSwgRCA9IGFueT4oXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgb3B0aW9uczogUGFydGlhbDxBeGlvc1JlcXVlc3RDb25maWc+ID0ge31cbiAgKTogUHJvbWlzZTxBeGlvc1Jlc3BvbnNlPFQsIEQ+PiB7XG4gICAgb3B0aW9ucy51cmwgPSB1cmw7XG4gICAgb3B0aW9ucy5tZXRob2QgPSAnSEVBRCc7XG5cbiAgICByZXR1cm4gcmVxdWVzdChvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgT1BUSU9OUyByZXF1ZXN0LlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqIEBwYXJhbSB7QXhpb3NSZXF1ZXN0Q29uZmlnfSBvcHRpb25zXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEF4aW9zUmVzcG9uc2U+fVxuICAgKi9cbiAgYXN5bmMgZnVuY3Rpb24gb3B0aW9uczxUID0gYW55LCBEID0gYW55PihcbiAgICB1cmw6IHN0cmluZyxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEF4aW9zUmVxdWVzdENvbmZpZz4gPSB7fVxuICApOiBQcm9taXNlPEF4aW9zUmVzcG9uc2U8VCwgRD4+IHtcbiAgICBvcHRpb25zLnVybCA9IHVybDtcbiAgICBvcHRpb25zLm1ldGhvZCA9ICdPUFRJT05TJztcblxuICAgIHJldHVybiByZXF1ZXN0KG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgcmVxdWVzdC5cbiAgICovXG4gIGFzeW5jIGZ1bmN0aW9uIHJlcXVlc3Q8VCA9IGFueSwgRCA9IGFueT4ob3B0aW9uczogQXhpb3NSZXF1ZXN0Q29uZmlnKTogUHJvbWlzZTxBeGlvc1Jlc3BvbnNlPFQsIEQ+PiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCBheGlvcyhvcHRpb25zKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAoZSBhcyBhbnkpLm9yaWdpbk1lc3NhZ2UgPSAoZSBhcyBFcnJvcikubWVzc2FnZTtcblxuICAgICAgY29uc3QgZXJyID0gZSBhcyBBeGlvc0Vycm9yPGFueT47XG5cbiAgICAgIGlmIChlcnIucmVzcG9uc2U/LmRhdGE/Lm1lc3NhZ2UpIHtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSBlcnIucmVzcG9uc2UuZGF0YS5tZXNzYWdlO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBheGlvcyxcbiAgICByZXF1ZXN0LFxuICAgIGdldCxcbiAgICBwb3N0LFxuICAgIHB1dCxcbiAgICBwYXRjaCxcbiAgICBkZWxldGU6IGRlbGV0ZXMsXG4gICAgaGVhZCxcbiAgICBvcHRpb25zLFxuICAgIHJlcXVlc3RNaWRkbGV3YXJlLFxuICAgIHJlc3BvbnNlTWlkZGxld2FyZSxcbiAgICBpc0NhbmNlbCxcbiAgICBBeGlvc0Vycm9yLFxuICAgIGlzQXhpb3NFcnJvcixcbiAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVbmljb3JuSHR0cE1vZHVsZSB7XG4gIFVuaWNvcm5IdHRwQ2xpZW50OiBVbmljb3JuSHR0cENsaWVudDtcbiAgY3JlYXRlSHR0cENsaWVudDogdHlwZW9mIGNyZWF0ZUh0dHBDbGllbnQ7XG59XG4iXSwibmFtZXMiOlsicm91dGUiLCJpc0Z1bmN0aW9uIiwicHJvdG90eXBlIiwiZGVzY3JpcHRvcnMiLCJmaWx0ZXIiLCJoYXNPd25Qcm9wZXJ0eSIsImRhdGEiLCJBeGlvc0Vycm9yIiwidXRpbHMiLCJ0b0Zvcm1EYXRhIiwiZW5jb2RlIiwidG9TdHJpbmciLCJVUkxTZWFyY2hQYXJhbXMiLCJGb3JtRGF0YSIsIkJsb2IiLCJwbGF0Zm9ybSIsImlzRm9ybURhdGEiLCJpc0ZpbGVMaXN0IiwidHJhbnNpdGlvbmFsIiwic2VsZiIsIkF4aW9zSGVhZGVycyIsImlzQ2FuY2VsIiwiQ2FuY2VsZWRFcnJvciIsInZhbGlkYXRlU3RhdHVzIiwib3JpZ2luIiwibWVyZ2VDb25maWciLCJtZXJnZSIsInNpZ25hbCIsIml0ZXJhdG9yIiwiZG9uZSIsIlJlYWRhYmxlU3RyZWFtIiwiZmV0Y2giLCJmZXRjaEFkYXB0ZXIuZ2V0RmV0Y2giLCJhZGFwdGVycyIsIlZFUlNJT04iLCJ2YWxpZGF0b3JzIiwidmFsaWRhdG9yIiwiQXhpb3MiLCJzcHJlYWQiLCJpc0F4aW9zRXJyb3IiLCJIdHRwU3RhdHVzQ29kZSIsIkNhbmNlbFRva2VuIiwiYWxsIiwidmFsdWUiLCJheGlvcyIsIkF4aW9zU3RhdGljIiwib3B0aW9ucyJdLCJtYXBwaW5ncyI6IkFBQ08sU0FBUyxRQUFRLFNBQWtCLE1BQWU7QUFDdkQsY0FBWSxPQUFPO0FBRW5CLE1BQUksU0FBUyxRQUFXO0FBQ3RCLFdBQU8sUUFBUTtBQUFBLEVBQ2pCO0FBRUEsU0FBTyxRQUFRLFVBQVUsSUFBSTtBQUMvQjtBQUVPLFNBQVMsUUFBUSxTQUFrQixNQUFjLE9BQVk7QUFDbEUsY0FBWSxPQUFPO0FBQ25CLFVBQVEsVUFBVSxJQUFJLElBQUk7QUFDNUI7QUFrQk8sU0FBUyxZQUE0QixTQUFlO0FBQ3pELE1BQUksQ0FBQyxTQUFTO0FBQ1osV0FBTztBQUFBLEVBQ1Q7QUFFQSxVQUFRLFlBQVksUUFBUSxhQUFhLENBQUE7QUFDekMsU0FBTztBQUNUO0FDakNPLFNBQVMsS0FBSyxLQUF1QixNQUFZLE9BQWE7QUFDbkUsTUFBSSxFQUFFLGVBQWUsY0FBYztBQUNqQyxZQUFRO0FBQ1IsV0FBTztBQUNQLFVBQU07QUFBQSxFQUNSO0FBRUEsTUFBSSxTQUFTLFFBQVc7QUFDdEIsV0FBTyxRQUFRLEdBQUc7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ZixXQUFPLFFBQVF3QyxRQUFPO0FBQUEsRUFDeEI7QUFXQSxpQkFBZSxJQUNiLEtBQ0F4QyxPQUNBd0MsV0FBdUMsQ0FBQSxHQUNUO0FBQzlCQSxhQUFRLE1BQU07QUFDZEEsYUFBUSxTQUFTO0FBQ2pCQSxhQUFRLE9BQU94QztBQUVmLFdBQU8sUUFBUXdDLFFBQU87QUFBQSxFQUN4QjtBQVdBLGlCQUFlLE1BQ2IsS0FDQXhDLE9BQ0F3QyxXQUF1QyxDQUFBLEdBQ1Q7QUFDOUJBLGFBQVEsTUFBTTtBQUNkQSxhQUFRLFNBQVM7QUFDakJBLGFBQVEsT0FBT3hDO0FBRWYsV0FBTyxRQUFRd0MsUUFBTztBQUFBLEVBQ3hCO0FBV0EsaUJBQWUsUUFDYixLQUNBeEMsT0FDQXdDLFdBQXVDLENBQUEsR0FDVDtBQUM5QkEsYUFBUSxNQUFNO0FBQ2RBLGFBQVEsU0FBUztBQUNqQkEsYUFBUSxPQUFPeEM7QUFFZixXQUFPLFFBQVF3QyxRQUFPO0FBQUEsRUFDeEI7QUFVQSxpQkFBZSxLQUNiLEtBQ0FBLFdBQXVDLElBQ1Q7QUFDOUJBLGFBQVEsTUFBTTtBQUNkQSxhQUFRLFNBQVM7QUFFakIsV0FBTyxRQUFRQSxRQUFPO0FBQUEsRUFDeEI7QUFVQSxpQkFBZSxRQUNiLEtBQ0FBLFdBQXVDLElBQ1Q7QUFDOUJBLGFBQVEsTUFBTTtBQUNkQSxhQUFRLFNBQVM7QUFFakIsV0FBTyxRQUFRQSxRQUFPO0FBQUEsRUFDeEI7QUFLQSxpQkFBZSxRQUEwQkEsVUFBMkQ7QUFDbEcsUUFBSTtBQUNGLGFBQU8sTUFBTUYsUUFBTUUsUUFBTztBQUFBLElBQzVCLFNBQVMsR0FBRztBQUNULFFBQVUsZ0JBQWlCLEVBQVk7QUFFeEMsWUFBTSxNQUFNO0FBRVosVUFBSSxJQUFJLFVBQVUsTUFBTSxTQUFTO0FBQy9CLFlBQUksVUFBVSxJQUFJLFNBQVMsS0FBSztBQUFBLE1BQ2xDO0FBRUEsWUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUFBLElBQUEsT0FDTEY7QUFBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFFBQVE7QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFBQTtBQUVKOyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlszLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE5LDIwLDIxLDIyLDIzLDI0LDI1LDI2LDI3LDI4LDI5LDMwLDMxLDMyLDMzLDM0LDM1LDM2LDM3LDM4LDM5LDQwLDQxLDQyLDQzLDQ0LDQ1LDQ2LDQ3LDQ4LDQ5LDUwLDUxLDUyLDUzXX0=
