"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      activeTab: "reviews",
      designerInfo: {
        avatar: "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-153.png",
        name: "朱一龙",
        verifyIcon: "https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-2110.svg",
        role: "技术总监",
        certIcon: "https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-7.svg",
        certText: "职业认证",
        certDot: "https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-1.svg",
        skills: "染发设计、短发造型、女士晚装:",
        introduction: "从业19年，毕业沙宣美发学院，擅长各种造型设计师有丰富的设计经验擅长..."
      },
      serviceBadges: [
        { icon: "https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-1891.svg", label: "安心服务" },
        { icon: "https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-1891.svg", label: "7天无忧" },
        { icon: "https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-1891.svg", label: "免费设计" },
        { icon: "https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-1891.svg", label: "小吃水果" },
        { icon: "https://c.animaapp.com/mi5kx1ohxTkA7e/img/frame-1891.svg", label: "预约服务" }
      ],
      statsData: [
        { value: "1244", label: "预约" },
        { value: "2000", label: "粉丝" },
        { value: "18", suffix: "年", label: "从业" },
        { value: "4.8", suffix: "分", label: "评分" }
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
      tabs: [
        { id: "service", label: "服务" },
        { id: "appointment", label: "预约" },
        { id: "works", label: "作品" },
        { id: "reviews", label: "点评" }
      ],
      reviewFilters: [
        { label: "全部", active: true },
        { label: "有图(71)", active: false },
        { label: "差评(9)", active: false }
      ]
    };
  },
  methods: {
    handleTabClick(tabId) {
      if (tabId === "service") {
        common_vendor.index.redirectTo({ url: "/pages/designer/detail" });
      } else if (tabId === "appointment") {
        common_vendor.index.redirectTo({ url: "/pages/designer/booking" });
      } else if (tabId === "works") {
        common_vendor.index.redirectTo({ url: "/pages/designer/works" });
      } else if (tabId === "reviews") {
        this.activeTab = tabId;
      }
    },
    handleFilterClick(index) {
      this.reviewFilters.forEach((filter, i) => {
        filter.active = i === index;
      });
    },
    handleMoreClick() {
      common_vendor.index.navigateTo({ url: "/pages/designer/info" });
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
        b: stat.suffix
      }, stat.suffix ? {
        c: common_vendor.t(stat.suffix)
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
        a: common_vendor.t(promo.label),
        b: index
      };
    }),
    v: common_vendor.f($data.tabs, (tab, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(tab.label),
        b: $data.activeTab === tab.id ? 1 : "",
        c: $data.activeTab === tab.id
      }, $data.activeTab === tab.id ? {} : {}, {
        d: tab.id,
        e: $data.activeTab === tab.id ? 1 : "",
        f: common_vendor.o(($event) => $options.handleTabClick(tab.id), tab.id)
      });
    }),
    w: common_vendor.f($data.reviewFilters, (filter, index, i0) => {
      return {
        a: common_vendor.t(filter.label),
        b: filter.active ? 1 : "",
        c: index,
        d: filter.active ? 1 : "",
        e: common_vendor.o(($event) => $options.handleFilterClick(index), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d78ee038"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/DesignerReviewsPageSection.js.map
