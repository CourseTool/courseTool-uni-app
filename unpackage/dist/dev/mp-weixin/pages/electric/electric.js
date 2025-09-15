"use strict";
const common_vendor = require("../../common/vendor.js");
const API_electric = require("../../API/electric.js");
const _sfc_main = {
  __name: "electric",
  setup(__props) {
    const userCode = common_vendor.ref("10-438");
    async function getElectric() {
      const data = {
        UserCode: userCode.value,
        Time: "20240624082634",
        Sign: "a06d3e79025f47a9a4b037173cd4594f"
      };
      const res = await API_electric.getElectricAPI(data);
      common_vendor.index.__f__("log", "at pages/electric/electric.vue:30", res.data);
    }
    return (_ctx, _cache) => {
      return {
        a: userCode.value,
        b: common_vendor.o(($event) => userCode.value = $event.detail.value),
        c: common_vendor.o(getElectric)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/electric/electric.js.map
