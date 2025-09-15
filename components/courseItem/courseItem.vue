<template>
	<div class="course-item">
		<div class="title">
			<p>{{props.courseData.courseSection}}</p>
			<p>{{sectionTimeMap[props.courseData.courseSection]}}</p>
		</div>
		<div class="name">
			<p>课程:</p>
			<span>{{props.courseData.courseName}}</span>
		</div>
		<div class="position">
			<p>地点:</p>
			<span>{{props.courseData.coursePosition}}</span>
		</div>
		<div class="teacher">
			<p>教师:</p>
			<span>{{props.courseData.courseTeacher}}</span>
		</div>
		<div class="week">
			<p>周次:</p>
			<span>{{props.courseData.courseWeek.replaceAll("周","")}}</span>
		</div>
	</div>
</template>

<script setup>
	import {
		defineProps
	} from 'vue'

	const sectionTimeMap = {
		"第一大节": "8.30-10.00",
		"第二大节": "10.20-11.50",
		"第三大节": "14.00-15.30",
		"第四大节": "15.50-17.20",
		"第五大节": "18.40-20.10",
		"第六大节": "20.20-21.50"
	}

	const props = defineProps(["courseData"])
</script>

<style lang="scss">
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
</style>