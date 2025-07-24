<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-gray-800">{{ title }}</h2>
      <div class="flex gap-2">
        <BatchImport
          v-if="batchImportConfig"
          :button-text="batchImportConfig.buttonText"
          :dialog-title="batchImportConfig.dialogTitle"
          :import-api="batchImportConfig.importApi"
          @success="handleBatchImportSuccess"
        />
        <el-button type="primary" @click="handleAdd">
          <el-icon class="mr-2"><Plus /></el-icon> 添加
        </el-button>
        <el-button v-if="templateDownloadConfig" type="primary" plain @click="downloadTemplate">
          <el-icon class="mr-2"><Download /></el-icon> {{ templateDownloadConfig.buttonText || '下载模板' }}
        </el-button>
      </div>
    </div>

    <el-table v-loading="loading" :data="tableData" border stripe class="w-full">
      <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label"
        :width="column.width" :align="column.align || 'left'">
        <template #default="scope">
          <template v-if="column.formatter">
            {{ column.formatter(scope.row) }}
          </template>
          <template v-else>
            {{ scope.row[column.prop] }}
          </template>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button link @click="handleEdit(scope.row)">编辑</el-button>
          <el-button link danger @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="mt-4 flex justify-between items-center">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50]"
        :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Plus,Download } from '@element-plus/icons-vue';
import BatchImport from './BatchImport.vue';
import { Service } from '@/services/api/services/Service';

const props = defineProps<{
  title: string;
  columns: Array<{
    prop: string;
    label: string;
    width?: number;
    align?: 'left' | 'center' | 'right';
    formatter?: (row: any) => string;
  }>;
  fetchData: (page: number, pageSize: number) => Promise<{
    data: any[];
    total: number;
  }>;
  batchImportConfig?: {
    buttonText: string;
    dialogTitle: string;
    importApi: (formData: FormData) => Promise<any>;
  };
  templateDownloadConfig?: {
    buttonText?: string;
    filename: string;
  };
}>()

const emits = defineEmits<{
  (e: 'add'): void;
  
  (e: 'edit', row: any): void;
  (e: 'delete', row: any): void;
}>();

const tableData = ref<any[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const loading = ref(false);

const loadData = async () => {
  loading.value = true;
  try {
    const result = await props.fetchData(currentPage.value, pageSize.value);
    tableData.value = result.data;
    total.value = result.total;
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    loading.value = false;
  }
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  currentPage.value = 1;
  loadData();
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  loadData();
};

const handleAdd = () => {
  emits('add');
};

const handleEdit = (row: any) => {
  emits('edit', row);
};

const handleDelete = (row: any) => {
  emits('delete', row);
};

const handleBatchImportSuccess = () => {
  loadData();
};

onMounted(() => {
  loadData();
});

defineExpose({
  loadData
});

const downloadTemplate = async () => {
  if (!props.templateDownloadConfig) return;
  try {
    const response = await Service.downloadTemplateTemplatesDownloadFilenameGet(props.templateDownloadConfig.filename);
    const url = window.URL.createObjectURL(new Blob([response]));
    const a = document.createElement('a');
    a.href = url;
    a.download = props.templateDownloadConfig.filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading template:', error);
  }
};
</script>

<style scoped>
/* 表格样式优化 */
:deep(.el-table) {
  border-radius: 6px;
  overflow: hidden;
}

:deep(.el-table__header th) {
  background-color: #f5f7fa;
  font-weight: 500;
}

/* 分页样式 */
:deep(.el-pagination) {
  padding: 10px 0;
}
</style>