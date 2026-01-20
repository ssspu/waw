# WAW 管理后台

美发行业综合管理平台，用于管理用户端小程序和商家端小程序的所有业务数据。

## 技术栈

- Vue 3
- Vite
- Element Plus
- Vue Router
- Pinia
- Axios
- Sass

## 项目结构

```
waw-admin/
├── src/
│   ├── api/                    # API 接口
│   │   ├── index.js           # 接口定义
│   │   └── request.js         # Axios 封装
│   ├── assets/
│   │   ├── images/            # 图片资源
│   │   └── styles/            # 全局样式
│   ├── components/
│   │   └── layout/            # 布局组件
│   ├── router/                # 路由配置
│   ├── store/                 # Pinia 状态管理
│   ├── views/                 # 页面组件
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
└── vite.config.js
```

## 安装运行

```bash
npm install
npm run dev
npm run build
```

## 功能模块

| 模块 | 功能 | 关联端 |
|------|------|--------|
| 设计师管理 | 设计师列表、审核、详情 | 用户端 |
| 服务管理 | 服务项目CRUD、分类管理 | 用户端+商家端 |
| 品牌馆管理 | 品牌店铺审核、管理 | 用户端 |
| 用户管理 | 用户列表、禁用/启用 | 用户端 |
| 订单管理 | 订单列表、退款处理 | 用户端+商家端 |
| 优惠券管理 | 优惠券CRUD | 商家端 |
| 作品集管理 | 作品审核、删除 | 用户端 |
| 商家管理 | 商家入驻审核 | 商家端 |
| 店铺管理 | 店铺列表、连锁店管理 | 商家端 |
| 技师管理 | 技师列表、审核、业绩 | 商家端 |
| 员工管理 | 员工CRUD | 商家端 |
| 顾客管理 | 顾客档案、消费记录 | 商家端 |
| 财务管理 | 提现审核、结算管理 | 商家端 |
| 营销管理 | 优惠券、分销 | 商家端 |
| 数据统计 | 订单、收入、用户统计 | 全平台 |
| 系统管理 | 管理员、角色、配置、轮播图、日志 | 全平台 |

---

## API 接口文档

Base URL: `https://bioflex.cn/api`

> 管理后台接口统一使用 `/admin` 前缀，与用户端、商家端接口区分

### 通用说明

