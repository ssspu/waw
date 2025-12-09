# 品牌馆模块 API 文档

## 模块说明
品牌馆模块包含品牌列表、详情、设计师、服务、预约等接口。

## 接口列表

### 1. 获取品牌馆列表
**接口路径:** `GET /brand/list`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| keyword | string | 否 | - | 搜索关键词 |
| categoryId | string | 否 | - | 分类ID |
| sortBy | string | 否 | - | 排序方式 |
| location | string | 否 | - | 位置信息 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "1",
        "name": "金龙大好人美发沙龙",
        "logo": "https://example.com/logo.png",
        "coverImage": "https://example.com/cover.png",
        "rating": 4.8,
        "reviewCount": 1256,
        "address": "成都市武侯区天府三街",
        "distance": "2.7km",
        "tags": ["连锁", "高端"],
        "isFollowed": false
      }
    ],
    "total": 100,
    "page": 1,
    "pageSize": 10,
    "hasMore": true
  }
}
```

---

### 2. 获取品牌馆详情
**接口路径:** `GET /brand/detail/:brandId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| brandId | string | 是 | 品牌ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "id": "1",
    "name": "金龙大好人美发沙龙",
    "logo": "https://example.com/logo.png",
    "coverImage": "https://example.com/cover.png",
    "rating": 4.8,
    "reviewCount": 1256,
    "followerCount": 5680,
    "address": "成都市武侯区天府三街",
    "phone": "028-88888888",
    "businessHours": "10:00-21:00",
    "restDay": "周二休息",
    "introduction": "品牌介绍...",
    "latitude": 30.123456,
    "longitude": 104.123456,
    "isFollowed": false,
    "isFavorited": false,
    "tags": ["连锁", "高端"],
    "designerCount": 12,
    "serviceCount": 36
  }
}
```

---

### 3. 获取品牌馆基本信息
**接口路径:** `GET /brand/info/:brandId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| brandId | string | 是 | 品牌ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "id": "1",
    "name": "金龙大好人美发沙龙",
    "logo": "https://example.com/logo.png",
    "phone": "028-88888888",
    "address": "成都市武侯区天府三街"
  }
}
```

---

### 4. 获取品牌馆设计师列表
**接口路径:** `GET /brand/:brandId/designers`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| brandId | string | 是 | - | 品牌ID（路径参数） |
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
        "name": "李天天",
        "avatar": "https://example.com/avatar.png",
        "position": "店长",
        "level": "高级",
        "experience": 12,
        "rating": 4.8,
        "serviceCount": 287,
        "worksCount": 123,
        "specialties": ["女士造型", "烫发设计"]
      }
    ],
    "total": 12,
    "page": 1,
    "pageSize": 10,
    "hasMore": true
  }
}
```

---

### 5. 获取品牌馆服务列表
**接口路径:** `GET /brand/:brandId/services`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| brandId | string | 是 | - | 品牌ID（路径参数） |
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| categoryId | string | 否 | - | 服务分类ID |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "1",
        "name": "精致剪发",
        "image": "https://example.com/service.png",
        "price": 99,
        "originalPrice": 128,
        "duration": 45,
        "soldCount": 2356,
        "rating": 4.8
      }
    ],
    "total": 36,
    "page": 1,
    "pageSize": 10,
    "hasMore": true
  }
}
```

---

### 6. 获取品牌馆预约信息
**接口路径:** `GET /brand/:brandId/appointments`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| brandId | string | 是 | 品牌ID（路径参数） |
| date | string | 否 | 日期（YYYY-MM-DD） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "availableSlots": [
      { "time": "10:00", "available": true },
      { "time": "11:00", "available": false },
      { "time": "14:00", "available": true }
    ]
  }
}
```

---

### 7. 获取品牌馆作品集
**接口路径:** `GET /brand/:brandId/works`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| brandId | string | 是 | - | 品牌ID（路径参数） |
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| type | string | 否 | - | 作品类型 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "1",
        "image": "https://example.com/work.png",
        "title": "时尚短发造型",
        "designerName": "李天天",
        "likeCount": 256,
        "type": "female"
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

### 8. 获取品牌馆评价列表
**接口路径:** `GET /brand/:brandId/reviews`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| brandId | string | 是 | - | 品牌ID（路径参数） |
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| rating | number | 否 | - | 评分筛选（1-5） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "1",
        "userName": "小美",
        "userAvatar": "https://example.com/avatar.png",
        "rating": 5,
        "content": "服务很棒，环境很好！",
        "images": ["https://example.com/review1.png"],
        "serviceName": "精致剪发",
        "designerName": "李天天",
        "createTime": "2024-01-15 14:30:00"
      }
    ],
    "total": 1256,
    "page": 1,
    "pageSize": 10,
    "hasMore": true
  }
}
```

---

### 9. 关注品牌馆
**接口路径:** `POST /brand/:brandId/follow`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| brandId | string | 是 | 品牌ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "关注成功",
  "data": null
}
```

---

### 10. 取消关注品牌馆
**接口路径:** `POST /brand/:brandId/unfollow`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| brandId | string | 是 | 品牌ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "已取消关注",
  "data": null
}
```

---

### 11. 收藏品牌馆
**接口路径:** `POST /brand/:brandId/favorite`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| brandId | string | 是 | 品牌ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "收藏成功",
  "data": null
}
```

---

### 12. 取消收藏品牌馆
**接口路径:** `POST /brand/:brandId/unfavorite`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| brandId | string | 是 | 品牌ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "已取消收藏",
  "data": null
}
```

---

### 13. 获取附近品牌馆
**接口路径:** `GET /brand/nearby`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| latitude | number | 是 | 纬度 |
| longitude | number | 是 | 经度 |
| radius | number | 否 | 范围（km），默认5km |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "1",
        "name": "金龙大好人美发沙龙",
        "logo": "https://example.com/logo.png",
        "distance": "2.7km",
        "rating": 4.8
      }
    ]
  }
}
```

---

### 14. 获取推荐品牌馆
**接口路径:** `GET /brand/recommend`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| limit | number | 否 | 10 | 数量 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "1",
        "name": "金龙大好人美发沙龙",
        "logo": "https://example.com/logo.png",
        "coverImage": "https://example.com/cover.png",
        "rating": 4.8,
        "tags": ["连锁", "高端"]
      }
    ]
  }
}
```
