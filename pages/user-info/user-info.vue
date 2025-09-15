<template>
	<view class='content'>
		<view class="info-list">
			<ul class="list">
				<li class="info">
					<view class="left-info">
						<view class="title">
							<text>头像</text>
						</view>
						<view class="pic">
							<image :src='data.userData.userPic'>
							</image>
						</view>
					</view>
					<view class="modify" @click='modifyUserInfo("userPic")'>
						<text>修改</text>
					</view>
				</li>
				<li class="info">
					<view class="left-info">
						<view class="title">
							<text>姓名:</text>
						</view>
						<view class="pic">
							<text>{{data.userData.name}}</text>
						</view>
					</view>
					<view class="modify">
						<text>修改</text>
					</view>
				</li>
				<li class="info">
					<view class="left-info">
						<view class="title">
							<text>性别:</text>
						</view>
						<view class="pic">
							<text>{{data.userData.sex}}</text>
						</view>
					</view>
				</li>
				<li class="info">
					<view class="left-info">
						<view class="title">
							<text>班级:</text>
						</view>
						<view class="pic">
							<text>{{data.userData.class}}</text>
						</view>
					</view>
					<view class="modify">
						<text>修改</text>
					</view>
				</li>
				<li class="info">
					<view class="left-info">
						<view class="title">
							<text>职位:</text>
						</view>
						<view class="pic">
							<text>{{data.userData.position}}</text>
						</view>
					</view>
					<view class="modify">
						<text>修改</text>
					</view>
				</li>
				<li class="info">
					<view class="left-info">
						<view class="title">
							<text>注册时间:</text>
						</view>
						<view class="pic">
							<text>{{data.userData.time}}</text>
						</view>
					</view>
				</li>
			</ul>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive
	} from 'vue'
	import request from '@/uilts/request.js'
	import {
		getStudentDataAPI
	}
	from '@/API/student.js'
	import {
		pathToBase64,
	} from 'image-tools'
	const data = reactive({
		userData: uni.getStorageSync('userData')
	})

	function modifyUserInfo(target) {
		if (target === 'userPic') {
			uni.chooseImage({
				count: '1',
				success: res => {
					const value = res.tempFilePaths[0]
					pathToBase64(value).then((value) => {
						request({
							path: '/stu/modifyStuInfo',
							method: "POST",
							data: {
								target,
								value,
								code: data.userData.code
							},
							fn: async () => {
								uni.showToast({
									title: '修改成功'
								})
								const result = await getStudentDataAPI({
									index: 'data',
									code: data.userData.code
								})
								uni.setStorageSync('userData', result.data.data)
								data.userData = uni.getStorageSync('userData')
							}
						})
					})

				}
			})
		}
	}
</script>

<style lang="scss">
	.content {
		height: 100vh;
		background-color: #f3f3f3;

		.info-list {
			background-color: #fff;
			padding: 20rpx;

			.list {
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-direction: column;

				&>.info:not(:first-child) {
					border-top: 1px solid #f3f3f3;
				}

				.info {
					width: 100%;
					height: 90rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;



					.left-info {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.title {
							font-size: 34rpx;
						}

						.pic {
							color: #0d0d0d;
							font-size: 26rpx;
							margin-left: 20rpx;

							image {
								width: 80rpx;
								height: 80rpx;
								border-radius: 50%;
							}
						}
					}

					.modify {
						font-size: 28rpx;
						color: #ccc;
						text-decoration: underline;
					}
				}

			}
		}
	}
</style>