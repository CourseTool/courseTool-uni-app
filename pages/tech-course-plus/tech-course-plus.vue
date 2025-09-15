<template>
    <view class="course-plus" v-if="isShowPage">
        <div class="header">
            <div class="right-week">
                <picker @change="changeWeek" :value="weekIndex" :range="weekList">
                    <view class="uni-input">{{ weekList[weekIndex] }}<uni-icons color="#fff" type="down" size="22"></uni-icons> </view>
                </picker>
            </div>
            <div @click="isShowSelectClass = true" class="center-class">
                <p style="text-decoration: underline">{{ indexData.teacherName }}(更改)</p>
            </div>
            <div @click="gotoCurrent" style="text-decoration: underline" class="right-reset">
                <p>今天</p>
            </div>
            <select-class type="teacher" @hide-select-class="hiddenSelectClass" v-if="isShowSelectClass"></select-class>
        </div>
        <div class="course-calendar">
            <div class="top-week-day">
                <div class="week-day-item" v-for="d in weekDayList">
                    <p>{{ d.weekDay }}</p>
                    <p>{{ d.day }}</p>
                </div>
            </div>
            <div class="content-main">
                <div class="left-section">
                    <div class="section-item">
                        <p>一</p>
                        <p>8.30</p>
                        <p>|</p>
                        <p>10.00</p>
                    </div>
                    <div class="section-item">
                        <p>二</p>
                        <p>10.20</p>
                        <p>|</p>
                        <p>11.50</p>
                    </div>
                    <div class="section-item">
                        <p>三</p>
                        <p>14.00</p>
                        <p>|</p>
                        <p>15.30</p>
                    </div>
                    <div class="section-item">
                        <p>四</p>
                        <p>15.50</p>
                        <p>|</p>
                        <p>17.20</p>
                    </div>
                    <div class="section-item">
                        <p>五</p>
                        <p>18.40</p>
                        <p>|</p>
                        <p>20.10</p>
                    </div>
                    <div class="section-item">
                        <p>六</p>
                        <p>20.20</p>
                        <p>|</p>
                        <p>21.50</p>
                    </div>
                </div>
                <div class="right-course-list">
                    <div v-for="data in weekCourseList" class="course-list one">
                        <view class="course-plus-item empty" v-for="i in 6" :key="i">
                            <p>没课</p>
                        </view>
                        <course-plus-item :isTeacher="true" :data="d" v-for="(d, i) in data" :key="i"></course-plus-item>
                    </div>
                </div>
            </div>
        </div>
    </view>
</template>

<script setup>
import { getTechCourseForWeekAPI } from "@/API/course.js";
import { ref, onMounted, watch } from "vue";
import { getCurrentDate, getDateByWeek } from "@/uilts/time.js";

const isShowPage = ref(false);
const weekCourseList = ref([]);
const indexData = ref({
    teacherName: "",
    week: "",
});
const isShowSelectClass = ref(false);
const weekList = ref([]);
const weekIndex = ref(0);
const weekDayList = ref([]);

function gotoCurrent() {
    const { weekStr } = getCurrentDate();
    indexData.value.week = weekStr;
    weekIndex.value = weekList.value.indexOf(weekStr);
    weekDayList.value = getDateByWeek(weekIndex.value + 1);
}

function changeWeek(e) {
    weekIndex.value = e.detail.value;
    indexData.value.week = weekList.value[weekIndex.value];
}

function initWeekList() {
    for (let i = 1; i <= 25; i++) {
        weekList.value.push("第" + i + "周");
    }
    const { weekStr } = getCurrentDate();
    indexData.value.week = weekStr;
    weekIndex.value = weekList.value.indexOf(weekStr);
}

function hiddenSelectClass(val) {
    indexData.value.teacherName = val;
    isShowSelectClass.value = false;
    getCourseData();
    uni.setStorageSync("home-active-type", "teacher");
    uni.setStorageSync("home-active-val", val);
}

function groupTechCourseList() {
    const result = {
        星期一: [],
        星期二: [],
        星期三: [],
        星期四: [],
        星期五: [],
        星期六: [],
        星期日: [],
    };
    weekCourseList.value.forEach(d => {
        result[d.courseWeekDay].push(d);
    });
    return result;
}

async function getCourseData() {
    uni.showLoading({
        title: "加载中....",
    });
    weekCourseList.value = [];
    const res = await getTechCourseForWeekAPI(indexData.value);
    weekCourseList.value = res.data.data;
    weekCourseList.value = groupTechCourseList();
    setTimeout(() => {
        uni.hideLoading();
        isShowPage.value = true;
    }, 150);
}

watch(indexData.value, () => {
    getCourseData();
});

onMounted(() => {
    initWeekList();
    indexData.value.teacherName = uni.getStorageSync("home-active-type") === "teacher" ? uni.getStorageSync("home-active-val") : "吴宇飞";
    weekDayList.value = getDateByWeek(weekIndex.value + 1);
});
</script>

<style lang="scss">
.course-plus {
    .header {
        padding: 20rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .right-week {
            width: 190rpx;
            height: 70rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #0497ff;
            color: #fff;
            border-radius: 20rpx;

            :deep(.uni-input) {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            :deep(.uniui-down) {
                margin-left: 10rpx;
            }

            view {
                margin-right: 20rpx;
            }
        }
    }

    .course-calendar {
        margin-top: 10rpx;

        .top-week-day {
            background-color: #fafafa;
            padding: 10rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 24rpx;
            color: #333;
            padding-left: 60rpx;

            .week-day-item {
                width: 100rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
            }
        }

        .content-main {
            padding: 10rpx;
            padding-top: 0;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;

            .left-section {
                font-size: 18rpx;
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-direction: column;
                margin-right: 15rpx;
                height: 85vh;

                view {
                    text-align: center;
                }

                .section-item {
                    view:first-child {
                        font-size: 22rpx;
                        font-weight: bolder;
                    }
                }

                .section-item:first-child {
                    margin-top: 70rpx;
                }
            }

            .right-course-list {
                width: 90vw;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: flex-start;

                .empty {
                    width: 55rpx;
                    height: 160rpx;
                    padding: 15rpx;
                    border-radius: 10rpx;
                    font-size: 20rpx;
                    background-color: #fff !important;
                    border: 1px solid #c3d8ee !important;
                    color: #6598d9 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .empty {
                    margin-top: 25rpx;
                }

                .course-list {
                    width: 100rpx;
                    height: 100%;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    flex-direction: column;
                }
            }

            // .left-section {
            // 	font-size: 20rpx;
            // 	color: #333;

            // 	.section-item {
            // 		margin-top: 70rpx;
            // 	}
            // }
        }
    }
}
</style>
