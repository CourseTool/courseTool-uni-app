<template>
	<view class="">
		<p class='tel' @click='copy'>联系电话:16620481556(点击复制)</p>
		<image style='width:100vw;height:25000rpx;' :src="url" mode=""></image>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	import {
		getAdvAPI
	} from '../../API/course';

	const url = ref("")

	function copy() {
		uni.setClipboardData({
			data: "16620481556",
			success: function() {
				uni.showToast({
					title: "复制成功",
					icon: "success"
				})
			}
		})
	}

	onMounted(async () => {
		const res = await getAdvAPI()
		url.value = res.data.data
	})
	// uni.showLoading({
	// 	title: "加载中..."
	// })
	// uni.downloadFile({
	// 	// 示例 url，并非真实存在
	// 	url: 'https://chenjue.online:3000/main.pdf',
	// 	success: function(res) {
	// 		const filePath = res.tempFilePath
	// 		console.log(res);

	// 		uni.openDocument({
	// 			filePath: filePath,
	// 			showMenu: true,
	// 			success: function(res) {
	// 				console.log('打开文档成功')
	// 				uni.hideLoading()
	// 			}
	// 		})

	// 	}
	// })
</script>

<style lang="scss">
	.tel {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 50rpx 0;
		font-size: 30rpx;
		color: #333;
	}
</style>