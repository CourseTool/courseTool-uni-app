"use strict";
const uni_modules_wuUiTools_libs_function_color_colorString_index = require("./color-string/index.js");
const uni_modules_wuUiTools_libs_function_color_colorConvert_index = require("./color-convert/index.js");
const skippedModels = [
  // To be honest, I don't really feel like keyword belongs in color convert, but eh.
  "keyword",
  // Gray conflicts with some method names, and has its own method defined.
  "gray",
  // Shouldn't really be in color-convert either...
  "hex"
];
const hashedModelKeys = {};
for (const model of Object.keys(uni_modules_wuUiTools_libs_function_color_colorConvert_index.convert)) {
  hashedModelKeys[[...uni_modules_wuUiTools_libs_function_color_colorConvert_index.convert[model].labels].sort().join("")] = model;
}
const limiters = {};
function Color(object, model) {
  if (!(this instanceof Color)) {
    return new Color(object, model);
  }
  if (model && model in skippedModels) {
    model = null;
  }
  if (model && !(model in uni_modules_wuUiTools_libs_function_color_colorConvert_index.convert)) {
    throw new Error("Unknown model: " + model);
  }
  let i;
  let channels;
  if (object == null) {
    this.model = "rgb";
    this.color = [0, 0, 0];
    this.valpha = 1;
  } else if (object instanceof Color) {
    this.model = object.model;
    this.color = [...object.color];
    this.valpha = object.valpha;
  } else if (typeof object === "string") {
    const result = uni_modules_wuUiTools_libs_function_color_colorString_index.cs.get(object);
    if (result === null) {
      throw new Error("Unable to parse color from string: " + object);
    }
    this.model = result.model;
    channels = uni_modules_wuUiTools_libs_function_color_colorConvert_index.convert[this.model].channels;
    this.color = result.value.slice(0, channels);
    this.valpha = typeof result.value[channels] === "number" ? result.value[channels] : 1;
  } else if (object.length > 0) {
    this.model = model || "rgb";
    channels = uni_modules_wuUiTools_libs_function_color_colorConvert_index.convert[this.model].channels;
    const newArray = Array.prototype.slice.call(object, 0, channels);
    this.color = zeroArray(newArray, channels);
    this.valpha = typeof object[channels] === "number" ? object[channels] : 1;
  } else if (typeof object === "number") {
    this.model = "rgb";
    this.color = [
      object >> 16 & 255,
      object >> 8 & 255,
      object & 255
    ];
    this.valpha = 1;
  } else {
    this.valpha = 1;
    const keys = Object.keys(object);
    if ("alpha" in object) {
      keys.splice(keys.indexOf("alpha"), 1);
      this.valpha = typeof object.alpha === "number" ? object.alpha : 0;
    }
    const hashedKeys = keys.sort().join("");
    if (!(hashedKeys in hashedModelKeys)) {
      throw new Error("Unable to parse color from object: " + JSON.stringify(object));
    }
    this.model = hashedModelKeys[hashedKeys];
    const { labels } = uni_modules_wuUiTools_libs_function_color_colorConvert_index.convert[this.model];
    const color = [];
    for (i = 0; i < labels.length; i++) {
      color.push(object[labels[i]]);
    }
    this.color = zeroArray(color);
  }
  if (limiters[this.model]) {
    channels = uni_modules_wuUiTools_libs_function_color_colorConvert_index.convert[this.model].channels;
    for (i = 0; i < channels; i++) {
      const limit = limiters[this.model][i];
      if (limit) {
        this.color[i] = limit(this.color[i]);
      }
    }
  }
  this.valpha = Math.max(0, Math.min(1, this.valpha));
  if (Object.freeze) {
    Object.freeze(this);
  }
}
Color.prototype = {
  toString() {
    return this.string();
  },
  toJSON() {
    return this[this.model]();
  },
  string(places) {
    let self = this.model in uni_modules_wuUiTools_libs_function_color_colorString_index.cs.to ? this : this.rgb();
    self = self.round(typeof places === "number" ? places : 1);
    const args = self.valpha === 1 ? self.color : [...self.color, this.valpha];
    return uni_modules_wuUiTools_libs_function_color_colorString_index.cs.to[self.model](args);
  },
  percentString(places) {
    const self = this.rgb().round(typeof places === "number" ? places : 1);
    const args = self.valpha === 1 ? self.color : [...self.color, this.valpha];
    return uni_modules_wuUiTools_libs_function_color_colorString_index.cs.to.rgb.percent(args);
  },
  array() {
    return this.valpha === 1 ? [...this.color] : [...this.color, this.valpha];
  },
  object() {
    const result = {};
    const { channels } = uni_modules_wuUiTools_libs_function_color_colorConvert_index.convert[this.model];
    const { labels } = uni_modules_wuUiTools_libs_function_color_colorConvert_index.convert[this.model];
    for (let i = 0; i < channels; i++) {
      result[labels[i]] = this.color[i];
    }
    if (this.valpha !== 1) {
      result.alpha = this.valpha;
    }
    return result;
  },
  unitArray() {
    const rgb = this.rgb().color;
    rgb[0] /= 255;
    rgb[1] /= 255;
    rgb[2] /= 255;
    if (this.valpha !== 1) {
      rgb.push(this.valpha);
    }
    return rgb;
  },
  unitObject() {
    const rgb = this.rgb().object();
    rgb.r /= 255;
    rgb.g /= 255;
    rgb.b /= 255;
    if (this.valpha !== 1) {
      rgb.alpha = this.valpha;
    }
    return rgb;
  },
  round(places) {
    places = Math.max(places || 0, 0);
    return new Color([...this.color.map(roundToPlace(places)), this.valpha], this.model);
  },
  alpha(value) {
    if (value !== void 0) {
      return new Color([...this.color, Math.max(0, Math.min(1, value))], this.model);
    }
    return this.valpha;
  },
  // Rgb
  red: getset("rgb", 0, maxfn(255)),
  green: getset("rgb", 1, maxfn(255)),
  blue: getset("rgb", 2, maxfn(255)),
  hue: getset(["hsl", "hsv", "hsl", "hwb", "hcg"], 0, (value) => (value % 360 + 360) % 360),
  saturationl: getset("hsl", 1, maxfn(100)),
  lightness: getset("hsl", 2, maxfn(100)),
  saturationv: getset("hsv", 1, maxfn(100)),
  value: getset("hsv", 2, maxfn(100)),
  chroma: getset("hcg", 1, maxfn(100)),
  gray: getset("hcg", 2, maxfn(100)),
  white: getset("hwb", 1, maxfn(100)),
  wblack: getset("hwb", 2, maxfn(100)),
  cyan: getset("cmyk", 0, maxfn(100)),
  magenta: getset("cmyk", 1, maxfn(100)),
  yellow: getset("cmyk", 2, maxfn(100)),
  black: getset("cmyk", 3, maxfn(100)),
  x: getset("xyz", 0, maxfn(95.047)),
  y: getset("xyz", 1, maxfn(100)),
  z: getset("xyz", 2, maxfn(108.833)),
  l: getset("lab", 0, maxfn(100)),
  a: getset("lab", 1),
  b: getset("lab", 2),
  keyword(value) {
    if (value !== void 0) {
      return new Color(value);
    }
    return uni_modules_wuUiTools_libs_function_color_colorConvert_index.convert[this.model].keyword(this.color);
  },
  hex(value) {
    if (value !== void 0) {
      return new Color(value);
    }
    return uni_modules_wuUiTools_libs_function_color_colorString_index.cs.to.hex(this.rgb().round().color);
  },
  hexa(value) {
    if (value !== void 0) {
      return new Color(value);
    }
    const rgbArray = this.rgb().round().color;
    let alphaHex = Math.round(this.valpha * 255).toString(16).toUpperCase();
    if (alphaHex.length === 1) {
      alphaHex = "0" + alphaHex;
    }
    return uni_modules_wuUiTools_libs_function_color_colorString_index.cs.to.hex(rgbArray) + alphaHex;
  },
  rgbNumber() {
    const rgb = this.rgb().color;
    return (rgb[0] & 255) << 16 | (rgb[1] & 255) << 8 | rgb[2] & 255;
  },
  luminosity() {
    const rgb = this.rgb().color;
    const lum = [];
    for (const [i, element] of rgb.entries()) {
      const chan = element / 255;
      lum[i] = chan <= 0.04045 ? chan / 12.92 : ((chan + 0.055) / 1.055) ** 2.4;
    }
    return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
  },
  contrast(color2) {
    const lum1 = this.luminosity();
    const lum2 = color2.luminosity();
    if (lum1 > lum2) {
      return (lum1 + 0.05) / (lum2 + 0.05);
    }
    return (lum2 + 0.05) / (lum1 + 0.05);
  },
  level(color2) {
    const contrastRatio = this.contrast(color2);
    if (contrastRatio >= 7) {
      return "AAA";
    }
    return contrastRatio >= 4.5 ? "AA" : "";
  },
  isDark() {
    const rgb = this.rgb().color;
    const yiq = (rgb[0] * 2126 + rgb[1] * 7152 + rgb[2] * 722) / 1e4;
    return yiq < 128;
  },
  isLight() {
    return !this.isDark();
  },
  negate() {
    const rgb = this.rgb();
    for (let i = 0; i < 3; i++) {
      rgb.color[i] = 255 - rgb.color[i];
    }
    return rgb;
  },
  lighten(ratio) {
    const hsl = this.hsl();
    hsl.color[2] += hsl.color[2] * ratio;
    return hsl;
  },
  darken(ratio) {
    const hsl = this.hsl();
    hsl.color[2] -= hsl.color[2] * ratio;
    return hsl;
  },
  saturate(ratio) {
    const hsl = this.hsl();
    hsl.color[1] += hsl.color[1] * ratio;
    return hsl;
  },
  desaturate(ratio) {
    const hsl = this.hsl();
    hsl.color[1] -= hsl.color[1] * ratio;
    return hsl;
  },
  whiten(ratio) {
    const hwb = this.hwb();
    hwb.color[1] += hwb.color[1] * ratio;
    return hwb;
  },
  blacken(ratio) {
    const hwb = this.hwb();
    hwb.color[2] += hwb.color[2] * ratio;
    return hwb;
  },
  grayscale() {
    const rgb = this.rgb().color;
    const value = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
    return Color.rgb(value, value, value);
  },
  fade(ratio) {
    return this.alpha(this.valpha - this.valpha * ratio);
  },
  opaquer(ratio) {
    return this.alpha(this.valpha + this.valpha * ratio);
  },
  rotate(degrees) {
    const hsl = this.hsl();
    let hue = hsl.color[0];
    hue = (hue + degrees) % 360;
    hue = hue < 0 ? 360 + hue : hue;
    hsl.color[0] = hue;
    return hsl;
  },
  mix(mixinColor, weight) {
    if (!mixinColor || !mixinColor.rgb) {
      throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
    }
    const color1 = mixinColor.rgb();
    const color2 = this.rgb();
    const p = weight === void 0 ? 0.5 : weight;
    const w = 2 * p - 1;
    const a = color1.alpha() - color2.alpha();
    const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
    const w2 = 1 - w1;
    return Color.rgb(
      w1 * color1.red() + w2 * color2.red(),
      w1 * color1.green() + w2 * color2.green(),
      w1 * color1.blue() + w2 * color2.blue(),
      color1.alpha() * p + color2.alpha() * (1 - p)
    );
  }
};
for (const model of Object.keys(uni_modules_wuUiTools_libs_function_color_colorConvert_index.convert)) {
  if (skippedModels.includes(model)) {
    continue;
  }
  const { channels } = uni_modules_wuUiTools_libs_function_color_colorConvert_index.convert[model];
  Color.prototype[model] = function(...args) {
    if (this.model === model) {
      return new Color(this);
    }
    if (args.length > 0) {
      return new Color(args, model);
    }
    return new Color([...assertArray(uni_modules_wuUiTools_libs_function_color_colorConvert_index.convert[this.model][model].raw(this.color)), this.valpha], model);
  };
  Color[model] = function(...args) {
    let color = args[0];
    if (typeof color === "number") {
      color = zeroArray(args, channels);
    }
    return new Color(color, model);
  };
}
function roundTo(number, places) {
  return Number(number.toFixed(places));
}
function roundToPlace(places) {
  return function(number) {
    return roundTo(number, places);
  };
}
function getset(model, channel, modifier) {
  model = Array.isArray(model) ? model : [model];
  for (const m of model) {
    (limiters[m] || (limiters[m] = []))[channel] = modifier;
  }
  model = model[0];
  return function(value) {
    let result;
    if (value !== void 0) {
      if (modifier) {
        value = modifier(value);
      }
      result = this[model]();
      result.color[channel] = value;
      return result;
    }
    result = this[model]().color[channel];
    if (modifier) {
      result = modifier(result);
    }
    return result;
  };
}
function maxfn(max) {
  return function(v) {
    return Math.max(0, Math.min(max, v));
  };
}
function assertArray(value) {
  return Array.isArray(value) ? value : [value];
}
function zeroArray(array, length) {
  for (let i = 0; i < length; i++) {
    if (typeof array[i] !== "number") {
      array[i] = 0;
    }
  }
  return array;
}
exports.Color = Color;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/wu-ui-tools/libs/function/color/color.js.map
