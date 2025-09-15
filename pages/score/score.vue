<template>
    <view class="container">
        <view class="score">
            <!-- 标题 -->
            <text class="title">成绩查询</text>

            <!-- 输入框 -->
            <view class="input-group">
                <input v-model="username" placeholder="请输入学号" type="text" class="input" />
                <input v-model="password" placeholder="请输入密码" type="password" class="input" />
            </view>

            <!-- 查询按钮 -->
            <div @click="getScore" class="post">
                <p>查询</p>
            </div>

            <!-- 成绩展示区域 -->
            <view v-if="Object.keys(groupedScores).length > 0" class="result">
                <view v-for="(scores, startDate) in groupedScores" :key="startDate" class="score-group">
                    <text class="group-title">开课日期: {{ startDate }}</text>
                    <view class="score-list">
                        <!-- 每行两列展示成绩 -->
                        <view v-for="(score, index) in scores" :key="index" class="score-item" :style="getScoreStyle(score)">
                            <text class="course-name">课程名称: {{ score.name }}</text>
                            <text class="score-value">成绩: {{ score.score }}</text>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 若没有查询到成绩 -->
            <view v-else>
                <text v-if="Object.keys(groupedScores).length === 0" class="no-result">暂无成绩数据</text>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, onMounted } from "vue";

const username = ref("");
const password = ref("");
const scoreList = ref([]); // 用于保存成绩数据
const groupedScores = ref({}); // 用于存放分组后的成绩数据

// 按照开课日期分组成绩
function groupScoresByStartDate(scores) {
    const groups = {};
    scores.forEach(score => {
        const startDate = score.startDate; // 假设 "开课日期" 字段存在并且是字符串类型
        if (!groups[startDate]) {
            groups[startDate] = [];
        }
        groups[startDate].push(score);
    });
    scores = scores.sort((a, b) => a.score - b.score);
    return groups;
}

// 根据成绩值设置背景颜色
function getScoreStyle(score) {
    const grade = parseFloat(score.score);
    if (grade >= 90) {
        return { backgroundColor: "#d4edda", color: "#28a745" }; // 绿色
    } else if (grade < 60) {
        return { backgroundColor: "#f8d7da", color: "#dc3545" }; // 红色
    } else {
        return { backgroundColor: "#fff3cd", color: "#ffc107" }; // 黄色
    }
}

function getScore() {
    if (username.value === "" || password.value === "") {
        uni.showToast({
            title: "请输入学号和密码",
            icon: "none",
        });
        return;
    }
    uni.showToast({
        title: "查询中...",
        icon: "loading",
        mask: true, // 防止用户点击屏幕,
        duration: 10000,
    });

    uni.request({
        url: "https://www.course.pink:5000/user/score", // 假设这个是正确的 API 地址
        data: {
            username: username.value,
            password: password.value,
        },
        success(res) {
            const data = res.data.data; // 获取成绩数据
            scoreList.value = data; // 更新成绩数据
            groupedScores.value = groupScoresByStartDate(data); // 根据开课日期分组
            uni.setStorageSync("scoreList", groupedScores.value);
            uni.hideToast(); // 隐藏查询中的动画
            uni.showToast({
                title: "查询成功",
                icon: "success",
            });
        },
        fail() {
            uni.hideToast();
            uni.showToast({
                title: "请求失败，请重试",
                icon: "none",
            });
        },
    });
}
onMounted(() => {
    if (uni.getStorageSync("scoreList")) {
        groupedScores.value = uni.getStorageSync("scoreList");
    }
});
</script>

<style lang="scss">
/* 页面容器 */
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f7f7f7;
}

/* 成绩查询区域 */
.score {
    width: 95%;
    background-color: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}

/* 标题 */
.title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 30rpx;
    color: #333;
}

/* 输入框 */
.input-group {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    align-items: center;
    margin: 20rpx 0;
}

/* 输入框样式 */
.input {
    width: 600rpx;
    padding: 12rpx;
    border: 1px solid #ccc;
    border-radius: 8rpx;
    font-size: 28rpx;
    color: #333;
    background-color: #fafafa;
    text-align: center;
}

/* 输入框聚焦时的样式 */
.input:focus {
    border-color: #4caf50;
}

/* 查询按钮 */
.post {
    width: 650rpx;
    padding: 15rpx 0;
    background-color: #4caf50;
    color: white;
    font-size: 30rpx;
    border-radius: 8rpx;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
}

/* 按钮悬停时的效果 */
.post:hover {
    background-color: #45a049;
}

/* 查询结果部分 */
.result {
    margin-top: 30rpx;
    text-align: left;
    padding: 10rpx;
}

/* 查询结果标题 */
.result-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 15rpx;
}

/* 成绩项样式 */
.score-group {
	margin: 20rpx 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
}

.group-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 10rpx;
}

.score-list {
    display: flex;
    flex-wrap: wrap; /* 使成绩项能够换行 */
    gap: 20rpx;
    justify-content: center;
}
.score-list .score-item:last-child:nth-child(odd){
	margin-right:50%;
}

/* 每个成绩项的样式 */
.score-item {
    width: 43%; /* 每行两列展示 */
    padding: 10rpx;
    border-radius: 8rpx;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 15rpx;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

/* 课程名称和成绩 */
.score-item > text {
    display: block;
    font-size: 32rpx;
    margin-bottom: 8rpx;
}

/* 无结果提示 */
.no-result {
    color: #999;
    font-size: 28rpx;
}
</style>
