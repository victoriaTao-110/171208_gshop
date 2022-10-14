<template>
  <ul class="todo-main">
    <MyItem
      v-for="todoObj in todos"
      :key="todoObj.id"
      :todo="todoObj"
    />
  </ul>
</template>

<script>
import MyItem from "./MyItem.vue";

export default {
  name: "List",
  components: {
    MyItem,
  },
  props: ["todos"],
};
</script>

<style>
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}
</style>