<template>
  <div id="filters">
    <custom-select :options="['Public Repos', 'Followers']" :default="'Public Repos'" @input="setKey" />
    <custom-select :options="['Ascending', 'Descending']" :default="'Descending'" @input="setOrder" />
  </div>
  <div id="followers">
    <user v-for="(user, index) in modifiedUsers" :key="user.id" :user="user"></user>
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
      filter: '',
      intervalId:'',
      order:'',
      key:'',
      modifiedUsers: [],
      userDetails: []
    }
  },
  mounted() {
    this.modifiedUsers = this.selectedUsers;
  },
  computed: {
    filteredUsers() {
      return (this.filter && this.modifiedUsers.filter(this.isValid) || this.selectedUsers)
          .sort(this.compareValues(this.key || 'name', this.order || 'asc'));
    },
    selectedUsers() {
      return this.$store.state.selectedUsers || [];
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  watch: {
    key(newVal, oldVal) {
      if(newVal) {
        this.modifiedUsers = this.filteredUsers;
      }
    },
    order(newVal, oldVal) {
      if(newVal) {
        this.modifiedUsers = this.filteredUsers;
      }
    }
  },
  methods: {
    setUsers(detail) {
      this.modifiedUsers.push(detail);
    },
    isValid(selectedUser) {
      return selectedUser.login.toUpperCase().indexOf(this.filter.toUpperCase()) > -1;
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
    setOrder(value) {
      this.order = value === 'Ascending' ? 'asc' : 'desc';
    }
  }
}
</script>

<style lang="scss" scoped>
#filters {
  display: flex;
  justify-content: center;
  margin: 110px auto 10px auto;
}

  #followers {
    width: 100%;
    margin: 1rem auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>