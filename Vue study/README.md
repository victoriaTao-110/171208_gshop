#笔记

## vue的版本
    关于不同版本的vue:
        1. vue.js与vue.runtime.xxx.js的区别：
            1）vue.js是完整版的Vue，包含：核心功能 + 模板解析器
            2）vue.runtime.xxx.js是运行版的Vue，只包含：核心功能，没有模板解析器

        2.因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，
            需要使用render函数接收到的createElement函数去指定具体内容

## vue.config.js配置文件
> 使用vue inspect > output.js可以查看到Vue脚手架的默认配置
> 使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

## ref属性
    1.被用来给元素或子组件注册引用信息（id替代者）
    2.应用在html标签上获取的是真实dom元素，应用在组件标签上是组件实例对象
    3.使用方式：
        打标识：<h1 ref="xxx">...</h1> 或 <School ref="xxx"></School>
        获取：this.$refs.xxx
    
## props属性
    功能：让组件接收外部传来的数据
    1）传递数据，使用的时候
        <Demo name="xxx>
    2）接收数据，写入的时候
        第一种（只接受）
            props:["name"]

        第二种（限制类型）
            props:{
                name:String
            }
        
        第三种（限制类型、限制必要性、指定默认值）
            props:{
                name:{
                    type:String,
                    required:true,
                    default:"tom"
                }
            }
    备注：props是只读的，Vue底层会检测你对props的更改，如果进行了修改，就会发出警告，
        若业务需求确实需要更改，那么复制props的内容到data中一份，然后去修改data中的数据，最终呈现的也选择那个新的数据

## mixin（混入）
    功能：可以把多个组件共同的配置提取成一个混入对象
    使用方式：
        第一步定义混合，例如：
            {
                data(){...},
                methods:{...},
                ...
            }
        第二步使用混入，例如：
            1）全局混入：Vue.mixin(xxx)  在main中使用
            2）局部混入：mixins:["xxx"]

## 插件
    功能：用于增强Vue
    本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。
    定义插件：
        对象.install = function(Vue, options){
            // 1. 添加全局过滤器
            Vue.filter(...)

            // 2. 添加全局指令
            Vue.directive(...)

            // 3. 配置全局混入
            Vue.mixin(...)

            // 4. 添加实例方法
            Vue.prototype.$myMethod = function(){...}
            Vue.prototype.$myProperty = xxx
        }
    使用插件：Vue.use()

## scoped样式
    作用：让样式在局部生效，防止冲突
    写法：<style scoped>

## 总结TodoList案例
    1. 组件化编码流程
        1）拆分静态组件：组件要按照功能点拆分，命名不要用html元素冲突
        2）实现动态组件：考虑好数据的存放位置，数据是一个组件在于，还是一些组件在用：
            a.一个组件在用：放在组件自身即可
            b.一些组件在用：放在它们共同的父组件上
        3）交互实现：从绑定事件开始
    2. props适用于：
        1）父组件 --> 子组件 通信
        2）子组件 --> 父组件 (要求父给子一个函数)
    3. 使用v-model时要切记：v-model绑定的值不能时props传过来的值，因为props是不可以修改的
    4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做

## webStorage
    1. 存储内容大小一般支持5MB作用，不同浏览器可能略有差别，注意存储的都是键值对，形式都是字符串
    2. 浏览器端通过Window.sessionStorage 和 window.localStorage 属性来实现本地存储机制
            localStorage 关闭浏览器依然存在，除非引导客户调用以下api或者清理浏览器缓存才会消失
            sessionStorage 关闭浏览器会自行消失
    3.相关API：
        1）xxStorage.setItem("key","value")
            该方法接收一个键和一个值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值
        2）xxStorage.getItem("key")
            该方法接受一个键名作为参数，返回键名对应的值
        3）xxStorage.removeItem("key")
            该方法接受一个键名作为参数，并把该键名从存储中删除
        4）xxStorage.clear()
            该方法会清空存储中的虽有数据
    4.备注
        1.sessionStorage存储的内容会随着浏览器窗口关闭而消失
        2.LocalStorage存储的内容，需要手动清除才会消失
        3.xxStorage.getItem(xxx)如果xxx对应的value获取不到，那么getItem的返回值是null
        4.JSON.parse(null)的结果依然是null

