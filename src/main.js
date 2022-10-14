// 入口文件
import Vue from 'vue'
import App from './App.vue'
import router from "./router"

// 关闭vue的生产提示
Vue.config.productionTip = false

// 创建vm
new Vue({
  el:"#app",
  render: h => h(App),
  router
})

