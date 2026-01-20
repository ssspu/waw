<template>
  <div class="page-container">
    <div class="page-header"><span class="page-title">操作日志</span></div>
    <div class="search-form">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="操作人"><el-input v-model="searchForm.operator" placeholder="请输入操作人" clearable /></el-form-item>
        <el-form-item label="操作类型">
          <el-select v-model="searchForm.type" placeholder="请选择" clearable>
            <el-option label="登录" value="login" />
            <el-option label="新增" value="create" />
            <el-option label="编辑" value="update" />
            <el-option label="删除" value="delete" />
          </el-select>
        </el-form-item>
        <el-form-item label="操作时间">
          <el-date-picker v-model="searchForm.dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </el-form-item>
        <el-form-item><el-button type="primary" @click="handleSearch">查询</el-button></el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="operator" label="操作人" width="120" />
        <el-table-column prop="type" label="操作类型" width="100" />
        <el-table-column prop="module" label="操作模块" width="120" />
        <el-table-column prop="content" label="操作内容" min-width="200" show-overflow-tooltip />
        <el-table-column prop="ip" label="IP地址" width="140" />
        <el-table-column prop="time" label="操作时间" width="160" />
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination v-model:current-page="pagination.page" v-model:page-size="pagination.pageSize" :total="pagination.total" layout="total, sizes, prev, pager, next" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const searchForm = reactive({ operator: '', type: '', dateRange: [] })
const pagination = reactive({ page: 1, pageSize: 10, total: 500 })

const tableData = ref([
  { id: 1, operator: 'admin', type: '登录', module: '系统', content: '管理员登录系统', ip: '192.168.1.100', time: '2024-01-13 10:30:25' },
  { id: 2, operator: 'admin', type: '编辑', module: '设计师管理', content: '编辑设计师信息: 张三', ip: '192.168.1.100', time: '2024-01-13 10:35:12' },
  { id: 3, operator: 'operator', type: '新增', module: '优惠券管理', content: '新增优惠券: 新人专享券', ip: '192.168.1.101', time: '2024-01-13 11:20:45' }
])

const handleSearch = () => {}
</script>
