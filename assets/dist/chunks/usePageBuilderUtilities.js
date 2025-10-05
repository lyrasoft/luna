import { useLoading } from "@lyrasoft/ts-toolkit/vue";
import { useHttpClient, simpleAlert, uid } from "@windwalker-io/unicorn-next";
import { watch } from "vue";
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
var Symbol$1 = root.Symbol;
var objectProto$1 = Object.prototype;
var hasOwnProperty = objectProto$1.hasOwnProperty;
var nativeObjectToString$1 = objectProto$1.toString;
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1), tag = value[symToStringTag$1];
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
var objectProto = Object.prototype;
var nativeObjectToString = objectProto.toString;
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
function toString(value) {
  return value == null ? "" : baseToString(value);
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
function startsWith(string, target, position) {
  string = toString(string);
  position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
  target = baseToString(target);
  return string.slice(position, position + target.length) == target;
}
const { loading: saving, wrap } = useLoading();
function usePageBuilderUtilities() {
  return {
    saving,
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
  const $icon = $btn.querySelector("[data-spinner]");
  watch(saving, (v) => {
    $btn.disabled = v;
    if ($icon) {
      if (v) {
        className = $icon.getAttribute("class");
        $icon.setAttribute("class", "spinner-border spinner-border-sm");
      } else {
        $icon.setAttribute("class", className);
      }
    }
  });
  let className = "";
  $btn.addEventListener("click", async () => {
    saving.value = true;
    try {
      const res = await savePage();
      console.log("Save Success!");
      return res;
    } finally {
      saving.value = false;
    }
  });
}
let previousContent = "";
const savePage = wrap(async () => {
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
      simpleAlert(e.message, "", "warning");
    }
  }
});
function addTextToClipboard(text) {
  if (typeof text !== "string") {
    text = JSON.stringify(text, null, 4);
  }
  return navigator.clipboard.writeText(text);
}
function readClipboard() {
  return navigator.clipboard.readText();
}
function duplicateAny(data, child = false) {
  data = JSON.parse(JSON.stringify(data));
  if (Array.isArray(data)) {
    return data.map((datum) => duplicateAny(datum));
  }
  if (isRow(data)) {
    return duplicateRow(data);
  }
  if (isColumn(data)) {
    return duplicateColumn(data);
  }
  if (isAddon(data)) {
    return duplicateAddon(data, child);
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
function toFormData(data) {
  const form = new FormData();
  for (const k in data) {
    form.append(k, data[k]);
  }
  return form;
}
function isRow(data) {
  return startsWith(data.id, "row-");
}
function isColumn(data) {
  return startsWith(data.id, "col-");
}
function isAddon(data) {
  return startsWith(data.id, "addon-");
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
          type: "linear",
          angle: "",
          start_color: "#fff",
          start_pos: "0",
          end_color: "#000",
          end_pos: "100"
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
          type: "linear",
          angle: "",
          start_color: "#fff",
          start_pos: "0",
          end_color: "#000",
          end_pos: "100"
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
        type: "linear",
        angle: "",
        start_color: "#fff",
        start_pos: "0",
        end_color: "#000",
        end_pos: "100"
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
export {
  arrayMap as a,
  isObject as b,
  baseGetTag as c,
  isObjectLike as d,
  freeGlobal as f,
  isArray as i,
  root as r,
  toFinite as t,
  usePageBuilderUtilities as u
};
//# sourceMappingURL=usePageBuilderUtilities.js.map
