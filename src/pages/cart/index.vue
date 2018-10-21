<template>
    <div class="box">
        <div class="data">

            <div class="head">
                <p>
                    <span class="iconfont icon-prev1" @click="goto()"></span>
                    <span>{{cartList.cinemaName}}</span>
                    <span class="clo iconfont icon-tubiaozhizuomobandefuben-"></span>
                </p>
            </div>
            <div class="cinama">
                <div class="c-left">
                    <h1>{{cartList.cinemaName}}</h1>
                    <p>{{cartList.address}}</p>
                    <p>
                        <span v-for="item of cartList.displaySupports ">{{item}}</span>
                    </p>
                </div>
                <div class="c-right">
                    <i class="iconfont icon-dingwei"></i>
                </div>
            </div>
        </div>
        <div class="hotbag">
            <div class="contents">
                <div class="fontred">
                    <p>10元观影红包</p>
                    <p>联通积分兑换专区</p>
                </div>
                <i class="iconfont icon-shuju1"></i>
            </div>

        </div>
        <div class="banner">
            <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(item,index) of imgList" :key="index">
          <img :src="item.url" alt="" >
           </swiper-slide>
      </swiper>

            
        </div>
        <div class="font">
            <p class="tc">传奇的诞生&nbsp;&nbsp;
                <span>9.0</span>
                <span>分</span>
            </p>
            <p class="tc">
                <span>107分钟</span>&nbsp;&nbsp;
                <span>剧情</span>&nbsp;&nbsp;
                <span>凯文·德·宝拉&nbsp;&nbsp;贝利&nbsp;&nbsp;索·豪进</span>
            </p>
        </div>
        <div class="time ">
            <div class="discount clearfix">
                <p class="fl">今天09-08
                    <span>惠</span>
                </p>
                <p class="fl">明天09-09
                    <span>惠</span>
                </p>
            </div>
            <div class="limit">
                <p class="clearfix">
                    <span class="fl">惠</span>
                    <span class="fl">特惠活动每人每天仅限参加1次,限购一张</span>
                    <span class="fr iconfont icon-next"></span>
                </p>
            </div>
        </div>
        <div class="ticket">
            <ul>
                <li>
                    <div class="time">
                        <p>
                            <span>16:55</span>
                            <span>18:42&nbsp;&nbsp;散场</span>
                        </p>
                        <p>
                            <span>英语&nbsp;&nbsp;2D</span>
                            <span>1号厅</span>
                        </p>
                    </div>
                    <div class="price">
                        <p>
                            <span>特惠
                                <i>29.9</i>元</span>
                            <del>45元</del>
                        </p>
                        <router-link to="/shop" tag="i" class="buy">购票</router-link>
                    </div>
                </li>
                <li>
                    <div class="time">
                        <p>
                            <span>18:55</span>
                            <span>20:42&nbsp;&nbsp;散场</span>
                        </p>
                        <p>
                            <span>英语&nbsp;&nbsp;2D</span>
                            <span>1号厅</span>
                        </p>
                    </div>
                    <div class="price">
                        <p>
                            <span>特惠
                                <i>29.9</i>元</span>
                            <del>45元</del>
                        </p>
                        <i @click="gotoshop(cartList.cinemaName)" class="buy">购票</i>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cartList: [],
      swiperOption: {
        loop: true,
        effect: "coverflow",
        slidesPerView: 3,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 60,
          stretch: 10,
          depth: 60,
          modifier: 2,
          slideShadows: true
        }
      },
      imgList:[{ url:'/static/picture.JPG'},{url:'/static/vedio1.jpg'},{url:'/static/vedio3.jpg'},{url:'/static/vedio6.jpg'},
      {url:'/static/vedio7.jpg'},
      {url:'/static/p.JPG'},{ url:'/static/picture.JPG'},{url:'/static/vedio1.jpg'}]

    };
  },
  methods: {
    goto() {
      this.$router.go(-1);
    },
    getdata() {
      const id = this.$route.query.cinemaId;

      axios
        .get("http://localhost:3000/cartdata?cinemaId=" + id)

        .then(res => {
          this.cartList = res.data[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    gotoshop(data) {
    
      this.$router.push({ name: "shop", query: { id: data } })
      
    }
  },
  mounted() {
    this.getdata();
  }
};
</script>

<style lang="scss" scoped>
@import "@/lib/reset.scss";
@import "@/assets/scss/px2rem.scss";
.head {
  padding: px2rem(10) px2rem(20) px2rem(5) px2rem(20);
  border-bottom: 1px solid rgb(216, 201, 201);
  p {
    @include rect(100%, px2rem(25));
    @include flexbox();
    align-items: center;
    justify-content: space-between;
    span {
      font-size: px2rem(16);
      font-weight: bold;
      color: rgb(19, 18, 18);
      &.clo {
        color: rgb(81, 82, 139);
      }
    }
  }
}
.cinama {
  @include rect(100%, auto);
  padding: px2rem(10) px2rem(16) px2rem(8) px2rem(16);
  @include flexbox();
  align-items: center;
  justify-content: space-between;
  .c-left {
    width: px2rem(268);
    border-right: 1px solid rgb(207, 203, 203);
    padding-right: px2rem(20);
    h1 {
      font-size: px2rem(18);
      color: #000;
    }
    p {
      font-size: px2rem(14);
      color: #666;
      line-height: px2rem(22);
      margin-bottom: px2rem(10);
      @include ellipsis(100%, 1);
      span {
        padding: px2rem(3) px2rem(4);
        border: 1px solid #77afd7;
        color: #77afd7;
        margin-right: px2rem(6);
        border-radius: 10%;
      }
    }
  }
  .c-right {
    @include rect(px2rem(50), px2rem(60));
    @include flexbox();
    align-items: center;
    justify-content: center;
    i {
      font-size: px2rem(28);
      color: #77afd7;
    }
  }
}
.hotbag {
  padding: px2rem(0) px2rem(15) px2rem(15) px2rem(15);

  .contents {
    padding: px2rem(2) px2rem(10);
    border: 1px solid #77afd7;
    border-radius: 4px;
    background: rgba($color: #77afd7, $alpha: 0.2);
    @include flexbox();
    align-items: center;
    justify-content: space-between;
    .fontred {
      p:nth-of-type(1) {
        font-size: px2rem(16);
        color: #77afd7;
      }
      p:nth-of-type(2) {
        color: #77afd7;
        line-height: px2rem(16);
      }
    }
    i {
      font-size: px2rem(50);
      color: #77afd7;
    }
  }
}
.banner {
  @include rect(100%, px2rem(124));
  background: #526584;
}
.font {
  padding: px2rem(10) 0;
  p:nth-of-type(1) {
    font-size: px2rem(18);
    color: rgb(19, 18, 18);
    span:nth-of-type(1) {
      font-size: px2rem(16);
      color: #f1a95d;
    }
    span:nth-of-type(2) {
      color: #f1a95d;
    }
  }
  p:nth-of-type(2) {
    color: rgb(180, 175, 175);
  }
}
.time {
  @include rect(100%, auto);
  .discount {
    @include rect(100%, auto);
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    line-height: px2rem(44);

    p {
      margin-left: px2rem(9);
      margin-right: px2rem(16);
      font-size: px2rem(14);
      color: #666;
      span {
        padding: px2rem(2) px2rem(4);
        color: #fff;
        background: #f1a95d;
        border-radius: 10%;
      }
    }
  }
  .limit {
    border-bottom: 1px solid #ccc;
    p {
      margin: 0 px2rem(9);
      font-size: px2rem(14);
      color: #666;
      span:nth-of-type(1) {
        padding: px2rem(2) px2rem(4);
        color: #fff;
        background: #f1a95d;
        border-radius: 10%;
        margin-right: px2rem(6);
        margin-top: px2rem(10);
      }
      span:nth-of-type(2) {
        line-height: px2rem(44);
      }
      span:nth-of-type(3) {
        line-height: px2rem(44);
      }
    }
  }
}
.ticket {
  ul {
    li {
      @include rect(100%, px2rem(68));
      padding: 0 px2rem(15);
      @include flexbox();
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      .time {
        width: px2rem(130);
        font-size: px2rem(8);
        @include flexbox();
        align-items: center;
        justify-content: space-between;
        p {
          @include flexbox();
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        p:nth-of-type(1) {
          span:nth-of-type(1) {
            font-size: px2rem(16);
            color: #000;
            font-weight: 800;
          }
        }
        p:nth-of-type(2) {
          span:nth-of-type(1) {
            color: #000;
          }
        }
      }
      .price {
        width: px2rem(150);
        @include flexbox();
        align-items: center;
        justify-content: space-between;
        p {
          @include flexbox();
          align-items: center;
          justify-content: center;
          flex-direction: column;
          span:nth-of-type(1) {
            color: #ec5b68;
            font-weight: 800;
            i {
              font-size: px2rem(18);
            }
          }
          del {
           text-decoration:line-through;
          }
        }
        .buy {
          padding: px2rem(6) px2rem(10);
          color: #ec5b68;
          border: 1px solid #ec5b68;
          border-radius: 1232px;
        }
      }
    }
  }
}
.banner {
    .swiper-slide {
        img {
            @include rect (100%,px2rem(130));
        }
    }
}
</style>
