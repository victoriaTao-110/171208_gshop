<template>
  <div class="sch">
      <h2>学校名称:{{name}}</h2>
      <h2>学校地址:{{address}}</h2>
  </div>
</template>

<script>
export default {
    name:"School",
    data(){
        return{
            name:"尚硅谷",
            address:"北京"
        }
    },
    mounted() {
        this.$bus.$on("hello",(data)=>{
            console.log("我是School组件，收到了数据",data)
        })
    },
    // 在School被销毁之后把这个"hello"释放出来
    beforeDestroy(){
        this.$bus.$off("hello")
    }
}
</script>

<style >
    .sch{
        background-color: skyblue;
    }
</style>