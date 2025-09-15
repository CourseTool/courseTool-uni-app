<template>
    <view class="content">
        <uni-notice-bar scrollable @click="copycode" single text="请大家进入小程序QQ群794980138,使用过程中有问题可进行反馈 (点击可复制QQ群号)" />
        <view class="swiper" style="display: flex; align-items: center; justify-content: center">
            <!-- <swiper class="swiper" indicator-color="rgb(255,255,255)" circular :indicator-dots="true" :autoplay="true"
				:interval="5000" :duration="500">
				<swiper-item @click="gotoExternal">
					<view class="swiper-item">
						<p>招截图人员</p>
						<p>10-20/次/长期</p>
						<p>+Qqun:1060071659(点击可复制)</p>
					</view>
				</swiper-item> -->
            <!-- </swiper> -->
            <image src="../../static/logo.png" mode="left" style="margin-left: 30rpx"></image>
            <!-- 			<div @click="copyGG" class="gg-text">
				<p>皮皮源码素材网</p>
				<p>优质资源、教程公众号</p>
				<p>点击复制优质文章链接</p>
			</div> -->
        </view>
        <view class="nav">
            <ul class="nav-list" :class="{ newUi: isNewUi }">
                <li class="nav-item" v-for="d in homeNavList" @click="gotoPage(d.target)">
                    <view class="icon">
                        <image :src="d.img" mode=""></image>
                    </view>
                    <view class="title">
                        <text>{{ d.title }}</text>
                    </view>
                </li>
            </ul>
        </view>
        <!-- 		<view @click="gotogg" class="gg">
			<image src="../../static/gg.jpg" mode="scaleToFill" />
		</view> -->
        <!-- <DevMessage v-if="isShowMessage" @closeMessage="closeMessage"></DevMessage> -->
        <home-course></home-course>
        <custom-tabbar :selected="0"></custom-tabbar>
    </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onShow, onLoad } from "@dcloudio/uni-app";
import { getCourseConfig } from "../../uilts/time";

const isShowMessage = ref(false);
const homeNavList = ref([
    {
        title: "学生课表",
        img: "../../static/-calendar--2.svg",
        target: "course",
        isShow: true,
    },
    {
        title: "教师课表",
        img: "../../static/-calendar-.svg",
        target: "teacherCourse",
        isShow: true,
    },
    {
        title: "教室课表",
        img: "../../static/-search-.svg",
        target: "classroomCourse",
        isShow: true,
    },
    {
        title: "学生日历",
        img: "../../static/-calendar.svg",
        target: "calendar-course",
        isShow: true,
    },
    {
        title: "教师日历",
        img: "../../static/-calendar-2.svg",
        target: "calendar-tech-course",
        isShow: true,
    },
    {
        title: "搭子课表",
        img: "../../static/103-book-5.png",
        target: "lovers-course",
        isShow: true,
    },
    {
        title: "学生周次课表",
        img: "../../static/034-to-do.svg",
        target: "course-plus",
        isShow: true,
    },
    {
        title: "教师周次课表",
        img: "../../static/034-to-do(1).svg",
        target: "tech-course-plus",
        isShow: true,
    },
]);
const isNewUi = ref(false);
const fireworkEffects = ref(null);

function gotogg2() {
    uni.navigateToMiniProgram({
        appId: "wx95328ded5c3cb8be",
        path: "/pages/index/index",
        success() {
            console.log("跳转成功");
        },
    });
}

function copyGG() {
    uni.setClipboardData({
        data: "https://mp.weixin.qq.com/s/LfqOHl4GqrnEa307G9QsdA",
        success: function () {
            uni.showToast({
                title: "复制成功",
                icon: "success",
            });
        },
    });
}

function gotogg() {
    uni.navigateToMiniProgram({
        appId: "wx5bf904630ebb0b84",
        path: "/pages/index/index?coursetool=1",
        success() {
            console.log("跳转成功");
        },
    });
}

function gotoExternal() {
    uni.navigateToMiniProgram({
        appId: "wxe717f41737f3518c",
        path: "/pages/index/index",
        success() {
            console.log("跳转成功");
        },
    });
}

function onShareAppMessage() {
    wx.showShareMenu({
        withShareTicket: true,
        menu: ["shareAppMessage", "shareTimeline"],
    });
}
//用户点击右上角分享朋友圈
function onShareTimeline() {
    return {
        title: "",
        query: {
            key: value,
        },
        imageUrl: "",
    };
}

function copycode() {
    uni.setClipboardData({
        data: "794980138",
        success: function () {
            uni.showToast({
                title: "复制成功",
                icon: "success",
            });
        },
    });
}

function closeMessage() {
    isShowMessage.value = false;
    uni.setStorageSync("isShowMessage", false);
    const date = new Date();
    date.setDate(date.getDate() + 1);
    uni.setStorageSync("showMessageTime", Date.parse(date));
}

function gotoPage(path) {
    uni.navigateTo({
        url: `/pages/${path}/${path}`,
    });
}
onShow(() => {
    const navList = uni.getStorageSync("home-nav-list");
    isNewUi.value = uni.getStorageSync("isNewUi") === "" ? false : !!uni.getStorageSync("isNewUi");
    if (!!navList) {
        homeNavList.value = navList.filter(d => d.isShow);
    }
});
onLoad(async () => {
    isShowMessage.value = true;
    uni.showLoading({
        title: "加载配置中...",
        mask: true,
    });
    await getCourseConfig();
    uni.hideLoading();
});
</script>

<style lang="scss">
.gg {
    position: absolute;
    left: 0;
    bottom: 40%;
    transform: translateY(-0%);
    z-index: 1;
    width: 100rpx;
    height: 100rpx;

    image {
        border-radius: 50%;
        width: 100rpx;
        height: 100rpx;
    }
}

page > .content {
    min-height: 100vh;
    height: fit-content;
    background: #f5f5f5;
    padding-bottom: 150rpx;

    .swiper {
        height: 260rpx;
        .gg-text {
            view {
                font-size: 34rpx;
                color: #000;
                line-height: 2;
            }
        }
        .swiper-item {
            width: 100vw;
            display: block;
            height: 300rpx;
            line-height: 300rpx;
            text-align: center;
            p {
            }
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
            background: #4285f4;
            padding: 15rpx 0;
            border-radius: 20rpx;
            color: #fff;
        }
    }
}
</style>
