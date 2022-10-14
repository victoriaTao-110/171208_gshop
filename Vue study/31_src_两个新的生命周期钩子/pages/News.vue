<template>
  <ul>
    <li :style="{ opacity }">欢迎学习Vue</li>
    <li>news001 <input type="text" /></li>
    <li>news002 <input type="text" /></li>
    <li>news003 <input type="text" /></li>
  </ul>
</template>

<script>
export default {
  name: "News",
  data() {
    return {
      opacity: 1,
    };
  },
  // beforeDestroy(){
  //   console.log("即将被销毁")
  //   clearInterval(this.timer)
  // },
  // mounted(){
  //   this.timer = setInterval(() => {
  //     this.opacity -= 0.01
  //     if (this.opacity <= 0) this.opacity = 1
  //   }, 16);
  // },
  // news组件被看见就是激活
  activated() {
    console.log("news组件被激活了")
    this.timer = setInterval(() => {
      this.opacity -= 0.01;
      if (this.opacity <= 0) this.opacity = 1;
    }, 16);
  },
  // news组件不被看见就是失活
  deactivated() {
    console.log("news组件被失活了")
    clearInterval(this.timer);
  },
};
</script>

<style>
</style>