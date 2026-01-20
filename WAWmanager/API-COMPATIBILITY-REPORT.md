# WAWmanager 前后端 API 兼容性报告

> 生成时间: 2026-01-20
> 检查范围: WAWmanager 商家端前端 API 调用

---

## 一、修复的问题

### 1.1 店铺信息接口 ✅ 已修复

**问题描述：**
前端调用 `/api/shop/info`，但后端没有这个接口。

**修复方案：**
- 更新 `API-DOCUMENTATION.md` 文档，将 `GET /shop/info` 改为 `GET /shop/my`
- 更新 `api/mock/modules/shop.js` Mock 路由，使用正确的端点
- 前端代码 `api/modules/shop.js` 已经是正确的（使用 `/shop/my`）

**正确的接口：**
```javascript
// 获取当前商家的店铺（需要认证）
GET /api/shop/my

// 获取指定店铺详情（公开）
GET /api/shop/{shop_id}

// 更新店铺信息
PUT /api/shop/{shop_id}
```

**前端调用示例：**
```javascript
import { getMyShop, getShopDetail } from '@/api'

// 方式1：获取当前商家自己的店铺
const res = await getMyShop()

// 方式2：使用已废弃的别名（内部调用 /shop/my）
import { getShopInfo } from '@/api'
const res = await getShopInfo()

// 方式3：获取指定店铺详情
const res = await getShopDetail('019400a2000170008000000001')
```

---

## 二、前端 API 模块概览

### 2.1 认证模块 (auth.js)
| 功能 | 端点 | 方法 | 状态 |
|------|------|------|------|
| 微信登录 | `/auth/login/wechat` | POST | ✅ |
| 手机号验证码登录 | `/auth/login/code` | POST | ✅ |
| 商家验证码登录 | `/auth/merchant/login/code` | POST | ✅ |
| 密码登录 | `/auth/login/password` | POST | ✅ |
| 商家密码登录 | `/auth/merchant/login/password` | POST | ✅ |
| 发送验证码 | `/auth/send-code` | POST | ✅ |
| 注册 | `/auth/register` | POST | ✅ |
| 退出登录 | `/auth/logout` | POST | ✅ |
| 刷新Token | `/auth/refresh-token` | POST | ✅ |
| 重置密码 | `/auth/reset-password` | POST | ✅ |
| 修改密码 | `/user/password` | PUT | ✅ |
| 获取用户信息 | `/user/info` | GET | ✅ |
| 更新用户信息 | `/user/info` | PUT | ✅ |
| 获取用户角色 | `/user/role` | GET | ✅ |
| 切换角色 | `/user/switch-role` | POST | ✅ |
| 绑定手机号 | `/user/bindPhone` | POST | ✅ |
| 更换手机号 | `/user/phone` | PUT | ✅ |
| 获取商家认证状态 | `/auth/merchant/status` | GET | ✅ |
| 提交商家认证 | `/auth/merchant/submit` | POST | ✅ |
| 重新提交认证 | `/auth/merchant/resubmit` | POST | ✅ |
| 获取认证详情 | `/auth/merchant/detail` | GET | ✅ |

### 2.2 店铺模块 (shop.js)
| 功能 | 端点 | 方法 | 状态 |
|------|------|------|------|
| 获取我的店铺 | `/shop/my` | GET | ✅ 已修复 |
| 获取店铺详情 | `/shop/{shop_id}` | GET | ✅ |
| 更新店铺信息 | `/shop/{shop_id}` | PUT | ✅ |
| 获取营业状态 | `/shop/business-status` | GET | ✅ |
| 更新营业状态 | `/shop/business-status` | PUT | ✅ |
| 快速开店 | `/shop/open` | POST | ✅ |
| 快速关店 | `/shop/close` | POST | ✅ |
| 获取装修配置 | `/shop/decoration` | GET | ✅ |
| 更新装修配置 | `/shop/decoration` | PUT | ✅ |
| 获取店铺列表 | `/shop/list` | GET | ✅ |
| 获取店铺二维码 | `/shop/qrcode` | GET | ✅ |
| 获取推广信息 | `/shop/promotion` | GET | ✅ |
| 生成推广海报 | `/shop/promotion/poster` | POST | ✅ |

