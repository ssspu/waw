# WAW 美发管理系统 - 商家端 API 接口文档

> **基于商家端 `/WAWmanager/api/modules` 实际代码整理**
>
> 基础地址：`https://bioflex.cn/api`
>
> 更新时间：2026-01-04

---

## 一、通用说明

### 请求配置

```javascript
{
  baseUrl: 'https://bioflex.cn/api',
  timeout: 30000,  // 开发环境
  timeout: 15000,  // 生产环境
}
```

### 请求头

```
Content-Type: application/json
Accept: application/json
Authorization: Bearer {token}
```

### 响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": { ... }
}
```

### 业务状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 成功 |
| 10001 | Token过期 |
| 10002 | Token无效 |
| 20001 | 参数错误 |
| 20002 | 数据不存在 |
| 50204 | 设计师未关联门店 |
| 50301 | 店铺未认证 |
| 50401 | 服务已下架 |
| 50501 | 订单状态错误 |

### Token 存储

```javascript
const TOKEN_KEY = 'waw_manager_token'
const REFRESH_TOKEN_KEY = 'waw_manager_refresh_token'
```

---

## 二、认证模块 `/auth`

### 2.1 登录相关

#### 微信登录
```
POST /auth/wx-login
```
**请求参数：**
```json
{
  "code": "string"  // 微信授权code
}
```

#### 微信手机号快捷登录
```
POST /auth/wx-phone-login
```
**请求参数：**
```json
{
  "code": "string",           // 授权code
  "encryptedData": "string",  // 加密数据
  "iv": "string"              // 初始向量
}
```

#### 手机号验证码登录
```
POST /auth/phone-login
```
**请求参数：**
```json
{
  "phone": "string",  // 手机号
  "code": "string"    // 验证码
}
```

#### 密码登录
```
POST /auth/password-login
```
**请求参数：**
```json
{
  "phone": "string",     // 手机号
  "password": "string"   // 密码
}
```

#### 发送验证码
```
POST /auth/send-sms
```
**请求参数：**
```json
{
  "phone": "string",  // 手机号
  "type": "string"    // 类型: login | register | reset | bindPhone
}
```

#### 验证验证码
```
POST /auth/verify-sms
```
**请求参数：**
```json
{
  "phone": "string",  // 手机号
  "code": "string"    // 验证码
}
```

#### 注册
```
POST /auth/register
```
**请求参数：**
```json
{
  "phone": "string",       // 手机号
  "code": "string",        // 验证码
  "password": "string",    // 密码
  "inviteCode": "string"   // 邀请码（可选）
}
```

#### 退出登录
```
POST /auth/logout
```

### 2.2 Token管理

#### 刷新Token
```
POST /auth/refresh-token
```
**请求参数：**
```json
{
  "refreshToken": "string"
}
```

#### 检查Token有效性
```
GET /auth/check-token
```

### 2.3 密码管理

#### 重置密码（忘记密码）
```
POST /auth/reset-password
```
**请求参数：**
```json
{
  "phone": "string",       // 手机号
  "code": "string",        // 验证码
  "newPassword": "string"  // 新密码
}
```

#### 修改密码
```
POST /auth/change-password
```
**请求参数：**
```json
{
  "oldPassword": "string",      // 旧密码
  "newPassword": "string",      // 新密码
  "confirmPassword": "string"   // 确认密码
}
```

#### 设置密码（首次）
```
POST /auth/set-password
```
**请求参数：**
```json
{
  "password": "string",        // 密码
  "confirmPassword": "string"  // 确认密码
}
```

### 2.4 用户信息

#### 获取用户信息
```
GET /user/info
```

#### 更新用户信息
```
PUT /user/info
```
**请求参数：**
```json
{
  "nickname": "string",   // 昵称
  "avatar": "string",     // 头像URL
  "gender": "string",     // male | female | unknown
  "birthday": "string"    // 1990-01-01
}
```

#### 获取用户角色
```
GET /user/role
```

#### 切换角色/身份
```
POST /user/switch-role
```
**请求参数：**
```json
{
  "roleId": "string",   // 角色ID
  "storeId": "string"   // 门店ID（可选）
}
```

### 2.5 手机号绑定

#### 绑定手机号
```
POST /user/bind-phone
```
**请求参数：**
```json
{
  "phone": "string",  // 手机号
  "code": "string"    // 验证码
}
```

#### 更换手机号
```
POST /user/change-phone
```
**请求参数：**
```json
{
  "oldPhone": "string",  // 旧手机号
  "oldCode": "string",   // 旧手机验证码
  "newPhone": "string",  // 新手机号
  "newCode": "string"    // 新手机验证码
}
```

### 2.6 微信相关

#### 绑定微信
```
POST /user/bind-wechat
```
**请求参数：**
```json
{
  "code": "string"  // 微信授权code
}
```

#### 解绑微信
```
POST /user/unbind-wechat
```

#### 获取微信绑定状态
```
GET /user/wechat-status
```

### 2.7 商家认证

#### 获取商家认证状态
```
GET /auth/merchant/status
```

#### 提交商家认证
```
POST /auth/merchant/submit
```
**请求参数：**
```json
{
  "businessLicense": "string",  // 营业执照图片URL
  "idCardFront": "string",      // 身份证正面
  "idCardBack": "string",       // 身份证背面
  "legalPersonName": "string",  // 法人姓名
  "idCardNumber": "string",     // 身份证号
  "shopName": "string",         // 店铺名称
  "shopAddress": "string",      // 店铺地址
  "contactPhone": "string"      // 联系电话
}
```

#### 重新提交商家认证
```
POST /auth/merchant/resubmit
```

#### 获取商家认证详情
```
GET /auth/merchant/detail
```

### 2.8 入驻相关

#### 获取入驻协议
```
GET /auth/settlement/agreement
```

#### 同意入驻协议
```
POST /auth/settlement/agree
```

#### 获取入驻进度
```
GET /auth/settlement/progress
```

---

## 三、店铺管理模块 `/shop`

### 3.1 店铺基本信息

#### 获取我的店铺（商家专用）
```
GET /shop/my
```
> 需要 MERCHANT 角色才能访问

#### 获取店铺详情（公开接口）
```
GET /shop/{shop_id}
```

#### 更新店铺信息
```
PUT /shop/{shop_id}
```
**请求参数：**
```json
{
  "name": "string",           // 店铺名称
  "logo": "string",           // 店铺Logo URL
  "phone": "string",          // 联系电话
  "address": "string",        // 店铺地址
  "latitude": 39.9,           // 纬度
  "longitude": 116.4,         // 经度
  "businessScope": "string",  // 主营业务
  "introduction": "string"    // 店铺简介
}
```

#### 上传店铺Logo
```
POST /shop/logo
```
**请求参数：** FormData
| 字段 | 类型 | 说明 |
|------|------|------|
| logo | File | 图片文件 |

#### 上传店铺图片
```
POST /shop/images
```
**请求参数：** FormData
| 字段 | 类型 | 说明 |
|------|------|------|
| image | File | 图片文件 |
| type | string | 图片类型: environment(环境图) / storefront(门头图) / license(执照) |

#### 删除店铺图片
```
DELETE /shop/images/{imageId}
```

### 3.2 营业状态

#### 获取营业状态
```
GET /shop/business-status
```

#### 更新营业状态
```
PUT /shop/business-status
```
**请求参数：**
```json
{
  "isOpen": true,              // 是否营业
  "closeReason": "string",     // 关店原因: 休息中 | 暂停营业 | 其他
  "customReason": "string"     // 自定义原因（可选）
}
```

#### 快速开店
```
POST /shop/open
```

#### 快速关店
```
POST /shop/close
```
**请求参数：**
```json
{
  "reason": "string"  // 关店原因（可选）
}
```

### 3.3 店铺装修

#### 获取店铺装修配置
```
GET /shop/decoration
```

#### 更新店铺装修配置
```
PUT /shop/decoration
```
**请求参数：**
```json
{
  "brandImages": ["string"],              // 品牌图片URL数组
  "businessHours": {
    "start": "09:00",
    "end": "21:00"
  },
  "restTime": {                           // 休息时间
    "start": "14:00",
    "end": "14:30"
  },
  "establishedDate": "2020-01-01",        // 成立日期
  "shopArea": 100,                        // 经营面积(平方米)
  "workstations": 10,                     // 服务工位数
  "stylistCount": 5,                      // 美发师数量
  "appointmentTime": 30,                  // 预约时间间隔(分钟)
  "skills": ["剪发", "烫发", "染发"],      // 擅长技能
  "introduction": "string",               // 店铺简介
  "features": ["专业烫染", "私人定制"],    // 服务特色标签
  "facilities": ["WiFi", "停车场", "空调"] // 环境设施标签
}
```

#### 获取装修模板列表
```
GET /shop/decoration/templates
```

#### 应用装修模板
```
POST /shop/decoration/apply-template
```
**请求参数：**
```json
{
  "templateId": "string"  // 模板ID
}
```

### 3.4 关联门店管理

#### 获取门店列表
```
GET /stores
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| type | string | 门店类型: service / chain / settled（可选）|

