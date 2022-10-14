<template>
  <div class="app">
    <h1>{{ msg }}</h1>
    <h2>学生名字：{{studentName}}</h2>

    <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
    <School :getSchoolName="getSchoolName" />

    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据  -->
    <Student @atguigu="getStudentName" @demo="m1"/>
  </div>
</template>

<script>
import School from "./components/School.vue";
import Student from "./components/Student.vue";

export default {
  name: "App",
  components: {
    Student,
    School,
  },
  data(){
    return {
      msg:"你好啊！",
      studentName:""
    }
  },
  methods: {
    getSchoolName(x){
      console.log("App收到了学校名称" + x)
    },
    // ...params 接收多个参数，组成一个数组
    getStudentName(name,...params){
      console.log("App收到了学生姓名" , name, params);
      this.studentName = name;
    },
    m1(){
      console.log("demo事件被触发了")
    }
  },
};
</script>

<style>
  .app{
    background-color: gray;
  }
</style>