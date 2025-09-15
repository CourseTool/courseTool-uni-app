"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wuCalendar_components_wuCalendar_util = require("./util.js");
const uni_modules_wuUiTools_libs_mixin_mpMixin = require("../../../wu-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_wuUiTools_libs_mixin_mixin = require("../../../wu-ui-tools/libs/mixin/mixin.js");
const uni_modules_wuCalendar_components_wuCalendar_props = require("./props.js");
const uni_modules_wuCalendar_components_i18n_index = require("../i18n/index.js");
const {
  t
} = common_vendor.initVueI18n(uni_modules_wuCalendar_components_i18n_index.i18nMessages);
const _sfc_main = {
  mixins: [uni_modules_wuUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_wuUiTools_libs_mixin_mixin.mixin, uni_modules_wuCalendar_components_wuCalendar_props.props],
  emits: ["close", "cancel", "confirm", "change", "monthSwitch", "foldSwitch"],
  data() {
    return {
      show: false,
      weeks: [],
      preWeeks: [],
      nextWeeks: [],
      weeksMonth: null,
      preWeeksMonth: null,
      nextWeeksMonth: null,
      calendar: {},
      nowDate: "",
      aniMaskShow: false,
      swiperCurrent: 1,
      swiperChangeDirection: "",
      pickerDate: "",
      Fold: null,
      FoldStatus: null,
      weekContentStyle: {}
    };
  },
  computed: {
    /**
     * for i18n
     */
    okText() {
      return t("wu-calender.ok");
    },
    cancelText() {
      return t("wu-calender.cancel");
    },
    YearText() {
      return t("wu-calender.year");
    },
    MonthText() {
      return t("wu-calender.month");
    },
    todayText() {
      return t("wu-calender.today");
    },
    monText() {
      return t("wu-calender.MON");
    },
    TUEText() {
      return t("wu-calender.TUE");
    },
    WEDText() {
      return t("wu-calender.WED");
    },
    THUText() {
      return t("wu-calender.THU");
    },
    FRIText() {
      return t("wu-calender.FRI");
    },
    SATText() {
      return t("wu-calender.SAT");
    },
    SUNText() {
      return t("wu-calender.SUN");
    },
    calendarContentStyle() {
      return {
        height: (this.FoldStatus === "open" ? this.itemHeight * 6 : this.itemHeight) + "px"
      };
    },
    getDateType() {
      if (this.type === "year")
        return this.type;
      return this.FoldStatus === "open" ? "month" : "week";
    }
  },
  watch: {
    date(newVal) {
      this.cale.cleanRange();
      this.init(newVal);
    },
    mode(newVal) {
      this.cale.cleanRange();
      this.cale.resetMode(newVal);
      this.init(this.date);
    },
    startDate(val) {
      this.cale.resetSatrtDate(val);
      this.cale.setDate(this.nowDate.fullDate);
      this.assignmentWeeks();
    },
    endDate(val) {
      this.cale.resetEndDate(val);
      this.cale.setDate(this.nowDate.fullDate);
      this.assignmentWeeks();
    },
    monthShowCurrentMonth(val) {
      this.cale.resetMonthShowCurrentMonth(val);
      this.setDate(this.nowDate.fullDate);
    },
    rangeEndRepick(val) {
      this.cale.resetRangeEndRepick(val);
    },
    rangeSameDay(val) {
      this.cale.resetRangeSameDay(val);
    },
    rangeHaveDisableTruncation(val) {
      this.cale.resetRangeHaveDisableTruncation(val);
      this.cale.cleanRange();
      this.init(this.date);
    },
    selected: {
      handler(newVal) {
        this.cale.setSelectInfo(this.nowDate.fullDate, newVal);
        this.assignmentWeeks();
        let nowDateInfo = this.cale.canlender.filter((item) => item.fullDate && this.cale.dateEqual(item.fullDate, this.calendar.fullDate));
        if (nowDateInfo.length)
          this.calendar = nowDateInfo[0];
      },
      deep: true
    },
    fold(newVal) {
      this.Fold = newVal;
    },
    type(newVal) {
      this.initFold();
      this.cale.resetFoldStatus(this.FoldStatus);
      this.init(this.date);
    },
    startWeek(newVal) {
      this.cale.cleanRange();
      this.cale.resetStartWeek(newVal);
      this.init(this.date);
    }
  },
  created() {
    this.initFold();
    this.cale = new uni_modules_wuCalendar_components_wuCalendar_util.Calendar({
      selected: this.selected,
      startDate: this.startDate,
      endDate: this.endDate,
      mode: this.mode,
      type: this.type,
      startWeek: this.startWeek,
      foldStatus: this.FoldStatus,
      monthShowCurrentMonth: this.monthShowCurrentMonth,
      rangeEndRepick: this.rangeEndRepick,
      rangeSameDay: this.rangeSameDay,
      rangeHaveDisableTruncation: this.rangeHaveDisableTruncation
    });
    this.init(this.date);
  },
  methods: {
    // 取消穿透
    clean() {
      if (this.maskClick) {
        this.$emit("close");
        this.close();
      }
    },
    bindDateChange(e) {
      const value = e.detail.value + "-1";
      this.setDate(value);
      this.swiperCurrentChangeWeeks();
      const {
        year,
        month
      } = this.cale.getDate(value);
      this.$emit("monthSwitch", {
        year,
        month: Number(month),
        fullDate: `${year}-${`${month}`.padStart(2, "0")}`
      });
    },
    /**
     * 初始化日期显示
     * @param {Object} date
     */
    init(date) {
      let firstDate = this.mode == "single" ? date : date[0];
      if (date) {
        let dateType = Object.prototype.toString.call(date);
        if (this.mode == "single" && dateType != "[object String]") {
          return common_vendor.index.__f__("error", "at uni_modules/wu-calendar/components/wu-calendar/wu-calendar.vue:387", `类型错误，mode=${this.mode}时，date=String`);
        } else if (this.mode != "single" && dateType != "[object Array]") {
          return common_vendor.index.__f__("error", "at uni_modules/wu-calendar/components/wu-calendar/wu-calendar.vue:389", `类型错误，mode=${this.mode}时，date=Array`);
        }
        if (this.mode == "multiple") {
          this.cale.multiple = date.map((item) => item);
          this.cale._getWeek(this.cale.multiple[this.cale.multiple.length - 1]);
        } else if (this.mode == "range") {
          date[0] ? this.cale.setRange(date[0]) : "";
          date[1] ? this.cale.setRange(date[1]) : "";
        }
      } else if (this.useToday && !this.selected.filter((item) => item.disable && this.cale.dateEqual(item.date, this.cale.date.fullDate)).length) {
        if (this.mode == "multiple") {
          this.cale.multiple = [this.cale.date.fullDate];
          this.cale._getWeek(this.cale.multiple[this.cale.multiple.length - 1]);
        } else if (this.mode == "range") {
          this.cale.setRange(this.cale.date.fullDate);
        }
      }
      this.cale.setDate(firstDate);
      this.nowDate = this.cale.getInfo(firstDate);
      this.weeksMonth = this.nowDate.month;
      if (this.useToday && !this.date || this.date) {
        this.calendar = this.nowDate;
      }
      this.updateWeeks(false, true);
    },
    /**
     * 打开日历弹窗
     */
    open() {
      this.show = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.aniMaskShow = true;
        }, 50);
      });
    },
    /**
     * 关闭日历弹窗
     */
    close() {
      this.aniMaskShow = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this.show = false;
          if (this.clearDate && !this.insert) {
            this.reset();
          }
        }, 300);
      });
    },
    /**
     * 重置
     */
    reset() {
      this.cale.cleanRange();
      this.cale.cleanMultiple();
      this.swiperCurrent = 1;
      this.init(this.date);
    },
    /**
     * 确认按钮
     */
    confirm() {
      if (this.confirmFullDate) {
        if (this.mode == "single" && !this.calendar.fullDate) {
          return common_vendor.index.showToast({
            icon: "none",
            title: "请选择日期",
            duration: 600
          });
        } else if (this.mode == "multiple" && !this.cale.multiple.length) {
          return common_vendor.index.showToast({
            icon: "none",
            title: "请至少选择一个日期",
            duration: 600
          });
        } else if (this.mode == "range") {
          if (!this.cale.rangeStatus.before) {
            return common_vendor.index.showToast({
              icon: "none",
              title: "请选择开始日期",
              duration: 600
            });
          } else if (!this.cale.rangeStatus.after) {
            return common_vendor.index.showToast({
              icon: "none",
              title: "请选择结束日期",
              duration: 600
            });
          }
        }
      }
      this.setEmit("confirm");
      this.close();
    },
    /**
     * 取消按钮
     */
    cancel() {
      this.$emit("cancel");
      this.close();
    },
    /**
     * 变化触发
     */
    change() {
      if (!this.insert)
        return;
      this.setEmit("change");
    },
    /**
     * 选择月份触发
     */
    monthSwitch() {
      let {
        year,
        month
      } = this.nowDate;
      this.$emit("monthSwitch", {
        year,
        month: Number(month),
        fullDate: `${year}-${`${month}`.padStart(2, "0")}`
      });
    },
    /**
     * 派发事件
     * @param {Object} name
     */
    setEmit(name) {
      let {
        year,
        month,
        date,
        fullDate,
        lunar,
        extraInfo,
        type,
        mode
      } = this.calendar;
      let params = {
        range: this.cale.rangeStatus,
        multiple: this.cale.multiple,
        mode,
        type,
        year,
        month: Number(month),
        date,
        fulldate: fullDate,
        lunar,
        extraInfo: extraInfo || {}
      };
      if (this.type === "month" || this.type === "week") {
        params.foldStatus = this.FoldStatus;
      }
      this.$emit(name, params);
    },
    /**
     * 选择天触发
     * @param {Object} weeks
     */
    choiceDate(weeks) {
      if (weeks.disable || weeks.empty || this.disabledChoice)
        return;
      this.calendar = weeks;
      this.nowDate = this.calendar;
      this.cale.setRange(this.calendar.fullDate);
      this.cale.setMultiple(this.calendar.fullDate);
      if (this.slideSwitchMode !== "none") {
        let weekName = "";
        switch (this.swiperCurrent) {
          case 0:
            weekName = "preWeeks";
            if (this.mode == "range") {
              this.weeks = this.cale._getWeek(this.weeks[0].find((item) => item.fullDate).fullDate, false);
              this.nextWeeks = this.cale._getWeek(
                this.nextWeeks[0].find((item) => item.fullDate).fullDate,
                false
              );
            }
            break;
          case 1:
            weekName = "weeks";
            if (this.mode == "range") {
              this.preWeeks = this.cale._getWeek(
                this.preWeeks[0].find((item) => item.fullDate).fullDate,
                false
              );
              this.nextWeeks = this.cale._getWeek(
                this.nextWeeks[0].find((item) => item.fullDate).fullDate,
                false
              );
            }
            break;
          case 2:
            weekName = "nextWeeks";
            if (this.mode == "range") {
              this.weeks = this.cale._getWeek(this.weeks[0].find((item) => item.fullDate).fullDate, false);
              this.preWeeks = this.cale._getWeek(
                this.preWeeks[0].find((item) => item.fullDate).fullDate,
                false
              );
            }
            break;
        }
        this[weekName] = this.cale.weeks;
      } else {
        this.weeks = this.cale.weeks;
      }
      this.change();
    },
    /**
     * 回到今天
     */
    backToday() {
      const nowYearMonth = `${this.nowDate.year}-${this.nowDate.month}`;
      if (this.cale.rangeStatus.before && !this.cale.rangeStatus.after) {
        this.cale.rangeStatus.before = "";
      }
      this.setDate(this.cale.date.fullDate);
      let date = this.nowDate;
      this.calendar = date;
      this.cale.setRange(date.fullDate);
      const todayYearMonth = `${date.year}-${date.month}`;
      if (nowYearMonth !== todayYearMonth) {
        this.monthSwitch();
      }
      this.setDate(this.cale.date.fullDate);
      this.swiperCurrentChangeWeeks();
      this.change();
    },
    /**
     * 上个月
     */
    pre() {
      this.swiperChangeDirection = "pre";
      this.updateWeeks();
    },
    /**
     * 下个月
     */
    next() {
      this.swiperChangeDirection = "next";
      this.updateWeeks();
    },
    /**
     * 设置日期
     * @param {Object} date
     */
    setDate(date) {
      this.cale.setDate(date);
      this.nowDate = this.cale.getInfo(date);
      this.assignmentWeeks();
    },
    /**
     * 用来将cale.weeks 赋值到 weeks
     */
    assignmentWeeks() {
      let weekName = "";
      let weekMonthName = "";
      switch (this.swiperCurrent) {
        case 0:
          weekName = "preWeeks";
          weekMonthName = "preWeeksMonth";
          break;
        case 1:
          weekName = "weeks";
          weekMonthName = "weeksMonth";
          break;
        case 2:
          weekName = "nextWeeks";
          weekMonthName = "nextWeeksMonth";
          break;
      }
      this[weekName] = this.cale.weeks;
      this[weekMonthName] = this.cale.selectDate.month;
    },
    /**
     * 滑动切换日期
     */
    swiperChange(e) {
      if (e.detail.source !== "touch")
        return;
      let curr = e.detail.current;
      if (curr - this.swiperCurrent == 1 || curr - this.swiperCurrent == -2) {
        this.swiperChangeDirection = "next";
      } else {
        this.swiperChangeDirection = "pre";
      }
      this.swiperCurrent = curr;
      this.updateWeeks();
    },
    /**
     * 更新weeks
     * @param {Boolean} isChange 是否使当前的weeks发生变化
     */
    updateWeeks(isChange = true, isInt = false) {
      let newFullDate = "";
      if (isChange) {
        let fullDate = this.FoldStatus === "close" ? this.nowDate.fullDate : `${this.nowDate.year}-${this.nowDate.month}-${1}`;
        newFullDate = this.cale.getDate(fullDate, this.swiperChangeDirection === "next" ? 1 : -1, this.getDateType).fullDate;
      } else {
        newFullDate = this.cale.getDate(this.nowDate.fullDate, 0, this.getDateType).fullDate;
      }
      this.setDate(newFullDate);
      this.swiperCurrentChangeWeeks();
      if (!isInt) {
        this.monthSwitch();
      }
    },
    /**
     * swiperCurrent改变需要改动的weeks
     */
    swiperCurrentChangeWeeks() {
      if (this.slideSwitchMode === "none")
        return;
      this.$nextTick(() => {
        let nextDate = this.cale.getDate(this.nowDate.fullDate, 1, this.getDateType);
        let nextWeeks = this.cale._getWeek(nextDate.fullDate, false);
        let nextWeeksMonth = nextDate.month;
        let preDate = this.cale.getDate(this.nowDate.fullDate, -1, this.getDateType);
        let preWeeks = this.cale._getWeek(preDate.fullDate, false);
        let preWeeksMonth = preDate.month;
        if (this.swiperCurrent == 0) {
          this.weeks = nextWeeks;
          this.weeksMonth = nextWeeksMonth;
          this.nextWeeks = preWeeks;
          this.nextWeeksMonth = preWeeksMonth;
        } else if (this.swiperCurrent == 1) {
          this.nextWeeks = nextWeeks;
          this.nextWeeksMonth = nextWeeksMonth;
          this.preWeeks = preWeeks;
          this.preWeeksMonth = preWeeksMonth;
        } else {
          this.preWeeks = nextWeeks;
          this.preWeeksMonth = nextWeeksMonth;
          this.weeks = preWeeks;
          this.weeksMonth = preWeeksMonth;
        }
      });
    },
    // 点击折叠
    FoldClick() {
      this.FoldStatus = this.FoldStatus === "open" ? "close" : "open";
      this.cale.resetFoldStatus(this.FoldStatus);
      this.setDate(this.nowDate.fullDate);
      this.$nextTick(() => {
        if (this.slideSwitchMode !== "none") {
          let nextDate = this.cale.getDate(this.nowDate.fullDate, 1, this.getDateType);
          let nextWeeks = this.cale._getWeek(nextDate.fullDate, false);
          let nextWeeksMonth = nextDate.month;
          let preDate = this.cale.getDate(this.nowDate.fullDate, -1, this.getDateType);
          let preWeeks = this.cale._getWeek(preDate.fullDate, false);
          let preWeeksMonth = preDate.month;
          if (this.swiperChangeDirection == "next") {
            if (this.swiperCurrent == 0) {
              this.weeks = nextWeeks;
              this.weeksMonth = nextWeeksMonth;
              this.nextWeeks = preWeeks;
              this.nextWeeksMonth = preWeeksMonth;
            } else if (this.swiperCurrent == 1) {
              this.nextWeeks = nextWeeks;
              this.nextWeeksMonth = nextWeeksMonth;
              this.preWeeks = preWeeks;
              this.preWeeksMonth = preWeeksMonth;
            } else {
              this.preWeeks = nextWeeks;
              this.preWeeksMonth = nextWeeksMonth;
              this.weeks = preWeeks;
              this.weeksMonth = preWeeksMonth;
            }
          } else {
            if (this.swiperCurrent == 0) {
              this.nextWeeks = preWeeks;
              this.nextWeeksMonth = preWeeksMonth;
              this.weeks = nextWeeks;
              this.weeksMonth = nextWeeksMonth;
            } else if (this.swiperCurrent == 1) {
              this.preWeeks = preWeeks;
              this.preWeeksMonth = preWeeksMonth;
              this.nextWeeks = nextWeeks;
              this.nextWeeksMonth = nextWeeksMonth;
            } else {
              this.weeks = preWeeks;
              this.weeksMonth = preWeeksMonth;
              this.preWeeks = nextWeeks;
              this.preWeeksMonth = nextWeeksMonth;
            }
          }
        }
      });
      this.$emit("foldSwitch", {
        type: this.type,
        status: this.FoldStatus
      });
    },
    // 初始化折叠
    initFold() {
      if (this.type === "month" || this.type === "week") {
        this.Fold = this.fold === null ? this.type !== "month" : this.fold;
        this.FoldStatus = this.type !== "month" ? "close" : "open";
      }
    }
  }
};
if (!Array) {
  const _easycom_wu_calendar_block2 = common_vendor.resolveComponent("wu-calendar-block");
  const _easycom_wu_icon2 = common_vendor.resolveComponent("wu-icon");
  const _easycom_wu_safe_bottom2 = common_vendor.resolveComponent("wu-safe-bottom");
  (_easycom_wu_calendar_block2 + _easycom_wu_icon2 + _easycom_wu_safe_bottom2)();
}
const _easycom_wu_calendar_block = () => "../wu-calendar-block/wu-calendar-block.js";
const _easycom_wu_icon = () => "../../../wu-icon/components/wu-icon/wu-icon.js";
const _easycom_wu_safe_bottom = () => "../../../wu-safe-bottom/components/wu-safe-bottom/wu-safe-bottom.js";
if (!Math) {
  (_easycom_wu_calendar_block + _easycom_wu_icon + _easycom_wu_safe_bottom)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !_ctx.insert && $data.show
  }, !_ctx.insert && $data.show ? {
    b: $data.aniMaskShow ? 1 : "",
    c: common_vendor.o((...args) => $options.clean && $options.clean(...args))
  } : {}, {
    d: _ctx.insert || $data.show
  }, _ctx.insert || $data.show ? common_vendor.e({
    e: _ctx.operationPosition == "top"
  }, _ctx.operationPosition == "top" ? common_vendor.e({
    f: !_ctx.insert
  }, !_ctx.insert ? {
    g: common_vendor.t($options.cancelText),
    h: common_vendor.s({
      color: _ctx.cancelColor
    }),
    i: common_vendor.o((...args) => $options.cancel && $options.cancel(...args)),
    j: common_vendor.t($options.okText),
    k: common_vendor.s({
      color: _ctx.confirmColor
    }),
    l: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  } : {}) : {}, {
    m: _ctx.slideSwitchMode == "vertical"
  }, _ctx.slideSwitchMode == "vertical" ? {
    n: common_vendor.o((...args) => $options.pre && $options.pre(...args)),
    o: common_vendor.t(($data.nowDate.year || "") + $options.YearText + ($data.nowDate.month || "") + $options.MonthText),
    p: $data.nowDate.fullDate,
    q: common_vendor.o((...args) => $options.bindDateChange && $options.bindDateChange(...args)),
    r: common_vendor.o((...args) => $options.next && $options.next(...args)),
    s: common_vendor.t($options.todayText),
    t: common_vendor.o((...args) => $options.backToday && $options.backToday(...args))
  } : {
    v: common_vendor.o((...args) => $options.pre && $options.pre(...args)),
    w: common_vendor.t(($data.nowDate.year || "") + $options.YearText + ($data.nowDate.month || "") + $options.MonthText),
    x: $data.nowDate.fullDate,
    y: common_vendor.o((...args) => $options.bindDateChange && $options.bindDateChange(...args)),
    z: common_vendor.o((...args) => $options.next && $options.next(...args)),
    A: common_vendor.t($options.todayText),
    B: common_vendor.o((...args) => $options.backToday && $options.backToday(...args))
  }, {
    C: common_vendor.r("header", {
      nowDate: $data.nowDate
    }),
    D: _ctx.startWeek === "sun"
  }, _ctx.startWeek === "sun" ? {
    E: common_vendor.t($options.SUNText)
  } : {}, {
    F: common_vendor.t($options.monText),
    G: common_vendor.t($options.TUEText),
    H: common_vendor.t($options.WEDText),
    I: common_vendor.t($options.THUText),
    J: common_vendor.t($options.FRIText),
    K: common_vendor.t($options.SATText),
    L: _ctx.startWeek === "mon"
  }, _ctx.startWeek === "mon" ? {
    M: common_vendor.t($options.SUNText)
  } : {}, {
    N: _ctx.slideSwitchMode !== "none"
  }, _ctx.slideSwitchMode !== "none" ? common_vendor.e({
    O: _ctx.type === "month" || _ctx.type === "week"
  }, _ctx.type === "month" || _ctx.type === "week" ? {
    P: common_vendor.o($options.choiceDate),
    Q: common_vendor.p({
      weeks: $data.preWeeks,
      calendar: $data.calendar,
      selected: _ctx.selected,
      lunar: _ctx.lunar,
      color: _ctx.color,
      actBadgeColor: _ctx.actBadgeColor,
      startText: _ctx.startText,
      endText: _ctx.endText,
      month: $data.preWeeksMonth,
      FoldStatus: $data.FoldStatus,
      monthShowCurrentMonth: _ctx.monthShowCurrentMonth,
      showMonth: _ctx.showMonth,
      itemHeight: _ctx.itemHeight
    }),
    R: common_vendor.o($options.choiceDate),
    S: common_vendor.p({
      weeks: $data.weeks,
      calendar: $data.calendar,
      selected: _ctx.selected,
      lunar: _ctx.lunar,
      color: _ctx.color,
      actBadgeColor: _ctx.actBadgeColor,
      startText: _ctx.startText,
      endText: _ctx.endText,
      monthShowCurrentMonth: _ctx.monthShowCurrentMonth,
      month: $data.weeksMonth,
      FoldStatus: $data.FoldStatus,
      showMonth: _ctx.showMonth,
      itemHeight: _ctx.itemHeight
    }),
    T: common_vendor.o($options.choiceDate),
    U: common_vendor.p({
      weeks: $data.nextWeeks,
      calendar: $data.calendar,
      selected: _ctx.selected,
      lunar: _ctx.lunar,
      color: _ctx.color,
      actBadgeColor: _ctx.actBadgeColor,
      startText: _ctx.startText,
      endText: _ctx.endText,
      month: $data.nextWeeksMonth,
      FoldStatus: $data.FoldStatus,
      monthShowCurrentMonth: _ctx.monthShowCurrentMonth,
      showMonth: _ctx.showMonth,
      itemHeight: _ctx.itemHeight
    })
  } : {}, {
    V: common_vendor.s($options.calendarContentStyle),
    W: _ctx.slideSwitchMode == "vertical",
    X: $data.swiperCurrent,
    Y: common_vendor.o((...args) => $options.swiperChange && $options.swiperChange(...args))
  }) : {
    Z: common_vendor.s($options.calendarContentStyle),
    aa: common_vendor.o($options.choiceDate),
    ab: common_vendor.p({
      weeks: $data.weeks,
      calendar: $data.calendar,
      selected: _ctx.selected,
      lunar: _ctx.lunar,
      color: _ctx.color,
      actBadgeColor: _ctx.actBadgeColor,
      startText: _ctx.startText,
      endText: _ctx.endText,
      month: $data.nowDate.month,
      FoldStatus: $data.FoldStatus,
      monthShowCurrentMonth: _ctx.monthShowCurrentMonth,
      showMonth: _ctx.showMonth,
      itemHeight: _ctx.itemHeight
    })
  }, {
    ac: _ctx.type !== "year" && $data.Fold
  }, _ctx.type !== "year" && $data.Fold ? common_vendor.e({
    ad: $data.FoldStatus == "open"
  }, $data.FoldStatus == "open" ? {
    ae: common_vendor.p({
      name: "arrow-up",
      bold: true,
      size: "18"
    })
  } : $data.FoldStatus == "close" ? {
    ag: common_vendor.p({
      name: "arrow-down",
      bold: true,
      size: "18"
    })
  } : {}, {
    af: $data.FoldStatus == "close",
    ah: common_vendor.o((...args) => $options.FoldClick && $options.FoldClick(...args))
  }) : {}, {
    ai: _ctx.operationPosition == "bottom"
  }, _ctx.operationPosition == "bottom" ? common_vendor.e({
    aj: !_ctx.insert
  }, !_ctx.insert ? {
    ak: common_vendor.t($options.cancelText),
    al: common_vendor.s({
      color: _ctx.cancelColor
    }),
    am: common_vendor.o((...args) => $options.cancel && $options.cancel(...args)),
    an: common_vendor.t($options.okText),
    ao: common_vendor.s({
      color: _ctx.confirmColor
    }),
    ap: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  } : {}) : {}, {
    aq: !_ctx.insert && $data.show
  }, !_ctx.insert && $data.show ? {} : {}, {
    ar: !_ctx.insert ? 1 : "",
    as: $data.aniMaskShow ? 1 : ""
  }) : {}, {
    at: common_vendor.o(() => {
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bc534f10"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/wu-calendar/components/wu-calendar/wu-calendar.js.map
