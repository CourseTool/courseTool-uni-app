"use strict";
const uilts_axios = require("../uilts/axios.js");
async function getElectricAPI(dormId) {
  return await uilts_axios.request.get("/ecard/electric?dormId=" + dormId);
}
exports.getElectricAPI = getElectricAPI;
//# sourceMappingURL=../../.sourcemap/mp-weixin/API/ecard.js.map
