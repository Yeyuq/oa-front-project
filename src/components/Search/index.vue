<template>
  <div class="main_box">
    <div style="height: 40px;width: 40%;position: absolute;left: 54.7%;bottom: 72%">
      <el-input placeholder="请输入用户名称或ID" v-model="input" class="input-with-select"
                prefix-icon="el-icon-search">
        <el-button type="primary" slot="append" icon="el-icon-search" style="color: #409EFF"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      input: ''
    }
  }
}
</script>

<style lang="less" scoped>
.main_box {
  height: 160px;
  width: 277px;
}
</style>
