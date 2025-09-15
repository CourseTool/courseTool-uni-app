"use strict";
const uni_modules_wuUiTools_libs_mixin_mpMixin = require("../../../wu-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_wuUiTools_libs_mixin_mixin = require("../../../wu-ui-tools/libs/mixin/mixin.js");
const uni_modules_wuCalendar_components_wuCalendarBlock_props = require("./props.js");
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wuCalendar_components_i18n_index = require("../i18n/index.js");
common_vendor.initVueI18n(uni_modules_wuCalendar_components_i18n_index.i18nMessages);
const _sfc_main = {
  emits: ["change"],
  mixins: [uni_modules_wuUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_wuUiTools_libs_mixin_mixin.mixin, uni_modules_wuCalendar_components_wuCalendarBlock_props.props],
  data() {
    return {
      FoldShowMonth: false,
      // 默认边距
      defaultMargin: 8
    };
  },
  mounted() {
    this.FoldShowMonth = this.FoldStatus == "open";
  },
  computed: {
    weekItemStyle() {
      let weeksLength = Object.keys(this.weeks).length;
      this.FoldStatus === "open" ? this.itemHeight * 6 : this.itemHeight;
      let margin = weeksLength && this.weeks[weeksLength - 1][0].empty ? this.itemHeight / (weeksLength - 1) + this.defaultMargin : this.defaultMargin;
      return {
        marginTop: margin / 2 + "px",
        marginBottom: margin / 2 + "px"
      };
    }
  },
  watch: {
    FoldStatus(newVal) {
      this.$nextTick(() => {
        this.FoldShowMonth = this.FoldStatus == "open";
      });
    }
  },
  methods: {
    choiceDate(weeks) {
      this.$emit("change", weeks);
    }
  }
};
if (!Array) {
  const _easycom_wu_calendar_item2 = common_vendor.resolveComponent("wu-calendar-item");
  _easycom_wu_calendar_item2();
}
const _easycom_wu_calendar_item = () => "../wu-calendar-item/wu-calendar-item.js";
if (!Math) {
  _easycom_wu_calendar_item();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.showMonth && $data.FoldShowMonth
  }, _ctx.showMonth && $data.FoldShowMonth ? {
    b: common_vendor.t(_ctx.month)
  } : {}, {
    c: common_vendor.f(_ctx.weeks, (item, weekIndex, i0) => {
      return {
        a: common_vendor.f(item, (weeks, weeksIndex, i1) => {
          return common_vendor.e({
            a: !_ctx.monthShowCurrentMonth || !weeks.empty
          }, !_ctx.monthShowCurrentMonth || !weeks.empty ? {
            b: common_vendor.o($options.choiceDate, weeksIndex),
            c: "1c0dbded-0-" + i0 + "-" + i1,
            d: common_vendor.p({
              weeks,
              calendar: _ctx.calendar,
              selected: _ctx.selected,
              lunar: _ctx.lunar,
              color: _ctx.color,
              actBadgeColor: _ctx.actBadgeColor,
              startText: _ctx.startText,
              endText: _ctx.endText,
              itemHeight: _ctx.itemHeight - $data.defaultMargin
            })
          } : {}, {
            e: weeksIndex
          });
        }),
        b: weekIndex
      };
    }),
    d: common_vendor.s($options.weekItemStyle)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1c0dbded"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wu-calendar/components/wu-calendar-block/wu-calendar-block.js.map
