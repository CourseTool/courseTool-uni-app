"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const API_course = require("../../API/course.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_custom_tabbar2 = common_vendor.resolveComponent("custom-tabbar");
  (_easycom_uni_icons2 + _easycom_custom_tabbar2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_custom_tabbar = () => "../../components/custom-tabbar/custom-tabbar.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_custom_tabbar)();
}
const _sfc_main = {
  __name: "community",
  setup(__props) {
    const lostFoundList = common_vendor.ref([]);
    const currentNavIndex = common_vendor.ref(0);
    function openDetails(data) {
      common_vendor.index.__f__("log", "at pages/community/community.vue:48", data);
      if (data.targetUrl) {
        const obj = data.targetUrl.split(",");
        common_vendor.index.navigateToMiniProgram({
          appId: obj[0],
          path: obj[1],
          success() {
            common_vendor.index.__f__("log", "at pages/community/community.vue:55", "跳转成功");
          }
        });
      } else if (data.copyText) {
        common_vendor.index.setClipboardData({
          data: data.copyText,
          success: function() {
            common_vendor.index.showToast({
              title: "复制成功",
              icon: "success"
            });
          }
        });
      }
    }
    common_vendor.computed(() => {
      return 295 * currentNavIndex.value + 20 + "rpx";
    });
    function previewImg(imgList, index) {
      common_vendor.index.previewImage({
        urls: imgList,
        current: index,
        longPressActions: {
          itemList: ["发送给朋友", "保存图片", "收藏"]
        }
      });
    }
    async function getLostFoundList(type = "综合") {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      const res = await API_course.getTypeLostFoundListAPI(type);
      lostFoundList.value = res.data.data;
      common_vendor.index.hideLoading();
    }
    common_vendor.onMounted(() => {
      getLostFoundList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(lostFoundList.value, (d, k0, i0) => {
          return {
            a: d.pic,
            b: common_vendor.t(d.push_name),
            c: common_vendor.t(d.push_name),
            d: common_vendor.t(d.content),
            e: common_vendor.f(d.img_list, (url, i, i1) => {
              return {
                a: common_vendor.o(($event) => previewImg(d.img_list, i)),
                b: url
              };
            }),
            f: common_vendor.t(d.created_time),
            g: "59657aeb-0-" + i0,
            h: "59657aeb-1-" + i0,
            i: common_vendor.o(($event) => openDetails(d))
          };
        }),
        b: common_assets._imports_0$2,
        c: common_vendor.p({
          color: "#c8c8c6",
          type: "redo",
          size: "20"
        }),
        d: common_vendor.p({
          color: "#c8c8c6",
          type: "info",
          size: "12"
        }),
        e: common_vendor.p({
          selected: 1
        })
      };
    };
  }
};
_sfc_main.__runtimeHooks = 6;
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/community/community.js.map
