<template>
	<view class='newborn-aq'>
		<view class="question-item" v-for='(d,i) in newbornAqList'>
			<view class="title">
				{{i+1}}.{{d.title}}
			</view>
			<view class="answer">
				{{d.content}}
			</view>
		</view>
		<view class="question-item" v-for='(d,i) in newbornAqList'>
			<view class="title">
				3.关于学校周围的商场
			</view>
			<view class="answer">
				学校旁边走路10分钟左右有一个才子汇商城 走路30分钟，有一个正荣财富中心 其次还有望城步行街
			</view>
		</view>
		<custom-tabbar :selected="3"></Custom-tabbar>
	</view>
</template>

<script setup>
	import {
		getNewbornAqListAPI
	} from '@/API/course.js'
	import {
		onMounted,
		ref
	} from 'vue';

	const newbornAqList = ref([])

	onMounted(async () => {
		const res = await getNewbornAqListAPI()
		newbornAqList.value = res.data.data
	})
</script>

<style lang="scss">
	.newborn-aq {
		padding: 20rpx;
		height: 100vh;
		background: #f5f5f5;

		.question-item {
			margin: 40rpx 0;

			.title {
				font-size: 40rpx;
				color: #000;
				font-weight: bold;
			}

			.answer {
				margin-top: 10rpx;
				margin-left: 40rpx;
				font-size: 28rpx;
				color: #444;
				line-height: 1.5;
				letter-spacing: 5rpx;
			}
		}
	}
</style>