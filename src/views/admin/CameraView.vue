<template>
  <div class="camera-management-container">
    <!-- 搜索区域 -->
    <div class="search-area">
      <el-input v-model="searchText" placeholder="请输入相机型号" clearable style="width: 250px" />
      <el-button type="primary" @click="fetchCameras">
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
          <span class="card-title">相机列表</span>
          <el-button class="button" type="primary" @click="addCamera">
            <el-icon>
              <Plus />
            </el-icon>
            新增相机
          </el-button>
        </div>
      </template>
      <el-table :data="cameras" style="width: 100%" @selection-change="handleSelectionChange" stripe border>
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="model" label="相机型号" align="center" />
        <el-table-column prop="model_zh" label="中文名称" align="center" />
        <el-table-column prop="brand_id" label="品牌ID" align="center" />
        <el-table-column prop="mount_id" label="卡口ID" align="center" />
        <el-table-column prop="type" label="类型" align="center" />
        <el-table-column prop="release_year" label="发布年份" align="center" />
        <el-table-column prop="sensor_size" label="传感器尺寸" align="center" />
        <el-table-column prop="megapixels" label="像素" align="center" />
        <el-table-column prop="iso_range" label="ISO范围" align="center" />
        <el-table-column prop="shutter_speed" label="快门速度" align="center" />
        <el-table-column prop="weight_grams" label="重量（克）" align="center" />
        <el-table-column prop="dimensions" label="尺寸" align="center" />
        <el-table-column prop="created_at" label="创建时间" align="center" width="150" :formatter="formatDate" />
        <el-table-column prop="updated_at" label="更新时间" align="center" width="150" :formatter="formatDate" />
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="primary" link size="small" @click="editCamera(scope.row)">
              <el-icon>
                <Edit />
              </el-icon>
              编辑
            </el-button>
            <el-button type="danger" link size="small" @click="deleteCamera(scope.row.id)">
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
    <el-dialog v-model="dialogVisible" :title="formType === 'add' ? '新增相机' : '编辑相机'" width="30%">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="相机型号" prop="model">
          <el-input v-model="formData.model" placeholder="请输入相机型号" />
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
        <el-form-item label="类型" prop="type">
          <el-input v-model="formData.type" placeholder="请输入类型" />
        </el-form-item>
        <el-form-item label="发布年份" prop="release_year">
          <el-date-picker v-model="formData.release_year" type="year" placeholder="选择年份" value-format="YYYY"
            :disabled-date="(date) => date.getFullYear() > new Date().getFullYear()" />
        </el-form-item>
        <el-form-item label="传感器尺寸" prop="sensor_size">
          <el-input v-model="formData.sensor_size" placeholder="请输入传感器尺寸" />
        </el-form-item>
        <el-form-item label="像素" prop="megapixels">
          <el-input v-model="formData.megapixels" placeholder="请输入像素" type="number" step="0.1" />
        </el-form-item>
        <el-form-item label="ISO范围" prop="iso_range">
          <el-input v-model="formData.iso_range" placeholder="请输入ISO范围" />
        </el-form-item>
        <el-form-item label="快门速度" prop="shutter_speed">
          <el-input v-model="formData.shutter_speed" placeholder="请输入快门速度" />
        </el-form-item>
        <el-form-item label="重量（克）" prop="weight_grams">
          <el-input v-model="formData.weight_grams" placeholder="请输入重量（克）" type="number" />
        </el-form-item>
        <el-form-item label="尺寸" prop="dimensions">
          <el-input v-model="formData.dimensions" placeholder="请输入尺寸" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="formData.description" type="textarea" placeholder="请输入相机描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveCamera">确定</el-button>
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

const cameras = ref([])
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
  type: '',
  sensor_size: '',
  megapixels: null,
  iso_range: '',
  shutter_speed: '',
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

const fetchCameras = async () => {
  try {
    const response = await axiosInstance.get(config.camera.list, {
      params: {
        search: searchText.value,
        skip: (currentPage.value - 1) * pageSize.value,
        limit: pageSize.value
      }
    })
    cameras.value = response.data
    total.value = response.headers['x-total-count'] || response.data.length
  } catch (error) {
    ElMessage.error('获取相机列表失败')
  }
}

const resetSearch = () => {
  searchText.value = ''
  currentPage.value = 1
  fetchCameras()
  fetchBrands()
}

const handleSizeChange = (newSize) => {
  pageSize.value = newSize
  currentPage.value = 1
  fetchCameras()
  fetchBrands()
}

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
  fetchCameras()
  fetchBrands()
}

const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const addCamera = () => {
  formType.value = 'add'
  formData.value = {
    id: null,
    model: '',
    model_zh: '',
    brand_id: null,
    mount_id: null,
    release_year: null,
    type: '',
    sensor_size: '',
    megapixels: null,
    iso_range: '',
    shutter_speed: '',
    weight_grams: null,
    dimensions: '',
    description: '',

    created_at: '',
    updated_at: ''
  }
  dialogVisible.value = true
}

const editCamera = (row) => {
  formType.value = 'edit'
  formData.value = { ...row }
  dialogVisible.value = true
}

const saveCamera = async () => {
  try {
    if (formType.value === 'add') {
      await axiosInstance.post(config.camera.create, formData.value)
      ElMessage.success('新增相机成功')
    } else {
      await axiosInstance.put(config.camera.update(formData.value.id), formData.value)
      ElMessage.success('更新相机成功')
    }
    dialogVisible.value = false
    fetchCameras()
    fetchBrands()
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

const deleteCamera = async (id) => {
  ElMessageBox.confirm('确定要删除该相机吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      try {
        await axiosInstance.delete(config.camera.delete(id))
        ElMessage.success('删除成功')
        fetchCameras()
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

fetchCameras()
fetchBrands()
</script>

<style scoped>
.camera-management-container {
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