<template>
    <div id="app">
        <router-view />
        <FooterGuide v-show="$route.meta.showFooter === true"/>
    </div>
</template>

<script>
name:"App"
import FooterGuide from "./components/FooterGuide/FooterGuide.vue"
export default {
    components:{
        FooterGuide
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    // 将stylus转化为css代码, stylus-loader可以把stylus转化为webpack可识别的内容，从而实现stylus转化为css
    #app
        width 100%
        height 100%
        background-color #f5f5f5
</style>