"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      serviceCards: [
        {
          id: 1,
          image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
          title: "烫发",
          description: "发型提案+染发+造型",
          price: "799",
          stylist: {
            name: "李天天",
            role: "美发师",
            avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg"
          },
          rating: "4.8",
          reviews: "768",
          distance: "6.7km"
        },
        {
          id: 2,
          image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
          title: "烫发",
          description: "发型提案+染发+造型",
          price: "799",
          stylist: {
            name: "李天天",
            role: "美发师",
            avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg"
          },
          rating: "4.8",
          reviews: "768",
          distance: "6.7km"
        },
        {
          id: 3,
          image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
          title: "烫发",
          description: "发型提案+染发+造型",
          price: "799",
          stylist: {
            name: "李天天",
            role: "美发师",
            avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg"
          },
          rating: "4.8",
          reviews: "768",
          distance: "6.7km"
        },
        {
          id: 4,
          image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
          title: "烫发",
          description: "发型提案+染发+造型",
          price: "799",
          stylist: {
            name: "李天天",
            role: "美发师",
            avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg"
          },
          rating: "4.8",
          reviews: "768",
          distance: "6.7km"
        },
        {
          id: 5,
          image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
          title: "烫发",
          description: "发型提案+染发+造型",
          price: "799",
          stylist: {
            name: "李天天",
            role: "美发师",
            avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg"
          },
          rating: "4.8",
          reviews: "768",
          distance: "6.7km"
        },
        {
          id: 6,
          image: "https://c.animaapp.com/mi5bcgvrGbkedE/img/rectangle-169-6.png",
          title: "烫发",
          description: "发型提案+染发+造型",
          price: "799",
          stylist: {
            name: "李天天",
            role: "美发师",
            avatar: "https://c.animaapp.com/mi5bcgvrGbkedE/img/ellipse-34.svg"
          },
          rating: "4.8",
          reviews: "768",
          distance: "6.7km"
        }
      ]
    };
  },
  methods: {
    handleCardClick(card) {
      common_vendor.index.navigateTo({
        url: `/pages/order/purchase?id=${card.id}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.serviceCards, (card, index, i0) => {
      return {
        a: card.image,
        b: card.title,
        c: common_vendor.t(card.title),
        d: common_vendor.t(card.description),
        e: common_vendor.t(card.price),
        f: card.stylist.avatar,
        g: card.stylist.name,
        h: common_vendor.t(card.stylist.name),
        i: common_vendor.t(card.stylist.role),
        j: common_vendor.t(card.rating),
        k: common_vendor.t(card.reviews),
        l: common_vendor.t(card.distance),
        m: card.id,
        n: common_vendor.o(($event) => $options.handleCardClick(card), card.id)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e7bf1da2"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/main/index/ServiceGallerySection.js.map