#### 获取门店详情
```
GET /stores/{id}
```

#### 添加门店
```
POST /stores
```
**请求参数：**
```json
{
  "type": "string",      // service(服务门店) | chain(连锁门店)
  "name": "string",      // 门店名称
  "address": "string",   // 门店地址
  "phone": "string",     // 联系电话
  "manager": "string",   // 负责人
  "latitude": 39.9,      // 纬度
  "longitude": 116.4     // 经度
}
```

#### 更新门店信息
```
PUT /stores/{id}
```

#### 删除门店
```
DELETE /stores/{id}
```

### 3.5 入驻门店

#### 搜索可入驻门店
```
GET /stores/settle/search
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| keyword | string | 搜索关键词 |

#### 申请入驻门店
```
POST /stores/settle/{storeId}/apply
```
**请求参数：**
```json
{
  "message": "string"  // 申请留言（可选）
}
```

#### 获取入驻申请列表
```
GET /stores/settle/applications
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| status | string | pending / approved / rejected（可选）|

#### 获取已入驻门店列表
```
GET /stores/settled
```

#### 脱离入驻门店
```
POST /stores/settled/{storeId}/leave
```

### 3.6 连锁门店

#### 获取连锁门店列表
```
GET /stores/chain
```

#### 添加连锁门店
```
POST /stores/chain
```

#### 邀请门店加入连锁
```
POST /stores/chain/invite
```
**请求参数：**
```json
{
  "storeId": "string",  // 门店ID（二选一）
  "phone": "string"     // 手机号（二选一）
}
```

#### 处理连锁邀请
```
POST /stores/chain/invite/{inviteId}
```
**请求参数：**
```json
{
  "action": "string"  // accept | reject
}
```

#### 移除连锁门店
```
DELETE /stores/chain/{storeId}
```

### 3.7 店铺推广

#### 获取店铺二维码
```
GET /shop/qrcode
GET /stores/{id}/qrcode
```

#### 生成店铺二维码
```
POST /stores/{id}/qrcode
```
**请求参数：**
```json
{
  "type": "string",   // mini(小程序码) | share(分享二维码)
  "scene": "string",  // 场景参数（可选）
  "width": 430        // 宽度（可选）
}
```

#### 获取店铺推广信息
```
GET /shop/promotion
```

#### 生成推广海报
```
POST /shop/promotion/poster
```
**请求参数：**
```json
{
  "templateId": "string",  // 模板ID（可选）
  "customText": "string"   // 自定义文字（可选）
}
```

#### 获取推广海报模板
```
GET /shop/promotion/templates
```

### 3.8 店铺统计

#### 获取店铺粉丝列表
```
GET /shop/followers
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| page | number | 页码 |
| pageSize | number | 每页数量 |

#### 获取店铺收藏用户列表
```
GET /shop/favorites
```

#### 获取店铺浏览记录
```
GET /shop/views
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| startDate | string | 开始日期 |
| endDate | string | 结束日期 |

---

## 四、服务管理模块 `/services`

### 4.1 服务列表

