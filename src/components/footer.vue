<template>
    <div class="footer">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <i class="iconfont" :class="item.icon"></i>
          <router-link :to="item.path">{{item.name}}</router-link>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
    data(){
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
                name:'演出',
                path:'/show',
                icon:'icon-music'
            },{
                name:'我的',
                path:'/user',
                icon:'icon-taobao'
            }]
        }
    }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
.footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 90px;
  background: #F90;

}

.footer ul{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
}   

.footer li{

    list-style: none;
    
}

.footer a{
    color: #fff;
 }

 .footer a.router-link-active{
   color: #03ccbb;
 }
</style>
