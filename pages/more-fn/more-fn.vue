<template>
    <view class="more-fn">
        <div class="container">
            <div class="fn-list">
                <div @click="gotoPage('map')" class="fn-item">
                    <view class="icon">
                        <image src="../../static/dingwei.svg" mode=""></image>
                    </view>
                    <view class="title">
                        <text>学校地图</text>
                    </view>
                </div>
                <div @click="gotoPage('message')" class="fn-item">
                    <view class="icon">
                        <image src="../../static/xinxi.svg" mode=""></image>
                    </view>
                    <view class="title">
                        <text>消息</text>
                    </view>
                </div>
                <div @click="gotoPage('item')" class="fn-item">
                    <view class="icon">
                        <image src="../../static/-student-.png" mode=""></image>
                    </view>
                    <view class="title">
                        <text>团队</text>
                    </view>
                </div>
                <!-- <div @click='gotoPage("lost-found")' class="fn-item">
					<view class="icon">
						<image src="../../static/152-book-2.png" mode=""></image>
					</view>
					<view class="title">
						<text>失物招领</text>
					</view>
				</div> -->
                <div @click="gotoPage('calendar-classroom-course')" class="fn-item">
                    <view class="icon">
                        <image src="../../static/152-book-2.png" mode=""></image>
                    </view>
                    <view class="title">
                        <text>教室日历</text>
                    </view>
                </div>
                <!-- 				<div @click='gotoPage("dorm")' class="fn-item">
					<view class="icon">
						<image src="../../static/152-book-2.png" mode=""></image>
					</view>
					<view class="title">
						<text>新生宿舍</text>
					</view>
				</div> -->
                <div @click="gotoPage('electives')" class="fn-item">
                    <view class="icon">
                        <image src="../../static/075-search.png" mode=""></image>
                    </view>
                    <view class="title">
                        <text>选修课</text>
                    </view>
                </div>
                <!-- 				<div @click='gotoPage("career-test")' class="fn-item">
					<view class="icon">
						<image src="../../static/075-search.png" mode=""></image>
					</view>
					<view class="title">
						<text>职业测试</text>
					</view>
				</div> -->
                <div @click="gotoPage('empty-classroom')" class="fn-item">
                    <view class="icon">
                        <image src="../../static/075-search.png" mode=""></image>
                    </view>
                    <view class="title">
                        <text>查找空教室</text>
                    </view>
                </div>
                <!-- 				<div @click='gotoPage("advertisement")' class="fn-item" v-if='showAdvertisement'>
					<view class="icon">
						<image src="../../static/专升本考试.png" mode=""></image>
					</view>
					<view class="title">
						<text>楚恒专升本</text>
					</view>
				</div> -->
                <!-- 				<div @click='gotoPage("my-blog")' class="fn-item" v-if='showAdvertisement'>
					<view class="icon">
						<image src="../../static/专升本考试.png" mode=""></image>
					</view>
					<view class="title">
						<text>个人博客</text>
					</view>
				</div> -->
                <!-- <div @click="gotoPage('score')" class="fn-item" v-if="showAdvertisement">
                    <view class="icon">
                        <image src="../../static/-student-.png" mode=""></image>
                    </view>
                    <view class="title">
                        <text>个人成绩</text>
                    </view>
                </div> -->
                <div class="fn-item" @click="gotoPage('ecard')">
                    <view class="icon">
                        <image src="../../static/-student-.png" mode=""></image>
                    </view>
                    <view class="title">
                        <text>一卡通</text>
                    </view>
                </div>
                <div v-for="d in navList" @click="gotoPage(d.target)" class="fn-item">
                    <view class="icon">
                        <image :src="d.img" mode=""></image>
                    </view>
                    <view class="title">
                        <text>{{ d.title }}</text>
                    </view>
                </div>
                <div class="fn-item" v-for=" in emptyNum">
                    <view class="icon"> </view>
                    <view class="title"> </view>
                </div>
            </div>
        </div>
        <custom-tabbar :selected="2"></custom-tabbar>
    </view>
</template>

<script setup>
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import axios from "@/uilts/axios.js";

const navList = ref([]);
const emptyNum = ref();
const showAdvertisement = ref(false);

function gotoPage(path) {
    uni.navigateTo({
        url: `/pages/${path}/${path}`,
    });
}

onShow(async () => {
    const hiddenNavList = uni.getStorageSync("home-nav-list") || [];
    navList.value = hiddenNavList.filter(d => !d.isShow);
    emptyNum.value = 15;
    emptyNum.value -= navList.value.length - 1;
    const res = await axios.get("/common/advertisement");
    showAdvertisement.value = res.data.data;
});
</script>

<style lang="scss">
.more-fn {
    height: 100vh;
    background-color: #f5f5f5;

    .container {
        padding: 10rpx;
        height: 100%;

        .fn-list {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;

            .fn-item {
                flex-basis: 19%;
                height: 150rpx;
                display: flex;
                align-items: center;
                justify-content: space-around;
                flex-direction: column;
                padding: 20rpx;
                border: 1px solid #ccc;
                background-color: #f5f5f5;

                .icon {
                    image {
                        width: 70rpx;
                        height: 70rpx;
                    }
                }

                .title {
                    font-size: 24rpx;
                    text-align: center;
                }
            }
        }
    }
}
</style>
