<template>
	<view class='custom'>
		<ul class="fn-list">
			<li class='fn-item' v-for='d in fnNavList'>
				<p class="title">{{d.title}}</p>
				<label @click='changeShow(d)' class="radio">
					<radio :checked="d.isShow" />
					{{d.isShow ? "显示" : "隐藏"}}
				</label>
			</li>
			<li class="fn-item">
				<p class="title">新布局</p>
				<label @click='changeUI' class="radio">
					<radio :checked="isNewUi" />
				</label>
			</li>
		</ul>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';

	const fnNavList = ref(ref([{
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
	]))
	const isNewUi = ref(true)

	function changeShow(navObj) {
		navObj.isShow = !navObj.isShow
		uni.setStorageSync("home-nav-list", fnNavList.value)
	}

	function changeUI() {
		isNewUi.value = !isNewUi.value
		uni.setStorageSync("isNewUi", isNewUi.value)
	}

	onMounted(() => {
		const navList = uni.getStorageSync('home-nav-list')
		isNewUi.value = uni.getStorageSync("isNewUi") === "" ? false : !!uni.getStorageSync("isNewUi")
		if (!!navList) {
			fnNavList.value = navList
		}
	})
</script>

<style lang="scss">
	.custom {
		padding: 20rpx;

		.fn-list {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-direction: column;

			.fn-item {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 0;
				font-size: 34rpx;
				border-bottom: 1px solid #ccc;

				.title {
					font-size: 34rpx;
				}
			}
		}
	}
</style>