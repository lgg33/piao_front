<template>
  <div>
    <div class="register-wrapper">
      <div id="register">
        <p class="title">欢迎注册</p>
        <el-form
          :model="registerForm"
          status-icon
          :rules="rules2"
          ref="registerForm"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input v-model="registerForm.username" autocomplete="off" placeholder="请输入用户名"/>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="registerForm.email" auto-complete="off" placeholder="请输入邮箱"/>
          </el-form-item>
          <el-form-item prop="code" class="code">
            <el-input v-model="registerForm.code" placeholder="验证码"/>
            <el-button type="primary" :disabled='isDisabled' @click="sendCode">{{buttonText}}</el-button>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="输入密码"/>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input type="password" v-model="registerForm.checkPass" auto-complete="off" placeholder="确认密码"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(registerForm)" style="width:100%;">注册</el-button>
            <p class="login" @click="gotoLogin">已有账号？立即登录</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

  import user from "@/api/user";

  export default {
    layout: 'sign',
    name: "Register",
    data() {
      const checkUser = (rule, value, callback) => {
        user.getByName(value)
          .then((data) => {
          // console.log(data)
          if (!data.success) {
            callback(new Error('用户名已存在'));
          }else {
            callback();
          }
        });
      };
      // <!--验证邮箱是否合法-->
      let checkEmail= (rule, value, cb) => {
        // 验证邮箱的正则表达式
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        if (regEmail.test(value)) {
          // 合法的邮箱
          return cb()
        }
        cb(new Error('请输入合法的邮箱'))
      };
      //  <!--验证码是否为空-->
      let checkCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机验证码'))
        } else {
          callback()
        }
      };
      // <!--验证密码-->
      let validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"))
        } else {
          if (this.registerForm.checkPass !== "") {
            this.$refs.registerForm.validateField("checkPass");
          }
          callback()
        }
      };
      // <!--二次验证密码-->
      let validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.registerForm.password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        registerForm: {
          username: '',
          password: '',
          checkPass: '',
          email: '',
          code: ''
        },
        rules2: {
          password: [{ validator: validatePass, trigger: 'blur' }],
          checkPass: [{ validator: validatePass2, trigger: 'blur' }],
          email: [{ validator: checkEmail, trigger: 'blur' }],
          code: [{ validator: checkCode, trigger: 'blur' }],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            {
              min: 2,
              max: 12,
              message: '用户名的长度在2~12个字符之间',
              trigger: 'blur'
            },
            { validator: checkUser, trigger: 'blur' }
          ],
        },
        buttonText: '发送验证码',
        isDisabled: false, // 是否禁止点击发送验证码按钮
        flag: true,
      }
    },
    methods: {
      // <!--发送验证码-->
      async sendCode () {
        let email = this.registerForm.email;
        if (this.checkEmail(email)) {
          console.log(email);
          await user.getEmail(email).catch(err => err);
          let time = 60;
          this.buttonText = '已发送';
          this.isDisabled = true;
          if (this.flag) {
            this.flag = false;
            let timer = setInterval(() => {
              time--;
              this.buttonText = time + ' 秒';
              if (time === 0) {
                clearInterval(timer);
                this.buttonText = '重新获取';
                this.isDisabled = false;
                this.flag = true;
              }
            }, 1000)
          }
        } else {
          this.$message.error("邮箱输入错误")
        }
      },
      // <!--提交注册-->
      submitForm(userInfo) {
        this.$refs.registerForm.validate(async valid => {
          if (!valid) return;
          const result = await user.save(userInfo).catch(err => err);
          if (result.success) {
            this.$message.success('注册成功');
            await this.$router.push('/login');
          }
        })
      },
      // <!--进入登录页-->
      gotoLogin() {
        this.$router.push({
          path: "/login"
        });
      },
      // 验证邮箱
      checkEmail(str) {
        let re = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        return re.test(str);
      }
    }
  };
</script>

<style scoped>
  .loading-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #aedff8;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .register-wrapper img {
    position: absolute;
    z-index: 1;
  }
  .register-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
  #register {
    max-width: 340px;
    margin: 60px auto;
    background: #fff;
    padding: 20px 40px;
    border-radius: 10px;
    position: relative;
    z-index: 9;
  }
  .title {
    font-size: 26px;
    line-height: 50px;
    margin: 20px;
    text-align: center;
  }
  .el-form-item {
    text-align: center;
  }
  .login {
    margin-top: 10px;
    font-size: 14px;
    line-height: 22px;
    color: #1ab2ff;
    cursor: pointer;
    text-align: left;
    text-indent: 8px;
    width: 160px;
  }
  .login:hover {
    color: #2c2fd6;
  }
  .code >>> .el-form-item__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .code button {
    margin-left: 20px;
    width: 140px;
    text-align: center;
  }
  .el-button--primary:focus {
    background: #409EFF;
    border-color: #409EFF;
    color: #fff;
  }
</style>
