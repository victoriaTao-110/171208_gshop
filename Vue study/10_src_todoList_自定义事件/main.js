// 该文件是整个项目的入口文件
import { createApp } from 'vue'
import App from './App.vue'

// 创建vue实例
createApp(App).mount('#app')

/*
    关于不同版本的vue:
        1. vue.js与vue.runtime.xxx.js的区别：
            1）vue.js是完整版的Vue，包含：核心功能 + 模板解析器
            2）vue.runtime.xxx.js是运行版的Vue，只包含：核心功能，没有模板解析器

        2.因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，
            需要使用render函数接收到的createElement函数去指定具体内容
*/

