<template>
    <div class="header">
      <div class="location">
        <img src="/static/image/logo.jpg" alt="">
        <p @click="type=1">{{city}}</p>
        <i class="iconfont icon-xiala"></i>
      </div>
      <div class="nav">
         <router-link to="/home/hot">
          <p class="tc ">正在热映</p>
         </router-link>
        <router-link to="/home/will">
        <p class="tc">
         即将上映
        </p>
        </router-link>
      </div>
       <v-city v-if="type==1" @close="type=0" @selectCity="selectCity"></v-city>
    </div>
   
</template>

<script>
import chooseCity from '@/components/chooseCity'
export default {
  data() {
    return {
      type:0,
      city:"定位中"
    }
  },
components:{
  'v-city': chooseCity
},
methods: {
  location () {
    this.city = localStorage.getItem("city");
  },
  selectCity(city){
    this.city = city.city;
  }
},
mounted () {
  this.location();
}
}
</script>

<style lang="scss" scoped>
@import "@/lib/reset.scss";
@import "@/assets/scss/px2rem.scss";
.header {
    position: fixed;
    top:0;
    background: #fff;
    z-index:1111;
    @include text-color(#777);
    @include rect(100%, px2rem(30));
    //  background: #49558c;
    @include flexbox();
    .location {
      @include rect(px2rem(76), 100%);
      @include flexbox();
      @include justify-content();
      @include align-items();
      margin-right: px2rem(76);
      img {
        width: px2rem(26);
      }
    }
    .nav {
       @include flexbox();

      .router-link-active {
          p {
            @include text-color(#e9626e);  
             border-bottom: 2px solid  #e9626e;  
          }
              
      }
       p {
         width: px2rem(86);
         line-height: px2rem(28);
         color: #666;
         
       }
    }
}

</style>
