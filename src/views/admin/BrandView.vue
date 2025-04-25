<template>
    <div class="brand-management-container">
        <!-- 搜索区域 -->
        <div class="search-area">
            <el-input v-model="searchKeyword" placeholder="请输入品牌名称/代码" clearable style="width: 250px" size="small" />
            <el-button type="primary" @click="handleSearch" size="small">
                <el-icon>
                    <Search />
                </el-icon>
                搜索
            </el-button>
            <el-button @click="handleReset" size="small">
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
                    <el-button class="button" type="primary" size="small" @click="handleAdd">
                        <el-icon>
                            <Plus />
                        </el-icon>
                        新增品牌
                    </el-button>
                </div>
            </template>

            <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" stripe border>
                <el-table-column type="selection" width="50" align="center" />
                <el-table-column prop="brandName" label="品牌名称" align="center" />
                <el-table-column prop="brandCode" label="品牌代码" align="center" />
                <el-table-column prop="country" label="所属国家" align="center" />
                <el-table-column prop="createTime" label="创建时间" align="center" width="150" />
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
                <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize"
                    :page-sizes="[10, 20, 50, 100]" :small="false" :total="total"
                    layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </div>
        </el-card>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search, Refresh, Plus, Edit, Delete } from '@element-plus/icons-vue';

export default {
    components: { Search, Refresh, Plus, Edit, Delete },
    setup() {
        const searchKeyword = ref('');
        const tableData = ref([]);
        const total = ref(0);
        const currentPage = ref(1);
        const pageSize = ref(10);
        const multipleSelection = ref([]);

        const fetchData = async () => {
            try {
                const response = await axios.get('/api/brands', {
                    params: {
                        keyword: searchKeyword.value,
                        page: currentPage.value,
                        pageSize: pageSize.value,
                    },
                });

                if (response.data.success) {
                    tableData.value = response.data.data;
                    total.value = response.data.total;
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
            fetchData();
        };

        const handleCurrentChange = (page) => {
            currentPage.value = page;
            fetchData();
        };

        const handleSelectionChange = (val) => {
            multipleSelection.value = val;
        };

        const handleEdit = (row) => {
            console.log('Edit row:', row);
            ElMessage.info(`编辑 ${row.brandName}`);
            // TODO: 实现编辑逻辑
        };

        const handleDelete = (row) => {
            ElMessageBox.confirm(`确定要删除 ${row.brandName} 吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    // TODO: 实现删除逻辑，并刷新表格数据
                    console.log('Delete row:', row);
                    ElMessage.success(`删除 ${row.brandName} 成功`);
                    fetchData();
                })
                .catch(() => {
                    ElMessage.info('已取消删除');
                });
        };

        const handleAdd = () => {
            ElMessage.info('新增');
            // TODO: 实现新增逻辑
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
            handleSearch,
            handleReset,
            handleSizeChange,
            handleCurrentChange,
            handleSelectionChange,
            handleEdit,
            handleDelete,
            handleAdd,
        };
    },
};
</script>

<style scoped>
.brand-management-container {
    min-height: calc(100vh - 100.57px);
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