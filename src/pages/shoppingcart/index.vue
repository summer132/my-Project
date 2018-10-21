<template>
  <div class="shopping">
    <div class="head">
      <div class="top">
        <i class="iconfont icon-prev" @click="$router.back()"></i>
        <span v-if="type==true" class="iconfont icon-aixin">{{formatDate}}</span>
      </div>
      <div class="info">
        <h1>阿尔法·狼伴归途
          <span>{{num}}张</span>
        </h1>
        <p>今天09-09&nbsp;&nbsp;22:00-23:56&nbsp;&nbsp;(英语3D)</p>
        <p>深圳中影汇星激光影院（西丽店）</p>
        <p>3号激光厅&nbsp;&nbsp;3排6座</p>
      </div>
    </div>
    <div class="list">
      <div class="mains item">
        <i>特惠活动</i>
        <div class="select">
          <span>-{{sellPrice}}元</span>
          <mt-switch v-model="sellFlag" @change="changeSell"></mt-switch>
        </div>
      </div>
      <div class="movie item">
        <i>电影代金券</i>
        <span>无代金券</span>
      </div>
      <div class="count item">
        <i>票价总价</i>
        <span>{{getPrice}}元</span>
      </div>
    </div>
    <div class="phone">
      <p>
        <span>手机号</span>
        <i>购票成功后，会收到取票码短信</i>
      </p>
      <p>
        {{phone}}&nbsp;&nbsp;
        <i class="iconfont icon-dd-copy"></i>
      </p>
    </div>
    <div class="note">
      <h2>购票须知</h2>
      <p>
        <span>1.</span> 请确认场次和时间无误，购买成功后将不予退还</p>
      <p>
        <span>2.</span>由于设备故障等不可抗力因素，存在少量场次取消的情况，会进行退票退款。</p>
      <p>
        <span>3.</span>由于影院系统不稳定等因素，存在出票失败的情况，会进行退款</p>
      <p>
        <span>4.</span>购票成功后，会收到取票码短信</p>
      <p>
        <span>5.</span>下单即代表你同意
        <a href="#">
          <<淘票票用户服务协议>></a>
      </p>
    </div>
    <div class="buy">
      <i>不支持退票、改签</i>
      <p>应付
        <span class="money
                ">{{total}}元</span>
      </p>
    </div>

    <div class="foot" @click="pay()">
      立即付款
    </div>
  </div>
</template>

