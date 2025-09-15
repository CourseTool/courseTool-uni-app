<template>
	<view class='dorm-allocation' v-if='!dormData'>
		<div class="title">
			<p>宿舍分配调查问卷</p>
		</div>
		<div class="tips">
			<p>以下问卷，仅作寝室分配，严格保密，不涉及任何其他的用途，望认真填写</p>
		</div>
		<view class="questionnaire">
			<question-item v-for='(d,i) in questionList' :data='d' :index='i+1'
				@inputAnswer='saveAnswer'></question-item>
		</view>
		<view @click='complete' class="success-bth">
			<p>完成</p>
		</view>
	</view>
	<view class="success" v-else>
		<p>您的宿舍序号为:{{dormData}}</p>
	</view>
</template>

<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import {
		dormAllocationAPI,
		getDormQuestionListAPI
	} from '../../API/dorm';

	const questionList = ref()
	const answerData = reactive({})
	const dormData = ref({})

	async function complete() {
		console.log(answerData);
		if (Object.keys(answerData).length < 15) {
			uni.showToast({
				title: "您还有问题没有填写!",
				icon: 'error'
			})
			return
		}
		const res = await dormAllocationAPI(answerData)
		dormData.value = res.data.data
		uni.setStorageSync("dormData", res.data.data)
	}

	function saveAnswer(data) {
		console.log("answerData", answerData);
		if (!data.title) {
			answerData["name"] = data.value
			answerData['student_id'] = data.id
		} else {
			answerData[data.title] = data.value
		}
	}

	async function getDormQuestionList() {
		const res = await getDormQuestionListAPI()
		questionList.value = res.data.data
	}


	onMounted(() => {
		getDormQuestionList()
		dormData.value = uni.getStorageSync("dormData") || null
		console.log(dormData.value);
	})
</script>

<style lang="scss">
	.success {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 50rpx;
		color: #333;
	}

	.dorm-allocation {
		padding: 20rpx;

		>.title {
			font-size: 40rpx;
			margin: 20rpx 0;
			text-align: center;
			font-weight: bold;
		}

		.tips {
			color: #999;
			font-size: 24rpx;
			margin: 20rpx 0;
		}

		.questionnaire {}

		.success-bth {
			width: 400rpx;
			height: 80rpx;
			border-radius: 10rpx;
			background-color: #0497FF;
			font-size: 32rpx;
			text-align: center;
			line-height: 80rpx;
			margin: 20rpx auto;
			font-weight: bold;
			color: #fff;
		}
	}
</style>