# WAWmanager API 快速参考指南

> 快速查找常用API接口和使用方法

---

## 🚀 快速开始

### 1. 导入API
```javascript
// 方式1：按需导入
import { getMyShop, getOrderList, getServiceList } from '@/api'

// 方式2：导入整个模块
import * as shopApi from '@/api/modules/shop'
import * as orderApi from '@/api/modules/order'
```

### 2. 调用API
```javascript
// 基本调用
const res = await getMyShop()
if (res.code === 0) {
  console.log(res.data)
}

// 带参数调用
const res = await getOrderList({
  page: 1,
  pageSize: 20,
  status: 'pending'
})

// 错误处理
try {
  const res = await getMyShop()
  console.log(res.data)
} catch (error) {
  console.error('请求失败:', error.message)
}
```

---

## 📌 常用接口速查

### 认证相关
```javascript
// 登录
import { merchantPhoneLogin, merchantPasswordLogin } from '@/api'
await merchantPhoneLogin({ phone: '13800138000', code: '123456' })
await merchantPasswordLogin({ phone: '13800138000', password: '123456' })

// 获取用户信息
import { getUserInfo, getUserRole } from '@/api'
await getUserInfo()
await getUserRole()

// 商家认证
import { getMerchantAuthStatus, submitMerchantAuth } from '@/api'
await getMerchantAuthStatus()
await submitMerchantAuth({ shopName: '店铺名称', ... })
```

### 店铺管理
```javascript
// 获取店铺信息
import { getMyShop, getShopDetail, updateShopInfo } from '@/api'
await getMyShop()                    // 获取我的店铺
await getShopDetail('shop_id')       // 获取指定店铺
await updateShopInfo('shop_id', {    // 更新店铺信息
  name: '新店铺名称',
  contactPhone: '13800138000'
})

// 营业状态
import { getBusinessStatus, updateBusinessStatus } from '@/api'
await getBusinessStatus()
await updateBusinessStatus({ isOpen: true })

// 店铺装修
import { getShopDecoration, updateShopDecoration } from '@/api'
await getShopDecoration()
await updateShopDecoration({ brandIntro: '店铺简介' })
```

### 订单管理
```javascript
// 订单列表
import { getOrderList, getOrderDetail } from '@/api'
await getOrderList({ page: 1, status: 'pending' })
await getOrderDetail('order_id')

// 订单操作
import { acceptOrder, startService, completeService } from '@/api'
await acceptOrder('order_id')        // 接单
await startService('order_id')       // 开始服务
await completeService('order_id')    // 完成服务

// 订单核销
import { verifyByCode, verifyByPhone } from '@/api'
await verifyByCode('verification_code')
await verifyByPhone({ orderId: 'xxx', phoneSuffix: '8000' })
```

### 服务管理
```javascript
// 服务列表
import { getServiceList, getServiceDetail } from '@/api'
await getServiceList({ page: 1, status: 'online' })
await getServiceDetail('service_id')

// 服务操作
import { createService, updateService, deleteService } from '@/api'
await createService({ name: '服务名称', ... })
await updateService('service_id', { name: '新名称' })
await deleteService('service_id')

// 服务状态
import { onlineService, offlineService } from '@/api'
await onlineService('service_id')    // 上架
await offlineService('service_id')   // 下架
```

### 顾客管理
```javascript
// 顾客列表
import { getCustomerList, getCustomerDetail } from '@/api'
await getCustomerList({ page: 1, type: 'all' })
await getCustomerDetail('customer_id')

// 顾客操作
import { createCustomer, updateCustomer, deleteCustomer } from '@/api'
await createCustomer({ phone: '13800138000' })
await updateCustomer('customer_id', { remark: '备注' })
await deleteCustomer('customer_id')

// 生日提醒
import { getBirthdayCustomers, sendBirthdayWish } from '@/api'
await getBirthdayCustomers({ days: 7 })
await sendBirthdayWish('customer_id', { content: '生日快乐' })
```

### 员工/技师管理
```javascript
// 员工管理
import { getStaffList, addStaff, enableStaff } from '@/api'
await getStaffList({ status: 'active' })
await addStaff({ name: '员工名称', roleId: 'xxx' })
await enableStaff('staff_id')

// 技师管理
import { getTechnicianList, getTechnicianProfile } from '@/api'
await getTechnicianList({ status: 'active' })
await getTechnicianProfile('user_id')
```

### 财务管理
```javascript
// 资产信息
import { getAssets, getBalance, getBalanceDetail } from '@/api'
await getAssets()
await getBalance()
await getBalanceDetail({ page: 1 })

// 提现
import { withdraw, getBankCards } from '@/api'
await getBankCards()
await withdraw({ amount: 100, bankCardId: 'xxx' })
```

### 数据统计
```javascript
// 统计数据
import { getTodayOverview, getRevenueStats, getOrderStats } from '@/api'
await getTodayOverview()
await getRevenueStats({ period: 'month' })
await getOrderStats({ period: 'week' })
```

---

## 🔧 配置说明

### 环境切换
```javascript
// api/config.js
let currentEnv = 'development'  // 开发环境
// let currentEnv = 'production'  // 生产环境
```

### Mock模式
```javascript
// api/config.js
const ENV = {
  development: {
    useMock: false,  // 改为 true 启用Mock模式
  }
}
```

