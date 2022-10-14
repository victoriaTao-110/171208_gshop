<template>
  <div>   
    <Count />
    <hr>
    <Person />
  </div>
</template>
    

<script>
import Count from "./components/Count";
import Person from './components/Person.vue';
export default {
  name: "App",
  components: {
    Count,
    Person,
  },
};
</script>

<style>
h4 {
  text-align: center;
}
</style>