<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="(val: boolean) => emits('update:visible', val)"
    :title="title"
    :width="dialogWidth"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      class="space-y-4"
    >
      <el-form-item
        v-for="field in fields"
        :key="field.prop"
        :label="field.label"
        :prop="field.prop"
        :required="field.required"
      >
        <template v-if="field.type === 'input'">
          <el-input
            v-model="formData[field.prop]"
            :placeholder="field.placeholder || `请输入${field.label}`"
            :disabled="field.disabled"
          />
        </template>

        <template v-else-if="field.type === 'textarea'">
          <el-input
            v-model="formData[field.prop]"
            type="textarea"
            :rows="field.rows || 4"
            :placeholder="field.placeholder || `请输入${field.label}`"
          />
        </template>

        <template v-else-if="field.type === 'number'">
          <el-input
            v-model.number="formData[field.prop]"
            type="number"
            :placeholder="field.placeholder || `请输入${field.label}`"
          />
        </template>

        <template v-else-if="field.type === 'select'">
          <el-select
            v-model="formData[field.prop]"
            :placeholder="field.placeholder || `请选择${field.label}`"
          >
            <el-option
              v-for="option in field.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </template>

        <template v-else-if="field.type === 'switch'">
          <el-switch v-model="formData[field.prop]" />
        </template>

        <template v-else-if="field.type === 'date'">
          <el-date-picker
            v-model="formData[field.prop]"
            type="date"
            :placeholder="field.placeholder || `请选择${field.label}`"
          />
        </template>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits, onMounted, toRefs, watch } from 'vue';
import type { FormInstance } from 'element-plus';

const props = defineProps<{
  visible: boolean;
  title: string;
  fields: Array<{
    prop: string;
    label: string;
    type: 'input' | 'textarea' | 'number' | 'select' | 'switch' | 'date';
    required?: boolean;
    placeholder?: string;
    disabled?: boolean;
    rows?: number;
    options?: Array<{
      label: string;
      value: string | number | boolean;
    }>;
    validator?: (rule: any, value: any, callback: any) => void;
  }>;
  initialData?: Record<string, any>;
  dialogWidth?: string;
}>()


const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'submit', data: Record<string, any>): void;
}>();

const formRef = ref<FormInstance>();
const formData = reactive<Record<string, any>>({});
const rules = reactive<Record<string, any>>({});

// 初始化表单数据和验证规则
const initForm = () => {
  // 重置表单数据
  Object.keys(formData).forEach(key => delete formData[key]);
  Object.keys(rules).forEach(key => delete rules[key]);

  // 设置初始数据
  if (props.initialData) {
    Object.assign(formData, props.initialData);
  }

  // 设置验证规则
  props.fields.forEach(field => {
    if (field.required || field.validator) {
      rules[field.prop] = [];
      if (field.required) {
        rules[field.prop].push({
          required: true,
          message: `请输入${field.label}`,
          trigger: 'blur'
        });
      }
      if (field.validator) {
        rules[field.prop].push({
          validator: field.validator,
          trigger: 'blur'
        });
      }
    }
  });
};

const handleSubmit = async () => {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();
    emits('submit', { ...formData });
    handleClose();
  } catch (error) {
    // 表单验证失败
    console.error('Form validation failed:', error);
  }
};

const handleClose = () => {
  emits('update:visible', false);
  if (formRef.value) {
    formRef.value.resetFields();
  }
};

onMounted(() => {
  initForm();
});

// 监听visible变化，重新初始化表单
watch(() => props.visible, (newVal) => {
  if (newVal) {
    initForm();
  }
});
</script>

<style scoped>
/* 表单样式优化 */
::v-deep .el-form-item {
  margin-bottom: 16px;
}

::v-deep .el-dialog__body {
  max-height: 60vh;
  overflow-y: auto;
  padding: 20px;
}
</style>