<template>
  <nav-layout></nav-layout>
  <router-view />
</template>

<script>
import NavLayout from "./layout/NavLayout.vue";
export default {
  components: {
    NavLayout
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

#app {
  font-family: "Jost", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #242533;
  color: #2c3e50;
  width: 100%;
}
</style>
