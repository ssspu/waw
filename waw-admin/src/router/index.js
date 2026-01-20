import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', hidden: true }
  },
  {
    path: '/',
    component: () => import('@/components/layout/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '控制台', icon: 'Odometer' }
      }
    ]
  },
  // 用户端管理（设计师、服务、品牌馆）
  {
    path: '/client',
    component: () => import('@/components/layout/index.vue'),
    redirect: '/client/designer/list',
    meta: { title: '用户端管理', icon: 'Monitor' },
    children: [
      { path: 'designer/list', name: 'DesignerList', component: () => import('@/views/designer/list.vue'), meta: { title: '设计师列表', parent: '设计师管理' } },
      { path: 'designer/audit', name: 'DesignerAudit', component: () => import('@/views/designer/audit.vue'), meta: { title: '设计师审核', parent: '设计师管理' } },
      { path: 'designer/works', name: 'DesignerWorks', component: () => import('@/views/designer/works.vue'), meta: { title: '作品管理', parent: '设计师管理' } },
      { path: 'designer/reviews', name: 'DesignerReviews', component: () => import('@/views/designer/reviews.vue'), meta: { title: '评价管理', parent: '设计师管理' } },
      { path: 'service/list', name: 'ServiceList', component: () => import('@/views/service/list.vue'), meta: { title: '服务列表', parent: '服务管理' } },
      { path: 'service/category', name: 'ServiceCategory', component: () => import('@/views/service/category.vue'), meta: { title: '服务分类', parent: '服务管理' } },
      { path: 'brand/list', name: 'BrandList', component: () => import('@/views/brand/list.vue'), meta: { title: '品牌列表', parent: '品牌馆管理' } },
      { path: 'brand/audit', name: 'BrandAudit', component: () => import('@/views/brand/audit.vue'), meta: { title: '品牌审核', parent: '品牌馆管理' } }
    ]
  },
  // 用户管理
  {
    path: '/user',
    component: () => import('@/components/layout/index.vue'),
    redirect: '/user/list',
    meta: { title: '用户管理', icon: 'UserFilled' },
    children: [
      { path: 'list', name: 'UserList', component: () => import('@/views/user/list.vue'), meta: { title: '用户列表' } },
      { path: 'detail', name: 'UserDetail', component: () => import('@/views/user/detail.vue'), meta: { title: '用户详情', hidden: true } },
      { path: 'vip', name: 'UserVip', component: () => import('@/views/user/vip.vue'), meta: { title: '会员管理' } },
      { path: 'level', name: 'UserLevel', component: () => import('@/views/user/level.vue'), meta: { title: '会员等级' } },
      { path: 'rights', name: 'UserRights', component: () => import('@/views/user/rights.vue'), meta: { title: '会员权益' } },
      { path: 'points', name: 'UserPoints', component: () => import('@/views/user/points.vue'), meta: { title: '积分管理' } }
    ]
  },
  // 订单管理
  {
    path: '/order',
    component: () => import('@/components/layout/index.vue'),
    redirect: '/order/list',
    meta: { title: '订单管理', icon: 'Document' },
    children: [
      { path: 'list', name: 'OrderList', component: () => import('@/views/order/list.vue'), meta: { title: '订单列表' } },
      { path: 'detail', name: 'OrderDetail', component: () => import('@/views/order/detail.vue'), meta: { title: '订单详情', hidden: true } },
      { path: 'refund', name: 'OrderRefund', component: () => import('@/views/order/refund.vue'), meta: { title: '退款管理' } }
    ]
  },
  // 商家管理（整合店铺管理和技师管理）
  {
    path: '/merchant',
    component: () => import('@/components/layout/index.vue'),
    redirect: '/merchant/list',
    meta: { title: '商家管理', icon: 'Shop' },
    children: [
      { path: 'list', name: 'MerchantList', component: () => import('@/views/merchant/list.vue'), meta: { title: '商家列表' } },
      { path: 'detail', name: 'MerchantDetail', component: () => import('@/views/merchant/detail.vue'), meta: { title: '商家详情', hidden: true } },
      { path: 'audit', name: 'MerchantAudit', component: () => import('@/views/merchant/audit.vue'), meta: { title: '商家审核' } },
      { path: 'shop/list', name: 'ShopList', component: () => import('@/views/shop/list.vue'), meta: { title: '店铺列表', parent: '店铺管理' } },
      { path: 'shop/chain', name: 'ShopChain', component: () => import('@/views/shop/chain.vue'), meta: { title: '连锁店铺', parent: '店铺管理' } },
      { path: 'shop/decoration', name: 'ShopDecoration', component: () => import('@/views/shop/decoration.vue'), meta: { title: '店铺装修', parent: '店铺管理' } },
      { path: 'technician/list', name: 'TechnicianList', component: () => import('@/views/technician/list.vue'), meta: { title: '技师列表', parent: '技师管理' } }
    ]
  },
  // 财务管理
  {
    path: '/finance',
    component: () => import('@/components/layout/index.vue'),
    redirect: '/finance/overview',
    meta: { title: '财务管理', icon: 'Wallet' },
    children: [
      { path: 'overview', name: 'FinanceOverview', component: () => import('@/views/finance/overview.vue'), meta: { title: '收入概览' } },
      { path: 'income', name: 'FinanceIncome', component: () => import('@/views/finance/income.vue'), meta: { title: '订单收入' } },
      { path: 'withdraw', name: 'FinanceWithdraw', component: () => import('@/views/finance/withdraw.vue'), meta: { title: '提现管理' } },
      { path: 'settlement', name: 'FinanceSettlement', component: () => import('@/views/finance/settlement.vue'), meta: { title: '结算管理' } }
    ]
  },
  // 营销管理
  {
    path: '/marketing',
    component: () => import('@/components/layout/index.vue'),
    redirect: '/marketing/coupon',
    meta: { title: '营销管理', icon: 'TrendCharts' },
    children: [
      { path: 'coupon', name: 'MarketingCoupon', component: () => import('@/views/marketing/coupon.vue'), meta: { title: '优惠券管理' } },
      { path: 'distribution', name: 'MarketingDistribution', component: () => import('@/views/marketing/distribution.vue'), meta: { title: '分销管理' } },
      { path: 'activity', name: 'MarketingActivity', component: () => import('@/views/marketing/activity.vue'), meta: { title: '活动管理' } }
    ]
  },
  // 消息管理（新增模块）
  {
    path: '/message',
    component: () => import('@/components/layout/index.vue'),
    redirect: '/message/list',
    meta: { title: '消息管理', icon: 'Bell' },
    children: [
      { path: 'list', name: 'MessageList', component: () => import('@/views/message/list.vue'), meta: { title: '消息列表' } },
      { path: 'push', name: 'MessagePush', component: () => import('@/views/message/push.vue'), meta: { title: '消息推送' } }
    ]
  },
  // 作品集管理
  {
    path: '/portfolio',
    component: () => import('@/components/layout/index.vue'),
    redirect: '/portfolio/list',
    meta: { title: '作品集管理', icon: 'Picture' },
    children: [
      { path: 'list', name: 'PortfolioList', component: () => import('@/views/portfolio/list.vue'), meta: { title: '作品列表' } },
      { path: 'category', name: 'PortfolioCategory', component: () => import('@/views/portfolio/category.vue'), meta: { title: '作品分类' } },
      { path: 'audit', name: 'PortfolioAudit', component: () => import('@/views/portfolio/audit.vue'), meta: { title: '作品审核' } }
    ]
  },
  // 系统管理
  {
    path: '/system',
    component: () => import('@/components/layout/index.vue'),
    redirect: '/system/admin',
    meta: { title: '系统管理', icon: 'Setting' },
    children: [
      { path: 'admin', name: 'SystemAdmin', component: () => import('@/views/system/admin.vue'), meta: { title: '管理员列表' } },
      { path: 'role', name: 'SystemRole', component: () => import('@/views/system/role.vue'), meta: { title: '角色管理' } },
      { path: 'permission', name: 'SystemPermission', component: () => import('@/views/system/permission.vue'), meta: { title: '权限管理' } },
      { path: 'config', name: 'SystemConfig', component: () => import('@/views/system/config.vue'), meta: { title: '系统配置' } },
      { path: 'banner', name: 'SystemBanner', component: () => import('@/views/system/banner.vue'), meta: { title: '轮播图管理' } },
      { path: 'log', name: 'SystemLog', component: () => import('@/views/system/log.vue'), meta: { title: '操作日志' } }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
