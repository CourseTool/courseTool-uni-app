<template>
	<view v-if="props.data.isEmpty" :style="styles" class="course-plus-item  empty">
		<p>没课</p>
	</view>
	<view v-else :style="styles" class="course-plus-item" :class="{grid:props.type === 'grid'}">
		<p>{{props.data.courseName.substring(0,6)}}</p>
		<!-- <p>{{props.data.courseTeacher}}</p> -->
		<!-- <p>{{props.data.coursePosition.substring(0,7)}}</p> -->
		<p>{{getCoursePosition(props.data.coursePosition)}}</p>
		<!-- <p class='section'>{{props.data.courseSection.substring(1,2)}}</p> -->
	</view>
</template>

<script setup>
	import {
		defineProps,
		reactive,
		onMounted
	} from 'vue'

	const props = defineProps(["data", "type", "isTeacher"])
	const sectionPosMap = {
		"第一大节": 0,
		"第二大节": 1,
		"第三大节": 2,
		"第四大节": 3,
		"第五大节": 4,
		"第六大节": 5
	}

	var styles = reactive({
		borderColor: "#c3d8ee",
		backgroundColor: "#e9f3fb",
		color: "#5499DE",
		top: 0
	}, )

	function randomColor() {
		const colorMap = [{
				borderColor: "#c3d8ee",
				backgroundColor: "#e9f3fb",
				color: "#5499DE",
			},
			{
				borderColor: "#f1c3bf",
				backgroundColor: "#faf1f2",
				color: "#F55142",
			},
			{
				borderColor: "#d5cbef",
				backgroundColor: "#f1edfb",
				color: "#996BE8",
			},
			{
				borderColor: "#f5e3a4",
				backgroundColor: "#fefae0",
				color: "#F5B20A",
			}
		]
		const random = parseInt(Math.random() * colorMap.length);
		return colorMap[random]
	}

	const getPosition = (section) => {
		if (props.isTeacher) {
			return (sectionPosMap[section] * 215) + 'rpx'
		}
		return (sectionPosMap[section] * 230) + 'rpx'
	}
	const getCoursePosition = (str) => {
		if (str.replaceAll(/[\u4e00-\u9fa5]/g, "").length === 0) {
			return str
		}
		return str.replaceAll(/[\u4e00-\u9fa5]/g, "").substring(0, 7).replace("(", "").replace(")", "");
		// return str.match(/[\d]*-[\d]*/)
	}
	onMounted(() => {
		const s = randomColor()
		styles.backgroundColor = s.backgroundColor
		styles.borderColor = s.borderColor
		styles.color = s.color
		if (props.isTeacher) {
			styles.height = '165rpx;'
		}
		if (props.type === 'grid') {
			styles.height = props.data.isContinuous ? "430rpx" : "200rpx"
			styles.boxShadow = "0 0 12rpx 2rpx" + styles.color;
		}
		styles.top = getPosition(props.data.courseSection)
	})
</script>

<style lang="scss">
	.course-plus-item {
		width: 50rpx;
		height: 190rpx;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%);
		padding: 15rpx;
		background-color: #e9f3fb;
		border-radius: 10rpx;
		margin-top: 20rpx;
		border: 1px solid #c3d8ee;
		font-size: 22rpx;

		view {
			text-align: center;
			word-break: break-all;
		}

		// .section {
		// 	position: absolute;
		// 	left: 50%;
		// 	top: 50%;
		// 	transform: translate(-50%, -50%);
		// 	font-size: 70rpx;
		// 	font-weight: bold;
		// 	opacity: .5;
		// }
	}

	.grid {
		width: 70rpx;
		padding: 5rpx;
		border-radius: 15rpx;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		border: none;
	}

	.empty {
		background-color: #fff !important;
		border: 1rpx solid #c3d8ee !important;
		color: #6598d9 !important;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>