**请求头**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**响应格式**
```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

**Token 存储**
| 应用 | Token Key |
|------|-----------|
| 用户端 | `waw_token` |
| 商家端 | `waw_manager_token` |
| 管理后台 | `waw_admin_token` |

---

## 一、认证模块

### 1.1 管理员登录
- **接口**: `POST /admin/auth/login`

**请求参数**:
```json
{
  "username": "string",
  "password": "string"
}
```

**响应数据**:
```json
{
  "token": "string",
  "adminId": "number",
  "username": "string",
  "nickname": "string",
  "avatar": "string",
  "role": {
    "id": "number",
    "name": "string",
    "permissions": ["string"]
  }
}
```

### 1.2 退出登录
- **接口**: `POST /admin/auth/logout`

**请求参数**: 无

**响应数据**:
```json
{
  "success": true
}
```

### 1.3 获取当前管理员信息
- **接口**: `GET /admin/auth/info`

**请求参数**: 无

**响应数据**:
```json
{
  "id": "number",
  "username": "string",
  "nickname": "string",
  "avatar": "string",
  "phone": "string",
  "email": "string",
  "role": {
    "id": "number",
    "name": "string",
    "permissions": ["string"]
  },
  "lastLoginTime": "string",
  "createTime": "string"
}
```

### 1.4 修改密码
- **接口**: `POST /admin/auth/change-password`

**请求参数**:
```json
{
  "oldPassword": "string",
  "newPassword": "string"
}
```

**响应数据**:
```json
{
  "success": true
}
```

---

## 二、用户端数据管理

### 1. 设计师管理

> 对应用户端 `/designer/*` 接口

#### 1.1 获取设计师列表
- **接口**: `GET /admin/designer/list`

**请求参数** (Query):
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码，默认1 |
| pageSize | number | 否 | 每页数量，默认10 |
| keyword | string | 否 | 搜索关键词 |
| status | number | 否 | 状态: 0待审核 1已通过 2已拒绝 |
| shopId | string | 否 | 所属店铺ID |

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "name": "string",
      "avatar": "string",
      "phone": "string",
      "shopId": "number",
      "shopName": "string",
      "level": "string",
      "status": "number",
      "serviceCount": "number",
      "rating": "number",
      "createTime": "string"
    }
  ],
  "total": "number",
  "page": "number",
  "pageSize": "number"
}
```

#### 1.2 获取设计师详情
- **接口**: `GET /admin/designer/{id}`

**路径参数**:
| 参数 | 类型 | 说明 |
|------|------|------|
| id | number | 设计师ID |

**响应数据**:
```json
{
  "id": "number",
  "name": "string",
  "avatar": "string",
  "phone": "string",
  "gender": "number",
  "birthday": "string",
  "shopId": "number",
  "shopName": "string",
  "level": "string",
  "position": "string",
  "introduction": "string",
  "specialties": ["string"],
  "certificates": ["string"],
  "workYears": "number",
  "status": "number",
  "serviceCount": "number",
  "rating": "number",
  "createTime": "string",
  "updateTime": "string"
}
```

#### 1.3 创建设计师
- **接口**: `POST /admin/designer`

**请求参数**:
```json
{
  "name": "string",
  "avatar": "string",
  "phone": "string",
  "gender": "number",
  "birthday": "string",
  "shopId": "number",
  "level": "string",
  "position": "string",
  "introduction": "string",
  "specialties": ["string"],
  "certificates": ["string"],
  "workYears": "number"
}
```

**响应数据**:
```json
{
  "id": "number"
}
```

#### 1.4 更新设计师
- **接口**: `PUT /admin/designer/{id}`

**请求参数**: 同创建设计师

**响应数据**:
```json
{
  "success": true
}
```

#### 1.5 删除设计师
- **接口**: `DELETE /admin/designer/{id}`

**响应数据**:
```json
{
  "success": true
}
```

#### 1.6 审核设计师
- **接口**: `POST /admin/designer/{id}/audit`

**请求参数**:
```json
{
  "status": "number",
  "reason": "string"
}
```

**响应数据**:
```json
{
  "success": true
}
```

#### 1.7 获取设计师服务列表
- **接口**: `GET /designer/{id}/services`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "name": "string",
      "price": "number",
      "duration": "number",
      "category": "string"
    }
  ],
  "total": "number"
}
```

#### 1.8 获取设计师作品列表
- **接口**: `GET /designer/{id}/works`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "title": "string",
      "images": ["string"],
      "description": "string",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 1.9 获取设计师评价列表
- **接口**: `GET /designer/{id}/reviews`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "userId": "number",
      "userName": "string",
      "userAvatar": "string",
      "rating": "number",
      "content": "string",
      "images": ["string"],
      "createTime": "string"
    }
  ],
  "total": "number"
}

### 2. 服务管理

> 对应用户端 `/service/*` 和商家端 `/service/*` 接口

#### 2.1 获取服务列表
- **接口**: `GET /admin/service/list`

**请求参数** (Query):
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页数量 |
| keyword | string | 否 | 搜索关键词 |
| status | number | 否 | 状态筛选 |

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "name": "string",
      "categoryId": "number",
      "categoryName": "string",
      "price": "number",
      "duration": "number",
      "description": "string",
      "images": ["string"],
      "status": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 2.2 获取服务详情
- **接口**: `GET /admin/service/{id}`

**响应数据**:
```json
{
  "id": "number",
  "name": "string",
  "categoryId": "number",
  "categoryName": "string",
  "price": "number",
  "originalPrice": "number",
  "duration": "number",
  "description": "string",
  "images": ["string"],
  "details": "string",
  "status": "number",
  "salesCount": "number",
  "createTime": "string",
  "updateTime": "string"
}
```

#### 2.3 创建服务
- **接口**: `POST /admin/service`

**请求参数**:
```json
{
  "name": "string",
  "categoryId": "number",
  "price": "number",
  "originalPrice": "number",
  "duration": "number",
  "description": "string",
  "images": ["string"],
  "details": "string"
}
```

**响应数据**:
```json
{
  "id": "number"
}
```

#### 2.4 更新服务
- **接口**: `PUT /admin/service/{id}`

**请求参数**: 同创建服务

**响应数据**:
```json
{
  "success": true
}
```

#### 2.5 删除服务
- **接口**: `DELETE /admin/service/{id}`

**响应数据**:
```json
{
  "success": true
}
```

#### 2.6 批量删除服务
- **接口**: `POST /admin/service/batch-delete`

**请求参数**:
```json
{
  "ids": ["number"]
}
```

**响应数据**:
```json
{
  "success": true
}
```

#### 2.7 上架服务
- **接口**: `POST /admin/service/{id}/online`

**响应数据**:
```json
{
  "success": true
}
```

#### 2.8 下架服务
- **接口**: `POST /admin/service/{id}/offline`

**请求参数**:
```json
{
  "reason": "string"
}
```

**响应数据**:
```json
{
  "success": true
}
```

#### 2.9 获取分类列表
- **接口**: `GET /category/list`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "name": "string",
      "icon": "string",
      "sort": "number"
    }
  ]
}
```

#### 2.10 创建分类
- **接口**: `POST /admin/category`

**请求参数**:
```json
{
  "name": "string",
  "icon": "string",
  "sort": "number"
}
```

**响应数据**:
```json
{
  "id": "number"
}
```

#### 2.11 更新分类
- **接口**: `PUT /admin/category/{id}`

**请求参数**: 同创建分类

**响应数据**:
```json
{
  "success": true
}
```

#### 2.12 删除分类
- **接口**: `DELETE /admin/category/{id}`

**响应数据**:
```json
{
  "success": true
}

### 3. 品牌馆管理

> 对应用户端 `/brand/*` 接口

#### 3.1 获取品牌馆列表
- **接口**: `GET /admin/brand/list`

**请求参数** (Query):
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页数量 |
| keyword | string | 否 | 搜索关键词 |
| status | number | 否 | 状态筛选 |

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "name": "string",
      "logo": "string",
      "cover": "string",
      "status": "number",
      "designerCount": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 3.2 获取品牌馆详情
- **接口**: `GET /admin/brand/{id}`

**响应数据**:
```json
{
  "id": "number",
  "name": "string",
  "logo": "string",
  "cover": "string",
  "description": "string",
  "address": "string",
  "phone": "string",
  "status": "number",
  "designerCount": "number",
  "createTime": "string"
}
```

#### 3.3 创建品牌馆
- **接口**: `POST /admin/brand`

**请求参数**:
```json
{
  "name": "string",
  "logo": "string",
  "cover": "string",
  "description": "string",
  "address": "string",
  "phone": "string"
}
```

**响应数据**:
```json
{
  "id": "number"
}
```

#### 3.4 更新品牌馆
- **接口**: `PUT /admin/brand/{id}`

**请求参数**: 同创建品牌馆

**响应数据**:
```json
{
  "success": true
}
```

#### 3.5 删除品牌馆
- **接口**: `DELETE /admin/brand/{id}`

**响应数据**:
```json
{
  "success": true
}
```

#### 3.6 审核品牌馆
- **接口**: `POST /admin/brand/{id}/audit`

**请求参数**:
```json
{
  "status": "number",
  "reason": "string"
}
```

**响应数据**:
```json
{
  "success": true
}
```

#### 3.7 获取品牌馆设计师
- **接口**: `GET /brand/{id}/designers`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "name": "string",
      "avatar": "string",
      "level": "string"
    }
  ],
  "total": "number"
}
```

#### 3.8 获取品牌馆服务
- **接口**: `GET /brand/{id}/services`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "name": "string",
      "price": "number",
      "duration": "number"
    }
  ],
  "total": "number"
}
```

### 4. 用户管理

> 对应用户端 `/user/*` 接口

#### 4.1 获取用户列表
- **接口**: `GET /admin/user/list`

**请求参数** (Query):
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页数量 |
| keyword | string | 否 | 搜索关键词 |
| status | number | 否 | 状态筛选 |

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "nickname": "string",
      "avatar": "string",
      "phone": "string",
      "status": "number",
      "orderCount": "number",
      "totalAmount": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 4.2 获取用户详情
- **接口**: `GET /admin/user/{id}`

**响应数据**:
```json
{
  "id": "number",
  "nickname": "string",
  "avatar": "string",
  "phone": "string",
  "gender": "number",
  "birthday": "string",
  "status": "number",
  "vipLevel": "number",
  "vipExpireTime": "string",
  "orderCount": "number",
  "totalAmount": "number",
  "createTime": "string"
}
```

#### 4.3 禁用用户
- **接口**: `POST /admin/user/{id}/disable`

**响应数据**:
```json
{
  "success": true
}
```

#### 4.4 启用用户
- **接口**: `POST /admin/user/{id}/enable`

**响应数据**:
```json
{
  "success": true
}
```

#### 4.5 获取用户资产
- **接口**: `GET /admin/user/{id}/asset`

**响应数据**:
```json
{
  "balance": "number",
  "points": "number",
  "couponCount": "number"
}
```

#### 4.6 获取用户订单
- **接口**: `GET /admin/user/{id}/orders`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "orderNo": "string",
      "amount": "number",
      "status": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 4.7 获取用户收藏
- **接口**: `GET /admin/user/{id}/favorites`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "type": "string",
      "targetId": "number",
      "targetName": "string",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 4.8 获取VIP信息
- **接口**: `GET /admin/user/{id}/vip`

**响应数据**:
```json
{
  "vipLevel": "number",
  "vipName": "string",
  "expireTime": "string",
  "benefits": ["string"]
}
```

#### 4.9 设置VIP
- **接口**: `POST /admin/user/{id}/vip`

**请求参数**:
```json
{
  "vipLevel": "number",
  "expiryDate": "string"
}
```

**响应数据**:
```json
{
  "success": true
}

### 5. 作品集管理

> 对应用户端 `/portfolio/*` 接口

#### 5.1 获取作品列表
- **接口**: `GET /admin/portfolio/list`

**请求参数** (Query):
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页数量 |
| status | number | 否 | 状态筛选 |

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "title": "string",
      "images": ["string"],
      "designerId": "number",
      "designerName": "string",
      "status": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 5.2 获取作品详情
- **接口**: `GET /admin/portfolio/{id}`

**响应数据**:
```json
{
  "id": "number",
  "title": "string",
  "description": "string",
  "images": ["string"],
  "designerId": "number",
  "designerName": "string",
  "categoryId": "number",
  "categoryName": "string",
  "status": "number",
  "viewCount": "number",
  "likeCount": "number",
  "createTime": "string"
}
```

#### 5.3 审核作品
- **接口**: `POST /admin/portfolio/{id}/audit`

**请求参数**:
```json
{
  "status": "number",
  "reason": "string"
}
```

**响应数据**:
```json
{
  "success": true
}
```

#### 5.4 删除作品
- **接口**: `DELETE /admin/portfolio/{id}`

**响应数据**:
```json
{
  "success": true
}
```

#### 5.5 获取作品分类
- **接口**: `GET /portfolio/categories`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "name": "string"
    }
  ]
}

---

## 三、商家端数据管理

### 6. 商家管理

> 对应商家端认证模块

#### 6.1 获取商家列表
- **接口**: `GET /admin/merchant/list`

**请求参数** (Query):
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页数量 |
| keyword | string | 否 | 搜索关键词 |
| status | number | 否 | 状态筛选 |

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "name": "string",
      "phone": "string",
      "status": "number",
      "storeCount": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 6.2 获取商家详情
- **接口**: `GET /admin/merchant/{id}`

**响应数据**:
```json
{
  "id": "number",
  "name": "string",
  "phone": "string",
  "idCard": "string",
  "businessLicense": "string",
  "status": "number",
  "storeCount": "number",
  "createTime": "string"
}
```

#### 6.3 审核商家
- **接口**: `POST /admin/merchant/{id}/audit`

**请求参数**:
```json
{
  "status": "number",
  "reason": "string"
}
```

**响应数据**:
```json
{
  "success": true
}
```

#### 6.4 禁用商家
- **接口**: `POST /admin/merchant/{id}/disable`

**响应数据**:
```json
{
  "success": true
}
```

#### 6.5 启用商家
- **接口**: `POST /admin/merchant/{id}/enable`

**响应数据**:
```json
{
  "success": true
}
```

#### 6.6 获取认证申请列表
- **接口**: `GET /admin/merchant/auth/list`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "merchantId": "number",
      "merchantName": "string",
      "status": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 6.7 审核认证申请
- **接口**: `POST /admin/merchant/auth/{id}/audit`

**请求参数**:
```json
{
  "status": "number",
  "reason": "string"
}
```

**响应数据**:
```json
{
  "success": true
}

### 7. 店铺管理

> 对应商家端 `/shop/*` 接口

#### 7.1 获取店铺列表
- **接口**: `GET /admin/store/list`

**请求参数** (Query):
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页数量 |
| keyword | string | 否 | 搜索关键词 |
| status | number | 否 | 状态筛选 |

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "name": "string",
      "logo": "string",
      "address": "string",
      "phone": "string",
      "status": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 7.2 获取店铺详情
- **接口**: `GET /admin/store/{id}`

**响应数据**:
```json
{
  "id": "number",
  "name": "string",
  "logo": "string",
  "cover": "string",
  "address": "string",
  "phone": "string",
  "businessHours": "string",
  "description": "string",
  "status": "number",
  "merchantId": "number",
  "createTime": "string"
}
```

#### 7.3 创建店铺
- **接口**: `POST /admin/store`

**请求参数**:
```json
{
  "name": "string",
  "logo": "string",
  "cover": "string",
  "address": "string",
  "phone": "string",
  "businessHours": "string",
  "description": "string",
  "merchantId": "number"
}
```

**响应数据**:
```json
{
  "id": "number"
}
```

#### 7.4 更新店铺
- **接口**: `PUT /admin/store/{id}`

**请求参数**: 同创建店铺

**响应数据**:
```json
{
  "success": true
}
```

#### 7.5 删除店铺
- **接口**: `DELETE /admin/store/{id}`

**响应数据**:
```json
{
  "success": true
}
```

#### 7.6 获取连锁店列表
- **接口**: `GET /admin/store/chain/list`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "name": "string",
      "storeCount": "number"
    }
  ],
  "total": "number"
}
```

#### 7.7 开启店铺
- **接口**: `POST /admin/store/{id}/open`

**响应数据**:
```json
{
  "success": true
}
```

#### 7.8 关闭店铺
- **接口**: `POST /admin/store/{id}/close`

**请求参数**:
```json
{
  "reason": "string"
}
```

**响应数据**:
```json
{
  "success": true
}

### 8. 技师管理

> 对应商家端 `/technician/*` 接口

#### 8.1 获取技师列表
- **接口**: `GET /admin/technician/list`

**请求参数** (Query):
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页数量 |
| keyword | string | 否 | 搜索关键词 |
| status | number | 否 | 状态筛选 |

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "name": "string",
      "avatar": "string",
      "phone": "string",
      "level": "string",
      "status": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 8.2 获取技师详情
- **接口**: `GET /admin/technician/{id}`

**响应数据**:
```json
{
  "id": "number",
  "name": "string",
  "avatar": "string",
  "phone": "string",
  "gender": "number",
  "level": "string",
  "position": "string",
  "introduction": "string",
  "status": "number",
  "storeId": "number",
  "storeName": "string",
  "createTime": "string"
}
```

#### 8.3 创建技师
- **接口**: `POST /admin/technician`

**请求参数**:
```json
{
  "name": "string",
  "avatar": "string",
  "phone": "string",
  "gender": "number",
  "level": "string",
  "position": "string",
  "introduction": "string",
  "storeId": "number"
}
```

**响应数据**:
```json
{
  "id": "number"
}
```

#### 8.4 更新技师
- **接口**: `PUT /admin/technician/{id}`

**请求参数**: 同创建技师

**响应数据**:
```json
{
  "success": true
}
```

#### 8.5 删除技师
- **接口**: `DELETE /admin/technician/{id}`

**响应数据**:
```json
{
  "success": true
}
```

#### 8.6 审核技师
- **接口**: `POST /admin/technician/{id}/audit`

**请求参数**:
```json
{
  "status": "number",
  "reason": "string"
}
```

**响应数据**:
```json
{
  "success": true
}
```

#### 8.7 获取技师业绩
- **接口**: `GET /admin/technician/{id}/performance`

**请求参数** (Query):
| 参数 | 类型 | 说明 |
|------|------|------|
| startDate | string | 开始日期 |
| endDate | string | 结束日期 |

**响应数据**:
```json
{
  "orderCount": "number",
  "totalAmount": "number",
  "avgRating": "number"
}
```

#### 8.8 获取技师订单
- **接口**: `GET /admin/technician/{id}/orders`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "orderNo": "string",
      "amount": "number",
      "status": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 8.9 获取技师评价
- **接口**: `GET /admin/technician/{id}/reviews`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "rating": "number",
      "content": "string",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 8.10 获取技师类型
- **接口**: `GET /admin/technician/types`

**响应数据**:
```json
{
  "list": [{"id": "number", "name": "string"}]
}
```

#### 8.11 获取职位列表
- **接口**: `GET /admin/technician/positions`

**响应数据**:
```json
{
  "list": [{"id": "number", "name": "string"}]
}
```

#### 8.12 获取等级列表
- **接口**: `GET /admin/technician/levels`

**响应数据**:
```json
{
  "list": [{"id": "number", "name": "string"}]
}

### 9. 员工管理

> 对应商家端 `/staff/*` 接口

#### 9.1 获取员工列表
- **接口**: `GET /admin/staff/list`

**请求参数** (Query):
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页数量 |
| keyword | string | 否 | 搜索关键词 |
| status | number | 否 | 状态筛选 |

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "name": "string",
      "phone": "string",
      "role": "string",
      "status": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 9.2 获取员工详情
- **接口**: `GET /admin/staff/{id}`

**响应数据**:
```json
{
  "id": "number",
  "name": "string",
  "phone": "string",
  "roleId": "number",
  "roleName": "string",
  "status": "number",
  "storeId": "number",
  "createTime": "string"
}
```

#### 9.3 创建员工
- **接口**: `POST /admin/staff`

**请求参数**:
```json
{
  "name": "string",
  "phone": "string",
  "roleId": "number",
  "storeId": "number"
}
```

**响应数据**:
```json
{
  "id": "number"
}
```

#### 9.4 更新员工
- **接口**: `PUT /admin/staff/{id}`

**请求参数**: 同创建员工

**响应数据**:
```json
{
  "success": true
}
```

#### 9.5 删除员工
- **接口**: `DELETE /admin/staff/{id}`

**响应数据**:
```json
{
  "success": true
}
```

#### 9.6 启用员工
- **接口**: `POST /admin/staff/{id}/enable`

**响应数据**:
```json
{
  "success": true
}
```

#### 9.7 停用员工
- **接口**: `POST /admin/staff/{id}/disable`

**响应数据**:
```json
{
  "success": true
}
```

#### 9.8 获取员工角色
- **接口**: `GET /admin/staff/roles`

**响应数据**:
```json
{
  "list": [{"id": "number", "name": "string"}]
}

### 10. 顾客管理

> 对应商家端 `/customer/*` 接口

#### 10.1 获取顾客列表
- **接口**: `GET /admin/customer/list`

**请求参数** (Query):
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页数量 |
| keyword | string | 否 | 搜索关键词 |

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "name": "string",
      "phone": "string",
      "visitCount": "number",
      "totalAmount": "number",
      "lastVisitTime": "string"
    }
  ],
  "total": "number"
}
```

#### 10.2 获取顾客详情
- **接口**: `GET /admin/customer/{id}`

**响应数据**:
```json
{
  "id": "number",
  "name": "string",
  "phone": "string",
  "gender": "number",
  "birthday": "string",
  "tags": ["string"],
  "visitCount": "number",
  "totalAmount": "number",
  "lastVisitTime": "string"
}
```

#### 10.3 获取顾客档案
- **接口**: `GET /admin/customer/{id}/profile`

**响应数据**:
```json
{
  "hairType": "string",
  "scalpCondition": "string",
  "allergies": ["string"],
  "preferences": "string",
  "notes": "string"
}
```

#### 10.4 获取服务记录
- **接口**: `GET /admin/customer/{id}/services`

**请求参数** (Query):
| 参数 | 类型 | 说明 |
|------|------|------|
| page | number | 页码 |
| pageSize | number | 每页数量 |
| startDate | string | 开始日期 |
| endDate | string | 结束日期 |

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "serviceName": "string",
      "technicianName": "string",
      "amount": "number",
      "serviceTime": "string"
    }
  ],
  "total": "number"
}
```

#### 10.5 获取消费记录
- **接口**: `GET /admin/customer/{id}/transactions`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "type": "string",
      "amount": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 10.6 获取标签列表
- **接口**: `GET /admin/customer/tags`

**响应数据**:
```json
{
  "list": [{"id": "number", "name": "string", "color": "string"}]
}
```

#### 10.7 创建标签
- **接口**: `POST /admin/customer/tags`

**请求参数**:
```json
{
  "name": "string",
  "color": "string"
}
```

**响应数据**:
```json
{
  "id": "number"
}
```

#### 10.8 删除标签
- **接口**: `DELETE /admin/customer/tags/{id}`

**响应数据**:
```json
{
  "success": true
}
```

#### 10.9 获取顾客统计
- **接口**: `GET /admin/customer/stats`

**响应数据**:
```json
{
  "totalCount": "number",
  "newCount": "number",
  "activeCount": "number"
}
```

#### 10.10 获取增长趋势
- **接口**: `GET /admin/customer/growth-trend`

**响应数据**:
```json
{
  "list": [{"date": "string", "count": "number"}]
}

---

## 四、订单管理

> 对应用户端 `/order/*` 和商家端 `/order/*` 接口

#### 11.1 获取订单列表
- **接口**: `GET /admin/order/list`

**请求参数** (Query):
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页数量 |
| status | number | 否 | 订单状态 |
| orderNo | string | 否 | 订单号 |
| startDate | string | 否 | 开始日期 |
| endDate | string | 否 | 结束日期 |
| userId | string | 否 | 用户ID |
| merchantId | string | 否 | 商家ID |
| storeId | string | 否 | 店铺ID |

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "orderNo": "string",
      "userId": "number",
      "userName": "string",
      "storeId": "number",
      "storeName": "string",
      "amount": "number",
      "status": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 11.2 获取订单详情
- **接口**: `GET /admin/order/{id}`

**响应数据**:
```json
{
  "id": "number",
  "orderNo": "string",
  "userId": "number",
  "userName": "string",
  "userPhone": "string",
  "storeId": "number",
  "storeName": "string",
  "technicianId": "number",
  "technicianName": "string",
  "services": [
    {"id": "number", "name": "string", "price": "number"}
  ],
  "amount": "number",
  "payAmount": "number",
  "discountAmount": "number",
  "status": "number",
  "appointmentTime": "string",
  "createTime": "string",
  "payTime": "string",
  "completeTime": "string"
}
```

#### 11.3 更新订单状态
- **接口**: `POST /admin/order/{id}/status`

**请求参数**:
```json
{
  "status": "number"
}
```

**响应数据**:
```json
{
  "success": true
}
```

#### 11.4 获取退款列表
- **接口**: `GET /admin/order/refund/list`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "orderNo": "string",
      "amount": "number",
      "reason": "string",
      "status": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 11.5 获取退款详情
- **接口**: `GET /admin/order/refund/{id}`

**响应数据**:
```json
{
  "id": "number",
  "orderId": "number",
  "orderNo": "string",
  "amount": "number",
  "reason": "string",
  "status": "number",
  "createTime": "string"
}
```

#### 11.6 处理退款
- **接口**: `POST /admin/order/refund/{id}/handle`

**请求参数**:
```json
{
  "status": "number",
  "reason": "string"
}
```

**响应数据**:
```json
{
  "success": true
}
```

#### 11.7 获取订单统计
- **接口**: `GET /admin/order/statistics`

**响应数据**:
```json
{
  "totalCount": "number",
  "totalAmount": "number",
  "todayCount": "number",
  "todayAmount": "number"
}
```

#### 11.8 获取订单趋势
- **接口**: `GET /admin/order/trend`

**响应数据**:
```json
{
  "list": [{"date": "string", "count": "number", "amount": "number"}]
}
```

#### 11.9 获取各状态订单数
- **接口**: `GET /admin/order/count-by-status`

**响应数据**:
```json
{
  "pending": "number",
  "paid": "number",
  "completed": "number",
  "cancelled": "number",
  "refunding": "number"
}
```

#### 11.10 导出订单数据
- **接口**: `GET /admin/order/export`

**响应**: 返回 Excel 文件 (Blob)

---

## 五、营销管理

### 11. 优惠券管理

> 对应商家端 `/coupon/*` 接口

#### 12.1 获取优惠券列表
- **接口**: `GET /admin/coupon/list`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "name": "string",
      "type": "number",
      "value": "number",
      "status": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 12.2 获取优惠券详情
- **接口**: `GET /admin/coupon/{id}`

**响应数据**:
```json
{
  "id": "number",
  "name": "string",
  "type": "number",
  "value": "number",
  "minAmount": "number",
  "totalCount": "number",
  "receivedCount": "number",
  "usedCount": "number",
  "startTime": "string",
  "endTime": "string",
  "status": "number"
}
```

#### 12.3 创建优惠券
- **接口**: `POST /admin/coupon`

**请求参数**:
```json
{
  "name": "string",
  "type": "number",
  "value": "number",
  "minAmount": "number",
  "totalCount": "number",
  "startTime": "string",
  "endTime": "string"
}
```

**响应数据**:
```json
{
  "id": "number"
}
```

#### 12.4 更新优惠券
- **接口**: `PUT /admin/coupon/{id}`

**请求参数**: 同创建优惠券

**响应数据**:
```json
{
  "success": true
}
```

#### 12.5 删除优惠券
- **接口**: `DELETE /admin/coupon/{id}`

**响应数据**:
```json
{
  "success": true
}
```

#### 12.6 开始发放
- **接口**: `POST /admin/coupon/{id}/start`

**响应数据**:
```json
{
  "success": true
}
```

#### 12.7 停止发放
- **接口**: `POST /admin/coupon/{id}/stop`

**响应数据**:
```json
{
  "success": true
}
```

#### 12.8 获取领取记录
- **接口**: `GET /admin/coupon/{id}/receives`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "userId": "number",
      "userName": "string",
      "receiveTime": "string",
      "useTime": "string",
      "status": "number"
    }
  ],
  "total": "number"
}
```

#### 12.9 获取使用统计
- **接口**: `GET /admin/coupon/{id}/stats`

**响应数据**:
```json
{
  "receivedCount": "number",
  "usedCount": "number",
  "usedAmount": "number"
}

### 12. 分销管理

> 对应商家端 `/distribution/*` 接口

#### 13.1 获取分销设置
- **接口**: `GET /admin/distribution/settings`

**响应数据**:
```json
{
  "enabled": "boolean",
  "commissionRate": "number",
  "minWithdrawAmount": "number"
}
```

#### 13.2 更新分销设置
- **接口**: `PUT /admin/distribution/settings`

**请求参数**:
```json
{
  "enabled": "boolean",
  "commissionRate": "number",
  "minWithdrawAmount": "number"
}
```

**响应数据**:
```json
{
  "success": true
}
```

#### 13.3 获取分销商列表
- **接口**: `GET /admin/distribution/distributors`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "name": "string",
      "phone": "string",
      "totalCommission": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 13.4 获取佣金记录
- **接口**: `GET /admin/distribution/commissions`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "distributorId": "number",
      "orderId": "number",
      "amount": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 13.5 获取支出明细
- **接口**: `GET /admin/distribution/expenses`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "type": "string",
      "amount": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}

---

## 六、财务管理

> 对应商家端 `/finance/*` 接口

#### 14.1 获取财务概览
- **接口**: `GET /admin/finance/overview`

**响应数据**:
```json
{
  "totalIncome": "number",
  "todayIncome": "number",
  "pendingWithdraw": "number",
  "pendingSettle": "number"
}
```

#### 14.2 获取提现列表
- **接口**: `GET /admin/finance/withdraw/list`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "merchantName": "string",
      "amount": "number",
      "status": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 14.3 获取提现详情
- **接口**: `GET /admin/finance/withdraw/{id}`

**响应数据**:
```json
{
  "id": "number",
  "merchantId": "number",
  "merchantName": "string",
  "amount": "number",
  "bankName": "string",
  "bankAccount": "string",
  "status": "number",
  "createTime": "string"
}
```

#### 14.4 处理提现
- **接口**: `POST /admin/finance/withdraw/{id}/handle`

**请求参数**:
```json
{
  "status": "number",
  "reason": "string"
}
```

**响应数据**:
```json
{
  "success": true
}
```

#### 14.5 获取结算列表
- **接口**: `GET /admin/finance/settlement/list`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "merchantName": "string",
      "amount": "number",
      "status": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 14.6 获取结算详情
- **接口**: `GET /admin/finance/settlement/{id}`

**响应数据**:
```json
{
  "id": "number",
  "merchantId": "number",
  "merchantName": "string",
  "amount": "number",
  "status": "number",
  "createTime": "string"
}
```

#### 14.7 执行结算
- **接口**: `POST /admin/finance/settlement/{id}/settle`

**响应数据**:
```json
{
  "success": true
}
```

#### 14.8 批量结算
- **接口**: `POST /admin/finance/settlement/batch-settle`

**请求参数**:
```json
{
  "ids": ["number"]
}
```

**响应数据**:
```json
{
  "success": true
}
```

#### 14.9 获取收入明细
- **接口**: `GET /admin/finance/income/list`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "type": "string",
      "amount": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 14.10 获取交易明细
- **接口**: `GET /admin/finance/transaction/list`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "type": "string",
      "amount": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 14.11 获取财务统计
- **接口**: `GET /admin/finance/stats`

**响应数据**:
```json
{
  "totalIncome": "number",
  "totalWithdraw": "number",
  "totalSettle": "number"
}
```

#### 14.12 导出提现数据
- **接口**: `GET /admin/finance/withdraw/export`

**响应**: 返回 Excel 文件 (Blob)

#### 14.13 导出结算数据
- **接口**: `GET /admin/finance/settlement/export`

**响应**: 返回 Excel 文件 (Blob)

---

## 七、数据统计

> 对应商家端 `/data/*` 接口

#### 15.1 获取数据总览
- **接口**: `GET /admin/stats/overview`

**响应数据**:
```json
{
  "totalUsers": "number",
  "totalOrders": "number",
  "totalIncome": "number",
  "totalMerchants": "number"
}
```

#### 15.2 获取订单统计
- **接口**: `GET /admin/stats/order`

**响应数据**:
```json
{
  "totalCount": "number",
  "todayCount": "number",
  "weekCount": "number",
  "monthCount": "number"
}
```

#### 15.3 获取收入统计
- **接口**: `GET /admin/stats/income`

**响应数据**:
```json
{
  "totalAmount": "number",
  "todayAmount": "number",
  "weekAmount": "number",
  "monthAmount": "number"
}
```

#### 15.4 获取用户统计
- **接口**: `GET /admin/stats/user`

**响应数据**:
```json
{
  "totalCount": "number",
  "todayNew": "number",
  "weekNew": "number",
  "monthNew": "number"
}
```

#### 15.5 获取商家统计
- **接口**: `GET /admin/stats/merchant`

**响应数据**:
```json
{
  "totalCount": "number",
  "activeCount": "number"
}
```

#### 15.6 获取服务统计
- **接口**: `GET /admin/stats/service`

**响应数据**:
```json
{
  "totalCount": "number",
  "hotServices": [{"id": "number", "name": "string", "count": "number"}]
}
```

#### 15.7 获取趋势分析
- **接口**: `GET /admin/stats/trend/{type}`

**路径参数**: type = order | income | user

**响应数据**:
```json
{
  "list": [{"date": "string", "value": "number"}]
}

---

## 八、系统管理

### 管理员管理

#### 16.1 获取管理员列表
- **接口**: `GET /admin/system/admin/list`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "username": "string",
      "nickname": "string",
      "role": "string",
      "status": "number",
      "createTime": "string"
    }
  ],
  "total": "number"
}
```

#### 16.2 获取管理员详情
- **接口**: `GET /admin/system/admin/{id}`

**响应数据**:
```json
{
  "id": "number",
  "username": "string",
  "nickname": "string",
  "roleId": "number",
  "status": "number",
  "createTime": "string"
}
```

#### 16.3 创建管理员
- **接口**: `POST /admin/system/admin`

**请求参数**:
```json
{
  "username": "string",
  "password": "string",
  "nickname": "string",
  "roleId": "number"
}
```

**响应数据**:
```json
{
  "id": "number"
}
```

#### 16.4 更新管理员
- **接口**: `PUT /admin/system/admin/{id}`

**请求参数**: 同创建管理员（不含password）

**响应数据**:
```json
{
  "success": true
}
```

#### 16.5 删除管理员
- **接口**: `DELETE /admin/system/admin/{id}`

**响应数据**:
```json
{
  "success": true
}
```

#### 16.6 重置密码
- **接口**: `POST /admin/system/admin/{id}/reset-password`

**响应数据**:
```json
{
  "newPassword": "string"
}

### 角色管理

#### 17.1 获取角色列表
- **接口**: `GET /admin/system/role/list`

**响应数据**:
```json
{
  "list": [{"id": "number", "name": "string", "permissions": ["string"]}]
}
```

#### 17.2 创建角色
- **接口**: `POST /admin/system/role`

**请求参数**:
```json
{
  "name": "string",
  "permissions": ["string"]
}
```

**响应数据**:
```json
{
  "id": "number"
}
```

#### 17.3 更新角色
- **接口**: `PUT /admin/system/role/{id}`

**请求参数**: 同创建角色

**响应数据**:
```json
{
  "success": true
}
```

#### 17.4 删除角色
- **接口**: `DELETE /admin/system/role/{id}`

**响应数据**:
```json
{
  "success": true
}
```

#### 17.5 获取权限列表
- **接口**: `GET /admin/system/permissions`

**响应数据**:
```json
{
  "list": [{"id": "string", "name": "string", "children": []}]
}

### 系统配置

#### 18.1 获取系统配置
- **接口**: `GET /admin/system/config`

**响应数据**:
```json
{
  "siteName": "string",
  "logo": "string",
  "servicePhone": "string",
  "serviceEmail": "string"
}
```

#### 18.2 更新系统配置
- **接口**: `PUT /admin/system/config`

**请求参数**: 同获取系统配置

**响应数据**:
```json
{
  "success": true
}

### 轮播图管理

> 对应用户端 `/common/banner` 接口

#### 19.1 获取轮播图列表
- **接口**: `GET /admin/system/banner/list`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "image": "string",
      "link": "string",
      "sort": "number",
      "status": "number"
    }
  ],
  "total": "number"
}
```

#### 19.2 获取轮播图详情
- **接口**: `GET /admin/system/banner/{id}`

**响应数据**:
```json
{
  "id": "number",
  "image": "string",
  "link": "string",
  "sort": "number",
  "status": "number"
}
```

#### 19.3 创建轮播图
- **接口**: `POST /admin/system/banner`

**请求参数**:
```json
{
  "image": "string",
  "link": "string",
  "sort": "number"
}
```

**响应数据**:
```json
{
  "id": "number"
}
```

#### 19.4 更新轮播图
- **接口**: `PUT /admin/system/banner/{id}`

**请求参数**: 同创建轮播图

**响应数据**:
```json
{
  "success": true
}
```

#### 19.5 删除轮播图
- **接口**: `DELETE /admin/system/banner/{id}`

**响应数据**:
```json
{
  "success": true
}
```

### 操作日志

#### 20.1 获取操作日志
- **接口**: `GET /admin/system/log/list`

**响应数据**:
```json
{
  "list": [
    {
      "id": "number",
      "adminName": "string",
      "action": "string",
      "ip": "string",
      "createTime": "string"
    }
  ],
  "total": "number"
}

---

## 九、通用接口

> 与用户端、商家端共用

#### 21.1 获取应用配置
- **接口**: `GET /common/config`

**响应数据**:
```json
{
  "siteName": "string",
  "logo": "string",
  "servicePhone": "string"
}
```

#### 21.2 获取地区列表
- **接口**: `GET /common/regions`

**请求参数** (Query):
| 参数 | 类型 | 说明 |
|------|------|------|
| parentId | number | 父级ID，不传则获取省份 |

**响应数据**:
```json
{
  "list": [{"id": "number", "name": "string"}]
}
```

#### 21.3 获取热门城市
- **接口**: `GET /common/hot-cities`

**响应数据**:
```json
{
  "list": [{"id": "number", "name": "string"}]
}
```

#### 21.4 获取银行列表
- **接口**: `GET /common/banks`

**响应数据**:
```json
{
  "list": [{"id": "number", "name": "string", "logo": "string"}]
}
```

#### 21.5 上传文件
- **接口**: `POST /common/upload`

**请求参数**: FormData
| 参数 | 类型 | 说明 |
|------|------|------|
| file | File | 文件 |

**响应数据**:
```json
{
  "url": "string"
}
```

#### 21.6 批量上传图片
- **接口**: `POST /common/upload/images`

**请求参数**: FormData
| 参数 | 类型 | 说明 |
|------|------|------|
| files[] | File[] | 图片数组 |

**响应数据**:
```json
{
  "urls": ["string"]
}

---

## 状态码说明

| code | 说明 |
|------|------|
| 0/200 | 成功 |
| 400 | 参数错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 500 | 服务器错误 |

---

## 接口关联说明

管理后台的接口设计遵循以下原则：

1. **统一前缀**: 管理后台专用接口使用 `/admin` 前缀
2. **数据共享**: 管理后台可以查看和管理用户端、商家端的所有数据
3. **权限控制**: 管理后台拥有最高权限，可以进行审核、禁用等操作
4. **通用接口复用**: 地区、银行、上传等通用接口与客户端共用