### 跳过认证（仅开发环境）
```javascript
// api/config.js
const ENV = {
  development: {
    skipAuth: true,  // 开发环境跳过Token验证
  }
}
```

---

## 🎯 常见场景

### 场景1：页面加载时获取数据
```vue
<script setup>
import { ref, onMounted } from 'vue'
import { getMyShop } from '@/api'

const shopInfo = ref(null)

onMounted(async () => {
  try {
    const res = await getMyShop()
    if (res.code === 0) {
      shopInfo.value = res.data
    }
  } catch (error) {
    console.error('加载失败:', error)
  }
})
</script>
```

### 场景2：表单提交
```vue
<script setup>
import { ref } from 'vue'
import { updateShopInfo } from '@/api'

const form = ref({
  name: '',
  contactPhone: ''
})

const handleSubmit = async () => {
  try {
    const shopId = uni.getStorageSync('shop_id')
    const res = await updateShopInfo(shopId, form.value)
    if (res.code === 0) {
      uni.showToast({ title: '保存成功', icon: 'success' })
    }
  } catch (error) {
    uni.showToast({ title: error.message, icon: 'none' })
  }
}
</script>
```

### 场景3：列表分页加载
```vue
<script setup>
import { ref } from 'vue'
import { getOrderList } from '@/api'

const list = ref([])
const page = ref(1)
const hasMore = ref(true)

const loadMore = async () => {
  if (!hasMore.value) return

  try {
    const res = await getOrderList({
      page: page.value,
      pageSize: 20
    })

    if (res.code === 0) {
      list.value.push(...res.data.items)
      hasMore.value = res.data.hasMore
      page.value++
    }
  } catch (error) {
    console.error('加载失败:', error)
  }
}
</script>
```

### 场景4：下拉刷新
```vue
<script setup>
import { ref } from 'vue'
import { getOrderList } from '@/api'

const list = ref([])

const onRefresh = async () => {
  try {
    const res = await getOrderList({ page: 1, pageSize: 20 })
    if (res.code === 0) {
      list.value = res.data.items
      uni.showToast({ title: '刷新成功', icon: 'success' })
    }
  } catch (error) {
    uni.showToast({ title: '刷新失败', icon: 'none' })
  }
}
</script>
```

---

## ⚠️ 注意事项

### 1. Token管理
```javascript
// 获取Token
import { getToken } from '@/api/request'
const token = getToken()

// 设置Token（登录后）
import { setToken } from '@/api/request'
setToken('your_token_here')

// 清除Token（退出登录）
import { clearToken } from '@/api/request'
clearToken()
```

### 2. Shop ID管理
```javascript
// 获取Shop ID
import { getShopId } from '@/api/request'
const shopId = getShopId()

// 设置Shop ID（认证通过后）
import { setShopId } from '@/api/request'
setShopId('your_shop_id_here')
```

### 3. 错误处理
```javascript
// 统一错误处理（已在拦截器中实现）
// 页面中只需要处理业务逻辑错误

try {
  const res = await getMyShop()
  if (res.code === 0) {
    // 成功处理
  }
} catch (error) {
  // error.code - 错误码
  // error.message - 错误信息

  if (error.code === 40404) {
    // 店铺不存在，引导用户认证
    uni.navigateTo({ url: '/pages/apply/store-register' })
  }
}
```

### 4. Loading控制
```javascript
// 默认显示loading
await getMyShop()

// 禁用loading
await getMyShop({}, { loading: false })

// 自定义loading文本
await getMyShop({}, { loadingText: '加载中...' })
```

---

## 🐛 调试技巧

### 1. 查看请求日志
```javascript
// api/config.js
const ENV = {
  development: {
    debug: true,  // 开启调试模式，控制台会输出请求日志
  }
}
```

### 2. 查看网络请求
- 打开浏览器开发者工具
- 切换到 Network 标签
- 筛选 XHR 请求
- 查看请求URL、请求头、响应数据

### 3. 使用Mock数据
```javascript
// api/config.js
const ENV = {
  development: {
    useMock: true,  // 启用Mock模式
  }
}

// 修改Mock数据
// api/mock/modules/shop.js
export const shopInfo = {
  id: 'test_shop_id',
  name: '测试店铺',
  // ... 修改为你需要的测试数据
}
```

---

## 📚 相关文档

- `API-COMPATIBILITY-REPORT.md` - 完整的API接口文档
- `API-FIX-SUMMARY.md` - 详细的修复说明
- `API-FINAL-REPORT.md` - 最终报告和部署指南
- `API-DOCUMENTATION.md` - 原始API文档

---

## 🔗 快速链接

### 开发环境
- 本地开发: http://localhost:5151
- API代理: /backend → https://bioflex.cn/api

### 生产环境
- API地址: https://bioflex.cn/api
- 小程序AppID: wx87e6131ff939f2f7

### 常用命令
```bash
# 开发
npm run dev:h5              # H5开发
npm run dev:mp-weixin       # 小程序开发

# 构建
npm run build:h5            # H5构建
npm run build:mp-weixin     # 小程序构建

# 测试
npm run test                # 运行测试
npm run test:ui             # 测试UI模式
```

---

**最后更新: 2026-01-20**
