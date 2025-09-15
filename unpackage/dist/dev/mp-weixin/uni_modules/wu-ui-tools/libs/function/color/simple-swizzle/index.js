"use strict";
const uni_modules_wuUiTools_libs_function_color_isArrayish_index = require("../is-arrayish/index.js");
var concat = Array.prototype.concat;
var slice = Array.prototype.slice;
function swizzle(args) {
  var results = [];
  for (var i = 0, len = args.length; i < len; i++) {
    var arg = args[i];
    if (uni_modules_wuUiTools_libs_function_color_isArrayish_index.isArrayish(arg)) {
      results = concat.call(results, slice.call(arg));
    } else {
      results.push(arg);
    }
  }
  return results;
}
swizzle.wrap = function(fn) {
  return function() {
    return fn(swizzle(arguments));
  };
};
exports.swizzle = swizzle;
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/uni_modules/wu-ui-tools/libs/function/color/simple-swizzle/index.js.map
