<template>
    <view class="lost-found">
        <div class="list">
            <div @click='openDetails(d)' class="lost-found-item" v-for="d in lostFoundList">
                <div class="push-info">
                    <div class="left-pic">
                        <image :src="d.pic" mode=""></image>
                    </div>
                    <div class="right-info">
                        <p>{{ d.push_name }}</p>
                        <p>@{{ d.push_name }}</p>
                    </div>
                </div>
                <div class="content">
                    <p>{{ d.content }}</p>
                </div>
                <div class="img-list">
                    <image v-for="(url, i) in d.img_list" @click="previewImg(d.img_list, i)" :src="url" mode=""></image>
                </div>
                <div class="footer-tool">
                    <p class="time">
                        <image src="../../static/时钟.png" mode=""></image>
                        <span>{{ d.created_time }}</span>
                    </p>
                    <p class="share">
                        <uni-icons color="#c8c8c6" type="redo" size="20"></uni-icons>
                        <button open-type="share">分享</button>
                    </p>
                </div>
                <div style='display: flex; align-items: center; justify-content: flex-start;' class="tips">
					<uni-icons color="#c8c8c6" type="info" size="12"></uni-icons>				
					<span style='font-size:18rpx;color:#c8c8c6'>商业推广 真假请自行分辨 </span>
				</div>
            </div>
        </div>
        <custom-tabbar :selected="1"></custom-tabbar>
    </view>
</template>

<script setup>
import { getTypeLostFoundListAPI } from "@/API/course.js";
import { onMounted, ref, computed } from "vue";

const lostFoundList = ref([]);
const currentNavIndex = ref(0);

function openDetails(data){
	console.log(data);
	if(data.targetUrl){
		const obj = data.targetUrl.split(',');
		uni.navigateToMiniProgram({
		    appId: obj[0],
		    path: obj[1],
		    success() {
		        console.log("跳转成功");
		    },
		});
	}
	else if(data.copyText){
		uni.setClipboardData({
		    data: data.copyText,
		    success: function () {
		        uni.showToast({
		            title: "复制成功",
		            icon: "success",
		        });
		    },
		});
	}
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

function switchType(type, index) {
    currentNavIndex.value = index;
    getLostFoundList(type);
}

const activeLeft = computed(() => {
    return 295 * currentNavIndex.value + 20 + "rpx";
});

function previewImg(imgList, index) {
    uni.previewImage({
        urls: imgList,
        current: index,
        longPressActions: {
            itemList: ["发送给朋友", "保存图片", "收藏"],
        },
    });
}

async function getLostFoundList(type = "综合") {
    uni.showLoading({
        title: "加载中...",
    });
    const res = await getTypeLostFoundListAPI(type);
    lostFoundList.value = res.data.data;
    uni.hideLoading();
}

onMounted(() => {
    getLostFoundList();
});
</script>

<style lang="scss">
.lost-found {
    width: 100vw;
    height: 100vh;
    background-color: #f0eeef;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    .header {
        width: 100vw;
        height: 80rpx;
        background-color: #4285f4;
        color: #fff;
        font-size: 36rpx;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .nav {
        width: 100vw;
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 50rpx;
        box-sizing: border-box;
        background-color: #fff;
        font-size: 30rpx;
        font-weight: bold;
        position: relative;

        .nav-item {
            position: relative;
            z-index: 2;

            view {
                mix-blend-mode: hue;
            }
        }

        .active {
            position: absolute;
            left: 0rpx;
            top: 50%;
            transform: translateY(-50%);
            width: 120rpx;
            height: 60rpx;
            border-radius: 10rpx;
            background-color: #4285f4;
            color: #fff;
            text-align: center;
            line-height: 60rpx;
            z-index: 1;
            left: 30rpx;
            transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .white {
            color: #fff;
        }
    }

    .list {
        width: 97vw;
        height: 90vh;
        overflow: scroll;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        padding-bottom: 20rpx;

        .lost-found-item {
            margin-top: 20rpx;
            padding: 20rpx;
            width: 100%;
            background-color: #fff;
            box-shadow: 0px 5rpx 10rpx #c8c8c6;
            box-sizing: border-box;

            .push-info {
                display: flex;
                align-items: center;
                justify-content: flex-start;

                .left-pic {
                    image {
                        width: 60rpx;
                        height: 60rpx;
                        border-radius: 50%;
                    }
                }

                .right-info {
                    margin-left: 10rpx;

                    view:first-child {
                        font-size: 30rpx;
                        font-weight: bold;
                    }

                    view:last-child {
                        font-size: 22rpx;
                        color: #c8c8c6;
                    }
                }
            }

            .content {
                margin-top: 20rpx;
                font-size: 32rpx;
                color: #333;
                line-height: 1.5;
                letter-spacing: 1rpx;
                font-family: "Gill Sans";
            }

            .img-list {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex-wrap: nowrap;

                image {
                    width: 22vw;
                    height: 22vw;
                    border-radius: 10rpx;
                    overflow: hidden;
                    margin-right: 20rpx;
                    margin-top: 20rpx;
                }

                image:nth-child(3n + 3) {
                    margin-right: 0;
                }
            }

            .footer-tool {
                margin-top: 30rpx;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 20rpx;
                color: #c8c8c6;

                > view {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                button {
                    border: none;
                    outline: none;
                    background-color: transparent;
                    font-size: 22rpx;
                    padding: 0;
                    margin: 0;
                    color: #c8c8c6;

                    &::after {
                        content: none;
                    }
                }

                .time {
                    image {
                        width: 20rpx;
                        height: 20rpx;
                        margin-right: 5rpx;
                    }
                }
            }
        }
    }
}
</style>
