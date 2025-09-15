"use strict";
const common_vendor = require("../../common/vendor.js");
const uilts_time = require("../../uilts/time.js");
const _sfc_main = {
  __name: "courseDate-weekDay",
  props: ["modelValue", "date", "hasCourseList"],
  emits: ["update:modelValue", "changeWeekDay"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const weekDayTimeList = common_vendor.ref([]);
    const currentDay = common_vendor.ref(0);
    const currentWeekDay = common_vendor.ref();
    const weekDayMap = {
      "1": "星期一",
      "2": "星期二",
      "3": "星期三",
      "4": "星期四",
      "5": "星期五",
      "6": "星期六",
      "7": "星期日"
    };
    function getWeekDayTime() {
      const date = props.date;
      var month = props.date.getMonth() + 1;
      const day = date.getDate();
      currentDay.value = day;
      const weekDay = date.getDay() === 0 ? 7 : date.getDay();
      currentWeekDay.value = weekDayMap[weekDay];
      const result = [];
      const right = 7 - weekDay;
      const left = 7 - right;
      for (let d = left - 1; d >= 0; d--) {
        let prevDay = day - d;
        const prevWeekDay2 = weekDay - d;
        let m = month;
        if (prevDay <= 0) {
          if (month === 1) {
            prevDay = uilts_time.monthMap[12] + prevDay;
            m = 12;
          } else {
            prevDay = uilts_time.monthMap[month - 1] + prevDay;
            m = m - 1;
          }
        }
        result.push({
          day: prevDay,
          weekDay: prevWeekDay2,
          month: m
        });
      }
      for (let d = right; d > 0; d--) {
        let nextDay = day + d;
        const nextWeekDay2 = weekDay + d;
        let m = month;
        if (m === 12 && nextDay > uilts_time.monthMap[m]) {
          nextDay = day + d - uilts_time.monthMap[month];
          m = 1;
        }
        if (nextDay > uilts_time.monthMap[month]) {
          nextDay = nextDay - uilts_time.monthMap[month];
          m = m + 1;
        }
        result.push({
          day: nextDay,
          weekDay: nextWeekDay2,
          month: m
        });
      }
      result.sort((a, b) => a.weekDay - b.weekDay);
      weekDayTimeList.value = result;
      common_vendor.index.__f__("log", "at components/courseDate-weekDay/courseDate-weekDay.vue:105", weekDayTimeList.value);
    }
    function nextWeekDay() {
      const currentIndex = props.date.getDay();
      const newDate = {
        day: props.date.getDate() + 1,
        weekDay: currentIndex + 1,
        month: props.date.getMonth() + 1
      };
      changeDay(newDate);
    }
    function prevWeekDay() {
      let currentIndex = props.date.getDay() === 0 ? "7" : props.date.getDay();
      if (currentIndex === 1) {
        currentIndex = 8;
      }
      const newDate = {
        day: props.date.getDate() - 1,
        weekDay: currentIndex - 1,
        month: props.date.getMonth() + 1
      };
      changeDay(newDate);
    }
    function changeDay(date) {
      common_vendor.index.__f__("log", "at components/courseDate-weekDay/courseDate-weekDay.vue:132", date);
      currentDay.value = date.day;
      currentWeekDay.value = weekDayMap[date.weekDay];
      emit("update:modelValue", currentWeekDay.value);
      emit("changeWeekDay", date);
    }
    __expose({
      nextWeekDay,
      prevWeekDay
    });
    common_vendor.watch(
      () => props.date,
      () => {
        getWeekDayTime();
      }
    );
    common_vendor.onMounted(() => {
      getWeekDayTime();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(weekDayTimeList.value, (date, i, i0) => {
          return {
            a: common_vendor.t(weekDayMap[date.weekDay].substring(2)),
            b: __props.hasCourseList.includes(weekDayMap[date.weekDay]) ? 1 : "",
            c: common_vendor.t(date.day),
            d: common_vendor.o(($event) => changeDay(date), i),
            e: props.modelValue === weekDayMap[date.weekDay] ? 1 : "",
            f: i
          };
        })
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/courseDate-weekDay/courseDate-weekDay.js.map
