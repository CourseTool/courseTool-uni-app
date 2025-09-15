"use strict";
const uni_modules_wuUiTools_libs_mixin_mpMixin = require("../../../wu-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_wuUiTools_libs_mixin_mixin = require("../../../wu-ui-tools/libs/mixin/mixin.js");
const uni_modules_wuSafeBottom_components_wuSafeBottom_props = require("./props.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "wu-safe-bottom",
  mixins: [uni_modules_wuUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_wuUiTools_libs_mixin_mixin.mixin, uni_modules_wuSafeBottom_components_wuSafeBottom_props.props],
  data() {
    return {
      safeAreaBottomHeight: 0,
      isNvue: false
    };
  },
  computed: {
    style() {
      const {
        windowWidth,
        windowHeight,
        windowTop,
        safeArea,
        screenHeight,
        safeAreaInsets
      } = this.$w.sys();
      const style = {};
      style.height = this.$w.addUnit(screenHeight - safeArea.bottom, "px");
      return this.$w.deepMerge(style, this.$w.addStyle(this.customStyle));
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s($options.style)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-128ff778"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wu-safe-bottom/components/wu-safe-bottom/wu-safe-bottom.js.map
