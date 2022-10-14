<template>
  <div>
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <!-- 
          跳转路由并携带params参数，to的字符串写法
          路径里面需要设置参数，所以to前边需要加上冒号；
          但这样会导致to整个都作为参数解读，所以需要再加上模板字符串，再在参数出写成 ${参数} 的格式 
        -->
        <!-- <router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{m.title}}</router-link>&nbsp;&nbsp; -->

        <!-- 跳转路由并携带params参数，to对象写法 -->
        <router-link
          :to="{
            name: 'xiangqing',
            params: {
              id: m.id,
              title: m.title,
            },
          }"
        >
          {{ m.title }}
        </router-link>
        <button @click="pushShow(m)">push查看</button>
        <button @click="replaceShow(m)">replace查看</button>
      </li>
    </ul>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Maeeage",
  data() {
    return {
      messageList: [
        { id: "001", title: "消息001" },
        { id: "002", title: "消息002" },
        { id: "003", title: "消息003" },
      ],
    };
  },
  methods: {
    pushShow(m) {
      this.$router.push({
        name: "xiangqing",
        params: {
          id: m.id,
          title: m.title,
        },
      });
    },
    replaceShow(m) {
      this.$router.push({
        name: "xiangqing",
        params: {
          id: m.id,
          title: m.title,
        },
      });
    },
  },
};
</script>

<style>
</style>