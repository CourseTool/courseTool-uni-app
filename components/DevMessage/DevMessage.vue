<template>
	<view catchtouchmove='true' class='message'>
		<div class="inner">
			<p>{{message}}</p>
			<p>更新公告:</p>
			<p class='content'>
				在最近CourseTool因为新生的加入和在第一大节以及第三大节课的时候访问人数短时间内突增造成服务器宕机导致课表查询不了让许多同学老师无法及时的查询课表。我深感歉意没有给同学和老师们带来很好的使用体验。在下周之前我会将这个问题进行缓解保证人再多都能进行查课。
			</p>
			<p class='content'> 同时也希望各位口下留情，因为此小程序全程是一人开发与维护无法顾及到方方面面，如果有人指出小程序不足我会改进，做为一款免费使用的小程序希望大家理智的对待。谢谢!</p>
			<p class="content" @click='gotoMyBolg'>
				最后欢迎大家访问我的个人网站: <a href='www.course.pink'
					style='color:blue;text-decoration: underline;'>https://www.course.pink</a>
			</p>
			<p class='content' style='text-align: right;font-size:24rpx;font-weight:bold;margin-top:30rpx'>
				CourseTool作者
			</p>
			<p class='content' style='text-align: right;font-size:24rpx;font-weight:bold;'>
				2024年10月15日
			</p>
		</div>
		<div @click='closeMessage' class="close">
			<p>关闭</p>
		</div>
		<!-- 		<div @click='copyCode' class="close">
			<p>复制微信号</p>
		</div> -->
	</view>
</template>

<script setup>
	import {
		defineEmits,
		onMounted,
		ref
	} from 'vue'
	import {
		getMeessageAPI
	} from '@/API/course.js'

	const emit = defineEmits(["closeMessage"])
	const message = ref("")

	function copyCode() {
		uni.setClipboardData({
			data: "xiangxinyuan1314520",
			success: function() {
				uni.showToast({
					title: "复制成功",
					icon: "success"
				})
			}
		})
		closeMessage()
	}

	function gotoMyBolg() {
		uni.setClipboardData({
			data: "https://www.course.pink",
			success: function() {
				uni.showToast({
					title: "复制成功",
					icon: "success"
				})
			}
		})
		closeMessage()
	}

	async function getMessage() {
		const {
			data
		} = await getMeessageAPI()
		message.value = data.data
	}

	function closeMessage() {
		emit("closeMessage")
	}
	onMounted(() => {
		getMessage()
	})
</script>

<style lang="scss">
	.message {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 110vh;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background-color: rgba(0, 0, 0, .8);
		z-index: 9999;

		.inner {
			width: 78vw;
			z-index: 111;
			border-radius: 20rpx;
			padding: 20rpx;
			line-height: 1.8;
			font-size: 30rpx;
			letter-spacing: 2rpx;
			color: #333;
			background-color: #fff;

			view:first-child {
				font-weight: bold;
				font-family: "Lucida Handwriting";
			}

			.content {
				text-indent: 60rpx;
			}
		}

		.close {
			margin-top: 20rpx;
			width: 140rpx;
			height: 70rpx;
			background-color: #fff;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26rpx;
		}

	}
</style>