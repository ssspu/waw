"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      serviceCategories: [
        {
          icon: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2006.svg",
          title: "首席创意",
          subtitle: "新潮时尚引领"
        },
        {
          icon: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2005-1.svg",
          title: "总监店长",
          subtitle: "资深技术大咖"
        },
        {
          icon: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2005.svg",
          title: "网红名师",
          subtitle: "人气霸榜标杆"
        },
        {
          icon: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2006-1.svg",
          title: "国际导师",
          subtitle: "海内外多语种"
        }
      ],
      bookingOptions: [
        {
          title: "预约到店",
          subtitle: "线下固定门店",
          icon: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2278.svg"
        },
        {
          title: "预约上门",
          subtitle: "约定服务地点",
          icon: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/frame-2287.svg"
        }
      ],
      rankingTabs: [
        { label: "新秀榜", active: true },
        { label: "专业榜", active: false },
        { label: "服务榜", active: false, hasNew: true }
      ],
      rankingStylists: [
        {
          id: 1,
          image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png",
          name: "李天天",
          level: "高级",
          role: "店长｜从业12年",
          rating: "4.8"
        },
        {
          id: 2,
          image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-1.png",
          name: "李天天",
          level: "高级",
          role: "店长｜从业12年",
          rating: "4.8"
        },
        {
          id: 3,
          image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-2.png",
          name: "李天天",
          level: "高级",
          role: "店长｜从业12年",
          rating: "4.8"
        },
        {
          id: 4,
          image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-3.png",
          name: "李天天",
          level: "高级",
          role: "店长｜从业12年",
          rating: "4.8"
        },
        {
          id: 5,
          image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-4.png",
          name: "李天天",
          level: "高级",
          role: "店长｜从业12年",
          rating: "4.8"
        },
        {
          id: 6,
          image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png",
          name: "李天天",
          level: "高级",
          role: "店长｜从业12年",
          rating: "4.8"
        }
      ],
      nearbyStylistsData: [
        {
          id: 7,
          image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png",
          name: "李天天",
          level: "高级",
          role: "店长｜从业12年",
          specialties: ["女士造型", "烫发设计", "短发造型"],
          rating: "4.8",
          services: "287",
          works: "123",
          tags: ["明星网红", "预约服务", "免费设计", "7天无忧"],
          distance: "7.5km"
        },
        {
          id: 8,
          image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-7.png",
          name: "李天天",
          level: "高级",
          role: "店长｜从业12年",
          specialties: ["女士造型", "烫发设计", "短发造型"],
          rating: "4.8",
          services: "287",
          works: "123",
          tags: ["明星网红", "预约服务", "免费设计", "7天无忧"],
          distance: "7.5km"
        },
        {
          id: 9,
          image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-8.png",
          name: "李天天",
          level: "高级",
          role: "店长｜从业12年",
          specialties: ["女士造型", "烫发设计", "短发造型"],
          rating: "4.8",
          services: "287",
          works: "123",
          tags: ["明星网红", "预约服务", "免费设计", "7天无忧"],
          distance: "7.5km"
        },
        {
          id: 10,
          image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-9.png",
          name: "李天天",
          level: "高级",
          role: "店长｜从业12年",
          specialties: ["女士造型", "烫发设计", "短发造型"],
          rating: "4.8",
          services: "287",
          works: "123",
          tags: ["明星网红", "预约服务", "免费设计", "7天无忧"],
          distance: "7.5km"
        },
        {
          id: 11,
          image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-10.png",
          name: "李天天",
          level: "高级",
          role: "店长｜从业12年",
          specialties: ["女士造型", "烫发设计", "短发造型"],
          rating: "4.8",
          services: "287",
          works: "123",
          tags: ["明星网红", "预约服务", "免费设计", "7天无忧"],
          distance: "7.5km"
        },
        {
          id: 12,
          image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-11.png",
          name: "李天天",
          level: "高级",
          role: "店长｜从业12年",
          specialties: ["女士造型", "烫发设计", "短发造型"],
          rating: "4.8",
          services: "287",
          works: "123",
          tags: ["明星网红", "预约服务", "免费设计", "7天无忧"],
          distance: "7.5km"
        }
      ]
    };
  },
  methods: {
    handleCategoryClick(category) {
      common_vendor.index.__f__("log", "at components/main/index/DesignSection.vue:352", "Category clicked:", category);
    },
    handleBookingClick(option) {
      common_vendor.index.__f__("log", "at components/main/index/DesignSection.vue:355", "Booking clicked:", option);
    },
    switchRankingTab(index) {
      this.rankingTabs.forEach((tab, i) => {
        tab.active = i === index;
      });
    },
    handleStylistClick(stylist) {
      common_vendor.index.navigateTo({
        url: `/pages/designer/detail?id=${stylist.id || 1}&name=${encodeURIComponent(stylist.name || "")}`
      });
    },
    handleFilter() {
      common_vendor.index.__f__("log", "at components/main/index/DesignSection.vue:369", "Filter clicked");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.serviceCategories, (category, index, i0) => {
      return {
        a: category.icon,
        b: category.title,
        c: common_vendor.t(category.title),
        d: common_vendor.t(category.subtitle),
        e: index,
        f: common_vendor.o(($event) => $options.handleCategoryClick(category), index)
      };
    }),
    b: common_vendor.f($data.bookingOptions, (option, index, i0) => {
      return {
        a: common_vendor.t(option.title),
        b: common_vendor.t(option.subtitle),
        c: option.icon,
        d: option.title,
        e: index,
        f: common_vendor.o(($event) => $options.handleBookingClick(option), index)
      };
    }),
    c: common_vendor.f($data.rankingTabs, (tab, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(tab.label),
        b: tab.hasNew
      }, tab.hasNew ? {} : {}, {
        c: index,
        d: tab.active ? 1 : "",
        e: common_vendor.o(($event) => $options.switchRankingTab(index), index)
      });
    }),
    d: common_vendor.f($data.rankingStylists, (stylist, index, i0) => {
      return {
        a: `url(${stylist.image})`,
        b: common_vendor.t(stylist.name),
        c: common_vendor.t(stylist.level),
        d: common_vendor.t(stylist.role),
        e: common_vendor.t(stylist.rating),
        f: index,
        g: common_vendor.o(($event) => $options.handleStylistClick(stylist), index)
      };
    }),
    e: common_vendor.o((...args) => $options.handleFilter && $options.handleFilter(...args)),
    f: common_vendor.f($data.nearbyStylistsData, (stylist, index, i0) => {
      return {
        a: `url(${stylist.image})`,
        b: common_vendor.t(stylist.name),
        c: common_vendor.t(stylist.level),
        d: common_vendor.t(stylist.role),
        e: common_vendor.f(stylist.specialties, (specialty, idx, i1) => {
          return {
            a: common_vendor.t(specialty),
            b: idx
          };
        }),
        f: common_vendor.t(stylist.rating),
        g: common_vendor.t(stylist.services),
        h: common_vendor.t(stylist.works),
        i: common_vendor.f(stylist.tags, (tag, idx, i1) => {
          return {
            a: common_vendor.t(tag),
            b: idx
          };
        }),
        j: common_vendor.t(stylist.distance),
        k: index,
        l: common_vendor.o(($event) => $options.handleStylistClick(stylist), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b5ee60fe"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/main/index/DesignSection.js.map
