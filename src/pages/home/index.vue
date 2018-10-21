<template>
  <div class="wrapper">
    <v-header></v-header>
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
     
        <router-view></router-view>
     
    </transition>
  </div>
</template> 

<script>
import { mapState, mapActions } from "vuex";
import homeHeader from "@/components/homeHeader";
export default {
  components: {
    "v-header": homeHeader
  },
  data: function() {
    return {
      list: [
        {
          images:
            "https://gw.alicdn.com/tfs/TB11qDzsJknBKNjSZKPXXX6OFXa-1280-520.jpg_720x720Q30s100.jpg"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      direction: state => state.mutations.direction
    })
  }
};
</script>

<style lang="scss" scoped>
@import "@/lib/reset.scss";
@import "@/assets/scss/px2rem.scss";
.wrapper {
  @include rect(100%, 100%);

  .nav {
    @include flexbox();
    p {
      width: px2rem(86);
      line-height: px2rem(30);
    }
  }
}
</style>

