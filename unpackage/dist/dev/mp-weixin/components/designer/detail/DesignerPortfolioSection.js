"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      activeNavTab: 0,
      navTabs: ["服务须知", "服务特色", "环境设施"],
      serviceInfoData: [
        { label: "职位", value: "店长" },
        { label: "职称", value: "国家高级美发师" },
        { label: "擅长", value: "男士油头造型、细软烫发" },
        { label: "工作时间", value: "周二 - 周日", extra: "10:00-21:00" },
        { label: "从业时间", value: "12年" },
        { label: "预约时间", value: "提前3小时" }
      ],
      serviceFeaturesData: [
        {
          title: "",
          tags: [
            "全预约制",
            "免费茶点",
            "头皮检测",
            "免费停车",
            "烫染专业店",
            "免费修眉",
            "一对一服务",
            "免费按摩",
            "没有隐形消费",
            "可上门服务"
          ]
        },
        {
          title: "其他",
          tags: [
            "不可携带宠物",
            "服务区不可吸烟"
          ]
        }
      ],
      environmentData: [
        {
          title: "",
          tags: [
            "储物柜",
            "免费Wifi",
            "充电宝",
            "可看电视",
            "VIP专区",
            "沙发座"
          ]
        },
        {
          title: "通用设施",
          tags: [
            "特定吸烟区",
            "电梯",
            "有停车位",
            "空调",
            "先进/刷卡支付"
          ]
        }
      ],
      reviewTags: [
        { text: "技术很好", count: "232", active: true },
        { text: "效果满意", count: "321", active: false },
        { text: "服务态度", count: "321", active: false }
      ],
      reviews: [
        {
          id: 1,
          title: "环境特别好",
          rating: "5.0",
          content: "环境特别好环境特别好环境特别好环境特别好环境特别好环境特别好环境...",
          author: "加菲猫",
          avatar: "https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg",
          date: "2019-12-25",
          image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png"
        },
        {
          id: 2,
          title: "服务很专业",
          rating: "4.8",
          content: "服务很专业，发型设计很满意，下次还会再来...",
          author: "小可爱",
          avatar: "https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg",
          date: "2019-12-24",
          image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png"
        },
        {
          id: 3,
          title: "效果超出预期",
          rating: "5.0",
          content: "效果超出预期，非常满意，推荐给大家...",
          author: "美少女",
          avatar: "https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg",
          date: "2019-12-23",
          image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png"
        },
        {
          id: 4,
          title: "技术很棒",
          rating: "4.9",
          content: "技术很棒，服务态度也很好，值得推荐...",
          author: "时尚达人",
          avatar: "https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg",
          date: "2019-12-22",
          image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png"
        },
        {
          id: 5,
          title: "性价比很高",
          rating: "4.7",
          content: "性价比很高，服务周到，环境舒适...",
          author: "追求者",
          avatar: "https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg",
          date: "2019-12-21",
          image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png"
        },
        {
          id: 6,
          title: "非常满意",
          rating: "5.0",
          content: "非常满意，下次还会再来，强烈推荐...",
          author: "忠实客户",
          avatar: "https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg",
          date: "2019-12-20",
          image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png"
        },
        {
          id: 7,
          title: "环境优雅",
          rating: "4.8",
          content: "环境优雅，服务专业，体验很好...",
          author: "品味生活",
          avatar: "https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg",
          date: "2019-12-19",
          image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png"
        },
        {
          id: 8,
          title: "发型设计很赞",
          rating: "4.9",
          content: "发型设计很赞，技术精湛，推荐...",
          author: "时尚先锋",
          avatar: "https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg",
          date: "2019-12-18",
          image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png"
        },
        {
          id: 9,
          title: "服务态度很好",
          rating: "5.0",
          content: "服务态度很好，技术也很专业，满意...",
          author: "满意客户",
          avatar: "https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg",
          date: "2019-12-17",
          image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png"
        },
        {
          id: 10,
          title: "体验很棒",
          rating: "4.8",
          content: "体验很棒，下次还会再来，推荐给大家...",
          author: "体验者",
          avatar: "https://c.animaapp.com/mi5d4lp0csJxnR/img/ellipse-34.svg",
          date: "2019-12-16",
          image: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-187.png"
        }
      ],
      questions: [
        "只烫不染的短发多少钱？头发比较干，不知道能不能做？",
        "刘海发际线太高怎么办？"
      ],
      // 滚动虚化效果相关
      reviewScrollLeft: 0,
      lastReviewScrollLeft: 0,
      showReviewLeftFade: false,
      showReviewRightFade: false,
      reviewFadeOut: false,
      reviewFadeTimeout: null,
      reviewFadeStartTimeout: null,
      reviewScrollContainerWidth: 0,
      reviewScrollContentWidth: 0
    };
  },
  computed: {
    currentInfoData() {
      if (this.activeNavTab === 0) {
        return this.serviceInfoData;
      } else if (this.activeNavTab === 1) {
        return this.serviceFeaturesData;
      } else {
        return this.environmentData;
      }
    },
    totalReviewCount() {
      return this.reviews.length || this.reviewTags.reduce((sum, tag) => sum + parseInt(tag.count || 0), 0);
    },
    displayedReviews() {
      return this.reviews.slice(0, 10);
    }
  },
  methods: {
    switchNav(index) {
      this.activeNavTab = index;
    },
    selectTag(index) {
      this.reviewTags.forEach((tag, i) => {
        tag.active = i === index;
      });
    },
    handleViewMoreReviews() {
      common_vendor.index.navigateTo({
        url: "/pages/designer/reviews"
      });
    },
    handleViewMoreQA() {
      common_vendor.index.__f__("log", "at components/designer/detail/DesignerPortfolioSection.vue:388", "View more QA");
    },
    handleQuestionClick(question) {
      common_vendor.index.__f__("log", "at components/designer/detail/DesignerPortfolioSection.vue:391", "Question clicked:", question);
    },
    handleJoin() {
      common_vendor.index.__f__("log", "at components/designer/detail/DesignerPortfolioSection.vue:394", "Join clicked");
    },
    handleReviewScroll(e) {
      const scrollLeft = e.detail.scrollLeft || 0;
      const maxScroll = this.getReviewMaxScroll();
      const direction = scrollLeft - this.lastReviewScrollLeft;
      if (this.reviewFadeTimeout) {
        clearTimeout(this.reviewFadeTimeout);
      }
      if (this.reviewFadeStartTimeout) {
        clearTimeout(this.reviewFadeStartTimeout);
      }
      this.reviewFadeOut = false;
      if (direction > 0) {
        this.showReviewRightFade = scrollLeft < maxScroll - 2;
        this.showReviewLeftFade = false;
      } else if (direction < 0) {
        this.showReviewLeftFade = scrollLeft > 2;
        this.showReviewRightFade = false;
      }
      this.lastReviewScrollLeft = scrollLeft;
      this.reviewScrollLeft = scrollLeft;
      this.updateReviewFadeEdges(scrollLeft);
      this.reviewFadeStartTimeout = setTimeout(() => {
        this.reviewFadeOut = true;
        this.reviewFadeTimeout = setTimeout(() => {
          this.showReviewLeftFade = false;
          this.showReviewRightFade = false;
          this.reviewFadeOut = false;
        }, 1500);
      }, 300);
    },
    getReviewMaxScroll() {
      return Math.max(this.reviewScrollContentWidth - this.reviewScrollContainerWidth, 0);
    },
    updateReviewFadeEdges(scrollLeft = 0) {
      const maxScroll = this.getReviewMaxScroll();
      if (maxScroll <= 0) {
        this.showReviewLeftFade = false;
        this.showReviewRightFade = false;
        return;
      }
      if (scrollLeft <= 2) {
        this.showReviewLeftFade = false;
      }
      if (scrollLeft >= maxScroll - 2) {
        this.showReviewRightFade = false;
      }
    },
    measureReviewScroll() {
      this.$nextTick(() => {
        const query = common_vendor.index.createSelectorQuery().in(this);
        query.select(".reviews-scroll").boundingClientRect((rect) => {
          this.reviewScrollContainerWidth = rect ? rect.width : 0;
        });
        query.select(".reviews-list").boundingClientRect((rect) => {
          this.reviewScrollContentWidth = rect ? rect.width : 0;
        });
        query.exec(() => {
          this.updateReviewFadeEdges(this.reviewScrollLeft);
        });
      });
    }
  },
  watch: {
    displayedReviews() {
      this.measureReviewScroll();
    }
  },
  mounted() {
    this.measureReviewScroll();
  },
  beforeDestroy() {
    if (this.reviewFadeTimeout) {
      clearTimeout(this.reviewFadeTimeout);
    }
    if (this.reviewFadeStartTimeout) {
      clearTimeout(this.reviewFadeStartTimeout);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.navTabs, (nav, index, i0) => {
      return {
        a: common_vendor.t(nav),
        b: index,
        c: $data.activeNavTab === index ? 1 : "",
        d: common_vendor.o(($event) => $options.switchNav(index), index)
      };
    }),
    b: $data.activeNavTab === 0
  }, $data.activeNavTab === 0 ? {
    c: common_vendor.f($options.currentInfoData, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.label),
        b: common_vendor.t(item.value),
        c: item.extra
      }, item.extra ? {
        d: common_vendor.t(item.extra)
      } : {}, {
        e: index < $options.currentInfoData.length - 1
      }, index < $options.currentInfoData.length - 1 ? {} : {}, {
        f: index
      });
    })
  } : {}, {
    d: $data.activeNavTab === 1
  }, $data.activeNavTab === 1 ? {
    e: common_vendor.f($data.serviceFeaturesData, (section, sectionIndex, i0) => {
      return common_vendor.e({
        a: section.title
      }, section.title ? {
        b: common_vendor.t(section.title)
      } : {}, {
        c: common_vendor.f(section.tags, (tag, tagIndex, i1) => {
          return {
            a: common_vendor.t(tag),
            b: tagIndex
          };
        }),
        d: sectionIndex
      });
    })
  } : {}, {
    f: $data.activeNavTab === 2
  }, $data.activeNavTab === 2 ? {
    g: common_vendor.f($data.environmentData, (section, sectionIndex, i0) => {
      return common_vendor.e({
        a: section.title
      }, section.title ? {
        b: common_vendor.t(section.title)
      } : {}, {
        c: common_vendor.f(section.tags, (tag, tagIndex, i1) => {
          return {
            a: common_vendor.t(tag),
            b: tagIndex
          };
        }),
        d: sectionIndex
      });
    })
  } : {}, {
    h: common_vendor.t($options.totalReviewCount),
    i: common_vendor.o((...args) => $options.handleViewMoreReviews && $options.handleViewMoreReviews(...args)),
    j: common_vendor.f($data.reviewTags, (tag, index, i0) => {
      return {
        a: common_vendor.t(tag.text),
        b: common_vendor.t(tag.count),
        c: index,
        d: tag.active ? 1 : "",
        e: common_vendor.o(($event) => $options.selectTag(index), index)
      };
    }),
    k: common_vendor.f($options.displayedReviews, (review, index, i0) => {
      return {
        a: review.image,
        b: common_vendor.t(review.title),
        c: common_vendor.t(review.rating),
        d: common_vendor.f(5, (i, k1, i1) => {
          return {
            a: i
          };
        }),
        e: common_vendor.t(review.content),
        f: `url(${review.avatar})`,
        g: common_vendor.t(review.author),
        h: common_vendor.t(review.date),
        i: index
      };
    }),
    l: common_vendor.o((...args) => $options.handleReviewScroll && $options.handleReviewScroll(...args)),
    m: $data.showReviewLeftFade ? 1 : "",
    n: $data.reviewFadeOut && $data.showReviewLeftFade ? 1 : "",
    o: $data.showReviewRightFade ? 1 : "",
    p: $data.reviewFadeOut && $data.showReviewRightFade ? 1 : "",
    q: common_vendor.o((...args) => $options.handleViewMoreQA && $options.handleViewMoreQA(...args)),
    r: common_vendor.f($data.questions, (question, index, i0) => {
      return {
        a: common_vendor.t(question),
        b: index,
        c: common_vendor.o(($event) => $options.handleQuestionClick(question), index)
      };
    }),
    s: common_vendor.o((...args) => $options.handleJoin && $options.handleJoin(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-097e074b"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/designer/detail/DesignerPortfolioSection.js.map
