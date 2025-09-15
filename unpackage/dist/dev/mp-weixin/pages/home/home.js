"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const uilts_time = require("../../uilts/time.js");
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_home_course2 = common_vendor.resolveComponent("home-course");
  const _easycom_custom_tabbar2 = common_vendor.resolveComponent("custom-tabbar");
  (_easycom_uni_notice_bar2 + _easycom_home_course2 + _easycom_custom_tabbar2)();
}
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_home_course = () => "../../components/home-course/home-course.js";
const _easycom_custom_tabbar = () => "../../components/custom-tabbar/custom-tabbar.js";
if (!Math) {
  (_easycom_uni_notice_bar + _easycom_home_course + _easycom_custom_tabbar)();
}
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const isShowMessage = common_vendor.ref(false);
    const homeNavList = common_vendor.ref([
      {
        title: "学生课表",
        img: "../../static/-calendar--2.svg",
        target: "course",
        isShow: true
      },
      {
        title: "教师课表",
        img: "../../static/-calendar-.svg",
        target: "teacherCourse",
        isShow: true
      },
      {
        title: "教室课表",
        img: "../../static/-search-.svg",
        target: "classroomCourse",
        isShow: true
      },
      {
        title: "学生日历",
        img: "../../static/-calendar.svg",
        target: "calendar-course",
        isShow: true
      },
      {
        title: "教师日历",
        img: "../../static/-calendar-2.svg",
        target: "calendar-tech-course",
        isShow: true
      },
      {
        title: "搭子课表",
        img: "../../static/103-book-5.png",
        target: "lovers-course",
        isShow: true
      },
      {
        title: "学生周次课表",
        img: "../../static/034-to-do.svg",
        target: "course-plus",
        isShow: true
      },
      {
        title: "教师周次课表",
        img: "../../static/034-to-do(1).svg",
        target: "tech-course-plus",
        isShow: true
      }
    ]);
    const isNewUi = common_vendor.ref(false);
    common_vendor.ref(null);
    function copycode() {
      common_vendor.index.setClipboardData({
        data: "794980138",
        success: function() {
          common_vendor.index.showToast({
            title: "复制成功",
            icon: "success"
          });
        }
      });
    }
    function gotoPage(path) {
      common_vendor.index.navigateTo({
        url: `/pages/${path}/${path}`
      });
    }
    common_vendor.onShow(() => {
      const navList = common_vendor.index.getStorageSync("home-nav-list");
      isNewUi.value = common_vendor.index.getStorageSync("isNewUi") === "" ? false : !!common_vendor.index.getStorageSync("isNewUi");
      if (!!navList) {
        homeNavList.value = navList.filter((d) => d.isShow);
      }
    });
    common_vendor.onLoad(async () => {
      isShowMessage.value = true;
      common_vendor.index.showLoading({
        title: "加载配置中...",
        mask: true
      });
      await uilts_time.getCourseConfig();
      common_vendor.index.hideLoading();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(copycode),
        b: common_vendor.p({
          scrollable: true,
          single: true,
          text: "请大家进入小程序QQ群794980138,使用过程中有问题可进行反馈 (点击可复制QQ群号)"
        }),
        c: common_assets._imports_0,
        d: common_vendor.f(homeNavList.value, (d, k0, i0) => {
          return {
            a: d.img,
            b: common_vendor.t(d.title),
            c: common_vendor.o(($event) => gotoPage(d.target))
          };
        }),
        e: isNewUi.value ? 1 : "",
        f: common_vendor.p({
          selected: 0
        })
      };
    };
  }
};
_sfc_main.__runtimeHooks = 6;
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
