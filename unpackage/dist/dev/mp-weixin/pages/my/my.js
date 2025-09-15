"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_select_class2 = common_vendor.resolveComponent("select-class");
  const _easycom_custom_tabbar2 = common_vendor.resolveComponent("custom-tabbar");
  (_easycom_uni_icons2 + _easycom_select_class2 + _easycom_custom_tabbar2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_select_class = () => "../../components/select-class/select-class.js";
const _easycom_custom_tabbar = () => "../../components/custom-tabbar/custom-tabbar.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_select_class + _easycom_custom_tabbar)();
}
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const isShowSelectVal = common_vendor.ref(false);
    const selectTypeList = ["暂未选择", "学生", "教师"];
    const activeTypeIndex = common_vendor.ref(0);
    const activeType = common_vendor.ref();
    const activeVal = common_vendor.ref();
    function gotoEvaluate() {
      common_vendor.index.navigateTo({
        url: "/pages/evaluate/evaluate"
      });
    }
    function gotoCustom() {
      common_vendor.index.navigateTo({
        url: "/pages/custom/custom"
      });
    }
    function changeActiveType(e) {
      activeTypeIndex.value = e.detail.value;
      activeType.value = selectTypeList[activeTypeIndex.value] === "教师" ? "teacher" : "student";
      common_vendor.index.clearStorageSync("cacheCourse");
      common_vendor.index.setStorageSync("home-active-type", activeType.value);
      if (activeType.value === "teacher") {
        activeVal.value = "吴宇飞";
        common_vendor.index.setStorageSync("home-active-val", "吴宇飞");
      } else {
        activeVal.value = "软件2303班";
        common_vendor.index.setStorageSync("home-active-val", "软件2303班");
      }
    }
    function selectVal() {
      if (activeType.value === "暂未选择") {
        common_vendor.index.showToast({
          title: "请先选择角色!",
          icon: "error"
        });
        return;
      }
      isShowSelectVal.value = true;
    }
    function hiddenSelectVal(val) {
      isShowSelectVal.value = false;
      activeVal.value = val;
      common_vendor.index.showToast({
        title: "设置成功!",
        icon: "success"
      });
      common_vendor.index.clearStorageSync("cacheCourse");
      common_vendor.index.setStorageSync("home-active-type", activeType.value);
      common_vendor.index.setStorageSync("home-active-val", val);
    }
    common_vendor.onShow(() => {
      activeType.value = common_vendor.index.getStorageSync("home-active-type");
      if (!activeType.value) {
        activeType.value = "暂未选择";
        activeTypeIndex.value = selectTypeList.indexOf(activeType.value);
        activeVal.value = common_vendor.index.getStorageSync("home-active-val") || "暂未选择";
        return;
      }
      const searchVal = activeType.value === "teacher" ? "教师" : "学生";
      activeTypeIndex.value = selectTypeList.indexOf(searchVal);
      activeVal.value = common_vendor.index.getStorageSync("home-active-val") || "暂未选择";
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.t(activeType.value === "teacher" ? "教师" : "学生"),
        c: common_vendor.t(activeVal.value),
        d: common_vendor.p({
          type: "contact",
          size: "30"
        }),
        e: common_vendor.t(selectTypeList[activeTypeIndex.value]),
        f: common_vendor.o(changeActiveType),
        g: activeTypeIndex.value,
        h: selectTypeList,
        i: common_vendor.p({
          type: "search",
          size: "30"
        }),
        j: common_vendor.t(activeType.value === "teacher" ? "显示教师" : "显示班级"),
        k: common_vendor.t(activeVal.value),
        l: common_vendor.o(selectVal),
        m: common_vendor.p({
          type: "star-filled",
          size: "30"
        }),
        n: common_vendor.o(gotoEvaluate),
        o: common_vendor.p({
          type: "star-filled",
          size: "30"
        }),
        p: common_vendor.o(gotoCustom),
        q: isShowSelectVal.value
      }, isShowSelectVal.value ? {
        r: common_vendor.o(hiddenSelectVal),
        s: common_vendor.p({
          type: activeType.value
        })
      } : {}, {
        t: common_vendor.p({
          selected: 4
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/my.js.map
