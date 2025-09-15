<template>
	<view class="content-bottom" v-if='isShowSelect'>
		<!-- MBTI职业性格测试 -->
		<view class="text">
			<view class="fk"></view>
			<view class="title">
				<text>MBTI职业性格测试</text>
			</view>
		</view>

		<view class="nav">
			<view class="bus">
				<view class="img">
					<image src="../../static/mbti1.jpg"></image>
				</view>
				<view class="con">
					<view class="name">简洁版【28道】</view>
					<view class="price">免费</view>
					<button class="btn" type="button" @click="showCareer">立即测试</button>
				</view>
			</view>
		</view>
		<!-- 分割线 -->
		<view class="fgx"></view>
		<!-- 霍兰德职业兴趣测试 -->
		<view class="text">
			<view class="fk"></view>
			<view class="title">
				<text>霍兰德职业兴趣测试</text>
			</view>
		</view>

		<view class="nav">
			<view class="bus">
				<view class="img">
					<image src="../../static/霍兰德.jpg"></image>
				</view>
				<view class="con">
					<view class="name">标准版【90道】</view>
					<view class="price">免费</view>
					<button class="btn" type="button" @click="showHolland">立即测试</button>
				</view>
			</view>
		</view>
	</view>
	<Career v-if='selectValue === "career"'></Career>
	<Holland v-if='selectValue === "holland"'></Holland>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	const isShowSelect = ref(true)
	const selectValue = ref("")

	function showCareer() {
		isShowSelect.value = false
		selectValue.value = "career"
	}

	function showCareer70() {
		isShowSelect.value = false
	}

	function showHolland() {
		isShowSelect.value = false
		selectValue.value = "holland"
	}
</script>

<style lang="scss">
	/* pages/second/second.wxss */
	/* MBTI职业性格测试 */
	.content-bottom {
		margin-top: 5px;
		/* border: red solid 1px; */
	}

	.fk {
		height: 40px;
		width: 8px;
		background-color: rgb(82, 229, 255);
		margin: 10px 20px;
	}

	.text {
		display: flex;
		color: #5c616e;
		flex-direction: row;
		/* justify-content: center;左右居中 */
		align-items: center;
		/* 上下居中 */
		position: relative;
		/* border: red solid 1px; */
	}

	.title {
		width: 100%;
		font-weight: bolder;
		font-size: 20px;
	}

	.bus {
		width: 90%;
		height: 240rpx;
		display: flex;
		justify-content: space-around;
		border: solid rgb(157, 240, 255) 1px;
		margin: auto auto 8px;
		border-radius: 6px;
		align-items: center;
	}

	.bus .img {
		width: 40%;
		height: 80%;
		border: rgb(138, 138, 138) solid 1px;
	}

	.bus .con {
		/* border: red solid 1px; */
		width: 60%;
		height: 80%;
		/* 相对定位 */
		position: relative;
		overflow: hidden;
	}

	.bus image {
		width: 100%;
		height: 100%;
	}

	.con .name {
		font-size: 16px;
		margin-top: 2px;
		font-weight: bold;
		padding-left: 20px;
		padding-top: 8px;
		opacity: 0.8;

	}

	.con .price {
		margin-top: 30px;
		font-size: 12px;
		padding-left: 20px;
		color: #fcc734;
		margin-bottom: 10px;
	}

	.con .btn {
		width: 36%;
		color: #ffffff;
		background-color: rgb(141, 236, 253);
		font-size: 12px;
		padding: 5px 7px 5px 7px;
		display: inline;
		border-radius: 10px;
		position: absolute;
		right: 14px;
		bottom: 12px;

	}

	/* 分割线 */
	.fgx {
		border: rgb(224, 224, 224) solid;
		margin-top: 15px;
	}
</style>