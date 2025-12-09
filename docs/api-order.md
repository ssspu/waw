# 订单模块 API 文档

## 模块说明
订单模块包含订单列表、详情、创建、取消、评价等接口。

## 订单状态说明
| 状态值 | 说明 |
|--------|------|
| all | 全部 |
| pending_payment | 待付款 |
| confirmed | 已确认 |
| pending_use | 待使用 |
| completed | 已完成 |
| cancelled | 已取消 |

## 接口列表

### 1. 获取订单列表
**接口路径:** `GET /order/list`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| status | string | 否 | all | 订单状态 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "ORDER202401200001",
        "status": "pending_use",
        "statusText": "待使用",
        "serviceName": "精致剪发",
        "serviceImage": "https://example.com/service.png",
        "designerName": "李天天",
        "designerAvatar": "https://example.com/avatar.png",
        "brandName": "金龙大好人美发沙龙",
        "appointmentTime": "2024-01-20 14:00",
        "price": 99,
        "createTime": "2024-01-18 10:30:00"
      }
    ],
    "total": 50,
    "page": 1,
    "pageSize": 10,
    "hasMore": true
  }
}
```

---

### 2. 获取订单详情
**接口路径:** `GET /order/detail/:orderId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| orderId | string | 是 | 订单ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "id": "ORDER202401200001",
    "orderNo": "ORDER202401200001",
    "status": "pending_use",
    "statusText": "待使用",
    "service": {
      "id": "1",
      "name": "精致剪发",
      "image": "https://example.com/service.png",
      "price": 99,
      "duration": 45
    },
    "designer": {
      "id": "1",
      "name": "李天天",
      "avatar": "https://example.com/avatar.png",
      "position": "店长"
    },
    "brand": {
      "id": "1",
      "name": "金龙大好人美发沙龙",
      "address": "成都市武侯区天府三街",
      "phone": "028-88888888"
    },
    "appointmentTime": "2024-01-20 14:00",
    "price": 99,
    "originalPrice": 128,
    "discountAmount": 29,
    "coupon": {
      "id": "1",
      "name": "新人优惠券",
      "amount": 10
    },
    "paymentMethod": "wechat",
    "paymentTime": "2024-01-18 10:32:00",
    "remark": "希望剪短一点",
    "createTime": "2024-01-18 10:30:00",
    "canCancel": true,
    "canReview": false
  }
}
```

---

### 3. 创建订单
**接口路径:** `POST /order/create`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| serviceId | string | 是 | 服务ID |
| designerId | string | 是 | 设计师ID |
| appointmentTime | string | 是 | 预约时间 |
| couponId | string | 否 | 优惠券ID |
| remark | string | 否 | 备注 |

**响应示例:**
```json
{
  "code": 0,
  "message": "订单创建成功",
  "data": {
    "orderId": "ORDER202401200001",
    "price": 99,
    "paymentExpireTime": "2024-01-18 11:00:00"
  }
}
```

---

### 4. 取消订单
**接口路径:** `PUT /order/cancel/:orderId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| orderId | string | 是 | 订单ID（路径参数） |
| reason | string | 是 | 取消原因 |

**响应示例:**
```json
{
  "code": 0,
  "message": "订单已取消",
  "data": null
}
```

---

### 5. 订单支付
**接口路径:** `POST /order/pay/:orderId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| orderId | string | 是 | 订单ID（路径参数） |
| paymentMethod | string | 是 | 支付方式（wechat/alipay） |

**响应示例:**
```json
{
  "code": 0,
  "message": "支付成功",
  "data": {
    "paymentId": "PAY202401200001",
    "wechatPayParams": {
      "appId": "wx1234567890",
      "timeStamp": "1705555200",
      "nonceStr": "abc123",
      "package": "prepay_id=wx20240118...",
      "signType": "RSA",
      "paySign": "xxxxx"
    }
  }
}
```

---

### 6. 确认订单完成
**接口路径:** `PUT /order/complete/:orderId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| orderId | string | 是 | 订单ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "订单已完成",
  "data": null
}
```

---

### 7. 提交订单评价
**接口路径:** `POST /order/review/:orderId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| orderId | string | 是 | 订单ID（路径参数） |
| rating | number | 是 | 评分（1-5） |
| content | string | 是 | 评价内容 |
| images | array | 否 | 图片数组 |
| anonymous | boolean | 否 | 是否匿名 |

**响应示例:**
```json
{
  "code": 0,
  "message": "评价成功",
  "data": {
    "reviewId": "REVIEW202401200001"
  }
}
```

---

### 8. 获取订单评价详情
**接口路径:** `GET /order/review/:orderId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| orderId | string | 是 | 订单ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "id": "REVIEW202401200001",
    "rating": 5,
    "content": "服务很棒，效果很满意！",
    "images": ["https://example.com/review1.png"],
    "anonymous": false,
    "createTime": "2024-01-21 15:30:00"
  }
}
```

---

### 9. 申请退款
**接口路径:** `POST /order/refund/:orderId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| orderId | string | 是 | 订单ID（路径参数） |
| reason | string | 是 | 退款原因 |
| description | string | 否 | 详细说明 |

**响应示例:**
```json
{
  "code": 0,
  "message": "退款申请已提交",
  "data": {
    "refundId": "REFUND202401200001"
  }
}
```

---

### 10. 获取订单统计
**接口路径:** `GET /order/statistics`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "pending_payment": 2,
    "confirmed": 1,
    "pending_use": 3,
    "completed": 15,
    "cancelled": 5,
    "total": 26
  }
}
```

---

### 11. 再次预约
**接口路径:** `POST /order/reorder/:orderId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| orderId | string | 是 | 历史订单ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "操作成功",
  "data": {
    "serviceId": "1",
    "designerId": "1",
    "service": {
      "id": "1",
      "name": "精致剪发",
      "price": 99
    },
    "designer": {
      "id": "1",
      "name": "李天天"
    }
  }
}
```