#### 获取服务列表
```
GET /services
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| page | number | 页码，默认1 |
| pageSize | number | 每页数量，默认20 |
| type | string | 服务类型: store(门店服务) / home(上门服务) |
| status | string | 状态: online / offline / all |
| categoryId | string | 分类ID（可选）|
| keyword | string | 搜索关键词（可选）|

#### 获取服务详情
```
GET /services/{id}
```

#### 获取门店服务列表
```
GET /services/store
```

#### 获取上门服务列表
```
GET /services/home
```

#### 获取已下架服务列表
```
GET /services/offline
```

### 4.2 服务CRUD

#### 创建服务
```
POST /services
```
**请求参数：**
```json
{
  "categoryId": "string",        // 分类ID
  "subCategoryId": "string",     // 细分类ID
  "name": "string",              // 服务名称
  "mainImage": "string",         // 主图URL
  "images": ["string"],          // 服务图片数组
  "video": {                     // 视频（可选）
    "url": "string",
    "cover": "string"
  },
  "isForMale": false,            // 男士专属
  "priceType": "string",         // 定价类型: fixed(一口价) / product(产品定价)
  "price": 100,                  // 一口价
  "originalPrice": 120,          // 原价
  "productPricing": [{           // 产品定价（priceType为product时）
    "productName": "string",
    "specs": [{ "name": "string", "price": 100 }]
  }],
  "includes": ["洗发", "护理"],   // 服务包含
  "duration": 60,                // 服务时长（分钟）
  "description": "string",       // 服务描述
  "notices": ["string"],         // 注意事项
  "serviceType": "string",       // 服务方式: store / home / both
  "homeExtraPrice": 0,           // 上门加价
  "enableDistribution": false,   // 开启分销
  "commissionRate": 0,           // 分销比例
  "promises": ["7天无理由退款"],  // 服务承诺
  "status": "string"             // 状态: online(直接上架) / draft(保存草稿)
}
```

#### 更新服务
```
PUT /services/{id}
```

#### 删除服务
```
DELETE /services/{id}
```

#### 批量删除服务
```
DELETE /services/batch
```
**请求参数：**
```json
{
  "ids": ["string"]  // 服务ID数组
}
```

#### 复制服务
```
POST /services/{id}/copy
```

### 4.3 服务状态管理

#### 上架服务
```
PUT /services/{id}/online
```

#### 下架服务
```
PUT /services/{id}/offline
```
**请求参数：**
```json
{
  "reason": "string"  // 下架原因（可选）
}
```

#### 批量上架/下架
```
PUT /services/batch-status
```
**请求参数：**
```json
{
  "ids": ["string"],   // 服务ID数组
  "action": "string"   // online | offline
}
```

#### 设为推荐
```
PUT /services/{id}/recommend
```
**请求参数：**
```json
{
  "recommended": true  // 是否推荐
}
```

#### 设为热门
```
PUT /services/{id}/hot
```
**请求参数：**
```json
{
  "hot": true  // 是否热门
}
```

### 4.4 服务分类

#### 获取服务分类列表
```
GET /services/categories
```

#### 获取服务细分类
```
GET /services/categories/{categoryId}/sub
```

#### 创建服务分类
```
POST /services/categories
```
**请求参数：**
```json
{
  "name": "string",      // 分类名
  "icon": "string",      // 图标（可选）
  "parentId": "string"   // 父分类ID（可选）
}
```

#### 更新服务分类
```
PUT /services/categories/{id}
```

#### 删除服务分类
```
DELETE /services/categories/{id}
```

#### 排序服务分类
```
PUT /services/categories/sort
```
**请求参数：**
```json
{
  "ids": ["string"]  // 排序后的分类ID数组
}
```

### 4.5 服务标签

#### 获取服务包含标签
```
GET /services/includes
```

#### 获取服务事项（注意事项）
```
GET /services/notices
```

#### 获取服务承诺标签
```
GET /services/promises
```

### 4.6 套餐管理

#### 获取套餐列表
```
GET /services/packages
```

#### 获取套餐详情
```
GET /services/packages/{id}
```

#### 创建套餐
```
POST /services/packages
```
**请求参数：**
```json
{
  "name": "string",           // 套餐名称
  "serviceIds": ["string"],   // 包含的服务ID
  "price": 100,               // 套餐价格
  "originalPrice": 150,       // 原价
  "description": "string",    // 套餐描述
  "validDays": 30             // 有效天数
}
```

#### 更新套餐
```
PUT /services/packages/{id}
```

#### 删除套餐
```
DELETE /services/packages/{id}
```

### 4.7 服务技师关联

#### 获取服务关联的技师
```
GET /services/{serviceId}/technicians
```

#### 设置服务关联技师
```
PUT /services/{serviceId}/technicians
```
**请求参数：**
```json
{
  "technicianIds": ["string"]
}
```

---

## 五、订单管理模块 `/orders`

### 5.1 订单列表

#### 获取订单列表
```
GET /orders
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| page | number | 页码，默认1 |
| pageSize | number | 每页数量，默认20 |
| status | string | pending / confirmed / serving / completed / cancelled / all |
| date | string | 指定日期 2024-01-01（可选）|
| startDate | string | 开始日期（可选）|
| endDate | string | 结束日期（可选）|
| technicianId | string | 技师ID（可选）|
| keyword | string | 搜索订单号/顾客名（可选）|

#### 获取订单详情
```
GET /orders/{id}
```

#### 获取预约订单（待接单）
```
GET /orders/pending
```

#### 获取确认订单（待服务）
```
GET /orders/confirmed
```

#### 获取完成订单
```
GET /orders/completed
```

#### 获取今日订单
```
GET /orders/today
```

### 5.2 订单操作

#### 创建订单
```
POST /orders
```
**请求参数：**
```json
{
  "customerId": "string",       // 顾客ID
  "serviceId": "string",        // 服务ID
  "technicianId": "string",     // 技师ID
  "appointmentDate": "string",  // 预约日期 2024-01-01
  "appointmentTime": "string",  // 预约时间 10:00
  "remark": "string"            // 备注（可选）
}
```

#### 接单
```
POST /orders/{id}/accept
```

#### 拒绝订单
```
POST /orders/{id}/reject
```
**请求参数：**
```json
{
  "reason": "string"  // 拒绝原因
}
```

#### 开始服务
```
POST /orders/{id}/start
```

#### 完成服务
```
POST /orders/{id}/complete
```
**请求参数：**
```json
{
  "actualAmount": 100,   // 实际金额（可选）
  "remark": "string"     // 备注（可选）
}
```

#### 取消订单
```
POST /orders/{id}/cancel
```
**请求参数：**
```json
{
  "reason": "string"  // 取消原因
}
```

### 5.3 预约修改

#### 修改预约时间
```
PUT /orders/{id}/appointment
```
**请求参数：**
```json
{
  "appointmentDate": "string",  // 新日期
  "appointmentTime": "string",  // 新时间
  "reason": "string"            // 修改原因（可选）
}
```

#### 更换技师
```
PUT /orders/{id}/technician
```
**请求参数：**
```json
{
  "technicianId": "string",  // 新技师ID
  "reason": "string"         // 更换原因（可选）
}
```

