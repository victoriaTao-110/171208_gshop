<template>
  <li>
    <input type="checkbox" :checked="todo.done" @click="handleCheck(todo.id)" />
    <span v-show="!todo.isEdit">{{ todo.name }}</span>
    <input
      ref="inputName"
      v-show="todo.isEdit"
      type="text"
      :value="todo.name"
      @blur="handleBlur(todo, $event)"
    />

    <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
    <button class="btn btn-edit" @click="handleEdit(todo)">编辑</button>
  </li>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  name: "MyItem",
  // 声明接收todo对象
  props: ["todo"],
  methods: {
    handleCheck(id) {
      // 通知App组件将对应的todo对象的done值取反
      // this.checkTodo(id);
      this.$bus.$emit("checkTodo", id);
    },
    // 删除
    handleDelete(id) {
      if (confirm("确定删除么？")) {
        // 通知App组件将对应的todo对象删除
        pubsub.publish("deleteTodo", id);
        // this.$bus.$emit("deleteTodo",id)
      }
    },
    // 编辑选择框的内容
    handleEdit(todo) {
      // 添加一个响应式属性
      if (todo.hasOwnProperty("isEdit")) {
        todo.isEdit = false;
      } else {
        this.$set(todo, "isEdit", true);
      }
      // 本来Vue会在全部解析完handleEdit的时候再更新DOM，但是在添加了$nextTick指令的时候会先更新DOM再执行代码
      this.$nextTick(function(){
        this.$refs.inputName.focus();
      })
    },
    // 当失去焦点的时候需要把输入框转换成文字(真正执行修改逻辑)
    handleBlur(todo, e) {
      todo.isEdit = false;
      if (!e.target.value.trim()) {
        return alert("不能输入为空");
      }
      this.$bus.$emit("updateTodo", todo.id, e.target.value);
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}
</style>