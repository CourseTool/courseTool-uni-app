"use strict";
const common_vendor = require("../../common/vendor.js");
const API_ecard = require("../../API/ecard.js");
const _sfc_main = {
  __name: "ecard",
  setup(__props) {
    const dormId = common_vendor.ref("");
    const result = common_vendor.ref("");
    const payTypeMap = {
      1: "现金",
      2: "预付费",
      3: "校园卡"
    };
    async function getElectric() {
      var _a;
      common_vendor.index.showLoading({
        title: "查询中...",
        mask: true
      });
      if (!dormId.value) {
        common_vendor.index.showToast({ title: "请输入宿舍号", icon: "none" });
        return;
      }
      try {
        const res = await API_ecard.getElectricAPI(dormId.value);
        if (res.data.data.Code !== "-1") {
          result.value = res.data.data;
        } else {
          common_vendor.index.showToast({ title: ((_a = res.data) == null ? void 0 : _a.Msg) || "查询失败,请检查宿舍号是否正确", icon: "error" });
        }
      } catch (err) {
        common_vendor.index.showToast({ title: "接口请求失败", icon: "none" });
      }
      common_vendor.index.hideLoading();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: dormId.value,
        b: common_vendor.o(($event) => dormId.value = $event.detail.value),
        c: common_vendor.o(getElectric),
        d: result.value
      }, result.value ? {
        e: common_vendor.t(result.value.UserCode),
        f: common_vendor.t(result.value.Reserve),
        g: common_vendor.t(payTypeMap[result.value.PayType]),
        h: common_vendor.t(result.value.ReadTime)
      } : {});
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/ecard/ecard.js.map