### 5.4 支付与退款

#### 确认支付
```
POST /orders/{id}/payment
```
**请求参数：**
```json
{
  "paymentMethod": "string",  // wechat / alipay / cash / card
  "amount": 100,              // 金额
  "transactionId": "string"   // 交易流水号（可选）
}
```

#### 申请退款
```
POST /orders/{id}/refund
```
**请求参数：**
```json
{
  "reason": "string",  // 退款原因
  "amount": 100        // 退款金额
}
```

#### 处理退款申请
```
POST /orders/{id}/refund/handle
```
**请求参数：**
```json
{
  "action": "string",  // approve / reject
  "reason": "string"   // 处理说明（可选）
}
```

### 5.5 订单评价

#### 商家点评顾客
```
POST /orders/{orderId}/review/customer
```
**请求参数：**
```json
{
  "rating": 5,                    // 1-5星
  "tags": ["守时", "配合度高"],    // 评价标签
  "content": "string",            // 评价内容
  "isAnonymous": false            // 是否匿名
}
```

#### 回复顾客评价
```
POST /orders/{orderId}/review/reply
```
**请求参数：**
```json
{
  "content": "string"  // 回复内容
}
```

### 5.6 订单统计

#### 获取订单统计
```
GET /orders/stats
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| period | string | today / week / month |

#### 获取订单数量统计
```
GET /orders/count-by-status
```

#### 导出订单
```
GET /orders/export
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| startDate | string | 开始日期 |
| endDate | string | 结束日期 |
| status | string | 状态（可选）|
| format | string | excel / csv |

---

## 六、顾客管理模块 `/customers`

### 6.1 顾客列表

#### 获取顾客列表
```
GET /customers
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| page | number | 页码 |
| pageSize | number | 每页数量 |
| type | string | all / new / old |
| keyword | string | 搜索关键词（可选）|
| sortBy | string | visitCount / totalAmount / lastVisit |
| sortOrder | string | asc / desc |

#### 获取顾客详情
```
GET /customers/{id}
```

#### 获取新顾客列表
```
GET /customers/new
```

#### 获取老顾客列表
```
GET /customers/old
```

### 6.2 顾客CRUD

#### 创建顾客
```
POST /customers
```
**请求参数：**
```json
{
  "name": "string",
  "phone": "string",
  "gender": "male | female",
  "birthday": "1990-01-01",
  "age": 30,
  "occupation": "string",
  "preferences": "string",
  "email": "string",
  "remark": "string",
  "tags": ["标签1"],
  "source": "order | manual | import"
}
```

#### 更新顾客
```
PUT /customers/{id}
```

#### 删除顾客
```
DELETE /customers/{id}
```

#### 批量删除
```
DELETE /customers/batch
```
**请求参数：**
```json
{
  "ids": ["string"]
}
```

### 6.3 顾客档案

#### 获取顾客档案
```
GET /customers/{id}/profile
```

#### 更新顾客档案
```
PUT /customers/{id}/profile
```
**请求参数：**
```json
{
  "name": "string",
  "gender": "male | female",
  "age": 30,
  "birthday": "1990-01-01",
  "occupation": "string",
  "preferences": "string",
  "phone": "string",
  "email": "string",
  "remark": "string"
}
```

### 6.4 顾客标签

#### 获取顾客标签列表
```
GET /customers/tags
```

#### 创建顾客标签
```
POST /customers/tags
```
**请求参数：**
```json
{
  "name": "string",
  "color": "#FF5733"
}
```

#### 设置顾客标签
```
PUT /customers/{customerId}/tags
```
**请求参数：**
```json
{
  "tagIds": ["string"]
}
```

### 6.5 生日提醒

#### 获取生日提醒顾客
```
GET /customers/birthday
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| days | number | 未来多少天内过生日，默认7 |

#### 发送生日祝福
```
POST /customers/{customerId}/birthday-wish
```
**请求参数：**
```json
{
  "content": "string",
  "couponId": "string",
  "templateId": "string"
}
```

### 6.6 顾客统计

#### 获取顾客统计
```
GET /customers/stats
```

#### 获取流失顾客
```
GET /customers/churned
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| days | number | 多少天未消费算流失，默认90 |

---

## 七、员工/技师管理模块 `/staff` `/technicians`

### 7.1 员工管理

#### 获取员工列表
```
GET /staff
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| page | number | 页码 |
| pageSize | number | 每页数量 |
| status | string | active / disabled / all |
| roleId | string | 角色ID（可选）|
| keyword | string | 搜索关键词（可选）|

#### 添加员工
```
POST /staff
```
**请求参数：**
```json
{
  "platformAccount": "string",
  "name": "string",
  "roleId": "string",
  "phone": "string",
  "avatar": "string"
}
```

#### 启用/停用员工
```
PUT /staff/{id}/enable
PUT /staff/{id}/disable
```

### 7.2 技师管理

#### 获取技师列表
```
GET /technicians
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| status | string | active / pending / resigned / all |
| type | string | hairdresser / beautician / makeup / nail |
| position | string | manager / director / designer |

#### 添加技师
```
POST /technicians
```
**请求参数：**
```json
{
  "name": "string",
  "type": "hairdresser",
  "position": "designer",
  "level": "senior",
  "phone": "string",
  "avatar": "string",
  "idCard": "string",
  "skills": ["剪发", "染发"],
  "introduction": "string"
}
```

#### 确认技师入职
```
POST /technicians/{id}/confirm-entry
```

#### 技师离职
```
POST /technicians/{id}/resign
```
**请求参数：**
```json
{
  "resignDate": "2024-01-01",
  "reason": "string"
}
```

### 7.3 技师档案

#### 获取技师档案
```
GET /technicians/{id}/profile
```

#### 更新技师档案
```
PUT /technicians/{id}/profile
```
**请求参数：**
```json
{
  "name": "string",
  "gender": "male | female",
  "age": 25,
  "birthday": "1999-01-01",
  "workYears": 5,
  "level": "senior",
  "phone": "string",
  "email": "string",
  "idCard": "string",
  "address": "string",
  "entryDate": "2020-01-01",
  "remark": "string"
}
```

### 7.4 技师业绩

#### 获取技师业绩
```
GET /technicians/{id}/performance
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| period | string | day / week / month |

