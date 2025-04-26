<template>
  <div class="lens-management-container">
    <!-- 搜索区域 -->
    <div class="search-area">
      <el-input v-model="searchText" placeholder="请输入镜头型号" clearable style="width: 250px" />
      <el-button type="primary" @click="fetchLenses">
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
          <span class="card-title">镜头列表</span>
          <el-button class="button" type="primary" @click="addLens">
            <el-icon>
              <Plus />
            </el-icon>
            新增镜头
          </el-button>
        </div>
      </template>
      <el-table :data="lenses" style="width: 100%" @selection-change="handleSelectionChange" stripe border>
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="model" label="镜头型号" align="center" />
        <el-table-column prop="model_zh" label="中文名称" align="center" />
        <el-table-column prop="brand_id" label="品牌ID" align="center" />
        <el-table-column prop="mount_id" label="卡口ID" align="center" />
        <el-table-column prop="focal_length" label="焦距" align="center" />
        <el-table-column prop="aperture" label="光圈" align="center" />
        <el-table-column prop="lens_type" label="镜头类型" align="center" />
        <el-table-column prop="filter_size" label="滤镜尺寸(mm)" align="center" />
        <el-table-column prop="weight_grams" label="重量(克)" align="center" />
        <el-table-column prop="dimensions" label="尺寸" align="center" />
        <el-table-column prop="created_at" label="创建时间" align="center" width="150" :formatter="formatDate" />
        <el-table-column prop="updated_at" label="更新时间" align="center" width="150" :formatter="formatDate" />
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="primary" link size="small" @click="editLens(scope.row)">
              <el-icon>
                <Edit />
              </el-icon>
              编辑
            </el-button>
            <el-button type="danger" link size="small" @click="deleteLens(scope.row.id)">
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
    <el-dialog v-model="dialogVisible" :title="formType === 'add' ? '新增镜头' : '编辑镜头'" width="30%">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="镜头型号" prop="model">
          <el-input v-model="formData.model" placeholder="请输入镜头型号" />
        </el-form-item>
        <el-form-item label="中文名称" prop="model_zh">
          <el-input v-model="formData.model_zh" placeholder="请输入中文名称" />
        </el-form-item>
        <el-form-item label="品牌" prop="brand_id">
          <el-select v-model="formData.brand_id" placeholder="请选择品牌" clearable filterable>
            <el-option v-for="brand in brandOptions" :key="brand.id" :label="brand.name_zh" :value="brand.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="卡口ID" prop="mount_id">
          <el-input v-model="formData.mount_id" placeholder="请输入卡口ID" type="number" />
        </el-form-item>
        <el-form-item label="焦距" prop="focal_length">
          <el-input v-model="formData.focal_length" placeholder="请输入焦距" />
        </el-form-item>
        <el-form-item label="光圈" prop="aperture">
          <el-input v-model="formData.aperture" placeholder="请输入光圈" />
        </el-form-item>
        <el-form-item label="镜头类型" prop="lens_type">
          <el-input v-model="formData.lens_type" placeholder="请输入镜头类型" />
        </el-form-item>
        <el-form-item label="滤镜尺寸(mm)" prop="filter_size">
          <el-input v-model="formData.filter_size" placeholder="请输入滤镜尺寸" type="number" />
        </el-form-item>
        <el-form-item label="重量(克)" prop="weight_grams">
          <el-input v-model="formData.weight_grams" placeholder="请输入重量" type="number" />
        </el-form-item>
        <el-form-item label="尺寸" prop="dimensions">
          <el-input v-model="formData.dimensions" placeholder="请输入尺寸" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="formData.description" type="textarea" placeholder="请输入镜头描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveLens">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Plus, Edit, Delete } from '@element-plus/icons-vue'
import axiosInstance from '@/utils/http'
import config from '@/config'

const lenses = ref([])
const searchText = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const dialogVisible = ref(false)
const formType = ref('add')
const formData = ref({
  id: null,
  model: '',
  model_zh: '',
  brand_id: null,
  mount_id: null,
  release_year: null,
  focal_length: '',
  aperture: '',
  lens_type: '',
  filter_size: null,
  weight_grams: null,
  dimensions: '',
  description: '',
  created_at: '',
  updated_at: ''
})

const multipleSelection = ref([])
const brandOptions = ref([])

const fetchBrands = async () => {
  try {
    const response = await axiosInstance.get(config.brand.list)
    brandOptions.value = response.data
  } catch (error) {
    ElMessage.error('获取品牌列表失败')
  }
}

const fetchLenses = async () => {
  try {
    const response = await axiosInstance.get(config.lens.list, {
      params: {
        search: searchText.value,
        skip: (currentPage.value - 1) * pageSize.value,
        limit: pageSize.value
      }
    })
    lenses.value = response.data
    total.value = response.headers['x-total-count'] || response.data.length
  } catch (error) {
    ElMessage.error('获取镜头列表失败')
  }
}

const resetSearch = () => {
  searchText.value = ''
  currentPage.value = 1
  fetchLenses()
  fetchBrands()
}

const handleSizeChange = (newSize) => {
  pageSize.value = newSize
  currentPage.value = 1
  fetchLenses()
  fetchBrands()
}

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
  fetchLenses()
  fetchBrands()
}

const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const addLens = () => {
  formType.value = 'add'
  formData.value = {
    id: null,
    model: '',
    model_zh: '',
    brand_id: null,
    mount_id: null,
    release_year: null,
    focal_length: '',
    aperture: '',
    lens_type: '',
    filter_size: null,
    weight_grams: null,
    dimensions: '',
    description: '',
    created_at: '',
    updated_at: ''
  }
  dialogVisible.value = true
}

const editLens = (row) => {
  formType.value = 'edit'
  formData.value = { ...row }
  dialogVisible.value = true
}

const saveLens = async () => {
  try {
    if (formType.value === 'add') {
      await axiosInstance.post(config.lens.create, formData.value)
      ElMessage.success('新增镜头成功')
    } else {
      await axiosInstance.put(config.lens.update(formData.value.id), formData.value)
      ElMessage.success('更新镜头成功')
    }
    dialogVisible.value = false
    fetchLenses()
    fetchBrands()
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

const deleteLens = async (id) => {
  ElMessageBox.confirm('确定要删除该镜头吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      try {
        await axiosInstance.delete(config.lens.delete(id))
        ElMessage.success('删除成功')
        fetchLenses()
        fetchBrands()
      } catch (error) {
        ElMessage.error('删除失败')
      }
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}

const formatDate = (row, column, cellValue) => {
  if (!cellValue) return ''
  const date = new Date(cellValue)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

fetchLenses()
fetchBrands()
</script>

<style scoped>
.lens-management-container {
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