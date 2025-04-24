<template>
  <AdminNav />
  <el-row>
    <el-col :span="3">
      <AdminSidebar />
    </el-col>
  </el-row>
</template>

<script setup>
import AdminNav from '@/components/AdminNav.vue';
import AdminSidebar from '@/components/AdminSidebar.vue';
</script>

<style scoped>
</style>