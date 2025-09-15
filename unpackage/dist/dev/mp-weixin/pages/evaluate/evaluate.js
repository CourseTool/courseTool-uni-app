"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "evaluate",
  setup(__props) {
    var plugin = requirePlugin("wxacommentplugin");
    plugin.openComment({
      // wx_pay_id: '4200001729202306024807578', // 交易评价类账号选填
      success: (res) => {
        common_vendor.index.__f__("log", "at pages/evaluate/evaluate.vue:27", "plugin.openComment success", res);
      },
      fail: (res) => {
        common_vendor.index.__f__("log", "at pages/evaluate/evaluate.vue:30", "plugin.openComment fail", res);
      }
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/evaluate/evaluate.js.map
