"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const uilts_time = require("../../uilts/time.js");
const API_course = require("../../API/course.js");
const uilts_debounce = require("../../uilts/debounce.js");
if (!Array) {
  const _easycom_select_class2 = common_vendor.resolveComponent("select-class");
  const _easycom_courseDate_weekDay2 = common_vendor.resolveComponent("courseDate-weekDay");
  const _easycom_courseDate_week2 = common_vendor.resolveComponent("courseDate-week");
  (_easycom_select_class2 + _easycom_courseDate_weekDay2 + _easycom_courseDate_week2)();
}
const _easycom_select_class = () => "../../components/select-class/select-class.js";
const _easycom_courseDate_weekDay = () => "../../components/courseDate-weekDay/courseDate-weekDay.js";
const _easycom_courseDate_week = () => "../../components/courseDate-week/courseDate-week.js";
if (!Math) {
  (_easycom_select_class + _easycom_courseDate_weekDay + _easycom_courseDate_week)();
}
const _sfc_main = {
  __name: "course",
  setup(__props) {
    const courseData = common_vendor.ref({
      courseList: []
    });
    const sectionTimeMap = {
      第一大节: "8.30-10.00",
      第二大节: "10.20-11.50",
      第三大节: "14.00-15.30",
      第四大节: "15.50-17.20",
      第五大节: "18.40-20.10",
      第六大节: "20.20-21.50"
    };
    const isShowPage = common_vendor.ref(false);
    const isShowSelectClass = common_vendor.ref(false);
    const currentDate = common_vendor.ref(/* @__PURE__ */ new Date());
    const indexData = common_vendor.reactive({});
    const weekComponent = common_vendor.ref(null);
    const weekDayComponent = common_vendor.ref(null);
    const hasCourseWeekDayList = common_vendor.ref([]);
    const sectionSortIndex = {
      第一大节: 1,
      第二大节: 2,
      第三大节: 3,
      第四大节: 4,
      第五大节: 5,
      第六大节: 6
    };
    common_vendor.ref(0);
    function sortCourseSection() {
      courseData.value.courseList.sort((a, b) => {
        return sectionSortIndex[a.courseSection] - sectionSortIndex[b.courseSection];
      });
    }
    function selectDate(weekDay) {
      indexData.weekDay = weekDay;
    }
    function changeWeekDay(date) {
      weekComponent.value.setCurrentTime(date);
    }
    function gotoCurrentDay() {
      const { week, weekDay } = uilts_time.getCurrentDate();
      indexData.week = week;
      indexData.weekDay = weekDay;
      indexData.className = common_vendor.index.getStorageSync("home-active-type") === "student" ? common_vendor.index.getStorageSync("home-active-val") : "软件2303班";
      currentDate.value = /* @__PURE__ */ new Date();
      const date = {
        month: currentDate.value.getMonth() + 1,
        day: currentDate.value.getDate()
      };
      weekComponent.value.setCurrentTime(date);
      weekComponent.value.getCurrentWeek();
    }
    function gotoPage(index) {
      common_vendor.index.navigateBack({
        url: `/pages/${index}/${index}`
      });
    }
    function hiddenSelectClass(val) {
      isShowSelectClass.value = false;
      indexData.className = val;
      common_vendor.index.setStorageSync("home-active-type", "student");
      common_vendor.index.setStorageSync("home-active-val", val);
      getCourseData();
      getWeekHasCourseDayList();
    }
    function changeWeek(newDate) {
      common_vendor.index.__f__("log", "at pages/course/course.vue:188", newDate);
      currentDate.value = new Date(newDate);
    }
    function injectElectives() {
      const electivesDataList = common_vendor.index.getStorageSync("electivesDataList");
      if (electivesDataList) {
        electivesDataList.forEach((dataList) => {
          dataList.forEach((d) => {
            if (indexData.week === d.week && indexData.weekDay === d.courseWeekDay) {
              courseData.value.courseList.push(d);
            }
          });
        });
      }
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
      injectElectives();
      sortCourseSection();
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 100);
    }
    async function getWeekHasCourseDayList() {
      const electivesWeekDayList = common_vendor.index.getStorageSync("electivesDataList") || [];
      const weekStr = `第${indexData.week}周`;
      const data = {
        className: indexData.className,
        week: weekStr
      };
      const res = await API_course.getStudentWeekHasCourseDayListAPI(data);
      hasCourseWeekDayList.value = res.data.data;
      electivesWeekDayList.forEach((dataList) => {
        dataList.some((d) => {
          if (indexData.week === d.week) {
            hasCourseWeekDayList.value.push(d.courseWeekDay);
            return true;
          }
        });
      });
    }
    common_vendor.watch(
      () => indexData.week,
      uilts_debounce.debounce(() => {
        getCourseData();
        getWeekHasCourseDayList();
      }, 100)
    );
    common_vendor.watch(
      () => indexData.weekDay,
      uilts_debounce.debounce(() => {
        getCourseData();
      }, 100)
    );
    common_vendor.onMounted(async () => {
      isShowPage.value = true;
      const { week, weekDay } = uilts_time.getCurrentDate();
      indexData.week = week;
      indexData.weekDay = weekDay;
      indexData.className = common_vendor.index.getStorageSync("home-active-type") === "student" ? common_vendor.index.getStorageSync("home-active-val") : "软件2303班";
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isShowPage.value
      }, isShowPage.value ? common_vendor.e({
        b: common_vendor.o(($event) => gotoPage("home")),
        c: common_vendor.t(indexData.className),
        d: common_vendor.o(($event) => isShowSelectClass.value = true),
        e: common_vendor.o(gotoCurrentDay),
        f: isShowSelectClass.value
      }, isShowSelectClass.value ? {
        g: common_vendor.o(hiddenSelectClass),
        h: common_vendor.p({
          type: "student"
        })
      } : {}, {
        i: common_vendor.sr(weekDayComponent, "7127af92-1", {
          "k": "weekDayComponent"
        }),
        j: common_vendor.o(changeWeekDay),
        k: common_vendor.o(($event) => indexData.weekDay = $event),
        l: common_vendor.p({
          hasCourseList: hasCourseWeekDayList.value,
          date: currentDate.value,
          modelValue: indexData.weekDay
        }),
        m: common_vendor.sr(weekComponent, "7127af92-2", {
          "k": "weekComponent"
        }),
        n: common_vendor.o(selectDate),
        o: common_vendor.o(changeWeek),
        p: common_vendor.o(($event) => indexData.week = $event),
        q: common_vendor.p({
          modelValue: indexData.week
        }),
        r: courseData.value.courseList.length === 0
      }, courseData.value.courseList.length === 0 ? {} : {
        s: common_vendor.f(courseData.value.courseList, (data, k0, i0) => {
          return {
            a: common_vendor.t(data.courseSection),
            b: common_vendor.t(sectionTimeMap[data.courseSection]),
            c: common_vendor.t(data.courseName),
            d: common_vendor.t(data.coursePosition),
            e: common_vendor.t(data.courseTeacher),
            f: common_vendor.t(data.courseWeek.replaceAll("周", "")),
            g: data.id
          };
        }),
        t: common_assets._imports_0$2
      }, {
        v: common_vendor.o((...args) => _ctx.silder && _ctx.silder(...args))
      }) : {});
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/course/course.js.map
