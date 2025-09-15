<template>
    <view class="course" v-if="isShowPage">
        <div class="course-tools">
            <div class="class">
                <div class="title">
                    <span style="text-decoration: underline" @click="gotoPage('home')">首页</span>
                    <span @click="isShowSelectClass = true">{{ indexData.className }}<span style="text-decoration: underline">(更改)</span></span>
                    <span style="text-decoration: underline" @click="gotoCurrentDay">今天</span>
                </div>
                <select-class type="student" @hide-select-class="hiddenSelectClass" v-if="isShowSelectClass"></select-class>
            </div>
            <div class="week-day">
                <courseDate-weekDay
                    ref="weekDayComponent"
                    :hasCourseList="hasCourseWeekDayList"
                    @changeWeekDay="changeWeekDay"
                    :date="currentDate"
                    v-model="indexData.weekDay"
                ></courseDate-weekDay>
            </div>
            <courseDate-week ref="weekComponent" @selectDate="selectDate" @changeWeek="changeWeek" v-model="indexData.week"></courseDate-week>
        </div>
        <div @touchend="silder" class="course-content">
            <div class="empty" v-if="courseData.courseList.length === 0">
                <p>恭喜你,今天可以休息了</p>
            </div>
            <div v-else class="course-list">
                <!-- <courseItem :courseData='data' v-for='data in courseData.courseList' :key='data.id'></courseItem> -->
                <div class="course-item" v-for="data in courseData.courseList" :key="data.id">
                    <div class="title">
                        <image style="width: 35rpx; height: 35rpx; margin-right: 10rpx" src="../../static/时钟.png" mode=""> </image>
                        <p>{{ data.courseSection }}</p>
                        <p>{{ sectionTimeMap[data.courseSection] }}</p>
                    </div>
                    <div class="name">
                        <p>课程:</p>
                        <span>{{ data.courseName }}</span>
                    </div>
                    <div class="position">
                        <p>地点:</p>
                        <span>{{ data.coursePosition }}</span>
                    </div>
                    <div class="teacher">
                        <p>教师:</p>
                        <span>{{ data.courseTeacher }}</span>
                    </div>
                    <div class="week">
                        <p>周次:</p>
                        <span>{{ data.courseWeek.replaceAll("周", "") }}</span>
                    </div>
                </div>
            </div>
        </div>
    </view>
</template>

<script setup>
import { getCurrentDate } from "@/uilts/time.js";
import { getCourseDataAPIplus, getStudentWeekHasCourseDayListAPI } from "@/API/course.js";
import { ref, reactive, watch,onMounted } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { debounce } from "../../uilts/debounce";

const courseData = ref({
    courseList: [],
});
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
const isShowSelectClass = ref(false);
const currentDate = ref(new Date());
// 查询数据
const indexData = reactive({});
// 当前组件,用于触发当前日期时间更新
const weekComponent = ref(null);
const weekDayComponent = ref(null);
const hasCourseWeekDayList = ref([]);
const sectionSortIndex = {
    第一大节: 1,
    第二大节: 2,
    第三大节: 3,
    第四大节: 4,
    第五大节: 5,
    第六大节: 6,
};
const touchStartX = ref(0);

// function touchStart(e) {
// 	touchStartX.value = e.touches[0].clientX;
// }

// function silder(e) {
// 	let deltaX = e.changedTouches[0].clientX - touchStartX.value;
// 	if (Math.abs(deltaX) > 130) {
// 		if (deltaX >= 0) {
// 			if (currentDate.value.getDate() === 1) {
// 				uni.showToast({
// 					title: "暂不支持切换",
// 					icon: 'error'
// 				})
// 				return
// 			}

// 			if (indexData.weekDay === '星期一') {
// 				weekComponent.value.prevWeek()
// 			}
// 			weekDayComponent.value.prevWeekDay()

