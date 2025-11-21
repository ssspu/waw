"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  props: {
    activeTab: {
      type: String,
      default: "all"
    }
  },
  data() {
    return {
      serviceOrders: [
        {
          orderNumber: "CDD83290895",
          status: "已确认",
          statusColor: "#ffa77b",
          serviceName: "洗剪吹",
          serviceDetails: "洗护+修剪+造型",
          duration: "预计1小时",
          time: "今天11:00",
          provider: {
            name: "李天天",
            badge: "美发师",
            avatar: "https://c.animaapp.com/mi5lwlq8FxTpMa/img/ellipse-34.svg",
            rating: "4.8",
            reviews: "23"
          },
          price: "799",
          quantity: "x1",
          hasIcon: true,
          primaryButton: "订单完成",
          tab: "all"
        },
        {
          orderNumber: "CDD83290895",
          status: "已确认",
          statusColor: "#ffa77b",
          serviceName: "洗剪吹",
          serviceDetails: "洗护+修剪+造型",
          duration: "预计1小时",
          time: "今天11:00",
          provider: {
            name: "造型美发沙龙",
            badge: null,
            avatar: "https://c.animaapp.com/mi5lwlq8FxTpMa/img/ellipse-34-1.svg",
            rating: "4.8",
            reviews: "23"
          },
          price: "799",
          quantity: "x1",
          hasIcon: false,
          primaryButton: "正在确认",
          tab: "pending-confirm"
        },
        {
          orderNumber: "CDD83290895",
          status: "已确认",
          statusColor: "#ffa77b",
          serviceName: "洗剪吹",
          serviceDetails: "洗护+修剪+造型",
          duration: "预计1小时",
          time: "今天11:00",
          provider: {
            name: "李天天",
            badge: "美发师",
            avatar: "https://c.animaapp.com/mi5lwlq8FxTpMa/img/ellipse-34.svg",
            rating: "4.8",
            reviews: "23"
          },
          price: "799",
          quantity: "x1",
          hasIcon: false,
          primaryButton: "订单完成",
          tab: "all"
        },
        {
          orderNumber: "CDD83290895",
          status: "已确认",
          statusColor: "#ffa77b",
          serviceName: "洗剪吹",
          serviceDetails: "洗护+修剪+造型",
          duration: "预计1小时",
          time: "今天11:00",
          provider: {
            name: "李天天",
            badge: "美发师",
            avatar: "https://c.animaapp.com/mi5lwlq8FxTpMa/img/ellipse-34.svg",
            rating: "4.8",
            reviews: "23"
          },
          price: "799",
          quantity: "x1",
          hasIcon: false,
          primaryButton: "立即评价",
          tab: "pending-review"
        }
      ]
    };
  },
  computed: {
    filteredOrders() {
      if (this.activeTab === "all") {
        return this.serviceOrders;
      }
      return this.serviceOrders.filter((order) => order.tab === this.activeTab);
    }
  },
  methods: {
    handleMore(order) {
      common_vendor.index.__f__("log", "at components/OrderServiceList.vue:211", "More clicked:", order);
    },
    handleDetail(order) {
      common_vendor.index.__f__("log", "at components/OrderServiceList.vue:214", "Detail clicked:", order);
    },
    handlePrimaryAction(order) {
      common_vendor.index.__f__("log", "at components/OrderServiceList.vue:217", "Primary action clicked:", order.primaryButton);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.filteredOrders, (order, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(order.orderNumber),
        b: common_vendor.t(order.status),
        c: order.statusColor,
        d: common_vendor.t(order.serviceName),
        e: common_vendor.t(order.serviceDetails),
        f: common_vendor.t(order.duration),
        g: common_vendor.t(order.time),
        h: order.provider.avatar,
        i: common_vendor.t(order.provider.name),
        j: order.provider.badge
      }, order.provider.badge ? {
        k: common_vendor.t(order.provider.badge)
      } : {}, {
        l: common_vendor.t(order.provider.rating),
        m: common_vendor.t(order.provider.reviews),
        n: common_vendor.t(order.price),
        o: common_vendor.t(order.quantity),
        p: common_vendor.o(($event) => $options.handleMore(order), index),
        q: order.hasIcon
      }, order.hasIcon ? {} : {}, {
        r: common_vendor.o(($event) => $options.handleDetail(order), index),
        s: common_vendor.t(order.primaryButton),
        t: common_vendor.o(($event) => $options.handlePrimaryAction(order), index),
        v: index
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f437e679"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/OrderServiceList.js.map
