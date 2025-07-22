<template>
  <div>
    <!-- 导入按钮 -->
    <el-button type="primary" @click="showDialog">
      <el-icon><upload /></el-icon> {{ buttonText }}
    </el-button>

    <!-- 导入对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :width="dialogWidth"
    >
      <el-upload
        class="upload-demo"
        action=""
        :auto-upload="false"
        :on-change="handleFileChange"
        :show-file-list="true"
        :accept="acceptFileTypes"
      >
        <el-button type="primary">选择文件</el-button>
        <template #tip>
          <div class="el-upload__tip">
            {{ fileTypeTip }}
          </div>
        </template>
      </el-upload>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitImport">导入</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { ElMessage } from 'element-plus';
import { Upload } from '@element-plus/icons-vue';

// 定义 props
const props = defineProps({
  buttonText: {
    type: String,
    default: '批量导入'
  },
  dialogTitle: {
    type: String,
    default: '批量导入数据'
  },
  dialogWidth: {
    type: String,
    default: '50%'
  },
  acceptFileTypes: {
    type: String,
    default: '.xlsx,.xls'
  },
  fileTypeTip: {
    type: String,
    default: '请上传Excel格式文件，支持.xlsx和.xls格式'
  },
  importApi: {
    type: Function,
    required: true
  }
});

// 定义事件
const emit = defineEmits(['success', 'error']);

// 状态管理
const dialogVisible = ref(false);
const selectedFile = ref<File | null>(null);

// 显示对话框
const showDialog = () => {
  dialogVisible.value = true;
};

// 文件选择变化
const handleFileChange = (uploadFile: any) => {
  selectedFile.value = uploadFile.raw;
};

// 提交导入
const submitImport = async () => {
  if (!selectedFile.value) {
    ElMessage.warning('请选择文件');
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile.value);

  try {
    await props.importApi(formData);
    ElMessage.success('批量导入成功');
    dialogVisible.value = false;
    emit('success');
  } catch (error) {
    console.error('批量导入失败:', error);
    ElMessage.error('批量导入失败，请检查文件格式');
    emit('error', error);
  }
};
</script>