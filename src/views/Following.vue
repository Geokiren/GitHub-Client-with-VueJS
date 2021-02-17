<template>
  <div id="followers">
    <user v-for="(user, index) in selectedUsers" :key="user.id" :user="user" @user-repos="setRepos"></user>
  </div>
</template>

<script>
  import User from "../components/User.vue";

export default {
  components: {
    User
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  computed: {
    selectedUsers() {
        return this.$store.state.selectedUsers;
    }
  },
}
</script>

<style lang="scss" scoped>
  #followers {
        width: 100%;
        margin: 90px auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
  }
</style>