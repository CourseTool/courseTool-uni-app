<template>
	<view class='select-class' v-if="isShowPage">
		<div class="search-input">
			<uni-icons type="search" size="30"></uni-icons>
			<input v-model="searchKey" @input="searchClass" type="text" auto-focus :placeholder="getPlaceholder" />
		</div>
		<div v-if="type === 'teacher'" class="class-list">
			<div class="empty" v-if="filterClassList.length === 0">
				<p>没有该老师</p>
			</div>
			<div @click='selectVal(c)' class="class-item" v-for='c in filterClassList || classList' :key="c.id">
				<div class="left-pic">
					<span>{{c[0]}}</span>
				</div>
				<div class="right-class-name">
					<span>{{c}}</span>
				</div>
			</div>
		</div>
		<div v-if='type === "classroom"' class="class-list">
			<div class="empty" v-if="filterClassList.length === 0">
				<p>没有该教室</p>
			</div>
			<div @click='selectVal(c.classroom)' class="class-item" v-for='(c,index) in filterClassList || showList'
				:key="index">
				<div class="left-pic">
					<span>{{"教室"}}</span>
				</div>
				<div class="right-class-name">
					<span>{{c.classroom}}</span>
				</div>
			</div>
		</div>
		<div v-if="type === 'student'" class="class-list">
			<div class="empty" v-if="filterClassList.length === 0">
				<p>没有该班级</p>
			</div>
			<div @click='selectVal(c)' class="class-item" v-for='c in filterClassList || activeClassList' :key="c.id">
				<div class="left-pic">
					<span>{{c[0]}}</span>
				</div>
				<div class="right-class-name">
					<span>{{c}}</span>
				</div>
			</div>
		</div>
		<div v-if="type === 'custom'" class='class-list'>
			<div class="empty" v-if="filterClassList.length === 0">
				<p>没有响应的结果</p>
			</div>
			<div @click='selectVal(c)' class="class-item" v-for='c in filterClassList || customDataList'>
				<div class="left-pic">
					<span>{{c.value[0]}}</span>
				</div>
				<div class="right-class-name">
					<span>{{c.value}}</span>
				</div>
			</div>
		</div>
	</view>
</template>

<script setup>
	import {
		getTeacherListAPI,
		getActiveClassListAPI,
		getClassroomListAPI,
	} from '@/API/course.js'
	import {
		onMounted,
		ref,
		defineEmits,
		defineProps,
		computed
	} from 'vue';

	const isShowPage = ref()
	const props = defineProps(['type', 'dataList'])
	const emit = defineEmits(["hide-select-class"])
	const showList = ref([])
	const filterClassList = ref([])
	const searchKey = ref("")
	const showType = ref("")
	// 展示课表的班级
	const activeClassList = ref([])
	// 置顶的班级
	const topClassList = ["软件2303班", "软件2205班", "大数据会计2305班"]
	// 置顶的老师
	const topTeacherList = ["吴宇飞", "李锡辉", '王樱', '冯文韬', "刘洁"]
	// 自定义传进来的数据
	const customDataList = ref([])
	let timer = null

	const getPlaceholder = computed(() => {
		const placeholderMap = {
			"student": "请输入你要搜索的班级",
			"classroom": "请输入你要搜索的教室",
			"teacher": "老师,请输入您的名字",
			"custom": "请输入你要搜索的内容"
		}
		return placeholderMap[props.type]
	})

	// 既可以选择班级又可以选择老师
	function selectVal(val) {
		emit("hide-select-class", val)
	}

	function searchClass() {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			if (props.type === "teacher") {
				filterClassList.value = showList.value.filter((c) => c.tech_name.includes(searchKey.value)).map(
					d => d.tech_name)
			} else if (props.type === "classroom") {
				filterClassList.value = showList.value.filter((c) => c.classroom.includes(searchKey.value))
			} else if (props.type === 'student') {
				filterClassList.value = showList.value.filter((c) => c.className.includes(searchKey.value)).map(
					d => d.className)
			} else {
				filterClassList.value = props.dataList.filter((c) => c.value.includes(searchKey.value))
			}
		}, 200)
	}

	async function getShowList() {
		uni.showLoading({
			title: "加载中..."
		})
		switch (showType.value) {
			case "teacher":
				var {
					data
				} = await getTeacherListAPI()
				showList.value = data.data
				filterClassList.value = showList.value
				data.data = data.data.map(d => d.tech_name)
				filterClassList.value = new Set([...topTeacherList, ...data.data])
				break
			case "classroom":
				var {
					data
				} = await getClassroomListAPI()
				showList.value = data.data
				filterClassList.value = showList.value
				break
			case "student":
				var res = await getActiveClassListAPI()
				showList.value = res.data.data
				activeClassList.value = res.data.data
				filterClassList.value = new Set([...topClassList, ...res.data.data.map(d => d.className)])
				break
		}
		setTimeout(() => {
			isShowPage.value = true
			uni.hideLoading()
		}, 100)
	}

	onMounted(async () => {
		showType.value = props.type || "student"
		if (props.dataList) {
			customDataList.value = props.dataList
			filterClassList.value = customDataList.value
		}
		getShowList()
	})
</script>

<style lang="scss">
	.select-class {
		width: 100vw;
		height: 100vh;
		background-color: #f5f5f5;
		position: absolute;
		inset: 0;
		z-index: 99999;

		.search-input {
			width: 100%;
			height: 90rpx;
			background-color: #eaeaea;
			display: flex;
			align-items: center;
			justify-content: center;

			input {
				width: 100%;
				font-size: 30rpx;
			}
		}

		.class-list {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-direction: column;

			.empty {
				width: 100vw;
				height: 50vh;

				font-size: 40rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.class-item {
				width: 100%;
				height: 120rpx;
				background-color: #fcfcfc;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				padding: 0 20rpx;
				border: 1px solid #f5f5f5;

				.left-pic {
					width: 80rpx;
					height: 80rpx;
					background: #eaeaea;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #ccc;
					border-radius: 50%;
					margin-left: 10rpx;
				}

				.right-class-name {
					margin-left: 10rpx;
					color: #3c3c3c;
				}
			}
		}
	}
</style>