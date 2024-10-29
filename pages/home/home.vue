<template>
	<view class="content">
		<uni-notice-bar scrollable @click='copycode' single text="请大家进入小程序QQ群794980138,使用过程中有问题可进行反馈 (点击可复制QQ群号)" />
		<view class="swiper">
			<swiper class="swiper" indicator-color='rgb(255,255,255)' circular :indicator-dots="true" :autoplay="true"
				:interval="5000" :duration="500">
				<swiper-item>
					<view class="swiper-item">
						<image src='../../static/banner1.jpg'>
						</image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image
							src='https://img0.baidu.com/it/u=2020518972,2077284106&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500'>
						</image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src='../../static/banner2.jpg'>
						</image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="nav">
			<ul class="nav-list" :class={newUi:isNewUi}>
				<li class="nav-item" v-for='d in homeNavList' @click='gotoPage(d.target)'>
					<view class="icon">
						<image :src="d.img" mode=""></image>
					</view>
					<view class="title">
						<text>{{d.title}}</text>
					</view>
				</li>
			</ul>
		</view>
		<DevMessage v-if='isShowMessage' @closeMessage='closeMessage'></DevMessage>
		<home-course></home-course>
		<custom-tabbar :selected="0"></Custom-tabbar>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		onShow
	} from '@dcloudio/uni-app'

	const isShowMessage = ref(true)
	const homeNavList = ref([{
			title: "学生课表",
			img: "../../static/-calendar--2.svg",
			target: "course",
			isShow: true
		}, {
			title: "教师课表",
			img: "../../static/-calendar-.svg",
			target: "teacherCourse",
			isShow: true
		},
		{
			title: "教室课表",
			img: "../../static/-search-.svg",
			target: "classroomCourse",
			isShow: true
		},
		{
			title: "学生日历",
			img: "../../static/-calendar.svg",
			target: "calendar-course",
			isShow: true
		},
		{
			title: "教师日历",
			img: "../../static/-calendar-2.svg",
			target: "calendar-tech-course",
			isShow: true
		},
		{
			title: "搭子课表",
			img: "../../static/103-book-5.png",
			target: "lovers-course",
			isShow: true
		},
		{
			title: "学生周次课表",
			img: "../../static/034-to-do.svg",
			target: "course-plus",
			isShow: true
		},
		{
			title: "教师周次课表",
			img: "../../static/034-to-do(1).svg",
			target: "tech-course-plus",
			isShow: true
		},
	])
	const isNewUi = ref(false)

	function onShareAppMessage() {
		wx.showShareMenu({
			withShareTicket: true,
			menu: ['shareAppMessage', 'shareTimeline']
		})
	}
	//用户点击右上角分享朋友圈
	function onShareTimeline() {
		return {
			title: '',
			query: {
				key: value
			},
			imageUrl: ''
		}
	}

	function copycode() {
		uni.setClipboardData({
			data: "794980138",
			success: function() {
				uni.showToast({
					title: "复制成功",
					icon: "success"
				})
			}
		})
	}

	function closeMessage() {
		isShowMessage.value = false
		uni.setStorageSync("isShowMessage", false)
		const date = new Date()
		date.setDate(date.getDate() + 1)
		uni.setStorageSync("showMessageTime", Date.parse(date))
	}

	function gotoPage(path) {
		uni.navigateTo({
			url: `/pages/${path}/${path}`
		})
	}

	onMounted(() => {
		const showMsgTime = uni.getStorageSync("showMessageTime") || 0
		const date = Date.now()

		if (date - showMsgTime < 0) {
			isShowMessage.value = false
		} else {
			isShowMessage.value = true
		}
	})
	onShow(() => {
		const navList = uni.getStorageSync("home-nav-list")
		isNewUi.value = uni.getStorageSync("isNewUi") === "" ? false : !!uni.getStorageSync("isNewUi")
		if (!!navList) {
			homeNavList.value = navList.filter(d => d.isShow)
		}
	})
</script>

<style lang='scss'>
	page>.content {
		min-height: 100vh;
		height: fit-content;
		background: #f5f5f5;
		padding-bottom: 150rpx;

		.swiper {
			height: 300rpx;

			.swiper-item {
				display: block;
				height: 300rpx;
				line-height: 300rpx;
				text-align: center;

				image {
					width: 100%;
				}
			}

			.swiper-list {
				margin-top: 40rpx;
				margin-bottom: 0;
			}
		}
	}

	.nav {
		margin-top: 40rpx;
		padding: 0 20rpx;

		.nav-list {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			flex-wrap: wrap;


			.nav-item {
				width: fit-content;
				display: flex;
				align-items: center;
				justify-content: space-around;
				flex-direction: column;
				flex-basis: 24%;
				margin-top: 20rpx;

				.icon image {
					width: 65rpx;
					height: 65rpx;
					overflow: visible;
				}

				.title {
					font-size: 26rpx;
					margin-left: 10rpx;
				}
			}
		}

		.newUi {
			justify-content: space-between;

			.nav-item {
				height: 70rpx;

				flex-basis: 45%;
				flex-direction: initial;
				background: #4285F4;
				padding: 15rpx 0;
				border-radius: 20rpx;
				color: #fff;
			}

		}
	}
</style>