#### 获取技师排行榜
```
GET /technicians/ranking
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| sortBy | string | revenue / orders / rating |
| period | string | week / month |
| limit | number | 数量，默认10 |

---

## 八、财务管理模块 `/finance`

#### 获取资产概览
```
GET /finance/assets
```

#### 获取余额
```
GET /finance/balance
```

#### 获取余额明细
```
GET /finance/balance/detail
```

#### 提现申请
```
POST /finance/withdraw
```
**请求参数：**
```json
{
  "amount": 100,
  "bankCardId": "string"
}
```

#### 获取银行卡列表
```
GET /finance/bank-cards
```

#### 添加银行卡
```
POST /finance/bank-cards
```
**请求参数：**
```json
{
  "cardNumber": "string",
  "bankName": "string",
  "holderName": "string",
  "phone": "string"
}
```

#### 获取收入明细
```
GET /finance/income
```

#### 获取交易明细
```
GET /finance/transactions
```

---

## 九、营销管理模块 `/marketing`

#### 获取优惠券列表
```
GET /marketing/coupons
```

#### 创建优惠券
```
POST /marketing/coupons
```
**请求参数：**
```json
{
  "name": "string",
  "type": "discount | amount",
  "value": 10,
  "minAmount": 100,
  "startTime": "2024-01-01",
  "endTime": "2024-12-31",
  "totalCount": 100
}
```

#### 获取分销设置
```
GET /marketing/distribution/settings
```

#### 更新分销设置
```
PUT /marketing/distribution/settings
```

#### 获取分销商列表
```
GET /marketing/distributors
```

---

## 十、时间/排班管理模块 `/schedule`

### 10.1 营业时间

#### 获取营业时间配置
```
GET /schedule/business-hours
```

#### 更新营业时间配置
```
PUT /schedule/business-hours
```
**请求参数：**
```json
{
  "weekdays": [
    { "day": 1, "startTime": "09:00", "endTime": "21:00", "isOpen": true }
  ],
  "holidays": [
    { "date": "2024-01-01", "isOpen": false, "reason": "元旦休息" }
  ]
}
```

#### 设置休息日
```
POST /schedule/rest-days
```
**请求参数：**
```json
{
  "date": "2024-01-01",
  "reason": "string"
}
```

### 10.2 预约管理

#### 获取今日预约
```
GET /schedule/appointments/today
```

#### 获取预约列表
```
GET /schedule/appointments
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| date | string | 日期 |
| status | string | pending / confirmed / completed |

#### 获取可预约时间段
```
GET /schedule/available-slots
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| date | string | 日期 |
| serviceId | string | 服务ID（可选）|
| technicianId | string | 技师ID（可选）|

### 10.3 工作排班

#### 获取排班列表
```
GET /schedule/work-schedule
```

#### 创建排班
```
POST /schedule/work-schedule
```
**请求参数：**
```json
{
  "technicianId": "string",
  "date": "2024-01-01",
  "shifts": [{ "startTime": "09:00", "endTime": "18:00" }]
}
```

---

## 十一、消息通知模块 `/messages`

#### 获取消息列表
```
GET /messages
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| type | string | system / order / review / marketing / finance |
| isRead | boolean | 是否已读 |

#### 获取未读数量
```
GET /messages/unread-count
```

#### 标记已读
```
PUT /messages/{id}/read
```

#### 全部标记已读
```
PUT /messages/read-all
```

---

## 十二、评价管理模块 `/reviews`

#### 获取评价列表
```
GET /reviews
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| rating | number | 星级筛选 1-5 |
| hasReply | boolean | 是否已回复 |
| type | string | service / technician / shop |

#### 回复评价
```
POST /reviews/{id}/reply
```
**请求参数：**
```json
{
  "content": "string"
}
```

#### 获取评价统计
```
GET /reviews/stats
```

---

## 十三、数据统计模块 `/statistics`

#### 获取今日概览
```
GET /statistics/today
```

#### 获取营业额统计
```
GET /statistics/revenue
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| period | string | day / week / month / year |

#### 获取订单统计
```
GET /statistics/orders
```

#### 获取顾客统计
```
GET /statistics/customers
```

#### 获取技师业绩统计
```
GET /statistics/technicians
```

#### 导出报表
```
GET /statistics/export
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| type | string | revenue / orders / customers / technicians |
| format | string | excel / pdf |

---

## 附录：枚举值

### 订单状态

| 值 | 说明 |
|-----|------|
| PENDING_PAYMENT | 待付款 |
| PENDING_CONFIRM | 待确认 |
| CONFIRMED | 已确认 |
| IN_SERVICE | 服务中 |
| COMPLETED | 已完成 |
| CANCELLED | 已取消 |
| REFUNDING | 退款中 |
| REFUNDED | 已退款 |

### 技师类型

| 值 | 说明 |
|-----|------|
| hairdresser | 美发师 |
| beautician | 美容师 |
| makeup | 化妆师 |
| nail | 美甲师 |
| body | 美体师 |

### 技师职位

| 值 | 说明 |
|-----|------|
| manager | 店长 |
| director | 总监 |
| designer | 设计师 |
| stylist | 发型师 |
| assistant | 助理 |

### 消息类型

| 值 | 说明 |
|-----|------|
| system | 系统消息 |
| order | 订单消息 |
| review | 评价消息 |
| marketing | 营销消息 |
| finance | 财务消息 |

---

## 十四、聊天模块 `/chat`

### 14.1 会话管理

#### 获取会话列表
```
GET /chat/conversations
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| page | number | 页码 |
| pageSize | number | 每页数量 |
| type | string | customer / system / all |

**响应数据：**
```json
{
  "list": [
    {
      "id": "string",
      "type": "customer",
      "targetId": "string",
      "targetName": "string",
      "targetAvatar": "string",
      "lastMessage": "string",
      "lastMessageTime": "string",
      "unreadCount": 0
    }
  ],
  "total": 0
}
```

#### 获取会话详情
```
GET /chat/conversations/{id}
```

#### 创建会话
```
POST /chat/conversations
```
**请求参数：**
```json
{
  "targetId": "string",
  "type": "customer"
}
```

#### 删除会话
```
DELETE /chat/conversations/{id}
```

#### 置顶会话
```
PUT /chat/conversations/{id}/pin
```
**请求参数：**
```json
{
  "pinned": true
}
```

#### 设置免打扰
```
PUT /chat/conversations/{id}/mute
```
**请求参数：**
```json
{
  "muted": true
}
```

### 14.2 消息管理

