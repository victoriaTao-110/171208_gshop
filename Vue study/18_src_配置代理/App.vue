// age前边写个冒号的意思是把age后边的数据当做一个表达式，这样它的结果就可以是各种类型
<template>
  <div>
    <button @click="getStudents">获取学生信息</button>
    <button @click="getCars">获取汽车信息</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  methods: {
    getStudents() {
      // axios.get("http://localhost:8080/students").then(   代理服务器方法1
      // 代理服务器方法2
      axios.get("http://localhost:8080/atguigu/students").then(
        // 跨域后请求也可以发送，服务器也会给响应，只是返回的数据被浏览器拦截了
        (response) => {
          console.log("请求成功了", response.data);
        },
        (error) => {
          console.log("请求失败了", error.message);
        }
      );
    },
    getCars() {
      // axios.get("http://localhost:8080/students").then(   代理服务器方法1
      // 代理服务器方法2
      axios.get("http://localhost:8080/demo/cars").then(
        // 跨域后请求也可以发送，服务器也会给响应，只是返回的数据被浏览器拦截了
        (response) => {
          console.log("请求成功了", response.data);
        },
        (error) => {
          console.log("请求失败了", error.message);
        }
      );
    },
  },
};
</script>

<style>
</style>