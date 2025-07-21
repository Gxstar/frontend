<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">用户管理</h1>

    <DataTable
      title="用户列表"
      :columns="columns"
      :fetchData="fetchUsers"
      @add="handleAdd"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <FormComponent
      v-model:visible="dialogVisible"
      :title="dialogTitle"
      :fields="formFields"
      :initial-data="currentUser"
      @submit="handleFormSubmit"
    />

    <el-dialog
      v-model="confirmDialogVisible"
      title="确认删除"
      width="30%"
    >
      <p>确定要删除用户 <strong>{{ currentUser?.username }}</strong> 吗？此操作不可撤销。</p>
      <template #footer>
        <el-button @click="confirmDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="confirmDelete">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Service } from '@/services/api/services/Service';
import type { UserRead, UserCreate, UserUpdate } from '@/services/api/models';
import DataTable from '@/components/admin/DataTable.vue';
import FormComponent from '@/components/admin/FormComponent.vue';

// 表格列配置
const columns = [
  { prop: 'id', label: 'ID', width: 80, align: 'center' },
  { prop: 'username', label: '用户名', width: 150 },
  { prop: 'email', label: '电子邮箱', width: 200 },
  { 
    prop: 'is_active', 
    label: '状态', 
    width: 100, 
    align: 'center',
    formatter: (row: UserRead) => row.is_active ? '启用' : '禁用'
  },
  { 
    prop: 'is_superuser', 
    label: '管理员', 
    width: 100, 
    align: 'center',
    formatter: (row: UserRead) => row.is_superuser ? '是' : '否'
  },
  { prop: 'created_at', label: '创建时间', width: 180 }
];

// 表单字段配置
const formFields = [
  { prop: 'username', label: '用户名', type: 'input', required: true },
  { prop: 'email', label: '电子邮箱', type: 'input', required: true },
  { prop: 'password', label: '密码', type: 'input', required: false, placeholder: '不修改请留空' },
  { prop: 'is_active', label: '是否启用', type: 'switch', required: false },
  { prop: 'is_superuser', label: '是否管理员', type: 'switch', required: false }
];

// 状态管理
const dialogVisible = ref(false);
const confirmDialogVisible = ref(false);
const dialogTitle = ref('添加用户');
const currentUser = ref<UserRead | null>(null);

// 数据获取
const fetchUsers = async (page: number, pageSize: number) => {
  try {
    const data = await Service.readUsersUsersGet((page - 1) * pageSize, pageSize);
    return {
      data: data,
      total: data.length
    };
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return { data: [], total: 0 };
  }
};

// 事件处理
const handleAdd = () => {
  dialogTitle.value = '添加用户';
  currentUser.value = null;
  dialogVisible.value = true;
};

const handleEdit = (user: UserRead) => {
  dialogTitle.value = '编辑用户';
  currentUser.value = { ...user };
  dialogVisible.value = true;
};

const handleDelete = (user: UserRead) => {
  currentUser.value = user;
  confirmDialogVisible.value = true;
};

const handleFormSubmit = async (data: UserCreate | UserUpdate) => {
  try {
    if (currentUser.value) {
      // 更新用户
      await Service.updateUserUsersUserIdPut(currentUser.value.id, data as UserUpdate);
    } else {
      // 创建用户
      await Service.createUserUsersPost(data as UserCreate);
    }
    // 可以在这里添加成功提示
  } catch (error) {
    console.error('Failed to save user:', error);
    // 可以在这里添加错误提示
  }
};

const confirmDelete = async () => {
  if (currentUser.value) {
    try {
      await Service.deleteUserUsersUserIdDelete(currentUser.value.id);
      confirmDialogVisible.value = false;
      // 可以在这里添加成功提示
    } catch (error) {
      console.error('Failed to delete user:', error);
      // 可以在这里添加错误提示
    }
  }
};
</script>

<style scoped>
/* 页面样式 */
::v-deep .el-dialog {
  border-radius: 8px;
}

::v-deep .el-form-item__label {
  font-weight: 500;
}
</style>