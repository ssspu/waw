<template>
  <div class="page-container">
    <div class="page-header">
      <h2>会员权益</h2>
      <el-button type="primary" @click="handleAdd">新增权益</el-button>
    </div>

    <el-card>
      <el-table :data="rightsList" stripe>
        <el-table-column prop="icon" label="图标" width="80">
          <template #default="{ row }">
            <el-icon :size="24"><component :is="row.icon" /></el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="权益名称" />
        <el-table-column prop="description" label="权益描述" />
        <el-table-column prop="levels" label="适用等级">
          <template #default="{ row }">
            <el-tag v-for="level in row.levels" :key="level" type="warning" size="small" style="margin-right: 4px;">
              VIP{{ level }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-switch v-model="row.status" :active-value="1" :inactive-value="0" @change="handleStatusChange(row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="权益名称">
          <el-input v-model="formData.name" placeholder="请输入权益名称" />
        </el-form-item>
        <el-form-item label="权益描述">
          <el-input v-model="formData.description" type="textarea" :rows="3" placeholder="请输入权益描述" />
        </el-form-item>
        <el-form-item label="适用等级">
          <el-checkbox-group v-model="formData.levels">
            <el-checkbox :value="1">VIP1</el-checkbox>
            <el-checkbox :value="2">VIP2</el-checkbox>
            <el-checkbox :value="3">VIP3</el-checkbox>
            <el-checkbox :value="4">VIP4</el-checkbox>
          </el-checkbox-group>
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
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const rightsList = ref([
  { id: 1, icon: 'Discount', name: '专属折扣', description: '享受会员专属折扣优惠', levels: [1, 2, 3, 4], status: 1 },
  { id: 2, icon: 'Present', name: '生日礼包', description: '生日当天赠送专属礼包', levels: [2, 3, 4], status: 1 },
  { id: 3, icon: 'Ticket', name: '专属优惠券', description: '每月赠送专属优惠券', levels: [3, 4], status: 1 },
  { id: 4, icon: 'Service', name: '优先预约', description: '享受优先预约服务', levels: [4], status: 1 },
  { id: 5, icon: 'Star', name: '积分加倍', description: '消费积分翻倍累积', levels: [2, 3, 4], status: 1 }
])

const dialogVisible = ref(false)
const dialogTitle = ref('新增权益')
const formData = ref({
  name: '',
  description: '',
  levels: [],
  status: 1
})

const handleAdd = () => {
  dialogTitle.value = '新增权益'
  formData.value = { name: '', description: '', levels: [], status: 1 }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑权益'
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定删除该权益吗？', '提示', { type: 'warning' })
    .then(() => {
      ElMessage.success('删除成功')
    })
}

const handleStatusChange = (row) => {
  ElMessage.success(row.status === 1 ? '已启用' : '已禁用')
}

const handleSubmit = () => {
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