<script>
import { Switch } from "mint-ui";
import { Toast } from "mint-ui";
import { Icon } from "mint-ui";
export default {
  data() {
    return {
      total: 0,
      num: 0,
      sellPrice: 0.1,
      sellFlag: false,
      overTime: "",
      time: "",
      type:true,
      phone:""
    };
  },
  computed: {
    getPrice() {
      return (this.total / this.num).toFixed(2);
    },
    formatDate() {
      // 剩余分钟
      let min = Math.floor(this.overTime / 60);
      // 剩余秒
      let sec = Math.floor(this.overTime % 60);
     
      min = min > 9 ? min : "0" + min;
      min = min <= 0 ? "0"+"0" : min;
      sec = sec > 9 ? sec : "0" + sec;
      sec = sec <= 0 ? "0"+"0"  : sec;
      
      return min + ":" + sec;
    }
  },
  methods: {
    changeSell() {
      if (this.sellFlag) {
        this.total = this.total - this.sellPrice;
      } else {
        this.total = this.$route.query.total;
      }
    },
    pay() {
       clearInterval(this.time);
       localStorage.removeItem("ticketNum");
       this.type=false;
      Toast({
        message: "付款成功",
        iconClass: "iconfont icon-aixin"
      });
    },
    over() {
      Toast({
        message: "订单超时，请重新购买",
        duration: 4000
      });
    
      this.$router.back();
    }
  },
  created() {
    this.phone = localStorage.getItem("username");
    this.total = this.$route.query.total;
    this.num = this.$route.query.num;

    let time = localStorage.getItem("buyTime") * 1;
    let now = new Date().getTime();

    this.overTime = (15 * 60 * 1000 + time - now) / 1000;

    if (this.overTime <= 0) {
      this.over();
    } else {
      this.time = setInterval(() => {
        this.overTime--;
        if (this.overTime <= 0) {
          clearInterval(this.time);
          localStorage.removeItem("buyTime");
            localStorage.removeItem("ticketNum");
          this.over();
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/lib/reset.scss";
@import "@/assets/scss/px2rem.scss";
.shopping {
  @include rect(100%, 100%);
  overflow-y: auto;
}
.head {
  @include rect(100%, px2rem(172));
  background: #8f9ab4;
  padding: px2rem(14) px2rem(20);
  color: #fff;
  position: fixed;
  top: 0;
  z-index: 9999999999999999;
  .top {
    font-size: px2rem(16);
    @include flexbox();
    align-items: center;
    justify-content: space-between;
    span {
      padding: px2rem(4) px2rem(20);
      background: rgba($color: #5e5b5b, $alpha: 0.3);
      border-radius:12323px;
    }
  }
  .info {
    margin-top: px2rem(16);
    margin-left: px2rem(10);
    h1 {
      font-size: px2rem(20);
      margin-bottom: px2rem(10);
      span {
        font-size: px2rem(12);
        margin-left: px2rem(6);
      }
    }
    p {
      line-height: px2rem(20);
      letter-spacing: 2px;
    }
  }
}

.list {
  padding: 0 px2rem(18);
  margin-top: px2rem(172);
  z-index: 123456;
  .item {
    @include flexbox();
    height: px2rem(48);
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    &:last-child {
      border-bottom: none;
    }
    i {
      font-size: px2rem(16);
      color: #000;
    }
  }
  .mains {
    .select {
      @include flexbox();
      align-items: center;
      justify-content: space-between;
      span {
        margin-right: px2rem(6);
        color: #ec5b68;
      }
    }
  }
  .movie {
    span {
      font-size: px2rem(14);
      color: #ccc;
    }
  }
  .count {
    span {
      font-size: px2rem(14);
      color: #ec5b68;
    }
  }
}
.phone {
  border-top: 14px solid #f5f5f5;
  border-bottom: 14px solid #f5f5f5;
  @include flexbox();
  height: px2rem(100);
  align-items: center;
  justify-content: space-between;
  padding: 0 px2rem(18);
  p {
    font-size: px2rem(16);
    color: #000;
    i {
      font-size: px2rem(12);
      color: #ccc;
    }
  }
  p:nth-of-type(1) {
    @include flexbox();
    justify-content: space-between;
    flex-direction: column;
  }
}
.note {
  padding: 0 px2rem(18);
  h2 {
    height: px2rem(46);
    font-size: px2rem(16);
    line-height: px2rem(46);
    border-bottom: 1px solid #ccc;
  }
  p {
    font-size: px2rem(14);
    line-height: px2rem(26);
    color: #cbcbcb;
    text-indent: 2px;
    display: flex;
    &:nth-of-type(1) {
      margin-top: px2rem(26);
    }
    &:nth-of-type(5) {
      margin-bottom: px2rem(16);
    }
    span {
      margin-right: px2rem(10);
    }
  }
}
.buy {
  @include flexbox();
  height: px2rem(100);
  margin-bottom: px2rem(55);
  align-items: center;
  justify-content: space-between;
  padding: 0 px2rem(18);
  border-top: 14px solid #f5f5f5;
  .money {
    color: #ed6c78;
    font-size: 18px;
  }
}
.foot {
  @include rect(100%, px2rem(50));
  letter-spacing: 2px;
  position: fixed;
  bottom: 0;
  @include flexbox();
  justify-content: center;
  align-items: center;
  background: linear-gradient(left, #ef89a0, #ec5f6d);
  color: #fff;
  font-size: 18px;
}
</style>
