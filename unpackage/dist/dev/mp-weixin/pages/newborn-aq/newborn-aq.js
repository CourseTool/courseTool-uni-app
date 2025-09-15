"use strict";
const common_vendor = require("../../common/vendor.js");
const API_course = require("../../API/course.js");
if (!Array) {
  const _easycom_custom_tabbar2 = common_vendor.resolveComponent("custom-tabbar");
  _easycom_custom_tabbar2();
}
const _easycom_custom_tabbar = () => "../../components/custom-tabbar/custom-tabbar.js";
if (!Math) {
  _easycom_custom_tabbar();
}
const _sfc_main = {
  __name: "newborn-aq",
  setup(__props) {
    const newbornAqList = common_vendor.ref([]);
    common_vendor.onMounted(async () => {
      const res = await API_course.getNewbornAqListAPI();
      newbornAqList.value = res.data.data;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(newbornAqList.value, (d, i, i0) => {
          return {
            a: common_vendor.t(i + 1),
            b: common_vendor.t(d.title),
            c: common_vendor.t(d.content)
          };
        }),
        b: common_vendor.f(newbornAqList.value, (d, i, i0) => {
          return {};
        }),
        c: common_vendor.p({
          selected: 3
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/newborn-aq/newborn-aq.js.map
