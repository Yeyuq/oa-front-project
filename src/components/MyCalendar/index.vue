<template>
  <div class="main_box">
    <div class="calendar_wrap" style="height: 100%;width: 97.9%;line-height: 7px">
      <el-calendar v-model="value" class="calendar_1">
        <template
          slot="dateCell"
          slot-scope="{date, data}">
          <div slot="reference" class="div-Calendar" @click="openPlan(data.day)">
            <div :class="queryHavePlan(data.day)?'isFilled':''">
              {{ data.day.split('-').slice(2)[0] }}
            </div>
          </div>
        </template>
      </el-calendar>
      <dialogform ref="mychild" :yourdata="yourdata" :formtodolist="formtodolist"></dialogform>
    </div>
  </div>
</template>

<script>
import Dialogform from '../Dialogform'

var timer = null
export default {
  name: 'index',
  components: {Dialogform},
  data () {
    return {
      value: new Date(),
      today: new Date().getDate(),
      nowTime: '',
      yourdata: '',
      formtodolist: {},
      isFilled: '',
      ret_list: {},
      allWorkPlanList: [],
      allWorkPlanJson: {},
      jsonForWork: {},
    }
  },
  created () {
    // this.havePlan()
    this.queryAllWorkPlan()
    this.queryHavePlan()
    //this.queryHavePlan()
  },
  methods: {
    queryAllWorkPlan () {
      this.$store.dispatch('SchList').then(data=>{
        this.jsonForWork=JSON.parse(JSON.stringify(data.jsonForWork))
        console.log('给你看list')
        console.log(data)
      })
    },
    queryHavePlan (day) {
      //注意day的格式是否与json中的date相符
      //遍历本地保存的plan_List
      //如果有返回true
      if ((JSON.stringify(this.jsonForWork[day]) != '{}') && this.jsonForWork[day]) {
        return true
      }
    },
    queryWorkPlanByDay (day) {
      //查询这个day的workplan ,如果有返回todoList
      //如果没有返回空的todoList
      if (this.jsonForWork[day]) {
        return this.jsonForWork[day]
      } else {
        this.jsonForWork[day] = {}
      }
    },
    judgmentDate (date) {
      return date.getTime() < Date.now()
    },
    openPlan (day) {
      clearTimeout(timer)
      // 把day日期和当前日期进行比对
      // 如果这个day是以前的日期，则不允许修改工作计划
      timer = setTimeout(() => {
        this.$refs.mychild.dialogFormVisible = true
        this.yourdata = day
        if (this.queryHavePlan(day)) {
          this.$nextTick(function () {
            this.formtodolist = this.jsonForWork[day]
          })
        } else {
          this.jsonForWork[day] = []
          this.formtodolist = this.jsonForWork[day]
        }
      }, 200)
    },

    timeFormate (timeStamp) {
      let year = new Date(timeStamp).getFullYear()
      let month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
      let date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
      let hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
      let mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
      let ss = new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()
      this.nowTime = year + '.' + month + '.' + date + '  ' + '星期' + '日一二三四五六'.charAt(new Date().getDay()) + ' ' + hh + ':' + mm + ':' + ss
    },
    nowTimes () {
      this.timeFormate(new Date())
      setInterval(this.nowTimes, 1000)
      // console.log(this.nowTimes);
      this.clear()
    },
    clear () {
      clearInterval(this.nowTimes)
      this.nowTimes = null
    },
  },
  mounted () {
    this.nowTimes()
  },
  beforeDestroy () {
    this.clear()
  }
}
</script>

<style lang="less" scoped>
.isFilled {
  color: #f48b29;
}

.main_box {
  height: 340px;
  width: 277px;
}

.main_box /deep/ .el-calendar-table .el-calendar-day {
  height: 34px;
  width: 34px;
}

.main_box /deep/ .el-calendar__title {
  font-size: 7px;
}

.main_box /deep/ .el-button-group {
  width: 190px;
}

.main_box /deep/ .el-calendar__header {
  padding: 12px 2px;
}
</style>
