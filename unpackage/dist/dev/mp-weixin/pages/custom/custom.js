"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "custom",
  setup(__props) {
    const fnNavList = common_vendor.ref(common_vendor.ref([
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
    ]));
    const isNewUi = common_vendor.ref(true);
    function changeShow(navObj) {
      navObj.isShow = !navObj.isShow;
      common_vendor.index.setStorageSync("home-nav-list", fnNavList.value);
    }
    function changeUI() {
      isNewUi.value = !isNewUi.value;
      common_vendor.index.setStorageSync("isNewUi", isNewUi.value);
    }
    common_vendor.onMounted(() => {
      const navList = common_vendor.index.getStorageSync("home-nav-list");
      isNewUi.value = common_vendor.index.getStorageSync("isNewUi") === "" ? false : !!common_vendor.index.getStorageSync("isNewUi");
      if (!!navList) {
        fnNavList.value = navList;
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(fnNavList.value, (d, k0, i0) => {
          return {
            a: common_vendor.t(d.title),
            b: d.isShow,
            c: common_vendor.t(d.isShow ? "显示" : "隐藏"),
            d: common_vendor.o(($event) => changeShow(d))
          };
        }),
        b: isNewUi.value,
        c: common_vendor.o(changeUI)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/custom/custom.js.map
