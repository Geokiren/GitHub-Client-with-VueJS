<template>
  <div id="main-content">
    <button id="previous" class="pagination" :class="usersPage === 1 ? 'disabled' : ''" :disabled="usersPage === 1" @click="usersPage--">
        <div class="arrow">&#60;</div>
    </button>
    <users :page="usersPage"></users>
    <button id="next" class="pagination" @click="usersPage++">
        <div class="arrow">&#62;</div>
    </button>
  </div>
</template>

<script>
  import Users from "../components/Users.vue";
  export default {
    components: {
      Users
    },
    data() {
      return {
        usersPage: 1
      }
    }
  }
</script>

<style lang="scss" scoped>
  #main-content {
    padding: 20px;
    display: flex;
    justify-content: center;
    margin-top: 70px;
  }

  .pagination {
    position: fixed;
    top: 50%;
    font-size: 300px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border: 0;
    border-radius: 10px;
    color: #42b983;
    background-color: #323347;
    cursor: pointer;
    outline: none;
}

.pagination.disabled {
  pointer-events: none;
  opacity: 0.4;
}

.pagination:hover {
  transform: scale(1.01);
}

#previous {
  left: 300px;
}

#next {
  right: 300px;
}
</style>