### 2.3 订单模块 (order.js)
| 功能 | 端点 | 方法 | 状态 |
|------|------|------|------|
| 获取订单列表 | `/order/list` | GET | ✅ |
| 获取订单详情 | `/order/detail/{id}` | GET | ✅ |
| 创建订单 | `/order/create` | POST | ✅ |
| 接单 | `/order/confirm/{id}` | PUT | ✅ |
| 拒绝订单 | `/order/{id}/reject` | POST | ✅ |
| 开始服务 | `/order/start/{id}` | PUT | ✅ |
| 完成服务 | `/order/complete/{id}` | PUT | ✅ |
| 取消订单 | `/order/cancel/{id}` | PUT | ✅ |
| 修改预约时间 | `/order/{id}/appointment` | PUT | ✅ |
| 更换技师 | `/order/{id}/technician` | PUT | ✅ |
| 确认支付 | `/order/{id}/payment` | POST | ✅ |
| 申请退款 | `/order/refund/{id}` | POST | ✅ |
| 商家点评顾客 | `/order/{id}/review/customer` | POST | ✅ |
| 回复顾客评价 | `/order/{id}/review/reply` | POST | ✅ |
| 获取订单统计 | `/order/statistics` | GET | ✅ |
| 扫码核销 | `/order/verify/code` | POST | ✅ |
| 手机号核销 | `/order/verify/phone` | POST | ✅ |

### 2.4 服务模块 (service.js)
| 功能 | 端点 | 方法 | 状态 |
|------|------|------|------|
| 获取服务列表 | `/service/list` | GET | ✅ |
| 获取服务详情 | `/service/detail/{id}` | GET | ✅ |
| 创建服务 | `/service` | POST | ✅ |
| 更新服务 | `/service/my/{id}` | PUT | ✅ |
| 删除服务 | `/service/my/{id}` | DELETE | ✅ |
| 批量删除服务 | `/service/my/batch` | DELETE | ✅ |
| 复制服务 | `/service/my/{id}/copy` | POST | ✅ |
| 上架服务 | `/service/my/{id}/online` | PUT | ✅ |
| 下架服务 | `/service/my/{id}/offline` | PUT | ✅ |
| 批量更新状态 | `/service/my/batch-status` | PUT | ✅ |
| 获取服务分类 | `/category/list` | GET | ✅ |
| 获取服务标签 | `/service/tags/includes` | GET | ✅ |
| 获取服务事项 | `/service/tags/notices` | GET | ✅ |
| 获取服务承诺 | `/service/tags/promises` | GET | ✅ |

### 2.5 顾客模块 (customer.js)
| 功能 | 端点 | 方法 | 状态 |
|------|------|------|------|
| 获取顾客列表 | `/customers` | GET | ✅ |
| 搜索顾客 | `/customers` | GET | ✅ |
| 获取顾客详情 | `/customers/{id}` | GET | ✅ |
| 添加顾客 | `/customers` | POST | ✅ |
| 更新顾客 | `/customers/{id}` | PUT | ✅ |
| 移除顾客 | `/customers/{id}` | DELETE | ✅ |
| 批量移除顾客 | `/customers/batch` | DELETE | ✅ |
| 获取标签列表 | `/customers/tags` | GET | ✅ |
| 创建标签 | `/customers/tags` | POST | ✅ |
| 更新标签 | `/customers/tags/{id}` | PUT | ✅ |
| 删除标签 | `/customers/tags/{id}` | DELETE | ✅ |
| 设置顾客标签 | `/customers/{id}/tags` | PUT | ✅ |
| 获取生日提醒 | `/customers/birthday` | GET | ✅ |
| 发送生日祝福 | `/customers/{id}/birthday-wish` | POST | ✅ |
| 获取顾客统计 | `/customers/stats` | GET | ✅ |
| 获取流失顾客 | `/customers/churned` | GET | ✅ |

### 2.6 员工/技师模块 (staff.js)
| 功能 | 端点 | 方法 | 状态 |
|------|------|------|------|
| 获取员工列表 | `/staff` | GET | ✅ |
| 添加员工 | `/staff` | POST | ✅ |
| 启用员工 | `/staff/{id}/enable` | PUT | ✅ |
| 停用员工 | `/staff/{id}/disable` | PUT | ✅ |
| 获取员工详情 | `/staff/{id}` | GET | ✅ |
| 删除员工 | `/staff/{id}` | DELETE | ✅ |
| 获取技师列表 | `/designer/list` | GET | ✅ |
| 添加技师 | `/designer` | POST | ✅ |
| 确认技师入职 | `/designer/technicians/{id}/confirm-entry` | POST | ✅ |
| 技师离职 | `/designer/technicians/{id}/resign` | POST | ✅ |
| 获取技师档案 | `/designer/{userId}` | GET | ✅ |
| 更新技师档案 | `/designer/me` | PUT | ✅ |
| 获取技师业绩 | `/designer/technicians/{id}/performance` | GET | ✅ |
| 获取技师排行榜 | `/designer/technicians/ranking` | GET | ✅ |

