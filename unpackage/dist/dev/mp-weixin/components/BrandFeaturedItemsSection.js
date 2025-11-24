"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      categoryItems: [
        {
          icon: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-2006-1.svg",
          title: "专业店",
          subtitle: "专业服务店"
        },
        {
          icon: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-2005.svg",
          title: "品牌店",
          subtitle: "影响力名店"
        },
        {
          icon: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-2005-1.svg",
          title: "工作室",
          subtitle: "独立设计师"
        },
        {
          icon: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/frame-2006.svg",
          title: "综合店",
          subtitle: "多服务模式"
        }
      ],
      tabItems: [
        { label: "星级店", active: true, value: "star", new: false },
        { label: "人气店", active: false, value: "popular", new: false },
        { label: "男士店", active: false, value: "men", new: true }
      ],
      activeStoreTab: "star",
      storeSwiperIndex: 0,
      storeSlides: {
        star: [
          [
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            },
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            },
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            }
          ],
          [
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            },
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            },
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            }
          ],
          [
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            },
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            },
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            }
          ],
          [
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            },
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            },
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            }
          ]
        ],
        popular: [
          [
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            },
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            },
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            }
          ],
          [
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            },
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            },
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            }
          ]
        ],
        men: [
          [
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            },
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            },
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            }
          ],
          [
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            },
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-2.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            },
            {
              image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-220-1.png",
              overlay: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-221-2.svg",
              name: "成都NICE造型沙龙",
              type: "专业店｜2012年开业",
              rating: "4.8",
              designers: "8人",
              services: "1236",
              amenities: ["代客泊车", "免费茶点"],
              distance: "7.5km",
              tag: "舒适"
            }
          ]
        ]
      },
      nearbyStores: [
        {
          image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-6.png",
          name: "成都NICE造型沙龙",
          type: "专业店｜2012年开业",
          rating: "4.8",
          designers: "8人",
          services: "1236",
          amenities: ["代客泊车", "免费茶点", "共享工位", "7天无忧"],
          distance: "7.5km",
          tag: "舒适"
        },
        {
          image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-1.png",
          name: "成都NICE造型沙龙",
          type: "专业店｜2012年开业",
          rating: "4.8",
          designers: "8人",
          services: "1236",
          amenities: ["代客泊车", "免费茶点", "共享工位", "7天无忧"],
          distance: "7.5km",
          tag: "舒适"
        },
        {
          image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-2.png",
          name: "成都NICE造型沙龙",
          type: "专业店｜2012年开业",
          rating: "4.8",
          designers: "8人",
          services: "1236",
          amenities: ["代客泊车", "免费茶点", "共享工位", "7天无忧"],
          distance: "7.5km",
          tag: "舒适"
        },
        {
          image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-3.png",
          name: "成都NICE造型沙龙",
          type: "专业店｜2012年开业",
          rating: "4.8",
          designers: "8人",
          services: "1236",
          amenities: ["代客泊车", "免费茶点", "共享工位", "7天无忧"],
          distance: "7.5km",
          tag: "舒适"
        },
        {
          image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-4.png",
          name: "成都NICE造型沙龙",
          type: "专业店｜2012年开业",
          rating: "4.8",
          designers: "8人",
          services: "1236",
          amenities: ["代客泊车", "免费茶点", "共享工位", "7天无忧"],
          distance: "7.5km",
          tag: "舒适"
        },
        {
          image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-5.png",
          name: "成都NICE造型沙龙",
          type: "专业店｜2012年开业",
          rating: "4.8",
          designers: "8人",
          services: "1236",
          amenities: ["代客泊车", "免费茶点", "共享工位", "7天无忧"],
          distance: "7.5km",
          tag: "舒适"
        },
        {
          image: "https://c.animaapp.com/mi5cgxi6ndVkfo/img/rectangle-153-6.png",
          name: "成都NICE造型沙龙",
          type: "专业店｜2012年开业",
          rating: "4.8",
          designers: "8人",
          services: "1236",
          amenities: ["代客泊车", "免费茶点", "共享工位", "7天无忧"],
          distance: "7.5km",
          tag: "舒适"
        }
      ]
    };
  },
  computed: {
    currentStoreSlides() {
      const slides = this.storeSlides[this.activeStoreTab];
      return slides || [];
    }
  },
  methods: {
    handleCategoryClick(item) {
      common_vendor.index.__f__("log", "at components/BrandFeaturedItemsSection.vue:630", "Category clicked:", item);
    },
    switchTab(index) {
      const tab = this.tabItems[index];
      this.tabItems.forEach((t, i) => {
        t.active = i === index;
      });
      this.activeStoreTab = tab.value;
      this.storeSwiperIndex = 0;
      if (tab.new) {
        tab.new = false;
      }
    },
    handleStoreSwiperChange(e) {
      this.storeSwiperIndex = e.detail.current;
    },
    handleStoreClick(store) {
      common_vendor.index.navigateTo({
        url: `/pages/brand/detail?id=${store.id || 1}&name=${encodeURIComponent(store.name || "")}`
      });
    },
    handleFilter() {
      common_vendor.index.__f__("log", "at components/BrandFeaturedItemsSection.vue:654", "Filter clicked");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.categoryItems, (item, index, i0) => {
      return {
        a: item.icon,
        b: item.title,
        c: common_vendor.t(item.title),
        d: common_vendor.t(item.subtitle),
        e: index,
        f: common_vendor.o(($event) => $options.handleCategoryClick(item), index)
      };
    }),
    b: common_vendor.f($data.tabItems, (tab, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(tab.label),
        b: tab.new
      }, tab.new ? {} : {}, {
        c: index,
        d: tab.active ? 1 : "",
        e: common_vendor.o(($event) => $options.switchTab(index), index)
      });
    }),
    c: common_vendor.f($options.currentStoreSlides, (slide, slideIndex, i0) => {
      return {
        a: common_vendor.f(slide, (store, index, i1) => {
          return {
            a: store.image,
            b: store.name,
            c: store.overlay,
            d: common_vendor.t(store.rating),
            e: common_vendor.t(store.designers),
            f: common_vendor.t(store.services),
            g: common_vendor.t(store.name),
            h: common_vendor.t(store.type),
            i: common_vendor.f(store.amenities, (amenity, idx, i2) => {
              return {
                a: common_vendor.t(amenity),
                b: idx
              };
            }),
            j: common_vendor.t(store.distance),
            k: common_vendor.t(store.tag),
            l: index,
            m: common_vendor.o(($event) => $options.handleStoreClick(store), index)
          };
        }),
        b: slideIndex
      };
    }),
    d: $data.storeSwiperIndex,
    e: common_vendor.o((...args) => $options.handleStoreSwiperChange && $options.handleStoreSwiperChange(...args)),
    f: common_vendor.f($options.currentStoreSlides.length, (dot, index, i0) => {
      return {
        a: index,
        b: index === $data.storeSwiperIndex ? 1 : ""
      };
    }),
    g: common_vendor.o((...args) => $options.handleFilter && $options.handleFilter(...args)),
    h: common_vendor.f($data.nearbyStores, (store, index, i0) => {
      return {
        a: `url(${store.image})`,
        b: common_vendor.t(store.name),
        c: common_vendor.t(store.tag),
        d: common_vendor.t(store.type),
        e: common_vendor.t(store.rating),
        f: common_vendor.t(store.designers),
        g: common_vendor.t(store.services),
        h: common_vendor.f(store.amenities, (amenity, idx, i1) => {
          return {
            a: common_vendor.t(amenity),
            b: idx
          };
        }),
        i: common_vendor.t(store.distance),
        j: index,
        k: common_vendor.o(($event) => $options.handleStoreClick(store), index)
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3a067a67"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/BrandFeaturedItemsSection.js.map
