"use strict";
const common_vendor = require("../../common/vendor.js");
const API_course = require("../../API/course.js");
const uilts_time = require("../../uilts/time.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_select_class2 = common_vendor.resolveComponent("select-class");
  const _easycom_course_plus_item2 = common_vendor.resolveComponent("course-plus-item");
  (_easycom_uni_icons2 + _easycom_select_class2 + _easycom_course_plus_item2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_select_class = () => "../../components/select-class/select-class.js";
const _easycom_course_plus_item = () => "../../components/course-plus-item/course-plus-item.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_select_class + _easycom_course_plus_item)();
}
const _sfc_main = {
  __name: "tech-course-plus",
  setup(__props) {
    const isShowPage = common_vendor.ref(false);
    const weekCourseList = common_vendor.ref([]);
    const indexData = common_vendor.ref({
      teacherName: "",
      week: ""
    });
    const isShowSelectClass = common_vendor.ref(false);
    const weekList = common_vendor.ref([]);
    const weekIndex = common_vendor.ref(0);
    const weekDayList = common_vendor.ref([]);
    function gotoCurrent() {
      const { weekStr } = uilts_time.getCurrentDate();
      indexData.value.week = weekStr;
      weekIndex.value = weekList.value.indexOf(weekStr);
      weekDayList.value = uilts_time.getDateByWeek(weekIndex.value + 1);
    }
    function changeWeek(e) {
      weekIndex.value = e.detail.value;
      indexData.value.week = weekList.value[weekIndex.value];
    }
    function initWeekList() {
      for (let i = 1; i <= 25; i++) {
        weekList.value.push("第" + i + "周");
      }
      const { weekStr } = uilts_time.getCurrentDate();
      indexData.value.week = weekStr;
      weekIndex.value = weekList.value.indexOf(weekStr);
    }
    function hiddenSelectClass(val) {
      indexData.value.teacherName = val;
      isShowSelectClass.value = false;
      getCourseData();
      common_vendor.index.setStorageSync("home-active-type", "teacher");
      common_vendor.index.setStorageSync("home-active-val", val);
    }
    function groupTechCourseList() {
      const result = {
        星期一: [],
        星期二: [],
        星期三: [],
        星期四: [],
        星期五: [],
        星期六: [],
        星期日: []
      };
      weekCourseList.value.forEach((d) => {
        result[d.courseWeekDay].push(d);
      });
      return result;
    }
    async function getCourseData() {
      common_vendor.index.showLoading({
        title: "加载中...."
      });
      weekCourseList.value = [];
      const res = await API_course.getTechCourseForWeekAPI(indexData.value);
      weekCourseList.value = res.data.data;
      weekCourseList.value = groupTechCourseList();
      setTimeout(() => {
        common_vendor.index.hideLoading();
        isShowPage.value = true;
      }, 150);
    }
    common_vendor.watch(indexData.value, () => {
      getCourseData();
    });
    common_vendor.onMounted(() => {
      initWeekList();
      indexData.value.teacherName = common_vendor.index.getStorageSync("home-active-type") === "teacher" ? common_vendor.index.getStorageSync("home-active-val") : "吴宇飞";
      weekDayList.value = uilts_time.getDateByWeek(weekIndex.value + 1);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isShowPage.value
      }, isShowPage.value ? common_vendor.e({
        b: common_vendor.t(weekList.value[weekIndex.value]),
        c: common_vendor.p({
          color: "#fff",
          type: "down",
          size: "22"
        }),
        d: common_vendor.o(changeWeek),
        e: weekIndex.value,
        f: weekList.value,
        g: common_vendor.t(indexData.value.teacherName),
        h: common_vendor.o(($event) => isShowSelectClass.value = true),
        i: common_vendor.o(gotoCurrent),
        j: isShowSelectClass.value
      }, isShowSelectClass.value ? {
        k: common_vendor.o(hiddenSelectClass),
        l: common_vendor.p({
          type: "teacher"
        })
      } : {}, {
        m: common_vendor.f(weekDayList.value, (d, k0, i0) => {
          return {
            a: common_vendor.t(d.weekDay),
            b: common_vendor.t(d.day)
          };
        }),
        n: common_vendor.f(weekCourseList.value, (data, k0, i0) => {
          return {
            a: common_vendor.f(6, (i, k1, i1) => {
              return {
                a: i
              };
            }),
            b: common_vendor.f(data, (d, i, i1) => {
              return {
                a: i,
                b: "4acc8b12-2-" + i0 + "-" + i1,
                c: common_vendor.p({
                  isTeacher: true,
                  data: d
                })
              };
            })
          };
        })
      }) : {});
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/tech-course-plus/tech-course-plus.js.map