#### 获取消息列表
```
GET /chat/conversations/{conversationId}/messages
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| page | number | 页码 |
| pageSize | number | 每页数量 |
| beforeId | string | 获取此ID之前的消息 |

**响应数据：**
```json
{
  "list": [
    {
      "id": "string",
      "conversationId": "string",
      "senderId": "string",
      "senderName": "string",
      "senderAvatar": "string",
      "type": "text | image | voice | video | file | location | order | service",
      "content": "string",
      "extra": {},
      "status": "sending | sent | read | failed",
      "createTime": "string"
    }
  ],
  "total": 0
}
```

#### 发送消息
```
POST /chat/conversations/{conversationId}/messages
```
**请求参数：**
```json
{
  "type": "text | image | voice | video | file | location | order | service",
  "content": "string",
  "extra": {
    "duration": 10,
    "width": 100,
    "height": 100,
    "orderId": "string",
    "serviceId": "string"
  }
}
```

#### 撤回消息
```
POST /chat/messages/{messageId}/recall
```

#### 删除消息
```
DELETE /chat/messages/{messageId}
```

#### 标记消息已读
```
PUT /chat/conversations/{conversationId}/read
```

### 14.3 快捷回复

#### 获取快捷回复列表
```
GET /chat/quick-replies
```

#### 创建快捷回复
```
POST /chat/quick-replies
```
**请求参数：**
```json
{
  "title": "string",
  "content": "string",
  "sort": 0
}
```

#### 更新快捷回复
```
PUT /chat/quick-replies/{id}
```

#### 删除快捷回复
```
DELETE /chat/quick-replies/{id}
```

### 14.4 自动回复

#### 获取自动回复设置
```
GET /chat/auto-reply
```

#### 更新自动回复设置
```
PUT /chat/auto-reply
```
**请求参数：**
```json
{
  "enabled": true,
  "welcomeMessage": "string",
  "awayMessage": "string",
  "awayTimeStart": "22:00",
  "awayTimeEnd": "08:00",
  "keywords": [
    {
      "keyword": "string",
      "reply": "string",
      "matchType": "exact | contains"
    }
  ]
}
```

---

## 十五、作品集模块 `/portfolio`

### 15.1 作品列表

#### 获取作品列表
```
GET /portfolio
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| page | number | 页码 |
| pageSize | number | 每页数量 |
| technicianId | string | 技师ID（可选）|
| categoryId | string | 分类ID（可选）|
| status | string | published / draft / offline / all |
| keyword | string | 搜索关键词（可选）|

**响应数据：**
```json
{
  "list": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "images": ["string"],
      "video": {
        "url": "string",
        "cover": "string",
        "duration": 30
      },
      "technicianId": "string",
      "technicianName": "string",
      "categoryId": "string",
      "categoryName": "string",
      "tags": ["string"],
      "viewCount": 0,
      "likeCount": 0,
      "favoriteCount": 0,
      "commentCount": 0,
      "status": "published",
      "featured": false,
      "pinned": false,
      "createTime": "string"
    }
  ],
  "total": 0
}
```

#### 获取作品详情
```
GET /portfolio/{id}
```

#### 获取技师作品列表
```
GET /portfolio/technician/{technicianId}
```

#### 获取店铺作品列表
```
GET /portfolio/shop
```

### 15.2 作品发布

#### 发布作品
```
POST /portfolio
```
**请求参数：**
```json
{
  "title": "string",
  "description": "string",
  "categoryId": "string",
  "technicianId": "string",
  "images": ["string"],
  "video": {
    "url": "string",
    "cover": "string",
    "duration": 30
  },
  "tags": ["string"],
  "serviceId": "string",
  "beforeAfter": {
    "before": "string",
    "after": "string"
  },
  "customerInfo": {
    "gender": "male | female",
    "hairType": "string",
    "faceShape": "string"
  },
  "status": "published | draft"
}
```

#### 更新作品
```
PUT /portfolio/{id}
```

#### 删除作品
```
DELETE /portfolio/{id}
```

#### 批量删除作品
```
DELETE /portfolio/batch
```
**请求参数：**
```json
{
  "ids": ["string"]
}
```

### 15.3 作品状态

#### 发布作品（草稿转发布）
```
PUT /portfolio/{id}/publish
```

#### 下架作品
```
PUT /portfolio/{id}/offline
```
**请求参数：**
```json
{
  "reason": "string"
}
```

#### 重新上架
```
PUT /portfolio/{id}/online
```

#### 批量上架/下架
```
PUT /portfolio/batch-status
```
**请求参数：**
```json
{
  "ids": ["string"],
  "action": "online | offline"
}
```

#### 设为精选
```
PUT /portfolio/{id}/featured
```
**请求参数：**
```json
{
  "featured": true
}
```

#### 置顶作品
```
PUT /portfolio/{id}/pinned
```
**请求参数：**
```json
{
  "pinned": true
}
```

### 15.4 作品分类

#### 获取作品分类列表
```
GET /portfolio/categories
```

#### 创建作品分类
```
POST /portfolio/categories
```
**请求参数：**
```json
{
  "name": "string",
  "icon": "string",
  "sort": 0
}
```

#### 更新作品分类
```
PUT /portfolio/categories/{id}
```

#### 删除作品分类
```
DELETE /portfolio/categories/{id}
```

#### 排序分类
```
PUT /portfolio/categories/sort
```
**请求参数：**
```json
{
  "ids": ["string"]
}
```

### 15.5 作品标签

#### 获取作品标签列表
```
GET /portfolio/tags
```

#### 创建作品标签
```
POST /portfolio/tags
```
**请求参数：**
```json
{
  "name": "string"
}
```

#### 删除作品标签
```
DELETE /portfolio/tags/{id}
```

#### 获取热门标签
```
GET /portfolio/tags/hot
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| limit | number | 数量限制，默认20 |

### 15.6 作品互动

#### 获取作品互动数据
```
GET /portfolio/{id}/interaction
```
**响应数据：**
```json
{
  "viewCount": 0,
  "likeCount": 0,
  "favoriteCount": 0,
  "commentCount": 0,
  "shareCount": 0
}
```

#### 获取作品点赞列表
```
GET /portfolio/{id}/likes
```

#### 获取作品收藏列表
```
GET /portfolio/{id}/favorites
```

#### 获取作品评论列表
```
GET /portfolio/{id}/comments
```

#### 回复作品评论
```
POST /portfolio/{portfolioId}/comments/{commentId}/reply
```
**请求参数：**
```json
{
  "content": "string"
}
```

#### 删除评论
```
DELETE /portfolio/{portfolioId}/comments/{commentId}
```

### 15.7 作品统计

#### 获取作品统计概览
```
GET /portfolio/stats
```
**响应数据：**
```json
{
  "totalCount": 0,
  "publishedCount": 0,
  "draftCount": 0,
  "offlineCount": 0,
  "totalViews": 0,
  "totalLikes": 0,
  "totalFavorites": 0
}
```

#### 获取作品趋势统计
```
GET /portfolio/stats/trend
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| period | string | week / month |

