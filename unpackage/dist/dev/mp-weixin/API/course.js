"use strict";
const uilts_axios = require("../uilts/axios.js");
function getCourseDataAPIplus(data) {
  return uilts_axios.request.get("/student/course", data);
}
function getCourseUpdateLogAPI() {
  return uilts_axios.request.get("/common/update-log");
}
function getTeacherCourseAPI(data) {
  return uilts_axios.request.get("/teacher/course", data);
}
function getTeacherListAPI() {
  return uilts_axios.request.get("/teacher/allTeacherList");
}
function getActiveClassListAPI() {
  return uilts_axios.request.get("/student/allClass");
}
function getClassroomListAPI() {
  return uilts_axios.request.get("/classroom/list");
}
function getClassroomCourseAPI(data) {
  return uilts_axios.request.get("/classroom/course", data);
}
function getMeessageAPI() {
  return uilts_axios.request.get("/common/message");
}
function getCourseForWeekAPI(data) {
  return uilts_axios.request.get("/student/week", data);
}
function getTechCourseForWeekAPI(data) {
  return uilts_axios.request.get("/teacher/week", data);
}
function getCourseForCalendarAPI(data) {
  data.weekList = JSON.stringify(data.weekList);
  return uilts_axios.request.get("/student/calendar", data);
}
function getTechCourseForCalendarAPI(data) {
  data.weekList = JSON.stringify(data.weekList);
  return uilts_axios.request.get("/teacher/calendar", data);
}
function getClassroomCourseForCalendarAPI(data) {
  data.weekList = JSON.stringify(data.weekList);
  return uilts_axios.request.get("/classroom/calendar", data);
}
function getLoversCourseAPI(data) {
  return uilts_axios.request.get("/student/lovers", data);
}
function getStudentWeekHasCourseDayListAPI(data) {
  return uilts_axios.request.get("/student/hasCourseWeekDayList", data);
}
function getTeacherWeekHasCourseDayListAPI(data) {
  return uilts_axios.request.get("/teacher/hasCourseWeekDayList", data);
}
function getClassroomWeekHasCourseDayListAPI(data) {
  return uilts_axios.request.get("/classroom/hasCourseWeekDayList", data);
}
function getTypeLostFoundListAPI(type) {
  return uilts_axios.request.get("/community/type", {
    type
  });
}
function getElectivesAPI(data) {
  return uilts_axios.request.get("/student/electives", data);
}
function getNewbornAqListAPI() {
  return uilts_axios.request.get("/common/newborn-aq");
}
function getEmptyClassroomAPI(data) {
  return uilts_axios.request.get("/classroom/empty-classroom", data);
}
function getAdvAPI() {
  return uilts_axios.request.get("/common/advertisement-img");
}
exports.getActiveClassListAPI = getActiveClassListAPI;
exports.getAdvAPI = getAdvAPI;
exports.getClassroomCourseAPI = getClassroomCourseAPI;
exports.getClassroomCourseForCalendarAPI = getClassroomCourseForCalendarAPI;
exports.getClassroomListAPI = getClassroomListAPI;
exports.getClassroomWeekHasCourseDayListAPI = getClassroomWeekHasCourseDayListAPI;
exports.getCourseDataAPIplus = getCourseDataAPIplus;
exports.getCourseForCalendarAPI = getCourseForCalendarAPI;
exports.getCourseForWeekAPI = getCourseForWeekAPI;
exports.getCourseUpdateLogAPI = getCourseUpdateLogAPI;
exports.getElectivesAPI = getElectivesAPI;
exports.getEmptyClassroomAPI = getEmptyClassroomAPI;
exports.getLoversCourseAPI = getLoversCourseAPI;
exports.getMeessageAPI = getMeessageAPI;
exports.getNewbornAqListAPI = getNewbornAqListAPI;
exports.getStudentWeekHasCourseDayListAPI = getStudentWeekHasCourseDayListAPI;
exports.getTeacherCourseAPI = getTeacherCourseAPI;
exports.getTeacherListAPI = getTeacherListAPI;
exports.getTeacherWeekHasCourseDayListAPI = getTeacherWeekHasCourseDayListAPI;
exports.getTechCourseForCalendarAPI = getTechCourseForCalendarAPI;
exports.getTechCourseForWeekAPI = getTechCourseForWeekAPI;
exports.getTypeLostFoundListAPI = getTypeLostFoundListAPI;
//# sourceMappingURL=../../.sourcemap/mp-weixin/API/course.js.map
