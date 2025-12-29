# WAW TrendHub 后端接口开发文档

> 本文档列出前端需要但后端尚未实现的接口，请后端开发人员参考实现。
>
> **Base URL**: `https://bioflex.cn/api`
>
> **通用响应格式**:
> ```json
> {
>   "code": 200,
>   "message": "success",
>   "data": { ... }
> }
> ```

---

## 一、设计师模块 `/designer`

### 1.1 获取设计师评价列表 ⚠️ 404

**接口路径**: `GET /designer/{designerId}/reviews`

**说明**: 获取指定设计师的用户评价列表

**路径参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| designerId | string | 是 | 设计师ID (UUID格式，无连字符) |

**查询参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码，默认1 |
| pageSize | number | 否 | 每页数量，默认10 |
| reviewType | string | 否 | 评价类型筛选 |

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": "review_001",
        "userName": "用户昵称",
        "userAvatar": "https://example.com/avatar.png",
        "rating": 5,
        "time": "2025-01-15",
        "content": "服务很好，发型设计得很满意！",
        "images": ["https://example.com/img1.png"],
        "reply": "感谢您的好评！",
        "tags": ["服务好", "技术专业"]
      }
    ],
    "total": 100,
    "page": 1,
    "pageSize": 10,
    "ratingStats": {
      "overall": 4.8,
      "level": "优秀",
      "totalCount": 100,
      "categories": [
        { "label": "全部", "count": 100 },
        { "label": "好评", "count": 90 },
        { "label": "中评", "count": 8 },
        { "label": "差评", "count": 2 }
      ],
      "filterTags": ["服务好", "技术专业", "环境好", "价格合理"]
    }
  }
}
```

---

### 1.2 获取设计师服务列表 ⚠️ 待确认

**接口路径**: `GET /designer/{designerId}/services`

**说明**: 获取指定设计师提供的服务列表

**路径参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| designerId | string | 是 | 设计师ID (UUID格式) |

**查询参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码，默认1 |
| pageSize | number | 否 | 每页数量，默认10 |

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": "service_001",
        "name": "精致剪发",
        "price": 99,
        "originalPrice": 128,
        "image": "https://example.com/service.png",
        "description": "专业剪发服务",
        "duration": 45,
        "soldCount": 2356
      }
    ],
    "total": 20
  }
}
```

---

### 1.3 获取设计师作品列表 ⚠️ 待确认

**接口路径**: `GET /designer/{designerId}/works`

**说明**: 获取指定设计师的作品集

**路径参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| designerId | string | 是 | 设计师ID (UUID格式) |

**查询参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码，默认1 |
| pageSize | number | 否 | 每页数量，默认10 |

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": "work_001",
        "title": "时尚短发造型",
        "coverImage": "https://example.com/work.png",
        "images": ["https://example.com/img1.png"],
        "likeCount": 128,
        "viewCount": 1000,
        "createTime": "2025-01-10"
      }
    ],
    "total": 50
  }
}
```

---

### 1.4 获取设计师可预约时间 ⚠️ 待确认

**接口路径**: `GET /designer/{designerId}/available-time`

**说明**: 获取设计师指定日期的可预约时间段

**路径参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| designerId | string | 是 | 设计师ID (UUID格式) |

**查询参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| date | string | 是 | 日期 (YYYY-MM-DD) |

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "date": "2025-01-20",
    "timeSlots": [
      { "time": "09:00", "available": true },
      { "time": "10:00", "available": true },
      { "time": "11:00", "available": false },
      { "time": "14:00", "available": true },
      { "time": "15:00", "available": true }
    ]
  }
}
```

---

### 1.5 设计师预约 ⚠️ 待确认

**接口路径**: `POST /designer/{designerId}/appointment`

**说明**: 预约设计师服务

**路径参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| designerId | string | 是 | 设计师ID (UUID格式) |

