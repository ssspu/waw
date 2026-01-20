# WAWmanager 商家端 - 新增接口文档

> 本文档仅包含商家端特有的接口，与用户端 `/waw` 共用的接口请参考用户端文档

**Base URL**: `https://bioflex.cn/api`
**Token Key**: `waw_manager_token`
**更新日期**: 2026-01-13

---

## 接口模块概览

| 模块 | 对应页面 | 说明 |
|------|----------|------|
| 排班模块 | `/pages/time/manage.vue` | 营业时间、预约管理、工作排班 |
| 消息模块 | `/pages/message/list.vue` | 系统消息、订单通知 |
| 数据统计模块 | `/pages/data/index.vue` | 业绩统计、客流统计、收入统计 |
| 访客记录模块 | `/pages/visitor/record.vue` | 访客记录查询 |

> 注：店铺、服务、订单、顾客、技师、员工、财务、营销等模块接口与用户端共用，请参考 `API-DOCUMENTATION.md`

---

## 一、排班模块 `/schedule`

> 对应页面: `/pages/time/manage.vue` - 营业时间管理

### 1.1 获取排班列表
- **接口**: `GET /schedule/list`

**请求参数** (Query):
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| date | string | 是 | 日期 YYYY-MM-DD |
| staffId | number | 否 | 员工ID |

**响应数据**:
```json
{
  "list": [{
    "id": "number",
    "staffId": "number",
    "staffName": "string",
    "date": "string",
    "startTime": "string",
    "endTime": "string",
    "status": "number"
  }]
}
```

### 1.2 创建排班
- **接口**: `POST /schedule`

