"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      serviceBadges: [
        {
          icon: "https://c.animaapp.com/mi5fl4nsfGephA/img/frame-1891.svg",
          text: "安心服务"
        },
        {
          icon: "https://c.animaapp.com/mi5fl4nsfGephA/img/frame-1891.svg",
          text: "7天无忧"
        },
        {
          icon: "https://c.animaapp.com/mi5fl4nsfGephA/img/frame-1891.svg",
          text: "免费设计"
        },
        {
          icon: "https://c.animaapp.com/mi5fl4nsfGephA/img/frame-1891.svg",
          text: "小吃水果"
        },
        {
          icon: "https://c.animaapp.com/mi5fl4nsfGephA/img/frame-1891.svg",
          text: "预约服务"
        }
      ],
      statistics: [
        { value: "1244", label: "预约" },
        { value: "2000", label: "粉丝" },
        { value: "18", unit: "年", label: "从业" },
        { value: "4.8", unit: "分", label: "评分" }
      ],
      tabs: ["服务", "预约", "作品", "点评"],
      dateOptions: [
        { date: "今天", day: "周一", active: true },
        { date: "明天", day: "周二", active: false },
        { date: "12.05", day: "周三", active: false },
        { date: "12.06", day: "周四", active: false },
        { date: "12.07", day: "周五", active: false },
        { date: "12.08", day: "周六", active: false },
        { date: "12.09", day: "周日", active: false }
      ],
      promotions: [{ text: "满100-5" }, { text: "满500-50" }]
    };
  },
  methods: {
    selectDate(index) {
      this.dateOptions.forEach((option, i) => {
        option.active = i === index;
      });
    },
    handleMoreClick() {
      common_vendor.index.navigateTo({
        url: "/pages/designer/info"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleMoreClick && $options.handleMoreClick(...args)),
    b: common_vendor.f($data.serviceBadges, (badge, index, i0) => {
      return {
        a: badge.icon,
        b: common_vendor.t(badge.text),
        c: index
      };
    }),
    c: common_vendor.f($data.statistics, (stat, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(stat.value),
        b: stat.unit
      }, stat.unit ? {
        c: common_vendor.t(stat.unit)
      } : {}, {
        d: common_vendor.t(stat.label),
        e: index
      });
    }),
    d: common_vendor.o((...args) => $options.handleMoreClick && $options.handleMoreClick(...args)),
    e: common_vendor.f($data.promotions, (promo, index, i0) => {
      return {
        a: common_vendor.t(promo.text),
        b: index
      };
    }),
    f: common_vendor.f($data.tabs, (tab, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(tab),
        b: tab === "预约" ? 1 : "",
        c: tab === "预约"
      }, tab === "预约" ? {} : {}, {
        d: index,
        e: tab === "预约" ? 1 : ""
      });
    }),
    g: common_vendor.f($data.dateOptions, (option, index, i0) => {
      return {
        a: common_vendor.t(option.date),
        b: option.active ? 1 : "",
        c: option.active && option.date === "今天" ? 1 : "",
        d: common_vendor.t(option.day),
        e: option.active ? 1 : "",
        f: index,
        g: option.active ? 1 : "",
        h: common_vendor.o(($event) => $options.selectDate(index), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b9c985d2"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/DesignerBookingSection.js.map
