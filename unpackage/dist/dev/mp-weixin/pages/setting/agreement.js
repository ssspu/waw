"use strict";
const common_vendor = require("../../common/vendor.js");
const SettingDetailHeader = () => "../../components/setting/SettingDetailHeader.js";
const _sfc_main = {
  components: {
    SettingDetailHeader
  },
  data() {
    return {
      activeTab: 0,
      agreementTabs: ["用户协议", "隐私政策", "服务条款"],
      agreementContents: [
        // 用户协议
        `众美用户协议

最后更新日期：2024年1月1日

1. 协议的确认和接纳
您确认您已详细阅读本协议的全部内容，理解其含义。如您对本协议的任何条款有异议，请立即停止使用本服务。如果您继续使用本服务，即表示您已接受本协议的全部条款。

2. 服务描述
众美为您提供设计服务平台，用户可以在平台上发布、浏览、预约设计师服务和购买产品。

3. 用户责任
用户对所有通过其账户进行的活动负责。用户承诺不会：
- 发布违法或不当内容
- 骚扰或威胁其他用户
- 进行任何欺诈或虚假交易
- 侵犯他人的知识产权或隐私

4. 知识产权
平台上所有内容的知识产权归众美或相关内容提供者所有。用户不得未经许可复制、修改或传播平台内容。

5. 免责声明
众美对因用户使用本服务而产生的任何损失不承担责任。

6. 争议解决
任何纠纷应首先通过友好协商解决。`,
        // 隐私政策
        `众美隐私政策

最后更新日期：2024年1月1日

1. 信息收集
我们收集以下类型的信息：
- 注册信息：姓名、电话、邮箱等
- 使用信息：浏览历史、交易记录等
- 设备信息：设备类型、操作系统等
- 位置信息：用户允许的情况下

2. 信息使用
我们使用收集的信息用于：
- 提供和改进服务
- 进行身份验证
- 发送重要通知
- 进行数据分析

3. 信息保护
我们采取行业标准的安全措施保护您的信息。我们不会向第三方出售或租赁您的个人信息。

4. Cookie使用
我们使用Cookie来改进用户体验。您可以在浏览器设置中禁用Cookie。

5. 第三方服务
平台可能包含第三方服务的链接。我们不对第三方隐私政策负责。

6. 隐私权利
您有权访问、修改或删除您的个人信息。`,
        // 服务条款
        `众美服务条款

最后更新日期：2024年1月1日

1. 服务范围
众美提供设计师与用户的匹配、预约和交易平台。平台本身不直接提供设计或产品服务。

2. 用户等级
根据用户活跃度和信用评分，用户可能获得不同的等级和权限。

3. 支付和费用
- 平台收取服务费用
- 所有交易使用安全的支付系统
- 取消政策根据具体服务定义

4. 评价和反馈
用户可以对设计师和服务进行评价。评价必须真实客观。

5. 禁止行为
禁止进行刷单、虚假交易、骚扰等不当行为。

6. 账户终止
众美保留在违反条款时终止用户账户的权利。

7. 法律适用
本条款受中华人民共和国法律管辖。`
      ]
    };
  },
  methods: {
    handleAgree() {
      common_vendor.index.showToast({
        title: "感谢您的同意",
        icon: "success"
      });
    },
    handleDisagree() {
      common_vendor.index.navigateBack();
    }
  }
};
if (!Array) {
  const _component_SettingDetailHeader = common_vendor.resolveComponent("SettingDetailHeader");
  _component_SettingDetailHeader();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "协议与条款"
    }),
    b: common_vendor.f($data.agreementTabs, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab),
        b: index,
        c: $data.activeTab === index ? 1 : "",
        d: common_vendor.o(($event) => $data.activeTab = index, index)
      };
    }),
    c: common_vendor.t($data.agreementTabs[$data.activeTab]),
    d: common_vendor.t($data.agreementContents[$data.activeTab]),
    e: common_vendor.o((...args) => $options.handleDisagree && $options.handleDisagree(...args)),
    f: common_vendor.o((...args) => $options.handleAgree && $options.handleAgree(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dffc420d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/setting/agreement.js.map
