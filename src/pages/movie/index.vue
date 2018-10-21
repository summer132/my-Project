<template>
    <div class="wrap">
        <div class="header">
         <div class="location" @click="type = 1">
            <img src="/static/image/logo.jpg" alt="">
            <p>{{city}}</p>
            <i i class="iconfont icon-xiala"></i>
         </div>
         <ul class="nav">
             <li @click="changeHead(2)" :class="{'active':type == 2}">{{headData.eara}}<i></i></li>
             <li @click="changeHead(3)" :class="{'active':type == 3}">{{headData.closer}}<i></i></li>
             <li @click="changeHead(4)" :class="{'active':type == 4}">{{headData.special}}<i></i></li>
             <li><i class="iconfont icon-sousuo"></i></li>
         </ul>
         
        </div>
        <div class="list">
           <ul>
               <router-link :to="{name: 'cart', query: { cinemaId: item.cinemaId }}" tag="li" v-for="(item,index) of cinamaList" :key="index">
                   <div class="info">
                       <h2>{{item.cinemaName}}</h2>
                       <p>{{item.address}}</p>
                       <p class="selction" >
                         <span v-for="(item,index) of item.displaySupports" :key="index">{{item}}</span>
                         <!-- <span>观影小食</span><span>可停车</span><span>巨幕厅</span><span>杜比厅</span><span>IMAX厅</span> -->
                         </p>
                       <P class="new" v-for="(item,index) of item.activityTags" :key="index"><I></I>{{item.title}}</P>
                   </div>
                   <div class="price">
                       <p><em>37.7</em><strong>元</strong>起</p>
                       <p>{{item.scheduleCloseTime}}&nbsp;&nbsp;Km</p>
                   </div>

               </router-link >   
           </ul> 
        </div>

        <div class="eara shadow" v-if="type == 2" @click="type = 0">
             <ol @click.stop="">
                 <li v-for='(item,index) of eareList' :key='index' @click="chooseEare(item)" :class="{'active':item.active}">{{item.name}}</li>
             </ol>
         </div>
         <div class="closer shadow" v-if="type == 3" @click="type = 0">
             <p v-for='(item,index) of closerData' :key='index' :class="{active:item.active}" @click.stop="select(item)">{{item.closer}}</p>
         </div>
          <div class="eara shadow" v-if="type ==4" @click="type = 0">
             <ol @click.stop="">
                 <li v-for='(item,index) of specialList' :key='index' @click="chooseSpecial(item)" :class="{'active':item.active}">{{item.name}}</li>
             </ol>
         </div>
        <choose-city v-if="type == 1" @close="close()"></choose-city>
    </div>
 
</template>

<script>
import chooseCity from "@/components/chooseCity";
import axios from 'axios'
export default {
  components: {
    "choose-city": chooseCity
  },
  data() {
    return {
      type: 0,
      headData: {
        eara: "区域",
        closer: "离我最近",
        special: "特色"
      },
      closerData: [
        {
          closer: "离我最近",
          active: true
        },
        {
          closer: "价格最低",
          active: false
        }
      ],
      eareList: [
        {
          name: "不限区域",
          active: true
        },
        {
          name: "保安区",
          active: false
        },
        {
          name: "南山区",
          active: false
        },
        {
          name: "福田区",
          active: false
        },
        {
          name: "龙华区",
          active: false
        }
      ],
      specialList: [
        {
          name: "不限特色",
          active: true
        },
        {
          name: "退票",
          active: false
        },
        {
          name: "改签",
          active: false
        },
        {
          name: "观影小食",
          active: false
        },
        {
          name: "IMAX厅",
          active: false
        }
      ],
      city:"定位",
      cinamaList:{}
    };
  },
  methods: {
    close() {
      this.type = 0;
    },
    location () {//城市定位显示
    this.city = localStorage.getItem("city");
    },
    changeHead(type) {
      if (this.type == type) {
        this.type = this.type == 0 ? type : 0;
      } else {
        this.type = type;
      }
    },
    chooseEare(eare) {
      this.eareList.map(item => (item.active = false));
      eare.active = true;
      this.headData.eara = eare.name;
      this.type = 0;
    },
    select(data) {
      this.closerData.map(item => (item.active = false));
      data.active = true;
      this.headData.closer = data.closer;
      this.type = 0;
    },
    chooseSpecial(special) {
      this.specialList.map(item => (item.active = false));
      special.active = true;
      this.headData.special = special.name;
      this.type = 0;
    },
     getData () {
           axios.get('http://localhost:3000/closer')
            .then(res => {
            
              this.cinamaList = res.data;
           console.log(this.cinamaList)
            })
            .catch(err => {
                console.log(err)
            })
      }

  },
  mounted () {
    this.location (),
    this.getData()

  }
};
</script>

<style lang="scss" scoped>
@import "@/lib/reset.scss";
@import "@/assets/scss/px2rem.scss";

$header-height: px2rem(30);
.header {
  @include text-color(#777);
  @include rect(100%, $header-height);
  padding: 0 px2rem(8);
  position: fixed;
  top: 0;
  background: white;
  //  background: #49558c;
  @include flexbox();
  .location {
  
    @include rect(px2rem(100), 100%);
    @include flexbox();
    //   @include justify-content();

    @include align-items();
    img {
      width: px2rem(26);
    }
  }
  .nav {


    width: px2rem(260);
    @include flexbox();
    justify-content: space-between;
    align-items: center;
    li {
      flex: 1;
      @include flexbox();
      @include justify-content();
      color: #666;
      border-right: 1px solid #666;
      &:first-child {
        border-left: 1px solid #666;
      }
      &:last-child {
        width: px2rem(40);
        flex: 0.5;
        border-right: none;
      }
      &.active {
        color: #ff5b77;
      }
    }
  }
}
.eara {
   
  ol {
    @include flexbox();
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: px2rem(10);
    background: #fff;
    li {
      // padding: px2rem(4) px2rem(6);
      width: 23%;
      height: px2rem(30);
      border: 1px solid #ccc;
      //  flex:20%;
      margin-bottom: px2rem(8);
      @include flexbox();
      align-items: center;
      justify-content: center;
      &.active {
        border-color: #ff5b77;
        color: #ff5b77;
      }
    }
  }
}
.closer {
  p {
    @include rect(100%, px2rem(36));
    @include line-height(px2rem(36));
    padding-left: px2rem(16);
    background: white;
    border-bottom: 1px solid #ccc;
    &:last-child {
      border-bottom: none;
    }
    &.active {
      color: #ff5b77;
    }
  }
}
.list {
   margin-top: px2rem(20);
  ul {
    li {
      @include flexbox();
      padding: px2rem(20) px2rem(16) 0 px2rem(16);
      p {
        color: #666;
        font-size: px2rem(14);
      }
      .info {
        margin-right: px2rem(6);
        width: px2rem(278);
        h2{
             font-size: px2rem(18);
        }
        p {
          span {
            padding: px2rem(2) px2rem(4);
            margin-right: px2rem(4);
            border: 1px solid #2a80b9;
            color: #2a80b9;
          }
        }
        .selction {
            margin: px2rem(4) 0;
             @include ellipsis (100%,1);
        }
      }
      .price {
          p{
              em {
                  color: #ff5b77;
                  font-size: px2rem(20);
              }
              strong {
                  color: #ff5b77;
              }
          }
      }

    }
  }
}
.shadow {
  @include rect(100%, 100%);
  position: absolute;
  top: $header-height;
  background: rgba(0, 0, 0, 0.2);
}
</style>

