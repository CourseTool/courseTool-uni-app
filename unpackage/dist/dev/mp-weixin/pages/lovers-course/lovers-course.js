"use strict";
const common_vendor = require("../../common/vendor.js");
const API_course = require("../../API/course.js");
const uilts_time = require("../../uilts/time.js");
if (!Array) {
  const _easycom_select_class2 = common_vendor.resolveComponent("select-class");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_wu_calendar2 = common_vendor.resolveComponent("wu-calendar");
  (_easycom_select_class2 + _easycom_uni_icons2 + _easycom_wu_calendar2)();
}
const _easycom_select_class = () => "../../components/select-class/select-class.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_wu_calendar = () => "../../uni_modules/wu-calendar/components/wu-calendar/wu-calendar.js";
if (!Math) {
  (_easycom_select_class + _easycom_uni_icons + _easycom_wu_calendar)();
}
const _sfc_main = {
  __name: "lovers-course",
  setup(__props) {
    const maleClass = common_vendor.ref("");
    const femaleClass = common_vendor.ref("");
    const isShowMaleSelectClass = common_vendor.ref(false);
    const isShowFemaleSelectClass = common_vendor.ref(false);
    const isShowPage = common_vendor.ref(false);
    const indexData = common_vendor.reactive({
      maleClass,
      femaleClass,
      week: "",
      weekDay: "",
      month: "",
      day: ""
    });
    const courseDataList = common_vendor.ref([]);
    const calendar = common_vendor.ref(null);
    const currentDate = common_vendor.ref("");
    const sectionSortIndex = {
      第一大节: 1,
      第二大节: 2,
      第三大节: 3,
      第四大节: 4,
      第五大节: 5,
      第六大节: 6
    };
    function sortTeacherCourseSection() {
      const a = Object.values(courseDataList.value).sort((a2, b) => {
        return sectionSortIndex[a2[0].courseSection] - sectionSortIndex[b[0].courseSection];
      });
      const result = {};
      Object.keys(sectionSortIndex).forEach((k, i) => {
        if (a[i]) {
          result[k] = a[i];
        }
      });
      courseDataList.value = result;
    }
    function openCalendar() {
      calendar.value.open();
    }
    function selectDate(e) {
      const data = {
        month: e.month,
        day: e.date,
        year: e.year
      };
      currentDate.value = `${data.year}-${data.month}-${data.day}`;
      const { weekStr, weekDay } = uilts_time.getCurrentDate(data);
      indexData.week = weekStr;
      indexData.weekDay = weekDay;
      indexData.day = e.date;
      indexData.month = e.month;
      getCourse();
    }
    function selectMaleClass(val) {
      maleClass.value = val;
      isShowMaleSelectClass.value = false;
      getCourse();
      common_vendor.index.setStorageSync("lovers-male-class", val);
    }
    function selectFemaleClass(val) {
      femaleClass.value = val;
      isShowFemaleSelectClass.value = false;
      getCourse();
      common_vendor.index.setStorageSync("lovers-female-class", val);
    }
    async function getCourse() {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      const res = await API_course.getLoversCourseAPI(indexData);
      courseDataList.value = res.data.data;
      sortTeacherCourseSection();
      common_vendor.index.hideLoading();
      isShowPage.value = true;
    }
    common_vendor.onMounted(() => {
      const { weekStr, weekDay } = uilts_time.getCurrentDate();
      const date = /* @__PURE__ */ new Date();
      indexData.week = weekStr;
      indexData.weekDay = weekDay;
      indexData.day = date.getDate();
      indexData.month = date.getMonth() + 1;
      indexData.maleClass = common_vendor.index.getStorageSync("lovers-male-class") || "软件2303班";
      indexData.femaleClass = common_vendor.index.getStorageSync("lovers-female-class") || "大数据会计2305班";
      getCourse();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isShowPage.value
      }, isShowPage.value ? common_vendor.e({
        b: common_vendor.t(maleClass.value),
        c: common_vendor.o(($event) => isShowMaleSelectClass.value = true),
        d: isShowMaleSelectClass.value
      }, isShowMaleSelectClass.value ? {
        e: common_vendor.o(selectMaleClass),
        f: common_vendor.p({
          type: "student"
        })
      } : {}, {
        g: common_vendor.p({
          color: "#6598d9",
          type: "heart-filled",
          size: "26"
        }),
        h: common_vendor.p({
          color: "#FFCCE1",
          type: "heart-filled",
          size: "26"
        }),
        i: common_vendor.t(femaleClass.value),
        j: common_vendor.o(($event) => isShowFemaleSelectClass.value = true),
        k: isShowFemaleSelectClass.value
      }, isShowFemaleSelectClass.value ? {
        l: common_vendor.o(selectFemaleClass),
        m: common_vendor.p({
          type: "student"
        })
      } : {}, {
        n: common_vendor.t(indexData.month),
        o: common_vendor.t(indexData.day),
        p: common_vendor.t(indexData.week),
        q: common_vendor.t(indexData.weekDay),
        r: common_vendor.sr(calendar, "4892b103-4", {
          "k": "calendar"
        }),
        s: common_vendor.o(selectDate),
        t: common_vendor.p({
          lunar: true,
          date: currentDate.value,
          insert: false
        }),
        v: common_vendor.o(openCalendar),
        w: Object.keys(courseDataList.value).length !== 0
      }, Object.keys(courseDataList.value).length !== 0 ? {
        x: common_vendor.f(courseDataList.value, (data, z, i0) => {
          return {
            a: common_vendor.f(data, (d, i, i1) => {
              return common_vendor.e({
                a: i === 0
              }, i === 0 ? {
                b: common_vendor.t(d.courseSection),
                c: common_vendor.t(common_vendor.unref(uilts_time.timeStampMap)[d.courseSection].replace(" ", "-"))
              } : {}, {
                d: common_vendor.t(d.courseName),
                e: i === 1
              }, i === 1 ? {
                f: "4892b103-5-" + i0 + "-" + i1,
                g: common_vendor.p({
                  color: "#6598d9",
                  type: "heart-filled",
                  size: "26"
                }),
                h: "4892b103-6-" + i0 + "-" + i1,
                i: common_vendor.p({
                  color: "#FFCCE1",
                  type: "heart-filled",
                  size: "26"
                })
              } : {}, {
                j: common_vendor.t(d.coursePosition),
                k: d.courseClass === femaleClass.value ? 1 : ""
              });
            }),
            b: z
          };
        })
      } : {}) : {});
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/lovers-course/lovers-course.js.map
