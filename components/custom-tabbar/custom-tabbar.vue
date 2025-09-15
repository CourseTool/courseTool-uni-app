<template>
	<view class="tabBar">
		<view class="cont">
			<block v-for="(item,index) in list" :key="index" class="cont-item">
				<view @click="switchTab(item.pagePath,index)" class='item' :class='{"selected":selected === index}'>
					<image :src=" selected===index ? item.selectedIconPath : item.iconPath">
					</image>
					<view :class="{'txt': true,'selectedColor': selected === index ? true : false}">{{item.text}}</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			selected: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				color: "#fff",
				selectedColor: "#6777FD",
				list: [{
						"text": "首页",
						"pagePath": "pages/home/home",
						"iconPath": "../../static/nav/首页.png",
						"selectedIconPath": "../../static/nav/首页(1).png"
					},
					{
						"text": "推荐",
						"pagePath": "pages/community/community",
						"iconPath": "../../static/nav/文档(1).png",
						"selectedIconPath": "../../static/nav/文档.png"
					},
					{
						"text": "更多功能",
						"pagePath": "pages/more-fn/more-fn",
						"iconPath": "../../static/nav/功能1(2).png",
						"selectedIconPath": "../../static/nav/功能1(2).png"
					},
					{
						"text": "新生答疑",
						"pagePath": "pages/newborn-aq/newborn-aq",
						"iconPath": "../../static/nav/意见(1).png",
						"selectedIconPath": "../../static/nav/意见.png"
					},
					{
						"text": "我的",
						"pagePath": "pages/my/my",
						"iconPath": "../../static/nav/我的(3).png",
						"selectedIconPath": "../../static/nav/我的(2).png"
					}
				]
			}
		},
		methods: {
			switchTab(path) {
				path = path.split("/").pop();
				uni.redirectTo({
					url: `/pages/${path}/${path}`
				})
			}
		},
	}
</script>

<style lang="scss">
	.tabBar {
		z-index: 100;
		width: 100%;
		height: 130rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		font-size: 28rpx;
		background: url("../../static/tabbar-bg.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center center;
		color: #636363;
	}

	.cont {
		z-index: 0;
		display: flex;
		justify-content: space-between;
		item-align: center;

		.item:nth-child(3) {
			image {
				width: 40rpx;
				height: 40rpx;
				padding: 10rpx;
				border-radius: 50%;
				background-color: #fff;
				transform: scale(1.2) translateY(-30rpx);
				background-color: #0497FF;
			}

			.txt {
				margin-top: 4rpx;
			}
		}

		.item {
			font-size: 24rpx;
			position: relative;
			width: 15%;
			text-align: center;
			padding: 0;
			display: block;
			height: auto;
			line-height: 1;
			margin: 0;
			background-color: inherit;
			overflow: initial;
			justify-content: center;
			align-items: center;
			padding-top: 20rpx;
		}

		.selected {
			color: #217EFD;
		}

		image {
			width: 43rpx;
			height: 43rpx;
		}

		.txt {
			margin-top: 20rpx;
		}
	}
</style>