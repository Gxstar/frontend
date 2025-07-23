<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">相机管理</h1>
    <DataTable
      :batch-import-config="{
        buttonText: '批量导入相机',
        dialogTitle: '批量导入相机',
        importApi: (formData) => Service.batchImportCamerasCamerasBatchImportPost({ file: formData.get('file') as Blob })
      }"
      :template-download-config="{
        buttonText: '下载相机模板',
        filename: 'camera_import_template.xlsx'
      }"
      title="相机列表"
      :columns="columns"
      :fetchData="fetchCameras"
      @add="handleAdd"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <FormComponent
      v-model:visible="dialogVisible"
      :title="dialogTitle"
      :fields="formFields"
      :initial-data="currentCamera || undefined"
      @submit="handleFormSubmit"
    />

    <el-dialog
      v-model="confirmDialogVisible"
      title="确认删除"
      width="30%"
    >
      <p>确定要删除相机 <strong>{{ currentCamera?.model }}</strong> 吗？此操作不可撤销。</p>
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
import type { CameraRead } from '@/services/api/models/CameraRead';
import type { CameraCreate } from '@/services/api/models/CameraCreate';
import type { CameraUpdate } from '@/services/api/models/CameraUpdate';
import BatchImport from '@/components/admin/BatchImport.vue';
import DataTable from '@/components/admin/DataTable.vue';
import FormComponent from '@/components/admin/FormComponent.vue';

// 表格列配置
const columns = [
  { prop: 'id', label: 'ID', width: 80, align: 'center' as const },
  { prop: 'model', label: '相机型号', width: 180 },
  { prop: 'series', label: '相机系列', width: 150 },
  { prop: 'megapixels', label: '像素(百万)', width: 120, align: 'center' as const },
  { prop: 'sensor_size', label: '传感器尺寸', width: 140 },
  { 
    prop: 'interchangeable_lens', 
    label: '可换镜头', 
    width: 120, 
    align: 'center' as const,
    formatter: (row: CameraRead) => row.interchangeable_lens ? '是' : '否'
  },
  { prop: 'mount_type', label: '卡口类型', width: 120 },
  { 
    prop: 'is_active', 
    label: '状态', 
    width: 100, 
    align: 'center' as const,
    formatter: (row: CameraRead) => row.is_active ? '启用' : '禁用'
  }
];

// 表单字段配置
const formFields = [
  { prop: 'model', label: '相机型号', type: 'input' as const, required: true },
  { prop: 'series', label: '相机系列', type: 'input' as const, required: false },
  { prop: 'megapixels', label: '传感器像素(百万)', type: 'number' as const, required: true },
  { prop: 'sensor_size', label: '传感器尺寸', type: 'input' as const, required: true },
  { 
    prop: 'interchangeable_lens', 
    label: '可更换镜头', 
    type: 'switch' as const, 
    required: false
  },
  { prop: 'mount_type', label: '镜头卡口类型', type: 'input' as const, required: false },
  { prop: 'weight', label: '重量(克)', type: 'number' as const, required: false },
  { 
    prop: 'image_stabilization', 
    label: '支持防抖', 
    type: 'switch' as const, 
    required: false
  },
  { 
    prop: 'built_in_flash', 
    label: '内置闪光灯', 
    type: 'switch' as const, 
    required: false
  },
  { 
    prop: 'hot_shoe', 
    label: '热靴', 
    type: 'switch' as const, 
    required: false
  },
  { prop: 'is_active', label: '是否启用', type: 'switch' as const, required: false }
];

// 状态管理
const dialogVisible = ref(false);
const confirmDialogVisible = ref(false);
const dialogTitle = ref('添加相机');
const currentCamera = ref<CameraRead | null>(null);

// 数据获取
const fetchCameras = async (page: number, pageSize: number) => {
  try {
    const data = await Service.readCamerasCamerasGet((page - 1) * pageSize, pageSize);
    return {
      data: data,
      total: data.length
    };
  } catch (error) {
    console.error('Failed to fetch cameras:', error);
    return { data: [], total: 0 };
  }
};

// 事件处理
const handleAdd = () => {
  dialogTitle.value = '添加相机';
  currentCamera.value = null;
  dialogVisible.value = true;
};

const handleEdit = (camera: CameraRead) => {
  dialogTitle.value = '编辑相机';
  currentCamera.value = { ...camera };
  dialogVisible.value = true;
};

const handleDelete = (camera: CameraRead) => {
  currentCamera.value = camera;
  confirmDialogVisible.value = true;
};

const handleFormSubmit = async (data: CameraCreate | CameraUpdate) => {
  try {
    if (currentCamera.value) {
      // 更新相机
      await Service.updateCameraCamerasIdPut(currentCamera.value.id, data as CameraUpdate);
    } else {
      // 创建相机
      await Service.createCameraCamerasPost(data as CameraCreate);
    }
  } catch (error) {
    console.error('Failed to save camera:', error);
  }
};

const confirmDelete = async () => {
  if (currentCamera.value) {
    try {
      await Service.deleteCameraCamerasIdDelete(currentCamera.value.id);
      confirmDialogVisible.value = false;
    } catch (error) {
      console.error('Failed to delete camera:', error);
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