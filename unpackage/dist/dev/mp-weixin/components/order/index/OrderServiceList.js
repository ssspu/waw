"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    activeTab: {
      type: String,
      default: "all"
    }
  },
  data() {
    return {
      countdownTimer: null,
      serviceOrders: [
        {
          orderNumber: "CDD83290895",
          status: "待付款",
          statusColor: "#ffa77b",
          remainingTime: "00:15:00",
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
          primaryButton: "立即付款",
          tab: "pending-payment"
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
  mounted() {
    this.startCountdown();
  },
  beforeDestroy() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  },
  methods: {
    startCountdown() {
      this.countdownTimer = setInterval(() => {
        this.serviceOrders.forEach((order) => {
          if (order.status === "待付款" && order.remainingTime) {
            const timeParts = order.remainingTime.split(":");
            let hours = parseInt(timeParts[0]);
            let minutes = parseInt(timeParts[1]);
            let seconds = parseInt(timeParts[2]);
            seconds--;
            if (seconds < 0) {
              seconds = 59;
              minutes--;
              if (minutes < 0) {
                minutes = 59;
                hours--;
                if (hours < 0) {
                  hours = 0;
                  minutes = 0;
                  seconds = 0;
                }
              }
            }
            order.remainingTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
          }
        });
      }, 1e3);
    },
    handleMore(order) {
      common_vendor.index.__f__("log", "at components/order/index/OrderServiceList.vue:288", "More clicked:", order);
    },
    handleDetail(order) {
      common_vendor.index.__f__("log", "at components/order/index/OrderServiceList.vue:291", "Detail clicked:", order);
    },
    handlePrimaryAction(order) {
      common_vendor.index.__f__("log", "at components/order/index/OrderServiceList.vue:294", "Primary action clicked:", order.primaryButton);
    },
    handleCancel(order) {
      common_vendor.index.__f__("log", "at components/order/index/OrderServiceList.vue:297", "Cancel clicked:", order);
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要取消该订单吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.__f__("log", "at components/order/index/OrderServiceList.vue:303", "Order cancelled");
          }
        }
      });
    },
    handlePay(order) {
      common_vendor.index.__f__("log", "at components/order/index/OrderServiceList.vue:309", "Pay clicked:", order);
      common_vendor.index.navigateTo({
        url: `/pages/payment/index?orderId=${order.orderNumber}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.filteredOrders, (order, index, i0) => {
      return common_vendor.e({
        a: order.status === "待付款"
      }, order.status === "待付款" ? {
        b: common_vendor.t(order.remainingTime || "00:15:00")
      } : {
        c: common_vendor.t(order.orderNumber)
      }, {
        d: common_vendor.t(order.status),
        e: order.statusColor,
        f: common_vendor.t(order.serviceName),
        g: common_vendor.t(order.serviceDetails),
        h: common_vendor.t(order.duration),
        i: common_vendor.t(order.time),
        j: order.provider.avatar,
        k: common_vendor.t(order.provider.name),
        l: order.provider.badge
      }, order.provider.badge ? {
        m: common_vendor.t(order.provider.badge)
      } : {}, {
        n: common_vendor.t(order.provider.rating),
        o: common_vendor.t(order.provider.reviews),
        p: common_vendor.t(order.price),
        q: common_vendor.t(order.quantity),
        r: common_vendor.o(($event) => $options.handleMore(order), index),
        s: order.status === "待付款"
      }, order.status === "待付款" ? {
        t: common_vendor.o(($event) => $options.handleCancel(order), index),
        v: common_vendor.o(($event) => $options.handlePay(order), index)
      } : common_vendor.e({
        w: order.hasIcon
      }, order.hasIcon ? {} : {}, {
        x: common_vendor.o(($event) => $options.handleDetail(order), index),
        y: common_vendor.t(order.primaryButton),
        z: common_vendor.o(($event) => $options.handlePrimaryAction(order), index)
      }), {
        A: index
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9f3f6e31"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/order/index/OrderServiceList.js.map
