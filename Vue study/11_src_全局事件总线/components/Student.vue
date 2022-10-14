<template>
  <div class="stu">
      <h2>学生姓名：{{name}}</h2>
      <h2>学生性别：{{sex}}</h2>
      <button @click="sendStudentName">传递学生名字给School组件</button>
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
            this.$bus.$emit("hello",this.name)
        }
    },
}
</script>

<style scoped>
    .stu{
        background-color: orange;
    }
</style>