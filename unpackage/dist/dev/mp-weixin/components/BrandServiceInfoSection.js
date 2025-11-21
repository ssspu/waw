"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      selectedServiceTab: "notice",
      serviceTabs: [
        { id: "notice", label: "服务须知" },
        { id: "features", label: "服务特色" },
        { id: "facilities", label: "环境设施" }
      ],
      serviceInfoData: [
        { label: "营业时间", value: ["周二 - 周日", "10:00-21:00"] },
        { label: "预约时间", value: ["提前3小时"] },
        { label: "美发师", value: ["15人"] },
        { label: "工位", value: ["15个"] },
        { label: "成立", value: ["2017-11-20"] },
        { label: "面积", value: ["160m"] }
      ],
      reviewTags: [
        { label: "技术很好", count: 232, active: true },
        { label: "效果满意", count: 321, active: false },
        { label: "服务态度", count: 321, active: false }
      ],
      reviews: [
        {
          image: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-187.png",
          title: "环境特别好",
          rating: 5,
          text: "环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境...",
          author: {
            avatar: "https://c.animaapp.com/mi5l377nJk1HHO/img/ellipse-34.svg",
            name: "加菲猫"
          },
          date: "2019-12-25"
        },
        {
          image: "https://c.animaapp.com/mi5l377nJk1HHO/img/rectangle-187-1.png",
          title: "环境特别好",
          rating: 5,
          text: "环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境...",
          author: {
            avatar: "https://c.animaapp.com/mi5l377nJk1HHO/img/ellipse-34.svg",
            name: "加菲猫"
          },
          date: "2019-12-25"
        }
      ],
      questions: [
        "只烫不染的短发多少钱？头发比较干，不知道能不能做？",
        "刘海发际线太高怎么办？"
      ]
    };
  },
  methods: {
    selectServiceTab(id) {
      this.selectedServiceTab = id;
    },
    selectReviewTag(index) {
      this.reviewTags.forEach((tag, i) => {
        tag.active = i === index;
      });
    },
    handleMoreReviews() {
      common_vendor.index.__f__("log", "at components/BrandServiceInfoSection.vue:195", "More reviews");
    },
    handleMoreQA() {
      common_vendor.index.__f__("log", "at components/BrandServiceInfoSection.vue:198", "More QA");
    },
    handleEntry() {
      common_vendor.index.__f__("log", "at components/BrandServiceInfoSection.vue:201", "Entry clicked");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.serviceTabs, (tab, k0, i0) => {
      return {
        a: common_vendor.t(tab.label),
        b: tab.id,
        c: $data.selectedServiceTab === tab.id ? 1 : "",
        d: common_vendor.o(($event) => $options.selectServiceTab(tab.id), tab.id)
      };
    }),
    b: common_vendor.f($data.serviceInfoData, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.label),
        b: common_vendor.f(item.value, (val, valIndex, i1) => {
          return {
            a: common_vendor.t(val),
            b: valIndex
          };
        }),
        c: index < $data.serviceInfoData.length - 1
      }, index < $data.serviceInfoData.length - 1 ? {} : {}, {
        d: index
      });
    }),
    c: common_vendor.o((...args) => $options.handleMoreReviews && $options.handleMoreReviews(...args)),
    d: common_vendor.f($data.reviewTags, (tag, index, i0) => {
      return {
        a: common_vendor.t(tag.label),
        b: common_vendor.t(tag.count),
        c: index,
        d: tag.active ? 1 : "",
        e: common_vendor.o(($event) => $options.selectReviewTag(index), index)
      };
    }),
    e: common_vendor.f($data.reviews, (review, index, i0) => {
      return {
        a: review.image,
        b: common_vendor.t(review.title),
        c: common_vendor.t(review.rating),
        d: common_vendor.f(5, (i, k1, i1) => {
          return {
            a: i
          };
        }),
        e: common_vendor.t(review.text),
        f: review.author.avatar,
        g: common_vendor.t(review.author.name),
        h: common_vendor.t(review.date),
        i: index
      };
    }),
    f: common_vendor.o((...args) => $options.handleMoreQA && $options.handleMoreQA(...args)),
    g: common_vendor.f($data.questions, (question, index, i0) => {
      return {
        a: common_vendor.t(question),
        b: index
      };
    }),
    h: common_vendor.o((...args) => $options.handleEntry && $options.handleEntry(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ee135841"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/BrandServiceInfoSection.js.map
