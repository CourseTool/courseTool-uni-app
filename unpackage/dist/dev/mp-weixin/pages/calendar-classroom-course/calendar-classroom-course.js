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
  __name: "calendar-classroom-course",
  setup(__props) {
    const isShowSelectClassroom = common_vendor.ref(false);
    const courseDataList = common_vendor.ref([]);
    const isShowPage = common_vendor.ref(false);
    const indexData = common_vendor.reactive({
      month: "",
      teacher: "",
      day: "",
      week: "",
      weekDay: ""
    });
    const fillCourseDayList = common_vendor.ref([]);
    let hasCourseDayList = [];
    const calendarWeekList = common_vendor.ref([]);
    const calendarCourseDataList = common_vendor.ref([]);
    const currentMonth = common_vendor.ref("");
    const currentDay = common_vendor.ref("");
    const sectionSortIndex = {
      "第一大节": 1,
      "第二大节": 2,
      "第三大节": 3,
      "第四大节": 4,
      "第五大节": 5,
      "第六大节": 6
    };
    const semesterDate = common_vendor.ref({});
    function sortCourseSection(courseList) {
      courseList.sort((a, b) => {
        return sectionSortIndex[a.courseSection] - sectionSortIndex[b.courseSection];
      });
    }
    function selectClassroom(val) {
      indexData.classroom = val;
      isShowSelectClassroom.value = false;
      getCourse();
      getMonthCourse();
    }
    function changeMonth(e) {
      indexData.month = e.month;
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
      isShowPage.value = true;
    }
    async function getCourse() {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      const {
        classroom,
        week,
        weekDay
      } = indexData;
      const res = await API_course.getClassroomCourseAPI({
        classroom,
        week,
        weekDay
      });
      courseDataList.value = res.data.data;
      sortCourseSection(courseDataList.value);
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 100);
    }
    function changeDate(e) {
      indexData.month = +e.month;
      indexData.day = e.date;
      const {
        weekDay,
        week
      } = uilts_time.getCurrentDate(indexData);
      indexData.week = week;
      indexData.weekDay = weekDay;
      getCourse();
    }
    async function getCourseForCalendar() {
      hasCourseDayList = [];
      genMonthWeek();
      const data = {
        weekList: calendarWeekList.value,
        classroom: indexData.classroom
      };
      const res = await API_course.getClassroomCourseForCalendarAPI(data);
      calendarCourseDataList.value = res.data.data;
      calendarCourseDataList.value.forEach((d) => {
        const date = {
          week: d.week,
          weekDay: d.courseWeekDay
        };
        const r = uilts_time.getDateByWeekandWeekDay(date);
        hasCourseDayList.push(r);
      });
    }
    function genMonthWeek() {
      calendarWeekList.value = [];
      const month = indexData.month;
      for (let i = 1; i <= uilts_time.monthMap[month]; i++) {
        const {
          week
        } = uilts_time.getCurrentDate({
          day: i,
          month: indexData.month
        });
        if (!calendarWeekList.value.includes(week)) {
          calendarWeekList.value.push(week);
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
        common_vendor.index.__f__("log", "at pages/calendar-classroom-course/calendar-classroom-course.vue:198", d, hasCourseDayList);
        if (hasCourseDayList.includes(d)) {
          fillList.push({
            date: d,
            info: "有课"
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
      const {
        week,
        weekDay
      } = uilts_time.getCurrentDate(date);
      indexData.week = week;
      indexData.weekDay = weekDay;
    }
    common_vendor.onMounted(async () => {
      indexData.classroom = "25-303M";
      const date = /* @__PURE__ */ new Date();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      indexData.month = month;
      indexData.day = day;
      indexData.year = year;
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
        b: common_vendor.t(indexData.classroom),
        c: common_vendor.o(($event) => isShowSelectClassroom.value = true),
        d: isShowSelectClassroom.value
      }, isShowSelectClassroom.value ? {
        e: common_vendor.o(selectClassroom),
        f: common_vendor.p({
          type: "classroom"
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
        l: courseDataList.value.length !== 0
      }, courseDataList.value.length !== 0 ? {
        m: common_vendor.f(courseDataList.value, (d, k0, i0) => {
          return {
            a: common_vendor.t(d.courseSection),
            b: common_vendor.t(common_vendor.unref(uilts_time.timeStampMap)[d.courseSection].replace(" ", "-")),
            c: common_vendor.t(d.courseName),
            d: common_vendor.t(d.courseTeacher),
            e: common_vendor.t(d.courseClass),
            f: d.id
          };
        })
      } : {}) : {});
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/calendar-classroom-course/calendar-classroom-course.js.map
