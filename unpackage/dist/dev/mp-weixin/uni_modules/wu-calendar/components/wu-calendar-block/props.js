"use strict";
const props = {
  props: {
    showMonth: {
      type: Boolean,
      default: false
    },
    // 折叠状态
    FoldStatus: {
      type: String,
      default: null
    },
    month: {
      type: [Number, String],
      default: null
    },
    color: {
      type: String,
      default: "#3c9cff"
    },
    startText: {
      type: String,
      default: "开始"
    },
    endText: {
      type: String,
      default: "结束"
    },
    weeks: {
      type: [Object, Array],
      default: () => {
        return [];
      }
    },
    calendar: {
      type: Object,
      default: () => {
        return {};
      }
    },
    selected: {
      type: Array,
      default: () => {
        return [];
      }
    },
    lunar: {
      type: Boolean,
      default: false
    },
    itemHeight: {
      type: Number,
      default: 64
    },
    monthShowCurrentMonth: {
      type: Boolean,
      default: false
    },
    actBadgeColor: {
      type: String,
      default: "#fff"
    }
  }
};
exports.props = props;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wu-calendar/components/wu-calendar-block/props.js.map