**请求体**:
```json
{
  "serviceId": "service_001",
  "date": "2025-01-20",
  "time": "14:00",
  "remark": "备注信息"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "预约成功",
  "data": {
    "appointmentId": "apt_001",
    "status": "pending"
  }
}
```

---

### 1.6 关注/取消关注设计师 ⚠️ 待确认

**关注**: `POST /designer/{designerId}/follow`

**取消关注**: `POST /designer/{designerId}/unfollow`

**响应示例**:
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "followed": true
  }
}
```

---

### 1.7 收藏/取消收藏设计师 ⚠️ 待确认

**收藏**: `POST /designer/{designerId}/favorite`

**取消收藏**: `POST /designer/{designerId}/unfavorite`

**响应示例**:
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "favorited": true
  }
}
```

---

### 1.8 获取设计师档案信息 ⚠️ 新增

**接口路径**: `GET /designer/{designerId}/portfolio`

**说明**: 获取设计师详情页 portfolio-section 区域所需的数据，包括服务须知、服务特色、环境设施及常见问题

**路径参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| designerId | string | 是 | 设计师ID (UUID格式，无连字符，32位) |

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "serviceInfo": {
      "position": "店长",
      "title": "国家高级美发师",
      "specialties": ["男士油头", "女士烫发", "染发设计"],
      "workDays": "周二 - 周日",
      "workHours": "10:00-21:00",
      "experience": 12,
      "appointmentAdvance": "提前3小时"
    },
    "serviceFeatures": [
      {
        "title": "",
        "tags": ["全预约制", "免费茶点", "头皮检测", "免费停车", "烫染专业店", "免费修眉", "一对一服务", "免费按摩", "没有隐形消费", "可上门服务"]
      },
      {
        "title": "其他",
        "tags": ["不可携带宠物", "服务区不可吸烟"]
      }
    ],
    "environmentFacilities": [
      {
        "title": "",
        "tags": ["储物柜", "免费Wifi", "充电宝", "可看电视", "VIP专区", "沙发座"]
      },
      {
        "title": "通用设施",
        "tags": ["特定吸烟区", "电梯", "有停车位", "空调", "先进/刷卡支付"]
      }
    ],
    "questions": [
      "这边发质受损严重可以做什么项目呢?",
      "周末人多吗，需要提前预约吗?",
      "剪发大概需要多长时间?"
    ]
  }
}
```

**字段说明**:

| 字段路径 | 类型 | 说明 |
|----------|------|------|
| serviceInfo.position | string | 职位（如：店长、技术总监） |
| serviceInfo.title | string | 职称（如：国家高级美发师） |
| serviceInfo.specialties | array[string] | 擅长项目列表 |
| serviceInfo.workDays | string | 工作日期（如：周二 - 周日） |
| serviceInfo.workHours | string | 工作时间（如：10:00-21:00） |
| serviceInfo.experience | number | 从业年限 |
| serviceInfo.appointmentAdvance | string | 预约提前时间（如：提前3小时） |
| serviceFeatures | array | 服务特色分组列表 |
| serviceFeatures[].title | string | 分组标题，空字符串表示默认分组 |
| serviceFeatures[].tags | array[string] | 服务特色标签 |
| environmentFacilities | array | 环境设施分组列表 |
| environmentFacilities[].title | string | 分组标题，空字符串表示默认分组 |
| environmentFacilities[].tags | array[string] | 环境设施标签 |
| questions | array[string] | 常见问题列表（用于"问TA"板块） |

**数据库建议**:

建议新建 `designer_portfolio` 表存储档案信息：

```sql
CREATE TABLE designer_portfolio (
  id VARCHAR(36) PRIMARY KEY,
  designer_id VARCHAR(36) NOT NULL COMMENT '关联设计师ID',
  position VARCHAR(50) COMMENT '职位',
  title VARCHAR(100) COMMENT '职称',
  specialties TEXT COMMENT '擅长项目，JSON数组',
  work_days VARCHAR(50) COMMENT '工作日期',
  work_hours VARCHAR(50) COMMENT '工作时间',
  experience INT COMMENT '从业年限',
  appointment_advance VARCHAR(50) COMMENT '预约提前时间',
  service_features TEXT COMMENT '服务特色，JSON格式',
  environment_facilities TEXT COMMENT '环境设施，JSON格式',
  questions TEXT COMMENT '常见问题，JSON数组',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (designer_id) REFERENCES designers(id)
);
```

---

## 二、作品集模块 `/portfolio`

### 2.1 获取作品列表 ⚠️ 待确认

**接口路径**: `GET /portfolio/list`

**查询参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页数量 |
| category | string | 否 | 分类筛选 |
| gender | string | 否 | 性别筛选 (men/women) |

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "list": [
      {
        "id": "work_001",
        "title": "时尚造型",
        "coverImage": "https://example.com/cover.png",
        "designerName": "张设计师",
        "designerAvatar": "https://example.com/avatar.png",
        "likeCount": 128,
        "category": "剪发"
      }
    ],
    "total": 100
  }
}
```

