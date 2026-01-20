<template>
  <div class="page-container">
    <div class="page-header">
      <h2>权限管理</h2>
      <el-button type="primary" @click="handleAdd">新增权限</el-button>
    </div>

    <el-card>
      <el-table :data="permissionList" row-key="id" :tree-props="{ children: 'children' }" stripe>
        <el-table-column prop="name" label="权限名称" width="200" />
        <el-table-column prop="code" label="权限标识" width="200" />
        <el-table-column prop="type" label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.type === 'menu' ? '' : 'success'">
              {{ row.type === 'menu' ? '菜单' : '按钮' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="路由路径" />
        <el-table-column prop="icon" label="图标" width="80">
          <template #default="{ row }">
            <el-icon v-if="row.icon"><component :is="row.icon" /></el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-switch v-model="row.status" :active-value="1" :inactive-value="0" @change="handleStatusChange(row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="success" link @click="handleAddChild(row)" v-if="row.type === 'menu'">添加子权限</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="上级权限">
          <el-tree-select
            v-model="formData.parentId"
            :data="permissionTree"
            :props="{ label: 'name', value: 'id' }"
            placeholder="请选择上级权限（可选）"
            clearable
            check-strictly
          />
        </el-form-item>
        <el-form-item label="权限类型">
          <el-radio-group v-model="formData.type">
            <el-radio value="menu">菜单</el-radio>
            <el-radio value="button">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限名称">
          <el-input v-model="formData.name" placeholder="请输入权限名称" />
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="formData.code" placeholder="请输入权限标识" />
        </el-form-item>
        <el-form-item label="路由路径" v-if="formData.type === 'menu'">
          <el-input v-model="formData.path" placeholder="请输入路由路径" />
        </el-form-item>
        <el-form-item label="图标" v-if="formData.type === 'menu'">
          <el-input v-model="formData.icon" placeholder="请输入图标名称" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="formData.sort" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="formData.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const permissionList = ref([
  {
    id: 1, name: '控制台', code: 'dashboard', type: 'menu', path: '/dashboard', icon: 'Odometer', sort: 1, status: 1,
    children: []
  },
  {
    id: 2, name: '用户端管理', code: 'client', type: 'menu', path: '/client', icon: 'Monitor', sort: 2, status: 1,
    children: [
      { id: 21, name: '设计师列表', code: 'client:designer:list', type: 'menu', path: '/client/designer/list', icon: '', sort: 1, status: 1 },
      { id: 22, name: '设计师审核', code: 'client:designer:audit', type: 'menu', path: '/client/designer/audit', icon: '', sort: 2, status: 1 },
      { id: 23, name: '新增设计师', code: 'client:designer:add', type: 'button', path: '', icon: '', sort: 3, status: 1 },
      { id: 24, name: '删除设计师', code: 'client:designer:delete', type: 'button', path: '', icon: '', sort: 4, status: 1 }
    ]
  },
  {
    id: 3, name: '用户管理', code: 'user', type: 'menu', path: '/user', icon: 'UserFilled', sort: 3, status: 1,
    children: [
      { id: 31, name: '用户列表', code: 'user:list', type: 'menu', path: '/user/list', icon: '', sort: 1, status: 1 },
      { id: 32, name: '会员管理', code: 'user:vip', type: 'menu', path: '/user/vip', icon: '', sort: 2, status: 1 }
    ]
  },
  {
    id: 4, name: '订单管理', code: 'order', type: 'menu', path: '/order', icon: 'Document', sort: 4, status: 1,
    children: [
      { id: 41, name: '订单列表', code: 'order:list', type: 'menu', path: '/order/list', icon: '', sort: 1, status: 1 },
      { id: 42, name: '退款管理', code: 'order:refund', type: 'menu', path: '/order/refund', icon: '', sort: 2, status: 1 }
    ]
  },
  {
    id: 5, name: '系统管理', code: 'system', type: 'menu', path: '/system', icon: 'Setting', sort: 10, status: 1,
    children: [
      { id: 51, name: '管理员列表', code: 'system:admin', type: 'menu', path: '/system/admin', icon: '', sort: 1, status: 1 },
      { id: 52, name: '角色管理', code: 'system:role', type: 'menu', path: '/system/role', icon: '', sort: 2, status: 1 },
      { id: 53, name: '权限管理', code: 'system:permission', type: 'menu', path: '/system/permission', icon: '', sort: 3, status: 1 }
    ]
  }
])

const permissionTree = computed(() => {
  return [{ id: 0, name: '顶级权限', children: permissionList.value }]
})

const dialogVisible = ref(false)
const dialogTitle = ref('新增权限')
const formData = ref({
  parentId: null,
  type: 'menu',
  name: '',
  code: '',
  path: '',
  icon: '',
  sort: 0,
  status: 1
})

const handleAdd = () => {
  dialogTitle.value = '新增权限'
  formData.value = { parentId: null, type: 'menu', name: '', code: '', path: '', icon: '', sort: 0, status: 1 }
  dialogVisible.value = true
}

const handleAddChild = (row) => {
  dialogTitle.value = '添加子权限'
  formData.value = { parentId: row.id, type: 'menu', name: '', code: '', path: '', icon: '', sort: 0, status: 1 }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑权限'
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定删除该权限吗？删除后不可恢复。', '提示', { type: 'warning' })
    .then(() => {
      ElMessage.success('删除成功')
    })
}

const handleStatusChange = (row) => {
  ElMessage.success(row.status === 1 ? '已启用' : '已禁用')
}

const handleSubmit = () => {
  if (!formData.value.name || !formData.value.code) {
    ElMessage.warning('请填写权限名称和权限标识')
    return
  }
  ElMessage.success('保存成功')
  dialogVisible.value = false
}
</script>

<style scoped lang="scss">
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
