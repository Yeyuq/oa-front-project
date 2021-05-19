<template>
  <!--注册表单的容器-->
  <div class="register_container">
    <!--注册区域-->
    <div class="register_box">
      <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px"
               class="registerForm">
        <!--步骤条-->
        <el-steps :active="active - 0" show-icon finish-status="success" align-center>
          <el-step title="填写邮箱号"></el-step>
          <el-step title="填写账号信息"></el-step>
          <el-step title="注册成功"></el-step>
        </el-steps>
        <!--Tab 标签页-->
        <el-tabs v-model="active">
          <el-tab-pane name="0" class="tab_email">
            <el-form-item label="请输入邮箱" prop="email">
              <el-input v-model="registerForm.email" name="emailInput"></el-input>
            </el-form-item>
            <el-button class="btn1_next" type="primary" style="margin-top: 20px;margin-left: 363px" @click="next()">
              下一步
            </el-button>
          </el-tab-pane>
          <el-tab-pane name="1" class="tab_input">
            <el-form-item label="请输入用户名" label-width="110px" prop="username">
              <el-input v-model="registerForm.username"></el-input>
            </el-form-item>
            <el-form-item label="请输入密码" label-width="110px" prop="pass">
              <el-input v-model="registerForm.pass"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" label-width="110px" prop="checkPass">
              <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-button class="btn3_next" type="primary" style="width: 92px;margin-left: 262px " @click="submitForm()">
              确认注册
            </el-button>
          </el-tab-pane>
          <el-tab-pane name="2" class="tab_finish">
            <i class="el-icon-success" style="color: #409EFF;font-size: 129px;"></i>
            <p style="text-align: center">您已注册成功！</p>
            <p style="text-align: center">点击按钮返回登录界面</p>
            <el-button type="primary" @click="loginForm(registerForm)">去登录</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'register',
  data () {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.pass) {
        callback(new Error('两次输入密码不一致!'))
        console.log(this.registerForm.pass)
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        pass: '',
        checkPass: '',
        email: '',
        username: ''
      },
      rules: {
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        pass: [
          // {validator: validatePass, trigger: 'blur'}
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        checkPass: [
          // {validator: validatePass2, trigger: 'blur'}
          {required: true, validator: validatePass2, trigger: 'blur'}
        ],
        username: [
          {required: true, message: '请输入登录用户名', trigger: 'blur'},
          {min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur'}
        ],
      },
      active: '0'
    }
  },
  methods: {
    next () {
      var isPass
      this.$refs['registerForm'].validateField('email', (valid) => {
        isPass = valid
      })
      if (isPass === '') {
        this.active++
        this.active = this.active + ''
      } else {
        console.log('error submit!!')
        return false
      }
    },
    submitForm () {
      var isPass
      var isPass2
      this.$refs['registerForm'].validateField('checkPass', (valid) => {
        isPass = valid
      })
      this.$refs['registerForm'].validateField('username', (valid) => {
        isPass2 = valid
      })
      if (isPass === '' && isPass2 === '') {
        this.$store.dispatch('Register',this.registerForm).then(data=>{
          if("success"===data.result){
            this.active++
            this.active = this.active + ''
            this.$message({
              message:'注册成功',
              type:'success'
            })
          }
        })
      } else {
        console.log('error submit!!')
        return false
      }
    },
    loginForm (FormName) {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.register_container {
  background: url("../../assets/img/bg2.jpg");
  width: 100%; //大小设置为100%
  height: 100%; //大小设置为100%
  position: fixed;
  top:0px;
  //overflow: auto;
  background-size: 100% 100%;
}

.register_box {
  width: 450px;
  height: 380px;
  border: 7px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 7px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  //overflow: auto;
}

.tab_email {
  width: 100%;
}
</style>
