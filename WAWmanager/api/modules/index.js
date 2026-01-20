/**
 * API 接口模块统一导出
 * WAW Manager 商家端
 */

// 认证模块 - 登录、注册、Token管理、用户信息
export * from './auth'

// 管理后台模块 - 商家认证审核、管理员功能
export * from './admin'

// 店铺模块 - 店铺信息、装修配置、关联门店、推广
export * from './shop'

// 服务模块 - 服务CRUD、分类管理、上下架、推广
export * from './service'

// 订单模块 - 订单CRUD、状态管理、评价、统计
export * from './order'

// 顾客模块 - 顾客CRUD、档案管理、生日提醒、消费记录
export * from './customer'

// 员工/技师模块 - 员工CRUD、技师管理、审批、排班
export * from './staff'

// 财务模块 - 资产、余额、提现、银行卡
export * from './finance'

// 营销模块 - 优惠券、分销、会员
export * from './marketing'

// 代理模块 - 代理系统、佣金
export * from './agent'

// 通用模块 - 文件上传、配置获取、地区数据、搜索
export * from './common'

// 时间/排班模块 - 营业时间、预约管理、工作排班
export * from './schedule'

// 评价模块 - 服务评价、评价回复、评价统计
export * from './review'

// 消息模块 - 系统消息、订单通知、营销消息
export * from './message'

// 私信/聊天模块 - 会话管理、消息收发
export * from './chat'

// 数据统计模块 - 业绩统计、客流统计、收入统计
export * from './statistics'

// 访客记录模块 - 访客记录查询、访客统计
export * from './visitor'

// 作品集模块 - 作品发布、管理、统计
export * from './portfolio'

// 设置模块 - 账号安全、通知设置、隐私设置
export * from './settings'
