# API 中间层完善性分析报告

## 一、项目概述

WAW 美业小程序是一个完整的美业服务平台，包含以下核心功能模块：
- 用户认证与登录
- 设计师/品牌馆浏览与预约
- 服务选购与订单管理
- 优惠券系统
- 私人领地（我的设计师/品牌馆）
- 作品集展示
- 消息中心
- 用户资产管理（余额、美豆、推广佣金、平台奖励）
- 设计师/门店入驻

---

## 二、现有API模块分析

### 已有模块（11个）

| 模块 | 文件 | 接口数量 | 状态 |
|------|------|---------|------|
| auth | auth.js | 10 | ✅ 完善 |
| brand | brand.js | 14 | ✅ 完善 |
| common | common.js | 19 | ✅ 完善 |
| coupon | coupon.js | 8 | ✅ 完善 |
| designer | designer.js | 14 | ✅ 完善 |
| message | message.js | 11 | ✅ 完善 |
| order | order.js | 11 | ✅ 完善 |
| service | service.js | 8 | ✅ 完善 |
| settlement | settlement.js | 23 | ✅ 完善 |
| territory | territory.js | 13 | ✅ 完善 |
| user | user.js | 25 | ⚠️ 需补充 |

---

## 三、缺失接口分析

### 1. 用户资产模块（user.js 需补充）

根据页面功能分析，以下接口缺失：

#### 1.1 余额相关
| 接口 | 说明 | 对应页面 |
|------|------|---------|
| `GET /user/balance` | 获取余额详情 | pages/mine/balance |
| `GET /user/balance/records` | 余额变动记录 | pages/mine/balance |
| `POST /user/balance/recharge` | 余额充值 | pages/mine/balance |

#### 1.2 美豆相关
| 接口 | 说明 | 对应页面 |
|------|------|---------|
| `GET /user/beans` | 获取美豆余额 | pages/mine/beans |
| `GET /user/beans/records` | 美豆变动记录 | pages/mine/beans |
| `POST /user/beans/exchange` | 美豆兑换 | pages/mine/beans |
| `POST /user/beans/sign` | 签到获取美豆 | - |

#### 1.3 推广佣金相关
| 接口 | 说明 | 对应页面 |
|------|------|---------|
| `GET /user/promotion` | 获取推广佣金概览 | pages/mine/promotion |
| `GET /user/promotion/records` | 推广佣金记录 | pages/mine/promotion |
| `GET /user/promotion/invite-code` | 获取邀请码 | - |
| `GET /user/promotion/invites` | 邀请记录列表 | - |
| `POST /user/promotion/withdraw` | 佣金提现 | - |

#### 1.4 平台奖励相关
| 接口 | 说明 | 对应页面 |
|------|------|---------|
| `GET /user/platform-reward` | 获取平台奖励概览 | pages/mine/platform-reward |
| `GET /user/platform-reward/records` | 平台奖励记录 | pages/mine/platform-reward |

#### 1.5 二维码名片相关
| 接口 | 说明 | 对应页面 |
|------|------|---------|
| `GET /user/qr-code` | 获取用户二维码名片 | pages/mine/qr-code-card |
| `POST /user/qr-code/generate` | 生成二维码 | pages/mine/qr-code-card |

---

### 2. 作品集模块（需新建 portfolio.js）

根据 `pages/portfolio/index.vue` 和 `pages/portfolio/detail.vue` 分析：

| 接口 | 说明 | 对应页面 |
|------|------|---------|
| `GET /portfolio/list` | 作品列表（支持分类、筛选） | pages/portfolio/index |
| `GET /portfolio/detail/:id` | 作品详情 | pages/portfolio/detail |
| `GET /portfolio/categories` | 作品分类（女士/男士/儿童） | pages/portfolio/index |
| `GET /portfolio/filters` | 筛选条件（脸型/发量/发质） | pages/portfolio/index |
| `POST /portfolio/:id/like` | 点赞作品 | pages/portfolio/detail |
| `DELETE /portfolio/:id/like` | 取消点赞 | pages/portfolio/detail |
| `POST /portfolio/:id/favorite` | 收藏作品 | pages/portfolio/detail |
| `DELETE /portfolio/:id/favorite` | 取消收藏 | pages/portfolio/detail |
| `GET /portfolio/:id/comments` | 获取作品评论 | pages/portfolio/detail |
| `POST /portfolio/:id/comments` | 发表评论 | pages/portfolio/detail |
| `POST /portfolio/:id/share` | 分享作品 | pages/portfolio/detail |

---

### 3. 私信/聊天模块（需新建 chat.js）

根据作品详情页的"私信TA"功能分析：

| 接口 | 说明 |
|------|------|
| `GET /chat/conversations` | 获取会话列表 |
| `GET /chat/conversation/:id/messages` | 获取聊天记录 |
| `POST /chat/conversation/:id/messages` | 发送消息 |
| `PUT /chat/conversation/:id/read` | 标记会话已读 |
| `DELETE /chat/conversation/:id` | 删除会话 |

---

### 4. 签到模块（可整合到 user.js 或新建 checkin.js）

参考市面主流美业小程序功能：

| 接口 | 说明 |
|------|------|
| `GET /checkin/status` | 获取今日签到状态 |
| `POST /checkin` | 执行签到 |
| `GET /checkin/calendar` | 获取签到日历 |
| `GET /checkin/rewards` | 签到奖励规则 |

---

## 四、参考市面美业小程序补充建议

### 4.1 推荐补充的功能接口

#### 预约提醒
| 接口 | 说明 |
|------|------|
| `GET /appointment/reminders` | 获取预约提醒列表 |
| `PUT /appointment/:id/reminder` | 设置预约提醒 |

#### 评价回复
| 接口 | 说明 |
|------|------|
| `POST /review/:id/reply` | 回复评价（商家端） |
| `GET /review/:id/replies` | 获取评价回复 |

#### 分享有礼
| 接口 | 说明 |
|------|------|
| `GET /share/reward-rules` | 分享奖励规则 |
| `POST /share/claim` | 领取分享奖励 |

#### 会员积分
| 接口 | 说明 |
|------|------|
| `GET /points/balance` | 获取积分余额 |
| `GET /points/records` | 积分记录 |
| `GET /points/exchange-list` | 积分商城商品 |
| `POST /points/exchange` | 积分兑换 |

#### 拼团/秒杀活动（可选）
| 接口 | 说明 |
|------|------|
| `GET /activity/group-buy/list` | 拼团活动列表 |
| `GET /activity/flash-sale/list` | 秒杀活动列表 |
| `POST /activity/group-buy/join` | 参与拼团 |

---

## 五、优先级建议

### 高优先级（核心功能缺失）
1. **portfolio.js** - 作品集模块（页面已完成，无API调用）
2. **user.js 补充** - 余额、美豆、推广佣金、平台奖励接口

### 中优先级（完善用户体验）
3. 签到功能
4. 私信/聊天功能
5. 分享奖励

### 低优先级（可选增值功能）
6. 拼团/秒杀活动
7. 积分商城

---

## 六、总结

### 当前状态
- **已有模块**: 11个，约 156 个接口
- **缺失模块**: 2个（portfolio、chat）
- **需补充接口**: 约 30+ 个

### 完善后预期
- **模块总数**: 13个
- **接口总数**: 约 190+ 个

### 下一步行动
1. 补充 user.js 中的资产相关接口
2. 新建 portfolio.js 作品集模块
3. 新建 chat.js 私信模块（可选）
4. 更新对应的 Mock 数据
5. 更新 API 文档

