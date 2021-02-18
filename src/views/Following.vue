<template>
  <div id="following">
    <div id="filters">
    <custom-select :options="['Public Repos', 'Followers']" :default="'Public Repos'" @input="setKey" />
    <custom-select :options="['Ascending', 'Descending']" :default="'Descending'" @input="setOrder" />
    <custom-select :options="[2, 5, 10]" :default="10" @input="setPageSize" />
    <input class="input-filter" v-model="search" placeholder="Search">
  </div>
  <div id="followers">
    <user v-for="(user) in filteredUsers" :key="user.id" :user="user"/>
  </div>
  <div id="pagination-container" v-if="pageSize > 1">
      <button id="previous" class="pagination" :class="page <= 1 ? 'disabled' : ''" :disabled="page <= 1" @click="setPage('prev')">Previous</button>
      <div id="page">{{ page }}</div>
      <button id="next" class="pagination" :class="isLastPage ? 'disabled' : ''" :disabled="isLastPage" @click="setPage">Next</button>
  </div>
  </div>
  
</template>

<script>
import User from "../components/User.vue";
import CustomSelect from "../components/CustomSelect.vue";

export default {
  components: {
    User,
    CustomSelect
  },
  data() {
    return {
      search: '',
      order:'asc',
      key:'name',
      page: 1,
      pageSize: 10,
      userDetails: []
    }
  },
  computed: {
    filteredUsers() {
      return this.paginate(this.selectedUsers.filter(this.isValid).sort(this.compareValues(this.key, this.order)), this.pageSize, this.page);
    },
    selectedUsers() {
      return this.$store.state.selectedUsers || [];
    },
    isLastPage() {
      console.log('ceil: ', Math.ceil(this.selectedUsers.length / this.pageSize))
      return this.page >= Math.ceil(this.selectedUsers.length / this.pageSize);
    }
  },
  methods: {
    isValid(selectedUser) {
      return selectedUser.login.toUpperCase().indexOf(this.search.toUpperCase()) > -1;
    },
    compareValues(key, order = 'asc') {
      return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0;
        }

        const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }

        return ( (order === 'desc') && (comparison * -1) || comparison );
      };
    },
    setKey(value) {
      this.key = value === 'Public Repos' ? 'public_repos' : 'followers';
    },
    paginate(array, pageSize, pageNumber) {
      return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    },
    setPage(dir) {
      if (dir === 'prev') {
        this.page > 1 && this.page--;
      } else {
        this.page < Math.ceil(this.selectedUsers.length / this.pageSize) && this.page++;
      }
    },
    setOrder(value) {
      this.order = value === 'Ascending' ? 'asc' : 'desc';
    },
    setPageSize(value) {
      this.page = 1;
      this.pageSize = value;
    }
  }
}
</script>

<style lang="scss" scoped>
  #following {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 110px auto 10px auto;

    #filters {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    #followers {
      width: 100%;
      margin: 1rem auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .input-filter {
      background-color: #0a0a0a;
      border-radius: 6px;
      border: 1px solid #666666;
      color: #42b983;
      padding-left: 1em;
      width: 400px;
      text-align: left;
      outline: none;
      height: 47px;
      line-height: 47px;
      margin: 10px;
    }

    .input-filter:focus {
      border: 1px solid #42b983;
    }

    #pagination-container {
      margin-bottom: 2rem;
      display: flex;
      justify-content: center;
      // position: absolute;
      bottom: 0;
      z-index: 100;
      width: 100%;
      left: 0;

      .pagination {
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

      #page {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        background-color: #323347;
        width: 50px;
        color: #42b983;
        font-size: 30px;
        border-radius: 10px;
        padding: 10px;
      }

      @media screen and (max-width: 1024px) {
        .pagination {
          width: 80px;
          font-size: 16px;
        }
      }
    }
  }

  
</style>