#### 获取作品排行
```
GET /portfolio/stats/ranking
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| sortBy | string | views / likes / favorites / comments |
| period | string | week / month / all |
| limit | number | 数量，默认10 |

#### 获取单个作品数据分析
```
GET /portfolio/{id}/analysis
```

### 15.8 草稿箱

#### 获取草稿列表
```
GET /portfolio/drafts
```

#### 保存草稿
```
POST /portfolio/drafts
```

#### 更新草稿
```
PUT /portfolio/drafts/{id}
```

#### 删除草稿
```
DELETE /portfolio/drafts/{id}
```

---

## 十六、设置模块 `/settings`

### 16.1 账号安全

#### 获取账号安全信息
```
GET /settings/security
```
**响应数据：**
```json
{
  "hasPassword": true,
  "phoneBindStatus": true,
  "wechatBindStatus": true,
  "lastLoginTime": "string",
  "lastLoginDevice": "string"
}
```

#### 修改密码
```
POST /settings/security/password
```
**请求参数：**
```json
{
  "oldPassword": "string",
  "newPassword": "string",
  "confirmPassword": "string"
}
```

#### 绑定手机号
```
POST /settings/security/bind-phone
```
**请求参数：**
```json
{
  "phone": "string",
  "code": "string"
}
```

#### 更换手机号
```
POST /settings/security/change-phone
```
**请求参数：**
```json
{
  "oldPhone": "string",
  "oldCode": "string",
  "newPhone": "string",
  "newCode": "string"
}
```

#### 绑定微信
```
POST /settings/security/bind-wechat
```
**请求参数：**
```json
{
  "code": "string"
}
```

#### 解绑微信
```
POST /settings/security/unbind-wechat
```

#### 获取登录设备列表
```
GET /settings/security/devices
```

#### 移除登录设备
```
DELETE /settings/security/devices/{deviceId}
```

#### 移除所有其他设备
```
DELETE /settings/security/devices/others
```

#### 获取登录日志
```
GET /settings/security/login-logs
```

### 16.2 通知设置

#### 获取通知设置
```
GET /settings/notification
```
**响应数据：**
```json
{
  "newOrder": true,
  "orderConfirm": true,
  "orderCancel": true,
  "orderComplete": true,
  "newReview": true,
  "negativeReview": true,
  "reviewReply": true,
  "newCustomer": true,
  "customerBirthday": true,
  "incomeNotify": true,
  "withdrawNotify": true,
  "systemNotify": true,
  "marketingNotify": true,
  "sound": true,
  "vibrate": true,
  "badge": true
}
```

#### 更新通知设置
```
PUT /settings/notification
```

#### 获取免打扰时段
```
GET /settings/notification/dnd
```

#### 设置免打扰时段
```
PUT /settings/notification/dnd
```
**请求参数：**
```json
{
  "enabled": true,
  "startTime": "22:00",
  "endTime": "08:00"
}
```

### 16.3 隐私设置

#### 获取隐私设置
```
GET /settings/privacy
```

#### 更新隐私设置
```
PUT /settings/privacy
```
**请求参数：**
```json
{
  "showPhone": true,
  "showAddress": true,
  "allowSearch": true,
  "allowMessage": true,
  "showOnlineStatus": true,
  "showLastActive": true
}
```

### 16.4 权限管理

#### 获取角色列表
```
GET /settings/roles
```

#### 获取角色详情
```
GET /settings/roles/{roleId}
```

#### 创建角色
```
POST /settings/roles
```
**请求参数：**
```json
{
  "name": "string",
  "description": "string",
  "permissions": ["order.view", "order.edit"]
}
```

#### 更新角色
```
PUT /settings/roles/{roleId}
```

#### 删除角色
```
DELETE /settings/roles/{roleId}
```

#### 获取权限列表
```
GET /settings/permissions
```

#### 分配员工角色
```
PUT /settings/staff/{staffId}/role
```
**请求参数：**
```json
{
  "roleId": "string"
}
```

### 16.5 打印设置

#### 获取打印设置
```
GET /settings/print
```

#### 更新打印设置
```
PUT /settings/print
```
**请求参数：**
```json
{
  "autoPrint": true,
  "printCopies": 1,
  "printerName": "string",
  "templateId": "string",
  "showLogo": true,
  "showQrcode": true,
  "footerText": "string"
}
```

#### 获取打印模板列表
```
GET /settings/print/templates
```

#### 测试打印
```
POST /settings/print/test
```

### 16.6 收款设置

#### 获取收款设置
```
GET /settings/payment
```

#### 更新收款设置
```
PUT /settings/payment
```
**请求参数：**
```json
{
  "wechatPayEnabled": true,
  "alipayEnabled": true,
  "cashEnabled": true,
  "cardEnabled": true,
  "balancePayEnabled": true,
  "couponEnabled": true
}
```

#### 获取微信支付配置
```
GET /settings/payment/wechat
```

#### 更新微信支付配置
```
PUT /settings/payment/wechat
```

### 16.7 系统设置

#### 获取系统设置
```
GET /settings/system
```

#### 更新系统设置
```
PUT /settings/system
```
**请求参数：**
```json
{
  "language": "zh-CN",
  "timezone": "Asia/Shanghai",
  "dateFormat": "YYYY-MM-DD",
  "timeFormat": "HH:mm",
  "currency": "CNY"
}
```

#### 获取缓存信息
```
GET /settings/system/cache
```

#### 清除缓存
```
POST /settings/system/cache/clear
```
**请求参数：**
```json
{
  "type": "all | image | data"
}
```

#### 获取存储空间使用情况
```
GET /settings/system/storage
```

### 16.8 账号注销

#### 获取注销账号状态
```
GET /settings/account/deactivation
```

#### 申请注销账号
```
POST /settings/account/deactivation
```
**请求参数：**
```json
{
  "reason": "string",
  "password": "string"
}
```

#### 取消注销申请
```
DELETE /settings/account/deactivation
```

### 16.9 数据导出

#### 导出账号数据
```
POST /settings/account/export
```
**请求参数：**
```json
{
  "types": ["orders", "customers", "reviews"],
  "format": "excel | json"
}
```

#### 获取数据导出记录
```
GET /settings/account/export/records
```

#### 下载导出的数据
```
GET /settings/account/export/download/{recordId}
```

### 16.10 操作日志

#### 获取操作日志
```
GET /settings/logs/operation
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| page | number | 页码 |
| pageSize | number | 每页数量 |
| type | string | 操作类型（可选）|
| operator | string | 操作人（可选）|
| startDate | string | 开始日期（可选）|
| endDate | string | 结束日期（可选）|

