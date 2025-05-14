<template>
  <div class="mount-management-container">
    <!-- 搜索区域 -->
    <div class="search-area">
      <el-input v-model="searchText" placeholder="请输入卡口名称" clearable style="width: 250px" />
      <el-button type="primary" @click="fetchMounts">
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
          <span class="card-title">卡口列表</span>
          <el-button class="button" type="primary" @click="addMount">
            <el-icon>
              <Plus />
            </el-icon>
            新增卡口
          </el-button>
        </div>
      </template>
      <el-table :data="mounts" style="width: 100%" @selection-change="handleSelectionChange" stripe border>
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="name" label="卡口名称" align="center" />
        <el-table-column prop="brand_id" label="品牌ID" align="center" />
        <el-table-column prop="release_year" label="发布年份" align="center" />
        <el-table-column prop="flange_distance" label="法兰距(mm)" align="center" />
        <el-table-column prop="diameter" label="直径(mm)" align="center" />
        <el-table-column prop="created_at" label="创建时间" align="center" width="150" :formatter="formatDate" />
        <el-table-column prop="updated_at" label="更新时间" align="center" width="150" :formatter="formatDate" />
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="primary" link size="small" @click="editMount(scope.row)">
              <el-icon>
                <Edit />
              </el-icon>
              编辑
            </el-button>
            <el-button type="danger" link size="small" @click="deleteMount(scope.row.id)">
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
    <el-dialog v-model="dialogVisible" :title="formType === 'add' ? '新增卡口' : '编辑卡口'" width="30%">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="卡口名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入卡口名称" />
        </el-form-item>
        <el-form-item label="品牌" prop="brands">
          <el-select v-model="formData.brands" placeholder="请选择品牌" clearable filterable multiple>
            <el-option v-for="brand in brandOptions" :key="brand.id" :label="brand.name_zh" :value="brand.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="发布年份" prop="release_year">
          <el-input v-model="formData.release_year" placeholder="请输入发布年份" type="number" />
        </el-form-item>
        <el-form-item label="法兰距(mm)" prop="flange_distance">
          <el-input v-model="formData.flange_distance" placeholder="请输入法兰距" type="number" />
        </el-form-item>
        <el-form-item label="直径(mm)" prop="diameter">
          <el-input v-model="formData.diameter" placeholder="请输入直径" type="number" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="formData.description" type="textarea" placeholder="请输入卡口描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveMount">确定</el-button>
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

const mounts = ref([])
const searchText = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const dialogVisible = ref(false)
const formType = ref('add')
const formData = ref({
  id: null,
  name: '',
  brands: [],
  release_year: null,
  flange_distance: null,
  diameter: null,
  description: ''
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

const fetchMounts = async () => {
  try {
    const response = await axiosInstance.get(config.mount.list, {
      params: {
        search: searchText.value,
        skip: (currentPage.value - 1) * pageSize.value,
        limit: pageSize.value
      }
    })
    mounts.value = response.data
    total.value = response.headers['x-total-count'] || response.data.length
  } catch (error) {
    ElMessage.error('获取卡口列表失败')
  }
}

const resetSearch = () => {
  searchText.value = ''
  currentPage.value = 1
  fetchMounts()
  fetchBrands()
}

const handleSizeChange = (newSize) => {
  pageSize.value = newSize
  currentPage.value = 1
  fetchMounts()
  fetchBrands()
}

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
  fetchMounts()
  fetchBrands()
}

const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const addMount = () => {
  formType.value = 'add'
  formData.value = {
  id: null,
  name: '',
  brands: [],
  release_year: null,
  flange_distance: null,
  diameter: null,
  description: ''
}
  dialogVisible.value = true
}

const editMount = (row) => {
  formType.value = 'edit'
  formData.value = { ...row }
  dialogVisible.value = true
}

const saveMount = async () => {
  try {
    const { created_at, updated_at, ...rest } = formData.value
    const payload = {
      ...rest,
      brands: formData.value.brands
    }
    
    if (formType.value === 'add') {
      await axiosInstance.post(config.mount.create, payload)
      ElMessage.success('新增卡口成功')
    } else {
      await axiosInstance.put(config.mount.update(formData.value.id), payload)
      ElMessage.success('更新卡口成功')
    }
    dialogVisible.value = false
    fetchMounts()
    fetchBrands()
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

const deleteMount = async (id) => {
  ElMessageBox.confirm('确定要删除该卡口吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      try {
        await axiosInstance.delete(config.mount.delete(id))
        ElMessage.success('删除成功')
        fetchMounts()
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

fetchMounts()
fetchBrands()
</script>

<style scoped>
.mount-management-container {
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