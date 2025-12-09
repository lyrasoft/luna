import { defineComponent, mergeModels, useModel, ref, onMounted, onBeforeUnmount, withDirectives, createElementBlock, openBlock, normalizeClass, vModelText, createElementVNode, createTextVNode, Fragment, renderList, toDisplayString, vModelSelect, createVNode, createSlots, withCtx, createCommentVNode } from "vue";
import { R as RwdGroup } from "./RwdGroup.js";
import { _ as _export_sfc, S as SliderInput } from "./SliderInput.js";
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
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
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
const _hoisted_1$1 = ["id"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("input", {
    ref: "input",
    type: "text",
    id: $props.id,
    class: normalizeClass(["form-control flex-grow-1", $props.inputClass]),
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.value = $event)
  }, null, 10, _hoisted_1$1)), [
    [
      vModelText,
      $setup.value,
      void 0,
      { lazy: true }
    ]
  ]);
}
const ColorInput = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "ColorInput.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
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
const _hoisted_1 = { class: "c-title-options" };
const _hoisted_2 = { class: "form-row row" };
const _hoisted_3 = { class: "col-6" };
const _hoisted_4 = { class: "form-group mb-3" };
const _hoisted_5 = ["for"];
const _hoisted_6 = ["id"];
const _hoisted_7 = ["value"];
const _hoisted_8 = { class: "col" };
const _hoisted_9 = { class: "form-group mb-3" };
const _hoisted_10 = ["for"];
const _hoisted_11 = { class: "form-row row" };
const _hoisted_12 = { class: "col-6" };
const _hoisted_13 = { class: "col-6" };
const _hoisted_14 = { class: "form-group mb-3" };
const _hoisted_15 = {
  key: 0,
  class: ""
};
const _hoisted_16 = { class: "form-row row" };
const _hoisted_17 = { class: "col-6" };
const _hoisted_18 = ["onUpdate:modelValue"];
const _hoisted_19 = { class: "col-6" };
const _hoisted_20 = ["onUpdate:modelValue"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", _hoisted_2, [
      createElementVNode("div", _hoisted_3, [
        createElementVNode("div", _hoisted_4, [
          createElementVNode("label", {
            for: $props.id + "title-element"
          }, "\r\n            Title Element\r\n          ", 8, _hoisted_5),
          _cache[3] || (_cache[3] = createTextVNode()),
          withDirectives(createElementVNode("select", {
            id: $props.id + "title-element",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.options.element = $event),
            class: "form-select custom-select"
          }, [
            (openBlock(), createElementBlock(Fragment, null, renderList([1, 2, 3, 4, 5, 6], (i) => {
              return createElementVNode("option", {
                value: "h" + i
              }, "\r\n              h" + toDisplayString(i), 9, _hoisted_7);
            }), 64))
          ], 8, _hoisted_6), [
            [vModelSelect, $setup.options.element]
          ])
        ])
      ]),
      _cache[5] || (_cache[5] = createTextVNode()),
      createElementVNode("div", _hoisted_8, [
        createElementVNode("div", _hoisted_9, [
          createElementVNode("label", {
            for: $props.id + "title-color"
          }, "Title Color", 8, _hoisted_10),
          _cache[4] || (_cache[4] = createTextVNode()),
          createVNode($setup["ColorInput"], {
            id: $props.id + "title-color",
            modelValue: $setup.options.color,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.options.color = $event),
            modelModifiers: { lazy: true }
          }, null, 8, ["id", "modelValue"])
        ])
      ])
    ]),
    _cache[16] || (_cache[16] = createTextVNode()),
    createElementVNode("div", _hoisted_11, [
      createElementVNode("div", _hoisted_12, [
        createVNode($setup["RwdGroup"], { "class-name": "c-title-font-size" }, createSlots({
          label: withCtx(() => [
            _cache[6] || (_cache[6] = createElementVNode("label", null, "\r\n              Title Font Size\r\n            ", -1))
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
      _cache[10] || (_cache[10] = createTextVNode()),
      createElementVNode("div", _hoisted_13, [
        createElementVNode("div", _hoisted_14, [
          _cache[8] || (_cache[8] = createElementVNode("label", null, "\r\n            Title Font Weight\r\n          ", -1)),
          _cache[9] || (_cache[9] = createTextVNode()),
          $setup.prepared ? (openBlock(), createElementBlock("div", _hoisted_15, [
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
    _cache[17] || (_cache[17] = createTextVNode()),
    createElementVNode("div", _hoisted_16, [
      createElementVNode("div", _hoisted_17, [
        createVNode($setup["RwdGroup"], { "class-name": "c-title-margin_top" }, createSlots({
          label: withCtx(() => [
            _cache[11] || (_cache[11] = createElementVNode("label", null, "\r\n              Title Margin Top\r\n            ", -1))
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
                }, null, 8, _hoisted_18), [
                  [vModelText, $setup.options.margin_top[size]]
                ])
              ])
            };
          })
        ]), 1024)
      ]),
      _cache[15] || (_cache[15] = createTextVNode()),
      createElementVNode("div", _hoisted_19, [
        createVNode($setup["RwdGroup"], { "class-name": "c-title-margin_bottom" }, createSlots({
          label: withCtx(() => [
            _cache[13] || (_cache[13] = createElementVNode("label", null, "\r\n              Title Margin Bottom\r\n            ", -1))
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
                }, null, 8, _hoisted_20), [
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
const RwdTitleOptions = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "RwdTitleOptions.vue"]]);
export {
  ColorInput as C,
  RwdTitleOptions as R
};
//# sourceMappingURL=RwdTitleOptions.js.map
