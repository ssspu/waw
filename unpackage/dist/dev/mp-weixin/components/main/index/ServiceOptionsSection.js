"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      serviceData: {
        image: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/rectangle-169.png",
        title: "烫发",
        description: "发型提案+染发+造型",
        price: "799",
        stylist: {
          avatar: "https://c.animaapp.com/mi4wi1dxPPrFZt/img/ellipse-34.svg",
          name: "李天天",
          title: "美发师",
          rating: "4.8",
          reviews: "768"
        },
        distance: "6.7km"
      }
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.serviceData.image,
    b: $data.serviceData.title,
    c: common_vendor.t($data.serviceData.title),
    d: common_vendor.t($data.serviceData.description),
    e: common_vendor.t($data.serviceData.price),
    f: $data.serviceData.stylist.avatar,
    g: $data.serviceData.stylist.name,
    h: common_vendor.t($data.serviceData.stylist.name),
    i: common_vendor.t($data.serviceData.stylist.title),
    j: common_vendor.t($data.serviceData.stylist.rating),
    k: common_vendor.t($data.serviceData.stylist.reviews),
    l: common_vendor.t($data.serviceData.distance)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4766775e"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/main/index/ServiceOptionsSection.js.map
