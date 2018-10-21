<template>
  <div class="detail">
    <div class="head">
      <div class="setup">
        <i class="iconfont icon-prev fl" @click="goBack"></i>
        <i class="iconfont icon-tishi fr"></i>
      </div>
      <div class="info">
        <div class="moviedetail">
          <h3 class="title">{{detailList.showName}}</h3>
          <p class="eng">{{detailList.director}}</p>
          <!-- <p class="main-actor">动作&nbsp;&nbsp;/&nbsp;&nbsp; 冒险&nbsp;&nbsp;/&nbsp;&nbsp;惊悚</p> -->
          <p class="main-actor">
            <span v-for="(item,index) of detailList.type" :key="index">{{item}}</span>
          </p>
          <p class="director">
            <span>{{detailList.country}}</span>&nbsp;&nbsp;
            <span>{{detailList.duration}}分钟</span>
          </p>
          <p class="director">{{detailList.openTime}}在{{detailList.country}}上映</p>

        </div>
        <img :src="'https://gw.alicdn.com/'+detailList.poster" alt="" />
      </div>
    </div>
    <div class="recommend">
      <ul>
        <li>
          <p>
            <span>9.0</span>
            <i class="iconfont icon-jingdiananli_kongwujiaoxing_shoucang" :class="item.state ? 'changc' : '' " v-for="(item,index) of list" :key="
            index" @click="changeColor(item,index)"></i>
          </p>
          <p>观众评分485,438人</p>
        </li>
        <li>
          <p class="big">81%</p>
          <p>V推荐度</p>
        </li>
        <li>
          <p class="big">{{detailList.wantCount}}</p>
          <p>想看人数</p>
        </li>
      </ul>
      <div class="watch">
        <p :class="{'active':type==true,'default':type==false}" @click="type=!type">
          <i class="iconfont icon-aixin"></i>想看</p>
        <p :class="type1 ? 'active' : 'default' " @click="type1=!type1">
          <i class="iconfont icon-star"></i>看过</p>
      </div>
    </div>
    <div class="introduce">
      <p :class="{'hidden': state==0}">
        "有马特达蒙的中国片，还有刘天王，鹿晗，景甜(背后金主无敌，金刚窟窿岛和环太平洋2都有她)，虽然怪物衍然狼人上身个人觉得还不错。揭秘我大中国典型象征长城背后的历史和秘密，看这明星排场和剧情设定，是要海捞粉丝大把票子的节奏啊！首条预告上线看得挺带感，光是传奇和环球厂牌就很令人期待了！这种中国式好莱坞科幻题材很吸睛，听说比海外早2个月上映，真心期待！
      </p>
      <h1 class="tc" v-if="state==0" @click="state=1">展开</h1>
    </div>

    <div class="actor">
      <div class="title">
        演职人员
      </div>
      <ul>
        <li v-for="(item,index) of data" :key="index">
          <img :src="item.img" alt="">
          <p>{{item.name}}</p>
          <p class="tc">{{item.job}}</p>
        </li>
      </ul>
      <div class="all tc">
        全部72位演职人员
      </div>
    </div>
    <div class="stage">
      <div class="title">
        剧照
      </div>
      <div class="picture">
        <img src="/static/banner.jpg" alt="">
        <img src="/static/banner.jpg" alt="">
        <img src="/static/banner.jpg" alt="">
        <img src="/static/banner.jpg" alt="">
      </div>
    </div>
    <div class="remark">
      <div class="write clearfix">
        <h2 class="fl">观众热评</h2>
        <p class="fr">写影评</p>
      </div>
      <div class="mark clearfix">
        <p class="fl">
          <span class="big">9.0</span>
          <span>520,592人评</span>
        </p>
        <img src="/static/images/tag_03.jpg" alt="" class="fr">
      </div>
      <div class="tag">
        <ul :class="{'hide':tatus==false}">
          <li>全部</li>
          <li class="color" :class="{'licolor':color==false}" @click="color=!color">最新</li>
          <li>不老男神阿汤哥 &nbsp;&nbsp;4w+</li>
          <li class="color">高空跳伞惊心动魄&nbsp;&nbsp;1235</li>
          <li :class="{'licolor':color1==false}" @click="color1=!color1">很燃很刺激&nbsp;&nbsp;6839</li>
          <li class="color">好评&nbsp;&nbsp;6w+</li>
          <li>差评&nbsp;&nbsp;1259</li>
          <li class="color">同城&nbsp;&nbsp;2618</li>
        </ul>
        <p class="tc" @click="tatus=!tatus">
          <i class="iconfont" :class="{'icon-xiala':tatus==false,'icon-plus-select-up':tatus==true}"></i>
        </p>
      </div>
    </div>
    <div class="note">
      <ul>
        <li v-for="(item,index) of contentList" :key="index">
          <div class="header clearfix">
            <img src="/static/48.jpg" alt="" class="fl">
            <div class="name fl">
              <p class="names">{{item.nickName}}</p>
              <p class="buy">
                <i>购票</i>
                <span class="iconfont icon-jingdiananli_wujiaoxing_shoucanghou"></span>
                <span class="iconfont icon-jingdiananli_wujiaoxing_shoucanghou"></span>
                <span class="iconfont icon-jingdiananli_wujiaoxing_shoucanghou"></span>
                <span class="iconfont icon-jingdiananli_wujiaoxing_shoucanghou"></span>
                <span class="iconfont icon-jingdiananli_wujiaoxing_shoucanghou"></span>
                <em>{{item.remark}}</em>
              </p>
            </div>
            <h1 class="fr iconfont icon-dd-copy"></h1>
          </div>
          <div class="contents">
            {{item.content}}
          </div>
          <div class="foot clearfix">
            <span class="fl">09-03&nbsp;&nbsp;10:04</span>
            <p class="fr">
              <span class="iconfont icon-dianzan1" @click="count++"></span>{{item.favorCount}}&nbsp;&nbsp;&nbsp;&nbsp;
              <span class="iconfont icon-shuju1"></span>1</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="discuss">
      <div class="write clearfix">
        <h2 class="fl">讨论区</h2>
        <p class="fr">发讨论</p>
      </div>
      <div class="header clearfix">
        <img src="/static/48.jpg" alt="" class="fl">
        <div class="name fl">
          <p class="names">顾大条不要再大条</p>
          <p class="buy">

            <em>08-31&nbsp;&nbsp;16:18</em>
          </p>
        </div>
        <h1 class="fr iconfont icon-dd-copy"></h1>
      </div>
      <div class="contents">
        {{content}}
      </div>
      <div class="foot clearfix">

        <p class="tr">
          <span class="iconfont icon-dianzan1" @click="count++"></span>{{count}}&nbsp;&nbsp;&nbsp;&nbsp;
          <span class="iconfont icon-shuju1"></span>1</p>
      </div>
    </div>
    <div class="bottom">
      <div class="top">
        <p class="vote">票房</p>
        <ul class="order">
          <li>
            <p class="big">1</p>
            <p>今日票房排名</p>
          </li>
          <li>
            <p class="big">53,088</p>
            <p>首周票房(万)</p>
          </li>
          <li>
            <p class="big">70,948</p>
            <p>累计票房(万)</p>
          </li>
        </ul>
        <h4 class="tc">票房详情</h4>
      </div>
      <div class="music">
        <p class="vote">电影原声</p>
        <div class="detail clearfix">
          <div class="song fl">
            <img src="/static/48.jpg" alt="">
            <audio ref="audio" src="/static/song.mp3"></audio>
            <i class="iconfont " :class="isSing ? 'icon-bofang': 'icon-zanting' " @click="sing()"></i>

          </div>

          <div class="info fl">
            <p>Mission:Impossible-Fallo</p>
            <p>专辑·Lorne Balfe·26首歌曲</p>
          </div>
          <i class="fr iconfont icon-next"></i>
        </div>
      </div>
      <div class="movie">
        <h1>影片资料</h1>
        <p class="clearfix">
          <span class="fl">幕后花絮</span>
          <i class="iconfont icon-next fr"></i>
        </p>
        <p class="clearfix">
          <span class="fl">出品发行</span>
          <i class="iconfont icon-next fr"></i>
        </p>
      </div>
    </div>
    <div class="reduce tc">特惠选购</div>
    <!-- <div class="iconfont icon-huidingbu gotop" @click="goTop()" v-if="typet"></div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      type: false,
      type1: false,
      count: "51",
      state: 0,
      tatus: false,
      color: false,
      color1: false,
      typet: false,
      isSing: false,
      list: [
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false }
      ],
      data: [
        {
          img: "/static/IMG_1551.JPG",
          name: "克里托斯克里托斯克里托斯克里托斯克里托斯",
          job: "导演"
        },
        {
          img: "/static/IMG_1551.JPG",
          name: "克里托斯克里托斯克里托斯克里托斯克里托斯",
          job: "导演"
        },
        {
          img: "/static/IMG_1551.JPG",
          name: "克里托斯克里托斯克里托斯克里托斯克里托斯",
          job: "导演"
        },
        {
          img: "/static/IMG_1551.JPG",
          name: "克里托斯克里托斯克里托斯克里托斯克里托斯",
          job: "导演"
        },
        {
          img: "/static/IMG_1551.JPG",
          name: "克里托斯克里托斯克里托斯克里托斯克里托斯",
          job: "导演"
        },
        {
          img: "/static/IMG_1551.JPG",
          name: "克里托斯克里托斯克里托斯克里托斯克里托斯",
          job: "导演"
        },
        {
          img: "/static/IMG_1551.JPG",
          name: "克里托斯克里托斯克里托斯克里托斯克里托斯",
          job: "导演"
        }
      ],
      content:
        "从影片的故事、节奏、画面、色彩、场景布置乃至选角，一部战争片也能这么撼动人心！！！刚中带柔，以柔克刚，梅尔吉布森没有一面地追求战争激烈的场景，而是用了一个多小时的文戏为战场救人铺垫，全程看得血脉偾张，热泪盈眶！信仰以前在我看来就是虚无缥缈的东西，可现在我真的要好好审视一下自己了。",
      contentList: "",
      detailList: {}
    };
  },
  created() {
    this.getdataList();
  },
  updated() {
    this.h = document.getElementsByClassName("detail")[0];

    this.h.addEventListener(
      "scroll",
      () => {
        if (this.h.scrollTop > 200) {
          this.typet = true;
          //  this.backTopShow = true ;
        } else {
          //  this.headerShow  = true;
          this.typet = false;
        }
        if (this.h.scrollTop < 200) {
          this.typet = false;
        } else {
          this.typet = true;
        }
      },
      false
    );
  },
  methods: {
    sing() {
      if (!this.isSing) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
      this.isSing = !this.isSing;
    },
    changeColor(item, index) {
      item.state = !item.state;
      if (item.state == true) {
        for (var i = 0; i < this.list.length; i++) {
          if (i <= index) {
            this.list[i].state = true;
          } else {
            this.list[i].state = false;
          }
        }
      } else {
        for (var i = 0; i < this.list.length; i++) {
          if (i >= index) {
            this.list[i].state = false;
          } else {
            this.list[i].state = true;
          }
        }
      }
    },
    getData() {
      axios
        .get("http://localhost:3000/evaluation")
        .then(res => {
          this.contentList = res.data;
          console.log("999999", this.contentList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    goBack() {
      this.$router.back();
    },
    getdataList() {
      const data = this.$route.query.userId;

      axios
        .get("http://localhost:3000/detaildata?id=" + data)
        .then(res => {
          this.detailList = res.data[0];
        })
        .catch(err => {
          console.log(err);
        });
    },

    goTop() {
      const ele = document.getElementsByClassName("info")[0];
      clearInterval(timer);
      let timer = setInterval(() => {
        if (ele.scrollTop > 0) {
          ele.scrollTop -= 50;
        } else {
          clearInterval(timer);
        }
      }, 10);
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
.detail {
  @include rect(100%, 100%);
  //   padding: px2rem(16);
  overflow-y: auto;
  .head {
    width: 100%;
    background: linear-gradient(left, #f8bac5, #df4a63);
    // position: fixed;
    // top:0;
    // z-index: 11;
    .setup {
      position: fixed;
      top: 0;
      z-index: 11;
      // background: #ee5361;
      background: linear-gradient(left, #f8bac5, #df4a63);
      padding: px2rem(16);
      // margin-top: px2rem(6);
      @include rect(100%, px2rem(40));
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        font-size: px2rem(20);
        color: #fff;
      }
    }
    .info {
      margin-top: px2rem(40);
      @include rect(100%, px2rem(150));
      padding: 0 px2rem(10) 0 px2rem(10);
      @include flexbox();
      img {
        @include rect(px2rem(100), px2rem(150));
      }
      .moviedetail {
        margin: 0 px2rem(40) 0 px2rem(10);
        width: px2rem(200);

        .main-actor {
          @include ellipsis(100%, 1);
        }
        .director {
          @include ellipsis(100%, 1);
        }
        h3 {
          font-size: px2rem(18);

          color: #fff;
        }
        .eng {
          font-size: px2rem(12);
          margin-bottom: px2rem(6);
          @include ellipsis(100%,1);
        }
        p {
          line-height: px2rem(26);
          color: rgb(243, 235, 235);
          font-size: px2rem(14);
        }
      }
    }
  }
  .recommend {
    padding: 0 px2rem(20);
    // margin-top: px2rem(195);
    @include rect(100%, px2rem(130));
    ul {
      @include rect(100%, px2rem(76));
      @include flexbox();
      justify-content: space-between;
      align-items: center;
      li {
        @include flexbox();
        justify-content: space-between;
        align-items: center;
        flex-direction: column;

        .big {
          font-size: px2rem(20);
          color: #000;
          font-weight: bold;
        }

        p {
          span {
            font-size: px2rem(20);
            color: #000;
            font-weight: bold;
          }
          .changc {
            color: rgb(218, 152, 10);
          }
        }
      }
    }
    .watch {
      @include flexbox();
      justify-content: space-between;
      align-items: center;
      p {
        padding: px2rem(8) px2rem(56);
        font-size: px2rem(14);

        border-bottom-right-radius: 10%;
        border-top-left-radius: 5%;
      }
      .default {
        background: rgb(231, 227, 227);
        color: #666;
      }

      .active {
        background: rgb(68, 55, 55);
        color: rgb(233, 218, 218);
      }
    }
  }
  .introduce {
    position: relative;

    p {
      padding: 0 px2rem(20);
      // @include ellipsis(100%, 3);
      line-height: px2rem(26);
      font-size: px2rem(14);
      color: #434343;
    }
    .hidden {
      height: px2rem(70);
      overflow: hidden;
    }
    h1 {
      color: #2a80b9;
      background: #fff;
      position: absolute;
      right: px2rem(16);
      bottom: 0;
    }
  }
  .actor {
    @include rect(100%, px2rem(284));
    margin-top: px2rem(20);
    padding: px2rem(20) 0 px2rem(20) px2rem(20);
    border-top: 1px solid #edeced;
    border-bottom: 1px solid #edeced;
    .title {
      font-size: px2rem(16);
      font-weight: bold;
      color: #000;
    }
    ul {
      @include flexbox();
      justify-content: space-between;
      align-items: center;
      padding: px2rem(16) 0;
      overflow-x: auto;
      li {
        @include rect(px2rem(80), px2rem(174));
        @include flexbox();
        margin-right: px2rem(6);
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        img {
          @include rect(px2rem(80), auto);
        }
        p {
          @include ellipsis(100%, 1);
        }
      }
    }
    .all {
      font-size: px2rem(14);
      color: #2a80b9;
    }
  }
  .stage {
    @include rect(100%, px2rem(200));
    padding: px2rem(20) 0 px2rem(20) px2rem(20);
    border-top: 1px solid #edeced;
    border-bottom: 1px solid #edeced;
    .title {
      font-size: px2rem(16);
      font-weight: bold;
      color: #000;
      margin-bottom: px2rem(10);
    }
    .picture {
      @include flexbox();
      overflow-x: auto;
      img {
        @include rect(px2rem(174), px2rem(130));
        margin-right: px2rem(4);
      }
    }
  }
  .remark {
    padding: px2rem(20);
    .write {
      h2 {
        font-size: px2rem(16);
        color: #000;
      }
      p {
        padding: px2rem(4) px2rem(8);
        border-radius: px2rem(12323);
        background: linear-gradient(left, #f8bac5, #ed6e84);
        color: #fff;
      }
    }
    .mark {
      padding-top: px2rem(10);
      p {
        @include flexbox();
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        .big {
          font-size: px2rem(28);
          color: #000;
          font-weight: bold;
        }
      }
      img {
        @include rect(px2rem(180), px2rem(40));
        margin-top: px2rem(12);
      }
    }
    .tag {
      ul {
        margin: px2rem(16) 0;
        @include flexbox();
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        margin-right: px2rem(40);

        &.hide {
          height: px2rem(120);
          overflow: hidden;
        }
        li {
          padding: px2rem(4) px2rem(12);
          border-radius: px2rem(12323);
          border: 1px solid #ed6e84;
          margin-right: px2rem(4);
          margin-top: px2rem(6);
          color: #666;
          font-size: px2rem(14);
          &.licolor {
            background: #ed6e84;
            color: #fff;
          }
        }
        .color {
          border: 1px solid #ccc;
          border-top-left-radius: 20%;
        }
      }
    }
  }
  .note {
    padding: 0 px2rem(20) px2rem(20) px2rem(20);
    border-bottom: 1px solid #ccc;
    ul {
      li {
        margin-bottom: px2rem(20);
        .header {
          img {
            @include rect(px2rem(50), px2rem(50));
            border-radius: 50%;
            margin-right: px2rem(20);
          }
          .name {
            .names {
              color: #000;
              font-size: px2rem(14);
              font-weight: bold;
            }
            .buy {
              i {
                padding: px2rem(2) px2rem(4);
                border: 1px solid #ed6e84;
                border-radius: 8%;
                color: #ed6e84;
              }
              span {
                color: #f1a95d;
              }
              em {
                color: #f1a95d;
                font-size: px2rem(14);
              }
            }
          }
          h1 {
            color: #ccc;
          }
        }
        .contents {
          margin: px2rem(10) 0;
          color: #666;
          line-height: px2rem(26);
          @include ellipsis(100%, 6);
          text-indent: px2rem(10);
          font-size: px2rem(14);
        }
        .foot {
          span {
            color: #ccc;
          }
          p {
            color: #ccc;
          }
        }
      }
    }
  }
  .discuss {
    padding: px2rem(20);
    border-bottom: 1px solid #ccc;
    .write {
      margin-bottom: px2rem(10);
      h2 {
        font-size: px2rem(16);
        color: #000;
      }
      p {
        padding: px2rem(4) px2rem(8);
        border-radius: px2rem(12323);
        background: linear-gradient(left, #f8bac5, #ed6e84);
        color: #fff;
      }
    }
    .header {
      img {
        @include rect(px2rem(50), px2rem(50));
        border-radius: 50%;
        margin-right: px2rem(20);
      }
      .name {
        .names {
          color: #000;
          font-size: px2rem(14);
          font-weight: bold;
        }
        .buy {
          i {
            padding: px2rem(2) px2rem(4);
            border: 1px solid #ed6e84;
            border-radius: 8%;
            color: #ed6e84;
          }
          span {
            color: #f1a95d;
          }
          em {
            color: #f1a95d;
            font-size: px2rem(14);
          }
        }
      }
      h1 {
        color: #ccc;
      }
    }
    .contents {
      margin: px2rem(10) 0;
      color: #666;
      line-height: px2rem(26);
      @include ellipsis(100%, 6);
      text-indent: px2rem(10);
      font-size: px2rem(14);
    }
    .foot {
      span {
        color: #ccc;
      }
      p {
        color: #ccc;
      }
    }
  }
  .bottom {
    padding: px2rem(20);
    .top {
      border-bottom: 1px solid #ccc;

      .vote {
        color: #000;
        font-size: px2rem(16);
        font-weight: bold;
      }
      .order {
        @include rect(100%, px2rem(76));
        @include flexbox();
        justify-content: space-between;
        align-items: center;
        li {
          @include flexbox();
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
          .big {
            font-size: px2rem(20);
            color: #000;
            font-weight: bold;
          }
          p:nth-of-type(2) {
            color: #666;
          }
        }
      }
      h4 {
        color: #2a80b9;
        font-size: px2rem(14);
        margin-bottom: px2rem(20);
      }
    }
    .music {
      padding: px2rem(20) 0;
      border-bottom: 1px solid #ccc;
      .vote {
        color: #000;
        font-size: px2rem(16);
        font-weight: bold;
        margin-bottom: px2rem(10);
      }
      .detail {
        .song {
          position: relative;
          @include rect(px2rem(80), px2rem(64));
          img {
            width: px2rem(80);
            border-radius: 4px;
          }
          .iconfont {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 30px;
            color: #fff;
          }
        }

        .info {
          margin-left: px2rem(16);
          line-height: px2rem(30);
          p:nth-of-type(1) {
            color: #434343;
            font-size: px2rem(14);
          }
          p:nth-of-type(2) {
            color: #ccc;
          }
        }
        .icon-next {
          margin-top: px2rem(20);
        }
      }
    }
    .movie {
      padding: px2rem(20) 0;
      h1 {
        font-size: px2rem(16);
        color: #000;
      }
      p {
        font-size: px2rem(12);
        line-height: px2rem(50);
        border-bottom: 1px solid #ccc;
      }
    }
  }
  .reduce {
    @include rect(100%, px2rem(40));
    line-height: px2rem(40);
    background: linear-gradient(left, #f8bac5, #ed6e84);
    color: #fff;
    position: fixed;
    bottom: 0;
    font-size: px2rem(18);
    letter-spacing: 3px;
  }
  .gotop {
    position: fixed;
    right: px2rem(60);
    bottom: px2rem(70);
    font-size: px2rem(40);
    color: rgba($color: #f76897, $alpha: 0.7);
  }
}
</style>
