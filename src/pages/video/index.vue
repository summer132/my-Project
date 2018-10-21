<template>   
 <div class="wrapper">
  <div class="header">
            <ul>
                 
                <router-link v-for="(item,index) of headerList" :key="index"  to="/video/shiping" tag="li">
                    {{item.title}}
                </router-link>
                
            </ul>
 
 </div>
 <router-view></router-view>
 </div>
</template>

<script>
export default {
  data() {
    return {
      headerList: [
        { title: "推荐" },
        { title: "速看" },
        { title: "新片上映" },
        { title: "综艺" },
        { title: "搞笑" },
        { title: "电视剧" }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/lib/reset.scss";
@import "@/assets/scss/px2rem.scss";
.header {
  @include rect(100%, px2rem(48));
  background: linear-gradient(left, #e1a1e4, #af0ab8);
  position: fixed;
  top: 0;
  z-index: 111;
  ul {
    padding: px2rem(10) 0;
    @include flexbox();
    justify-content: space-around;
    align-items: center;
    overflow-x: auto;
   
    li {
      // width: px2rem(80);
      //   margin-right: px2rem(10);
      line-height: px2rem(28);
      color: #ccc;
      font-size: px2rem(14);
      // &.router-link-active {
      //   @include text-color(#f1e4e5);
      //   border-bottom: 2px solid #f1e4e5;
      // }
    }
  }
}
</style>


