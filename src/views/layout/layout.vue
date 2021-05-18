<template>
<!--  <div class="main_container" :class="{hideSidebar:!sidebar.opened}">-->
<!--    <sidebar class="sidebar-container"></sidebar>-->
<!--    <div class="main-container">-->
<!--      <app-main></app-main>-->
<!--    </div>-->
<!--  </div>-->
  <el-container class="main_container" :class="{hideSidebar:!sidebar.opened}">
    <el-aside width="200px"><sidebar class="sidebar-container"></sidebar></el-aside>
    <el-container>
      <el-header><navbar></navbar></el-header>
      <el-main class="main-container">
        <app-main></app-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {Navbar,Sidebar,AppMain} from './components'

export default {
  name: 'layout',
  components: {
    Sidebar,
    AppMain,
    Navbar
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style lang="less" scoped>

.main_container {
  width: 100%;
  height: 100%;
  //position: absolute;
}
.el-header{
  background-color: white;
  color: black;
  //text-align: center;
  line-height: 40px;
}

.el-aside {
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 2px 17px 0 rgba(64, 158, 255, 0.2);

  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #F6F7F9;
  color: black;
  text-align: center;
  line-height: 160px;
}
</style>
