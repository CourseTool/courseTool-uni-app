<template>
	<view class="evaluate">
		<div class="title">
			<p>评价一下courseTool吧!</p>
			<p>一个月只能评价一次哦</p>
		</div>
		<!-- <div class="rate">
			<uniRate v-model="rateVal"></uniRate>
		</div>
		<div class="input">
			<textarea focus="true" v-model="evaluateVal" placeholder="最大输入长度为50" maxlength="50" />
		</div>
		<div class="anonymous">
			<label class="radio">
				<checkbox :checked="isAnonymous" :value="isAnonymous" /><text>匿名</text>
			</label>
			<button type="primary">提交</button>
		</div> -->
	</view>
</template>

<script setup>
	var plugin = requirePlugin("wxacommentplugin");
	plugin.openComment({
		// wx_pay_id: '4200001729202306024807578', // 交易评价类账号选填
		success: (res) => {
			console.log('plugin.openComment success', res)
		},
		fail: (res) => {
			console.log('plugin.openComment fail', res)
		}
	})
</script>

<style lang="scss">
	.evaluate {
		padding: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		>view {
			margin-top: 20rpx;
		}

		.title {
			font-size: 36rpx;
		}

		.input {
			textarea {
				border: 1px solid #ccc;
				border-radius: 20rpx;
				height: 130rpx;
				padding: 10rpx;
			}
		}

		.anonymous {
			display: flex;
			align-items: center;
			justify-content: space-between;

			>button {
				width: 180rpx;
				margin-left: 20rpx;
			}
		}
	}
</style>