# 消息中心模块 API 文档

## 模块说明
消息中心模块包含消息列表、详情、已读标记、删除、未读数量等接口。

## 接口列表

### 1. 获取消息列表
**接口路径:** `GET /message/list`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| type | string | 否 | - | 消息类型（system/order/activity/coupon） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "1",
        "type": "order",
        "title": "订单完成通知",
        "content": "您的订单已完成，欢迎评价",
        "isRead": false,
        "createTime": "2024-01-20 14:30:00"
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

### 2. 获取消息详情
**接口路径:** `GET /message/detail/:messageId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| messageId | string | 是 | 消息ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "id": "1",
    "type": "order",
    "title": "订单完成通知",
    "content": "您的订单已完成，欢迎评价",
    "isRead": true,
    "createTime": "2024-01-20 14:30:00",
    "extra": {
      "orderId": "O202401200001",
      "link": "/pages/order/detail?id=O202401200001"
    }
  }
}
```

---

### 3. 标记消息为已读
**接口路径:** `PUT /message/read/:messageId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| messageId | string | 是 | 消息ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "标记成功",
  "data": null
}
```

---

### 4. 批量标记消息为已读
**接口路径:** `PUT /message/batch-read`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| ids | array | 是 | 消息ID数组 |

**响应示例:**
```json
{
  "code": 0,
  "message": "标记成功",
  "data": {
    "count": 5
  }
}
```

---

### 5. 标记所有消息为已读
**接口路径:** `PUT /message/read-all`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "全部标记成功",
  "data": null
}
```

---

### 6. 删除消息
**接口路径:** `DELETE /message/:messageId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| messageId | string | 是 | 消息ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "删除成功",
  "data": null
}
```

---

### 7. 批量删除消息
**接口路径:** `POST /message/batch-delete`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| ids | array | 是 | 消息ID数组 |

**响应示例:**
```json
{
  "code": 0,
  "message": "删除成功",
  "data": {
    "count": 5
  }
}
```

---

### 8. 清空所有消息
**接口路径:** `DELETE /message/clear`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | string | 否 | 消息类型，不传则清空全部 |

**响应示例:**
```json
{
  "code": 0,
  "message": "清空成功",
  "data": null
}
```

---

### 9. 获取未读消息数量
**接口路径:** `GET /message/unread-count`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "count": 12
  }
}
```

---

### 10. 获取各类型消息未读数量
**接口路径:** `GET /message/unread-count/types`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "system": 2,
    "order": 5,
    "activity": 3,
    "coupon": 2
  }
}
```

---

### 11. 获取消息分组列表（按日期分组）
**接口路径:** `GET /message/grouped`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 20 | 每页数量 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "date": "2024-01-20",
        "messages": [
          {
            "id": "1",
            "type": "order",
            "title": "订单完成通知",
            "content": "您的订单已完成",
            "isRead": false,
            "createTime": "14:30"
          }
        ]
      },
      {
        "date": "2024-01-19",
        "messages": []
      }
    ],
    "total": 50,
    "page": 1,
    "pageSize": 20,
    "hasMore": true
  }
}
```

