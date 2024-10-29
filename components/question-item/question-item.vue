<template>
	<view class='question-item'>
		<div class="title">
			<p>{{props.index}}.{{props.data.title}}</p>
		</div>
		<div v-if='props.data.key === "name"' class="name">
			<uni-easyinput @focus='selectName' confirm-type="next" clearable='false'
				style='font-size:20rpx;margin-top:20rpx' prefixIcon="circle" :value='studentInfo.value'>
			</uni-easyinput>
			<select-class @hide-select-class='hideSelectClass' :dataList="props.data.selectValue"
				v-if='isShowSelectName' type='custom'></select-class>
		</div>
		<div class="input" v-else-if='props.data.type === "input"'>
			<uni-easyinput confirm-type="next" clearable='false' style='font-size:20rpx;' @blur='answer'
				prefixIcon="circle">
			</uni-easyinput>
		</div>
		<div class="select" v-else-if='props.data.type === "select"'>
			<uni-data-select clearable='false' @change='answer' :localdata="props.data.selectValue"></uni-data-select>
		</div>

	</view>
</template>

<script setup>
	import {
		defineProps,
		ref,
		defineEmits
	} from 'vue'

	const props = defineProps(['data', 'index'])
	const emits = defineEmits(['inputAnswer'])
	const isShowSelectName = ref(false)
	const studentInfo = ref({})


	function hideSelectClass(value) {
		isShowSelectName.value = false
		studentInfo.value = value
		console.log(value);
		emits("inputAnswer", value)
	}

	function selectName() {
		isShowSelectName.value = true
	}

	function answer(e) {
		let value;
		if (props.data.type === 'select') {
			value = e
		} else {
			value = e.detail.value
		}
		const data = {
			title: props.data.key,
			value
		}
		console.log(data);
		emits("inputAnswer", data)
	}
	emits("inputAnswer", 1)
</script>

<style lang="scss">
	.question-item {
		margin-top: 30rpx;

		.title {
			font-size: 30rpx;

		}

		.input,
		.select {
			margin-top: 20rpx;

			.uni-easyinput {
				font-size: 20rpx;
			}
		}

		.picker {
			height: 60rpx;
			border: 1px solid #e5e5e5;
			border-radius: 10rpx;
			margin-top: 20rpx;
			line-height: 60rpx;
			padding-left: 20rpx;
		}
	}
</style>