## 组件的自定义事件
    1.一种组件间通信方式，适用于：子组件 ===> 父组件
    2.使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件
    3.绑定自定义事件：
        1）在父组件中：<Demo @atguigu="test"/> 或 <Demo v-on:atguigu="test"/>
        2）在父组件中：
            <Demo ref="demo"/>
            ...
            mounted(){
                this.$refs.xxx.$on("atguigu",this.test)
            }
        3）若想让自定义事件只能触发一次，可以使用once修饰符，或$once方法
    4.触发自定义事件（子组件中）:this.$emit("atguigu",数据)
    5.解绑自定义事件this.$off("atguigu")
    6.组件上也可以绑定原生DOM事件，需要使用native修饰符
    7.注意：通过this.$refs.xxx.$on("atguigu",回调)绑定自定义事件时，回调要么配置在methods中，要么用箭头函数，否则this指向会出现问题！

## 全局事件总线(GlobalEventBus)
    1.一种组件间通信方式，适用于任意组件间通信
    2.安装全局事件总线：
        new Vue({
            ...
            beforeCreate(){
                Vue.prototype.$bus = this
            },
            ...
        })
    3.使用全局事件总线：
        1）接收数据：A组件想接收数据，则在A组件总给$bus绑定自定义事件，事件的回调留在A组件自身
            methods:{
                demo(data)=>{
                    ...
                }
            }
            ...
            mounted(){
                this.$bus.$on("xxx",this.demo)
            }
        2）提供数据：this.$bus.$emit("xxx",数据)
    4.最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件

## Vue封装的过度与动画
    1. 作用：在插入、更新或者移除dom元素的时候，给元素添加样式类名
        v-enter   v-enter-to        v-leave   v-leave-to 
            v-enter-active              v-leave-active
    2. 写法：
        1）准备好样式
            元素进入的样式：
                进入的起点 v-enter
                进入的过程 v-enter-active
                进入的终点 v-enter-to
            元素离开的样式：
                ......
        2)使用<transition>包裹需要过渡的元素，并配置name属性：
            <transition name="hello>
                <h1 v-show="isShow">你好啊</h1>
            <transition>
        3)备注：若多个元素需要过渡，则需要使用：<transition-group>，并且每个元素都要指定key值

## Vue脚手架配置代理
    1. Ajax请求发送：
        1.xhr，比较不方便，几乎不用
        2.jQuery  $.get $.post 它会直接操作dom，这与vue的初衷背离，用的少
        3.axios
        4.fetch  window自带的，不兼容IE浏览器
        5.vue-resource  用的比较少了，也是对xhr的封装
    2. 请求跨域：
        1.cors  真的跨域了，后端加上特殊的头，使浏览器不再拦截跨域响应
        2.jsonp  script，不太用，前后端都需要特殊设置，只能解决get请求的跨域
        3.代理服务器，和请求方所处的域一样。注意它是一个服务器，不是客户端，客户端和服务器之间通信用的是ajax，受到跨域的限制，但是服务器和服务器之间通信用的是http请求，不存在跨域的问题，客户端把请求数据给代理服务器 代理服务器和服务器通信后把结果给客户端
            开启代理服务器，参考vue-cli
    3. 配置代理服务器解决跨域问题方法
        方法一
            在vue.config中添加如下配置：
            devServer:{
                proxy:"https://localhost:5000"
            }
            说明：
                a.优点：配置简单，要求资源时可以直接发给前端8080即可
                b.缺点：不能同时配置多个代理，不能灵活控制请求是否走代理（有时候会直接读取缓存数据，不走代理请求服务器）
                c.工作方式：若按照上述配置代理，当请求了前端缓存中没有的资源时，那么该请求会转发给服务器（优先选择前端资源）
        方法二
            在vue.config中配置具体代理规则：
            module.exports = {
                devServer:{
                    "/atguigu":{        //匹配"/api"开头的请求路径，注意请求的时候也需要在端口后边紧加上/atguigu
                        target:"http://localhost:5000",     //代理目标的基础路径
                        pathRewrite:{"^/atguigu":""},
                        ws:true,
                        <!-- 服务器中收到的host永远和它自己相同，代理服务器为了确保得到反馈会“撒谎” -->
                        changeOrigin:true
                    }
                } 
            }
            说明：
                a.优点：可以配置多个代理，且可以灵活地控制请求是否走代理（是否加前缀）
                b.缺点：配置略为繁琐，请求资源时必须加前缀

