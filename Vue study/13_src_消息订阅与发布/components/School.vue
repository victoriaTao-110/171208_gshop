<template>
  <div class="sch">
      <h2>学校名称:{{name}}</h2>
      <h2>学校地址:{{address}}</h2>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
export default {
    name:"School",
    data(){
        return{
            name:"尚硅谷",
            address:"北京"
        }
    },
    mounted() {
        // 这其中的this需要写成箭头函数的形式，因为pubsub不属于vue的函数，它不会指定this
        this.pubId = pubsub.subscribe("hello",(msg,data) => {
            console.log("有人发布了消息订阅",msg,data)
        })
    },
    // 在School被销毁之后把这个"hello"释放出来
    beforeDestroy(){
        pubsub.unsubscribe(this.pubId);
    }
}
</script>

<style >
    .sch{
        background-color: skyblue;
    }
</style>