<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">
      <router-link v-if="item.children.length===1 && !item.children[0].children"
                   :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
          <!--          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>-->
          <span v-if="item.children[0].meta&&item.children[0].meta.title">{{ item.children[0].meta.title }}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title" >
          <i :class="item.meta.icon"></i>
          <!--          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>-->
          <span v-if="item.meta&&item.meta.title">{{ item.meta.title }}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]"
                        :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <!--              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>-->
              <span v-if="child.meta&&child.meta.title" style="color: #393e46">{{ child.meta.title }}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  }
}
</script>
//elementUI的样式是定义在全局中，我们使用scoped时，局部样式会被全局样式所覆盖（vue默认全局样式覆盖局部样式）
//所以更改elementUI样式无效可以去掉scoped
<style lang="less">
.menu-wrapper {
  text-align: center;
}

//去除router link下划线
a {
  text-decoration: none;
}

.el-menu-item:hover{
  outline: 0 !important;
  color: #409EFF !important;
  background: rgba(53,134,251,0.2) !important;
}

.el-submenu__title:focus, .el-submenu__title:hover{
  outline: 0 !important;
  color: #409EFF !important;
  background: rgba(53,134,251,0.2) !important;
}
</style>
