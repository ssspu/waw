"use strict";
const common_vendor = require("../common/vendor.js");
const utils_config = require("../utils/config.js");
const mock_config_designerData = require("../mock/config/designerData.js");
function getDesignerList(category) {
  {
    common_vendor.index.__f__("log", "at api/designerApi.js:21", `[API] 获取设计师列表 - 分类: ${category}, 使用Mock: ${utils_config.USE_MOCK}`);
  }
  {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = mock_config_designerData.designerMockData[category] || [];
        {
          common_vendor.index.__f__("log", "at api/designerApi.js:31", `[Mock] 返回数据:`, data);
        }
        resolve({
          code: 200,
          message: "success",
          data
        });
      }, 300);
    });
  }
}
function getDesignerDetail(id) {
  {
    common_vendor.index.__f__("log", "at api/designerApi.js:67", `[API] 获取设计师详情 - ID: ${id}, 使用Mock: ${utils_config.USE_MOCK}`);
  }
  {
    return new Promise((resolve) => {
      setTimeout(() => {
        var _a;
        let designer = null;
        for (let category in mock_config_designerData.designerMockData) {
          designer = mock_config_designerData.designerMockData[category].find((d) => d.id === id);
          if (designer)
            break;
        }
        if (!designer) {
          designer = {
            id,
            name: "未知设计师",
            image: "https://c.animaapp.com/mi4v97d2OSuz2g/img/rectangle-153-1.png",
            avatar: "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-153.png",
            rating: "4.5",
            reviews: "0"
          };
        }
        if (designer && !designer.avatar) {
          designer.avatar = designer.image || "https://c.animaapp.com/mi5d4lp0csJxnR/img/rectangle-153.png";
        }
        const detailData = {
          ...designer,
          verifyIcon: designer.verifyIcon || "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-2110.svg",
          certIcon: designer.certIcon || "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-2.svg",
          certText: designer.certText || "职业认证",
          certDot: designer.certDot || "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame.svg",
          skills: designer.skills || "专业造型设计",
          introduction: designer.introduction || "资深设计师，拥有丰富的设计经验...",
          bookings: designer.bookings || designer.reviews || "0",
          followers: designer.followers || "1000",
          experience: designer.experience || (designer.title ? (_a = designer.title.split("｜")[1]) == null ? void 0 : _a.replace("从业", "").replace("年", "") : "10"),
          shopName: designer.shopName || "NICE美发造型沙龙",
          shopAddress: designer.shopAddress || "武侯区天府三家B7栋...",
          shopDistance: designer.shopDistance || designer.distance || "距您2.7km",
          businessStatus: designer.businessStatus || "营业中",
          restDay: designer.restDay || "周二休息",
          businessHours: designer.businessHours || "10:00-21:00",
          serviceBadges: designer.serviceBadges || [
            { icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg", label: "安心服务" },
            { icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg", label: "7天无忧" },
            { icon: "https://c.animaapp.com/mi5d4lp0csJxnR/img/frame-1891.svg", label: "免费设计" }
          ],
          promotions: designer.promotions || [
            { text: "满100-5" },
            { text: "满500-50" }
          ],
          serviceCount: designer.serviceCount || "281",
          workCount: designer.workCount || "234"
        };
        resolve({
          code: 200,
          message: "success",
          data: detailData
        });
      }, 200);
    });
  }
}
exports.getDesignerDetail = getDesignerDetail;
exports.getDesignerList = getDesignerList;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/designerApi.js.map
