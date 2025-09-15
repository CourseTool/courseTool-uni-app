<template>
    <view @click="closeMessage" catchtouchmove="true" class="message">
        <div class="inner">
            <p>公告:</p>
            <p class="content">进去玩一分钟有奖励</p>
            <image style="height:20vh" mode="aspectFit" src="/static/5.jpg" />
        </div>
        <div @click="gotoGG1" class="goto">
            <p>立即前往</p>
        </div>
        <div @click="closeMessage" class="close">
            <p>关闭</p>
        </div>
        <!-- 		<div @click='copyCode' class="close">
			<p>复制微信号</p>
		</div> -->
    </view>
</template>

<script setup>
import { defineEmits, onMounted, ref } from "vue";
import { getMeessageAPI } from "@/API/course.js";

const emit = defineEmits(["closeMessage"]);
const message = ref("");

function gotoGG1() {
    uni.navigateToMiniProgram({
        appId: "wxdb448ed93fb5fb33",
        path: "pages/index/index",
        success() {
            console.log("跳转成功");
        },
    });
}

function copyCode() {
    uni.setClipboardData({
        data: "xiangxinyuan1314520",
        success: function () {
            uni.showToast({
                title: "复制成功",
                icon: "success",
            });
        },
    });
}

function copyText(t) {
    uni.setClipboardData({
        data: t,
        success: function () {
            uni.showToast({
                title: "复制成功",
                icon: "success",
            });
        },
    });
}

function gotoMyBolg() {
    uni.setClipboardData({
        data: "https://www.course.pink",
        success: function () {
            uni.showToast({
                title: "复制成功",
                icon: "success",
            });
        },
    });
}

async function getMessage() {
    const { data } = await getMeessageAPI();
    message.value = data.data;
}

function closeMessage() {
    emit("closeMessage");
}
</script>

<style lang="scss">
.message
{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 110vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9999;

    .inner
    {
        width: 80vw;
        z-index: 111;
        border-radius: 20rpx;
        padding: 20rpx;
        line-height: 1.8;
        font-size: 30rpx;
        letter-spacing: 2rpx;
        color: #333;
        background-color: #fff;

        view:first-child
        {
            font-weight: bold;
            font-family: "Lucida Handwriting";
        }

        .content
        {
            text-indent: 60rpx;
        }
    }

    .close
    {
        margin-top: 20rpx;
        width: 140rpx;
        height: 70rpx;
        background-color: #fff;
        border-radius: 10rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26rpx;
    }

    .goto
    {
        margin-top: 20rpx;
        width: 140rpx;
        height: 70rpx;
        background-color: #fff;
        border-radius: 10rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26rpx;
    }
}
</style>
