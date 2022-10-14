<template>
  <div class="category">
    <h3>{{ title }}分类</h3>
    <slot :games="games">我是一些默认的内容</slot>
    
  </div>
</template>

<script>
export default {
  name: "category",
  props: ["title"],
  data() {
    return {
      games: ["超级玛丽", "穿越火线", "英雄联盟", "地下城"],
    };
  },
};
</script>

<style>
.category {
  width: 200px;
  height: 300px;
  background-color: skyblue;
}
h3 {
  text-align: center;
  background-color: orange;
}
</style>