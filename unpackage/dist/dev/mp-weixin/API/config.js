"use strict";
const uilts_axios = require("../uilts/axios.js");
const getCourseConfigAPISync = async () => {
  const res = await uilts_axios.request.get("/common/config");
  return res.data.data;
};
exports.getCourseConfigAPISync = getCourseConfigAPISync;
//# sourceMappingURL=../../.sourcemap/mp-weixin/API/config.js.map
