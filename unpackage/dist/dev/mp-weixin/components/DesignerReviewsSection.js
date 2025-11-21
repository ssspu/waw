"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 设计师基本信息
      designerInfo: {
        avatar: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-153.png",
        name: "朱一龙",
        verifyIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-2110.svg",
        role: "技术总监",
        certIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-2.svg",
        certText: "职业认证",
        certDot: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame.svg",
        skills: "染发设计、短发造型、女士晚装:",
        introduction: "从业19年，毕业沙宣美发学院，擅长各种造型设计师有丰富的设计经验擅长..."
      },
      // 营业信息
      businessInfo: {
        status: "营业中",
        restDay: "周二休息",
        hours: "10:00-21:00"
      },
      // 店铺信息
      shopInfo: {
        name: "NICE美发造型沙...",
        address: "武侯区天府三家B7栋...",
        distance: "距您2.7km"
      },
      // 右侧统计数据
      rightStats: {
        serviceIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1.svg",
        serviceCount: "281",
        workIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-4.svg",
        workCount: "234",
        dotIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame.svg"
      },
      // 服务标签
      serviceBadges: [
        {
          icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg",
          label: "安心服务"
        },
        {
          icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg",
          label: "7天无忧"
        },
        {
          icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg",
          label: "免费设计"
        },
        {
          icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg",
          label: "小吃水果"
        },
        {
          icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg",
          label: "预约服务"
        }
      ],
      // 统计数据
      statsData: [
        { value: "1244", label: "预约" },
        { value: "2000", label: "粉丝" },
        { value: "18", unit: "年", label: "从业" },
        { value: "4.8", unit: "分", label: "评分" }
      ],
      // 优惠信息
      promotions: [{ text: "满100-5" }, { text: "满500-50" }],
      // 标签页
      tabs: [
        { label: "服务", active: true },
        { label: "预约", active: false },
        { label: "作品", active: false },
        { label: "点评", active: false }
      ],
      // 子标签页
      subTabs: [
        { label: "美发师", active: true },
        { label: "美容师", active: false }
      ]
    };
  },
  methods: {
    switchTab(index) {
      this.tabs.forEach((tab, i) => {
        tab.active = i === index;
      });
      const tabLabel = this.tabs[index].label;
      if (tabLabel === "预约") {
        common_vendor.index.navigateTo({ url: "/pages/designer/booking" });
      } else if (tabLabel === "作品") {
        common_vendor.index.navigateTo({ url: "/pages/designer/works" });
      } else if (tabLabel === "点评") {
        common_vendor.index.navigateTo({ url: "/pages/designer/reviews" });
      }
    },
    switchSubTab(index) {
      this.subTabs.forEach((tab, i) => {
        tab.active = i === index;
      });
    },
    handleShare() {
      common_vendor.index.__f__("log", "at components/DesignerReviewsSection.vue:302", "Share clicked");
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
    a: `url(${$data.designerInfo.avatar})`,
    b: common_vendor.t($data.designerInfo.name),
    c: $data.designerInfo.verifyIcon,
    d: common_vendor.t($data.designerInfo.role),
    e: $data.designerInfo.certIcon,
    f: common_vendor.t($data.designerInfo.certText),
    g: $data.designerInfo.certDot,
    h: common_vendor.t($data.designerInfo.skills),
    i: common_vendor.t($data.designerInfo.introduction),
    j: common_vendor.o((...args) => $options.handleMoreClick && $options.handleMoreClick(...args)),
    k: common_vendor.f($data.serviceBadges, (badge, index, i0) => {
      return {
        a: badge.icon,
        b: common_vendor.t(badge.label),
        c: index
      };
    }),
    l: common_vendor.f($data.statsData, (stat, index, i0) => {
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
    m: common_vendor.t($data.businessInfo.status),
    n: common_vendor.t($data.businessInfo.restDay),
    o: common_vendor.t($data.businessInfo.hours),
    p: common_vendor.o((...args) => $options.handleMoreClick && $options.handleMoreClick(...args)),
    q: common_vendor.t($data.shopInfo.name),
    r: common_vendor.t($data.shopInfo.address),
    s: common_vendor.t($data.shopInfo.distance),
    t: common_vendor.f($data.promotions, (promo, index, i0) => {
      return {
        a: common_vendor.t(promo.text),
        b: index
      };
    }),
    v: common_vendor.f($data.tabs, (tab, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(tab.label),
        b: _ctx.isActiveTab(tab.id) ? 1 : "",
        c: _ctx.isActiveTab(tab.id)
      }, _ctx.isActiveTab(tab.id) ? {} : {}, {
        d: tab.id,
        e: _ctx.isActiveTab(tab.id) ? 1 : "",
        f: common_vendor.o(($event) => $options.switchTab(index), tab.id)
      });
    }),
    w: common_vendor.f($data.subTabs, (subTab, index, i0) => {
      return {
        a: common_vendor.t(subTab.label),
        b: index,
        c: subTab.active ? 1 : "",
        d: common_vendor.o(($event) => $options.switchSubTab(index), index)
      };
    }),
    x: common_vendor.o((...args) => $options.handleShare && $options.handleShare(...args)),
    y: $data.rightStats.serviceIcon,
    z: common_vendor.t($data.rightStats.serviceCount),
    A: $data.rightStats.dotIcon,
    B: $data.rightStats.workIcon,
    C: common_vendor.t($data.rightStats.workCount),
    D: $data.rightStats.dotIcon
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-22e771d6"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/DesignerReviewsSection.js.map
