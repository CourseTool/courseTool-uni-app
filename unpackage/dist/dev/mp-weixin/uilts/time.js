"use strict";
const common_vendor = require("../common/vendor.js");
const API_config = require("../API/config.js");
exports.COURSE_CONFIG = {};
async function getCourseConfig() {
  exports.COURSE_CONFIG = await API_config.getCourseConfigAPISync();
  common_vendor.index.setStorageSync("course-config", exports.COURSE_CONFIG);
}
const timeStampMap = {
  第一大节: "8:30 10:00",
  第二大节: "10:20 11:50",
  第三大节: "14:00 15:30",
  第四大节: "15:50 17:20",
  第五大节: "18:40 20:10",
  第六大节: "20:20 21:50"
};
function genMonthMap() {
  const defaultMonthMap = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  };
  let year = (/* @__PURE__ */ new Date()).getFullYear();
  if (year % 4 === 0 && year % 100 != 0 || year % 400 === 0) {
    defaultMonthMap[2] = 29;
  }
  return defaultMonthMap;
}
var monthMap = genMonthMap();
const weekDayMap = {
  0: "星期日",
  1: "星期一",
  2: "星期二",
  3: "星期三",
  4: "星期四",
  5: "星期五",
  6: "星期六"
};
function calcTotal(date) {
  const { month, day } = date;
  let result = 0;
  for (let d = 0; d < month - 1; d++) {
    result += monthMap[d + 1];
  }
  result += day;
  return result;
}
function getCurrentDate(data) {
  const date = /* @__PURE__ */ new Date();
  if (data) {
    date.setFullYear(data.year || date.getFullYear());
    if (data.month >= 13) {
      date.setFullYear(date.getFullYear() + 1);
      date.setMonth(data.month - 13);
      date.setDate(data.day);
    } else {
      date.setFullYear(data.year || date.getFullYear());
      date.setMonth(data.month - 1);
      date.setDate(data.day);
    }
  } else {
    date.setMonth(date.getMonth());
  }
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekDay = date.getDay();
  const d = {
    month,
    day
  };
  let week = calcTotal(d) - exports.COURSE_CONFIG.disDay;
  if (week < 0) {
    week = calcTotal({ month: 12, day: 31 }) + calcTotal(d) - exports.COURSE_CONFIG.disDay;
  }
  let index = Math.floor(week / 7) + 1;
  return {
    week: index,
    weekStr: `第${index}周`,
    weekDay: `${weekDayMap[weekDay]}`
  };
}
function getDateByWeek(week) {
  const result = [];
  const date = /* @__PURE__ */ new Date();
  date.setDate(exports.COURSE_CONFIG.start_day);
  date.setMonth(exports.COURSE_CONFIG.start_month - 1);
  const weekDayMap2 = {
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
    7: "日"
  };
  for (let i = 1; i < week; i++) {
    date.setDate(date.getDate() + 7);
    if (date.getDate() > monthMap[date.getMonth()]) {
      date.setMonth(date.getMonth() + 1);
    }
  }
  for (let i = 0; i < 7; i++) {
    result.push({
      weekDay: weekDayMap2[i + 1],
      day: date.getDate()
    });
    date.setDate(date.getDate() + 1);
  }
  return result;
}
function getDateByWeekandWeekDay(data) {
  common_vendor.index.__f__("log", "at uilts/time.js:201", data);
  let week = "";
  if (data.week.length === 4) {
    week = +data.week.substring(1, 3) - 1;
  } else {
    week = +data.week.substring(1, 2) - 1;
  }
  const weekDay = Object.values(weekDayMap).indexOf(data.weekDay);
  const date = /* @__PURE__ */ new Date();
  date.setDate(exports.COURSE_CONFIG.start_day);
  date.setMonth(exports.COURSE_CONFIG.start_month - 1);
  date.setFullYear(exports.COURSE_CONFIG.start_year || date.getFullYear());
  for (let i = 0; i < week; i++) {
    date.setDate(date.getDate() + 7);
  }
  const day = weekDay === 0 ? 7 : weekDay - 1;
  date.setDate(date.getDate() + day);
  const month = date.getMonth() + 1;
  const m = month.toString().padStart(2, 0);
  const d = date.getDate();
  const y = date.getFullYear();
  common_vendor.index.__f__("log", "at uilts/time.js:222", y);
  return `${y}-${m}-${d}`;
}
function getMonthByWeek(week, year = (/* @__PURE__ */ new Date()).getFullYear()) {
  common_vendor.index.__f__("log", "at uilts/time.js:232", week);
  if (week < 1)
    throw new Error("周次不能小于 1");
  const start = new Date(year, 0, 1);
  const daysOffset = (week - 1) * 7;
  const target = new Date(start);
  target.setDate(start.getDate() + daysOffset);
  return target.getMonth() + 1;
}
exports.getCourseConfig = getCourseConfig;
exports.getCurrentDate = getCurrentDate;
exports.getDateByWeek = getDateByWeek;
exports.getDateByWeekandWeekDay = getDateByWeekandWeekDay;
exports.getMonthByWeek = getMonthByWeek;
exports.monthMap = monthMap;
exports.timeStampMap = timeStampMap;
//# sourceMappingURL=../../.sourcemap/mp-weixin/uilts/time.js.map
