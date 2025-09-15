"use strict";
const common_vendor = require("../../common/vendor.js");
const API_course = require("../../API/course.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "select-class",
  props: ["type", "dataList"],
  emits: ["hide-select-class"],
  setup(__props, { emit: __emit }) {
    const isShowPage = common_vendor.ref();
    const props = __props;
    const emit = __emit;
    const showList = common_vendor.ref([]);
    const filterClassList = common_vendor.ref([]);
    const searchKey = common_vendor.ref("");
    const showType = common_vendor.ref("");
    const activeClassList = common_vendor.ref([]);
    const topClassList = ["软件2303班", "软件2205班", "大数据会计2305班"];
    const topTeacherList = ["吴宇飞", "李锡辉", "王樱", "冯文韬", "刘洁"];
    const customDataList = common_vendor.ref([]);
    let timer = null;
    const getPlaceholder = common_vendor.computed(() => {
      const placeholderMap = {
        "student": "请输入你要搜索的班级",
        "classroom": "请输入你要搜索的教室",
        "teacher": "老师,请输入您的名字",
        "custom": "请输入你要搜索的内容"
      };
      return placeholderMap[props.type];
    });
    function selectVal(val) {
      emit("hide-select-class", val);
    }
    function searchClass() {
      if (timer)
        clearTimeout(timer);
      timer = setTimeout(() => {
        if (props.type === "teacher") {
          filterClassList.value = showList.value.filter((c) => c.tech_name.includes(searchKey.value)).map(
            (d) => d.tech_name
          );
        } else if (props.type === "classroom") {
          filterClassList.value = showList.value.filter((c) => c.classroom.includes(searchKey.value));
        } else if (props.type === "student") {
          filterClassList.value = showList.value.filter((c) => c.className.includes(searchKey.value)).map(
            (d) => d.className
          );
        } else {
          filterClassList.value = props.dataList.filter((c) => c.value.includes(searchKey.value));
        }
      }, 200);
    }
    async function getShowList() {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      switch (showType.value) {
        case "teacher":
          var {
            data
          } = await API_course.getTeacherListAPI();
          showList.value = data.data;
          filterClassList.value = showList.value;
          data.data = data.data.map((d) => d.tech_name);
          filterClassList.value = /* @__PURE__ */ new Set([...topTeacherList, ...data.data]);
          break;
        case "classroom":
          var {
            data
          } = await API_course.getClassroomListAPI();
          showList.value = data.data;
          filterClassList.value = showList.value;
          break;
        case "student":
          var res = await API_course.getActiveClassListAPI();
          showList.value = res.data.data;
          activeClassList.value = res.data.data;
          filterClassList.value = /* @__PURE__ */ new Set([...topClassList, ...res.data.data.map((d) => d.className)]);
          break;
      }
      setTimeout(() => {
        isShowPage.value = true;
        common_vendor.index.hideLoading();
      }, 100);
    }
    common_vendor.onMounted(async () => {
      showType.value = props.type || "student";
      if (props.dataList) {
        customDataList.value = props.dataList;
        filterClassList.value = customDataList.value;
      }
      getShowList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isShowPage.value
      }, isShowPage.value ? common_vendor.e({
        b: common_vendor.p({
          type: "search",
          size: "30"
        }),
        c: common_vendor.o([($event) => searchKey.value = $event.detail.value, searchClass]),
        d: getPlaceholder.value,
        e: searchKey.value,
        f: __props.type === "teacher"
      }, __props.type === "teacher" ? common_vendor.e({
        g: filterClassList.value.length === 0
      }, filterClassList.value.length === 0 ? {} : {}, {
        h: common_vendor.f(filterClassList.value || _ctx.classList, (c, k0, i0) => {
          return {
            a: common_vendor.t(c[0]),
            b: common_vendor.t(c),
            c: common_vendor.o(($event) => selectVal(c), c.id),
            d: c.id
          };
        })
      }) : {}, {
        i: __props.type === "classroom"
      }, __props.type === "classroom" ? common_vendor.e({
        j: filterClassList.value.length === 0
      }, filterClassList.value.length === 0 ? {} : {}, {
        k: common_vendor.f(filterClassList.value || showList.value, (c, index, i0) => {
          return {
            a: common_vendor.t(c.classroom),
            b: common_vendor.o(($event) => selectVal(c.classroom), index),
            c: index
          };
        }),
        l: common_vendor.t("教室")
      }) : {}, {
        m: __props.type === "student"
      }, __props.type === "student" ? common_vendor.e({
        n: filterClassList.value.length === 0
      }, filterClassList.value.length === 0 ? {} : {}, {
        o: common_vendor.f(filterClassList.value || activeClassList.value, (c, k0, i0) => {
          return {
            a: common_vendor.t(c[0]),
            b: common_vendor.t(c),
            c: common_vendor.o(($event) => selectVal(c), c.id),
            d: c.id
          };
        })
      }) : {}, {
        p: __props.type === "custom"
      }, __props.type === "custom" ? common_vendor.e({
        q: filterClassList.value.length === 0
      }, filterClassList.value.length === 0 ? {} : {}, {
        r: common_vendor.f(filterClassList.value || customDataList.value, (c, k0, i0) => {
          return {
            a: common_vendor.t(c.value[0]),
            b: common_vendor.t(c.value),
            c: common_vendor.o(($event) => selectVal(c))
          };
        })
      }) : {}) : {});
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/select-class/select-class.js.map
