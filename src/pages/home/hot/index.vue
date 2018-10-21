<template>
  <div class="hotBox">
    <div class="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) of bannerList" :key='index'>
          <img :src="item.imgsrc" alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="content">
      <ul>
        <li v-for="(item,index) of movieList.data" :key="index">
          <img :src="'https://gw.alicdn.com/'+item.poster" alt="" @click="gotoDetail(item.id)" />

          <div class="detail">
            <h3 class="title">{{item.showName}}
              <span>3D</span>
              <span>IMAX</span>
            </h3>
            <p>淘票票评分
              <span>{{item.remark || 0}}</span>
            </p>
            <p class="main-actor">主演:
              <span>{{item.leadingRole || "不详"}}</span>
            </p>
            <p class="director">导演:
              <span>{{item.director}}</span>
            </p>
            <div>
              <span>今日最佳</span>
              <span>口碑最佳</span>
            </div>
          </div>
          <div class="buy">
            <router-link to="/movie" tag="p">购票</router-link>
            <div>新人专享</div>
          </div>
        </li>
      </ul>

    </div>
    <div class="iconfont icon-huidingbu gotop" @click="goTop()" v-if="type==true"></div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import { Swipe, SwipeItem } from "mint-ui";
Vue.use(Swipe);
Vue.use(SwipeItem);
export default {
  data() {
    return {
      bannerList: [
        {
          imgsrc:
            "https://gw.alicdn.com/tfs/TB1fKyqtRjTBKNjSZFDXXbVgVXa-1280-520.jpg_720x720Q30s100.jpg"
        },
        {
          imgsrc:
            "https://gw.alicdn.com/tfs/TB1NDqDu2ImBKNjSZFlXXc43FXa-1280-520.jpg_720x720Q30s100.jpg"
        },
        {
          imgsrc:
            "https://gw.alicdn.com/tfs/TB1El5OuLImBKNjSZFlXXc43FXa-1280-520.jpg_720x720Q30s100.jpg"
        },
        {
          imgsrc:
            "https://gw.alicdn.com/tfs/TB1h.sPuBjTBKNjSZFDXXbVgVXa-1280-520.jpg_720x720Q30s100.jpg"
        },
        {
          imgsrc:
            "https://gw.alicdn.com/tfs/TB1tIrGuIIrBKNjSZK9XXagoVXa-1280-520.jpg_720x720Q30s100.jpg"
        },
        {
          imgsrc:
            "https://gw.alicdn.com/tfs/TB1y8Xkur3nBKNjSZFMXXaUSFXa-1280-520.jpg_720x720Q30s100.jpg"
        },
        {
          imgsrc:
            "https://gw.alicdn.com/tfs/TB1DJX.tRjTBKNjSZFDXXbVgVXa-1280-520.jpg_720x720Q30s100.jpg"
        }
      ],
      movieList: {},
      type: false
    };
  },
  // updated() {
  //   this.h = document.getElementsByClassName("content")[0];
  //   this.h.addEventListener(
  //     "scroll",
  //     () => {
  //       if (this.h.scrollTop > 200) {
  //         this.type = true;
  //       } else {
  //         this.type = false;
  //       }
  //       if (this.h.scrollTop < 200) {
  //         this.type = false;
  //       } else {
  //         this.type = true;
  //       }
  //     },
  //     false
  //   );
  // },
  created () {
   this.getData();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    getData() {
      axios
        .get("http://localhost:3000/homemovie")
        .then(res => {
          this.movieList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    gotoDetail(data) {
      let top = document.documentElement.scrollTop;
      console.log(top);
      localStorage.setItem('movieScroll',top);
      this.$router.push({ name: "detail", query: { userId: data } });
    }
    // goTop() {
    //   const ele = document.getElementsByClassName("content")[0];
    //   clearInterval(timer);
    //   let timer = setInterval(() => {
    //     if (ele.scrollTop > 0) {
    //       ele.scrollTop -= 50;
    //     } else {
    //       clearInterval(timer);
    //     }
    //   }, 10);
    // }
  },
  mounted() {
  
  //  this.goTop();
    let len = localStorage.getItem('movieScroll')
 
    if (len) {
       this.$nextTick(() => {
 console.log(len)
           document.documentElement.scrollTop = len;
       })
   
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/lib/reset.scss";
@import "@/assets/scss/px2rem.scss";
.hotBox {
  margin-top: px2rem(30);
  position: relative;
  z-index: 0;
  .banner {
    @include rect(100%, px2rem(150));
    img {
      @include rect(100%, px2rem(150));
    }
  }
  .content {
    @include rect(100%, auto);
    ul {
      @include rect(100%, auto);

      li {
        @include rect(100%, px2rem(146));
        padding: px2rem(16);
        @include flexbox();
        img {
          @include rect(px2rem(66), px2rem(96));
        }
        .detail {
          margin: 0 px2rem(10) 0 px2rem(10);
          width: px2rem(200);
          .main-actor {
            @include ellipsis(100%, 1);
          }
          .director {
            @include ellipsis(100%, 1);
          }
          h3 {
            margin-bottom: px2rem(6);
            span:nth-of-type(1) {
              padding: 3px 4px;
              background: #999;
              color: white;
            }
            span:nth-of-type(2) {
              padding: 2px 4px;
              border: 1px solid #999;
              color: #999;
            }
          }
          p {
            line-height: 22px;
            color: #666;
          }
          div {
            margin-top: px2rem(6);
            span:nth-of-type(1) {
              padding: 2px 4px;
              border: 1px solid #ff5b77;
              color: #ff5b77;
              margin-right: 5px;
            }
            span:nth-of-type(2) {
              padding: 2px 4px;
              border: 1px solid #2a80b9;
              color: #2a80b9;
            }
          }
        }
        .buy {
          @include flexbox();
          flex-direction: column;
          height: px2rem(114);
          align-items: center;
          justify-content: center;
          // margin-left: px2rem(10)
          p {
            //  @include rect(px2rem(50), px2rem(25));
            padding: px2rem(8) px2rem(16);
            border-radius: 10000px;
            background: linear-gradient(left, #f3a0af, #f82246);
            color: aliceblue;
          }
          div {
            color: #666;
            margin-top: px2rem(6);
          }
        }
      }
    }
  }
  .gotop {
    position: fixed;
    right: px2rem(60);
    bottom: px2rem(70);
    font-size: px2rem(40);
    color: rgba($color: #f76897, $alpha: 0.7);
  }
}
</style>

