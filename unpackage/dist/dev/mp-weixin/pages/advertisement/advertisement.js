"use strict";
const common_vendor = require("../../common/vendor.js");
const API_course = require("../../API/course.js");
const _sfc_main = {
  __name: "advertisement",
  setup(__props) {
    const url = common_vendor.ref("");
    function copy() {
      common_vendor.index.setClipboardData({
        data: "16620481556",
        success: function() {
          common_vendor.index.showToast({
            title: "复制成功",
            icon: "success"
          });
        }
      });
    }
    common_vendor.onMounted(async () => {
      const res = await API_course.getAdvAPI();
      url.value = res.data.data;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(copy),
        b: url.value
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/advertisement/advertisement.js.map
