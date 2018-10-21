<template>
  <div class="mainbody">
    <div class="head">
      <p>
        <span class="iconfont icon-prev1" @click="goto()"></span>
        <span>{{movieName}}</span>
        <span class="clo iconfont icon-icon-edit"></span>
      </p>
    </div>
    <div class="time">
      <p>传奇的诞生</p>
      <p>今天&nbsp;&nbsp;09-08&nbsp;&nbsp;16:55&nbsp;&nbsp;(英语2D)</p>
    </div>
    <div class="select">
      <ul>
        <li>
          <i class="iconfont icon-kexuanzuobiankuang"></i>
          &nbsp; 可选
        </li>
        <li>
          <i class="iconfont icon-kexuanzuobiankuang"></i>
          &nbsp;已售
        </li>
        <li>
          <i></i>
          &nbsp;最佳观影区
        </li>
      </ul>
    </div>
    <div class="seat">
      <div class="heads tc">
        <p class="tc">1号厅&nbsp;&nbsp;银幕</p>
      </div>
      <div class="down">
        <i class="iconfont icon-kexuanzuobiankuang" :class="{'hide':!item.show,'active':item.active}" v-for="(item,index) of list" :key="index" @click="select(item)"></i>
      </div>
      <div class="logo tc">
        <img src="/static/images/i_03.jpg" alt="">
      </div>
      <div class="position">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
      </div>
      <div class="dashed"></div>
      <div class="better"></div>
    </div>
    <div class="referee">
      <div class="unselected" v-if="selectList.length == 0">
        <p>推荐座位&nbsp;&nbsp;&nbsp;&nbsp;
          <span>1人</span>
          <span>2人</span>
          <span>3人</span>
          <span>4人</span>
          <span>5人</span>
        </p>
      </div>
      <div v-else class="selected">
        <p v-for="(item,index) of selectList" :key="index">
          <span>
            {{item[0]}}排{{item[1]}}列
          </span>
          <span class="money">{{price}}元</span>
          <i class="close" @click="remove(item,index)">x</i>
        </p>
      </div>
    </div>
    <div class="fixed tc" v-if="selectList.length == 0">
      请先选座
    </div>
    <div class="fixed tc" v-else @click="buy()">
      <span>{{getPrece}}元</span> 确认选座
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      price: 45,
      list: [],
      selectList: [], //选中的座位数组
      movieName: ""
    };
  },
  computed: {
    getPrece() {
      return this.price * this.selectList.length;
    }
  },
  methods: {
    getdata() {
      const num = 12;
      console.log(this.selectList)
      for (var i = 1; i < 98; i++) {
        let obj = {
          show: true,
          active: false,
          order: []
        };
        let hideArr = [11, 12, 23, 24, 61, 62, 73, 74];
        hideArr.map(item => {
          if (item == i) {
            obj.show = false;
          }
        });
        const row = 1 + Math.floor(i / num);
        const col = i % num;
        obj.order = [row, col];
        this.selectList.map((item, index) => {
          if (item[0] == row && item[1] == col) {
            obj.active = true;
          }
        });
        this.list.push(obj);
      }
    },
    select(item) {
      if (!item.show) return;
      if (this.selectList.length >= 4) {
        Toast({
          message: "亲！最多只能选4个座位哦！",
          position: "center",
          duration: 3000
        });
        return;
      }
      if (item.active) {

        this.selectList.map((select, index) => {
          console.log(item)
          if (select[0] == item.order[0]  && select[1] == item.order[1]
) {
            this.selectList.splice(index, 1);
          }
        });
      } else {
        this.selectList.push(item.order);
      }
      item.active = !item.active;
    },
    remove(item, index) {
      console.log(item)
      this.selectList.splice(index, 1);
      this.list.map((seat, index) => {
        console.log(seat)
        if (seat.order[0] == item[0]  && seat.order[1] == item[1]) {
          seat.active = !seat.active;
        }
      });
    },
    buy() {
      localStorage.setItem("buyTime", new Date().getTime());
      localStorage.setItem("ticketNum", JSON.stringify(this.selectList));

      this.$router.push({
        name: "shoppingcart",
        query: {
          total: this.getPrece,
          num: this.selectList.length
        }
      });
    },
    goto() {
      this.$router.back();
    },
    getlist() {
      const data = this.$route.query.id;
      this.movieName = data;
    }
  },

  mounted() {
    let val = JSON.parse(localStorage.getItem("ticketNum"));
    val = val ? val : [];
    console.log(this.selectList);
    this.selectList = val;
    console.log(this.selectList);
    this.getdata();
    this.getlist();
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
      font-size: px2rem(18);
      font-weight: bold;
      color: rgb(19, 18, 18);
      &.clo {
        color: #ec5b68;
      }
    }
  }
}
.time {
  margin-left: px2rem(15);
  padding: px2rem(14) 0;
  border-bottom: 1px solid rgb(216, 201, 201);
  p {
    line-height: px2rem(25);
  }
  p:nth-of-type(1) {
    font-size: px2rem(18);
    color: #000;
    font-weight: 500;
  }
  p:nth-of-type(2) {
    font-size: px2rem(14);
    color: #7e7e7e;
  }
}
.select {
  @include rect(100%, px2rem(36));
  border-bottom: 1px solid rgb(204, 201, 201);
  @include flexbox();
  align-items: center;
  justify-content: center;
  ul {
    @include rect(px2rem(200), px2rem(36));
    @include flexbox();
    align-items: center;
    justify-content: space-between;
    li:nth-of-type(2) {
      i {
        background: #e15241;
      }
    }
    li:nth-of-type(3) {
      i {
        padding: px2rem(2) px2rem(6);
        border: 1px dashed #e15241;
      }
    }
  }
}
.seat {
  background: #f7f7f7;
  position: relative;
  border-bottom: 1px solid rgb(204, 201, 201);
  .heads {
    position: relative;
    @include rect(100%, px2rem(22));
    p {
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -(px2rem(75));
      background: #e2e2e2;
      width: px2rem(150);
      line-height: px2rem(22);
    }
  }
  .down {
    position: relative;
    z-index: 1;
    overflow-x: auto;
    @include rect(100%, auto);
    padding: px2rem(20) 0 px2rem(10) px2rem(6);
    @include flexbox();
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    i {
      //   width: px2rem(30);
      flex: 8%;
      font-size: px2rem(24);
      &.hide {
        opacity: 0;
      }
      &.active {
        color: #f3230c;
      }
    }
  }
  .logo {
    img {
      width: px2rem(60);
      margin-bottom: px2rem(10);
    }
  }
  .position {
    position: absolute;
    left: px2rem(10);
    top: px2rem(40);
    @include rect(px2rem(16), px2rem(325));
    background: rgba($color: #5f5c5c, $alpha: 0.3);
    @include flexbox();
    align-items: center;
    justify-content: space-around;
    align-self: auto;
    flex-direction: column;
    border-radius: 343545px;
    p {
      color: #fff;
    }
  }
  .dashed {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 85%;
    width: 1px;
    border: 1px dashed #03ccbb;
  }
  .better {
    @include rect(px2rem(190), px2rem(110));
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px dashed #f12536;
  }
}
.referee {
  width: 100%;
  overflow-x: auto;
  .selected {
    @include rect(100%, auto);
    padding: px2rem(10);
    display: flex;
    // justify-content: space-around;
    p {
      position: relative;
      width: 22%;
      padding: px2rem(4) px2rem(6);
      border: 1px solid rgb(85, 83, 83);
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: px2rem(10);
      &:last-child {
        margin-right: 0;
      }
      .close {
        position: absolute;
        right: px2rem(6);
        top: 50%;
        transform: translateY(-50%);
      }
      .money {
        color: #f3230c;
      }
    }
  }
  .unselected {
    p {
      @include rect(100%, px2rem(50));
      overflow-x: auto;
      padding: 0 px2rem(30);
      line-height: px2rem(50);
      font-size: px2rem(12);

      span {
        padding: px2rem(4) px2rem(6);
        border: 1px solid rgb(85, 83, 83);
        border-radius: 4px;
        margin-right: px2rem(6);
        color: rgb(19, 18, 18);
      }
    }
  }
}
.fixed {
  position: fixed;
  bottom: 0;
  @include rect(100%, px2rem(45));
  background: rgba($color: #b32424, $alpha: 0.7);
  color: #fff;
  line-height: px2rem(45);
  font-size: px2rem(16);
}
</style>
