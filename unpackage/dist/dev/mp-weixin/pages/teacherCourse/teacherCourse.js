"use strict";
const common_vendor = require("../../common/vendor.js");
const uilts_time = require("../../uilts/time.js");
const API_course = require("../../API/course.js");
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
  __name: "teacherCourse",
  setup(__props) {
    const courseData = common_vendor.ref({
      courseList: []
    });
    const sectionTimeMap = {
      "第一大节": "8.30-10.00",
      "第二大节": "10.20-11.50",
      "第三大节": "14.00-15.30",
      "第四大节": "15.50-17.20",
      "第五大节": "18.40-20.10",
      "第六大节": "20.20-21.50"
    };
    const isShowPage = common_vendor.ref(false);
    const isShowSelectTeacher = common_vendor.ref(false);
    const currentDate = common_vendor.ref(/* @__PURE__ */ new Date());
    const indexData = common_vendor.reactive({});
    const weekComponent = common_vendor.ref(null);
    const weekDayComponent = common_vendor.ref(null);
    const hasCourseWeekDayList = common_vendor.ref([]);
    common_vendor.ref(0);
    const sectionSortIndex = {
      "第一大节": 1,
      "第二大节": 2,
      "第三大节": 3,
      "第四大节": 4,
      "第五大节": 5,
      "第六大节": 6
    };
    function sortCourseSection() {
      if (courseData.value.length === 0)
        return;
      const sortObj = {};
      const sortIndex = Object.keys(courseData.value.courseList).sort((a, b) => sectionSortIndex[a] - sectionSortIndex[b]);
      for (let k of sortIndex) {
        sortObj[k] = courseData.value.courseList[k];
      }
      courseData.value.courseList = sortObj;
    }
    function selectDate(weekDay) {
      indexData.weekDay = weekDay;
    }
    function changeWeekDay(date) {
      weekComponent.value.setCurrentTime(date);
    }
    function gotoCurrentDay() {
      const {
        week,
        weekDay
      } = uilts_time.getCurrentDate();
      indexData.week = week;
      indexData.weekDay = weekDay;
      indexData.teacherName = common_vendor.index.getStorageSync("home-active-type") === "teacher" ? common_vendor.index.getStorageSync(
        "home-active-val"
      ) : "吴宇飞";
      currentDate.value = /* @__PURE__ */ new Date();
      const date = {
        month: currentDate.value.getMonth() + 1,
        day: currentDate.value.getDate()
      };
      weekComponent.value.setCurrentTime(date);
      weekComponent.value.getCurrentWeek();
    }
    function gotoPage(index) {
      common_vendor.index.redirectTo({
        url: `/pages/${index}/${index}`
      });
    }
    function hiddenSelectTeacher(val) {
      isShowSelectTeacher.value = false;
      indexData.teacherName = val;
      common_vendor.index.setStorageSync("home-active-type", "teacher");
      common_vendor.index.setStorageSync("home-active-val", val);
      API_course.getTeacherCourseAPI();
      getWeekHasCourseDayList();
    }
    function changeWeek(newDate) {
      currentDate.value = newDate;
      getWeekHasCourseDayList();
    }
    async function getCourseData() {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      const weekStr = `第${indexData.week}周`;
      const {
        data
      } = await API_course.getTeacherCourseAPI({
        teacherName: indexData.teacherName,
        weekDay: indexData.weekDay,
        week: weekStr
      });
      courseData.value = data.data;
      sortCourseSection();
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 230);
    }
    async function getWeekHasCourseDayList() {
      const weekStr = `第${indexData.week}周`;
      const data = {
        teacher: indexData.teacherName,
        week: weekStr
      };
      const res = await API_course.getTeacherWeekHasCourseDayListAPI(data);
      hasCourseWeekDayList.value = res.data.data;
    }
    common_vendor.watch(indexData, () => {
      getCourseData();
    });
    common_vendor.onMounted(async () => {
      isShowPage.value = true;
      const {
        week,
        weekDay
      } = uilts_time.getCurrentDate();
      indexData.week = week;
      indexData.weekDay = weekDay;
      indexData.teacherName = common_vendor.index.getStorageSync("home-active-type") === "teacher" ? common_vendor.index.getStorageSync(
        "home-active-val"
      ) : "吴宇飞";
      getWeekHasCourseDayList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isShowPage.value
      }, isShowPage.value ? common_vendor.e({
        b: common_vendor.o(($event) => gotoPage("home")),
        c: common_vendor.t(indexData.teacherName),
        d: common_vendor.o(($event) => isShowSelectTeacher.value = true),
        e: common_vendor.o(gotoCurrentDay),
        f: isShowSelectTeacher.value
      }, isShowSelectTeacher.value ? {
        g: common_vendor.o(hiddenSelectTeacher),
        h: common_vendor.p({
          type: "teacher"
        })
      } : {}, {
        i: common_vendor.sr(weekDayComponent, "479c475a-1", {
          "k": "weekDayComponent"
        }),
        j: common_vendor.o(changeWeekDay),
        k: common_vendor.o(($event) => indexData.weekDay = $event),
        l: common_vendor.p({
          hasCourseList: hasCourseWeekDayList.value,
          date: currentDate.value,
          modelValue: indexData.weekDay
        }),
        m: common_vendor.sr(weekComponent, "479c475a-2", {
          "k": "weekComponent"
        }),
        n: common_vendor.o(selectDate),
        o: common_vendor.o(changeWeek),
        p: common_vendor.o(($event) => indexData.week = $event),
        q: common_vendor.p({
          modelValue: indexData.week
        }),
        r: courseData.value.length === 0
      }, courseData.value.length === 0 ? {} : {
        s: common_vendor.f(courseData.value.courseList, (data, k0, i0) => {
          return {
            a: common_vendor.t(data.courseSection),
            b: common_vendor.t(sectionTimeMap[data.courseSection]),
            c: common_vendor.t(data.courseName),
            d: common_vendor.t(data.coursePosition),
            e: common_vendor.t(data.courseClass),
            f: data.id
          };
        })
      }, {
        t: common_vendor.o((...args) => _ctx.touchStart && _ctx.touchStart(...args)),
        v: common_vendor.o((...args) => _ctx.silder && _ctx.silder(...args))
      }) : {});
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/teacherCourse/teacherCourse.js.map
