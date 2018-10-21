<template>
    <div class="choose-city">
        <div class="choice">
            <p class="tc" @click="close()">
                选择城市
                <i class="tr iconfont icon-shanchudelete30"> </i>
            </p>
        </div>
        <div class="group mtop">
            <div class="title">当前</div>
            <ul class="list">
                <li>{{city}}</li>
            </ul>
        </div>
         <div class="group">
            <div class="title">GPS</div>
            <ul class="list">
                <li>{{city}}</li>
            </ul>
        </div>
        <div class="cityList">
            <div class="title">热门</div>
            <ul class="list" >
                <li v-for="(item,index) of hotCity" :key="index" @click="selectCity(item.city)">{{item.city}}</li>
            </ul>
        </div>
         <div class="cityList" v-for="(value,key) of cityList" :key="key" >
            <div class="title" >{{key}}</div>
            <ul class="list" >
                <li v-for="(items,index) of value" :key="index" @click="selectCity(items.regionName)">{{items.regionName}}</li>
            </ul>
        </div>


    </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      hotCity: [
        { city: "北京" },
        { city: "上海" },
        { city: "深圳" },
        { city: "广州" },
        { city: "成都" },
        { city: "武汉" },
        { city: "杭州" },
        { city: "重庆" }
      ],
      cityList:{},
      city:"未选择城市..."
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
     getData () {
           axios.get('http://localhost:3000/home')
            .then(res => {               
              this.cityList = res.data;
            })
            .catch(err => {
                console.log(err)
            })
      },
      selectCity (city) {
        console.log(city)
        localStorage.setItem("city",city);
        this.city=city;
        this.$emit("selectCity",{city});
      },
      location () {
        this.city = localStorage.getItem("city");
      }

  },
  mounted () {
      this.getData();
      this.location();

  }
};
</script>

<style lang="scss" scoped>
@import "@/lib/reset.scss";
@import "@/assets/scss/px2rem.scss";
.choose-city {
  position: fixed;
  top: 0;
  z-index: 1111;
  background: white;
  @include rect(100%, 100%);
  overflow-y: auto;
  .choice {
      position: fixed;
      top: 0;
      background: white;
      @include rect(100%, px2rem(42));
    p {
      @include rect(100%, px2rem(42));
      @include line-height(px2rem(42));
      position: relative;
      i{
        position: absolute;
        right: px2rem(16);
        
      }
    }
  }
  .group {
    @include text-color(#777);
    
    .title {
      @include rect(100%, px2rem(36));
      @include line-height(px2rem(36));
      @include background-color(#eee);
      @include padding(0 0 0 px2rem(12));
    }
    .list {
      li {
        @include rect(100%, px2rem(46));
        @include line-height(px2rem(46));
        @include padding(0 0 0 px2rem(16));
      }
    }
  }
  .mtop {
      margin-top: px2rem(48);
  }
  .cityList {
    @include text-color(#777);
     
    .title {
      @include rect(100%, px2rem(36));
      @include line-height(px2rem(36));
      @include background-color(#eee);
      @include padding(0 0 0 px2rem(12));
    }
    .list {
      li {
        @include rect(100%, px2rem(46));
        @include line-height(px2rem(46));
        @include margin(0 0 0 px2rem(16));
        border-bottom: 1px solid #ccc;

      }
      &:last-child {
          border-bottom:none;

      }
    }
  }
}
</style>
