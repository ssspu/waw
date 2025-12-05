# 私人领地模块 API 文档

## 模块说明
私人领地模块包含用户的专属设计师、品牌馆、服务记录、推广分享等接口。

## 接口列表

### 一、设计师领地

#### 1. 获取我的设计师列表
**接口路径:** `GET /territory/designers`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| category | string | 否 | - | 分类（hairstylist/beautician/makeup/nail/body） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "1",
        "name": "李天天",
        "avatar": "https://example.com/avatar.png",
        "title": "资深发型师",
        "category": "hairstylist",
        "serviceCount": 5,
        "lastServiceTime": "2024-01-15",
        "rating": 4.9
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

#### 2. 获取设计师服务记录
**接口路径:** `GET /territory/designers/:designerId/records`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| designerId | string | 是 | - | 设计师ID（路径参数） |
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
        "serviceName": "精致剪发",
        "serviceTime": "2024-01-15 14:00",
        "amount": 128,
        "status": "completed",
        "rating": 5,
        "comment": "很满意"
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

#### 3. 移除私人领地设计师
**接口路径:** `POST /territory/designers/:designerId/remove`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| designerId | string | 是 | 设计师ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "移除成功",
  "data": null
}
```

---

### 二、品牌馆领地

#### 4. 获取我的品牌馆列表
**接口路径:** `GET /territory/brands`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| category | string | 否 | - | 分类（hair/beauty/makeup/nail/body） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "1",
        "name": "WAW旗舰店",
        "logo": "https://example.com/logo.png",
        "address": "成都市武侯区天府三街",
        "category": "hair",
        "serviceCount": 3,
        "lastServiceTime": "2024-01-10",
        "rating": 4.8
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

#### 5. 获取品牌馆服务记录
**接口路径:** `GET /territory/brands/:brandId/records`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| brandId | string | 是 | - | 品牌馆ID（路径参数） |
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
        "serviceName": "深层护理",
        "designerName": "张三",
        "serviceTime": "2024-01-10 10:00",
        "amount": 299,
        "status": "completed"
      }
    ],
    "total": 3,
    "page": 1,
    "pageSize": 10,
    "hasMore": false
  }
}
```

---

#### 6. 移除私人领地品牌馆
**接口路径:** `POST /territory/brands/:brandId/remove`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| brandId | string | 是 | 品牌馆ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "移除成功",
  "data": null
}
```

---

### 三、服务记录

#### 7. 获取服务记录列表
**接口路径:** `GET /territory/records`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| type | string | 否 | - | 类型（designer/brand） |
| category | string | 否 | - | 服务分类 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "1",
        "type": "designer",
        "targetId": "1",
        "targetName": "李天天",
        "targetAvatar": "https://example.com/avatar.png",
        "serviceName": "精致剪发",
        "serviceTime": "2024-01-15 14:00",
        "amount": 128,
        "status": "completed"
      }
    ],
    "total": 20,
    "page": 1,
    "pageSize": 10,
    "hasMore": true
  }
}
```

---

#### 8. 获取服务记录详情
**接口路径:** `GET /territory/records/:recordId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| recordId | string | 是 | 记录ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "id": "1",
    "type": "designer",
    "targetId": "1",
    "targetName": "李天天",
    "targetAvatar": "https://example.com/avatar.png",
    "serviceName": "精致剪发",
    "serviceDescription": "专业剪发服务",
    "serviceTime": "2024-01-15 14:00",
    "duration": 60,
    "amount": 128,
    "status": "completed",
    "rating": 5,
    "comment": "非常满意！",
    "images": ["https://example.com/result1.png"]
  }
}
```

---

### 四、再次预约

#### 9. 基于服务记录再次预约
**接口路径:** `POST /territory/reorder/:recordId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| recordId | string | 是 | 服务记录ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "预约信息已生成",
  "data": {
    "serviceId": "1",
    "designerId": "1",
    "serviceName": "精致剪发",
    "price": 128
  }
}
```

---

### 五、推广分享

#### 10. 获取设计师推广信息
**接口路径:** `GET /territory/share/designer/:designerId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| designerId | string | 是 | 设计师ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "title": "推荐超赞设计师李天天",
    "description": "从业12年，专业造型设计",
    "image": "https://example.com/share/designer1.png",
    "link": "https://waw.com/designer/1",
    "qrCode": "https://example.com/qrcode/designer1.png"
  }
}
```

---

#### 11. 获取品牌馆推广信息
**接口路径:** `GET /territory/share/brand/:brandId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| brandId | string | 是 | 品牌馆ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "title": "WAW旗舰店",
    "description": "专业美发沙龙，品质服务",
    "image": "https://example.com/share/brand1.png",
    "link": "https://waw.com/brand/1",
    "qrCode": "https://example.com/qrcode/brand1.png"
  }
}
```

---

#### 12. 记录分享行为
**接口路径:** `POST /territory/share/record`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | string | 是 | 类型（designer/brand） |
| targetId | string | 是 | 目标ID |
| channel | string | 是 | 分享渠道（wechat/moments/weibo/copy） |

**响应示例:**
```json
{
  "code": 0,
  "message": "记录成功",
  "data": null
}
```

---

### 六、统计数据

#### 13. 获取私人领地统计数据
**接口路径:** `GET /territory/statistics`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "designerCount": 8,
    "brandCount": 3,
    "serviceCount": 25,
    "totalSpent": 3680.00
  }
}
```

