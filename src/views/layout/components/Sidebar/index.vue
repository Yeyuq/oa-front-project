<template>
  <el-aside style="width: 200px" class="aside_box">
    <el-row class="row_avatar">
      <el-avatar class="icon" icon="el-icon-user-solid" :size="50" style="background-color: #409EFF"
      ></el-avatar>
    </el-row>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse"
             background-color="white" text-color="black" active-text-color="#409EFF" class="menu_box">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </el-aside>
</template>
<script>
import {mapGetters} from 'vuex'
import SidebarItem from './SidebarItem'
//import ScrollBar from '@/components/ScrollBar'

export default {
  components: {SidebarItem},
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>

<style lang="less" scoped>
.aside_box {
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 17px 0 rgba(64, 158, 255, 0.2);
  //top:0px;
  //margin: 0;
}
.row_avatar{
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    border: 2px solid rgba(255, 255, 255, 0.7);
  }
}
</style>
