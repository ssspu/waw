# WAWmanager 开发指南

> 快速上手 WAWmanager 商家端开发

---

## 🚀 快速开始

### 1. 环境准备

**必需软件：**
- Node.js >= 16.0.0
- npm >= 8.0.0
- 微信开发者工具（小程序开发）

**安装依赖：**
```bash
npm install
```

### 2. 启动开发

**方式1：使用快速启动脚本（推荐）**
```bash
bash scripts/start.sh
```

**方式2：手动启动**
```bash
# H5开发
npm run dev:h5

# 小程序开发
npm run dev:mp-weixin
```

### 3. 访问应用

**H5开发：**
- 访问地址: http://localhost:5151
- 自动打开浏览器

**小程序开发：**
- 构建目录: `unpackage/dist/dev/mp-weixin`
- 使用微信开发者工具打开该目录

---

## 📁 项目结构

```
WAWmanager/
├── api/                    # API接口层
│   ├── config.js          # 环境配置
│   ├── request.js         # 请求封装
│   ├── modules/           # API模块
│   │   ├── auth.js       # 认证模块
│   │   ├── shop.js       # 店铺模块
│   │   ├── order.js      # 订单模块
│   │   ├── service.js    # 服务模块
│   │   └── ...
│   └── mock/              # Mock数据
├── pages/                  # 页面文件
│   ├── auth/              # 认证页面
│   ├── shop/              # 店铺管理
│   ├── order/             # 订单管理
│   ├── service/           # 服务管理
│   └── ...
├── components/             # 公共组件
├── store/                  # Pinia状态管理
├── styles/                 # 全局样式
├── utils/                  # 工具函数
├── scripts/                # 开发脚本
│   ├── start.sh           # 快速启动
│   ├── check-api-health.sh # API健康检查
│   └── test-api.sh        # API测试
└── static/                 # 静态资源
```

---

## 🔧 开发工具

### 1. API健康检查
```bash
bash scripts/check-api-health.sh
```

**检查内容：**
- API模块文件完整性
- 配置文件正确性
- 错误的API调用
- 硬编码的URL
- Mock数据更新
- 文档完整性

### 2. API测试
```bash
bash scripts/test-api.sh
```

**测试内容：**
- 公开接口可访问性
- 认证接口正常性
- 响应格式正确性

### 3. 快速启动
```bash
bash scripts/start.sh
```

**功能：**
- 自动检查依赖
- 清理旧构建产物
- 选择启动模式
- 一键启动开发

---

## 📝 开发规范

### 1. API调用规范

**✅ 正确的方式：**
```javascript
// 导入API
import { getMyShop, getOrderList } from '@/api'

// 调用API
const res = await getMyShop()
if (res.code === 0) {
  console.log(res.data)
}
```

**❌ 错误的方式：**
```javascript
// 不要直接使用 uni.request
uni.request({
  url: 'https://bioflex.cn/api/shop/my',
  method: 'GET'
})

// 不要硬编码URL
const url = 'https://bioflex.cn/api/shop/my'
```

### 2. 错误处理规范

```javascript
try {
  const res = await getMyShop()
  if (res.code === 0) {
    // 成功处理
    console.log(res.data)
  }
} catch (error) {
  // 错误处理
  if (error.code === 40404) {
    // 店铺不存在
    uni.navigateTo({ url: '/pages/apply/store-register' })
  } else {
    // 其他错误
    uni.showToast({ title: error.message, icon: 'none' })
  }
}
```

### 3. 组件开发规范

```vue
<template>
  <view class="container">
    <!-- 内容 -->
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMyShop } from '@/api'

// 响应式数据
const shopInfo = ref(null)
const loading = ref(false)

// 生命周期
onMounted(() => {
  loadData()
})

// 方法
const loadData = async () => {
  loading.value = true
  try {
    const res = await getMyShop()
    if (res.code === 0) {
      shopInfo.value = res.data
    }
  } catch (error) {
    console.error('加载失败:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 24rpx;
}
</style>
```

---

## 🐛 调试技巧

### 1. 开启调试模式

