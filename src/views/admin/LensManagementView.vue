<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">镜头管理</h1>

    <DataTable
      title="镜头列表"
      :columns="columns"
      :fetchData="fetchLenses"
      @add="handleAdd"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <FormComponent
      v-model:visible="dialogVisible"
      :title="dialogTitle"
      :fields="formFields"
      :initial-data="currentLens"
      @submit="handleFormSubmit"
    />

    <el-dialog
      v-model="confirmDialogVisible"
      title="确认删除"
      width="30%"
    >
      <p>确定要删除镜头 <strong>{{ currentLens?.model }}</strong> 吗？此操作不可撤销。</p>
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
import type { LensRead, LensCreate, LensUpdate } from '@/services/api/models';
import DataTable from '@/components/admin/DataTable.vue';
import FormComponent from '@/components/admin/FormComponent.vue';

// 表格列配置
const columns = [
  { prop: 'id', label: 'ID', width: 80, align: 'center' },
  { prop: 'model', label: '镜头型号', width: 180 },
  { prop: 'mount_type', label: '卡口类型', width: 120 },
  { 
    prop: 'is_prime', 
    label: '镜头类型', 
    width: 120, 
    align: 'center',
    formatter: (row: LensRead) => row.is_prime ? '定焦' : '变焦'
  },
  { 
    prop: 'focal_length', 
    label: '焦距(mm)', 
    width: 150, 
    align: 'center',
    formatter: (row: LensRead) => row.is_prime ? row.min_focal_length : `${row.min_focal_length}-${row.max_focal_length}`
  },
  { prop: 'sensor_size', label: '适用画幅', width: 120 },
  { prop: 'max_aperture', label: '最大光圈', width: 120, align: 'center' },
  { 
    prop: 'is_active', 
    label: '状态', 
    width: 100, 
    align: 'center',
    formatter: (row: LensRead) => row.is_active ? '启用' : '禁用'
  }
];

// 表单字段配置
const formFields = [
  { prop: 'model', label: '镜头型号', type: 'input', required: true },
  { prop: 'mount_type', label: '卡口类型', type: 'input', required: true },
  { prop: 'series', label: '镜头系列', type: 'input', required: false },
  { prop: 'sensor_size', label: '适用画幅', type: 'input', required: true },
  { 
    prop: 'is_prime', 
    label: '是否定焦镜头', 
    type: 'switch', 
    required: false,
    @change="handlePrimeChange"
  },
  { prop: 'min_focal_length', label: '最小焦距(mm)', type: 'number', required: true },
  { prop: 'max_focal_length', label: '最大焦距(mm)', type: 'number', required: false, v-if="!formData.is_prime" },
  { prop: 'magnification', label: '放大倍率', type: 'number', required: false, step: 0.1 },
  { prop: 'min_focus_distance', label: '最近对焦距离(m)', type: 'number', required: true, step: 0.01 },
  { prop: 'max_aperture', label: '最大光圈', type: 'input', required: true },
  { prop: 'is_active', label: '是否启用', type: 'switch', required: false }
];

// 状态管理
const dialogVisible = ref(false);
const confirmDialogVisible = ref(false);
const dialogTitle = ref('添加镜头');
const currentLens = ref<LensRead | null>(null);
const formData = ref<LensCreate | LensUpdate>({});

// 处理定焦/变焦切换
const handlePrimeChange = (isPrime: boolean) => {
  formData.value.is_prime = isPrime;
  if (isPrime) {
    // 定焦镜头：最小焦距等于最大焦距
    formData.value.max_focal_length = formData.value.min_focal_length;
  }
};

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
      await Service.updateLensLensesLensIdPut(currentLens.value.id, data as LensUpdate);
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
      await Service.deleteLensLensesLensIdDelete(currentLens.value.id);
      confirmDialogVisible.value = false;
    } catch (error) {
      console.error('Failed to delete lens:', error);
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