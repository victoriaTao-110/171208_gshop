<template>
  <div class="col-xs-offset-2 col-xs-8">
    <div class="page-header">
      <h2>Vue Router Demo</h2>
      <button @click="backward">ει</button>
      <button @click="forward">εθΏ</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  methods:{
    forward(){
      this.$router.forward()
    },
    backward(){
      this.$router.back()
    }
  }
};
</script>

<style>
</style>