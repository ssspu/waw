# 通用模块 API 文档

## 模块说明
通用模块包含公共配置、首页数据、Banner、分类、搜索、地区、上传、协议等公共接口。

## 接口列表

### 1. 获取应用配置
**接口路径:** `GET /common/config`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "version": "1.0.0",
    "features": {
      "vip": true,
      "coupon": true,
      "territory": true
    },
    "agreements": {
      "user": "https://example.com/user-agreement",
      "privacy": "https://example.com/privacy-policy"
    }
  }
}
```

---

### 2. 获取首页数据
**接口路径:** `GET /common/home`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "banners": [],
    "recommendDesigners": [],
    "hotBrands": [],
    "newServices": []
  }
}
```

---

### 3. 获取 Banner 列表
**接口路径:** `GET /common/banners`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| position | string | 否 | 位置（home/brand/designer） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": [
    {
      "id": "1",
      "image": "https://example.com/banner1.png",
      "link": "/pages/activity/detail?id=1",
      "title": "春季特惠"
    }
  ]
}
```

---

### 4. 获取分类列表
**接口路径:** `GET /common/categories`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | string | 否 | 类型（service/designer） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": [
    {
      "id": "1",
      "name": "剪发",
      "icon": "https://example.com/icon/cut.png"
    },
    {
      "id": "2",
      "name": "染发",
      "icon": "https://example.com/icon/dye.png"
    }
  ]
}
```

---

### 5. 搜索
**接口路径:** `GET /common/search`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| keyword | string | 是 | - | 搜索关键词 |
| type | string | 否 | all | 类型（all/designer/brand/service） |
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "designers": [],
    "brands": [],
    "services": [],
    "total": 50
  }
}
```

---

### 6. 获取搜索热词
**接口路径:** `GET /common/hot-keywords`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": ["剪发", "染发", "护理", "造型"]
}
```

---

### 7. 获取搜索历史
**接口路径:** `GET /common/search-history`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": ["烫发", "短发造型", "挑染"]
}
```

---

### 8. 清空搜索历史
**接口路径:** `POST /common/search-history/clear`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "清空成功",
  "data": null
}
```

---

### 9. 获取地区列表
**接口路径:** `GET /common/regions`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| parentId | string | 否 | 父级ID，不传获取省份 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": [
    {
      "id": "510000",
      "name": "四川省",
      "children": []
    }
  ]
}
```

---

### 10. 获取热门城市
**接口路径:** `GET /common/hot-cities`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": [
    { "id": "510100", "name": "成都市" },
    { "id": "110100", "name": "北京市" },
    { "id": "310100", "name": "上海市" }
  ]
}
```

---

### 11. 上传文件
**接口路径:** `POST /common/upload`

**请求参数:** FormData 文件上传
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| file | File | 是 | 文件 |
| type | string | 否 | 类型（image/video） |
| category | string | 否 | 分类 |

**响应示例:**
```json
{
  "code": 0,
  "message": "上传成功",
  "data": {
    "url": "https://example.com/uploads/file.png"
  }
}
```

---

### 12. 获取协议内容
**接口路径:** `GET /common/agreement/:type`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | string | 是 | 协议类型（user/privacy/service） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "title": "用户协议",
    "content": "协议内容..."
  }
}
```

---

### 13. 获取关于我们
**接口路径:** `GET /common/about`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "companyName": "WAW美业平台",
    "introduction": "公司介绍...",
    "contact": "400-xxx-xxxx"
  }
}
```

---

### 14. 检查更新
**接口路径:** `GET /common/check-update`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| platform | string | 是 | 平台（ios/android） |
| version | string | 是 | 当前版本 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "hasUpdate": true,
    "version": "1.1.0",
    "forceUpdate": false,
    "updateUrl": "https://example.com/download",
    "updateLog": "1. 修复已知问题\n2. 优化用户体验"
  }
}
```

---

### 15. 获取客服信息
**接口路径:** `GET /common/customer-service`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "phone": "400-xxx-xxxx",
    "workTime": "9:00-18:00",
    "wechat": "waw_service"
  }
}
```

---

### 16. 获取银行列表
**接口路径:** `GET /common/banks`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": [
    { "code": "CMB", "name": "招商银行", "logo": "https://example.com/bank/cmb.png" },
    { "code": "ICBC", "name": "工商银行", "logo": "https://example.com/bank/icbc.png" }
  ]
}
```

---

### 17. 获取支付方式列表
**接口路径:** `GET /common/payment-methods`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": [
    { "code": "wechat", "name": "微信支付", "icon": "wechat-pay" },
    { "code": "alipay", "name": "支付宝", "icon": "alipay" },
    { "code": "balance", "name": "余额支付", "icon": "wallet" }
  ]
}
```

---

### 18. 获取排行榜数据
**接口路径:** `GET /common/ranking`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | string | 否 | 排行榜类型（rookie/pro/service） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "rank": 1,
        "id": "1",
        "name": "张三",
        "avatar": "https://example.com/avatar.png",
        "score": 9.8
      }
    ]
  }
}
```

---

### 19. 获取所有排行榜数据
**接口路径:** `GET /common/ranking/all`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "rookie": [],
    "pro": [],
    "service": []
  }
}
```

