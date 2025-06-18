<template>
    <div class="brand-management-container">
        <!-- 搜索区域 -->
        <div class="search-area">
            <el-input v-model="searchKeyword" placeholder="请输入品牌名称/代码" clearable style="width: 250px" />
            <el-button type="primary" @click="handleSearch">
                <el-icon>
                    <Search />
                </el-icon>
                搜索
            </el-button>
            <el-button @click="handleReset">
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
                    <span class="card-title">品牌列表</span>
                    <div>
                        <el-button class="button" type="primary" @click="handleAdd">
                            <el-icon>
                                <Plus />
                            </el-icon>
                            新增品牌
                        </el-button>
                        <el-button class="button" type="danger" :disabled="!multipleSelection.length" @click="handleBatchDelete">
                            <el-icon>
                                <Delete />
                            </el-icon>
                            批量删除
                        </el-button>
                    </div>
                </div>
            </template>

            <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" stripe border>
                <el-table-column type="selection" width="50" align="center" />
                <el-table-column prop="id" label="ID" align="center" sortable />
                <el-table-column prop="name" label="品牌名称" align="center" />
                <el-table-column prop="name_zh" label="中文名称" align="center" />
                <el-table-column prop="country" label="所属国家" align="center" />
                <el-table-column prop="founded_year" label="成立年份" align="center" sortable />
                <el-table-column prop="website" label="官网" align="center" />
                <el-table-column prop="created_at" label="创建时间" align="center" width="150" :formatter="formatDate" sortable />
                <el-table-column prop="updated_at" label="更新时间" align="center" width="150" :formatter="formatDate" sortable />
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="primary" link size="small" @click="handleEdit(scope.row)">
                            <el-icon>
                                <Edit />
                            </el-icon>
                            编辑
                        </el-button>
                        <el-button type="danger" link size="small" @click="handleDelete(scope.row)">
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
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    :page-sizes="[10, 20, 50, 100]" :total="total"
                    layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </div>
        </el-card>

        <!-- 新增/编辑弹窗 -->
        <el-dialog v-model="dialogVisible" :title="formType === 'add' ? '新增品牌' : '编辑品牌'" width="30%">
            <el-form :model="formData" label-width="100px">
                <el-form-item label="品牌名称" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入品牌名称" />
                </el-form-item>
                <el-form-item label="中文名称" prop="name_zh">
                    <el-input v-model="formData.name_zh" placeholder="请输入中文名称" />
                </el-form-item>

                <el-form-item label="所属国家" prop="country">
                    <el-input v-model="formData.country" placeholder="请输入所属国家" />
                </el-form-item>
                <el-form-item label="成立年份" prop="founded_year">
                    <el-date-picker v-model="formData.founded_year" type="year" placeholder="选择年份" value-format="YYYY"
                        :disabled-date="(date) => date.getFullYear() > new Date().getFullYear()" />
                </el-form-item>
                <el-form-item label="官网" prop="website">
                    <el-input v-model="formData.website" placeholder="请输入官网网址" />
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="formData.description" type="textarea" placeholder="请输入品牌描述" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSubmit">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue';

import { ElMessage, ElMessageBox, ElForm, ElFormItem, ElDialog } from 'element-plus';
import { Search, Refresh, Plus, Edit, Delete } from '@element-plus/icons-vue';
import { ElLoading } from 'element-plus';

