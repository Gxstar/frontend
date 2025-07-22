<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">镜头管理</h1>
    <DataTable
      :batch-import-config="{
        buttonText: '批量导入镜头',
        dialogTitle: '批量导入镜头',
        importApi: (formData) => Service.batchImportLensesLensesBatchImportPost({ file: formData.get('file') as Blob })
      }"
      title="镜头列表"
      :columns="columns"
      :fetchData="fetchLenses"
      @add="handleAdd"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <FormComponent v-model:visible="dialogVisible" :title="dialogTitle" :fields="formFields" :initial-data="currentLens || undefined"
      @submit="handleFormSubmit" />

    <el-dialog v-model="confirmDialogVisible" title="确认删除" width="30%">
      <p>确定要删除镜头 <strong>{{ currentLens?.model }}</strong> 吗？此操作不可撤销。</p>
      <template #footer>
        <el-button @click="confirmDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="confirmDelete">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref,computed } from 'vue';
import { Service } from '@/services/api/services/Service';
import type { LensRead } from '@/services/api/models/LensRead';
import type { LensCreate } from '@/services/api/models/LensCreate';
import type { LensUpdate } from '@/services/api/models/LensUpdate';

import DataTable from '@/components/admin/DataTable.vue';
import FormComponent from '@/components/admin/FormComponent.vue';

// 表格列配置
const columns = [
  { prop: 'id', label: 'ID', width: 80, align: 'center' as const },
  { prop: 'model', label: '镜头型号', width: 180 },
  { prop: 'mount_type', label: '卡口类型', width: 120 },
  {
    prop: 'is_prime',
    label: '镜头类型',
    width: 120,
    align: 'center' as const,
    formatter: (row: LensRead) => row.is_prime ? '定焦' : '变焦'
  },
  {
      prop: 'focal_length',
      label: '焦距(mm)',
      width: 150,
      align: 'center' as const,
      formatter: (row: LensRead) => row.is_prime ? String(row.min_focal_length) : `${row.min_focal_length}-${row.max_focal_length}`
    },
  { prop: 'sensor_size', label: '适用画幅', width: 120 },
  { prop: 'max_aperture', label: '最大光圈', width: 120, align: 'center' as const },
  {
    prop: 'is_active',
    label: '状态',
    width: 100,
    align: 'center' as const,
    formatter: (row: LensRead) => row.is_active ? '启用' : '禁用'
  }
];

// 处理定焦/变焦切换
const handlePrimeChange = (isPrime: boolean) => {
  formData.value.is_prime = isPrime;
  if (isPrime) {
    // 定焦镜头：最小焦距等于最大焦距
    formData.value.max_focal_length = formData.value.min_focal_length;
  }
};

// 表单字段配置
const formFields = computed(() => {
  // 基础字段
  const fields = [
    { prop: 'model', label: '镜头型号', type: 'input' as const, required: true },
    { prop: 'mount_type', label: '卡口类型', type: 'input' as const, required: true },
    { prop: 'series', label: '镜头系列', type: 'input' as const, required: false },
    { prop: 'sensor_size', label: '适用画幅', type: 'input' as const, required: true },
    {
      prop: 'is_prime',
      label: '是否定焦镜头',
      type: 'switch' as const,
      required: false,
      onChange: handlePrimeChange
    },
    { prop: 'min_focal_length', label: '最小焦距(mm)', type: 'number' as const, required: true }
  ];

  // 非定焦镜头显示最大焦距字段
  if (!formData.value.is_prime) {
    fields.push({
      prop: 'max_focal_length',
      label: '最大焦距(mm)',
      type: 'number' as const,
      required: false
    });
  }

  // 其他字段
  fields.push(
    { prop: 'magnification', label: '放大倍率', type: 'number' as const, required: false },
    { prop: 'min_focus_distance', label: '最近对焦距离(m)', type: 'number' as const, required: true },
    { prop: 'max_aperture', label: '最大光圈', type: 'input' as const, required: true },
    { prop: 'is_active', label: '是否启用', type: 'switch' as const, required: false, onChange: () => {} }
  );

  return fields;
});

// 状态管理
const dialogVisible = ref(false);
const confirmDialogVisible = ref(false);
const dialogTitle = ref('添加镜头');
const currentLens = ref<LensRead | null>(null);
const formData = ref<LensCreate | LensUpdate>({});

// 数据获取
const fetchLenses = async (page: number, pageSize: number) => {
  try {
    const data = await Service.readLensesLensesGet((page - 1) * pageSize, pageSize);
    return {
      data: data,
      total: data.length
    };
  } catch (error) {
    console.error('Failed to fetch lenses:', error);
    return { data: [], total: 0 };
  }
};

// 事件处理
const handleAdd = () => {
  dialogTitle.value = '添加镜头';
  currentLens.value = null;
  formData.value = {};
  dialogVisible.value = true;
};

const handleEdit = (lens: LensRead) => {
  dialogTitle.value = '编辑镜头';
  currentLens.value = { ...lens };
  formData.value = { ...lens };
  dialogVisible.value = true;
};

const handleDelete = (lens: LensRead) => {
  currentLens.value = lens;
  confirmDialogVisible.value = true;
};

const handleFormSubmit = async (data: LensCreate | LensUpdate) => {
  try {
    if (currentLens.value) {
      // 更新镜头
      await Service.updateLensLensesIdPut(currentLens.value.id, data as LensUpdate);
    } else {
      // 创建镜头
      await Service.createLensLensesPost(data as LensCreate);
    }
  } catch (error) {
    console.error('Failed to save lens:', error);
  }
};

const confirmDelete = async () => {
  if (currentLens.value) {
    try {
      await Service.deleteLensLensesIdDelete(currentLens.value.id);
      confirmDialogVisible.value = false;
    } catch (error) {
      console.error('Failed to delete lens:', error);
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