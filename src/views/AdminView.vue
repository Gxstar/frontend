<template>
  <AdminNav />
  <el-row>
    <el-col :span="3">
      <AdminSidebar />
    </el-col>
    <el-col :span="21">
      <AdminContent />
    </el-col>
  </el-row>
</template>

<script setup>
import AdminNav from '@/components/AdminNav.vue';
import AdminSidebar from '@/components/AdminSidebar.vue';
import AdminContent from '@/components/AdminContent.vue';
</script>

<style scoped>
</style>