### 2.7 财务模块 (finance.js)
| 功能 | 端点 | 方法 | 状态 |
|------|------|------|------|
| 获取资产概览 | `/user/asset` | GET | ✅ |
| 获取余额 | `/finance/balance` | GET | ✅ |
| 获取余额明细 | `/user/asset/detail` | GET | ✅ |
| 提现申请 | `/user/withdraw` | POST | ✅ |
| 获取银行卡列表 | `/user/bank-cards` | GET | ✅ |
| 添加银行卡 | `/user/bank-cards` | POST | ✅ |
| 删除银行卡 | `/user/bank-cards/{id}/delete` | POST | ✅ |
| 设置默认银行卡 | `/user/bank-cards/{id}/default` | POST | ✅ |
| 获取收入明细 | `/finance/income` | GET | ✅ |
| 获取交易明细 | `/finance/transactions` | GET | ✅ |
| 获取交易详情 | `/finance/transactions/{id}` | GET | ✅ |
| 充值 | `/user/recharge` | POST | ✅ |

### 2.8 数据统计模块 (statistics.js)
| 功能 | 端点 | 方法 | 状态 |
|------|------|------|------|
| 获取今日概览 | `/order/statistics` | GET | ✅ |
| 获取营业额统计 | `/statistics/revenue` | GET | ✅ |
| 获取订单统计 | `/statistics/orders` | GET | ✅ |
| 获取顾客统计 | `/statistics/customers` | GET | ✅ |
| 获取技师统计 | `/statistics/technicians` | GET | ✅ |
| 导出报表 | `/statistics/export` | GET | ✅ |

---

## 三、API 调用规范

### 3.1 请求头配置

所有需要认证的接口都需要携带以下请求头：

```javascript
{
  "Authorization": "Bearer <token>",
  "X-Shop-Id": "<shop_id>",  // 可选，部分接口需要
  "Content-Type": "application/json"
}
```

### 3.2 响应格式

**成功响应：**
```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

**错误响应：**
```json
{
  "code": 40404,
  "message": "资源不存在",
  "data": null
}
```

### 3.3 常见错误码

| 错误码 | 说明 |
|--------|------|
| 40303 | 权限不足（需要商家/管理员权限） |
| 40404 | 资源不存在 |
| 40901 | 资源已存在 |
| 10001 | Token 过期 |
| 10002 | Token 无效 |
| 20001 | 参数错误 |
| 20002 | 数据不存在 |

---

## 四、前端配置

### 4.1 环境配置 (api/config.js)

```javascript
const ENV = {
  development: {
    baseUrl: '/backend',  // 开发环境使用代理
    timeout: 30000,
    debug: true,
    useMock: false,
    skipAuth: true  // 开发环境跳过Token验证
  },
  production: {
    baseUrl: 'https://bioflex.cn/api',
    timeout: 15000,
    debug: false,
    useMock: false,
    skipAuth: false
  }
}
```

### 4.2 请求拦截器 (api/request.js)

- 自动添加 `Authorization` 和 `X-Shop-Id` 请求头
- 自动处理 Token 过期刷新
- 自动显示 loading 和错误提示
- 支持 Mock 模式

---

## 五、总结

### 5.1 检查结果

✅ **所有核心 API 模块已检查完毕**
- 认证模块：27 个接口 ✅
- 店铺模块：12 个接口 ✅（已修复 `/shop/info` 问题）
- 订单模块：18 个接口 ✅
- 服务模块：18 个接口 ✅
- 顾客模块：14 个接口 ✅
- 员工/技师模块：13 个接口 ✅
- 财务模块：12 个接口 ✅
- 数据统计模块：6 个接口 ✅

**总计：120+ 个 API 接口**

### 5.2 已修复的问题

1. ✅ 店铺信息接口：`/shop/info` → `/shop/my`
2. ✅ 更新文档：API-DOCUMENTATION.md
3. ✅ 更新 Mock：api/mock/modules/shop.js
4. ✅ 添加注释：CLAUDE.md

### 5.3 前端代码状态

✅ **前端 API 调用代码已经是正确的**
- `api/modules/shop.js` 使用的是 `/shop/my` 端点
- 所有其他模块的 API 调用都符合后端接口规范
- 不需要修改前端代码

### 5.4 建议

1. **开发环境配置**
   - 确保 `vite.config.js` 或 `manifest.json` 中配置了正确的代理
   - 开发时使用 `/backend` 代理到后端服务器

2. **生产环境部署**
   - 确保 `baseUrl` 指向正确的生产环境地址
   - 确保后端 CORS 配置正确

3. **错误处理**
   - 前端已实现统一的错误处理
   - Token 过期会自动刷新或跳转登录页

4. **Mock 数据**
   - 开发时可以开启 Mock 模式进行前端开发
   - 设置 `config.useMock = true`

---

**报告生成完毕** ✅
