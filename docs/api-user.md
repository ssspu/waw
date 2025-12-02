# 用户模块 API 文档

## 模块说明
用户模块包含用户信息、资产、收藏、关注、地址、银行卡、会员等接口。

## 接口列表

### 1. 获取用户信息
**接口路径:** `GET /user/info`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "id": "1",
    "nickname": "小美",
    "avatar": "https://example.com/avatar.png",
    "phone": "138****8000",
    "gender": 2,
    "birthday": "1995-01-01",
    "signature": "爱美丽，爱生活",
    "vipLevel": 2,
    "vipExpireTime": "2025-01-01"
  }
}
```

---

### 2. 更新用户信息
**接口路径:** `PUT /user/info`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| nickname | string | 否 | 昵称 |
| avatar | string | 否 | 头像URL |
| gender | number | 否 | 性别（0未知/1男/2女） |
| birthday | string | 否 | 生日 |
| signature | string | 否 | 个性签名 |

**响应示例:**
```json
{
  "code": 0,
  "message": "更新成功",
  "data": null
}
```

---

### 3. 上传头像
**接口路径:** `POST /user/avatar`

**请求参数:** FormData 文件上传

**响应示例:**
```json
{
  "code": 0,
  "message": "上传成功",
  "data": {
    "url": "https://example.com/avatar/new.png"
  }
}
```

---

### 4. 修改密码
**接口路径:** `PUT /user/password`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| oldPassword | string | 是 | 旧密码 |
| newPassword | string | 是 | 新密码 |
| confirmPassword | string | 是 | 确认新密码 |

**响应示例:**
```json
{
  "code": 0,
  "message": "密码修改成功",
  "data": null
}
```

---

### 5. 绑定手机号
**接口路径:** `POST /user/bindPhone`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| phone | string | 是 | 手机号 |
| code | string | 是 | 验证码 |

**响应示例:**
```json
{
  "code": 0,
  "message": "绑定成功",
  "data": null
}
```

---

### 6. 更换手机号
**接口路径:** `PUT /user/phone`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| oldPhone | string | 是 | 原手机号 |
| oldCode | string | 是 | 原手机验证码 |
| newPhone | string | 是 | 新手机号 |
| newCode | string | 是 | 新手机验证码 |

**响应示例:**
```json
{
  "code": 0,
  "message": "更换成功",
  "data": null
}
```

---

### 7. 获取用户资产概览
**接口路径:** `GET /user/asset`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "balance": 1280.50,
    "couponCount": 5,
    "pointCount": 3680
  }
}
```

---

### 8. 获取资产明细
**接口路径:** `GET /user/asset/detail`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| type | string | 否 | - | 类型（income/expense） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "1",
        "type": "expense",
        "amount": -99,
        "title": "订单支付",
        "description": "精致剪发",
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

### 9. 提现申请
**接口路径:** `POST /user/withdraw`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| amount | number | 是 | 提现金额 |
| bankCardId | string | 是 | 银行卡ID |

**响应示例:**
```json
{
  "code": 0,
  "message": "提现申请已提交",
  "data": {
    "withdrawId": "WD202401200001"
  }
}
```

---

### 10. 获取收藏列表
**接口路径:** `GET /user/favorites`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| type | string | 否 | - | 类型（designer/brand/service） |

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
        "name": "李天天",
        "avatar": "https://example.com/avatar.png",
        "description": "店长｜从业12年",
        "createTime": "2024-01-15"
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

### 11. 批量取消收藏
**接口路径:** `POST /user/favorites/batch-remove`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| ids | array | 是 | 收藏ID数组 |
| type | string | 是 | 类型 |

**响应示例:**
```json
{
  "code": 0,
  "message": "取消成功",
  "data": null
}
```

---

### 12. 获取关注列表
**接口路径:** `GET /user/follows`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| type | string | 否 | - | 类型（designer/brand） |

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
        "name": "李天天",
        "avatar": "https://example.com/avatar.png",
        "description": "店长｜从业12年"
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

### 13. 获取浏览记录
**接口路径:** `GET /user/browse-records`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 10 | 每页数量 |
| type | string | 否 | - | 类型 |

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
        "name": "李天天",
        "avatar": "https://example.com/avatar.png",
        "browseTime": "2024-01-20 10:30:00"
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

### 14. 清空浏览记录
**接口路径:** `DELETE /user/browse-records`

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

### 15. 获取地址列表
**接口路径:** `GET /user/address`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": [
    {
      "id": "1",
      "name": "小美",
      "phone": "13800138000",
      "province": "四川省",
      "city": "成都市",
      "district": "武侯区",
      "detail": "天府三街123号",
      "isDefault": true
    }
  ]
}
```

---

### 16. 新增地址
**接口路径:** `POST /user/address`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| name | string | 是 | 联系人 |
| phone | string | 是 | 手机号 |
| province | string | 是 | 省份 |
| city | string | 是 | 城市 |
| district | string | 是 | 区县 |
| detail | string | 是 | 详细地址 |
| isDefault | boolean | 否 | 是否默认 |

**响应示例:**
```json
{
  "code": 0,
  "message": "添加成功",
  "data": {
    "id": "2"
  }
}
```

---

### 17. 更新地址
**接口路径:** `PUT /user/address/:addressId`

**请求参数:** 同新增地址

**响应示例:**
```json
{
  "code": 0,
  "message": "更新成功",
  "data": null
}
```

---

### 18. 删除地址
**接口路径:** `DELETE /user/address/:addressId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| addressId | string | 是 | 地址ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "删除成功",
  "data": null
}
```

---

### 19. 获取银行卡列表
**接口路径:** `GET /user/bank-cards`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": [
    {
      "id": "1",
      "bankName": "招商银行",
      "bankLogo": "https://example.com/bank/cmb.png",
      "cardNumber": "****1234",
      "holderName": "张**"
    }
  ]
}
```

---

### 20. 添加银行卡
**接口路径:** `POST /user/bank-cards`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| cardNumber | string | 是 | 卡号 |
| bankName | string | 是 | 银行名称 |
| holderName | string | 是 | 持卡人姓名 |
| phone | string | 是 | 预留手机号 |

**响应示例:**
```json
{
  "code": 0,
  "message": "添加成功",
  "data": {
    "id": "2"
  }
}
```

---

### 21. 获取会员信息
**接口路径:** `GET /user/vip`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "isVip": true,
    "level": 2,
    "levelName": "黄金会员",
    "expireTime": "2025-01-01",
    "points": 3680,
    "privileges": [
      { "name": "专属折扣", "description": "享受9折优惠" },
      { "name": "优先预约", "description": "热门时段优先" }
    ]
  }
}
```

---

### 22. 开通/续费会员
**接口路径:** `POST /user/vip/buy`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| levelId | string | 是 | 会员等级ID |
| months | number | 是 | 购买月数 |
| paymentMethod | string | 是 | 支付方式 |

**响应示例:**
```json
{
  "code": 0,
  "message": "开通成功",
  "data": {
    "orderId": "VIP202401200001",
    "expireTime": "2025-01-20"
  }
}
```

---

### 23. 提交意见反馈
**接口路径:** `POST /user/feedback`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | string | 是 | 反馈类型 |
| content | string | 是 | 反馈内容 |
| images | array | 否 | 图片数组 |
| contact | string | 否 | 联系方式 |

**响应示例:**
```json
{
  "code": 0,
  "message": "反馈提交成功",
  "data": null
}
```
