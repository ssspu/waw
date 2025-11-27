"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
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
      activeDesignerTab: 0,
      designerSwiperIndex: 0,
      designersByTab: {
        0: [
          // 首席创意
          {
            id: 13,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "李天天",
            role: "美发师",
            level: "高级",
            title: "创意总监｜从业十年",
            rating: "4.8",
            reviews: "234",
            distance: "6.7km"
          },
          {
            id: 14,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "张雨辰",
            role: "美发师",
            level: "高级",
            title: "创意导师｜从业八年",
            rating: "4.8",
            reviews: "234",
            distance: "6.7km"
          },
          {
            id: 15,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "王珊珊",
            role: "美发师",
            level: "特级",
            title: "创意造型｜从业八年",
            rating: "4.9",
            reviews: "356",
            distance: "5.2km"
          },
          {
            id: 16,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "林一",
            role: "美发师",
            level: "高级",
            title: "创意导师｜从业九年",
            rating: "4.8",
            reviews: "289",
            distance: "7.1km"
          },
          {
            id: 29,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "陈星",
            role: "美发师",
            level: "高级",
            title: "创意设计｜从业七年",
            rating: "4.7",
            reviews: "198",
            distance: "4.8km"
          },
          {
            id: 30,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "李苒",
            role: "美发师",
            level: "特级",
            title: "创意总监｜从业十一年",
            rating: "4.9",
            reviews: "445",
            distance: "6.3km"
          },
          {
            id: 31,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "孟冬",
            role: "美发师",
            level: "高级",
            title: "创意造型师｜从业六年",
            rating: "4.8",
            reviews: "312",
            distance: "5.7km"
          },
          {
            id: 32,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "孙晓",
            role: "美发师",
            level: "高级",
            title: "创意导师｜从业十年",
            rating: "4.8",
            reviews: "378",
            distance: "7.5km"
          }
        ],
        1: [
          // 总监店长
          {
            id: 17,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "陈曦",
            role: "美发师",
            level: "高级",
            title: "店长｜从业七年",
            rating: "4.7",
            reviews: "198",
            distance: "4.5km"
          },
          {
            id: 18,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "赵一凡",
            role: "美发师",
            level: "高级",
            title: "店长｜从业十一年",
            rating: "4.8",
            reviews: "412",
            distance: "8.3km"
          },
          {
            id: 19,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "韩清",
            role: "美发师",
            level: "高级",
            title: "总监｜从业十年",
            rating: "4.9",
            reviews: "287",
            distance: "5.8km"
          },
          {
            id: 20,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "宋璇",
            role: "美发师",
            level: "特级",
            title: "店长｜从业九年",
            rating: "4.8",
            reviews: "356",
            distance: "6.2km"
          },
          {
            id: 33,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "周成",
            role: "美发师",
            level: "高级",
            title: "总监｜从业十三年",
            rating: "4.9",
            reviews: "523",
            distance: "5.1km"
          },
          {
            id: 34,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "郭雪",
            role: "美发师",
            level: "特级",
            title: "店长｜从业十五年",
            rating: "4.9",
            reviews: "678",
            distance: "7.2km"
          },
          {
            id: 35,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "方野",
            role: "美发师",
            level: "高级",
            title: "总监｜从业八年",
            rating: "4.8",
            reviews: "389",
            distance: "6.8km"
          },
          {
            id: 36,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "许静",
            role: "美发师",
            level: "高级",
            title: "店长｜从业十二年",
            rating: "4.8",
            reviews: "456",
            distance: "4.9km"
          }
        ],
        2: [
          // 网红名师
          {
            id: 21,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "杨沐",
            role: "美发师",
            level: "高级",
            title: "网红造型师｜从业六年",
            rating: "4.9",
            reviews: "512",
            distance: "3.5km"
          },
          {
            id: 22,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "顾明",
            role: "美发师",
            level: "高级",
            title: "名师｜从业十三年",
            rating: "4.8",
            reviews: "445",
            distance: "7.8km"
          },
          {
            id: 23,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "陈牧",
            role: "美发师",
            level: "特级",
            title: "网红导师｜从业十二年",
            rating: "4.9",
            reviews: "678",
            distance: "4.2km"
          },
          {
            id: 24,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "赵然",
            role: "美发师",
            level: "高级",
            title: "名师｜从业十年",
            rating: "4.7",
            reviews: "389",
            distance: "6.5km"
          },
          {
            id: 37,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "蓝川",
            role: "美发师",
            level: "高级",
            title: "网红造型师｜从业五年",
            rating: "4.8",
            reviews: "567",
            distance: "3.8km"
          },
          {
            id: 38,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "任熙",
            role: "美发师",
            level: "特级",
            title: "名师｜从业十四年",
            rating: "4.9",
            reviews: "789",
            distance: "5.6km"
          },
          {
            id: 39,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "洪宇",
            role: "美发师",
            level: "高级",
            title: "网红导师｜从业七年",
            rating: "4.8",
            reviews: "623",
            distance: "4.7km"
          },
          {
            id: 40,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "叶辰",
            role: "美发师",
            level: "高级",
            title: "名师｜从业十一年",
            rating: "4.8",
            reviews: "534",
            distance: "6.1km"
          }
        ],
        3: [
          // 国际导师
          {
            id: 25,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "李想",
            role: "美发师",
            level: "特级",
            title: "国际导师｜从业八年",
            rating: "5.0",
            reviews: "234",
            distance: "9.2km"
          },
          {
            id: 26,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "许澄",
            role: "美发师",
            level: "高级",
            title: "国际造型师｜从业七年",
            rating: "4.8",
            reviews: "298",
            distance: "8.7km"
          },
          {
            id: 27,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "吴迪",
            role: "美发师",
            level: "高级",
            title: "国际导师｜从业九年",
            rating: "4.9",
            reviews: "456",
            distance: "7.3km"
          },
          {
            id: 28,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "秦月",
            role: "美发师",
            level: "特级",
            title: "国际造型导师｜从业八年",
            rating: "4.8",
            reviews: "367",
            distance: "10.1km"
          },
          {
            id: 41,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "许乔",
            role: "美发师",
            level: "特级",
            title: "国际导师｜从业十五年",
            rating: "5.0",
            reviews: "892",
            distance: "8.5km"
          },
          {
            id: 42,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "秦澈",
            role: "美发师",
            level: "高级",
            title: "国际造型师｜从业十年",
            rating: "4.9",
            reviews: "645",
            distance: "9.8km"
          },
          {
            id: 43,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "洛竹",
            role: "美发师",
            level: "高级",
            title: "国际导师｜从业十一年",
            rating: "4.8",
            reviews: "523",
            distance: "7.9km"
          },
          {
            id: 44,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            name: "沈宴",
            role: "美发师",
            level: "特级",
            title: "国际造型导师｜从业十二年",
            rating: "4.9",
            reviews: "712",
            distance: "10.5km"
          }
        ]
      },
      brandTabs: ["专业店", "品牌店", "工作室", "综合店"],
      activeBrandTab: "专业店",
      allBrands: {
        "专业店": [
          {
            id: 1,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "成都意念美发造型沙龙",
            rating: "4.8",
            reviews: "768",
            address: "成都青羊区草堂路12号...",
            distance: "7.5km",
            category: "专业店"
          },
          {
            id: 2,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "专业美发造型店",
            rating: "4.7",
            reviews: "520",
            address: "成都武侯区天府大道...",
            distance: "5.2km",
            category: "专业店"
          },
          {
            id: 3,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "专业发型设计工作室",
            rating: "4.9",
            reviews: "365",
            address: "成都锦江区春熙路...",
            distance: "3.8km",
            category: "专业店"
          },
          {
            id: 4,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "专业造型美发店",
            rating: "4.6",
            reviews: "288",
            address: "成都成华区建设路...",
            distance: "6.5km",
            category: "专业店"
          },
          {
            id: 5,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "专业剪发造型店",
            rating: "4.8",
            reviews: "445",
            address: "成都高新区天府三街...",
            distance: "4.3km",
            category: "专业店"
          },
          {
            id: 6,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "专业美发沙龙",
            rating: "4.7",
            reviews: "312",
            address: "成都金牛区沙湾路...",
            distance: "8.1km",
            category: "专业店"
          },
          {
            id: 7,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "专业造型设计店",
            rating: "4.9",
            reviews: "567",
            address: "成都青羊区宽窄巷子...",
            distance: "2.5km",
            category: "专业店"
          },
          {
            id: 8,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "专业美发工作室",
            rating: "4.6",
            reviews: "234",
            address: "成都武侯区红牌楼...",
            distance: "9.2km",
            category: "专业店"
          }
        ],
        "品牌店": [
          {
            id: 9,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "品牌美发连锁店",
            rating: "4.8",
            reviews: "689",
            address: "成都锦江区太古里...",
            distance: "3.2km",
            category: "品牌店"
          },
          {
            id: 10,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "知名品牌美发沙龙",
            rating: "4.9",
            reviews: "756",
            address: "成都武侯区科华路...",
            distance: "4.8km",
            category: "品牌店"
          },
          {
            id: 11,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "品牌连锁造型店",
            rating: "4.7",
            reviews: "543",
            address: "成都高新区金融城...",
            distance: "5.5km",
            category: "品牌店"
          },
          {
            id: 12,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "国际品牌美发店",
            rating: "4.8",
            reviews: "612",
            address: "成都青羊区骡马市...",
            distance: "7.3km",
            category: "品牌店"
          },
          {
            id: 13,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "品牌造型设计店",
            rating: "4.6",
            reviews: "389",
            address: "成都成华区SM广场...",
            distance: "6.8km",
            category: "品牌店"
          },
          {
            id: 14,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "知名品牌美发工作室",
            rating: "4.9",
            reviews: "478",
            address: "成都武侯区大悦城...",
            distance: "5.9km",
            category: "品牌店"
          },
          {
            id: 15,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "品牌连锁美发店",
            rating: "4.7",
            reviews: "425",
            address: "成都锦江区IFS...",
            distance: "4.1km",
            category: "品牌店"
          },
          {
            id: 16,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "品牌美发造型沙龙",
            rating: "4.8",
            reviews: "521",
            address: "成都高新区环球中心...",
            distance: "8.7km",
            category: "品牌店"
          }
        ],
        "工作室": [
          {
            id: 17,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "私人美发工作室",
            rating: "4.9",
            reviews: "456",
            address: "成都青羊区浣花溪...",
            distance: "2.8km",
            category: "工作室"
          },
          {
            id: 18,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "创意造型工作室",
            rating: "4.7",
            reviews: "334",
            address: "成都武侯区桐梓林...",
            distance: "4.5km",
            category: "工作室"
          },
          {
            id: 19,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "设计美发工作室",
            rating: "4.8",
            reviews: "389",
            address: "成都锦江区九眼桥...",
            distance: "3.6km",
            category: "工作室"
          },
          {
            id: 20,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "私人定制工作室",
            rating: "4.9",
            reviews: "267",
            address: "成都高新区银泰城...",
            distance: "5.3km",
            category: "工作室"
          },
          {
            id: 21,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "艺术造型工作室",
            rating: "4.6",
            reviews: "298",
            address: "成都成华区东郊记忆...",
            distance: "7.2km",
            category: "工作室"
          },
          {
            id: 22,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "高端美发工作室",
            rating: "4.8",
            reviews: "412",
            address: "成都武侯区棕榈泉...",
            distance: "6.4km",
            category: "工作室"
          },
          {
            id: 23,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "精品造型工作室",
            rating: "4.7",
            reviews: "356",
            address: "成都青羊区金沙...",
            distance: "8.3km",
            category: "工作室"
          },
          {
            id: 24,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "专业造型工作室",
            rating: "4.9",
            reviews: "523",
            address: "成都锦江区水碾河...",
            distance: "4.7km",
            category: "工作室"
          }
        ],
        "综合店": [
          {
            id: 25,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "综合美发造型店",
            rating: "4.8",
            reviews: "678",
            address: "成都武侯区红牌楼广场...",
            distance: "5.6km",
            category: "综合店"
          },
          {
            id: 26,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "综合美容美发店",
            rating: "4.7",
            reviews: "542",
            address: "成都锦江区万达广场...",
            distance: "3.9km",
            category: "综合店"
          },
          {
            id: 27,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "综合造型美发店",
            rating: "4.9",
            reviews: "634",
            address: "成都高新区凯德广场...",
            distance: "6.2km",
            category: "综合店"
          },
          {
            id: 28,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "综合美发沙龙",
            rating: "4.6",
            reviews: "487",
            address: "成都青羊区宽窄巷子...",
            distance: "2.7km",
            category: "综合店"
          },
          {
            id: 29,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "综合美容美发沙龙",
            rating: "4.8",
            reviews: "556",
            address: "成都武侯区来福士...",
            distance: "4.4km",
            category: "综合店"
          },
          {
            id: 30,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "综合造型设计店",
            rating: "4.7",
            reviews: "423",
            address: "成都成华区建设路...",
            distance: "7.1km",
            category: "综合店"
          },
          {
            id: 31,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "综合美发造型中心",
            rating: "4.9",
            reviews: "589",
            address: "成都锦江区春熙路...",
            distance: "3.3km",
            category: "综合店"
          },
          {
            id: 32,
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-2.png",
            name: "综合美容美发中心",
            rating: "4.8",
            reviews: "512",
            address: "成都高新区天府大道...",
            distance: "5.8km",
            category: "综合店"
          }
        ]
      },
      serviceTabs: ["全部", "洗吹", "剪发", "烫发", "染发", "护发", "头皮", "接发"],
      activeServiceTab: "全部",
      allServices: [
        {
          image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
          title: "烫发",
          category: "烫发",
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
          title: "剪发",
          category: "剪发",
          description: "专业剪发+造型设计",
          price: "199",
          designerName: "张美发",
          designerRole: "造型师",
          rating: "4.9",
          reviews: "520",
          distance: "3.2km",
          avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg"
        },
        {
          image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
          title: "染发",
          category: "染发",
          description: "专业染发+护理",
          price: "599",
          designerName: "王染发",
          designerRole: "染发师",
          rating: "4.7",
          reviews: "365",
          distance: "5.8km",
          avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg"
        },
        {
          image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
          title: "洗吹",
          category: "洗吹",
          description: "洗发+吹风造型",
          price: "88",
          designerName: "刘洗发",
          designerRole: "助理",
          rating: "4.6",
          reviews: "288",
          distance: "2.1km",
          avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg"
        },
        {
          image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
          title: "护发",
          category: "护发",
          description: "深层护理+滋养",
          price: "299",
          designerName: "陈护理",
          designerRole: "护理师",
          rating: "4.8",
          reviews: "156",
          distance: "4.5km",
          avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg"
        },
        {
          image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
          title: "头皮",
          category: "头皮",
          description: "头皮护理+清洁",
          price: "399",
          designerName: "周头皮",
          designerRole: "护理师",
          rating: "4.9",
          reviews: "234",
          distance: "6.2km",
          avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg"
        },
        {
          image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
          title: "接发",
          category: "接发",
          description: "专业接发+造型",
          price: "1299",
          designerName: "赵接发",
          designerRole: "接发师",
          rating: "4.7",
          reviews: "89",
          distance: "7.8km",
          avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg"
        },
        {
          image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-169-3.png",
          title: "烫发",
          category: "烫发",
          description: "造型烫发+护理",
          price: "899",
          designerName: "孙烫发",
          designerRole: "烫发师",
          rating: "4.8",
          reviews: "445",
          distance: "3.9km",
          avatar: "https://c.animaapp.com/mi4v97d2OSuz2g/img/ellipse-34.svg"
        }
      ]
    };
  },
  computed: {
    filteredServices() {
      if (this.activeServiceTab === "全部") {
        return this.allServices;
      }
      return this.allServices.filter((service) => service.category === this.activeServiceTab);
    },
    filteredBrands() {
      return this.allBrands[this.activeBrandTab] || [];
    },
    designerSlides() {
      const currentDesigners = this.designersByTab[this.activeDesignerTab] || [];
      const slides = [];
      for (let i = 0; i < currentDesigners.length; i += 2) {
        slides.push(currentDesigners.slice(i, i + 2));
      }
      return slides;
    }
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
        common_vendor.index.__f__("log", "at components/index/index/ProfileSection.vue:1164", "准备跳转到:", url);
        common_vendor.index.navigateTo({
          url,
          success: (res) => {
            common_vendor.index.__f__("log", "at components/index/index/ProfileSection.vue:1168", "跳转成功:", res);
          },
          fail: (err) => {
            common_vendor.index.__f__("error", "at components/index/index/ProfileSection.vue:1171", "跳转失败:", err);
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
        common_vendor.index.__f__("log", "at components/index/index/ProfileSection.vue:1193", "准备跳转到:", url);
        common_vendor.index.navigateTo({
          url,
          success: (res) => {
            common_vendor.index.__f__("log", "at components/index/index/ProfileSection.vue:1197", "跳转成功:", res);
          },
          fail: (err) => {
            common_vendor.index.__f__("error", "at components/index/index/ProfileSection.vue:1200", "跳转失败:", err);
            common_vendor.index.showToast({
              title: "跳转失败: " + (err.errMsg || "未知错误"),
              icon: "none",
              duration: 2e3
            });
          }
        });
      }
    },
    handleServiceTabClick(tab) {
      this.activeServiceTab = tab;
    },
    handleDesignerClick(designer) {
      common_vendor.index.navigateTo({
        url: `/pages/designer/detail?id=${designer.id || 1}&name=${encodeURIComponent(designer.name || "")}`
      });
    },
    handleDesignerSwiperChange(e) {
      this.designerSwiperIndex = e.detail.current;
    },
    handleDesignerTabClick(index) {
      this.activeDesignerTab = index;
      this.designerSwiperIndex = 0;
    },
    handleBrandTabClick(tab) {
      this.activeBrandTab = tab;
    },
    handleBrandClick(brand) {
      common_vendor.index.navigateTo({
        url: `/pages/brand/detail?id=${brand.id || 1}&name=${encodeURIComponent(brand.name || "")}`
      });
    },
    handleBottomAction(action, index) {
      if (action.title === "优惠券") {
        common_vendor.index.navigateTo({
          url: "/pages/coupon/index"
        });
      } else if (action.title === "预约单") {
        common_vendor.index.__f__("log", "at components/index/index/ProfileSection.vue:1245", "跳转到预约单页面");
      } else if (action.title === "会员") {
        common_vendor.index.__f__("log", "at components/index/index/ProfileSection.vue:1248", "跳转到会员页面");
      } else if (action.title === "入驻中") {
        common_vendor.index.__f__("log", "at components/index/index/ProfileSection.vue:1251", "跳转入驻页面");
      }
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
        d: index,
        e: common_vendor.o(($event) => $options.handleBottomAction(action, index), index)
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
        c: $data.activeDesignerTab === index ? 1 : "",
        d: common_vendor.o(($event) => $options.handleDesignerTabClick(index), index)
      };
    }),
    f: common_vendor.f($options.designerSlides, (slide, slideIndex, i0) => {
      return {
        a: common_vendor.f(slide, (designer, index, i1) => {
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
        b: slideIndex
      };
    }),
    g: $data.designerSwiperIndex,
    h: common_vendor.o((...args) => $options.handleDesignerSwiperChange && $options.handleDesignerSwiperChange(...args)),
    i: common_vendor.f($options.designerSlides.length, (dot, index, i0) => {
      return {
        a: index,
        b: index === $data.designerSwiperIndex ? 1 : "",
        c: index === $data.designerSwiperIndex ? "28rpx" : "10rpx"
      };
    }),
    j: common_vendor.o(($event) => $options.handleSectionHeaderClick("brand")),
    k: common_vendor.f($data.brandTabs, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab),
        b: index,
        c: $data.activeBrandTab === tab ? 1 : "",
        d: common_vendor.o(($event) => $options.handleBrandTabClick(tab), index)
      };
    }),
    l: common_vendor.f($options.filteredBrands, (brand, index, i0) => {
      return common_vendor.e({
        a: !brand.hasOverlay
      }, !brand.hasOverlay ? {} : {}, {
        b: brand.image,
        c: common_vendor.t(brand.name),
        d: common_vendor.t(brand.rating),
        e: brand.hasOverlay
      }, brand.hasOverlay ? {} : {}, {
        f: brand.hasOverlay
      }, brand.hasOverlay ? {} : {}, {
        g: brand.hasOverlay
      }, brand.hasOverlay ? {} : {}, {
        h: !brand.hasOverlay
      }, !brand.hasOverlay ? {} : {}, {
        i: common_vendor.t(brand.reviews),
        j: common_vendor.t(brand.address),
        k: brand.distance
      }, brand.distance ? {
        l: common_vendor.t(brand.distance)
      } : {}, {
        m: brand.hasOverlay
      }, brand.hasOverlay ? {} : {}, {
        n: index,
        o: common_vendor.o(($event) => $options.handleBrandClick(brand), index)
      });
    }),
    m: common_assets._imports_0$9,
    n: common_vendor.o(($event) => $options.handleSectionHeaderClick("service")),
    o: common_vendor.f($data.serviceTabs, (tab, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(tab),
        b: $data.activeServiceTab === tab
      }, $data.activeServiceTab === tab ? {} : {}, {
        c: index,
        d: $data.activeServiceTab === tab ? 1 : "",
        e: common_vendor.o(($event) => $options.handleServiceTabClick(tab), index)
      });
    }),
    p: common_vendor.f($options.filteredServices, (service, index, i0) => {
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-304e509b"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/index/index/ProfileSection.js.map
