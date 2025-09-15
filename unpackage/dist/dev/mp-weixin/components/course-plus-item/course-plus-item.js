"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "course-plus-item",
  props: ["data", "type", "isTeacher"],
  setup(__props) {
    const props = __props;
    const sectionPosMap = {
      "第一大节": 0,
      "第二大节": 1,
      "第三大节": 2,
      "第四大节": 3,
      "第五大节": 4,
      "第六大节": 5
    };
    var styles = common_vendor.reactive({
      borderColor: "#c3d8ee",
      backgroundColor: "#e9f3fb",
      color: "#5499DE",
      top: 0
    });
    function randomColor() {
      const colorMap = [
        {
          borderColor: "#c3d8ee",
          backgroundColor: "#e9f3fb",
          color: "#5499DE"
        },
        {
          borderColor: "#f1c3bf",
          backgroundColor: "#faf1f2",
          color: "#F55142"
        },
        {
          borderColor: "#d5cbef",
          backgroundColor: "#f1edfb",
          color: "#996BE8"
        },
        {
          borderColor: "#f5e3a4",
          backgroundColor: "#fefae0",
          color: "#F5B20A"
        }
      ];
      const random = parseInt(Math.random() * colorMap.length);
      return colorMap[random];
    }
    const getPosition = (section) => {
      if (props.isTeacher) {
        return sectionPosMap[section] * 215 + "rpx";
      }
      return sectionPosMap[section] * 230 + "rpx";
    };
    const getCoursePosition = (str) => {
      if (str.replaceAll(/[\u4e00-\u9fa5]/g, "").length === 0) {
        return str;
      }
      return str.replaceAll(/[\u4e00-\u9fa5]/g, "").substring(0, 7).replace("(", "").replace(")", "");
    };
    common_vendor.onMounted(() => {
      const s = randomColor();
      styles.backgroundColor = s.backgroundColor;
      styles.borderColor = s.borderColor;
      styles.color = s.color;
      if (props.isTeacher) {
        styles.height = "165rpx;";
      }
      if (props.type === "grid") {
        styles.height = props.data.isContinuous ? "430rpx" : "200rpx";
        styles.boxShadow = "0 0 12rpx 2rpx" + styles.color;
      }
      styles.top = getPosition(props.data.courseSection);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.data.isEmpty
      }, props.data.isEmpty ? {
        b: common_vendor.s(common_vendor.unref(styles))
      } : {
        c: common_vendor.t(props.data.courseName.substring(0, 6)),
        d: common_vendor.t(getCoursePosition(props.data.coursePosition)),
        e: common_vendor.s(common_vendor.unref(styles)),
        f: props.type === "grid" ? 1 : ""
      });
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/course-plus-item/course-plus-item.js.map
