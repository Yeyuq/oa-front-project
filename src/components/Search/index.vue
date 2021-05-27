<template>
  <div class="main_box">
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入用户名称"
      @select="handleSelect"
      prefix-icon="el-icon-search"
    >
      <el-button type="primary" slot="append" icon="el-icon-search" style="color: #409EFF"
                 @click="toFriendView"></el-button>
    </el-autocomplete>
<!--    <friend-view :inputdata="this.state" style="display: none"></friend-view>-->
  </div>
</template>

<script>
// import friendView from '../../views/friendView/friendView'

export default {
  name: 'index',
  // components: {friendView},
  data () {
    return {
      state: '',
      timeout: null,
      userNickName: [],
      inputData:''
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
      this.inputData = item['value']
    },
    toFriendView () {
      //使用路由跳转传递数据
      this.$router.push({
        // path:'/friendView',
        name:'用户信息',
        params:{
          inputVal:this.inputData
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main_box {
  height: 160px;
  width: 277px;
}

.el-autocomplete {
  width: 400px;
  padding-left: 90px;
}
</style>
