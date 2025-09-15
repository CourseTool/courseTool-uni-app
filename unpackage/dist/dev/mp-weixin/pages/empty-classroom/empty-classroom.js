"use strict";
const common_vendor = require("../../common/vendor.js");
const API_course = require("../../API/course.js");
const uilts_time = require("../../uilts/time.js");
if (!Array) {
  const _easycom_wu_calendar2 = common_vendor.resolveComponent("wu-calendar");
  _easycom_wu_calendar2();
}
const _easycom_wu_calendar = () => "../../uni_modules/wu-calendar/components/wu-calendar/wu-calendar.js";
if (!Math) {
  _easycom_wu_calendar();
}
const _sfc_main = {
  __name: "empty-classroom",
  setup(__props) {
    const calendar = common_vendor.ref(null);
    const isSelectDate = common_vendor.ref(false);
    const isSelectSection = common_vendor.ref(false);
    const currentDate = common_vendor.reactive({
      week: "",
      weekDay: ""
    });
    const indexData = common_vendor.reactive({
      date: "选择日期",
      section: "选择节次",
      week: "",
      weekDay: "",
      position: "选择校区"
    });
    const sectionList = ["第一大节", "第二大节", "第三大节", "第四大节", "第五大节", "第六大节"];
    const positionList = ["南苑", "北苑"];
    const emptyClassroomList = common_vendor.ref([]);
    function selectPosition(e) {
      indexData.position = positionList[e.detail.value];
    }
    function selectSection(e) {
      indexData.section = sectionList[+e.detail.value];
    }
    function openCalendar() {
      calendar.value.open();
    }
    function selectDate(e) {
      const data = {
        month: e.month,
        day: e.date
      };
      indexData.date = `${e.month}月${e.date}日`;
      const {
        week,
        weekDay
      } = uilts_time.getCurrentDate(data);
      indexData.week = week;
      indexData.weekDay = weekDay;
      isSelectDate.value = true;
    }
    async function findEmptyClassroom() {
      if (indexData.classroom === "选择日期") {
        return;
      }
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      const res = await API_course.getEmptyClassroomAPI(indexData);
      common_vendor.index.__f__("log", "at pages/empty-classroom/empty-classroom.vue:111", res);
      emptyClassroomList.value = res.data.data;
      common_vendor.index.hideLoading();
    }
    common_vendor.onMounted(() => {
      const {
        week,
        weekDay
      } = uilts_time.getCurrentDate();
      currentDate.week = week;
      currentDate.weekDay = weekDay;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(currentDate.week),
        b: common_vendor.t(currentDate.weekDay),
        c: common_vendor.sr(calendar, "704fad3f-0", {
          "k": "calendar"
        }),
        d: common_vendor.o(selectDate),
        e: common_vendor.p({
          insert: false
        }),
        f: common_vendor.t(indexData.date),
        g: common_vendor.o(openCalendar),
        h: common_vendor.t(indexData.section),
        i: sectionList,
        j: common_vendor.o(selectSection),
        k: common_vendor.o(($event) => isSelectSection.value = true),
        l: common_vendor.t(indexData.position),
        m: positionList,
        n: common_vendor.o(selectPosition),
        o: common_vendor.o(($event) => _ctx.isSelectPosition = true),
        p: common_vendor.o(findEmptyClassroom),
        q: !!emptyClassroomList.value.length && indexData.date !== "选择日期"
      }, !!emptyClassroomList.value.length && indexData.date !== "选择日期" ? {
        r: common_vendor.t(emptyClassroomList.value.length)
      } : !emptyClassroomList.value.length && indexData.date !== "选择日期" ? {} : {}, {
        s: !emptyClassroomList.value.length && indexData.date !== "选择日期",
        t: !!emptyClassroomList.value.length
      }, !!emptyClassroomList.value.length ? {
        v: common_vendor.f(emptyClassroomList.value, (d, k0, i0) => {
          return {
            a: common_vendor.t(d)
          };
        })
      } : {});
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/empty-classroom/empty-classroom.js.map
