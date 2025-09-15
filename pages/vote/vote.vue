<template>
	<view class='vote'>
		<div class="container">
			<div class="title">
				<p>第一期投票</p>
			</div>
			<div class="role">
				<div class="title">
					<p>活动规则</p>
				</div>
				<div class="content">
					<div class="time-start">
						<p>
							<image style='width:35rpx;height:35rpx;margin-right:10rpx' src="../../static/时钟.png"
								mode="">
							</image>活动开始:2024-7-4 15:00:00
						</p>
					</div>
					<div class="time-end">
						<p>
							<image style='width:35rpx;height:35rpx;margin-right:10rpx' src="../../static/时钟.png"
								mode="">
							</image>活动结束:2024-7-5 15:00:00
						</p>
					</div>
					<div class="role-text">
						<p> <uni-icons color='#888' type='info' size='24'
								style='margin-left:5rpx'></uni-icons>活动期间每个微信号只能投一次票</p>
					</div>
				</div>
			</div>
			<div class="content">
				<div class="item" v-for=' in 3'>
					<div class="info">
						<div class="img">
							<img src="https://tse4-mm.cn.bing.net/th/id/OIP-C.GSimYQzm-3r7eeUR8sAIugHaEc?w=264&h=180&c=7&r=0&o=5&dpr=2&pid=1.7"
								mode=""></img>
						</div>
						<div class="title">
							<p>一个铜官窑的普通瓷器</p>
						</div>
						<div class="right-select">
							<p>投票</p>
						</div>
					</div>
					<div class="progress">
						<div class="bar"></div>
						<div class="tag">27票</div>
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script setup>

</script>

<style lang="scss">
	.vote {
		width: 100vw;
		height: 100vh;
		background-color: #f5f5f5;

		.container {
			padding: 20rpx;

			>.title {
				text-align: center;
				font-size: 44rpx;
			}

			>.role {
				margin-top: 20rpx;

				.title {
					height: 50rpx;
					text-align: center;
					line-height: 50rpx;
					background: #0497FF;
					color: #fff;
					font-size: 28rpx;
				}

				.content {
					padding: 20rpx;
					background-color: #fff;

					view {
						image {
							margin-left: 7rpx;
						}

						font-size: 24rpx;
						color: #666;
						display: flex;
						align-items: center;
						justify-content: flex-start;

						&:nth-child(2) {
							margin: 20rpx 0;
						}
					}

					.role-text {}
				}
			}

			>.content {
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-direction: column;
				margin-top: 20rpx;
				background-color: #fff;
				padding: 20rpx;

				.item {
					width: 100%;
					position: relative;

					.info {
						display: flex;
						align-items: center;
						justify-content: flex-start;

						.img {
							width: 100rpx;
							height: 100rpx;
						}

						.title {
							font-size: 28rpx;
							margin-left: 20rpx;
						}

						.right-select {
							width: 130rpx;
							height: 50rpx;
							background: #0497FF;
							text-align: center;
							line-height: 50rpx;
							color: #fff;
							font-size: 26rpx;
							border-radius: 10rpx;
							position: absolute;
							top: 35%;
							right: 0;
						}
					}

					.progress {
						margin: 20rpx 0;
						display: flex;
						align-items: center;
						justify-content: flex-start;

						.bar {
							height: 50rpx;
							width: 30%;
							background: #f40;
						}

						.tag {
							font-size: 24rpx;
							margin-left: 10rpx;
							color: #333;
						}
					}
				}
			}
		}
	}
</style>