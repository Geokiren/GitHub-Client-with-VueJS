<template>
    <div id="repos-outer">
        <div id="repos">
          <div id="close" @click="close">&#10006;</div>
            <h1 id="title">{{ name }}'s Repos</h1>
            
            <div v-if="repos" id="repos-container">
                <div class="repos-list" v-for="(repo, index) in repos" v-if="!isLoading">
                    <h3 class="full-name repo-item">{{ repo.full_name.split('/')[1].toUpperCase() }}</h3>
                    <div class="repo-info">
                        <div class="license repo-item" v-if="repo.license">License: {{ repo.license.name || 'N/A' }}</div>
                        <div class="stars repo-item">Stars: {{ repo.stargazers_count }}</div>
                        <div class="watchers repo-item">Watchers: {{ repo.watchers }}</div>
                        <div class="forks repo-item">Forks: {{ repo.forks }}</div>
                    </div>
                    <div class="divider"></div>
                    <h4>Description</h4>
                    <div class="description repo-item">{{ repo.description }}</div>
                </div>
            </div>
            <div id="pagination-container">
                <button id="previous" class="pagination" :class="page <= 1 ? 'disabled' : ''" @click="page--" :disabled="page <= 1">Previous</button>
                <div id="page">{{ page }}</div>
                <button id="next" class="pagination" @click="page++">Next</button>
            </div>
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
            repos: [],
            page: 1,
            isLoading: false
        }
    },
    mounted() {
        this.getRepos(this.username, this.page);
    },
    watch: {
      page(newVal, oldVal) {
        if(newVal) {
            this.getRepos(this.username, newVal);
        }
      },
    },
    methods: {
      close() {
          this.$emit('close-repos');
      },
      async getRepos(username, page) {
          this.isLoading = true;
          try {
              const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&type=owner&direction=desc&page=${page}&per_page=10`);
              const data = await res.json();
              this.repos = data || [];
          } catch(er) {
              console.log(er)
          }
          this.isLoading = false;
      },
      todo: function(){
        this.intervalId = setInterval(function(){
          // apply code needed
        }.bind(this), 30000);
      }
    }
}
</script>

<style lang="scss" scoped>
    $repo-colors: #83984d, #423f3f, #ba2234, #336b8b, #f0b51f;

    #repos {
        position: fixed;
        top: 53%;
        left: 50%;
        width: 85%;
        height: 85%;
        margin:  20px auto;
        padding: 0 80px 80px 80px;
        z-index: 100;
        background-color: #393b51;
        color: white;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translate(-50%, -50%);
        overflow-y: auto;
        overflow-x: hidden;

        #title {
            border-bottom: 2px solid white;
            width: 85%;
            padding: 20px;
        }

        #close {
            position: absolute;
            width: 60px;
            text-align: right;
            top: 0;
            right: 10px;
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

        @media screen and (max-width: 1024px) {
            #close {
                position: sticky;
                width: 100%;
                text-align: right;
            }

            #title {
              padding: 0 10px 10px 10px;
              margin: 0 20px 20px 20px;
            }
        }

        #repos-container {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            height: 108vh;

            .repos-list {

                background-color: #242533;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
                border-radius: 10px;
                margin: 1rem;
                padding: 1rem;
                width: 360px;

                .full-name.repo-item {
                    border-bottom: 1px solid white;
                    padding: 6px;
                    margin: 0 0 10px 0;
                    letter-spacing: 4px;
                }

                .repo-info {
                    margin: 20px 0;

                    .repo-item {
                        margin-bottom: 8px;
                        letter-spacing: 2px;
                    }
                }

                h4 {
                    margin: 10px 0;
                }

                .divider {
                    border-bottom: 1px solid white;
                }
            }

            @media screen and (max-width: 460px) {
                .repos-list {
                    width: 280px;
                }
            }
        }

        #pagination-container {
          margin: 2rem 1rem;
          display: flex;
          justify-content: center;
          position: absolute;
          bottom: 0;
          z-index: 100;

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

    @media screen and (max-width: 1024px) {
        #repos {
            width: 95%;
            height: 90%;
            padding: 0 30px 0 30px;
        }
    }
</style>