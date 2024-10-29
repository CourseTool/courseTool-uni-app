<template>
	<view class='electric'>
		<div class="code">
			<input v-model='userCode' type="text" placeholder="请输入你的宿舍号" />
		</div>
		<div @click='getElectric' class="bth">
			<p>查询</p>
		</div>
	</view>
</template>

<script setup>
	import {
		getElectricAPI
	} from '../../API/electric.js'
	import {
		ref
	} from 'vue'

	const userCode = ref('10-438')

	async function getElectric() {
		const Time = Date.now()
		const data = {
			UserCode: userCode.value,
			Time: "20240624082634",
			Sign: "a06d3e79025f47a9a4b037173cd4594f",
		}
		const res = await getElectricAPI(data)
		console.log(res.data)
	}
</script>

<style lang="scss">
	.electric {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.code {
			input {
				width: 260rpx;
				height: 60rpx;
			}
		}

		.bth {
			width: 230rpx;
			height: 70rpx;
			background-color: #0497FF;
			color: #fff;
			font-size: 30rpx;
			text-align: center;
			line-height: 70rpx;
			border-radius: 10rpx;
		}
	}
</style>