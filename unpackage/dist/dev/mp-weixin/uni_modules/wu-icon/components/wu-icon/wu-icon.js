"use strict";
const uni_modules_wuUiTools_libs_mixin_mpMixin = require("../../../wu-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_wuUiTools_libs_mixin_mixin = require("../../../wu-ui-tools/libs/mixin/mixin.js");
const uni_modules_wuIcon_components_wuIcon_icons = require("./icons.js");
const uni_modules_wuIcon_components_wuIcon_props = require("./props.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "wu-icon",
  emits: ["click"],
  mixins: [uni_modules_wuUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_wuUiTools_libs_mixin_mixin.mixin, uni_modules_wuIcon_components_wuIcon_props.props],
  data() {
    return {
      colorType: [
        "primary",
        "success",
        "info",
        "error",
        "warning"
      ]
    };
  },
  computed: {
    uClasses() {
      let classes = [];
      classes.push(this.customPrefix);
      classes.push(this.customPrefix + "-" + this.name);
      if (this.color && this.colorType.includes(this.color))
        classes.push("wu-icon__icon--" + this.color);
      return classes;
    },
    iconStyle() {
      let style = {};
      style = {
        fontSize: this.$w.addUnit(this.size),
        lineHeight: this.$w.addUnit(this.size),
        fontWeight: this.bold ? "bold" : "normal",
        // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
        top: this.$w.addUnit(this.top)
      };
      if (this.color && !this.colorType.includes(this.color))
        style.color = this.color;
      return style;
    },
    // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
    isImg() {
      const isBase64 = this.name.indexOf("data:") > -1 && this.name.indexOf("base64") > -1;
      return this.name.indexOf("/") !== -1 || isBase64;
    },
    imgStyle() {
      let style = {};
      style.width = this.width ? this.$w.addUnit(this.width) : this.$w.addUnit(this.size);
      style.height = this.height ? this.$w.addUnit(this.height) : this.$w.addUnit(this.size);
      return style;
    },
    // 通过图标名，查找对应的图标
    icon() {
      const code = uni_modules_wuIcon_components_wuIcon_icons.icons["wuicon-" + this.name];
      if (["wuicon"].indexOf(this.customPrefix) > -1) {
        return code ? unescape(`%u${code}`) : this.name;
      } else {
        return "";
      }
    },
    // label样式
    labelStyle() {
      let style = {
        color: this.labelColor,
        fontSize: this.$w.addUnit(this.labelSize),
        marginLeft: this.labelPos == "right" ? this.$w.addUnit(this.space) : 0,
        marginTop: this.labelPos == "bottom" ? this.$w.addUnit(this.space) : 0,
        marginRight: this.labelPos == "left" ? this.$w.addUnit(this.space) : 0,
        marginBottom: this.labelPos == "top" ? this.$w.addUnit(this.space) : 0
      };
      return style;
    }
  },
  methods: {
    clickHandler(e) {
      this.$emit("click", this.index);
      this.stop && this.preventEvent(e);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.label !== "" && (_ctx.labelPos == "left" || _ctx.labelPos == "top")
  }, _ctx.label !== "" && (_ctx.labelPos == "left" || _ctx.labelPos == "top") ? {
    b: common_vendor.t(_ctx.label),
    c: common_vendor.s($options.labelStyle)
  } : {}, {
    d: $options.isImg
  }, $options.isImg ? {
    e: _ctx.name,
    f: _ctx.imgMode,
    g: common_vendor.s($options.imgStyle),
    h: common_vendor.s(_ctx.$w.addStyle(_ctx.customStyle))
  } : {
    i: common_vendor.t($options.icon),
    j: common_vendor.n($options.uClasses),
    k: common_vendor.s($options.iconStyle),
    l: common_vendor.s(_ctx.$w.addStyle(_ctx.customStyle)),
    m: _ctx.hoverClass
  }, {
    n: _ctx.label !== "" && (_ctx.labelPos == "right" || _ctx.labelPos == "bottom")
  }, _ctx.label !== "" && (_ctx.labelPos == "right" || _ctx.labelPos == "bottom") ? {
    o: common_vendor.t(_ctx.label),
    p: common_vendor.s($options.labelStyle)
  } : {}, {
    q: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args)),
    r: common_vendor.n("wu-icon--" + _ctx.labelPos)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c6cfe730"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wu-icon/components/wu-icon/wu-icon.js.map
