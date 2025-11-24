"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      activeBrandTab: "hair",
      showShareModal: false,
      avatarImage: "/static/avatar/avatar.png",
      brandCards: [
        {
          headerInfo: ["2025-05-05", "｜", "洗剪吹", "｜", "欧莱雅生化烫"],
          price: 888,
          name: "成都NICE造型沙龙",
          type: "品牌",
          level: "舒适",
          role: "专业店｜2012年开业",
          specialties: ["女士造型", "烫发设计", "短发造型"],
          rating: 4.8,
          designers: 8,
          services: 1236
        },
        {
          headerInfo: ["2025-05-05", "｜", "洗剪吹", "｜", "欧莱雅生化烫"],
          price: 888,
          name: "成都NICE造型沙龙",
          type: "品牌",
          level: "舒适",
          role: "专业店｜2012年开业",
          specialties: ["女士造型", "烫发设计", "短发造型"],
          rating: 4.8,
          designers: 8,
          services: 1236
        },
        {
          headerInfo: ["2025-05-05", "｜", "洗剪吹", "｜", "欧莱雅生化烫"],
          price: 888,
          name: "成都NICE造型沙龙",
          type: "品牌",
          level: "舒适",
          role: "专业店｜2012年开业",
          specialties: ["女士造型", "烫发设计", "短发造型"],
          rating: 4.8,
          designers: 8,
          services: 1236
        },
        {
          headerInfo: ["2025-05-05", "｜", "洗剪吹", "｜", "欧莱雅生化烫"],
          price: 888,
          name: "成都NICE造型沙龙",
          type: "品牌",
          level: "舒适",
          role: "专业店｜2012年开业",
          specialties: ["女士造型", "烫发设计", "短发造型"],
          rating: 4.8,
          designers: 8,
          services: 1236
        }
      ]
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    handleMore() {
      common_vendor.index.__f__("log", "at pages/territory/brand-store.vue:310", "More clicked");
    },
    handleRadio() {
      common_vendor.index.__f__("log", "at pages/territory/brand-store.vue:313", "Radio clicked");
    },
    handleBrandTabChange(tabId) {
      this.activeBrandTab = tabId;
    },
    handlePromote() {
      this.showShareModal = true;
    },
    closeShareModal() {
      this.showShareModal = false;
    },
    handleShare(type) {
      common_vendor.index.__f__("log", "at pages/territory/brand-store.vue:325", "Share via:", type);
      this.showShareModal = false;
    },
    handleBookAgain() {
      common_vendor.index.__f__("log", "at pages/territory/brand-store.vue:329", "Book again clicked");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.o((...args) => $options.handleMore && $options.handleMore(...args)),
    c: common_vendor.o((...args) => $options.handleRadio && $options.handleRadio(...args)),
    d: $data.activeBrandTab === "hair" ? 1 : "",
    e: $data.activeBrandTab === "hair"
  }, $data.activeBrandTab === "hair" ? {} : {}, {
    f: $data.activeBrandTab === "hair" ? 1 : "",
    g: common_vendor.o(($event) => $options.handleBrandTabChange("hair")),
    h: $data.activeBrandTab === "beauty" ? 1 : "",
    i: $data.activeBrandTab === "beauty"
  }, $data.activeBrandTab === "beauty" ? {} : {}, {
    j: $data.activeBrandTab === "beauty" ? 1 : "",
    k: common_vendor.o(($event) => $options.handleBrandTabChange("beauty")),
    l: $data.activeBrandTab === "makeup" ? 1 : "",
    m: $data.activeBrandTab === "makeup"
  }, $data.activeBrandTab === "makeup" ? {} : {}, {
    n: $data.activeBrandTab === "makeup" ? 1 : "",
    o: common_vendor.o(($event) => $options.handleBrandTabChange("makeup")),
    p: $data.activeBrandTab === "nail" ? 1 : "",
    q: $data.activeBrandTab === "nail"
  }, $data.activeBrandTab === "nail" ? {} : {}, {
    r: $data.activeBrandTab === "nail" ? 1 : "",
    s: common_vendor.o(($event) => $options.handleBrandTabChange("nail")),
    t: $data.activeBrandTab === "body" ? 1 : "",
    v: $data.activeBrandTab === "body"
  }, $data.activeBrandTab === "body" ? {} : {}, {
    w: $data.activeBrandTab === "body" ? 1 : "",
    x: common_vendor.o(($event) => $options.handleBrandTabChange("body")),
    y: common_vendor.f($data.brandCards, (card, index, i0) => {
      return common_vendor.e({
        a: common_vendor.f(card.headerInfo, (item, idx, i1) => {
          return {
            a: common_vendor.t(item),
            b: idx
          };
        }),
        b: common_vendor.t(card.price),
        c: common_vendor.t(card.name),
        d: common_vendor.t(card.type),
        e: common_vendor.t(card.level),
        f: common_vendor.t(card.role),
        g: common_vendor.f(card.specialties, (specialty, idx, i1) => {
          return {
            a: common_vendor.t(specialty),
            b: idx
          };
        }),
        h: common_vendor.t(card.rating),
        i: common_vendor.t(card.designers),
        j: common_vendor.t(card.services),
        k: common_vendor.o((...args) => $options.handleMore && $options.handleMore(...args), index),
        l: common_vendor.o((...args) => $options.handlePromote && $options.handlePromote(...args), index),
        m: common_vendor.o((...args) => $options.handleBookAgain && $options.handleBookAgain(...args), index)
      }, $data.showShareModal ? {
        n: common_vendor.o(($event) => $options.handleShare("wechat"), index),
        o: common_vendor.o(($event) => $options.handleShare("moments"), index),
        p: common_vendor.o(($event) => $options.handleShare("weibo"), index),
        q: common_vendor.o(($event) => $options.handleShare("link"), index),
        r: common_vendor.o(($event) => $options.handleShare("qrcode"), index),
        s: common_vendor.o((...args) => $options.closeShareModal && $options.closeShareModal(...args), index),
        t: common_vendor.o(() => {
        }, index),
        v: common_vendor.o((...args) => $options.closeShareModal && $options.closeShareModal(...args), index)
      } : {}, {
        w: index
      });
    }),
    z: `url(${$data.avatarImage})`,
    A: $data.showShareModal
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d6336d58"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/territory/brand-store.js.map
