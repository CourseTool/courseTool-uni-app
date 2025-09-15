<template>
    <view class="calendar-tech-course" v-if="isShowPage">
        <div @click="isShowSelectTech = true" class="header">
            <p style="text-decoration: underline">当前教师:{{ indexData.teacherName }}更改</p>
        </div>
        <select-class v-if="isShowSelectTech" type="teacher" @hide-select-class="selectTech"></select-class>
        <uni-calendar
            @monthSwitch="changeMonth"
            :selected="fillCourseDayList"
            :insert="true"
            :lunar="true"
            :start-date="semesterDate.start_date"
            :end-date="semesterDate.end_date"
            @change="changeDate"
        />
        <div class="course-list">
            <div class="title">
                <p>{{ indexData.week }} {{ indexData.weekDay }} 课程列表</p>
            </div>
            <div v-if="courseDataList.length !== 0" class="course-item" v-for="d in courseDataList.courseList" :key="d.id">
                <div class="left-index">
                    <div class="section">
                        <p>{{ d.courseSection }}</p>
                    </div>
                    <div class="time">
                        <p>{{ timeStampMap[d.courseSection].replace(" ", "-") }}</p>
                    </div>
                </div>
                <div class="right-course">
                    <div class="name">
                        <p class="title">课程:</p>
                        <p class="value">{{ d.courseName }}</p>
                    </div>
                    <div class="position">
                        <p class="title">地点:</p>
                        <p class="value">{{ d.coursePosition }}</p>
                    </div>
                    <div class="class">
                        <p class="title">班级:</p>
                        <p class="value">{{ d.courseClass }}</p>
                    </div>
                </div>
            </div>
            <div class="empty" v-else>
                <p>今日无课</p>
            </div>
        </div>
    </view>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { getCurrentDate, timeStampMap, monthMap, getDateByWeekandWeekDay } from "@/uilts/time.js";
import { getTeacherCourseAPI, getTechCourseForCalendarAPI } from "@/API/course.js";
import { getCourseConfigAPISync } from "@/API/config.js";

const isShowSelectTech = ref(false);
const courseDataList = ref([]);
const isShowPage = ref(false);
const indexData = reactive({
    month: "",
    teacher: "",
    day: "",
    week: "",
    weekDay: "",
});
const fillCourseDayList = ref([]);
let hasCourseDayList = [];
const calendarWeekList = ref([]);
const calendarCourseDataList = ref([]);
const currentMonth = ref("");
const currentDay = ref("");
const semesterDate = ref({});

function selectTech(val) {
    indexData.teacher = val;
    isShowSelectTech.value = false;
    updateDate();
    getCourse();
    getMonthCourse();
    uni.setStorageSync("home-active-type", "teacher");
    uni.setStorageSync("home-active-val", val);
}

function changeMonth(e) {
    indexData.month = e.month;
    indexData.year = e.year;
    currentMonth.value = e.month;
    currentDay.value = 1;
    getMonthCourse();
}

async function getMonthCourse() {
    uni.showLoading({
        title: "加载中...",
    });
    await getCourseForCalendar();
    fillCalendar();
    uni.hideLoading();
}

async function getCourse() {
    uni.showLoading({
        title: "加载中...",
    });
    const res = await getTeacherCourseAPI({
        week: indexData.week,
        weekDay: indexData.weekDay,
        teacherName: indexData.teacherName,
    });
    courseDataList.value = res.data.data;
    setTimeout(() => {
        uni.hideLoading();
        isShowPage.value = true;
    }, 100);
}

function changeDate(e) {
    indexData.month = +e.month;
    indexData.day = e.date;
    const { weekDay, weekStr } = getCurrentDate(indexData);
    indexData.week = weekStr;
    indexData.weekDay = weekDay;
    getCourse();
}

async function getCourseForCalendar() {
    hasCourseDayList = [];
    genMonthWeek();
    const data = {
        weekList: calendarWeekList.value,
        teacherName: indexData.teacherName,
    };
    const res = await getTechCourseForCalendarAPI(data);
    calendarCourseDataList.value = res.data.data;
    calendarCourseDataList.value.forEach(d => {
        const date = {
            week: d.week,
            weekDay: d.weekDay,
        };
        const r = getDateByWeekandWeekDay(date);
        hasCourseDayList.push(r);
    });
}

function genMonthWeek() {
    calendarWeekList.value = [];
    const month = indexData.month;
    for (let i = 1; i <= monthMap[month]; i++) {
        const { weekStr } = getCurrentDate({
            day: i,
            month: indexData.month,
        });
        if (!calendarWeekList.value.includes(weekStr)) {
            calendarWeekList.value.push(weekStr);
        }
    }
}

function fillCalendar() {
    const fillList = [];
    const month = indexData.month;
    for (let i = 1; i <= monthMap[month]; i++) {
        const m = month.toString().padStart(2, 0);
        const day = i;
        const d = `${indexData.year}-${m}-${day}`;
        if (hasCourseDayList.includes(d)) {
            fillList.push({
                date: d,
                info: "有课",
            });
        }
    }

    fillCourseDayList.value = fillList;
}

function updateDate() {
    const date = {
        month: currentMonth.value,
        day: currentDay.value,
    };
    const { weekStr, weekDay } = getCurrentDate(date);
    indexData.week = weekStr;
    indexData.weekDay = weekDay;
}

onMounted(async () => {
    indexData.teacherName = uni.getStorageSync("home-active-type") === "teacher" ? uni.getStorageSync("home-active-val") : "吴宇飞";
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    indexData.month = month;
    indexData.day = day;
    indexData.year = year;
    currentMonth.value = month;
    currentDay.value = day;
    updateDate();
    getCourse();
    getMonthCourse();
    const data = getCourseConfigAPISync();
    semesterDate.value = data;
});
</script>

<style lang="scss">
.header {
    padding: 20rpx;
    font-size: 40rpx;
    font-weight: bold;
    color: #6598d9;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 2rpx;
}

.course-list {
    margin: 0 auto;
    padding: 20rpx 0;
    width: 95vw;
    border-top: 1px solid #ccc;

    > .title {
        font-size: 36rpx;
        font-weight: bold;
        margin: 30rpx 0;
        text-align: center;
        letter-spacing: 2rpx;
    }

    .course-item {
        margin: 20rpx 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .left-index {
            flex-basis: 21%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: #333;
            margin-right: 20rpx;

            > view {
                width: fit-content;
                word-break: keep-all;
            }

            .time {
                color: #3c3c3c;
                font-size: 22rpx;

                view {
                    word-wrap: keep-all;
                }
            }
        }

        .right-course {
            flex-basis: 78%;
            color: #6598d9;
            padding: 20rpx;
            background-color: #e9f3fb;
            border-radius: 10rpx;
            border: 1px solid #c3d8ee;

            > view {
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
            }

            .title {
                font-size: 30rpx;
                font-weight: bold;
                margin-right: 10rpx;
                width: fit-content;
                word-break: keep-all;
            }

            .value {
                font-size: 30rpx;
            }
        }
    }

    .empty {
        font-size: 40rpx;
        font-weight: bold;
        margin-top: 50rpx;
        color: #6598d9;
        text-align: center;
    }
}
</style>
