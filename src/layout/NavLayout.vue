<template>
  <div id="nav">
    <router-link to="/">Github Users</router-link> | <router-link to="/following">Following</router-link>
  </div>
</template>

<style lang="scss" scoped>
  #nav {
    z-index: 100;
    position: fixed;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 30px;
    width: 100%;
    background-color: #1f202d;
    top: 0;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
}
</style>