"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      ratingCategories: [
        { label: "专业", value: 4.6, width: 91 },
        { label: "服务", value: 4.9, width: 97 },
        { label: "效果", value: 4.8, width: 94 },
        { label: "环境", value: 4.8, width: 94 }
      ],
      filterTags: [
        { label: "全部", count: null },
        { label: "技术很好", count: 232 },
        { label: "效果满意", count: 321 },
        { label: "服务态度", count: 321 }
      ],
      reviews: [
        {
          id: 1,
          userName: "加菲猫",
          rating: 5,
          date: "2019-12-25",
          content: "环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环",
          images: [
            "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
            "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
            "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
            "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png"
          ],
          reply: null
        },
        {
          id: 2,
          userName: "加菲猫",
          rating: 5,
          date: "2019-12-25",
          content: "环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环",
          images: [
            "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
            "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
            "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
            "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png"
          ],
          reply: "环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环"
        },
        {
          id: 3,
          userName: "加菲猫",
          rating: 5,
          date: "2019-12-25",
          content: "环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环",
          images: [
            "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
            "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
            "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png",
            "https://c.animaapp.com/mi5kx1ohxTkA7e/img/rectangle-190-2.png"
          ],
          reply: null
        }
      ]
    };
  },
  methods: {
    handleTagClick(index) {
      common_vendor.index.__f__("log", "at components/DesignerReviewsListSection.vue:189", "Filter tag clicked:", this.filterTags[index]);
    },
    handleImageClick(image, index) {
      common_vendor.index.previewImage({
        urls: this.reviews[index].images,
        current: image
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(5, (star, index, i0) => {
      return {
        a: index
      };
    }),
    b: common_vendor.f($data.ratingCategories, (category, index, i0) => {
      return {
        a: common_vendor.t(category.label),
        b: `${category.width}%`,
        c: common_vendor.t(category.value),
        d: index
      };
    }),
    c: common_vendor.f($data.filterTags, (tag, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(tag.label),
        b: tag.count
      }, tag.count ? {
        c: common_vendor.t(tag.count)
      } : {}, {
        d: index,
        e: common_vendor.o(($event) => $options.handleTagClick(index), index)
      });
    }),
    d: common_vendor.f($data.reviews, (review, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(review.userName),
        b: common_vendor.t(review.rating),
        c: common_vendor.f(5, (star, index, i1) => {
          return {
            a: index
          };
        }),
        d: common_vendor.t(review.date),
        e: common_vendor.t(review.content),
        f: common_vendor.f(review.images, (image, index, i1) => {
          return {
            a: index,
            b: review.id === 3 && index === 2 ? 1 : "",
            c: image,
            d: common_vendor.o(($event) => $options.handleImageClick(image, index), index)
          };
        }),
        g: review.reply
      }, review.reply ? {
        h: common_vendor.t(review.reply)
      } : {}, {
        i: review.id
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7a54caff"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/DesignerReviewsListSection.js.map
