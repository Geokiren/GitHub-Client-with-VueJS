<template>
  <nav-layout></nav-layout>
  <main-content>
    <pagination :direction="'previous'" :page="page" @change-page="getUsers('previous')"></pagination>
    <div id="user-list">
      <div v-if="!isLoading" class="user" v-for="(user, index) in users" :key="user.id">
        <div class="avatar">
          <img :src="user.avatar_url" alt="User Avatar" />
        </div>
        <div class="name">{{ user.login.toUpperCase() }}</div>
      </div>
    </div>
    <pagination :direction="'next'" @change-page="getUsers('next')"></pagination>
  </main-content>
</template>

<script>
import NavLayout from "./layout/NavLayout.vue";
import MainContent from "./layout/MainContent.vue";
import Pagination from "./layout/Pagination.vue";
export default {
  components: {
    NavLayout,
    MainContent,
    Pagination
  },
  data() {
    return {
      users: [],
      page: 1,
      isLoading: false
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers(dir) {
      this.isLoading = true;
      if(dir) {
        this.page = dir === 'previous' ? --this.page : ++this.page;
        if(this.page <= 1) {
          this.page = 1;
        }
      }
      console.log('page: ', this.page)
      fetch(
        `https://api.github.com/search/users?q=language:javascript+type:user&sort=followers&order=desc&page=${this.page}&per_page=10`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          this.isLoading = false;
          console.log(data);
          this.users = [];
          this.users = 
            data &&
            data.items &&
            data.items.length > 0 &&
            [...data.items];
        });
    }
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

#main-content {
  padding: 20px;
  display: flex;
  justify-content: center;
  margin-top: 70px;
}

#nav {
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

#user-list {
  width: 100%;

  .user {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 10px;
    padding: 1rem;
    margin: 1rem auto;
    display: flex;
    align-items: center;
    width: 50%;
    background-color: #393b51;
    color: white;

    .avatar {
      img {
        width: 100px;
      }
    }

    .name {
      letter-spacing: 4px;
    }
  }

  .user:hover {
    transform: scale(1.01);
  }
}
</style>
