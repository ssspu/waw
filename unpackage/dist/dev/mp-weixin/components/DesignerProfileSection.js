"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
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
        { id: "wash-cut-blow", label: "洗剪吹" },
        { id: "perm", label: "烫发" },
        { id: "dye", label: "染发" },
        { id: "care", label: "护发" },
        { id: "scalp", label: "头皮" },
        { id: "extension", label: "接发" }
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
          image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png"
        },
        {
          id: 2,
          title: "烫发",
          description: "发型提案+染发+造型",
          estimatedTime: "1小时",
          salesCount: "1234",
          price: "799",
          discount: "预约优惠10%",
          image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png"
        },
        {
          id: 3,
          title: "烫发",
          description: "发型提案+染发+造型",
          estimatedTime: "1小时",
          salesCount: "1234",
          price: "799",
          discount: "预约优惠10%",
          image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png"
        },
        {
          id: 4,
          title: "烫发",
          description: "发型提案+染发+造型",
          estimatedTime: "1小时",
          salesCount: "1234",
          price: "799",
          discount: "预约优惠10%",
          image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-169-3.png"
        }
      ],
      expandedServices: [],
      // 展开的服务ID列表
      selectedBrands: {},
      // 每个服务选中的品牌 { serviceId: brandId }
      selectedHairLengths: {},
      // 每个服务选中的头发长度 { serviceId: lengthId }
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
    toggleExpand(serviceId) {
      const index = this.expandedServices.indexOf(serviceId);
      if (index > -1) {
        this.expandedServices.splice(index, 1);
      } else {
        this.expandedServices.push(serviceId);
        if (!this.selectedHairLengths[serviceId]) {
          this.$set(this.selectedHairLengths, serviceId, "short");
        }
        if (!this.selectedBrands[serviceId] && this.brandOptions && this.brandOptions.length > 0) {
          this.$set(this.selectedBrands, serviceId, this.brandOptions[0].id);
        }
      }
    },
    isExpanded(serviceId) {
      return this.expandedServices.includes(serviceId);
    },
    getSelectedHairLength(serviceId) {
      return this.selectedHairLengths[serviceId] || "short";
    },
    selectHairLengthForService(serviceId, lengthId) {
      this.$set(this.selectedHairLengths, serviceId, lengthId);
    },
    selectBrand(serviceId, brandId) {
      this.$set(this.selectedBrands, serviceId, brandId);
    },
    getSelectedBrand(serviceId) {
      return this.selectedBrands[serviceId] || (this.brandOptions && this.brandOptions.length > 0 ? this.brandOptions[0].id : null);
    },
    handleBook(service) {
      common_vendor.index.__f__("log", "at components/DesignerProfileSection.vue:256", "Book service:", service);
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
    b: common_vendor.f($data.services, (service, k0, i0) => {
      return common_vendor.e({
        a: service.image,
        b: service.title,
        c: common_vendor.t(service.title),
        d: common_vendor.t(service.description),
        e: common_vendor.t(service.estimatedTime),
        f: common_vendor.t(service.salesCount),
        g: common_vendor.t(service.price),
        h: common_vendor.t(service.discount),
        i: !$options.isExpanded(service.id)
      }, !$options.isExpanded(service.id) ? {
        j: common_vendor.o(($event) => $options.toggleExpand(service.id), service.id)
      } : {
        k: common_assets._imports_0$10,
        l: common_vendor.o(($event) => $options.toggleExpand(service.id), service.id)
      }, {
        m: $options.isExpanded(service.id) ? 1 : "",
        n: $options.isExpanded(service.id) ? 1 : "",
        o: $options.isExpanded(service.id)
      }, $options.isExpanded(service.id) ? {
        p: common_vendor.f($data.hairLengthOptions, (option, k1, i1) => {
          return {
            a: common_vendor.t(option.label),
            b: option.id,
            c: $options.getSelectedHairLength(service.id) === option.id ? 1 : "",
            d: common_vendor.o(($event) => $options.selectHairLengthForService(service.id, option.id), option.id)
          };
        }),
        q: common_vendor.f($data.brandOptions, (brand, k1, i1) => {
          return common_vendor.e({
            a: $options.getSelectedBrand(service.id) === brand.id
          }, $options.getSelectedBrand(service.id) === brand.id ? {} : {}, {
            b: $options.getSelectedBrand(service.id) === brand.id ? 1 : "",
            c: common_vendor.t(brand.name),
            d: common_vendor.t(brand.price),
            e: brand.id,
            f: common_vendor.o(($event) => $options.selectBrand(service.id, brand.id), brand.id)
          });
        }),
        r: common_vendor.o(($event) => $options.handleBook(service), service.id)
      } : {}, {
        s: service.id
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d3c57a56"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/DesignerProfileSection.js.map
