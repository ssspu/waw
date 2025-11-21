"use strict";
const common_vendor = require("../../common/vendor.js");
const ProfileSection = () => "../../components/index/index/ProfileSection.js";
const GallerySection = () => "../../components/index/index/GallerySection.js";
const _sfc_main = {
  components: {
    ProfileSection,
    GallerySection
  },
  data() {
    return {};
  },
  onLoad() {
  }
};
if (!Array) {
  const _component_profile_section = common_vendor.resolveComponent("profile-section");
  const _component_gallery_section = common_vendor.resolveComponent("gallery-section");
  (_component_profile_section + _component_gallery_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
