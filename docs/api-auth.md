# 认证模块 API 文档

## 模块说明
认证模块包含登录、注册、验证码、密码重置等用户身份验证相关接口。

## 接口列表

### 1. 发送验证码
**接口路径:** `POST /auth/send-code`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| phone | string | 是 | 手机号 |
| type | string | 是 | 类型：login(登录)/register(注册)/reset(重置密码) |

**响应示例:**
```json
{
  "code": 0,
  "message": "验证码发送成功",
  "data": null
}
```

---

### 2. 手机号验证码登录
**接口路径:** `POST /auth/login/code`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| phone | string | 是 | 手机号 |
| code | string | 是 | 验证码 |

**响应示例:**
```json
{
  "code": 0,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userInfo": {
      "id": "1",
      "nickname": "用户昵称",
      "avatar": "https://example.com/avatar.png",
      "phone": "138****8000"
    }
  }
}
```

---

### 3. 账号密码登录
**接口路径:** `POST /auth/login/password`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| phone | string | 是 | 手机号 |
| password | string | 是 | 密码 |

**响应示例:**
```json
{
  "code": 0,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userInfo": {
      "id": "1",
      "nickname": "用户昵称",
      "avatar": "https://example.com/avatar.png"
    }
  }
}
```

---

### 4. 微信一键登录
**接口路径:** `POST /auth/login/wechat`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| code | string | 是 | 微信授权码 |
| encryptedData | string | 是 | 加密数据 |
| iv | string | 是 | 初始向量 |

**响应示例:**
```json
{
  "code": 0,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "isNewUser": false,
    "userInfo": {}
  }
}
```

---

### 5. 苹果一键登录
**接口路径:** `POST /auth/login/apple`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| identityToken | string | 是 | 身份令牌 |
| authorizationCode | string | 是 | 授权码 |

**响应示例:**
```json
{
  "code": 0,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 6. 用户注册
**接口路径:** `POST /auth/register`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| phone | string | 是 | 手机号 |
| code | string | 是 | 验证码 |
| password | string | 是 | 密码 |
| confirmPassword | string | 是 | 确认密码 |
| inviteCode | string | 否 | 邀请码 |

**响应示例:**
```json
{
  "code": 0,
  "message": "注册成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 7. 重置密码
**接口路径:** `POST /auth/reset-password`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| phone | string | 是 | 手机号 |
| code | string | 是 | 验证码 |
| newPassword | string | 是 | 新密码 |
| confirmPassword | string | 是 | 确认新密码 |

**响应示例:**
```json
{
  "code": 0,
  "message": "密码重置成功",
  "data": null
}
```

---

### 8. 刷新 Token
**接口路径:** `POST /auth/refresh-token`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| refreshToken | string | 是 | 刷新令牌 |

**响应示例:**
```json
{
  "code": 0,
  "message": "刷新成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 9. 退出登录
**接口路径:** `POST /auth/logout`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "退出成功",
  "data": null
}
```

---

### 10. 检查手机号是否已注册
**接口路径:** `GET /auth/check-phone`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| phone | string | 是 | 手机号 |

**响应示例:**
```json
{
  "code": 0,
  "message": "查询成功",
  "data": {
    "registered": true
  }
}
```
