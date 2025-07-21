<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">品牌管理</h1>

    <DataTable
      title="品牌列表"
      :columns="columns"
      :fetchData="fetchBrands"
      @add="handleAdd"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <FormComponent
      v-model:visible="dialogVisible"
      :title="dialogTitle"
      :fields="formFields"
      :initial-data="currentBrand"
      @submit="handleFormSubmit"
    />

    <el-dialog
      v-model="confirmDialogVisible"
      title="确认删除"
      width="30%"
    >
      <p>确定要删除品牌 <strong>{{ currentBrand?.name }}</strong> 吗？此操作不可撤销。</p>
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
import type { BrandRead } from '@/services/api/models/BrandRead';
import type { BrandCreate } from '@/services/api/models/BrandCreate';
import type { BrandUpdate } from '@/services/api/models/BrandUpdate';
import DataTable from '@/components/admin/DataTable.vue';
import FormComponent from '@/components/admin/FormComponent.vue';

// 表格列配置
const columns: Array<{ prop: string; label: string; width?: number; align?: 'left' | 'center' | 'right'; formatter?: (row: BrandRead) => string }> = [
  { prop: 'id', label: 'ID', width: 80, align: 'center' },
  { prop: 'name', label: '品牌名称', width: 150 },
  { prop: 'english_name', label: '英文名称', width: 180 },
  { 
    prop: 'is_active', 
    label: '状态', 
    width: 100, 
    align: 'center',
    formatter: (row: BrandRead) => row.is_active ? '启用' : '禁用'
  },
  { prop: 'founded_year', label: '成立年份', width: 120, align: 'center' },
  { prop: 'headquarters', label: '总部位置', width: 180 },
  { prop: 'created_at', label: '创建时间', width: 180 }
];

// 表单字段配置
const formFields: Array<{ prop: string; label: string; type: 'input' | 'textarea' | 'number' | 'select' | 'switch' | 'date'; required?: boolean; placeholder?: string; options?: Array<{ label: string; value: string | number | boolean }>; rows?: number }> = [
  { prop: 'name', label: '品牌名称', type: 'input', required: true },
  { prop: 'english_name', label: '英文名称', type: 'input', required: false },
  { prop: 'logo_url', label: '品牌Logo URL', type: 'input', required: false },
  { prop: 'founded_year', label: '成立年份', type: 'number', required: false },
  { prop: 'headquarters', label: '总部位置', type: 'input', required: false },
  { prop: 'website', label: '官方网站', type: 'input', required: false },
  { prop: 'description', label: '品牌描述', type: 'textarea', required: false, rows: 4 },
  { prop: 'is_active', label: '是否启用', type: 'switch', required: false }
];

// 状态管理
const dialogVisible = ref(false);
const confirmDialogVisible = ref(false);
const dialogTitle = ref('添加品牌');
const currentBrand = ref<BrandRead | undefined>();

// 数据获取
const fetchBrands = async (page: number, pageSize: number) => {
  try {
    const data = await Service.readBrandsBrandsGet((page - 1) * pageSize, pageSize);
    return {
  data: data,
  total: data.length
};
  } catch (error) {
    console.error('Failed to fetch brands:', error);
    return { data: [], total: 0 };
  }
};

// 事件处理
const handleAdd = () => {
  dialogTitle.value = '添加品牌';
  currentBrand.value = undefined;
  dialogVisible.value = true;
};

const handleEdit = (brand: BrandRead) => {
  dialogTitle.value = '编辑品牌';
  currentBrand.value = { ...brand }
  dialogVisible.value = true;
};

const handleDelete = (brand: BrandRead) => {
  currentBrand.value = brand;
  confirmDialogVisible.value = true;
};

const handleFormSubmit = async (data: Record<string, any>) => {
  // 将表单数据转换为BrandCreate/BrandUpdate类型
  const brandData: BrandCreate | BrandUpdate = {
  website: data.website,
    name: data.name,
    english_name: data.english_name,
    logo_url: data.logo_url,
    description: data.description,
    founded_year: data.founded_year,
    headquarters: data.headquarters,
    is_active: data.is_active
  } as BrandCreate | BrandUpdate;
  try {
    if (currentBrand.value && currentBrand.value.id !== undefined) {
        // 更新品牌
        const brandId = currentBrand.value.id as number;
        await Service.updateBrandBrandsIdPut(brandId, brandData as BrandUpdate);
      } else if (!currentBrand.value) {
      // 创建品牌
      await Service.createBrandBrandsPost(brandData as BrandCreate);
    }
  } catch (error) {
    console.error('Failed to save brand:', error);
  }
};

const confirmDelete = async () => {
  if (currentBrand.value && currentBrand.value.id !== undefined) {
      try {
        const brandId = currentBrand.value.id as number;
        await Service.deleteBrandBrandsIdDelete(brandId);
        confirmDialogVisible.value = false;
      } catch (error) {
      console.error('Failed to delete brand:', error);
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