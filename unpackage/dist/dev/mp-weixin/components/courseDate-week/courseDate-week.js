"use strict";
const common_vendor = require("../../common/vendor.js");
const uilts_time = require("../../uilts/time.js");
require("../../uilts/axios.js");
const _sfc_main = {
  __name: "courseDate-week",
  props: ["modelValue"],
  emits: ["update:modelValue", "changeWeek", "selectDate"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const currentWeek = common_vendor.ref();
    const currentTime = common_vendor.ref();
    const currentDate = common_vendor.ref(/* @__PURE__ */ new Date());
    const cacheWeek = common_vendor.ref();
    const courseConfig = common_vendor.ref({});
    let startDate = "";
    let endDate = "";
    const weekDayMap = {
      1: "星期一",
      2: "星期二",
      3: "星期三",
      4: "星期四",
      5: "星期五",
      6: "星期六",
      0: "星期日"
    };
    function nextWeek() {
      if (currentWeek.value >= 25) {
        common_vendor.index.showToast({
          title: "已是最大周数",
          icon: "error"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      currentWeek.value += 1;
      const nextWeekDate = new Date(currentDate.value);
      const nextDay = currentDate.value.getDate() + 7;
      let month = null;
      if (nextWeekDate.getMonth() + 1 === 12 && nextDay > uilts_time.monthMap[nextWeekDate.getMonth() + 1]) {
        nextWeekDate.setFullYear(nextWeekDate.getFullYear() + 1);
        let day2 = nextDay - uilts_time.monthMap[12];
        nextWeekDate.setMonth(0);
        nextWeekDate.setDate(day2);
        month = 1;
      } else {
        month = currentDate.value.getMonth() + 1;
        if (nextDay > uilts_time.monthMap[month]) {
          nextWeekDate.setDate(nextDay - uilts_time.monthMap[month]);
          month++;
          nextWeekDate.setMonth(month - 1);
        } else {
          nextWeekDate.setDate(nextDay);
        }
      }
      currentDate.value = nextWeekDate;
      const day = currentDate.value.getDate();
      currentTime.value = `${month}月${day}日`;
      emit("update:modelValue", currentWeek.value);
      emit("changeWeek", nextWeekDate);
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 50);
    }
    function prevWeek() {
      if (currentWeek.value <= 1) {
        common_vendor.index.showToast({
          title: "已是最小周数",
          icon: "error"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      currentWeek.value -= 1;
      const prevWeekDate = new Date(currentDate.value);
      const prevDay = currentDate.value.getDate() - 7;
      const month = currentDate.value.getMonth() + 1;
      if (prevWeekDate.getMonth() + 1 === 1 && prevDay <= 0) {
        prevWeekDate.setFullYear(prevWeekDate.getFullYear() - 1);
        let day = uilts_time.monthMap[12] - Math.abs(prevDay);
        prevWeekDate.setMonth(11);
        prevWeekDate.setDate(day);
      } else {
        if (prevDay <= 0) {
          prevWeekDate.setMonth(month - 2);
          prevWeekDate.setDate(uilts_time.monthMap[month - 1] + prevDay);
        } else {
          prevWeekDate.setDate(prevDay);
        }
      }
      currentDate.value = prevWeekDate;
      currentTime.value = `${currentDate.value.getMonth() + 1}月${currentDate.value.getDate()}日`;
      emit("update:modelValue", currentWeek.value);
      emit("changeWeek", prevWeekDate);
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 50);
    }
    function getCurrentTime() {
      const cMonth = currentDate.value.getMonth() + 1;
      const cDay = currentDate.value.getDate();
      currentTime.value = `${cMonth}月${cDay}日`;
    }
    function setCurrentTime(date) {
      currentDate.value = new Date(currentDate.value);
      currentDate.value.setDate(date.day);
      currentDate.value.setMonth(date.month - 1);
      currentTime.value = `${date.month}月${date.day}日`;
    }
    function getCurrentWeek() {
      const cMonth = currentDate.value.getMonth() + 1;
      const cDay = currentDate.value.getDate();
      common_vendor.index.__f__("log", "at components/courseDate-week/courseDate-week.vue:142", 1111);
      const data = uilts_time.getCurrentDate({
        month: cMonth,
        day: cDay,
        year: currentDate.value.getFullYear()
      });
      currentWeek.value = data.week;
    }
    function selectDate(e) {
      var date = e.detail.value.split("-");
      date.shift();
      const d = {
        month: date[0].replace("0", ""),
        day: date[1].replace("0", "")
      };
      setCurrentTime(d);
      getCurrentWeek();
      emit("update:modelValue", currentWeek.value);
      emit("changeWeek", currentDate.value);
      const weekDay = currentDate.value.getDay();
      emit("selectDate", weekDayMap[weekDay]);
    }
    common_vendor.watch(
      () => props.modelValue,
      (_, nv) => {
        if (nv.modelValue === cacheWeek.value) {
          getCurrentTime();
        }
      }
    );
    __expose({
      setCurrentTime,
      getCurrentWeek,
      nextWeek,
      prevWeek
    });
    common_vendor.onMounted(async () => {
      startDate = uilts_time.COURSE_CONFIG.start_date;
      endDate = uilts_time.COURSE_CONFIG.end_date;
      common_vendor.index.__f__("log", "at components/courseDate-week/courseDate-week.vue:185", startDate, endDate);
      courseConfig.value = uilts_time.COURSE_CONFIG;
      getCurrentTime();
      cacheWeek.value = props.modelValue;
      currentWeek.value = props.modelValue;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(prevWeek),
        b: common_vendor.t(currentTime.value),
        c: currentTime.value,
        d: common_vendor.unref(startDate),
        e: common_vendor.unref(endDate),
        f: common_vendor.o(selectDate),
        g: common_vendor.t(props.modelValue),
        h: common_vendor.o(nextWeek)
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/courseDate-week/courseDate-week.js.map
