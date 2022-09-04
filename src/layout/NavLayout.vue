<template>
  <header id="nav">
    <loading-spinner></loading-spinner>
    <router-link to="/">Github Users</router-link> | <router-link to="/following">Following</router-link>
  </header>
</template>

<script>
  import LoadingSpinner from '../components/LoadingSpinner.vue';

export default {
  name: 'NavLayout',
  components: {
    LoadingSpinner
  },
}
</script>

<style lang="scss" scoped>
  #nav {
    z-index: 100;
    position: fixed;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 30px;
    width: 100%;
    background-color: #1f202d;
    top: 0;
    left: 0;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
}
</style>