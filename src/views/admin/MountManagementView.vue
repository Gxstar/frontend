<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">卡口管理</h1>

    <DataTable
  ref="dataTableRef"
  title="卡口列表"
      :columns="columns"
      :fetchData="fetchMounts"
      @add="handleAdd"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <FormComponent
      v-model:visible="dialogVisible"
      :title="dialogTitle"
      :fields="formFields"
      :initial-data="currentMount || undefined"
      @submit="handleFormSubmit"
    />

    <el-dialog
      v-model="confirmDialogVisible"
      title="确认删除"
      width="30%"
    >
      <p>确定要删除卡口 <strong>{{ currentMount?.name }}</strong> 吗？此操作不可撤销。</p>
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
import type { MountRead } from '@/services/api/models/MountRead';
import type { MountCreate } from '@/services/api/models/MountCreate';
import type { MountUpdate } from '@/services/api/models/MountUpdate';
import DataTable from '@/components/admin/DataTable.vue';
import FormComponent from '@/components/admin/FormComponent.vue';

interface DataTableExposed {
  loadData: () => Promise<void>;
}
const dataTableRef = ref<DataTableExposed | null>(null);

// 表格列配置
const columns = [
  { prop: 'id', label: 'ID', width: 80, align: 'center' as const },
  { prop: 'name', label: '卡口名称', width: 150 },
  { prop: 'short_name', label: '卡口简称', width: 120 },
  { prop: 'flange_focal_distance', label: '法兰焦距(mm)', width: 140, align: 'center' as const },
  { prop: 'introduced_year', label: '引入年份', width: 120, align: 'center' as const },
  { 
    prop: 'is_active', 
    label: '状态', 
    width: 100, 
    align: 'center' as const,
    formatter: (row: MountRead) => row.is_active ? '启用' : '禁用'
  }
];

// 表单字段配置
const formFields = [
  { prop: 'name', label: '卡口名称', type: 'input' as const, required: true },
  { prop: 'short_name', label: '卡口简称', type: 'input' as const, required: false },
  { prop: 'description', label: '卡口描述', type: 'textarea' as const, required: false, rows: 3 },
  { prop: 'flange_focal_distance', label: '法兰焦距(mm)', type: 'number' as const, required: false, step: 0.1 },
  { prop: 'introduced_year', label: '引入年份', type: 'number' as const, required: false },
  { prop: 'is_active', label: '是否启用', type: 'switch' as const, required: false }
];

// 状态管理
const dialogVisible = ref(false);
const confirmDialogVisible = ref(false);
const dialogTitle = ref('添加卡口');
const currentMount = ref<MountRead | null>(null);

// 数据获取
const fetchMounts = async (page: number, pageSize: number) => {
  try {
    const data = await Service.readMountsMountsGet((page - 1) * pageSize, pageSize);
    return {
      data: data,
      total: data.length
    };
  } catch (error) {
    console.error('Failed to fetch mounts:', error);
    return { data: [], total: 0 };
  }
};

// 事件处理
const handleAdd = () => {
  dialogTitle.value = '添加卡口';
  currentMount.value = null;
  dialogVisible.value = true;
};

const handleEdit = (mount: MountRead) => {
  dialogTitle.value = '编辑卡口';
  currentMount.value = { ...mount };
  dialogVisible.value = true;
};

const handleDelete = (mount: MountRead) => {
  currentMount.value = mount;
  confirmDialogVisible.value = true;
};

const handleFormSubmit = async (data: MountCreate | MountUpdate) => {
  try {
    if (currentMount.value) {
      // 更新卡口
      await Service.updateMountMountsIdPut(currentMount.value.id, data as MountUpdate);
    } else {
      // 创建卡口
      await Service.createMountMountsPost(data as MountCreate);
    }
  } catch (error) {
      console.error('Failed to save mount:', error);
    } finally {
      // 刷新数据
      dataTableRef.value?.loadData();
    }
};

const confirmDelete = async () => {
  if (currentMount.value) {
    try {
      await Service.deleteMountMountsIdDelete(currentMount.value.id);
      confirmDialogVisible.value = false;
      // 刷新数据
      dataTableRef.value?.loadData();
    } catch (error) {
      console.error('Failed to delete mount:', error);
    }
  }
};
</script>

<style scoped>
/* 页面样式 */
:deep(.el-dialog) {
  border-radius: 8px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
}
</style>