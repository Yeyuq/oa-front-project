<template>
  <!--登录表单的容器-->
  <div class="login_container">
    <el-container class="all_box">
      <el-header class="login_header">
        <div>
          <!--<el-avatar class="header_icon" icon="el-icon-office-building" style="color:white;background-color: #162954"></el-avatar>-->
          <img class="header_icon" src="../../assets/img/logo2.png">
          <span class="login_title" style="font-family: gayatri;color:#162954">OA System</span>
        </div>
      </el-header>
      <el-main>
        <!--登录区域-->
        <div class="login_box">
          <!--头像-->
          <div class="avatar_box">
            <img src="../../assets/img/头像2.png">
          </div>
          <!--表单-->
          <el-form :model="LoginForm" :rules="LoginRules" ref="LoginForm" class="Login_Form">
            <el-form-item prop="username">
              <el-input v-model="LoginForm.username" prefix-icon="el-icon-user-solid" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="LoginForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="verifyCode">
              <div class="verifyCode_box">
                <el-input style="width: 242px" v-model="LoginForm.verifyCode" prefix-icon="el-icon-key"
                          placeholder="请输入验证码" class="verify_Code"></el-input>
                <img src="../../assets/img/验证码.png" id="verify_code_img" class="verify_img" @click="change()">
              </div>
            </el-form-item>
            <el-form-item class="Login_Btn">
              <el-button type="primary" style="width: 340%" @click="handleLogin('LoginForm')">立即登录</el-button>
            </el-form-item>
            <!--<el-form-item class="Register_Btn">-->
            <!--<el-button @click="registerForm('LoginForm')">注册</el-button>-->
            <!--</el-form-item>-->
            <div class="link_group">
              <el-link type="info" @click="registerForm('LoginForm')">忘记密码</el-link>
              <el-link type="info" @click="registerForm('LoginForm')">忘记用户名</el-link>
              <el-link type="primary" @click="registerForm('LoginForm')">注册</el-link>
            </div>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      LoginForm: {
        username: '',
        password: '',
        verifyCode: '',
        uid: '',
        isAdmin: '',
      },
      LoginRules: {
        username: [
          {required: true, message: '请输入登录用户名', trigger: 'blur'},
          {min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入登录密码', trigger: 'blur'},
          {min: 3, max: 17, message: '长度在 3 到 17 个字符', trigger: 'blur'}
        ],
        verifyCode: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    //确认登陆
    handleLogin (formName) {
      this.$refs[formName].validate((valid) => {
        // 判断用户输入是否合法
        if (valid) {
          // 异步执行login方法
          // 1 点登陆，先调用这个handleLogin方法
          // 2 然后异步调用user.js里的Login 登陆成功设置cookie并返回data
          this.$store.dispatch('Login', this.LoginForm).then(data => {
            console.log('=================================')
            console.log(data)
            if ('success' === data.result) {
              //跳转
              this.$router.push('/')
            } else {
              console.log('2')
              this.$message.error('账号/密码错误')
            }
          }).catch(() => {
            console.log('3')
            //this.$router.push('/login')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    registerForm (formName) {
      console.log('在这里')
      this.$router.push('/register')
    },
    change () {
      axios.get('/api/login_verifycode').then(function (response) {
        let data = response.data
        document.getElementById('verify_code_img').setAttribute('src', data.url)
      })
    }
  }
}
</script>

<style lang="less" scoped>

.login_container {
  background: url("../../assets/img/bg2.jpg");
  width: 100%; //大小设置为100%
  height: 100%; //大小设置为100%
  //width: 1440px;
  //height: 823px;
  overflow: auto;
  position: fixed;
  top: 0px;
  background-size: 100% 100%;
}

.login_header {
  width: 1440px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);

  .header_icon {
    width: 70px;
    height: 70px;
    position: absolute;
    /*top: 0.01%;*/
    bottom: 91%;
    left: 0.5%;
  }

  .login_title {
    width: 400px;
    position: absolute;
    top: 2%;
    left: 2%;
    font-size: 40px;
    font-weight: bold;
    letter-spacing: 2px;
  }
}

.login_box {
  width: 350px;
  height: 350px;
  border: 7px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 7px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 79%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    width: 110px;
    height: 110px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: -65px auto;
    /*background-color: rgba(148,193,235,0.2);*/
    background-color: rgba(255, 255, 255, 0.2);

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eeeeee;
    }
  }

  .Login_Form {
    position: absolute;
    bottom: 20%;
    width: 100%;
    padding: 10px;
    right: 2px;
    box-sizing: border-box;

    .Login_Btn {
      /*display: flex;*/
      /*justify-content: flex-end;*/
      position: absolute;
      /*left: 0.1%;*/
    }

    .link_group {
      position: absolute;
      right: 2%;
      top: 120%;
    }

    .verifyCode_box {
      display: flex;

      .verifyCode {
        width: 70%;
        /*padding-left: 10px;*/
        justify-content: left;
      }
    }

    .verify_img {
      width: 30%;
      height: 45px;
      justify-content: flex-end;
      padding-left: 10px;

    }
  }
}

</style>
