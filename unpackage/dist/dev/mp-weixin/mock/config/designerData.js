"use strict";
const designerMockData = {
  // 首席创意
  "首席创意": [
    {
      id: 1,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      avatar: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-153.png",
      name: "张创意",
      role: "首席创意",
      level: "高级",
      title: "创意总监｜从业15年",
      rating: "4.9",
      reviews: "456",
      distance: "5.2km",
      category: "首席创意",
      // 详情页需要的额外信息
      verifyIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-2110.svg",
      certIcon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-2.svg",
      certText: "职业认证",
      certDot: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame.svg",
      skills: "染发设计、短发造型、女士晚装",
      introduction: "从业15年，毕业沙宣美发学院，擅长各种造型设计，拥有丰富的设计经验...",
      // 统计数据
      bookings: "1244",
      // 预约数
      followers: "2000",
      // 粉丝数
      experience: "15",
      // 从业年数
      // 店铺信息
      shopName: "NICE美发造型沙龙",
      shopAddress: "武侯区天府三家B7栋...",
      shopDistance: "距您5.2km",
      // 营业信息
      businessStatus: "营业中",
      restDay: "周二休息",
      businessHours: "10:00-21:00",
      // 服务标签
      serviceBadges: [
        { icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg", label: "安心服务" },
        { icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg", label: "7天无忧" },
        { icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg", label: "免费设计" },
        { icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg", label: "小吃水果" },
        { icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg", label: "预约服务" }
      ],
      // 优惠信息
      promotions: [
        { text: "满100-5" },
        { text: "满500-50" }
      ],
      // 右侧统计
      serviceCount: "281",
      workCount: "234"
    },
    {
      id: 2,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "李艺术",
      role: "首席创意",
      level: "高级",
      title: "艺术总监｜从业12年",
      rating: "4.8",
      reviews: "389",
      distance: "6.8km",
      category: "首席创意"
    },
    {
      id: 3,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "王设计",
      role: "首席创意",
      level: "高级",
      title: "设计总监｜从业18年",
      rating: "5.0",
      reviews: "523",
      distance: "4.5km",
      category: "首席创意"
    },
    {
      id: 4,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "刘创新",
      role: "首席创意",
      level: "高级",
      title: "创意总监｜从业10年",
      rating: "4.7",
      reviews: "312",
      distance: "7.3km",
      category: "首席创意"
    },
    {
      id: 5,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "陈思维",
      role: "首席创意",
      level: "高级",
      title: "艺术总监｜从业14年",
      rating: "4.9",
      reviews: "445",
      distance: "5.9km",
      category: "首席创意"
    },
    {
      id: 6,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "赵灵感",
      role: "首席创意",
      level: "高级",
      title: "设计总监｜从业16年",
      rating: "4.8",
      reviews: "398",
      distance: "6.1km",
      category: "首席创意"
    },
    {
      id: 7,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "孙美学",
      role: "首席创意",
      level: "高级",
      title: "创意总监｜从业11年",
      rating: "4.6",
      reviews: "267",
      distance: "8.2km",
      category: "首席创意"
    },
    {
      id: 8,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "周风格",
      role: "首席创意",
      level: "高级",
      title: "艺术总监｜从业13年",
      rating: "4.9",
      reviews: "421",
      distance: "5.5km",
      category: "首席创意"
    }
  ],
  // 总监店长
  "总监店长": [
    {
      id: 11,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "李天天",
      role: "美发师",
      level: "高级",
      title: "总监｜从业十年",
      rating: "4.8",
      reviews: "234",
      distance: "6.7km",
      category: "总监店长"
    },
    {
      id: 12,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "王店长",
      role: "店长",
      level: "高级",
      title: "店长｜从业八年",
      rating: "4.7",
      reviews: "198",
      distance: "7.2km",
      category: "总监店长"
    },
    {
      id: 13,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "张总监",
      role: "总监",
      level: "高级",
      title: "技术总监｜从业十二年",
      rating: "4.9",
      reviews: "312",
      distance: "5.8km",
      category: "总监店长"
    },
    {
      id: 14,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "刘经理",
      role: "经理",
      level: "高级",
      title: "运营经理｜从业九年",
      rating: "4.6",
      reviews: "167",
      distance: "8.5km",
      category: "总监店长"
    },
    {
      id: 15,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "陈主管",
      role: "主管",
      level: "高级",
      title: "技术主管｜从业七年",
      rating: "4.8",
      reviews: "245",
      distance: "6.3km",
      category: "总监店长"
    },
    {
      id: 16,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "赵总",
      role: "总监",
      level: "高级",
      title: "创意总监｜从业十四年",
      rating: "5.0",
      reviews: "389",
      distance: "4.9km",
      category: "总监店长"
    },
    {
      id: 17,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "孙店",
      role: "店长",
      level: "高级",
      title: "连锁店长｜从业十一年",
      rating: "4.7",
      reviews: "223",
      distance: "7.6km",
      category: "总监店长"
    },
    {
      id: 18,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "周管",
      role: "主管",
      level: "高级",
      title: "运营主管｜从业六年",
      rating: "4.8",
      reviews: "189",
      distance: "6.9km",
      category: "总监店长"
    }
  ],
  // 网红名师
  "网红名师": [
    {
      id: 21,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "网红A",
      role: "网红",
      level: "明星",
      title: "网红造型师｜粉丝50万",
      rating: "4.9",
      reviews: "1289",
      distance: "3.2km",
      category: "网红名师"
    },
    {
      id: 22,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "名师B",
      role: "名师",
      level: "明星",
      title: "美发名师｜粉丝30万",
      rating: "4.8",
      reviews: "987",
      distance: "4.5km",
      category: "网红名师"
    },
    {
      id: 23,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "网红C",
      role: "网红",
      level: "明星",
      title: "时尚达人｜粉丝80万",
      rating: "5.0",
      reviews: "1567",
      distance: "2.8km",
      category: "网红名师"
    },
    {
      id: 24,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "名师D",
      role: "名师",
      level: "明星",
      title: "造型名师｜粉丝45万",
      rating: "4.9",
      reviews: "1123",
      distance: "3.9km",
      category: "网红名师"
    },
    {
      id: 25,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "网红E",
      role: "网红",
      level: "明星",
      title: "美发红人｜粉丝65万",
      rating: "4.8",
      reviews: "1345",
      distance: "3.5km",
      category: "网红名师"
    },
    {
      id: 26,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "名师F",
      role: "名师",
      level: "明星",
      title: "设计名师｜粉丝55万",
      rating: "4.9",
      reviews: "1456",
      distance: "2.5km",
      category: "网红名师"
    },
    {
      id: 27,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "网红G",
      role: "网红",
      level: "明星",
      title: "时尚造型师｜粉丝70万",
      rating: "4.7",
      reviews: "876",
      distance: "4.2km",
      category: "网红名师"
    },
    {
      id: 28,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "名师H",
      role: "名师",
      level: "明星",
      title: "美发大师｜粉丝60万",
      rating: "5.0",
      reviews: "1678",
      distance: "2.3km",
      category: "网红名师"
    }
  ],
  // 国际导师
  "国际导师": [
    {
      id: 31,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "导师I",
      role: "国际导师",
      level: "大师",
      title: "国际造型导师｜从业20年",
      rating: "5.0",
      reviews: "2345",
      distance: "1.5km",
      category: "国际导师"
    },
    {
      id: 32,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "导师J",
      role: "国际导师",
      level: "大师",
      title: "沙宣认证导师｜从业25年",
      rating: "5.0",
      reviews: "2876",
      distance: "1.2km",
      category: "国际导师"
    },
    {
      id: 33,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "导师K",
      role: "国际导师",
      level: "大师",
      title: "欧洲发型导师｜从业22年",
      rating: "4.9",
      reviews: "1987",
      distance: "1.8km",
      category: "国际导师"
    },
    {
      id: 34,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "导师L",
      role: "国际导师",
      level: "大师",
      title: "日韩造型导师｜从业18年",
      rating: "4.9",
      reviews: "2134",
      distance: "1.6km",
      category: "国际导师"
    },
    {
      id: 35,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "导师M",
      role: "国际导师",
      level: "大师",
      title: "国际大赛评委｜从业28年",
      rating: "5.0",
      reviews: "3456",
      distance: "0.9km",
      category: "国际导师"
    },
    {
      id: 36,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "导师N",
      role: "国际导师",
      level: "大师",
      title: "美发教育导师｜从业24年",
      rating: "4.9",
      reviews: "2765",
      distance: "1.3km",
      category: "国际导师"
    },
    {
      id: 37,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "导师O",
      role: "国际导师",
      level: "大师",
      title: "时尚设计导师｜从业26年",
      rating: "5.0",
      reviews: "3123",
      distance: "1.1km",
      category: "国际导师"
    },
    {
      id: 38,
      image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
      name: "导师P",
      role: "国际导师",
      level: "大师",
      title: "国际认证导师｜从业30年",
      rating: "5.0",
      reviews: "3890",
      distance: "0.8km",
      category: "国际导师"
    }
  ]
};
exports.designerMockData = designerMockData;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/mock/config/designerData.js.map
