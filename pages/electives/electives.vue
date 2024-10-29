<template>
	<view class='electives'>
		<div class="title">
			<p>选修课查询</p>
		</div>
		<div class="time">
			<p>当前日期:{{currentDate.week}}{{currentDate.weekDay}}</p>
		</div>
		<select-class :type='isSelectTeacher ? "teacher" : "classroom"' v-if='isSelectTeacher || isSelectClassroom'
			@hide-select-class='hiddenSelectVal'></select-class>
		<div class="input-list">
			<div @click='isSelectTeacher = true' class="teacher">
				<p>{{indexData.teacher}}</p>
			</div>
			<div @click='isSelectClassroom = true' class="position">
				<p>{{indexData.classroom}}</p>
			</div>
			<div @click='isSelectSection = true' class="section">
				<picker mode="selector" :range="sectionList" @change="selectSection">
					<view>{{indexData.section}}</view>
				</picker>
			</div>
		</div>
		<div @click='searchCourse' class="search">
			<p>查询</p>
		</div>
		<div v-if='!!courseDataList.length' class="course">
			<div class="title">
				<p>{{courseDataList[0].courseSection}}</p>
				<p>{{sectionTimeMap[courseDataList[0].courseSection]}}</p>
			</div>
			<div class="name">
				<p>课程:</p>
				<span>{{courseDataList[0].courseName}}</span>
			</div>
			<div class="position">
				<p>地点:</p>
				<span>{{courseDataList[0].coursePosition}}</span>
			</div>
			<div class="teacher">
				<p>教师:</p>
				<span>{{courseDataList[0].courseTeacher}}</span>
			</div>
			<div class="week">
				<p>周次:</p>
				<span>{{courseDataList[0].courseWeek.replaceAll("周","")}}</span>
			</div>
			<div class="week">
				<p>星期:</p>
				<span>{{courseDataList[0].courseWeekDay}}</span>
			</div>
		</div>
		<div v-else class='empty'>
			<p>无选修课</p>
		</div>
		<div @click="injectToCourse" class="inject">
			<p>导入到课表</p>

		</div>
		<p class='injected-count'>你当前已导入{{electivesData.length}}节选修课</p>
		<div @click='remove' class="remove">
			<p>删除选修课</p>
		</div>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		onMounted
	} from 'vue'
	import {
		getElectivesAPI
	} from '@/API/course.js'
	import {
		getCurrentDate
	} from "@/uilts/time.js"


	const isSelectTeacher = ref(false)
	const isSelectClassroom = ref(false)
	const isSelectSection = ref(false)

	const currentDate = reactive({
		week: "",
		weekDay: ""
	})
	const indexData = reactive({
		teacher: "选择老师",
		classroom: "选择教室",
		section: "选择节次"
	})
	const sectionList = ["第一大节", "第二大节", "第三大节", "第四大节", "第五大节", "第六大节"]
	const courseDataList = ref([])
	const sectionTimeMap = {
		"第一大节": "8.30-10.00",
		"第二大节": "10.20-11.50",
		"第三大节": "14.00-15.30",
		"第四大节": "15.50-17.20",
		"第五大节": "18.40-20.10",
		"第六大节": "20.20-21.50"
	}
	const electivesData = ref([])

	function remove() {
		uni.showModal({
			title: '提示',
			content: '你确定要删除所有已添加到选修课嘛?',
			success: function(res) {
				if (res.confirm) {
					uni.removeStorageSync("electivesDataList")
					uni.showToast({
						title: "删除成功!",
						icon: 'success'
					})
					electivesData.value = []
				}
			}
		});
	}

	function injectToCourse() {
		if (courseDataList.value.length === 0) {
			uni.showToast({
				title: "无选修课导入!",
				icon: 'error'
			})
			return
		}
		const electivesDataList = uni.getStorageSync("electivesDataList") || []
		electivesDataList.push(courseDataList.value)
		uni.setStorageSync("electivesDataList", electivesDataList)
		electivesData.value = uni.getStorageSync("electivesDataList")
		uni.showToast({
			title: "导入成功!",
			icon: 'success'
		})
	}

	function hiddenSelectVal(val) {
		if (isSelectTeacher.value) {
			indexData.teacher = val
			uni.setStorageSync('electivesTech', val)
		} else {
			indexData.classroom = val
			uni.setStorageSync('electivesClassroom', val)
		}
		isSelectClassroom.value = false
		isSelectTeacher.value = false
	}

	function selectSection(e) {
		indexData.section = sectionList[+e.detail.value]
		uni.setStorageSync('electivesSection', indexData.section)
	}

	async function searchCourse() {

		if (indexData.classroom === "选择教室" || indexData.section === "选择节次" || indexData.teacher === "选择老师") {
			return
		}

		uni.showLoading({
			title: "加载中..."
		})
		const res = await getElectivesAPI(indexData)
		courseDataList.value = res.data.data
		uni.hideLoading()
	}

	onMounted(() => {
		const {
			week,
			weekDay
		} = getCurrentDate()
		currentDate.week = week
		currentDate.weekDay = weekDay
		indexData.teacher = uni.getStorageSync("electivesTech") || "选择老师"
		indexData.classroom = uni.getStorageSync("electivesClassroom") || "选择教室"
		indexData.section = uni.getStorageSync("electivesSection") || "选择节次"
		electivesData.value = uni.getStorageSync("electivesDataList") || []
		searchCourse()
	})
</script>

<style lang="scss">
	.electives {
		padding: 20rpx 0;

		.title {
			text-align: center;
			font-size: 50rpx;
		}

		.time {
			text-align: center;
			font-size: 34rpx;
			margin: 20rpx 0;
		}

		.input-list {
			width: 80vw;
			margin: 0 auto;
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 34rpx;
			text-decoration: underline;
			color: #0497FF;
		}

		.search {
			margin: 0 auto;
			margin-top: 30rpx;
			width: 200rpx;
			height: 70rpx;
			background: #0497FF;
			color: #fff;
			font-size: 32rpx;
			text-align: center;
			line-height: 70rpx;
			border-radius: 10rpx;
		}

		.course {
			width: 85vw;
			padding: 5px;
			border-radius: 10rpx;
			margin: 0 auto;
			margin-top: 30rpx;
			font-size: 30rpx;
			background-color: #e9f3fb;
			border: 1px solid #c3d8ee;

			.title {
				font-size: 32rpx;
				color: #000;
				padding-bottom: 20rpx;
				border-bottom: 2px solid #0497FF;
			}

			>view {
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

		.empty {
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 44rpx;
			color: #0497FF;
		}

		.inject {
			width: 180rpx;
			height: 70rpx;
			background: #34A853;
			border-radius: 10rpx;
			color: #fff;
			margin: 0 auto;
			text-align: center;
			line-height: 70rpx;
			margin-top: 30rpx;
			font-size: 24rpx;
		}

		.injected-count {
			margin: 10rpx 0;
			text-align: center;
		}

		.remove {
			width: 180rpx;
			height: 70rpx;
			background: #EA4335;
			border-radius: 10rpx;
			color: #fff;
			margin: 0 auto;
			text-align: center;
			line-height: 70rpx;
			margin-top: 30rpx;
			font-size: 24rpx;
		}
	}
</style>