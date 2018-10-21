<template>
  <ul >
    <li v-for="(item, index) of list" :key = "index">
      <router-link :to="item.path">     
      <i class="iconfont" :class="item.icon"></i>
      {{item.name}} 
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  data () {
    return {
      list:[{
                name:'首页',
                path:'/home',
                icon:'icon-shouye'
            },{
                name:'电影',
                path:'/movie',
                icon:'icon-dianying'
            },{
                name:'视频',
                path:'/video',
                icon:'icon-shipin'
            },{
                name:'我的',
                path:'/user',
                icon:'icon-taobao'
            }]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/lib/reset.scss';
@import '@/assets/scss/px2rem.scss';
ul {
  @include flexbox();
  li {
    @include flex();
    @include rect(auto, 100%);
    @include flexbox();
    @include flex-direction(column);
    @include justify-content();
    @include align-items();
     a {
      @include text-color(#777);
      @include flexbox();
      @include flex-direction(column);
      @include justify-content();
      @include align-items();
      font-size: px2rem(8);
      .iconfont{
        font-size: px2rem(16);
      }

      &.router-link-active {
        @include text-color(#e9626e);
      
      }
     
     }
  }
}
</style>

