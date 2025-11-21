"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    activeTab: {
      type: String,
      default: "service"
    }
  },
  data() {
    return {
      couponsData: [
        {
          id: 1,
          amount: "30",
          requirement: "满300元使用",
          title: "护理优惠券",
          description: "服务类产品均可使用",
          startDate: "2020.05.05",
          endDate: "2020.11.05",
          location: "限成都武侯沙龙美容美发店",
          type: "service"
        },
        {
          id: 2,
          amount: "30",
          requirement: "满300元使用",
          title: "护理优惠券",
          description: "服务类产品均可使用",
          startDate: "2020.05.05",
          endDate: "2020.11.05",
          location: "限成都武侯沙龙美容美发店",
          type: "service"
        },
        {
          id: 3,
          amount: "30",
          requirement: "满300元使用",
          title: "护理优惠券",
          description: "服务类产品均可使用",
          startDate: "2020.05.05",
          endDate: "2020.11.05",
          location: "限成都武侯沙龙美容美发店",
          type: "product"
        },
        {
          id: 4,
          amount: "30",
          requirement: "满300元使用",
          title: "护理优惠券",
          description: "服务类产品均可使用",
          startDate: "2020.05.05",
          endDate: "2020.11.05",
          location: "限成都武侯沙龙美容美发店",
          type: "service"
        },
        {
          id: 5,
          amount: "30",
          requirement: "满300元使用",
          title: "护理优惠券",
          description: "服务类产品均可使用",
          startDate: "2020.05.05",
          endDate: "2020.11.05",
          location: "限成都武侯沙龙美容美发店",
          type: "product"
        },
        {
          id: 6,
          amount: "30",
          requirement: "满300元使用",
          title: "护理优惠券",
          description: "服务类产品均可使用",
          startDate: "2020.05.05",
          endDate: "2020.11.05",
          location: "限成都武侯沙龙美容美发店",
          status: "已过期",
          type: "ended"
        },
        {
          id: 7,
          amount: "30",
          requirement: "满300元使用",
          title: "护理优惠券",
          description: "服务类产品均可使用",
          startDate: "2020.05.05",
          endDate: "2020.11.05",
          location: "限成都武侯沙龙美容美发店",
          status: "已使用",
          type: "ended"
        },
        {
          id: 8,
          amount: "30",
          requirement: "满300元使用",
          title: "护理优惠券",
          description: "服务类产品均可使用",
          startDate: "2020.05.05",
          endDate: "2020.11.05",
          location: "限成都武侯沙龙美容美发店",
          status: "已使用",
          type: "ended"
        },
        {
          id: 9,
          amount: "30",
          requirement: "满300元使用",
          title: "护理优惠券",
          description: "服务类产品均可使用",
          startDate: "2020.05.05",
          endDate: "2020.11.05",
          location: "限成都武侯沙龙美容美发店",
          status: "已使用",
          type: "ended"
        },
        {
          id: 10,
          amount: "30",
          requirement: "满300元使用",
          title: "护理优惠券",
          description: "服务类产品均可使用",
          startDate: "2020.05.05",
          endDate: "2020.11.05",
          location: "限成都武侯沙龙美容美发店",
          status: "已使用",
          type: "ended"
        },
        {
          id: 11,
          amount: "30",
          requirement: "满300元使用",
          title: "护理优惠券",
          description: "服务类产品均可使用",
          startDate: "2020.05.05",
          endDate: "2020.11.05",
          location: "限成都武侯沙龙美容美发店",
          status: "已使用",
          type: "ended"
        }
      ]
    };
  },
  computed: {
    filteredCoupons() {
      if (this.activeTab === "service") {
        return this.couponsData.filter((coupon) => coupon.type === "service");
      } else if (this.activeTab === "product") {
        return this.couponsData.filter((coupon) => coupon.type === "product");
      } else if (this.activeTab === "ended") {
        return this.couponsData.filter((coupon) => coupon.type === "ended");
      }
      return this.couponsData;
    }
  },
  methods: {
    handleUse(coupon) {
      common_vendor.index.__f__("log", "at components/coupon/index/CouponDetailsSection.vue:221", "Use coupon:", coupon);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.filteredCoupons, (coupon, index, i0) => {
      return common_vendor.e({
        a: $props.activeTab === "ended" || coupon.status ? "https://c.animaapp.com/mi5mjnswM14oP7/img/subtract.svg" : "https://c.animaapp.com/mi5m9weyYgJtGL/img/subtract.svg",
        b: $props.activeTab === "ended" || coupon.status ? 1 : "",
        c: common_vendor.t(coupon.amount),
        d: $props.activeTab === "ended" || coupon.status ? 1 : "",
        e: common_vendor.t(coupon.requirement),
        f: $props.activeTab === "ended" || coupon.status ? 1 : "",
        g: $props.activeTab === "ended" || coupon.status ? "https://c.animaapp.com/mi5mjnswM14oP7/img/vector-25.svg" : "https://c.animaapp.com/mi5m9weyYgJtGL/img/vector-25.svg",
        h: common_vendor.t(coupon.title),
        i: $props.activeTab === "ended" || coupon.status ? 1 : "",
        j: common_vendor.t(coupon.description),
        k: $props.activeTab === "ended" || coupon.status ? 1 : "",
        l: common_vendor.t(coupon.startDate),
        m: $props.activeTab === "ended" || coupon.status ? 1 : "",
        n: $props.activeTab === "ended" || coupon.status ? 1 : "",
        o: common_vendor.t(coupon.endDate),
        p: $props.activeTab === "ended" || coupon.status ? 1 : "",
        q: common_vendor.t(coupon.location),
        r: $props.activeTab === "ended" || coupon.status
      }, $props.activeTab === "ended" || coupon.status ? {
        s: common_vendor.t(coupon.status || "已过期")
      } : {
        t: common_vendor.o(($event) => $options.handleUse(coupon), coupon.id)
      }, {
        v: coupon.id,
        w: $props.activeTab === "ended" || coupon.status ? 1 : ""
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6aa0d290"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/coupon/index/CouponDetailsSection.js.map
