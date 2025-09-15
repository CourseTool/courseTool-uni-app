"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const uilts_axios = require("../../uilts/axios.js");
if (!Array) {
  const _easycom_custom_tabbar2 = common_vendor.resolveComponent("custom-tabbar");
  _easycom_custom_tabbar2();
}
const _easycom_custom_tabbar = () => "../../components/custom-tabbar/custom-tabbar.js";
if (!Math) {
  _easycom_custom_tabbar();
}
const _sfc_main = {
  __name: "more-fn",
  setup(__props) {
    const navList = common_vendor.ref([]);
    const emptyNum = common_vendor.ref();
    const showAdvertisement = common_vendor.ref(false);
    function gotoPage(path) {
      common_vendor.index.navigateTo({
        url: `/pages/${path}/${path}`
      });
    }
    common_vendor.onShow(async () => {
      const hiddenNavList = common_vendor.index.getStorageSync("home-nav-list") || [];
      navList.value = hiddenNavList.filter((d) => !d.isShow);
      emptyNum.value = 15;
      emptyNum.value -= navList.value.length - 1;
      const res = await uilts_axios.request.get("/common/advertisement");
      showAdvertisement.value = res.data.data;
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$4,
        b: common_vendor.o(($event) => gotoPage("map")),
        c: common_assets._imports_1,
        d: common_vendor.o(($event) => gotoPage("message")),
        e: common_assets._imports_2,
        f: common_vendor.o(($event) => gotoPage("item")),
        g: common_assets._imports_3,
        h: common_vendor.o(($event) => gotoPage("calendar-classroom-course")),
        i: common_assets._imports_4,
        j: common_vendor.o(($event) => gotoPage("electives")),
        k: common_assets._imports_4,
        l: common_vendor.o(($event) => gotoPage("empty-classroom")),
        m: common_assets._imports_2,
        n: common_vendor.o(($event) => gotoPage("ecard")),
        o: common_vendor.f(navList.value, (d, k0, i0) => {
          return {
            a: d.img,
            b: common_vendor.t(d.title),
            c: common_vendor.o(($event) => gotoPage(d.target))
          };
        }),
        p: common_vendor.f(emptyNum.value, (v0, k0, i0) => {
          return {};
        }),
        q: common_vendor.p({
          selected: 2
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/more-fn/more-fn.js.map
