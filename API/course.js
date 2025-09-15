import axios from "@/uilts/axios.js";
export function getCourseDataAPIplus(data) {
    return axios.get("/student/course", data);
}
export function getAllClassAPI() {
    return axios.get("/student/allClass");
}
export function getCourseUpdateLogAPI() {
    return axios.get("/common/update-log");
}
export function getTeacherCourseAPI(data) {
    return axios.get("/teacher/course", data);
}
export function getTeacherListAPI() {
    return axios.get("/teacher/allTeacherList");
}
export function getActiveClassListAPI() {
    return axios.get("/student/allClass");
}
export function getClassroomListAPI() {
    return axios.get("/classroom/list");
}
export function getClassroomCourseAPI(data) {
    return axios.get("/classroom/course", data);
}
export function getMeessageAPI() {
    return axios.get("/common/message");
}
export function getCourseForWeekAPI(data) {
    return axios.get("/student/week", data);
}
export function getTechCourseForWeekAPI(data) {
    return axios.get("/teacher/week", data);
}
export function getCourseForCalendarAPI(data) {
    data.weekList = JSON.stringify(data.weekList);
    return axios.get("/student/calendar", data);
}
export function getTechCourseForCalendarAPI(data) {
    data.weekList = JSON.stringify(data.weekList);
    return axios.get("/teacher/calendar", data);
}
export function getClassroomCourseForCalendarAPI(data) {
    data.weekList = JSON.stringify(data.weekList);
    return axios.get("/classroom/calendar", data);
}
export function getLoversCourseAPI(data) {
    return axios.get("/student/lovers", data);
}
export function getStudentWeekHasCourseDayListAPI(data) {
    return axios.get("/student/hasCourseWeekDayList", data);
}
export function getTeacherWeekHasCourseDayListAPI(data) {
    return axios.get("/teacher/hasCourseWeekDayList", data);
}
export function getClassroomWeekHasCourseDayListAPI(data) {
    return axios.get("/classroom/hasCourseWeekDayList", data);
}
export function getLostFoundListAPI() {
    return axios.get("/lost-found/list");
}
export function getTypeLostFoundListAPI(type) {
    return axios.get("/community/type", {
        type,
    });
}
export function getElectivesAPI(data) {
    return axios.get("/student/electives", data);
}

export function getNewbornAqListAPI() {
    return axios.get("/common/newborn-aq");
}
export function getNewStudentListAPI() {
    return axios.get("/common/new-student-list");
}
export function saveCareerResultAPI(careerData) {
    return axios.post("/common/career", careerData);
}
export function saveHollandResultAPI(hollandData) {
    return axios.post("/common/holland", hollandData);
}
export function getEmptyClassroomAPI(data) {
    return axios.get("/classroom/empty-classroom", data);
}
export function getAdvAPI() {
    return axios.get("/common/advertisement-img");
}
