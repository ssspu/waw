# 入驻模块 API 文档

## 模块说明
入驻模块包含设计师入驻、门店入驻、审核状态、证件上传等接口。

## 接口列表

### 一、设计师入驻

#### 1. 获取设计师入驻进度
**接口路径:** `GET /settlement/designer/progress`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "step": 2,
    "steps": [
      { "name": "身份认证", "status": "completed" },
      { "name": "职业认证", "status": "current" },
      { "name": "签署协议", "status": "pending" },
      { "name": "结算信息", "status": "pending" }
    ]
  }
}
```

---

#### 2. 提交设计师身份认证
**接口路径:** `POST /settlement/designer/identity`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| realName | string | 是 | 真实姓名 |
| idCardNo | string | 是 | 身份证号 |
| idCardFront | string | 是 | 身份证正面照片URL |
| idCardBack | string | 是 | 身份证背面照片URL |

**响应示例:**
```json
{
  "code": 0,
  "message": "提交成功",
  "data": null
}
```

---

#### 3. 提交设计师职业认证
**接口路径:** `POST /settlement/designer/profession`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| profession | string | 是 | 职业类型 |
| certificates | array | 否 | 证书照片URL数组 |
| experience | number | 是 | 从业年限 |
| specialties | array | 是 | 擅长领域数组 |
| works | array | 否 | 作品照片URL数组 |

**响应示例:**
```json
{
  "code": 0,
  "message": "提交成功",
  "data": null
}
```

---

#### 4. 获取设计师合作协议
**接口路径:** `GET /settlement/designer/agreement`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "title": "设计师合作协议",
    "content": "协议内容...",
    "version": "1.0"
  }
}
```

---

#### 5. 同意设计师合作协议
**接口路径:** `POST /settlement/designer/agreement/agree`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "签署成功",
  "data": null
}
```

---

#### 6. 提交设计师结算信息
**接口路径:** `POST /settlement/designer/settlement`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| settlementType | string | 是 | 结算方式（bank/alipay/wechat） |
| accountName | string | 是 | 账户名称 |
| bankName | string | 否 | 银行名称（银行卡必填） |
| branchName | string | 否 | 支行名称（银行卡必填） |
| accountNumber | string | 是 | 账号 |

**响应示例:**
```json
{
  "code": 0,
  "message": "提交成功",
  "data": null
}
```

---

#### 7. 提交设计师入驻申请
**接口路径:** `POST /settlement/designer/submit`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "提交成功，请等待审核",
  "data": {
    "applicationId": "DA202401200001"
  }
}
```

---

#### 8. 获取设计师入驻申请状态
**接口路径:** `GET /settlement/designer/status`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "status": "reviewing",
    "statusText": "审核中",
    "submitTime": "2024-01-20 10:00:00",
    "rejectReason": null
  }
}
```

---

### 二、门店入驻

#### 9. 获取门店入驻进度
**接口路径:** `GET /settlement/store/progress`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "step": 1,
    "steps": [
      { "name": "门店信息", "status": "current" },
      { "name": "执照认证", "status": "pending" },
      { "name": "签署协议", "status": "pending" },
      { "name": "结算信息", "status": "pending" }
    ]
  }
}
```

---

#### 10. 提交门店认证
**接口路径:** `POST /settlement/store/info`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| storeName | string | 是 | 门店名称 |
| storeType | string | 是 | 门店类型 |
| address | string | 是 | 门店地址 |
| phone | string | 是 | 联系电话 |
| logo | string | 是 | 门店Logo URL |
| photos | array | 是 | 门店照片URL数组 |
| introduction | string | 否 | 门店介绍 |

**响应示例:**
```json
{
  "code": 0,
  "message": "提交成功",
  "data": null
}
```

---

#### 11. 提交门店执照认证
**接口路径:** `POST /settlement/store/license`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| licenseName | string | 是 | 营业执照名称 |
| licenseNo | string | 是 | 营业执照号 |
| licensePhoto | string | 是 | 营业执照照片URL |
| legalPerson | string | 是 | 法人姓名 |
| legalIdCard | string | 是 | 法人身份证号 |

**响应示例:**
```json
{
  "code": 0,
  "message": "提交成功",
  "data": null
}
```

---

#### 12. 获取门店合作协议
**接口路径:** `GET /settlement/store/agreement`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "title": "门店合作协议",
    "content": "协议内容...",
    "version": "1.0"
  }
}
```

---

#### 13. 同意门店合作协议
**接口路径:** `POST /settlement/store/agreement/agree`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "签署成功",
  "data": null
}
```

---

#### 14. 提交门店结算信息
**接口路径:** `POST /settlement/store/settlement`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| settlementType | string | 是 | 结算方式 |
| accountType | string | 是 | 账户类型（personal/corporate） |
| accountName | string | 是 | 账户名称 |
| bankName | string | 是 | 银行名称 |
| branchName | string | 是 | 支行名称 |
| bankCity | string | 是 | 开户城市 |
| accountNumber | string | 是 | 银行账号 |

**响应示例:**
```json
{
  "code": 0,
  "message": "提交成功",
  "data": null
}
```

---

#### 15. 提交门店入驻申请
**接口路径:** `POST /settlement/store/submit`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "提交成功，请等待审核",
  "data": {
    "applicationId": "SA202401200001"
  }
}
```

---

#### 16. 获取门店入驻申请状态
**接口路径:** `GET /settlement/store/status`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "status": "approved",
    "statusText": "审核通过",
    "submitTime": "2024-01-15 10:00:00",
    "approveTime": "2024-01-18 14:30:00"
  }
}
```

---

### 三、通用接口

#### 17. 上传入驻相关图片
**接口路径:** `POST /settlement/upload`

**请求参数:** FormData 文件上传
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| file | File | 是 | 图片文件 |
| type | string | 是 | 类型（idCard/license/certificate/work/logo/photo） |

**响应示例:**
```json
{
  "code": 0,
  "message": "上传成功",
  "data": {
    "url": "https://example.com/uploads/image.png"
  }
}
```

---

#### 18. 获取银行列表
**接口路径:** `GET /settlement/banks`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": [
    { "code": "CMB", "name": "招商银行" },
    { "code": "ICBC", "name": "工商银行" }
  ]
}
```

---

#### 19. 获取银行支行列表
**接口路径:** `GET /settlement/branches`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| bankCode | string | 是 | 银行代码 |
| city | string | 是 | 城市 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": [
    { "code": "CMB001", "name": "招商银行成都天府支行" },
    { "code": "CMB002", "name": "招商银行成都高新支行" }
  ]
}
```

---

#### 20. 获取职业类型列表
**接口路径:** `GET /settlement/professions`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": [
    { "id": "1", "name": "发型师" },
    { "id": "2", "name": "美容师" },
    { "id": "3", "name": "化妆师" },
    { "id": "4", "name": "美甲师" }
  ]
}
```

---

#### 21. 获取门店类型列表
**接口路径:** `GET /settlement/store-types`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": [
    { "id": "1", "name": "美发沙龙" },
    { "id": "2", "name": "美容院" },
    { "id": "3", "name": "综合美业" }
  ]
}
```

---

#### 22. 撤销入驻申请
**接口路径:** `POST /settlement/:type/cancel`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | string | 是 | 类型（designer/store）（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "撤销成功",
  "data": null
}
```

---

#### 23. 重新提交入驻申请
**接口路径:** `POST /settlement/:type/resubmit`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| type | string | 是 | 类型（designer/store）（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "重新提交成功",
  "data": null
}
```

