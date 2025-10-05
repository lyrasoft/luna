import { defineComponent, mergeModels, useModel, ref, onMounted, onBeforeUnmount, withDirectives, createElementBlock, openBlock, normalizeClass, vModelText, createElementVNode, createTextVNode, Fragment, renderList, toDisplayString, vModelSelect, createVNode, createSlots, withCtx, createCommentVNode } from "vue";
import { R as RwdGroup } from "./RwdGroup.js";
import { _ as _export_sfc, e as SliderInput } from "./SliderInput.js";
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
          }, "\n            Title Element\n          ", 8, _hoisted_5),
          _cache[3] || (_cache[3] = createTextVNode()),
          withDirectives(createElementVNode("select", {
            id: $props.id + "title-element",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.options.element = $event),
            class: "form-select custom-select"
          }, [
            (openBlock(), createElementBlock(Fragment, null, renderList([1, 2, 3, 4, 5, 6], (i) => {
              return createElementVNode("option", {
                value: "h" + i
              }, "\n              h" + toDisplayString(i), 9, _hoisted_7);
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
            _cache[6] || (_cache[6] = createElementVNode("label", null, "\n              Title Font Size\n            ", -1))
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
          _cache[8] || (_cache[8] = createElementVNode("label", null, "\n            Title Font Weight\n          ", -1)),
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
            _cache[11] || (_cache[11] = createElementVNode("label", null, "\n              Title Margin Top\n            ", -1))
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
            _cache[13] || (_cache[13] = createElementVNode("label", null, "\n              Title Margin Bottom\n            ", -1))
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUndkVGl0bGVPcHRpb25zLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3BlY3RydW0tdmFuaWxsYS9kaXN0L3NwZWN0cnVtLmVzLmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvcGFnZS1idWlsZGVyL2Zvcm0vQ29sb3JJbnB1dC52dWUiLCIuLi8uLi9zcmMvY29tcG9uZW50cy9wYWdlLWJ1aWxkZXIvZm9ybS9Sd2RUaXRsZU9wdGlvbnMudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBhdXRvZ2VuZXJhdGVkLiBJdCdzIHVzZWQgdG8gcHVibGlzaCBFU00gdG8gbnBtLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jncmlucy9UaW55Q29sb3Jcbi8vIEJyaWFuIEdyaW5zdGVhZCwgTUlUIExpY2Vuc2VcblxuY29uc3QgdHJpbUxlZnQgPSAvXlxccysvO1xuY29uc3QgdHJpbVJpZ2h0ID0gL1xccyskLztcblxuZnVuY3Rpb24gdGlueWNvbG9yKGNvbG9yLCBvcHRzKSB7XG4gIGNvbG9yID0gY29sb3IgPyBjb2xvciA6IFwiXCI7XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gIC8vIElmIGlucHV0IGlzIGFscmVhZHkgYSB0aW55Y29sb3IsIHJldHVybiBpdHNlbGZcbiAgaWYgKGNvbG9yIGluc3RhbmNlb2YgdGlueWNvbG9yKSB7XG4gICAgcmV0dXJuIGNvbG9yO1xuICB9XG4gIC8vIElmIHdlIGFyZSBjYWxsZWQgYXMgYSBmdW5jdGlvbiwgY2FsbCB1c2luZyBuZXcgaW5zdGVhZFxuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgdGlueWNvbG9yKSkge1xuICAgIHJldHVybiBuZXcgdGlueWNvbG9yKGNvbG9yLCBvcHRzKTtcbiAgfVxuXG4gIHZhciByZ2IgPSBpbnB1dFRvUkdCKGNvbG9yKTtcbiAgKHRoaXMuX29yaWdpbmFsSW5wdXQgPSBjb2xvciksXG4gICAgKHRoaXMuX3IgPSByZ2IuciksXG4gICAgKHRoaXMuX2cgPSByZ2IuZyksXG4gICAgKHRoaXMuX2IgPSByZ2IuYiksXG4gICAgKHRoaXMuX2EgPSByZ2IuYSksXG4gICAgKHRoaXMuX3JvdW5kQSA9IE1hdGgucm91bmQoMTAwICogdGhpcy5fYSkgLyAxMDApLFxuICAgICh0aGlzLl9mb3JtYXQgPSBvcHRzLmZvcm1hdCB8fCByZ2IuZm9ybWF0KTtcbiAgdGhpcy5fZ3JhZGllbnRUeXBlID0gb3B0cy5ncmFkaWVudFR5cGU7XG5cbiAgLy8gRG9uJ3QgbGV0IHRoZSByYW5nZSBvZiBbMCwyNTVdIGNvbWUgYmFjayBpbiBbMCwxXS5cbiAgLy8gUG90ZW50aWFsbHkgbG9zZSBhIGxpdHRsZSBiaXQgb2YgcHJlY2lzaW9uIGhlcmUsIGJ1dCB3aWxsIGZpeCBpc3N1ZXMgd2hlcmVcbiAgLy8gLjUgZ2V0cyBpbnRlcnByZXRlZCBhcyBoYWxmIG9mIHRoZSB0b3RhbCwgaW5zdGVhZCBvZiBoYWxmIG9mIDFcbiAgLy8gSWYgaXQgd2FzIHN1cHBvc2VkIHRvIGJlIDEyOCwgdGhpcyB3YXMgYWxyZWFkeSB0YWtlbiBjYXJlIG9mIGJ5IGBpbnB1dFRvUmdiYFxuICBpZiAodGhpcy5fciA8IDEpIHRoaXMuX3IgPSBNYXRoLnJvdW5kKHRoaXMuX3IpO1xuICBpZiAodGhpcy5fZyA8IDEpIHRoaXMuX2cgPSBNYXRoLnJvdW5kKHRoaXMuX2cpO1xuICBpZiAodGhpcy5fYiA8IDEpIHRoaXMuX2IgPSBNYXRoLnJvdW5kKHRoaXMuX2IpO1xuXG4gIHRoaXMuX29rID0gcmdiLm9rO1xufVxuXG50aW55Y29sb3IucHJvdG90eXBlID0ge1xuICBpc0Rhcms6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRCcmlnaHRuZXNzKCkgPCAxMjg7XG4gIH0sXG4gIGlzTGlnaHQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNEYXJrKCk7XG4gIH0sXG4gIGlzVmFsaWQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fb2s7XG4gIH0sXG4gIGdldE9yaWdpbmFsSW5wdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZ2luYWxJbnB1dDtcbiAgfSxcbiAgZ2V0Rm9ybWF0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1hdDtcbiAgfSxcbiAgZ2V0QWxwaGE6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYTtcbiAgfSxcbiAgZ2V0QnJpZ2h0bmVzczogZnVuY3Rpb24gKCkge1xuICAgIC8vaHR0cDovL3d3dy53My5vcmcvVFIvQUVSVCNjb2xvci1jb250cmFzdFxuICAgIHZhciByZ2IgPSB0aGlzLnRvUmdiKCk7XG4gICAgcmV0dXJuIChyZ2IuciAqIDI5OSArIHJnYi5nICogNTg3ICsgcmdiLmIgKiAxMTQpIC8gMTAwMDtcbiAgfSxcbiAgZ2V0THVtaW5hbmNlOiBmdW5jdGlvbiAoKSB7XG4gICAgLy9odHRwOi8vd3d3LnczLm9yZy9UUi8yMDA4L1JFQy1XQ0FHMjAtMjAwODEyMTEvI3JlbGF0aXZlbHVtaW5hbmNlZGVmXG4gICAgdmFyIHJnYiA9IHRoaXMudG9SZ2IoKTtcbiAgICB2YXIgUnNSR0IsIEdzUkdCLCBCc1JHQiwgUiwgRywgQjtcbiAgICBSc1JHQiA9IHJnYi5yIC8gMjU1O1xuICAgIEdzUkdCID0gcmdiLmcgLyAyNTU7XG4gICAgQnNSR0IgPSByZ2IuYiAvIDI1NTtcblxuICAgIGlmIChSc1JHQiA8PSAwLjAzOTI4KSBSID0gUnNSR0IgLyAxMi45MjtcbiAgICBlbHNlIFIgPSBNYXRoLnBvdygoUnNSR0IgKyAwLjA1NSkgLyAxLjA1NSwgMi40KTtcbiAgICBpZiAoR3NSR0IgPD0gMC4wMzkyOCkgRyA9IEdzUkdCIC8gMTIuOTI7XG4gICAgZWxzZSBHID0gTWF0aC5wb3coKEdzUkdCICsgMC4wNTUpIC8gMS4wNTUsIDIuNCk7XG4gICAgaWYgKEJzUkdCIDw9IDAuMDM5MjgpIEIgPSBCc1JHQiAvIDEyLjkyO1xuICAgIGVsc2UgQiA9IE1hdGgucG93KChCc1JHQiArIDAuMDU1KSAvIDEuMDU1LCAyLjQpO1xuICAgIHJldHVybiAwLjIxMjYgKiBSICsgMC43MTUyICogRyArIDAuMDcyMiAqIEI7XG4gIH0sXG4gIHNldEFscGhhOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB0aGlzLl9hID0gYm91bmRBbHBoYSh2YWx1ZSk7XG4gICAgdGhpcy5fcm91bmRBID0gTWF0aC5yb3VuZCgxMDAgKiB0aGlzLl9hKSAvIDEwMDtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgdG9Ic3Y6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaHN2ID0gcmdiVG9Ic3YodGhpcy5fciwgdGhpcy5fZywgdGhpcy5fYik7XG4gICAgcmV0dXJuIHsgaDogaHN2LmggKiAzNjAsIHM6IGhzdi5zLCB2OiBoc3YudiwgYTogdGhpcy5fYSB9O1xuICB9LFxuICB0b0hzdlN0cmluZzogZnVuY3Rpb24gKCkge1xuICAgIHZhciBoc3YgPSByZ2JUb0hzdih0aGlzLl9yLCB0aGlzLl9nLCB0aGlzLl9iKTtcbiAgICB2YXIgaCA9IE1hdGgucm91bmQoaHN2LmggKiAzNjApLFxuICAgICAgcyA9IE1hdGgucm91bmQoaHN2LnMgKiAxMDApLFxuICAgICAgdiA9IE1hdGgucm91bmQoaHN2LnYgKiAxMDApO1xuICAgIHJldHVybiB0aGlzLl9hID09IDFcbiAgICAgID8gXCJoc3YoXCIgKyBoICsgXCIsIFwiICsgcyArIFwiJSwgXCIgKyB2ICsgXCIlKVwiXG4gICAgICA6IFwiaHN2YShcIiArIGggKyBcIiwgXCIgKyBzICsgXCIlLCBcIiArIHYgKyBcIiUsIFwiICsgdGhpcy5fcm91bmRBICsgXCIpXCI7XG4gIH0sXG4gIHRvSHNsOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGhzbCA9IHJnYlRvSHNsKHRoaXMuX3IsIHRoaXMuX2csIHRoaXMuX2IpO1xuICAgIHJldHVybiB7IGg6IGhzbC5oICogMzYwLCBzOiBoc2wucywgbDogaHNsLmwsIGE6IHRoaXMuX2EgfTtcbiAgfSxcbiAgdG9Ic2xTdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaHNsID0gcmdiVG9Ic2wodGhpcy5fciwgdGhpcy5fZywgdGhpcy5fYik7XG4gICAgdmFyIGggPSBNYXRoLnJvdW5kKGhzbC5oICogMzYwKSxcbiAgICAgIHMgPSBNYXRoLnJvdW5kKGhzbC5zICogMTAwKSxcbiAgICAgIGwgPSBNYXRoLnJvdW5kKGhzbC5sICogMTAwKTtcbiAgICByZXR1cm4gdGhpcy5fYSA9PSAxXG4gICAgICA/IFwiaHNsKFwiICsgaCArIFwiLCBcIiArIHMgKyBcIiUsIFwiICsgbCArIFwiJSlcIlxuICAgICAgOiBcImhzbGEoXCIgKyBoICsgXCIsIFwiICsgcyArIFwiJSwgXCIgKyBsICsgXCIlLCBcIiArIHRoaXMuX3JvdW5kQSArIFwiKVwiO1xuICB9LFxuICB0b0hleDogZnVuY3Rpb24gKGFsbG93M0NoYXIpIHtcbiAgICByZXR1cm4gcmdiVG9IZXgodGhpcy5fciwgdGhpcy5fZywgdGhpcy5fYiwgYWxsb3czQ2hhcik7XG4gIH0sXG4gIHRvSGV4U3RyaW5nOiBmdW5jdGlvbiAoYWxsb3czQ2hhcikge1xuICAgIHJldHVybiBcIiNcIiArIHRoaXMudG9IZXgoYWxsb3czQ2hhcik7XG4gIH0sXG4gIHRvSGV4ODogZnVuY3Rpb24gKGFsbG93NENoYXIpIHtcbiAgICByZXR1cm4gcmdiYVRvSGV4KHRoaXMuX3IsIHRoaXMuX2csIHRoaXMuX2IsIHRoaXMuX2EsIGFsbG93NENoYXIpO1xuICB9LFxuICB0b0hleDhTdHJpbmc6IGZ1bmN0aW9uIChhbGxvdzRDaGFyKSB7XG4gICAgcmV0dXJuIFwiI1wiICsgdGhpcy50b0hleDgoYWxsb3c0Q2hhcik7XG4gIH0sXG4gIHRvUmdiOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IE1hdGgucm91bmQodGhpcy5fciksXG4gICAgICBnOiBNYXRoLnJvdW5kKHRoaXMuX2cpLFxuICAgICAgYjogTWF0aC5yb3VuZCh0aGlzLl9iKSxcbiAgICAgIGE6IHRoaXMuX2EsXG4gICAgfTtcbiAgfSxcbiAgdG9SZ2JTdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYSA9PSAxXG4gICAgICA/IFwicmdiKFwiICtcbiAgICAgICAgICBNYXRoLnJvdW5kKHRoaXMuX3IpICtcbiAgICAgICAgICBcIiwgXCIgK1xuICAgICAgICAgIE1hdGgucm91bmQodGhpcy5fZykgK1xuICAgICAgICAgIFwiLCBcIiArXG4gICAgICAgICAgTWF0aC5yb3VuZCh0aGlzLl9iKSArXG4gICAgICAgICAgXCIpXCJcbiAgICAgIDogXCJyZ2JhKFwiICtcbiAgICAgICAgICBNYXRoLnJvdW5kKHRoaXMuX3IpICtcbiAgICAgICAgICBcIiwgXCIgK1xuICAgICAgICAgIE1hdGgucm91bmQodGhpcy5fZykgK1xuICAgICAgICAgIFwiLCBcIiArXG4gICAgICAgICAgTWF0aC5yb3VuZCh0aGlzLl9iKSArXG4gICAgICAgICAgXCIsIFwiICtcbiAgICAgICAgICB0aGlzLl9yb3VuZEEgK1xuICAgICAgICAgIFwiKVwiO1xuICB9LFxuICB0b1BlcmNlbnRhZ2VSZ2I6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcjogTWF0aC5yb3VuZChib3VuZDAxKHRoaXMuX3IsIDI1NSkgKiAxMDApICsgXCIlXCIsXG4gICAgICBnOiBNYXRoLnJvdW5kKGJvdW5kMDEodGhpcy5fZywgMjU1KSAqIDEwMCkgKyBcIiVcIixcbiAgICAgIGI6IE1hdGgucm91bmQoYm91bmQwMSh0aGlzLl9iLCAyNTUpICogMTAwKSArIFwiJVwiLFxuICAgICAgYTogdGhpcy5fYSxcbiAgICB9O1xuICB9LFxuICB0b1BlcmNlbnRhZ2VSZ2JTdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYSA9PSAxXG4gICAgICA/IFwicmdiKFwiICtcbiAgICAgICAgICBNYXRoLnJvdW5kKGJvdW5kMDEodGhpcy5fciwgMjU1KSAqIDEwMCkgK1xuICAgICAgICAgIFwiJSwgXCIgK1xuICAgICAgICAgIE1hdGgucm91bmQoYm91bmQwMSh0aGlzLl9nLCAyNTUpICogMTAwKSArXG4gICAgICAgICAgXCIlLCBcIiArXG4gICAgICAgICAgTWF0aC5yb3VuZChib3VuZDAxKHRoaXMuX2IsIDI1NSkgKiAxMDApICtcbiAgICAgICAgICBcIiUpXCJcbiAgICAgIDogXCJyZ2JhKFwiICtcbiAgICAgICAgICBNYXRoLnJvdW5kKGJvdW5kMDEodGhpcy5fciwgMjU1KSAqIDEwMCkgK1xuICAgICAgICAgIFwiJSwgXCIgK1xuICAgICAgICAgIE1hdGgucm91bmQoYm91bmQwMSh0aGlzLl9nLCAyNTUpICogMTAwKSArXG4gICAgICAgICAgXCIlLCBcIiArXG4gICAgICAgICAgTWF0aC5yb3VuZChib3VuZDAxKHRoaXMuX2IsIDI1NSkgKiAxMDApICtcbiAgICAgICAgICBcIiUsIFwiICtcbiAgICAgICAgICB0aGlzLl9yb3VuZEEgK1xuICAgICAgICAgIFwiKVwiO1xuICB9LFxuICB0b05hbWU6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fYSA9PT0gMCkge1xuICAgICAgcmV0dXJuIFwidHJhbnNwYXJlbnRcIjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fYSA8IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGV4TmFtZXNbcmdiVG9IZXgodGhpcy5fciwgdGhpcy5fZywgdGhpcy5fYiwgdHJ1ZSldIHx8IGZhbHNlO1xuICB9LFxuICB0b0ZpbHRlcjogZnVuY3Rpb24gKHNlY29uZENvbG9yKSB7XG4gICAgdmFyIGhleDhTdHJpbmcgPSBcIiNcIiArIHJnYmFUb0FyZ2JIZXgodGhpcy5fciwgdGhpcy5fZywgdGhpcy5fYiwgdGhpcy5fYSk7XG4gICAgdmFyIHNlY29uZEhleDhTdHJpbmcgPSBoZXg4U3RyaW5nO1xuICAgIHZhciBncmFkaWVudFR5cGUgPSB0aGlzLl9ncmFkaWVudFR5cGUgPyBcIkdyYWRpZW50VHlwZSA9IDEsIFwiIDogXCJcIjtcblxuICAgIGlmIChzZWNvbmRDb2xvcikge1xuICAgICAgdmFyIHMgPSB0aW55Y29sb3Ioc2Vjb25kQ29sb3IpO1xuICAgICAgc2Vjb25kSGV4OFN0cmluZyA9IFwiI1wiICsgcmdiYVRvQXJnYkhleChzLl9yLCBzLl9nLCBzLl9iLCBzLl9hKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoXCIgK1xuICAgICAgZ3JhZGllbnRUeXBlICtcbiAgICAgIFwic3RhcnRDb2xvcnN0cj1cIiArXG4gICAgICBoZXg4U3RyaW5nICtcbiAgICAgIFwiLGVuZENvbG9yc3RyPVwiICtcbiAgICAgIHNlY29uZEhleDhTdHJpbmcgK1xuICAgICAgXCIpXCJcbiAgICApO1xuICB9LFxuICB0b1N0cmluZzogZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIHZhciBmb3JtYXRTZXQgPSAhIWZvcm1hdDtcbiAgICBmb3JtYXQgPSBmb3JtYXQgfHwgdGhpcy5fZm9ybWF0O1xuXG4gICAgdmFyIGZvcm1hdHRlZFN0cmluZyA9IGZhbHNlO1xuICAgIHZhciBoYXNBbHBoYSA9IHRoaXMuX2EgPCAxICYmIHRoaXMuX2EgPj0gMDtcbiAgICB2YXIgbmVlZHNBbHBoYUZvcm1hdCA9XG4gICAgICAhZm9ybWF0U2V0ICYmXG4gICAgICBoYXNBbHBoYSAmJlxuICAgICAgKGZvcm1hdCA9PT0gXCJoZXhcIiB8fFxuICAgICAgICBmb3JtYXQgPT09IFwiaGV4NlwiIHx8XG4gICAgICAgIGZvcm1hdCA9PT0gXCJoZXgzXCIgfHxcbiAgICAgICAgZm9ybWF0ID09PSBcImhleDRcIiB8fFxuICAgICAgICBmb3JtYXQgPT09IFwiaGV4OFwiIHx8XG4gICAgICAgIGZvcm1hdCA9PT0gXCJuYW1lXCIpO1xuXG4gICAgaWYgKG5lZWRzQWxwaGFGb3JtYXQpIHtcbiAgICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgXCJ0cmFuc3BhcmVudFwiLCBhbGwgb3RoZXIgbm9uLWFscGhhIGZvcm1hdHNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHJnYmEgd2hlbiB0aGVyZSBpcyB0cmFuc3BhcmVuY3kuXG4gICAgICBpZiAoZm9ybWF0ID09PSBcIm5hbWVcIiAmJiB0aGlzLl9hID09PSAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvTmFtZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMudG9SZ2JTdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gXCJyZ2JcIikge1xuICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b1JnYlN0cmluZygpO1xuICAgIH1cbiAgICBpZiAoZm9ybWF0ID09PSBcInByZ2JcIikge1xuICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b1BlcmNlbnRhZ2VSZ2JTdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gXCJoZXhcIiB8fCBmb3JtYXQgPT09IFwiaGV4NlwiKSB7XG4gICAgICBmb3JtYXR0ZWRTdHJpbmcgPSB0aGlzLnRvSGV4U3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IFwiaGV4M1wiKSB7XG4gICAgICBmb3JtYXR0ZWRTdHJpbmcgPSB0aGlzLnRvSGV4U3RyaW5nKHRydWUpO1xuICAgIH1cbiAgICBpZiAoZm9ybWF0ID09PSBcImhleDRcIikge1xuICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b0hleDhTdHJpbmcodHJ1ZSk7XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IFwiaGV4OFwiKSB7XG4gICAgICBmb3JtYXR0ZWRTdHJpbmcgPSB0aGlzLnRvSGV4OFN0cmluZygpO1xuICAgIH1cbiAgICBpZiAoZm9ybWF0ID09PSBcIm5hbWVcIikge1xuICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b05hbWUoKTtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gXCJoc2xcIikge1xuICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b0hzbFN0cmluZygpO1xuICAgIH1cbiAgICBpZiAoZm9ybWF0ID09PSBcImhzdlwiKSB7XG4gICAgICBmb3JtYXR0ZWRTdHJpbmcgPSB0aGlzLnRvSHN2U3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvcm1hdHRlZFN0cmluZyB8fCB0aGlzLnRvSGV4U3RyaW5nKCk7XG4gIH0sXG4gIGNsb25lOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRpbnljb2xvcih0aGlzLnRvU3RyaW5nKCkpO1xuICB9LFxuXG4gIF9hcHBseU1vZGlmaWNhdGlvbjogZnVuY3Rpb24gKGZuLCBhcmdzKSB7XG4gICAgdmFyIGNvbG9yID0gZm4uYXBwbHkobnVsbCwgW3RoaXNdLmNvbmNhdChbXS5zbGljZS5jYWxsKGFyZ3MpKSk7XG4gICAgdGhpcy5fciA9IGNvbG9yLl9yO1xuICAgIHRoaXMuX2cgPSBjb2xvci5fZztcbiAgICB0aGlzLl9iID0gY29sb3IuX2I7XG4gICAgdGhpcy5zZXRBbHBoYShjb2xvci5fYSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIGxpZ2h0ZW46IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXBwbHlNb2RpZmljYXRpb24obGlnaHRlbiwgYXJndW1lbnRzKTtcbiAgfSxcbiAgYnJpZ2h0ZW46IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXBwbHlNb2RpZmljYXRpb24oYnJpZ2h0ZW4sIGFyZ3VtZW50cyk7XG4gIH0sXG4gIGRhcmtlbjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9hcHBseU1vZGlmaWNhdGlvbihkYXJrZW4sIGFyZ3VtZW50cyk7XG4gIH0sXG4gIGRlc2F0dXJhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXBwbHlNb2RpZmljYXRpb24oZGVzYXR1cmF0ZSwgYXJndW1lbnRzKTtcbiAgfSxcbiAgc2F0dXJhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXBwbHlNb2RpZmljYXRpb24oc2F0dXJhdGUsIGFyZ3VtZW50cyk7XG4gIH0sXG4gIGdyZXlzY2FsZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9hcHBseU1vZGlmaWNhdGlvbihncmV5c2NhbGUsIGFyZ3VtZW50cyk7XG4gIH0sXG4gIHNwaW46IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXBwbHlNb2RpZmljYXRpb24oc3BpbiwgYXJndW1lbnRzKTtcbiAgfSxcblxuICBfYXBwbHlDb21iaW5hdGlvbjogZnVuY3Rpb24gKGZuLCBhcmdzKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIFt0aGlzXS5jb25jYXQoW10uc2xpY2UuY2FsbChhcmdzKSkpO1xuICB9LFxuICBhbmFsb2dvdXM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXBwbHlDb21iaW5hdGlvbihhbmFsb2dvdXMsIGFyZ3VtZW50cyk7XG4gIH0sXG4gIGNvbXBsZW1lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXBwbHlDb21iaW5hdGlvbihjb21wbGVtZW50LCBhcmd1bWVudHMpO1xuICB9LFxuICBtb25vY2hyb21hdGljOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FwcGx5Q29tYmluYXRpb24obW9ub2Nocm9tYXRpYywgYXJndW1lbnRzKTtcbiAgfSxcbiAgc3BsaXRjb21wbGVtZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FwcGx5Q29tYmluYXRpb24oc3BsaXRjb21wbGVtZW50LCBhcmd1bWVudHMpO1xuICB9LFxuICAvLyBEaXNhYmxlZCB1bnRpbCBodHRwczovL2dpdGh1Yi5jb20vYmdyaW5zL1RpbnlDb2xvci9pc3N1ZXMvMjU0XG4gIC8vIHBvbHlhZDogZnVuY3Rpb24gKG51bWJlcikge1xuICAvLyAgIHJldHVybiB0aGlzLl9hcHBseUNvbWJpbmF0aW9uKHBvbHlhZCwgW251bWJlcl0pO1xuICAvLyB9LFxuICB0cmlhZDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9hcHBseUNvbWJpbmF0aW9uKHBvbHlhZCwgWzNdKTtcbiAgfSxcbiAgdGV0cmFkOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FwcGx5Q29tYmluYXRpb24ocG9seWFkLCBbNF0pO1xuICB9LFxufTtcblxuLy8gSWYgaW5wdXQgaXMgYW4gb2JqZWN0LCBmb3JjZSAxIGludG8gXCIxLjBcIiB0byBoYW5kbGUgcmF0aW9zIHByb3Blcmx5XG4vLyBTdHJpbmcgaW5wdXQgcmVxdWlyZXMgXCIxLjBcIiBhcyBpbnB1dCwgc28gMSB3aWxsIGJlIHRyZWF0ZWQgYXMgMVxudGlueWNvbG9yLmZyb21SYXRpbyA9IGZ1bmN0aW9uIChjb2xvciwgb3B0cykge1xuICBpZiAodHlwZW9mIGNvbG9yID09IFwib2JqZWN0XCIpIHtcbiAgICB2YXIgbmV3Q29sb3IgPSB7fTtcbiAgICBmb3IgKHZhciBpIGluIGNvbG9yKSB7XG4gICAgICBpZiAoY29sb3IuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgaWYgKGkgPT09IFwiYVwiKSB7XG4gICAgICAgICAgbmV3Q29sb3JbaV0gPSBjb2xvcltpXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdDb2xvcltpXSA9IGNvbnZlcnRUb1BlcmNlbnRhZ2UoY29sb3JbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbG9yID0gbmV3Q29sb3I7XG4gIH1cblxuICByZXR1cm4gdGlueWNvbG9yKGNvbG9yLCBvcHRzKTtcbn07XG5cbi8vIEdpdmVuIGEgc3RyaW5nIG9yIG9iamVjdCwgY29udmVydCB0aGF0IGlucHV0IHRvIFJHQlxuLy8gUG9zc2libGUgc3RyaW5nIGlucHV0czpcbi8vXG4vLyAgICAgXCJyZWRcIlxuLy8gICAgIFwiI2YwMFwiIG9yIFwiZjAwXCJcbi8vICAgICBcIiNmZjAwMDBcIiBvciBcImZmMDAwMFwiXG4vLyAgICAgXCIjZmYwMDAwMDBcIiBvciBcImZmMDAwMDAwXCJcbi8vICAgICBcInJnYiAyNTUgMCAwXCIgb3IgXCJyZ2IgKDI1NSwgMCwgMClcIlxuLy8gICAgIFwicmdiIDEuMCAwIDBcIiBvciBcInJnYiAoMSwgMCwgMClcIlxuLy8gICAgIFwicmdiYSAoMjU1LCAwLCAwLCAxKVwiIG9yIFwicmdiYSAyNTUsIDAsIDAsIDFcIlxuLy8gICAgIFwicmdiYSAoMS4wLCAwLCAwLCAxKVwiIG9yIFwicmdiYSAxLjAsIDAsIDAsIDFcIlxuLy8gICAgIFwiaHNsKDAsIDEwMCUsIDUwJSlcIiBvciBcImhzbCAwIDEwMCUgNTAlXCJcbi8vICAgICBcImhzbGEoMCwgMTAwJSwgNTAlLCAxKVwiIG9yIFwiaHNsYSAwIDEwMCUgNTAlLCAxXCJcbi8vICAgICBcImhzdigwLCAxMDAlLCAxMDAlKVwiIG9yIFwiaHN2IDAgMTAwJSAxMDAlXCJcbi8vXG5mdW5jdGlvbiBpbnB1dFRvUkdCKGNvbG9yKSB7XG4gIHZhciByZ2IgPSB7IHI6IDAsIGc6IDAsIGI6IDAgfTtcbiAgdmFyIGEgPSAxO1xuICB2YXIgcyA9IG51bGw7XG4gIHZhciB2ID0gbnVsbDtcbiAgdmFyIGwgPSBudWxsO1xuICB2YXIgb2sgPSBmYWxzZTtcbiAgdmFyIGZvcm1hdCA9IGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgY29sb3IgPT0gXCJzdHJpbmdcIikge1xuICAgIGNvbG9yID0gc3RyaW5nSW5wdXRUb09iamVjdChjb2xvcik7XG4gIH1cblxuICBpZiAodHlwZW9mIGNvbG9yID09IFwib2JqZWN0XCIpIHtcbiAgICBpZiAoXG4gICAgICBpc1ZhbGlkQ1NTVW5pdChjb2xvci5yKSAmJlxuICAgICAgaXNWYWxpZENTU1VuaXQoY29sb3IuZykgJiZcbiAgICAgIGlzVmFsaWRDU1NVbml0KGNvbG9yLmIpXG4gICAgKSB7XG4gICAgICByZ2IgPSByZ2JUb1JnYihjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iKTtcbiAgICAgIG9rID0gdHJ1ZTtcbiAgICAgIGZvcm1hdCA9IFN0cmluZyhjb2xvci5yKS5zdWJzdHIoLTEpID09PSBcIiVcIiA/IFwicHJnYlwiIDogXCJyZ2JcIjtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgaXNWYWxpZENTU1VuaXQoY29sb3IuaCkgJiZcbiAgICAgIGlzVmFsaWRDU1NVbml0KGNvbG9yLnMpICYmXG4gICAgICBpc1ZhbGlkQ1NTVW5pdChjb2xvci52KVxuICAgICkge1xuICAgICAgcyA9IGNvbnZlcnRUb1BlcmNlbnRhZ2UoY29sb3Iucyk7XG4gICAgICB2ID0gY29udmVydFRvUGVyY2VudGFnZShjb2xvci52KTtcbiAgICAgIHJnYiA9IGhzdlRvUmdiKGNvbG9yLmgsIHMsIHYpO1xuICAgICAgb2sgPSB0cnVlO1xuICAgICAgZm9ybWF0ID0gXCJoc3ZcIjtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgaXNWYWxpZENTU1VuaXQoY29sb3IuaCkgJiZcbiAgICAgIGlzVmFsaWRDU1NVbml0KGNvbG9yLnMpICYmXG4gICAgICBpc1ZhbGlkQ1NTVW5pdChjb2xvci5sKVxuICAgICkge1xuICAgICAgcyA9IGNvbnZlcnRUb1BlcmNlbnRhZ2UoY29sb3Iucyk7XG4gICAgICBsID0gY29udmVydFRvUGVyY2VudGFnZShjb2xvci5sKTtcbiAgICAgIHJnYiA9IGhzbFRvUmdiKGNvbG9yLmgsIHMsIGwpO1xuICAgICAgb2sgPSB0cnVlO1xuICAgICAgZm9ybWF0ID0gXCJoc2xcIjtcbiAgICB9XG5cbiAgICBpZiAoY29sb3IuaGFzT3duUHJvcGVydHkoXCJhXCIpKSB7XG4gICAgICBhID0gY29sb3IuYTtcbiAgICB9XG4gIH1cblxuICBhID0gYm91bmRBbHBoYShhKTtcblxuICByZXR1cm4ge1xuICAgIG9rOiBvayxcbiAgICBmb3JtYXQ6IGNvbG9yLmZvcm1hdCB8fCBmb3JtYXQsXG4gICAgcjogTWF0aC5taW4oMjU1LCBNYXRoLm1heChyZ2IuciwgMCkpLFxuICAgIGc6IE1hdGgubWluKDI1NSwgTWF0aC5tYXgocmdiLmcsIDApKSxcbiAgICBiOiBNYXRoLm1pbigyNTUsIE1hdGgubWF4KHJnYi5iLCAwKSksXG4gICAgYTogYSxcbiAgfTtcbn1cblxuLy8gQ29udmVyc2lvbiBGdW5jdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIGByZ2JUb0hzbGAsIGByZ2JUb0hzdmAsIGBoc2xUb1JnYmAsIGBoc3ZUb1JnYmAgbW9kaWZpZWQgZnJvbTpcbi8vIDxodHRwOi8vbWppamFja3Nvbi5jb20vMjAwOC8wMi9yZ2ItdG8taHNsLWFuZC1yZ2ItdG8taHN2LWNvbG9yLW1vZGVsLWNvbnZlcnNpb24tYWxnb3JpdGhtcy1pbi1qYXZhc2NyaXB0PlxuXG4vLyBgcmdiVG9SZ2JgXG4vLyBIYW5kbGUgYm91bmRzIC8gcGVyY2VudGFnZSBjaGVja2luZyB0byBjb25mb3JtIHRvIENTUyBjb2xvciBzcGVjXG4vLyA8aHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1jb2xvci8+XG4vLyAqQXNzdW1lczoqIHIsIGcsIGIgaW4gWzAsIDI1NV0gb3IgWzAsIDFdXG4vLyAqUmV0dXJuczoqIHsgciwgZywgYiB9IGluIFswLCAyNTVdXG5mdW5jdGlvbiByZ2JUb1JnYihyLCBnLCBiKSB7XG4gIHJldHVybiB7XG4gICAgcjogYm91bmQwMShyLCAyNTUpICogMjU1LFxuICAgIGc6IGJvdW5kMDEoZywgMjU1KSAqIDI1NSxcbiAgICBiOiBib3VuZDAxKGIsIDI1NSkgKiAyNTUsXG4gIH07XG59XG5cbi8vIGByZ2JUb0hzbGBcbi8vIENvbnZlcnRzIGFuIFJHQiBjb2xvciB2YWx1ZSB0byBIU0wuXG4vLyAqQXNzdW1lczoqIHIsIGcsIGFuZCBiIGFyZSBjb250YWluZWQgaW4gWzAsIDI1NV0gb3IgWzAsIDFdXG4vLyAqUmV0dXJuczoqIHsgaCwgcywgbCB9IGluIFswLDFdXG5mdW5jdGlvbiByZ2JUb0hzbChyLCBnLCBiKSB7XG4gIHIgPSBib3VuZDAxKHIsIDI1NSk7XG4gIGcgPSBib3VuZDAxKGcsIDI1NSk7XG4gIGIgPSBib3VuZDAxKGIsIDI1NSk7XG5cbiAgdmFyIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuICAgIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICB2YXIgaCxcbiAgICBzLFxuICAgIGwgPSAobWF4ICsgbWluKSAvIDI7XG5cbiAgaWYgKG1heCA9PSBtaW4pIHtcbiAgICBoID0gcyA9IDA7IC8vIGFjaHJvbWF0aWNcbiAgfSBlbHNlIHtcbiAgICB2YXIgZCA9IG1heCAtIG1pbjtcbiAgICBzID0gbCA+IDAuNSA/IGQgLyAoMiAtIG1heCAtIG1pbikgOiBkIC8gKG1heCArIG1pbik7XG4gICAgc3dpdGNoIChtYXgpIHtcbiAgICAgIGNhc2UgcjpcbiAgICAgICAgaCA9IChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZzpcbiAgICAgICAgaCA9IChiIC0gcikgLyBkICsgMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGI6XG4gICAgICAgIGggPSAociAtIGcpIC8gZCArIDQ7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGggLz0gNjtcbiAgfVxuXG4gIHJldHVybiB7IGg6IGgsIHM6IHMsIGw6IGwgfTtcbn1cblxuLy8gYGhzbFRvUmdiYFxuLy8gQ29udmVydHMgYW4gSFNMIGNvbG9yIHZhbHVlIHRvIFJHQi5cbi8vICpBc3N1bWVzOiogaCBpcyBjb250YWluZWQgaW4gWzAsIDFdIG9yIFswLCAzNjBdIGFuZCBzIGFuZCBsIGFyZSBjb250YWluZWQgWzAsIDFdIG9yIFswLCAxMDBdXG4vLyAqUmV0dXJuczoqIHsgciwgZywgYiB9IGluIHRoZSBzZXQgWzAsIDI1NV1cbmZ1bmN0aW9uIGhzbFRvUmdiKGgsIHMsIGwpIHtcbiAgdmFyIHIsIGcsIGI7XG5cbiAgaCA9IGJvdW5kMDEoaCwgMzYwKTtcbiAgcyA9IGJvdW5kMDEocywgMTAwKTtcbiAgbCA9IGJvdW5kMDEobCwgMTAwKTtcblxuICBmdW5jdGlvbiBodWUycmdiKHAsIHEsIHQpIHtcbiAgICBpZiAodCA8IDApIHQgKz0gMTtcbiAgICBpZiAodCA+IDEpIHQgLT0gMTtcbiAgICBpZiAodCA8IDEgLyA2KSByZXR1cm4gcCArIChxIC0gcCkgKiA2ICogdDtcbiAgICBpZiAodCA8IDEgLyAyKSByZXR1cm4gcTtcbiAgICBpZiAodCA8IDIgLyAzKSByZXR1cm4gcCArIChxIC0gcCkgKiAoMiAvIDMgLSB0KSAqIDY7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBpZiAocyA9PT0gMCkge1xuICAgIHIgPSBnID0gYiA9IGw7IC8vIGFjaHJvbWF0aWNcbiAgfSBlbHNlIHtcbiAgICB2YXIgcSA9IGwgPCAwLjUgPyBsICogKDEgKyBzKSA6IGwgKyBzIC0gbCAqIHM7XG4gICAgdmFyIHAgPSAyICogbCAtIHE7XG4gICAgciA9IGh1ZTJyZ2IocCwgcSwgaCArIDEgLyAzKTtcbiAgICBnID0gaHVlMnJnYihwLCBxLCBoKTtcbiAgICBiID0gaHVlMnJnYihwLCBxLCBoIC0gMSAvIDMpO1xuICB9XG5cbiAgcmV0dXJuIHsgcjogciAqIDI1NSwgZzogZyAqIDI1NSwgYjogYiAqIDI1NSB9O1xufVxuXG4vLyBgcmdiVG9Ic3ZgXG4vLyBDb252ZXJ0cyBhbiBSR0IgY29sb3IgdmFsdWUgdG8gSFNWXG4vLyAqQXNzdW1lczoqIHIsIGcsIGFuZCBiIGFyZSBjb250YWluZWQgaW4gdGhlIHNldCBbMCwgMjU1XSBvciBbMCwgMV1cbi8vICpSZXR1cm5zOiogeyBoLCBzLCB2IH0gaW4gWzAsMV1cbmZ1bmN0aW9uIHJnYlRvSHN2KHIsIGcsIGIpIHtcbiAgciA9IGJvdW5kMDEociwgMjU1KTtcbiAgZyA9IGJvdW5kMDEoZywgMjU1KTtcbiAgYiA9IGJvdW5kMDEoYiwgMjU1KTtcblxuICB2YXIgbWF4ID0gTWF0aC5tYXgociwgZywgYiksXG4gICAgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gIHZhciBoLFxuICAgIHMsXG4gICAgdiA9IG1heDtcblxuICB2YXIgZCA9IG1heCAtIG1pbjtcbiAgcyA9IG1heCA9PT0gMCA/IDAgOiBkIC8gbWF4O1xuXG4gIGlmIChtYXggPT0gbWluKSB7XG4gICAgaCA9IDA7IC8vIGFjaHJvbWF0aWNcbiAgfSBlbHNlIHtcbiAgICBzd2l0Y2ggKG1heCkge1xuICAgICAgY2FzZSByOlxuICAgICAgICBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBnOlxuICAgICAgICBoID0gKGIgLSByKSAvIGQgKyAyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgYjpcbiAgICAgICAgaCA9IChyIC0gZykgLyBkICsgNDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGggLz0gNjtcbiAgfVxuICByZXR1cm4geyBoOiBoLCBzOiBzLCB2OiB2IH07XG59XG5cbi8vIGBoc3ZUb1JnYmBcbi8vIENvbnZlcnRzIGFuIEhTViBjb2xvciB2YWx1ZSB0byBSR0IuXG4vLyAqQXNzdW1lczoqIGggaXMgY29udGFpbmVkIGluIFswLCAxXSBvciBbMCwgMzYwXSBhbmQgcyBhbmQgdiBhcmUgY29udGFpbmVkIGluIFswLCAxXSBvciBbMCwgMTAwXVxuLy8gKlJldHVybnM6KiB7IHIsIGcsIGIgfSBpbiB0aGUgc2V0IFswLCAyNTVdXG5mdW5jdGlvbiBoc3ZUb1JnYihoLCBzLCB2KSB7XG4gIGggPSBib3VuZDAxKGgsIDM2MCkgKiA2O1xuICBzID0gYm91bmQwMShzLCAxMDApO1xuICB2ID0gYm91bmQwMSh2LCAxMDApO1xuXG4gIHZhciBpID0gTWF0aC5mbG9vcihoKSxcbiAgICBmID0gaCAtIGksXG4gICAgcCA9IHYgKiAoMSAtIHMpLFxuICAgIHEgPSB2ICogKDEgLSBmICogcyksXG4gICAgdCA9IHYgKiAoMSAtICgxIC0gZikgKiBzKSxcbiAgICBtb2QgPSBpICUgNixcbiAgICByID0gW3YsIHEsIHAsIHAsIHQsIHZdW21vZF0sXG4gICAgZyA9IFt0LCB2LCB2LCBxLCBwLCBwXVttb2RdLFxuICAgIGIgPSBbcCwgcCwgdCwgdiwgdiwgcV1bbW9kXTtcblxuICByZXR1cm4geyByOiByICogMjU1LCBnOiBnICogMjU1LCBiOiBiICogMjU1IH07XG59XG5cbi8vIGByZ2JUb0hleGBcbi8vIENvbnZlcnRzIGFuIFJHQiBjb2xvciB0byBoZXhcbi8vIEFzc3VtZXMgciwgZywgYW5kIGIgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAyNTVdXG4vLyBSZXR1cm5zIGEgMyBvciA2IGNoYXJhY3RlciBoZXhcbmZ1bmN0aW9uIHJnYlRvSGV4KHIsIGcsIGIsIGFsbG93M0NoYXIpIHtcbiAgdmFyIGhleCA9IFtcbiAgICBwYWQyKE1hdGgucm91bmQocikudG9TdHJpbmcoMTYpKSxcbiAgICBwYWQyKE1hdGgucm91bmQoZykudG9TdHJpbmcoMTYpKSxcbiAgICBwYWQyKE1hdGgucm91bmQoYikudG9TdHJpbmcoMTYpKSxcbiAgXTtcblxuICAvLyBSZXR1cm4gYSAzIGNoYXJhY3RlciBoZXggaWYgcG9zc2libGVcbiAgaWYgKFxuICAgIGFsbG93M0NoYXIgJiZcbiAgICBoZXhbMF0uY2hhckF0KDApID09IGhleFswXS5jaGFyQXQoMSkgJiZcbiAgICBoZXhbMV0uY2hhckF0KDApID09IGhleFsxXS5jaGFyQXQoMSkgJiZcbiAgICBoZXhbMl0uY2hhckF0KDApID09IGhleFsyXS5jaGFyQXQoMSlcbiAgKSB7XG4gICAgcmV0dXJuIGhleFswXS5jaGFyQXQoMCkgKyBoZXhbMV0uY2hhckF0KDApICsgaGV4WzJdLmNoYXJBdCgwKTtcbiAgfVxuXG4gIHJldHVybiBoZXguam9pbihcIlwiKTtcbn1cblxuLy8gYHJnYmFUb0hleGBcbi8vIENvbnZlcnRzIGFuIFJHQkEgY29sb3IgcGx1cyBhbHBoYSB0cmFuc3BhcmVuY3kgdG8gaGV4XG4vLyBBc3N1bWVzIHIsIGcsIGIgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAyNTVdIGFuZFxuLy8gYSBpbiBbMCwgMV0uIFJldHVybnMgYSA0IG9yIDggY2hhcmFjdGVyIHJnYmEgaGV4XG5mdW5jdGlvbiByZ2JhVG9IZXgociwgZywgYiwgYSwgYWxsb3c0Q2hhcikge1xuICB2YXIgaGV4ID0gW1xuICAgIHBhZDIoTWF0aC5yb3VuZChyKS50b1N0cmluZygxNikpLFxuICAgIHBhZDIoTWF0aC5yb3VuZChnKS50b1N0cmluZygxNikpLFxuICAgIHBhZDIoTWF0aC5yb3VuZChiKS50b1N0cmluZygxNikpLFxuICAgIHBhZDIoY29udmVydERlY2ltYWxUb0hleChhKSksXG4gIF07XG5cbiAgLy8gUmV0dXJuIGEgNCBjaGFyYWN0ZXIgaGV4IGlmIHBvc3NpYmxlXG4gIGlmIChcbiAgICBhbGxvdzRDaGFyICYmXG4gICAgaGV4WzBdLmNoYXJBdCgwKSA9PSBoZXhbMF0uY2hhckF0KDEpICYmXG4gICAgaGV4WzFdLmNoYXJBdCgwKSA9PSBoZXhbMV0uY2hhckF0KDEpICYmXG4gICAgaGV4WzJdLmNoYXJBdCgwKSA9PSBoZXhbMl0uY2hhckF0KDEpICYmXG4gICAgaGV4WzNdLmNoYXJBdCgwKSA9PSBoZXhbM10uY2hhckF0KDEpXG4gICkge1xuICAgIHJldHVybiAoXG4gICAgICBoZXhbMF0uY2hhckF0KDApICsgaGV4WzFdLmNoYXJBdCgwKSArIGhleFsyXS5jaGFyQXQoMCkgKyBoZXhbM10uY2hhckF0KDApXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBoZXguam9pbihcIlwiKTtcbn1cblxuLy8gYHJnYmFUb0FyZ2JIZXhgXG4vLyBDb252ZXJ0cyBhbiBSR0JBIGNvbG9yIHRvIGFuIEFSR0IgSGV4OCBzdHJpbmdcbi8vIFJhcmVseSB1c2VkLCBidXQgcmVxdWlyZWQgZm9yIFwidG9GaWx0ZXIoKVwiXG5mdW5jdGlvbiByZ2JhVG9BcmdiSGV4KHIsIGcsIGIsIGEpIHtcbiAgdmFyIGhleCA9IFtcbiAgICBwYWQyKGNvbnZlcnREZWNpbWFsVG9IZXgoYSkpLFxuICAgIHBhZDIoTWF0aC5yb3VuZChyKS50b1N0cmluZygxNikpLFxuICAgIHBhZDIoTWF0aC5yb3VuZChnKS50b1N0cmluZygxNikpLFxuICAgIHBhZDIoTWF0aC5yb3VuZChiKS50b1N0cmluZygxNikpLFxuICBdO1xuXG4gIHJldHVybiBoZXguam9pbihcIlwiKTtcbn1cblxuLy8gYGVxdWFsc2Bcbi8vIENhbiBiZSBjYWxsZWQgd2l0aCBhbnkgdGlueWNvbG9yIGlucHV0XG50aW55Y29sb3IuZXF1YWxzID0gZnVuY3Rpb24gKGNvbG9yMSwgY29sb3IyKSB7XG4gIGlmICghY29sb3IxIHx8ICFjb2xvcjIpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHRpbnljb2xvcihjb2xvcjEpLnRvUmdiU3RyaW5nKCkgPT0gdGlueWNvbG9yKGNvbG9yMikudG9SZ2JTdHJpbmcoKTtcbn07XG5cbnRpbnljb2xvci5yYW5kb20gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aW55Y29sb3IuZnJvbVJhdGlvKHtcbiAgICByOiBNYXRoLnJhbmRvbSgpLFxuICAgIGc6IE1hdGgucmFuZG9tKCksXG4gICAgYjogTWF0aC5yYW5kb20oKSxcbiAgfSk7XG59O1xuXG4vLyBNb2RpZmljYXRpb24gRnVuY3Rpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBUaGFua3MgdG8gbGVzcy5qcyBmb3Igc29tZSBvZiB0aGUgYmFzaWNzIGhlcmVcbi8vIDxodHRwczovL2dpdGh1Yi5jb20vY2xvdWRoZWFkL2xlc3MuanMvYmxvYi9tYXN0ZXIvbGliL2xlc3MvZnVuY3Rpb25zLmpzPlxuXG5mdW5jdGlvbiBkZXNhdHVyYXRlKGNvbG9yLCBhbW91bnQpIHtcbiAgYW1vdW50ID0gYW1vdW50ID09PSAwID8gMCA6IGFtb3VudCB8fCAxMDtcbiAgdmFyIGhzbCA9IHRpbnljb2xvcihjb2xvcikudG9Ic2woKTtcbiAgaHNsLnMgLT0gYW1vdW50IC8gMTAwO1xuICBoc2wucyA9IGNsYW1wMDEoaHNsLnMpO1xuICByZXR1cm4gdGlueWNvbG9yKGhzbCk7XG59XG5cbmZ1bmN0aW9uIHNhdHVyYXRlKGNvbG9yLCBhbW91bnQpIHtcbiAgYW1vdW50ID0gYW1vdW50ID09PSAwID8gMCA6IGFtb3VudCB8fCAxMDtcbiAgdmFyIGhzbCA9IHRpbnljb2xvcihjb2xvcikudG9Ic2woKTtcbiAgaHNsLnMgKz0gYW1vdW50IC8gMTAwO1xuICBoc2wucyA9IGNsYW1wMDEoaHNsLnMpO1xuICByZXR1cm4gdGlueWNvbG9yKGhzbCk7XG59XG5cbmZ1bmN0aW9uIGdyZXlzY2FsZShjb2xvcikge1xuICByZXR1cm4gdGlueWNvbG9yKGNvbG9yKS5kZXNhdHVyYXRlKDEwMCk7XG59XG5cbmZ1bmN0aW9uIGxpZ2h0ZW4oY29sb3IsIGFtb3VudCkge1xuICBhbW91bnQgPSBhbW91bnQgPT09IDAgPyAwIDogYW1vdW50IHx8IDEwO1xuICB2YXIgaHNsID0gdGlueWNvbG9yKGNvbG9yKS50b0hzbCgpO1xuICBoc2wubCArPSBhbW91bnQgLyAxMDA7XG4gIGhzbC5sID0gY2xhbXAwMShoc2wubCk7XG4gIHJldHVybiB0aW55Y29sb3IoaHNsKTtcbn1cblxuZnVuY3Rpb24gYnJpZ2h0ZW4oY29sb3IsIGFtb3VudCkge1xuICBhbW91bnQgPSBhbW91bnQgPT09IDAgPyAwIDogYW1vdW50IHx8IDEwO1xuICB2YXIgcmdiID0gdGlueWNvbG9yKGNvbG9yKS50b1JnYigpO1xuICByZ2IuciA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgcmdiLnIgLSBNYXRoLnJvdW5kKDI1NSAqIC0oYW1vdW50IC8gMTAwKSkpKTtcbiAgcmdiLmcgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIHJnYi5nIC0gTWF0aC5yb3VuZCgyNTUgKiAtKGFtb3VudCAvIDEwMCkpKSk7XG4gIHJnYi5iID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCByZ2IuYiAtIE1hdGgucm91bmQoMjU1ICogLShhbW91bnQgLyAxMDApKSkpO1xuICByZXR1cm4gdGlueWNvbG9yKHJnYik7XG59XG5cbmZ1bmN0aW9uIGRhcmtlbihjb2xvciwgYW1vdW50KSB7XG4gIGFtb3VudCA9IGFtb3VudCA9PT0gMCA/IDAgOiBhbW91bnQgfHwgMTA7XG4gIHZhciBoc2wgPSB0aW55Y29sb3IoY29sb3IpLnRvSHNsKCk7XG4gIGhzbC5sIC09IGFtb3VudCAvIDEwMDtcbiAgaHNsLmwgPSBjbGFtcDAxKGhzbC5sKTtcbiAgcmV0dXJuIHRpbnljb2xvcihoc2wpO1xufVxuXG4vLyBTcGluIHRha2VzIGEgcG9zaXRpdmUgb3IgbmVnYXRpdmUgYW1vdW50IHdpdGhpbiBbLTM2MCwgMzYwXSBpbmRpY2F0aW5nIHRoZSBjaGFuZ2Ugb2YgaHVlLlxuLy8gVmFsdWVzIG91dHNpZGUgb2YgdGhpcyByYW5nZSB3aWxsIGJlIHdyYXBwZWQgaW50byB0aGlzIHJhbmdlLlxuZnVuY3Rpb24gc3Bpbihjb2xvciwgYW1vdW50KSB7XG4gIHZhciBoc2wgPSB0aW55Y29sb3IoY29sb3IpLnRvSHNsKCk7XG4gIHZhciBodWUgPSAoaHNsLmggKyBhbW91bnQpICUgMzYwO1xuICBoc2wuaCA9IGh1ZSA8IDAgPyAzNjAgKyBodWUgOiBodWU7XG4gIHJldHVybiB0aW55Y29sb3IoaHNsKTtcbn1cblxuLy8gQ29tYmluYXRpb24gRnVuY3Rpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFRoYW5rcyB0byBqUXVlcnkgeENvbG9yIGZvciBzb21lIG9mIHRoZSBpZGVhcyBiZWhpbmQgdGhlc2Vcbi8vIDxodHRwczovL2dpdGh1Yi5jb20vaW5mdXNpb24valF1ZXJ5LXhjb2xvci9ibG9iL21hc3Rlci9qcXVlcnkueGNvbG9yLmpzPlxuXG5mdW5jdGlvbiBjb21wbGVtZW50KGNvbG9yKSB7XG4gIHZhciBoc2wgPSB0aW55Y29sb3IoY29sb3IpLnRvSHNsKCk7XG4gIGhzbC5oID0gKGhzbC5oICsgMTgwKSAlIDM2MDtcbiAgcmV0dXJuIHRpbnljb2xvcihoc2wpO1xufVxuXG5mdW5jdGlvbiBwb2x5YWQoY29sb3IsIG51bWJlcikge1xuICBpZiAoaXNOYU4obnVtYmVyKSB8fCBudW1iZXIgPD0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkFyZ3VtZW50IHRvIHBvbHlhZCBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyXCIpO1xuICB9XG4gIHZhciBoc2wgPSB0aW55Y29sb3IoY29sb3IpLnRvSHNsKCk7XG4gIHZhciByZXN1bHQgPSBbdGlueWNvbG9yKGNvbG9yKV07XG4gIHZhciBzdGVwID0gMzYwIC8gbnVtYmVyO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IG51bWJlcjsgaSsrKSB7XG4gICAgcmVzdWx0LnB1c2godGlueWNvbG9yKHsgaDogKGhzbC5oICsgaSAqIHN0ZXApICUgMzYwLCBzOiBoc2wucywgbDogaHNsLmwgfSkpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gc3BsaXRjb21wbGVtZW50KGNvbG9yKSB7XG4gIHZhciBoc2wgPSB0aW55Y29sb3IoY29sb3IpLnRvSHNsKCk7XG4gIHZhciBoID0gaHNsLmg7XG4gIHJldHVybiBbXG4gICAgdGlueWNvbG9yKGNvbG9yKSxcbiAgICB0aW55Y29sb3IoeyBoOiAoaCArIDcyKSAlIDM2MCwgczogaHNsLnMsIGw6IGhzbC5sIH0pLFxuICAgIHRpbnljb2xvcih7IGg6IChoICsgMjE2KSAlIDM2MCwgczogaHNsLnMsIGw6IGhzbC5sIH0pLFxuICBdO1xufVxuXG5mdW5jdGlvbiBhbmFsb2dvdXMoY29sb3IsIHJlc3VsdHMsIHNsaWNlcykge1xuICByZXN1bHRzID0gcmVzdWx0cyB8fCA2O1xuICBzbGljZXMgPSBzbGljZXMgfHwgMzA7XG5cbiAgdmFyIGhzbCA9IHRpbnljb2xvcihjb2xvcikudG9Ic2woKTtcbiAgdmFyIHBhcnQgPSAzNjAgLyBzbGljZXM7XG4gIHZhciByZXQgPSBbdGlueWNvbG9yKGNvbG9yKV07XG5cbiAgZm9yIChoc2wuaCA9IChoc2wuaCAtICgocGFydCAqIHJlc3VsdHMpID4+IDEpICsgNzIwKSAlIDM2MDsgLS1yZXN1bHRzOyApIHtcbiAgICBoc2wuaCA9IChoc2wuaCArIHBhcnQpICUgMzYwO1xuICAgIHJldC5wdXNoKHRpbnljb2xvcihoc2wpKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBtb25vY2hyb21hdGljKGNvbG9yLCByZXN1bHRzKSB7XG4gIHJlc3VsdHMgPSByZXN1bHRzIHx8IDY7XG4gIHZhciBoc3YgPSB0aW55Y29sb3IoY29sb3IpLnRvSHN2KCk7XG4gIHZhciBoID0gaHN2LmgsXG4gICAgcyA9IGhzdi5zLFxuICAgIHYgPSBoc3YudjtcbiAgdmFyIHJldCA9IFtdO1xuICB2YXIgbW9kaWZpY2F0aW9uID0gMSAvIHJlc3VsdHM7XG5cbiAgd2hpbGUgKHJlc3VsdHMtLSkge1xuICAgIHJldC5wdXNoKHRpbnljb2xvcih7IGg6IGgsIHM6IHMsIHY6IHYgfSkpO1xuICAgIHYgPSAodiArIG1vZGlmaWNhdGlvbikgJSAxO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn1cblxuLy8gVXRpbGl0eSBGdW5jdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG50aW55Y29sb3IubWl4ID0gZnVuY3Rpb24gKGNvbG9yMSwgY29sb3IyLCBhbW91bnQpIHtcbiAgYW1vdW50ID0gYW1vdW50ID09PSAwID8gMCA6IGFtb3VudCB8fCA1MDtcblxuICB2YXIgcmdiMSA9IHRpbnljb2xvcihjb2xvcjEpLnRvUmdiKCk7XG4gIHZhciByZ2IyID0gdGlueWNvbG9yKGNvbG9yMikudG9SZ2IoKTtcblxuICB2YXIgcCA9IGFtb3VudCAvIDEwMDtcblxuICB2YXIgcmdiYSA9IHtcbiAgICByOiAocmdiMi5yIC0gcmdiMS5yKSAqIHAgKyByZ2IxLnIsXG4gICAgZzogKHJnYjIuZyAtIHJnYjEuZykgKiBwICsgcmdiMS5nLFxuICAgIGI6IChyZ2IyLmIgLSByZ2IxLmIpICogcCArIHJnYjEuYixcbiAgICBhOiAocmdiMi5hIC0gcmdiMS5hKSAqIHAgKyByZ2IxLmEsXG4gIH07XG5cbiAgcmV0dXJuIHRpbnljb2xvcihyZ2JhKTtcbn07XG5cbi8vIFJlYWRhYmlsaXR5IEZ1bmN0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyA8aHR0cDovL3d3dy53My5vcmcvVFIvMjAwOC9SRUMtV0NBRzIwLTIwMDgxMjExLyNjb250cmFzdC1yYXRpb2RlZiAoV0NBRyBWZXJzaW9uIDIpXG5cbi8vIGBjb250cmFzdGBcbi8vIEFuYWx5emUgdGhlIDIgY29sb3JzIGFuZCByZXR1cm5zIHRoZSBjb2xvciBjb250cmFzdCBkZWZpbmVkIGJ5IChXQ0FHIFZlcnNpb24gMilcbnRpbnljb2xvci5yZWFkYWJpbGl0eSA9IGZ1bmN0aW9uIChjb2xvcjEsIGNvbG9yMikge1xuICB2YXIgYzEgPSB0aW55Y29sb3IoY29sb3IxKTtcbiAgdmFyIGMyID0gdGlueWNvbG9yKGNvbG9yMik7XG4gIHJldHVybiAoXG4gICAgKE1hdGgubWF4KGMxLmdldEx1bWluYW5jZSgpLCBjMi5nZXRMdW1pbmFuY2UoKSkgKyAwLjA1KSAvXG4gICAgKE1hdGgubWluKGMxLmdldEx1bWluYW5jZSgpLCBjMi5nZXRMdW1pbmFuY2UoKSkgKyAwLjA1KVxuICApO1xufTtcblxuLy8gYGlzUmVhZGFibGVgXG4vLyBFbnN1cmUgdGhhdCBmb3JlZ3JvdW5kIGFuZCBiYWNrZ3JvdW5kIGNvbG9yIGNvbWJpbmF0aW9ucyBtZWV0IFdDQUcyIGd1aWRlbGluZXMuXG4vLyBUaGUgdGhpcmQgYXJndW1lbnQgaXMgYW4gb3B0aW9uYWwgT2JqZWN0LlxuLy8gICAgICB0aGUgJ2xldmVsJyBwcm9wZXJ0eSBzdGF0ZXMgJ0FBJyBvciAnQUFBJyAtIGlmIG1pc3Npbmcgb3IgaW52YWxpZCwgaXQgZGVmYXVsdHMgdG8gJ0FBJztcbi8vICAgICAgdGhlICdzaXplJyBwcm9wZXJ0eSBzdGF0ZXMgJ2xhcmdlJyBvciAnc21hbGwnIC0gaWYgbWlzc2luZyBvciBpbnZhbGlkLCBpdCBkZWZhdWx0cyB0byAnc21hbGwnLlxuLy8gSWYgdGhlIGVudGlyZSBvYmplY3QgaXMgYWJzZW50LCBpc1JlYWRhYmxlIGRlZmF1bHRzIHRvIHtsZXZlbDpcIkFBXCIsc2l6ZTpcInNtYWxsXCJ9LlxuXG4vLyAqRXhhbXBsZSpcbi8vICAgIHRpbnljb2xvci5pc1JlYWRhYmxlKFwiIzAwMFwiLCBcIiMxMTFcIikgPT4gZmFsc2Vcbi8vICAgIHRpbnljb2xvci5pc1JlYWRhYmxlKFwiIzAwMFwiLCBcIiMxMTFcIix7bGV2ZWw6XCJBQVwiLHNpemU6XCJsYXJnZVwifSkgPT4gZmFsc2VcbnRpbnljb2xvci5pc1JlYWRhYmxlID0gZnVuY3Rpb24gKGNvbG9yMSwgY29sb3IyLCB3Y2FnMikge1xuICB2YXIgcmVhZGFiaWxpdHkgPSB0aW55Y29sb3IucmVhZGFiaWxpdHkoY29sb3IxLCBjb2xvcjIpO1xuICB2YXIgd2NhZzJQYXJtcywgb3V0O1xuXG4gIG91dCA9IGZhbHNlO1xuXG4gIHdjYWcyUGFybXMgPSB2YWxpZGF0ZVdDQUcyUGFybXMod2NhZzIpO1xuICBzd2l0Y2ggKHdjYWcyUGFybXMubGV2ZWwgKyB3Y2FnMlBhcm1zLnNpemUpIHtcbiAgICBjYXNlIFwiQUFzbWFsbFwiOlxuICAgIGNhc2UgXCJBQUFsYXJnZVwiOlxuICAgICAgb3V0ID0gcmVhZGFiaWxpdHkgPj0gNC41O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkFBbGFyZ2VcIjpcbiAgICAgIG91dCA9IHJlYWRhYmlsaXR5ID49IDM7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiQUFBc21hbGxcIjpcbiAgICAgIG91dCA9IHJlYWRhYmlsaXR5ID49IDc7XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4gb3V0O1xufTtcblxuLy8gYG1vc3RSZWFkYWJsZWBcbi8vIEdpdmVuIGEgYmFzZSBjb2xvciBhbmQgYSBsaXN0IG9mIHBvc3NpYmxlIGZvcmVncm91bmQgb3IgYmFja2dyb3VuZFxuLy8gY29sb3JzIGZvciB0aGF0IGJhc2UsIHJldHVybnMgdGhlIG1vc3QgcmVhZGFibGUgY29sb3IuXG4vLyBPcHRpb25hbGx5IHJldHVybnMgQmxhY2sgb3IgV2hpdGUgaWYgdGhlIG1vc3QgcmVhZGFibGUgY29sb3IgaXMgdW5yZWFkYWJsZS5cbi8vICpFeGFtcGxlKlxuLy8gICAgdGlueWNvbG9yLm1vc3RSZWFkYWJsZSh0aW55Y29sb3IubW9zdFJlYWRhYmxlKFwiIzEyM1wiLCBbXCIjMTI0XCIsIFwiIzEyNVwiXSx7aW5jbHVkZUZhbGxiYWNrQ29sb3JzOmZhbHNlfSkudG9IZXhTdHJpbmcoKTsgLy8gXCIjMTEyMjU1XCJcbi8vICAgIHRpbnljb2xvci5tb3N0UmVhZGFibGUodGlueWNvbG9yLm1vc3RSZWFkYWJsZShcIiMxMjNcIiwgW1wiIzEyNFwiLCBcIiMxMjVcIl0se2luY2x1ZGVGYWxsYmFja0NvbG9yczp0cnVlfSkudG9IZXhTdHJpbmcoKTsgIC8vIFwiI2ZmZmZmZlwiXG4vLyAgICB0aW55Y29sb3IubW9zdFJlYWRhYmxlKFwiI2E4MDE1YVwiLCBbXCIjZmFmM2YzXCJdLHtpbmNsdWRlRmFsbGJhY2tDb2xvcnM6dHJ1ZSxsZXZlbDpcIkFBQVwiLHNpemU6XCJsYXJnZVwifSkudG9IZXhTdHJpbmcoKTsgLy8gXCIjZmFmM2YzXCJcbi8vICAgIHRpbnljb2xvci5tb3N0UmVhZGFibGUoXCIjYTgwMTVhXCIsIFtcIiNmYWYzZjNcIl0se2luY2x1ZGVGYWxsYmFja0NvbG9yczp0cnVlLGxldmVsOlwiQUFBXCIsc2l6ZTpcInNtYWxsXCJ9KS50b0hleFN0cmluZygpOyAvLyBcIiNmZmZmZmZcIlxudGlueWNvbG9yLm1vc3RSZWFkYWJsZSA9IGZ1bmN0aW9uIChiYXNlQ29sb3IsIGNvbG9yTGlzdCwgYXJncykge1xuICB2YXIgYmVzdENvbG9yID0gbnVsbDtcbiAgdmFyIGJlc3RTY29yZSA9IDA7XG4gIHZhciByZWFkYWJpbGl0eTtcbiAgdmFyIGluY2x1ZGVGYWxsYmFja0NvbG9ycywgbGV2ZWwsIHNpemU7XG4gIGFyZ3MgPSBhcmdzIHx8IHt9O1xuICBpbmNsdWRlRmFsbGJhY2tDb2xvcnMgPSBhcmdzLmluY2x1ZGVGYWxsYmFja0NvbG9ycztcbiAgbGV2ZWwgPSBhcmdzLmxldmVsO1xuICBzaXplID0gYXJncy5zaXplO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29sb3JMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgcmVhZGFiaWxpdHkgPSB0aW55Y29sb3IucmVhZGFiaWxpdHkoYmFzZUNvbG9yLCBjb2xvckxpc3RbaV0pO1xuICAgIGlmIChyZWFkYWJpbGl0eSA+IGJlc3RTY29yZSkge1xuICAgICAgYmVzdFNjb3JlID0gcmVhZGFiaWxpdHk7XG4gICAgICBiZXN0Q29sb3IgPSB0aW55Y29sb3IoY29sb3JMaXN0W2ldKTtcbiAgICB9XG4gIH1cblxuICBpZiAoXG4gICAgdGlueWNvbG9yLmlzUmVhZGFibGUoYmFzZUNvbG9yLCBiZXN0Q29sb3IsIHtcbiAgICAgIGxldmVsOiBsZXZlbCxcbiAgICAgIHNpemU6IHNpemUsXG4gICAgfSkgfHxcbiAgICAhaW5jbHVkZUZhbGxiYWNrQ29sb3JzXG4gICkge1xuICAgIHJldHVybiBiZXN0Q29sb3I7XG4gIH0gZWxzZSB7XG4gICAgYXJncy5pbmNsdWRlRmFsbGJhY2tDb2xvcnMgPSBmYWxzZTtcbiAgICByZXR1cm4gdGlueWNvbG9yLm1vc3RSZWFkYWJsZShiYXNlQ29sb3IsIFtcIiNmZmZcIiwgXCIjMDAwXCJdLCBhcmdzKTtcbiAgfVxufTtcblxuLy8gQmlnIExpc3Qgb2YgQ29sb3JzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS1cbi8vIDxodHRwczovL3d3dy53My5vcmcvVFIvY3NzLWNvbG9yLTQvI25hbWVkLWNvbG9ycz5cbnZhciBuYW1lcyA9ICh0aW55Y29sb3IubmFtZXMgPSB7XG4gIGFsaWNlYmx1ZTogXCJmMGY4ZmZcIixcbiAgYW50aXF1ZXdoaXRlOiBcImZhZWJkN1wiLFxuICBhcXVhOiBcIjBmZlwiLFxuICBhcXVhbWFyaW5lOiBcIjdmZmZkNFwiLFxuICBhenVyZTogXCJmMGZmZmZcIixcbiAgYmVpZ2U6IFwiZjVmNWRjXCIsXG4gIGJpc3F1ZTogXCJmZmU0YzRcIixcbiAgYmxhY2s6IFwiMDAwXCIsXG4gIGJsYW5jaGVkYWxtb25kOiBcImZmZWJjZFwiLFxuICBibHVlOiBcIjAwZlwiLFxuICBibHVldmlvbGV0OiBcIjhhMmJlMlwiLFxuICBicm93bjogXCJhNTJhMmFcIixcbiAgYnVybHl3b29kOiBcImRlYjg4N1wiLFxuICBidXJudHNpZW5uYTogXCJlYTdlNWRcIixcbiAgY2FkZXRibHVlOiBcIjVmOWVhMFwiLFxuICBjaGFydHJldXNlOiBcIjdmZmYwMFwiLFxuICBjaG9jb2xhdGU6IFwiZDI2OTFlXCIsXG4gIGNvcmFsOiBcImZmN2Y1MFwiLFxuICBjb3JuZmxvd2VyYmx1ZTogXCI2NDk1ZWRcIixcbiAgY29ybnNpbGs6IFwiZmZmOGRjXCIsXG4gIGNyaW1zb246IFwiZGMxNDNjXCIsXG4gIGN5YW46IFwiMGZmXCIsXG4gIGRhcmtibHVlOiBcIjAwMDA4YlwiLFxuICBkYXJrY3lhbjogXCIwMDhiOGJcIixcbiAgZGFya2dvbGRlbnJvZDogXCJiODg2MGJcIixcbiAgZGFya2dyYXk6IFwiYTlhOWE5XCIsXG4gIGRhcmtncmVlbjogXCIwMDY0MDBcIixcbiAgZGFya2dyZXk6IFwiYTlhOWE5XCIsXG4gIGRhcmtraGFraTogXCJiZGI3NmJcIixcbiAgZGFya21hZ2VudGE6IFwiOGIwMDhiXCIsXG4gIGRhcmtvbGl2ZWdyZWVuOiBcIjU1NmIyZlwiLFxuICBkYXJrb3JhbmdlOiBcImZmOGMwMFwiLFxuICBkYXJrb3JjaGlkOiBcIjk5MzJjY1wiLFxuICBkYXJrcmVkOiBcIjhiMDAwMFwiLFxuICBkYXJrc2FsbW9uOiBcImU5OTY3YVwiLFxuICBkYXJrc2VhZ3JlZW46IFwiOGZiYzhmXCIsXG4gIGRhcmtzbGF0ZWJsdWU6IFwiNDgzZDhiXCIsXG4gIGRhcmtzbGF0ZWdyYXk6IFwiMmY0ZjRmXCIsXG4gIGRhcmtzbGF0ZWdyZXk6IFwiMmY0ZjRmXCIsXG4gIGRhcmt0dXJxdW9pc2U6IFwiMDBjZWQxXCIsXG4gIGRhcmt2aW9sZXQ6IFwiOTQwMGQzXCIsXG4gIGRlZXBwaW5rOiBcImZmMTQ5M1wiLFxuICBkZWVwc2t5Ymx1ZTogXCIwMGJmZmZcIixcbiAgZGltZ3JheTogXCI2OTY5NjlcIixcbiAgZGltZ3JleTogXCI2OTY5NjlcIixcbiAgZG9kZ2VyYmx1ZTogXCIxZTkwZmZcIixcbiAgZmlyZWJyaWNrOiBcImIyMjIyMlwiLFxuICBmbG9yYWx3aGl0ZTogXCJmZmZhZjBcIixcbiAgZm9yZXN0Z3JlZW46IFwiMjI4YjIyXCIsXG4gIGZ1Y2hzaWE6IFwiZjBmXCIsXG4gIGdhaW5zYm9ybzogXCJkY2RjZGNcIixcbiAgZ2hvc3R3aGl0ZTogXCJmOGY4ZmZcIixcbiAgZ29sZDogXCJmZmQ3MDBcIixcbiAgZ29sZGVucm9kOiBcImRhYTUyMFwiLFxuICBncmF5OiBcIjgwODA4MFwiLFxuICBncmVlbjogXCIwMDgwMDBcIixcbiAgZ3JlZW55ZWxsb3c6IFwiYWRmZjJmXCIsXG4gIGdyZXk6IFwiODA4MDgwXCIsXG4gIGhvbmV5ZGV3OiBcImYwZmZmMFwiLFxuICBob3RwaW5rOiBcImZmNjliNFwiLFxuICBpbmRpYW5yZWQ6IFwiY2Q1YzVjXCIsXG4gIGluZGlnbzogXCI0YjAwODJcIixcbiAgaXZvcnk6IFwiZmZmZmYwXCIsXG4gIGtoYWtpOiBcImYwZTY4Y1wiLFxuICBsYXZlbmRlcjogXCJlNmU2ZmFcIixcbiAgbGF2ZW5kZXJibHVzaDogXCJmZmYwZjVcIixcbiAgbGF3bmdyZWVuOiBcIjdjZmMwMFwiLFxuICBsZW1vbmNoaWZmb246IFwiZmZmYWNkXCIsXG4gIGxpZ2h0Ymx1ZTogXCJhZGQ4ZTZcIixcbiAgbGlnaHRjb3JhbDogXCJmMDgwODBcIixcbiAgbGlnaHRjeWFuOiBcImUwZmZmZlwiLFxuICBsaWdodGdvbGRlbnJvZHllbGxvdzogXCJmYWZhZDJcIixcbiAgbGlnaHRncmF5OiBcImQzZDNkM1wiLFxuICBsaWdodGdyZWVuOiBcIjkwZWU5MFwiLFxuICBsaWdodGdyZXk6IFwiZDNkM2QzXCIsXG4gIGxpZ2h0cGluazogXCJmZmI2YzFcIixcbiAgbGlnaHRzYWxtb246IFwiZmZhMDdhXCIsXG4gIGxpZ2h0c2VhZ3JlZW46IFwiMjBiMmFhXCIsXG4gIGxpZ2h0c2t5Ymx1ZTogXCI4N2NlZmFcIixcbiAgbGlnaHRzbGF0ZWdyYXk6IFwiNzg5XCIsXG4gIGxpZ2h0c2xhdGVncmV5OiBcIjc4OVwiLFxuICBsaWdodHN0ZWVsYmx1ZTogXCJiMGM0ZGVcIixcbiAgbGlnaHR5ZWxsb3c6IFwiZmZmZmUwXCIsXG4gIGxpbWU6IFwiMGYwXCIsXG4gIGxpbWVncmVlbjogXCIzMmNkMzJcIixcbiAgbGluZW46IFwiZmFmMGU2XCIsXG4gIG1hZ2VudGE6IFwiZjBmXCIsXG4gIG1hcm9vbjogXCI4MDAwMDBcIixcbiAgbWVkaXVtYXF1YW1hcmluZTogXCI2NmNkYWFcIixcbiAgbWVkaXVtYmx1ZTogXCIwMDAwY2RcIixcbiAgbWVkaXVtb3JjaGlkOiBcImJhNTVkM1wiLFxuICBtZWRpdW1wdXJwbGU6IFwiOTM3MGRiXCIsXG4gIG1lZGl1bXNlYWdyZWVuOiBcIjNjYjM3MVwiLFxuICBtZWRpdW1zbGF0ZWJsdWU6IFwiN2I2OGVlXCIsXG4gIG1lZGl1bXNwcmluZ2dyZWVuOiBcIjAwZmE5YVwiLFxuICBtZWRpdW10dXJxdW9pc2U6IFwiNDhkMWNjXCIsXG4gIG1lZGl1bXZpb2xldHJlZDogXCJjNzE1ODVcIixcbiAgbWlkbmlnaHRibHVlOiBcIjE5MTk3MFwiLFxuICBtaW50Y3JlYW06IFwiZjVmZmZhXCIsXG4gIG1pc3R5cm9zZTogXCJmZmU0ZTFcIixcbiAgbW9jY2FzaW46IFwiZmZlNGI1XCIsXG4gIG5hdmFqb3doaXRlOiBcImZmZGVhZFwiLFxuICBuYXZ5OiBcIjAwMDA4MFwiLFxuICBvbGRsYWNlOiBcImZkZjVlNlwiLFxuICBvbGl2ZTogXCI4MDgwMDBcIixcbiAgb2xpdmVkcmFiOiBcIjZiOGUyM1wiLFxuICBvcmFuZ2U6IFwiZmZhNTAwXCIsXG4gIG9yYW5nZXJlZDogXCJmZjQ1MDBcIixcbiAgb3JjaGlkOiBcImRhNzBkNlwiLFxuICBwYWxlZ29sZGVucm9kOiBcImVlZThhYVwiLFxuICBwYWxlZ3JlZW46IFwiOThmYjk4XCIsXG4gIHBhbGV0dXJxdW9pc2U6IFwiYWZlZWVlXCIsXG4gIHBhbGV2aW9sZXRyZWQ6IFwiZGI3MDkzXCIsXG4gIHBhcGF5YXdoaXA6IFwiZmZlZmQ1XCIsXG4gIHBlYWNocHVmZjogXCJmZmRhYjlcIixcbiAgcGVydTogXCJjZDg1M2ZcIixcbiAgcGluazogXCJmZmMwY2JcIixcbiAgcGx1bTogXCJkZGEwZGRcIixcbiAgcG93ZGVyYmx1ZTogXCJiMGUwZTZcIixcbiAgcHVycGxlOiBcIjgwMDA4MFwiLFxuICByZWJlY2NhcHVycGxlOiBcIjY2MzM5OVwiLFxuICByZWQ6IFwiZjAwXCIsXG4gIHJvc3licm93bjogXCJiYzhmOGZcIixcbiAgcm95YWxibHVlOiBcIjQxNjllMVwiLFxuICBzYWRkbGVicm93bjogXCI4YjQ1MTNcIixcbiAgc2FsbW9uOiBcImZhODA3MlwiLFxuICBzYW5keWJyb3duOiBcImY0YTQ2MFwiLFxuICBzZWFncmVlbjogXCIyZThiNTdcIixcbiAgc2Vhc2hlbGw6IFwiZmZmNWVlXCIsXG4gIHNpZW5uYTogXCJhMDUyMmRcIixcbiAgc2lsdmVyOiBcImMwYzBjMFwiLFxuICBza3libHVlOiBcIjg3Y2VlYlwiLFxuICBzbGF0ZWJsdWU6IFwiNmE1YWNkXCIsXG4gIHNsYXRlZ3JheTogXCI3MDgwOTBcIixcbiAgc2xhdGVncmV5OiBcIjcwODA5MFwiLFxuICBzbm93OiBcImZmZmFmYVwiLFxuICBzcHJpbmdncmVlbjogXCIwMGZmN2ZcIixcbiAgc3RlZWxibHVlOiBcIjQ2ODJiNFwiLFxuICB0YW46IFwiZDJiNDhjXCIsXG4gIHRlYWw6IFwiMDA4MDgwXCIsXG4gIHRoaXN0bGU6IFwiZDhiZmQ4XCIsXG4gIHRvbWF0bzogXCJmZjYzNDdcIixcbiAgdHVycXVvaXNlOiBcIjQwZTBkMFwiLFxuICB2aW9sZXQ6IFwiZWU4MmVlXCIsXG4gIHdoZWF0OiBcImY1ZGViM1wiLFxuICB3aGl0ZTogXCJmZmZcIixcbiAgd2hpdGVzbW9rZTogXCJmNWY1ZjVcIixcbiAgeWVsbG93OiBcImZmMFwiLFxuICB5ZWxsb3dncmVlbjogXCI5YWNkMzJcIixcbn0pO1xuXG4vLyBNYWtlIGl0IGVhc3kgdG8gYWNjZXNzIGNvbG9ycyB2aWEgYGhleE5hbWVzW2hleF1gXG52YXIgaGV4TmFtZXMgPSAodGlueWNvbG9yLmhleE5hbWVzID0gZmxpcChuYW1lcykpO1xuXG4vLyBVdGlsaXRpZXNcbi8vIC0tLS0tLS0tLVxuXG4vLyBgeyAnbmFtZTEnOiAndmFsMScgfWAgYmVjb21lcyBgeyAndmFsMSc6ICduYW1lMScgfWBcbmZ1bmN0aW9uIGZsaXAobykge1xuICB2YXIgZmxpcHBlZCA9IHt9O1xuICBmb3IgKHZhciBpIGluIG8pIHtcbiAgICBpZiAoby5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgZmxpcHBlZFtvW2ldXSA9IGk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmbGlwcGVkO1xufVxuXG4vLyBSZXR1cm4gYSB2YWxpZCBhbHBoYSB2YWx1ZSBbMCwxXSB3aXRoIGFsbCBpbnZhbGlkIHZhbHVlcyBiZWluZyBzZXQgdG8gMVxuZnVuY3Rpb24gYm91bmRBbHBoYShhKSB7XG4gIGEgPSBwYXJzZUZsb2F0KGEpO1xuXG4gIGlmIChpc05hTihhKSB8fCBhIDwgMCB8fCBhID4gMSkge1xuICAgIGEgPSAxO1xuICB9XG5cbiAgcmV0dXJuIGE7XG59XG5cbi8vIFRha2UgaW5wdXQgZnJvbSBbMCwgbl0gYW5kIHJldHVybiBpdCBhcyBbMCwgMV1cbmZ1bmN0aW9uIGJvdW5kMDEobiwgbWF4KSB7XG4gIGlmIChpc09uZVBvaW50WmVybyhuKSkgbiA9IFwiMTAwJVwiO1xuXG4gIHZhciBwcm9jZXNzUGVyY2VudCA9IGlzUGVyY2VudGFnZShuKTtcbiAgbiA9IE1hdGgubWluKG1heCwgTWF0aC5tYXgoMCwgcGFyc2VGbG9hdChuKSkpO1xuXG4gIC8vIEF1dG9tYXRpY2FsbHkgY29udmVydCBwZXJjZW50YWdlIGludG8gbnVtYmVyXG4gIGlmIChwcm9jZXNzUGVyY2VudCkge1xuICAgIG4gPSBwYXJzZUludChuICogbWF4LCAxMCkgLyAxMDA7XG4gIH1cblxuICAvLyBIYW5kbGUgZmxvYXRpbmcgcG9pbnQgcm91bmRpbmcgZXJyb3JzXG4gIGlmIChNYXRoLmFicyhuIC0gbWF4KSA8IDAuMDAwMDAxKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICAvLyBDb252ZXJ0IGludG8gWzAsIDFdIHJhbmdlIGlmIGl0IGlzbid0IGFscmVhZHlcbiAgcmV0dXJuIChuICUgbWF4KSAvIHBhcnNlRmxvYXQobWF4KTtcbn1cblxuLy8gRm9yY2UgYSBudW1iZXIgYmV0d2VlbiAwIGFuZCAxXG5mdW5jdGlvbiBjbGFtcDAxKHZhbCkge1xuICByZXR1cm4gTWF0aC5taW4oMSwgTWF0aC5tYXgoMCwgdmFsKSk7XG59XG5cbi8vIFBhcnNlIGEgYmFzZS0xNiBoZXggdmFsdWUgaW50byBhIGJhc2UtMTAgaW50ZWdlclxuZnVuY3Rpb24gcGFyc2VJbnRGcm9tSGV4KHZhbCkge1xuICByZXR1cm4gcGFyc2VJbnQodmFsLCAxNik7XG59XG5cbi8vIE5lZWQgdG8gaGFuZGxlIDEuMCBhcyAxMDAlLCBzaW5jZSBvbmNlIGl0IGlzIGEgbnVtYmVyLCB0aGVyZSBpcyBubyBkaWZmZXJlbmNlIGJldHdlZW4gaXQgYW5kIDFcbi8vIDxodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzc0MjIwNzIvamF2YXNjcmlwdC1ob3ctdG8tZGV0ZWN0LW51bWJlci1hcy1hLWRlY2ltYWwtaW5jbHVkaW5nLTEtMD5cbmZ1bmN0aW9uIGlzT25lUG9pbnRaZXJvKG4pIHtcbiAgcmV0dXJuIHR5cGVvZiBuID09IFwic3RyaW5nXCIgJiYgbi5pbmRleE9mKFwiLlwiKSAhPSAtMSAmJiBwYXJzZUZsb2F0KG4pID09PSAxO1xufVxuXG4vLyBDaGVjayB0byBzZWUgaWYgc3RyaW5nIHBhc3NlZCBpbiBpcyBhIHBlcmNlbnRhZ2VcbmZ1bmN0aW9uIGlzUGVyY2VudGFnZShuKSB7XG4gIHJldHVybiB0eXBlb2YgbiA9PT0gXCJzdHJpbmdcIiAmJiBuLmluZGV4T2YoXCIlXCIpICE9IC0xO1xufVxuXG4vLyBGb3JjZSBhIGhleCB2YWx1ZSB0byBoYXZlIDIgY2hhcmFjdGVyc1xuZnVuY3Rpb24gcGFkMihjKSB7XG4gIHJldHVybiBjLmxlbmd0aCA9PSAxID8gXCIwXCIgKyBjIDogXCJcIiArIGM7XG59XG5cbi8vIFJlcGxhY2UgYSBkZWNpbWFsIHdpdGggaXQncyBwZXJjZW50YWdlIHZhbHVlXG5mdW5jdGlvbiBjb252ZXJ0VG9QZXJjZW50YWdlKG4pIHtcbiAgaWYgKG4gPD0gMSkge1xuICAgIG4gPSBuICogMTAwICsgXCIlXCI7XG4gIH1cblxuICByZXR1cm4gbjtcbn1cblxuLy8gQ29udmVydHMgYSBkZWNpbWFsIHRvIGEgaGV4IHZhbHVlXG5mdW5jdGlvbiBjb252ZXJ0RGVjaW1hbFRvSGV4KGQpIHtcbiAgcmV0dXJuIE1hdGgucm91bmQocGFyc2VGbG9hdChkKSAqIDI1NSkudG9TdHJpbmcoMTYpO1xufVxuLy8gQ29udmVydHMgYSBoZXggdmFsdWUgdG8gYSBkZWNpbWFsXG5mdW5jdGlvbiBjb252ZXJ0SGV4VG9EZWNpbWFsKGgpIHtcbiAgcmV0dXJuIHBhcnNlSW50RnJvbUhleChoKSAvIDI1NTtcbn1cblxudmFyIG1hdGNoZXJzID0gKGZ1bmN0aW9uICgpIHtcbiAgLy8gPGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtdmFsdWVzLyNpbnRlZ2Vycz5cbiAgdmFyIENTU19JTlRFR0VSID0gXCJbLVxcXFwrXT9cXFxcZCslP1wiO1xuXG4gIC8vIDxodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLXZhbHVlcy8jbnVtYmVyLXZhbHVlPlxuICB2YXIgQ1NTX05VTUJFUiA9IFwiWy1cXFxcK10/XFxcXGQqXFxcXC5cXFxcZCslP1wiO1xuXG4gIC8vIEFsbG93IHBvc2l0aXZlL25lZ2F0aXZlIGludGVnZXIvbnVtYmVyLiAgRG9uJ3QgY2FwdHVyZSB0aGUgZWl0aGVyL29yLCBqdXN0IHRoZSBlbnRpcmUgb3V0Y29tZS5cbiAgdmFyIENTU19VTklUID0gXCIoPzpcIiArIENTU19OVU1CRVIgKyBcIil8KD86XCIgKyBDU1NfSU5URUdFUiArIFwiKVwiO1xuXG4gIC8vIEFjdHVhbCBtYXRjaGluZy5cbiAgLy8gUGFyZW50aGVzZXMgYW5kIGNvbW1hcyBhcmUgb3B0aW9uYWwsIGJ1dCBub3QgcmVxdWlyZWQuXG4gIC8vIFdoaXRlc3BhY2UgY2FuIHRha2UgdGhlIHBsYWNlIG9mIGNvbW1hcyBvciBvcGVuaW5nIHBhcmVuXG4gIHZhciBQRVJNSVNTSVZFX01BVENIMyA9XG4gICAgXCJbXFxcXHN8XFxcXChdKyhcIiArXG4gICAgQ1NTX1VOSVQgK1xuICAgIFwiKVssfFxcXFxzXSsoXCIgK1xuICAgIENTU19VTklUICtcbiAgICBcIilbLHxcXFxcc10rKFwiICtcbiAgICBDU1NfVU5JVCArXG4gICAgXCIpXFxcXHMqXFxcXCk/XCI7XG4gIHZhciBQRVJNSVNTSVZFX01BVENINCA9XG4gICAgXCJbXFxcXHN8XFxcXChdKyhcIiArXG4gICAgQ1NTX1VOSVQgK1xuICAgIFwiKVssfFxcXFxzXSsoXCIgK1xuICAgIENTU19VTklUICtcbiAgICBcIilbLHxcXFxcc10rKFwiICtcbiAgICBDU1NfVU5JVCArXG4gICAgXCIpWyx8XFxcXHNdKyhcIiArXG4gICAgQ1NTX1VOSVQgK1xuICAgIFwiKVxcXFxzKlxcXFwpP1wiO1xuXG4gIHJldHVybiB7XG4gICAgQ1NTX1VOSVQ6IG5ldyBSZWdFeHAoQ1NTX1VOSVQpLFxuICAgIHJnYjogbmV3IFJlZ0V4cChcInJnYlwiICsgUEVSTUlTU0lWRV9NQVRDSDMpLFxuICAgIHJnYmE6IG5ldyBSZWdFeHAoXCJyZ2JhXCIgKyBQRVJNSVNTSVZFX01BVENINCksXG4gICAgaHNsOiBuZXcgUmVnRXhwKFwiaHNsXCIgKyBQRVJNSVNTSVZFX01BVENIMyksXG4gICAgaHNsYTogbmV3IFJlZ0V4cChcImhzbGFcIiArIFBFUk1JU1NJVkVfTUFUQ0g0KSxcbiAgICBoc3Y6IG5ldyBSZWdFeHAoXCJoc3ZcIiArIFBFUk1JU1NJVkVfTUFUQ0gzKSxcbiAgICBoc3ZhOiBuZXcgUmVnRXhwKFwiaHN2YVwiICsgUEVSTUlTU0lWRV9NQVRDSDQpLFxuICAgIGhleDM6IC9eIz8oWzAtOWEtZkEtRl17MX0pKFswLTlhLWZBLUZdezF9KShbMC05YS1mQS1GXXsxfSkkLyxcbiAgICBoZXg2OiAvXiM/KFswLTlhLWZBLUZdezJ9KShbMC05YS1mQS1GXXsyfSkoWzAtOWEtZkEtRl17Mn0pJC8sXG4gICAgaGV4NDogL14jPyhbMC05YS1mQS1GXXsxfSkoWzAtOWEtZkEtRl17MX0pKFswLTlhLWZBLUZdezF9KShbMC05YS1mQS1GXXsxfSkkLyxcbiAgICBoZXg4OiAvXiM/KFswLTlhLWZBLUZdezJ9KShbMC05YS1mQS1GXXsyfSkoWzAtOWEtZkEtRl17Mn0pKFswLTlhLWZBLUZdezJ9KSQvLFxuICB9O1xufSkoKTtcblxuLy8gYGlzVmFsaWRDU1NVbml0YFxuLy8gVGFrZSBpbiBhIHNpbmdsZSBzdHJpbmcgLyBudW1iZXIgYW5kIGNoZWNrIHRvIHNlZSBpZiBpdCBsb29rcyBsaWtlIGEgQ1NTIHVuaXRcbi8vIChzZWUgYG1hdGNoZXJzYCBhYm92ZSBmb3IgZGVmaW5pdGlvbikuXG5mdW5jdGlvbiBpc1ZhbGlkQ1NTVW5pdChjb2xvcikge1xuICByZXR1cm4gISFtYXRjaGVycy5DU1NfVU5JVC5leGVjKGNvbG9yKTtcbn1cblxuLy8gYHN0cmluZ0lucHV0VG9PYmplY3RgXG4vLyBQZXJtaXNzaXZlIHN0cmluZyBwYXJzaW5nLiAgVGFrZSBpbiBhIG51bWJlciBvZiBmb3JtYXRzLCBhbmQgb3V0cHV0IGFuIG9iamVjdFxuLy8gYmFzZWQgb24gZGV0ZWN0ZWQgZm9ybWF0LiAgUmV0dXJucyBgeyByLCBnLCBiIH1gIG9yIGB7IGgsIHMsIGwgfWAgb3IgYHsgaCwgcywgdn1gXG5mdW5jdGlvbiBzdHJpbmdJbnB1dFRvT2JqZWN0KGNvbG9yKSB7XG4gIGNvbG9yID0gY29sb3IucmVwbGFjZSh0cmltTGVmdCwgXCJcIikucmVwbGFjZSh0cmltUmlnaHQsIFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gIHZhciBuYW1lZCA9IGZhbHNlO1xuICBpZiAobmFtZXNbY29sb3JdKSB7XG4gICAgY29sb3IgPSBuYW1lc1tjb2xvcl07XG4gICAgbmFtZWQgPSB0cnVlO1xuICB9IGVsc2UgaWYgKGNvbG9yID09IFwidHJhbnNwYXJlbnRcIikge1xuICAgIHJldHVybiB7IHI6IDAsIGc6IDAsIGI6IDAsIGE6IDAsIGZvcm1hdDogXCJuYW1lXCIgfTtcbiAgfVxuXG4gIC8vIFRyeSB0byBtYXRjaCBzdHJpbmcgaW5wdXQgdXNpbmcgcmVndWxhciBleHByZXNzaW9ucy5cbiAgLy8gS2VlcCBtb3N0IG9mIHRoZSBudW1iZXIgYm91bmRpbmcgb3V0IG9mIHRoaXMgZnVuY3Rpb24gLSBkb24ndCB3b3JyeSBhYm91dCBbMCwxXSBvciBbMCwxMDBdIG9yIFswLDM2MF1cbiAgLy8gSnVzdCByZXR1cm4gYW4gb2JqZWN0IGFuZCBsZXQgdGhlIGNvbnZlcnNpb24gZnVuY3Rpb25zIGhhbmRsZSB0aGF0LlxuICAvLyBUaGlzIHdheSB0aGUgcmVzdWx0IHdpbGwgYmUgdGhlIHNhbWUgd2hldGhlciB0aGUgdGlueWNvbG9yIGlzIGluaXRpYWxpemVkIHdpdGggc3RyaW5nIG9yIG9iamVjdC5cbiAgdmFyIG1hdGNoO1xuICBpZiAoKG1hdGNoID0gbWF0Y2hlcnMucmdiLmV4ZWMoY29sb3IpKSkge1xuICAgIHJldHVybiB7IHI6IG1hdGNoWzFdLCBnOiBtYXRjaFsyXSwgYjogbWF0Y2hbM10gfTtcbiAgfVxuICBpZiAoKG1hdGNoID0gbWF0Y2hlcnMucmdiYS5leGVjKGNvbG9yKSkpIHtcbiAgICByZXR1cm4geyByOiBtYXRjaFsxXSwgZzogbWF0Y2hbMl0sIGI6IG1hdGNoWzNdLCBhOiBtYXRjaFs0XSB9O1xuICB9XG4gIGlmICgobWF0Y2ggPSBtYXRjaGVycy5oc2wuZXhlYyhjb2xvcikpKSB7XG4gICAgcmV0dXJuIHsgaDogbWF0Y2hbMV0sIHM6IG1hdGNoWzJdLCBsOiBtYXRjaFszXSB9O1xuICB9XG4gIGlmICgobWF0Y2ggPSBtYXRjaGVycy5oc2xhLmV4ZWMoY29sb3IpKSkge1xuICAgIHJldHVybiB7IGg6IG1hdGNoWzFdLCBzOiBtYXRjaFsyXSwgbDogbWF0Y2hbM10sIGE6IG1hdGNoWzRdIH07XG4gIH1cbiAgaWYgKChtYXRjaCA9IG1hdGNoZXJzLmhzdi5leGVjKGNvbG9yKSkpIHtcbiAgICByZXR1cm4geyBoOiBtYXRjaFsxXSwgczogbWF0Y2hbMl0sIHY6IG1hdGNoWzNdIH07XG4gIH1cbiAgaWYgKChtYXRjaCA9IG1hdGNoZXJzLmhzdmEuZXhlYyhjb2xvcikpKSB7XG4gICAgcmV0dXJuIHsgaDogbWF0Y2hbMV0sIHM6IG1hdGNoWzJdLCB2OiBtYXRjaFszXSwgYTogbWF0Y2hbNF0gfTtcbiAgfVxuICBpZiAoKG1hdGNoID0gbWF0Y2hlcnMuaGV4OC5leGVjKGNvbG9yKSkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzFdKSxcbiAgICAgIGc6IHBhcnNlSW50RnJvbUhleChtYXRjaFsyXSksXG4gICAgICBiOiBwYXJzZUludEZyb21IZXgobWF0Y2hbM10pLFxuICAgICAgYTogY29udmVydEhleFRvRGVjaW1hbChtYXRjaFs0XSksXG4gICAgICBmb3JtYXQ6IG5hbWVkID8gXCJuYW1lXCIgOiBcImhleDhcIixcbiAgICB9O1xuICB9XG4gIGlmICgobWF0Y2ggPSBtYXRjaGVycy5oZXg2LmV4ZWMoY29sb3IpKSkge1xuICAgIHJldHVybiB7XG4gICAgICByOiBwYXJzZUludEZyb21IZXgobWF0Y2hbMV0pLFxuICAgICAgZzogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzJdKSxcbiAgICAgIGI6IHBhcnNlSW50RnJvbUhleChtYXRjaFszXSksXG4gICAgICBmb3JtYXQ6IG5hbWVkID8gXCJuYW1lXCIgOiBcImhleFwiLFxuICAgIH07XG4gIH1cbiAgaWYgKChtYXRjaCA9IG1hdGNoZXJzLmhleDQuZXhlYyhjb2xvcikpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IHBhcnNlSW50RnJvbUhleChtYXRjaFsxXSArIFwiXCIgKyBtYXRjaFsxXSksXG4gICAgICBnOiBwYXJzZUludEZyb21IZXgobWF0Y2hbMl0gKyBcIlwiICsgbWF0Y2hbMl0pLFxuICAgICAgYjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzNdICsgXCJcIiArIG1hdGNoWzNdKSxcbiAgICAgIGE6IGNvbnZlcnRIZXhUb0RlY2ltYWwobWF0Y2hbNF0gKyBcIlwiICsgbWF0Y2hbNF0pLFxuICAgICAgZm9ybWF0OiBuYW1lZCA/IFwibmFtZVwiIDogXCJoZXg4XCIsXG4gICAgfTtcbiAgfVxuICBpZiAoKG1hdGNoID0gbWF0Y2hlcnMuaGV4My5leGVjKGNvbG9yKSkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzFdICsgXCJcIiArIG1hdGNoWzFdKSxcbiAgICAgIGc6IHBhcnNlSW50RnJvbUhleChtYXRjaFsyXSArIFwiXCIgKyBtYXRjaFsyXSksXG4gICAgICBiOiBwYXJzZUludEZyb21IZXgobWF0Y2hbM10gKyBcIlwiICsgbWF0Y2hbM10pLFxuICAgICAgZm9ybWF0OiBuYW1lZCA/IFwibmFtZVwiIDogXCJoZXhcIixcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVdDQUcyUGFybXMocGFybXMpIHtcbiAgLy8gcmV0dXJuIHZhbGlkIFdDQUcyIHBhcm1zIGZvciBpc1JlYWRhYmxlLlxuICAvLyBJZiBpbnB1dCBwYXJtcyBhcmUgaW52YWxpZCwgcmV0dXJuIHtcImxldmVsXCI6XCJBQVwiLCBcInNpemVcIjpcInNtYWxsXCJ9XG4gIHZhciBsZXZlbCwgc2l6ZTtcbiAgcGFybXMgPSBwYXJtcyB8fCB7IGxldmVsOiBcIkFBXCIsIHNpemU6IFwic21hbGxcIiB9O1xuICBsZXZlbCA9IChwYXJtcy5sZXZlbCB8fCBcIkFBXCIpLnRvVXBwZXJDYXNlKCk7XG4gIHNpemUgPSAocGFybXMuc2l6ZSB8fCBcInNtYWxsXCIpLnRvTG93ZXJDYXNlKCk7XG4gIGlmIChsZXZlbCAhPT0gXCJBQVwiICYmIGxldmVsICE9PSBcIkFBQVwiKSB7XG4gICAgbGV2ZWwgPSBcIkFBXCI7XG4gIH1cbiAgaWYgKHNpemUgIT09IFwic21hbGxcIiAmJiBzaXplICE9PSBcImxhcmdlXCIpIHtcbiAgICBzaXplID0gXCJzbWFsbFwiO1xuICB9XG4gIHJldHVybiB7IGxldmVsOiBsZXZlbCwgc2l6ZTogc2l6ZSB9O1xufVxuXG5mdW5jdGlvbiBpbnNlcnRBZnRlcihleGlzdGluZ05vZGUsIG5ld05vZGUpIHtcbiAgICB2YXIgX2E7XG4gICAgKF9hID0gZXhpc3RpbmdOb2RlLnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pbnNlcnRCZWZvcmUobmV3Tm9kZSwgZXhpc3RpbmdOb2RlLm5leHRTaWJsaW5nKTtcbiAgICByZXR1cm4gZXhpc3RpbmdOb2RlO1xufVxuZnVuY3Rpb24gd3JhcChlbGUsIHdyYXBwZXIpIHtcbiAgICBlbGUucmVwbGFjZVdpdGgod3JhcHBlcik7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChlbGUpO1xuICAgIHJldHVybiBlbGU7XG59XG5mdW5jdGlvbiBvdXRlcldpZHRoV2l0aE1hcmdpbihlbGUpIHtcbiAgICBjb25zdCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZSk7XG4gICAgcmV0dXJuIChlbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggK1xuICAgICAgICBwYXJzZUZsb2F0KHN0eWxlLm1hcmdpbkxlZnQpICtcbiAgICAgICAgcGFyc2VGbG9hdChzdHlsZS5tYXJnaW5SaWdodCkpO1xufVxuXG5mdW5jdGlvbiBodG1sKGh0bWwsIGRvYyA9IGRvY3VtZW50KSB7XG4gICAgY29uc3QgZGl2ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5pbm5lckhUTUwgPSBodG1sO1xuICAgIHJldHVybiBkaXYuY2hpbGRyZW5bMF07XG59XG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0LCBkZWJvdW5jZSA9IHVuZGVmaW5lZCkge1xuICAgIGxldCB0aW1lb3V0O1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIGNvbnN0IHRocm90dGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGRlYm91bmNlKVxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICBpZiAoZGVib3VuY2UgfHwgIXRpbWVvdXQpIHtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KHRocm90dGxlciwgd2FpdCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gYWRkQ2xhc3MoZWxlLCBjbGFzc05hbWUpIHtcbiAgICBjb25zdCBjbGFzc2VzID0gY2xhc3NOYW1lLnNwbGl0KCcgJykuZmlsdGVyKChjKSA9PiBjICE9PSAnJyk7XG4gICAgaWYgKGNsYXNzTmFtZSAhPT0gJycgJiYgY2xhc3Nlcy5sZW5ndGgpIHtcbiAgICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlcyk7XG4gICAgfVxuICAgIHJldHVybiBlbGU7XG59XG5mdW5jdGlvbiByZW1vdmVDbGFzcyhlbGUsIGNsYXNzTmFtZSkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKS5maWx0ZXIoKGMpID0+IGMgIT09ICcnKTtcbiAgICBpZiAoY2xhc3NOYW1lICE9PSAnJyAmJiBjbGFzc2VzLmxlbmd0aCkge1xuICAgICAgICBlbGUuY2xhc3NMaXN0LnJlbW92ZSguLi5jbGFzc2VzKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsZTtcbn1cbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGVsZSwgY2xhc3NOYW1lLCBzdGF0ZSA9IHVuZGVmaW5lZCkge1xuICAgIGlmIChzdGF0ZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgZWxlLmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lLCBzdGF0ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHN0YXRlID09PSB0cnVlKSB7XG4gICAgICAgIGFkZENsYXNzKGVsZSwgY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZUNsYXNzKGVsZSwgY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsZTtcbn1cbmZ1bmN0aW9uIGVtaXQoZWxlLCBldmVudE5hbWUsIGRldGFpbCA9IHt9KSB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZlbnROYW1lLCB7XG4gICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgIGRldGFpbCxcbiAgICB9KTtcbiAgICBlbGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgcmV0dXJuIGV2ZW50O1xufVxuZnVuY3Rpb24gZXZlbnREZWxlZ2F0ZShlbGUsIGV2ZW50TmFtZSwgc2VsZWN0b3IsIGxpc3RlbmVyLCBwYXlsb2FkID0ge30pIHtcbiAgICBlbGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldC5jbG9zZXN0KHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgZS5kYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZS5kYXRhIHx8IHt9LCBwYXlsb2FkKTtcbiAgICAgICAgICAgIGxpc3RlbmVyKGUpO1xuICAgICAgICB9XG4gICAgfSwgcGF5bG9hZCk7XG59XG5mdW5jdGlvbiBzZXRFbGVtZW50T2Zmc2V0KGVsZW0sIG9wdGlvbnMpIHtcbiAgICBsZXQgY3VyUG9zaXRpb247XG4gICAgbGV0IGN1clRvcDtcbiAgICBsZXQgY3VyTGVmdDtcbiAgICBsZXQgY2FsY3VsYXRlUG9zaXRpb247XG4gICAgbGV0IHBvc2l0aW9uID0gZWxlbS5zdHlsZS5wb3NpdGlvbjtcbiAgICBsZXQgY3VyRWxlbSA9IGVsZW07XG4gICAgbGV0IHByb3BzID0ge307XG4gICAgLy8gU2V0IHBvc2l0aW9uIGZpcnN0LCBpbi1jYXNlIHRvcC9sZWZ0IGFyZSBzZXQgZXZlbiBvbiBzdGF0aWMgZWxlbVxuICAgIGlmIChwb3NpdGlvbiA9PT0gXCJzdGF0aWNcIikge1xuICAgICAgICBlbGVtLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuICAgIH1cbiAgICBsZXQgY3VyT2Zmc2V0ID0gZ2V0RWxlbWVudE9mZnNldChjdXJFbGVtKTtcbiAgICBsZXQgY3VyQ1NTVG9wID0gZWxlbS5zdHlsZS50b3A7XG4gICAgbGV0IGN1ckNTU0xlZnQgPSBlbGVtLnN0eWxlLmxlZnQ7XG4gICAgY2FsY3VsYXRlUG9zaXRpb24gPSAocG9zaXRpb24gPT09IFwiYWJzb2x1dGVcIiB8fCBwb3NpdGlvbiA9PT0gXCJmaXhlZFwiKSAmJlxuICAgICAgICAoY3VyQ1NTVG9wICsgY3VyQ1NTTGVmdCkuaW5kZXhPZihcImF1dG9cIikgPiAtMTtcbiAgICAvLyBOZWVkIHRvIGJlIGFibGUgdG8gY2FsY3VsYXRlIHBvc2l0aW9uIGlmIGVpdGhlclxuICAgIC8vIHRvcCBvciBsZWZ0IGlzIGF1dG8gYW5kIHBvc2l0aW9uIGlzIGVpdGhlciBhYnNvbHV0ZSBvciBmaXhlZFxuICAgIGlmIChjYWxjdWxhdGVQb3NpdGlvbikge1xuICAgICAgICBjdXJQb3NpdGlvbiA9IGdldEVsZW1lbnRQb3NpdGlvbihjdXJFbGVtKTtcbiAgICAgICAgY3VyVG9wID0gY3VyUG9zaXRpb24udG9wO1xuICAgICAgICBjdXJMZWZ0ID0gY3VyUG9zaXRpb24ubGVmdDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGN1clRvcCA9IHBhcnNlRmxvYXQoY3VyQ1NTVG9wKSB8fCAwO1xuICAgICAgICBjdXJMZWZ0ID0gcGFyc2VGbG9hdChjdXJDU1NMZWZ0KSB8fCAwO1xuICAgIH1cbiAgICAvLyBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyAgIG9wdGlvbnMgPSBvcHRpb25zLmNhbGwoZWxlbSwgT2JqZWN0LmFzc2lnbih7fSwgY3VyT2Zmc2V0KSkgYXMgT2Zmc2V0Q1NTT3B0aW9ucztcbiAgICAvLyB9XG4gICAgaWYgKG9wdGlvbnMudG9wICE9IG51bGwpIHtcbiAgICAgICAgcHJvcHMudG9wID0gKG9wdGlvbnMudG9wIC0gY3VyT2Zmc2V0LnRvcCkgKyBjdXJUb3A7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmxlZnQgIT0gbnVsbCkge1xuICAgICAgICBwcm9wcy5sZWZ0ID0gKG9wdGlvbnMubGVmdCAtIGN1ck9mZnNldC5sZWZ0KSArIGN1ckxlZnQ7XG4gICAgfVxuICAgIGlmIChcInVzaW5nXCIgaW4gb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zLnVzaW5nLmNhbGwoZWxlbSwgcHJvcHMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZm9yIChjb25zdCBrIGluIHByb3BzKSB7XG4gICAgICAgICAgICBjdXJFbGVtLnN0eWxlLnNldFByb3BlcnR5KGssIHByb3BzW2tdICsgJ3B4Jyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBnZXRFbGVtZW50T2Zmc2V0KGVsKSB7XG4gICAgY29uc3QgYm94ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IGJveC50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQgLSBkb2NFbGVtLmNsaWVudFRvcCxcbiAgICAgICAgbGVmdDogYm94LmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQgLSBkb2NFbGVtLmNsaWVudExlZnQsXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGdldEVsZW1lbnRQb3NpdGlvbihlbCkge1xuICAgIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB7IG1hcmdpblRvcCwgbWFyZ2luTGVmdCB9ID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiB0b3AgLSBwYXJzZUludChtYXJnaW5Ub3AsIDEwKSxcbiAgICAgICAgbGVmdDogbGVmdCAtIHBhcnNlSW50KG1hcmdpbkxlZnQsIDEwKSxcbiAgICB9O1xufVxuXG4vKipcbiAqIHNwZWN0cnVtLXZhbmlsbGEuanNcbiAqXG4gKiBAY29weXJpZ2h0ICBDb3B5cmlnaHQgKEMpIDIwMjMuXG4gKiBAbGljZW5zZSAgICBNSVRcbiAqL1xuY29uc3QgZGVmYXVsdE9wdHMgPSB7XG4gICAgLy8gQ2FsbGJhY2tzXG4gICAgYmVmb3JlU2hvdzogbm9vcCxcbiAgICBtb3ZlOiBub29wLFxuICAgIGNoYW5nZTogbm9vcCxcbiAgICBzaG93OiBub29wLFxuICAgIGhpZGU6IG5vb3AsXG4gICAgLy8gT3B0aW9uc1xuICAgIGNvbG9yOiAnJyxcbiAgICB0eXBlOiAnY29tcG9uZW50JyxcbiAgICBzaG93SW5wdXQ6IGZhbHNlLFxuICAgIGFsbG93RW1wdHk6IHRydWUsXG4gICAgc2hvd0J1dHRvbnM6IHRydWUsXG4gICAgY2xpY2tvdXRGaXJlc0NoYW5nZTogdHJ1ZSxcbiAgICBzaG93SW5pdGlhbDogZmFsc2UsXG4gICAgc2hvd1BhbGV0dGU6IHRydWUsXG4gICAgc2hvd1BhbGV0dGVPbmx5OiBmYWxzZSxcbiAgICBoaWRlQWZ0ZXJQYWxldHRlU2VsZWN0OiBmYWxzZSxcbiAgICB0b2dnbGVQYWxldHRlT25seTogZmFsc2UsXG4gICAgc2hvd1NlbGVjdGlvblBhbGV0dGU6IHRydWUsXG4gICAgbG9jYWxTdG9yYWdlS2V5OiAnJyxcbiAgICBhcHBlbmRUbzogJ2JvZHknLFxuICAgIG1heFNlbGVjdGlvblNpemU6IDgsXG4gICAgbG9jYWxlOiAnZW4nLFxuICAgIGNhbmNlbFRleHQ6ICdjYW5jZWwnLFxuICAgIGNob29zZVRleHQ6ICdjaG9vc2UnLFxuICAgIHRvZ2dsZVBhbGV0dGVNb3JlVGV4dDogJ21vcmUnLFxuICAgIHRvZ2dsZVBhbGV0dGVMZXNzVGV4dDogJ2xlc3MnLFxuICAgIGNsZWFyVGV4dDogJ0NsZWFyIENvbG9yIFNlbGVjdGlvbicsXG4gICAgbm9Db2xvclNlbGVjdGVkVGV4dDogJ05vIENvbG9yIFNlbGVjdGVkJyxcbiAgICBwcmVmZXJyZWRGb3JtYXQ6ICduYW1lJyxcbiAgICBjb250YWluZXJDbGFzc05hbWU6ICcnLFxuICAgIHJlcGxhY2VyQ2xhc3NOYW1lOiAnJyxcbiAgICBzaG93QWxwaGE6IHRydWUsXG4gICAgdGhlbWU6ICdzcC1saWdodCcsXG4gICAgcGFsZXR0ZTogW1xuICAgICAgICBbJyMwMDAwMDAnLCAnIzQ0NDQ0NCcsICcjNWI1YjViJywgJyM5OTk5OTknLCAnI2JjYmNiYycsICcjZWVlZWVlJywgJyNmM2Y2ZjQnLCAnI2ZmZmZmZiddLFxuICAgICAgICBbJyNmNDQzMzYnLCAnIzc0NDcwMCcsICcjY2U3ZTAwJywgJyM4ZmNlMDAnLCAnIzI5ODZjYycsICcjMTY1MzdlJywgJyM2YTMyOWYnLCAnI2M5MDA3NiddLFxuICAgICAgICBbJyNmNGNjY2MnLCAnI2ZjZTVjZCcsICcjZmZmMmNjJywgJyNkOWVhZDMnLCAnI2QwZTBlMycsICcjY2ZlMmYzJywgJyNkOWQyZTknLCAnI2VhZDFkYyddLFxuICAgICAgICBbJyNlYTk5OTknLCAnI2Y5Y2I5YycsICcjZmZlNTk5JywgJyNiNmQ3YTgnLCAnI2EyYzRjOScsICcjOWZjNWU4JywgJyNiNGE3ZDYnLCAnI2Q1YTZiZCddLFxuICAgICAgICBbJyNlMDY2NjYnLCAnI2Y2YjI2YicsICcjZmZkOTY2JywgJyM5M2M0N2QnLCAnIzc2YTVhZicsICcjNmZhOGRjJywgJyM4ZTdjYzMnLCAnI2MyN2JhMCddLFxuICAgICAgICBbJyNjYzAwMDAnLCAnI2U2OTEzOCcsICcjZjFjMjMyJywgJyM2YWE4NGYnLCAnIzQ1ODE4ZScsICcjM2Q4NWM2JywgJyM2NzRlYTcnLCAnI2E2NGQ3OSddLFxuICAgICAgICBbJyM5OTAwMDAnLCAnI2I0NWYwNicsICcjYmY5MDAwJywgJyMzODc2MWQnLCAnIzEzNGY1YycsICcjMGI1Mzk0JywgJyMzNTFjNzUnLCAnIzc0MWI0NyddLFxuICAgICAgICBbJyM2NjAwMDAnLCAnIzc4M2YwNCcsICcjN2Y2MDAwJywgJyMyNzRlMTMnLCAnIzBjMzQzZCcsICcjMDczNzYzJywgJyMyMDEyNGQnLCAnIzRjMTEzMCddLFxuICAgIF0sXG4gICAgc2VsZWN0aW9uUGFsZXR0ZTogW10sXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIG9mZnNldDogbnVsbCxcbn0sIHNwZWN0cnVtcyA9IFtdLCByZXBsYWNlSW5wdXQgPSBodG1sKFtcbiAgICAnPGRpdiBjbGFzcz1cXCdzcC1yZXBsYWNlclxcJz4nLFxuICAgICc8ZGl2IGNsYXNzPVxcJ3NwLXByZXZpZXdcXCc+PGRpdiBjbGFzcz1cXCdzcC1wcmV2aWV3LWlubmVyXFwnPjwvZGl2PjwvZGl2PicsXG4gICAgJzxkaXYgY2xhc3M9XFwnc3AtZGRcXCc+JiM5NjYwOzwvZGl2PicsXG4gICAgJzwvZGl2PicsXG5dLmpvaW4oJycpKSwgbWFya3VwID0gKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICAnPGRpdiBjbGFzcz1cXCdzcC1jb250YWluZXIgc3AtaGlkZGVuXFwnPicsXG4gICAgICAgICc8ZGl2IGNsYXNzPVxcJ3NwLXBhbGV0dGUtY29udGFpbmVyXFwnPicsXG4gICAgICAgICc8ZGl2IGNsYXNzPVxcJ3NwLXBhbGV0dGUgc3AtdGh1bWIgc3AtY2ZcXCc+PC9kaXY+JyxcbiAgICAgICAgJzxkaXYgY2xhc3M9XFwnc3AtcGFsZXR0ZS1idXR0b24tY29udGFpbmVyIHNwLWNmXFwnPicsXG4gICAgICAgICc8YnV0dG9uIHR5cGU9XFwnYnV0dG9uXFwnIGNsYXNzPVxcJ3NwLXBhbGV0dGUtdG9nZ2xlXFwnPjwvYnV0dG9uPicsXG4gICAgICAgICc8L2Rpdj4nLFxuICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgJzxkaXYgY2xhc3M9XFwnc3AtcGlja2VyLWNvbnRhaW5lclxcJz4nLFxuICAgICAgICAnPGRpdiBjbGFzcz1cXCdzcC10b3Agc3AtY2ZcXCc+JyxcbiAgICAgICAgJzxkaXYgY2xhc3M9XFwnc3AtZmlsbFxcJz48L2Rpdj4nLFxuICAgICAgICAnPGRpdiBjbGFzcz1cXCdzcC10b3AtaW5uZXJcXCc+JyxcbiAgICAgICAgJzxkaXYgY2xhc3M9XFwnc3AtY29sb3JcXCc+JyxcbiAgICAgICAgJzxkaXYgY2xhc3M9XFwnc3Atc2F0XFwnPicsXG4gICAgICAgICc8ZGl2IGNsYXNzPVxcJ3NwLXZhbFxcJz4nLFxuICAgICAgICAnPGRpdiBjbGFzcz1cXCdzcC1kcmFnZ2VyXFwnPjwvZGl2PicsXG4gICAgICAgICc8L2Rpdj4nLFxuICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgJzwvZGl2PicsXG4gICAgICAgICc8ZGl2IGNsYXNzPVxcJ3NwLWNsZWFyIHNwLWNsZWFyLWRpc3BsYXlcXCc+JyxcbiAgICAgICAgJzwvZGl2PicsXG4gICAgICAgICc8ZGl2IGNsYXNzPVxcJ3NwLWh1ZVxcJz4nLFxuICAgICAgICAnPGRpdiBjbGFzcz1cXCdzcC1zbGlkZXJcXCc+PC9kaXY+JyxcbiAgICAgICAgJzwvZGl2PicsXG4gICAgICAgICc8L2Rpdj4nLFxuICAgICAgICAnPGRpdiBjbGFzcz1cXCdzcC1hbHBoYVxcJz48ZGl2IGNsYXNzPVxcJ3NwLWFscGhhLWlubmVyXFwnPjxkaXYgY2xhc3M9XFwnc3AtYWxwaGEtaGFuZGxlXFwnPjwvZGl2PjwvZGl2PjwvZGl2PicsXG4gICAgICAgICc8L2Rpdj4nLFxuICAgICAgICAnPGRpdiBjbGFzcz1cXCdzcC1pbnB1dC1jb250YWluZXIgc3AtY2ZcXCc+JyxcbiAgICAgICAgJzxpbnB1dCBjbGFzcz1cXCdzcC1pbnB1dFxcJyB0eXBlPVxcJ3RleHRcXCcgc3BlbGxjaGVjaz1cXCdmYWxzZVxcJyAgLz4nLFxuICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgJzxkaXYgY2xhc3M9XFwnc3AtaW5pdGlhbCBzcC10aHVtYiBzcC1jZlxcJz48L2Rpdj4nLFxuICAgICAgICAnPGRpdiBjbGFzcz1cXCdzcC1idXR0b24tY29udGFpbmVyIHNwLWNmXFwnPicsXG4gICAgICAgICc8YnV0dG9uIGNsYXNzPVxcJ3NwLWNhbmNlbFxcJyBocmVmPVxcJyNcXCc+PC9idXR0b24+JyxcbiAgICAgICAgJzxidXR0b24gdHlwZT1cXCdidXR0b25cXCcgY2xhc3M9XFwnc3AtY2hvb3NlXFwnPjwvYnV0dG9uPicsXG4gICAgICAgICc8L2Rpdj4nLFxuICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgJzwvZGl2PicsXG4gICAgXS5qb2luKCcnKTtcbn0pKCk7XG5mdW5jdGlvbiBwYWxldHRlVGVtcGxhdGUocCwgY29sb3IsIGNsYXNzTmFtZSwgb3B0cykge1xuICAgIGNvbnN0IGh0bWwgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IHBbaV07XG4gICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICBjb25zdCB0aW55ID0gdGlueWNvbG9yKGN1cnJlbnQpO1xuICAgICAgICAgICAgbGV0IGMgPSB0aW55LnRvSHNsKCkubCA8IDAuNSA/ICdzcC10aHVtYi1lbCBzcC10aHVtYi1kYXJrJyA6ICdzcC10aHVtYi1lbCBzcC10aHVtYi1saWdodCc7XG4gICAgICAgICAgICBjICs9ICh0aW55Y29sb3IuZXF1YWxzKGNvbG9yLCBjdXJyZW50KSkgPyAnIHNwLXRodW1iLWFjdGl2ZScgOiAnJztcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFN0cmluZyA9IHRpbnkudG9TdHJpbmcob3B0cy5wcmVmZXJyZWRGb3JtYXQgfHwgJ3JnYicpO1xuICAgICAgICAgICAgY29uc3Qgc3dhdGNoU3R5bGUgPSAnYmFja2dyb3VuZC1jb2xvcjonICsgdGlueS50b1JnYlN0cmluZygpO1xuICAgICAgICAgICAgaHRtbC5wdXNoKCc8c3BhbiB0aXRsZT1cIicgKyBmb3JtYXR0ZWRTdHJpbmcgKyAnXCIgZGF0YS1jb2xvcj1cIicgKyB0aW55LnRvUmdiU3RyaW5nKCkgKyAnXCIgY2xhc3M9XCInICsgYyArICdcIj48c3BhbiBjbGFzcz1cInNwLXRodW1iLWlubmVyXCIgc3R5bGU9XCInICsgc3dhdGNoU3R5bGUgKyAnO1wiPjwvc3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBodG1sLnB1c2goJzxzcGFuIGNsYXNzPVwic3AtdGh1bWItZWwgc3AtY2xlYXItZGlzcGxheVwiID48c3BhbiBjbGFzcz1cInNwLWNsZWFyLXBhbGV0dGUtb25seVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XCI+PC9zcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJzxkaXYgY2xhc3M9XFwnc3AtY2YgJyArIGNsYXNzTmFtZSArICdcXCc+JyArIGh0bWwuam9pbignJykgKyAnPC9kaXY+Jztcbn1cbmZ1bmN0aW9uIGhpZGVBbGwoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGVjdHJ1bXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNwZWN0cnVtc1tpXSkge1xuICAgICAgICAgICAgc3BlY3RydW1zW2ldLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGluc3RhbmNlT3B0aW9ucyhvcHRpb25zLCBlbGVtZW50KSB7XG4gICAgLy8gQ2xvbmUgZmlyc3RcbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyk7XG4gICAgb3B0aW9ucy5sb2NhbGUgPSBvcHRpb25zLmxvY2FsZSB8fCB3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlO1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2NhbGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmxvY2FsZSkge1xuICAgICAgICAgICAgLy8gaGFuZGxlIGxvY2FsZSBsaWtlIFwiemgtVFdcIiB0byBcInpoLXR3XCJcbiAgICAgICAgICAgIC8vIGhhbmRsZSBsb2NhbGUgbGlrZSBcImZyLUZSXCIgdG8gXCJmclwiXG4gICAgICAgICAgICBsZXQgcGFydHMgPSBvcHRpb25zLmxvY2FsZS5zcGxpdCgnLScpXG4gICAgICAgICAgICAgICAgLm1hcCgocCkgPT4gcC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgIGlmIChwYXJ0c1swXSA9PT0gcGFydHNbMV0pIHtcbiAgICAgICAgICAgICAgICBwYXJ0cyA9IFtwYXJ0c1swXV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcHRpb25zLmxvY2FsZSA9IHBhcnRzLmpvaW4oJy0nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5sb2NhbGUgIT09ICdlbicgJiYgU3BlY3RydW0ubG9jYWxpemF0aW9uW29wdGlvbnMubG9jYWxlXSkge1xuICAgICAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIFNwZWN0cnVtLmxvY2FsaXphdGlvbltvcHRpb25zLmxvY2FsZV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywgb3B0aW9ucy5sb2NhbGUpO1xuICAgIH1cbiAgICBjb25zdCBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdHMsIGVsZW1lbnQuZGF0YXNldCwgb3B0aW9ucyk7XG4gICAgb3B0cy5jYWxsYmFja3MgPSB7XG4gICAgICAgICdtb3ZlJzogYmluZChvcHRzLm1vdmUsIGVsZW1lbnQpLFxuICAgICAgICAnY2hhbmdlJzogYmluZChvcHRzLmNoYW5nZSwgZWxlbWVudCksXG4gICAgICAgICdzaG93JzogYmluZChvcHRzLnNob3csIGVsZW1lbnQpLFxuICAgICAgICAnaGlkZSc6IGJpbmQob3B0cy5oaWRlLCBlbGVtZW50KSxcbiAgICAgICAgJ2JlZm9yZVNob3cnOiBiaW5kKG9wdHMuYmVmb3JlU2hvdywgZWxlbWVudCksXG4gICAgfTtcbiAgICByZXR1cm4gb3B0cztcbn1cbmZ1bmN0aW9uIHNwZWN0cnVtKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICBsZXQgb3B0cyA9IGluc3RhbmNlT3B0aW9ucyhvcHRpb25zLCBlbGVtZW50KSwgdHlwZSA9IG9wdHMudHlwZSwgZmxhdCA9ICh0eXBlID09PSAnZmxhdCcpLCBzaG93U2VsZWN0aW9uUGFsZXR0ZSA9IG9wdHMuc2hvd1NlbGVjdGlvblBhbGV0dGUsIGxvY2FsU3RvcmFnZUtleSA9IG9wdHMubG9jYWxTdG9yYWdlS2V5LCB0aGVtZSA9IG9wdHMudGhlbWUsIGNhbGxiYWNrcyA9IG9wdHMuY2FsbGJhY2tzLCByZXNpemUgPSB0aHJvdHRsZShyZWZsb3csIDEwKSwgdmlzaWJsZSA9IGZhbHNlLCBpc0RyYWdnaW5nID0gZmFsc2UsIGRyYWdXaWR0aCA9IDAsIGRyYWdIZWlnaHQgPSAwLCBkcmFnSGVscGVySGVpZ2h0ID0gMCwgc2xpZGVIZWlnaHQgPSAwLCBhbHBoYVdpZHRoID0gMCwgYWxwaGFTbGlkZUhlbHBlcldpZHRoID0gMCwgc2xpZGVIZWxwZXJIZWlnaHQgPSAwLCBjdXJyZW50SHVlID0gMCwgY3VycmVudFNhdHVyYXRpb24gPSAwLCBjdXJyZW50VmFsdWUgPSAwLCBjdXJyZW50QWxwaGEgPSAxLCBwYWxldHRlID0gW10sIHBhbGV0dGVBcnJheSA9IFtdLCBwYWxldHRlTG9va3VwID0ge30sIHNlbGVjdGlvblBhbGV0dGUgPSBvcHRzLnNlbGVjdGlvblBhbGV0dGUuc2xpY2UoMCksIG1heFNlbGVjdGlvblNpemUgPSBvcHRzLm1heFNlbGVjdGlvblNpemUsIGRyYWdnaW5nQ2xhc3MgPSAnc3AtZHJhZ2dpbmcnLCBhYm9ydE5leHRJbnB1dENoYW5nZSA9IGZhbHNlLCBzaGlmdE1vdmVtZW50RGlyZWN0aW9uID0gbnVsbDtcbiAgICBjb25zdCBkb2MgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQ7XG4gICAgY29uc3QgY29udGFpbmVyID0gaHRtbChtYXJrdXAsIGRvYyk7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQodGhlbWUpO1xuICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgZG9jLmJvZHk7IGxldCBib3VuZEVsZW1lbnQgPSBlbGVtZW50LCBkaXNhYmxlZCA9IGZhbHNlLCBwaWNrZXJDb250YWluZXIgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNwLXBpY2tlci1jb250YWluZXInKSwgZHJhZ2dlciA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuc3AtY29sb3InKSwgZHJhZ0hlbHBlciA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuc3AtZHJhZ2dlcicpLCBzbGlkZXIgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNwLWh1ZScpLCBzbGlkZUhlbHBlciA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuc3Atc2xpZGVyJyksIGFscGhhU2xpZGVySW5uZXIgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNwLWFscGhhLWlubmVyJyksIGFscGhhU2xpZGVyID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zcC1hbHBoYScpLCBhbHBoYVNsaWRlSGVscGVyID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zcC1hbHBoYS1oYW5kbGUnKSwgdGV4dElucHV0ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zcC1pbnB1dCcpLCBwYWxldHRlQ29udGFpbmVyID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zcC1wYWxldHRlJyksIGluaXRpYWxDb2xvckNvbnRhaW5lciA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuc3AtaW5pdGlhbCcpLCBjYW5jZWxCdXR0b24gPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLnNwLWNhbmNlbCcpLCBjbGVhckJ1dHRvbiA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuc3AtY2xlYXInKSwgY2hvb3NlQnV0dG9uID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zcC1jaG9vc2UnKSwgdG9nZ2xlQnV0dG9uID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zcC1wYWxldHRlLXRvZ2dsZScpLCBpc0lucHV0ID0gYm91bmRFbGVtZW50Lm5vZGVOYW1lID09PSAnSU5QVVQnLCBpc0lucHV0VHlwZUNvbG9yID0gaXNJbnB1dCAmJiBib3VuZEVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0eXBlJykgPT09ICdjb2xvcicsIHNob3VsZFJlcGxhY2UgPSBpc0lucHV0ICYmICh0eXBlID09PSAnY29sb3InIHx8IGlzSW5wdXRUeXBlQ29sb3IpLCByZXBsYWNlciA9IChzaG91bGRSZXBsYWNlKVxuICAgICAgICA/ICgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbCA9IHJlcGxhY2VJbnB1dC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBhZGRDbGFzcyhlbCwgdGhlbWUpO1xuICAgICAgICAgICAgYWRkQ2xhc3MoZWwsIG9wdHMucmVwbGFjZXJDbGFzc05hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICB9KSgpXG4gICAgICAgIDogbnVsbCwgb2Zmc2V0RWxlbWVudCA9IChzaG91bGRSZXBsYWNlKSA/IHJlcGxhY2VyIDogYm91bmRFbGVtZW50LCBwcmV2aWV3RWxlbWVudCA9IHJlcGxhY2VyID09PSBudWxsIHx8IHJlcGxhY2VyID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXBsYWNlci5xdWVyeVNlbGVjdG9yKCcuc3AtcHJldmlldy1pbm5lcicpLCBpbml0aWFsQ29sb3IgPSBvcHRzLmNvbG9yIHx8IChpc0lucHV0ICYmIGJvdW5kRWxlbWVudC52YWx1ZSksIGNvbG9yT25TaG93ID0gJycsIGN1cnJlbnRQcmVmZXJyZWRGb3JtYXQgPSBvcHRzLnByZWZlcnJlZEZvcm1hdCwgY2xpY2tvdXRGaXJlc0NoYW5nZSA9ICFvcHRzLnNob3dCdXR0b25zIHx8IG9wdHMuY2xpY2tvdXRGaXJlc0NoYW5nZSwgaXNFbXB0eSA9ICFpbml0aWFsQ29sb3IsIGFsbG93RW1wdHkgPSBvcHRzLmFsbG93RW1wdHk7XG4gICAgLy8gRWxlbWVudCB0byBiZSB1cGRhdGVkIHdpdGggdGhlIGlucHV0IGNvbG9yLiBQb3B1bGF0ZWQgaW4gaW5pdGlhbGl6ZSBtZXRob2RcbiAgICBsZXQgb3JpZ2luYWxJbnB1dENvbnRhaW5lcjtcbiAgICBsZXQgY29sb3JpemVFbGVtZW50O1xuICAgIGxldCBjb2xvcml6ZUVsZW1lbnRJbml0aWFsQ29sb3I7XG4gICAgbGV0IGNvbG9yaXplRWxlbWVudEluaXRpYWxCYWNrZ3JvdW5kO1xuICAgIC8vSWYgdGhlcmUgaXMgYSBsYWJlbCBmb3IgdGhpcyBlbGVtZW50LCB3aGVuIGNsaWNrZWQgb24sIHNob3cgdGhlIGNvbG91ciBwaWNrZXJcbiAgICBjb25zdCB0aGlzSWQgPSBib3VuZEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdpZCcpIHx8ICcnO1xuICAgIGlmICh0aGlzSWQgIT09IHVuZGVmaW5lZCAmJiB0aGlzSWQubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBsYWJlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBsYWJlbFtmb3I9XCIke3RoaXNJZH1cIl1gKTtcbiAgICAgICAgbGFiZWxzLmZvckVhY2goKGxhYmVsKSA9PiB7XG4gICAgICAgICAgICBsYWJlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHNob3coKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFwcGx5T3B0aW9ucygpIHtcbiAgICAgICAgaWYgKG9wdHMuc2hvd1BhbGV0dGVPbmx5KSB7XG4gICAgICAgICAgICBvcHRzLnNob3dQYWxldHRlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG9nZ2xlQnV0dG9uKSB7XG4gICAgICAgICAgICB0b2dnbGVCdXR0b24udGV4dENvbnRlbnQgPSBvcHRzLnNob3dQYWxldHRlT25seSA/IG9wdHMudG9nZ2xlUGFsZXR0ZU1vcmVUZXh0IDogb3B0cy50b2dnbGVQYWxldHRlTGVzc1RleHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMucGFsZXR0ZSkge1xuICAgICAgICAgICAgcGFsZXR0ZSA9IG9wdHMucGFsZXR0ZS5zbGljZSgwKTtcbiAgICAgICAgICAgIHBhbGV0dGVBcnJheSA9IEFycmF5LmlzQXJyYXkocGFsZXR0ZVswXSkgPyBwYWxldHRlIDogW3BhbGV0dGVdO1xuICAgICAgICAgICAgcGFsZXR0ZUxvb2t1cCA9IHt9O1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWxldHRlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBhbGV0dGVBcnJheVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZ2IgPSB0aW55Y29sb3IocGFsZXR0ZUFycmF5W2ldW2pdKS50b1JnYlN0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBwYWxldHRlTG9va3VwW3JnYl0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIHNob3dQYWxldHRlT25seSBhbmQgZGlkbid0IHNldCBpbml0aWFsY29sb3JcbiAgICAgICAgICAgIC8vIHNldCBpbml0aWFsY29sb3IgdG8gZmlyc3QgcGFsZXR0ZVxuICAgICAgICAgICAgaWYgKG9wdHMuc2hvd1BhbGV0dGVPbmx5ICYmICFpbml0aWFsQ29sb3IpIHtcbiAgICAgICAgICAgICAgICBpbml0aWFsQ29sb3IgPSAocGFsZXR0ZVswXVswXSA9PT0gJycpID8gcGFsZXR0ZVswXVswXSA6IE9iamVjdC5rZXlzKHBhbGV0dGVMb29rdXApWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRvZ2dsZUNsYXNzKGNvbnRhaW5lciwgJ3NwLWZsYXQnLCBmbGF0KTtcbiAgICAgICAgdG9nZ2xlQ2xhc3MoY29udGFpbmVyLCAnc3AtaW5wdXQtZGlzYWJsZWQnLCAhb3B0cy5zaG93SW5wdXQpO1xuICAgICAgICB0b2dnbGVDbGFzcyhjb250YWluZXIsICdzcC1hbHBoYS1lbmFibGVkJywgb3B0cy5zaG93QWxwaGEpO1xuICAgICAgICB0b2dnbGVDbGFzcyhjb250YWluZXIsICdzcC1jbGVhci1lbmFibGVkJywgYWxsb3dFbXB0eSk7XG4gICAgICAgIHRvZ2dsZUNsYXNzKGNvbnRhaW5lciwgJ3NwLWJ1dHRvbnMtZGlzYWJsZWQnLCAhb3B0cy5zaG93QnV0dG9ucyk7XG4gICAgICAgIHRvZ2dsZUNsYXNzKGNvbnRhaW5lciwgJ3NwLXBhbGV0dGUtYnV0dG9ucy1kaXNhYmxlZCcsICFvcHRzLnRvZ2dsZVBhbGV0dGVPbmx5KTtcbiAgICAgICAgdG9nZ2xlQ2xhc3MoY29udGFpbmVyLCAnc3AtcGFsZXR0ZS1kaXNhYmxlZCcsICFvcHRzLnNob3dQYWxldHRlKTtcbiAgICAgICAgdG9nZ2xlQ2xhc3MoY29udGFpbmVyLCAnc3AtcGFsZXR0ZS1vbmx5Jywgb3B0cy5zaG93UGFsZXR0ZU9ubHkpO1xuICAgICAgICB0b2dnbGVDbGFzcyhjb250YWluZXIsICdzcC1pbml0aWFsLWRpc2FibGVkJywgIW9wdHMuc2hvd0luaXRpYWwpO1xuICAgICAgICBhZGRDbGFzcyhjb250YWluZXIsIG9wdHMuY29udGFpbmVyQ2xhc3NOYW1lKTtcbiAgICAgICAgcmVmbG93KCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9mZnNldEVsZW1lbnRTdGFydChlKSB7XG4gICAgICAgIGlmICghZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHNob3coKTtcbiAgICAgICAgfVxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgaWYgKCF0YXJnZXQubWF0Y2hlcygnaW5wdXQnKSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgYXBwbHlPcHRpb25zKCk7XG4gICAgICAgIGNvbnN0IGlucHV0U3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShib3VuZEVsZW1lbnQpO1xuICAgICAgICBvcmlnaW5hbElucHV0Q29udGFpbmVyID0gaHRtbCgnPHNwYW4gY2xhc3M9XCJzcC1vcmlnaW5hbC1pbnB1dC1jb250YWluZXJcIj48L3NwYW4+Jyk7XG4gICAgICAgIFsnbWFyZ2luJ10uZm9yRWFjaCgoY3NzUHJvcCkgPT4ge1xuICAgICAgICAgICAgb3JpZ2luYWxJbnB1dENvbnRhaW5lci5zdHlsZTtcbiAgICAgICAgICAgIG9yaWdpbmFsSW5wdXRDb250YWluZXIuc3R5bGUuc2V0UHJvcGVydHkoY3NzUHJvcCwgaW5wdXRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKGNzc1Byb3ApKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGlubGluZS1mbGV4IGJ5IGRlZmF1bHQsIHN3aXRjaGluZyB0byBmbGV4IGlmIG5lZWRlZFxuICAgICAgICBpZiAoaW5wdXRTdHlsZS5kaXNwbGF5ID09PSAnYmxvY2snKSB7XG4gICAgICAgICAgICBvcmlnaW5hbElucHV0Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIH1cbiAgICAgICAgYm91bmRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgaWYgKHNob3VsZFJlcGxhY2UpIHtcbiAgICAgICAgICAgIGluc2VydEFmdGVyKGJvdW5kRWxlbWVudCwgcmVwbGFjZXIpO1xuICAgICAgICAgICAgYm91bmRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgICBhZGRDbGFzcyhvcmlnaW5hbElucHV0Q29udGFpbmVyLCAnc3AtY29sb3JpemUtY29udGFpbmVyJyk7XG4gICAgICAgICAgICBhZGRDbGFzcyhib3VuZEVsZW1lbnQsICdzcGVjdHJ1bSBzcC1jb2xvcml6ZScpO1xuICAgICAgICAgICAgd3JhcChib3VuZEVsZW1lbnQsIG9yaWdpbmFsSW5wdXRDb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdjb21wb25lbnQnKSB7XG4gICAgICAgICAgICBhZGRDbGFzcyhib3VuZEVsZW1lbnQsICdzcGVjdHJ1bScpO1xuICAgICAgICAgICAgd3JhcChib3VuZEVsZW1lbnQsIG9yaWdpbmFsSW5wdXRDb250YWluZXIpO1xuICAgICAgICAgICAgY29uc3QgYWRkT24gPSBodG1sKFsnPGRpdiBjbGFzcz1cXCdzcC1jb2xvcml6ZS1jb250YWluZXIgc3AtYWRkLW9uXFwnPicsXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XFwnc3AtY29sb3JpemVcXCc+PC9kaXY+ICcsXG4gICAgICAgICAgICAgICAgJzwvZGl2PiddLmpvaW4oJycpKTtcbiAgICAgICAgICAgIGFkZE9uLnN0eWxlLndpZHRoID0gYm91bmRFbGVtZW50Lm9mZnNldEhlaWdodCArICdweCc7XG4gICAgICAgICAgICBhZGRPbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSBpbnB1dFN0eWxlLmJvcmRlclJhZGl1cztcbiAgICAgICAgICAgIGFkZE9uLnN0eWxlLmJvcmRlciA9IGlucHV0U3R5bGUuYm9yZGVyO1xuICAgICAgICAgICAgYm91bmRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3dpdGgtYWRkLW9uJyk7XG4gICAgICAgICAgICBib3VuZEVsZW1lbnQuYmVmb3JlKGFkZE9uKTtcbiAgICAgICAgfVxuICAgICAgICBjb2xvcml6ZUVsZW1lbnQgPSAoX2EgPSBib3VuZEVsZW1lbnQucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnF1ZXJ5U2VsZWN0b3IoJy5zcC1jb2xvcml6ZScpO1xuICAgICAgICBjb2xvcml6ZUVsZW1lbnRJbml0aWFsQ29sb3IgPSAoY29sb3JpemVFbGVtZW50ID09PSBudWxsIHx8IGNvbG9yaXplRWxlbWVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29sb3JpemVFbGVtZW50LnN0eWxlLmNvbG9yKSB8fCAnJztcbiAgICAgICAgY29sb3JpemVFbGVtZW50SW5pdGlhbEJhY2tncm91bmQgPSAoY29sb3JpemVFbGVtZW50ID09PSBudWxsIHx8IGNvbG9yaXplRWxlbWVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29sb3JpemVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvcikgfHwgJyc7XG4gICAgICAgIGlmICghYWxsb3dFbXB0eSkge1xuICAgICAgICAgICAgY2xlYXJCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmxhdCkge1xuICAgICAgICAgICAgYm91bmRFbGVtZW50LmFmdGVyKGNvbnRhaW5lcik7XG4gICAgICAgICAgICBib3VuZEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBhcHBlbmRUbyA9IG9wdHMuYXBwZW5kVG8gPT09ICdwYXJlbnQnID8gYm91bmRFbGVtZW50LnBhcmVudEVsZW1lbnQgOiBvcHRzLmFwcGVuZFRvO1xuICAgICAgICAgICAgaWYgKCFhcHBlbmRUbykge1xuICAgICAgICAgICAgICAgIGFwcGVuZFRvID0gZG9jdW1lbnQuYm9keTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXBwZW5kVG8gIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgYXBwZW5kVG8uYXBwZW5kKGNvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlU2VsZWN0aW9uUGFsZXR0ZUZyb21TdG9yYWdlKCk7XG4gICAgICAgIG9mZnNldEVsZW1lbnQgPT09IG51bGwgfHwgb2Zmc2V0RWxlbWVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogb2Zmc2V0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9mZnNldEVsZW1lbnRTdGFydCk7XG4gICAgICAgIG9mZnNldEVsZW1lbnQgPT09IG51bGwgfHwgb2Zmc2V0RWxlbWVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogb2Zmc2V0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb2Zmc2V0RWxlbWVudFN0YXJ0KTtcbiAgICAgICAgaWYgKGJvdW5kRWxlbWVudC5tYXRjaGVzKCc6ZGlzYWJsZWQnKSB8fCBvcHRzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBkaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUHJldmVudCBjbGlja3MgZnJvbSBidWJibGluZyB1cCB0byBkb2N1bWVudC4gIFRoaXMgd291bGQgY2F1c2UgaXQgdG8gYmUgaGlkZGVuLlxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKSk7XG4gICAgICAgIC8vIEhhbmRsZSB1c2VyIHR5cGVkIGlucHV0XG4gICAgICAgIFt0ZXh0SW5wdXQsIGJvdW5kRWxlbWVudF0uZm9yRWFjaChmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgICAgIGlmICghKCd2YWx1ZScgaW4gaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldEZyb21UZXh0SW5wdXQoaW5wdXQudmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdwYXN0ZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RnJvbVRleHRJbnB1dChpbnB1dC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEZyb21UZXh0SW5wdXQoaW5wdXQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQgPT09IGJvdW5kRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjYW5jZWxCdXR0b24udGV4dENvbnRlbnQgPSBvcHRzLmNhbmNlbFRleHQ7XG4gICAgICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV2ZXJ0KCk7XG4gICAgICAgICAgICBoaWRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjbGVhckJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgb3B0cy5jbGVhclRleHQpO1xuICAgICAgICBjbGVhckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaXNFbXB0eSA9IHRydWU7XG4gICAgICAgICAgICBtb3ZlKCk7XG4gICAgICAgICAgICBpZiAoZmxhdCkge1xuICAgICAgICAgICAgICAgIC8vZm9yIHRoZSBmbGF0IHN0eWxlLCB0aGlzIGlzIGEgY2hhbmdlIGV2ZW50XG4gICAgICAgICAgICAgICAgdXBkYXRlT3JpZ2luYWxJbnB1dCh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNob29zZUJ1dHRvbi50ZXh0Q29udGVudCA9IG9wdHMuY2hvb3NlVGV4dDtcbiAgICAgICAgY2hvb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgLy8gaWYgKElFICYmIHRleHRJbnB1dC5tYXRjaGVzKCc6Zm9jdXMnKSkge1xuICAgICAgICAgICAgLy8gICB0ZXh0SW5wdXQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2NoYW5nZScpKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIGlmIChpc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVPcmlnaW5hbElucHV0KHRydWUpO1xuICAgICAgICAgICAgICAgIGhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRvZ2dsZUJ1dHRvbi50ZXh0Q29udGVudCA9IG9wdHMuc2hvd1BhbGV0dGVPbmx5ID8gb3B0cy50b2dnbGVQYWxldHRlTW9yZVRleHQgOiBvcHRzLnRvZ2dsZVBhbGV0dGVMZXNzVGV4dDtcbiAgICAgICAgdG9nZ2xlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgb3B0cy5zaG93UGFsZXR0ZU9ubHkgPSAhb3B0cy5zaG93UGFsZXR0ZU9ubHk7XG4gICAgICAgICAgICAvLyBUbyBtYWtlIHN1cmUgdGhlIFBpY2tlciBhcmVhIGlzIGRyYXduIG9uIHRoZSByaWdodCwgbmV4dCB0byB0aGVcbiAgICAgICAgICAgIC8vIFBhbGV0dGUgYXJlYSAoYW5kIG5vdCBiZWxvdyB0aGUgcGFsZXR0ZSksIGZpcnN0IG1vdmUgdGhlIFBhbGV0dGVcbiAgICAgICAgICAgIC8vIHRvIHRoZSBsZWZ0IHRvIG1ha2Ugc3BhY2UgZm9yIHRoZSBwaWNrZXIsIHBsdXMgNXB4IGV4dHJhLlxuICAgICAgICAgICAgLy8gVGhlICdhcHBseU9wdGlvbnMnIGZ1bmN0aW9uIHB1dHMgdGhlIHdob2xlIGNvbnRhaW5lciBiYWNrIGludG8gcGxhY2VcbiAgICAgICAgICAgIC8vIGFuZCB0YWtlcyBjYXJlIG9mIHRoZSBidXR0b24tdGV4dCBhbmQgdGhlIHNwLXBhbGV0dGUtb25seSBDU1MgY2xhc3MuXG4gICAgICAgICAgICBpZiAoIW9wdHMuc2hvd1BhbGV0dGVPbmx5ICYmICFmbGF0KSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLmxlZnQgPSAnLT0nICsgKG91dGVyV2lkdGhXaXRoTWFyZ2luKHBpY2tlckNvbnRhaW5lcikgKyA1KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFwcGx5T3B0aW9ucygpO1xuICAgICAgICB9KTtcbiAgICAgICAgZHJhZ2dhYmxlKGFscGhhU2xpZGVyLCBmdW5jdGlvbiAoZHJhZ1gsIGRyYWdZLCBlKSB7XG4gICAgICAgICAgICBjdXJyZW50QWxwaGEgPSAoZHJhZ1ggLyBhbHBoYVdpZHRoKTtcbiAgICAgICAgICAgIGlzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgY3VycmVudEFscGhhID0gTWF0aC5yb3VuZChjdXJyZW50QWxwaGEgKiAxMCkgLyAxMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1vdmUoKTtcbiAgICAgICAgfSwgZHJhZ1N0YXJ0LCBkcmFnU3RvcCk7XG4gICAgICAgIGRyYWdnYWJsZShzbGlkZXIsIGZ1bmN0aW9uIChkcmFnWCwgZHJhZ1kpIHtcbiAgICAgICAgICAgIGN1cnJlbnRIdWUgPSBkcmFnWSAvIHNsaWRlSGVpZ2h0O1xuICAgICAgICAgICAgaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFvcHRzLnNob3dBbHBoYSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRBbHBoYSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtb3ZlKCk7XG4gICAgICAgIH0sIGRyYWdTdGFydCwgZHJhZ1N0b3ApO1xuICAgICAgICBkcmFnZ2FibGUoZHJhZ2dlciwgZnVuY3Rpb24gKGRyYWdYLCBkcmFnWSwgZSkge1xuICAgICAgICAgICAgLy8gc2hpZnQrZHJhZyBzaG91bGQgc25hcCB0aGUgbW92ZW1lbnQgdG8gZWl0aGVyIHRoZSB4IG9yIHkgYXhpcy5cbiAgICAgICAgICAgIGlmICghZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIHNoaWZ0TW92ZW1lbnREaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXNoaWZ0TW92ZW1lbnREaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvbGREcmFnWCA9IGN1cnJlbnRTYXR1cmF0aW9uICogZHJhZ1dpZHRoO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9sZERyYWdZID0gZHJhZ0hlaWdodCAtIChjdXJyZW50VmFsdWUgKiBkcmFnSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBjb25zdCBmdXJ0aGVyRnJvbVggPSBNYXRoLmFicyhkcmFnWCAtIG9sZERyYWdYKSA+IE1hdGguYWJzKGRyYWdZIC0gb2xkRHJhZ1kpO1xuICAgICAgICAgICAgICAgIHNoaWZ0TW92ZW1lbnREaXJlY3Rpb24gPSBmdXJ0aGVyRnJvbVggPyAneCcgOiAneSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzZXRTYXR1cmF0aW9uID0gIXNoaWZ0TW92ZW1lbnREaXJlY3Rpb24gfHwgc2hpZnRNb3ZlbWVudERpcmVjdGlvbiA9PT0gJ3gnO1xuICAgICAgICAgICAgY29uc3Qgc2V0VmFsdWUgPSAhc2hpZnRNb3ZlbWVudERpcmVjdGlvbiB8fCBzaGlmdE1vdmVtZW50RGlyZWN0aW9uID09PSAneSc7XG4gICAgICAgICAgICBpZiAoc2V0U2F0dXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTYXR1cmF0aW9uID0gKGRyYWdYIC8gZHJhZ1dpZHRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZXRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9ICgoZHJhZ0hlaWdodCAtIGRyYWdZKSAvIGRyYWdIZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFvcHRzLnNob3dBbHBoYSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRBbHBoYSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtb3ZlKCk7XG4gICAgICAgIH0sIGRyYWdTdGFydCwgZHJhZ1N0b3ApO1xuICAgICAgICBpZiAoISFpbml0aWFsQ29sb3IpIHtcbiAgICAgICAgICAgIHNldChpbml0aWFsQ29sb3IpO1xuICAgICAgICAgICAgLy8gSW4gY2FzZSBjb2xvciB3YXMgYmxhY2sgLSB1cGRhdGUgdGhlIHByZXZpZXcgVUkgYW5kIHNldCB0aGUgZm9ybWF0XG4gICAgICAgICAgICAvLyBzaW5jZSB0aGUgc2V0IGZ1bmN0aW9uIHdpbGwgbm90IHJ1biAoZGVmYXVsdCBjb2xvciBpcyBibGFjaykuXG4gICAgICAgICAgICB1cGRhdGVVSSgpO1xuICAgICAgICAgICAgY3VycmVudFByZWZlcnJlZEZvcm1hdCA9IHRpbnljb2xvcihpbml0aWFsQ29sb3IpLmdldEZvcm1hdCgpIHx8IG9wdHMucHJlZmVycmVkRm9ybWF0O1xuICAgICAgICAgICAgYWRkQ29sb3JUb1NlbGVjdGlvblBhbGV0dGUoaW5pdGlhbENvbG9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbml0aWFsQ29sb3IgPT09ICcnKSB7XG4gICAgICAgICAgICBzZXQoaW5pdGlhbENvbG9yKTtcbiAgICAgICAgICAgIHVwZGF0ZVVJKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB1cGRhdGVVSSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmbGF0KSB7XG4gICAgICAgICAgICBzaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcGFsZXR0ZUVsZW1lbnRDbGljayhlKSB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgaWYgKGUuZGF0YSAmJiBlLmRhdGEuaWdub3JlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWwgPSBlLnRhcmdldC5jbG9zZXN0KCcuc3AtdGh1bWItZWwnKTtcbiAgICAgICAgICAgICAgICBzZXQoKChfYSA9IGVsID09PSBudWxsIHx8IGVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlbC5kYXRhc2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29sb3IpIHx8ICcnKTtcbiAgICAgICAgICAgICAgICBtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbCA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5zcC10aHVtYi1lbCcpO1xuICAgICAgICAgICAgICAgIHNldCgoKF9iID0gZWwgPT09IG51bGwgfHwgZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVsLmRhdGFzZXQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jb2xvcikgfHwgJycpO1xuICAgICAgICAgICAgICAgIG1vdmUoKTtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcGlja2VyIGlzIGdvaW5nIHRvIGNsb3NlIGltbWVkaWF0ZWx5LCBhIHBhbGV0dGUgc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgLy8gaXMgYSBjaGFuZ2UuICBPdGhlcndpc2UsIGl0J3MgYSBtb3ZlIG9ubHkuXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuaGlkZUFmdGVyUGFsZXR0ZVNlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVPcmlnaW5hbElucHV0KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBoaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVPcmlnaW5hbElucHV0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhbGV0dGVFdmVudHMgPSBbJ2NsaWNrJywgJ3RvdWNoc3RhcnQnXTtcbiAgICAgICAgZm9yIChjb25zdCBwYWxldHRlRXZlbnQgb2YgcGFsZXR0ZUV2ZW50cykge1xuICAgICAgICAgICAgZXZlbnREZWxlZ2F0ZShwYWxldHRlQ29udGFpbmVyLCBwYWxldHRlRXZlbnQsICcuc3AtdGh1bWItZWwnLCBwYWxldHRlRWxlbWVudENsaWNrKTtcbiAgICAgICAgICAgIGV2ZW50RGVsZWdhdGUoaW5pdGlhbENvbG9yQ29udGFpbmVyLCBwYWxldHRlRXZlbnQsICcuc3AtdGh1bWItZWw6bnRoLWNoaWxkKDEpJywgcGFsZXR0ZUVsZW1lbnRDbGljaywgeyBpZ25vcmU6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlU2VsZWN0aW9uUGFsZXR0ZUZyb21TdG9yYWdlKCkge1xuICAgICAgICBpZiAobG9jYWxTdG9yYWdlS2V5KSB7XG4gICAgICAgICAgICAvLyBNaWdyYXRlIG9sZCBwYWxldHRlcyBvdmVyIHRvIG5ldyBmb3JtYXQuICBNYXkgd2FudCB0byByZW1vdmUgdGhpcyBldmVudHVhbGx5LlxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb2NhbFN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9sZFBhbGV0dGUgPSBsb2NhbFN0b3JhZ2VbbG9jYWxTdG9yYWdlS2V5XS5zcGxpdCgnLCMnKTtcbiAgICAgICAgICAgICAgICBpZiAob2xkUGFsZXR0ZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBsb2NhbFN0b3JhZ2VbbG9jYWxTdG9yYWdlS2V5XTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBjIG9mIG9sZFBhbGV0dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZENvbG9yVG9TZWxlY3Rpb25QYWxldHRlKGMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uUGFsZXR0ZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2VbbG9jYWxTdG9yYWdlS2V5XS5zcGxpdCgnOycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRDb2xvclRvU2VsZWN0aW9uUGFsZXR0ZShjb2xvcikge1xuICAgICAgICBpZiAoc2hvd1NlbGVjdGlvblBhbGV0dGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHJnYiA9IHRpbnljb2xvcihjb2xvcikudG9SZ2JTdHJpbmcoKTtcbiAgICAgICAgICAgIGlmICghcGFsZXR0ZUxvb2t1cFtyZ2JdICYmICFzZWxlY3Rpb25QYWxldHRlLmluY2x1ZGVzKHJnYikpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25QYWxldHRlLnB1c2gocmdiKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoc2VsZWN0aW9uUGFsZXR0ZS5sZW5ndGggPiBtYXhTZWxlY3Rpb25TaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblBhbGV0dGUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlS2V5KSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZVtsb2NhbFN0b3JhZ2VLZXldID0gc2VsZWN0aW9uUGFsZXR0ZS5qb2luKCc7Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFVuaXF1ZVNlbGVjdGlvblBhbGV0dGUoKSB7XG4gICAgICAgIHZhciB1bmlxdWUgPSBbXTtcbiAgICAgICAgaWYgKG9wdHMuc2hvd1BhbGV0dGUpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZWN0aW9uUGFsZXR0ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciByZ2IgPSB0aW55Y29sb3Ioc2VsZWN0aW9uUGFsZXR0ZVtpXSkudG9SZ2JTdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXBhbGV0dGVMb29rdXBbcmdiXSkge1xuICAgICAgICAgICAgICAgICAgICB1bmlxdWUucHVzaChzZWxlY3Rpb25QYWxldHRlW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuaXF1ZS5yZXZlcnNlKCkuc2xpY2UoMCwgb3B0cy5tYXhTZWxlY3Rpb25TaXplKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZHJhd1BhbGV0dGUoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb2xvciA9IGdldCgpO1xuICAgICAgICBjb25zdCBodG1sID0gcGFsZXR0ZUFycmF5Lm1hcCgocGFsZXR0ZSwgaSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHBhbGV0dGVUZW1wbGF0ZShwYWxldHRlLCBjdXJyZW50Q29sb3IsICdzcC1wYWxldHRlLXJvdyBzcC1wYWxldHRlLXJvdy0nICsgaSwgb3B0cyk7XG4gICAgICAgIH0pO1xuICAgICAgICB1cGRhdGVTZWxlY3Rpb25QYWxldHRlRnJvbVN0b3JhZ2UoKTtcbiAgICAgICAgaWYgKHNlbGVjdGlvblBhbGV0dGUpIHtcbiAgICAgICAgICAgIGh0bWwucHVzaChwYWxldHRlVGVtcGxhdGUoZ2V0VW5pcXVlU2VsZWN0aW9uUGFsZXR0ZSgpLCBjdXJyZW50Q29sb3IsICdzcC1wYWxldHRlLXJvdyBzcC1wYWxldHRlLXJvdy1zZWxlY3Rpb24nLCBvcHRzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcGFsZXR0ZUNvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sLmpvaW4oJycpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkcmF3SW5pdGlhbCgpIHtcbiAgICAgICAgaWYgKG9wdHMuc2hvd0luaXRpYWwpIHtcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWwgPSBjb2xvck9uU2hvdztcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXQoKTtcbiAgICAgICAgICAgIGluaXRpYWxDb2xvckNvbnRhaW5lci5pbm5lckhUTUwgPSBwYWxldHRlVGVtcGxhdGUoW2luaXRpYWwsIGN1cnJlbnRdLCBjdXJyZW50LCAnc3AtcGFsZXR0ZS1yb3ctaW5pdGlhbCcsIG9wdHMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRyYWdTdGFydCgpIHtcbiAgICAgICAgaWYgKGRyYWdIZWlnaHQgPD0gMCB8fCBkcmFnV2lkdGggPD0gMCB8fCBzbGlkZUhlaWdodCA8PSAwKSB7XG4gICAgICAgICAgICByZWZsb3coKTtcbiAgICAgICAgfVxuICAgICAgICBpc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgYWRkQ2xhc3MoY29udGFpbmVyLCBkcmFnZ2luZ0NsYXNzKTtcbiAgICAgICAgc2hpZnRNb3ZlbWVudERpcmVjdGlvbiA9IG51bGw7XG4gICAgICAgIGVtaXQoYm91bmRFbGVtZW50LCAnZHJhZ3N0YXJ0JywgeyBjb2xvcjogZ2V0KCkgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRyYWdTdG9wKCkge1xuICAgICAgICBpc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHJlbW92ZUNsYXNzKGNvbnRhaW5lciwgZHJhZ2dpbmdDbGFzcyk7XG4gICAgICAgIGVtaXQoYm91bmRFbGVtZW50LCAnZHJhZ3N0b3AnLCB7IGNvbG9yOiBnZXQoKSB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0RnJvbVRleHRJbnB1dCh2YWx1ZSkge1xuICAgICAgICBpZiAoYWJvcnROZXh0SW5wdXRDaGFuZ2UpIHtcbiAgICAgICAgICAgIGFib3J0TmV4dElucHV0Q2hhbmdlID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycpICYmIGFsbG93RW1wdHkpIHtcbiAgICAgICAgICAgIHNldCgnJyk7XG4gICAgICAgICAgICBtb3ZlKCk7XG4gICAgICAgICAgICB1cGRhdGVPcmlnaW5hbElucHV0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB0aW55ID0gdGlueWNvbG9yKHZhbHVlKTtcbiAgICAgICAgICAgIGlmICh0aW55LmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgIHNldCh0aW55KTtcbiAgICAgICAgICAgICAgICBtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlT3JpZ2luYWxJbnB1dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGV4dElucHV0LmNsYXNzTGlzdC5hZGQoJ3NwLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB0b2dnbGUoKSB7XG4gICAgICAgIGlmICh2aXNpYmxlKSB7XG4gICAgICAgICAgICBoaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc2hvdygpIHtcbiAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgIHJlZmxvdygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gZW1pdChib3VuZEVsZW1lbnQsICdiZWZvcmVTaG93JywgeyBjb2xvcjogZ2V0KCkgfSk7XG4gICAgICAgIGlmIChjYWxsYmFja3MuYmVmb3JlU2hvdyhldmVudCkgPT09IGZhbHNlIHx8IGV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBoaWRlQWxsKCk7XG4gICAgICAgIHZpc2libGUgPSB0cnVlO1xuICAgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9ua2V5ZG93bik7XG4gICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrb3V0KTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSk7XG4gICAgICAgIHJlcGxhY2VyID09PSBudWxsIHx8IHJlcGxhY2VyID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXBsYWNlci5jbGFzc0xpc3QuYWRkKCdzcC1hY3RpdmUnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NwLWhpZGRlbicpO1xuICAgICAgICByZWZsb3coKTtcbiAgICAgICAgdXBkYXRlVUkoKTtcbiAgICAgICAgY29sb3JPblNob3cgPSBnZXQoKTtcbiAgICAgICAgZHJhd0luaXRpYWwoKTtcbiAgICAgICAgY29uc3QgZSA9IGVtaXQoYm91bmRFbGVtZW50LCAnc2hvdycsIHsgY29sb3I6IGNvbG9yT25TaG93IH0pO1xuICAgICAgICBjYWxsYmFja3Muc2hvdyhlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25rZXlkb3duKGUpIHtcbiAgICAgICAgLy8gQ2xvc2Ugb24gRVNDXG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgICAgICBoaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gY2xpY2tvdXQoZSkge1xuICAgICAgICAvLyBSZXR1cm4gb24gcmlnaHQgY2xpY2suXG4gICAgICAgIGlmIChlLmJ1dHRvbiA9PSAyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgYSBkcmFnIGV2ZW50IHdhcyBoYXBwZW5pbmcgZHVyaW5nIHRoZSBtb3VzZXVwLCBkb24ndCBoaWRlXG4gICAgICAgIC8vIG9uIGNsaWNrLlxuICAgICAgICBpZiAoaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjbGlja291dEZpcmVzQ2hhbmdlKSB7XG4gICAgICAgICAgICB1cGRhdGVPcmlnaW5hbElucHV0KHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV2ZXJ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaGlkZSgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBoaWRlKCkge1xuICAgICAgICAvLyBSZXR1cm4gaWYgaGlkaW5nIGlzIHVubmVjZXNzYXJ5XG4gICAgICAgIGlmICghdmlzaWJsZSB8fCBmbGF0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9ua2V5ZG93bik7XG4gICAgICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrb3V0KTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSk7XG4gICAgICAgIHJlcGxhY2VyID09PSBudWxsIHx8IHJlcGxhY2VyID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXBsYWNlci5jbGFzc0xpc3QucmVtb3ZlKCdzcC1hY3RpdmUnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NwLWhpZGRlbicpO1xuICAgICAgICBjb25zdCBldmVudCA9IGVtaXQoYm91bmRFbGVtZW50LCAnaGlkZScsIHsgY29sb3I6IGdldCgpIH0pO1xuICAgICAgICBjYWxsYmFja3MuaGlkZShldmVudCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJldmVydCgpIHtcbiAgICAgICAgc2V0KGNvbG9yT25TaG93LCB0cnVlKTtcbiAgICAgICAgdXBkYXRlT3JpZ2luYWxJbnB1dCh0cnVlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0KGNvbG9yLCBpZ25vcmVGb3JtYXRDaGFuZ2UgPSBmYWxzZSkge1xuICAgICAgICBpZiAodGlueWNvbG9yLmVxdWFscyhjb2xvciwgZ2V0KCkpKSB7XG4gICAgICAgICAgICAvLyBVcGRhdGUgVUkganVzdCBpbiBjYXNlIGEgdmFsaWRhdGlvbiBlcnJvciBuZWVkc1xuICAgICAgICAgICAgLy8gdG8gYmUgY2xlYXJlZC5cbiAgICAgICAgICAgIHVwZGF0ZVVJKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld0NvbG9yLCBuZXdIc3Y7XG4gICAgICAgIGlmICgoIWNvbG9yIHx8IGNvbG9yID09PSB1bmRlZmluZWQpICYmIGFsbG93RW1wdHkpIHtcbiAgICAgICAgICAgIGlzRW1wdHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgbmV3Q29sb3IgPSB0aW55Y29sb3IoY29sb3IpO1xuICAgICAgICAgICAgbmV3SHN2ID0gbmV3Q29sb3IudG9Ic3YoKTtcbiAgICAgICAgICAgIGN1cnJlbnRIdWUgPSAobmV3SHN2LmggJSAzNjApIC8gMzYwO1xuICAgICAgICAgICAgY3VycmVudFNhdHVyYXRpb24gPSBuZXdIc3YucztcbiAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9IG5ld0hzdi52O1xuICAgICAgICAgICAgY3VycmVudEFscGhhID0gbmV3SHN2LmE7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlVUkoKTtcbiAgICAgICAgaWYgKG5ld0NvbG9yICYmIG5ld0NvbG9yLmlzVmFsaWQoKSAmJiAhaWdub3JlRm9ybWF0Q2hhbmdlKSB7XG4gICAgICAgICAgICBjdXJyZW50UHJlZmVycmVkRm9ybWF0ID0gb3B0cy5wcmVmZXJyZWRGb3JtYXQgfHwgbmV3Q29sb3IuZ2V0Rm9ybWF0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0KG9wdHMgPSB7fSkge1xuICAgICAgICBpZiAoYWxsb3dFbXB0eSAmJiBpc0VtcHR5KSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRpbnljb2xvci5mcm9tUmF0aW8oe1xuICAgICAgICAgICAgaDogY3VycmVudEh1ZSxcbiAgICAgICAgICAgIHM6IGN1cnJlbnRTYXR1cmF0aW9uLFxuICAgICAgICAgICAgdjogY3VycmVudFZhbHVlLFxuICAgICAgICAgICAgYTogTWF0aC5yb3VuZChjdXJyZW50QWxwaGEgKiAxMDAwKSAvIDEwMDAsXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIH0sIHsgZm9ybWF0OiBvcHRzLmZvcm1hdCB8fCBjdXJyZW50UHJlZmVycmVkRm9ybWF0IH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc1ZhbGlkKCkge1xuICAgICAgICByZXR1cm4gIXRleHRJbnB1dC5jbGFzc0xpc3QuY29udGFpbnMoJ3NwLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbW92ZSgpIHtcbiAgICAgICAgdXBkYXRlVUkoKTtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBlbWl0KGJvdW5kRWxlbWVudCwgJ21vdmUnLCB7IGNvbG9yOiBnZXQoKSB9KTtcbiAgICAgICAgY2FsbGJhY2tzLm1vdmUoZXZlbnQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVVSSgpIHtcbiAgICAgICAgdGV4dElucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ3NwLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgdXBkYXRlSGVscGVyTG9jYXRpb25zKCk7XG4gICAgICAgIC8vIFVwZGF0ZSBkcmFnZ2VyIGJhY2tncm91bmQgY29sb3IgKGdyYWRpZW50cyB0YWtlIGNhcmUgb2Ygc2F0dXJhdGlvbiBhbmQgdmFsdWUpLlxuICAgICAgICBjb25zdCBmbGF0Q29sb3IgPSB0aW55Y29sb3IuZnJvbVJhdGlvKHsgaDogY3VycmVudEh1ZSwgczogMSwgdjogMSB9KTtcbiAgICAgICAgZHJhZ2dlci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBmbGF0Q29sb3IudG9IZXhTdHJpbmcoKTtcbiAgICAgICAgLy8gR2V0IGEgZm9ybWF0IHRoYXQgYWxwaGEgd2lsbCBiZSBpbmNsdWRlZCBpbiAoaGV4IGFuZCBuYW1lcyBpZ25vcmUgYWxwaGEpXG4gICAgICAgIGxldCBmb3JtYXQgPSBjdXJyZW50UHJlZmVycmVkRm9ybWF0O1xuICAgICAgICBpZiAoY3VycmVudEFscGhhIDwgMSAmJiAhKGN1cnJlbnRBbHBoYSA9PT0gMCAmJiBmb3JtYXQgPT09ICduYW1lJykpIHtcbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICdoZXgnIHx8IGZvcm1hdCA9PT0gJ2hleDMnIHx8IGZvcm1hdCA9PT0gJ2hleDYnIHx8IGZvcm1hdCA9PT0gJ25hbWUnKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gJ3JnYic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlYWxDb2xvciA9IGdldCh7IGZvcm1hdCB9KSwgZGlzcGxheUNvbG9yID0gJyc7XG4gICAgICAgIC8vcmVzZXQgYmFja2dyb3VuZCBpbmZvIGZvciBwcmV2aWV3IGVsZW1lbnRcbiAgICAgICAgaWYgKHByZXZpZXdFbGVtZW50KSB7XG4gICAgICAgICAgICBwcmV2aWV3RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzcC1jbGVhci1kaXNwbGF5Jyk7XG4gICAgICAgICAgICBwcmV2aWV3RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAndHJhbnNwYXJlbnQnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWFsQ29sb3IgPT09ICcnKSB7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHJlcGxhY2VkIGVsZW1lbnRzIGJhY2tncm91bmQgd2l0aCBpY29uIGluZGljYXRpbmcgbm8gY29sb3Igc2VsZWN0aW9uXG4gICAgICAgICAgICBwcmV2aWV3RWxlbWVudCA9PT0gbnVsbCB8fCBwcmV2aWV3RWxlbWVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcHJldmlld0VsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc3AtY2xlYXItZGlzcGxheScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcmVhbEhleCA9IHJlYWxDb2xvci50b0hleFN0cmluZygpO1xuICAgICAgICAgICAgY29uc3QgcmVhbFJnYiA9IHJlYWxDb2xvci50b1JnYlN0cmluZygpO1xuICAgICAgICAgICAgaWYgKHByZXZpZXdFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSByZXBsYWNlZCBlbGVtZW50cyBiYWNrZ3JvdW5kIGNvbG9yICh3aXRoIGFjdHVhbCBzZWxlY3RlZCBjb2xvcilcbiAgICAgICAgICAgICAgICBpZiAocmVhbENvbG9yLmdldEFscGhhKCkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlld0VsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gcmVhbFJnYjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpZXdFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpZXdFbGVtZW50LnN0eWxlLmZpbHRlciA9IHJlYWxDb2xvci50b0ZpbHRlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRzLnNob3dBbHBoYSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJnYiA9IHJlYWxDb2xvci50b1JnYigpO1xuICAgICAgICAgICAgICAgIHJnYi5hID0gMDtcbiAgICAgICAgICAgICAgICBjb25zdCByZWFsQWxwaGEgPSB0aW55Y29sb3IocmdiKS50b1JnYlN0cmluZygpO1xuICAgICAgICAgICAgICAgIGFscGhhU2xpZGVySW5uZXIuc3R5bGUuYmFja2dyb3VuZCA9IGBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICR7cmVhbEFscGhhfSwgJHtyZWFsSGV4fSlgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGlzcGxheUNvbG9yID0gcmVhbENvbG9yLnRvU3RyaW5nKGZvcm1hdCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVXBkYXRlIHRoZSB0ZXh0IGVudHJ5IGlucHV0IGFzIGl0IGNoYW5nZXMgaGFwcGVuXG4gICAgICAgIGlmIChvcHRzLnNob3dJbnB1dCkge1xuICAgICAgICAgICAgdGV4dElucHV0LnZhbHVlID0gZGlzcGxheUNvbG9yO1xuICAgICAgICB9XG4gICAgICAgIGJvdW5kRWxlbWVudC52YWx1ZSA9IGRpc3BsYXlDb2xvcjtcbiAgICAgICAgaWYgKG9wdHMudHlwZSA9PSAndGV4dCcgfHwgb3B0cy50eXBlID09ICdjb21wb25lbnQnKSB7XG4gICAgICAgICAgICBjb25zdCBjb2xvciA9IHJlYWxDb2xvcjtcbiAgICAgICAgICAgIGlmIChjb2xvciAmJiBjb2xvcml6ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0Q29sb3IgPSAoY29sb3IuaXNMaWdodCgpIHx8IGNvbG9yLmdldEFscGhhKCkgPCAwLjQpID8gJ2JsYWNrJyA6ICd3aGl0ZSc7XG4gICAgICAgICAgICAgICAgY29sb3JpemVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yLnRvUmdiU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgY29sb3JpemVFbGVtZW50LnN0eWxlLmNvbG9yID0gdGV4dENvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY29sb3JpemVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgY29sb3JpemVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yaXplRWxlbWVudEluaXRpYWxCYWNrZ3JvdW5kO1xuICAgICAgICAgICAgICAgIGNvbG9yaXplRWxlbWVudC5zdHlsZS5jb2xvciA9IGNvbG9yaXplRWxlbWVudEluaXRpYWxDb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cy5zaG93UGFsZXR0ZSkge1xuICAgICAgICAgICAgZHJhd1BhbGV0dGUoKTtcbiAgICAgICAgfVxuICAgICAgICBkcmF3SW5pdGlhbCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVIZWxwZXJMb2NhdGlvbnMoKSB7XG4gICAgICAgIGlmIChhbGxvd0VtcHR5ICYmIGlzRW1wdHkpIHtcbiAgICAgICAgICAgIC8vaWYgc2VsZWN0ZWQgY29sb3IgaXMgZW1wdHksIGhpZGUgdGhlIGhlbHBlcnNcbiAgICAgICAgICAgIGFscGhhU2xpZGVIZWxwZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHNsaWRlSGVscGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBkcmFnSGVscGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvL21ha2Ugc3VyZSBoZWxwZXJzIGFyZSB2aXNpYmxlXG4gICAgICAgICAgICBhbHBoYVNsaWRlSGVscGVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgc2xpZGVIZWxwZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICBkcmFnSGVscGVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgLy8gV2hlcmUgdG8gc2hvdyB0aGUgbGl0dGxlIGNpcmNsZSBpbiB0aGF0IGRpc3BsYXlzIHlvdXIgY3VycmVudCBzZWxlY3RlZCBjb2xvclxuICAgICAgICAgICAgbGV0IGRyYWdYID0gY3VycmVudFNhdHVyYXRpb24gKiBkcmFnV2lkdGg7XG4gICAgICAgICAgICBsZXQgZHJhZ1kgPSBkcmFnSGVpZ2h0IC0gKGN1cnJlbnRWYWx1ZSAqIGRyYWdIZWlnaHQpO1xuICAgICAgICAgICAgZHJhZ1ggPSBNYXRoLm1heCgtZHJhZ0hlbHBlckhlaWdodCwgTWF0aC5taW4oZHJhZ1dpZHRoIC0gZHJhZ0hlbHBlckhlaWdodCwgZHJhZ1ggLSBkcmFnSGVscGVySGVpZ2h0KSk7XG4gICAgICAgICAgICBkcmFnWSA9IE1hdGgubWF4KC1kcmFnSGVscGVySGVpZ2h0LCBNYXRoLm1pbihkcmFnSGVpZ2h0IC0gZHJhZ0hlbHBlckhlaWdodCwgZHJhZ1kgLSBkcmFnSGVscGVySGVpZ2h0KSk7XG4gICAgICAgICAgICBkcmFnSGVscGVyLnN0eWxlLnRvcCA9IGRyYWdZICsgJ3B4JztcbiAgICAgICAgICAgIGRyYWdIZWxwZXIuc3R5bGUubGVmdCA9IGRyYWdYICsgJ3B4JztcbiAgICAgICAgICAgIGNvbnN0IGFscGhhWCA9IGN1cnJlbnRBbHBoYSAqIGFscGhhV2lkdGg7XG4gICAgICAgICAgICBhbHBoYVNsaWRlSGVscGVyLnN0eWxlLmxlZnQgPSAoYWxwaGFYIC0gKGFscGhhU2xpZGVIZWxwZXJXaWR0aCAvIDIpKSArICdweCc7XG4gICAgICAgICAgICAvLyBXaGVyZSB0byBzaG93IHRoZSBiYXIgdGhhdCBkaXNwbGF5cyB5b3VyIGN1cnJlbnQgc2VsZWN0ZWQgaHVlXG4gICAgICAgICAgICBjb25zdCBzbGlkZVkgPSAoY3VycmVudEh1ZSkgKiBzbGlkZUhlaWdodDtcbiAgICAgICAgICAgIHNsaWRlSGVscGVyLnN0eWxlLnRvcCA9IChzbGlkZVkgLSBzbGlkZUhlbHBlckhlaWdodCkgKyAncHgnO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZU9yaWdpbmFsSW5wdXQoZmlyZUNhbGxiYWNrID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IGNvbG9yID0gZ2V0KCksIGhhc0NoYW5nZWQgPSAhdGlueWNvbG9yLmVxdWFscyhjb2xvciwgY29sb3JPblNob3cpO1xuICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICAgIGNvbG9yLnRvU3RyaW5nKGN1cnJlbnRQcmVmZXJyZWRGb3JtYXQpO1xuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBzZWxlY3Rpb24gcGFsZXR0ZSB3aXRoIHRoZSBjdXJyZW50IGNvbG9yXG4gICAgICAgICAgICBhZGRDb2xvclRvU2VsZWN0aW9uUGFsZXR0ZShjb2xvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpcmVDYWxsYmFjayAmJiBoYXNDaGFuZ2VkKSB7XG4gICAgICAgICAgICAvLyB3ZSB0cmlnZ2VyIHRoZSBjaGFuZ2UgZXZlbnQgb3IgaW5wdXQsIGJ1dCB0aGUgaW5wdXQgY2hhbmdlIGV2ZW50IGlzIGFsc28gYmluZGVkXG4gICAgICAgICAgICAvLyB0byBzb21lIHNwZWN0cnVtIHByb2Nlc3NpbmcsIHRoYXQgd2UgZG8gbm8gbmVlZFxuICAgICAgICAgICAgYWJvcnROZXh0SW5wdXRDaGFuZ2UgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBlbWl0KGJvdW5kRWxlbWVudCwgJ2NoYW5nZScsIHsgY29sb3IgfSk7XG4gICAgICAgICAgICBjYWxsYmFja3MuY2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiByZWZsb3coKSB7XG4gICAgICAgIGlmICghdmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBDYWxjdWxhdGlvbnMgd291bGQgYmUgdXNlbGVzcyBhbmQgd291bGRuJ3QgYmUgcmVsaWFibGUgYW55d2F5c1xuICAgICAgICB9XG4gICAgICAgIGRyYWdXaWR0aCA9IGRyYWdnZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgIGRyYWdIZWlnaHQgPSBkcmFnZ2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgZHJhZ0hlbHBlckhlaWdodCA9IGRyYWdIZWxwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICBzbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgIHNsaWRlSGVpZ2h0ID0gc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgc2xpZGVIZWxwZXJIZWlnaHQgPSBzbGlkZUhlbHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICAgIGFscGhhV2lkdGggPSBhbHBoYVNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgYWxwaGFTbGlkZUhlbHBlcldpZHRoID0gYWxwaGFTbGlkZUhlbHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgaWYgKCFmbGF0KSB7XG4gICAgICAgICAgICBjb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICAgICAgaWYgKG9wdHMub2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgc2V0RWxlbWVudE9mZnNldChjb250YWluZXIsIG9wdHMub2Zmc2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldEVsZW1lbnRPZmZzZXQoY29udGFpbmVyLCBnZXRPZmZzZXQoY29udGFpbmVyLCBvZmZzZXRFbGVtZW50KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlSGVscGVyTG9jYXRpb25zKCk7XG4gICAgICAgIGlmIChvcHRzLnNob3dQYWxldHRlKSB7XG4gICAgICAgICAgICBkcmF3UGFsZXR0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVtaXQoYm91bmRFbGVtZW50LCAncmVmbG93Jyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIGJvdW5kRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIGJvdW5kRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzcGVjdHJ1bScsICd3aXRoLWFkZC1vbicsICdzcC1jb2xvcml6ZScpO1xuICAgICAgICBvZmZzZXRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb2Zmc2V0RWxlbWVudFN0YXJ0KTtcbiAgICAgICAgb2Zmc2V0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb2Zmc2V0RWxlbWVudFN0YXJ0KTtcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICByZXBsYWNlciA9PT0gbnVsbCB8fCByZXBsYWNlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVwbGFjZXIucmVtb3ZlKCk7XG4gICAgICAgIGlmIChjb2xvcml6ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbG9yaXplRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcml6ZUVsZW1lbnRJbml0aWFsQmFja2dyb3VuZDtcbiAgICAgICAgICAgIGNvbG9yaXplRWxlbWVudC5zdHlsZS5jb2xvciA9IGNvbG9yaXplRWxlbWVudEluaXRpYWxDb2xvcjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcmlnaW5hbElucHV0Q29udGFpbmVyID0gYm91bmRFbGVtZW50LmNsb3Nlc3QoJy5zcC1vcmlnaW5hbC1pbnB1dC1jb250YWluZXInKTtcbiAgICAgICAgaWYgKG9yaWdpbmFsSW5wdXRDb250YWluZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsSW5wdXRDb250YWluZXIuYWZ0ZXIoYm91bmRFbGVtZW50KTtcbiAgICAgICAgICAgIG9yaWdpbmFsSW5wdXRDb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3BlY3RydW1zW3NwZWN0LmlkXSA9IG51bGw7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9wdGlvbihvcHRpb25OYW1lID0gdW5kZWZpbmVkLCBvcHRpb25WYWx1ZSA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob3B0aW9uTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgb3B0cyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvblZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRzW29wdGlvbk5hbWVdO1xuICAgICAgICB9XG4gICAgICAgIG9wdHNbb3B0aW9uTmFtZV0gPSBvcHRpb25WYWx1ZTtcbiAgICAgICAgaWYgKG9wdGlvbk5hbWUgPT09ICdwcmVmZXJyZWRGb3JtYXQnKSB7XG4gICAgICAgICAgICBjdXJyZW50UHJlZmVycmVkRm9ybWF0ID0gb3B0cy5wcmVmZXJyZWRGb3JtYXQ7XG4gICAgICAgIH1cbiAgICAgICAgYXBwbHlPcHRpb25zKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgICAgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgYm91bmRFbGVtZW50LmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIG9mZnNldEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc3AtZGlzYWJsZWQnKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgICAgaGlkZSgpO1xuICAgICAgICBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIGJvdW5kRWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIG9mZnNldEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc3AtZGlzYWJsZWQnKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0T2Zmc2V0KGNvb3JkKSB7XG4gICAgICAgIG9wdHMub2Zmc2V0ID0gY29vcmQ7XG4gICAgICAgIHJlZmxvdygpO1xuICAgIH1cbiAgICBpbml0aWFsaXplKCk7XG4gICAgbGV0IHNwZWN0ID0ge1xuICAgICAgICBpZDogMCxcbiAgICAgICAgc2hvdzogc2hvdyxcbiAgICAgICAgaGlkZTogaGlkZSxcbiAgICAgICAgdG9nZ2xlOiB0b2dnbGUsXG4gICAgICAgIHJlZmxvdzogcmVmbG93LFxuICAgICAgICBvcHRpb246IG9wdGlvbixcbiAgICAgICAgZW5hYmxlOiBlbmFibGUsXG4gICAgICAgIGRpc2FibGU6IGRpc2FibGUsXG4gICAgICAgIG9mZnNldDogc2V0T2Zmc2V0LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICBzZXQoYyk7XG4gICAgICAgICAgICB1cGRhdGVPcmlnaW5hbElucHV0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldDogZ2V0LFxuICAgICAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICB9O1xuICAgIHNwZWN0LmlkID0gc3BlY3RydW1zLnB1c2goc3BlY3QpIC0gMTtcbiAgICByZXR1cm4gc3BlY3Q7XG59XG4vKipcbiAqIGNoZWNrT2Zmc2V0IC0gZ2V0IHRoZSBvZmZzZXQgYmVsb3cvYWJvdmUgYW5kIGxlZnQvcmlnaHQgZWxlbWVudCBkZXBlbmRpbmcgb24gc2NyZWVuIHBvc2l0aW9uXG4gKiBUaGFua3MgaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnktdWkvYmxvYi9tYXN0ZXIvdWkvanF1ZXJ5LnVpLmRhdGVwaWNrZXIuanNcbiAqL1xuZnVuY3Rpb24gZ2V0T2Zmc2V0KHBpY2tlciwgaW5wdXQpIHtcbiAgICBjb25zdCBleHRyYVkgPSAwO1xuICAgIGNvbnN0IGRwV2lkdGggPSBwaWNrZXIub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgZHBIZWlnaHQgPSBwaWNrZXIub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IGlucHV0SGVpZ2h0ID0gaW5wdXQub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IGRvYyA9IHBpY2tlci5vd25lckRvY3VtZW50O1xuICAgIGNvbnN0IGRvY0VsZW0gPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgIGNvbnN0IHZpZXdXaWR0aCA9IGRvY0VsZW0uY2xpZW50V2lkdGggKyB3aW5kb3cucGFnZVhPZmZzZXQ7XG4gICAgY29uc3Qgdmlld0hlaWdodCA9IGRvY0VsZW0uY2xpZW50SGVpZ2h0ICsgd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgIGNvbnN0IG9mZnNldCA9IGdldEVsZW1lbnRPZmZzZXQoaW5wdXQpO1xuICAgIGxldCBvZmZzZXRMZWZ0ID0gb2Zmc2V0LmxlZnQ7XG4gICAgbGV0IG9mZnNldFRvcCA9IG9mZnNldC50b3A7XG4gICAgb2Zmc2V0VG9wICs9IGlucHV0SGVpZ2h0O1xuICAgIG9mZnNldExlZnQgLT1cbiAgICAgICAgTWF0aC5taW4ob2Zmc2V0TGVmdCwgKG9mZnNldExlZnQgKyBkcFdpZHRoID4gdmlld1dpZHRoICYmIHZpZXdXaWR0aCA+IGRwV2lkdGgpID9cbiAgICAgICAgICAgIE1hdGguYWJzKG9mZnNldExlZnQgKyBkcFdpZHRoIC0gdmlld1dpZHRoKSA6IDApO1xuICAgIG9mZnNldFRvcCAtPVxuICAgICAgICBNYXRoLm1pbihvZmZzZXRUb3AsICgob2Zmc2V0VG9wICsgZHBIZWlnaHQgPiB2aWV3SGVpZ2h0ICYmIHZpZXdIZWlnaHQgPiBkcEhlaWdodCkgP1xuICAgICAgICAgICAgTWF0aC5hYnMoZHBIZWlnaHQgKyBpbnB1dEhlaWdodCAtIGV4dHJhWSkgOiBleHRyYVkpKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IG9mZnNldFRvcCxcbiAgICAgICAgLy8gYm90dG9tOiBvZmZzZXQuYm90dG9tLFxuICAgICAgICBsZWZ0OiBvZmZzZXRMZWZ0LFxuICAgICAgICAvLyByaWdodDogb2Zmc2V0LnJpZ2h0LFxuICAgICAgICAvLyB3aWR0aDogb2Zmc2V0LndpZHRoLFxuICAgICAgICAvLyBoZWlnaHQ6IG9mZnNldC5oZWlnaHRcbiAgICB9O1xufVxuLyoqXG4gKiBub29wIC0gZG8gbm90aGluZ1xuICovXG5mdW5jdGlvbiBub29wKCkge1xufVxuLyoqXG4gKiBDcmVhdGUgYSBmdW5jdGlvbiBib3VuZCB0byBhIGdpdmVuIG9iamVjdFxuICogVGhhbmtzIHRvIHVuZGVyc2NvcmUuanNcbiAqL1xuZnVuY3Rpb24gYmluZChmdW5jLCBvYmopIHtcbiAgICBjb25zdCBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbiAgICBjb25zdCBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmFwcGx5KG9iaiwgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgfTtcbn1cbi8qKlxuICogTGlnaHR3ZWlnaHQgZHJhZyBoZWxwZXIuICBIYW5kbGVzIGNvbnRhaW5tZW50IHdpdGhpbiB0aGUgZWxlbWVudCwgc28gdGhhdFxuICogd2hlbiBkcmFnZ2luZywgdGhlIHggaXMgd2l0aGluIFswLGVsZW1lbnQud2lkdGhdIGFuZCB5IGlzIHdpdGhpbiBbMCxlbGVtZW50LmhlaWdodF1cbiAqL1xuZnVuY3Rpb24gZHJhZ2dhYmxlKGVsZW1lbnQsIG9ubW92ZSwgb25zdGFydCwgb25zdG9wKSB7XG4gICAgb25tb3ZlID0gb25tb3ZlIHx8IG5vb3A7XG4gICAgb25zdGFydCA9IG9uc3RhcnQgfHwgbm9vcDtcbiAgICBvbnN0b3AgPSBvbnN0b3AgfHwgbm9vcDtcbiAgICBjb25zdCBkb2MgPSBkb2N1bWVudDtcbiAgICBsZXQgZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICBsZXQgb2Zmc2V0ID0ge307XG4gICAgbGV0IG1heEhlaWdodCA9IDA7XG4gICAgbGV0IG1heFdpZHRoID0gMDtcbiAgICBjb25zdCBoYXNUb3VjaCA9ICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpO1xuICAgIGNvbnN0IGR1cmluZ0RyYWdFdmVudHMgPSB7fTtcbiAgICBkdXJpbmdEcmFnRXZlbnRzWydzZWxlY3RzdGFydCddID0gcHJldmVudDtcbiAgICBkdXJpbmdEcmFnRXZlbnRzWydkcmFnc3RhcnQnXSA9IHByZXZlbnQ7XG4gICAgZHVyaW5nRHJhZ0V2ZW50c1sndG91Y2htb3ZlJ10gPSBtb3ZlO1xuICAgIGR1cmluZ0RyYWdFdmVudHNbJ21vdXNlbW92ZSddID0gbW92ZTtcbiAgICBkdXJpbmdEcmFnRXZlbnRzWyd0b3VjaGVuZCddID0gc3RvcDtcbiAgICBkdXJpbmdEcmFnRXZlbnRzWydtb3VzZXVwJ10gPSBzdG9wO1xuICAgIGZ1bmN0aW9uIHByZXZlbnQoZSkge1xuICAgICAgICBpZiAoZS5zdG9wUHJvcGFnYXRpb24pIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1vdmUoZSkge1xuICAgICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IHQwID0gJ3RvdWNoZXMnIGluIGUgJiYgZS50b3VjaGVzWzBdO1xuICAgICAgICAgICAgY29uc3QgcGFnZVggPSB0MCAmJiB0MC5wYWdlWCB8fCBlLnBhZ2VYO1xuICAgICAgICAgICAgY29uc3QgcGFnZVkgPSB0MCAmJiB0MC5wYWdlWSB8fCBlLnBhZ2VZO1xuICAgICAgICAgICAgY29uc3QgZHJhZ1ggPSBNYXRoLm1heCgwLCBNYXRoLm1pbihwYWdlWCAtIG9mZnNldC5sZWZ0LCBtYXhXaWR0aCkpO1xuICAgICAgICAgICAgY29uc3QgZHJhZ1kgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihwYWdlWSAtIG9mZnNldC50b3AsIG1heEhlaWdodCkpO1xuICAgICAgICAgICAgaWYgKGhhc1RvdWNoKSB7XG4gICAgICAgICAgICAgICAgLy8gU3RvcCBzY3JvbGxpbmcgaW4gaU9TXG4gICAgICAgICAgICAgICAgcHJldmVudChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9ubW92ZS5hcHBseShlbGVtZW50LCBbZHJhZ1gsIGRyYWdZLCBlXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc3RhcnQoZSkge1xuICAgICAgICBjb25zdCByaWdodGNsaWNrID0gKGUud2hpY2gpID8gKGUud2hpY2ggPT0gMykgOiAoZS5idXR0b24gPT09IDIpO1xuICAgICAgICBpZiAoIXJpZ2h0Y2xpY2sgJiYgIWRyYWdnaW5nKSB7XG4gICAgICAgICAgICBpZiAob25zdGFydC5hcHBseShlbGVtZW50LCBhcmd1bWVudHMpICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBtYXhIZWlnaHQgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgICAgICAgICAgICBtYXhXaWR0aCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gZ2V0RWxlbWVudE9mZnNldChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGV2ZW50TmFtZSBpbiBkdXJpbmdEcmFnRXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZHVyaW5nRHJhZ0V2ZW50c1tldmVudE5hbWVdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZG9jLmJvZHkuY2xhc3NMaXN0LmFkZCgnc3AtZHJhZ2dpbmcnKTtcbiAgICAgICAgICAgICAgICBtb3ZlKGUpO1xuICAgICAgICAgICAgICAgIHByZXZlbnQoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGV2ZW50TmFtZSBpbiBkdXJpbmdEcmFnRXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBkdXJpbmdEcmFnRXZlbnRzW2V2ZW50TmFtZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9jLmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnc3AtZHJhZ2dpbmcnKTtcbiAgICAgICAgICAgIC8vIFdhaXQgYSB0aWNrIGJlZm9yZSBub3RpZnlpbmcgb2JzZXJ2ZXJzIHRvIGFsbG93IHRoZSBjbGljayBldmVudFxuICAgICAgICAgICAgLy8gdG8gZmlyZSBpbiBDaHJvbWUuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBvbnN0b3AuYXBwbHkoZWxlbWVudCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgICAgIGRyYWdnaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHN0YXJ0KTtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHN0YXJ0KTtcbn1cbmNsYXNzIFNwZWN0cnVtIHtcbiAgICBzdGF0aWMgY3JlYXRlKHNlbGVjdG9yLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3QgZWxlID0gdGhpcy53cmFwKHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKCFlbGUpIHtcbiAgICAgICAgICAgIGxldCBtc2cgPSAnVW5hYmxlIHRvIGZpbmQgZWxlbWVudCc7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIG1zZyArPSAnIC0gU2VsZWN0b3I6ICcgKyBzZWxlY3RvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IEVycm9yKG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKGVsZSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGVJZkV4aXN0cyhzZWxlY3Rvciwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGVsZSA9IHRoaXMud3JhcChzZWxlY3Rvcik7XG4gICAgICAgIGlmICghZWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IHRoaXMoZWxlLCBvcHRpb25zKTtcbiAgICB9XG4gICAgc3RhdGljIGdldEluc3RhbmNlKHNlbGVjdG9yLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3QgZWxlID0gdGhpcy53cmFwKHNlbGVjdG9yKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gZWxlLl9fc3BlY3RydW0gPSBlbGUuX19zcGVjdHJ1bSB8fCB0aGlzLmNyZWF0ZUlmRXhpc3RzKGVsZSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHN0YXRpYyBoYXNJbnN0YW5jZShzZWxlY3Rvcikge1xuICAgICAgICBjb25zdCBlbGUgPSB0aGlzLndyYXAoc2VsZWN0b3IpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBlbGUuX19zcGVjdHJ1bSAhPT0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBzdGF0aWMgY3JlYXRlTXVsdGlwbGUoc2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBjb25zdCBpbnN0YW5jZXMgPSBbXTtcbiAgICAgICAgdGhpcy53cmFwTGlzdChzZWxlY3RvcikuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgICAgICAgICBpbnN0YW5jZXMucHVzaCh0aGlzLmNyZWF0ZShlbGUsIG9wdGlvbnMpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZXM7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZU11bHRpcGxlKHNlbGVjdG9yLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3QgaW5zdGFuY2VzID0gW107XG4gICAgICAgIHRoaXMud3JhcExpc3Qoc2VsZWN0b3IpLmZvckVhY2goKGVsZSkgPT4ge1xuICAgICAgICAgICAgaW5zdGFuY2VzLnB1c2godGhpcy5nZXRJbnN0YW5jZShlbGUsIG9wdGlvbnMpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZXM7XG4gICAgfVxuICAgIHN0YXRpYyB3cmFwKHNlbGVjdG9yKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2VsZWN0b3IuanF1ZXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3JbMF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIHdyYXBMaXN0KHNlbGVjdG9yKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2VsZWN0b3IuanF1ZXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3IudG9BcnJheSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBsb2NhbGUobG9jYWxlLCBsb2NhbGl6YXRpb24pIHtcbiAgICAgICAgdGhpcy5sb2NhbGl6YXRpb25bbG9jYWxlXSA9IGxvY2FsaXphdGlvbjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHN0YXRpYyByZWdpc3RlckpRdWVyeSgkKSB7XG4gICAgICAgIHJlZ2lzdGVySlF1ZXJ5UGx1Z2luKCQpO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihlbGUsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzID0ge307XG4gICAgICAgIHRoaXMuc3BlY3RydW0gPSBzcGVjdHJ1bShlbGUsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmVsZSA9IGVsZTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG4gICAgZ2V0IGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGVjdHJ1bS5pZDtcbiAgICB9XG4gICAgZ2V0IGNvbnRhaW5lcigpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAoIXRoaXMuZWxlLl9fc3BlY3RydW0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zcGVjdHJ1bS5jb250YWluZXI7XG4gICAgfVxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuc3BlY3RydW0uc2hvdygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5zcGVjdHJ1bS5oaWRlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMuc3BlY3RydW0udG9nZ2xlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZWZsb3coKSB7XG4gICAgICAgIHRoaXMuc3BlY3RydW0ucmVmbG93KCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBvcHRpb24ob3B0aW9uTmFtZSwgb3B0aW9uVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BlY3RydW0ub3B0aW9uKG9wdGlvbk5hbWUsIG9wdGlvblZhbHVlKTtcbiAgICB9XG4gICAgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLnNwZWN0cnVtLmVuYWJsZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5zcGVjdHJ1bS5kaXNhYmxlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBvZmZzZXQoY29vcmQpIHtcbiAgICAgICAgdGhpcy5zcGVjdHJ1bS5vZmZzZXQoY29vcmQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0KGNvbG9yLCBpZ25vcmVGb3JtYXRDaGFuZ2UgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLnNwZWN0cnVtLnNldChjb2xvciwgaWdub3JlRm9ybWF0Q2hhbmdlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BlY3RydW0uZ2V0KCk7XG4gICAgfVxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveUlubmVyT2JqZWN0KCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZGVsZXRlIHRoaXMuZWxlLl9fc3BlY3RydW07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZWJ1aWxkKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95SW5uZXJPYmplY3QoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zcGVjdHJ1bSA9IHNwZWN0cnVtKHRoaXMuZWxlLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZGVzdHJveUlubmVyT2JqZWN0KCkge1xuICAgICAgICB0aGlzLnNwZWN0cnVtLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5vZmYoKTtcbiAgICB9XG4gICAgbGlzdGVuZXJzKGV2ZW50TmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudExpc3RlbmVyc1tldmVudE5hbWVdIHx8IFtdO1xuICAgIH1cbiAgICBvbihldmVudE5hbWUsIGxpc3RlbmVyLCBvcHRpb25zID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZWxlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXSA9IHRoaXMuZXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXSB8fCBbXTtcbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyc1tldmVudE5hbWVdLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vZmYoZXZlbnROYW1lLCBsaXN0ZW5lcik7XG4gICAgICAgIH07XG4gICAgfVxuICAgIG9uY2UoZXZlbnROYW1lLCBsaXN0ZW5lciwgb3B0aW9ucyA9IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBjYW5jZWwgPSB0aGlzLm9uKGV2ZW50TmFtZSwgKGUpID0+IHtcbiAgICAgICAgICAgIGxpc3RlbmVyKGUpO1xuICAgICAgICAgICAgY2FuY2VsKCk7XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gY2FuY2VsO1xuICAgIH1cbiAgICBvZmYoZXZlbnROYW1lID0gdW5kZWZpbmVkLCBsaXN0ZW5lciA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoZXZlbnROYW1lICYmICF0aGlzLmV2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWV2ZW50TmFtZSkge1xuICAgICAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycyA9IHt9O1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyc1tldmVudE5hbWVdID0gdGhpcy5ldmVudExpc3RlbmVyc1tldmVudE5hbWVdXG4gICAgICAgICAgICAgICAgLmZpbHRlcigobCkgPT4gbCA9PT0gbGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5lbGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgdGhpcy5ldmVudExpc3RlbmVyc1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgICB9XG4gICAgfVxufVxuU3BlY3RydW0uZGVmYXVsdE9wdGlvbnMgPSBkZWZhdWx0T3B0cztcblNwZWN0cnVtLmRyYWdnYWJsZSA9IGRyYWdnYWJsZTtcblNwZWN0cnVtLmxvY2FsaXphdGlvbiA9IHt9O1xuU3BlY3RydW0ucGFsZXR0ZSA9IFtdO1xuLy8gQHRzLWlnbm9yZVxuY29uc3QgalF1ZXJ5ID0gd2luZG93LmpRdWVyeTtcbmlmIChqUXVlcnkpIHtcbiAgICByZWdpc3RlckpRdWVyeVBsdWdpbihqUXVlcnkpO1xufVxuZnVuY3Rpb24gcmVnaXN0ZXJKUXVlcnlQbHVnaW4oJCkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICAkLmZuLnNwZWN0cnVtID0gZnVuY3Rpb24gKGFjdGlvbiA9IHVuZGVmaW5lZCwgLi4uYXJncykge1xuICAgICAgICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbGV0IHJldHVyblZhbHVlID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3BlY3QgPSB0aGlzLl9fc3BlY3RydW07XG4gICAgICAgICAgICAgICAgaWYgKHNwZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IHNwZWN0W2FjdGlvbl07XG4gICAgICAgICAgICAgICAgICAgIGlmICghbWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTcGVjdHJ1bTogbm8gc3VjaCBtZXRob2Q6ICdcIiArIGFjdGlvbiArIFwiJ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09PSBcImdldFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHNwZWN0LmdldCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFjdGlvbiA9PT0gXCJjb250YWluZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSAkKHNwZWN0LmNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYWN0aW9uID09PSBcIm9wdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHNwZWN0Lm9wdGlvbi5hcHBseShzcGVjdCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYWN0aW9uID09PSBcImRlc3Ryb3lcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BlY3QuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BlY3RbYWN0aW9uXSguLi5hcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIEluaXRpYWxpemluZyBhIG5ldyBpbnN0YW5jZSBvZiBzcGVjdHJ1bVxuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgJCh0aGlzKS5kYXRhKCksIGFjdGlvbik7XG4gICAgICAgICAgICAvLyBJbmZlciBkZWZhdWx0IHR5cGUgZnJvbSBpbnB1dCBwYXJhbXMgYW5kIGRlcHJlY2F0ZWQgb3B0aW9uc1xuICAgICAgICAgICAgaWYgKCEkKHRoaXMpLmlzKCdpbnB1dCcpKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy50eXBlID0gJ2NvbG9yJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnMudHlwZSA9PSBcImZsYXRcIikge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMudHlwZSA9ICdmbGF0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCQodGhpcykuYXR0cigndHlwZScpID09ICdjb2xvcicpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnR5cGUgPSAnY29sb3InO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy50eXBlID0gb3B0aW9ucy50eXBlIHx8ICdjb21wb25lbnQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFNwZWN0cnVtLmhhc0luc3RhbmNlKHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3AgPSBTcGVjdHJ1bS5nZXRJbnN0YW5jZSh0aGlzKTtcbiAgICAgICAgICAgICAgICBzcC5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICAgICAgICBzcC5yZWJ1aWxkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBTcGVjdHJ1bS5nZXRJbnN0YW5jZSh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAkLmZuLnNwZWN0cnVtLmxvYWQgPSB0cnVlO1xuICAgICQuZm4uc3BlY3RydW0ubG9hZE9wdHMgPSB7fTtcbiAgICAkLmZuLnNwZWN0cnVtLmRyYWdnYWJsZSA9IGRyYWdnYWJsZTtcbiAgICAkLmZuLnNwZWN0cnVtLmRlZmF1bHRzID0gZGVmYXVsdE9wdHM7XG4gICAgJC5mbi5zcGVjdHJ1bS5sb2NhbGl6YXRpb24gPSBTcGVjdHJ1bS5sb2NhbGl6YXRpb247XG4gICAgJC5mbi5zcGVjdHJ1bS5wYWxldHRlID0gW107XG4gICAgJC5mbi5zcGVjdHJ1bS5wcm9jZXNzTmF0aXZlQ29sb3JJbnB1dHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGNvbG9ySW5wdXRzID0gJChcImlucHV0W3R5cGU9Y29sb3JdXCIpO1xuICAgICAgICBpZiAoY29sb3JJbnB1dHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb2xvcklucHV0cy5zcGVjdHJ1bSh7XG4gICAgICAgICAgICAgICAgcHJlZmVycmVkRm9ybWF0OiBcImhleDZcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgeyBTcGVjdHJ1bSBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zcGVjdHJ1bS5lcy5qcy5tYXBcbiIsIjxzY3JpcHQgbGFuZz1cInRzXCIgc2V0dXA+XG5pbXBvcnQgU3BlY3RydW0gZnJvbSAnc3BlY3RydW0tdmFuaWxsYSc7XG5pbXBvcnQgeyBvbkJlZm9yZVVubW91bnQsIG9uTW91bnRlZCwgcmVmLCB3YXRjaCB9IGZyb20gJ3Z1ZSc7XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHM8e1xuICBpZD86IHN0cmluZztcbiAgaW5wdXRDbGFzcz86IHN0cmluZztcbiAgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIGFueT47XG59PigpO1xuXG5jb25zdCB2YWx1ZSA9IGRlZmluZU1vZGVsPHN0cmluZz4oKTtcbmNvbnN0IGlucHV0ID0gcmVmPEhUTUxJbnB1dEVsZW1lbnQ+KCk7XG5sZXQgc3A6IFNwZWN0cnVtO1xuXG5vbk1vdW50ZWQoKCkgPT4ge1xuICBzcCA9IFNwZWN0cnVtLmdldEluc3RhbmNlKGlucHV0LnZhbHVlISwgcHJvcHMub3B0aW9ucyB8fCB7fSk7XG59KTtcblxub25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgc3A/LmRlc3Ryb3koKTtcbn0pO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgICA8aW5wdXQgcmVmPVwiaW5wdXRcIiB0eXBlPVwidGV4dFwiXG4gICAgICAgIDppZD1cImlkXCJcbiAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZmxleC1ncm93LTFcIlxuICAgICAgICA6Y2xhc3M9XCJpbnB1dENsYXNzXCJcbiAgICAgICAgdi1tb2RlbC5sYXp5PVwidmFsdWVcIlxuICAgIC8+XG48L3RlbXBsYXRlPlxuXG48c3R5bGU+XG4gIEBpbXBvcnQgXCJzcGVjdHJ1bS12YW5pbGxhL2Rpc3Qvc3BlY3RydW0ubWluLmNzc1wiO1xuXG4gIC5zcC1hZGQtb24ge1xuICAgIHdpZHRoOiA0MHB4ICFpbXBvcnRhbnQ7XG4gIH1cbjwvc3R5bGU+XG4iLCI8c2NyaXB0IGxhbmc9XCJ0c1wiIHNldHVwPlxuaW1wb3J0IHsgcmVmLCBvbk1vdW50ZWQsIHdhdGNoIH0gZnJvbSAndnVlJztcbmltcG9ydCB7IFRpdGxlT3B0aW9ucyB9IGZyb20gJ35sdW5hL3R5cGVzJztcbmltcG9ydCBSd2RHcm91cCBmcm9tIFwiLi4vZm9ybS9Sd2RHcm91cC52dWVcIjtcbmltcG9ydCBDb2xvcklucHV0IGZyb20gJy4vQ29sb3JJbnB1dC52dWUnO1xuaW1wb3J0IFNsaWRlcklucHV0IGZyb20gJy4vU2xpZGVySW5wdXQudnVlJztcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wczx7IFxuICBpZD86IHN0cmluZztcbn0+KCk7XG5cbmNvbnN0IG9wdGlvbnMgPSBkZWZpbmVNb2RlbDxUaXRsZU9wdGlvbnM+KHtcbiAgcmVxdWlyZWQ6IHRydWVcbn0pO1xuY29uc3QgcHJlcGFyZWQgPSByZWYoZmFsc2UpO1xuXG5vbk1vdW50ZWQoKCkgPT4ge1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBwcmVwYXJlZC52YWx1ZSA9IHRydWU7XG4gIH0sIDE1MCk7XG59KTtcblxuLy8gd2F0Y2gob3B0aW9ucywgKHZhbCkgPT4ge1xuLy8gICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHZhbCk7XG4vLyB9LCB7IGRlZXA6IHRydWUgfSk7XG4vL1xuLy8gd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgKHZhbCkgPT4ge1xuLy8gICBpZiAoIXZhbCkgcmV0dXJuO1xuLy8gICBvcHRpb25zLnZhbHVlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh2YWwpKTtcbi8vIH0sIHsgZGVlcDogdHJ1ZSB9KTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJjLXRpdGxlLW9wdGlvbnNcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1yb3cgcm93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLTZcIj5cbiAgICAgICAgPCEtLSBUaXRsZSBFbGVtZW50IC0tPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCI+XG4gICAgICAgICAgPGxhYmVsIDpmb3I9XCJpZCArICd0aXRsZS1lbGVtZW50J1wiPlxuICAgICAgICAgICAgVGl0bGUgRWxlbWVudFxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPHNlbGVjdCA6aWQ9XCJpZCArICd0aXRsZS1lbGVtZW50J1wiXG4gICAgICAgICAgICB2LW1vZGVsPVwib3B0aW9ucy5lbGVtZW50XCIgY2xhc3M9XCJmb3JtLXNlbGVjdCBjdXN0b20tc2VsZWN0XCI+XG4gICAgICAgICAgICA8b3B0aW9uIHYtZm9yPVwiaSBvZiBbMSwgMiwgMywgNCwgNSwgNl1cIiA6dmFsdWU9XCInaCcgKyBpXCI+XG4gICAgICAgICAgICAgIGh7eyBpIH19XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cbiAgICAgICAgPCEtLSBUaXRsZSBDb2xvciAtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgbWItM1wiPlxuICAgICAgICAgIDxsYWJlbCA6Zm9yPVwiaWQgKyAndGl0bGUtY29sb3InXCI+VGl0bGUgQ29sb3I8L2xhYmVsPlxuICAgICAgICAgIDxDb2xvcklucHV0IDppZD1cImlkICsgJ3RpdGxlLWNvbG9yJ1wiIHYtbW9kZWwubGF6eT1cIm9wdGlvbnMuY29sb3JcIiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImZvcm0tcm93IHJvd1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC02XCI+XG4gICAgICAgIDwhLS0gVGl0bGUgRm9udCBTaXplIC0tPlxuICAgICAgICA8UndkR3JvdXAgY2xhc3MtbmFtZT1cImMtdGl0bGUtZm9udC1zaXplXCI+XG4gICAgICAgICAgPHRlbXBsYXRlICNsYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgVGl0bGUgRm9udCBTaXplXG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtZm9yPVwic2l6ZSBvZiBbJ2xnJywgJ21kJywgJ3hzJ11cIiBjbGFzcz1cImZvcm0tZ3JvdXAgbWItM1wiXG4gICAgICAgICAgICB2LXNsb3Q6W3NpemVdXG4gICAgICAgICAgICA6Y2xhc3M9XCInYy10aXRsZS1mb250LXNpemVfXycgKyBzaXplXCI+XG4gICAgICAgICAgICA8U2xpZGVySW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD1cIm9wdGlvbnMuZm9udF9zaXplW3NpemUgYXMgJ2xnJyB8ICdtZCcgfCAneHMnXVwiXG4gICAgICAgICAgICAgIDptYXg9XCI1MDBcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L1J3ZEdyb3VwPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLTZcIj5cbiAgICAgICAgPCEtLSBUaXRsZSBGb250IFdlaWdodCAtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgbWItM1wiPlxuICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIFRpdGxlIEZvbnQgV2VpZ2h0XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiXCIgdi1pZj1cInByZXBhcmVkXCI+XG4gICAgICAgICAgICA8U2xpZGVySW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD1cIm9wdGlvbnMuZm9udF93ZWlnaHRcIlxuICAgICAgICAgICAgICA6ZGF0YT1cIlsnJywgMTAwLCAxNTAsIDIwMCwgMjUwLCAzMDAsIDM1MCwgNDAwLCA0NTAsIDUwMCwgNTUwLCA2MDAsIDY1MCwgNzAwLCA3NTAsIDgwMCwgODUwLCA5MDAsIDk1MCwgMTAwMF1cIlxuICAgICAgICAgICAgICA6bWF4PVwiMTAwMFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImZvcm0tcm93IHJvd1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC02XCI+XG4gICAgICAgIDwhLS0gVGl0bGUgTWFyZ2luIFRvcCAtLT5cbiAgICAgICAgPFJ3ZEdyb3VwIGNsYXNzLW5hbWU9XCJjLXRpdGxlLW1hcmdpbl90b3BcIj5cbiAgICAgICAgICA8dGVtcGxhdGUgI2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICBUaXRsZSBNYXJnaW4gVG9wXG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtZm9yPVwic2l6ZSBvZiBbJ2xnJywgJ21kJywgJ3hzJ11cIiBjbGFzcz1cImZvcm0tZ3JvdXAgbWItM1wiIHYtc2xvdDpbc2l6ZV1cbiAgICAgICAgICAgIDpjbGFzcz1cIidjLXRpdGxlLW1hcmdpbl90b3BfXycgKyBzaXplXCI+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIHYtbW9kZWw9XCJvcHRpb25zLm1hcmdpbl90b3Bbc2l6ZSBhcyAnbGcnIHwgJ21kJyB8ICd4cyddXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiAvPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDwvUndkR3JvdXA+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNlwiPlxuICAgICAgICA8IS0tIFRpdGxlIE1hcmdpbiBCb3R0b20gLS0+XG4gICAgICAgIDxSd2RHcm91cCBjbGFzcy1uYW1lPVwiYy10aXRsZS1tYXJnaW5fYm90dG9tXCI+XG4gICAgICAgICAgPHRlbXBsYXRlICNsYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgVGl0bGUgTWFyZ2luIEJvdHRvbVxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LWZvcj1cInNpemUgb2YgWydsZycsICdtZCcsICd4cyddXCIgY2xhc3M9XCJmb3JtLWdyb3VwIG1iLTNcIiB2LXNsb3Q6W3NpemVdXG4gICAgICAgICAgICA6Y2xhc3M9XCInYy10aXRsZS1tYXJnaW5fYm90dG9tX18nICsgc2l6ZVwiPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiB2LW1vZGVsPVwib3B0aW9ucy5tYXJnaW5fYm90dG9tW3NpemUgYXMgJ2xnJyB8ICdtZCcgfCAneHMnXVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgLz5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L1J3ZEdyb3VwPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJwIiwicSIsImh0bWwiLCJfYSIsInBhbGV0dGUiLCJvcHRzIiwib3JpZ2luYWxJbnB1dENvbnRhaW5lciIsImxpc3RlbmVyIiwiX3VzZU1vZGVsIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9ub3JtYWxpemVDbGFzcyIsIl9ob2lzdGVkXzEiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCIsIl90b0Rpc3BsYXlTdHJpbmciLCJfdk1vZGVsU2VsZWN0IiwiX2NyZWF0ZVZOb2RlIiwiX2NyZWF0ZVNsb3RzIiwiX3dpdGhDdHgiLCJfd2l0aERpcmVjdGl2ZXMiLCJfdk1vZGVsVGV4dCJdLCJtYXBwaW5ncyI6Ijs7O0FBSUEsTUFBTSxXQUFXO0FBQ2pCLE1BQU0sWUFBWTtBQUVsQixTQUFTLFVBQVUsT0FBTyxNQUFNO0FBQzlCLFVBQVEsUUFBUSxRQUFRO0FBQ3hCLFNBQU8sUUFBUSxDQUFBO0FBR2YsTUFBSSxpQkFBaUIsV0FBVztBQUM5QixXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksRUFBRSxnQkFBZ0IsWUFBWTtBQUNoQyxXQUFPLElBQUksVUFBVSxPQUFPLElBQUk7QUFBQSxFQUNsQztBQUVBLE1BQUksTUFBTSxXQUFXLEtBQUs7QUFDMUIsRUFBQyxLQUFLLGlCQUFpQixPQUNwQixLQUFLLEtBQUssSUFBSSxHQUNkLEtBQUssS0FBSyxJQUFJLEdBQ2QsS0FBSyxLQUFLLElBQUksR0FDZCxLQUFLLEtBQUssSUFBSSxHQUNkLEtBQUssVUFBVSxLQUFLLE1BQU0sTUFBTSxLQUFLLEVBQUUsSUFBSSxLQUMzQyxLQUFLLFVBQVUsS0FBSyxVQUFVLElBQUk7QUFDckMsT0FBSyxnQkFBZ0IsS0FBSztBQU0xQixNQUFJLEtBQUssS0FBSyxFQUFHLE1BQUssS0FBSyxLQUFLLE1BQU0sS0FBSyxFQUFFO0FBQzdDLE1BQUksS0FBSyxLQUFLLEVBQUcsTUFBSyxLQUFLLEtBQUssTUFBTSxLQUFLLEVBQUU7QUFDN0MsTUFBSSxLQUFLLEtBQUssRUFBRyxNQUFLLEtBQUssS0FBSyxN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LEVBQ1YsZUFBZTtBQUFBLEVBQ2YsVUFBVTtBQUFBLEVBQ1YsV0FBVztBQUFBLEVBQ1gsVUFBVTtBQUFBLEVBQ1YsV0FBVztBQUFBLEVBQ1gsYUFBYTtBQUFBLEVBQ2IsZ0JBQWdCO0FBQUEsRUFDaEIsWUFBWTtBQUFBLEVBQ1osWUFBWTtBQUFBLEVBQ1osU0FBUztBQUFBLEVBQ1QsWUFBWTtBQUFBLEVBQ1osY0FBYztBQUFBLEVBQ2QsZUFBZTtBQUFBLEVBQ2YsZUFBZTtBQUFBLEVBQ2YsZUFBZTtBQUFBLEVBQ2YsZUFBZTtBQUFBLEVBQ2YsWUFBWTtBQUFBLEVBQ1osVUFBVTtBQUFBLEVBQ1YsYUFBYTtBQUFBLEVBQ2IsU0FBUztBQUFBLEVBQ1QsU0FBUztBQUFBLEVBQ1QsWUFBWTtBQUFBLEVBQ1osV0FBVztBQUFBLEVBQ1gsYUFBYTtBQUFBLEVBQ2IsYUFBYTtBQUFBLEVBQ2IsU0FBUztBQUFBLEVBQ1QsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUFBLEVBQ1osTUFBTTtBQUFBLEVBQ04sV0FBVztBQUFBLEVBQ1gsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sVUFBVTtBQUFBLEVBQ1YsU0FBUztBQUFBLEVBQ1QsV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUFBLEVBQ1IsT0FBTztBQUFBLEVBQ1AsT0FBTztBQUFBLEVBQ1AsVUFBVTtBQUFBLEVBQ1YsZUFBZTtBQUFBLEVBQ2YsV0FBVztBQUFBLEVBQ1gsY0FBYztBQUFBLEVBQ2QsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUFBLEVBQ1osV0FBVztBQUFBLEVBQ1gsc0JBQXNCO0FBQUEsRUFDdEIsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUFBLEVBQ1osV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsYUFBYTtBQUFBLEVBQ2IsZUFBZTtBQUFBLEVBQ2YsY0FBYztBQUFBLEVBQ2QsZ0JBQWdCO0FBQUEsRUFDaEIsZ0JBQWdCO0FBQUEsRUFDaEIsZ0JBQWdCO0FBQUEsRUFDaEIsYUFBYTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sV0FBVztBQUFBLEVBQ1gsT0FBTztBQUFBLEVBQ1AsU0FBUztBQUFBLEVBQ1QsUUFBUTtBQUFBLEVBQ1Isa0JBQWtCO0FBQUEsRUFDbEIsWUFBWTtBQUFBLEVBQ1osY0FBYztBQUFBLEVBQ2QsY0FBYztBQUFBLEVBQ2QsZ0JBQWdCO0FBQUEsRUFDaEIsaUJBQWlCO0FBQUEsRUFDakIsbUJBQW1CO0FBQUEsRUFDbkIsaUJBQWlCO0FBQUEsRUFDakIsaUJBQWlCO0FBQUEsRUFDakIsY0FBYztBQUFBLEVBQ2QsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsVUFBVTtBQUFBLEVBQ1YsYUFBYTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLEVBQ1QsT0FBTztBQUFBLEVBQ1AsV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUFBLEVBQ1IsV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUFBLEVBQ1IsZUFBZTtBQUFBLEVBQ2YsV0FBVztBQUFBLEVBQ1gsZUFBZTtBQUFBLEVBQ2YsZUFBZTtBQUFBLEVBQ2YsWUFBWTtBQUFBLEVBQ1osV0FBVztBQUFBLEVBQ1gsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sWUFBWTtBQUFBLEVBQ1osUUFBUTtBQUFBLEVBQ1IsZUFBZTtBQUFBLEVBQ2YsS0FBSztBQUFBLEVBQ0wsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsYUFBYTtBQUFBLEVBQ2IsUUFBUTtBQUFBLEVBQ1IsWUFBWTtBQUFBLEVBQ1osVUFBVTtBQUFBLEVBQ1YsVUFBVTtBQUFBLEVBQ1YsUUFBUTtBQUFBLEVBQ1IsUUFBUTtBQUFBLEVBQ1IsU0FBUztBQUFBLEVBQ1QsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsTUFBTTtBQUFBLEVBQ04sYUFBYTtBQUFBLEVBQ2IsV0FBVztBQUFBLEVBQ1gsS0FBSztBQUFBLEVBQ0wsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLEVBQ1QsUUFBUTtB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
