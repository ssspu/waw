"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      bookingData: {
        date: "2025-05-05",
        serviceType: "洗剪吹",
        treatment: "欧莱雅生化烫",
        price: "¥888.00"
      },
      stylistData: {
        name: "李天天",
        avatar: "https://c.animaapp.com/mi5ng54v4eM3X6/img/rectangle-153-3.png",
        role: "美发师",
        level: "高级",
        position: "店长",
        experience: "从业12年",
        rating: "4.8",
        serviceCount: "287",
        portfolioCount: "123",
        specialties: ["女士造型", "烫发设计", "短发造型"]
      }
    };
  },
  methods: {
    handleMore() {
      common_vendor.index.__f__("log", "at components/territory/index/TerritoryBookingSection.vue:127", "More clicked");
    },
    handlePromote() {
      common_vendor.index.__f__("log", "at components/territory/index/TerritoryBookingSection.vue:130", "Promote clicked");
    },
    handleBookAgain() {
      common_vendor.index.__f__("log", "at components/territory/index/TerritoryBookingSection.vue:133", "Book again clicked");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.bookingData.date),
    b: common_vendor.t($data.bookingData.serviceType),
    c: common_vendor.t($data.bookingData.treatment),
    d: common_vendor.t($data.bookingData.price),
    e: $data.stylistData.avatar,
    f: common_vendor.t($data.stylistData.name),
    g: common_vendor.t($data.stylistData.role),
    h: common_vendor.t($data.stylistData.level),
    i: common_vendor.t($data.stylistData.position),
    j: common_vendor.t($data.stylistData.experience),
    k: common_vendor.f($data.stylistData.specialties, (specialty, index, i0) => {
      return {
        a: common_vendor.t(specialty),
        b: index
      };
    }),
    l: common_vendor.t($data.stylistData.rating),
    m: common_vendor.t($data.stylistData.serviceCount),
    n: common_vendor.t($data.stylistData.portfolioCount),
    o: common_vendor.o((...args) => $options.handleMore && $options.handleMore(...args)),
    p: common_vendor.o((...args) => $options.handlePromote && $options.handlePromote(...args)),
    q: common_vendor.o((...args) => $options.handleBookAgain && $options.handleBookAgain(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d9336404"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/territory/index/TerritoryBookingSection.js.map