## 插槽
    1. 作用:让父组件可以向子组件指定位置插入html结构，也是一种组件间的通信方式，适用于父组件 ==> 子组件
    2. 分类：普通插槽 具名插槽 作用域插槽
    3. 使用方式：
        1）默认插槽
            父组件中：
                <Category>
                    <div>html结构1</div>
                </Category>
            子组件中：
                <template>
                    <div>
                        <!-- 定义插槽 -->
                        <slot>插槽默认内容</slot>
                    </div>
                </template>
        2）具名插槽
            父组件中：
                <Category>
                    <template slot="center">
                        <div>html结构1</div>
                    </template>

                    <template slot="footer">
                        <div>html结构2</div>
                    </template>
                </Category>
            子组件中：
                <template>
                    <div>
                        <slot name="center">插槽默认内容1</slot>
                         <slot name="footer">插槽默认内容2</slot>
                    </div>
                </template>
        3）作用域插槽
            理解：数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定（games数据在Category组件中，但使用数据所遍历
                出来的结构由App组件决定）
            父组件中：
                <Category>
                    <template scope="scopeData>
                    <!-- 无序列表 -->
                        <ul>
                            <li v-for="g in scopeData.games" :key="g">{{g}}</li>
                        </ul>
                    </template>
                </Category>

                <Category>
                    <template scope="scopeData>
                    <!-- 有序列表 -->
                        <ol>
                            <li v-for="g in scopeData.games" :key="g">{{g}}</li>
                        </ol>
                    </template>
                </Category>
            子组件中：
                <template>
                    <div>
                        <slot :games="games">插槽默认内容1</slot>
                    </div>
                </template>

## vuex
    1. vuex是什么？
        在Vue中实现专门式状态管理的一个Vue插件，对多个组件的共享状态进行集中式管理（读/写）
    2. 什么时候用？
        多个组件依赖同一个状态；
        来自不同组件的行为需要变更一个状态
    3. 搭建vuex环境
        1）创建文件：src/store/index.js
            // 引入vue
            import Vue from "vue"
            // 引入vuex
            import Vuex from "vuex"
            // 使用vuex插件，创建vc的时候就可以使用store了
            Vue.use(Vuex)
            // 准备actions-用于响应组件中的动作
            const actions = {}
            // 准备mutations-用于操作数据（state）
            const mutations = {}
            // 准备state-用于存储数据
            const state = {}

            // 创建并暴露store
            export default new Vuex.Store({
                actions:actions,
                mutations:mutations,
                state:state,
            })
        2)在main.js中创建vm时传入store对象
            ...
            // 引入store
            import store from "./store/index.js"
            ...

            // 创建vm
            new Vue({
                el:"#App",
                render: h => h(App),
                store,
            })
    4. 基本使用
        1）初始化数据、配置actions、配置mutations，操作文件store.js
            // 引入vue
            import Vue from "vue"
            // 引入vuex
            import Vuex from "vuex"
            // 使用vuex插件，创建vc的时候就可以使用store了
            Vue.use(Vuex)

            // 准备actions-用于响应组件中的动作
            const actions = {
                jiaOdd(context,value){
                    if(context.state.sum % 2){
                        context.commit("JIA",value)
                    }  
                },
            }

            // 准备mutations-用于操作数据（state）
            const mutations = {
                JIA(state,value){
                 state.sum += value
                }
            }
            // 准备state-用于存储数据
            const state = {
                sum:0   //当前的和
            }

            // 创建并暴露store
            export default new Vuex.Store({
                actions,
                mutations,
                state,
            })
        2）组件中读取vuex中的数据：$store.state.sum
        3）组件中修改vuex中的数据：$store.dispatch("action中的方法名",数据) 或 $store.commit("mutations中的方法名",数据)
            备注：若没有网络请求或其他业务逻辑，组件中也可以月光actions，即不写dispatch，直接写commit
    5. getters的使用
        1)概念：当state中的数据需要经过加工后再使用时，可以使用getters加工
        2)在store.js中追加getters配置
            ...

            const getters = {
                bigSum(state){
                    return state.sum * 10
                }
            }

            // 创建并暴露store
            export default new Vuex.Store({
                ...
                getters
            })
        3)组件中读取数据:$store.getters.bigSum
    6. 四个map方法的使用
        1）mapState方法：用于帮助我们映射state中的数据作为计算属性
            computed:{
                // 借助mapState生成计算属性，从state中读取数据(对象写法) 
                // he和sum一个读取计算属性中的类似程序员写的那种，另一个读取的是state中的是属性sum
                // ...mapState({he:"sum",xuexiao:"school",xueke:"subject"}),

                // 借助mapState生成计算属性，从state中读取数据(数组写法)
                // sum一个读取计算属性中的类似程序员写的那种，另一个读取的是state中的是属性sum
                ...mapState(["sum","school","subject"])
            }
        2）mapGetters:和mapState类似
        3）用于帮助我们生成与actions对话的方法，即：包含$store.dispatch(xxx)的函数
            methods:{
                // 靠mapActions生成：incrementOdd、incrementWait(对象形式)
                ...mapActions({incrementOdd:"jiaOdd", incrementWait:"jiaWait"})

                //靠mapActions生成：incrementOdd、incrementWait
                ...mapActions(["jiaOdd","jiaWait"])
            }

