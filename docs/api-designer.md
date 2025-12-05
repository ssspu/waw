# 设计师模块 API 文档

## 模块说明
设计师模块包含设计师列表、详情、作品、预约等接口。

## 接口列表

### 1. 获取设计师列表
**接口路径:** `GET /designer/list`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| keyword | string | 否 | - | 搜索关键词 |
| categoryId | string | 否 | - | 分类ID |
| sortBy | string | 否 | - | 排序方式 |
| level | string | 否 | - | 等级筛选 |

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
        "coverImage": "https://example.com/cover.png",
        "position": "店长",
        "level": "高级",
        "experience": 12,
        "rating": 4.8,
        "followerCount": 2560,
        "appointmentCount": 3200,
        "specialties": ["女士造型", "烫发设计"],
        "brandName": "金龙大好人美发沙龙",
        "distance": "2.7km",
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

### 2. 获取设计师详情
**接口路径:** `GET /designer/detail/:designerId`

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
    "id": "1",
    "name": "李天天",
    "avatar": "https://example.com/avatar.png",
    "coverImage": "https://example.com/cover.png",
    "position": "店长",
    "level": "高级",
    "experience": 12,
    "rating": 4.8,
    "followerCount": 2560,
    "appointmentCount": 3200,
    "serviceCount": 287,
    "worksCount": 123,
    "specialties": ["女士造型", "烫发设计"],
    "introduction": "从业12年，擅长各类时尚造型...",
    "tags": ["预约爆满", "口碑极佳"],
    "brandId": "1",
    "brandName": "金龙大好人美发沙龙",
    "brandAddress": "成都市武侯区天府三街",
    "isFollowed": false,
    "isFavorited": false
  }
}
```

---

### 3. 获取设计师基本信息
**接口路径:** `GET /designer/info/:designerId`

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
    "id": "1",
    "name": "李天天",
    "avatar": "https://example.com/avatar.png",
    "position": "店长",
    "brandName": "金龙大好人美发沙龙"
  }
}
```

---

### 4. 获取设计师服务项目
**接口路径:** `GET /designer/:designerId/services`

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
        "name": "精致剪发",
        "image": "https://example.com/service.png",
        "price": 99,
        "originalPrice": 128,
        "duration": 45,
        "soldCount": 2356,
        "description": "专业剪发服务"
      }
    ],
    "total": 15,
    "page": 1,
    "pageSize": 10,
    "hasMore": true
  }
}
```

---

### 5. 获取设计师作品集
**接口路径:** `GET /designer/:designerId/works`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| designerId | string | 是 | - | 设计师ID（路径参数） |
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| type | string | 否 | - | 作品类型（female/male/kids） |

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
        "type": "female",
        "likeCount": 256,
        "createTime": "2024-01-15"
      }
    ],
    "total": 123,
    "page": 1,
    "pageSize": 10,
    "hasMore": true
  }
}
```

---

### 6. 获取设计师评价列表
**接口路径:** `GET /designer/:designerId/reviews`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| designerId | string | 是 | - | 设计师ID（路径参数） |
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
        "content": "李老师技术太棒了！",
        "images": ["https://example.com/review1.png"],
        "serviceName": "精致剪发",
        "createTime": "2024-01-15 14:30:00"
      }
    ],
    "total": 856,
    "page": 1,
    "pageSize": 10,
    "hasMore": true
  }
}
```

---

### 7. 获取设计师可预约时间
**接口路径:** `GET /designer/:designerId/available-time`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| designerId | string | 是 | 设计师ID（路径参数） |
| date | string | 是 | 日期（YYYY-MM-DD） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "date": "2024-01-20",
    "slots": [
      { "time": "10:00", "available": true },
      { "time": "11:00", "available": false },
      { "time": "14:00", "available": true },
      { "time": "15:00", "available": true },
      { "time": "16:00", "available": false }
    ]
  }
}
```

---

### 8. 预约设计师
**接口路径:** `POST /designer/:designerId/appointment`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| designerId | string | 是 | 设计师ID（路径参数） |
| serviceId | string | 是 | 服务ID |
| appointmentTime | string | 是 | 预约时间 |
| remark | string | 否 | 备注 |

**响应示例:**
```json
{
  "code": 0,
  "message": "预约成功",
  "data": {
    "orderId": "ORDER202401200001",
    "appointmentTime": "2024-01-20 14:00"
  }
}
```

---

### 9. 关注设计师
**接口路径:** `POST /designer/:designerId/follow`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| designerId | string | 是 | 设计师ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "关注成功",
  "data": null
}
```

---

### 10. 取消关注设计师
**接口路径:** `POST /designer/:designerId/unfollow`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| designerId | string | 是 | 设计师ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "已取消关注",
  "data": null
}
```

---

### 11. 收藏设计师
**接口路径:** `POST /designer/:designerId/favorite`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| designerId | string | 是 | 设计师ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "收藏成功",
  "data": null
}
```

---

### 12. 取消收藏设计师
**接口路径:** `POST /designer/:designerId/unfavorite`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| designerId | string | 是 | 设计师ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "已取消收藏",
  "data": null
}
```

---

### 13. 获取推荐设计师
**接口路径:** `GET /designer/recommend`

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
        "name": "李天天",
        "avatar": "https://example.com/avatar.png",
        "position": "店长",
        "level": "高级",
        "rating": 4.8
      }
    ]
  }
}
```

---

### 14. 获取热门设计师
**接口路径:** `GET /designer/hot`

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
        "name": "李天天",
        "avatar": "https://example.com/avatar.png",
        "position": "店长",
        "level": "高级",
        "appointmentCount": 3200
      }
    ]
  }
}
```
