"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  props: {
    activeTab: {
      type: String,
      default: "ended"
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
          status: "已过期",
          type: "ended"
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
          status: "已使用",
          type: "ended"
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
          status: "已使用",
          type: "ended"
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
          status: "已使用",
          type: "ended"
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
          status: "已使用",
          type: "ended"
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
          status: "已使用",
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
        }
      ]
    };
  },
  computed: {
    filteredCoupons() {
      if (this.activeTab === "ended") {
        return this.couponsData.filter((coupon) => coupon.type === "ended");
      }
      return this.couponsData;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.filteredCoupons, (coupon, index, i0) => {
      return {
        a: common_vendor.t(coupon.amount),
        b: common_vendor.t(coupon.requirement),
        c: common_vendor.t(coupon.title),
        d: common_vendor.t(coupon.description),
        e: common_vendor.t(coupon.startDate),
        f: common_vendor.t(coupon.endDate),
        g: common_vendor.t(coupon.location),
        h: common_vendor.t(coupon.status),
        i: coupon.id
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-15a44ef4"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/CouponEndDetailsSection.js.map