// 		} else {
// 			const month = currentDate.value.getMonth() + 1
// 			if (currentDate.value.getDate() === monthMap[month]) {
// 				// const newDate = new Date()
// 				// newDate.setDate(1)
// 				// newDate.setMonth(newDate.getMonth() + 1)
// 				// currentDate.value = newDate
// 				// const date = {
// 				// 	day: newDate.getDate(),
// 				// 	month: newDate.getMonth() + 1
// 				// }
// 				// changeWeekDay(date)
// 				// return
// 				uni.showToast({
// 					title: "暂不支持切换",
// 					icon: 'error'
// 				})
// 				return
// 			}
// 			if (indexData.weekDay === '星期日') {
// 				weekComponent.value.nextWeek()
// 			}
// 			weekDayComponent.value.nextWeekDay()
// 		}
// 	}
// }

function sortCourseSection() {
    courseData.value.courseList.sort((a, b) => {
        return sectionSortIndex[a.courseSection] - sectionSortIndex[b.courseSection];
    });
}

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
    indexData.className = uni.getStorageSync("home-active-type") === "student" ? uni.getStorageSync("home-active-val") : "软件2303班";
    currentDate.value = new Date();
    const date = {
        month: currentDate.value.getMonth() + 1,
        day: currentDate.value.getDate(),
    };
    weekComponent.value.setCurrentTime(date);
    weekComponent.value.getCurrentWeek();
}

function gotoPage(index) {
    uni.navigateBack({
        url: `/pages/${index}/${index}`,
    });
}

function hiddenSelectClass(val) {
    isShowSelectClass.value = false;
    indexData.className = val;
    uni.setStorageSync("home-active-type", "student");
    uni.setStorageSync("home-active-val", val);
    getCourseData();
    getWeekHasCourseDayList();
}

function changeWeek(newDate) {
    console.log(newDate);
    currentDate.value = new Date(newDate);
}

function injectElectives() {
    const electivesDataList = uni.getStorageSync("electivesDataList");
    if (electivesDataList) {
        electivesDataList.forEach(dataList => {
            dataList.forEach(d => {
                if (indexData.week === d.week && indexData.weekDay === d.courseWeekDay) {
                    courseData.value.courseList.push(d);
                }
            });
        });
    }
}

async function getCourseData() {
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
    injectElectives();
    sortCourseSection();
    setTimeout(() => {
        uni.hideLoading();
    }, 100);
}
async function getWeekHasCourseDayList() {
    const electivesWeekDayList = uni.getStorageSync("electivesDataList") || [];
    const weekStr = `第${indexData.week}周`;
    const data = {
        className: indexData.className,
        week: weekStr,
    };
    const res = await getStudentWeekHasCourseDayListAPI(data);

    hasCourseWeekDayList.value = res.data.data;
    electivesWeekDayList.forEach(dataList => {
        dataList.some(d => {
            if (indexData.week === d.week) {
                hasCourseWeekDayList.value.push(d.courseWeekDay);
                return true;
            }
        });
    });
}

watch(
    () => indexData.week,
    debounce(() => {
        getCourseData();
        getWeekHasCourseDayList();
    }, 100)
);
watch(
    () => indexData.weekDay,
    debounce(() => {
        getCourseData();
    }, 100)
);

onMounted(async () => {
    isShowPage.value = true;
    const { week, weekDay } = getCurrentDate();
    indexData.week = week;
    indexData.weekDay = weekDay;
    indexData.className = uni.getStorageSync("home-active-type") === "student" ? uni.getStorageSync("home-active-val") : "软件2303班";
});
</script>

<style lang="scss">
.course {
    height: 100vh;
    overflow-x: hidden;

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
        width: 95%;
        height: 80vh;
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        margin: 0 auto;
        margin-top: 20rpx;

        .empty {
            width: 100vw;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding: 20rpx;
            font-size: 36rpx;
        }

        .course-list {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;

            .course-item {
                width: 100%;
                padding: 5px;
                border-radius: 10rpx;
                margin: 10px;
                font-size: 30rpx;
                background-color: #e9f3fb;
                border: 1px solid #c3d8ee;

                .title {
                    font-size: 34rpx;
                    color: #000;
                    padding-bottom: 20rpx;
                    border-bottom: 2px solid #0497ff;
                    align-items: center;
                }

                > view {
                    color: #333;
                    margin: 10px;
                    display: flex;
                    align-items: first baseline;
                    justify-content: flex-start;

                    view {
                        font-weight: bolder;
                        margin-right: 15rpx;
                        color: #333;
                        width: fit-content;
                        word-break: keep-all;
                    }
                }
            }
        }
    }
}
</style>
