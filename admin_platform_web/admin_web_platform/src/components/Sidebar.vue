<template>
  <div class="sidebar-container">
    <el-menu
      :default-active="$route.path"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :unique-opened="false"
      :collapse-transition="false"
      mode="vertical"
      router
    >
      <el-menu-item index="/dashboard">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-menu-item index="/merchant">
        <i class="el-icon-s-custom"></i>
        <span slot="title">商家管理</span>
      </el-menu-item>

      <el-menu-item index="/goods">
        <i class="el-icon-s-goods"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>

      <el-menu-item index="/order">
        <i class="el-icon-s-order"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>

      <el-menu-item index="/category">
        <i class="el-icon-menu"></i>
        <span slot="title">分类管理</span>
      </el-menu-item>

      <el-menu-item index="/news">
        <i class="el-icon-news"></i>
        <span slot="title">新闻管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      variables: {
        menuBg: '#304156',
        menuText: '#bfcbd9',
        menuActiveText: '#409EFF'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  height: 100%;
  .el-menu {
    height: 100%;
    border: none;
  }
}
</style> 