## 路由
    1. SPA单页面应用，路由其实就是一组key-value的对应关系,ke为路径，value为component(前端路由)或者
    2. function(后端路由):服务器收到请求，根据请求路径找到匹配的函数来处理请求，返回响应数据
    3. 基本使用
        1）安装vue-router，命令：npm i vue-router
        2）应用插件：Vue.use(VueRouter)
        3）编写router配置项：
            // 改文件专门用于创建整个应用的路由器
            import VueRouter from "vue-router";

            //引入组件
            import About from "../components/About.vue"
            import Home from "../components/Home.vue"

            // 创建并暴露一个路由器
            export default new VueRouter({
                routes:[
                    {
                        path:"/about",
                        component:About
                    },
                    {
                        path:"/home",
                        component:Home
                    },
                ]
            })
        4）实现切换（active-class可配置高亮样式）
            <router-link active-class="active" to="/about">About</router-link>
        5）指定展示位置
            <router-view></router-view>
    4. 几个注意点
        1）路由组件通常放在pages文件夹，一般组件通常存放在components文件夹
        2）通过切换，“隐藏”了的路由组件，默认是被销毁的，需要的时候再去挂载
        3）每个组件都有自己的$route属性，里面存储着自己的路由信息
        4）整个应用只有一个router，可以通过组件的$router属性获取到
    5. 多级路由
        1）配置路由规则，使用children配置项：
            routes: [
                {
                    path: "/about",
                    component: About
                },
                {
                    path: "/home",
                    component: Home,
                    children: [
                        {
                            path: "news",   // 此处不要写：/news
                            component: News
                        },
                        {
                            path: "message",
                            component: Message
                        }
                    ]
                },
            ]
        2）跳转：要写完整路径
            <router-link to:"/home/news">News</router-link>
    6. 路由的query参数
        1）传递参数
            <!-- 跳转路由并携带query参数，to字符串写法 -->
                <router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">跳转<router-link>

            <!-- 跳转路由并携带query参数，to对象写法 -->
            <router-link :to="{
                    path:'/home/message/detail',
                    query:{
                        id:m.id,
                        title:m.title
                    }
                }"
            >跳转</router-link>
        2）接收参数
            $route.query.id
            $route.query.title
    7. 路由的params参数
        1）传递参数
            <!-- 跳转路由并携带params参数，to字符串写法 -->
                <router-link :to="`/home/message/detail/${m.id}/${m.title}`">跳转<router-link>

            <!-- 跳转路由并携带params参数，to对象写法 -->
            <router-link :to="{
                    name:'xiangqing',
                    params:{
                        id:m.id,
                        title:m.title
                    }
                }"
            >跳转</router-link>
        2）接收参数
            $route.params.id
            $route.params.title
        3）特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！
    8. 路由的replace属性
        1）作用：控制路由跳转时操作浏览器历史记录的模式
        2）浏览器的历史记录有两种写入方式：分别为push和replace，push是追加历史记录，replace是替换历史记录。路由跳转时候默认为push
        3）如何开启replace模式:<router-link replace ...>News<router-link>
    9. 编程式路由导航
        1)作用：不借助<router-link>实现路由跳转，让路由跳转更灵活
        2)具体编码：
            //$router 的5个API
            this.$router.push({
                name:"xiangqing",
                params:{
                    id:xxx,
                    title:xxx
                }
            })

            this.$router.replace({
                name:"xiangqing",
                params:{
                    id:xxx,
                    title:xxx
                }
            })

            this.$router.back()
            this.$router.forward()
            this.$router.go(3)
    10. 缓存路由组件
        1）作用：让不展示的路由组件保持挂载，不被销毁
        2）具体编码: 注意这个文件需要写在被保存组件的父组件上，而不是被保存的组件本身
            <keep-alive include="News">   //此处的include的名字为写组件时data函数前边的那个name，全部缓存时可以省略
                <router-view></router-view>
            </keep-alive>
        
            <!-- 缓存多个路由组件 -->
            <!-- <keep-alive :include="['News','Message']"> -->
    11. 两个新的生命周期钩子
        1）作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态
        2）具体名字
            activated 路由组件，news组件被看见的瞬间触发激活
            deactivated 路由组件，news组件不被看见的瞬间触发失活
    12. 路由守卫
        1）保护路由的安全（权限）
        2）守卫类型
            a.全局前置守卫：初始化时执行、每次路由切换前执行
                router.beforeEach((to, from, next)=>{
                    if(to.meta.isAuth){         //判断当前路由是否需要进行权限控制
                        if(localStorage.getItem('school') === 'atguigu'){   //权限控制的具体规则
                            next()      //放行
                        }else{
                            alert("暂无查看权限")
                        }
                    }else{
                        next()  //放行
                    }
                })
            b.全局后置守卫初始化时执行、每次路由切换后执行
                router.afterEach((to, from, next)=>{
                    if(to.meta.title){         //判断当前路由是否需要进行权限控制
                        document.title = to.meta.title      //修改网页的title
                    }else{
                        document.title = 'vue_test'
                    }
                })
            c.独享守卫
                beforeEnter(to, from, next){
                    if(to.meta.isAuth){     // 判断当前路由是否需要进行权限控制
                        if(localStorage.getItem('school') === 'atguigu'){
                            next()
                        }else{
                            alert("暂无查看权限")
                        }
                    }else{
                        next()
                    }
                }
            d.组件内守卫
                // 进入守卫：通过路由规则，进入该组件时被调用
                beforeRouteEnter(to, from, next){
                },
                // 离开守卫：通过路由规则，离开该组件时被调用
                beforeRouteLeave(to, from, next){
                }
    13. history模式和hash模式
        1）对于一个url来说，什么是hash值？ ——#及其后面的内容就是hash值
        2）hash值不会包含在http请求中，即：hash值不会带给服务器
        3）hash模式：
            a.地址中永远带着#号，不美观
            b.若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法
            c.兼容性较好
        4）history模式：
            a.地址干净美观
            b.兼容性和hash模式比略差（ie兼容差）
            c.应用部署上线后需要后端人员支持，解决刷新页面服务端404的问题

## Vue UI组件库
    1.移动端常用UI组件库
        a.Vant  https://youzan.github.io/vant
        b.Cube UI  https://didi.github.io/cube-ui
        c.Mint UI  https://mint-ui.github.io
    2.PC端常用UI组件库
        a.Element UI  https://element.eleme.cn
        b.IView UI  https://www.iviwui.com
    
        



        



