<template>
	<view class='course' v-if="isShowPage">
		<div class="course-tools">
			<div class="class">
				<div class="title">
					<span style='text-decoration: underline;' @click="gotoPage('home')">首页</span>
					<span @click="isShowSelectTeacher=true">{{indexData.teacherName}}<span
							style="text-decoration: underline;">(更改)</span></span>
					<span style='text-decoration: underline;' @click="gotoCurrentDay">今天</span>
				</div>
				<select-class type="teacher" @hide-select-class="hiddenSelectTeacher"
					v-if="isShowSelectTeacher"></select-class>
			</div>
			<div class="week-day">
				<courseDate-weekDay ref='weekDayComponent' :hasCourseList="hasCourseWeekDayList"
					@changeWeekDay="changeWeekDay" :date="currentDate" v-model="indexData.weekDay"></courseDate-weekDay>
			</div>
			<courseDate-week ref="weekComponent" @selectDate="selectDate" @changeWeek="changeWeek"
				v-model="indexData.week"></courseDate-week>
		</div>
		<div @touchstart="touchStart" @touchend='silder' class="course-content">
			<div class="empty" v-if="courseData.length === 0">
				<p>老师,您今天没课哦</p>
			</div>
			<div v-else class="course-list">
				<div class="course-item" v-for='data in courseData.courseList' :key='data.id'>
					<div class="title">
						<p>{{data.courseSection}}</p>
						<p>{{sectionTimeMap[data.courseSection]}}</p>
					</div>
					<div class="name">
						<p>课程:</p>
						<span>{{data.courseName}}</span>
					</div>
					<div class="position">
						<p>地点:</p>
						<span>{{data.coursePosition}}</span>
					</div>
					<div class="teacher">
						<p>班级:</p>
						<span>{{data.courseClass}}</span>
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script setup>
	import {
		getCurrentDate,
		monthMap
	} from "@/uilts/time.js"
	import {
		getTeacherCourseAPI,
		getTeacherWeekHasCourseDayListAPI
	} from '@/API/course.js'
	import {
		ref,
		onMounted,
		reactive,
		watch
	} from 'vue'

	const courseData = ref({
		courseList: []
	})
	const sectionTimeMap = {
		"第一大节": "8.30-10.00",
		"第二大节": "10.20-11.50",
		"第三大节": "14.00-15.30",
		"第四大节": "15.50-17.20",
		"第五大节": "18.40-20.10",
		"第六大节": "20.20-21.50"
	}
	// 是否加载页面
	const isShowPage = ref(false)
	const isShowSelectTeacher = ref(false)
	const currentDate = ref(new Date())
	// 查询数据
	const indexData = reactive({})
	// 当前组件,用于触发当前日期时间更新
	const weekComponent = ref(null)
	const weekDayComponent = ref(null)
	const hasCourseWeekDayList = ref([])
	const touchStartX = ref(0)

	const sectionSortIndex = {
		"第一大节": 1,
		"第二大节": 2,
		"第三大节": 3,
		"第四大节": 4,
		"第五大节": 5,
		"第六大节": 6,
	}

	function sortCourseSection() {
		if (courseData.value.length === 0) return
		const sortObj = {}
		const sortIndex = Object.keys(courseData.value.courseList).sort((a, b) => sectionSortIndex[a] - sectionSortIndex[
			b])
		for (let k of sortIndex) {
			sortObj[k] = courseData.value.courseList[k]
		}
		courseData.value.courseList = sortObj
	}

	// function silder(e) {
	// 	let deltaX = e.changedTouches[0].clientX - touchStartX.value;
	// 	if (Math.abs(deltaX) > 50) {
	// 		console.log(indexData)
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

	function selectDate(weekDay) {
		indexData.weekDay = weekDay
	}

	function changeWeekDay(date) {
		// const newDate = new Date()
		// newDate.setDate(date.day)
		// currentDate.value = newDate
		weekComponent.value.setCurrentTime(date)
	}

	function gotoCurrentDay() {
		const {
			week,
			weekDay
		} = getCurrentDate()
		indexData.week = week
		indexData.weekDay = weekDay
		indexData.teacherName = uni.getStorageSync("home-active-type") === "teacher" ? uni.getStorageSync(
			"home-active-val") : "吴宇飞"
		currentDate.value = new Date()
		const date = {
			month: currentDate.value.getMonth() + 1,
			day: currentDate.value.getDate()
		}
		weekComponent.value.setCurrentTime(date)
		weekComponent.value.getCurrentWeek()
	}

	function gotoPage(index) {
		uni.redirectTo({
			url: `/pages/${index}/${index}`
		})
	}

	function hiddenSelectTeacher(val) {
		isShowSelectTeacher.value = false
		indexData.teacherName = val
		uni.setStorageSync("home-active-type", "teacher")
		uni.setStorageSync("home-active-val", val)
		getTeacherCourseAPI()
		getWeekHasCourseDayList()
	}


	function changeWeek(newDate) {
		currentDate.value = newDate
		getWeekHasCourseDayList()
	}

	// function sortTeacherCourseSection() {
	// 	courseData.value.courseList.sort((a, b) => {
	// 		return sectionSortIndex[a.courseSection] - sectionSortIndex[b.courseSection]
	// 	})
	// }

	async function getCourseData() {
		// 旧数据库
		// const r = await getCourseDataAPI(indexData)
		// courseData.value = r.data.data;
		// 新数据库
		uni.showLoading({
			title: "加载中...",
		})
		const weekStr = `第${indexData.week}周`
		
		const {
			data
		} = await getTeacherCourseAPI({
			teacherName:indexData.teacherName,
			weekDay:indexData.weekDay,
			week:weekStr
		})
		courseData.value = data.data
		sortCourseSection()
		setTimeout(() => {
			uni.hideLoading()
		}, 230)
	}
	async function getWeekHasCourseDayList() {
		const weekStr = `第${indexData.week}周`
		
		const data = {
			teacher: indexData.teacherName,
			week:weekStr
		}
		const res = await getTeacherWeekHasCourseDayListAPI(data)
		hasCourseWeekDayList.value = res.data.data
	}

	watch(indexData, () => {
		getCourseData()
	})

	onMounted(async () => {
		isShowPage.value = true
		const {
			week,
			weekDay
		} = getCurrentDate()
		indexData.week = week
		indexData.weekDay = weekDay
		indexData.teacherName = uni.getStorageSync("home-active-type") === "teacher" ? uni.getStorageSync(
			"home-active-val") : "吴宇飞"
		getWeekHasCourseDayList()
	})
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

				>label {
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
						border-bottom: 2px solid #0497FF;
						align-items: center;
					}

					>view {
						color: #333;
						margin: 10px;
						display: flex;
						align-items: flex-start;
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