```javascript
// api/config.js
const ENV = {
  development: {
    debug: true,  // 开启调试，控制台输出请求日志
  }
}
```

### 2. 使用Mock模式

```javascript
// api/config.js
const ENV = {
  development: {
    useMock: true,  // 启用Mock模式
  }
}
```

### 3. 查看网络请求

**浏览器：**
1. 打开开发者工具 (F12)
2. 切换到 Network 标签
3. 筛选 XHR 请求
4. 查看请求详情

**微信开发者工具：**
1. 打开调试器
2. 切换到 Network 标签
3. 查看请求详情

### 4. 常见问题排查

**问题1：CORS错误**
```
解决方案：
1. 检查 vite.config.js 代理配置
2. 确保使用 /backend 前缀
3. 联系后端配置CORS
```

**问题2：401 Unauthorized**
```
解决方案：
1. 检查Token是否存在
2. 检查Token是否过期
3. 重新登录获取Token
```

**问题3：404 Not Found**
```
解决方案：
1. 检查API路径是否正确
2. 检查后端接口是否存在
3. 查看API文档确认端点
```

---

## 📚 文档索引

### API文档
- **API-COMPATIBILITY-REPORT.md** - 完整的API接口文档
- **API-QUICK-REFERENCE.md** - 快速参考指南
- **API-FIX-SUMMARY.md** - 修复说明
- **API-FINAL-REPORT.md** - 最终报告

### 开发文档
- **CLAUDE.md** - 项目概述和开发状态
- **README-API-FIX.md** - API对齐完成报告
- **DEVELOPMENT-GUIDE.md** - 本文档

---

## 🚢 部署指南

### 1. H5部署

```bash
# 构建
npm run build:h5

# 构建产物
unpackage/dist/build/h5/

# 部署
上传到Web服务器
```

### 2. 小程序部署

```bash
# 构建
npm run build:mp-weixin

# 构建产物
unpackage/dist/build/mp-weixin/

# 上传
使用微信开发者工具上传
```

### 3. 部署前检查

- [ ] 确认环境配置正确
- [ ] 确认API地址正确
- [ ] 确认小程序AppID正确
- [ ] 运行健康检查脚本
- [ ] 测试关键功能
- [ ] 清理console.log

---

## 💡 最佳实践

### 1. 性能优化

**图片优化：**
```javascript
// 使用压缩后的图片
<image src="/static/images/logo.png" mode="aspectFit" />

// 懒加载
<image src="/static/images/banner.png" lazy-load />
```

**请求优化：**
```javascript
// 禁用不必要的loading
await getServiceCategories({}, { loading: false })

// 使用缓存
const categories = uni.getStorageSync('categories')
if (!categories) {
  const res = await getServiceCategories()
  uni.setStorageSync('categories', res.data)
}
```

### 2. 代码质量

**使用ESLint：**
```bash
npm install --save-dev eslint
npx eslint --init
```

**使用TypeScript：**
```bash
npm install --save-dev typescript
```

### 3. 测试

**单元测试：**
```bash
npm install --save-dev vitest
npm run test
```

**E2E测试：**
```bash
npm run test:ui
```

---

## 🔗 相关链接

- **uni-app文档：** https://uniapp.dcloud.net.cn/
- **Vue 3文档：** https://cn.vuejs.org/
- **Pinia文档：** https://pinia.vuejs.org/zh/
- **微信小程序文档：** https://developers.weixin.qq.com/miniprogram/dev/framework/

---

## 📞 技术支持

**遇到问题？**
1. 查看文档：`API-QUICK-REFERENCE.md`
2. 运行健康检查：`bash scripts/check-api-health.sh`
3. 查看控制台日志
4. 检查网络请求

**常用命令：**
```bash
# 安装依赖
npm install

# 启动开发
bash scripts/start.sh

# 健康检查
bash scripts/check-api-health.sh

# API测试
bash scripts/test-api.sh

# 清理构建
rm -rf unpackage/dist
```

---

**最后更新：** 2026-01-20
**版本：** 1.0.0
