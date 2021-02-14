<template>
    <div v-if="!isLoading" id="user-list">
      <div class="user" v-for="(user, index) in users" :key="user.id">
        <div class="avatar">
          <img :src="user.avatar_url" alt="User Avatar" />
        </div>
        <div class="details">
            <div class="name detail-item">{{ user.details.name }}</div>
            <div class="login-name detail-item">Username: {{ user.details.login }}</div>
            <div class="location detail-item">Location: {{ user.details.location || 'N/A' }}</div>
            <div class="public-repos detail-item">Repos: {{ user.details.public_repos }}</div>
            <div class="public-gists detail-item">Gists: {{ user.details.public_gists }}</div>
            <div class="followers detail-item">Followers: {{ user.details.followers }}</div>
            <div class="following detail-item">Following: {{ user.details.following }}</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
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
    #user-list {
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .user {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
            border-radius: 10px;
            // padding: 1rem;
            margin: 1rem;
            display: flex;
            flex-direction: column;
            // justify-content: center;
            align-items: center;
            // width: 20%;
            background-color: #393b51;
            color: white;
            // max-height: 140px;

            .avatar {
                margin-bottom: 10px;

                img {
                    width: 400px;
                }
            }

            .details {
                width: 100%;
                background-color: #393b51;
                display: flex;
                flex-direction: column;
                align-items: center;
                // justify-content: center;
                flex-wrap: wrap;
                max-width: 341px;
                margin: 0 0 10px 0;

                .name.detail-item {
                    font-size: 20px;
                    border-bottom: 2px solid white;
                    margin: 1px 0 5px 0;
                }

                .detail-item {
                    letter-spacing: 4px;
                    font-size: 14px;
                    padding: 6px 0;
                    width: 90%;

                }

            }
        }

        .user:hover {
            transform: scale(1.05);
        }
    }
</style>