---

### 2.2 获取作品详情 ⚠️ 待确认

**接口路径**: `GET /portfolio/detail/{workId}`

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "id": "work_001",
    "title": "时尚短发造型",
    "images": ["https://example.com/img1.png"],
    "description": "作品描述",
    "designerId": "designer_001",
    "designerName": "张设计师",
    "designerAvatar": "https://example.com/avatar.png",
    "likeCount": 128,
    "viewCount": 1000,
    "isLiked": false,
    "createTime": "2025-01-10"
  }
}
```

---

## 三、品牌/门店模块 `/brand` `/shop`

### 3.1 获取品牌评价列表 ⚠️ 待确认

**接口路径**: `GET /brand/{brandId}/reviews`

**说明**: 获取指定品牌/门店的用户评价

**响应格式**: 同设计师评价列表

---

### 3.2 获取品牌设计师列表 ⚠️ 待确认

**接口路径**: `GET /brand/{brandId}/designers`

**说明**: 获取品牌下的设计师列表

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "list": [
      {
        "id": "designer_001",
        "name": "张设计师",
        "avatar": "https://example.com/avatar.png",
        "position": "首席设计师",
        "rating": 4.9,
        "workYears": 8
      }
    ],
    "total": 10
  }
}
```

---

## 四、服务模块 `/service`

### 4.1 获取服务详情 ⚠️ 待确认

**接口路径**: `GET /service/detail/{serviceId}`

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "id": "service_001",
    "name": "精致剪发",
    "price": 99,
    "originalPrice": 128,
    "images": ["https://example.com/img1.png"],
    "description": "服务详细描述",
    "duration": 45,
    "soldCount": 2356,
    "rating": 4.8,
    "reviewCount": 856,
    "designerId": "designer_001",
    "designerName": "张设计师",
    "designerAvatar": "https://example.com/avatar.png",
    "brandId": "brand_001",
    "brandName": "品牌名称"
  }
}
```

---

## 五、订单模块 `/order`

### 5.1 获取订单列表 ✅ 已实现

**接口路径**: `GET /order/list`

**说明**: 获取当前用户的订单列表，支持按状态筛选

**查询参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | string | 否 | 订单状态筛选，空字符串表示全部 |
| page | number | 否 | 页码，默认1 |
| pageSize | number | 否 | 每页数量，默认20 |

**订单状态值 (status)**:
| 状态值 | 说明 |
|--------|------|
| PENDING_PAYMENT | 待付款 |
| CONFIRMED | 已付款/待确认 |
| PENDING_USE | 待使用/待服务 |
| IN_SERVICE | 服务中 |
| COMPLETED | 已完成 |
| CANCELLED | 已取消 |
| REFUNDING | 退款中 |
| REFUNDED | 已退款 |

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": "order_001",
        "order_no": "20251227123456789",
        "status": "CONFIRMED",
        "service_name": "精致剪发",
        "service_image": "https://example.com/service.png",
        "sku_name": "男士短发",
        "duration": "预计1小时",
        "appointment_time": "2025-12-28 14:00",
        "designer_id": "designer_001",
        "designer_name": "张设计师",
        "designer_avatar": "https://example.com/avatar.png",
        "brand_name": "潮流造型",
        "shop_name": "旗舰店",
        "original_price": "128.00",
        "discount_amount": "29.00",
        "final_price": "99.00",
        "payment_expire_time": "2025-12-27T15:30:00",
        "create_time": "2025-12-27T15:00:00",
        "has_reviewed": false
      }
    ],
    "total": 10,
    "page": 1,
    "pageSize": 20
  }
}
```

