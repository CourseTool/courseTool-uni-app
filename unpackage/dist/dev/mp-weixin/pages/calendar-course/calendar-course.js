"use strict";
const common_vendor = require("../../common/vendor.js");
const uilts_time = require("../../uilts/time.js");
const API_course = require("../../API/course.js");
const API_config = require("../../API/config.js");
if (!Array) {
  const _easycom_select_class2 = common_vendor.resolveComponent("select-class");
  const _easycom_uni_calendar2 = common_vendor.resolveComponent("uni-calendar");
  (_easycom_select_class2 + _easycom_uni_calendar2)();
}
const _easycom_select_class = () => "../../components/select-class/select-class.js";
const _easycom_uni_calendar = () => "../../uni_modules/uni-calendar/components/uni-calendar/uni-calendar.js";
if (!Math) {
  (_easycom_select_class + _easycom_uni_calendar)();
}
const _sfc_main = {
  __name: "calendar-course",
  setup(__props) {
    const isShowSelectTech = common_vendor.ref(false);
    const courseDataList = common_vendor.ref([]);
    const isShowPage = common_vendor.ref(false);
    const indexData = common_vendor.reactive({
      year: "",
      month: "",
      className: "",
      day: "",
      week: "",
      weekDay: ""
    });
    const fillCourseDayList = common_vendor.ref([]);
    let hasCourseDayList = common_vendor.ref([]);
    const calendarWeekList = common_vendor.ref([]);
    const calendarCourseDataList = common_vendor.ref([]);
    const currentMonth = common_vendor.ref("");
    const currentDay = common_vendor.ref("");
    const sectionSortIndex = {
      第一大节: 1,
      第二大节: 2,
      第三大节: 3,
      第四大节: 4,
      第五大节: 5,
      第六大节: 6
    };
    const semesterDate = common_vendor.ref({});
    function sortCourseSection() {
      courseDataList.value.courseList.sort((a, b) => {
        return sectionSortIndex[a.courseSection] - sectionSortIndex[b.courseSection];
      });
    }
    function selectTech(val) {
      indexData.className = val;
      isShowSelectTech.value = false;
      updateDate();
      getCourse();
      getMonthCourse();
      common_vendor.index.setStorageSync("home-active-type", "student");
      common_vendor.index.setStorageSync("home-active-val", val);
    }
    function changeMonth(e) {
      if (indexData.year !== e.year) {
        indexData.month = e.month + 12;
      } else {
        indexData.month = e.month;
      }
      indexData.year = e.year;
      currentMonth.value = e.month;
      currentDay.value = 1;
      getMonthCourse();
    }
    async function getMonthCourse() {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      await getCourseForCalendar();
      fillCalendar();
      common_vendor.index.hideLoading();
      setTimeout(() => {
        common_vendor.index.hideLoading();
        isShowPage.value = true;
      }, 100);
    }
    async function getCourse() {
      const res = await API_course.getCourseDataAPIplus({
        week: indexData.week,
        weekDay: indexData.weekDay,
        className: indexData.className
      });
      courseDataList.value = res.data.data;
      if (courseDataList.value.length != 0) {
        courseDataList.value.courseList = Object.values(courseDataList.value.courseList);
        sortCourseSection();
      }
    }
    function changeDate(e) {
      indexData.month = +e.month;
      indexData.day = e.date;
      indexData.year = e.year;
      const { weekDay, weekStr } = uilts_time.getCurrentDate(indexData);
      indexData.weekStr = weekStr;
      indexData.week = weekStr;
      indexData.weekDay = weekDay;
      getCourse();
    }
    async function getCourseForCalendar() {
      hasCourseDayList.value = [];
      genMonthWeek();
      const data = {
        weekList: calendarWeekList.value,
        className: indexData.className
      };
      const res = await API_course.getCourseForCalendarAPI(data);
      calendarCourseDataList.value = res.data.data;
      calendarCourseDataList.value.forEach((d) => {
        if (!!Object.keys(d.courseList).length) {
          const date = {
            week: d.week,
            weekDay: d.weekDay
          };
          const r = uilts_time.getDateByWeekandWeekDay(date);
          common_vendor.index.__f__("log", "at pages/calendar-course/calendar-course.vue:162", r);
          hasCourseDayList.value.push(r);
        }
      });
    }
    function genMonthWeek() {
      calendarWeekList.value = [];
      let month = indexData.month;
      if (month > 12) {
        indexData.month -= 12;
        for (let i = 1; i <= uilts_time.monthMap[month - 12]; i++) {
          let { weekStr } = uilts_time.getCurrentDate({
            day: i,
            month
          });
          if (!calendarWeekList.value.includes(weekStr)) {
            calendarWeekList.value.push(weekStr);
          }
        }
      } else {
        for (let i = 1; i <= uilts_time.monthMap[month]; i++) {
          const { weekStr } = uilts_time.getCurrentDate({
            day: i,
            month: indexData.month
          });
          if (!calendarWeekList.value.includes(weekStr)) {
            calendarWeekList.value.push(weekStr);
          }
        }
      }
    }
    function fillCalendar() {
      const fillList = [];
      const month = indexData.month;
      for (let i = 1; i <= uilts_time.monthMap[month]; i++) {
        const m = month.toString().padStart(2, 0);
        const day = i;
        const d = `${indexData.year}-${m}-${day}`;
        if (hasCourseDayList.value.includes(d)) {
          fillList.push({
            date: d,
            info: "有课",
            data: {
              custom: "自定义信息",
              name: "自定义消息头"
            }
          });
        }
      }
      fillCourseDayList.value = fillList;
    }
    function updateDate() {
      const date = {
        month: currentMonth.value,
        day: currentDay.value
      };
      const { weekStr, weekDay } = uilts_time.getCurrentDate(date);
      indexData.week = weekStr;
      indexData.weekDay = weekDay;
    }
    common_vendor.onMounted(async () => {
      indexData.className = common_vendor.index.getStorageSync("home-active-type") === "student" ? common_vendor.index.getStorageSync("home-active-val") : "软件2303班";
      const date = /* @__PURE__ */ new Date();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      indexData.month = month;
      indexData.day = day;
      indexData.year = date.getFullYear();
      currentMonth.value = month;
      currentDay.value = day;
      updateDate();
      getCourse();
      getMonthCourse();
      const data = API_config.getCourseConfigAPISync();
      semesterDate.value = data;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isShowPage.value
      }, isShowPage.value ? common_vendor.e({
        b: common_vendor.t(indexData.className),
        c: common_vendor.o(($event) => isShowSelectTech.value = true),
        d: isShowSelectTech.value
      }, isShowSelectTech.value ? {
        e: common_vendor.o(selectTech),
        f: common_vendor.p({
          type: "student"
        })
      } : {}, {
        g: common_vendor.o(changeMonth),
        h: common_vendor.o(changeDate),
        i: common_vendor.p({
          selected: fillCourseDayList.value,
          insert: true,
          lunar: true,
          ["start-date"]: semesterDate.value.start_date,
          ["end-date"]: semesterDate.value.end_date
        }),
        j: common_vendor.t(indexData.week),
        k: common_vendor.t(indexData.weekDay),
        l: courseDataList.value.courseList.length !== 0
      }, courseDataList.value.courseList.length !== 0 ? {
        m: common_vendor.f(courseDataList.value.courseList, (d, k0, i0) => {
          return {
            a: common_vendor.t(d.courseSection),
            b: common_vendor.t(common_vendor.unref(uilts_time.timeStampMap)[d.courseSection].replace(" ", "-")),
            c: common_vendor.t(d.courseName),
            d: common_vendor.t(d.coursePosition),
            e: d.id
          };
        })
      } : {}) : {});
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/calendar-course/calendar-course.js.map
