<template>
    <div class="user" v-if="user" @click="setRepoUsername(user.login, user.details.name)">
        <div class="follow">&#10084;</div>
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
    <user-repos 
        v-if="showRepos"
        :username="repoInfo.username"
        :name="repoInfo.name"
        @close-repos="showRepos = false">
    </user-repos>
</template>

<script>
    import UserRepos from '../components/UserRepos.vue';

    export default {
        components: {
            UserRepos
        },
        props: {
            user: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                repoInfo: {},
                showRepos: false
            }
        },
        methods: {
            setRepoUsername(username, name) {
                this.repoInfo = {
                    username,
                    name
                }
                this.showRepos = true;
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