**重要字段说明**:
| 字段 | 类型 | 说明 |
|------|------|------|
| payment_expire_time | string | 支付超时时间，仅待付款订单需要 |
| final_price | string | 实付金额 |
| has_reviewed | boolean | 是否已评价，已完成订单需要 |

---

### 5.2 获取订单详情 ✅ 已实现

**接口路径**: `GET /order/detail/{orderId}`

**说明**: 获取订单详细信息，包括退款相关信息

**路径参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| orderId | string | 是 | 订单ID |

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "order_001",
    "order_no": "20251227123456789",
    "status": "REFUNDING",
    "service_name": "精致剪发",
    "service_image": "https://example.com/service.png",
    "sku_name": "男士短发",
    "duration": "预计1小时",
    "appointment_time": "2025-12-28 14:00",
    "designer_id": "designer_001",
    "designer_name": "张设计师",
    "designer_avatar": "https://example.com/avatar.png",
    "brand_name": "潮流造型",
    "shop_name": "旗舰店",
    "original_price": "128.00",
    "discount_amount": "29.00",
    "final_price": "99.00",
    "payment_method": "wechat",
    "create_time": "2025-12-27T15:00:00",
    "pay_time": "2025-12-27T15:05:00",
    "refund_no": "RF20251227123456",
    "refund_reason": "不需要了",
    "refund_amount": "99.00",
    "refund_apply_time": "2025-12-27T16:00:00",
    "refund_complete_time": null
  }
}
```

**退款相关字段说明**:
| 字段 | 类型 | 说明 |
|------|------|------|
| refund_no | string | 退款编号，申请退款后生成 |
| refund_reason | string | 退款原因 |
| refund_amount | string | 退款金额 |
| refund_apply_time | string | 退款申请时间 |
| refund_complete_time | string | 退款完成时间，未完成时为null |

---

### 5.3 申请退款 ✅ 已实现

**接口路径**: `POST /order/refund/{orderId}`

**说明**: 用户申请订单退款，订单状态变更为 REFUNDING

**路径参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| orderId | string | 是 | 订单ID |

**请求体**:
```json
{
  "reason": "不需要了",
  "description": "补充说明（可选）"
}
```

**退款原因选项**:
- 店铺/商品信息问题
- 价格不划算
- 不需要了
- 重新购买
- 消费结果不满意
- 预约问题
- 商家要求改用其他方式/平台付款
- 商家无法提供服务

**响应示例**:
```json
{
  "code": 200,
  "message": "退款申请已提交",
  "data": {
    "refund_no": "RF20251227123456",
    "status": "REFUNDING",
    "refund_amount": "99.00",
    "refund_apply_time": "2025-12-27T16:00:00"
  }
}
```

**业务规则**:
1. 仅以下状态的订单可申请退款：CONFIRMED（已付款）、PENDING_USE（待使用）
2. 退款金额为实付金额（final_price）
3. 优惠券、M币等不可退还
4. 申请后订单状态变更为 REFUNDING

---

### 5.4 取消订单 ✅ 已实现

**接口路径**: `POST /order/cancel/{orderId}`

**说明**: 用户取消未支付的订单

**路径参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| orderId | string | 是 | 订单ID |

**请求体**:
```json
{
  "reason": "暂时不需要了"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "订单已取消",
  "data": {
    "status": "CANCELLED"
  }
}
```

**业务规则**:
1. 仅 PENDING_PAYMENT（待付款）状态可直接取消
2. 已付款订单需走退款流程

---

### 5.5 商家处理退款 ⚠️ 后台接口

**同意退款**: `POST /admin/order/refund/{orderId}/approve`

**拒绝退款**: `POST /admin/order/refund/{orderId}/reject`

**请求体（拒绝时）**:
```json
{
  "reason": "拒绝原因"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "status": "REFUNDED",
    "refund_complete_time": "2025-12-27T17:00:00"
  }
}
```

**业务规则**:
1. 同意退款后，订单状态变更为 REFUNDED，退款金额原路返回
2. 拒绝退款后，订单状态可根据业务需求处理（可恢复为原状态或保持特殊状态）

---

### 5.6 订单状态流转图

```
                    ┌─────────────────┐
                    │ PENDING_PAYMENT │ 待付款
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │ 支付成功     │              │ 超时/取消
              ▼              │              ▼
        ┌───────────┐        │        ┌───────────┐
        │ CONFIRMED │ 已确认 │        │ CANCELLED │ 已取消
        └─────┬─────┘        │        └───────────┘
              │              │
              │ 商家确认     │
              ▼              │
       ┌────────────┐        │
       │ PENDING_USE│ 待使用 │
       └─────┬──────┘        │
             │               │
    ┌────────┼────────┐      │
    │        │        │      │
    │ 申请   │ 开始   │      │
    │ 退款   │ 服务   │      │
    ▼        ▼        │      │
