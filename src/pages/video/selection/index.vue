<template>
  <div class="main">
    <ul>
      <li v-for="(item,index) of vedioList" :key="index">
        <div class="video">
          <video-player class="video-player vjs-custom-skin" :playsinline="true" :options="item.playerOptions"></video-player>
        </div>
        <p class="letter">{{item.content}}</p>
        <div class="foot clearfix">
          <div class="pic fl">
            <img :src="item.icon" alt=""> {{item.name}}
          </div>
          <div class="fr icon">
            <p @click="addLove(item)">
              <i class="iconfont icon-dianzan1" :class="item.active ? 'active' : ''"></i>{{item.num}}</p>
            <p>
              <i class="iconfont icon-taobao"></i>1</p>
            <p>
              <i class="iconfont icon-icon-edit"></i>
            </p>
          </div>

        </div>
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  data() {
    return {
      vedioList: [
        {
          content:
            "三分钟看·水果硬糖·讲述少女报复恋童癖摄影师,小红帽的黑色童话",
          icon: "/static/IMG_1551.JPG",
          name: "逗比鼠标",
          num: 10,
          active: false
        },

        {
          content:
            " 对自己自信而不自负，对别人要求而不苛求，对感情深情而不矫情，对生活感悟而不感叹，对成就渴望而不奢望",
          icon: "/static/48.jpg",
          name: "诺诺讲电影",
          num: 90,
          active: false
        },

        {
          content:
            " 我们理解命运的进行式，瞬间链接瞬间，就这样连接成时光，改造命运所有的内涵，或者可以理解为创新自己的思维和行为模式",
          icon: "/static/50.jpg",
          name: "整点电影",
          num: 67,
          active: false
        },
        {
          content:
            "温和的看待世界，送远过往，面对未来，没有人有能力让往事重来，却有能力面对未来，那些生命的痛苦",
          icon: "/static/banner.jpg",
          name: "阿兴谈电影",
          num: 123,
          active: false
        },
        {
          content:
            "  股市不是暴涨就是暴跌，天气不是严寒就是酷热，工作不是悠闲就是忙疯，生活不是大喜就是大悲，这就是现代人生浮世绘",
          icon: "/static/logo.jpg",
          name: "师姐的日常",
          num: 77,
          active: false
        },
        {
          content:
            "三分钟看·水果硬糖·讲述少女报复恋童癖摄影师,小红帽的黑色童话",
          icon: "/static/p.JPG",
          name: "此剧有能量",
          num: 56,
          active: false
        },
        {
          content:
            "三分钟看·水果硬糖·讲述少女报复恋童癖摄影师,小红帽的黑色童话",
          icon: "/static/picture.JPG",
          name: "逗比鼠标",
          num: 89,
          active: false
        }
      ]
    };
  },
  created() {
    for (var i = 0; i < this.vedioList.length; i++) {
      const playerOptions = {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "/static/video.MP4" //你的m3u8地址（必填）
            // http://vjs.zencdn.net/v/oceans.mp4
          }
        ],
        poster: "/static/picture.JPG", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        //        controlBar: {
        //          timeDivider: true,
        //          durationDisplay: true,
        //          remainingTimeDisplay: false,
        //          fullscreenToggle: true  //全屏按钮
        //        }
      };

      this.vedioList[i].playerOptions = playerOptions;

      this.vedioList[i].playerOptions.poster =
        "/static/vedio" + (i + 1) + ".jpg";
    }
  },
  methods: {
    addLove(item) {
      if (item.active) {
        item.num--;
      } else {
        item.num++;
      }
      item.active = !item.active;
    }
  }
};
</script>

<style lang="scss">
// .vjs-poster{
//   background-size: cover;
// }
</style>


<style lang="scss" scoped>
@import "@/lib/reset.scss";
@import "@/assets/scss/px2rem.scss";
.main {
  margin-top: px2rem(48);
  .video {
    @include rect(100%, px2rem(210));
  }
  .letter {
    padding: px2rem(16) px2rem(20);
    color: #000;
    font-size: px2rem(14);
    font-weight: bold;
  }
  .foot {
    padding: 0 px2rem(20);
    .pic {
      img {
        @include rect(px2rem(15), px2rem(20));
        border-radius: 50%;
        margin-right: px2rem(8);
      }
    }
    .icon {
      width: px2rem(110);
      @include flexbox();
      justify-content: space-between;
      align-items: center;
      margin-bottom: px2rem(20);
      .active {
        color: #df4a63;
      }
    }
  }
}
</style>
