"use strict";
const uni_modules_wuUiTools_libs_function_color_color = require("./color.js");
function convertFormat(color = "#fff", format = "rgb", type = "string") {
  let colorObj = uni_modules_wuUiTools_libs_function_color_color.Color(color);
  if (colorObj[format]) {
    if (format == "hex" && type != "string")
      format = "rgb";
    let typeName = "";
    switch (type) {
      case "string":
        typeName = "toString";
        break;
      case "object":
        typeName = "object";
        break;
      case "array":
        typeName = "array";
        break;
      case "round":
        typeName = "round";
        break;
      default:
        throw Error("Unsupported target type:" + type);
    }
    return colorObj[format]()[typeName]();
  } else {
    throw Error("Unsupported target format: " + format);
  }
}
function gradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
  const startRGB = convertFormat(startColor, "rgb", "array");
  const startR = startRGB[0];
  const startG = startRGB[1];
  const startB = startRGB[2];
  const endRGB = convertFormat(endColor, "rgb", "array");
  const endR = endRGB[0];
  const endG = endRGB[1];
  const endB = endRGB[2];
  const sR = (endR - startR) / step;
  const sG = (endG - startG) / step;
  const sB = (endB - startB) / step;
  const colorArr = [];
  for (let i = 0; i < step; i++) {
    let hex = convertFormat(`rgb(${Math.round(sR * i + startR)},${Math.round(sG * i + startG)},${Math.round(sB * i + startB)})`, "hex");
    if (i === 0)
      hex = convertFormat(startColor, "hex");
    if (i === step - 1)
      hex = convertFormat(endColor, "hex");
    colorArr.push(hex);
  }
  return colorArr;
}
const index = {
  /**
   * 格式转换。
   */
  convertFormat,
  /**
   * 计算两个颜色之间的渐变值。
   */
  gradient,
  /**
   * 增加颜色的亮度。
   * @param {string} color - 输入的颜色。
   * @param {number} value - 增加的亮度值（0-1）。
   * @returns {string} 调整后的颜色。
   */
  lighten: (color, value, format = "rgb", type = "string") => convertFormat(uni_modules_wuUiTools_libs_function_color_color.Color(color).lighten(value), format, type),
  /**
   * 减少颜色的亮度。
   * @param {string} color - 输入的颜色。
   * @param {number} value - 减少的亮度值（0-1）。
   * @returns {string} 调整后的颜色。
   */
  darken: (color, value, format = "rgb", type = "string") => convertFormat(uni_modules_wuUiTools_libs_function_color_color.Color(color).darken(value), format, type),
  /**
   * 增加颜色的饱和度。
   * @param {string} color - 输入的颜色。
   * @param {number} value - 增加的饱和度值（0-1）。
   * @returns {string} 调整后的颜色。
   */
  saturate: (color, value, format = "rgb", type = "string") => convertFormat(uni_modules_wuUiTools_libs_function_color_color.Color(color).saturate(value), format, type),
  /**
   * 减少颜色的饱和度。
   * @param {string} color - 输入的颜色。
   * @param {number} value - 减少的饱和度值（0-1）。
   * @returns {string} 调整后的颜色。
   */
  desaturate: (color, value, format = "rgb", type = "string") => convertFormat(uni_modules_wuUiTools_libs_function_color_color.Color(color).desaturate(value), format, type),
  /**
   * 旋转颜色的色相。
   * @param {string} color - 输入的颜色。
   * @param {number} degrees - 旋转的度数。
   * @returns {string} 调整后的颜色。
   */
  rotate: (color, degrees, format = "rgb", type = "string") => convertFormat(uni_modules_wuUiTools_libs_function_color_color.Color(color).rotate(degrees), format, type),
  /**
   * 调整颜色的透明度。
   * @param {string} color - 输入的颜色。
   * @param {number} value - 透明度值（0-1，其中 1 是不透明）。
   * @returns {string} 调整后的颜色。
   */
  adjustAlpha: (color, value, format = "rgb", type = "string") => convertFormat(uni_modules_wuUiTools_libs_function_color_color.Color(color).alpha(value), format, type),
  /**
   * 获取颜色的亮度。
   * @param {string} color - 输入的颜色。
   * @returns {number} 颜色的亮度值（0-1）。
   */
  luminosity: (color, format) => uni_modules_wuUiTools_libs_function_color_color.Color(color).luminosity(),
  /**
   * 判断颜色是否为暗色。
   * @param {string} color - 输入的颜色。
   * @returns {boolean} 如果是暗色则返回 true，否则返回 false。
   */
  isDark: (color, format) => uni_modules_wuUiTools_libs_function_color_color.Color(color).isDark(),
  /**
   * 判断颜色是否为亮色。
   * @param {string} color - 输入的颜色。
   * @returns {boolean} 如果是亮色则返回 true，否则返回 false。
   */
  isLight: (color, format) => uni_modules_wuUiTools_libs_function_color_color.Color(color).isLight()
};
exports.index = index;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/uni_modules/wu-ui-tools/libs/function/color/index.js.map
