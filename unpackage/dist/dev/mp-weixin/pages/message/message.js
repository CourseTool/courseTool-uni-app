"use strict";
const common_vendor = require("../../common/vendor.js");
const API_course = require("../../API/course.js");
const _sfc_main = {
  __name: "message",
  setup(__props) {
    const message = common_vendor.ref("");
    async function getMessage() {
      const {
        data
      } = await API_course.getMeessageAPI();
      message.value = data.data;
    }
    common_vendor.onMounted(() => {
      getMessage();
    });
    return (_ctx, _cache) => {
      return {
        a: message.value
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/message/message.js.map
