<template>
    <view class="course-plus" :class="{ grid: currentShowType.value === 'grid' }" v-if="isShowPage">
        <div class="header">
            <div class="right-week">
                <picker @change="changeWeek" :value="weekIndex" :range="weekList">
                    <view class="uni-input">{{ weekList[weekIndex] }}<uni-icons color="#fff" type="down" size="22"></uni-icons> </view>
                </picker>
            </div>
            <div @click="isShowSelectClass = true" class="center-class">
                <p style="text-decoration: underline">{{ indexData.className }}(更改)</p>
            </div>
            <!-- <div @click="gotoCurrent" style="text-decoration: underline;" class="right-reset">
				<p>今天</p>
			</div> -->
            <div class="right-select-ui" style="text-decoration: underline">
                <picker mode="selector" :range="uiList.map(d => d.title)" @change="changeUi">
                    <view>{{ currentShowType.title }}</view>
                </picker>
            </div>
            <select-class type="student" @hide-select-class="hiddenSelectClass" v-if="isShowSelectClass"></select-class>
        </div>
        <div class="course-calendar">
            <div class="top-week-day">
                <div class="month" style="width: 50rpx; white-space: nowrap">
                    <p>{{ month }}月</p>
                </div>
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
                        <course-plus-item :type="currentShowType.value" :data="d" v-for="d in data.courseList" :key="d.id"></course-plus-item>
                    </div>
                </div>
            </div>
        </div>
    </view>
</template>

<script setup>
import { getCourseForWeekAPI } from "@/API/course.js";
import { ref, onMounted, watch } from "vue";
import { getCurrentDate, getDateByWeek, getMonthByWeek } from "@/uilts/time.js";

const isShowPage = ref(false);
const weekCourseList = ref([]);
const indexData = ref({
    className: "",
    week: "",
});
const isShowSelectClass = ref(false);
const weekList = ref([]);
const weekIndex = ref(0);
const weekDayList = ref([]);
const uiList = [
    {
        value: "list",
        title: "列表",
    },
    {
        value: "grid",
        title: "网格",
    },
];
const currentShowType = ref(uiList[1]);
const month = ref(0);

const sectionMap = ["第一大节", "第二大节", "第三大节", "第四大节", "第五大节", "第六大节"];
const sectionSortIndex = {
    第一大节: 1,
    第二大节: 2,
    第三大节: 3,
    第四大节: 4,
    第五大节: 5,
    第六大节: 6,
};

function changeUi(e) {
    currentShowType.value = uiList.find(d => d.title === uiList[+e.detail.value].title);
    getCourseData();
}

// function gotoCurrent() {
// 	const {
// 		week,
// 	} = getCurrentDate()
// 	indexData.value.week = week
// 	weekIndex.value = weekList.value.indexOf(week)
// 	weekDayList.value = getDateByWeek(weekIndex.value + 1)
// }

function changeWeek(e) {
    weekIndex.value = e.detail.value;
    indexData.value.week = weekList.value[weekIndex.value];
    weekDayList.value = getDateByWeek(+weekIndex.value + 1);
    month.value = getMonthByWeek(weekIndex.value);
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
    indexData.value.className = val;
    isShowSelectClass.value = false;
    getCourseData();
    uni.setStorageSync("home-active-type", "student");
    uni.setStorageSync("home-active-val", val);
}

function fillCourseList() {
    if (weekCourseList.value.length === 0) {
        weekCourseList.value = new Array(7).fill({
            courseList: {},
        });
        weekCourseList.value.forEach(d => {
            sectionMap.forEach(s => {
                d.courseList[s] = {
                    isEmpty: true,
                    courseSection: s,
                };
            });
        });
    }
    weekCourseList.value.forEach(d => {
        const sectionList = Object.keys(d.courseList);
        sectionMap.forEach(s => {
            if (!sectionList.includes(s)) {
                d.courseList[s] = {
                    isEmpty: true,
                    courseSection: s,
                };
            }
        });
    });
}

function gropCourseList() {
    function _isSame(d, c) {
        return d.courseName === c.courseName && sectionSortIndex[d.courseSection] - sectionSortIndex[c.courseSection] === -1;
    }
    weekCourseList.value.forEach(d => {
        let prevCourse = null;
        for (let k in d.courseList) {
            if (!prevCourse) {
                prevCourse = d.courseList[k];
                continue;
            }
            const c = d.courseList[k];
            if (_isSame(prevCourse, c)) {
                delete d.courseList[k];
                prevCourse["isContinuous"] = true;
                d.courseList[k] = prevCourse;
            } else {
                prevCourse = d.courseList[k];
            }
        }
    });
}

async function getCourseData() {
    uni.showLoading({
        title: "加载中....",
    });
    weekCourseList.value = [];
    const res = await getCourseForWeekAPI(indexData.value);
    weekCourseList.value = res.data.data;
    if (currentShowType.value.value === "list") {
        fillCourseList();
    } else {
        gropCourseList();
    }
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
    indexData.value.className = uni.getStorageSync("home-active-type") === "student" ? uni.getStorageSync("home-active-val") : "软件2303班";
    weekDayList.value = getDateByWeek(weekIndex.value + 1);
    month.value = getMonthByWeek(weekIndex.value);
});
</script>

<style lang="scss">
.course-plus {
    overflow-x: hidden;

    .header {
        padding: 20rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 30rpx;
        font-weight: bold;

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

        .week-day-item {
            width: 110rpx;
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
            margin-right: 10rpx;
            height: 90vh;

            view {
                text-align: center;
            }

            .section-item {
                margin-top: 70rpx;

                view:first-child {
                    font-size: 22rpx;
                    font-weight: bolder;
                }
            }
        }

        .right-course-list {
            width: 90vw;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 95vh;

            .course-list {
                width: 110rpx;
                height: 100%;
                position: relative;
            }
        }
    }
}

.grid .course-calendar {
    .content-main {
        .left-section {
            height: 95vh;
            justify-content: center;

            .section-item {
                height: 17%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                position: relative;
                margin: 0 !important;
            }

            .section-item::after {
                content: "";
                width: 100vw;
                height: 100%;
                border-top: 2rpx dashed #ccc;
                border-bottom: 2rpx dashed #ccc;
                position: absolute;
                right: -101vw;
                top: 0;
                z-index: 100;
            }
        }

        .right-course-list {
            .course-list {
                border-right: 2rpx dashed #ccc;

                &:last-child {
                    border-right: none;
                }
            }
        }
    }
}
</style>
