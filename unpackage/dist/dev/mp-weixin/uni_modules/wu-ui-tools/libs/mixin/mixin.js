"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wuUiTools_libs_function_index = require("../function/index.js");
const uni_modules_wuUiTools_libs_function_test = require("../function/test.js");
const mixin = {
  // 定义每个组件都可能需要用到的外部样式以及类名
  props: {
    // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
    customStyle: {
      type: [Object, String],
      default: () => ({})
    },
    customClass: {
      type: String,
      default: ""
    },
    // 跳转的页面路径
    url: {
      type: String,
      default: ""
    },
    // 页面跳转的类型
    linkType: {
      type: String,
      default: "navigateTo"
    }
  },
  data() {
    return {};
  },
  onLoad() {
    this.$w.getRect = this.$wuGetRect;
  },
  created() {
    this.$w.getRect = this.$wuGetRect;
  },
  computed: {
    $w() {
      return {
        ...uni_modules_wuUiTools_libs_function_index.index,
        test: uni_modules_wuUiTools_libs_function_test.test
      };
    },
    /**
     * 生成bem规则类名
     * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
     * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
     * @param {String} name 组件名称
     * @param {Array} fixed 一直会存在的类名
     * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
     * @returns {Array|string}
     */
    bem() {
      return function(name, fixed, change) {
        const prefix = `wu-${name}--`;
        const classes = {};
        if (fixed) {
          fixed.map((item) => {
            classes[prefix + this[item]] = true;
          });
        }
        if (change) {
          change.map((item) => {
            this[item] ? classes[prefix + item] = this[item] : delete classes[prefix + item];
          });
        }
        return Object.keys(classes);
      };
    }
  },
  methods: {
    // 跳转某一个页面
    openPage(urlKey = "url") {
      const url = this[urlKey];
      if (url) {
        common_vendor.index[this.linkType]({
          url
        });
      }
    },
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $wuGetRect(selector, all) {
      return new Promise((resolve) => {
        common_vendor.index.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).exec();
      });
    },
    // 查询节点布局是否相交
    IntersectionObserver(_this, nodeName, callback) {
      this.$nextTick(() => {
        let intersectionObserver = common_vendor.index.createIntersectionObserver(_this);
        intersectionObserver.relativeToViewport({
          bottom: Number(this.lazyLoadRootMargin)
        }).observe(nodeName, (res) => {
          callback(res, () => intersectionObserver.disconnect());
        });
      });
    },
    getParentData(parentName = "") {
      if (!this.parent)
        this.parent = {};
      this.parent = this.$w.$parent.call(this, parentName);
      if (this.parent.children) {
        this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
      }
      if (this.parent && this.parentData) {
        Object.keys(this.parentData).map((key) => {
          this.parentData[key] = this.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent(e) {
      e && typeof e.stopPropagation === "function" && e.stopPropagation();
    },
    // 空操作
    noop(e) {
      this.preventEvent(e);
    }
  },
  onReachBottom() {
    common_vendor.index.$emit("wuOnReachBottom");
  },
  beforeDestroy() {
    if (this.parent && uni_modules_wuUiTools_libs_function_test.array(this.parent.children)) {
      const childrenList = this.parent.children;
      childrenList.map((child, index) => {
        if (child === this) {
          childrenList.splice(index, 1);
        }
      });
    }
  }
};
exports.mixin = mixin;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wu-ui-tools/libs/mixin/mixin.js.map
