<template>
  <div class="home">
    <div id="user-list">
      <keep-alive>
        <user v-for="(user, index) in users" :key="user.id" :user="user"></user>
      </keep-alive>
    </div>
    <div id="pagination-container">
      <button id="previous" class="pagination" @click="usersPage--">Previous</button>
      <button id="next" class="pagination" @click="usersPage++">Next</button>
    </div>
  </div>
</template>

<script>
import User from "../components/User.vue";

export default {
  name: 'Home',
  components: {
    User
  },
  data() {
      return {
        usersPage: 1,
        users: [],
        isLoading: false,
      }
  },
  mounted() {
    this.getUsers(1);
  },
  watch: {
    usersPage(newVal, oldVal) {
        if(newVal) {
            this.getUsers(newVal);
        }
    },
    showRepos: function() {
      if(this.showRepos){
          document.documentElement.style.overflow = 'hidden'
          return
      }

      document.documentElement.style.overflow = 'auto'
    }
  },
  methods: {
    async getUsers(page) {
        this.isLoading = true;

        try {
            const res = await fetch(`https://api.github.com/search/users?q=language:javascript+type:user&sort=followers&order=desc&page=${page}&per_page=10`);
            const data = await res.json();
            // console.log(res)
            console.log(data)
            this.users = data && data.items || [];
            
            if(this.users) {
                this.users.forEach(item => {
                    this.getUser(item.url).then(user => {
                        item.details = user;
                    })
                })
                this.isLoading = false;
            }
        } catch(er) {
            console.log(er)
        } 
    },
    async getUser(url) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        } catch(er) {
            console.log(er)
        }
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 70px;
  }

  #user-list {
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
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
</style>
