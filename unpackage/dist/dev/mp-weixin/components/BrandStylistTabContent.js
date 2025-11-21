"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      selectedCategory: "hairstylist",
      categories: [
        { id: "hairstylist", label: "发型师" },
        { id: "chief", label: "首席" },
        { id: "senior", label: "资深" },
        { id: "director", label: "总监" },
        { id: "manager", label: "店长" }
      ],
      stylists: [
        {
          id: 1,
          name: "李天天",
          image: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-169-3.png",
          role: "美发师",
          level: "高级",
          position: "店长｜从业12年",
          specialties: ["短发裁剪", "染发设计"],
          rating: 4.8,
          serviceCount: 287,
          worksCount: 123,
          tags: ["提前预约", "上门服务", "技术专业"],
          price: 799,
          discount: "预约优惠10%",
          soldCount: 1234
        },
        {
          id: 2,
          name: "李天天",
          image: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-169-3.png",
          role: "美发师",
          level: "高级",
          position: "店长｜从业12年",
          specialties: ["短发裁剪", "染发设计"],
          rating: 4.8,
          serviceCount: 287,
          worksCount: 123,
          tags: ["提前预约", "上门服务", "技术专业"],
          price: 799,
          discount: "预约优惠10%",
          soldCount: 1234
        },
        {
          id: 3,
          name: "李天天",
          image: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-169-3.png",
          role: "美发师",
          level: "高级",
          position: "店长｜从业12年",
          specialties: ["短发裁剪", "染发设计"],
          rating: 4.8,
          serviceCount: 287,
          worksCount: 123,
          tags: ["提前预约", "上门服务", "技术专业"],
          price: 799,
          discount: "预约优惠10%",
          soldCount: 1234
        },
        {
          id: 4,
          name: "李天天",
          image: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-169-3.png",
          role: "美发师",
          level: "高级",
          position: "店长｜从业12年",
          specialties: ["短发裁剪", "染发设计"],
          rating: 4.8,
          serviceCount: 287,
          worksCount: 123,
          tags: ["提前预约", "上门服务", "技术专业"],
          price: 799,
          discount: "预约优惠10%",
          soldCount: 1234
        }
      ]
    };
  },
  methods: {
    selectCategory(id) {
      this.selectedCategory = id;
    },
    handleBook(stylist) {
      common_vendor.index.__f__("log", "at components/BrandStylistTabContent.vue:190", "Book stylist:", stylist);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.categories, (category, k0, i0) => {
      return {
        a: common_vendor.t(category.label),
        b: category.id,
        c: $data.selectedCategory === category.id ? 1 : "",
        d: common_vendor.o(($event) => $options.selectCategory(category.id), category.id)
      };
    }),
    b: common_vendor.f($data.stylists, (stylist, k0, i0) => {
      return {
        a: stylist.image,
        b: stylist.name,
        c: common_vendor.t(stylist.name),
        d: common_vendor.t(stylist.role),
        e: common_vendor.t(stylist.level),
        f: common_vendor.t(stylist.position),
        g: common_vendor.f(stylist.specialties, (specialty, index, i1) => {
          return {
            a: common_vendor.t(specialty),
            b: index
          };
        }),
        h: common_vendor.t(stylist.rating),
        i: common_vendor.t(stylist.serviceCount),
        j: common_vendor.t(stylist.worksCount),
        k: common_vendor.f(stylist.tags, (tag, index, i1) => {
          return {
            a: common_vendor.t(tag),
            b: index
          };
        }),
        l: common_vendor.t(stylist.price),
        m: common_vendor.t(stylist.discount),
        n: common_vendor.t(stylist.soldCount),
        o: common_vendor.o(($event) => $options.handleBook(stylist), stylist.id),
        p: stylist.id
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4837c8c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/BrandStylistTabContent.js.map
