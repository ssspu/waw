"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  props: {
    isBrandMode: {
      type: Boolean,
      default: false
    },
    avatarSrc: {
      type: String,
      default: "https://c.animaapp.com/mi5ng54v4eM3X6/img/rectangle-153-2.png"
    }
  },
  data() {
    return {
      headerInfo: [
        { text: "2025-05-05" },
        { text: "｜" },
        { text: "洗剪吹" },
        { text: "｜" },
        { text: "欧莱雅生化烫" }
      ],
      specialties: [
        { label: "女士造型" },
        { label: "烫发设计" },
        { label: "短发造型" }
      ],
      showShareModal: false,
      showMoreMenu: false,
      showDeleteConfirm: false
    };
  },
  methods: {
    handleMore() {
      this.showMoreMenu = !this.showMoreMenu;
    },
    handlePromote() {
      this.showShareModal = true;
    },
    closeShareModal() {
      this.showShareModal = false;
    },
    handleShare(type) {
      common_vendor.index.__f__("log", "at components/territory/index/TerritoryServiceListSection.vue:208", "Share via:", type);
      this.showShareModal = false;
    },
    handleDelete() {
      this.showMoreMenu = false;
      this.showDeleteConfirm = true;
    },
    closeDeleteConfirm() {
      this.showDeleteConfirm = false;
    },
    confirmDelete() {
      common_vendor.index.__f__("log", "at components/territory/index/TerritoryServiceListSection.vue:220", "Delete confirmed");
      this.showDeleteConfirm = false;
    },
    handleBookAgain() {
      common_vendor.index.__f__("log", "at components/territory/index/TerritoryServiceListSection.vue:225", "Book again clicked");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.headerInfo, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: index
      };
    }),
    b: $props.avatarSrc,
    c: common_vendor.f($data.specialties, (specialty, index, i0) => {
      return {
        a: common_vendor.t(specialty.label),
        b: index
      };
    }),
    d: common_vendor.o((...args) => $options.handleMore && $options.handleMore(...args)),
    e: $data.showMoreMenu
  }, $data.showMoreMenu ? {
    f: common_vendor.o((...args) => $options.handleDelete && $options.handleDelete(...args))
  } : {}, {
    g: common_vendor.o((...args) => $options.handlePromote && $options.handlePromote(...args)),
    h: common_vendor.o((...args) => $options.handleBookAgain && $options.handleBookAgain(...args)),
    i: $data.showShareModal
  }, $data.showShareModal ? {
    j: common_assets._imports_0$9,
    k: common_vendor.o(($event) => $options.handleShare("wechat")),
    l: common_assets._imports_1$8,
    m: common_vendor.o(($event) => $options.handleShare("moments")),
    n: common_assets._imports_2$4,
    o: common_vendor.o(($event) => $options.handleShare("weibo")),
    p: common_assets._imports_3,
    q: common_vendor.o(($event) => $options.handleShare("link")),
    r: common_assets._imports_4,
    s: common_vendor.o(($event) => $options.handleShare("qrcode")),
    t: common_vendor.o((...args) => $options.closeShareModal && $options.closeShareModal(...args)),
    v: common_vendor.o(() => {
    }),
    w: common_vendor.o((...args) => $options.closeShareModal && $options.closeShareModal(...args))
  } : {}, {
    x: $data.showDeleteConfirm
  }, $data.showDeleteConfirm ? {
    y: common_vendor.o((...args) => $options.closeDeleteConfirm && $options.closeDeleteConfirm(...args)),
    z: common_vendor.o((...args) => $options.confirmDelete && $options.confirmDelete(...args)),
    A: common_vendor.o(() => {
    }),
    B: common_vendor.o((...args) => $options.closeDeleteConfirm && $options.closeDeleteConfirm(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ebe4f2a9"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/territory/index/TerritoryServiceListSection.js.map