export default {
    components: { Search, Refresh, Plus, Edit, Delete },
    setup() {
        const searchKeyword = ref('');
        const tableData = ref([]);
        const total = ref(0);
        const currentPage = ref(1);
        const pageSize = ref(10);
        const multipleSelection = ref([]);
        
        const { proxy } = getCurrentInstance();

        const fetchData = async () => {
            try {
                const response = await proxy.$api.brands.readBrands({
                    keyword: searchKeyword.value,
                    skip: (currentPage.value - 1) * pageSize.value,
                    limit: pageSize.value,
                });

                if (response.data) {
                    tableData.value = response.data;
                    total.value = response.data.length;
                } else {
                    ElMessage.error('数据加载失败');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                ElMessage.error('数据加载失败');
            }
        };

        const handleSearch = () => {
            currentPage.value = 1;
            fetchData();
        };

        const handleReset = () => {
            searchKeyword.value = '';
            currentPage.value = 1;
            fetchData();
        };

        const handleSizeChange = (size) => {
            pageSize.value = size;
            currentPage.value = 1;
            fetchData();
        };

        const handleCurrentChange = (page) => {
            currentPage.value = page;
            fetchData();
        };

        const handleSelectionChange = (val) => {
            multipleSelection.value = val;
        };



        const handleDelete = async (row) => {
            ElMessageBox.confirm(`确定要删除 ${row.name} 吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(async () => {
                    try {
                        await proxy.$api.brands.deleteBrand(row.id);
                        ElMessage.success(`删除 ${row.name} 成功`);
                        fetchData();
                    } catch (error) {
                        console.error('Error deleting brand:', error);
                        ElMessage.error('删除失败');
                    }
                })
                .catch(() => {
                    ElMessage.info('已取消删除');
                });
        };

        const handleBatchDelete = async () => {
            const loading = ElLoading.service({ lock: true, text: '批量删除中...' });

            if (multipleSelection.value.length === 0) {
                ElMessage.warning('请选择要删除的品牌');
                loading.close();
                return;
            }

            ElMessageBox.confirm(
                `确定要删除选中的 ${multipleSelection.value.length} 个品牌吗?`,
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(async () => {
                    try {
                        const idsToDelete = multipleSelection.value.map(item => item.id);
                        await proxy.$api.brands.deleteBrands({
                            requestBody: idsToDelete
                        });
                        ElMessage.success(`成功删除 ${idsToDelete.length} 个品牌`);
                        fetchData();
                        loading.close();
                    } catch (error) {
                        console.error('Error batch deleting brands:', error);
                        ElMessage.error('批量删除失败');
                        loading.close();
                    }
                })
                .catch(() => {
                    ElMessage.info('已取消批量删除');
                    loading.close();
                });
        };

        const dialogVisible = ref(false);
        const formType = ref('add');
        const formData = ref({
            brandName: '',
            brandCode: '',
            country: ''
        });

        const handleAdd = () => {
            formType.value = 'add';
            formData.value = {
                name: '',
                name_zh: '',
                country: '',
                founded_year: '',
                website: '',
                description: ''
            };
            dialogVisible.value = true;
        };

        const handleEdit = (row) => {
            formType.value = 'edit';
            formData.value = {
                ...row
            };
            dialogVisible.value = true;
        };

        const formatDate = (row, column, cellValue) => {
            if (!cellValue) return '';
            const date = new Date(cellValue);
            return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
        };

        const handleSubmit = async () => {
            try {
                if (formType.value === 'add') {
                    await proxy.$api.brands.createBrand({
                        requestBody: formData.value
                    });
                    ElMessage.success('新增品牌成功');
                } else {
                    await proxy.$api.brands.updateBrand(formData.value.id, {
                        requestBody: formData.value
                    });
                    ElMessage.success('编辑品牌成功');
                }
                dialogVisible.value = false;
                fetchData();
            } catch (error) {
                console.error('Error submitting form:', error);
                ElMessage.error('操作失败');
            }
        };

        onMounted(() => {
            fetchData();
        });

        return {
            searchKeyword,
            tableData,
            total,
            currentPage,
            pageSize,
            multipleSelection,
            dialogVisible,
            formData,
            handleSearch,
            handleReset,
            handleSizeChange,
            handleCurrentChange,
            handleSelectionChange,
            handleEdit,
            handleDelete,
            handleAdd,
            handleSubmit,
            formType,
            formatDate,
            handleBatchDelete,
        };
    },
};
</script>

<style scoped>
.brand-management-container {
    /* 页面背景色 */
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
        'Microsoft YaHei', Arial, sans-serif;
    /* 统一字体 */
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
    /* 卡片阴影 */
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-title {
    font-size: 18px;
    /* 增大标题字体 */
    font-weight: 500;
    color: #303133;
}

.pagination-area {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

/* 按钮样式 */
.el-button {
    border-radius: 4px;
    font-size: 14px;
    /* 统一按钮字体 */
}

/* 表格样式 */
.el-table {
    font-size: 14px;
    color: #606266;
}

.el-table th {
    background-color: #eef1f6;
    color: #909399;
    font-size: 14px;
    /* 统一表头字体 */
}

.el-table td {
    font-size: 14px;
    /* 统一单元格字体 */
}

.el-table tr:hover {
    background-color: #f0f2f5;
    /* 行 hover 效果 */
}

/* 分页器样式 */
.el-pagination {
    color: #606266;
    font-size: 14px;
    /* 统一分页器字体 */
}
</style>