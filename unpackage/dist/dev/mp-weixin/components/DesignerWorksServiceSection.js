"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      designerInfo: {
        avatar: "https://c.animaapp.com/mi5jretszAhz9Y/img/rectangle-153.png",
        name: "朱一龙",
        verifyIcon: "https://c.animaapp.com/mi5jretszAhz9Y/img/frame-2110.svg",
        role: "技术总监",
        certIcon: "https://c.animaapp.com/mi5jretszAhz9Y/img/frame-3.svg",
        certText: "职业认证",
        certDot: "https://c.animaapp.com/mi5jretszAhz9Y/img/frame-5.svg",
        skills: "染发设计、短发造型、女士晚装:",
        introduction: "从业19年，毕业沙宣美发学院，擅长各种造型设计师有丰富的设计经验擅长..."
      },
      serviceBadges: [
        { icon: "https://c.animaapp.com/mi5jretszAhz9Y/img/frame-1891.svg", label: "安心服务" },
        { icon: "https://c.animaapp.com/mi5jretszAhz9Y/img/frame-1891.svg", label: "7天无忧" },
        { icon: "https://c.animaapp.com/mi5jretszAhz9Y/img/frame-1891.svg", label: "免费设计" },
        { icon: "https://c.animaapp.com/mi5jretszAhz9Y/img/frame-1891.svg", label: "小吃水果" },
        { icon: "https://c.animaapp.com/mi5jretszAhz9Y/img/frame-1891.svg", label: "预约服务" }
      ],
      statsData: [
        { value: "1244", label: "预约" },
        { value: "2000", label: "粉丝" },
        { value: "18", unit: "年", label: "从业" },
        { value: "4.8", unit: "分", label: "评分" }
      ],
      businessInfo: {
        status: "营业中",
        restDay: "周二休息",
        hours: "10:00-21:00"
      },
      shopInfo: {
        name: "NICE美发造型沙...",
        address: "武侯区天府三家B7栋...",
        distance: "距您2.7km"
      },
      promotions: [
        { label: "满100-5" },
        { label: "满500-50" }
      ],
      activeTab: "works",
      tabs: [
        { id: "service", label: "服务" },
        { id: "appointment", label: "预约" },
        { id: "works", label: "作品" },
        { id: "reviews", label: "点评" }
      ],
      dateSchedule: [
        { date: "今天", day: "周一", active: true },
        { date: "明天", day: "周二", active: false },
        { date: "12.05", day: "周三", active: false },
        { date: "12.06", day: "周四", active: false },
        { date: "12.07", day: "周五", active: false },
        { date: "12.08", day: "周六", active: false },
        { date: "12.09", day: "周日", active: false }
      ]
    };
  },
  methods: {
    handleTabClick(tabId) {
      var _a;
      const tabLabel = (_a = this.tabs.find((t) => t.id === tabId)) == null ? void 0 : _a.label;
      if (tabLabel === "服务") {
        common_vendor.index.redirectTo({ url: "/pages/designer/detail" });
      } else if (tabLabel === "预约") {
        common_vendor.index.redirectTo({ url: "/pages/designer/booking" });
      } else if (tabLabel === "作品") {
        this.activeTab = tabId;
      } else if (tabLabel === "点评") {
        common_vendor.index.redirectTo({ url: "/pages/designer/reviews" });
      }
    },
    handleMoreClick() {
      common_vendor.index.navigateTo({ url: "/pages/designer/info" });
    },
    handleShare() {
      common_vendor.index.__f__("log", "at components/DesignerWorksServiceSection.vue:284", "Share clicked");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleShare && $options.handleShare(...args)),
    b: `url(${$data.designerInfo.avatar})`,
    c: common_vendor.t($data.designerInfo.name),
    d: $data.designerInfo.verifyIcon,
    e: common_vendor.t($data.designerInfo.role),
    f: $data.designerInfo.certIcon,
    g: common_vendor.t($data.designerInfo.certText),
    h: $data.designerInfo.certDot,
    i: common_vendor.t($data.designerInfo.skills),
    j: common_vendor.t($data.designerInfo.introduction),
    k: common_vendor.o((...args) => $options.handleMoreClick && $options.handleMoreClick(...args)),
    l: common_vendor.f($data.serviceBadges, (badge, index, i0) => {
      return {
        a: badge.icon,
        b: common_vendor.t(badge.label),
        c: index
      };
    }),
    m: common_vendor.f($data.statsData, (stat, index, i0) => {
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
    n: common_vendor.t($data.businessInfo.status),
    o: common_vendor.t($data.businessInfo.restDay),
    p: common_vendor.t($data.businessInfo.hours),
    q: common_vendor.o((...args) => $options.handleMoreClick && $options.handleMoreClick(...args)),
    r: common_vendor.t($data.shopInfo.name),
    s: common_vendor.t($data.shopInfo.address),
    t: common_vendor.t($data.shopInfo.distance),
    v: common_vendor.f($data.promotions, (promo, index, i0) => {
      return {
        a: common_vendor.t(promo.label),
        b: index
      };
    }),
    w: common_vendor.f($data.tabs, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab.label),
        b: $data.activeTab === tab.id ? 1 : "",
        c: tab.id,
        d: $data.activeTab === tab.id ? 1 : "",
        e: common_vendor.o(($event) => $options.handleTabClick(tab.id), tab.id)
      };
    }),
    x: common_vendor.f($data.dateSchedule, (date, index, i0) => {
      return {
        a: common_vendor.t(date.date),
        b: date.active ? 1 : "",
        c: common_vendor.t(date.day),
        d: date.active ? 1 : "",
        e: index,
        f: date.active ? 1 : ""
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ffcdb620"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/DesignerWorksServiceSection.js.map
