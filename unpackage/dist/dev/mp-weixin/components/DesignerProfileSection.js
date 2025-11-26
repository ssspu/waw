"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      selectedSecondary: "hairstylist",
      secondaryTabs: [
        { id: "hairstylist", label: "美发师" },
        { id: "beautician", label: "美容师" }
      ],
      selectedCategory: "wash-cut-blow",
      selectedHairLength: "short",
      categories: [
        { id: "stylist", label: "发型师", active: true },
        { id: "chief", label: "首席", active: false },
        { id: "senior", label: "资深", active: false },
        { id: "director", label: "总监", active: false },
        { id: "manager", label: "店长", active: false }
      ],
      services: [
        {
          id: 1,
          title: "烫发",
          description: "发型提案+染发+造型",
          estimatedTime: "1小时",
          salesCount: "1234",
          price: "799",
          discount: "预约优惠10%",
          image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png",
          hasOptions: false
        },
        {
          id: 2,
          title: "烫发",
          description: "发型提案+染发+造型",
          estimatedTime: "1小时",
          salesCount: "1234",
          price: "799",
          discount: "预约优惠10%",
          image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png",
          hasOptions: false
        },
        {
          id: 3,
          title: "烫发",
          description: "发型提案+染发+造型",
          estimatedTime: "1小时",
          salesCount: "1234",
          price: "799",
          discount: "预约优惠10%",
          image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png",
          hasOptions: true
        },
        {
          id: 4,
          title: "烫发",
          description: "发型提案+染发+造型",
          estimatedTime: "1小时",
          salesCount: "1234",
          price: "799",
          discount: "预约优惠10%",
          image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png",
          hasOptions: false
        }
      ],
      hairLengthOptions: [
        { id: "short", label: "短发", active: true },
        { id: "medium", label: "中发", active: false },
        { id: "long", label: "长发", active: false }
      ],
      brandOptions: [
        {
          id: 1,
          name: "威娜",
          price: "560",
          icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891-7.svg"
        },
        {
          id: 2,
          name: "菲灵",
          price: "660",
          icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891-3.svg"
        },
        {
          id: 3,
          name: "欧莱雅",
          price: "760",
          icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891-3.svg"
        },
        {
          id: 4,
          name: "乔薇尔",
          price: "860",
          icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891-3.svg"
        }
      ]
    };
  },
  methods: {
    selectSecondary(id) {
      this.selectedSecondary = id;
    },
    selectCategory(id) {
      this.selectedCategory = id;
    },
    selectHairLength(id) {
      this.selectedHairLength = id;
    },
    handleBook(service) {
      common_vendor.index.__f__("log", "at components/DesignerProfileSection.vue:232", "Book service:", service);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.secondaryTabs, (tab, k0, i0) => {
      return {
        a: common_vendor.t(tab.label),
        b: tab.id,
        c: $data.selectedSecondary === tab.id ? 1 : "",
        d: common_vendor.o(($event) => $options.selectSecondary(tab.id), tab.id)
      };
    }),
    b: common_vendor.f($data.categories, (category, k0, i0) => {
      return {
        a: common_vendor.t(category.label),
        b: category.id,
        c: $data.selectedCategory === category.id ? 1 : "",
        d: common_vendor.o(($event) => $options.selectCategory(category.id), category.id)
      };
    }),
    c: common_vendor.f($data.services, (service, k0, i0) => {
      return common_vendor.e({
        a: service.image,
        b: service.title,
        c: common_vendor.t(service.title),
        d: common_vendor.t(service.description),
        e: common_vendor.t(service.estimatedTime),
        f: common_vendor.t(service.salesCount),
        g: common_vendor.t(service.price),
        h: common_vendor.t(service.discount),
        i: !service.hasOptions
      }, !service.hasOptions ? {
        j: common_vendor.o(($event) => $options.handleBook(service), service.id)
      } : {}, {
        k: service.hasOptions ? 1 : "",
        l: service.hasOptions ? 1 : "",
        m: service.hasOptions
      }, service.hasOptions ? {
        n: common_vendor.f($data.hairLengthOptions, (option, k1, i1) => {
          return {
            a: common_vendor.t(option.label),
            b: option.id,
            c: $data.selectedHairLength === option.id ? 1 : "",
            d: common_vendor.o(($event) => $options.selectHairLength(option.id), option.id)
          };
        }),
        o: common_vendor.f($data.brandOptions, (brand, k1, i1) => {
          return {
            a: brand.icon,
            b: brand.name,
            c: common_vendor.t(brand.name),
            d: common_vendor.t(brand.price),
            e: brand.id
          };
        }),
        p: common_vendor.o(($event) => $options.handleBook(service), service.id)
      } : {}, {
        q: service.id
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d3c57a56"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/DesignerProfileSection.js.map
