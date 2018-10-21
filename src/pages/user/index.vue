<template>
  <div class="user">
    <div class="top clearfix">
      <div class="setup">

        <i class="iconfont icon-shezhi fl" @click="$router.push('setting')"></i>
        <i class="iconfont icon-tishi fr"></i>

      </div>
      <div class="login">
        <p class="picture"><img src="/static/48.jpg" alt=""></p>
        <div class="letter clearfix" @click="login()">
          <p class="fl">{{letter}}</p>
          <p class="iconfont icon-next-m fr"></p>
        </div>
      </div>
    </div>
    <div class="nav">
      <ul>
        <li v-for="(item, index) of list" :key="index">

          <i class="iconfont" :class="item.icon"></i>
          <p>{{item.name}} </p>

        </li>
      </ul>
    </div>
    <div class="banner">
      <img src="/static/banner.jpg" alt="">
    </div>
    <div class="detail">
      <ol>
        <li class="clearfix" v-for="(item,index) of detailList" :key="index">
          <p class="fl">{{item.letter}}</p>
          <i class="iconfont icon-next-m fr"></i>
        </li>
      </ol>
    </div>

    <!-- <mt-popup v-model="popupVisible" position="right" class="mint-popup " popup-transition="vux-pop-in">
           <div class="exit">
             <div class="head">
                   <div class="info clearfix">
             <i class="iconfont icon-prev fl"  ></i>
             <p class="fl" @click="gotoPrev()">返回</p>
             <p class="user fl">设置</p>
               </div>  

               </div>
               <div class="detail">
           <ol class="sub">
               <li class="clearfix" v-for="(item,index) of exitList" :key="index">
                   <p class="fl">{{item.left}}</p>
                   <i class="fr">{{item.right}}&nbsp;&nbsp;&nbsp;></i>
               </li>
           </ol>
           <div class="exitlogin tc" @click="loginOut">
             退出登录
           </div>
          </div>
              </div>
         </mt-popup> -->

  </div>

</template>

<script>
import { Popup } from "mint-ui";
import Vue from "vue";
Vue.use(Popup);
export default {
  data() {
    return {
      list: [
        {
          name: "电影票",
          path: "/home",
          icon: "icon-dianying"
        },
        {
          name: "优惠券",
          path: "/movie",
          icon: "icon-youhuiquan-copy"
        },
        {
          name: "权益卡",
          path: "/video",
          icon: "icon-shuju1"
        },
        {
          name: "演出票",
          path: "/show",
          icon: "icon-yinle"
        }
      ],
      detailList: [
        {
          letter: "想看的电影"
        },
        {
          letter: "看过的电影"
        },
        {
          letter: "我的小聚场"
        },
        {
          letter: "发起的讨论"
        },
        {
          letter: "银行卡特惠"
        },
        {
          letter: "阿里鱼商城"
        },
        {
          letter: "娱乐宝"
        },
        {
          letter: "帮助与反馈",
          tip: "咨询票小蜜"
        }
      ],
      letter: "立即登录",
      popupVisible: false
    };
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    gotoPrev() {
      this.popupVisible = false;
    },
    loginOut() {
      localStorage.removeItem("username");
      this.flag = false;
      this.popupVisible = false;
    }
  },
  created() {
    if (localStorage.getItem("username")) {
      this.letter = localStorage.getItem("username");
    }
  }
};
</script>



<style lang="scss" scoped>
@import "@/lib/reset.scss";
@import "@/assets/scss/px2rem.scss";
.top {
  @include rect(100%, px2rem(164));
  background: url(/static/logo.jpg) no-repeat;
  padding: px2rem(28);
  .setup {
    @include rect(100%, px2rem(40));
    i {
      font-size: px2rem(24);
      color: #122531;
    }
  }
  .login {
    @include flexbox();
    margin-top: px2rem(12);
    .picture {
      @include rect(px2rem(70), px2rem(70));
      margin-right: px2rem(15);
      img {
        @include rect(px2rem(70), px2rem(70));
        object-fit: cover;
        border-radius: 50%;
        -webkit-animation: haha1 4s linear infinite;
        @-webkit-keyframes haha1 {
          0% {
            -webkit-transform: rotate(0deg);
          }
          25% {
            -webkit-transform: rotate(90deg);
          }
          50% {
            -webkit-transform: rotate(180deg);
          }
          75% {
            -webkit-transform: rotate(270deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
      }
    }
    .letter {
      @include rect(px2rem(250), px2rem(70));
      p {
        line-height: px2rem(70);
        font-size: px2rem(28);
        color: rgb(26, 14, 14);
        font-style: italic;
      }
    }
  }
}
.nav {
  @include rect(100%, px2rem(106));
  ul {
    @include flexbox();
    @include rect(100%, px2rem(106));
    li {
      @include flex();
      @include rect(auto, 100%);
      @include flexbox();
      @include flex-direction(column);
      @include justify-content();
      @include align-items();
      &:nth-of-type(1) {
        .iconfont {
          @include text-color(#e9270e);
          font-size: px2rem(30);
        }
      }
      &:nth-of-type(2) {
        .iconfont {
          @include text-color(#1dca6b);
          font-size: px2rem(30);
        }
      }
      &:nth-of-type(3) {
        .iconfont {
          @include text-color(#2b078d);
          font-size: px2rem(32);
        }
      }
      &:nth-of-type(4) {
        .iconfont {
          @include text-color(#db5e0a);
          font-size: px2rem(32);
        }
      }
      p {
        @include text-color(#878787);
        font-size: px2rem(14);
      }
    }
  }
}
.banner {
  @include rect(100%, px2rem(100));
  background: #f5f5f5a1;
  img {
    @include rect(100%, px2rem(80));
    margin-top: px2rem(10);
  }
}
.detail {
  @include rect(100%, 100%);
  ol {
    li {
      @include rect(100%, px2rem(60));
      line-height: px2rem(60);
      border-bottom: 1px solid #ccc;
      padding: 0 px2rem(16);
      p {
        color: #333;
        font-size: px2rem(14);
      }
      i {
        color: #333;
        font-size: px2rem(14);
      }
    }
  }
}
.mint-popup-right {
  top: 0;
  // right: 0;
  // bottom: 0;
  // left: 0;
  transform: translate3d(0, 0, 0);
  @include rect(100%, 100%);
  background: #fff;
}
</style>



