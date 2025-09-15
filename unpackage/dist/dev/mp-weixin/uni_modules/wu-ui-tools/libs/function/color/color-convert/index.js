"use strict";
const uni_modules_wuUiTools_libs_function_color_colorConvert_route = require("./route.js");
const uni_modules_wuUiTools_libs_function_color_colorConvert_conversions = require("./conversions.js");
const convert = {};
const models = Object.keys(uni_modules_wuUiTools_libs_function_color_colorConvert_conversions.convert);
function wrapRaw(fn) {
  const wrappedFn = function(...args) {
    const arg0 = args[0];
    if (arg0 === void 0 || arg0 === null) {
      return arg0;
    }
    if (arg0.length > 1) {
      args = arg0;
    }
    return fn(args);
  };
  if ("conversion" in fn) {
    wrappedFn.conversion = fn.conversion;
  }
  return wrappedFn;
}
function wrapRounded(fn) {
  const wrappedFn = function(...args) {
    const arg0 = args[0];
    if (arg0 === void 0 || arg0 === null) {
      return arg0;
    }
    if (arg0.length > 1) {
      args = arg0;
    }
    const result = fn(args);
    if (typeof result === "object") {
      for (let len = result.length, i = 0; i < len; i++) {
        result[i] = Math.round(result[i]);
      }
    }
    return result;
  };
  if ("conversion" in fn) {
    wrappedFn.conversion = fn.conversion;
  }
  return wrappedFn;
}
models.forEach((fromModel) => {
  convert[fromModel] = {};
  Object.defineProperty(convert[fromModel], "channels", { value: uni_modules_wuUiTools_libs_function_color_colorConvert_conversions.convert[fromModel].channels });
  Object.defineProperty(convert[fromModel], "labels", { value: uni_modules_wuUiTools_libs_function_color_colorConvert_conversions.convert[fromModel].labels });
  const routes = uni_modules_wuUiTools_libs_function_color_colorConvert_route.route(fromModel);
  const routeModels = Object.keys(routes);
  routeModels.forEach((toModel) => {
    const fn = routes[toModel];
    convert[fromModel][toModel] = wrapRounded(fn);
    convert[fromModel][toModel].raw = wrapRaw(fn);
  });
});
exports.convert = convert;
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/uni_modules/wu-ui-tools/libs/function/color/color-convert/index.js.map
