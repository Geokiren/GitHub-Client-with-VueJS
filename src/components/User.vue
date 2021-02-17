<template>
    <div class="user" @click="setRepoUsername(details.login, details.name)" v-if="!isLoading">
        <div class="follow" @click.stop="unfollow(user)" v-if="user.selected">&#10084;</div>
        <div class="follow" @click.stop="follow(user)" v-else>&#9825;</div>
        <div class="avatar">
            <img :src="user.avatar_url" alt="User Avatar" />
        </div>
        <div class="details">
            <div class="name detail-item">{{ details.name }}</div>
            <div class="login-name detail-item">Username: {{ details.login }}</div>
            <div class="location detail-item">Location: {{ details.location || 'N/A' }}</div>
            <div class="public-repos detail-item">Repos: {{ details.public_repos }}</div>
            <div class="public-gists detail-item">Gists: {{ details.public_gists }}</div>
            <div class="followers detail-item">Followers: {{ details.followers }}</div>
            <div class="following detail-item">Following: {{ details.following }}</div>
        </div>
    </div>
</template>

<script>
    

    export default {
        components: {
        },
        props: {
            user: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                details: {},
                isLoading: false
            }
        },
        beforeMount() {
            
            
        },
        mounted() {
            this.getUser(this.user.url);
        },
        computed: {
            selectedUsers() {
                return this.$store.state.selectedUsers;
            }
        },
        watch: {
            
        },
        methods: {
            async getUser(url) {
                this.isLoading = true;
                try {
                    const res = await fetch(url);
                    const data = await res.json();
                    this.details = data || {};
                } catch(er) {
                    console.log(er)
                }
                this.isLoading = false;
            },
            findUserIndex(id) {
                return this.selectedUsers.findIndex(selectedUser => selectedUser.id === id);
            },
            setRepoUsername(username, name) {
                this.repoInfo = {
                    username,
                    name
                }
                this.$emit('user-repos', this.repoInfo);
            },
            unfollow(user) {
                if (user.selected) {
                    const index = this.findUserIndex(user.id);
                    user.selected = false;
                    this.$store.commit('unfollowUser', index);
                }
            },
            follow(user) {
                if (!user.selected) {
                    this.$store.commit('followUser', user);
                    user.selected = true;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    

        .user {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
            border-radius: 10px;
            margin: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #393b51;
            color: white;
            cursor: pointer;
            -webkit-transition: -webkit-transform .3s ease-in-out;
            transition: all .3s ease-in-out;
            position: relative;

            .follow {
                position: absolute;
                bottom: 0;
                right: 10px;
                color: #ba2234;
                font-size: 30px;
                transition: all .8s ease-in-out;
            }

            .follow:hover {
                transform: rotate(360deg);
            }

            .avatar {
                margin-bottom: 10px;

                img {
                    border-radius: 10px 10px 0 0;
                    width: 400px;
                }

                @media screen and (max-width: 460px) {
                    img {
                        width: 340px;
                    }
                }
                @media screen and (min-width: 461px) and (max-width: 1024px) {
                    img {
                        width: 300px;
                    }
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
</style>