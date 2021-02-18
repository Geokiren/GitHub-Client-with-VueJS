<template>
  <div class="home">
    <div id="user-list" v-if="!isLoading">
        <user v-for="(user, index) in users" :key="user.id" :user="user" @user-repos="setRepos" v-if="!showRepos"></user>
    </div>
    <user-repos 
        v-if="showRepos"
        :username="repoInfo.username"
        :name="repoInfo.name"
        @close-repos="showRepos = false">
    </user-repos>
    <!-- <div id="pagination-container" v-if="!showRepos">
      <button id="previous" class="pagination" :class="usersPage === 1 ? 'disabled' : ''" @click="usersPage--" :disabled="usersPage === 1">Previous</button>
      <div id="page">{{ usersPage }}</div>
      <button id="next" class="pagination" @click="usersPage++">Next</button>
    </div> -->
  </div>
  <observer v-if="renderObserver && !showRepos" @intersect="intersected" />
</template>

<script>
import { onMounted } from 'vue';
import User from "../components/User.vue";
import UserRepos from '../components/UserRepos.vue';
import Observer from '../components/Observer.vue';

export default {
  name: 'Home',
  components: {
    User,
    UserRepos,
    Observer
  },
  data() {
      return {
        usersPage: 1,
        users: [],
        isLoading: false,
        showRepos: false,
        repoInfo: {},
        renderObserver: false
      }
  },
  computed: {
    selectedUsers() {
      return this.$store.state.selectedUsers;
    }
  },
  created() {
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
          document.documentElement.style.overflow = 'hidden';
          return;
      }

      document.documentElement.style.overflow = 'auto';
    }
  },
  methods: {
    findUserIndex(id) {
        return this.selectedUsers.findIndex(selectedUser => selectedUser.id === id);
    },
    async getUsers(page) {
      this.renderObserver = false;
        // this.isLoading = true;
        try {
            const res = await fetch(`https://api.github.com/search/users?q=language:javascript+type:user&sort=followers&order=desc&page=${page}&per_page=10`);
            const { items } = await res.json();
            this.users.push(...items || []);            
        } catch(er) {
            console.log(er)
        }
        setTimeout(() => {
          this.renderObserver = true;
        }, 300);
        
        // this.isLoading = false;
    },
    setRepos(repo) {
      this.repoInfo = repo;
      this.showRepos = true;
    },
    intersected() {
      this.usersPage++;
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
    position: relative;
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
    display: flex;
    justify-content: center;

    .pagination {
      // position: fixed;
      // top: 50%;
      color: #42b983;
      font-size: 30px;
      width: 150px;
      padding: 10px;
      margin: 0 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
      border: 0;
      border-radius: 10px;
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
    
    #page {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
      background-color: #323347;
      width: 50px;
      color: #42b983;
      font-size: 30px;
      border-radius: 10px;
      padding: 10px;
    }

    @media screen and (max-width: 600px) {
      .pagination {
          width: 120px;
          font-size: 22px;
          padding: 8px;
          margin: 0 10px;
      }
      #page {
        width: 40px;
        font-size: 22px;
        padding: 8px;
      }
    }
  }

  #vov {
    height: 10px;
  }
</style>
