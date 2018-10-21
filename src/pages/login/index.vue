<template>
    <div class="login">
        <div class="head">
            <div class="info clearfix">
                <i class="iconfont icon-prev fl" @click="gotoHome()"></i>
                <p class="fl" @click="gotoHome()">返回</p>
                <p class="user fl">用户登录</p>
            </div>
        </div>
        <div class="logo">
            <img src="/static/image/logo.png" alt="">
        </div>
        <div class="forms">
            <div class="form">
                <mt-field type="tel" placeholder="请输入手机号" class="mint-field-core" :state="telState" v-model="tel"></mt-field>
                <mt-field type="password" placeholder="请输入密码" class="mint-field-core" :state="passwordState" v-model="password"></mt-field>
            </div>
            <div class="opear">
                <span @click="register()">免费注册</span>
                <span>忘记密码</span>
            </div>
            <div class="btn-group">
                <button class="login-btn" @click="checkForm()">登录</button>
                <button class="code-btn">短信验证码登录</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import { Field, Toast, Header } from "mint-ui";
Vue.use(Field);
Vue.use(Toast);
Vue.use(Header);
export default {
  data() {
    return {
      tel: "",
      password: ""
    };
  },
  computed: {
    telState() {
      // 手机验证
      const str = "^1(3|4|5|6|7|8|9)\\d{9}$";
      if (this.tel.match(str)) {
        return "success";
      } else {
        if (this.tel == "") {
          return "";
        } else {
          return "error"; 
        }
      }
    },
    passwordState() {
      // 由数字、26个英文字母组成的字符串
      const str = "^[A-Za-z0-9]+$";
      if (this.password.match(str) && this.password.length >= 6) {
        return "success";
      } else {
        if (this.password == "") {
          return "";
        } else {
          return "error";
        }
      }
    }
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
    gotoHome() {
      this.$router.push("/home");
    },
    checkForm() {
      if (this.telState != "success") {
        Toast({
          message: "手机号无效,请重新输入",
          position: "bottom",
          duration: 2000
        });
        return;
      }
      if (this.passwordState != "success") {
        Toast({
          message: "密码输入有误,请重新输入",
          position: "bottom",
          duration: 2000
        });
        return;
      }
      this.login();
    },
    login() {
      axios
        .post("http://www.daxunxun.com/users/login", {
          username: this.tel,
          password: this.password
        })
        .then(res => {
          if (res.data == 0) {
            Toast({
              message: "登录失败,请重新登录",
              position: "bottom",
              duration: 2000
            });
          }
          if (res.data == 2) {
            Toast({
              message: "该用户不存在",
              position: "bottom",
              duration: 2000
            });
          }
          if (res.data == -1) {
            Toast({
              message: "密码错误",
              position: "bottom",
              duration: 2000
            });
          }
          if (res.data == 1) {
            localStorage.setItem("username", this.tel);
            this.$router.push("/home");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/lib/reset.scss";
@import "@/assets/scss/px2rem.scss";
.login {
  background: url(/static/p.JPG) no-repeat;
  background-size: 100% 100%;
  @include rect(100%, 100%);
  .head {
    @include rect(100%, px2rem(40));
    background: #fadca8;
    .info {
      line-height: px2rem(40);
      p {
        color: #fff;
      }
      i {
        color: #fff;
      }
      .user {
        margin-left: px2rem(130);
        font-size: px2rem(16);
      }
    }
  }
  .logo {
    width: px2rem(80);
    height: px2rem(80);
    margin: px2rem(25) auto;

    img {
      width: px2rem(80);
      height: auto;
      object-fit: cover;
    }
  }
  .forms {
    .form {
      padding: 0 px2rem(18) 0 px2rem(18);
      .mint-field-core {
        background: transparent;
        border-bottom: 1px solid #666;
      }
      p {
        color: #666;
        font-size: px2rem(14);
      }
      i {
        font-size: px2rem(16);
        font-weight: bold;
      }
    }
    .opear {
      padding: 0 px2rem(14);
      font-size: px2rem(16);
      color: #666;
      @include rect(100%, px2rem(60));
      @include flexbox();
      @include justify-content(space-between);
      @include align-items();
    }
    .btn-group {
      padding: 0 px2rem(16);
      button {
        @include rect(100%, px2rem(40));
        font-size: 16px;
        border-radius: 100px;
        margin-top: px2rem(24);
        border: none;
        color: #fff;
        background: #fff;
      }
      .login-btn {
        background: linear-gradient(left, #fadca8, #f9b339);
        letter-spacing: 4px;
      }
      .code-btn {
        color: #ff5400;
        border: 1px solid #ff5400;
      }
    }
  }
}
</style>

