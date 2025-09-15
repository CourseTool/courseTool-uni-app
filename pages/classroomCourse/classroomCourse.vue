<template>
    <view class="course" v-if="isShowPage">
        <div class="course-tools">
            <div class="class">
                <div class="title">
                    <span style="text-decoration: underline" @click="gotoPage('home')">首页</span>
                    <span @click="isShowSelectClassroom = true">{{ indexData.classroom }}<span style="text-decoration: underline">(更改)</span></span>
                    <span style="text-decoration: underline" @click="gotoCurrentDay">今天</span>
                </div>
                <select-class type="classroom" @hide-select-class="hiddenSelectClassroom" v-if="isShowSelectClassroom"></select-class>
            </div>
            <div class="week-day">
                <courseDate-weekDay
                    :hasCourseList="hasCourseWeekDayList"
                    @changeWeekDay="changeWeekDay"
                    :date="currentDate"
                    v-model="indexData.weekDay"
                ></courseDate-weekDay>
            </div>
            <courseDate-week ref="weekComponent" @selectDate="selectDate" @changeWeek="changeWeek" v-model="indexData.week"></courseDate-week>
        </div>
        <div class="course-content">
            <div class="empty" v-if="!courseData.courseList.length">
                <p>该教室今日无课</p>
            </div>
            <div v-else class="course-list">
                <div class="course-item" v-for="data in courseData.courseList" :key="data.id">
                    <div class="title">
                        <p>{{ data.courseSection }}</p>
                        <p>{{ sectionTimeMap[data.courseSection] }}</p>
                    </div>
                    <div class="name">
                        <p>课程:</p>
                        <span>{{ data.courseName }}</span>
                    </div>
                    <div class="teacher">
                        <p>教师:</p>
                        <span>{{ data.courseTeacher }}</span>
                    </div>
                    <div class="class">
                        <p>班级:</p>
                        <span>{{ data.courseClass }}</span>
                    </div>
                </div>
            </div>
        </div>
    </view>
</template>

<script setup>
import { getCurrentDate } from "@/uilts/time.js";
import { getClassroomCourseAPI, getClassroomWeekHasCourseDayListAPI } from "@/API/course.js";
import { ref, onMounted, reactive, watch } from "vue";

const courseData = ref([]);
const sectionTimeMap = {
    第一大节: "8.30-10.00",
    第二大节: "10.20-11.50",
    第三大节: "14.00-15.30",
    第四大节: "15.50-17.20",
    第五大节: "18.40-20.10",
    第六大节: "20.20-21.50",
};
// 是否加载页面
const isShowPage = ref(false);
const isShowSelectClassroom = ref(false);
const currentDate = ref(new Date());
// 查询数据
const indexData = reactive({});
// 当前组件,用于触发当前日期时间更新
const weekComponent = ref(null);
// 节次排序
const sectionSortIndex = {
    第一大节: 1,
    第二大节: 2,
    第三大节: 3,
    第四大节: 4,
    第五大节: 5,
    第六大节: 6,
};
const hasCourseWeekDayList = ref([]);

function selectDate(weekDay) {
    indexData.weekDay = weekDay;
}

function changeWeekDay(date) {
    weekComponent.value.setCurrentTime(date);
}

function gotoCurrentDay() {
    const { week, weekDay } = getCurrentDate();
    indexData.week = week;
    indexData.weekDay = weekDay;
    indexData.classroom = uni.getStorageSync("select-classroom") || "25-303M";
    currentDate.value = new Date();
    const date = {
        month: currentDate.value.getMonth() + 1,
        day: currentDate.value.getDate(),
    };
    weekComponent.value.setCurrentTime(date.day, date.month);
    weekComponent.value.getCurrentWeek();
}

function gotoPage(index) {
    uni.redirectTo({
        url: `/pages/${index}/${index}`,
    });
}

function hiddenSelectClassroom(val) {
    isShowSelectClassroom.value = false;
    indexData.classroom = val;
    getCourseData();
    getWeekHasCourseDayList();
}

function changeWeek(newDate) {
    currentDate.value = newDate;
    getWeekHasCourseDayList();
}

function sortTeacherCourseSection() {
    // courseData.value.courseList.sort((a, b) => {
    //     return sectionSortIndex[a.courseSection] - sectionSortIndex[b.courseSection];
    // });
}

async function getCourseData() {
    // 旧数据库
    // const r = await getCourseDataAPI(indexData)
    // courseData.value = r.data.data;
    // 新数据库
    uni.showLoading({
        title: "加载中...",
    });
    const { data } = await getClassroomCourseAPI({
        week: "第" + indexData.week + "周",
        weekDay: indexData.weekDay,
        classroom: indexData.classroom,
    });
    courseData.value = data.data;
    courseData.value.courseList = Object.values(data.data.courseList);
    sortTeacherCourseSection();
    setTimeout(() => {
        uni.hideLoading();
    }, 230);
}

async function getWeekHasCourseDayList() {
    const data = {
        classroom: indexData.classroom,
        week: "第" + indexData.week + "周",
    };
    const res = await getClassroomWeekHasCourseDayListAPI(data);
    hasCourseWeekDayList.value = res.data.data;
}

watch(indexData, () => {
    getCourseData();
});

onMounted(async () => {
    isShowPage.value = true;
    const { week, weekDay, weekStr } = getCurrentDate();
    indexData.week = week;
    indexData.weekDay = weekDay;
    indexData.weekStr = weekStr;
    indexData.classroom = uni.getStorageSync("select-classroom") || "25-303M";
    getWeekHasCourseDayList();
});
</script>

<style lang="scss">
.course {
    height: 100vh;

    .course-tools {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        flex-direction: column;
        font-size: 28rpx;

        .class {
            width: 100vw;
            padding: 30rpx 0;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-weight: bold;
            background-color: #f5f5f5;
            letter-spacing: 1rpx;
            cursor: pointer;

            .title {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 20rpx;
            }

            > label {
                margin: 0 10rpx;
            }
        }
    }

    .course-content {
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        padding: 0 20rpx;
        margin-top: 20rpx;

        .empty {
            width: 100vw;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20rpx;
            font-size: 36rpx;
        }

        .course-list {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;

            .course-item {
                width: 85vw;
                padding: 5px;
                border-radius: 10rpx;
                margin: 10px;
                font-size: 30rpx;
                background-color: #e9f3fb;
                border: 1px solid #c3d8ee;

                .title {
                    font-size: 32rpx;
                    color: #000;
                    padding-bottom: 20rpx;
                    border-bottom: 2px solid #0497ff;
                }

                > view {
                    color: #333;
                    margin: 10px;
                    display: flex;
                    align-items: flex-start;
                    justify-content: flex-start;

                    view {
                        font-weight: bold;
                        margin-right: 15rpx;
                        width: fit-content;
                        word-break: keep-all;
                    }
                }
            }
        }
    }
}
</style>
