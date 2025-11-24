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
        { label: "新秀榜", active: true, value: "rookie", new: true },
        { label: "专业榜", active: false, value: "pro", new: false },
        { label: "服务榜", active: false, value: "service", new: true }
      ],
      activeRankingTab: "rookie",
      rankingSwiperIndex: 0,
      rankingSlides: {
        rookie: [
          [
            { id: 1, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "李天天", level: "高级", role: "店长｜从业12年", rating: "4.8" },
            { id: 2, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "张雨辰", level: "高级", role: "发型总监｜从业10年", rating: "4.9" },
            { id: 3, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "王珊珊", level: "特级", role: "资深设计｜从业8年", rating: "4.7" },
            { id: 4, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "林一", level: "高级", role: "创意导师｜从业9年", rating: "4.8" },
            { id: 5, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "陈曦", level: "高级", role: "潮流造型｜从业7年", rating: "4.6" },
            { id: 6, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "赵一凡", level: "高级", role: "店长｜从业11年", rating: "4.8" }
          ],
          [
            { id: 7, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "韩清", level: "高级", role: "高级染发｜从业10年", rating: "4.9" },
            { id: 8, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "宋璇", level: "特级", role: "明星造型｜从业9年", rating: "4.8" },
            { id: 9, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "杨沐", level: "高级", role: "青年导师｜从业6年", rating: "4.6" },
            { id: 10, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "顾明", level: "高级", role: "首席剪发｜从业13年", rating: "4.9" },
            { id: 11, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "陈牧", level: "高级", role: "烫染专家｜从业12年", rating: "4.8" },
            { id: 12, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "赵然", level: "高级", role: "店长｜从业10年", rating: "4.7" }
          ],
          [
            { id: 13, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "李想", level: "高级", role: "潮流导师｜从业8年", rating: "4.8" },
            { id: 14, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "许澄", level: "高级", role: "染发顾问｜从业7年", rating: "4.7" },
            { id: 15, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "吴迪", level: "高级", role: "短发专家｜从业9年", rating: "4.8" },
            { id: 16, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "秦月", level: "高级", role: "造型顾问｜从业8年", rating: "4.6" },
            { id: 17, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "周行", level: "高级", role: "日韩造型｜从业7年", rating: "4.8" },
            { id: 18, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "顾瞳", level: "高级", role: "氛围感设计｜从业6年", rating: "4.7" }
          ],
          [
            { id: 19, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "任欢", level: "高级", role: "质感剪裁｜从业8年", rating: "4.9" },
            { id: 20, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "罗雪", level: "高级", role: "形象改造｜从业9年", rating: "4.8" },
            { id: 21, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "郑忆", level: "高级", role: "校园风造型｜从业5年", rating: "4.6" },
            { id: 22, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "夏禾", level: "高级", role: "都市时尚｜从业7年", rating: "4.7" },
            { id: 23, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "游浅", level: "高级", role: "设计助教｜从业6年", rating: "4.8" },
            { id: 24, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "霍笙", level: "高级", role: "创意造型｜从业9年", rating: "4.9" }
          ]
        ],
        pro: [
          [
            { id: 25, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "陈星", level: "总监", role: "专业导师｜从业15年", rating: "4.9" },
            { id: 26, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "李苒", level: "总监", role: "发色专家｜从业12年", rating: "4.9" },
            { id: 27, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "孟冬", level: "总监", role: "发型顾问｜从业14年", rating: "4.8" },
            { id: 28, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "孙晓", level: "总监", role: "高级设计｜从业16年", rating: "4.9" },
            { id: 29, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "周成", level: "总监", role: "时尚造型｜从业13年", rating: "4.8" },
            { id: 30, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "郭雪", level: "总监", role: "沙宣导师｜从业15年", rating: "4.9" }
          ],
          [
            { id: 31, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "方野", level: "总监", role: "造型顾问｜从业14年", rating: "4.8" },
            { id: 32, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "许静", level: "总监", role: "高级染发｜从业13年", rating: "4.8" },
            { id: 33, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "蓝川", level: "总监", role: "光影剪裁｜从业12年", rating: "4.7" },
            { id: 34, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "任熙", level: "总监", role: "国际导师｜从业18年", rating: "5.0" },
            { id: 35, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "洪宇", level: "总监", role: "首席造型｜从业17年", rating: "4.9" },
            { id: 36, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "叶辰", level: "总监", role: "高级顾问｜从业16年", rating: "4.8" }
          ],
          [
            { id: 37, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "许乔", level: "总监", role: "秀场造型｜从业15年", rating: "4.9" },
            { id: 38, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "秦澈", level: "总监", role: "高级烫染｜从业14年", rating: "4.8" },
            { id: 39, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "洛竹", level: "总监", role: "质感剪裁｜从业13年", rating: "4.8" },
            { id: 40, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "沈宴", level: "总监", role: "风格导师｜从业12年", rating: "4.7" },
            { id: 41, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "阮潇", level: "总监", role: "潮流研究｜从业11年", rating: "4.8" },
            { id: 42, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "盛恒", level: "总监", role: "高奢造型｜从业15年", rating: "4.9" }
          ],
          [
            { id: 43, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "柏庭", level: "总监", role: "私人订制｜从业14年", rating: "4.8" },
            { id: 44, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "蒲岚", level: "总监", role: "明星御用｜从业16年", rating: "4.9" },
            { id: 45, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "卓一", level: "总监", role: "剧组造型｜从业13年", rating: "4.8" },
            { id: 46, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "霍泽", level: "总监", role: "国际赛导师｜从业17年", rating: "5.0" },
            { id: 47, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "米澜", level: "总监", role: "学院讲师｜从业12年", rating: "4.8" },
            { id: 48, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "柯乔", level: "总监", role: "质感染发｜从业14年", rating: "4.9" }
          ]
        ],
        service: [
          [
            { id: 49, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "潘黎", level: "高级", role: "五星好评｜从业11年", rating: "4.9" },
            { id: 50, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "晋航", level: "高级", role: "回头客王｜从业9年", rating: "4.9" },
            { id: 51, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "白芷", level: "高级", role: "超高满意｜从业8年", rating: "4.8" },
            { id: 52, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "楚翎", level: "高级", role: "贴心服务｜从业10年", rating: "4.8" },
            { id: 53, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "程西", level: "高级", role: "口碑导师｜从业9年", rating: "4.7" },
            { id: 54, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "乐瑶", level: "高级", role: "极速响应｜从业7年", rating: "4.8" }
          ],
          [
            { id: 55, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "米朵", level: "高级", role: "礼貌服务｜从业8年", rating: "4.9" },
            { id: 56, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "沈沁", level: "高级", role: "好评之星｜从业9年", rating: "4.8" },
            { id: 57, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "元启", level: "高级", role: "服务达人｜从业8年", rating: "4.8" },
            { id: 58, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "汪言", level: "高级", role: "舒适体验｜从业9年", rating: "4.9" },
            { id: 59, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "唐润", level: "高级", role: "预约稳定｜从业10年", rating: "4.8" },
            { id: 60, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "柯依", level: "高级", role: "首选服务｜从业9年", rating: "4.9" }
          ],
          [
            { id: 61, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "傅岚", level: "高级", role: "高端礼遇｜从业10年", rating: "4.8" },
            { id: 62, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "沈栩", level: "高级", role: "安抚沟通｜从业8年", rating: "4.7" },
            { id: 63, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "陆澜", level: "高级", role: "极速排期｜从业7年", rating: "4.8" },
            { id: 64, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "季枝", level: "高级", role: "细致讲解｜从业9年", rating: "4.9" },
            { id: 65, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "闻笙", level: "高级", role: "客户维护｜从业8年", rating: "4.8" },
            { id: 66, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "艾川", level: "高级", role: "安心保障｜从业9年", rating: "4.8" }
          ],
          [
            { id: 67, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "秦韶", level: "高级", role: "回访专员｜从业8年", rating: "4.9" },
            { id: 68, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "俞娴", level: "高级", role: "贴心话术｜从业7年", rating: "4.7" },
            { id: 69, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "凌笛", level: "高级", role: "加班响应｜从业6年", rating: "4.8" },
            { id: 70, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "顾晴", level: "高级", role: "VIP服务｜从业9年", rating: "4.9" },
            { id: 71, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "俞牧", level: "高级", role: "满意回访｜从业8年", rating: "4.8" },
            { id: 72, image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-153-5.png", name: "柏真", level: "高级", role: "细心记录｜从业7年", rating: "4.8" }
          ]
        ]
      },
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
  computed: {
    currentRankingSlides() {
      const slides = this.rankingSlides[this.activeRankingTab];
      return slides || [];
    }
  },
  methods: {
    handleCategoryClick(category) {
      common_vendor.index.__f__("log", "at components/main/index/DesignSection.vue:431", "Category clicked:", category);
    },
    handleBookingClick(option) {
      common_vendor.index.__f__("log", "at components/main/index/DesignSection.vue:434", "Booking clicked:", option);
    },
    switchRankingTab(index) {
      const tab = this.rankingTabs[index];
      this.rankingTabs.forEach((t, i) => {
        t.active = i === index;
      });
      this.activeRankingTab = tab.value;
      this.rankingSwiperIndex = 0;
      if (tab.new) {
        tab.new = false;
      }
    },
    handleRankingSwiperChange(e) {
      this.rankingSwiperIndex = e.detail.current;
    },
    handleStylistClick(stylist) {
      common_vendor.index.navigateTo({
        url: `/pages/designer/detail?id=${stylist.id || 1}&name=${encodeURIComponent(stylist.name || "")}`
      });
    },
    handleFilter() {
      common_vendor.index.__f__("log", "at components/main/index/DesignSection.vue:458", "Filter clicked");
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
        b: tab.new
      }, tab.new ? {} : {}, {
        c: index,
        d: tab.active ? 1 : "",
        e: common_vendor.o(($event) => $options.switchRankingTab(index), index)
      });
    }),
    d: common_vendor.f($options.currentRankingSlides, (slide, slideIndex, i0) => {
      return {
        a: common_vendor.f(slide, (stylist, index, i1) => {
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
        b: slideIndex
      };
    }),
    e: $data.rankingSwiperIndex,
    f: common_vendor.o((...args) => $options.handleRankingSwiperChange && $options.handleRankingSwiperChange(...args)),
    g: common_vendor.f($options.currentRankingSlides.length, (dot, index, i0) => {
      return {
        a: index,
        b: index === $data.rankingSwiperIndex ? 1 : ""
      };
    }),
    h: common_vendor.o((...args) => $options.handleFilter && $options.handleFilter(...args)),
    i: common_vendor.f($data.nearbyStylistsData, (stylist, index, i0) => {
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
