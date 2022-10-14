<template>
  <div class="container">
    <Category title="美食" :listData="foods">
      <img slot="center" src="./components/2.jpg" />
      <a slot="footer" href="http://atguigu.com">更多美食</a>
    </Category>
    <Category title="游戏">
      <ul slot="center">
        <li v-for="(g, index) in games" :key="index">{{ g }}</li>
      </ul>
      <div class="foot" slot="footer">
        <a href="http://atguigu.com">单击游戏</a>
        <a href="http://atguigu.com">网络游戏</a>
      </div>
    </Category>
    <Category title="电影">
      <video
        controls
        src="https://v.qq.com/x/cover/mzc002002xuxaqd/f0044gqssm4.html"
        slot="center"
      ></video>
      <template v-slot:footer>
        <div class="foot">
          <a href="http://atguigu.com">经典</a>
          <a href="http://atguigu.com">热门</a>
          <a href="http://atguigu.com">推荐</a>
        </div>
        <h4 slot="footer">欢迎前来观影！！！</h4>
      </template>
    </Category>
  </div>
</template>

<script>
import Category from "./components/Category";
export default {
  name: "App",
  components: {
    Category,
  },
  data() {
    return {
      foods: ["火锅", "烧烤", "小龙虾", "披萨"],
      games: ["超级玛丽", "穿越火线", "英雄联盟", "地下城"],
      films: ["教父", "拆弹专家", "西虹市首富", "功夫"],
    };
  },
};
</script>

<style>
.container,
.foot {
  display: flex;
  justify-content: space-around;
}
h4 {
  text-align: center;
}
</style>