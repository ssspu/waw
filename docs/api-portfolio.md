# 作品集模块 API 文档

## 模块说明
作品集模块包含作品列表、详情、点赞、收藏、评论、分享等接口。

## 接口列表

### 1. 获取作品列表
**接口路径:** `GET /portfolio/list`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| category | string | 否 | - | 分类（women/men/children） |
| designerId | string | 否 | - | 设计师ID |
| brandId | string | 否 | - | 品牌馆ID |
| faceType | string | 否 | - | 脸型筛选 |
| hairVolume | string | 否 | - | 发量筛选 |
| hairQuality | string | 否 | - | 发质筛选 |
| hairThickness | string | 否 | - | 粗细筛选 |
| keyword | string | 否 | - | 搜索关键词 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "1",
        "image": "https://example.com/work1.jpg",
        "category": "women",
        "designerId": "1",
        "designerName": "李天天",
        "likes": 188,
        "comments": 56
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

### 2. 获取作品详情
**接口路径:** `GET /portfolio/detail/:workId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| workId | string | 是 | 作品ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "id": "1",
    "images": [
      "https://example.com/work1.jpg",
      "https://example.com/work2.jpg"
    ],
    "category": "women",
    "designer": {
      "id": "1",
      "name": "李天天",
      "avatar": "https://example.com/avatar.jpg",
      "title": "技术总监",
      "verified": true
    },
    "likes": 188,
    "comments": 56,
    "favorites": 120,
    "shares": 30,
    "isLiked": false,
    "isFavorited": false,
    "createTime": "2024-01-20 10:00:00"
  }
}
```

---

### 3. 获取作品分类
**接口路径:** `GET /portfolio/categories`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": [
    { "value": "women", "label": "女士" },
    { "value": "men", "label": "男士" },
    { "value": "children", "label": "儿童" }
  ]
}
```

---

### 4. 获取筛选条件
**接口路径:** `GET /portfolio/filters`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "faceTypes": [
      { "id": "oval", "name": "鹅蛋脸", "icon": "..." },
      { "id": "circle", "name": "圆脸", "icon": "..." }
    ],
    "hairVolume": [
      { "value": "less", "label": "少" },
      { "value": "normal", "label": "正常" },
      { "value": "more", "label": "多" }
    ],
    "hairQuality": [
      { "value": "soft", "label": "软" },
      { "value": "normal", "label": "正常" },
      { "value": "hard", "label": "硬" }
    ],
    "hairThickness": [
      { "value": "fine", "label": "细" },
      { "value": "normal", "label": "正常" },
      { "value": "thick", "label": "粗" }
    ]
  }
}
```

---

### 5. 点赞作品
**接口路径:** `POST /portfolio/:workId/like`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| workId | string | 是 | 作品ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "点赞成功",
  "data": {
    "likes": 189
  }
}
```

---

### 6. 取消点赞
**接口路径:** `DELETE /portfolio/:workId/like`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| workId | string | 是 | 作品ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "取消点赞成功",
  "data": {
    "likes": 188
  }
}
```

---

### 7. 收藏作品
**接口路径:** `POST /portfolio/:workId/favorite`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| workId | string | 是 | 作品ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "收藏成功",
  "data": null
}
```

---

### 8. 取消收藏
**接口路径:** `DELETE /portfolio/:workId/favorite`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| workId | string | 是 | 作品ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "取消收藏成功",
  "data": null
}
```

---

### 9. 获取作品评论列表
**接口路径:** `GET /portfolio/:workId/comments`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| workId | string | 是 | - | 作品ID（路径参数） |
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| sortBy | string | 否 | newest | 排序（newest/hottest） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "1",
        "userId": "1",
        "username": "小美",
        "avatar": "https://example.com/avatar.jpg",
        "content": "这个发型太好看了！",
        "likes": 10,
        "isLiked": false,
        "createTime": "2024-01-20 10:30:00",
        "replies": []
      }
    ],
    "total": 56,
    "page": 1,
    "pageSize": 10,
    "hasMore": true
  }
}
```

---

### 10. 发表评论
**接口路径:** `POST /portfolio/:workId/comments`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| workId | string | 是 | 作品ID（路径参数） |
| content | string | 是 | 评论内容 |
| replyTo | string | 否 | 回复的评论ID |

**响应示例:**
```json
{
  "code": 0,
  "message": "评论成功",
  "data": {
    "commentId": "100"
  }
}
```

---

### 11. 删除评论
**接口路径:** `DELETE /portfolio/:workId/comments/:commentId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| workId | string | 是 | 作品ID（路径参数） |
| commentId | string | 是 | 评论ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "删除成功",
  "data": null
}
```

---

### 12. 点赞评论
**接口路径:** `POST /portfolio/:workId/comments/:commentId/like`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| workId | string | 是 | 作品ID（路径参数） |
| commentId | string | 是 | 评论ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "点赞成功",
  "data": null
}
```

---

### 13. 分享作品
**接口路径:** `POST /portfolio/:workId/share`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| workId | string | 是 | 作品ID（路径参数） |
| channel | string | 是 | 分享渠道（wechat/moments/weibo/copy） |

**响应示例:**
```json
{
  "code": 0,
  "message": "分享成功",
  "data": null
}
```

---

### 14. 获取推荐作品
**接口路径:** `GET /portfolio/recommend`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| limit | number | 否 | 6 | 返回数量 |
| excludeId | string | 否 | - | 排除的作品ID |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": [
    {
      "id": "2",
      "image": "https://example.com/work2.jpg",
      "likes": 200
    }
  ]
}
```

---

### 15. 获取热门作品
**接口路径:** `GET /portfolio/hot`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| limit | number | 否 | 10 | 返回数量 |
| category | string | 否 | - | 分类 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": []
}
```

---

### 16. 获取设计师作品集
**接口路径:** `GET /portfolio/designer/:designerId`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| designerId | string | 是 | - | 设计师ID（路径参数） |
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| category | string | 否 | - | 分类 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [],
    "total": 0,
    "page": 1,
    "pageSize": 10,
    "hasMore": false
  }
}
```

---

### 17. 获取品牌馆作品集
**接口路径:** `GET /portfolio/brand/:brandId`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| brandId | string | 是 | - | 品牌馆ID（路径参数） |
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| category | string | 否 | - | 分类 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [],
    "total": 0,
    "page": 1,
    "pageSize": 10,
    "hasMore": false
  }
}
```

---

### 18. 举报作品
**接口路径:** `POST /portfolio/:workId/report`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| workId | string | 是 | 作品ID（路径参数） |
| reason | string | 是 | 举报原因 |
| description | string | 否 | 详细描述 |

**响应示例:**
```json
{
  "code": 0,
  "message": "举报成功",
  "data": null
}
```

