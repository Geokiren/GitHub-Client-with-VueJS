<template>
    <div id="repos">
        <h1 id="title">{{ name }}'s Repos</h1>
        <div id="close" @click="close">&#10006;</div>
        <div class="repos-list" v-for="(repo, index) in repos">
            <div class="full-name">{{ repo.full_name }}</div>
            <div class="description">{{ repo.description }}</div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['close-repos'],
    props: {
        username: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            repos: []
        }
    },
    mounted() {
        this.getRepos(this.username);
    },
    methods: {
        close() {
            console.log('in here')
            this.$emit('close-repos');
        },
        async getRepos(username) {
            try {
                const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&type=owner&direction=desc&page=1&per_page=10`);
                const data = await res.json();
                console.log(data)
                this.repos = data;
            } catch(er) {
                console.log(er)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    #repos {
        position: absolute;
        top: 7.5%;
        left: 7.5%;
        width: 85%;
        height: 90%;
        margin: auto;
        padding: 0 80px 80px 80px;
        z-index: 100;
        background-color: #393b51;
        color: white;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        #title {
            border-bottom: 2px solid white;
            width: 80%;
            padding: 10px;
        }

        #close {
            position: absolute;
            width: 60px;
            top: 5px;
            right: 20px;
            color: #42b983;
            font-size: 60px;
            cursor: pointer;
            -webkit-transition: -webkit-transform .6s ease-in-out;
            transition: transform .6s ease-in-out;
        }

        #close:hover {
            -webkit-transform: scale(1.01);
            transform: scale(1.01);
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
        }

        .repos-list {
            border: 2px solid white;
            margin: 1rem;
        }
    }
</style>