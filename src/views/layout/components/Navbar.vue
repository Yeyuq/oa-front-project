<template>
  <!--  horizontal横向排列 vertical纵向-->
  <el-menu class="navbar" mode="horizontal">
    <breadcrumb class="breadcrumb_box"></breadcrumb>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link" style="cursor: pointer">
        菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            主页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">登出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import {mapGetters} from 'vuex'
import Breadcrumb from '../../../components/Breadcrumb'

export default {
  components: {
    Breadcrumb,
  },
  computed: {
    ...mapGetters([
      'sidebar',
    ])
  },
  methods: {
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style lang="less" scoped>
//去除navMenu下划线
.el-menu.el-menu--horizontal {
  border: none;
}

.breadcrumb_box {
  line-height: 60px;
  height: 20px;
}

.el-dropdown{
  float: right;
  line-height: 20px;
}

.el-dropdown:hover{
  color: #409EFF;
}
</style>

