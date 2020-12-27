<template>
  <div class="login">
    <div class="login_box">
      <div class="avtar_box">
        <img src="../assets/logo.png" />
      </div>
      <el-form label-width="0px" :model="loginForm" :rules="loginVerify" ref="loginFormRef" class="login_form">
        <el-form-item prop="account">
          <el-input placeholder="请输入账号" v-model="loginForm.username" prefix-icon="iconfont icon-yonghu"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="loginForm.password" prefix-icon="iconfont icon-mima" show-password></el-input>
        </el-form-item>
        <el-form-item class="login_button">
          <el-button @click="login()" type="primary" :plain="true">登录</el-button>
          <el-button @click="resetForm()" type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {login} from '../api/Api.js'

  export default {
    data() {
      return {
        loginForm: {
          username: 'admin',
          password: '123456'
        },
        loginVerify: {
          username: [{
              required: true,
              message: '请输入账号',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 10,
              message: '长度在 5 到 10 个字符',
              trigger: 'blur'
            }
          ],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 10,
              message: '长度在 5 到 10 个字符',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      resetForm() {
        this.$refs.loginFormRef.resetFields();
      },
      login() {
        this.$refs.loginFormRef.validate(async isSuccess => {
          if(isSuccess){
            const data = await login(this.loginForm)
            this.$message.success(data.meta.msg)
            //登录成功后token保存到sessionStorage中
            window.sessionStorage.setItem("token",data.data.token)
            //跳转到后台首页
            this.$router.push('/admin')
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped="scoped">
  .login {
    height: 100%;
    background-color: #2B4B6B;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #FFFFFF;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .avtar_box {
    height: 130px;
    width: 130px;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #DDDDDD;
    transform: translate(0, -50%);
    background-color: #FFFFFF;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #EEEEEE;
    }
  }

  .login_form {
    width: 80%;
    box-sizing: border-box;
    transform: translate(0, -20%);
  }

  .login_button {
    float: right;
  }
</style>
