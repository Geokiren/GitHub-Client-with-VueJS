<template>
  <nav-layout></nav-layout>
  <main-content></main-content>
</template>

<script>
import NavLayout from "./layout/NavLayout.vue";
import MainContent from "./layout/MainContent.vue";
export default {
  components: {
    NavLayout,
    MainContent
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
