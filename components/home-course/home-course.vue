<template>
    <view class="home-course" v-if="isShowPage">
        <div class="course-update-time">
            <p>课表更新时间:{{ courseUpdateLogData.updateTime }}</p>
        </div>
        <div class="title">
            <p>{{ indexData.className }}今日课表</p>
            <p style="font-size: 32rpx; color: #333; letter-spacing: 5rpx">(第{{ indexData.week }}周{{ indexData.weekDay }})</p>
        </div>
        <div class="course-list" v-if="courseData.courseList.length !== 0">
            <div class="course-item" v-for="data in courseData.courseList" :key="data.id">
                <div class="left-index">
                    <div class="section">
                        <p>
                            {{ data.courseSection[0] }}
                            <text style="font-weight: bold; color: #000; font-size: 30rpx">{{ data.courseSection[1] }}</text>
                            {{ data.courseSection.substring(2) }}
                        </p>
                    </div>
                    <div class="time">
                        <p>{{ timeStampMap[data.courseSection].replace(" ", "-") }}</p>
                    </div>
                </div>
                <div class="right-course">
                    <div class="name">
                        <p class="title">课程:</p>
                        <p class="value">{{ data.courseName }}</p>
                    </div>
                    <div class="position">
                        <p class="title">地点:</p>
                        <p class="value">{{ data.coursePosition }}</p>
                    </div>
                    <div v-if="data.className" class="class">
                        <p class="title">班级</p>
                        <p class="value">{{ data.className }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="empty" v-else>
            <p>恭喜你,今天可以休息了!!!</p>
        </div>
    </view>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { getCurrentDate, timeStampMap } from "@/uilts/time.js";
import { getCourseDataAPIplus, getCourseUpdateLogAPI, getTeacherCourseAPI } from "@/API/course.js";
import { onLoad } from "@dcloudio/uni-app";

const isShowPage = ref(false);
const courseUpdateLogData = ref({});
const courseData = ref({
    courseList: [],
});
let indexData = reactive({
    className: "",
    week: "",
    weekDay: "",
});
watch(
    () => indexData.week,
    newVal => {
        console.log(newVal);
        if (isNaN(newVal)) {
            console.log("触发");
            const { week } = getCurrentDate();
            indexData.week = week;
        }
    }
);
const sectionSortIndex = {
    第一大节: 1,
    第二大节: 2,
    第三大节: 3,
    第四大节: 4,
    第五大节: 5,
    第六大节: 6,
};

function sortCourseSection() {
    courseData.value.courseList.sort((a, b) => {
        return sectionSortIndex[a.courseSection] - sectionSortIndex[b.courseSection];
    });
}

async function getCourseData() {
    // if (testCacheCourse()) {
    // 	uni.hideLoading()
    // 	courseData.value = uni.getStorageSync("cacheCourse").courseData
    // 	courseUpdateLogData.value = uni.getStorageSync("cacheLog")
    // 	isShowPage.value = true
    // 	return
    // }
    uni.showLoading({
        title: "加载中...",
    });
    const weekStr = `第${indexData.week}周`;
    const { data } = await getCourseDataAPIplus({
        className: indexData.className,
        weekDay: indexData.weekDay,
        week: weekStr,
    });
    courseData.value = data.data;
    courseData.value.courseList = Object.values(courseData.value.courseList);
    console.log(courseData.value);
    if (courseData.value.courseList.length != 0) {
        sortCourseSection();
    }
    setTimeout(() => {
        uni.hideLoading();
        isShowPage.value = true;
        // cacheCourse()
        // // 缓存课表更新日志
        // cacheLog()
    }, 50);
}
async function getTeacherCourse(d = indexData) {
    // if (testCacheCourse()) {
    // 	courseData.value = uni.getStorageSync("cacheCourse").courseData
    // 	courseUpdateLogData.value = uni.getStorageSync("cacheLog")
    // 	isShowPage.value = true
    // 	return
    // }
    uni.showLoading({
        title: "加载中...",
    });
    const { data } = await getTeacherCourseAPI(d);
    courseData.value.courseList = data.data;
    setTimeout(() => {
        uni.hideLoading();
        isShowPage.value = true;
    }, 50);
}

onLoad(async () => {
    const { data } = await getCourseUpdateLogAPI();
    courseUpdateLogData.value = data.data;
    indexData.className = uni.getStorageSync("home-active-val") || "软件2303班";
    const { week, weekDay } = getCurrentDate();
    indexData.week = week;
    if (!indexData.week) {
        const r = getCurrentDate();
        indexData.week = r.week;
    }
    indexData.weekDay = weekDay;

    // 查看有没有设置首页展示的内容
    const homeActiveType = uni.getStorageSync("home-active-type");
    if (homeActiveType) {
        const homeActiveVal = uni.getStorageSync("home-active-val");
        const weekStr = `第${indexData.week}周`;
        if (homeActiveType === "teacher") {
            const data = {
                teacherName: homeActiveVal,
                week: weekStr,
                weekDay,
            };
            indexData.className = homeActiveVal;
            getTeacherCourse(data);
            return;
        }
        // 设置的展示学生班级
        indexData.className = homeActiveVal;
    }
    getCourseData();
});
</script>

<style lang="scss">
.home-course {
    margin-top: 50rpx;
    padding-bottom: 30rpx;

    .course-update-time {
        margin-top: 40rpx;
        letter-spacing: 1px;
        font-weight: bold;
        text-align: center;
        font-size: 20rpx;
    }

    > .title {
        font-size: 44rpx;
        letter-spacing: 1px;
        font-weight: bold;
        text-align: center;
        margin-top: 30rpx;
    }

    .course-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;

        .course-item {
            margin-top: 30rpx;
            width: 95vw;
            display: flex;
            align-items: center;
            justify-content: center;

            .left-index {
                width: 25%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                color: #666;
                margin-right: 15rpx;

                > view {
                    font-size: 24rpx;
                    font-weight: bold;
                    width: fit-content;
                    display: flex;
                    flex-direction: column;

                    view {
                        word-break: keep-all;
                    }
                }

                .time {
                    color: #3c3c3c;
                    font-size: 24rpx;
                }
            }

            .right-course {
                width: 68vw;
                padding: 10rpx 15rpx;
                background-color: #e9f3fb;
                border-radius: 10rpx;
                border: 1px solid #c3d8ee;

                > view {
                    margin: 10rpx 0;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    color: #6598d9;
                    line-height: 40rpx;

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

                .name {
                    align-items: flex-start;
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
