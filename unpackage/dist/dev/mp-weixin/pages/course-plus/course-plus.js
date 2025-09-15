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
  __name: "course-plus",
  setup(__props) {
    const isShowPage = common_vendor.ref(false);
    const weekCourseList = common_vendor.ref([]);
    const indexData = common_vendor.ref({
      className: "",
      week: ""
    });
    const isShowSelectClass = common_vendor.ref(false);
    const weekList = common_vendor.ref([]);
    const weekIndex = common_vendor.ref(0);
    const weekDayList = common_vendor.ref([]);
    const uiList = [
      {
        value: "list",
        title: "列表"
      },
      {
        value: "grid",
        title: "网格"
      }
    ];
    const currentShowType = common_vendor.ref(uiList[1]);
    const month = common_vendor.ref(0);
    const sectionMap = ["第一大节", "第二大节", "第三大节", "第四大节", "第五大节", "第六大节"];
    const sectionSortIndex = {
      第一大节: 1,
      第二大节: 2,
      第三大节: 3,
      第四大节: 4,
      第五大节: 5,
      第六大节: 6
    };
    function changeUi(e) {
      currentShowType.value = uiList.find((d) => d.title === uiList[+e.detail.value].title);
      getCourseData();
    }
    function changeWeek(e) {
      weekIndex.value = e.detail.value;
      indexData.value.week = weekList.value[weekIndex.value];
      weekDayList.value = uilts_time.getDateByWeek(+weekIndex.value + 1);
      month.value = uilts_time.getMonthByWeek(weekIndex.value);
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
      indexData.value.className = val;
      isShowSelectClass.value = false;
      getCourseData();
      common_vendor.index.setStorageSync("home-active-type", "student");
      common_vendor.index.setStorageSync("home-active-val", val);
    }
    function fillCourseList() {
      if (weekCourseList.value.length === 0) {
        weekCourseList.value = new Array(7).fill({
          courseList: {}
        });
        weekCourseList.value.forEach((d) => {
          sectionMap.forEach((s) => {
            d.courseList[s] = {
              isEmpty: true,
              courseSection: s
            };
          });
        });
      }
      weekCourseList.value.forEach((d) => {
        const sectionList = Object.keys(d.courseList);
        sectionMap.forEach((s) => {
          if (!sectionList.includes(s)) {
            d.courseList[s] = {
              isEmpty: true,
              courseSection: s
            };
          }
        });
      });
    }
    function gropCourseList() {
      function _isSame(d, c) {
        return d.courseName === c.courseName && sectionSortIndex[d.courseSection] - sectionSortIndex[c.courseSection] === -1;
      }
      weekCourseList.value.forEach((d) => {
        let prevCourse = null;
        for (let k in d.courseList) {
          if (!prevCourse) {
            prevCourse = d.courseList[k];
            continue;
          }
          const c = d.courseList[k];
          if (_isSame(prevCourse, c)) {
            delete d.courseList[k];
            prevCourse["isContinuous"] = true;
            d.courseList[k] = prevCourse;
          } else {
            prevCourse = d.courseList[k];
          }
        }
      });
    }
    async function getCourseData() {
      common_vendor.index.showLoading({
        title: "加载中...."
      });
      weekCourseList.value = [];
      const res = await API_course.getCourseForWeekAPI(indexData.value);
      weekCourseList.value = res.data.data;
      if (currentShowType.value.value === "list") {
        fillCourseList();
      } else {
        gropCourseList();
      }
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
      indexData.value.className = common_vendor.index.getStorageSync("home-active-type") === "student" ? common_vendor.index.getStorageSync("home-active-val") : "软件2303班";
      weekDayList.value = uilts_time.getDateByWeek(weekIndex.value + 1);
      month.value = uilts_time.getMonthByWeek(weekIndex.value);
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
        g: common_vendor.t(indexData.value.className),
        h: common_vendor.o(($event) => isShowSelectClass.value = true),
        i: common_vendor.t(currentShowType.value.title),
        j: uiList.map((d) => d.title),
        k: common_vendor.o(changeUi),
        l: isShowSelectClass.value
      }, isShowSelectClass.value ? {
        m: common_vendor.o(hiddenSelectClass),
        n: common_vendor.p({
          type: "student"
        })
      } : {}, {
        o: common_vendor.t(month.value),
        p: common_vendor.f(weekDayList.value, (d, k0, i0) => {
          return {
            a: common_vendor.t(d.weekDay),
            b: common_vendor.t(d.day)
          };
        }),
        q: common_vendor.f(weekCourseList.value, (data, k0, i0) => {
          return {
            a: common_vendor.f(data.courseList, (d, k1, i1) => {
              return {
                a: d.id,
                b: "d0acf59e-2-" + i0 + "-" + i1,
                c: common_vendor.p({
                  type: currentShowType.value.value,
                  data: d
                })
              };
            })
          };
        }),
        r: currentShowType.value.value === "grid" ? 1 : ""
      }) : {});
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/course-plus/course-plus.js.map