┌──────────┐ ┌────────────┐  │
│ REFUNDING│ │ IN_SERVICE │  │
│  退款中  │ │   服务中   │  │
└────┬─────┘ └─────┬──────┘  │
     │             │         │
     │ 商家同意    │ 服务完成│
     ▼             ▼         │
┌──────────┐  ┌───────────┐  │
│ REFUNDED │  │ COMPLETED │  │
│  已退款  │  │   已完成  │  │
└──────────┘  └───────────┘  │
                             │
```

---

## 六、优先级说明

### 高优先级 (影响核心功能)
1. ⚠️ `GET /designer/{id}/reviews` - 设计师评价列表 (当前404)
2. `GET /designer/{id}/services` - 设计师服务列表
3. `GET /designer/{id}/available-time` - 可预约时间
4. `POST /designer/{id}/appointment` - 预约接口
5. ⚠️ `GET /designer/{id}/portfolio` - 设计师档案信息 (新增)
6. ✅ `GET /order/list` - 订单列表（支持退款状态筛选）
7. ✅ `GET /order/detail/{id}` - 订单详情（含退款信息）
8. ✅ `POST /order/refund/{id}` - 申请退款
9. ⚠️ `POST /admin/order/refund/{id}/approve` - 商家同意退款（后台）
10. ⚠️ `POST /admin/order/refund/{id}/reject` - 商家拒绝退款（后台）

### 中优先级
11. `GET /designer/{id}/works` - 设计师作品
12. `GET /portfolio/list` - 作品集列表
13. `GET /brand/{id}/reviews` - 品牌评价
14. `GET /brand/{id}/designers` - 品牌设计师

### 低优先级
15. 关注/收藏相关接口
16. 其他辅助接口

---

## 七、注意事项

1. **ID格式**: 设计师ID使用UUID格式，无连字符（32位字符串）
   - 示例: `019400a3000170008000000000000007`
 
2. **分页参数**: 统一使用 `page` 和 `pageSize`

3. **认证**: 需要登录的接口请在Header中携带 `Authorization: Bearer {token}`

4. **错误码**:
   - 200: 成功
   - 400: 参数错误
   - 401: 未授权
   - 404: 资源不存在
   - 500: 服务器错误

---

*文档生成时间: 2025-12-27*
