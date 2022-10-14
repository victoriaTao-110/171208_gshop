<template>
  <div class="stu">
      <h2>学生姓名：{{name}}</h2>
      <h2>学生性别：{{sex}}</h2>
      <button @click="sendStudentName">传递学生名给App</button>
      <button @click="unbind">解绑atguigu事件</button>
      <button @click="death">销毁了Student实例对象</button>
  </div>
</template>

<script>
export default {
    name:"Student",
    data(){
        return{
           name:"张三",
           sex:"男"
        }
    },
    methods: {
        sendStudentName(){
            // 触发Student组件实例身上的atguigu事件
            this.$emit("atguigu",this.name,666,999)
            // this.$emit("demo")
        },
        unbind(){
            this.$off("atguigu")    // 解绑一个自定义事件
            // this.$off(["atguigu","demo"])       // 解绑多个自定义事件    vue3已经不能用了
        },
        death(){
            this.$destroy()  //销毁了当前Student实例对象，销毁后所有Student自定义的函数都不能使用了  vue3已经不能用了
        }
    },
}
</script>

<style >
    .stu{
        background-color: orange;
    }
</style>