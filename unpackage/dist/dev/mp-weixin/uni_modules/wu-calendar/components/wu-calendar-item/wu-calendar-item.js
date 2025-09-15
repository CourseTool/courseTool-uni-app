"use strict";
const uni_modules_wuUiTools_libs_mixin_mpMixin = require("../../../wu-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_wuUiTools_libs_mixin_mixin = require("../../../wu-ui-tools/libs/mixin/mixin.js");
const uni_modules_wuCalendar_components_wuCalendarItem_props = require("./props.js");
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wuCalendar_components_i18n_index = require("../i18n/index.js");
const {
  t
} = common_vendor.initVueI18n(uni_modules_wuCalendar_components_i18n_index.i18nMessages);
const _sfc_main = {
  emits: ["change"],
  mixins: [uni_modules_wuUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_wuUiTools_libs_mixin_mixin.mixin, uni_modules_wuCalendar_components_wuCalendarItem_props.props],
  computed: {
    todayText() {
      return t("wu-calender.today");
    },
    // 每项日历样式
    calendarItemStyle() {
      let style = {};
      let color = this.$w.Color.gradient(this.color, this.$w.Color.isLight(this.color) ? "#000" : "#fff", 100)[6];
      if (this.weeks.rangeMultiple) {
        style = {
          backgroundColor: this.$w.Color.gradient(this.color, "#fff", 100)[80],
          color
        };
      }
      if (this.weeks.isDay) {
        style.color = color;
      }
      if (this.weeks.disable) {
        style = {
          backgroundColor: "rgba(249, 249, 249, 0.3)",
          color: "#c0c0c0"
        };
      }
      return style;
    },
    // 选中的日期样式
    actMultipleStyle() {
      if ((this.weeks.beforeRange || this.weeks.afterRange || this.weeks.multiples || this.calendar.fullDate === this.weeks.fullDate && this.weeks.mode === "single") && !this.weeks.disable) {
        return {
          backgroundColor: this.color,
          color: "#fff",
          borderRadius: "12rpx"
        };
      }
    },
    // 徽标样式
    badgeStyle() {
      let style = {
        backgroundColor: this.weeks.disable ? "#c0c0c0" : "#e43d33",
        width: "16rpx",
        height: "16rpx"
      };
      if (this.weeks.extraInfo) {
        if (this.weeks.extraInfo.badgeColor) {
          if ((this.weeks.beforeRange || this.weeks.afterRange || this.weeks.multiples || this.calendar.fullDate === this.weeks.fullDate && this.weeks.mode === "single") && !this.weeks.disable && this.$w.Color.convertFormat(this.weeks.extraInfo.badgeColor) == this.$w.Color.convertFormat(this.color)) {
            style.backgroundColor = this.actBadgeColor;
          } else {
            style.backgroundColor = this.weeks.extraInfo.badgeColor;
          }
        }
        if (this.weeks.extraInfo.badgeSize) {
          style.width = this.weeks.extraInfo.badgeSize;
          style.height = this.weeks.extraInfo.badgeSize;
        }
        if (!this.weeks.extraInfo.badgePosition) {
          style.right = "10rpx";
          style.top = "10rpx";
        } else if (this.weeks.extraInfo.badgePosition == "top-left") {
          style.top = "10rpx";
          style.left = "10rpx";
        } else if (this.weeks.extraInfo.badgePosition == "top-center") {
          style.top = "10rpx";
          style.left = "center";
        } else if (this.weeks.extraInfo.badgePosition == "top-right") {
          style.top = "10rpx";
          style.right = "10rpx";
        } else if (this.weeks.extraInfo.badgePosition == "bottom-left") {
          style.bottom = "10rpx";
          style.left = "10rpx";
        } else if (this.weeks.extraInfo.badgePosition == "bottom-center") {
          style.bottom = "10rpx";
          style.left = "center";
        } else if (this.weeks.extraInfo.badgePosition == "bottom-right") {
          style.bottom = "10rpx";
          style.right = "10rpx";
        }
      }
      return style;
    },
    // 日期文字
    dayText() {
      let text = "";
      if (this.weeks.isDay) {
        text = this.todayText;
      } else if (this.weeks.lunar.festival) {
        text = this.weeks.lunar.festival;
      } else if (this.weeks.lunar.isTerm) {
        text = this.weeks.lunar.Term;
      } else if (this.weeks.lunar.IDayCn === "初一") {
        text = this.weeks.lunar.IMonthCn;
      } else {
        text = this.weeks.lunar.IDayCn;
      }
      return text;
    },
    // 选中的文字
    multipleText() {
      let text = "";
      if (this.weeks.afterRange) {
        text = this.endText;
      } else if (this.weeks.beforeRange) {
        text = this.startText;
      }
      return text;
    }
  },
  methods: {
    choiceDate(weeks) {
      this.$emit("change", weeks);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.weeks.extraInfo && _ctx.weeks.extraInfo.topInfo
  }, _ctx.weeks.extraInfo && _ctx.weeks.extraInfo.topInfo ? {
    b: common_vendor.t(_ctx.weeks.extraInfo.topInfo),
    c: common_vendor.s({
      color: _ctx.weeks.extraInfo.topInfoColor || "#e43d33"
    }),
    d: common_vendor.s($options.calendarItemStyle),
    e: common_vendor.s($options.actMultipleStyle)
  } : {}, {
    f: _ctx.selected && _ctx.weeks.extraInfo && _ctx.weeks.extraInfo.badge
  }, _ctx.selected && _ctx.weeks.extraInfo && _ctx.weeks.extraInfo.badge ? {
    g: common_vendor.s($options.badgeStyle)
  } : {}, {
    h: common_vendor.t(_ctx.weeks.date),
    i: common_vendor.s($options.calendarItemStyle),
    j: common_vendor.s($options.actMultipleStyle),
    k: !_ctx.lunar && !_ctx.weeks.extraInfo && _ctx.weeks.isDay && !_ctx.weeks.beforeRange && !_ctx.weeks.afterRange
  }, !_ctx.lunar && !_ctx.weeks.extraInfo && _ctx.weeks.isDay && !_ctx.weeks.beforeRange && !_ctx.weeks.afterRange ? {
    l: common_vendor.t($options.todayText),
    m: common_vendor.s($options.calendarItemStyle),
    n: common_vendor.s($options.actMultipleStyle)
  } : {}, {
    o: _ctx.lunar && !_ctx.weeks.extraInfo && !_ctx.weeks.beforeRange && !_ctx.weeks.afterRange
  }, _ctx.lunar && !_ctx.weeks.extraInfo && !_ctx.weeks.beforeRange && !_ctx.weeks.afterRange ? {
    p: common_vendor.t($options.dayText),
    q: common_vendor.s($options.calendarItemStyle),
    r: common_vendor.s($options.actMultipleStyle)
  } : {}, {
    s: !_ctx.weeks.extraInfo && (_ctx.weeks.beforeRange || _ctx.weeks.afterRange)
  }, !_ctx.weeks.extraInfo && (_ctx.weeks.beforeRange || _ctx.weeks.afterRange) ? {
    t: common_vendor.t($options.multipleText),
    v: common_vendor.s($options.calendarItemStyle),
    w: common_vendor.s($options.actMultipleStyle)
  } : {}, {
    x: _ctx.weeks.extraInfo && _ctx.weeks.extraInfo.info
  }, _ctx.weeks.extraInfo && _ctx.weeks.extraInfo.info ? {
    y: common_vendor.t(_ctx.weeks.extraInfo.info),
    z: common_vendor.s({
      color: _ctx.weeks.extraInfo.infoColor || "#e43d33"
    }),
    A: common_vendor.s($options.calendarItemStyle),
    B: common_vendor.s($options.actMultipleStyle)
  } : {}, {
    C: common_vendor.s($options.actMultipleStyle),
    D: common_vendor.s({
      height: _ctx.itemHeight + "px"
    }),
    E: common_vendor.s($options.calendarItemStyle),
    F: common_vendor.s({
      borderTopLeftRadius: _ctx.weeks.beforeRange ? "12rpx" : "",
      borderBottomLeftRadius: _ctx.weeks.beforeRange ? "12rpx" : "",
      borderTopRightRadius: _ctx.weeks.afterRange ? "12rpx" : "",
      borderBottomRightRadius: _ctx.weeks.afterRange ? "12rpx" : ""
    }),
    G: common_vendor.o(($event) => $options.choiceDate(_ctx.weeks))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d206a17d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wu-calendar/components/wu-calendar-item/wu-calendar-item.js.map
