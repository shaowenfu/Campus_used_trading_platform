<template>
  <el-container class="app-wrapper">
    <el-aside width="200px">
      <sidebar />
    </el-aside>
    <el-container>
      <el-header>
        <navbar />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  height: 100vh;
  
  .el-header {
    background-color: #fff;
    border-bottom: 1px solid $border-color-light;
    box-shadow: $box-shadow-light;
  }
  
  .el-aside {
    background-color: #304156;
    color: #fff;
  }
  
  .el-main {
    background-color: $background-color-base;
    padding: $spacing-large;
  }
}
</style> 