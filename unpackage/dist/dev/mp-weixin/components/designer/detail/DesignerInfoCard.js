"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    designerInfo: {
      type: Object,
      default: () => ({
        avatar: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-153.png",
        name: "朱一龙",
        verifyIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-2110.svg",
        role: "技术总监",
        certIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-2.svg",
        certText: "职业认证",
        certDot: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame.svg",
        skills: "染发设计、短发造型、女士晚装:",
        introduction: "从业19年，毕业沙宣美发学院，擅长各种造型设计师有丰富的设计经验擅长..."
      })
    },
    serviceBadges: {
      type: Array,
      default: () => []
    },
    statsData: {
      type: Array,
      default: () => []
    },
    businessInfo: {
      type: Object,
      default: () => ({
        status: "营业中",
        restDay: "周二休息",
        hours: "10:00-21:00"
      })
    },
    shopInfo: {
      type: Object,
      default: () => ({
        name: "NICE美发造型沙...",
        address: "武侯区天府三家B7栋...",
        distance: "距您2.7km"
      })
    },
    promotions: {
      type: Array,
      default: () => []
    },
    rightStats: {
      type: Object,
      default: () => ({
        serviceIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1.svg",
        serviceCount: "281",
        workIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-4.svg",
        workCount: "234",
        dotIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame.svg"
      })
    }
  },
  methods: {
    handleFollow() {
      this.$emit("follow");
    },
    handleMoreClick() {
      this.$emit("more-info");
    },
    handlePhone() {
      this.$emit("phone");
    },
    handleNavigation() {
      this.$emit("navigation");
    },
    handleShare() {
      this.$emit("share");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleFollow && $options.handleFollow(...args)),
    b: `url(${$props.designerInfo.avatar})`,
    c: common_vendor.t($props.designerInfo.name),
    d: $props.designerInfo.verifyIcon,
    e: common_vendor.t($props.designerInfo.role),
    f: $props.designerInfo.certIcon,
    g: common_vendor.t($props.designerInfo.certText),
    h: $props.designerInfo.certDot,
    i: common_vendor.t($props.designerInfo.skills),
    j: common_vendor.t($props.designerInfo.introduction),
    k: common_vendor.o((...args) => $options.handleMoreClick && $options.handleMoreClick(...args)),
    l: common_vendor.f($props.serviceBadges, (badge, index, i0) => {
      return {
        a: badge.icon,
        b: common_vendor.t(badge.label),
        c: index
      };
    }),
    m: common_vendor.f($props.statsData, (stat, index, i0) => {
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
    n: common_vendor.t($props.businessInfo.status),
    o: common_vendor.t($props.businessInfo.restDay),
    p: common_vendor.t($props.businessInfo.hours),
    q: common_vendor.o((...args) => $options.handleMoreClick && $options.handleMoreClick(...args)),
    r: common_vendor.o((...args) => $options.handlePhone && $options.handlePhone(...args)),
    s: common_vendor.t($props.shopInfo.name),
    t: common_vendor.t($props.shopInfo.address),
    v: common_vendor.t($props.shopInfo.distance),
    w: common_vendor.o((...args) => $options.handleNavigation && $options.handleNavigation(...args)),
    x: common_vendor.f($props.promotions, (promo, index, i0) => {
      return {
        a: common_vendor.t(promo.text),
        b: index
      };
    }),
    y: common_vendor.o((...args) => $options.handleShare && $options.handleShare(...args)),
    z: $props.rightStats.serviceIcon,
    A: common_vendor.t($props.rightStats.serviceCount),
    B: $props.rightStats.dotIcon,
    C: $props.rightStats.workIcon,
    D: common_vendor.t($props.rightStats.workCount),
    E: $props.rightStats.dotIcon
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-49229b50"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/designer/detail/DesignerInfoCard.js.map
