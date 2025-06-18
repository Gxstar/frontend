<template>
    <div class="login-page">
        <div class="login-container">
            <div class="logo-section">
                <h2 class="title">用户注册</h2>
            </div>
            <el-form ref="registerFormRef" :model="registerForm" :rules="rules" class="login-form">
                <el-form-item prop="username">
                    <el-input v-model="registerForm.username" placeholder="请输入用户名" :prefix-icon="User"
                        class="login-input !rounded-button" />
                </el-form-item>
                <el-form-item prop="email">
                    <el-input v-model="registerForm.email" placeholder="请输入邮箱" :prefix-icon="Message"
                        class="login-input !rounded-button" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="registerForm.password" type="password" placeholder="请输入密码" :prefix-icon="Lock"
                        class="login-input !rounded-button" />
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请确认密码" :prefix-icon="Lock"
                        class="login-input !rounded-button" @keyup.enter="handleRegister" />
                </el-form-item>
                <el-button type="primary" class="login-button !rounded-button" :loading="loading"
                     @click="handleRegister"
                >
                    注 册
                </el-button>
                <div class="register-section">
                    <span class="register-text">已有账号？</span>
                    <el-link type="primary" class="register-link" @click="goToLogin">立即登录</el-link>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { User, Lock, Message } from '@element-plus/icons-vue';
import type { FormInstance } from 'element-plus';
import { useRouter } from 'vue-router';
import api from '@/api';

const registerFormRef = ref<FormInstance>();
const loading = ref(false);
const router = useRouter();

const registerForm = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
});

const validatePassword = (rule: any, value: string, callback: any) => {
    if (value !== registerForm.password) {
        callback(new Error('两次输入的密码不一致'));
    } else {
        callback();
    }
};

const validateEmail = (rule: any, value: string, callback: any) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!value) {
        callback(new Error('请输入邮箱'));
    } else if (!emailRegex.test(value)) {
        callback(new Error('请输入有效的邮箱地址'));
    } else {
        callback();
    }
};

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '用户名长度应在 3 到 20 个字符之间', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { validator: validateEmail, trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度应在 6 到 20 个字符之间', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        { validator: validatePassword, trigger: 'blur' }
    ]
};

const handleRegister = async () => {
    if (!registerFormRef.value) return;
    try {
        await registerFormRef.value.validate();
        loading.value = true;

        await api.users.createUser({
            requestBody: {
                username: registerForm.username,
                email: registerForm.email,
                password: registerForm.password
            }
        });

        ElMessage({
            type: 'success',
            message: '注册成功'
        });
        router.push('/login');
    } catch (error) {
        console.error(error);
        ElMessage({
            type: 'error',
            message: error.response?.data?.detail || '注册失败，请重试'
        });
    } finally {
        loading.value = false;
    }
};

const goToLogin = () => {
    router.push('/login');
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

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.logo-section {
    text-align: center;
    margin-bottom: 30px;
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
    margin-top: 20px;
}

.login-input {
    margin-bottom: 20px;
}

.login-button {
    width: 100%;
    margin-top: 10px;
    background-color: #409eff;
    border-color: #409eff;
    height: 2.75rem;
    font-size: 1rem;
    white-space: nowrap;
    background:linear-gradient(to right, #409eff, #67c23a);
}

.login-button:hover {
    background-color: #66b1ff;
    border-color: #66b1ff;
}

.login-button:active {
    background-color: #3a8ee6;
    border-color: #3a8ee6;
}

.register-section {
    margin-top: 20px;
    text-align: center;
}

.register-text {
    color: #606266;
    margin-right: 10px;
}
</style>