"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_link2 = common_vendor.resolveComponent("uni-link");
  _easycom_uni_link2();
}
const _easycom_uni_link = () => "../../uni_modules/uni-link/components/uni-link/uni-link.js";
if (!Math) {
  _easycom_uni_link();
}
const _sfc_main = {
  __name: "item",
  setup(__props) {
    function a() {
      common_vendor.index.navigateTo({
        url: "https://blog.csdn.net/m0_57301042?type=blog"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          href: "http://8.129.161.191",
          text: "http://8.129.161.191",
          color: "#007BFF"
        }),
        b: common_vendor.p({
          text: "https://blog.csdn.net/m0_57301042?type=blog",
          color: "#007BFF"
        }),
        c: common_vendor.o(a)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/item/item.js.map
