"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
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
      showCancelModal: false,
      showMoreModal: false,
      selectedReasonIndex: null,
      currentCancelOrder: null,
      currentMoreOrder: null,
      cancelReasons: [
        "价格有点贵",
        "时间选择有问题",
        "我想换一个设计师",
        "暂时不需要了",
        "其他"
      ],
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
          status: "待确认",
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
          hasIcon: true,
          primaryButton: "订单完成",
          tab: "pending-use"
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
          tab: "pending-use"
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
          tab: "pending-use"
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
          tab: "pending-use"
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
      this.currentMoreOrder = order;
      this.showMoreModal = true;
    },
    handleCloseMoreModal() {
      this.showMoreModal = false;
      this.currentMoreOrder = null;
    },
    handleContactOnline() {
      common_vendor.index.__f__("log", "at components/order/index/OrderServiceList.vue:450", "在线联系:", this.currentMoreOrder);
      common_vendor.index.showToast({
        title: "在线联系",
        icon: "none"
      });
      this.handleCloseMoreModal();
    },
    handleContactPhone() {
      common_vendor.index.__f__("log", "at components/order/index/OrderServiceList.vue:458", "电话联系:", this.currentMoreOrder);
      common_vendor.index.showToast({
        title: "电话联系",
        icon: "none"
      });
      this.handleCloseMoreModal();
    },
    handleDetail(order) {
      if (order.status === "待付款") {
        common_vendor.index.navigateTo({
          url: `/pages/order/detail?orderId=${order.orderNumber}`
        });
      } else if (order.tab === "pending-use") {
        common_vendor.index.navigateTo({
          url: `/pages/order/detail-pending-use?orderId=${order.orderNumber}`
        });
      }
    },
    handlePrimaryAction(order) {
      if (order.primaryButton === "立即评价") {
        common_vendor.index.navigateTo({
          url: `/pages/order/service-review?orderId=${order.orderNumber}`
        });
      } else {
        common_vendor.index.__f__("log", "at components/order/index/OrderServiceList.vue:483", "Primary action clicked:", order.primaryButton);
      }
    },
    handleCancel(order) {
      this.currentCancelOrder = order;
      this.showCancelModal = true;
      this.selectedReasonIndex = null;
    },
    handleCloseModal() {
      this.showCancelModal = false;
      this.selectedReasonIndex = null;
      this.currentCancelOrder = null;
    },
    handleSelectReason(index) {
      this.selectedReasonIndex = index;
    },
    handleConfirmCancel() {
      if (this.selectedReasonIndex === null) {
        common_vendor.index.showToast({
          title: "请选择取消原因",
          icon: "none"
        });
        return;
      }
      const reason = this.cancelReasons[this.selectedReasonIndex];
      common_vendor.index.__f__("log", "at components/order/index/OrderServiceList.vue:510", "取消订单原因:", reason, "订单:", this.currentCancelOrder);
      if (this.currentCancelOrder) {
        this.serviceOrders.findIndex((o) => o.orderNumber === this.currentCancelOrder.orderNumber);
      }
      common_vendor.index.showToast({
        title: "订单已取消",
        icon: "success"
      });
      this.showCancelModal = false;
      this.selectedReasonIndex = null;
      this.currentCancelOrder = null;
    },
    handlePay(order) {
      common_vendor.index.__f__("log", "at components/order/index/OrderServiceList.vue:531", "Pay clicked:", order);
      common_vendor.index.navigateTo({
        url: `/pages/payment/index?orderId=${order.orderNumber}`
      });
    },
    handleOrderCardClick(order) {
      if (order.status === "待付款") {
        common_vendor.index.navigateTo({
          url: `/pages/order/detail?orderId=${order.orderNumber}`
        });
      } else if (order.tab === "pending-use") {
        common_vendor.index.navigateTo({
          url: `/pages/order/detail-pending-use?orderId=${order.orderNumber}`
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
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
      }, order.hasIcon ? {
        x: common_assets._imports_0$10
      } : {}, {
        y: common_vendor.o(($event) => $options.handleDetail(order), index),
        z: common_vendor.t(order.primaryButton),
        A: common_vendor.o(($event) => $options.handlePrimaryAction(order), index)
      }), {
        B: index,
        C: common_vendor.o(($event) => $options.handleOrderCardClick(order), index)
      });
    }),
    b: $data.showMoreModal
  }, $data.showMoreModal ? {
    c: common_vendor.o((...args) => $options.handleCloseMoreModal && $options.handleCloseMoreModal(...args)),
    d: common_assets._imports_1$6,
    e: common_vendor.o((...args) => $options.handleContactOnline && $options.handleContactOnline(...args)),
    f: common_assets._imports_2$3,
    g: common_vendor.o((...args) => $options.handleContactPhone && $options.handleContactPhone(...args)),
    h: common_vendor.o((...args) => $options.handleCloseMoreModal && $options.handleCloseMoreModal(...args)),
    i: common_vendor.o(() => {
    }),
    j: common_vendor.o((...args) => $options.handleCloseMoreModal && $options.handleCloseMoreModal(...args))
  } : {}, {
    k: $data.showCancelModal
  }, $data.showCancelModal ? {
    l: common_vendor.o((...args) => $options.handleCloseModal && $options.handleCloseModal(...args)),
    m: common_vendor.f($data.cancelReasons, (reason, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(reason),
        b: $data.selectedReasonIndex === index
      }, $data.selectedReasonIndex === index ? {} : {}, {
        c: $data.selectedReasonIndex === index ? 1 : "",
        d: index,
        e: common_vendor.o(($event) => $options.handleSelectReason(index), index)
      });
    }),
    n: common_vendor.o((...args) => $options.handleCloseModal && $options.handleCloseModal(...args)),
    o: $data.selectedReasonIndex === null ? 1 : "",
    p: common_vendor.o((...args) => $options.handleConfirmCancel && $options.handleConfirmCancel(...args)),
    q: common_vendor.o(() => {
    }),
    r: common_vendor.o((...args) => $options.handleCloseModal && $options.handleCloseModal(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9f3f6e31"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/order/index/OrderServiceList.js.map
