<template>
	<view class='electives'>
		<div class="title">
			<p>选修课查询</p>
		</div>
		<div class="time">
			<p>当前日期:{{currentDate.week}}{{currentDate.weekDay}}</p>
		</div>
		<wu-calendar ref="calendar" @confirm="selectDate" :insert="false"></wu-calendar>
		<div class="input-list">
			<div @click='openCalendar' class="date">
				<p>{{indexData.date}}</p>
			</div>
			<div @click='isSelectSection = true' class="section">
				<picker mode="selector" :range="sectionList" @change="selectSection">
					<view>{{indexData.section}}</view>
				</picker>
			</div>
			<div @click='isSelectPosition = true' class="section">
				<picker mode="selector" :range="positionList" @change="selectPosition">
					<view>{{indexData.position}}</view>
				</picker>
			</div>
		</div>
		<div @click='findEmptyClassroom' class="search">
			<p>查找空教室</p>
		</div>
		<div class="tips" v-if='!!emptyClassroomList.length && indexData.date !== "选择日期"'>
			<p>已成功查询到空教室 <text>{{emptyClassroomList.length}}</text> 个</p>
		</div>
		<div class="tips" v-else-if='!emptyClassroomList.length && indexData.date !== "选择日期"'>
			<p>未查到空教室</p>
		</div>x
		<div v-if='!!emptyClassroomList.length' v-for='d in emptyClassroomList' class="course">
			<div class="title">
				<p>空教室:{{d}}</p>
			</div>
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
		getEmptyClassroomAPI
	} from '@/API/course.js'
	import {
		getCurrentDate
	} from "@/uilts/time.js"


	const calendar = ref(null)
	const isSelectDate = ref(false)
	const isSelectSection = ref(false)

	const currentDate = reactive({
		week: "",
		weekDay: ""
	})
	const indexData = reactive({
		date: "选择日期",
		section: "选择节次",
		week: "",
		weekDay: "",
		position: "选择校区"
	})
	const sectionList = ["第一大节", "第二大节", "第三大节", "第四大节", "第五大节", "第六大节"]
	const positionList = ["南苑", '北苑']
	const emptyClassroomList = ref([])

	function selectPosition(e) {
		indexData.position = positionList[e.detail.value]
	}

	function selectSection(e) {
		indexData.section = sectionList[+e.detail.value]
	}

	function openCalendar() {
		calendar.value.open()
	}

	function selectDate(e) {
		const data = {
			month: e.month,
			day: e.date
		}
		indexData.date = `${e.month}月${e.date}日`
		const {
			week,
			weekDay
		} = getCurrentDate(data)
		indexData.week = week
		indexData.weekDay = weekDay
		isSelectDate.value = true
	}

	async function findEmptyClassroom() {
		if (indexData.classroom === "选择日期") {
			return
		}

		uni.showLoading({
			title: "加载中..."
		})
		const res = await getEmptyClassroomAPI(indexData)
		console.log(res);
		emptyClassroomList.value = res.data.data
		uni.hideLoading()
	}

	onMounted(() => {
		const {
			week,
			weekDay
		} = getCurrentDate()
		currentDate.week = week
		currentDate.weekDay = weekDay
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

		.tips {
			font-size: 30rpx;
			margin: 20rpx 0;
			color: #333;
			display: flex;
			align-items: center;
			justify-content: center;

			text {
				color: #0497FF;
			}
		}

		.input-list {
			width: 90vw;
			margin: 0 auto;
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 34rpx;
			text-decoration: underline;
			color: #0497FF;

			view {
				width: 200rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
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