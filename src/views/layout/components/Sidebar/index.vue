<template>
  <el-aside style="width: 200px" class="aside_box">
    <el-row class="row_avatar">
      <el-avatar class="icon" :src="this.$store.state.user.avatar?this.$store.state.user.avatar:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201905%2F28%2F20190528143150_fETNW.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624365601&t=7d3a9e920bc71e0d16f6312a02cde5d6'" :size="50" style="background-color: #409EFF;cursor: pointer" @click.native="toSettings"></el-avatar>
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
      'sidebar',
      // 'avatar'
    ]),
    avatarImg:{
      get(){
        return this.$store.state.user.avatar
      },
      set(val){
      }
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  watch:{
    avatarImg:{
      handler:function (val,oldVal){
        this.avatar=val
      },
      immediate:true
    }
  },
  methods:{
    toSettings(){
      this.$router.push('/userSettings')
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
