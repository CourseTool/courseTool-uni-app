<template>
    <view class="container">
        <view class="search-box">
            <input type="text" v-model="dormId" placeholder="请输入宿舍号 例如10-437" class="input" />
            <button class="btn" @click="getElectric">查询</button>
        </view>

        <view v-if="result" class="card">
            <view class="card-title">宿舍电费信息</view>
            <view class="card-item">
                <text class="label">宿舍号：</text>
                <text>{{ result.UserCode }}</text>
            </view>
            <view class="card-item">
                <text class="label">剩余电费：</text>
                <text class="highlight">{{ result.Reserve }} 元</text>
            </view>
            <view class="card-item">
                <text class="label">缴费方式：</text>
                <text>{{ payTypeMap[result.PayType] }}</text>
            </view>
            <view class="card-item">
                <text class="label">最近抄表时间：</text>
                <text>{{ result.ReadTime }}</text>
            </view>
        </view>

        <view v-else class="empty"> 暂无查询结果，请输入宿舍号查询 </view>
    </view>
</template>

<script setup>
import { ref } from "vue";
import { getElectricAPI } from "../../API/ecard.js";

const dormId = ref("");
const result = ref("");

const payTypeMap = {
    1: "现金",
    2: "预付费",
    3: "校园卡",
};

async function getElectric() {
    uni.showLoading({
        title: "查询中...",
        mask: true,
    });
    if (!dormId.value) {
        uni.showToast({ title: "请输入宿舍号", icon: "none" });
        return;
    }
    try {
        const res = await getElectricAPI(dormId.value);
        if (res.data.data.Code !== "-1") {
            result.value = res.data.data;
        } else {
            uni.showToast({ title: res.data?.Msg || "查询失败,请检查宿舍号是否正确", icon: "error" });
        }
    } catch (err) {
        uni.showToast({ title: "接口请求失败", icon: "none" });
    }
    uni.hideLoading();
}
</script>

<style lang="scss">
.container {
    padding: 20rpx;
}

.search-box {
    display: flex;
    gap: 20rpx;
    margin-bottom: 30rpx;
}

.input {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 8rpx;
    padding: 16rpx;
    font-size: 28rpx;
}

.btn {
    background-color: #4a90e2;
    color: #fff;
    border: none;
    border-radius: 8rpx;
    padding: 0 32rpx;
    font-size: 28rpx;
}

.card {
    background: #fff;
    padding: 24rpx;
    border-radius: 16rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.card-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
    color: #333;
}

.card-item {
    display: flex;
    margin-bottom: 12rpx;
    font-size: 28rpx;
    color: #555;
}

.label {
    color: #888;
    width: 220rpx;
}

.highlight {
    color: #e74c3c;
    font-weight: bold;
}

.empty {
    text-align: center;
    color: #aaa;
    font-size: 28rpx;
    margin-top: 40rpx;
}
</style>
