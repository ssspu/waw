# 私信/聊天模块 API 文档

## 模块说明
私信/聊天模块包含会话管理、消息收发、黑名单等接口，支持用户与设计师、品牌馆之间的即时通讯。

## 接口列表

### 一、会话管理

#### 1. 获取会话列表
**接口路径:** `GET /chat/conversations`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 20 | 每页数量 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "1",
        "targetType": "designer",
        "targetId": "1",
        "targetName": "李天天",
        "targetAvatar": "https://example.com/avatar.jpg",
        "lastMessage": "好的，期待您的到来",
        "lastMessageTime": "2024-01-20 14:30:00",
        "unreadCount": 2,
        "isPinned": false,
        "isMuted": false
      }
    ],
    "total": 10,
    "page": 1,
    "pageSize": 20,
    "hasMore": false
  }
}
```

---

#### 2. 获取会话详情
**接口路径:** `GET /chat/conversations/:conversationId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| conversationId | string | 是 | 会话ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "id": "1",
    "targetType": "designer",
    "targetId": "1",
    "targetName": "李天天",
    "targetAvatar": "https://example.com/avatar.jpg",
    "targetTitle": "资深发型师",
    "isPinned": false,
    "isMuted": false,
    "isBlocked": false
  }
}
```

---

#### 3. 创建/获取会话
**接口路径:** `POST /chat/conversations`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| targetType | string | 是 | 类型（designer/brand/user） |
| targetId | string | 是 | 目标ID |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "conversationId": "1"
  }
}
```

---

#### 4. 删除会话
**接口路径:** `DELETE /chat/conversations/:conversationId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| conversationId | string | 是 | 会话ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "删除成功",
  "data": null
}
```

---

#### 5. 置顶会话
**接口路径:** `PUT /chat/conversations/:conversationId/pin`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| conversationId | string | 是 | 会话ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "置顶成功",
  "data": null
}
```

---

#### 6. 取消置顶
**接口路径:** `DELETE /chat/conversations/:conversationId/pin`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| conversationId | string | 是 | 会话ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "取消置顶成功",
  "data": null
}
```

---

#### 7. 设置免打扰
**接口路径:** `PUT /chat/conversations/:conversationId/mute`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| conversationId | string | 是 | 会话ID（路径参数） |
| mute | boolean | 是 | 是否免打扰 |

**响应示例:**
```json
{
  "code": 0,
  "message": "设置成功",
  "data": null
}
```

---

### 二、消息管理

#### 8. 获取聊天记录
**接口路径:** `GET /chat/conversations/:conversationId/messages`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| conversationId | string | 是 | - | 会话ID（路径参数） |
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 20 | 每页数量 |
| beforeMsgId | string | 否 | - | 获取此消息之前的记录 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "1",
        "type": "text",
        "content": "您好，请问还有预约吗？",
        "senderId": "user_1",
        "senderName": "小美",
        "senderAvatar": "https://example.com/avatar.jpg",
        "isSelf": true,
        "createTime": "2024-01-20 14:00:00",
        "status": "read"
      },
      {
        "id": "2",
        "type": "text",
        "content": "您好，有的，请问您想预约什么时间？",
        "senderId": "designer_1",
        "senderName": "李天天",
        "senderAvatar": "https://example.com/designer.jpg",
        "isSelf": false,
        "createTime": "2024-01-20 14:05:00",
        "status": "read"
      }
    ],
    "total": 50,
    "page": 1,
    "pageSize": 20,
    "hasMore": true
  }
}
```

---

#### 9. 发送消息
**接口路径:** `POST /chat/conversations/:conversationId/messages`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| conversationId | string | 是 | 会话ID（路径参数） |
| type | string | 是 | 消息类型（text/image/service） |
| content | string | 是 | 消息内容（文本或图片URL） |
| extra | object | 否 | 附加数据 |

**响应示例:**
```json
{
  "code": 0,
  "message": "发送成功",
  "data": {
    "messageId": "100",
    "createTime": "2024-01-20 14:30:00"
  }
}
```

---

#### 10. 删除消息
**接口路径:** `DELETE /chat/conversations/:conversationId/messages/:messageId`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| conversationId | string | 是 | 会话ID（路径参数） |
| messageId | string | 是 | 消息ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "删除成功",
  "data": null
}
```

---

#### 11. 撤回消息
**接口路径:** `POST /chat/conversations/:conversationId/messages/:messageId/recall`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| conversationId | string | 是 | 会话ID（路径参数） |
| messageId | string | 是 | 消息ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "撤回成功",
  "data": null
}
```

---

### 三、已读状态

#### 12. 标记会话已读
**接口路径:** `PUT /chat/conversations/:conversationId/read`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| conversationId | string | 是 | 会话ID（路径参数） |

**响应示例:**
```json
{
  "code": 0,
  "message": "标记成功",
  "data": null
}
```

---

#### 13. 标记所有已读
**接口路径:** `PUT /chat/conversations/read-all`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "全部标记成功",
  "data": null
}
```

---

#### 14. 获取未读消息数
**接口路径:** `GET /chat/unread-count`

**请求参数:** 无

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "count": 5
  }
}
```

---

### 四、黑名单管理

#### 15. 拉黑用户
**接口路径:** `POST /chat/block`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| targetType | string | 是 | 类型（designer/brand/user） |
| targetId | string | 是 | 目标ID |

**响应示例:**
```json
{
  "code": 0,
  "message": "拉黑成功",
  "data": null
}
```

---

#### 16. 取消拉黑
**接口路径:** `POST /chat/unblock`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| targetType | string | 是 | 类型（designer/brand/user） |
| targetId | string | 是 | 目标ID |

**响应示例:**
```json
{
  "code": 0,
  "message": "取消拉黑成功",
  "data": null
}
```

---

#### 17. 获取黑名单列表
**接口路径:** `GET /chat/block-list`

**请求参数:**
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| page | number | 否 | 1 | 页码 |
| pageSize | number | 否 | 20 | 每页数量 |

**响应示例:**
```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "targetType": "user",
        "targetId": "100",
        "targetName": "某用户",
        "targetAvatar": "https://example.com/avatar.jpg",
        "blockTime": "2024-01-15 10:00:00"
      }
    ],
    "total": 1,
    "page": 1,
    "pageSize": 20,
    "hasMore": false
  }
}
```

---

### 五、特殊消息

#### 18. 发送服务卡片
**接口路径:** `POST /chat/conversations/:conversationId/service-card`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| conversationId | string | 是 | 会话ID（路径参数） |
| serviceId | string | 是 | 服务ID |
| designerId | string | 否 | 设计师ID |

**响应示例:**
```json
{
  "code": 0,
  "message": "发送成功",
  "data": {
    "messageId": "101"
  }
}
```

---

#### 19. 发送预约卡片
**接口路径:** `POST /chat/conversations/:conversationId/appointment-card`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| conversationId | string | 是 | 会话ID（路径参数） |
| orderId | string | 是 | 订单ID |

**响应示例:**
```json
{
  "code": 0,
  "message": "发送成功",
  "data": {
    "messageId": "102"
  }
}
```

---

### 六、举报

#### 20. 举报用户/消息
**接口路径:** `POST /chat/report`

**请求参数:**
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| conversationId | string | 是 | 会话ID |
| messageId | string | 否 | 消息ID（举报具体消息时） |
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

