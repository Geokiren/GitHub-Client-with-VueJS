<template>
    <div v-if="!isLoading" id="user-list">
      <div class="user" v-for="(user, index) in users" :key="user.id">
        <div class="avatar">
          <img :src="user.avatar_url" alt="User Avatar" />
        </div>
        <div v-if="user.details" class="details">
            <div class="name detail-item">Name: {{ user.details && user.details.name || '' }}</div>
            <div class="login-name detail-item">Login Name: {{ user.details.login }}</div>
            <div class="location detail-item">Location: {{ user.details.location }}</div>
            <div class="public-repos detail-item">Public Repos: {{ user.details.public_repos }}</div>
            <div class="public-gists detail-item">Public Gists: {{ user.details.public_gists }}</div>
            <div class="followers detail-item">Followers: {{ user.details.followers }}</div>
            <div class="following detail-item">following: {{ user.details.following }}</div>
        </div>
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
        async getUsers(page) {
            this.isLoading = true;

            try {
                const res = await fetch(`https://api.github.com/search/users?q=language:javascript+type:user&sort=followers&order=desc&page=${page}&per_page=10`);
                const data = await res.json();
                
                if(data && data.items) {
                    data.items.forEach(item => {
                        this.getUser(item.login).then(user => {
                            item.details = user;
                        })
                    })
                    this.users = data && data.items || [];
                    console.log('users: ', this.users)
            }
            } catch(er) {
                console.log(er)
            }
            
            this.isLoading = false;
        },
        async getUser(id) {
            const res = await fetch(`https://api.github.com/users/${id}`);
            const data = await res.json();
            return data;
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
            // align-items: center;
            width: 50%;
            background-color: #393b51;
            color: white;
            max-height: 140px;

            .avatar {
                margin-right: 20px;

            img {
                width: 100px;
            }
            }

            .details {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                flex-wrap: wrap;

                .detail-item {
                    letter-spacing: 4px;
                    margin: 4px 34px;
                    color: #42b983;
                    font-size: 22px;
                }

            }

            
        }

        .user:hover {
            transform: scale(1.01);
        }
    }
</style>