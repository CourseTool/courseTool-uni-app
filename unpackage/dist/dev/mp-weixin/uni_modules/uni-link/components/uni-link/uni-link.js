"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "uniLink",
  props: {
    href: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    download: {
      type: String,
      default: ""
    },
    showUnderLine: {
      type: [Boolean, String],
      default: true
    },
    copyTips: {
      type: String,
      default: "已自动复制网址，请在手机浏览器里粘贴该网址"
    },
    color: {
      type: String,
      default: "#999999"
    },
    fontSize: {
      type: [Number, String],
      default: 14
    }
  },
  computed: {
    isShowA() {
      if ((this.isMail() || this.isTel()) && this._isH5 === true) {
        return true;
      }
      return false;
    }
  },
  created() {
    this._isH5 = null;
  },
  methods: {
    isMail() {
      return this.href.startsWith("mailto:");
    },
    isTel() {
      return this.href.startsWith("tel:");
    },
    openURL() {
      common_vendor.index.setClipboardData({
        data: this.href
      });
      common_vendor.index.showModal({
        content: this.copyTips,
        showCancel: false
      });
    },
    makePhoneCall(phoneNumber) {
      common_vendor.index.makePhoneCall({
        phoneNumber
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.isShowA
  }, $options.isShowA ? {
    b: common_vendor.t($props.text),
    c: $props.href,
    d: $props.showUnderLine === true || $props.showUnderLine === "true" ? 1 : "",
    e: $props.color,
    f: $props.fontSize + "px",
    g: $props.download
  } : {
    h: common_vendor.t($props.text),
    i: $props.showUnderLine === true || $props.showUnderLine === "true" ? 1 : "",
    j: $props.color,
    k: $props.fontSize + "px",
    l: common_vendor.o((...args) => $options.openURL && $options.openURL(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-link/components/uni-link/uni-link.js.map
