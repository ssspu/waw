"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      recommendationCards: [
        {
          id: "vip",
          title: "会员特区",
          subtitle: "VIP精选优服务",
          icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2288-1.svg",
          size: "large"
        },
        {
          id: "package",
          title: "套餐优选",
          subtitle: "套餐项目更实惠",
          icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2288.svg",
          size: "small"
        },
        {
          id: "haircare",
          title: "防脱护理",
          subtitle: "头皮保养和防护",
          icon: "https://c.animaapp.com/mi5bcgvrGbkedE/img/frame-2288-2.svg",
          size: "small"
        }
      ]
    };
  },
  methods: {
    handleCardClick(card) {
      common_vendor.index.__f__("log", "at components/RecommendationsSection.vue:86", "Card clicked:", card);
    },
    handleFilter() {
      common_vendor.index.__f__("log", "at components/RecommendationsSection.vue:89", "Filter clicked");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.recommendationCards[0].icon,
    b: $data.recommendationCards[0].title,
    c: common_vendor.t($data.recommendationCards[0].title),
    d: common_vendor.t($data.recommendationCards[0].subtitle),
    e: common_vendor.o(($event) => $options.handleCardClick($data.recommendationCards[0])),
    f: common_vendor.f($data.recommendationCards.slice(1), (card, index, i0) => {
      return {
        a: common_vendor.t(card.title),
        b: common_vendor.t(card.subtitle),
        c: card.icon,
        d: card.title,
        e: card.id,
        f: common_vendor.o(($event) => $options.handleCardClick(card), card.id)
      };
    }),
    g: common_vendor.o((...args) => $options.handleFilter && $options.handleFilter(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d2508316"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/RecommendationsSection.js.map
