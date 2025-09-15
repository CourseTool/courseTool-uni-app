"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "score",
  setup(__props) {
    const username = common_vendor.ref("");
    const password = common_vendor.ref("");
    const scoreList = common_vendor.ref([]);
    const groupedScores = common_vendor.ref({});
    function groupScoresByStartDate(scores) {
      const groups = {};
      scores.forEach((score) => {
        const startDate = score.startDate;
        if (!groups[startDate]) {
          groups[startDate] = [];
        }
        groups[startDate].push(score);
      });
      scores = scores.sort((a, b) => a.score - b.score);
      return groups;
    }
    function getScoreStyle(score) {
      const grade = parseFloat(score.score);
      if (grade >= 90) {
        return { backgroundColor: "#d4edda", color: "#28a745" };
      } else if (grade < 60) {
        return { backgroundColor: "#f8d7da", color: "#dc3545" };
      } else {
        return { backgroundColor: "#fff3cd", color: "#ffc107" };
      }
    }
    function getScore() {
      if (username.value === "" || password.value === "") {
        common_vendor.index.showToast({
          title: "请输入学号和密码",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showToast({
        title: "查询中...",
        icon: "loading",
        mask: true,
        // 防止用户点击屏幕,
        duration: 1e4
      });
      common_vendor.index.request({
        url: "https://www.course.pink:5000/user/score",
        // 假设这个是正确的 API 地址
        data: {
          username: username.value,
          password: password.value
        },
        success(res) {
          const data = res.data.data;
          scoreList.value = data;
          groupedScores.value = groupScoresByStartDate(data);
          common_vendor.index.setStorageSync("scoreList", groupedScores.value);
          common_vendor.index.hideToast();
          common_vendor.index.showToast({
            title: "查询成功",
            icon: "success"
          });
        },
        fail() {
          common_vendor.index.hideToast();
          common_vendor.index.showToast({
            title: "请求失败，请重试",
            icon: "none"
          });
        }
      });
    }
    common_vendor.onMounted(() => {
      if (common_vendor.index.getStorageSync("scoreList")) {
        groupedScores.value = common_vendor.index.getStorageSync("scoreList");
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: username.value,
        b: common_vendor.o(($event) => username.value = $event.detail.value),
        c: password.value,
        d: common_vendor.o(($event) => password.value = $event.detail.value),
        e: common_vendor.o(getScore),
        f: Object.keys(groupedScores.value).length > 0
      }, Object.keys(groupedScores.value).length > 0 ? {
        g: common_vendor.f(groupedScores.value, (scores, startDate, i0) => {
          return {
            a: common_vendor.t(startDate),
            b: common_vendor.f(scores, (score, index, i1) => {
              return {
                a: common_vendor.t(score.name),
                b: common_vendor.t(score.score),
                c: index,
                d: common_vendor.s(getScoreStyle(score))
              };
            }),
            c: startDate
          };
        })
      } : common_vendor.e({
        h: Object.keys(groupedScores.value).length === 0
      }, Object.keys(groupedScores.value).length === 0 ? {} : {}));
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/score/score.js.map