**请求参数**:
```json
{
  "staffId": "number",
  "date": "string",
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

### 1.3 更新排班
- **接口**: `PUT /schedule/{id}`

**请求参数**: 同创建排班

**响应数据**:
```json
{
  "success": true
}
```

### 1.4 删除排班
- **接口**: `DELETE /schedule/{id}`

**响应数据**:
```json
{
  "success": true
}
```

### 1.5 批量排班
- **接口**: `POST /schedule/batch`

**请求参数**:
```json
{
  "staffIds": ["number"],
  "dates": ["string"],
  "startTime": "string",
  "endTime": "string"
}
```

**响应数据**:
```json
{
  "success": true,
  "count": "number"
}
```

### 1.6 获取今日预约
- **接口**: `GET /schedule/appointments/today`

**响应数据**:
```json
{
  "list": [{
    "id": "number",
    "orderId": "number",
    "customerName": "string",
    "serviceName": "string",
    "technicianName": "string",
    "appointmentTime": "string",
    "status": "number"
  }],
  "total": "number"
}
```

### 1.7 获取营业时间设置
- **接口**: `GET /schedule/business-hours`

**响应数据**:
```json
{
  "openTime": "string",
  "closeTime": "string",
  "restDays": ["number"],
  "isOpen": "boolean"
}
```

### 1.8 更新营业时间设置
- **接口**: `PUT /schedule/business-hours`

**请求参数**:
```json
{
  "openTime": "string",
  "closeTime": "string",
  "restDays": ["number"]
}
```

**响应数据**:
```json
{
  "success": true
}
```

---

## 二、消息模块 `/message`

> 对应页面: `/pages/message/list.vue`, `/pages/message/detail.vue` - 消息通知

### 2.1 获取消息列表
- **接口**: `GET /message/list`

**请求参数** (Query):
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页数量 |
| type | string | 否 | 消息类型: order/system/marketing |

**响应数据**:
```json
{
  "list": [{
    "id": "number",
    "title": "string",
    "content": "string",
    "type": "string",
    "isRead": "boolean",
    "createTime": "string"
  }],
  "total": "number"
}
```

### 2.2 获取消息详情
- **接口**: `GET /message/{id}`

**响应数据**:
```json
{
  "id": "number",
  "title": "string",
  "content": "string",
  "type": "string",
  "isRead": "boolean",
  "createTime": "string",
  "extra": {}
}
```

### 2.3 标记消息已读
- **接口**: `PUT /message/{id}/read`

**响应数据**:
```json
{
  "success": true
}
```

### 2.4 标记全部已读
- **接口**: `PUT /message/read-all`

**响应数据**:
```json
{
  "success": true
}
```

### 2.5 删除消息
- **接口**: `DELETE /message/{id}`

**响应数据**:
```json
{
  "success": true
}
```

### 2.6 获取未读消息数
- **接口**: `GET /message/unread-count`

**响应数据**:
```json
{
  "count": "number"
}
```

---

## 三、数据统计模块 `/statistics`

> 对应页面: `/pages/data/index.vue` - 数据统计

### 3.1 获取数据总览
- **接口**: `GET /statistics/overview`

**响应数据**:
```json
{
  "todayIncome": "number",
  "todayOrders": "number",
  "todayVisitors": "number",
  "todayNewCustomers": "number"
}
```

### 3.2 获取收入统计
- **接口**: `GET /statistics/income`

**请求参数** (Query):
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| startDate | string | 是 | 开始日期 |
| endDate | string | 是 | 结束日期 |
| type | string | 否 | 统计类型: day/week/month |

**响应数据**:
```json
{
  "totalIncome": "number",
  "orderIncome": "number",
  "promotionIncome": "number",
  "trend": [{
    "date": "string",
    "amount": "number"
  }]
}
```

### 3.3 获取订单统计
- **接口**: `GET /statistics/orders`

**请求参数** (Query):
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| startDate | string | 是 | 开始日期 |
| endDate | string | 是 | 结束日期 |

**响应数据**:
```json
{
  "totalOrders": "number",
  "completedOrders": "number",
  "cancelledOrders": "number",
  "trend": [{
    "date": "string",
    "count": "number"
  }]
}
```

### 3.4 获取客户统计
- **接口**: `GET /statistics/customers`

**请求参数** (Query):
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| startDate | string | 是 | 开始日期 |
| endDate | string | 是 | 结束日期 |

**响应数据**:
```json
{
  "totalCustomers": "number",
  "newCustomers": "number",
  "returnCustomers": "number",
  "avgConsumption": "number"
}
```

### 3.5 获取服务统计
- **接口**: `GET /statistics/services`

**请求参数** (Query):
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| startDate | string | 是 | 开始日期 |
| endDate | string | 是 | 结束日期 |

**响应数据**:
```json
{
  "hotServices": [{
    "id": "number",
    "name": "string",
    "count": "number",
    "amount": "number"
  }]
}
```

---

## 四、访客记录模块 `/visitor`

> 对应页面: `/pages/visitor/record.vue` - 访客记录

### 4.1 获取访客记录
- **接口**: `GET /visitor/list`

**请求参数** (Query):
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码 |
| pageSize | number | 否 | 每页数量 |
| startDate | string | 否 | 开始日期 |
| endDate | string | 否 | 结束日期 |

**响应数据**:
```json
{
  "list": [{
    "id": "number",
    "userId": "number",
    "userName": "string",
    "userAvatar": "string",
    "visitTime": "string",
    "source": "string",
    "duration": "number"
  }],
  "total": "number"
}
```

### 4.2 获取访客统计
- **接口**: `GET /visitor/stats`

**请求参数** (Query):
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| startDate | string | 是 | 开始日期 |
| endDate | string | 是 | 结束日期 |

**响应数据**:
```json
{
  "totalVisitors": "number",
  "uniqueVisitors": "number",
  "avgDuration": "number",
  "trend": [{
    "date": "string",
    "count": "number"
  }]
}
```

---

## 状态码说明

| code | 说明 |
|------|------|
| 0/200 | 成功 |
| 400 | 参数错误 |
| 401 | 未授权/Token失效 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 500 | 服务器错误 |

---

## 与用户端数据交互说明

商家端需要与用户端进行数据交互的场景：

1. **订单数据同步**: 用户端下单后，商家端实时接收订单通知
2. **服务数据共享**: 商家端发布的服务在用户端展示
3. **顾客数据关联**: 用户端用户与商家端顾客档案关联
4. **评价数据同步**: 用户端评价在商家端展示和回复

这些交互通过共用的接口实现，详见 `API-DOCUMENTATION.md`
