<template>
    <view class="calendar-course" v-if="isShowPage">
        <div @click="isShowSelectTech = true" class="header">
            <p style="text-decoration: underline">当前班级:{{ indexData.className }}更改</p>
        </div>
        <select-class v-if="isShowSelectTech" type="student" @hide-select-class="selectTech"></select-class>
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
            <div v-if="courseDataList.courseList.length !== 0" class="course-item" v-for="d in courseDataList.courseList" :key="d.id">
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
import { getCourseDataAPIplus, getCourseForCalendarAPI } from "@/API/course.js";
import { getCourseConfigAPISync } from "@/API/config.js";

const isShowSelectTech = ref(false);

const courseDataList = ref([]);
const isShowPage = ref(false);
const indexData = reactive({
    year: "",
    month: "",
    className: "",
    day: "",
    week: "",
    weekDay: "",
});
const fillCourseDayList = ref([]);
let hasCourseDayList = ref([]);
const calendarWeekList = ref([]);
const calendarCourseDataList = ref([]);
const currentMonth = ref("");
const currentDay = ref("");
const sectionSortIndex = {
    第一大节: 1,
    第二大节: 2,
    第三大节: 3,
    第四大节: 4,
    第五大节: 5,
    第六大节: 6,
};
const semesterDate = ref({});

function sortCourseSection() {
    courseDataList.value.courseList.sort((a, b) => {
        return sectionSortIndex[a.courseSection] - sectionSortIndex[b.courseSection];
    });
}

function selectTech(val) {
    indexData.className = val;
    isShowSelectTech.value = false;
    updateDate();
    getCourse();
    getMonthCourse();
    uni.setStorageSync("home-active-type", "student");
    uni.setStorageSync("home-active-val", val);
}

function changeMonth(e) {
    if (indexData.year !== e.year) {
        indexData.month = e.month + 12;
    } else {
        indexData.month = e.month;
    }
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
    setTimeout(() => {
        uni.hideLoading();
        isShowPage.value = true;
    }, 100);
}

async function getCourse() {
    const res = await getCourseDataAPIplus({
        week: indexData.week,
        weekDay: indexData.weekDay,
        className: indexData.className,
    });
    courseDataList.value = res.data.data;
    if (courseDataList.value.length != 0) {
        courseDataList.value.courseList = Object.values(courseDataList.value.courseList);
        sortCourseSection();
    }
}

function changeDate(e) {
    indexData.month = +e.month;
    indexData.day = e.date;
    indexData.year = e.year;
    const { weekDay, weekStr } = getCurrentDate(indexData);
    indexData.weekStr = weekStr;
    indexData.week = weekStr;
    indexData.weekDay = weekDay;
    getCourse();
}

async function getCourseForCalendar() {
    hasCourseDayList.value = [];
    genMonthWeek();
    const data = {
        weekList: calendarWeekList.value,
        className: indexData.className,
    };
    const res = await getCourseForCalendarAPI(data);
    calendarCourseDataList.value = res.data.data;
    calendarCourseDataList.value.forEach(d => {
        if (!!Object.keys(d.courseList).length) {
            const date = {
                week: d.week,
                weekDay: d.weekDay,
            };
            const r = getDateByWeekandWeekDay(date);
            console.log(r);
            hasCourseDayList.value.push(r);
        }
    });
}

function genMonthWeek() {
    calendarWeekList.value = [];
    let month = indexData.month;
    if (month > 12) {
        indexData.month -= 12;
        for (let i = 1; i <= monthMap[month - 12]; i++) {
            let { weekStr } = getCurrentDate({
                day: i,
                month,
            });
            if (!calendarWeekList.value.includes(weekStr)) {
                calendarWeekList.value.push(weekStr);
            }
        }
    } else {
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
}

function fillCalendar() {
    const fillList = [];
    const month = indexData.month;
    for (let i = 1; i <= monthMap[month]; i++) {
        const m = month.toString().padStart(2, 0);
        const day = i;
        const d = `${indexData.year}-${m}-${day}`;
        if (hasCourseDayList.value.includes(d)) {
            fillList.push({
                date: d,
                info: "有课",
                data: {
                    custom: "自定义信息",
                    name: "自定义消息头",
                },
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
    indexData.className = uni.getStorageSync("home-active-type") === "student" ? uni.getStorageSync("home-active-val") : "软件2303班";
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    indexData.month = month;
    indexData.day = day;
    indexData.year = date.getFullYear();
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
