<template>
  <div class="todo-footer" v-if="todos.length">
    <label>
      <input type="checkbox" :checked="isAll" @click="checkAll" />
      <span>已完成{{ doneTotal }}/全部{{ todos.length }}</span>
    </label>

    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ["todos", "checkAllTodo", "removeDoneTodo"],
  computed: {
    doneTotal() {
      return this.todos.reduce((pre, todo) => {
        return pre + (todo.done ? 1 : 0);
      }, 0);
    },
    isAll() {
      return this.todos.length === this.doneTotal && this.doneTotal !== 0;
    },
  },
  methods: {
    checkAll(e) {
      // 获取checkbox的是否选中值传给App
      this.$emit("checkAllTodo",e.target.checked);
    },
    clearAll() {
      this.$emit("removeDoneTodo");
    },
  },
};
</script>

<style>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
  display: none;
}

.todo-footer:hover button {
  display: block;
}
</style>