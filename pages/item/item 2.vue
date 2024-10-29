<template>
	<div class="item">
		<view class="link">
			软件学院2-406web项目组
		</view>
		<view class='link'>
			项目组官网: <uni-link href="http://8.129.161.191" text="http://8.129.161.191" color="#007BFF"></uni-link>
		</view>
		<view @click="a" class="csdn">
			个人博客: <uni-link text="https://blog.csdn.net/m0_57301042?type=blog" color="#007BFF"></uni-link>
		</view>
	</div>
</template>

<script setup>
	function a() {
		uni.navigateTo({
			url: "https://blog.csdn.net/m0_57301042?type=blog"
		})
	}
</script>

<style lang="scss">
	.item {
		width: 80vw;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		font-size: 32rpx;
		flex-direction: column;
		margin: 0 auto;
		color: #333;

		view {
			margin-top: 20rpx;
		}
	}
</style>