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
  __name: "classroomCourse",
  setup(__props) {
    const courseData = common_vendor.ref([]);
    const sectionTimeMap = {
      第一大节: "8.30-10.00",
      第二大节: "10.20-11.50",
      第三大节: "14.00-15.30",
      第四大节: "15.50-17.20",
      第五大节: "18.40-20.10",
      第六大节: "20.20-21.50"
    };
    const isShowPage = common_vendor.ref(false);
    const isShowSelectClassroom = common_vendor.ref(false);
    const currentDate = common_vendor.ref(/* @__PURE__ */ new Date());
    const indexData = common_vendor.reactive({});
    const weekComponent = common_vendor.ref(null);
    const hasCourseWeekDayList = common_vendor.ref([]);
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
      indexData.classroom = common_vendor.index.getStorageSync("select-classroom") || "25-303M";
      currentDate.value = /* @__PURE__ */ new Date();
      const date = {
        month: currentDate.value.getMonth() + 1,
        day: currentDate.value.getDate()
      };
      weekComponent.value.setCurrentTime(date.day, date.month);
      weekComponent.value.getCurrentWeek();
    }
    function gotoPage(index) {
      common_vendor.index.redirectTo({
        url: `/pages/${index}/${index}`
      });
    }
    function hiddenSelectClassroom(val) {
      isShowSelectClassroom.value = false;
      indexData.classroom = val;
      getCourseData();
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
      const { data } = await API_course.getClassroomCourseAPI({
        week: "第" + indexData.week + "周",
        weekDay: indexData.weekDay,
        classroom: indexData.classroom
      });
      courseData.value = data.data;
      courseData.value.courseList = Object.values(data.data.courseList);
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 230);
    }
    async function getWeekHasCourseDayList() {
      const data = {
        classroom: indexData.classroom,
        week: "第" + indexData.week + "周"
      };
      const res = await API_course.getClassroomWeekHasCourseDayListAPI(data);
      hasCourseWeekDayList.value = res.data.data;
    }
    common_vendor.watch(indexData, () => {
      getCourseData();
    });
    common_vendor.onMounted(async () => {
      isShowPage.value = true;
      const { week, weekDay, weekStr } = uilts_time.getCurrentDate();
      indexData.week = week;
      indexData.weekDay = weekDay;
      indexData.weekStr = weekStr;
      indexData.classroom = common_vendor.index.getStorageSync("select-classroom") || "25-303M";
      getWeekHasCourseDayList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isShowPage.value
      }, isShowPage.value ? common_vendor.e({
        b: common_vendor.o(($event) => gotoPage("home")),
        c: common_vendor.t(indexData.classroom),
        d: common_vendor.o(($event) => isShowSelectClassroom.value = true),
        e: common_vendor.o(gotoCurrentDay),
        f: isShowSelectClassroom.value
      }, isShowSelectClassroom.value ? {
        g: common_vendor.o(hiddenSelectClassroom),
        h: common_vendor.p({
          type: "classroom"
        })
      } : {}, {
        i: common_vendor.o(changeWeekDay),
        j: common_vendor.o(($event) => indexData.weekDay = $event),
        k: common_vendor.p({
          hasCourseList: hasCourseWeekDayList.value,
          date: currentDate.value,
          modelValue: indexData.weekDay
        }),
        l: common_vendor.sr(weekComponent, "f19fcd96-2", {
          "k": "weekComponent"
        }),
        m: common_vendor.o(selectDate),
        n: common_vendor.o(changeWeek),
        o: common_vendor.o(($event) => indexData.week = $event),
        p: common_vendor.p({
          modelValue: indexData.week
        }),
        q: !courseData.value.courseList.length
      }, !courseData.value.courseList.length ? {} : {
        r: common_vendor.f(courseData.value.courseList, (data, k0, i0) => {
          return {
            a: common_vendor.t(data.courseSection),
            b: common_vendor.t(sectionTimeMap[data.courseSection]),
            c: common_vendor.t(data.courseName),
            d: common_vendor.t(data.courseTeacher),
            e: common_vendor.t(data.courseClass),
            f: data.id
          };
        })
      }) : {});
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/classroomCourse/classroomCourse.js.map
