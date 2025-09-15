<template>
    <view class="lovers-course" v-if="isShowPage">
        <div class="header">
            <div class="male">
                <p>男:</p>
                <p @click="isShowMaleSelectClass = true" style="text-decoration: underline">{{ maleClass }}</p>
                <select-class v-if="isShowMaleSelectClass" type="student" @hide-select-class="selectMaleClass"></select-class>
            </div>
            <div class="icon">
                <uni-icons style="margin-right: -30rpx" color="#6598d9" type="heart-filled" size="26"></uni-icons>
                <uni-icons color="#FFCCE1" type="heart-filled" size="26"></uni-icons>
            </div>
            <div class="female">
                <p>女:</p>
                <p @click="isShowFemaleSelectClass = true" style="text-decoration: underline">{{ femaleClass }}</p>
                <select-class v-if="isShowFemaleSelectClass" type="student" @hide-select-class="selectFemaleClass"></select-class>
            </div>
        </div>
        <div @click="openCalendar" class="date">
            <p style="text-decoration: underline">{{ indexData.month }}月{{ indexData.day }}日</p>
            <p class="week">{{ indexData.week }}{{ indexData.weekDay }}</p>
            <wu-calendar :lunar="true" :date="currentDate" ref="calendar" @confirm="selectDate" :insert="false"></wu-calendar>
        </div>
        <div class="course-list" v-if="Object.keys(courseDataList).length !== 0">
            <div class="course-item" v-for="(data, z) in courseDataList" :key="z">
                <div class="course" v-for="(d, i) in data">
                    <div class="top-index" v-if="i === 0">
                        <div class="section">
                            <p>{{ d.courseSection }}</p>
                        </div>
                        <div class="time">
                            <p>{{ timeStampMap[d.courseSection].replace(" ", "-") }}</p>
                        </div>
                    </div>
                    <div class="bottom-course" :class="{ female: d.courseClass === femaleClass }">
                        <div class="name">
                            <p class="title">课程:</p>
                            <p class="value">{{ d.courseName }}</p>
                        </div>
                        <div class="icon" v-if="i === 1">
                            <uni-icons style="margin-right: -30rpx" color="#6598d9" type="heart-filled" size="26"></uni-icons>
                            <uni-icons color="#FFCCE1" type="heart-filled" size="26"></uni-icons>
                        </div>
                        <div class="position">
                            <p class="title">地点:</p>
                            <p class="value">{{ d.coursePosition }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="empty" v-else>
            <p>你们今天没课噢,祝你们生活愉快</p>
        </div>
    </view>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { getLoversCourseAPI } from "@/API/course.js";
import { getCurrentDate, timeStampMap } from "@/uilts/time.js";

const maleClass = ref("");
const femaleClass = ref("");
const isShowMaleSelectClass = ref(false);
const isShowFemaleSelectClass = ref(false);
const isShowPage = ref(false);
const indexData = reactive({
    maleClass,
    femaleClass,
    week: "",
    weekDay: "",
    month: "",
    day: "",
});
const courseDataList = ref([]);
const calendar = ref(null);
const currentDate = ref("");
// 节次排序
const sectionSortIndex = {
    第一大节: 1,
    第二大节: 2,
    第三大节: 3,
    第四大节: 4,
    第五大节: 5,
    第六大节: 6,
};

function sortTeacherCourseSection() {
    const a = Object.values(courseDataList.value).sort((a, b) => {
        return sectionSortIndex[a[0].courseSection] - sectionSortIndex[b[0].courseSection];
    });
    const result = {};
    Object.keys(sectionSortIndex).forEach((k, i) => {
        if (a[i]) {
            result[k] = a[i];
        }
    });
    courseDataList.value = result;
}

function openCalendar() {
    calendar.value.open();
}

function selectDate(e) {
    const data = {
        month: e.month,
        day: e.date,
        year: e.year,
    };
    currentDate.value = `${data.year}-${data.month}-${data.day}`;
    const { weekStr, weekDay } = getCurrentDate(data);
    indexData.week = weekStr;
    indexData.weekDay = weekDay;
    indexData.day = e.date;
    indexData.month = e.month;
    getCourse();
}

function selectMaleClass(val) {
    maleClass.value = val;
    isShowMaleSelectClass.value = false;
    getCourse();
    uni.setStorageSync("lovers-male-class", val);
}

function selectFemaleClass(val) {
    femaleClass.value = val;
    isShowFemaleSelectClass.value = false;
    getCourse();
    uni.setStorageSync("lovers-female-class", val);
}

async function getCourse() {
    uni.showLoading({
        title: "加载中...",
    });
    const res = await getLoversCourseAPI(indexData);
    courseDataList.value = res.data.data;
    sortTeacherCourseSection();
    uni.hideLoading();
    isShowPage.value = true;
}

onMounted(() => {
    const { weekStr, weekDay } = getCurrentDate();
    const date = new Date();
    indexData.week = weekStr;
    indexData.weekDay = weekDay;
    indexData.day = date.getDate();
    indexData.month = date.getMonth() + 1;
    indexData.maleClass = uni.getStorageSync("lovers-male-class") || "软件2303班";
    indexData.femaleClass = uni.getStorageSync("lovers-female-class") || "大数据会计2305班";
    getCourse();
});
</script>

<style lang="scss">
.lovers-course {
    min-height: 100vh;
    padding-bottom: 30rpx;
    background-color: #fbeded;

    .header {
        padding: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f3f3f3;

        .icon {
            width: fit-content;
            margin: 0 20rpx;
        }

        > view {
            width: 280rpx;
            display: flex;
            align-items: center;
            word-break: keep-all;
        }

        .male {
            justify-content: flex-end;
            color: #6598d9;
        }

        .female {
            justify-content: flex-start;
            color: #f286e5;
        }
    }

    .date {
        margin-top: 20rpx;
        padding: 20rpx;
        font-size: 34rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        font-size: 44rpx;
        font-weight: bolder;
        letter-spacing: 5rpx;

        .week {
            font-size: 30rpx;
        }
    }

    .course-list {
        padding: 0 20rpx;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        margin-top: 20rpx;

        .course-item {
            margin-top: 30rpx;
            width: 94vw;

            .course:first-child {
                .bottom-course {
                    margin-top: 20rpx;
                }
            }

            .course {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;

                .top-index {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    color: #333;
                    margin-right: 20rpx;
                    font-weight: bold;

                    > view {
                        width: fit-content;
                        word-break: keep-all;
                    }

                    .time {
                        color: #3c3c3c;
                        font-size: 24rpx;
                    }
                }

                .bottom-course {
                    width: 68vw;
                    padding: 10rpx 15rpx;
                    background-color: #e9f3fb;
                    border-radius: 10rpx;
                    border: 1px solid #c3d8ee;
                    position: relative;

                    .icon {
                        margin: 0;
                        position: absolute;
                        top: 0;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 1;
                    }

                    > view {
                        margin: 10rpx 0;
                        display: flex;
                        align-items: flex-start;
                        justify-content: flex-start;
                        color: #6598d9;

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

                .female {
                    background-color: #ffddee;
                    border-color: #ffcce1;

                    > view {
                        color: #f286e5;
                    }
                }
            }
        }
    }

    .empty {
        margin-top: 36rpx;
        text-align: center;
        font-size: 34rpx;
        color: #0497ff;
    }
}
</style>
