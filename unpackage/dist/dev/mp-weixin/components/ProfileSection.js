"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      quickActions: [
        {
          icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2284.svg",
          title: "设计师",
          subtitle: "发现宝藏设计师"
        },
        {
          icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2280.svg",
          title: "优服务",
          subtitle: "甄选特色服务"
        },
        {
          icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2278.svg",
          title: "品牌馆",
          subtitle: "优质线下门店"
        }
      ],
      bottomActions: [
        {
          icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2005.svg",
          title: "预约单",
          subtitle: "你的预约订单"
        },
        {
          icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2006.svg",
          title: "优惠券",
          subtitle: "更多折扣等你"
        },
        {
          icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2007.svg",
          title: "会员",
          subtitle: "VIP平台特权"
        },
        {
          icon: "https://c.animaapp.com/mi4v97d2OSuz2g/img/frame-2008.svg",
          title: "入驻中",
          subtitle: "诚邀全球设计师"
        }
      ],
      portfolioItems: [
        {
          image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-175.png",
          overlay: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-177-1.svg",
          gradient: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-179.svg",
          label: "WOMAN",
          count: "12,349+",
          align: "left"
        },
        {
          image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-176.png",
          overlay: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-178.svg",
          gradient: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-180.svg",
          label: "MAN",
          count: "12,349+",
          align: "right"
        }
      ],
      designerTabs: ["首席创意", "总监店长", "网红名师", "国际导师"],
      designers: [
        {
          id: 13,
          image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
          name: "李天天",
          role: "美发师",
          level: "高级",
          title: "总监｜从业十年",
          rating: "4.8",
          reviews: "234",
          distance: "6.7km"
        },
        {
          id: 14,
          image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
          name: "李天天",
          role: "美发师",
          level: "高级",
          title: "总监｜从业十年",
          rating: "4.8",
          reviews: "234",
          distance: "6.7km"
        }
      ],
      brandTabs: ["专业店", "品牌店", "工作室", "综合店"],
      brands: [
        {
          image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
          name: "成都意念美发造型沙龙",
          rating: "4.8",
          reviews: "768",
          address: "成都青羊区草堂路12号...",
          distance: "7.5km",
          width: "420rpx"
        },
        {
          image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-3.png",
          name: "成都意念美发造",
          rating: "4.8",
          reviews: "768",
          address: "成都青羊区草堂路",
          distance: "",
          width: "240rpx",
          hasOverlay: true
        }
      ],
      serviceTabs: ["全部", "洗吹", "剪发", "烫发", "染发", "护发", "头皮", "接发"],
      services: [
        {
          image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
          title: "烫发",
          description: "发型提案+染发+造型",
          price: "799",
          designerName: "李天天",
          designerRole: "美发师",
          rating: "4.8",
          reviews: "768",
          distance: "6.7km",
          avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg"
        },
        {
          image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
          title: "烫发",
          description: "发型提案+染发+造型",
          price: "799",
          designerName: "李天天",
          designerRole: "美发师",
          rating: "4.8",
          reviews: "768",
          distance: "6.7km",
          avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg"
        },
        {
          image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
          title: "烫发",
          description: "发型提案+染发+造型",
          price: "799",
          designerName: "李天天",
          designerRole: "美发师",
          rating: "4.8",
          reviews: "768",
          distance: "6.7km",
          avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg"
        },
        {
          image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
          title: "烫发",
          description: "发型提案+染发+造型",
          price: "799",
          designerName: "李天天",
          designerRole: "美发师",
          rating: "4.8",
          reviews: "768",
          distance: "6.7km",
          avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg"
        }
      ],
      paginationDots: [
        { active: false, width: "10rpx" },
        { active: false, width: "10rpx" },
        { active: true, width: "28rpx" },
        { active: false, width: "10rpx" }
      ]
    };
  },
  methods: {
    handleQuickAction(action, index) {
      let url = "";
      if (action.title === "设计师") {
        url = "/pages/main/index?tab=designer";
      } else if (action.title === "优服务") {
        url = "/pages/main/index?tab=service";
      } else if (action.title === "品牌馆") {
        url = "/pages/main/index?tab=brand";
      }
      if (url) {
        common_vendor.index.__f__("log", "at components/ProfileSection.vue:428", "准备跳转到:", url);
        common_vendor.index.navigateTo({
          url,
          success: (res) => {
            common_vendor.index.__f__("log", "at components/ProfileSection.vue:432", "跳转成功:", res);
          },
          fail: (err) => {
            common_vendor.index.__f__("error", "at components/ProfileSection.vue:435", "跳转失败:", err);
            common_vendor.index.showToast({
              title: "跳转失败: " + (err.errMsg || "未知错误"),
              icon: "none",
              duration: 2e3
            });
          }
        });
      }
    },
    handleSectionHeaderClick(section) {
      let url = "";
      if (section === "designer") {
        url = "/pages/main/index?tab=designer";
      } else if (section === "service") {
        url = "/pages/main/index?tab=service";
      } else if (section === "brand") {
        url = "/pages/main/index?tab=brand";
      }
      if (url) {
        common_vendor.index.__f__("log", "at components/ProfileSection.vue:457", "准备跳转到:", url);
        common_vendor.index.navigateTo({
          url,
          success: (res) => {
            common_vendor.index.__f__("log", "at components/ProfileSection.vue:461", "跳转成功:", res);
          },
          fail: (err) => {
            common_vendor.index.__f__("error", "at components/ProfileSection.vue:464", "跳转失败:", err);
            common_vendor.index.showToast({
              title: "跳转失败: " + (err.errMsg || "未知错误"),
              icon: "none",
              duration: 2e3
            });
          }
        });
      }
    },
    handleDesignerClick(designer) {
      common_vendor.index.navigateTo({
        url: `/pages/designer/detail?id=${designer.id || 1}&name=${encodeURIComponent(designer.name || "")}`
      });
    },
    handleBrandClick(brand) {
      common_vendor.index.navigateTo({
        url: `/pages/brand/detail?id=${brand.id || 1}&name=${encodeURIComponent(brand.name || "")}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.quickActions, (action, index, i0) => {
      return {
        a: action.icon,
        b: common_vendor.t(action.title),
        c: common_vendor.t(action.subtitle),
        d: index,
        e: common_vendor.o(($event) => $options.handleQuickAction(action, index), index)
      };
    }),
    b: common_vendor.f($data.bottomActions, (action, index, i0) => {
      return {
        a: action.icon,
        b: common_vendor.t(action.title),
        c: common_vendor.t(action.subtitle),
        d: index
      };
    }),
    c: common_vendor.f($data.portfolioItems, (item, index, i0) => {
      return common_vendor.e({
        a: item.image,
        b: item.overlay,
        c: item.gradient,
        d: index === 0 ? "0" : "58rpx",
        e: index === 0 ? "372rpx" : "314rpx",
        f: item.align === "left"
      }, item.align === "left" ? {
        g: common_vendor.t(item.label)
      } : {}, {
        h: common_vendor.t(item.count),
        i: item.align === "right"
      }, item.align === "right" ? {
        j: common_vendor.t(item.label)
      } : {}, {
        k: item.align === "left" ? "20rpx" : "200rpx",
        l: index,
        m: index === 0 ? "0" : "314rpx"
      });
    }),
    d: common_vendor.o(($event) => $options.handleSectionHeaderClick("designer")),
    e: common_vendor.f($data.designerTabs, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab),
        b: index,
        c: index === 0 ? 1 : ""
      };
    }),
    f: common_vendor.f($data.designers, (designer, index, i0) => {
      return {
        a: designer.image,
        b: common_vendor.t(designer.name),
        c: common_vendor.t(designer.role),
        d: common_vendor.t(designer.level),
        e: common_vendor.t(designer.title),
        f: common_vendor.t(designer.rating),
        g: common_vendor.t(designer.reviews),
        h: common_vendor.t(designer.distance),
        i: index,
        j: common_vendor.o(($event) => $options.handleDesignerClick(designer), index)
      };
    }),
    g: common_vendor.f($data.paginationDots, (dot, index, i0) => {
      return {
        a: index,
        b: dot.active ? 1 : "",
        c: dot.width
      };
    }),
    h: common_vendor.o(($event) => $options.handleSectionHeaderClick("brand")),
    i: common_vendor.f($data.brandTabs, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab),
        b: index,
        c: index === 0 ? 1 : ""
      };
    }),
    j: common_vendor.f($data.brands, (brand, index, i0) => {
      return common_vendor.e({
        a: !brand.hasOverlay
      }, !brand.hasOverlay ? {
        b: brand.width
      } : {}, {
        c: brand.image,
        d: brand.width,
        e: brand.width,
        f: common_vendor.t(brand.name),
        g: common_vendor.t(brand.rating),
        h: brand.hasOverlay
      }, brand.hasOverlay ? {} : {}, {
        i: brand.hasOverlay
      }, brand.hasOverlay ? {} : {}, {
        j: brand.hasOverlay
      }, brand.hasOverlay ? {} : {}, {
        k: !brand.hasOverlay
      }, !brand.hasOverlay ? {} : {}, {
        l: common_vendor.t(brand.reviews),
        m: common_vendor.t(brand.address),
        n: brand.distance
      }, brand.distance ? {
        o: common_vendor.t(brand.distance)
      } : {}, {
        p: brand.hasOverlay
      }, brand.hasOverlay ? {} : {}, {
        q: index,
        r: brand.width,
        s: common_vendor.o(($event) => $options.handleBrandClick(brand), index)
      });
    }),
    k: common_vendor.o(($event) => $options.handleSectionHeaderClick("service")),
    l: common_vendor.f($data.serviceTabs, (tab, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(tab),
        b: index === 0
      }, index === 0 ? {} : {}, {
        c: index,
        d: index === 0 ? 1 : ""
      });
    }),
    m: common_vendor.f($data.services, (service, index, i0) => {
      return {
        a: service.image,
        b: common_vendor.t(service.title),
        c: common_vendor.t(service.description),
        d: common_vendor.t(service.price),
        e: service.avatar,
        f: common_vendor.t(service.designerName),
        g: common_vendor.t(service.designerRole),
        h: common_vendor.t(service.rating),
        i: common_vendor.t(service.reviews),
        j: common_vendor.t(service.distance),
        k: index
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c9b46121"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/ProfileSection.js.map
