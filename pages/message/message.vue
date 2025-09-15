<template>
	<view class="message" v-html="message">

	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		getMeessageAPI
	} from '@/API/course.js'
	const message = ref("")
	async function getMessage() {
		const {
			data
		} = await getMeessageAPI()
		message.value = data.data
	}
	onMounted(() => {
		getMessage()
	})
</script>

<style lang="scss">
	.message {
		padding: 20rpx;
	}
</style>