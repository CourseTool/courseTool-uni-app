"use strict";
const debounce = (fn, delay) => {
  let timer = null;
  return () => {
    if (timer)
      clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
};
exports.debounce = debounce;
//# sourceMappingURL=../../.sourcemap/mp-weixin/uilts/debounce.js.map
