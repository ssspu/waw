"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
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
      ]
    };
  },
  methods: {
    handleMore() {
      common_vendor.index.__f__("log", "at components/TerritoryServiceListSection.vue:121", "More clicked");
    },
    handlePromote() {
      common_vendor.index.__f__("log", "at components/TerritoryServiceListSection.vue:124", "Promote clicked");
    },
    handleBookAgain() {
      common_vendor.index.__f__("log", "at components/TerritoryServiceListSection.vue:127", "Book again clicked");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.headerInfo, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: index
      };
    }),
    b: common_vendor.f($data.specialties, (specialty, index, i0) => {
      return {
        a: common_vendor.t(specialty.label),
        b: index
      };
    }),
    c: common_vendor.o((...args) => $options.handleMore && $options.handleMore(...args)),
    d: common_vendor.o((...args) => $options.handlePromote && $options.handlePromote(...args)),
    e: common_vendor.o((...args) => $options.handleBookAgain && $options.handleBookAgain(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-52df96f3"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/TerritoryServiceListSection.js.map
