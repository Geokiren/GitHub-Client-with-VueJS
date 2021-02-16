import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  plugins: [createPersistedState()],
  state: {
    selectedUsers: []
  },
  mutations: {
    addUser(state, user) {
      state.selectedUsers.push(user)
    },
    removeUser(state, index) {
      state.selectedUsers.splice(index,1);
    },
  },
  actions: {},
  modules: {}
})