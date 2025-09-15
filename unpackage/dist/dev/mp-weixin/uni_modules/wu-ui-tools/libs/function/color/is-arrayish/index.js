"use strict";
function isArrayish(obj) {
  if (!obj || typeof obj === "string") {
    return false;
  }
  return obj instanceof Array || Array.isArray(obj) || obj.length >= 0 && (obj.splice instanceof Function || Object.getOwnPropertyDescriptor(obj, obj.length - 1) && obj.constructor.name !== "String");
}
exports.isArrayish = isArrayish;
//# sourceMappingURL=../../../../../../../.sourcemap/mp-weixin/uni_modules/wu-ui-tools/libs/function/color/is-arrayish/index.js.map
