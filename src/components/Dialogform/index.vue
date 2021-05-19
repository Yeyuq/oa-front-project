<template>
  <div class="dialog_box">
    <el-dialog title="工作计划" :visible.sync="dialogFormVisible" :v-if="dialogFormVisible" class="list_form">
      <!--      <hr style='background-color:rgb(232,243,255); height:1px; border:none;'/>-->
      <p>{{ form.time }}</p>
      <hr style='background-color:rgb(232,243,255); height:1px;width: 79%; border:none;'/>
      <div class="tasks">
        <span class="no-task-tip" v-show="!formtodolist.length">还没有添加任何任务</span>
        <ul style="line-height: 27px;word-wrap: break-word;text-align: left">
          <li v-for="(item,index) in formtodolist" id="ul_box" class="list_box">
            <div class="list_checkbox">
              <input :class="{finished:item['isFinished']}" type="checkbox" @click="FinSch(item,index)"
                     v-model="item['isFinished']">
            </div>
            <div class="list_label">
              <label :class="{labelFinished:item['isFinished']}" v-model="item['isFinished']">
                {{ index + 1 }}.{{ item['work'] }}</label>
            </div>
            <div class="list_btn">
              <el-button class="destroy" @click="delSch(item,index)" size="mini" circle></el-button>
            </div>
          </li>
        </ul>
      </div>
      <el-form :model="form" :rules="rules" ref="form" class="input_box">
        <el-form-item prop="schedule">
          <el-input class="input_content" v-model="form.schedule" autocomplete="off"
                    placeholder="在此添加新的工作计划"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">关 闭</el-button>
        <el-button type="primary" @click="confirm('form')">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'index',
  props: {
    yourdata: String,
    formtodolist: {},
  },

  data () {
    return {
      dialogFormVisible: false,
      btn_check: 'false',
      delMsg: {
        item_index: '',
        item_item: ''
      },
      FinMsg: {
        item_index: '',
        item_item: ''
      },
      finishIndex: '',
      form: {
        schedule: '',
        time: this.yourdata,
        isFinished: 'false',
      },
      formLabelWidth: '120px',
      rules: {
        schedule: [
          {required: true, message: '请输入工作日程', trigger: 'blur'},
        ],
      }
    }
  },
  watch: {
    yourdata: function (val) {
      this.form.time = val
    },
    formtodolist: function (val) {
      this.formtodolist = val
      console.log(val)
    }
  },
  methods: {
    //添加日程
    confirm (formName) {
      console.log(this.form.work)
      console.log(this.formtodolist)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let pushItem = {
            'work': this.form.schedule,
            'time': this.form.time,
            'status': 200,
            'isFinished': false,
          }
          this.formtodolist.push(pushItem)
          this.$store.dispatch('SetDialogForm', this.form).then(data => {
            this.$message({
              message: '日程添加成功',
              type: 'success'
            })
            //再次打开时删除输入框内的文字
            this.$refs['form'].resetFields()
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    //关闭表单
    cancel () {
      this.dialogFormVisible = false
      this.$refs['form'].resetFields()
    },
    //删除日程
    delSch (item, index) {
      this.delMsg.item_index = index
      this.delMsg.item_item = item
      this.$store.dispatch('DelSch', this.delMsg).then(data => {
        this.formtodolist.splice(index, 1)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
    },
    //日程已完成
    FinSch (item, index) {
      this.FinMsg.item_index = index
      this.FinMsg.item_item = item
      if (item.isFinished) {
        item.isFinished = false
      } else {
        item.isFinished = true
      }
      this.$store.dispatch('FinSch', this.FinMsg).then(data => {
        this.$message({
          message: '日程已完成',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tasks {
  //border-top: solid 1px rgba(104, 104, 105, 0.2);
  //border-left: solid 1px rgba(104, 104, 105, 0.2);
  //border-right: solid 1px rgba(104, 104, 105, 0.2);
  background-color: rgb(255, 255, 255);
  box-shadow: 5px 5px rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  overflow: auto;
  height: 29vh;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

li {
  //border-bottom: solid 1px rgba(104, 104, 105, 0.2);
  margin: 0 0 -1px -1px;
}

.destroy:hover {
  border-color: rgb(239, 79, 79);
}

.destroy {
  width: 20px;
  height: 20px;
  margin: 7px;
  background-color: white;
  transition: color .2s ease-out;
}

//hover显示删除按钮
//li:hover .destroy {
//  visibility:visible;
//}

//调整删除按钮内x位置
.el-button--mini.is-circle {
  padding: 2px;
}

.destroy:after {
  content: 'X';
  color: rgb(239, 79, 79);
}

.labelFinished {
  text-decoration: line-through;
}

//list三栏格式
#ul_box {
  display: flex;
}

.list_label {
  flex: 1;
  border-bottom: solid 1px rgba(104, 104, 105, 0.2);
}

.list_checkbox {
  width: 35px;
}

.list_btn {
  width: 35px;
}

//调整dialog大小
.list_form {
  width: 52%;
  left: 24%;
  //height: 200vh;
}

.el-dialog__wrapper {
  //溢出框内容不剪裁，不出现滚动条
  overflow: visible;
}

.dialog_box /deep/ .el-dialog__body {
  padding: 2px 10px 0px 10px;
  height: 100%;
}

//调整输入框边距
.input_box {
  padding: 9px;
}

.input_content {
  //width: 330px;
  width: 34vh;
  //padding: 0 0;
  //margin-left: 10px;
}

.no-task-tip {
  position: absolute;
  right: 32%;
}

</style>
