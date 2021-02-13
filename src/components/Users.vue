<template>
    <div v-if="!isLoading" id="user-list">
      <div class="user" v-for="(user, index) in users" :key="user.id">
        <div class="avatar">
          <img :src="user.avatar_url" alt="User Avatar" />
        </div>
        <div class="name">{{ user.login.toUpperCase() }}</div>
      </div>
    </div>
</template>

<script>
export default {
    emits: ['change-page'],
    props: {
        page: {
            type: Number,
            required: true,
            default: 1
        }
    },
    data() {
        return {
            users: [],
            isLoading: false
        }
    },
    mounted() {
    this.getUsers(1);
  },
  watch: {
      page(newVal, oldVal) {
        if(newVal) {
            this.getUsers(newVal);
        }
      }
    },
    methods: {
        getUsers(page) {
            if(!page) {
                page = 1;
            }
            console.log(page)
            this.isLoading = true;
            fetch(
                `https://api.github.com/search/users?q=language:javascript+type:user&sort=followers&order=desc&page=${page}&per_page=10`
            )
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then(data => {
                    console.log(data);
                    this.users = data && data.items || [];
                }).finally(() => {
                    this.isLoading = false;
                })
        }
    }
}
</script>

<style lang="scss" scoped>
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