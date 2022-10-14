import Vue from 'vue'
import App from './App.vue'
// 引入插件
import vueResource from "vue-resource"
// 引入store
import store from "./store/index.js"

// 关闭vue的生产提示
Vue.config.productionTip = false
// 使用插件
Vue.use(vueResource)


// 创建vm
new Vue({
  render: h => h(App),
  store:store,
  beforeCreate(){
    // 安装全局事件总线
    Vue.prototype.$bus = this
  }
}).$mount('#app')

