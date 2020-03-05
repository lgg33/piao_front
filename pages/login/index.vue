<template>
  <div>
    <!--登录表单-->
    <el-form class="login_box" :model="loginForm" ref="loginFormRef" label-width="0" :rules="loginFormRules">
      <h3 class="login-title">欢迎登录</h3>
      <!--用户名-->
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" placeholder="请输入用户名"
                  style="width: 300px"/>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock"
                  placeholder="请输入密码" style="width: 300px"/>
        </el-form-item>
        <!--验证码-->
<!--      <el-form-item prop="checkCode">-->
<!--        <el-input id="check-code" v-model="loginForm.checkCode" placeholder="请输入验证码" style="width: 120px; margin-right: 30px"/>-->
<!--        <img :src="codeUrl"  @click="getCode" style="height: 35px; width: 100px"/>-->
<!--      </el-form-item>-->
      <!--remember-->
      <el-form-item style="margin-left: 190px">
        <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item class="btns" style="margin-left: 135px;">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="resetLoginForm">重置</el-button>
      </el-form-item>
      <p class="register" @click="gotoRegister">没有账号？立即注册</p>
    </el-form>
  </div>
</template>

<script>

  import user from "@/api/user";
  import md5 from "js-md5";

  export default {
    layout: 'sign',
    name: "Login",
    data() {
      return {
        // codeUrl: 'http://localhost:7000/uc/user/getCode',
        loginForm: {
          username: '',
          password: '',
          // checkCode: '',
          remember: false,
          autoLogin: false
        },
        userDto: {
          username: '',
          password: ''
        },
        loginFormRules: {
          username: [
            { required: true, message: '请输入登录名', trigger: 'blur' },
            {
              min: 2,
              max: 12,
              message: '登录名长度在 2 到 12 个字符',
              trigger: 'blur'
            }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
              min: 3,
              max: 15,
              message: '密码长度在 3 到 15 个字符',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    created() {
      // if (process.client) {
      //   this.getCookie();
      // }
    },
    methods: {
      gotoRegister() {
        this.$router.push('/register');
      },
      //获取验证码
      // getCode() {
      //   this.codeUrl = this.codeUrl + '?a=' + new Date().getTime();
      // },
      //登录
      login() {
        this.$refs.loginFormRef.validate(async valid => {
          // console.log(this.loginFormRules);
          if (!valid) {
            return;
          }
          //判断复选框是否被勾选 勾选则调用配置cookie方法
          // if (this.loginForm.remember === true) {
          //   console.log("checked == true");
          //   //传入账号名，密码，和保存天数3个参数
          //   if (process.client) {
          //     this.setCookie(this.loginForm.username, this.loginForm.password, 7);
          //   }
          // }else {
          //   console.log("清空Cookie");
          //   //清空Cookie
          //   if (process.client) {
          //     this.clearCookie();
          //   }
          // }
          //与后端请求代码，
          this.userDto.username = this.loginForm.username;
          this.userDto.password = md5(this.loginForm.password);
          const { data } = await user.login(this.userDto).catch(err => err);
          if (data.success) {
            this.$message.success('登录成功');
            if (process.client) {
              window.sessionStorage.setItem('user', JSON.stringify(data.data.item));
            }
            if (this.$route.query.redirect_url) {
              return await this.$router.push(this.$route.query.redirect_url);
            }
            await this.$router.push('/');
          }
        })
      },
      //重置表单
      resetLoginForm() {
        this.$refs.loginFormRef.resetFields();
      },
      setCookie(c_name, c_pwd, exdays) {
        let exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      },
      //读取cookie
      getCookie() {
        if (document.cookie.length > 0) {
          let arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
          for (var i = 0; i < arr.length; i++) {
            let arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] === 'userName') {
              this.loginForm.username = arr2[1]; //保存到保存数据的地方
            } else if (arr2[0] === 'userPwd') {
              this.loginForm.password = arr2[1];
            }
          }
        }
      },
      //清除cookie
      clearCookie() {
        this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
      }
    }
  }
</script>

<style scoped>
  #check-code {
    height: 25px;
    width: 90px;
    margin-top: 5px;
  }

  /*.carousel-inner .item img {*/
  /*  width: 100%;*/
  /*  height: 300px;*/
  /*}*/


  .login_box {
    border: 1px solid #DCDFE6;
    width: 300px;
    margin: 20px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 2px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }

  .register {
    margin-top: 10px;
    font-size: 14px;
    line-height: 22px;
    color: #1ab2ff;
    cursor: pointer;
    text-align: left;
    text-indent: 8px;
    width: 160px;
  }


</style>
