<template>
  <div class="home">
    <div id="loading-spinner" :class="isLoading ? 'active' : ''"></div>
    <div id="user-list" v-if="areUsers">
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
    },
    areUsers() {
      return this.users.length > 0;
    }
  },
  mounted() {
    this.getUsers();
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
    async getUsers(page = 1) {
        this.renderObserver = false;
        this.isLoading = true;

        try {
          const res = await fetch(`${process.env.VUE_APP_GITHUB_URL}?q=language:javascript+type:user&sort=followers&order=desc&page=${page}&per_page=10`, {
            headers: {
              'Authorization': 'Bearer ' + `${process.env.VUE_APP_GITHUB_KEY}`,
              'Accept': 'application/vnd.github+json'
            },
          });
          this.isLoading = false;
          const { items } = await res.json();
          if (items && items.length > 0) { 
            this.users.push(...items);
            this.renderObserver = true;
          }
        } catch(er) {
            console.log(er);
        }
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

  #loading-spinner {
    width: 30px;
    height: 30px;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%2342B983FF' stroke-width='7' stroke-dasharray='50%25%2c 13%25' stroke-dashoffset='86' stroke-linecap='butt'/%3e%3c/svg%3e");
    position: fixed;
    top: 10%;
    border-radius: 50%;
    display: none;
    animation: rotate 2s infinite;
  }

  #loading-spinner.active {
    display: block;
  }

  @keyframes rotate {
    0% {
      transform: rotateZ(0deg);
    }
    50%{
      transform: rotateZ(360deg);
    }
    100% {
      transform: rotateZ(0deg);
    }
  }
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
