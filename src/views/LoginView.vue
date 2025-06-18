<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->
<template>
    <div class="login-page">
        <div class="login-container">
            <div class="logo-section">
                <h2 class="title">欢迎登录</h2>
            </div>
            <el-form ref="loginFormRef" :model="loginForm" :rules="rules" class="login-form">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="请输入用户名" :prefix-icon="User"
                        class="login-input !rounded-button" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" :prefix-icon="Lock"
                        class="login-input !rounded-button" @keyup.enter="handleLogin" />
                </el-form-item>
                <div class="forgot-password">
                    <el-link type="primary" class="forgot-link">忘记密码？</el-link>
                </div>
                <el-button type="primary" class="login-button !rounded-button" :loading="loading" @click="handleLogin">
                    登 录
                </el-button>
                <div class="register-section">
                    <span class="register-text">还没有账号？</span>
                    <el-link type="primary" class="register-link" @click="goToRegister">立即注册</el-link>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';
import type { FormInstance } from 'element-plus';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
// import config from '../config';
const loginFormRef = ref<FormInstance>();
const loading = ref(false);
const router = useRouter();
const loginForm = reactive({
    username: '',
    password: ''
});
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '用户名长度应在 3 到 20 个字符之间', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度应在 6 到 20 个字符之间', trigger: 'blur' }
    ]
};
const goToRegister = () => {
    router.push('/register');
};

const handleLogin = async () => {
    if (!loginFormRef.value) return;
    try {
        await loginFormRef.value.validate();
        loading.value = true;
        
        await useAuthStore().login(loginForm.username, loginForm.password);
        ElMessage({
            type: 'success',
            message: '登录成功'
        });
        router.push('/admin');
    } catch (error) {
        // 错误已在 auth store 中处理
        // ElMessage({
        //     type: 'error',
        //     message: error.response?.data?.detail || '登录失败，请重试'
        // });
    } finally {
        loading.value = false;
    }
};
</script>
<style scoped>
.login-page {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #8b8ff7 0%, #6ea5f8 25%, #7edfd2 50%, #57c99e 75%, #4db594 100%);
}

.login-container {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    width: 420px;
    transition: all 0.3s ease-in-out;
    animation: fadeIn 0.3s ease-in-out;
}

.logo-section {
    text-align: center;
    margin-bottom: 3rem;
}

.title {
    font-size: 2rem;
    font-weight: 600;
    background: linear-gradient(to right, #3b82f6, #10b981);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.login-input {
    height: 2.75rem;
}

.forgot-password {
    display: flex;
    justify-content: flex-end;
}

.forgot-link {
    font-size: 0.875rem;
}

.forgot-link:hover {
    color: #2563eb;
}

.login-button {
    width: 100%;
    height: 2.75rem;
    font-size: 1rem;
    white-space: nowrap;
}

.register-section {
    text-align: center;
    margin-top: 1rem;
}

.register-text {
    color: #4b5563;
}

.register-link {
    margin-left: 0.5rem;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

:deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px #dcdfe6 inset;
    transition: all 0.3s;
}

:deep(.el-input__wrapper:hover) {
    box-shadow: 0 0 0 1px #409eff inset;
}

:deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px #409eff inset;
}

:deep(.el-button--primary) {
    background: linear-gradient(to right, #409eff, #67c23a);
    border: none;
    transition: transform 0.3s;
}

:deep(.el-button--primary:hover) {
    transform: scale(1.02);
}
</style>