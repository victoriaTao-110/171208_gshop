<template>
  <div class="container">
    <Category title="美食" :listData="foods">
      <img src="./components/2.jpg">
    </Category>
    <Category title="游戏">
      <ul>
          <li v-for="(g,index) in games" :key="index">{{g}}</li>
      </ul>
    </Category>
    <Category title="电影">
      <video controls src="https://v.qq.com/x/cover/mzc002002xuxaqd/f0044gqssm4.html"></video>
    </Category>
  </div>
</template>

<script>
import Category from "./components/Category"
export default {
  name:"App",
  components:{
    Category
  },
  data(){
    return{
      foods:["火锅","烧烤","小龙虾","披萨"],
      games:["超级玛丽","穿越火线","英雄联盟","地下城"],
      films:["教父","拆弹专家","西虹市首富","功夫"]
    }
  }
}
</script>

<style>
  .container{
    display: flex;
    justify-content: space-around;
  }
</style>