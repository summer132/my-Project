<template>
<div class="box">
     <div class="date">
         <p>2018-08-09&nbsp;&nbsp;后天</p>
     </div>
    <div class="content-coming">
     <ul>
       <li >
         <img  src="https://gw.alicdn.com/i2/TB18km8tHZnBKNjSZFhXXc.oXXa_.jpg_160x160Q30s100.jpg" alt="">
         <div class="detail">
           <h3 class="title">碟中谍6:全面瓦解 <span>3D</span><span>IMAX</span></h3>
           <p> <span>454665</span>人想看</p>
           <p>主演:<span>汤姆</span></p>
           <p>导演:<span>汤姆</span></p>         
         </div>
         <div class="buy">
           <p>预售</p>
         </div>
       </li>
     </ul>
      </div>
     <div class="date">
         <p>2018-08-09&nbsp;&nbsp;后天</p>
     </div>
         <div class="content-coming">
     <ul>
       <li v-for="(item,index) of comingList.data" :key="index">
         <img  :src="'https://gw.alicdn.com/'+item.poster" alt="">
         <div class="detail">
           <h3 class="title">{{item.showName}} <span>3D</span><span>IMAX</span></h3>
           <p> <span>{{item.wantCount}}</span>人想看</p>
           <p  class="main-actor"><span>主演: {{item.leadingRole || item.type}}</span></p>
           <p class="director"><span>导演:{{   item.director || item.type}}</span></p>         
         </div>
         <div class="buy">
           <p>预售</p>
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
      comingList: {}
    };
  },
  methods: {
    getData() {
      axios
        .get("http://localhost:3000/homecoming")
        .then(res => {
          console.log(res);
          this.comingList = res;
          console.log(this.comingList);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
@import "@/lib/reset.scss";
@import "@/assets/scss/px2rem.scss";
.box {
margin-top: px2rem(30);

.date {
  @include rect(100%, px2rem(40));
  background: #f5f5f5;
  p {
    @include rect(100%, px2rem(40));

    margin-left: px2rem(20);
    line-height: px2rem(40);
  }
}
.content-coming {
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
          @include ellipsis (100%,1);
        }
        .director{
           @include ellipsis (100%,1);
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
      }
      .buy {
        @include flexbox();
        flex-direction: column;
        height: px2rem(94);
        align-items: center;
        justify-content: center;
        p {
          //  @include rect(px2rem(50), px2rem(25));
          padding: px2rem(8) px2rem(16);
          border-radius: 1000px;
          background: linear-gradient(right,rgb(163, 169, 224),rgb(63, 85, 128));
          color: aliceblue;
        }
        div {
          color: #666;
        }
      }
    }
  }
}
}
</style>

