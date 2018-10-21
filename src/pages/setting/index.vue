<template>

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
           <div class="exitlogin tc" @click="loginOut()">
             退出登录
           </div>
          </div>
              </div>

</template>

<script>
export default {
  data() {
    return {
      exitList: [
        {
          left: "清除缓存",
          right: "164.4MB"
        },
        {
          left: "给我们评分"
        },
        {
          left: "关于淘票票",
          right: "当前版本8.0.7"
        }
      ]
    };
  },
  methods:{
      gotoPrev(){
          this.$router.back();
      },
      loginOut () {
        localStorage.removeItem("username");
      }
  }
};
</script>

<style lang="scss" scoped>
@import "@/lib/reset.scss";
@import "@/assets/scss/px2rem.scss";
.exit {
  @include rect(100%, 100%);
  background: rgb(243, 239, 239);
  .head {
    @include rect(100%, px2rem(40));
    background: linear-gradient(left, #b2dbf6, #0463a1);
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
  .detail {
    .sub {
      background: #fff;
      margin-top: px2rem(10);
    }
    .exitlogin {
      margin-top: px2rem(40);
      @include rect(100%, px2rem(40));
      line-height: px2rem(40);
      font-size: px2rem(16);
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      background: linear-gradient(left, #f6f9fa, #c7c9ca);
    }
  }

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
</style>
