<template>
	<!--pages/career/career.wxml-->
	<!-- 跑马灯 -->
	<view class="box flex-row">
		<text class="title">温馨提示：请在心态平和的情况下开始答题，每题考虑时间不宜超过10秒钟，选项之间无对错好坏之分，请选择与你实际做法相符的，而不是你认为怎样做是对的！</text>
	</view>

	<form class="section section_gap">
		<view class="select-name">
			<view class="section__title">
				<text>请选择你的姓名</text>
			</view>
			<view class="two">
				<uni-easyinput @focus='selectName' confirm-type="next" clearable='false'
					style='font-size:20rpx;margin-top:20rpx' prefixIcon="circle" :value='studentInfo.value'>
				</uni-easyinput>
			</view>
			<select-class @hide-select-class='hideSelectClass' :dataList="studentList" v-if='isShowSelectName'
				type='custom'></select-class>
		</view>
		<!-- 第一部分 -->
		<view class="group1">
			<view v-for="index in 7">
				<view class="section__title">
					<text>{{questionList.title[index-1]}}</text>
				</view>
				<view class="two">
					<radio-group @change="onRadioChange" :data-index='index-1'>
						<view class="first">
							<radio value="radio1" />
							<text>{{questionList.toptext[index-1]}}</text>
						</view>
						<view class="first">
							<radio value="radio2" />
							<text>{{questionList.bottext[index-1]}}</text>
						</view>
					</radio-group>
				</view>
			</view>
		</view>
		<view class="fgx"></view>

		<view class="group2">
			<block v-for="index in 7">
				<view class="section__title">
					<text>{{questionList.title2[index-1]}}</text>
				</view>
				<view class="two">
					<radio-group @change="onRadioChange" :data-index='index+6'>
						<view class="first">
							<radio value="radio1" />
							<text>{{questionList.toptext2[index-1]}}</text>
						</view>
						<view class="first">
							<radio value="radio2" />
							<text>{{questionList.bottext2[index-1]}}</text>
						</view>
					</radio-group>
				</view>
			</block>
		</view>
		<view class="fgx"></view>

		<view class="group3">
			<block v-for="index in 7">
				<view class="section__title">
					<text>{{questionList.title3[index-1]}}</text>
				</view>
				<view class="two">
					<radio-group @change="onRadioChange" :data-index='index+13'>
						<view class="first">
							<radio value="radio1" />
							<text>{{questionList.toptext3[index-1]}}</text>
						</view>
						<view class="first">
							<radio value="radio2" />
							<text>{{questionList.bottext3[index-1]}}</text>
						</view>
					</radio-group>
				</view>
			</block>
		</view>
		<view class="fgx"></view>

		<view class="group4">
			<block v-for="index in 7">
				<view class="section__title">
					<text>{{questionList.title4[index-1]}}</text>
				</view>
				<view class="two">
					<radio-group @change="onRadioChange" :data-index='index+20'>
						<view class="first">
							<radio value="radio1" />
							<text>{{questionList.toptext4[index-1]}}</text>
						</view>
						<view class="first">
							<radio value="radio2" />
							<text>{{questionList.bottext4[index-1]}}</text>
						</view>
					</radio-group>
				</view>
			</block>
		</view>
		<view class="fgx"></view>

		<view class="btn">
			<button class="btn1" @click='postAnswer'>提交</button>
			<button class="btn2" @click="restart">重做</button>
		</view>
	</form>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		getNewStudentListAPI,
		saveCareerResultAPI
	} from '@/API/course.js'

	const isShowSelectName = ref(false)
	const studentInfo = ref({})
	const studentList = ref([])
	const questionList = ref({
		title: ["1.你倾向从何处得到力量：", "2.当你参加一个社交聚会时，你会：", "3.下列哪一件事听起来比较吸引你？", "4.在约会中，你通常：",
			"5.过去，你遇见你大部分的异性朋友是：",
			"6.你倾向拥有：", "7.过去，你的朋友和同事倾向对你说："
		],
		toptext: ["别人", "在夜色很深时，一旦你开始投入，也许就是最晚离开的那一个", "与情人到有很多人且社交活动频繁的地方", "整体来说很健谈",
			"在宴会中、夜总会、工作上、休闲活动中、会议上或当朋友介绍我给他们的朋友时", "很多认识的人和很亲密的朋友", "你难道不可以安静一会儿吗？"
		],
		bottext: ["自己的想法", "在夜晚刚开始的时候，我就疲倦了并且想回家", "待在家中与情人做一些特别的事情，例如说观赏一部有趣的录影带并享用你最喜欢的外卖食物",
			"较安静并保留，直到你觉得舒服",
			"通过私人的方式，例如个人广告、录影约会，或是由亲密的朋友和家人介绍", "一些很亲密的朋友和一些认识的人", "可以请你从你的世界中出来一下吗"
		],
		title2: ["8.你倾向通过以下哪种方式收集信息：", "9.你倾向相信：", "10.当你置身于一段关系中时，你倾向相信：", "11.当你对一个约会觉得放心时，你偏向谈论：",
			"12.你是这种人：",
			"13.你是这类型的人：", "14.你通常："
		],
		toptext2: ["你对有可能发生之事的想像和期望", "你的直觉", "永远有进步的空间",
			"未来，关于改进或发明事物和生活的种种可能性。例如，你也许会谈论一个新的科学发明，或一个更好的方法来表达你的感受", "喜欢先纵观全局", "与其活在现实中，不如活在想像里",
			"偏向于去想像一大堆关于即将来临的约会的事情"
		],
		bottext2: ["你对目前状况的实际认知", "你直接的观察和现成的经验", "若它没有被破坏，不予修补",
			"实际的、具体的、关于“此时此地”的事物。例如，你也许会谈论品酒的好方法，或你即将要参加的新奇旅程", "喜欢先掌握细节", "与其活在想像里，不如活在现实中",
			"偏向于拘谨地想像即将来临的约会，只期待让它自然地发生"
		],
		title3: ["15.你倾向如此做决定：", "16.你倾向比较能够察觉到：", "17.当和某人分手时：", "18.当与一个人交往时，你倾向于看重：", "19.当你不同意情人的想法时：",
			"20.认识你的人倾向形容你为：", "21.你把大部分和别人的相遇视为："
		],
		toptext3: ["首先依你的心意，然后依你的逻辑", "当人们需要情感上的支持时", "你通常让自己的情绪深陷其中，很难抽身出来", "情感上的相容性：表达爱意和对另一半的需求很敏感",
			"你尽可能地避免伤害对方的感情；若是会对对方造成伤害的话，你就不会说", "热情和敏感", "友善及重要的"
		],
		bottext3: ["首先依你的逻辑，然后依你的心意", "当人们不合逻辑时", "虽然你觉得受伤，但一旦下定决心，你会直截了当地将过去恋人的影子甩开",
			"智慧上的相容性：沟通重要的想法；客观地讨论和辩论事情", "你通常毫无保留地说话，并且对情人直言不讳，因为对的就是对的", "逻辑和明确", "另有目的"
		],
		title4: ["22.若你有时间和金钱，你的朋友邀请你到国外度假，并且在前一天才通知，你会：", "23.在第一次约会中：", "24.你偏好：", "25.你选择的生活充满着：",
			"26.哪一项较常见：",
			"27.你是这种喜欢……的人：", "28.你是此类型的人："
		],
		toptext4: ["必须先检查你的时间表", "若你所约的人来迟了，你会很不高兴", "事先知道约会的行程：要去哪里、有谁参加、你会在那里多久、该如何打扮", "日程表和组织",
			"你准时出席而其他人都迟到",
			"下定决心并且做出最后肯定的结论", "喜欢在一段时间里专心于一件事情直到完成"
		],
		bottext4: ["立刻收拾行装", "一点儿都不在乎，因为你自己常常迟到", "让约会自然地发生，不做太多事先的计划", "自然发生和弹性", "其他人都准时出席而你迟到",
			"放宽你的选择面并且持续收集信息", "享受同时进行好几件事情"
		],
		choices: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
			null,
			null, null, null, null, null, null, null, null, null, null, null, null
		]
	}, )

	function selectName() {
		isShowSelectName.value = true
	}

	function hideSelectClass(value) {
		studentInfo.value = value
		isShowSelectName.value = false
	}

	function onRadioChange(e) {
		console.log(e);
		const value = e.detail.value
		const index = e.target.dataset.index
		questionList.value.choices[index] = value
	}

	async function postAnswer() {
		let choices = questionList.value.choices
		console.log(choices);
		for (let i = 0; i < choices.length; i++) {
			if (choices[i] === null) {
				// 如果有未做完题目，使用 `wx.pageScrollTo` 方法滚动页面到未做完题目所在的位置
				uni.showToast({
					title: '请完成所有题目',
					icon: 'none',
					duration: 2000
				})

				let jump = ".num" + i;
				uni.pageScrollTo({
					selector: jump,
					duration: 300,
					/*success: data => {
					    console.log('scroll success', data);
					},
					fail: data => {
					    console.log('scroll fail', data);
					},
					complete: data => {
					    console.log('scroll complete', data);
					}*/
				})
				return;
			}
		}

		/* function CountAnswer */
		{
			let E = 0,
				I = 0,
				N = 0,
				S = 0,
				F = 0,
				T = 0,
				J = 0,
				P = 0;
			let choices = questionList.value.choices
			let testResult;
			for (let i = 0; i < choices.length; i++) {
				if (i < 6) {
					if (choices[i] == "radio1")
						E++;
					else
						I++;
					continue;
				}

				if (i < 13) {
					if (choices[i] == "radio1")
						N++;
					else
						S++;
					continue;
				}

				if (i < 20) {
					if (choices[i] == "radio1")
						F++;
					else
						T++;
					continue;
				}

				if (i < 27) {
					if (choices[i] == "radio1")
						J++;
					else
						P++;
				}
			}

			if (E > I)
				testResult = "E";
			else
				testResult = "I";

			if (N > S)
				testResult += "N";
			else
				testResult += "S";

			if (F > T)
				testResult += "F";
			else
				testResult += "T";

			if (J > P)
				testResult += "J";
			else
				testResult += "P";

			console.log(testResult);
			const careerData = {
				result: testResult,
				student_id: studentInfo.value.id
			}
			await saveCareerResultAPI(careerData)
			uni.setStorageSync("test-result", testResult)
			wx.navigateTo({
				url: '/pages/test-result/test-result',
			})
		}
	}

	onMounted(async () => {
		const res = await getNewStudentListAPI()
		studentList.value = res.data.data
	})
