"use strict";
const common_vendor = require("../../../common/vendor.js");
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
      roleBadges: [
        { text: "美发师", bgColor: "#f6f6f6", textColor: "#666666" },
        { text: "高级", bgColor: "#dacbb1", textColor: "#645e57" }
      ],
      specialties: [
        { text: "女士造型" },
        { text: "烫发设计" },
        { text: "短发造型" }
      ]
    };
  },
  methods: {
    handleMore() {
      common_vendor.index.__f__("log", "at components/territory/index/TerritoryServiceCardSection.vue:127", "More clicked");
    },
    handlePromote() {
      common_vendor.index.__f__("log", "at components/territory/index/TerritoryServiceCardSection.vue:130", "Promote clicked");
    },
    handleBookAgain() {
      common_vendor.index.__f__("log", "at components/territory/index/TerritoryServiceCardSection.vue:133", "Book again clicked");
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
    b: common_vendor.f($data.roleBadges, (badge, index, i0) => {
      return {
        a: common_vendor.t(badge.text),
        b: index,
        c: badge.bgColor,
        d: badge.textColor
      };
    }),
    c: common_vendor.f($data.specialties, (specialty, index, i0) => {
      return {
        a: common_vendor.t(specialty.text),
        b: index
      };
    }),
    d: common_vendor.o((...args) => $options.handleMore && $options.handleMore(...args)),
    e: common_vendor.o((...args) => $options.handlePromote && $options.handlePromote(...args)),
    f: common_vendor.o((...args) => $options.handleBookAgain && $options.handleBookAgain(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9b0474f4"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/territory/index/TerritoryServiceCardSection.js.map
