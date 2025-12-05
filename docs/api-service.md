# 服务模块 API 文档

## 模块说明
服务模块包含服务项目列表、详情、分类、收藏等接口。

## 接口列表

### 1. 获取服务列表
**接口路径:** `GET /service/list`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| categoryId | string | 否 | - | 分类ID |
| keyword | string | 否 | - | 搜索关键词 |
| sortBy | string | 否 | - | 排序方式（price/soldCount/rating） |

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
        "categoryId": "1",
        "categoryName": "剪发",
        "image": "https://example.com/service.png",
        "price": 99,
        "originalPrice": 128,
        "description": "专业剪发服务",
        "duration": 45,
        "soldCount": 2356,
        "rating": 4.8,
        "reviewCount": 856,
        "tags": ["热门", "推荐"],
        "designerName": "李天天",
        "designerAvatar": "https://example.com/avatar.png",
        "distance": "2.7km",
        "isFavorited": false
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

### 2. 获取服务详情
**接口路径:** `GET /service/detail/:serviceId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| serviceId | string | 是 | 服务ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "id": "1",
    "name": "洗剪吹",
    "fullTitle": "洗剪吹 发型提案+裁剪+造型",
    "description": "专业剪发服务，根据您的脸型和气质，为您打造最适合的发型。",
    "price": 799,
    "originalPrice": 999,
    "soldCount": 1234,
    "headerImage": "https://example.com/header.png",
    "isFavorited": false,
    "coupons": [
      { "id": "1", "text": "满100-5" },
      { "id": "2", "text": "满500-50" }
    ],
    "designer": {
      "id": "1",
      "name": "李天天",
      "avatar": "https://example.com/avatar.png",
      "badge": "高级",
      "role": "店长｜从业12年",
      "rating": 4.8,
      "serviceCount": 287,
      "worksCount": 123
    },
    "serviceItems": [
      { "name": "发型提案", "quantity": "*1" },
      { "name": "头发清洁", "quantity": "*1" },
      { "name": "发型修剪", "quantity": "*1" },
      { "name": "吹风造型", "quantity": "*1" }
    ],
    "warmTips": [
      "有效日期2024-01-01至2024-12-31",
      "需您当日一次性体验完所有项目",
      "不与其他优惠同享"
    ],
    "detailImages": [
      "https://example.com/detail1.png",
      "https://example.com/detail2.png"
    ],
    "reviewTags": [
      { "text": "技术很好", "count": "232", "active": true },
      { "text": "效果满意", "count": "321", "active": false }
    ],
    "reviews": [
      {
        "id": 1,
        "title": "环境特别好",
        "rating": "4.0",
        "content": "环境特别好，服务态度也很棒！",
        "author": "加菲猫",
        "avatar": "https://example.com/avatar.png",
        "date": "2024-01-25",
        "image": "https://example.com/review.png"
      }
    ],
    "questions": [
      "只烫不染的短发多少钱？",
      "刘海发际线太高怎么办？"
    ],
    "questionCount": 12,
    "recommendedServices": [
      {
        "id": "2",
        "image": "https://example.com/service2.png",
        "title": "烫发",
        "description": "发型提案+染发+造型",
        "price": "799",
        "stylistName": "李天天",
        "stylistRole": "美发师",
        "rating": "4.8",
        "reviewCount": "768",
        "distance": "6.7km"
      }
    ]
  }
}
```

---

### 3. 获取服务分类
**接口路径:** `GET /service/categories`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": [
    { "id": "1", "name": "剪发", "icon": "/static/icon/cut.png", "count": 15 },
    { "id": "2", "name": "烫发", "icon": "/static/icon/perm.png", "count": 12 },
    { "id": "3", "name": "染发", "icon": "/static/icon/dye.png", "count": 18 },
    { "id": "4", "name": "护理", "icon": "/static/icon/care.png", "count": 10 },
    { "id": "5", "name": "造型", "icon": "/static/icon/style.png", "count": 8 }
  ]
}
```

---

### 4. 获取推荐服务
**接口路径:** `GET /service/recommend`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| limit | number | 否 | 4 | 数量 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": [
    {
      "id": "1",
      "name": "精致剪发",
      "image": "https://example.com/service.png",
      "price": 99,
      "rating": 4.8
    }
  ]
}
```

---

### 5. 获取热门服务
**接口路径:** `GET /service/hot`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| limit | number | 否 | 4 | 数量 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": [
    {
      "id": "1",
      "name": "精致剪发",
      "image": "https://example.com/service.png",
      "price": 99,
      "soldCount": 2356
    }
  ]
}
```

---

### 6. 收藏服务
**接口路径:** `POST /service/:serviceId/favorite`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| serviceId | string | 是 | 服务ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "收藏成功",
  "data": null
}
```

---

### 7. 取消收藏服务
**接口路径:** `POST /service/:serviceId/unfavorite`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| serviceId | string | 是 | 服务ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "已取消收藏",
  "data": null
}
```

---

### 8. 获取服务评价
**接口路径:** `GET /service/:serviceId/reviews`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| serviceId | string | 是 | - | 服务ID（路径参数） |
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
        "userName": "加菲猫",
        "userAvatar": "https://example.com/avatar.png",
        "rating": 5.0,
        "content": "剪发效果很满意，设计师很专业！",
        "images": ["https://example.com/review1.png"],
        "time": "2024-01-25",
        "likeCount": 36,
        "replyCount": 1
      }
    ],
    "total": 856,
    "page": 1,
    "pageSize": 10,
    "hasMore": true
  }
}
```
