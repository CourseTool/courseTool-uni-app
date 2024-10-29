<template>
	<view class='content'>
		<view class="header">
			<view class="user-info-box">
				<view class="user-info">
					<view class="user-pic">
						<image src="../../static/wode.png" mode="">
						</image>
					</view>
					<view class="user-name">
						<text>{{activeType === "teacher" ? "教师" : "学生"}}</text>
					</view>
					<view class="user-class">
						<text>{{activeVal}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="fn-list">
			<view class="content">
				<ul class="list">
					<li class="fn">
						<view class="left-title">
							<view class="icon">
								<uni-icons type='contact' size='30'></uni-icons>
							</view>
							<view class="title">
								<text>选择角色</text>
							</view>
						</view>
						<view class="val">
							<picker @change="changeActiveType" :value="activeTypeIndex" :range="selectTypeList">
								<view class="uni-input">{{selectTypeList[activeTypeIndex]}}</view>
							</picker>
						</view>
					</li>
					<li class="fn">
						<view class="left-title">
							<view class="icon">
								<uni-icons type='search' size='30'></uni-icons>
							</view>
							<view class="title">
								<text>{{activeType === "teacher" ? "显示教师" : "显示班级"}}</text>
							</view>
						</view>
						<view @click="selectVal" class="val">
							<span>{{activeVal}}</span>
						</view>
					</li>
					<li @click="gotoEvaluate" class="fn">
						<view class="left-title">
							<view class="icon">
								<uni-icons type='star-filled' size='30'></uni-icons>
							</view>
							<view class="title">
								<text>体验评价</text>
							</view>
						</view>
						<view class="val">
							<span>去评价</span>
						</view>
					</li>
					<li @click='gotoCustom' class="fn">
						<view class="left-title">
							<view class="icon">
								<uni-icons type='star-filled' size='30'></uni-icons>
							</view>
							<view class="title">
								<text>自定义首页</text>
							</view>
						</view>
						<view class="val">
							<span>去设置</span>
						</view>
					</li>
				</ul>
			</view>
		</view>
		<select-class @hide-select-class='hiddenSelectVal' v-if='isShowSelectVal' :type='activeType'></select-class>
		<custom-tabbar :selected="4"></Custom-tabbar>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue'
	import {
		onShow
	} from '@dcloudio/uni-app'

	const isShowSelectVal = ref(false)
	const selectTypeList = ["暂未选择", "学生", "教师"]
	const activeTypeIndex = ref(0)
	const activeType = ref()
	const activeVal = ref()

	function gotoEvaluate() {
		uni.navigateTo({
			url: "/pages/evaluate/evaluate"
		})
	}

	function gotoCustom() {
		uni.navigateTo({
			url: "/pages/custom/custom"
		})
	}

	function changeActiveType(e) {
		activeTypeIndex.value = e.detail.value;
		activeType.value = selectTypeList[activeTypeIndex.value] === "教师" ? "teacher" : "student"
		uni.clearStorageSync("cacheCourse")
		uni.setStorageSync('home-active-type', activeType.value)
		if (activeType.value === 'teacher') {
			activeVal.value = "吴宇飞"
			uni.setStorageSync("home-active-val", "吴宇飞")
		} else {
			activeVal.value = "软件2303班"
			uni.setStorageSync("home-active-val", "软件2303班")
		}
	}

	function selectVal() {
		if (activeType.value === '暂未选择') {
			uni.showToast({
				title: "请先选择角色!",
				icon: "error"
			})
			return
		}
		isShowSelectVal.value = true
	}

	function hiddenSelectVal(val) {
		isShowSelectVal.value = false
		activeVal.value = val
		uni.showToast({
			title: "设置成功!",
			icon: 'success'
		})
		uni.clearStorageSync("cacheCourse")
		uni.setStorageSync('home-active-type', activeType.value)
		uni.setStorageSync('home-active-val', val)
	}

	onShow(() => {
		activeType.value = uni.getStorageSync('home-active-type')
		if (!activeType.value) {
			activeType.value = "暂未选择"
			activeTypeIndex.value = selectTypeList.indexOf(activeType.value)
			activeVal.value = uni.getStorageSync('home-active-val') || "暂未选择"
			return
		}
		const searchVal = activeType.value === "teacher" ? "教师" : "学生"
		activeTypeIndex.value = selectTypeList.indexOf(searchVal)
		activeVal.value = uni.getStorageSync('home-active-val') || "暂未选择"
	})
</script>

<style lang="scss">
	page>.content {
		height: 100vh;
		background-color: #f3f3f3;

		.header {
			height: 250rpx;
			background-color: #244fc7;
			padding: 20rpx;

			.user-info-box {
				width: 85vw;
				height: 300rpx;
				position: absolute;
				top: 70rpx;
				left: 50%;
				transform: translateX(-50%);
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #fff;
				border-radius: 20rpx;

				.user-info {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-between;

					&>view {
						margin: 5rpx 0;
					}

					.user-name {
						font-size: 36rpx;
						color: #000;
						font-weight: bold;
					}

					.user-class {
						font-size: 20rpx;
						color: #333;
					}

					.user-pic {
						image {
							width: 120rpx;
							height: 120rpx;
							border-radius: 50%;
							border: 1px solid #ccc;
						}
					}
				}
			}
		}

		.fn-list {
			width: 85vw;
			background-color: #fff;
			margin: 0 auto;
			margin-top: 100rpx;
			border-radius: 20rpx;

			.content {
				padding: 10rpx 20rpx;

				.list {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-between;

					&>.fn:not(:last-child) {
						border-bottom: 1px solid #f3f3f3;
					}

					.fn {
						width: 100%;
						height: 100rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.left-title {
							display: flex;
							align-items: center;

							.title {
								margin-left: 10rpx;
								font-size: 28rpx;
							}
						}

						.val {
							font-size: 28rpx;
							color: #0497FF;
							text-decoration: underline;
						}
					}

				}
			}
		}
	}
</style>