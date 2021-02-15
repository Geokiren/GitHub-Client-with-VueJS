<template>
  <div id="main-content">
    <!-- <button id="previous" class="pagination" :class="usersPage === 1 ? 'disabled' : ''" :disabled="usersPage === 1" @click="usersPage--">
        <div class="arrow">&#60;</div>
    </button> -->
    <users :page="usersPage"></users>
    <div id="pagination-container">
      <button id="previous" class="pagination" :class="usersPage <= 1 ? 'disabled' : ''" @click="usersPage--" :disabled="usersPage <= 1">Previous</button>
      <button id="next" class="pagination" @click="usersPage++">Next</button>
    </div>
    <!-- <button id="next" class="pagination" @click="usersPage++">
        <div class="arrow">&#62;</div>
    </button> -->
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
    flex-direction: column;
    justify-content: center;
    margin-top: 70px;
  }

  #pagination-container {
    margin: 2rem 1rem;

    .pagination {
      // position: fixed;
      // top: 50%;
      width: 150px;
      padding: 10px;
      margin: 0 20px;
      font-size: 30px;
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

    @media screen and (max-width: 600px) {
      .pagination {
          width: 80px;
          font-size: 16px;
      }
            }
  }

  

#previous {
  // left: 300px;
}

#next {
  // right: 300px;
}
</style>