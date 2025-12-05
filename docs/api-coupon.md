# 优惠券模块 API 文档

## 模块说明
优惠券模块包含优惠券列表、领取、兑换、使用规则等接口。

## 接口列表

### 1. 获取优惠券列表
**接口路径:** `GET /coupon/list`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| status | string | 否 | - | 状态（available/used/expired） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "1",
        "name": "新人专享券",
        "type": "discount",
        "value": 20,
        "minAmount": 100,
        "startTime": "2024-01-01",
        "endTime": "2024-12-31",
        "status": "available",
        "description": "满100减20"
      }
    ],
    "total": 10,
    "page": 1,
    "pageSize": 10,
    "hasMore": false
  }
}
```

---

### 2. 获取可用优惠券列表
**接口路径:** `GET /coupon/available`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| serviceId | string | 否 | 服务ID |
| designerId | string | 否 | 设计师ID |
| amount | number | 否 | 订单金额 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": [
    {
      "id": "1",
      "name": "满减券",
      "value": 20,
      "minAmount": 100,
      "canUse": true,
      "reason": ""
    },
    {
      "id": "2",
      "name": "折扣券",
      "value": 0.9,
      "minAmount": 0,
      "canUse": false,
      "reason": "不适用于该服务"
    }
  ]
}
```

---

### 3. 获取优惠券详情
**接口路径:** `GET /coupon/detail/:couponId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| couponId | string | 是 | 优惠券ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "id": "1",
    "name": "新人专享券",
    "type": "discount",
    "value": 20,
    "minAmount": 100,
    "startTime": "2024-01-01",
    "endTime": "2024-12-31",
    "status": "available",
    "description": "满100减20",
    "rules": [
      "仅限新用户使用",
      "不可与其他优惠叠加"
    ],
    "applicableServices": ["剪发", "染发", "烫发"]
  }
}
```

---

### 4. 领取优惠券
**接口路径:** `POST /coupon/receive/:couponId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| couponId | string | 是 | 优惠券ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "领取成功",
  "data": {
    "userCouponId": "UC001"
  }
}
```

---

### 5. 通过兑换码领取优惠券
**接口路径:** `POST /coupon/exchange`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| code | string | 是 | 兑换码 |

**响应示例:**
```json
{
  "code": 0,
  "message": "兑换成功",
  "data": {
    "couponId": "1",
    "couponName": "专属优惠券",
    "value": 50
  }
}
```

---

### 6. 获取可领取的优惠券列表
**接口路径:** `GET /coupon/receivable`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "1",
        "name": "新人专享券",
        "value": 20,
        "minAmount": 100,
        "endTime": "2024-12-31",
        "remaining": 100,
        "received": false
      }
    ],
    "total": 5,
    "page": 1,
    "pageSize": 10,
    "hasMore": false
  }
}
```

---

### 7. 获取优惠券使用规则
**接口路径:** `GET /coupon/rules/:couponId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| couponId | string | 是 | 优惠券ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "rules": [
      "1. 本券仅限在WAW平台使用",
      "2. 满100元可用，减免20元",
      "3. 每个订单仅限使用一张优惠券",
      "4. 不可与其他优惠活动叠加使用",
      "5. 优惠券不可转让、不可兑换现金"
    ],
    "applicableCategories": ["剪发", "染发", "烫发"],
    "excludeCategories": ["特价服务"]
  }
}
```

---

### 8. 获取优惠券统计
**接口路径:** `GET /coupon/statistics`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "available": 5,
    "used": 10,
    "expired": 3
  }
}
```

