<template>
    <div class="register">
        <div class="head">
         <div class="info clearfix">
             <i class="iconfont icon-prev fl"  @click="goLogin()" ></i>
             <p class="fl" @click="goLogin()">返回</p>
             <p class="user fl">用户注册</p>
         </div>       
        </div>
        <div class="form">
        <mt-field  type="tel" placeholder="请输入手机号" :state="telState" class="mint-field-core" v-model="tel"></mt-field>
        <mt-field  placeholder="请输入验证码" class="mint-field-core"  v-model="code" > <span @click='sendCode'>发送验证码</span></mt-field>
        <mt-field type="password"  placeholder="请输入密码" :state="passwordState" class="mint-field-core" v-model="password" ></mt-field>
        </div>
         <div class="btn-group">
                <button class="login-btn" @click="checkForm">注册</button>              
         </div>
         
    </div>
</template>

<script>
import axios from 'axios';
import Vue from "vue";
import { Field, Toast, Header } from "mint-ui";
Vue.use(Field);
Vue.use(Toast);
Vue.use(Header);
export default {
    	data () {
		return {
			tel: '',
			code: '',
			adminCode: '',
			password: ''
		}
	},
	computed: {
		telState () {
			// 手机验证
			const str = "^1(3|4|5|6|7|8|9)\\d{9}$"
			if (this.tel.match(str)) {
				return 'success'
			} else {
				if(this.tel == '') {
					return ''
				} else {
					return 'error'
				}
				
			}
		},
		passwordState () {
			// 由数字、26个英文字母组成的字符串 
			const str = '^[A-Za-z0-9]+$'
			if (this.password.match(str) && this.password.length >= 6) {
				return 'success'
			} else {
				if(this.password == '') {
					return ''
				} else {
					return 'error'
				}
				
			}
		}
	},
    methods: {
        goLogin () {
            this.$router.push("/home")
        },
        sendCode () {
            axios.get('http://www.daxunxun.com/users/sendCode?tel='+this.tel)
            .then(res => {
                console.log(res);
                if (res.data == 1) {
                    Toast({
                        message: '改手机号已存在，请直接登录',
						  position: 'bottom',
						  duration: 2000
                    })
                }else if (res.data == 0) {
                      Toast({
                        message: '注册失败,请重新注册',
						  position: 'bottom',
						  duration: 2000
                    })
                }else {
                    this.adminCode = res.data.code;
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        checkForm () {

            if (this.telState != "success") {
                 Toast({
                          message: "手机号无效,请重新输入",
						  position: 'bottom',
						  duration: 2000
                    })
                    return;
            }
            if (this.code != "") {
                if (this.code != this.adminCode) {
                     Toast({
                          message: "验证码输入错误,请重新输入",
						  position: 'bottom',
						  duration: 2000
                    })
                    return;
                }

            }else {
                Toast({
                          message: "请重新输入验证码",
						  position: 'bottom',
						  duration: 2000
                    })
                    return;
            }
            if (this.passwordState != "success") {
                Toast({
                          message: "密码输入有误,请重新输入",
						  position: 'bottom',
						  duration: 2000
                    })
                    return;
            }
             this.register();
        },      	   
    register() {
        axios.post("http://www.daxunxun.com/users/register",{
            username: this.tel,
            password: this.password
        })
        .then(res => {
            if (res.data == 0) {
                 Toast({
                          message: "注册失败,请重新注册",
						  position: 'bottom',
						  duration: 2000
                    })

            }
            if (res.data == 2 ) {
             Toast({
                          message: "该手机号已注册,请直接登录",
						  position: 'bottom',
						  duration: 2000
                    })
        }
        if (res.data == 1) {
            this.$router.push("/login");
        }

        })
        .catch (err => {
            console.log (err);
        })
        
    }
}
}
</script>

<style lang="scss">
    .mint-field-core {
      background: transparent;
    }
</style>


<style lang="scss" scoped>
@import "@/lib/reset.scss";
@import "@/assets/scss/px2rem.scss";
.register {
  @include rect(100%, 100%);
  background: url(/static/50.jpg) no-repeat;
  background-size: 100% 100%;
  .head {
    @include rect(100%, px2rem(40));
    background: linear-gradient(left, #66bcf5, #b2dbf6);
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

  .form {
    @include rect(100%, px2rem(60));
    padding: px2rem(50) px2rem(18);

    p {
      color: #666;
      font-size: px2rem(14);
    }
    i {
      font-size: px2rem(16);
      font-weight: bold;
    }
  }
  .btn-group {
    @include rect(100%, px2rem(50));
    padding: 0 px2rem(16);
    margin-top: px2rem(150);
    button {
      @include rect(100%, px2rem(40));
      font-size: 16px;
      border-radius: 100px;
      font-size: px2rem(16);
      border: none;
      color: #fff;
      background: #fff;
    }
    .login-btn {
      background: linear-gradient(left, #b2dbf6, #0463a1);
      letter-spacing: px2rem(6);
    }
  }
}
</style>
