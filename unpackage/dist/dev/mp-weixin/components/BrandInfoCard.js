"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  props: {
    brandInfo: {
      type: Object,
      default: () => ({
        avatar: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-153.png",
        name: "金龙大好人美发沙龙...",
        verifyBadge: "舒适",
        certIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-3.svg",
        certText: "企业认证",
        certDot: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-2.svg",
        type: "工作室、专业店",
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
        name: "锦江区红星路120号",
        address: "IFS国际东门2栋607室",
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
        serviceIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-4.svg",
        serviceCount: "281",
        workIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-12.svg",
        workCount: "234",
        dotIcon: "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-2.svg"
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
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.handleFollow && $options.handleFollow(...args)),
    b: `url(${$props.brandInfo.avatar})`,
    c: common_vendor.t($props.brandInfo.name),
    d: $props.brandInfo.verifyBadge
  }, $props.brandInfo.verifyBadge ? {
    e: common_vendor.t($props.brandInfo.verifyBadge)
  } : {}, {
    f: $props.brandInfo.verifyBadge && $props.brandInfo.certText
  }, $props.brandInfo.verifyBadge && $props.brandInfo.certText ? {} : {}, {
    g: $props.brandInfo.certText
  }, $props.brandInfo.certText ? {
    h: $props.brandInfo.certIcon,
    i: common_vendor.t($props.brandInfo.certText),
    j: $props.brandInfo.certDot
  } : {}, {
    k: $props.brandInfo.type
  }, $props.brandInfo.type ? {
    l: common_vendor.t($props.brandInfo.type)
  } : {}, {
    m: $props.brandInfo.introduction
  }, $props.brandInfo.introduction ? {
    n: common_vendor.t($props.brandInfo.introduction),
    o: common_vendor.o((...args) => $options.handleMoreClick && $options.handleMoreClick(...args))
  } : {}, {
    p: common_vendor.f($props.serviceBadges, (badge, index, i0) => {
      return {
        a: badge.icon,
        b: common_vendor.t(badge.label),
        c: index
      };
    }),
    q: common_vendor.f($props.statsData, (stat, index, i0) => {
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
    r: common_vendor.t($props.businessInfo.status),
    s: common_vendor.t($props.businessInfo.restDay),
    t: common_vendor.t($props.businessInfo.hours),
    v: common_vendor.o((...args) => $options.handleMoreClick && $options.handleMoreClick(...args)),
    w: common_vendor.o((...args) => $options.handlePhone && $options.handlePhone(...args)),
    x: common_vendor.t($props.shopInfo.name),
    y: common_vendor.t($props.shopInfo.address),
    z: common_vendor.t($props.shopInfo.distance),
    A: common_vendor.o((...args) => $options.handleNavigation && $options.handleNavigation(...args)),
    B: common_vendor.f($props.promotions, (promo, index, i0) => {
      return {
        a: common_vendor.t(promo.text),
        b: index
      };
    }),
    C: $props.rightStats.shareIcon || "https://c.animaapp.com/mi5l377nJk1HHO/img/frame-1879-1.svg",
    D: common_vendor.o((...args) => $options.handleShare && $options.handleShare(...args)),
    E: $props.rightStats.serviceIcon,
    F: common_vendor.t($props.rightStats.serviceCount),
    G: $props.rightStats.dotIcon,
    H: $props.rightStats.workIcon,
    I: common_vendor.t($props.rightStats.workCount),
    J: $props.rightStats.dotIcon
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4a3d814d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/BrandInfoCard.js.map
