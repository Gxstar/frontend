<template>
  <div class="user-management-container">
    <!-- 搜索区域 -->
    <div class="search-area">
      <el-input v-model="searchText" placeholder="请输入用户名或邮箱" clearable style="width: 250px" />
      <el-button type="primary" @click="fetchUsers">
        <el-icon>
          <Search />
        </el-icon>
        搜索
      </el-button>
      <el-button @click="resetSearch">
        <el-icon>
          <Refresh />
        </el-icon>
        重置
      </el-button>
    </div>
    <!-- 表格区域 -->
    <el-card class="table-card">
      <template #header>
        <div class="card-header">
          <span class="card-title">用户列表</span>
          <el-button class="button" type="primary" @click="addUser">
            <el-icon>
              <Plus />
            </el-icon>
            新增用户
          </el-button>
        </div>
      </template>
      <el-table :data="users" style="width: 100%" @selection-change="handleSelectionChange" stripe border>
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="username" label="用户名" align="center" />
        <el-table-column prop="email" label="邮箱" align="center" />
        <el-table-column prop="role" label="角色" align="center" />
        <el-table-column prop="full_name" label="姓名" align="center" />
        <el-table-column prop="last_login" label="最后登录" align="center" width="150" :formatter="formatDate" />
        <el-table-column prop="created_at" label="创建时间" align="center" width="150" :formatter="formatDate" />
        <el-table-column prop="updated_at" label="更新时间" align="center" width="150" :formatter="formatDate" />
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="primary" link size="small" @click="editUser(scope.row)">
              <el-icon>
                <Edit />
              </el-icon>
              编辑
            </el-button>
            <el-button type="danger" link size="small" @click="deleteUser(scope.row.id)">
              <el-icon>
                <Delete />
              </el-icon>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <div class="pagination-area">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
          :total="total" layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
          @update:page-size="handleSizeChange" />
      </div>
    </el-card>
    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="formType === 'add' ? '新增用户' : '编辑用户'" width="30%">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="密码" prop="password_hash">
          <el-input v-model="formData.password_hash" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="formData.role" placeholder="请选择角色" clearable>
            <el-option label="用户" value="user" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="full_name">
          <el-input v-model="formData.full_name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="头像URL" prop="avatar_url">
          <el-input v-model="formData.avatar_url" placeholder="请输入头像URL" />
        </el-form-item>
        <el-form-item label="简介" prop="bio">
          <el-input v-model="formData.bio" type="textarea" placeholder="请输入简介" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveUser">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Plus, Edit, Delete } from '@element-plus/icons-vue'

const users = ref([])
const searchText = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const dialogVisible = ref(false)
const formType = ref('add')
const formData = ref({
  id: null,
  username: '',
  email: '',
  password_hash: '',
  role: 'user',
  full_name: '',
  avatar_url: '',
  bio: '',
  last_login: '',
  created_at: '',
  updated_at: ''
})

const multipleSelection = ref([])

const { proxy } = getCurrentInstance();

const fetchUsers = async () => {
  try {
    const response = await proxy.$api.users.listUsers(
      (currentPage.value - 1) * pageSize.value,
      pageSize.value,
      searchText.value
    );
    users.value = response.data;
    total.value = response.headers['x-total-count'] || response.data.length;
  } catch (error) {
    ElMessage.error('获取用户列表失败')
  }
}

const resetSearch = () => {
  searchText.value = ''
  currentPage.value = 1
  fetchUsers()
}

const handleSizeChange = (newSize) => {
  pageSize.value = newSize
  currentPage.value = 1
  fetchUsers()
}

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
  fetchUsers()
}

const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const addUser = () => {
  formType.value = 'add'
  formData.value = {
    id: null,
    username: '',
    email: '',
    password_hash: '',
    role: 'user',
    full_name: '',
    avatar_url: '',
    bio: '',
    last_login: '',
    created_at: '',
    updated_at: ''
  }
  dialogVisible.value = true
}

const editUser = (row) => {
  formType.value = 'edit'
  formData.value = { ...row }
  dialogVisible.value = true
}

    const saveUser = async () => {
      try {
        if (formType.value === 'add') {
          await proxy.$api.users.createUser({
            requestBody: formData.value
          })
          ElMessage.success('新增用户成功')
        } else {
          await proxy.$api.users.updateUser(formData.value.id, {
            requestBody: formData.value
          })
          ElMessage.success('编辑用户成功')
        }
        dialogVisible.value = false
        fetchUsers()
      } catch (error) {
        console.error('Error saving user:', error)
        ElMessage.error('保存失败')
      }
    }

const deleteUser = async (id) => {
  try {
    await ElMessageBox.confirm('此操作将永久删除该用户, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await proxy.$api.users.deleteUser(id)
    ElMessage.success('删除成功')
    fetchUsers()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

const formatDate = (row, column, cellValue) => {
  if (!cellValue) return ''
  const date = new Date(cellValue)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

fetchUsers()
</script>

<style scoped>
.user-management-container {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', Arial, sans-serif;
}

.search-area {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.table-card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 18px;
  font-weight: 500;
  color: #303133;
}

.pagination-area {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.el-button {
  border-radius: 4px;
  font-size: 14px;
}

.el-table {
  font-size: 14px;
  color: #606266;
}

.el-table th {
  background-color: #eef1f6;
  color: #909399;
  font-size: 14px;
}

.el-table td {
  font-size: 14px;
}

.el-table tr:hover {
  background-color: #f0f2f5;
}

.el-pagination {
  color: #606266;
  font-size: 14px;
}
</style>