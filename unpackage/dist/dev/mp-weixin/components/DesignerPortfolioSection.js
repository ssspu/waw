"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      navTabs: ["服务须知", "服务特色", "环境设施"],
      serviceInfoData: [
        { label: "职位", value: "店长" },
        { label: "职称", value: "国家高级美发师" },
        { label: "擅长", value: "男士油头造型、细软烫发" },
        { label: "工作时间", value: "周二 - 周日", extra: "10:00-21:00" },
        { label: "从业时间", value: "12年" },
        { label: "预约时间", value: "提前3小时" }
      ],
      reviewTags: [
        { text: "技术很好", count: "232", active: true },
        { text: "效果满意", count: "321", active: false },
        { text: "服务态度", count: "321", active: false }
      ],
      questions: [
        "只烫不染的短发多少钱？头发比较干，不知道能不能做？",
        "刘海发际线太高怎么办？"
      ]
    };
  },
  methods: {
    switchNav(index) {
      common_vendor.index.__f__("log", "at components/DesignerPortfolioSection.vue:169", "Switch nav:", index);
    },
    selectTag(index) {
      this.reviewTags.forEach((tag, i) => {
        tag.active = i === index;
      });
    },
    handleViewMoreReviews() {
      common_vendor.index.__f__("log", "at components/DesignerPortfolioSection.vue:177", "View more reviews");
    },
    handleViewMoreQA() {
      common_vendor.index.__f__("log", "at components/DesignerPortfolioSection.vue:180", "View more QA");
    },
    handleQuestionClick(question) {
      common_vendor.index.__f__("log", "at components/DesignerPortfolioSection.vue:183", "Question clicked:", question);
    },
    handleJoin() {
      common_vendor.index.__f__("log", "at components/DesignerPortfolioSection.vue:186", "Join clicked");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.navTabs, (nav, index, i0) => {
      return {
        a: common_vendor.t(nav),
        b: index,
        c: index === 0 ? 1 : "",
        d: common_vendor.o(($event) => $options.switchNav(index), index)
      };
    }),
    b: common_vendor.f($data.serviceInfoData, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.label),
        b: common_vendor.t(item.value),
        c: item.extra
      }, item.extra ? {
        d: common_vendor.t(item.extra)
      } : {}, {
        e: index
      });
    }),
    c: common_vendor.o((...args) => $options.handleViewMoreReviews && $options.handleViewMoreReviews(...args)),
    d: common_vendor.f($data.reviewTags, (tag, index, i0) => {
      return {
        a: common_vendor.t(tag.text),
        b: common_vendor.t(tag.count),
        c: index,
        d: tag.active ? 1 : "",
        e: common_vendor.o(($event) => $options.selectTag(index), index)
      };
    }),
    e: common_vendor.f(5, (i, k0, i0) => {
      return {
        a: i
      };
    }),
    f: `url(https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg)`,
    g: common_vendor.o((...args) => $options.handleViewMoreQA && $options.handleViewMoreQA(...args)),
    h: common_vendor.f($data.questions, (question, index, i0) => {
      return {
        a: common_vendor.t(question),
        b: index,
        c: common_vendor.o(($event) => $options.handleQuestionClick(question), index)
      };
    }),
    i: common_vendor.o((...args) => $options.handleJoin && $options.handleJoin(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ea0c4510"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/DesignerPortfolioSection.js.map
