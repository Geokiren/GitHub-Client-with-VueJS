import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  plugins: [createPersistedState()],
  state: {
    selectedUsers: [],
    isLoading: false,
    imagesLoaded: 0
  },
  mutations: {
    addUser(state, user) {
      state.selectedUsers.push(user)
    },
    removeUser(state, index) {
      state.selectedUsers.splice(index,1);
    },
    setIsLoading(state, value = false) {
      state.isLoading = value;
    },
    setImagesLoaded(state) {
      if(state.imagesLoaded < 10) {
        state.imagesLoaded++;
      }
    },
    resetImagesLoaded(state) {
      state.imagesLoaded = 0;
    }
  },
  actions: {},
  modules: {}
})