</script>

<style lang="scss">
	/* pages/career/career.wxss */
	/* 跑马灯 */
	.box {
		width: 750rpx;
		margin: 10rpx auto;
		background: #f5eeec;
		border-radius: 5px;
		padding: 5px;
		box-sizing: border-box;

	}

	.title {
		white-space: nowrap;
		animation: 25s loop linear infinite normal;
		display: inline-block;
		vertical-align: top;
		font-size: 26rpx;
		color: #f0865e;
		opacity: 0.8;
	}

	@keyframes loop {
		0% {
			transform: translateX(350px);
			-webkit-transform: translateX(350px);
		}

		100% {
			transform: translateX(-100%);
			-webkit-transform: translateX(-100%);
		}
	}

	@-webkit-keyframes loop {
		0% {
			transform: translateX(300px);
			-webkit-transform: translateX(300px);
		}

		100% {
			transform: translateX(-100%);
			-webkit-transform: translateX(-100%);
		}
	}

	/* 选择题 */
	.section {
		background-color: rgb(255, 247, 240);
		border-radius: 5px;
		width: 710rpx;
		margin: 10rpx auto;
	}

	.select-name,

	.section,
	.group1,
	.group2,
	.group3,
	.group4 {
		/* border: deepskyblue solid 1px; */
		width: 660rpx;
		margin: 10rpx auto;
		padding-top: 10px;

	}

	.section__title {
		/* border: rgb(0, 255, 34) solid 1px; */
		margin-top: 10px;
	}

	.two {
		/* border: rgb(255, 0, 221) solid 1px; */
		margin-top: 10px;
		margin-bottom: 20px;
	}

	radio-group {
		margin-left: 10rpx;
	}

	radio {
		transform: scale(1);
	}

	>text {
		font-size: 32rpx;
		color: #666666;
		margin: 10rpx 0 20rpx 0;

	}

	.section__title text {
		color: #f0865e;
		font-size: 34rpx;
		font-weight: bold;
	}

	.two .first {
		margin: 10px 0;
	}

	/* 分割线 */
	.fgx {
		border: rgb(224, 224, 224) solid;
		margin-top: 15px;
	}

	/* 按钮 */
	.btn {
		border: rgb(255, 255, 255) solid 1px;
		background-color: white;
		display: flex;
		align-items: center;
	}

	.btn button {
		/* border: tomato solid 1px; */
		background-color: limegreen;
		color: rgb(255, 255, 255);
		margin-top: 20px;
		margin-bottom: 30px;
	}

	.btn .btn1 {
		margin-right: 10px;
	}

	.btn .btn2 {
		background-color: tomato;
		margin-left: 20px;
	}
</style>