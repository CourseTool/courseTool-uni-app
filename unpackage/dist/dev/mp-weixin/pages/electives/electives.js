"use strict";
const common_vendor = require("../../common/vendor.js");
const API_course = require("../../API/course.js");
const uilts_time = require("../../uilts/time.js");
if (!Array) {
  const _easycom_select_class2 = common_vendor.resolveComponent("select-class");
  _easycom_select_class2();
}
const _easycom_select_class = () => "../../components/select-class/select-class.js";
if (!Math) {
  _easycom_select_class();
}
const _sfc_main = {
  __name: "electives",
  setup(__props) {
    const isSelectTeacher = common_vendor.ref(false);
    const isSelectClassroom = common_vendor.ref(false);
    const isSelectSection = common_vendor.ref(false);
    const currentDate = common_vendor.reactive({
      week: "",
      weekDay: ""
    });
    const indexData = common_vendor.reactive({
      teacher: "选择老师",
      classroom: "选择教室",
      section: "选择节次"
    });
    const sectionList = ["第一大节", "第二大节", "第三大节", "第四大节", "第五大节", "第六大节"];
    const courseDataList = common_vendor.ref([]);
    const sectionTimeMap = {
      "第一大节": "8.30-10.00",
      "第二大节": "10.20-11.50",
      "第三大节": "14.00-15.30",
      "第四大节": "15.50-17.20",
      "第五大节": "18.40-20.10",
      "第六大节": "20.20-21.50"
    };
    const electivesData = common_vendor.ref([]);
    function remove() {
      common_vendor.index.showModal({
        title: "提示",
        content: "你确定要删除所有已添加到选修课嘛?",
        success: function(res) {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("electivesDataList");
            common_vendor.index.showToast({
              title: "删除成功!",
              icon: "success"
            });
            electivesData.value = [];
          }
        }
      });
    }
    function injectToCourse() {
      if (courseDataList.value.length === 0) {
        common_vendor.index.showToast({
          title: "无选修课导入!",
          icon: "error"
        });
        return;
      }
      const electivesDataList = common_vendor.index.getStorageSync("electivesDataList") || [];
      electivesDataList.push(courseDataList.value);
      common_vendor.index.setStorageSync("electivesDataList", electivesDataList);
      electivesData.value = common_vendor.index.getStorageSync("electivesDataList");
      common_vendor.index.showToast({
        title: "导入成功!",
        icon: "success"
      });
    }
    function hiddenSelectVal(val) {
      if (isSelectTeacher.value) {
        indexData.teacher = val;
        common_vendor.index.setStorageSync("electivesTech", val);
      } else {
        indexData.classroom = val;
        common_vendor.index.setStorageSync("electivesClassroom", val);
      }
      isSelectClassroom.value = false;
      isSelectTeacher.value = false;
    }
    function selectSection(e) {
      indexData.section = sectionList[+e.detail.value];
      common_vendor.index.setStorageSync("electivesSection", indexData.section);
    }
    async function searchCourse() {
      if (indexData.classroom === "选择教室" || indexData.section === "选择节次" || indexData.teacher === "选择老师") {
        return;
      }
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      const res = await API_course.getElectivesAPI(indexData);
      courseDataList.value = res.data.data;
      common_vendor.index.hideLoading();
    }
    common_vendor.onMounted(() => {
      const {
        week,
        weekDay
      } = uilts_time.getCurrentDate();
      currentDate.week = week;
      currentDate.weekDay = weekDay;
      indexData.teacher = common_vendor.index.getStorageSync("electivesTech") || "选择老师";
      indexData.classroom = common_vendor.index.getStorageSync("electivesClassroom") || "选择教室";
      indexData.section = common_vendor.index.getStorageSync("electivesSection") || "选择节次";
      electivesData.value = common_vendor.index.getStorageSync("electivesDataList") || [];
      searchCourse();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(currentDate.week),
        b: common_vendor.t(currentDate.weekDay),
        c: isSelectTeacher.value || isSelectClassroom.value
      }, isSelectTeacher.value || isSelectClassroom.value ? {
        d: common_vendor.o(hiddenSelectVal),
        e: common_vendor.p({
          type: isSelectTeacher.value ? "teacher" : "classroom"
        })
      } : {}, {
        f: common_vendor.t(indexData.teacher),
        g: common_vendor.o(($event) => isSelectTeacher.value = true),
        h: common_vendor.t(indexData.classroom),
        i: common_vendor.o(($event) => isSelectClassroom.value = true),
        j: common_vendor.t(indexData.section),
        k: sectionList,
        l: common_vendor.o(selectSection),
        m: common_vendor.o(($event) => isSelectSection.value = true),
        n: common_vendor.o(searchCourse),
        o: !!courseDataList.value.length
      }, !!courseDataList.value.length ? {
        p: common_vendor.t(courseDataList.value[0].courseSection),
        q: common_vendor.t(sectionTimeMap[courseDataList.value[0].courseSection]),
        r: common_vendor.t(courseDataList.value[0].courseName),
        s: common_vendor.t(courseDataList.value[0].coursePosition),
        t: common_vendor.t(courseDataList.value[0].courseTeacher),
        v: common_vendor.t(courseDataList.value[0].courseWeek.replaceAll("周", "")),
        w: common_vendor.t(courseDataList.value[0].courseWeekDay)
      } : {}, {
        x: common_vendor.o(injectToCourse),
        y: common_vendor.t(electivesData.value.length),
        z: common_vendor.o(remove)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/electives/electives.js.map
