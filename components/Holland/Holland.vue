<template>
	<!--pages/Holland/Holland.wxml-->
	<!-- 跑马灯 -->
	<view class="box flex-row">
		<text class="title">温馨提示：请在心态平和的情况下开始答题，每题考虑时间不宜超过10秒钟，选项之间无对错好坏之分，请选择与你实际做法相符的，而不是你认为怎样做是对的！</text>
	</view>

	<form class="section section_gap" bindsubmit="onSubmit">
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
			<block v-for="index in 15">
				<view class="section__title" :class='"num"+ (index)'>
					<text>{{questionList.title[index-1]}}</text>
				</view>
				<view class="two">
					<radio-group name="radio-group" @change="onRadioChange" :data-index="index - 1">
						<view class="first">
							<radio value="radio1" />
							<text>√</text>
							<radio value="radio2" />
							<text>×</text>
						</view>
					</radio-group>
				</view>
			</block>
		</view>
		<!-- 分割线 -->
		<view class="fgx"></view>

		<!-- 第二部分 -->
		<view class="group2">
			<block v-for="index in 15">
				<view class="section__title" :class='"num"+ (14+index)'>
					<text>{{questionList.title2[index-1]}}</text>
				</view>
				<view class="two">
					<radio-group name="radio-group" @change="onRadioChange" :data-index="14+index">
						<view class="first">
							<radio value="radio1" />
							<text>√</text>
							<radio value="radio2" />
							<text>×</text>
						</view>
					</radio-group>
				</view>
			</block>
		</view>
		<!-- 分割线 -->
		<view class="fgx"></view>

		<!-- 第三部分 -->
		<view class="group3">
			<block v-for="index in 15">
				<view class="section__title" :class='"num"+ (29+index)'>
					<text>{{questionList.title3[index-1]}}</text>
				</view>
				<view class="two">
					<radio-group name="radio-group" @change="onRadioChange" :data-index="29+index">
						<view class="first">
							<radio value="radio1" />
							<text>√</text>
							<radio value="radio2" />
							<text>×</text>
						</view>
					</radio-group>
				</view>
			</block>
		</view>
		<!-- 分割线 -->
		<view class="fgx"></view>

		<!-- 第四部分 -->
		<view class="group4">
			<block v-for="index in 15">
				<view class="section__title" :class='"num"+ (44+index)'>
					<text>{{questionList.title4[index-1]}}</text>
				</view>
				<view class="two">
					<radio-group name="radio-group" @change="onRadioChange" :data-index="44+index">
						<view class="first">
							<radio value="radio1" />
							<text>√</text>
							<radio value="radio2" />
							<text>×</text>
						</view>
					</radio-group>
				</view>
			</block>
		</view>
		<!-- 分割线 -->
		<view class="fgx"></view>
		<!-- 第五部分 -->
		<view class="group1">
			<block v-for="index in 15">
				<view class="section__title" :class='"num"+ (59+index)'>
					<text>{{questionList.title5[index-1]}}</text>
				</view>
				<view class="two">
					<radio-group name="radio-group" @change="onRadioChange" :data-index="59+index">
						<view class="first">
							<radio value="radio1" />
							<text>√</text>
							<radio value="radio2" />
							<text>×</text>
						</view>
					</radio-group>
				</view>
			</block>
		</view>
		<!-- 分割线 -->
		<view class="fgx"></view>
		<!-- 第六部分 -->
		<view class="group1">
			<block v-for="index in 15">
				<view class="section__title" :class='"num"+ (74+index)'>
					<text>{{questionList.title6[index-1]}}</text>
				</view>
				<view class="two">
					<radio-group name="radio-group" @change="onRadioChange" :data-index="74+index">
						<view class="first">
							<radio value="radio1" />
							<text>√</text>
							<radio value="radio2" />
							<text>×</text>
						</view>
					</radio-group>
				</view>
			</block>
		</view>
		<!-- 分割线 -->
		<view class="fgx"></view>

		<!-- 按钮 -->
		<view class="btn">
			<button class="btn1" @click='postAnswer'>提交</button>
			<button class="btn2" @click='restart'>重做</button>
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
		saveHollandResultAPI
	} from '@/API/course.js'

	const isShowSelectName = ref(false)
	const studentInfo = ref({})
	const studentList = ref([])
	const questionList = {
		title: ["1.强壮而敏捷的身体对我很重要。", "2.我擅长于自己制作、修理东西。", "3.我喜欢使用双手做事。", "4.我不在乎工作把手弄脏。", "5.我喜欢购买小零件，做成成品。",
			"6.我喜欢独立完成一项任务。", "7.我喜欢直言不讳，不喜欢转弯抹角。", "8.从事户外活动令我神清气爽。", "9.我喜欢周边环境简单而实际。",
			"10.我不害怕过重工作负荷，且知道工作的重点。", "11.我希望粗重的肢体工作不会伤害任何人。", "12.我选车时，最先注意的是好的引擎。", "13.我通常知道如何应付紧急事件。",
			"14.我用运动来保持强壮的身体。", "15.我喜欢把东西拆开，看看能否修理他们。"
		],
		title2: ["16.我必须彻底地了解事情的真相。", "17.我可以花很长的时间去想通事情的道理", "18.探索新构思使我满意。", "19.我认为教育是个发展及磨练脑力的终身学习过程。",
			"20.有时我长时间阅读，玩拼图游戏，冥想生命本质。", "21.我渴望阅读或思考任何可以引发我好奇心的东西。", "22.我在解决问题前，必须把问题进行彻底分析。", "23.我不断地问:为什么?",
			"24.我会不断地思索一个问题，直到找出答案为止。", "25.我喜欢能使我思考、给我新观念的书。", "26.我希望能学习所有使我感兴趣的科目。", "27.我喜欢能刺激我思考的话。",
			"28.阅读新发现的书事件令人兴奋的事情。", "29.我经常对大自然的奥秘感到好奇。", "30.我喜欢研读所有的事实，再有逻辑的做出决定。"
		],
		title3: ["31.我的心情受音乐、色彩和美丽事物的影响极大", "32.我重视美丽的环境。", "33.我是寻求新方法来发挥我的创造力。", "34.我喜欢非正式的穿着，尝试新颜色和款式。",
			"35.我有很强的想象力。", "36.我喜欢尝试创新的概念。", "37.我喜欢重新布置我的环境，使他们与众不同。", "38.我喜欢自己的工作能够抒发我的情绪和感觉。",
			"39.大自然的美深深地触动我的灵魂。", "40.我希望能看到艺术表演、戏剧及好的电影。", "41.我希望能做些与众不同的事。", "42.当我从事创造性的事时，我会忘掉一切旧经验。",
			"43.我喜欢美丽、不平凡的东西。", "44.尝试不平凡的新事物是件相当有趣的事情。", "45.没有美丽事物的生活，对我而言是不可思议的。"
		],
		title4: ["46.和他人的关系丰富了我的生命并使它有意义。", "47.我愿意花时间帮别人解决个人危机", "48.我认为能把自己的焦虑和别人分担是很重要的。", "49.我常能体会到某人想要和他人沟通的需要。",
			"50.我喜欢帮助别人发挥天赋和才能。", "51.如果我和别人摩擦，我会不断尝试化干戈为玉帛。", "52.我经常借着和别人交谈来解决自己的问题。",
			"53.我喜欢帮助别人找可以和他人相互关注的办法。", "54.亲密的人际关系对我很重要。", "55.我对别人的情绪低潮相当的敏感。", "56.我对别人的困难乐于伸出援手",
			"57.我对社会上有许多人需要帮助感到关注。", "58.我经常关心孤独、不友善的人。", "59.当别人像我诉说他的困难时，我是个好听众。", "60.人们经常告诉我他们的问题。"
		],
		title5: ["61.我自信会成功。", "62.我喜欢竞争。", "63.成为群体中的关键任务执行者，对我很重要。", "64.我喜欢帮助别人不断改进。", "65.我喜欢监督事情直至完工。",
			"66.要成功就必须定高目标。", "67.我常想起草一个计划，而由别人完成细节。", "68.能够参与重大决策是件令人兴奋的事情。", "69.升迁和进步对我极重要。",
			"70.能影响别人使我感到兴奋。", "71.我愿意冒一点险以求进步", "72.说服别人依计划行事是件有趣的事情。", "73.我喜欢讨价还价。", "74.做事失败了，我会再接再厉。",
			"75.我常能借着资讯网络和别人取得联系。"
		],
		title6: ["76.我做事必须有清楚的指引。", "77.我在开始一个计划前会花很多时间去计划。", "78.我对于自己能重视工作中的所有细节感到骄傲。", "79.我在决策时，通常不愿冒险。",
			"80.如果我面对一个新情景，会在事前做充分的准备。", "81.我喜欢为重大决策负责。", "82.准时对我来说非常重要。", "83.我经常保持清洁,喜欢有条不素。",
			"84.当我把每日工作计划好时，我会较有安全感。", "85.当我答应一件事时，我会竭尽监督所有细节。", "86.当我遵循成规时，我感到安全。", "87.我擅长于检查细节。",
			"88.我花钱时小心翼翼。", "89.我需要确切地知道别人对我的要求是什么。", "90.小心谨慎的完成一件事是件有成就感的事情。"
		],
		choices: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
			null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
			null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
			null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
			null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
			null, null, null, null, null
		]
	}

	function selectName() {
		isShowSelectName.value = true
	}

	function hideSelectClass(value) {
		studentInfo.value = value
		isShowSelectName.value = false
	}

	function onRadioChange(e) {
		const value = e.detail.value
		const index = e.target.dataset.index
		console.log(e, value, index);
		questionList.choices[index] = value
	}

	async function postAnswer() {
		let choices = questionList.choices;
		for (let i = 0; i < choices.length; i++) {
			if (choices[i] === null) {
				// 如果有未做完题目，使用 `wx.pageScrollTo` 方法滚动页面到未做完题目所在的位置
				uni.showToast({
					title: '请完成所有题目',
					icon: 'error',
					duration: 2000
				})
				return;
			}
		}

		/* function CountAnswer */
		{
			let S = 0,
				E = 0,
				C = 0,
				R = 0,
				I = 0,
				A = 0;
			let choices = questionList.choices;
			for (let i = 0; i < choices.length; i++) {
				if (i < 15) {
					if (choices[i] == "radio1") S++;
					continue;
				}

				if (i < 30) {
					if (choices[i] == "radio1") E++;
					continue;
				}

				if (i < 45) {
					if (choices[i] == "radio1") C++;
					continue;
				}

				if (i < 60) {
					if (choices[i] == "radio1") R++;
					continue;
				}

				if (i < 75) {
					if (choices[i] == "radio1") I++;
					continue;
				}

				if (i < 90) {
					if (choices[i] == "radio1") A++;
				}
			}

			let arr = new Array(6);
			arr[0] = {
				index: 'S',
				num: S
			};
			arr[1] = {
				index: 'E',
				num: E
			};
			arr[2] = {
				index: 'C',
				num: C
			};
			arr[3] = {
				index: 'R',
				num: R
			};
			arr[4] = {
				index: 'I',
				num: I
			};
			arr[5] = {
				index: 'A',
				num: A
			};
			arr.sort(function(a, b) {
				return b.num - a.num; // 从大到小排序
			});
			console.log(arr);
			uni.setStorageSync('holland-result', arr)
			const hollandData = {
				result: arr,
				student_id: studentInfo.value.id
			}
			await saveHollandResultAPI(hollandData)
			wx.navigateTo({
				url: "/pages/test-result/test-result",
			})
		}
	}

	function restart() {
		questionList.choices = []
		uni.pageScrollTo({
			scrollTop: 0
		})
	}

	onMounted(async () => {
		const res = await getNewStudentListAPI()
		studentList.value = res.data.data
	})
</script>

<style lang="scss">
	/* pages/Holland/Holland.wxss */

	.box {
		width: 710rpx;
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

	.first text {
		font-size: 32rpx;
		color: #666666;
		margin: 0rpx 20rpx 0rpx 10rpx;
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