<template>
  <div class="main_box">
    <div style="height: 20px;position: absolute;bottom: 79%;left: 2%;font-size: 15px">
      <p style="color: #909399;line-height: 14px">本月已出勤天数：</p>
      <p style="color: #B3D8FF;line-height: 14px;position: absolute;top: 9%;left: 109%">7</p>
    </div>
    <div style="height: 20px;position: absolute;bottom: 52%;left: 2%;font-size: 15px">
      <p style="color: #909399;line-height: 14px">本月未出勤天数：</p>
      <p style="color: #C25555;line-height: 14px;position: absolute;top: 7%;left: 109%">12</p>
    </div>
    <div class="button_in" style="position: absolute;bottom:65%;left: 17.9%;width: 34px;line-height: 14px">
      <el-button round style="border-color: #C6E2FF;color: #409EFF"
                 @click="to_work()">上
      </el-button>
    </div>
    <div class="button_off" style="position: absolute;top:39%;left: 17.9%;width: 34px;line-height: 14px">
      <el-button round style="border-color: #C6E2FF;color: #409EFF"
                 @click="off_work()">下
      </el-button>
    </div>
    <div
      style="z-index: 1;position: absolute;left: 2%;bottom:2%;color: #909399;height: 40px;font-size: 15px;line-height: 14px">
      {{ nowTime }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      value: new Date(),
      today: new Date().getDate(),
      nowTime: '',
    }
  },
  methods: {
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
    to_work () {
      alert('打卡成功！')
    },
    off_work () {
      alert('下班！')
    }
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
.main_box {
  height: 160px;
  width: 277px;
}
p{
  height: 14px;
}
</style>
