"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    activeTab: {
      type: String,
      default: "designer"
    }
  },
  data() {
    return {
      overviewItems: [
        { label: "职位", value: "店长" },
        { label: "职称", value: "国家高级美发师" },
        { label: "擅长", value: "男士油头造型、细软烫发" },
        { label: "工作时间", value: "周二 - 周日", extra: "10:00-21:00" },
        { label: "从业时间", value: "12年" },
        { label: "预约时间", value: "提前3小时" },
        { label: "联系电话", value: "+86 1891808747", hasPhone: true }
      ],
      serviceFeatures: [
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
      ],
      otherFeatures: [
        "不可携带宠物",
        "服务区不可吸烟"
      ],
      environmentFacilities: [
        "储物柜",
        "免费Wifi",
        "充电宝",
        "可看电视",
        "VIP专区",
        "沙发座"
      ],
      generalFacilities: [
        "特定吸烟区",
        "电梯",
        "有停车位",
        "空调",
        "先进/刷卡支付"
      ]
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.activeTab === "designer"
  }, $props.activeTab === "designer" ? {
    b: common_vendor.f($data.overviewItems, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.label),
        b: common_vendor.t(item.value),
        c: item.extra
      }, item.extra ? {
        d: common_vendor.t(item.extra)
      } : {}, {
        e: item.hasPhone
      }, item.hasPhone ? {} : {}, {
        f: index
      });
    })
  } : {}, {
    c: $props.activeTab === "service"
  }, $props.activeTab === "service" ? {
    d: common_vendor.f($data.serviceFeatures, (feature, index, i0) => {
      return {
        a: common_vendor.t(feature),
        b: index
      };
    }),
    e: common_vendor.f($data.otherFeatures, (feature, index, i0) => {
      return {
        a: common_vendor.t(feature),
        b: index
      };
    })
  } : {}, {
    f: $props.activeTab === "environment"
  }, $props.activeTab === "environment" ? {
    g: common_vendor.f($data.environmentFacilities, (facility, index, i0) => {
      return {
        a: common_vendor.t(facility),
        b: index
      };
    }),
    h: common_vendor.f($data.generalFacilities, (facility, index, i0) => {
      return {
        a: common_vendor.t(facility),
        b: index
      };
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0e1e0928"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/designer/info/DesignerInfoServicesSection.js.map
