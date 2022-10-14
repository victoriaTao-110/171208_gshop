<template>
  <div class="container">
  <!-- 数据在Category组件中，但是使用形式是在App中 -->
    <Category title="游戏">
      <template scope="atguigu">
        <ul>
          <li v-for="(g, index) in atguigu.games" :key="index">{{ g }}</li>
        </ul>
      </template>
    </Category>

    <Category title="游戏">
      <template scope="atguigu">
        <ol>
          <li v-for="(g, index) in atguigu.games" :key="index">{{ g }}</li>
        </ol>
      </template>
    </Category>

    <Category title="游戏">
      <template scope="atguigu">
          <h4 v-for="(g, index) in atguigu.games" :key="index">{{ g }}</h4>
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