#### 获取操作日志详情
```
GET /settings/logs/operation/{logId}
```

### 16.11 版本信息

#### 获取版本信息
```
GET /settings/version
```

#### 检查更新
```
GET /settings/version/check-update
```

---

## 十七、代理模块 `/agent`

### 17.1 代理信息

#### 获取代理信息
```
GET /agent/info
```
**响应数据：**
```json
{
  "id": "string",
  "name": "string",
  "level": "string",
  "phone": "string",
  "status": "active | pending | disabled",
  "totalCommission": 0,
  "withdrawnCommission": 0,
  "pendingCommission": 0,
  "subordinateCount": 0,
  "createTime": "string"
}
```

#### 申请成为代理
```
POST /agent/apply
```
**请求参数：**
```json
{
  "name": "string",
  "phone": "string",
  "idCard": "string",
  "inviteCode": "string"
}
```

#### 获取代理申请状态
```
GET /agent/apply/status
```

### 17.2 下级管理

#### 获取下级代理列表
```
GET /agent/subordinates
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| page | number | 页码 |
| pageSize | number | 每页数量 |
| level | string | 代理等级（可选）|

#### 获取下级代理详情
```
GET /agent/subordinates/{id}
```

### 17.3 佣金管理

#### 获取佣金记录
```
GET /agent/commissions
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| page | number | 页码 |
| pageSize | number | 每页数量 |
| status | string | pending / settled / all |
| startDate | string | 开始日期（可选）|
| endDate | string | 结束日期（可选）|

#### 获取佣金统计
```
GET /agent/commissions/stats
```
**响应数据：**
```json
{
  "totalCommission": 0,
  "todayCommission": 0,
  "weekCommission": 0,
  "monthCommission": 0,
  "pendingCommission": 0
}
```

### 17.4 推广管理

#### 获取推广二维码
```
GET /agent/qrcode
```

#### 获取推广链接
```
GET /agent/invite-link
```

#### 获取推广统计
```
GET /agent/promotion/stats
```

---

## 十八、通用模块 `/common`

### 18.1 应用配置

#### 获取应用配置
```
GET /common/config
```
**响应数据：**
```json
{
  "siteName": "string",
  "logo": "string",
  "servicePhone": "string",
  "version": "string"
}
```

#### 获取首页数据
```
GET /common/home
```

#### 获取 Banner 列表
```
GET /common/banners
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| position | string | home / service / marketing |

### 18.2 文件上传

#### 上传单个文件
```
POST /common/upload
```
**请求参数：** FormData
| 字段 | 类型 | 说明 |
|------|------|------|
| file | File | 文件 |
| type | string | image / video / file |

**响应数据：**
```json
{
  "url": "string",
  "name": "string",
  "size": 0
}
```

#### 上传视频
```
POST /common/upload/video
```

### 18.3 地区数据

#### 获取地区列表
```
GET /common/regions
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| parentId | string | 父级地区ID |

#### 获取省份列表
```
GET /common/regions/provinces
```

#### 获取城市列表
```
GET /common/regions/cities
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| provinceId | string | 省份ID |

#### 获取区县列表
```
GET /common/regions/districts
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| cityId | string | 城市ID |

#### 获取热门城市
```
GET /common/regions/hot-cities
```

#### 根据经纬度获取地址
```
GET /common/location/address
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| latitude | number | 纬度 |
| longitude | number | 经度 |

### 18.4 分类数据

#### 获取服务分类列表
```
GET /common/categories/service
```

#### 获取服务分类树
```
GET /common/categories/service/tree
```

#### 获取技能标签列表
```
GET /common/tags/skills
```

#### 获取服务特色标签
```
GET /common/tags/features
```

#### 获取环境设施标签
```
GET /common/tags/facilities
```

### 18.5 搜索相关

#### 全局搜索
```
GET /common/search
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| keyword | string | 搜索关键词 |
| type | string | all / customer / order / service |

#### 获取搜索热词
```
GET /common/search/hot-keywords
```

#### 获取搜索历史
```
GET /common/search/history
```

#### 保存搜索历史
```
POST /common/search/history
```

#### 清空搜索历史
```
POST /common/search/history/clear
```

### 18.6 协议和文档

#### 获取协议内容
```
GET /common/agreement
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| type | string | user / privacy / merchant / service |

#### 获取关于我们
```
GET /common/about
```

#### 获取帮助中心列表
```
GET /common/help
```

#### 获取帮助详情
```
GET /common/help/{id}
```

### 18.7 银行相关

#### 获取银行列表
```
GET /common/banks
```

#### 获取银行支行列表
```
GET /common/banks/branches
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| bankCode | string | 银行代码 |
| cityCode | string | 城市代码 |

### 18.8 系统相关

#### 检查更新
```
GET /common/update/check
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| version | string | 当前版本 |
| platform | string | ios / android / mp-weixin |

#### 获取客服信息
```
GET /common/customer-service
```

#### 提交意见反馈
```
POST /common/feedback
```
**请求参数：**
```json
{
  "type": "string",
  "content": "string",
  "images": ["string"],
  "contact": "string"
}
```

#### 获取系统公告列表
```
GET /common/notices
```

#### 获取系统公告详情
```
GET /common/notices/{id}
```

### 18.9 字典数据

#### 获取字典数据
```
GET /common/dictionary
```
**请求参数：**
| 字段 | 类型 | 说明 |
|------|------|------|
| type | string | gender / jobTitle / technicianType / orderStatus 等 |

#### 获取职位等级列表
```
GET /common/dictionary?type=jobLevel
```

#### 获取技师类型列表
```
GET /common/dictionary?type=technicianType
```

#### 获取员工角色列表
```
GET /common/dictionary?type=staffRole
```

---

**文档整理完成 - 2026-01-13 (更新)**
