"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      orderItems: [
        {
          icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-16.svg",
          label: "待付款"
        },
        {
          icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-11.svg",
          label: "待确认"
        },
        {
          icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-8.svg",
          label: "待使用"
        },
        {
          icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-12.svg",
          label: "待评价"
        },
        {
          icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-5.svg",
          label: "退款/售后"
        }
      ],
      assetItems: [
        {
          icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-6.svg",
          label: "优惠券"
        },
        {
          icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-10.svg",
          label: "资产"
        },
        {
          icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-9.svg",
          label: "美豆"
        },
        {
          icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-13.svg",
          label: "积分"
        }
      ],
      settlementItems: [
        {
          icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame.svg",
          label: "我要入驻"
        },
        {
          icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-2.svg",
          label: "邀请入驻"
        },
        {
          icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-7.svg",
          label: "我要推广"
        },
        {
          icon: "https://c.animaapp.com/mi5lwd2pQMRb0W/img/frame-1.svg",
          label: "个人设置"
        }
      ]
    };
  },
  methods: {
    handleViewAllOrders() {
      common_vendor.index.navigateTo({ url: "/pages/order/index" });
    },
    handleOrderItemClick(item) {
      common_vendor.index.__f__("log", "at components/MineProfileSection.vue:141", "Order item clicked:", item);
      if (item.label === "待付款" || item.label === "待确认" || item.label === "待使用" || item.label === "待评价") {
        common_vendor.index.navigateTo({ url: "/pages/order/index?tab=" + this.getOrderTabId(item.label) });
      }
    },
    handleAssetItemClick(item) {
      common_vendor.index.__f__("log", "at components/MineProfileSection.vue:148", "Asset item clicked:", item);
      if (item.label === "优惠券") {
        common_vendor.index.navigateTo({ url: "/pages/coupon/index" });
      }
    },
    handleSettlementItemClick(item) {
      common_vendor.index.__f__("log", "at components/MineProfileSection.vue:155", "Settlement item clicked:", item);
      if (item.label === "个人设置") {
        common_vendor.index.navigateTo({ url: "/pages/setting/index" });
      }
    },
    getOrderTabId(label) {
      const map = {
        "待付款": "pending-payment",
        "待确认": "pending-confirm",
        "待使用": "pending-use",
        "待评价": "pending-review"
      };
      return map[label] || "all";
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleViewAllOrders && $options.handleViewAllOrders(...args)),
    b: common_vendor.f($data.orderItems, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.label),
        c: index,
        d: common_vendor.o(($event) => $options.handleOrderItemClick(item), index)
      };
    }),
    c: common_vendor.f($data.assetItems, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.label),
        c: index,
        d: common_vendor.o(($event) => $options.handleAssetItemClick(item), index)
      };
    }),
    d: common_vendor.f($data.settlementItems, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.label),
        c: index,
        d: common_vendor.o(($event) => $options.handleSettlementItemClick(item), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e277d279"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/MineProfileSection.js.map
