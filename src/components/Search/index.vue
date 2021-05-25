<template>
  <div class="main_box">
      <!--      <el-input placeholder="请输入用户名称或ID" v-model="input" class="input-with-select"-->
      <!--                prefix-icon="el-icon-search">-->
      <!--        <el-button type="primary" slot="append" icon="el-icon-search" style="color: #409EFF"></el-button>-->
      <!--      </el-input>-->
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入用户名称"
        @select="handleSelect"
        prefix-icon="el-icon-search"
      >
        <el-button type="primary" slot="append" icon="el-icon-search" style="color: #409EFF"></el-button>
      </el-autocomplete>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      state: '',
      timeout: null,
      userNickName: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.$store.dispatch('NameList').then(data => {
        this.userNickName = JSON.parse(JSON.stringify(data.userNickNameList))
        // this.userNickName= data.userNickNameList.map((terminal) => {
        //   return {
        //     value: userName,
        //     name: userId,
        //   };
        // });
      })
    },
    //输入框获取焦点时调用的方法
    querySearchAsync (queryString, cb) {
      var userNickName = this.userNickName
      var results = queryString ? userNickName.filter(this.createStateFilter(queryString)) : userNickName
      console.log('res')
      console.log(results)
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        //必须要有一个value值，有无address无关紧要
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
      console.log(item)
    }
  }
}
</script>

<style lang="less" scoped>
.main_box {
  height: 160px;
  width: 277px;
}
.el-autocomplete{
  width: 400px;
  padding-left: 90px;
}
</style>
