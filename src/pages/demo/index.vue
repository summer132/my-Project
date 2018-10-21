<template>
    <div>
        全选 <input type="checkbox" v-model="selectall" @change="changeall()">
        <div v-for="(item,index) of list" :key="item.id">
            <input type="checkbox" v-model="item.checked" @change="selsecOne()">
            <!-- <mt-checklist title="89978" v-model="item.checked" :options="[555,566,566767]"></mt-checklist> -->
            <p>{{item.id}}</p>
            <p>{{item.money}}</p>
            <p>{{item.name}}</p>
            <p>
                <span v-for="(items,index) of item.type">标签{{index+1}}：{{items}}</span>
            </p>
            <button @click="deleteitem(item,index)">删除</button>
        </div>
    </div>
</template>

<script>
import { Checklist } from "mint-ui";
export default {
  components: {
    "mt-checklist": Checklist
  },
  data() {
    return {
      list: [],
      selectall: false
    };
  },
  methods: {
    deleteitem(data, index) {
      this.list.splice(index, 1);
      console.log();
    },
    changeall() {
      console.log(this.selectall);
      if (this.selectall) {
        this.list.map((item, index) => {
          item.checked = true;
        });
      } else {
        this.list.map((item, index) => {
          item.checked = false;
        });
      }
    },
    selsecOne() {
      let flag = true;
      this.list.map((item, index) => {
        if (item.checked == false) {
          flag = false;
        }
      });
       this.selectall = flag;
    }
  },
  mounted() {
    for (var i = 0; i < 50; i++) {
      let obj = {
        id: i + 1,
        money: 5 + 5 * i,
        name: "商品" + i + 1,
        type: ["体育", "生活用品"],
        checked: false
      };
      this.list.push(obj);
    }
  }
};
</script>

<style>
</style>
