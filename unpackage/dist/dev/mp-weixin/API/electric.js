"use strict";
const uilts_axios = require("../uilts/axios.js");
function getElectricAPI(data) {
  return uilts_axios.request.post("https://ecard.hniu.cn:9029/GetUserInfoXT.aspx", data);
}
exports.getElectricAPI = getElectricAPI;
//# sourceMappingURL=../../.sourcemap/mp-weixin/API/electric.js.map
