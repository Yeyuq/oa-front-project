<template>
  <div>
    <div class="main_box">
      <!--gutter栅栏间隔-->
      <el-row :gutter="27">
        <div class="row_1">
          <el-col :span="6">
            <div class="grid-content1 one"><clock></clock></div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content1 one">meetings</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content1 one"><search></search></div>
          </el-col>
        </div>
      </el-row>
      <el-row :gutter="27">
        <div class="row_2">
          <el-col :span="6">
            <div class="grid-content2 one"><my-calendar></my-calendar>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content2 one">123</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content2 one">123</div>
          </el-col>
        </div>
      </el-row>
      <el-row :gutter="27">
        <div class="row_3">
          <el-col :span="12">
            <div class="grid-content3 one">123</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content3 one">123</div>
          </el-col>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import Clock from '../../components/Clock'
import Search from '../../components/Search'
import MyCalendar from '../../components/MyCalendar'
export default {
  name: 'dashboard',
  components:{Clock,Search,MyCalendar}
}
</script>

<style lang="less">
//分栏上下间距
.el-row {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

.main_box {
  width: 1200px;
  height: 650px;
  //overflow: auto;
}

//块背景颜色
.one {
  background: white;
  box-shadow: 0 1px 9px 0 rgba(64, 158, 255, 0.1);
}

//块圆角
.el-col {
  border-radius: 5px;
}

//第一行块
.grid-content1 {
  border-radius: 5px;
  min-height: 117px;
  margin-top: 5px;
}

//第二行
.grid-content2 {
  border-radius: 5px;
  min-height: 340px;
  margin-top: 5px;
}

//第三行
.grid-content3 {
  border-radius: 5px;
  min-height: 117px;
  margin-top: 5px;
}

.row_1 {
  margin-left: 7px;
  margin-right: 7px;
}

.row_2 {
  margin-left: 7px;
  margin-right: 7px;
}

.row_3 {
  margin-left: 7px;
  margin-right: 7px;
}
</style>
