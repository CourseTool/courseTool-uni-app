"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    selected: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      color: "#fff",
      selectedColor: "#6777FD",
      list: [
        {
          "text": "首页",
          "pagePath": "pages/home/home",
          "iconPath": "../../static/nav/首页.png",
          "selectedIconPath": "../../static/nav/首页(1).png"
        },
        {
          "text": "推荐",
          "pagePath": "pages/community/community",
          "iconPath": "../../static/nav/文档(1).png",
          "selectedIconPath": "../../static/nav/文档.png"
        },
        {
          "text": "更多功能",
          "pagePath": "pages/more-fn/more-fn",
          "iconPath": "../../static/nav/功能1(2).png",
          "selectedIconPath": "../../static/nav/功能1(2).png"
        },
        {
          "text": "新生答疑",
          "pagePath": "pages/newborn-aq/newborn-aq",
          "iconPath": "../../static/nav/意见(1).png",
          "selectedIconPath": "../../static/nav/意见.png"
        },
        {
          "text": "我的",
          "pagePath": "pages/my/my",
          "iconPath": "../../static/nav/我的(3).png",
          "selectedIconPath": "../../static/nav/我的(2).png"
        }
      ]
    };
  },
  methods: {
    switchTab(path) {
      path = path.split("/").pop();
      common_vendor.index.redirectTo({
        url: `/pages/${path}/${path}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: $props.selected === index ? item.selectedIconPath : item.iconPath,
        b: common_vendor.t(item.text),
        c: ($props.selected === index ? true : false) ? 1 : "",
        d: common_vendor.o(($event) => $options.switchTab(item.pagePath, index), index),
        e: $props.selected === index ? 1 : "",
        f: index
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/custom-tabbar/custom-tabbar.js.map
