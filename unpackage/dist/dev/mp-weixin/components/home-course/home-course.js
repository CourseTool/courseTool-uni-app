"use strict";
const common_vendor = require("../../common/vendor.js");
const uilts_time = require("../../uilts/time.js");
const API_course = require("../../API/course.js");
const _sfc_main = {
  __name: "home-course",
  setup(__props) {
    const isShowPage = common_vendor.ref(false);
    const courseUpdateLogData = common_vendor.ref({});
    const courseData = common_vendor.ref({
      courseList: []
    });
    let indexData = common_vendor.reactive({
      className: "",
      week: "",
      weekDay: ""
    });
    common_vendor.watch(
      () => indexData.week,
      (newVal) => {
        common_vendor.index.__f__("log", "at components/home-course/home-course.vue:65", newVal);
        if (isNaN(newVal)) {
          common_vendor.index.__f__("log", "at components/home-course/home-course.vue:67", "触发");
          const { week } = uilts_time.getCurrentDate();
          indexData.week = week;
        }
      }
    );
    const sectionSortIndex = {
      第一大节: 1,
      第二大节: 2,
      第三大节: 3,
      第四大节: 4,
      第五大节: 5,
      第六大节: 6
    };
    function sortCourseSection() {
      courseData.value.courseList.sort((a, b) => {
        return sectionSortIndex[a.courseSection] - sectionSortIndex[b.courseSection];
      });
    }
    async function getCourseData() {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      const weekStr = `第${indexData.week}周`;
      const { data } = await API_course.getCourseDataAPIplus({
        className: indexData.className,
        weekDay: indexData.weekDay,
        week: weekStr
      });
      courseData.value = data.data;
      courseData.value.courseList = Object.values(courseData.value.courseList);
      common_vendor.index.__f__("log", "at components/home-course/home-course.vue:107", courseData.value);
      if (courseData.value.courseList.length != 0) {
        sortCourseSection();
      }
      setTimeout(() => {
        common_vendor.index.hideLoading();
        isShowPage.value = true;
      }, 50);
    }
    async function getTeacherCourse(d = indexData) {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      const { data } = await API_course.getTeacherCourseAPI(d);
      courseData.value.courseList = data.data;
      setTimeout(() => {
        common_vendor.index.hideLoading();
        isShowPage.value = true;
      }, 50);
    }
    common_vendor.onLoad(async () => {
      const { data } = await API_course.getCourseUpdateLogAPI();
      courseUpdateLogData.value = data.data;
      indexData.className = common_vendor.index.getStorageSync("home-active-val") || "软件2303班";
      const { week, weekDay } = uilts_time.getCurrentDate();
      indexData.week = week;
      if (!indexData.week) {
        const r = uilts_time.getCurrentDate();
        indexData.week = r.week;
      }
      indexData.weekDay = weekDay;
      const homeActiveType = common_vendor.index.getStorageSync("home-active-type");
      if (homeActiveType) {
        const homeActiveVal = common_vendor.index.getStorageSync("home-active-val");
        const weekStr = `第${indexData.week}周`;
        if (homeActiveType === "teacher") {
          const data2 = {
            teacherName: homeActiveVal,
            week: weekStr,
            weekDay
          };
          indexData.className = homeActiveVal;
          getTeacherCourse(data2);
          return;
        }
        indexData.className = homeActiveVal;
      }
      getCourseData();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isShowPage.value
      }, isShowPage.value ? common_vendor.e({
        b: common_vendor.t(courseUpdateLogData.value.updateTime),
        c: common_vendor.t(common_vendor.unref(indexData).className),
        d: common_vendor.t(common_vendor.unref(indexData).week),
        e: common_vendor.t(common_vendor.unref(indexData).weekDay),
        f: courseData.value.courseList.length !== 0
      }, courseData.value.courseList.length !== 0 ? {
        g: common_vendor.f(courseData.value.courseList, (data, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(data.courseSection[0]),
            b: common_vendor.t(data.courseSection[1]),
            c: common_vendor.t(data.courseSection.substring(2)),
            d: common_vendor.t(common_vendor.unref(uilts_time.timeStampMap)[data.courseSection].replace(" ", "-")),
            e: common_vendor.t(data.courseName),
            f: common_vendor.t(data.coursePosition),
            g: data.className
          }, data.className ? {
            h: common_vendor.t(data.className)
          } : {}, {
            i: data.id
          });
        })
      } : {}) : {});
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/home-course/home-course.js.map
