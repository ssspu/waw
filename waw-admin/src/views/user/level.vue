<template>
  <div class="page-container">
    <div class="page-header">
      <h2>会员等级</h2>
      <el-button type="primary" @click="handleAdd">新增等级</el-button>
    </div>

    <el-card>
      <el-table :data="levelList" stripe>
        <el-table-column prop="level" label="等级" width="80">
          <template #default="{ row }">
            <el-tag type="warning">VIP{{ row.level }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="等级名称" />
        <el-table-column prop="minPoints" label="所需积分" />
        <el-table-column prop="discount" label="折扣">
          <template #default="{ row }">{{ row.discount }}折</template>
        </el-table-column>
        <el-table-column prop="pointsMultiple" label="积分倍数">
          <template #default="{ row }">{{ row.pointsMultiple }}倍</template>
        </el-table-column>
        <el-table-column prop="userCount" label="会员数量" />
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
        <el-form-item label="等级">
          <el-input-number v-model="formData.level" :min="1" :max="10" />
        </el-form-item>
        <el-form-item label="等级名称">
          <el-input v-model="formData.name" placeholder="请输入等级名称" />
        </el-form-item>
        <el-form-item label="所需积分">
          <el-input-number v-model="formData.minPoints" :min="0" />
        </el-form-item>
        <el-form-item label="折扣">
          <el-input-number v-model="formData.discount" :min="1" :max="10" :precision="1" :step="0.1" />
        </el-form-item>
        <el-form-item label="积分倍数">
          <el-input-number v-model="formData.pointsMultiple" :min="1" :max="10" :precision="1" :step="0.1" />
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

const levelList = ref([
  { level: 1, name: '普通会员', minPoints: 0, discount: 9.8, pointsMultiple: 1, userCount: 1520 },
  { level: 2, name: '银卡会员', minPoints: 1000, discount: 9.5, pointsMultiple: 1.2, userCount: 680 },
  { level: 3, name: '金卡会员', minPoints: 5000, discount: 9, pointsMultiple: 1.5, userCount: 320 },
  { level: 4, name: '钻石会员', minPoints: 20000, discount: 8.5, pointsMultiple: 2, userCount: 85 }
])

const dialogVisible = ref(false)
const dialogTitle = ref('新增等级')
const formData = ref({
  level: 1,
  name: '',
  minPoints: 0,
  discount: 10,
  pointsMultiple: 1
})

const handleAdd = () => {
  dialogTitle.value = '新增等级'
  formData.value = { level: levelList.value.length + 1, name: '', minPoints: 0, discount: 10, pointsMultiple: 1 }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑等级'
  formData.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定删除该等级吗？', '提示', { type: 'warning' })
    .then(() => {
      ElMessage.success('删除成功')
    })
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
