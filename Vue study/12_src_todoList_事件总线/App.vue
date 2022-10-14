// age前边写个冒号的意思是把age后边的数据当做一个表达式，这样它的结果就可以是各种类型
<template>
  <div class="total">
    <MyHeader @addTodo="addTodo" />
    <List :todos="todos" />
    <MyFooter :todos="todos" @checkAllTodo="checkAllTodo" @removeDoneTodo="removeDoneTodo"/>
  </div>
</template>

<script>
import List from "./components/List.vue";
import MyHeader from "./components/MyHeader.vue";
import MyFooter from "./components/MyFooter.vue";

export default {
  name: "App",
  components: {
    MyHeader,
    List,
    MyFooter,
  },
  data() {
   return {
      todos: [
        // 数字一般都是有尽头的，所以一般id的都会设置为字符串
        { id: '001', name: "打代码", done: false },
        { id: '002', name: "睡觉", done: false },
        { id: '003', name: "吃饭", done: false },
      ],
    };
  },
  methods:{
    addTodo(todoObj){
        this.todos.unshift(todoObj)
    },
    // 勾选or取消勾选
    checkTodo(id){
      this.todos.forEach((todo)=>{
        if(todo.id === id){
          todo.done = !todo.done;
        }
      })
    },
    // 删除todo 注意filter不改变原数组
    deleteTodo(id){
      this.todos = this.todos.filter((todo)=>{
        return todo.id !== id;
      })
    },
    // 全选，全不选
    checkAllTodo(done){
      this.todos.forEach((todo)=>{
        todo.done = done;
      })
    },
    // 清除所有完成的todo
    removeDoneTodo(){
      this.todos = this.todos.filter((todo)=>{
        return !todo.done
      })
    }
  },
  mounted() {
    this.$bus.$on("checkTodo",this.checkTodo);
    this.$bus.$on("deleteTodo",this.deleteTodo)
  },
  beforeDestroy(){
    this.$bus.$off("checkTodo");
    this.$bus.$off("deleteTodo")
  }
};
</script>

<style>
.total {
  width: 600px;
  border: 1px black solid;
  margin: 100px auto;
}

body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}
</style>